/*! Wui 1.1
 * Copyright (c) 2013 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static4.usurf.usu.edu/resources/wui-nextgen/wui-1-1/license.html
 */
 
 
/*
* Avoid 'console' errors in browsers that lack a console by defining a variable named console.
* For example, when using console.log() on a browser that does not have a console, execution of code
* will continue because the console variable is defined.
* Copyright (c) HTML5 Boilerplate - https://github.com/h5bp/html5-boilerplate/blob/master/LICENSE.md
*/
(function() {
    var method;
    var n = function(){};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        if (!console[method]) { console[method] = n; }    // Only stub undefined methods.
    }
}());


// Make sure the WUI is defined
var Wui = Wui || {};

(function($,window) {

// AJAX error reporting and caching
$.ajaxSetup({ 
    cache:  false,
    error:  function(response){
                console.log(response);
                var err = null;
                try{        err = $.parseJSON( response.responseText ); }
                catch(e){   err = {fatalError:'Aw Snap! There was a problem talking to the server.'}; }
                if(err !== null)
                    Wui.errRpt(err.fatalError);
            }
});

/** @return Returns a unique id */
Wui.id = function(){
    if(Wui.idCounter === undefined) Wui.idCounter = 0;
    return 'wui-' + Wui.idCounter++;
};


/**
    @param {object} Object containing named keys
    @return Array containing the key names of the passed in object in alphabetical order
*/
Wui.getKeys = function(obj){
    var retArray = [];
    if(obj)
        $.each(obj,function(key){ retArray.push(key); });
    return retArray.sort();
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@return Number specifying the scrollbar width for the current page in pixels
*/
Wui.scrollbarWidth = function() {
  var parent, child, width;

  if(width===undefined) {
    parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
    child=parent.children();
    width=child.innerWidth()-child.height(99).innerWidth();
    parent.remove();
  }

 return width;
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@param    {number} lower    Lower bound for generating the random number
@param    {number} upper    Upper bound for generating the random number
@return A random number within the bounds specified

Generates a random number
*/
Wui.randNum = function(lower,upper) {
    upper = upper - lower + 1 ;
    return ( lower + Math.floor(Math.random() * upper) );
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@return A number representing the maximum z-index on the page plus one.

Gets the maximum CSS z-index on the page and returns one higher, or one if no z-indexes are defined.
*/
Wui.maxZ = function(){
    var topZ =  Math.max.apply(null, 
                    $.map($('body > *, [style*="z-index"]'), function(e) {
                        if ($(e).css('position') != 'static')
                            return parseInt($(e).css('z-index')) || 0;
                    })
                );
    return ($.isNumeric(topZ) ? topZ : 0) + 1;
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@param  {object} response   A JSON object which was returned from an XHR response.
@return An object containing the data removed from any wrapper, and the total number of records received {data:array, total:numeric}

Unwraps the data from any container it may be in to allow it to be used by a containing object. Wrapper values are defined in
Wui.Data.prototype.dataContainer and Wui.Data.prototype.totalContainer.
*/
Wui.unwrapData = function(r){
    var me          = this,
        retObj      = {},
        dc            = me.hasOwnProperty('dataContainer') ? me.dataContainer : Wui.Data.prototype.dataContainer,
        tc            = me.hasOwnProperty('totalContainer') ? me.totalContainer : Wui.Data.prototype.totalContainer,
        response    = (dc && r[dc]) ? r[dc] : r,
        total         = (tc && r[tc]) ? r[tc] : response.length;
    
    retObj.data = response;
    retObj.total = total;
    return retObj;
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@param {array}        collection            A collection of items that will be fit within a container.
@param {string}     [dim]                The dimension to perform the fit on, 'height','width', height is default.
@param {boolean}    [mindTheScrollbar]    Defaults to false, otherwise includes the scrollbar in the calculation.

This function will size items relative to each other via a 'fit' value, as well as percentages and fixed values.
*/
Wui.fit = function(collection,dim,mindTheScrollbar){
    // Ensure the collection is an array of Wui Objects
    if(collection instanceof Array && collection.length > 0){
        var i           = 0,
            dimArray    = ['height','width'],
            parent      = (collection[0].parent) ? collection[0].parent : collection[0].el.parent(),
            parentEl    = (parent.el) ? (parent.elAlias || parent.el) : parent;

        // Make sure dim is a lowercase string, or just leave it alone for now
        dim = (dim && dim.toLowerCase) ? dim.toLowerCase() : dim;

        // Make sure the value of dim is something this method will be able to utilize
        dim = ($.inArray(dim,dimArray) >= 0) ? dim : dimArray[0];
        var dimOpposite = dimArray[($.inArray(dim,dimArray)) ? 0 : 1];

        // Change the value of mindTheScrollbar if some of the items in the collection are taller than the container.
        if(mindTheScrollbar !== true)
            for(i = 0; i < collection.length; i++)
                if(mindTheScrollbar = collection[i].el['outer' + dimOpposite.charAt(0).toUpperCase() + dimOpposite.slice(1)]() > parentEl[dimOpposite]())
                    break;

        var sbw         = (mindTheScrollbar === true) ? Wui.scrollbarWidth() : 0
            parentSize  = (($(parentEl)[0] === $('body')) ? $(window) : $(parentEl))[dim]() - sbw,
            fitCt       = 0,
            fixedSize   = 0,
            fitMux      = 0;

        // Tally all sizes we're dealing with
        $.each(collection,function(i,itm){
            if(itm.fit){
                fitCt += itm.fit;           // Tally fit values
                itm[dim] = -1;              /* Set to -1 so that CSSByParam will not act on it (just deleting it was
                                             * ineffective because this property can be inherited through the prototype chain)*/
            }else if(itm[dim]){
                // Tally fixed size values & percentage based size values. Doing this gives percentages precedence over fit.
                if($.isNumeric(itm[dim]))   { fixedSize += itm[dim]; }
                else                        {
                                              var itmDimension = Math.floor((parseFloat(itm[dim]) / 100) * parentSize);
                                              fixedSize += (itm[dim] = itmDimension);
                                            }
                delete itm.fit;             // Ensure the item doesn't have a dimension and a fit specified
            }else{
                fitCt += (itm.fit = 1);     // Add a fit value to an item that doesn't have dimensions specified
            }
        });
        
        // If the grid becomes entirely fixed widths the fit won't work so the items will be set to fits
        if(fitCt === 0 && fixedSize != parentSize){
            fitCt = 1;
            
            $.each(collection,function(i,itm){
                itm.fit = itm[dim] / fixedSize;
                itm[dim] = -1;
            });
        }
        
        // Get the fit multiplier
        fitMux = (fitCt !== 0) ? (parentSize - fixedSize) / fitCt : 0;
        
        // Size 'fit' items
        $.each(collection,function(i,itm){
            var css = {};
            if(itm.fit){
                css[dim] = Math.floor(fitMux * itm.fit);
                $(itm.el).css(css);
            }
        });
    }else{
        console.log('Improper collection specified', arguments);
        //throw('Improper collection specified');
    }
};


/** The base object from which all other WUI Objects extend
 *  @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
*/
Wui.O = function(args){ $.extend(this,{
    /** Whether the object is hidden on the DOM */
    hidden:    false
},args); };
Wui.O.prototype = {
    /**
    @param {object}    object    A WUI or jQuery object to be added to the DOM
    @param {object}    target    An item already on the DOM that the action will be performed on the object relative to
    @param {string}    action    The jQuery DOM manipulation method
    
    @return true
    
    Adds an object to the DOM and applies any CSS styles defined for the object by calling 
    cssByParam() if its a WUI object.
    
    If the object has a 'appendTo' or 'prependTo' config, target and action will be ignored whether 
    passed in or not, if target is defined it will then be used, if target is not defined, and 
    'appendTo' and 'prependTo' are not defined, the objects 'parent' will be used for appending. If 
    the object has no parent, it will be appended to the body.
    
    If the object has a 'appendTo' or 'prependTo' config, that action will be used, otherwise the
    passed in action is used if defined, otherwise uses 'append'.
    */
    addToDOM:    function(obj, tgt, act){
                    // Take the target and action from the passed object first if defined, then default to passed arguments, 
                    // then to a default of $('body') and 'append'
                    var target     = (obj.appendTo !== undefined) ? obj.appendTo :
                                    (obj.prependTo !== undefined) ? obj.prependTo :
                                        (tgt !== undefined && tgt !== null) ? tgt : 
                                            (obj.parent !== undefined && obj.parent.elAlias !== undefined) ? obj.parent.elAlias :
                                                (obj.parent !== undefined && obj.parent.el !== undefined) ? obj.parent.el : $('body'),
                        action     = (obj.appendTo !== undefined) ? 'append' : (obj.prependTo !== undefined) ? 'prepend' : (act !== undefined && target[act]) ? act : 'append';
                    
                    // Try appending with WUI modifiers, else just append in good ol' jQuery fashion
                    try{
                      $(target)[action](obj.el);
                    }catch(e){
                        try{
                          $(target)[action](obj);
                        }catch(e){}
                    }
                    
                    // Add styles
                    this.cssByParam(obj);
                    
                    return true;
                },


    /**
    @param {object}    item    A jQuery object to be added
    Appends item to the WUI Object's 'elAlias' or 'el', whichever is defined.
    */
    append:        function(obj){
                    var me = this, el = me.elAlias || me.el;
                    $.each(arguments,function(i,itm){
                        el.append(itm);
                    });
                },


    /** Removes only the DOM items from the WUI Object's 'elAlias' or 'el', whichever is defined. */
    clear:        function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },
    /**
    Gets called when a WUI Object is placed and gets called on all of a placed object's items.
    Adds CSS styles via cssByParam, calls onRender() if it exists on the object, determines whether the 
    object is using a 'fit' layout and performs layout on the item, calls its children's callRender(), 
    and finally calls its own afterRender() if it exists.
    */
    callRender:    function(){
                    var me = this;
                    
                    // Add styles if they didn't get added
                    me.cssByParam(me);
                    
                    // Perform render for this
                    if(me.onRender)  me.onRender();
                    
                    // Perform Wui.fit on items that need it
                    var needFit = false;
                    
                    me.each(function(itm){ 
                        if(itm.fit){ needFit = true; return false; }
                    });
                    
                    if(me.fitDimension || needFit)
                        Wui.fit(me.items, (me.fitDimension || undefined));
                        
                    // Perform rendering for child elements
                    me.each(function(itm){ if(itm.callRender) itm.callRender(); });
                    if(me.afterRender)  me.afterRender();
                },
    
    /**
    @param {string}         name    Name of the HMTL attribute to set
    @param {string|number}     val        Value of the given attribute
    
    @return True if the val parameter is a valid string or number, else false.
    
    Tests whether the passed in value is valid, then uses the jQuery .attr method to apply an attribute to the el of the WUI object.
    */
    applyAttr:    function(name,val){
                    var validVal = (val !== undefined && (typeof val === 'string' || typeof val === 'number'));
                    if(validVal) $(this.el).attr(name,val);
                    return validVal;
                },
    
    /**
    @param {object} item    A WUI Object, or if undefined, the object that this method is a member of
    
    @return    The object's el if it has one, or just the object
    
    Adds HTML properties like CSS class, attributes, and sets height and width as either absolute values
    or percentages of their parent.
    */
    cssByParam: function(m) { 
                    m = m || this;
                    
                    if(m.el && m.el.addClass){
                        if(m.applyAttr){
                            m.applyAttr('id',m.id);
                            m.applyAttr('name',m.name);
                            m.applyAttr('tabindex',m.tabIndex);
                        }
                        
                        // Add attributes if defined
                        try{ if(m.attr && typeof m.attr == 'object') m.el.attr(m.attr); }catch(e){ }
                        
                        // calculate dimensions
                        if($.isNumeric(m.height) && m.height >= 0)    m.el.css({height: m.height});
                        if($.isNumeric(m.width) && m.width >= 0)        m.el.css({width: m.width});

                        // calculate percentage based dimensions
                        if(m.width && m.width.indexOf && m.width.indexOf('%') != -1)
                            m.el.css({width: Math.floor((parseFloat(m.width) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).width())});
                        if(m.height && m.height.indexOf && m.height.indexOf('%') != -1){
                            m.el.css({height: Math.floor((parseFloat(m.height) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).height())});
                        }
                        
                        // hide an object based on its hidden value
                        if(m.hidden) m.el.css('display','none');
                        
                        return m.el.addClass(m.cls);
                    }else{
                        return m;
                    }
                },
    /**
    @param {function} fn Function that gets called for each item of the object.
    @param {boolean} ascending Whether the loop happens in ascending or descending order.
    
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    each:        function(f,ascending){
                    ascending = (ascending === undefined) ? true : ascending;
                    var i = (ascending) ? 0 : this.items.length;
                    
                    if(ascending){
                        for(i; i < this.items.length; i++){
                            if(f(this.items[i],i) === false) break;
                        }
                    }else{
                        for(i; i >= 0; i--){
                            if(f(this.items[i],i) === false) break;
                        }
                    }

                    return true;
                },
    /**
    @param {number} [speed] Time in milliseconds for the hiding element to fade out
    @param {function} [callback] A function that gets called at the end of the fadeout/hide
    
    @return The el or elAlias of the object being hidden
    Hides an object with the options of an animated fadeout and callback function
    */
    hide:        function(){ 
                    var args = ['fadeOut'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = true;
                    return this.showHide.apply(this,args);
                },
    /**
    @param {function}   afterLayout A function to run after the layout has occurred.
    Runs cssByParam and Wui.fit() on itself and its children.  Similar to callRender(),
    but without the rendering of objects - useful to resize things that are already rendered.
    */
    layout:        function(afterLayout){
                    var me = this;
                    
                    // run css styles
                    me.cssByParam(me);
                    
                    // Perform Wui.fit on items that need it
                    var needFit = false;
                    me.each(function(itm){ if(itm.fit){ needFit = true; return false; } });
                        
                            
                    if(me.fitDimension || needFit)
                        Wui.fit(me.items, (me.fitDimension || undefined));
                        
                    // Perform layout for child elements
                    me.each(function(itm){ if(itm.layout) itm.layout(); });

                    // Performs actions passed in as parameters
                    if(afterLayout && typeof afterLayout === 'function')    afterLayout();
                },
    /**
    @param {function} [after]    A function to be called after an object has been placed
    @return The object that was placed 
    Adds the elements of any child objects to itself, then puts its own el on the DOM by 
    calling addToDOM.  Then executes the 'after' function if provided, then runs the 
    callRender() function to perform rendering, fit, and any other listners on itself and
    its children.
    */
    place:      function(after){
                    var me = this;
                    
                    //adds the objects items if any
                    if(me.items === undefined) me.items = [];
                    me.each(function(itm){ 
                        itm.parent = me;
                        if(itm.place)    itm.place();
                        else             me.addToDOM(itm);
                    });
                    
                    //adds the object to the DOM and starts the recursive callRender to render properties on the children
                    me.addToDOM(me);
                    
                    // perform operations on the object after its placed on the DOM but before onRender
                    if(after && typeof after == 'function')    after(me);
                    
                    // run through a parent object and all of its children to run onRender
                    if(me.parent === undefined) me.callRender();
                    
                    return me;
                },
    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Adds passed in items to the end of the items array and adds those objects to the DOM.
    */
    push:       function(){
                    var me = this;
                    
                    if(me.items === undefined) me.items = [];
                    
                    $.each(arguments,function(i,arg){
                        arg.parent = me;
                        if(arg.place)       arg.place();
                        else                me.addToDOM(arg);
                        
                        if(arg.onRender)    arg.onRender();
                        if(arg.layout)      arg.layout();
                    });

                    return Array.prototype.push.apply(me.items,arguments);
                },
    /**
    Removes the object from its parent's items array (if attached to a parent Wui object) and
    removes its el from the DOM. Then deletes the object from memory.
    */
    remove:     function(){
                    var me = this, spliceVal = null;
                    if(me.parent){
                        me.parent.each(function(itm,idx){ if(itm === me) spliceVal = idx;}, false);
                        if(spliceVal !== null)
                            me.parent.splice(spliceVal,1);
                    }
                    this.el.remove();
                    delete this;
                },
    /**
    @param {number} [speed] Time in milliseconds for the showing element to fade in
    @param {function} [callback] A function that gets called at the end of the fadein/show
    @return The el or elAlias of the object being shown
    Shows an object with the options of an animated fadein and callback function
    */
    show:        function(){ 
                    var args = ['fadeIn'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = false;
                    return this.showHide.apply(this,args);
                },
    /**
    @param {string} fn The name of the jQuery method for showing or hiding
    @param {number} [speed] Time in milliseconds for the showing/hiding element to fade in
    @param {function} [callback] A function that gets called at the end of the show/hide
    @return The el or elAlias of the object being shown/hidden
    This is an internal function used by show() and hide(). Fn is required, but speed and callback
    are optional and their order is interchangeable.
    */
    showHide:    function(fn,speed,callback){
                     speed = (typeof speed == 'number') ? speed : 1;
                     if(typeof arguments[1] == 'function') callback = arguments[0];
                     return this.el[fn](speed, callback);
                },
    /**
    @param {number} index The point in the array to start
    @param {number} howMany The number of items to remove
    @param {object} [obj,...] Additional WUI Objects can be passed as parameters and will be inserted at the index
    
    @return An array of the objects removed, if any
    
    Follows the convention of JavaScript's Array.prototype.splice on the object's items array. Items
    spliced into the array will be spliced in position on the DOM as well. Removed items are removed
    from the DOM.
    */
    splice:     function(idx, howMany){
                    var me = this,
                        el = me.elAlias || me.el;
                        idx = parseInt(idx);
                    
                    if(me.items === undefined) me.items = [];
                    
                    //remove specified elements
                    for(var i = idx; i < (idx + howMany); i++)
                        if(me.items[i] && me.items[i].el) me.items[i].el.remove();
                    
                    //standard splice functionality on array and calcs
                    var retVal      = Array.prototype.splice.apply(me.items, arguments),
                        numAdded    = arguments.length - 2;
                        
                    //append any additional el's in proper order
                    if(me.items.length == numAdded){                      //items ended up replacing the array
                        for(i = 0; i < me.items.length; i++)          { me.addToDOM(me.items[i],el); me.items[i].parent = me; }
                    }else if(me.items[(idx + numAdded)] === undefined){    //meaning the new items were inserted at the end of the array
                        for(i = idx; i < me.items.length; i++)        { me.addToDOM(me.items[i],me.items[i-1].el,'after'); me.items[i].parent = me; }
                    }else if (numAdded !== 0){                             //items at the beginning/middle of the array
                        for(i = (idx + numAdded); i > 0; i--)         { me.addToDOM(me.items[i-1],me.items[i].el,'before'); me.items[i-1].parent = me; }
                    }
                    
                    return retVal;
                }
};


/** WUI Data Object
 @event        datachanged    When the data changes (name, data object)
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

The object for handling data whether remote or local
*/
Wui.Data = function(args){
    $.extend(this,{
        /** Array of data that will be stored in the object. Can be specified for the object or loaded remotely */
        data:            [],
        
        /** Name a key in the data that represents the unique identifier. */
        identifier:     null,
        
        /** Name of the data object. Allows the object to be identified in the listeners */
        name:            null,
        
        /** Object containing keys that will be passed remotely */
        params:            {},
        
        /** URL of the remote resource from which to obtain data. A null URL will assume a local data definition. */
        url:              null,
        
        /** Whether the object is waiting for a remote response */
        waiting:         false,
        
        /** Special configuration of the ajax method. Defaults are:
        
            data:       me.params,
            dataType:    'json',
            success:    function(r){ me.success.call(me,r); },
            error:        function(e){ me.success.call(me,e); },
        */
        ajaxConfig:        {},
        
        /** The total number of records contained in the data object */
        total:            0
    },args);
};
Wui.Data.prototype = {
    /** An object in the remote response actually containing the data.
    Best set modifying the prototype eg. Wui.Data.prototype.dataContainer = 'payload'; */
    dataContainer:    null,
    /** An object in the remote response specifying the total number of records. Setting this
    feature will overrride the Data object's counting the data. Best set modifying the prototype eg. Wui.Data.prototype.totalContainer = 'total'; */
    totalContainer:    null,
    
    /** When the object is waiting, default amount of time in milliseconds before trying to perform loadData() again */
    ajaxWait:        10,
    
    /** 
    @param {array}    newData    Array of the new data
    Event hook for when data is changed.
    */
    dataChanged:    function(){},
    
    /**
    @param {function} fn A function that gets called for each item in the object's data array
    
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    dataEach:        function(f){
                        for(var i = 0; i < this.data.length; i++)
                            if(f(this.data[i],i) === false)
                                break;
                        return true;
                    },
    
    /**
    Performs a remote call sensitive to whether it is already waiting for a response.
    Between loadData(), success() and setData() fires several event hooks in this order:
    
    1. setParams()
    2. beforeLoad()
    3. onSuccess()
    4. beforeSet()
    5. processData()
    6. dataChanged()
    -  'datachanged' event is fired
    7. afterSet()
    
    Upon failure will fire onFailure()
    */
    loadData:        function(){
                        var me = this,
                            config = $.extend({
                                data:       me.params,
                                dataType:    'json',
                                success:    function(r){ me.success.call(me,r); },
                                error:        function(e){ me.failure.call(me,e); },
                            },me.ajaxConfig);
                        
                        if(!me.waiting){
                            me.waiting = true;
                            me.setParams.apply(me,arguments);
                            me.beforeLoad.apply(me,arguments);
                            $.ajax(me.url,config);
                        }else{
                            setTimeout(function(){
                                me.loadData.apply(me,arguments);
                            }, me.ajaxWait);
                        }
                    },
    /**
    @param {object} params    Params to be set
    Can be used as is to set parameters before an AJAX load, or it can also be used as an event hook and overridden.
    This method is called from loadData with its arguments passed on, so arguments passed to load data will be sent here. 
    See loadData().
    */
    setParams:        function(params){
                        if(params && typeof params === 'object')
                            $.extend(this.params,params);
                    },
    
    /**
    @param {array} d Data to be set on the ojbect
    @param {number} [t] Total number of records in the data set. If not specified setData will count the data set.
    
    Can be called to set data locally or called by loadData(). Fires a number of events and event hooks. See loadData().
    */
    setData:        function(d,t){
                        var me = this;
                        
                        // Event hook for before the data is set
                        me.beforeSet(d);
                        
                        // Set the data
                        me.data = me.processData(d);
                        me.total = (t !== undefined) ? t : me.data.length;
                        
                        // Event hooks for after the data is set
                        me.dataChanged(me.data);
                        $(window).trigger($.Event('datachanged'),[(me.name || 'wui-data'), me]);
                        me.afterSet(me.data);
                    },
    
    /** Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData(). */
    beforeLoad:        function(){},
    
    /**
    @param    {array}    data    The value of the data cofig of the current object
    Event hook that fires after data is set. Meant to be overridden. See loadData().
    */
    afterSet:        function(){},
    
    /**
    @param {array} d Data to be set on the ojbect
    Event hook that fires after the remote call but before data is set on the object. Meant to be overridden. See loadData().
    */
    beforeSet:        function(){},
    
    /**
    @param {object or array} r Response from the server in JSON format
    Runs when loadData() successfully completes a remote call. Gets data straight or gets it out of the dataContainer and totalContainer. See loadData().
    Calls setData() passing the response and total.
    */
    success:        function(r){
                        var me = this, unwrapped = Wui.unwrapData.call(me,r);
                        me.waiting = false;
                        me.onSuccess(r);
                        me.setData(unwrapped.data, unwrapped.total);
                    },
    
    /**
    Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData().
    */
    onSuccess:        function(){},
    
    /**
    Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData().
    */
    onFailure:        function(){},
    failure:        function(e){
                        this.waiting = false;
                        this.onFailure(e);
                    },
    
    /** 
    @param {array} Data to be processed.
    Allows for pre-processing of the data before it is taken into the data object. Meant to be overridden, otherwise will act as a pass-through. See loadData().*/
    processData:    function(response){ return response; }
};


/**

*/
Wui.Template = function(args){ $.extend(this,args); };
Wui.Template.prototype = {
    /** The HTML template that the data will fit into. Null value will cause an error to be thrown. Specification required. */
    template:    null,
    
    /** A single record to be applied to the template. Null value will cause an error to be thrown. Specification required.  */
    data:        null,
    
    /**
    @param {number} [index] An optional number to make an index available to the record
    @return A jQuery object containing the template paired with its data
    Creates the template 
    */
    make:    function(index){
                var me = this;
                if(me.data && me.template){
                    var tplCopy = me.template;
                    
                    if($.isNumeric(index))    $.extend(me.data,{wuiIndex:index});
                    
                    return $(
                        tplCopy
                        // replaces straight values
                        .replace(/\{(\w*)\}/g,function(m,key){return (me.data[key] !== undefined) ? me.data[key] : "";})
                        // accounts for complex expressions
                        .replace(/\{\((.*?)\)\}/g,function(m,fn){
                            var keys = Wui.getKeys(me.data),
                                vals = [];
                            
                            // fill arrays of keys and their values and make sure they are in the same order
                            for(var i = 0; i < keys.length; i++)        vals.push(me.data[keys[i]]);
                            
                            // add the passed in conditional as the body of the function created below
                            keys.push("return " + fn);
                            
                            // create function that will perform the conditional statement
                            var newFn = Function.apply(null,keys);
                            
                            // call the function with the keys as variables in scope
                            return newFn.apply(null,vals);
                        })
                    );
                }
                throw new Error('Template engine missing data and/or template.');
            }
};


/** WUI Data List
 @event        wuiselect        A data template is selected ( DataList, el, record )
 @event        wuichange        The selected item info along with the previous selected record if it exists ( DataList, el, record, old el, old record )
 @event        wuideselect        A selected item is clicked again, and thus deselected ( DataList, el, record )
 
 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
 @creation   2013-10-25
 @version    1.1.2
*/
Wui.DataList = function(args){
    $.extend(this, {
        /** @eventhook Called after the data's DOM elements are made */
        afterMake:    function(){},
        
        /** Determines whether templates are made immediately when the DataList is rendered */
        autoLoad:    true,
        
        /** DOM element where all of the data templates will be appended. */
        el:            $('<div>'),
        
        /** Maximum number of data elements to display, even if data set is larger. */
        displayMax: -1,
        
        /** Method that will run immediately when the object is constructed. */
        init:        function(){},
        
        /** Whether multiple rows/records can be selected at once. */
        multiSelect:    false,
        
        /** An array of the currently selected records */
        selected:        []
    }, args);
    this.init();
};
Wui.DataList.prototype = $.extend(new Wui.O(), new Wui.Template(), new Wui.Data(), {
    /** Overrides the Wui.Data method that serves as an event hook. Calls the DataList's make() method. */
    dataChanged:function(){ this.make(); },
    
    /** Clears the selection on the data list */
    clearSelect:function(){
                    var me = this;
                    me.el.find('.wui-selected').removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuichange'), [me, me.el, me.selected]);
                },
    
    /**
    @param    {object}    itm            Object containing an el (jQuery object), and a rec (data object)
    @param    {boolean}    silent        A true value prevents the 'wuiselect' event from firing
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is selected @private
    */
    itemSelect:function(itm, silent){
                    var me = this;
                        
                    me.el.find('.wui-selected').removeClass('wui-selected');
                    itm.el.addClass('wui-selected');
                    me.selected = [itm];
                    
                    if(!me.multiSelect && !silent)
                        me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec]);
                    
                    return itm;
                },

    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is deselected @private
    */        
    itemDeselect:function(itm){
                    var me = this;
                    itm.el.removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('deselect'),[me, itm.el, itm.rec]);
                    
                    return itm;
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in with listeners added
    Adds the click listeners to the item and calls modifyItem to add greater flexibility
    */
    createItem:    function(itm){
                    var me = this;
                    
                    itm.el.click(function(e){
                        // Determine the # of selected items before the change
                        var selectedCount = me.selected.length;
                        
                        if(!me.multiSelect || !(e.metaKey || e.ctrlKey)){
                            if(selectedCount > 0 && me.selected[0] === itm){
                                //deselect item
                                me.itemDeselect(itm);
                            }else{
                                //change selection
                                me.itemSelect(itm);
                            }
                        }else{
                            var alreadySelected = $(this).hasClass('wui-selected');
                            $(this).toggleClass('wui-selected',!alreadySelected);

                            if(alreadySelected) $.each(me.selected || [], function(idx,sel){ if(sel == itm) me.selected.splice(idx,1); });
                            else                me.selected.push(itm);
                        }
                        me.el.trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }).dblclick(function(e){
                        me.itemSelect(itm,true);
                        me.el.trigger($.Event('wuidblclick'),[me, itm.el, itm.rec])
                             .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                             
                        return false; // stops propagation & prevents default
                    });
                    return me.modifyItem(itm);
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The DOM element
    Performs any desired modification on an object - this method is meant to be overridden.
    */
    modifyItem:    function(itm){ return itm.el; },
    
    /** Creates the templates based on current data. Then appends them to the el with listeners */
    make:        function(){
                    var me = this,
                        holdingData = me.data || [],
                        holder = $('<div>');
                    
                    // Clear out items list
                    me.items = [];

                    // Add items to me.items
                    for(var i = 0; (me.displayMax < 0 && i < holdingData.length) || (me.displayMax > 0 && i < me.displayMax && i < holdingData.length); i++){
                        var rec = me.data = holdingData[i],
                            itm = {el:Wui.Template.prototype.make.call(me, i), rec:rec};
                            
                        Array.prototype.push.call(me.items,itm);
                        holder.append(me.createItem(itm));
                    }
                    
                    // Clear out existing items and add new to the DOM
                    me.clear();
                    me.append(holder.children().unwrap());
                    me.data = holdingData;
                    
                    // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                    // object has been manually run
                    me.autoLoad = true;
                    
                    // Event hook and event
                    me.afterMake();
                    me.el.trigger($.Event('refresh'),[me,me.data]);
                    
                    // Reset selected items if any
                    me.resetSelect();
                },
                
    /** Runs when the object has been appended to its target. Then appends the data templates with listeners. */
    onRender:    function(){
                    if(this.autoLoad){
                        if(this.url === null)   this.make();
                        else                    this.loadData();
                    }
                },
                
    /** Refreshes the DataList to match the data or reload it from the server */
    refresh:    function(){ this.onRender(); },
    
    /**  Reselects previously selected rows after a data change or sort. Scrolls to the first currently selected row. */
    resetSelect:function(){
                    var me = this,
                        selList = me.selected;
                    
                    // Clear current selection list after making a copy of previously selected items
                    me.selected = [];
                    
                    $.each(selList || [],function(i,sel){
                        me.each(function(itm){
                            var sameRec = (me.identifier) ? itm.rec[me.identifier] === sel.rec[me.identifier] : JSON.stringify(itm.rec) === JSON.stringify(sel.rec);
                            
                            if(sameRec){
                                if(me.multiSelect){
                                    itm.el.addClass('wui-selected');
                                    me.selected.push(itm, true);
                                }else{
                                    me.itemSelect(itm);
                                }
                            }
                        });
                    });

                    me.scrollToCurrent();
                },
                    
    /** Scrolls the list to the currently selected item. */            
    scrollToCurrent:function(){
                        var me = this,
                            firstSelect = me.el.find('.wui-selected:first'),
                            ofstP = firstSelect.offsetParent(),
                            offset = (function(){ var r = 0; firstSelect.prevAll().each(function(){ r += $(this).outerHeight() - 0.55; }); return  r; })();
                        ofstP.animate({scrollTop:offset },500);
                    },
                    
    /**
    @param    {string} key The data item to look for
    @param    {string|number} val The value to look for
    @return An object containing the dataList, row, and record, or undefined if there was no matching row.
    Selects an item according to the key value pair to be found in a record. */
    selectBy:        function(key,val){
                        var me = this, retVal = undefined;
                        me.each(function(itm){
                            if(itm.rec[key] && itm.rec[key] == val)
                                return retVal = me.itemSelect(itm);
                        });
                        me.scrollToCurrent();
                        return retVal;
                    }
});



/**
 @event        wuibtnclick        Fires when the button is pressed and not disabled. Avoided using the standard 'click' event for this reason ( Button Object )
 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
*/
Wui.Button = function(args){
    $.extend(this, {
        /** The button element. Can be overridden according to the needs of the design. */
        el:            $('<button>').attr({unselectable:'on'}),
        
        /** Whether the button is disabled. */
        disabled:    false,
        
        /** Tool tip text for the button. */
        toolTip:    null,
        
        /** Tab index will make the button focusable by the browser. Changing this value will result in it receiving a higher precedence than what it would receive in that natural flow of the page. */
        tabIndex:    0,
        
        /** Text to appear on the button. Can be HTML if a more complex button design is desired. */
        text:       'Button'
    }, args);
    
    this.init();
};
Wui.Button.prototype = $.extend(new Wui.O(),{
    /** Event hook for the button click. */
    click:      function(){},
    
    /** Method that will run immediately when the object is constructed. Adds the click listener with functionality to disable the button.*/
    init:       function(){ 
                    var me = this;
                    
                    me.el
                    .addClass('wui-btn')
                    .click(btnClick)
                    .keyup(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    if(me.disabled)    me.disable();
                    
                    function btnClick(e){
                        if(!me.disabled){
                            me.click(arguments);
                            me.el.trigger($.Event('wuibtnclick'),[me]);
                        }
                        return false;
                    }
                },
    
    /** Disables the button */
    disable:    function(){
                    this.disabled = true;
                    this.el
                    .toggleClass('disabled',this.disabled)
                    .attr('disabled',true)
                    .removeAttr('tabindex');
                },
    /** Enables the button */
    enable:        function(){
                    this.disabled = false;
                    this.el
                    .toggleClass('disabled',this.disabled)
                    .removeAttr('disabled')
                    .attr({tabindex:this.tabIndex});
                },
    /** Sets the button text. Can be HTML. */
    setText:    function(txt){ return this.el.html(txt); },
});


/**
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

WUI Pane
*/
Wui.Pane = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:        true,
        
        /** Configuration for the pane border - follows the jQuery CSS convention */
        borderStyle:{borderWidth:6},
        
        /** An array of items that will be added to the header */
        tbar:       [],
        
        /** Whether or not the pane is disabled on load */
        disabled:    false,
        
        /** Alignment of the heading title (left,center,right) */
        titleAlign:    'left',
                
        /** Default height */
        height:        '100%',
    
        /** HTML to show in the mask when the pane is disabled */
        maskHTML:    'Empty',
        
        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:        null
    },args); 
    this.init();
};
Wui.Pane.prototype = $.extend(new Wui.O(),{
    /** Disables the pane by masking it and disabling all buttons */
    disable:        function(){
                        this.addMask();
                        this.footer.each(function(itm){ if(itm.disable) itm.disable(); });
                        this.header.each(function(itm){ if(itm.disable) itm.disable(); });
                        return this.disabled = true;
                    },
    
    /** Enables the pane by removing the mask and enabling all buttons */
    enable:            function(){
                            var me = this;
                            me.removeMask();
                            me.footer.each(function(itm){ if(itm.enable) itm.enable(); });
                            me.header.each(function(itm){ if(itm.enable) itm.enable(); });
                            return me.disabled = false;
                    },
    
    /** 
    Adds a mask over the content area of the pane 
    @param  {object}    target  A target to apply the mask, otherwise the pane's container will be masked.
    @return The mask object
    */
    addMask:        function(target){
                        target = (target) ? target : this.container.parent();
                        return this.mask = $('<div>').addClass('wui-mask').html(this.maskHTML).appendTo(target);
                    },

    /** Removes the mask over the content area of the pane */
    removeMask:     function(){
                        var me = this, mask = me.mask || me.el.find('.wui-mask');
                        
                        if(mask){
                            mask.fadeOut(500,function(){ 
                                me.mask = undefined;
                                me.el.find('.wui-mask').remove();
                            });
                        }
                    },

    /**
    @param    {string} html    New HTML content to be set on the disabled mask
    Sets the maskHTML property to the value of html passed in. If mask presently exists it will change the value on the current mask.
    */
    setMaskHTML:    function(html){
                        this.maskHTML = html;
                        if(this.mask)    this.mask.html(html);
                    },
    
    /** Method that will run immediately when the object is constructed. */
    init:            function(wuiPane){
                        var me = wuiPane || this;
                        me.el         = $('<div>').addClass('wui-pane').append(
                                           $('<div>').addClass('wui-pane-wrap').append(
                                               me.container = $('<div>').addClass('wui-pane-content')
                                           )
                                       );
                        me.sureEl     = me.el;
                        me.header    = new Wui.O({el:$('<div><span class="wui-h-title"></span><div class="wui-h-cntnt"></div></div>'), cls:'wui-pane-header wui-pane-bar', items:me.tbar, parent:me, appendTo:me.el});
                                       me.header.elAlias = me.header.el.children('.wui-h-cntnt');
                                       me.header.title = me.header.el.children('.wui-h-title');
                                       
                        me.footer    = new Wui.O({el:$('<div>'), cls:'wui-pane-footer wui-pane-bar', items:me.bbar, parent:me, appendTo:me.el});
                        me.elAlias     = me.container;
                        
                        // Set  border if applicable
                        if(me.border) me.el.css(me.borderStyle);
                        
                        // Add header and footer to the pane if theres something to put in them
                        if(me.tbar.length !== 0 || me.title !== null){
                            me.placeHeader();
                            
                            // Set the title on the pane
                            me.setTitle(me.title);
                        }
                        if(me.bbar.length !== 0) me.placeFooter();
                    },

    /** Places the footer on the pane and adjusts the content as necessary. */
    placeFooter:    function(){
                        this.sureEl.css({borderBottomWidth:0});
                        this.sureEl.children('.wui-pane-wrap').css({paddingBottom:'40px'});
                        this.footer.place();
                        this.footer.callRender();
                    },
    
    /** Places the header on the pane and adjusts the content as necessary. */
    placeHeader:    function(){
                        this.sureEl.css({borderTopWidth:0});
                        this.sureEl.children('.wui-pane-wrap').css({paddingTop:'40px'});
                        this.setTitleAlign();
                        this.header.place();
                        this.header.callRender();
                    },
    
    /** Changes the title on the pane. */
    setTitle:       function(t){ 
                        if(t)
                            this.header.title.text(this.title = t);
                        return t;
                    },
    
    /** Changes the title on the pane. */
    setTitleAlign:    function(t){ 
                        var me = this;
                        
                        me.titleAlign = t || me.titleAlign;
                        me.header.title.addClass(me.titleAlign);
                        
                        var itemsAlignment = me.titleAlign === 'right' ? 'left' : 'right'; 
                        me.header.elAlias.css('text-align',itemsAlignment);
                    },
    
    /** Runs after a pane is rendered. Sets up layout listeners and sets focus on the bottom-right-most button if any */
    afterRender:    function(){
                        var me = this;
                        
                        document.addEventListener("animationstart", doLayout, false);         // standard + firefox
                        document.addEventListener("MSAnimationStart", doLayout, false);     // IE
                        document.addEventListener("webkitAnimationStart", doLayout, false); // Chrome + Safari
                        
                        function doLayout(){
                            if(!me.parent && !(me instanceof Wui.Window)) me.layout();
                        }

                        if(me.disabled){
                            // If the pane is disabled then it disables it
                            me.disable();
                        }else if(this.footer.items.length){
                            // Set focus to the bottom right most button in the pane
                            this.footer.items[this.footer.items.length - 1].el.focus();
                        }
                    }
});


/**
@event        open    When the window is opened (window)
@event        resize    When the window is resized (width, height)
@event        close    When the window is closed (window)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
WUI Window
*/
Wui.Window = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:        false,
        
        /** Set the height of the window */
        height:        400,
        
        /** Determines whether objects behind the window are accessible */
        isModal:    false,
        
        /** 
        @param {WUI Window} win    The window being closed.
        @eventhook Called just before the window closes. If this function returns false, the window will not be closed. 
        */
        onWinClose:    function(){},
        
        /** 
        @param {WUI Window} win    The window being opened.
        @eventhook Called when the window opens. 
        */
        onWinOpen:    function(){},
        
        /** An array of items that will be added to the header */
        tbar:       [], 
        
        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:        'Window',
        
        /** Change what comes by default in the pane */
        maskHTML:    'Loading <span class="wui-spinner"></span>',
        
        /** Set the width of the window */
        width:        600
    },args);  
    this.init(); 
};
Wui.Window.prototype = $.extend(new Wui.Pane(),{
    /** Closes the window unless onWinClose() event hook returns false. */
    close:        function(){ 
                    var me = this;
                    if(me.onWinClose(me) !== false){
                        me.windowEl.trigger($.Event('close'),[me]);
                        me.remove();
                    }
                },
    
    /** Disables the window by masking it and disabling all buttons besides the close window button. */
    disable:    function(){
                    Wui.Pane.prototype.disable.call(this);
                    this.closeBtn.enable(); // Enable the close button for the window - esp. important if its modal
                },
                
    /** Method that will run immediately when the object is constructed. */
    init:       function(){
                    var me = this;
                    me.appendTo = $('body');
                    
                    // Make it a modal window & add everything to the DOM
                    if(me.isModal){
                        me.modalEl = $('<div>').addClass('wui-overlay');
                        $('body').append(me.appendTo = me.modalEl.css('z-index',Wui.maxZ()));
                    }
                    
                    // Add close buttons where appropriate
                    me.tbar.push(me.closeBtn = new Wui.Button({ click:function(){me.close(); }, text:'X'}));
                    if(me.bbar.length === 0) me.bbar = [new Wui.Button({click:function(){me.close(); }, text:'Close'})];
                    
                    // Calls the parent init function
                    Wui.Pane.prototype.init(me);
                    
                    // Add window specific properties
                    me.windowEl = me.el
                    .draggable({handle: me.header.el, start:bringToFront})
                    .addClass('wui-window')
                    .resizable({
                        minWidth:   me.width,
                        minHeight:  me.height,
                        resize:     function(){ me.container.trigger($.Event('resize'),[me.container.width(), me.container.height()]); }
                    })
                    .css('z-index',Wui.maxZ() + 1)
                    .click(bringToFront);
                    
                    me.place();
                    
                    // Resize the window and center
                    me.resize();
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    this.onWinOpen(me);
                    me.windowEl.trigger($.Event('open'),[me]);
                    
                    function bringToFront(e){
                        if(parseInt((me.el.css('z-index')) || 1) <= Wui.maxZ()){
                            me.el.css('z-index',Wui.maxZ() + 1);
                        }
                    }
                },

    /** 
    @param {[number]} resizeWidth Number of pixels for the window width
    @param {[number]} resizeHeight Number of pixels for the window height
    
    If width and height aren't specified, the window is sized vertically to try to fit its contents 
    without getting larger than the browser viewport.
    */
    resize:        function(resizeWidth, resizeHeight){
                    var me = this,
                        totalHeight = me.container[0].scrollHeight + (me.header.el.outerHeight() * 2);

                    //size the window to according to arguments, or fit its contents as long as its smaller than the height of the window
                    if(arguments.length !== 0)me.windowEl.height(me.height = resizeHeight).width(me.width = resizeWidth);
                    else                      me.windowEl.height(((totalHeight >= $.viewportH()) ? ($.viewportH() - 10) : totalHeight));
                    
                    // Center window
                    me.windowEl.css({
                        top:        Math.floor(($.viewportH() / 2) - (me.windowEl.height() / 2)) + 'px',
                        left:       Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)) + 'px'
                    });
                    
                    me.container.trigger($.Event('resize'),[me.container.width(), me.container.height()]);
                    
                    me.layout(function(){
                        if(me.isModal){ me.modalEl.css({width:'', height:''}); }
                    });
                }
});


