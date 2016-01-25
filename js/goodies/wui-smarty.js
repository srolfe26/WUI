/**
 * Wui.Smarty is a way to create DOM elements based on data. Wui.Smarty should be considered a replacement to Wui.Template
 * in that it addresses Wui.Template's vulnerabilities, namely:
 *      - The risk of XSS attack through use of inline functions
 *      - Inability to escape HTML and Javascript values
 *      - Inability to access nested variables in a fail-safe manner
 * 
 * Wui.Smarty syntactically follows the familiar usage of placing variables in the template surrounded by braces (or curly
 * brackets). Data is set as a parameter to the make() method, and make() always returns a string. Functions are available
 * via a 'function' flag that will be described below. Additionaly, it borrows many features and syntax from the PHP 
 * server-side templating system.
 *      
 *      (http://www.smarty.net/)
 *      
 * For example, a simple template may look like this:
 * 
 *      '<p>{firstname}</p>'
 *      
 * An only slighty more complex example would be as follows, notice the nested variable reference:
 * 
 *      '<p>{name.last}, {name.first}</p>'
 * 
 * As usual, values which don't exist will be returned as empty strings, however values that are set with a javascript
 * 'undefined' object will return 'undefined'.
 * 
 * Another example shows the smarty syntax now, with the addition of flags:
 * 
 *      '<p>{name.last|upper}, {name.first|capitalize}</p>'
 *      
 * Flags are processed left to right as added to the template. Here we protect against possible XSS injection:
 * 
 *      '<p>{name.last|upper|escape:html}, {name.first|capitalize|escape:html}</p>'
 *      
 * Using functions to process parameters is possible, and is done in a strict manner that closes a potential
 * attack vector. Rather than effectively eval'ing code that is passed into the template, processing functions are
 * member methods of the template, and called with fixed parameters as in the following example:
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
 *      template = new Wui.Smarty({
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
 * Notice in this example, values processed by the function are parameters to the function flag, not named in the place
 * for variable names. This pattern allows for safer functions, defined with comments, and allows for more complex 
 * operations including the use of closures. Globally defined methods can be referenced either directly or within 
 * methods on the template config.
 * 
 * Avaialble modifiers/flags are:
 * 
 *      capitalize  Will capitalize the first letter of every word in the string
 *      
 *      default     Accepts a parameter to use as a default value if variable is a blank string. Example: {undefinedVar|default:"Default Text"}
 *      
 *      escape      Used to encode special characters. Accepts 'html', 'javascript', 'json' and 'url'
 *      
 *      function    Will call a function within the scope of the template. Parameters are the function name, and then arguments to pass. 
 *                  Example {|function:funcName:param1Name:param2Name:...}
 *                  
 *      lower       Equivalent to toLowerCase()
 *      
 *      unescape    Used to decode, countering the effect of the escape modifier (Accepts 'html', 'javascript', 'json' and 'url')
 *      
 *      upper       Equivalent to toUpperCase()
 *
 */

var Wui = Wui || {};


Wui.Smarty = function(args) {
    $.extend(this, {
        html:       ''
    }, args);
};


