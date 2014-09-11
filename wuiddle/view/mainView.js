$(document).ready(function() {
    Fiddle.view.mainView = new Wui.Pane({
        title: 'Wuiddle',
        titleAlign: 'center',
        height: 900,
        appendTo: $('#app-div'),
        items: [
                Fiddle.view.sourceView,
                Fiddle.view.renderView,
                Fiddle.view.docView
                ],
        tbar: [ new Wui.Button({
                    text: 'Button!',
                    click: function(){
                        var contents = Fiddle.view.aceEditor.getValue();
                        // Fiddle.view.renderView.push(new Wui.O({
                        //         el: $('<div>')
                        // }));
                        console.log(contents);
                    }
        })]
    });
    Fiddle.view.mainView.place();

    // Fiddle.view.docView = new Wui.Pane({
    //     title: 'Docs',
    //     titleAlign: 'left',
    //     height: 250,
    //     appendTo: $('doc-div')
    // });
    // Fiddle.view.docView.place();
});