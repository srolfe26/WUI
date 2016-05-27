/**
 * Wui.Template is a way to create DOM elements based on data. 
 *
 * This version of Wui.Template should be considered a replacement to the old template
 * in that it addresses several weaknesses and  vulnerabilities including:
 *      - The risk of XSS attack through use of inline functions
 *      - Inability to escape HTML and Javascript values
 *      - Inability to access nested variables in a fail-safe manner
 *      - Inability to "compile" the template - a 2X speed improvement in Wui.Template
 *
 * Wui.Template syntactically follows the familiar usage of placing variables in the template 
 * surrounded by braces (or curly brackets). Data is set as a parameter to the make() method, and 
 * make() always returns a string. Functions are available via a 'function' flag that will be 
 * described below. Additionaly, it borrows many features and syntax from the PHP server-side 
 * templating system Smarty.
 *
 *      (http://www.smarty.net/)
 *
 * Wui.Template will "compile" its template on the first run, meaning rather than parsing the 
 * template string with a regex on every iteration, it will dynamically create a function on the 
 * first iteration that will then be called with the new data of each subsequent iteration. This 
 * creates approximately a 2X speed advantage (tested on a 10,000 X 4 data set), even with the more 
 * functionality in the template.
 *
 * Template syntax can be understood through the follow examples, starting with the most simple:
 *
 *      '<p>{firstname}</p>'
 *
 * An only slighty more complex example would be as follows, notice the nested variable reference:
 *
 *      '<p>{name.last}, {name.first}</p>'
 *
 * As usual, values which don't exist will be returned as empty strings, however values that are set
 * with a javascript 'undefined' object will return 'undefined'.
 *
 * Another example shows the smarty syntax now, with the addition of flags:
 *
 *      '<p>{name.last|upper}, {name.first|capitalize}</p>'
 *
 * Flags are processed left to right as added to the template. Here we protect against possible XSS injection:
 *
 *      '<p>{name.last|upper|escape:html}, {name.first|capitalize|escape:html}</p>'
 *
 * Using functions to process parameters is possible, and is done in a strict manner that closes a 
 * potential attack vector. Rather than effectively eval'ing code that is passed into the template,
 * processing functions are member methods of the template, and called with fixed parameters as in 
 * the following example:
 *
 * Given the following template definition and data:
 *
 *      data =  [
 *                   { name: 'Stephen <b>The Steve</b>', age: {number: 32, description:'Thirty-two'} },
 *                   { name: 'Kayli', age: {number: 24, description:'Twenty-four'} },
 *                   { name: 'Girl', age: {number: 4, description:'Four'} },
 *                   { name: 'Boy', age: {number: 2, description:'Two'} },
 *                   { name: 'Super-Fly', age: {number: 0.5, description:'Six Months'} },
 *              ];
 *
 *      template = new Wui.Template({
 *          html:       '<p>{name|escape:"html"}, {|function:processAge:age}</p>',
 *
 *          processAge: function(age){
 *                          // How every parent should describe the age of their children ;-)
 *                          if(age.number > 1) {
 *                              return age.number;
 *                          } else {
 *                              return age.description;
 *                          }
 *                      }
 *      });
 *
 *      data.forEach(function(itm){
 *          $(template.make(itm)).appendTo('body');
 *      });
 *
 * Will output the following:
 *
 *      <p>Stephen &lt;b&gt;The Steve&lt;/b&gt;, 32</p>
 *      <p>Kayli, 24</p>
 *      <p>Girl, 4</p>
 *      <p>Boy, 2</p>
 *      <p>Super-Fly, Six Months</p>
 *
 * Notice in this example, values processed by the function are parameters to the function flag, 
 * not named in the place for variable names. This pattern allows for safer functions, defined with
 * comments, and allows for more complex operations including the use of closures. Globally defined
 * methods can be referenced either directly or within methods on the template config.
 *
 * Avaialble modifiers/flags are:
 *
 *      capitalize  Will capitalize the first letter of every word in the string
 *
 *      default     Accepts a parameter to use as a default value if variable is a blank string. 
 *                  Example: {undefinedVar|default:"Default Text"}
 *
 *      escape      Used to encode special characters. Accepts 'html', 'javascript', 'json' and 'url'
 *
 *      function    Will call a function within the scope of the template. Parameters are the function 
 *                  name, and then arguments to pass. Example {|function:funcName:param1Name:param2Name:...} 
 *                  When functions are used, the function flag MUST be the first one, and the the 
 *                  key value MUST be blank since the keys are parameters to the function.
 *
 *      lower       Equivalent to toLowerCase()
 *
 *      unescape    Used to decode, countering the effect of the escape modifier (Accepts 'html', 
 *                  'javascript', 'json' and 'url')
 *
 *      upper       Equivalent to toUpperCase()
 *
 */
