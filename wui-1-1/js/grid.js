(function($) {
	/** 
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
	
	Creates a Wui layout - Wui layouts are meant to be heavily CSS dependent 
	by defining objects with names that the WUI can use, but leaving all styles
	to the CSS, unlike simply using Wui.fit().
	
	Child items in a Wui.Layout must have an attribute 'target' with a name of
	one of the objects in the targets array.
	*/
	Wui.Layout = function(args){ 
		$.extend(this, {
			/** An array of items that will be added to the footer */
			bbar:   [],
			
			/** An array of named items with CSS properties defined */
			targets:[],
			
			/** An array of items that will be added to the header */
			tbar:   []
		}, args); 
		this.init(); 
	}
	Wui.Layout.prototype = $.extend(new Wui.Pane(),{
		/** Method that will run immediately when the object is constructed. Lays out targets.*/
		init:			function(){
							var me = this;
							me.itemsHolder = me.items;
							
							$.each(me.targets, function(i,t){ me[t.name] = t = new Wui.O(t); t.el.css('overflow','auto') });
							me.items = me.targets;
							Wui.Pane.prototype.init.call(me);

						},
		
		/** Appends items to targets */
		onRender:		function(){
							var me = this;
							me.items = me.itemsHolder;
							$.each(me.itemsHolder,function(i,itm){
								itm.appendTo = me[itm.target].el;
							});
							me.push.apply(me,me.itemsHolder);
						}
	});
	
	
	/** 
	@event		tabchange When a tab changes (tab pane, tab button, tab item)
	
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
	
	Tab pane
	*/
	Wui.Tabs = function(args){ 
		$.extend(this,{
			/** An array of items that will be added to the footer */
			bbar:   [],
			
			/** An array of items that will be added to the content */
			items:	[],
			
			/** Tabs default to the right side of the pane unless this is true. */
			tabsLeft:	false,
			
			/** A place holder for the currently selected tab. */
			currentTab:	null,
			
			/** Whether to put the tabs on the header or the footer. */
			tabsBottom:		false,
			
			/** Config to place on child items of WUI tabs to make their heading not show up */
			tabsHideHeader: null,
			
			/** An array of items that will be added to the header */
			tbar:	[]
		},args); 
		this.init();
	}
	Wui.Tabs.prototype = $.extend(new Wui.Pane(),{
		/** Method that will run immediately when the object is constructed. Lays out targets. */
		init:			function(){
							if(this.title === null)	this.title = '';
							Wui.Pane.prototype.init.call(this);
						},
		
		/** Overrides Wui.place(). Creates a Wui.Button as a tab for each item. */
		place:      	function(){
							var me = this;
							
							me.el.addClass('wui-tabs');
							
							//adds the objects items if any
							if(me.items === undefined) me.items = [];
							$.each(me.items,function(idx,itm){
								itm.tabCls =	'wui-tab ' +
												((itm.tabCls) ? ' ' + itm.tabCls : '') +
												((me.tabsLeft) ? ' left' : '');
								
								if(itm.tabsHideHeader){
									itm.el.css({borderTopWidth:itm.el.css('border-left-width')});
									itm.el.addClass('wui-hide-heading');
								}
								
								me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.Button({
									text:	itm.title || 'Tab ' + (parseInt(idx) + 1),
									click:	function(){ 
												me.giveFocus(itm);
												if(itm.layout && typeof itm.layout === 'function')	itm.layout();
											},
									cls:	itm.tabCls
								}));
								if(me.bbar.length != 0) me.placeFooter();
							});
							
							return Wui.O.prototype.place.call(me, function(m){ $.each(m.items,function(i,itm){ itm.el.addClass('wui-tab-panel'); }); }); //.wrap($('<div>')
						},
		
		/** 
		@param {object} itm A WUI Object that will be matched in the items array. 
		@param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
		
		Sets the specified tab to active. Runs layout on the newly activated item.
		*/
		giveFocus:		function(tab, supressEvent){
							var me = this, supressEvent = (supressEvent !== undefined) ? supressEvent : false;
							
							$.each(me.items,function(idx,itm){
								var isActive = itm === tab;
								itm.tab.el.toggleClass('selected', isActive);
								itm.el.toggleClass('active', isActive);
								if(isActive){
									me.currentTab = itm;
									itm.layout();
								}
								if(!supressEvent && isActive)
									me.el.trigger($.Event('tabchange'),[me, itm.tab, itm]);
							});
						},
		
		/** 
		@param {string} txt The text of the tab button
		@param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
		@return The tab that was selected or undefined if the text didn't match any tabs
		
		Gives focus to the tab with text that matches the value of txt. Strings with underscores
		are converted to spaces (eg. 'conferences_detail' = 'conferences detail')
		*/
		selectTabByText:function(txt, supressEvent){
							var me = this, retVal = undefined;
							$.each(me.items,function(idx,itm){
								if($.trim(itm.tab.text).toLowerCase() === $.trim(txt).toLowerCase().replace(/_/g,' ')){
									me.giveFocus(itm, supressEvent);
									retVal = itm;
								}
							});
							return retVal;
						},
		onRender:		function(){
							this.giveFocus(this.items[0]);
						}
	});
	
	
	/** 
	@event		select 			When a record is clicked (grid, row el, record)
	@event		dblclickrecord 	When a record is  double clicked clicked (grid, row el, record)
	
	
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
	
	The grid pane provides table-like functionality for data sets. Grids can be populated remotely
	or have their data locally defined. Grids also support infinite scrolling by defining paging
	parameters. Columns for the grid are defined in an array and with the following options:
	
	heading		- The title of the column heading
	cls			- A special class to add to the column
	vertical	- Makes the column text oriented vertical and the column height at 150px
	dataType	- The type of data used in the column (used for sorting)
	dataItem	- The item in the record that correlates to this column
	width		- A pixel value for the width of the column
	fit			- A numeric indicator of the relative size of the column
	
	Custom renderers can be applied to columns.  These renderers are defined as function that can
	either be defined in the column definition, or defined elsewhere in scope and simply named by
	a string. The rendering function is defined passed the following parameters as below:
	
	renderer: function(grid, cell, value, record, row){}
	
	Grids can be sorted by clicking on the headings of columns. Headings sort ascending on the first click, 
	descending on the second and revert to their 'unsorted' order on the third.Sorting on multiple columns 
	is possible with the a number indicating the precedence of the sort and an arrow for the direction of the sort 
	appearing on the right side of the column heading.
	
	Columns can be resized by dragging the heading borders left and right. Columns can be sized to 
	extend beyond the width of the grid frame, but when sized smaller will pop back into position.
	
	While not using Wui.fit(), the same principles apply in the sizing of elements, although percentage
	values are not supported at this time.
	*/
	Wui.Grid = function(args){
		$.extend(this,{
			/** Array of items that will be added to the footer. */
			bbar:   		[],
			
			/** Array of items that will make up the columns of the grid table. */
			columns: 		[],
			
			/** URL to get columns if its a dynamic grid */
			colUrl:			null,
			
			/** Params to pass for columns on a dynamic grid */
			colParams:		{},
			
			/** Array of data for the grid. */
			data:			null,
			
			/** Data type the grid assumes a column will be. Matters for sorting. Other values are 'numeric' and 'date' */
			defaultDataType:'string',
			
			/** Whether multiple rows/records can be selected at once. */
			multiSelect:	false,
			
			/** Whether or not to hide the column headers */
			hideHeader:		false,
			
			/** An array of the currently selected records */
			selected:		[],
			
			/** An array of items that will be added to the header */
			tbar:   		[]
		},args); 
		this.init();
	};
	Wui.Grid.prototype = $.extend(new Wui.Pane(), new Wui.DataList(),{
		init:		function(){
						var me = this;
						
						// Give the grid a load mask
						me.disabled = true;
						
						// Set up container
						Wui.Pane.prototype.init.call(me);
						me.el.addClass('wui-grid');
						
						// Add grid specific DOM elements and reset elAlias
						me.tblContainer = $('<div><table></table></div>').addClass('grid-body').appendTo(me.elAlias);
						me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh').appendTo(me.elAlias);
						me.elAlias = me.tbl = me.tblContainer.children('table');
						me.heading = me.headingContainer.children('ul');
						
						// columns and sorting on multiple columns
						me.cols = [];
						me.sorters = [];
						
						// hide the header
						if(me.hideHeader)	me.headingContainer.height(0);
					},
		
		/** Overrides Wui.Pane.disable() This disable simply disables the grid, not the header and footer. 
		Use the Wui.Pane.prototype.disable.call(this) to disable the header and footer. */
		disable:		function(){
							this.disabled = true;
							// cover pane contents
							this.mask = this.container.clone().html(this.maskHTML).addClass('wui-mask').appendTo(this.container.parent());
						},
		
		/** Verify that columns have been defined on the grid, or that they are available remotely */
		getColumns: function(){
						var me = this;
						
						if(me.colUrl && me.colUrl.length){
							// Make remote call for columns
							me.colProxy = new Wui.Data({url:me.colUrl, params:me.colParams, afterSet:function(r){ me.setColumns(r); } });
							me.colProxy.loadData();
						}else if(me.columns.length){
							// Check for locally defined columns
							me.setColumns(me.columns);
						}else{
							//throw('There are no columns defined for this WUI Grid.');
						}
							
					},
		
		/** Fill in gaps in the column definition and append to the cols array. The cols array is what the grid uses to 
		render/reference columns. The append the column to the DOM */			
		renderColumn:function(col,idx){
						var me = this;
						
						me.cols.push(
							$.extend(col,{
								dataType:	col.dataType || me.defaultDataType,
								fit:		(col.fit === undefined) ? (col.width === undefined) ? 1 : 0 : col.fit,
								cls:		col.cls || '',
								renderer:	(col.renderer) ?	(function(a){
																	// Handles renderer if it exists
																	if(typeof a !== 'function' && eval('typeof ' + a) == 'function')
																		a = new Function('return ' + a + '.apply(this,arguments)');
																	if(typeof a === 'function')
																		me.renderers.push({dataItem:col.dataItem, renderer:a, index:idx});
																})(col.renderer) : '',
								index:		idx,
								width:		col.width === undefined ? 0 : col.width,
								el:			$('<li>')
											.append($('<div>').text(col.heading))
											.attr({unselectable:'on'})
											.addClass('wui-gc ' + col.cls)
											.resizable({
												handles:	'e',
												stop:	function(){me.sizeCols();},
												resize: function(event,ui){
															col.width = ui.size.width;
															col.fit = 0;
															Wui.fit(me.cols,'width',(me.tbl.find('tr:first').height() * (me.total + 1) > me.tblContainer.height()));
														},
											})
											.click(function(){ me.sortList(col); })
							})
						);
						
						// Append newly created el to the DOM
						me.heading.append(col.el);
					},
		
		/** Ensures that columns have all of the proper information */
		setColumns: function(cols){
						var me = this;
						
						// clear column list
						me.columns = cols;
						me.heading.empty();
						me.cols = [];
						me.items = [];
						me.renderers = [];
						
						// clear template
						me.template = '<tr class="{((wuiIndex % 2 == 0) ? \'even\' : \'odd\')}">';
						
						// apply columns on grid
						$.each(cols,function(i,col){
							// Add to the template string based on column info
							me.template += '<td><div>' +((col.dataItem) ? '{' +col.dataItem+ '}' : '')+ '</div></td>';
							
							// Deal with vertical columns - forces them to be 48px wide
							if(col.vertical){
								me.el.addClass('has-vert-columns');
								if(col.cls)	col.cls += ' vert-col';
								else		col.cls = 'vert-col';
								
								col.width = 50;
								delete col.fit;
							}
							
							// Add column to cols array
							me.renderColumn(col,i);
						});
						
						// finish template
						me.template += '</tr>';
						
						if(me.autoLoad){
							if(me.url === null)	me.make();
							else				me.loadData();
						}
					},
		loadData:	function(){
						this.setMaskHTML('Loading <span class="wui-spinner"></span>');
						if(!this.disabled)	this.disable();
						Wui.DataList.prototype.loadData.apply(this,arguments);
					},			
		onRender:	function(){
						// Store the real value of autoLoad, but set it to false so that the grid waits for the columns
						// before loading data.
						var me = this, al = me.autoLoad;
						me.autoLoad = false;
						
						//Wui.Pane.prototype.onRender.call(this);
						Wui.DataList.prototype.onRender.call(this);
						
						// Start with getting the columns - Many methods waterfall from here
						me.autoLoad = al;
						this.getColumns();
					},
		
		
		/** Overrides the Wui.O layout function and positions the data and sizes the columns. */
		layout:			function(){
							Wui.O.prototype.layout.call(this);
							this.posDataWin();
							if(this.cols.length)
								this.sizeCols();
						},
						
		modifyItem:	function(itm){
						var me = this;
						// Perform renderers (if any)
						$.each(me.renderers,function(idx, r){
							var cell = itm.el.children(':eq(' +r.index+ ')').children('div'),
								val = itm.rec[r.dataItem];
							
							
							cell.empty().append(r.renderer.call(null, cell, val, itm.rec, itm.el));
						});
						return itm.el;
					},
		
		afterMake:	function(){
						this.sizeCols();
						this.enable();
					},
		
		/** Size up the columns of the table to match the headings @private */
		sizeCols:		function (){
							var me = this;
							Wui.fit(me.cols,'width',(me.tbl.find('tr:first').height() * (me.total + 1) > me.tblContainer.height()));
							me.tbl.css({width:'1px'});
							for(var i = 0; i < me.cols.length; i++){
								me.tbl.find('td:eq(' +i+ ')').css({width:me.cols[i].el.outerWidth()}); // account for table borders
							}
						},
		refresh:		function(){
							this.disable();
							if(this.url === null)	this.make();
							else					this.getColumns();
						},		
		/** Positions the height and width of the data table's container @private */
		posDataWin:		function(){
							var hh = this.headingContainer.height() - 1;
							this.tblContainer.css({height:this.container.height() - hh, top:hh});
						},
		
		/** 
		@param	{object}	col	An object containing the sort direction and DOM element of the heading
		@param	{string}	dir	The direction of the sort
		Manages the sorters for the grid by keeping them in an array. 
		*/
		mngSorters:		function(col,dir){
							var me = this,
								sortClasses = ['one','two','three','four','five'];
							if(dir !== undefined){
								col.sortDir = dir;
								me.sorters.push(col);
							}else{
								if(col.sortDir){
									if(col.sortDir == 'desc'){
										delete col.sortDir;
										col.el.removeClass().addClass('wui-gc').addClass(col.cls);
										
										$.each(me.sorters,function(i,itm){
											if(itm == col)	me.sorters.splice(i,1);
										});
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
								
							$.each(me.sorters,function(i,itm){
								itm.el.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir).addClass(itm.cls);
							});
						},
						
		/**
		@param	{object}	Column object associated with a particular column element
		Sort the grid based on the values of one or more columns. If the grid is paging
		then sort remotely.
		*/
		sortList:		function(col) {
							var me = this;
							
							me.mngSorters(col);
							
							// Sort the list
							var listitems = me.items;
							listitems.sort(function(a, b){ return me.doSort(0, a, b); });
	
							me.tbl.detach();
							// Place items and reset alternate coloring
							$.each(listitems, function(idx, row) { 
								var isEven = idx % 2 == 0;
								row.el.toggleClass('even',isEven).toggleClass('odd',!isEven).appendTo(me.tbl);
							});
							me.tbl.appendTo(me.tblContainer);

							me.sizeCols();
							me.resetSelect();
						},
						
		/** 
		Recursive function for sorting on multiple columns @private
		@param {number}	depth	Depth of the recursive call
		@param {number}	a		First item to compare
		@param {number}	b		Second item to compare
		
		@return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
		*/
		doSort:			function(depth,a,b){
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
								
								if(compare != 0 || me.sorters[depth + 1] === undefined)	return compare * srtVal;
								else													return me.doSort(depth + 1,a,b);
							}else{
								return (a.rec.wuiIndex > b.rec.wuiIndex) ? 1 : -1;
							}
						},
	});
}(jQuery));
