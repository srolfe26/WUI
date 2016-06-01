/**
The WUI Paging Object will handle both 'local' and 'remote' paging. 
*/

(function($,Wui) {

Wui.Paging = function(args, wuiDataObj) {
    $.extend(this, {
        type: 'none',
        pageSize:  100,
        pageIdx: '',
        width: '600px',
        height: '30px',
        cls: 'w121-pager',
        buttonClass: 'w121-pager-button',
        showPagePosition: true,
        showAdjacentButtons: true,
        tooltip: $('<div>')
    }, args);
    this.init(wuiDataObj);
 
    // This is important - so the DataList Object knows it has a pager now.
    wuiDataObj.pager = this;
};

Wui.Paging.prototype = $.extend(new Wui.O(),{
    init: function(wuiDataObj) {
        Wui.O.prototype.init.call(this);
        var me = this, el = me.el = me.surePane = $('<div>').append( me.pageButtons = $('<div>', {class: 'pager-buttons'}));
        this.currPage = 0;
        this.dataObj = wuiDataObj;
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
                        var endContext = me.dataObj.data[(me.pageSize * i)+me.pageSize -1][me.pageIdx];
                    } else {
                        var endContext = me.dataObj.data[me.dataObj.data.length-1][me.pageIdx];
                    }
                    var startContext = me.dataObj.data[(me.pageSize * i)][me.pageIdx];
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
    createPagingUI: function() {
        var me = this;
        me.items = [];
        me.pageButtons.html('');
    
        me.pages = me.getPagingObj();

        me.surePane
        .width(me.width)
        .addClass(this.cls);



        me.tooltip = $('<div>', {
            'id': 'tooltip',
            'class': 'pager-tooltip'
        }).appendTo($('body'));

        // generate page buttons
        if (me.totalPages >= 1) {
            for(var j=0; j <= me.totalPages; j++) {
                $('<div>')
                .attr({
                    'title': me.pages[j].startContext + '\n ~ ' + me.pages[j].endContext,
                    'name': 'pager_button',
                    'data-page-index': j,
                    'data-page-start-context': me.pages[j].startContext,
                    'data-page-end-context': me.pages[j].endContext
                })
                .addClass(me.buttonClass)
                .css({
                    width: me.widthInPercent + '%',
                    height: me.height
                })
                .append('' || '')
                .appendTo(me.pageButtons);
            }
        }

        // add adjacent paging buttons
        me.pageButtons
        .css({
            'padding-left': '4em',
            'padding-right': '4em'
        })
        .prepend(
            $('<div>')
                .text('Prev')
                .addClass('pager-prev')
                .attr('name', 'pager_prev')
                .width('4em')
        )
        .append(
            $('<div>')
                .text('Next')
                .addClass('pager-next')
                .attr('name', 'pager_next')
                .width('4em')
        );


        // Go to the appropriate page on click.
        me.pageButtons.on('click', '[name=pager_button]', function page(e) {
            var $this = $(this);
            me.goToPage(parseInt($this.attr('data-page-index')));
            $this.siblings().removeClass('active');
            $this.addClass('active');
        })
        .on('click', '[name=pager_prev]', function() {
            var pageNum = (me.currPage === 0) ? me.totalPages : me.currPage - 1;
            me.goToPage(pageNum);
        })
        .on('click', '[name=pager_next]', function() {
            var pageNum = (me.currPage === me.totalPages) ? 0 : me.currPage + 1;
            me.goToPage(pageNum);
        })
        .on('mouseenter', '.w121-pager-button', function(e) {
            var $this = $(this);
            me.updateTooltipContent($this, me.tooltip);
            me.updateTooltipPosition($this, me.tooltip);
        });
    },

    updateTooltipContent: function(target, tooltip) {
        tooltip
        .html(
            target.attr('data-page-start-context')
            + '<div> ~ </div>' + target.attr('data-page-end-context')
        )
        .addClass('show');
    },
    updateTooltipPosition: function(target, tooltip) {
        tooltip
        .offset({
            left: (target.offset().left + target.width()/2) - ($('.pager-tooltip').outerWidth()/2),
            top: target.offset().top - (tooltip.height()*1.5)
        });
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

        if (me.type === 'local') {                 
            console.log("Going to page: "+page);
            me.startIdx = page * me.pageSize;
            me.endIdx = me.startIdx + me.pageSize;
            me.currPage = page;
            me.afterClick(page,me.pages[page]);
        } else {
            // TODO:  Implement Remote 
            // Do an ajax call (using the url of the dataObj)
        }
        me.pageButtons.find('[name=pager_button]').removeClass('pager-active')
        me.pageButtons.find('[data-page-index=' + me.currPage + ']').addClass('pager-active')
    }
});

})(jQuery,window[_wuiVar]);
