(function($) {
    /** 
    Recursive function for sorting on multiple columns @private
    @param {Array of Objects}   sortArray   Modified sorters array
    @param {number}             depth       Depth of the recursive call
    @param {number}             a           First item to compare
    @param {number}             b           Second item to compare
    
    @return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
    */

    $.fn.doSort = function(sortArray,depth,a,b){
        if(sortArray.length > 0) {
            var col = sortArray[depth],
                compA = a[col.dataItem],
                compB = b[col.dataItem];
                
            //get the direction of the second sort
            var srtVal = (col.order == 'asc') ? 1 : -1;
            
            // perform the comparison based on 
            var compare = 0;
            switch(col.dataType) {
                case 'date':
                    compA = new Date(compA);
                    compB = new Date(compB);
                    compare = (compA.getTime() == compB.getTime()) ? 0 : (compA.getTime() > compB.getTime()) ? 1 : -1;
                    break;
                case 'numeric':
                    compA = (parseFloat(compA)) ? parseFloat(compA) : 0;
                    compB = (parseFloat(compB)) ? parseFloat(compB) : 0;
                    compare = (compA == compB) ? 0 : (compA > compB) ? 1 : -1;
                    break;
                default:
                    compare = $.trim(compA).toUpperCase().localeCompare($.trim(compB).toUpperCase());
            }
            
            if(compare !== 0 || sortArray[depth + 1] === undefined) {
                return compare * srtVal;
            } else {
                return me.doSort(sortArray,depth + 1,a,b);
            }                                                       
        }else{
            return (a['wuiIndex'] > b['wuiIndex']) ? 1 : -1;
        }
    }

})(jQuery);
