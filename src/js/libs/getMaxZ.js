(function($) {
    $.getMaxZ = function(){
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
})(jQuery);