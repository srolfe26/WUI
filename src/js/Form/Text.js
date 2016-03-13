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