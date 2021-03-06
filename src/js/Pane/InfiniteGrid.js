Wui.InfiniteGrid = function(args){
    $.extend(this,{
        /** Array of data for the grid. */
        data:           null,

        /** This is an attribute of Wui.Grid that is not to be used in an infinite grid. 
        Use the same property in paging instead. */
        sort:           null,

        /**
        If paging is anything other than null, the grid will sort remotely and scroll infinitely.
        
        Example paging parameters are:
        {
            limit:    page size,
            start:    0 - a very good place to start
            sort:    {dataItem:'name', order:'asc/desc'}
        }
        */
        paging:            null
    },args); 
    this.init();
};
Wui.InfiniteGrid.prototype = $.extend(new Wui.Grid(), {
    /** 
    @param {array}    source        Array containing the data to add rows for.
    Adds rows to the table along with event listeners and column renderers.
    */
    addRows:        function(source){
                        var me = this,
                        holdingData = source || [],
                        els = [],
                        holder = $('<div>');
                
                        // Clear out items list
                        me.items = [];

                        // Add items to me.items
                        for(var i = 0; (me.displayMax < 0 && i < holdingData.length) || (me.displayMax > 0 && i < me.displayMax && i < holdingData.length); i++){
                            var rec = me.data = holdingData[i],
                                itm = {el:Wui.Template.prototype.make.call(me, i), rec:rec};
                                
                            Array.prototype.push.call(me.items,itm);
                            holder.append(me.createItem(itm));
                            els.push(itm.el);
                        }

                        me.clickListener(els);
                
                        // Clear out existing items and add new to the DOM
                        me.tbl.empty();
                        me.tbl.append(holder.children().unwrap());
                        me.data = holdingData;

                        return source;
                    },
    
    /** 
    Overrides an event hook on Wui.Data and makes the grid after new data is set
    */
    afterSet:        function(retData){
                        var me = this;
                        
                        if(me.tbl.children().length > 0){
                            if(me.total > me.data.length){
                                me.addRows(retData);
                                me.rowHeight = me.tbl.find('tr:first').outerHeight();
                                me.tbl.css({top:(me.params.start * me.rowHeight) + 'px'});
                                me.sizeCols();
                            }
                        }
                    },

    alignPagingSort:function(){
                        var me = this;
                        
                        if(me.sorters.length === 0)
                                me.paging.sort = me.originalSort;

                        $.each(me.paging.sort,function(idx,itm){
                            $.each(me.columns,function(i,col){
                                if(col.dataItem === itm.dataItem) me.mngSorters(col,itm.order);
                            });
                        });
                    },

    setGridVars:    function(){
                        var me = this;
                        
                        // Define object internal variables
                        me.tblContainer = $('<div><div>&nbsp;</div><table></table></div>').addClass('w121-grid-body');
                        me.tbl = me.tblContainer.children('table').addClass('w121-infinite-table');
                        me.tblHSize = me.tblContainer.children('div').addClass('w121-ghs');
                        me.heading = $('<div>').addClass('w121-gh').appendTo(me.elAlias);
                        me.sorters = [];
                        me.renderers = [];
                        me.originalSort = me.paging.sort || null;
                        
                        //Add listeners to table for paging
                        me.tblContainer.scroll(function(){ me.pagingScroll(); });
                        
                        me.elAlias.append(me.tblContainer,me.heading);
                    },

    /** 
    Method that will run immediately when the object is constructed. Creates necessary 
    DOM elements for the grid. Establishes whether the grid is remote or local, paging
    or not. */
    init:            function(){
                        Wui.Grid.prototype.init.call(this);
                        this.el.addClass('w121-infinite-grid');
                    },

    /** 
    Renders the data in the table. Overrides Wui.DataList.make()
    @private
    */
    make:           function(){
                        var me = this;
                        me.addRows(me.data);
                        me.rowHeight = me.tbl.find('tr:first').outerHeight();
                        me.totalPages = Math.floor(me.total/me.paging.limit);
                        me.alignPagingSort();
                        me.totalHeight = me.total * me.rowHeight;

                        if(me.tblHSize)
                            me.tblHSize.height(me.totalHeight);

                        // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                        // object has been manually run
                        me.autoLoad = true;

                        // Event hook and event
                        me.afterMake();
                        me.el.trigger($.Event('refresh'),[me,me.data]);
                    },

    /** 
    @param    {object}    col    An object containing the sort direction and DOM element of the heading
    #param    {string}    dir    The direction of the sort
    Manages the sorters for the grid by keeping them in an array. 
    */
    mngSorters:     function(col,dir){
                        var me = this,
                            i = 0,
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
                                    if(col.sortDir.toLowerCase() == 'desc'){
                                        delete col.sortDir;
                                        col.el.removeClass().addClass('w121-gc').addClass(col.cls);
                                        
                                        for(i = me.sorters.length; i > 0; i--)
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

                        // Add/remove classes to indicate to the user what is being sorted and take care of paging
                        me.paging.sort = [];
                            
                        if(me.sorters.length === 0)
                            me.alignPagingSort();
                            
                        me.sorters.forEach(function(itm,i){
                            itm.el.removeClass().addClass('w121-gc ' + sortClasses[i] + ' ' + itm.sortDir.toLowerCase()).addClass(itm.cls);

                            me.paging.sort.push({dataItem:itm.dataItem, order:itm.sortDir});
                        });
                    },

    pagingScroll:   function(){
                        var me      = this,
                            top     = me.tblContainer.scrollTop(),
                            page    = Math.round(me.totalPages * (top / me.totalHeight)),
                            newSuccess = function(){
                                me.tbl.css({top:(me.actualStart * me.rowHeight) + 'px'});
                                if(
                                    me.currPage != Math.floor((me.tblContainer.scrollTop() + 
                                    me.tblContainer.height()) / (me.totalHeight / me.totalPages))
                                ){
                                    me.pagingScroll();
                                }
                                me.sizeCols();
                            };

                        me.currPage = me.currPage || 0;
                        me.lastScroll = top;

                        if($.isNumeric(page) && me.currPage != page){
                            me.paging.start = page * me.paging.limit;
                            me.currPage = page;
                            
                            me.actualStart = page * me.paging.limit + ((page !== 0) ? -1 * Math.round(me.paging.limit / 2) : 0);
                            me.actualLimit = me.paging.limit * 2;
                            
                            me.loadData({
                                start:  $.isNumeric(me.actualStart) ? me.actualStart : 0, 
                                limit:  $.isNumeric(me.actualLimit) ? me.actualLimit : 50, 
                                sort:   JSON.stringify(me.paging.sort)
                            });
                        }

                        if(me.onSuccess !== newSuccess){me.onSuccess = newSuccess;}
                    },

    runSort:    function(){
                    var me = this;

                    // If paging then do the sorting on the server
                    me.currPage = -1;
                    me.tbl.scroll();
                },

    /** Overrides Wui.DataList.scrollToCurrent to turn of scrolling on the infinite grid. */
    scrollToCurrent:function(){},

    /** Overrides Wui.Data.setParams and allows for adding the infinite scroll parameters. */
    setParams:  function() {
                var me = this;

                $.extend(me.params,{limit:me.paging.limit, start: me.paging.start, sort:JSON.stringify(me.paging.sort)});

                if(typeof arguments[0] === 'object' && typeof arguments[0].start === 'undefined')
                    $.extend(arguments[0], {start:0});

                return Wui.Data.prototype.setParams.apply(me,arguments);
            },

    setData:        function(){
                        Wui.DataList.prototype.setData.apply(this,arguments);
                        this.sizeCols();
                    }
});