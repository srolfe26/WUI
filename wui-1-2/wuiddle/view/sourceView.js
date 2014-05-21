Fiddle.view.sourceView = new Wui.Pane({
    height: '60%',
    width: '49%',
    title: 'Source',
    cls: "floatPane",
    onRender: function() {
        this.push(new Wui.O({
                el: $('<div>'),
                id: 'aceEditor'
        }));
        Fiddle.view.aceEditor = ace.edit("aceEditor");
        Fiddle.view.aceEditor.getSession().setMode("ace/mode/javascript");
        Fiddle.view.aceEditor.setValue("/* Source Code Goes Here */");
    }
});