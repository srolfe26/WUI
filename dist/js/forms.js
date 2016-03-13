/*! Wui 1.2.1
 * Copyright (c) 2015 Stephen Rolfe Nielsen (rolfe.nielsen@gmail.com)
 *
 * @license MIT
 * http://www.wui-js.com/wui-1-2-1/license.html
 */ 



(function($,Wui) {


Wui.Form = function(args){
    $.extend(this,{
        disabled:       false,
        labelPosition:  'top',
        labelSize:      null,
        HTMLSubmit:     false,
    }, args, {
        el:             $('<div>'),
        errors:         [],
        formChanged:    false
    });
    
    this.init();
};
Wui.Form.prototype = $.extend(new Wui.O(),{
    clearData:  function(){ this.setData(); },

    dispErrors: function(){
                    var msg = '';

                    for(var i = 0; i < this.errors.length; i++) 
                        msg += this.errors[i] + '<br/>';

                    Wui.errRpt(msg,'Form Errors');
                },

    each:       function( f, blockNote, ascending ){
                    return Wui.O.prototype.each.call(
                        this,
                        function(itm,i){
                            if(!(blockNote && !(itm instanceof Wui.FormField))) return f(itm,i);
                        },
                        ascending
                    );
                },
    errCls:     'w121-form-err',
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
                    var retItm;
                    this.each(function(itm){ if(itm.name == fieldname) retItm = itm; });
                    return retItm;
                },
    getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); }, true);
                    return ret;
                },        
    init:       function(){
                    var me = this;
                    
                    Wui.O.prototype.init.call(me);

                    me.el.addClass('w121-form').on('submit', function(e){
                        // Prevent the form from submitting unless configured to do so
                        if(!me.HTMLSubmit)
                            e.preventDefault();
                    });

                    if(typeof me.id === 'undefined' || me.id === null)
                        me.id = Wui.id('w121-form');
                },
    normFrmItem:function(itm){
                    var me = this;

                    // If a form is disabled, the field needs to be disabled too
                    if(!(itm.disabled && itm.disabled === true)) $.extend(itm,{disabled: me.disabled});

                    if(itm.ftype && !(itm instanceof Wui.FormField)){
                        var ft = itm.ftype.split('.');

                        itm.labelPosition = itm.labelPosition || me.labelPosition;
                        itm.labelSize = itm.labelSize || me.labelSize;

                        if(ft[0] == 'Wui')  ft[0] = _wuiVar;
                        
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
                        }
                    }else if(itm instanceof Wui.FormField){
                        // If a field has a label, make it match the format of the form.
                        if(itm.lbl){
                            itm.labelSize = me.labelSize;
                            // setLabelPosition calls setLabelSize and uses the item's labelSize that we just set.
                            itm.lbl.setLabelPosition( itm.labelPosition || me.labelPosition );
                        }
                        return itm;
                    }else{
                        return itm;
                    }
                },
    place:      function(){
                    var me = this;

                    if(me.items === undefined) me.items = [];
                    me.each(function(itm,i){ 
                        itm = me.items[i] = me.normFrmItem(itm);
                        if(itm.onRender) window.setTimeout(function(){ itm.onRender(); },0);
                    });
                    return Wui.O.prototype.place.apply(me,arguments);
                },
    push:       function(){
                    var me = this, itms = [];
                    
                    Array.prototype.forEach.call(arguments,function(arg){ itms.push(me.normFrmItem(arg)); });

                    return Wui.O.prototype.push.apply(this,itms);
                },
    splice:     function(){
                    var me = this, 
                        itms = [],
                        index = Array.prototype.shift.apply(arguments),
                        remove = Array.prototype.shift.apply(arguments);

                    // Create/normalize passed in objects
                    Array.prototype.forEach.call(arguments,function(arg){ itms.push(me.normFrmItem(arg)); });

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
    disable:    function(){ 
                    this.disabled = true; 
                    return this.each(function(itm){ itm.disable(); }, true); 
                },
    enable:     function(){ 
                    this.disabled = false; 
                    return this.each(function(itm){ itm.enable(); }, true); 
                },
    setField:   function(fieldname, v){
                    this.each(function(itm){ if(itm.name == fieldname) itm.val(v); }, true);
                },
    throwError: function(err){
                    this.errors.push(err); 
                    return false;
                },
    validate:   function(){
                    var me = this;

                    me.errors = [];

                    me.each(function(itm){
                        if(typeof itm.el.toggleClass !== 'undefined')
                            itm.el.toggleClass( me.errCls, !itm.validate() );
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
    init:   function(){ this.el = $('<div>').html(this.html).addClass('w121-note'); },
    setHTML:function(html){ this.el.html(html); }
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
                    
                            Wui.O.prototype.init.call(me);

                            me.el = $('<div>').addClass('w121-lbl').append( 
                                me.label = $('<label>',me.attr ? me.attr : {}).addClass(me.cls)
                            );

                            if(me.field.id && me.field.id.length)
                                me.label.attr('for', me.field.id);

                            me.setLabel();
                            me.setLabelPosition();
                        },
    setLabel:           function(newLabel){
                            newLabel = newLabel || this.html;
                            this.label.html(this.html = newLabel);
                            return this.label.html();
                        },
    setLabelSize:       function(size){
                            var me = this,
                                dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width',
                                altDim = (dimension == 'height') ? 'width' : 'height',
                                cssObj = {};

                            size = $.isNumeric(size) ? size : me.labelSize;

                            cssObj[dimension] = size;
                            cssObj[altDim] = '';
                            me.label.css(cssObj);

                            if(me.field)
                                me.field.labelSize = me.labelSize = size;
                        },

    setLabelPosition:   function(pos){
                            var me = this,
                            position = (pos && (pos = pos.toLowerCase()) && $.inArray(pos,['top', 'left', 'bottom', 'right']) >= 0) ? pos : me.labelPosition;

                            me.el.removeClass('lbl-' + me.labelPosition).addClass('lbl-' + position);
                            
                            if(me.field)
                                me.field.labelPosition = position;
                            
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
    argsByParam:function(){
                    Wui.O.prototype.argsByParam.apply(this,[ [ 'name', 'id' ], (this.hiddenField || this.field) ]);
                },
    init:       function(){
                    var me = this;
                    
                    Wui.O.prototype.init.call(me);

                    me.value = me.hasOwnProperty('value') ? me.value : null;
                    me.el = $('<div>').addClass('w121-fe');

                    if(!(me.name && me.name.length !== 0))
                        me.name = Wui.id('w121-form-field');

                    if(!(me.id && me.id.length !== 0) || !me.hasOwnProperty('id'))
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

                        // Expose label methods at the formField's level
                        $.extend(me,{
                            setLabel: function(){ me.lbl.setLabel.apply(me.lbl, arguments); },
                            setLabelSize: function(){ me.lbl.setLabelSize.apply(me.lbl, arguments); },
                            setLabelPosition: function(){ me.lbl.setLabelPosition.apply(me.lbl, arguments); }
                        });
                    }

                    return me.el;
                },
    onRender:   function(){
                    var me = this;

                    if(me.rendered !== true){
                        if(me.disabled)
                            me.disable();
                        if(typeof me.value != 'undefined' && me.value !== null)
                            me.val(me.value,false);

                        Wui.O.prototype.onRender.call(me);
                    }
                },
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('w121-disabled').find('input,textarea,iframe').attr({readonly: true, tabIndex:-1});
                },
    enable:        function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('w121-disabled').find('.w121-disabled,*[readonly]').removeAttr('readonly tabIndex');
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
                    var me = this;

                    // Marks the parent form as 'changed'
                    if(me.parent && me.parent instanceof Wui.Form)
                        me.parent.formChange(true, me);
                    
                    // Calls functionally defined valChange() - one will override another
                    me.valChange(me, me.value, oldVal);
                    
                    // Calls listeners for valchange
                    if(me.field) {
                        me.field.trigger($.Event('valchange'), [me, me.value, oldVal, me.val()]);
                    }
                    else {
                        $(document).trigger($.Event('hiddenchange'), [me, me.value, oldVal, me.val()]); // To preserve legacy
                    }
                },
    getVal:     function(){
                    return this.value;
                },
    setVal:     function(sv){
                    this.value = sv;
                },
    valChange:  function(){}
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
    getVal:     function(){ 
                    this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null;
                    
                    return this.value;
                },
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
    onRender:       function(){
                        var me = this;

                        if(me.rendered !== true){
                            Wui.FormField.prototype.onRender.call(me);

                            // Add a character counter - must be done outside the character counter
                            if($.isNumeric(me.maxChars) && me.counter === true){
                                me.append(me.charCounter = $('<output>',{tabindex:-1, for:me.id}).addClass('w121-char-counter'));
                                me.field.keyup(function(){
                                    var initVal = (me.val()) ? me.maxChars - me.val().length : me.maxChars;
                                    
                                    me.charCounter.text(initVal);
                                    if(initVal >= 0)    me.charCounter.css('color','#333');
                                    else                me.charCounter.css('color','#900');
                                });

                                me.field.keyup();
                            }
                        }
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
                    this.field.css({ height: this.height });
                    this.el.css({ height: '' });
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
        showHTML:   false,
        fullPath:   /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        relativePath: /(\/|\/([\w#!:.?+=&%@!\-\/]))/
    },args,{

    });
    this.init();
};
Wui.Wysiwyg.prototype = $.extend(new Wui.FormField(),{
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    this.field.css({ height: this.height });
                    this.el.css({ height: '' });
                },
    init:       function(){
                    var me = this,
                        iframeId = Wui.id();

                    //  TODO: Are we using mutation summary anymore??
                    me.observer = new MutationSummary({
                        callback:   function(){
                                        var edit = me.editor = me.iframe[0].contentWindow.document;

                                        // Make the iframe editable and set up its style
                                        edit.designMode = 'on';
                                        edit.open();
                                        edit.close();
                                        if(me.css.length) $('head',edit).append($('<style>').attr({type:'text/css'}).text(me.css));

                                        // Add menu buttons
                                        me.bold.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("bold"); });
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
                                                                        return (this.fullPath.test(v) || this.relativePath.test(v));
                                                                    },
                                                        setListeners:function(){
                                                                        var me = this;

                                                                        return me.field.on('blur click keyup keydown mousedown', function(){
                                                                            Wui.Link.prototype.buildOutput.call(me,{
                                                                                uri:    me.field.val(),
                                                                                target: '_blank',
                                                                                title:  r.toString()
                                                                            });
                                                                        });
                                                                    }
                                                    }]
                                                );
                                                window.setTimeout(function(){ a.parent.modalEl.css('z-index',Wui.maxZ()); }, 100);
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

                                        function updateText(){ me.setTextArea(); }

                                        $(edit.body)
                                            .focus(updateText)
                                            .click(updateText)
                                            .keyup(updateText)
                                            .keydown(updateText)
                                            .mousedown(updateText)
                                            .blur(updateText);

                                        $(me.elAlias || me.el).resizes({
                                            anchored:   true,
                                            minWidth:   (me.elAlias || me.el).outerWidth(),
                                            minHeight:  (me.elAlias || me.el).outerHeight()
                                        });
                                    },
                        queries:    [{ element: '#' + iframeId }]
                    });

                    Wui.FormField.prototype.init.call(me);

                    me.el.addClass('w121-wysiwyg');
                    me.append(
                        me.field = $('<textarea>',{tabIndex:-1}).hide(),
                        me.iframe = $('<iframe>',{id:iframeId}).addClass('w121-editor'),
                        me.tools = $('<div>').addClass('w121-editor-tools')
                    );

                    me.tools.append(
                        me.bold = $('<i class="fa fa-bold">',{tabIndex:-1, title:'Bold'}),
                        me.italic = $('<i class="fa fa-italic">',{tabIndex:-1, title:'Italic'}),
                        me.underline = $('<i class="fa fa-underline">',{tabIndex:-1, title:'Underline'}),
                        me.strike = $('<i class="fa fa-strikethrough">',{tabIndex:-1, title:'Strike-through'}),
                        me.link = $('<i class="fa fa-link">',{tabIndex:-1, title:'Link'}),
                        me.unlink = $('<i class="fa fa-unlink">',{tabIndex:-1, title:'Un-Link'}),
                        me.ol = $('<i class="fa fa-list-ul">',{tabIndex:-1, title:'Unorderd List'}),
                        me.ul = $('<i class="fa fa-list-ol">',{tabIndex:-1, title:'Ordered List'}),
                        me.left = $('<i class="fa fa-align-left">',{tabIndex:-1, title:'Left Align'}),
                        me.center = $('<i class="fa fa-align-center">',{tabIndex:-1, title:'Center Align'}),
                        me.right = $('<i class="fa fa-align-right">',{tabIndex:-1, title:'Right Align'})
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
                        var sel = this.getSelection();
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
    setTextArea:function(){
                    this.field.val(this.getVal());
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
                    
                    this.value = (retVal.length === 0) ? null : retVal;
                    
                    return this.value;
                },
    setVal:     function(sv){
                    var me = this;
                    me.value = sv;
                    me.field.val(sv);
                    if(me.editor)
                        $(me.editor.body).html(sv);
                }
});

