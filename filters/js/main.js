var filterMaker = filterMaker || {
    blurVal:        0,
    hueVal:         0,
    dilateVal:      0,
    filterName:     'newFilter',
    filterCount:    0,
    saturateVal:    1,
    brightVal:      1,
    ContrastVal:    1,
    makeFilter:     function(){
                        var tb = '    ',
                            filterName = filterMaker.filterName = $('[name=filter_name]').val(),
                            retString = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg">\n' +
                                            tb + '<filter id="' +filterMaker.filterName+ '">\n';

                        filterMaker.filterCount = 0;
                        
                        if(filterMaker.blurVal > 0){
                            retString += tb + tb + '<feGaussianBlur stdDeviation="' +filterMaker.blurVal+ '" />\n';
                            filterMaker.filterCount++;
                        }

                        if(filterMaker.hueVal > 0){
                            retString += tb + tb + '<feColorMatrix type="hueRotate" values="' +filterMaker.hueVal+ '"/>\n';
                            filterMaker.filterCount++;
                        }

                        if(filterMaker.dilateVal > 0){
                            retString += tb + tb + '<feMorphology operator="dilate" radius="' +filterMaker.dilateVal+ '"/>\n';
                            filterMaker.filterCount++;
                        }

                        if(filterMaker.saturateVal !== 1){
                            retString += tb + tb + '<feColorMatrix type="saturate" values="' +filterMaker.saturateVal+ '"/>\n';
                            filterMaker.filterCount++;
                        }
                        

                        if(filterMaker.brightVal !== 1){
                            retString +=    tb + '<feComponentTransfer>\n' +
                                            tb + tb + '<feFuncR type="linear" slope="' +filterMaker.brightVal+ '"/>\n' +
                                            tb + tb + '<feFuncG type="linear" slope="' +filterMaker.brightVal+ '"/>\n' +
                                            tb + tb + '<feFuncB type="linear" slope="' +filterMaker.brightVal+ '"/>\n' +
                                            tb + '</feComponentTransfer>\n';
                            filterMaker.filterCount++;
                        }

                        if(filterMaker.ContrastVal !== 1){
                            retString +=    tb + '<feComponentTransfer>\n' +
                                            tb + tb + '<feFuncR type="linear" slope="' +filterMaker.ContrastVal+ '" intercept="-(0.5 * ' +filterMaker.ContrastVal+ ') + 0.5"/>\n' +
                                            tb + tb + '<feFuncG type="linear" slope="' +filterMaker.ContrastVal+ '" intercept="-(0.5 * ' +filterMaker.ContrastVal+ ') + 0.5"/>\n' +
                                            tb + tb + '<feFuncB type="linear" slope="' +filterMaker.ContrastVal+ '" intercept="-(0.5 * ' +filterMaker.ContrastVal+ ') + 0.5"/>\n' +
                                            tb + '</feComponentTransfer>\n';
                            filterMaker.filterCount++;
                        }

                        $('[name=svg_source]').val(retstring = retString + tb + '</filter>\n</svg>');
                        filterMaker.applyFilter();
                        
                    },
    applyFilter:    function(){
                        var enc = $('[name=svg_encoded]').val(
                                'url("data:image/svg+xml;base64,' + Base64.encode($('[name=svg_source]').val()) + '#' +filterMaker.filterName+ '")'
                            );

                        if(filterMaker.filterCount > 0)   $('#target').css('filter',enc.val()).attr('filter','#' + filterMaker.filterName);
                        else                              $('#target').css('filter','');
                    }
};

$(document).ready(function(){
    $( "#blur-slider" ).slider({
        range: "min",
        min:    0,
        max:    40,
        value:  0,
        slide:  function( event, ui ) { 
                    filterMaker.blurVal = ui.value;
                    filterMaker.makeFilter();
                }
    });

    $( "#brightness-slider" ).slider({
        range: "min",
        min:    0,
        step:   0.01,
        max:    5,
        value:  1,
        slide:  function( event, ui ) { 
                    filterMaker.brightVal = ui.value;
                    filterMaker.makeFilter();
                }
    });

    $( "#contrast-slider" ).slider({
        range: "min",
        min:    0,
        step:   0.01,
        max:    5,
        value:  1,
        slide:  function( event, ui ) { 
                    filterMaker.ContrastVal = ui.value;
                    filterMaker.makeFilter();
                }
    });

    $( "#saturate-slider" ).slider({
        range: "min",
        min:    0,
        step:   0.01,
        max:    5,
        value:  1,
        slide:  function( event, ui ) { 
                    filterMaker.saturateVal = ui.value;
                    filterMaker.makeFilter();
                }
    });

    $( "#dilate-slider" ).slider({
        range: "min",
        min:    0,
        max:    40,
        value:  0,
        slide:  function( event, ui ) { 
                    filterMaker.dilateVal = ui.value;
                    filterMaker.makeFilter();
                }
    });

    $( "#hue-slider" ).slider({
        range: "min",
        min:    0,
        max:    359,
        value:  0,
        slide:  function( event, ui ) { 
                    filterMaker.hueVal = ui.value;
                    filterMaker.makeFilter();
                }
    });
    

    $('[name=filter_name]').on('input',function(){
        filterMaker.makeFilter();
    });
    $('[name=svg_source]').on('input',function(){
        filterMaker.applyFilter();
    });

    $('#upload_tool').change(function() {
        var theField = this,
            tgt = $('#target');
        
        // Delete existing caption elements
        tgt.css('background-image','');

        // Add the form items to be uploaded
        for(var x = 0; x < theField.files.length; x++){
            var oFReader = new FileReader();
            
            oFReader.readAsDataURL(theField.files[x]);
            oFReader.onload = function (oFREvent) {
                tgt.css('background-image','url(' + oFREvent.target.result + ')');
            };
        }
    });
});
