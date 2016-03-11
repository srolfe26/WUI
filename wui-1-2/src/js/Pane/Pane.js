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