Wui.Radio = function(args){ 
    $.extend(this,{
        /** A true value converts the normal radio group to a button group */
        buttonStyle:false,
        
        /** A default name that should be overridden */
        name:       'w121-radio',
        
        /** An array of options to populate the radion/button group */
        options:    [],
        
        /** Default template for the radio group */
        template:   '<li><input type="radio" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args,{
        el:         $('<div>')
    });
    this.init();
};
Wui.Radio.prototype = $.extend(new Wui.FormField(),{
    init:       function(){
                    Wui.FormField.prototype.init.call(this);
                    this.el.addClass('w121-radio');
                    
                    var me = this,
                        tplEngine = new Wui.Template({ template:this.template }),
                        ul = $('<ul>');
                    
                    me.options.forEach(function(itm){
                        itm.name = me.name;
                        itm.id = Wui.id('w121-form-multiple');
                        
                        ul.append(
                            tplEngine.make(tplEngine.data = itm)
                            .children('label')
                                .attr({unselectable:'on'})
                                .keyup(function(evnt){
                                    if(evnt.keyCode == 13 || evnt.keyCode == 32)
                                        $(this).click();
                                })
                            .end()
                            .children('input')
                            .change(function(){ me.elemChange($(this)); })
                            .focus(function(){ul.addClass('has-focus');})
                            .blur(function(){ul.removeClass('has-focus');})
                            .end()
                        );
                    });
                    
                    // make radio group look like buttons
                    if(me.buttonStyle){
                        ul.addClass('button');
                        ul.find('label').attr({tabindex:0});
                    }
                    
                    // Append to DOM
                    me.append(ul);
                },
    /** Disables the field so the user cannot interact with it. */
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('w121-disabled').find('input,textarea,iframe').attr('disabled','disabled');
                },

    /** What to do when an individual element changes */
    elemChange:    function(elem){ this.val(elem.val()); },
    
    /** Enables the field so the user can interact with it. */
    enable:     function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('w121-disabled').find('.w121-disabled,*[disabled]').removeAttr('disabled');
                },
    getVal:     function(){ return this.value; },
    setChanged: function(oldVal){
                    var me = this;

                    // Marks the parent form as 'changed'
                    if(me.parent && me.parent instanceof Wui.Form)
                        me.parent.formChange(true, me);
                    
                    // Calls functionally defined valChange() - one will override another
                    me.valChange(me, me.value, oldVal);
                    
                    // Calls listeners for valchange
                    me.el.find('input:first').trigger($.Event('valchange'), [me, me.value, oldVal, me.val()])
                        .trigger($.Event('hiddenchange'), [me, me.value, oldVal, me.val()]); // To preserve legacy
                },
    setVal:     function(sv){
                    this.value = sv;
                    this.el.find("input[value='" + sv + "']").attr('checked',true);
                }
});

