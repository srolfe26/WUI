/* 
    Instatiate the WUI code so that two versions of the WUI to exist on a page at the same time
    The WUI, like jQuery, is both a function and a namespace (taking advantage of JS's functions are
    objects nature) so that Wui('some selector') and new Wui.Text() are both valid uses of the word.
*/
var _wuiVar = (function(){
    var wObj,
        members = {
            version:    'wui-lite-1', 
            dict:       []
        },
        /** 
            @param  {object or string}  selector    A selector string (that will be run through jQuery's selector engine, or a jQuery object) 

            Returns the WUI object matching the selector from a dictionary of all WUI objects. 
            This is a way to acquire a WUI object in memory having only a DOM node representation.
        */
        wuiSelector = function (selector){
            var nodes   =   (selector instanceof jQuery) ? 
                                selector : (typeof selector === 'string') ?
                                    $(selector) : [selector],
                matches =   window[_wuiVar].dict.filter(function ( obj ) { 
                                return $.inArray( obj.el, nodes ) > -1; 
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