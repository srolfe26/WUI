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