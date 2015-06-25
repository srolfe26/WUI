/* 
    Instatiate the WUI code so that two versions of the WUI to exist on a page at the same time
    The WUI, like jQuery, is both a function and a namespace (taking advantage of JS's functions are
    objects nature) so that Wui('some selector') and new Wui.Text() are both valid uses of the word.
*/
var _wuiVar = (function(){
    var wObj,
        members = {
            version:    'wui-lite', 
            dict:       []
        },
        /** 
            @param  {object or string}  selector    IN: A selector string (that will be run through jQuery's selector 
                                                    engine to produce a jQuery object), or a jQuery object, or a DOM node.

            Returns zero or more WUI objects matching one or more DOM nodes passed in (or selected by the passed in selector). 
            This is a way to acquire a WUI object in memory having only a DOM node representation.
        */
        wuiSelector = function (selector){
            var nodes   =   (selector instanceof jQuery) ? 
                                selector : (typeof selector === 'string') ?
                                    $(selector) : [selector],
                matches =   window[_wuiVar].dict.filter(function ( obj ) { 
                                return $.inArray( obj.n, nodes ) > -1; 
                            }),
                retVal  =   (function(m){
                                var justItms = [];
                                
                                m.forEach(function( obj ){ justItms.push(obj.itm); });

                                return justItms;
                            })(matches);

            return retVal;
        };

    wObj = (typeof Wui === 'undefined') ? 'Wui' : '_w';
    window[wObj] = wuiSelector;
    $.extend( window[wObj], members );

    return wObj;
})();


