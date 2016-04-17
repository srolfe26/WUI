/*!
 * verge 1.9.1+201402130803
 * https://github.com/ryanve/verge
 * MIT License 2013 Ryan Van Etten
 */
!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():a[b]=c()}(this,"verge",function(){function a(){return{width:k(),height:l()}}function b(a,b){var c={};return b=+b||0,c.width=(c.right=a.right+b)-(c.left=a.left-b),c.height=(c.bottom=a.bottom+b)-(c.top=a.top-b),c}function c(a,c){return a=a&&!a.nodeType?a[0]:a,a&&1===a.nodeType?b(a.getBoundingClientRect(),c):!1}function d(b){b=null==b?a():1===b.nodeType?c(b):b;var d=b.height,e=b.width;return d="function"==typeof d?d.call(b):d,e="function"==typeof e?e.call(b):e,e/d}var e={},f="undefined"!=typeof window&&window,g="undefined"!=typeof document&&document,h=g&&g.documentElement,i=f.matchMedia||f.msMatchMedia,j=i?function(a){return!!i.call(f,a).matches}:function(){return!1},k=e.viewportW=function(){var a=h.clientWidth,b=f.innerWidth;return b>a?b:a},l=e.viewportH=function(){var a=h.clientHeight,b=f.innerHeight;return b>a?b:a};return e.mq=j,e.matchMedia=i?function(){return i.apply(f,arguments)}:function(){return{}},e.viewport=a,e.scrollX=function(){return f.pageXOffset||h.scrollLeft},e.scrollY=function(){return f.pageYOffset||h.scrollTop},e.rectangle=c,e.aspect=d,e.inX=function(a,b){var d=c(a,b);return!!d&&d.right>=0&&d.left<=k()},e.inY=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.top<=l()},e.inViewport=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.right>=0&&d.top<=l()&&d.left<=k()},e});
jQuery.extend(verge);



// Aray.ForEach polyfill for IE8
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

// Array.slice polyfill for IE8
/**
 * Shim for "fixing" IE's lack of support (IE < 9) for applying slice
 * on host objects like NamedNodeMap, NodeList, and HTMLCollection
 * (technically, since host objects have been implementation-dependent,
 * at least before ES6, IE hasn't needed to work this way).
 * Also works on strings, fixes IE < 9 to allow an explicit undefined
 * for the 2nd argument (as in Firefox), and prevents errors when
 * called on other DOM objects.
 */
(function () {
  'use strict';
  var _slice = Array.prototype.slice;

  try {
    // Can't be used with DOM elements in IE < 9
    _slice.call(document.documentElement);
  } catch (e) { // Fails in IE < 9
    // This will work for genuine arrays, array-like objects, 
    // NamedNodeMap (attributes, entities, notations),
    // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
    // and will not fail on other DOM objects (as do DOM elements in IE < 9)
    Array.prototype.slice = function(begin, end) {
      // IE < 9 gets unhappy with an undefined end argument
      end = (typeof end !== 'undefined') ? end : this.length;

      // For native Array objects, we use the native slice function
      if (Object.prototype.toString.call(this) === '[object Array]'){
        return _slice.call(this, begin, end); 
      }

      // For array like object we handle it ourselves.
      var i, cloned = [],
        size, len = this.length;

      // Handle negative value for "begin"
      var start = begin || 0;
      start = (start >= 0) ? start : Math.max(0, len + start);

      // Handle negative value for "end"
      var upTo = (typeof end == 'number') ? Math.min(end, len) : len;
      if (end < 0) {
        upTo = len + end;
      }

      // Actual expected size of the slice
      size = upTo - start;

      if (size > 0) {
        cloned = new Array(size);
        if (this.charAt) {
          for (i = 0; i < size; i++) {
            cloned[i] = this.charAt(start + i);
          }
        } else {
          for (i = 0; i < size; i++) {
            cloned[i] = this[start + i];
          }
        }
      }

      return cloned;
    };
  }
}());

/*! Wui 1.2
 * Copyright (c) 2013-2016 Stephen Rolfe Nielsen (rolfe.nielsen@gmail.com)
 *
 * @license MIT
 * http://www.wui-js.com/wui-1-2/license.html
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
$.ajaxSetup({ cache: false });


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
    var bodyElems =     $('body *'),
        useElems =      bodyElems.length < 2500 ? bodyElems : $('body > *, [style*="z-index"]'),
        topZ =          Math.max.apply(null, 
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
    var ofst    =   parent[0].getBoundingClientRect(),
        top     =   ofst.top,
        fxdOrAbs =  (function(){
                        var retVal = 'absolute';

                        parent.add(parent.parents()).each(function(){
                            if($(this).css('position') === 'fixed')
                                retVal = 'fixed';
                        });

                        return retVal;
                    })(),
        cWidth  =   child.outerWidth(),
        cHeight =   child.outerHeight(),
        plBelow =   (function(){
                        var retVal = top + parent.outerHeight() + cHeight < $.viewportH();

                        if(!retVal && (top - cHeight < 0)){
                            cHeight = top -5;
                            retVal = top + parent.outerHeight() + cHeight < $.viewportH();
                        }else{
                            cHeight = '';
                        }

                        return retVal;
                    })(),
        plRight =   (ofst.left + parent.outerWidth() - cWidth > 0);

    // If the parent is not a fixed-position element, then add the scrollTop in case the page is scrolled down.
    if(fxdOrAbs === 'fixed')
        top += $(window).scrollTop();

    child.css({
        left:       (plRight) ? ofst.left + parent.outerWidth() - cWidth : ofst.left,
        top:        (plBelow) ? top + parent.outerHeight() : top - ($.isNumeric(cHeight) ? cHeight : child.outerHeight()),
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

Wui.cssCheck = function(prop) {
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
        default:
            return prefixes[n-2] + prop;
    }
};


/**
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@param {array}      collection           A collection of items that will be fit within a container.
@param {string}     [dim]                The dimension to perform the fit on, 'height','width', height is default.
This function will size items relative to each other via a 'fit' value, as well as percentages and fixed values.
*/
Wui.fit = function(collection,dim){
    // Ensure the collection is an array of Wui Objects
    if(collection instanceof Array && collection.length > 0){
        var fitCt       = 0,
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

}(jQuery,this));



