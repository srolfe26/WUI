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

    this.init();
};
_w.DocObj.prototype = {
    /**
        Fires 'getFiles' to get the documentation targets specified in 'fileList'.
    */
    init:       function(){
                    this.getFiles();
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
                    });
                },
    process:    function(){
                    var me = this;

                    if(me.successCount < me.fileList.length) {
                        // Fire some less than 100% message
                        console.log('Didn\'t process all files.');
                    }

                    if(me.successCount > 0) {
                            // Gets top level items with documentation
                        var documentedL0 = new RegExp('(\\/\\*\\*((?:[^\\*]|(?:\\*+(?:[^\\*/])))*)\\*+\\/)[\\s]*(' + me.namespace + '\\.[\\S]+)', 'g'),
                            // Undocumented level 0 items
                            noDocL0 = new RegExp('[\\n]' + me.namespace + '\\.[\\w]+', 'g'),
                            // Get documented methods like '/** ...docs... */ method: function'
                            memberMethods = /(\/\*\*((?:[^\*]|(?:\*+(?:[^\*/])))*)\*+\/[\s]*([^\:]+)\:[\s]*function)/g,
                            // Get documented configs like '/** ...docs... */ config: 123'
                            // The similar regex needs to run after getting methods so that it doesn't pick up the same stuff
                            memberConfigs = /\/\*\*((?:[^\*]|(?:\*+(?:[^\*/])))*)\*+\/[\s]*([^\:]+)\:[\s]*([^\,^\s]+)/g;

                        
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

                                _.each(itm.members,function(member,i){
                                    // Get the code block of the member object if it exists
                                    me.getBlock(itm.code, me.namespace + '.' + i);
                                    // console.log('MEMBER: ',i,'DOCUMENTED: ',member.documented);
                                });
                            }
                        });

                    }
                    else {
                        // Admit defeat. There's nothing more to do.
                        console.log('Total Failure');
                    }
                },
    getBlock:   function(filetext, obj){
                    var me = this, obj = obj.replace('.','\\.'), objCode = '', objIntro = '', betweenBrace = '', success = false;
                    
                    filetext.replace(new RegExp(obj+ " \=|" + obj + '\.prototype \=', "g"),function(match,comment,matchStart){
                        console.log(arguments);
                        // var endOfMatch = matchStart + match.length,
                        //     firstBrace = filetext.indexOf('{', endOfMatch);
                        
                        // // indicates that there was in fact a match
                        // success = true;
                        // // gets what's between the match and the opening of the object deifintion
                        // // allowing the code to catch extended objects
                        // betweenBrace = filetext.substr(matchStart + match.length,firstBrace - (matchStart + match.length)); 
                        
                        // if($.trim(comment).length > 0)
                        //     objIntro = comment;
                        // objCode += me.braceCount(filetext.substr(firstBrace,filetext.length - firstBrace)) + '\n\n';            
                        // return match;
                    });

                    return {success:success, code:objCode, intro:objIntro, between:betweenBrace};
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