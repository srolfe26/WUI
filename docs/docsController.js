(function(dv,_w,_w12,$){


(function(me){
    // Listeners
    $(document).on('wuichange','[name=doc_list]', me.loadDoc)
            .on('wuibtnclick','[name=panel_close_btn]', me.closeDoc);
        // .on('wuidblclick','[name=dvviewer]', me.deepSelect)        
        // .on('keypress','input[name=prefix_str]', me.gotoPrefix )
        // .on('click','.clickable-path a', me.locationLink)
        // .on('valchange','[name=pt_story]',me.toggleComments)
        // .on('wuibtnclick','[name=toggle_magnification]',me.toggleMag)

    $(document).ready(function(){
        $(window).resize(function(){
            dv.instance.mainView.height = $.viewportH();
            dv.instance.mainView.layout();
        });
    });

    // Do State Machine


// CONTROLLER METHODS
}(dv.MCtrlr = {
    closeDoc:   function() {
                    var btn = arguments[1];

                    btn.parent.remove();
                },
    getParsed:  function(param, parsed){
                    if(typeof parsed != 'undefined' && typeof parsed[param] !='undefined') {
                        return parsed[param];
                    }
                    else {
                        return undefined;
                    }
                },
    loadDoc:    function() {
                    var selection = arguments[4];

                    // Remove All Items
                    dv.instance.mainView.splice(1,dv.instance.mainView.items.length);
                    
                    // Add Selected Items
                    selection.forEach(function(sel){
                        var rec = sel.rec,
                            newPanel;

                        dv.instance.mainView.push( newPanel = new _w12.Pane({ 
                            border:     false, 
                            cls:        'doc-win',
                            items:      [
                                            new _w12.Button({ 
                                                text:'X', 
                                                name:'panel_close_btn', 
                                                cls:'close-panel' 
                                            })
                                        ]
                        }) );

                        _w.DocObj.prototype.parseJavaDoc(rec);

                        newPanel.append(
                            // Output the object name
                            $('<h2>').text(rec.name),
                            
                            // Output the paragraph text about the object as a whole
                            (rec.documented) ? rec.parsed.text : $('<p>').text('Not Documented'),

                            // Output CONFIGS
                            (rec.configs) ? (function(){
                                var configContainer = $('<div>').addClass('doc-configs')
                                    cofigArry = [ $('<h3>').text('Configs'), configContainer ];

                                newPanel.configGrid = new _w12.DataList({
                                    appendTo:   configContainer,
                                    data:       rec.configs,
                                    border:     false,
                                    hideHeader: true,
                                    multiSelect:true,
                                    template:   '<tr>' +
                                                    '<td class="cfg-name">{name}</td>' +
                                                    '<td class="cfg-awesome" data-flag="{( (typeof parsed != "undefined") ? parsed.awesome : "" )}"></td>' +
                                                    '<td class="cfg-creation-date">{( (typeof parsed != "undefined") ? parsed.creation : "" )}</td>' +
                                                    '<td class="cfg-deprecated">{( (typeof parsed != "undefined") ? parsed.deprecated : "" )}</td>' +
                                                    '<td class="cfg-required" data-flag="{( (typeof parsed != "undefined") ? parsed.required : "" )}"></td>' +
                                                    '<td class="cfg-default">{( (typeof defaultVal != "undefined") ? _w.DocObj.prototype.escapeTags(defaultVal) : "" )}</td>' +
                                                    '<td class="cfg-text">{( (typeof parsed != "undefined") ? parsed.text[0].outerHTML : "" )}</td>' +
                                                '</tr>',
                                    init:       function(){
                                                    this.el = $('<table>').addClass('doc-table');
                                                    this.elAlias = $('<tbody>').appendTo(this.el);
                                                }
                                });
                                //Delay the configGrid from rendering until after its target has been rendered
                                setTimeout(function(){
                                    newPanel.configGrid.place();
                                },0);

                                return cofigArry;
                            })() : {},

                            // Output METHODS
                            (rec.methods) ? (function(){
                                var methodsContainer = $('<div>').addClass('doc-methods')
                                    cofigArry = [ $('<h3>').text('Methods'), methodsContainer ];

                                newPanel.methodGrid = new _w12.DataList({
                                    appendTo:   methodsContainer,
                                    data:       rec.methods,
                                    border:     false,
                                    hideHeader: true,
                                    multiSelect:true,
                                    template:   '<tr>' +
                                                    '<td class="cfg-name">{name}</td>' +
                                                    '<td class="cfg-authors">{( (typeof parsed != "undefined") ? parsed.authors : "" )}</td>' +
                                                    '<td class="cfg-params">{( (typeof parsed != "undefined") ? parsed.params : "" )}</td>' +
                                                    '<td class="cfg-awesome" data-flag="{( (typeof parsed != "undefined") ? parsed.awesome : "" )}"></td>' +
                                                    '<td class="cfg-creation-date">{( (typeof parsed != "undefined") ? parsed.creation : "" )}</td>' +
                                                    '<td class="cfg-deprecated" data-flag="{( (typeof parsed != "undefined") ? parsed.deprecated : "" )}"></td>' +
                                                    '<td class="cfg-eventhook" data-flag="{( dv.MCtrlr.getParsed(\"eventhook\", parsed) )}"></td>' +
                                                    '<td class="cfg-required" data-flag="{( (typeof parsed != "undefined") ? parsed.required : "" )}"></td>' +
                                                    '<td class="cfg-returns">{( (typeof parsed != "undefined") ? parsed.returns : "" )}</td>' +
                                                    '<td class="cfg-throws">{( (typeof parsed != "undefined") ? parsed.throws : "" )}</td>' +
                                                    '<td class="cfg-version">{( (typeof parsed != "undefined") ? parsed.version : "" )}</td>' +
                                                    '<td class="cfg-text">{( (typeof parsed != "undefined") ? parsed.text[0].outerHTML : "" )}</td>' +
                                                    '<td class="cfg-code">{( (typeof code != "undefined") ? _w.DocObj.prototype.HTMLifyCode(code) : "" )}</td>' +
                                                '</tr>',
                                    init:       function(){
                                                    this.el = $('<table>').addClass('doc-table');
                                                    this.elAlias = $('<tbody>').appendTo(this.el);
                                                }
                                });
                                //Delay the configGrid from rendering until after its target has been rendered
                                setTimeout(function(){
                                    newPanel.methodGrid.place();
                                },0);

                                return cofigArry;
                            })() : {}

                        );
                    });

                    setTimeout(function(){ Prism.highlightAll(); },0);
                }
}));


}(dv, window[_wuiVar], Wui, jQuery));