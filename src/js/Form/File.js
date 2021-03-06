/**
@author Dan Perry (dan.perry@usurf.usu.edu)
An HTML5 file tool than can upload files via ajax.
To upload files via AJAX successfully, the form data must be processed with Wui.forAjaxFileUpload().
See the documentation of Wui.forAjaxFileUpload() for more information.

Because File can upload via AJAX, it doesn't require the tight server coupling that
Wui.File() does, and thus doesn't have to be extended to be immediately useful.
*/
Wui.File = function(args) {
    $.extend(this,{
        /** Sets the accept attribute on the html element */
        accept:     null,

        /** When set to true, allows the user to select multiple files to upload */
        multiple:   false,
        field:      $('<input>').attr({type:'file'})
    },args);
    this.init();
};

Wui.File.prototype = $.extend(new Wui.Text(), {
    disable:function(){
                this.disabled = true;
                if(this.el && this.el.addClass)
                    this.el.addClass('w121-disabled').find('input,textarea,iframe').attr('disabled','disabled');
            },
    
    /** Enables the field so the user can interact with it. */
    enable: function(){
                this.disabled = false;
                if(this.el && this.el.addClass)
                    this.el.removeClass('w121-disabled').find('.w121-disabled,*[disabled]').removeAttr('disabled');
            },
    init:   function(){
                var me = this;
                Wui.Text.prototype.init.call(me);
                me.append(me.field);

                if(me.multiple)
                    me.field.attr('multiple', true);

                if(me.accept && me.accept.length)
                    me.field.attr('accept', me.accept);

                me.field.change(function(){
                    me.field.trigger($.Event('filechanged'), [me, me.field[0].files]);
                });
            },
    validTest:function(v){ 
                if(this.required) 
                    return (v !== null && v.length !== 0);

                return true;
            },
    getVal: function(){
                return this.field[0].files;
            },
    setVal: function(sv){
                if(sv === null)
                    this.field.val('');
            }
});