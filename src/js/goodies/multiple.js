/*************************************** REQUIRES  forms.js ***************************************/
(function($,Wui) {


Wui.selectMonster = function(combo){
    var $combo = $(combo),
        data = [],
        selectRecs = [],
        attrs = $combo[0].dataset,
        replaceSpan = $('<span>').attr('data-select-name', $combo.attr('name'));

    // Collect the object's children into a data store
    $combo.children().each(function(idx,itm){
        var $itm = $(itm),
            val = $itm.attr('value'),
            title = $itm.text(),
            selected = ($itm.attr('selected') !== undefined),
            dataItm = {};

        dataItm[attrs.valueItem] = val;
        dataItm[attrs.titleItem] = title;

        data.push(dataItm);

        if(selected)
            selectRecs.push(dataItm);
    });

    // Replace the existing object with a placeholder
    $combo.replaceWith(replaceSpan);

    // Create the WUI combo
    return new Wui.Combo({
        titleItem:      attrs.titleItem,
        valueItem:      attrs.valueItem,
        data:           data,
        appendTo:       replaceSpan,
        name:           $combo.attr('name'),
        
        // Right now Wui.Combo only accepts single values, so put selected 
        // records in a separate value
        selectRecs:     selectRecs,
        
        // Actually select the latest selected item if there are multiple
        // This value gets wiped out when the object is placed
        value:          (selectRecs.length) ? selectRecs[ selectRecs.length - 1 ][attrs.valueItem] : null
    });
};


Wui.Multiple = function(args,combo){
    $.extend(this, {data: []}, args);

    this.init(combo);
}
Wui.Multiple.prototype = new Wui.FormField( $.extend( new Wui.DataList(), {
    init:           function(combo){
                        var me = this;

                        // Get info from combo needed to access its data
                        $.extend(me,{
                            valueItem:      combo.valueItem,
                            url:            combo.url,
                            params:         combo.params,
                            appendTo:       me.appendTo || combo.appendTo,
                            selectEl:       $('<select>',{
                                                multiple:   'multiple',
                                                name:       combo.name || me.name
                                            }),
                            selectTemplate:new Wui.Template({
                                                template:   '<option value={' +combo.valueItem+ '} ' +
                                                            'selected="selected">{' +combo.titleItem+ '}</option>'
                                            }),
                            // Add the combo as a member of the multiple
                            combo:          combo
                        });

                        // Define a template for the tags - In a separate function so they
                        // can be overridden
                        me.defineTags();
                        
                        // Init the object as a regular form
                        Wui.FormField.prototype.init.apply(me,arguments);

                        // Put the items on the DOM
                        var el = (me.elAlias || me.el);
                        el.addClass('w121-multiple')
                            .append( me.combo.el, me.selectEl )
                            .on('click',function(){
                                el[ (el.find('.w121-selected').length > 0) ? 'removeClass' : 'addClass' ]('has-focus');
                            })
                            .on('click','a', function(){ 
                                me.removeItems(this); 
                            })
                            .on('focus','input',function(){
                                me.combo.field.val('');
                                el.addClass('has-focus');
                            })
                            .on('blur','input',function(){
                                el.removeClass('has-focus');
                            })
                            .on('valchange', function(evnt,obj){ 
                                if(obj.value !== null){
                                    me.push(obj.value);
                                    obj.val(null);
                                    obj.field.val('');
                                }

                                evnt.stopPropagation();
                            });
                    },
    defineTags:     function(){
                        this.template = 
                            '<span>' +
                                '{' +this.combo.titleItem+ '}' +
                                '<a data-index="{wuiIndex}" href="javascript:void(0);">x</a>' +
                            '</span>';
                    },
    removeItems:    function(itm){
                        var me = this;

                        var wuiIndex = itm.dataset.index;
                        me.splice(wuiIndex,1);
                    },
    onRender:       function(){
                        var me = this;
                        
                        if(me.hasOnRendered !== true){
                            if(me.combo.autoLoad)   me.combo.loadData();
                            else                    me.combo.make();

                            if(me.combo.selectRecs)
                                // If there are selected records, the last one will be added
                                // by the data change event of the select
                                for(var i = 0; i < me.combo.selectRecs.length - 1; i++)
                                    me.push(me.combo.selectRecs[i]);

                            me.hasOnRendered = true;
                        }
                    },
    dataChanged:    function (){ 
                        this.make();

                        var me = this,
                            oldVal = me.value,
                            i = 0, 
                            holder = $('<div>'),
                            holdingData = $.extend(true,[],me.data) || [];

                        for(i = 0; i < holdingData.length; i++){
                            me.selectTemplate.data = holdingData[i];
                            holder.append(me.selectTemplate.make());
                        }

                        me.selectEl.empty().append(holder.children().unwrap());
                        me.value = me.data;

                        // Taking out.  This causes recursion and is not needed because
                        // the combo already has called valchange()..
                        //me.el.trigger($.Event('valchange'), [me, me.value, oldVal, me.val()]);
                    },
    push:           function(){
                        var me = this, actuallyPush = [];

                        Array.prototype.forEach.call(arguments,function(push_item){
                            var doPush = true;

                            // Ensure there are not multiple values added in the multiple
                            me.items.forEach(function(items_item){ if(push_item == items_item.rec) doPush = false; });
                            if(doPush)
                                actuallyPush.push(push_item);
                        });

                        Wui.Data.prototype.push.apply(this,actuallyPush);
                    },
    splice:         Wui.Data.prototype.splice,
    
    /** Returns only the simple value of an item */
    getVal:         function(){
                        var retArray = [];

                        if(this.value !== null && this.value.length)
                            for(var i = 0; i < this.value.length; i++)
                                retArray.push(this.value[i][this.valueItem]);
                        
                        return (retArray.length) ? retArray : null;
                    },
    setVal:         function(sv){
                        var me = this;

                        if(sv !== null && sv.length && sv.length > 0){
                            me.data = [];
                            me.make();
                            
                            // Comma/Space delimited strings of numbers are converted to an array
                            var pattern = /,/;
                            if(typeof sv === 'string' && sv.match(pattern)) {
                                sv = sv.split(',');
                            } else if (typeof sv === 'string') {
                                sv = sv.split(' ');
                            }

                            // Single values are made an array of 1 element
                            if(!$.isArray(sv)){
                                var tmp = sv;
                                sv = []; sv[0] = tmp;
                            }

                            if(typeof sv[0] !== 'object')    me.loadComboVals(sv);
                            else                             me.setData(sv);
                        }else{
                            me.setData(null);
                        }
                    },
    loadComboVals:  function(sv){
                        var me = this;

                        if(me.url === null && me.combo.data.length){
                            for(var i = 0; i < sv.length; i ++){
                                if($.isNumeric(sv[i]) || (sv[i].length && sv[i].length > 0))
                                    me.push(me.combo.selectBy(me.combo.valueItem,sv[i]).rec);
                            }
                            me.combo.val(null);
                        }
                    },
    make:           function (){
                        var me = this,
                            holdingData = me.data || [],
                            els = [],
                            holder = $('<div>');
                        
                        // Clear out items list
                        me.items = [];

                        // Add items to me.items
                        for(var i = 0; (me.displayMax < 0 && i < holdingData.length) || (me.displayMax > 0 && i < me.displayMax && i < holdingData.length); i++){
                            var rec = me.data = holdingData[i],
                                itmEl = Wui.Template.prototype.make.call(me, i),
                                itm = { el:itmEl, rec:rec };
                            
                            els.push(itmEl);
                            Array.prototype.push.call(me.items,itm);
                            holder.append(me.createItem(itm));
                        }
                        
                        // Clear out existing items and add new to the DOM
                        me.clear();
                        (me.elAlias || me.el).prepend(holder.children().unwrap());
                        me.data = holdingData;
                        
                        // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                        // object has been manually run
                        me.autoLoad = true;
                        
                        me.clickListener(els);

                        // Event hook and event
                        me.afterMake();
                        me.el.trigger($.Event('refresh'),[me,me.data]);
                        me.resetSelect();
                    },
    clear:          function(){
                        this.combo.el.prevAll().remove();
                    }
} ));


})(jQuery,window[_wuiVar]);