/** Shows an message in a modal window
@param {string}         msg         A message for the user
@param {[string]}       msgTitle    Title for the window. Default is 'Message'
@param {[function]}     callback    Function to perform when the message window closes - returning false will prevent the window from closing.
@param {[string]}       content     An additional Wui object to place on window
@return The Wui.Window object of the message window.
@author     Stephen Nielsen
*/
Wui.msg = function(msg, msgTitle, callback, content){
    var cntnt = (content !== undefined) ? [new Wui.O({el: $('<p>').html(msg) }), content] : [new Wui.O({el: $('<p>').html(msg) })],
        msgWin  = new Wui.Window({
            title:      msgTitle || 'Message', 
            isModal:    true,
            items:      cntnt, 
            width:      350, 
            height:     200,
            onWinClose: callback || function(){}
        });
    return msgWin;
};

/** Shows an error message
@param {string}         errMsg      Message explaining the error
@param {[string]}       msgTitle    Title for the window. Default is 'Error'
@param {[array]}        buttons     Array containing Wui.Button(s) to give additional functionality.
@param {[function]}     callback    Function to perform when the error window closes - returning false will prevent the window from closing.
@author     Stephen Nielsen
*/
Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
    var err = Wui.msg(errMsg,msgTitle,callback);
    if($.isArray(buttons))
        err.footer.push.apply(err.footer,buttons);
    err.container.find('p').addClass('wui-err');
    return err;
};

