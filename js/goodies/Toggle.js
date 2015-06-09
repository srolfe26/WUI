/** WUI Text */
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

        toggler:$('<div class="toggle-outer">' + 
                       '<div class="toggler">' + 
                           '<div class="opt-1"></div>' + 
                           '<div class="toggle-btn">&nbsp;</div>' + 
                           '<div class="opt-2"></div>' + 
                       '</div>' + 
                '</div>')
    }); 
    this.init();
};
Wui.Toggle.prototype = $.extend(new Wui.FormField(),{
    init:           function(){
                        var me = this, th = me.toggleHeight;

                        Wui.FormField.prototype.init.call(me);
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Toggle.prototype.setListeners.call(me,me));

                        // Init Field
                        me.toggler.find('.opt-1').html(me.opt1);
                        me.toggler.find('.opt-2').html(me.opt2);
                        me.val(me.opt1);

                        // Add Class and set CSS to desired dimensions
                        (me.elAlias || me.el).addClass('wui-toggle');
                        me.el.find('.toggle-outer').height(th).width(me.toggleWidth);
                        me.el.find('.toggle-outer, .toggle-btn').css('border-radius', me.borderRadius);
                        me.el.find('.toggle-btn').height(th - 2).width(th - 2).css('left','calc(50% - ' + (th - 2) + 'px)');
                        me.el.find('.opt-1, .opt-2').css('line-height',(th - 2) + 'px');
                        me.el.find('.opt-1').css({
                            'text-indent':      -th,
                            'background-color': me.opt1Color
                        });
                        me.el.find('.opt-2').css({
                            'text-indent':      th,
                            'background-color': me.opt2Color
                        });
                    },
                    
    setListeners:   function(t){
                        var me = this;
                        
                        t.toggler.click(function(){
                            me.val( (me.value == me.opt1) ? me.opt2 : me.opt1 );
                            me.el.find('.toggle-btn').css('left','calc(50% - ' + ((me.toggleHeight - 2) * ((me.value == me.opt1) ? 1 : 0)) + 'px)');
                        });
                        
                        if(this.setListeners !== Wui.Toggle.prototype.setListeners) this.setListeners(this);
                        return [t.field,t.toggler];
                    },
    setVal:         function(sv){ 
                         var me = this;

                         me.value = sv;
                         me.toggler[ (me.value == me.opt2) ? 'addClass' : 'removeClass' ]('toggle-alt');
                         me.field.val( me.value ? me.value : '' );
                    }
});