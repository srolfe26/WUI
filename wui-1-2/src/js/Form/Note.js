/** 
    TODO: THIS SEEMS LIKE A USELESS OBJECT - REMOVE?
    Allows a note to be placed on a form. A HTML string will be converted into DOM elements
    placed within a div tag. The note can be included in the items on a form, but the form
    will not attempt to validate like the other items.
*/
Wui.Note = function(args){ 
    $.extend(this,{
        /** The HTML to be placed in the note */
        html:   ''
    },args);
    this.init();
};
Wui.Note.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. */
    init:   function(){ this.el = $('<div>').html(this.html).addClass('wui-note'); }
});