(function($,_w) {

// Extend the WUI with Underscore.js to provide its functionality but to not force the developer to know what framework
// a method resides within. Resolve a potential name conflict between the WUI and Underscore version name.
$.extend(_w,_);
_w.underscoreVer = _w.VERSION;
delete _w.VERSION;

/**
    The basic WUI Object consists of an 'n' that represents a DOM node, and an items array that will represent the
    object's children in memory. Children are added through push() and splice() methods that will add/remove objects
    from both the items array and the DOM.

    Wui.Obj has an init method in its prototype that is never called, but expected to be called by inherited objects
    and run by their init method upon construction.
*/
_w.Obj = function(args){ 
    $.extend(this, {
        n:          $('<div>'),
        items:      []
    },args);
};
_w.Obj.prototype = {
    /**
        @param {object}    object    A WUI or jQuery object to be added to the DOM
        @param {object}    target    An item already on the DOM that the action will be performed on the object relative to
        @param {string}    action    The jQuery DOM manipulation method
        
        @return true
        
        Adds an object to the DOM and applies any CSS styles defined for the object by calling 
        cssByParam() if its a WUI object.
        
        If the object has a 'appendTo' or 'prependTo' config, target and action will be ignored whether 
        passed in or not, if target is defined it will then be used, if target is not defined, and 
        'appendTo' and 'prependTo' are not defined, the objects 'parent' will be used for appending. If 
        the object has no parent, it will be appended to the body.
        
        If the object has a 'appendTo' or 'prependTo' config, that action will be used, otherwise the
        passed in action is used if defined, otherwise uses 'append'.
    */
    addToDOM:   function(obj, tgt, act){
                    // Take the target and action from the passed object first if defined, then default to passed arguments, 
                    // then to a default of $('body') and 'append'
                    var target  = (obj.appendTo && typeof obj.appendTo !== 'function') ? obj.appendTo :
                                    (obj.prependTo && typeof obj.prependTo !== 'function') ? obj.prependTo :
                                        (tgt) ? tgt : 
                                            (obj.parent && typeof obj.parent.nAlias != 'undefined') ? obj.parent.nAlias :
                                                (obj.parent && typeof obj.parent.n != 'undefined') ? obj.parent.n : $('body'),
                        action = (obj.appendTo && typeof obj.appendTo !== 'function') ? 'append' : 
                                    (obj.prependTo && typeof obj.prependTo !== 'function') ? 'prepend' : 
                                        (typeof act != 'undefined' && target[act]) ? act : 'append';

                    // Try appending with WUI modifiers, else just append in good ol' jQuery fashion                      
                    try{
                      if(typeof obj.n !== 'undefined') $(target)[action](obj.n);
                      else                              $(target)[action](obj);
                    }catch(e){}

                    if(obj.cssByParam)
                        obj.cssByParam();
                    
                    return obj;
                },

    /** 
        Init method on Wui.Obj is never called, but expected to be called by inherited objects
        and run by their init method upon construction. This method will add an object to the Wui.dict
        dictionary so that it can be looked up by its DOM node 'n'. It also ensures that the object
        has an items array, setting it to an empty array if one is not present.
    */
    init:       function(){ 
                    var me = this;
                    
                    if( _w.filter(_w.dict, function (obj) { return obj.n === me.n[0];  }).length === 0 ) {
                        console.log(_w.dict.push({
                            itm:    me, 
                            n:      me.n[0]
                        }));
                    }

                    me.items = (me.items !== undefined) ? me.items : []; 
                },

    /**
        @param  {function} [after]    A function to be called after an object has been placed
        @return The object that was placed 

        Adds the DOM node of any child objects to itself, then puts itself on the DOM by 
        calling addToDOM.  Then executes the 'after' function if provided.
    */
    place:      function(after){
                    var me = this, retVal;

                    me.items.forEach(function(itm){ 
                        itm.parent = me;
                        if(itm.place)    itm.place();
                        else             me.addToDOM(itm);
                    });
                    
                    // Puts the object on the DOM
                    retVal = me.addToDOM(me);

                    // perform operations on the object after its placed on the DOM but before onRender
                    if(after && typeof after == 'function')    after(me);

                    return retVal;
                },

    /**
        @param {object} [obj,...] One or more objects to be added to the end of the object's items array
        @return The new length of the array 

        Performs exactly like native Javascript's Array.prototype.push() [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push],
        but will additionally place an object's DOM node on the DOM.
    */
    push:       function(){
                    var me = this;
                    
                    Array.prototype.forEach.call(arguments,function(arg){
                        arg.parent = me;

                        if(arg.place)   arg.place();
                        else            me.addToDOM(arg);

                        if(arg.layout)  arg.layout();
                    });

                    return Array.prototype.push.apply(me.items,arguments);
                },

    /**
        @param  {number}    idx         The point in the array to start
        @param  {number}    remove      The number of items to remove
        @param  {object}    [obj,...]   Additional WUI Objects can be passed as parameters and will be inserted at the index
        @return An array of the objects removed, if any
        
        Follows the convention of JavaScript's Array.prototype.splice() [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice] 
        on the object's items array. Items spliced into the array will be spliced in position on the DOM as well. Removed items are removed from the DOM.
    */
    splice:     function(idx, remove){
                    var me = this,
                        el = me.elAlias || me.el;
                        idx = parseInt(idx);
                    
                    // remove specified elements
                    for(var i = idx; i < (idx + remove); i++)
                        if(me.items[i])
                            (me.items[i].el || me.items[i]).remove();
                    
                    //standard splice functionality on array and calcs
                    var onEnd       =   idx >= me.items.length,
                        retVal      =   Array.prototype.splice.apply(me.items, arguments),
                        addedItms   =   (function(args){
                                            var added = [];

                                            for(var i = 2; i < args.length; i++)
                                                added.push(args[i]);

                                            return added;
                                        })(arguments),
                        after       =   (idx !== 0 && !onEnd) ? me.items[idx -1].el || me.items[idx -1] : undefined;

                    addedItms.forEach(function(itm){
                        itm.parent = me;

                        // Append differently depending on position in the splice
                        if( idx === 0 && after === undefined ){
                            me.addToDOM( itm, el, 'prepend' );
                            after = itm.el || itm;
                        }else if( onEnd ){
                            me.addToDOM( itm, el, 'append' );
                        }else{
                            me.addToDOM( itm, after, 'after' );
                            after = itm.el || itm;
                        }

                        if(itm.layout)  itm.layout();
                    });

                    return retVal;
                }
};

/**
    @author     Stephen Nielsen (rolfe.nielsen@gmail.com)

    The WUI Panel is a minimally containing a scrollable content area. It may also have a header, footer, and title.
    The Panel by default has a 5px border. This border, as well as attributes of color and the properties of
    the header, footer, and content area can be adjusted via the following styles:

    - wlt-panel
    - wlt-header
    - wlt-content
    - wlt-toolbar

    The header and footer are Wui Objects with their own array of items and methods to add and remove
    items. When items are added to the footer it will be added to the panel, and when items are removed
    to the point it becomes empty, it will be removed and the content area will be resized accordingly.
    The header will also be added/removed from the panel as objects are added/removed, with the exception
    that if a title is set on the panel (any value besides null), then the header will remain until the 
    title is cleared.

    The content area of the panel is not a Wui object, but is the area where the items of the panel are
    added to and removed from. The content area is the node alias 'nAlias' for the panel, and when items
    are spliced or pushed on the window, they will appear in this space.

    The title of the panel can be set as a config, as well as modified via the setTitle method.

    A Wui.Panel is the base object for the Wui.Window and the above applies to windows as well.
*/
_w.Panel = function(args){ 
    $.extend(this, {
        header:     ['title'],
        border:     true,
        disabled:   false,
        footer:     [],
        title:      null,
        titleAlign: 'left'
    },args);

    this.init();
};
_w.Panel.prototype = new Wui.Obj({
    init:           function(){ 
                        var me = this, n = me.n = me.surePane = $('<div>').addClass('wlt-panel');
                        
                        _w.Obj.prototype.init.call(me);

                        if(!me.border)      
                                n.addClass('no-border');

                        if(me.title !== null)
                            me.setTitle(me.title);

                        // Add the header before the content so that tabbing between buttons/items in the header
                        // and footer is logically top > bottom, left > right
                        me.header = makeBar('header',{items: me.header});
                        configBar('header');

                        n.append( me.nAlias = me.container = $('<div>').addClass('wlt-content') );

                        me.footer = makeBar('footer',{items: me.footer});
                        configBar('footer');

                        // If the pane is disabled then it disables it
                        if(me.disabled) me.disable();

                        function makeBar(bar,args){
                            return new Wui.Obj($.extend({
                                el:         $('<div>'),
                                cls:        'wlt-' + bar + ' wlt-toolbar',
                                parent:     me,
                                appendTo:   me.n,
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
                            var hasBar =    me.surePane.hasClass(bar),
                                hasItems =  (function(){
                                                var barItemNum = 0;

                                                me[bar].items.forEach(function(itm){
                                                    if(itm instanceof Wui.Obj)
                                                        barItemNum++;
                                                });

                                                return barItemNum > 0;
                                            })();

                            if(!hasBar && hasItems){
                                me.surePane.addClass(bar);
                                thisBar.place();
                            }else if (hasBar && !hasItems){
                                me.surePane.removeClass(bar);
                                thisBar.n.remove();
                            }
                        }
                    },
    setTitle:       function(t){ 
                        var me = this,
                            hasEl = (typeof me.titleN !== 'undefined');

                        me.title = t = (t && typeof t == 'string') ? t : null;

                        if(t !== null){
                            if(!hasEl)
                                me.n.prepend( me.titleN = $('<div class="wlt-title">') );

                            me.n.addClass('title');
                            me.setTitleAlign();
                            me.titleN.html(t);
                        }else if(hasEl){
                            me.n.removeClass('title');
                            me.titleN.remove();
                            me.titleN = undefined;
                        }

                        return t;
                    },
    setTitleAlign:  function(ta){ 
                        var me = this;
                        
                        me.titleAlign = ta || me.titleAlign;
                        if(typeof me.titleN !== 'undefined')
                            me.titleN.removeClass('right left center').addClass(me.titleAlign);
                    }
});


}(jQuery,window[_wuiVar]));