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
		
		/** Whether to put the tabs on the header or the footer. */
		tabsBottom:		false,
		
		/** Overrides Wui.place(). Creates a Wui.Button as a tab for each item. */
		place:      	function(){
							var me = this;
							
							me.el.addClass('wui-tabs');
							
							//adds the objects items if any
							if(me.items === undefined) me.items = [];
							$.each(me.items,function(idx,itm){
								itm.tabCls = 'wui-tab ' + ((itm.tabCls) ? ' ' + itm.tabCls : '');
								
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
			/** Array of items that will be added to the footer */
			bbar:   		[],
			
			/** Event hook fired before the grid columns and data are made up */
			beforeMake:		function(){},
			
			/** Array of items that will make up the columns of the grid table */
			columns: 		[],
			
			/** Array of data for the grid */
			data:			null,
			
			/** Data type the grid assumes a column will be. Matters for sorting. Other values are 'numeric' and 'date' */
			defaultDataType:'string',
			
			/** Whether multiple rows/records can be selected at once */
			multiSelect:	false,
			
			/** 
			@param {object}	rec		Data object that is the record of the double-clicked on row.
			Event hook for the double click
			*/
			onDoubleClick:	function(rec){},
			
			/**
			If paging is anything other than null, the grid will sort remotely and scroll infinitely.
			
			Example paging parameters are:
			{
				limit:	page size,
				start:	0 - a very good place to start
				sort:	{dataItem:, order:}
			}
			*/
			paging:			null,
			
			/** Whether or not to hide the column headers */
			hideHeader:		false,
			
			/** An array of the currently selected records */
			selected:		[],
			
			/** An array of items that will be added to the header */
			tbar:   		[]
		},args); 
		this.init();
	};
	Wui.Grid.prototype = $.extend(new Wui.Pane(), new Wui.Data(),{
		/** 
		@param {array}	source		Array containing the data to add rows for.
		Adds rows to the table along with event listeners and column renderers.
		*/
		addRows:		function(source){
							var me = this;
							me.tbl.items = [];
							me.tbl.children().remove();
							
							$.each(source,function(idx,dataItem){
								me.tplt.data = dataItem;
								var a = {el:me.tplt.make(), rec:dataItem, originalSrt:idx};
								me.tbl.items.push(a);
								
								// Perform renderers
								$.each(me.renderers,function(idx, r){
									var cell = a.el.children(':eq(' +r.index+ ')'),
										val = a.rec[r.dataItem];
											
									cell.children('div').html(r.renderer.call(this, cell, val, a.rec, a.el));
								});
								
								// Add rows with events
								a.el.addClass((idx % 2 == 0) ? 'even' : 'odd')
								.click(function(e){
									 if(!me.multiSelect || !(e.metaKey || e.ctrlKey)){
										 me.selectSingle($(this),a);
									 }else if(e.metaKey || e.ctrlKey){
										 var alreadySelected = $(this).hasClass('wui-selected');
										 $(this).toggleClass('wui-selected',!alreadySelected);
										 
										 if(alreadySelected)	 $.each(me.selected,function(idx,itm){ if(itm == a) me.selected.splice(idx,1) });
										 else					me.selected.push(a);
										 
										  $('html').click(); // gets rid of the outline from the HTML elements
									 }
									 me.el.trigger($.Event('select'),[me, a.el, a.rec]);
									 
									 return false // stops propagation & prevents default
								 })
								 .dblclick(function(e){
									 me.selectSingle($(this),a);
									 me.el.trigger($.Event('dblclickrecord'),[me, a.el, a.rec]);
									 return false // stops propagation & prevents default
								 });
								me.tbl.append(a.el);
							});
							return source;
						},
		
		/** 
		Calculates the width of each of the columns as they presently are.
		@private
		*/
		calcColWidth:	function (){
							var tcw = 0;
							this.heading.children().each(function(){ tcw += $(this).outerWidth(); });
							return tcw;
						},
						
		/** 
		Recursive function for sorting on multiple columns
		@param {number}	depth	Depth of the recursive call
		@param {number}	a		First item to compare
		@param {number}	b		Second item to compare
		
		@return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
		
		@private
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
								return (a.originalSrt > b.originalSrt) ? 1 : -1;
							}
						},
		/** 
		@param {string|object} params	Params to be set
		If params == 'init' then it sets up paging parameters. If params is an object then the parameters are set to the object.
		*/
		setParams:		function(params){
							var me = this;
							
							if(params == 'init'){
								// Set up paging parameters
								if(me.paging !== null && typeof me.paging == 'object'){
									me.isPaging = true;
									$.extend(me.params,{limit:me.paging.limit, start: me.paging.start, sort:JSON.stringify(me.paging.sort)});
								}
							}else if(params && typeof params === 'object'){
								$.extend(me.params,params);
							}
						},
		/** 
		Overrides an event hook on Wui.Data and makes the grid after new data is set
		*/
		afterSet:		function(){
							var me = this;
							
							if(me.isPaging && me.tbl.children().length > 0){
								if(me.total > me.data.length){
									me.addRows(retData.payload);
									me.rowHeight = me.tbl.find('tr:first').outerHeight();
									me.tbl.css({top:(start * me.rowHeight) + 'px'});
									me.matchCols();
								}
							}else{
								me.makeGrid();
							}
						},
		/** 
		@returns Returns the currently selected row or rows
		
		If there is no row selected, a Wui.errRpt will display a 'No row selected.' message to the user.
		*/
		getSelected:	function(){ return (this.selected.length > 0) ? this.selected : Wui.errRpt('No row selected.','Select Something');},
		
		/** 
		Method that will run immediately when the object is constructed. Creates necessary 
		DOM elements for the grid. Establishes whether the grid is remote or local, paging
		or not. */
		init:			function(){
							var me = this;
								
							Wui.Pane.prototype.init.call(me);
							me.el.addClass('wui-grid');
							
							// Define object internal variables
							me.tblContainer = $('<div><div>&nbsp;</div><table></table></div>').addClass('grid-body');
							me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh');
							me.tbl = me.tblContainer.children('table');
							me.tblHSize = me.tblContainer.children('div');
							me.tblHSize.addClass('wui-ghs');
							me.heading = me.headingContainer.children('ul');
							me.sorters = [];
							me.renderers = [];
							
							//Add listeners to table
							me.tblContainer
							.scroll(function(){
								me.headingContainer.scrollLeft($(this).scrollLeft());
								
								// paging scrolling
								if(me.isPaging)
									pagingScroll.call(this);
								
								function pagingScroll(){
									var theTbl	= $(this),
										top		= theTbl.scrollTop(),
										page	= Math.floor(top / (me.totalHeight / me.totalPages));
									
									me.currPage = me.currPage || 0;
									me.lastScroll = top;
									
									if(me.currPage != page){
										if(!me.waiting){
											me.paging.start = page * me.paging.limit;
											me.currPage = page;
											me.waiting = true;
											
											var actualStart = page * me.paging.limit + ((page != 0) ? -1 * Math.round(me.paging.limit / 2) : 0),
												actualLimit = (me.paging.limit * 3 < 100) ? me.paging.limit * 3 : 100;
											
											
											// Hijack the onSuccess fn to do something different for paging
											var currentOnSuccess = me.onSuccess;
											me.onSuccess = function(){
												var me = this;
												
												me.tbl.css({top:(actualStart * me.rowHeight) + 'px'});
												if(me.currPage != Math.floor(($(theTbl).scrollTop() + me.tblContainer.height()) / (me.totalHeight / me.totalPages))){
													pagingScroll.call(theTbl);
												}
												me.matchCols();
												me.resetSelect();
												
												currentOnSuccess();
												me.onSuccess = currentOnSuccess;
											};
											me.loadData({start:actualStart, limit:actualLimit, sort:JSON.stringify(me.paging.sort)});
										}
									}
								}
							});
							
							me.elAlias.append(me.tblContainer,me.headingContainer);
							if(me.hideHeader)	me.headingContainer.height(0);
						},
		
		/** 
		Overrides the Wui.O layout function and positions the data and sizes the columns.
		*/
		layout:			function(){
							Wui.O.prototype.layout.call(this);
							this.posDataWin();
							this.sizeCols();
						},
						
		/** 
		Builds the headings if they don't exist, calls addRows() and sizeCols()
		@private
		*/
		makeGrid:		function(){
							var me = this, t = '<tr>';
							
							me.beforeMake();
							
							if(me.columns[0] && typeof me.columns[0].heading === 'string'){
								me.heading.html('');
								me.renderers = [];
								$.each(me.columns,function(i,col){
									// Build template from specified columns
									if(col.dataItem && col.heading)	t += '<td><div>{' + col.dataItem + '}</div></td>';
									else						   	t += '<td><div></div></td>';
									
									// Handles renderer if it exists
									if(col.renderer){
										if(typeof col.renderer == 'function'){
											me.renderers.push({dataItem:col.dataItem, renderer:col.renderer, index:i});
										}else if(eval('typeof ' + col.renderer) == 'function'){
											var funcFromString = new Function('return ' + col.renderer + '.apply(this,arguments)');
											me.renderers.push({dataItem:col.dataItem, renderer:funcFromString, index:i});
										}
									}									
									
									// Build heading and append to DOM
									$.extend(col,{
										dataType:	(col.dataType === undefined) ? me.defaultDataType : col.dataType,
										fit:		(col.fit === undefined) ? (col.width === undefined) ? 1 : 0 : col.fit,
										index:		i,
										width:		col.width === undefined ? 0 : col.width,
										heading:	$('<li>').text(col.heading)
													.attr({unselectable:'on'})
													.addClass('wui-gc')
													.resizable({
														handles:	'e',
														resize:		function(event,ui){
																		me.heading.css({
																			paddingRight:((me.total * me.rowHeight > me.tblContainer.height()) ? Wui.scrollbarWidth() : 0) + 'px',
																			width:me.calcColWidth() + 'px'
																		});
																		
																		for(var i in me.columns){
																			if(me.columns[i].heading[0] === ui.originalElement[0])
																				$.extend(me.columns[i],{
																					width:	ui.size.width,
																					fit:	0
																				});
																		}
																	},
														minHeight:	28,
														stop:		function(event,ui){ me.sizeCols(); }
													})
													.click(function(){
														me.sortList(col);
														me.matchCols();
													})
									});
									me.heading.append(col.heading);
								});
								
								// finish up template
								t += '</tr>';
								me.tplt = new Wui.Template({template:t});
							}
							
							me.addRows(me.data);
							me.rowHeight = me.tbl.find('tr:first').outerHeight();
						
							// If paging add spacing to account for pages you're not on
							if(me.isPaging === true){
								if(me.total > me.data.length){
									me.totalHeight = me.total * me.rowHeight;
									me.totalPages = Math.floor(me.total/me.paging.limit);
									me.tbl.wrap(me.pagingPadBefore = $('<div>').height(me.totalHeight).addClass('wui-paging-pad'));
									
									$.each(me.paging.sort,function(idx,itm){
										$.each(me.columns,function(i,col){
											if(col.dataItem === itm.dataItem) me.mngSorters(col,itm.order);
										});
									});
								}
							}

							me.sizeCols();
						},
		/** 
		@param	{object}	col	An object containing the sort direction and DOM element of the heading
		#param	{string}	dir	The direction of the sort
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
										col.heading.removeClass().addClass('wui-gc');
										
										$.each(me.sorters,function(i,itm){
											if(itm == col)	me.sorters.splice(i,1);
										});
									}else{
										col.sortDir = 'desc';
									}
								}else{
									// Can't sort on more than 5 columns
									if(me.sorters.length > 5){
										col.heading.removeClass().addClass('wui-gc');
										return false;
									}
									
									col.sortDir = 'asc';
									me.sorters.push(col);
								}
							}
							
							// Add/remove classes to indicate to the user what is being sorted and take care of paging
							if(me.isPaging)
								me.paging.sort = [];
								
							$.each(me.sorters,function(i,itm){
								itm.heading.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir);
								
								if(me.isPaging)
									me.paging.sort.push({dataItem:itm.dataItem, order:itm.sortDir});
							});
						},
		
		/** 
		Size up the columns of the table to match the headings
		@private
		*/
		matchCols:		function (){
							var me = this;
							$.each(me.columns,function(i,col){
								me.tbl.find('td:eq(' +i+ ')').width($(col.heading).outerWidth() - 2.8); // 2 accounts for borders
							});
						},
						
		/** 
		Runs posDataWin() and starts the rendering of the data.
		*/
		onRender:		function (){
							var me = this;
							
							me.posDataWin();
							
							// Add data to grid
							if(me.data !== null)	me.setData(me.data);
							else					me.loadData('init');
						},
		
		/** 
		Positions the height and width of the data table's container
		@private
		*/
		posDataWin:		function(){
							var me = this,
								hh = me.headingContainer.height();
							me.heading.css({paddingRight:((me.total * me.rowHeight > me.container.height() - hh) ? Wui.scrollbarWidth() : 0) + 'px'});
							me.tblContainer.css({height:me.container.height() - hh, top:hh});
						},
		
		/**  Refresh the data in the grid */
		refresh:		function(newData){
							if(newData)	me.setData(newData);
							else		this.loadData();
						},
						
		/**  Reselects previously selected rows after a data change or sort. Scrolls to the first currently selected row. */
		resetSelect:	function(){
							var me = this,
								selList = me.selected;
								
							me.selected = [];
							
							$.each(selList,function(i,sel){
								$.each(me.tbl.items,function(i,itm){
									if(JSON.stringify(itm.rec) === JSON.stringify(sel.rec)){
										if(me.multiSelect){
											itm.el.addClass('wui-selected');
											me.selected.push(itm);
										}else{
											me.selectSingle(itm.el,itm);
										}
									}
								});
							});

							me.scrollToCurrent();
						},
						
		/** Scroll the list to the currently selected item will make the paging wig out! */				
		scrollToCurrent:function(){
							var me = this;
							
							if(!me.isPaging && me.tbl.find('.wui-selected:first').length){
								var firstSelect = me.tbl.find('.wui-selected:first'),
									ofstP = firstSelect.offsetParent();
								ofstP.animate({scrollTop:0},0);
								ofstP.animate({scrollTop: firstSelect.offset().top - ofstP.offset().top },500);
							}
						},		
						
		/**  Selects an item on the grid according to a key value pair to be found in a record */
		selectItem:		function(kvp){
							var me = this,
								key = null,
								val = null;
							
							// get the key and value
							for(var i in kvp)	{ key = i; val = kvp[i]; }
							
							// select the item if it exists
							for(var a in me.tbl.items){
								if(me.tbl.items[a].rec[key] && me.tbl.items[a].rec[key] == val){
									me.selectSingle(me.tbl.items[a].el,me.tbl.items[a]);
									me.el.trigger($.Event('select'),[me, me.tbl.items[a].el, me.tbl.items[a].rec]);
									break;
								}
							}
						},
						
		/** 
		@param {object}	jQuery object containing the DOM element of the row
		@param {object}	Data object of the selected row
		Selects a single item. */
		selectSingle:	function(row,data){
							this.tbl.find('.wui-selected').removeClass('wui-selected');
							row.addClass('wui-selected');
							this.selected = [data];
						},
		
		/** Size columns according to the size of the grid and the columns fit and width values */
		sizeCols:		function(){
							if(typeof this.columns[0].heading !== 'string'){
								var me		= this,
									tcw		= me.calcColWidth(),
									scrollbarWidth = (me.total * me.rowHeight > me.tblContainer.height()) ? Wui.scrollbarWidth() : 0,
									hc		= me.headingContainer.width() - scrollbarWidth,
									hw		= me.heading.width(),
									fitCt	= 0,
									fixdWid = 0,
									fitMux	= 0;

								$.each(me.columns,function(i,col){
									fitCt += col.fit;
									fixdWid += col.width;
								});
							
								var sizeNow = (tcw < hw && fixdWid < hw);
								if(sizeNow){
									if(fitCt == 0){
										fixdWid = 0;
										for(var i in me.columns) {
											var col = me.columns[i]; 
											col.fit = hc / (col.width != 0 ? col.width : $(col.heading).width()); 
											col.width = 0;
											fitCt += col.fit;
											fixdWid += col.width;
										}
									}
								}
								
								fitMux = (fitCt != 0) ? (sizeNow) ? (hc - fixdWid) / fitCt : (hw - fixdWid) / fitCt : 0;
								for(var i in me.columns) {
									var col = me.columns[i];
									$(col.heading).css({width:Math.floor(col.width + (col.fit * fitMux)) - (i == me.columns.length - 1 ? 1 : 0)});
								}
								
								var newColWid = me.calcColWidth();
								me.heading.width(newColWid + scrollbarWidth);
								me.tbl.width(newColWid);
								me.tblHSize.width(newColWid);
								me.matchCols();
							}
						},
		
		/**
		@param	{object}	Column object associated with a particular column element
		Sort the grid based on the values of one or more columns. If the grid is paging
		then sort remotely.
		*/
		sortList:		function(col) {
							var me = this;
							
							me.mngSorters(col);
							
							// If paging then do the sorting on the server
							if(me.isPaging === true){
								me.currPage = -1;
								me.tbl.scroll();
							}else{
								// Sort the list
								var listitems = me.tbl.items;
								listitems.sort(function(a, b){ return me.doSort(0, a, b); });
		
								var holding = $('<div>');
								// Place items and reset alternate coloring
								$.each(listitems, function(idx, row) { 
									holding.append(row.el.removeClass().addClass((idx % 2 == 0) ? 'even' : 'odd'));
								});
								me.tbl.prepend(holding.children().unwrap());
								me.resetSelect();
							}
						}
	});
}(jQuery));
