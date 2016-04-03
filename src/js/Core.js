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