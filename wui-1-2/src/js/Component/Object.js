/** The base object from which all other WUI Objects extend. The Wui Object contains some
foundational configs and methods that are key to understanding with WUI at large. Each of these 
methods and configs are found in every reusable object <img src="../img/object.png" width="20" height="20" /> in the WUI.

Each object has an 'el' which represents the HTML object/element that can be added to the DOM. In the case
of the base Wui.O, this element must be defined.

Each object also has a representaion of itself in memory. This object in memory contains an items array.
Although items can be appended to the 'el' without being added to the items array, the items array is meant
to contain all of the child elements of an object.

When a Wui.O is added to another object's items array in memory, its 'el' is appended to the parent object's
'el' on the DOM, as a child DOM node.  This works conversly when removing an item from the items array. The
primary methods for adding/removing items are push(), and splice(); and these are involved in much of the 
manipulation of objects using the WUI. Both push and splice follow in form and function JavaScript's methods of the
same name.

It is important to note that with all WUI objects, there is a distinction between when an object is instantiated
in memory, and when it is actually rendered on the page. Every Wui.O has a event hook called onRender() that can
be defined to do certain things when the object is rendered on the page.


 *  @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
*/
Wui.O = function(args){ $.extend(this,{
    /** Whether the object is hidden on the DOM */
    hidden:         false

    /** If id has a value, the HTML attribute id will be set on the element. */
    //id:           undefined,

    /** If name has a value, the HTML attribute name will be set on the element. 
    This is useful for naming objects for listeners. 

    Adding the name property to an object will fire a namespaced event as well as the generic
    event. Listeners for these events follow the convention: [eventname].[name]. These listeners
    can be turned on and off using the jQuery .on() and .off() methods. */
    //name:         undefined,

    /** This item can contain a space separated list of classes that will be applied
    to the element of the object. Additional classes may be added by the object itself. This
    is useful for adding additional styling to objects. */
    //cls:          undefined,

    /** The fit dimension determines whether objects contained within it are fit
    horizontally or vertically. Possible values are 'width' (= horizontal fitting) 
    or 'height' (= vertical fitting). */
    //fitDimension: 'width',

    /** tabIndex is used to give an item the ability to be tabbed to, and to order that tabbing. 
    A -1 in this value will make the element un-tabbable. */
    //tabIndex:     undefined,
},args); };
Wui.O.prototype = {
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
                    var target     = (obj.appendTo !== undefined) ? obj.appendTo :
                                    (obj.prependTo !== undefined) ? obj.prependTo :
                                        (tgt !== undefined && tgt !== null) ? tgt : 
                                            (obj.parent !== undefined && obj.parent.elAlias !== undefined) ? obj.parent.elAlias :
                                                (obj.parent !== undefined && obj.parent.el !== undefined) ? obj.parent.el : $('body'),
                        action     = (obj.appendTo !== undefined) ? 'append' : (obj.prependTo !== undefined) ? 'prepend' : (act !== undefined && target[act]) ? act : 'append';
                    
                    // Try appending with WUI modifiers, else just append in good ol' jQuery fashion
                    try{
                      $(target)[action](obj.el);
                    }catch(e){
                        try{
                          $(target)[action](obj);
                        }catch(e){}
                    }
                    
                    // Add styles
                    this.cssByParam(obj);
                    if(this.afterRender) this.afterRender();
                    
                    return true;
                },

    afterRender:function(){
                    this.each(function(itm){ if(itm.afterRender) itm.afterRender(); });
                },

    /**
    @param {object}    item    A jQuery object to be added
    Appends item to the WUI Object's 'elAlias' or 'el', whichever is defined.
    */
    append:     function(obj){
                    var me = this, el = me.elAlias || me.el;
                    $.each(arguments,function(i,itm){
                        el.append(itm);
                    });
                },


    /** Removes only the DOM items from the WUI Object's 'elAlias' or 'el', whichever is defined. */
    clear:      function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },
    /**
    Gets called when a WUI Object is placed and gets called on all of a placed object's items.
    Calls onRender() if it exists on the object, calls its children's callRender(), calls its own 
    afterRender() if it exists, and finally layoutKids() which does layout on child elements.
    */
    callRender: function(){
                    var me = this;
                    
                    if(me.onRender)  me.onRender();         // Perform render for this
                    
                    // Perform rendering for child elements
                    me.each(function(itm){ if(itm.callRender) itm.callRender(); });
                    
                    if(me.afterRender)  me.afterRender();   // Performs afterrender if it exists

                    me.layoutKids();                        // Handles fit and layout for child elements
                },
    
    /**
    @param {string}         name    Name of the HMTL attribute to set
    @param {string|number}     val        Value of the given attribute
    
    @return True if the val parameter is a valid string or number, else false.
    
    Tests whether the passed in value is valid, then uses the jQuery .attr method to apply an attribute to the el of the WUI object.
    */
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

    /**
    @param {object} item    A WUI Object, or if undefined, the object that this method is a member of.
    
    @return    The object's el if it has one, or just the object
    
    Adds HTML properties like CSS class, attributes, and sets height and width as either absolute values
    or percentages of their parent.
    */
    cssByParam: function(m) { 
                    m = m || this;
                    
                    if(m.el && m.el.addClass){
                        if(m.argsByParam)
                            m.argsByParam();
                        
                        // Add attributes if defined
                        try{ if(m.attr && typeof m.attr == 'object') m.el.attr(m.attr); }catch(e){ }
                        
                        // calculate dimensions
                        if($.isNumeric(m.height) && m.height >= 0)      m.el.css({height: m.height});
                        if($.isNumeric(m.width) && m.width >= 0)        m.el.css({width: m.width});

                        // calculate percentage based dimensions
                        if(Wui.isPercent(m.width)){
                            a = Wui.percentToPixels(m.el,m.width,'width');
                            if(a != 0) m.el.css({width:a});
                        }
                        if(Wui.isPercent(m.height)){
                            a = Wui.percentToPixels(m.el,m.height,'height');
                            if(a != 0) m.el.css({height:a});
                        }
                        
                        // hide an object based on its hidden value
                        if(m.hidden) m.el.css('display','none');
                        
                        return m.el.addClass(m.cls);
                    }else{
                        return m;
                    }
                },
    /**
    @param {function}   fn          Function that gets called for each item of the object.
    @param {boolean}    [ascending] Whether the loop happens in ascending or descending order. Defaults to true.
    
    @return true
    Loops through each of the objects items. The passed in function gets 
    called with two parameters the item, and the item's index.
    */
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
    /**
    @param {number}     [speed]     Time in milliseconds for the hiding element to fade out.
    @param {function}   [callback]  A function that gets called at the end of the fadeout/hide.
    
    @return The el or elAlias of the object being hidden
    Hides an object with the options of an animated fadeout and callback function
    */
    hide:       function(){ 
                    var args = ['fadeOut'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = true;
                    return this.showHide.apply(this,args);
                },

    /**
    @return A number where the object is positioned.
    Returns the index of the item within the object's parent.items array. If the object has no parent, it returns undefined.
    This function is DIFFERENT from jQuery's index() function which provides a DOM elements position within its parent node.
    */
    index:       function(){ 
                    var me = this, myPosition = undefined;
                    if(me.parent){
                        // Get my position within the parental array
                        me.parent.each(function(itm,idx){ if(itm === me) myPosition = idx; });
                    }
                    return myPosition;
                },

    /**
    @param  {function}   afterLayout A function to run after the layout has occurred.
    Runs cssByParam and Wui.fit() on itself and its children.  Similar to callRender(),
    but without the rendering of objects - useful to resize things that are already rendered.
    */
    layout:     function(afterLayout){
                    this.cssByParam(this);  // run css styles
                    this.layoutKids();      // run fit and layout on children

                    // Performs actions passed in as parameters
                    if(afterLayout && typeof afterLayout === 'function')    afterLayout();
                },

    /** A function to run layout on just the objects children without calling cssByParam. */
    layoutKids: function(){
                    var me = this, needFit = false;

                    // Perform Wui.fit on items that need it
                    me.each(function(itm){ if(itm.fit){ 
                        needFit = true; return false;
                    }});
                        
                    if(me.fitDimension || needFit)
                        Wui.fit(me.items, (me.fitDimension || undefined));
                        
                    // Perform layout for child elements
                    me.each(function(itm){ if(itm.layout) itm.layout(); });
                },

    /**
    @param {numeric}    position    Position to move the item to

    Moves the item within the items array it is a member of. If not a member 
    of an items array, this does nothing.
    */
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

    /**
    @param {function} [after]    A function to be called after an object has been placed
    @return The object that was placed 
    Adds the elements of any child objects to itself, then puts its own el on the DOM by 
    calling addToDOM.  Then executes the 'after' function if provided, then runs the 
    callRender() function to perform rendering, fit, and any other listners on itself and
    its children.
    */
    place:      function(after){
                    var me = this;
                    
                    //adds the objects items if any
                    if(me.items === undefined) me.items = [];
                    me.each(function(itm){ 
                        itm.parent = me;
                        if(itm.place)    itm.place();
                        else             me.addToDOM(itm);
                    });
                    
                    //adds the object to the DOM and starts the recursive callRender to render properties on the children
                    me.addToDOM(me);
                    
                    // perform operations on the object after its placed on the DOM but before onRender
                    if(after && typeof after == 'function')    after(me);
                    
                    // run through a parent object and all of its children to run onRender
                    if(me.parent === undefined) me.callRender();
                    
                    return me;
                },
    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Adds passed in items to the end of the items array and adds those objects to the DOM.
    */
    push:       function(){
                    var me = this;
                    
                    if(me.items === undefined) me.items = [];
                    
                    $.each(arguments,function(i,arg){
                        arg.parent = me;
                        if(arg.place)   arg.place();
                        else            me.addToDOM(arg);

                        if(arg.onRender)    arg.onRender();
                        if(arg.layout)      arg.layout();
                    });

                    return Array.prototype.push.apply(me.items,arguments);
                },
    /**
    Removes the object from its parent's items array (if attached to a parent Wui object) and
    removes its el from the DOM. Then deletes the object from memory.
    */
    remove:     function(){
                    var me = this, spliceVal = null;
                    if(me.parent){
                        me.parent.each(function(itm,idx){ if(itm === me) spliceVal = idx;}, false);
                        if(spliceVal !== null)
                            me.parent.splice(spliceVal,1);
                    }
                    this.el.remove();
                    delete this;
                },
    /**
    @param {number} [speed] Time in milliseconds for the showing element to fade in
    @param {function} [callback] A function that gets called at the end of the fadein/show
    @return The el or elAlias of the object being shown
    Shows an object with the options of an animated fadein and callback function
    */
    show:       function(){ 
                    var args = ['fadeIn'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = false;
                    return this.showHide.apply(this,args);
                },
    /**
    @param {string} fn The name of the jQuery method for showing or hiding
    @param {number} [speed] Time in milliseconds for the showing/hiding element to fade in
    @param {function} [callback] A function that gets called at the end of the show/hide
    @return The el or elAlias of the object being shown/hidden
    This is an internal function used by show() and hide(). Fn is required, but speed and callback
    are optional and their order is interchangeable.
    */
    showHide:   function(fn,speed,callback){
                     speed = (typeof speed == 'number') ? speed : 1;
                     if(typeof arguments[1] == 'function') callback = arguments[0];
                     return this.el[fn](speed, callback);
                },
    /**
    @param {number} index The point in the array to start
    @param {number} howMany The number of items to remove
    @param {object} [obj,...] Additional WUI Objects can be passed as parameters and will be inserted at the index
    
    @return An array of the objects removed, if any
    
    Follows the convention of JavaScript's Array.prototype.splice on the object's items array. Items
    spliced into the array will be spliced in position on the DOM as well. Removed items are removed
    from the DOM.
    */
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
                    if(me.items.length == numAdded){                      //items ended up replacing the array
                        for(i = 0; i < me.items.length; i++)          { me.addToDOM(me.items[i],el); callProcessors(me.items[i]); }
                    }else if(me.items[(idx + numAdded)] === undefined){    //meaning the new items were inserted at the end of the array
                        for(i = idx; i < me.items.length; i++)        { me.addToDOM(me.items[i],me.items[i-1].el,'after'); callProcessors(me.items[i]); }
                    }else if (numAdded !== 0){                             //items at the beginning/middle of the array
                        for(i = (idx + numAdded); i > 0; i--)         { me.addToDOM(me.items[i-1],me.items[i].el,'before'); callProcessors(me.items[i-1]); }
                    }

                    function callProcessors(arg){
                        arg.parent = me;
                        if(arg.onRender)    arg.onRender();
                        if(arg.layout)      arg.layout();
                    }
                    
                    return retVal;
                }
};