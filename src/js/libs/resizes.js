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