/*! Wui 1.2.1
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2.1/license.html
 */

(function($,window) {

// AJAX error reporting and caching.
$.ajaxSetup({ 
    cache:      false,
    error:      function(response){
                    var err = null;
                    
                    try{        err = $.parseJSON( response.responseText ); }
                    catch(e){   err = {fatalError:'Aw Snap! There was a problem talking to the server.'}; }
                    if(err !== null)
                        Wui.errRpt(err.fatalError);
                }
});


// Make sure the WUI is defined
var Wui = Wui || {
    version: '1.2.1'
};


/**
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@param      {string}   prop    The name of a css property
@return     The property name, or false

Detects whether a CSS property is supported by the current browser. If its not supported,
the method returns false. If the property is supported, the passed in string will be
returned as-is, or with the necessary vendor appropriate prefix.
*/
Wui.cssCheck = function(prop){
    var i           = 0,
        parts       = prop.split('-'),
        ucProp      = '';

    // camelCase dashed items
    for(; i < parts.length; i++)
        ucProp += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);


    var n           = 0,
        d           = document.createElement("detect"),
        camelProp   = ucProp.charAt(0).toLowerCase() + ucProp.slice(1),
        omPrefixes  = 'Webkit Moz O ms'.split(' '),
        prefixes    = '-webkit- -moz- -o- -ms-'.split(' '),
        all         = (prop+' '+camelProp+' '+omPrefixes.join(ucProp+' ') + ucProp).split(' '),
        property    = false;

    for (; n < all.length; n++) {
        if (d.style[all[n]] === "") {
            property = all[n];
            break;
        }
    }

    // The property is not supported
    if(!property) return false;

    // Return the property if it is supported, or prefixed if needed
    switch(n) {
        case 0:
        case 1:
            return prop;
        default:
            return prefixes[n-2] + prop;
    }
};


/**
    @param  {object}    obj         Object containing named keys.
    @param  {boolean}   [addIndex]  For fileLists, add the index of the file regardless of whether there is one or many. 
    @return A javascript FormData object (<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">Mozilla Developer Network: FormData</a>) containing the key/values passed in including files.

    Allows the WUI to upload files via ajax by using the javascript FormData object made
    available in HTML5. In cases where a field contains multiple files, the FileList it
    contains will be broken down into multiple keys in the FormData with the keys being named
    {fieldName}_{number-th-file starting with 0} (i.e. 'image_0','image_1',etc...). 

    The following MUST be added to the config of the ajax object:

    contentType:false,
    processData:false
*/
Wui.forAjaxFileUpload = function(obj,addIndex){
    var a = 0, x = 0, formData = new FormData();                                                                    

    // Adds all of the keys in obj to formData
    for (a in obj) {
        if(obj[a] instanceof FileList) {
            if(obj[a].length > 1 || addIndex){
                for(x = 0; x < obj[a].length; x++)
                    formData.append(a+'_'+x,obj[a][x]);
            }else{
                formData.append(a,obj[a][0]);
            }
        }else{
            if      (obj[a]===null) formData.append(a,"");
            else    formData.append(a,obj[a]);
        }
    }

    return formData;
};


/**Returns an array of the keynames of an object. For example:

Wui.getKeys({
    first:  1,
    second: 2,
    third:  'three'    
})

Will return:

['first','second','third']

@preserve_format
@param {object} Object containing named keys
@return Array containing the key names of the passed in object in alphabetical order.
*/
Wui.getKeys = function(obj){
    var retArray = [];
    if(obj)
        $.each(obj,function(key){ retArray.push(key); });
    return retArray.sort();
};


/** @return The id of the string. 
    Returns a string that will be a unique to use on the DOM. 
    Ids are returned in the format wui-{number}.
    _.uniqueID([prefix]) can fulfill this role
*/
Wui.id = function(){
    if(Wui.idCounter === undefined) Wui.idCounter = 0;
    return 'wui-' + Wui.idCounter++;
};


/** Determines whether a value is a percent string.
    @return     True if there is a string passed in containing a '%', else false.
*/
Wui.isPercent = function(){
    return (arguments[0] && arguments[0].indexOf && arguments[0].indexOf('%') != -1);
};


/** Gets the maximum CSS z-index on the page and returns one higher, or one if no z-indexes are defined.
    @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
    @return     A number representing the maximum z-index on the page plus one. 
*/
Wui.maxZ = function(){
    var bodyElems = $('body *'),
        useElems = bodyElems.length < 2500 ? bodyElems : $('body > *, [style*="z-index"]'),
        topZ =  Math.max.apply(null, 
                    $.map(useElems, function(e) {
                        if ($(e).css('position') != 'static')
                            return parseInt($(e).css('z-index')) || 0;
                    })
                );
    return ($.isNumeric(topZ) ? topZ : 0) + 1;
};


/** Converts a percentage to a number of pixels given the containing element's dimensions.
    @param {object} el          jQuery Object the percents are being calculated for. 
    @param {string} percent     Percent to be calculated into pixels
    @param {string} dim         Dimension [height,width] for comparing to parent objects
    @return Number in pixels of the percentage passed in.
*/
Wui.percentToPixels = function(el,percent,dim){
    var parent = el.parent(),
        useWindow = (parent[0] === $(window)[0] || parent[0] === $('html')[0] || parent[0] === $('body')[0]),
        parentSize = (useWindow) ? ((dim == 'height') ? verge.viewportH() : verge.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
};


/** 
@param {object} parent The element to which the child will be relatively positioned.
@param {object} child The element to be positioned.
Absolutely positions a child element, relative to its parent, such that it will 
be visible within the viewport and at the max z-index. Useful for dialogs and drop-downs.
*/
Wui.positionItem = function(parent,child){
    var ofst    = parent.offset(),
        cHeight = child.outerHeight(),
        cWidth  = child.outerWidth(),
        plBelow = (ofst.top + parent.outerHeight() + cHeight < $.viewportH()),
        plRight = (ofst.left + parent.outerWidth() - cWidth > 0); 

    child.css({
        left:       (plRight) ? ofst.left + parent.outerWidth() - cWidth : ofst.left,
        top:        (plBelow) ? ofst.top + parent.outerHeight() : ofst.top - cHeight,
        zIndex:     Wui.maxZ()
    });
};


/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@param    {number} lower    Lower bound for generating the random number
@param    {number} upper    Upper bound for generating the random number
@return A random number within the bounds specified

Generates a random number
*/
Wui.randNum = function(lower,upper) {
    upper = upper - lower + 1 ;
    return ( lower + Math.floor(Math.random() * upper) );
};


/** A function to get the scrollbar width is necessary because it varies among browsers, and is useful
for sizing objects within a container with overflow set to scroll, or auto.
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@return Number specifying the scrollbar width for the current page in pixels.
*/
Wui.scrollbarWidth = function() {
    var parent, child, width;

    if(width===undefined) {
        parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
        child=parent.children();
        width=child.innerWidth()-child.height(99).innerWidth();
        parent.remove();
    }

    return width;
};


/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@param  {object} response   A JSON object which was returned from an XHR response.
@return An object containing the data removed from any wrapper, and the total number of records received {data:array, total:numeric}

Unwraps the data from any container it may be in to allow it to be used by a containing object. Wrapper values are defined in
Wui.Data.prototype.dataContainer and Wui.Data.prototype.totalContainer.
*/
Wui.unwrapData = function(r){
    var me          = this,
        dc          = me.hasOwnProperty('dataContainer') ? me.dataContainer : Wui.Data.prototype.dataContainer,
        tc          = me.hasOwnProperty('totalContainer') ? me.totalContainer : Wui.Data.prototype.totalContainer,
        response    = (dc && r[dc]) ? r[dc] : r,
        total       = (tc && r[tc]) ? r[tc] : response.length;
    
    return {data:response, total:total};
};


// Base WUI Object
Wui.O = function(args){ $.extend(this, {
    hidden: false
},args); };
Wui.O.prototype = {
    addToDOM:   function(obj, tgt, act){
                    // Take the target and action from the passed object first if defined, then default to passed arguments, 
                    // then to a default of $('body') and 'append'
                    var target  = (obj.appendTo !== undefined) ? obj.appendTo :
                                    (obj.prependTo !== undefined) ? obj.prependTo :
                                        (tgt !== undefined && tgt !== null) ? tgt : 
                                            (obj.parent !== undefined && obj.parent.elAlias !== undefined) ? obj.parent.elAlias :
                                                (obj.parent !== undefined && obj.parent.el !== undefined) ? obj.parent.el : $('body'),
                        action = (obj.appendTo !== undefined) ? 'append' : 
                                    (obj.prependTo !== undefined) ? 'prepend' : 
                                        (act !== undefined && target[act]) ? act : 'append';
                    
                    // Try appending with WUI modifiers, else just append in good ol' jQuery fashion
                    try{
                      $(target)[action](obj.el);
                    }catch(e){
                        try{
                            $(target)[action](obj);
                        }catch(e){}
                    }

                    if(obj.cssByParam)
                        obj.cssByParam();
                    
                    return obj;
                },

    applyAttr:  function(name,val){
                    var validVal = (typeof val === 'string' || typeof val === 'number');
                    if(validVal) $(this.el).attr(name,val);
                    return validVal;
                },

    argsByParam:function(){
                    var me = this;

                    me.applyAttr('id',me.id);
                    me.applyAttr('name',me.name);
                    me.applyAttr('tabindex',me.tabIndex);
                    me.applyAttr('lang',me.lang);
                    me.applyAttr('title',me.titleAttr);
                },

    clear:      function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },

    cssByParam: function(){
                    var me = this, el = me.el;

                    me.argsByParam();

                    // Add attributes if defined
                    try{ if(me.attr && typeof me.attr == 'object')  el.attr(me.attr); }catch(e){ }
                        
                    // calculate dimensions
                    if($.isNumeric(me.height) && me.height >= 0)    el.css({height: me.height});
                    if($.isNumeric(me.width) && me.width >= 0)      el.css({width: me.width});

                    // calculate percentage based dimensions
                    if(Wui.isPercent(me.width))  el.css({width:Wui.percentToPixels(el,me.width,'width')});
                    if(Wui.isPercent(me.height)) el.css({height:Wui.percentToPixels(el,me.height,'height')});
                    
                    // hide an object based on its hidden value
                    if(me.hidden) el.css('display','none');
                        
                    return el.addClass(me.cls);
                },

    each:       function(f,ascending){
                    ascending = (typeof ascending === 'undefined') ? true : ascending;
                    var i = (ascending) ? 0 : this.items.length - 1;
                    
                    if(this.items){
                        if(ascending){
                            for(i; i < this.items.length; i++){
                                if(f(this.items[i],i) === false) break;
                            }
                        }else{
                            for(i; i >= 0; i--){
                                if(f(this.items[i],i) === false) break;
                            }
                        }
                    }

                    return true;
                },

    move:       function(newPosition){
                    var me = this, myPosition = me.index();
                        
                    // Bounds checking
                    newPosition = $.isNumeric(newPosition) ? newPosition : 0;

                    if(myPosition !== undefined){
                        // Moves my position in memory
                        me = Array.prototype.splice.call(me.parent.items,myPosition,1)[0];
                        Array.prototype.splice.call(me.parent.items,newPosition,0, me);
                        
                        // Depending on my position in memory, move DOM element accordingly
                        if(newPosition === 0) {                             //Place at the beginning of the DOM.
                            me.parent.items[1].el.before(me.el);
                        }else if(newPosition > me.parent.items.length) {    // The new position is greater than array length in memory, place at the end of DOM.
                            me.parent.items[me.parent.items.length-2].el.after(me.el);
                        }else{                                              // Place according to the new position in the DOM.
                            me.parent.items[newPosition-1].el.after(me.el);
                        }
                    }
                },

    hide:       function(speed, callback){ 
                    this.el.hide();
                    if(typeof callback == 'function')
                        callback();
                    return this.el;
                },

    index:       function(){ 
                    var me = this, myPosition = undefined;
                    if(me.parent){
                        // Get my position within the parental array
                        me.parent.each(function(itm,idx){ if(itm === me) myPosition = idx; });
                    }
                    return myPosition;
                },

    place:      function(after){
                    var me = this;
                    
                    // Adds the objects items if any
                    if(me.items === undefined) me.items = [];

                    me.each(function(itm){ 
                        itm.parent = me;
                        if(itm.place)    itm.place();
                        else             me.addToDOM(itm);
                    });
                    
                    // Puts the object on the DOM
                    return me.addToDOM(me);
                },

    push:       function(){
                    var me = this;
                    
                    if(me.items === undefined) me.items = [];
                    
                    $.each(arguments,function(i,arg){
                        arg.parent = me;
                        if(arg.place)   arg.place();
                        else            me.addToDOM(arg);
                    });

                    return Array.prototype.push.apply(me.items,arguments);
                },

    remove:     function(){
                    if(this.parent) this.parent.splice(this.index(),1);
                    else            this.el.remove();
                },

    show:       function(speed, callback){ 
                    this.el.show();
                    if(typeof callback == 'function')
                        callback();
                    return this.el;
                },

    splice:     function(idx, howMany){
                    var me = this,
                        el = me.elAlias || me.el;
                        idx = parseInt(idx);

                    if(me.items === undefined) me.items = [];
                    
                    //remove specified elements
                    for(var i = idx; i < (idx + howMany); i++)
                        if(me.items[i] && me.items[i].el) me.items[i].el.remove();
                    
                    //standard splice functionality on array and calcs
                    var retVal      = Array.prototype.splice.apply(me.items, arguments),
                        numAdded    = arguments.length - 2;
                        
                    //append any additional el's in proper order
                    if(me.items.length == numAdded){                    //items ended up replacing the array
                        for(i = 0; i < me.items.length; i++)          { me.items[i].parent = me; me.addToDOM(me.items[i],el);  }
                    }else if(me.items[(idx + numAdded)] === undefined){ //meaning the new items were inserted at the end of the array
                        for(i = idx; i < me.items.length; i++)        { me.items[i].parent = me; me.addToDOM(me.items[i],me.items[i-1].el,'after'); }
                    }else if (numAdded !== 0){                          //items at the beginning/middle of the array
                        for(i = (idx + numAdded); i > 0; i--)         { me.items[i-1].parent = me; me.addToDOM(me.items[i-1],me.items[i].el,'before'); }
                    }
                    
                    return retVal;
                }
};


/**
 @event     wuibtnclick     Fires when the button is pressed and not disabled. Avoided using the standard 'click' event for this reason ( Button Object )
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

 A Wui.Button creates a uniformly styled HTML button with additional functionality of being 
 able to be disabled/enabled.  The action of the button can be defined by using the 'click'
 method, or by naming the button and implementing a listener on the 'wuibtnclick' event.
*/
Wui.Button = function(args){
    $.extend(this, {
        /** The button element. Can be overridden according to the needs of the design. */
        el:         $('<button>').attr({unselectable:'on'}),
        
        /** Whether the button is disabled. */
        disabled:   false,
        
        /** Tool tip text for the button. */
        toolTip:    null,
        
        /** Tab index will make the button focusable by the browser. Changing this value will result in it receiving a higher precedence than what it would receive in that natural flow of the page. */
        tabIndex:   0,
        
        /** Text to appear on the button. Can be HTML if a more complex button design is desired. */
        text:       'Button'
    }, args);
    
    this.init();
};
Wui.Button.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. Adds the click listener with functionality to disable the button.*/
    init:       function(){ 
                    var me = this;
                    
                    me.el
                    .addClass('wui-button')
                    .click(btnClick)
                    .keydown(function(evnt){ if(evnt.keyCode == 13) return false; })
                    .keyup(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                        return false;
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    if(me.disabled)    me.disable();
                    
                    function btnClick(e){
                        if(!me.disabled)
                            me.el.trigger($.Event('wuibtnclick'),[me]);

                        return false;
                    }
                },
    
    /** Disables the button */
    disable:    function(){
                    this.disabled = true;
                    this.el
                    .toggleClass('disabled',this.disabled)
                    .attr('disabled',true)
                    .removeAttr('tabindex');
                },

    /** Enables the button */
    enable:     function(){
                    this.disabled = false;
                    this.el
                    .toggleClass('disabled',this.disabled)
                    .removeAttr('disabled')
                    .attr({tabindex:this.tabIndex});
                },

    /** Sets the button text. Can be HTML. */
    setText:    function(txt){ return this.el.html(txt); },
});


