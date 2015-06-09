/*! Wui 1.0
 * Copyright (c) 2013 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * http://www.geekinaday.com/wui/wui-1-1/license.html
 */

(function($) {
	Wui.form = function(args){
	    $.extend(this,{
			afterCreate:function(){},
			disabled:	false,
			errCls:		'wui-form-err',
			labelPos:	'top'
		}, args);
		$.extend(this, {
	    	cls: 		'wui-form labels-' + this.labelPos + ((this.cls !== undefined) ? ' ' + this.cls : ''),
			dataValid:  null,
			el:			$('<div>'),
			errs:       []
	    });
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
		getRawData: function(){
	                    var ret = {};
	                    this.forItems(function(itm){ ret[itm.name] = itm.val(); });
	                    return ret;
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
	
	
	/* WUI FormField */
	Wui.frmField = function(args){
		$.extend(this,{
			disabled:	false,
			invalidMsg: null,
			label:      null,
			labelCls:	null,
			required:   false,
			validRegEx:	null,
			validTest:  null
		},args);
	};
	Wui.frmField.prototype = $.extend(new Wui.o(),{
		init:  		function(){
                        this.el = $('<div>').addClass('wui-fe');
        				if(this.label !== null && this.label.length > 0){
                        	this.lbl = new Wui.label({text:this.label,cls:this.labelCls});
                        	this.el.prepend(this.lbl.el);
                        }
						return this.el;
                    },
		onRender:	function(){ if(this.disabled) this.setDisabled(this.disabled); },
        setDisabled:function(val){
						this.disabled = val;
						if(this.el !== null && this.el.addClass){
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
                        if(me.validTest !== null && typeof me.validTest == 'function')
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
                    }
	});
	
	
	/* WUI Label */
	Wui.label = function(args){ 
		$.extend(this,{ text:'' },args); 
		this.init(); 
	};
	Wui.label.prototype = $.extend(new Wui.o(),{
		init:       function(){ this.el = $('<label>').html(this.text); }
    });
	
	
	/* WUI Note */
	Wui.note = function(args){ 
		$.extend(this,{
			el:		null
		},args,{
			cls:		'wui-note ' + (args.cls || '')
		});
		this.init(); 
	};
	Wui.note.prototype = $.extend(new Wui.o(),{
		init:       function(){ this.el = $('<p>').html(this.label); }
    });
	
	
	/* WUI Hidden */
	Wui.hidden = function(args){ $.extend(this,{el:null, value:null,},args); this.init(); };
	Wui.hidden.prototype = $.extend(new Wui.frmField(),{
		init:       function(){},  
        val:        function(setVal) {
                        if (setVal === undefined)   return this.value;
                        else                        this.value = setVal;
                    }
    });
	
	
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
                        this.el.append(Wui.text.prototype.setListenrs.call(this,this));
                    },
        setBlankText:function(val){
                        var me = this;
        				me.blankText = val;
                        me.el.val(me.blankText);
                        me.el.addClass(me.blankCls);
                    },
		setListenrs:function(t){
                        var me = this;
        				t.field.val(me.blankText).addClass(me.blankCls)
                        .focusin(function() { if(me.field.val() == me.blankText) me.field.val(''); me.field.removeClass(me.blankCls); })
                        .blur(function()    { if(!(Wui.text.prototype.val.call(me) != null && Wui.text.prototype.val.call(me).length != 0)) me.val(); })
                        .keydown(function() { if(me.field.val() == me.blankText) me.field.val(''); me.field.removeClass(me.blankCls); });
						
						if(this.setListenrs !== Wui.text.prototype.setListenrs) this.setListenrs(this);
						
                        return t.field;
                    },
        val:		function(setVal) {
                        var me = this,
                        v = me.field.val();
                            
                        if(v === me.blankText || v == '' || v === null){
                            me.field.val(me.blankText);
                            me.field.addClass(me.blankCls);
                        }
                        if (setVal === undefined){
                            return ((v == me.blankText) ? '' : v);
                        }else{
                            if(setVal == ''){
                                me.field.val(me.blankText);
                            }else{
                                me.field.removeClass(me.blankCls).val(setVal);
                            }
                        }
                    }
    });

	
	/* WUI Text Area */
	Wui.textarea = function(args){
	    $.extend(this, args, {
			field:$('<textarea>')
		});
	    this.init();
	};
	Wui.textarea.prototype = $.extend(new Wui.text(),{
		init:   	function(){
	                    Wui.text.prototype.init.call(this);
	                    this.el.append(this.field).css({height:'auto'});
	                    this.field.height(this.height);
	                }
	});
	
	
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
	
	
	/* WUI Radio */
	Wui.radio = function(args){ 
		$.extend(this,{
			buttonStyle:false,
			name:       'wui-radio',
			options:    [],
			onChange:   function(){},
			tplt:		'<li><input type="radio" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
		},args,{
			el:$('<div>')
		});
		this.init();
	};
	Wui.radio.prototype = $.extend(new Wui.frmField(),{
		init:       function(){
        				Wui.frmField.prototype.init.call(this);
        				this.el.addClass('wui-radio');
						
        				var me = this,
							tplEngine = new Wui.tplt({ tplt:this.tplt }),
							ul = $('<ul>');
							
						//make radio group look like buttons
						if(me.buttonStyle) ul.addClass('button');
						
						me.el.append(ul);
						$.each(me.options,function(i,itm){
							itm.name = me.name;
					        itm.id = me.name + '-' + i;
					        ul.append(
					        	tplEngine.make(tplEngine.data = itm)
					        	.children('label').attr({unselectable:'on'}).end()
					        	.children('input')
					        	.change(function(){ me.itmChange($(this)); })
					        	.focus(function(){ul.addClass('has-focus');})
					        	.blur(function(){ul.removeClass('has-focus');})
					        	.end()
					        );
						});
                    },
		itmChange:	function(elem){
			        	this.value = elem.val();
					    this.onChange(this);
			        },
		onRender:	function(){
				        var me = this;
        				me.el.find('input').each(function(){
					        $(this).css({ margin:'0 5px 0' + ((me.buttonStyle ? -1 : 0) * (5 + $(this).outerWidth())) + 'px' });
				        });
						Wui.frmField.prototype.onRender.call(this);
			        },
        val:        function(setVal){
                        if(setVal === undefined){
                            return this.value;
                        }else{
                            this.value = setVal;
                            this.el.find("input[value='" + setVal + "']").attr('checked',true);
                        }
                        
                        this.onChange(this);
                    }
	});


	/* WUI Checkbox */
	Wui.checkbox = function(args){ 
		$.extend(this,{
			name:   'wui-checkbox',
			tplt:	'<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
		},args);
	this.init(); };
	Wui.checkbox.prototype = $.extend(new Wui.radio(),{
        calcVal:	function(){
						var me = this;
        				me.value = [];
        				me.el.find('input:checked').each(function(){
			        		me.value.push($(this).attr('value'));
			        	});
						return ((me.value.length > 0) ? (me.value.length > 1) ? me.value : me.value[0] : 0);
					},
		init:       function(){
                        if(this.options.length == 0) this.options.push({val:1,title:''});
        				
                        Wui.radio.prototype.init.call(this);
        				this.el.removeClass('wui-radio').addClass('wui-checkbox');
						
        				//steal label if button style
        				if(this.options.length == 1){
        					this.el.find('li label').text(this.el.children('label').text());
        					this.el.children('label').text('');
        				}
                    },
        itmChange:	function(elem){
			        	this.onChange(this.calcVal());
			        },
        val:        function(setVal){
                        var me = this;
        	
        				if(setVal === undefined){
                            return this.calcVal();
                        }else{
                            if(me.options.length == 1 && (typeof setVal == 'number' || typeof setVal == 'string')){
								me.el.find('input').attr('checked',!!setVal).siblings('li').toggleClass('checked',!!setVal);
							}else{
								// clear out all checkboxes
								me.el.find('input').attr('checked',false);
								me.el.find('label').removeClass('checked');
								
								// set the ones passed in
								$.each(setVal, function(i,v){
									me.el.find('input[value=' +v+ ']').attr('checked',true).siblings('li').addClass('checked');
								});
							}
                        	me.onChange(me.calcVal());
                        }
                    },
		validTest:	function(){ if(this.required && this.val() == 0) return false;	return true; }
	});


	/* WUI Combo */
	Wui.combo = function(args){ 
		$.extend(this, {
			autoLoad:   false,
			data:       [],
			dataChanged:function(newData){},
			dd:			null,
			ddCls:		'',
			doSearch:   function(){},
			emptyText:  '(empty)',
			field:$('<input>').attr({type:'text'}),
			inputTarget:null,
			keepInline:	false,
			minKeys:    2,
			onBlur:     function(){},
			onError:    function(){},
			selectItm:  null,
			titleItem:  null,
			value:      null,
			valueItem:  null,
			remoteParams:{},
			remoteUrl:  null,
			remoteWait: false,
			unsearched: null,
			valChange:  function(){}
		},args,{
			cls:(args.cls) ? args.cls + ' wui-combo' : 'wui-combo',
		}); 
		
		// Create template when one hasn't been defined
		if(	this.hasOwnProperty('valueItem') && this.hasOwnProperty('titleItem') && !this.hasOwnProperty('template') && this.valueItem.length &&
			 this.valueItem.length > 0 && this.titleItem.length && this.titleItem.length > 0) this.template = '<li>{' +this.titleItem+ '}</li>';

		this.init(); 
	};
	Wui.combo.prototype = $.extend(new Wui.text(),{
		enterKey:   function(){
                        if(this.selectItm !== null)   this.selectItm.click();
                    },
		keyDown:    function(){
                        if(!this.dd.is(':visible')){
                            this.selectCurr();
                            this.showDD();
                        }else{
                            var si = (this.selectItm === null) ? 0 : this.selectItm.index();
                            var idx = (si == this.data.length - 1) ? 0 : si + 1;
                            this.rsltHover(this.dd.children(':eq(' + idx + ')'));
                        }
                    },
        keyUp:      function(){
                        if(this.selectItm !== null){
                            var idx = this.selectItm.index() - 1;
                            
                            if(idx < 0){
                                this.field.focus();
                                this.dd.children().removeClass('selected');
                                this.selectItm = null;
                            }else{
                                this.rsltHover(this.dd.children(':eq(' + idx + ')'));
                            } 
                        }
                    },
		hideDD:     function(){this.dd.hide();},
		init:       function(){
                        var me = this,
							ddAddCls = (me.keepInline) ? 'wui-inline-dd' : '';
                        
						//setup template engine
                        me.tplEngine = new Wui.tplt({tplt:me.template});
                        
                        //put field inside a wrapper and add drop down switch if part of a form
                        if(me.dd === null){
                            Wui.text.prototype.init.call(me);
							me.wrapper = $('<div>').addClass('dd-wrapper');
                        	me.ddSwitch = new Wui.button({
		                        click:		function(){
					                            if(!me.dd.is(':visible')){
					                                me.field.focus();
					                                me.selectCurr();
					                                me.showDD();
					                            }else{
					                                me.hideDD();
					                            }
					                        },
		                        text:		'',
		                        attr:		{tabindex:-1},
		                        appendTo:	me.wrapper,
		                        cls: 		'field-btn dd-switch'
		                    });
                            
							me.wrapper.append(
	                        	me.dd = $('<ul>').addClass('wui-combo-dd ' + ddAddCls + ' ' + me.ddCls),
	                        	me.field.addClass('has-dd')
	                        ).appendTo(me.el);
                            me.ddSwitch.place();
                        }else{
							Wui.text.prototype.setListenrs.call(me,me);
						}
						
                        if(me.autoLoad)   me.loadData();
                        else              me.renderData();
                    },
		loadData:   function(ajaxSuccess){
                        var me = this;
                        $.ajax(me.remoteUrl, {
                            data:       me.remoteParams,
                            dataType:	'json',
                            success:    function(d){ 
                                            if(ajaxSuccess !== undefined && typeof ajaxSuccess == 'function')   ajaxSuccess.call(this,d);
                                            else                                                                me.setData(d.payload);
                                        },
                            error:      function(e){
                                            me.dd.html(this.emptyText);
                                            me.remoteWait = false;
                                            me.onError(e);
                                        }
                        });
                    },
		renderData: function(){
                        var me = this,
                        	holder = $('<ul>');
                        me.dd.html('');
                        if(this.data.length > 0){ 
                            for(var i = 0; i < this.data.length; i++){
	                            me.tplEngine.data = this.data[i];
                                holder.append(me.tplEngine.make()
		                            .mouseenter(function(evnt){ me.rsltHover(evnt); })
		                            .mousedown(function(e){me.field.isBlurring = false;})
		                            .click(function(){ me.rsltClick(); }));
                            }
                            me.dd.append(holder.children().unwrap());
                        }else{ 
                            me.dd.html(this.emptyText);
                        }
                        
                        return true;
                    }, 
        rsltClick:  function(){
                        this.hideDD();
                        this.val(this.data[this.selectItm.index()]);
                    },
		rsltHover:  function(itmTarget){
                        if(itmTarget.addClass === undefined) {var itmTarget = $(itmTarget.currentTarget);}
                        this.dd.children().removeClass('selected');
                        this.selectItm = itmTarget;
                        this.selectItm.addClass('selected');
                    },
		searchData: function(srchVal){
                        var me = this;
                        if(me.remoteUrl !== null && srchVal.length > me.minKeys){
                            if(me.remoteWait == false){
                                me.remoteWait = true;
                                $.extend(me.remoteParams,{srch: srchVal});
                                me.loadData(
                                    function(d){ 
                                        if(d.payload)   me.setData(d.payload);  //assumes that incoming json data will be in a 'payload' array
                                        me.remoteWait = false;
                                        if(me.unsearched !== null){
                                            var a = me.unsearched;
                                            me.unsearched = null;
                                            me.searchData(a);
                                        }
                                    }
                                );
                            }else{
                                me.unsearched = srchVal;
                            }
                        }else{
                            me.showDD();
                            me.rsltHover(me.dd.children(':contains(' +srchVal+ '):first'));
                        }
                    },
        selectCurr: function(i){
                        if(i === undefined && this.value !== null){
                            for(var d in this.data){
                                if(this.data[d][this.valueItem] === (this.value[this.valueItem] || this.value))   { i = d; break; }
                            }
                        }
                        this.rsltHover(this.dd.children(':eq(' +i+ ')'));
                    },
		setData:    function(newData){
                        this.data = newData;
                        this.renderData();
                        this.dataChanged(newData);
                    },
		setListenrs:function(t){
                        t.field.focus(function(e){
                            t.field.isBlurring = undefined;
                        })
                        .blur(function(e){
                            if(t.field.isBlurring !== false){
                                t.hideDD();
                                t.onBlur();
                            }
                         })
                        .click(function(){
                            t.showDD();
                        })
                        .keyup(function(evnt){
                            var currVal = t.field.val();
                            switch(evnt.keyCode){
                                case 40:    /*Do Nothing*/  break;
                                case 38:    /*Do Nothing*/  break;
                                case 13:    /*Do Nothing*/  break;
                                case 9:     /*Do Nothing*/  break;
                                default:    t.searchData(currVal);
                            }
                        })
                        .keydown(function(evnt){
                            var currVal = t.field.val();
                            
                            //clear the value if the user blanks out the field
                            if(currVal.length == 0) t.value = null;
                            
                            if(t.data.length > 0){
                                switch(evnt.keyCode){
                                    case 40:    t.keyDown();   break;
                                    case 38:    t.keyUp();     break;
                                    case 13:
                                    case 9:     t.enterKey();  break;
                                }
                                
                                //scroll the list to the currently selected item
                                if(t.selectItm !== null){
                                    var beforeHeight = 0;
                                    t.selectItm.siblings(':lt(' +t.selectItm.index()+ ')').each(function(){ beforeHeight+= $(this).outerHeight(); });
                                    t.selectItm.parent().animate({scrollTop:beforeHeight}, 100);
                                }
                            }
                        });
                        return t.field;
                    },
		showDD:     function(){
						if(!this.keepInline){
							var fld		= this.field,
								ofst	= fld.offset(),
								ddWid	= parseInt(this.dd.css('width')),
								width	= (ddWid && ddWid > fld.outerWidth()) ? ddWid : fld.outerWidth() - 1;
							
							this.dd.appendTo('body').css({
								left:	ofst.left + ((ofst.left + width < $.viewportW()) ? 0 : fld.outerWidth() - width),
								top:	ofst.top + fld.outerHeight(),
								width:	width,
								display:'block',
								zIndex:	Wui.maxZ()
							});
						}else{
							this.dd.css({ zIndex:Wui.maxZ() }).show();
						}
					},
        val:        function(setVal){        
        				var me = this;
						if(setVal === undefined){
                            return (me.value === null || typeof me.value != 'object') ? me.value : me.value[me.valueItem];
                        }else{
                            if(setVal === null){
                                me.value = {};
                                me.data = [];
                                me.renderData();
								Wui.text.prototype.val.call(me,'');
                            }else if(typeof setVal == 'object'){
                                me.value = setVal;
                                
                                //add the piece of data to the dd data if it does not exist there
                                var addData = true;
                                for(var d in me.data) if(me.data[d] == setVal) addData = false;
                                if(addData){
                                    me.data.push(me.value);
                                    me.renderData();
                                }
                                var selectVal = me.value[me.valueItem];
                            }else{
                                me.value = setVal;
                                var selectVal = me.value;
                            }
                            
                            //select the item out of the data set
                            for(var d in me.data){
                                if(me.data[d][me.valueItem] === selectVal){
                                    me.selectCurr(d);
									Wui.text.prototype.val.call(me,me.data[d][me.titleItem]);
                                    break;
                                }
                            }
                            
                            me.valChange();
                            return setVal;
                        }
                    }
	});


	
	/* WUI Link */
	Wui.link = function(args){ 
		$.extend(this,{
			invalidMsg: 'The value for \'' + ((this.label) ? this.label : (this.args && this.args.name) ? this.args.name : 'a link field') + '\' is not a properly formatted link.',
			target:     '_self',
			title:      null,
			uri:        null
		},args);
		this.init();
	};
	Wui.link.prototype = $.extend(new Wui.frmField(),{
		buildOutput:function(){
                         if(this.outputFld === undefined)	this.elAlias.append(this.outputFld = $('<div>').attr({tabindex:-1}).addClass('feedback'));
        	
        				if(this.testLink()){
                            this.outputFld.html('Preview: ');
                            this.outputFld.append($('<span/>').append($("<a>").attr({href:this.uri, target:'_blank'}).text(this.title)));
                            if(this.target == '_blank')    this.outputFld.append($('<span>').addClass('uri-new-win'));    
                        }else{
                            this.outputFld.html('Your link is improperly formatted.');
                        }
                            
                    },
		init:       function(){
                        var me = this;
                        
                        me.items = [
                        	me.urlField = new Wui.text({cls:'wui-link-third wui-link-focus', blankText:'URL', linkData:'uri'}),
                        	me.titleField = new Wui.text({cls:'wui-link-third', blankText:'Display Text', linkData:'title'}),
                        	me.targetField = new Wui.combo({
	                            cls:'wui-link-third no-margin', valueItem: 'target', titleItem:'name', template: '<li>{name}</li>', blankText:'Target', keepInline:true,
	                            data:[{target:'_self', name:'Opens In Same Window'}, {target:'_blank', name:'Opens In New Window/Tab'}], linkData:'target'
	                        })
                        ];
                        
                        Wui.frmField.prototype.init.call(me);
                        
                        me.el.append(me.elAlias = $('<div>').addClass('wui-hyperlink'));
                        
                        //additional listeners and initial value for target
                        me.setLisners(me.urlField,me.titleField,me.targetField);
                        me.targetField.val(me.target);
                       
                        me.urlField.field.keyup(function(e){
                            //sets the title the same as the url - for laziness' sake
                        	if(me.titleField.field.val() == me.titleField.blankText)
                        		me.title = null;
                            if(me.title === null)
                            	me.titleField.val($(this).val());
                        })
                        .blur(function(){me.title = me.titleField.val()});
                    },
		setLisners: function(){
                        var me = this,
                        	flds = arguments;
                        	
                        $.each(flds,function(idx,itm){
	                        (itm.field.field || itm.field).on('blur click keyup keydown mousedown', null, itm, function(e){
                                var wuiObjVal = (e.data.field.val) ? e.data.field.val() : e.data.val();
                            	if(wuiObjVal !== null && wuiObjVal != {})
                                me[e.data.linkData] = wuiObjVal;
                                me.buildOutput();
                            })
                            .on('focus',null, itm, function(e){
                                for(var i in flds)
                                    flds[i].el.removeClass('wui-link-focus');
                                e.data.el.addClass('wui-link-focus');
                            });
                        });
                    },       
            
        testLink:   function isUrl() {
                        var fullPath = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                        var relativePath = /(\/|\/([\w#!:.?+=&%@!\-\/]))/
                        return (fullPath.test(this.uri) || relativePath.test(this.uri));
                    },   
        val:        function(setVal){
                        if(setVal === undefined){
                            return {uri:this.uri, target:this.target, title:this.title};
                        }else{
                            $.extend(this,setVal);
                            this.urlField.val(this.uri);
                            this.titleField.val(this.title);
                            this.targetField.val(this.target);
                            this.buildOutput();
                        }
                    },
		validTest:	function(){ if(this.required && !this.testLink()) return false; return true; }
	});
    
    
    /* WUI DateTime */
	Wui.datetime = function(args){ 
		$.extend(this,{
			valChange:	function(val){}
		},args,{
			field:		$('<input>').attr({type:'text'})
		});
		this.init();
	};
	Wui.datetime.prototype = $.extend(new Wui.text(),{
		second:         1e3,
        minute:         6e4,
        hour:           36e5,
        day:            864e5,
        days:           ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],
        shortDays:      ["sun","mon","tue","wed","thu","fri","sat"],
        months:         ["january","february","march","april","may","june","july","august","september","october","november","december"],
        shortMonths:    ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
        sarcasmArray:   ["Not quite.","Huh?","Nope","Arg..","Sorry","What?","Bleck.","Nuh-uh.","Keep Trying.","No Entiendo."],
        minDate:        null,
		prevText:       null,
        value:          null,
		
        displayDate:    function(overrideText){
                            var me = this;
        					//fire the valChange event when the data changes from typing or calendar selection
                            me.valChange(me.value);
                            
                            // process current date value
                            if(overrideText != undefined){ me.displayDiv.html(overrideText); return; }
                            if(me.value == "" || me.value === null) { return; }
                            
                            //validation for min-date
                            var formattedDate = me.formatDateTime(me.value);
                            if(!(me.minDate != null && me.value < me.minDate)){
                                me.displayDiv.html(formattedDate.date + ' ' + formattedDate.time);
                            }else{
                                me.displayDiv.html('Less than minimum required date of ' + 
                                                    (me.minDate.getMonth() + 1) + '-' + me.minDate.getDate() + '-' + me.minDate.getFullYear());
                            }
                            
                            return  (me.value.getMonth() + 1) + '/' + me.value.getDate() + '/' + me.value.getFullYear() + ' ' + formattedDate.time;
                        },
         formatDateTime:function(dateObj){
					        if(dateObj instanceof Date){
						        var hours = dateObj.getHours(),
	                                minutes = dateObj.getMinutes(),
	                                formattedTime = ((hours < 13) ? (hours > 9) ? hours : '0' + hours : (hours - 12)) + ':' + 
	                                ((minutes > 9) ? minutes : '0' + minutes) + ' ' + 
	                                ((hours < 12) ? 'AM' : 'PM'),
	                                formattedDt = (this.days[dateObj.getDay()].substr(0,3)) + ' ' + 
	                                            (dateObj.getMonth() + 1) + '-' + dateObj.getDate() + '-' + 
	                                            dateObj.getFullYear();
								return {date:formattedDt, time:formattedTime};
					        }else{
						        return {date:'Invalid', time:'Invalid'};
					        }
					        
				        },
		 getM:          function(num){
                            var magnitude = 0;
                            while((num = num / 10) >= 1)    magnitude++
                            return magnitude;
                        },
		init:           function(){
                            var me = this;
        					Wui.text.prototype.init.call(me);
                            me.el.append(
                                $('<div>').addClass('wui-date').append(
                                    me.setListenrs(me),
                                    me.displayDiv = $("<div>").addClass('feedback').attr({tabindex:-1})
                                )
                            );
                                
                            //add jQuery datepicker (calendar) to the field
                            me.field.datepicker({
                                autoSize:       true,
                                buttonText:     '',
                                showOn:         'button',
                                minDate:        me.minDate,
                                constrainInput: false,
                                beforeShow:     function(txtElem, pickerObj){
                                                    if(me.validDate(me.value))  me.field.datepicker('setDate',me.value);
                                                    else                        me.val('');
                                                },
                                onSelect:       function(dateString, pickerObj){
                                                    if(me.value !== null){
                                                        me.value.setDate(pickerObj.selectedDay);
                                                        me.value.setMonth(pickerObj.selectedMonth);
                                                        me.value.setYear(pickerObj.selectedYear);
                                                    }else{
                                                        me.value = me.field.datepicker('getDate');
                                                    }
                                                    me.val(me.displayDate());
                                                }
                            });
                            me.el.find('.ui-datepicker-trigger').attr({tabindex:-1});
                        },
		num2Dec:        function (words){
                            var numberRepl = {  a:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,
                                thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,
                                thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100,thousand:1e3,
                                million:1e6,billion:1e9,trillion:1e12,quadrillion:1e15,quintillion:1e18
                            };
                
                            //replace the written words with numbers
                            words = words.toString().replace(/ and /g,' ').replace(/-/g,' ');
                            for(var itm in numberRepl)
                                words = words.replace(new RegExp('(^|[ ]|-)' + itm + '(-|[ ]|$)','g'),' ' + numberRepl[itm] + ' ');
                            
                            var wArray = $.trim(words).split(/[ ]+/); 
                                partsArry = [],
                                finalNum = 0,
                                pos = 0;
   
                            //separate by numbers larger than 100
                            while(wArray[pos]){
                                if(this.getM(wArray[pos]) > 2){
                                    partsArry.push(wArray.splice(0,pos + 1));
                                    pos = 0;
                                }
                                pos++;
                            }
                            partsArry.push(wArray);
                           
                            for(nums in partsArry){
                                var tmp = this.txt2Num(partsArry[nums]);
                                if(parseInt(tmp))
                                    finalNum += parseInt(tmp);
                            }
                           
                            return finalNum;
                        },
		processDate:    function(){
                            var me = this,
                            	dateString = Wui.text.prototype.val.call(me);
                            
                            if (dateString.length > 0) {
                                var genDate = me.translateDate(dateString);
                                
                                //Returns a message to the user that the program doesn't understand them
                                if(genDate.toString() == 'Invalid Date'){
                                    me.displayDate(me.sarcasmArray[Wui.randNum(0,(me.sarcasmArray.length -1))]);
                                    return;
                                }
                                
                                me.value = genDate;
                                me.displayDate();
                                return genDate;
                            }else{
                                me.value = null;
                                me.displayDate('');
                            }
                        },
        retDBString:    function(){
                            var me = this,
	                            hours = me.value.getHours(),
	                            minutes = me.value.getMinutes(),
	                            seconds = me.value.getSeconds(),
	                            time = ((hours > 9) ? hours : '0' + hours) + ':' + ((minutes > 9) ? minutes : '0' + minutes) + ':' + 
	                                   ((seconds > 9) ? seconds : '0' + seconds);
            
                            return me.value.getFullYear() + '-' + (me.value.getMonth() + 1) + '-' + me.value.getDate() + ' ' + time;
                        },
		setListenrs:    function(t){
                            t.field.keyup(function(evnt){
                                var txtVal = $.trim($(this).val());
                                if(t.prevText != txtVal) 
                                    t.processDate(txtVal); 
                                t.prevText = txtVal;
                            });
                            return t.field;
                        },
		setMinDate:     function(minDt){ 
                            this.minDate = this.translateDate(minDt.toString());
                            this.field.datepicker( "option", "minDate", new Date(me.minDate.valueOf() + me.minute));
                        },
		translateDate:  function(ds){
                            var me			= this,
                            	now         = new Date(), 
                                orig        = ds,
                                dateReg     = /\d{1,2}\/\d{1,2}\/\d{2,4}/,
                                ifDateReg   = /([a|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|and,\d,\s,-]+)\s((millisecond|second|minute|hour|day|week|month|year)+[s]*)\s(from|after|before|previous to)+\s(.+)$/,
                                intvF       = ifDateReg.exec(ds.toLowerCase());
                            
                            //for interval specifications
                            if(intvF !== null){
                                var n        = me.num2Dec(intvF[1]),
                                    interval = {millisecond: 1,second:me.second,minute: me.minute,hour:me.hour,day:me.day,week:me.day * 7,year:(365 * me.day),
                                                month:(365 * me.day)/12},    //definition of month needs improvement
                                    intv    = interval[intvF[3]],
                                    directn = {from:1, after:1, before:-1, 'previous to':-1},
                                    dir     = directn[intvF[4]],
                                    dt      = me.translateDate(intvF[5]);
                                   
                                    return new Date(dt.valueOf() + (n * dir * intv));      
                            }
                           
                            //returns a match for "now"
                            if(ds.toLowerCase().match(/now/) !== null){ return now; }
                            
                            
                            if(ds.toLowerCase().match(/[stephen|steve] nielsen/) !== null){var e=now.getFullYear(),t="5/26/"+e,n=new Date(t);t=n>now?t:"5/26/"+(new Date(now.valueOf()+me.day*365)).getFullYear()+" ";me.value=new Date(t);var r=me.value.getMonth()+1+"/"+me.value.getDate()+"/"+me.value.getFullYear()+" "+" - "+parseInt((me.value.valueOf()-now.valueOf())/me.day)+" days left to buy a present.";me.displayDate(r); return}
                            ds = ds.toLowerCase()
                            .replace('noon','12')
                            .replace('midnight','00:00')
                            .replace(/o.clock/,'')
                            .replace(/(\d+)[st|nd|rd|th]+/,function(m,dt){ return dt; })                        // Strip 'nd', 'th', 'rd', 'st'
                            .replace(/(\d{4})-(\d{1,2})-(\d{1,2})/g,function(m,yr,mm,dd){                       // Change UTC dates to ISO
                                return mm + '/' + dd + '/' + yr;
                            })
                            .replace(/(\d{1,2})-(\d{1,2})-(\d{2,4})/g,function(m,mm,dd,yr){                     // Change other UTC dates to ISO
                                return mm + '/' + dd + '/' + yr;
                            })
                            .replace(/^(\d{1,2})-(\d{1,2})[\s]*/,function(m,mm,dd){ return mm + '/' + dd + ' '; }) // Change other UTC dates to ISO
                            .replace('at','@')                                                                  // Replace at with the @ symbol
                            .replace(/(today|tomorrow|yesterday)/,function(m,f){                                // Translate today, tomorrow & yesterday into dates
                                     var replaceDays = {'today':0, 'tomorrow':1, 'yesterday':-1}
                                         newDt = new Date(now.valueOf() + (me.day * replaceDays[f]));
                                     return  (newDt.getMonth() + 1) + '/' + newDt.getDate() + '/' 
                                     + newDt.getFullYear();
                                 })
                            .replace(/(next|last) ([a-z]{3,10})[ ]*([0-9]+)*/,function(n, dir, word, day){      // Translate days of week & months into dates
                                 var dayVal = me.day * ((dir == 'next') ? 1 : -1),
                                     dy = ($.inArray(word,me.days) > -1) ? $.inArray(word,me.days) 
                                     : $.inArray(word,me.shortDays),
                                     month = ($.inArray(word,me.months) > -1) ? $.inArray(word,me.months) 
                                     : $.inArray(word,me.shortMonths),
                                     useNum = (dy > -1) ? dy : (month > -1) ? month : -1,
                                     useFunc = (dy > -1) ? 'getDay' : (month > -1) ? 'getMonth' : '';
                                     
                                 if(useNum > -1){
                                     var nxt = now.valueOf(), inc = new Date(nxt += dayVal);
                                     while(inc[useFunc]() != useNum){
                                         nxt += dayVal;
                                         inc = new Date(nxt);
                                     }
                                     if(month != undefined && month != -1 && day.length != 0){
                                         inc.setDate(parseInt(day));
                                     }
                                     return (inc.getMonth() + 1) + '/' + inc.getDate() + '/' 
                                       + inc.getFullYear() + ' ';
                                 }else{
                                     return '';
                                 }
                             })
                             .replace(/(\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|-)+\b)/g,function(m,f){
                                 return me.num2Dec(f);                                                            // Converts number text to decimals
                             })
                             .replace(/([a-z]{3,10}) (\d{1,2})[,]*/, function(m,f,s){                             // Translate 'Month DD' to 'MM/DD'
                                 return ((($.inArray(f,me.months) > -1) ? $.inArray(f,me.months) : 
                                     $.inArray(f,me.shortMonths)) + 1) + '/' + s;
                             })
                            .replace(/^(\d{1,2}\/\d{1,2}(?![\d]))([\s|\/]*)(\d{0,4})/, function(m,dt,s,yr){      // Add century to dates with ambiguous years
                                if(yr.length == 2){
                                    var thisYear = parseInt(now.getFullYear().toString().substr(2,4)),
                                        thisCentury = parseInt(now.getFullYear().toString().substr(0,2)) * 100,
                                        inputYear = parseInt(yr),
                                        yearDiff = 100 - inputYear,
                                        centuryDiff = (thisYear < 50)    ? -100 * ((yearDiff >= 50) ? 0 : 1) 
                                         : 100 * ((yearDiff < 50) ? 0 : 1),
                                        retYear = thisCentury + inputYear + centuryDiff;
                                    return dt + '/' + retYear;    
                                }else if(yr.length == 4){
                                    return dt + '/' + yr;
                                }else{
                                    retDt = dt + '/' + now.getFullYear().toString();
                                    withDt = new Date(retDt);
                                    return (withDt.valueOf() > now.valueOf()) ? retDt : dt + '/' + new Date(now.valueOf() 
                                      + (me.day * 365)).getFullYear() + ' ';
                                }
                            })
                            .replace(/(\d{1,2}\/\d{1,2})\s(\d{4})/,function(m,dt,yr){return dt + '/' + yr; })   // Remove space in instances of '3/21 2012'
                            
                            //Adds today's date to strings that have no date information specified
                            ds = (dateReg.test(ds) == true) ? ds : (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() +' '+ ds;
                          
                            /* Adds an @ symbol for time strings that aren't UTC spec so that they can be modified later */
                            ds = ds.replace(/(\d{1,2}\/\d{1,2}\/\d{4})\s(.+)/,function(m,dt,ts){
                             if(ts.indexOf('@') == -1)   ts = '@ ' + ts;
                             return dt + ' ' + ts;
                            })
                            
                            /* Translate colloquial times */
                            .replace(/\d[ ]*[a|p]$/,function(m){ return m + 'm'; })
                            .replace(/[a|p][.][m]*[.]*/,function(m){ return m.replace(/[.]/g,'') })
                            .replace(/\d.m/,function(m){ return m.substring(0, m.length - 2) + ' ' + m.substring(m.length - 2, 3) })
                            .replace(/@ (\d+[ ]\d+)/,function(m,f){ return f.replace(' ',':'); })
                            .replace(/@ (\d+)/,function(m,f,p,o){ 
                                if(o.indexOf(':') != -1) return m;
                                else                     return m.trim() + ':00 ';
                            })
                            .replace(/@/g,''); // Firefox & IE don't like the @ symbol being used

                            return new Date(ds);
                        },
		txt2Num:        function(wArray){
                            //split into an array and combine them according to magnitude
                            var pos = 0, theNum = 0;
                           
                            if(wArray.length == 1){
                                return wArray[0];
                            }else{
                                while(wArray[pos + 1] !== undefined){
                                    var currNum = parseInt(wArray[pos]),
                                        nextNum = parseInt(wArray[pos + 1]),
                                        lastNum = parseInt(wArray[wArray.length - 1]),
                                        smallerThanNext = this.getM(currNum) <= this.getM(nextNum);
                                       
                                    if(pos == 0){
                                        theNum = (smallerThanNext) ? currNum * nextNum : currNum + nextNum;
                                    }else{
                                        if(smallerThanNext) theNum *= nextNum;
                                        else                theNum += nextNum;
                                    }
                                    pos++;
                                }
                            }
                           
                            if(lastNum != nextNum)  return (this.getM(lastNum) > 2) ? theNum *= lastNum : theNum += lastNum;
                            else                    return theNum;
                        },
		val:            function(setVal){
                            if(setVal === undefined){ return this.value; }
                            else{
                                if(setVal !== null){
                                    if(typeof setVal == 'string'){
                                        Wui.text.prototype.val.call(this,setVal);
										this.processDate();
                                    }else{
                                        this.value = setVal;
										 Wui.text.prototype.val.call(this,this.displayDate());
                                    }
                                }
                                else{
									Wui.text.prototype.val.call(this,'');
									this.displayDiv.html('');
									this.value = null;
								}
                                this.valChange(this.value);
                            }
                        },
		validDate:       function(dt){
                            if(dt != null && dt.toString() == 'Invalid Date')   return false;
                            else if (dt == null)                                return false;
                            else                                                return true;
                        }
	});


	/* WUI File */
	Wui.file = function(args){ 
		$.extend(this,{
			beforSelect:function(){},
			fileTypeFilter: null,
			upFieldName:'fileupload',
			upParams:   {},
			upSuccess:  function(){},
			upTarget:   '',
			upTitleName:'title'
		},args,{
			field:	$('<input>').attr({type:'text'})
		}); 
		this.init();
	};
	Wui.file.prototype = $.extend(new Wui.text(),{
		changeClick:function(){
                         //swap buttons
                         this.changeBtn.el.fadeOut('fast');
                         this.upBtn.el.parents('div:first').fadeIn('slow'); 
                         this.field.removeClass().focus();
                     },
		onSelect:   function(fileControl){
                        this.beforSelect(fileControl, this);
                        
                        //add title to parameters and parameters to the file upload
                        var titleParam = {};
						this.beforeSelectTitle = Wui.text.prototype.val.call(this);
                        titleParam[this.upTitleName] = Wui.text.prototype.val.call(this);
						
						// for file filtering
						if(this.fileTypeFilter !== null) $.extend(titleParam,{file_type_filter:this.fileTypeFilter});
						
                        fileControl.params($.extend(this.upParams, titleParam));
                        //upload file
                        fileControl.submit();
                    },
		init:       function(){
                        var me = this;
        				Wui.text.prototype.init.call(me);
						me.el.addClass('wui-file-upload');
						me.wrapper = me.elAlias = $('<div>').addClass('file-wrapper').append(me.field).appendTo(me.el);
        				me.push(
							me.changeBtn = new Wui.button({
								click:  function(){ 
											Wui.text.prototype.val.call(me,'');
											me.field.removeAttr('disabled'); 
											me.changeClick(); 
										},
								text:   'X',
								attr:	{tabindex:-1},
								cls:    'file-change field-btn',
								parent:	me
							})
						);
                        
						me.upBtn = new Wui.button({text:'Browse', cls:'field-btn', attr:{tabindex:-1}});
						me.cssByParam(me.upBtn).appendTo(me.wrapper).upload({
                            name:       this.upFieldName,
                            action:     this.upTarget,
                            autoSubmit: false,
                            onSubmit:   function() { 
                                            me.field.addClass('has-file uploading').attr('disabled', true).val('uploading...');
                                        },
                            onFocus:    function(){ me.upBtn.el.addClass('selected'); },
                            onBlur:     function(){ me.upBtn.el.removeClass('selected'); },
                            onComplete: function upComplete(r){
                                            try{
                                            	var d = $.parseJSON(r);
												console.log(d);
                                                me.field.removeClass('uploading empty'); //remove the css uploading state
                                                
												if(d.success == true && d.payload){
													me.val(d.payload,'upSuccess');
												}else{
													if(d.errors && d.errors[0] && d.errors[0].fileTypeError){
														Wui.errRpt(d.errors[0].fileTypeError,'Invalid File Type');
														me.field.removeClass('has-file uploading').removeAttr('disabled');
														if(me.beforeSelectTitle)
															Wui.text.prototype.val.call(me, me.beforeSelectTitle);
													}else{
														me.upFailure(r);
													}
												}
                                            }catch(err){
                                                console.log(err,r);
                                                me.upFailure(err,r);
                                            }
                                        },
                            onSelect:   function() { me.onSelect(this); }
                        });
                    },
		upFailure:  function(e,e2){
                        console.log(e,e2);
						Wui.text.prototype.val.call(this,'Upload Failure');
                    },
        val:        function(setVal, callback){
                        if(setVal !== undefined)    { 
                            this.value = this.value || {};
                            $.extend(this.value,setVal);
                            if(typeof this[callback] == 'function') {this[callback]();}
                            this.valChange();
                        }else{
                            return this.value || {};
                        }
                    },
        valChange:  function(){
                        var me = this;
        				me.field.addClass('has-file').removeAttr('disabled');
                        me.upBtn.el.parents('div:first').hide();
                        me.changeBtn.el.show();
                        
                        //changed to a 'file-selected' view and display a nicely formatted file
                        me.field
                        	.val(me.value[me.upTitleName])
                        	.addClass('has-file ' + ((me.value.extension !== undefined) ? 'icon-' + me.value.extension.replace('.','') : ''))
                        	.attr('disabled',true);
                    }
	});
	
	
	Wui.input = function(msg, msgTitle, callback, inputs, content){
		// make sure the inputs will be acceptable on the form
		if(inputs){
			if(!inputs.length){
				if(inputs instanceof Wui.frmField || inputs.ftype)
					inputs = [inputs];
				else
					inputs = [{ftype:'Wui.text'}];
			}
		}else{
			inputs = [{ftype:'Wui.text'}];
		}
		if(inputs.length == 1)	$.extend(inputs[0],{label:msg, required:true, name:'inputField'});
		if(content !== undefined) inputs.splice(0,0,{ftype:'Wui.note', label: content});
		
		// create the form and the window
		var inputFrm = new Wui.form({ labelPos:'left', items:inputs }),
			Msg = new Wui.window({
				title:      msgTitle || 'Input',
				bbar:		[ new Wui.button({text:'Submit', click:function(){ Msg.getVal(); }}) ],
				isModal:    true,
				items:      [inputFrm],
				cls:		'wui-input-window',
				width:      600, 
				height:     250,
				getVal:		function(){
								var formData = inputFrm.getData();
								if(formData){
									if(callback && typeof callback == 'function'){
										var len = 0;
										for(var n in formData) len++;
										if(len == 1 && formData.inputField)	callback(formData.inputField);
										else 								callback(formData);
									}
									Msg.answerRun = true;
									Msg.close();
								}
							},
				onWinClose: function(){ return ((Msg.answerRun !== true) ? false : Msg.answerRun); }
			});
	    return inputFrm;
	}
}(jQuery));


/**
* jHtmlArea 0.7.5 - WYSIWYG Html Editor jQuery Plugin
* Copyright (c) 2012 Chris Pietschmann
* http://jhtmlarea.codeplex.com
* Licensed under the Microsoft Reciprocal License (Ms-RL)
* http://jhtmlarea.codeplex.com/license
* 
* Modified 2013 Stephen Nielsen
*/
(function ($) {
    $.fn.htmlarea = function (opts) {
        if (opts && typeof (opts) === "string") {
            var args = [];
            for (var i = 1; i < arguments.length; i++) { args.push(arguments[i]); }
            var htmlarea = jHtmlArea(this[0]);
            var f = htmlarea[opts];
            if (f) { return f.apply(htmlarea, args); }
        }
        return this.each(function () { jHtmlArea(this, opts); });
    };
    var jHtmlArea = window.jHtmlArea = function (elem, options) {
        if (elem.jquery) {
            return jHtmlArea(elem[0]);
        }
        if (elem.jhtmlareaObject) {
            return elem.jhtmlareaObject;
        } else {
            return new jHtmlArea.fn.init(elem, options);
        }
    };
    jHtmlArea.fn = jHtmlArea.prototype = {

        // The current version of jHtmlArea being used
        jhtmlarea: "0.7.5",

        init: function (elem, options) {
            if (elem.nodeName.toLowerCase() === "textarea") {
                var opts = $.extend({}, jHtmlArea.defaultOptions, options);
                elem.jhtmlareaObject = this;

                var textarea = this.textarea = $(elem);
                var container = this.container = $("<div/>").addClass("wui-html").insertAfter(textarea);

                var toolbar = this.toolbar = $("<div/>").addClass("tools").appendTo(container);
                priv.initToolBar.call(this, opts);

                var iframe = this.iframe = $("<iframe/>");
                var htmlarea = this.htmlarea = $("<div/>").append(iframe);

                container.append(htmlarea).append(textarea.hide());

                priv.initEditor.call(this, opts);
                priv.attachEditorEvents.call(this);

                // Fix total height to match TextArea
                iframe.height(iframe.height() - toolbar.height());
                
                toolbar.width(textarea.width() - 2);

                if (opts.loaded) { opts.loaded.call(this); }
            }
        },
        dispose: function () {
            this.textarea.show().insertAfter(this.container);
            this.container.remove();
            this.textarea[0].jhtmlareaObject = null;
        },
        execCommand: function (a, b, c) {
            this.iframe[0].contentWindow.focus();
            this.editor.execCommand(a, b || false, c || null);
            this.updateTextArea();
        },
        ec: function (a, b, c) {
            this.execCommand(a, b, c);
        },
        queryCommandValue: function (a) {
            this.iframe[0].contentWindow.focus();
            return this.editor.queryCommandValue(a);
        },
        qc: function (a) {
            return this.queryCommandValue(a);
        },
        getSelectedHTML: function () {
            var r = this.getRange();
            if(r.htmlText)	return r.htmlText;
            else			return $('<p>').append($(r.cloneContents())).html();
        },
        getSelection: function () {
            if (this.editor.selection)	return this.editor.selection;
        	else						return this.iframe[0].contentDocument.defaultView.getSelection();
        },
        getRange: function () {
            var s = this.getSelection();
            if (!s) { return null; }
            return (s.getRangeAt) ? s.getRangeAt(0) : s.createRange();
        },
        html: function (v) {
            if (v) {
                this.textarea.val(v);
                this.updateHtmlArea();
            } else {
                return this.toHtmlString();
            }
        },
        pasteHTML: function (html) {
            this.iframe[0].contentWindow.focus();
            var r = this.getRange();
            if (r.pasteHTML) {
                r.pasteHTML(html);
            }else{
                r.deleteContents();
                r.insertNode($((html.indexOf("<") != 0) ? $("<span/>").append(html) : html)[0]);
            }
            /* TODO: TEST THAT THIS PROC WORKS IN WEBKIT WITHOUT THIS CODE!!
            else { // Safari
                r.deleteContents();
                r.insertNode($(this.iframe[0].contentWindow.document.createElement("span")).append($((html.indexOf("<") != 0) ? "<span>" + html + "</span>" : html))[0]);
            }*/
            r.collapse(false);
            r.select();
        },
        bold: function () { this.ec("bold"); },
        italic: function () { this.ec("italic"); },
        underline: function () { this.ec("underline"); },
        strikeThrough: function () { this.ec("strikethrough"); },
        removeFormat: function () {
            this.ec("removeFormat", false, []);
            this.unlink();
        },
        link: function () {
            if (this.getRange().htmlText)	this.ec("createLink", true);
            else							this.ec("createLink", false, prompt("Link URL:", "http://"));
        },
        unlink: function () { this.ec("unlink", false, []); },
        unorderedList: function () { this.ec("insertunorderedlist"); },
        orderedList: function () { this.ec("insertorderedlist"); },
        justifyLeft: function () { this.ec("justifyLeft"); },
        justifyCenter: function () { this.ec("justifyCenter"); },
        justifyRight: function () { this.ec("justifyRight"); },
        formatBlock: function (v) { this.ec("formatblock", false, v || null); },
        showHTMLView: function () {
            this.updateTextArea();
            this.textarea.show();
            this.htmlarea.hide();
            $("ul li:not(li:has(a.html))", this.toolbar).hide();
            $("ul:not(:has(:visible))", this.toolbar).hide();
            $("ul li a.html", this.toolbar).addClass("highlighted");
            this.container.css({height:'auto'});
            this.textarea.css({paddingBottom:'28px'});
        },
        hideHTMLView: function () {
            this.updateHtmlArea();
            this.textarea.hide();
            this.htmlarea.show();
            $("ul", this.toolbar).show();
            $("ul li", this.toolbar).show().find("a.html").removeClass("highlighted");
        },
        toggleHTMLView: function () {
            (this.textarea.is(":hidden")) ? this.showHTMLView() : this.hideHTMLView();
        },

        toHtmlString: function () {
            return $.trim(this.editor.body.innerHTML
                    .replace(/MsoNormal/gi, "")
                    .replace(/<\/?link[^>]*>/gi, "")
                    .replace(/<\/?meta[^>]*>/gi, "")
                    .replace(/<\/?xml[^>]*>/gi,"")
                    .replace(/<\?xml[^>]*\/>/gi, "")
                    .replace(/<!--(.*)-->/gi, "")
                    .replace(/<!--(.*)>/gi, "")
                    .replace(/<!(.*)-->/gi, "")
                    .replace(/<w:[^>]*>(.*)<\/w:[^>]*>/gi, "")
                    .replace(/<w:[^>]*\/>/gi, "")
                    .replace(/<\/?w:[^>]*>/gi, "")
                    .replace(/<m:[^>]*\/>/gi, "")
                    .replace(/<m:[^>]>(.*)<\/m:[^>]*>/gi, "")
                    .replace(/<o:[^>]*>([.|\s]*)<\/o:[^>]*>/gi, "")
                    .replace(/<o:[^>]*>/gi, "")
                    .replace(/<o:[^>]*\/>/gi, "")
                    .replace(/<\/o:[^>]*>/gi, "")
                    .replace(/<\/?m:[^>]*>/gi, "")
                    .replace(/style=\"([^>]*)\"/gi, "")
                    .replace(/style=\'([^>]*)\'/gi, "")
                    .replace(/class=\"(.*)\"/gi, "")
                    .replace(/class=\'(.*)\'/gi,"")
                    .replace(/<p[^>]*>/gi, "<p>")
                    .replace(/<\/p[^>]*>/gi, "</p>")
                    .replace(/<span[^>]*>/gi, "")
                    .replace(/<\/span[^>]*>/gi, "")
                    .replace(/<st1:[^>]*>/gi, "")
                    .replace(/<\/st1:[^>]*>/gi, "")
                    .replace(/<font[^>]*>/gi, "")
                    .replace(/<\/font[^>]*>/gi, "")
                    .replace(/[\r\n]/g, " ")
                    .replace(/<wordPasteong><\/wordPasteong>/gi, "")
                    .replace(/<p><\/p>/gi, "").replace(/\/\*(.*)\*\//gi, "")
                    .replace(/<!--/gi, "")
                    .replace(/-->/gi, "")
                    .replace(/<style[^>]*>[^<]*<\/style[^>]*>/gi, "")
                    .replace(/<hr>/gi, ""))
        },
        toString: function () {
            return this.editor.body.innerText;
        },

        updateTextArea: function () {
            this.textarea.val(this.toHtmlString());
        },
        updateHtmlArea: function () {
            this.editor.body.innerHTML = this.textarea.val();
        }
    };
    jHtmlArea.fn.init.prototype = jHtmlArea.fn;

    jHtmlArea.defaultOptions = {
        toolbar: [
        ["bold", "italic", "underline", "link", "unlink", "strikethrough", "orderedlist", "unorderedlist"],
        ["justifyleft", "justifycenter", "justifyright"]
    ],
        css: null,
        toolbarText: {
            bold : "Bold",
            italic : "Italic",
            underline : "Underline",
            strikethrough : "Strike-Through",
            justifyleft : "Left Justify",
            justifycenter : "Center Justify",
            justifyright : "Right Justify",
            link : "Insert Link",
            unlink : "Remove Link",
            unorderedlist : "Insert Unordered List",
            orderedlist : "Insert Ordered List",
            html : "Show/Hide HTML Source View"
        }
    };
    var priv = {
        toolbarButtons: {
            strikethrough : "strikeThrough",
            unorderedlist : "unorderedList",
            orderedlist : "orderedList",
            justifyleft : "justifyLeft",
            justifycenter : "justifyCenter",
            justifyright : "justifyRight",
            html : function(btn) {
                this.toggleHTMLView()
            }
        },
        initEditor: function (options) {
            var edit = this.editor = this.iframe[0].contentWindow.document;
            edit.designMode = 'on';
            edit.open();
            edit.write(this.textarea.val());
            edit.close();
            if (options.css)  $('head',edit).append($('<style>').attr({type:'text/css'}).text(options.css));
        },
        initToolBar: function (options) {
            var that = this;

            var menuItem = function (className, altText, action) {
                return $("<li/>").append($('<a href="javascript:void(0);" tabindex="-1"/>').addClass(className).attr("title", altText).click(function () { action.call(that, $(this)); }));
            };

            function addButtons(arr) {
                var ul = $("<ul/>").appendTo(that.toolbar);
                for (var i = 0; i < arr.length; i++) {
                    var e = arr[i];
                    if ((typeof (e)).toLowerCase() === "string") {
                        if (e === "|") {
                            ul.append($('<li class="separator"/>'));
                        } else {
                            var f = (function (e) {
                                // If button name exists in priv.toolbarButtons then call the "method" defined there, otherwise call the method with the same name
                                var m = priv.toolbarButtons[e] || e;
                                if ((typeof (m)).toLowerCase() === "function") {
                                    return function (btn) { m.call(this, btn); };
                                } else {
                                    return function () { this[m](); this.editor.body.focus(); };
                                }
                            })(e.toLowerCase());
                            var t = options.toolbarText[e.toLowerCase()];
                            ul.append(menuItem(e.toLowerCase(), t || e, f));
                        }
                    } else {
                        ul.append(menuItem(e.css, e.text, e.action));
                    }
                }
            };
            if (options.toolbar.length !== 0 && priv.isArray(options.toolbar[0])) {
                for (var i = 0; i < options.toolbar.length; i++) {
                    addButtons(options.toolbar[i]);
                }
            } else {
                addButtons(options.toolbar);
            }
        },
        attachEditorEvents: function () {
            var t = this;
            function showToolbar(e){ t.toolbar.css('opacity',100 * (e.type != 'blur' ? 1 : 0)); }
            function fnHA(e) {
                t.updateHtmlArea();
                showToolbar(e);
            }
            function fnTA(e) {
                t.updateTextArea();
                showToolbar(e);
            }
            
            this.textarea.click(fnHA).
                keyup(fnHA).
                keydown(fnHA).
                mousedown(fnHA).
                blur(fnHA);

            $(this.editor).focus(fnTA).
                click(fnTA).
                keyup(fnTA).
                keydown(fnTA).
                mousedown(fnTA).
                blur(fnTA);
        },
        isArray: function (v) {
            return v && typeof v === 'object' && typeof v.length === 'number' && typeof v.splice === 'function' && !(v.propertyIsEnumerable('length'));
        }
    };
})(jQuery);

/*
 * One Click Upload - jQuery Plugin
 * Copyright (c) 2008 Michael Mitchell - http://www.michaelmitchell.co.nz
 *
 * Modified 2012 Stephen Nielsen
 */
(function($){
    $.fn.upload = function(options) {
        /** Merge the users options with our defaults */
        options = $.extend({
            name: 'file',
            enctype: 'multipart/form-data',
            action: '',
            autoSubmit: true,
            onSubmit: function() {},
            onComplete: function() {},
            onSelect: function() {},
            onFocus: function() {},
            onBlur: function() {},
            params: {}
        }, options);

        return new $.ocupload(this, options);
    },
    
    $.ocupload = function(element, options) {
        /** Fix scope problems */
        var self = this;
    
        /** A unique id so we can find our elements later */
        var id = new Date().getTime().toString().substr(8);
        
        /** Upload Iframe */
        var iframe = $('<iframe '+ 'id="iframe'+id+'" '+ 'name="iframe'+id+'"'+ '></iframe>').css({ display: 'none' });
        
        /** Form */
        var form = $('<form '+ 'method="post" '+ 'enctype="'+options.enctype+'" '+ 'action="'+options.action+'" '+ 'target="iframe'+id+'"'+ '></form>').css({margin: 0, padding: 0});
        
        /** File Input */
        var input = $('<input '+ 'name="'+options.name+'" '+ 'type="file" '+ '/>').css({
            position: 'relative',
            display: 'block',
            opacity: 0
        });
        
        /** Put everything together */
        element.wrap('<div></div>'); //container
            form.append(input);
            element.after(form);
            element.after(iframe);
    
        /** Find the container and make it nice and snug */
        var container = element.parent().addClass("wui-browse-btn");
        
        /** Watch for file selection */
        input.change(function() {
            /** Do something when a file is selected. */
            self.onSelect(); 
            
            /** Submit the form automaticly after selecting the file */
            if(self.autoSubmit) {
                self.submit();
            }
        })
        .focus(function(){self.onFocus();})
        .blur(function(){self.onBlur();});
        
        /** Methods */
        $.extend(this, {
            autoSubmit: options.autoSubmit,
            onSubmit: options.onSubmit,
            onComplete: options.onComplete,
            onSelect: options.onSelect,
            onBlur: options.onBlur,
            onFocus: options.onFocus,
        
            /** get filename */     
            filename: function() {
                return input.attr('value');
            },
            
            /** get/set params */
            params: function(params) {
                if(params || false)  options.params = $.extend(options.params, params);
                else                 return options.params;
            },
            
            /** get/set name */
            name: function(nam) {
                if(nam || false)  input.attr("name", value);
                else              return input.attr("name");
            },
            
            /** get/set action */
            action: function(action) {
                if(action || false)  form.attr("action", action);
                else                 return form.attr("action");
            },
            
            /** get/set enctype */
            enctype: function(enctype) {
                if(enctype || false)  form.attr("enctype", enctype);
                else            return form.attr("enctype");
            },
            
            /** set options */
            set: function(obj, value) {
                var value = value ? value : false;
                                
                function option(action, value) {
                    switch (action) {
                        default:
                            throw new Error("[jQuery.ocupload.set] '" + e + "' is an invalid option.");
                            break;
                        case "name":        self.name(value);          break;
                        case "action":      self.action(value);        break;
                        case "enctype":     self.enctype(value);       break;
                        case "params":      self.params(value);        break;
                        case "autoSubmit":  self.autoSubmit = value;   break;
                        case "onSubmit":    self.onSubmit = value;     break;
                        case "onComplete":  self.onComplete = value;   break;
                        case "onFocus":     self.onFocus = value;      break;
                        case "onBlur":      self.onBlur = value;       break;
                        case "onSelect":    self.onSelect = value;     break
                    }
                }               
                var value = value ? value : false;
                if(value) {
                    option(obj, value);
                }
                else {              
                    $.each(obj, function(key, value) {
                        option(key, value);
                    });
                }
            },
            
            /** Submit the form */
            submit: function() {
                /** Do something before we upload */
                this.onSubmit();
                
                /** add additional paramters before sending */
                $.each(options.params, function(key, value) {
                    form.children("input[name=" +key+ "]").remove();
                    form.append($('<input type="hidden" name="' +key+ '" value="' +value+ '" />'));
                });
                
                /** Submit the actual form */
                form.submit(); 
                
                /** Do something after we are finished uploading */
                iframe.unbind().load(function() {
                    /** Get a response from the server in plain text */
                    var myFrame = document.getElementById(iframe.attr('name'));
                    /** Do something on complete */
                    self.onComplete($(myFrame.contentWindow.document.body).text()); //done :D
                });
            }
        });
    }
})(jQuery);
