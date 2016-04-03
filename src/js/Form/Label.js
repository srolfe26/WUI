/** 
    The label object will wrap around a Wui.FormField when the 'label' config is specified
    on the field. The labelPosition is usually supplied by the field the label will wrap, but
    it has its own property, and can be instantiated by itself.

    When a label is part of a Wui.FormField, it is accessible by the lbl property of the field.
*/
Wui.Label = function(args){ 
    $.extend(this,{
        /**
            String that will converted into DOM elements and placed in the label.
            This is usually the value of the label config on a Wui.FormField.
        */
        html:           '',
        
        /** Default position of the label relative to the field (top,right,bottom,left). */
        labelPosition:  'top',

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:      null
    },args);
    
    this.init(); 
};
Wui.Label.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. */
    init:               function(){
                            var me = this;
                            me.el = $('<div>').addClass('wui-lbl').append( 
                                me.label = $('<label>').addClass(me.cls).attr(me.attr ? me.attr : {})
                            );
                            me.setLabel();
                            me.setLabelPosition();
                        },
    
    /**
    @param {string} newLabel String that will converted into DOM elements and placed in the label.
    @return Returns the HTML content of the label
    Changes the contents of the label.
    */
    setLabel:           function(newLabel){
                            newLabel = newLabel || this.html;
                            this.label.html(this.html = newLabel);
                            return this.label.html();
                        },

    /**
    @param {string} pos A string to verify the label position
    Verify's that the label's position is either top, right, bottom or left.
    @return the verified lowercase position string, or the label's current position if the passed in value isn't valid.
    */
    verifyPosition:     function(pos){
                            if(pos && (pos = pos.toLowerCase()) && $.inArray(pos,['top', 'left', 'bottom', 'right']) >= 0)
                                return pos;
                            else
                                return this.labelPosition;
                        },

    /**
    @param {number} size An integer for the size (height or width depending on the label position) of the label
    Changes the size of the label from the default values, or if size is undefined, resets the defaults.
    */
    setLabelSize:       function(size){
                            var me = this;
                                size = $.isNumeric(size) ? size : me.labelSize;

                            // Clear out and reset the size of el padding
                            me.el.css({
                                paddingLeft:    '',
                                paddingRight:   '',
                                paddingTop:     '',
                                paddingBottom:  ''
                            });
                            // Clear out and reset the size of the label
                            me.label.css({
                                width:          '',
                                height:         '',
                                marginLeft:     '',
                                marginRight:    ''
                            });

                            if($.isNumeric(size)){
                                var margin = (dimension == 'height') ? 0 
                                                : (me.labelPosition == 'left') ? parseInt(me.label.css('margin-right')) 
                                                    : parseInt(me.label.css('margin-left')),
                                    dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width';
                                
                                me.el.css('padding-' + me.labelPosition, size);

                                // Chrome is not able to access the margin-right value and returns NaN. 
                                // It appears that IE is not able to either and returns 0, while FF returns 5.
                                if (isNaN(margin)) margin = 5; 

                                me.label.css(dimension, size - margin);
                                if(me.field)
                                    me.field.labelSize = me.labelSize = size;
                            }

                            me.adjustField();
                        },

    /** Adjusts the size of the field in case the size of the label overflows */
    adjustField:        function(){
                            var me = this, dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width';
                            if(me.field && dimension == 'width' && me.label.outerHeight() > me.field.el.height()){
                                me.field.el.css('min-height', me.label.outerHeight());
                            }
                        },

    /**
    @param {string} position The value for the new label position (top, left, bottom, right)
    @return Returns the position that was set. Invalid passed in values will not change the current label position.
    */
    setLabelPosition:   function(position){
                            var me = this;

                            position = me.verifyPosition(position);
                            me.el.removeClass('lbl-' + me.labelPosition).addClass('lbl-' + position);
                            if(me.field)    me.field.labelPosition = position;
                            
                            me.labelPosition = position;
                            me.setLabelSize();

                            return me.labelPosition;
                        }
});