(function($,Wui) {


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
                    try {
                      $(target)[action](obj.el);
                    }
                    catch(e) {
                        try {
                          $(target)[action](obj);
                        }
                        catch(err) {}
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
    append:     function() {
                    var me = this, el = me.elAlias || me.el;
                    $.each(arguments,function(i,itm) {
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
    
    argsByParam:function(){
                    var me = this;

                    me.applyAttr('id',me.id);
                    me.applyAttr('name',me.name);
                    me.applyAttr('tabindex',me.tabIndex);
                    me.applyAttr('lang',me.lang);
                    me.applyAttr('title',me.titleAttr);
                },

    /**
    @param {object} item    A WUI Object, or if undefined, the object that this method is a member of.
    
    @return    The object's el if it has one, or just the object
    
    Adds HTML properties like CSS class, attributes, and sets height and width as either absolute values
    or percentages of their parent.
    */
    cssByParam: function(m) { 
                    var a;
                    m = m || this;
                    
                    if(m.el && m.el.addClass){
                        if(m.argsByParam)
                            m.argsByParam();
                        
                        // Add attributes if defined
                        try{ if(m.attr && typeof m.attr == 'object') m.el.attr(m.attr); }catch(e){ }
                        
                        // calculate dimensions
                        if($.isNumeric(m.height) && m.height >= 0)      m.el.css({height: m.height});
                        if($.isNumeric(m.width) && m.width >= 0)        m.el.css({width: m.width});

                        // calculate percentage based dimensions
                        if(Wui.isPercent(m.width)) {
                            a = Wui.percentToPixels(m.el,m.width,'width');
                            if (a !== 0) {
                                m.el.css({width: a});
                            }
                        }
                        if(Wui.isPercent(m.height)) {
                            a = Wui.percentToPixels(m.el,m.height,'height');
                            if (a !== 0) {
                                m.el.css({height: a});
                            }
                        }
                        
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
                    var me = this, 
                        myPosition;
                        
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
                                success:    function(){ me.success.apply(me,arguments); },
                                error:      function(){ me.failure.apply(me,arguments); },
                            },me.ajaxConfig);
                        
                        // Work in additional parameters that will change or stop the request
                        var paramsOkay = me.setParams.apply(me,arguments),
                            beforeLoad = me.beforeLoad.apply(me,arguments);

                        // Perform request
                        if(paramsOkay !== false && beforeLoad !== false) {
                            // abort the last request in case it takes longer to come back than the one we're going to call
                            if(me.lastRequest && me.lastRequest.readyState != 4) {
                                me.lastRequest.abort();
                            }
                            
                            me.lastRequest = $.ajax(me.url,config);
                            
                            return me.lastRequest;
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

        focusOnSelect:  true,
        
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
                        dn = (me.name) ? '.' + me.name : '',
                        old = [];
                    
                    if(me.selected.length > 0 && !me.multiSelect && !silent){
                        old = $.extend(true,[],me.selected);
                        me.el.trigger($.Event('wuideselect'),[me, old[0].el, old[0].rec, old]);
                    }

                    me.el.find('.wui-selected').removeClass('wui-selected').removeAttr('tabindex');
                    itm.el.addClass('wui-selected').attr('tabindex',1);
                    
                    if(me.focusOnSelect)
                        itm.el.focus();
                    
                    me.selected = [itm];

                    if(!silent){
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
                        var txtSelection, alreadySelected;

                        // Determine the # of selected items before the change
                        if(me.multiSelect && (e.metaKey || e.ctrlKey || e.shiftKey)){
                            alreadySelected = $(row).hasClass('wui-selected');
                            
                            if(!e.shiftKey){
                                // WHEN THE CTRL KEY IS HELD SELECT/DESELECT INDIVIDUAL ITEMS
                                $(row).toggleClass('wui-selected',!alreadySelected);

                                if(alreadySelected) $.each(me.selected || [], function(idx,sel){ if(sel == itm) me.selected.splice(idx,1); });
                                else                me.selected.push(itm);

                                me.el.trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                                .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
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
                            
                                // Clear text selection that results from using the shift key in a cross browser way
                                if(window.getSelection){
                                    txtSelection = window.getSelection();
                                } else if(document.selection){
                                    txtSelection = document.selection;
                                }
                                if(txtSelection){
                                    if(txtSelection.empty){
                                        txtSelection.empty();
                                    }
                                    if(txtSelection.removeAllRanges){
                                        txtSelection.removeAllRanges();
                                    }
                                }
                            }
                        }
                        else{
                            if(me.selected.length > 0 && me.selected[0] === itm)    me.itemDeselect(itm);   //deselect item
                            else                                                    me.itemSelect(itm);     //change selection
                        }
                    }

                    function doubleClick() {
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
    @param    {jQuery Object} el An object that will match an element in the DataList.
    @return   The item in the datalist corresponding to that DOM element.
    Returns the matching DataList item.
    */
    getItemByEl:function(el){
                    var me = this, 
                        retVal;

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
                                var sameRec = (me.identity) ?
                                        itm.rec[me.identity] === rec[me.identity] :
                                        JSON.stringify(itm.rec) === JSON.stringify(rec);
                                
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

                                firstSelect.prevAll().each(function(){ r += $(this).outerHeight(); });
                                r -= ((me.elAlias || me.el).height()) / 2 - (firstSelect.outerHeight() / 2);

                                return  r; 
                            })();
                        ofstP.animate( { scrollTop:offset }, 100 );
                    },
    /**
    @param    {number} num Direction to go to select an ajacent value [1,-1]
    Selects the list item immediately before or after the currently selected item. */
    selectAjacent:  function(num){
                        var me = this, selectAjc = me.selected[0].el[(num > 0) ? 'next' : 'prev']();
                        return me.selectByEl( selectAjc, false );
                    },

    /**
    @param    {string} key The data item to look for
    @param    {string|number} val The value to look for
    @return An object containing the dataList, row, and record, or undefined if there was no matching row.
    Selects an item according to the key value pair to be found in a record. */
    selectBy:   function(key,val){
                    var me = this, 
                        retVal;
                        
                    me.each(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val) {
                            retVal = me.itemSelect(itm);
                            
                            return retVal;
                        }
                    });
                    me.scrollToCurrent();
                    return retVal;
                },
                    
    /**
    @param    {jQuery Object}   el          An object that will match an element in the DataList.
    @param    {boolean}         doScroll    Will prevent scrolling to the item if set to 'false'.
    Selects the matching DataList item.*/
    selectByEl: function(el, doScroll){
                    var me = this,
                        retVal;

                    me.itemSelect(retVal = me.getItemByEl(el));
                    
                    if(doScroll !== false)
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
                    
                    function btnClick() {
                        if (!me.disabled) {
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
                        
                        if(target.children('wui-mask').length === 0) {
                            this.mask = $('<div>').addClass('wui-mask').html(this.maskHTML).appendTo(target);
                            
                            return this.mask;
                        }
                        else {
                            return null;
                        }
                    },

    /** Runs after a pane is rendered. Sets up layout listeners and sets focus on the bottom-right-most button if any */
    afterRender:    function(){
                        var me = this;
                        me.layoutInterval = false;

                        if (document.addEventListener) {
                            document.addEventListener("animationstart", doLayout, false);       // standard + firefox
                            document.addEventListener("MSAnimationStart", doLayout, false);     // IE
                            document.addEventListener("webkitAnimationStart", doLayout, false); // Chrome + Safari
                        }
                        else {
                            document.attachEvent("MSAnimationStart", doLayout);
                        }
                        
                        
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
                            hasItems =  (function(){
                                            var barItemNum = (isHeader && me.title !== null) ? 1 : 0;

                                            bar.items.forEach(function(itm){
                                                if(itm instanceof Wui.O)
                                                    barItemNum++;
                                            });

                                            return barItemNum > 0;
                                        })(),
                            pad = hasItems ? bar.el.css('height') : 0,
                            border = (hasItems) ? 0 : undefined;

                        // Still enforce borders for tabs
                        if( me.parent && me.parent instanceof Wui.Tabs ){
                            if( (isHeader && me.tabsHideHeader && !me.parent.tabsBottom) || (me.tabsBottom && !hasItems) ) 
                                border = 6;
                        }
                        
                        me.sureEl.css('border' +cssProp+ 'Width', border).children('.wui-pane-wrap').css('padding' +cssProp, pad);
                        if(hasItems){
                            bar.place();
                            bar.callRender();
                            if(isHeader){
                                me.setTitle(me.title);
                                this.setTitleAlign();
                            }else{
                                // Set focus to the bottom right most button in the pane
                                if(!me.disabled && bar.items[bar.items.length - 1].el)
                                    bar.items[bar.items.length - 1].el.focus();
                            }
                        }else{
                            bar.el.detach();
                        }

                        // Set  border if applicable
                        me.updateBorder();
                    },

    /** Disables the pane by masking it and disabling all buttons */
    disable:        function() {
                        this.addMask();
                        this.footer.each(function(itm){ if(itm.disable) itm.disable(); });
                        this.header.each(function(itm){ if(itm.disable) itm.disable(); });
                        this.disabled = true;
                        
                        return this.disabled;
                    },
    
    /** Enables the pane by removing the mask and enabling all buttons */
    enable:         function(){
                        var me = this;
                        me.removeMask();
                        me.footer.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.header.each(function(itm){ if(itm.enable) itm.enable(); });
                        this.disabled = false;
                        
                        return this.disabled;
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
    setMaskHTML:    function(html) {
                        this.maskHTML = html;
                        if(this.mask) {
                            this.mask.html(html);
                        }
                    },
    
    /** Changes the title on the pane. */
    setTitle:       function(t){ 
                        this.title = t;
                        t = (t && typeof t === 'string') ? t : '';
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

                    function bringToFront() {
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
                    var posLeft =   (me.windowLeft) ?
                                        ($.isNumeric(me.windowLeft) ? me.windowLeft : Wui.percentToPixels($('html'), me.windowLeft, 'width')) :
                                            Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)),
                        posTop =    (me.windowTop) ?
                                        ($.isNumeric(me.windowTop) ? me.windowTop : Wui.percentToPixels($('html'), me.windowTop, 'height')) :
                                            Math.floor(($.viewportH() / 2) - (useHeight / 2));
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
Wui.confirm = function(msg, msgTitle, callback){
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


})(jQuery,Wui);





(function($,Wui) {


/** 
@event        tabchange When a tab changes (tab pane, tab button, tab item)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
Tab pane
*/
Wui.Tabs = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:           [],
        
        /** An array of items that will be added to the content */
        items:          [],
        
        /** Tabs default to the right side of the pane unless this is true. */
        tabsLeft:       false,
        
        /** A place holder for the currently selected tab. */
        currentTab:     null,
        
        /** Whether to put the tabs on the header or the footer. */
        tabsBottom:     false,
        
        /** Config to place on child items of WUI tabs to make their heading not show up */
        tabsHideHeader: null,
        
        /** An array of items that will be added to the header */
        tbar:    []
    },args); 
    this.init();
};
Wui.Tabs.prototype = $.extend(new Wui.Pane(),{    
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
                                //itm.el.css({borderTopWidth:itm.el.css('border-left-width')});
                                itm.el.addClass('wui-hide-heading');
                            }
                            
                            me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.Button({
                                text:   itm.title || 'Tab ' + (parseInt(idx) + 1),
                                click:  function(){ me.giveFocus(itm); },
                                cls:    itm.tabCls
                            }));
                            //if(me.bbar.length !== 0) me.placeFooter();
                        });
                        
                        return Wui.O.prototype.place.call(me, function(m){ $.each(m.items,function(i,itm){ itm.el.addClass('wui-tab-panel'); }); }); //.wrap($('<div>')
                    },
    
    /** 
    @param {object} itm A WUI Object that will be matched in the items array. 
    @param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
    
    Sets the specified tab to active. Runs layout on the newly activated item.
    */
    giveFocus:      function(tab, supressEvent){
                        var me = this, dn = (me.name) ? '.' + me.name : '';
      
                        supressEvent = (supressEvent !== undefined) ? supressEvent : false;
                        
                        $.each(me.items,function(idx,itm){
                            var isActive = itm === tab;
                            itm.tab.el.toggleClass('selected', isActive);
                            itm.el.toggleClass('active', isActive);
                            if(isActive){
                                me.currentTab = itm;
                                if(!supressEvent) 
                                    me.el.trigger($.Event('tabchange'),[me, itm.tab, itm])
                                        .trigger($.Event('tabchange' + dn),[me, itm.tab, itm]);
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
    selectTabByText:function(txt, supressEvent) {
                        var me = this,
                            retVal;
                            
                        $.each(me.items,function(idx,itm) {
                            if($.trim(itm.tab.el.text()).toLowerCase() === $.trim(txt).toLowerCase().replace(/_/g,' ')){
                                me.giveFocus(itm, supressEvent);
                                retVal = itm;
                            }
                        });
                        
                        return retVal;
                    },
    onRender:       function(){
                        this.giveFocus(this.items[0]);
                    }
});

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

The grid pane provides table-like functionality for data sets. Grids can be populated remotely
or have their data locally defined. Grids also support infinite scrolling by defining paging
parameters. Columns for the grid are defined in an array and with the following options:

cls             - A special class to add to the column
dataItem        - The item in the record that correlates to this column
dataTemplate    - Sort of a full on renderer, this allows you to format inserted data similar to
                  what is available in Wui.Template
dataType        - The type of data used in the column used for sorting (date, numeric, string:default)
fit             - A numeric indicator of the relative size of the column
resizable       - Whether a column can be resized (defaults to true)
heading         - The title of the column heading
sortable        - Whether or not a column can be sorted
vertical        - Makes the column text oriented vertical and the column height at 150px, not resizable
width           - A pixel value for the width of the column

Custom renderers can be applied to columns.  These renderers are defined as function that can
either be defined in the column definition, or defined elsewhere in scope and simply named by
a string. The rendering function is defined passed the following parameters as below:

renderer: function(cell, value, record, row, grid){}

Grids can be sorted by clicking on the headings of columns. Headings sort ascending on the first click, 
descending on the second and revert to their 'unsorted' order on the third.Sorting on multiple columns 
is possible with the a number indicating the precedence of the sort and an arrow for the direction of the sort 
appearing on the right side of the column heading.

Columns can be resized by dragging the heading borders left and right. Columns can be sized to 
extend beyond the width of the grid frame, but when sized smaller will pop back into position.
*/
Wui.Grid = function(args){
    $.extend(this,{
        /** Array of items that will be added to the footer. */
        bbar:           [],
        
        /** Array of items that will make up the columns of the grid table. */
        columns:        [],
        
        /** URL to get columns if its a dynamic grid */
        colUrl:         null,
        
        /** Params to pass for columns on a dynamic grid */
        colParams:      {},

        /** Configs to pass to the Wui.Data object that handles the retrival of the columns
        The columns are set in the 'afterSet' method of the data flow - See Wui.Data */
        colDataParams:  {},
        
        /** Array of data for the grid. */
        data:           null,
        
        /** Data type the grid assumes a column will be. Matters for sorting. Other values are 'numeric' and 'date' */
        defaultDataType:'string',
        
        /** Whether multiple rows/records can be selected at once. */
        multiSelect:    false,
        
        /** Whether or not to hide the column headers */
        hideHeader:     false,
        
        /** An array of the currently selected records */
        selected:       [],

        /** An array containing objects in the following format, that 
        define the initial sort of the data: {dataItem:'name', order:'asc/desc'} */
        sort:           [],

        /** @private Used internally to keep track of sorting, items added to sort will be used in the sorters array */
        // sorters:     []
        
        /** An array of items that will be added to the header */
        tbar:           []
    },args); 
    this.init();
};
Wui.Grid.prototype = $.extend(new Wui.DataList(), new Wui.Pane(), {
    /** Overrides DataList.afterMake(), sizes the columns and enables the grid @eventhook */
    afterMake:  function(){
                    this.layout();
                    this.removeMask();
                },
    
    closeSorter:function(){ this.dd.children('li').off('click').end().hide(); },

    /** 
    Recursive function for sorting on multiple columns @private
    @param {number}    depth    Depth of the recursive call
    @param {number}    a        First item to compare
    @param {number}    b        Second item to compare
    
    @return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
    */
    doSort:     function(depth,a,b){
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
                        else                                                        return me.doSort(depth + 1,a,b);
                    }else{
                        return (a.rec.wuiIndex > b.rec.wuiIndex) ? 1 : -1;
                    }
                },

    /** Verify that columns have been defined on the grid, or that they are available remotely */
    getColumns: function(){
                    var me = this;
                    
                    if(me.colUrl && me.colUrl.length){
                        // Make remote call for columns
                        me.colProxy = new Wui.Data($.extend({url:me.colUrl, params:me.colParams, afterSet:function(r){ me.setColumns(r); }}, me.colDataParams));
                        me.colProxy.loadData();
                    }else if(me.columns.length){
                        // Check for locally defined columns
                        return me.setColumns(me.columns);
                    }else{
                        //throw('There are no columns defined for this WUI Grid.');
                    }    
                },
    
    /** Runs when the object is created, creates the DOM elements for the grid within the Wui.Pane that this object extends */
    init:       function(){
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

                    // Add sorting menu
                    $('body').append( 
                        me.dd = $(
                            '<ul>' +
                                '<li>Ascending</li>' +
                                '<li>Decending</li>' +
                                '<li>No Sort</li>' +
                            '<ul>'
                        ).addClass('wui-sort-menu')
                        .attr({ id: me.idCls = Wui.id() })
                        .on('mousewheel scroll', function(evnt){ 
                            evnt.stopPropagation(); 
                        })
                    );
                    // Clear the sorting menu when it loses focus
                    $(document).on('click','*:not(#' +me.idCls+ ')',function() { 
                        me.closeSorter();
                    });
                    
                    // hide the header
                    if(me.hideHeader)    me.headingContainer.height(0);
                },
    
    /** Overrides the Wui.O layout to allow for the optional sizing to fit content, column sizing, and data positioning. */
    layout:     function(){
                    Wui.O.prototype.layout.apply(this,arguments);
                    
                    if(this.fitToContent === true){
                        var me = this,
                            toolBarsH = me.header.el.outerHeight() + me.footer.el.outerHeight(),
                            maxHeight = $.isNumeric(me.maxHeight) ? me.maxHeight : 0,
                            totalHeight = me.headingContainer.outerHeight();
                        me.tblContainer.children().each(function(){
                            totalHeight += $(this).outerHeight();
                        });

                        totalHeight = (maxHeight > 0 && totalHeight + toolBarsH > maxHeight) ? maxHeight : totalHeight;

                        me.height = totalHeight + toolBarsH;
                        Wui.O.prototype.layout.apply(me,arguments);
                    }

                    this.posDataWin();
                    if(this.cols.length) this.sizeCols();
                },
                    
    /** Overrides DataList.loadData(), to add the load mask */   
    loadData:   function(){
                    this.setMaskHTML('Loading <span class="wui-spinner"></span>');
                    this.addMask();
                    return Wui.Data.prototype.loadData.apply(this,arguments);
                },            
    
    /** 
    @param    {object}    col    An object containing the sort direction and DOM element of the heading
    @param    {string}    dir    The direction of the sort
    Manages the sorters for the grid by keeping them in an array. 
    */
    mngSorters: function(col,dir){
                    var me = this,
                        sortClasses = ['one','two','three','four','five'];
                    if(col !== undefined){
                        if(dir !== undefined){
                            var addItem = true;
                            for(i = me.sorters.length; i > 0; i--)
                                if(me.sorters[i-1].dataItem == col.dataItem)
                                    addItem = false;

                            col.sortDir = dir;
                            if(addItem)
                                me.sorters.push(col);
                        }else{
                            if(col.sortDir){
                                if(col.sortDir == 'desc'){
                                    delete col.sortDir;
                                    col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                    
                                    for(var i = me.sorters.length; i > 0; i--)
                                        if(me.sorters[i - 1].el == col.el)
                                            me.sorters.splice(i - 1,1);
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
                    }

                    $.each(me.sorters,function(i,itm){
                        itm.el.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir).addClass(itm.cls);
                    });
                },
    
    /** Overrides DataList.modifyItem(), to implement the renderers */        
    modifyItem: function(itm){
                    var me = this;
                    // Perform renderers (if any)
                    $.each(me.renderers,function(idx, r){
                        var cell = itm.el.children(':eq(' +r.index+ ')').children('div'),
                            val = itm.rec[r.dataItem];
                        
                        cell.empty().append(r.renderer.call(null, cell, val, itm.rec, itm.el, me));
                    });
                    return itm.el;
                },
    
    /** Overrides DataList.onRender(), to have the grid wait for columns before loading data while still preserving the set autoLoad value. */   
    onRender:   function(){
                    // Store the real value of autoLoad, but set it to false so that the grid waits for the columns
                    // before loading data.
                    var me = this, al = me.autoLoad;
                    me.autoLoad = false;
                    
                    //Wui.Pane.prototype.onRender.call(this);
                    Wui.DataList.prototype.onRender.call(this);
                    
                    // Start with getting the columns - Many methods waterfall from here
                    me.autoLoad = al;
                    return this.getColumns();
                },
    
    /** Positions the height and width of the data table's container. @private */
    posDataWin: function(){
                    var hh = this.headingContainer.height() - 1;
                    this.tblContainer.css({height:this.container.height() - hh, top:hh});
                },
    
    /** Overrides Pane.configBar() to add positioning the data window when tbars or bbars are added/removed. @private */
    configBar:  function(){
                    Wui.Pane.prototype.configBar.apply(this,arguments);
                    this.posDataWin();
                },

    /** Overrides DataList.refresh() to add disabling the grid to add the load mask */
    refresh:    function(){
                    if(this.url === null)   this.setData(this.data);
                    else                    return this.getColumns();
                },    

    /** Fill in gaps in the column definition and append to the cols array. The cols array is what the grid uses to 
    render/reference columns. The append the column to the DOM */            
    renderColumn:function(col,idx){
                    var me = this;
                    
                    $.extend(col,{
                        dataType:   col.dataType || me.defaultDataType,
                        fit:        (col.fit === undefined) ? (col.width === undefined) ? 1 : -1 : col.fit,
                        cls:        col.cls || '',
                        renderer:   (col.renderer) ?    (function(a){
                                                            // Handles renderer if it exists
                                                            if(typeof a !== 'function' && eval('typeof ' + a) == 'function')
                                                                a = new Function('return ' + a + '.apply(this,arguments)');
                                                            if(typeof a === 'function')
                                                                me.renderers.push({dataItem:col.dataItem, renderer:a, index:idx});
                                                        })(col.renderer) : '',
                        index:      idx,
                        resizable:  typeof col.resizable === 'undefined' ? true : col.resizable,
                        sortable:   typeof col.sortable === 'undefined' ? true : col.sortable,
                        width:      col.width === undefined ? 0 : col.width,
                        el:         $('<li>')
                                    .append($('<div>').text(col.heading))
                                    .attr({unselectable:'on'})
                                    .addClass('wui-gc').addClass(col.cls)
                    });
                    
                    if(col.sortable){
                        col.el.on("contextmenu",function(e){
                            e.preventDefault();
                            Wui.positionItem($(this),me.dd);

                            $('body').append(me.dd.width(100).show());
                            Wui.positionItem($(this),me.dd);
                            me.dd.children('li').on('click',function(){
                                var options =   {
                                                    'Ascending': function(){ me.mngSorters(col,'asc'); },
                                                    'Decending': function(){ me.mngSorters(col,'desc'); },
                                                    'No Sort': function(){ col.sortDir = 'desc'; me.mngSorters(col); },
                                                };

                                options[$(this).text()]();
                                me.closeSorter();
                                me.runSort();
                            });
                        });
                        col.el.click(function(){ me.sortList(col); });
                    }else{
                        col.el.addClass('wui-no-sort');
                    }
                        

                    // if(col.sortable)    col.el.click(function(){ me.sortList(col); });
                    // else                

                    //grids with single columns shouldn't have a resizable option
                    if(me.columns.length > 1 && !col.vertical && col.resizable){
                        col.el.resizable({
                            handles:    'e',
                            start:      function() { me.tempLayout = me.layout; me.layout = function(){}; },
                            stop:       function() { me.sizeCols(); me.layout = me.tempLayout; },
                            resize:     function(event,ui) { 
                                            col.width = ui.size.width; col.fit = -1;
                                            Wui.fit(me.cols,'width');
                                        }
                        });
                    }
                    
                    me.cols.push(col);
                    
                    // Append newly created el to the DOM
                    me.heading.append(col.el);
                },

    runSort:    function(){
                    // Sort the list
                    var me = this, listitems = me.items;
                    listitems.sort(function(a, b){ return me.doSort(0, a, b); });

                    me.tbl.detach();
                    // Place items and reset alternate coloring
                    $.each(listitems, function(idx, row) { row.el.appendTo(me.tbl); });
                    me.tbl.appendTo(me.tblContainer);
                    me.sizeCols();
                },
    
    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Same as Wui.Data.push() but sizes columns on the grid too.
    */
    push:           function(){
                        var retVal = Wui.Data.prototype.push.apply(this,arguments);
                        this.sizeCols();
                        return retVal;
                    },

    /**
    @param  {number}    idx         Position to start making changes in the items array.
    @param  {number}    howMany     Number of elements to remove.
    @param  {object}    [obj,...]   One or more objects to be added to the array at position idx
    @return An array of the removed objects, or an empty array. 
    Same as Wui.Data.splice() but sizes columns on the grid too.
    */
    splice:     function(){
                    var retVal = Wui.Data.prototype.splice.apply(this,arguments);
                    this.sizeCols();
                    return retVal;
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
                    me.template = '<tr>';
                    
                    // apply columns on grid
                    $.each(cols,function(i,col){
                        // Add to the template string based on column info
                        var tpltItem = (col.dataTemplate) ? col.dataTemplate : ((col.dataItem) ? '{' +col.dataItem+ '}' : '');
                        me.template += '<td><div>' +tpltItem+ '</div></td>';
                        
                        // Deal with vertical columns - forces them to be 48px wide
                        if(col.vertical){
                            me.el.addClass('has-vert-columns');
                            if(col.cls) col.cls += ' vert-col';
                            else        col.cls = 'vert-col';
                            
                            col.width = 50;
                            delete col.fit;
                        }
                        
                        // Add column to cols array
                        me.renderColumn(col,i);
                    });
                    
                    // finish template
                    me.template += '</tr>';

                    // clear sorters for columns that no longer exist and reapply local sort
                    if(me.sorters && me.sorters.length && me.cols.length){
                        for(var i = me.sorters.length - 1; i >= 0; i--){
                            var remCol = true;
                            for(var j = 0; j < me.cols.length; j++){
                                if(me.cols[j].dataItem == me.sorters[i].dataItem){
                                    // A handshake of information so the sorter doesn't get confused
                                    me.sorters[i].el = me.cols[j].el; 
                                    me.cols[j].sortDir = me.sorters[i].sortDir;
                                    remCol = false; 
                                    break;
                                }
                            }
                            if(remCol) me.sorters.splice(i,1);
                        }
                    }
                    
                    return me.getSrcData();
                },
    getSrcData: function(){
                    var me = this;

                    if(me.autoLoad){
                        if(me.url === null) me.setData(me.data);
                        else                return me.loadData();
                    }
                },
    setData:    function(){
                    var me = this, i = null, j = null;

                    Wui.DataList.prototype.setData.apply(me,arguments);
                    
                    // If the config sorters is defined, add them to the array
                    if(me.sort.length && !me.sorters.length)
                        for(i = 0; i < me.sort.length; i++)
                            for(j = 0; j < me.cols.length; j++)
                                if(me.cols[j].dataItem == me.sort[i].dataItem)
                                    me.mngSorters(me.cols[j],me.sort[i].order);

                    this.sortList();
                },

    /** Size up the columns of the table to match the headings @private */
    sizeCols:   function (){
                    var me = this, 
                        hc = me.headingContainer,
                        acctForScrollBar = me.tbl.find('tr:first').height() * me.total > me.tblContainer.height(),
                        sbWid = acctForScrollBar ? Wui.scrollbarWidth() : 0;

                    hc.css('padding-right', sbWid);
                    Wui.fit(me.cols,'width');

                    for(var i = 0; i < me.cols.length; i++)
                        me.tbl.find('td:eq(' +i+ ')').css({ width: me.cols[i].el.innerWidth() });

                    // Necessary to define in javascript because webkit won't use the style
                    // until the width of the table has been defined.
                    me.tbl.css({width: hc.width(), tableLayout: 'fixed'});
                },
                    
    /**
    @param    {object}    Column object associated with a particular column element
    Sort the grid based on the values of one or more columns. If the grid is paging
    then sort remotely.
    */
    sortList:   function(col) {
                    var me = this;
                    me.mngSorters(col);
                    me.runSort();
                }
});

/** See Docs for Wui.Grid */
Wui.InfiniteGrid = function(args){
    $.extend(this,{
        /** Array of data for the grid. */
        data:           null,

        /** This is an attribute of Wui.Grid that is not to be used in an infinite grid. 
        Use the same property in paging instead. */
        sort:           null,

        /**
        If paging is anything other than null, the grid will sort remotely and scroll infinitely.
        
        Example paging parameters are:
        {
            limit:    page size,
            start:    0 - a very good place to start
            sort:    {dataItem:'name', order:'asc/desc'}
        }
        */
        paging:            null
    },args); 
    this.init();
};
Wui.InfiniteGrid.prototype = $.extend(new Wui.Grid(), {
    /** 
    @param {array}    source        Array containing the data to add rows for.
    Adds rows to the table along with event listeners and column renderers.
    */
    addRows:        function(source){
                        var me = this,
                        holdingData = source || [],
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
                        me.tbl.empty();
                        me.tbl.append(holder.children().unwrap());
                        me.data = holdingData;

                        return source;
                    },
    
    /** 
    Overrides an event hook on Wui.Data and makes the grid after new data is set
    */
    afterSet:        function(retData){
                        var me = this;
                        
                        if(me.isPaging && me.tbl.children().length > 0){
                            if(me.total > me.data.length){
                                me.addRows(retData);
                                me.rowHeight = me.tbl.find('tr:first').outerHeight();
                                me.tbl.css({top:(me.params.start * me.rowHeight) + 'px'});
                                me.sizeCols();
                            }
                        }
                    },

    alignPagingSort:function(){
                        var me = this;
                        
                        if(me.sorters.length === 0)
                                me.paging.sort = me.originalSort;

                        $.each(me.paging.sort,function(idx,itm){
                            $.each(me.columns,function(i,col){
                                if(col.dataItem === itm.dataItem) me.mngSorters(col,itm.order);
                            });
                        });
                    },

    getSrcData:     function(){
                        var me = this;

                        if(me.initLoaded !== true && me.data !== null) {
                            me.setParams(me.params);
                            return me.setData(me.data);
                        }else{
                            return Wui.Grid.prototype.getSrcData.apply(me,arguments);
                        }
                    },

    /** 
    Method that will run immediately when the object is constructed. Creates necessary 
    DOM elements for the grid. Establishes whether the grid is remote or local, paging
    or not. */
    init:            function(){
                        var me = this;
                            
                        Wui.Pane.prototype.init.call(me);
                        me.el.addClass('wui-grid wui-infinite-grid');
                        
                        // Define object internal variables
                        me.tblContainer = $('<div><div>&nbsp;</div><table></table></div>').addClass('grid-body');
                        me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh');
                        me.tbl = me.tblContainer.children('table').addClass('wui-infinite-table');
                        me.tblHSize = me.tblContainer.children('div').addClass('wui-ghs');
                        me.heading = me.headingContainer.children('ul');
                        me.sorters = [];
                        me.renderers = [];
                        me.originalSort = me.paging.sort || null;
                        
                        //Add listeners to table
                        me.tblContainer.scroll(function(){
                            // paging scrolling
                            if(me.isPaging) me.pagingScroll();

                            me.headingContainer.scrollLeft($(this).scrollLeft());
                        });
                        
                        me.elAlias.append(me.tblContainer,me.headingContainer);
                        
                        if(me.hideHeader)
                            me.headingContainer.height(0);
                    },

    /** 
    Renders the data in the table. Overrides Wui.DataList.make()
    @private
    */
    make:           function(){
                        var me = this;
                        me.addRows(me.data);
                        
                        if(me.isPaging){
                            me.rowHeight = me.tbl.find('tr:first').outerHeight();
                            me.totalPages = Math.floor(me.total/me.paging.limit);
                            me.alignPagingSort();
                            me.totalHeight = me.total * me.rowHeight;

                            if(me.tblHSize)
                                me.tblHSize.height(me.totalHeight);
                        }

                        // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                        // object has been manually run
                        me.autoLoad = true;

                        // Event hook and event
                        me.afterMake();
                        me.el.trigger($.Event('refresh'),[me,me.data]);
                    },

    /** 
    @param    {object}    col    An object containing the sort direction and DOM element of the heading
    #param    {string}    dir    The direction of the sort
    Manages the sorters for the grid by keeping them in an array. 
    */
    mngSorters:     function(col,dir){
                        var me = this,
                            i = 0,
                            sortClasses = ['one','two','three','four','five'];

                        if(col !== undefined){
                            if(dir !== undefined){
                                var addItem = true;
                                for(i = me.sorters.length; i > 0; i--)
                                    if(me.sorters[i-1].dataItem == col.dataItem)
                                        addItem = false;

                                col.sortDir = dir;
                                if(addItem)
                                    me.sorters.push(col);
                            }else{
                                if(col.sortDir){
                                    if(col.sortDir.toLowerCase() == 'desc'){
                                        delete col.sortDir;
                                        col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                        
                                        for(i = me.sorters.length; i > 0; i--)
                                            if(me.sorters[i - 1].el == col.el)
                                                me.sorters.splice(i - 1,1);
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
                        }

                        // Add/remove classes to indicate to the user what is being sorted and take care of paging
                        if(me.isPaging){
                            me.paging.sort = [];
                            
                            if(me.sorters.length === 0)
                                me.alignPagingSort();
                        }
                            
                        me.sorters.forEach(function(itm,i){
                            itm.el.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir.toLowerCase()).addClass(itm.cls);

                            if(me.isPaging)
                                me.paging.sort.push({dataItem:itm.dataItem, order:itm.sortDir});
                        });
                    },

    pagingScroll:   function(){
                        var me      = this,
                            top     = me.tblContainer.scrollTop(),
                            page    = Math.round(me.totalPages * (top / me.totalHeight)),
                            newSuccess = function(){
                                me.tbl.css({top:(me.actualStart * me.rowHeight) + 'px'});
                                if(
                                    me.currPage != Math.floor((me.tblContainer.scrollTop() + 
                                    me.tblContainer.height()) / (me.totalHeight / me.totalPages))
                                ){
                                    me.pagingScroll();
                                }
                                me.sizeCols();
                            };

                        me.currPage = me.currPage || 0;
                        me.lastScroll = top;

                        if($.isNumeric(page) && me.currPage != page){
                            me.paging.start = page * me.paging.limit;
                            me.currPage = page;
                            
                            me.actualStart = page * me.paging.limit + ((page !== 0) ? -1 * Math.round(me.paging.limit / 2) : 0);
                            me.actualLimit = me.paging.limit * 2;
                            
                            me.loadData({
                                start:  $.isNumeric(me.actualStart) ? me.actualStart : 0, 
                                limit:  $.isNumeric(me.actualLimit) ? me.actualLimit : 50, 
                                sort:   JSON.stringify(me.paging.sort)
                            });
                        }

                        if(me.onSuccess !== newSuccess){me.onSuccess = newSuccess;}
                    },

    runSort:    function(){
                    var me = this;

                    // If paging then do the sorting on the server
                    if(me.isPaging === true){
                        me.currPage = -1;
                        me.tbl.scroll();
                    }else{
                        // Sort the list
                        var listitems = me.items;
                        listitems.sort(function(a, b){ return me.doSort(0, a, b); });

                        me.tbl.detach();
                        // Place items and reset alternate coloring
                        $.each(listitems, function(idx, row) { row.el.appendTo(me.tbl); });
                        me.tbl.appendTo(me.tblContainer);
                        me.sizeCols();
                        me.resetSelect();
                    }
                },

    /** Overrides Wui.DataList.scrollToCurrent to turn of scrolling on the infinite grid. */
    scrollToCurrent:function(){
                        if(!this.isPaging)
                            Wui.DataList.prototype.scrollToCurrent.apply(this,arguments);
                    },

    /** Overrides Wui.Data.setParams and allows for adding the infinite scroll parameters. */
    setParams:  function(){
                var me = this;
                
                if(me.paging !== null && typeof me.paging === 'object'){
                    me.isPaging = true;
                    $.extend(me.params,{limit:me.paging.limit, start: me.paging.start, sort:JSON.stringify(me.paging.sort)});

                    if(typeof arguments[0] === 'object' && typeof arguments[0].start === 'undefined')
                        $.extend(arguments[0],{start:0});
                }
                return Wui.Data.prototype.setParams.apply(me,arguments);
            },

    setData:        function(){
                        Wui.DataList.prototype.setData.apply(this,arguments);
                        if(!this.isPaging)
                            this.sortList();
                        this.sizeCols();
                    }
});

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@event  formupdate Fires when a field on the form changes. Passes (event, form, [field])

The WUI Form is a wrapper for Wui.FormField()s. The WUI Form extends some basic Wui Object 
functionality to work specifically for a form. For example, the each method of a Wui form
operates on all of the items in the form's items array, but can optionally only operate on
only those items which are of the Wui.FormField type.

Items can be pushed and spliced on a Wui form using the push and splice methods, but these
items will receive additional processing through the normFrmItem method which will apply
form properties if they're not already specified on the object (like label position and
enabled status).

FormFields can be defined in a couple of different ways in a form. The first way, is to use
the new operator (i.e. new Wui.Text({})), the other way is to declare an object containing an
ftype:

{ftype:'Wui.Text', [other properties...]}

Data can be set on a form by passing an object with keys matching the form's field names to 
the setData method. getData() works inverse to setData, but will return false rather than
an object if there is a validation problem on the form.  For information about validation, 
see Wui.FormField.validate().

Form items can be accessed by name using the getFrmItm() method.
*/
Wui.Form = function(args){
    $.extend(this,{
        /** Config to disable the entire form */ 
        disabled:       false,
        
        /**  Position of the label relative to the form fields that is generally applied unless
        specifically defined on a particular field. */
        labelPosition:  'top',

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:      null
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
    dispErrors: function(){
                    var msg = '';
                    for(var e = 0; e < this.errors.length; e++) msg += this.errors[e] + '<br/>';
                    Wui.errRpt(msg,'Form Errors');
                },

    /**
    @param {function}   f               A function that gets called for each item of the form with the exception of Wui.Note objects.
    @param {boolean}    [blockNote]     If defined and true, items that do not inherit from Wui.FormField will not be processed.
    @param {boolean}    [ascending]     Whether the loop happens in ascending or descending order. Defaults to true.
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    each:       function(f, blockNote,ascending){
                    return Wui.O.prototype.each.call(
                        this,
                        function(itm,i){
                            if(!(blockNote && !(itm instanceof Wui.FormField))) return f(itm,i);
                        },
                        ascending
                    );
                },

    /** Class to hilight form fields when they fail validation */
    errCls:        'wui-form-err',

    /**
    @return Object containing the data of the form fields, or false if there was a validation error
    Performs validation on the form and returns either the form data or false. */
    getData:    function(){
                    if(this.validate()) { return this.getRawData(); }
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
    getFrmItm:  function(fieldname){
                    var retItm;
                    
                    this.each(function(itm) { 
                        if (itm.name == fieldname) {
                            retItm = itm;
                        }
                    });
                    
                    return retItm;
                },
                
    /**
    @return Object containing the data of the form fields
    Gets the values of form fields without performing validation */
    getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); }, true);
                    return ret;
                },
                
    /** Method that will run immediately when the object is constructed. */           
    init:       function(){},
                
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

                    if(!itm.hasOwnProperty('labelPosition')) $.extend(itm,{labelPosition: me.labelPosition});

                    if(itm.ftype && !(itm instanceof Wui.FormField)){                        
                        var ft = itm.ftype.split('.');

                        itm.labelSize = itm.labelSize || me.labelSize;

                        switch (ft.length) {
                            case 1:
                                if(window[ft[0]])   return new window[ft[0]](itm);
                                else                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 2:
                                if(window[ft[0]] && window[ft[0]][ft[1]])   return new window[ft[0]][ft[1]](itm);
                                else                                        throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 3:
                                if(window[ft[0]] && window[ft[0]][ft[1]][ft[2]])    return new window[ft[0]][ft[1]][ft[2]](itm);
                                else                                                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 4:
                                if(window[ft[0]] && window[ft[0]][ft[1]][ft[2]][ft[3]]) return new window[ft[0]][ft[1]][ft[2]][ft[3]](itm);
                                else                                                    throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            default:
                                throw('Object type ' +itm.ftype+ ' is not defined.');
                        }
                    }else if(itm instanceof Wui.FormField){
                        // If a field has a label, make it match the format of the form.
                        if(itm.lbl){
                            itm.labelSize = itm.labelSize || me.labelSize;
                            itm.lbl.setLabelPosition(itm.labelPosition || me.labelPosition);
                            itm.lbl.setLabelSize(itm.labelSize || me.labelSize);
                        }

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
    push:       function(){
                    var me = this, itms = [];
                    $.each(arguments,function(i,arg){ itms.push(me.normFrmItem(arg)); });
                    return Wui.O.prototype.push.apply(this,itms);
                },

    /**
    @param  {number}    idx         Position to start making changes in the items array.
    @param  {number}    howMany     Number of elements to remove.
    @param  {object}    [obj,...]   One or more objects to be added to the array at position idx
    @return An array of the removed objects, or an empty array. 
    Similar to the Wui.O.splice() with the addition of running normFrmItem().
    */
    splice:     function() {
                    var me = this, 
                        itms = [],
                        index = Array.prototype.shift.apply(arguments),
                        remove = Array.prototype.shift.apply(arguments);

                    // Create/normalize passed in objects
                    $.each(arguments,function(i,arg){ itms.push(me.normFrmItem(arg)); });

                    // Add Elements back in
                    itms.splice(0,0,index,remove);
                    return Wui.O.prototype.splice.apply(this,itms);
                },

    /**
    @param {string} fieldname The name of the field to be removed
    @return True
    Removes a form field from a form based on its name.
    */
    remFrmItm:  function(fieldname){
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
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    if(changed)
                        me.el.trigger($.Event('formupdate'), [me, changedItem])
                            .trigger($.Event('formupdate' + dn), [me, changedItem]);
                    me.formChanged = changed;
                    return me.formChanged;
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
                                this.setData(); // Clears the data on the form before setting it
                                this.each(function(itm){ 
                                    if(data[itm.name]) 
                                        itm.val(data[itm.name],fireEvents);
                                }, true);
                            }
                    else    {    this.each(function(itm){ itm.val(null,fireEvents); }, true); }
                    this.formChange(false);
                },
    
    /** Disable all form fields */
    disable:    function(){ 
                    this.disabled = true; 
                    return this.each(function(itm){ itm.disable(); }, true); 
                },
    
    /** Enable all form fields */
    enable:     function(){ 
                    this.disabled = false; 
                    return this.each(function(itm){ itm.enable(); }, true); 
                },
    
    /**
    @param {string} fieldname The name of the field to set a value on
    @param {any} v    Value to set the field to.
    Sets a field of a given name to a given value.
    This method will fail unless the items of the form are initialized W formField objects
    */
    setField:   function(fieldname, v){
                    this.each(function(itm){ if(itm.name == fieldname) itm.val(v); }, true);
                },
    
    /**
    @param {string} err An error message.
    Adds a thrown error to the form's errrs array so that all errors on a form can be reported at once.
    */
    throwError: function(err){this.errors.push(err); return false;},
    
    /**
    Runs the validate() function for each of a form's fields.
    */
    validate:   function(){
                    var me = this;
                    me.errors = [];
                    me.each(function(itm){ 
                        if(typeof itm.el.toggleClass !== 'undefined')
                            itm.el.toggleClass(me.errCls,!itm.validate());
                    }, true);
                    this.formChange(false);
                    return (me.errors.length === 0);
                }
});

/** 
    TODO: THIS SEEMS LIKE A USELESS OBJECT - REMOVE?
    Allows a note to be placed on a form. A HTML string will be converted into DOM elements
    placed within a div tag. The note can be included in the items on a form, but the form
    will not attempt to validate like the other items.
*/
Wui.Note = function(args){ 
    $.extend(this,{
        /** The HTML to be placed in the note */
        html:   ''
    },args);
    this.init();
};
Wui.Note.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. */
    init:   function(){ this.el = $('<div>').html(this.html).addClass('wui-note'); }
});

/** 
    The label object will wrap around a Wui.FormField when the 'label' config is specified
    on the field. The labelPosition is usually supplied by the field the label will wrap, but
    it has its own property, and can be instantiated by itself.

    When a label is part of a Wui.FormField, it is accessible by the lbl property of the field.
*/
Wui.Label = function(args){ 
    $.extend(this,{
        /**
            String that will converted into DOM elements and placed in the label.
            This is usually the value of the label config on a Wui.FormField.
        */
        html:           '',
        
        /** Default position of the label relative to the field (top,right,bottom,left). */
        labelPosition:  'top',

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:      null
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
                            me.setLabel();
                            me.setLabelPosition();
                        },
    
    /**
    @param {string} newLabel String that will converted into DOM elements and placed in the label.
    @return Returns the HTML content of the label
    Changes the contents of the label.
    */
    setLabel:           function(newLabel){
                            newLabel = newLabel || this.html;
                            this.label.html(this.html = newLabel);
                            return this.label.html();
                        },

    /**
    @param {string} pos A string to verify the label position
    Verify's that the label's position is either top, right, bottom or left.
    @return the verified lowercase position string, or the label's current position if the passed in value isn't valid.
    */
    verifyPosition:     function(pos){
                            if(pos && (pos = pos.toLowerCase()) && $.inArray(pos,['top', 'left', 'bottom', 'right']) >= 0)
                                return pos;
                            else
                                return this.labelPosition;
                        },

    /**
    @param {number} size An integer for the size (height or width depending on the label position) of the label
    Changes the size of the label from the default values, or if size is undefined, resets the defaults.
    */
    setLabelSize:       function(size){
                            var me = this;
                                size = $.isNumeric(size) ? size : me.labelSize;

                            // Clear out and reset the size of el padding
                            me.el.css({
                                paddingLeft:    '',
                                paddingRight:   '',
                                paddingTop:     '',
                                paddingBottom:  ''
                            });
                            // Clear out and reset the size of the label
                            me.label.css({
                                width:          '',
                                height:         '',
                                marginLeft:     '',
                                marginRight:    ''
                            });

                            if($.isNumeric(size)){
                                var margin = (dimension == 'height') ? 0 
                                                : (me.labelPosition == 'left') ? parseInt(me.label.css('margin-right')) 
                                                    : parseInt(me.label.css('margin-left')),
                                    dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width';
                                
                                me.el.css('padding-' + me.labelPosition, size);

                                // Chrome is not able to access the margin-right value and returns NaN. 
                                // It appears that IE is not able to either and returns 0, while FF returns 5.
                                if (isNaN(margin)) margin = 5; 

                                me.label.css(dimension, size - margin);
                                if(me.field)
                                    me.field.labelSize = me.labelSize = size;
                            }

                            me.adjustField();
                        },

    /** Adjusts the size of the field in case the size of the label overflows */
    adjustField:        function(){
                            var me = this, dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width';
                            if(me.field && dimension == 'width' && me.label.outerHeight() > me.field.el.height()){
                                me.field.el.css('min-height', me.label.outerHeight());
                            }
                        },

    /**
    @param {string} position The value for the new label position (top, left, bottom, right)
    @return Returns the position that was set. Invalid passed in values will not change the current label position.
    */
    setLabelPosition:   function(position){
                            var me = this;

                            position = me.verifyPosition(position);
                            me.el.removeClass('lbl-' + me.labelPosition).addClass('lbl-' + position);
                            if(me.field)    me.field.labelPosition = position;
                            
                            me.labelPosition = position;
                            me.setLabelSize();

                            return me.labelPosition;
                        }
});

/**
    @event valchange When a value changes on a form field (event, WUI FormField, value, old value)
    @event hiddenchange Same as valchange but for fields without an 'el' property (like hidden fields. Called on the window (WUI FormField, value)
    
    Wui.FormField contains configs and methods that are common to all form elements. For 
    a form to interact properly with a field, it must be an instance of Wui.FormField. Vlidation
    is provided by the FormField ojbect, but can be overridden for specific needs in a given
    field. See the validate() documentaton for information about how to display custom error messages,
    validate with regular expressions, and write custom functions for validation.
    An input must be an instance of Wui.FormField for it to interact properly with a Wui form.
*/
Wui.FormField = function(args){
    $.extend(this,{
        /** Whether or not the field will be disabled. A disabled field is still accessible to the form, just not to the user. */
        disabled:       false,
        
        /** Message to display to the user when validation fails. If not specified the form will attempt to use the field's label. */
        invalidMsg:     null,
        
        /** An optional config that labels the field. */
        label:          null,
        
        /** A special class to put on the label if desired */
        labelCls:       null,

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:      null,
        
        /** Whether or not the field is required. May be pre-empted by other validation. See validate() method. */
        required:       false,
        
        /** A regular expression whereby to validate a field's input. May be pre-empted by other validation. See validate() method. */
        validRegEx:     null,
        
        /** A function to validate field input. This function is passed the value of the field, for example: validTest: function(val){ return val == 3; } */
        validTest:      null
    },args);
};
Wui.FormField.prototype = $.extend(new Wui.O(),{
    /** Defines the position of the label relative to the field, options are 'top', 'left', 'right' and 'bottom' */
    labelPosition:  'top',

    /**
        @return The el of the object
        Runs immediately when the object is constructed. Wraps the field in a label if a label has been defined.
    */
    init:       function(){
                    var me = this;
                    me.value = me.hasOwnProperty('value') ? me.value : null;
                    me.el = $('<div>').addClass('wui-fe');
                    
                    if(me.label && me.label.length > 0){
                        me.lbl = new Wui.Label({
                            html:           me.label, 
                            cls:            me.labelCls, 
                            field:          me, 
                            labelPosition:  me.labelPosition, 
                            labelSize:      me.labelSize
                        });
                        me.elAlias = me.el;
                        me.el = me.lbl.el.append(me.elAlias);
                    }
                    return me.el;
                },
                
    /** Will disable the object if its disabled property is set to true and set a value on the field if one has been defined. */
    onRender:   function(){
                    if(this.disabled)                   this.disable();
                    if(this.hasOwnProperty('value'))    this.val(this.value,false);
                },

    /** Runs after the element has been placed on the DOM */
    afterRender:function(){ if(this.lbl)  this.lbl.adjustField(); },

    /** Makes the field read-only so the user cannot edit the field, but can select the text. */
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('wui-disabled').find('input,textarea,iframe').attr({readonly: true, tabIndex:-1});
                },
                
    /** Enables the field so the user can interact with it. */
    enable:     function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('wui-disabled').find('.wui-disabled,*[readonly]').removeAttr('readonly tabIndex');
                },
    
    /**
    @return True or False
    Validate will construct an error message based on the following precedence:
    1. Custom message (invalidMsg)
    2. Character count (if applicable)
    3. The label on the field
    4. The name of the field
    5. Report that "A required field has an improper value."
    
    Then, validates a field using the following order of validation precedence:
    1. Custom testing function (validTest)
    2. Character count (maxChars - only applicable on Text and Textarea)
    3. Regular Expression (validRegEx)
    4. Required flag (required)
    5. No validation - returns true.
    
    Then sends the error message, if any, to the parent form's throwError() method where the invalidation messages are concatenated and the fields
    are hilighted for the user to see what fields need their attention.
    */
    validate:   function(){
                    var me = this,
                        v = me.val(),
                        fieldName = (me.label !== null ) ? me.label : (typeof me.name !== 'undefined') ? me.name : null,
                        errMsg = (me.invalidMsg !== null) ? me.invalidMsg : 
                                    (fieldName !== null) ? 'A value for \'' +fieldName+ '\' is required.' :
                                        "A required field has an improper value.";
                    
                    // If a custom test is defined 
                    if(me.validTest && typeof me.validTest == 'function')
                        if(me.validTest(v) === false)
                            return parentThrow();
                                            
                    // If maxChars is defined, this will be checked first
                    if($.isNumeric(me.maxChars)){
                        if(v && v.length > me.maxChars){
                            errMsg = (fieldName && $.trim(fieldName).length) ? 
                                        '\'' + fieldName + '\' must be less than ' +me.maxChars+ ' characters.' :
                                        'You have a field with too many characters in it, the max is ' +me.maxChars+ '.';
                            return parentThrow();
                        }
                    }

                    // If a regular expression is defined for a test, this will be tested first
                    if(me.validRegEx !== null)
                        if(!me.validRegEx.test($.trim(v)))
                            return parentThrow();
                                        
                    // If no regular expression test exists, test whether a value is required and throw an error if blank
                    if(me.required){
                        if(v === null || v === undefined)                   return parentThrow();
                        if(typeof v == 'string' && $.trim(v).length === 0)  return parentThrow();
                    } 
                    
                    function parentThrow(){
                        return (typeof me.parent.throwError !== 'undefined') ? me.parent.throwError(errMsg) : false;
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
    setChanged: function(oldVal){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    // Marks the parent form as 'changed'
                    if(me.parent && me.parent instanceof Wui.Form)
                        me.parent.formChange(true, me);
                    
                    // Calls functionally defined valChange() - one will override another
                    me.valChange(me, me.value, oldVal);
                    
                    // Calls listeners for valchange - in the case of hidden fields calls 'hiddenchange'
                    if(me.el){
                        me.el.trigger($.Event('valchange'), [me, me.value, oldVal])
                            .trigger($.Event('valchange' + dn), [me, me.value, oldVal]);
                    }else{
                        if(me.parent && me.parent instanceof Wui.Form)
                            me.parent.el.trigger($.Event('hiddenchange'), [me, me.value, oldVal])
                                .trigger($.Event('hiddenchange' + dn), [me, me.value, oldVal]);
                    }
                },
    
    /** 
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    getVal:     function(){
                    return this.value;
                },
    
    /** 
    @param {string}    sv    Value to set the value of the field to
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    setVal:     function(sv){
                    this.value = sv;
                },
    
    /** 
    @param {string}    newVal    New value being set on the field
    An event hook for when the value changes. Useful for extending objects, but generally use the 'valchange' event listener
    */
    valChange:  function() {}
});

/** A Wui.FormField that is hidden on the DOM. */
Wui.Hidden = function(args){
    $.extend(this,{
        /** Only produces a DOM element for the sake of splicing */
        el:     $('<div>').hide()
    },args); 
    this.init();
};
Wui.Hidden.prototype = $.extend(new Wui.FormField(),{ init: function(){} });

/** WUI Text */
Wui.Text = function(args){
    $.extend(this,{
        /** A value that appears in the field until text is entered. (HTML 5 placeholder) */
        blankText:  '',

        /** When set to true, along with maxChars being defined, a character countdown will 
        be displayed on the field. */
        counter:    false,

        /** A maximum number of characters that can be entered into the field. Adding a number
        here adds validation for character count. */
        maxChars:   null
    },args,{
        /** The HTML element */
        field:      $('<input>').attr({type:'text'})
    }); 
    this.init();
};
Wui.Text.prototype = $.extend(new Wui.FormField(),{
    /** Runs immediately when the object is created */
    init:           function(){
                        var me = this;
                        Wui.FormField.prototype.init.call(me);
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Text.prototype.setListeners.call(me,me));
                    },
                    
    /** 
    @param {string} bt  The value of the placeholder text for the field.
    @return The blank text that was passed in.
    Sets the blank text on the field. */
    setBlankText:   function(bt){
                        var me = this;
                        
                        me.blankText = bt;
                        me.field.attr('placeholder', bt);
                        
                        return bt;
                    },
                    
    /** 
    @param  {Wui Object}  t  The object to have listeners applied to the field
    Puts listeners on the field, mostly to handle blankText in the event that HTML 5 placeholder isn't supported 
    Also calls the setListeners() of any extending object automagically.
    The parameter (t) is automatically passed in to the setListeners method and
    represent the object. Listeners can be added to the field like this:
    t.field.blur([some function that will happen on blur.])
    Listeners can also be chained:
    t.field.blur(...).focus(...).click(...) 
    Unlike other functions in the WUI, if the field already has a setListeners method defined,
    there is no need to call the prototype to still get the functionality of the base method. If
    you desire to turn a particular listener off (though not recommended), this can be done with 
    tandard jQuery for turning a listener off:
    t.field.off('click');
    */
    setListeners:   function(t){
                        var me = this,
                            fieldState = null;
                        
                        t.field
                        .focusin(function(){ fieldState = me.field.val(); }) // Set fieldState (closure variable) to allow for comparison on blur
                        .blur(function(){ 
                            if(fieldState != me.field.val()){
                                me.val(); 
                                me.setChanged();
                            }
                        }); // Call val function so that valchange will be fired if needed

                        // Add a character counter
                        if($.isNumeric(t.maxChars) && t.counter === true){
                            t.append(t.charCounter = $('<div>').addClass('wui-char-counter'));
                            t.field.keyup(function(){
                                var initVal = (t.val()) ? t.maxChars - t.val().length : t.maxChars;
                                t.charCounter.text(initVal);
                                if(initVal >= 0)    t.charCounter.css('color','#333');
                                else                t.charCounter.css('color','#900');
                            });

                            t.field.keyup();
                        }
                        
                        if(this.setListeners !== Wui.Text.prototype.setListeners) this.setListeners(this);
                        return t.field;
                    },
    /** 
    @param {string}    sv    Value to set the field text to
    Changes the value of the text in the field without changing the value of the object
    */
    fieldText:      function(sv){
                        this.field.val(sv);
                    },
                    
    getVal:         function() {
                        this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null;
                         
                        return this.value;
                    },
                    
    setVal:         function(sv) { 
                        this.fieldText(this.value = (sv && $.trim(sv).length) ? sv : null);
                    }
});

/** WUI Text Area */
Wui.Textarea = function(args){
    $.extend(this, { 
        /** The HTML element */
        field:  $('<textarea>'),
        
        /** Determines the height of the field */
        height: 80
    }, args);
    this.init();
};
Wui.Textarea.prototype = $.extend(new Wui.Text(), {
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me); 
                },

    /** Overrides Wui.O.cssByParam to include resizing the textarea within the object */
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    var lblVert = (this.lbl && $.inArray(this.lbl.labelPosition,['top','bottom']) >= 0) ? this.lbl.label.outerHeight() : 0;
                    this.el.css({
                        height:     '',
                        minHeight:  (this.height)
                    });
                    this.field.css({
                        height:     '',
                        minHeight:  (this.height - lblVert)
                    }); 
                }
});

