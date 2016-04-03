/**
 * Wui.Combo
 * =================================================================================================
 * (a combination of a select and an autocomplete)
 *
 * 
 * Functionality
 * -------------
 *
 * - Combo requires valueItem and titleItem attributes. 
 *     - If consuming a `<select>` off the DOM (see below), these values will be set automatically.
 *     - By default, these will automatically create a template of '<li>{titleItem}</li>'
 * - Custom templates can be defined for the option list items on the Combo, and follow the rules 
 *   of the Wui.Template object.
 * - Multiple selection is not supported at this time
 * - Arrow button can be removed to make the control appear more like an autocomplete
 *
 * 
 * - Can be asynchronously loaded from a remote data store and search locally
 *     - Configs: url, [params], autoLoad = true
 * - Can be asynchronously loaded from a remote data store and search asynchronously
 *     - Configs: url, [params], searchLocal = false
 * - Can assume the position and values of a `<select>` element on the DOM
 *     - Data set in the object definition, OR
 *     - Data will be created from a select box
 *         - Combo construction will take the form `new Wui.Combo(<config object>, <select box>)`.
 *         - Disabled options will have a value of `null`.
 *         - Options without a value attribute will get the value of the text they contain.
 *         - Options with a blank value, or no value attribute and no text sub-node, will return
 *           a value of "".
 *         - Data will be in the form:
 *             ```
 *             {
 *                 value: '<value attribute, or other as described above>', 
 *                 label: '<text sub-node of the option tag>'
 *             }
 *             ```
 *
 * Interactions
 * ------------
 *
 * - Clicking:
 *     - When the Combo's field doesn't have focus, clicking on the field will open the dropdown
 *       and select all of the text currently in the field.
 *     - Clicking the Combo's field when it does have focus merely moves the cursor within the field.
 *     - Clicking the Combo's arrow button toggles the dropdown open and shut
 *     - Clicking on a menu item in the option list will select the item, fill the field with the
 *       selected item, close the drop down, and put the cursor at the end of the field.
 *     - Clicking away from the Combo will close the option list (if open) and remove focus.
 * 
 * - Hovering
 *     - Hovering over an item in the option list will also place the text of the 'titleItem' in the
 *       text field, if the item is not selected, when the user hovers out the text field will revert
 *       to whatever text was in it before.
 * 
 * - Typing
 *     - Tabbing
 *         - Tabbing into the drop down will select the text in the field, but will not 
 *           open the dropdown.
 *         - Tabbing when the field has focus will set the current selection and move away from the
 *           field to the next tab item.
 *             - If the option list is open, it will be closed
 *             - If the field is blank, and there is a blank item in the options, the field will be 
 *               blanked. Otherwise the field will revert to the currently selected item. Any text in
 *               the text field from a hover (see 'Hovering' above) will revert to the selected item.
 *     - Arrow Down
 *         - If the option list is open, the selection will move within the list, filling the field
 *           with the 'titleItem' of the selected item. When the selection reaches the bottom of the 
 *           list an arrow down press will remove selection and focus will be set on the field with
 *           whatever value was in the field the last time the field had focus. An arrow down from
 *           focus in the field will select the first item in the options list.
 *         - If the option list is closed, an arrow up or down will move through the options list, 
 *           changing the field to the 'titleItem' of the currently selected (but unseen) option, and
 *           also set the field to the value of that item.
 *     - Arrow Up
 *         - Same functionality of arrow down in reverse order
 *     - Enter
 *         - If the options list is open, enter key will set the value of the field to the currently 
 *           selected item in the option list, and close the list.
 *         - If the options list is closed, enter has no effect.
 *     - Escape
 *         - Sets the value of the field back to its previous value, and closes the options list 
 *           if it's open.
 *     - Any other typing will cause a search of the options list.
 *         - Local searching (determined by the searchLocal attribute, default: true) will cause an
 *           unbounded search of the DOM text of the items in the options list.
 *         - Remote searching will send requests to the server, and will be at the mercy of the rules
 *           of the search method on the server.
 *             - Causes a redraw of the options list
 *             - Matching text in the DOM elements of the options list will be hilighted, but may not
 *               necessarily match the rules of the remote search. This is not an error, but care
 *               should be taken to make sure hilighting is not spotty or nonsensical if/when
 *               rules mismatch.
 *             - The search parameter passed to the back-end is the value of the field, and by default
 *               it's named 'srch'. It can be changed via the `searchArgName` prameter.
 *             - A minimum number of characters can be set before a remote search will fire so that
 *               there are not too many search results. This is set with the `minKeys` attribute. The
 *               default value though is 1.
 *         - If there are no matching results, by default 'No Results.' will be shown in the options
 *           list. This message can be changed with the `emptyMsg` attribute.
 */
