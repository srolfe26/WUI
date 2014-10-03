/*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.1",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+Math.random()}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)
},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=l.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,n.ajaxSettings),b):tc(n.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Dc)Dc[a]()}),k.cors=!!Fc&&"withCredentials"in Fc,k.ajax=Fc=!!Fc,n.ajaxTransport(function(a){var b;return k.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Ic=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Jc})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Lc=a.jQuery,Mc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Mc),b&&a.jQuery===n&&(a.jQuery=Lc),n},typeof b===U&&(a.jQuery=a.$=n),n});

/*! jQuery UI - v1.10.4 - 2014-05-13 http://jqueryui.com Copyright 2014 jQuery Foundation and other contributors; Licensed MIT
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.sortable.js*/
(function(t,e){function n(e,n){var r,s,o,a=e.nodeName.toLowerCase();return"area"===a?(r=e.parentNode,s=r.name,e.href&&s&&"map"===r.nodeName.toLowerCase()?(o=t("img[usemap=#"+s+"]")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(a)?!e.disabled:"a"===a?e.href||n:n)&&i(e)}function i(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}var r=0,s=/^ui-id-\d+$/;t.ui=t.ui||{},t.extend(t.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({focus:function(e){return function(n,i){return"number"==typeof n?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),i&&i.call(e)},n)}):e.apply(this,arguments)}}(t.fn.focus),scrollParent:function(){var e;return e=t.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(t.css(this,"position"))&&/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e},zIndex:function(n){if(n!==e)return this.css("zIndex",n);if(this.length)for(var i,r,s=t(this[0]);s.length&&s[0]!==document;){if(i=s.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(r=parseInt(s.css("zIndex"),10),!isNaN(r)&&0!==r))return r;s=s.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++r)})},removeUniqueId:function(){return this.each(function(){s.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(n){return!!t.data(n,e)}}):function(e,n,i){return!!t.data(e,i[3])},focusable:function(e){return n(e,!isNaN(t.attr(e,"tabindex")))},tabbable:function(e){var i=t.attr(e,"tabindex"),r=isNaN(i);return(r||i>=0)&&n(e,!r)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(n,i){function r(e,n,i,r){return t.each(s,function(){n-=parseFloat(t.css(e,"padding"+this))||0,i&&(n-=parseFloat(t.css(e,"border"+this+"Width"))||0),r&&(n-=parseFloat(t.css(e,"margin"+this))||0)}),n}var s="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(n){return n===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,r(this,n)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,r(this,e,!0,n)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(n){return arguments.length?e.call(this,t.camelCase(n)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.support.selectstart="onselectstart"in document.createElement("div"),t.fn.extend({disableSelection:function(){return this.bind((t.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),t.extend(t.ui,{plugin:{add:function(e,n,i){var r,s=t.ui[e].prototype;for(r in i)s.plugins[r]=s.plugins[r]||[],s.plugins[r].push([n,i[r]])},call:function(t,e,n){var i,r=t.plugins[e];if(r&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(i=0;r.length>i;i++)t.options[r[i][0]]&&r[i][1].apply(t.element,n)}},hasScroll:function(e,n){if("hidden"===t(e).css("overflow"))return!1;var i=n&&"left"===n?"scrollLeft":"scrollTop",r=!1;return e[i]>0?!0:(e[i]=1,r=e[i]>0,e[i]=0,r)}})})(jQuery);(function(t,e){var i=0,s=Array.prototype.slice,n=t.cleanData;t.cleanData=function(e){for(var i,s=0;null!=(i=e[s]);s++)try{t(i).triggerHandler("remove")}catch(o){}n(e)},t.widget=function(i,s,n){var o,r,h,a,l={},c=i.split(".")[0];i=i.split(".")[1],o=c+"-"+i,n||(n=s,s=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[c]=t[c]||{},r=t[c][i],h=t[c][i]=function(t,i){return this._createWidget?(arguments.length&&this._createWidget(t,i),e):new h(t,i)},t.extend(h,r,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),a=new s,a.options=t.widget.extend({},a.options),t.each(n,function(i,n){return t.isFunction(n)?(l[i]=function(){var t=function(){return s.prototype[i].apply(this,arguments)},e=function(t){return s.prototype[i].apply(this,t)};return function(){var i,s=this._super,o=this._superApply;return this._super=t,this._superApply=e,i=n.apply(this,arguments),this._super=s,this._superApply=o,i}}(),e):(l[i]=n,e)}),h.prototype=t.widget.extend(a,{widgetEventPrefix:r?a.widgetEventPrefix||i:i},l,{constructor:h,namespace:c,widgetName:i,widgetFullName:o}),r?(t.each(r._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,h,i._proto)}),delete r._childConstructors):s._childConstructors.push(h),t.widget.bridge(i,h)},t.widget.extend=function(i){for(var n,o,r=s.call(arguments,1),h=0,a=r.length;a>h;h++)for(n in r[h])o=r[h][n],r[h].hasOwnProperty(n)&&o!==e&&(i[n]=t.isPlainObject(o)?t.isPlainObject(i[n])?t.widget.extend({},i[n],o):t.widget.extend({},o):o);return i},t.widget.bridge=function(i,n){var o=n.prototype.widgetFullName||i;t.fn[i]=function(r){var h="string"==typeof r,a=s.call(arguments,1),l=this;return r=!h&&a.length?t.widget.extend.apply(null,[r].concat(a)):r,h?this.each(function(){var s,n=t.data(this,o);return n?t.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,a),s!==n&&s!==e?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):e):t.error("no such method '"+r+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var e=t.data(this,o);e?e.option(r||{})._init():t.data(this,o,new n(r,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,s){var n,o,r,h=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(h={},n=i.split("."),i=n.shift(),n.length){for(o=h[i]=t.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)o[n[r]]=o[n[r]]||{},o=o[n[r]];if(i=n.pop(),1===arguments.length)return o[i]===e?null:o[i];o[i]=s}else{if(1===arguments.length)return this.options[i]===e?null:this.options[i];h[i]=s}return this._setOptions(h),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var o,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=o=t(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,o=this.widget()),t.each(n,function(n,h){function a(){return i||r.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof h?r[h]:h).apply(r,arguments):e}"string"!=typeof h&&(a.guid=h.guid=h.guid||a.guid||t.guid++);var l=n.match(/^(\w+)\s*(.*)$/),c=l[1]+r.eventNamespace,u=l[2];u?o.delegate(u,c,a):s.bind(c,a)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,o,r=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var r,h=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),r=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),r&&t.effects&&t.effects.effect[h]?s[e](n):h!==e&&s[h]?s[h](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){return!0===e.data(n.target,t.widgetName+".preventClickEvent")?(e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(n){if(!t){this._mouseStarted&&this._mouseUp(n),this._mouseDownEvent=n;var i=this,s=1===n.which,o="string"==typeof this.options.cancel&&n.target.nodeName?e(n.target).closest(this.options.cancel).length:!1;return s&&!o&&this._mouseCapture(n)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(n)&&this._mouseDelayMet(n)&&(this._mouseStarted=this._mouseStart(n)!==!1,!this._mouseStarted)?(n.preventDefault(),!0):(!0===e.data(n.target,this.widgetName+".preventClickEvent")&&e.removeData(n.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),n.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t){t.widget("ui.draggable",t.ui.mouse,{version:"1.10.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(e){var i=this.options;return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(t(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(t(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_mouseDrag:function(e,i){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"original"!==this.options.helper||t.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1):!1},_mouseUp:function(e){return t("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.element.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;return n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):"document"===n.containment?(this.containment=[0,0,t(document).width()-this.helperProportions.width-this.margins.left,(t(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):n.containment.constructor===Array?(this.containment=n.containment,undefined):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e="hidden"!==i.css("overflow"),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i),undefined):(this.containment=null,undefined)},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:n.scrollTop(),left:n.scrollLeft()}),{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*s}},_generatePosition:function(e){var i,s,n,a,o=this.options,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=e.pageX,l=e.pageY;return this.offset.scroll||(this.offset.scroll={top:r.scrollTop(),left:r.scrollLeft()}),this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s]),"drag"===e&&(this.positionAbs=this._convertPositionTo("absolute")),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i){var s=t(this).data("ui-draggable"),n=s.options,a=t.extend({},i,{item:s.element});s.sortables=[],t(n.connectToSortable).each(function(){var i=t.data(this,"ui-sortable");i&&!i.options.disabled&&(s.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",e,a))})},stop:function(e,i){var s=t(this).data("ui-draggable"),n=t.extend({},i,{item:s.element});t.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(e),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",e,n))})},drag:function(e,i){var s=t(this).data("ui-draggable"),n=this;t.each(s.sortables,function(){var a=!1,o=this;this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(a=!0,t.each(s.sortables,function(){return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this!==o&&this.instance._intersectsWith(this.instance.containerCache)&&t.contains(o.instance.element[0],this.instance.element[0])&&(a=!1),a})),a?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},e.target=this.instance.currentItem[0],this.instance._mouseCapture(e,!0),this.instance._mouseStart(e,!0,!0),this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,s._trigger("toSortable",e),s.dropped=this.instance.element,s.currentItem=s.element,this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(e)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",e,this.instance._uiHash(this.instance)),this.instance._mouseStop(e,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),s._trigger("fromSortable",e),s.dropped=!1)})}}),t.ui.plugin.add("draggable","cursor",{start:function(){var e=t("body"),i=t(this).data("ui-draggable").options;e.css("cursor")&&(i._cursor=e.css("cursor")),e.css("cursor",i.cursor)},stop:function(){var e=t(this).data("ui-draggable").options;e._cursor&&t("body").css("cursor",e._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i){var s=t(i.helper),n=t(this).data("ui-draggable").options;s.css("opacity")&&(n._opacity=s.css("opacity")),s.css("opacity",n.opacity)},stop:function(e,i){var s=t(this).data("ui-draggable").options;s._opacity&&t(i.helper).css("opacity",s._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(){var e=t(this).data("ui-draggable");e.scrollParent[0]!==document&&"HTML"!==e.scrollParent[0].tagName&&(e.overflowOffset=e.scrollParent.offset())},drag:function(e){var i=t(this).data("ui-draggable"),s=i.options,n=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-e.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop+s.scrollSpeed:e.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-e.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft+s.scrollSpeed:e.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(e.pageY-t(document).scrollTop()<s.scrollSensitivity?n=t(document).scrollTop(t(document).scrollTop()-s.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<s.scrollSensitivity&&(n=t(document).scrollTop(t(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(e.pageX-t(document).scrollLeft()<s.scrollSensitivity?n=t(document).scrollLeft(t(document).scrollLeft()-s.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<s.scrollSensitivity&&(n=t(document).scrollLeft(t(document).scrollLeft()+s.scrollSpeed)))),n!==!1&&t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(i,e)}}),t.ui.plugin.add("draggable","snap",{start:function(){var e=t(this).data("ui-draggable"),i=e.options;e.snapElements=[],t(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=t(this),s=i.offset();this!==e.element[0]&&e.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:s.top,left:s.left})})},drag:function(e,i){var s,n,a,o,r,h,l,c,u,d,p=t(this).data("ui-draggable"),f=p.options,g=f.snapTolerance,m=i.offset.left,_=m+p.helperProportions.width,v=i.offset.top,b=v+p.helperProportions.height;for(u=p.snapElements.length-1;u>=0;u--)r=p.snapElements[u].left,h=r+p.snapElements[u].width,l=p.snapElements[u].top,c=l+p.snapElements[u].height,r-g>_||m>h+g||l-g>b||v>c+g||!t.contains(p.snapElements[u].item.ownerDocument,p.snapElements[u].item)?(p.snapElements[u].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,e,t.extend(p._uiHash(),{snapItem:p.snapElements[u].item})),p.snapElements[u].snapping=!1):("inner"!==f.snapMode&&(s=g>=Math.abs(l-b),n=g>=Math.abs(c-v),a=g>=Math.abs(r-_),o=g>=Math.abs(h-m),s&&(i.position.top=p._convertPositionTo("relative",{top:l-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:c,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r-p.helperProportions.width}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h}).left-p.margins.left)),d=s||n||a||o,"outer"!==f.snapMode&&(s=g>=Math.abs(l-v),n=g>=Math.abs(c-b),a=g>=Math.abs(r-m),o=g>=Math.abs(h-_),s&&(i.position.top=p._convertPositionTo("relative",{top:l,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:c-p.helperProportions.height,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[u].snapping&&(s||n||a||o||d)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,e,t.extend(p._uiHash(),{snapItem:p.snapElements[u].item})),p.snapElements[u].snapping=s||n||a||o||d)}}),t.ui.plugin.add("draggable","stack",{start:function(){var e,i=this.data("ui-draggable").options,s=t.makeArray(t(i.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});s.length&&(e=parseInt(t(s[0]).css("zIndex"),10)||0,t(s).each(function(i){t(this).css("zIndex",e+i)}),this.css("zIndex",e+s.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i){var s=t(i.helper),n=t(this).data("ui-draggable").options;s.css("zIndex")&&(n._zIndex=s.css("zIndex")),s.css("zIndex",n.zIndex)},stop:function(e,i){var s=t(this).data("ui-draggable").options;s._zIndex&&t(i.helper).css("zIndex",s._zIndex)}})})(jQuery);(function(t){function e(t,e,i){return t>e&&e+i>t}t.widget("ui.droppable",{version:"1.10.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(s)?s:function(t){return t.is(s)},this.proportions=function(){return arguments.length?(e=arguments[0],undefined):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},t.ui.ddmanager.droppables[i.scope]=t.ui.ddmanager.droppables[i.scope]||[],t.ui.ddmanager.droppables[i.scope].push(this),i.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){for(var e=0,i=t.ui.ddmanager.droppables[this.options.scope];i.length>e;e++)i[e]===this&&i.splice(e,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(e,i){"accept"===e&&(this.accept=t.isFunction(i)?i:function(t){return t.is(i)}),t.Widget.prototype._setOption.apply(this,arguments)},_activate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var s=i||t.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var e=t.data(this,"ui-droppable");return e.options.greedy&&!e.options.disabled&&e.options.scope===s.options.scope&&e.accept.call(e.element[0],s.currentItem||s.element)&&t.ui.intersect(s,t.extend(e,{offset:e.element.offset()}),e.options.tolerance)?(n=!0,!1):undefined}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",e,this.ui(s)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}}}),t.ui.intersect=function(t,i,s){if(!i.offset)return!1;var n,o,a=(t.positionAbs||t.position.absolute).left,r=(t.positionAbs||t.position.absolute).top,h=a+t.helperProportions.width,l=r+t.helperProportions.height,c=i.offset.left,u=i.offset.top,d=c+i.proportions().width,p=u+i.proportions().height;switch(s){case"fit":return a>=c&&d>=h&&r>=u&&p>=l;case"intersect":return a+t.helperProportions.width/2>c&&d>h-t.helperProportions.width/2&&r+t.helperProportions.height/2>u&&p>l-t.helperProportions.height/2;case"pointer":return n=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,o=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,e(o,u,i.proportions().height)&&e(n,c,i.proportions().width);case"touch":return(r>=u&&p>=r||l>=u&&p>=l||u>r&&l>p)&&(a>=c&&d>=a||h>=c&&d>=h||c>a&&h>d);default:return!1}},t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var s,n,o=t.ui.ddmanager.droppables[e.options.scope]||[],a=i?i.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(s=0;o.length>s;s++)if(!(o[s].options.disabled||e&&!o[s].accept.call(o[s].element[0],e.currentItem||e.element))){for(n=0;r.length>n;n++)if(r[n]===o[s].element[0]){o[s].proportions().height=0;continue t}o[s].visible="none"!==o[s].element.css("display"),o[s].visible&&("mousedown"===a&&o[s]._activate.call(o[s],i),o[s].offset=o[s].element.offset(),o[s].proportions({width:o[s].element[0].offsetWidth,height:o[s].element[0].offsetHeight}))}},drop:function(e,i){var s=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&t.ui.intersect(e,this,this.options.tolerance)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,i){e.element.parentsUntil("body").bind("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,o,a=t.ui.intersect(e,this,this.options.tolerance),r=!a&&this.isover?"isout":a&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,o=this.element.parents(":data(ui-droppable)").filter(function(){return t.data(this,"ui-droppable").options.scope===n}),o.length&&(s=t.data(o[0],"ui-droppable"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").unbind("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}}})(jQuery);(function(t){function e(t){return parseInt(t,10)||0}function i(t){return!isNaN(parseInt(t,10))}t.widget("ui.resizable",t.ui.mouse,{version:"1.10.4",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var e,i,s,n,o,a=this,r=this.options;if(this.element.addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),e=this.handles.split(","),this.handles={},i=0;e.length>i;i++)s=t.trim(e[i]),o="ui-resizable-"+s,n=t("<div class='ui-resizable-handle "+o+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(e){var i,s,n,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=t(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(n,o),this._proportionallyResize()),t(this.handles[i]).length},this._renderAxis(this.element),this._handles=t(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){a.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),a.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),t(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(t(this).removeClass("ui-resizable-autohide"),a._handles.show())}).mouseleave(function(){r.disabled||a.resizing||(t(this).addClass("ui-resizable-autohide"),a._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(e){var i,s,n=!1;for(i in this.handles)s=t(this.handles[i])[0],(s===e.target||t.contains(s,e.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(i){var s,n,o,a=this.options,r=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:r.top,left:r.left}),this._renderProxy(),s=e(this.helper.css("left")),n=e(this.helper.css("top")),a.containment&&(s+=t(a.containment).scrollLeft()||0,n+=t(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:n},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:n},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,o=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===o?this.axis+"-resize":o),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(e){var i,s=this.helper,n={},o=this.originalMousePosition,a=this.axis,r=this.position.top,h=this.position.left,l=this.size.width,c=this.size.height,u=e.pageX-o.left||0,d=e.pageY-o.top||0,p=this._change[a];return p?(i=p.apply(this,[e,u,d]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),this.position.top!==r&&(n.top=this.position.top+"px"),this.position.left!==h&&(n.left=this.position.left+"px"),this.size.width!==l&&(n.width=this.size.width+"px"),this.size.height!==c&&(n.height=this.size.height+"px"),s.css(n),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(n)||this._trigger("resize",e,this.ui()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,s,n,o,a,r,h,l=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&t.ui.hasScroll(i[0],"left")?0:c.sizeDiff.height,o=s?0:c.sizeDiff.width,a={width:c.helper.width()-o,height:c.helper.height()-n},r=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null,h=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null,l.animate||this.element.css(t.extend(a,{top:h,left:r})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!l.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(t){var e,s,n,o,a,r=this.options;a={minWidth:i(r.minWidth)?r.minWidth:0,maxWidth:i(r.maxWidth)?r.maxWidth:1/0,minHeight:i(r.minHeight)?r.minHeight:0,maxHeight:i(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||t)&&(e=a.minHeight*this.aspectRatio,n=a.minWidth/this.aspectRatio,s=a.maxHeight*this.aspectRatio,o=a.maxWidth/this.aspectRatio,e>a.minWidth&&(a.minWidth=e),n>a.minHeight&&(a.minHeight=n),a.maxWidth>s&&(a.maxWidth=s),a.maxHeight>o&&(a.maxHeight=o)),this._vBoundaries=a},_updateCache:function(t){this.offset=this.helper.offset(),i(t.left)&&(this.position.left=t.left),i(t.top)&&(this.position.top=t.top),i(t.height)&&(this.size.height=t.height),i(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,s=this.size,n=this.axis;return i(t.height)?t.width=t.height*this.aspectRatio:i(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===n&&(t.left=e.left+(s.width-t.width),t.top=null),"nw"===n&&(t.top=e.top+(s.height-t.height),t.left=e.left+(s.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,s=this.axis,n=i(t.width)&&e.maxWidth&&e.maxWidth<t.width,o=i(t.height)&&e.maxHeight&&e.maxHeight<t.height,a=i(t.width)&&e.minWidth&&e.minWidth>t.width,r=i(t.height)&&e.minHeight&&e.minHeight>t.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,c=/sw|nw|w/.test(s),u=/nw|ne|n/.test(s);return a&&(t.width=e.minWidth),r&&(t.height=e.minHeight),n&&(t.width=e.maxWidth),o&&(t.height=e.maxHeight),a&&c&&(t.left=h-e.minWidth),n&&c&&(t.left=h-e.maxWidth),r&&u&&(t.top=l-e.minHeight),o&&u&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var t,e,i,s,n,o=this.helper||this.element;for(t=0;this._proportionallyResizeElements.length>t;t++){if(n=this._proportionallyResizeElements[t],!this.borderDif)for(this.borderDif=[],i=[n.css("borderTopWidth"),n.css("borderRightWidth"),n.css("borderBottomWidth"),n.css("borderLeftWidth")],s=[n.css("paddingTop"),n.css("paddingRight"),n.css("paddingBottom"),n.css("paddingLeft")],e=0;i.length>e;e++)this.borderDif[e]=(parseInt(i[e],10)||0)+(parseInt(s[e],10)||0);n.css({height:o.height()-this.borderDif[0]-this.borderDif[2]||0,width:o.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,s=this.originalPosition;return{left:s.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).data("ui-resizable"),s=i.options,n=i._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&t.ui.hasScroll(n[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-a},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,c=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(h,c&&l?{top:c,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&t(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var i,s,n,o,a,r,h,l=t(this).data("ui-resizable"),c=l.options,u=l.element,d=c.containment,p=d instanceof t?d.get(0):/parent/.test(d)?u.parent().get(0):d;p&&(l.containerElement=t(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(i=t(p),s=[],t(["Top","Right","Left","Bottom"]).each(function(t,n){s[t]=e(i.css("padding"+n))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},n=l.containerOffset,o=l.containerSize.height,a=l.containerSize.width,r=t.ui.hasScroll(p,"left")?p.scrollWidth:a,h=t.ui.hasScroll(p)?p.scrollHeight:o,l.parentData={element:p,left:n.left,top:n.top,width:r,height:h}))},resize:function(e){var i,s,n,o,a=t(this).data("ui-resizable"),r=a.options,h=a.containerOffset,l=a.position,c=a._aspectRatio||e.shiftKey,u={top:0,left:0},d=a.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(u=h),l.left<(a._helper?h.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-h.left:a.position.left-u.left),c&&(a.size.height=a.size.width/a.aspectRatio),a.position.left=r.helper?h.left:0),l.top<(a._helper?h.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-h.top:a.position.top),c&&(a.size.width=a.size.height*a.aspectRatio),a.position.top=a._helper?h.top:0),a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top,i=Math.abs((a._helper?a.offset.left-u.left:a.offset.left-u.left)+a.sizeDiff.width),s=Math.abs((a._helper?a.offset.top-u.top:a.offset.top-h.top)+a.sizeDiff.height),n=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),n&&o&&(i-=Math.abs(a.parentData.left)),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,c&&(a.size.height=a.size.width/a.aspectRatio)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,c&&(a.size.width=a.size.height*a.aspectRatio))},stop:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.containerOffset,n=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),h=a.outerWidth()-e.sizeDiff.width,l=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).data("ui-resizable"),i=e.options,s=function(e){t(e).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseInt(e.width(),10),height:parseInt(e.height(),10),left:parseInt(e.css("left"),10),top:parseInt(e.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):t.each(i.alsoResize,function(t){s(t)})},resize:function(e,i){var s=t(this).data("ui-resizable"),n=s.options,o=s.originalSize,a=s.originalPosition,r={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0},h=function(e,s){t(e).each(function(){var e=t(this),n=t(this).data("ui-resizable-alsoresize"),o={},a=s&&s.length?s:e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(a,function(t,e){var i=(n[e]||0)+(r[e]||0);i&&i>=0&&(o[e]=i||null)}),e.css(o)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):t.each(n.alsoResize,function(t,e){h(t,e)})},stop:function(){t(this).removeData("resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).data("ui-resizable");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).data("ui-resizable");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.size,n=e.originalSize,o=e.originalPosition,a=e.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=r[0]||1,l=r[1]||1,c=Math.round((s.width-n.width)/h)*h,u=Math.round((s.height-n.height)/l)*l,d=n.width+c,p=n.height+u,f=i.maxWidth&&d>i.maxWidth,g=i.maxHeight&&p>i.maxHeight,m=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=r,m&&(d+=h),v&&(p+=l),f&&(d-=h),g&&(p-=l),/^(se|s|e)$/.test(a)?(e.size.width=d,e.size.height=p):/^(ne)$/.test(a)?(e.size.width=d,e.size.height=p,e.position.top=o.top-u):/^(sw)$/.test(a)?(e.size.width=d,e.size.height=p,e.position.left=o.left-c):(p-l>0?(e.size.height=p,e.position.top=o.top-u):(e.size.height=l,e.position.top=o.top+n.height-l),d-h>0?(e.size.width=d,e.position.left=o.left-c):(e.size.width=h,e.position.left=o.left+n.width-h))}})})(jQuery);(function(t){function e(t,e,i){return t>e&&e+i>t}function i(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))}t.widget("ui.sortable",t.ui.mouse,{version:"1.10.4",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var t=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===t.axis||i(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_setOption:function(e,i){"disabled"===e?(this.options[e]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):t.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(e,i){var s=null,o=!1,n=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,n.widgetName+"-item")===n?(s=t(this),!1):undefined}),t.data(e.target,n.widgetName+"-item")===n&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(o=!0)}),o)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var o,n,r=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,r.cursorAt&&this._adjustOffsetFromHelper(r.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),r.containment&&this._setContainment(),r.cursor&&"auto"!==r.cursor&&(n=this.document.find("body"),this.storedCursor=n.css("cursor"),n.css("cursor",r.cursor),this.storedStylesheet=t("<style>*{ cursor: "+r.cursor+" !important; }</style>").appendTo(n)),r.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",r.opacity)),r.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",r.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(o=this.containers.length-1;o>=0;o--)this.containers[o]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!r.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,o,n,r=this.options,h=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<r.scrollSensitivity?this.scrollParent[0].scrollTop=h=this.scrollParent[0].scrollTop+r.scrollSpeed:e.pageY-this.overflowOffset.top<r.scrollSensitivity&&(this.scrollParent[0].scrollTop=h=this.scrollParent[0].scrollTop-r.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<r.scrollSensitivity?this.scrollParent[0].scrollLeft=h=this.scrollParent[0].scrollLeft+r.scrollSpeed:e.pageX-this.overflowOffset.left<r.scrollSensitivity&&(this.scrollParent[0].scrollLeft=h=this.scrollParent[0].scrollLeft-r.scrollSpeed)):(e.pageY-t(document).scrollTop()<r.scrollSensitivity?h=t(document).scrollTop(t(document).scrollTop()-r.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<r.scrollSensitivity&&(h=t(document).scrollTop(t(document).scrollTop()+r.scrollSpeed)),e.pageX-t(document).scrollLeft()<r.scrollSensitivity?h=t(document).scrollLeft(t(document).scrollLeft()-r.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<r.scrollSensitivity&&(h=t(document).scrollLeft(t(document).scrollLeft()+r.scrollSpeed))),h!==!1&&t.ui.ddmanager&&!r.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],o=s.item[0],n=this._intersectsWithPointer(s),n&&s.instance===this.currentContainer&&o!==this.currentItem[0]&&this.placeholder[1===n?"next":"prev"]()[0]!==o&&!t.contains(this.placeholder[0],o)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],o):!0)){if(this.direction=1===n?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,o=this.placeholder.offset(),n=this.options.axis,r={};n&&"x"!==n||(r.left=o.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),n&&"y"!==n||(r.top=o.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(r,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,o=s+this.helperProportions.height,n=t.left,r=n+t.width,h=t.top,a=h+t.height,l=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+l>h&&a>s+l,p="y"===this.options.axis||e+c>n&&r>e+c,f=u&&p;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?f:e+this.helperProportions.width/2>n&&r>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>h&&a>o-this.helperProportions.height/2},_intersectsWithPointer:function(t){var i="x"===this.options.axis||e(this.positionAbs.top+this.offset.click.top,t.top,t.height),s="y"===this.options.axis||e(this.positionAbs.left+this.offset.click.left,t.left,t.width),o=i&&s,n=this._getDragVerticalDirection(),r=this._getDragHorizontalDirection();return o?this.floating?r&&"right"===r||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(t){var i=e(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),s=e(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),o=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&s||"left"===n&&!s:o&&("down"===o&&i||"up"===o&&!i)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){h.push(this)}var s,o,n,r,h=[],a=[],l=this._connectWith();if(l&&e)for(s=l.length-1;s>=0;s--)for(n=t(l[s]),o=n.length-1;o>=0;o--)r=t.data(n[o],this.widgetFullName),r&&r!==this&&!r.options.disabled&&a.push([t.isFunction(r.options.items)?r.options.items.call(r.element):t(r.options.items,r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),r]);for(a.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=a.length-1;s>=0;s--)a[s][0].each(i);return t(h)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,o,n,r,h,a,l,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],p=this._connectWith();if(p&&this.ready)for(i=p.length-1;i>=0;i--)for(o=t(p[i]),s=o.length-1;s>=0;s--)n=t.data(o[s],this.widgetFullName),n&&n!==this&&!n.options.disabled&&(u.push([t.isFunction(n.options.items)?n.options.items.call(n.element[0],e,{item:this.currentItem}):t(n.options.items,n.element),n]),this.containers.push(n));for(i=u.length-1;i>=0;i--)for(r=u[i][1],h=u[i][0],s=0,l=h.length;l>s;s++)a=t(h[s]),a.data(this.widgetName+"-item",r),c.push({item:a,instance:r,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,o,n;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(o=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=o.outerWidth(),s.height=o.outerHeight()),n=o.offset(),s.left=n.left,s.top=n.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)n=this.containers[i].element.offset(),this.containers[i].containerCache.left=n.left,this.containers[i].containerCache.top=n.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),o=t("<"+s+">",e.document[0]).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?e.currentItem.children().each(function(){t("<td> </td>",e.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(o)}):"img"===s&&o.attr("src",e.currentItem.attr("src")),i||o.css("visibility","hidden"),o},update:function(t,o){(!i||s.forcePlaceholderSize)&&(o.height()||o.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),o.width()||o.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_contactContainers:function(s){var o,n,r,h,a,l,c,u,p,f,d=null,m=null;for(o=this.containers.length-1;o>=0;o--)if(!t.contains(this.currentItem[0],this.containers[o].element[0]))if(this._intersectsWith(this.containers[o].containerCache)){if(d&&t.contains(this.containers[o].element[0],d.element[0]))continue;d=this.containers[o],m=o}else this.containers[o].containerCache.over&&(this.containers[o]._trigger("out",s,this._uiHash(this)),this.containers[o].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[m].containerCache.over||(this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1);else{for(r=1e4,h=null,f=d.floating||i(this.currentItem),a=f?"left":"top",l=f?"width":"height",c=this.positionAbs[a]+this.offset.click[a],n=this.items.length-1;n>=0;n--)t.contains(this.containers[m].element[0],this.items[n].item[0])&&this.items[n].item[0]!==this.currentItem[0]&&(!f||e(this.positionAbs.top+this.offset.click.top,this.items[n].top,this.items[n].height))&&(u=this.items[n].item.offset()[a],p=!1,Math.abs(u-c)>Math.abs(u+this.items[n][l]-c)&&(p=!0,u+=this.items[n][l]),r>Math.abs(u-c)&&(r=Math.abs(u-c),h=this.items[n],this.direction=p?"up":"down"));if(!h&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[m])return;h?this._rearrange(s,h,null,!0):this._rearrange(s,null,this.containers[m].element,!0),this._trigger("change",s,this._uiHash()),this.containers[m]._trigger("change",s,this._uiHash(this)),this.currentContainer=this.containers[m],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,o=this.options;"parent"===o.containment&&(o.containment=this.helper[0].parentNode),("document"===o.containment||"window"===o.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,t("document"===o.containment?document:window).width()-this.helperProportions.width-this.margins.left,(t("document"===o.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(o.containment)||(e=t(o.containment)[0],i=t(o.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,o="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,n=/(html|body)/i.test(o[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():n?0:o.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():n?0:o.scrollLeft())*s}},_generatePosition:function(e){var i,s,o=this.options,n=e.pageX,r=e.pageY,h="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(h[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(n=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(r=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(n=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(r=this.containment[3]+this.offset.click.top)),o.grid&&(i=this.originalPageY+Math.round((r-this.originalPageY)/o.grid[1])*o.grid[1],r=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-o.grid[1]:i+o.grid[1]:i,s=this.originalPageX+Math.round((n-this.originalPageX)/o.grid[0])*o.grid[0],n=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-o.grid[0]:s+o.grid[0]:s)),{top:r-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:h.scrollTop()),left:n-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:h.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var o=this.counter;this._delay(function(){o===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;var s,o=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&o.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||o.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(o.push(function(t){this._trigger("remove",t,this._uiHash())}),o.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),o.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||o.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(o.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!e){for(this._trigger("beforeStop",t,this._uiHash()),s=0;o.length>s;s++)o[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}if(e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!e){for(s=0;o.length>s;s++)o[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})})(jQuery);

/*! verge 1.6.3 | viewport utils by @ryanve | @link verge.airve.com | @license MIT */
(function(g,d,f){"undefined"!=typeof module&&module.exports?module.exports=f():g[d]=f()})(this,"verge",function(){function g(e,c,b){var a={};e&&!e.nodeType&&(e=e[0]);if(e&&1===e.nodeType)return c="number"==typeof c&&!b&&c||0,e=e.getBoundingClientRect(),a.width=(a.right=e.right+c)-(a.left=e.left-c),a.height=(a.bottom=e.bottom+c)-(a.top=e.top-c),a}var d=window,f=document.documentElement,l=d.Modernizr,h=d.matchMedia||d.msMatchMedia,m=h?function(a){return!!h.call(d,a).matches}:function(){return!1},a=
function(a,c,b){return f[b]<d[c]&&m("(min-"+a+":"+d[c]+"px)")?function(){return d[c]}:function(){return f[b]}},j=a("width","innerWidth","clientWidth"),k=a("height","innerHeight","clientHeight"),a={};a.mq=!h&&l&&l.mq||m;a.matchMedia=h?function(){return h.apply(d,arguments)}:function(){return{}};a.viewportW=j;a.viewportH=k;a.scrollX=function(){return d.pageXOffset||f.scrollLeft};a.scrollY=function(){return d.pageYOffset||f.scrollTop};a.rectangle=g;a.inX=function(a,c){var b=g(a,c);return!!b&&0<=b.right&&
b.left<=j()};a.inY=function(a,c){var b=g(a,c);return!!b&&0<=b.bottom&&b.top<=k()};a.inViewport=function(a,c){var b=g(a,c);return!!b&&0<=b.bottom&&0<=b.right&&b.top<=k()&&b.left<=j()};return a});
jQuery.extend(verge);


/*! Wui 1.2
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2/license.html
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
var Wui = Wui || {
    version: '1.2.0'
};

(function($,window) {

// AJAX error reporting and caching.
$.ajaxSetup({ 
    cache:      false,
    error:      function(response){
                    var err = null;
                    
                    try{        err = $.parseJSON( response.responseText ); }
                    catch(e){   err = {fatalError:'Aw Snap! There was a problem talking to the server.'}; }
                    if(err !== null)
                        Wui.errRpt(err.fatalError);
                }
});


/**
    @param  {object}    obj         Object containing named keys.
    @param  {boolean}   [addIndex]  For fileLists, add the index of the file regardless of whether there is one or many. 
    @return A javascript FormData object (<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">Mozilla Developer Network: FormData</a>) containing the key/values passed in including files.

    Allows the WUI to upload files via ajax by using the javascript FormData object made
    available in HTML5. In cases where a field contains multiple files, the FileList it
    contains will be broken down into multiple keys in the FormData with the keys being named
    {fieldName}_{number-th-file starting with 0} (i.e. 'image_0','image_1',etc...). 

    The following MUST be added to the config of the ajax object:

    contentType:false,
    processData:false


*/
Wui.forAjaxFileUpload = function(obj,addIndex){
    var a = 0, x = 0, formData = new FormData();                                                                    

    // Adds all of the keys in obj to formData
    for (a in obj) {
        if(obj[a] instanceof FileList) {
            if(obj[a].length > 1 || addIndex){
                for(x = 0; x < obj[a].length; x++)
                    formData.append(a+'_'+x,obj[a][x]);
            }else{
                formData.append(a,obj[a][0]);
            }
        }else{
            if      (obj[a]===null) formData.append(a,"");
            else    formData.append(a,obj[a]);
        }
    }

    return formData;
};


/** @return The id of the string. 
    Returns a string that will be a unique to use on the DOM. 
    Ids are returned in the format wui-{number}.
    _.uniqueID([prefix]) can fulfill this role
*/
Wui.id = function(){
    if(Wui.idCounter === undefined) Wui.idCounter = 0;
    return 'wui-' + Wui.idCounter++;
};


/**Returns an array of the keynames of an object. For example:

Wui.getKeys({
    first:  1,
    second: 2,
    third:  'three'    
})

Will return:

['first','second','third']

@preserve_format
@param {object} Object containing named keys
@return Array containing the key names of the passed in object in alphabetical order.
*/
Wui.getKeys = function(obj){
    var retArray = [];
    if(obj)
        $.each(obj,function(key){ retArray.push(key); });
    return retArray.sort();
};

/** A function to get the scrollbar width is necessary because it varies among browsers, and is useful
for sizing objects within a container with overflow set to scroll, or auto.
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)
@return Number specifying the scrollbar width for the current page in pixels.
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
    Determines whether a value is a percent string.
    @return True if there is a string passed in containing a '%', else false.
*/
Wui.isPercent = function(){
    return (arguments[0] && arguments[0].indexOf && arguments[0].indexOf('%') != -1);
};


/** Converts a percentage to a number of pixels given the containing element's dimensions.
    @param {object} el          jQuery Object the percents are being calculated for. 
    @param {string} percent     Percent to be calculated into pixels
    @param {string} dim         Dimension [height,width] for comparing to parent objects
    @return Number in pixels of the percentage passed in.
*/
Wui.percentToPixels = function(el,percent,dim){
    var parent = el.parent(),
        useWindow = (parent[0] === $(window)[0] || parent[0] === $('html')[0] || parent[0] === $('body')[0]),
        parentSize = (useWindow) ? ((dim == 'height') ? $.viewportH() : $.viewportW()) : parent[dim]();
    return Math.floor((parseFloat(percent) / 100) * parentSize);
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
        dc          = me.hasOwnProperty('dataContainer') ? me.dataContainer : Wui.Data.prototype.dataContainer,
        tc          = me.hasOwnProperty('totalContainer') ? me.totalContainer : Wui.Data.prototype.totalContainer,
        response    = (dc && r[dc]) ? r[dc] : r,
        total       = (tc && r[tc]) ? r[tc] : response.length;
    
    return {data:response, total:total};
};

/** 
@param {object} parent The element to which the child will be relatively positioned.
@param {object} child The element to be positioned.
Absolutely positions a child element, relative to its parent, such that it will 
be visible within the viewport and at the max z-index. Useful for dialogs and drop-downs.
*/
Wui.positionItem = function(parent,child){
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
@param      {string}   prop    The name of a css property
@return     The property name, or false

Detects whether a CSS property is supported by the current browser. If its not supported,
the method returns false. If the property is supported, the passed in string will be
returned as-is, or with the necessary vendor appropriate prefix.
*/

Wui.cssCheck = function(prop){
    var i           = 0,
        parts       = prop.split('-'),
        ucProp      = '';

    // camelCase dashed items
    for(; i < parts.length; i++)
        ucProp += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);


    var n           = 0,
        d           = document.createElement("detect"),
        camelProp   = ucProp.charAt(0).toLowerCase() + ucProp.slice(1),
        omPrefixes  = 'Webkit Moz O ms'.split(' '),
        prefixes    = '-webkit- -moz- -o- -ms-'.split(' '),
        all         = (prop+' '+camelProp+' '+omPrefixes.join(ucProp+' ') + ucProp).split(' '),
        property    = false;

    for (; n < all.length; n++) {
        if (d.style[all[n]] === "") {
            property = all[n];
            break;
        }
    }

    // The property is not supported
    if(!property) return false;

    // Return the property if it is supported, or prefixed if needed
    switch(n) {
        case 0:
        case 1:
            return prop;
            break;
        default:
            return prefixes[n-2] + prop;
    }
}


/**
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@param {array}      collection           A collection of items that will be fit within a container.
@param {string}     [dim]                The dimension to perform the fit on, 'height','width', height is default.

This function will size items relative to each other via a 'fit' value, as well as percentages and fixed values.
*/
Wui.fit = function(collection,dim){
    // Ensure the collection is an array of Wui Objects
    if(collection instanceof Array && collection.length > 0){
        var i           = 0,
            fitCt       = 0,
            parent      = (collection[0].parent) ? collection[0].parent : collection[0].el.parent(),
            parentEl    = (parent.el) ? (parent.elAlias || parent.el) : parent,
            dir         = (dim == 'width') ? 'row' : 'column';

        dim = (dir == 'row') ? 'width' : 'height';

        // Make the containing element flex
        parentEl.css('display',Wui.cssCheck('flex')).css(Wui.cssCheck('flex-direction'),dir);

        $.each(collection,function(i,itm){
            if($.isNumeric(itm.fit) && itm.fit >= 0){
                fitCt += itm.fit;           // Tally fit values
                itm[dim] = -1;              // Set to -1 so that CSSByParam will not act on it
            }else if(itm[dim]){
                delete itm.fit;             // Ensure the item doesn't have a dimension and a fit specified
            }else{
                fitCt += (itm.fit = 1);     // Add a fit value to an item that doesn't have dimensions specified
            }
        });
       
        // If a collection becomes entirely fixed widths the flex will have a few problems
        if(fitCt === 0){
            var itm = collection[collection.length - 1];
            fitCt += (itm.fit = 1);
            itm[dim] = -1;
        }
       
        // Apply CSS Flex properties
        $.each(collection,function(i,itm){
            var css = {};
            if(itm.fit){
                $(itm.el).css(Wui.cssCheck('flex'),itm.fit + ' auto');
            }else if(itm.cssByParam === undefined){
                $(itm.el).css(dim,itm[dim]);
                $(itm.el).css(Wui.cssCheck('flex'),'');
            }
        });
    }else{
        console.log('Improper collection specified', arguments);
    }
};


/** The base object from which all other WUI Objects extend. The Wui Object contains some
foundational configs and methods that are key to understanding with WUI at large. Each of these 
methods and configs are found in every reusable object <img src="../img/object.png" width="20" height="20" /> in the WUI.

Each object has an 'el' which represents the HTML object/element that can be added to the DOM. In the case
of the base Wui.O, this element must be defined.

Each object also has a representaion of itself in memory. This object in memory contains an items array.
Although items can be appended to the 'el' without being added to the items array, the items array is meant
to contain all of the child elements of an object.

When a Wui.O is added to another object's items array in memory, its 'el' is appended to the parent object's
'el' on the DOM, as a child DOM node.  This works conversly when removing an item from the items array. The
primary methods for adding/removing items are push(), and splice(); and these are involved in much of the 
manipulation of objects using the WUI. Both push and splice follow in form and function JavaScript's methods of the
same name.

It is important to note that with all WUI objects, there is a distinction between when an object is instantiated
in memory, and when it is actually rendered on the page. Every Wui.O has a event hook called onRender() that can
be defined to do certain things when the object is rendered on the page.


 *  @author     Stephen Nielsen (rolfe.nielsen@gmail.com)
*/
Wui.O = function(args){ $.extend(this,{
    /** Whether the object is hidden on the DOM */
    hidden:         false

    /** If id has a value, the HTML attribute id will be set on the element. */
    //id:           undefined,

    /** If name has a value, the HTML attribute name will be set on the element. 
    This is useful for naming objects for listeners. 

    Adding the name property to an object will fire a namespaced event as well as the generic
    event. Listeners for these events follow the convention: [eventname].[name]. These listeners
    can be turned on and off using the jQuery .on() and .off() methods. */
    //name:         undefined,

    /** This item can contain a space separated list of classes that will be applied
    to the element of the object. Additional classes may be added by the object itself. This
    is useful for adding additional styling to objects. */
    //cls:          undefined,

    /** The fit dimension determines whether objects contained within it are fit
    horizontally or vertically. Possible values are 'width' (= horizontal fitting) 
    or 'height' (= vertical fitting). */
    //fitDimension: 'width',

    /** tabIndex is used to give an item the ability to be tabbed to, and to order that tabbing. 
    A -1 in this value will make the element un-tabbable. */
    //tabIndex:     undefined,
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
    addToDOM:   function(obj, tgt, act){
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
                    if(this.afterRender) this.afterRender();
                    
                    return true;
                },

    afterRender:function(){
                    this.each(function(itm){ if(itm.afterRender) itm.afterRender(); });
                },

    /**
    @param {object}    item    A jQuery object to be added
    Appends item to the WUI Object's 'elAlias' or 'el', whichever is defined.
    */
    append:     function(obj){
                    var me = this, el = me.elAlias || me.el;
                    $.each(arguments,function(i,itm){
                        el.append(itm);
                    });
                },


    /** Removes only the DOM items from the WUI Object's 'elAlias' or 'el', whichever is defined. */
    clear:      function(){
                    var me = this, el = me.elAlias || me.el;
                    el.children().remove();
                },
    /**
    Gets called when a WUI Object is placed and gets called on all of a placed object's items.
    Calls onRender() if it exists on the object, calls its children's callRender(), calls its own 
    afterRender() if it exists, and finally layoutKids() which does layout on child elements.
    */
    callRender: function(){
                    var me = this;
                    
                    if(me.onRender)  me.onRender();         // Perform render for this
                    
                    // Perform rendering for child elements
                    me.each(function(itm){ if(itm.callRender) itm.callRender(); });
                    
                    if(me.afterRender)  me.afterRender();   // Performs afterrender if it exists

                    me.layoutKids();                        // Handles fit and layout for child elements
                },
    
    /**
    @param {string}         name    Name of the HMTL attribute to set
    @param {string|number}     val        Value of the given attribute
    
    @return True if the val parameter is a valid string or number, else false.
    
    Tests whether the passed in value is valid, then uses the jQuery .attr method to apply an attribute to the el of the WUI object.
    */
    applyAttr:  function(name,val){
                    var validVal = (typeof val === 'string' || typeof val === 'number');
                    if(validVal) $(this.el).attr(name,val);
                    return validVal;
                },
    
    /**
    @param {object} item    A WUI Object, or if undefined, the object that this method is a member of.
    
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
                        if($.isNumeric(m.height) && m.height >= 0)      m.el.css({height: m.height});
                        if($.isNumeric(m.width) && m.width >= 0)        m.el.css({width: m.width});

                        // calculate percentage based dimensions
                        if(Wui.isPercent(m.width))  m.el.css({width:Wui.percentToPixels(m.el,m.width,'width')});
                        if(Wui.isPercent(m.height)) m.el.css({height:Wui.percentToPixels(m.el,m.height,'height')});
                        
                        // hide an object based on its hidden value
                        if(m.hidden) m.el.css('display','none');
                        
                        return m.el.addClass(m.cls);
                    }else{
                        return m;
                    }
                },
    /**
    @param {function}   fn          Function that gets called for each item of the object.
    @param {boolean}    [ascending] Whether the loop happens in ascending or descending order. Defaults to true.
    
    @return true
    Loops through each of the objects items. The passed in function gets 
    called with two parameters the item, and the item's index.
    */
    each:       function(f,ascending){
                    ascending = (typeof ascending === 'undefined') ? true : ascending;
                    var i = (ascending) ? 0 : this.items.length - 1;
                    
                    if(this.items){
                        if(ascending){
                            for(i; i < this.items.length; i++){
                                if(f(this.items[i],i) === false) break;
                            }
                        }else{
                            for(i; i >= 0; i--){
                                if(f(this.items[i],i) === false) break;
                            }
                        }
                    }

                    return true;
                },
    /**
    @param {number}     [speed]     Time in milliseconds for the hiding element to fade out.
    @param {function}   [callback]  A function that gets called at the end of the fadeout/hide.
    
    @return The el or elAlias of the object being hidden
    Hides an object with the options of an animated fadeout and callback function
    */
    hide:       function(){ 
                    var args = ['fadeOut'];
                    $.each(arguments,function(i,arg){ args.push(arg); });
                    this.hidden = true;
                    return this.showHide.apply(this,args);
                },

    /**
    @return A number where the object is positioned.
    Returns the index of the item within the object's parent.items array. If the object has no parent, it returns undefined.
    This function is DIFFERENT from jQuery's index() function which provides a DOM elements position within its parent node.
    */
    index:       function(){ 
                    var me = this, myPosition = undefined;
                    if(me.parent){
                        // Get my position within the parental array
                        me.parent.each(function(itm,idx){ if(itm === me) myPosition = idx; });
                    }
                    return myPosition;
                },

    /**
    @param  {function}   afterLayout A function to run after the layout has occurred.
    Runs cssByParam and Wui.fit() on itself and its children.  Similar to callRender(),
    but without the rendering of objects - useful to resize things that are already rendered.
    */
    layout:     function(afterLayout){
                    this.cssByParam(this);  // run css styles
                    this.layoutKids();      // run fit and layout on children

                    // Performs actions passed in as parameters
                    if(afterLayout && typeof afterLayout === 'function')    afterLayout();
                },

    /** A function to run layout on just the objects children without calling cssByParam. */
    layoutKids: function(){
                    var me = this, needFit = false;

                    // Perform Wui.fit on items that need it
                    me.each(function(itm){ if(itm.fit){ 
                        needFit = true; return false;
                    }});
                        
                    if(me.fitDimension || needFit)
                        Wui.fit(me.items, (me.fitDimension || undefined));
                        
                    // Perform layout for child elements
                    me.each(function(itm){ if(itm.layout) itm.layout(); });
                },

    /**
    @param {numeric}    position    Position to move the item to

    Moves the item within the items array it is a member of. If not a member 
    of an items array, this does nothing.
    */
    move:       function(newPosition){
                    var me = this, myPosition = me.index();
                        
                    // Bounds checking
                    newPosition = $.isNumeric(newPosition) ? newPosition : 0;

                    if(myPosition !== undefined){
                        // Moves my position in memory
                        me = Array.prototype.splice.call(me.parent.items,myPosition,1)[0];
                        Array.prototype.splice.call(me.parent.items,newPosition,0, me);
                        
                        // Depending on my position in memory, move DOM element accordingly
                        if(newPosition === 0) {                             //Place at the beginning of the DOM.
                            me.parent.items[1].el.before(me.el);
                        }else if(newPosition > me.parent.items.length) {    // The new position is greater than array length in memory, place at the end of DOM.
                            me.parent.items[me.parent.items.length-2].el.after(me.el);
                        }else{                                              // Place according to the new position in the DOM.
                            me.parent.items[newPosition-1].el.after(me.el);
                        }
                    }
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
                        if(arg.place)   arg.place();
                        else            me.addToDOM(arg);

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
    show:       function(){ 
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
    showHide:   function(fn,speed,callback){
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
                        for(i = 0; i < me.items.length; i++)          { me.addToDOM(me.items[i],el); callProcessors(me.items[i]); }
                    }else if(me.items[(idx + numAdded)] === undefined){    //meaning the new items were inserted at the end of the array
                        for(i = idx; i < me.items.length; i++)        { me.addToDOM(me.items[i],me.items[i-1].el,'after'); callProcessors(me.items[i]); }
                    }else if (numAdded !== 0){                             //items at the beginning/middle of the array
                        for(i = (idx + numAdded); i > 0; i--)         { me.addToDOM(me.items[i-1],me.items[i].el,'before'); callProcessors(me.items[i-1]); }
                    }

                    function callProcessors(arg){
                        arg.parent = me;
                        if(arg.onRender)    arg.onRender();
                        if(arg.layout)      arg.layout();
                    }
                    
                    return retVal;
                }
};

/** The Long Poll object provides a way to poll a remote resource at a given interval.
This is similar to listening on a socket, but is rather repeatedly polling a resource via AJAX.
Long polling is useful for checking on the status of an item, or reloading data that 
changes in real-time while the user has the page on the screen.

The example source is the best way to understand how to use this resource.
If you have a javascript console available, watching the console while this page is loaded
will give you a demonstration if what is happening.

The WUI Long Poll has a self-decaying retry feature: In the case that the resource is unavailable,
rather than continuing to poll at a constant interval, the poll will slow its polling by a factor of the
waitFactor config, until it eventually stops trying. If the resource returns, the poll will revert to
its initial interval.

 @event     pollStart     Fires before polling starts (event, Wui.longPoll)
 @event     pollSuccess   Fires When the poll recieves a successful response. Includes remote data. (event, Wui.longPoll, data)
 @event     pollError     Fires when $.ajax() has an error in the request. (event, Wui.longPoll, err)
 @event     pollStopped   Fires after polling has stopped. Stopping polling doesn't trigger until the startup of the next poll. (event, Wui.longPoll)
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)
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
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    setTimeout(function() { 
                        $.ajax($.extend(me.ajaxParams, { 
                            url:        me.url,
                            data:       me.params,
                            beforeSend: function(jqXHR){
                                            if(me.pollTime > me.originalPollTime * me.maxRetry){
                                                jqXHR.abort();
                                                $(window).trigger($.Event('pollStopped'+ dn),[me])
                                                    .trigger($.Event('pollStopped'),[me]);
                                                return false;
                                            }
                                        },
                            success:    function(data) { 
                                            me.pollTime = me.naturalPollTime;
                                            $(window).trigger($.Event('pollSuccess' + dn),[me, data])
                                                .trigger($.Event('pollSuccess'),[me, data]);
                                        },
                            complete:   function(){ me.poll(); },
                            timeout:    me.pollTime,
                            error:      function(err){ 
                                            // This allows the poll to retry once at the original poll time before increasing 
                                            // by a factor of waitFactor
                                            me.pollTime = (me.pollTime == me.naturalPollTime) ? me.originalPollTime 
                                                : me.pollTime * me.waitFactor;
                                            $(window).trigger($.Event('pollError' + dn),[me, err])
                                                .trigger($.Event('pollError'),[me, err]);
                                        }
                        })); 
                    }, me.pollTime);
                },

    /** Stops the poll engine at just before the beginning of the next poll attempt. */
    stop:       function(){ this.pollTime = this.pollTime * this.maxRetry + 1; },

    /** Resumes polling instantly. */
    start:      function(){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    me.pollTime = me.naturalPollTime;
                    $(window).trigger($.Event('pollStart' + dn),[me])
                        .trigger($.Event('pollStart'),[me]);
                    me.poll();
                }
};


/**
 @event        datachanged    When the data changes (name, data object)
 @author    Stephen Nielsen (rolfe.nielsen@gmail.com)

The WUI Data Object is for handling data whether remote or local. It will fire 
namespacedevents that can be used by an application, and provides a uniform 
framework for working with data.

If data is remote, Wui.Data is an additional wrapper around the jQuery AJAX method 
and provides for pre-processing data. Data can be pushed and spliced into/out of 
the object and events will be fired accordingly.
*/
Wui.Data = function(args){
    $.extend(this,{
        /** Array of data that will be stored in the object. Can be specified for the object or loaded remotely */
        data:           [],
        
        /** Name a key in the data that represents the identity field. */
        identity:       null,
        
        /** Name of the data object. Allows the object to be identified in the listeners, and namespaces events. */
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
    dataContainer:  null,
    /** An object in the remote response specifying the total number of records. Setting this
    feature will overrride the Data object's counting the data. Best set modifying the prototype eg. Wui.Data.prototype.totalContainer = 'total'; */
    totalContainer: null,
    
    /** 
    @param {array}    newData    Array of the new data
    @eventhook Used for when data is changed.
    */
    dataChanged:    function(){},
    
    /**
    @param {function} fn A function that gets called for each item in the object's data array
    
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    dataEach:       function(f){
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
    loadData:       function(){
                        var me = this,
                            config = $.extend({
                                data:       me.params,
                                dataType:   'json',
                                success:    function(r){ me.success.call(me,r); },
                                error:      function(e){ me.failure.call(me,e); },
                            },me.ajaxConfig);
                        
                        if(!me.waiting){
                            var paramsOkay = me.setParams.apply(me,arguments),
                                beforeLoad = me.beforeLoad.apply(me,arguments);

                            if(paramsOkay !== false && beforeLoad !== false){
                                me.waiting = true;
                                return $.ajax(me.url,config);
                            }
                        }else{
                            me.furtherRequests = arguments;
                        }
                    },
    /**
    @param {object} params    Params to be set
    @eventhook Can be used as is or overridden to run when parameters change.
    Can be used as is to set parameters before an AJAX load, or it can also be used as an event hook and overridden.
    This method is called from loadData with its arguments passed on, so arguments passed to load data will be sent here. 
    See loadData(). If this function returns false, load data will not make a remote call.
    */
    setParams:      function(params){
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
                        me.total = ($.isNumeric(t)) ? t : (me.data) ? me.data.length : 0;
                        
                        me.fireDataChanged();
                    },

    fireDataChanged:function(){
                        var me = this, dn = (me.name || 'wui-data');

                        me.dataChanged(me.data);
                        $(document).trigger($.Event('datachanged.' + dn),[dn, me])
                            .trigger($.Event('datachanged'),[dn, me]);
                        me.afterSet(me.data);
                    },
    
    /** @eventhook Event hook that will allow for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData().
        If this function returns false, load data will not make a remote call. */
    beforeLoad:     function(){},
    
    /**
    @param    {array}    data    The value of the data cofig of the current object
    @eventhook  Fires after data is set. Meant to be overridden. See loadData().
    */
    afterSet:       function(){},
    
    /**
    @param {array} d Data to be set on the ojbect
    @eventhook  Fires after the remote call but before data is set on the object. Meant to be overridden. See loadData().
    */
    beforeSet:      function(){},
    
    /**
    @param {object or array} r Response from the server in JSON format
    Runs when loadData() successfully completes a remote call.
    Gets data straight or gets it out of the dataContainer and totalContainer.
    
    Works in conjuction with loadData to limit requests on a particular resource
    if there are additional parameters coming in by setting an undocumented
    member variable named 'furtherRequests' which contains arguments previously
    sent to loadData - if any. This mainly applies in the case of text searches
    on a field. See loadData().

    Calls setData() passing the response and total.
    */
    success:        function(r){
                        var me = this;
                        me.waiting = false;

                        if(me.furtherRequests){
                            me.loadData.apply(me,me.furtherRequests);
                            me.furtherRequests = undefined;
                        }else{
                            var unwrapped = Wui.unwrapData.call(me,r);
                            me.onSuccess(r);
                            me.setData(unwrapped.data, unwrapped.total);
                        }
                    },
    
    /** @eventhook AllowS for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData(). */
    onSuccess:      function(){},
    
    /** @eventhook Allows for the setting of the params config before loadData performs a remote call. Meant to be overridden. See loadData(). */
    onFailure:      function(){},
    
    /** Runs when loadData() fails. Clears the waiting flag and called the event hook onFailure. */
    failure:        function(e){
                        this.waiting = false;
                        this.onFailure(e);
                    },
    
    /** 
    @param {array} Data to be processed.
    Allows for pre-processing of the data before it is taken into the data object. Meant to be overridden, otherwise will act as a pass-through. See loadData().*/
    processData:    function(response){ return response; },

    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Same as Array.push() but acting on the data array of the object.
    */
    push:           function(){
                        var retVal = Array.prototype.push.apply(this.data,arguments);
                        this.total = this.data.length;
                        this.fireDataChanged();
                        return retVal;
                    },

    /**
    @param  {number}    idx         Position to start making changes in the items array.
    @param  {number}    howMany     Number of elements to remove.
    @param  {object}    [obj,...]   One or more objects to be added to the array at position idx
    @return An array of the removed objects, or an empty array. 
    Same as Array.splice() but acting on the data array of the object.
    */
    splice:         function(){
                        var retVal = Array.prototype.splice.apply(this.data,arguments);
                        this.total = this.data.length;
                        this.fireDataChanged();
                        return retVal;
                    }
};


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
                            .replace(/\{(\w*)\}/g,function(m,key){return (me.data[key] !== undefined) ? me.data[key] : "";})
                            // accounts for complex expressions
                            .replace(/\{\((.*?)\)\}/g,function(m,fn){
                                var keys = Wui.getKeys(me.data), vals = [], i = 0;
                                
                                // Removes any key values that may start with a number and ruin the engine
                                for(i = keys.length - 1; i >= 0; i--)   if(keys[i].match(/\b\d+/g)) keys.splice(i,1);

                                // fill arrays of keys and their values and make sure they are in the same order
                                for(i = 0; i < keys.length; i++)        vals.push(me.data[keys[i]]);
                                
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


/**
 WUI Data List extends both Wui.Data and Wui.Template and allows for additional events such as selecting
 and deselecting items. When data is loaded, the template engine will automatically re-render the data set.

 A data list is the basis for Wui.Grid, but can provide powerful tools for creating advanced 
 interface elements. Creating advanced elements can be done using the modifyItem method which allows
 the programmer to add various additional functionality to each template created.  Depending on the level
 of interactivity, CreateItem (the method that adds the listeners to select/deselect the item) must also
 be modified so that interactions with an item don't inadvertently select/deselect the item itself.

 Items in a datalist can be selected programmatically using the selectBy method. Items will be reselected
 after a refresh if the 'identity' config is set to the name of the dataItem that is the identity field.
 
@event        wuiselect         A data template is selected ( DataList, el, record )
@event        wuichange         The selected item info along with the previous selected record if it exists ( DataList, el, record, selection array )
@event        wuideselect       A selected item is clicked again, and thus deselected ( DataList, el, record )
@event        wuidblclick       When an item is double clicked ( DataList, el, record )
 
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
        
        /** Maximum number of data elements to display, even if data set is larger. */
        displayMax:     -1,

        /** DOM element where all of the data templates will be appended. */
        el:             $('<div>'),
        
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
                    var me = this,
                        dn = (me.name) ? '.' + me.name : '',
                        el = me.elAlias || me.el;

                    el.find('.wui-selected').removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuichange' + dn), [me, me.el, {}, me.selected])
                        .trigger($.Event('wuichange'), [me, me.el, {}, me.selected]);
                },
    
    /**
    @param    {object}    itm            Object containing an el (jQuery object), and a rec (data object)
    @param    {boolean}    silent        A true value prevents the 'wuiselect' event from firing
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is selected @private
    */
    itemSelect: function(itm, silent){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                        
                    me.el.find('.wui-selected').removeClass('wui-selected').removeAttr('tabindex');
                    itm.el.addClass('wui-selected').attr('tabindex',1).focus();
                    me.selected = [itm];


                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'+ dn), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },

    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in will be returned.
    Performs mutations and fires listeners when an item is deselected @private
    */        
    itemDeselect:function(itm){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

                    itm.el.removeClass('wui-selected');
                    me.selected = [];
                    me.el.trigger($.Event('wuideselect' + dn),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange' + dn), [me, itm.el, itm.rec, me.selected])
                        .trigger($.Event('wuideselect'),[me, itm.el, itm.rec])
                        .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    return itm;
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The item passed in with listeners added
    Adds the click listeners to the item and calls modifyItem to add greater flexibility
    */
    createItem: function(itm){
                    var me = this,
                        clicks = 0,
                        timer = null, 
                        dn = (me.name) ? '.' + me.name : '';
                    
                    itm.el.on("click", function(e){
                        var retVal = null;
                        var row = this;
                        
                        clicks++;  //count clicks
                        if(clicks === 1) {
                            timer = setTimeout(function() {
                                retVal = singleClick(e,row);
                                clicks = 0;             //after action performed, reset counter
                            }, 350);
                        } else {
                            clearTimeout(timer);    //prevent single-click action
                            retVal = doubleClick(e,row);
                            clicks = 0;             //after action performed, reset counter
                        }
                        return retVal;
                    })
                    .on("dblclick", function(e){
                        e.preventDefault();  //cancel system double-click event
                    });

                    function singleClick(e,row){
                        // Determine the # of selected items before the change
                        if(!me.multiSelect || !(e.metaKey || e.ctrlKey)){
                            if(me.selected.length > 0 && me.selected[0] === itm)    me.itemDeselect(itm);   //deselect item
                            else                                                    me.itemSelect(itm);     //change selection
                        }else{
                            var alreadySelected = $(row).hasClass('wui-selected');
                            $(row).toggleClass('wui-selected',!alreadySelected);

                            if(alreadySelected) $.each(me.selected || [], function(idx,sel){ if(sel == itm) me.selected.splice(idx,1); });
                            else                me.selected.push(itm);

                            me.el.trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                                .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                        }
                    }

                    function doubleClick(e){
                        me.itemSelect(itm,true);
                        me.el
                            .trigger($.Event('wuichange'+ dn), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuidblclick'+ dn),[me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected])
                            .trigger($.Event('wuidblclick'),[me, itm.el, itm.rec]);
                             
                        return false; // stops propagation & prevents default
                    }

                    return me.modifyItem(itm);
                },
    
    /**
    @param    {object}    itm        Object containing an el (jQuery object), and a rec (data object)
    @return The DOM element
    Performs any desired modification on an object - this method is meant to be overridden.
    */
    modifyItem: function(itm){ return itm.el; },
    
    /** Creates the templates based on current data. Then appends them to the el with listeners */
    make:       function(){
                    var me = this,
                        holdingData = me.data || [],
                        holder = $('<div>'), 
                        dn = (me.name) ? '.' + me.name : '';
                    
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
                    me.el.trigger($.Event('refresh'+ dn),[me,me.data])
                        .trigger($.Event('refresh'),[me,me.data]);
                    
                    // Reset selected items if any
                    me.resetSelect();
                },
                
    /** Runs when the object has been appended to its target. Then appends the data templates with listeners. */
    onRender:   function(){
                    var me = this;

                    // Loads data per the method appropriate for the object
                    if(me.autoLoad){
                        if(this.url === null)   me.make();
                        else                    me.loadData();
                    }

                    // Adds a document listener
                    $(document).on('keyup',function(evnt){
                        if(me.selected && me.selected[0] && (document.activeElement == me.selected[0].el[0])){
                            // Simulate a double click if enter or spacebar are pressed on a currently selected/focused item
                            if(evnt.keyCode == 13 || evnt.keyCode == 32){ me.selected[0].el.click(); me.selected[0].el.click(); }
                            if(evnt.keyCode == 38)  me.selectAjacent(-1);  // 38 = up
                            if(evnt.keyCode == 40)  me.selectAjacent(1);   // 40 = down
                        }
                    });
                },

    /**
    @param    {number} num Direction to go to select an ajacent value [1,-1]
    Selects the list item immediately before or after the currently selected item.
    */
    selectAjacent:  function(num){
                        var me = this, selectAjc = me.selected[0].el[(num > 0) ? 'next' : 'prev']();
                        return me.selectByEl(selectAjc);
                    },

    /**
    @param    {jQuery Object} el An object that will match an element in the DataList.
    Selects the matching DataList item.
    */
    selectByEl: function(el){
                    var me = this, retVal = undefined;

                    me.each(function(itm){
                        if(itm.el[0] == el[0])
                            retVal = me.itemSelect(itm);
                    });
                    me.scrollToCurrent();
                    
                    return retVal;
                },
                
    /** Refreshes the DataList to match the data or reload it from the server */
    refresh:    function(){ this.onRender(); },

    /** 
    @param    {Array} arry  An array containing objects with a 'rec' member.
    @return   A new array with just the 'rec' objects which have been copied one level deep
    Performs a copy on an array of dataList items and gets only the records */
    copyArryRecs:function(arry){
                    var newArry = [];

                    arry.forEach(function(itm){
                        var newRec = {};

                        $.each(itm.rec,function(key,val){ newRec[key] = val; });

                        newArry.push(newRec);
                    });

                    return newArry;
                },
    
    /**  Reselects previously selected rows after a data change or sort. Scrolls to the first currently selected row. */
    resetSelect:function(){
                    var me = this,
                        selList = me.copyArryRecs(me.selected);

                    if(selList.length){
                        // Clear current selection list after making a copy of previously selected items
                        me.selected = [];

                        selList.forEach(function(rec){
                            Wui.O.prototype.each.call(me,function(itm){
                                var sameRec = (me.identity) 
                                        ? itm.rec[me.identity] === rec[me.identity] 
                                        : JSON.stringify(itm.rec) === JSON.stringify(rec);
                                
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
                    }
                },
                    
    /** Scrolls the list to the currently selected item. */            
    scrollToCurrent:function(){
                        var me = this,
                            el = me.elAlias || me.el,
                            firstSelect = el.find('.wui-selected:first'),
                            ofstP = firstSelect.offsetParent(),
                            offset = (function(){ 
                                var r = 0; 
                                firstSelect.prevAll().each(function(){ r += $(this).outerHeight() - 0.55; }); 
                                return  r; 
                            })();
                        ofstP.animate({scrollTop:offset },100);
                    },
                    
    /**
    @param    {string} key The data item to look for
    @param    {string|number} val The value to look for
    @return An object containing the dataList, row, and record, or undefined if there was no matching row.
    Selects an item according to the key value pair to be found in a record. */
    selectBy:   function(key,val){
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

 A Wui.Button creates a uniformly styled HTML button with additional functionality of being 
 able to be disabled/enabled.  The action of the button can be defined by using the 'click'
 method, or by naming the button and implementing a listener on the 'wuibtnclick' event.
*/
Wui.Button = function(args){
    $.extend(this, {
        /** The button element. Can be overridden according to the needs of the design. */
        el:         $('<button>').attr({unselectable:'on'}),
        
        /** Whether the button is disabled. */
        disabled:   false,
        
        /** Tool tip text for the button. */
        toolTip:    null,
        
        /** Tab index will make the button focusable by the browser. Changing this value will result in it receiving a higher precedence than what it would receive in that natural flow of the page. */
        tabIndex:   0,
        
        /** Text to appear on the button. Can be HTML if a more complex button design is desired. */
        text:       'Button'
    }, args);
    
    this.init();
};
Wui.Button.prototype = $.extend(new Wui.O(),{
    /** @eventhook Event hook for the button click. */
    click:      function(){},
    
    /** Method that will run immediately when the object is constructed. Adds the click listener with functionality to disable the button.*/
    init:       function(){ 
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    
                    me.el
                    .addClass('wui-btn')
                    .click(btnClick)
                    .keydown(function(evnt){ if(evnt.keyCode == 13) return false; })
                    .keyup(function(evnt){
                        if(evnt.keyCode == 13 || evnt.keyCode == 32)
                            btnClick(evnt);
                        return false;
                    })
                    .html(me.text)
                    .attr({title:me.toolTip, tabindex:me.tabIndex});
                    
                    if(me.disabled)    me.disable();
                    
                    function btnClick(e){
                        if(!me.disabled){
                            Array.prototype.push.call(arguments,me);
                            me.click.apply(me,arguments);
                            me.el.trigger($.Event('wuibtnclick' + dn),[me])
                                .trigger($.Event('wuibtnclick'),[me]);
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
    enable:     function(){
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

The WUI Pane is a box that contains a top bar (header), a bottom bar (footer), and a content area.
The Pane is surrounded by a border that can be manipulated via the borderStyle config.

The header and footer are Wui Objects with their own array of items and methods to add and remove
items. When items are added to the footer it will be added to the pane, and when items are removed
to the point ito becomes empty, it will be removed and the content area will be resized accordingly.
The header will also be added/removed from the pane as objects are added/removed, with the exception
that if a title is set on the pane (any value besides null), then the header will remain until the 
title is cleared.

The content area of the pane is not a Wui object, but is the area where the items of the pane are
added to and removed from. The content area can be refreshed using the layout() method.

The pane can be disabled and enabled, as well as masked and unmaksed (see the methods below).

The title of the pane can be set as a config, as well as modified via the setTitle method.

A Wui.Pane is the base object for the Wui.Window and the above applies to windows as well.
*/
Wui.Pane = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:     true,
        
        /** An array of items that will be added to the header */
        tbar:       [],
        
        /** Whether or not the pane is disabled on load */
        disabled:   false,

        /** When set to true the pane will size itself to the height of its content on layout */
        fitToContent:false,
        
        /** Alignment of the heading title (left,center,right) */
        titleAlign: 'left',
                
        /** Default height */
        height:     '100%',
    
        /** HTML to show in the mask when the pane is disabled */
        maskHTML:   'Empty',

        /** The maximum height the pane will expand to when fitToContent is set to true. If
        fitToContent is false, this property does nothing.*/
        maxHeight:  null,

        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:      null
    },args); 
    this.init();
};
Wui.Pane.prototype = $.extend(new Wui.O(),{
    /** 
    Adds a mask over the content area of the pane 
    @param  {object}    target  A target to apply the mask, otherwise the pane's container will be masked.
    @return The mask object
    */
    addMask:        function(target){
                        target = (target) ? target : this.container.parent();
                        if(target.children('wui-mask').length === 0)
                            return this.mask = $('<div>').addClass('wui-mask').html(this.maskHTML).appendTo(target);
                        else
                            return null;
                    },

    /** Runs after a pane is rendered. Sets up layout listeners and sets focus on the bottom-right-most button if any */
    afterRender:    function(){
                        var me = this;
                        me.layoutInterval = false;

                        document.addEventListener("animationstart", doLayout, false);       // standard + firefox
                        document.addEventListener("MSAnimationStart", doLayout, false);     // IE
                        document.addEventListener("webkitAnimationStart", doLayout, false); // Chrome + Safari
                        
                        // Prevent the layout from occuring more than once ever 100ms
                        function doLayout(){
                            if(me.layoutInterval === false){
                                if(!me.parent && !(me instanceof Wui.Window)) me.layout();
                                me.layoutInterval = true;
                                setTimeout(function(){ me.layoutInterval = false; },100);
                            }  
                        }

                        // If the pane is disabled then it disables it
                        if(me.disabled) me.disable();

                        // Do the layout for the header and footer
                        me.configBar('header');
                        me.configBar('footer');

                        Wui.O.prototype.afterRender.call(this);
                    },

    /** Configuration for the pane border - follows the jQuery CSS convention */
    borderStyle:    { borderWidth: 6 },

    /**
    @param {barName} bar     Either the header or footer bar on the pane ['header','footer']
    Shows/hides the header or footer depending on whether that item has child items.
     */
    configBar:      function(barName){
                        var me = this, bar = me[barName], isHeader = (barName == 'header'),
                            cssProp = (isHeader) ? 'Top' : 'Bottom',
                            hasItems = bar.items.length > 0 || (isHeader && me.title !== null),
                            pad = hasItems ? bar.el.css('height') : 0,
                            border = (hasItems) ? 0 : undefined;

                        // Still enforce borders for tabs
                        if(me.parent && me.parent instanceof Wui.Tabs && ((isHeader && me.tabsHideHeader) || (me.tabsBottom && !hasItems))) border = 6;
                        
                        me.sureEl.css('border' +cssProp+ 'Width', border).children('.wui-pane-wrap').css('padding' +cssProp, pad);
                        if(hasItems){
                            bar.place();
                            bar.callRender();
                            if(isHeader){
                                me.setTitle(me.title);
                                this.setTitleAlign();
                            }else{
                                // Set focus to the bottom right most button in the pane
                                if(!me.disabled)
                                    bar.items[bar.items.length - 1].el.focus();
                            }
                        }else{
                            bar.el.detach();
                        }

                        // Set  border if applicable
                        me.updateBorder();
                    },

    /** Disables the pane by masking it and disabling all buttons */
    disable:        function(){
                        this.addMask();
                        this.footer.each(function(itm){ if(itm.disable) itm.disable(); });
                        this.header.each(function(itm){ if(itm.disable) itm.disable(); });
                        return this.disabled = true;
                    },
    
    /** Enables the pane by removing the mask and enabling all buttons */
    enable:         function(){
                        var me = this;
                        me.removeMask();
                        me.footer.each(function(itm){ if(itm.enable) itm.enable(); });
                        me.header.each(function(itm){ if(itm.enable) itm.enable(); });
                        return me.disabled = false;
                    },

    /** Method that will run immediately when the object is constructed. */
    init:           function(wuiPane){
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
                    },

    /** Overrides the Wui.O layout to allow for the optional sizing to fit content */
    layout:     function(){
                    Wui.O.prototype.layout.apply(this,arguments);
                    
                    if(this.fitToContent === true){
                        var me = this,
                            toolBarsH = me.header.el.outerHeight() + me.footer.el.outerHeight(),
                            maxHeight = $.isNumeric(me.maxHeight) ? me.maxHeight : 0,
                            totalHeight = 0;
                        
                        me.container.children().each(function(){
                            totalHeight += $(this).outerHeight();
                        });

                        totalHeight = (maxHeight > 0 && totalHeight + toolBarsH > maxHeight) ? maxHeight : totalHeight;

                        me.height = totalHeight + toolBarsH;
                        Wui.O.prototype.layout.apply(me,arguments);
                    }
                },

    /** Removes the mask over the content area of the pane */
    removeMask:     function(){
                        var me = this, mask = me.mask || me.el.find('.wui-mask');
                        
                        if(mask){
                            mask.fadeOut(250,function(){ 
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
    
    /** Changes the title on the pane. */
    setTitle:       function(t){ 
                        this.title = t;
                        t = (t && typeof t === 'string') ? t : ''
                        this.header.title.html(t);
                        return this.title;
                    },
    
    /** Changes the title on the pane. */
    setTitleAlign:  function(t){ 
                        var me = this;
                        
                        me.titleAlign = t || me.titleAlign;
                        me.header.title.removeClass('right,left,center').addClass('wui-h-title ' + me.titleAlign);
                        
                        var itemsAlignment = me.titleAlign === 'right' ? 'left' : 'right'; 
                        me.header.elAlias.css('text-align',itemsAlignment);
                    },

    /** Updates the border on a pane. If a parameter is passed in, it will get updated to what is passed.
    Otherwise it merely refreshes what is already set in the config of the pane.
    @param      {object}    [newStyle]  An object containing border style configs. See borderStyle.
    @returns    true
    */
    updateBorder:   function(newStyle){
                        var me = this;

                        if(newStyle){
                            me.el.css(me.borderStyle = newStyle);
                        }else if(me.border && me.hasOwnProperty('borderStyle')){
                            me.el.css(me.borderStyle);
                        }
                    }
});


/**
@event      open    When the window is opened (window)
@event      resize  When the window is resized (width, height)
@event      close   When the window is closed (window)
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

A WUI Window is based on a Wui.Pane and inherits much of its functionality from the pane,
especially with regard to borders, the header, footer, content area, enable/disable functionality
and masking.

Windows can additionally be resizable, draggable, positionable, and modal.

A window will appear in the forefront of the page, and does not need to be placed like other WUI
objects do because it is placed directly at the end of the body on init.

*/
Wui.Window = function(args){ 
    $.extend(this,{
        /** An array of items that will be added to the footer */
        bbar:       [],
        
        /** Whether or not the pane has a border */
        border:     false,
        
        /** Determines whether objects behind the window are accessible */
        isModal:    false,
        
        /** 
        @param {WUI Window} win    The window being closed.
        @eventhook Called just before the window closes. If this function returns false, the window will not be closed. 
        */
        onWinClose: function(){},
        
        /** 
        @param {WUI Window} win    The window being opened.
        @eventhook Called when the window opens. 
        */
        onWinOpen:  function(){},
        
        /** An array of items that will be added to the header */
        tbar:       [], 
        
        /** Text to show on the header of the pane. The header will not show if title is null and the tbar is empty. */
        title:      'Window',
        
        /** Change what comes by default in the pane */
        maskHTML:   'Loading <span class="wui-spinner"></span>',

        /** Set a minimum height that the window can be resized to. If this property
        is not, it will default to the declared height of the window, or zero if the 
        declared height is a percentage. */
        //minHeight: undefined,

        /** Set a minimum width that the window can be resized to. If this property
        is not, it will default to the declared width of the window, or zero if the 
        declared width is a percentage. */
        //minWidth: undefined,

        /** Whether or not the user can resize the window */
        resizable:  true,

        /** Whether or not the user can reposition the window */
        draggable:  true,

        /** The left position of the window when it is resized using Wui.Window.resize() or when it firtst appears. */
        windowLeft: null,

        /** The top position of the window when it is resized using Wui.Window.resize() or when it firtst appears. */
        windowTop:  null
    },args);  
    this.init(); 
};
Wui.Window.prototype = $.extend(new Wui.Pane(),{
    /** Closes the window unless onWinClose() event hook returns false. */
    close:      function(){ 
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    if(me.onWinClose(me) !== false){
                        me.windowEl.trigger($.Event('close' + dn),[me])
                            .trigger($.Event('close'),[me]);
                        me.remove();
                    }
                },
    
    /** Disables the window by masking it and disabling all buttons besides the close window button. */
    disable:    function(){
                    Wui.Pane.prototype.disable.call(this);
                    // Enable the close button for the window - esp. important if its modal
                    if(this.closeBtn)
                        this.closeBtn.enable();
                },
                
    /** Method that will run immediately when the object is constructed. */
    init:       function(){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
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
                    .addClass('wui-window')
                    .css('z-index',Wui.maxZ())
                    .click(bringToFront);
                    
                    // Add draggable
                    if(me.draggable === true)
                        me.windowEl.draggable({handle: me.header.el, start:bringToFront});

                    // Add resizable option if the window is resizable
                    if(me.resizable === true)
                        me.windowEl.resizable({
                            minWidth:   me.minWidth || me.width,
                            minHeight:  me.minHeight || me.height,
                            resize:     function(){ me.fireResize(); }
                        });

                    // Put the window on the body
                    me.place();
                    
                    // Make the overlay the el so that when the window is closed it gets taken with it
                    if(me.isModal)    me.el = me.modalEl;
                    
                    me.onWinOpen(me);
                    me.windowEl.trigger($.Event('open' + dn),[me])
                        .trigger($.Event('open'),[me]);
                    me.resize();

                    function bringToFront(e){
                        var maxZ = Wui.maxZ();
                        if(parseInt((me.el.css('z-index')) || 1) <= maxZ){
                            me.el.css('z-index', maxZ);
                        }
                    }
                },

    /** Fires the resize event and runs layout on the windows children */
    fireResize: function(){
        var me = this, dn = (me.name) ? '.' + me.name : '';
        me.container.trigger($.Event('resize' + dn),[me.container.width(), me.container.height()])
            .trigger($.Event('resize'),[me.container.width(), me.container.height()]);
        return me.layoutKids(); 
    },

    /** 
    @param {[number]} resizeWidth Number of pixels for the window width
    @param {[number]} resizeHeight Number of pixels for the window height
    
    If width and height aren't specified, the window is sized vertically to try to fit its contents 
    without getting larger than the browser viewport.
    */
    resize:     function(resizeWidth, resizeHeight){
                    var me = this;

                    if(Wui.isPercent(resizeWidth))  resizeWidth = Wui.percentToPixels(me.windowEl, resizeWidth, 'width');
                    if(Wui.isPercent(resizeHeight)) resizeHeight = Wui.percentToPixels(me.windowEl, resizeHeight, 'height');

                    var totalHeight = me.container[0].scrollHeight,
                        containerHeight = me.container.height(),
                        headHeight = (me.header && $.isNumeric(me.header.el.outerHeight())) ? me.header.el.outerHeight() : 0,
                        footHeight = (me.footer && $.isNumeric(me.footer.el.outerHeight())) ? me.footer.el.outerHeight() : 0,
                        headersHeight = headHeight + footHeight,
                        useHeight = (arguments.length) ? resizeHeight : (totalHeight + headersHeight >= $.viewportH()) ? ($.viewportH() - 10) : 
                                        (containerHeight <= totalHeight && !me.hasOwnProperty('height')) ? totalHeight + headersHeight : 
                                            Wui.isPercent(me.height) ? Wui.percentToPixels(me.windowEl, me.height, 'height') : me.height;

                    // Size and center the window according to arguments passed and sizing relative to the viewport.
                    me.windowEl.css({ height: useHeight, width: (arguments.length) ? resizeWidth : undefined, });
                    var posLeft =   (me.windowLeft) 
                                        ? ($.isNumeric(me.windowLeft) ? me.windowLeft : Wui.percentToPixels($('html'), me.windowLeft, 'width')) 
                                        : Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)),
                        posTop =    (me.windowTop) 
                                        ? ($.isNumeric(me.windowTop) ? me.windowTop : Wui.percentToPixels($('html'), me.windowTop, 'height')) 
                                        : Math.floor(($.viewportH() / 2) - (useHeight / 2));
                    me.windowEl.css({ top:posTop, left:posLeft });
                    
                    me.fireResize();
                    return {width:me.windowEl.outerWidth(), height:me.windowEl.outerHeight()};
                },

    /** Overrides Wui.O cssByParam and removes styles on modal windows */
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    if(this.isModal){ this.modalEl.css({width:'', height:''}); }    // Remove CSS that accidentally gets applied to the modal cover
                    if(this.windowEl)
                        this.resize();                                              // Resize the window and center
                },

    /** Set the height of the window */
    height:     200,
    
    /** Set the width of the window */
    width:      600
});


/** Shows an message in a modal window
@param {string}         msg         A message for the user
@param {[string]}       msgTitle    Title for the window. Default is 'Message'
@param {[function]}     callback    Function to perform when the message window closes - returning false will prevent the window from closing.
@param {[string]}       content     One or more additional Wui objects to place on the window
@return The Wui.Window object of the message window.
@author     Stephen Nielsen
*/
Wui.msg = function(msg, msgTitle, callback, content){
    var cntnt = [new Wui.O({el: $('<div>').addClass('wui-msg').html(msg) })];
    
    if(typeof content !== 'undefined'){
        if(typeof content.push == 'function')   cntnt.push.apply(cntnt,content);
        else                                    cntnt.push(content);
    }

    var msgWin  = new Wui.Window({
            title:      msgTitle || 'Message', 
            isModal:    true,
            items:      cntnt, 
            width:      350,
            onWinClose: callback || function(){}
        });

    return msgWin;
};

/** Shows an error message
@param {string}         errMsg      Message explaining the error
@param {[string]}       msgTitle    Title for the window. Default is 'Error'
@param {[array]}        buttons     Array containing Wui.Button(s) to give additional functionality.
@param {[function]}     callback    Function to perform when the error window closes - returning false will prevent the window from closing.
@return The Wui.Window object of the error message window.
@author     Stephen Nielsen
*/
Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
    var err = Wui.msg(errMsg,msgTitle,callback);
    if($.isArray(buttons))
        err.footer.push.apply(err.footer,buttons);
    err.container.find('.wui-msg').addClass('wui-err');
    err.resize();
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
    cw.resize();
    return cw;
};

}(jQuery,this));


/*! Wui 1.2
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2/license.html
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
        bbar:           [],
        
        /** An array of items that will be added to the content */
        items:          [],
        
        /** Tabs default to the right side of the pane unless this is true. */
        tabsLeft:       false,
        
        /** A place holder for the currently selected tab. */
        currentTab:     null,
        
        /** Whether to put the tabs on the header or the footer. */
        tabsBottom:     false,
        
        /** Config to place on child items of WUI tabs to make their heading not show up */
        tabsHideHeader: null,
        
        /** An array of items that will be added to the header */
        tbar:    []
    },args); 
    this.init();
};
Wui.Tabs.prototype = $.extend(new Wui.Pane(),{    
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
                                //itm.el.css({borderTopWidth:itm.el.css('border-left-width')});
                                itm.el.addClass('wui-hide-heading');
                            }
                            
                            me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.Button({
                                text:   itm.title || 'Tab ' + (parseInt(idx) + 1),
                                click:  function(){ me.giveFocus(itm); },
                                cls:    itm.tabCls
                            }));
                            //if(me.bbar.length !== 0) me.placeFooter();
                        });
                        
                        return Wui.O.prototype.place.call(me, function(m){ $.each(m.items,function(i,itm){ itm.el.addClass('wui-tab-panel'); }); }); //.wrap($('<div>')
                    },
    
    /** 
    @param {object} itm A WUI Object that will be matched in the items array. 
    @param {[boolean]} supressEvent Determines whether to fire an event when the tab gets focus
    
    Sets the specified tab to active. Runs layout on the newly activated item.
    */
    giveFocus:      function(tab, supressEvent){
                        var me = this, dn = (me.name) ? '.' + me.name : '';
      
                        supressEvent = (supressEvent !== undefined) ? supressEvent : false;
                        
                        $.each(me.items,function(idx,itm){
                            var isActive = itm === tab;
                            itm.tab.el.toggleClass('selected', isActive);
                            itm.el.toggleClass('active', isActive);
                            if(isActive){
                                me.currentTab = itm;
                                if(!supressEvent) 
                                    me.el.trigger($.Event('tabchange'),[me, itm.tab, itm])
                                        .trigger($.Event('tabchange' + dn),[me, itm.tab, itm]);
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
                            if($.trim(itm.tab.el.text()).toLowerCase() === $.trim(txt).toLowerCase().replace(/_/g,' ')){
                                me.giveFocus(itm, supressEvent);
                                retVal = itm;
                            }
                        });
                        return retVal;
                    },
    onRender:       function(){
                        this.giveFocus(this.items[0]);
                    }
});


/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

The grid pane provides table-like functionality for data sets. Grids can be populated remotely
or have their data locally defined. Grids also support infinite scrolling by defining paging
parameters. Columns for the grid are defined in an array and with the following options:

cls             - A special class to add to the column
dataItem        - The item in the record that correlates to this column
dataTemplate    - Sort of a full on renderer, this allows you to format inserted data similar to
                  what is available in Wui.Template
dataType        - The type of data used in the column used for sorting (date, numeric, string:default)
fit             - A numeric indicator of the relative size of the column
resizable       - Whether a column can be resized (defaults to true)
heading         - The title of the column heading
sortable        - Whether or not a column can be sorted
vertical        - Makes the column text oriented vertical and the column height at 150px, not resizable
width           - A pixel value for the width of the column

Custom renderers can be applied to columns.  These renderers are defined as function that can
either be defined in the column definition, or defined elsewhere in scope and simply named by
a string. The rendering function is defined passed the following parameters as below:

renderer: function(grid, cell, value, record, row, grid){}

Grids can be sorted by clicking on the headings of columns. Headings sort ascending on the first click, 
descending on the second and revert to their 'unsorted' order on the third.Sorting on multiple columns 
is possible with the a number indicating the precedence of the sort and an arrow for the direction of the sort 
appearing on the right side of the column heading.

Columns can be resized by dragging the heading borders left and right. Columns can be sized to 
extend beyond the width of the grid frame, but when sized smaller will pop back into position.
*/
Wui.Grid = function(args){
    $.extend(this,{
        /** Array of items that will be added to the footer. */
        bbar:           [],
        
        /** Array of items that will make up the columns of the grid table. */
        columns:        [],
        
        /** URL to get columns if its a dynamic grid */
        colUrl:         null,
        
        /** Params to pass for columns on a dynamic grid */
        colParams:      {},

        /** Configs to pass to the Wui.Data object that handles the retrival of the columns
        The columns are set in the 'afterSet' method of the data flow - See Wui.Data */
        colDataParams:  {},
        
        /** Array of data for the grid. */
        data:           null,
        
        /** Data type the grid assumes a column will be. Matters for sorting. Other values are 'numeric' and 'date' */
        defaultDataType:'string',
        
        /** Whether multiple rows/records can be selected at once. */
        multiSelect:    false,
        
        /** Whether or not to hide the column headers */
        hideHeader:     false,
        
        /** An array of the currently selected records */
        selected:       [],

        /** An array containing objects in the following format, that 
        define the initial sort of the data: {dataItem:'name', order:'asc/desc'} */
        sort:           [],

        /** @private Used internally to keep track of sorting, items added to sort will be used in the sorters array */
        // sorters:     []
        
        /** An array of items that will be added to the header */
        tbar:           []
    },args); 
    this.init();
};
Wui.Grid.prototype = $.extend(new Wui.DataList(), new Wui.Pane(), {
    /** Overrides DataList.afterMake(), sizes the columns and enables the grid @eventhook */
    afterMake:  function(){
                    this.layout();
                    this.removeMask();
                },
    
    /** 
    Recursive function for sorting on multiple columns @private
    @param {number}    depth    Depth of the recursive call
    @param {number}    a        First item to compare
    @param {number}    b        Second item to compare
    
    @return 1 if the first item is greater than the second, -1 if it is not, 0 if they are equal
    */
    doSort:     function(depth,a,b){
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
                        else                                                        return me.doSort(depth + 1,a,b);
                    }else{
                        return (a.rec.wuiIndex > b.rec.wuiIndex) ? 1 : -1;
                    }
                },

    /** Verify that columns have been defined on the grid, or that they are available remotely */
    getColumns: function(){
                    var me = this;
                    
                    if(me.colUrl && me.colUrl.length){
                        // Make remote call for columns
                        me.colProxy = new Wui.Data($.extend({url:me.colUrl, params:me.colParams, afterSet:function(r){ me.setColumns(r); }}, me.colDataParams));
                        me.colProxy.loadData();
                    }else if(me.columns.length){
                        // Check for locally defined columns
                        return me.setColumns(me.columns);
                    }else{
                        //throw('There are no columns defined for this WUI Grid.');
                    }    
                },
    
    /** Runs when the object is created, creates the DOM elements for the grid within the Wui.Pane that this object extends */
    init:       function(){
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
    
    /** Overrides the Wui.O layout to allow for the optional sizing to fit content, column sizing, and data positioning. */
    layout:     function(){
                    Wui.O.prototype.layout.apply(this,arguments);
                    
                    if(this.fitToContent === true){
                        var me = this,
                            toolBarsH = me.header.el.outerHeight() + me.footer.el.outerHeight(),
                            maxHeight = $.isNumeric(me.maxHeight) ? me.maxHeight : 0,
                            totalHeight = me.headingContainer.outerHeight();

                        me.tblContainer.children().each(function(){
                            totalHeight += $(this).outerHeight();
                        });

                        totalHeight = (maxHeight > 0 && totalHeight + toolBarsH > maxHeight) ? maxHeight : totalHeight;

                        me.height = totalHeight + toolBarsH;
                        Wui.O.prototype.layout.apply(me,arguments);
                    }

                    this.posDataWin();
                    if(this.cols.length) this.sizeCols();
                },
                    
    /** Overrides DataList.loadData(), to add the load mask */   
    loadData:   function(){
                    this.setMaskHTML('Loading <span class="wui-spinner"></span>');
                    this.addMask();
                    return Wui.Data.prototype.loadData.apply(this,arguments);
                },            
    
    /** 
    @param    {object}    col    An object containing the sort direction and DOM element of the heading
    @param    {string}    dir    The direction of the sort
    Manages the sorters for the grid by keeping them in an array. 
    */
    mngSorters: function(col,dir){
                    var me = this,
                        sortClasses = ['one','two','three','four','five'];
                    if(col !== undefined){
                        if(dir !== undefined){
                            var addItem = true;
                            for(i = me.sorters.length; i > 0; i--)
                                if(me.sorters[i-1].dataItem == col.dataItem)
                                    addItem = false;

                            col.sortDir = dir;
                            if(addItem)
                                me.sorters.push(col);
                        }else{
                            if(col.sortDir){
                                if(col.sortDir == 'desc'){
                                    delete col.sortDir;
                                    col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                    
                                    for(var i = me.sorters.length; i > 0; i--)
                                        if(me.sorters[i - 1].el == col.el)
                                            me.sorters.splice(i - 1,1);
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
                    }

                    $.each(me.sorters,function(i,itm){
                        itm.el.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir).addClass(itm.cls);
                    });
                },
    
    /** Overrides DataList.modifyItem(), to implement the renderers */        
    modifyItem: function(itm){
                    var me = this;
                    // Perform renderers (if any)
                    $.each(me.renderers,function(idx, r){
                        var cell = itm.el.children(':eq(' +r.index+ ')').children('div'),
                            val = itm.rec[r.dataItem];
                        
                        cell.empty().append(r.renderer.call(null, cell, val, itm.rec, itm.el, me));
                    });
                    return itm.el;
                },
    
    /** Overrides DataList.onRender(), to have the grid wait for columns before loading data while still preserving the set autoLoad value. */   
    onRender:   function(){
                    // Store the real value of autoLoad, but set it to false so that the grid waits for the columns
                    // before loading data.
                    var me = this, al = me.autoLoad;
                    me.autoLoad = false;
                    
                    //Wui.Pane.prototype.onRender.call(this);
                    Wui.DataList.prototype.onRender.call(this);
                    
                    // Start with getting the columns - Many methods waterfall from here
                    me.autoLoad = al;
                    return this.getColumns();
                },
    
    /** Positions the height and width of the data table's container. @private */
    posDataWin: function(){
                    var hh = this.headingContainer.height() - 1;
                    this.tblContainer.css({height:this.container.height() - hh, top:hh});
                },
    
    /** Overrides Pane.configBar() to add positioning the data window when tbars or bbars are added/removed. @private */
    configBar:  function(){
                    Wui.Pane.prototype.configBar.apply(this,arguments);
                    this.posDataWin();
                },

    /** Overrides DataList.refresh() to add disabling the grid to add the load mask */
    refresh:    function(){
                    if(this.url === null)   this.setData(this.data);
                    else                    return this.getColumns();
                },    

    /** Fill in gaps in the column definition and append to the cols array. The cols array is what the grid uses to 
    render/reference columns. The append the column to the DOM */            
    renderColumn:function(col,idx){
                    var me = this;
                    
                    $.extend(col,{
                        dataType:   col.dataType || me.defaultDataType,
                        fit:        (col.fit === undefined) ? (col.width === undefined) ? 1 : -1 : col.fit,
                        cls:        col.cls || '',
                        renderer:   (col.renderer) ?    (function(a){
                                                            // Handles renderer if it exists
                                                            if(typeof a !== 'function' && eval('typeof ' + a) == 'function')
                                                                a = new Function('return ' + a + '.apply(this,arguments)');
                                                            if(typeof a === 'function')
                                                                me.renderers.push({dataItem:col.dataItem, renderer:a, index:idx});
                                                        })(col.renderer) : '',
                        index:      idx,
                        resizable:  typeof col.resizable === 'undefined' ? true : col.resizable,
                        sortable:   typeof col.sortable === 'undefined' ? true : col.sortable,
                        width:      col.width === undefined ? 0 : col.width,
                        el:         $('<li>')
                                    .append($('<div>').text(col.heading))
                                    .attr({unselectable:'on'})
                                    .addClass('wui-gc').addClass(col.cls)
                    });
                    
                    if(col.sortable)    col.el.click(function(){ me.sortList(col); });
                    else                col.el.addClass('wui-no-sort');

                    //grids with single columns shouldn't have a resizable option
                    if(me.columns.length > 1 && !col.vertical && col.resizable){
                        col.el.resizable({
                            handles:    'e',
                            start:      function(event,ui){ me.tempLayout = me.layout; me.layout = function(){}; },
                            stop:       function(event,ui){ me.sizeCols(); me.layout = me.tempLayout; },
                            resize:     function(event,ui){ 
                                            col.width = ui.size.width; col.fit = -1;
                                            Wui.fit(me.cols,'width');
                                        }
                        });
                    }
                    
                    me.cols.push(col);
                    
                    // Append newly created el to the DOM
                    me.heading.append(col.el);
                },
    
    /**
    @param {object} [obj,...] One or more objects to be added to the end of the parent object's items array
    @return The new length of the array 
    Same as Wui.Data.push() but sizes columns on the grid too.
    */
    push:           function(){
                        var retVal = Wui.Data.prototype.push.apply(this,arguments);
                        this.sizeCols();
                        return retVal;
                    },

    /**
    @param  {number}    idx         Position to start making changes in the items array.
    @param  {number}    howMany     Number of elements to remove.
    @param  {object}    [obj,...]   One or more objects to be added to the array at position idx
    @return An array of the removed objects, or an empty array. 
    Same as Wui.Data.splice() but sizes columns on the grid too.
    */
    splice:     function(){
                    var retVal = Wui.Data.prototype.splice.apply(this,arguments);
                    this.sizeCols();
                    return retVal;
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
                    me.template = '<tr>';
                    
                    // apply columns on grid
                    $.each(cols,function(i,col){
                        // Add to the template string based on column info
                        var tpltItem = (col.dataTemplate) ? col.dataTemplate : ((col.dataItem) ? '{' +col.dataItem+ '}' : '');
                        me.template += '<td><div>' +tpltItem+ '</div></td>';
                        
                        // Deal with vertical columns - forces them to be 48px wide
                        if(col.vertical){
                            me.el.addClass('has-vert-columns');
                            if(col.cls) col.cls += ' vert-col';
                            else        col.cls = 'vert-col';
                            
                            col.width = 50;
                            delete col.fit;
                        }
                        
                        // Add column to cols array
                        me.renderColumn(col,i);
                    });
                    
                    // finish template
                    me.template += '</tr>';

                    // clear sorters for columns that no longer exist and reapply local sort
                    if(me.sorters && me.sorters.length && me.cols.length){
                        for(var i = me.sorters.length - 1; i >= 0; i--){
                            var remCol = true;
                            for(var j = 0; j < me.cols.length; j++){
                                if(me.cols[j].dataItem == me.sorters[i].dataItem){
                                    // A handshake of information so the sorter doesn't get confused
                                    me.sorters[i].el = me.cols[j].el; 
                                    me.cols[j].sortDir = me.sorters[i].sortDir;
                                    remCol = false; 
                                    break;
                                }
                            }
                            if(remCol) me.sorters.splice(i,1);
                        }
                    }
                    
                    if(me.autoLoad){
                        if(me.url === null) me.setData(me.data);
                        else                return me.loadData();
                    }
                },
    
    setData:    function(){
                    var me = this, i = null, j = null;

                    Wui.DataList.prototype.setData.apply(me,arguments);
                    
                    // If the config sorters is defined, add them to the array
                    if(me.sort.length && !me.sorters.length)
                        for(i = 0; i < me.sort.length; i++)
                            for(j = 0; j < me.cols.length; j++)
                                if(me.cols[j].dataItem == me.sort[i].dataItem)
                                    me.mngSorters(me.cols[j],me.sort[i].order);

                    this.sortList();
                },

    /** Size up the columns of the table to match the headings @private */
    sizeCols:   function (){
                    var me = this, 
                        hc = me.headingContainer,
                        acctForScrollBar = me.tbl.find('tr:first').height() * me.total > me.tblContainer.height(),
                        sbWid = acctForScrollBar ? Wui.scrollbarWidth() : 0;

                    hc.css('padding-right', sbWid);
                    Wui.fit(me.cols,'width');

                    for(var i = 0; i < me.cols.length; i++)
                        me.tbl.find('td:eq(' +i+ ')').css({ width: me.cols[i].el.innerWidth() });

                    // Necessary to define in javascript because webkit won't use the style
                    // until the width of the table has been defined.
                    me.tbl.css({width: hc.width(), tableLayout: 'fixed'});
                },
                    
    /**
    @param    {object}    Column object associated with a particular column element
    Sort the grid based on the values of one or more columns. If the grid is paging
    then sort remotely.
    */
    sortList:   function(col) {
                    var me = this;
                    
                    me.mngSorters(col);
                    
                    // Sort the list
                    var listitems = me.items;
                    listitems.sort(function(a, b){ return me.doSort(0, a, b); });

                    me.tbl.detach();
                    // Place items and reset alternate coloring
                    $.each(listitems, function(idx, row) { row.el.appendTo(me.tbl); });
                    me.tbl.appendTo(me.tblContainer);
                    me.sizeCols();
                }
});

}(jQuery,Wui));


/*! Wui 1.2
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static4.usurf.usu.edu/resources/wui-nextgen/wui-1-2/license.html
 */

(function($) {
    /** See Docs for Wui.Grid */
    Wui.InfiniteGrid = function(args){
        $.extend(this,{
            /** Array of data for the grid. */
            data:           null,

            /** This is an attribute of Wui.Grid that is not to be used in an infinite grid. 
            Use the same property in paging instead. */
            sort:           null,

            /**
            If paging is anything other than null, the grid will sort remotely and scroll infinitely.
            
            Example paging parameters are:
            {
                limit:    page size,
                start:    0 - a very good place to start
                sort:    {dataItem:'name', order:'asc/desc'}
            }
            */
            paging:            null
        },args); 
        this.init();
    };
    Wui.InfiniteGrid.prototype = $.extend(new Wui.Grid(), {
        /** 
        @param {array}    source        Array containing the data to add rows for.
        Adds rows to the table along with event listeners and column renderers.
        */
        addRows:        function(source){
                            var me = this,
                            holdingData = source || [],
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
                            me.tbl.empty();
                            me.tbl.append(holder.children().unwrap());
                            me.data = holdingData;

                            return source;
                        },
        
        /** 
        Overrides an event hook on Wui.Data and makes the grid after new data is set
        */
        afterSet:        function(retData){
                            var me = this;
                            
                            if(me.isPaging && me.tbl.children().length > 0){
                                if(me.total > me.data.length){
                                    me.addRows(retData);
                                    me.rowHeight = me.tbl.find('tr:first').outerHeight();
                                    me.tbl.css({top:(me.params.start * me.rowHeight) + 'px'});
                                    me.sizeCols();
                                }
                            }else{
                                me.make();
                            }
                        },

        alignPagingSort:function(){
                            var me = this;
                            
                            if(me.sorters.length === 0)
                                    me.paging.sort = me.originalSort;

                            $.each(me.paging.sort,function(idx,itm){
                                $.each(me.columns,function(i,col){
                                    if(col.dataItem === itm.dataItem) me.mngSorters(col,itm.order);
                                });
                            });
                        },

        /** 
        Method that will run immediately when the object is constructed. Creates necessary 
        DOM elements for the grid. Establishes whether the grid is remote or local, paging
        or not. */
        init:            function(){
                            var me = this;
                                
                            Wui.Pane.prototype.init.call(me);
                            me.el.addClass('wui-grid wui-infinite-grid');
                            
                            // Define object internal variables
                            me.tblContainer = $('<div><div> </div><table></table></div>').addClass('grid-body');
                            me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh');
                            me.tbl = me.tblContainer.children('table').addClass('wui-infinite-table');
                            me.tblHSize = me.tblContainer.children('div').addClass('wui-ghs');
                            me.heading = me.headingContainer.children('ul');
                            me.sorters = [];
                            me.renderers = [];
                            me.originalSort = me.paging.sort || null;
                            
                            //Add listeners to table
                            me.tblContainer.scroll(function(){
                                // paging scrolling
                                if(me.isPaging) me.pagingScroll();

                                me.headingContainer.scrollLeft($(this).scrollLeft());
                            });
                            
                            me.elAlias.append(me.tblContainer,me.headingContainer);
                            
                            if(me.hideHeader)
                                me.headingContainer.height(0);
                        },

        /** 
        Renders the data in the table. Overrides Wui.DataList.make()
        @private
        */
        make:           function(){
                            var me = this;

                            if(me.isPaging){
                                me.addRows(me.data);
                                me.rowHeight = me.tbl.find('tr:first').outerHeight();
                                me.totalPages = Math.floor(me.total/me.paging.limit);
                                me.alignPagingSort();
                                me.totalHeight = me.total * me.rowHeight;

                                if(me.tblHSize)
                                    me.tblHSize.height(me.totalHeight);
                            }
                            

                            // Set autoLoad to true because it should only block on the first run, and if this functions is happened then the
                            // object has been manually run
                            me.autoLoad = true;

                            // Event hook and event
                            me.afterMake();
                            me.el.trigger($.Event('refresh'),[me,me.data]);
                        },

        /** 
        @param    {object}    col    An object containing the sort direction and DOM element of the heading
        #param    {string}    dir    The direction of the sort
        Manages the sorters for the grid by keeping them in an array. 
        */
        mngSorters:        function(col,dir){
                            var me = this,
                                i = 0,
                                sortClasses = ['one','two','three','four','five'];

                            if(col !== undefined){
                                if(dir !== undefined){
                                    var addItem = true;
                                    for(i = me.sorters.length; i > 0; i--)
                                        if(me.sorters[i-1].dataItem == col.dataItem)
                                            addItem = false;

                                    col.sortDir = dir;
                                    if(addItem)
                                        me.sorters.push(col);
                                }else{
                                    if(col.sortDir){
                                        if(col.sortDir == 'desc'){
                                            delete col.sortDir;
                                            col.el.removeClass().addClass('wui-gc').addClass(col.cls);
                                            
                                            for(i = me.sorters.length; i > 0; i--)
                                                if(me.sorters[i - 1].el == col.el)
                                                    me.sorters.splice(i - 1,1);
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
                            }

                            // Add/remove classes to indicate to the user what is being sorted and take care of paging
                            if(me.isPaging){
                                me.paging.sort = [];
                                
                                if(me.sorters.length === 0)
                                    me.alignPagingSort();
                            }
                                
                            $.each(me.sorters,function(i,itm){
                                itm.el.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir.toLowerCase()).addClass(itm.cls);

                                if(me.isPaging)
                                    me.paging.sort.push({dataItem:itm.dataItem, order:itm.sortDir});
                            });
                        },

        pagingScroll:   function(){
                            var me      = this,
                                top     = me.tblContainer.scrollTop(),
                                page    = Math.round(me.totalPages * (top / me.totalHeight)),
                                newSuccess = function(){
                                    me.tbl.css({top:(me.actualStart * me.rowHeight) + 'px'});
                                    if(
                                        me.currPage != Math.floor((me.tblContainer.scrollTop() + 
                                        me.tblContainer.height()) / (me.totalHeight / me.totalPages))
                                    ){
                                        me.pagingScroll();
                                    }
                                    me.sizeCols();
                                };

                            me.currPage = me.currPage || 0;
                            me.lastScroll = top;

                            if($.isNumeric(page) && me.currPage != page){
                                me.paging.start = page * me.paging.limit;
                                me.currPage = page;
                                
                                me.actualStart = page * me.paging.limit + ((page !== 0) ? -1 * Math.round(me.paging.limit / 2) : 0);
                                me.actualLimit = me.paging.limit * 2;
                                
                                me.loadData({
                                    start:  $.isNumeric(me.actualStart) ? me.actualStart : 0, 
                                    limit:  $.isNumeric(me.actualLimit) ? me.actualLimit : 50, 
                                    sort:   JSON.stringify(me.paging.sort)
                                });
                            }

                            if(me.onSuccess !== newSuccess){me.onSuccess = newSuccess;}
                        },

        /** Overrides Wui.DataList.scrollToCurrent to turn of scrolling on the infinite grid. */
        scrollToCurrent:function(){
                            if(!this.isPaging)
                                Wui.DataList.prototype.scrollToCurrent.apply(this,arguments);
                        },

        /** Overrides Wui.Data.setParams and allows for adding the infinite scroll parameters. */
        setParams:  function(){
                    var me = this;
                    
                    if(me.paging !== null && typeof me.paging === 'object'){
                        me.isPaging = true;
                        $.extend(me.params,{limit:me.paging.limit, start: me.paging.start, sort:JSON.stringify(me.paging.sort)});

                        if(typeof arguments[0] === 'object' && typeof arguments[0]['start'] === 'undefined')
                            $.extend(arguments[0],{start:0});
                    }
                    return Wui.Data.prototype.setParams.apply(me,arguments);
                },

        setData:        function(){
                            Wui.DataList.prototype.setData.apply(this,arguments);
                            if(!this.isPaging)
                                this.sortList();
                            this.sizeCols();
                        },

        /**
        @param    {object}    Column object associated with a particular column element
        Sort the grid based on the values of one or more columns. If the grid is paging
        then sort remotely.
        */
        sortList:       function(col) {
                            var me = this;
                            
                            me.mngSorters(col);
                            
                            // If paging then do the sorting on the server
                            if(me.isPaging === true){
                                me.currPage = -1;
                                me.tbl.scroll();
                            }else{
                                // Sort the list
                                var listitems = me.items;
                                listitems.sort(function(a, b){ return me.doSort(0, a, b); });

                                me.tbl.detach();
                                // Place items and reset alternate coloring
                                $.each(listitems, function(idx, row) { row.el.appendTo(me.tbl); });
                                me.tbl.appendTo(me.tblContainer);
                                me.sizeCols();
                                me.resetSelect();
                            }
                        }
    });
}(jQuery));



/*! W 1.2
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2/license.html
 */

(function($, window, Wui) {

/**
@preserve_format
The WUI state machine allows for helping the browser to keep a history of the state of a javascript application by utilizing 
text in the URL after the hash ('#'). The WUI state machine follows this format:

In the hash (as a string):          <view 1>?<param1>=<param1 value>&<param2>=<param2 value>/<view 2>?<param1>=<param2 value>

...or without the placeholders:     adminView?pic=one&id=57/adminWindow?info=salary

In the state machine (as an array):

[
    {
        view:   'adminView', 
        params: {
                    pic:    one,
                    id:     57
                }
    },
    {
        view:   'adminWindow', 
        params: { 
                    info:   salary
                }
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
                            viewarea = viewarea.replace(/(\?|\&)([^=]+)\=([^&]*)/g,function(match,delim,key,val){
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
    setParam:        function(target,key,value){
                        var state    = this.getState();
                            
                        for(var i in state){
                            if(state[i].view === target){
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
    Sets a single view and associated parameters on the URL. Clears out all other views.
    use addView and clearView for more granular control.
    */                
    setView:        function(viewName,params){
                        var newState = [{view:viewName}];
                        if(params) newState[0].params = params;
                        this.setState(newState);
                    },

    /**
    @param    {string}    viewName    Name of the view
    @param    {object}    [params]    An object containing key value pairs.
    @return   The name of the view that was added.
    Adds a view to the current list of views. If viewName is the name of an
    existing view, the params passed in will replace those in the existing view.
    */                
    addView:        function(viewName,params){
                        var newState = this.getState(),
                            params = params || {};

                        // Prevent duplicate views
                        for(var i in newState){
                            if(newState[i].view === viewName){
                                newState[i].params = params;
                                this.setState(newState);
                                return viewName;
                            }
                        }

                        // Add a new view
                        newState.push({
                            view:   viewName,
                            params: params
                        });
                        this.setState(newState);

                        return viewName;
                    },

    /**
    @param    {string}    viewName    Name of the view
    @return   The view that was cleared out, or null if the view wasn't found.
    Removes a view from the hash, leaving all others
    */
    clearView:      function(viewName){
                        var state = this.getState(),
                            clearedView = null;

                        for(var i in state){
                            if(state[i].view === viewName){
                                clearedView = state.splice(i,1);
                                break;
                            }
                        }
                            
                        this.setState(state);
                        return clearedView;
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

$.fn[ str_hashchange ].delay = 50;

// Event: hashchange event
// 
// Fired when location.hash changes. In browsers that support it, the native
// HTML5 window.onhashchange event is used, otherwise a polling loop is
// initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
// see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
// compatibility" mode), a hidden Iframe is created to allow the back button
// and hash-based history to work.
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


/*! Wui 1.2
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2/license.html
 */

(function($,Wui) {

var fullPath = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    relativePath = /(\/|\/([\w#!:.?+=&%@!\-\/]))/;

/** 
@author     Stephen Nielsen (rolfe.nielsen@gmail.com)

@event  formupdate Fires when a field on the form changes. Passes (event, form, [field])

The WUI Form is a wrapper for Wui.FormField()s. The WUI Form extends some basic Wui Object 
functionality to work specifically for a form. For example, the each method of a Wui form
operates on all of the items in the form's items array, but can optionally only operate on
only those items which are of the Wui.FormField type.

Items can be pushed and spliced on a Wui form using the push and splice methods, but these
items will receive additional processing through the normFrmItem method which will apply
form properties if they're not already specified on the object (like label position and
enabled status).

FormFields can be defined in a couple of different ways in a form. The first way, is to use
the new operator (i.e. new Wui.Text({})), the other way is to declare an object containing an
ftype:

{ftype:'Wui.Text', [other properties...]}

Data can be set on a form by passing an object with keys matching the form's field names to 
the setData method. getData() works inverse to setData, but will return false rather than
an object if there is a validation problem on the form.  For information about validation, 
see Wui.FormField.validate().

Form items can be accessed by name using the getFrmItm() method.
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
    dispErrors: function(){
                    var msg = '';
                    for(var e = 0; e < this.errors.length; e++) msg += this.errors[e] + '<br/>';
                    Wui.errRpt(msg,'Form Errors');
                },

    /**
    @param {function}   f               A function that gets called for each item of the form with the exception of Wui.Note objects.
    @param {boolean}    [blockNote]     If defined and true, items that do not inherit from Wui.FormField will not be processed.
    @param {boolean}    [ascending]     Whether the loop happens in ascending or descending order. Defaults to true.
    @return true
    The passed in function gets called with two parameters the item, and the item's index.
    */
    each:       function(f, blockNote,ascending){
                    return Wui.O.prototype.each.call(
                        this,
                        function(itm,i){
                            if(!(blockNote && !(itm instanceof Wui.FormField))) return f(itm,i);
                        },
                        ascending
                    );
                },

    /** Class to hilight form fields when they fail validation */
    errCls:        'wui-form-err',

    /**
    @return Object containing the data of the form fields, or false if there was a validation error
    Performs validation on the form and returns either the form data or false. */
    getData:    function(){
                    if(this.validate()) { return this.getRawData(); }
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
    getFrmItm:  function(fieldname){
                    var retItm = undefined;
                    this.each(function(itm,idx){ if(itm.name == fieldname) retItm = itm; });
                    return retItm;
                },
                
    /**
    @return Object containing the data of the form fields
    Gets the values of form fields without performing validation */
    getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); }, true);
                    return ret;
                },
                
    /** Method that will run immediately when the object is constructed. */           
    init:       function(){},
                
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
                        // If a field has its labelSize defined then leave it alone, otherwise use the form's value.
                        if(!(itm.labelSize)) $.extend(itm,{labelSize: me.labelSize});
                        
                        var ft = itm.ftype.split('.');

                        switch (ft.length) {
                            case 1:
                                if(window[ft[0]])   return new window[ft[0]](itm);
                                else                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 2:
                                if(window[ft[0]] && window[ft[0]][ft[1]])   return new window[ft[0]][ft[1]](itm);
                                else                                        throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 3:
                                if(window[ft[0]] && window[ft[0]][ft[1]][ft[2]])    return new window[ft[0]][ft[1]][ft[2]](itm);
                                else                                                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            case 4:
                                if(window[ft[0]] && window[ft[0]][ft[1]][ft[2]][ft[3]]) return new window[ft[0]][ft[1]][ft[2]][ft[3]](itm);
                                else                                                    throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                            default:
                                throw('Object type ' +itm.ftype+ ' is not defined.');
                            break;
                        }
                    }else if(itm instanceof Wui.FormField){
                        // If a field has a label, make it match the format of the form.
                        if(itm.lbl){
                            itm.lbl.setLabelPosition(me.labelPosition);
                            itm.lbl.setLabelSize(me.labelSize);
                        }

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
    push:       function(){
                    var me = this, itms = [];
                    $.each(arguments,function(i,arg){ itms.push(me.normFrmItem(arg)); });
                    return Wui.O.prototype.push.apply(this,itms);
                },

    /**
    @param  {number}    idx         Position to start making changes in the items array.
    @param  {number}    howMany     Number of elements to remove.
    @param  {object}    [obj,...]   One or more objects to be added to the array at position idx
    @return An array of the removed objects, or an empty array. 
    Similar to the Wui.O.splice() with the addition of running normFrmItem().
    */
    splice:     function(idx,howMany){
                    var me = this, 
                        itms = [],
                        index = Array.prototype.shift.apply(arguments),
                        remove = Array.prototype.shift.apply(arguments);

                    // Create/normalize passed in objects
                    $.each(arguments,function(i,arg){ itms.push(me.normFrmItem(arg)); });

                    // Add Elements back in
                    itms.splice(0,0,index,remove);
                    return Wui.O.prototype.splice.apply(this,itms);
                },

    /**
    @param {string} fieldname The name of the field to be removed
    @return True
    Removes a form field from a form based on its name.
    */
    remFrmItm:  function(fieldname){
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
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    if(changed)
                        me.el.trigger($.Event('formupdate'), [me, changedItem])
                            .trigger($.Event('formupdate' + dn), [me, changedItem]);
                    me.formChanged = changed;
                    return me.formChanged;
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
                                }, true);
                            }
                    else    {    this.each(function(itm){ itm.val(null,fireEvents); }, true); }
                    this.formChange(false);
                },
    
    /** Disable all form fields */
    disable:    function(){ return this.each(function(itm){ itm.disable(); }, true); },
    
    /** Enable all form fields */
    enable:     function(){ return this.each(function(itm){ itm.enable(); }, true); },
    
    /**
    @param {string} fieldname The name of the field to set a value on
    @param {any} v    Value to set the field to.
    Sets a field of a given name to a given value.
    This method will fail unless the items of the form are initialized W formField objects
    */
    setField:   function(fieldname, v){
                    this.each(function(itm){ if(itm.name == fieldname) itm.val(v); }, true);
                },
    
    /**
    @param {string} err An error message.
    Adds a thrown error to the form's errrs array so that all errors on a form can be reported at once.
    */
    throwError: function(err){this.errors.push(err); return false;},
    
    /**
    Runs the validate() function for each of a form's fields.
    */
    validate:   function(){
                    var me = this;
                    me.errors = [];
                    me.each(function(itm){ 
                        if(typeof itm.el.toggleClass !== 'undefined')
                            itm.el.toggleClass(me.errCls,!itm.validate());
                    }, true);
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
        html:   ''
    },args);
    this.init();
};
Wui.Note.prototype = $.extend(new Wui.O(),{
    /** Method that will run immediately when the object is constructed. */
    init:   function(){ this.el = $('<div>').html(this.html).addClass('wui-note'); }
});


/** 
    The label object will wrap around a Wui.FormField when the 'label' config is specified
    on the field. The labelPosition is usually supplied by the field the label will wrap, but
    it has its own property, and can be instantiated by itself.

    When a label is part of a Wui.FormField, it is accessible by the lbl property of the field.
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
                            size = $.isNumeric(size) ? size : me.labelSize;

                            // Clear out and reset the size of el padding
                            me.el.css({
                                paddingLeft:    '',
                                paddingRight:   '',
                                paddingTop:     '',
                                paddingBottom:  ''
                            });
                            // Clear out and reset the size of the label
                            me.label.css({
                                width:          '',
                                height:         '',
                                marginLeft:     '',
                                marginRight:    ''
                            });

                            if($.isNumeric(size)){
                                var margin = (dimension == 'height') ? 0 
                                                : (me.labelPosition == 'left') ? parseInt(me.label.css('margin-right')) 
                                                    : parseInt(me.label.css('margin-left')),
                                    dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width';
                                
                                me.el.css('padding-' + me.labelPosition, size);

                                // Chrome is not able to access the margin-right value and returns NaN. 
                                // It appears that IE is not able to either and returns 0, while FF returns 5.
                                if (isNaN(margin)) margin = 5; 

                                me.label.css(dimension, size - margin);
                                if(me.field)
                                    me.field.labelSize = me.labelSize = size;
                            }

                            me.adjustField();
                        },

    /** Adjusts the size of the field in case the size of the label overflows */
    adjustField:        function(){
                            var me = this, dimension = ($.inArray(me.labelPosition,['top','bottom']) >= 0) ? 'height' : 'width';
                            if(me.field && dimension == 'width' && me.label.outerHeight() > me.field.el.height()){
                                me.field.el.css('min-height', me.label.outerHeight());
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
    @event valchange When a value changes on a form field (event, WUI FormField, value, old value)
    @event hiddenchange Same as valchange but for fields without an 'el' property (like hidden fields. Called on the window (WUI FormField, value)
    
    Wui.FormField contains configs and methods that are common to all form elements. For 
    a form to interact properly with a field, it must be an instance of Wui.FormField. Vlidation
    is provided by the FormField ojbect, but can be overridden for specific needs in a given
    field. See the validate() documentaton for information about how to display custom error messages,
    validate with regular expressions, and write custom functions for validation.

    An input must be an instance of Wui.FormField for it to interact properly with a Wui form.
*/
Wui.FormField = function(args){
    $.extend(this,{
        /** Whether or not the field will be disabled. A disabled field is still accessible to the form, just not to the user. */
        disabled:       false,
        
        /** Message to display to the user when validation fails. If not specified the form will attempt to use the field's label. */
        invalidMsg:     null,
        
        /** An optional config that labels the field. */
        label:          null,
        
        /** Defines the position of the label relative to the field, options are 'top', 'left', 'right' and 'bottom' */
        labelPosition:  'top',
        
        /** A special class to put on the label if desired */
        labelCls:       null,

        /** A size (in pixels) for the label in its given relative position to the field - defaults defined in CSS */
        labelSize:      null,
        
        /** Whether or not the field is required. May be pre-empted by other validation. See validate() method. */
        required:       false,
        
        /** A regular expression whereby to validate a field's input. May be pre-empted by other validation. See validate() method. */
        validRegEx:     null,
        
        /** A function to validate field input. This function is passed the value of the field, for example: validTest: function(val){ return val == 3; } */
        validTest:      null
    },args);
};
Wui.FormField.prototype = $.extend(new Wui.O(),{
    /**
        @return The el of the object
        Runs immediately when the object is constructed. Wraps the field in a label if a label has been defined.
    */
    init:       function(){
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
    onRender:   function(){
                    if(this.disabled)                   this.disable();
                    if(this.hasOwnProperty('value'))    this.val(this.value,false);
                },

    /** Runs after the element has been placed on the DOM */
    afterRender:function(){ if(this.lbl)  this.lbl.adjustField(); },

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
    2. Character count (if applicable)
    3. The label on the field
    4. The name of the field
    5. Report that "A required field has an improper value."
    
    Then, validates a field using the following order of validation precedence:
    1. Custom testing function (validTest)
    2. Character count (maxChars - only applicable on Text and Textarea)
    3. Regular Expression (validRegEx)
    4. Required flag (required)
    5. No validation - returns true.
    
    Then sends the error message, if any, to the parent form's throwError() method where the invalidation messages are concatenated and the fields
    are hilighted for the user to see what fields need their attention.
    */
    validate:   function(){
                    var me = this,
                        v = me.val(),
                        fieldName = (me.label !== null ) ? me.label : (typeof me.name !== 'undefined') ? me.name : null,
                        errMsg = (me.invalidMsg !== null) ? me.invalidMsg : 
                                    (fieldName !== null) ? 'A value for \'' +fieldName+ '\' is required.' :
                                        "A required field has an improper value.";
                    
                    // If a custom test is defined 
                    if(me.validTest && typeof me.validTest == 'function')
                        if(me.validTest(v) === false)
                            return parentThrow();
                                            
                    // If maxChars is defined, this will be checked first
                    if($.isNumeric(me.maxChars)){
                        if(v && v.length > me.maxChars){
                            errMsg = (fieldName && $.trim(fieldName).length) ? 
                                        '\'' + fieldName + '\' must be less than ' +me.maxChars+ ' characters.' :
                                        'You have a field with too many characters in it, the max is ' +me.maxChars+ '.';
                            return parentThrow();
                        }
                    }

                    // If a regular expression is defined for a test, this will be tested first
                    if(me.validRegEx !== null)
                        if(!me.validRegEx.test($.trim(v)))
                            return parentThrow();
                                        
                    // If no regular expression test exists, test whether a value is required and throw an error if blank
                    if(me.required){
                        if(v === null || v === undefined)                   return parentThrow();
                        if(typeof v == 'string' && $.trim(v).length === 0)  return parentThrow();
                    } 
                    
                    function parentThrow(){
                        return (typeof me.parent.throwError !== 'undefined') ? me.parent.throwError(errMsg) : false;
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
    setChanged: function(oldVal){
                    var me = this, dn = (me.name) ? '.' + me.name : '';
                    // Marks the parent form as 'changed'
                    if(me.parent && me.parent instanceof Wui.Form)
                        me.parent.formChange(true, me);
                    
                    // Calls functionally defined valChange() - one will override another
                    me.valChange(me, me.value, oldVal);
                    
                    // Calls listeners for valchange - in the case of hidden fields calls 'hiddenchange'
                    if(me.el){
                        me.el.trigger($.Event('valchange'), [me, me.value, oldVal])
                            .trigger($.Event('valchange' + dn), [me, me.value, oldVal]);
                    }else{
                        if(me.parent && me.parent instanceof Wui.Form)
                            me.parent.el.trigger($.Event('hiddenchange'), [me, me.value, oldVal])
                                .trigger($.Event('hiddenchange' + dn), [me, me.value, oldVal]);
                    }
                },
    
    /** 
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    getVal:     function(){
                    return this.value;
                },
    
    /** 
    @param {string}    sv    Value to set the value of the field to
    @private
    Generally do not use this function. Use val() instead which acts as both a getter and a setter depending whether
    arguments are passed. val() will fire all of the needed events and event hooks.
    */
    setVal:     function(sv){
                    this.value = sv;
                },
    
    /** 
    @param {string}    newVal    New value being set on the field
    An event hook for when the value changes. Useful for extending objects, but generally use the 'valchange' event listener
    */
    valChange:  function(newVal){}
});


/** A Wui.FormField that is hidden on the DOM. */
Wui.Hidden = function(args){
    $.extend(this,{
        /** Only produces a DOM element for the sake of splicing */
        el:     $('<div>').hide()
    },args); 
    this.init();
};
Wui.Hidden.prototype = $.extend(new Wui.FormField(),{ init: function(){} });


/** WUI Text */
Wui.Text = function(args){
    $.extend(this,{
        /** A value that appears in the field until text is entered. (HTML 5 placeholder) */
        blankText:  '',

        /** When set to true, along with maxChars being defined, a character countdown will 
        be displayed on the field. */
        counter:    false,

        /** A maximum number of characters that can be entered into the field. Adding a number
        here adds validation for character count. */
        maxChars:   null
    },args,{
        /** The HTML element */
        field:      $('<input>').attr({type:'text'})
    }); 
    this.init();
};
Wui.Text.prototype = $.extend(new Wui.FormField(),{
    /** Runs immediately when the object is created */
    init:           function(){
                        var me = this;
                        Wui.FormField.prototype.init.call(me);
                        
                        if(me.blankText && me.blankText.length)    me.setBlankText(me.blankText);
                        
                        me.append(Wui.Text.prototype.setListeners.call(me,me));
                    },
                    
    /** 
    @param {string} bt  The value of the placeholder text for the field.
    @return The blank text that was passed in.
    Sets the blank text on the field. */
    setBlankText:   function(bt){
                        var me = this;
                        
                        me.blankText = bt;
                        me.field.attr('placeholder', bt);
                        
                        return bt;
                    },
                    
    /** 
    @param  {Wui Object}  t  The object to have listeners applied to the field
    Puts listeners on the field, mostly to handle blankText in the event that HTML 5 placeholder isn't supported 
    Also calls the setListeners() of any extending object automagically.

    The parameter (t) is automatically passed in to the setListeners method and
    represent the object. Listeners can be added to the field like this:

    t.field.blur([some function that will happen on blur.])

    Listeners can also be chained:

    t.field.blur(...).focus(...).click(...) 

    Unlike other functions in the WUI, if the field already has a setListeners method defined,
    there is no need to call the prototype to still get the functionality of the base method. If
    you desire to turn a particular listener off (though not recommended), this can be done with 
    tandard jQuery for turning a listener off:

    t.field.off('click');
    */
    setListeners:   function(t){
                        var me = this,
                            fieldState = null;
                        
                        t.field
                        .focusin(function(){ fieldState = me.field.val(); }) // Set fieldState (closure variable) to allow for comparison on blur
                        .blur(function(){ 
                            if(fieldState != me.field.val()){
                                me.val(); 
                                me.setChanged();
                            }
                        }); // Call val function so that valchange will be fired if needed

                        // Add a character counter
                        if($.isNumeric(t.maxChars) && t.counter === true){
                            t.append(t.charCounter = $('<div>').addClass('wui-char-counter'));
                            t.field.keyup(function(){
                                var initVal = (t.val()) ? t.maxChars - t.val().length : t.maxChars;
                                t.charCounter.text(initVal);
                                if(initVal >= 0)    t.charCounter.css('color','#333');
                                else                t.charCounter.css('color','#900');
                            });

                            t.field.keyup();
                        }
                        
                        if(this.setListeners !== Wui.Text.prototype.setListeners) this.setListeners(this);
                        return t.field;
                    },
    /** 
    @param {string}    sv    Value to set the field text to
    Changes the value of the text in the field without changing the value of the object
    */
    fieldText:      function(sv){
                        this.field.val(sv);
                    },
    getVal:         function(){ return (this.value = (this.field.val() && this.field.val().length) ? this.field.val() : null); },
    setVal:         function(sv){ 
                        this.fieldText(this.value = (sv && $.trim(sv).length) ? sv : null);
                    }
});


/** WUI Text Area */
Wui.Textarea = function(args){
    $.extend(this, { 
        /** The HTML element */
        field:  $('<textarea>'),
        
        /** Determines the height of the field */
        height: 80
    }, args);
    this.init();
};
Wui.Textarea.prototype = $.extend(new Wui.Text(), {
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me); 
                },

    /** Overrides Wui.O.cssByParam to include resizing the textarea within the object */
    cssByParam: function(){
                    Wui.O.prototype.cssByParam.apply(this,arguments);
                    var lblVert = (this.lbl && $.inArray(this.lbl.labelPosition,['top','bottom']) >= 0) ? this.lbl.label.outerHeight() : 0;
                    this.el.css({
                        height:     '',
                        minHeight:  (this.height)
                    });
                    this.field.css({
                        height:     '',
                        minHeight:  (this.height - lblVert)
                    }); 
                }
});


/** Creates a WYSIWYG (What You See Is What You Get) editor from a textfield.   
@author Stephen Nielsen
*/
Wui.Wysiwyg = function(args){
    $.extend(this,{
        css:        'body {' +
                        'color:#333;' + 
                        'font:90%  Arial, Verdana, Helvetica,sans-serif;' + 
                        'overflow:auto;' + 
                        'margin:0;' + 
                        'padding:0;' +
                    '}' +
                    'a {color:#09c; text-decoration:none;}' +
                    'a:hover {color:#0c9; text-decoration:underline;}',
        
        /** Whether or not to show the button that will give the user a view
        of the HTML generated by the WYSIWYG */
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
                    me.bold.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(e){ me.exec("bold"); });
                    me.italic.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("italic"); });
                    me.underline.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("underline"); });
                    me.strike.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("strikethrough"); });
                    me.link.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){
                        var r = me.previousRange;
                        if (r.htmlText){
                            me.exec("createLink", true);
                        }else{
                            var a = Wui.input(
                                "Link URL:",
                                function(link){
                                    me.exec("createLink", false, link);
                                    a.parent.closeOkay = true;
                                    a.parent.close();
                                },
                                'Insert Link',
                                [{  
                                    ftype:'Wui.Text',
                                    blankText:  'Use: \'http://...\'    or   \'/directory/page/etc...\' ',
                                    required:   true,
                                    invalidMsg: 'You need to have a properly formatted link with either an absolute or relative path.',
                                    testLink:   function(){ return this.validTest(this.field.val()); },
                                    validTest:  function(v) {
                                                    return (fullPath.test(v) || relativePath.test(v));
                                                },
                                    setListeners:function(t){
                                                    var me = this;

                                                    return me.field.on('blur click keyup keydown mousedown', function(e){
                                                        Wui.Link.prototype.buildOutput.call(me,{
                                                            uri:    me.field.val(),
                                                            target: '_blank',
                                                            title:  r.toString()
                                                        });
                                                    });
                                                }
                                }]
                            );
                            setTimeout(function(){ a.parent.modalEl.css('z-index',Wui.maxZ()); }, 100);
                        } 
                    });
                    me.unlink.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("unlink", false, []); });
                    me.ol.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("insertunorderedlist"); });
                    me.ul.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("insertorderedlist"); });
                    me.left.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyLeft"); });
                    me.center.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyCenter"); });
                    me.right.mousedown(function(){ me.previousRange = me.getRange(); }).click(function(){ me.exec("justifyRight"); });

                    // If the field is blank - add a space
                    if(!$(edit.body).children().length) me.exec('insertHTML',false,' ');

                    (me.elAlias || me.el).resizable();
                },
    exec:       function (a, b, c) {
                    this.iframe[0].contentWindow.focus();

                    if (this.previousRange) {
                        var rng = this.previousRange;
                        var sel = this.getSelection()
                        sel.removeAllRanges();
                        sel.addRange(rng);
                    }

                    this.editor.execCommand(a, b || false, c || null);
                },
    getRange:   function () {
                    var s = this.getSelection();
                    
                    if (!s)
                        return null;
                    if (s.getRangeAt && s.rangeCount > 0)
                        return s.getRangeAt(0);
                    if (s.createRange)
                        return s.createRange();

                    return null;
                },
    getSelection: function () {
                    if (this.editor.selection)
                        return this.editor.selection;
                    else
                        return this.iframe[0].contentDocument.defaultView.getSelection();
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
    /** Overrides WUI.FormField Set val to take the WYSIWYG editor into account */
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
        template:   '<li><input type="radio" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
    },args,{
        el:         $('<div>')
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
                    me.append(ul);
                },
    
    /** What to do when an individual element changes */
    elemChange:    function(elem){ this.val(elem.val()); },
    
    /** If buttonStyle = true, the actual radio input is hidden  */
    onRender:   function(){
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
        template:   '<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
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
                    var me = this;
                    if(me.options.length === 0) me.options.push({val:1,title:''});
                    
                    Wui.Radio.prototype.init.call(me);
                    me.el.removeClass('wui-radio').addClass('wui-checkbox');
                    
                    //steal label if there is only one option
                    if(me.options.length == 1){
                        if(!(me.label && me.label.length))
                            throw('Wui Forms - A Checkbox field ' + (me.name ? '(\'' + me.name + '\')' : '') + ' requires a label if it doesn\'t have options defined.');
                        me.el.find('li label').html(me.label);
                        me.lbl.label.html('');
                        me.el.css({paddingTop:0, paddingBottom:0});
                    }
                },
    getVal:     function(){ return this.calcVal(); },
    setVal:     function(sv){
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
    validTest:  function(){ if(this.required && this.val() === 0) return false;    return true; }
});


/** Creates a Combo box.  The Wui combo box can be presented in three general flavors depending on what configs are set:

1. Local Combo Box: Configs - data set in the object definition
2. Remote Search: Configs, url, [params], searchLocal = false
3. Pre-Loaded Remotely: Configs - url, [params], autoLoad = true

Pressing the following keys in the fields works as follows:
UP - Move focus to the previous item. If the menu is closed, the previous item in the menu is selected.
DOWN - Move focus to the next item. If the menu is closed, the next item in the menu is selected.
ESCAPE - Close the menu.
ENTER - Select the currently focused item and close the menu.
TAB - Select the currently focused item, close the menu, and move focus to the next focusable element.
*/
Wui.Combo = function(args){
    $.extend(this, {
        /** Whether to load remote elements the moment the combobox 
        is created, or wait to load remote elements until a search 
        value is entered. */
        autoLoad:   false,

        /** CSS class to place on the drop-down element. */
        ddCls:      '',

        /** Text to display in the drop-down when no results are returned. */
        emptyMsg:   'No Results.',

        /** The DOM element for the field */
        field:      $('<input>').attr({type:'text'}),
        
        /** Whether to filter results at all */
        filterField:true,

        /** When set to true, the field will be blanked out if an option from the drop down is not selected. */
        forceSelect:false,

        /** Minimum number of characters entered before the combo will 
        filter remotely. */
        minKeys:    1,

        /** The name of the search parameter that will be sent to the 
        server for remote filters. */
        searchArgName:'srch',

        /** Whether to filter the drop-down amidst the locally loaded 
        results or to go to the server. */
        searchLocal:true,

        /** Whether or not to show the drop-down button */
        showDD:     true,

        /** @required The key in the data that will be used for display 
        in the combo box. */
        titleItem:  null,

        /** @required The key in the data that will be used as the 
        value for the combo when an item is selected. */
        valueItem:  null
    },args,{
        /** Turns off the ability to select multiple items. 
        TODO: Revisit this one */
        multiSelect:false
    }); 

    // Create template when one hasn't been defined
    if( !(this.hasOwnProperty('template') && this.template !== null && this.template !== undefined) 
        && this.hasOwnProperty('valueItem') 
        && this.hasOwnProperty('titleItem') 
        && this.valueItem 
        && this.titleItem
    ){
        this.template = '<li>{' +this.titleItem+ '}</li>';
        this.noSpecifiedTemplate = true;
    }
    // Ensure that all required items are present
    if(!this.template) throw new Error('Wui.js - valueItem and titleItem, or template, are required configs for a Combo.');

    this.init(); 
};
Wui.Combo.prototype = $.extend(new Wui.FormField(), new Wui.DataList(), {
    /** Closes the drop-down menu. */
    close:      function(){ 
                    this._open = false;
                    this.dd.hide(); 
                },

    /** @param {string} srchVal    A search term
    Hilight text within the search results given the search term. Only works
    when there is not a custom template defined. */
    hilightText:function(srchVal){
                    var me = this;

                    me.dd.children().each(function(i,itm){
                        itm = $(itm);
                        var itmTxt = itm.text();

                        if(itmTxt.toUpperCase().indexOf(srchVal.toUpperCase()) >= 0 && me.noSpecifiedTemplate)  hilightText(itm).show();
                        else                                                                                    clearHilight(itm).hide();

                        function hilightText(obj){ return clearHilight(obj).html( obj.text().replace(new RegExp(srchVal,"ig"), function(m){ return "<span class='wui-highlight'>" +m+ "</span>"}) ); }
                        function clearHilight(obj){ return obj.find('.wui-highlight').each(function(){ $(this).replaceWith($(this).html()); }).end(); }
                    });

                    Wui.positionItem(me.field,me.dd);
                },

    /** Method that runs when the object is initiated */
    init:       function(){
                    var me = this;

                    // Set up object
                    Wui.FormField.prototype.init.call(me);
                    me.el.addClass('wui-combo ' + (me.idCls = Wui.id()));
                    me._open = false;
                    me.identity = me.valueItem;
                    if(typeof me.blankText !== 'undefined')
                        me.setBlankText(me.blankText);
                    

                    // Place field elements
                    me.append( me.wrapper = $('<div>').addClass('wui-combo').append(me.setListeners(me)) );
                    $('body').append( me.dd = $('<ul>').addClass('wui-combo-dd ' + me.ddCls) );

                    // Listeners - These listeners must stop propagation or else they
                    // will trigger events for their containing DataLists (like grids with
                    // combos in the tbar)
                    me.el.on({
                        wuichange:  function(evnt,combo,el,rec,selection){
                                        var text = (selection.length) ? rec[combo.titleItem] : combo.previous;
                                        Wui.Text.prototype.fieldText.call(me,text);
                                        evnt.stopPropagation();
                                    },
                        click:      function(evnt){ evnt.stopPropagation(); },
                        wuiselect:  function(evnt){ evnt.stopPropagation(); },
                        wuideselect:function(evnt){ evnt.stopPropagation(); },
                        datachanged:function(evnt){ evnt.stopPropagation(); },
                        wuidblclick:function(evnt){ evnt.stopPropagation(); }
                    });

                    // Create Dropdown Button
                    if(me.showDD){
                        me.ddSwitch = new Wui.Button({
                            click:      function(){
                                            if(me._open) me.close();
                                            else         me.open();
                                            me.field.focus();
                                        },
                            text:       '',
                            tabIndex:   -1,
                            appendTo:   me.wrapper,
                            cls:        'field-btn dd-switch'
                        });
                        me.ddSwitch.place();
                        me.ddSwitch.el.mousedown(function(){ me.isBlurring = false; });
                    }
                },

    /** Overrides the Wui.itemSelect and simplifies events for combo. */
    itemSelect: function(itm, silent){
                    var me = this, dn = (me.name) ? '.' + me.name : '';

                    me.dd.find('.wui-selected').removeClass('wui-selected');
                    itm.el.addClass('wui-selected');
                    me.selected = [itm];
                    
                    if(!me.multiSelect && !silent){
                        me.el.trigger($.Event('wuiselect'), [me, itm.el, itm.rec])
                            .trigger($.Event('wuichange'), [me, itm.el, itm.rec, me.selected]);
                    }
                    return itm;
                },

    /** Overrides the Wui.DataList make and adds listeners to objects. */    
    make:       function(){
                    var me = this;

                    me.elAlias = me.dd.empty().removeClass('wui-spinner');
                    Wui.DataList.prototype.make.apply(me,arguments);
                    if(me.data.length === 0)
                        me.elAlias.html(me.emptyMsg);

                    me.dd.children()
                    .off('click')
                    .bind('touchstart',function(evnt){ 
                        me.itemSelect($(this).data('itm')); 
                        me.isBlurring = false; 
                    }).on({
                        mouseenter: function(){ me.itemSelect($(this).data('itm')); },
                        mousedown:  function(){ me.isBlurring = false; },
                        click:      function(){ me.set(); me.field.focus(); }
                    });

                    if(me.previous && me.previous.length && me.noSpecifiedTemplate)
                        me.hilightText(me.previous);

                    me.dd.on('mousedown',function(){ me.isBlurring = false; });

                    // Select a pre-applied value if it exists
                    if(me.value && me.field.val().length == 0){
                        var selectedItm = me.selectBy(me.valueItem, me.value);
                        
                        if(!selectedItm)    me.notFound(me.value);
                        else                me.set();
                    }

                    Wui.positionItem(me.field,me.dd);
                },

    /** Overrides the Wui.DataList modifyItem to add data to the element. */ 
    modifyItem: function(itm){ return itm.el.data('itm',itm); },
    
    /**
    @param    {number or string} val The current value of the control
    Empty function meant to be overridden to handle cases where the value of
    the field is not in the list of possible values. Needs to call
    this.setData(data) where data is the value to load on the grid.
    */
    notFound:   function(val){},

    /** Loads data via the appropriate method when added to the DOM */
    afterRender:function(){
                    Wui.FormField.prototype.onRender.apply(this,arguments);

                    // Loads data per the method appropriate for the object
                    if(this.autoLoad && this.url !== null)  this.loadData();
                    else if(this.url === null)              this.make();
                },

    /** Opens the drop down */
    open:       function(){
                    var me = this, 
                        width = (me.field.innerWidth() < 100) ? 100 : me.field.innerWidth();

                    me._open = true;

                    // Clear the drop down when it loses focus
                    $(document).one('click','*:not(.' +me.idCls+ ' input)',function(evnt){ 
                        if(evnt.target !== me.field[0]) me.close(); 
                    });
                    $('body').append(me.dd.width(width).show());
                    Wui.positionItem(me.field,me.dd);
                    me.scrollToCurrent();
                },

    /** @param {string} srchVal    A search term
    Searches locally within the drop-down's data for the srchVal, otherwise 
    if searchLocal is false, the data is searched remotely. */
    searchData: function(srchVal){
                    var me = this, oldSearch = me.previous || undefined;

                    if(me.filterField){
                        me.previous = srchVal;
                        
                        if(me.searchLocal){
                            me.hilightText(srchVal);
                        }else{
                            me.clearSelect();
                            if((srchVal.length >= me.minKeys || srchVal.length === 0) && me.previous != oldSearch){
                                if(srchVal.length === 0)
                                    me.val(null);

                                // me.open();
                                me.dd.addClass('wui-spinner');

                                var srchParams = {};
                                srchParams[me.searchArgName] = srchVal;
                                me.loadData(srchParams);
                            }
                        }  
                    }
                },

    /**
    @param    {number} num Direction to go to select an ajacent value [1,-1]
    Selects the list item immediately before or after the currently selected item,
    works on the filtered visibility if the drop down is open.
    Overrides Wui.DataList.selectAjacent
    */
    selectAjacent:function(num){
                    var me = this,
                        selector = me._open ? ':visible' : '',
                        container = me.elAlias || me.el,
                        theEnd = (num == 1) ? ':first' : ':last',
                        fn = (num == 1) ? 'nextAll' : 'prevAll',
                        itm = me.selected.length ? me.selected[0].el[fn](selector+':first') : container.children(selector+theEnd);

                    return me.selectByEl(itm);
                },

    /** Sets the value of the drop down to the value of the selected item */
    set:        function(){
                    var me = this;

                    if(me.selected[0] && me.value != me.selected[0].rec)
                        me.val(me.selected[0].rec);
                    if(me._open)
                        me.close();
                },

    /** Sets blank text on the field */
    setBlankText:function(bt){ 
                    Wui.Text.prototype.setBlankText.apply(this,arguments); 
                },

    /** @param {Wui Object} t Wui Object to add listeners to its field.
    Sets listeners on the field that give it combo-box-like interactions */    
    setListeners:function(t){
                    // t = the combo field
                    return t.field.on({
                        keydown: function(evnt){
                            //clear the value if the user blanks out the field
                            if(t.field.val().length === 0) t.value = null;

                            switch(evnt.keyCode){
                                case 40:    evnt.preventDefault(); move(1);     break;  // downkey
                                case 38:    evnt.preventDefault(); move(-1);    break;  // upkey
                                case 9:     t.set();                            break;  //tab
                                case 27:                                                // escape
                                    evnt.preventDefault(); 
                                    t.field.val(t.previous);
                                    t.close();
                                break;
                            }
                            
                            evnt.stopPropagation();
                        },
                        keyup: function(evnt){
                            if(evnt.keyCode == 13){  // enter
                                evnt.preventDefault(); 
                                t.set();
                            }
                            evnt.stopPropagation();
                        },
                        input: function(evnt){
                            if(!t._open) t.open();
                            t.searchData(this.value);
                        },
                        focus: function(evnt){
                            t.isBlurring = undefined;
                            evnt.stopPropagation();
                        },
                        blur: function(evnt){
                            if(t.isBlurring !== false){
                                t.close();
                            }else{
                                // IE needs some time
                                setTimeout(function(){ t.field.focus(); }, 10);
                                // evnt.preventDefault();
                            }
                        }
                    });

                    function move(dir){
                        var itm = null;

                        if(t.selected.length){
                            var edgeSel = (dir == 1) ? ':last' : ':first',
                                selector = t._open ? ':visible' : '',
                                onEdge = (t.elAlias || t.el).children(selector+edgeSel)[0] == t.selected[0].el[0];

                            if(onEdge)  t.clearSelect();
                            else        itm = t.selectAjacent(dir);
                        }else{
                            itm = t.selectAjacent(dir);
                        }

                        // Actually change the value if the drop-down isn't open
                        if(!t._open){
                            if(itm !== null)    { t.set(); }
                            else                { t.val(null); t.field.val(t.previous); }
                        }
                    }
                },

    /** Allows the value to be set via a simple or complex value */
    setVal:     function(sv){
                    var me = this;

                    me.value = sv;

                    if(sv === null){
                        me.clearSelect();
                        return sv;
                    }else if(typeof sv == 'object'){
                        return me.selectBy(me.valueItem,sv[me.valueItem]);
                    }else{
                        return me.selectBy(me.valueItem,sv);
                    }
                },

    /** Returns only the simple value of an item */
    getVal:     function(){
                    return (this.value !== null && typeof this.value[this.valueItem] != 'undefined') ? this.value[this.valueItem] : this.value;
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
    buildOutput:function(v){
                    var me = this,
                        val = v || me.value;

                    if(me.outputFld === undefined)
                        me.append(me.outputFld = $('<div>').attr({tabindex:-1}).addClass('feedback'));

                    if(me.testLink()){
                        var tp = new Wui.Template({
                            data:       val, 
                            template:   '<span>Preview:</span> <a href="{uri}" target="{target}" '+
                                        'class="{((target == "_blank") ? "uri-new-win" : "")}">{title}</a>'
                        });
                        me.outputFld.html(tp.make());
                    }else{
                        if(val.uri && val.uri.length > 2)
                            me.outputFld.html('Your link is improperly formatted.');
                        else
                            me.outputFld.empty();
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
                            me.buildOutput.call(me);
                        })
                        .on('focus',null, itm, function(e){
                            $.each(flds,function(i,field){ field.el.removeClass('wui-link-focus'); });
                            e.data.el.addClass('wui-link-focus');
                        });
                    });
                },       
        
    /** Test for whether the link is a valid URL whether a full or relative path */
    testLink:   function isUrl() {
                    return (fullPath.test(this.value.uri) || relativePath.test(this.value.uri));
                },
                
    getVal:     function(){
                    return this.value;
                },
    setVal:     function(sv){
                    $.extend(this.value,sv);
                    this.urlField.val(this.value.uri);
                    this.titleField.val(this.value.title);
                    this.targetField.val(this.value.target);
                    this.buildOutput();
                },
    
    /** Overrides the Wui.FormField function and provides added validation */
    validTest:  function(){ if(this.required && !this.testLink()) return false; return true; }
});


/**
@event calupdate Fires on the document when the calendar redraws (initial appearance, or month change) and is namespaced to the name of the control ('calupdate.name'). Passes (event, datetime obj, calendar el, date)

The Datetime field allows the user to enter a date in any format 
they choose, as well as providing a date picker. When dates are 
changed, any time information is retained.

In order to eliminate data entry issues, feedback about whether 
the date was understood by the software is given instantly.

Dates can be entered in a variety of formats of which what is 
below is a very small sample:

"Five months after 9/20/2013"
"Yesterday"
"05/26/1983"
"2012-12-12"
"today at noon"
"tomorrow at five thirty pm"
"10-9-2013 5:30 PM"
"ten months from now"

* Borrowed from Date.js and tweaked a TON - See license below, and check out the full library if you're doing tons with dates
* Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
* License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
* Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
*/
Wui.Datetime = function(args){ 
    $.extend(this,args,{ 
        field:      $('<input>').attr({type:'text'}),

        /** The date furthest in the past that this control will accept as valid. */
        minDate:    null,

        /** The date furthest in the future that this control will accept as valid. */
        maxDate:    null
    });
    this.init();
};

// If date has already been extended, dont' attempt to extend it again
if(Wui.dateExt !== true){
    Wui.dateExt = true;
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
        
        isLeapYear:             function(year) {
                                    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
                                },
        getDaysInMonth:         function(year, month) {
                                    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                                },
        getTimezoneOffset:      function(s, dst) {
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
        getDaysInMonth: function() {
                            return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
                        },
        addMilliseconds:function(value) {
                            this.setMilliseconds(this.getMilliseconds() + value);
                            return this;
                        },
        addSeconds:     function(value) {
                            return this.addMilliseconds(value * 1000);
                        },
        addMinutes:     function(value) {
                            return this.addMilliseconds(value * 60000);
                        },
        addHours:        function(value) {
                            return this.addMilliseconds(value * 3600000);
                        },
        addDays:        Date.prototype.addDays = function(value) {
                            return this.addMilliseconds(value * 86400000);
                        },
        addWeeks:       function(value) {
                            return this.addMilliseconds(value * 604800000);
                        },
        addMonths:      function(value) {
                            var n = this.getDate();
                            this.setDate(1);
                            this.setMonth(this.getMonth() + value);
                            this.setDate(Math.min(n, this.getDaysInMonth()));
                            return this;
                        },
        addYears:       function(value) {
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
        getDayName:     function(abbrev) {
                            return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
                        },
        getMonthName:   function(abbrev) {
                            return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
                        },
        _toString:      Date.prototype.toString,
        toString:       function(format) {
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
}
/** End borrowing from date.js */

Wui.Datetime.prototype = $.extend(new Wui.Text(),{
    second:         1e3,
    minute:         6e4,
    hour:           36e5,
    day:            864e5,
    days:           ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'],
    shortDays:      ['sun','mon','tue','wed','thu','fri','sat'],
    months:         ['january','february','march','april','may','june','july','august','september','october','november','december'],
    shortMonths:    ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],
    
    /** Array of feedback words or phrases to randomly display when a user's input is not understood by the control */
    sarcasmArray:   ['Not quite.','Huh?','Nope','Arg..','Sorry','What?','Bleck.','Nuh-uh.','Keep Trying.','No Entiendo.'],
    
    /** String specifying the format that will be displayed to the user. */
    dispFormat:     'ddd MM-dd-yyyy h:mm tt',

    /** String for format of the date returned from the datepicker. */
    dtFormat:       'MM-dd-yyyy h:mm tt',

    /** When true, locks the datetime control to only deal in dates without times. If the user specifies custom values for dispFormat and dtFormat this setting has no effect. */
    dateOnly:       false,

    /**
    @param {string} overrideText    Text that will absolutely be displayed instead of the formatted version of the field's value
    @return The value passed in, or the calculated value of the datetime
    Give feedback to the end user about the data they entered. 
    */
    displayDate:    function(overrideText){
                        var me = this;
                        
                        // process current date value
                        if(overrideText !== undefined){ me.displayDiv.html(overrideText); return overrideText; }
                        if(me.value === '' || (!me.value)) { return null; }
                        
                        //validation for min and max
                        if(me.minDate && me.value < me.minDate)         me.displayDiv.html(me.value.toString(me.dtFormat) + ' is before the min date.');
                        else if (me.maxDate && me.value > me.maxDate)   me.displayDiv.html(me.maxDate.toString(me.dtFormat) + ' is past the max date.');
                        else                                            me.displayDiv.html(me.value.toString(me.dispFormat));
                        
                        return  me.value.toString(me.dtFormat);
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

                        // Limit field to dates only if specified
                        if(me.dateOnly){
                            if(!me.hasOwnProperty('dispFormat')) me.dispFormat = 'ddd MM-dd-yyyy';
                            if(!me.hasOwnProperty('dtFormat')) me.dtFormat = 'MM-dd-yyyy';
                        }

                        // Add datepicker
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
                                    me.calendar = me.makeCalendar(undefined,function(year,month,day){
                                        me.value = (me.validDate(me.value)) 
                                            ? new Date(year,month,day,me.value.getHours(),me.value.getMinutes()) 
                                            : new Date(year,month,day);
                                        me.val(me.displayDate());
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
                        $.each(numberRepl,function(i){
                            words = words.replace(new RegExp('(^|[ ]|-)' + i + '(-|[ ]|$)','g'),' ' + numberRepl[i] + ' ');
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
    makeCalendar:   function(dt,onSelect,controlVal){
                        var me = this,
                            today = new Date(),
                            controlVal = me.validDate(controlVal) ? controlVal : me.value,
                            calDate = dt || (me.validDate(controlVal) ? controlVal : today),
                            dn = (me.name) ? '.' + me.name : '',
                            calendar = $('<div>').addClass('wui-cal');

                        calendar.append(genHTML(calDate));
                        // Fire event for other controls to respond to calendar reflow
                        $(document).trigger($.Event('calupdate' + dn), [me, calendar, calDate]);
                        
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
                                    if (day <= monthLength && (i > 0 || j >= startingDay)){
                                        var dayDt = new Date(year,month,day),
                                            disableCls = ((me.minDate && dayDt < me.minDate) || me.maxDate && dayDt > me.maxDate) ? ' wui-cal-disabled' : '';
                                        
                                        html += '<a class="wui-cal-day' +disableCls+ '">' +(day++)+ '</a>';
                                    }
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
                                var dir = $(this).hasClass('wui-cal-prev') ? -1 : 1,
                                    newDt = new Date(year, month + dir, 1);

                                calendar.empty().append(genHTML(newDt));
                                // Fire event for other controls to respond to calendar reflow
                                $(document).trigger($.Event('calupdate' + dn), [me, calendar, newDt]);
                            });
                            
                            if(controlVal && controlVal.getMonth && controlVal.getMonth() == month && controlVal.getFullYear() == year)
                                tbl.find('a:contains(' +selectDy+ '):first').addClass('wui-selected');
                            
                            if(today.getMonth() == month && today.getFullYear() == year)
                                tbl.find('a:contains(' +today.getDate()+ '):first').addClass('wui-highlight');

                            tbl.find('td a:not(.wui-cal-disabled)').click(function(){
                                var dt = $(this),
                                    day = parseInt(dt.text()),
                                    info = dt.parents('[wui-month]'),
                                    month = parseInt(info.attr('wui-month')),
                                    year = parseInt(info.attr('wui-year'));

                                onSelect(year,month,day);

                                me.calendar.remove(); 
                                me.calendar = undefined;
                            });

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
                        return t.field.on('input', function(evnt){ t.processDate(); });
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
                        var me          = this,
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
                        var pos = 0, theNum = 0, currNum = 0, nextNum = 0, lastNum = 0, smallerThanNext = false;
                       
                        if(wArray.length == 1){
                            return wArray[0];
                        }else{
                            while(wArray[pos + 1] !== undefined){
                                currNum = parseInt(wArray[pos]);
                                nextNum = parseInt(wArray[pos + 1]);
                                smallerThanNext = this.getM(currNum) <= this.getM(nextNum);
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
                    
    setVal:         function(sv){
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
    validDate:      function(dt){
                        if (dt === null || typeof dt === 'undefined')  return false;
                        else if (typeof dt.getTime !== 'function')     return false;
                        else if(dt.toString() == 'Invalid Date')       return false;
                        
                        return true;
                    }
});

/**
@author Dan Perry (dan.perry@usurf.usu.edu)
An HTML5 file tool than can upload files via ajax.
To upload files via AJAX successfully, the form data must be processed with Wui.forAjaxFileUpload().
See the documentation of Wui.forAjaxFileUpload() for more information.

Because FileBasic can upload via AJAX, it doesn't require the tight server coupling that
Wui.File() does, and thus doesn't have to be extended to be immediately useful.
*/
Wui.FileBasic = function(args) {
    $.extend(this,{
        /** Sets the accept attribute on the html element */
        accept:     null,

        /** When set to true, allows the user to select multiple files to upload */
        multiple:   false,
        field:      $('<input>').attr({type:'file'})
    },args);
    this.init();
};

Wui.FileBasic.prototype = $.extend(new Wui.Text(), {
   init:    function(){
                var me = this;
                Wui.Text.prototype.init.call(me);
                me.append(me.field);

                if(me.multiple)
                    me.field.attr('multiple', true);

                if(me.accept && me.accept.length)
                    me.field.attr('accept', me.accept);
            },
    validTest:function(v){ 
                if(this.required) 
                    return v.length !== 0;

                return true;
            },
    getVal: function(){
                return this.field[0].files;
            },
    setVal: function(sv){
                if(sv == null)
                    this.field.val('');
            }
});


/**
@author Stephen Nielsen (stephen.nielsen@usurf.usu.edu)
Creates a form field for uploading files. By the nature of file uploads and their tight pairing 
to a backend server, this control must be extended itself to be used for uploading files.

Because Wui.FileBasic() can upload via AJAX, it doesn't require the tight server coupling that
Wui.File() does, and thus doesn't have to be extended to be immediately useful.
*/
Wui.File = function(args){ 
    $.extend(this,{
        /** @eventhook To perform any functionality before a file is uploaded @eventhook */
        beforeSubmit:   function(){},
        
        /** A value to send to the server where it will filter/block file uploads according to file type */
        fileTypeFilter: null,
        
        /** The name of the field that contains the file */
        upFieldName:    'fileupload',
        
        /** Additional parameters to send to the server besides the file*/
        params:         {},
        
        /** @eventhook To be performed when a file is successfully uploaded. @eventhook */
        upSuccess:      function(){},
        
        /** The server-side page where the file will be uploaded. */
        url:            '',
        
        /** The name of the parameter of the file title. */
        upTitleName:    'title'
    },args,{
        field:          $('<input>').attr({type:'text'})
    });
};
Wui.File.prototype = $.extend(new Wui.Text(),{
    /** Fires when the 'X' button is clicked to change the currently selected file to something else. */
    changeClick:function(){
                     //swap buttons
                     this.changeBtn.hide();
                     this.upBtn.show();
                     this.fileFrm.show();
                     this.field.removeClass().focus();
                },
    
    /** Set up the file upload control. */
    init:       function(){
                    var me = this;
                    Wui.Text.prototype.init.call(me);

                    // Wrap the field in order to add absolutely positioned buttons
                    me.append(me.wrapper = $('<div>').addClass('wui-file').append(me.field.off('blur')));
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
                            cls:        'file-change field-btn'
                        }),
                        me.upBtn = new Wui.Button({text:'Browse', cls:'field-btn', click:function(){ me.fileInput.click(); } }),
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
                        me.fileInput = $('<input>').attr({tabIndex:-1})
                        .attr({name:me.upFieldName, type:'file'})
                        .change(function(){ me.submit(); me.field.focus(); })
                    );
                },


    /** Submit the form */
    submit:     function() {
                    var me = this;

                    me.beforeSubmit();
                    
                    //add title to parameters and parameters to the file upload
                    me.params[me.upTitleName] = me.field.val();
                    
                    // for file filtering
                    if(me.fileTypeFilter !== null) me.params['file_type_filter'] = me.fileTypeFilter;

                    me.field.addClass('has-file uploading').attr('disabled', true).val('uploading...');
                    
                    // add additional paramters before sending
                    me.fileFrm.el.children("input[type!='file']").remove();
                    $.each(me.params, function(key, value) {
                        me.fileFrm.append($('<input>').attr({type:'hidden', name:key, value:value}));
                    });
                    
                    // Submit the actual form
                    me.fileFrm.el.submit(); 
                    
                    // Do something after we are finished uploading
                    me.iframe.el.unbind().load(function() {
                        me.onComplete($('body',me.iframe.el.contents()).text()); //done :D
                    });
                },

    /**
    @param {object} unwrapped The Wui.unwrapData unwrapped results of the file upload.
    This function is for developers to run whatever analysis they desire on the raw output of the file upload.
    @eventhook
    */
    devHook:    function(){},

    /** Fires when the file upload completes and handles errors if any. */            
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
                                me.fieldText('');
                            }else{
                                me.upFailure(d);
                            }
                        }
                    }catch(err){
                        console.log('Upload Error',err,r);
                        me.upFailure(err,r);
                    }
                },

    /** @eventhook Signals the user that there was an upload failure. Can be overridden, but doesn't have to be.*/
    upFailure:  function(e,e2){
                    console.log('Upload Failure',e,e2);
                    this.fieldText('Upload Failure');
                },
    
    /** @return The value of the field, or an empty object is returned. */
    getVal:     function(){ return this.value || {}; },
    
    /** Overrides Wui.FormField.setVal() to work with the file field. @return The value passed in. */
    setVal:     function(sv){
                    this.value = this.value || {};
                    $.extend(this.value,sv);
                    return sv;
                },
    
    /**  Adds callback functionality to Wui.FormField.val() */
    val:        function(sv,callback){
                    var retVal = Wui.FormField.prototype.val.apply(this,arguments);
                    if(this[callback] && typeof this[callback] == 'function') this[callback]();
                    return retVal;
                },
    
    /** Overrides Wui.FormField.valChange, performs similar fuctionality, but adds specific code for showing/hiding buttons. */
    valChange:  function(){
                    var me = this;
                    if(me.value){
                        me.field.addClass('has-file').removeAttr('disabled');
                        me.upBtn.hide();
                        me.fileFrm.hide();
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
@return The Wui.Form that was created by the input. Use the returned value .parent to get the window.

Presents a WUI Form in a modal window.  In its simplest form, just passing in a single 'msg' string will present a window with a text field and the 'msg' as a label for the field. 
The example source contains various configurations: Basic, Input with Title, Input with a single replacement, and a full form.
*/
Wui.input = function(msg, callback, msgTitle, inputs, content){
    // make sure the inputs will be acceptable on the form
    if(inputs){
        if(!inputs.length){
            if(inputs instanceof Wui.FormField || inputs.ftype) inputs = [inputs];
            else                                                inputs = [{ftype:'Wui.Text'}];
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
                            new Wui.Button({text:'Cancel', click:function(){ Msg.closeOkay = true; Msg.close(); }}),
                            new Wui.Button({text:'Submit', click:function(){ Msg.getVal(); }})
            ],
            isModal:    true,
            items:      [inputFrm],
            cls:        'wui-input-window',
            width:      600,
            getVal:     function(){
                            var formData = inputFrm.getData();
                            if(formData){
                                if(callback && typeof callback == 'function'){
                                    var len = Wui.getKeys(formData).length,
                                        cbkResult = callback((len == 1 && formData.inputField) ? formData.inputField : formData);
                                    Msg.closeOkay = (callback === undefined) ? true : cbkResult;
                                }else{
                                    Msg.closeOkay = true;
                                }
                            }
                        },
            onWinClose: function(){ return ((Msg.closeOkay !== true) ? false : Msg.closeOkay); }
        });
    Msg.header.splice(0,1);
    return inputFrm;
};

})(jQuery,Wui);