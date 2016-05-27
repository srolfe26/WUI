/** 
 * @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
 * 
 * The grid pane provides table-like functionality for data sets. Grids can be populated remotely
 * or have their data locally defined. Grids also support infinite scrolling by defining paging
 * parameters. Columns for the grid are defined in an array and with the following options:
 * 
 * cls             - A special class to add to the column
 * dataItem        - The item in the record that correlates to this column
 * dataTemplate    - Sort of a full on renderer, this allows you to format inserted data similar to
 *                   what is available in Wui.Template
 * dataType        - The type of data used in the column used for sorting (date, numeric, string:default)
 * fit             - A numeric indicator of the relative size of the column
 * heading         - The title of the column heading
 * renderer        - Function that can be run after the template rendering. Described below.
 * resizable       - Whether a column can be resized (defaults to true)
 * sortable        - Whether or not a column can be sorted
 * vertical        - Makes the column text oriented vertical and the column height at 150px, not resizable
 * width           - A pixel value for the width of the column
 * 
 * Custom renderers can be applied to columns.  These renderers are defined as functions in the column 
 * definition. The rendering function is defined passed the following parameters as below:
 * 
 * renderer: function (cell, value, record, row, grid) {}
 * 
 * Grids can be sorted by clicking on the headings of columns. Headings sort ascending on the first click, 
 * descending on the second and revert to their 'unsorted' order on the third.Sorting on multiple columns 
 * is possible with the a number indicating the precedence of the sort and an arrow for the direction of the sort 
 * appearing on the right side of the column heading.
 * 
 * Columns can be resized by dragging the heading borders left and right. Columns can be sized to 
 * extend beyond the width of the grid frame, but when sized smaller will pop back into position.
 */
