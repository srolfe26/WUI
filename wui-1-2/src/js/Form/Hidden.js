/** A Wui.FormField that is hidden on the DOM. */
Wui.Hidden = function(args){
    $.extend(this,{
        /** Only produces a DOM element for the sake of splicing */
        el:     $('<div>').hide()
    },args); 
    this.init();
};
Wui.Hidden.prototype = $.extend(new Wui.FormField(),{ init: function(){} });