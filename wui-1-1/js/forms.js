(function($) {
	Wui.form = function(args){
	    $.extend(this,{
			afterCreate:function(){},
			disabled:	false,
			errCls:		'wui-form-err',
			labelPos:	'top'
		}, args, {
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
		each:		function(f){
						for(var i = this.items.length - 1; i >= 0; i--)
							if(!(itm instanceof Wui.note))
								f(this.items[i],i);
						return true;
			    	},
		getData:    function(){
	                    if(this.validate())	{ return this.getRawData(); }
	                    else				{ this.dispErrs(); return false; }
	                },
	    getField:   function(fieldname){
	                    var retval = null;
	                    this.each(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
	                    return retval;
	                },
	    getFrmItm:	function(fieldname){
	                    var retItm = undefined;
						this.each(function(itm,idx){ if(itm.name == fieldname) retItm = itm; });
	                    return retItm;
					},
		getRawData: function(){
	                    var ret = {};
	                    this.each(function(itm){ ret[itm.name] = itm.val(); });
	                    return ret;
	                },
	    init:		function(){
					    this.el.addClass('wui-form labels-' + this.labelPos);
				    },
		normFrmItem:function(itm){
						var me = this;
						if(itm.ftype && !(itm instanceof Wui.frmField)){
							var ft = itm.ftype.split('.');
							if(window[ft[0]] && window[ft[0]][ft[1]])	return new window[ft[0]][ft[1]]( $.extend(itm,((itm.disabled && itm.disabled === true) ? {disabled:me.disabled} : {})) );
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
						this.each(function(itm,idx){ if(itm.name == fieldname) Wui.o.prototype.splice.call(me,idx,1); });
	                    return true;
					},
		setData:    function(d){
	                    this.each(function(itm){ itm.val((d) ? d[itm.name] : null); });
	                },
		disable:	function(val){ return this.each(function(itm){ itm.disable(); }); },
		enable:		function(val){ return this.each(function(itm){ itm.enable(); }); },
		setField:   function(fieldname, d){
		                this.each(function(itm){ if(itm.name == fieldname) itm.val(d); });
	            	},
		throwErr:   function(m){this.errs.push(m); return false;},
		validate:   function(){
		                var me = this;
						me.errs = [];
		                me.each(function(itm){ 
		                	if(itm.el && itm.el.toggleClass) { itm.el.toggleClass(me.errCls,!itm.validate()); }
		                });
		                return (me.errs.length == 0);
	            	}
	});
	
	
	/* WUI Note */
	Wui.note = function(args){ $.extend(this,{html:''},args); this.init(); };
	Wui.note.prototype = $.extend(new Wui.o(),{
		init:       function(){ this.el = $('<p>').html(this.html).addClass('wui-note'); }
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
        disable:	function(){
				        this.disabled = true;
				        if(this.el && this.el.addClass)
				        	this.el.addClass('wui-disabled').find('input,textarea,iframe').attr('disabled','disabled');
			        },
        enable:		function(){
				        this.disabled = false;
				        if(this.el && this.el.addClass)
				        	this.el.removeClass('wui-disabled').find('.wui-disabled,*[disabled=disabled]').removeAttr('disabled');
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
							this.valChange(this);
							
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
		setBlankText:function(){},
		setListeners:function(t){
						$(t.field).change(function(){ t.val(); });
					},
		valChange:	function(){ this.field.keyup(); }
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
					    this.valChange(this);
			        },
		onRender:	function(){
				        var me = this;
        				me.el.find('input').each(function(){
					        $(this).css({ margin:'0 5px 0' + ((me.buttonStyle ? -1 : 0) * (5 + $(this).outerWidth())) + 'px' });
				        });
						Wui.frmField.prototype.onRender.call(this);
			        },
		getVal:		function(){ return this.value; },
		setVal:		function(sv){
						this.value = sv;
                        this.el.find("input[value='" + sv + "']").attr('checked',true);
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
        itmChange:	function(elem){ this.valChange(this); },
		getVal:		function(){ return this.calcVal(); },
		setVal:		function(sv){
						if(me.options.length == 1 && (typeof sv == 'number' || typeof sv == 'string')){
							me.el.find('input').attr('checked',!!sv).siblings('li').toggleClass('checked',!!sv);
						}else{
							// clear out all checkboxes
							me.el.find('input').attr('checked',false);
							me.el.find('label').removeClass('checked');
							
							// set the ones passed in
							$.each(sv, function(i,v){
								me.el.find('input[value=' +v+ ']').attr('checked',true).siblings('li').addClass('checked');
							});
						}
					},
		validTest:	function(){ if(this.required && this.val() == 0) return false;	return true; }
	});
	
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
			this.textarea.change();
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