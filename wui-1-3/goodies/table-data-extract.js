// Extract data from a table with headers
function tableMonster(tableSelector){
    var cols = [],
        rows = [];
    
    $(tableSelector).each(function(){
        var tbl = $(this);
        
        tbl.find('th').each(function(){
            var col = $(this), txt = $.trim(col.text());
            cols.push({
                heading:    txt,
                fit:        parseInt(col.css('width')) / parseInt(col.parent().css('width')),
                dataItem:   txt.replace(/[^\w]+/g,'_').toLowerCase()
            })
        });
        
        tbl.children('tbody').children('tr').each(function(){
            var rw = $(this),
                obj = {};
            
            for(var i = 0; i < cols.length; i++){
                obj[cols[i].dataItem] = $.trim(rw.children('td:eq(' + i +')').text());
            }
            rows.push(obj);
        });
    });

    return {data:rows, columns:cols};
}

var selector = 'table.list-table',
    a = new Wui.grid($.extend({
        appendTo:   $(selector).parent(),
                    // 10 accounts for margin
        height:     Condor.vp.matchWindow - ($(selector).offset().top - $('#content').offset().top + 10),
        borderStyle:{borderWidth:0}
    },tableMonster(selector)));
a.place(function(){
    // Replace the table
    $(selector).replaceWith(a.el);
    Condor.vp.resize();
});
// fix CSS
$('.wui-gh ul').css({margin:0});
$('.wui-gc').css({color:'white', fontSize:'0.9em'});