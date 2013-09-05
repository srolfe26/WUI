(function($) {
	Wui.form = function(args){
	    $.extend(this,{
			afterCreate:function(){},
			disabled:	false,
			errCls:		'wui-form-err',
			labelPos:	'top'
		}, args);
		$.extend(this, {
	    	dataValid:  null,
	    	formChanged:false,
			el:			$('<div>'),
			errs:       []
	    });
	    
	    this.init();
	};
	Wui.form.prototype = $.extend(new Wui.o(),{
		clearData:  function(){ this.setData(); },
		dispErrs:   function(){
	                    var msg = '';
	                    for(var e in this.errs) msg += this.errs[e] + '<br/>';
	                    Wui.errRpt(msg,'Form Errors')
	                },
		forItems:	function(f){
						for(var i = this.items.length - 1; i >= 0; i--)
							if(this.items[i].val && typeof this.items[i].val == 'function')
								f(this.items[i],i);
						return true;
			    	},
		getData:    function(){
	                    if(this.validate())	{ return this.getRawData(); }
	                    else				{ this.dispErrs(); return false; }
	                },
	    getField:   function(fieldname){
	                    var retval = null;
	                    this.forItems(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
	                    return retval;
	                },
	    getFrmItm:	function(fieldname){
	                    var retItm = undefined;
						this.forItems(function(itm,idx){ if(itm.name == fieldname) retItm = itm; });
	                    return retItm;
					},
		getRawData: function(){
	                    var ret = {};
	                    this.forItems(function(itm){ ret[itm.name] = itm.val(); });
	                    return ret;
	                },
	    init:		function(){
					    this.el.addClass('wui-form labels-' + this.labelPos);
				    },
		normFrmItem:function(itm){
						var me = this;
						if(itm.ftype && !(itm instanceof Wui.frmField)){
							var ft = itm.ftype.split('.');
							if(window[ft[0]] && window[ft[0]][ft[1]])	return new window[ft[0]][ft[1]]( $.extend(itm,{disabled:me.disabled}) );
							else										throw('Object type ' +itm.ftype+ ' is not defined.');
						}else if(itm instanceof Wui.frmField){
							return $.extend(itm,{disabled:me.disabled});
						}else{
							return itm;
						}
					},
		place:      function(){
						var me = this;
						if(me.items === undefined) me.items = [];
						$.each(me.items, function(i,itm){ me.items[i] = me.normFrmItem(itm); });
						Wui.o.prototype.place.call(this);
		                this.afterCreate();
                    },
		push:		function(){
						for(var i in arguments) arguments[i] = this.normFrmItem(arguments[i]);
						Wui.o.prototype.push.apply(this,arguments);
					},
		remFrmItm:	function(fieldname){
	                    var me = this;
						this.forItems(function(itm,idx){ if(itm.name == fieldname) Wui.o.prototype.splice.call(me,idx,1); });
	                    return true;
					},
		setData:    function(d){
	                    this.forItems(function(itm){ itm.val((d) ? d[itm.name] : null); });
	                },
		setDisabled:function(val){
						return this.forItems(function(itm){ itm.setDisabled(val); });
					},
		setField:   function(fieldname, d){
		                this.forItems(function(itm){ if(itm.name == fieldname) itm.val(d); });
	            	},
		throwErr:   function(m){this.errs.push(m); return false;},
		validate:   function(){
		                var me = this;
						me.errs = [];
		                me.forItems(function(itm){ 
		                	if(itm.el && itm.el.toggleClass) { itm.el.toggleClass(me.errCls,!itm.validate()); }
		                });
		                return (me.errs.length == 0);
	            	}
	});
	
	
	/* WUI Label */
	Wui.label = function(args){ 
		$.extend(this,{
			html:			'',
			labelPosition:	'top'
		},args);
		
		this.init(); 
	};
	Wui.label.prototype = $.extend(new Wui.o(),{
		init:       function(){
						var me = this;
						me.el = $('<div>')
								.addClass('wui-lbl' + ' lbl-' + me.labelPosition)
								.append( me.label = $('<label>').html(me.html).addClass(me.cls).attr(me.attr ? me.attr : {}) );
					},
		setLabel:	function(newLabel){
						this.label.html(this.html = newLabel);
					}
    });
	
	
	/* WUI FormField */
	Wui.frmField = function(args){
		$.extend(this,{
			disabled:		false,
			invalidMsg: 	null,
			label:      	null,
			labelPosition:	'top',
			labelCls:		null,
			required:   	false,
			validRegEx:		null,
			validTest:  	null
		},args);
	};
	Wui.frmField.prototype = $.extend(new Wui.o(),{
		init:  		function(){
                        var me = this;
						me.value = null;
                        me.el = $('<div>').addClass('wui-fe');
						
						if(me.label && me.label.length > 0){
                        	me.lbl = new Wui.label({html:me.label, cls:me.labelCls, labelPosition:me.labelPosition});
							me.elAlias = me.el;
							me.el = me.lbl.el.append(me.elAlias);
						}
						return me.el;
                    },
		onRender:	function(){ if(this.disabled) this.setDisabled(this.disabled); },
        setDisabled:function(val){
						this.disabled = val;
						if(this.el && this.el.addClass){
							if(val)		this.el.addClass('wui-disabled').find('input,textarea,iframe').attr('disabled','disabled');
							else		this.el.removeClass('wui-disabled').find('.wui-disabled,*[disabled=disabled]').removeAttr('disabled');
							return true;
						}else{
							return false;
						}
					},
        validate:   function(){
                        var me = this,
                        	errMsg = (me.invalidMsg !== null) ? me.invalidMsg : 
                        				(me.label != null ) ? 'A value for \'' +me.label+ '\' is required.' :
                        					(me.attr !== undefined && me.attr.name !== undefined) ? 'A value for \'' +me.attr.name+ '\' is required.' :
                        						"A required field has an improper value.";
                        
                        // If a custom test is defined 
                        if(me.validTest && typeof me.validTest == 'function')
                        	if(me.validTest() == false)
                        		return me.parent.throwErr(errMsg);
                        						
                        // If a regular expression is defined for a test, this will be tested first
        				if(me.validRegEx !== null)
        					if(!me.validRegEx.test($.trim(me.val())))
        						return me.parent.throwErr(errMsg);
                        					
                        // If no regular expression test exists, test whether a value is required and throw an error if blank
                        if(me.required && $.trim(me.val()).length == 0) return me.parent.throwErr(errMsg);
                        
                        // Default return value is true
                        return true;
                    },
		val:		function(setVal){
						if(setVal === undefined){
							return this.getVal();
						}else{
							var oldVal = this.value;
							
							// Set the actual value of the item
							this.setVal(setVal);
							
							// Marks the parent form as 'changed'
							if(this.parent && this.parent instanceof Wui.form)
								this.parent.formChanged = true;
							
							// Calls functionally defined valChange() - one will override another
							this.valChange(this.value);
							
							// Calls listeners for valchange - in the case of hidden fields calls 'hiddenchange'
							if(this.el){
								this.el.trigger($.Event('valchange'), [this, oldVal, this.value, setVal]); 
							}else{
								if(this.parent && this.parent instanceof Wui.form)
									this.parent.el.trigger($.Event('hiddenchange'), [this, oldVal, this.value, setVal]);
							}
								
							return true;
						}
					},
		getVal:		function(){
						return this.value;
					},
		setVal:		function(sv){
						this.value = sv;
					},
		valChange:	function(newVal){}
	});
	
	
    /* WUI Hidden */
	Wui.hidden = function(args){
		$.extend(this,{el:null},args); 
		this.init();
	};
	Wui.hidden.prototype = $.extend(new Wui.frmField(),{ init: function(){} });
	
	
	/* WUI Text */
	Wui.text = function(args){
		$.extend(this,{
			blankCls:   'empty',
			blankText:  ''
		},args,{
			field:$('<input>').attr({type:'text'})
		}); 
		this.init();
	};
	Wui.text.prototype = $.extend(new Wui.frmField(),{
		init:		function(){
            			Wui.frmField.prototype.init.call(this);
                        this.append(Wui.text.prototype.setListeners.call(this,this));
                    },
        setBlankText:function(bt){
                        var me = this;
						if(me.field.val() == me.blankText)
							me.field.val(bt).addClass(this.blankCls);
						return me.blankText = bt;
                    },
        clearBlankText:	function(){
					        var me = this;
					        me.value = me.field.val();
					        if(me.field.val() == me.blankText)
                        		me.field.val('');
                        	me.field.removeClass(me.blankCls);
				        },
		setListeners:	function(t){
	                        var me = this,
	                        	fieldState = null;
	                        
	        				t.field
	        				.val(me.blankText)
	        				.addClass(me.blankCls)
	                        .focusin(function(){
	                        	me.clearBlankText.call(me); 
	                        	fieldState = me.value;	// Set fieldState (closure variable) to allow for comparison on blur
	                        })
	                        .keydown(function(){me.clearBlankText.call(me)})
	                        .blur(function(){ 
	                        	var v = me.value = t.field.val();
		                        
		                        // Call val function so that valchange will be fired if needed
		                        if(fieldState != me.value)	me.val(me.value);
		                        
		                        // Add the blank text if the field went blank
		                        if(v === me.blankText || !v.length || v === null)
			                         t.field.addClass(me.blankCls).val(me.blankText);
	                        });
							
							if(this.setListeners !== Wui.text.prototype.setListeners) this.setListeners(this);
	                        return t.field;
	                    },
		setVal:		function(sv){
						if(sv == ''){
                            this.field.addClass(this.blankCls).val(this.blankText);
                            this.value = null;
                        }else{
                            this.field.removeClass(this.blankCls).val(sv);
                            this.value = sv;
                        }
					}
    });

	
	/* WUI Text Area */
	Wui.textarea = function(args){
	    $.extend(this, args, { field:$('<textarea>') });
	    this.init();
	};
	Wui.textarea.prototype = new Wui.text();
	
	
	/* WUI WYSIWYG */
	Wui.wysiwyg = function(args){
	    $.extend(this,{
			showHTML:	false
		},args,{
			blankText:null,
			field:$('<textarea>')
		});
	    this.init();
	};
	Wui.wysiwyg.prototype = $.extend(new Wui.textarea(),{
		onRender:	function(){
                    	var tb = [['bold','italic','underline','strikethrough'], 
                    	          ['link','unlink','unorderedlist','orderedlist'],
                                  ['justifyleft','justifycenter','justifyright']];
                    	if(this.showHTML) tb.push(['html']);
			
						this.field.htmlarea({
                            css: 		'body { color:#333; font:90%  Arial, Verdana, Helvetica, sans-serif !important; overflow:hidden; }' +
                                 		'a {color:#09c; text-decoration:none;} a:hover {color:#0c9; text-decoration:underline;}',
                            toolbar:	tb,
                            loaded:		function(){}
                        });
						
                        var iframe = this.field.parent('.wui-html').height(this.height).find('iframe');
                        this.field.attr({tabindex:'-1'});
                        this.field.parent('.wui-html').resizable({
                            animateEasing: 'linear',
                            minWidth:   this.field.outerWidth(),
                            maxWidth:	this.field.outerWidth(),
                            minHeight:  this.field.parent('.wui-html').find('.tools').outerHeight() * 3,
                            start:      function(evnt, ui){ this.iFrameOrigHeight = iframe.height(); },
                            resize:     function(evnt, ui){ iframe.height(ui.size.height - (ui.originalSize.height - this.iFrameOrigHeight)); },
                            handles:	'se'
                        });
						Wui.frmField.prototype.onRender.call(this);
                    },
        val:    	function(setVal){
                        if(setVal === undefined)    {return this.field.val();}
                        else                        {this.field.val(((setVal !== null) ? setVal : '')); this.field.keyup();}
                    }
	});
	
}(jQuery));