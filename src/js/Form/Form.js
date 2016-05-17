(function($,Wui) {
    
Wui.Form = function(args){
    $.extend(this,{
        disabled:       false,
        labelPosition:  'top',
        labelSize:      null,
        HTMLSubmit:     false,
    }, args, {
        el:             $('<div>'),
        errors:         [],
        formChanged:    false
    });
    
    this.init();
};
Wui.Form.prototype = $.extend(new Wui.O(),{
    clearData:  function(){ this.setData(); },

    dispErrors: function(){
                    var msg = '';

                    for(var i = 0; i < this.errors.length; i++) 
                        msg += this.errors[i] + '<br/>';

                    Wui.errRpt(msg,'Form Errors');
                },

    each:       function( f, blockNote, ascending ){
                    return Wui.O.prototype.each.call(
                        this,
                        function(itm,i){
                            if(!(blockNote && !(itm instanceof Wui.FormField))) return f(itm,i);
                        },
                        ascending
                    );
                },
    errCls:     'w121-form-err',
    getData:    function(){
                    if(this.validate()) { return this.getRawData(); }
                    else                { this.dispErrors(); return false; }
                },
    getField:   function(fieldname){
                    var retval = null;
                    this.each(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
                    return retval;
                },
    getFrmItm:  function(fieldname){
                    var retItm;
                    this.each(function(itm){ if(itm.name == fieldname) retItm = itm; });
                    return retItm;
                },
    getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); }, true);
                    return ret;
                },        
    init:       function(){
                    var me = this;
                    
                    Wui.O.prototype.init.call(me);

                    me.el.addClass('w121-form').on('submit', function(e){
                        // Prevent the form from submitting unless configured to do so
                        if(!me.HTMLSubmit)
                            e.preventDefault();
                    });

                    if(typeof me.id === 'undefined' || me.id === null)
                        me.id = Wui.id('w121-form');
                },
    normFrmItem:function(itm){
                    var me = this;

                    // If a form is disabled, the field needs to be disabled too
                    if(!(itm.disabled && itm.disabled === true)) $.extend(itm,{disabled: me.disabled});

                    if(itm.ftype && !(itm instanceof Wui.FormField)){
                        var ft = itm.ftype.split('.');

                        itm.labelPosition = itm.labelPosition || me.labelPosition;
                        itm.labelSize = itm.labelSize || me.labelSize;

                        if(ft[0] == 'Wui')  ft[0] = _wuiVar;
                        
                        switch (ft.length) {
                            case 1:
                                if(window[ft[0]])   return new window[ft[0]](itm);
                                else                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 2:
                                if(window[ft[0]] && window[ft[0]][ft[1]])   return new window[ft[0]][ft[1]](itm);
                                else                                        throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 3:
                                if(window[ft[0]] && window[ft[0]][ft[1]][ft[2]])    return new window[ft[0]][ft[1]][ft[2]](itm);
                                else                                                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 4:
                                if(window[ft[0]] && window[ft[0]][ft[1]][ft[2]][ft[3]]) return new window[ft[0]][ft[1]][ft[2]][ft[3]](itm);
                                else                                                    throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            default:
                                throw('Object type ' +itm.ftype+ ' is not defined.');
                        }
                    }else if(itm instanceof Wui.FormField){
                        // If a field has a label, make it match the format of the form.
                        if(itm.lbl){
                            itm.labelSize = me.labelSize;
                            // setLabelPosition calls setLabelSize and uses the item's labelSize that we just set.
                            itm.lbl.setLabelPosition( itm.labelPosition || me.labelPosition );
                        }
                        return itm;
                    }else{
                        return itm;
                    }
                },
    place:      function(){
                    var me = this;

                    if(me.items === undefined) me.items = [];
                    me.each(function(itm,i){ 
                        itm = me.items[i] = me.normFrmItem(itm);
                        if(itm.onRender) window.setTimeout(function(){ itm.onRender(); },0);
                    });
                    return Wui.O.prototype.place.apply(me,arguments);
                },
    push:       function(){
                    var me = this, itms = [];
                    
                    Array.prototype.forEach.call(arguments,function(arg){ itms.push(me.normFrmItem(arg)); });

                    return Wui.O.prototype.push.apply(this,itms);
                },
    splice:     function(){
                    var me = this, 
                        itms = [],
                        index = Array.prototype.shift.apply(arguments),
                        remove = Array.prototype.shift.apply(arguments);

                    // Create/normalize passed in objects
                    Array.prototype.forEach.call(arguments,function(arg){ itms.push(me.normFrmItem(arg)); });

                    // Add Elements back in
                    itms.splice(0,0,index,remove);
                    return Wui.O.prototype.splice.apply(this,itms);
                },
    remFrmItm:  function(fieldname){
                    var me = this;
                    this.each(function(itm,idx){ if(itm.name == fieldname) Wui.O.prototype.splice.call(me,idx,1); });
                    return true;
                },
    formChange: function(changed,changedItem){
                    var me = this;
                    if(changed)
                        me.el.trigger($.Event('formupdate'), [me, changedItem]);
                    me.formChanged = changed;
                    return me.formChanged;
                },
    setData:    function(data,fireEvents){
                    if(data){
                                this.setData();
                                this.each(function(itm){ 
                                    if(data[itm.name]) 
                                        itm.val(data[itm.name],fireEvents);
                                }, true);
                            }
                    else    {    this.each(function(itm){ itm.val(null,fireEvents); }, true); }
                    this.formChange(false);
                },
    disable:    function(){ 
                    this.disabled = true; 
                    return this.each(function(itm){ itm.disable(); }, true); 
                },
    enable:     function(){ 
                    this.disabled = false; 
                    return this.each(function(itm){ itm.enable(); }, true); 
                },
    setField:   function(fieldname, v){
                    this.each(function(itm){ if(itm.name == fieldname) itm.val(v); }, true);
                },
    throwError: function(err){
                    this.errors.push(err); 
                    return false;
                },
    validate:   function(){
                    var me = this;

                    me.errors = [];

                    me.each(function(itm){
                        if(typeof itm.el.toggleClass !== 'undefined')
                            itm.el.toggleClass( me.errCls, !itm.validate() );
                    }, true);

                    this.formChange(false);

                    return (me.errors.length === 0);
                }
});

})(jQuery,window[_wuiVar]);
