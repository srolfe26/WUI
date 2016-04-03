var shell = require('shelljs');
var _fs = require('fs');
var CleanCSS = require('clean-css');
var buildJSHint = require('build-jshint');
var UglifyJS = require("uglifyjs");


var buildEngine = function(){
        shell.rm('-rf', './dist');
        shell.mkdir('-p', './dist/js', './dist/css', './dist/img');
        shell.cp('./src/img/loader.gif', './dist/img/loader.gif');
    };


/**
 * Adds WUI copyright at the front
 *
 * @param   {string}    src     The source code to come after the copyright
 * @return  {string}    src with copyright
 */
buildEngine.prototype.addCopyright = function(src) {
    return  "/*! Wui 1.2" + 
        // Copyright should be the year the work was first published
        "\n * Copyright (c) 2013-2016 Stephen Rolfe Nielsen (rolfe.nielsen@gmail.com)" +
        "\n *" +
        "\n * @license MIT" +
        "\n * http://www.wui-js.com/wui-1-2/license.html" +
        "\n */ \n\n" + 
        src;
};


/**
 * Writes a file based on passed in parameters
 *
 * @param   {object}    opts    Object of the following form
 * {
 *    src:    ['file1.js, file2.js, ...']           // An array of files to be concatenated
 *
 *    dest:   'destination.js'                      // Path to the output file
 *
 *    fn:     [function(){}, function(){}, ...]     // Array of function names to act on the
 *                                                  // concatenated contents of src, that return 
 *                                                  // the modified contents.
 * }
 */
buildEngine.prototype.buildFile = function(opts) {
    var me = this,
        out = me.concat(opts.src),
        distPath = opts.dest,
        operations = opts.fn,   // Operations that will be performed on the concatenated files
        i = 0;
        
    for (i; i < operations.length; i++) {
        if (typeof me[operations[i]] == 'function') {
            out = me[operations[i]](out);
        }
    }

    _fs.writeFileSync(distPath, out);
    console.log(' '+ distPath +' built.');
};


/**
 * Concatenates files or strings together. If the filePath is longer than 200 characters it is
 * assumed to be a code snippet and gets included in the file. Non-existant paths are included
 * in the concatenation (just in case they're snippets).
 *
 * @param   {array}     fileList    An array of one or more files to concatenate
 * @return  {string}    A string    containing the concatenated contents of 'fileList' array
 */
buildEngine.prototype.concat = function(fileList) {
    return fileList.map(function(filePath){
        if (filePath.length < 200) {
            if (shell.test('-f', filePath)) {
                return _fs.readFileSync(filePath).toString();
            }
            else {
                console.log("'" + filePath + "' is not a file. " + 
                            "Path included in concatenation, but may cause errors");
                return filePath;
            }
        }
        // Probably not a path at all, but a src string
        else {
            return filePath;
        }
    }).join("\n\n");
};


/**
 * Creates a non-minified CSS file with the images replaced with MD5 Hashes then creates a
 * minified version of that file in the same directory as the destination. To convert images to a
 * hash, the '?embed' parameter should be added to the files in the CSS
 *
 * @param   {string}    path            Path of the source css file
 * @param   {string}    destination     Path to the destination css file
 * @param   {string}    root            The 'root' flag is so enhancecss can determine where to 
 *                                      get the images
 */
buildEngine.prototype.cssMinify = function(path, destination, root) {
    var me = this;
    
    shell.exec('enhancecss -o ' +destination+ ' --root ' +root+ ' ' + path, function(code, stdout, stderr) {
        if (code === 0) {
            // Add copyright to the newly created file
            me.buildFile({
                src : [destination],   
                dest : destination,
                fn: ['addCopyright']
            });
            
            // Minify new file
            me.buildFile({
                src : [(new CleanCSS().minify(me.concat([destination])).styles)],   
                dest : destination.replace('.css', '.min.css'),
                fn: []
            });
        }
        else {
            console.log('ERROR BUILDING CSS: "' + path + '".');
        }
    });
}


/**
 * Wraps the file in the WUI namespace IIFE
 *
 * @param   {string}    src     The source code to be wrapped
 * @return  {string }   The wrapped code
 */
buildEngine.prototype.namespaceWrap = function(src) {
    var header = "\n\n(function($,Wui) {\n\n\n",
        footer = "\n\n\n})(jQuery,Wui);\n\n";
        
    return header + src + footer;
};


/*************************************** LINT BEFORE BUILD ****************************************/
var jshintErrors = 0;

var opts = {
    // Array of globs of files to skip 
    ignore: [
        './src/js/goodies/**/*.js',
        './src/js/Component/State.js',      // TODO: There's some weird stuff in here that is 
                                            // library code and ought to be separated our from 
                                            // Wui code at some pointand placed in libs.
        './src/js/libs/plugins.js',
        './src/js/libs/jquery-2-1-1-ui-1-10-4.js',
        './src/js/libs/jquery-1-10-2-ui-1-10-3.js'
    ],
    
    // Handles output of errors 
    // Default reporter logs errors to the console 
    reporter: function(error, file, src) {
        var lines = src.split(/\r\n|\n|\r/g);
        
        jshintErrors++;
        console.log(file.replace('./src/js/', '').toUpperCase() + ' '+ error.reason +'\n'+
        error.line + ':  ' + lines[error.line - 1].replace(/^\s+/,'') + '\n');
    },
 
    // Configuration for JSHint
    config: { 
        undef:  true,
        unused: true,
        
                // TODO: Currently we have instances where functions are made on the fly 
                // generating a  "The Function constructor is a form of eval." error (WO54), 
                // eventually, we want to get rid of this issue, but for now ignore it with (evil).
        evil:   false,
        
                // Exposes browser globals so they don't get caught (document, window)
        browser:true,
        
                // Exposes developer globals so they don't get caught (console, alert)
        devel:  true,
        
                // Exposes jQuery globals so they don't get caught ($, jQuery)
        jquery: true,
    },
 
    // Global variables declared (passed to JSHint) 
    globals: { 
        Wui:        false,
        FileList:   false
    }
};
 
