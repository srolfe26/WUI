Fiddle.view.docView = new Wui.Pane({
    height: '40%',
    width: '100%',
    cls: 'docPane',
    border: false,
    title: 'Docs',
    onRender: function() {
        this.push(new Wui.O({
            el: $('<iframe>'),
            id: 'docsFrame',
            attr: {src: '/resources/js/wui/', width: '100%', height: '99%'}
            // attr: {src: 'https://webdev1.usurf.usu.edu:8497/resources/js/wui/', width: '100%', height: '99%', style: 'border: 0px'}
        }));
    }
});