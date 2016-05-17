(function($,Wui) {
    
Wui.Hidden = function(args){
    $.extend(this, args, {
        label:  null,
        field:  $('<input>',{type:'hidden'})
    });
    this.init();
};
Wui.Hidden.prototype = new Wui.FormField({
    fieldText:  function(sv){ this.field.val(sv); },
    getVal:     function(){ 
                    this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null;
                    
                    return this.value;
                },
    init:       function(){
                    Wui.FormField.prototype.init.call(this);
                    this.el.hide();
                    this.append(this.field);
                },
    setVal:     function(sv){ this.fieldText(this.value = (sv && $.trim(sv).length) ? sv : null); }
});

})(jQuery,window[_wuiVar]);