/** Shows an message in a modal window with yes and no buttons. Answers are passed to callback().
The window will not close until an answer is selected.

@param {string}         msg         A message for the user
@param {[string]}       msgTitle    Title for the window. Default is 'Message'
@param {[function]}     callback    Function to perform when the message window closes - returning false will prevent the window from closing.
@param {[string]}       content     An additional Wui object to place on window
@return The Wui.Window object of the confirmation message.
@author     Stephen Nielsen
*/
Wui.confirm = function(msg, msgTitle, callback, content){
    var cw = Wui.msg.apply(this,arguments);
    cw.doAnswer = function(ans){
        if(callback && typeof callback == 'function')    callback(ans);
        cw.answerRun = true;
        cw.close();
    };
    cw.onWinClose= function(){ return ((cw.answerRun !== true) ? false : cw.answerRun); };
    cw.footer.splice(0,1,
        new Wui.Button({text:'No', click:function(){ cw.doAnswer(false); }}),
        new Wui.Button({text:'Yes', click:function(){ cw.doAnswer(true); }})
    );
    cw.header.splice(0,1);
    return cw;
};

}(jQuery,this));

(function($,Wui) {

/** 
@event        tabchange When a tab changes (tab pane, tab button, tab item)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
Tab pane
*/
Wui.Tabs = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:   [],
        
        /** An array of items that will be added to the content */
        items:    [],
        
        /** Tabs default to the right side of the pane unless this is true. */
        tabsLeft:    false,
        
        /** A place holder for the currently selected tab. */
        currentTab:    null,
        
        /** Whether to put the tabs on the header or the footer. */
        tabsBottom:        false,
        
        /** Config to place on child items of WUI tabs to make their heading not show up */
        tabsHideHeader: null,
        
        /** An array of items that will be added to the header */
        tbar:    []
    },args); 
    this.init();
};
Wui.Tabs.prototype = $.extend(new Wui.Pane(),{
    /** Method that will run immediately when the object is constructed. Lays out targets. */
    init:            function(){
                        if(this.title === null)    this.title = '';
                        Wui.Pane.prototype.init.call(this);
                    },
    
    /** Overrides Wui.place(). Creates a Wui.Button as a tab for each item. */
    place:          function(){
                        var me = this;
                        
                        me.el.addClass('wui-tabs');
                        
                        //adds the objects items if any
                        if(me.items === undefined) me.items = [];
                        $.each(me.items,function(idx,itm){
                            itm.tabCls =    'wui-tab ' +
                                            ((itm.tabCls) ? ' ' + itm.tabCls : '') +
                                            ((me.tabsLeft) ? ' left' : '');
                            
                            if(itm.tabsHideHeader){
                                itm.el.css({borderTopWidth:itm.el.css('border-left-width')});
                                itm.el.addClass('wui-hide-heading');
                            }
                            
                            me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.Button({
                                text:   itm.title || 'Tab ' + (parseInt(idx) + 1),
                                click:  function(){ me.giveFocus(itm); },
                                cls:    itm.tabCls
                            }));
                            if(me.bbar.length !== 0) me.placeFooter();
                        });
                        
                        return Wui.O.prototype.place.call(me, function(m){ $.each(m.items,function(i,itm){ itm.el.addClass('wui-tab-panel'); }); }); //.wrap($('<div>')
                    },
    
    /** 
    @param {object} itm A WUI Object that will be matched in the items array. 
    @param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
    
    Sets the specified tab to active. Runs layout on the newly activated item.
    */
    giveFocus:        function(tab, supressEvent){
                        var me = this;
      
                        supressEvent = (supressEvent !== undefined) ? supressEvent : false;
                        
                        $.each(me.items,function(idx,itm){
                            var isActive = itm === tab;
                            itm.tab.el.toggleClass('selected', isActive);
                            itm.el.toggleClass('active', isActive);
                            if(isActive){
                                me.currentTab = itm;
                                if(!supressEvent) me.el.trigger($.Event('tabchange'),[me, itm.tab, itm]);
                                itm.layout();
                            }
                        });
                    },
    
    /** 
    @param {string} txt The text of the tab button
    @param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
    @return The tab that was selected or undefined if the text didn't match any tabs
    
    Gives focus to the tab with text that matches the value of txt. Strings with underscores
    are converted to spaces (eg. 'conferences_detail' = 'conferences detail')
    */
    selectTabByText:function(txt, supressEvent){
                        var me = this, retVal = undefined;
                        $.each(me.items,function(idx,itm){
                            if($.trim(itm.tab.text).toLowerCase() === $.trim(txt).toLowerCase().replace(/_/g,' ')){
                                me.giveFocus(itm, supressEvent);
                                retVal = itm;
                            }
                        });
                        return retVal;
                    },
    onRender:        function(){
                        this.giveFocus(this.items[0]);
                    }
});


