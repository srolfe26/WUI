// APP SETUP
var dv = {
    docEngine1:     new _w.DocObj({
                        fileList:   ['../core.js','../doc.js'],
                        namespace:  '_w'
                    }),
    docEngine2:     new _w.DocObj({
                        fileList:   ['../../wui-1-2/js/wui-1-2.js'],
                        namespace:  'Wui'
                    }),
    data:           [],
    instance:       {}
};

dv.data = [ dv.docEngine1.docsGathered, dv.docEngine2.docsGathered ];


// VIEWS
$.when.apply( $, dv.data ).done(function() {
    var allItems = [],
        sorted,
        docs = docs || {};

    // Put all top level objects in the same data structure
    _.each(arguments,function(instance){
        _.each(instance,function(file){
            if(file.success){
                allItems.push.apply( allItems, _.toArray(file.members) );
            }
        });
    });

    // Sort alphabetically by name
    sorted = _.sortBy(allItems,function(itm){ return itm.name; });

    // Create View
    dv.instance.mainView = new Wui.Pane({
        border:     false,
        height:     '100%',
        cls:        'dv-main-view',
        items:      [
                        dv.instance.docItems = new Wui.Grid({
                            cls:        'doc-list',
                            name:       'doc_list',
                            data:       sorted,
                            border:     false,
                            hideHeader: true,
                            multiSelect:true,
                            columns:    [
                                            { 
                                                dataItem: 'name',
                                                dataTemplate: '<div class="doc-name">{name}</div>{( (!documented) ? "<div class=\\"no-doc\\">not nocumented</div>" : "" )}'
                                            }
                                        ]
                        })
                    ]
    });
    dv.instance.mainView.place();

    setTimeout(function(){
        dv.instance.docItems.selectBy('name','Wui.FileBasic');
    },0);
});