// WUI Pane
Wui.Pane = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:     true,
        
        /** An array of items that will be added to the header */
        tbar:       [],

        /** An array of items that will be added to the leftbar */
        lbar:       [],

        /** An array of items that will be added to the rightbar */
        rbar:       [],
        
        /** Whether or not the pane is disabled on load */
        disabled:   false,

        /** When set to true the pane will size itself to the height of its content on layout */
        fitToContent:false,
        
        /** Alignment of the heading title (left,center,right) */
        titleAlign: 'left',
                
        /** Default height */
        height:     '100%',
    
        /** HTML to show in the mask when the pane is disabled */
        maskHTML:   'Empty',

        /** The maximum height the pane will expand to when fitToContent is set to true. If
        fitToContent is false, this property does nothing.*/
        maxHeight:  null,

        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:      null
    },args); 
    this.init();
};
Wui.Pane.prototype = $.extend(new Wui.O(), {
    addMask:        function(){
                        if(this.container.children('wui-mask').length === 0)
                            return this.mask = $('<div>')
                                                .addClass('wui-mask')
                                                .append(
                                                    $('<span>').html(this.maskHTML)
                                                )
                                                .appendTo(this.container);
                        else
                            return null;
                    },

    disable:        function(){
                        var me = this;

                        me.addMask();
                        me.footer.each(function(itm){ if(itm.disable) itm.disable(); });
                        me.header.each(function(itm){ if(itm.disable) itm.disable(); });
                        me.leftbar.each(function(itm){ if(itm.disable) itm.disable(); });
                        me.rightbar.each(function(itm){ if(itm.disable) itm.disable(); });

                        return me.disabled = true;
                    },
    
    enable:         function(){
                        var me = this;

                        me.removeMask();
                        me.footer.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.header.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.leftbar.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.rightbar.each(function(itm){ if(itm.enable) itm.enable(); });

                        return me.disabled = false;
                    },

    init:           function(){
                        var me = this;
                            el = me.el = $('<div>').addClass('wui-pane');


                        if(!me.border)      
                            el.addClass('no-border');

                        if(me.title !=null)
                            me.setTitle(me.title);

                        el.append( me.elAlias = me.container = $('<div>').addClass('wui-pane-content') );

                        me.header = makeBar('tbar',{items: me.tbar});
                        me.footer = makeBar('bbar',{items: me.bbar});
                        me.leftbar = makeBar('lbar',{items: me.lbar});
                        me.rightbar = makeBar('rbar',{items: me.rbar});

                        configBar('tbar');
                        configBar('bbar');
                        configBar('lbar');
                        configBar('rbar');

                        // If the pane is disabled then it disables it
                        if(me.disabled) me.disable();

                        function makeBar(bar,args){
                            var barType = (bar == 'tbar' || bar == 'bbar') ? 'wui-h-bar' : 'wui-v-bar';

                            return new Wui.O($.extend({
                                el:         $('<div>'),
                                cls:        'wui-' + bar + ' ' + barType,
                                parent:     me,
                                appendTo:   me.el,
                                items:      [],
                                splice:     function(){ 
                                                var retVar = Wui.O.prototype.splice.apply(this,arguments);
                                                configBar(bar);
                                                return retVar;
                                            },
                                push:       function(){ 
                                                var retVar = Wui.O.prototype.push.apply(this,arguments);
                                                configBar(bar);
                                                return retVar;
                                            }
                            },args));
                        }

                        function configBar(bar){
                            var bars = {
                                    tbar: 'header',
                                    bbar: 'footer',
                                    lbar: 'leftbar',
                                    rbar: 'rightbar'
                                },
                                thisBar = me[bars[bar]],
                                hasBar = me.el.hasClass(bar);

                            if(!hasBar && thisBar.items.length){
                                me.el.addClass(bar);
                                thisBar.place();
                            }else if (hasBar && thisBar.items.length === 0){
                                me.el.removeClass(bar);
                                thisBar.el.remove();
                            }
                        }
                    },

    removeMask:     function(){
                        var me = this, mask = me.mask || me.el.find('.wui-mask');
                        
                        if(mask){
                            mask.remove();
                            me.mask = undefined;
                        }
                    },

    setTitle:       function(t){ 
                        var me = this,
                            hasEl = (typeof me.titleEl !== 'undefined');

                        me.title = t = (t && typeof t == 'string') ? t : null;

                        if(t !== null){
                            if(!hasEl)
                                me.el.append( me.titleEl = $('<div class="wui-title">') );

                            me.el.addClass('title');
                            me.setTitleAlign();
                            me.titleEl.html(t);
                        }else if(hasEl){
                            me.el.removeClass('title');
                            me.titleEl.remove();
                            me.titleEl = undefined;
                        }

                        return t;
                    },

    setTitleAlign:  function(t){ 
                        var me = this;
                        
                        me.titleAlign = t || me.titleAlign;
                        if(typeof me.titleEl !== 'undefined')
                            me.titleEl.removeClass('right left center').addClass(me.titleAlign);
                    }
});


