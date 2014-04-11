/** The WUI Combobox can be set up in a number of different configurations that are really just variations of local and remote operations. See the configs. */
Wui.Combo2 = function(args){ 
    $.extend(this, {
        ddCls:      '',
        
        /** Name of a shared data store. Whenever the shared store updates, this updates too. If defined, Preempts locally defined data and remote calls on init. */
        dataName:    null,
        
        /** HTML to display in the drop-down when no results are returned.  */
        emptyMsg:   '(empty)',
        field:      $('<input>').attr({type:'text'}),
        titleItem:  null,
        autoLoad:   true,
        filterField:true,
        minKeys:    2,
        searchLocal:true
    },args); 

    // Create template when one hasn't been defined
    if( !(this.hasOwnProperty('template') && this.template !== null && this.template !== undefined) 
        && this.hasOwnProperty('valueItem') 
        && this.hasOwnProperty('titleItem') 
        && this.valueItem 
        && this.titleItem
    ){
        this.template = '<li>{' +this.titleItem+ '}</li>';
        this.noSpecifiedTemplate = true;
    }
    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo2.prototype = $.extend(new Wui.DataList(), new Wui.Text(), {
    /** Fires when the enter key is pressed */
    enterKey:   function(){
                    if(this.selectItm !== undefined)   this.selectItm.click();
                },
                    
    /** Fires when the down arrow is pressed */
    keyDown:    function(){
                    if(!this.dd.is(':visible')){
                        this.toggleDD('open');
                    }else{
                        var si = (this.selectItm === undefined) ? 0 : this.dd.children('.wui-combo-hover ~ :visible:first').index(),
                            idx = (si > 0) ? si : 0;
                        this.resultHover(this.dd.children(':eq(' + idx + ')'));
                    }
                },
                    
    /** Fires when the up is pressed */
    keyUp:      function(){
                    if(this.selectItm !== undefined){
                        var idx = this.selectItm.prevAll(':visible:first').index();
                        
                        if(idx < 0){
                            this.field.focus().select();
                            this.dd.children().removeClass('wui-combo-hover');
                            this.selectItm = undefined;
                        }else{
                            this.resultHover(this.dd.children(':eq(' + idx + ')'));
                        } 
                    }
                },
    resultHover:function(itmTarget){
                    this.dd.children().removeClass('wui-combo-hover');
                    return this.selectItm = $(itmTarget).addClass('wui-combo-hover');
                },
    getVal:     function(){ return this.value; },
    setVal:     function(sv){ 
                    var me = this;
                    
                    if(sv === null){
                        me.clearSelect();
                    }else if(typeof sv == 'object'){
                        // Select the item - if it doesn't exist then add it to the data set and select it
                        if(!me.selectBy(me.identity,sv[me.identity])){
                            me.data.push(sv);
                            me.make();
                            me.selectBy(me.identity,sv[me.identity]);
                        }
                    }else{
                        this.selectBy(this.identity,sv);
                    }
                },
    clearSelect:function(){
                    var me = this;
                    me.dd.find('.wui-selected').removeClass('wui-selected');
                    Wui.DataList.prototype.clearSelect.apply(me,arguments);
                    me.value = null;
                    me.fieldText('');
                },
    itemSelect: function(){
                    var me = this;
                    me.dd.find('.wui-selected').removeClass('wui-selected');
                    var retVal = me.value = Wui.DataList.prototype.itemSelect.apply(me,arguments).rec;
                    me.fieldText(me.value[me.titleItem]);
                    return retVal;
                },
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me);

                    // Place field elements
                    me.append(
                        me.wrapper = $('<div>').addClass('wui-combo').append(
                            me.dd = $('<ul>').addClass('wui-combo-dd ' + me.ddCls),
                            me.field
                        )
                    );
                    // Create Dropdown Button
                    me.ddSwitch = new Wui.Button({
                        click:      function(){ me.toggleDD(); },
                        text:       '',
                        tabIndex:   -1,
                        appendTo:   me.wrapper,
                        cls:        'field-btn dd-switch'
                    });
                    me.ddSwitch.place();

                    // Get the combo to look at another data store
                    if(me.dataName && me.dataName.length > 0){
                        $(window).on('datachanged',function(event,name,dataObj){
                            if(name == me.dataName)
                                me.setData(dataObj.data);
                        });
                    }

                    // For locally defined data
                    me.total = me.data.length;
                },
    make:       function(){
                    var me = this, tempAlias = me.elAlias;
                    me.elAlias = me.dd;
                    Wui.DataList.prototype.make.apply(me,arguments);
                    if(me.total == 0)   me.elAlias.html(me.emptyMsg);
                    me.elAlias = tempAlias;
                },
    onRender:   function(){
                    Wui.Text.prototype.onRender.apply(this,arguments);
                    Wui.DataList.prototype.onRender.apply(this,arguments);
                },
    toggleDD:   function(force){
                    var me = this, isVis = me.dd.is(':visible');

                    if(force !== undefined){
                        if(force == 'open') showDD();
                        else                hideDD();
                    }else{
                        if(isVis)           hideDD();
                        else                showDD();
                    }

                    function hideDD(){ me.dd.hide(); }
                    function showDD(){
                        if(!isVis){
                            var ddWid   = parseInt(me.dd.css('width')),
                                width   = (ddWid && ddWid > me.field.width()) ? ddWid : me.field.width(); 
                            // Clear the drop down when it loses focus
                            $(document).one('click',function(){ hideDD(); });
                            $('body').append(me.dd.width(width).show());
                            Wui.positionItem(me.field,me.dd);
                            me.field.select();
                        }   
                    }
                },

    /** 
    @param {string} srchVal    A search term
    Searches locally within the drop-down's data for the srchVal, otherwise if searchLocal is false,
    the data is searched remotely. */
    searchData: function(srchVal){
                    var me = this;
                    if(me.filterField){
                        me.searchFilter = srchVal;
                        
                        if(me.searchLocal){
                            me.toggleDD('open');
                            me.dd.children()[(srchVal && srchVal.length > 0) ? 'hide' : 'show']();
                            me.dd.children(':contains(' +srchVal+ ')').show();
                            me.rsltHover(me.dd.children(':contains("' +srchVal+ '"):first'));
                        }else{
                            if(srchVal.length >= me.minKeys || srchVal.length === 0)
                                me.loadData();
                        }    
                    }
                },
    setListeners:function(t){
                    return t.field
                            .click(function(){ t.toggleDD('open'); return false; })
                            .keyup(function(evnt){
                                switch(evnt.keyCode){
                                    case 40:    /*Do Nothing*/  break;
                                    case 38:    /*Do Nothing*/  break;
                                    case 13:    /*Do Nothing*/  break;
                                    case 9:     /*Do Nothing*/  break;
                                    default:    t.searchData(t.field.val());
                                }
                            })
                            .keydown(function(evnt){
                                //clear the value if the user blanks out the field
                                if(t.field.val().length === 0) t.value = null;
                                
                                if(t.data.length > 0){
                                    switch(evnt.keyCode){
                                        case 40:    t.keyDown();   break;
                                        case 38:    t.keyUp();     break;
                                        case 13:
                                        case 9:     t.enterKey();  break;
                                    }
                                    
                                    //scroll the list to the currently selected item
                                    t.scrollToCurrent();
                                }
                            });
                }
});