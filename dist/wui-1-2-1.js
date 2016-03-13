// verge 1.9.1+201402130803
// https://github.com/ryanve/verge
// MIT License 2013 Ryan Van Etten
!function(n,e,t){"undefined"!=typeof module&&module.exports?module.exports=t():n[e]=t()}(this,"verge",function(){{var n={},e="undefined"!=typeof window&&window,t="undefined"!=typeof document&&document,i=t&&t.documentElement,r=e.matchMedia||e.msMatchMedia,u=r?function(n){return!!r.call(e,n).matches}:function(){return!1};n.viewportW=function(){var n=i.clientWidth,t=e.innerWidth;return t>n?t:n},n.viewportH=function(){var n=i.clientHeight,t=e.innerHeight;return t>n?t:n}}return n.mq=u,n.matchMedia=r?function(){return r.apply(e,arguments)}:function(){return{}},n});jQuery.extend(verge);

/*! Wui 1.2.1
 * Copyright (c) 2015 Stephen Rolfe Nielsen (rolfe.nielsen@gmail.com)
 *
 * @license MIT
 * http://www.wui-js.com/wui-1-2-1/license.html
 */ 

(function($) {
    $.getMaxZ = function(){
        var bodyElems = $('body *'),
            useElems = bodyElems.length < 2500 ? bodyElems : $('body > *, [style*="z-index"]'),
            topZ =  Math.max.apply(null, 
                        $.map(useElems, function(e) {
                            if ($(e).css('position') != 'static')
                                return parseInt($(e).css('z-index')) || 0;
                        })
                    );
        return ($.isNumeric(topZ) ? topZ : 0) + 1;
    };
})(jQuery);

(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({
            handle:"",
            cursor:"move"
        }, opt);

        var $el = (opt.handle === "") ? this : $(this.find(opt.handle)[0]);

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            var $drag = (opt.handle === "") ? $(this).addClass('draggable') :
                            $(this).addClass('active-handle').parent().addClass('draggable'),
                z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;

            $drag.css('z-index', $.getMaxZ()).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });

            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "")   $(this).removeClass('draggable');
            else                    $(this).removeClass('active-handle').parent().removeClass('draggable');
        });

    };
})(jQuery);

// A simple resizable plugin for jQuery
(function($) {
    $.fn.resizes = function(opt) {
        var $obj = $(this), startX, startY, startWidth, startHeight;

        opt = $.extend({
            anchored:   false,
            minWidth:   0,
            minHeight:  0,
            direction:  'se',
            resizeStart:null,
            duringResize:null,
            afterResize:null
        }, opt);

        var isSE = (opt.direction == 'se'),
            resizeCls = isSE ? 'resize-nub' : 'resize-bar';

        return $obj.css('overflow','visible')
        .mousedown(function(){
            startWidth = $obj.outerWidth();
            startHeight = $obj.outerHeight();
        })
        .append(
            $('<div>').addClass(resizeCls)
            .click(function(evnt){ evnt.stopPropagation(); })
            .mousedown(function(e){
                var startLeft = parseInt($obj.css('left')),
                    startTop = parseInt($obj.css('top'));

                startX = e.clientX;
                startY = e.clientY;

                $obj.addClass('w121-resizing').css({ flex:'', width:$obj.css('width'), height:$obj.css('height') });

                if(typeof opt.resizeStart == 'function')
                    opt.resizeStart($obj);

                $(document).off('mousemove.resizes');
                $(document).on('mousemove.resizes', function(e2){
                    var xDif =      e2.clientX - startX,
                        yDif =      e2.clientY - startY,
                        newWidth =  startWidth + xDif * (opt.anchored ? 1 : 2),
                        newHeight = isSE ? startHeight + yDif * (opt.anchored ? 1 : 2) : $obj.css('height'),
                        startL =    (function(){
                                        if(newWidth < opt.minWidth){
                                            xDif = 0;
                                            newWidth = opt.minWidth;
                                            return parseInt($obj.css('left'));
                                        }else{ return startLeft; }
                                    })(),
                        startT =    (function(){
                                        if(newHeight < opt.minHeight){
                                            yDif = 0;
                                            newHeight = opt.minHeight;
                                            return parseInt($obj.css('top'));
                                        }else{ return startTop; }
                                    })();

                    if(typeof opt.duringResize == 'function')
                        opt.duringResize($obj,newWidth,newHeight);

                    $obj.css({
                        width:  newWidth,
                        height: newHeight,
                        left:   opt.anchored ? parseInt($obj.css('left')) : startL - xDif,
                        top:    opt.anchored ? parseInt($obj.css('top')) : startT - yDif
                    });

                    deselect();
                });
            })
            .mouseup(function(evnt){ mouseUp(); evnt.stopPropagation(); })
        )
        .mouseup(mouseUp); // Additional mouseup for when the user lifts their mouse inside a window

        function mouseUp(){
            var width = $obj.outerWidth(),
                height= $obj.outerHeight();

            $obj.removeClass('w121-resizing');

            if(startWidth != width || startHeight != height){
                $(document).off('mousemove.resizes');
                if(typeof opt.afterResize == 'function')
                    opt.afterResize($obj,width,height);
                deselect();
            }
        }

        function deselect(){
            // Deselect anything the mouse may have selected (if statement for IE)
            if(document.selection)  document.selection.empty();
            else                    window.getSelection().removeAllRanges();
        }
    };
})(jQuery);

/*! Wui 1.2.1
 * Copyright (c) 2015 Stephen Rolfe Nielsen (rolfe.nielsen@gmail.com)
 *
 * @license MIT
 * http://www.wui-js.com/wui-1-2-1/license.html
 */ 

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