/** 
@event          select          When a record is clicked (grid, row el, record)
@event          dblclickrecord  When a record is  double clicked clicked (grid, row el, record)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

The grid pane provides table-like functionality for data sets. Grids can be populated remotely
or have their data locally defined. Grids also support infinite scrolling by defining paging
parameters. Columns for the grid are defined in an array and with the following options:

heading         - The title of the column heading
cls             - A special class to add to the column
vertical        - Makes the column text oriented vertical and the column height at 150px
dataType        - The type of data used in the column (used for sorting)
dataItem        - The item in the record that correlates to this column
dataTemplate    - Sort of a full on renderer, this allows you to format inserted data similar to
                  what is available in Wui.Template
width           - A pixel value for the width of the column
fit             - A numeric indicator of the relative size of the column

Custom renderers can be applied to columns.  These renderers are defined as function that can
either be defined in the column definition, or defined elsewhere in scope and simply named by
a string. The rendering function is defined passed the following parameters as below:

renderer: function(grid, cell, value, record, row){}

Grids can be sorted by clicking on the headings of columns. Headings sort ascending on the first click, 
descending on the second and revert to their 'unsorted' order on the third.Sorting on multiple columns 
is possible with the a number indicating the precedence of the sort and an arrow for the direction of the sort 
appearing on the right side of the column heading.

Columns can be resized by dragging the heading borders left and right. Columns can be sized to 
extend beyond the width of the grid frame, but when sized smaller will pop back into position.

While not using Wui.fit(), the same principles apply in the sizing of elements, although percentage
values are not supported at this time.
*/
Wui.Grid = function(args){
    $.extend(this,{
        /** Array of items that will be added to the footer. */
        bbar:           [],
        
        /** Array of items that will make up the columns of the grid table. */
        columns:         [],
        
        /** URL to get columns if its a dynamic grid */
        colUrl:            null,
        
        /** Params to pass for columns on a dynamic grid */
        colParams:        {},
        
        /** Array of data for the grid. */
        data:            null,
        
        /** Data type the grid assumes a column will be. Matters for sorting. Other values are 'numeric' and 'date' */
        defaultDataType:'string',
        
        /** Whether multiple rows/records can be selected at once. */
        multiSelect:    false,
        
        /** Whether or not to hide the column headers */
        hideHeader:        false,
        
        /** An array of the currently selected records */
        selected:        [],
        
        /** An array of items that will be added to the header */
        tbar:           []
    },args); 
    this.init();
};
Wui.Grid.prototype = $.extend(new Wui.Pane(), new Wui.DataList(),{
    /** Overrides DataList.afterMake(), sizes the columns and enables the grid @eventhook */
    afterMake:    function(){
                    this.sizeCols();
                    this.removeMask();
                },
    
    /** 
    Recursive function for sorting on multiple columns @private
    @param {number}    depth    Depth of the recursive call
    @param {number}    a        First item to compare
    @param {number}    b        Second item to compare
    
    @return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
    */
    doSort:            function(depth,a,b){
                        var me = this;
                        if(me.sorters.length > 0){
                            var col = me.sorters[depth],
                                compA = a.rec[col.dataItem],
                                compB = b.rec[col.dataItem];
                                
                            //get the direction of the second sort
                            var srtVal = (col.sortDir == 'asc') ? 1 : -1;
                            
                            // perform the comparison based on 
                            var compare = 0;
                            switch(col.dataType){
                                case 'date':
                                    compA = new Date(compA);
                                    compB = new Date(compB);
                                    compare = (compA.getTime() == compB.getTime()) ? 0 : (compA.getTime() > compB.getTime()) ? 1 : -1;
                                    break;
                                case 'numeric':
                                    compA = (parseFloat(compA)) ? parseFloat(compA) : 0;
                                    compB = (parseFloat(compB)) ? parseFloat(compB) : 0;
                                    compare = (compA == compB) ? 0 : (compA > compB) ? 1 : -1;
                                    break;
                                default:
                                    compare = $.trim(compA).toUpperCase().localeCompare($.trim(compB).toUpperCase());
                            }
                            
                            if(compare !== 0 || me.sorters[depth + 1] === undefined)    return compare * srtVal;
                            else                                                    return me.doSort(depth + 1,a,b);
                        }else{
                            return (a.rec.wuiIndex > b.rec.wuiIndex) ? 1 : -1;
                        }
                    },
                    
    /** Verify that columns have been defined on the grid, or that they are available remotely */
    getColumns: function(){
                    var me = this;
                    
                    if(me.colUrl && me.colUrl.length){
                        // Make remote call for columns
                        me.colProxy = new Wui.Data({url:me.colUrl, params:me.colParams, afterSet:function(r){ me.setColumns(r); } });
                        me.colProxy.loadData();
                    }else if(me.columns.length){
                        // Check for locally defined columns
                        me.setColumns(me.columns);
                    }else{
                        //throw('There are no columns defined for this WUI Grid.');
                    }
                        
                },
    
    /** Runs when the object is created, creates the DOM elements for the grid within the Wui.Pane that this object extends */
    init:        function(){
                    var me = this;
                    
                    // Set up container
                    Wui.Pane.prototype.init.call(me);
                    me.el.addClass('wui-grid');

                    // Add grid specific DOM elements and reset elAlias
                    me.tblContainer = $('<div><table></table></div>').addClass('grid-body').appendTo(me.elAlias);
                    me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh').appendTo(me.elAlias);
                    me.elAlias = me.tbl = me.tblContainer.children('table');
                    me.heading = me.headingContainer.children('ul');
                    
                    // columns and sorting on multiple columns
                    me.cols = [];
                    me.sorters = [];
                    
                    // hide the header
                    if(me.hideHeader)    me.headingContainer.height(0);
                },
    
    /** Overrides the Wui.O layout function and positions the data and sizes the columns. */
    layout:     function(){
                    Wui.O.prototype.layout.call(this);
                    this.posDataWin();
                    if(this.cols.length) this.sizeCols();
                },
                    
    /** Overrides DataList.loadData(), to add the load mask */   
    loadData:    function(){
                    this.setMaskHTML('Loading <span class="wui-spinner"></span>');
                    this.addMask();
                    Wui.Data.prototype.loadData.apply(this,arguments);
                },            
    
    /** 
    @param    {object}    col    An object containing the sort direction and DOM element of the heading
    @param    {string}    dir    The direction of the sort
    Manages the sorters for the grid by keeping them in an array. 
    */
    mngSorters:        function(col,dir){
                        var me = this,
                            sortClasses = ['one','two','three','four','five'];
                        if(dir !== undefined){
                            col.sortDir = dir;
                            me.sorters.push(col);
                        }else{
                            if(col.sortDir){
                                if(col.sortDir == 'desc'){
                                    delete col.sortDir;
                                    col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                    
                                    $.each(me.sorters,function(i,itm){
                                        if(itm == col)    me.sorters.splice(i,1);
                                    });
                                }else{
                                    col.sortDir = 'desc';
                                }
                            }else{
                                // Can't sort on more than 5 columns
                                if(me.sorters.length > 5){
                                    col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                    return false;
                                }
                                
                                col.sortDir = 'asc';
                                me.sorters.push(col);
                            }
                        }
                            
                        $.each(me.sorters,function(i,itm){
                            itm.el.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir).addClass(itm.cls);
                        });
                    },
    
    /** Overrides DataList.modifyItem(), to implement the renderers */        
    modifyItem:    function(itm){
                    var me = this;
                    // Perform renderers (if any)
                    $.each(me.renderers,function(idx, r){
                        var cell = itm.el.children(':eq(' +r.index+ ')').children('div'),
                            val = itm.rec[r.dataItem];
                        
                        cell.empty().append(r.renderer.call(null, cell, val, itm.rec, itm.el));
                    });
                    return itm.el;
                },
    
    /** Overrides DataList.onRender(), to have the grid wait for columns before loading data while still preserving the set autoLoad value. */   
    onRender:    function(){
                    // Store the real value of autoLoad, but set it to false so that the grid waits for the columns
                    // before loading data.
                    var me = this, al = me.autoLoad;
                    me.autoLoad = false;
                    
                    //Wui.Pane.prototype.onRender.call(this);
                    Wui.DataList.prototype.onRender.call(this);
                    
                    // Start with getting the columns - Many methods waterfall from here
                    me.autoLoad = al;
                    this.getColumns();
                },
    
    /** Positions the height and width of the data table's container @private */
    posDataWin:        function(){
                        var hh = this.headingContainer.height() - 1;
                        this.tblContainer.css({height:this.container.height() - hh, top:hh});
                    },
    
    /** Overrides DataList.refresh() to add disabling the grid to add the load mask */
    refresh:        function(){
                        if(this.url === null)    this.setData(this.data);
                        else                    this.getColumns();
                    },    

    /** Fill in gaps in the column definition and append to the cols array. The cols array is what the grid uses to 
    render/reference columns. The append the column to the DOM */            
    renderColumn:function(col,idx){
                    var me = this;
                    
                    $.extend(col,{
                        dataType:    col.dataType || me.defaultDataType,
                        fit:        (col.fit === undefined) ? (col.width === undefined) ? 1 : 0 : col.fit,
                        cls:        col.cls || '',
                        renderer:    (col.renderer) ?    (function(a){
                                                            // Handles renderer if it exists
                                                            if(typeof a !== 'function' && eval('typeof ' + a) == 'function')
                                                                a = new Function('return ' + a + '.apply(this,arguments)');
                                                            if(typeof a === 'function')
                                                                me.renderers.push({dataItem:col.dataItem, renderer:a, index:idx});
                                                        })(col.renderer) : '',
                        index:        idx,
                        width:        col.width === undefined ? 0 : col.width,
                        el:            $('<li>')
                                    .append($('<div>').text(col.heading))
                                    .attr({unselectable:'on'})
                                    .addClass('wui-gc ' + col.cls)
                                    .click(function(){ me.sortList(col); })
                    });
                    
                    //grids with single columns shouldn't have a resizable option
                    if(me.columns.length > 1 && !col.vertical){
                        col.el.resizable({
                            handles:    'e',
                            start:      function(event,ui){ me.tempLayout = me.layout; me.layout = function(){}; },
                            stop:       function(event,ui){ me.sizeCols(); me.layout = me.tempLayout; },
                            resize:     function(event,ui){ 
                                            col.width = ui.size.width; col.fit = 0;
                                            Wui.fit(me.cols,'width',(me.tbl.find('tr:first').height() * me.total > me.tblContainer.height()));
                                        }
                        });
                    }
                    
                    me.cols.push(col);
                    
                    // Append newly created el to the DOM
                    me.heading.append(col.el);
                },
    
    /** Ensures that columns have all of the proper information */
    setColumns: function(cols){
                    var me = this;
                    
                    // clear column list
                    me.columns = cols;
                    me.heading.empty();
                    me.cols = [];
                    me.items = [];
                    me.renderers = [];
                    
                    // clear template
                    me.template = '<tr class="{((wuiIndex % 2 == 0) ? \'even\' : \'odd\')}">';
                    
                    // apply columns on grid
                    $.each(cols,function(i,col){
                        // Add to the template string based on column info
                        var tpltItem = (col.dataTemplate) ? col.dataTemplate : ((col.dataItem) ? '{' +col.dataItem+ '}' : '');
                        me.template += '<td><div>' +tpltItem+ '</div></td>';
                        
                        // Deal with vertical columns - forces them to be 48px wide
                        if(col.vertical){
                            me.el.addClass('has-vert-columns');
                            if(col.cls)    col.cls += ' vert-col';
                            else        col.cls = 'vert-col';
                            
                            col.width = 50;
                            delete col.fit;
                        }
                        
                        // Add column to cols array
                        me.renderColumn(col,i);
                    });
                    
                    // finish template
                    me.template += '</tr>';
                    
                    if(me.autoLoad){
                        if(me.url === null)    me.setData(me.data);
                        else                me.loadData();
                    }
                },
                
    /** Size up the columns of the table to match the headings @private */
    sizeCols:        function (){
                        var me = this, totalColWidth = 0;
                        Wui.fit(me.cols,'width',(me.tbl.find('tr:first').height() * me.total > me.tblContainer.height()));
                        for(var i = 0; i < me.cols.length; i++){
                            var colWidth = me.cols[i].el.outerWidth() - ((i === 0 || i == me.cols.length - 1) ? 1 : 0);
                            me.tbl.find('td:eq(' +i+ ')').css({width:colWidth}); // account for table borders
                            totalColWidth += colWidth;
                        }
                        me.tbl.css({width:totalColWidth});
                    },
                    
    /**
    @param    {object}    Column object associated with a particular column element
    Sort the grid based on the values of one or more columns. If the grid is paging
    then sort remotely.
    */
    sortList:        function(col) {
                        var me = this;
                        
                        me.mngSorters(col);
                        
                        // Sort the list
                        var listitems = me.items;
                        listitems.sort(function(a, b){ return me.doSort(0, a, b); });

                        me.tbl.detach();
                        // Place items and reset alternate coloring
                        $.each(listitems, function(idx, row) { 
                            var isEven = idx % 2 === 0;
                            row.el.toggleClass('even',isEven).toggleClass('odd',!isEven).appendTo(me.tbl);
                        });
                        me.tbl.appendTo(me.tblContainer);
                        me.resetSelect();
                    }
});

}(jQuery,Wui));


(function($,Wui) {

$.fn.overrideNodeMethod = function(methodName, action) {
    var originalVal = $.fn[methodName];
    var thisNode = this;
    $.fn[methodName] = function() {
        if (this[0]==thisNode[0]) {
            return action.apply(this, arguments);
        } else {
            return originalVal.apply(this, arguments);
        }
    };
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@event  formupdate Fires when a field on the form changes. Passes (event, form, [field])
A WUI Form is a collection of Wui.FormField objects with methods to
both collectively and individually interact with those objects.
*/
Wui.Form = function(args){
    $.extend(this,{
        /** Config to disable the entire form */ 
        disabled:       false,
        
        /**  Position of the label relative to the form fields that is generally applied unless
        specifically defined on a particular field. */
        labelPosition:  'top'
    }, args, {
        /** Flag for whether data on the form has been changed - set by the individual fields */
        formChanged:    false,
        
        /** DOM element of the form */
        el:             $('<div>').addClass('wui-form'),
        
        /** @private Array to store one or more errors when a form is validated */
        errors:         []
    });
    
    this.init();
};
Wui.Form.prototype = $.extend(new Wui.O(),{
    /** Blanks out the values of all form fields. Value of fields will be null*/
    clearData:  function(){ this.setData(); },

    /** Display errors generated by validating the form */
    dispErrors:    function(){
                    var msg = '';
                    for(var e = 0; e < this.errors.length; e++) msg += this.errors[e] + '<br/>';
                    Wui.errRpt(msg,'Form Errors');
                },

    /**
    @param {function} fn A function that gets called for each item of the form with the exception of Wui.Note objects
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    each:        function(f){
                    return Wui.O.prototype.each.call(this,function(itm,i){
                        if(!(itm instanceof Wui.Note)) return f(itm,i);
                    });
                },

    /** Class to hilight form fields when they fail validation */
    errCls:        'wui-form-err',

    /**
    @return Object containing the data of the form fields, or false if there was a validation error
    Performs validation on the form and returns either the form data or false. */
    getData:    function(){
                    if(this.validate())    { return this.getRawData(); }
                    else                { this.dispErrors(); return false; }
                },

    /**
    @param {string} fieldname name of the desired field.
    @return Value of the field
    Returns a form item's value - does not perform validation. */
    getField:   function(fieldname){
                    var retval = null;
                    this.each(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
                    return retval;
                },
    
    /**
    @param {string} fieldname name of the desired field.
    @return Form item, not the DOM element, but the item in memory
    Returns a form item. */
    getFrmItm:    function(fieldname){
                    var retItm = undefined;
                    this.each(function(itm,idx){ if(itm.name == fieldname) retItm = itm; });
                    return retItm;
                },
                
    /**
    @return Object containing the data of the form fields
    Gets the values of form fields without performing validation */
    getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); });
                    return ret;
                },
                
    /** Method that will run immediately when the object is constructed. */           
    init:        function(){},
                
    /**
    @param    {object|Wui.FrmField}    itm    Object to be added to a form
    @return Object with form attributes applied.
    Passed in items should either be Wui.FormField's which will have some of the form's attributes applied to them,
    or they will be objects containing an 'ftype' which is a string specifying a constructor.  The
    object will then be constructed and have form attributes applied. */
    normFrmItem:function(itm){
                    var me = this;

                    // If a form is disabled, the field needs to be disabled too
                    if(!(itm.disabled && itm.disabled === true)) $.extend(itm,{disabled: me.disabled});

                    if(itm.ftype && !(itm instanceof Wui.FormField)){
                        // If a field has its labelPosition defined then leave it alone, otherwise use the form's value.
                        if(!(itm.labelPosition)) $.extend(itm,{labelPosition: me.labelPosition});
                        
                        var ft = itm.ftype.split('.');
                        
                        if(window[ft[0]] && window[ft[0]][ft[1]])   return new window[ft[0]][ft[1]](itm);
                        else                                        throw('Object type ' +itm.ftype+ ' is not defined.');
                    }else if(itm instanceof Wui.FormField){
                        // If a field has its labelPosition defined then leave it alone, otherwise use what form's value.
                        if(!itm.hasOwnProperty('labelPosition') && itm.lbl) itm.lbl.setLabelPosition(me.labelPosition);
                        return itm;
                    }else{
                        return itm;
                    }
                },
                
    /**
    @param {function} [after]    A function to be called after an object has been placed
    @return The object that was placed 
    Similar to the Wui.O.place() with the addition of constructing the forms items first. */
    place:      function(){
                    var me = this;
                    if(me.items === undefined) me.items = [];
                    me.each(function(itm,i){ me.items[i] = me.normFrmItem(itm); });
                    return Wui.O.prototype.place.apply(this,arguments);
                },
    
    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Similar to the Wui.O.push() with the addition of running normFrmItem() on the item first.
    */
    push:        function(){
                    var me = this, itms = [];
                    $.each(arguments,function(i,arg){ itms.push(me.normFrmItem(arg)); });
                    return Wui.O.prototype.push.apply(this,itms);
                },
    /**
    @param {string} fieldname The name of the field to be removed
    @return True
    Removes a form field from a form based on its name.
    */
    remFrmItm:    function(fieldname){
                    var me = this;
                    this.each(function(itm,idx){ if(itm.name == fieldname) Wui.O.prototype.splice.call(me,idx,1); });
                    return true;
                },
    
    /** Changes the state of whether the form has changed. Fires the 'formupdate' event if true. Gets set to false when
        the form is validated or when data is set on the form.
    @param {boolean} changed True if the form changed, false to reset that value.
    @param {object} changedItem The item that actually changed.
    @return The value of the changed 
    */
    formChange: function(changed,changedItem){
                    if(changed) this.el.trigger($.Event('formupdate'), [this, changedItem]);
                    this.formChanged = changed;
                    return this.formChanged;
                },
    
    
    /**
    @param {object}     [data]            A collection of data to be set on the form
    @param {boolean}    [fireEvents]    A boolean value that if set to false will suppress events. 
    Sets form fields with names matching keys in passed in data. If data is not defined all
    form values get set to null. 
    This method will fail unless the items of the form are initialized W formField objects
    */
    setData:    function(data,fireEvents){
                    if(data){
                                this.setData();
                                this.each(function(itm){ 
                                    if(data[itm.name]) 
                                        itm.val(data[itm.name],fireEvents);
                                });
                            }
                    else    {    this.each(function(itm){ itm.val(null,fireEvents); }); }
                    this.formChange(false);
                },
    
    /** Disable all form fields */
    disable:    function(){ return this.each(function(itm){ itm.disable(); }); },
    
    /** Enable all form fields */
    enable:        function(){ return this.each(function(itm){ itm.enable(); }); },
    
    /**
    @param {string} fieldname The name of the field to set a value on
    @param {any} v    Value to set the field to.
    Sets a field of a given name to a given value.
    This method will fail unless the items of the form are initialized W formField objects
    */
    setField:   function(fieldname, v){
                    this.each(function(itm){ if(itm.name == fieldname) itm.val(v); });
                },
    
    /**
    @param {string} err An error message.
    Adds a thrown error to the form's errrs array so that all errors on a form can be reported at once.
    */
    throwError:   function(err){this.errors.push(err); return false;},
    
    /**
    Runs the validate() function for each of a form's fields.
    */
    validate:   function(){
                    var me = this;
                    me.errors = [];
                    me.each(function(itm){ 
                        if(itm.el && itm.el.toggleClass) { itm.el.toggleClass(me.errCls,!itm.validate()); }
                    });
                    this.formChange(false);
                    return (me.errors.length === 0);
                }
});


