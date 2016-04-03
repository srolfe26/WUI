/**
    @event valchange When a value changes on a form field (event, WUI FormField, value, old value)
    @event hiddenchange Same as valchange but for fields without an 'el' property (like hidden fields. Called on the window (WUI FormField, value)
    
    Wui.FormField contains configs and methods that are common to all form elements. For 
    a form to interact properly with a field, it must be an instance of Wui.FormField. Vlidation
    is provided by the FormField ojbect, but can be overridden for specific needs in a given
    field. See the validate() documentaton for information about how to display custom error messages,
    validate with regular expressions, and write custom functions for validation.
    An input must be an instance of Wui.FormField for it to interact properly with a Wui form.
*/
Wui.FormField = function(args){
    $.extend(this,{
        /** Whether or not the field will be disabled. A disabled field is still accessible to the form, just not to the user. */
        disabled:       false,
        
        /** Message to display to the user when validation fails. If not specified the form will attempt to use the field's label. */
        invalidMsg:     null,
        
        /** An optional config that labels the field. */
        label:          null,
        
        /** A special class to put on the label if desired */
        labelCls:       null,

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:      null,
        
        /** Whether or not the field is required. May be pre-empted by other validation. See validate() method. */
        required:       false,
        
        /** A regular expression whereby to validate a field's input. May be pre-empted by other validation. See validate() method. */
        validRegEx:     null,
        
        /** A function to validate field input. This function is passed the value of the field, for example: validTest: function(val){ return val == 3; } */
        validTest:      null
    },args);
};
Wui.FormField.prototype = $.extend(new Wui.O(),{
    /** Defines the position of the label relative to the field, options are 'top', 'left', 'right' and 'bottom' */
    labelPosition:  'top',

    /**
        @return The el of the object
        Runs immediately when the object is constructed. Wraps the field in a label if a label has been defined.
    */
    init:       function(){
                    var me = this;
                    me.value = me.hasOwnProperty('value') ? me.value : null;
                    me.el = $('<div>').addClass('wui-fe');
                    
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
                    return me.el;
                },
                
    /** Will disable the object if its disabled property is set to true and set a value on the field if one has been defined. */
    onRender:   function(){
                    if(this.disabled)                   this.disable();
                    if(this.hasOwnProperty('value'))    this.val(this.value,false);
                },

    /** Runs after the element has been placed on the DOM */
    afterRender:function(){ if(this.lbl)  this.lbl.adjustField(); },

    /** Makes the field read-only so the user cannot edit the field, but can select the text. */
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('wui-disabled').find('input,textarea,iframe').attr({readonly: true, tabIndex:-1});
                },
                
    /** Enables the field so the user can interact with it. */
    enable:     function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('wui-disabled').find('.wui-disabled,*[readonly]').removeAttr('readonly tabIndex');
                },
    
    /**
    @return True or False
    Validate will construct an error message based on the following precedence:
    1. Custom message (invalidMsg)
    2. Character count (if applicable)
    3. The label on the field
    4. The name of the field
    5. Report that "A required field has an improper value."
    
    Then, validates a field using the following order of validation precedence:
    1. Custom testing function (validTest)
    2. Character count (maxChars - only applicable on Text and Textarea)
    3. Regular Expression (validRegEx)
    4. Required flag (required)
    5. No validation - returns true.
    
    Then sends the error message, if any, to the parent form's throwError() method where the invalidation messages are concatenated and the fields
    are hilighted for the user to see what fields need their attention.
    */
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
    /**
    @param {[any]}    newVal    The type of this parameter depends on the type of form field
    @return Either the value of the field if no arguments are passed, or the value of the arguments passed in
    
    Works similarly to jQuery's val() method. If arguments are omitted the value of the FormField 
    will be returned. If arguments are specified the field's setVal() method and setChanged() method
    are called, and the values passed in are passed through        
    */
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
    /** 
    @private
    Marks the parent form as changed if the field belongs to a form, calls the valChange event hooks and listeners
    if the field doesn't have an 'el' property, it will call 'hiddenchange'
    */
    setChanged: function(oldVal){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    // Marks the parent form as 'changed'
                    if(me.parent && me.parent instanceof Wui.Form)
                        me.parent.formChange(true, me);
                    
                    // Calls functionally defined valChange() - one will override another
                    me.valChange(me, me.value, oldVal);
                    
                    // Calls listeners for valchange - in the case of hidden fields calls 'hiddenchange'
                    if(me.el){
                        me.el.trigger($.Event('valchange'), [me, me.value, oldVal])
                            .trigger($.Event('valchange' + dn), [me, me.value, oldVal]);
                    }else{
                        if(me.parent && me.parent instanceof Wui.Form)
                            me.parent.el.trigger($.Event('hiddenchange'), [me, me.value, oldVal])
                                .trigger($.Event('hiddenchange' + dn), [me, me.value, oldVal]);
                    }
                },
    
    /** 
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    getVal:     function(){
                    return this.value;
                },
    
    /** 
    @param {string}    sv    Value to set the value of the field to
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    setVal:     function(sv){
                    this.value = sv;
                },
    
    /** 
    @param {string}    newVal    New value being set on the field
    An event hook for when the value changes. Useful for extending objects, but generally use the 'valchange' event listener
    */
    valChange:  function() {}
});