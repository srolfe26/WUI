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