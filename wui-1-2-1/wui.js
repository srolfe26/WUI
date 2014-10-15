/*! Wui 1.2.1
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2.1/license.html
 */


// Make sure the WUI is defined
var Wui = Wui || {
    version: '1.2.1'
};


/** Determines whether a value is a percent string.
    @return     True if there is a string passed in containing a '%', else false.
*/
Wui.isPercent = function(){
    return (arguments[0] && arguments[0].indexOf && arguments[0].indexOf('%') != -1);
};


/** Gets the maximum CSS z-index on the page and returns one higher, or one if no z-indexes are defined.
    @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
    @return     A number representing the maximum z-index on the page plus one. 
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


/** Converts a percentage to a number of pixels given the containing element's dimensions.
    @param {object} el          jQuery Object the percents are being calculated for. 
    @param {string} percent     Percent to be calculated into pixels
    @param {string} dim         Dimension [height,width] for comparing to parent objects
    @return Number in pixels of the percentage passed in.
*/
Wui.percentToPixels = function(el,percent,dim){
    var parent = el.parent(),
        useWindow = (parent[0] === $(window)[0] || parent[0] === $('html')[0] || parent[0] === $('body')[0]),
        parentSize = (useWindow) ? ((dim == 'height') ? verge.viewportH() : verge.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
};


// Base WUI Object
Wui.O = function(args){ $.extend(this, {
    hidden: false
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
                    
                    return obj;
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

    cssByParam: function(){
                    var me = this, el = me.el;

                    me.argsByParam();

                    // Add attributes if defined
                    try{ if(me.attr && typeof me.attr == 'object')  el.attr(me.attr); }catch(e){ }
                        
                    // calculate dimensions
                    if($.isNumeric(me.height) && me.height >= 0)    el.css({height: me.height});
                    if($.isNumeric(me.width) && me.width >= 0)      el.css({width: me.width});

                    // calculate percentage based dimensions
                    if(Wui.isPercent(me.width))  el.css({width:Wui.percentToPixels(el,me.width,'width')});
                    if(Wui.isPercent(me.height)) el.css({height:Wui.percentToPixels(el,me.height,'height')});
                    
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

    hide:       function(){ 
                    var args = ['fadeOut'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = true;
                    return this.showHide.apply(this,args);
                },

    index:       function(){ 
                    var me = this, myPosition = undefined;
                    if(me.parent){
                        // Get my position within the parental array
                        me.parent.each(function(itm,idx){ if(itm === me) myPosition = idx; });
                    }
                    return myPosition;
                },

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


/**
 @event     wuibtnclick     Fires when the button is pressed and not disabled. Avoided using the standard 'click' event for this reason ( Button Object )
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

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
    /** Method that will run immediately when the object is constructed. Adds the click listener with functionality to disable the button.*/
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


// WUI Pane
Wui.Pane = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:     true,
        
        /** An array of items that will be added to the header */
        tbar:       [],

        /** An array of items that will be added to the leftbar */
        lbar:       [],

        /** An array of items that will be added to the rightbar */
        rbar:       [],
        
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
Wui.Pane.prototype = $.extend(new Wui.O(), {
    addMask:        function(){
                        if(this.container.children('wui-mask').length === 0)
                            return this.mask = $('<div>')
                                                .addClass('wui-mask')
                                                .append(
                                                    $('<span>').html(this.maskHTML)
                                                )
                                                .appendTo(this.container);
                        else
                            return null;
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
                            el = me.el = $('<div>').addClass('wui-pane');


                        if(!me.border)      
                            el.addClass('no-border');

                        if(me.title !=null)
                            me.setTitle(me.title);

                        el.append( me.elAlias = me.container = $('<div>').addClass('wui-pane-content') );

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
                            }else{
                                me.el.removeClass(bar);
                                thisBar.el.remove();
                            }
                        }
                    },

    removeMask:     function(){
                        var me = this, mask = me.mask || me.el.find('.wui-mask');
                        
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
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:     true,
        
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

        /** An array of items that will be added to the leftbar */
        lbar:       [],

        /** An array of items that will be added to the rightbar */
        rbar:       [],
        
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
    init:       function(){
                    var me = this;
                    me.appendTo = $('body');
                    
                    // Make it a modal window & add everything to the DOM
                    if(me.isModal){
                        me.modalEl = $('<div>').addClass('wui-overlay');
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
                    .addClass('wui-window')
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
                            // minWidth:   me.minWidth || me.width,
                            // minHeight:  me.minHeight || me.height,
                            // resize:     function(){ me.fireResize(); }
                        });

                    // Put the window on the body
                    me.place();
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    me.onWinOpen(me);
                    me.windowEl.trigger($.Event('open'),[me]);
                    me.resize();

                    function bringToFront(e){
                        var maxZ = Wui.maxZ();
                        if(parseInt((me.el.css('z-index')) || 1) <= maxZ){
                            me.el.css('z-index', maxZ);
                        }
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
                        useHeight = (arguments.length) ? resizeHeight : (totalHeight + headersHeight >= verge.viewportH()) ? (verge.viewportH() - 10) : 
                                        (containerHeight <= totalHeight && !me.hasOwnProperty('height')) ? totalHeight + headersHeight : 
                                            Wui.isPercent(me.height) ? Wui.percentToPixels(me.windowEl, me.height, 'height') : me.height;

                    // Size and center the window according to arguments passed and sizing relative to the viewport.
                    me.windowEl.css({ height: useHeight, width: (arguments.length) ? resizeWidth : undefined, });
                    var posLeft =   (me.windowLeft) 
                                        ? ($.isNumeric(me.windowLeft) ? me.windowLeft : Wui.percentToPixels($('html'), me.windowLeft, 'width')) 
                                        : Math.floor((verge.viewportW() / 2) - (me.windowEl.width() / 2)),
                        posTop =    (me.windowTop) 
                                        ? ($.isNumeric(me.windowTop) ? me.windowTop : Wui.percentToPixels($('html'), me.windowTop, 'height')) 
                                        : Math.floor((verge.viewportH() / 2) - (useHeight / 2));
                    me.windowEl.css({ top:posTop, left:posLeft });
                    
                    // me.fireResize();
                    return {width:me.windowEl.outerWidth(), height:me.windowEl.outerHeight()};
                },
});










