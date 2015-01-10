/*! Wui 1.2
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2/license.html
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
var Wui = Wui || {
    version: '1.2.0'
};

(function($,window) {

// AJAX error reporting and caching.
$.ajaxSetup({ 
    cache:      false,
    error:      function(response){
                    var err = null;
                    
                    try{        err = $.parseJSON( response.responseText ); }
                    catch(e){   err = {fatalError:'Aw Snap! There was a problem talking to the server.'}; }
                    if(err !== null)
                        Wui.errRpt(err.fatalError);
                }
});


/**
    @param  {object}    obj         Object containing named keys.
    @param  {boolean}   [addIndex]  For fileLists, add the index of the file regardless of whether there is one or many. 
    @return A javascript FormData object (<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">Mozilla Developer Network: FormData</a>) containing the key/values passed in including files.

    Allows the WUI to upload files via ajax by using the javascript FormData object made
    available in HTML5. In cases where a field contains multiple files, the FileList it
    contains will be broken down into multiple keys in the FormData with the keys being named
    {fieldName}_{number-th-file starting with 0} (i.e. 'image_0','image_1',etc...). 

    The following MUST be added to the config of the ajax object:

    contentType:false,
    processData:false


*/
Wui.forAjaxFileUpload = function(obj,addIndex){
    var a = 0, x = 0, formData = new FormData();                                                                    

    // Adds all of the keys in obj to formData
    for (a in obj) {
        if(obj[a] instanceof FileList) {
            if(obj[a].length > 1 || addIndex){
                for(x = 0; x < obj[a].length; x++)
                    formData.append(a+'_'+x,obj[a][x]);
            }else{
                formData.append(a,obj[a][0]);
            }
        }else{
            if      (obj[a]===null) formData.append(a,"");
            else    formData.append(a,obj[a]);
        }
    }

    return formData;
};


/** @return The id of the string. 
    Returns a string that will be a unique to use on the DOM. 
    Ids are returned in the format wui-{number}.
    _.uniqueID([prefix]) can fulfill this role
*/
Wui.id = function(){
    if(Wui.idCounter === undefined) Wui.idCounter = 0;
    return 'wui-' + Wui.idCounter++;
};


/**Returns an array of the keynames of an object. For example:

Wui.getKeys({
    first:  1,
    second: 2,
    third:  'three'    
})

Will return:

['first','second','third']

@preserve_format
@param {object} Object containing named keys
@return Array containing the key names of the passed in object in alphabetical order.
*/
Wui.getKeys = function(obj){
    var retArray = [];
    if(obj)
        $.each(obj,function(key){ retArray.push(key); });
    return retArray.sort();
};

/** A function to get the scrollbar width is necessary because it varies among browsers, and is useful
for sizing objects within a container with overflow set to scroll, or auto.
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@return Number specifying the scrollbar width for the current page in pixels.
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
    Determines whether a value is a percent string.
    @return True if there is a string passed in containing a '%', else false.
*/
Wui.isPercent = function(){
    return (arguments[0] && arguments[0].indexOf && arguments[0].indexOf('%') != -1);
};


