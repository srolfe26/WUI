/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license/sourceMappingURL=jquery-1.10.2.min.map */
(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.2",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=st(),k=st(),E=st(),S=!1,A=function(e,t){return e===t?(S=!0,0):0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=mt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+yt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,n,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function lt(e){return e[b]=!0,e}function ut(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ct(e,t){var n=e.split("|"),r=e.length;while(r--)o.attrHandle[n[r]]=t}function pt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function dt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return lt(function(t){return t=+t,lt(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.defaultView;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),i&&i.attachEvent&&i!==i.top&&i.attachEvent("onbeforeunload",function(){p()}),r.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),r.getElementsByTagName=ut(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ut(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=K.test(n.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ut(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=K.test(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ut(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=K.test(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return pt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?pt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:lt,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=mt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?lt(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:lt(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?lt(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:lt(function(e){return function(t){return at(e,t).length>0}}),contains:lt(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:lt(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},o.pseudos.nth=o.pseudos.eq;for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=ft(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=dt(n);function gt(){}gt.prototype=o.filters=o.pseudos,o.setFilters=new gt;function mt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function yt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function vt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function bt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function wt(e,t,n,r,i,o){return r&&!r[b]&&(r=wt(r)),i&&!i[b]&&(i=wt(i,o)),lt(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||Nt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:xt(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=xt(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=xt(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function Tt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=vt(function(e){return e===t},s,!0),p=vt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[vt(bt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return wt(l>1&&bt(f),l>1&&yt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&Tt(e.slice(l,r)),i>r&&Tt(e=e.slice(r)),i>r&&yt(e))}f.push(n)}return bt(f)}function Ct(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=xt(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?lt(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=mt(e)),n=t.length;while(n--)o=Tt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Ct(i,r))}return o};function Nt(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function kt(e,t,n,i){var a,s,u,c,p,f=mt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&yt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}r.sortStable=b.split("").sort(A).join("")===b,r.detectDuplicates=S,p(),r.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(f.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||ct("type|href|height|width",function(e,n,r){return r?t:e.getAttribute(n,"type"===n.toLowerCase()?1:2)}),r.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||ct("value",function(e,n,r){return r||"input"!==e.nodeName.toLowerCase()?t:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||ct(B,function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&i.specified?i.value:e[n]===!0?n.toLowerCase():null}),x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!l||i&&!u||(t=t||[],t=[e,t.slice?t.slice():t],n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)}),n=s=l=u=r=o=null,t
}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,r=0,o=x(this),a=e.match(T)||[];while(t=a[r++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);
u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){nn(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);

/*! jQuery UI - v1.10.3 - 2013-11-27  http://jqueryui.com Copyright 2013 jQuery Foundation and other contributors; Licensed MIT 
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.sortable.js*/
(function(e,t){function i(t,i){var s,n,r,o=t.nodeName.toLowerCase();return"area"===o?(s=t.parentNode,n=s.name,t.href&&n&&"map"===s.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&a(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&a(t)}function a(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var s=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,a){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),a&&a.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var a,s,n=e(this[0]);n.length&&n[0]!==document;){if(a=n.css("position"),("absolute"===a||"relative"===a||"fixed"===a)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++s)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,a){return!!e.data(t,a[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var a=e.attr(t,"tabindex"),s=isNaN(a);return(s||a>=0)&&i(t,!s)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,a){function s(t,i,a,s){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,a&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===a?["Left","Right"]:["Top","Bottom"],r=a.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+a]=function(i){return i===t?o["inner"+a].call(this):this.each(function(){e(this).css(r,s(this,i)+"px")})},e.fn["outer"+a]=function(t,i){return"number"!=typeof t?o["outer"+a].call(this,t):this.each(function(){e(this).css(r,s(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,a){var s,n=e.ui[t].prototype;for(s in a)n.plugins[s]=n.plugins[s]||[],n.plugins[s].push([i,a[s]])},call:function(e,t,i){var a,s=e.plugins[t];if(s&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(a=0;s.length>a;a++)e.options[s[a][0]]&&s[a][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var a=i&&"left"===i?"scrollLeft":"scrollTop",s=!1;return t[a]>0?!0:(t[a]=1,s=t[a]>0,t[a]=0,s)}})})(jQuery);(function(e,t){var i=0,s=Array.prototype.slice,a=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(n){}a(t)},e.widget=function(i,s,a){var n,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],n=u+"-"+i,a||(a=s,s=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:a.version,_proto:e.extend({},a),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(a,function(i,a){return e.isFunction(a)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,n=this._superApply;return this._super=e,this._superApply=t,i=a.apply(this,arguments),this._super=s,this._superApply=n,i}}(),t):(l[i]=a,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:n}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var a,n,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(a in r[o])n=r[o][a],r[o].hasOwnProperty(a)&&n!==t&&(i[a]=e.isPlainObject(n)?e.isPlainObject(i[a])?e.widget.extend({},i[a],n):e.widget.extend({},n):n);return i},e.widget.bridge=function(i,a){var n=a.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,a=e.data(this,n);return a?e.isFunction(a[r])&&"_"!==r.charAt(0)?(s=a[r].apply(a,h),s!==a&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,n);t?t.option(r||{})._init():e.data(this,n,new a(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var a,n,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},a=i.split("."),i=a.shift(),a.length){for(n=o[i]=e.widget.extend({},this.options[i]),r=0;a.length-1>r;r++)n[a[r]]=n[a[r]]||{},n=n[a[r]];if(i=a.pop(),s===t)return n[i]===t?null:n[i];n[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,a){var n,r=this;"boolean"!=typeof i&&(a=s,s=i,i=!1),a?(s=n=e(s),this.bindings=this.bindings.add(s)):(a=s,s=this.element,n=this.widget()),e.each(a,function(a,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=a.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?n.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var a,n,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],n=i.originalEvent)for(a in n)a in i||(i[a]=n[a]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,a,n){"string"==typeof a&&(a={effect:a});var r,o=a?a===!0||"number"==typeof a?i:a.effect||i:t;a=a||{},"number"==typeof a&&(a={duration:a}),r=!e.isEmptyObject(a),a.complete=n,a.delay&&s.delay(a.delay),r&&e.effects&&e.effects.effect[o]?s[t](a):o!==t&&s[o]?s[o](a.duration,a.easing,n):s.queue(function(i){e(this)[t](),n&&n.call(s[0]),i()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,a=1===i.which,n="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return a&&!n&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(e){e.widget("ui.draggable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var i=this.options;return this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(e(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,i){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!i){var a=this._uiHash();if(this._trigger("drag",t,a)===!1)return this._mouseUp({}),!1;this.position=a.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,a=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(a=e.ui.ddmanager.drop(this,t)),this.dropped&&(a=this.dropped,this.dropped=!1),"original"!==this.options.helper||e.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!a||"valid"===this.options.revert&&a||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,a)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1):!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(t){var i=this.options,a=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return a.parents("body").length||a.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),a[0]===this.element[0]||/(fixed|absolute)/.test(a.css("position"))||a.css("position","absolute"),a},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,a,s=this.options;return s.containment?"window"===s.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):"document"===s.containment?(this.containment=[0,0,e(document).width()-this.helperProportions.width-this.margins.left,(e(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):s.containment.constructor===Array?(this.containment=s.containment,undefined):("parent"===s.containment&&(s.containment=this.helper[0].parentNode),i=e(s.containment),a=i[0],a&&(t="hidden"!==i.css("overflow"),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(a.scrollWidth,a.offsetWidth):a.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(a.scrollHeight,a.offsetHeight):a.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i),undefined):(this.containment=null,undefined)},_convertPositionTo:function(t,i){i||(i=this.position);var a="absolute"===t?1:-1,s="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:s.scrollTop(),left:s.scrollLeft()}),{top:i.top+this.offset.relative.top*a+this.offset.parent.top*a-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*a,left:i.left+this.offset.relative.left*a+this.offset.parent.left*a-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*a}},_generatePosition:function(t){var i,a,s,n,r=this.options,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=t.pageX,h=t.pageY;return this.offset.scroll||(this.offset.scroll={top:o.scrollTop(),left:o.scrollLeft()}),this.originalPosition&&(this.containment&&(this.relative_container?(a=this.relative_container.offset(),i=[this.containment[0]+a.left,this.containment[1]+a.top,this.containment[2]+a.left,this.containment[3]+a.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),r.grid&&(s=r.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,h=i?s-this.offset.click.top>=i[1]||s-this.offset.click.top>i[3]?s:s-this.offset.click.top>=i[1]?s-r.grid[1]:s+r.grid[1]:s,n=r.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,l=i?n-this.offset.click.left>=i[0]||n-this.offset.click.left>i[2]?n:n-this.offset.click.left>=i[0]?n-r.grid[0]:n+r.grid[0]:n)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,i,a){return a=a||this._uiHash(),e.ui.plugin.call(this,t,[i,a]),"drag"===t&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,i,a)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i){var a=e(this).data("ui-draggable"),s=a.options,n=e.extend({},i,{item:a.element});a.sortables=[],e(s.connectToSortable).each(function(){var i=e.data(this,"ui-sortable");i&&!i.options.disabled&&(a.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i){var a=e(this).data("ui-draggable"),s=e.extend({},i,{item:a.element});e.each(a.sortables,function(){this.instance.isOver?(this.instance.isOver=0,a.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"===a.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,s))})},drag:function(t,i){var a=e(this).data("ui-draggable"),s=this;e.each(a.sortables,function(){var n=!1,r=this;this.instance.positionAbs=a.positionAbs,this.instance.helperProportions=a.helperProportions,this.instance.offset.click=a.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(n=!0,e.each(a.sortables,function(){return this.instance.positionAbs=a.positionAbs,this.instance.helperProportions=a.helperProportions,this.instance.offset.click=a.offset.click,this!==r&&this.instance._intersectsWith(this.instance.containerCache)&&e.contains(r.instance.element[0],this.instance.element[0])&&(n=!1),n})),n?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(s).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=a.offset.click.top,this.instance.offset.click.left=a.offset.click.left,this.instance.offset.parent.left-=a.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=a.offset.parent.top-this.instance.offset.parent.top,a._trigger("toSortable",t),a.dropped=this.instance.element,a.currentItem=a.element,this.instance.fromOutside=a),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),a._trigger("fromSortable",t),a.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var t=e("body"),i=e(this).data("ui-draggable").options;t.css("cursor")&&(i._cursor=t.css("cursor")),t.css("cursor",i.cursor)},stop:function(){var t=e(this).data("ui-draggable").options;t._cursor&&e("body").css("cursor",t._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i){var a=e(i.helper),s=e(this).data("ui-draggable").options;a.css("opacity")&&(s._opacity=a.css("opacity")),a.css("opacity",s.opacity)},stop:function(t,i){var a=e(this).data("ui-draggable").options;a._opacity&&e(i.helper).css("opacity",a._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var t=e(this).data("ui-draggable");t.scrollParent[0]!==document&&"HTML"!==t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var i=e(this).data("ui-draggable"),a=i.options,s=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(a.axis&&"x"===a.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-t.pageY<a.scrollSensitivity?i.scrollParent[0].scrollTop=s=i.scrollParent[0].scrollTop+a.scrollSpeed:t.pageY-i.overflowOffset.top<a.scrollSensitivity&&(i.scrollParent[0].scrollTop=s=i.scrollParent[0].scrollTop-a.scrollSpeed)),a.axis&&"y"===a.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-t.pageX<a.scrollSensitivity?i.scrollParent[0].scrollLeft=s=i.scrollParent[0].scrollLeft+a.scrollSpeed:t.pageX-i.overflowOffset.left<a.scrollSensitivity&&(i.scrollParent[0].scrollLeft=s=i.scrollParent[0].scrollLeft-a.scrollSpeed))):(a.axis&&"x"===a.axis||(t.pageY-e(document).scrollTop()<a.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-a.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<a.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+a.scrollSpeed))),a.axis&&"y"===a.axis||(t.pageX-e(document).scrollLeft()<a.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-a.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<a.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+a.scrollSpeed)))),s!==!1&&e.ui.ddmanager&&!a.dropBehaviour&&e.ui.ddmanager.prepareOffsets(i,t)}}),e.ui.plugin.add("draggable","snap",{start:function(){var t=e(this).data("ui-draggable"),i=t.options;t.snapElements=[],e(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=e(this),a=i.offset();this!==t.element[0]&&t.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:a.top,left:a.left})})},drag:function(t,i){var a,s,n,r,o,l,h,u,d,c,p=e(this).data("ui-draggable"),f=p.options,m=f.snapTolerance,g=i.offset.left,v=g+p.helperProportions.width,y=i.offset.top,b=y+p.helperProportions.height;for(d=p.snapElements.length-1;d>=0;d--)o=p.snapElements[d].left,l=o+p.snapElements[d].width,h=p.snapElements[d].top,u=h+p.snapElements[d].height,o-m>v||g>l+m||h-m>b||y>u+m||!e.contains(p.snapElements[d].item.ownerDocument,p.snapElements[d].item)?(p.snapElements[d].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[d].item})),p.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(a=m>=Math.abs(h-b),s=m>=Math.abs(u-y),n=m>=Math.abs(o-v),r=m>=Math.abs(l-g),a&&(i.position.top=p._convertPositionTo("relative",{top:h-p.helperProportions.height,left:0}).top-p.margins.top),s&&(i.position.top=p._convertPositionTo("relative",{top:u,left:0}).top-p.margins.top),n&&(i.position.left=p._convertPositionTo("relative",{top:0,left:o-p.helperProportions.width}).left-p.margins.left),r&&(i.position.left=p._convertPositionTo("relative",{top:0,left:l}).left-p.margins.left)),c=a||s||n||r,"outer"!==f.snapMode&&(a=m>=Math.abs(h-y),s=m>=Math.abs(u-b),n=m>=Math.abs(o-g),r=m>=Math.abs(l-v),a&&(i.position.top=p._convertPositionTo("relative",{top:h,left:0}).top-p.margins.top),s&&(i.position.top=p._convertPositionTo("relative",{top:u-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.left=p._convertPositionTo("relative",{top:0,left:o}).left-p.margins.left),r&&(i.position.left=p._convertPositionTo("relative",{top:0,left:l-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[d].snapping&&(a||s||n||r||c)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[d].item})),p.snapElements[d].snapping=a||s||n||r||c)}}),e.ui.plugin.add("draggable","stack",{start:function(){var t,i=this.data("ui-draggable").options,a=e.makeArray(e(i.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});a.length&&(t=parseInt(e(a[0]).css("zIndex"),10)||0,e(a).each(function(i){e(this).css("zIndex",t+i)}),this.css("zIndex",t+a.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i){var a=e(i.helper),s=e(this).data("ui-draggable").options;a.css("zIndex")&&(s._zIndex=a.css("zIndex")),a.css("zIndex",s.zIndex)},stop:function(t,i){var a=e(this).data("ui-draggable").options;a._zIndex&&e(i.helper).css("zIndex",a._zIndex)}})})(jQuery);(function(e){function t(e,t,i){return e>t&&t+i>e}e.widget("ui.droppable",{version:"1.10.3",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t=this.options,i=t.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(i)?i:function(e){return e.is(i)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},e.ui.ddmanager.droppables[t.scope]=e.ui.ddmanager.droppables[t.scope]||[],e.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){for(var t=0,i=e.ui.ddmanager.droppables[this.options.scope];i.length>t;t++)i[t]===this&&i.splice(t,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){"accept"===t&&(this.accept=e.isFunction(i)?i:function(e){return e.is(i)}),e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var a=i||e.ui.ddmanager.current,s=!1;return a&&(a.currentItem||a.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"ui-droppable");return t.options.greedy&&!t.options.disabled&&t.options.scope===a.options.scope&&t.accept.call(t.element[0],a.currentItem||a.element)&&e.ui.intersect(a,e.extend(t,{offset:t.element.offset()}),t.options.tolerance)?(s=!0,!1):undefined}),s?!1:this.accept.call(this.element[0],a.currentItem||a.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(a)),this.element):!1):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(e,i,a){if(!i.offset)return!1;var s,n,r=(e.positionAbs||e.position.absolute).left,o=r+e.helperProportions.width,l=(e.positionAbs||e.position.absolute).top,h=l+e.helperProportions.height,u=i.offset.left,d=u+i.proportions.width,c=i.offset.top,p=c+i.proportions.height;switch(a){case"fit":return r>=u&&d>=o&&l>=c&&p>=h;case"intersect":return r+e.helperProportions.width/2>u&&d>o-e.helperProportions.width/2&&l+e.helperProportions.height/2>c&&p>h-e.helperProportions.height/2;case"pointer":return s=(e.positionAbs||e.position.absolute).left+(e.clickOffset||e.offset.click).left,n=(e.positionAbs||e.position.absolute).top+(e.clickOffset||e.offset.click).top,t(n,c,i.proportions.height)&&t(s,u,i.proportions.width);case"touch":return(l>=c&&p>=l||h>=c&&p>=h||c>l&&h>p)&&(r>=u&&d>=r||o>=u&&d>=o||u>r&&o>d);default:return!1}},e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var a,s,n=e.ui.ddmanager.droppables[t.options.scope]||[],r=i?i.type:null,o=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(a=0;n.length>a;a++)if(!(n[a].options.disabled||t&&!n[a].accept.call(n[a].element[0],t.currentItem||t.element))){for(s=0;o.length>s;s++)if(o[s]===n[a].element[0]){n[a].proportions.height=0;continue e}n[a].visible="none"!==n[a].element.css("display"),n[a].visible&&("mousedown"===r&&n[a]._activate.call(n[a],i),n[a].offset=n[a].element.offset(),n[a].proportions={width:n[a].element[0].offsetWidth,height:n[a].element[0].offsetHeight})}},drop:function(t,i){var a=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)&&(a=this._drop.call(this,i)||a),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),a},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var a,s,n,r=e.ui.intersect(t,this,this.options.tolerance),o=!r&&this.isover?"isout":r&&!this.isover?"isover":null;o&&(this.options.greedy&&(s=this.options.scope,n=this.element.parents(":data(ui-droppable)").filter(function(){return e.data(this,"ui-droppable").options.scope===s}),n.length&&(a=e.data(n[0],"ui-droppable"),a.greedyChild="isover"===o)),a&&"isover"===o&&(a.isover=!1,a.isout=!0,a._out.call(a,i)),this[o]=!0,this["isout"===o?"isover":"isout"]=!1,this["isover"===o?"_over":"_out"].call(this,i),a&&"isout"===o&&(a.isout=!1,a.isover=!0,a._over.call(a,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}}})(jQuery);(function(e){function t(e){return parseInt(e,10)||0}function i(e){return!isNaN(parseInt(e,10))}e.widget("ui.resizable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var t,i,s,a,n,r=this,o=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!o.aspectRatio,aspectRatio:o.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:o.helper||o.ghost||o.animate?o.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=o.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),n="ui-resizable-"+s,a=e("<div class='ui-resizable-handle "+n+"'></div>"),a.css({zIndex:o.zIndex}),"se"===s&&a.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(a);this._renderAxis=function(t){var i,s,a,n;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=e(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),n=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),a=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(a,n),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){r.resizing||(this.className&&(a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=a&&a[1]?a[1]:"se")}),o.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){o.disabled||(e(this).removeClass("ui-resizable-autohide"),r._handles.show())}).mouseleave(function(){o.disabled||r.resizing||(e(this).addClass("ui-resizable-autohide"),r._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,a=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(a=!0);return!this.options.disabled&&a},_mouseStart:function(i){var s,a,n,r=this.options,o=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:o.top,left:o.left}),this._renderProxy(),s=t(this.helper.css("left")),a=t(this.helper.css("top")),r.containment&&(s+=e(r.containment).scrollLeft()||0,a+=e(r.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:a},this.size=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:a},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof r.aspectRatio?r.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(t){var i,s=this.helper,a={},n=this.originalMousePosition,r=this.axis,o=this.position.top,h=this.position.left,l=this.size.width,u=this.size.height,c=t.pageX-n.left||0,d=t.pageY-n.top||0,p=this._change[r];return p?(i=p.apply(this,[t,c,d]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),this.position.top!==o&&(a.top=this.position.top+"px"),this.position.left!==h&&(a.left=this.position.left+"px"),this.size.width!==l&&(a.width=this.size.width+"px"),this.size.height!==u&&(a.height=this.size.height+"px"),s.css(a),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(a)||this._trigger("resize",t,this.ui()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,a,n,r,o,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),a=s&&e.ui.hasScroll(i[0],"left")?0:u.sizeDiff.height,n=s?0:u.sizeDiff.width,r={width:u.helper.width()-n,height:u.helper.height()-a},o=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(r,{top:h,left:o})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t,s,a,n,r,o=this.options;r={minWidth:i(o.minWidth)?o.minWidth:0,maxWidth:i(o.maxWidth)?o.maxWidth:1/0,minHeight:i(o.minHeight)?o.minHeight:0,maxHeight:i(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=r.minHeight*this.aspectRatio,a=r.minWidth/this.aspectRatio,s=r.maxHeight*this.aspectRatio,n=r.maxWidth/this.aspectRatio,t>r.minWidth&&(r.minWidth=t),a>r.minHeight&&(r.minHeight=a),r.maxWidth>s&&(r.maxWidth=s),r.maxHeight>n&&(r.maxHeight=n)),this._vBoundaries=r},_updateCache:function(e){this.offset=this.helper.offset(),i(e.left)&&(this.position.left=e.left),i(e.top)&&(this.position.top=e.top),i(e.height)&&(this.size.height=e.height),i(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,s=this.size,a=this.axis;return i(e.height)?e.width=e.height*this.aspectRatio:i(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===a&&(e.left=t.left+(s.width-e.width),e.top=null),"nw"===a&&(e.top=t.top+(s.height-e.height),e.left=t.left+(s.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,s=this.axis,a=i(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=i(e.height)&&t.maxHeight&&t.maxHeight<e.height,r=i(e.width)&&t.minWidth&&t.minWidth>e.width,o=i(e.height)&&t.minHeight&&t.minHeight>e.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,u=/sw|nw|w/.test(s),c=/nw|ne|n/.test(s);return r&&(e.width=t.minWidth),o&&(e.height=t.minHeight),a&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),r&&u&&(e.left=h-t.minWidth),a&&u&&(e.left=h-t.maxWidth),o&&c&&(e.top=l-t.minHeight),n&&c&&(e.top=l-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var e,t,i,s,a,n=this.helper||this.element;for(e=0;this._proportionallyResizeElements.length>e;e++){if(a=this._proportionallyResizeElements[e],!this.borderDif)for(this.borderDif=[],i=[a.css("borderTopWidth"),a.css("borderRightWidth"),a.css("borderBottomWidth"),a.css("borderLeftWidth")],s=[a.css("paddingTop"),a.css("paddingRight"),a.css("paddingBottom"),a.css("paddingLeft")],t=0;i.length>t;t++)this.borderDif[t]=(parseInt(i[t],10)||0)+(parseInt(s[t],10)||0);a.css({height:n.height()-this.borderDif[0]-this.borderDif[2]||0,width:n.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,a=this.originalPosition;return{top:a.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).data("ui-resizable"),s=i.options,a=i._proportionallyResizeElements,n=a.length&&/textarea/i.test(a[0].nodeName),r=n&&e.ui.hasScroll(a[0],"left")?0:i.sizeDiff.height,o=n?0:i.sizeDiff.width,h={width:i.size.width-o,height:i.size.height-r},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};a&&a.length&&e(a[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var i,s,a,n,r,o,h,l=e(this).data("ui-resizable"),u=l.options,c=l.element,d=u.containment,p=d instanceof e?d.get(0):/parent/.test(d)?c.parent().get(0):d;p&&(l.containerElement=e(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(i=e(p),s=[],e(["Top","Right","Left","Bottom"]).each(function(e,a){s[e]=t(i.css("padding"+a))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},a=l.containerOffset,n=l.containerSize.height,r=l.containerSize.width,o=e.ui.hasScroll(p,"left")?p.scrollWidth:r,h=e.ui.hasScroll(p)?p.scrollHeight:n,l.parentData={element:p,left:a.left,top:a.top,width:o,height:h}))},resize:function(t){var i,s,a,n,r=e(this).data("ui-resizable"),o=r.options,h=r.containerOffset,l=r.position,u=r._aspectRatio||t.shiftKey,c={top:0,left:0},d=r.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(c=h),l.left<(r._helper?h.left:0)&&(r.size.width=r.size.width+(r._helper?r.position.left-h.left:r.position.left-c.left),u&&(r.size.height=r.size.width/r.aspectRatio),r.position.left=o.helper?h.left:0),l.top<(r._helper?h.top:0)&&(r.size.height=r.size.height+(r._helper?r.position.top-h.top:r.position.top),u&&(r.size.width=r.size.height*r.aspectRatio),r.position.top=r._helper?h.top:0),r.offset.left=r.parentData.left+r.position.left,r.offset.top=r.parentData.top+r.position.top,i=Math.abs((r._helper?r.offset.left-c.left:r.offset.left-c.left)+r.sizeDiff.width),s=Math.abs((r._helper?r.offset.top-c.top:r.offset.top-h.top)+r.sizeDiff.height),a=r.containerElement.get(0)===r.element.parent().get(0),n=/relative|absolute/.test(r.containerElement.css("position")),a&&n&&(i-=r.parentData.left),i+r.size.width>=r.parentData.width&&(r.size.width=r.parentData.width-i,u&&(r.size.height=r.size.width/r.aspectRatio)),s+r.size.height>=r.parentData.height&&(r.size.height=r.parentData.height-s,u&&(r.size.width=r.size.height*r.aspectRatio))},stop:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.containerOffset,a=t.containerPosition,n=t.containerElement,r=e(t.helper),o=r.offset(),h=r.outerWidth()-t.sizeDiff.width,l=r.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(n.css("position"))&&e(this).css({left:o.left-a.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(n.css("position"))&&e(this).css({left:o.left-a.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).data("ui-resizable"),a=s.options,n=s.originalSize,r=s.originalPosition,o={height:s.size.height-n.height||0,width:s.size.width-n.width||0,top:s.position.top-r.top||0,left:s.position.left-r.left||0},h=function(t,s){e(t).each(function(){var t=e(this),a=e(this).data("ui-resizable-alsoresize"),n={},r=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(r,function(e,t){var i=(a[t]||0)+(o[t]||0);i&&i>=0&&(n[t]=i||null)}),t.css(n)})};"object"!=typeof a.alsoResize||a.alsoResize.nodeType?h(a.alsoResize):e.each(a.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).data("ui-resizable");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).data("ui-resizable");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size,a=t.originalSize,n=t.originalPosition,r=t.axis,o="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=o[0]||1,l=o[1]||1,u=Math.round((s.width-a.width)/h)*h,c=Math.round((s.height-a.height)/l)*l,d=a.width+u,p=a.height+c,f=i.maxWidth&&d>i.maxWidth,m=i.maxHeight&&p>i.maxHeight,g=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=o,g&&(d+=h),v&&(p+=l),f&&(d-=h),m&&(p-=l),/^(se|s|e)$/.test(r)?(t.size.width=d,t.size.height=p):/^(ne)$/.test(r)?(t.size.width=d,t.size.height=p,t.position.top=n.top-c):/^(sw)$/.test(r)?(t.size.width=d,t.size.height=p,t.position.left=n.left-u):(t.size.width=d,t.size.height=p,t.position.top=n.top-c,t.position.left=n.left-u)}})})(jQuery);(function(e){function t(e,t,i){return e>t&&t+i>e}function i(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))}e.widget("ui.sortable",e.ui.mouse,{version:"1.10.3",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||i(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,i){"disabled"===t?(this.options[t]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):e.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,i){var s=null,a=!1,n=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,n.widgetName+"-item")===n?(s=e(this),!1):undefined}),e.data(t.target,n.widgetName+"-item")===n&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(a=!0)}),a)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var a,n,r=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,r.cursorAt&&this._adjustOffsetFromHelper(r.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),r.containment&&this._setContainment(),r.cursor&&"auto"!==r.cursor&&(n=this.document.find("body"),this.storedCursor=n.css("cursor"),n.css("cursor",r.cursor),this.storedStylesheet=e("<style>*{ cursor: "+r.cursor+" !important; }</style>").appendTo(n)),r.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",r.opacity)),r.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",r.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(a=this.containers.length-1;a>=0;a--)this.containers[a]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!r.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,a,n,r=this.options,o=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<r.scrollSensitivity?this.scrollParent[0].scrollTop=o=this.scrollParent[0].scrollTop+r.scrollSpeed:t.pageY-this.overflowOffset.top<r.scrollSensitivity&&(this.scrollParent[0].scrollTop=o=this.scrollParent[0].scrollTop-r.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<r.scrollSensitivity?this.scrollParent[0].scrollLeft=o=this.scrollParent[0].scrollLeft+r.scrollSpeed:t.pageX-this.overflowOffset.left<r.scrollSensitivity&&(this.scrollParent[0].scrollLeft=o=this.scrollParent[0].scrollLeft-r.scrollSpeed)):(t.pageY-e(document).scrollTop()<r.scrollSensitivity?o=e(document).scrollTop(e(document).scrollTop()-r.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<r.scrollSensitivity&&(o=e(document).scrollTop(e(document).scrollTop()+r.scrollSpeed)),t.pageX-e(document).scrollLeft()<r.scrollSensitivity?o=e(document).scrollLeft(e(document).scrollLeft()-r.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<r.scrollSensitivity&&(o=e(document).scrollLeft(e(document).scrollLeft()+r.scrollSpeed))),o!==!1&&e.ui.ddmanager&&!r.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],a=s.item[0],n=this._intersectsWithPointer(s),n&&s.instance===this.currentContainer&&a!==this.currentItem[0]&&this.placeholder[1===n?"next":"prev"]()[0]!==a&&!e.contains(this.placeholder[0],a)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],a):!0)){if(this.direction=1===n?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,a=this.placeholder.offset(),n=this.options.axis,r={};n&&"x"!==n||(r.left=a.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),n&&"y"!==n||(r.top=a.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(r,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,a=s+this.helperProportions.height,n=e.left,r=n+e.width,o=e.top,h=o+e.height,l=this.offset.click.top,u=this.offset.click.left,c="x"===this.options.axis||s+l>o&&h>s+l,d="y"===this.options.axis||t+u>n&&r>t+u,p=c&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>n&&r>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>o&&h>a-this.helperProportions.height/2},_intersectsWithPointer:function(e){var i="x"===this.options.axis||t(this.positionAbs.top+this.offset.click.top,e.top,e.height),s="y"===this.options.axis||t(this.positionAbs.left+this.offset.click.left,e.left,e.width),a=i&&s,n=this._getDragVerticalDirection(),r=this._getDragHorizontalDirection();return a?this.floating?r&&"right"===r||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(e){var i=t(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),s=t(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),a=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&s||"left"===n&&!s:a&&("down"===a&&i||"up"===a&&!i)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){var i,s,a,n,r=[],o=[],h=this._connectWith();if(h&&t)for(i=h.length-1;i>=0;i--)for(a=e(h[i]),s=a.length-1;s>=0;s--)n=e.data(a[s],this.widgetFullName),n&&n!==this&&!n.options.disabled&&o.push([e.isFunction(n.options.items)?n.options.items.call(n.element):e(n.options.items,n.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),n]);for(o.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=o.length-1;i>=0;i--)o[i][0].each(function(){r.push(this)});return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,a,n,r,o,h,l,u=this.items,c=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(a=e(d[i]),s=a.length-1;s>=0;s--)n=e.data(a[s],this.widgetFullName),n&&n!==this&&!n.options.disabled&&(c.push([e.isFunction(n.options.items)?n.options.items.call(n.element[0],t,{item:this.currentItem}):e(n.options.items,n.element),n]),this.containers.push(n));for(i=c.length-1;i>=0;i--)for(r=c[i][1],o=c[i][0],s=0,l=o.length;l>s;s++)h=e(o[s]),h.data(this.widgetName+"-item",r),u.push({item:h,instance:r,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,a,n;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(a=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=a.outerWidth(),s.height=a.outerHeight()),n=a.offset(),s.left=n.left,s.top=n.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)n=this.containers[i].element.offset(),this.containers[i].containerCache.left=n.left,this.containers[i].containerCache.top=n.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),a=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?t.currentItem.children().each(function(){e("<td> </td>",t.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(a)}):"img"===s&&a.attr("src",t.currentItem.attr("src")),i||a.css("visibility","hidden"),a},update:function(e,a){(!i||s.forcePlaceholderSize)&&(a.height()||a.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),a.width()||a.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_contactContainers:function(s){var a,n,r,o,h,l,u,c,d,p,f=null,m=null;for(a=this.containers.length-1;a>=0;a--)if(!e.contains(this.currentItem[0],this.containers[a].element[0]))if(this._intersectsWith(this.containers[a].containerCache)){if(f&&e.contains(this.containers[a].element[0],f.element[0]))continue;f=this.containers[a],m=a}else this.containers[a].containerCache.over&&(this.containers[a]._trigger("out",s,this._uiHash(this)),this.containers[a].containerCache.over=0);if(f)if(1===this.containers.length)this.containers[m].containerCache.over||(this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1);else{for(r=1e4,o=null,p=f.floating||i(this.currentItem),h=p?"left":"top",l=p?"width":"height",u=this.positionAbs[h]+this.offset.click[h],n=this.items.length-1;n>=0;n--)e.contains(this.containers[m].element[0],this.items[n].item[0])&&this.items[n].item[0]!==this.currentItem[0]&&(!p||t(this.positionAbs.top+this.offset.click.top,this.items[n].top,this.items[n].height))&&(c=this.items[n].item.offset()[h],d=!1,Math.abs(c-u)>Math.abs(c+this.items[n][l]-u)&&(d=!0,c+=this.items[n][l]),r>Math.abs(c-u)&&(r=Math.abs(c-u),o=this.items[n],this.direction=d?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[m])return;o?this._rearrange(s,o,null,!0):this._rearrange(s,null,this.containers[m].element,!0),this._trigger("change",s,this._uiHash()),this.containers[m]._trigger("change",s,this._uiHash(this)),this.currentContainer=this.containers[m],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,a=this.options;"parent"===a.containment&&(a.containment=this.helper[0].parentNode),("document"===a.containment||"window"===a.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e("document"===a.containment?document:window).width()-this.helperProportions.width-this.margins.left,(e("document"===a.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(a.containment)||(t=e(a.containment)[0],i=e(a.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,a="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,n=/(html|body)/i.test(a[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():n?0:a.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():n?0:a.scrollLeft())*s}},_generatePosition:function(t){var i,s,a=this.options,n=t.pageX,r=t.pageY,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(o[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(n=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(r=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(n=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(r=this.containment[3]+this.offset.click.top)),a.grid&&(i=this.originalPageY+Math.round((r-this.originalPageY)/a.grid[1])*a.grid[1],r=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-a.grid[1]:i+a.grid[1]:i,s=this.originalPageX+Math.round((n-this.originalPageX)/a.grid[0])*a.grid[0],n=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-a.grid[0]:s+a.grid[0]:s)),{top:r-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:o.scrollTop()),left:n-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:o.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var a=this.counter;this._delay(function(){a===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)("auto"===this._storedCSS[i]||"static"===this._storedCSS[i])&&(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&s.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||s.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(s.push(function(e){this._trigger("remove",e,this._uiHash())}),s.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)t||s.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!t){for(this._trigger("beforeStop",e,this._uiHash()),i=0;s.length>i;i++)s[i].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!1}if(t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!t){for(i=0;s.length>i;i++)s[i].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}})})(jQuery);

/*! verge 1.6.3 | viewport utils by @ryanve | @link verge.airve.com | @license MIT */
(function(g,d,f){"undefined"!=typeof module&&module.exports?module.exports=f():g[d]=f()})(this,"verge",function(){function g(e,c,b){var a={};e&&!e.nodeType&&(e=e[0]);if(e&&1===e.nodeType)return c="number"==typeof c&&!b&&c||0,e=e.getBoundingClientRect(),a.width=(a.right=e.right+c)-(a.left=e.left-c),a.height=(a.bottom=e.bottom+c)-(a.top=e.top-c),a}var d=window,f=document.documentElement,l=d.Modernizr,h=d.matchMedia||d.msMatchMedia,m=h?function(a){return!!h.call(d,a).matches}:function(){return!1},a=
function(a,c,b){return f[b]<d[c]&&m("(min-"+a+":"+d[c]+"px)")?function(){return d[c]}:function(){return f[b]}},j=a("width","innerWidth","clientWidth"),k=a("height","innerHeight","clientHeight"),a={};a.mq=!h&&l&&l.mq||m;a.matchMedia=h?function(){return h.apply(d,arguments)}:function(){return{}};a.viewportW=j;a.viewportH=k;a.scrollX=function(){return d.pageXOffset||f.scrollLeft};a.scrollY=function(){return d.pageYOffset||f.scrollTop};a.rectangle=g;a.inX=function(a,c){var b=g(a,c);return!!b&&0<=b.right&&
b.left<=j()};a.inY=function(a,c){var b=g(a,c);return!!b&&0<=b.bottom&&b.top<=k()};a.inViewport=function(a,c){var b=g(a,c);return!!b&&0<=b.bottom&&0<=b.right&&b.top<=k()&&b.left<=j()};return a});
jQuery.extend(verge);


/*! Wui 1.1
 * Copyright (c) 2013 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static4.usurf.usu.edu/resources/wui-nextgen/wui-1-1/license.html
 */
 
 
/*
* Avoid 'console' errors in browsers that lack a console by defining a variable named console.
* For example, when using console.log() on a browser that does not have a console, execution of code
* will continue because the console variable is defined.
* Copyright (c) HTML5 Boilerplate - https://github.com/h5bp/html5-boilerplate/blob/master/LICENSE.md
*/
(function() {
    var method;
    var n = function(){};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        if (!console[method]) { console[method] = n; }    // Only stub undefined methods.
    }
}());


// Make sure the WUI is defined
var Wui = Wui || {};

(function($,window) {

// AJAX error reporting and caching
$.ajaxSetup({ 
    cache:  false,
    error:  function(response){
                console.log(response);
                var err = null;
                try{        err = $.parseJSON( response.responseText ); }
                catch(e){   err = {fatalError:'Aw Snap! There was a problem talking to the server.'}; }
                if(err !== null)
                    Wui.errRpt(err.fatalError);
            }
});

/** @return Returns a unique id */
Wui.id = function(){
    if(Wui.idCounter === undefined) Wui.idCounter = 0;
    return 'wui-' + Wui.idCounter++;
};


/**
    @param {object} Object containing named keys
    @return Array containing the key names of the passed in object in alphabetical order
*/
Wui.getKeys = function(obj){
    var retArray = [];
    if(obj)
        $.each(obj,function(key){ retArray.push(key); });
    return retArray.sort();
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@return Number specifying the scrollbar width for the current page in pixels
*/
Wui.scrollbarWidth = function() {
  var parent, child, width;

  if(width===undefined) {
    parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
    child=parent.children();
    width=child.innerWidth()-child.height(99).innerWidth();
    parent.remove();
  }

 return width;
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@param    {number} lower    Lower bound for generating the random number
@param    {number} upper    Upper bound for generating the random number
@return A random number within the bounds specified

Generates a random number
*/
Wui.randNum = function(lower,upper) {
    upper = upper - lower + 1 ;
    return ( lower + Math.floor(Math.random() * upper) );
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@return A number representing the maximum z-index on the page plus one.

Gets the maximum CSS z-index on the page and returns one higher, or one if no z-indexes are defined.
*/
Wui.maxZ = function(){
    var bodyElems = $('body *'),
        useElems = bodyElems.length < 2500 ? bodyElems : $('body > *, [style*="z-index"]')
        topZ =  Math.max.apply(null, 
                    $.map(useElems, function(e) {
                        if ($(e).css('position') != 'static')
                            return parseInt($(e).css('z-index')) || 0;
                    })
                );
    return ($.isNumeric(topZ) ? topZ : 0) + 1;
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@param  {object} response   A JSON object which was returned from an XHR response.
@return An object containing the data removed from any wrapper, and the total number of records received {data:array, total:numeric}

Unwraps the data from any container it may be in to allow it to be used by a containing object. Wrapper values are defined in
Wui.Data.prototype.dataContainer and Wui.Data.prototype.totalContainer.
*/
Wui.unwrapData = function(r){
    var me          = this,
        retObj      = {},
        dc            = me.hasOwnProperty('dataContainer') ? me.dataContainer : Wui.Data.prototype.dataContainer,
        tc            = me.hasOwnProperty('totalContainer') ? me.totalContainer : Wui.Data.prototype.totalContainer,
        response    = (dc && r[dc]) ? r[dc] : r,
        total         = (tc && r[tc]) ? r[tc] : response.length;
    
    retObj.data = response;
    retObj.total = total;
    return retObj;
};

/** 
@param {object} parent The element to which the child will be relatively positioned.
@param {object} child The element to be positioned.
Absolutely positions a child element such that it will be within the window and at the max z-index.
*/
Wui.positionItem = function(parent,child){
    // Position calendar to ensure it will be seen
    var ofst    = parent.offset(),
        cHeight = child.outerHeight(),
        cWidth  = child.outerWidth(),
        plBelow = (ofst.top + parent.outerHeight() + cHeight < $.viewportH()),
        plRight = (ofst.left + parent.outerWidth() - cWidth > 0); 

    child.css({
        left:       (plRight) ? ofst.left + parent.outerWidth() - cWidth : ofst.left,
        top:        (plBelow) ? ofst.top + parent.outerHeight() : ofst.top - cHeight,
        zIndex:     Wui.maxZ()
    });
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@param {array}        collection            A collection of items that will be fit within a container.
@param {string}     [dim]                The dimension to perform the fit on, 'height','width', height is default.
@param {boolean}    [mindTheScrollbar]    Defaults to false, otherwise includes the scrollbar in the calculation.

This function will size items relative to each other via a 'fit' value, as well as percentages and fixed values.
*/
Wui.fit = function(collection,dim,mindTheScrollbar){
    // Ensure the collection is an array of Wui Objects
    if(collection instanceof Array && collection.length > 0){
        var i           = 0,
            dimArray    = ['height','width'],
            parent      = (collection[0].parent) ? collection[0].parent : collection[0].el.parent(),
            parentEl    = (parent.el) ? (parent.elAlias || parent.el) : parent;

        // Make sure dim is a lowercase string, or just leave it alone for now
        dim = (dim && dim.toLowerCase) ? dim.toLowerCase() : dim;

        // Make sure the value of dim is something this method will be able to utilize
        dim = ($.inArray(dim,dimArray) >= 0) ? dim : dimArray[0];
        var dimOpposite = dimArray[($.inArray(dim,dimArray)) ? 0 : 1];

        // Change the value of mindTheScrollbar if some of the items in the collection are taller than the container.
        if(mindTheScrollbar !== true)
            for(i = 0; i < collection.length; i++)
                if(mindTheScrollbar = collection[i].el['outer' + dimOpposite.charAt(0).toUpperCase() + dimOpposite.slice(1)]() > parentEl[dimOpposite]())
                    break;

        var sbw         = (mindTheScrollbar === true) ? Wui.scrollbarWidth() : 0
            parentSize  = (($(parentEl)[0] === $('body')) ? $(window) : $(parentEl))[dim]() - sbw,
            fitCt       = 0,
            fixedSize   = 0,
            fitMux      = 0;

        // Tally all sizes we're dealing with
        $.each(collection,function(i,itm){
            if(itm.fit){
                fitCt += itm.fit;           // Tally fit values
                itm[dim] = -1;              /* Set to -1 so that CSSByParam will not act on it (just deleting it was
                                             * ineffective because this property can be inherited through the prototype chain)*/
            }else if(itm[dim]){
                // Tally fixed size values & percentage based size values. Doing this gives percentages precedence over fit.
                if($.isNumeric(itm[dim]))   { fixedSize += itm[dim]; }
                else                        {
                                              var itmDimension = Math.floor((parseFloat(itm[dim]) / 100) * parentSize);
                                              fixedSize += (itm[dim] = itmDimension);
                                            }
                delete itm.fit;             // Ensure the item doesn't have a dimension and a fit specified
            }else{
                fitCt += (itm.fit = 1);     // Add a fit value to an item that doesn't have dimensions specified
            }
        });
        
        // If the grid becomes entirely fixed widths the fit won't work so the items will be set to fits
        if(fitCt === 0 && fixedSize != parentSize){
            fitCt = 1;
            
            $.each(collection,function(i,itm){
                itm.fit = itm[dim] / fixedSize;
                itm[dim] = -1;
            });
        }
        
        // Get the fit multiplier
        fitMux = (fitCt !== 0) ? (parentSize - fixedSize) / fitCt : 0;
        
        // Size 'fit' items
        $.each(collection,function(i,itm){
            var css = {};
            if(itm.fit){
                css[dim] = Math.floor(fitMux * itm.fit);
                $(itm.el).css(css);
            }
        });
    }else{
        console.log('Improper collection specified', arguments);
        //throw('Improper collection specified');
    }
};


/** The base object from which all other WUI Objects extend
 *  @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
*/
Wui.O = function(args){ $.extend(this,{
    /** Whether the object is hidden on the DOM */
    hidden:    false
},args); };
Wui.O.prototype = {
    /**
    @param {object}    object    A WUI or jQuery object to be added to the DOM
    @param {object}    target    An item already on the DOM that the action will be performed on the object relative to
    @param {string}    action    The jQuery DOM manipulation method
    
    @return true
    
    Adds an object to the DOM and applies any CSS styles defined for the object by calling 
    cssByParam() if its a WUI object.
    
    If the object has a 'appendTo' or 'prependTo' config, target and action will be ignored whether 
    passed in or not, if target is defined it will then be used, if target is not defined, and 
    'appendTo' and 'prependTo' are not defined, the objects 'parent' will be used for appending. If 
    the object has no parent, it will be appended to the body.
    
    If the object has a 'appendTo' or 'prependTo' config, that action will be used, otherwise the
    passed in action is used if defined, otherwise uses 'append'.
    */
    addToDOM:    function(obj, tgt, act){
                    // Take the target and action from the passed object first if defined, then default to passed arguments, 
                    // then to a default of $('body') and 'append'
                    var target     = (obj.appendTo !== undefined) ? obj.appendTo :
                                    (obj.prependTo !== undefined) ? obj.prependTo :
                                        (tgt !== undefined && tgt !== null) ? tgt : 
                                            (obj.parent !== undefined && obj.parent.elAlias !== undefined) ? obj.parent.elAlias :
                                                (obj.parent !== undefined && obj.parent.el !== undefined) ? obj.parent.el : $('body'),
                        action     = (obj.appendTo !== undefined) ? 'append' : (obj.prependTo !== undefined) ? 'prepend' : (act !== undefined && target[act]) ? act : 'append';
                    
                    // Try appending with WUI modifiers, else just append in good ol' jQuery fashion
                    try{
                      $(target)[action](obj.el);
                    }catch(e){
                        try{
                          $(target)[action](obj);
                        }catch(e){}
                    }
                    
                    // Add styles
                    this.cssByParam(obj);
                    
                    return true;
                },


    /**
    @param {object}    item    A jQuery object to be added
    Appends item to the WUI Object's 'elAlias' or 'el', whichever is defined.
    */
    append:        function(obj){
                    var me = this, el = me.elAlias || me.el;
                    $.each(arguments,function(i,itm){
                        el.append(itm);
                    });
                },


    /** Removes only the DOM items from the WUI Object's 'elAlias' or 'el', whichever is defined. */
    clear:        function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },
    /**
    Gets called when a WUI Object is placed and gets called on all of a placed object's items.
    Adds CSS styles via cssByParam, calls onRender() if it exists on the object, determines whether the 
    object is using a 'fit' layout and performs layout on the item, calls its children's callRender(), 
    and finally calls its own afterRender() if it exists.
    */
    callRender:    function(){
                    var me = this;
                    
                    // Add styles if they didn't get added
                    me.cssByParam(me);
                    
                    // Perform render for this
                    if(me.onRender)  me.onRender();
                    
                    // Perform Wui.fit on items that need it
                    var needFit = false;
                    
                    me.each(function(itm){ 
                        if(itm.fit){ needFit = true; return false; }
                    });
                    
                    if(me.fitDimension || needFit)
                        Wui.fit(me.items, (me.fitDimension || undefined));
                        
                    // Perform rendering for child elements
                    me.each(function(itm){ if(itm.callRender) itm.callRender(); });
                    if(me.afterRender)  me.afterRender();
                },
    
    /**
    @param {string}         name    Name of the HMTL attribute to set
    @param {string|number}     val        Value of the given attribute
    
    @return True if the val parameter is a valid string or number, else false.
    
    Tests whether the passed in value is valid, then uses the jQuery .attr method to apply an attribute to the el of the WUI object.
    */
    applyAttr:    function(name,val){
                    var validVal = (val !== undefined && (typeof val === 'string' || typeof val === 'number'));
                    if(validVal) $(this.el).attr(name,val);
                    return validVal;
                },
    
    /**
    @param {object} item    A WUI Object, or if undefined, the object that this method is a member of
    
    @return    The object's el if it has one, or just the object
    
    Adds HTML properties like CSS class, attributes, and sets height and width as either absolute values
    or percentages of their parent.
    */
    cssByParam: function(m) { 
                    m = m || this;
                    
                    if(m.el && m.el.addClass){
                        if(m.applyAttr){
                            m.applyAttr('id',m.id);
                            m.applyAttr('name',m.name);
                            m.applyAttr('tabindex',m.tabIndex);
                        }
                        
                        // Add attributes if defined
                        try{ if(m.attr && typeof m.attr == 'object') m.el.attr(m.attr); }catch(e){ }
                        
                        // calculate dimensions
                        if($.isNumeric(m.height) && m.height >= 0)    m.el.css({height: m.height});
                        if($.isNumeric(m.width) && m.width >= 0)        m.el.css({width: m.width});

                        // calculate percentage based dimensions
                        if(m.width && m.width.indexOf && m.width.indexOf('%') != -1)
                            m.el.css({width: Math.floor((parseFloat(m.width) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).width())});
                        if(m.height && m.height.indexOf && m.height.indexOf('%') != -1){
                            m.el.css({height: Math.floor((parseFloat(m.height) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).height())});
                        }
                        
                        // hide an object based on its hidden value
                        if(m.hidden) m.el.css('display','none');
                        
                        return m.el.addClass(m.cls);
                    }else{
                        return m;
                    }
                },
    /**
    @param {function} fn Function that gets called for each item of the object.
    @param {boolean} ascending Whether the loop happens in ascending or descending order.
    
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    each:        function(f,ascending){
                    ascending = (ascending === undefined) ? true : ascending;
                    var i = (ascending) ? 0 : this.items.length;
                    
                    if(ascending){
                        for(i; i < this.items.length; i++){
                            if(f(this.items[i],i) === false) break;
                        }
                    }else{
                        for(i; i >= 0; i--){
                            if(f(this.items[i],i) === false) break;
                        }
                    }

                    return true;
                },
    /**
    @param {number} [speed] Time in milliseconds for the hiding element to fade out
    @param {function} [callback] A function that gets called at the end of the fadeout/hide
    
    @return The el or elAlias of the object being hidden
    Hides an object with the options of an animated fadeout and callback function
    */
    hide:        function(){ 
                    var args = ['fadeOut'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = true;
                    return this.showHide.apply(this,args);
                },
    /**
    @param {function}   afterLayout A function to run after the layout has occurred.
    Runs cssByParam and Wui.fit() on itself and its children.  Similar to callRender(),
    but without the rendering of objects - useful to resize things that are already rendered.
    */
    layout:        function(afterLayout){
                    var me = this;
                    
                    // run css styles
                    me.cssByParam(me);
                    
                    // Perform Wui.fit on items that need it
                    var needFit = false;
                    me.each(function(itm){ if(itm.fit){ needFit = true; return false; } });
                        
                            
                    if(me.fitDimension || needFit)
                        Wui.fit(me.items, (me.fitDimension || undefined));
                        
                    // Perform layout for child elements
                    me.each(function(itm){ if(itm.layout) itm.layout(); });

                    // Performs actions passed in as parameters
                    if(afterLayout && typeof afterLayout === 'function')    afterLayout();
                },
    /**
    @param {function} [after]    A function to be called after an object has been placed
    @return The object that was placed 
    Adds the elements of any child objects to itself, then puts its own el on the DOM by 
    calling addToDOM.  Then executes the 'after' function if provided, then runs the 
    callRender() function to perform rendering, fit, and any other listners on itself and
    its children.
    */
    place:      function(after){
                    var me = this;
                    
                    //adds the objects items if any
                    if(me.items === undefined) me.items = [];
                    me.each(function(itm){ 
                        itm.parent = me;
                        if(itm.place)    itm.place();
                        else             me.addToDOM(itm);
                    });
                    
                    //adds the object to the DOM and starts the recursive callRender to render properties on the children
                    me.addToDOM(me);
                    
                    // perform operations on the object after its placed on the DOM but before onRender
                    if(after && typeof after == 'function')    after(me);
                    
                    // run through a parent object and all of its children to run onRender
                    if(me.parent === undefined) me.callRender();
                    
                    return me;
                },
    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Adds passed in items to the end of the items array and adds those objects to the DOM.
    */
    push:       function(){
                    var me = this;
                    
                    if(me.items === undefined) me.items = [];
                    
                    $.each(arguments,function(i,arg){
                        arg.parent = me;
                        if(arg.place)       arg.place();
                        else                me.addToDOM(arg);
                        
                        if(arg.onRender)    arg.onRender();
                        if(arg.layout)      arg.layout();
                    });

                    return Array.prototype.push.apply(me.items,arguments);
                },
    /**
    Removes the object from its parent's items array (if attached to a parent Wui object) and
    removes its el from the DOM. Then deletes the object from memory.
    */
    remove:     function(){
                    var me = this, spliceVal = null;
                    if(me.parent){
                        me.parent.each(function(itm,idx){ if(itm === me) spliceVal = idx;}, false);
                        if(spliceVal !== null)
                            me.parent.splice(spliceVal,1);
                    }
                    this.el.remove();
                    delete this;
                },
    /**
    @param {number} [speed] Time in milliseconds for the showing element to fade in
    @param {function} [callback] A function that gets called at the end of the fadein/show
    @return The el or elAlias of the object being shown
    Shows an object with the options of an animated fadein and callback function
    */
    show:        function(){ 
                    var args = ['fadeIn'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = false;
                    return this.showHide.apply(this,args);
                },
    /**
    @param {string} fn The name of the jQuery method for showing or hiding
    @param {number} [speed] Time in milliseconds for the showing/hiding element to fade in
    @param {function} [callback] A function that gets called at the end of the show/hide
    @return The el or elAlias of the object being shown/hidden
    This is an internal function used by show() and hide(). Fn is required, but speed and callback
    are optional and their order is interchangeable.
    */
    showHide:    function(fn,speed,callback){
                     speed = (typeof speed == 'number') ? speed : 1;
                     if(typeof arguments[1] == 'function') callback = arguments[0];
                     return this.el[fn](speed, callback);
                },
    /**
    @param {number} index The point in the array to start
    @param {number} howMany The number of items to remove
    @param {object} [obj,...] Additional WUI Objects can be passed as parameters and will be inserted at the index
    
    @return An array of the objects removed, if any
    
    Follows the convention of JavaScript's Array.prototype.splice on the object's items array. Items
    spliced into the array will be spliced in position on the DOM as well. Removed items are removed
    from the DOM.
    */
    splice:     function(idx, howMany){
                    var me = this,
                        el = me.elAlias || me.el;
                        idx = parseInt(idx);
                    
                    if(me.items === undefined) me.items = [];
                    
                    //remove specified elements
                    for(var i = idx; i < (idx + howMany); i++)
                        if(me.items[i] && me.items[i].el) me.items[i].el.remove();
                    
                    //standard splice functionality on array and calcs
                    var retVal      = Array.prototype.splice.apply(me.items, arguments),
                        numAdded    = arguments.length - 2;
                        
                    //append any additional el's in proper order
                    if(me.items.length == numAdded){                      //items ended up replacing the array
                        for(i = 0; i < me.items.length; i++)          { me.addToDOM(me.items[i],el); me.items[i].parent = me; }
                    }else if(me.items[(idx + numAdded)] === undefined){    //meaning the new items were inserted at the end of the array
                        for(i = idx; i < me.items.length; i++)        { me.addToDOM(me.items[i],me.items[i-1].el,'after'); me.items[i].parent = me; }
                    }else if (numAdded !== 0){                             //items at the beginning/middle of the array
                        for(i = (idx + numAdded); i > 0; i--)         { me.addToDOM(me.items[i-1],me.items[i].el,'before'); me.items[i-1].parent = me; }
                    }
                    
                    return retVal;
                }
};

/** WUI Long Poll
 @event     pollStart     Fires before polling starts (event, Wui.longPoll)
 @event     pollSuccess   Fires When the poll recieves a successful response. Includes remote data. (event, Wui.longPoll, data)
 @event     pollError     Fires when $.ajax() has an error in the request. (event, Wui.longPoll, err)
 @event     pollStopped   Fires after polling has stopped. Stopping polling doesn't trigger until the startup of the next poll. (event, Wui.longPoll)
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

An object to long poll a remote resouce on a given interval with events.
*/
Wui.LongPoll = function(args){
    $.extend(this,{
        /** The time in milliseconds between each polling. The ajax timeout parameter will also be set to this value so that the server will not be pestered faster than it can respond to a given request. */
        pollTime:   1000,

        /** A multiple of pollTime at which polling retries will cease. */
        maxRetry:   120,

        /** When a poll fails, retries will increase in length by this factor until 'maxRetry' has been reached. */
        waitFactor: 2,

        /** The URL of the resource to poll. */
        url:        null,

        /** Parameters to pass to the resource specified in URL. */
        params:     null,

        /** The name of the longPoll (useful to identifying its responses in the event that there are multiple polls on the same page), defaults to the result of Wui.id(). */
        name:       null,

        /** Setting to pass to the jQuery AJAX function. Settings defined in the poll method already will be overridden. */
        ajaxParams: {}
    },args);
    this.init();
};
Wui.LongPoll.prototype = {
    /** Set up the polling interval and gives the object a name if none is specified. */
    init:       function(){
                    var me = this;
                    me.originalPollTime = me.pollTime;
                    me.naturalPollTime = me.pollTime + 1;
                    me.name = (me.name) ? me.name : Wui.id();
                    me.start();
                },

    /** Polls a resource and sends events on success, failure, and if/when polling stops. */
    poll:       function(){
                    var me = this;
                    setTimeout(function() { 
                        $.ajax($.extend(me.ajaxParams, { 
                            url:        me.url,
                            data:       me.params,
                            beforeSend: function(jqXHR){
                                            if(me.pollTime > me.originalPollTime * me.maxRetry){
                                                jqXHR.abort();
                                                $(window).trigger($.Event('pollStopped'),[me]);
                                                return false;
                                            }
                                        },
                            success:    function(data) { 
                                            me.pollTime = me.naturalPollTime;
                                            $(window).trigger($.Event('pollSuccess'),[me, data]);
                                        },
                            complete:   function(){ me.poll(); },
                            timeout:    me.pollTime,
                            error:      function(err){ 
                                            // This allows the poll to retry once at the original poll time before increasing by a factor of waitFactor
                                            me.pollTime = (me.pollTime == me.naturalPollTime) ? me.originalPollTime : me.pollTime * me.waitFactor;
                                            $(window).trigger($.Event('pollError'),[me, err]);
                                        }
                        })); 
                    }, me.pollTime);
                },

    /** Stops the poll engine at just before the beginning of the next poll attempt. */
    stop:       function(){ this.pollTime = this.pollTime * this.maxRetry + 1; },

    /** Resumes polling instantly. */
    start:      function(){
                    this.pollTime = this.naturalPollTime;
                    $(window).trigger($.Event('pollStart'),[this]);
                    this.poll();
                }
};


/** WUI Data Object
 @event        datachanged    When the data changes (name, data object)
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

The object for handling data whether remote or local
*/
Wui.Data = function(args){
    $.extend(this,{
        /** Array of data that will be stored in the object. Can be specified for the object or loaded remotely */
        data:           [],
        
        /** Name a key in the data that represents the identity field. */
        identity:       null,
        
        /** Name of the data object. Allows the object to be identified in the listeners */
        name:           null,
        
        /** Object containing keys that will be passed remotely */
        params:         {},
        
        /** URL of the remote resource from which to obtain data. A null URL will assume a local data definition. */
        url:            null,
        
        /** Whether the object is waiting for a remote response */
        waiting:        false,
        
        /** Special configuration of the ajax method. Defaults are:
        
            data:       me.params,
            dataType:   'json',
            success:    function(r){ me.success.call(me,r); },
            error:      function(e){ me.success.call(me,e); },
        */
        ajaxConfig:     {},
        
        /** The total number of records contained in the data object */
        total:          0
    },args);
};
Wui.Data.prototype = {
    /** An object in the remote response actually containing the data.
    Best set modifying the prototype eg. Wui.Data.prototype.dataContainer = 'payload'; */
    dataContainer:      null,
    /** An object in the remote response specifying the total number of records. Setting this
    feature will overrride the Data object's counting the data. Best set modifying the prototype eg. Wui.Data.prototype.totalContainer = 'total'; */
    totalContainer:     null,
    
    /** When the object is waiting, default amount of time in milliseconds before trying to perform loadData() again */
    ajaxWait:           10,
    
    /** 
    @param {array}    newData    Array of the new data
    Event hook for when data is changed.
    */
    dataChanged:        function(){},
    
    /**
    @param {function} fn A function that gets called for each item in the object's data array
    
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    dataEach:        function(f){
                        for(var i = 0; i < this.data.length; i++)
                            if(f(this.data[i],i) === false)
                                break;
                        return true;
                    },
    
    /**
    Performs a remote call sensitive to whether it is already waiting for a response.
    Between loadData(), success() and setData() fires several event hooks in this order:
    
    1. setParams()
    2. beforeLoad()
    3. onSuccess()
    4. beforeSet()
    5. processData()
    6. dataChanged()
    -  'datachanged' event is fired
    7. afterSet()
    
    Upon failure will fire onFailure()
    */
    loadData:        function(){
                        var me = this,
                            config = $.extend({
                                data:       me.params,
                                dataType:    'json',
                                success:    function(r){ me.success.call(me,r); },
                                error:        function(e){ me.failure.call(me,e); },
                            },me.ajaxConfig);
                        
                        if(!me.waiting){
                            me.waiting = true;
                            me.setParams.apply(me,arguments);
                            me.beforeLoad.apply(me,arguments);
                            $.ajax(me.url,config);
                        }else{
                            setTimeout(function(){
                                me.loadData.apply(me,arguments);
                            }, me.ajaxWait);
                        }
                    },
    /**
    @param {object} params    Params to be set
    Can be used as is to set parameters before an AJAX load, or it can also be used as an event hook and overridden.
    This method is called from loadData with its arguments passed on, so arguments passed to load data will be sent here. 
    See loadData().
    */
    setParams:        function(params){
                        if(params && typeof params === 'object')
                            $.extend(this.params,params);
                    },
    
    /**
    @param {array} d Data to be set on the ojbect
    @param {number} [t] Total number of records in the data set. If not specified setData will count the data set.
    
    Can be called to set data locally or called by loadData(). Fires a number of events and event hooks. See loadData().
    */
    setData:        function(d,t){
                        var me = this;
                        
                        // Event hook for before the data is set
                        me.beforeSet(d);
                        
                        // Set the data
                        me.data = me.processData(d);
                        me.total = (t !== undefined) ? t : me.data.length;
                        
                        // Event hooks for after the data is set
                        me.dataChanged(me.data);
                        $(window).trigger($.Event('datachanged'),[(me.name || 'wui-data'), me]);
                        me.afterSet(me.data);
                    },
    
    /** Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData(). */
    beforeLoad:        function(){},
    
    /**
    @param    {array}    data    The value of the data cofig of the current object
    Event hook that fires after data is set. Meant to be overridden. See loadData().
    */
    afterSet:        function(){},
    
    /**
    @param {array} d Data to be set on the ojbect
    Event hook that fires after the remote call but before data is set on the object. Meant to be overridden. See loadData().
    */
    beforeSet:        function(){},
    
    /**
    @param {object or array} r Response from the server in JSON format
    Runs when loadData() successfully completes a remote call. Gets data straight or gets it out of the dataContainer and totalContainer. See loadData().
    Calls setData() passing the response and total.
    */
    success:        function(r){
                        var me = this, unwrapped = Wui.unwrapData.call(me,r);
                        me.waiting = false;
                        me.onSuccess(r);
                        me.setData(unwrapped.data, unwrapped.total);
                    },
    
    /**
    Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData().
    */
    onSuccess:        function(){},
    
    /**
    Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData().
    */
    onFailure:        function(){},
    failure:        function(e){
                        this.waiting = false;
                        this.onFailure(e);
                    },
    
    /** 
    @param {array} Data to be processed.
    Allows for pre-processing of the data before it is taken into the data object. Meant to be overridden, otherwise will act as a pass-through. See loadData().*/
    processData:    function(response){ return response; }
};


/**

*/
Wui.Template = function(args){ $.extend(this,args); };
Wui.Template.prototype = {
    /** The HTML template that the data will fit into. Null value will cause an error to be thrown. Specification required. */
    template:    null,
    
    /** A single record to be applied to the template. Null value will cause an error to be thrown. Specification required.  */
    data:        null,
    
    /**
    @param {number} [index] An optional number to make an index available to the record
    @return A jQuery object containing the template paired with its data
    Creates the template 
    */
    make:    function(index){
                var me = this;
                if(me.data && me.template){
                    var tplCopy = me.template;
                    
                    if($.isNumeric(index))    $.extend(me.data,{wuiIndex:index});
                    
                    return $(
                        tplCopy
                        // replaces straight values
                        .replace(/\{(\w*)\}/g,function(m,key){return (me.data[key] !== undefined) ? me.data[key] : "";})
                        // accounts for complex expressions
                        .replace(/\{\((.*?)\)\}/g,function(m,fn){
                            var keys = Wui.getKeys(me.data),
                                vals = [];
                            
                            // fill arrays of keys and their values and make sure they are in the same order
                            for(var i = 0; i < keys.length; i++)        vals.push(me.data[keys[i]]);
                            
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


/** WUI Data List
 @event        wuiselect        A data template is selected ( DataList, el, record )
 @event        wuichange        The selected item info along with the previous selected record if it exists ( DataList, el, record, old el, old record )
 @event        wuideselect        A selected item is clicked again, and thus deselected ( DataList, el, record )
 
 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
 @creation   2013-10-25
 @version    1.1.2
*/
Wui.DataList = function(args){
    $.extend(this, {
        /** @eventhook Called after the data's DOM elements are made */
        afterMake:      function(){},
        
        /** Determines whether templates are made immediately when the DataList is rendered */
        autoLoad:       true,
        
        /** DOM element where all of the data templates will be appended. */
        el:             $('<div>'),
        
        /** Maximum number of data elements to display, even if data set is larger. */
        displayMax:     -1,
        
        /** Method that will run immediately when the object is constructed. */
        init:           function(){},
        
        /** Whether multiple rows/records can be selected at once. */
        multiSelect:    false,
        
        /** An array of the currently selected records */
        selected:       []
    }, args);
    this.init();
};
Wui.DataList.prototype = $.extend(new Wui.O(), new Wui.Template(), new Wui.Data(), {
    /** Overrides the Wui.Data method that serves as an event hook. Calls the DataList's make() method. */
    dataChanged:function(){ this.make(); },
    
    /** Clears the selection on the data list */
    clearSelect:function(){
                    var me = this;
                    me.el.find('.wui-selected').removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuichange'), [me, me.el, me.selected]);
                },
    
    /**
    @param    {object}    itm            Object containing an el (jQuery object), and a rec (data object)
    @param    {boolean}    silent        A true value prevents the 'wuiselect' event from firing
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is selected @private
    */
    itemSelect:function(itm, silent){
                    var me = this;
                        
                    me.el.find('.wui-selected').removeClass('wui-selected');
                    itm.el.addClass('wui-selected');
                    me.selected = [itm];
                    
                    if(!me.multiSelect && !silent)
                        me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec]);
                    
                    return itm;
                },

    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is deselected @private
    */        
    itemDeselect:function(itm){
                    var me = this;
                    itm.el.removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('deselect'),[me, itm.el, itm.rec]);
                    
                    return itm;
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in with listeners added
    Adds the click listeners to the item and calls modifyItem to add greater flexibility
    */
    createItem:    function(itm){
                    var me = this;
                    
                    itm.el.click(function(e){
                        // Determine the # of selected items before the change
                        if(!me.multiSelect || !(e.metaKey || e.ctrlKey)){
                            if(me.selected.length > 0 && me.selected[0] === itm){
                                //deselect item
                                me.itemDeselect(itm);
                            }else{
                                //change selection
                                me.itemSelect(itm);
                            }
                        }else{
                            var alreadySelected = $(this).hasClass('wui-selected');
                            $(this).toggleClass('wui-selected',!alreadySelected);

                            if(alreadySelected) $.each(me.selected || [], function(idx,sel){ if(sel == itm) me.selected.splice(idx,1); });
                            else                me.selected.push(itm);
                        }
                        me.el.trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }).dblclick(function(e){
                        me.itemSelect(itm,true);
                        me.el.trigger($.Event('wuidblclick'),[me, itm.el, itm.rec])
                             .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                             
                        return false; // stops propagation & prevents default
                    });
                    return me.modifyItem(itm);
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The DOM element
    Performs any desired modification on an object - this method is meant to be overridden.
    */
    modifyItem:    function(itm){ return itm.el; },
    
    /** Creates the templates based on current data. Then appends them to the el with listeners */
    make:        function(){
                    var me = this,
                        holdingData = me.data || [],
                        holder = $('<div>');
                    
                    // Clear out items list
                    me.items = [];

                    // Add items to me.items
                    for(var i = 0; (me.displayMax < 0 && i < holdingData.length) || (me.displayMax > 0 && i < me.displayMax && i < holdingData.length); i++){
                        var rec = me.data = holdingData[i],
                            itm = {el:Wui.Template.prototype.make.call(me, i), rec:rec};
                            
                        Array.prototype.push.call(me.items,itm);
                        holder.append(me.createItem(itm));
                    }
                    
                    // Clear out existing items and add new to the DOM
                    me.clear();
                    me.append(holder.children().unwrap());
                    me.data = holdingData;
                    
                    // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                    // object has been manually run
                    me.autoLoad = true;
                    
                    // Event hook and event
                    me.afterMake();
                    me.el.trigger($.Event('refresh'),[me,me.data]);
                    
                    // Reset selected items if any
                    me.resetSelect();
                },
                
    /** Runs when the object has been appended to its target. Then appends the data templates with listeners. */
    onRender:    function(){
                    if(this.autoLoad){
                        if(this.url === null)   this.make();
                        else                    this.loadData();
                    }
                },
                
    /** Refreshes the DataList to match the data or reload it from the server */
    refresh:    function(){ this.onRender(); },
    
    /**  Reselects previously selected rows after a data change or sort. Scrolls to the first currently selected row. */
    resetSelect:function(){
                    var me = this,
                        selList = me.selected;
                    
                    // Clear current selection list after making a copy of previously selected items
                    me.selected = [];
                    
                    $.each(selList || [],function(i,sel){
                        me.each(function(itm){
                            var sameRec = (me.identity) ? itm.rec[me.identity] === sel.rec[me.identity] : JSON.stringify(itm.rec) === JSON.stringify(sel.rec);
                            
                            if(sameRec){
                                if(me.multiSelect){
                                    itm.el.addClass('wui-selected');
                                    me.selected.push(itm, true);
                                }else{
                                    me.itemSelect(itm);
                                }
                            }
                        });
                    });

                    me.scrollToCurrent();
                },
                    
    /** Scrolls the list to the currently selected item. */            
    scrollToCurrent:function(){
                        var me = this,
                            firstSelect = me.el.find('.wui-selected:first'),
                            ofstP = firstSelect.offsetParent(),
                            offset = (function(){ var r = 0; firstSelect.prevAll().each(function(){ r += $(this).outerHeight() - 0.55; }); return  r; })();
                        ofstP.animate({scrollTop:offset },500);
                    },
                    
    /**
    @param    {string} key The data item to look for
    @param    {string|number} val The value to look for
    @return An object containing the dataList, row, and record, or undefined if there was no matching row.
    Selects an item according to the key value pair to be found in a record. */
    selectBy:        function(key,val){
                        var me = this, retVal = undefined;
                        me.each(function(itm){
                            if(itm.rec[key] !== undefined && itm.rec[key] == val)
                                return retVal = me.itemSelect(itm);
                        });
                        me.scrollToCurrent();
                        return retVal;
                    }
});



/**
 @event        wuibtnclick        Fires when the button is pressed and not disabled. Avoided using the standard 'click' event for this reason ( Button Object )
 @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
*/
Wui.Button = function(args){
    $.extend(this, {
        /** The button element. Can be overridden according to the needs of the design. */
        el:            $('<button>').attr({unselectable:'on'}),
        
        /** Whether the button is disabled. */
        disabled:    false,
        
        /** Tool tip text for the button. */
        toolTip:    null,
        
        /** Tab index will make the button focusable by the browser. Changing this value will result in it receiving a higher precedence than what it would receive in that natural flow of the page. */
        tabIndex:    0,
        
        /** Text to appear on the button. Can be HTML if a more complex button design is desired. */
        text:       'Button'
    }, args);
    
    this.init();
};
Wui.Button.prototype = $.extend(new Wui.O(),{
    /** Event hook for the button click. */
    click:      function(){},
    
    /** Method that will run immediately when the object is constructed. Adds the click listener with functionality to disable the button.*/
    init:       function(){ 
                    var me = this;
                    
                    me.el
                    .addClass('wui-btn')
                    .click(btnClick)
                    .keyup(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    if(me.disabled)    me.disable();
                    
                    function btnClick(e){
                        if(!me.disabled){
                            me.click(arguments);
                            me.el.trigger($.Event('wuibtnclick'),[me]);
                        }
                        return false;
                    }
                },
    
    /** Disables the button */
    disable:    function(){
                    this.disabled = true;
                    this.el
                    .toggleClass('disabled',this.disabled)
                    .attr('disabled',true)
                    .removeAttr('tabindex');
                },
    /** Enables the button */
    enable:        function(){
                    this.disabled = false;
                    this.el
                    .toggleClass('disabled',this.disabled)
                    .removeAttr('disabled')
                    .attr({tabindex:this.tabIndex});
                },
    /** Sets the button text. Can be HTML. */
    setText:    function(txt){ return this.el.html(txt); },
});


/**
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

WUI Pane
*/
Wui.Pane = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:        true,
        
        /** Configuration for the pane border - follows the jQuery CSS convention */
        borderStyle:{borderWidth:6},
        
        /** An array of items that will be added to the header */
        tbar:       [],
        
        /** Whether or not the pane is disabled on load */
        disabled:    false,
        
        /** Alignment of the heading title (left,center,right) */
        titleAlign:    'left',
                
        /** Default height */
        height:        '100%',
    
        /** HTML to show in the mask when the pane is disabled */
        maskHTML:    'Empty',
        
        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:        null
    },args); 
    this.init();
};
Wui.Pane.prototype = $.extend(new Wui.O(),{
    /** Disables the pane by masking it and disabling all buttons */
    disable:        function(){
                        this.addMask();
                        this.footer.each(function(itm){ if(itm.disable) itm.disable(); });
                        this.header.each(function(itm){ if(itm.disable) itm.disable(); });
                        return this.disabled = true;
                    },
    
    /** Enables the pane by removing the mask and enabling all buttons */
    enable:            function(){
                            var me = this;
                            me.removeMask();
                            me.footer.each(function(itm){ if(itm.enable) itm.enable(); });
                            me.header.each(function(itm){ if(itm.enable) itm.enable(); });
                            return me.disabled = false;
                    },
    
    /** 
    Adds a mask over the content area of the pane 
    @param  {object}    target  A target to apply the mask, otherwise the pane's container will be masked.
    @return The mask object
    */
    addMask:        function(target){
                        target = (target) ? target : this.container.parent();
                        return this.mask = $('<div>').addClass('wui-mask').html(this.maskHTML).appendTo(target);
                    },

    /** Removes the mask over the content area of the pane */
    removeMask:     function(){
                        var me = this, mask = me.mask || me.el.find('.wui-mask');
                        
                        if(mask){
                            mask.fadeOut(500,function(){ 
                                me.mask = undefined;
                                me.el.find('.wui-mask').remove();
                            });
                        }
                    },

    /**
    @param    {string} html    New HTML content to be set on the disabled mask
    Sets the maskHTML property to the value of html passed in. If mask presently exists it will change the value on the current mask.
    */
    setMaskHTML:    function(html){
                        this.maskHTML = html;
                        if(this.mask)    this.mask.html(html);
                    },
    
    /** Method that will run immediately when the object is constructed. */
    init:            function(wuiPane){
                        var me = wuiPane || this;
                        me.el       = $('<div>').addClass('wui-pane').append(
                                        $('<div>').addClass('wui-pane-wrap').append(
                                            me.container = $('<div>').addClass('wui-pane-content')
                                        )
                                    );
                        me.sureEl   = me.el;

                        // Set  border if applicable
                        if(me.border) me.el.css(me.borderStyle);

                        // Set up header and footer
                        me.header   = new Wui.O({
                                        el:         $('<div><span></span><div class="wui-h-cntnt"></div></div>'), 
                                        cls:        'wui-pane-header wui-pane-bar',
                                        items:      me.tbar,
                                        parent:     me,
                                        appendTo:   me.el,
                                        splice:     function(){ Wui.O.prototype.splice.apply(this,arguments); me.configBar('header'); },
                                        push:       function(){ Wui.O.prototype.push.apply(this,arguments); me.configBar('header'); }
                                    });
                        me.header.elAlias = me.header.el.children('.wui-h-cntnt');
                        me.header.title = me.header.el.children('span:first');
                                       
                        me.footer   = new Wui.O({
                                        el:         $('<div>'),
                                        cls:        'wui-pane-footer wui-pane-bar',
                                        items:      me.bbar,
                                        parent:     me,
                                        appendTo:   me.el,
                                        splice:     function(){ Wui.O.prototype.splice.apply(this,arguments); me.configBar('footer'); },
                                        push:       function(){ Wui.O.prototype.push.apply(this,arguments); me.configBar('footer'); }
                                    });

                        // Set up the content area of the pane
                        me.elAlias  = me.container;

                        me.configBar('header');
                        me.configBar('footer');
                    },

    /**
    @param {barName} bar     Either the header or footer bar on the pane ['header','footer']
    Shows/hides the header or footer depending on whether that item has child items.
     */
    configBar:      function(barName){
                        var me = this, bar = me[barName], isHeader = (barName == 'header'),
                            cssProp = (isHeader) ? 'Top' : 'Bottom',
                            hasItems = bar.items.length > 0 || (isHeader && me.title !== null),
                            pad = hasItems ? 40 : 0,
                            border = hasItems ? 0 : undefined;

                        me.sureEl.css('border' +cssProp+ 'Width', border);
                        me.sureEl.children('.wui-pane-wrap').css('padding' +cssProp, pad);
                        if(hasItems){
                            bar.place();
                            bar.callRender();
                            if(isHeader){
                                me.setTitle(me.title);
                                this.setTitleAlign();
                            } 
                        }else{
                            bar.el.detach();
                        }
                    },

    /** Adds/Removes the footer on the pane and adjusts the content as necessary.
    configFooter:   function(){
                        var me = this, footer = me.footer,
                            hasItems = footer.items.length > 0,
                            padBottom = hasItems ? 40 : 0,
                            borderBottom = hasItems ? 0 : undefined;

                        me.sureEl.css({borderBottomWidth:borderBottom});
                        me.sureEl.children('.wui-pane-wrap').css({paddingBottom:padBottom});
                        if(hasItems){ footer.place(); footer.callRender(); }
                        else{ footer.el.detach(); }
                    },
    
    /** Places the header on the pane and adjusts the content as necessary.
    placeHeader:    function(){
                        this.sureEl.css({borderTopWidth:0});
                        this.sureEl.children('.wui-pane-wrap').css({paddingTop:'40px'});
                        this.setTitleAlign();
                        this.header.place();
                        this.header.callRender();
                    }, */
    
    /** Changes the title on the pane. */
    setTitle:       function(t){ 
                        this.title = t;
                        t = (t && typeof t === 'string') ? t : ''
                        this.header.title.text(t);
                        return this.title;
                    },
    
    /** Changes the title on the pane. */
    setTitleAlign:    function(t){ 
                        var me = this;
                        
                        me.titleAlign = t || me.titleAlign;
                        me.header.title.removeClass().addClass('wui-h-title ' + me.titleAlign);
                        
                        var itemsAlignment = me.titleAlign === 'right' ? 'left' : 'right'; 
                        me.header.elAlias.css('text-align',itemsAlignment);
                    },
    
    /** Runs after a pane is rendered. Sets up layout listeners and sets focus on the bottom-right-most button if any */
    afterRender:    function(){
                        var me = this;
                        
                        document.addEventListener("animationstart", doLayout, false);         // standard + firefox
                        document.addEventListener("MSAnimationStart", doLayout, false);     // IE
                        document.addEventListener("webkitAnimationStart", doLayout, false); // Chrome + Safari
                        
                        function doLayout(){
                            if(!me.parent && !(me instanceof Wui.Window)) me.layout();
                        }

                        if(me.disabled){
                            // If the pane is disabled then it disables it
                            me.disable();
                        }else if(this.footer.items.length){
                            // Set focus to the bottom right most button in the pane
                            this.footer.items[this.footer.items.length - 1].el.focus();
                        }
                    }
});


/**
@event        open    When the window is opened (window)
@event        resize    When the window is resized (width, height)
@event        close    When the window is closed (window)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
WUI Window
*/
Wui.Window = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:        false,
        
        /** Set the height of the window */
        height:        400,
        
        /** Determines whether objects behind the window are accessible */
        isModal:    false,
        
        /** 
        @param {WUI Window} win    The window being closed.
        @eventhook Called just before the window closes. If this function returns false, the window will not be closed. 
        */
        onWinClose:    function(){},
        
        /** 
        @param {WUI Window} win    The window being opened.
        @eventhook Called when the window opens. 
        */
        onWinOpen:    function(){},
        
        /** An array of items that will be added to the header */
        tbar:       [], 
        
        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:        'Window',
        
        /** Change what comes by default in the pane */
        maskHTML:    'Loading <span class="wui-spinner"></span>',
        
        /** Set the width of the window */
        width:        600
    },args);  
    this.init(); 
};
Wui.Window.prototype = $.extend(new Wui.Pane(),{
    /** Closes the window unless onWinClose() event hook returns false. */
    close:        function(){ 
                    var me = this;
                    if(me.onWinClose(me) !== false){
                        me.windowEl.trigger($.Event('close'),[me]);
                        me.remove();
                    }
                },
    
    /** Disables the window by masking it and disabling all buttons besides the close window button. */
    disable:    function(){
                    Wui.Pane.prototype.disable.call(this);
                    this.closeBtn.enable(); // Enable the close button for the window - esp. important if its modal
                },
                
    /** Method that will run immediately when the object is constructed. */
    init:       function(){
                    var me = this;
                    me.appendTo = $('body');
                    
                    // Make it a modal window & add everything to the DOM
                    if(me.isModal){
                        me.modalEl = $('<div>').addClass('wui-overlay');
                        $('body').append(me.appendTo = me.modalEl.css('z-index',Wui.maxZ()));
                    }
                    
                    // Add close buttons where appropriate
                    me.tbar.push(me.closeBtn = new Wui.Button({ click:function(){me.close(); }, text:'X'}));
                    if(me.bbar.length === 0) me.bbar = [new Wui.Button({click:function(){me.close(); }, text:'Close'})];
                    
                    // Calls the parent init function
                    Wui.Pane.prototype.init(me);
                    
                    // Add window specific properties
                    me.windowEl = me.el
                    .draggable({handle: me.header.el, start:bringToFront})
                    .addClass('wui-window')
                    .resizable({
                        minWidth:   me.width,
                        minHeight:  me.height,
                        resize:     function(){ me.container.trigger($.Event('resize'),[me.container.width(), me.container.height()]); }
                    })
                    .css('z-index',Wui.maxZ())
                    .click(bringToFront);
                    
                    me.place();
                    
                    // Resize the window and center
                    me.resize();
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    this.onWinOpen(me);
                    me.windowEl.trigger($.Event('open'),[me]);
                    
                    function bringToFront(e){
                        var maxZ = Wui.maxZ();
                        if(parseInt((me.el.css('z-index')) || 1) <= maxZ){
                            me.el.css('z-index', maxZ);
                        }
                    }
                },

    /** 
    @param {[number]} resizeWidth Number of pixels for the window width
    @param {[number]} resizeHeight Number of pixels for the window height
    
    If width and height aren't specified, the window is sized vertically to try to fit its contents 
    without getting larger than the browser viewport.
    */
    resize:        function(resizeWidth, resizeHeight){
                    var me = this,
                        totalHeight = me.container[0].scrollHeight + (me.header.el.outerHeight() * 2);

                    //size the window to according to arguments, or fit its contents as long as its smaller than the height of the window
                    if(arguments.length !== 0)me.windowEl.height(me.height = resizeHeight).width(me.width = resizeWidth);
                    else                      me.windowEl.height(((totalHeight >= $.viewportH()) ? ($.viewportH() - 10) : totalHeight));
                    
                    // Center window
                    me.windowEl.css({
                        top:        Math.floor(($.viewportH() / 2) - (me.windowEl.height() / 2)) + 'px',
                        left:       Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)) + 'px'
                    });
                    
                    me.container.trigger($.Event('resize'),[me.container.width(), me.container.height()]);
                    
                    me.layout(function(){
                        if(me.isModal){ me.modalEl.css({width:'', height:''}); }
                    });
                }
});


/** Shows an message in a modal window
@param {string}         msg         A message for the user
@param {[string]}       msgTitle    Title for the window. Default is 'Message'
@param {[function]}     callback    Function to perform when the message window closes - returning false will prevent the window from closing.
@param {[string]}       content     An additional Wui object to place on window
@return The Wui.Window object of the message window.
@author     Stephen Nielsen
*/
Wui.msg = function(msg, msgTitle, callback, content){
    var cntnt = (content !== undefined) ? [new Wui.O({el: $('<div>').addClass('wui-msg').html(msg) }), content] : [new Wui.O({el: $('<div>').addClass('wui-msg').html(msg) })],
        msgWin  = new Wui.Window({
            title:      msgTitle || 'Message', 
            isModal:    true,
            items:      cntnt, 
            width:      350, 
            height:     200,
            onWinClose: callback || function(){}
        });
    return msgWin;
};

/** Shows an error message
@param {string}         errMsg      Message explaining the error
@param {[string]}       msgTitle    Title for the window. Default is 'Error'
@param {[array]}        buttons     Array containing Wui.Button(s) to give additional functionality.
@param {[function]}     callback    Function to perform when the error window closes - returning false will prevent the window from closing.
@author     Stephen Nielsen
*/
Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
    var err = Wui.msg(errMsg,msgTitle,callback);
    if($.isArray(buttons))
        err.footer.push.apply(err.footer,buttons);
    err.container.find('.wui-msg').addClass('wui-err');
    return err;
};

/** Shows an message in a modal window with yes and no buttons. Answers are passed to callback().
The window will not close until an answer is selected.

@param {string}         msg         A message for the user
@param {[string]}       msgTitle    Title for the window. Default is 'Message'
@param {[function]}     callback    Function to perform when the message window closes - returning false will prevent the window from closing.
@param {[string]}       content     An additional Wui object to place on window
@return The Wui.Window object of the confirmation message.
@author     Stephen Nielsen
*/
Wui.confirm = function(msg, msgTitle, callback, content){
    var cw = Wui.msg.apply(this,arguments);
    cw.doAnswer = function(ans){
        if(callback && typeof callback == 'function')    callback(ans);
        cw.answerRun = true;
        cw.close();
    };
    cw.onWinClose= function(){ return ((cw.answerRun !== true) ? false : cw.answerRun); };
    cw.footer.splice(0,1,
        new Wui.Button({text:'No', click:function(){ cw.doAnswer(false); }}),
        new Wui.Button({text:'Yes', click:function(){ cw.doAnswer(true); }})
    );
    cw.header.splice(0,1);
    return cw;
};

}(jQuery,this));


/*! W 1.1
 * Copyright (c) 2013 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static4.usurf.usu.edu/resources/wui-nextgen/wui-1-1/license.html
 */

(function($,Wui) {

/** 
@event        tabchange When a tab changes (tab pane, tab button, tab item)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
Tab pane
*/
Wui.Tabs = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:   [],
        
        /** An array of items that will be added to the content */
        items:    [],
        
        /** Tabs default to the right side of the pane unless this is true. */
        tabsLeft:    false,
        
        /** A place holder for the currently selected tab. */
        currentTab:    null,
        
        /** Whether to put the tabs on the header or the footer. */
        tabsBottom:        false,
        
        /** Config to place on child items of WUI tabs to make their heading not show up */
        tabsHideHeader: null,
        
        /** An array of items that will be added to the header */
        tbar:    []
    },args); 
    this.init();
};
Wui.Tabs.prototype = $.extend(new Wui.Pane(),{
    /** Method that will run immediately when the object is constructed. Lays out targets. */
    init:            function(){
                        if(this.title === null)    this.title = '';
                        Wui.Pane.prototype.init.call(this);
                    },
    
    /** Overrides Wui.place(). Creates a Wui.Button as a tab for each item. */
    place:          function(){
                        var me = this;
                        
                        me.el.addClass('wui-tabs');
                        
                        //adds the objects items if any
                        if(me.items === undefined) me.items = [];
                        $.each(me.items,function(idx,itm){
                            itm.tabCls =    'wui-tab ' +
                                            ((itm.tabCls) ? ' ' + itm.tabCls : '') +
                                            ((me.tabsLeft) ? ' left' : '');
                            
                            if(itm.tabsHideHeader){
                                itm.el.css({borderTopWidth:itm.el.css('border-left-width')});
                                itm.el.addClass('wui-hide-heading');
                            }
                            
                            me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.Button({
                                text:   itm.title || 'Tab ' + (parseInt(idx) + 1),
                                click:  function(){ me.giveFocus(itm); },
                                cls:    itm.tabCls
                            }));
                            if(me.bbar.length !== 0) me.placeFooter();
                        });
                        
                        return Wui.O.prototype.place.call(me, function(m){ $.each(m.items,function(i,itm){ itm.el.addClass('wui-tab-panel'); }); }); //.wrap($('<div>')
                    },
    
    /** 
    @param {object} itm A WUI Object that will be matched in the items array. 
    @param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
    
    Sets the specified tab to active. Runs layout on the newly activated item.
    */
    giveFocus:        function(tab, supressEvent){
                        var me = this;
      
                        supressEvent = (supressEvent !== undefined) ? supressEvent : false;
                        
                        $.each(me.items,function(idx,itm){
                            var isActive = itm === tab;
                            itm.tab.el.toggleClass('selected', isActive);
                            itm.el.toggleClass('active', isActive);
                            if(isActive){
                                me.currentTab = itm;
                                if(!supressEvent) me.el.trigger($.Event('tabchange'),[me, itm.tab, itm]);
                                itm.layout();
                            }
                        });
                    },
    
    /** 
    @param {string} txt The text of the tab button
    @param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
    @return The tab that was selected or undefined if the text didn't match any tabs
    
    Gives focus to the tab with text that matches the value of txt. Strings with underscores
    are converted to spaces (eg. 'conferences_detail' = 'conferences detail')
    */
    selectTabByText:function(txt, supressEvent){
                        var me = this, retVal = undefined;
                        $.each(me.items,function(idx,itm){
                            if($.trim(itm.tab.text).toLowerCase() === $.trim(txt).toLowerCase().replace(/_/g,' ')){
                                me.giveFocus(itm, supressEvent);
                                retVal = itm;
                            }
                        });
                        return retVal;
                    },
    onRender:        function(){
                        this.giveFocus(this.items[0]);
                    }
});


/** 
@event          select          When a record is clicked (grid, row el, record)
@event          dblclickrecord  When a record is  double clicked clicked (grid, row el, record)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

The grid pane provides table-like functionality for data sets. Grids can be populated remotely
or have their data locally defined. Grids also support infinite scrolling by defining paging
parameters. Columns for the grid are defined in an array and with the following options:

heading         - The title of the column heading
cls             - A special class to add to the column
vertical        - Makes the column text oriented vertical and the column height at 150px
dataType        - The type of data used in the column (used for sorting)
dataItem        - The item in the record that correlates to this column
dataTemplate    - Sort of a full on renderer, this allows you to format inserted data similar to
                  what is available in Wui.Template
width           - A pixel value for the width of the column
fit             - A numeric indicator of the relative size of the column

Custom renderers can be applied to columns.  These renderers are defined as function that can
either be defined in the column definition, or defined elsewhere in scope and simply named by
a string. The rendering function is defined passed the following parameters as below:

renderer: function(grid, cell, value, record, row){}

Grids can be sorted by clicking on the headings of columns. Headings sort ascending on the first click, 
descending on the second and revert to their 'unsorted' order on the third.Sorting on multiple columns 
is possible with the a number indicating the precedence of the sort and an arrow for the direction of the sort 
appearing on the right side of the column heading.

Columns can be resized by dragging the heading borders left and right. Columns can be sized to 
extend beyond the width of the grid frame, but when sized smaller will pop back into position.

While not using Wui.fit(), the same principles apply in the sizing of elements, although percentage
values are not supported at this time.
*/
Wui.Grid = function(args){
    $.extend(this,{
        /** Array of items that will be added to the footer. */
        bbar:           [],
        
        /** Array of items that will make up the columns of the grid table. */
        columns:         [],
        
        /** URL to get columns if its a dynamic grid */
        colUrl:            null,
        
        /** Params to pass for columns on a dynamic grid */
        colParams:        {},
        
        /** Array of data for the grid. */
        data:            null,
        
        /** Data type the grid assumes a column will be. Matters for sorting. Other values are 'numeric' and 'date' */
        defaultDataType:'string',
        
        /** Whether multiple rows/records can be selected at once. */
        multiSelect:    false,
        
        /** Whether or not to hide the column headers */
        hideHeader:        false,
        
        /** An array of the currently selected records */
        selected:        [],
        
        /** An array of items that will be added to the header */
        tbar:           []
    },args); 
    this.init();
};
Wui.Grid.prototype = $.extend(new Wui.Pane(), new Wui.DataList(),{
    /** Overrides DataList.afterMake(), sizes the columns and enables the grid @eventhook */
    afterMake:    function(){
                    this.sizeCols();
                    this.removeMask();
                },
    
    /** 
    Recursive function for sorting on multiple columns @private
    @param {number}    depth    Depth of the recursive call
    @param {number}    a        First item to compare
    @param {number}    b        Second item to compare
    
    @return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
    */
    doSort:            function(depth,a,b){
                        var me = this;
                        if(me.sorters.length > 0){
                            var col = me.sorters[depth],
                                compA = a.rec[col.dataItem],
                                compB = b.rec[col.dataItem];
                                
                            //get the direction of the second sort
                            var srtVal = (col.sortDir == 'asc') ? 1 : -1;
                            
                            // perform the comparison based on 
                            var compare = 0;
                            switch(col.dataType){
                                case 'date':
                                    compA = new Date(compA);
                                    compB = new Date(compB);
                                    compare = (compA.getTime() == compB.getTime()) ? 0 : (compA.getTime() > compB.getTime()) ? 1 : -1;
                                    break;
                                case 'numeric':
                                    compA = (parseFloat(compA)) ? parseFloat(compA) : 0;
                                    compB = (parseFloat(compB)) ? parseFloat(compB) : 0;
                                    compare = (compA == compB) ? 0 : (compA > compB) ? 1 : -1;
                                    break;
                                default:
                                    compare = $.trim(compA).toUpperCase().localeCompare($.trim(compB).toUpperCase());
                            }
                            
                            if(compare !== 0 || me.sorters[depth + 1] === undefined)    return compare * srtVal;
                            else                                                    return me.doSort(depth + 1,a,b);
                        }else{
                            return (a.rec.wuiIndex > b.rec.wuiIndex) ? 1 : -1;
                        }
                    },
                    
    /** Verify that columns have been defined on the grid, or that they are available remotely */
    getColumns: function(){
                    var me = this;
                    
                    if(me.colUrl && me.colUrl.length){
                        // Make remote call for columns
                        me.colProxy = new Wui.Data({url:me.colUrl, params:me.colParams, afterSet:function(r){ me.setColumns(r); } });
                        me.colProxy.loadData();
                    }else if(me.columns.length){
                        // Check for locally defined columns
                        me.setColumns(me.columns);
                    }else{
                        //throw('There are no columns defined for this WUI Grid.');
                    }
                        
                },
    
    /** Runs when the object is created, creates the DOM elements for the grid within the Wui.Pane that this object extends */
    init:        function(){
                    var me = this;
                    
                    // Set up container
                    Wui.Pane.prototype.init.call(me);
                    me.el.addClass('wui-grid');

                    // Add grid specific DOM elements and reset elAlias
                    me.tblContainer = $('<div><table></table></div>').addClass('grid-body').appendTo(me.elAlias);
                    me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh').appendTo(me.elAlias);
                    me.elAlias = me.tbl = me.tblContainer.children('table');
                    me.heading = me.headingContainer.children('ul');
                    
                    // columns and sorting on multiple columns
                    me.cols = [];
                    me.sorters = [];
                    
                    // hide the header
                    if(me.hideHeader)    me.headingContainer.height(0);
                },
    
    /** Overrides the Wui.O layout function and positions the data and sizes the columns. */
    layout:     function(){
                    Wui.O.prototype.layout.call(this);
                    this.posDataWin();
                    if(this.cols.length) this.sizeCols();
                },
                    
    /** Overrides DataList.loadData(), to add the load mask */   
    loadData:    function(){
                    this.setMaskHTML('Loading <span class="wui-spinner"></span>');
                    this.addMask();
                    Wui.Data.prototype.loadData.apply(this,arguments);
                },            
    
    /** 
    @param    {object}    col    An object containing the sort direction and DOM element of the heading
    @param    {string}    dir    The direction of the sort
    Manages the sorters for the grid by keeping them in an array. 
    */
    mngSorters:        function(col,dir){
                        var me = this,
                            sortClasses = ['one','two','three','four','five'];
                        if(dir !== undefined){
                            col.sortDir = dir;
                            me.sorters.push(col);
                        }else{
                            if(col.sortDir){
                                if(col.sortDir == 'desc'){
                                    delete col.sortDir;
                                    col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                    
                                    $.each(me.sorters,function(i,itm){
                                        if(itm == col)    me.sorters.splice(i,1);
                                    });
                                }else{
                                    col.sortDir = 'desc';
                                }
                            }else{
                                // Can't sort on more than 5 columns
                                if(me.sorters.length > 5){
                                    col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                    return false;
                                }
                                
                                col.sortDir = 'asc';
                                me.sorters.push(col);
                            }
                        }
                            
                        $.each(me.sorters,function(i,itm){
                            itm.el.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir).addClass(itm.cls);
                        });
                    },
    
    /** Overrides DataList.modifyItem(), to implement the renderers */        
    modifyItem:    function(itm){
                    var me = this;
                    // Perform renderers (if any)
                    $.each(me.renderers,function(idx, r){
                        var cell = itm.el.children(':eq(' +r.index+ ')').children('div'),
                            val = itm.rec[r.dataItem];
                        
                        cell.empty().append(r.renderer.call(null, cell, val, itm.rec, itm.el));
                    });
                    return itm.el;
                },
    
    /** Overrides DataList.onRender(), to have the grid wait for columns before loading data while still preserving the set autoLoad value. */   
    onRender:    function(){
                    // Store the real value of autoLoad, but set it to false so that the grid waits for the columns
                    // before loading data.
                    var me = this, al = me.autoLoad;
                    me.autoLoad = false;
                    
                    //Wui.Pane.prototype.onRender.call(this);
                    Wui.DataList.prototype.onRender.call(this);
                    
                    // Start with getting the columns - Many methods waterfall from here
                    me.autoLoad = al;
                    this.getColumns();
                },
    
    /** Positions the height and width of the data table's container @private */
    posDataWin:        function(){
                        var hh = this.headingContainer.height() - 1;
                        this.tblContainer.css({height:this.container.height() - hh, top:hh});
                    },
    
    /** Overrides DataList.refresh() to add disabling the grid to add the load mask */
    refresh:        function(){
                        if(this.url === null)    this.setData(this.data);
                        else                    this.getColumns();
                    },    

    /** Fill in gaps in the column definition and append to the cols array. The cols array is what the grid uses to 
    render/reference columns. The append the column to the DOM */            
    renderColumn:function(col,idx){
                    var me = this;
                    
                    $.extend(col,{
                        dataType:    col.dataType || me.defaultDataType,
                        fit:        (col.fit === undefined) ? (col.width === undefined) ? 1 : 0 : col.fit,
                        cls:        col.cls || '',
                        renderer:    (col.renderer) ?    (function(a){
                                                            // Handles renderer if it exists
                                                            if(typeof a !== 'function' && eval('typeof ' + a) == 'function')
                                                                a = new Function('return ' + a + '.apply(this,arguments)');
                                                            if(typeof a === 'function')
                                                                me.renderers.push({dataItem:col.dataItem, renderer:a, index:idx});
                                                        })(col.renderer) : '',
                        index:        idx,
                        width:        col.width === undefined ? 0 : col.width,
                        el:            $('<li>')
                                    .append($('<div>').text(col.heading))
                                    .attr({unselectable:'on'})
                                    .addClass('wui-gc ' + col.cls)
                                    .click(function(){ me.sortList(col); })
                    });
                    
                    //grids with single columns shouldn't have a resizable option
                    if(me.columns.length > 1 && !col.vertical){
                        col.el.resizable({
                            handles:    'e',
                            start:      function(event,ui){ me.tempLayout = me.layout; me.layout = function(){}; },
                            stop:       function(event,ui){ me.sizeCols(); me.layout = me.tempLayout; },
                            resize:     function(event,ui){ 
                                            col.width = ui.size.width; col.fit = 0;
                                            Wui.fit(me.cols,'width',(me.tbl.find('tr:first').height() * me.total > me.tblContainer.height()));
                                        }
                        });
                    }
                    
                    me.cols.push(col);
                    
                    // Append newly created el to the DOM
                    me.heading.append(col.el);
                },
    
    /** Ensures that columns have all of the proper information */
    setColumns: function(cols){
                    var me = this;
                    
                    // clear column list
                    me.columns = cols;
                    me.heading.empty();
                    me.cols = [];
                    me.items = [];
                    me.renderers = [];
                    
                    // clear template
                    me.template = '<tr class="{((wuiIndex % 2 == 0) ? \'even\' : \'odd\')}">';
                    
                    // apply columns on grid
                    $.each(cols,function(i,col){
                        // Add to the template string based on column info
                        var tpltItem = (col.dataTemplate) ? col.dataTemplate : ((col.dataItem) ? '{' +col.dataItem+ '}' : '');
                        me.template += '<td><div>' +tpltItem+ '</div></td>';
                        
                        // Deal with vertical columns - forces them to be 48px wide
                        if(col.vertical){
                            me.el.addClass('has-vert-columns');
                            if(col.cls)    col.cls += ' vert-col';
                            else        col.cls = 'vert-col';
                            
                            col.width = 50;
                            delete col.fit;
                        }
                        
                        // Add column to cols array
                        me.renderColumn(col,i);
                    });
                    
                    // finish template
                    me.template += '</tr>';
                    
                    if(me.autoLoad){
                        if(me.url === null)    me.setData(me.data);
                        else                me.loadData();
                    }
                },
                
    /** Size up the columns of the table to match the headings @private */
    sizeCols:        function (){
                        var me = this, totalColWidth = 0;
                        Wui.fit(me.cols,'width',(me.tbl.find('tr:first').height() * me.total > me.tblContainer.height()));
                        for(var i = 0; i < me.cols.length; i++){
                            var colWidth = me.cols[i].el.outerWidth() - ((i === 0 || i == me.cols.length - 1) ? 1 : 0);
                            me.tbl.find('td:eq(' +i+ ')').css({width:colWidth}); // account for table borders
                            totalColWidth += colWidth;
                        }
                        me.tbl.css({width:totalColWidth});
                    },
                    
    /**
    @param    {object}    Column object associated with a particular column element
    Sort the grid based on the values of one or more columns. If the grid is paging
    then sort remotely.
    */
    sortList:        function(col) {
                        var me = this;
                        
                        me.mngSorters(col);
                        
                        // Sort the list
                        var listitems = me.items;
                        listitems.sort(function(a, b){ return me.doSort(0, a, b); });

                        me.tbl.detach();
                        // Place items and reset alternate coloring
                        $.each(listitems, function(idx, row) { 
                            var isEven = idx % 2 === 0;
                            row.el.toggleClass('even',isEven).toggleClass('odd',!isEven).appendTo(me.tbl);
                        });
                        me.tbl.appendTo(me.tblContainer);
                        me.resetSelect();
                    }
});

}(jQuery,Wui));


/*! W 1.1
 * Copyright (c) 2013 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static4.usurf.usu.edu/resources/wui-nextgen/wui-1-1/license.html
 */

(function($, window, Wui) {

/**
WUI State Machine

The WUI state machine allows for helping the browser to keep a history of the state of a javascript application by utilizing 
text in the URL after the hash ('#'). The WUI state machine follows this format:

In the hash (as a string):          <view 1>?<param1>=<param1 value>&<param2>=<param2 value>/<view 2>?<param1>=<param2 value>

...or without the placeholders:     adminView?pic=one&id=57/adminWindow?info=salary

In the state machine (as an array): [
                                        {
                                            view:   'adminView', 
                                            params: { pic:one, id:57 }
                                        },
                                        {
                                            view:   'adminWindow', 
                                            params: { info:salary }
                                        }
                                    ]
                                        
The hashchange event is written by:
Copyright (c) 2010 "Cowboy" Ben Alman,
Dual licensed under the MIT and GPL licenses.
http://benalman.com/about/license/
*/
Wui.stateMachine = function(args){ $.extend(this, {
    /** Placeholder for functions passed in using setChangeAction */
    changeMethod:    function(){}
},args); };
Wui.stateMachine.prototype = {
    /**
    @param    {string|array}    state    A string or an array describing the state of the page
    @return The state that was just set on the page.
    Sets the state passed in to the window.location as a string. State arrays passed in are converted.
    */
    setState:        function(state){
                        var url            = window.location.href.split('#'),
                            preHash        = url[0] + '#',
                            setState    = preHash;
                            
                            // Objects passed in are parsed according to a strict format of 
                            // firstView?param1=1/anotherView?param1=1¶m2=2 ...
                            if(state && typeof state === 'object'){
                                setState = preHash + this.stringify(state);
                            // If a string is passed in just pass it along
                            }else if(state && typeof state === 'string'){
                                setState = preHash + state;
                            }
                            
                        return window.location = setState;
                    },
    
    /**
    @param    {array}    stateArray    An array containing objects that describe a WUI state
    @return A WUI state string.
    State arrays passed in are converted to a WUI state string suitable for being used as hash text.
    */
    stringify:        function(stateArray){
                        var stateStr    = '';
                        
                        for(var i in stateArray){
                            // Get keys in alphabetical order so that comparing states works
                            var keys = Wui.getKeys(stateArray[i].params);

                            // State the location
                            stateStr += ((i > 0) ? '/' : '') + stateArray[i].view;
                            
                            for(var j = 0; j < keys.length; j++)
                                stateStr += ((j > 0) ? '&' : '?') + keys[j] + '=' + stateArray[i].params[keys[j]];
                        }
                        
                        return stateStr;
                    },
    
    /**
    @return A WUI state machine formatted array.
    Gets the hash text of the URL and converts it to a WUI state array.
    */
    getState:        function(){
                        var state = [];
                        
                        window.location.hash.replace(/([^\/^#]+)/g,function(viewarea){
                            var itm = {};
                            viewarea = viewarea.replace(/(\?|\&)([^=]+)\=([^&]+)/g,function(match,delim,key,val){
                                itm[key] = val;
                                return '';
                            });
                            state.push({view:viewarea, params:itm});
                        });
                        
                        return state;
                    },
    
    /**
    @param    {string}    target    The view from which to retrieve the parameter.
    @param    {string}    key        The name of the parameter to retrieve.
    @return The value of a hash parameter or undefined.
    Returns a parameter value for a specified target view and parameter key.
    */
    getParam:        function(target,key){
                        var state    = this.getState(),
                            val        = undefined;
                            
                        for(var i in state)
                            if(state[i].view === target && state[i].params[key])    return state[i].params[key];

                        return val;
                    },
                    
    /**
    @param    {string}        target    The view on which to set the parameter.
    @param    {string}        key        The name of the parameter to set.
    @param    {string|number}    value    The value of the parameter
    @return The value passed in, or undefined if setting the parameter failed.
    Set a hash parameter within certain view.
    */
    setParam:        function(target,key, value){
                        var state    = this.getState();
                            
                        for(var i in state){
                            if(state[i].view === target && state[i].params[key]){
                                state[i].params[key] = value;
                                this.setState(state);
                                return value;
                            }    
                        }
                        
                        return undefined;
                    },
    
    /**
    @param    {string}    oldView        Name of the view to change.
    @param    {string}    newView        New name of the view.
    Changes a view in place leaving the parameters
    */
    changeView:        function(oldView,newView){
                        var state = this.getState();
                        for(var i in state)
                            if(state[i].view === oldView)
                                state[i].view = newView;
                        this.setState(state);
                    },
                    
    /**
    @param    {string}    viewName    Name of the view
    @param    {object}    [params]    An object containing key value pairs
    Sets a single view and associated parameters on the URL.
    */                
    setView:        function(viewName,params){
                        var newState = [{view:viewName}];
                        if(params) newState[0].params = params;
                        this.setState(newState);
                    },
    
    /**
    @return    An array of views on the hash.
    Gets all of the available views of the URL
    */
    getViews:        function(){
                        // Lists all of the views
                        var state = this.getState(),
                            retArr = [];
                            
                        for(var i = 0; i < state.length; i++)
                            retArr.push(state[i].view);

                        return retArr;
                    },
                    
    /** Sets a blank hash */
    clearState:        function(){ this.setState(); },
    
    /**
    @param {function} fn Function to perform when the state of the URL changes.
    Sets me.changeMentod 'hashchange' listener function on the window for when the URL changes and 
    passes that function a WUI state array. If a changeMethod has already been defined, the new method
    will contain calls to both the old changeMethod and the new one.
    */
    addChangeMethod:function(fn){ 
                        var me = this,
                            state = me.getState(),
                            oldChange = me.changeMethod;
                            
                        me.changeMethod = function(args){
                            oldChange(args);
                            fn(args);
                        };
                            
                        $(window).off('hashchange').on('hashchange', function(){
                            me.changeMethod.call(me,state);
                        });
                    },
                    
    /** Removes the 'hashchange' listener, and clears out me.changeMethod effectively turning off the state machine. */
    turnOff:        function(){ this.changeMethod = function(){}; $(window).off('hashchange'); }
};

}(jQuery, this, Wui));


/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){

'$:nomunge'; // Used by YUI compressor.

// Reused string.
var str_hashchange = 'hashchange',

// Method / object references.
doc = document,
fake_onhashchange,
special = $.event.special,

// Does the browser support window.onhashchange? Note that IE8 running in
// IE7 compatibility mode reports true for 'onhashchange' in window, even
// though the event isn't supported, so also test document.documentMode.
doc_mode = doc.documentMode,
supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );

// Get location.hash (or what you'd expect location.hash to be) sans any
// leading #. Thanks for making this necessary, Firefox!
function get_fragment( url ) {
url = url || location.href;
return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
}

// Method: jQuery.fn.hashchange
// 
// Bind a handler to the window.onhashchange event or trigger all bound
// window.onhashchange event handlers. This behavior is consistent with
// jQuery's built-in event handlers.
// 
// Usage:
// 
// > jQuery(window).hashchange( [ handler ] );
// 
// Arguments:
// 
//  handler - (Function) Optional handler to be bound to the hashchange
//    event. This is a "shortcut" for the more verbose form:
//    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
//    all bound window.onhashchange event handlers will be triggered. This
//    is a shortcut for the more verbose
//    jQuery(window).trigger( 'hashchange' ). These forms are described in
//    the <hashchange event> section.
// 
// Returns:
// 
//  (jQuery) The initial jQuery collection of elements.

// Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
// $(elem).hashchange() for triggering, like jQuery does for built-in events.
$.fn[ str_hashchange ] = function( fn ) {
return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
};

// Property: jQuery.fn.hashchange.delay
// 
// The numeric interval (in milliseconds) at which the <hashchange event>
// polling loop executes. Defaults to 50.

// Property: jQuery.fn.hashchange.domain
// 
// If you're setting document.domain in your JavaScript, and you want hash
// history to work in IE6/7, not only must this property be set, but you must
// also set document.domain BEFORE jQuery is loaded into the page. This
// property is only applicable if you are supporting IE6/7 (or IE8 operating
// in "IE7 compatibility" mode).
// 
// In addition, the <jQuery.fn.hashchange.src> property must be set to the
// path of the included "document-domain.html" file, which can be renamed or
// modified if necessary (note that the document.domain specified must be the
// same in both your main JavaScript as well as in this file).
// 
// Usage:
// 
// jQuery.fn.hashchange.domain = document.domain;

// Property: jQuery.fn.hashchange.src
// 
// If, for some reason, you need to specify an Iframe src file (for example,
// when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
// do so using this property. Note that when using this property, history
// won't be recorded in IE6/7 until the Iframe src file loads. This property
// is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
// compatibility" mode).
// 
// Usage:
// 
// jQuery.fn.hashchange.src = 'path/to/file.html';

$.fn[ str_hashchange ].delay = 50;
/*
$.fn[ str_hashchange ].domain = null;
$.fn[ str_hashchange ].src = null;
*/

// Event: hashchange event
// 
// Fired when location.hash changes. In browsers that support it, the native
// HTML5 window.onhashchange event is used, otherwise a polling loop is
// initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
// see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
// compatibility" mode), a hidden Iframe is created to allow the back button
// and hash-based history to work.
// 
// Usage as described in <jQuery.fn.hashchange>:
// 
// > // Bind an event handler.
// > jQuery(window).hashchange( function(e) {
// >   var hash = location.hash;
// >   ...
// > });
// > 
// > // Manually trigger the event handler.
// > jQuery(window).hashchange();
// 
// A more verbose usage that allows for event namespacing:
// 
// > // Bind an event handler.
// > jQuery(window).bind( 'hashchange', function(e) {
// >   var hash = location.hash;
// >   ...
// > });
// > 
// > // Manually trigger the event handler.
// > jQuery(window).trigger( 'hashchange' );
// 
// Additional Notes:
// 
// * The polling loop and Iframe are not created until at least one handler
//   is actually bound to the 'hashchange' event.
// * If you need the bound handler(s) to execute immediately, in cases where
//   a location.hash exists on page load, via bookmark or page refresh for
//   example, use jQuery(window).hashchange() or the more verbose 
//   jQuery(window).trigger( 'hashchange' ).
// * The event can be bound before DOM ready, but since it won't be usable
//   before then in IE6/7 (due to the necessary Iframe), recommended usage is
//   to bind it inside a DOM ready handler.

// Override existing $.event.special.hashchange methods (allowing this plugin
// to be defined after jQuery BBQ in BBQ's source code).
special[ str_hashchange ] = $.extend( special[ str_hashchange ], {

// Called only when the first 'hashchange' event is bound to window.
setup: function() {
  // If window.onhashchange is supported natively, there's nothing to do..
  if ( supports_onhashchange ) { return false; }
  
  // Otherwise, we need to create our own. And we don't want to call this
  // until the user binds to the event, just in case they never do, since it
  // will create a polling loop and possibly even a hidden Iframe.
  $( fake_onhashchange.start );
},

// Called only when the last 'hashchange' event is unbound from window.
teardown: function() {
  // If window.onhashchange is supported natively, there's nothing to do..
  if ( supports_onhashchange ) { return false; }
  
  // Otherwise, we need to stop ours (if possible).
  $( fake_onhashchange.stop );
}

});

// fake_onhashchange does all the work of triggering the window.onhashchange
// event for browsers that don't natively support it, including creating a
// polling loop to watch for hash changes and in IE 6/7 creating a hidden
// Iframe to enable back and forward.
fake_onhashchange = (function(){
var self = {},
  timeout_id,
  
  // Remember the initial hash so it doesn't get triggered immediately.
  last_hash = get_fragment(),
  
  fn_retval = function(val){ return val; },
  history_set = fn_retval,
  history_get = fn_retval;

// Start the polling loop.
self.start = function() {
  timeout_id || poll();
};

// Stop the polling loop.
self.stop = function() {
  timeout_id && clearTimeout( timeout_id );
  timeout_id = undefined;
};

// This polling loop checks every $.fn.hashchange.delay milliseconds to see
// if location.hash has changed, and triggers the 'hashchange' event on
// window when necessary.
function poll() {
  var hash = get_fragment(),
    history_hash = history_get( last_hash );
  
  if ( hash !== last_hash ) {
    history_set( last_hash = hash, history_hash );
    
    $(window).trigger( str_hashchange );
    
  } else if ( history_hash !== last_hash ) {
    location.href = location.href.replace( /#.*/, '' ) + history_hash;
  }
  
  timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
}

return self;
})();

})(jQuery,this);


/*! W 1.1
 * Copyright (c) 2013 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static4.usurf.usu.edu/resources/wui-nextgen/wui-1-1/license.html
 */

(function($,Wui) {

$.fn.overrideNodeMethod = function(methodName, action) {
    var originalVal = $.fn[methodName];
    var thisNode = this;
    $.fn[methodName] = function() {
        if (this[0]==thisNode[0]) {
            return action.apply(this, arguments);
        } else {
            return originalVal.apply(this, arguments);
        }
    };
};

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@event  formupdate Fires when a field on the form changes. Passes (event, form, [field])
A WUI Form is a collection of Wui.FormField objects with methods to
both collectively and individually interact with those objects.
*/
Wui.Form = function(args){
    $.extend(this,{
        /** Config to disable the entire form */ 
        disabled:       false,
        
        /**  Position of the label relative to the form fields that is generally applied unless
        specifically defined on a particular field. */
        labelPosition:  'top',

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:      null
    }, args, {
        /** Flag for whether data on the form has been changed - set by the individual fields */
        formChanged:    false,
        
        /** DOM element of the form */
        el:             $('<div>').addClass('wui-form'),
        
        /** @private Array to store one or more errors when a form is validated */
        errors:         []
    });
    
    this.init();
};
Wui.Form.prototype = $.extend(new Wui.O(),{
    /** Blanks out the values of all form fields. Value of fields will be null*/
    clearData:  function(){ this.setData(); },

    /** Display errors generated by validating the form */
    dispErrors:    function(){
                    var msg = '';
                    for(var e = 0; e < this.errors.length; e++) msg += this.errors[e] + '<br/>';
                    Wui.errRpt(msg,'Form Errors');
                },

    /**
    @param {function} fn A function that gets called for each item of the form with the exception of Wui.Note objects
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    each:        function(f){
                    return Wui.O.prototype.each.call(this,function(itm,i){
                        if(!(itm instanceof Wui.Note)) return f(itm,i);
                    });
                },

    /** Class to hilight form fields when they fail validation */
    errCls:        'wui-form-err',

    /**
    @return Object containing the data of the form fields, or false if there was a validation error
    Performs validation on the form and returns either the form data or false. */
    getData:    function(){
                    if(this.validate())    { return this.getRawData(); }
                    else                { this.dispErrors(); return false; }
                },

    /**
    @param {string} fieldname name of the desired field.
    @return Value of the field
    Returns a form item's value - does not perform validation. */
    getField:   function(fieldname){
                    var retval = null;
                    this.each(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
                    return retval;
                },
    
    /**
    @param {string} fieldname name of the desired field.
    @return Form item, not the DOM element, but the item in memory
    Returns a form item. */
    getFrmItm:    function(fieldname){
                    var retItm = undefined;
                    this.each(function(itm,idx){ if(itm.name == fieldname) retItm = itm; });
                    return retItm;
                },
                
    /**
    @return Object containing the data of the form fields
    Gets the values of form fields without performing validation */
    getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); });
                    return ret;
                },
                
    /** Method that will run immediately when the object is constructed. */           
    init:        function(){},
                
    /**
    @param    {object|Wui.FrmField}    itm    Object to be added to a form
    @return Object with form attributes applied.
    Passed in items should either be Wui.FormField's which will have some of the form's attributes applied to them,
    or they will be objects containing an 'ftype' which is a string specifying a constructor.  The
    object will then be constructed and have form attributes applied. */
    normFrmItem:function(itm){
                    var me = this;

                    // If a form is disabled, the field needs to be disabled too
                    if(!(itm.disabled && itm.disabled === true)) $.extend(itm,{disabled: me.disabled});

                    if(itm.ftype && !(itm instanceof Wui.FormField)){
                        // If a field has its labelPosition defined then leave it alone, otherwise use the form's value.
                        if(!(itm.labelPosition)) $.extend(itm,{labelPosition: me.labelPosition});
                        // If a field has its labelSize defined then leave it alone, otherwise use what form's value.
                        if(!(itm.labelSize)) $.extend(itm,{labelSize: me.labelSize});
                        
                        var ft = itm.ftype.split('.');
                        
                        if(window[ft[0]] && window[ft[0]][ft[1]])   return new window[ft[0]][ft[1]](itm);
                        else                                        throw('Object type ' +itm.ftype+ ' is not defined.');
                    }else if(itm instanceof Wui.FormField){
                        // If a field has its labelPosition defined then leave it alone, otherwise use what form's value.
                        if(!itm.hasOwnProperty('labelPosition') && itm.lbl) itm.lbl.setLabelPosition(me.labelPosition);

                        // If a field has its labelSize defined then leave it alone, otherwise use what form's value.
                        if(!itm.hasOwnProperty('labelSize') && itm.lbl) itm.lbl.setLabelSize(me.labelSize);

                        return itm;
                    }else{
                        return itm;
                    }
                },
                
    /**
    @param {function} [after]    A function to be called after an object has been placed
    @return The object that was placed 
    Similar to the Wui.O.place() with the addition of constructing the forms items first. */
    place:      function(){
                    var me = this;
                    if(me.items === undefined) me.items = [];
                    me.each(function(itm,i){ me.items[i] = me.normFrmItem(itm); });
                    return Wui.O.prototype.place.apply(this,arguments);
                },
    
    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Similar to the Wui.O.push() with the addition of running normFrmItem() on the item first.
    */
    push:        function(){
                    var me = this, itms = [];
                    $.each(arguments,function(i,arg){ itms.push(me.normFrmItem(arg)); });
                    return Wui.O.prototype.push.apply(this,itms);
                },
    /**
    @param {string} fieldname The name of the field to be removed
    @return True
    Removes a form field from a form based on its name.
    */
    remFrmItm:    function(fieldname){
                    var me = this;
                    this.each(function(itm,idx){ if(itm.name == fieldname) Wui.O.prototype.splice.call(me,idx,1); });
                    return true;
                },
    
    /** Changes the state of whether the form has changed. Fires the 'formupdate' event if true. Gets set to false when
        the form is validated or when data is set on the form.
    @param {boolean} changed True if the form changed, false to reset that value.
    @param {object} changedItem The item that actually changed.
    @return The value of the changed 
    */
    formChange: function(changed,changedItem){
                    if(changed) this.el.trigger($.Event('formupdate'), [this, changedItem]);
                    this.formChanged = changed;
                    return this.formChanged;
                },
    
    
    /**
    @param {object}     [data]            A collection of data to be set on the form
    @param {boolean}    [fireEvents]    A boolean value that if set to false will suppress events. 
    Sets form fields with names matching keys in passed in data. If data is not defined all
    form values get set to null. 
    This method will fail unless the items of the form are initialized W formField objects
    */
    setData:    function(data,fireEvents){
                    if(data){
                                this.setData();
                                this.each(function(itm){ 
                                    if(data[itm.name]) 
                                        itm.val(data[itm.name],fireEvents);
                                });
                            }
                    else    {    this.each(function(itm){ itm.val(null,fireEvents); }); }
                    this.formChange(false);
                },
    
    /** Disable all form fields */
    disable:    function(){ return this.each(function(itm){ itm.disable(); }); },
    
    /** Enable all form fields */
    enable:        function(){ return this.each(function(itm){ itm.enable(); }); },
    
    /**
    @param {string} fieldname The name of the field to set a value on
    @param {any} v    Value to set the field to.
    Sets a field of a given name to a given value.
    This method will fail unless the items of the form are initialized W formField objects
    */
    setField:   function(fieldname, v){
                    this.each(function(itm){ if(itm.name == fieldname) itm.val(v); });
                },
    
    /**
    @param {string} err An error message.
    Adds a thrown error to the form's errrs array so that all errors on a form can be reported at once.
    */
    throwError:   function(err){this.errors.push(err); return false;},
    
    /**
    Runs the validate() function for each of a form's fields.
    */
    validate:   function(){
                    var me = this;
                    me.errors = [];
                    me.each(function(itm){ 
                        if(itm.el && itm.el.toggleClass) { itm.el.toggleClass(me.errCls,!itm.validate()); }
                    });
                    this.formChange(false);
                    return (me.errors.length === 0);
                }
});


/** 
    Allows a note to be placed on a form. A HTML string will be converted into DOM elements
    placed within a div tag. The note can be included in the items on a form, but the form
    will not attempt to validate like the other items.
*/
Wui.Note = function(args){ 
    $.extend(this,{
        /** The HTML to be placed in the note */
        html:''
    },args); this.init();
};
Wui.Note.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. */
    init:       function(){ this.el = $('<div>').html(this.html).addClass('wui-note'); }
});


/** 
    The label object will wrap around a Wui.FormField when the 'label' config is specified
    on the field. The labelPosition is usually supplied by the field the label will wrap, but
    it has its own property, and can be instantiated by itself.
*/
Wui.Label = function(args){ 
    $.extend(this,{
        /**
            String that will converted into DOM elements and placed in the label.
            This is usually the value of the label config on a Wui.FormField.
        */
        html:           '',
        
        /** Default position of the label relative to the field (top,right,bottom,left). */
        labelPosition:  'top',

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:      null
    },args);
    
    this.init(); 
};
Wui.Label.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. */
    init:               function(){
                            var me = this;
                            me.el = $('<div>').addClass('wui-lbl').append( 
                                me.label = $('<label>').addClass(me.cls).attr(me.attr ? me.attr : {})
                            );
                            me.setLabel();
                            me.setLabelPosition();
                        },
    
    /**
    @param {string} newLabel String that will converted into DOM elements and placed in the label.
    @return Returns the HTML content of the label
    Changes the contents of the label.
    */
    setLabel:           function(newLabel){
                            newLabel = newLabel || this.html;
                            this.label.html(this.html = newLabel);
                            return this.label.html();
                        },

    /**
    @param {string} pos A string to verify the label position
    Verify's that the label's position is either top, right, bottom or left.
    @return the verified lowercase position string, or the label's current position if the passed in value isn't valid.
    */
    verifyPosition:     function(pos){
                            if(pos && (pos = pos.toLowerCase()) && $.inArray(pos,['top', 'left', 'bottom', 'right']) >= 0)
                                return pos;
                            else
                                return this.labelPosition;
                        },

    /**
    @param {number} size An integer for the size (height or width depending on the label position) of the label
    Changes the size of the label from the default values, or if size is undefined, resets the defaults.
    */
    setLabelSize:       function(size){
                            var me = this;
                            size = size || me.labelSize;

                            // Clear out and reset the size of el padding
                            this.el.css({
                                paddingLeft:    undefined,
                                paddingRight:   undefined,
                                paddingTop:     undefined,
                                paddingBottom:  undefined
                            });
                            // Clear out and reset the size of the label
                            this.label.css({
                                width:    undefined,
                                height:   undefined
                            });

                            if($.isNumeric(size)){
                                var dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width',
                                    margin = (dimension == 'height') ? 0 : (me.labelPosition == 'left') ? parseInt(me.label.css('margin-right')) : parseInt(me.label.css('margin-left'));
                                this.el.css('padding-' + me.labelPosition, size);
                                this.label.css(dimension, size - margin);
                                if(me.field)
                                    me.field.labelSize = me.labelSize = size;
                            }
                        },

    /**
    @param {string} position The value for the new label position (top, left, bottom, right)
    @return Returns the position that was set. Invalid passed in values will not change the current label position.
    */
    setLabelPosition:   function(position){
                            var me = this;

                            position = me.verifyPosition(position);
                            me.el.removeClass('lbl-' + me.labelPosition).addClass('lbl-' + position);
                            if(me.field)    me.field.labelPosition = position;
                            
                            me.labelPosition = position;
                            me.setLabelSize();

                            return me.labelPosition;
                        }
});


/**
    @event valchange When a value changes on a form field (WUI FormField, value)
    @event hiddenchange Same as valchange but for fields without an 'el' property (like hidden fields. Called on the window (WUI FormField, value)
    
    The base object that WUI form elements extend from
*/
Wui.FormField = function(args){
    $.extend(this,{
        /** Whether or not the field will be disabled. A disabled field is still accessible to the form, just not to the user. */
        disabled:        false,
        
        /** Message to display to the user when validation fails. If not specified the form will attempt to use the field's label. */
        invalidMsg:     null,
        
        /** An optional config that labels the field. */
        label:          null,
        
        /** Defines the position of the label relative to the field, options are 'top', 'left', 'right' and 'bottom' */
        labelPosition:  'top',
        
        /** A special class to put on the label if desired */
        labelCls:        null,

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:       null,
        
        /** Whether or not the field is required. May be pre-empted by other validation. See validate() method. */
        required:       false,
        
        /** A regular expression whereby to validate a field's input. May be pre-empted by other validation. See validate() method. */
        validRegEx:        null,
        
        /** A function to validate field input. This function is passed the value of the field, for example: validTest: function(val){ return val == 3; } */
        validTest:      null
    },args);
};
Wui.FormField.prototype = $.extend(new Wui.O(),{
    /**
        @return The el of the object
        Runs immediately when the object is constructed. Wraps the field in a label if a label has been defined.
    */
    init:          function(){
                    var me = this;
                    me.value = me.hasOwnProperty('value') ? me.value : null;
                    me.el = $('<div>').addClass('wui-fe');
                    
                    if(me.label && me.label.length > 0){
                        me.lbl = new Wui.Label({html:me.label, cls:me.labelCls, field:me, labelPosition:me.labelPosition, labelSize:me.labelSize});
                        me.elAlias = me.el;
                        me.el = me.lbl.el.append(me.elAlias);
                    }
                    return me.el;
                },
                
    /** Will disable the object if its disabled property is set to true and set a value on the field if one has been defined. */
    onRender:    function(){
                    if(this.disabled)                   this.disable();
                    if(this.hasOwnProperty('value'))    this.val(this.value,false);
                },
    /** Disables the field so the user cannot interact with it. */
    disable:    function(){
                    this.disabled = true;
                    if(this.el && this.el.addClass)
                        this.el.addClass('wui-disabled').find('input,textarea,iframe').attr('disabled','disabled');
                },
    /** Enables the field so the user can interact with it. */
    enable:        function(){
                    this.disabled = false;
                    if(this.el && this.el.addClass)
                        this.el.removeClass('wui-disabled').find('.wui-disabled,*[disabled=disabled]').removeAttr('disabled');
                },
    
    /**
    @return True or False
    Validate will construct an error message based on the following precedence:
    1. Custom message (invalidMsg)
    2. The label on the field
    3. The name of the field
    4. Report that "A required field has an improper value."
    
    Then, validates a field using the following order of validation precedence:
    1. Custom testing function (validTest)
    2. Regular Expression (validRegEx)
    3. Required flag (required)
    4. No validation - returns true.
    
    Then sends the error message, if any, to the parent form's throwError() method where the invalidation messages are concatenated and the fields
    are hilighted for the user to see what fields need their attention.
    */
    validate:   function(){
                    var me = this,
                        errMsg = (me.invalidMsg !== null) ? me.invalidMsg : 
                                    (me.label !== null ) ? 'A value for \'' +me.label+ '\' is required.' :
                                        (me.name !== undefined) ? 'A value for \'' +me.name+ '\' is required.' :
                                            "A required field has an improper value.";
                    
                    // If a custom test is defined 
                    if(me.validTest && typeof me.validTest == 'function')
                        if(me.validTest(me.val()) === false)
                            return parentThrow();
                                            
                    // If a regular expression is defined for a test, this will be tested first
                    if(me.validRegEx !== null)
                        if(!me.validRegEx.test($.trim(me.val())))
                            return parentThrow();
                                        
                    // If no regular expression test exists, test whether a value is required and throw an error if blank
                    if(me.required && $.trim(me.val()).length === 0) return parentThrow();
                    
                    function parentThrow(){
                        return (me.parent && me.parent.throwError) ? me.parent.throwError(errMsg) : false;
                    }
                    
                    // Default return value is true
                    return true;
                },
    /**
    @param {[any]}    newVal    The type of this parameter depends on the type of form field
    @return Either the value of the field if no arguments are passed, or the value of the arguments passed in
    
    Works similarly to jQuery's val() method. If arguments are omitted the value of the FormField 
    will be returned. If arguments are specified the field's setVal() method and setChanged() method
    are called, and the values passed in are passed through        
    */
    val:        function(){
                    if(!arguments.length){
                        return this.getVal();
                    }else{
                        var oldVal = this.value;

                        // Set the actual value of the item
                        this.setVal.apply(this,arguments);
                        
                        // Call change listeners
                        if(arguments[1] !== false)
                            this.setChanged(oldVal);
                        
                        // Return the passed value(s)
                        return arguments;
                    }
                },
    /** 
    @private
    Marks the parent form as changed if the field belongs to a form, calls the valChange event hooks and listeners
    if the field doesn't have an 'el' property, it will call 'hiddenchange'
    */
    setChanged:    function(oldVal){
                    // Marks the parent form as 'changed'
                    if(this.parent && this.parent instanceof Wui.Form)
                        this.parent.formChange(true, this);
                    
                    // Calls functionally defined valChange() - one will override another
                    this.valChange(this);
                    
                    // Calls listeners for valchange - in the case of hidden fields calls 'hiddenchange'
                    if(this.el){
                        this.el.trigger($.Event('valchange'), [this, this.value, oldVal]); 
                    }else{
                        if(this.parent && this.parent instanceof Wui.Form)
                            this.parent.el.trigger($.Event('hiddenchange'), [this, this.value, oldVal]);
                    }
                },
    
    /** 
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    getVal:        function(){
                    return this.value;
                },
    
    /** 
    @param {string}    sv    Value to set the value of the field to
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    setVal:        function(sv){
                    this.value = sv;
                },
    
    /** 
    @param {string}    newVal    New value being set on the field
    An event hook for when the value changes. Useful for extending objects, but generally use the 'valchange' event listener
    */
    valChange:    function(newVal){}
});


/** A Wui.FormField that has no DOM element. Even more hidden than an HTML hidden input, the hidden field exists only in memory. */
Wui.Hidden = function(args){
    $.extend(this,{
        /** By default a hidden field produces no DOM element */
        el:null
    },args); 
    this.init();
};
Wui.Hidden.prototype = $.extend(new Wui.FormField(),{ init: function(){} });


/** WUI Text */
Wui.Text = function(args){
    $.extend(this,{
        /** The CSS class that denotes an empty field */
        blankCls:   'empty',
        /** A value that appears in the field until text is entered (HTML 5), or focus is gained (JavaScript implemented) */
        blankText:  ''
    },args,{
        /** The HTML element */
        field:$('<input>').attr({type:'text'})
    }); 
    this.init();
};
Wui.Text.prototype = $.extend(new Wui.FormField(),{
    /** Runs immediately when the object is created */
    init:            function(){
                        var me = this;
                        Wui.FormField.prototype.init.call(me);
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Text.prototype.setListeners.call(me,me));
                    },
                    
    /** Sets the blank text on the field. If the HTML 5 placeholder isn't supported, mimic it by replacing the native jQuery val function */
    setBlankText:    function(bt){
                        var me = this, f = me.field;
                        
                        me.blankText = bt;
                        
                        // if the HTML 5 placeholder isn't supported, mimic it by
                        // replacing the native jQuery val function
                        if('placeholder' in document.createElement('input')){
                            me.field.attr('placeholder', bt);
                        }else{
                            var valFn = $.fn.val;
                            
                            f.overrideNodeMethod('val',function(){
                                var v = valFn.apply(f,arguments);
                                if(!arguments.length)    if(v == me.blankText) return '';
                                else                    return v;
                            });
                            
                            f.focusin(function () {
                                if(valFn.call(f) == me.blankText) f.val('');
                                f.removeClass(me.blankCls);
                            }).blur(function () {
                                var v = f.val();
                                if(v === me.blankText || !v.length)
                                    f.addClass(me.blankCls).val(me.blankText);
                            });
                            
                            // set the blank text on the field
                            console.log(f.val().length);
                            if(!f.val().length)
                                f.addClass(this.blankCls).val(bt);    
                        }
                        
                        return bt;
                    },
                    
    /** 
    @param  {Wui Object}  t  The object to have listeners applied to the field
    Puts listeners on the field, mostly to handle blankText in the event that HTML 5 placeholder isn't supported 
    Also calls the setListeners() of any extending object automagically.
    */
    setListeners:    function(t){
                        var me = this,
                            fieldState = null;
                        
                        t.field
                        .focusin(function(){ fieldState = me.field.val(); }) // Set fieldState (closure variable) to allow for comparison on blur
                        .blur(function(){ if(fieldState != me.field.val()) me.setChanged(); }); // Call val function so that valchange will be fired if needed
                        
                        if(this.setListeners !== Wui.Text.prototype.setListeners) this.setListeners(this);
                        return t.field;
                    },
    /** 
    @param {string}    sv    Value to set the field text to
    Changes the value of the text in the field without changing the value of the object
    */
    fieldText:        function(sv){
                        this.field.val(sv);
                        if(this.blankText && this.blankText.length)    this.setBlankText(this.blankText);
                    },
    getVal:            function(){ return (this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null); },
    setVal:            function(sv){ 
                        this.fieldText(this.value = (sv && $.trim(sv).length) ? sv : null);
                    }
});


/** WUI Text Area */
Wui.Textarea = function(args){
    $.extend(this, args, { 
        /** The HTML element */
        field:    $('<textarea>'),
        
        /** Determines the height of the field */
        height:    100
    });
    this.init();
};
Wui.Textarea.prototype = $.extend(new Wui.Text(), {
    init:    function(){    Wui.Text.prototype.init.call(this); this.field.css({height:this.field.parent().parent().height});  }
});


/** Creates a WYSIWYG editor from a textfield.  
@author Stephen Nielsen
*/
Wui.Wysiwyg = function(args){
    $.extend(this,{
        css:        'body { color:#333; font:90%  Arial, Verdana, Helvetica, sans-serif; overflow:auto; margin:0; padding:0;}' +
                    'a {color:#09c; text-decoration:none;} a:hover {color:#0c9; text-decoration:underline;}',
        /** Whether or not to show the button that will give the user a view of the HTML generated by the WYSIWYG */
        showHTML:   false
    },args,{

    });
    this.init();
};
Wui.Wysiwyg.prototype = $.extend(new Wui.FormField(),{
    init:       function(){
                    var me = this;
                    Wui.FormField.prototype.init.call(me);

                    me.el.addClass('wui-wysiwyg');
                    me.append(
                        me.iframe = $('<iframe>').addClass('wui-editor'),
                        me.tools = $('<div>').addClass('wui-editor-tools')
                    );

                    (me.elAlias || me.el).resizable();

                    me.tools.append(
                        me.bold = $('<a>').addClass('bold').attr({tabIndex:-1, title:'Bold'}),
                        me.italic = $('<a>').addClass('italic').attr({tabIndex:-1, title:'Italic'}),
                        me.underline = $('<a>').addClass('underline').attr({tabIndex:-1, title:'Underline'}),
                        me.strike = $('<a>').addClass('strikethrough').attr({tabIndex:-1, title:'Strike-through'}),
                        me.link = $('<a>').addClass('link').attr({tabIndex:-1, title:'Link'}),
                        me.unlink = $('<a>').addClass('unlink').attr({tabIndex:-1, title:'Un-Link'}),
                        me.ul = $('<a>').addClass('unorderedlist').attr({tabIndex:-1, title:'Unorderd List'}),
                        me.ol = $('<a>').addClass('orderedlist').attr({tabIndex:-1, title:'Ordered List'}),
                        me.left = $('<a>').addClass('justifyleft').attr({tabIndex:-1, title:'Left Align'}),
                        me.center = $('<a>').addClass('justifycenter').attr({tabIndex:-1, title:'Center Align'}),
                        me.right = $('<a>').addClass('justifyright').attr({tabIndex:-1, title:'Right Align'})
                    );

                    if(me.showHTML)
                        me.tools.append( $('<a>').addClass('html').attr({tabIndex:-1, title:'Toggle HTML View'}) );
                },
    disable:    function(){
                    Wui.FormField.prototype.disable.call(this);
                    Wui.Pane.prototype.addMask.call(this,(this.elAlias || this.el));
                },
    enable:     function(){
                    Wui.FormField.prototype.enable.call(this);
                    Wui.Pane.prototype.removeMask.call(this);
                },
    onRender:   function(){
                    var me = this, 
                        edit = me.editor = me.iframe[0].contentWindow.document;
                    
                    // Make the iframe editable and set up its style
                    edit.designMode = 'on';
                    edit.open();
                    edit.close();
                    if(me.css.length) $('head',edit).append($('<style>').attr({type:'text/css'}).text(me.css));

                    // Perform standard for field stuff
                    Wui.FormField.prototype.onRender.call(me);

                    // Add menu buttons
                    me.bold.click(function(){ me.exec("bold"); });
                    me.italic.click(function(){ me.exec("italic"); });
                    me.underline.click(function(){ me.exec("underline"); });
                    me.strike.click(function(){ me.exec("strikethrough"); });
                    me.link.click(function(){
                        if (me.getRange().htmlText) me.exec("createLink", true);
                        else                        me.exec("createLink", false, prompt("Link URL:", "http://"));
                    });
                    me.unlink.click(function(){ me.exec("unlink", false, []); });
                    me.ol.click(function(){ me.exec("insertunorderedlist"); });
                    me.ul.click(function(){ me.exec("insertorderedlist"); });
                    me.left.click(function(){ me.exec("justifyLeft"); });
                    me.center.click(function(){ me.exec("justifyCenter"); });
                    me.right.click(function(){ me.exec("justifyRight"); });
                },
    exec:       function (a, b, c) {
                    this.iframe[0].contentWindow.focus();
                    this.editor.execCommand(a, b || false, c || null);
                },
    getRange:   function () {
                    var s = this.getSelection();
                    if (!s) { return null; }
                    return (s.getRangeAt) ? s.getRangeAt(0) : s.createRange();
                },
    getVal:     function () {
                    // Strips out MS Word HTML Nonsense
                    var retVal = $.trim(this.editor.body.innerHTML
                            .replace(/MsoNormal/gi, "")
                            .replace(/<\/?link[^>]*>/gi, "")
                            .replace(/<\/?meta[^>]*>/gi, "")
                            .replace(/<\/?xml[^>]*>/gi,"")
                            .replace(/<\?xml[^>]*\/>/gi, "")
                            .replace(/<!--(.*)-->/gi, "")
                            .replace(/<!--(.*)>/gi, "")
                            .replace(/<!(.*)-->/gi, "")
                            .replace(/<w:[^>]*>(.*)<\/w:[^>]*>/gi, "")
                            .replace(/<w:[^>]*\/>/gi, "")
                            .replace(/<\/?w:[^>]*>/gi, "")
                            .replace(/<m:[^>]*\/>/gi, "")
                            .replace(/<m:[^>]>(.*)<\/m:[^>]*>/gi, "")
                            .replace(/<o:[^>]*>([.|\s]*)<\/o:[^>]*>/gi, "")
                            .replace(/<o:[^>]*>/gi, "")
                            .replace(/<o:[^>]*\/>/gi, "")
                            .replace(/<\/o:[^>]*>/gi, "")
                            .replace(/<\/?m:[^>]*>/gi, "")
                            .replace(/style=\"([^>]*)\"/gi, "")
                            .replace(/style=\'([^>]*)\'/gi, "")
                            .replace(/class=\"(.*)\"/gi, "")
                            .replace(/class=\'(.*)\'/gi,"")
                            .replace(/<p[^>]*>/gi, "<p>")
                            .replace(/<\/p[^>]*>/gi, "</p>")
                            .replace(/<span[^>]*>/gi, "")
                            .replace(/<\/span[^>]*>/gi, "")
                            .replace(/<st1:[^>]*>/gi, "")
                            .replace(/<\/st1:[^>]*>/gi, "")
                            .replace(/<font[^>]*>/gi, "")
                            .replace(/<\/font[^>]*>/gi, "")
                            .replace(/[\r\n]/g, " ")
                            .replace(/<wordPasteong><\/wordPasteong>/gi, "")
                            .replace(/<p><\/p>/gi, "").replace(/\/\*(.*)\*\//gi, "")
                            .replace(/<!--/gi, "")
                            .replace(/-->/gi, "")
                            .replace(/<style[^>]*>[^<]*<\/style[^>]*>/gi, "")
                            .replace(/<hr>/gi, ""));
                    return this.value = (retVal.length === 0) ? null : retVal;
                },
    setVal:     function(sv){
                    var me = this;
                    me.value = sv;
                    $(me.editor.body).html(sv);
                }
});


/** Creates a radio group that will appear as normal, or as a button group where only one button at a time
can    be depressed. MUST be named uniquely. */
Wui.Radio = function(args){ 
    $.extend(this,{
        /** A true value converts the normal radio group to a button group */
        buttonStyle:false,
        
        /** A default name that should be overridden */
        name:       'wui-radio',
        
        /** An array of options to populate the radion/button group */
        options:    [],
        
        /** Default template for the radio group */
        template:        '<li><input type="radio" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args,{
        el:$('<div>')
    });
    this.init();
};
Wui.Radio.prototype = $.extend(new Wui.FormField(),{
    /** Runs immediately when the object is created. Adds listeners and styles */
    init:       function(){
                    Wui.FormField.prototype.init.call(this);
                    this.el.addClass('wui-radio');
                    
                    var me = this,
                        tplEngine = new Wui.Template({ template:this.template }),
                        ul = $('<ul>');
                    
                    $.each(me.options,function(i,itm){
                        itm.name = me.name;
                        itm.id = Wui.id();
                        ul.append(
                            tplEngine.make(tplEngine.data = itm)
                            .children('label')
                                .attr({unselectable:'on'})
                                .keyup(function(evnt){
                                    if(evnt.keyCode == 13 || evnt.keyCode == 32)
                                        $(this).click();
                                })
                            .end()
                            .children('input')
                            .change(function(){ me.elemChange($(this)); })
                            .focus(function(){ul.addClass('has-focus');})
                            .blur(function(){ul.removeClass('has-focus');})
                            .end()
                        );
                    });
                    
                    // make radio group look like buttons
                    if(me.buttonStyle){
                        ul.addClass('button');
                        ul.find('label').attr({tabindex:0});
                    }
                    
                    // Append to DOM
                    me.el.append(ul);
                },
    
    /** What to do when an individual element changes */
    elemChange:    function(elem){ this.val(elem.val()); },
    
    /** If buttonStyle = true, the actual radio input is hidden  */
    onRender:    function(){
                    var me = this;
                    me.el.find('input').each(function(){
                        $(this).css({ margin:'0 5px 0' + ((me.buttonStyle ? -1 : 0) * (5 + $(this).outerWidth())) + 'px' });
                    });
                    Wui.FormField.prototype.onRender.call(me);
                },
    getVal:        function(){ return this.value; },
    setVal:        function(sv){
                    this.value = sv;
                    this.el.find("input[value='" + sv + "']").attr('checked',true);
                }
});


/** 
Creates a check-box group if options are specified, or as a button group where any/all of the buttons can be
depressed at once.     If options aren't specified, a single boolean check-box will be created. */
Wui.Checkbox = function(args){ 
    $.extend(this,{
        /** A default name that should be overridden */
        name:       'wui-checkbox',
        
        /** Default template for the checkbox group */
        template:    '<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args);
this.init(); };
Wui.Checkbox.prototype = $.extend(new Wui.Radio(),{
    /** Collects the values of all the checked boxes in the group */
    calcVal:    function(){
                    var me = this, a = [];
                    
                    me.el.find('input:checked').each(function(){
                        a.push($(this).val());
                    });
                    
                    return ((a.length > 0) ? (a.length > 1) ? a : a[0] : null);
                },

    /** Returns whether or not the box is checked */
    elemChange:    function(elem){ this.val(this.calcVal()); },                    

    /** Runs immediately when the object is created. Adds listeners and styles */
    init:       function(){
                    if(this.options.length === 0) this.options.push({val:1,title:''});
                    
                    Wui.Radio.prototype.init.call(this);
                    this.el.removeClass('wui-radio').addClass('wui-checkbox');
                    
                    //steal label if button style
                    if(this.options.length == 1){
                        this.el.find('li label').text(this.el.children('label').text());
                        this.el.children('label').text('');
                    }
                },
    getVal:        function(){ return this.calcVal(); },
    setVal:        function(sv){
                    var me = this;
                    
                    if($.isArray(sv))               { me.value = sv; }
                    else if(sv === null)            { me.value = null; }    
                    else                            { me.value = [sv]; }
                    
                    if(me.options.length == 1 && (typeof sv == 'number' || typeof sv == 'string')){
                        me.el.find('input').prop('checked',!!parseInt(sv)).siblings('li').toggleClass('checked',!!parseInt(sv));
                    }else{
                        // clear out all checkboxes
                        me.el.find('input').attr('checked',false);
                        me.el.find('label').removeClass('checked');
                        
                        // set the ones passed in
                        if(me.value && me.value.length)
                            for(var i = 0; i < me.value.length; i++)
                                me.el.find('input[value=' +me.value[i]+ ']').prop('checked',true).siblings('li').addClass('checked');
                    }
                },
    /** The check-box will validate false if the value is 0 and the box is required.  */
    validTest:    function(){ if(this.required && this.val() === 0) return false;    return true; }
});



// Make jQuery contains case insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
Wui.Combo = function(args){ 
    $.extend(this, {
        /** Whether to load remote elements the moment the combobox is created, or wait to load remote elements
        until a search value is entered. */
        autoLoad:   false,
        
        /** CSS class to place on the drop-down element. */
        ddCls:        '',
        
        /** Name of a shared data store. Whenever the shared store updates, this updates too. If defined, Pre-empts locally defined data and remote calls on init. */
        dataName:    null,
        
        /** Text to display in the drop-down when no results are returned.  */
        emptyText:  '(empty)',
        
        /** The DOM element for the field */
        field:        $('<input>').attr({type:'text'}),

        /** Whether to filter results at all */
        filterField:  true,
        
        /** Whether the drop-down DOM element will be kept in place or appended out to the body and absolutely
        positioned. Keeping the drop-down in line will make it susceptible to being clipped by containing elements.*/
        keepInline:    false,
        
        /** Minimum number of characters entered before the combo will filter remotely. */
        minKeys:    2,
        
        /** Event hook for when the combo loses focus */
        onBlur:     function(){},
        
        /** Whether to filter the drop-down amidst the locally loaded results or to go to the server. */
        searchLocal:true,
        
        /**
        @required
        The key in the data that will be used for display in the combo box.
        */
        titleItem:  null,
        
        /**
        @required
        The key in the data that will be used as the value for the combo when an item is selected.
        */
        valueItem:  null
    },args,{
        cls:(args.cls) ? args.cls + ' wui-combo' : 'wui-combo',
    }); 
    
    // Create template when one hasn't been defined
    if(!this.hasOwnProperty('template') && this.hasOwnProperty('valueItem') && this.hasOwnProperty('titleItem') && this.valueItem && this.titleItem) 
        this.template = '<li>{' +this.titleItem+ '}</li>';
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.Text(), new Wui.Data(), {
    /** Fires when the enter key is pressed */
    enterKey:       function(){
                        if(this.selectItm !== null)   this.selectItm.click();
                    },
                    
    /** Fires when the down arrow is pressed */
    keyDown:        function(){
                        if(!this.dd.is(':visible')){
                            this.selectCurr();
                            this.showDD();
                            this.field.select();
                        }else{
                            var si = (this.selectItm === null) ? 0 : this.dd.children('.selected ~ :visible:first').index(),
                                idx = (si > 0) ? si : 0;
                            this.rsltHover(this.dd.children(':eq(' + idx + ')'));
                        }
                    },
                    
    /** Fires when the down up is pressed */
    keyUp:          function(){
                        if(this.selectItm !== null){
                            var idx = this.selectItm.prevAll(':visible:first').index();
                            
                            if(idx < 0){
                                this.field.focus().select();
                                this.dd.children().removeClass('selected');
                                this.selectItm = null;
                            }else{
                                this.rsltHover(this.dd.children(':eq(' + idx + ')'));
                            } 
                        }
                    },
                    
    /** Hides the drop-down menu */
    hideDD:         function(){this.dd.hide();},
    
    /** Method that runs when the object is initiated */
    init:           function(){
                        var me = this,
                            ddAddCls = (me.keepInline) ? 'wui-inline-dd' : '';
                        
                        //setup combobox variables
                        me.tplEngine = new Wui.Template({template:me.template});
                        me.selectItm = null;
                        
                        //put field inside a wrapper and add drop-down switch
                        Wui.Text.prototype.init.call(me);
                        
                        me.wrapper = $('<div>').addClass('dd-wrapper');
                        me.ddSwitch = new Wui.Button({
                            click:        function(){
                                            if(!me.dd.is(':visible')){
                                                me.field.focus();
                                                me.selectCurr();
                                                me.showDD();
                                            }else{
                                                me.hideDD();
                                            }
                                        },
                            text:        '',
                            tabIndex:    -1,
                            appendTo:    me.wrapper,
                            cls:         'field-btn dd-switch'
                        });
                            
                        me.append(me.wrapper.append(
                            me.dd = $('<ul>').addClass('wui-combo-dd ' + ddAddCls + ' ' + me.ddCls),
                            me.field.addClass('has-dd')
                        ));
                        me.ddSwitch.place();
                        
                        if(me.dataName && me.dataName.length > 0){
                            $(window).on('datachanged',function(event,name,dataObj){
                                if(name == me.dataName){
                                    me.setData(dataObj.data);
                                    me.renderData();
                                }
                            });
                        }else{
                            if(me.autoLoad)   me.loadData();
                            else              me.renderData();
                        }

                        // For locally defined data
                        me.total = me.data.length;
                    },
    
    /** Populates the drop-down with data/search results or shows empty text  */
    renderData:     function(){
                        var me = this,
                            holder = $('<ul>');
                        me.dd.html('');
                        if(me.total){ 
                            me.dataEach(function(d,i){
                                me.tplEngine.data = d;
                                holder.append(
                                    me.tplEngine.make().mouseenter(function(evnt){ me.rsltHover(evnt); })
                                                       .mousedown(function(e){me.field.isBlurring = false;})
                                                       .click(function(){ me.rsltClick(); })
                                );
                            });
                            me.dd.append(holder.children().unwrap());
                        }else{ 
                            me.dd.html(this.emptyText);
                        }
                        
                        return true;
                    },
    
    /** Hides the drop-down and sets the current selection as the combo's value */
    rsltClick:      function(){
                        this.hideDD();
                        this.val(this.data[this.selectItm.index()]);
                    },
                    
    /** Makes an item in the drop-down appear to be selected. This can happen when the 
    mouse hovers over an item or when its selected with the arrow keys. */
    rsltHover:      function(itmTarget){
                        if(!itmTarget.addClass)
                            itmTarget = $(itmTarget.currentTarget);
                        this.dd.children().removeClass('selected');
                        this.selectItm = itmTarget.addClass('selected');
                    },
    
    /** Overrides the event hook in Wui.Data to set the parameters of the data object with the search value */
    setParams:        function(){
                        if(this.searchFilter)
                            $.extend(this.params,{srch: this.searchFilter});
                    },

    /** 
    @param {string} srchVal    A search term
    Searches locally within the drop-down's data for the srchVal, otherwise if searchLocal is false,
    the data is searched remotely. */
    searchData:     function(srchVal){
                        if(this.filterField){
                            this.searchFilter = srchVal;
                            
                            if(this.searchLocal){
                                this.showDD();
                                this.dd.children()[(srchVal && srchVal.length > 0) ? 'hide' : 'show']();
                                this.dd.children(':contains(' +srchVal+ ')').show();
                                this.rsltHover(this.dd.children(':contains("' +srchVal+ '"):first'));
                            }else{
                                if(srchVal.length >= this.minKeys || srchVal.length === 0)
                                    this.loadData();
                            }    
                        }
                    },
    
    /** 
    @param {number}    [i]    An index
    
    If i is defined, it is the index of the item to select in the drop-down, else it is determined in this
    method by the current value of the combo.
    */
    selectCurr:     function(i){
                        if(i === undefined && this.value !== null){
                            for(var d in this.data){
                                if(this.data[d][this.valueItem] === (this.value[this.valueItem] || this.value))   { i = d; break; }
                            }
                        }
                        this.rsltHover(this.dd.children(':eq(' +i+ ')'));
                    },
                    
    /** Overrides the event hook in Wui.Data to trigger rendering of new data */
    afterSet:       function(){ this.renderData(); },
    
    /** 
    @param {Wui Object} t Wui Object to add listeners to
    Sets additional listeners on the field that give it combo-box like interactions */
    setListeners:    function(t){
                        t.field
                        .focus(function(e){
                            t.field.isBlurring = undefined;
                        })
                        .blur(function(e){
                            if(t.field.isBlurring !== false){
                                t.hideDD();
                                
                                // If the combo has a non-value item in the search field
                                // select the seleted item or clear the value
                                var titlePresent = false;
                                for(var d in t.data){
                                    if(t.field.val() == t.data[d][t.titleItem]){
                                        titlePresent = true;
                                        break;
                                    }
                                }
                                if(!titlePresent)    t.val(null);
                                
                                // Event hook function
                                t.onBlur();
                            }
                         })
                        .click(function(){
                            t.showDD();
                            t.field.select();
                        })
                        .keyup(function(evnt){
                            var currVal = t.field.val();
                            switch(evnt.keyCode){
                                case 40:    /*Do Nothing*/  break;
                                case 38:    /*Do Nothing*/  break;
                                case 13:    /*Do Nothing*/  break;
                                case 9:     /*Do Nothing*/  break;
                                default:    t.searchData(currVal);
                            }
                        })
                        .keydown(function(evnt){
                            var currVal = t.field.val();
                            
                            //clear the value if the user blanks out the field
                            if(currVal.length === 0) t.value = null;
                            
                            if(t.data.length > 0){
                                switch(evnt.keyCode){
                                    case 40:    t.keyDown();   break;
                                    case 38:    t.keyUp();     break;
                                    case 13:
                                    case 9:     t.enterKey();  break;
                                }
                                
                                //scroll the list to the currently selected item
                                if(t.selectItm !== null){
                                    var beforeHeight = 0;
                                    t.selectItm.siblings(':lt(' +t.selectItm.index()+ '):visible').each(function(){ beforeHeight+= $(this).outerHeight(); });
                                    t.selectItm.parent().animate({scrollTop:beforeHeight}, 100);
                                }
                            }
                        });
                        return t.field;
                    },
    
    /** Shows the drop-down menu by either simply making it appear, or by positioning it absolutely to appear to drop-down from the combo's text field
    based on the value of keepInline. */
    showDD:         function(){
                        if(!this.keepInline){
                            var fld     = this.field,
                                ofst    = fld.offset(),
                                ddWid   = parseInt(this.dd.css('width')),
                                width   = (ddWid && ddWid > fld.outerWidth()) ? ddWid : fld.outerWidth() - 1;
                            
                            this.dd.appendTo('body').css({
                                left:       ofst.left + ((ofst.left + width < $.viewportW()) ? 0 : fld.outerWidth() - width),
                                top:        ofst.top + fld.outerHeight(),
                                width:      width,
                                display:    'block',
                                zIndex:     Wui.maxZ()
                            });
                        }else{
                            this.dd.css({ zIndex:Wui.maxZ() }).show();
                        }
                    },
    getVal:            function(){
                        var me = this;
                        return (me.value && me.value[me.valueItem]) ? me.value[me.valueItem] : me.value;
                    },
    setVal:            function(sv){
                        var me = this, selectVal = null;
                        
                        if(sv === null){
                            me.value = null;
                            me.renderData();
                            me.fieldText('');
                        }else if(typeof sv == 'object'){
                            me.value = sv;
                            
                            //add the piece of data to the dd data if it does not exist there
                            var addData = true;
                            for(var d in me.data) if(me.data[d] == sv) addData = false;
                            if(addData){
                                me.data.push(me.value);
                                me.renderData();
                            }
                            selectVal = me.value[me.valueItem];
                        }else{
                            me.value = sv;
                            selectVal = me.value;
                        }
                        
                        //select the item out of the data set
                        me.dataEach(function(d,i){
                            if(d[me.valueItem] === selectVal){
                                me.selectCurr(i);
                                me.fieldText(d[me.titleItem]);
                                return false;
                            }
                        });
                    }
});

/**
The link object contains three fields, one for the actual URL, one for the text of the link (if different from the URL) and a combo for
whether the link opens in a new window/tab or the same window.
*/
Wui.Link = function(args){ 
    $.extend(this,{
        invalidMsg: 'The value for \'' + ((this.label) ? this.label : (this.args && this.args.name) ? this.args.name : 'a link field') + '\' is not a properly formatted link.'
    },args);
    this.init();
};
Wui.Link.prototype = $.extend(new Wui.FormField(),{
    /** Builds a preview of the link while it is being entered - gives feedback/validation to the user  @private */
    buildOutput:function(){
                     if(this.outputFld === undefined)    this.elAlias.append(this.outputFld = $('<div>').attr({tabindex:-1}).addClass('feedback'));
        
                    if(this.testLink()){
                        var tp = new Wui.Template({data:this.value, template:'<span>Preview:</span> <a href="{uri}" target="{target}" class="{((target == "_blank") ? "uri-new-win" : "")}">{title}</a>'});
                        this.outputFld.html(tp.make());
                    }else{
                        this.outputFld.html('Your link is improperly formatted.');
                    }
                        
                },
    
    /** Method that runs when the object is initiated */
    init:       function(){
                    var me = this;
                    
                    me.items = [
                        me.urlField = new Wui.Text({cls:'wui-link-third wui-link-focus', blankText:'URL', linkData:'uri'}),
                        me.titleField = new Wui.Text({cls:'wui-link-third', blankText:'Display Text', linkData:'title'}),
                        me.targetField = new Wui.Combo({
                            cls:'wui-link-third no-margin', valueItem: 'target', titleItem:'name', blankText:'Target', keepInline:true,
                            data:[{target:'_self', name:'Opens In Same Window'}, {target:'_blank', name:'Opens In New Window/Tab'}], linkData:'target'
                        })
                    ];
                    
                    Wui.FormField.prototype.init.call(me);
                    me.value = { target:'_self', title:null, uri:null };
                    
                    me.el.append(me.elAlias = $('<div>').addClass('wui-hyperlink'));
                    
                    //additional listeners and initial value for target
                    me.setListeners(me.urlField,me.titleField,me.targetField);
                    me.targetField.val(me.value.target);
                   
                    me.urlField.field.keyup(function(e){
                        //sets the title the same as the url - for laziness' sake
                        if(me.titleField.field.val() == me.titleField.blankText)
                            me.value.title = null;
                        if(me.value.title === null)
                            me.titleField.val($(this).val());
                    })
                    .blur(function(){ me.value.title = me.titleField.val(); });
                },
    
    /** Sets listeners on all three of the fields in the link object */
    setListeners:function(){
                    var me = this,
                        flds = arguments;
                        
                    $.each(flds,function(idx,itm){
                        (itm.field.field || itm.field).on('blur click keyup keydown mousedown', null, itm, function(e){
                            var wuiObjVal = e.data.val();
                            if(wuiObjVal !== null && wuiObjVal != {}) me.value[e.data.linkData] = wuiObjVal;
                            me.buildOutput();
                        })
                        .on('focus',null, itm, function(e){
                            $.each(flds,function(i,field){ field.el.removeClass('wui-link-focus'); });
                            e.data.el.addClass('wui-link-focus');
                        });
                    });
                },       
        
    /** Test for whether the link is a valid URL whether a full or relative path */
    testLink:   function isUrl() {
                    var fullPath = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                        relativePath = /(\/|\/([\w#!:.?+=&%@!\-\/]))/;
                    return (fullPath.test(this.value.uri) || relativePath.test(this.value.uri));
                },
                
    getVal:        function(){
                    return this.value;
                },
    setVal:        function(sv){
                    $.extend(this.value,sv);
                    this.urlField.val(this.value.uri);
                    this.titleField.val(this.value.title);
                    this.targetField.val(this.value.target);
                    this.buildOutput();
                },
    
    /** Overrides the Wui.FormField function and provides added validation */
    validTest:    function(){ if(this.required && !this.testLink()) return false; return true; }
});


/**
 * Borrowed from Date.js and tweaked a TON - See license below, and check out the full library if you're doing tons with dates
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 
 The Datetime field can be used in conjunction with a calendar-style datepicker. When dates are changed, any time information is
 retained.
 
 Feedback is given to the user so concerns about whether the date is in a proper format can be allayed before validation occurs.
 Dates can be entered in a variety of formats of which what is below is a very small sample:
 
 "Five months after 9/20/2013"
 "Yesterday"
 "05/26/1983"
 "2012-12-12"
 "today at noon"
 "tomorrow at five thirty pm"
 "10-9-2013 5:30 PM"
 "ten months from now"
*/
Wui.Datetime = function(args){ 
    $.extend(this,args,{ field: $('<input>').attr({type:'text'}) });
    this.init();
};

$.extend(Date,{
    CultureInfo:            {
                                name: "en-US",
                                englishName: "English (United States)",
                                nativeName: "English (United States)",
                                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                                firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
                                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                                amDesignator: "AM",
                                pmDesignator: "PM"
                            },
    
    isLeapYear:                function(year) {
                                return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
                            },
    getDaysInMonth:            function(year, month) {
                                return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                            },
    getTimezoneOffset:        function(s, dst) {
                                return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];
                            },
    getTimezoneAbbreviation:function(offset, dst) {
                                var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
                                    p;
                                for (p in n) {
                                    if (n[p] === offset) {
                                        return p;
                                    }
                                }
                                return null;
                            }
});
$.extend(Date.prototype,{
    getDaysInMonth:    function() {
                        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
                    },
    addMilliseconds:function(value) {
                        this.setMilliseconds(this.getMilliseconds() + value);
                        return this;
                    },
    addSeconds:        function(value) {
                        return this.addMilliseconds(value * 1000);
                    },
    addMinutes:        function(value) {
                        return this.addMilliseconds(value * 60000);
                    },
    addHours:        function(value) {
                        return this.addMilliseconds(value * 3600000);
                    },
    addDays:        Date.prototype.addDays = function(value) {
                        return this.addMilliseconds(value * 86400000);
                    },
    addWeeks:        function(value) {
                        return this.addMilliseconds(value * 604800000);
                    },
    addMonths:        function(value) {
                        var n = this.getDate();
                        this.setDate(1);
                        this.setMonth(this.getMonth() + value);
                        this.setDate(Math.min(n, this.getDaysInMonth()));
                        return this;
                    },
    addYears:        function(value) {
                        return this.addMonths(value * 12);
                    },
    add:            function(config) {
                        if (typeof config == "number") {
                            this._orient = config;
                            return this;
                        }
                        var x = config;
                        if (x.millisecond || x.milliseconds) {
                            this.addMilliseconds(x.millisecond || x.milliseconds);
                        }
                        if (x.second || x.seconds) {
                            this.addSeconds(x.second || x.seconds);
                        }
                        if (x.minute || x.minutes) {
                            this.addMinutes(x.minute || x.minutes);
                        }
                        if (x.hour || x.hours) {
                            this.addHours(x.hour || x.hours);
                        }
                        if (x.month || x.months) {
                            this.addMonths(x.month || x.months);
                        }
                        if (x.year || x.years) {
                            this.addYears(x.year || x.years);
                        }
                        if (x.day || x.days) {
                            this.addDays(x.day || x.days);
                        }
                        return this;
                    },
    getDayName:        function(abbrev) {
                        return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
                    },
    getMonthName:    function(abbrev) {
                        return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
                    },
    _toString:        Date.prototype.toString,
    toString:        function(format) {
                        var self = this;
                        var p = function p(s) {
                                return (s.toString().length == 1) ? "0" + s : s;
                            };
                        return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function(format) {
                            switch (format) {
                            case "hh":
                                return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
                            case "h":
                                return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
                            case "HH":
                                return p(self.getHours());
                            case "H":
                                return self.getHours();
                            case "mm":
                                return p(self.getMinutes());
                            case "m":
                                return self.getMinutes();
                            case "ss":
                                return p(self.getSeconds());
                            case "s":
                                return self.getSeconds();
                            case "yyyy":
                                return self.getFullYear();
                            case "yy":
                                return self.getFullYear().toString().substring(2, 4);
                            case "dddd":
                                return self.getDayName();
                            case "ddd":
                                return self.getDayName(true);
                            case "dd":
                                return p(self.getDate());
                            case "d":
                                return self.getDate().toString();
                            case "MMMM":
                                return self.getMonthName();
                            case "MMM":
                                return self.getMonthName(true);
                            case "MM":
                                return p((self.getMonth() + 1));
                            case "M":
                                return self.getMonth() + 1;
                            case "t":
                                return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
                            case "tt":
                                return self.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
                            case "zzz":
                            case "zz":
                            case "z":
                                return "";
                            }
                        }) : this._toString();
                    }
});
/** End borrowing from date.js */

Wui.Datetime.prototype = $.extend(new Wui.Text(),{
    second:         1e3,
    minute:         6e4,
    hour:           36e5,
    day:            864e5,
    days:           ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],
    shortDays:      ["sun","mon","tue","wed","thu","fri","sat"],
    months:         ["january","february","march","april","may","june","july","august","september","october","november","december"],
    shortMonths:    ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
    
    /** Array of feedback words or phrases to randomly display when a user's input is not understood by the control */
    sarcasmArray:   ["Not quite.","Huh?","Nope","Arg..","Sorry","What?","Bleck.","Nuh-uh.","Keep Trying.","No Entiendo."],
    
    /** The date furthest in the past that this control will accept as valid */
    minDate:        null,
    
    /**
    @param {string} overrideText    Text that will absolutely be displayed instead of the formatted version of the field's value
    @return The value passed in, or the calculated value of the datetime
    Give feedback to the end user about the data they entered. 
    */
    displayDate:    function(overrideText){
                        var me = this;
                        
                        // process current date value
                        if(overrideText !== undefined){ me.displayDiv.html(overrideText); return overrideText; }
                        if(me.value === "" || me.value === null) { return null; }
                        
                        //validation for min-date
                        if(!(me.minDate !== null && me.value < me.minDate)) me.displayDiv.html(me.value.toString('ddd MM-dd-yyyy h:mm tt'));
                        else                                                me.displayDiv.html(me.value.toString('Less than minimum required date of MM-dd-yyyy'));
                        
                        return  me.value.toString('MM/dd/yyyy h:mm tt');
                    },
     
     /** 
     @param {number}    num Any whole number
     @return            The magnitude of the number
     Gets the magnitude (as a factor of ten) of the number passed into getM. */
     getM:          function(num){
                        var magnitude = 0;
                        while((num = num / 10) >= 1) magnitude++;
                        return magnitude;
                    },
                 
    /** Runs when the object is created. Sets up DOM elements, and attaches the jQuery UI datepicker */
    init:           function(){
                        var me = this;
                        Wui.Text.prototype.init.call(me);
                        me.append(
                            $('<div>').addClass('wui-date').append(
                                me.setListeners(me),
                                me.displayDiv = $("<div>").addClass('feedback').attr({tabindex:-1}),
                                me.toggleCal = $('<button>').addClass('wui-cal-toggle').attr({tabIndex:-1})
                            )
                        );
                        
                        me.toggleCal.click(function(){
                            if(!me.calendar){
                                // Add calendar to the body with listeners
                                $('body').append(
                                    me.calendar = me.makeCalendar(undefined,function(e){
                                        var dt = $(this),
                                            day = parseInt(dt.text()),
                                            info = dt.parents('[wui-month]'),
                                            month = parseInt(info.attr('wui-month')),
                                            year = parseInt(info.attr('wui-year'));

                                        me.value = (me.value != null) ? new Date(year,month,day,me.value.getHours(),me.value.getMinutes()) : new Date(year,month,day);
                                        me.val(me.displayDate());
                                        me.calendar.remove(); me.calendar = undefined;
                                    }).click(function(){return false;})
                                );

                                // Clear the calendar when the user moves away from it
                                $(document).one('click',function(){
                                    $('.wui-cal').remove(); me.calendar = undefined;
                                });

                                // Position calendar to ensure it will be seen
                                Wui.positionItem(me.field,me.calendar);
                            // Otherwise clear the calendar
                            }else{ me.calendar.remove(); me.calendar = undefined; }

                            // Prevent the click from propagating
                            return false;
                        });
                    },
    
    /** 
    @param {string}    words   Words describing a number. (i.e.: Four hundred and fifty-seven)
    @return            A number
    Converts numbers as words to a regular number. The words MUST use correct grammar (hyphens should be used between 20 and 99)
    */
    num2Dec:        function (words){
                        var numberRepl = {  a:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,
                            thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,
                            thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100,thousand:1e3,
                            million:1e6,billion:1e9,trillion:1e12,quadrillion:1e15,quintillion:1e18
                        };
            
                        //replace the written words with numbers
                        words = words.toString().replace(/ and /g,' ').replace(/-/g,' ');
                        $.each(numberRepl,function(i,itm){
                            words = words.replace(new RegExp('(^|[ ]|-)' + itm + '(-|[ ]|$)','g'),' ' + numberRepl[itm] + ' ');
                        });
                        
                        var wArray = $.trim(words).split(/[ ]+/),
                            partsArry = [],
                            finalNum = 0,
                            pos = 0;

                        //separate by numbers larger than 100
                        while(wArray[pos]){
                            if(this.getM(wArray[pos]) > 2){
                                partsArry.push(wArray.splice(0,pos + 1));
                                pos = 0;
                            }
                            pos++;
                        }
                        partsArry.push(wArray);
                       
                        for(var i = 0; i < partsArry.length; i++){
                            var tmp = this.txt2Num(partsArry[i]);
                            if(parseInt(tmp))
                                finalNum += parseInt(tmp);
                        }
                       
                        return finalNum;
                    },
    
    /**
    @param {Date} dt  A date in which month to generate the calendar. If not specified this value will fall back to the value of the Wui.Datetime element, and if not defined it will fall back to the current date.
    Makes an HTML calendar to use as a datepicker */
    makeCalendar:   function(dt,onSelect){
                        var me = this,
                            today = new Date(),
                            calDate = dt || (me.value || today),
                            calendar = $('<div>').addClass('wui-cal');

                        calendar.append(genHTML(calDate));
                        return calendar;

                        function genHTML(genDt){
                            var day = 1, i = 0, j = 0,
                                month = genDt.getMonth(),
                                year = genDt.getFullYear(),
                                selectDy = genDt.getDate(),
                                firstDay = new Date(year, month, 1),
                                startingDay = firstDay.getDay(),
                                monthLength = genDt.getDaysInMonth(),
                                monthName = me.months[month],
                                html = '<table wui-month="' +month+ '" wui-year="' +year+ '">';
                            
                            // Generate Header
                            html += '<tr><th colspan="7"><div class="wui-cal-header">' + monthName + " " + year + '</div></th></tr>';
                            html += '<tr class="wui-cal-header-day">';
                            for (i = 0; i <= 6; i++)
                                html += '<td>' +me.shortDays[i].substring(0,2)+ '</td>';
                            html += '</tr><tr>';

                            // Generate Days
                            // this loop is for is weeks (rows)
                            for (i = 0; i < 9; i++) {
                                // this loop is for weekdays (cells)
                                for (j = 0; j <= 6; j++) { 
                                    html += '<td>';
                                    if (day <= monthLength && (i > 0 || j >= startingDay))
                                        html += '<a class="wui-cal-day">' +(day++)+ '</a>';
                                    html += '</td>';
                                }
                                // stop making rows if we've run out of days
                                if (day > monthLength)  break;
                                else                    html += '</tr><tr>';
                            }
                            html += '</tr></table>';

                            var tbl = $(html),
                                header = tbl.find('.wui-cal-header');

                            // Set up listeners
                            header.append('<a class="wui-cal-prev">','<a class="wui-cal-next">');
                            header.children('a').click(function(){
                                var dir = $(this).hasClass('wui-cal-prev') ? -1 : 1;
                                calendar.html('');
                                calendar.append(genHTML(new Date(year, month + dir, today.getDate())));
                            });
                            
                            if(me.value && me.value.getMonth() == month && me.value.getFullYear() == year)
                                tbl.find('a:contains(' +selectDy+ '):first').addClass('selected');
                            
                            if(today.getMonth() == month && today.getFullYear() == year)
                                tbl.find('a:contains(' +today.getDate()+ '):first').addClass('highlight');

                            tbl.find('td a').click(onSelect);
                            return tbl;
                        }
                    },

    /** 
    @param {string}    dtString   A string describing a date by any number of methods
    @return            A number
    Converts numbers as words to a regular number. The words MUST use correct grammar (hyphens should be used between 20 and 99)
    */
    processDate:    function(dtString){
                        var me = this,
                            dateString = dtString || me.field.val();
                        
                        if (dateString.length > 0) {
                            var genDate = me.translateDate(dateString);
                            
                            //Returns a message to the user that the program doesn't understand them
                            if(genDate.toString() == 'Invalid Date'){
                                me.displayDate(me.sarcasmArray[Wui.randNum(0,(me.sarcasmArray.length -1))]);
                                return;
                            }
                            
                            me.value = genDate;
                            me.displayDate();
                            return genDate;
                        }else{
                            me.value = null;
                            me.displayDate('');
                        }
                    },
    /** 
    @param {object}    t    A WUI object, namely this object
    @return    The field of the object.
    Sets additional listeners on the text field, namely to process the date when it changes */
    setListeners:   function(t){
                        return t.field.keyup(function(evnt){ t.processDate(); });
                    },
    
    /** 
    @param {date}    minDt    A date that will become the lower bound for the field
    @return    The newly set this.minDate.
    Sets the lower bound for the field, updating the jQuery datepicker as well. */
    setMinDate:     function(minDt){ 
                        var me = this;
                        me.minDate = me.translateDate(minDt.toString());
                        me.field.datepicker( "option", "minDate", new Date(me.minDate.valueOf() + me.minute));
                        return me.minDate;
                    },
    
    /** 
    @param {string}    ds    A string containing the description of a date and time
    @return    A Date based on the interpretation of the date string.
    Translates the date from the user's input to a javascript Date object */
    translateDate:  function(ds){
                        var me            = this,
                            now         = new Date(), 
                            orig        = ds,
                            dateReg     = /\d{1,2}\/\d{1,2}\/\d{2,4}/,
                            ifDateReg   = /([a|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|and,\d,\s,-]+)\s((millisecond|second|minute|hour|day|week|month|year)+[s]*)\s(from|after|before|previous to)+\s(.+)$/,
                            intvF       = ifDateReg.exec(ds.toLowerCase());
                        
                        //for interval specifications
                        if(intvF !== null){
                            var n       = me.num2Dec(intvF[1]),
                                directn = {from:1, after:1, before:-1, 'previous to':-1},
                                dir     = directn[intvF[4]],
                                dt      = me.translateDate(intvF[5]);  
                            return dt['add' + intvF[3].charAt(0).toUpperCase() + intvF[3].slice(1) + 's'](n * dir);
                        }
                       
                        //returns a match for "now"
                        if(ds.toLowerCase().match(/now/) !== null){ return now; }
                        
                        ds = ds.toLowerCase()
                        .replace('noon','12')
                        .replace('midnight','00:00')
                        .replace(/o.clock/,'')
                        .replace(/(\d+)[st|nd|rd|th]+/,function(m,dt){ return dt; })                        // Strip 'nd', 'th', 'rd', 'st'
                        .replace(/(\d{4})-(\d{1,2})-(\d{1,2})/g,function(m,yr,mm,dd){                       // Change UTC dates to ISO
                            return mm + '/' + dd + '/' + yr;
                        })
                        .replace(/(\d{1,2})-(\d{1,2})-(\d{2,4})/g,function(m,mm,dd,yr){                     // Change other UTC dates to ISO
                            return mm + '/' + dd + '/' + yr;
                        })
                        .replace(/^(\d{1,2})-(\d{1,2})[\s]*/,function(m,mm,dd){ return mm + '/' + dd + ' '; }) // Change other UTC dates to ISO
                        .replace('at','@')                                                                  // Replace at with the @ symbol
                        .replace(/(today|tomorrow|yesterday)/,function(m,f){                                // Translate today, tomorrow & yesterday into dates
                                 var replaceDays = {'today':0, 'tomorrow':1, 'yesterday':-1},
                                     newDt = new Date(now.valueOf() + (me.day * replaceDays[f]));
                                 return  (newDt.getMonth() + 1) + '/' + newDt.getDate() + '/' + newDt.getFullYear();
                             })
                        .replace(/(next|last) ([a-z]{3,10})[ ]*([0-9]+)*/,function(n, dir, word, day){      // Translate days of week & months into dates
                             var dayVal = me.day * ((dir == 'next') ? 1 : -1),
                                 dy = ($.inArray(word,me.days) > -1) ? $.inArray(word,me.days) 
                                 : $.inArray(word,me.shortDays),
                                 month = ($.inArray(word,me.months) > -1) ? $.inArray(word,me.months) 
                                 : $.inArray(word,me.shortMonths),
                                 useNum = (dy > -1) ? dy : (month > -1) ? month : -1,
                                 useFunc = (dy > -1) ? 'getDay' : (month > -1) ? 'getMonth' : '';
                                 
                             if(useNum > -1){
                                 var nxt = now.valueOf(), inc = new Date(nxt += dayVal);
                                 while(inc[useFunc]() != useNum)    inc = new Date(nxt += dayVal);
                                 if(month !== undefined && month != -1 && day.length !== 0)   inc.setDate(parseInt(day));

                                 return (inc.getMonth() + 1) + '/' + inc.getDate() + '/' + inc.getFullYear() + ' ';
                             }else{
                                 return '';
                             }
                         })
                         .replace(/(\d{1,2})[ -]+([a-z]{3,10})([ -]*)/, function(m,f,s,t){                    // Translate 'DD MMM' to 'MM/DD'
                             return ((($.inArray(s,me.months) > -1) ? $.inArray(s,me.months) : 
                                 $.inArray(s,me.shortMonths)) + 1) + '/' + f + t.replace('-',' ');
                         })
                         .replace(/(\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|-)+\b)/g,function(m,f){
                             return me.num2Dec(f);                                                            // Converts number text to decimals
                         })
                         .replace(/([a-z]{3,10}) (\d{1,2})[,]*/, function(m,f,s){                             // Translate 'Month DD' to 'MM/DD'
                             return ((($.inArray(f,me.months) > -1) ? $.inArray(f,me.months) : 
                                 $.inArray(f,me.shortMonths)) + 1) + '/' + s;
                         })
                        .replace(/^(\d{1,2}\/\d{1,2}(?![\d]))([\s|\/]*)(\d{0,4})/, function(m,dt,s,yr){      // Add century to dates with ambiguous years
                            if(yr.length == 2){
                                var thisYear = parseInt(now.getFullYear().toString().substr(2,4)),
                                    thisCentury = parseInt(now.getFullYear().toString().substr(0,2)) * 100,
                                    inputYear = parseInt(yr),
                                    yearDiff = 100 - inputYear,
                                    centuryDiff = (thisYear < 50)    ? -100 * ((yearDiff >= 50) ? 0 : 1) 
                                     : 100 * ((yearDiff < 50) ? 0 : 1),
                                    retYear = thisCentury + inputYear + centuryDiff;
                                return dt + '/' + retYear;    
                            }else if(yr.length == 4){
                                return dt + '/' + yr;
                            }else{
                                var retDt = dt + '/' + now.getFullYear().toString(),
                                    withDt = new Date(retDt);
                                return (withDt.valueOf() > now.valueOf()) ? retDt : dt + '/' + new Date(now.valueOf() + (me.day * 365)).getFullYear() + ' ';
                            }
                        })
                        .replace(/(\d{1,2}\/\d{1,2})\s(\d{4})/,function(m,dt,yr){return dt + '/' + yr; });   // Remove space in instances of '3/21 2012'
                        
                        //Adds today's date to strings that have no date information specified
                        ds = (dateReg.test(ds) === true) ? ds : (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() +' '+ ds;
                      
                        /* Adds an @ symbol for time strings that aren't UTC spec so that they can be modified later */
                        ds = ds.replace(/(\d{1,2}\/\d{1,2}\/\d{4})\s(.+)/,function(m,dt,ts){
                         if(ts.indexOf('@') == -1)   ts = '@ ' + ts;
                         return dt + ' ' + ts;
                        })
                        
                        /* Translate colloquial times */
                        .replace(/\d[ ]*[a|p]$/,function(m){ return m + 'm'; })
                        .replace(/[a|p][.][m]*[.]*/,function(m){ return m.replace(/[.]/g,''); })
                        .replace(/\d.m/,function(m){ return m.substring(0, m.length - 2) + ' ' + m.substring(m.length - 2, 3); })
                        .replace(/@ (\d+[ ]\d+)/,function(m,f){ return f.replace(' ',':'); })
                        .replace(/@ (\d+)/,function(m,f,p,o){ 
                            if(o.indexOf(':') != -1) return m;
                            else                     return m.trim() + ':00 ';
                        })
                        .replace(/@/g,''); // Firefox & IE don't like the @ symbol being used

                        return new Date(ds);
                    },
    
    /** 
    @param {array}    wArray    An array of numbers
    @return    The passed in array of numbers combined according to their order/magnitude
    i.e. The array [1,100,50,5] -> 155, [5,1000,20,3] -> 5023  */
    txt2Num:        function(wArray){
                        //split into an array and combine them according to magnitude
                        var pos = 0, theNum = 0, nextNum = 0, lastNum = 0;
                       
                        if(wArray.length == 1){
                            return wArray[0];
                        }else{
                            while(wArray[pos + 1] !== undefined){
                                var currNum = parseInt(wArray[pos]),
                                    smallerThanNext = this.getM(currNum) <= this.getM(nextNum);
                                nextNum = parseInt(wArray[pos + 1]);
                                lastNum = parseInt(wArray[wArray.length - 1]);

                                if(pos === 0){
                                    theNum = (smallerThanNext) ? currNum * nextNum : currNum + nextNum;
                                }else{
                                    if(smallerThanNext) theNum *= nextNum;
                                    else                theNum += nextNum;
                                }
                                pos++;
                            }
                        }
                       
                        if(lastNum != nextNum)  return (this.getM(lastNum) > 2) ? theNum *= lastNum : theNum += lastNum;
                        else                    return theNum;
                    },
                    
    getVal:         function(){ return this.value; },
                    
    setVal:            function(sv){
                        if(sv !== null){
                            if(typeof sv == 'string'){
                                this.fieldText(sv);
                                this.processDate();
                            }else{
                                this.value = sv;
                                this.fieldText(this.displayDate());
                            }
                        }
                        else{
                            this.fieldText('');
                            this.displayDiv.html('');
                            this.value = null;
                        }
                    },
                    
    /** 
    @param {date}    dt    A date object
    @return    A boolean
    Determines whether the date object passed in is valid or not. */
    validDate:       function(dt){
                        if(dt !== null && dt.toString() == 'Invalid Date')  return false;
                        else if (dt === null)                               return false;
                        else                                                return true;
                    }
});


/**
@author Stephen Nielsen (stephen.nielsen@usurf.usu.edu)
Creates a form field for uploading files. By the nature of file uploads and their tight pairing to a backend server, this control must be extended itself to be used for uploading files.
*/
Wui.File = function(args){ 
    $.extend(this,{
        /** An event hook to perform any functionality before a file is uploaded @eventhook */
        beforeSubmit:function(){},
        
        /** A value to send to the server where it will filter/block file uploads according to file type */
        fileTypeFilter: null,
        
        /** The name of the field that contains the file */
        upFieldName:'fileupload',
        
        /** Additional parameters to send to the server besides the file*/
        params:   {},
        
        /** Event hook to be performed when a file is successfully uploaded. @eventhook */
        upSuccess:  function(){},
        
        /** The server-side page where the file will be uploaded. */
        url:   '',
        
        /** The name of the parameter of the file title. */
        upTitleName:'title'
    },args,{
        field:    $('<input>').attr({type:'text'})
    });
};
Wui.File.prototype = $.extend(new Wui.Text(),{
    /** */
    changeClick:function(){
                     //swap buttons
                     this.changeBtn.el.fadeOut('fast');
                     this.upBtn.el.parents('div:first').fadeIn('slow'); 
                     this.field.removeClass().focus();
                 },
    
    /** */
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me);

                    // Wrap the field in order to add absolutely positioned buttons
                    me.append(me.wrapper = $('<div>').addClass('wui-file').append(me.field));
                    me.elAlias = me.wrapper;

                    var uniqueId = Wui.id();

                    // Add form, iframe, and buttons
                    me.push(
                        me.iframe = new Wui.O({el:$('<iframe>').css({display:'none'}).attr({id:uniqueId, name:uniqueId}) }),
                        me.changeBtn = new Wui.Button({
                            click:      function(){ 
                                            me.fieldText('');
                                            me.field.removeAttr('disabled'); 
                                            me.changeClick(); 
                                        },
                            text:       'X',
                            tabIndex:   -1,
                            cls:        'file-change field-btn'
                        }),
                        me.upBtn = new Wui.Button({text:'Browse', cls:'field-btn', tabIndex:-1 }),
                        me.fileFrm = new Wui.O({
                            el:$('<form>').attr({
                                method:     'post',
                                enctype:    'multipart/form-data',
                                action:     me.url,
                                target:     uniqueId
                            })
                        })
                    );

                    me.fileFrm.append(
                        // The file field
                        me.fileInput = $('<input>')
                        .attr({name:me.upFieldName, type:'file'})
                        .change(function(){ me.submit(); })
                        .focus(function(){ me.upBtn.el.addClass('selected'); })
                        .blur(function(){ me.upBtn.el.removeClass('selected'); })
                    );
                },

    /** Submit the form */
    submit:     function() {
                    var me = this;

                    me.beforeSubmit();
                    
                    //add title to parameters and parameters to the file upload
                    me.params[me.upTitleName] = me.field.val();
                    
                    // for file filtering
                    if(me.fileTypeFilter !== null) me.params[file_type_filter] = me.fileTypeFilter;

                    me.field.addClass('has-file uploading').attr('disabled', true).val('uploading...');
                    
                    /** add additional paramters before sending */
                    me.fileFrm.el.children("input[type!='file']").remove();
                    $.each(me.params, function(key, value) {
                        me.fileFrm.append($('<input>').attr({type:'hidden', name:key, value:value}));
                    });
                    
                    /** Submit the actual form */
                    me.fileFrm.el.submit(); 
                    
                    /** Do something after we are finished uploading */
                    me.iframe.el.unbind().load(function() {
                        me.onComplete($('body',me.iframe.el.contents()).text()); //done :D
                    });
                },

    /**
    @param {object} unwrapped The Wui.unwrapData unwrapped results of the file upload.
    This function is for developers to run whatever analysis they desire on the raw output of the file upload.
    */
    devHook:    function(){},

    /** */            
    onComplete: function(r){
                    try{
                        var me = this,
                            d = $.parseJSON(r),
                            unwrapped = Wui.unwrapData.call(me,d);
                            
                        // Put the returned data out there for develpers.
                        me.devHook(unwrapped);
                        
                        //remove the css uploading state
                        me.field.removeClass('uploading empty');
                        
                        // If successful it will set the value of the field, else it whines and complains
                        if(d.success === true){
                            me.val(unwrapped.data,'upSuccess');
                        }else{
                            if(d.errors && d.errors[0] && d.errors[0].fileTypeError){
                                Wui.errRpt(d.errors[0].fileTypeError,'Invalid File Type');
                                me.field.removeClass('has-file uploading').removeAttr('disabled');
                                if(me.beforeSelectTitle)
                                    me.fieldText(me.beforeSelectTitle);
                            }else{
                                me.upFailure(d);
                            }
                        }
                    }catch(err){
                        console.log(err,r);
                        me.upFailure(err,r);
                    }
                },
    upFailure:  function(e,e2){
                    console.log(e,e2);
                    Wui.Text.prototype.val.call(this,'Upload Failure');
                },
    /** */
    getVal:        function(){ return this.value || {}; },
    /** */
    setVal:        function(sv){
                    this.value = this.value || {};
                    $.extend(this.value,sv);
                },
    /** */
    val:        function(sv,callback){
                    var retVal = Wui.FormField.prototype.val.apply(this,arguments);
                    if(this[callback] && typeof this[callback] == 'function') this[callback]();
                    return retVal;
                },
    
    /** */
    valChange:  function(){
                    var me = this;
                    if(me.value){
                        me.field.addClass('has-file').removeAttr('disabled');
                        me.upBtn.hide();
                        me.fileFrm.hide();
                        asdf = me.upBtn;
                        me.changeBtn.show();
                        
                        //changed to a 'file-selected' view and display a nicely formatted file
                        me.field.addClass('has-file ' + ((me.value.extension !== undefined) ? 'icon-' + me.value.extension.replace('.','') : '')).attr('disabled',true);
                        me.fieldText(me.value[me.upTitleName]);
                    }else{
                        me.field.removeClass();
                        me.upBtn.show();
                        me.fileFrm.show();
                        me.changeBtn.hide();
                        me.field.val(null);
                    }
                    
                }
});

/**
@param {string}     msg         Label of the text input if no other inputs are defined.
@param {funciton}   callback    Function will receive the value of the text input if no other inputs are defined, or it will get an object containing all form values.
@param {string}     [msgTitle]  The title for the window, defaults to 'Input'.
@param {array}      [inputs]    Array of Wui.FormFields to display on the window. When this array has only one item it merely replaces the default text field and is required. 
@param {string}     [content]   HTML content to display above the form fields.

Presents a WUI Form in a modal window.  In its simplest form, just passing in a single 'msg' string will present a window with a text field and the 'msg' as a label for the field. For the various configurations, see the example source.
*/
Wui.input = function(msg, callback, msgTitle, inputs, content){
    // make sure the inputs will be acceptable on the form
    if(inputs){
        if(!inputs.length){
            if(inputs instanceof Wui.FormField || inputs.ftype)
                inputs = [inputs];
            else
                inputs = [{ftype:'Wui.Text'}];
        }
    }else{
        inputs = [{ftype:'Wui.Text'}];
    }
    if(inputs.length == 1)    $.extend(inputs[0],{label:msg, required:true, name:'inputField'});
    if(content !== undefined) inputs.splice(0,0,{ftype:'Wui.Note', html: content});
    
    // create the form and the window
    var inputFrm = new Wui.Form({ labelPosition:'left', items:inputs }),
        Msg = new Wui.Window({
            title:      msgTitle || 'Input',
            bbar:        [ 
                            new Wui.Button({text:'Cancel', click:function(){ Msg.answerRun = true; Msg.close(); }}),
                            new Wui.Button({text:'Submit', click:function(){ Msg.getVal(); }})
            ],
            isModal:    true,
            items:      [inputFrm],
            cls:        'wui-input-window',
            width:      600, 
            height:     250,
            getVal:        function(){
                            var formData = inputFrm.getData();
                            if(formData){
                                if(callback && typeof callback == 'function'){
                                    var len = Wui.getKeys(formData).length;
                                    if(len == 1 && formData.inputField) callback(formData.inputField);
                                    else                                callback(formData);
                                }
                                Msg.answerRun = true;
                                Msg.close();
                            }
                        },
            onWinClose: function(){ return ((Msg.answerRun !== true) ? false : Msg.answerRun); }
        });
    Msg.header.splice(0,1);
    return inputFrm;
};

})(jQuery,Wui);

