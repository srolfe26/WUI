/*! Wui 1.2.1
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2.1/license.html
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

                        
                        me.el.addClass('wui-tabs');
                        
                        //adds the object's items if any
                        if(me.items === undefined) me.items = [];
                        me.each(function(itm,idx){
                            itm.el.addClass('wui-tab-panel');
                            itm.tabCls =    'wui-tab ' +
                                            ((itm.tabCls) ? ' ' + itm.tabCls : '') +
                                            ((me.tabsLeft) ? ' left' : '');
                            
                            if(itm.tabsHideHeader)
                                itm.el.addClass('wui-hide-heading');
                            
                            // Add buttons as tabs
                            me[bar].push(
                                itm.tab = new Wui.Button({
                                    text:   itm.title || 'Tab ' + (parseInt(idx) + 1),
                                    cls:    itm.tabCls,
                                    pane:   itm
                                })
                            );
                            // Adjust existing buttons
                            if(!me.tabsLeft && me.items.length > 0 && me.items[0] instanceof Wui.Button){

                            }
                        });

                        // Add listeners for tab changes
                        me[bar].el.on('wuibtnclick','.wui-tab',function(evnt,btn){
                            me.giveFocus(btn.pane);
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
                                setTimeout(function(){ itm.layout(); },0);
                                if(!supressEvent) 
                                    me.el.trigger($.Event('tabchange'),[me, itm.tab, itm]);
                            }
                        });
                    },
    selectTabByText:function(txt, supressEvent){
                        var me = this, retVal = undefined;
                        $.each(me.items,function(idx,itm){
                            if($.trim(itm.tab.el.text()).toLowerCase() === $.trim(txt).toLowerCase().replace(/_/g,' ')){
                                me.giveFocus(itm, supressEvent);
                                retVal = itm;
                            }
                        });
                        return retVal;
                    },
    onRender:       function(){
                        this.giveFocus(this.items[0]);
                    }
});


})(jQuery,window[_wuiVar]);