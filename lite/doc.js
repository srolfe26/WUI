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
                                    $.extend(member,{
                                        name:       me.namespace + '.' + i,
                                        ancestors:  [],
                                        methods:    [],
                                        configs:    []
                                    });

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
                },
    parseJavaDoc:function(itm){
                    var jd = itm.comment
                        htmlSafeText = '',
                        keepPre = false;

                    // Parse JavaDoc Comments on Main Item
                    if(typeof itm.parsed == 'undefined' && itm.documented === true){
                        itm.parsed = {
                            params:     [],
                            returns:    [],
                            authors:    [],
                            'throws':   [],
                            version:    null,
                            creation:   null,
                            deprecated: false,
                            'private':  false,
                            required:   false,
                            awesome:    false,
                            eventhook:  false,
                            text:       $('<div>')
                        };

                        jd = jd
                        //get parameters
                        .replace(/\@param\s+\{([^\}]+)\}\s+([\[,\w\]\.]+)\s+([^\n]+)/g,function(mch,dt,varname,desc){
                            itm.parsed.params.push({
                                data_typet:     dt, 
                                description:    desc, 
                                var_name:       varname
                            });

                            return '';
                        })
                        //return & throws
                        .replace(/\@return\s+([^\n]+)/,function(){ 
                            itm.parsed.returns.push({
                                description: arguments[1]
                            }); 

                            return ''; 
                        })
                        .replace(/\@throws\s+([^\n]+)/,function(){ 
                            itm.parsed['throws'].push({
                                description: arguments[1]
                            }); 

                            return ''; 
                        })

                        // get Author Info
                        .replace(/\@author\s+([^\n]+)/,function(m,author){
                            var email = null,
                                author = $.trim(author.replace(/\(([^\)]+)\)/, function(mch,eml){ email = eml; return ''; }));
                            
                            itm.parsed.authors.push({
                                author:     author,
                                email:      email
                            });

                            return '';
                        })
                        // //get creation date & Flags
                        .replace(/\@version\s+([^\n]+)/,function(mch,ver){ keyInfo.push({title:'Version', val:ver, dt:'', varname:''}); return ''; })
                        .replace(/\@creation\s+([^\n]+)/,function(mch,creationDate){ keyInfo.push({title:'Created', val:creationDate, dt:'', varname:''}); return ''; })
                        .replace(/\@deprecated/,function(){ 
                            itm.parsed.deprecated = true;

                            return '';
                        })
                        .replace(/\@private/,function(){ 
                            itm.parsed.private = true;

                            return '';
                        })
                        .replace(/\@required/,function(){ 
                            itm.parsed.required = true;

                            return '';
                        })
                        .replace(/\@awesome/,function(){ 
                            itm.parsed.awesome = true;

                            return '';
                        })
                        .replace(/\@eventhook/,function(){ 
                            itm.parsed.eventhook = true;

                            return '';
                        });

                        // Load the code into a <pre> tag
                        htmlSafeText = _w.DocObj.prototype.HTMLifyCode(jd.replace(/\*/g,''),false);

                        // Determine whether to keep the pre formatting 
                        htmlSafeText = htmlSafeText.replace(/\@preserve_format/,function(mch){ keepPre = true; return ''; });
                        pre = $(htmlSafeText);

                        // Convert to paragraphs after a double line break
                        if(!keepPre){
                            var paragraphs = jd.split(/([\n\r]{2}?\s*)/g);

                            paragraphs.forEach(function(txt,i){
                                if($.trim(txt).length > 0) {
                                    itm.parsed.text.append( $('<p>').text(txt) );
                                }
                            });
                        }else{
                            itm.parsed.text.append(pre);
                        }

                        // Process any child items
                        if(itm.configs){
                            itm.configs.forEach(function(cfg){
                                _w.DocObj.prototype.parseJavaDoc(cfg);
                            });
                            itm.methods.forEach(function(method){
                                _w.DocObj.prototype.parseJavaDoc(method);
                            });
                        }
                        // Remove code that was only used to get the child items
                        else {
                            delete itm.code;
                        }
                     
                        // console.log(itm);
                    }
                    // return key;
                },
    HTMLifyCode: function(c,codeColoring,lang){
                    var ws = '',
                        e = document.createElement('i'),
                        languageClass = 'language-' + (lang || 'javascript'),
                        addClass = (codeColoring !== false) ? 'class="' + languageClass + '"' : '',
                        r;

                    // Remove extraneous whitespace
                    c.replace(/(\n[\s]+\}[\s]*$)/g,function(ws_match){
                        ws = ws_match.split('}')[0];
                    });
                    // Remove the newline and then put one on the beginning to ensure that one is there
                    c = c.replace(new RegExp('\n' + ws.replace('\n',''),'g'),'\n');

                    r = '<pre '+addClass+ '><code '+addClass+ '>' + $.trim(_w.DocObj.prototype.escapeTags(c)) + '</code></pre>';
                        
                    // replace tabs with 4 spaces where the browser doesn't support tab size
                    if(e.style.tabSize !== '' && e.style.MozTabSize !== '' && e.style.oTabSize !== '')    r.replace(/\t/g,'    ');
                    
                    return r;
                },
    escapeTags: function(str){
                    return str.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                }
};

}(jQuery,window[_wuiVar]));