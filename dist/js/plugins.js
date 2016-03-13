// verge 1.9.1+201402130803
// https://github.com/ryanve/verge
// MIT License 2013 Ryan Van Etten
!function(n,e,t){"undefined"!=typeof module&&module.exports?module.exports=t():n[e]=t()}(this,"verge",function(){{var n={},e="undefined"!=typeof window&&window,t="undefined"!=typeof document&&document,i=t&&t.documentElement,r=e.matchMedia||e.msMatchMedia,u=r?function(n){return!!r.call(e,n).matches}:function(){return!1};n.viewportW=function(){var n=i.clientWidth,t=e.innerWidth;return t>n?t:n},n.viewportH=function(){var n=i.clientHeight,t=e.innerHeight;return t>n?t:n}}return n.mq=u,n.matchMedia=r?function(){return r.apply(e,arguments)}:function(){return{}},n});jQuery.extend(verge);

/*! Wui 1.2.1
 * Copyright (c) 2015 Stephen Rolfe Nielsen (rolfe.nielsen@gmail.com)
 *
 * @license MIT
 * http://www.wui-js.com/wui-1-2-1/license.html
 */ 

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

(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({
            handle:"",
            cursor:"move"
        }, opt);

        var $el = (opt.handle === "") ? this : $(this.find(opt.handle)[0]);

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            var $drag = (opt.handle === "") ? $(this).addClass('draggable') :
                            $(this).addClass('active-handle').parent().addClass('draggable'),
                z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;

            $drag.css('z-index', $.getMaxZ()).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });

            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "")   $(this).removeClass('draggable');
            else                    $(this).removeClass('active-handle').parent().removeClass('draggable');
        });

    };
})(jQuery);

// A simple resizable plugin for jQuery
(function($) {
    $.fn.resizes = function(opt) {
        var $obj = $(this), startX, startY, startWidth, startHeight;

        opt = $.extend({
            anchored:   false,
            minWidth:   0,
            minHeight:  0,
            direction:  'se',
            resizeStart:null,
            duringResize:null,
            afterResize:null
        }, opt);

        var isSE = (opt.direction == 'se'),
            resizeCls = isSE ? 'resize-nub' : 'resize-bar';

        return $obj.css('overflow','visible')
        .mousedown(function(){
            startWidth = $obj.outerWidth();
            startHeight = $obj.outerHeight();
        })
        .append(
            $('<div>').addClass(resizeCls)
            .click(function(evnt){ evnt.stopPropagation(); })
            .mousedown(function(e){
                var startLeft = parseInt($obj.css('left')),
                    startTop = parseInt($obj.css('top'));

                startX = e.clientX;
                startY = e.clientY;

                $obj.addClass('w121-resizing').css({ flex:'', width:$obj.css('width'), height:$obj.css('height') });

                if(typeof opt.resizeStart == 'function')
                    opt.resizeStart($obj);

                $(document).off('mousemove.resizes');
                $(document).on('mousemove.resizes', function(e2){
                    var xDif =      e2.clientX - startX,
                        yDif =      e2.clientY - startY,
                        newWidth =  startWidth + xDif * (opt.anchored ? 1 : 2),
                        newHeight = isSE ? startHeight + yDif * (opt.anchored ? 1 : 2) : $obj.css('height'),
                        startL =    (function(){
                                        if(newWidth < opt.minWidth){
                                            xDif = 0;
                                            newWidth = opt.minWidth;
                                            return parseInt($obj.css('left'));
                                        }else{ return startLeft; }
                                    })(),
                        startT =    (function(){
                                        if(newHeight < opt.minHeight){
                                            yDif = 0;
                                            newHeight = opt.minHeight;
                                            return parseInt($obj.css('top'));
                                        }else{ return startTop; }
                                    })();

                    if(typeof opt.duringResize == 'function')
                        opt.duringResize($obj,newWidth,newHeight);

                    $obj.css({
                        width:  newWidth,
                        height: newHeight,
                        left:   opt.anchored ? parseInt($obj.css('left')) : startL - xDif,
                        top:    opt.anchored ? parseInt($obj.css('top')) : startT - yDif
                    });

                    deselect();
                });
            })
            .mouseup(function(evnt){ mouseUp(); evnt.stopPropagation(); })
        )
        .mouseup(mouseUp); // Additional mouseup for when the user lifts their mouse inside a window

        function mouseUp(){
            var width = $obj.outerWidth(),
                height= $obj.outerHeight();

            $obj.removeClass('w121-resizing');

            if(startWidth != width || startHeight != height){
                $(document).off('mousemove.resizes');
                if(typeof opt.afterResize == 'function')
                    opt.afterResize($obj,width,height);
                deselect();
            }
        }

        function deselect(){
            // Deselect anything the mouse may have selected (if statement for IE)
            if(document.selection)  document.selection.empty();
            else                    window.getSelection().removeAllRanges();
        }
    };
})(jQuery);