/*! Wui Lite
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.1/license.html
 */

(function($,_w) {

// Base object for handling documentation
_w.DocObj = function(args){ 
    $.extend(this, {
        target:     $('body'),
        fileList:   ['../core.js'],
        namespace:  'Wui'
    },args);

    this.docsGathered = $.Deferred();

    this.init();
};
_w.DocObj.prototype = {
    /**
        Fires 'getFiles' to get the documentation targets specified in 'fileList'.
    */
    init:       function(){
                    this.getFiles();
                },

    getAllDocs: function(){

                },

    /**
        Gets all of the files in 'fileList' and creates a record of the success in getting the files
        contained in 'deferredCollection'. Proceeds to call 'process' when the requested files have
        been acquired.
    */
    getFiles:   function() {
                    var me = this;

                    // List of promises that will later be repurposed to show status of ajax requests
                    me.deferredCollection = [];

                    me.successCount = 0;

                    me.fileList.forEach(function(itm,i,arry) {
                        var fileItemDeferredObj = $.Deferred();

                        // Create a deferred that can be resolved on complete
                        // otherwise the failure of a resource will mess up all of them
                        me.deferredCollection.push(fileItemDeferredObj);

                        $.ajax({
                            url:        itm,
                            dataType:   'text',
                            cache:      false,
                            complete:   function(xhr,status) {
                                            var xhrResult = {
                                                uri:    itm,
                                                success: (status == 'success')
                                            };

                                            if(xhrResult.success) {
                                                $.extend(xhrResult,{ code: xhr.responseText });
                                                me.successCount++;
                                            }
                                            else {
                                                $.extend(xhrResult,{ error: xhr.statusText });
                                            }

                                            fileItemDeferredObj.resolve(xhrResult);
                                        }
                        });
                    });

                    $.when.apply( $, me.deferredCollection ).done(function() {
                        // Repurpose the list to show status
                        me.deferredCollection = arguments;

                        me.process();

                        // Signals that all requests have been processed for this document
                        me.docsGathered.resolve(me.deferredCollection);
                    });
                },
    process:    function(){
                    var me = this;

                    if(me.successCount < me.fileList.length) {
                        // Fire some less than 100% message
                        console.log('Didn\'t process all files.');
                    }

                    if(me.successCount > 0) {
                            // Namespace items
                        var namespaceItm = me.namespace + '\\.[\\w]+',
                            // Gets top level items with documentation
                            documentedL0 = new RegExp('(\\/\\*\\*((?:[^\\*]|(?:\\*+(?:[^\\*/])))*)\\*+\\/)[\\s]*(' + me.namespace + '\\.[\\S]+)', 'g'),
                            // Undocumented level 0 items
                            noDocL0 = new RegExp('[\\n]' + namespaceItm, 'g'),
                            // Get documented methods with preceeding javadoc comments
                            memberMethods = /(\/\*\*((?:[^\*]|(?:\*+(?:[^\*/])))*)\*+\/[\s]*([^\:]+)\:[\s]*function)/g,
                            // Get documented configs with preceeding javadoc comments
                            // The similar regex needs to run after getting methods so that it doesn't pick up the same stuff
                            memberConfigs = /\/\*\*((?:[^\*]|(?:\*+(?:[^\*/])))*)\*+\/[\s]*([^\:]+)\:[\s]*([^\,^\s]+)/g;

                        // Break the code into objects, methods, and configs
                        _.each(me.deferredCollection,function(itm,i){
                            if(itm.success){
                                
                                itm.members = {};
                                
                                // Get documented Items
                                itm.code.replace(documentedL0,function(){
                                    var comment = arguments[2],
                                        itemL0  = arguments[3].replace(me.namespace + '.', '');

                                    itm.members[itemL0] = {
                                        documented: true,
                                        comment:    comment
                                    };
                                });

                                // Get undocumented Items
                                itm.code.replace(noDocL0,function(){
                                    var itemL0 = $.trim(arguments[0]).replace(me.namespace + '.', '');
                                    
                                    if(typeof itm.members[itemL0] == 'undefined'){
                                        itm.members[itemL0] = {
                                            documented: false
                                        };
                                    }
                                });

                                // Get the code block of each member object, if it exists, and look for extensions
                                _.each(itm.members,function(member,i){
                                    var itmDetail = me.getBlock(itm.code, me.namespace + '.' + i),
                                        tmpCode;

                                    // Establish Item Attributes
                                    member.name = me.namespace + '.' + i;
                                    member.ancestors = [];
                                    member.methods = [];
                                    member.configs = [];

                                    if(itmDetail.success){
                                        member.code = tmpCode = itmDetail.code;
                                        
                                        // Check whether this object is an extension of others
                                        itmDetail.between.replace(new RegExp(namespaceItm,'g'),function() {
                                            member.ancestors.push( arguments[0].replace(me.namespace + '.', '') );
                                        });

                                        // Parse through the code of each item and pull out methods and configs
                                        tmpCode = tmpCode.replace(memberMethods, function(){
                                            var name = $.trim(arguments[3]),
                                                detail = me.getBlock( tmpCode, name, name + '\\:[\\s]*function' );

                                            member.methods.push({
                                                comment:    arguments[2],
                                                name:       name,
                                                code:       (detail.success) ? detail.code : '',
                                                documented: true
                                            });
                                            
                                            return '';
                                        });
                                        
                                        // Get configs - the similar regex will not match the functions because they were removed in the last step
                                        tmpCode = tmpCode.replace(memberConfigs, function(){
                                            
                                            if(arguments[3].match(/\bfunction\b/) === null){
                                                member.configs.push({
                                                    comment:    arguments[1],
                                                    name:       arguments[2].replace('//',''),
                                                    defaultVal: arguments[3],
                                                    documented: true
                                                });
                                            }

                                            return '';
                                        });

                                        // Get undocumented methods and configs wrapped in a while loop to eliminate matches
                                        // as they are found so that configs inside methods/values aren't picked up
                                        while(tmpCode.match(/[\n]([^\n,^:]+):[\s]*([^\,^\n]+)/) !== null){
                                            var foundItm;

                                            tmpCode = tmpCode.replace(/[\n]([^\n,^:]+):[\s]*([^\,^\n]+)/,function(){
                                                var name = $.trim(arguments[1]),
                                                    defaultVal = $.trim(arguments[2]);

                                                if(defaultVal.match(/\bfunction\b/) === null) {
                                                    member.configs.push(foundItm = {
                                                        name:       name,
                                                        defaultVal: defaultVal,
                                                        documented: false
                                                    });
                                                } 
                                                else {
                                                    var detail = me.getBlock( tmpCode, name, name + '\\:[\\s]*function' );

                                                    member.methods.push(foundItm = {
                                                        name:       name,
                                                        code:       (detail.success) ? detail.code : '',
                                                        documented: false
                                                    });
                                                }
                                                
                                            });

                                            // Remove function blocks
                                            if(typeof foundItm.code !== 'undefined') {
                                                // Because the previous 'replace' takes the opening brace,
                                                // trim it off the front of the code to use in this replace
                                                tmpCode = tmpCode.replace($.trim(foundItm.code.substring(1)), '');
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                    else {
                        // Admit defeat. There's nothing more to do.
                        console.log('Total Failure');
                    }
                },
    /**
        @param  string  filetext    The text containing the code block associated with 'obj'
        @param  string  obj         The name of the object or method naming the code block 
        Using 
    */
    getBlock:   function(filetext, obj, regEx){
                    var me = this, 
                        obj = obj.replace('.','\\.'), 
                        objCode = '', 
                        betweenBrace = '', 
                        success = false;
                    
                    try {
                        regEx = (typeof regEx !== 'undefined') ? new RegExp(regEx,'g') : new RegExp(obj+ " \=|" + obj + '\.prototype \=', 'g');    
                    } catch(e) {
                        return {success:success};
                    }

                    filetext.replace(regEx,function(match,matchStart){
                        var endOfMatch  = matchStart + match.length,
                            nextCR      = filetext.indexOf('\n', endOfMatch);
                            firstBrace  = filetext.indexOf('{', endOfMatch);

                        // indicates that there was in fact a match
                        success = true;

                        // gets what's between the match and the opening of the object defintion
                        // allowing the code to catch extended objects
                        if(nextCR > firstBrace) {
                            betweenBrace = filetext.substr(matchStart + match.length,firstBrace - (matchStart + match.length)); 
                        }
                        
                        objCode += me.braceCount(filetext.substr(firstBrace,filetext.length - firstBrace)) + '\n\n';            
                        return match;
                    });

                    return {success:success, code:objCode, between:betweenBrace};
                },
    braceCount: function(s){
                    var i = 1,
                        braceCount = 1;    // The beginning of the passed in string ought to start with a bracket, this assumption is vital to the working of the method
                    
                    for( ; i < s.length; i++){
                        if(s[i] === '{')         braceCount++;
                        if(s[i] === '}')          braceCount--;
                        if(braceCount === 0)    break;
                    }
                    
                    return s.substr(0, i + 1);
                }
};

}(jQuery,window[_wuiVar]));