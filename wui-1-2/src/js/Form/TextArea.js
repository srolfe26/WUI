/** WUI Text Area */
Wui.Textarea = function(args){
    $.extend(this, { 
        /** The HTML element */
        field:  $('<textarea>'),
        
        /** Determines the height of the field */
        height: 80
    }, args);
    this.init();
};
Wui.Textarea.prototype = $.extend(new Wui.Text(), {
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me); 
                },

    /** Overrides Wui.O.cssByParam to include resizing the textarea within the object */
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    var lblVert = (this.lbl && $.inArray(this.lbl.labelPosition,['top','bottom']) >= 0) ? this.lbl.label.outerHeight() : 0;
                    this.el.css({
                        height:     '',
                        minHeight:  (this.height)
                    });
                    this.field.css({
                        height:     '',
                        minHeight:  (this.height - lblVert)
                    }); 
                }
});