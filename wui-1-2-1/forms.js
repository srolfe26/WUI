/*! Wui 1.2
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2/license.html
 */

(function($,Wui) {

var fullPath = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    relativePath = /(\/|\/([\w#!:.?+=&%@!\-\/]))/;

Wui.Form = function(args){
    $.extend(this,{
        disabled:       false,
        labelPosition:  'top',
        labelSize:      null
    }, args, {
        el:             $('<form>').addClass('wui-form'),
        errors:         [],
        formChanged:    false
    });
    
    this.init();
};
Wui.Form.prototype = $.extend(new Wui.O(),{
    clearData:  function(){ this.setData(); },

    dispErrors: function(){
                    var msg = '';
                    for(var e = 0; e < this.errors.length; e++) msg += this.errors[e] + '<br/>';
                    Wui.errRpt(msg,'Form Errors');
                },

    each:       function(f, blockNote,ascending){
                    return Wui.O.prototype.each.call(
                        this,
                        function(itm,i){
                            if(!(blockNote && !(itm instanceof Wui.FormField))) return f(itm,i);
                        },
                        ascending
                    );
                },
    errCls:     'wui-form-err',
    getData:    function(){
                    if(this.validate()) { return this.getRawData(); }
                    else                { this.dispErrors(); return false; }
                },
    getField:   function(fieldname){
                    var retval = null;
                    this.each(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
                    return retval;
                },
    getFrmItm:  function(fieldname){
                    var retItm = undefined;
                    this.each(function(itm,idx){ if(itm.name == fieldname) retItm = itm; });
                    return retItm;
                },
    getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); }, true);
                    return ret;
                },        
    init:       function(){
                    var me = this;

                    if(typeof me.id === 'undefined' || me.id === null)
                        me.id = Wui.id('wui-form');

                    me.observer = new MutationSummary({
                        callback:   function(){
                                        if(me.items === undefined) me.items = [];
                                        me.each(function(itm,i){ me.items[i] = me.normFrmItem(itm); });
                                        return Wui.O.prototype.place.apply(me,arguments);
                                    },
                        queries:    [{ element: '#' + me.id }]
                    });
                },   
    normFrmItem:function(itm){
                    var me = this;

                    // If a form is disabled, the field needs to be disabled too
                    if(!(itm.disabled && itm.disabled === true)) $.extend(itm,{disabled: me.disabled});

                    if(itm.ftype && !(itm instanceof Wui.FormField)){
                        // If a field has its labelPosition defined then leave it alone, otherwise use the form's value.
                        if(!(itm.labelPosition)) $.extend(itm,{labelPosition: me.labelPosition});
                        // If a field has its labelSize defined then leave it alone, otherwise use the form's value.
                        if(!(itm.labelSize)) $.extend(itm,{labelSize: me.labelSize});
                        
                        var ft = itm.ftype.split('.');

                        switch (ft.length) {
                            case 1:
                                if(window[ft[0]])   return new window[ft[0]](itm);
                                else                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 2:
                                if(window[ft[0]] && window[ft[0]][ft[1]])   return new window[ft[0]][ft[1]](itm);
                                else                                        throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 3:
                                if(window[ft[0]] && window[ft[0]][ft[1]][ft[2]])    return new window[ft[0]][ft[1]][ft[2]](itm);
                                else                                                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 4:
                                if(window[ft[0]] && window[ft[0]][ft[1]][ft[2]][ft[3]]) return new window[ft[0]][ft[1]][ft[2]][ft[3]](itm);
                                else                                                    throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            default:
                                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                        }
                    }else if(itm instanceof Wui.FormField){
                        // If a field has a label, make it match the format of the form.
                        if(itm.lbl){
                            itm.lbl.setLabelPosition(me.labelPosition);
                            itm.lbl.setLabelSize(me.labelSize);
                        }

                        return itm;
                    }else{
                        return itm;
                    }
                },
    push:       function(){
                    var me = this, itms = [];
                    $.each(arguments,function(i,arg){ itms.push(me.normFrmItem(arg)); });
                    return Wui.O.prototype.push.apply(this,itms);
                },
    splice:     function(idx,howMany){
                    var me = this, 
                        itms = [],
                        index = Array.prototype.shift.apply(arguments),
                        remove = Array.prototype.shift.apply(arguments);

                    // Create/normalize passed in objects
                    $.each(arguments,function(i,arg){ itms.push(me.normFrmItem(arg)); });

                    // Add Elements back in
                    itms.splice(0,0,index,remove);
                    return Wui.O.prototype.splice.apply(this,itms);
                },
    remFrmItm:  function(fieldname){
                    var me = this;
                    this.each(function(itm,idx){ if(itm.name == fieldname) Wui.O.prototype.splice.call(me,idx,1); });
                    return true;
                },
    formChange: function(changed,changedItem){
                    var me = this;
                    if(changed)
                        me.el.trigger($.Event('formupdate'), [me, changedItem]);
                    me.formChanged = changed;
                    return me.formChanged;
                },
    setData:    function(data,fireEvents){
                    if(data){
                                this.setData();
                                this.each(function(itm){ 
                                    if(data[itm.name]) 
                                        itm.val(data[itm.name],fireEvents);
                                }, true);
                            }
                    else    {    this.each(function(itm){ itm.val(null,fireEvents); }, true); }
                    this.formChange(false);
                },
    disable:    function(){ return this.each(function(itm){ itm.disable(); }, true); },
    enable:     function(){ return this.each(function(itm){ itm.enable(); }, true); },
    setField:   function(fieldname, v){
                    this.each(function(itm){ if(itm.name == fieldname) itm.val(v); }, true);
                },
    throwError: function(err){this.errors.push(err); return false;},
    validate:   function(){
                    var me = this;
                    me.errors = [];
                    me.each(function(itm){ 
                        if(typeof itm.el.toggleClass !== 'undefined')
                            itm.el.toggleClass(me.errCls,!itm.validate());
                    }, true);
                    this.formChange(false);
                    return (me.errors.length === 0);
                }
});


Wui.Note = function(args){ 
    $.extend(this,{
        html:   ''
    },args);
    this.init();
};
Wui.Note.prototype = $.extend(new Wui.O(),{
    init:   function(){ this.el = $('<div>').html(this.html).addClass('wui-note'); }
});



Wui.Label = function(args){ 
    $.extend(this,{
        html:           '',
        labelPosition:  'top',
        labelSize:      null
    },args);
    
    this.init(); 
};
Wui.Label.prototype = $.extend(new Wui.O(),{
    init:               function(){
                            var me = this;
                            me.el = $('<div>').addClass('wui-lbl').append( 
                                me.label = $('<label>').addClass(me.cls).attr(me.attr ? me.attr : {})
                            );
                            me.setLabel();
                            me.setLabelPosition();
                        },
    setLabel:           function(newLabel){
                            newLabel = newLabel || this.html;
                            this.label.html(this.html = newLabel);
                            return this.label.html();
                        },
    verifyPosition:     function(pos){
                            if(pos && (pos = pos.toLowerCase()) && $.inArray(pos,['top', 'left', 'bottom', 'right']) >= 0)
                                return pos;
                            else
                                return this.labelPosition;
                        },
    setLabelSize:       function(size){
                            var me = this;
                            size = $.isNumeric(size) ? size : me.labelSize;

                            // Clear out and reset the size of el padding
                            me.el.css({
                                paddingLeft:    '',
                                paddingRight:   '',
                                paddingTop:     '',
                                paddingBottom:  ''
                            });
                            // Clear out and reset the size of the label
                            me.label.css({
                                width:          '',
                                height:         '',
                                marginLeft:     '',
                                marginRight:    ''
                            });

                            if($.isNumeric(size)){
                                var dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width';
                                
                                me.el.css('padding-' + me.labelPosition, size);

                                me.label.css(dimension, size);
                                if(me.field)
                                    me.field.labelSize = me.labelSize = size;
                            }

                            me.adjustField();
                        },
    adjustField:        function(){
                            var me = this, dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width';
                            if(me.field && dimension == 'width' && me.label.outerHeight() > me.field.el.height()){
                                me.field.el.css('min-height', me.label.outerHeight());
                            }
                        },

    setLabelPosition:   function(position){
                            var me = this;

                            position = me.verifyPosition(position);
                            me.el.removeClass('lbl-' + me.labelPosition).addClass('lbl-' + position);
                            if(me.field)    me.field.labelPosition = position;
                            
                            me.labelPosition = position;
                            me.setLabelSize();

                            return me.labelPosition;
                        }
});


Wui.FormField = function(args){
    $.extend(this,{
        disabled:       false,
        id:             null,
        invalidMsg:     null,
        label:          null,
        labelPosition:  'top',
        labelCls:       null,
        labelSize:      null,
        name:           null,
        required:       false,
        validRegEx:     null,
        validTest:      null
    },args);
};
Wui.FormField.prototype = $.extend(new Wui.O(),{
    applyAttr:  function(name,val){
                    var validVal = (typeof val === 'string' || typeof val === 'number');
                    if(validVal) $(this.field).attr(name,val);
                    return validVal;
                },
    init:       function(){
                    var me = this;
                    me.value = me.hasOwnProperty('value') ? me.value : null;
                    me.el = $('<div>').addClass('wui-fe');

                    if(!(me.name !== null && me.name.length !== 0))
                        me.name = Wui.id('wui-form-field');

                    if(!(me.id !== null && me.id.length !== 0))
                        me.id = me.name;
                    
                    if(me.label && me.label.length > 0){
                        me.lbl = new Wui.Label({
                            html:           me.label, 
                            cls:            me.labelCls, 
                            field:          me, 
                            labelPosition:  me.labelPosition, 
                            labelSize:      me.labelSize
                        });
                        me.elAlias = me.el;
                        me.el = me.lbl.el.append(me.elAlias);
                    }

                    me.observer = new MutationSummary({
                        callback:   function(){
                                        if(me.disabled)                     me.disable();
                                        if(typeof me.value != 'undefined')  me.val(me.value,false);
                                        if(me.lbl)                          me.lbl.adjustField();
                                    },
                        queries:    [{ element: '#' + me.id }]
                    });

                    return me.el;
                },
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('wui-disabled').find('input,textarea,iframe').attr('disabled','disabled');
                },
    enable:        function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('wui-disabled').find('.wui-disabled,*[disabled=disabled]').removeAttr('disabled');
                },
    validate:   function(){
                    var me = this,
                        v = me.val(),
                        fieldName = (me.label !== null ) ? me.label : (typeof me.name !== 'undefined') ? me.name : null,
                        errMsg = (me.invalidMsg !== null) ? me.invalidMsg : 
                                    (fieldName !== null) ? 'A value for \'' +fieldName+ '\' is required.' :
                                        "A required field has an improper value.";
                    
                    // If a custom test is defined 
                    if(me.validTest && typeof me.validTest == 'function')
                        if(me.validTest(v) === false)
                            return parentThrow();
                                            
                    // If maxChars is defined, this will be checked first
                    if($.isNumeric(me.maxChars)){
                        if(v && v.length > me.maxChars){
                            errMsg = (fieldName && $.trim(fieldName).length) ? 
                                        '\'' + fieldName + '\' must be less than ' +me.maxChars+ ' characters.' :
                                        'You have a field with too many characters in it, the max is ' +me.maxChars+ '.';
                            return parentThrow();
                        }
                    }

                    // If a regular expression is defined for a test, this will be tested first
                    if(me.validRegEx !== null)
                        if(!me.validRegEx.test($.trim(v)))
                            return parentThrow();
                                        
                    // If no regular expression test exists, test whether a value is required and throw an error if blank
                    if(me.required){
                        if(v === null || v === undefined)                   return parentThrow();
                        if(typeof v == 'string' && $.trim(v).length === 0)  return parentThrow();
                    } 
                    
                    function parentThrow(){
                        return (typeof me.parent.throwError !== 'undefined') ? me.parent.throwError(errMsg) : false;
                    }
                    
                    // Default return value is true
                    return true;
                },
    val:        function(){
                    if(!arguments.length){
                        return this.getVal();
                    }else{
                        var oldVal = this.value;

                        // Set the actual value of the item
                        this.setVal.apply(this,arguments);
                        
                        // Call change listeners
                        if(arguments[1] !== false)
                            this.setChanged(oldVal);
                        
                        // Return the passed value(s)
                        return arguments;
                    }
                },
    setChanged: function(oldVal){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    // Marks the parent form as 'changed'
                    if(me.parent && me.parent instanceof Wui.Form)
                        me.parent.formChange(true, me);
                    
                    // Calls functionally defined valChange() - one will override another
                    me.valChange(me, me.value, oldVal);
                    
                    // Calls listeners for valchange
                    me.field.trigger($.Event('valchange'), [me, me.value, oldVal, me.val()])
                        .trigger($.Event('hiddenchange'), [me, me.value, oldVal, me.val()]); // To preserve legacy
                },
    getVal:     function(){
                    return this.value;
                },
    setVal:     function(sv){
                    this.value = sv;
                },
    valChange:  function(newVal){}
});