Wui.Checkbox = function(args){ 
    $.extend(this,{
        name:       'w121-checkbox',
        template:   '<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args);
this.init(); };
Wui.Checkbox.prototype = $.extend(new Wui.Radio(),{
    calcVal:    function(){
                    var me = this, a = [];
                    
                    me.el.find('input:checked').each(function(){
                        a.push($(this).val());
                    });
                    
                    return ((a.length > 0) ? (a.length > 1) ? a : a[0] : null);
                },
    elemChange: function(){ this.val(this.calcVal()); },                    
    init:       function(){
                    var me = this;
                    if(me.options.length === 0) me.options.push({val:1,title:''});
                    
                    Wui.Radio.prototype.init.call(me);
                    me.el.removeClass('w121-radio').addClass('w121-checkbox');
                    
                    //steal label if there is only one option
                    if(me.options.length == 1){
                        if(!(me.label && me.label.length))
                            throw('Wui Forms - A Checkbox field ' + (me.name ? '(\'' + me.name + '\')' : '') + ' requires a label if it doesn\'t have options defined.');
                        me.el.find('li label').html(me.label);
                        me.lbl.label.html('');
                        // me.el.css({paddingTop:0, paddingBottom:0});
                    }
                },
    getVal:     function(){ return this.calcVal(); },
    setVal:     function(sv){
                    var me = this;
                    
                    if($.isArray(sv))               { me.value = sv; }
                    else if(sv === null)            { me.value = null; }    
                    else                            { me.value = [sv]; }
                    
                    if(me.options.length == 1 && (typeof sv == 'number' || typeof sv == 'string')){
                        me.el.find('input').prop('checked',!!parseInt(sv)).siblings('li').toggleClass('checked',!!parseInt(sv));
                    }else{
                        // clear out all checkboxes
                        me.el.find('input').attr('checked',false);
                        me.el.find('label').removeClass('checked');
                        
                        // set the ones passed in
                        if(me.value && me.value.length)
                            for(var i = 0; i < me.value.length; i++)
                                me.el.find('input[value=' +me.value[i]+ ']').prop('checked',true).siblings('li').addClass('checked');
                    }
                },
    validTest:  function(){ if(this.required && this.val() === 0) return false;    return true; }
});

Wui.Combo = function(args){
    $.extend(this, {
        autoLoad:   false,
        ddCls:      '',
        emptyMsg:   'No Results.',
        field:      $('<input>',{type:'text'}),
        hiddenField:$('<input>',{type:'hidden'}),
        filterField:true,
        forceSelect:false,
        minKeys:    1,
        searchArgName:'srch',
        searchLocal:true,
        showDD:     true,
        titleItem:  null,
        valueItem:  null
    },args,{
        multiSelect:false
    }); 

    // Create template when one hasn't been defined
    if( !(this.hasOwnProperty('template') && this.template !== null && this.template !== undefined) &&
        this.hasOwnProperty('valueItem') &&
        this.hasOwnProperty('titleItem') &&
        this.valueItem &&
        this.titleItem
    ){
        this.template = '<li>{' +this.titleItem+ '}</li>';
        this.noSpecifiedTemplate = true;
    }
    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.FormField(), new Wui.DataList(), {
    close:      function(){ 
                    this._open = false;
                    this.dd.css('display','none');
                },
    argsByParam:function(){
                    Wui.O.prototype.argsByParam.apply(this,[ ['name'], (this.hiddenField || this.field) ]);
                },
    hilightText:function(srchVal){
                    var me = this;

                    function clearHilight(obj){
                        return obj.find('.wui-highlight').each(function(){
                            $(this).replaceWith($(this).html());
                        }).end();
                    }
                    
                    function hilightText(obj){
                        if (obj.children().length) {
                            obj.children().each(function(){
                                hilightText($(this));
                            });
                        }
                        else {
                            obj.html(
                                obj.text().replace( new RegExp(srchVal,"ig"), function(m){
                                    return '<span class="wui-highlight">' +m+ '</span>';
                                })
                            );
                        }
                        
                        return obj;
                    }

                    me.dd.children().each(function(){
                        var itm = $(arguments[1]);

                        if(itm.text().toUpperCase().indexOf(srchVal.toUpperCase()) >= 0)    hilightText(itm).show();
                        else                                                                clearHilight(itm).hide();
                    });

                    Wui.positionItem(me.field,me.dd);
                },
    init:       function(){
                    var me = this;

                    // Set up object
                    Wui.FormField.prototype.init.call(me);
                    me.el.addClass('w121-combo ' + (me.idCls = Wui.id()));
                    me._open = false;
                    me.identity = me.valueItem;
                    if(typeof me.blankText !== 'undefined')
                        me.setBlankText(me.blankText);
                    

                    // Place field elements
                    me.append( 
                        me.wrapper = $('<div>').addClass('w121-combo').append(
                            me.hiddenField,
                            me.setListeners(me)
                        )
                    );
                    $('body').append( me.dd = $('<ul>').addClass('w121-combo-dd ' + me.ddCls) );

                    // Listeners - These listeners must stop propagation or else they
                    // will trigger events for their containing DataLists (like grids with
                    // combos in the tbar)
                    me.el.on({
                        wuichange:  function(evnt,combo,el,rec,selection){
                                        var text = (selection.length) ? rec[combo.titleItem] : combo.previous;
                                        Wui.Text.prototype.fieldText.call(me,text);
                                        evnt.stopPropagation();
                                    },
                        click:      function(evnt){ evnt.stopPropagation(); },
                        wuiselect:  function(evnt){ evnt.stopPropagation(); },
                        wuideselect:function(evnt){ evnt.stopPropagation(); },
                        datachanged:function(evnt){ evnt.stopPropagation(); },
                        wuidblclick:function(evnt){ evnt.stopPropagation(); },
                        wuibtnclick:function(evnt){
                                        if(me._open) me.close();
                                        else         me.open();
                                        me.field.focus();

                                        evnt.stopPropagation();
                                    }
                    });

                    // Create Dropdown Button
                    if(me.showDD){
                        me.ddSwitch = new Wui.Button({
                            text:       '<i class="fa fa-angle-down"></i>',
                            tabIndex:   -1,
                            appendTo:   me.wrapper,
                            cls:        'field-btn dd-switch'
                        });
                        me.ddSwitch.place();
                        me.ddSwitch.el.mousedown(function(){ me.isBlurring = false; });
                    }
                },
    /** Override Wui.Datalist.onRender to make it do nothing */
    onRender:   function(){
                    if(this.rendered !== true){
                        // Loads data per the method appropriate for the object
                        if(this.autoLoad && this.url !== null)  this.loadData();
                        else if(this.url === null)              this.make();

                        Wui.FormField.prototype.onRender.apply(this,arguments);
                    }
                },
    itemSelect: function(itm, silent){
                    var me = this;

                    me.dd.find('.w121-selected').removeClass('w121-selected');
                    itm.el.addClass('w121-selected');
                    me.selected = [itm];
                    
                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },
    make:       function(){
                    var me = this;

                    me.elAlias = me.dd.empty().removeClass('w121-spinner');
                    Wui.DataList.prototype.make.call(me);
                    if(me.data.length === 0)
                        me.elAlias.html(me.emptyMsg);

                    window.setTimeout(function(){
                        me.dd.children()
                        .off('click')
                        .bind('touchstart',function(){ 
                            me.itemSelect($(this).data('itm')); 
                            me.isBlurring = false; 
                        }).on({
                            mouseenter: function(){ me.itemSelect($(this).data('itm')); },
                            mousedown:  function(){ me.isBlurring = false; },
                            click:      function(){ me.set(); me.field.focus(); }
                        });

                        if(me.previous && me.previous.length && me.noSpecifiedTemplate)
                            me.hilightText(me.previous);

                        me.dd.on('mousedown',function(){ me.isBlurring = false; });

                        // Select a pre-applied value if it exists
                        if(me.value && me.field.val().length === 0){
                            var selectedItm = me.selectBy(me.valueItem, me.value);
                            
                            if(!selectedItm)    me.notFound(me.value);
                            else                me.set();
                        }
                    },0);
                },
    modifyItem: function(itm){ return itm.el.data('itm',itm); },
    notFound:   function(){},
    open:       function(){
                    var me = this, 
                        width = (me.field.innerWidth() < 100) ? 100 : me.field.innerWidth();

                    me._open = true;

                    // Clear the drop down when it loses focus
                    $(document).one('click','*:not(.' +me.idCls+ ' input)',function(evnt){ 
                        if(evnt.target !== me.field[0]) me.close(); 
                    });
                    $('body').append(me.dd.css({width:width, display:'block'}));

                    Wui.positionItem(me.field,me.dd);
                    me.scrollToCurrent();
                },
    searchData: function(srchVal){
                    var me = this, oldSearch = me.previous || undefined;

                    if(me.filterField){
                        me.previous = srchVal;
                        
                        if(me.searchLocal){
                            me.hilightText(srchVal);
                        }else{
                            me.clearSelect();
                            if((srchVal.length >= me.minKeys || srchVal.length === 0) && me.previous != oldSearch){
                                if(srchVal.length === 0)
                                    me.val(null);

                                // me.open();
                                me.dd.addClass('w121-spinner');

                                var srchParams = {};
                                srchParams[me.searchArgName] = srchVal;
                                me.loadData(srchParams);
                            }
                        }  
                    }
                },
    selectAjacent:function(num){
                    var me = this,
                        selector = me._open ? ':visible' : '',
                        container = me.elAlias || me.el,
                        theEnd = (num == 1) ? ':first' : ':last',
                        fn = (num == 1) ? 'nextAll' : 'prevAll',
                        itm = me.selected.length ? me.selected[0].el[fn](selector+':first') : container.children(selector+theEnd);

                    return me.selectByEl(itm);
                },
    selectBy:   function(key,val){
                    var me = this, retVal;

                    me.each(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val){
                            retVal = me.itemSelect(itm);
                            return retVal;
                        }
                    });

                    return retVal;
                },
    set:        function(){
                    var me = this, sel = me.selected[0];

                    if(sel && me.value != sel.rec){
                        me.val(sel.rec);

                        if(sel.rec)
                            me.hiddenField.val(sel.rec[me.valueItem]);
                    }
                        
                    if(me._open)
                        me.close();
                },
    setBlankText:function(){ 
                    Wui.Text.prototype.setBlankText.apply(this,arguments); 
                },
    setListeners:function(t){
                    // t = the combo field
                    return t.field.on({
                        keydown: function(evnt){
                            evnt.stopPropagation();

                            //clear the value if the user blanks out the field
                            if(t.field.val().length === 0){
                                t.value = null;
                                t.hiddenField.val('');
                            }

                            switch(evnt.keyCode){
                                case 40:    move(1);                break;  // downkey
                                case 38:    move(-1);               break;  // upkey
                                case 9:     t.set();                break;  // tab
                                case 13:    evnt.preventDefault();  break;  // enter
                                case 27:                                    // escape
                                    t.field.val(t.previous);
                                    t.close();
                                break;
                            }
                        },
                        keypress:function(evnt){
                            evnt.stopPropagation();
                            if(evnt.keyCode == 13)  // enter
                                evnt.preventDefault();
                        },
                        keyup: function(evnt){
                            evnt.stopPropagation();
                            if(evnt.keyCode == 13){  // enter
                                t.set();
                                evnt.preventDefault();
                            }
                        },
                        input: function(){
                            if(!t._open) t.open();
                            t.searchData(this.value);
                        },
                        focus: function(evnt){
                            t.isBlurring = undefined;
                            evnt.stopPropagation();
                        },
                        blur: function(){
                            if(t.isBlurring !== false){
                                t.close();
                            }else{
                                // IE needs some time
                                window.setTimeout(function(){ t.field.focus(); }, 10);
                                // evnt.preventDefault();
                            }
                        }
                    });

                    function move(dir){
                        var itm = null;

                        if(t.selected.length){
                            var edgeSel = (dir == 1) ? ':last' : ':first',
                                selector = t._open ? ':visible' : '',
                                onEdge = (t.elAlias || t.el).children(selector+edgeSel)[0] == t.selected[0].el[0];

                            if(onEdge)  t.clearSelect();
                            else        itm = t.selectAjacent(dir);
                        }else{
                            itm = t.selectAjacent(dir);
                        }

                        // Actually change the value if the drop-down isn't open
                        if(!t._open){
                            if(itm !== null)    { t.set(); }
                            else                { t.val(null); t.field.val(t.previous); }
                        }
                    }
                },
    setVal:     function(sv){
                    var me = this;

                    me.value = sv;

                    function selectObj(selectWith){
                        var val = me.selectBy(me.valueItem,selectWith);
                        if(typeof val != 'undefined'){
                            me.value = val.rec;
                            me.hiddenField.val(val.rec[me.valueItem]);
                        }else{
                            me.value = sv;
                            me.hiddenField.val( (typeof sv == 'number' || typeof sv == 'string') ? sv : '' );
                        }
                        return me.value;
                    }

                    if(sv === null){
                        me.clearSelect();
                        me.hiddenField.val('');
                        return sv;
                    }else{
                        return selectObj( (typeof sv == 'object') ? sv[me.valueItem] : sv );
                    }
                },
    getVal:     function(){
                    return (this.value !== null && typeof this.value[this.valueItem] != 'undefined') ? this.value[this.valueItem] : this.value;
                }
});

