/** Creates a radio group that will appear as normal, or as a button group where only one button at a time
can    be depressed. MUST be named uniquely. */
Wui.Radio = function(args){ 
    $.extend(this,{
        /** A true value converts the normal radio group to a button group */
        buttonStyle:false,
        
        /** A default name that should be overridden */
        name:       'wui-radio',
        
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
    /** Runs immediately when the object is created. Adds listeners and styles */
    init:       function(){
                    Wui.FormField.prototype.init.call(this);
                    this.el.addClass('wui-radio');
                    
                    var me = this,
                        tplEngine = new Wui.Template({ template:this.template }),
                        ul = $('<ul>');
                    
                    $.each(me.options,function(i,itm){
                        itm.name = me.name;
                        itm.id = Wui.id();
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
                        this.el.addClass('wui-disabled').find('input,textarea,iframe').attr('disabled','disabled');
                },

    /** What to do when an individual element changes */
    elemChange:    function(elem){ this.val(elem.val()); },
    
    /** Enables the field so the user can interact with it. */
    enable:     function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('wui-disabled').find('.wui-disabled,*[disabled]').removeAttr('disabled');
                },

    /** If buttonStyle = true, the actual radio input is hidden  */
    onRender:   function(){
                    var me = this;
                    me.el.find('input').each(function(){
                        $(this).css({ margin:'0 5px 0' + ((me.buttonStyle ? -1 : 0) * (5 + $(this).outerWidth())) + 'px' });
                    });
                    Wui.FormField.prototype.onRender.call(me);
                },
    getVal:        function(){ return this.value; },
    setVal:        function(sv){
                    this.value = sv;
                    this.el.find("input[value='" + sv + "']").attr('checked',true);
                }
});