Wui.Combo = function(args){
    $.extend(this, {
        /** 
         * AddBlankDataItem, when trur, will add a blank item at the beginning of the dataset. 
         * This is to allow blanking out the field to revert the field to a null item. This is the 
         * only sensical way to solve the problem of a selection error on 'blur'. Default true is
         * set to be backward compatible with legacy code. Regardless of this setting, if consuming
         * a <select> off the DOM, this item will be changed to 'false'.
         */
        AddBlankDataItem: true,
        
        /** Whether to load remote elements the moment the combobox 
        is created, or wait to load remote elements until a search 
        value is entered. */
        autoLoad:   false,

        /** CSS class to place on the drop-down element. */
        ddCls:      '',

        /** Text to display in the drop-down when no results are returned. */
        emptyMsg:   'No Results.',

        /** The DOM element for the field */
        field:      $('<input>').attr({type:'text'}),
        
        /** Whether to filter results at all */
        filterField:true,

        /** When set to true, the field will be blanked out if an option from the drop down is not selected. */
        forceSelect:false,

        /** Minimum number of characters entered before the combo will 
        filter remotely. */
        minKeys:    1,

        /** The name of the search parameter that will be sent to the 
        server for remote filters. */
        searchArgName:'srch',

        /** Whether to filter the drop-down amidst the locally loaded 
        results or to go to the server. */
        searchLocal:true,

        /** Whether or not to show the drop-down button */
        showDD:     true,

        /** @required The key in the data that will be used for display 
        in the combo box. */
        titleItem:  null,

        /** @required The key in the data that will be used as the 
        value for the combo when an item is selected. */
        valueItem:  null
    },args,{
        /** Turns off the ability to select multiple items. 
        TODO: Revisit this one */
        multiSelect:false
    }); 

    // Create template when one hasn't been defined
    if( !(this.hasOwnProperty('template') && this.template !== null && this.template !== undefined) &&
        this.hasOwnProperty('valueItem') &&
        this.hasOwnProperty('titleItem') &&
        this.valueItem &&
        this.titleItem
    )
        this.template = '<li>{' +this.titleItem+ '}</li>';

    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.FormField(), new Wui.DataList(), {
    /** Closes the drop-down menu. */
    close:      function(){ 
                    this._open = false;
                    this.dd.hide();
                },

    /** @param {string} srchVal    A search term
    Hilight text within the search results given the search term. Only works
    when there is not a custom template defined. */
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

    /** Method that runs when the object is initiated */
    init:       function(){
                    var me = this;

                    // Set up object
                    Wui.FormField.prototype.init.call(me);
                    me.el.addClass('wui-combo ' + (me.idCls = Wui.id()));
                    me._open = false;
                    me.identity = me.valueItem;
                    if(typeof me.blankText !== 'undefined')
                        me.setBlankText(me.blankText);
                    

                    // Place field elements
                    me.append( me.wrapper = $('<div>').addClass('wui-combo').append(me.setListeners(me)) );
                    $('body').append( 
                        me.dd = $('<ul>').addClass('wui-combo-dd ' + me.ddCls).on('mousewheel scroll', function(evnt){ evnt.stopPropagation(); })
                    );

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
                        wuidblclick:function(evnt){ evnt.stopPropagation(); }
                    });

                    // Create Dropdown Button
                    if(me.showDD){
                        me.ddSwitch = new Wui.Button({
                            click:      function(){
                                            if(me._open) me.close();
                                            else         me.open();
                                            me.field.focus();
                                        },
                            text:       '',
                            tabIndex:   -1,
                            appendTo:   me.wrapper,
                            cls:        'field-btn dd-switch'
                        });
                        me.ddSwitch.place();
                        me.ddSwitch.el.mousedown(function(){ me.isBlurring = false; });
                    }
                    
                    me.setData(me.data);
                },

    /** Overrides the Wui.itemSelect and simplifies events for combo. */
    itemSelect: function(itm, silent){
                    var me = this;

                    me.dd.find('.wui-selected').removeClass('wui-selected');
                    itm.el.addClass('wui-selected');
                    me.selected = [itm];
                    
                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },

    /** Overrides the Wui.DataList make and adds listeners to objects. */    
    make:       function(){
                    var me = this;

                    me.elAlias = me.dd.empty().removeClass('wui-spinner');
                    Wui.DataList.prototype.make.apply(me,arguments);
                    
                    if(me.data.length === 0)
                        me.elAlias.html(me.emptyMsg);

                    me.dd.children()
                    .off('click')
                    .bind('touchstart',function() { 
                        me.itemSelect($(this).data('itm')); 
                        me.isBlurring = false; 
                    }).on({
                        mouseenter: function(){ me.itemSelect($(this).data('itm')); },
                        mousedown:  function(){ me.isBlurring = false; },
                        click:      function(){ me.set(); me.field.focus(); }
                    });

                    if(me.previous && me.previous.length)
                        me.hilightText(me.previous);

                    me.dd.on('mousedown',function(){ me.isBlurring = false; });

                    // Select a pre-applied value if it exists
                    var selectedItm = me.selectBy(me.valueItem, me.value);
                    
                    if(!selectedItm)    me.notFound(me.value);
                    else                me.set();

                    Wui.positionItem(me.field,me.dd);
                },

    /** Overrides the Wui.DataList modifyItem to add data to the element. */ 
    modifyItem: function(itm){ return itm.el.data('itm',itm); },
    
    /**
    @param    {number or string} val The current value of the control
    Empty function meant to be overridden to handle cases where the value of
    the field is not in the list of possible values. Needs to call
    this.setData(data) where data is the value to load on the grid.
    */
    notFound:   function() {},

    /** Loads data via the appropriate method when added to the DOM */
    afterRender:function(){
                    if(this.afterRendered !== true){
                        Wui.FormField.prototype.onRender.apply(this,arguments);

                        // Loads data per the method appropriate for the object
                        if(this.autoLoad && this.url !== null)  this.loadData();
                        else if(this.url === null)              this.make();

                        this.afterRendered = true;
                    }
                },

    /** Override Wui.Datalist.onRender to make it do nothing */
    onRender:   function(){},

    /** Opens the drop down */
    open:       function(){
                    var me = this, 
                        width = (me.field.innerWidth() < 100) ? 100 : me.field.innerWidth();

                    me._open = true;

                    // Clear the drop down when it loses focus
                    $(document).one('click','*:not(.' +me.idCls+ ' input)',function(evnt){ 
                        if(evnt.target !== me.field[0]) me.close(); 
                    });

                    // Scrolling within a dropdown causes crazy stuff to happen on the body,
                    // so save the body overflow state and momentarily set it to be unscrollable.

                    $('body').append(me.dd.width(width).show());
                    Wui.positionItem(me.field,me.dd);
                    me.scrollToCurrent();
                },


    /**
     * Overrides Wui.Data.processData. Used here to add a blank first item to the combo if
     * AddBlankDataItem is true.
     *
     * @param   {Array}     data    Data that is passed in from the Wui.Data setData method.
     *
     * @return  {Array}     The same data that was passed in, but changed
     */
    processData: function(data) {
        var me = this,
            dataItem = {};
        
        if(me.AddBlankDataItem === true) {
            if(!$.isEmptyObject(data[0])) {
                $.each(data[0], function(key) {
                    if (key == me.valueItem) {
                        dataItem[key] = null;
                    }
                    else {
                        dataItem[key] = '';
                    }
                });
            }
            
            data.splice(0, 0, dataItem);
        }
        
        return data;
    },


    /** @param {string} srchVal    A search term
    Searches locally within the drop-down's data for the srchVal, otherwise 
    if searchLocal is false, the data is searched remotely. */
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
                                me.dd.addClass('wui-spinner');

                                var srchParams = {};
                                srchParams[me.searchArgName] = srchVal;
                                me.loadData(srchParams);
                            }
                        }  
                    }
                },

    /**
    @param    {number} num Direction to go to select an ajacent value [1,-1]
    Selects the list item immediately before or after the currently selected item,
    works on the filtered visibility if the drop down is open.
    Overrides Wui.DataList.selectAjacent
    */
    selectAjacent:function(num){
                    var me = this,
                        selector = me._open ? ':visible' : '',
                        container = me.elAlias || me.el,
                        theEnd = (num == 1) ? ':first' : ':last',
                        fn = (num == 1) ? 'nextAll' : 'prevAll',
                        itm = me.selected.length ? me.selected[0].el[fn](selector+':first') : container.children(selector+theEnd);

                    return me.selectByEl(itm);
                },

    /**
    
    @param    {string} key The data item to look for
    @param    {string|number} val The value to look for
    @return An object containing the dataList, row, and record, or undefined if there was no matching row.
    Selects an item according to the key value pair to be found in a record. */
    selectBy:   function(key,val){
                    var me = this, 
                        retVal;
                        
                    me.each(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val) {
                            retVal = me.itemSelect(itm);
                            
                            return retVal;
                        }
                    });
                    return retVal;
                },

    /**
    Overrides Wui.DataList selectByEl because the scrollToCurrent added weird scrolling on closed dropdowns
    @param    {jQuery Object} el An object that will match an element in the DataList.
    Selects the matching DataList item.
    */
    selectByEl: function(el){
                    var me = this,
                        retVal;

                    me.itemSelect(retVal = me.getItemByEl(el));
                    
                    return retVal;
                },

    /** Sets the value of the drop down to the value of the selected item */
    set:        function(){
                    var me = this;

                    if(me.selected[0] && me.value != me.selected[0].rec)
                        me.val(me.selected[0].rec);
                    if(me._open)
                        me.close();
                },

    /** Sets blank text on the field */
    setBlankText:function() { 
                    Wui.Text.prototype.setBlankText.apply(this,arguments); 
                },

    /** @param {Wui Object} t Wui Object to add listeners to its field.
    Sets listeners on the field that give it combo-box-like interactions */    
    setListeners:function(t){
                    // t = the combo field
                    return t.field.on({
                        keydown: function(evnt){

                            //clear the value if the user blanks out the field
                            if(t.field.val().length === 0) t.value = null;

                            switch(evnt.keyCode){
                                case 40:    evnt.preventDefault(); move(1);     break;  // downkey
                                case 38:    evnt.preventDefault(); move(-1);    break;  // upkey
                                case 9:     t.set();                            break;  //tab
                                case 27:                                                // escape
                                    evnt.preventDefault(); 
                                    t.field.val(t.previous);
                                    t.close();
                                break;
                            }
                            
                            evnt.stopPropagation();
                        },
                        keyup: function(evnt){
                            if(evnt.keyCode == 13){  // enter
                                evnt.preventDefault(); 
                                t.set();
                            }
                            evnt.stopPropagation();
                        },
                        input: function() {
                            if(!t._open) t.open();
                            t.searchData(this.value);
                        },
                        focus: function(evnt){
                            t.isBlurring = undefined;
                            evnt.stopPropagation();
                        },
                        blur: function() {
                            if(t.isBlurring !== false){
                                t.close();
                            }else{
                                // IE needs some time
                                setTimeout(function(){ t.field.focus(); }, 10);
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

    /** Allows the value to be set via a simple or complex value */
    setVal:     function(sv){
                    var me = this;

                    me.value = sv;

                    if(sv === null){
                        me.clearSelect();
                        return sv;
                    }else if(typeof sv == 'object'){
                        return me.selectBy(me.valueItem,sv[me.valueItem]);
                    }else{
                        return me.selectBy(me.valueItem,sv);
                    }
                },

    /** Returns only the simple value of an item */
    getVal:     function(){
                    return (this.value !== null && typeof this.value[this.valueItem] != 'undefined') ? this.value[this.valueItem] : this.value;
                }
});