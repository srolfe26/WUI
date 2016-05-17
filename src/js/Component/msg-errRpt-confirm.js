(function($,Wui) {
    
/**
 * Creates an alert() style message in a modal Wui.Window, but with callback options, 
 * and in the style of the application's UI.
 *
 * @param   {string}    msg         Text or HTML containing a message to display to the user.
 * @param   {sring}     msgTitle    Text that is the title of the msg window. Default "Message".
 * @param   {function}  callback    Function that will be called just before the msg window 
 *                                  is closed. If this method returns false, the msg window will
 *                                  remain open. See Wui.Window documentation.
 * @param   {string}    content     (Optional) Text or HTML for further content that will 
 *                                  appear after 'msg'.
 *
 * @return  {Wui.Window}    The msg window
 */
Wui.msg = function(msg, msgTitle, callback, content){
    var cntnt = [new Wui.O({el: $('<div>').addClass('w121-msg').html(msg) })];
    
    if(typeof content !== 'undefined'){
        if(typeof content.push == 'function')   cntnt.push.apply(cntnt, content);
        else                                    cntnt.push(content);
    }

    var msgWin  = new Wui.Window({
            title:      msgTitle || 'Message', 
            isModal:    true,
            items:      cntnt, 
            width:      350,
            onWinClose: callback || function(){}
        });

    return msgWin;
};


/** Alias for Wui.msg, more conventional name. TODO: deprecate Wui.msg */
Wui.alert = function() {
    return Wui.msg.apply(this, arguments);
};


/**
 * Creates a alery() style message in a modal Wui.Window, but with callback options, 
 * and in the style of the application's UI. Callback will receive a boolean 'true' or 'false'
 * depending whether the user clicked 'Yes' or 'No'. Window close button is removed so that the
 * user must choose 'Yes' or 'No' to remove the modal.
 *
 * @param   {string}    errMsg      Text (or HTML) containing the error to display to the user,
 *                                  appearing with the additional class of 'w121-err'.
 * @param   {sring}     msgTitle    Text that is the title of the error window. Default "Message".
 * @param   {function}  callback    Function that will be called just before the error window 
 *                                  is closed. If this method returns false, the error window will
 *                                  remain open. See Wui.Window documentation.
 * @param   {array}     buttons     An array of Wui.Buttons that can provide additional options to
 *                                  the user in an error situation. Otherwise, a simple 'close'
 *                                  button will be used, just like in the Wui.alert() window.
 *
 * @return  {Wui.Window}    The confirm window
 */
Wui.errRpt = function(errMsg, msgTitle, buttons, callback) {
    var err = Wui.alert(errMsg, msgTitle, callback);

    if($.isArray(buttons)) {
        err.footer.push.apply(err.footer, buttons);
    }
    
    err.container.find('.w121-msg').addClass('w121-err');
    err.resize();

    return err;
};


/** Alias for Wui.msg, more conventional name. TODO: deprecate Wui.msg */
Wui.error = function() {
    return Wui.errRpt.apply(this, arguments);
};


/**
 * Creates a confirm() style message in a modal Wui.Window, but with callback options, 
 * and in the style of the application's UI. Callback will receive a boolean 'true' or 'false'
 * depending whether the user clicked 'Yes' or 'No'. Window close button is removed so that the
 * user must choose 'Yes' or 'No' to remove the modal.
 *
 * @param   {string}    msg         Text (or HTML) containing a message to display to the user.
 * @param   {sring}     msgTitle    Text that is the title of the confirm window. Default "Message".
 * @param   {function}  callback    Function that will receive a 'true' or 'false' parameter. The
 *                                  confirm window will close regardless of the output of this 
 *                                  method.
 * @param   {string}    content     (Optional) Text or HTML for further content that will 
 *                                  appear after 'msg'.
 *
 * @return  {Wui.Window}    The confirm window
 */
Wui.confirm = function(msg, msgTitle, callback) {
    var cw = Wui.alert.apply(this, arguments);

    cw.doAnswer = function(ans){
        if(callback && typeof callback == 'function') {
            callback(ans);
        }
        cw.answerRun = true;
        cw.close();
    };
    cw.onWinClose = function(){ return ((cw.answerRun !== true) ? false : cw.answerRun); };

    cw.footer.splice(0, 1, new Wui.Button({ text:'No' }), new Wui.Button({ text:'Yes' }) );
    
    cw.footer.el.on('wuibtnclick', function(evnt,btn) {
        cw.doAnswer((btn.text == 'No') ? false : true);
        evnt.stopPropagation();
    });

    cw.header.splice(0,1);

    cw.resize();

    return cw;
};

})(jQuery,window[_wuiVar]);
