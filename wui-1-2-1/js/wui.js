/*! Wui 1.2.1
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2.1/license.html
 */

// Make sure the WUI is defined and doesn't conflict with other versions on the page
var _wuiVar = (function(){
    if(typeof Wui === 'undefined'){
        Wui = { version: '1.2.1' };
        return 'Wui';
    }else{
        _w = { version: '1.2.1' };
        return '_w';
    }
})();


(function($,window,Wui) {

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
                                        return 'row'
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
        collection.forEach(function(itm,i){
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


Wui.maxZ = function(){
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


Wui.percentToPixels = function(el,percent,dim){
    var parent = el.parent(),
        useWindow = (parent[0] === $(window)[0] || parent[0] === $('html')[0] || parent[0] === $('body')[0]),
        parentSize = (useWindow) ? ((dim == 'height') ? $.viewportH() : $.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
};


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
                    })();

    child.css({
        left:       (plRight) ? ofst.left + parent.outerWidth() - cWidth : ofst.left,
        top:        (plBelow) ? ofst.top + parent.outerHeight() : ofst.top - ($.isNumeric(cHeight) ? cHeight : child.outerHeight()),
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


// Base WUI Object
Wui.O = function(args){ $.extend(this, {
    aftrRenderd:false,
    hidden:     false,
    items:      [],
    rendered:   false
},args); };
Wui.O.prototype = {
    addToDOM:   function(obj, tgt, act){
                    // Take the target and action from the passed object first if defined, then default to passed arguments, 
                    // then to a default of $('body') and 'append'
                    var target  = (typeof obj.appendTo != 'undefined') ? obj.appendTo :
                                    (typeof obj.prependTo != 'undefined') ? obj.prependTo :
                                        (typeof tgt != 'undefined' && tgt !== null) ? tgt : 
                                            (obj.parent && typeof obj.parent.elAlias != 'undefined') ? obj.parent.elAlias :
                                                (obj.parent && typeof obj.parent.el != 'undefined') ? obj.parent.el : $('body'),
                        action = (typeof obj.appendTo != 'undefined') ? 'append' : 
                                    (typeof obj.prependTo != 'undefined') ? 'prepend' : 
                                        (typeof act != 'undefined' && target[act]) ? act : 'append';

                    // Try appending with WUI modifiers, else just append in good ol' jQuery fashion
                    try{
                      $(target)[action](obj.el);
                    }catch(e){
                        try{
                            $(target)[action](obj);
                        }catch(e){}
                    }

                    if(obj.cssByParam)
                        obj.cssByParam();
                    
                    return obj;
                },
    afterRender:function(){ this.aftrRenderd = true; },
    append:     function(obj){
                    var me = this, el = me.elAlias || me.el;
                    $.each(arguments,function(i,itm){
                        el.append(itm);
                    });
                },

    argsByParam:function(){
                    var me = this,
                        applyAttr = {},
                        attrs = ['id', 'name', 'tabindex', 'lang', 'title'],
                        wuiAttrs = ['id', 'name', 'tabIndex', 'lang', 'titleAttr'];

                    attrs.forEach(function(atr,idx){
                        var attrVal = me[wuiAttrs[idx]];

                        if((typeof attrVal == 'string' || typeof attrVal == 'number'))
                            applyAttr[atr] = attrVal;
                    });

                    $(me.el).attr(applyAttr);
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
                        if(a != 0) $.extend(cssParamObj,{width:a, flex:'none'});
                    }
                    if(Wui.isPercent(me.height)){
                        a = Wui.percentToPixels(el,me.height,'height');
                        if(a != 0) $.extend(cssParamObj,{height:a});
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

    hide:       function(speed, callback){ 
                    this.el.hide();
                    if(typeof callback == 'function')
                        callback();
                    return this.el;
                },

    index:       function(){ 
                    var me = this, myPosition = undefined;
                    if(me.parent){
                        // Get my position within the parental array
                        me.parent.each(function(itm,idx){ if(itm === me) myPosition = idx; });
                    }
                    return myPosition;
                },

    init:       function(){},

    layout:     function(afterLayout){
                    var me = this, needFit = false;

                    // Perform Wui.fit on items that need it
                    me.items.forEach(function(itm){ if(itm.fit){ needFit = true; return false; }});
                    
                    if((me.fitDimension || needFit) && me.items.length)
                        Wui.fit(me.items, (me.fitDimension || undefined));
                    
                    if(!me.rendered)       me.onRender();

                    me.layoutKids();

                    if(!me.aftrRenderd)    me.afterRender();
                    
                    // Performs actions passed in as parameters
                    if(typeof afterLayout === 'function')
                        afterLayout();
                },

    layoutKids: function(){
                    this.items.forEach(function(itm){ if(itm.layout) itm.layout(); });
                },

    onRender:   function(){ 
                    if(this.rendered !== true){
                        if(this.items === undefined) 
                            this.items = [];

                        this.items.forEach(function(itm){ 
                            if(itm.onRender) setTimeout(function(){ itm.onRender(); },0);
                        });
                    }
                    
                    this.rendered = true; 
                },

    place:      function(after){
                    var me = this;

                    // Adds the objects items if any
                    if(me.items === undefined) me.items = [];

                    me.items.forEach(function(itm){ 
                        itm.parent = me;
                        if(itm.place)    itm.place();
                        else             me.addToDOM(itm);
                    });
                    
                    // Puts the object on the DOM
                    return me.addToDOM(me);
                },

    push:       function(){
                    var me = this;
                    
                    if(me.items === undefined) me.items = [];
                    
                    $.each(arguments,function(i,arg){
                        arg.parent = me;
                        if(arg.place)   arg.place();
                        else            me.addToDOM(arg);
                    });

                    me.layoutKids();

                    return Array.prototype.push.apply(me.items,arguments);
                },

    remove:     function(){
                    if(this.parent) this.parent.splice(this.index(),1);
                    else            this.el.remove();
                },

    show:       function(speed, callback){ 
                    this.el.show();
                    if(typeof callback == 'function')
                        callback();
                    return this.el;
                },

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
                    if(me.items.length == numAdded){                    //items ended up replacing the array
                        for(i = 0; i < me.items.length; i++)          { me.items[i].parent = me; me.addToDOM(me.items[i],el);  }
                    }else if(me.items[(idx + numAdded)] === undefined){ //meaning the new items were inserted at the end of the array
                        for(i = idx; i < me.items.length; i++)        { me.items[i].parent = me; me.addToDOM(me.items[i],me.items[i-1].el,'after'); }
                    }else if (numAdded !== 0){                          //items at the beginning/middle of the array
                        for(i = (idx + numAdded); i > 0; i--)         { me.items[i-1].parent = me; me.addToDOM(me.items[i-1],me.items[i].el,'before'); }
                    }

                    me.layoutKids();
                    
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
    disable:    function(){
                    this.disabled = true;
                    this.el
                    .toggleClass('disabled',this.disabled)
                    .attr('disabled',true)
                    .removeAttr('tabindex');
                },
    enable:     function(){
                    this.disabled = false;
                    this.el
                    .toggleClass('disabled',this.disabled)
                    .removeAttr('disabled')
                    .attr({tabindex:this.tabIndex});
                },
    init:       function(){ 
                    var me = this;
                    
                    me.el
                    .addClass('w121-button')
                    .click(btnClick)
                    .keypress(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                        return false;
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    // if(me.disabled)    me.disable();
                    
                    function btnClick(e){
                        if(!me.disabled)
                            me.el.trigger($.Event('wuibtnclick'),[me]);

                        return false;
                    }
                },
    setText:    function(txt){ return this.el.html(txt); }
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

                        if(target.children('w121-mask').length === 0)
                            return this.mask = $('<div>')
                                                .addClass('w121-mask')
                                                .append(
                                                    $('<span>').html(this.maskHTML)
                                                )
                                                .appendTo(target);
                        else
                            return null;
                    },
    afterRender:    function(){
                        var me = this;

                        Wui.O.prototype.afterRender.call(me);
                        if(me.parent){
                            Wui.fit(me.parent.items, (me.parent.fitDimension || 'width'));
                            me.el.parent().css('overflow','hidden');
                        }
                    },
    disable:        function(){
                        var me = this;

                        me.addMask();
                        me.footer.items.forEach(function(itm){ if(itm.disable) itm.disable(); });
                        me.header.items.forEach(function(itm){ if(itm.disable) itm.disable(); });

                        return me.disabled = true;
                    },   
    enable:         function(){
                        var me = this;

                        me.removeMask();
                        me.footer.items.forEach(function(itm){ if(itm.enable) itm.enable(); });
                        me.header.items.forEach(function(itm){ if(itm.enable) itm.enable(); });

                        return me.disabled = false;
                    },
    init:           function(){
                        var me = this;
                            el = me.el = $('<div>').addClass('w121-pane');

                        Wui.O.prototype.init.apply(me,arguments);

                        if(!me.border)      
                            el.addClass('no-border');

                        if(me.title !=null)
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
                                items:      [],
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
                                hasBar =    me.el.hasClass(bar),
                                hasItems =  (function(){
                                                var barItemNum = 0;

                                                thisBar.items.forEach(function(itm){
                                                    if(itm instanceof Wui.O)
                                                        barItemNum++;
                                                });

                                                return barItemNum > 0;
                                            })();

                            if(!hasBar && hasItems){
                                me.el.addClass(bar);
                                thisBar.place();
                            }else if (hasBar && !hasItems){
                                me.el.removeClass(bar);
                                thisBar.el.remove();
                            }
                        }
                    },
    onRender:   function(){ 
                        var me = this;

                        if(me.rendered !== true){
                            if(me.items === undefined) me.items = [];
                            me.items.forEach(function(itm){ 
                                if(itm.onRender) setTimeout(function(){ itm.onRender(); },0);
                            });

                            if(me.header) me.header.onRender();
                            if(me.footer) me.footer.onRender();

                            // After all of the work done by flexbox, Chrome has a lousy implementation that requires
                            // setting the content explicitly with JS
                            setTimeout(function(){
                                if(parseInt(me.container.height()) != me.el.height())
                                me.container.css('height', me.el.height());
                            },0);
                        }
                        this.rendered = true; 
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
        bbar:       [],
        border:     true,
        draggable:  true,
        isModal:    false,
        maskHTML:   'Loading <span class="w121-spinner"></span>',
        onWinClose: function(){},
        onWinOpen:  function(){},
        resizable:  true,
        tbar:       [],
        title:      'Window',
        windowLeft: null,
        windowTop:  null
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
                    me.container.trigger($.Event('resize'),[me.container.width(), me.container.height(),me,width,height]);
                },
    init:       function(){
                    var me = this;
                    me.appendTo = $('body');
                    
                    // Make it a modal window & add everything to the DOM
                    if(me.isModal){
                        me.modalEl = $('<div>').addClass('w121-overlay');
                        $('body').append(
                            me.appendTo = me.modalEl.css('z-index',Wui.maxZ()).on('mousewheel',noScroll)
                        );
                    }
                    
                    // Add close buttons where appropriate
                    me.tbar.push(
                        me.closeBtn = new Wui.Button({ text:'X', name:'window_close' })
                    );
                    if(me.bbar.length === 0) 
                        me.bbar = [new Wui.Button({ text:'Close', name:'window_close' })];
                    
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

                    // Put the window on the body
                    me.place();
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    me.onWinOpen(me);
                    me.windowEl.trigger($.Event('open'),[me]);

                    function noScroll(evnt){ evnt.stopPropagation(); }

                    function bringToFront(e){
                        var maxZ = Wui.maxZ();
                        if(parseInt((me.el.css('z-index')) || 1) <= maxZ){
                            me.el.css('z-index', maxZ);
                        }
                    }

                    me.el.on('wuibtnclick','[name=window_close]',function(evnt,btn){
                        me.close();
                        evnt.stopPropagation();
                    });
                },
    afterRender:function(){
                    Wui.Pane.prototype.afterRender.call(this);
                    this.resize();
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
                            posLeft =   (me.windowLeft) 
                                            ? ($.isNumeric(me.windowLeft) ? me.windowLeft : Wui.percentToPixels($('html'), me.windowLeft, 'width')) 
                                            : Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)),
                            posTop =    (me.windowTop) 
                                            ? ($.isNumeric(me.windowTop) ? me.windowTop : Wui.percentToPixels($('html'), me.windowTop, 'height')) 
                                            : Math.floor(($.viewportH() / 2) - (useHeight / 2));
                        me.windowEl.css( $.extend(cssParamObj, { top:posTop, left:posLeft }) );

                        me.fireResize();
                        return {width:me.windowEl.outerWidth(), height:me.windowEl.outerHeight()};
                    }
                    
                    return false;
                },
    height:     300,   
    width:      400
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


Wui.DataList = function(args){
    $.extend(this, {
        afterMake:      function(){},
        autoLoad:       true,
        displayMax:     -1,
        el:             $('<div>'),
        init:           function(){},
        multiSelect:    false,
        selected:       []
    }, args);
    this.init();
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
                            var alreadySelected = $(row).hasClass('w121-selected');
                            
                            if(!e.shiftKey){
                                // WHEN THE CTRL KEY IS HELD SELECT/DESELECT INDIVIDUAL ITEMS
                                $(row).toggleClass('w121-selected',!alreadySelected);

                                if(alreadySelected) $.each(me.selected || [], function(idx,sel){ if(sel == itm) me.selected.splice(idx,1); });
                                else                me.selected.push(itm);
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
    init:       function(){
                    var me = this;

                    if(!(me.name !== null && me.name.length !== 0))
                        me.name = Wui.id('w121-data-list');

                    if(!(me.id !== null && me.id.length !== 0))
                        me.id = me.name;

                    // Adds a document listener
                    $(document).on('keyup',function(evnt){
                        if(me.selected && me.selected[0] && (document.activeElement == me.selected[0].el[0])){
                            // Simulate a double click if enter or spacebar are pressed on a currently selected/focused item
                            if(evnt.keyCode == 13 || evnt.keyCode == 32){ me.selected[0].el.click(); me.selected[0].el.click(); }
                            if(evnt.keyCode == 38)  me.selectAjacent(-1);  // 38 = up
                            if(evnt.keyCode == 40)  me.selectAjacent(1);   // 40 = down
                        }
                    });
                },
    itemSelect: function(itm, silent){
                    var me = this, 
                        dn = (me.name) ? '.' + me.name : ''
                        old = [];
                    
                    if(me.selected.length > 0 && !me.multiSelect && !silent){
                        var old = $.extend(true,[],me.selected);
                        me.el.trigger($.Event('wuideselect'),[me, old[0].el, old[0].rec, old]);
                    }
                        
                    me.el.find('.w121-selected').removeClass('w121-selected').removeAttr('tabindex');
                    itm.el.addClass('w121-selected').attr('tabindex',1).focus();
                    me.selected = [itm];


                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'+ dn), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },
    itemDeselect:function(itm){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

                    if(me.selected.length > 0)
                        itm.el.removeClass('w121-selected');
                    
                    me.selected = [];
                    me.el.trigger($.Event('wuideselect' + dn),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange' + dn), [me, itm.el, itm.rec, me.selected])
                        .trigger($.Event('wuideselect'),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    return itm;
                },
    modifyItem: function(itm){ return itm.el; },
    make:       function(){
                    var me = this,
                        te = new Wui.Template({template: me.template}),
                        maxI = (me.data.length > me.displayMax && me.displayMax > 0) ? me.displayMax : me.data.length;
                    
                    // Clear out items list
                    me.clear();
                    me.items = [];

                    function makeItems(i){
                        setTimeout(function(){
                            var rec = te.data = me.data[i],
                                itm = {el:te.make(i), rec:rec};
                                
                            Array.prototype.push.call(me.items,itm);
                            (me.elAlias || me.el).append(me.createItem(itm));

                            if(i + 1 == maxI){
                                // Event hook and event
                                me.afterMake();
                                me.el.trigger($.Event('refresh'),[me,me.data]);

                                // Reset selected items if any
                                me.resetSelect();
                            }
                        },0);
                    }

                    // Add items to me.items
                    for(var i = 0; i < maxI; i++) makeItems(i);
                    
                    // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                    // object has been manually run
                    me.autoLoad = true;
                },
    onRender:   function(){
                    var me = this;

                    if(me.rendered !== true){
                        // Loads data per the method appropriate for the object
                        if(me.autoLoad){
                            if(this.url === null)   me.make();
                            else                    me.loadData();
                        }

                        Wui.O.prototype.onRender.call(this);
                    }
                                       
                },
    selectAjacent:function(num){
                        var me = this, selectAjc = me.selected[0].el[(num > 0) ? 'next' : 'prev']();
                        return me.selectByEl(selectAjc);
                    },
    selectByEl: function(el){
                    var me = this, retVal = undefined;

                    me.itemSelect(retVal = me.getItemByEl(el));
                    me.scrollToCurrent();
                    
                    return retVal;
                },
    getItemByEl:function(el){
                    var me = this, retVal = undefined;

                    me.items.forEach(function(itm){ if(itm.el[0] == el[0]) retVal = itm; });
                    
                    return retVal;
                },
                
    refresh:    function(){ this.onRender(); },
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
                        ofstP.animate({scrollTop:offset },100);
                    },
    selectBy:   function(key,val){
                    var me = this, retVal = undefined;
                    me.items.forEach(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val)
                            return retVal = me.itemSelect(itm);
                    });
                    me.scrollToCurrent();
                    return retVal;
                }
});


Wui.msg = function(msg, msgTitle, callback, content){
    var cntnt = [new Wui.O({el: $('<div>').addClass('w121-msg').html(msg) })];
    
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


Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
    var err = Wui.msg(errMsg,msgTitle,callback);

    if($.isArray(buttons))
        err.footer.push.apply(err.footer,buttons);
    err.container.find('.w121-msg').addClass('w121-err');
    err.resize();

    return err;
};


Wui.confirm = function(msg, msgTitle, callback, content){
    var cw = Wui.msg.apply(this,arguments);

    cw.doAnswer = function(ans){
        if(callback && typeof callback == 'function')    callback(ans);
        cw.answerRun = true;
        cw.close();
    };
    cw.onWinClose= function(){ return ((cw.answerRun !== true) ? false : cw.answerRun); };

    cw.footer.splice(0,1, new Wui.Button({ text:'No' }), new Wui.Button({ text:'Yes' }) );
    cw.footer.el.on('wuibtnclick',function(evnt,btn){
        cw.doAnswer((btn.text == 'No') ? false : true);
        evnt.stopPropagation();
    });

    cw.header.splice(0,1);

    cw.resize();

    return cw;
};


}(jQuery,this,window[_wuiVar]));