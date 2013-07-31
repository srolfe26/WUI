(function($) {
	// Method which creates a Wui layout - Wui layouts are meant to be heavily CSS dependent
	Wui.layout = function(args){ $.extend(this, {targets:[]}, args); this.init(); }
	Wui.layout.prototype = $.extend(new Wui.pane(),{
		init:			function(){
							var me = this;
							me.itemsHolder = me.items;
							
							$.each(me.targets, function(i,t){ me[t.name] = t = new Wui.o(t); t.el.css('overflow','auto') });
							me.items = me.targets;
							Wui.pane.prototype.init.call(me);

						},
		onRender:		function(){
							var me = this;
							me.items = me.itemsHolder;
							$.each(me.itemsHolder,function(i,itm){
								itm.appendTo = me[itm.target].el;
							});
							me.push.apply(me,me.itemsHolder);
						}
	});
	
	
	// Method which creates a Wui Tab Pane
	Wui.tabs = function(args){ $.extend(this,args); this.init(); }
	Wui.tabs.prototype = $.extend(new Wui.pane(),{
		init:			function(){
							Wui.pane.prototype.init.call(this);
						},
		tabsBottom:		false,
		cls:			'wui-tabs',
		place:      	function(){
							var me = this;
							
							//adds the objects items if any
							if(me.items === undefined) me.items = [];
							$.each(me.items,function(idx,itm){
								itm.tabCls = 'wui-tab ' + ((itm.tabCls) ? ' ' + itm.tabCls : '');
									
								me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.button({
									text:	itm.title || 'Tab ' + (parseInt(idx) + 1),
									click:	function(){ 
												me.giveFocus(itm);
												if(itm.layout && typeof itm.layout == 'function')	itm.layout();		
											},
									cls:	itm.tabCls
								}));
								itm.cls = (itm.cls || '') + ' wui-tab-panel';
							});

							return Wui.o.prototype.place.call(me);
						},
		giveFocus:		function(tab){
							$.each(this.items,function(idx,itm){
								var isActive = itm === tab;
								itm.tab.el.toggleClass('selected', isActive);
								itm.el.toggleClass('active', isActive);
							});
						},
		onRender:		function(){
							this.giveFocus(this.items[0]);
						}
	});
	/* NEWER METHOD
	Wui.tabs = function(args){
		$.extend(this,{
			tabsBottom:false
		},args);
		this.init();
	};
	Wui.tabs.prototype = $.extend(new Wui.pane(),{
		giveFocus:		function(tab){
							$.each(this.items,function(idx,itm){
								var isActive = itm === tab;
								itm.tab.el.toggleClass('selected', isActive);
								itm.el.parent().toggleClass('active', isActive);
							});
						},
		init:			function(){
							var me = this;
							Wui.pane.prototype.init.call(me);
							me.el.addClass('wui-tabs');
							
							for(var i in me.items){
								var itm = me.items[i];
								$.extend(itm,{
									tabCls:		'wui-tab ' + ((itm.tabCls) ? itm.tabCls : ''),
									parent:		me,
								});
								
								me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.button({
									text:	itm.title || 'Tab ' + (i + 1),
									click:	function(){ 
												me.giveFocus(itm);
												if(itm.layout && typeof itm.layout == 'function')	itm.layout();		
											},
									cls:	itm.tabCls
								}));
								
								itm.el.wrap($('<div>').addClass('wui-tab-panel'));
							}
						},
		onRender:		function(){
							this.giveFocus(this.items[0]);
						}
	});*/
	
	
	// Method which creates a Wui Grid
	Wui.grid = function(args){
		$.extend(this,{
			columns: 		[],
			data:			null,
			defaultDataType:'string',
			multiSelect:	false,
			onDataLoad:		function(){},
			onDoubleClick:	function(rec){},
			onRecordSelect:	function(){},
			paging:			null,
							/*{
								limit:	page size,
								start:	0 - a very good place to start
								sort:	{dataItem:, order:}
							}*/
			remoteParams:	{},
			remoteUrl:  	null,
			selected:		[]
		},args); 
		this.init();
	};
	Wui.grid.prototype = $.extend(new Wui.pane(),{
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
									var cell = a.el.children(':eq(' +r.index+ ')').children('div'),
										val = a.rec[r.dataItem];
									cell.html(r.renderer.call(this, cell, val, a.rec, a.el));
								});
								
								// Add rows with events
								a.el.addClass((idx % 2 == 0) ? 'even' : 'odd')
								.click(function(e){
									 if(!me.multiSelect || !(e.metaKey || e.ctrlKey)){
										 me.tbl.find('.wui-selected').removeClass('wui-selected');
										 $(this).addClass('wui-selected');
										 me.selected = [a];
									 }else if(e.metaKey || e.ctrlKey){
										 var alreadySelected = $(this).hasClass('wui-selected');
										 $(this).toggleClass('wui-selected',!alreadySelected);
										 
										 if(alreadySelected)	 $.each(me.selected,function(idx,itm){ if(itm == a) me.selected.splice(idx,1) });
										 else					me.selected.push(a);
										 
										  $('html').click(); // gets rid of the outline from the HTML elements
									 }
									 me.onRecordSelect();
									 
									 return false // stops propagation & prevents default
								 })
								 .dblclick(function(e){
									 me.tbl.find('.wui-selected').removeClass('wui-selected');
									 $(this).addClass('wui-selected');
									 me.selected = [a];
									 
									 me.onDoubleClick(a.rec);
									 return false // stops propagation & prevents default
								 });
								me.tbl.append(a.el);
							});
							return source;
						},
		beforeMake:		function(){ this.makeGrid(); },
		calcColWidth:	function (){
							var tcw = 0;
							this.heading.children().each(function(){ tcw += $(this).outerWidth(); });
							return tcw;
						},
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
										compA = parseFloat(compA);
										compB = parseFloat(compB);
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
		getData:		function(){
							var me = this;
							// Set up paging parameters
							if(me.paging !== null && typeof me.paging == 'object'){
								me.isPaging = true;
								$.extend(me.remoteParams,{limit:me.paging.limit, start: me.paging.start, sort:JSON.stringify(me.paging.sort)});
							}
							
							if(!me.waiting){
								me.waiting = true;
								
								$.ajax(me.remoteUrl, {
									data:       me.remoteParams,
									dataType:	'json',
									success:	function(response){
													var retData = me.processData(response);
													me.waiting = false;
													me.data = retData.payload;
													me.total = retData.total;
													
													if(me.isPaging && me.tbl.children().length > 0){
														if(me.total > me.data.length){
															me.addRows(retData.payload);
															me.rowHeight = me.tbl.find('tr:first').outerHeight();
															me.tbl.css({top:(start * me.rowHeight) + 'px'});
															me.matchCols();
														}
													}else{
														me.beforeMake();
													}
													
													me.onDataLoad();
												}
								});
							}
						},
		getSelected:	function(){ return (this.selected.length > 0) ? this.selected : Wui.errRpt('No row selected.','Select Something');},
		init:			function(){
							var me = this;
								
							Wui.pane.prototype.init.call(me);
							me.el.addClass('wui-grid');
							
							// Define object internal variables
							me.tblContainer = $('<div><table></table></div>').addClass('grid-body');
							me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh');
							me.tbl = me.tblContainer.children('table');
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
												
											//if(me.sorters.length > 0) 
												
											$.ajax(me.remoteUrl, {
												data:       $.extend(me.remoteParams, {start:actualStart, limit:actualLimit, sort:JSON.stringify(me.paging.sort)}),
												dataType:	'json',
												success:	function(response){
																me.waiting = false;
																me.data = me.addRows(me.processData(response).payload);
																me.tbl.css({top:(actualStart * me.rowHeight) + 'px'});
																if(me.currPage != Math.floor(($(theTbl).scrollTop() + me.tblContainer.height()) / (me.totalHeight / me.totalPages))){
																	pagingScroll.call(theTbl);
																}
																me.matchCols();
																me.resetSelect();
															}
											});
										}
									}
								}
							});
							
							me.elAlias.append(me.tblContainer,me.headingContainer);
						},
		layout:			function(){
							this.posDataWin();
							this.sizeCols();
						},
		makeGrid:		function(){
							var me = this, t = '<tr>';
							
							if(typeof me.columns[0].heading === 'string'){
								$.each(me.columns,function(i,col){
									// Build template from specified columns
									if(col.dataItem && col.heading)	t += '<td><div>{' + col.dataItem + '}</div></td>';
									else						   	t += '<td><div></div></td>';
									
									if(col.renderer)	me.renderers.push({dataItem:col.dataItem, renderer:col.renderer, index:i});
									
									// Build heading and append to DOM
									$.extend(col,{
										dataType:	(col.dataType === undefined) ? me.defaultDataType : col.dataType,
										fit:		(col.fit === undefined) ? (col.width === undefined) ? 1 : 0 : col.fit,
										index:		i,
										width:		col.width === undefined ? 0 : col.width,
										heading:	$('<li>').text(col.heading).addClass('wui-gc')
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
								me.tplt = new Wui.tplt({tplt:t});
								
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
							}
							
							me.sizeCols();
						},
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
		matchCols:		function (){
							var me = this;
							$.each(me.columns,function(i,col){
								me.tbl.find('td:eq(' +i+ ')').width(col.heading.outerWidth() - 4); // 4 accounts for some crazy crap happening on the table
							});
						},
		onRender:		function (){
							var me = this;
							
							me.posDataWin();

							// Add data to grid
							if(me.data !== null)	me.beforeMake();
							else					me.getData();
						},
		posDataWin:		function(){
							var me = this,
								hh = me.headingContainer.height();
							me.heading.css({paddingRight:((me.total * me.rowHeight > me.container.height() - hh) ? Wui.scrollbarWidth() : 0) + 'px'});
							me.tblContainer.css({height:me.container.height() - hh, top:hh});
						},
		processData:	function(response){ return response; },
		refresh:		function(newData){
							if(this.remoteUrl !== null)	{ this.getData(); }
							else						{ this.data = newData; this.makeGrid(); }
						},
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
											me.tbl.find('.wui-selected').removeClass('wui-selected');
											itm.el.addClass('wui-selected');
											me.selected = [itm];
										}
									}
								});
							});

							// scroll the list to the currently selected item will make the paging wig out!
							if(!me.isPaging && me.tbl.find('.wui-selected:first').length){
								var firstSelect = me.tbl.find('.wui-selected:first'),
									ofstP = firstSelect.offsetParent();
								ofstP.animate({scrollTop:0},0);
								ofstP.animate({scrollTop: firstSelect.offset().top - ofstP.offset().top },500);
							}
						},
		sizeCols:		function(){
							var me		= this,
								tcw		= me.calcColWidth(),
								hc		= me.headingContainer.width() - ((me.total * me.rowHeight > me.tblContainer.height()) ? Wui.scrollbarWidth() : 0),
								hw		= me.heading.width(),
								fitCt	= 0,
								fixdWid = 0,
								fitMux	= 0;
							
							$.each(me.columns,function(i,col){
								fitCt += col.fit;
								fixdWid += col.width;
							});
							
							if(tcw < hw){
								if(fitCt == 0){
									fitCt	= 0;
									fixdWid = 0;
									for(var i in me.columns) {
										var col = me.columns[i]; 
										col.fit = hc / col.heading.outerWidth(); 
										col.width = 0;
										fitCt += col.fit;
										fixdWid += col.width;
									}
								}
								
								fitMux = (hc - fixdWid) / fitCt;
								for(var i in me.columns) {
									var col = me.columns[i];
									col.heading.css({width:Math.floor(col.width + (col.fit * fitMux)) - (i == me.columns.length - 1 ? 1 : 0)});
								}
							}
							me.tbl.width(me.calcColWidth());
							me.matchCols();
						},
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