Wui.Grid = function(args){
    return new Wui.DataList($.extend(this,{
        // Array of items that will be added to the footer..
        bbar:           [],
        
        // Array of items that will make up the columns of the grid table..
        columns:        [],
        
        // URL to get columns if its a dynamic grid.
        colUrl:         null,
        
        // Params to pass for columns on a dynamic grid.
        colParams:      {},

        // Configs to pass to the Wui.Data object that handles the retrival of the column.
        // The columns are set in the 'afterSet' method of the data flow - See Wui.Data
        colDataParams:  {},
        
        // Array of data for the grid..
        data:           null,
        
        // Data type the grid assumes a column will be. Matters for sorting. Other values are 'numeric' and 'date'.
        defaultDataType:'string',
        
        // Whether multiple rows/records can be selected at once..
        multiSelect:    false,
        
        // Whether or not to hide the column headers.
        hideHeader:     false,
        
        // An array of the currently selected records.
        selected:       [],

        // An array containing objects in the following format, that
        //define the initial sort of the data: {dataItem:'name', order:'asc/desc'}
        sort:           [],

        // @private Used internally to keep track of sorting, items added to sort will be used in the sorters array.
        // sorters:     []
        
        // An array of items that will be added to the header.
        tbar:           []
    },args));
};
Wui.Grid.prototype = $.extend(new Wui.Pane(), {
    /** 
     * Overrides DataList.afterMake(), sizes the columns and enables the grid @eventhook 
     */
    afterMake: function(){
        this.layout();
        this.removeMask();
    },
    
    
    /**
     * Closes the sorting drop down opened by right-clicking the grid headings
     */
    closeSorter: function() { 
        this.dd.children('li').off('click').end().css('display','none');
    },


    /** 
     * Recursive function for sorting on multiple columns @private
     * @param {number}    depth    Depth of the recursive call
     * @param {number}    a        First item to compare
     * @param {number}    b        Second item to compare
     * 
     * @return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
    */
    doSort: function(depth, a, b) {
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


    /** 
     * Verify that columns have been defined on the grid, or that they are available remotely 
     */
    getColumns: function() {
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
    
    
    /**
     * Creates instance specific DOM nodes and variables.
     */
    setGridVars: function() {
        var me = this;

        me.tblContainer = $('<div><table></table></div>').addClass('w121-grid-body').appendTo(me.elAlias);
        me.heading = $('<div>').addClass('w121-gh').appendTo(me.elAlias);
        me.elAlias = me.tbl = me.tblContainer.children('table');

        // columns and sorting on multiple columns
        me.cols = [];
        me.sorters = [];
    },
                
                
    /** 
     * Runs when the object is created, creates the DOM elements for the grid within the Wui.Pane 
     * that this object extends.
     */
    init: function() {
        var me = this;
        
        // Set up container
        Wui.Pane.prototype.init.call(me);
        Wui.DataList.prototype.init.call(me);
        me.el.addClass('w121-grid');

        // Add grid specific DOM elements and reset elAlias
        me.setGridVars();
        
        // Add sorting menu
        $('body').append( 
            me.dd = $(
                '<ul>' +
                    '<li>Ascending</li>' +
                    '<li>Decending</li>' +
                    '<li>No Sort</li>' +
                '<ul>'
            ).addClass('w121-sort-menu')
            .attr({ id: me.idCls = Wui.id() })
            .on('mousewheel scroll', function(evnt){ evnt.stopPropagation(); })
        );
        // Clear the sorting menu when it loses focus
        $(document).on('click','*:not(#' +me.idCls+ ')',function(){ 
            me.closeSorter();
        });
        
        // hide the header
        if(me.hideHeader)    me.heading.height(0);
    },
    
    
    /**
     * Overrides the Wui.O layout to allow for the optional sizing to fit content, column sizing,
     * and data positioning. 
     */
    layout: function() {
        Wui.O.prototype.layout.apply(this,arguments);
        
        if(this.fitToContent === true){
            var me = this,
                toolBarsH = me.header.el.outerHeight() + me.footer.el.outerHeight(),
                maxHeight = $.isNumeric(me.maxHeight) ? me.maxHeight : 0,
                totalHeight = me.heading.outerHeight();
            
            me.tbl.children().each(function(){
                totalHeight += $(this).outerHeight();
            });
            totalHeight = (maxHeight > 0 && totalHeight + toolBarsH > maxHeight) ? maxHeight : totalHeight;

            me.el.height(me.height = totalHeight + toolBarsH);
            me.container.height(me.height + 1);

            Wui.O.prototype.layout.apply(me,arguments);
        }

        if(this.cols.length) this.sizeCols();
    },

    
    /**
     * TODO: What does this function do?
     */
    layoutKids: function() {},
       
                    
    /** 
     * Overrides DataList.loadData(), to add the load mask 
     */
    loadData: function() {
        this.maskHTML = 'Loading <i class="fa fa-spinner fa-spin"></i>';
        this.addMask();
        
        return Wui.Data.prototype.loadData.apply(this,arguments);
    },


    /**
    * Manages the sorters for the grid by keeping them in an array.
    *
    * @param    {object}    col    An object containing the sort direction and DOM element of the heading
    * @param    {string}    dir    The direction of the sort
    */
    mngSorters: function(col,dir) {
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
     * Overrides DataList.modifyItem(), to implement the renderers
     *
     * @param   TODO: Define this
     */
    modifyItem: function(itm) {
        var me = this;
        
        // Perform renderers (if any)
        $.each(me.renderers,function(){
            var r = arguments[1],
                cell = itm.el.children(':eq(' +r.index+ ')').children('div'),
                val = itm.rec[r.dataItem];
            
            cell.empty().append(r.renderer.call(null, cell, val, itm.rec, itm.el, me));
        });
        
        return itm.el;
    },
    
    /** 
     * Overrides DataList.onRender(), to have the grid wait for columns before loading data while 
     * still preserving the set autoLoad value. 
     */
    onRender: function(){
        // Store the real value of autoLoad, but set it to false so that the grid waits for the columns
        // before loading data.
        var me = this, al = me.autoLoad;
        
        me.autoLoad = false;
        
        Wui.Pane.prototype.onRender.call(this);
        Wui.DataList.prototype.onRender.call(this);
        
        // Start with getting the columns - Many methods waterfall from here
        me.autoLoad = al;
        
        return this.getColumns();
    },
    
    
    /**
     * Overrides Pane.configBar() to add positioning the data window when tbars or bbars are 
     * added/removed. 
     *
     * @private 
     */
    configBar:  function(){
        Wui.Pane.prototype.configBar.apply(this,arguments);
    },


    /** 
     * Overrides DataList.refresh() to add disabling the grid to add the load mask 
     */
    refresh: function() {
        if(this.url === null) {
            this.setData(this.data);
        }
        else {
            return this.getColumns();
        }
    },


    /** 
     * Fill in gaps in the column definition and append to the cols array. The cols array is what 
     * the grid uses to render/reference columns. The append the column to the DOM. 
     * TODO: This is a terrible function name.
     *
     * @param   Object      col     A column definition.
     *                              TODO: Add a sample column definition here.
     *
     * @param   Number      idx     The index of the column from left to right.
     */                    
    renderColumn:function(col, idx){
        var me = this;
        
        $.extend(col,{
            dataType:   col.dataType || me.defaultDataType,
            fit:        (col.fit === undefined) ? (col.width === undefined) ? 1 : -1 : col.fit,
            cls:        col.cls || '',
            renderer:   (col.renderer) ? (function(renderer){
                            if (typeof renderer === 'function') {
                                me.renderers.push({
                                    dataItem: col.dataItem,
                                    renderer: renderer,
                                    index: idx
                                });
                            }
                        })(col.renderer) : '',
            index:      idx,
            resizable:  typeof col.resizable === 'undefined' ? true : col.resizable,
            sortable:   typeof col.sortable === 'undefined' ? true : col.sortable,
            width:      col.width === undefined ? 0 : col.width,
            el:         $('<div>').append(
                            $('<div>', {unselectable:'on'})
                                .text(col.heading))
                                .addClass('w121-gc ' + col.cls
                        )
        });
        
        col.el.css({
            width:          col.width,
            "flex-grow":    col.fit
        });

        if(col.sortable){
            col.el.on("contextmenu",function(e){
                e.preventDefault();
                Wui.positionItem($(this),me.dd);

                $('body').append(me.dd.width(100).css('display','block'));
                Wui.positionItem($(this),me.dd);
                me.dd.children('li').on('click',function(){
                    var options =   {
                                        'Ascending': function(){ me.mngSorters(col,'asc'); },
                                        'Decending': function(){ me.mngSorters(col,'desc'); },
                                        'No Sort': function(){ col.sortDir = 'desc'; me.mngSorters(col); },
                                    };

                    options[$(this).text()]();
                    me.closeSorter();
                    me.runSort();
                });
            });
            col.el.click(function(){ me.sortList(col); });
        }else{
            col.el.addClass('w121-no-sort');
        }             

        //grids with single columns shouldn't have a resizable option
        if(me.columns.length > 1 && !col.vertical && col.resizable){
            col.el.resizes({
                anchored:       true,
                minWidth:       60,
                minHeight:      0,
                direction:      'e',
                resizeStart:    function(){ me.tempLayout = me.layout; me.layout = function(){}; },
                afterResize:    function(){ me.sizeCols(); me.layout = me.tempLayout; },
                duringResize:   function(){ 
                                    $.extend(col, { width: arguments[1], fit:-1 });
                                    Wui.fit(me.cols,'width');
                                }
            });
        }
        
        me.cols.push(col);
        
        // Append newly created el to the DOM
        me.heading.append(col.el);
    },
                

    /**
     * TODO: What does this method do?
     */
    runSort: function() {
        // Sort the list
        var me = this, listitems = me.items;
        
        listitems.sort(function(a, b){ return me.doSort(0, a, b); });

        me.tbl.detach();
        // Place items and reset alternate coloring
        listitems.forEach(function(row){ row.el.appendTo(me.tbl); });
        me.tbl.appendTo(me.tblContainer);
        me.sizeCols();
    },
    
    
    /**
     * Same as Wui.Data.push() but sizes columns on the grid too.
     *
     * @param {object} [obj,...] One or more objects to be added to the end of the parent object's 
     *                           items array.
     *
     * @return The new length of the array 
     */
    push: function() {
        var retVal = Wui.Data.prototype.push.apply(this,arguments);
        
        this.sizeCols();
        
        return retVal;
    },
    

    /**
     * Same as Wui.Data.splice() but sizes columns on the grid too.
     *
     * @param  {number}    idx         Position to start making changes in the items array.
     * @param  {number}    howMany     Number of elements to remove.
     * @param  {object}    [obj,...]   One or more objects to be added to the array at position idx
     *
     * @return An array of the removed objects, or an empty array. 
    */
    splice: function() {
        var retVal = Wui.Data.prototype.splice.apply(this,arguments);
        
        this.sizeCols();
        
        return retVal;
    },
    

    /** 
     * Ensures that columns have all of the proper information. For rendering the column data, the
     * following parameter precedence is followed: dataItem > renderer > dataTemplate 
     *
     * @param   Array   cols    An array of objects containing column definitions.
     */
    setColumns: function(cols) {
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
        
        return me.getSrcData();
    },
    
    
    /**
     * TODO: What does this function do?
     */
    setData: function(){
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


    /** 
     * Size up the columns of the table to match the headings.
     * @private 
     */
    sizeCols: function (){
        var me = this, 
            hc = me.heading,
            acctForScrollBar = me.tbl.find('tr:first').height() * me.total > me.tblContainer.height(),
            sbWid = acctForScrollBar ? Wui.scrollbarWidth() : 0;

        hc.css('padding-right', sbWid);
        hc[ (sbWid === 0) ? 'addClass' : 'removeClass' ]('has-scrollbar');

        for(var i = 0; i < me.cols.length; i++)
            me.tbl.find('td:eq(' +i+ ')').css({ width: (me.cols[i].el.innerWidth() / me.tbl.width()).toFixed(2) + '%' });
    },


    /**
     * Sort the grid based on the values of one or more columns. If the grid is paging
     * then sort remotely.
     *
     * @param    {object}    Column object associated with a particular column element
    */
    sortList: function(col) {
        var me = this;
        
        me.mngSorters(col);
        me.runSort();
    }
});