Wui.Window = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:     true,
        
        /** Determines whether objects behind the window are accessible */
        isModal:    false,
        
        /** 
        @param {WUI Window} win    The window being closed.
        @eventhook Called just before the window closes. If this function returns false, the window will not be closed. 
        */
        onWinClose: function(){},
        
        /** 
        @param {WUI Window} win    The window being opened.
        @eventhook Called when the window opens. 
        */
        onWinOpen:  function(){},
        
        /** An array of items that will be added to the header */
        tbar:       [],

        /** An array of items that will be added to the leftbar */
        lbar:       [],

        /** An array of items that will be added to the rightbar */
        rbar:       [],
        
        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:      'Window',
        
        /** Change what comes by default in the pane */
        maskHTML:   'Loading <span class="wui-spinner"></span>',

        /** Set a minimum height that the window can be resized to. If this property
        is not, it will default to the declared height of the window, or zero if the 
        declared height is a percentage. */
        //minHeight: undefined,

        /** Set a minimum width that the window can be resized to. If this property
        is not, it will default to the declared width of the window, or zero if the 
        declared width is a percentage. */
        //minWidth: undefined,

        /** Whether or not the user can resize the window */
        resizable:  true,

        /** Whether or not the user can reposition the window */
        draggable:  true,

        /** The left position of the window when it is resized using Wui.Window.resize() or when it firtst appears. */
        windowLeft: null,

        /** The top position of the window when it is resized using Wui.Window.resize() or when it firtst appears. */
        windowTop:  null
    },args);  
    this.init(); 
};
Wui.Window.prototype = $.extend(new Wui.Pane(),{
    init:       function(){
                    var me = this;
                    me.appendTo = $('body');
                    
                    // Make it a modal window & add everything to the DOM
                    if(me.isModal){
                        me.modalEl = $('<div>').addClass('wui-overlay');
                        $('body').append(me.appendTo = me.modalEl.css('z-index',Wui.maxZ()));
                    }
                    
                    // Add close buttons where appropriate
                    me.tbar.push(
                        me.closeBtn = new Wui.Button({ text:'X', name:'window_close' })
                    );
                    if(me.bbar.length === 0) 
                        me.bbar = [new Wui.Button({ text:'Close', name:'window_close' })];
                    
                    // Calls the parent init function
                    Wui.Pane.prototype.init.apply(me,arguments);
                    
                    // Add window specific properties
                    me.windowEl = me.el
                    .addClass('wui-window')
                    .css('z-index',Wui.maxZ())
                    .click(bringToFront);
                    
                    // Add draggable
                    if(me.draggable === true)
                        me.windowEl.drags({
                            handle: me.header.el, 
                            // start:bringToFront
                        });

                    // Add resizable option if the window is resizable
                    if(me.resizable === true)
                        me.windowEl.resizes({
                            // minWidth:   me.minWidth || me.width,
                            // minHeight:  me.minHeight || me.height,
                            // resize:     function(){ me.fireResize(); }
                        });

                    // Put the window on the body
                    me.place();
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    me.onWinOpen(me);
                    me.windowEl.trigger($.Event('open'),[me]);
                    me.resize();

                    function bringToFront(e){
                        var maxZ = Wui.maxZ();
                        if(parseInt((me.el.css('z-index')) || 1) <= maxZ){
                            me.el.css('z-index', maxZ);
                        }
                    }
                },
    resize:     function(resizeWidth, resizeHeight){
                    var me = this;

                    if(Wui.isPercent(resizeWidth))  resizeWidth = Wui.percentToPixels(me.windowEl, resizeWidth, 'width');
                    if(Wui.isPercent(resizeHeight)) resizeHeight = Wui.percentToPixels(me.windowEl, resizeHeight, 'height');

                    var totalHeight = me.container[0].scrollHeight,
                        containerHeight = me.container.height(),
                        headHeight = (me.header && $.isNumeric(me.header.el.outerHeight())) ? me.header.el.outerHeight() : 0,
                        footHeight = (me.footer && $.isNumeric(me.footer.el.outerHeight())) ? me.footer.el.outerHeight() : 0,
                        headersHeight = headHeight + footHeight,
                        useHeight = (arguments.length) ? resizeHeight : (totalHeight + headersHeight >= verge.viewportH()) ? (verge.viewportH() - 10) : 
                                        (containerHeight <= totalHeight && !me.hasOwnProperty('height')) ? totalHeight + headersHeight : 
                                            Wui.isPercent(me.height) ? Wui.percentToPixels(me.windowEl, me.height, 'height') : me.height;

                    // Size and center the window according to arguments passed and sizing relative to the viewport.
                    me.windowEl.css({ height: useHeight, width: (arguments.length) ? resizeWidth : undefined, });
                    var posLeft =   (me.windowLeft) 
                                        ? ($.isNumeric(me.windowLeft) ? me.windowLeft : Wui.percentToPixels($('html'), me.windowLeft, 'width')) 
                                        : Math.floor((verge.viewportW() / 2) - (me.windowEl.width() / 2)),
                        posTop =    (me.windowTop) 
                                        ? ($.isNumeric(me.windowTop) ? me.windowTop : Wui.percentToPixels($('html'), me.windowTop, 'height')) 
                                        : Math.floor((verge.viewportH() / 2) - (useHeight / 2));
                    me.windowEl.css({ top:posTop, left:posLeft });
                    
                    // me.fireResize();
                    return {width:me.windowEl.outerWidth(), height:me.windowEl.outerHeight()};
                },
});


