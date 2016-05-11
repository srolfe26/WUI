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
                            new Wui.Button({ text:'Cancel' }),
                            new Wui.Button({ text:'Submit' })
            ],
            init:       function(){
                            var me = this;

                            Wui.Window.prototype.init.apply(me,arguments);

                            me.footer.el.on('wuibtnclick',function(evnt,btn){
                                if(btn.text == 'Cancel')    me.doClose();
                                else                        me.getVal();
                                evnt.stopPropagation();
                            });
                        },
            isModal:    true,
            items:      [inputFrm],
            cls:        'w121-input-window',
            width:      600,
            height:     400,
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