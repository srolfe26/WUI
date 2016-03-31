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
        // Whether to load remote data on instantiation of the Combo (true), or to load 
        // remote data based on a user's search. Default: false.
        autoLoad:   false,
        
        // A CSS class that will be applied to the options list (or dropdown). This class can be
        // useful for setting a max/min height or width, or for special styling.
        ddCls:      '',
        
        // The message to display when a search yields no results, whether local or remote. May be
        // a plain text string, or HTML formatted.
        emptyMsg:   'No Results.',
        
        // The text field for the combo. This field is specified in the constructor of the Combo (as
        // opposed to the prototype) because it must be a new DOM node for every instance of
        // the Combo.
        field:      $('<input>',{type:'text'}),
        
        // This field is a hidden field containing the value of the combo for use in an HTML form.
        // This is the field that will get a name and get picked up in a form submit.
        // TODO: (sn) When inplementing a combo that can take on a <select> item, this field will 
        // need to be evaluated.
        hiddenField:$('<input>',{type:'hidden'}),
        
        // Whether the combo is searchable or not. When this value is false the Combo behaves more
        // like a select and less like an autocomplete.
        filterField:true,
        
        // TODO: Find what this attribute is for. It has no meanining in ths context...
        forceSelect:false,
        
        // The minimum number of characters that must be in the field before a search will occur. If
        // searching against a very large dataset, increasing this number will help reduce the
        // size of the search results.
        minKeys:    1,
        
        // The name of the variable that will contain the search parameters on a remote search.
        searchArgName:'srch',
        
        // Tells the combo box to only search the local data rather than perform a remote call. This
        // can be used where the data is defined locally, or in concert with `autoLoad` where 
        // remotely loaded data is only searched on the client.
        searchLocal:true,
        
        // Determines whether to show the arrow button (that toggles the option list). A false 
        // value and makes the Combo appear more like an autocomplete field.
        showDD:     true,
        
        // The name of the part of the data containing the value that will be shown to the user.
        // For example: if the data is US states: [{state_id: 1, state_name:"Alabama"}, ...]
        // the titleItem will be 'state_name'. titleItem is REQUIRED.
        titleItem:  null,
        
        // The value part of the data that will be used/stored by the program.
        // For example: if the data is US states: [{state_id: 1, state_name:"Alabama"}, ...]
        // the valueItem will be 'state_id'. valueItem is REQUIRED.
        valueItem:  null
    }, args, {
        // Determies whether multiple selections can be made. At this time, on this control, 
        // multiselect is not available.
        // TODO: (sn) When adding the ability to consume <select> fields, if the select is a multiple,
        // bring in the Wui.Multiple
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
        // TODO: This likely doesn't need to exist
        this.noSpecifiedTemplate = true;
    }
    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.FormField(), new Wui.DataList(), {
/**
 * Closes the options menu
 */
close: function() {
    this._open = false;
    this.dd.css('display','none');
},


/**
 * Creates the arrow-down button on the right side of the combo field that opens and closes the options list (or
 * drop down) as long as `showDD` is true.
 */
createOptionsListToggle: function() {
    var me = this;

    if(me.showDD){
        me.ddSwitch = new Wui.Button({
            text:       '<i class="fa fa-angle-down"></i>',
            tabIndex:   -1,
            appendTo:   me.wrapper,
            cls:        'field-btn dd-switch'
        });

        me.ddSwitch.place();

        me.ddSwitch.el.mousedown(function() {
            // Set this to false so that a click on this button (which is not on the input field) will not be
            // acted on as a blur away from the Combo's field.
            me.isBlurring = false;
        });

        // Listener for the toggle on button click
        me.el.on('wuibtnclick', function(event) {
            if (me._open) {
                me.close();
            }
            else {
                me.open();
            }

            me.field.focus();
            event.stopPropagation();
        });
    }
},


/**
 * Overrides Wui.O.argsByParam. Causes the name attribute to be applied to the hiddenField rather
 * than the visible search field. This is important for HTML forms to get the correct value.
 */
argsByParam: function() {
    Wui.O.prototype.argsByParam.apply(this,[ ['name'], (this.hiddenField || this.field) ]);
},


/**
 * Text matching srchVal in the DOM elements of the options list will be high-lighted
 *
 * @param   {string}    srchVal     The text that will be searched for
 */
hilightText: function(srchVal) {
    var me = this;

    function clearHilight(obj){
        return obj.find('.wui-highlight').each(function(){
            $(this).replaceWith($(this).html());
        }).end();
    }

    function hilightText(obj){
        if (obj.children().length) {
            obj.children().each(function() {
                hilightText($(this));
            });
        }
        else {
            obj.html(
                obj.text().replace( new RegExp(srchVal,"ig"), function(m) {
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


/**
 * Adds necessary classes to the combo, and adds listeners that prevent propagation of Wui.DataList events from
 * the combo.
 */
init: function() {
    var me = this;

    // Set up object
    Wui.FormField.prototype.init.call(me);
    me.el.addClass('w121-combo ' + (me.idCls = Wui.id()));
    me._open = false;
    me.identity = me.valueItem;
    me.setBlankText(me.blankText);
    
    // Place field elements
    me.append(
        me.wrapper = $('<div>').addClass('w121-combo').append(
            me.hiddenField,
            me.setListeners(me)
        )
    );

    // Create options list
    $('body').append( 
        me.dd = $('<ul>')
                    .addClass('w121-combo-dd ' + me.ddCls)
                    .on('mousedown', function() {
                        // Set this to false so that a click on the options list (which is not on the input field) will 
                        // not be acted on as a blur away from the Combo's field.
                        me.isBlurring = false;
                    })
    );

    // Create Dropdown Button
    me.createOptionsListToggle();

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
},


/**
 * Override Wui.DataList.onRender to look for the `autoLoad` parameter, and additionally run Wui.FormField.onRender
 */
onRender: function() {
    if (this.rendered !== true) {
        // Loads data per the method appropriate for the object
        if (this.autoLoad && this.url !== null) {
            this.loadData();
        }
        else if (this.url === null) {
            this.make();
        }

        Wui.FormField.prototype.onRender.apply(this,arguments);
    }
},


/**
 * Overrides Wui.DataList.itemSelect to throw different events
 * @param   {Object}    itm         An object from the items array containing both an `el` and a `rec`
 * @param   {Boolean}   silent      Optional parameter. If true, the events will not fire
 *
 * @returns {Object}    The selected item is returned
 */
itemSelect: function(itm, silent) {
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


/**
 * Renders the data items from the items array. Overrides Wui.DataList.make. Selects a pre-applied value if it was
 * set on the combo before the data came in from the server.
 */
make: function() {
    var me = this;

    me.elAlias = me.dd.empty().removeClass('w121-spinner');
    Wui.DataList.prototype.make.call(me);
    

    // TODO: (sn) ought to be moved to hilightText method when the 'if' statement is removed below
    if(me.data.length === 0) {
        me.elAlias.html(me.emptyMsg);
    }

    // Makes rendering of the HTML asynchronous
    window.setTimeout(function(){
        me.dd.children()
        .off('click')
        .bind('touchstart',function(){ 
            me.itemSelect($(this).data('itm')); 
            me.isBlurring = false; 
        }).on({
            mouseenter: function() {
                            me.itemSelect($(this).data('itm'));
                        },
            mousedown:  function() {
                            me.isBlurring = false;
                        },
            click:      function() {
                            me.set(); me.field.focus();
                        }
        });

        // TODO: (sn) probably able to remove this if statement
        if (me.previous && me.previous.length && me.noSpecifiedTemplate) {
            me.hilightText(me.previous);
        }

        // Select a pre-applied value if it exists
        if(me.value && me.field.val().length === 0){
            var selectedItm = me.selectBy(me.valueItem, me.value);
            
            if (!selectedItm) {
                me.notFound(me.value);
            }
            else {
                me.set();
            }
        }
    }, 0);
},


/**
 * Overrides Wui.DataList.modifyItem, and is meant to be overridden where a developer can manipulate the DOM element
 * of an item as it is created.
 *
 * @param   {Object}    itm     An item from the Combo's items array
 *
 * @returns {Object}    Returns the item passed in
 */
modifyItem: function(itm) {
    return itm.el.data('itm', itm);
},


/**
 * Method meant to be overridden. Runs when the pre-applied value for the combo is not found in the dataset.
 */
notFound:   function(){},


/**
 * Opens the options menu
 */
open: function(){
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


/**
 * Performs a remote search and sets in motion the rendering of that data by calling loadData() with the srchVal
 * set as the value of the `searchArgName` parameter.
 *
 * @param   {string}    srchVal     The string that will be passed to the remote search function.
 */
searchData: function(srchVal) {
    var me = this,
        oldSearch = me.previous || undefined,
        srchParams = {};

    if(me.filterField){
        me.previous = srchVal;

        if(me.searchLocal){
            me.hilightText(srchVal);
        }else{
            me.clearSelect();
            if((srchVal.length >= me.minKeys || srchVal.length === 0) && me.previous != oldSearch){
                if(srchVal.length === 0) {
                    me.val(null);
                }

                me.dd.addClass('w121-spinner');
                srchParams[me.searchArgName] = srchVal;
                me.loadData(srchParams);
            }
        }
    }
},


/**
 * Selects the next or the previous item in the Combo's options list.
 *
 * @param       {number}    num     A 1 or -1. 1 to select the next item, -1 to select the previous.
 *
 * @returns     {object}    The newly selected item is returned
 */
selectAjacent: function(num) {
    var me = this,
        selector = me._open ? ':visible' : '',
        container = me.elAlias || me.el,
        theEnd = (num == 1) ? ':first' : ':last',
        fn = (num == 1) ? 'nextAll' : 'prevAll',
        itm = me.selected.length ? me.selected[0].el[fn](selector+':first') : container.children(selector+theEnd);

    return me.selectByEl(itm);
},


/**
 * Selects an item in the options list by a key value pair.
 *
 * @param   {string}    key     The name of a data item in the Combo's dataset
 * @param val
 * @returns {*}
 */
selectBy:   function(key, val) {
    var me = this,
        retVal;

    me.each(function(itm) {
        if (itm.rec[key] !== undefined && itm.rec[key] == val) {
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