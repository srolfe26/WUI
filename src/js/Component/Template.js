/**The template engine is a simple way to create DOM elements based on data. A template string is provided that contains the
template html with the variable interspersed surrounded by '{}'. For example, a simple data template to display a list
of names may be: 

'<li>{name}</li>'

There are more complex operations that can be performed with a template. For example, suppose I had a set that contained
the data name, address, gender, and age. I can operate programmatically on the data by using the form '{()}', where 
everything inside the parenthesis is processed like a function. In essence, with the previously described data set, 
'{('some code here')}' is equivalent to the following functions, where the values of each row are passed in:

function(name, address, gender, age){
    return 'some code here';
};

If I wanted to display this information in a table, but I didn't want to display the age if it was over 20. I also 
wanted to append 'Mr.', or 'Ms.' depending on the gender.My template could take the following form:

'<tr>' +
    '<td>{( ((gender == "female") ? "Ms. " : "Mr. ") + name )}</td>' +
    '<td>{( (parseInt(age) > 20) ? '-' : age )}</td>' +
    '<td>{address}</td>' +
'</tr>'
@preserve_format
*/
Wui.Template = function(args){ $.extend(this,args); };
Wui.Template.prototype = {
    /** The HTML template that the data will fit into. Null value will cause an error to be thrown. Specification required. */
    template:   null,
    
    /** A single record to be applied to the template. Null value will cause an error to be thrown. Specification required.  */
    data:       null,
    
    /**
    @param {number} [index] An optional number to make an index available to the record
    @return A jQuery object containing the template paired with its data
    Creates the template 
    */
    make:       function(index){
                    var me = this;
                    if(me.data && me.template){
                        var tplCopy = me.template;
                        
                        if($.isNumeric(index))    $.extend(me.data,{wuiIndex:index});
                        
                        return $(
                            tplCopy
                            // replaces straight values
                            .replace(/\{(\w*)\}/g,function(){
                                var key = arguments[1];
                                return (me.data[key] !== undefined) ? me.data[key] : "";
                            })
                            // accounts for complex expressions
                            .replace(/\{\((.*?)\)\}/g,function(){
                                var fn = arguments[1], keys = Wui.getKeys(me.data), vals = [], i = 0;

                                // Adds the full record to be available from the datalist
                                keys.push('wuiRecord');
                                
                                // Removes any key values that may start with a number and ruin the engine
                                for(i = keys.length - 1; i >= 0; i--)   if(keys[i].match(/\b\d+/g)) keys.splice(i,1);

                                // fill arrays of keys and their values and make sure they are in the same order
                                for(i = 0; i < keys.length; i++)        vals.push(me.data[keys[i]]);

                                // // Adds the full record to be available from the datalist
                                vals.push(me.data);
                                
                                // add the passed in conditional as the body of the function created below
                                keys.push("return " + fn);
                                
                                // create function that will perform the conditional statement
                                var newFn = Function.apply(null,keys);
                                
                                // call the function with the keys as variables in scope
                                return newFn.apply(null,vals);
                            })
                        );
                    }
                    throw new Error('Wui.js - Template engine missing data and/or template.');
                }
};