/** Creates a WYSIWYG (What You See Is What You Get) editor from a textfield.   
@author Stephen Nielsen
*/
Wui.Wysiwyg = function(args){
    $.extend(this,{
        css:        'body {' +
                        'color:#333;' + 
                        'font:90%  Arial, Verdana, Helvetica,sans-serif;' + 
                        'overflow:auto;' + 
                        'margin:0;' + 
                        'padding:0;' +
                    '}' +
                    'a {color:#09c; text-decoration:none;}' +
                    'a:hover {color:#0c9; text-decoration:underline;}',
        
        /** Whether or not to show the button that will give the user a view
        of the HTML generated by the WYSIWYG */
        showHTML:   false,
        fullPath: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        relativePath: /(\/|\/([\w#!:.?+=&%@!\-\/]))/
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
                    me.bold.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("bold"); });
                    me.italic.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("italic"); });
                    me.underline.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("underline"); });
                    me.strike.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("strikethrough"); });
                    me.link.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){
                        var r = me.previousRange;
                        if (r.htmlText){
                            me.exec("createLink", true);
                        }else{
                            var a = Wui.input(
                                "Link URL:",
                                function(link){
                                    me.exec("createLink", false, link);
                                    a.parent.closeOkay = true;
                                    a.parent.close();
                                },
                                'Insert Link',
                                [{  
                                    ftype:'Wui.Text',
                                    blankText:  'Use: \'http://...\'    or   \'/directory/page/etc...\' ',
                                    required:   true,
                                    invalidMsg: 'You need to have a properly formatted link with either an absolute or relative path.',
                                    testLink:   function(){ return this.validTest(this.field.val()); },
                                    validTest:  function(v) {
                                                    return (me.fullPath.test(v) || me.relativePath.test(v));
                                                },
                                    setListeners:function() {
                                                    var me = this;

                                                    return me.field.on('blur click keyup keydown mousedown', function( ) {
                                                        Wui.Link.prototype.buildOutput.call(me, {
                                                            uri:    me.field.val(),
                                                            target: '_blank',
                                                            title:  r.toString()
                                                        });
                                                    });
                                                }
                                }]
                            );
                            setTimeout(function(){ a.parent.modalEl.css('z-index',Wui.maxZ()); }, 100);
                        } 
                    });
                    me.unlink.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("unlink", false, []); });
                    me.ol.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("insertunorderedlist"); });
                    me.ul.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("insertorderedlist"); });
                    me.left.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyLeft"); });
                    me.center.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyCenter"); });
                    me.right.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyRight"); });

                    // If the field is blank - add a space
                    if(!$(edit.body).children().length) me.exec('insertHTML',false,' ');

                    (me.elAlias || me.el).resizable();
                },
    exec:       function (a, b, c) {
                    this.iframe[0].contentWindow.focus();

                    if (this.previousRange) {
                        var rng = this.previousRange,
                            sel = this.getSelection();
                        
                        sel.removeAllRanges();
                        sel.addRange(rng);
                    }

                    this.editor.execCommand(a, b || false, c || null);
                },
    getRange:   function () {
                    var s = this.getSelection();
                    
                    if (!s)
                        return null;
                    if (s.getRangeAt && s.rangeCount > 0)
                        return s.getRangeAt(0);
                    if (s.createRange)
                        return s.createRange();

                    return null;
                },
    getSelection: function () {
                    if (this.editor.selection)
                        return this.editor.selection;
                    else
                        return this.iframe[0].contentDocument.defaultView.getSelection();
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
                    
                    this.value = (retVal.length === 0) ? null : retVal;
                    
                    return this.value;
                },
    /** Overrides WUI.FormField Set val to take the WYSIWYG editor into account */
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
        template:   '<li><input type="radio" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args,{
        el:         $('<div>')
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
                    me.append(ul);
                },
    
    /** Disables the field so the user cannot interact with it. */
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('wui-disabled').find('input,textarea,iframe').attr('disabled','disabled');
                },

    /** What to do when an individual element changes */
    elemChange:    function(elem){ this.val(elem.val()); },
    
    /** Enables the field so the user can interact with it. */
    enable:     function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('wui-disabled').find('.wui-disabled,*[disabled]').removeAttr('disabled');
                },

    /** If buttonStyle = true, the actual radio input is hidden  */
    onRender:   function(){
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
        template:   '<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
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
    elemChange: function() { 
                    this.val(this.calcVal());
                },                    

    /** Runs immediately when the object is created. Adds listeners and styles */
    init:       function(){
                    var me = this;
                    if(me.options.length === 0) me.options.push({val:1,title:''});
                    
                    Wui.Radio.prototype.init.call(me);
                    me.el.removeClass('wui-radio').addClass('wui-checkbox');
                    
                    //steal label if there is only one option
                    if(me.options.length == 1){
                        if(!(me.label && me.label.length))
                            throw('Wui Forms - A Checkbox field ' + (me.name ? '(\'' + me.name + '\')' : '') + ' requires a label if it doesn\'t have options defined.');
                        me.el.find('li label').html(me.label);
                        me.lbl.label.html('');
                        me.el.css({paddingTop:0, paddingBottom:0});
                    }
                },
    getVal:     function(){ return this.calcVal(); },
    setVal:     function(sv){
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
    validTest:  function(){ if(this.required && this.val() === 0) return false;    return true; }
});