Wui.percentToPixels = function(el,percent,dim){
    var parent = el.parent(),
        useWindow = (parent[0] === $(window)[0] || parent[0] === $('html')[0] || parent[0] === $('body')[0]),
        parentSize = (useWindow) ? ((dim == 'height') ? $.viewportH() : $.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
};


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



(function($,Wui) {


// Base WUI Object
Wui.O = function(args) { 
    $.extend(this, {
        afterRendered:  false,
        hidden:         false,
        items:          [],
        rendered:       false
    }, args); 
};

Wui.O.prototype = {
    addToDOM:   function(obj, tgt, act){
                    // Take the target and action from the passed object first if defined, then default to passed arguments, 
                    // then to a default of $('body') and 'append'
                    var target  = (obj.appendTo && typeof obj.appendTo !== 'function') ? obj.appendTo :
                                    (obj.prependTo && typeof obj.prependTo !== 'function') ? obj.prependTo :
                                        (tgt) ? tgt : 
                                            (obj.parent && typeof obj.parent.elAlias != 'undefined') ? obj.parent.elAlias :
                                                (obj.parent && typeof obj.parent.el != 'undefined') ? obj.parent.el : $('body'),
                        action = (obj.appendTo && typeof obj.appendTo !== 'function') ? 'append' : 
                                    (obj.prependTo && typeof obj.prependTo !== 'function') ? 'prepend' : 
                                        (typeof act != 'undefined' && target[act]) ? act : 'append';

                    // Try appending with WUI modifiers, else just append in good ol' jQuery fashion                      
                    try{
                      if(typeof obj.el !== 'undefined') $(target)[action](obj.el);
                      else                              $(target)[action](obj);
                    }catch(e){}

                    if(obj.cssByParam)
                        obj.cssByParam();
                    
                    return obj;
                },

    afterRender:function(){ this.afterRendered = true; },

    append:     function(){
                    var el =    (this.elAlias || this.el),
                        args =  (function(args) {
                                    var retVal = [];

                                    Array.prototype.forEach.call(args,function(itm){
                                        retVal.push( itm.el || itm );
                                    });

                                    return retVal;
                                })(arguments);

                    el.append.apply(el, args);
                },

    argsByParam:function(altAttr, altTarget){
                    var me = this,
                        applyAttr = {},
                        applyAltAttr = {},
                        attrs = ['id', 'name', 'tabindex', 'lang', 'title'],
                        wuiAttrs = ['id', 'name', 'tabIndex', 'lang', 'titleAttr'];

                    attrs.forEach(function(atr,idx){
                        var attrVal = me[wuiAttrs[idx]];

                        if((typeof attrVal == 'string' || typeof attrVal == 'number')){
                            if(altTarget && altAttr instanceof Array){
                                if(atr == 'id' && $.inArray(atr,altAttr) > -1){
                                    applyAltAttr[atr] = attrVal;
                                }else{
                                    applyAttr[atr] = attrVal;
                                    if($.inArray(atr,altAttr) > -1) applyAltAttr[atr] = attrVal;
                                }
                            }else{
                                applyAttr[atr] = attrVal;
                            }
                        }
                            
                    });

                    $(me.el).attr(applyAttr);

                    if(altTarget)
                        altTarget.attr(applyAltAttr);
                },

    clear:      function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },

    cssByParam: function(returnObj){
                    var me = this, el = me.el, a, cssParamObj = {};

                    me.argsByParam();

                    // Layout items
                    if(typeof me.parent === 'undefined') me.layout();

                    // Add attributes if defined
                    try{ if(me.attr && typeof me.attr == 'object')  el.attr(me.attr); }catch(e){ }
                        
                    // calculate dimensions
                    if($.isNumeric(me.height) && me.height >= 0)    $.extend(cssParamObj,{height: me.height});
                    if($.isNumeric(me.width) && me.width >= 0)      $.extend(cssParamObj,{width: me.width, flex:'none'});

                    // calculate percentage based dimensions
                    if(Wui.isPercent(me.width)){
                        a = Wui.percentToPixels(el,me.width,'width');
                        if(a !== 0) $.extend(cssParamObj,{width:a, flex:'none'});
                    }
                    if(Wui.isPercent(me.height)){
                        a = Wui.percentToPixels(el,me.height,'height');
                        if(a !== 0) $.extend(cssParamObj,{height:a});
                    }
                    
                    // hide an object based on its hidden value
                    if(me.hidden) $.extend(cssParamObj,'display','none');

                    if(returnObj === true)  return cssParamObj;
                    else                    return ( ($.isEmptyObject(cssParamObj)) ? el.addClass(me.cls) : el.addClass(me.cls).css(cssParamObj) );
                },

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

    hide:       function(){ 
                    this.el.css('display','none');
                    if(typeof arguments[1] == 'function')
                        arguments[1]();

                    return this.el;
                },

    index:       function(){ 
                    var me = this, myPosition;
                    if(me.parent){
                        // Get my position within the parental array
                        me.parent.each(function(itm,idx){ if(itm === me) myPosition = idx; });
                    }
                    return myPosition;
                },

    init:       function(){ 
                    var me = this;
                    
                    if( 
                        typeof me.el !== 'undefined' && 
                        me.el[0] && 
                        Wui.dict.filter(function ( obj ) { 
                            return obj.el === me.el[0]; 
                        })[0] === undefined
                    ) {
                        Wui.dict.push({
                            itm:    me, 
                            el:     me.el[0]
                        });
                    }

                    me.items = (me.items !== undefined) ? me.items : []; 
                },

    layout:     function(afterLayout){
                    var me = this, needFit = false, i = 0;

                    if(!me.rendered)       me.onRender();

                    // Perform Wui.fit on items that need it
                    for(i; i < me.items.length; i++) { 
                        if(me.items[i].fit)     needFit = true;
                        if(me.items[i].layout)  me.items[i].layout();
                    }
                    
                    if(me.items.length && (me.fitDimension || needFit))
                        Wui.fit(me.items, (me.fitDimension || undefined));

                    if(!me.afterRendered)    me.afterRender();
                    
                    // Performs actions passed in as parameters
                    if(typeof afterLayout === 'function')
                        afterLayout();
                },

    onRender:   function(){ 
                    if(this.rendered !== true){
                        if(this.items === undefined) 
                            this.items = [];

                        this.items.forEach(function(itm){ 
                            if(itm.onRender) window.setTimeout(function(){ itm.onRender(); },0);
                        });
                    }
                    
                    this.rendered = true; 
                },

    place:      function(after){
                    var me = this, retVal;

                    me.items.forEach(function(itm){ 
                        itm.parent = me;
                        if(itm.place)    itm.place();
                        else             me.addToDOM(itm);
                    });
                    
                    // Puts the object on the DOM
                    retVal = me.addToDOM(me);

                    // perform operations on the object after its placed on the DOM but before onRender
                    if(after && typeof after == 'function')    after(me);

                    return retVal;
                },

    push:       function(){
                    var me = this;
                    
                    Array.prototype.forEach.call(arguments,function(arg){
                        arg.parent = me;

                        if(arg.place)   arg.place();
                        else            me.addToDOM(arg);

                        if(arg.layout)  arg.layout();
                    });

                    return Array.prototype.push.apply(me.items,arguments);
                },

    remove:     function(){
                    if(this.parent) this.parent.splice(this.index(),1);
                    else            this.el.remove();
                },

    show:       function(){ 
                    this.el.show();
                    if(typeof arguments[1] == 'function')
                        arguments[1]();
                    return this.el;
                },

    splice:     function(idx, howMany){
                    var me = this,
                        el = me.elAlias || me.el;
                        idx = parseInt(idx);
                    
                    // remove specified elements
                    for(var i = idx; i < (idx + howMany); i++)
                        if(me.items[i])
                            (me.items[i].el || me.items[i]).remove();
                    
                    //standard splice functionality on array and calcs
                    var onEnd       =   idx >= me.items.length,
                        retVal      =   Array.prototype.splice.apply(me.items, arguments),
                        addedItms   =   (function(args){
                                            var added = [];

                                            for(var i = 2; i < args.length; i++)
                                                added.push(args[i]);

                                            return added;
                                        })(arguments),
                        after       =   (idx !== 0 && !onEnd) ? me.items[idx -1].el || me.items[idx -1] : undefined;

                    addedItms.forEach(function(itm){
                        itm.parent = me;

                        // Append differently depending on position in the splice
                        if( idx === 0 && after === undefined ){
                            me.addToDOM( itm, el, 'prepend' );
                            after = itm.el || itm;
                        }else if( onEnd ){
                            me.addToDOM( itm, el, 'append' );
                        }else{
                            me.addToDOM( itm, after, 'after' );
                            after = itm.el || itm;
                        }

                        if(itm.layout)  itm.layout();
                    });

                    return retVal;
                }
};

Wui.Button = function(args){
    $.extend(this, {
        disabled:   false,
        el:         $('<button>').attr({unselectable:'on'}),
        tabIndex:   0,
        text:       'Button',
        toolTip:    null
    }, args);
    
    this.init();
};
Wui.Button.prototype = $.extend(new Wui.O(),{
    /** 
        @deprecated I REALLY want to get rid of this. Click actions should be defined in the controller!
        @eventhook Event hook for the button click. 
    */
    click:      function(){},

    disable:    function(){
                    this.disabled = true;
                    this.el
                        .addClass('disabled')
                        .attr('disabled',true)
                        .removeAttr('tabindex');
                },
    enable:     function(){
                    this.disabled = false;
                    this.el
                        .removeClass('disabled')
                        .removeAttr('disabled')
                        .attr({tabindex:this.tabIndex});
                },
    init:       function(){ 
                    var me = this;
                    
                    Wui.O.prototype.init.call(me);

                    me.el
                    .addClass('w121-button' + ((me.disabled) ? ' disabled' : '') )
                    .click(btnClick)
                    .keypress(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                        return false;
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    // if(me.disabled)    me.disable();
                    
                    function btnClick(){
                        if(!me.disabled){
                            Array.prototype.push.call(arguments,me);
                            me.click.apply(me,arguments);

                            me.el.trigger($.Event('wuibtnclick.' + me.id),[me])
                                .trigger($.Event('wuibtnclick'),[me]);
                        }
                        return false;
                    }
                },
    setText:    function(txt){ return this.el.html(txt); }
});

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
                        if(paramsOkay !== false && beforeLoad !== false){
                            // abort the last request in case it takes longer to come back than the one we're going to call
                            if(me.lastRequest && me.lastRequest.readyState != 4) {
                                me.lastRequest.abort();
                            }
                            
                            me.lastRequest = $.ajax(me.url,config);
                            
                            return me.lastRequest;
                        }
                        
                        // If there was no request made, return a rejected deferred to keep return types consistent
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
                        var me = this, dn = (me.name || 'w121-data');

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
                        var retVal = Array.prototype.push.apply(this.data || (this.data = []), arguments);
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
                        var retVal = Array.prototype.splice.apply(this.data || (this.data = []), arguments);
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
                            .replace(/\{(\w*)\}/g,function(){
                                var key = arguments[1];
                                return (me.data[key] !== undefined) ? me.data[key] : "";
                            })
                            // accounts for complex expressions
                            .replace(/\{\((.*?)\)\}/g,function(){
                                var fn = arguments[1], keys = Wui.getKeys(me.data), vals = [], i = 0;

                                // Adds the full record to be available from the datalist
                                keys.push('wuiRecord');
                                
                                // Removes any key values that may start with a number and ruin the engine
                                for(i = keys.length - 1; i >= 0; i--)   if(keys[i].match(/\b\d+/g)) keys.splice(i,1);

                                // fill arrays of keys and their values and make sure they are in the same order
                                for(i = 0; i < keys.length; i++)        vals.push(me.data[keys[i]]);

                                // // Adds the full record to be available from the datalist
                                vals.push(me.data);
                                
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

Wui.DataList = function(args){
    var me = this;

    $.extend(me, {
        afterMake:      function(){},
        autoLoad:       true,
        displayMax:     -1,
        el:             $('<div>'),
        focusOnSelect:  true,
        interactive:    true,
        multiSelect:    false,
        selected:       []
    }, args);

    me.init();
};
Wui.DataList.prototype = $.extend(new Wui.O(), new Wui.Data(), {
    dataChanged:function(){ this.make(); },
    clearSelect:function(){
                    var me = this,
                        dn = (me.name) ? '.' + me.name : '',
                        el = me.elAlias || me.el;

                    el.find('.w121-selected').removeClass('w121-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuichange' + dn), [me, me.el, {}, me.selected])
                        .trigger($.Event('wuichange'), [me, me.el, {}, me.selected]);
                },
    copyArryRecs:function(arry){
                    var newArry = [];

                    arry.forEach(function(itm){
                        var newRec = {};

                        $.each(itm.rec,function(key,val){ newRec[key] = val; });

                        newArry.push(newRec);
                    });

                    return newArry;
                },

    /** @deprecated Preserved only for legacy */
    createItem: function(itm){
                    return this.modifyItem(itm);
                },

    click:      function(e,row){
                    var me = this,
                        itm = me.getItemByEl(row),
                        txtSelection, 
                        alreadySelected;

                    // Determine the # of selected items before the change
                    if(me.multiSelect && (e.metaKey || e.ctrlKey || e.shiftKey)){
                        alreadySelected = $(row).hasClass('w121-selected');
                        
                        if(!e.shiftKey){
                            // WHEN THE CTRL KEY IS HELD SELECT/DESELECT INDIVIDUAL ITEMS
                            $(row).toggleClass('w121-selected',!alreadySelected);

                            if(alreadySelected) $.each(me.selected || [], function(idx,sel){ if(sel == itm) me.selected.splice(idx,1); });
                            else                me.selected.push(itm);

                            me.el.trigger($.Event('wuichange'+ me.id), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                        }else{
                            // WHEN THE SHIFT KEY IS HELD - SELECT ALL ITEMS BETWEEN TWO POINTS
                            var firstSelected = me.selectByEl(me.el.find('tr.w121-selected:first')),
                                currentSelected = me.getItemByEl($(row)),
                                dir = (firstSelected.rec.wuiIndex < currentSelected.rec.wuiIndex) ? 1 : -1,
                                start = (dir > 0) ? firstSelected : currentSelected,
                                end = (dir > 0) ? currentSelected : firstSelected,
                                currSelection = [];

                            me.selected = currSelection = me.items.slice(start.rec.wuiIndex,end.rec.wuiIndex + 1);
                            
                            $('w121-selected').removeClass('w121-selected');
                            
                            currSelection.forEach(function(rec){
                                rec.el.addClass('w121-selected');
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
                    }else{
                        if(me.selected.length > 0 && me.selected[0] === itm)    me.itemDeselect(itm);   //deselect item
                        else                                                    me.itemSelect(itm);     //change selection
                    }
                },
    dblClick:   function(){
                    var me = this,
                        itm = me.getItemByEl(arguments[1]);

                    me.itemSelect(itm,true);
                    me.el
                        .trigger($.Event('wuichange'+ me.id), [me, itm.el, itm.rec, me.selected])
                        .trigger($.Event('wuidblclick'+ me.id),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected])
                        .trigger($.Event('wuidblclick'),[me, itm.el, itm.rec]);
                         
                    return false; // stops propagation & prevents default
                },
    init:       function(){
                    var me = this;
                    
                    Wui.O.prototype.init.call(me);

                    // Every DataList has a name and id, for listener and reference purposes.
                    if(!(me.name && me.name.length !== 0))  me.name = Wui.id('w121-data-list');
                    if(!(me.id && me.id.length !== 0))      me.id = me.name;

                    $(document).on('keyup',function(evnt){
                        if( me.selected && me.selected[0] && document.activeElement == me.selected[0].el[0] && me.keyActions.hasOwnProperty(evnt.keyCode) )
                            me.keyActions[evnt.keyCode].call(me);
                    });
                },
    itemSelect: function(itm, silent){
                    var me = this, old = [], dn = (me.name) ? '.' + me.name : '';
                    
                    if(itm){
                        if(me.selected.length > 0 && !me.multiSelect && !silent){
                            old = $.extend(true,[],me.selected);
                            me.el.trigger($.Event('wuideselect'),[me, old[0].el, old[0].rec, old]);
                        }
                            
                        me.el.find('.w121-selected').removeClass('w121-selected').removeAttr('tabindex');
                        itm.el.addClass('w121-selected').attr('tabindex',1);

                        if(me.focusOnSelect)
                            itm.el.focus();
                        
                        me.selected = [itm];
                        me.el.addClass('w121-has-selected');

                        if(!silent){
                            me.el.trigger($.Event('wuiselect'+ dn), [me, itm.el, itm.rec])
                                .trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                                .trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                                .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                        }
                    }
                    
                    return itm;
                },
    itemDeselect:function(itm){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

                    if(me.selected.length > 0)
                        itm.el.removeClass('w121-selected');
                    
                    me.selected = [];
                    me.el.removeClass('w121-has-selected');

                    me.el.trigger($.Event('wuideselect' + dn),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange' + dn), [me, itm.el, itm.rec, me.selected])
                        .trigger($.Event('wuideselect'),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    return itm;
                },
    keyActions: {
                    '13':   function(){ var me = this; me.selected[0].el.click(); me.selected[0].el.click(); },
                    '32':   function(){ var me = this; me.selected[0].el.click(); me.selected[0].el.click(); },
                    '38':   function(){ var me = this; me.selectAjacent(-1); },
                    '40':   function(){ var me = this; me.selectAjacent(1); }
                },
    modifyItem: function(itm){ return itm.el; },
    make:       function(){
                    if(!(this.data instanceof Array))
                        return false;

                    var me = this,
                        te = new Wui.Template({template: me.template}),
                        maxI = (me.data.length > me.displayMax && me.displayMax > 0) ? me.displayMax : me.data.length,
                        els = [],
                        i = 0;
                    
                    // Clear out items list
                    me.clear();
                    me.items = [];

                    function makeItems(i){
                        var rec = te.data = me.data[i],
                            itmEl = te.make(i),
                            itm = {el:itmEl, rec:rec};
                        
                        els.push(itmEl);
                        me.items.push(itm);

                        (me.elAlias || me.el).append(me.createItem(itm));
                    }

                    // Add items to me.items
                    for(i; i < maxI; i++) makeItems(i);

                    me.clickListener(els);

                    // Fire event hook and listeners regardless of whether anything was made
                    me.afterMake();
                    me.el.trigger($.Event('refresh'),[me,me.data]);
                    me.resetSelect();
                    
                    // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                    // object has been manually run
                    me.autoLoad = true;
                },
    clickListener:function(els){
                    var me = this;

                    if(me.interactive){
                        els.forEach(function(el){
                            var clicks = 0, timer = null;

                            el.on('click', function(e){
                                var retVal = null;
                                var row = this;
                                
                                clicks++;  //count clicks
                                if(clicks === 1) {
                                    timer = window.setTimeout(function() {
                                        retVal = me.click(e,row);
                                        clicks = 0;             //after action performed, reset counter
                                    }, 350);
                                } else {
                                    clearTimeout(timer);    //prevent single-click action
                                    retVal = me.dblClick(e,row);
                                    clicks = 0;             //after action performed, reset counter
                                }
                                return retVal;
                            })
                            .on('dblclick', function(e){ e.preventDefault(); }); //cancel system double-click event
                        });
                    }
                },
    onRender:   function(){
                    if(this.rendered !== true){
                        this.getSrcData();
                        Wui.O.prototype.onRender.call(this);
                    }
                },
    getSrcData: function(){
                    var me = this;
                    
                    if(me.initLoaded !== true && (me.data instanceof Array) && me.data.length > 0){
                        me.setParams(me.params);
                        me.initLoaded = true;

                        return me.setData(me.data);
                    }else{
                        if(me.autoLoad){
                            if(this.url !== null)   return me.loadData();
                            else                    return me.setData(me.data);
                        }
                    }
                },
    selectAjacent:function(num){
                        var me = this, selectAjc = me.selected[0].el[(num > 0) ? 'next' : 'prev']();
                        return me.selectByEl(selectAjc);
                    },
    selectByEl: function(el){
                    var me = this, retVal;

                    me.itemSelect(retVal = me.getItemByEl(el));
                    me.scrollToCurrent();
                    
                    return retVal;
                },
    getItemByEl:function(el){
                    var me = this, i = 0, retVal;

                    // Unwrap object form jQuery
                    el = el[0] || el;

                    for(i; i < me.items.length; i++){
                        if( me.items[i].el[0] == el ){
                            retVal = me.items[i];
                            break;
                        }
                    }
                    
                    return retVal;
                },
    refresh:    function(){ this.loadData(); },
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
                                        itm.el.addClass('w121-selected');
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
    scrollToCurrent:function(){
                        var me = this,
                            el = me.elAlias || me.el,
                            firstSelect = el.find('.w121-selected:first'),
                            ofstP = firstSelect.offsetParent(),
                            offset = (function(){ 
                                var r = 0; 
                                firstSelect.prevAll().each(function(){ r += $(this).outerHeight() - 0.55; }); 
                                return  r; 
                            })();

                        ofstP.animate({ scrollTop:offset }, 100);
                    },
    selectBy:   function(key,val){
                    var me = this, retVal;

                    me.items.forEach(function(itm){
                        if (itm.rec[key] !== undefined && itm.rec[key] == val) {
                            retVal = me.itemSelect(itm);
                            return retVal;
                        }
                    });
                    me.scrollToCurrent();

                    return retVal;
                }
});

Wui.Pane = function(args){ 
    $.extend(this,{
        bbar:       [],
        border:     true,
        disabled:   false,
        fitToContent:false,
        maskHTML:   'Empty',
        maxHeight:  null,
        tbar:       [],
        title:      null,
        titleAlign: 'left'
    },args);

    this.init();
};
Wui.Pane.prototype = $.extend(new Wui.O(), {
    addMask:        function(target){
                        target = (target) ? target : this.container;

                        if(target.children('w121-mask').length === 0) {
                            this.mask = $('<div>')
                                .addClass('w121-mask')
                                .append(
                                    $('<span>').html(this.maskHTML)
                                )
                                .appendTo(target);
                            
                            return this.mask;
                        }
                        else {
                            return null;
                        }
                    },
    afterRender:    function(){
                        var me = this;

                        if(me.afterRendered !== true){
                            Wui.O.prototype.afterRender.call(me);
                            if(me.parent){
                                Wui.fit(me.parent.items, (me.parent.fitDimension || 'width'));
                                me.el.parent().css('overflow','hidden');
                            }

                            // Set focus to the bottom right most button in the pane
                            window.setTimeout(function(){
                                if(!me.disabled && me.footer.items.length && me.footer.items[me.footer.items.length - 1].el)
                                    me.footer.items[me.footer.items.length - 1].el.focus();
                            },30);
                        }
                    },
    disable:        function(){
                        var me = this;

                        me.addMask();
                        me.footer.items.forEach(function(itm){ if(itm.disable) itm.disable(); });
                        me.header.items.forEach(function(itm){ if(itm.disable) itm.disable(); });

                        me.disabled = true;
                        return me.disabled;
                    },   
    enable:         function(){
                        var me = this;

                        me.removeMask();
                        me.footer.items.forEach(function(itm){ if(itm.enable) itm.enable(); });
                        me.header.items.forEach(function(itm){ if(itm.enable) itm.enable(); });

                        me.disabled = false;
                        return me.disabled;
                    },
    init:           function(){
                        var me = this, el = me.el = me.surePane = $('<div>').addClass('w121-pane');
                    
                        Wui.O.prototype.init.call(me);

                        if(!me.border)      
                            el.addClass('no-border');

                        if(me.title !== null)
                            me.setTitle(me.title);

                        // Add the header before the content so that tabbing between buttons/items in the header
                        // and footer is logically top > bottom, left > right
                        me.header = makeBar('tbar',{items: me.tbar});
                        configBar('tbar');

                        el.append( me.elAlias = me.container = $('<div>').addClass('w121-pane-content') );

                        me.footer = makeBar('bbar',{items: me.bbar});
                        configBar('bbar');

                        // If the pane is disabled then it disables it
                        if(me.disabled) me.disable();

                        function makeBar(bar,args){
                            return new Wui.O($.extend({
                                el:         $('<div>'),
                                cls:        'w121-' + bar + ' w121-h-bar',
                                parent:     me,
                                appendTo:   me.el,
                                splice:     function(){ 
                                                var retVar = Wui.O.prototype.splice.apply(this,arguments);
                                                configBar(bar);
                                                return retVar;
                                            },
                                push:       function(){ 
                                                var retVar = Wui.O.prototype.push.apply(this,arguments);
                                                configBar(bar);
                                                return retVar;
                                            }
                            },args));
                        }

                        function configBar(bar){
                            var bars = {
                                    tbar: 'header',
                                    bbar: 'footer'
                                },
                                thisBar =   me[bars[bar]],
                                hasBar =    me.surePane.hasClass(bar),
                                hasItems =  (function(){
                                                var barItemNum = 0;

                                                thisBar.items.forEach(function(itm){
                                                    if(itm instanceof Wui.O)
                                                        barItemNum++;
                                                });

                                                return barItemNum > 0;
                                            })();

                            if(!hasBar && hasItems){
                                me.surePane.addClass(bar);
                                thisBar.place();
                            }else if (hasBar && !hasItems){
                                me.surePane.removeClass(bar);
                                thisBar.el.remove();
                            }
                        }
                    },
    onRender:   function() { 
                        var me = this;

                        if(me.rendered !== true){
                            me.items.forEach(function(itm){ 
                                if(itm.onRender) window.setTimeout(function(){ itm.onRender(); },0);
                            });

                            if(me.header) me.header.onRender();
                            if(me.footer) me.footer.onRender();

                            Wui.O.prototype.onRender.call(me);
                        } 
                    },
    cssByParam:     function() {
                        var me = this;

                        Wui.O.prototype.cssByParam.apply(me,arguments);

                        // After all of the work done by flexbox, Chrome has a lousy implementation that requires
                        // setting the content explicitly with JS
                        window.setTimeout(function(){
                            if(me.el.parents('[style*="column"]').length && parseInt(me.container.height()) != me.el.height())
                                me.container.css('height', me.el.height());
                        },0);
                    },
    removeMask:     function(){
                        this.el.find('.w121-mask').fadeOut(500, function(){ $(this).remove(); });
                        this.mask = undefined;
                    },
    setTitle:       function(t){ 
                        var me = this,
                            hasEl = (typeof me.titleEl !== 'undefined');

                        me.title = t = (t && typeof t == 'string') ? t : null;

                        if(t !== null){
                            if(!hasEl)
                                me.el.prepend( me.titleEl = $('<div class="w121-title">') );

                            me.el.addClass('title');
                            me.setTitleAlign();
                            me.titleEl.html(t);
                        }else if(hasEl){
                            me.el.removeClass('title');
                            me.titleEl.remove();
                            me.titleEl = undefined;
                        }

                        return t;
                    },
    setTitleAlign:  function(t){ 
                        var me = this;
                        
                        me.titleAlign = t || me.titleAlign;
                        if(typeof me.titleEl !== 'undefined')
                            me.titleEl.removeClass('right left center').addClass(me.titleAlign);
                    }
});

Wui.Window = function(args){ 
    $.extend(this,{
        bbar:           [],
        border:         true,
        closeWithModal: false,
        draggable:      true,
        isModal:        false,
        maskHTML:       'Loading <span class="w121-spinner"></span>',
        onWinClose:     function(){},
        onWinOpen:      function(){},
        resizable:      true,
        tbar:           [],
        title:          'Window',
        windowLeft:     null,
        windowTop:      null
    },args);  
    this.init(); 
};
Wui.Window.prototype = $.extend(true, {}, Wui.Pane.prototype,{
    close:      function(){ 
                    var me = this;

                    if(me.onWinClose(me) !== false){
                        me.windowEl.trigger($.Event('close'),[me]);
                        me.remove();
                    }
                },
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    if(this.isModal){ this.modalEl.css({width:'', height:''}); }    // Remove CSS that accidentally gets applied to the modal cover
                    if(this.windowEl)
                        this.resize();                                              // Resize the window and center
                },  
    disable:    function(){
                    Wui.Pane.prototype.disable.call(this);
                    // Enable the close button for the window - esp. important if its modal
                    if(this.closeBtn)
                        this.closeBtn.enable();
                },
    fireResize: function(winEl,width,height){
                    var me = this;
                    me.layout();
                    me.container.trigger( $.Event('resize'), [me.container.width(), me.container.height(), me, width, height, winEl] );
                },
    init:       function(){
                    var me = this;
                    me.appendTo = me.appendTo || $('body');
                    
                    // Make it a modal window & add everything to the DOM
                    if(me.isModal){
                        me.modalEl = $('<div>').addClass('w121-overlay');
                        $('body').append(
                            me.appendTo = me.modalEl
                                .css('z-index',Wui.maxZ())
                                .on('mousewheel',noScroll)
                                .click(function(e){
                                    if(me.closeWithModal && e.target === me.modalEl[0])
                                        me.close();
                                })
                        );
                    }
                    
                    // Add close buttons where appropriate
                    me.tbar.push( me.closeBtn = new Wui.Button({ text:'X', name:'window_close' }) );
                    
                    if(me.bbar.length === 0) 
                        me.bbar = [ new Wui.Button({ text:'Close', name:'window_close' }) ];
                    
                    // Calls the parent init function
                    Wui.Pane.prototype.init.apply(me,arguments);
                    
                    // Add window specific properties
                    me.windowEl = me.el
                        .addClass('w121-window')
                        .css('z-index',Wui.maxZ())
                        .click(bringToFront)
                        .on('mousewheel',noScroll);
                    
                    // Add draggable
                    if(me.draggable === true)
                        me.windowEl.drags({
                            handle: me.header.el, 
                            // start:bringToFront
                        });

                    // Add resizable option if the window is resizable
                    if(me.resizable === true)
                        me.windowEl.resizes({
                            minWidth:   me.minWidth || 200,
                            minHeight:  me.minHeight || 200,
                            afterResize:function(){ me.fireResize.apply(me,arguments); }
                        });

                    // Listener for the close buttons
                    me.el.on('wuibtnclick','[name=window_close]',function(evnt){
                        me.close();
                        evnt.stopPropagation();
                    });

                    // Put the window on the body
                    me.place();
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    me.onWinOpen(me);
                    me.windowEl.trigger( $.Event('open'), [me] );

                    function noScroll(evnt){ evnt.stopPropagation(); }

                    function bringToFront(){
                        var maxZ = Wui.maxZ();
                        if(parseInt((me.el.css('z-index')) || 1) <= maxZ){
                            me.el.css('z-index', maxZ);
                        }
                    }

                    me.el.on('wuibtnclick','[name=window_close]',function(evnt){
                        me.close();
                        evnt.stopPropagation();
                    });
                },
    afterRender:function(){
                    if(this.afterRendered !== true){
                        Wui.Pane.prototype.afterRender.call(this);
                        this.resize();
                    }
                },
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
                    if(me.windowEl){
                        var cssParamObj = { height: useHeight, width: (arguments.length) ? resizeWidth : undefined },
                            posLeft =   (me.windowLeft) ?
                                            ($.isNumeric(me.windowLeft) ? me.windowLeft : Wui.percentToPixels($('html'), me.windowLeft, 'width')) :
                                            Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)),
                            posTop =    (me.windowTop) ? 
                                            ($.isNumeric(me.windowTop) ? me.windowTop : Wui.percentToPixels($('html'), me.windowTop, 'height')) :
                                            Math.floor(($.viewportH() / 2) - (useHeight / 2));
                        me.windowEl.css( $.extend(cssParamObj, { top:posTop, left:posLeft }) );

                        me.fireResize();
                        return {width:me.windowEl.outerWidth(), height:me.windowEl.outerHeight()};
                    }
                    
                    return false;
                },
    height:     300,   
    width:      400
});

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
                    window.setTimeout(function() { 
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
 * Creates an alert() style message in a modal Wui.Window, but with callback options, 
 * and in the style of the application's UI.
 *
 * @param   {string}    msg         Text or HTML containing a message to display to the user.
 * @param   {sring}     msgTitle    Text that is the title of the msg window. Default "Message".
 * @param   {function}  callback    Function that will be called just before the msg window 
 *                                  is closed. If this method returns false, the msg window will
 *                                  remain open. See Wui.Window documentation.
 * @param   {string}    content     (Optional) Text or HTML for further content that will 
 *                                  appear after 'msg'.
 *
 * @return  {Wui.Window}    The msg window
 */
Wui.msg = function(msg, msgTitle, callback, content){
    var cntnt = [new Wui.O({el: $('<div>').addClass('w121-msg').html(msg) })];
    
    if(typeof content !== 'undefined'){
        if(typeof content.push == 'function')   cntnt.push.apply(cntnt, content);
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


/** Alias for Wui.msg, more conventional name. TODO: deprecate Wui.msg */
Wui.alert = function() {
    return Wui.msg.apply(this, arguments);
};


/**
 * Creates a alery() style message in a modal Wui.Window, but with callback options, 
 * and in the style of the application's UI. Callback will receive a boolean 'true' or 'false'
 * depending whether the user clicked 'Yes' or 'No'. Window close button is removed so that the
 * user must choose 'Yes' or 'No' to remove the modal.
 *
 * @param   {string}    errMsg      Text (or HTML) containing the error to display to the user,
 *                                  appearing with the additional class of 'w121-err'.
 * @param   {sring}     msgTitle    Text that is the title of the error window. Default "Message".
 * @param   {function}  callback    Function that will be called just before the error window 
 *                                  is closed. If this method returns false, the error window will
 *                                  remain open. See Wui.Window documentation.
 * @param   {array}     buttons     An array of Wui.Buttons that can provide additional options to
 *                                  the user in an error situation. Otherwise, a simple 'close'
 *                                  button will be used, just like in the Wui.alert() window.
 *
 * @return  {Wui.Window}    The confirm window
 */
Wui.errRpt = function(errMsg, msgTitle, buttons, callback) {
    var err = Wui.alert(errMsg, msgTitle, callback);

    if($.isArray(buttons)) {
        err.footer.push.apply(err.footer, buttons);
    }
    
    err.container.find('.w121-msg').addClass('w121-err');
    err.resize();

    return err;
};


/** Alias for Wui.msg, more conventional name. TODO: deprecate Wui.msg */
Wui.error = function() {
    return Wui.errRpt.apply(this, arguments);
};


/**
 * Creates a confirm() style message in a modal Wui.Window, but with callback options, 
 * and in the style of the application's UI. Callback will receive a boolean 'true' or 'false'
 * depending whether the user clicked 'Yes' or 'No'. Window close button is removed so that the
 * user must choose 'Yes' or 'No' to remove the modal.
 *
 * @param   {string}    msg         Text (or HTML) containing a message to display to the user.
 * @param   {sring}     msgTitle    Text that is the title of the confirm window. Default "Message".
 * @param   {function}  callback    Function that will receive a 'true' or 'false' parameter. The
 *                                  confirm window will close regardless of the output of this 
 *                                  method.
 * @param   {string}    content     (Optional) Text or HTML for further content that will 
 *                                  appear after 'msg'.
 *
 * @return  {Wui.Window}    The confirm window
 */
Wui.confirm = function(msg, msgTitle, callback) {
    var cw = Wui.alert.apply(this, arguments);

    cw.doAnswer = function(ans){
        if(callback && typeof callback == 'function') {
            callback(ans);
        }
        cw.answerRun = true;
        cw.close();
    };
    cw.onWinClose = function(){ return ((cw.answerRun !== true) ? false : cw.answerRun); };

    cw.footer.splice(0, 1, new Wui.Button({ text:'No' }), new Wui.Button({ text:'Yes' }) );
    
    cw.footer.el.on('wuibtnclick', function(evnt,btn) {
        cw.doAnswer((btn.text == 'No') ? false : true);
        evnt.stopPropagation();
    });

    cw.header.splice(0,1);

    cw.resize();

    return cw;
};


})(jQuery, window[_wuiVar]);





(function($,Wui) {


Wui.Tabs = function(args){ 
    $.extend(this,{
        bbar:           [],
        currentTab:     null,
        items:          [],
        tabsHideHeader: null,
        tabPosition:    'top right',
        tbar:           []
    },args);

    this.init();
};

Wui.Tabs.prototype = $.extend(new Wui.Pane(),{    
    place:          function(){
                        function getBar(bar){
                            switch(bar){
                                case 'top':      return 'header';
                                case 'bottom':   return 'footer';
                            }
                        }

                        var me =        this,
                            posArry =   (function(){
                                            var retVal = me.tabPosition.split(' ');
                                            
                                            // Provides Wui 1.2 functionality
                                            if(me.tabsBottom === true)  retVal[0] = 'bottom';
                                            if(me.tabsLeft === true)    retVal[1] = 'left';
                                            
                                            return retVal;
                                        })(),
                            bar =       getBar(posArry[0]); 

                        
                        me.el.addClass('w121-tabs');
                        
                        //adds the object's items if any
                        if(me.items === undefined) me.items = [];
                        me.each(function(itm,idx){
                            itm.el.addClass('w121-tab-panel');
                            itm.tabCls =    'w121-tab ' + ((itm.tabCls) ? ' ' + itm.tabCls : '');
                            
                            if(itm.tabsHideHeader)
                                itm.el.addClass('w121-hide-heading');
                            
                            // Add buttons as tabs
                            me[bar].push(
                                itm.tab = new Wui.Button({
                                    text:   itm.title || 'Tab ' + (parseInt(idx) + 1),
                                    cls:    itm.tabCls,
                                    tabIndex:1,
                                    pane:   itm
                                })
                            );
                            me[bar].el.addClass((me.tabsLeft) ? ' left' : '');
                        });

                        // Add listeners for tab changes
                        me[bar].el.on('wuibtnclick','.w121-tab',function(){
                            me.giveFocus(arguments[1].pane);
                        });
                        
                        return Wui.O.prototype.place.call(me);
                    },
    giveFocus:      function(tab, supressEvent){
                        var me = this;
      
                        supressEvent = (supressEvent !== undefined) ? supressEvent : false;
                        
                        me.each(function(itm){
                            var isActive = itm === tab;
                            
                            itm.tab.el.toggleClass('selected', isActive);
                            itm.el.toggleClass('active', isActive);
                            if(isActive){
                                me.currentTab = itm;
                                window.setTimeout(function(){ itm.cssByParam(); itm.layout(); },0);
                                if(!supressEvent) 
                                    me.el.trigger($.Event('tabchange'),[me, itm.tab, itm]);
                            }
                        });
                    },
    selectTabByText:function(txt, supressEvent){
                        var me = this, retVal;

                        me.items.forEach(function(itm){
                            if($.trim(itm.tab.el.text()).toLowerCase() === $.trim(txt).toLowerCase().replace(/_/g,' ')){
                                me.giveFocus(itm, supressEvent);
                                retVal = itm;
                            }
                        });

                        return retVal;
                    },
    onRender:       function(){
                        if(this.rendered !== true){
                            this.giveFocus(this.items[0]);
                            Wui.Pane.prototype.onRender.call(this);
                        }
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
    return new Wui.DataList($.extend(this,{
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
    },args));
};
Wui.Grid.prototype = $.extend(new Wui.Pane(), {
    /** Overrides DataList.afterMake(), sizes the columns and enables the grid @eventhook */
    afterMake:  function(){
                    this.layout();
                    this.removeMask();
                },
    
    closeSorter:function(){ this.dd.children('li').off('click').end().css('display','none'); },

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
    setGridVars:function(){
                    var me = this;

                    me.tblContainer = $('<div><table></table></div>').addClass('w121-grid-body').appendTo(me.elAlias);
                    me.heading = $('<div>').addClass('w121-gh').appendTo(me.elAlias);
                    me.elAlias = me.tbl = me.tblContainer.children('table');

                    // columns and sorting on multiple columns
                    me.cols = [];
                    me.sorters = [];
                },
    /** Runs when the object is created, creates the DOM elements for the grid within the Wui.Pane that this object extends */
    init:       function(){
                    var me = this;
                    
                    // Set up container
                    Wui.Pane.prototype.init.call(me);
                    Wui.DataList.prototype.init.call(me);
                    me.el.addClass('w121-grid');

                    // Add grid specific DOM elements and reset elAlias
                    me.setGridVars();
                    
                    // Add sorting menu
                    $('body').append( 
                        me.dd = $(
                            '<ul>' +
                                '<li>Ascending</li>' +
                                '<li>Decending</li>' +
                                '<li>No Sort</li>' +
                            '<ul>'
                        ).addClass('w121-sort-menu')
                        .attr({ id: me.idCls = Wui.id() })
                        .on('mousewheel scroll', function(evnt){ evnt.stopPropagation(); })
                    );
                    // Clear the sorting menu when it loses focus
                    $(document).on('click','*:not(#' +me.idCls+ ')',function(){ 
                        me.closeSorter();
                    });
                    
                    // hide the header
                    if(me.hideHeader)    me.heading.height(0);
                },
    
    /** Overrides the Wui.O layout to allow for the optional sizing to fit content, column sizing, and data positioning. */
    layout:     function(){
                    Wui.O.prototype.layout.apply(this,arguments);
                    
                    if(this.fitToContent === true){
                        var me = this,
                            toolBarsH = me.header.el.outerHeight() + me.footer.el.outerHeight(),
                            maxHeight = $.isNumeric(me.maxHeight) ? me.maxHeight : 0,
                            totalHeight = me.heading.outerHeight();
                        
                        me.tbl.children().each(function(){
                            totalHeight += $(this).outerHeight();
                        });
                        totalHeight = (maxHeight > 0 && totalHeight + toolBarsH > maxHeight) ? maxHeight : totalHeight;

                        me.el.height(me.height = totalHeight + toolBarsH);
                        me.container.height(me.height + 1);

                        Wui.O.prototype.layout.apply(me,arguments);
                    }

                    if(this.cols.length) this.sizeCols();
                },

    layoutKids: function(){},
                    
    /** Overrides DataList.loadData(), to add the load mask */   
    loadData:   function(){
                    this.maskHTML = 'Loading <i class="fa fa-spinner fa-spin"></i>';
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
                                    col.el.removeClass().addClass('w121-gc').addClass(col.cls);
                                    
                                    for(var i = me.sorters.length; i > 0; i--)
                                        if(me.sorters[i - 1].el == col.el)
                                            me.sorters.splice(i - 1,1);
                                }else{
                                    col.sortDir = 'desc';
                                }
                            }else{
                                // Can't sort on more than 5 columns
                                if(me.sorters.length > 5){
                                    col.el.removeClass().addClass('w121-gc').addClass(col.cls);
                                    return false;
                                }
                                
                                col.sortDir = 'asc';
                                me.sorters.push(col);
                            }
                        }    
                    }

                    $.each(me.sorters,function(i,itm){
                        itm.el.removeClass().addClass('w121-gc ' + sortClasses[i] + ' ' + itm.sortDir).addClass(itm.cls);
                    });
                },
    
    /** Overrides DataList.modifyItem(), to implement the renderers */        
    modifyItem: function(itm){
                    var me = this;
                    // Perform renderers (if any)
                    $.each(me.renderers,function(){
                        var r = arguments[1],
                            cell = itm.el.children(':eq(' +r.index+ ')').children('div'),
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
                    
                    Wui.Pane.prototype.onRender.call(this);
                    Wui.DataList.prototype.onRender.call(this);
                    
                    // Start with getting the columns - Many methods waterfall from here
                    me.autoLoad = al;
                    return this.getColumns();
                },
    
    /** Overrides Pane.configBar() to add positioning the data window when tbars or bbars are added/removed. @private */
    configBar:  function(){
                    Wui.Pane.prototype.configBar.apply(this,arguments);
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
                        el:         $('<div>').append($('<div>').text(col.heading))
                                        .attr({unselectable:'on'})
                                        .addClass('w121-gc ' + col.cls)
                    });
                    
                    col.el.css({
                        width:          col.width,
                        "flex-grow":    col.fit
                    });

                    if(col.sortable){
                        col.el.on("contextmenu",function(e){
                            e.preventDefault();
                            Wui.positionItem($(this),me.dd);

                            $('body').append(me.dd.width(100).css('display','block'));
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
                        col.el.addClass('w121-no-sort');
                    }             

                    //grids with single columns shouldn't have a resizable option
                    if(me.columns.length > 1 && !col.vertical && col.resizable){
                        col.el.resizes({
                            anchored:       true,
                            minWidth:       60,
                            minHeight:      0,
                            direction:      'e',
                            resizeStart:    function(){ me.tempLayout = me.layout; me.layout = function(){}; },
                            afterResize:    function(){ me.sizeCols(); me.layout = me.tempLayout; },
                            duringResize:   function(){ 
                                                $.extend(col, { width: arguments[1], fit:-1 });
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
                    listitems.forEach(function(row){ row.el.appendTo(me.tbl); });
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
                        hc = me.heading,
                        acctForScrollBar = me.tbl.find('tr:first').height() * me.total > me.tblContainer.height(),
                        sbWid = acctForScrollBar ? Wui.scrollbarWidth() : 0;

                    hc.css('padding-right', sbWid);
                    hc[ (sbWid === 0) ? 'addClass' : 'removeClass' ]('has-scrollbar');

                    for(var i = 0; i < me.cols.length; i++)
                        me.tbl.find('td:eq(' +i+ ')').css({ width: (me.cols[i].el.innerWidth() / me.tbl.width()).toFixed(2) + '%' });
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
                        els = [],
                        holder = $('<div>');
                
                        // Clear out items list
                        me.items = [];

                        // Add items to me.items
                        for(var i = 0; (me.displayMax < 0 && i < holdingData.length) || (me.displayMax > 0 && i < me.displayMax && i < holdingData.length); i++){
                            var rec = me.data = holdingData[i],
                                itm = {el:Wui.Template.prototype.make.call(me, i), rec:rec};
                                
                            Array.prototype.push.call(me.items,itm);
                            holder.append(me.createItem(itm));
                            els.push(itm.el);
                        }

                        me.clickListener(els);
                
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
                        
                        if(me.tbl.children().length > 0){
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

    setGridVars:    function(){
                        var me = this;
                        
                        // Define object internal variables
                        me.tblContainer = $('<div><div>&nbsp;</div><table></table></div>').addClass('w121-grid-body');
                        me.tbl = me.tblContainer.children('table').addClass('w121-infinite-table');
                        me.tblHSize = me.tblContainer.children('div').addClass('w121-ghs');
                        me.heading = $('<div>').addClass('w121-gh').appendTo(me.elAlias);
                        me.sorters = [];
                        me.renderers = [];
                        me.originalSort = me.paging.sort || null;
                        
                        //Add listeners to table for paging
                        me.tblContainer.scroll(function(){ me.pagingScroll(); });
                        
                        me.elAlias.append(me.tblContainer,me.heading);
                    },

    /** 
    Method that will run immediately when the object is constructed. Creates necessary 
    DOM elements for the grid. Establishes whether the grid is remote or local, paging
    or not. */
    init:            function(){
                        Wui.Grid.prototype.init.call(this);
                        this.el.addClass('w121-infinite-grid');
                    },

    /** 
    Renders the data in the table. Overrides Wui.DataList.make()
    @private
    */
    make:           function(){
                        var me = this;
                        me.addRows(me.data);
                        me.rowHeight = me.tbl.find('tr:first').outerHeight();
                        me.totalPages = Math.floor(me.total/me.paging.limit);
                        me.alignPagingSort();
                        me.totalHeight = me.total * me.rowHeight;

                        if(me.tblHSize)
                            me.tblHSize.height(me.totalHeight);

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
                                        col.el.removeClass().addClass('w121-gc').addClass(col.cls);
                                        
                                        for(i = me.sorters.length; i > 0; i--)
                                            if(me.sorters[i - 1].el == col.el)
                                                me.sorters.splice(i - 1,1);
                                    }else{
                                        col.sortDir = 'desc';
                                    }
                                }else{
                                    // Can't sort on more than 5 columns
                                    if(me.sorters.length > 5){
                                        col.el.removeClass().addClass('w121-gc').addClass(col.cls);
                                        return false;
                                    }
                                    
                                    col.sortDir = 'asc';
                                    me.sorters.push(col);
                                }
                            }    
                        }

                        // Add/remove classes to indicate to the user what is being sorted and take care of paging
                        me.paging.sort = [];
                            
                        if(me.sorters.length === 0)
                            me.alignPagingSort();
                            
                        me.sorters.forEach(function(itm,i){
                            itm.el.removeClass().addClass('w121-gc ' + sortClasses[i] + ' ' + itm.sortDir.toLowerCase()).addClass(itm.cls);

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
                    me.currPage = -1;
                    me.tbl.scroll();
                },

    /** Overrides Wui.DataList.scrollToCurrent to turn of scrolling on the infinite grid. */
    scrollToCurrent:function(){},

    /** Overrides Wui.Data.setParams and allows for adding the infinite scroll parameters. */
    setParams:  function() {
                var me = this;

                $.extend(me.params,{limit:me.paging.limit, start: me.paging.start, sort:JSON.stringify(me.paging.sort)});

                if(typeof arguments[0] === 'object' && typeof arguments[0].start === 'undefined')
                    $.extend(arguments[0], {start:0});

                return Wui.Data.prototype.setParams.apply(me,arguments);
            },

    setData:        function(){
                        Wui.DataList.prototype.setData.apply(this,arguments);
                        this.sizeCols();
                    }
});

Wui.Form = function(args){
    $.extend(this,{
        disabled:       false,
        labelPosition:  'top',
        labelSize:      null,
        HTMLSubmit:     false,
    }, args, {
        el:             $('<div>'),
        errors:         [],
        formChanged:    false
    });
    
    this.init();
};
Wui.Form.prototype = $.extend(new Wui.O(),{
    clearData:  function(){ this.setData(); },

    dispErrors: function(){
                    var msg = '';

                    for(var i = 0; i < this.errors.length; i++) 
                        msg += this.errors[i] + '<br/>';

                    Wui.errRpt(msg,'Form Errors');
                },

    each:       function( f, blockNote, ascending ){
                    return Wui.O.prototype.each.call(
                        this,
                        function(itm,i){
                            if(!(blockNote && !(itm instanceof Wui.FormField))) return f(itm,i);
                        },
                        ascending
                    );
                },
    errCls:     'w121-form-err',
    getData:    function(){
                    if(this.validate()) { return this.getRawData(); }
                    else                { this.dispErrors(); return false; }
                },
    getField:   function(fieldname){
                    var retval = null;
                    this.each(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
                    return retval;
                },
    getFrmItm:  function(fieldname){
                    var retItm;
                    this.each(function(itm){ if(itm.name == fieldname) retItm = itm; });
                    return retItm;
                },
    getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); }, true);
                    return ret;
                },        
    init:       function(){
                    var me = this;
                    
                    Wui.O.prototype.init.call(me);

                    me.el.addClass('w121-form').on('submit', function(e){
                        // Prevent the form from submitting unless configured to do so
                        if(!me.HTMLSubmit)
                            e.preventDefault();
                    });

                    if(typeof me.id === 'undefined' || me.id === null)
                        me.id = Wui.id('w121-form');
                },
    normFrmItem:function(itm){
                    var me = this;

                    // If a form is disabled, the field needs to be disabled too
                    if(!(itm.disabled && itm.disabled === true)) $.extend(itm,{disabled: me.disabled});

                    if(itm.ftype && !(itm instanceof Wui.FormField)){
                        var ft = itm.ftype.split('.');

                        itm.labelPosition = itm.labelPosition || me.labelPosition;
                        itm.labelSize = itm.labelSize || me.labelSize;

                        if(ft[0] == 'Wui')  ft[0] = _wuiVar;
                        
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
                            itm.labelSize = me.labelSize;
                            // setLabelPosition calls setLabelSize and uses the item's labelSize that we just set.
                            itm.lbl.setLabelPosition( itm.labelPosition || me.labelPosition );
                        }
                        return itm;
                    }else{
                        return itm;
                    }
                },
    place:      function(){
                    var me = this;

                    if(me.items === undefined) me.items = [];
                    me.each(function(itm,i){ 
                        itm = me.items[i] = me.normFrmItem(itm);
                        if(itm.onRender) window.setTimeout(function(){ itm.onRender(); },0);
                    });
                    return Wui.O.prototype.place.apply(me,arguments);
                },
    push:       function(){
                    var me = this, itms = [];
                    
                    Array.prototype.forEach.call(arguments,function(arg){ itms.push(me.normFrmItem(arg)); });

                    return Wui.O.prototype.push.apply(this,itms);
                },
    splice:     function(){
                    var me = this, 
                        itms = [],
                        index = Array.prototype.shift.apply(arguments),
                        remove = Array.prototype.shift.apply(arguments);

                    // Create/normalize passed in objects
                    Array.prototype.forEach.call(arguments,function(arg){ itms.push(me.normFrmItem(arg)); });

                    // Add Elements back in
                    itms.splice(0,0,index,remove);
                    return Wui.O.prototype.splice.apply(this,itms);
                },
    remFrmItm:  function(fieldname){
                    var me = this;
                    this.each(function(itm,idx){ if(itm.name == fieldname) Wui.O.prototype.splice.call(me,idx,1); });
                    return true;
                },
    formChange: function(changed,changedItem){
                    var me = this;
                    if(changed)
                        me.el.trigger($.Event('formupdate'), [me, changedItem]);
                    me.formChanged = changed;
                    return me.formChanged;
                },
    setData:    function(data,fireEvents){
                    if(data){
                                this.setData();
                                this.each(function(itm){ 
                                    if(data[itm.name]) 
                                        itm.val(data[itm.name],fireEvents);
                                }, true);
                            }
                    else    {    this.each(function(itm){ itm.val(null,fireEvents); }, true); }
                    this.formChange(false);
                },
    disable:    function(){ 
                    this.disabled = true; 
                    return this.each(function(itm){ itm.disable(); }, true); 
                },
    enable:     function(){ 
                    this.disabled = false; 
                    return this.each(function(itm){ itm.enable(); }, true); 
                },
    setField:   function(fieldname, v){
                    this.each(function(itm){ if(itm.name == fieldname) itm.val(v); }, true);
                },
    throwError: function(err){
                    this.errors.push(err); 
                    return false;
                },
    validate:   function(){
                    var me = this;

                    me.errors = [];

                    me.each(function(itm){
                        if(typeof itm.el.toggleClass !== 'undefined')
                            itm.el.toggleClass( me.errCls, !itm.validate() );
                    }, true);

                    this.formChange(false);

                    return (me.errors.length === 0);
                }
});

Wui.Note = function(args){ 
    $.extend(this,{
        html:   ''
    },args);
    this.init();
};
Wui.Note.prototype = $.extend(new Wui.O(),{
    init:   function(){ this.el = $('<div>').html(this.html).addClass('w121-note'); },
    setHTML:function(html){ this.el.html(html); }
});

Wui.Label = function(args){ 
    $.extend(this,{
        html:           '',
        labelPosition:  'top',
        labelSize:      null
    },args);
    
    this.init(); 
};
Wui.Label.prototype = $.extend(new Wui.O(),{
    init:               function(){
                            var me = this;
                    
                            Wui.O.prototype.init.call(me);

                            me.el = $('<div>').addClass('w121-lbl').append( 
                                me.label = $('<label>',me.attr ? me.attr : {}).addClass(me.cls)
                            );

                            if(me.field.id && me.field.id.length)
                                me.label.attr('for', me.field.id);

                            me.setLabel();
                            me.setLabelPosition();
                        },
    setLabel:           function(newLabel){
                            newLabel = newLabel || this.html;
                            this.label.html(this.html = newLabel);
                            return this.label.html();
                        },
    setLabelSize:       function(size){
                            var me = this,
                                dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width',
                                altDim = (dimension == 'height') ? 'width' : 'height',
                                cssObj = {};

                            size = $.isNumeric(size) ? size : me.labelSize;

                            cssObj[dimension] = size;
                            cssObj[altDim] = '';
                            me.label.css(cssObj);

                            if(me.field)
                                me.field.labelSize = me.labelSize = size;
                        },

    setLabelPosition:   function(pos){
                            var me = this,
                            position = (pos && (pos = pos.toLowerCase()) && $.inArray(pos,['top', 'left', 'bottom', 'right']) >= 0) ? pos : me.labelPosition;

                            me.el.removeClass('lbl-' + me.labelPosition).addClass('lbl-' + position);
                            
                            if(me.field)
                                me.field.labelPosition = position;
                            
                            me.labelPosition = position;
                            me.setLabelSize();

                            return me.labelPosition;
                        }
});

Wui.FormField = function(args){
    $.extend(this,{
        disabled:       false,
        id:             null,
        invalidMsg:     null,
        label:          null,
        labelPosition:  'top',
        labelCls:       null,
        labelSize:      null,
        name:           null,
        required:       false,
        validRegEx:     null,
        validTest:      null
    },args);
};
Wui.FormField.prototype = $.extend(new Wui.O(),{
    argsByParam:function(){
                    Wui.O.prototype.argsByParam.apply(this,[ [ 'name', 'id' ], (this.hiddenField || this.field) ]);
                },
    init:       function(){
                    var me = this;
                    
                    Wui.O.prototype.init.call(me);

                    me.value = me.hasOwnProperty('value') ? me.value : null;
                    me.el = $('<div>').addClass('w121-fe');

                    if(!(me.name && me.name.length !== 0))
                        me.name = Wui.id('w121-form-field');

                    if(!(me.id && me.id.length !== 0) || !me.hasOwnProperty('id'))
                        me.id = me.name;

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

                        // Expose label methods at the formField's level
                        $.extend(me,{
                            setLabel: function(){ me.lbl.setLabel.apply(me.lbl, arguments); },
                            setLabelSize: function(){ me.lbl.setLabelSize.apply(me.lbl, arguments); },
                            setLabelPosition: function(){ me.lbl.setLabelPosition.apply(me.lbl, arguments); }
                        });
                    }

                    return me.el;
                },
    onRender:   function(){
                    var me = this;

                    if(me.rendered !== true){
                        if(me.disabled)
                            me.disable();
                        if(typeof me.value != 'undefined' && me.value !== null)
                            me.val(me.value,false);

                        Wui.O.prototype.onRender.call(me);
                    }
                },
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('w121-disabled').find('input,textarea,iframe').attr({readonly: true, tabIndex:-1});
                },
    enable:        function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('w121-disabled').find('.w121-disabled,*[readonly]').removeAttr('readonly tabIndex');
                },
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
    setChanged: function(oldVal){
                    var me = this;

                    // Marks the parent form as 'changed'
                    if(me.parent && me.parent instanceof Wui.Form)
                        me.parent.formChange(true, me);
                    
                    // Calls functionally defined valChange() - one will override another
                    me.valChange(me, me.value, oldVal);
                    
                    // Calls listeners for valchange
                    if(me.field) {
                        me.field.trigger($.Event('valchange'), [me, me.value, oldVal, me.val()]);
                    }
                    else {
                        $(document).trigger($.Event('hiddenchange'), [me, me.value, oldVal, me.val()]); // To preserve legacy
                    }
                },
    getVal:     function(){
                    return this.value;
                },
    setVal:     function(sv){
                    this.value = sv;
                },
    valChange:  function(){}
});

Wui.Hidden = function(args){
    $.extend(this, args, {
        label:  null,
        field:  $('<input>',{type:'hidden'})
    });
    this.init();
};
Wui.Hidden.prototype = new Wui.FormField({
    fieldText:  function(sv){ this.field.val(sv); },
    getVal:     function(){ 
                    this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null;
                    
                    return this.value;
                },
    init:       function(){
                    Wui.FormField.prototype.init.call(this);
                    this.el.hide();
                    this.append(this.field);
                },
    setVal:     function(sv){ this.fieldText(this.value = (sv && $.trim(sv).length) ? sv : null); }
});

Wui.Text = function(args){
    $.extend(this,{
        blankText:  '',
        counter:    false,
        maxChars:   null
    },args,{
        field:      $('<input>',{type:'text'})
    }); 
    this.init();
};
Wui.Text.prototype = $.extend(new Wui.Hidden(),{
    init:           function(){
                        var me = this;

                        Wui.FormField.prototype.init.call(me);

                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Text.prototype.setListeners.call(me,me));
                    },
    onRender:       function(){
                        var me = this;

                        if(me.rendered !== true){
                            Wui.FormField.prototype.onRender.call(me);

                            // Add a character counter - must be done outside the character counter
                            if($.isNumeric(me.maxChars) && me.counter === true){
                                me.append(me.charCounter = $('<output>',{tabindex:-1, for:me.id}).addClass('w121-char-counter'));
                                me.field.keyup(function(){
                                    var initVal = (me.val()) ? me.maxChars - me.val().length : me.maxChars;
                                    
                                    me.charCounter.text(initVal);
                                    if(initVal >= 0)    me.charCounter.css('color','#333');
                                    else                me.charCounter.css('color','#900');
                                });

                                me.field.keyup();
                            }
                        }
                    },
    setBlankText:   function(bt){
                        var me = this;
                        
                        me.blankText = bt;
                        me.field.attr('placeholder', bt);
                        
                        return bt;
                    },
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

                        if(this.setListeners !== Wui.Text.prototype.setListeners) this.setListeners(this);
                        return t.field;
                    }
});

Wui.Textarea = function(args){
    $.extend(this, { 
        field:  $('<textarea>'),
        height: 80
    }, args);
    this.init();
};
Wui.Textarea.prototype = $.extend(new Wui.Text(), {
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me); 
                },
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    this.field.css({ height: this.height });
                    this.el.css({ height: '' });
                }
});

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
        fullPath:   /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        relativePath: /(\/|\/([\w#!:.?+=&%@!\-\/]))/
    },args,{

    });
    this.init();
};
Wui.Wysiwyg.prototype = $.extend(new Wui.FormField(),{
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    this.field.css({ height: this.height });
                    this.el.css({ height: '' });
                },
    init:       function(){
                    var me = this,
                        iframeId = Wui.id();

                    //  TODO: Are we using mutation summary anymore??
                    me.observer = new MutationSummary({
                        callback:   function(){
                                        var edit = me.editor = me.iframe[0].contentWindow.document;

                                        // Make the iframe editable and set up its style
                                        edit.designMode = 'on';
                                        edit.open();
                                        edit.close();
                                        if(me.css.length) $('head',edit).append($('<style>').attr({type:'text/css'}).text(me.css));

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
                                                                        return (this.fullPath.test(v) || this.relativePath.test(v));
                                                                    },
                                                        setListeners:function(){
                                                                        var me = this;

                                                                        return me.field.on('blur click keyup keydown mousedown', function(){
                                                                            Wui.Link.prototype.buildOutput.call(me,{
                                                                                uri:    me.field.val(),
                                                                                target: '_blank',
                                                                                title:  r.toString()
                                                                            });
                                                                        });
                                                                    }
                                                    }]
                                                );
                                                window.setTimeout(function(){ a.parent.modalEl.css('z-index',Wui.maxZ()); }, 100);
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

                                        function updateText(){ me.setTextArea(); }

                                        $(edit.body)
                                            .focus(updateText)
                                            .click(updateText)
                                            .keyup(updateText)
                                            .keydown(updateText)
                                            .mousedown(updateText)
                                            .blur(updateText);

                                        $(me.elAlias || me.el).resizes({
                                            anchored:   true,
                                            minWidth:   (me.elAlias || me.el).outerWidth(),
                                            minHeight:  (me.elAlias || me.el).outerHeight()
                                        });
                                    },
                        queries:    [{ element: '#' + iframeId }]
                    });

                    Wui.FormField.prototype.init.call(me);

                    me.el.addClass('w121-wysiwyg');
                    me.append(
                        me.field = $('<textarea>',{tabIndex:-1}).hide(),
                        me.iframe = $('<iframe>',{id:iframeId}).addClass('w121-editor'),
                        me.tools = $('<div>').addClass('w121-editor-tools')
                    );

                    me.tools.append(
                        me.bold = $('<i class="fa fa-bold">',{tabIndex:-1, title:'Bold'}),
                        me.italic = $('<i class="fa fa-italic">',{tabIndex:-1, title:'Italic'}),
                        me.underline = $('<i class="fa fa-underline">',{tabIndex:-1, title:'Underline'}),
                        me.strike = $('<i class="fa fa-strikethrough">',{tabIndex:-1, title:'Strike-through'}),
                        me.link = $('<i class="fa fa-link">',{tabIndex:-1, title:'Link'}),
                        me.unlink = $('<i class="fa fa-unlink">',{tabIndex:-1, title:'Un-Link'}),
                        me.ol = $('<i class="fa fa-list-ul">',{tabIndex:-1, title:'Unorderd List'}),
                        me.ul = $('<i class="fa fa-list-ol">',{tabIndex:-1, title:'Ordered List'}),
                        me.left = $('<i class="fa fa-align-left">',{tabIndex:-1, title:'Left Align'}),
                        me.center = $('<i class="fa fa-align-center">',{tabIndex:-1, title:'Center Align'}),
                        me.right = $('<i class="fa fa-align-right">',{tabIndex:-1, title:'Right Align'})
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
    exec:       function (a, b, c) {
                    this.iframe[0].contentWindow.focus();

                    if (this.previousRange) {
                        var rng = this.previousRange;
                        var sel = this.getSelection();
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
    setTextArea:function(){
                    this.field.val(this.getVal());
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
    setVal:     function(sv){
                    var me = this;
                    me.value = sv;
                    me.field.val(sv);
                    if(me.editor)
                        $(me.editor.body).html(sv);
                }
});

Wui.Radio = function(args){ 
    $.extend(this,{
        /** A true value converts the normal radio group to a button group */
        buttonStyle:false,
        
        /** A default name that should be overridden */
        name:       'w121-radio',
        
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
    init:       function(){
                    Wui.FormField.prototype.init.call(this);
                    this.el.addClass('w121-radio');
                    
                    var me = this,
                        tplEngine = new Wui.Template({ template:this.template }),
                        ul = $('<ul>');
                    
                    me.options.forEach(function(itm){
                        itm.name = me.name;
                        itm.id = Wui.id('w121-form-multiple');
                        
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
                        this.el.addClass('w121-disabled').find('input,textarea,iframe').attr('disabled','disabled');
                },

    /** What to do when an individual element changes */
    elemChange:    function(elem){ this.val(elem.val()); },
    
    /** Enables the field so the user can interact with it. */
    enable:     function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('w121-disabled').find('.w121-disabled,*[disabled]').removeAttr('disabled');
                },
    getVal:     function(){ return this.value; },
    setChanged: function(oldVal){
                    var me = this;

                    // Marks the parent form as 'changed'
                    if(me.parent && me.parent instanceof Wui.Form)
                        me.parent.formChange(true, me);
                    
                    // Calls functionally defined valChange() - one will override another
                    me.valChange(me, me.value, oldVal);
                    
                    // Calls listeners for valchange
                    me.el.find('input:first').trigger($.Event('valchange'), [me, me.value, oldVal, me.val()])
                        .trigger($.Event('hiddenchange'), [me, me.value, oldVal, me.val()]); // To preserve legacy
                },
    setVal:     function(sv){
                    this.value = sv;
                    this.el.find("input[value='" + sv + "']").attr('checked',true);
                }
});

Wui.Checkbox = function(args){ 
    $.extend(this,{
        name:       'w121-checkbox',
        template:   '<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args);
this.init(); };
Wui.Checkbox.prototype = $.extend(new Wui.Radio(),{
    calcVal:    function(){
                    var me = this, a = [];
                    
                    me.el.find('input:checked').each(function(){
                        a.push($(this).val());
                    });
                    
                    return ((a.length > 0) ? (a.length > 1) ? a : a[0] : null);
                },
    elemChange: function(){ this.val(this.calcVal()); },                    
    init:       function(){
                    var me = this;
                    if(me.options.length === 0) me.options.push({val:1,title:''});
                    
                    Wui.Radio.prototype.init.call(me);
                    me.el.removeClass('w121-radio').addClass('w121-checkbox');
                    
                    //steal label if there is only one option
                    if(me.options.length == 1){
                        if(!(me.label && me.label.length))
                            throw('Wui Forms - A Checkbox field ' + (me.name ? '(\'' + me.name + '\')' : '') + ' requires a label if it doesn\'t have options defined.');
                        me.el.find('li label').html(me.label);
                        me.lbl.label.html('');
                        // me.el.css({paddingTop:0, paddingBottom:0});
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
    validTest:  function(){ if(this.required && this.val() === 0) return false;    return true; }
});

Wui.Combo = function(args){
    $.extend(this, {
        autoLoad:   false,
        ddCls:      '',
        emptyMsg:   'No Results.',
        field:      $('<input>',{type:'text'}),
        hiddenField:$('<input>',{type:'hidden'}),
        filterField:true,
        forceSelect:false,
        minKeys:    1,
        searchArgName:'srch',
        searchLocal:true,
        showDD:     true,
        titleItem:  null,
        valueItem:  null
    },args,{
        multiSelect:false
    }); 

    // Create template when one hasn't been defined
    if( !(this.hasOwnProperty('template') && this.template !== null && this.template !== undefined) &&
        this.hasOwnProperty('valueItem') &&
        this.hasOwnProperty('titleItem') &&
        this.valueItem &&
        this.titleItem
    ){
        this.template = '<li>{' +this.titleItem+ '}</li>';
        this.noSpecifiedTemplate = true;
    }
    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.FormField(), new Wui.DataList(), {
    close:      function(){ 
                    this._open = false;
                    this.dd.css('display','none');
                },
    argsByParam:function(){
                    Wui.O.prototype.argsByParam.apply(this,[ ['name'], (this.hiddenField || this.field) ]);
                },
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
    init:       function(){
                    var me = this;

                    // Set up object
                    Wui.FormField.prototype.init.call(me);
                    me.el.addClass('w121-combo ' + (me.idCls = Wui.id()));
                    me._open = false;
                    me.identity = me.valueItem;
                    if(typeof me.blankText !== 'undefined')
                        me.setBlankText(me.blankText);
                    

                    // Place field elements
                    me.append( 
                        me.wrapper = $('<div>').addClass('w121-combo').append(
                            me.hiddenField,
                            me.setListeners(me)
                        )
                    );
                    $('body').append( me.dd = $('<ul>').addClass('w121-combo-dd ' + me.ddCls) );

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
                        wuidblclick:function(evnt){ evnt.stopPropagation(); },
                        wuibtnclick:function(evnt){
                                        if(me._open) me.close();
                                        else         me.open();
                                        me.field.focus();

                                        evnt.stopPropagation();
                                    }
                    });

                    // Create Dropdown Button
                    if(me.showDD){
                        me.ddSwitch = new Wui.Button({
                            text:       '<i class="fa fa-angle-down"></i>',
                            tabIndex:   -1,
                            appendTo:   me.wrapper,
                            cls:        'field-btn dd-switch'
                        });
                        me.ddSwitch.place();
                        me.ddSwitch.el.mousedown(function(){ me.isBlurring = false; });
                    }
                },
    /** Override Wui.Datalist.onRender to make it do nothing */
    onRender:   function(){
                    if(this.rendered !== true){
                        // Loads data per the method appropriate for the object
                        if(this.autoLoad && this.url !== null)  this.loadData();
                        else if(this.url === null)              this.make();

                        Wui.FormField.prototype.onRender.apply(this,arguments);
                    }
                },
    itemSelect: function(itm, silent){
                    var me = this;

                    me.dd.find('.w121-selected').removeClass('w121-selected');
                    itm.el.addClass('w121-selected');
                    me.selected = [itm];
                    
                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },
    make:       function(){
                    var me = this;

                    me.elAlias = me.dd.empty().removeClass('w121-spinner');
                    Wui.DataList.prototype.make.call(me);
                    if(me.data.length === 0)
                        me.elAlias.html(me.emptyMsg);

                    window.setTimeout(function(){
                        me.dd.children()
                        .off('click')
                        .bind('touchstart',function(){ 
                            me.itemSelect($(this).data('itm')); 
                            me.isBlurring = false; 
                        }).on({
                            mouseenter: function(){ me.itemSelect($(this).data('itm')); },
                            mousedown:  function(){ me.isBlurring = false; },
                            click:      function(){ me.set(); me.field.focus(); }
                        });

                        if(me.previous && me.previous.length && me.noSpecifiedTemplate)
                            me.hilightText(me.previous);

                        me.dd.on('mousedown',function(){ me.isBlurring = false; });

                        // Select a pre-applied value if it exists
                        if(me.value && me.field.val().length === 0){
                            var selectedItm = me.selectBy(me.valueItem, me.value);
                            
                            if(!selectedItm)    me.notFound(me.value);
                            else                me.set();
                        }
                    },0);
                },
    modifyItem: function(itm){ return itm.el.data('itm',itm); },
    notFound:   function(){},
    open:       function(){
                    var me = this, 
                        width = (me.field.innerWidth() < 100) ? 100 : me.field.innerWidth();

                    me._open = true;

                    // Clear the drop down when it loses focus
                    $(document).one('click','*:not(.' +me.idCls+ ' input)',function(evnt){ 
                        if(evnt.target !== me.field[0]) me.close(); 
                    });
                    $('body').append(me.dd.css({width:width, display:'block'}));

                    Wui.positionItem(me.field,me.dd);
                    me.scrollToCurrent();
                },
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
                                me.dd.addClass('w121-spinner');

                                var srchParams = {};
                                srchParams[me.searchArgName] = srchVal;
                                me.loadData(srchParams);
                            }
                        }  
                    }
                },
    selectAjacent:function(num){
                    var me = this,
                        selector = me._open ? ':visible' : '',
                        container = me.elAlias || me.el,
                        theEnd = (num == 1) ? ':first' : ':last',
                        fn = (num == 1) ? 'nextAll' : 'prevAll',
                        itm = me.selected.length ? me.selected[0].el[fn](selector+':first') : container.children(selector+theEnd);

                    return me.selectByEl(itm);
                },
    selectBy:   function(key,val){
                    var me = this, retVal;

                    me.each(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val){
                            retVal = me.itemSelect(itm);
                            return retVal;
                        }
                    });

                    return retVal;
                },
    set:        function(){
                    var me = this, sel = me.selected[0];

                    if(sel && me.value != sel.rec){
                        me.val(sel.rec);

                        if(sel.rec)
                            me.hiddenField.val(sel.rec[me.valueItem]);
                    }
                        
                    if(me._open)
                        me.close();
                },
    setBlankText:function(){ 
                    Wui.Text.prototype.setBlankText.apply(this,arguments); 
                },
    setListeners:function(t){
                    // t = the combo field
                    return t.field.on({
                        keydown: function(evnt){
                            evnt.stopPropagation();

                            //clear the value if the user blanks out the field
                            if(t.field.val().length === 0){
                                t.value = null;
                                t.hiddenField.val('');
                            }

                            switch(evnt.keyCode){
                                case 40:    move(1);                break;  // downkey
                                case 38:    move(-1);               break;  // upkey
                                case 9:     t.set();                break;  // tab
                                case 13:    evnt.preventDefault();  break;  // enter
                                case 27:                                    // escape
                                    t.field.val(t.previous);
                                    t.close();
                                break;
                            }
                        },
                        keypress:function(evnt){
                            evnt.stopPropagation();
                            if(evnt.keyCode == 13)  // enter
                                evnt.preventDefault();
                        },
                        keyup: function(evnt){
                            evnt.stopPropagation();
                            if(evnt.keyCode == 13){  // enter
                                t.set();
                                evnt.preventDefault();
                            }
                        },
                        input: function(){
                            if(!t._open) t.open();
                            t.searchData(this.value);
                        },
                        focus: function(evnt){
                            t.isBlurring = undefined;
                            evnt.stopPropagation();
                        },
                        blur: function(){
                            if(t.isBlurring !== false){
                                t.close();
                            }else{
                                // IE needs some time
                                window.setTimeout(function(){ t.field.focus(); }, 10);
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
    setVal:     function(sv){
                    var me = this;

                    me.value = sv;

                    function selectObj(selectWith){
                        var val = me.selectBy(me.valueItem,selectWith);
                        if(typeof val != 'undefined'){
                            me.value = val.rec;
                            me.hiddenField.val(val.rec[me.valueItem]);
                        }else{
                            me.value = sv;
                            me.hiddenField.val( (typeof sv == 'number' || typeof sv == 'string') ? sv : '' );
                        }
                        return me.value;
                    }

                    if(sv === null){
                        me.clearSelect();
                        me.hiddenField.val('');
                        return sv;
                    }else{
                        return selectObj( (typeof sv == 'object') ? sv[me.valueItem] : sv );
                    }
                },
    getVal:     function(){
                    return (this.value !== null && typeof this.value[this.valueItem] != 'undefined') ? this.value[this.valueItem] : this.value;
                }
});

Wui.Link = function(args) { 
    $.extend(this, {
        invalidMsg: 'The value for \'' + ((this.label) ? this.label : (this.args && this.args.name) ? this.args.name : 'a link field') + '\' is not a properly formatted link.',
        fullPath:   /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        relativePath: /(\/|\/([\w#!:.?+=&%@!\-\/]))/
    }, args);
    this.init();
};
Wui.Link.prototype = $.extend(new Wui.FormField(),{
    buildOutput:function(v){
                    var me = this,
                        val = v || me.value;

                    if(me.outputFld === undefined)
                        me.append(me.outputFld = $('<output>',{tabindex:-1,for:me.id}).addClass('feedback'));

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
    init:       function(){
                    var me = this;
                    
                    me.items = [
                        me.urlField     = new Wui.Text({ cls:'w121-link-focus', blankText:'URL', linkData:'uri' }),
                        me.titleField   = new Wui.Text({ blankText:'Display Text', linkData:'title'}),
                        me.targetField  = new Wui.Combo({
                            valueItem:  'target', 
                            titleItem:  'name', 
                            blankText:  'Target', 
                            keepInline: true,
                            data:       [{target:'_self', name:'Opens In Same Window'}, {target:'_blank', name:'Opens In New Window/Tab'}], 
                            linkData:   'target',
                            cls:        'no-margin'
                        })
                    ];
                    
                    Wui.FormField.prototype.init.call(me);
                    me.value = { target: '_self', title: null, uri: null };
                    
                    (me.elAlias || me.el).addClass('w121-hyperlink');
                    
                    //additional listeners and initial value for target
                    me.setListeners(me.urlField,me.titleField,me.targetField);
                    me.targetField.val(me.value.target);
                   
                    me.urlField.field.keyup(function(){
                        //sets the title the same as the url - for laziness' sake
                        if(me.titleField.field.val() == me.titleField.blankText)
                            me.value.title = null;
                        if(me.value.title === null)
                            me.titleField.val($(this).val());
                    })
                    .blur(function(){ me.value.title = me.titleField.val(); });
                },
    setListeners:function(){
                    var me = this,
                        flds = arguments;
                        
                    Array.prototype.forEach.call(flds,function(itm){
                        (itm.field.field || itm.field).on('blur click keyup keydown mousedown', null, itm, function(e){
                            var wuiObjVal = e.data.val();
                            if(wuiObjVal !== null && wuiObjVal != {}) me.value[e.data.linkData] = wuiObjVal;
                            me.buildOutput.call(me);
                        })
                        .on('focus',null, itm, function(e){
                            Array.prototype.forEach.call(flds,function(field){ field.el.removeClass('w121-link-focus'); });
                            e.data.el.addClass('w121-link-focus');
                        });
                    });
                },       
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
    validTest:  function(){ if(this.required && !this.testLink()) return false; return true; }
});

Wui.Datetime = function(args){ 
    $.extend(this,args,{ 
        field:      $('<input>',{type:'text'}),
        hiddenField:$('<input>',{type:'hidden'}),
        maxDate:    null,
        minDate:    null
    });
    this.init();
};

// If date has already been extended, dont' attempt to extend it again
if(typeof Date.CultureInfo === 'undefined'){
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

Wui.Datetime.prototype = $.extend(new Wui.Text(), {
    second:         1e3,
    minute:         6e4,
    hour:           36e5,
    day:            864e5,
    days:           ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'],
    shortDays:      ['sun','mon','tue','wed','thu','fri','sat'],
    months:         ['january','february','march','april','may','june','july','august','september','october','november','december'],
    shortMonths:    ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
    sarcasmArray:   ['Not quite.','Huh?','Nope','Arg..','Sorry','What?','Bleck.','Nuh-uh.','Keep Trying.','No Entiendo.'],
    dispFormat:     'ddd MM-dd-yyyy h:mm tt',
    dtFormat:       'MM-dd-yyyy h:mm tt',
    dateOnly:       false,
    argsByParam:    function(){
                        Wui.O.prototype.argsByParam.apply(this,[ ['name'], (this.hiddenField || this.field) ]);
                    },
    displayDate:    function(overrideText){
                        var me = this;
                        
                        // process current date value
                        if(overrideText !== undefined){ me.outputFld.html(overrideText); return overrideText; }
                        if(me.value === '' || (!me.value)) { return null; }
                        
                        //validation for min and max
                        if(me.minDate && me.value < me.minDate)         me.outputFld.html(me.toString() + ' is before the min date.');
                        else if (me.maxDate && me.value > me.maxDate)   me.outputFld.html(me.maxDate.toString(me.dtFormat) + ' is past the max date.');
                        else                                            me.outputFld.html(me.toString(me.dispFormat));
                        
                        return  me.toString();
                    },
    getM:           function(num){
                        var magnitude = 0;
                        while((num = num / 10) >= 1) magnitude++;
                        return magnitude;
                    },
    init:           function(){
                        var me = this;

                        Wui.Text.prototype.init.call(me);

                        me.el.addClass('w121-datetime');

                        // Limit field to dates only if specified
                        if(me.dateOnly){
                            if(!me.hasOwnProperty('dispFormat')) me.dispFormat = 'ddd MM-dd-yyyy';
                            if(!me.hasOwnProperty('dtFormat')) me.dtFormat = 'MM-dd-yyyy';
                        }

                        // Add datepicker
                        me.append(
                            $('<div>').addClass('w121-date').append( 
                                me.hiddenField, 
                                me.setListeners(me), 
                                me.outputFld = $('<output>',{tabindex:-1, for:me.id}).addClass('feedback'),
                                me.toggleCal = $('<button>',{tabIndex:-1}).html('<i class="fa fa-calendar"></i>')
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
                                    $('.w121-cal').remove(); me.calendar = undefined;
                                });

                                // Position calendar to ensure it will be seen
                                Wui.positionItem(me.field,me.calendar);
                            // Otherwise clear the calendar
                            }else{ me.calendar.remove(); me.calendar = undefined; }

                            // Prevent the click from propagating
                            return false;
                        });
                    },
    onRender:       Wui.FormField.prototype.onRender,
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
    makeCalendar:   function(dt,onSelect,controlVal){
                        var me = this,
                            today = new Date(),
                            ctrlVal = this.validDate(controlVal) ? controlVal : this.value,
                            calDate = dt || (me.validDate(ctrlVal) ? ctrlVal : today),
                            dn = (me.name) ? '.' + me.name : '',
                            calendar = $('<div>').addClass('w121-cal');

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
                                html = '<table w121-month="' +month+ '" w121-year="' +year+ '">';
                            
                            // Generate Header
                            html += '<tr><th colspan="7"><div class="w121-cal-header">' + monthName + "&nbsp;" + year + '</div></th></tr>';
                            html += '<tr class="w121-cal-header-day">';
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
                                            disableCls = ((me.minDate && dayDt < me.minDate) || me.maxDate && dayDt > me.maxDate) ? ' w121-cal-disabled' : '';
                                        
                                        html += '<a class="w121-cal-day' +disableCls+ '">' +(day++)+ '</a>';
                                    }
                                    html += '</td>';
                                }
                                // stop making rows if we've run out of days
                                if (day > monthLength)  break;
                                else                    html += '</tr><tr>';
                            }
                            html += '</tr></table>';

                            var tbl = $(html),
                                header = tbl.find('.w121-cal-header');

                            // Set up listeners
                            header.append('<a class="w121-cal-prev fa fa-caret-left">','<a class="w121-cal-next fa fa-caret-right">');
                            header.children('a').click(function(){
                                var dir = $(this).hasClass('w121-cal-prev') ? -1 : 1,
                                    newDt = new Date(year, month + dir, 1);

                                calendar.empty().append(genHTML(newDt));
                                // Fire event for other controls to respond to calendar reflow
                                $(document).trigger($.Event('calupdate' + dn), [me, calendar, newDt]);
                            });
                            
                            if(ctrlVal && ctrlVal.getMonth && ctrlVal.getMonth() == month && ctrlVal.getFullYear() == year)
                                tbl.find('a:contains(' +selectDy+ '):first').addClass('w121-selected');
                            
                            if(today.getMonth() == month && today.getFullYear() == year)
                                tbl.find('a:contains(' +today.getDate()+ '):first').addClass('w121-highlight');

                            tbl.find('td a:not(.w121-cal-disabled)').click(function(){
                                var dt = $(this),
                                    day = parseInt(dt.text()),
                                    info = dt.parents('[w121-month]'),
                                    month = parseInt(info.attr('w121-month')),
                                    year = parseInt(info.attr('w121-year'));

                                onSelect(year,month,day);

                                me.calendar.remove(); 
                                me.calendar = undefined;
                            });

                            return tbl;
                        }
                    },
    processDate:    function(dtString){
                        var me = this,
                            dateString = dtString || me.field.val();
                        
                        if (dateString.length > 0) {
                            var genDate = me.translateDate(dateString);
                            
                            //Returns a message to the user that the program doesn't understand them
                            if(genDate.toString() == 'Invalid Date'){
                                me.displayDate(me.sarcasmArray[Wui.randNum(0,(me.sarcasmArray.length -1))]);
                                me.hiddenField.val('');
                                return;
                            }
                            
                            me.value = genDate;
                            me.hiddenField.val(me.value.toString(me.dtFormat));
                            me.displayDate();
                            return genDate;
                        }else{
                            me.value = null;
                            me.hiddenField.val('');
                            me.displayDate('');
                        }
                    },
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
    setMinDate:     function(minDt){ 
                        var me = this;
                        me.minDate = me.translateDate(minDt.toString());
                        me.field.datepicker( "option", "minDate", new Date(me.minDate.valueOf() + me.minute));
                        return me.minDate;
                    },
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
                        .replace(/(next|last) ([a-z]{3,10})[ ]*([0-9]+)*/,function(m, dir, word, day){      // Translate days of week & months into dates
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
                            this.hiddenField.val('');
                            this.outputFld.html('');
                            this.value = null;
                        }
                    },
    toString:       function(format){
                        if(this.value !== null)
                            return this.value.toString(format || this.dtFormat) || '';
                        else
                            return '';
                    },
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

Because File can upload via AJAX, it doesn't require the tight server coupling that
Wui.File() does, and thus doesn't have to be extended to be immediately useful.
*/
Wui.File = function(args) {
    $.extend(this,{
        /** Sets the accept attribute on the html element */
        accept:     null,

        /** When set to true, allows the user to select multiple files to upload */
        multiple:   false,
        field:      $('<input>').attr({type:'file'})
    },args);
    this.init();
};

Wui.File.prototype = $.extend(new Wui.Text(), {
    disable:function(){
                this.disabled = true;
                if(this.el && this.el.addClass)
                    this.el.addClass('w121-disabled').find('input,textarea,iframe').attr('disabled','disabled');
            },
    
    /** Enables the field so the user can interact with it. */
    enable: function(){
                this.disabled = false;
                if(this.el && this.el.addClass)
                    this.el.removeClass('w121-disabled').find('.w121-disabled,*[disabled]').removeAttr('disabled');
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

Wui.Toggle = function(args){
    $.extend(this,{
        opt1:           'option 1',
        opt2:           'option 2',
        borderRadius:   0,
        opt1Color:      "#555",
        opt2Color:      "#555",
        toggleHeight:   26,
        toggleWidth:    150
    },args,{
        field:  $('<input>').attr({type:'hidden'}),

        toggler:$('<div class="w121-toggle-outer">' + 
                       '<div class="w121-toggler">' + 
                           '<div class="w121-opt-1"></div>' + 
                           '<div class="w121-toggle-btn">&nbsp;</div>' + 
                           '<div class="w121-opt-2"></div>' + 
                       '</div>' + 
                '</div>')
    }); 
    this.init();
};
Wui.Toggle.prototype = $.extend(new Wui.FormField(),{
    init:           function(){
                        var me = this, th = me.toggleHeight;

                        Wui.FormField.prototype.init.call(me);

                        // If a width is explicitly defined, make the field that width
                        me.toggleWidth = $.isNumeric(me.width) ? me.width : me.toggleWidth;
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Toggle.prototype.setListeners.call(me,me));

                        // Init Field
                        me.toggler.find('.w121-opt-1').html(me.opt1);
                        me.toggler.find('.w121-opt-2').html(me.opt2);
                        me.val(me.opt1);

                        // Add Class and set CSS to desired dimensions
                        (me.elAlias || me.el).addClass('w121-toggle');
                        me.el.find('.w121-toggle-outer').height(th - 2).width(me.toggleWidth);
                        me.el.find('.w121-toggle-outer, .w121-toggle-btn').css('border-radius', me.borderRadius);
                        me.el.find('.w121-toggle-btn').css({
                            width:  th - 4,
                            left:   'calc(50% - ' + (th - 4) + 'px)'
                        });
                        me.el.find('.w121-opt-1').css({
                            'text-indent':      -(th - me.borderRadius) + (me.borderRadius ? 0 : 2),
                            'background-color': me.opt1Color
                        });
                        me.el.find('.w121-opt-2').css({
                            'text-indent':      th - me.borderRadius - (me.borderRadius ? 0 : 2),
                            'background-color': me.opt2Color
                        });
                    },
                    
    setListeners:   function(t){
                        var me = this;
                        
                        t.toggler.click(function(){
                            me.val( (me.value == me.opt1) ? me.opt2 : me.opt1 );
                            me.el.find('.w121-toggle-btn').css('left','calc(50% - ' + ((me.toggleHeight - 4) * ((me.value == me.opt1) ? 1 : 0)) + 'px)');
                        });
                        
                        if(this.setListeners !== Wui.Toggle.prototype.setListeners) this.setListeners(this);
                        return [t.field,t.toggler];
                    },
    setVal:         function(sv){ 
                         var me = this;

                         me.value = sv;
                         me.toggler[ (me.value == me.opt2) ? 'addClass' : 'removeClass' ]('w121-toggle-alt');
                         me.field.val( me.value ? me.value : '' );
                    }
});

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
                            new Wui.Button({ text:'Cancel' }),
                            new Wui.Button({ text:'Submit' })
            ],
            init:       function(){
                            var me = this;

                            Wui.Window.prototype.init.apply(me,arguments);

                            me.footer.el.on('wuibtnclick',function(evnt,btn){
                                if(btn.text == 'Cancel')    me.doClose();
                                else                        me.getVal();
                                evnt.stopPropagation();
                            });
                        },
            isModal:    true,
            items:      [inputFrm],
            cls:        'w121-input-window',
            width:      600,
            height:     400,
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


})(jQuery, window[_wuiVar]);



/*! Wui 1.2.1
 * Copyright (c) 2015 Stephen Rolfe Nielsen (rolfe.nielsen@gmail.com)
 *
 * @license MIT
 * http://www.wui-js.com/wui-1-2-1/license.html
 */ 

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