Wui.Smarty.prototype = {
                    /*
                     * Given an array of flags, applies them on the value passed in
                     *
                     * @param   {string}    str     A string that will have the flags applied
                     * @param   {array}     flags   An array of flags that will be parsed and functions applied
                     *
                     * @return  {string}    The string passed in as 'str' with the flag functions applied
                     */
    applyFlags:     function(str, flags){
                        var me = this;

                        for (var index = 0; index < flags.length; index++) {
                            var params = flags[index].split(':')
                                  // Replaces the first element (which is the name of the flag), with the string to be
                                  // modified. Then splice returns the flag in an array, so get the first element. 
                                , flag;

                            // Remove quotes from around params, they're already a string at this point
                            for (var i = 1; i < params.length; i++) {
                                params[i] = me.trimSpecial(params[i],'"\'');
                            }

                            // The flag is the first parameter
                            flag = params.shift();

                            switch (flag) {
                                case 'function':
                                    // Function is a JS keyword and requires special parsing
                                    str = me.js_function.apply(me, params);
                                    break;
                                case 'default' :
                                    // Default is a keyword in javascript. Don't break, now that flag is modified,
                                    // run the default behavior
                                    flag = 'defaultVal';
                                default:
                                    // Add the string to be modified as the first parameter
                                    params.splice(0,0,str);
                                    
                                    // Run the function with all parameters
                                    str = me[flag].apply(me, params);
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
    capitalize:     function(str) {
                        return String(str).replace(/\w\S*/g, function(txt) {
                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                        });
                    },


                    /*
                     * Returns the string passed in, or the default string if the value is blank.
                     *
                     * @param   {string}    str     Any string
                     * @param   {string}    default A value to replace a blank string with
                     *
                     * @return  {string}    The value string passed in, or the default value
                     */
    defaultVal:     function(str, dflt) {
                        // A blank or undefined string will evaluate to false in JS
                        if (str) {
                            return str;
                        }

                        return dflt;
                    },


                    // Characters that ought to be escaped in HTML
    escapeHTML:     {
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
    escapeJS:       {
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

                     * @return  {string}    An escaped string.
                     */
    escape:         function(str, type, unescape) {
                        var me = this
                            , unescape = unescape || false
                            , actions = {
                                maps:       function(baseMap) {
                                                var map = unescape ? me.invert(baseMap) : baseMap
                                                    ,regex = new RegExp('[' + me.getKeys(map).join().replace(/\//,'\\/') + ']', 'g');

                                                return String(str).replace(regex, function(match) {
                                                    return map[match];
                                                });
                                            },
                                'json':     function() {
                                                var action = unescape ? 'parse' : 'stringify';
                                                return JSON[action](str);
                                            },
                                url:        function() {
                                                var action = unescape ? 'decodeURI' : 'encodeURI';
                                                return JSON[action](str);
                                            }
                            };

                        $.extend(actions, {
                            html:       function(){ return actions.maps(me.escapeHTML); },
                            javascript: function(){ return actions.maps(me.escapeJS); }
                        });

                        if(typeof actions[type] === 'function') {
                            return actions[type]();
                        }
                        else {
                            return actions['html']();
                        }
                    },


                    /*
                     * Returns the keys of an object as an alphabetically sorted array.
                     *
                     * @param   {object}    obj     Any plain object. Example:    
                     *                                  {
                     *                                      asdf: 1,
                     *                                      zxcv: 2,
                     *                                      qwer: 3
                     *                                  }
                     * @return  {array}     Sorted array of object keys. i.e: ['asdf', 'qwer', 'zxcv'].
                     */
    getKeys:        function(obj){
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
    hasProperty:    function(obj, property) {
                        return obj != null && typeof obj === 'object' && (property in obj);
                    },


                    /*
                     * Inverts an object so that its keys are its values, and its values are its keys.
                     * Complex values will be dropped (functions, arrays, and objects). If a non-object,
                     * or an empty object is passed in, an empty object will be returned.
                     *
                     * @param   {object}    obj     The object to be inverted.
                     * @return  {object}    The passed in object copied and inverted, or an empty object.
                     */
    invert:         function(obj) {
                        var retObj = {};

                        if ($.isPlainObject(obj) && !$.isEmptyObject(obj)) {
                            $.each(obj, function(key, value){
                                // Values that are not simple will be dropped from the new object
                                if (!$.isArray(value) && !$.isPlainObject(value) && !$.isFunction(value)) {
                                    retObj[value] = key;
                                }
                            })
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
    js_function:    function(fn){
                        var me = this
                            // Function name is the first argument, function parameters are all afterward
                            , index = 1
                            , paramVals = [];
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
    lookup:         function(rec, key) {
                        var me = this
                            , value = "";

                        // If the key exists in rec, use its value
                        if (rec.hasOwnProperty(key)) {
                            value = rec[key];
                        } 
                        else {
                            // If the key is a nested value, determine if the nested value exists
                            if (key.indexOf('.') > 0) {
                                var context = rec
                                    , keys = key.split('.')
                                    , index = 0;

                                while (context != null && index < keys.length) {
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
    lower:          function(str) {
                        return String(str).toLowerCase();
                    },


                    /*
                     * Returns a filled template. One of the important features of this method is to 
                     *
                     * @param   {object}    rec     Data to fill into the template
                     * @return  {string}    A template string with data values filled in
                     */
    make:           function(rec){
                        var me = this
                            , tplCopy = me.html;
                    
                        // The engine will break if we don't have both of these pieces
                        if(!(rec && me.html)) {
                            throw new Error('Wui.js - Template engine missing data and/or html template.');
                        }

                        // Make the rec data available to the whole object without having to pass it from
                        // method to method
                        me.rec = rec;

                        // Remove comments. Comments are of the form {* ... *} and can be multi-line
                        tplCopy = tplCopy.replace(/{\*[\w\s.,\/#!$%\^&\*;:{}=\-_`~()\[\]@]*\*}/g,'');
                        
                        // Fill values into the template
                        return tplCopy.replace(/{([\w+|:\. '"]+)}/g,function() {
                            // '/*The regex throws off code hilighting in Sublime. So killing it with a comment*/
                            var match = arguments[1]
                                , flags = match.split('|')
                                , key = flags.shift()
                                , value = "";
                                
                            // Lookup the value in the record
                            value = me.lookup(rec, key);
                                
                            // Run any flags on the value before returning it
                            value = me.applyFlags(value, flags);

                            return value;
                        });
                    },


                    /*
                     * Trims any set of custom characters off of the beginning and end of a string
                     *
                     * @param   {string}    str         The string to trim
                     * @param   {string}    characters  An undelimited string of characters to trim off both sides of the string
                     * @param   {string}    flags       Optional. Regex flags that would be used in a javascript regex. Defaults to 'g'.

                     * @return  {string}    A trimmed string
                     */
    trimSpecial:    function trim(str, characters, flags) {
                        flags = flags || "g";

                        if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
                            throw new TypeError("argument must be string");
                        }

                        if (!/^[gi]*$/.test(flags)) {
                            throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
                        }

                        characters = characters.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");

                        return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
                    },


                    /*
                     * Unescape a string for a given type of output.
                     *
                     * @param   {string}    str         The string to escape/unescape
                     * @param   {string}    type        String containing the escape type ('html'|'javascript'|'json'|'url')

                     * @return  {string}    An unescaped string.
                     */
    unescape:       function(str, type){
                        return this.escape(str, type, true);
                    },


                    /*
                     * Makes the entire string lower-case.
                     *
                     * @param   {string}    str     A string to be capitalized. ie: "foo bar baz"
                     * @return  {string}    Capitalized string. ie: "FOO BAR BAZ"
                     */
    upper:          function(str) {
                        return String(str).toUpperCase();
                    }
};