/**
 @event        datachanged    When the data changes (name, data object)
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

The WUI Data Object is for handling data whether remote or local. It will fire 
namespacedevents that can be used by an application, and provides a uniform 
framework for working with data.

If data is remote, Wui.Data is an additional wrapper around the jQuery AJAX method 
and provides for pre-processing data. Data can be pushed and spliced into/out of 
the object and events will be fired accordingly.
*/
Wui.Data = function(args){
    $.extend(this,{
        data:           [],
        
        identity:       null,
        
        name:           null,
        
        params:         {},
        
        url:            null,
        
        waiting:        false,
        
        ajaxConfig:     {},
        
        total:          0
    },args);
};
Wui.Data.prototype = {
    dataContainer:  null,
    totalContainer: null,
    
    dataChanged:    function(){},
    
    dataEach:       function(f){
                        for(var i = 0; i < this.data.length; i++)
                            if(f(this.data[i],i) === false)
                                break;
                        return true;
                    },
    
    loadData:       function(){
                        var me = this,
                            config = $.extend({
                                data:       me.params,
                                dataType:   'json',
                                success:    function(r){ me.success.call(me,r); },
                                error:      function(e){ me.failure.call(me,e); },
                            },me.ajaxConfig);
                        
                        if(!me.waiting){
                            var paramsOkay = me.setParams.apply(me,arguments),
                                beforeLoad = me.beforeLoad.apply(me,arguments);

                            if(paramsOkay !== false && beforeLoad !== false){
                                me.waiting = true;
                                return $.ajax(me.url,config);
                            }
                        }else{
                            me.furtherRequests = arguments;
                        }
                    },

    setParams:      function(params){
                        if(params && typeof params === 'object')
                            $.extend(this.params,params);
                    },
    
    setData:        function(d,t){
                        var me = this;
                        
                        // Event hook for before the data is set
                        me.beforeSet(d);
                        
                        // Set the data
                        me.data = me.processData(d);
                        me.total = ($.isNumeric(t)) ? t : (me.data) ? me.data.length : 0;
                        
                        me.fireDataChanged();
                    },

    fireDataChanged:function(){
                        var me = this, dn = (me.name || 'wui-data');

                        me.dataChanged(me.data);
                        $(document).trigger($.Event('datachanged.' + dn),[dn, me])
                            .trigger($.Event('datachanged'),[dn, me]);
                        me.afterSet(me.data);
                    },
    
    beforeLoad:     function(){},
    
    afterSet:       function(){},
    
    beforeSet:      function(){},
    
    success:        function(r){
                        var me = this;
                        me.waiting = false;

                        if(me.furtherRequests){
                            me.loadData.apply(me,me.furtherRequests);
                            me.furtherRequests = undefined;
                        }else{
                            var unwrapped = Wui.unwrapData.call(me,r);
                            me.onSuccess(r);
                            me.setData(unwrapped.data, unwrapped.total);
                        }
                    },
    
    onSuccess:      function(){},
    
    onFailure:      function(){},
    
    failure:        function(e){
                        this.waiting = false;
                        this.onFailure(e);
                    },
    
    processData:    function(response){ return response; },

    push:           function(){
                        var retVal = Array.prototype.push.apply(this.data,arguments);
                        this.total = this.data.length;
                        this.fireDataChanged();
                        return retVal;
                    },

    splice:         function(){
                        var retVal = Array.prototype.splice.apply(this.data,arguments);
                        this.total = this.data.length;
                        this.fireDataChanged();
                        return retVal;
                    }
};