var files = ['./src/js/**/*.js'];
 
buildJSHint(files, opts, function(err, hasError) {
    /******************************* START BUILDING *******************************************/
    var builder = new buildEngine();

    // Create 'wui.js'
    var component = builder.concat([
            './src/js/Component/Object.js',       // Most EVERYTHING inherits from this one
            
            './src/js/Component/LongPoll.js',   
                    
            './src/js/Component/Data.js',           
            './src/js/Component/Template.js',           
            './src/js/Component/DataList.js',       // Requires Template, Data      
            './src/js/Component/Button.js',
                      
            './src/js/Pane/Pane.js',           
            './src/js/Pane/Window.js',             // Requires Pane, Button
            './src/js/Pane/msg-errRpt-confirm.js', // Requires Window, Button
        ]);
    var wrapped = builder.namespaceWrap(component);

    builder.buildFile({
        src: ['./src/js/Core.js', wrapped],
        dest: './dist/js/wui.js',
        fn: ['addCopyright']
    });


    // Create 'forms.js'
    var form = builder.concat([
            './src/js/Form/Form.js',
            './src/js/Form/Note.js',
            './src/js/Form/Label.js',

            // Requires Label
            './src/js/Form/FormField.js',

            // All of the following require FormField
            './src/js/Form/Hidden.js',
            './src/js/Form/Text.js',
            './src/js/Form/TextArea.js',            // Requires Text
            './src/js/Form/Wysiwyg.js',
            './src/js/Form/Radio.js',
            './src/js/Form/Checkbox.js',            // Requires Radio
            './src/js/Form/Combo.js',               // Requires DataList, Text
            './src/js/Form/Link.js',                // Requires Combo, Text
            './src/js/Form/Datetime.js',            // Requires Text
            './src/js/Form/FileBasic.js',           // Requires Text
            './src/js/Form/File.js',                // Requires Text
            './src/js/Form/input.js'                // Requires Text
        ]);
    builder.buildFile({
        src : [form],
        dest : './dist/js/forms.js',
        fn: ['namespaceWrap', 'addCopyright']
    });


    // Create 'grid.js'
    var grid = builder.concat([
            // Both require Pane
            './src/js/Pane/Tabs.js',               // Requires Button
            './src/js/Pane/Grid.js',               // Requires DataList
        ]);
    builder.buildFile({
        src : [grid],
        dest : './dist/js/grid.js',
        fn: ['namespaceWrap', 'addCopyright']
    });


    // Create 'infinite-grid.js'
    var infinite = builder.concat([
            './src/js/Pane/InfiniteGrid.js'        // Requires Grid
        ]);
    builder.buildFile({
        src : [infinite],   
        dest : './dist/js/infinite-grid.js',
        fn: ['namespaceWrap', 'addCopyright']
    });


    // Create 'state.js'
    var state = builder.concat([
            './src/js/Component/State.js'
        ]);
    builder.buildFile({
        src : [state],   
        dest : './dist/js/state.js',
        fn: ['addCopyright']
    });

    // Create 'wui.1.2.js'
    builder.buildFile({
        src : [
            './src/js/libs/plugins.js',
            './dist/js/wui.js',
            builder.namespaceWrap(builder.concat([grid, infinite, form])),
            state
        ],   
        dest : './dist/wui.1.2.js',
        fn: []
    });


    // Create 'wui-1-2-with-jquery.js'
    builder.buildFile({
        src : [
            './src/js/libs/jquery-1-10-2-ui-1-10-3.js',
            './dist/wui.1.2.js'
        ],   
        dest : './dist/wui-1-2-with-jquery.js',
        fn: []
    });


    // Create 'wui.1.2.min.js'
    builder.buildFile({
        src : [
            UglifyJS.minify('./dist/wui.1.2.js').code
        ],   
        dest : './dist/wui.1.2.min.js',
        fn: ['addCopyright']
    });

    /********************************************** CSS ***********************************************/
    builder.cssMinify('./src/css/wui.css', './dist/css/wui.css', './src/css/');
    builder.cssMinify('./src/css/docs.css', './dist/css/docs.css', './src/css/');
    
    if (hasError === true) {
        console.log('---------------------------------------------------------------------------');
        console.log(jshintErrors+ ' JSHINT ERROR(S) (SEE ABOVE). VERIFY THE BUILD IS OKAY.');
        console.log('---------------------------------------------------------------------------');
    }
    else {
        console.log('---------------------------------------------------------------------------');
        console.log('BUILD COMPLETE AND LOOKING FINE.');
        console.log('---------------------------------------------------------------------------');
    }
});
