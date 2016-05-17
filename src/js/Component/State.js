(function($, window, Wui) {

/**
@preserve_format
The WUI state machine allows for helping the browser to keep a history of the state of a javascript application by utilizing 
text in the URL after the hash ('#'). The WUI state machine follows this format:

In the hash (as a string):          <view 1>?<param1>=<param1 value>&<param2>=<param2 value>/<view 2>?<param1>=<param2 value>

...or without the placeholders:     adminView?pic=one&id=57/adminWindow?info=salary

In the state machine (as an array):

[
    {
        view:   'adminView', 
        params: {
                    pic:    one,
                    id:     57
                }
    },
    {
        view:   'adminWindow', 
        params: { 
                    info:   salary
                }
    }
]
                                        
The hashchange event is written by:
Copyright (c) 2010 "Cowboy" Ben Alman,
Dual licensed under the MIT and GPL licenses.
http://benalman.com/about/license/
*/
Wui.stateMachine = function(args){ $.extend(this, {
    /** Placeholder for functions passed in using setChangeAction */
    changeMethod:    function(){}
},args); };
Wui.stateMachine.prototype = {
    /**
    @param    {string|array}    state    A string or an array describing the state of the page
    @return The state that was just set on the page.
    Sets the state passed in to the window.location as a string. State arrays passed in are converted.
    */
    setState:        function(state){
                        var url            = window.location.href.split('#'),
                            preHash        = url[0] + '#',
                            setState    = preHash;
                            
                            // Objects passed in are parsed according to a strict format of 
                            // firstView?param1=1/anotherView?param1=1&param2=2 ...
                            if(state && typeof state === 'object'){
                                setState = preHash + this.stringify(state);
                            // If a string is passed in just pass it along
                            }else if(state && typeof state === 'string'){
                                setState = preHash + state;
                            }
                        
                        window.location = setState;
                        
                        return window.location;
                    },
    
    /**
    @param    {array}    stateArray    An array containing objects that describe a WUI state
    @return A WUI state string.
    State arrays passed in are converted to a WUI state string suitable for being used as hash text.
    */
    stringify:        function(stateArray){
                        var stateStr    = '';
                        
                        for(var i in stateArray){
                            // Get keys in alphabetical order so that comparing states works
                            var keys = Wui.getKeys(stateArray[i].params);

                            // State the location
                            stateStr += ((i > 0) ? '/' : '') + stateArray[i].view;
                            
                            for(var j = 0; j < keys.length; j++)
                                stateStr += ((j > 0) ? '&' : '?') + keys[j] + '=' + encodeURI(stateArray[i].params[keys[j]]);
                        }
                        
                        return stateStr;
                    },
    
    /**
    @return A WUI state machine formatted array.
    Gets the hash text of the URL and converts it to a WUI state array.
    */
    getState:        function(){
                        var state = [];
                        
                        window.location.hash.replace(/([^\/^#]+)/g,function(viewarea){
                            var itm = {};
                            viewarea = viewarea.replace(/(\?|\&)([^=]+)\=([^&]*)/g,function(match,delim,key,val){
                                itm[key] = decodeURI(val);
                                return '';
                            });
                            state.push({view:viewarea, params:itm});
                        });
                        
                        return state;
                    },
    
    /**
    @param    {string}    target    The view from which to retrieve the parameter.
    @param    {string}    key        The name of the parameter to retrieve.
    @return The value of a hash parameter or undefined.
    Returns a parameter value for a specified target view and parameter key.
    */
    getParam:        function(target, key){
                        var state = this.getState(),
                            val;
                            
                        for(var i in state)
                            if(state[i].view === target && state[i].params[key])    return state[i].params[key];

                        return val;
                    },
                    
    /**
    @param    {string}          target      The view on which to set the parameter.
    @param    {string|object}   key         The name of the parameter to set, or an object containing key/value pairs of multiple parameters.
    @param    {string|number}   value       The value of the parameter of key is a string, or it's ignored if key is an object.
    @return The value passed in, or undefined if setting the parameter failed.
    Set a hash parameter within certain view.
    */
    setParam:        function(target,key,value){
                        var state = this.getState();
                            
                        for(var i in state){
                            if(state[i].view === target){
                                if(typeof key === 'string')
                                    state[i].params[key] = value;
                                else
                                    $.extend(state[i].params,key);

                                this.setState(state);
                                
                                return value;
                            }    
                        }
                        
                        return undefined;
                    },
    
    /**
    @param    {string}    oldView        Name of the view to change.
    @param    {string}    newView        New name of the view.
    Changes a view in place leaving the parameters
    */
    changeView:        function(oldView, newView){
                        var state = this.getState();
                        for(var i in state)
                            if(state[i].view === oldView)
                                state[i].view = newView;
                        this.setState(state);
                    },
                    
    /**
    @param    {string}    viewName    Name of the view
    @param    {object}    [params]    An object containing key value pairs
    Sets a single view and associated parameters on the URL. Clears out all other views.
    use addView and clearView for more granular control.
    */                
    setView:        function(viewName, params){
                        var newState = [{view:viewName}];
                        if(params) newState[0].params = params;
                        this.setState(newState);
                    },

    /**
    @param    {string}    viewName    Name of the view
    @param    {object}    [params]    An object containing key value pairs.
    @return   The name of the view that was added.
    Adds a view to the current list of views. If viewName is the name of an
    existing view, the params passed in will replace those in the existing view.
    */                
    addView:        function(viewName, params){
                        var newState = this.getState();
                        
                        params = params || {};

                        // Prevent duplicate views
                        for(var i in newState){
                            if(newState[i].view === viewName){
                                newState[i].params = params;
                                this.setState(newState);
                                return viewName;
                            }
                        }

                        // Add a new view
                        newState.push({
                            view:   viewName,
                            params: params
                        });
                        this.setState(newState);

                        return viewName;
                    },

    /**
    @param    {string}    viewName    Name of the view
    @return   The view that was cleared out, or null if the view wasn't found.
    Removes a view from the hash, leaving all others
    */
    clearView:      function(viewName){
                        var state = this.getState(),
                            clearedView = null;

                        for(var i in state){
                            if(state[i].view === viewName){
                                clearedView = state.splice(i,1);
                                break;
                            }
                        }
                            
                        this.setState(state);
                        return clearedView;
                    },
    
    /**
    @return    An array of views on the hash.
    Gets all of the available views of the URL
    */
    getViews:        function(){
                        // Lists all of the views
                        var state = this.getState(),
                            retArr = [];
                            
                        for(var i = 0; i < state.length; i++)
                            retArr.push(state[i].view);

                        return retArr;
                    },
                    
    /** Sets a blank hash */
    clearState:        function(){ this.setState(); },
    
    /**
    @param {function} fn Function to perform when the state of the URL changes.
    Sets me.changeMentod 'hashchange' listener function on the window for when the URL changes and 
    passes that function a WUI state array. If a changeMethod has already been defined, the new method
    will contain calls to both the old changeMethod and the new one.
    */
    addChangeMethod:function(fn){ 
                        var me = this,
                            state = me.getState(),
                            oldChange = me.changeMethod;
                            
                        me.changeMethod = function(args){
                            oldChange(args);
                            fn(args);
                        };
                            
                        $(window).off('hashchange').on('hashchange', function(){
                            me.changeMethod.call(me,state);
                        });
                    },
                    
    /** Removes the 'hashchange' listener, and clears out me.changeMethod effectively turning off the state machine. */
    turnOff:        function(){ this.changeMethod = function(){}; $(window).off('hashchange'); }
};

}(jQuery, this, window[_wuiVar]));


/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
(function($,window,undefined){

'$:nomunge'; // Used by YUI compressor.

// Reused string.
var str_hashchange = 'hashchange',

// Method / object references.
doc = document,
fake_onhashchange,
special = $.event.special,

// Does the browser support window.onhashchange? Note that IE8 running in
// IE7 compatibility mode reports true for 'onhashchange' in window, even
// though the event isn't supported, so also test document.documentMode.
doc_mode = doc.documentMode,
supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );

// Get location.hash (or what you'd expect location.hash to be) sans any
// leading #. Thanks for making this necessary, Firefox!
function get_fragment( url ) {
url = url || location.href;
return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
}

// Method: jQuery.fn.hashchange
// 
// Bind a handler to the window.onhashchange event or trigger all bound
// window.onhashchange event handlers. This behavior is consistent with
// jQuery's built-in event handlers.
// 
// Usage:
// 
// > jQuery(window).hashchange( [ handler ] );
// 
// Arguments:
// 
//  handler - (Function) Optional handler to be bound to the hashchange
//    event. This is a "shortcut" for the more verbose form:
//    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
//    all bound window.onhashchange event handlers will be triggered. This
//    is a shortcut for the more verbose
//    jQuery(window).trigger( 'hashchange' ). These forms are described in
//    the <hashchange event> section.
// 
// Returns:
// 
//  (jQuery) The initial jQuery collection of elements.

// Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
// $(elem).hashchange() for triggering, like jQuery does for built-in events.
$.fn[ str_hashchange ] = function( fn ) {
return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
};

// Property: jQuery.fn.hashchange.delay
// 
// The numeric interval (in milliseconds) at which the <hashchange event>
// polling loop executes. Defaults to 50.

$.fn[ str_hashchange ].delay = 50;

// Event: hashchange event
// 
// Fired when location.hash changes. In browsers that support it, the native
// HTML5 window.onhashchange event is used, otherwise a polling loop is
// initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
// see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
// compatibility" mode), a hidden Iframe is created to allow the back button
// and hash-based history to work.
special[ str_hashchange ] = $.extend( special[ str_hashchange ], {

// Called only when the first 'hashchange' event is bound to window.
setup: function() {
  // If window.onhashchange is supported natively, there's nothing to do..
  if ( supports_onhashchange ) { return false; }
  
  // Otherwise, we need to create our own. And we don't want to call this
  // until the user binds to the event, just in case they never do, since it
  // will create a polling loop and possibly even a hidden Iframe.
  $( fake_onhashchange.start );
},

// Called only when the last 'hashchange' event is unbound from window.
teardown: function() {
  // If window.onhashchange is supported natively, there's nothing to do..
  if ( supports_onhashchange ) { return false; }
  
  // Otherwise, we need to stop ours (if possible).
  $( fake_onhashchange.stop );
}

});

// fake_onhashchange does all the work of triggering the window.onhashchange
// event for browsers that don't natively support it, including creating a
// polling loop to watch for hash changes and in IE 6/7 creating a hidden
// Iframe to enable back and forward.
fake_onhashchange = (function(){
var self = {},
  timeout_id,
  
  // Remember the initial hash so it doesn't get triggered immediately.
  last_hash = get_fragment(),
  
  fn_retval = function(val){ return val; },
  history_set = fn_retval,
  history_get = fn_retval;

// Start the polling loop.
self.start = function() {
  timeout_id || poll();
};

// Stop the polling loop.
self.stop = function() {
  timeout_id && clearTimeout( timeout_id );
  timeout_id = undefined;
};

// This polling loop checks every $.fn.hashchange.delay milliseconds to see
// if location.hash has changed, and triggers the 'hashchange' event on
// window when necessary.
function poll() {
  var hash = get_fragment(),
    history_hash = history_get( last_hash );
  
  if ( hash !== last_hash ) {
    history_set( last_hash = hash, history_hash );
    
    $(window).trigger( str_hashchange );
    
  } else if ( history_hash !== last_hash ) {
    location.href = location.href.replace( /#.*/, '' ) + history_hash;
  }
  
  timeout_id = window.setTimeout( poll, $.fn[ str_hashchange ].delay );
}

return self;
})();

})(jQuery,this);
