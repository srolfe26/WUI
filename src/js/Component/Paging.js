/**
The WUI Paging Object will handle both 'local' and 'remote' paging. 
*/

(function($,Wui) {

Wui.Paging = function(args, dataObj){
    $.extend(this, {
        type: 'none',
        pageSize:  100,
        pageIdxNm: '',
        width: '600px',
        height: '30px'
    }, args);

    this.init(dataObj);

    // Assign the dataObject to have a pager.  
    // This is important so the DataList Object knows that it should do paging.
    dataObj.pager = this;
};

Wui.Paging.prototype = $.extend(new Wui.O(),{
    init: function(dataObj) {
        Wui.O.prototype.init.call(this);
        var me = this, el = me.el = me.surePane = $('<div>', { 
            id: 'outsidediv',
            width: me.width,
        }).append( me.innerDiv = $('<div>', { 
            id: 'innerdiv',
            'width': '100%'
        }));
        this.currPage = 0;
        this.dataObj = dataObj;
    },

    afterClick: function(page, pageObj) {
        console.log("Override this function to do your make() in your object");
    },

    getPagingObj: function() {
        var me = this;
        var pagingObj = [];

        if (me.type === 'local') { 
            me.startIdx = 0;
            me.endIdx = me.pageSize;
            me.totalPages = parseInt(me.dataObj.data.length / me.pageSize);
            me.widthInPercent = 100 / (me.totalPages + 1);

            if (me.totalPages < 1) {
                return pagingObj;
            }

            for (i=0; i<=me.totalPages; i++) { 
                if (typeof me.dataObj.data[(me.pageSize * i)] != 'undefined') {
                    var j=i+1;
                
                    if (i<me.totalPages) {
                        var endContext = me.dataObj.data[(me.pageSize * i)+me.pageSize -1][me.pageIdxNm];
                    } else {
                        var endContext = me.dataObj.data[me.dataObj.data.length-1][me.pageIdxNm];
                    }
                    var startContext = me.dataObj.data[(me.pageSize * i)][me.pageIdxNm];
                    pagingObj.push({
                        page: i,
                        startContext: startContext,
                        endContext: endContext,
                        widthInPercent: me.widthInPercent,
                        height: me.height
                    });
                }
            }
        } else {
            // TODO:  Implement Remote Paging here...
        }
        return pagingObj;
    },

    // Create the default paging UI
    createPagingUI:   function() {
        var me = this;
        //me.clear();
        me.items = [];
        me.innerDiv[0].innerHTML = "";
    
        me.pages = me.getPagingObj();
        //console.log(me.pages,me.totalPages)

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

    getStartIdx:    function() {
        var me = this;
        if (me.totalPages < 1) {
            return 0;
        }
        return me.startIdx;
    },

    getEndIdx:      function() {
        var me = this;
        if (me.totalPages < 1) {
            return me.dataObj.data.length;
        } else if (me.totalPages == me.currPage) {
            return me.dataObj.data.length;
        }
        return me.endIdx;
    },

    goToPage:       function(page) {
        var me = this;

        if (me.type === 'local') {                 
            console.log("Going to page: "+page);
            me.startIdx = page * me.pageSize;
            me.endIdx = me.startIdx + me.pageSize;
            me.currPage = page;
            me.afterClick(page,me.pages[page]);
        } else {
            // TODO:  Implement Remote 
            // Do an ajax call (using the url of the dataObj
        }
        
    }
});

})(jQuery,window[_wuiVar]);