/**
 * Wui.Combo
 * =================================================================================================
 * (a combination of a select and an autocomplete)
 *
 * 
 * Functionality
 * -------------
 *
 * - Combo requires valueItem and titleItem attributes. 
 *     - If consuming a `<select>` off the DOM (see below), these values will be set automatically.
 *     - By default, these will automatically create a template of '<li>{titleItem}</li>'
 * - Custom templates can be defined for the option list items on the Combo, and follow the rules 
 *   of the Wui.Template object.
 * - Multiple selection is not supported at this time
 * - Arrow button can be removed to make the control appear more like an autocomplete
 *
 * 
 * - Can be asynchronously loaded from a remote data store and search locally
 *     - Configs: url, [params], autoLoad = true
 * - Can be asynchronously loaded from a remote data store and search asynchronously
 *     - Configs: url, [params], searchLocal = false
 * - Can assume the position and values of a `<select>` element on the DOM
 *     - Data set in the object definition, OR
 *     - Data will be created from a select box
 *         - Combo construction will take the form `new Wui.Combo(<config object>, <select box>)`.
 *         - Disabled options will have a value of `null`.
 *         - Options without a value attribute will get the value of the text they contain.
 *         - Options with a blank value, or no value attribute and no text sub-node, will return
 *           a value of "".
 *         - Data will be in the form:
 *             ```
 *             {
 *                 value: '<value attribute, or other as described above>', 
 *                 label: '<text sub-node of the option tag>'
 *             }
 *             ```
 *
 * Interactions
 * ------------
 *
 * - Clicking:
 *     - When the Combo's field doesn't have focus, clicking on the field will open the dropdown
 *       and select all of the text currently in the field.
 *     - Clicking the Combo's field when it does have focus merely moves the cursor within the field.
 *     - Clicking the Combo's arrow button toggles the dropdown open and shut
 *     - Clicking on a menu item in the option list will select the item, fill the field with the
 *       selected item, close the drop down, and put the cursor at the end of the field.
 *     - Clicking away from the Combo will close the option list (if open) and remove focus.
 * 
 * - Hovering
 *     - Hovering over an item in the option list will also place the text of the 'titleItem' in the
 *       text field, if the item is not selected, when the user hovers out the text field will revert
 *       to whatever text was in it before.
 * 
 * - Typing
 *     - Tabbing
 *         - Tabbing into the drop down will select the text in the field, but will not 
 *           open the dropdown.
 *         - Tabbing when the field has focus will set the current selection and move away from the
 *           field to the next tab item.
 *             - If the option list is open, it will be closed
 *             - If the field is blank, and there is a blank item in the options, the field will be 
 *               blanked. Otherwise the field will revert to the currently selected item. Any text in
 *               the text field from a hover (see 'Hovering' above) will revert to the selected item.
 *     - Arrow Down
 *         - If the option list is open, the selection will move within the list, filling the field
 *           with the 'titleItem' of the selected item. When the selection reaches the bottom of the 
 *           list an arrow down press will remove selection and focus will be set on the field with
 *           whatever value was in the field the last time the field had focus. An arrow down from
 *           focus in the field will select the first item in the options list.
 *         - If the option list is closed, an arrow up or down will move through the options list, 
 *           changing the field to the 'titleItem' of the currently selected (but unseen) option, and
 *           also set the field to the value of that item.
 *     - Arrow Up
 *         - Same functionality of arrow down in reverse order
 *     - Enter
 *         - If the options list is open, enter key will set the value of the field to the currently 
 *           selected item in the option list, and close the list.
 *         - If the options list is closed, enter has no effect.
 *     - Escape
 *         - Sets the value of the field back to its previous value, and closes the options list 
 *           if it's open.
 *     - Any other typing will cause a search of the options list.
 *         - Local searching (determined by the searchLocal attribute, default: true) will cause an
 *           unbounded search of the DOM text of the items in the options list.
 *         - Remote searching will send requests to the server, and will be at the mercy of the rules
 *           of the search method on the server.
 *             - Causes a redraw of the options list
 *             - Matching text in the DOM elements of the options list will be hilighted, but may not
 *               necessarily match the rules of the remote search. This is not an error, but care
 *               should be taken to make sure hilighting is not spotty or nonsensical if/when
 *               rules mismatch.
 *             - The search parameter passed to the back-end is the value of the field, and by default
 *               it's named 'srch'. It can be changed via the `searchArgName` prameter.
 *             - A minimum number of characters can be set before a remote search will fire so that
 *               there are not too many search results. This is set with the `minKeys` attribute. The
 *               default value though is 1.
 *         - If there are no matching results, by default 'No Results.' will be shown in the options
 *           list. This message can be changed with the `emptyMsg` attribute.
 */
