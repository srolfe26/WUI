/*! Wui 1.3
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.3/license.html
 */

// Make sure the WUI is defined and doesn't conflict with other versions on the page
var _wuiVar =   (function(){
                    if(typeof Wui === 'undefined'){
                        Wui = { version: '1.3' };
                        return 'Wui';
                    }else{
                        _w = { version: '1.3' };
                        return '_w';
                    }
                })();


(function($,window,Wui) {

// AJAX error reporting and caching.
$.ajaxSetup({ 
    cache:  false,
    error:  function(response){
                var err = null;
                
                try{        err = $.parseJSON( response.responseText ); }
                catch(e){   err = {fatalError:'Aw Snap! There was a problem talking to the server.'}; }

                if(err !== null) Wui.errRpt(err.fatalError);
            }
});


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
        var parent      = (collection[0].parent) ? collection[0].parent : collection[0].el.parent(),
            parentEl    = (parent.el) ? (parent.elAlias || parent.el) : parent,
            dir         = (dim == 'width') ? 'row' : 'column';

        dim = (dir == 'row') ? 'width' : 'height';

        // Make the containing element flex
        parentEl.css( 'display', Wui.cssCheck('flex') ).css( Wui.cssCheck('flex-direction'), dir );
       
        // Apply CSS Flex properties
        $.each(collection,function(i,itm){
            var css = {};
            if(itm.fit){
                $(itm.el).css(Wui.cssCheck('flex'),itm.fit + ' auto');
            }else if(itm.cssByParam === undefined){
                $(itm.el).css(dim,itm[dim]);
                $(itm.el).css(Wui.cssCheck('flex'),'');
            }

            if(itm.cssByParam)  itm.cssByParam();
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
    prefix = (prefix && prefix.length !== 0) ? prefix + '-' : 'wui-'
    return prefix + Wui.idCounter++;
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
        parentSize = (useWindow) ? ((dim == 'height') ? verge.viewportH() : verge.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
};


Wui.positionItem = function(parent,child){
    var ofst    = parent.offset(),
        cHeight = child.outerHeight(),
        cWidth  = child.outerWidth(),
        plBelow = (ofst.top + parent.outerHeight() + cHeight < verge.viewportH()),
        plRight = (ofst.left + parent.outerWidth() - cWidth > 0); 

    child.css({
        left:       (plRight) ? ofst.left + parent.outerWidth() - cWidth : ofst.left,
        top:        (plBelow) ? ofst.top + parent.outerHeight() : ofst.top - cHeight,
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
                    var target  = (obj.appendTo !== undefined) ? obj.appendTo :
                                    (obj.prependTo !== undefined) ? obj.prependTo :
                                        (tgt !== undefined && tgt !== null) ? tgt : 
                                            (obj.parent !== undefined && obj.parent.elAlias !== undefined) ? obj.parent.elAlias :
                                                (obj.parent !== undefined && obj.parent.el !== undefined) ? obj.parent.el : $('body'),
                        action = (obj.appendTo !== undefined) ? 'append' : 
                                    (obj.prependTo !== undefined) ? 'prepend' : 
                                        (act !== undefined && target[act]) ? act : 'append';
                    
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

                    if(typeof obj.parent === 'undefined')
                        obj.layout();
                    
                    return obj;
                },
    afterRender:function(){ this.aftrRenderd = true; },
    append:     function(obj){
                    var me = this, el = me.elAlias || me.el;
                    $.each(arguments,function(i,itm){
                        el.append(itm);
                    });
                },
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

    clear:      function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },

    cssByParam: function(){
                    var me = this, el = me.el, a;

                    me.argsByParam();

                    // Add attributes if defined
                    try{ if(me.attr && typeof me.attr == 'object')  el.attr(me.attr); }catch(e){ }
                        
                    // calculate dimensions
                    if($.isNumeric(me.height) && me.height >= 0)    el.css({height: me.height});
                    if($.isNumeric(me.width) && me.width >= 0)      el.css({width: me.width});

                    // calculate percentage based dimensions
                    if(Wui.isPercent(me.width)){
                        a = Wui.percentToPixels(el,me.width,'width');
                        if(a != 0) el.css({width:a});
                    }
                    if(Wui.isPercent(me.height)){
                        a = Wui.percentToPixels(el,me.height,'height');
                        if(a != 0) el.css({height:a});
                    }
                    
                    // hide an object based on its hidden value
                    if(me.hidden) el.css('display','none');

                    return el.addClass(me.cls);
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
                    me.each(function(itm){ if(itm.fit){ needFit = true; return false; }});
                    
                    if((me.fitDimension || needFit) && me.items.length)
                        Wui.fit(me.items, (me.fitDimension || undefined));

                    if(!me.rendered)       me.onRender();

                    // Perform layout on children
                    me.each(function(itm){ if(typeof itm.layout == 'function') itm.layout(); });

                    if(!me.aftrRenderd)    me.afterRender();
                    
                    // Performs actions passed in as parameters
                    if(typeof afterLayout === 'function')
                        afterLayout();
                },

    onRender:   function(){ this.rendered = true; },

    place:      function(after){
                    var me = this;
                    
                    // Adds the objects items if any
                    if(me.items === undefined) me.items = [];

                    me.each(function(itm){ 
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
                    .addClass('wui-button')
                    .click(btnClick)
                    .keydown(function(evnt){ if(evnt.keyCode == 13) return false; })
                    .keyup(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                        return false;
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    if(me.disabled)    me.disable();
                    
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
        height:     '100%',
        lbar:       [],
        maskHTML:   'Empty',
        maxHeight:  null,
        rbar:       [],
        tbar:       [],
        title:      null,
        titleAlign: 'left'
    },args);

    this.init();
};
Wui.Pane.prototype = $.extend(new Wui.O(), {
    addMask:        function(target){
                        target = (target) ? target : this.container;

                        if(target.children('w13-mask').length === 0)
                            return this.mask = $('<div>')
                                                .addClass('w13-mask')
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
                        me.footer.each(function(itm){ if(itm.disable) itm.disable(); });
                        me.header.each(function(itm){ if(itm.disable) itm.disable(); });
                        me.leftbar.each(function(itm){ if(itm.disable) itm.disable(); });
                        me.rightbar.each(function(itm){ if(itm.disable) itm.disable(); });

                        return me.disabled = true;
                    },   
    enable:         function(){
                        var me = this;

                        me.removeMask();
                        me.footer.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.header.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.leftbar.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.rightbar.each(function(itm){ if(itm.enable) itm.enable(); });

                        return me.disabled = false;
                    },
    init:           function(){
                        var me = this;
                            el = me.el = $('<div>').addClass('w13-pane');

                        Wui.O.prototype.init.apply(me,arguments);

                        if(!me.border)      
                            el.addClass('no-border');

                        if(me.title !=null)
                            me.setTitle(me.title);

                        el.append( me.elAlias = me.container = $('<div>').addClass('w13-pane-content') );

                        me.header = makeBar('tbar',{items: me.tbar});
                        me.footer = makeBar('bbar',{items: me.bbar});
                        me.leftbar = makeBar('lbar',{items: me.lbar});
                        me.rightbar = makeBar('rbar',{items: me.rbar});

                        configBar('tbar');
                        configBar('bbar');
                        configBar('lbar');
                        configBar('rbar');

                        // If the pane is disabled then it disables it
                        if(me.disabled) me.disable();

                        function makeBar(bar,args){
                            var barType = (bar == 'tbar' || bar == 'bbar') ? 'wui-h-bar' : 'wui-v-bar';

                            return new Wui.O($.extend({
                                el:         $('<div>'),
                                cls:        'wui-' + bar + ' ' + barType,
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
                                    bbar: 'footer',
                                    lbar: 'leftbar',
                                    rbar: 'rightbar'
                                },
                                thisBar = me[bars[bar]],
                                hasBar = me.el.hasClass(bar);

                            if(!hasBar && thisBar.items.length){
                                me.el.addClass(bar);
                                thisBar.place();
                            }else if (hasBar && thisBar.items.length === 0){
                                me.el.removeClass(bar);
                                thisBar.el.remove();
                            }

                            if(thisBar.el.hasClass('wui-v-bar')){
                                thisBar.each(function(itm){
                                    if(itm instanceof Wui.Button)
                                        itm.el.attr('title',itm.text).html('').css;
                                });
                            }
                        }
                    },
    removeMask:     function(){
                        var me = this, mask = me.mask || me.el.find('.w13-mask');
                        
                        if(mask){
                            mask.remove();
                            me.mask = undefined;
                        }
                    },
    setTitle:       function(t){ 
                        var me = this,
                            hasEl = (typeof me.titleEl !== 'undefined');

                        me.title = t = (t && typeof t == 'string') ? t : null;

                        if(t !== null){
                            if(!hasEl)
                                me.el.append( me.titleEl = $('<div class="wui-title">') );

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
        lbar:       [],
        maskHTML:   'Loading <span class="wui-spinner"></span>',
        onWinClose: function(){},
        onWinOpen:  function(){},
        rbar:       [],
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
                        me.modalEl = $('<div>').addClass('w13-overlay');
                        $('body').append(me.appendTo = me.modalEl.css('z-index',Wui.maxZ()));
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
                    .addClass('w13-window')
                    .css('z-index',Wui.maxZ())
                    .click(bringToFront);
                    
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

                    // Place an observer that will possibly resize a window that contains changeable content
                    // me.observer = new MutationSummary({
                    //     callback:   function(){ setTimeout(function(){ me.resize(); }, 300); },
                    //     queries:    [{ characterData: true }],
                    //     rootNode:   me.el[0]
                    // });
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    me.onWinOpen(me);
                    me.windowEl.trigger($.Event('open'),[me]);

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
                        useHeight = (arguments.length) ? resizeHeight : (totalHeight + headersHeight >= verge.viewportH()) ? (verge.viewportH() - 10) : 
                                        (containerHeight <= totalHeight && !me.hasOwnProperty('height')) ? totalHeight + headersHeight : 
                                            Wui.isPercent(me.height) ? Wui.percentToPixels(me.windowEl, me.height, 'height') : me.height;

                    // Size and center the window according to arguments passed and sizing relative to the viewport.
                    if(me.windowEl){
                        me.windowEl.css({ height: useHeight, width: (arguments.length) ? resizeWidth : undefined, });
                        var posLeft =   (me.windowLeft) 
                                            ? ($.isNumeric(me.windowLeft) ? me.windowLeft : Wui.percentToPixels($('html'), me.windowLeft, 'width')) 
                                            : Math.floor((verge.viewportW() / 2) - (me.windowEl.width() / 2)),
                            posTop =    (me.windowTop) 
                                            ? ($.isNumeric(me.windowTop) ? me.windowTop : Wui.percentToPixels($('html'), me.windowTop, 'height')) 
                                            : Math.floor((verge.viewportH() / 2) - (useHeight / 2));
                        me.windowEl.css({ top:posTop, left:posLeft });

                        me.fireResize();
                        return {width:me.windowEl.outerWidth(), height:me.windowEl.outerHeight()};
                    }
                    
                    return false;
                },
    height:     300,   
    width:      400
});



Wui.Data = function(args){
    $.extend(this,{
        ajaxConfig:     {},
        data:           [],
        identity:       null,
        name:           null,
        params:         {},
        total:          0,
        url:            null,
        waiting:        false
    },args);
};
Wui.Data.prototype = {
    dataContainer:  null,
    totalContainer: null,
    
    dataChanged:    function(){},
    
    dataEach:       function(f){
                        for(var i = 0; i < this.data.length; i++)
                            if(f(this.data[i],i) === false)
                                break;
                        return true;
                    },
    loadData:       function(){
                        var me = this,
                            config = $.extend({
                                data:       me.params,
                                dataType:   'json',
                                success:    function(r){ me.success.call(me,r); },
                                error:      function(e){ me.failure.call(me,e); },
                            },me.ajaxConfig);
                        
                        if(!me.waiting){
                            var paramsOkay = me.setParams.apply(me,arguments),
                                beforeLoad = me.beforeLoad.apply(me,arguments);

                            if(paramsOkay !== false && beforeLoad !== false){
                                me.waiting = true;
                                return $.ajax(me.url,config);
                            }
                        }else{
                            me.furtherRequests = arguments;
                        }
                    },
    setParams:      function(params){
                        if(params && typeof params === 'object')
                            $.extend(this.params,params);
                    },   
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
                        $(document).trigger($.Event('datachanged'),[dn, me]);
                        me.afterSet(me.data);
                    }, 
    beforeLoad:     function(){},
    afterSet:       function(){},
    beforeSet:      function(){},
    success:        function(r){
                        var me = this;
                        me.waiting = false;

                        if(me.furtherRequests){
                            me.loadData.apply(me,me.furtherRequests);
                            me.furtherRequests = undefined;
                        }else{
                            var unwrapped = Wui.unwrapData.call(me,r);
                            me.onSuccess(r);
                            me.setData(unwrapped.data, unwrapped.total);
                        }
                    },
    onSuccess:      function(){},
    onFailure:      function(){},
    failure:        function(e){
                        this.waiting = false;
                        this.onFailure(e);
                    },
    processData:    function(response){ return response; },
    push:           function(){
                        var retVal = Array.prototype.push.apply(this.data,arguments);
                        this.total = this.data.length;
                        this.fireDataChanged();
                        return retVal;
                    },
    splice:         function(){
                        var retVal = Array.prototype.splice.apply(this.data,arguments);
                        this.total = this.data.length;
                        this.fireDataChanged();
                        return retVal;
                    }
};


Wui.Template = function(args){ $.extend(this,args); };
Wui.Template.prototype = {
    template:   null,
    data:       null,
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

                    el.find('.wui-selected').removeClass('wui-selected');
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
    init:       function(){
                    var me = this;

                    if(!(me.name !== null && me.name.length !== 0))
                        me.name = Wui.id('wui-data-list');

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
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                        
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
    itemDeselect:function(itm){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

                    itm.el.removeClass('wui-selected');
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
                            me.elAlias.append(me.createItem(itm));

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

                    Wui.O.prototype.onRender.call(this);

                    // Loads data per the method appropriate for the object
                    if(me.autoLoad){
                        if(this.url === null)   me.make();
                        else                    me.loadData();
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

                    me.each(function(itm){ if(itm.el[0] == el[0]) retVal = itm; });
                    
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


Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
    var err = Wui.msg(errMsg,msgTitle,callback);

    if($.isArray(buttons))
        err.footer.push.apply(err.footer,buttons);
    err.container.find('.wui-msg').addClass('wui-err');
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
        if(btn.text == 'No')    cw.doAnswer(false);
        else                    w.doAnswer(true);
        evnt.stopPropagation();
    });

    cw.header.splice(0,1);

    cw.resize();

    return cw;
};


}(jQuery,this,window[_wuiVar]));