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
        selected:       [],
        sort:           [],  // An array containing objects in the following 
                             //   format, that define the initial sort of the 
                             //   data: {dataItem:'name', order:'asc/desc'} 
        // sorters:     []   // @private Used internally to keep track of sorting, 
                             //   items added to sort will be used in the sorters array 
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

                    // columns and sorting on multiple columns
                    me.cols = [];
                    me.sorters = [];
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
                    
                    // Set autoLoad to true because it should only block on the 
                    //  first run, and if this functions is happened then the
                    //  object has been manually run
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
    /** 
    setData override that sets initial sort array and calls sortList().
    @param    {object}    col    An object containing the sort direction and DOM element of the heading
    @param    {string}    dir    The direction of the sort 
    */
    setData: function(data){
        var me = this, i = null, j = null;

        Wui.Data.prototype.setData.apply(me,arguments);

        // If the config sorters is defined, add them to the array
        if(me.sort.length && !me.sorters.length)
            for(i = 0; i < me.sort.length; i++)
                for(j = 0; j < me.cols.length; j++)
                    if(me.cols[j].dataItem == me.sort[i].dataItem)
                        me.mngSorters(me.cols[j],me.sort[i].order);

        me.sortList();
    },

    /**
    @param    {object}  col     Column object associated with a particular column element
    */
    sortList: function(col) {
        var me = this;
        // If we have paging and it is 'remote' do NOT sort local - the backend 
        //  should take care of it.  Also, If no pager is defined we do allow local sorting.
        if (typeof me.pager == 'undefined' || me.pager.type !== 'remote') {
            me.mngSorters(col);
            me.runSort();    
        } 

    },

    /** 
    Sorts the full data array and if paging is defined goes to first page.
    */
    runSort: function(){
        var me = this;
        var sortArray = me.marshallSorters(me.sorters);

        // Sort the full data array
        me.data.sort(function(a, b){ return Wui.doSort(sortArray, 0, a, b); });

        if (typeof me.pager != 'undefined' && me.pager.pageSize != -1 &&
            (me.pager.type === 'local'  || me.pager.type === 'remote' ) ) {
            // Here are the options:
                //      1. Go to page 1 after a sort
                //      2. Stay on the same page  -- (Not Implemented Yet)
                //      3. Whatever row has focus keep it focused but sort 
                //          everything around it. -- (Not Implemented Yet)
            me.pager.goToPage(0);
        } 
    },

    /** 
    Manages the sorters for the grid by keeping them in an array.
    @param    {object}    col    An object containing the sort direction and DOM element of the heading
    @param    {string}    dir    The direction of the sort 
    */
    mngSorters: function(col,dir){
        var me = this,
            sortClasses = ['one','two','three','four','five'];
        if(col !== undefined){
            if(dir !== undefined){
                var addItem = true;
                for(i = me.sorters.length; i > 0; i--)
                    if(me.sorters[i-1].dataItem == col.dataItem)
                        addItem = false;

                col.sortDir = dir;
                if(addItem)
                    me.sorters.push(col);
            }else{
                if(col.sortDir){
                    if(col.sortDir == 'desc'){
                        delete col.sortDir;
                        col.el.removeClass().addClass('w121-gc').addClass(col.cls);
                        
                        for(var i = me.sorters.length; i > 0; i--)
                            if(me.sorters[i - 1].el == col.el)
                                me.sorters.splice(i - 1,1);
                    }else{
                        col.sortDir = 'desc';
                    }
                }else{
                    // Can't sort on more than 5 columns
                    if(me.sorters.length > 5){
                        col.el.removeClass().addClass('w121-gc').addClass(col.cls);
                        return false;
                    }
                    
                    col.sortDir = 'asc';
                    me.sorters.push(col);
                }
            }    
        }

        $.each(me.sorters,function(i,itm){
            itm.el.removeClass().addClass('w121-gc ' + sortClasses[i] + ' ' + itm.sortDir).addClass(itm.cls);
        });
    },

    /** 
        Create a new sort array into the form needed by remote paging and doSort().  
        Note:  remote paging needs an object that it can JSONstringify and 
               send to the server.

    @param      {object}    sorters     The sorters array that contains dataItem, 
                                        sortDir, dataType + many other things. 
    @return     {object}    returns a simplified array of sort objects
                            that can be JSONstringified.
    */
    marshallSorters: function(sorters) {
        var me = this;
        var sort = [];

        for(var i=0; i<sorters.length; i++) {
            sort.push({
                dataItem: sorters[i].dataItem,
                order: sorters[i].sortDir,
                dataType: sorters[i].dataType
            });
        }
        return sort;
    },

    /** 
        This function prepares the data[] for a cvs file export.  
        It optionally can filter the data based on filterDataItem & filterValue.

    @param      {string}    filename        The name of the file you want to export. 
    @param      {string}    filterDataItem  The column name you want to filter on. 
    @param      {string}    filterValue     The value you want to filter by.
    */
    exportToCsv: function(filename, filterDataItem, filterValue) {
        var me = this;
        var exportStr = "";

        for ( var i=0; i < me.columns.length; i++ ) {
            exportStr += '"'+me.columns[i].heading+'"'+",";
        }
        exportStr += "\n";

        for ( var i=0; i < me.data.length; i++ ) {
            if ( filterDataItem == "ALL" || me.data[i][filterDataItem] == filterValue) {
                for ( var j=0; j < me.columns.length; j++ ) {
                    if (typeof me.data[i][me.columns[j].dataItem] !== 'undefined') {
                        exportStr += '"'+me.data[i][me.columns[j].dataItem]+'"'+",";
                    } else {
                        exportStr += ",";
                    }
                    
                }
                exportStr += "\n";   
            }
        }

        me.export(exportStr, filename, 'text/csv;charset=utf-8;');
    },

    /** 
        This function prepares the data[] for a Excel export.  
        It optionally can filter the data based on filterDataItem & filterValue.

    @param      {string}    filename        The name of the file you want to export. 
    @param      {string}    filterDataItem  The column name you want to filter on. 
    @param      {string}    filterValue     The value you want to filter by.
    */
    exportToExcel: function(filename, filterDataItem, filterValue) {
        var me = this;
        var exportStr = "<table><tr>";

        for ( var i=0; i < me.columns.length; i++ ) {
            exportStr += '<th>'+me.columns[i].heading+'</th>';
        }
        exportStr += "</tr>";

        for ( var i=0; i < me.data.length; i++ ) {
            if ( filterDataItem == "ALL" || me.data[i][filterDataItem] == filterValue) {
                exportStr += "<tr>";
                for ( var j=0; j < me.columns.length; j++ ) {
                    if (typeof me.data[i][me.columns[j].dataItem] !== 'undefined') {
                        exportStr += '<td>'+me.data[i][me.columns[j].dataItem]+'</td>';
                    } else {
                        exportStr += "<td></td>";
                    }
                }
                exportStr += "</tr>";
            }
        }
        exportStr += "</tr></table>";

        me.export(exportStr, filename, 'data:application/vnd.ms-excel;');
    },

    /** 
        Initiates a file export given an export string, filename
        and fileType.

    @param      {string}    exportStr   The string to export. 
    @param      {string}    filename    The filename to export to. 
    @param      {string}    fileType    The file type to export as.
    */
    export:     function(exportStr, filename, fileType) {
        var blob = new Blob([exportStr], { type: fileType });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
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