Wui.Combo = function(args){
    $.extend(this, {
        /** Whether to load remote elements the moment the combobox 
        is created, or wait to load remote elements until a search 
        value is entered. */
        autoLoad:   false,

        /** CSS class to place on the drop-down element. */
        ddCls:      '',

        /** Text to display in the drop-down when no results are returned. */
        emptyMsg:   'No Results.',

        /** The DOM element for the field */
        field:      $('<input>').attr({type:'text'}),
        
        /** Whether to filter results at all */
        filterField:true,

        /** When set to true, the field will be blanked out if an option from the drop down is not selected. */
        forceSelect:false,

        /** Minimum number of characters entered before the combo will 
        filter remotely. */
        minKeys:    1,

        /** The name of the search parameter that will be sent to the 
        server for remote filters. */
        searchArgName:'srch',

        /** Whether to filter the drop-down amidst the locally loaded 
        results or to go to the server. */
        searchLocal:true,

        /** Whether or not to show the drop-down button */
        showDD:     true,

        /** @required The key in the data that will be used for display 
        in the combo box. */
        titleItem:  null,

        /** @required The key in the data that will be used as the 
        value for the combo when an item is selected. */
        valueItem:  null
    },args,{
        /** Turns off the ability to select multiple items. 
        TODO: Revisit this one */
        multiSelect:false
    }); 

    // Create template when one hasn't been defined
    if( !(this.hasOwnProperty('template') && this.template !== null && this.template !== undefined) 
        && this.hasOwnProperty('valueItem') 
        && this.hasOwnProperty('titleItem') 
        && this.valueItem 
        && this.titleItem
    )
        this.template = '<li>{' +this.titleItem+ '}</li>';

    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.FormField(), new Wui.DataList(), {
    /** Closes the drop-down menu. */
    close:      function(){ 
                    this._open = false;
                    this.dd.hide();
                },

    /** @param {string} srchVal    A search term
    Hilight text within the search results given the search term. Only works
    when there is not a custom template defined. */
    hilightText:function(srchVal){
                    var me = this;

                    function clearHilight(obj){
                        return obj.find('.wui-highlight').each(function(){
                            $(this).replaceWith($(this).html());
                        }).end();
                    }
                    
                    function hilightText(obj){
                        if (obj.children().length) {
                            obj.children().each(function(){
                                hilightText($(this));
                            });
                        }
                        else {
                            obj.html(
                                obj.text().replace( new RegExp(srchVal,"ig"), function(m){
                                    return '<span class="wui-highlight">' +m+ '</span>';
                                })
                            );
                        }
                        
                        return obj;
                    }

                    me.dd.children().each(function(){
                        var itm = $(arguments[1]);

                        if(itm.text().toUpperCase().indexOf(srchVal.toUpperCase()) >= 0)    hilightText(itm).show();
                        else                                                                clearHilight(itm).hide();
                    });

                    Wui.positionItem(me.field,me.dd);
                },

    /** Method that runs when the object is initiated */
    init:       function(){
                    var me = this;

                    // Set up object
                    Wui.FormField.prototype.init.call(me);
                    me.el.addClass('wui-combo ' + (me.idCls = Wui.id()));
                    me._open = false;
                    me.identity = me.valueItem;
                    if(typeof me.blankText !== 'undefined')
                        me.setBlankText(me.blankText);
                    

                    // Place field elements
                    me.append( me.wrapper = $('<div>').addClass('wui-combo').append(me.setListeners(me)) );
                    $('body').append( 
                        me.dd = $('<ul>').addClass('wui-combo-dd ' + me.ddCls).on('mousewheel scroll', function(evnt){ evnt.stopPropagation(); })
                    );

                    // Listeners - These listeners must stop propagation or else they
                    // will trigger events for their containing DataLists (like grids with
                    // combos in the tbar)
                    me.el.on({
                        wuichange:  function(evnt,combo,el,rec,selection){
                                        var text = (selection.length) ? rec[combo.titleItem] : combo.previous;
                                        Wui.Text.prototype.fieldText.call(me,text);
                                        evnt.stopPropagation();
                                    },
                        click:      function(evnt){ evnt.stopPropagation(); },
                        wuiselect:  function(evnt){ evnt.stopPropagation(); },
                        wuideselect:function(evnt){ evnt.stopPropagation(); },
                        datachanged:function(evnt){ evnt.stopPropagation(); },
                        wuidblclick:function(evnt){ evnt.stopPropagation(); }
                    });
                    
                    // Disable "mobile" functionality that would mess up searching
                    me.field.attr({
                        autocomplete:       "off",
                        autocorrect:        "off",
                        autocapitalize:     "off",
                        spellcheck:         "false"
                    });

                    // Create Dropdown Button
                    if(me.showDD){
                        me.ddSwitch = new Wui.Button({
                            click:      function(){
                                            if(me._open) me.close();
                                            else         me.open();
                                            me.field.focus();
                                        },
                            text:       '',
                            tabIndex:   -1,
                            appendTo:   me.wrapper,
                            cls:        'field-btn dd-switch'
                        });
                        me.ddSwitch.place();
                        me.ddSwitch.el.mousedown(function(){ me.isBlurring = false; });
                    }
                },

    /** Overrides the Wui.itemSelect and simplifies events for combo. */
    itemSelect: function(itm, silent){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

                    me.dd.find('.wui-selected').removeClass('wui-selected');
                    itm.el.addClass('wui-selected');
                    me.selected = [itm];
                    
                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },

    /** Overrides the Wui.DataList make and adds listeners to objects. */    
    make:       function(){
                    var me = this;

                    me.elAlias = me.dd.empty().removeClass('wui-spinner');
                    Wui.DataList.prototype.make.apply(me,arguments);
                    
                    if(me.data.length === 0)
                        me.elAlias.html(me.emptyMsg);

                    me.dd.children()
                    .off('click')
                    .bind('touchstart',function(evnt){ 
                        me.itemSelect($(this).data('itm')); 
                        me.isBlurring = false; 
                    }).on({
                        mouseenter: function(){ me.itemSelect($(this).data('itm')); },
                        mousedown:  function(){ me.isBlurring = false; },
                        click:      function(){ me.set(); me.field.focus(); }
                    });

                    if(me.previous && me.previous.length)
                        me.hilightText(me.previous);

                    me.dd.on('mousedown',function(){ me.isBlurring = false; });

                    // Select a pre-applied value if it exists
                    if(me.value && me.field.val().length == 0){
                        var selectedItm = me.selectBy(me.valueItem, me.value);
                        
                        if(!selectedItm)    me.notFound(me.value);
                        else                me.set();
                    }

                    Wui.positionItem(me.field,me.dd);
                },

    /** Overrides the Wui.DataList modifyItem to add data to the element. */ 
    modifyItem: function(itm){ return itm.el.data('itm',itm); },
    
    /**
    @param    {number or string} val The current value of the control
    Empty function meant to be overridden to handle cases where the value of
    the field is not in the list of possible values. Needs to call
    this.setData(data) where data is the value to load on the grid.
    */
    notFound:   function(val){},

    /** Loads data via the appropriate method when added to the DOM */
    afterRender:function(){
                    if(this.afterRendered !== true){
                        Wui.FormField.prototype.onRender.apply(this,arguments);

                        // Loads data per the method appropriate for the object
                        if(this.autoLoad && this.url !== null)  this.loadData();
                        else if(this.url === null)              this.make();

                        this.afterRendered = true;
                    }
                },

    /** Override Wui.Datalist.onRender to make it do nothing */
    onRender:   function(){},

    /** Opens the drop down */
    open:       function(){
                    var me = this, 
                        width = (me.field.innerWidth() < 100) ? 100 : me.field.innerWidth();

                    me._open = true;

                    // Clear the drop down when it loses focus
                    $(document).one('click','*:not(.' +me.idCls+ ' input)',function(evnt){ 
                        if(evnt.target !== me.field[0]) me.close(); 
                    });

                    // Scrolling within a dropdown causes crazy stuff to happen on the body,
                    // so save the body overflow state and momentarily set it to be unscrollable.

                    $('body').append(me.dd.width(width).show());
                    Wui.positionItem(me.field,me.dd);
                    me.scrollToCurrent();
                },

    /** @param {string} srchVal    A search term
    Searches locally within the drop-down's data for the srchVal, otherwise 
    if searchLocal is false, the data is searched remotely. */
    searchData: function(srchVal){
                    var me = this, oldSearch = me.previous || undefined;

                    if(me.filterField){
                        me.previous = srchVal;
                        
                        if(me.searchLocal){
                            me.hilightText(srchVal);
                        }else{
                            me.clearSelect();
                            if((srchVal.length >= me.minKeys || srchVal.length === 0) && me.previous != oldSearch){
                                if(srchVal.length === 0)
                                    me.val(null);

                                // me.open();
                                me.dd.addClass('wui-spinner');

                                var srchParams = {};
                                srchParams[me.searchArgName] = srchVal;
                                me.loadData(srchParams);
                            }
                        }  
                    }
                },

    /**
    @param    {number} num Direction to go to select an ajacent value [1,-1]
    Selects the list item immediately before or after the currently selected item,
    works on the filtered visibility if the drop down is open.
    Overrides Wui.DataList.selectAjacent
    */
    selectAjacent:function(num){
                    var me = this,
                        selector = me._open ? ':visible' : '',
                        container = me.elAlias || me.el,
                        theEnd = (num == 1) ? ':first' : ':last',
                        fn = (num == 1) ? 'nextAll' : 'prevAll',
                        itm = me.selected.length ? me.selected[0].el[fn](selector+':first') : container.children(selector+theEnd);

                    return me.selectByEl(itm);
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
                    return retVal;
                },

    /**
    Overrides Wui.DataList selectByEl because the scrollToCurrent added weird scrolling on closed dropdowns
    @param    {jQuery Object} el An object that will match an element in the DataList.
    Selects the matching DataList item.
    */
    // selectByEl: function(el){
    //                 var me = this, retVal = undefined;

    //                 me.itemSelect(retVal = me.getItemByEl(el));
                    
    //                 return retVal;
    //             },

    /** Sets the value of the drop down to the value of the selected item */
    set:        function(){
                    var me = this;

                    if(me.selected[0] && me.value != me.selected[0].rec)
                        me.val(me.selected[0].rec);
                    if(me._open)
                        me.close();
                },

    /** Sets blank text on the field */
    setBlankText:function(bt){ 
                    Wui.Text.prototype.setBlankText.apply(this,arguments); 
                },

    /** @param {Wui Object} t Wui Object to add listeners to its field.
    Sets listeners on the field that give it combo-box-like interactions */    
    setListeners:function(t){
                    // t = the combo field
                    return t.field.on({
                        keydown: function(evnt){
                            //clear the value if the user blanks out the field
                            if(t.field.val().length === 0) t.value = null;

                            switch(evnt.keyCode){
                                case 13:    evnt.preventDefault();              break;  // enter
                                case 40:    evnt.preventDefault(); move(1);     break;  // downkey
                                case 38:    evnt.preventDefault(); move(-1);    break;  // upkey
                                case 9:     t.set();                            break;  //tab
                                case 27:                                                // escape
                                    evnt.preventDefault(); 
                                    t.field.val(t.previous);
                                    t.close();
                                break;
                            }
                            
                            evnt.stopPropagation();
                        },
                        keyup: function(evnt){
                            if(evnt.keyCode == 13){  // enter
                                evnt.preventDefault(); 
                                t.set();
                            }
                            evnt.stopPropagation();
                        },
                        input: function(evnt){
                            if(!t._open) t.open();
                            t.searchData(this.value);
                        },
                        focus: function(evnt){
                            t.isBlurring = undefined;
                            evnt.stopPropagation();
                        },
                        blur: function(evnt){
                            if(t.isBlurring !== false){
                                t.close();
                            }else{
                                // IE needs some time
                                setTimeout(function(){ t.field.focus(); }, 10);
                                // evnt.preventDefault();
                            }
                        }
                    });

                    function move(dir){
                        var itm = null;

                        if(t.selected.length){
                            var edgeSel = (dir == 1) ? ':last' : ':first',
                                selector = t._open ? ':visible' : '',
                                onEdge = (t.elAlias || t.el).children(selector+edgeSel)[0] == t.selected[0].el[0];

                            if(onEdge)  t.clearSelect();
                            else        itm = t.selectAjacent(dir);
                        }else{
                            itm = t.selectAjacent(dir);
                        }

                        // Actually change the value if the drop-down isn't open
                        if(!t._open){
                            if(itm !== null)    { t.set(); }
                            else                { t.val(null); t.field.val(t.previous); }
                        }
                    }
                },

    /** Allows the value to be set via a simple or complex value */
    setVal:     function(sv){
                    var me = this;

                    me.value = sv;

                    if(sv === null){
                        me.clearSelect();
                        return sv;
                    }else if(typeof sv == 'object'){
                        return me.selectBy(me.valueItem,sv[me.valueItem]);
                    }else{
                        return me.selectBy(me.valueItem,sv);
                    }
                },

    /** Returns only the simple value of an item */
    getVal:     function(){
                    return (this.value !== null && typeof this.value[this.valueItem] != 'undefined') ? this.value[this.valueItem] : this.value;
                }
});