Wui.Hidden = function(args){
    $.extend(this, args, {
        label:  null,
        field:  $('<input>',{type:'hidden'})
    });
    this.init();
};
Wui.Hidden.prototype = new Wui.FormField({
    fieldText:  function(sv){ this.field.val(sv); },
    getVal:     function(){ return (this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null); },
    init:       function(){
                    Wui.FormField.prototype.init.call(this);
                    this.el.hide();
                    this.append(this.field);
                },
    setVal:     function(sv){ this.fieldText(this.value = (sv && $.trim(sv).length) ? sv : null); }
});



Wui.Text = function(args){
    $.extend(this,{
        blankText:  '',
        counter:    false,
        maxChars:   null
    },args,{
        field:      $('<input>',{type:'text'})
    }); 
    this.init();
};
Wui.Text.prototype = $.extend(new Wui.Hidden(),{
    init:           function(){
                        var me = this;
                        Wui.FormField.prototype.init.call(me);
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Text.prototype.setListeners.call(me,me));
                    },
    setBlankText:   function(bt){
                        var me = this;
                        
                        me.blankText = bt;
                        me.field.attr('placeholder', bt);
                        
                        return bt;
                    },
    setListeners:   function(t){
                        var me = this,
                            fieldState = null;
                        
                        t.field
                        .focusin(function(){ fieldState = me.field.val(); }) // Set fieldState (closure variable) to allow for comparison on blur
                        .blur(function(){ 
                            if(fieldState != me.field.val()){
                                me.val(); 
                                me.setChanged();
                            }
                        }); // Call val function so that valchange will be fired if needed

                        // Add a character counter
                        if($.isNumeric(t.maxChars) && t.counter === true){
                            t.append(t.charCounter = $('<div>').addClass('wui-char-counter'));
                            t.field.keyup(function(){
                                var initVal = (t.val()) ? t.maxChars - t.val().length : t.maxChars;
                                t.charCounter.text(initVal);
                                if(initVal >= 0)    t.charCounter.css('color','#333');
                                else                t.charCounter.css('color','#900');
                            });

                            t.field.keyup();
                        }
                        
                        if(this.setListeners !== Wui.Text.prototype.setListeners) this.setListeners(this);
                        return t.field;
                    }
});


