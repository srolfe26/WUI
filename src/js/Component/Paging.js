/**
The WUI Paging Object will handle both 'local' and 'remote' paging. 

    Note: Paging can be added to any object that extends Data and implements sort/sorters arrays like (DataList).
*/

(function($,Wui) {

Wui.Paging = function(args, wuiDataObj) {
    $.extend(this, {
        type: 'none',
        pageSize:  100,
        width: 600,
        height: 30,
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

        // add tooltip
        me.tooltip
        .attr('class', 'pager-tooltip')
        .appendTo($('body'));


        // add adjacent paging buttons
        me.pageButtons
        .css({
            'padding-left': '4em',
            'padding-right': '4em'
        });

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

            me.updateTooltipContent(me.pages[me.currPage].el);
            me.updateTooltipPosition(me.pages[me.currPage].el);
        })
        .on('click', '[name=pager_next]', function() {
            var pageNum = (me.currPage === me.totalPages) ? 0 : me.currPage + 1;
            me.goToPage(pageNum);

            me.updateTooltipContent(me.pages[me.currPage].el);
            me.updateTooltipPosition(me.pages[me.currPage].el);
        })
        .on('mouseenter', '.w121-pager-button', function(e) {
            var $this = $(this);
            me.updateTooltipContent($this);
            me.updateTooltipPosition($this);
        })
        .on('mouseleave', function(e) {
            me.tooltipTimer = setTimeout(function() {
                me.tooltip.removeClass('show');
            }, 300);

            $(this).on('mouseenter', function() {
                window.clearTimeout(me.tooltipTimer);
            })
        });

        // Assign the wui data object into the pager so we have access to the 'url' and all member function/variables.
        this.dataObj = wuiDataObj;

        // Update paging bar after data is set.
        me.dataObj.afterSet = function(data) {
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
            var thisBar = me.dataObj[bars[bar]];
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
                            endContext+= " | ";
                            startContext += " | ";
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
        me.pageButtons.html('');
    
        me.pages = me.getPagingObj();

        me.surePane
        .width(me.width)
        .addClass(this.cls);

        // generate page buttons
        if (me.totalPages >= 1) {
            for(var j=0; j <= me.totalPages; j++) {
                var ui = $('<div>')
                .attr({
                    // TODO: (hfw) determine whether title attribute is necessary for accessibility
                    // 'title': me.pages[j].startContext + '\n ~ ' + me.pages[j].endContext,
                    'name': 'pager_button',
                    'data-page-index': j
                })
                .addClass(me.buttonClass)
                .css({
                    width: me.widthInPercent + '%',
                    height: me.height
                })
                .append('' || '')
                .appendTo(me.pageButtons);

                me.pages[j].el = ui;
            }
        }


        me.adjacentPrev = $('<div>')
        .text('Prev')
        .addClass('pager-prev')
        .attr('name', 'pager_prev')
        .width('4em')
        .prependTo(me.pageButtons);
        
        me.adjacentNext = $('<div>')
        .text('Next')
        .addClass('pager-next')
        .attr('name', 'pager_next')
        .width('4em')   
        .appendTo(me.pageButtons);
    },

    updateTooltipContent: function(target) {
        var me = this, targetIndex = target.attr('data-page-index');
        me.tooltip
        .html(
            me.pages[targetIndex].startContext
            + '<hr />'
            + me.pages[targetIndex].endContext 
        );
        if (me.dataObj.sorters.length > 0) {
            me.tooltip
            .addClass('show');
        };
    },
    updateTooltipPosition: function(target) {
        var me = this;

        me.tooltip
        .offset({
            left: me.surePane.offset().left,
            top: me.pageButtons.offset().top - (me.pageButtons.height() + me.tooltip.height())
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
        console.log("Going to page: "+page);

        if (me.type === 'local') {                 
            me.startIdx = page * me.pageSize;
            me.endIdx = me.startIdx + me.pageSize;
            me.currPage = page;
            me.dataObj.fireDataChanged();  // fire to do the DataList.make()
            // me.make(); // call paging make() to update dynamic sorters context for local paging.
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
        me.pageButtons.find('[name=pager_button]').removeClass('pager-active')
        me.pageButtons.find('[data-page-index=' + me.currPage + ']').addClass('pager-active')
        me.tooltip.removeClass('show')
    }
});

})(jQuery,window[_wuiVar]);
