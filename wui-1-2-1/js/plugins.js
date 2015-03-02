// verge 1.9.1+201402130803
// https://github.com/ryanve/verge
// MIT License 2013 Ryan Van Etten
!function(n,e,t){"undefined"!=typeof module&&module.exports?module.exports=t():n[e]=t()}(this,"verge",function(){{var n={},e="undefined"!=typeof window&&window,t="undefined"!=typeof document&&document,i=t&&t.documentElement,r=e.matchMedia||e.msMatchMedia,u=r?function(n){return!!r.call(e,n).matches}:function(){return!1};n.viewportW=function(){var n=i.clientWidth,t=e.innerWidth;return t>n?t:n},n.viewportH=function(){var n=i.clientHeight,t=e.innerHeight;return t>n?t:n}}return n.mq=u,n.matchMedia=r?function(){return r.apply(e,arguments)}:function(){return{}},n});jQuery.extend(verge);

// Drags and Resizes jQuery Plugins, Copyright Stephen Nielsen 2014
!function(e){e.getMaxZ=function(){var t=e("body *"),n=t.length<2500?t:e('body > *, [style*="z-index"]'),s=Math.max.apply(null,e.map(n,function(t){return"static"!=e(t).css("position")?parseInt(e(t).css("z-index"))||0:void 0}));return(e.isNumeric(s)?s:0)+1}}(jQuery),function(e){e.fn.drags=function(t){t=e.extend({handle:"",cursor:"move"},t);var n=""===t.handle?this:e(this.find(t.handle)[0]);return n.css("cursor",t.cursor).on("mousedown",function(n){var s=""===t.handle?e(this).addClass("draggable"):e(this).addClass("active-handle").parent().addClass("draggable"),i=s.css("z-index"),o=s.outerHeight(),r=s.outerWidth(),a=s.offset().top+o-n.pageY,u=s.offset().left+r-n.pageX;s.css("z-index",e.getMaxZ()).parents().on("mousemove",function(t){e(".draggable").offset({top:t.pageY+a-o,left:t.pageX+u-r}).on("mouseup",function(){e(this).removeClass("draggable").css("z-index",i)})}),n.preventDefault()}).on("mouseup",function(){""===t.handle?e(this).removeClass("draggable"):e(this).removeClass("active-handle").parent().removeClass("draggable")})}}(jQuery),function(e){e.fn.resizes=function(t){function n(){var n=u.outerWidth(),i=u.outerHeight();u.removeClass("w121-resizing"),(r!=n||a!=i)&&(e(document).off("mousemove.resizes"),"function"==typeof t.afterResize&&t.afterResize(u,n,i),s())}function s(){document.selection?document.selection.empty():window.getSelection().removeAllRanges()}var i,o,r,a,u=e(this);t=e.extend({anchored:!1,minWidth:0,minHeight:0,direction:"se",resizeStart:null,duringResize:null,afterResize:null},t);var c="se"==t.direction,d=c?"resize-nub":"resize-bar";return u.css("overflow","visible").mousedown(function(){r=u.outerWidth(),a=u.outerHeight()}).append(e("<div>").addClass(d).click(function(e){e.stopPropagation()}).mousedown(function(n){var d=parseInt(u.css("left")),l=parseInt(u.css("top"));i=n.clientX,o=n.clientY,u.addClass("w121-resizing").css({flex:"",width:u.css("width"),height:u.css("height")}),"function"==typeof t.resizeStart&&t.resizeStart(u),e(document).off("mousemove.resizes"),e(document).on("mousemove.resizes",function(e){var n=e.clientX-i,f=e.clientY-o,h=r+n*(t.anchored?1:2),g=c?a+f*(t.anchored?1:2):u.css("height"),p=function(){return h<t.minWidth?(n=0,h=t.minWidth,parseInt(u.css("left"))):d}(),m=function(){return g<t.minHeight?(f=0,g=t.minHeight,parseInt(u.css("top"))):l}();"function"==typeof t.duringResize&&t.duringResize(u,h,g),u.css({width:h,height:g,left:t.anchored?parseInt(u.css("left")):p-n,top:t.anchored?parseInt(u.css("top")):m-f}),s()})}).mouseup(function(e){n(),e.stopPropagation()})).mouseup(n)}}(jQuery);