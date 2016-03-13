Wui.Button = function(args){
    $.extend(this, {
        disabled:   false,
        el:         $('<button>').attr({unselectable:'on'}),
        tabIndex:   0,
        text:       'Button',
        toolTip:    null
    }, args);
    
    this.init();
};
Wui.Button.prototype = $.extend(new Wui.O(),{
    /** 
        @deprecated I REALLY want to get rid of this. Click actions should be defined in the controller!
        @eventhook Event hook for the button click. 
    */
    click:      function(){},

    disable:    function(){
                    this.disabled = true;
                    this.el
                        .addClass('disabled')
                        .attr('disabled',true)
                        .removeAttr('tabindex');
                },
    enable:     function(){
                    this.disabled = false;
                    this.el
                        .removeClass('disabled')
                        .removeAttr('disabled')
                        .attr({tabindex:this.tabIndex});
                },
    init:       function(){ 
                    var me = this;
                    
                    Wui.O.prototype.init.call(me);

                    me.el
                    .addClass('w121-button' + ((me.disabled) ? ' disabled' : '') )
                    .click(btnClick)
                    .keypress(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                        return false;
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    // if(me.disabled)    me.disable();
                    
                    function btnClick(){
                        if(!me.disabled){
                            Array.prototype.push.call(arguments,me);
                            me.click.apply(me,arguments);

                            me.el.trigger($.Event('wuibtnclick.' + me.id),[me])
                                .trigger($.Event('wuibtnclick'),[me]);
                        }
                        return false;
                    }
                },
    setText:    function(txt){ return this.el.html(txt); }
});