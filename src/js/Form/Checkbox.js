(function($,Wui) {
    
Wui.Checkbox = function(args){ 
    $.extend(this,{
        name:       'w121-checkbox',
        template:   '<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args);
this.init(); };
Wui.Checkbox.prototype = $.extend(new Wui.Radio(),{
    calcVal:    function(){
                    var me = this, a = [];
                    
                    me.el.find('input:checked').each(function(){
                        a.push($(this).val());
                    });
                    
                    return ((a.length > 0) ? (a.length > 1) ? a : a[0] : null);
                },
    elemChange: function(){ this.val(this.calcVal()); },                    
    init:       function(){
                    var me = this;
                    if(me.options.length === 0) me.options.push({val:1,title:''});
                    
                    Wui.Radio.prototype.init.call(me);
                    me.el.removeClass('w121-radio').addClass('w121-checkbox');
                    
                    //steal label if there is only one option
                    if(me.options.length == 1){
                        if(!(me.label && me.label.length))
                            throw('Wui Forms - A Checkbox field ' + (me.name ? '(\'' + me.name + '\')' : '') + ' requires a label if it doesn\'t have options defined.');
                        me.el.find('li label').html(me.label);
                        me.lbl.label.html('');
                        // me.el.css({paddingTop:0, paddingBottom:0});
                    }
                },
    getVal:     function(){ return this.calcVal(); },
    setVal:     function(sv){
                    var me = this;
                    
                    if($.isArray(sv))               { me.value = sv; }
                    else if(sv === null)            { me.value = null; }    
                    else                            { me.value = [sv]; }
                    
                    if(me.options.length == 1 && (typeof sv == 'number' || typeof sv == 'string')){
                        me.el.find('input').prop('checked',!!parseInt(sv)).siblings('li').toggleClass('checked',!!parseInt(sv));
                    }else{
                        // clear out all checkboxes
                        me.el.find('input').attr('checked',false);
                        me.el.find('label').removeClass('checked');
                        
                        // set the ones passed in
                        if(me.value && me.value.length)
                            for(var i = 0; i < me.value.length; i++)
                                me.el.find('input[value=' +me.value[i]+ ']').prop('checked',true).siblings('li').addClass('checked');
                    }
                },
    validTest:  function(){ if(this.required && this.val() === 0) return false;    return true; }
});

})(jQuery,window[_wuiVar]);
