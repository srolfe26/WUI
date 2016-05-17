(function($,Wui) {
    
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

})(jQuery,window[_wuiVar]);