Wui.Textarea = function(args){
    $.extend(this, { 
        field:  $('<textarea>'),
        height: 80
    }, args);
    this.init();
};
Wui.Textarea.prototype = $.extend(new Wui.Text(), {
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me); 
                },
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    var lblVert = (this.lbl && $.inArray(this.lbl.labelPosition,['top','bottom']) >= 0) ? this.lbl.label.outerHeight() : 0;
                    this.el.css({
                        height:     '',
                        minHeight:  (this.height)
                    });
                    this.field.css({
                        height:     '',
                        minHeight:  (this.height - lblVert)
                    }); 
                }
});


Wui.Wysiwyg = function(args){
    $.extend(this,{
        css:        'body {' +
                        'color:#333;' + 
                        'font:90%  Arial, Verdana, Helvetica,sans-serif;' + 
                        'overflow:auto;' + 
                        'margin:0;' + 
                        'padding:0;' +
                    '}' +
                    'a {color:#09c; text-decoration:none;}' +
                    'a:hover {color:#0c9; text-decoration:underline;}',
        
        /** Whether or not to show the button that will give the user a view
        of the HTML generated by the WYSIWYG */
        showHTML:   false
    },args,{

    });
    this.init();
};
Wui.Wysiwyg.prototype = $.extend(new Wui.FormField(),{
    init:       function(){
                    var me = this;

                    me.observer = new MutationSummary({
                        callback:   function(){
                                        var edit = me.editor = me.iframe[0].contentWindow.document;

                                        // Make the iframe editable and set up its style
                                        edit.designMode = 'on';
                                        edit.open();
                                        edit.close();
                                        if(me.css.length) $('head',edit).append($('<style>').attr({type:'text/css'}).text(me.css));

                                        // Add menu buttons
                                        me.bold.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(e){ me.exec("bold"); });
                                        me.italic.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("italic"); });
                                        me.underline.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("underline"); });
                                        me.strike.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("strikethrough"); });
                                        me.link.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){
                                            var r = me.previousRange;
                                            if (r.htmlText){
                                                me.exec("createLink", true);
                                            }else{
                                                var a = Wui.input(
                                                    "Link URL:",
                                                    function(link){
                                                        me.exec("createLink", false, link);
                                                        a.parent.closeOkay = true;
                                                        a.parent.close();
                                                    },
                                                    'Insert Link',
                                                    [{  
                                                        ftype:'Wui.Text',
                                                        blankText:  'Use: \'http://...\'    or   \'/directory/page/etc...\' ',
                                                        required:   true,
                                                        invalidMsg: 'You need to have a properly formatted link with either an absolute or relative path.',
                                                        testLink:   function(){ return this.validTest(this.field.val()); },
                                                        validTest:  function(v) {
                                                                        return (fullPath.test(v) || relativePath.test(v));
                                                                    },
                                                        setListeners:function(t){
                                                                        var me = this;

                                                                        return me.field.on('blur click keyup keydown mousedown', function(e){
                                                                            Wui.Link.prototype.buildOutput.call(me,{
                                                                                uri:    me.field.val(),
                                                                                target: '_blank',
                                                                                title:  r.toString()
                                                                            });
                                                                        });
                                                                    }
                                                    }]
                                                );
                                                setTimeout(function(){ a.parent.modalEl.css('z-index',Wui.maxZ()); }, 100);
                                            } 
                                        });
                                        me.unlink.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("unlink", false, []); });
                                        me.ol.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("insertunorderedlist"); });
                                        me.ul.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("insertorderedlist"); });
                                        me.left.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyLeft"); });
                                        me.center.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyCenter"); });
                                        me.right.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyRight"); });

                                        // If the field is blank - add a space
                                        if(!$(edit.body).children().length) me.exec('insertHTML',false,' ');

                                        (me.elAlias || me.el).resizes();
                                    },
                        queries:    [{ element: '#' + me.id }]
                    });

                    Wui.FormField.prototype.init.call(me);

                    me.el.addClass('wui-wysiwyg');
                    me.append(
                        me.field = $('<textarea>').hide(),
                        me.iframe = $('<iframe>').addClass('wui-editor'),
                        me.tools = $('<div>').addClass('wui-editor-tools')
                    );

                    me.tools.append(
                        me.bold = $('<i class="fa fa-bold">',{tabIndex:-1, title:'Bold'}),
                        me.italic = $('<i class="fa fa-italic">',{tabIndex:-1, title:'Italic'}),
                        me.italic = $('<i class="fa fa-underline">',{tabIndex:-1, title:'Underline'}),
                        me.italic = $('<i class="fa fa-strikethrough">',{tabIndex:-1, title:'Strike-through'}),
                        me.italic = $('<i class="fa fa-link">',{tabIndex:-1, title:'Link'}),
                        me.italic = $('<i class="fa fa-unlink">',{tabIndex:-1, title:'Un-Link'}),
                        me.italic = $('<i class="fa fa-list-ul">',{tabIndex:-1, title:'Unorderd List'}),
                        me.italic = $('<i class="fa fa-list-ol">',{tabIndex:-1, title:'Ordered List'}),
                        me.italic = $('<i class="fa fa-align-left">',{tabIndex:-1, title:'Left Align'}),
                        me.italic = $('<i class="fa fa-align-center">',{tabIndex:-1, title:'Center Align'}),
                        me.italic = $('<i class="fa fa-align-right">',{tabIndex:-1, title:'Right Align'})
                    );

                    if(me.showHTML)
                        me.tools.append( $('<a>').addClass('html').attr({tabIndex:-1, title:'Toggle HTML View'}) );
                },
    disable:    function(){
                    Wui.FormField.prototype.disable.call(this);
                    Wui.Pane.prototype.addMask.call(this,(this.elAlias || this.el));
                },
    enable:     function(){
                    Wui.FormField.prototype.enable.call(this);
                    Wui.Pane.prototype.removeMask.call(this);
                },
    exec:       function (a, b, c) {
                    this.iframe[0].contentWindow.focus();

                    if (this.previousRange) {
                        var rng = this.previousRange;
                        var sel = this.getSelection()
                        sel.removeAllRanges();
                        sel.addRange(rng);
                    }

                    this.editor.execCommand(a, b || false, c || null);
                },
    getRange:   function () {
                    var s = this.getSelection();
                    
                    if (!s)
                        return null;
                    if (s.getRangeAt && s.rangeCount > 0)
                        return s.getRangeAt(0);
                    if (s.createRange)
                        return s.createRange();

                    return null;
                },
    getSelection: function () {
                    if (this.editor.selection)
                        return this.editor.selection;
                    else
                        return this.iframe[0].contentDocument.defaultView.getSelection();
                },
    getVal:     function () {
                    // Strips out MS Word HTML Nonsense
                    var retVal = $.trim(this.editor.body.innerHTML
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
                            .replace(/<hr>/gi, ""));
                    return this.value = (retVal.length === 0) ? null : retVal;
                },
    setVal:     function(sv){
                    var me = this;
                    me.value = sv;
                    if(me.editor)
                        $(me.editor.body).html(sv);
                }
});


})(jQuery,Wui);