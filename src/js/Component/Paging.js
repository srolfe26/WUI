/**
The WUI Paging Object will handle both 'local' and 'remote' paging. 
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
        this.dataObj = wuiDataObj;

        // If the config sorters is defined, add them to the array
        if(me.dataObj.sort.length && !me.dataObj.sorters.length)
            for(i = 0; i < me.dataObj.sort.length; i++)
                for(j = 0; j < me.dataObj.cols.length; j++)
                    if(me.dataObj.cols[j].dataItem == me.dataObj.sort[i].dataItem)
                        me.dataObj.mngSorters(me.cols[j],me.dataObj.sort[i].order);
    },

    afterClick: function(page, pageObj) {
        console.log("Override this function to do your make() in your object");
    },

    getPagingObj: function() {
        var me = this;
        var pagingObj = [];
        var sortArray = me.dataObj.marshallSorters(me.dataObj.sorters);

        me.startIdx = 0;
        me.endIdx = me.pageSize;
        // Note:  dataObj.total is set in Wui.Data.setData()
        //        The server needs to return "total" for remote paging - otherwise data.length will be used for total.
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
            me.afterClick(page,me.pages[page]);
        } else if (me.type == 'remote') {
            var start = page * me.pageSize
            var sortArray = me.dataObj.marshallSorters(me.dataObj.sorters);

            var params = {
                start: start,
                limit: me.pageSize,
                sort: sortArray
            };

            // Load this page
            me.dataObj.loadData(params);
            me.dataObj.setData = function(d,t){
                var me = this;
                Wui.Data.prototype.setData.apply(me,arguments);      
                me.afterClick(page,me.pages[page]);
            }
        }
        me.make();
    }
});

})(jQuery,window[_wuiVar]);