Wui.Template = function(args){ $.extend(this,args); };
Wui.Template.prototype = {
    template:   null,
    
    data:       null,
    
    make:       function(index){
                    var me = this;
                    if(me.data && me.template){
                        var tplCopy = me.template;
                        
                        if($.isNumeric(index))    $.extend(me.data,{wuiIndex:index});
                        
                        return $(
                            tplCopy
                            // replaces straight values
                            .replace(/\{(\w*)\}/g,function(m,key){return (me.data[key] !== undefined) ? me.data[key] : "";})
                            // accounts for complex expressions
                            .replace(/\{\((.*?)\)\}/g,function(m,fn){
                                var keys = Wui.getKeys(me.data), vals = [], i = 0;
                                
                                // Removes any key values that may start with a number and ruin the engine
                                for(i = keys.length - 1; i >= 0; i--)   if(keys[i].match(/\b\d+/g)) keys.splice(i,1);

                                // fill arrays of keys and their values and make sure they are in the same order
                                for(i = 0; i < keys.length; i++)        vals.push(me.data[keys[i]]);
                                
                                // add the passed in conditional as the body of the function created below
                                keys.push("return " + fn);
                                
                                // create function that will perform the conditional statement
                                var newFn = Function.apply(null,keys);
                                
                                // call the function with the keys as variables in scope
                                return newFn.apply(null,vals);
                            })
                        );
                    }
                    throw new Error('Wui.js - Template engine missing data and/or template.');
                }
};