/**
The link object contains three fields, one for the actual URL, one for the text of the link (if different from the URL) and a combo for
whether the link opens in a new window/tab or the same window.
*/
Wui.Link = function(args){ 
    $.extend(this,{
        invalidMsg: 'The value for \'' + ((this.label) ? this.label : (this.args && this.args.name) ? 
                        this.args.name :
                            'a link field') + '\' is not a properly formatted link.',
        fullPath: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        relativePath: /(\/|\/([\w#!:.?+=&%@!\-\/]))/
    },args);
    this.init();
};
Wui.Link.prototype = $.extend(new Wui.FormField(),{
    /** Builds a preview of the link while it is being entered - gives feedback/validation to the user  @private */
    buildOutput:function(v){
                    var me = this,
                        val = v || me.value;

                    if(me.outputFld === undefined)
                        me.append(me.outputFld = $('<div>').attr({tabindex:-1}).addClass('feedback'));

                    if(me.testLink()){
                        var tp = new Wui.Template({
                            data:       val, 
                            template:   '<span>Preview:</span> <a href="{uri}" target="{target}" '+
                                        'class="{((target == "_blank") ? "uri-new-win" : "")}">{title}</a>'
                        });
                        me.outputFld.html(tp.make());
                    }else{
                        if(val.uri && val.uri.length > 2)
                            me.outputFld.html('Your link is improperly formatted.');
                        else
                            me.outputFld.empty();
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
                   
                    me.urlField.field.keyup(function() {
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
                            me.buildOutput.call(me);
                        })
                        .on('focus',null, itm, function(e){
                            $.each(flds,function(i,field){ field.el.removeClass('wui-link-focus'); });
                            e.data.el.addClass('wui-link-focus');
                        });
                    });
                },       
        
    /** Test for whether the link is a valid URL whether a full or relative path */
    testLink:   function isUrl() {
                    return (this.fullPath.test(this.value.uri) || this.relativePath.test(this.value.uri));
                },
                
    getVal:     function(){
                    return this.value;
                },
    setVal:     function(sv){
                    $.extend(this.value,sv);
                    this.urlField.val(this.value.uri);
                    this.titleField.val(this.value.title);
                    this.targetField.val(this.value.target);
                    this.buildOutput();
                },
    
    /** Overrides the Wui.FormField function and provides added validation */
    validTest:  function(){ if(this.required && !this.testLink()) return false; return true; }
});

/**
@event calupdate Fires on the document when the calendar redraws (initial appearance, or month change) and is namespaced to the name of the control ('calupdate.name'). Passes (event, datetime obj, calendar el, date)

The Datetime field allows the user to enter a date in any format 
they choose, as well as providing a date picker. When dates are 
changed, any time information is retained.

In order to eliminate data entry issues, feedback about whether 
the date was understood by the software is given instantly.

Dates can be entered in a variety of formats of which what is 
below is a very small sample:

"Five months after 9/20/2013"
"Yesterday"
"05/26/1983"
"2012-12-12"
"today at noon"
"tomorrow at five thirty pm"
"10-9-2013 5:30 PM"
"ten months from now"

* Borrowed from Date.js and tweaked a TON - See license below, and check out the full library if you're doing tons with dates
* Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
* License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
* Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
*/
Wui.Datetime = function(args){ 
    $.extend(this,args,{ 
        field:      $('<input>').attr({type:'text'}),

        /** The date furthest in the past that this control will accept as valid. */
        minDate:    null,

        /** The date furthest in the future that this control will accept as valid. */
        maxDate:    null
    });
    this.init();
};

// If date has already been extended, dont' attempt to extend it again
if(Wui.dateExt !== true){
    Wui.dateExt = true;
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
        isLeapYear:             function(year) {
                                    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
                                },
        getDaysInMonth:         function(year, month) {
                                    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                                },
        getTimezoneOffset:      function(s, dst) {
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
        getDayOfYear:   function(){
                            var start = new Date(this.getFullYear(), 0, 0),
                                diff = this - start,
                                oneDay = 1000 * 60 * 60 * 24,
                                day = Math.floor(diff / oneDay) - 1; // -1 to make it zero based

                            return day;
                        },
        getDaysInMonth: function() {
                            return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
                        },
        addMilliseconds:function(value) {
                            this.setMilliseconds(this.getMilliseconds() + value);
                            return this;
                        },
        addSeconds:     function(value) {
                            return this.addMilliseconds(value * 1000);
                        },
        addMinutes:     function(value) {
                            return this.addMilliseconds(value * 60000);
                        },
        addHours:        function(value) {
                            return this.addMilliseconds(value * 3600000);
                        },
        addDays:        Date.prototype.addDays = function(value) {
                            return this.addMilliseconds(value * 86400000);
                        },
        addWeeks:       function(value) {
                            return this.addMilliseconds(value * 604800000);
                        },
        addMonths:      function(value) {
                            var n = this.getDate();
                            this.setDate(1);
                            this.setMonth(this.getMonth() + value);
                            this.setDate(Math.min(n, this.getDaysInMonth()));
                            return this;
                        },
        addYears:       function(value) {
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
        getDayName:     function(abbrev) {
                            return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
                        },
        getMonthName:   function(abbrev) {
                            return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
                        },
        _toString:      Date.prototype.toString,
        toString:       function(format) {
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
}
/** End borrowing from date.js */

Wui.Datetime.prototype = $.extend(new Wui.Text(),{
    second:         1e3,
    minute:         6e4,
    hour:           36e5,
    day:            864e5,
    days:           ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'],
    shortDays:      ['sun','mon','tue','wed','thu','fri','sat'],
    months:         ['january','february','march','april','may','june','july','august','september','october','november','december'],
    shortMonths:    ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
    
    /** Array of feedback words or phrases to randomly display when a user's input is not understood by the control */
    sarcasmArray:   ['Not quite.','Huh?','Nope','Arg..','Sorry','What?','Bleck.','Nuh-uh.','Keep Trying.','No Entiendo.'],
    
    /** String specifying the format that will be displayed to the user. */
    dispFormat:     'ddd MM-dd-yyyy h:mm tt',

    /** String for format of the date returned from the datepicker. */
    dtFormat:       'MM-dd-yyyy h:mm tt',

    /** When true, locks the datetime control to only deal in dates without times. If the user specifies custom values for dispFormat and dtFormat this setting has no effect. */
    dateOnly:       false,

    /**
    @param {string} overrideText    Text that will absolutely be displayed instead of the formatted version of the field's value
    @return The value passed in, or the calculated value of the datetime
    Give feedback to the end user about the data they entered. 
    */
    displayDate:    function(overrideText){
                        var me = this;
                        
                        // process current date value
                        if(overrideText !== undefined){ me.displayDiv.html(overrideText); return overrideText; }
                        if(me.value === '' || (!me.value)) { return null; }
                        
                        //validation for min and max
                        if(me.minDate && me.value < me.minDate)         me.displayDiv.html(me.value.toString(me.dtFormat) + ' is before the min date.');
                        else if (me.maxDate && me.value > me.maxDate)   me.displayDiv.html(me.maxDate.toString(me.dtFormat) + ' is past the max date.');
                        else                                            me.displayDiv.html(me.value.toString(me.dispFormat));
                        
                        return  me.value.toString(me.dtFormat);
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

                        // Limit field to dates only if specified
                        if(me.dateOnly){
                            if(!me.hasOwnProperty('dispFormat')) me.dispFormat = 'ddd MM-dd-yyyy';
                            if(!me.hasOwnProperty('dtFormat')) me.dtFormat = 'MM-dd-yyyy';
                        }

                        // Add datepicker
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
                                    me.calendar = me.makeCalendar(undefined,function(year,month,day){
                                        me.value = (me.validDate(me.value)) ?
                                            new Date(year,month,day,me.value.getHours(),me.value.getMinutes()) :
                                                new Date(year,month,day);
                                        me.val(me.displayDate());
                                    }).click(function(){return false;})
                                );

                                // Clear the calendar when the user moves away from it
                                $(document).one('click',function(){
                                    $('.wui-cal').remove(); me.calendar = undefined;
                                });

                                // Position calendar to ensure it will be seen
                                Wui.positionItem(me.field,me.calendar);
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
                        $.each(numberRepl,function(i){
                            words = words.replace(new RegExp('(^|[ ]|-)' + i + '(-|[ ]|$)','g'),' ' + numberRepl[i] + ' ');
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
    makeCalendar:   function(dt, onSelect, controlVal) {
                        controlVal = me.validDate(controlVal) ? controlVal : me.value;
                        
                        var me = this,
                            today = new Date(),
                            calDate = dt || (me.validDate(controlVal) ? controlVal : today),
                            dn = (me.name) ? '.' + me.name : '',
                            calendar = $('<div>').addClass('wui-cal');

                        calendar.append(genHTML(calDate));
                        // Fire event for other controls to respond to calendar reflow
                        $(document).trigger($.Event('calupdate' + dn), [me, calendar, calDate]);
                        
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
                                    if (day <= monthLength && (i > 0 || j >= startingDay)){
                                        var dayDt = new Date(year,month,day),
                                            disableCls = ((me.minDate && dayDt < me.minDate) || me.maxDate && dayDt > me.maxDate) ? ' wui-cal-disabled' : '';
                                        
                                        html += '<a class="wui-cal-day' +disableCls+ '">' +(day++)+ '</a>';
                                    }
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
                                var dir = $(this).hasClass('wui-cal-prev') ? -1 : 1,
                                    newDt = new Date(year, month + dir, 1);

                                calendar.empty().append(genHTML(newDt));
                                // Fire event for other controls to respond to calendar reflow
                                $(document).trigger($.Event('calupdate' + dn), [me, calendar, newDt]);
                            });
                            
                            if(controlVal && controlVal.getMonth && controlVal.getMonth() == month && controlVal.getFullYear() == year)
                                tbl.find('a:contains(' +selectDy+ '):first').addClass('wui-selected');
                            
                            if(today.getMonth() == month && today.getFullYear() == year)
                                tbl.find('a:contains(' +today.getDate()+ '):first').addClass('wui-highlight');

                            tbl.find('td a:not(.wui-cal-disabled)').click(function(){
                                var dt = $(this),
                                    day = parseInt(dt.text()),
                                    info = dt.parents('[wui-month]'),
                                    month = parseInt(info.attr('wui-month')),
                                    year = parseInt(info.attr('wui-year'));

                                onSelect(year,month,day);

                                me.calendar.remove(); 
                                me.calendar = undefined;
                            });

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
    Sets additional listeners on the text field, namely to process the date when it changes 
    Arrow keys can now be used to make the date transform up and down */
    setListeners:   function(t){
                        if(t.listnersSet !== true){
                            t.listnersSet = true;
                            return t.field.on('input', function(){ t.processDate(); }).on('keyup',function(evnt){
                                    if(evnt.keyCode == 40 || evnt.keyCode == 38){
                                        var addVal = (t.value instanceof Date) ? (evnt.keyCode == 40) ? 1 : -1 : 0,
                                            dt = (t.value instanceof Date) ? t.value : new Date();

                                        t.value = dt.addDays(addVal);
                                        t.displayDate();
                                        t.field.val(t.value.toString(t.dtFormat));
                                    }
                            });
                        }else{
                            return t.field;
                        }
                    },
    listnersSet:    null,
    
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
                        var me          = this,
                            now         = new Date(),
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
                        var pos = 0, theNum = 0, currNum = 0, nextNum = 0, lastNum = 0, smallerThanNext = false;
                       
                        if(wArray.length == 1){
                            return wArray[0];
                        }else{
                            while(wArray[pos + 1] !== undefined){
                                currNum = parseInt(wArray[pos]);
                                nextNum = parseInt(wArray[pos + 1]);
                                smallerThanNext = this.getM(currNum) <= this.getM(nextNum);
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
                    
    setVal:         function(sv){
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
    validDate:      function(dt){
                        if (dt === null || typeof dt === 'undefined')  return false;
                        else if (typeof dt.getTime !== 'function')     return false;
                        else if(dt.toString() == 'Invalid Date')       return false;
                        
                        return true;
                    }
});

/**
@author Dan Perry (dan.perry@usurf.usu.edu)
An HTML5 file tool than can upload files via ajax.
To upload files via AJAX successfully, the form data must be processed with Wui.forAjaxFileUpload().
See the documentation of Wui.forAjaxFileUpload() for more information.

Because FileBasic can upload via AJAX, it doesn't require the tight server coupling that
Wui.File() does, and thus doesn't have to be extended to be immediately useful.
*/
Wui.FileBasic = function(args) {
    $.extend(this,{
        /** Sets the accept attribute on the html element */
        accept:     null,

        /** When set to true, allows the user to select multiple files to upload */
        multiple:   false,
        field:      $('<input>').attr({type:'file'})
    },args);
    this.init();
};

Wui.FileBasic.prototype = $.extend(new Wui.Text(), {
    disable:function(){
                    this.disabled = true;
                    this.field.attr('disabled','true');
            },
    enable: function(){
                    this.disabled = false;
                    this.field.removeAttr('disabled');
            },
    init:   function(){
                var me = this;
                Wui.Text.prototype.init.call(me);
                me.append(me.field);

                if(me.multiple)
                    me.field.attr('multiple', true);

                if(me.accept && me.accept.length)
                    me.field.attr('accept', me.accept);

                me.field.change(function(){
                    me.field.trigger($.Event('filechanged'), [me, me.field[0].files]);
                });
            },
    validTest:function(v){ 
                if(this.required) 
                    return (v !== null && v.length !== 0);

                return true;
            },
    getVal: function(){
                return this.field[0].files;
            },
    setVal: function(sv){
                if(sv === null)
                    this.field.val('');
            }
});

/**
@author Stephen Nielsen (stephen.nielsen@usurf.usu.edu)
Creates a form field for uploading files. By the nature of file uploads and their tight pairing 
to a backend server, this control must be extended itself to be used for uploading files.

Because Wui.FileBasic() can upload via AJAX, it doesn't require the tight server coupling that
Wui.File() does, and thus doesn't have to be extended to be immediately useful.
*/
Wui.File = function(args){ 
    $.extend(this,{
        /** @eventhook To perform any functionality before a file is uploaded @eventhook */
        beforeSubmit:   function(){},
        
        /** A value to send to the server where it will filter/block file uploads according to file type */
        fileTypeFilter: null,
        
        /** The name of the field that contains the file */
        upFieldName:    'fileupload',
        
        /** Additional parameters to send to the server besides the file*/
        params:         {},
        
        /** @eventhook To be performed when a file is successfully uploaded. @eventhook */
        upSuccess:      function(){},
        
        /** The server-side page where the file will be uploaded. */
        url:            '',
        
        /** The name of the parameter of the file title. */
        upTitleName:    'title'
    },args,{
        field:          $('<input>').attr({type:'text'})
    });
};
Wui.File.prototype = $.extend(new Wui.Text(),{
    /** Fires when the 'X' button is clicked to change the currently selected file to something else. */
    changeClick:function(){
                     //swap buttons
                     this.changeBtn.hide();
                     this.upBtn.show();
                     this.fileFrm.show();
                     this.field.removeClass().focus();
                },
    
    /** Set up the file upload control. */
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me);

                    // Wrap the field in order to add absolutely positioned buttons
                    me.append(me.wrapper = $('<div>').addClass('wui-file').append(me.field.off('blur')));
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
                            cls:        'file-change field-btn'
                        }),
                        me.upBtn = new Wui.Button({text:'Browse', cls:'field-btn', click:function(){ me.fileInput.click(); } }),
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
                        me.fileInput = $('<input>').attr({tabIndex:-1})
                        .attr({name:me.upFieldName, type:'file'})
                        .change(function(){ me.submit(); me.field.focus(); })
                    );
                },


    /** Submit the form */
    submit:     function() {
                    var me = this;

                    me.beforeSubmit();
                    
                    //add title to parameters and parameters to the file upload
                    me.params[me.upTitleName] = me.field.val();
                    
                    // for file filtering
                    if(me.fileTypeFilter !== null) me.params.file_type_filter = me.fileTypeFilter;

                    me.field.addClass('has-file uploading').attr('disabled', true).val('uploading...');
                    
                    // add additional paramters before sending
                    me.fileFrm.el.children("input[type!='file']").remove();
                    $.each(me.params, function(key, value) {
                        me.fileFrm.append($('<input>').attr({type:'hidden', name:key, value:value}));
                    });
                    
                    // Submit the actual form
                    me.fileFrm.el.submit(); 
                    
                    // Do something after we are finished uploading
                    me.iframe.el.unbind().load(function() {
                        me.onComplete($('body',me.iframe.el.contents()).text()); //done :D
                    });
                },

    /**
    @param {object} unwrapped The Wui.unwrapData unwrapped results of the file upload.
    This function is for developers to run whatever analysis they desire on the raw output of the file upload.
    @eventhook
    */
    devHook:    function(){},

    /** Fires when the file upload completes and handles errors if any. */            
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
                                me.fieldText('');
                            }else{
                                me.upFailure(d);
                            }
                        }
                    }catch(err){
                        console.log('Upload Error',err,r);
                        me.upFailure(err,r);
                    }
                },

    /** @eventhook Signals the user that there was an upload failure. Can be overridden, but doesn't have to be.*/
    upFailure:  function(e,e2){
                    console.log('Upload Failure',e,e2);
                    this.fieldText('Upload Failure');
                },
    
    /** @return The value of the field, or an empty object is returned. */
    getVal:     function(){ return this.value || {}; },
    
    /** Overrides Wui.FormField.setVal() to work with the file field. @return The value passed in. */
    setVal:     function(sv){
                    this.value = this.value || {};
                    $.extend(this.value,sv);
                    return sv;
                },
    
    /**  Adds callback functionality to Wui.FormField.val() */
    val:        function(sv,callback){
                    var retVal = Wui.FormField.prototype.val.apply(this,arguments);
                    if(this[callback] && typeof this[callback] == 'function') this[callback]();
                    return retVal;
                },
    
    /** Overrides Wui.FormField.valChange, performs similar fuctionality, but adds specific code for showing/hiding buttons. */
    valChange:  function(){
                    var me = this;
                    if(me.value){
                        me.field.addClass('has-file').removeAttr('disabled');
                        me.upBtn.hide();
                        me.fileFrm.hide();
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
@return The Wui.Form that was created by the input. Use the returned value .parent to get the window.

Presents a WUI Form in a modal window.  In its simplest form, just passing in a single 'msg' string will present a window with a text field and the 'msg' as a label for the field. 
The example source contains various configurations: Basic, Input with Title, Input with a single replacement, and a full form.
*/
Wui.input = function(msg, callback, msgTitle, inputs, content){
    // make sure the inputs will be acceptable on the form
    if(inputs){
        if(!inputs.length){
            if(inputs instanceof Wui.FormField || inputs.ftype) inputs = [inputs];
            else                                                inputs = [{ftype:'Wui.Text'}];
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
                            new Wui.Button({text:'Cancel', click:function(){ Msg.closeOkay = true; Msg.close(); }}),
                            new Wui.Button({text:'Submit', click:function(){ Msg.getVal(); }})
            ],
            isModal:    true,
            items:      [inputFrm],
            cls:        'wui-input-window',
            width:      600,
            getVal:     function(){
                            var formData = inputFrm.getData();
                            if(formData){
                                if(callback && typeof callback == 'function'){
                                    var len = Wui.getKeys(formData).length,
                                        cbkResult = callback((len == 1 && formData.inputField) ? formData.inputField : formData);
                                    Msg.closeOkay = (callback === undefined) ? true : cbkResult;
                                }else{
                                    Msg.closeOkay = true;
                                }
                            }
                        },
            doClose:    function(){
                            Msg.closeOkay = true;
                            Msg.close();
                        },
            onWinClose: function(){ return ((Msg.closeOkay !== true) ? false : Msg.closeOkay); }
        });
    Msg.header.splice(0,1);
    return inputFrm;
};


})(jQuery,Wui);



﻿(function($, window, Wui) {

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
                            viewarea = viewarea.replace(/(\?|\&)([^=]+)\=([^&]*)/g,function(match,delim,key,val){
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
    Sets a single view and associated parameters on the URL. Clears out all other views.
    use addView and clearView for more granular control.
    */                
    setView:        function(viewName,params){
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
    addView:        function(viewName,params){
                        var newState = this.getState(),
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
  
  timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
}

return self;
})();

})(jQuery,this);