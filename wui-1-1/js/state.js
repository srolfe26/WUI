﻿/*! W 1.1
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.1/license.html
 */

(function($, window, Wui) {

/**
WUI State Machine

The WUI state machine allows for helping the browser to keep a history of the state of a javascript application by utilizing 
text in the URL after the hash ('#'). The WUI state machine follows this format:

In the hash (as a string):          <view 1>?<param1>=<param1 value>&<param2>=<param2 value>/<view 2>?<param1>=<param2 value>

...or without the placeholders:     adminView?pic=one&id=57/adminWindow?info=salary

In the state machine (as an array): [
                                        {
                                            view:   'adminView', 
                                            params: { pic:one, id:57 }
                                        },
                                        {
                                            view:   'adminWindow', 
                                            params: { info:salary }
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
                            
                        return window.location = setState;
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
                                stateStr += ((j > 0) ? '&' : '?') + keys[j] + '=' + stateArray[i].params[keys[j]];
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
                            viewarea = viewarea.replace(/(\?|\&)([^=]+)\=([^&]+)/g,function(match,delim,key,val){
                                itm[key] = val;
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
    getParam:        function(target,key){
                        var state    = this.getState(),
                            val        = undefined;
                            
                        for(var i in state)
                            if(state[i].view === target && state[i].params[key])    return state[i].params[key];

                        return val;
                    },
                    
    /**
    @param    {string}        target    The view on which to set the parameter.
    @param    {string}        key        The name of the parameter to set.
    @param    {string|number}    value    The value of the parameter
    @return The value passed in, or undefined if setting the parameter failed.
    Set a hash parameter within certain view.
    */
    setParam:        function(target,key, value){
                        var state    = this.getState();
                            
                        for(var i in state){
                            if(state[i].view === target){
                                state[i].params[key] = value;
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
    changeView:        function(oldView,newView){
                        var state = this.getState();
                        for(var i in state)
                            if(state[i].view === oldView)
                                state[i].view = newView;
                        this.setState(state);
                    },
                    
    /**
    @param    {string}    viewName    Name of the view
    @param    {object}    [params]    An object containing key value pairs
    Sets a single view and associated parameters on the URL.
    */                
    setView:        function(viewName,params){
                        var newState = [{view:viewName}];
                        if(params) newState[0].params = params;
                        this.setState(newState);
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

}(jQuery, this, Wui));


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
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

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

// Property: jQuery.fn.hashchange.domain
// 
// If you're setting document.domain in your JavaScript, and you want hash
// history to work in IE6/7, not only must this property be set, but you must
// also set document.domain BEFORE jQuery is loaded into the page. This
// property is only applicable if you are supporting IE6/7 (or IE8 operating
// in "IE7 compatibility" mode).
// 
// In addition, the <jQuery.fn.hashchange.src> property must be set to the
// path of the included "document-domain.html" file, which can be renamed or
// modified if necessary (note that the document.domain specified must be the
// same in both your main JavaScript as well as in this file).
// 
// Usage:
// 
// jQuery.fn.hashchange.domain = document.domain;

// Property: jQuery.fn.hashchange.src
// 
// If, for some reason, you need to specify an Iframe src file (for example,
// when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
// do so using this property. Note that when using this property, history
// won't be recorded in IE6/7 until the Iframe src file loads. This property
// is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
// compatibility" mode).
// 
// Usage:
// 
// jQuery.fn.hashchange.src = 'path/to/file.html';

$.fn[ str_hashchange ].delay = 50;
/*
$.fn[ str_hashchange ].domain = null;
$.fn[ str_hashchange ].src = null;
*/

// Event: hashchange event
// 
// Fired when location.hash changes. In browsers that support it, the native
// HTML5 window.onhashchange event is used, otherwise a polling loop is
// initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
// see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
// compatibility" mode), a hidden Iframe is created to allow the back button
// and hash-based history to work.
// 
// Usage as described in <jQuery.fn.hashchange>:
// 
// > // Bind an event handler.
// > jQuery(window).hashchange( function(e) {
// >   var hash = location.hash;
// >   ...
// > });
// > 
// > // Manually trigger the event handler.
// > jQuery(window).hashchange();
// 
// A more verbose usage that allows for event namespacing:
// 
// > // Bind an event handler.
// > jQuery(window).bind( 'hashchange', function(e) {
// >   var hash = location.hash;
// >   ...
// > });
// > 
// > // Manually trigger the event handler.
// > jQuery(window).trigger( 'hashchange' );
// 
// Additional Notes:
// 
// * The polling loop and Iframe are not created until at least one handler
//   is actually bound to the 'hashchange' event.
// * If you need the bound handler(s) to execute immediately, in cases where
//   a location.hash exists on page load, via bookmark or page refresh for
//   example, use jQuery(window).hashchange() or the more verbose 
//   jQuery(window).trigger( 'hashchange' ).
// * The event can be bound before DOM ready, but since it won't be usable
//   before then in IE6/7 (due to the necessary Iframe), recommended usage is
//   to bind it inside a DOM ready handler.

// Override existing $.event.special.hashchange methods (allowing this plugin
// to be defined after jQuery BBQ in BBQ's source code).
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
  
  timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
}

return self;
})();

})(jQuery,this);