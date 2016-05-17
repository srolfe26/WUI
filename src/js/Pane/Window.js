(function($,Wui) {

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

})(jQuery,window[_wuiVar]);
