(function($,Wui) {
/**
 * The WUI Paging Object handles both 'local' and 'remote' paging of a Wui.DataList
 *  Object or any other Wui.Data Object that extends like DataList. 
 * 
 * Authors: marty.israelsen@usurf.usu.edu, hsin.wang@usurf.usu.edu
 * 
 * Example:
 
 var data = [
  {
    "_id": "574472f23c3007d892869395",
    "name": "Lynn Sweeney",
    "company": "FUTURIS",
    "favoriteFruit": "strawberry"
  },
  ...
  ...
  {
    "_id": "574472f24e55d0e885375dab",
    "name": "Floyd Holloway",
    "company": "GUSHKOOL",
    "favoriteFruit": "banana"
  }];

  var grid = new Wui.Grid($.extend({
        data: data,
        columns: [
            {heading: 'ID', dataItem: '_id'},
            {heading: 'Name', dataItem: 'name'},
            {heading: 'company', dataItem: 'company'},
            {heading: 'Fruit', dataItem: 'favoriteFruit'}
        ],
        title: '<h2>Weird Grid</h2>',
        bbar: [
            this.btn = new Wui.Button()
        ]
    },args));
  
  
  var pager = new Wui.Paging({
              type: 'local',    // specifiy either 'local' or 'remote' 
              pageSize: 100
          }, 
          grid                  // <- Pass in the "grid" into the Wui.Paging object.
  );   

  // splice the pager onto the bbar.
  grid.bbar.splice(0,0,pager);

 *
 * @param   {string}            type            Is either "local" or "remote"
 * @param   {integer}           pageSize        Size of each page
 * @param   {integer}           width           width of the paging bar
 * @param   {integer}           height          Height of the paging bar
 * @param   {string}            cls             Css class to apply to paging bar
 * @param   {string}            buttonClass     Class to apply to pager buttons
 * @param   {boolean}           pagePosition    Show page position and total
 * @param   {boolean}           adjacentButtons Adds Prev & Next buttons to pager
 * @param   {string}            tooltip         Pass in the container element for the tooltip. 
 *                
 * @return  {object}            Returns a new Wui.Paging Object.
 */
Wui.Paging = function(args, wuiDataObj) {
    $.extend(this, {
        type: 'none',
        pageSize:  100,
        width: '600px',
        height: '30px',
        cls: 'w121-pager',
        buttonClass: 'w121-pager-button',
        pagePosition: true,
        adjacentButtons: true,
        tooltip: $('<div>')
    }, args);
    this.init(wuiDataObj);
 
    // This is important - so the DataList Object knows it has a pager now.
    wuiDataObj.pager = this;
};

Wui.Paging.prototype = $.extend(new Wui.O(),{

    /**
     * Set up needed UI and listeners
     *    
     * @param   {object}  wuiDataObj        A Wui.DataList Object or any Wui.Data 
     *                                      Object that is extended like DataList.                               
     */
    init: function(wuiDataObj) {
        Wui.O.prototype.init.call(this);
        var me = this,
        el = me.el = me.surePane = $('<div>');
        me.surePaneInner = $('<div>', {class: 'w121-pager-inner'});
        if( me.pagePosition ) {
            me.surePane.addClass('has-page-position')
        }
        me.pageButtons = me.pageButtons = $('<div>', {class: 'pager-buttons'});
        me.surePane.append(me.surePaneInner.append(me.pageButtons));


        this.currPage = 0;

        // add tooltip
        me.tooltip
        .attr('class', 'pager-tooltip')
        .appendTo($('body'));

        // Add class to surePane to make space for adjacent buttons
        if(me.adjacentButtons) {
            me.surePane.addClass('has-adjacent-buttons');
        }

        // Add page count
        if(me.pagePosition) {
            me.pagePositionEl = $('<div>')
            .addClass('w121-pager-page-position')
            .prependTo(me.surePaneInner);
        }

        // Go to the appropriate page on click.
        me.pageButtons.on('click', '[name=pager_button]', function page(e) {
            var $this = $(this);
            me.goToPage(parseInt($this.attr('data-page-index')));
            $this.siblings().removeClass('active');
            $this.addClass('active');
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
        if (me.adjacentButtons) {
            me.pageButtons.on('click', '[name=pager_prev]', function() {
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
        }

        // Assign the wui data object into the pager so we have access to the 
        // 'url' and all member function/variables.
        this.dataObj = wuiDataObj;

        // Update paging bar after data is set.
        me.dataObj.afterSet = function(data) {
            me.updatePagingBar(data);
        }
    },

    /**
     * This function assigns the data Object's data array, makes the paging
     * UI and redrawes the bbar.
     *    
     * @param   {object}    data         A data array.                                
     */
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

    /**
     * This function creates an array of paging objects.   Each object holds 
     * information for each page of the result set.  Note:  with local paging, 
     * context information about the starting and ending records is also stored 
     * in the object based on the current
     * sort order.
     *       
     * @return  {object}          Returns an array of paging objects.
     */
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

    /**
     * Makes the default paging UI using the paging Object
     */
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
                    // TODO: (hfw) determine whether title attribute is necessary 
                    //        for accessibility
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

        if (me.pagePosition) {
            me.pagePositionEl.html('page ' + (me.currPage + 1) + ' / ' 
                + (me.totalPages + 1 ) + '<br /> total ' + me.dataObj.total);
        }

        if (me.adjacentButtons) {
            me.adjacentPrev = $('<div>')
            .text('Prev')
            .addClass('pager-prev')
            .attr('name', 'pager_prev')
            .prependTo(me.pageButtons);
            
            me.adjacentNext = $('<div>')
            .text('Next')
            .addClass('pager-next')
            .attr('name', 'pager_next')
            .appendTo(me.pageButtons);
        };
    },

    /**
     * Helper function to updating tool tips
     */
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

    /**
     * Helper function to update tool tip positions
     */
    updateTooltipPosition: function(target) {
        var me = this;

        me.tooltip
        .offset({
            left: me.surePane.offset().left,
            top: me.pageButtons.offset().top - (me.surePane.height() + me.tooltip.height())
        });
    },

    /**
     * Get starting index into the data array for the current page.
     *
     * @return  {integer}    The start index
     */
    getStartIdx: function() {
        var me = this;
        if (me.totalPages < 1) {
            return 0;
        }
        return me.startIdx;
    },

    /**
     * Get ending index into the data array for the current page.
     *
     * @return  {integer}    The end index
     */
    getEndIdx: function() {
        var me = this;
        if (me.totalPages < 1) {
            return me.dataObj.data.length;
        } else if (me.totalPages == me.currPage) {
            return me.dataObj.data.length;
        }
        return me.endIdx;
    },

    /**
     * This fuction will prepare everything you need to move to the specified page, 
     * then initiate the dataObj.make().  Works for both 'local' and 'remote' paging.
     *
     * @param   {integer}   page       The page you want to go to.
     */
    goToPage: function(page) {
        var me = this;

        if (me.type === 'local') {                 
            me.startIdx = page * me.pageSize;
            me.endIdx = me.startIdx + me.pageSize;
            me.currPage = page;

            // fireDataChanged() to do the DataList.make()
            me.dataObj.fireDataChanged();  

        } else if (me.type == 'remote') {
            var start = page * me.pageSize;
            var sortArray = me.dataObj.marshallSorters(me.dataObj.sorters);

            var params = {
                start: start,
                limit: me.pageSize,
                sort: sortArray
            };

            // Load this page -- Note:  make() will be called in 
            // afterSet() -> updatePagingBar() above in init.
            me.dataObj.loadData(params);
        }
        me.pageButtons.find('[name=pager_button]').removeClass('pager-active')
        me.pageButtons.find('[data-page-index=' + me.currPage + ']').addClass('pager-active')
        me.tooltip.removeClass('show')
    }
});

})(jQuery,window[_wuiVar]);
