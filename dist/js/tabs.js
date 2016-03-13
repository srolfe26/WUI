/*! Wui 1.2.1
 * Copyright (c) 2015 Stephen Rolfe Nielsen (rolfe.nielsen@gmail.com)
 *
 * @license MIT
 * http://www.wui-js.com/wui-1-2-1/license.html
 */ 



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


})(jQuery, window[_wuiVar]);