/** 
    Allows a note to be placed on a form. A HTML string will be converted into DOM elements
    placed within a paragraph tag. The note can be included in the items on a form, but the form
    will not attempt to validate like the other items.
*/
Wui.Note = function(args){ 
    $.extend(this,{
        /** The HTML to be placed in the note */
        html:'',
        /** The text-align property of the note */
        align: null
    },args); this.init();
};
Wui.Note.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. */
    init:       function(){ this.el = $('<p>').html(this.html).addClass('wui-note ' + (this.align) ? this.align : ''); }
});


/** 
    The label object will wrap around a Wui.FormField when the 'label' config is specified
    on the field. The labelPosition is usually supplied by the field the label will wrap, but
    it has its own property, and can be instantiated by itself.
*/
Wui.Label = function(args){ 
    $.extend(this,{
        /**
            String that will converted into DOM elements and placed in the label.
            This is usually the value of the label config on a Wui.FormField.
        */
        html:            '',
        
        /** Default position of the label relative to the field (top,right,bottom,left). */
        labelPosition:    'top'
    },args);
    
    this.init(); 
};
Wui.Label.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. */
    init:               function(){
                            var me = this;
                            me.el = $('<div>').addClass('wui-lbl').append( 
                                me.label = $('<label>').addClass(me.cls).attr(me.attr ? me.attr : {})
                            );
                            me.setLabel(me.html);
                            me.setLabelPosition(me.labelPosition);
                        },
    
    /**
    @param {string} newLabel String that will converted into DOM elements and placed in the label.
    @return Returns the HTML content of the label
    Changes the contents of the label.
    */
    setLabel:           function(newLabel){
                            this.label.html(this.html = newLabel);
                            return this.label.html();
                        },

    /**
    @param {string} position The value for the new label position (top, left, bottom, right)
    @return Returns the position that was set, of false if what was passed in wasn't valid.
    Changes the position of the label.
    */
    setLabelPosition:   function(position){
                            var me = this;

                            position = position.toLowerCase();
                            if($.inArray(position,['top', 'left', 'bottom', 'right']) >= 0){
                                me.el.removeClass('lbl-' + me.labelPosition).addClass('lbl-' + position);
                                if(me.field)    me.field.labelPosition = position;
                                return (me.labelPosition = position);
                            }
                            return false;
                        }
});


/**
    @event valchange When a value changes on a form field (WUI FormField, value)
    @event hiddenchange Same as valchange but for fields without an 'el' property (like hidden fields. Called on the window (WUI FormField, value)
    
    The base object that WUI form elements extend from
*/
Wui.FormField = function(args){
    $.extend(this,{
        /** Whether or not the field will be disabled. A disabled field is still accessible to the form, just not to the user. */
        disabled:        false,
        
        /** Message to display to the user when validation fails. If not specified the form will attempt to use the field's label. */
        invalidMsg:     null,
        
        /** An optional config that labels the field. */
        label:          null,
        
        /** Defines the position of the label relative to the field, options are 'top', 'left', 'right' and 'bottom' */
        labelPosition:    'top',
        
        /** A special class to put on the label if desired */
        labelCls:        null,
        
        /** Whether or not the field is required. May be pre-empted by other validation. See validate() method. */
        required:       false,
        
        /** A regular expression whereby to validate a field's input. May be pre-empted by other validation. See validate() method. */
        validRegEx:        null,
        
        /** A function to validate field input. This function is passed the value of the field, for example: validTest: function(val){ return val == 3; } */
        validTest:      null
    },args);
};
Wui.FormField.prototype = $.extend(new Wui.O(),{
    /**
        @return The el of the object
        Runs immediately when the object is constructed. Wraps the field in a label if a label has been defined.
    */
    init:          function(){
                    var me = this;
                    me.value = me.hasOwnProperty('value') ? me.value : null;
                    me.el = $('<div>').addClass('wui-fe');
                    
                    if(me.label && me.label.length > 0){
                        me.lbl = new Wui.Label({html:me.label, cls:me.labelCls, field:me, labelPosition:me.labelPosition});
                        me.elAlias = me.el;
                        me.el = me.lbl.el.append(me.elAlias);
                    }
                    return me.el;
                },
                
    /** Will disable the object if its disabled property is set to true and set a value on the field if one has been defined. */
    onRender:    function(){
                    if(this.disabled)                   this.disable();
                    if(this.hasOwnProperty('value'))    this.val(this.value,false);
                },
    /** Disables the field so the user cannot interact with it. */
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('wui-disabled').find('input,textarea,iframe').attr('disabled','disabled');
                },
    /** Enables the field so the user can interact with it. */
    enable:        function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('wui-disabled').find('.wui-disabled,*[disabled=disabled]').removeAttr('disabled');
                },
    
    /**
    @return True or False
    Validate will construct an error message based on the following precedence:
    1. Custom message (invalidMsg)
    2. The label on the field
    3. The name of the field
    4. Report that "A required field has an improper value."
    
    Then, validates a field using the following order of validation precedence:
    1. Custom testing function (validTest)
    2. Regular Expression (validRegEx)
    3. Required flag (required)
    4. No validation - returns true.
    
    Then sends the error message, if any, to the parent form's throwError() method where the invalidation messages are concatenated and the fields
    are hilighted for the user to see what fields need their attention.
    */
    validate:   function(){
                    var me = this,
                        errMsg = (me.invalidMsg !== null) ? me.invalidMsg : 
                                    (me.label !== null ) ? 'A value for \'' +me.label+ '\' is required.' :
                                        (me.name !== undefined) ? 'A value for \'' +me.name+ '\' is required.' :
                                            "A required field has an improper value.";
                    
                    // If a custom test is defined 
                    if(me.validTest && typeof me.validTest == 'function')
                        if(me.validTest(me.val()) === false)
                            return parentThrow();
                                            
                    // If a regular expression is defined for a test, this will be tested first
                    if(me.validRegEx !== null)
                        if(!me.validRegEx.test($.trim(me.val())))
                            return parentThrow();
                                        
                    // If no regular expression test exists, test whether a value is required and throw an error if blank
                    if(me.required && $.trim(me.val()).length === 0) return parentThrow();
                    
                    function parentThrow(){
                        return (me.parent && me.parent.throwError) ? me.parent.throwError(errMsg) : false;
                    }
                    
                    // Default return value is true
                    return true;
                },
    /**
    @param {[any]}    newVal    The type of this parameter depends on the type of form field
    @return Either the value of the field if no arguments are passed, or the value of the arguments passed in
    
    Works similarly to jQuery's val() method. If arguments are omitted the value of the FormField 
    will be returned. If arguments are specified the field's setVal() method and setChanged() method
    are called, and the values passed in are passed through        
    */
    val:        function(){
                    if(!arguments.length){
                        return this.getVal();
                    }else{
                        var oldVal = this.value;

                        // Set the actual value of the item
                        this.setVal.apply(this,arguments);
                        
                        // Call change listeners
                        if(arguments[1] !== false)
                            this.setChanged(oldVal);
                        
                        // Return the passed value(s)
                        return arguments;
                    }
                },
    /** 
    @private
    Marks the parent form as changed if the field belongs to a form, calls the valChange event hooks and listeners
    if the field doesn't have an 'el' property, it will call 'hiddenchange'
    */
    setChanged:    function(oldVal){
                    // Marks the parent form as 'changed'
                    if(this.parent && this.parent instanceof Wui.Form)
                        this.parent.formChange(true, this);
                    
                    // Calls functionally defined valChange() - one will override another
                    this.valChange(this);
                    
                    // Calls listeners for valchange - in the case of hidden fields calls 'hiddenchange'
                    if(this.el){
                        this.el.trigger($.Event('valchange'), [this, this.value, oldVal]); 
                    }else{
                        if(this.parent && this.parent instanceof Wui.Form)
                            this.parent.el.trigger($.Event('hiddenchange'), [this, this.value, oldVal]);
                    }
                },
    
    /** 
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    getVal:        function(){
                    return this.value;
                },
    
    /** 
    @param {string}    sv    Value to set the value of the field to
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    setVal:        function(sv){
                    this.value = sv;
                },
    
    /** 
    @param {string}    newVal    New value being set on the field
    An event hook for when the value changes. Useful for extending objects, but generally use the 'valchange' event listener
    */
    valChange:    function(newVal){}
});


/** A Wui.FormField that has no DOM element. Even more hidden than an HTML hidden input, the hidden field exists only in memory. */
Wui.Hidden = function(args){
    $.extend(this,{
        /** By default a hidden field produces no DOM element */
        el:null
    },args); 
    this.init();
};
Wui.Hidden.prototype = $.extend(new Wui.FormField(),{ init: function(){} });


/** WUI Text */
Wui.Text = function(args){
    $.extend(this,{
        /** The CSS class that denotes an empty field */
        blankCls:   'empty',
        /** A value that appears in the field until text is entered (HTML 5), or focus is gained (JavaScript implemented) */
        blankText:  ''
    },args,{
        /** The HTML element */
        field:$('<input>').attr({type:'text'})
    }); 
    this.init();
};
Wui.Text.prototype = $.extend(new Wui.FormField(),{
    /** Runs immediately when the object is created */
    init:            function(){
                        var me = this;
                        Wui.FormField.prototype.init.call(me);
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Text.prototype.setListeners.call(me,me));
                    },
                    
    /** Sets the blank text on the field. If the HTML 5 placeholder isn't supported, mimic it by replacing the native jQuery val function */
    setBlankText:    function(bt){
                        var me = this, f = me.field;
                        
                        me.blankText = bt;
                        
                        // if the HTML 5 placeholder isn't supported, mimic it by
                        // replacing the native jQuery val function
                        if('placeholder' in document.createElement('input')){
                            me.field.attr('placeholder', bt);
                        }else{
                            var valFn = $.fn.val;
                            
                            f.overrideNodeMethod('val',function(){
                                var v = valFn.apply(f,arguments);
                                if(!arguments.length)    if(v == me.blankText) return '';
                                else                    return v;
                            });
                            
                            f.focusin(function () {
                                if(valFn.call(f) == me.blankText) f.val('');
                                f.removeClass(me.blankCls);
                            }).blur(function () {
                                var v = f.val();
                                if(v === me.blankText || !v.length)
                                    f.addClass(me.blankCls).val(me.blankText);
                            });
                            
                            // set the blank text on the field
                            console.log(f.val().length);
                            if(!f.val().length)
                                f.addClass(this.blankCls).val(bt);    
                        }
                        
                        return bt;
                    },
                    
    /** 
    @param  {W Object}    The object to have listeners applied to the field
    Puts listeners on the field, mostly to handle blankText in the event that HTML 5 placeholder isn't supported 
    Also calls the setListeners() of any extending object automagically.
    */
    setListeners:    function(t){
                        var me = this,
                            fieldState = null;
                        
                        t.field
                        .focusin(function(){ fieldState = me.field.val(); }) // Set fieldState (closure variable) to allow for comparison on blur
                        .blur(function(){ if(fieldState != me.field.val()) me.setChanged(); }); // Call val function so that valchange will be fired if needed
                        
                        if(this.setListeners !== Wui.Text.prototype.setListeners) this.setListeners(this);
                        return t.field;
                    },
    /** 
    @param {string}    sv    Value to set the field text to
    Changes the value of the text in the field without changing the value of the object
    */
    fieldText:        function(sv){
                        this.field.val(sv);
                        if(this.blankText && this.blankText.length)    this.setBlankText(this.blankText);
                    },
    getVal:            function(){ return (this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null); },
    setVal:            function(sv){ 
                        this.fieldText(this.value = (sv && $.trim(sv).length) ? sv : null);
                    }
});


/** WUI Text Area */
Wui.Textarea = function(args){
    $.extend(this, args, { 
        /** The HTML element */
        field:    $('<textarea>'),
        
        /** Determines the height of the field */
        height:    100
    });
    this.init();
};
Wui.Textarea.prototype = $.extend(new Wui.Text(), {
    init:    function(){    Wui.Text.prototype.init.call(this); this.field.css({height:this.field.parent().parent().height});  }
});


