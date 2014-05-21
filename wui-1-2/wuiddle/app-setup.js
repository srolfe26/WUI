var Fiddle = Fiddle || {};
Fiddle.view = Fiddle.view || {};
Fiddle.controller = Fiddle.controller || {};

$.ajaxPrefilter(function( originalAjaxSettings, options, jqXHR ) {
   // overwrite error handler for current request
   originalAjaxSettings.error = function( response ){
        if(response.status == 401){
            new Wui.Window({
                title:      'Your session has expired. Please login again.',
                width:      600,
                height:     400,
                onWinClose: function(){ $.ajax(originalAjaxSettings); },
                items:      [ new Wui.O({el:$('<iframe>').css({border:0}).attr({src:response.responseText}), height:'100%', width:'100%'}) ]
            });
        }else{
            var err = $.parseJSON( response.responseText ) || {fatalError:'Aw Snap! There was a problem talking to the server.'},
                newErr = new Wui.Window({
                    title:  'Error On Server',
                    items:  [new Wui.O({el: $("<div>").html(err.fatalError)})],
                    isModal:true,
                    width:  525,
                    height: 350
                });
        }
   };
});

$(window).resize(function(){
    if(Fiddle.view.mainView) Fiddle.view.mainView.layout();
});