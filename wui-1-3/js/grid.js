/*! Wui 1.3
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.3/license.html
 */

(function($,Wui) {

Wui.Tabs = function(args){ 
    $.extend(this,{
        bbar:           [],
        currentTab:     null,
        items:          [],
        lbar:           [],
        rbar:           [],
        tabsHideHeader: null,
        tabsBottom:     false,
        tabsLeft:       false,
        tbar:           []
    },args); 
    this.init();
};
Wui.Tabs.prototype = $.extend(new Wui.Pane(),{    
    place:          function(){
                        var me = this;
                        
                        me.el.addClass('w13-tabs');
                        
                        //adds the object's items if any
                        if(me.items === undefined) me.items = [];
                        $.each(me.items,function(idx,itm){
                            itm.el.addClass('w13-tab-panel');
                            itm.tabCls =    'w13-tab ' +
                                            ((itm.tabCls) ? ' ' + itm.tabCls : '') +
                                            ((me.tabsLeft) ? ' left' : '');
                            
                            if(itm.tabsHideHeader)
                                itm.el.addClass('wui-hide-heading');
                            
                            // Add buttons as tabs
                            me[me.tabsBottom ? 'footer' : 'header'].push(
                                itm.tab = new Wui.Button({
                                    text:   itm.title || 'Tab ' + (parseInt(idx) + 1),
                                    cls:    itm.tabCls,
                                    pane:   itm
                                })
                            );
                            
                            // Add listeners for tab changes
                            me[me.tabsBottom ? 'footer' : 'header'].el.on('wuibtnclick','.w13-tab',function(evnt,btn){
                                me.giveFocus(btn.pane);
                            });
                        });
                        
                        return Wui.O.prototype.place.call(me); //.wrap($('<div>')
                    },
    giveFocus:      function(tab, supressEvent){
                        var me = this;
      
                        supressEvent = (supressEvent !== undefined) ? supressEvent : false;
                        
                        $.each(me.items,function(idx,itm){
                            var isActive = itm === tab;
                            itm.tab.el.toggleClass('selected', isActive);
                            itm.el.toggleClass('active', isActive);
                            if(isActive){
                                me.currentTab = itm;
                                if(!supressEvent) 
                                    me.el.trigger($.Event('tabchange'),[me, itm.tab, itm]);
                                itm.layout();
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


Wui.Grid = function(args){
    $.extend(this,{
        bbar:           [],
        colDataParams:  {},
        colParams:      {},
        columns:        [],
        colUrl:         null,
        data:           null,
        defaultDataType:'string',
        hideHeader:     false,
        lbar:           [],
        multiSelect:    false,
        rbar:           [],
        selected:       [],
        sort:           [],
        tbar:           []
    },args); 
    this.init();
};
Wui.Grid.prototype = $.extend(new Wui.DataList(), new Wui.Pane(), {
    afterMake:  function(){
                    this.layout();
                    this.removeMask();
                },
    doSort:     function(depth,a,b){
                    var me = this;
                    if(me.sorters.length > 0){
                        var col = me.sorters[depth],
                            compA = a.rec[col.dataItem],
                            compB = b.rec[col.dataItem];
                            
                        //get the direction of the second sort
                        var srtVal = (col.sortDir == 'asc') ? 1 : -1;
                        
                        // perform the comparison based on 
                        var compare = 0;
                        switch(col.dataType){
                            case 'date':
                                compA = new Date(compA);
                                compB = new Date(compB);
                                compare = (compA.getTime() == compB.getTime()) ? 0 : (compA.getTime() > compB.getTime()) ? 1 : -1;
                                break;
                            case 'numeric':
                                compA = (parseFloat(compA)) ? parseFloat(compA) : 0;
                                compB = (parseFloat(compB)) ? parseFloat(compB) : 0;
                                compare = (compA == compB) ? 0 : (compA > compB) ? 1 : -1;
                                break;
                            default:
                                compare = $.trim(compA).toUpperCase().localeCompare($.trim(compB).toUpperCase());
                        }
                        
                        if(compare !== 0 || me.sorters[depth + 1] === undefined)    return compare * srtVal;
                        else                                                        return me.doSort(depth + 1,a,b);
                    }else{
                        return (a.rec.wuiIndex > b.rec.wuiIndex) ? 1 : -1;
                    }
                },
    getColumns: function(){
                    var me = this;
                    
                    if(me.colUrl && me.colUrl.length){
                        // Make remote call for columns
                        me.colProxy = new Wui.Data($.extend({url:me.colUrl, params:me.colParams, afterSet:function(r){ me.setColumns(r); }}, me.colDataParams));
                        me.colProxy.loadData();
                    }else if(me.columns.length){
                        // Check for locally defined columns
                        return me.setColumns(me.columns);
                    }else{
                        //throw('There are no columns defined for this WUI Grid.');
                    }    
                },
    init:       function(){
                    var me = this;
                    
                    // Set up container
                    Wui.Pane.prototype.init.call(me);
                    me.el.addClass('w13-grid');

                    // Add grid specific DOM elements and reset elAlias
                    me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh').appendTo(me.elAlias);
                    me.tblContainer = $('<div><table></table></div>').addClass('grid-body').appendTo(me.elAlias);
                    me.elAlias = me.tbl = me.tblContainer.children('table');
                    me.heading = me.headingContainer.children('ul');
                    
                    // columns and sorting on multiple columns
                    me.cols = [];
                    me.sorters = [];
                    
                    // hide the header
                    if(me.hideHeader)    me.headingContainer.height(0);
                },
    layout:     function(){
                    var me = this; 

                    Wui.O.prototype.layout.call(me);

                    if(me.fitToContent === true){
                        var me = this,
                            toolBarsH = me.header.el.outerHeight() + me.footer.el.outerHeight(),
                            maxHeight = $.isNumeric(me.maxHeight) ? me.maxHeight : 0,
                            totalHeight = me.headingContainer.outerHeight();

                        me.tblContainer.children().each(function(){
                            totalHeight += $(this).outerHeight();
                        });

                        totalHeight = (maxHeight > 0 && totalHeight + toolBarsH > maxHeight) ? maxHeight : totalHeight;

                        me.height = totalHeight + toolBarsH;
                        me.cssByParam();
                    }

                    if(me.cols.length) me.sizeCols();

                    if(me.parent){
                        Wui.fit(me.parent.items, (me.parent.fitDimension || 'width'));
                        me.el.parent().css('overflow','hidden');
                    }
                },
    loadData:   function(){
                    this.maskHTML = 'Loading <i class="fa fa-cog fa-spin"></i>';
                    this.addMask();
                    return Wui.Data.prototype.loadData.apply(this,arguments);
                },            
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
                                    col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                    
                                    for(var i = me.sorters.length; i > 0; i--)
                                        if(me.sorters[i - 1].el == col.el)
                                            me.sorters.splice(i - 1,1);
                                }else{
                                    col.sortDir = 'desc';
                                }
                            }else{
                                // Can't sort on more than 5 columns
                                if(me.sorters.length > 5){
                                    col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                    return false;
                                }
                                
                                col.sortDir = 'asc';
                                me.sorters.push(col);
                            }
                        }    
                    }

                    $.each(me.sorters,function(i,itm){
                        itm.el.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir).addClass(itm.cls);
                    });
                },
    modifyItem: function(itm){
                    var me = this;
                    // Perform renderers (if any)
                    $.each(me.renderers,function(idx, r){
                        var cell = itm.el.children(':eq(' +r.index+ ')').children('div'),
                            val = itm.rec[r.dataItem];
                        
                        cell.empty().append(r.renderer.call(null, cell, val, itm.rec, itm.el, me));
                    });
                    return itm.el;
                },
    onRender:   function(){
                    // Store the real value of autoLoad, but set it to false so that the grid waits for the columns
                    // before loading data.
                    var me = this, al = me.autoLoad;
                    
                    me.autoLoad = false;
                    Wui.DataList.prototype.onRender.call(this);
                    
                    // Start with getting the columns - Many methods waterfall from here
                    me.autoLoad = al;
                    return this.getColumns();
                },
    refresh:    function(){
                    if(this.url === null)   this.setData(this.data);
                    else                    return this.getColumns();
                },    
    renderColumn:function(col,idx){
                    var me = this;
                    
                    $.extend(col, new Wui.O({
                        dataType:   col.dataType || me.defaultDataType,
                        fit:        (col.fit === undefined) ? (col.width === undefined) ? 1 : -1 : col.fit,
                        cls:        col.cls || '',
                        renderer:   (col.renderer) ?    (function(a){
                                                            // Handles renderer if it exists
                                                            if(typeof a !== 'function' && eval('typeof ' + a) == 'function')
                                                                a = new Function('return ' + a + '.apply(this,arguments)');
                                                            if(typeof a === 'function')
                                                                me.renderers.push({dataItem:col.dataItem, renderer:a, index:idx});
                                                        })(col.renderer) : '',
                        index:      idx,
                        resizable:  typeof col.resizable === 'undefined' ? true : col.resizable,
                        sortable:   typeof col.sortable === 'undefined' ? true : col.sortable,
                        width:      col.width === undefined ? 0 : col.width,
                        el:         $('<li>')
                                    .append($('<div>').text(col.heading))
                                    .attr({unselectable:'on'})
                                    .addClass('wui-gc').addClass(col.cls)
                    }));
                    
                    if(col.sortable)    col.el.click(function(){ me.sortList(col); });
                    else                col.el.addClass('wui-no-sort');

                    //grids with single columns shouldn't have a resizable option
                    if(me.columns.length > 1 && !col.vertical && col.resizable){
                        col.el.resizes({
                            handles:        'e',
                            anchored:       true,
                            resizeStart:    function(event,ui){ me.tempLayout = me.layout; me.layout = function(){}; },
                            afterResize:    function(event,ui){ me.sizeCols(); me.layout = me.tempLayout; },
                            duringResize:   function(c,w,h){ 
                                                col.width = w; col.fit = -1;
                                                Wui.fit(me.cols,'width');
                                            }
                        });
                    }
                    
                    me.cols.push(col);
                    
                    // Append newly created el to the DOM
                    me.heading.append(col.el);
                },
    push:       function(){
                    var retVal = Wui.Data.prototype.push.apply(this,arguments);
                    this.sizeCols();
                    return retVal;
                },
    splice:     function(){
                    var retVal = Wui.Data.prototype.splice.apply(this,arguments);
                    this.sizeCols();
                    return retVal;
                },
    setColumns: function(cols){
                    var me = this;
                    
                    // clear column list
                    me.columns = cols;
                    me.heading.empty();
                    me.cols = [];
                    me.items = [];
                    me.renderers = [];
                    
                    // clear template
                    me.template = '<tr>';
                    
                    // apply columns on grid
                    $.each(cols,function(i,col){
                        // Add to the template string based on column info
                        var tpltItem = (col.dataTemplate) ? col.dataTemplate : ((col.dataItem) ? '{' +col.dataItem+ '}' : '');
                        me.template += '<td><div>' +tpltItem+ '</div></td>';
                        
                        // Deal with vertical columns - forces them to be 48px wide
                        if(col.vertical){
                            me.el.addClass('has-vert-columns');
                            if(col.cls) col.cls += ' vert-col';
                            else        col.cls = 'vert-col';
                            
                            col.width = 50;
                            delete col.fit;
                        }
                        
                        // Add column to cols array
                        me.renderColumn(col,i);
                    });
                    
                    // finish template
                    me.template += '</tr>';

                    // clear sorters for columns that no longer exist and reapply local sort
                    if(me.sorters && me.sorters.length && me.cols.length){
                        for(var i = me.sorters.length - 1; i >= 0; i--){
                            var remCol = true;
                            for(var j = 0; j < me.cols.length; j++){
                                if(me.cols[j].dataItem == me.sorters[i].dataItem){
                                    // A handshake of information so the sorter doesn't get confused
                                    me.sorters[i].el = me.cols[j].el; 
                                    me.cols[j].sortDir = me.sorters[i].sortDir;
                                    remCol = false; 
                                    break;
                                }
                            }
                            if(remCol) me.sorters.splice(i,1);
                        }
                    }
                    
                    if(me.autoLoad){
                        if(me.url === null) me.setData(me.data);
                        else                return me.loadData();
                    }
                },
    setData:    function(){
                    var me = this, i = null, j = null;

                    Wui.DataList.prototype.setData.apply(me,arguments);
                    
                    // If the config sorters is defined, add them to the array
                    if(me.sort.length && !me.sorters.length)
                        for(i = 0; i < me.sort.length; i++)
                            for(j = 0; j < me.cols.length; j++)
                                if(me.cols[j].dataItem == me.sort[i].dataItem)
                                    me.mngSorters(me.cols[j],me.sort[i].order);

                    this.sortList();
                },
    sizeCols:   function (){
                    var me = this, 
                        hc = me.headingContainer,
                        acctForScrollBar = me.tbl.find('tr:first').height() * (me.displayMax > 1 ? me.displayMax : me.total) > me.tblContainer.height(),
                        sbWid = acctForScrollBar ? Wui.scrollbarWidth() : 0;
                    hc.css('padding-right', sbWid);
                    Wui.fit(me.cols,'width');

                    for(var i = 0; i < me.cols.length; i++)
                        me.tbl.find('td:eq(' +i+ ')').css({ width: me.cols[i].el.innerWidth() });

                    // Necessary to define in javascript because webkit won't use the style
                    // until the width of the table has been defined.
                    me.tbl.css({width: hc.width(), tableLayout: 'fixed'});
                },
    sortList:   function(col) {
                    var me = this;
                    
                    me.mngSorters(col);
                    
                    // Sort the list
                    var listitems = me.items;
                    listitems.sort(function(a, b){ return me.doSort(0, a, b); });

                    me.tbl.detach();
                    // Place items and reset alternate coloring
                    $.each(listitems, function(idx, row) { row.el.appendTo(me.tbl); });
                    me.tbl.appendTo(me.tblContainer);
                    me.sizeCols();
                }
});

}(jQuery,window[_wuiVar]));