/** Converts a percentage to a number of pixels given the containing element's dimensions.
    @param {object} el          jQuery Object the percents are being calculated for. 
    @param {string} percent     Percent to be calculated into pixels
    @param {string} dim         Dimension [height,width] for comparing to parent objects
    @return Number in pixels of the percentage passed in.
*/
Wui.percentToPixels = function(el,percent,dim){
    var parent = el.parent(),
        useWindow = (parent[0] === $(window)[0] || parent[0] === $('html')[0] || parent[0] === $('body')[0]),
        parentSize = (useWindow) ? ((dim == 'height') ? $.viewportH() : $.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
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
    var bodyElems = $('body *'),
        useElems = bodyElems.length < 2500 ? bodyElems : $('body > *, [style*="z-index"]')
        topZ =  Math.max.apply(null, 
                    $.map(useElems, function(e) {
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
        dc          = me.hasOwnProperty('dataContainer') ? me.dataContainer : Wui.Data.prototype.dataContainer,
        tc          = me.hasOwnProperty('totalContainer') ? me.totalContainer : Wui.Data.prototype.totalContainer,
        response    = (dc && r[dc]) ? r[dc] : r,
        total       = (tc && r[tc]) ? r[tc] : response.length;
    
    return {data:response, total:total};
};

/** 
@param {object} parent The element to which the child will be relatively positioned.
@param {object} child The element to be positioned.
Absolutely positions a child element, relative to its parent, such that it will 
be visible within the viewport and at the max z-index. Useful for dialogs and drop-downs.
*/
Wui.positionItem = function(parent,child){
    var ofst    =   parent.offset(),
        cWidth  =   child.outerWidth(),
        cHeight =   child.outerHeight(),
        plBelow =   (function(){
                        var retVal = ofst.top + parent.outerHeight() + cHeight < $.viewportH();

                        if(!retVal && (ofst.top - cHeight < 0)){
                            cHeight = ofst.top -5;
                            retVal = ofst.top + parent.outerHeight() + cHeight < $.viewportH();
                        }else{
                            cHeight = '';
                        }

                        return retVal;
                    })(),
        plRight =   (ofst.left + parent.outerWidth() - cWidth > 0),
        fxdOrAbs =  (function(){
                        var retVal = 'absolute';

                        parent.add(parent.parents()).each(function(){
                            if($(this).css('position') === 'fixed')
                                retVal = 'fixed';
                        });

                        return retVal;
                    })()

    child.css({
        left:       (plRight) ? ofst.left + parent.outerWidth() - cWidth : ofst.left,
        top:        (plBelow) ? ofst.top + parent.outerHeight() : ofst.top - ($.isNumeric(cHeight) ? cHeight : child.outerHeight()),
        height:     cHeight,
        position:   fxdOrAbs,
        zIndex:     Wui.maxZ()
    });
};


/**
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@param      {string}   prop    The name of a css property
@return     The property name, or false

Detects whether a CSS property is supported by the current browser. If its not supported,
the method returns false. If the property is supported, the passed in string will be
returned as-is, or with the necessary vendor appropriate prefix.
*/

Wui.cssCheck = function(prop){
    var i           = 0,
        parts       = prop.split('-'),
        ucProp      = '';

    // camelCase dashed items
    for(; i < parts.length; i++)
        ucProp += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);


    var n           = 0,
        d           = document.createElement("detect"),
        camelProp   = ucProp.charAt(0).toLowerCase() + ucProp.slice(1),
        omPrefixes  = 'Webkit Moz O ms'.split(' '),
        prefixes    = '-webkit- -moz- -o- -ms-'.split(' '),
        all         = (prop+' '+camelProp+' '+omPrefixes.join(ucProp+' ') + ucProp).split(' '),
        property    = false;

    for (; n < all.length; n++) {
        if (d.style[all[n]] === "") {
            property = all[n];
            break;
        }
    }

    // The property is not supported
    if(!property) return false;

    // Return the property if it is supported, or prefixed if needed
    switch(n) {
        case 0:
        case 1:
            return prop;
            break;
        default:
            return prefixes[n-2] + prop;
    }
}


/**
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@param {array}      collection           A collection of items that will be fit within a container.
@param {string}     [dim]                The dimension to perform the fit on, 'height','width', height is default.

This function will size items relative to each other via a 'fit' value, as well as percentages and fixed values.
*/
Wui.fit = function(collection,dim){
    // Ensure the collection is an array of Wui Objects
    if(collection instanceof Array && collection.length > 0){
        var i           = 0,
            fitCt       = 0,
            parent      = (collection[0].parent) ? collection[0].parent : collection[0].el.parent(),
            parentEl    = (parent.el) ? (parent.elAlias || parent.el) : parent,
            dir         = (dim == 'width') ? 'row' : 'column';

        dim = (dir == 'row') ? 'width' : 'height';

        // Make the containing element flex
        parentEl.css('display',Wui.cssCheck('flex')).css(Wui.cssCheck('flex-direction'),dir);

        $.each(collection,function(i,itm){
            if($.isNumeric(itm.fit) && itm.fit >= 0){
                fitCt += itm.fit;           // Tally fit values
                itm[dim] = -1;              // Set to -1 so that CSSByParam will not act on it
            }else if(itm[dim]){
                delete itm.fit;             // Ensure the item doesn't have a dimension and a fit specified
            }else{
                fitCt += (itm.fit = 1);     // Add a fit value to an item that doesn't have dimensions specified
            }
        });
       
        // If a collection becomes entirely fixed widths the flex will have a few problems
        if(fitCt === 0){
            var itm = collection[collection.length - 1];
            fitCt += (itm.fit = 1);
            itm[dim] = -1;
        }
       
        // Apply CSS Flex properties
        $.each(collection,function(i,itm){
            var css = {};
            if(itm.fit){
                $(itm.el).css(Wui.cssCheck('flex'),itm.fit + ' auto');
            }else if(itm.cssByParam === undefined){
                $(itm.el).css(dim,itm[dim]);
                $(itm.el).css(Wui.cssCheck('flex'),'');
            }
        });
    }else{
        console.log('Improper collection specified', arguments);
    }
};


/** The base object from which all other WUI Objects extend. The Wui Object contains some
foundational configs and methods that are key to understanding with WUI at large. Each of these 
methods and configs are found in every reusable object <img src="../img/object.png" width="20" height="20" /> in the WUI.

Each object has an 'el' which represents the HTML object/element that can be added to the DOM. In the case
of the base Wui.O, this element must be defined.

Each object also has a representaion of itself in memory. This object in memory contains an items array.
Although items can be appended to the 'el' without being added to the items array, the items array is meant
to contain all of the child elements of an object.

When a Wui.O is added to another object's items array in memory, its 'el' is appended to the parent object's
'el' on the DOM, as a child DOM node.  This works conversly when removing an item from the items array. The
primary methods for adding/removing items are push(), and splice(); and these are involved in much of the 
manipulation of objects using the WUI. Both push and splice follow in form and function JavaScript's methods of the
same name.

It is important to note that with all WUI objects, there is a distinction between when an object is instantiated
in memory, and when it is actually rendered on the page. Every Wui.O has a event hook called onRender() that can
be defined to do certain things when the object is rendered on the page.


 *  @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
*/
Wui.O = function(args){ $.extend(this,{
    /** Whether the object is hidden on the DOM */
    hidden:         false

    /** If id has a value, the HTML attribute id will be set on the element. */
    //id:           undefined,

    /** If name has a value, the HTML attribute name will be set on the element. 
    This is useful for naming objects for listeners. 

    Adding the name property to an object will fire a namespaced event as well as the generic
    event. Listeners for these events follow the convention: [eventname].[name]. These listeners
    can be turned on and off using the jQuery .on() and .off() methods. */
    //name:         undefined,

    /** This item can contain a space separated list of classes that will be applied
    to the element of the object. Additional classes may be added by the object itself. This
    is useful for adding additional styling to objects. */
    //cls:          undefined,

    /** The fit dimension determines whether objects contained within it are fit
    horizontally or vertically. Possible values are 'width' (= horizontal fitting) 
    or 'height' (= vertical fitting). */
    //fitDimension: 'width',

    /** tabIndex is used to give an item the ability to be tabbed to, and to order that tabbing. 
    A -1 in this value will make the element un-tabbable. */
    //tabIndex:     undefined,
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
    addToDOM:   function(obj, tgt, act){
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
                    if(this.afterRender) this.afterRender();
                    
                    return true;
                },

    afterRender:function(){
                    this.each(function(itm){ if(itm.afterRender) itm.afterRender(); });
                },

    /**
    @param {object}    item    A jQuery object to be added
    Appends item to the WUI Object's 'elAlias' or 'el', whichever is defined.
    */
    append:     function(obj){
                    var me = this, el = me.elAlias || me.el;
                    $.each(arguments,function(i,itm){
                        el.append(itm);
                    });
                },


    /** Removes only the DOM items from the WUI Object's 'elAlias' or 'el', whichever is defined. */
    clear:      function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },
    /**
    Gets called when a WUI Object is placed and gets called on all of a placed object's items.
    Calls onRender() if it exists on the object, calls its children's callRender(), calls its own 
    afterRender() if it exists, and finally layoutKids() which does layout on child elements.
    */
    callRender: function(){
                    var me = this;
                    
                    if(me.onRender)  me.onRender();         // Perform render for this
                    
                    // Perform rendering for child elements
                    me.each(function(itm){ if(itm.callRender) itm.callRender(); });
                    
                    if(me.afterRender)  me.afterRender();   // Performs afterrender if it exists

                    me.layoutKids();                        // Handles fit and layout for child elements
                },
    
    /**
    @param {string}         name    Name of the HMTL attribute to set
    @param {string|number}     val        Value of the given attribute
    
    @return True if the val parameter is a valid string or number, else false.
    
    Tests whether the passed in value is valid, then uses the jQuery .attr method to apply an attribute to the el of the WUI object.
    */
    applyAttr:  function(name,val){
                    var validVal = (typeof val === 'string' || typeof val === 'number');
                    if(validVal) $(this.el).attr(name,val);
                    return validVal;
                },
    
    /**
    @param {object} item    A WUI Object, or if undefined, the object that this method is a member of.
    
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
                        if($.isNumeric(m.height) && m.height >= 0)      m.el.css({height: m.height});
                        if($.isNumeric(m.width) && m.width >= 0)        m.el.css({width: m.width});

                        // calculate percentage based dimensions
                        if(Wui.isPercent(m.width))  m.el.css({width:Wui.percentToPixels(m.el,m.width,'width')});
                        if(Wui.isPercent(m.height)) m.el.css({height:Wui.percentToPixels(m.el,m.height,'height')});
                        
                        // hide an object based on its hidden value
                        if(m.hidden) m.el.css('display','none');
                        
                        return m.el.addClass(m.cls);
                    }else{
                        return m;
                    }
                },
    /**
    @param {function}   fn          Function that gets called for each item of the object.
    @param {boolean}    [ascending] Whether the loop happens in ascending or descending order. Defaults to true.
    
    @return true
    Loops through each of the objects items. The passed in function gets 
    called with two parameters the item, and the item's index.
    */
    each:       function(f,ascending){
                    ascending = (typeof ascending === 'undefined') ? true : ascending;
                    var i = (ascending) ? 0 : this.items.length - 1;
                    
                    if(this.items){
                        if(ascending){
                            for(i; i < this.items.length; i++){
                                if(f(this.items[i],i) === false) break;
                            }
                        }else{
                            for(i; i >= 0; i--){
                                if(f(this.items[i],i) === false) break;
                            }
                        }
                    }

                    return true;
                },
    /**
    @param {number}     [speed]     Time in milliseconds for the hiding element to fade out.
    @param {function}   [callback]  A function that gets called at the end of the fadeout/hide.
    
    @return The el or elAlias of the object being hidden
    Hides an object with the options of an animated fadeout and callback function
    */
    hide:       function(){ 
                    var args = ['fadeOut'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = true;
                    return this.showHide.apply(this,args);
                },

    /**
    @return A number where the object is positioned.
    Returns the index of the item within the object's parent.items array. If the object has no parent, it returns undefined.
    This function is DIFFERENT from jQuery's index() function which provides a DOM elements position within its parent node.
    */
    index:       function(){ 
                    var me = this, myPosition = undefined;
                    if(me.parent){
                        // Get my position within the parental array
                        me.parent.each(function(itm,idx){ if(itm === me) myPosition = idx; });
                    }
                    return myPosition;
                },

    /**
    @param  {function}   afterLayout A function to run after the layout has occurred.
    Runs cssByParam and Wui.fit() on itself and its children.  Similar to callRender(),
    but without the rendering of objects - useful to resize things that are already rendered.
    */
    layout:     function(afterLayout){
                    this.cssByParam(this);  // run css styles
                    this.layoutKids();      // run fit and layout on children

                    // Performs actions passed in as parameters
                    if(afterLayout && typeof afterLayout === 'function')    afterLayout();
                },

    /** A function to run layout on just the objects children without calling cssByParam. */
    layoutKids: function(){
                    var me = this, needFit = false;

                    // Perform Wui.fit on items that need it
                    me.each(function(itm){ if(itm.fit){ 
                        needFit = true; return false;
                    }});
                        
                    if(me.fitDimension || needFit)
                        Wui.fit(me.items, (me.fitDimension || undefined));
                        
                    // Perform layout for child elements
                    me.each(function(itm){ if(itm.layout) itm.layout(); });
                },

    /**
    @param {numeric}    position    Position to move the item to

    Moves the item within the items array it is a member of. If not a member 
    of an items array, this does nothing.
    */
    move:       function(newPosition){
                    var me = this, myPosition = me.index();
                        
                    // Bounds checking
                    newPosition = $.isNumeric(newPosition) ? newPosition : 0;

                    if(myPosition !== undefined){
                        // Moves my position in memory
                        me = Array.prototype.splice.call(me.parent.items,myPosition,1)[0];
                        Array.prototype.splice.call(me.parent.items,newPosition,0, me);
                        
                        // Depending on my position in memory, move DOM element accordingly
                        if(newPosition === 0) {                             //Place at the beginning of the DOM.
                            me.parent.items[1].el.before(me.el);
                        }else if(newPosition > me.parent.items.length) {    // The new position is greater than array length in memory, place at the end of DOM.
                            me.parent.items[me.parent.items.length-2].el.after(me.el);
                        }else{                                              // Place according to the new position in the DOM.
                            me.parent.items[newPosition-1].el.after(me.el);
                        }
                    }
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
                        if(arg.place)   arg.place();
                        else            me.addToDOM(arg);

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
    show:       function(){ 
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
    showHide:   function(fn,speed,callback){
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
                        for(i = 0; i < me.items.length; i++)          { me.addToDOM(me.items[i],el); callProcessors(me.items[i]); }
                    }else if(me.items[(idx + numAdded)] === undefined){    //meaning the new items were inserted at the end of the array
                        for(i = idx; i < me.items.length; i++)        { me.addToDOM(me.items[i],me.items[i-1].el,'after'); callProcessors(me.items[i]); }
                    }else if (numAdded !== 0){                             //items at the beginning/middle of the array
                        for(i = (idx + numAdded); i > 0; i--)         { me.addToDOM(me.items[i-1],me.items[i].el,'before'); callProcessors(me.items[i-1]); }
                    }

                    function callProcessors(arg){
                        arg.parent = me;
                        if(arg.onRender)    arg.onRender();
                        if(arg.layout)      arg.layout();
                    }
                    
                    return retVal;
                }
};

/** The Long Poll object provides a way to poll a remote resource at a given interval.
This is similar to listening on a socket, but is rather repeatedly polling a resource via AJAX.
Long polling is useful for checking on the status of an item, or reloading data that 
changes in real-time while the user has the page on the screen.

The example source is the best way to understand how to use this resource.
If you have a javascript console available, watching the console while this page is loaded
will give you a demonstration if what is happening.

The WUI Long Poll has a self-decaying retry feature: In the case that the resource is unavailable,
rather than continuing to poll at a constant interval, the poll will slow its polling by a factor of the
waitFactor config, until it eventually stops trying. If the resource returns, the poll will revert to
its initial interval.

 @event     pollStart     Fires before polling starts (event, Wui.longPoll)
 @event     pollSuccess   Fires When the poll recieves a successful response. Includes remote data. (event, Wui.longPoll, data)
 @event     pollError     Fires when $.ajax() has an error in the request. (event, Wui.longPoll, err)
 @event     pollStopped   Fires after polling has stopped. Stopping polling doesn't trigger until the startup of the next poll. (event, Wui.longPoll)
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)
*/
Wui.LongPoll = function(args){
    $.extend(this,{
        /** The time in milliseconds between each polling. The ajax timeout parameter will also be set to this value so that the server will not be pestered faster than it can respond to a given request. */
        pollTime:   1000,

        /** A multiple of pollTime at which polling retries will cease. */
        maxRetry:   120,

        /** When a poll fails, retries will increase in length by this factor until 'maxRetry' has been reached. */
        waitFactor: 2,

        /** The URL of the resource to poll. */
        url:        null,

        /** Parameters to pass to the resource specified in URL. */
        params:     null,

        /** The name of the longPoll (useful to identifying its responses in the event that there are multiple polls on the same page), defaults to the result of Wui.id(). */
        name:       null,

        /** Setting to pass to the jQuery AJAX function. Settings defined in the poll method already will be overridden. */
        ajaxParams: {}
    },args);
    this.init();
};
Wui.LongPoll.prototype = {
    /** Set up the polling interval and gives the object a name if none is specified. */
    init:       function(){
                    var me = this;
                    me.originalPollTime = me.pollTime;
                    me.naturalPollTime = me.pollTime + 1;
                    me.name = (me.name) ? me.name : Wui.id();
                    me.start();
                },

    /** Polls a resource and sends events on success, failure, and if/when polling stops. */
    poll:       function(){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    setTimeout(function() { 
                        $.ajax($.extend(me.ajaxParams, { 
                            url:        me.url,
                            data:       me.params,
                            beforeSend: function(jqXHR){
                                            if(me.pollTime > me.originalPollTime * me.maxRetry){
                                                jqXHR.abort();
                                                $(window).trigger($.Event('pollStopped'+ dn),[me])
                                                    .trigger($.Event('pollStopped'),[me]);
                                                return false;
                                            }
                                        },
                            success:    function(data) { 
                                            me.pollTime = me.naturalPollTime;
                                            $(window).trigger($.Event('pollSuccess' + dn),[me, data])
                                                .trigger($.Event('pollSuccess'),[me, data]);
                                        },
                            complete:   function(){ me.poll(); },
                            timeout:    me.pollTime,
                            error:      function(err){ 
                                            // This allows the poll to retry once at the original poll time before increasing 
                                            // by a factor of waitFactor
                                            me.pollTime = (me.pollTime == me.naturalPollTime) ? me.originalPollTime 
                                                : me.pollTime * me.waitFactor;
                                            $(window).trigger($.Event('pollError' + dn),[me, err])
                                                .trigger($.Event('pollError'),[me, err]);
                                        }
                        })); 
                    }, me.pollTime);
                },

    /** Stops the poll engine at just before the beginning of the next poll attempt. */
    stop:       function(){ this.pollTime = this.pollTime * this.maxRetry + 1; },

    /** Resumes polling instantly. */
    start:      function(){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    me.pollTime = me.naturalPollTime;
                    $(window).trigger($.Event('pollStart' + dn),[me])
                        .trigger($.Event('pollStart'),[me]);
                    me.poll();
                }
};


/**
 @event        datachanged    When the data changes (name, data object)
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

The WUI Data Object is for handling data whether remote or local. It will fire 
namespacedevents that can be used by an application, and provides a uniform 
framework for working with data.

If data is remote, Wui.Data is an additional wrapper around the jQuery AJAX method 
and provides for pre-processing data. Data can be pushed and spliced into/out of 
the object and events will be fired accordingly.
*/
Wui.Data = function(args){
    $.extend(this,{
        /** Array of data that will be stored in the object. Can be specified for the object or loaded remotely */
        data:           [],
        
        /** Name a key in the data that represents the identity field. */
        identity:       null,
        
        /** Name of the data object. Allows the object to be identified in the listeners, and namespaces events. */
        name:           null,
        
        /** Object containing keys that will be passed remotely */
        params:         {},
        
        /** URL of the remote resource from which to obtain data. A null URL will assume a local data definition. */
        url:            null,
        
        /** Special configuration of the ajax method. Defaults are:
        
            data:       me.params,
            dataType:   'json',
            success:    function(r){ me.success.call(me,r); },
            error:      function(e){ me.success.call(me,e); },
        */
        ajaxConfig:     {},
        
        /** The total number of records contained in the data object */
        total:          0
    },args);
};
Wui.Data.prototype = {
    /** An object in the remote response actually containing the data.
    Best set modifying the prototype eg. Wui.Data.prototype.dataContainer = 'payload'; */
    dataContainer:  null,
    /** An object in the remote response specifying the total number of records. Setting this
    feature will overrride the Data object's counting the data. Best set modifying the prototype eg. Wui.Data.prototype.totalContainer = 'total'; */
    totalContainer: null,
    
    /** 
    @param {array}    newData    Array of the new data
    @eventhook Used for when data is changed.
    */
    dataChanged:    function(){},
    
    /**
    @param {function} fn A function that gets called for each item in the object's data array
    
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    dataEach:       function(f){
                        for(var i = 0; i < this.data.length; i++)
                            if(f(this.data[i],i) === false)
                                break;
                        return true;
                    },
    
    /**
    Performs a remote call and aborts previous requests
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
    loadData:       function(){
                        var me = this,
                            config = $.extend({
                                data:       me.params,
                                dataType:   'json',
                                success:    function(r){ me.success.call(me,r); },
                                error:      function(e){ me.failure.call(me,e); },
                            },me.ajaxConfig);
                        
                        // Work in additional parameters that will change or stop the request
                        var paramsOkay = me.setParams.apply(me,arguments),
                            beforeLoad = me.beforeLoad.apply(me,arguments);

                        // Perform request
                        if(paramsOkay !== false && beforeLoad !== false){
                            // abort the last request in case it takes longer to come back than the one we're going to call
                            if(me.lastRequest && me.lastRequest.readyState != 4)
                                me.lastRequest.abort();
                            
                            return me.lastRequest = $.ajax(me.url,config);
                        }
                        
                        // If there was no request made, return a rejected deferred to keep return
                        // types consistent
                        return $.Deferred().reject();
                    },
    /**
    @param {object} params    Params to be set
    @eventhook Can be used as is or overridden to run when parameters change.
    Can be used as is to set parameters before an AJAX load, or it can also be used as an event hook and overridden.
    This method is called from loadData with its arguments passed on, so arguments passed to load data will be sent here. 
    See loadData(). If this function returns false, load data will not make a remote call.
    */
    setParams:      function(params){
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
                        me.total = ($.isNumeric(t)) ? t : (me.data) ? me.data.length : 0;
                        
                        me.fireDataChanged();
                    },

    fireDataChanged:function(){
                        var me = this, dn = (me.name || 'wui-data');

                        me.dataChanged(me.data);
                        $(document).trigger($.Event('datachanged.' + dn),[dn, me])
                            .trigger($.Event('datachanged'),[dn, me]);
                        me.afterSet(me.data);
                    },
    
    /** @eventhook Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData().
        If this function returns false, load data will not make a remote call. */
    beforeLoad:     function(){},
    
    /**
    @param    {array}    data    The value of the data cofig of the current object
    @eventhook  Fires after data is set. Meant to be overridden. See loadData().
    */
    afterSet:       function(){},
    
    /**
    @param {array} d Data to be set on the ojbect
    @eventhook  Fires after the remote call but before data is set on the object. Meant to be overridden. See loadData().
    */
    beforeSet:      function(){},
    
    /**
    @param {object or array} r Response from the server in JSON format
    Runs when loadData() successfully completes a remote call.
    Gets data straight or gets it out of the dataContainer and totalContainer.

    Calls setData() passing the response and total.
    */
    success:        function(r){
                        var me = this,
                            unwrapped = Wui.unwrapData.call(me,r);
                        
                        me.onSuccess(r);
                        me.setData(unwrapped.data, unwrapped.total);
                    },
    
    /** @eventhook AllowS for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData(). */
    onSuccess:      function(){},
    
    /** @eventhook Allows for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData(). */
    onFailure:      function(){},
    
    /** Runs when loadData() fails. */
    failure:        function(e){ this.onFailure(e); },
    
    /** 
    @param {array} Data to be processed.
    Allows for pre-processing of the data before it is taken into the data object. Meant to be overridden, otherwise will act as a pass-through. See loadData().*/
    processData:    function(response){ return response; },

    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Same as Array.push() but acting on the data array of the object.
    */
    push:           function(){
                        var retVal = Array.prototype.push.apply(this.data,arguments);
                        this.total = this.data.length;
                        this.fireDataChanged();
                        return retVal;
                    },

    /**
    @param  {number}    idx         Position to start making changes in the items array.
    @param  {number}    howMany     Number of elements to remove.
    @param  {object}    [obj,...]   One or more objects to be added to the array at position idx
    @return An array of the removed objects, or an empty array. 
    Same as Array.splice() but acting on the data array of the object.
    */
    splice:         function(){
                        var retVal = Array.prototype.splice.apply(this.data,arguments);
                        this.total = this.data.length;
                        this.fireDataChanged();
                        return retVal;
                    }
};


/**The template engine is a simple way to create DOM elements based on data. A template string is provided that contains the
template html with the variable interspersed surrounded by '{}'. For example, a simple data template to display a list
of names may be: 

'<li>{name}</li>'

There are more complex operations that can be performed with a template. For example, suppose I had a set that contained
the data name, address, gender, and age. I can operate programmatically on the data by using the form '{()}', where 
everything inside the parenthesis is processed like a function. In essence, with the previously described data set, 
'{('some code here')}' is equivalent to the following functions, where the values of each row are passed in:

function(name, address, gender, age){
    return 'some code here';
};

If I wanted to display this information in a table, but I didn't want to display the age if it was over 20. I also 
wanted to append 'Mr.', or 'Ms.' depending on the gender.My template could take the following form:

'<tr>' +
    '<td>{( ((gender == "female") ? "Ms. " : "Mr. ") + name )}</td>' +
    '<td>{( (parseInt(age) > 20) ? '-' : age )}</td>' +
    '<td>{address}</td>' +
'</tr>'
@preserve_format
*/
Wui.Template = function(args){ $.extend(this,args); };
Wui.Template.prototype = {
    /** The HTML template that the data will fit into. Null value will cause an error to be thrown. Specification required. */
    template:   null,
    
    /** A single record to be applied to the template. Null value will cause an error to be thrown. Specification required.  */
    data:       null,
    
    /**
    @param {number} [index] An optional number to make an index available to the record
    @return A jQuery object containing the template paired with its data
    Creates the template 
    */
    make:       function(index){
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
                                var keys = Wui.getKeys(me.data), vals = [], i = 0;
                                
                                // Removes any key values that may start with a number and ruin the engine
                                for(i = keys.length - 1; i >= 0; i--)   if(keys[i].match(/\b\d+/g)) keys.splice(i,1);

                                // fill arrays of keys and their values and make sure they are in the same order
                                for(i = 0; i < keys.length; i++)        vals.push(me.data[keys[i]]);
                                
                                // add the passed in conditional as the body of the function created below
                                keys.push("return " + fn);
                                
                                // create function that will perform the conditional statement
                                var newFn = Function.apply(null,keys);
                                
                                // call the function with the keys as variables in scope
                                return newFn.apply(null,vals);
                            })
                        );
                    }
                    throw new Error('Wui.js - Template engine missing data and/or template.');
                }
};


/**
 WUI Data List extends both Wui.Data and Wui.Template and allows for additional events such as selecting
 and deselecting items. When data is loaded, the template engine will automatically re-render the data set.

 A data list is the basis for Wui.Grid, but can provide powerful tools for creating advanced 
 interface elements. Creating advanced elements can be done using the modifyItem method which allows
 the programmer to add various additional functionality to each template created.  Depending on the level
 of interactivity, CreateItem (the method that adds the listeners to select/deselect the item) must also
 be modified so that interactions with an item don't inadvertently select/deselect the item itself.

 Items in a datalist can be selected programmatically using the selectBy method. Items will be reselected
 after a refresh if the 'identity' config is set to the name of the dataItem that is the identity field.
 
@event        wuiselect         A data template is selected ( DataList, el, record )
@event        wuichange         The selected item info along with the previous selected record if it exists ( DataList, el, record, selection array )
@event        wuideselect       A selected item is clicked again, and thus deselected ( DataList, el, record )
@event        wuidblclick       When an item is double clicked ( DataList, el, record )
 
 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
 @creation   2013-10-25
 @version    1.1.2
*/
Wui.DataList = function(args){
    $.extend(this, {
        /** @eventhook Called after the data's DOM elements are made */
        afterMake:      function(){},
        
        /** Determines whether templates are made immediately when the DataList is rendered */
        autoLoad:       true,
        
        /** Maximum number of data elements to display, even if data set is larger. */
        displayMax:     -1,

        /** DOM element where all of the data templates will be appended. */
        el:             $('<div>'),
        
        /** Method that will run immediately when the object is constructed. */
        init:           function(){},
        
        /** Whether multiple rows/records can be selected at once. */
        multiSelect:    false,
        
        /** An array of the currently selected records */
        selected:       []
    }, args);
    this.init();
};
Wui.DataList.prototype = $.extend(new Wui.O(), new Wui.Template(), new Wui.Data(), {
    /** Overrides the Wui.Data method that serves as an event hook. Calls the DataList's make() method. */
    dataChanged:function(){ this.make(); },
    
    /** Clears the selection on the data list */
    clearSelect:function(){
                    var me = this,
                        dn = (me.name) ? '.' + me.name : '',
                        el = me.elAlias || me.el;

                    el.find('.wui-selected').removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuichange' + dn), [me, me.el, {}, me.selected])
                        .trigger($.Event('wuichange'), [me, me.el, {}, me.selected]);
                },
    
    /**
    @param    {object}    itm            Object containing an el (jQuery object), and a rec (data object)
    @param    {boolean}    silent        A true value prevents the 'wuiselect' event from firing
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is selected @private
    */
    itemSelect: function(itm, silent){
                    var me = this, 
                        dn = (me.name) ? '.' + me.name : ''
                        old = [];
                    
                    if(me.selected.length > 0 && !me.multiSelect && !silent){
                        var old = $.extend(true,[],me.selected);
                        me.el.trigger($.Event('wuideselect'),[me, old[0].el, old[0].rec, old]);
                    }

                    me.el.find('.wui-selected').removeClass('wui-selected').removeAttr('tabindex');
                    itm.el.addClass('wui-selected').attr('tabindex',1).focus();
                    me.selected = [itm];


                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'+ dn), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },

    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is deselected @private
    */        
    itemDeselect:function(itm){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

                    if(me.selected.length > 0)

                    itm.el.removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuideselect' + dn),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange' + dn), [me, itm.el, itm.rec, me.selected])
                        .trigger($.Event('wuideselect'),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    return itm;
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in with listeners added
    Adds the click listeners to the item and calls modifyItem to add greater flexibility
    */
    createItem: function(itm){
                    var me = this,
                        clicks = 0,
                        timer = null, 
                        dn = (me.name) ? '.' + me.name : '';
                    
                    itm.el.on("click", function(e){
                        var retVal = null;
                        var row = this;
                        
                        clicks++;  //count clicks
                        if(clicks === 1) {
                            timer = setTimeout(function() {
                                retVal = singleClick(e,row);
                                clicks = 0;             //after action performed, reset counter
                            }, 350);
                        } else {
                            clearTimeout(timer);    //prevent single-click action
                            retVal = doubleClick(e,row);
                            clicks = 0;             //after action performed, reset counter
                        }
                        return retVal;
                    })
                    .on("dblclick", function(e){
                        e.preventDefault();  //cancel system double-click event
                    });

                    function singleClick(e,row){
                        // Determine the # of selected items before the change
                        if(!me.multiSelect || !(e.metaKey || e.ctrlKey || e.shiftKey)){
                            if(me.selected.length > 0 && me.selected[0] === itm)    me.itemDeselect(itm);   //deselect item
                            else                                                    me.itemSelect(itm);     //change selection
                        }else{
                            var alreadySelected = $(row).hasClass('wui-selected');
                            
                            if(!e.shiftKey){
                                // WHEN THE CTRL KEY IS HELD SELECT/DESELECT INDIVIDUAL ITEMS
                                $(row).toggleClass('wui-selected',!alreadySelected);

                                if(alreadySelected) $.each(me.selected || [], function(idx,sel){ if(sel == itm) me.selected.splice(idx,1); });
                                else                me.selected.push(itm);
                            }else{
                                // WHEN THE SHIFT KEY IS HELD - SELECT ALL ITEMS BETWEEN TWO POINTS
                                var firstSelected = me.selectByEl(me.el.find('tr.wui-selected:first')),
                                    currentSelected = me.getItemByEl($(row)),
                                    dir = (firstSelected.rec.wuiIndex < currentSelected.rec.wuiIndex) ? 1 : -1,
                                    start = (dir > 0) ? firstSelected : currentSelected,
                                    end = (dir > 0) ? currentSelected : firstSelected,
                                    currSelection = [];

                                me.selected = currSelection = me.items.slice(start.rec.wuiIndex,end.rec.wuiIndex + 1);
                                $('wui-selected').removeClass('wui-selected');
                                currSelection.forEach(function(rec){
                                    rec.el.addClass('wui-selected');
                                });
                            }

                            me.el.trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                                .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                        }
                    }

                    function doubleClick(e){
                        me.itemSelect(itm,true);
                        me.el
                            .trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuidblclick'+ dn),[me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuidblclick'),[me, itm.el, itm.rec]);
                             
                        return false; // stops propagation & prevents default
                    }

                    return me.modifyItem(itm);
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The DOM element
    Performs any desired modification on an object - this method is meant to be overridden.
    */
    modifyItem: function(itm){ return itm.el; },
    
    /** Creates the templates based on current data. Then appends them to the el with listeners */
    make:       function(){
                    var me = this,
                        holdingData = me.data || [],
                        holder = $('<div>'), 
                        dn = (me.name) ? '.' + me.name : '';
                    
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
                    me.el.trigger($.Event('refresh'+ dn),[me,me.data])
                        .trigger($.Event('refresh'),[me,me.data]);
                    
                    // Reset selected items if any
                    me.resetSelect();
                },
                
    /** Runs when the object has been appended to its target. Then appends the data templates with listeners. */
    onRender:   function(){
                    var me = this;

                    if(me.onRendered !== true){
                        // Loads data per the method appropriate for the object
                        if(me.autoLoad){
                            if(this.url === null)   me.make();
                            else                    me.loadData();
                        }

                        // Adds a document listener
                        $(document).on('keyup',function(evnt){
                            if(me.selected && me.selected[0] && (document.activeElement == me.selected[0].el[0])){
                                // Simulate a double click if enter or spacebar are pressed on a currently selected/focused item
                                if(evnt.keyCode == 13 || evnt.keyCode == 32){ me.selected[0].el.click(); me.selected[0].el.click(); }
                                if(evnt.keyCode == 38)  me.selectAjacent(-1);  // 38 = up
                                if(evnt.keyCode == 40)  me.selectAjacent(1);   // 40 = down
                            }
                        });

                        me.onRendered = true;
                    }
                },

    /**
    @param    {number} num Direction to go to select an ajacent value [1,-1]
    Selects the list item immediately before or after the currently selected item.
    */
    selectAjacent:  function(num){
                        var me = this, selectAjc = me.selected[0].el[(num > 0) ? 'next' : 'prev']();
                        return me.selectByEl(selectAjc);
                    },

    /**
    @param    {jQuery Object} el An object that will match an element in the DataList.
    Selects the matching DataList item.
    */
    selectByEl: function(el){
                    var me = this, retVal = undefined;

                    me.itemSelect(retVal = me.getItemByEl(el));
                    me.scrollToCurrent();
                    
                    return retVal;
                },

    /**
    @param    {jQuery Object} el An object that will match an element in the DataList.
    @return   The item in the datalist corresponding to that DOM element.
    Returns the matching DataList item.
    */
    getItemByEl:function(el){
                    var me = this, retVal = undefined;

                    me.each(function(itm){ if(itm.el[0] == el[0]) retVal = itm; });
                    
                    return retVal;
                },
                
    /** Refreshes the DataList to match the data or reload it from the server */
    refresh:    function(){ this.onRender(); },

    /** 
    @param    {Array} arry  An array containing objects with a 'rec' member.
    @return   A new array with just the 'rec' objects which have been copied one level deep
    Performs a copy on an array of dataList items and gets only the records */
    copyArryRecs:function(arry){
                    var newArry = [];

                    arry.forEach(function(itm){
                        var newRec = {};

                        $.each(itm.rec,function(key,val){ newRec[key] = val; });

                        newArry.push(newRec);
                    });

                    return newArry;
                },
    
    /**  Reselects previously selected rows after a data change or sort. Scrolls to the first currently selected row. */
    resetSelect:function(){
                    var me = this,
                        selList = me.copyArryRecs(me.selected);

                    if(selList.length){
                        // Clear current selection list after making a copy of previously selected items
                        me.selected = [];

                        selList.forEach(function(rec){
                            Wui.O.prototype.each.call(me,function(itm){
                                var sameRec = (me.identity) 
                                        ? itm.rec[me.identity] === rec[me.identity] 
                                        : JSON.stringify(itm.rec) === JSON.stringify(rec);
                                
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
                    }
                },
                    
    /** Scrolls the list to the currently selected item. */            
    scrollToCurrent:function(){
                        var me = this,
                            el = me.elAlias || me.el,
                            firstSelect = el.find('.wui-selected:first'),
                            ofstP = firstSelect.offsetParent(),
                            offset = (function(){ 
                                var r = 0; 
                                firstSelect.prevAll().each(function(){ r += $(this).outerHeight() - 0.55; }); 
                                return  r; 
                            })();
                        ofstP.animate({scrollTop:offset },100);
                    },
                    
    /**
    @param    {string} key The data item to look for
    @param    {string|number} val The value to look for
    @return An object containing the dataList, row, and record, or undefined if there was no matching row.
    Selects an item according to the key value pair to be found in a record. */
    selectBy:   function(key,val){
                    var me = this, retVal = undefined;
                    me.each(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val)
                            return retVal = me.itemSelect(itm);
                    });
                    me.scrollToCurrent();
                    return retVal;
                }
});



/**
 @event        wuibtnclick        Fires when the button is pressed and not disabled. Avoided using the standard 'click' event for this reason ( Button Object )
 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)

 A Wui.Button creates a uniformly styled HTML button with additional functionality of being 
 able to be disabled/enabled.  The action of the button can be defined by using the 'click'
 method, or by naming the button and implementing a listener on the 'wuibtnclick' event.
*/
Wui.Button = function(args){
    $.extend(this, {
        /** The button element. Can be overridden according to the needs of the design. */
        el:         $('<button>').attr({unselectable:'on'}),
        
        /** Whether the button is disabled. */
        disabled:   false,
        
        /** Tool tip text for the button. */
        toolTip:    null,
        
        /** Tab index will make the button focusable by the browser. Changing this value will result in it receiving a higher precedence than what it would receive in that natural flow of the page. */
        tabIndex:   0,
        
        /** Text to appear on the button. Can be HTML if a more complex button design is desired. */
        text:       'Button'
    }, args);
    
    this.init();
};
Wui.Button.prototype = $.extend(new Wui.O(),{
    /** @eventhook Event hook for the button click. */
    click:      function(){},
    
    /** Method that will run immediately when the object is constructed. Adds the click listener with functionality to disable the button.*/
    init:       function(){ 
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    
                    me.el
                    .addClass('wui-btn')
                    .click(btnClick)
                    .keypress(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                        return false;
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    if(me.disabled)    me.disable();
                    
                    function btnClick(e){
                        if(!me.disabled){
                            Array.prototype.push.call(arguments,me);
                            me.click.apply(me,arguments);
                            me.el.trigger($.Event('wuibtnclick' + dn),[me])
                                .trigger($.Event('wuibtnclick'),[me]);
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
    enable:     function(){
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

The WUI Pane is a box that contains a top bar (header), a bottom bar (footer), and a content area.
The Pane is surrounded by a border that can be manipulated via the borderStyle config.

The header and footer are Wui Objects with their own array of items and methods to add and remove
items. When items are added to the footer it will be added to the pane, and when items are removed
to the point ito becomes empty, it will be removed and the content area will be resized accordingly.
The header will also be added/removed from the pane as objects are added/removed, with the exception
that if a title is set on the pane (any value besides null), then the header will remain until the 
title is cleared.

The content area of the pane is not a Wui object, but is the area where the items of the pane are
added to and removed from. The content area can be refreshed using the layout() method.

The pane can be disabled and enabled, as well as masked and unmaksed (see the methods below).

The title of the pane can be set as a config, as well as modified via the setTitle method.

A Wui.Pane is the base object for the Wui.Window and the above applies to windows as well.
*/
Wui.Pane = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:     true,
        
        /** An array of items that will be added to the header */
        tbar:       [],
        
        /** Whether or not the pane is disabled on load */
        disabled:   false,

        /** When set to true the pane will size itself to the height of its content on layout */
        fitToContent:false,
        
        /** Alignment of the heading title (left,center,right) */
        titleAlign: 'left',
                
        /** Default height */
        height:     '100%',
    
        /** HTML to show in the mask when the pane is disabled */
        maskHTML:   'Empty',

        /** The maximum height the pane will expand to when fitToContent is set to true. If
        fitToContent is false, this property does nothing.*/
        maxHeight:  null,

        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:      null
    },args); 
    this.init();
};
Wui.Pane.prototype = $.extend(new Wui.O(),{
    /** 
    Adds a mask over the content area of the pane 
    @param  {object}    target  A target to apply the mask, otherwise the pane's container will be masked.
    @return The mask object
    */
    addMask:        function(target){
                        target = (target) ? target : this.container.parent();
                        if(target.children('wui-mask').length === 0)
                            return this.mask = $('<div>').addClass('wui-mask').html(this.maskHTML).appendTo(target);
                        else
                            return null;
                    },

    /** Runs after a pane is rendered. Sets up layout listeners and sets focus on the bottom-right-most button if any */
    afterRender:    function(){
                        var me = this;
                        me.layoutInterval = false;

                        document.addEventListener("animationstart", doLayout, false);       // standard + firefox
                        document.addEventListener("MSAnimationStart", doLayout, false);     // IE
                        document.addEventListener("webkitAnimationStart", doLayout, false); // Chrome + Safari
                        
                        // Prevent the layout from occuring more than once ever 100ms
                        function doLayout(){
                            if(me.layoutInterval === false){
                                if(!me.parent && !(me instanceof Wui.Window)) me.layout();
                                me.layoutInterval = true;
                                setTimeout(function(){ me.layoutInterval = false; },100);
                            }  
                        }

                        // If the pane is disabled then it disables it
                        if(me.disabled) me.disable();

                        // Do the layout for the header and footer
                        me.configBar('header');
                        me.configBar('footer');

                        Wui.O.prototype.afterRender.call(this);
                    },

    /** Configuration for the pane border - follows the jQuery CSS convention */
    borderStyle:    { borderWidth: 6 },

    /**
    @param {barName} bar     Either the header or footer bar on the pane ['header','footer']
    Shows/hides the header or footer depending on whether that item has child items.
     */
    configBar:      function(barName){
                        var me = this, bar = me[barName], isHeader = (barName == 'header'),
                            cssProp = (isHeader) ? 'Top' : 'Bottom',
                            hasItems = bar.items.length > 0 || (isHeader && me.title !== null),
                            pad = hasItems ? bar.el.css('height') : 0,
                            border = (hasItems) ? 0 : undefined;

                        // Still enforce borders for tabs
                        if(me.parent && me.parent instanceof Wui.Tabs && ((isHeader && me.tabsHideHeader) || (me.tabsBottom && !hasItems))) border = 6;
                        
                        me.sureEl.css('border' +cssProp+ 'Width', border).children('.wui-pane-wrap').css('padding' +cssProp, pad);
                        if(hasItems){
                            bar.place();
                            bar.callRender();
                            if(isHeader){
                                me.setTitle(me.title);
                                this.setTitleAlign();
                            }else{
                                // Set focus to the bottom right most button in the pane
                                if(!me.disabled)
                                    bar.items[bar.items.length - 1].el.focus();
                            }
                        }else{
                            bar.el.detach();
                        }

                        // Set  border if applicable
                        me.updateBorder();
                    },

    /** Disables the pane by masking it and disabling all buttons */
    disable:        function(){
                        this.addMask();
                        this.footer.each(function(itm){ if(itm.disable) itm.disable(); });
                        this.header.each(function(itm){ if(itm.disable) itm.disable(); });
                        return this.disabled = true;
                    },
    
    /** Enables the pane by removing the mask and enabling all buttons */
    enable:         function(){
                        var me = this;
                        me.removeMask();
                        me.footer.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.header.each(function(itm){ if(itm.enable) itm.enable(); });
                        return me.disabled = false;
                    },

    /** Method that will run immediately when the object is constructed. */
    init:           function(wuiPane){
                        var me = wuiPane || this;
                        me.el       = $('<div>').addClass('wui-pane').append(
                                        $('<div>').addClass('wui-pane-wrap').append(
                                            me.container = $('<div>').addClass('wui-pane-content')
                                        )
                                    );
                        me.sureEl   = me.el;

                        // Set  border if applicable
                        if(me.border) me.el.css(me.borderStyle);

                        // Set up header and footer
                        me.header   = new Wui.O({
                                        el:         $('<div><span></span><div class="wui-h-cntnt"></div></div>'), 
                                        cls:        'wui-pane-header wui-pane-bar',
                                        items:      me.tbar,
                                        parent:     me,
                                        appendTo:   me.el,
                                        splice:     function(){ Wui.O.prototype.splice.apply(this,arguments); me.configBar('header'); },
                                        push:       function(){ Wui.O.prototype.push.apply(this,arguments); me.configBar('header'); }
                                    });
                        me.header.elAlias = me.header.el.children('.wui-h-cntnt');
                        me.header.title = me.header.el.children('span:first');
                                       
                        me.footer   = new Wui.O({
                                        el:         $('<div>'),
                                        cls:        'wui-pane-footer wui-pane-bar',
                                        items:      me.bbar,
                                        parent:     me,
                                        appendTo:   me.el,
                                        splice:     function(){ Wui.O.prototype.splice.apply(this,arguments); me.configBar('footer'); },
                                        push:       function(){ Wui.O.prototype.push.apply(this,arguments); me.configBar('footer'); }
                                    });

                        // Set up the content area of the pane
                        me.elAlias  = me.container;
                    },

    /** Overrides the Wui.O layout to allow for the optional sizing to fit content */
    layout:     function(){
                    Wui.O.prototype.layout.apply(this,arguments);
                    
                    if(this.fitToContent === true){
                        var me = this,
                            toolBarsH = me.header.el.outerHeight() + me.footer.el.outerHeight(),
                            maxHeight = $.isNumeric(me.maxHeight) ? me.maxHeight : 0,
                            totalHeight = 0;
                        
                        me.container.children().each(function(){
                            totalHeight += $(this).outerHeight();
                        });

                        totalHeight = (maxHeight > 0 && totalHeight + toolBarsH > maxHeight) ? maxHeight : totalHeight;

                        me.height = totalHeight + toolBarsH;
                        Wui.O.prototype.layout.apply(me,arguments);
                    }
                },

    /** Removes the mask over the content area of the pane */
    removeMask:     function(){
                        var me = this, mask = me.mask || me.el.find('.wui-mask');
                        
                        if(mask){
                            mask.fadeOut(250,function(){ 
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
    
    /** Changes the title on the pane. */
    setTitle:       function(t){ 
                        this.title = t;
                        t = (t && typeof t === 'string') ? t : ''
                        this.header.title.html(t);
                        return this.title;
                    },
    
    /** Changes the title on the pane. */
    setTitleAlign:  function(t){ 
                        var me = this;
                        
                        me.titleAlign = t || me.titleAlign;
                        me.header.title.removeClass('right,left,center').addClass('wui-h-title ' + me.titleAlign);
                        
                        var itemsAlignment = me.titleAlign === 'right' ? 'left' : 'right'; 
                        me.header.elAlias.css('text-align',itemsAlignment);
                    },

    /** Updates the border on a pane. If a parameter is passed in, it will get updated to what is passed.
    Otherwise it merely refreshes what is already set in the config of the pane.
    @param      {object}    [newStyle]  An object containing border style configs. See borderStyle.
    @returns    true
    */
    updateBorder:   function(newStyle){
                        var me = this;

                        if(newStyle){
                            me.el.css(me.borderStyle = newStyle);
                        }else if(me.border && me.hasOwnProperty('borderStyle')){
                            me.el.css(me.borderStyle);
                        }
                    }
});


/**
@event      open    When the window is opened (window)
@event      resize  When the window is resized (width, height)
@event      close   When the window is closed (window)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

A WUI Window is based on a Wui.Pane and inherits much of its functionality from the pane,
especially with regard to borders, the header, footer, content area, enable/disable functionality
and masking.

Windows can additionally be resizable, draggable, positionable, and modal.

A window will appear in the forefront of the page, and does not need to be placed like other WUI
objects do because it is placed directly at the end of the body on init.

*/
Wui.Window = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:     false,
        
        /** Determines whether objects behind the window are accessible */
        isModal:    false,
        
        /** 
        @param {WUI Window} win    The window being closed.
        @eventhook Called just before the window closes. If this function returns false, the window will not be closed. 
        */
        onWinClose: function(){},
        
        /** 
        @param {WUI Window} win    The window being opened.
        @eventhook Called when the window opens. 
        */
        onWinOpen:  function(){},
        
        /** An array of items that will be added to the header */
        tbar:       [], 
        
        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:      'Window',
        
        /** Change what comes by default in the pane */
        maskHTML:   'Loading <span class="wui-spinner"></span>',

        /** Set a minimum height that the window can be resized to. If this property
        is not, it will default to the declared height of the window, or zero if the 
        declared height is a percentage. */
        //minHeight: undefined,

        /** Set a minimum width that the window can be resized to. If this property
        is not, it will default to the declared width of the window, or zero if the 
        declared width is a percentage. */
        //minWidth: undefined,

        /** Whether or not the user can resize the window */
        resizable:  true,

        /** Whether or not the user can reposition the window */
        draggable:  true,

        /** The left position of the window when it is resized using Wui.Window.resize() or when it firtst appears. */
        windowLeft: null,

        /** The top position of the window when it is resized using Wui.Window.resize() or when it firtst appears. */
        windowTop:  null
    },args);  
    this.init(); 
};
Wui.Window.prototype = $.extend(new Wui.Pane(),{
    /** Closes the window unless onWinClose() event hook returns false. */
    close:      function(){ 
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    if(me.onWinClose(me) !== false){
                        me.windowEl.trigger($.Event('close' + dn),[me])
                            .trigger($.Event('close'),[me]);
                        me.remove();
                    }
                },
    
    /** Disables the window by masking it and disabling all buttons besides the close window button. */
    disable:    function(){
                    Wui.Pane.prototype.disable.call(this);
                    // Enable the close button for the window - esp. important if its modal
                    if(this.closeBtn)
                        this.closeBtn.enable();
                },
                
    /** Method that will run immediately when the object is constructed. */
    init:       function(){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    me.appendTo = $('body');
                    
                    // Make it a modal window & add everything to the DOM
                    if(me.isModal){
                        me.modalEl = $('<div>').addClass('wui-overlay');
                        $('body').append( 
                            me.appendTo = me.modalEl.css('z-index',Wui.maxZ()).on('mousewheel',noScroll)
                        );
                    }
                    
                    // Add close buttons where appropriate
                    me.tbar.push(me.closeBtn = new Wui.Button({ click:function(){ me.close(); }, text:'X' }));
                    if(me.bbar.length === 0) me.bbar = [new Wui.Button({ click:function(){ me.close(); }, text:'Close' })];
                    
                    // Calls the parent init function
                    Wui.Pane.prototype.init(me);
                    
                    // Add window specific properties
                    me.windowEl = me.el
                    .addClass('wui-window')
                    .css('z-index',Wui.maxZ())
                    .click(bringToFront)
                    .on('mousewheel',noScroll);
                    
                    // Add draggable
                    if(me.draggable === true)
                        me.windowEl.draggable({handle: me.header.el, start:bringToFront});

                    // Add resizable option if the window is resizable
                    if(me.resizable === true)
                        me.windowEl.resizable({
                            minWidth:   me.minWidth || me.width,
                            minHeight:  me.minHeight || me.height,
                            resize:     function(){ me.fireResize(); }
                        });

                    // Put the window on the body
                    me.place();
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    me.onWinOpen(me);
                    me.windowEl.trigger($.Event('open' + dn),[me])
                        .trigger($.Event('open'),[me]);
                    me.resize();

                    function noScroll(evnt){ evnt.stopPropagation(); }

                    function bringToFront(e){
                        var maxZ = Wui.maxZ();
                        if(parseInt((me.el.css('z-index')) || 1) <= maxZ){
                            me.el.css('z-index', maxZ);
                        }
                    }
                },

    /** Fires the resize event and runs layout on the windows children */
    fireResize: function(){
        var me = this, dn = (me.name) ? '.' + me.name : '';
        me.container.trigger($.Event('resize' + dn),[me.container.width(), me.container.height()])
            .trigger($.Event('resize'),[me.container.width(), me.container.height()]);
        return me.layoutKids(); 
    },

    /** 
    @param {[number]} resizeWidth Number of pixels for the window width
    @param {[number]} resizeHeight Number of pixels for the window height
    
    If width and height aren't specified, the window is sized vertically to try to fit its contents 
    without getting larger than the browser viewport.
    */
    resize:     function(resizeWidth, resizeHeight){
                    var me = this;

                    if(Wui.isPercent(resizeWidth))  resizeWidth = Wui.percentToPixels(me.windowEl, resizeWidth, 'width');
                    if(Wui.isPercent(resizeHeight)) resizeHeight = Wui.percentToPixels(me.windowEl, resizeHeight, 'height');

                    var totalHeight = me.container[0].scrollHeight,
                        containerHeight = me.container.height(),
                        headHeight = (me.header && $.isNumeric(me.header.el.outerHeight())) ? me.header.el.outerHeight() : 0,
                        footHeight = (me.footer && $.isNumeric(me.footer.el.outerHeight())) ? me.footer.el.outerHeight() : 0,
                        headersHeight = headHeight + footHeight,
                        useHeight = (arguments.length) ? resizeHeight : (totalHeight + headersHeight >= $.viewportH()) ? ($.viewportH() - 10) : 
                                        (containerHeight <= totalHeight && !me.hasOwnProperty('height')) ? totalHeight + headersHeight : 
                                            Wui.isPercent(me.height) ? Wui.percentToPixels(me.windowEl, me.height, 'height') : me.height;

                    // Size and center the window according to arguments passed and sizing relative to the viewport.
                    me.windowEl.css({ height: useHeight, width: (arguments.length) ? resizeWidth : undefined, });
                    var posLeft =   (me.windowLeft) 
                                        ? ($.isNumeric(me.windowLeft) ? me.windowLeft : Wui.percentToPixels($('html'), me.windowLeft, 'width')) 
                                        : Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)),
                        posTop =    (me.windowTop) 
                                        ? ($.isNumeric(me.windowTop) ? me.windowTop : Wui.percentToPixels($('html'), me.windowTop, 'height')) 
                                        : Math.floor(($.viewportH() / 2) - (useHeight / 2));
                    me.windowEl.css({ top:posTop, left:posLeft });
                    
                    me.fireResize();
                    return {width:me.windowEl.outerWidth(), height:me.windowEl.outerHeight()};
                },

    /** Overrides Wui.O cssByParam and removes styles on modal windows */
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    if(this.isModal)    this.modalEl.css({width:'', height:''});    // Remove CSS that accidentally gets applied to the modal cover
                    if(this.windowEl)   this.resize();                              // Resize the window and center
                },

    /** Set the height of the window */
    height:     200,
    
    /** Set the width of the window */
    width:      600
});


/** Shows a message in a modal window
@param {string}         msg         A message for the user
@param {[string]}       msgTitle    Title for the window. Default is 'Message'
@param {[function]}     callback    Function to perform when the message window closes - returning false will prevent the window from closing.
@param {[string]}       content     One or more additional Wui objects to place on the window
@return The Wui.Window object of the message window.
@author     Stephen Nielsen
*/
Wui.msg = function(msg, msgTitle, callback, content){
    var cntnt = [new Wui.O({el: $('<div>').addClass('wui-msg').html(msg) })];
    
    if(typeof content !== 'undefined'){
        if(typeof content.push == 'function')   cntnt.push.apply(cntnt,content);
        else                                    cntnt.push(content);
    }

    var msgWin  = new Wui.Window({
            title:      msgTitle || 'Message', 
            isModal:    true,
            items:      cntnt, 
            width:      350,
            onWinClose: callback || function(){}
        });

    return msgWin;
};

/** Shows an error message
@param {string}         errMsg      Message explaining the error
@param {[string]}       msgTitle    Title for the window. Default is 'Error'
@param {[array]}        buttons     Array containing Wui.Button(s) to give additional functionality.
@param {[function]}     callback    Function to perform when the error window closes - returning false will prevent the window from closing.
@return The Wui.Window object of the error message window.
@author     Stephen Nielsen
*/
Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
    var err = Wui.msg(errMsg,msgTitle,callback);
    if($.isArray(buttons))
        err.footer.push.apply(err.footer,buttons);
    err.container.find('.wui-msg').addClass('wui-err');
    err.resize();
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
    cw.resize();
    return cw;
};

}(jQuery,this));