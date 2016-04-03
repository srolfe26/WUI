/** 
@event        tabchange When a tab changes (tab pane, tab button, tab item)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
Tab pane
*/
Wui.Tabs = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:           [],
        
        /** An array of items that will be added to the content */
        items:          [],
        
        /** Tabs default to the right side of the pane unless this is true. */
        tabsLeft:       false,
        
        /** A place holder for the currently selected tab. */
        currentTab:     null,
        
        /** Whether to put the tabs on the header or the footer. */
        tabsBottom:     false,
        
        /** Config to place on child items of WUI tabs to make their heading not show up */
        tabsHideHeader: null,
        
        /** An array of items that will be added to the header */
        tbar:    []
    },args); 
    this.init();
};
Wui.Tabs.prototype = $.extend(new Wui.Pane(),{    
    /** Overrides Wui.place(). Creates a Wui.Button as a tab for each item. */
    place:          function(){
                        var me = this;
                        
                        me.el.addClass('wui-tabs');
                        
                        //adds the objects items if any
                        if(me.items === undefined) me.items = [];
                        $.each(me.items,function(idx,itm){
                            itm.tabCls =    'wui-tab ' +
                                            ((itm.tabCls) ? ' ' + itm.tabCls : '') +
                                            ((me.tabsLeft) ? ' left' : '');
                            
                            if(itm.tabsHideHeader){
                                //itm.el.css({borderTopWidth:itm.el.css('border-left-width')});
                                itm.el.addClass('wui-hide-heading');
                            }
                            
                            me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.Button({
                                text:   itm.title || 'Tab ' + (parseInt(idx) + 1),
                                click:  function(){ me.giveFocus(itm); },
                                cls:    itm.tabCls
                            }));
                            //if(me.bbar.length !== 0) me.placeFooter();
                        });
                        
                        return Wui.O.prototype.place.call(me, function(m){ $.each(m.items,function(i,itm){ itm.el.addClass('wui-tab-panel'); }); }); //.wrap($('<div>')
                    },
    
    /** 
    @param {object} itm A WUI Object that will be matched in the items array. 
    @param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
    
    Sets the specified tab to active. Runs layout on the newly activated item.
    */
    giveFocus:      function(tab, supressEvent){
                        var me = this, dn = (me.name) ? '.' + me.name : '';
      
                        supressEvent = (supressEvent !== undefined) ? supressEvent : false;
                        
                        $.each(me.items,function(idx,itm){
                            var isActive = itm === tab;
                            itm.tab.el.toggleClass('selected', isActive);
                            itm.el.toggleClass('active', isActive);
                            if(isActive){
                                me.currentTab = itm;
                                if(!supressEvent) 
                                    me.el.trigger($.Event('tabchange'),[me, itm.tab, itm])
                                        .trigger($.Event('tabchange' + dn),[me, itm.tab, itm]);
                                itm.layout();
                            }
                        });
                    },
    
    /** 
    @param {string} txt The text of the tab button
    @param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
    @return The tab that was selected or undefined if the text didn't match any tabs
    
    Gives focus to the tab with text that matches the value of txt. Strings with underscores
    are converted to spaces (eg. 'conferences_detail' = 'conferences detail')
    */
    selectTabByText:function(txt, supressEvent) {
                        var me = this,
                            retVal;
                            
                        $.each(me.items,function(idx,itm) {
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