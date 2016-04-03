/**
@param {string}     msg         Label of the text input if no other inputs are defined.
@param {funciton}   callback    Function will receive the value of the text input if no other inputs are defined, or it will get an object containing all form values.
@param {string}     [msgTitle]  The title for the window, defaults to 'Input'.
@param {array}      [inputs]    Array of Wui.FormFields to display on the window. When this array has only one item it merely replaces the default text field and is required. 
@param {string}     [content]   HTML content to display above the form fields.
@return The Wui.Form that was created by the input. Use the returned value .parent to get the window.

Presents a WUI Form in a modal window.  In its simplest form, just passing in a single 'msg' string will present a window with a text field and the 'msg' as a label for the field. 
The example source contains various configurations: Basic, Input with Title, Input with a single replacement, and a full form.
*/
Wui.input = function(msg, callback, msgTitle, inputs, content){
    // make sure the inputs will be acceptable on the form
    if(inputs){
        if(!inputs.length){
            if(inputs instanceof Wui.FormField || inputs.ftype) inputs = [inputs];
            else                                                inputs = [{ftype:'Wui.Text'}];
        }
    }else{
        inputs = [{ftype:'Wui.Text'}];
    }
    if(inputs.length == 1)    $.extend(inputs[0],{label:msg, required:true, name:'inputField'});
    if(content !== undefined) inputs.splice(0,0,{ftype:'Wui.Note', html: content});
    
    // create the form and the window
    var inputFrm = new Wui.Form({ labelPosition:'left', items:inputs }),
        Msg = new Wui.Window({
            title:      msgTitle || 'Input',
            bbar:        [ 
                            new Wui.Button({text:'Cancel', click:function(){ Msg.closeOkay = true; Msg.close(); }}),
                            new Wui.Button({text:'Submit', click:function(){ Msg.getVal(); }})
            ],
            isModal:    true,
            items:      [inputFrm],
            cls:        'wui-input-window',
            width:      600,
            getVal:     function(){
                            var formData = inputFrm.getData();
                            if(formData){
                                if(callback && typeof callback == 'function'){
                                    var len = Wui.getKeys(formData).length,
                                        cbkResult = callback((len == 1 && formData.inputField) ? formData.inputField : formData);
                                    Msg.closeOkay = (callback === undefined) ? true : cbkResult;
                                }else{
                                    Msg.closeOkay = true;
                                }
                            }
                        },
            doClose:    function(){
                            Msg.closeOkay = true;
                            Msg.close();
                        },
            onWinClose: function(){ return ((Msg.closeOkay !== true) ? false : Msg.closeOkay); }
        });
    Msg.header.splice(0,1);
    return inputFrm;
};