/*! Wui 1.0
 * Copyright (c) 2013 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * http://www.geekinaday.com/wui/wui-1-1/license.html
 */


/**  This is a documentation engine that will traverse the objects loaded into memory on the current page. It utilizes JSDoc type comments typed at the beginning,
     *  but within the definition, of functions. It allows for the traversal of objects using the 'Explore' button, and shows the source code of functions with the
     *  'Source' button.
     *  
     *  @awesome
     *  
     *  @param      {object}    itm     A javascript variable to examine - Defaults to the window object
     *  @param      {string}    itmName A plain text description of 'itm' - Defaults to the .toString() method of the object passed to itm.
     *  
     *  @return     The item (itm) that was passed in
     *  
     *  @author     Stephen Nielsen (stephen.nielsen@usurf.usu.edu)
     *  @creation   2013-04-15
     *  @version    1.0
    */
function PageDocs(itm, itmName){    
    var itm     = itm || window,
        itmName = itmName || ((itm === window) ? '[window]' : itm.toString()),
        k       = Object.keys(itm).sort(),
        engine  = new Wui.tplt({tplt:'<div class="wui-doc-info-row"><div>{title}</div><div>{val}</div></div>'}),
        docWin  = new Wui.window({ title: itmName });
    
    $(k).each(function(obj){
        var type = typeof itm[k[obj]],
            name = k[obj],
            key = new Wui.o({el:$('<div class="wui-doc"><h3>' + name + '</h3></div>')});
            
            if(type == 'object' && itm[k[obj]] !== null && Object.keys(itm[k[obj]]).length > 0){
                var btn = new Wui.button({text:'Explore', cls:'field-btn', click:function(){PageDocs(itm[k[obj]], itmName + ' > ' + k[obj]);}});
                key.el.children('h3').append(btn.el);
            }else if(type == 'function') {
                var keyInfo = [],
                    code = itm[k[obj]].toString(),
                    codeWindow = null,
                    btn = new Wui.button({
                            text:   'Source', 
                            cls:    'field-btn', 
                            click:  function(){
                                        if(codeWindow.is(':visible'))   { codeWindow.fadeOut(); this.el.text('Source'); }
                                        else                           { codeWindow.fadeIn(); this.el.text('Hide'); }
                                    }
                });
                
                //append button
                key.el.children('h3').append(btn.el);
                
                //append documentation info
                code = code.replace(/\*([^\*]|[\r\n]|(\*+([^\*/]|[\r\n])))*\*+/,function(m){
                    //get parameters
                    m = m.replace(/\@param\s+\{([\w]+)\}\s+([\w]+)\s+([^\n]+)/g,function(mch,dt,varname,desc){
                        keyInfo.push({title:'Param', val:'<span class="wui-doc-var-name">'+varname+'</span><span class="wui-doc-var-type">' +dt+ '</span><span class="wui-doc-var-desc">' +desc+ '</span>'});
                        return '';
                    });
                    //return & throws
                    m = m.replace(/\@return\s+([^\n]+)/,function(mch,returns){ keyInfo.push({title:'Returns', val:returns}); return ''; })
                         .replace(/\@throws\s+([^\n]+)/,function(mch,returns){ keyInfo.push({title:'Throws', val:returns}); return ''; });
                    
                    // get Author Info
                    m = m.replace(/\@author\s+([^\n]+)/,function(m,author){
                        var email = null;
                        author = author.replace(/\(([^\)]+)\)/, function(mch,eml){ email = eml; return ''; });
                        var auth = (email !== null) ? '<a href="mailto:' +email+ '">' +$.trim(author)+ '</a>' : '<span>' +$.trim(author)+ '</span>';
                        keyInfo.push({title:'Author', val:auth});
                        return '';
                    });
                    
                    //get creation date & Flags
                    m = m.replace(/\@version\s+([^\n]+)/,function(mch,ver){ keyInfo.push({title:'Version', val:ver}); return ''; })
                         .replace(/\@creation\s+([^\n]+)/,function(mch,creationDate){ keyInfo.push({title:'Created', val:creationDate}); return ''; })
                         .replace(/\@deprecated/,function(mch){ key.el.children('h3').append('<span class="wui-doc-deprecated">deprecated</span>'); return ''; })
                         .replace(/\@private/,function(mch){ key.el.children('h3').append('<span class="wui-doc-private">private</span>'); return ''; })
                         .replace(/\@awesome/,function(mch){ key.el.children('h3').append('<span class="wui-doc-awesome">awesome</span>'); return ''; });
                    
                    key.el.append($('<p>').html(m.replace(/\*/g,'')));
                    return "* documentation *";
                });
                $(keyInfo).each(function(o){
                    engine.data = keyInfo[o];
                    key.el.append(engine.make());
                });
                
                //append source code
                key.el.append(codeWindow = $('<pre>').text(code));
            }else{
                key.el.append($('<pre>').addClass('show-val').text(itm[k[obj]]));
            }
        docWin.push(key);
    });
    
    return itm;
}