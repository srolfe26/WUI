// Make sure the WUI is defined and doesn't conflict with other versions on the page
var _wuiVar = (function(){
    var wObj,
        members = {
            version:    'wui-lite-1', 
            dict:       []
        },
        /** 
            @param  {object or string}  selector    IN: A selector string (that will be run through jQuery's selector 
                                                    engine to produce a jQuery object), or a jQuery object

            Returns the WUI object matching the selector from a dictionary of all WUI objects. This is a way to acquire 
            a WUI object in memory having only a DOM node representation.
        */
        wuiSelector = function (selector){
            var nodes   =   (selector instanceof jQuery) ? 
                                selector : (typeof selector === 'string') ?
                                    $(selector) : [selector],
                matches =   window[_wuiVar].dict.filter(function ( obj ) { 
                                return $.inArray( obj.el, nodes ) > -1; 
                            }),
                retVal  =   (function(m){
                                var justItms = [];
                                
                                m.forEach(function( obj ){ justItms.push(obj.itm); });

                                return justItms;
                            })(matches);

            return retVal;
        };

    wObj = (typeof Wui === 'undefined') ? 'Wui' : '_w';
    window[wObj] = wuiSelector;
    $.extend( window[wObj], members );

    return wObj;
})();


(function($,window,Wui) {

// Set up a dictionary from which to look up items by their element
Wui.dict = [];

// AJAX error reporting and caching.
$.ajaxSetup({ cache: false });


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
        default:
            return prefixes[n-2] + prop;
    }
};


Wui.fit = function(collection,dim){
    // Ensure the collection is an array of Wui Objects
    if(collection instanceof Array && collection.length > 0){
        var parent      =   (collection[0].parent) ? collection[0].parent : collection[0].el.parent(),
            parentEl    =   (parent.el) ? (parent.elAlias || parent.el) : parent,
            dir         =   (function(){
                                if(typeof dim == 'undefined'){
                                    var d = parentEl.css('flex-direction');

                                    if(typeof d !== 'undefined')
                                        return d;
                                    else
                                        return 'row';
                                }else{
                                    return (dim == 'width') ? 'row' : 'column';
                                }
                            })(),
            fitCount    =   0;

        dim = (dir == 'row') ? 'width' : 'height';

        // Make sure the container is filled properly
        collection.forEach(function(itm){ if(itm.fit >= 0) fitCount += itm.fit; });
        if(fitCount < 1) collection[collection.length - 1].fit = 1;

        // Make the containing element flex
        parentEl.css( 'display', Wui.cssCheck('flex') ).css( Wui.cssCheck('flex-direction'), dir );
       
        // Apply CSS Flex properties
        collection.forEach(function(itm){
            var css = {};
            if(itm.fit >= 0){
                css[Wui.cssCheck('flex-grow')] = itm.fit;
                css[dim] = '';
            }else if(itm.cssByParam === undefined){
                css[dim] = itm[dim];
                css[Wui.cssCheck('flex-grow')] = '';
            }
            
            // Use extend the object returned by cssByParam so that we don't call $.css() too much
            if(itm.cssByParam)  
                $.extend(css,itm.cssByParam(true));

            $(itm.el).css(css);
        });
    }else{
        console.log('Improper collection specified', arguments, arguments.callee.caller);
    }
};


Wui.forAjaxFileUpload = function(obj,addIndex){
    var a = 0, x = 0, formData = new FormData();                                                                    

    // Adds all of the keys in obj to formData
    for (a in obj) {
        if(obj[a] instanceof window.FileList) {
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


Wui.getKeys = function(obj){
    var retArray = [];
    if(obj)
        $.each(obj,function(key){ retArray.push(key); });
    return retArray.sort();
};


Wui.id = function(prefix){
    if(Wui.idCounter === undefined) Wui.idCounter = 0;
    return ((prefix && prefix.length !== 0) ? prefix + '-' : 'w121-') + Wui.idCounter++;
};


Wui.isPercent = function(){
    return (arguments[0] && arguments[0].indexOf && arguments[0].indexOf('%') != -1);
};

/* getMaxZ() is a plugin defined in plugins.js */
Wui.maxZ = function(){ 
    return $.getMaxZ();
};

Wui.doSort = function(sortArray,depth,a,b){ 
    /** 
    Recursive function for sorting on multiple columns @private
    @param {Array of Objects}   sortArray   Modified sorters array
    @param {number}             depth       Depth of the recursive call
    @param {number}             a           First item to compare
    @param {number}             b           Second item to compare
    
    @return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
    */

    if(sortArray.length > 0) {
        var col = sortArray[depth],
            compA = a[col.dataItem],
            compB = b[col.dataItem];
            
        //get the direction of the second sort
        var srtVal = (col.order == 'asc') ? 1 : -1;
        
        // perform the comparison based on 
        var compare = 0;
        switch(col.dataType) {
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
        
        if(compare !== 0 || sortArray[depth + 1] === undefined) {
            return compare * srtVal;
        } else {
            return me.doSort(sortArray,depth + 1,a,b);
        }                                                       
    }else{
        return (a['wuiIndex'] > b['wuiIndex']) ? 1 : -1;
    }
};


Wui.percentToPixels = function(el,percent,dim){
    var parent = el.parent(),
        useWindow = (parent[0] === $(window)[0] || parent[0] === $('html')[0] || parent[0] === $('body')[0]),
        parentSize = (useWindow) ? ((dim == 'height') ? $.viewportH() : $.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
};


Wui.positionItem = function(parent,child){
    var win = $(parent).closest('.w121-window');
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

    // If we we are not in a dialog window then add the scrollTop in case they have scrolled down.
    if(win.length == 0) {
        top += $(window).scrollTop();
    }

    child.css({
        left:       (plRight) ? ofst.left + parent.outerWidth() - cWidth : ofst.left,
        top:        (plBelow) ? top + parent.outerHeight() : top - ($.isNumeric(cHeight) ? cHeight : child.outerHeight()),
        height:     cHeight,
        position:   fxdOrAbs,
        zIndex:     Wui.maxZ()
    });
};


Wui.randNum = function(lower,upper) {
    upper = upper - lower + 1 ;
    return ( lower + Math.floor(Math.random() * upper) );
};


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


Wui.unwrapData = function(r){
    var me          = this,
        dc          = me.hasOwnProperty('dataContainer') ? me.dataContainer : Wui.Data.prototype.dataContainer,
        tc          = me.hasOwnProperty('totalContainer') ? me.totalContainer : Wui.Data.prototype.totalContainer,
        response    = (dc && r[dc]) ? r[dc] : r,
        total       = (tc && r[tc]) ? r[tc] : response.length;
    
    return {data:response, total:total};
};


}(jQuery,this,window[_wuiVar]));