/** Shows an message in a modal window
@param {string}         msg         A message for the user
@param {[string]}       msgTitle    Title for the window. Default is 'Message'
@param {[function]}     callback    Function to perform when the message window closes - returning false will prevent the window from closing.
@param {[string]}       content     One or more additional Wui objects to place on the window
@return The Wui.Window object of the message window.
@author     Stephen Nielsen
*/
Wui.msg = function(msg, msgTitle, callback, content){
    var cntnt = [new Wui.O({el: $('<div>').addClass('wui-msg').html(msg) })];
    
    if(typeof content !== 'undefined'){
        if(typeof content.push == 'function')   cntnt.push.apply(cntnt,content);
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

/** Shows an error message
@param {string}         errMsg      Message explaining the error
@param {[string]}       msgTitle    Title for the window. Default is 'Error'
@param {[array]}        buttons     Array containing Wui.Button(s) to give additional functionality.
@param {[function]}     callback    Function to perform when the error window closes - returning false will prevent the window from closing.
@return The Wui.Window object of the error message window.
@author     Stephen Nielsen
*/
Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
    var err = Wui.msg(errMsg,msgTitle,callback);
    if($.isArray(buttons))
        err.footer.push.apply(err.footer,buttons);
    err.container.find('.wui-msg').addClass('wui-err');
    err.resize();
    return err;
};

/** Shows an message in a modal window with yes and no buttons. Answers are passed to callback().
The window will not close until an answer is selected.

@param {string}         msg         A message for the user
@param {[string]}       msgTitle    Title for the window. Default is 'Message'
@param {[function]}     callback    Function to perform when the message window closes - returning false will prevent the window from closing.
@param {[string]}       content     An additional Wui object to place on window
@return The Wui.Window object of the confirmation message.
@author     Stephen Nielsen
*/
Wui.confirm = function(msg, msgTitle, callback, content){
    var cw = Wui.msg.apply(this,arguments);
    cw.doAnswer = function(ans){
        if(callback && typeof callback == 'function')    callback(ans);
        cw.answerRun = true;
        cw.close();
    };
    cw.onWinClose= function(){ return ((cw.answerRun !== true) ? false : cw.answerRun); };
    cw.footer.splice(0,1,
        new Wui.Button({text:'No', click:function(){ cw.doAnswer(false); }}),
        new Wui.Button({text:'Yes', click:function(){ cw.doAnswer(true); }})
    );
    cw.header.splice(0,1);
    cw.resize();
    return cw;
};


}(jQuery,this));