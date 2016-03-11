/** Creates a Combo box.  The Wui combo box can be presented in three general flavors depending on what configs are set:

1. Local Combo Box: Configs - data set in the object definition
2. Remote Search: Configs, url, [params], searchLocal = false
3. Pre-Loaded Remotely: Configs - url, [params], autoLoad = true

Pressing the following keys in the fields works as follows:
UP - Move focus to the previous item. If the menu is closed, the previous item in the menu is selected.
DOWN - Move focus to the next item. If the menu is closed, the next item in the menu is selected.
ESCAPE - Close the menu.
ENTER - Select the currently focused item and close the menu.
TAB - Select the currently focused item, close the menu, and move focus to the next focusable element.
*/
Wui.Combo = function(args){
    $.extend(this, {
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
    if( !(this.hasOwnProperty('template') && this.template !== null && this.template !== undefined) 
        && this.hasOwnProperty('valueItem') 
        && this.hasOwnProperty('titleItem') 
        && this.valueItem 
        && this.titleItem
    )
        this.template = '<li>{' +this.titleItem+ '}</li>';

    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.FormField(), new Wui.DataList(), {
    /** Attach the combo box to a DOM element */
    attachToElem: function(select) {
        var me = this;
        
        // Hide the combo and replace it with the WUI control
        me.place();
        select.replaceWith(me.el).appendTo(me.el).css('display','none');
        
        // Set value if there is a selected option
        select.find('option[selected]').each(function(index, item) {
            me.val($(item).val(), false);
        });
        
        // Add listeners to mirror events between combo and select
        select.on('change', function() {
            me.val(select.val(), false);   // false makes the change 'silent' so the second listener won't fire
        });
        $(document).on('valchange', me.el, function(event, combo, newVal) {
            select.val((newVal !== undefined && newVal !== null) ? newVal[me.valueItem] : newVal);
           
            if(select.val() === null) {
                select.val(newVal);
            }
        });  
    },
    
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
                },

    /** Overrides the Wui.itemSelect and simplifies events for combo. */
    itemSelect: function(itm, silent){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

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
                    .bind('touchstart',function(evnt){ 
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
                    if(me.value && me.field.val().length == 0){
                        var selectedItm = me.selectBy(me.valueItem, me.value);
                        
                        if(!selectedItm)    me.notFound(me.value);
                        else                me.set();
                    }

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
    notFound:   function(val){},

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

    getStylesForElement: function(elem) {
        var result = {};

        [].slice.call(document.styleSheets).forEach(function (stylesheet) {
            // some stylesheets don't have rules
            if (!stylesheet.rules) return;
            [].slice.call(stylesheet.rules).forEach(function (rule) {
                // account for multiple rules split by a comma
                rule.selectorText.split(',').forEach(function (selector) {
                    if (elem.matches(selector)) {
                        for (var index=0; index < rule.style.length; ++index) {
                            var prop = rule.style[index];
                            result[prop] = rule.style[prop];
                        }
                    }
                });
            });
        });

        var styles = elem.style;
        
        $.each(styles, function(index, rule) {
           result[rule] = styles[rule];
        });

        return result;
    },

    /** Opens the drop down */
    open:       function(){
                    var me = this, 
                        width,
                        widestChild = 0;

                    me._open = true;

                    // Clear the drop down when it loses focus
                    $(document).one('click','*:not(.' +me.idCls+ ' input)',function(evnt){ 
                        if(evnt.target !== me.field[0]) me.close(); 
                    });
                    
                    // Append to the body invisibly so that we can size items if we need to
                    $('body').append(
                        me.dd.css({
                            visibility:     'hidden',
                            display:        'block'
                        })
                    );
                    
                    // Look at the size of any style on the item, if width is explicity defined, 
                    // don't change it here (max-width doesn't apply)
                    width = me.getStylesForElement(me.dd[0]).width;
                    if (isNaN(parseInt(width)) && String(width).indexOf('calc') !== 0) {
                        // As default, set drop-down width according to the width of the field
                        width = (me.field.innerWidth() < 100) ? 100 : me.field.innerWidth();
                        
                        // Look at the items in the drop down and determine the widest, then
                        // account for padding on the container
                        me.dd.children().each(function(index, item) {
                            if($(item).outerWidth() > widestChild) {
                                widestChild = $(item).outerWidth();
                            }
                        });
                        widestChild += (me.dd.outerWidth() - me.dd.width() + 1); 
                        
                        
                        // Set drop-down to the widest between the field and its children
                        width = (width > widestChild) ? width : widestChild;
                        me.dd.width(width);
                    }

                    // Scrolling within a dropdown causes crazy stuff to happen on the body,
                    // so save the body overflow state and momentarily set it to be unscrollable.
                    Wui.positionItem(me.field, me.dd);
                    me.dd.css('visibility', '');
                    me.scrollToCurrent();
                },
    
    
    /** Gets all of the options in a select box */
    _parseOptions: function(options) {
        var data = [];
        
        options.each(function( index, item ) {
            var option = $( item ),
                optgroup = option.parent( "optgroup" );
            data.push({
                element: option,
                index: index,
                value: option.val(),
                label: option.text(),
                optgroup: optgroup.attr( "label" ) || "",
                disabled: optgroup.prop( "disabled" ) || option.prop( "disabled" )
            });
        });
        
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
                    var me = this, retVal = undefined;
                    me.each(function(itm){
                        if(itm.rec[key] !== undefined && itm.rec[key] == val)
                            return retVal = me.itemSelect(itm);
                    });
                    return retVal;
                },

    /**
    Overrides Wui.DataList selectByEl because the scrollToCurrent added weird scrolling on closed dropdowns
    @param    {jQuery Object} el An object that will match an element in the DataList.
    Selects the matching DataList item.
    */
    selectByEl: function(el){
                    var me = this, retVal = undefined;

                    me.itemSelect(retVal = me.getItemByEl(el));
                    
                    return retVal;
                },


    /** Overrides object change parameters so that if a select box is changed programmatically
    that change events will still fire */
    selectObserver: function(mySelect) {
        mySelect.find('option').each(function(index, option) {
            // Property mutation for hidden input
            Object.defineProperty(option, "selected", {
                get: function() {
                    return this.getAttribute("selected");
                },
                set: function(val) {
                    // handle select change here
                    if (val === false) {
                        option.removeAttribute('selected');
                    }
                    else {
                        option.setAttribute('selected', true);
                        $(option).trigger('change');
                    }
                }
            });
        });
        
        Object.defineProperty(mySelect[0], "value", {
            get: function() {
                return $.valHooks.select.get(this);
            },
            set: function(val) {
                $.valHooks.select.set(this, val);
            }
        });
        
        // Makes the function a pass-through
        return mySelect; 
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
    setBlankText:function(bt){ 
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
                        input: function(evnt){
                            if(!t._open) t.open();
                            t.searchData(this.value);
                        },
                        focus: function(evnt){
                            t.isBlurring = undefined;
                            evnt.stopPropagation();
                        },
                        blur: function(evnt){
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