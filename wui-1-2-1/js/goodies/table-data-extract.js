(function($,Wui) {

    
// Extract data from a table with headers
function tableDataExtract(tableSelector){
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
                try{
                    obj[cols[i].dataItem] = JSON.parse($.trim(rw.children('td:eq(' + i +')').text()));
                }catch(e){
                    obj[cols[i].dataItem] = $.trim(rw.children('td:eq(' + i +')').text());
                }   
            }
            rows.push(obj);
        });
    });

    return {data:rows, columns:cols};
}


})(jQuery,window[_wuiVar]);