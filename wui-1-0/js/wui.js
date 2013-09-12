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

(function($) {
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
	
	
	/** The basic WUI object */
	Wui.o = function(args){ $.extend(this,args); };
	Wui.o.prototype = {
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
						try{target[action](obj.el)}
						catch(e){
							try{target[action](obj)}
							catch(e){}
						}
						
						// Add styles
						this.cssByParam(obj);
						
						return true;
					},
		callRender:	function(){
			        	var me = this;
			        	
			        	// Add styles if they didn't get added
						me.cssByParam(me);
			        	
						if(me.onRender)  me.onRender();
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
	
	Wui.viewport = function(args){
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
	Wui.viewport.prototype = new Wui.o();


	Wui.tplt = function(args){ $.extend(this,args); }
	Wui.tplt.prototype = {
		// tplt:	null, * required
		// data:	null, * required
		make:	function(){
					var me = this;
					if(me.data !== null && me.data !== undefined && me.tplt !== null){
					    var tplCopy = me.tplt;
	                    return $(tplCopy.replace(/\{(\w*)\}/g,function(m,key){return (me.data[key] !== undefined) ? me.data[key] : "";}));
					}
					throw new Error('Template engine missing data and/or template.');
				}
	};
	
	
	Wui.dataList = function(args){
		$.extend(this,{
			el:$('<div>'),
			remoteUrl:	null,
			remoteParams:null,
			selected:	null
		},args);
		this.init();
	};
	Wui.dataList.prototype = $.extend(new Wui.o(), new Wui.tplt(), {
		getData:	function(page){
						var me = this;
						
						if(!me.waiting){
							me.waiting = true;
							
							$.ajax(me.remoteUrl, {
								data:       me.remoteParams,
								dataType:	'json',
								success:	function(response){
												me.waiting = false;
												me.data = me.processData(response).payload;
												me.el.trigger($.Event('loadData'), [me, response]);
												me.make();
											}
							});
						}
					},
		init:		function(){},
		make:		function(){
						var me = this,
							holdingData = me.data || [];

						$.each(holdingData,function(idx,rec){
							me.data = rec;
							var a = {el:Wui.tplt.prototype.make.call(me), rec:rec};
							me.el.append(
								a.el.click(function(){
									if(me.selected === a){
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
						});
						me.data = holdingData;
						me.el.trigger($.Event('refresh'),[me,me.data]);
					},
		onRender:	function(){
						if(this.remoteUrl === null)	this.make();
						else						this.getData();
					},
		processData:function(r){ return r; },
		refresh:	function(){
						this.el.children().remove();
						this.onRender();
					}
	});
	
	
	Wui.button = function(args){
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
	Wui.button.prototype = $.extend(new Wui.o(),{
		click:      function(){},
		init:       function(){ 
	                    var me = this;
						if(me.disabled)	me.el.addClass('disabled').attr('disabled',true);
	                    
	                    me.el.click(function(e){
	                    	if(!me.disabled) me.click(arguments);
	                    	return false;
	                    })
	                    .html(me.text)
	                    .attr({title:me.toolTip});
	                },
		setDisabled:function(bool){
				        this.disabled = bool;
				        this.el.toggleClass('disabled',this.disabled);
				        
				        if(this.disabled == true)	this.el.attr('disabled',true);
				        else						this.el.removeAttr('disabled');
			        },
		setText:    function(txt){ return this.el.html(txt); },
	});
	
	
	Wui.pane = function(args){ 
		$.extend(this,{
			bbar:       [],
			border:		true,
			borderStyle:{borderWidth:6},
			tbar:       [],
			title:		null
		},args); 
		this.init();
	}
	Wui.pane.prototype = $.extend(new Wui.o(),{
        init:		function(wuiPane){
						var me = wuiPane || this;
						me.el		 = $('<div>').addClass('wui-pane').append(
										   $('<div>').addClass('wui-pane-wrap').append(
											   me.container = $('<div>').addClass('wui-pane-content')
										   )
									   );
						me.sureEl	 = me.el;
						me.header    = new Wui.o({el:$('<div>'), cls:'wui-pane-header', items:me.tbar, appendTo:me.el});
	                    me.footer    = new Wui.o({el:$('<div>'), cls:'wui-pane-footer', items:me.bbar, appendTo:me.el});
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
	
	Wui.window = function(args){ 
		$.extend(this,{
			bbar:       [],
			border:		false,
			disabled:	false,
			height:		400,
			isModal:	false,
			onWinClose:	function(){},
			onWinOpen:	function(){},
			tbar:       [], 
			title:		'Window',
			maskHTML:	'Loading...',
			width:		600
		},args);  
		this.init(); 
	}
	Wui.window.prototype = $.extend(new Wui.pane(),{
		close:		function(){ 
						var me = this;
						if(me.onWinClose(me) !== false){
							me.windowEl.trigger($.Event('close'),[me]);
							me.remove();
						}
					},
		disable:	function(){
						this.disabled = true;
						// cover window contents
						this.mask = this.container.clone().html(this.maskHTML).addClass('wui-mask').appendTo(this.container.parent());
						// disable footer objects
						for(var i in this.footer.items)
							if(this.footer.items[i].setDisabled) this.footer.items[i].setDisabled(true);
						// disable header objects except the close button	
						for(var i in this.header.items)
							if(this.header.items[i].setDisabled && this.header.items[i] !== this.winClose)
								this.header.items[i].setDisabled(true);
					},
		enable:		function(){
						var me = this, mask = me.mask;
						me.disabled = false;
						me.mask.fadeOut(500,function(){ 
							// remove mask and enable header and footer buttons (all of them)
							me.mask.remove();
							me.mask = undefined;
							for(var i in me.footer.items)
								if(me.footer.items[i].setDisabled) me.footer.items[i].setDisabled(false);
							for(var i in me.header.items)
								if(me.header.items[i].setDisabled) me.header.items[i].setDisabled(false);
						});
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
            	        me.tbar.push(new Wui.button({click:function(){me.close()}, text:'X'}));
            	        if(me.bbar.length == 0) me.bbar = [new Wui.button({click:function(){me.close()}, text:'Close'})];
            	        
            	        // Calls the parent init function
            	        Wui.pane.prototype.init(me);
            	        
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
		var newErr = new Wui.window({
			isModal:    true,
		    title:		msgTitle || 'Error', 
			items:    	[new Wui.o({el:$('<p>').addClass('err').html(errMsg) })], 
			width:		350, 
			height:		200,
			bbar:		buttons || [],
			onWinClose:	callback || function(){}
		});
		return false;
	}
	
	
	Wui.Msg = function(msg, msgTitle, callback, content){
	    var cntnt   = (content !== undefined) ? [new Wui.o({el: $('<p>').html(msg) }), content] : [new Wui.o({el: $('<p>').html(msg) })],
	        msg  = new Wui.window({
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
	    var itms   = (content !== undefined) ? [new Wui.o({el: $('<p>').html(msg) }), content] : [new Wui.o({el: $('<p>').html(msg) })],
	        Msg  = new Wui.window({
				title:      msgTitle || 'Confirm',
				bbar:		[
								new Wui.button({text:'No', click:function(){ Msg.doAnswer(false); }}),
								new Wui.button({text:'Yes', click:function(){ Msg.doAnswer(true); }})
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
	
	
	Wui.HelpWindow = function(msgTitle, src, width, height, callback){
	    var cntnt = [new Wui.o({el: $('<iframe>').attr({src:src}).css({height:'100%',width:'100%', border:'none'})})],
			newErr  = new Wui.window({
				title:      msgTitle || 'Message', 
				items:      cntnt, 
				width:      width || 600, 
				height:     height || 400,
				onWinClose: callback || function(){}
			});
	    return true;
	}
}(jQuery));