Wui.Link = function(args) { 
    $.extend(this, {
        invalidMsg: 'The value for \'' + ((this.label) ? this.label : (this.args && this.args.name) ? this.args.name : 'a link field') + '\' is not a properly formatted link.',
        fullPath:   /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        relativePath: /(\/|\/([\w#!:.?+=&%@!\-\/]))/
    }, args);
    this.init();
};
Wui.Link.prototype = $.extend(new Wui.FormField(),{
    buildOutput:function(v){
                    var me = this,
                        val = v || me.value;

                    if(me.outputFld === undefined)
                        me.append(me.outputFld = $('<output>',{tabindex:-1,for:me.id}).addClass('feedback'));

                    if(me.testLink()){
                        var tp = new Wui.Template({
                            data:       val, 
                            template:   '<span>Preview:</span> <a href="{uri}" target="{target}" '+
                                        'class="{((target == "_blank") ? "uri-new-win" : "")}">{title}</a>'
                        });
                        me.outputFld.html(tp.make());
                    }else{
                        if(val.uri && val.uri.length > 2)
                            me.outputFld.html('Your link is improperly formatted.');
                        else
                            me.outputFld.empty();
                    }  
                },
    init:       function(){
                    var me = this;
                    
                    me.items = [
                        me.urlField     = new Wui.Text({ cls:'w121-link-focus', blankText:'URL', linkData:'uri' }),
                        me.titleField   = new Wui.Text({ blankText:'Display Text', linkData:'title'}),
                        me.targetField  = new Wui.Combo({
                            valueItem:  'target', 
                            titleItem:  'name', 
                            blankText:  'Target', 
                            keepInline: true,
                            data:       [{target:'_self', name:'Opens In Same Window'}, {target:'_blank', name:'Opens In New Window/Tab'}], 
                            linkData:   'target',
                            cls:        'no-margin'
                        })
                    ];
                    
                    Wui.FormField.prototype.init.call(me);
                    me.value = { target: '_self', title: null, uri: null };
                    
                    (me.elAlias || me.el).addClass('w121-hyperlink');
                    
                    //additional listeners and initial value for target
                    me.setListeners(me.urlField,me.titleField,me.targetField);
                    me.targetField.val(me.value.target);
                   
                    me.urlField.field.keyup(function(){
                        //sets the title the same as the url - for laziness' sake
                        if(me.titleField.field.val() == me.titleField.blankText)
                            me.value.title = null;
                        if(me.value.title === null)
                            me.titleField.val($(this).val());
                    })
                    .blur(function(){ me.value.title = me.titleField.val(); });
                },
    setListeners:function(){
                    var me = this,
                        flds = arguments;
                        
                    Array.prototype.forEach.call(flds,function(itm){
                        (itm.field.field || itm.field).on('blur click keyup keydown mousedown', null, itm, function(e){
                            var wuiObjVal = e.data.val();
                            if(wuiObjVal !== null && wuiObjVal != {}) me.value[e.data.linkData] = wuiObjVal;
                            me.buildOutput.call(me);
                        })
                        .on('focus',null, itm, function(e){
                            Array.prototype.forEach.call(flds,function(field){ field.el.removeClass('w121-link-focus'); });
                            e.data.el.addClass('w121-link-focus');
                        });
                    });
                },       
    testLink:   function isUrl() {
                    return (this.fullPath.test(this.value.uri) || this.relativePath.test(this.value.uri));
                },
    getVal:     function(){
                    return this.value;
                },
    setVal:     function(sv){
                    $.extend(this.value,sv);
                    this.urlField.val(this.value.uri);
                    this.titleField.val(this.value.title);
                    this.targetField.val(this.value.target);
                    this.buildOutput();
                },
    validTest:  function(){ if(this.required && !this.testLink()) return false; return true; }
});

Wui.Datetime = function(args){ 
    $.extend(this,args,{ 
        field:      $('<input>',{type:'text'}),
        hiddenField:$('<input>',{type:'hidden'}),
        maxDate:    null,
        minDate:    null
    });
    this.init();
};

// If date has already been extended, dont' attempt to extend it again
if(typeof Date.CultureInfo === 'undefined'){
    $.extend(Date,{
        CultureInfo:            {
                                    name: "en-US",
                                    englishName: "English (United States)",
                                    nativeName: "English (United States)",
                                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                                    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
                                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                    amDesignator: "AM",
                                    pmDesignator: "PM"
                                },
        
        isLeapYear:             function(year) {
                                    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
                                },
        getDaysInMonth:         function(year, month) {
                                    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                                },
        getTimezoneOffset:      function(s, dst) {
                                    return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];
                                },
        getTimezoneAbbreviation:function(offset, dst) {
                                    var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
                                        p;
                                    for (p in n) {
                                        if (n[p] === offset) {
                                            return p;
                                        }
                                    }
                                    return null;
                                }
    });
    $.extend(Date.prototype,{
        getDayOfYear:   function(){
                            var start = new Date(this.getFullYear(), 0, 0),
                                diff = this - start,
                                oneDay = 1000 * 60 * 60 * 24,
                                day = Math.floor(diff / oneDay) - 1; // -1 to make it zero based

                            return day;
                        },
        getDaysInMonth: function() {
                            return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
                        },
        addMilliseconds:function(value) {
                            this.setMilliseconds(this.getMilliseconds() + value);
                            return this;
                        },
        addSeconds:     function(value) {
                            return this.addMilliseconds(value * 1000);
                        },
        addMinutes:     function(value) {
                            return this.addMilliseconds(value * 60000);
                        },
        addHours:        function(value) {
                            return this.addMilliseconds(value * 3600000);
                        },
        addDays:        Date.prototype.addDays = function(value) {
                            return this.addMilliseconds(value * 86400000);
                        },
        addWeeks:       function(value) {
                            return this.addMilliseconds(value * 604800000);
                        },
        addMonths:      function(value) {
                            var n = this.getDate();
                            this.setDate(1);
                            this.setMonth(this.getMonth() + value);
                            this.setDate(Math.min(n, this.getDaysInMonth()));
                            return this;
                        },
        addYears:       function(value) {
                            return this.addMonths(value * 12);
                        },
        add:            function(config) {
                            if (typeof config == "number") {
                                this._orient = config;
                                return this;
                            }
                            var x = config;
                            if (x.millisecond || x.milliseconds) {
                                this.addMilliseconds(x.millisecond || x.milliseconds);
                            }
                            if (x.second || x.seconds) {
                                this.addSeconds(x.second || x.seconds);
                            }
                            if (x.minute || x.minutes) {
                                this.addMinutes(x.minute || x.minutes);
                            }
                            if (x.hour || x.hours) {
                                this.addHours(x.hour || x.hours);
                            }
                            if (x.month || x.months) {
                                this.addMonths(x.month || x.months);
                            }
                            if (x.year || x.years) {
                                this.addYears(x.year || x.years);
                            }
                            if (x.day || x.days) {
                                this.addDays(x.day || x.days);
                            }
                            return this;
                        },
        getDayName:     function(abbrev) {
                            return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
                        },
        getMonthName:   function(abbrev) {
                            return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
                        },
        _toString:      Date.prototype.toString,
        toString:       function(format) {
                            var self = this;
                            var p = function p(s) {
                                    return (s.toString().length == 1) ? "0" + s : s;
                                };
                            return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function(format) {
                                switch (format) {
                                case "hh":
                                    return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
                                case "h":
                                    return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
                                case "HH":
                                    return p(self.getHours());
                                case "H":
                                    return self.getHours();
                                case "mm":
                                    return p(self.getMinutes());
                                case "m":
                                    return self.getMinutes();
                                case "ss":
                                    return p(self.getSeconds());
                                case "s":
                                    return self.getSeconds();
                                case "yyyy":
                                    return self.getFullYear();
                                case "yy":
                                    return self.getFullYear().toString().substring(2, 4);
                                case "dddd":
                                    return self.getDayName();
                                case "ddd":
                                    return self.getDayName(true);
                                case "dd":
                                    return p(self.getDate());
                                case "d":
                                    return self.getDate().toString();
                                case "MMMM":
                                    return self.getMonthName();
                                case "MMM":
                                    return self.getMonthName(true);
                                case "MM":
                                    return p((self.getMonth() + 1));
                                case "M":
                                    return self.getMonth() + 1;
                                case "t":
                                    return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
                                case "tt":
                                    return self.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
                                case "zzz":
                                case "zz":
                                case "z":
                                    return "";
                                }
                            }) : this._toString();
                        }
    });
}
/** End borrowing from date.js */

Wui.Datetime.prototype = $.extend(new Wui.Text(), {
    second:         1e3,
    minute:         6e4,
    hour:           36e5,
    day:            864e5,
    days:           ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'],
    shortDays:      ['sun','mon','tue','wed','thu','fri','sat'],
    months:         ['january','february','march','april','may','june','july','august','september','october','november','december'],
    shortMonths:    ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
    sarcasmArray:   ['Not quite.','Huh?','Nope','Arg..','Sorry','What?','Bleck.','Nuh-uh.','Keep Trying.','No Entiendo.'],
    dispFormat:     'ddd MM-dd-yyyy h:mm tt',
    dtFormat:       'MM-dd-yyyy h:mm tt',
    dateOnly:       false,
    argsByParam:    function(){
                        Wui.O.prototype.argsByParam.apply(this,[ ['name'], (this.hiddenField || this.field) ]);
                    },
    displayDate:    function(overrideText){
                        var me = this;
                        
                        // process current date value
                        if(overrideText !== undefined){ me.outputFld.html(overrideText); return overrideText; }
                        if(me.value === '' || (!me.value)) { return null; }
                        
                        //validation for min and max
                        if(me.minDate && me.value < me.minDate)         me.outputFld.html(me.toString() + ' is before the min date.');
                        else if (me.maxDate && me.value > me.maxDate)   me.outputFld.html(me.maxDate.toString(me.dtFormat) + ' is past the max date.');
                        else                                            me.outputFld.html(me.toString(me.dispFormat));
                        
                        return  me.toString();
                    },
    getM:           function(num){
                        var magnitude = 0;
                        while((num = num / 10) >= 1) magnitude++;
                        return magnitude;
                    },
    init:           function(){
                        var me = this;

                        Wui.Text.prototype.init.call(me);

                        me.el.addClass('w121-datetime');

                        // Limit field to dates only if specified
                        if(me.dateOnly){
                            if(!me.hasOwnProperty('dispFormat')) me.dispFormat = 'ddd MM-dd-yyyy';
                            if(!me.hasOwnProperty('dtFormat')) me.dtFormat = 'MM-dd-yyyy';
                        }

                        // Add datepicker
                        me.append(
                            $('<div>').addClass('w121-date').append( 
                                me.hiddenField, 
                                me.setListeners(me), 
                                me.outputFld = $('<output>',{tabindex:-1, for:me.id}).addClass('feedback'),
                                me.toggleCal = $('<button>',{tabIndex:-1}).html('<i class="fa fa-calendar"></i>')
                            )
                        );
                        
                        me.toggleCal.click(function(){
                            if(!me.calendar){
                                // Add calendar to the body with listeners
                                $('body').append(
                                    me.calendar = me.makeCalendar(undefined,function(year,month,day){
                                        me.value = (me.validDate(me.value)) ?
                                            new Date(year,month,day,me.value.getHours(),me.value.getMinutes()) :
                                            new Date(year,month,day);
                                        me.val(me.displayDate());
                                    }).click(function(){return false;})
                                );

                                // Clear the calendar when the user moves away from it
                                $(document).one('click',function(){
                                    $('.w121-cal').remove(); me.calendar = undefined;
                                });

                                // Position calendar to ensure it will be seen
                                Wui.positionItem(me.field,me.calendar);
                            // Otherwise clear the calendar
                            }else{ me.calendar.remove(); me.calendar = undefined; }

                            // Prevent the click from propagating
                            return false;
                        });
                    },
    onRender:       Wui.FormField.prototype.onRender,
    num2Dec:        function (words){
                        var numberRepl = {  a:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,
                            thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,
                            thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100,thousand:1e3,
                            million:1e6,billion:1e9,trillion:1e12,quadrillion:1e15,quintillion:1e18
                        };
            
                        //replace the written words with numbers
                        words = words.toString().replace(/ and /g,' ').replace(/-/g,' ');
                        $.each(numberRepl,function(i){
                            words = words.replace(new RegExp('(^|[ ]|-)' + i + '(-|[ ]|$)','g'),' ' + numberRepl[i] + ' ');
                        });
                        
                        var wArray = $.trim(words).split(/[ ]+/),
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
                       
                        for(var i = 0; i < partsArry.length; i++){
                            var tmp = this.txt2Num(partsArry[i]);
                            if(parseInt(tmp))
                                finalNum += parseInt(tmp);
                        }
                       
                        return finalNum;
                    },
    makeCalendar:   function(dt,onSelect,controlVal){
                        var me = this,
                            today = new Date(),
                            ctrlVal = this.validDate(controlVal) ? controlVal : this.value,
                            calDate = dt || (me.validDate(ctrlVal) ? ctrlVal : today),
                            dn = (me.name) ? '.' + me.name : '',
                            calendar = $('<div>').addClass('w121-cal');

                        calendar.append(genHTML(calDate));
                        // Fire event for other controls to respond to calendar reflow
                        $(document).trigger($.Event('calupdate' + dn), [me, calendar, calDate]);
                        
                        return calendar;

                        function genHTML(genDt){
                            var day = 1, i = 0, j = 0,
                                month = genDt.getMonth(),
                                year = genDt.getFullYear(),
                                selectDy = genDt.getDate(),
                                firstDay = new Date(year, month, 1),
                                startingDay = firstDay.getDay(),
                                monthLength = genDt.getDaysInMonth(),
                                monthName = me.months[month],
                                html = '<table w121-month="' +month+ '" w121-year="' +year+ '">';
                            
                            // Generate Header
                            html += '<tr><th colspan="7"><div class="w121-cal-header">' + monthName + "&nbsp;" + year + '</div></th></tr>';
                            html += '<tr class="w121-cal-header-day">';
                            for (i = 0; i <= 6; i++)
                                html += '<td>' +me.shortDays[i].substring(0,2)+ '</td>';
                            html += '</tr><tr>';

                            // Generate Days
                            // this loop is for is weeks (rows)
                            for (i = 0; i < 9; i++) {
                                // this loop is for weekdays (cells)
                                for (j = 0; j <= 6; j++) { 
                                    html += '<td>';
                                    if (day <= monthLength && (i > 0 || j >= startingDay)){
                                        var dayDt = new Date(year,month,day),
                                            disableCls = ((me.minDate && dayDt < me.minDate) || me.maxDate && dayDt > me.maxDate) ? ' w121-cal-disabled' : '';
                                        
                                        html += '<a class="w121-cal-day' +disableCls+ '">' +(day++)+ '</a>';
                                    }
                                    html += '</td>';
                                }
                                // stop making rows if we've run out of days
                                if (day > monthLength)  break;
                                else                    html += '</tr><tr>';
                            }
                            html += '</tr></table>';

                            var tbl = $(html),
                                header = tbl.find('.w121-cal-header');

                            // Set up listeners
                            header.append('<a class="w121-cal-prev fa fa-caret-left">','<a class="w121-cal-next fa fa-caret-right">');
                            header.children('a').click(function(){
                                var dir = $(this).hasClass('w121-cal-prev') ? -1 : 1,
                                    newDt = new Date(year, month + dir, 1);

                                calendar.empty().append(genHTML(newDt));
                                // Fire event for other controls to respond to calendar reflow
                                $(document).trigger($.Event('calupdate' + dn), [me, calendar, newDt]);
                            });
                            
                            if(ctrlVal && ctrlVal.getMonth && ctrlVal.getMonth() == month && ctrlVal.getFullYear() == year)
                                tbl.find('a:contains(' +selectDy+ '):first').addClass('w121-selected');
                            
                            if(today.getMonth() == month && today.getFullYear() == year)
                                tbl.find('a:contains(' +today.getDate()+ '):first').addClass('w121-highlight');

                            tbl.find('td a:not(.w121-cal-disabled)').click(function(){
                                var dt = $(this),
                                    day = parseInt(dt.text()),
                                    info = dt.parents('[w121-month]'),
                                    month = parseInt(info.attr('w121-month')),
                                    year = parseInt(info.attr('w121-year'));

                                onSelect(year,month,day);

                                me.calendar.remove(); 
                                me.calendar = undefined;
                            });

                            return tbl;
                        }
                    },
    processDate:    function(dtString){
                        var me = this,
                            dateString = dtString || me.field.val();
                        
                        if (dateString.length > 0) {
                            var genDate = me.translateDate(dateString);
                            
                            //Returns a message to the user that the program doesn't understand them
                            if(genDate.toString() == 'Invalid Date'){
                                me.displayDate(me.sarcasmArray[Wui.randNum(0,(me.sarcasmArray.length -1))]);
                                me.hiddenField.val('');
                                return;
                            }
                            
                            me.value = genDate;
                            me.hiddenField.val(me.value.toString(me.dtFormat));
                            me.displayDate();
                            return genDate;
                        }else{
                            me.value = null;
                            me.hiddenField.val('');
                            me.displayDate('');
                        }
                    },
    setListeners:   function(t){
                        if(t.listnersSet !== true){
                            t.listnersSet = true;
                            return t.field.on('input', function(){ t.processDate(); }).on('keyup',function(evnt){
                                if(evnt.keyCode == 40 || evnt.keyCode == 38){
                                    var addVal = (t.value instanceof Date) ? (evnt.keyCode == 40) ? 1 : -1 : 0,
                                        dt = (t.value instanceof Date) ? t.value : new Date();
                                    
                                    t.value = dt.addDays(addVal);
                                    t.displayDate();
                                    t.field.val(t.value.toString(t.dtFormat));
                                }
                            });
                        }else{
                            return t.field;
                        }
                    },
    setMinDate:     function(minDt){ 
                        var me = this;
                        me.minDate = me.translateDate(minDt.toString());
                        me.field.datepicker( "option", "minDate", new Date(me.minDate.valueOf() + me.minute));
                        return me.minDate;
                    },
    translateDate:  function(ds){
                        var me          = this,
                            now         = new Date(),
                            dateReg     = /\d{1,2}\/\d{1,2}\/\d{2,4}/,
                            ifDateReg   = /([a|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|and,\d,\s,-]+)\s((millisecond|second|minute|hour|day|week|month|year)+[s]*)\s(from|after|before|previous to)+\s(.+)$/,
                            intvF       = ifDateReg.exec(ds.toLowerCase());
                        
                        //for interval specifications
                        if(intvF !== null){
                            var n       = me.num2Dec(intvF[1]),
                                directn = {from:1, after:1, before:-1, 'previous to':-1},
                                dir     = directn[intvF[4]],
                                dt      = me.translateDate(intvF[5]); 

                            return dt['add' + intvF[3].charAt(0).toUpperCase() + intvF[3].slice(1) + 's'](n * dir);
                        }
                        
                        //returns a match for "now"
                        if(ds.toLowerCase().match(/now/) !== null){ return now; }
                        
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
                                 var replaceDays = {'today':0, 'tomorrow':1, 'yesterday':-1},
                                     newDt = new Date(now.valueOf() + (me.day * replaceDays[f]));
                                 return  (newDt.getMonth() + 1) + '/' + newDt.getDate() + '/' + newDt.getFullYear();
                             })
                        .replace(/(next|last) ([a-z]{3,10})[ ]*([0-9]+)*/,function(m, dir, word, day){      // Translate days of week & months into dates
                             var dayVal = me.day * ((dir == 'next') ? 1 : -1),
                                 dy = ($.inArray(word,me.days) > -1) ? $.inArray(word,me.days) 
                                 : $.inArray(word,me.shortDays),
                                 month = ($.inArray(word,me.months) > -1) ? $.inArray(word,me.months) 
                                 : $.inArray(word,me.shortMonths),
                                 useNum = (dy > -1) ? dy : (month > -1) ? month : -1,
                                 useFunc = (dy > -1) ? 'getDay' : (month > -1) ? 'getMonth' : '';
                                 
                             if(useNum > -1){
                                 var nxt = now.valueOf(), inc = new Date(nxt += dayVal);
                                 while(inc[useFunc]() != useNum)    inc = new Date(nxt += dayVal);
                                 if(month !== undefined && month != -1 && day.length !== 0)   inc.setDate(parseInt(day));

                                 return (inc.getMonth() + 1) + '/' + inc.getDate() + '/' + inc.getFullYear() + ' ';
                             }else{
                                 return '';
                             }
                         })
                         .replace(/(\d{1,2})[ -]+([a-z]{3,10})([ -]*)/, function(m,f,s,t){                    // Translate 'DD MMM' to 'MM/DD'
                             return ((($.inArray(s,me.months) > -1) ? $.inArray(s,me.months) : 
                                 $.inArray(s,me.shortMonths)) + 1) + '/' + f + t.replace('-',' ');
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
                                var retDt = dt + '/' + now.getFullYear().toString(),
                                    withDt = new Date(retDt);
                                return (withDt.valueOf() > now.valueOf()) ? retDt : dt + '/' + new Date(now.valueOf() + (me.day * 365)).getFullYear() + ' ';
                            }
                        })
                        .replace(/(\d{1,2}\/\d{1,2})\s(\d{4})/,function(m,dt,yr){return dt + '/' + yr; });   // Remove space in instances of '3/21 2012'

                        //Adds today's date to strings that have no date information specified
                        ds = (dateReg.test(ds) === true) ? ds : (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() +' '+ ds;
                      
                        /* Adds an @ symbol for time strings that aren't UTC spec so that they can be modified later */
                        ds = ds.replace(/(\d{1,2}\/\d{1,2}\/\d{4})\s(.+)/,function(m,dt,ts){
                         if(ts.indexOf('@') == -1)   ts = '@ ' + ts;
                         return dt + ' ' + ts;
                        })
                        
                        /* Translate colloquial times */
                        .replace(/\d[ ]*[a|p]$/,function(m){ return m + 'm'; })
                        .replace(/[a|p][.][m]*[.]*/,function(m){ return m.replace(/[.]/g,''); })
                        .replace(/\d.m/,function(m){ return m.substring(0, m.length - 2) + ' ' + m.substring(m.length - 2, 3); })
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
                        var pos = 0, theNum = 0, currNum = 0, nextNum = 0, lastNum = 0, smallerThanNext = false;
                       
                        if(wArray.length == 1){
                            return wArray[0];
                        }else{
                            while(wArray[pos + 1] !== undefined){
                                currNum = parseInt(wArray[pos]);
                                nextNum = parseInt(wArray[pos + 1]);
                                smallerThanNext = this.getM(currNum) <= this.getM(nextNum);
                                lastNum = parseInt(wArray[wArray.length - 1]);

                                if(pos === 0){
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
    getVal:         function(){ return this.value; },
    setVal:         function(sv){
                        if(sv !== null){
                            if(typeof sv == 'string'){
                                this.fieldText(sv);
                                this.processDate();
                            }else{
                                this.value = sv;
                                this.fieldText(this.displayDate());
                            }
                        }
                        else{
                            this.fieldText('');
                            this.hiddenField.val('');
                            this.outputFld.html('');
                            this.value = null;
                        }
                    },
    toString:       function(format){
                        if(this.value !== null)
                            return this.value.toString(format || this.dtFormat) || '';
                        else
                            return '';
                    },
    validDate:      function(dt){
                        if (dt === null || typeof dt === 'undefined')  return false;
                        else if (typeof dt.getTime !== 'function')     return false;
                        else if(dt.toString() == 'Invalid Date')       return false;
                        
                        return true;
                    }
});

/**
@author Dan Perry (dan.perry@usurf.usu.edu)
An HTML5 file tool than can upload files via ajax.
To upload files via AJAX successfully, the form data must be processed with Wui.forAjaxFileUpload().
See the documentation of Wui.forAjaxFileUpload() for more information.

Because File can upload via AJAX, it doesn't require the tight server coupling that
Wui.File() does, and thus doesn't have to be extended to be immediately useful.
*/
Wui.File = function(args) {
    $.extend(this,{
        /** Sets the accept attribute on the html element */
        accept:     null,

        /** When set to true, allows the user to select multiple files to upload */
        multiple:   false,
        field:      $('<input>').attr({type:'file'})
    },args);
    this.init();
};

Wui.File.prototype = $.extend(new Wui.Text(), {
    disable:function(){
                this.disabled = true;
                if(this.el && this.el.addClass)
                    this.el.addClass('w121-disabled').find('input,textarea,iframe').attr('disabled','disabled');
            },
    
    /** Enables the field so the user can interact with it. */
    enable: function(){
                this.disabled = false;
                if(this.el && this.el.addClass)
                    this.el.removeClass('w121-disabled').find('.w121-disabled,*[disabled]').removeAttr('disabled');
            },
    init:   function(){
                var me = this;
                Wui.Text.prototype.init.call(me);
                me.append(me.field);

                if(me.multiple)
                    me.field.attr('multiple', true);

                if(me.accept && me.accept.length)
                    me.field.attr('accept', me.accept);

                me.field.change(function(){
                    me.field.trigger($.Event('filechanged'), [me, me.field[0].files]);
                });
            },
    validTest:function(v){ 
                if(this.required) 
                    return (v !== null && v.length !== 0);

                return true;
            },
    getVal: function(){
                return this.field[0].files;
            },
    setVal: function(sv){
                if(sv === null)
                    this.field.val('');
            }
});

Wui.Toggle = function(args){
    $.extend(this,{
        opt1:           'option 1',
        opt2:           'option 2',
        borderRadius:   0,
        opt1Color:      "#555",
        opt2Color:      "#555",
        toggleHeight:   26,
        toggleWidth:    150
    },args,{
        field:  $('<input>').attr({type:'hidden'}),

        toggler:$('<div class="w121-toggle-outer">' + 
                       '<div class="w121-toggler">' + 
                           '<div class="w121-opt-1"></div>' + 
                           '<div class="w121-toggle-btn">&nbsp;</div>' + 
                           '<div class="w121-opt-2"></div>' + 
                       '</div>' + 
                '</div>')
    }); 
    this.init();
};
Wui.Toggle.prototype = $.extend(new Wui.FormField(),{
    init:           function(){
                        var me = this, th = me.toggleHeight;

                        Wui.FormField.prototype.init.call(me);

                        // If a width is explicitly defined, make the field that width
                        me.toggleWidth = $.isNumeric(me.width) ? me.width : me.toggleWidth;
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Toggle.prototype.setListeners.call(me,me));

                        // Init Field
                        me.toggler.find('.w121-opt-1').html(me.opt1);
                        me.toggler.find('.w121-opt-2').html(me.opt2);
                        me.val(me.opt1);

                        // Add Class and set CSS to desired dimensions
                        (me.elAlias || me.el).addClass('w121-toggle');
                        me.el.find('.w121-toggle-outer').height(th - 2).width(me.toggleWidth);
                        me.el.find('.w121-toggle-outer, .w121-toggle-btn').css('border-radius', me.borderRadius);
                        me.el.find('.w121-toggle-btn').css({
                            width:  th - 4,
                            left:   'calc(50% - ' + (th - 4) + 'px)'
                        });
                        me.el.find('.w121-opt-1').css({
                            'text-indent':      -(th - me.borderRadius) + (me.borderRadius ? 0 : 2),
                            'background-color': me.opt1Color
                        });
                        me.el.find('.w121-opt-2').css({
                            'text-indent':      th - me.borderRadius - (me.borderRadius ? 0 : 2),
                            'background-color': me.opt2Color
                        });
                    },
                    
    setListeners:   function(t){
                        var me = this;
                        
                        t.toggler.click(function(){
                            me.val( (me.value == me.opt1) ? me.opt2 : me.opt1 );
                            me.el.find('.w121-toggle-btn').css('left','calc(50% - ' + ((me.toggleHeight - 4) * ((me.value == me.opt1) ? 1 : 0)) + 'px)');
                        });
                        
                        if(this.setListeners !== Wui.Toggle.prototype.setListeners) this.setListeners(this);
                        return [t.field,t.toggler];
                    },
    setVal:         function(sv){ 
                         var me = this;

                         me.value = sv;
                         me.toggler[ (me.value == me.opt2) ? 'addClass' : 'removeClass' ]('w121-toggle-alt');
                         me.field.val( me.value ? me.value : '' );
                    }
});

Wui.input = function(msg, callback, msgTitle, inputs, content){
    // make sure the inputs will be acceptable on the form
    if(inputs){
        if(!inputs.length){
            if(inputs instanceof Wui.FormField || inputs.ftype) inputs = [inputs];
            else                                                inputs = [{ftype:'Wui.Text'}];
        }
    }else{
        inputs = [{ftype:'Wui.Text'}];
    }
    if(inputs.length == 1)    $.extend(inputs[0],{label:msg, required:true, name:'inputField'});
    if(content !== undefined) inputs.splice(0,0,{ftype:'Wui.Note', html: content});
    
    // create the form and the window
    var inputFrm = new Wui.Form({ labelPosition:'left', items:inputs }),
        Msg = new Wui.Window({
            title:      msgTitle || 'Input',
            bbar:        [ 
                            new Wui.Button({ text:'Cancel' }),
                            new Wui.Button({ text:'Submit' })
            ],
            init:       function(){
                            var me = this;

                            Wui.Window.prototype.init.apply(me,arguments);

                            me.footer.el.on('wuibtnclick',function(evnt,btn){
                                if(btn.text == 'Cancel')    me.doClose();
                                else                        me.getVal();
                                evnt.stopPropagation();
                            });
                        },
            isModal:    true,
            items:      [inputFrm],
            cls:        'w121-input-window',
            width:      600,
            height:     400,
            getVal:     function(){
                            var formData = inputFrm.getData();
                            if(formData){
                                if(callback && typeof callback == 'function'){
                                    var len = Wui.getKeys(formData).length,
                                        cbkResult = callback((len == 1 && formData.inputField) ? formData.inputField : formData);
                                    Msg.closeOkay = (callback === undefined) ? true : cbkResult;
                                }else{
                                    Msg.closeOkay = true;
                                }
                            }
                        },
            doClose:    function(){
                            Msg.closeOkay = true;
                            Msg.close();
                        },
            onWinClose: function(){ return ((Msg.closeOkay !== true) ? false : Msg.closeOkay); }
        });
    Msg.header.splice(0,1);
    return inputFrm;
};


})(jQuery, window[_wuiVar]);

