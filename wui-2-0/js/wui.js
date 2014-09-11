var Wui = Wui || {};

/**
    Determines whether a value is a percent string.
    @return True if there is a string passed in containing a '%', else false.
*/
Wui.isPercent = function(){
    return (arguments[0] && arguments[0].indexOf && arguments[0].indexOf('%') != -1);
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
        parentSize = (useWindow) ? ((dim == 'height') ? $.viewportH() : $.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
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
            break;
        default:
            return prefixes[n-2] + prop;
    }
};

// Wui Window
Wui.Window = function(summary){
    summary[0].added.forEach(function(win,idx,arr){
        var $win = $(win), attr = win.dataset;
        
        if(attr.isModal){
            var overlay = $('<div>').addClass('wui-overlay');
            $win.wrap(overlay);
            $win.parent().siblings().css('filter','url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZmlsdGVyIGlkPSJhIj4KICAgICAgICA8ZmVNb3JwaG9sb2d5IG9wZXJhdG9yPSJkaWxhdGUiIHJhZGl1cz0iMiIvPgogICAgPC9maWx0ZXI+Cjwvc3ZnPg==#a")');
        }

        if(attr.draggable){
            $win.drags({handle:'header'});
        }

        if($.isNumeric(attr.width)){
            $win.width(attr.width);
        }

        if($.isNumeric(attr.height)){
            $win.height(attr.height);
        }

        if(attr.resizable){
            $win.resizes();
        }

        if($win.children('footer').length === 0){
            $win.css('padding-bottom',0);
        }

        if($win.children('header').length === 0){
            $win.css('padding-top',0);
        }
    });
}

// Wui Pane
Wui.Pane = function(summary){
    summary[0].added.forEach(function(pane,idx,arr){
        var $pane = $(pane), attr = pane.dataset;

        if($pane.children('footer').length === 0){
            $pane.css('padding-bottom',0);
        }

        if($pane.children('header').length === 0){
            $pane.css('padding-top',0);
        }
    });
}

// Observe any windows that get loaded on the page
observerSummary = new MutationSummary({ 
    callback:   Wui.Window, 
    queries:    [{ element: '.wui-window' }]
});

// Observe any panes that get loaded on the page
observerSummary = new MutationSummary({ 
    callback:   Wui.Pane, 
    queries:    [{ element: '.wui-pane' }]
});