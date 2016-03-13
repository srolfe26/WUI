Wui.Combo = function(args){
    $.extend(this, {
        autoLoad:   false,
        ddCls:      '',
        emptyMsg:   'No Results.',
        field:      $('<input>',{type:'text'}),
        hiddenField:$('<input>',{type:'hidden'}),
        filterField:true,
        forceSelect:false,
        minKeys:    1,
        searchArgName:'srch',
        searchLocal:true,
        showDD:     true,
        titleItem:  null,
        valueItem:  null
    },args,{
        multiSelect:false
    }); 

    // Create template when one hasn't been defined
    if( !(this.hasOwnProperty('template') && this.template !== null && this.template !== undefined) &&
        this.hasOwnProperty('valueItem') &&
        this.hasOwnProperty('titleItem') &&
        this.valueItem &&
        this.titleItem
    ){
        this.template = '<li>{' +this.titleItem+ '}</li>';
        this.noSpecifiedTemplate = true;
    }
    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.FormField(), new Wui.DataList(), {
    close:      function(){ 
                    this._open = false;
                    this.dd.css('display','none');
                },
    argsByParam:function(){
                    Wui.O.prototype.argsByParam.apply(this,[ ['name'], (this.hiddenField || this.field) ]);
                },
    hilightText:function(srchVal){
                    var me = this;

                    function clearHilight(obj){
                        return obj.find('.wui-highlight').each(function(){
                            $(this).replaceWith($(this).html());
                        }).end();
                    }
                    
                    function hilightText(obj){
                        if (obj.children().length) {
                            obj.children().each(function(){
                                hilightText($(this));
                            });
                        }
                        else {
                            obj.html(
                                obj.text().replace( new RegExp(srchVal,"ig"), function(m){
                                    return '<span class="wui-highlight">' +m+ '</span>';
                                })
                            );
                        }
                        
                        return obj;
                    }

                    me.dd.children().each(function(){
                        var itm = $(arguments[1]);

                        if(itm.text().toUpperCase().indexOf(srchVal.toUpperCase()) >= 0)    hilightText(itm).show();
                        else                                                                clearHilight(itm).hide();
                    });

                    Wui.positionItem(me.field,me.dd);
                },
    init:       function(){
                    var me = this;

                    // Set up object
                    Wui.FormField.prototype.init.call(me);
                    me.el.addClass('w121-combo ' + (me.idCls = Wui.id()));
                    me._open = false;
                    me.identity = me.valueItem;
                    if(typeof me.blankText !== 'undefined')
                        me.setBlankText(me.blankText);
                    

                    // Place field elements
                    me.append( 
                        me.wrapper = $('<div>').addClass('w121-combo').append(
                            me.hiddenField,
                            me.setListeners(me)
                        )
                    );
                    $('body').append( me.dd = $('<ul>').addClass('w121-combo-dd ' + me.ddCls) );

                    // Listeners - These listeners must stop propagation or else they
                    // will trigger events for their containing DataLists (like grids with
                    // combos in the tbar)
                    me.el.on({
                        wuichange:  function(evnt,combo,el,rec,selection){
                                        var text = (selection.length) ? rec[combo.titleItem] : combo.previous;
                                        Wui.Text.prototype.fieldText.call(me,text);
                                        evnt.stopPropagation();
                                    },
                        click:      function(evnt){ evnt.stopPropagation(); },
                        wuiselect:  function(evnt){ evnt.stopPropagation(); },
                        wuideselect:function(evnt){ evnt.stopPropagation(); },
                        datachanged:function(evnt){ evnt.stopPropagation(); },
                        wuidblclick:function(evnt){ evnt.stopPropagation(); },
                        wuibtnclick:function(evnt){
                                        if(me._open) me.close();
                                        else         me.open();
                                        me.field.focus();

                                        evnt.stopPropagation();
                                    }
                    });

                    // Create Dropdown Button
                    if(me.showDD){
                        me.ddSwitch = new Wui.Button({
                            text:       '<i class="fa fa-angle-down"></i>',
                            tabIndex:   -1,
                            appendTo:   me.wrapper,
                            cls:        'field-btn dd-switch'
                        });
                        me.ddSwitch.place();
                        me.ddSwitch.el.mousedown(function(){ me.isBlurring = false; });
                    }
                },
    /** Override Wui.Datalist.onRender to make it do nothing */
    onRender:   function(){
                    if(this.rendered !== true){
                        // Loads data per the method appropriate for the object
                        if(this.autoLoad && this.url !== null)  this.loadData();
                        else if(this.url === null)              this.make();

                        Wui.FormField.prototype.onRender.apply(this,arguments);
                    }
                },
    itemSelect: function(itm, silent){
                    var me = this;

                    me.dd.find('.w121-selected').removeClass('w121-selected');
                    itm.el.addClass('w121-selected');
                    me.selected = [itm];
                    
                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },
    make:       function(){
                    var me = this;

                    me.elAlias = me.dd.empty().removeClass('w121-spinner');
                    Wui.DataList.prototype.make.call(me);
                    if(me.data.length === 0)
                        me.elAlias.html(me.emptyMsg);

                    window.setTimeout(function(){
                        me.dd.children()
                        .off('click')
                        .bind('touchstart',function(){ 
                            me.itemSelect($(this).data('itm')); 
                            me.isBlurring = false; 
                        }).on({
                            mouseenter: function(){ me.itemSelect($(this).data('itm')); },
                            mousedown:  function(){ me.isBlurring = false; },
                            click:      function(){ me.set(); me.field.focus(); }
                        });

                        if(me.previous && me.previous.length && me.noSpecifiedTemplate)
                            me.hilightText(me.previous);

                        me.dd.on('mousedown',function(){ me.isBlurring = false; });

                        // Select a pre-applied value if it exists
                        if(me.value && me.field.val().length === 0){
                            var selectedItm = me.selectBy(me.valueItem, me.value);
                            
                            if(!selectedItm)    me.notFound(me.value);
                            else                me.set();
                        }
                    },0);
                },
    modifyItem: function(itm){ return itm.el.data('itm',itm); },
    notFound:   function(){},
    open:       function(){
                    var me = this, 
                        width = (me.field.innerWidth() < 100) ? 100 : me.field.innerWidth();

                    me._open = true;

                    // Clear the drop down when it loses focus
                    $(document).one('click','*:not(.' +me.idCls+ ' input)',function(evnt){ 
                        if(evnt.target !== me.field[0]) me.close(); 
                    });
                    $('body').append(me.dd.css({width:width, display:'block'}));

                    Wui.positionItem(me.field,me.dd);
                    me.scrollToCurrent();
                },
    searchData: function(srchVal){
                    var me = this, oldSearch = me.previous || undefined;

                    if(me.filterField){
                        me.previous = srchVal;
                        
                        if(me.searchLocal){
                            me.hilightText(srchVal);
                        }else{
                            me.clearSelect();
                            if((srchVal.length >= me.minKeys || srchVal.length === 0) && me.previous != oldSearch){
                                if(srchVal.length === 0)
                                    me.val(null);

                                // me.open();
                                me.dd.addClass('w121-spinner');

                                var srchParams = {};
                                srchParams[me.searchArgName] = srchVal;
                                me.loadData(srchParams);
                            }
                        }  
                    }
                },
    selectAjacent:function(num){
                    var me = this,
                        selector = me._open ? ':visible' : '',
                        container = me.elAlias || me.el,
                        theEnd = (num == 1) ? ':first' : ':last',
                        fn = (num == 1) ? 'nextAll' : 'prevAll',
                        itm = me.selected.length ? me.selected[0].el[fn](selector+':first') : container.children(selector+theEnd);

                    return me.selectByEl(itm);
                },
    selectBy:   function(key,val){
                    var me = this, retVal;

                    me.each(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val){
                            retVal = me.itemSelect(itm);
                            return retVal;
                        }
                    });

                    return retVal;
                },
    set:        function(){
                    var me = this, sel = me.selected[0];

                    if(sel && me.value != sel.rec){
                        me.val(sel.rec);

                        if(sel.rec)
                            me.hiddenField.val(sel.rec[me.valueItem]);
                    }
                        
                    if(me._open)
                        me.close();
                },
    setBlankText:function(){ 
                    Wui.Text.prototype.setBlankText.apply(this,arguments); 
                },
    setListeners:function(t){
                    // t = the combo field
                    return t.field.on({
                        keydown: function(evnt){
                            evnt.stopPropagation();

                            //clear the value if the user blanks out the field
                            if(t.field.val().length === 0){
                                t.value = null;
                                t.hiddenField.val('');
                            }

                            switch(evnt.keyCode){
                                case 40:    move(1);                break;  // downkey
                                case 38:    move(-1);               break;  // upkey
                                case 9:     t.set();                break;  // tab
                                case 13:    evnt.preventDefault();  break;  // enter
                                case 27:                                    // escape
                                    t.field.val(t.previous);
                                    t.close();
                                break;
                            }
                        },
                        keypress:function(evnt){
                            evnt.stopPropagation();
                            if(evnt.keyCode == 13)  // enter
                                evnt.preventDefault();
                        },
                        keyup: function(evnt){
                            evnt.stopPropagation();
                            if(evnt.keyCode == 13){  // enter
                                t.set();
                                evnt.preventDefault();
                            }
                        },
                        input: function(){
                            if(!t._open) t.open();
                            t.searchData(this.value);
                        },
                        focus: function(evnt){
                            t.isBlurring = undefined;
                            evnt.stopPropagation();
                        },
                        blur: function(){
                            if(t.isBlurring !== false){
                                t.close();
                            }else{
                                // IE needs some time
                                window.setTimeout(function(){ t.field.focus(); }, 10);
                                // evnt.preventDefault();
                            }
                        }
                    });

                    function move(dir){
                        var itm = null;

                        if(t.selected.length){
                            var edgeSel = (dir == 1) ? ':last' : ':first',
                                selector = t._open ? ':visible' : '',
                                onEdge = (t.elAlias || t.el).children(selector+edgeSel)[0] == t.selected[0].el[0];

                            if(onEdge)  t.clearSelect();
                            else        itm = t.selectAjacent(dir);
                        }else{
                            itm = t.selectAjacent(dir);
                        }

                        // Actually change the value if the drop-down isn't open
                        if(!t._open){
                            if(itm !== null)    { t.set(); }
                            else                { t.val(null); t.field.val(t.previous); }
                        }
                    }
                },
    setVal:     function(sv){
                    var me = this;

                    me.value = sv;

                    function selectObj(selectWith){
                        var val = me.selectBy(me.valueItem,selectWith);
                        if(typeof val != 'undefined'){
                            me.value = val.rec;
                            me.hiddenField.val(val.rec[me.valueItem]);
                        }else{
                            me.value = sv;
                            me.hiddenField.val( (typeof sv == 'number' || typeof sv == 'string') ? sv : '' );
                        }
                        return me.value;
                    }

                    if(sv === null){
                        me.clearSelect();
                        me.hiddenField.val('');
                        return sv;
                    }else{
                        return selectObj( (typeof sv == 'object') ? sv[me.valueItem] : sv );
                    }
                },
    getVal:     function(){
                    return (this.value !== null && typeof this.value[this.valueItem] != 'undefined') ? this.value[this.valueItem] : this.value;
                }
});