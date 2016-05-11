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