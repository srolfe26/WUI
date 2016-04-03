/**
@author Stephen Nielsen (stephen.nielsen@usurf.usu.edu)
Creates a form field for uploading files. By the nature of file uploads and their tight pairing 
to a backend server, this control must be extended itself to be used for uploading files.

Because Wui.FileBasic() can upload via AJAX, it doesn't require the tight server coupling that
Wui.File() does, and thus doesn't have to be extended to be immediately useful.
*/
Wui.File = function(args){ 
    $.extend(this,{
        /** @eventhook To perform any functionality before a file is uploaded @eventhook */
        beforeSubmit:   function(){},
        
        /** A value to send to the server where it will filter/block file uploads according to file type */
        fileTypeFilter: null,
        
        /** The name of the field that contains the file */
        upFieldName:    'fileupload',
        
        /** Additional parameters to send to the server besides the file*/
        params:         {},
        
        /** @eventhook To be performed when a file is successfully uploaded. @eventhook */
        upSuccess:      function(){},
        
        /** The server-side page where the file will be uploaded. */
        url:            '',
        
        /** The name of the parameter of the file title. */
        upTitleName:    'title'
    },args,{
        field:          $('<input>').attr({type:'text'})
    });
};
Wui.File.prototype = $.extend(new Wui.Text(),{
    /** Fires when the 'X' button is clicked to change the currently selected file to something else. */
    changeClick:function(){
                     //swap buttons
                     this.changeBtn.hide();
                     this.upBtn.show();
                     this.fileFrm.show();
                     this.field.removeClass().focus();
                },
    
    /** Set up the file upload control. */
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me);

                    // Wrap the field in order to add absolutely positioned buttons
                    me.append(me.wrapper = $('<div>').addClass('wui-file').append(me.field.off('blur')));
                    me.elAlias = me.wrapper;

                    var uniqueId = Wui.id();

                    // Add form, iframe, and buttons
                    me.push(
                        me.iframe = new Wui.O({el:$('<iframe>').css({display:'none'}).attr({id:uniqueId, name:uniqueId}) }),
                        me.changeBtn = new Wui.Button({
                            click:      function(){ 
                                            me.fieldText('');
                                            me.field.removeAttr('disabled'); 
                                            me.changeClick(); 
                                        },
                            text:       'X',
                            cls:        'file-change field-btn'
                        }),
                        me.upBtn = new Wui.Button({text:'Browse', cls:'field-btn', click:function(){ me.fileInput.click(); } }),
                        me.fileFrm = new Wui.O({
                            el:$('<form>').attr({
                                method:     'post',
                                enctype:    'multipart/form-data',
                                action:     me.url,
                                target:     uniqueId
                            })
                        })
                    );

                    me.fileFrm.append(
                        // The file field
                        me.fileInput = $('<input>').attr({tabIndex:-1})
                        .attr({name:me.upFieldName, type:'file'})
                        .change(function(){ me.submit(); me.field.focus(); })
                    );
                },


    /** Submit the form */
    submit:     function() {
                    var me = this;

                    me.beforeSubmit();
                    
                    //add title to parameters and parameters to the file upload
                    me.params[me.upTitleName] = me.field.val();
                    
                    // for file filtering
                    if(me.fileTypeFilter !== null) me.params.file_type_filter = me.fileTypeFilter;

                    me.field.addClass('has-file uploading').attr('disabled', true).val('uploading...');
                    
                    // add additional paramters before sending
                    me.fileFrm.el.children("input[type!='file']").remove();
                    $.each(me.params, function(key, value) {
                        me.fileFrm.append($('<input>').attr({type:'hidden', name:key, value:value}));
                    });
                    
                    // Submit the actual form
                    me.fileFrm.el.submit(); 
                    
                    // Do something after we are finished uploading
                    me.iframe.el.unbind().load(function() {
                        me.onComplete($('body',me.iframe.el.contents()).text()); //done :D
                    });
                },

    /**
    @param {object} unwrapped The Wui.unwrapData unwrapped results of the file upload.
    This function is for developers to run whatever analysis they desire on the raw output of the file upload.
    @eventhook
    */
    devHook:    function(){},

    /** Fires when the file upload completes and handles errors if any. */            
    onComplete: function(r){
                    try{
                        var me = this,
                            d = $.parseJSON(r),
                            unwrapped = Wui.unwrapData.call(me,d);
                            
                        // Put the returned data out there for develpers.
                        me.devHook(unwrapped);
                        
                        //remove the css uploading state
                        me.field.removeClass('uploading empty');
                        
                        // If successful it will set the value of the field, else it whines and complains
                        if(d.success === true){
                            me.val(unwrapped.data,'upSuccess');
                        }else{
                            if(d.errors && d.errors[0] && d.errors[0].fileTypeError){
                                Wui.errRpt(d.errors[0].fileTypeError,'Invalid File Type');
                                me.field.removeClass('has-file uploading').removeAttr('disabled');
                                me.fieldText('');
                            }else{
                                me.upFailure(d);
                            }
                        }
                    }catch(err){
                        console.log('Upload Error',err,r);
                        me.upFailure(err,r);
                    }
                },

    /** @eventhook Signals the user that there was an upload failure. Can be overridden, but doesn't have to be.*/
    upFailure:  function(e,e2){
                    console.log('Upload Failure',e,e2);
                    this.fieldText('Upload Failure');
                },
    
    /** @return The value of the field, or an empty object is returned. */
    getVal:     function(){ return this.value || {}; },
    
    /** Overrides Wui.FormField.setVal() to work with the file field. @return The value passed in. */
    setVal:     function(sv){
                    this.value = this.value || {};
                    $.extend(this.value,sv);
                    return sv;
                },
    
    /**  Adds callback functionality to Wui.FormField.val() */
    val:        function(sv,callback){
                    var retVal = Wui.FormField.prototype.val.apply(this,arguments);
                    if(this[callback] && typeof this[callback] == 'function') this[callback]();
                    return retVal;
                },
    
    /** Overrides Wui.FormField.valChange, performs similar fuctionality, but adds specific code for showing/hiding buttons. */
    valChange:  function(){
                    var me = this;
                    if(me.value){
                        me.field.addClass('has-file').removeAttr('disabled');
                        me.upBtn.hide();
                        me.fileFrm.hide();
                        me.changeBtn.show();
                        
                        //changed to a 'file-selected' view and display a nicely formatted file
                        me.field.addClass('has-file ' + ((me.value.extension !== undefined) ? 'icon-' + me.value.extension.replace('.','') : '')).attr('disabled',true);
                        me.fieldText(me.value[me.upTitleName]);
                    }else{
                        me.field.removeClass();
                        me.upBtn.show();
                        me.fileFrm.show();
                        me.changeBtn.hide();
                        me.field.val(null);
                    }
                    
                }
});