/** WUI Text */
Wui.Text = function(args){
    $.extend(this,{
        /** A value that appears in the field until text is entered. (HTML 5 placeholder) */
        blankText:  '',

        /** When set to true, along with maxChars being defined, a character countdown will 
        be displayed on the field. */
        counter:    false,

        /** A maximum number of characters that can be entered into the field. Adding a number
        here adds validation for character count. */
        maxChars:   null
    },args,{
        /** The HTML element */
        field:      $('<input>').attr({type:'text'})
    }); 
    this.init();
};
Wui.Text.prototype = $.extend(new Wui.FormField(),{
    /** Runs immediately when the object is created */
    init:           function(){
                        var me = this;
                        Wui.FormField.prototype.init.call(me);
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Text.prototype.setListeners.call(me,me));
                    },
                    
    /** 
    @param {string} bt  The value of the placeholder text for the field.
    @return The blank text that was passed in.
    Sets the blank text on the field. */
    setBlankText:   function(bt){
                        var me = this;
                        
                        me.blankText = bt;
                        me.field.attr('placeholder', bt);
                        
                        return bt;
                    },
                    
    /** 
    @param  {Wui Object}  t  The object to have listeners applied to the field
    Puts listeners on the field, mostly to handle blankText in the event that HTML 5 placeholder isn't supported 
    Also calls the setListeners() of any extending object automagically.
    The parameter (t) is automatically passed in to the setListeners method and
    represent the object. Listeners can be added to the field like this:
    t.field.blur([some function that will happen on blur.])
    Listeners can also be chained:
    t.field.blur(...).focus(...).click(...) 
    Unlike other functions in the WUI, if the field already has a setListeners method defined,
    there is no need to call the prototype to still get the functionality of the base method. If
    you desire to turn a particular listener off (though not recommended), this can be done with 
    tandard jQuery for turning a listener off:
    t.field.off('click');
    */
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
                    },
    /** 
    @param {string}    sv    Value to set the field text to
    Changes the value of the text in the field without changing the value of the object
    */
    fieldText:      function(sv){
                        this.field.val(sv);
                    },
    getVal:         function(){ return (this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null); },
    setVal:         function(sv){ 
                        this.fieldText(this.value = (sv && $.trim(sv).length) ? sv : null);
                    }
});