Wui.Template = function(args){ 
    $.extend(this, {
        // The HTML template that the data will fit into. Null value will cause an error to be 
        // thrown. Specification required.
        template:   '',
        
        // After the template's first rendering, this value contains a function for more quickly
        // generating the template. Setting this value back to null will make the template be re-
        // evaluated.
        compiled:   null,
        
        // An array used for building up the compiled function. Used internally
        build:      [],
        
        // An extra-private variable used while applying data in a template
        __s:        ""
    }, args);
};

Wui.Template.prototype = {
    /*
     * Given an array of flags, applies them on the value passed in
     *
     * @param   {string}    str     A string that will have the flags applied
     * @param   {array}     flags   An array of flags that will be parsed and functions applied
     *
     * @return  {string}    The string passed in as 'str' with the flag functions applied
     */
    applyFlags: function(str, flags){
        var me = this;

        // Method for adding flags and params to the build array
        function addToBuid(fn, params) {
            var latestKey = me.build[me.build.length - 1];

            latestKey.fn = latestKey.fn || [];
            latestKey.params = latestKey.params || [];

            latestKey.fn.push(fn);
            latestKey.params.push($.extend(true, [], params));
        }

        for (var index = 0; index < flags.length; index++) {
            var params = flags[index].split(':'),
            // Replaces the first element (which is the name of the flag), with the string to be
            // modified. Then splice returns the flag in an array, so get the first element.
                flag;

            // Remove quotes from around params, they're already a string at this point
            for (var i = 1; i < params.length; i++) {
                params[i] = me.trimSpecial(params[i],'"\'');
            }

            // The flag is the first parameter
            flag = params.shift();

            if (flag == 'function') {
                // Add the functions to the build
                addToBuid('js_function', params);

                // Function is a JS keyword and requires special parsing
                str = me.js_function.apply(me, params);
            }
            else {
                // Default is a keyword in javascript so it needs to be changed.
                if (flag == 'default') {
                    flag = 'defaultVal';
                }
                
                if (typeof me[flag] !== 'function') {
                    new Error('wui-smarty.js - Unsupported flag: \'' + flag + '\'.');
                }
                else {
                    // Add the functions to the build
                    addToBuid(flag, params);

                    // Add the string to be modified as the first parameter
                    params.splice(0,0,str);

                    // Run the function with all parameters
                    str = me[flag].apply(me, params);
                }
            }
        }

        return str;
    },


    /*
     * Capitalizes the first letter of every word in the string
     *
     * @param   {string}    str     A string to be capitalized. ie: "foo bar baz"
     * @return  {string}    Capitalized string. ie: "Foo Bar Baz"
     */
    capitalize: function(str) {
        return String(str).replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },


    /*
     * Allows a named function to be chainable through using the common me.__s
     *
     * @param   {string}    fn     The name of a function to call within the context of this object
     * @param   {array}     params Array of parameters to be passed into function
     * @return  {object}    A reference to the template object so that chaning can occur
     */
    chain: function(fn, params) {
        var me = this;

        params.splice(0, 0, me.__s);
        me.__s = me[fn].apply(me, params);

        return me;
    },


    /*
     * Turns the build array into a function that will be run in all future uses
     * of the template. Makes use of me.build[] to create the function.
     *
     * @return  {function}  The compiled function
     */
    compile: function() {
        var me = this,
            fnString = 'var me = this, retString = "";';

        function arrToStr(arr) {
            return '[\'' + arr.join('\',\'')+ '\']';
        }

        // Contstruct the compiled function from the array items
        for (var i = 0; i < me.build.length; i++) {
            var itm = me.build[i];

            if ($.isPlainObject(itm)) {
                // Do a lookup of keys that have a name (not function expressions)
                if(itm.key.length > 0) {
                    fnString += 'me.__s = me.lookup(rec, \'' + itm.key + '\');';
                }
                // Set the initial value from the function (function flag must be first)
                else if (typeof itm.fn !== 'undefined') {
                    fnString += 'me.__s = me.' +itm.fn.shift()+ '.apply(me, ' +arrToStr(itm.params.shift())+ ');';
                }

                // Perform additional flags on me.__s if they exist
                if (typeof itm.fn !== 'undefined' && itm.fn.length > 0) {
                    fnString += 'me';
                    for (var f = 0; f < itm.fn.length; f++) {
                        fnString += '.chain(\'' +itm.fn[f]+ '\',' +arrToStr(itm.params[f])+ ')';
                    }
                    fnString += ';';
                }

                fnString += 'retString += me.__s;';
            }
            // Item is a string
            else {
                fnString += 'retString += \'' + me.escape(itm,'javascript') + '\';';
            }
        }

        fnString += "return retString;";

        // create function that will perform the conditional statement
        return Function.apply(null, ['rec', fnString]);
    },


    /*
     * Returns the string passed in, or the default string if the value is blank.
     *
     * @param   {string}    str     Any string
     * @param   {string}    default A value to replace a blank string with
     *
     * @return  {string}    The value string passed in, or the default value
     */
    defaultVal: function(str, dflt) {
        // A blank or undefined string will evaluate to false in JS
        if (str) {
            return str;
        }

        return dflt;
    },


    // Characters that ought to be escaped in HTML
    escapeHTML: {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    },


    // Characters that ought to be escaped in javascript strings
    escapeJS: {
        '\\':   '\\\\',
        "'":    "\\'",
        '"':    '\\"',
        "\r":   '\\r',
        "\n":   '\\n',
        '</':   '<\/'
    },


    /*
     * Escape a string for a given type of output, or reverse that escaping
     *
     * @param   {string}    str         The string to escape/unescape
     * @param   {string}    type        String containing the escape type ('html'|'javascript'|'json'|'url')
     * @param   {boolean}   unescape    Flag to reverse the usual escape sequence
     *
     * @return  {string}    An escaped string.
     */
    escape: function(str, type, unescape) {
        unescape = unescape || false;

        var me = this,
            actions = {
                html: function() {
                    var baseMap = me.escapeHTML,
                        map = unescape ? me.invert(baseMap) : baseMap,
                        regex = new RegExp('[' + me.getKeys(map).join('').replace(/\//,'\\/') + ']', 'g');

                    return String(str).replace(regex, function(match) {
                        return map[match];
                    });
                },
                
                javascript: function() {
                    var baseMap = me.escapeJS,
                        map = unescape ? me.invert(baseMap) : baseMap,
                        // The JS regex cannot be constructed like the HTML one above because the JS string
                        // has to be escaped to be made into a regex, but then the map won't work.
                        regex = unescape ? /\\\\|\'|\\"|\\r|\\n|<\//g : /<\/|"|'|\\|\n|\r/g;

                    return String(str).replace(regex, function(match) {
                        return map[match];
                    });
                },
                
                json: function() {
                    var action = unescape ? 'parse' : 'stringify';
                    return JSON[action](str);
                },
                
                url: function() {
                    var action = unescape ? 'decodeURI' : 'encodeURI';
                    return JSON[action](str);
                }
            };

        if(typeof actions[type] === 'function') {
            return actions[type]();
        }
        else {
            return actions.html();
        }
    },


    /*
     * Returns the keys of an object as an alphabetically sorted array.
     *
     * @param   {object}    obj     Any plain object. Example:
     *                              {
     *                                  asdf: 1,
     *                                  zxcv: 2,
     *                                  qwer: 3
     *                              }
     * @return  {array}     Sorted array of object keys. i.e: ['asdf', 'qwer', 'zxcv'].
     */
    getKeys: function(obj){
        var retArray = [];

        if ($.isPlainObject(obj)) {
            $.each(obj,function(key){
                retArray.push(key);
            });
        }

        return retArray.sort();
    },


    /*
     * Inverts an object so that its keys are its values, and its values are its keys.
     * Complex values will be dropped (functions, arrays, and objects). If a non-object,
     * or an empty object is passed in, an empty object will be returned.
     *
     * @param   {object}    obj         The object to be searched within.
     * @param   {string}    property    A string of the property to search for within 'obj'.
     *
     * @return  {boolean}   Whether the property exists within the object
     */
    hasProperty: function(obj, property) {
        return obj !== null && typeof obj === 'object' && (property in obj);
    },


    /*
     * Inverts an object so that its keys are its values, and its values are its keys.
     * Complex values will be dropped (functions, arrays, and objects). If a non-object,
     * or an empty object is passed in, an empty object will be returned.
     *
     * @param   {object}    obj     The object to be inverted.
     * @return  {object}    The passed in object copied and inverted, or an empty object.
     */
    invert: function(obj) {
        var retObj = {};

        if ($.isPlainObject(obj) && !$.isEmptyObject(obj)) {
            $.each(obj, function(key, value){
                // Values that are not simple will be dropped from the new object
                if (!$.isArray(value) && !$.isPlainObject(value) && !$.isFunction(value)) {
                    retObj[value] = key;
                }
            });
        }

        return retObj;
    },


    /*
     * Looks for a javascript function and passes parameters to it
     *
     * @param   {string}    fn      The name of a function that has been added as a config
     *                              to an instance of this template
     * @param   {string}    ...     Zero or more names of parameters to be looked up in the
     *                              template's data record
     *
     * @return  {string}    The return value from the function
     */
    js_function: function(fn){
        var me = this,
        // Function name is the first argument, function parameters are all afterward
            index = 1,
            paramVals = [];
        for (index; index < arguments.length; index++) {
            paramVals.push(me.lookup(me.rec, arguments[index]));
        }

        return me[fn].apply(me, paramVals);
    },


    /* Determine whether a key exists in the record, and either inserts it into the template,
     * or safely ignores it and inserts a blank string.
     *
     * @param   {object}    rec     The data object to look for values in
     * @param   {string}    key     A string containing a refence to a value to return
     *
     * @return  {string}    Either the value referenced in key, or a blank string if the value
     *                      did not exist.
     */
    lookup: function(rec, key) {
        var me = this,
            value = "";

        // If the key exists in rec, use its value
        if (rec.hasOwnProperty(key)) {
            value = rec[key];
        }
        else {
            // If the key is a nested value, determine if the nested value exists
            if (key.indexOf('.') > 0) {
                var context = rec,
                    keys = key.split('.'),
                    index = 0;

                while (context !== null && index < keys.length) {
                    if (index === keys.length - 1 && me.hasProperty(context, keys[index])) {
                        value = context[keys[index]];
                    }

                    context = context[keys[index++]];
                }
            }

            // In this instance, key may be an attribute of the prototype
            else if (me.hasProperty(rec, key)) {
                value = rec[key];
            }
        }

        return value;
    },


    /*
     * Capitalizes the entire string.
     *
     * @param   {string}    str     A string to be capitalized. ie: "FOO BAR BAZ"
     * @return  {string}    Lower-case string. ie: "foo bar baz"
     */
    lower: function(str) {
        return String(str).toLowerCase();
    },


    /*
     * Returns a filled template. One of the important features of this method is to
     *
     * @param   {object}    rec     Data to fill into the template
     * @return  {string}    A template string with data values filled in
     */
    make: function(rec){
        var me = this;

        // Used to make this backward compatible with older WUI ways of working with the Template object.
        if (!$.isPlainObject(rec)) {
            rec = me.data;
        }

        // The engine will break if we don't have both of these pieces
        if(!(rec && me.template)) {
            throw new Error('wui-smarty.js - Template engine missing data and/or html template.');
        }

        // Make the rec data available to the whole object without having to pass it from
        // method to method
        me.rec = rec;

        if (me.compiled === null) {
            // Since the template is not compiled, parse through it to get a build list to compile the template
            var retStr = me.parse();

            // Create a "compiled" function representing the parsed template from the build object
            me.compiled = me.compile();

            return retStr;
        }
        else {
            return me.compiled.call(me, rec);
        }
    },
    

    /**
     * Separates variables from string literals in the template and pushes them individually onto
     * the build array which is used to create the 'compiled' function. Also fills the template
     * string with values for the current record.
     *
     * @returns     String      The full template string with comments removed and values inserted.
     */
    parse: function() {
        var me = this,
            offsetLast = 0,
            tplCopy = me.template,
            commentsClean;

        // Remove comments. Comments are of the form {* ... *} and can be multi-line
        tplCopy = commentsClean = tplCopy.replace(/{\*[\w\s.,\/#!$%\^&\*;:{}=\-_`~()\[\]@]*\*}/g,'');
        
        // Fill values into the template
        tplCopy = tplCopy.replace(/{([\w+|:\. '"-]+)}/g,function(match, expr, offset) {
            // '/*The regex throws off code hilighting in Sublime. So killing it with a comment*/
            var flags = expr.split('|'),
                key = flags.shift(),
                value = "";
                
            // Add the string literal to the build array
            me.build.push(commentsClean.substr(offsetLast, offset - offsetLast));
            
            offsetLast = offset + expr.length + 2;
            
            // Add the key val to the build array
            me.build.push({key: key});
            
            // Lookup the value in the record
            value = me.lookup(me.rec, key);
            
            // Run any flags on the value before returning it
            value = me.applyFlags(value, flags);
            
            return value;
        });
        
        // Add the final string literal before returning tplCopy for the first outputted template
        me.build.push(commentsClean.substr(offsetLast));
        
        return tplCopy;
    },
    
    
    /*
     * Trims any set of custom characters off of the beginning and end of a string
     *
     * @param   {string}    str         The string to trim
     * @param   {string}    characters  An undelimited string of characters to trim off both sides of 
     *                                  the string
     * @param   {string}    flags       Optional. Regex flags that would be used in a javascript 
     *                                  regex. Defaults to 'g'.
     *
     * @return  {string}    A trimmed string
     */
    trimSpecial: function trim(str, characters, flags) {
        flags = flags || "g";
        
        if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
            throw new TypeError("argument must be string");
        }
        
        if (!/^[gi]*$/.test(flags)) {
            throw new TypeError("wui-smarty.js - Invalid regex flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
        }
        
        characters = characters.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
        
        return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
    },
    
    
    /*
     * Unescape a string for a given type of output.
     *
     * @param   {string}    str         The string to escape/unescape
     * @param   {string}    type        String containing the escape type ('html'|'javascript'|'json'|'url')
     *
     * @return  {string}    An unescaped string.
     */
    unescape: function(str, type){
        return this.escape(str, type, true);
    },
    
    
    /*
     * Makes the entire string lower-case.
     *
     * @param   {string}    str     A string to be capitalized. ie: "foo bar baz"
     *
     * @return  {string}    Capitalized string. ie: "FOO BAR BAZ"
     */
    upper: function(str) {
        return String(str).toUpperCase();
    }
};