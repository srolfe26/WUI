/**
The WUI Paging Object will handle both 'local' and 'remote' paging. 

    Note: Paging can be added to any object that extends Data and implements sort/sorters arrays like (DataList).
*/

(function($,Wui) {

Wui.Paging = function(args, wuiDataObj) {
    $.extend(this, {
        type: 'none',
        pageSize:  100,
        width: '600px',
        height: '30px'
    }, args);

    this.init(wuiDataObj);
 
    // This is important - so the DataList Object knows it has a pager now.
    wuiDataObj.pager = this;
};

Wui.Paging.prototype = $.extend(new Wui.O(),{
    init: function(wuiDataObj) {
        Wui.O.prototype.init.call(this);
        var me = this, el = me.el = me.surePane = $('<div>', { 
            id: 'outsidediv',
            width: me.width,
        }).append( me.innerDiv = $('<div>', { 
            id: 'innerdiv',
            'width': '100%'
        }));
        this.sort = [];
        this.currPage = 0;

        // Assign the wui data object into the pager so we have access to the url and all member function/variables.
        this.dataObj = wuiDataObj;

        // If the config "sort" array is defined, add them to the sorters array
        if(me.dataObj.sort.length && !me.dataObj.sorters.length)
            for(i = 0; i < me.dataObj.sort.length; i++)
                for(j = 0; j < me.dataObj.cols.length; j++)
                    if(me.dataObj.cols[j].dataItem == me.dataObj.sort[i].dataItem)
                        me.dataObj.mngSorters(me.cols[j],me.dataObj.sort[i].order);

        // Update paging bar after ajax comes back and before data is set.
        me.dataObj.beforeSet = function(data, total) {
            // Set total if server sends total to us.  Otherwise use data.length.
            //    Note:  remote paging must set total from the backend - local paging will use data.length.
            me.total = ($.isNumeric(total)) ? total : (data) ? data.length : 0;
            me.updatePagingBar(data);      
        }
    },

    updatePagingBar: function(data) {
        var me = this;
        me.dataObj.data = data;

        function configBar(bar) {
            var bars = {
                    tbar: 'header',
                    bbar: 'footer'
                };
            var thisBar =   me.dataObj[bars[bar]];
            me.dataObj.surePane.addClass(bar);
            thisBar.place();
        }

        // create paging ui
        me.make();

        if (me.totalPages >= 1) {
            // Redraw everything that is currently in the bbar.
            configBar('bbar');   
        }
    },

    getPagingObj: function() {
        var me = this;
        var pagingObj = [];
        var sortArray = me.dataObj.marshallSorters(me.dataObj.sorters);

        me.startIdx = 0;
        me.endIdx = me.pageSize;
        me.totalPages = parseInt(me.dataObj.total / me.pageSize);
        me.widthInPercent = 100 / (me.totalPages + 1);

        if (me.totalPages < 1) {
            return pagingObj;
        }

        for (i=0; i<=me.totalPages; i++) { 
            var startContext = "";
            var endContext = "";
            if (typeof me.dataObj.data[(me.pageSize * i)] != 'undefined') {
            
                // Currently only show context for local paging
                if (me.type === 'local' ) {
                    
                    for(k=0; k< sortArray.length; k++) {
                        if (k>0) {
                            endContext+= " - ";
                            startContext += " - ";
                        }
                        if (i<me.totalPages) {
                            endContext += me.dataObj.data[(me.pageSize * i)+me.pageSize -1][sortArray[k].dataItem];
                        } else {
                            endContext += me.dataObj.data[me.dataObj.data.length-1][sortArray[k].dataItem];
                        }
                        startContext += me.dataObj.data[(me.pageSize * i)][sortArray[k].dataItem];
                    }
                } 
                pagingObj.push({
                    page: i,
                    startContext: startContext,
                    endContext: endContext,
                    widthInPercent: me.widthInPercent,
                    height: me.height
                });
            }
        }

        return pagingObj;
    },

    // Create the default paging UI
    make: function() {
        var me = this;
        me.items = [];
        me.innerDiv[0].innerHTML = "";
    
        me.pages = me.getPagingObj();

        var te = new Wui.Template({template: '<div  class="node" style="width: {widthInPercent}%; height: {height};" data-page-index="{page}" data-node-start-context="{startContext}" data-node-end-context="{endContext}">'});

        function makeItems(i) {
            var rec = te.data = me.pages[i],
                itmEl = te.make(i),
                itm = {el:itmEl, rec:rec};

            // Go to the appropriate page on click.
            itm.el.on('click', function(e) {
                var pageNum = parseInt($(itm.el).attr("data-page-index"));
                me.goToPage(pageNum);
            });

            $(itm.el).appendTo($(me.innerDiv));
        }
        
        if (me.totalPages >= 1) {
            for(j=0; j <= me.totalPages; j++) {
                makeItems(j);
            }    
        }

    },

    getStartIdx: function() {
        var me = this;
        if (me.totalPages < 1) {
            return 0;
        }
        return me.startIdx;
    },

    getEndIdx: function() {
        var me = this;
        if (me.totalPages < 1) {
            return me.dataObj.data.length;
        } else if (me.totalPages == me.currPage) {
            return me.dataObj.data.length;
        }
        return me.endIdx;
    },

    goToPage: function(page) {
        var me = this;
        console.log("Going to page: "+page);

        if (me.type === 'local') {                 
            me.startIdx = page * me.pageSize;
            me.endIdx = me.startIdx + me.pageSize;
            me.currPage = page;
            me.dataObj.fireDataChanged();  // fire to do the DataList.make()
            me.make(); // call paging make() to update dynamic sorters context for local paging.
        } else if (me.type == 'remote') {
            var start = page * me.pageSize;
            var sortArray = me.dataObj.marshallSorters(me.dataObj.sorters);

            var params = {
                start: start,
                limit: me.pageSize,
                sort: sortArray
            };

            // Load this page -- Note:  make() will be called after DataSet().
            me.dataObj.loadData(params);
        }
    }
});

})(jQuery,window[_wuiVar]);
