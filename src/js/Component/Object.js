(function($,Wui) {
    
// Base WUI Object
Wui.O = function(args) { 
    $.extend(this, {
        afterRendered:  false,
        hidden:         false,
        items:          [],
        rendered:       false
    }, args); 
};

Wui.O.prototype = {
    addToDOM:   function(obj, tgt, act){
                    // Take the target and action from the passed object first if defined, then default to passed arguments, 
                    // then to a default of $('body') and 'append'
                    var target  = (obj.appendTo && typeof obj.appendTo !== 'function') ? obj.appendTo :
                                    (obj.prependTo && typeof obj.prependTo !== 'function') ? obj.prependTo :
                                        (tgt) ? tgt : 
                                            (obj.parent && typeof obj.parent.elAlias != 'undefined') ? obj.parent.elAlias :
                                                (obj.parent && typeof obj.parent.el != 'undefined') ? obj.parent.el : $('body'),
                        action = (obj.appendTo && typeof obj.appendTo !== 'function') ? 'append' : 
                                    (obj.prependTo && typeof obj.prependTo !== 'function') ? 'prepend' : 
                                        (typeof act != 'undefined' && target[act]) ? act : 'append';

                    // Try appending with WUI modifiers, else just append in good ol' jQuery fashion                      
                    try{
                      if(typeof obj.el !== 'undefined') $(target)[action](obj.el);
                      else                              $(target)[action](obj);
                    }catch(e){}

                    if(obj.cssByParam)
                        obj.cssByParam();
                    
                    return obj;
                },

    afterRender:function(){ this.afterRendered = true; },

    append:     function(){
                    var el =    (this.elAlias || this.el),
                        args =  (function(args) {
                                    var retVal = [];

                                    Array.prototype.forEach.call(args,function(itm){
                                        retVal.push( itm.el || itm );
                                    });

                                    return retVal;
                                })(arguments);

                    el.append.apply(el, args);
                },

    argsByParam:function(altAttr, altTarget){
                    var me = this,
                        applyAttr = {},
                        applyAltAttr = {},
                        attrs = ['id', 'name', 'tabindex', 'lang', 'title'],
                        wuiAttrs = ['id', 'name', 'tabIndex', 'lang', 'titleAttr'];

                    attrs.forEach(function(atr,idx){
                        var attrVal = me[wuiAttrs[idx]];

                        if((typeof attrVal == 'string' || typeof attrVal == 'number')){
                            if(altTarget && altAttr instanceof Array){
                                if(atr == 'id' && $.inArray(atr,altAttr) > -1){
                                    applyAltAttr[atr] = attrVal;
                                }else{
                                    applyAttr[atr] = attrVal;
                                    if($.inArray(atr,altAttr) > -1) applyAltAttr[atr] = attrVal;
                                }
                            }else{
                                applyAttr[atr] = attrVal;
                            }
                        }
                            
                    });

                    $(me.el).attr(applyAttr);

                    if(altTarget)
                        altTarget.attr(applyAltAttr);
                },

    clear:      function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },

    cssByParam: function(returnObj){
                    var me = this, el = me.el, a, cssParamObj = {};

                    me.argsByParam();

                    // Layout items
                    if(typeof me.parent === 'undefined') me.layout();

                    // Add attributes if defined
                    try{ if(me.attr && typeof me.attr == 'object')  el.attr(me.attr); }catch(e){ }
                        
                    // calculate dimensions
                    if($.isNumeric(me.height) && me.height >= 0)    $.extend(cssParamObj,{height: me.height});
                    if($.isNumeric(me.width) && me.width >= 0)      $.extend(cssParamObj,{width: me.width, flex:'none'});

                    // calculate percentage based dimensions
                    if(Wui.isPercent(me.width)){
                        a = Wui.percentToPixels(el,me.width,'width');
                        if(a !== 0) $.extend(cssParamObj,{width:a, flex:'none'});
                    }
                    if(Wui.isPercent(me.height)){
                        a = Wui.percentToPixels(el,me.height,'height');
                        if(a !== 0) $.extend(cssParamObj,{height:a});
                    }
                    
                    // hide an object based on its hidden value
                    if(me.hidden) $.extend(cssParamObj,'display','none');

                    if(returnObj === true)  return cssParamObj;
                    else                    return ( ($.isEmptyObject(cssParamObj)) ? el.addClass(me.cls) : el.addClass(me.cls).css(cssParamObj) );
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

    hide:       function(){ 
                    this.el.css('display','none');
                    if(typeof arguments[1] == 'function')
                        arguments[1]();

                    return this.el;
                },

    index:       function(){ 
                    var me = this, myPosition;
                    if(me.parent){
                        // Get my position within the parental array
                        me.parent.each(function(itm,idx){ if(itm === me) myPosition = idx; });
                    }
                    return myPosition;
                },

    init:       function(){ 
                    var me = this;
                    
                    if( 
                        typeof me.el !== 'undefined' && 
                        me.el[0] && 
                        Wui.dict.filter(function ( obj ) { 
                            return obj.el === me.el[0]; 
                        })[0] === undefined
                    ) {
                        Wui.dict.push({
                            itm:    me, 
                            el:     me.el[0]
                        });
                    }

                    me.items = (me.items !== undefined) ? me.items : []; 
                },

    layout:     function(afterLayout){
                    var me = this, needFit = false, i = 0;

                    if(!me.rendered)       me.onRender();

                    // Perform Wui.fit on items that need it
                    for(i; i < me.items.length; i++) { 
                        if(me.items[i].fit)     needFit = true;
                        if(me.items[i].layout)  me.items[i].layout();
                    }
                    
                    if(me.items.length && (me.fitDimension || needFit))
                        Wui.fit(me.items, (me.fitDimension || undefined));

                    if(!me.afterRendered)    me.afterRender();
                    
                    // Performs actions passed in as parameters
                    if(typeof afterLayout === 'function')
                        afterLayout();
                },

    onRender:   function(){ 
                    if(this.rendered !== true){
                        if(this.items === undefined) 
                            this.items = [];

                        this.items.forEach(function(itm){ 
                            if(itm.onRender) window.setTimeout(function(){ itm.onRender(); },0);
                        });
                    }
                    
                    this.rendered = true; 
                },

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

    remove:     function(){
                    if(this.parent) this.parent.splice(this.index(),1);
                    else            this.el.remove();
                },

    show:       function(){ 
                    this.el.show();
                    if(typeof arguments[1] == 'function')
                        arguments[1]();
                    return this.el;
                },

    splice:     function(idx, howMany){
                    var me = this,
                        el = me.elAlias || me.el;
                        idx = parseInt(idx);
                    
                    // remove specified elements
                    for(var i = idx; i < (idx + howMany); i++)
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

})(jQuery,window[_wuiVar]);
