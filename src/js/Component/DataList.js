(function($,Wui) {

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

                    // if Paging is turned on use paging object to get start and end index.
                    if (typeof me.pager != 'undefined' && me.pager.pageSize != -1 &&
                        (me.pager.type === 'local'  || me.pager.type === 'remote' ) ) {
                        me.startIdx = me.pager.getStartIdx();
                        me.endIdx = me.pager.getEndIdx();
                    } else {
                        me.startIdx = 0;
                        me.endIdx = maxI;
                    }
                    
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
                    for(i=me.startIdx; i < me.endIdx; i++) makeItems(i); 

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

})(jQuery,window[_wuiVar]);
