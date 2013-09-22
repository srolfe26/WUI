/**
* Avoid 'console' errors in browsers that lack a console by defining a variable named console.
* For example, when using console.log() on a browser that does not have a console, execution of code
* will continue because the console variable is defined. 
*/
(function() {
    var method;
    var n = function(){};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        if (!console[method]) { console[method] = n; }    // Only stub undefined methods.
    }
}());


/** Make sure the WUI is defined */
var Wui = Wui || {};

(function($,window) {
	/** AJAX error reporting and caching */
	$.ajaxSetup({ 
		cache:	false,
		error:	function(response){
						console.log(response);
						try{		var err = $.parseJSON( response.responseText ); }
						catch(e){	var err = {fatalError:'Aw Snap! There was a problem talking to the server.'}; }
						if(err != null)
							Wui.errRpt(err.fatalError);
					}
	});
	
	
	Wui.isNumeric = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	
	Wui.scrollbarWidth = function() {
	  var parent, child, width;
	
	  if(width===undefined) {
	    parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
	    child=parent.children();
	    width=child.innerWidth()-child.height(99).innerWidth();
	    parent.remove();
	  }
	
	 return width;
	};
	
	
	Wui.randNum = function(lower,upper) {
	    upper = upper - lower + 1 ;
	    return ( lower + Math.floor(Math.random() * upper) );
	}
	
	
	Wui.maxZ = function(){
	    return Math.max.apply(null, 
	            $.map($('body > *'), function(e,n) {
	                if ($(e).css('position') != 'static')
	                  return parseInt($(e).css('z-index')) || 1;
	            })
	        );
	};
	
	
	Wui.fit = function(collection){
		var dim = (arguments[1] && typeof arguments[1] === 'string') ? arguments[1].toLowerCase() : 'height'; // Direction ['height','width']
		
		// Ensure the collection is an array of Wui Objects
		if(collection instanceof Array && collection.length > 0 && collection[0] instanceof Wui.O){
			var parent		= (collection[0].parent) ? collection[0].parent : collection[0].el.parent(),
				parentEl	= (parent.el) ? (parent.elAlias || parent.el) : parent,
				parentSize	= (($(parentEl)[0] === $('body')) ? $(window) : $(parentEl))[dim](),
				fitCt		= 0,
				fixedSize 	= 0,
				fitMux		= 0;
			
			// Tally all sizes we're dealing with
			$.each(collection,function(i,itm){
				if(itm[dim]){
					// Tally fixed size values & percentage based size values
					// Doing this gives percentages precendence over fit
					if(Wui.isNumeric(itm[dim]))	{ fixedSize += itm[dim]; }
					else						{
												  var itmDimension = Math.floor((parseFloat(itm[dim]) / 100) * parentSize);
												  fixedSize += (itm[dim] = itmDimension);
												}
					delete itm.fit;			// Ensure the item doesn't have a dimension and a fit specified
				}else if(itm.fit){
					fitCt += itm.fit; 		// Tally fit values
				}else{
					fitCt += (itm.fit = 1); // Add a fit value to an item that doesn't have dimensions specified
				}
			});
			
			// Get the fit multiplier
			fitMux = (fitCt !== 0) ? (parentSize - fixedSize) / fitCt : 0;
			
			// Size 'fit' items
			$.each(collection,function(i,itm){
				var css = {};
				if(itm.fit){
					css[dim] = fitMux * itm.fit;
					$(itm.el).css(css);
				}
			});
		}else{
			throw('Improper collection specified');
		}
	};
	
	
	/** The basic WUI object */
	Wui.O = function(args){ $.extend(this,args); };
	Wui.O.prototype = {
		addToDOM:	function(obj, tgt, act){
						// Take the target and action from the passed object first if defined, then default to passed arguments, 
						// then to a default of $('body') and 'append'
						var target 	= (obj.appendTo !== undefined) ? obj.appendTo :
										(obj.prependTo !== undefined) ? obj.prependTo :
											(tgt !== undefined && tgt !== null) ? tgt : 
												(obj.parent !== undefined && obj.parent.elAlias !== undefined) ? obj.parent.elAlias :
													(obj.parent !== undefined && obj.parent.el !== undefined) ? obj.parent.el : $('body'),
							action 	= (obj.appendTo !== undefined) ? 'append' : (obj.prependTo !== undefined) ? 'prepend' : (act !== undefined && target[act]) ? act : 'append';
						
						// Try appending with WUI modifiers, else just append in good ol' jQuery fashion
						try{$(target)[action](obj.el)}
						catch(e){
							try{$(target)[action](obj)}
							catch(e){}
						}
						
						// Add styles
						this.cssByParam(obj);
						
						return true;
					},
		append:		function(obj){
						var me = this, el = me.elAlias || me.el;
						el.append(obj);
					},
		clear:		function(obj){
						var me = this, el = me.elAlias || me.el;
						el.children().remove();
					},
		callRender:	function(){
			        	var me = this;
			        	
			        	// Add styles if they didn't get added
						me.cssByParam(me);
			        	
			        	// Perform render for this
						if(me.onRender)  me.onRender();
			        	
			        	// Perform Wui.fit on items that need it
			        	var needFit = false;
			        	
			        	for(var i in me.items)
			        		if(me.items[i].fit)
				        		needFit = true;
						
						if(me.fitDimension || needFit)
			        		Wui.fit(me.items, (me.fitDimension || undefined));
			        		
			        	// Perform rendering for child elements
			        	for(var i in me.items) if(me.items[i].callRender) me.items[i].callRender();
						if(me.afterRender)  me.afterRender();
			        },
		cssByParam: function(m) { 
                        var m = m || this;
                        
                        if(m.el && m.el.addClass){
                        	if(m.attr)	m.el.attr(m.attr);
                        	
                        	// calculate dimensions
                        	if(Wui.isNumeric(m.height))	m.el.css({height: m.height});
                        	if(Wui.isNumeric(m.width))	m.el.css({width: m.width});
                        	if(m.width && m.width.indexOf && m.width.indexOf('%') != -1)
								m.el.css({width: Math.floor((parseFloat(m.width) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).width())});
							if(m.height && m.height.indexOf && m.height.indexOf('%') != -1){
								m.el.css({height: Math.floor((parseFloat(m.height) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).height())});
							}
                        	return m.el.addClass(m.cls);
                        }else{
                        	return m;
                        }
                    },
        each:		function(f){
						for(var i = this.items.length - 1; i >= 0; i--)	f(this.items[i],i);
						return true;
			    	},
		hide:		function(speed, callback){ var args = ['fadeOut']; for(var i in arguments) args.push(arguments[i]); return this.showHide.apply(this,args);},
		place:      function(after){
                        var me = this;
						
						//adds the objects items if any
						if(me.items === undefined) me.items = [];
						for(var i in me.items){
							me.items[i].parent = me;
							if(me.items[i].place)	me.items[i].place();
							else					me.addToDOM(me.items[i]);
						}
						
                        //adds the object to the DOM and starts the recursive callRender to render properties on the children
                        me.addToDOM(me);
                        
                        // perform operations on the object after its placed on the DOM but before onRender
                        if(after && typeof after == 'function')	after(me);
                        
                        // run through a parent object and all of its children to run onRender
						if(me.parent === undefined) me.callRender();
						
                        return me;
                    },
		push:       function(){
                        var me = this;
						
						if(me.items === undefined) me.items = [];
						for(var i in arguments){
							arguments[i].parent = me;
							if(arguments[i].place)	arguments[i].place();
							else					me.addToDOM(arguments[i]);
						}		
						
						return Array.prototype.push.apply(me.items,arguments);
                    },
		remove:     function(){
                        var me = this, spliceVal = null;
                        console.log(me.parent);
                        if(me.parent){
	                        me.parent.each(function(itm,idx){ if(itm === me) spliceVal = idx;});
	                        if(spliceVal !== null)
	                        	me.parent.splice(spliceVal,1);
                        }
                        this.el.remove();
                        delete this;
                    },
        show:		function(speed, callback){ var args = ['fadeIn']; for(var i in arguments) args.push(arguments[i]); return this.showHide.apply(this,args);},
		showHide:	function(fn,speed,callback){
				    	 var speed = (typeof speed == 'number') ? speed : 250;
				    	 if(typeof arguments[1] == 'function') callback = arguments[0];
				    	 return (this.elAlias || this.el)[fn](speed, callback);
			        },
		splice:     function(idx, howMany){
            			var me = this,
                        	el = me.elAlias || me.el;
							idx = parseInt(idx);
                        
						if(me.items === undefined) me.items = [];
						
                        //remove specified elements
                        for(var i = idx; i < (idx + howMany); i++)
                            if(me.items[i]) me.items[i].el.remove();
                        
                        //standard splice functionality on array and calcs
                        var retVal      = Array.prototype.splice.apply(me.items, arguments),
                            numAdded    = arguments.length - 2;
							
                        //append any additional el's in proper order
                        if(me.items.length == numAdded){                      //items ended up replacing the array
                            for(var i = 0; i < me.items.length; i++)          { me.addToDOM(me.items[i],el); me.items[i].parent = me; }
                        }else if(me.items[(idx + numAdded)] == undefined){    //meaning the new items were inserted at the end of the array
                            for(var i = idx; i < me.items.length; i++)        { me.addToDOM(me.items[i],me.items[i-1].el,'after'); me.items[i].parent = me; }
                        }else if (numAdded != 0){                             //items at the beginning/middle of the array
                            for(var i = (idx + numAdded); i > 0; i--)         { me.addToDOM(me.items[i-1],me.items[i].el,'before'); me.items[i-1].parent = me; }
                        }
                        
                        return retVal;
                    }
	};
	
	
	/****************** WUI Viewport *****************/
	Wui.Viewport = function(args){
		var me = this,
			params = $.extend({
				el:	$('body'),
				offset:	null,
				vPadding:	0,
				vObjects:	[],	
				calcVPadding: function(){ for(var i in me.vObjects) me.vPadding += (parseInt(me.vObjects[i]) || 0); },
				matchWindow:	null,
				contentHeight:	null,
				height:	null,
				forceMatchWin: false,
				resize:	function(){
							me.beforeResize();

							me.contentHeight = me.el.children('div:first').outerHeight(true);
							me.matchWindow = Math.round($.viewportH() - me.offset.top - me.vPadding);
							me.height = (me.matchWindow < me.contentHeight || me.forceMatchWin) ? me.matchWindow : me.contentHeight;
							me.el.height(me.height);
							me.afterResize();
						},
				beforeResize:	function(){},
				afterResize:	function(){},
				onInit:	function(){},
				DOMNodeAdded: function(){ me.resize(); },
				init: function(){
						//calculate initial values of items on page
						me.offset = me.el.offset();
						me.calcVPadding();

						//initial resizing of viewport
						me.resize();

						//tie viewport to the window
						$(window).resize(me.resize);

						//give focus to the viewport
						me.el.focus();

						//resize viewport when DOM elements are added
						me.el.bind('DOMNodeInserted', me.DOMNodeAdded);

						//allow for further extension
						me.onInit();
						
						
						/* THIS IS PROBABLY BETTER BUT IT SCREWS UP EXT :-(
						if(me.el === null) throw('WUI Viewport requires an \'el\' element to be specified.');
						
						//calculate initial values of items on page
						me.offset = me.el.offset();
						me.calcVPadding();
						
						//initial resizing of viewport
						me.resize();
						
						//tie viewport to the window
						$(window).resize(function(){me.resize();});
						
						// resize viewport when DOM elements are added
						// me.el.bind('DOMNodeInserted', me.DOMNodeAdded); DEPRECATED
						
						// add mutation observer for when things get added to the viewport
						me.el.addClass('wui-viewport').focus();
						document.addEventListener("animationstart", me.DOMNodeAdded, false); // standard + firefox
						document.addEventListener("MSAnimationStart", me.DOMNodeAdded, false); // IE
						document.addEventListener("webkitAnimationStart", me.DOMNodeAdded, false); // Chrome + Safari
						*/
					}
			},args);
			$.extend(me,params);
			me.init();
	}
	Wui.Viewport.prototype = new Wui.O();

	
	/****************** WUI Data Object *****************/
	Wui.Data = function(args){
		$.extend(this,{
			data:			[],
			name:			null,
			params:			{},
			url:	  		null,
			waiting: 		false,
			ajaxConfig:		{},
			total:			0
		},args);
	}
	Wui.Data.prototype = {
		dataContainer:	null,
		totalContainer:	null,
		ajaxWait:		10,
		dataChanged:	function(newdata){},
		dataEach:		function(f){
							for(var i = this.data.length - 1; i >= 0; i--)	f(this.data[i],i);
							return true;
				    	},
		loadData:		function(){
							var me = this,
								config = $.extend({
									data:       me.params,
									dataType:	'json',
									success:	function(r){ me.success.call(me,r); },
									error:		function(e){ me.success.call(me,e); },
								},me.ajaxConfig);
							
							if(!me.waiting){
								me.waiting = true;
								me.beforeLoad.apply(me,arguments);
								$.ajax(me.url,config);
							}else{
								setTimeout(function(){
									me.loadData.apply(me,arguments);
								}, me.ajaxWait);
							}
						},
		setData:		function(d,t){
							var me = this;
							
							// Event hook for before the data is set
							me.beforeSet();
							
							// Set the data
							me.data = me.processData(d);
							me.total = (t !== undefined) ? t : me.data.length;
							
							// Event hooks for after the data is set
							me.dataChanged(me.data);
							$(window).trigger($.Event('datachanged'),[(me.name || 'wui-data'), me]);
							me.afterSet();
						},
		beforeLoad:		function(){},
		afterSet:		function(){},
		beforeSet:		function(){},
		success:		function(r){
							var me = this, 
								response	= (me.dataContainer && r[me.dataContainer]) ? r[me.dataContainer] : r,
								total 		= (me.totalContainer && r[me.totalContainer]) ? r[me.totalContainer] : response.length;
							me.waiting = false;
							me.onSuccess(r);
							me.setData(response,total);
						},
		onSuccess:		function(){},
		onFailure:		function(){},
		failure:		function(e){
							this.waiting = false;
							this.onFailure(e);
						},
		processData:	function(response){ return response; }
	};


	/****************** WUI Template Engine *****************/
	Wui.Template = function(args){ $.extend(this,args); }
	Wui.Template.prototype = {
		// template:	null, * required
		// data:		null, * required
		make:	function(){
					var me = this;
					if(me.data && me.template){
					    var tplCopy = me.template;
	                    return $(
							tplCopy
							// replaces straight values
							.replace(/\{(\w*)\}/g,function(m,key){return (me.data[key] !== undefined) ? me.data[key] : "";})
							// accounts for complex expressions
							.replace(/\{\((.*)\)\}/g,function(m,fn){
								var keys = [],
									vals = [];
								
								// fill arrays of keys and their values and make sure they are in the same order
								for(var i in me.data)	keys.push(i);
								for(var i in keys)		vals.push(me.data[keys[i]]);
								
								// add the passed in conditional as the body of the function created below
								keys.push("return " + fn);
								
								// create function that will perform the conditional statement
								var newFn = Function.apply(null,keys);
								
								// call the function with the keys as variables in scope
								return newFn.apply(null,vals);
							})
						);
					}
					throw new Error('Template engine missing data and/or template.');
				}
	};
	
	
	/****************** WUI Data List Control *****************/
	Wui.DataList = function(args){
		$.extend(this, {el:$('<div>')}, args);
		this.init();
	};
	Wui.DataList.prototype = $.extend(new Wui.O(), new Wui.Template(), new Wui.Data(), {
		beforeSet:	function(){ this.clear(); },
		dataChanged:function(){ this.make(); },
		init:		function(){},
		make:		function(){
						var me = this,
							holdingData = me.data || [];

						for(var i = 0; i < holdingData.length; i++){
							var rec = me.data = holdingData[i],
								a = {el:Wui.Template.prototype.make.call(me), rec:rec};
							
							me.append(
								a.el.click(function(){
									if(me.selected && me.selected === a){
										a.el.removeClass('wui-selected');
										me.selected = null;
										me.el.trigger($.Event('deselect'),[me, a.el, a.rec]);
									}else{
										me.el.find('.wui-selected').removeClass('wui-selected');
										a.el.addClass('wui-selected');
										me.selected = a;
										me.el.trigger($.Event('select'), [me, a.el, a.rec]);
									}
								})
							);
						}
						
						me.data = holdingData;
						me.el.trigger($.Event('refresh'),[me,me.data]);
					},
		onRender:	function(){
						if(this.url === null)	this.make();
						else					this.loadData();
					},
		refresh:	function(){ this.onRender(); }
	});
	
	
	/****************** WUI Docs & Test Suite *****************/
	Wui.docCode = function(){
		var wuiCode = $('.wui-doc-code');
			if(wuiCode.length > 0){
				var e = document.createElement('i'),
					docCode = '';
				
				// encode html tags that would mess up the code area
				wuiCode.each(function(){
					var code = ($(this).prop('tagName').toLowerCase() == 'style') 
							? '\n<style type="text/css">\n' +$(this).text()+ '\n</style>\n'
							: '\n<script type="text/javascript">\n' +$(this).text()+ '\n</script>\n';
							
					docCode += code.replace(/</g,'&lt;').replace(/>/g,'&gt;');
				});
				
				// replace tabs with 4 spaces where the browser doesn't support tab size
				if(e.style.tabSize !== '' && e.style.MozTabSize !== '' && e.style.oTabSize !== '')	docCode.replace(/\t/g,'    ');
				
				// create the <pre> object with associated button to show and hide it
				var	preObj = $('<pre>' +docCode+ '</pre>'),
					docBtn = new Wui.Button({
						preVisible:	false,
						text:		'Show Source',
						appendTo:	$('body'),
						cls:		'wui-docs',
						click:		function(){
										if(this.preVisible){ preObj.fadeOut(1000); this.setText('Show Source'); }
										else{ preObj.fadeIn(1000); this.setText('Hide Source'); }
										this.preVisible = !this.preVisible;
									}
					});
				
				// append everything on the body
				docBtn.place();
				$('body').append(preObj.hide());
			}
	};
	
	
	Wui.assert = function(descrip,test,count,hideFn){
		try{
			var passed	= (typeof test == 'function') ? test() : test,
				fnString= (typeof test == 'function') ? test.toString() : '';
		}catch(e){
			// If the test expression itself has problems, return passed = false and the javascript error
			var passed	= false,
				fnString= (typeof test == 'function') ? e + '\n\n' + test.toString() : '';
		};

		var startTime	= new Date(),
			stringVal	= (fnString.length && hideFn !== true) ? '<pre>' + fnString.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\t/g,'    ')+ '</pre>' : '',
			endTime		= new Date(),
			testNum		= (count) ? count : '-',
			testData	= {string_val:stringVal, passed:passed, name:descrip, test_num:testNum, time:endTime - startTime},
			tplt		= new Wui.Template({
							template:'<tr>' +
										'<td>{test_num}</td>' +
										'<td>{name}{string_val}</td>' +
										'<td class="{((passed)?"pass":"fail")}">{passed}</td>' +
										'<td>{time}ms</td>' +
									'</tr>',
							data:	testData
						});
						
			if($('.wui-test-results tbody').length == 0){
			$('body').append($(
				'<table class="wui-test-results">' +
					'<thead>' +
						'<tr>' +
							'<th class="wui-test-smaller">Test</th>' +
							'<th>Description</th>' +
							'<th class="wui-test-smaller">Success</th>' +
							'<th class="wui-test-smaller">Time</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody></tbody>' +
				'</table>'
			));	
		};
		
		$('.wui-test-results tbody').prepend(tplt.make());
		return testData;
	};
	
	
	Wui.ts = function(){
		var me = this;
		$.extend(me,{
			count:	0,
			paused: false,
			queue:	[],
			test:	function(desc,fn,supressFunction){
						me.queue.push(function(){ me.count++; Wui.assert(desc, fn, me.count, supressFunction); });
						me.runTest();
					},
			pause:	function(){ me.paused = true; },
			resume:	function(){
						me.paused = false;
						setTimeout(me.runTest,1);
					},
			runTest:function(){
						if (!me.paused && me.queue.length) {
							me.queue.shift()();
							if (!me.paused) me.resume();
						}
					}
		});
	};
	
	
	/****************** WUI Button *****************/
	Wui.Button = function(args){
	    $.extend(this, {
	    	el:			$('<div>').attr({unselectable:'on'}),
			disabled:	false,
			toolTip:    null,
			text:       'Button'
	    }, args, {
			cls:		'wui-btn ' + (args.cls || '')
		});
		this.init();
	};
	Wui.Button.prototype = $.extend(new Wui.O(),{
		click:      function(){},
		init:       function(){ 
	                    var me = this;
						if(me.disabled)	me.disable();
	                    
	                    me.el.click(function(e){
	                    	if(!me.disabled) me.click(arguments);
	                    	return false;
	                    })
	                    .html(me.text)
	                    .attr({title:me.toolTip});
	                },
		disable:	function(){
						this.disabled = true;
						this.el.toggleClass('disabled',this.disabled).attr('disabled',true);
					},
		enable:		function(){
						this.disabled = false;
						this.el.toggleClass('disabled',this.disabled).removeAttr('disabled');
					},
		setText:    function(txt){ return this.el.html(txt); },
	});
	
	
	/****************** WUI Pane/Panel *****************/
	Wui.Pane = function(args){ 
		$.extend(this,{
			bbar:       [],
			border:		true,
			borderStyle:{borderWidth:6},
			tbar:       [],
			disabled:	false,
			maskHTML:	'Loading...',
			title:		null
		},args); 
		this.init();
	}
	Wui.Pane.prototype = $.extend(new Wui.O(),{
        disable:	function(){
						this.disabled = true;
						// cover pane contents
						this.mask = this.container.clone().html(this.maskHTML).addClass('wui-mask').appendTo(this.container.parent());
						// disable header & footer objects
						this.footer.each(function(itm){ if(itm.disable) itm.disable(); });
						this.header.each(function(itm){ if(itm.disable) itm.disable(); });
					},
		enable:		function(){
						var me = this, mask = me.mask;
						me.disabled = false;
						me.mask.fadeOut(500,function(){ 
							// remove mask and enable header and footer buttons (all of them)
							me.mask.remove();
							me.mask = undefined;
							me.footer.each(function(itm){ if(itm.enable) itm.enable(); });
							me.header.each(function(itm){ if(itm.enable) itm.enable(); });
						});
					},
		init:		function(wuiPane){
						var me = wuiPane || this;
						me.el		 = $('<div>').addClass('wui-pane').append(
										   $('<div>').addClass('wui-pane-wrap').append(
											   me.container = $('<div>').addClass('wui-pane-content')
										   )
									   );
						me.sureEl	 = me.el;
						me.header    = new Wui.O({el:$('<div>'), cls:'wui-pane-header', items:me.tbar, appendTo:me.el});
	                    me.footer    = new Wui.O({el:$('<div>'), cls:'wui-pane-footer', items:me.bbar, appendTo:me.el});
	                    me.elAlias	 = me.container;
	                    
	                    // Set  border if applicable
	                    if(me.border) me.el.css(me.borderStyle);
	                    
	                    // Add header and footer to the pane if theres something to put in them
	                    if(me.bbar.length != 0) me.placeFooter();
	                    if(me.tbar.length != 0 || me.title !== null){
	                        me.placeHeader();
	                        
	                        // Set the title on the pane
		                    if(me.title !== null){
			                    me.header.el.append($("<h1>"));
								me.setTitle(me.title);
		                    }
	                    }
					},
		placeFooter:function(){
						this.sureEl.css({borderBottom:'none'});
						this.sureEl.children('.wui-pane-wrap').css({paddingBottom:'40px'});
						this.footer.place();
					},
		placeHeader:function(){
						this.sureEl.css({borderTop:'none'});
						this.sureEl.children('.wui-pane-wrap').css({paddingTop:'40px'});
						this.header.place();
					},
		setTitle:   function(t){ this.header.el.children('h1:first').text(t); }
	});
	
	
	Wui.Window = function(args){ 
		$.extend(this,{
			bbar:       [],
			border:		false,
			height:		400,
			isModal:	false,
			onWinClose:	function(){},
			onWinOpen:	function(){},
			tbar:       [], 
			title:		'Window',
			width:		600
		},args);  
		this.init(); 
	}
	Wui.Window.prototype = $.extend(new Wui.Pane(),{
		close:		function(){ 
						var me = this;
						if(me.onWinClose(me) !== false){
							me.windowEl.trigger($.Event('close'),[me]);
							me.remove();
						}
					},
		disable:	function(){
						Wui.Pane.prototype.disable.call(this);
						this.winClose.enable(); // Enable the close button for the window - esp. important if its modal
					},
		init:       function(){
            	        var me = this;
	    				me.appendTo = $('body');
	    				
            	        // Make it a modal window & add everything to the DOM
            	        if(me.isModal){
            	        	me.modalEl = $('<div>').addClass('wui-overlay');
            	        	$('body').append(me.appendTo = me.modalEl.css('z-index',Wui.maxZ() + 1));
            	        }
            	        
            	        // Add close buttons where appropriate
            	        me.tbar.push(new Wui.Button({click:function(){me.close()}, text:'X'}));
            	        if(me.bbar.length == 0) me.bbar = [new Wui.Button({click:function(){me.close()}, text:'Close'})];
            	        
            	        // Calls the parent init function
            	        Wui.Pane.prototype.init(me);
            	        
            	        // Add window specific properties
            	        me.windowEl = me.el
            	        .draggable({handle: me.header.el, start:bringToFront})
            	        .addClass('wui-window')
            	        .resizable({
                            minWidth:	me.width,
                            minHeight:	me.height,
                            resize:		function(){ me.container.trigger($.Event('resize'),[me.container.width(), me.container.height()]); }
                        })
                        .css('z-index',Wui.maxZ() + 1)
                        .click(bringToFront);
                        
                        me.place();
                        
                        // Resize the window and center
                        me.resize();
                        
                        // Make the overlay the el so that when the window is closed it gets taken with it
                        if(me.isModal)	me.el = me.modalEl;
                        
                        this.onWinOpen(me);
						me.windowEl.trigger($.Event('open'),[me]);
                        
                        function bringToFront(){
                            if(parseInt((me.el.css('z-index')) || 1) < Wui.maxZ()){
                                me.el.css('z-index',Wui.maxZ() + 1);
                            }
                        }
                    },
        resize:		function(resizeWidth, resizeHeight){
				        var me = this,
							totalHeight = me.container[0].scrollHeight + (me.header.el.outerHeight() * 2);
						
						//size the window to according to arguments, or fit its contents as long as its snaller than the height of the window
						if(arguments.length != 0) me.windowEl.height(me.height = resizeHeight).width(me.width = resizeWidth);
				        else					  me.windowEl.height(((totalHeight >= $.viewportH()) ? ($.viewportH() - 10) : totalHeight));
				        
						// Center window
						me.windowEl.css({
							top:		Math.floor(($.viewportH() / 2) - (me.windowEl.height() / 2)) + 'px',
							left:		(!me.isModal) ? Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)) + 'px' : '',
							position:	(!me.isModal) ? 'absolute' : ''
						});
						
						me.container.trigger($.Event('resize'),[me.container.width(), me.container.height()]);
			        }
	});
	
	
	Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
		var newErr = new Wui.Window({
			isModal:    true,
		    title:		msgTitle || 'Error', 
			items:    	[new Wui.O({el:$('<p>').addClass('err').html(errMsg) })], 
			width:		350, 
			height:		200,
			bbar:		buttons || [],
			onWinClose:	callback || function(){}
		});
		return false;
	}
	
	
	Wui.msg = function(msg, msgTitle, callback, content){
	    var cntnt   = (content !== undefined) ? [new Wui.O({el: $('<p>').html(msg) }), content] : [new Wui.O({el: $('<p>').html(msg) })],
	        msg  = new Wui.Window({
				title:      msgTitle || 'Message', 
				isModal:    true,
				items:      cntnt, 
				width:      350, 
				height:     200,
				onWinClose: callback || function(){}
			});
			return true;
	}
	
	
	Wui.confirm = function(msg, msgTitle, callback, content){
	    var itms   = (content !== undefined) ? [new Wui.O({el: $('<p>').html(msg) }), content] : [new Wui.O({el: $('<p>').html(msg) })],
	        Msg  = new Wui.Window({
				title:      msgTitle || 'Confirm',
				bbar:		[
								new Wui.Button({text:'No', click:function(){ Msg.doAnswer(false); }}),
								new Wui.Button({text:'Yes', click:function(){ Msg.doAnswer(true); }})
							],
				isModal:    true,
				items:      itms, 
				width:      350, 
				height:     200,
				doAnswer:	function(ans){
								if(callback && typeof callback == 'function')	callback(ans);
								Msg.answerRun = true;
								Msg.close();
							},
				onWinClose: function(){ return ((Msg.answerRun !== true) ? false : Msg.answerRun); }
			});
	    return true;
	}
}(jQuery,this));
