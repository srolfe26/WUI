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