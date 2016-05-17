(function($,Wui) {
    
Wui.Textarea = function(args){
    $.extend(this, { 
        field:  $('<textarea>'),
        height: 80
    }, args);
    this.init();
};
Wui.Textarea.prototype = $.extend(new Wui.Text(), {
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me); 
                },
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    this.field.css({ height: this.height });
                    this.el.css({ height: '' });
                }
});

})(jQuery,window[_wuiVar]);
