/*
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


// Make sure the WUI is defined
var Wui = Wui || {};

(function($,window) {
	// AJAX error reporting and caching
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
	
	/** 
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
	
	@param {any} n A value that will be tested for whether its numeric
	@return Boolean
	
	Determines whether a passed in value is a number or not.
	*/
	Wui.isNumeric = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	
	/**
		@param {object} Object containing named keys
		@return Array containing the key names of the passed in object in alphabetical order
		
		@example var keys = Wui.getKeys(stateArray[i].params);
	*/
	Wui.getKeys = function(obj){
		var retArray = [];
		for(var key in obj)
			retArray.push(key);
		return retArray.sort();
	},
	
	/** 
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
	
	@return Number specifying the scrollbar width for the current page in pixels
	*/
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
	
	/** 
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
	
	@param	{number} lower	Lower bound for generating the random number
	@param	{number} upper	Upper bound for generating the random number
	@return A random number within the bounds specified
	
	Generates a random number
	*/
	Wui.randNum = function(lower,upper) {
	    upper = upper - lower + 1 ;
	    return ( lower + Math.floor(Math.random() * upper) );
	}
	
	/** 
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
	
	@return A number representing the maximum z-index on the page
	
	Gets the maximum CSS z-index on the page and returns one higher, or one if no z-indexes are defined
	*/
	Wui.maxZ = function(){
		var topZ =	Math.max.apply(null, 
					$.map($('body > *, .wui-window'), function(e,n) {
						if ($(e).css('position') != 'static')
							return parseInt($(e).css('z-index'));
					})
				);
		return Wui.isNumeric(topZ) ? topZ : 1;
	};
	
	/** 
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
	
	@param {array}		collection			A collection of items that will be fit within a container.
	@param {string} 	[dim]				The dimension to perform the fit on, 'height','width', height is default.
	@param {boolean}	[mindTheScrollbar]	Defaults to false, otherwise includes the scrollbar in the calculation.
	
	This function will size items relative to each other via a 'fit' value, as well as percentages and fixed values.
	*/
	Wui.fit = function(collection,dim,mindTheScrollbar){
		var dim = (dim && typeof dim === 'string') ? dim.toLowerCase() : 'height',
			sbw = (mindTheScrollbar === true) ? Wui.scrollbarWidth() : 0;
		
		// Ensure the collection is an array of Wui Objects
		if(collection instanceof Array && collection.length > 0){
			var parent		= (collection[0].parent) ? collection[0].parent : collection[0].el.parent(),
				parentEl	= (parent.el) ? (parent.elAlias || parent.el) : parent,
				parentSize	= (($(parentEl)[0] === $('body')) ? $(window) : $(parentEl))[dim]() - sbw,
				fitCt		= 0,
				fixedSize 	= 0,
				fitMux		= 0;
			
			// Tally all sizes we're dealing with
			$.each(collection,function(i,itm){
				if(itm.fit){
					fitCt += itm.fit; 		// Tally fit values
					itm[dim] = -1;			/* Set to -1 so that CSSByParam will not act on it (just deleting it was
											ineffective because this property can be inherited through the prototype chain)*/
				}else if(itm[dim]){
					// Tally fixed size values & percentage based size values
					// Doing this gives percentages precedence over fit
					if(Wui.isNumeric(itm[dim]))	{ fixedSize += itm[dim]; }
					else						{
												  var itmDimension = Math.floor((parseFloat(itm[dim]) / 100) * parentSize);
												  fixedSize += (itm[dim] = itmDimension);
												}
					delete itm.fit;			// Ensure the item doesn't have a dimension and a fit specified
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
					css[dim] = Math.floor(fitMux * itm.fit);
					$(itm.el).css(css);
				}
			});
		}else{
			throw('Improper collection specified');
		}
	};
	
	
	/** The base object from which all other WUI Objects extend
     *  @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
    */
	Wui.O = function(args){ $.extend(this,{
		/** Whether the object is hidden on the DOM */
		hidden:	false
	},args); };
	Wui.O.prototype = {
		/**
		@param {object}	object	A WUI or jQuery object to be added to the DOM
		@param {object}	target	An item already on the DOM that the action will be performed on the object relative to
		@param {string}	action	The jQuery DOM manipulation method
		
		@return true
		
		Adds an object to the DOM and applies any CSS styles defined for the object by calling 
		cssByParam() if its a WUI object.
		
		If the object has a 'appendTo' or 'prependTo' config, target and action will be ignored whether 
		passed in or not, if target is defined it will then be used, if target is not defined, and 
		'appendTo' and 'prependTo' are not defined, the objects 'parent' will be used for appending. If 
		the object has no parent, it will be appended to the body.
		
		If the object has a 'appendTo' or 'prependTo' config, that action will be used, otherwise the
		passed in action is used if defined, otherwise uses 'append'.
		*/
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
		/**
		@param {object}	item	A jQuery object to be added
			
		Appends item to the WUI Object's 'elAlias' or 'el', whichever is defined.
		*/
		append:		function(obj){
						var me = this, el = me.elAlias || me.el;
						el.append(obj);
					},
		/** Removes items from the WUI Object's 'elAlias' or 'el', whichever is defined. */
		clear:		function(){
						var me = this, el = me.elAlias || me.el;
						el.children().remove();
					},
		/**
			Gets called when a WUI Object is placed and gets called on all of a placed object's items.
			Adds CSS styles via cssByParam, calls onRender() if it exists on the object, determines whether the 
			object is using a 'fit' layout and performs layout on the item, calls its children's callRender(), 
			and finally calls its own afterRender() if it exists.
		*/
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
		
		/**
		@param {string} 		name	Name of the HMTL attribute to set
		@param {string|number} 	val		Value of the given attribute
		
		@return True if the val parameter is a valid string or number, else false.
		
		Tests whether the passed in value is valid, then uses the jQuery .attr method to apply an attribute to the el of the WUI object.
		*/
		applyAttr:	function(name,val){
						var validVal = (val !== undefined && (typeof val === 'string' || typeof val === 'number'));
						if(validVal) $(this.el).attr(name,val);
						return validVal;
					},
		
		/**
		@param {object} item	A WUI Object, or if undefined, the object that this method is a member of
		
		@return	The object's el if it has one, or just the object
		
		Adds HTML properties like CSS class, attributes, and sets height and width as either absolute values
		or percentages of their parent.
		*/
		cssByParam: function(m) { 
                        var m = m || this;
                        
                        if(m.el && m.el.addClass){
                        	if(m.applyAttr){
								m.applyAttr('id',m.id);
								m.applyAttr('name',m.name);
								m.applyAttr('tabindex',m.tabIndex);
							}
							
							// Add attributes if defined
							try{ if(m.attr && typeof m.attr == 'object') m.el.attr(m.attr); }catch(e){ }
                        	
                        	// calculate dimensions
                        	if(Wui.isNumeric(m.height) && m.height >= 0)	m.el.css({height: m.height});
                        	if(Wui.isNumeric(m.width) && m.width >= 0)		m.el.css({width: m.width});

							// calculate percentage based dimensions
                        	if(m.width && m.width.indexOf && m.width.indexOf('%') != -1)
								m.el.css({width: Math.floor((parseFloat(m.width) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).width())});
							if(m.height && m.height.indexOf && m.height.indexOf('%') != -1){
								m.el.css({height: Math.floor((parseFloat(m.height) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).height())});
							}
							
							// hide an object based on its hidden value
							if(m.hidden){
								if(m.hide)	m.hide(0);
								else		m.el.css('display','none');
							}
                        	
							return m.el.addClass(m.cls);
                        }else{
                        	return m;
                        }
                    },
		/**
		@param {function} fn A function that gets called for each item of the object this function is a member of
		
		@return true
		The passed in function gets called with two parameters the item, and the item's index.
		*/
        each:		function(f){
						for(var i = this.items.length - 1; i >= 0; i--)	f(this.items[i],i);
						return true;
			    	},
		/**
		@param {number} [speed] Time in milliseconds for the hiding element to fade out
		@param {function} [callback] A function that gets called at the end of the fadeout/hide
		
		@return The el or elAlias of the object being hidden
		Hides an object with the options of an animated fadeout and callback function
		*/
		hide:		function(speed, callback){ 
						var args = ['fadeOut'];
						for(var i in arguments) 
							args.push(arguments[i]);
						
						this.hidden = true;
						
						return this.showHide.apply(this,args);
					},
		/**
		Runs cssByParam and Wui.fit() on itself and its children.  Similar to callRender(),
		but without the rendering of objects - useful to resize things that are already rendered.
		*/
		layout:		function(){
						var me = this;
			        	
			        	// run css styles
						me.cssByParam(me);
			        	
			        	// Perform Wui.fit on items that need it
			        	var needFit = false;
			        	
			        	for(var i in me.items)
			        		if(me.items[i].fit)
				        		needFit = true;
								
						if(me.fitDimension || needFit)
			        		Wui.fit(me.items, (me.fitDimension || undefined));
			        		
			        	// Perform layout for child elements
			        	for(var i in me.items) if(me.items[i].layout) me.items[i].layout();
					},
		/**
		@param {function} [after]	A function to be called after an object has been placed
		@return The object that was placed 
		Adds the elements of any child objects to itself, then puts its own el on the DOM by 
		calling addToDOM.  Then executes the 'after' function if provided, then runs the 
		callRender() function to perform rendering, fit, and any other listners on itself and
		its children.
		*/
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
		/**
		@param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
		@return The new length of the array 
		Adds passed in items to the end of the items array and adds those objects to the DOM.
		*/
		push:       function(){
                        var me = this;
						
						if(me.items === undefined) me.items = [];
						for(var i in arguments){
							arguments[i].parent = me;
							if(arguments[i].place)		arguments[i].place();
							else						me.addToDOM(arguments[i]);
							
							if(arguments[i].onRender)	arguments[i].onRender();
							if(arguments[i].layout)		arguments[i].layout();
						}		
						
						return Array.prototype.push.apply(me.items,arguments);
                    },
		/**
		Removes the object from its parent's items array (if attached to a parent Wui object) and
		removes its el from the DOM. Then deletes the object from memory.
		*/
		remove:     function(){
                        var me = this, spliceVal = null;
                        if(me.parent){
	                        me.parent.each(function(itm,idx){ if(itm === me) spliceVal = idx;});
	                        if(spliceVal !== null)
	                        	me.parent.splice(spliceVal,1);
                        }
                        this.el.remove();
                        delete this;
                    },
        /**
		@param {number} [speed] Time in milliseconds for the showing element to fade in
		@param {function} [callback] A function that gets called at the end of the fadein/show
		@return The el or elAlias of the object being shown
		Shows an object with the options of an animated fadein and callback function
		*/
		show:		function(speed, callback){ 
						var args = ['fadeIn'];
						for(var i in arguments) 
							args.push(arguments[i]);
						
						this.hidden = false;
						
						return this.showHide.apply(this,args);
					},
		/**
		@param {string} fn The name of the jQuery method for showing or hiding
		@param {number} [speed] Time in milliseconds for the showing/hiding element to fade in
		@param {function} [callback] A function that gets called at the end of the show/hide
		@return The el or elAlias of the object being shown/hidden
		This is an internal function used by show() and hide(). Fn is required, but speed and callback
		are optional and their order is interchangeable.
		*/
		showHide:	function(fn,speed,callback){
				    	 var speed = (typeof speed == 'number') ? speed : 1;
				    	 if(typeof arguments[1] == 'function') callback = arguments[0];
				    	 return this.el[fn](speed, callback);
			        },
		/**
		@param {number} index The point in the array to start
		@param {number} howMany The number of items to remove
		@param {object} [obj,...] Additional WUI Objects can be passed as parameters and will be inserted at the index
		
		@return An array of the objects removed, if any
		
		Follows the convention of JavaScript's Array.prototype.splice on the object's items array. Items
		spliced into the array will be spliced in position on the DOM as well. Removed items are removed
		from the DOM.
		*/
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

	
	/** WUI Data Object
     @event		datachanged	When the data changes (name, data object)
	 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

	The object for handling data whether remote or local
    */
	Wui.Data = function(args){
		$.extend(this,{
			/** Array of data that will be stored in the object. Can be specified for the object or loaded remotely */
			data:			[],
			
			/** Name of the data object. Allows the object to be identified in the listeners */
			name:			null,
			
			/** Object containing keys that will be passed remotely */
			params:			{},
			
			/** URL of the remote resource from which to obtain data. A null URL will assume a local data definition. */
			url:	  		null,
			
			/** Whether the object is waiting for a remote response */
			waiting: 		false,
			
			/** Special configuration of the ajax method. Defaults are:
			
				data:       me.params,
				dataType:	'json',
				success:	function(r){ me.success.call(me,r); },
				error:		function(e){ me.success.call(me,e); },
			*/
			ajaxConfig:		{},
			
			/** The total number of records contained in the data object */
			total:			0
		},args);
	}
	Wui.Data.prototype = {
		/** An object in the remote response actually containing the data.
		Best set modifying the prototype eg. Wui.Data.prototype.dataContainer = 'payload'; */
		dataContainer:	null,
		/** An object in the remote response specifying the total number of records. Setting this
		feature will overrride the Data object's counting the data. Best set modifying the prototype eg. Wui.Data.prototype.totalContainer = 'total'; */
		totalContainer:	null,
		
		/** When the object is waiting, default amount of time in milliseconds before trying to perform loadData() again */
		ajaxWait:		10,
		
		/** 
		@param {array}	newData	Array of the new data
		Event hook for when data is changed.
		*/
		dataChanged:	function(newdata){},
		
		/**
		@param {function} fn A function that gets called for each item in the object's data array
		
		@return true
		The passed in function gets called with two parameters the item, and the item's index.
		*/
		dataEach:		function(f){
							for(var i = this.data.length - 1; i >= 0; i--)	f(this.data[i],i);
							return true;
				    	},
		
		/**
		Performs a remote call sensitive to whether it is already waiting for a response.
		Between loadData(), success() and setData() fires several event hooks in this order:
		
		1. setParams()
		2. beforeLoad()
		3. onSuccess()
		4. beforeSet()
		5. processData()
		6. dataChanged()
		-  'datachanged' event is fired
		7. afterSet()
		
		Upon failure will fire onFailure()
		*/
		loadData:		function(){
							var me = this,
								config = $.extend({
									data:       me.params,
									dataType:	'json',
									success:	function(r){ me.success.call(me,r); },
									error:		function(e){ me.failure.call(me,e); },
								},me.ajaxConfig);
							
							if(!me.waiting){
								me.waiting = true;
								me.setParams.apply(me,arguments);
								me.beforeLoad.apply(me,arguments);
								$.ajax(me.url,config);
							}else{
								setTimeout(function(){
									me.loadData.apply(me,arguments);
								}, me.ajaxWait);
							}
						},
		/**
		@param {object} params	Params to be set
		Can be used as is to set parameters before an AJAX load, or it can also be used as an event hook and overridden.
		This method is called from loadData with its arguments passed on, so arguments passed to load data will be sent here. 
		See loadData().
		*/
		setParams:		function(params){
							if(params && typeof params === 'object')
								$.extend(this.params,params);
						},
		
		/**
		@param {array} d Data to be set on the ojbect
		@param {number} [t] Total number of records in the data set. If not specified setData will count the data set.
		
		Can be called to set data locally or called by loadData(). Fires a number of events and event hooks. See loadData().
		*/
		setData:		function(d,t){
							var me = this;
							
							// Event hook for before the data is set
							me.beforeSet(d);
							
							// Set the data
							me.data = me.processData(d);
							me.total = (t !== undefined) ? t : me.data.length;
							
							// Event hooks for after the data is set
							me.dataChanged(me.data);
							$(window).trigger($.Event('datachanged'),[(me.name || 'wui-data'), me]);
							me.afterSet(me.data);
						},
		
		/** Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData(). */
		beforeLoad:		function(){},
		
		/**
		@param	{array}	data	The value of the data cofig of the current object
		Event hook that fires after data is set. Meant to be overridden. See loadData().
		*/
		afterSet:		function(data){},
		
		/**
		@param {array} d Data to be set on the ojbect
		Event hook that fires after the remote call but before data is set on the object. Meant to be overridden. See loadData().
		*/
		beforeSet:		function(d){},
		
		/**
		@param {object or array} r Response from the server in JSON format
		Runs when loadData() successfully completes a remote call. Gets data straight or gets it out of the dataContainer and totalContainer. See loadData().
		Calls setData() passing the response and total.
		*/
		success:		function(r){
							var me = this,
								dc			= me.hasOwnProperty('dataContainer') ? me.dataContainer : Wui.Data.prototype.dataContainer,
								tc			= me.hasOwnProperty('totalContainer') ? me.totalContainer : Wui.Data.prototype.totalContainer,
								response	= (dc && r[dc]) ? r[dc] : r,
								total 		= (tc && r[tc]) ? r[tc] : response.length;
							me.waiting = false;
							me.onSuccess(r);
							me.setData(response,total);
						},
		
		/**
		Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData().
		*/
		onSuccess:		function(){},
		
		/**
		Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData().
		*/
		onFailure:		function(){},
		failure:		function(e){
							this.waiting = false;
							this.onFailure(e);
						},
		
		/** 
		@param {array} Data to be processed.
		Allows for pre-processing of the data before it is taken into the data object. Meant to be overridden, otherwise will act as a pass-through. See loadData().*/
		processData:	function(response){ return response; }
	};


	/**
	
	*/
	Wui.Template = function(args){ $.extend(this,args); }
	Wui.Template.prototype = {
		/** The HTML template that the data will fit into. Null value will cause an error to be thrown. Specification required. */
		template:	null,
		
		/** A single record to be applied to the template. Null value will cause an error to be thrown. Specification required.  */
		data:		null,
		
		/**
		@return A jQuery object containing the template paired with its data
		Creates the template 
		*/
		make:	function(){
					var me = this;
					if(me.data && me.template){
					    var tplCopy = me.template;
	                    return $(
							tplCopy
							// replaces straight values
							.replace(/\{(\w*)\}/g,function(m,key){return (me.data[key] !== undefined) ? me.data[key] : "";})
							// accounts for complex expressions
							.replace(/\{\((.*?)\)\}/g,function(m,fn){
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
	
	
	/** WUI Data List
     @event		wuiselect		A data template is selected ( DataList, el, record )
	 @event		wuichange		The selected item info along with the previous selected record if it exists ( DataList, el, record, old el, old record )
	 @event		wuideselect		A selected item is clicked again, and thus deselected ( DataList, el, record )
	 
	 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
     @creation   2013-09-30
     @version    1.1
    */
	Wui.DataList = function(args){
		$.extend(this, {
			/** Determines whether templates are made immediately when the DataList is rendered */
			autoLoad:	true,
			
			/** DOM element where all of the data templates will be appended. */
			el:			$('<div>'),
			
			/** Maximum number of data elements to display, even if data set is larger. */
			displayMax: -1,
			
			/** Method that will run immediately when the object is constructed. */
			init:		function(){},
			
			/** @eventhook Called after the data's DOM elements are made */
			afterMake:	function(){}
		}, args);
		this.init();
	};
	Wui.DataList.prototype = $.extend(new Wui.O(), new Wui.Template(), new Wui.Data(), {
		/** Overrides the Wui.Data method that serves as an event hook. Calls the DataList's make() method. */
		dataChanged:function(){ this.make(); },
		
		/**
		@param	{object}	itm		Object containing an el (jQuery object), and a rec (data object)
		@private
		Performs mutations and fires listeners when an item is selected
		*/
		itmSelected:function(itm){
						var me = this,
							alreadySelected = me.selected,
							oldEl = (alreadySelected) ? alreadySelected.el : undefined,
							oldRec = (alreadySelected) ? alreadySelected.rec : undefined;
						
						me.el.find('.wui-selected').removeClass('wui-selected');
						itm.el.addClass('wui-selected');
						me.selected = itm;
						
						// Fire different events depending whether there was already a record selected
						me.el.trigger($.Event('wuichange'), [me, itm.el, itm.rec, oldEl, oldRec]);
						me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec]);
					},
		
		/**
		@param	{object}	itm		Object containing an el (jQuery object), and a rec (data object)
		@private
		Performs mutations and fires listeners when an item is deselected
		*/		
		itmDeselect:function(itm){
						var me = this;
						itm.el.removeClass('wui-selected');
						me.selected = null;
						me.el.trigger($.Event('deselect'),[me, itm.el, itm.rec]);
					},
		
		/**
		@param	{object}	itm		Object containing an el (jQuery object), and a rec (data object)
		@return The item passed in with listeners added
		Adds the click listeners to the item and calls modifyItem to add greater flexibility
		*/
		createItem:	function(itm){
						var me = this;
						
						itm.el.click(function(){
							if(me.selected && me.selected === itm)	me.itmDeselect(itm);
							else									me.itmSelected(itm);
						});
						return me.modifyItem(itm);
					},
		
		/**
		@param	{object}	itm		Object containing an el (jQuery object), and a rec (data object)
		@return The DOM element
		Performs any desired modification on an object - this method is meant to be overridden.
		*/
		modifyItem:	function(itm){ return itm.el; },
		
		/** Creates the templates based on current data. Then appends them to the el with listeners */
		make:		function(){
						var me = this,
							holdingData = me.data || [],
							holder = $('<div>');
						
						for(var i = 0; (me.displayMax < 0 && i < holdingData.length) || (me.displayMax > 0 && i < me.displayMax && i < holdingData.length); i++){
							var rec = me.data = holdingData[i];
							holder.append(me.createItem({el:Wui.Template.prototype.make.call(me), rec:rec}));
						}
						
						me.clear();
						me.append(holder.children().unwrap());
						me.data = holdingData;
						me.afterMake();
						me.el.trigger($.Event('refresh'),[me,me.data]);
					},
					
		/** Runs when the object has been appended to its target. Then appends the data templates with listeners. */
		onRender:	function(){
						if(this.autoLoad){
							if(this.url === null)	this.make();
							else					this.loadData();
						}
					},
					
		/** Reruns the make() method. */
		refresh:	function(){ this.onRender(); }
	});
	
	
	/**
     @event		wuibtnclick		Fires when the button is pressed and not disabled. Avoided using the standard 'click' event for this reason ( Button Object )
	 
	 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
    */
	Wui.Button = function(args){
	    $.extend(this, {
	    	/** The button element. Can be overridden according to the needs of the design. */
			el:			$('<div>').attr({unselectable:'on'}),
			
			/** Whether the button is disabled. */
			disabled:	false,
			
			/** Tool tip text for the button. */
			toolTip:    null,
			
			/** Tab index will make the button focusable by the browser. Changing this value will result in it receiving a higher precedence than what it would receive in that natural flow of the page. */
			tabIndex:	0,
			
			/** Text to appear on the button. Can be HTML if a more complex button design is desired. */
			text:       'Button'
	    }, args);
	    
		this.init();
	};
	Wui.Button.prototype = $.extend(new Wui.O(),{
		/** Event hook for the button click. */
		click:      function(){},
		
		/** Method that will run immediately when the object is constructed. Adds the click listener with functionality to disable the button.*/
		init:       function(){ 
	                    var me = this;
						
						me.el
						.addClass('wui-btn')
						.click(btnClick)
						.keyup(function(evnt){
							if(evnt.keyCode == 13 || evnt.keyCode == 32)
								btnClick(evnt);
						})
	                    .html(me.text)
	                    .attr({title:me.toolTip, tabindex:me.tabIndex});
						
						if(me.disabled)	me.disable();
						
						function btnClick(e){
							if(!me.disabled){
								me.click(arguments);
								me.el.trigger($.Event('wuibtnclick'),[me]);
							}
	                    	return false;
						}
	                },
		
		/** Disables the button */
		disable:	function(){
						this.disabled = true;
						this.el
						.toggleClass('disabled',this.disabled)
						.attr('disabled',true)
						.removeAttr('tabindex');
					},
		/** Enables the button */
		enable:		function(){
						this.disabled = false;
						this.el
						.toggleClass('disabled',this.disabled)
						.removeAttr('disabled')
						.attr({tabindex:this.tabIndex});
					},
		/** Sets the button text. Can be HTML. */
		setText:    function(txt){ return this.el.html(txt); },
	});
	
	
	/**
    @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
    
	WUI Pane
	*/
	Wui.Pane = function(args){ 
		$.extend(this,{
			/** An array of items that will be added to the footer */
			bbar:       [],
			
			/** Whether or not the pane has a border */
			border:		true,
			
			/** Configuration for the pane border - follows the jQuery CSS convention */
			borderStyle:{borderWidth:6},
			
			/** An array of items that will be added to the header */
			tbar:       [],
			
			/** Whether or not the pane is disabled on load */
			disabled:	false,
			
			/** Alignment of the heading title (left,center,right) */
			titleAlign:	'left',
					
			/** Default height */
			height:		'100%',
		
			/** HTML to show in the mask when the pane is disabled */
			maskHTML:	'Loading...',
			
			/** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
			title:		null
		},args); 
		this.init();
	}
	Wui.Pane.prototype = $.extend(new Wui.O(),{
        /** Disables the pane by masking it and disabling all buttons */
		disable:		function(){
							this.disabled = true;
							// cover pane contents
							this.mask = this.container.clone().html(this.maskHTML).addClass('wui-mask').appendTo(this.container.parent());
							// disable header & footer objects
							this.footer.each(function(itm){ if(itm.disable) itm.disable(); });
							this.header.each(function(itm){ if(itm.disable) itm.disable(); });
						},
		
		/** Enables the pane by removing the mask and enabling all buttons */
		enable:			function(){
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
		
		/** Method that will run immediately when the object is constructed. */
		init:			function(wuiPane){
							var me = wuiPane || this;
							me.el		 = $('<div>').addClass('wui-pane').append(
											   $('<div>').addClass('wui-pane-wrap').append(
												   me.container = $('<div>').addClass('wui-pane-content')
											   )
										   );
							me.sureEl	 = me.el;
							me.header    = new Wui.O({el:$('<div><h1></h1><div class="wui-h-cntnt"></div></div>'), cls:'wui-pane-header wui-pane-bar', items:me.tbar, parent:me, appendTo:me.el});
		                    			   me.header.elAlias = me.header.el.children('.wui-h-cntnt');
		                    			   me.header.title = me.header.el.children('h1');
		                    			   
		                    me.footer    = new Wui.O({el:$('<div>'), cls:'wui-pane-footer wui-pane-bar', items:me.bbar, parent:me, appendTo:me.el});
		                    me.elAlias	 = me.container;
							
							// Set  border if applicable
		                    if(me.border) me.el.css(me.borderStyle);
		                    
		                    // Add header and footer to the pane if theres something to put in them
		                    if(me.tbar.length != 0 || me.title !== null){
		                        me.placeHeader();
		                        
		                        // Set the title on the pane
			                    me.setTitle(me.title);
		                    }
		                    if(me.bbar.length != 0) me.placeFooter();
						},

		/** Places the footer on the pane and adjusts the content as necessary. */
		placeFooter:	function(){
							this.sureEl.css({borderBottomWidth:0});
							this.sureEl.children('.wui-pane-wrap').css({paddingBottom:'40px'});
							this.footer.place();
							this.footer.callRender();
						},
		
		/** Places the header on the pane and adjusts the content as necessary. */
		placeHeader:	function(){
							this.sureEl.css({borderTopWidth:0});
							this.sureEl.children('.wui-pane-wrap').css({paddingTop:'40px'});
							this.setTitleAlign();
							this.header.place();
							this.header.callRender();
						},
		
		/** Changes the title on the pane. */
		setTitle:   	function(t){ this.header.title.text(t); },
		
		/** Changes the title on the pane. */
		setTitleAlign:	function(t){ 
							var me = this;
							
							me.titleAlign = t || me.titleAlign;
							me.header.title.addClass(me.titleAlign);
							
							var itemsAlignment = me.titleAlign === 'right' ? 'left' : 'right'; 
							me.header.elAlias.css('text-align',itemsAlignment);
						},
		
		/** Runs after a pane is rendered. Sets up layout listeners and sets focus on the bottom-right-most button if any */
		afterRender:	function(){
							var me = this;
							
							document.addEventListener("animationstart", doLayout, false); 		// standard + firefox
							document.addEventListener("MSAnimationStart", doLayout, false); 	// IE
							document.addEventListener("webkitAnimationStart", doLayout, false); // Chrome + Safari
							
							function doLayout(){
								if(!me.parent) me.layout();
							}
							
							if(me.disabled){
								// If the pane is disabled then it disables it
								me.disable();
							}else if(this.footer.items.length){
								// Set focus to the bottom right most button in the pane
								this.footer.items[this.footer.items.length - 1].el.focus();
							}
						}
	});
	
	
	/**
    @event		open	When the window is opened (window)
	@event		resize	When the window is resized (width, height)
	@event		close	When the window is closed (window)
	
	@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
    
	WUI Window
	*/
	Wui.Window = function(args){ 
		$.extend(this,{
			/** An array of items that will be added to the footer */
			bbar:       [],
			
			/** Whether or not the pane has a border */
			border:		false,
			
			/** Set the height of the window */
			height:		400,
			
			/** Determines whether objects behind the window are accessible */
			isModal:	false,
			
			/** 
			@param {WUI Window} win	The window being closed.
			@eventhook Called just before the window closes. If this function returns false, the window will not be closed. 
			*/
			onWinClose:	function(){},
			
			/** 
			@param {WUI Window} win	The window being opened.
			@eventhook Called when the window opens. 
			*/
			onWinOpen:	function(){},
			
			/** An array of items that will be added to the header */
			tbar:       [], 
			
			/** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
			title:		'Window',
			
			/** Set the width of the window */
			width:		600
		},args);  
		this.init(); 
	}
	Wui.Window.prototype = $.extend(new Wui.Pane(),{
		/** Closes the window unless onWinClose() event hook returns false. */
		close:		function(){ 
						var me = this;
						if(me.onWinClose(me) !== false){
							me.windowEl.trigger($.Event('close'),[me]);
							me.remove();
						}
					},
		
		/** Disables the window by masking it and disabling all buttons besides the close window button. */
		disable:	function(){
						Wui.Pane.prototype.disable.call(this);
						this.closeBtn.enable(); // Enable the close button for the window - esp. important if its modal
					},
					
		/** Method that will run immediately when the object is constructed. */
		init:       function(){
            	        var me = this;
	    				me.appendTo = $('body');
	    				
            	        // Make it a modal window & add everything to the DOM
            	        if(me.isModal){
            	        	me.modalEl = $('<div>').addClass('wui-overlay');
            	        	$('body').append(me.appendTo = me.modalEl.css('z-index',Wui.maxZ() + 1));
            	        }
            	        
            	        // Add close buttons where appropriate
            	        me.tbar.push(me.closeBtn = new Wui.Button({click:function(){me.close()}, text:'X'}));
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
                        
                        function bringToFront(e){
							if(parseInt((me.el.css('z-index')) || 1) < Wui.maxZ()){
                                me.el.css('z-index',Wui.maxZ() + 1);
                            }
                        }
                    },
		/** 
		@param {[number]} resizeWidth Number of pixels for the window width
		@param {[number]} resizeHeight Number of pixels for the window height
		
		If width and height aren't specified, the window is sized vertically to try to fit its contents 
		without getting larger than the browser viewport.
		*/
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
	
	/** Shows an error message
    @param {string}			errMsg		Message explaining the error
	@param {[string]}		msgTitle	Title for the window. Default is 'Error'
	@param {[array]}		buttons		Array containing Wui.Button(s) to give additional functionality.
	@param {[function]}		callback	Function to perform when the error window closes - returning false will prevent the window from closing.
	
	@author     Stephen Nielsen
    */
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
	
	/** Shows an message in a modal window
    @param {string}			msg			A message for the user
	@param {[string]}		msgTitle	Title for the window. Default is 'Message'
	@param {[function]}		callback	Function to perform when the message window closes - returning false will prevent the window from closing.
	@param {[string]}		content		HTML content to include after the message
	@author     Stephen Nielsen
    */
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
	
	/** Shows an message in a modal window with yes and no buttons. Answers are passed to callback().
	The window will not close until an aswer is selected.
	
    @param {string}			msg			A message for the user
	@param {[string]}		msgTitle	Title for the window. Default is 'Message'
	@param {[function]}		callback	Function to perform when the message window closes - returning false will prevent the window from closing.
	@param {[string]}		content		HTML content to include after the message
	@author     Stephen Nielsen
    */
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
