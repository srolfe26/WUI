(function($,Wui) {
    
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

})(jQuery,window[_wuiVar]);
