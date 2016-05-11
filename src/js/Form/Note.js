Wui.Note = function(args){ 
    $.extend(this,{
        html:   ''
    },args);
    this.init();
};
Wui.Note.prototype = $.extend(new Wui.O(),{
    init:   function(){ this.el = $('<div>').html(this.html).addClass('w121-note'); },
    setHTML:function(html){ this.el.html(html); }
});