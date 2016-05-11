Wui.Link = function(args) { 
    $.extend(this, {
        invalidMsg: 'The value for \'' + ((this.label) ? this.label : (this.args && this.args.name) ? this.args.name : 'a link field') + '\' is not a properly formatted link.',
        fullPath:   /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        relativePath: /(\/|\/([\w#!:.?+=&%@!\-\/]))/
    }, args);
    this.init();
};
Wui.Link.prototype = $.extend(new Wui.FormField(),{
    buildOutput:function(v){
                    var me = this,
                        val = v || me.value;

                    if(me.outputFld === undefined)
                        me.append(me.outputFld = $('<output>',{tabindex:-1,for:me.id}).addClass('feedback'));

                    if(me.testLink()){
                        var tp = new Wui.Template({
                            data:       val, 
                            template:   '<span>Preview:</span> <a href="{uri}" target="{target}" '+
                                        'class="{((target == "_blank") ? "uri-new-win" : "")}">{title}</a>'
                        });
                        me.outputFld.html(tp.make());
                    }else{
                        if(val.uri && val.uri.length > 2)
                            me.outputFld.html('Your link is improperly formatted.');
                        else
                            me.outputFld.empty();
                    }  
                },
    init:       function(){
                    var me = this;
                    
                    me.items = [
                        me.urlField     = new Wui.Text({ cls:'w121-link-focus', blankText:'URL', linkData:'uri' }),
                        me.titleField   = new Wui.Text({ blankText:'Display Text', linkData:'title'}),
                        me.targetField  = new Wui.Combo({
                            valueItem:  'target', 
                            titleItem:  'name', 
                            blankText:  'Target', 
                            keepInline: true,
                            data:       [{target:'_self', name:'Opens In Same Window'}, {target:'_blank', name:'Opens In New Window/Tab'}], 
                            linkData:   'target',
                            cls:        'no-margin'
                        })
                    ];
                    
                    Wui.FormField.prototype.init.call(me);
                    me.value = { target: '_self', title: null, uri: null };
                    
                    (me.elAlias || me.el).addClass('w121-hyperlink');
                    
                    //additional listeners and initial value for target
                    me.setListeners(me.urlField,me.titleField,me.targetField);
                    me.targetField.val(me.value.target);
                   
                    me.urlField.field.keyup(function(){
                        //sets the title the same as the url - for laziness' sake
                        if(me.titleField.field.val() == me.titleField.blankText)
                            me.value.title = null;
                        if(me.value.title === null)
                            me.titleField.val($(this).val());
                    })
                    .blur(function(){ me.value.title = me.titleField.val(); });
                },
    setListeners:function(){
                    var me = this,
                        flds = arguments;
                        
                    Array.prototype.forEach.call(flds,function(itm){
                        (itm.field.field || itm.field).on('blur click keyup keydown mousedown', null, itm, function(e){
                            var wuiObjVal = e.data.val();
                            if(wuiObjVal !== null && wuiObjVal != {}) me.value[e.data.linkData] = wuiObjVal;
                            me.buildOutput.call(me);
                        })
                        .on('focus',null, itm, function(e){
                            Array.prototype.forEach.call(flds,function(field){ field.el.removeClass('w121-link-focus'); });
                            e.data.el.addClass('w121-link-focus');
                        });
                    });
                },       
    testLink:   function isUrl() {
                    return (this.fullPath.test(this.value.uri) || this.relativePath.test(this.value.uri));
                },
    getVal:     function(){
                    return this.value;
                },
    setVal:     function(sv){
                    $.extend(this.value,sv);
                    this.urlField.val(this.value.uri);
                    this.titleField.val(this.value.title);
                    this.targetField.val(this.value.target);
                    this.buildOutput();
                },
    validTest:  function(){ if(this.required && !this.testLink()) return false; return true; }
});