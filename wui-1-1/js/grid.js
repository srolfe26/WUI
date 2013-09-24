(function($) {
	// Method which creates a Wui layout - Wui layouts are meant to be heavily CSS dependent
	Wui.Layout = function(args){ 
		$.extend(this, {
			bbar:   [],
			targets:[],
			tbar:   []
		}, args); 
		this.init(); 
	}
	Wui.Layout.prototype = $.extend(new Wui.Pane(),{
		init:			function(){
							var me = this;
							me.itemsHolder = me.items;
							
							$.each(me.targets, function(i,t){ me[t.name] = t = new Wui.O(t); t.el.css('overflow','auto') });
							me.items = me.targets;
							Wui.Pane.prototype.init.call(me);

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
	Wui.Tabs = function(args){ 
		$.extend(this,{
			bbar:   [],
			items:	[],
			tbar:	[]
		},args); 
		this.init();
	}
	Wui.Tabs.prototype = $.extend(new Wui.Pane(),{
		init:			function(){
							Wui.Pane.prototype.init.call(this);
						},
		tabsBottom:		false,
		place:      	function(){
							var me = this;
							
							me.el.addClass('wui-tabs');
							
							//adds the objects items if any
							if(me.items === undefined) me.items = [];
							$.each(me.items,function(idx,itm){
								itm.tabCls = 'wui-tab ' + ((itm.tabCls) ? ' ' + itm.tabCls : '');
									
								me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.Button({
									text:	itm.title || 'Tab ' + (parseInt(idx) + 1),
									click:	function(){ 
												me.giveFocus(itm);
												if(itm.layout && typeof itm.layout == 'function')	itm.layout();		
											},
									cls:	itm.tabCls
								}));
							});
							
							return Wui.O.prototype.place.call(me, function(m){ $.each(m.items,function(i,itm){ itm.el.addClass('wui-tab-panel'); }); }); //.wrap($('<div>')
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
	
	
	// Method which creates a Wui Grid
	Wui.Grid = function(args){
		$.extend(this,{
			bbar:   		[],
			beforeMake:		function(){},
			columns: 		[],
			data:			null,
			defaultDataType:'string',
			multiSelect:	false,
			onDoubleClick:	function(rec){},
			// me.el.trigger($.Event('deselect'),[me, a.el, a.rec]);
			paging:			null,
							/*{
								limit:	page size,
								start:	0 - a very good place to start
								sort:	{dataItem:, order:}
							}*/
			hideHeader:		false,
			selected:		[],
			tbar:   		[]
		},args); 
		this.init();
	};
	Wui.Grid.prototype = $.extend(new Wui.Pane(), new Wui.Data(),{
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
									 me.el.trigger($.Event('recordclick'),[me, a.el, a.rec]);
									 
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
		getSelected:	function(){ return (this.selected.length > 0) ? this.selected : Wui.errRpt('No row selected.','Select Something');},
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
		layout:			function(){
							this.posDataWin();
							this.sizeCols();
						},
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
								me.tbl.find('td:eq(' +i+ ')').width(col.heading.outerWidth() - 2.5); // 2 accounts for borders
							});
						},
		onRender:		function (){
							var me = this;
							
							me.posDataWin();
							
							// Add data to grid
							if(me.data !== null)	me.setData(me.data);
							else					me.loadData('init');
						},
		posDataWin:		function(){
							var me = this,
								hh = me.headingContainer.height();
							me.heading.css({paddingRight:((me.total * me.rowHeight > me.container.height() - hh) ? Wui.scrollbarWidth() : 0) + 'px'});
							me.tblContainer.css({height:me.container.height() - hh, top:hh});
						},
		refresh:		function(newData){
							if(newData)	me.setData(newData);
							else		this.loadData();
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
											me.selectSingle(itm.el,itm);
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
									me.el.trigger($.Event('recordselected'),[me, me.tbl.items[a].el, me.tbl.items[a].rec]);
									break;
								}
							}
						},
		selectSingle:	function(row,data){
							this.tbl.find('.wui-selected').removeClass('wui-selected');
							row.addClass('wui-selected');
							this.selected = [data];
						},
		sizeCols:		function(){
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
										col.fit = hc / (col.width != 0 ? col.width : col.heading.width()); 
										col.width = 0;
										fitCt += col.fit;
										fixdWid += col.width;
									}
								}
							}
							
							fitMux = (fitCt != 0) ? (sizeNow) ? (hc - fixdWid) / fitCt : (hw - fixdWid) / fitCt : 0;
							for(var i in me.columns) {
								var col = me.columns[i];
								col.heading.css({width:Math.floor(col.width + (col.fit * fitMux)) - (i == me.columns.length - 1 ? 1 : 0)});
							}
							
							var newColWid = me.calcColWidth();
							me.heading.width(newColWid + scrollbarWidth);
							me.tbl.width(newColWid);
							me.tblHSize.width(newColWid);
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