/** Creates a WYSIWYG editor from a textfield.  
@author Stephen Nielsen
*/
Wui.Wysiwyg = function(args){
    $.extend(this,{
        css:        'body { color:#333; font:90%  Arial, Verdana, Helvetica, sans-serif; overflow:auto; margin:0; padding:0;}' +
                    'a {color:#09c; text-decoration:none;} a:hover {color:#0c9; text-decoration:underline;}',
        /** Whether or not to show the button that will give the user a view of the HTML generated by the WYSIWYG */
        showHTML:   false
    },args,{

    });
    this.init();
};
Wui.Wysiwyg.prototype = $.extend(new Wui.FormField(),{
    init:       function(){
                    var me = this;
                    Wui.FormField.prototype.init.call(me);

                    me.el.addClass('wui-wysiwyg');
                    me.append(
                        me.iframe = $('<iframe>').addClass('wui-editor'),
                        me.tools = $('<div>').addClass('wui-editor-tools')
                    );

                    (me.elAlias || me.el).resizable();

                    me.tools.append(
                        me.bold = $('<a>').addClass('bold').attr({tabIndex:-1, title:'Bold'}),
                        me.italic = $('<a>').addClass('italic').attr({tabIndex:-1, title:'Italic'}),
                        me.underline = $('<a>').addClass('underline').attr({tabIndex:-1, title:'Underline'}),
                        me.strike = $('<a>').addClass('strikethrough').attr({tabIndex:-1, title:'Strike-through'}),
                        me.link = $('<a>').addClass('link').attr({tabIndex:-1, title:'Link'}),
                        me.unlink = $('<a>').addClass('unlink').attr({tabIndex:-1, title:'Un-Link'}),
                        me.ul = $('<a>').addClass('unorderedlist').attr({tabIndex:-1, title:'Unorderd List'}),
                        me.ol = $('<a>').addClass('orderedlist').attr({tabIndex:-1, title:'Ordered List'}),
                        me.left = $('<a>').addClass('justifyleft').attr({tabIndex:-1, title:'Left Align'}),
                        me.center = $('<a>').addClass('justifycenter').attr({tabIndex:-1, title:'Center Align'}),
                        me.right = $('<a>').addClass('justifyright').attr({tabIndex:-1, title:'Right Align'})
                    );

                    if(me.showHTML)
                        me.tools.append( $('<a>').addClass('html').attr({tabIndex:-1, title:'Toggle HTML View'}) );
                },
    disable:    function(){
                    Wui.FormField.prototype.disable.call(this);
                    Wui.Pane.prototype.addMask.call(this,(this.elAlias || this.el));
                },
    enable:     function(){
                    Wui.FormField.prototype.enable.call(this);
                    Wui.Pane.prototype.removeMask.call(this);
                },
    onRender:   function(){
                    var me = this, 
                        edit = me.editor = me.iframe[0].contentWindow.document;
                    
                    // Make the iframe editable and set up its style
                    edit.designMode = 'on';
                    edit.open();
                    edit.close();
                    if(me.css.length) $('head',edit).append($('<style>').attr({type:'text/css'}).text(me.css));

                    // Perform standard for field stuff
                    Wui.FormField.prototype.onRender.call(me);

                    // Add menu buttons
                    me.bold.click(function(){ me.exec("bold"); });
                    me.italic.click(function(){ me.exec("italic"); });
                    me.underline.click(function(){ me.exec("underline"); });
                    me.strike.click(function(){ me.exec("strikethrough"); });
                    me.link.click(function(){
                        if (me.getRange().htmlText) me.exec("createLink", true);
                        else                        me.exec("createLink", false, prompt("Link URL:", "http://"));
                    });
                    me.unlink.click(function(){ me.exec("unlink", false, []); });
                    me.ol.click(function(){ me.exec("insertunorderedlist"); });
                    me.ul.click(function(){ me.exec("insertorderedlist"); });
                    me.left.click(function(){ me.exec("justifyLeft"); });
                    me.center.click(function(){ me.exec("justifyCenter"); });
                    me.right.click(function(){ me.exec("justifyRight"); });
                },
    exec:       function (a, b, c) {
                    this.iframe[0].contentWindow.focus();
                    this.editor.execCommand(a, b || false, c || null);
                },
    getRange:   function () {
                    var s = this.getSelection();
                    if (!s) { return null; }
                    return (s.getRangeAt) ? s.getRangeAt(0) : s.createRange();
                },
    getVal:     function () {
                    // Strips out MS Word HTML Nonsense
                    var retVal = $.trim(this.editor.body.innerHTML
                            .replace(/MsoNormal/gi, "")
                            .replace(/<\/?link[^>]*>/gi, "")
                            .replace(/<\/?meta[^>]*>/gi, "")
                            .replace(/<\/?xml[^>]*>/gi,"")
                            .replace(/<\?xml[^>]*\/>/gi, "")
                            .replace(/<!--(.*)-->/gi, "")
                            .replace(/<!--(.*)>/gi, "")
                            .replace(/<!(.*)-->/gi, "")
                            .replace(/<w:[^>]*>(.*)<\/w:[^>]*>/gi, "")
                            .replace(/<w:[^>]*\/>/gi, "")
                            .replace(/<\/?w:[^>]*>/gi, "")
                            .replace(/<m:[^>]*\/>/gi, "")
                            .replace(/<m:[^>]>(.*)<\/m:[^>]*>/gi, "")
                            .replace(/<o:[^>]*>([.|\s]*)<\/o:[^>]*>/gi, "")
                            .replace(/<o:[^>]*>/gi, "")
                            .replace(/<o:[^>]*\/>/gi, "")
                            .replace(/<\/o:[^>]*>/gi, "")
                            .replace(/<\/?m:[^>]*>/gi, "")
                            .replace(/style=\"([^>]*)\"/gi, "")
                            .replace(/style=\'([^>]*)\'/gi, "")
                            .replace(/class=\"(.*)\"/gi, "")
                            .replace(/class=\'(.*)\'/gi,"")
                            .replace(/<p[^>]*>/gi, "<p>")
                            .replace(/<\/p[^>]*>/gi, "</p>")
                            .replace(/<span[^>]*>/gi, "")
                            .replace(/<\/span[^>]*>/gi, "")
                            .replace(/<st1:[^>]*>/gi, "")
                            .replace(/<\/st1:[^>]*>/gi, "")
                            .replace(/<font[^>]*>/gi, "")
                            .replace(/<\/font[^>]*>/gi, "")
                            .replace(/[\r\n]/g, " ")
                            .replace(/<wordPasteong><\/wordPasteong>/gi, "")
                            .replace(/<p><\/p>/gi, "").replace(/\/\*(.*)\*\//gi, "")
                            .replace(/<!--/gi, "")
                            .replace(/-->/gi, "")
                            .replace(/<style[^>]*>[^<]*<\/style[^>]*>/gi, "")
                            .replace(/<hr>/gi, ""));
                    return this.value = (retVal.length === 0) ? null : retVal;
                },
    setVal:     function(sv){
                    var me = this;
                    me.value = sv;
                    $(me.editor.body).html(sv);
                }
});


/** Creates a radio group that will appear as normal, or as a button group where only one button at a time
can    be depressed. MUST be named uniquely. */
Wui.Radio = function(args){ 
    $.extend(this,{
        /** A true value converts the normal radio group to a button group */
        buttonStyle:false,
        
        /** A default name that should be overridden */
        name:       'wui-radio',
        
        /** An array of options to populate the radion/button group */
        options:    [],
        
        /** Default template for the radio group */
        template:        '<li><input type="radio" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args,{
        el:$('<div>')
    });
    this.init();
};
Wui.Radio.prototype = $.extend(new Wui.FormField(),{
    /** Runs immediately when the object is created. Adds listeners and styles */
    init:       function(){
                    Wui.FormField.prototype.init.call(this);
                    this.el.addClass('wui-radio');
                    
                    var me = this,
                        tplEngine = new Wui.Template({ template:this.template }),
                        ul = $('<ul>');
                    
                    $.each(me.options,function(i,itm){
                        itm.name = me.name;
                        itm.id = Wui.id();
                        ul.append(
                            tplEngine.make(tplEngine.data = itm)
                            .children('label')
                                .attr({unselectable:'on'})
                                .keyup(function(evnt){
                                    if(evnt.keyCode == 13 || evnt.keyCode == 32)
                                        $(this).click();
                                })
                            .end()
                            .children('input')
                            .change(function(){ me.elemChange($(this)); })
                            .focus(function(){ul.addClass('has-focus');})
                            .blur(function(){ul.removeClass('has-focus');})
                            .end()
                        );
                    });
                    
                    // make radio group look like buttons
                    if(me.buttonStyle){
                        ul.addClass('button');
                        ul.find('label').attr({tabindex:0});
                    }
                    
                    // Append to DOM
                    me.el.append(ul);
                },
    
    /** What to do when an individual element changes */
    elemChange:    function(elem){ this.val(elem.val()); },
    
    /** If buttonStyle = true, the actual radio input is hidden  */
    onRender:    function(){
                    var me = this;
                    me.el.find('input').each(function(){
                        $(this).css({ margin:'0 5px 0' + ((me.buttonStyle ? -1 : 0) * (5 + $(this).outerWidth())) + 'px' });
                    });
                    Wui.FormField.prototype.onRender.call(me);
                },
    getVal:        function(){ return this.value; },
    setVal:        function(sv){
                    this.value = sv;
                    this.el.find("input[value='" + sv + "']").attr('checked',true);
                }
});


/** 
Creates a check-box group if options are specified, or as a button group where any/all of the buttons can be
depressed at once.     If options aren't specified, a single boolean check-box will be created. */
Wui.Checkbox = function(args){ 
    $.extend(this,{
        /** A default name that should be overridden */
        name:       'wui-checkbox',
        
        /** Default template for the checkbox group */
        template:    '<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args);
this.init(); };
Wui.Checkbox.prototype = $.extend(new Wui.Radio(),{
    /** Collects the values of all the checked boxes in the group */
    calcVal:    function(){
                    var me = this, a = [];
                    
                    me.el.find('input:checked').each(function(){
                        a.push($(this).val());
                    });
                    
                    return ((a.length > 0) ? (a.length > 1) ? a : a[0] : null);
                },

    /** Returns whether or not the box is checked */
    elemChange:    function(elem){ this.val(this.calcVal()); },                    

    /** Runs immediately when the object is created. Adds listeners and styles */
    init:       function(){
                    if(this.options.length === 0) this.options.push({val:1,title:''});
                    
                    Wui.Radio.prototype.init.call(this);
                    this.el.removeClass('wui-radio').addClass('wui-checkbox');
                    
                    //steal label if button style
                    if(this.options.length == 1){
                        this.el.find('li label').text(this.el.children('label').text());
                        this.el.children('label').text('');
                    }
                },
    getVal:        function(){ return this.calcVal(); },
    setVal:        function(sv){
                    var me = this;
                    
                    if($.isArray(sv))               { me.value = sv; }
                    else if(sv === null)            { me.value = null; }    
                    else                            { me.value = [sv]; }
                    
                    if(me.options.length == 1 && (typeof sv == 'number' || typeof sv == 'string')){
                        me.el.find('input').prop('checked',!!parseInt(sv)).siblings('li').toggleClass('checked',!!parseInt(sv));
                    }else{
                        // clear out all checkboxes
                        me.el.find('input').attr('checked',false);
                        me.el.find('label').removeClass('checked');
                        
                        // set the ones passed in
                        if(me.value && me.value.length)
                            for(var i = 0; i < me.value.length; i++)
                                me.el.find('input[value=' +me.value[i]+ ']').prop('checked',true).siblings('li').addClass('checked');
                    }
                },
    /** The check-box will validate false if the value is 0 and the box is required.  */
    validTest:    function(){ if(this.required && this.val() === 0) return false;    return true; }
});



// Make jQuery contains case insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
/** The WUI Combobox can be set up in a number of different configurations that are really just variations of local and remote operations. See the configs. */
Wui.Combo = function(args){ 
    $.extend(this, {
        /** Whether to load remote elements the moment the combobox is created, or wait to load remote elements
        until a search value is entered. */
        autoLoad:   false,
        
        /** CSS class to place on the drop-down element. */
        ddCls:        '',
        
        /** Name of a shared data store. Whenever the shared store updates, this updates too. If defined, Pre-empts locally defined data and remote calls on init. */
        dataName:    null,
        
        /** Text to display in the drop-down when no results are returned.  */
        emptyText:  '(empty)',
        
        /** The DOM element for the field */
        field:        $('<input>').attr({type:'text'}),

        /** Whether to filter results at all */
        filterField:  true,
        
        /** Whether the drop-down DOM element will be kept in place or appended out to the body and absolutely
        positioned. Keeping the drop-down in line will make it susceptible to being clipped by containing elements.*/
        keepInline:    false,
        
        /** Minimum number of characters entered before the combo will filter remotely. */
        minKeys:    2,
        
        /** Event hook for when the combo loses focus */
        onBlur:     function(){},
        
        /** Whether to filter the drop-down amidst the locally loaded results or to go to the server. */
        searchLocal:true,
        
        /**
        @required
        The key in the data that will be used for display in the combo box.
        */
        titleItem:  null,
        
        /**
        @required
        The key in the data that will be used as the value for the combo when an item is selected.
        */
        valueItem:  null
    },args,{
        cls:(args.cls) ? args.cls + ' wui-combo' : 'wui-combo',
    }); 
    
    // Create template when one hasn't been defined
    if(    this.hasOwnProperty('valueItem') && this.hasOwnProperty('titleItem') && !this.hasOwnProperty('template') && this.valueItem.length &&
         this.valueItem.length > 0 && this.titleItem.length && this.titleItem.length > 0) this.template = '<li>{' +this.titleItem+ '}</li>';

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.Text(), new Wui.Data(), {
    /** Fires when the enter key is pressed */
    enterKey:       function(){
                        if(this.selectItm !== null)   this.selectItm.click();
                    },
                    
    /** Fires when the down arrow is pressed */
    keyDown:        function(){
                        if(!this.dd.is(':visible')){
                            this.selectCurr();
                            this.showDD();
                            this.field.select();
                        }else{
                            var si = (this.selectItm === null) ? 0 : this.dd.children('.selected ~ :visible:first').index(),
                                idx = (si > 0) ? si : 0;
                            this.rsltHover(this.dd.children(':eq(' + idx + ')'));
                        }
                    },
                    
    /** Fires when the down up is pressed */
    keyUp:          function(){
                        if(this.selectItm !== null){
                            var idx = this.selectItm.prevAll(':visible:first').index();
                            
                            if(idx < 0){
                                this.field.focus().select();
                                this.dd.children().removeClass('selected');
                                this.selectItm = null;
                            }else{
                                this.rsltHover(this.dd.children(':eq(' + idx + ')'));
                            } 
                        }
                    },
                    
    /** Hides the drop-down menu */
    hideDD:         function(){this.dd.hide();},
    
    /** Method that runs when the object is initiated */
    init:           function(){
                        var me = this,
                            ddAddCls = (me.keepInline) ? 'wui-inline-dd' : '';
                        
                        //setup combobox variables
                        me.tplEngine = new Wui.Template({template:me.template});
                        me.selectItm = null;
                        
                        //put field inside a wrapper and add drop-down switch
                        Wui.Text.prototype.init.call(me);
                        
                        me.wrapper = $('<div>').addClass('dd-wrapper');
                        me.ddSwitch = new Wui.Button({
                            click:        function(){
                                            if(!me.dd.is(':visible')){
                                                me.field.focus();
                                                me.selectCurr();
                                                me.showDD();
                                            }else{
                                                me.hideDD();
                                            }
                                        },
                            text:        '',
                            tabIndex:    -1,
                            appendTo:    me.wrapper,
                            cls:         'field-btn dd-switch'
                        });
                            
                        me.append(me.wrapper.append(
                            me.dd = $('<ul>').addClass('wui-combo-dd ' + ddAddCls + ' ' + me.ddCls),
                            me.field.addClass('has-dd')
                        ));
                        me.ddSwitch.place();
                        
                        if(me.dataName && me.dataName.length > 0){
                            $(window).on('datachanged',function(event,name,dataObj){
                                if(name == me.dataName){
                                    me.setData(dataObj.data);
                                    me.renderData();
                                }
                            });
                        }else{
                            if(me.autoLoad)   me.loadData();
                            else              me.renderData();
                        }
                    },
    
    /** Populates the drop-down with data/search results or shows empty text  */
    renderData:     function(){
                        var me = this,
                            holder = $('<ul>');
                        me.dd.html('');
                        if(me.total){ 
                            me.dataEach(function(d,i){
                                me.tplEngine.data = d;
                                holder.append(
                                    me.tplEngine.make().mouseenter(function(evnt){ me.rsltHover(evnt); })
                                                       .mousedown(function(e){me.field.isBlurring = false;})
                                                       .click(function(){ me.rsltClick(); })
                                );
                            });
                            me.dd.append(holder.children().unwrap());
                        }else{ 
                            me.dd.html(this.emptyText);
                        }
                        
                        return true;
                    },
    
    /** Hides the drop-down and sets the current selection as the combo's value */
    rsltClick:      function(){
                        this.hideDD();
                        this.val(this.data[this.selectItm.index()]);
                    },
                    
    /** Makes an item in the drop-down appear to be selected. This can happen when the 
    mouse hovers over an item or when its selected with the arrow keys. */
    rsltHover:      function(itmTarget){
                        if(!itmTarget.addClass)
                            itmTarget = $(itmTarget.currentTarget);
                        this.dd.children().removeClass('selected');
                        this.selectItm = itmTarget.addClass('selected');
                    },
    
    /** Overrides the event hook in Wui.Data to set the parameters of the data object with the search value */
    setParams:        function(){
                        if(this.searchFilter)
                            $.extend(this.params,{srch: this.searchFilter});
                    },

    /** 
    @param {string} srchVal    A search term
    Searches locally within the drop-down's data for the srchVal, otherwise if searchLocal is false,
    the data is searched remotely. */
    searchData:     function(srchVal){
                        if(this.filterField){
                            this.searchFilter = srchVal;
                            
                            if(this.searchLocal){
                                this.showDD();
                                this.dd.children()[(srchVal && srchVal.length > 0) ? 'hide' : 'show']();
                                this.dd.children(':contains(' +srchVal+ ')').show();
                                this.rsltHover(this.dd.children(':contains("' +srchVal+ '"):first'));
                            }else{
                                if(srchVal.length >= this.minKeys || srchVal.length === 0)
                                    this.loadData();
                            }    
                        }
                    },
    
    /** 
    @param {number}    [i]    An index
    
    If i is defined, it is the index of the item to select in the drop-down, else it is determined in this
    method by the current value of the combo.
    */
    selectCurr:     function(i){
                        if(i === undefined && this.value !== null){
                            for(var d in this.data){
                                if(this.data[d][this.valueItem] === (this.value[this.valueItem] || this.value))   { i = d; break; }
                            }
                        }
                        this.rsltHover(this.dd.children(':eq(' +i+ ')'));
                    },
                    
    /** Overrides the event hook in Wui.Data to trigger rendering of new data */
    afterSet:       function(){ this.renderData(); },
    
    /** 
    @param {W Object} t W Object to add listeners to
    Sets additional listeners on the field that give it combo-box like interactions */
    setListeners:    function(t){
                        t.field
                        .focus(function(e){
                            t.field.isBlurring = undefined;
                        })
                        .blur(function(e){
                            if(t.field.isBlurring !== false){
                                t.hideDD();
                                
                                // If the combo has a non-value item in the search field
                                // select the seleted item or clear the value
                                var titlePresent = false;
                                for(var d in t.data){
                                    if(t.field.val() == t.data[d][t.titleItem]){
                                        titlePresent = true;
                                        break;
                                    }
                                }
                                if(!titlePresent)    t.val(null);
                                
                                // Event hook function
                                t.onBlur();
                            }
                         })
                        .click(function(){
                            t.showDD();
                            t.field.select();
                        })
                        .keyup(function(evnt){
                            var currVal = t.field.val();
                            switch(evnt.keyCode){
                                case 40:    /*Do Nothing*/  break;
                                case 38:    /*Do Nothing*/  break;
                                case 13:    /*Do Nothing*/  break;
                                case 9:     /*Do Nothing*/  break;
                                default:    t.searchData(currVal);
                            }
                        })
                        .keydown(function(evnt){
                            var currVal = t.field.val();
                            
                            //clear the value if the user blanks out the field
                            if(currVal.length === 0) t.value = null;
                            
                            if(t.data.length > 0){
                                switch(evnt.keyCode){
                                    case 40:    t.keyDown();   break;
                                    case 38:    t.keyUp();     break;
                                    case 13:
                                    case 9:     t.enterKey();  break;
                                }
                                
                                //scroll the list to the currently selected item
                                if(t.selectItm !== null){
                                    var beforeHeight = 0;
                                    t.selectItm.siblings(':lt(' +t.selectItm.index()+ '):visible').each(function(){ beforeHeight+= $(this).outerHeight(); });
                                    t.selectItm.parent().animate({scrollTop:beforeHeight}, 100);
                                }
                            }
                        });
                        return t.field;
                    },
    
    /** Shows the drop-down menu by either simply making it appear, or by positioning it absolutely to appear to drop-down from the combo's text field
    based on the value of keepInline. */
    showDD:         function(){
                        if(!this.keepInline){
                            var fld     = this.field,
                                ofst    = fld.offset(),
                                ddWid   = parseInt(this.dd.css('width')),
                                width   = (ddWid && ddWid > fld.outerWidth()) ? ddWid : fld.outerWidth() - 1;
                            
                            this.dd.appendTo('body').css({
                                left:       ofst.left + ((ofst.left + width < $.viewportW()) ? 0 : fld.outerWidth() - width),
                                top:        ofst.top + fld.outerHeight(),
                                width:      width,
                                display:    'block',
                                zIndex:     Wui.maxZ()
                            });
                        }else{
                            this.dd.css({ zIndex:Wui.maxZ() }).show();
                        }
                    },
    getVal:            function(){
                        var me = this;
                        return (me.value && me.value[me.valueItem]) ? me.value[me.valueItem] : me.value;
                    },
    setVal:            function(sv){
                        var me = this, selectVal = null;
                        
                        if(sv === null){
                            me.value = null;
                            me.renderData();
                            me.fieldText('');
                        }else if(typeof sv == 'object'){
                            me.value = sv;
                            
                            //add the piece of data to the dd data if it does not exist there
                            var addData = true;
                            for(var d in me.data) if(me.data[d] == sv) addData = false;
                            if(addData){
                                me.data.push(me.value);
                                me.renderData();
                            }
                            selectVal = me.value[me.valueItem];
                        }else{
                            me.value = sv;
                            selectVal = me.value;
                        }
                        
                        //select the item out of the data set
                        me.dataEach(function(d,i){
                            if(d[me.valueItem] === selectVal){
                                me.selectCurr(i);
                                me.fieldText(d[me.titleItem]);
                                return false;
                            }
                        });
                    }
});


/**
The link object contains three fields, one for the actual URL, one for the text of the link (if different from the URL) and a combo for
whether the link opens in a new window/tab or the same window.
*/
Wui.Link = function(args){ 
    $.extend(this,{
        invalidMsg: 'The value for \'' + ((this.label) ? this.label : (this.args && this.args.name) ? this.args.name : 'a link field') + '\' is not a properly formatted link.'
    },args);
    this.init();
};
Wui.Link.prototype = $.extend(new Wui.FormField(),{
    /** Builds a preview of the link while it is being entered - gives feedback/validation to the user  @private */
    buildOutput:function(){
                     if(this.outputFld === undefined)    this.elAlias.append(this.outputFld = $('<div>').attr({tabindex:-1}).addClass('feedback'));
        
                    if(this.testLink()){
                        var tp = new Wui.Template({data:this.value, template:'<span>Preview:</span> <a href="{uri}" target="{target}" class="{((target == "_blank") ? "uri-new-win" : "")}">{title}</a>'});
                        this.outputFld.html(tp.make());
                    }else{
                        this.outputFld.html('Your link is improperly formatted.');
                    }
                        
                },
    
    /** Method that runs when the object is initiated */
    init:       function(){
                    var me = this;
                    
                    me.items = [
                        me.urlField = new Wui.Text({cls:'wui-link-third wui-link-focus', blankText:'URL', linkData:'uri'}),
                        me.titleField = new Wui.Text({cls:'wui-link-third', blankText:'Display Text', linkData:'title'}),
                        me.targetField = new Wui.Combo({
                            cls:'wui-link-third no-margin', valueItem: 'target', titleItem:'name', blankText:'Target', keepInline:true,
                            data:[{target:'_self', name:'Opens In Same Window'}, {target:'_blank', name:'Opens In New Window/Tab'}], linkData:'target'
                        })
                    ];
                    
                    Wui.FormField.prototype.init.call(me);
                    me.value = { target:'_self', title:null, uri:null };
                    
                    me.el.append(me.elAlias = $('<div>').addClass('wui-hyperlink'));
                    
                    //additional listeners and initial value for target
                    me.setListeners(me.urlField,me.titleField,me.targetField);
                    me.targetField.val(me.value.target);
                   
                    me.urlField.field.keyup(function(e){
                        //sets the title the same as the url - for laziness' sake
                        if(me.titleField.field.val() == me.titleField.blankText)
                            me.value.title = null;
                        if(me.value.title === null)
                            me.titleField.val($(this).val());
                    })
                    .blur(function(){ me.value.title = me.titleField.val(); });
                },
    
    /** Sets listeners on all three of the fields in the link object */
    setListeners:function(){
                    var me = this,
                        flds = arguments;
                        
                    $.each(flds,function(idx,itm){
                        (itm.field.field || itm.field).on('blur click keyup keydown mousedown', null, itm, function(e){
                            var wuiObjVal = e.data.val();
                            if(wuiObjVal !== null && wuiObjVal != {}) me.value[e.data.linkData] = wuiObjVal;
                            me.buildOutput();
                        })
                        .on('focus',null, itm, function(e){
                            $.each(flds,function(i,field){ field.el.removeClass('wui-link-focus'); });
                            e.data.el.addClass('wui-link-focus');
                        });
                    });
                },       
        
    /** Test for whether the link is a valid URL whether a full or relative path */
    testLink:   function isUrl() {
                    var fullPath = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                        relativePath = /(\/|\/([\w#!:.?+=&%@!\-\/]))/;
                    return (fullPath.test(this.value.uri) || relativePath.test(this.value.uri));
                },
                
    getVal:        function(){
                    return this.value;
                },
    setVal:        function(sv){
                    $.extend(this.value,sv);
                    this.urlField.val(this.value.uri);
                    this.titleField.val(this.value.title);
                    this.targetField.val(this.value.target);
                    this.buildOutput();
                },
    
    /** Overrides the Wui.FormField function and provides added validation */
    validTest:    function(){ if(this.required && !this.testLink()) return false; return true; }
});


/**
 * Borrowed from Date.js and tweaked a TON - See license below, and check out the full library if you're doing tons with dates
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 
 The Datetime field can be used in conjunction with a calendar-style datepicker. When dates are changed, any time information is
 retained.
 
 Feedback is given to the user so concerns about whether the date is in a proper format can be allayed before validation occurs.
 Dates can be entered in a variety of formats of which what is below is a very small sample:
 
 "Five months after 9/20/2013"
 "Yesterday"
 "05/26/1983"
 "2012-12-12"
 "today at noon"
 "tomorrow at five thirty pm"
 "10-9-2013 5:30 PM"
 "ten months from now"
*/
Wui.Datetime = function(args){ 
    $.extend(this,args,{ field: $('<input>').attr({type:'text'}) });
    this.init();
};

$.extend(Date,{
    CultureInfo:            {
                                name: "en-US",
                                englishName: "English (United States)",
                                nativeName: "English (United States)",
                                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                                firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
                                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                amDesignator: "AM",
                                pmDesignator: "PM"
                            },
    
    isLeapYear:                function(year) {
                                return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
                            },
    getDaysInMonth:            function(year, month) {
                                return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                            },
    getTimezoneOffset:        function(s, dst) {
                                return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];
                            },
    getTimezoneAbbreviation:function(offset, dst) {
                                var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
                                    p;
                                for (p in n) {
                                    if (n[p] === offset) {
                                        return p;
                                    }
                                }
                                return null;
                            }
});
$.extend(Date.prototype,{
    getDaysInMonth:    function() {
                        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
                    },
    addMilliseconds:function(value) {
                        this.setMilliseconds(this.getMilliseconds() + value);
                        return this;
                    },
    addSeconds:        function(value) {
                        return this.addMilliseconds(value * 1000);
                    },
    addMinutes:        function(value) {
                        return this.addMilliseconds(value * 60000);
                    },
    addHours:        function(value) {
                        return this.addMilliseconds(value * 3600000);
                    },
    addDays:        Date.prototype.addDays = function(value) {
                        return this.addMilliseconds(value * 86400000);
                    },
    addWeeks:        function(value) {
                        return this.addMilliseconds(value * 604800000);
                    },
    addMonths:        function(value) {
                        var n = this.getDate();
                        this.setDate(1);
                        this.setMonth(this.getMonth() + value);
                        this.setDate(Math.min(n, this.getDaysInMonth()));
                        return this;
                    },
    addYears:        function(value) {
                        return this.addMonths(value * 12);
                    },
    add:            function(config) {
                        if (typeof config == "number") {
                            this._orient = config;
                            return this;
                        }
                        var x = config;
                        if (x.millisecond || x.milliseconds) {
                            this.addMilliseconds(x.millisecond || x.milliseconds);
                        }
                        if (x.second || x.seconds) {
                            this.addSeconds(x.second || x.seconds);
                        }
                        if (x.minute || x.minutes) {
                            this.addMinutes(x.minute || x.minutes);
                        }
                        if (x.hour || x.hours) {
                            this.addHours(x.hour || x.hours);
                        }
                        if (x.month || x.months) {
                            this.addMonths(x.month || x.months);
                        }
                        if (x.year || x.years) {
                            this.addYears(x.year || x.years);
                        }
                        if (x.day || x.days) {
                            this.addDays(x.day || x.days);
                        }
                        return this;
                    },
    getDayName:        function(abbrev) {
                        return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
                    },
    getMonthName:    function(abbrev) {
                        return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
                    },
    _toString:        Date.prototype.toString,
    toString:        function(format) {
                        var self = this;
                        var p = function p(s) {
                                return (s.toString().length == 1) ? "0" + s : s;
                            };
                        return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function(format) {
                            switch (format) {
                            case "hh":
                                return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
                            case "h":
                                return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
                            case "HH":
                                return p(self.getHours());
                            case "H":
                                return self.getHours();
                            case "mm":
                                return p(self.getMinutes());
                            case "m":
                                return self.getMinutes();
                            case "ss":
                                return p(self.getSeconds());
                            case "s":
                                return self.getSeconds();
                            case "yyyy":
                                return self.getFullYear();
                            case "yy":
                                return self.getFullYear().toString().substring(2, 4);
                            case "dddd":
                                return self.getDayName();
                            case "ddd":
                                return self.getDayName(true);
                            case "dd":
                                return p(self.getDate());
                            case "d":
                                return self.getDate().toString();
                            case "MMMM":
                                return self.getMonthName();
                            case "MMM":
                                return self.getMonthName(true);
                            case "MM":
                                return p((self.getMonth() + 1));
                            case "M":
                                return self.getMonth() + 1;
                            case "t":
                                return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
                            case "tt":
                                return self.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
                            case "zzz":
                            case "zz":
                            case "z":
                                return "";
                            }
                        }) : this._toString();
                    }
});
/** End borrowing from date.js */

Wui.Datetime.prototype = $.extend(new Wui.Text(),{
    second:         1e3,
    minute:         6e4,
    hour:           36e5,
    day:            864e5,
    days:           ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],
    shortDays:      ["sun","mon","tue","wed","thu","fri","sat"],
    months:         ["january","february","march","april","may","june","july","august","september","october","november","december"],
    shortMonths:    ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
    
    /** Array of feedback words or phrases to randomly display when a user's input is not understood by the control */
    sarcasmArray:   ["Not quite.","Huh?","Nope","Arg..","Sorry","What?","Bleck.","Nuh-uh.","Keep Trying.","No Entiendo."],
    
    /** The date furthest in the past that this control will accept as valid */
    minDate:        null,
    
    /**
    @param {string} overrideText    Text that will absolutely be displayed instead of the formatted version of the field's value
    @return The value passed in, or the calculated value of the datetime
    Give feedback to the end user about the data they entered. 
    */
    displayDate:    function(overrideText){
                        var me = this;
                        
                        // process current date value
                        if(overrideText !== undefined){ me.displayDiv.html(overrideText); return overrideText; }
                        if(me.value === "" || me.value === null) { return null; }
                        
                        //validation for min-date
                        if(!(me.minDate !== null && me.value < me.minDate)) me.displayDiv.html(me.value.toString('ddd MM-dd-yyyy h:mm tt'));
                        else                                                me.displayDiv.html(me.value.toString('Less than minimum required date of MM-dd-yyyy'));
                        
                        return  me.value.toString('MM/dd/yyyy h:mm tt');
                    },
     
     /** 
     @param {number}    num Any whole number
     @return            The magnitude of the number
     Gets the magnitude (as a factor of ten) of the number passed into getM. */
     getM:          function(num){
                        var magnitude = 0;
                        while((num = num / 10) >= 1) magnitude++;
                        return magnitude;
                    },
                 
    /** Runs when the object is created. Sets up DOM elements, and attaches the jQuery UI datepicker */
    init:           function(){
                        var me = this;
                        Wui.Text.prototype.init.call(me);
                        me.append(
                            $('<div>').addClass('wui-date').append(
                                me.setListeners(me),
                                me.displayDiv = $("<div>").addClass('feedback').attr({tabindex:-1}),
                                me.toggleCal = $('<button>').addClass('wui-cal-toggle').attr({tabIndex:-1})
                            )
                        );
                        
                        me.toggleCal.click(function(){
                            if(!me.calendar){
                                // Add calendar to the body with listeners
                                $('body').append(
                                    me.calendar = me.makeCalendar(undefined,function(e){
                                        var dt = $(this),
                                            day = parseInt(dt.text()),
                                            info = dt.parents('[wui-month]'),
                                            month = parseInt(info.attr('wui-month')),
                                            year = parseInt(info.attr('wui-year'));

                                        me.value = (me.value != null) ? new Date(year,month,day,me.value.getHours(),me.value.getMinutes()) : new Date(year,month,day);
                                        me.val(me.displayDate());
                                        me.calendar.remove(); me.calendar = undefined;
                                    }).click(function(){return false;})
                                );

                                // Clear the calendar when the user moves away from it
                                $(document).one('click',function(){
                                    $('.wui-cal').remove(); me.calendar = undefined;
                                });

                                // Position calendar to ensure it will be seen
                                var fld     = me.field,
                                    ofst    = fld.offset(),
                                    cHeight = me.calendar.outerHeight(),
                                    cWidth  = me.calendar.outerWidth(),
                                    plBelow = (ofst.top + fld.outerHeight() + cHeight < $.viewportH()),
                                    plRight = (ofst.left + fld.outerWidth() - cWidth > 0); 

                                me.calendar.css({
                                    left:       (plRight) ? ofst.left + fld.outerWidth() - cWidth : ofst.left,
                                    top:        (plBelow) ? ofst.top + fld.outerHeight() : ofst.top - cHeight,
                                    zIndex:     Wui.maxZ()
                                });
                            // Otherwise clear the calendar
                            }else{ me.calendar.remove(); me.calendar = undefined; }

                            // Prevent the click from propagating
                            return false;
                        });
                    },
    
    /** 
    @param {string}    words   Words describing a number. (i.e.: Four hundred and fifty-seven)
    @return            A number
    Converts numbers as words to a regular number. The words MUST use correct grammar (hyphens should be used between 20 and 99)
    */
    num2Dec:        function (words){
                        var numberRepl = {  a:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,
                            thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,
                            thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100,thousand:1e3,
                            million:1e6,billion:1e9,trillion:1e12,quadrillion:1e15,quintillion:1e18
                        };
            
                        //replace the written words with numbers
                        words = words.toString().replace(/ and /g,' ').replace(/-/g,' ');
                        $.each(numberRepl,function(i,itm){
                            words = words.replace(new RegExp('(^|[ ]|-)' + itm + '(-|[ ]|$)','g'),' ' + numberRepl[itm] + ' ');
                        });
                        
                        var wArray = $.trim(words).split(/[ ]+/),
                            partsArry = [],
                            finalNum = 0,
                            pos = 0;

                        //separate by numbers larger than 100
                        while(wArray[pos]){
                            if(this.getM(wArray[pos]) > 2){
                                partsArry.push(wArray.splice(0,pos + 1));
                                pos = 0;
                            }
                            pos++;
                        }
                        partsArry.push(wArray);
                       
                        for(var i = 0; i < partsArry.length; i++){
                            var tmp = this.txt2Num(partsArry[i]);
                            if(parseInt(tmp))
                                finalNum += parseInt(tmp);
                        }
                       
                        return finalNum;
                    },
    
    /**
    @param {Date} dt  A date in which month to generate the calendar. If not specified this value will fall back to the value of the Wui.Datetime element, and if not defined it will fall back to the current date.
    Makes an HTML calendar to use as a datepicker */
    makeCalendar:   function(dt,onSelect){
                        var me = this,
                            today = new Date(),
                            calDate = dt || (me.value || today),
                            calendar = $('<div>').addClass('wui-cal');

                        calendar.append(genHTML(calDate));
                        return calendar;

                        function genHTML(genDt){
                            var day = 1, i = 0, j = 0,
                                month = genDt.getMonth(),
                                year = genDt.getFullYear(),
                                selectDy = genDt.getDate(),
                                firstDay = new Date(year, month, 1),
                                startingDay = firstDay.getDay(),
                                monthLength = genDt.getDaysInMonth(),
                                monthName = me.months[month],
                                html = '<table wui-month="' +month+ '" wui-year="' +year+ '">';
                            
                            // Generate Header
                            html += '<tr><th colspan="7"><div class="wui-cal-header">' + monthName + "&nbsp;" + year + '</div></th></tr>';
                            html += '<tr class="wui-cal-header-day">';
                            for (i = 0; i <= 6; i++)
                                html += '<td>' +me.shortDays[i].substring(0,2)+ '</td>';
                            html += '</tr><tr>';

                            // Generate Days
                            // this loop is for is weeks (rows)
                            for (i = 0; i < 9; i++) {
                                // this loop is for weekdays (cells)
                                for (j = 0; j <= 6; j++) { 
                                    html += '<td>';
                                    if (day <= monthLength && (i > 0 || j >= startingDay))
                                        html += '<a class="wui-cal-day">' +(day++)+ '</a>';
                                    html += '</td>';
                                }
                                // stop making rows if we've run out of days
                                if (day > monthLength)  break;
                                else                    html += '</tr><tr>';
                            }
                            html += '</tr></table>';

                            var tbl = $(html),
                                header = tbl.find('.wui-cal-header');

                            // Set up listeners
                            header.append('<a class="wui-cal-prev">','<a class="wui-cal-next">');
                            header.children('a').click(function(){
                                var dir = $(this).hasClass('wui-cal-prev') ? -1 : 1;
                                calendar.html('');
                                calendar.append(genHTML(new Date(year, month + dir, today.getDate())));
                            });
                            
                            if(me.value && me.value.getMonth() == month && me.value.getFullYear() == year)
                                tbl.find('a:contains(' +selectDy+ '):first').addClass('selected');
                            
                            if(today.getMonth() == month && today.getFullYear() == year)
                                tbl.find('a:contains(' +today.getDate()+ '):first').addClass('highlight');

                            tbl.find('td a').click(onSelect);
                            return tbl;
                        }
                    },

    /** 
    @param {string}    dtString   A string describing a date by any number of methods
    @return            A number
    Converts numbers as words to a regular number. The words MUST use correct grammar (hyphens should be used between 20 and 99)
    */
    processDate:    function(dtString){
                        var me = this,
                            dateString = dtString || me.field.val();
                        
                        if (dateString.length > 0) {
                            var genDate = me.translateDate(dateString);
                            
                            //Returns a message to the user that the program doesn't understand them
                            if(genDate.toString() == 'Invalid Date'){
                                me.displayDate(me.sarcasmArray[Wui.randNum(0,(me.sarcasmArray.length -1))]);
                                return;
                            }
                            
                            me.value = genDate;
                            me.displayDate();
                            return genDate;
                        }else{
                            me.value = null;
                            me.displayDate('');
                        }
                    },
    /** 
    @param {object}    t    A WUI object, namely this object
    @return    The field of the object.
    Sets additional listeners on the text field, namely to process the date when it changes */
    setListeners:   function(t){
                        return t.field.keyup(function(evnt){ t.processDate(); });
                    },
    
    /** 
    @param {date}    minDt    A date that will become the lower bound for the field
    @return    The newly set this.minDate.
    Sets the lower bound for the field, updating the jQuery datepicker as well. */
    setMinDate:     function(minDt){ 
                        var me = this;
                        me.minDate = me.translateDate(minDt.toString());
                        me.field.datepicker( "option", "minDate", new Date(me.minDate.valueOf() + me.minute));
                        return me.minDate;
                    },
    
    /** 
    @param {string}    ds    A string containing the description of a date and time
    @return    A Date based on the interpretation of the date string.
    Translates the date from the user's input to a javascript Date object */
    translateDate:  function(ds){
                        var me            = this,
                            now         = new Date(), 
                            orig        = ds,
                            dateReg     = /\d{1,2}\/\d{1,2}\/\d{2,4}/,
                            ifDateReg   = /([a|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|and,\d,\s,-]+)\s((millisecond|second|minute|hour|day|week|month|year)+[s]*)\s(from|after|before|previous to)+\s(.+)$/,
                            intvF       = ifDateReg.exec(ds.toLowerCase());
                        
                        //for interval specifications
                        if(intvF !== null){
                            var n       = me.num2Dec(intvF[1]),
                                directn = {from:1, after:1, before:-1, 'previous to':-1},
                                dir     = directn[intvF[4]],
                                dt      = me.translateDate(intvF[5]);  
                            return dt['add' + intvF[3].charAt(0).toUpperCase() + intvF[3].slice(1) + 's'](n * dir);
                        }
                       
                        //returns a match for "now"
                        if(ds.toLowerCase().match(/now/) !== null){ return now; }
                        
                        ds = ds.toLowerCase()
                        .replace('noon','12')
                        .replace('midnight','00:00')
                        .replace(/o.clock/,'')
                        .replace(/(\d+)[st|nd|rd|th]+/,function(m,dt){ return dt; })                        // Strip 'nd', 'th', 'rd', 'st'
                        .replace(/(\d{4})-(\d{1,2})-(\d{1,2})/g,function(m,yr,mm,dd){                       // Change UTC dates to ISO
                            return mm + '/' + dd + '/' + yr;
                        })
                        .replace(/(\d{1,2})-(\d{1,2})-(\d{2,4})/g,function(m,mm,dd,yr){                     // Change other UTC dates to ISO
                            return mm + '/' + dd + '/' + yr;
                        })
                        .replace(/^(\d{1,2})-(\d{1,2})[\s]*/,function(m,mm,dd){ return mm + '/' + dd + ' '; }) // Change other UTC dates to ISO
                        .replace('at','@')                                                                  // Replace at with the @ symbol
                        .replace(/(today|tomorrow|yesterday)/,function(m,f){                                // Translate today, tomorrow & yesterday into dates
                                 var replaceDays = {'today':0, 'tomorrow':1, 'yesterday':-1},
                                     newDt = new Date(now.valueOf() + (me.day * replaceDays[f]));
                                 return  (newDt.getMonth() + 1) + '/' + newDt.getDate() + '/' + newDt.getFullYear();
                             })
                        .replace(/(next|last) ([a-z]{3,10})[ ]*([0-9]+)*/,function(n, dir, word, day){      // Translate days of week & months into dates
                             var dayVal = me.day * ((dir == 'next') ? 1 : -1),
                                 dy = ($.inArray(word,me.days) > -1) ? $.inArray(word,me.days) 
                                 : $.inArray(word,me.shortDays),
                                 month = ($.inArray(word,me.months) > -1) ? $.inArray(word,me.months) 
                                 : $.inArray(word,me.shortMonths),
                                 useNum = (dy > -1) ? dy : (month > -1) ? month : -1,
                                 useFunc = (dy > -1) ? 'getDay' : (month > -1) ? 'getMonth' : '';
                                 
                             if(useNum > -1){
                                 var nxt = now.valueOf(), inc = new Date(nxt += dayVal);
                                 while(inc[useFunc]() != useNum)    inc = new Date(nxt += dayVal);
                                 if(month !== undefined && month != -1 && day.length !== 0)   inc.setDate(parseInt(day));

                                 return (inc.getMonth() + 1) + '/' + inc.getDate() + '/' + inc.getFullYear() + ' ';
                             }else{
                                 return '';
                             }
                         })
                         .replace(/(\d{1,2})[ -]+([a-z]{3,10})([ -]*)/, function(m,f,s,t){                    // Translate 'DD MMM' to 'MM/DD'
                             return ((($.inArray(s,me.months) > -1) ? $.inArray(s,me.months) : 
                                 $.inArray(s,me.shortMonths)) + 1) + '/' + f + t.replace('-',' ');
                         })
                         .replace(/(\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|-)+\b)/g,function(m,f){
                             return me.num2Dec(f);                                                            // Converts number text to decimals
                         })
                         .replace(/([a-z]{3,10}) (\d{1,2})[,]*/, function(m,f,s){                             // Translate 'Month DD' to 'MM/DD'
                             return ((($.inArray(f,me.months) > -1) ? $.inArray(f,me.months) : 
                                 $.inArray(f,me.shortMonths)) + 1) + '/' + s;
                         })
                        .replace(/^(\d{1,2}\/\d{1,2}(?![\d]))([\s|\/]*)(\d{0,4})/, function(m,dt,s,yr){      // Add century to dates with ambiguous years
                            if(yr.length == 2){
                                var thisYear = parseInt(now.getFullYear().toString().substr(2,4)),
                                    thisCentury = parseInt(now.getFullYear().toString().substr(0,2)) * 100,
                                    inputYear = parseInt(yr),
                                    yearDiff = 100 - inputYear,
                                    centuryDiff = (thisYear < 50)    ? -100 * ((yearDiff >= 50) ? 0 : 1) 
                                     : 100 * ((yearDiff < 50) ? 0 : 1),
                                    retYear = thisCentury + inputYear + centuryDiff;
                                return dt + '/' + retYear;    
                            }else if(yr.length == 4){
                                return dt + '/' + yr;
                            }else{
                                var retDt = dt + '/' + now.getFullYear().toString(),
                                    withDt = new Date(retDt);
                                return (withDt.valueOf() > now.valueOf()) ? retDt : dt + '/' + new Date(now.valueOf() + (me.day * 365)).getFullYear() + ' ';
                            }
                        })
                        .replace(/(\d{1,2}\/\d{1,2})\s(\d{4})/,function(m,dt,yr){return dt + '/' + yr; });   // Remove space in instances of '3/21 2012'
                        
                        //Adds today's date to strings that have no date information specified
                        ds = (dateReg.test(ds) === true) ? ds : (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() +' '+ ds;
                      
                        /* Adds an @ symbol for time strings that aren't UTC spec so that they can be modified later */
                        ds = ds.replace(/(\d{1,2}\/\d{1,2}\/\d{4})\s(.+)/,function(m,dt,ts){
                         if(ts.indexOf('@') == -1)   ts = '@ ' + ts;
                         return dt + ' ' + ts;
                        })
                        
                        /* Translate colloquial times */
                        .replace(/\d[ ]*[a|p]$/,function(m){ return m + 'm'; })
                        .replace(/[a|p][.][m]*[.]*/,function(m){ return m.replace(/[.]/g,''); })
                        .replace(/\d.m/,function(m){ return m.substring(0, m.length - 2) + ' ' + m.substring(m.length - 2, 3); })
                        .replace(/@ (\d+[ ]\d+)/,function(m,f){ return f.replace(' ',':'); })
                        .replace(/@ (\d+)/,function(m,f,p,o){ 
                            if(o.indexOf(':') != -1) return m;
                            else                     return m.trim() + ':00 ';
                        })
                        .replace(/@/g,''); // Firefox & IE don't like the @ symbol being used

                        return new Date(ds);
                    },
    
    /** 
    @param {array}    wArray    An array of numbers
    @return    The passed in array of numbers combined according to their order/magnitude
    i.e. The array [1,100,50,5] -> 155, [5,1000,20,3] -> 5023  */
    txt2Num:        function(wArray){
                        //split into an array and combine them according to magnitude
                        var pos = 0, theNum = 0, nextNum = 0, lastNum = 0;
                       
                        if(wArray.length == 1){
                            return wArray[0];
                        }else{
                            while(wArray[pos + 1] !== undefined){
                                var currNum = parseInt(wArray[pos]),
                                    smallerThanNext = this.getM(currNum) <= this.getM(nextNum);
                                nextNum = parseInt(wArray[pos + 1]);
                                lastNum = parseInt(wArray[wArray.length - 1]);

                                if(pos === 0){
                                    theNum = (smallerThanNext) ? currNum * nextNum : currNum + nextNum;
                                }else{
                                    if(smallerThanNext) theNum *= nextNum;
                                    else                theNum += nextNum;
                                }
                                pos++;
                            }
                        }
                       
                        if(lastNum != nextNum)  return (this.getM(lastNum) > 2) ? theNum *= lastNum : theNum += lastNum;
                        else                    return theNum;
                    },
                    
    getVal:         function(){ return this.value; },
                    
    setVal:            function(sv){
                        if(sv !== null){
                            if(typeof sv == 'string'){
                                this.fieldText(sv);
                                this.processDate();
                            }else{
                                this.value = sv;
                                this.fieldText(this.displayDate());
                            }
                        }
                        else{
                            this.fieldText('');
                            this.displayDiv.html('');
                            this.value = null;
                        }
                    },
                    
    /** 
    @param {date}    dt    A date object
    @return    A boolean
    Determines whether the date object passed in is valid or not. */
    validDate:       function(dt){
                        if(dt !== null && dt.toString() == 'Invalid Date')  return false;
                        else if (dt === null)                               return false;
                        else                                                return true;
                    }
});


/**
@author Stephen Nielsen (stephen.nielsen@usurf.usu.edu)
Creates a form field for uploading files. By the nature of file uploads and their tight pairing to a backend server, this control must be extended itself to be used for uploading files.
*/
Wui.File = function(args){ 
    $.extend(this,{
        /** An event hook to perform any functionality before a file is uploaded @eventhook */
        beforeSubmit:function(){},
        
        /** A value to send to the server where it will filter/block file uploads according to file type */
        fileTypeFilter: null,
        
        /** The name of the field that contains the file */
        upFieldName:'fileupload',
        
        /** Additional parameters to send to the server besides the file*/
        params:   {},
        
        /** Event hook to be performed when a file is successfully uploaded. @eventhook */
        upSuccess:  function(){},
        
        /** The server-side page where the file will be uploaded. */
        url:   '',
        
        /** The name of the parameter of the file title. */
        upTitleName:'title'
    },args,{
        field:    $('<input>').attr({type:'text'})
    });
};
Wui.File.prototype = $.extend(new Wui.Text(),{
    /** */
    changeClick:function(){
                     //swap buttons
                     this.changeBtn.el.fadeOut('fast');
                     this.upBtn.el.parents('div:first').fadeIn('slow'); 
                     this.field.removeClass().focus();
                 },
    
    /** */
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me);

                    // Wrap the field in order to add absolutely positioned buttons
                    me.append(me.wrapper = $('<div>').addClass('wui-file').append(me.field));
                    me.elAlias = me.wrapper;

                    var uniqueId = Wui.id();

                    // Add form, iframe, and buttons
                    me.push(
                        me.iframe = new Wui.O({el:$('<iframe>').css({display:'none'}).attr({id:uniqueId, name:uniqueId}) }),
                        me.changeBtn = new Wui.Button({
                            click:      function(){ 
                                            me.fieldText('');
                                            me.field.removeAttr('disabled'); 
                                            me.changeClick(); 
                                        },
                            text:       'X',
                            tabIndex:   -1,
                            cls:        'file-change field-btn'
                        }),
                        me.upBtn = new Wui.Button({text:'Browse', cls:'field-btn', tabIndex:-1 }),
                        me.fileFrm = new Wui.O({
                            el:$('<form>').attr({
                                method:     'post',
                                enctype:    'multipart/form-data',
                                action:     me.url,
                                target:     uniqueId
                            })
                        })
                    );

                    me.fileFrm.append(
                        // The file field
                        me.fileInput = $('<input>')
                        .attr({name:me.upFieldName, type:'file'})
                        .change(function(){ me.submit(); })
                        .focus(function(){ me.upBtn.el.addClass('selected'); })
                        .blur(function(){ me.upBtn.el.removeClass('selected'); })
                    );
                },

    /** Submit the form */
    submit:     function() {
                    var me = this;

                    me.beforeSubmit();
                    
                    //add title to parameters and parameters to the file upload
                    me.params[me.upTitleName] = me.field.val();
                    
                    // for file filtering
                    if(me.fileTypeFilter !== null) me.params[file_type_filter] = me.fileTypeFilter;

                    me.field.addClass('has-file uploading').attr('disabled', true).val('uploading...');
                    
                    /** add additional paramters before sending */
                    me.fileFrm.el.children("input[type!='file']").remove();
                    $.each(me.params, function(key, value) {
                        me.fileFrm.append($('<input>').attr({type:'hidden', name:key, value:value}));
                    });
                    
                    /** Submit the actual form */
                    me.fileFrm.el.submit(); 
                    
                    /** Do something after we are finished uploading */
                    me.iframe.el.unbind().load(function() {
                        me.onComplete($('body',me.iframe.el.contents()).text()); //done :D
                    });
                },

    /**
    @param {object} unwrapped The Wui.unwrapData unwrapped results of the file upload.
    This function is for developers to run whatever analysis they desire on the raw output of the file upload.
    */
    devHook:    function(){},

    /** */            
    onComplete: function(r){
                    try{
                        var me = this,
                            d = $.parseJSON(r),
                            unwrapped = Wui.unwrapData.call(me,d);
                            
                        // Put the returned data out there for develpers.
                        me.devHook(unwrapped);
                        
                        //remove the css uploading state
                        me.field.removeClass('uploading empty');
                        
                        // If successful it will set the value of the field, else it whines and complains
                        if(d.success === true){
                            me.val(unwrapped.data,'upSuccess');
                        }else{
                            if(d.errors && d.errors[0] && d.errors[0].fileTypeError){
                                Wui.errRpt(d.errors[0].fileTypeError,'Invalid File Type');
                                me.field.removeClass('has-file uploading').removeAttr('disabled');
                                if(me.beforeSelectTitle)
                                    me.fieldText(me.beforeSelectTitle);
                            }else{
                                me.upFailure(d);
                            }
                        }
                    }catch(err){
                        console.log(err,r);
                        me.upFailure(err,r);
                    }
                },
    upFailure:  function(e,e2){
                    console.log(e,e2);
                    Wui.Text.prototype.val.call(this,'Upload Failure');
                },
    /** */
    getVal:        function(){ return this.value || {}; },
    /** */
    setVal:        function(sv){
                    this.value = this.value || {};
                    $.extend(this.value,sv);
                },
    /** */
    val:        function(sv,callback){
                    var retVal = Wui.FormField.prototype.val.apply(this,arguments);
                    if(this[callback] && typeof this[callback] == 'function') this[callback]();
                    return retVal;
                },
    
    /** */
    valChange:  function(){
                    var me = this;
                    if(me.value){
                        me.field.addClass('has-file').removeAttr('disabled');
                        me.upBtn.hide();
                        me.fileFrm.hide();
                        asdf = me.upBtn;
                        me.changeBtn.show();
                        
                        //changed to a 'file-selected' view and display a nicely formatted file
                        me.field.addClass('has-file ' + ((me.value.extension !== undefined) ? 'icon-' + me.value.extension.replace('.','') : '')).attr('disabled',true);
                        me.fieldText(me.value[me.upTitleName]);
                    }else{
                        me.field.removeClass();
                        me.upBtn.show();
                        me.fileFrm.show();
                        me.changeBtn.hide();
                        me.field.val(null);
                    }
                    
                }
});

/**
@param {string}     msg         Label of the text input if no other inputs are defined.
@param {funciton}   callback    Function will receive the value of the text input if no other inputs are defined, or it will get an object containing all form values.
@param {string}     [msgTitle]  The title for the window, defaults to 'Input'.
@param {array}      [inputs]    Array of Wui.FormFields to display on the window. When this array has only one item it merely replaces the default text field and is required. 
@param {string}     [content]   HTML content to display above the form fields.

Presents a WUI Form in a modal window.  In its simplest form, just passing in a single 'msg' string will present a window with a text field and the 'msg' as a label for the field. For the various configurations, see the example source.
*/
Wui.input = function(msg, callback, msgTitle, inputs, content){
    // make sure the inputs will be acceptable on the form
    if(inputs){
        if(!inputs.length){
            if(inputs instanceof Wui.FormField || inputs.ftype)
                inputs = [inputs];
            else
                inputs = [{ftype:'Wui.Text'}];
        }
    }else{
        inputs = [{ftype:'Wui.Text'}];
    }
    if(inputs.length == 1)    $.extend(inputs[0],{label:msg, required:true, name:'inputField'});
    if(content !== undefined) inputs.splice(0,0,{ftype:'Wui.Note', html: content});
    
    // create the form and the window
    var inputFrm = new Wui.Form({ labelPosition:'left', items:inputs }),
        Msg = new Wui.Window({
            title:      msgTitle || 'Input',
            bbar:        [ 
                            new Wui.Button({text:'Cancel', click:function(){ Msg.answerRun = true; Msg.close(); }}),
                            new Wui.Button({text:'Submit', click:function(){ Msg.getVal(); }})
            ],
            isModal:    true,
            items:      [inputFrm],
            cls:        'wui-input-window',
            width:      600, 
            height:     250,
            getVal:        function(){
                            var formData = inputFrm.getData();
                            if(formData){
                                if(callback && typeof callback == 'function'){
                                    var len = Wui.getKeys(formData).length;
                                    if(len == 1 && formData.inputField) callback(formData.inputField);
                                    else                                callback(formData);
                                }
                                Msg.answerRun = true;
                                Msg.close();
                            }
                        },
            onWinClose: function(){ return ((Msg.answerRun !== true) ? false : Msg.answerRun); }
        });
    Msg.header.splice(0,1);
    return inputFrm;
};

})(jQuery,Wui);


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
                            if(state[i].view === target && state[i].params[key]){
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