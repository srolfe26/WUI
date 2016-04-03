/**
 WUI Data List extends both Wui.Data and Wui.Template and allows for additional events such as selecting
 and deselecting items. When data is loaded, the template engine will automatically re-render the data set.
 A data list is the basis for Wui.Grid, but can provide powerful tools for creating advanced 
 interface elements. Creating advanced elements can be done using the modifyItem method which allows
 the programmer to add various additional functionality to each template created.  Depending on the level
 of interactivity, CreateItem (the method that adds the listeners to select/deselect the item) must also
 be modified so that interactions with an item don't inadvertently select/deselect the item itself.
 Items in a datalist can be selected programmatically using the selectBy method. Items will be reselected
 after a refresh if the 'identity' config is set to the name of the dataItem that is the identity field.
 
@event        wuiselect         A data template is selected ( DataList, el, record )
@event        wuichange         The selected item info along with the previous selected record if it exists ( DataList, el, record, selection array )
@event        wuideselect       A selected item is clicked again, and thus deselected ( DataList, el, record )
@event        wuidblclick       When an item is double clicked ( DataList, el, record )
 
 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
 @creation   2013-10-25
 @version    1.1.2
*/
Wui.DataList = function(args){
    $.extend(this, {
        /** @eventhook Called after the data's DOM elements are made */
        afterMake:      function(){},
        
        /** Determines whether templates are made immediately when the DataList is rendered */
        autoLoad:       true,
        
        /** Maximum number of data elements to display, even if data set is larger. */
        displayMax:     -1,

        /** DOM element where all of the data templates will be appended. */
        el:             $('<div>'),

        focusOnSelect:  true,
        
        /** Method that will run immediately when the object is constructed. */
        init:           function(){},
        
        /** Whether multiple rows/records can be selected at once. */
        multiSelect:    false,
        
        /** An array of the currently selected records */
        selected:       []
    }, args);
    this.init();
};
Wui.DataList.prototype = $.extend(new Wui.O(), new Wui.Template(), new Wui.Data(), {
    /** Overrides the Wui.Data method that serves as an event hook. Calls the DataList's make() method. */
    dataChanged:function(){ this.make(); },
    
    /** Clears the selection on the data list */
    clearSelect:function(){
                    var me = this,
                        dn = (me.name) ? '.' + me.name : '',
                        el = me.elAlias || me.el;

                    el.find('.wui-selected').removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuichange' + dn), [me, me.el, {}, me.selected])
                        .trigger($.Event('wuichange'), [me, me.el, {}, me.selected]);
                },
    
    /**
    @param    {object}    itm            Object containing an el (jQuery object), and a rec (data object)
    @param    {boolean}    silent        A true value prevents the 'wuiselect' event from firing
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is selected @private
    */
    itemSelect: function(itm, silent){
                    var me = this, 
                        dn = (me.name) ? '.' + me.name : '',
                        old = [];
                    
                    if(me.selected.length > 0 && !me.multiSelect && !silent){
                        old = $.extend(true,[],me.selected);
                        me.el.trigger($.Event('wuideselect'),[me, old[0].el, old[0].rec, old]);
                    }

                    me.el.find('.wui-selected').removeClass('wui-selected').removeAttr('tabindex');
                    itm.el.addClass('wui-selected').attr('tabindex',1);
                    
                    if(me.focusOnSelect)
                        itm.el.focus();
                    
                    me.selected = [itm];

                    if(!silent){
                        me.el.trigger($.Event('wuiselect'+ dn), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },

    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is deselected @private
    */        
    itemDeselect:function(itm){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

                    if(me.selected.length > 0)

                    itm.el.removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuideselect' + dn),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange' + dn), [me, itm.el, itm.rec, me.selected])
                        .trigger($.Event('wuideselect'),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    return itm;
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in with listeners added
    Adds the click listeners to the item and calls modifyItem to add greater flexibility
    */
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
                        var txtSelection, alreadySelected;

                        // Determine the # of selected items before the change
                        if(me.multiSelect && (e.metaKey || e.ctrlKey || e.shiftKey)){
                            alreadySelected = $(row).hasClass('wui-selected');
                            
                            if(!e.shiftKey){
                                // WHEN THE CTRL KEY IS HELD SELECT/DESELECT INDIVIDUAL ITEMS
                                $(row).toggleClass('wui-selected',!alreadySelected);

                                if(alreadySelected) $.each(me.selected || [], function(idx,sel){ if(sel == itm) me.selected.splice(idx,1); });
                                else                me.selected.push(itm);

                                me.el.trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                                .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
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
                        }
                        else{
                            if(me.selected.length > 0 && me.selected[0] === itm)    me.itemDeselect(itm);   //deselect item
                            else                                                    me.itemSelect(itm);     //change selection
                        }
                    }

                    function doubleClick() {
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
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The DOM element
    Performs any desired modification on an object - this method is meant to be overridden.
    */
    modifyItem: function(itm){ return itm.el; },
    
    /** Creates the templates based on current data. Then appends them to the el with listeners */
    make:       function(){
                    var me = this,
                        holdingData = me.data || [],
                        holder = $('<div>'), 
                        dn = (me.name) ? '.' + me.name : '';
                    
                    // Clear out items list
                    me.items = [];

                    // Add items to me.items
                    for(var i = 0; (me.displayMax < 0 && i < holdingData.length) || (me.displayMax > 0 && i < me.displayMax && i < holdingData.length); i++){
                        var rec = me.data = holdingData[i],
                            itm = {el:Wui.Template.prototype.make.call(me, i), rec:rec};
                            
                        Array.prototype.push.call(me.items,itm);
                        holder.append(me.createItem(itm));
                    }
                    
                    // Clear out existing items and add new to the DOM
                    me.clear();
                    me.append(holder.children().unwrap());
                    me.data = holdingData;
                    
                    // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                    // object has been manually run
                    me.autoLoad = true;
                    
                    // Event hook and event
                    me.afterMake();
                    me.el.trigger($.Event('refresh'+ dn),[me,me.data])
                        .trigger($.Event('refresh'),[me,me.data]);
                    
                    // Reset selected items if any
                    me.resetSelect();
                },
                
    /** Runs when the object has been appended to its target. Then appends the data templates with listeners. */
    onRender:   function(){
                    var me = this;

                    if(me.onRendered !== true){
                        // Loads data per the method appropriate for the object
                        if(me.autoLoad){
                            if(this.url === null)   me.make();
                            else                    me.loadData();
                        }

                        // Adds a document listener
                        $(document).on('keyup',function(evnt){
                            if(me.selected && me.selected[0] && (document.activeElement == me.selected[0].el[0])){
                                // Simulate a double click if enter or spacebar are pressed on a currently selected/focused item
                                if(evnt.keyCode == 13 || evnt.keyCode == 32){ me.selected[0].el.click(); me.selected[0].el.click(); }
                                if(evnt.keyCode == 38)  me.selectAjacent(-1);  // 38 = up
                                if(evnt.keyCode == 40)  me.selectAjacent(1);   // 40 = down
                            }
                        });

                        me.onRendered = true;
                    }
                },


    /**
    @param    {jQuery Object} el An object that will match an element in the DataList.
    @return   The item in the datalist corresponding to that DOM element.
    Returns the matching DataList item.
    */
    getItemByEl:function(el){
                    var me = this, 
                        retVal;

                    me.each(function(itm){ if(itm.el[0] == el[0]) retVal = itm; });
                    
                    return retVal;
                },
                
    /** Refreshes the DataList to match the data or reload it from the server */
    refresh:    function(){ this.onRender(); },

    /** 
    @param    {Array} arry  An array containing objects with a 'rec' member.
    @return   A new array with just the 'rec' objects which have been copied one level deep
    Performs a copy on an array of dataList items and gets only the records */
    copyArryRecs:function(arry){
                    var newArry = [];

                    arry.forEach(function(itm){
                        var newRec = {};

                        $.each(itm.rec,function(key,val){ newRec[key] = val; });

                        newArry.push(newRec);
                    });

                    return newArry;
                },
    
    /**  Reselects previously selected rows after a data change or sort. Scrolls to the first currently selected row. */
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
                    
    /** Scrolls the list to the currently selected item. */            
    scrollToCurrent:function(){
                        var me = this,
                            el = me.elAlias || me.el,
                            firstSelect = el.find('.wui-selected:first'),
                            ofstP = firstSelect.offsetParent(),
                            offset = (function(){ 
                                var r = 0;

                                firstSelect.prevAll().each(function(){ r += $(this).outerHeight(); });
                                r -= ((me.elAlias || me.el).height()) / 2 - (firstSelect.outerHeight() / 2);

                                return  r; 
                            })();
                        ofstP.animate( { scrollTop:offset }, 100 );
                    },
    /**
    @param    {number} num Direction to go to select an ajacent value [1,-1]
    Selects the list item immediately before or after the currently selected item. */
    selectAjacent:  function(num){
                        var me = this, selectAjc = me.selected[0].el[(num > 0) ? 'next' : 'prev']();
                        return me.selectByEl( selectAjc, false );
                    },

    /**
    @param    {string} key The data item to look for
    @param    {string|number} val The value to look for
    @return An object containing the dataList, row, and record, or undefined if there was no matching row.
    Selects an item according to the key value pair to be found in a record. */
    selectBy:   function(key,val){
                    var me = this, 
                        retVal;
                        
                    me.each(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val) {
                            retVal = me.itemSelect(itm);
                            
                            return retVal;
                        }
                    });
                    me.scrollToCurrent();
                    return retVal;
                },
                    
    /**
    @param    {jQuery Object}   el          An object that will match an element in the DataList.
    @param    {boolean}         doScroll    Will prevent scrolling to the item if set to 'false'.
    Selects the matching DataList item.*/
    selectByEl: function(el, doScroll){
                    var me = this,
                        retVal;

                    me.itemSelect(retVal = me.getItemByEl(el));
                    
                    if(doScroll !== false)
                        me.scrollToCurrent();
                    
                    return retVal;
                }
});