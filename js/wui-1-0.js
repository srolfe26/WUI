/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);

/*! jQuery UI - v1.9.2 - 2012-11-26 http://jqueryui.com Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.sortable.js, jquery.ui.datepicker.js */

(function(e,t){function i(t,n){var r,i,o,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap=#"+i+"]")[0],!!o&&s(o))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().andSelf().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var n=0,r=/^ui-id-\d+$/;e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t=="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus(),n&&n.call(r)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"),10);if(!isNaN(s)&&s!==0)return s}r=r.parent()}}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&i(t,!r)}}),e(function(){var t=document.body,n=t.appendChild(n=document.createElement("div"));n.offsetHeight,e.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),e.support.minHeight=n.offsetHeight===100,e.support.selectstart="onselectstart"in n,t.removeChild(n).style.display="none"}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),function(){var t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];e.ui.ie=t.length?!0:!1,e.ui.ie6=parseFloat(t[1],10)===6}(),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(!i||!e.element[0].parentNode||e.element[0].parentNode.nodeType===11)return;for(r=0;r<i.length;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},contains:e.contains,hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return!1;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)},isOverAxis:function(e,t,n){return e>t&&e<t+n},isOver:function(t,n,r,i,s,o){return e.ui.isOverAxis(t,r,s)&&e.ui.isOverAxis(n,i,o)}})})(jQuery);(function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a=t.split(".")[0];t=t.split(".")[1],i=a+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[a]=e[a]||{},s=e[a][t],o=e[a][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,i){e.isFunction(i)&&(r[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},r=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=r,s=i.apply(this,arguments),this._super=t,this._superApply=n,s}}())}),o.prototype=e.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix:t},r,{constructor:o,namespace:a,widgetName:t,widgetBaseClass:i,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o)},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName||n;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():e.data(this,s,new i(o,this))}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetName,this),e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,n,r){var i,s=this;typeof t!="boolean"&&(r=n,n=t,t=!1),r?(n=i=e(n),this.bindings=this.bindings.add(n)):(r=n,n=this.element,i=this.widget()),e.each(r,function(r,o){function u(){if(!t&&(s.options.disabled===!0||e(this).hasClass("ui-state-disabled")))return;return(typeof o=="string"?s[o]:o).apply(s,arguments)}typeof o!="string"&&(u.guid=o.guid=o.guid||u.guid||e.guid++);var a=r.match(/^(\w+)\s*(.*)$/),f=a[1]+s.eventNamespace,l=a[2];l?i.delegate(l,f,u):n.bind(f,u)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&(e.effects.effect[u]||e.uiBackCompat!==!1&&e.effects[u])?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}}),e.uiBackCompat!==!1&&(e.Widget.prototype._getCreateOptions=function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]})})(jQuery);(function(e,t){var n=!1;e(document).mouseup(function(e){n=!1}),e.widget("ui.mouse",{version:"1.9.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){if(!0===e.data(n.target,t.widgetName+".preventClickEvent"))return e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(n)return;this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var r=this,i=t.which===1,s=typeof this.options.cancel=="string"&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;if(!i||s||!this._mouseCapture(t))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){r.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)){this._mouseStarted=this._mouseStart(t)!==!1;if(!this._mouseStarted)return t.preventDefault(),!0}return!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return r._mouseMove(e)},this._mouseUpDelegate=function(e){return r._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),n=!0,!0},_mouseMove:function(t){return!e.ui.ie||document.documentMode>=9||!!t.button?this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted):this._mouseUp(t)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(e){return this.mouseDelayMet},_mouseStart:function(e){},_mouseDrag:function(e){},_mouseStop:function(e){},_mouseCapture:function(e){return!0}})})(jQuery);(function(e,t){e.widget("ui.draggable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var n=this.options;return this.helper||n.disabled||e(t.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(t),this.handle?(e(n.iframeFix===!0?"iframe":n.iframeFix).each(function(){e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var n=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,n.cursorAt&&this._adjustOffsetFromHelper(n.cursorAt),n.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,n){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute");if(!n){var r=this._uiHash();if(this._trigger("drag",t,r)===!1)return this._mouseUp({}),!1;this.position=r.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var n=!1;e.ui.ddmanager&&!this.options.dropBehaviour&&(n=e.ui.ddmanager.drop(this,t)),this.dropped&&(n=this.dropped,this.dropped=!1);var r=this.element[0],i=!1;while(r&&(r=r.parentNode))r==document&&(i=!0);if(!i&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!n||this.options.revert=="valid"&&n||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,n)){var s=this;e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()})}else this._trigger("stop",t)!==!1&&this._clear();return!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){var n=!this.options.handle||!e(this.options.handle,this.element).length?!0:!1;return e(this.options.handle,this.element).find("*").andSelf().each(function(){this==t.target&&(n=!0)}),n},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t])):n.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return r.parents("body").length||r.appendTo(n.appendTo=="parent"?this.element[0].parentNode:n.appendTo),r[0]!=this.element[0]&&!/(fixed|absolute)/.test(r.css("position"))&&r.css("position","absolute"),r},_adjustOffsetFromHelper:function(t){typeof t=="string"&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&e.ui.ie)t={top:0,left:0};return{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;t.containment=="parent"&&(t.containment=this.helper[0].parentNode);if(t.containment=="document"||t.containment=="window")this.containment=[t.containment=="document"?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t.containment=="document"?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(t.containment=="document"?0:e(window).scrollLeft())+e(t.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(t.containment=="document"?0:e(window).scrollTop())+(e(t.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(t.containment)&&t.containment.constructor!=Array){var n=e(t.containment),r=n[0];if(!r)return;var i=n.offset(),s=e(r).css("overflow")!="hidden";this.containment=[(parseInt(e(r).css("borderLeftWidth"),10)||0)+(parseInt(e(r).css("paddingLeft"),10)||0),(parseInt(e(r).css("borderTopWidth"),10)||0)+(parseInt(e(r).css("paddingTop"),10)||0),(s?Math.max(r.scrollWidth,r.offsetWidth):r.offsetWidth)-(parseInt(e(r).css("borderLeftWidth"),10)||0)-(parseInt(e(r).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(s?Math.max(r.scrollHeight,r.offsetHeight):r.offsetHeight)-(parseInt(e(r).css("borderTopWidth"),10)||0)-(parseInt(e(r).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=n}else t.containment.constructor==Array&&(this.containment=t.containment)},_convertPositionTo:function(t,n){n||(n=this.position);var r=t=="absolute"?1:-1,i=this.options,s=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():o?0:s.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*r}},_generatePosition:function(t){var n=this.options,r=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,i=/(html|body)/i.test(r[0].tagName),s=t.pageX,o=t.pageY;if(this.originalPosition){var u;if(this.containment){if(this.relative_container){var a=this.relative_container.offset();u=[this.containment[0]+a.left,this.containment[1]+a.top,this.containment[2]+a.left,this.containment[3]+a.top]}else u=this.containment;t.pageX-this.offset.click.left<u[0]&&(s=u[0]+this.offset.click.left),t.pageY-this.offset.click.top<u[1]&&(o=u[1]+this.offset.click.top),t.pageX-this.offset.click.left>u[2]&&(s=u[2]+this.offset.click.left),t.pageY-this.offset.click.top>u[3]&&(o=u[3]+this.offset.click.top)}if(n.grid){var f=n.grid[1]?this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1]:this.originalPageY;o=u?f-this.offset.click.top<u[1]||f-this.offset.click.top>u[3]?f-this.offset.click.top<u[1]?f+n.grid[1]:f-n.grid[1]:f:f;var l=n.grid[0]?this.originalPageX+Math.round((s-this.originalPageX)/n.grid[0])*n.grid[0]:this.originalPageX;s=u?l-this.offset.click.left<u[0]||l-this.offset.click.left>u[2]?l-this.offset.click.left<u[0]?l+n.grid[0]:l-n.grid[0]:l:l}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():i?0:r.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:r.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,n,r){return r=r||this._uiHash(),e.ui.plugin.call(this,t,[n,r]),t=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,n,r)},plugins:{},_uiHash:function(e){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,n){var r=e(this).data("draggable"),i=r.options,s=e.extend({},n,{item:r.element});r.sortables=[],e(i.connectToSortable).each(function(){var n=e.data(this,"sortable");n&&!n.options.disabled&&(r.sortables.push({instance:n,shouldRevert:n.options.revert}),n.refreshPositions(),n._trigger("activate",t,s))})},stop:function(t,n){var r=e(this).data("draggable"),i=e.extend({},n,{item:r.element});e.each(r.sortables,function(){this.instance.isOver?(this.instance.isOver=0,r.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,r.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,i))})},drag:function(t,n){var r=e(this).data("draggable"),i=this,s=function(t){var n=this.offset.click.top,r=this.offset.click.left,i=this.positionAbs.top,s=this.positionAbs.left,o=t.height,u=t.width,a=t.top,f=t.left;return e.ui.isOver(i+n,s+r,a,f,o,u)};e.each(r.sortables,function(s){var o=!1,u=this;this.instance.positionAbs=r.positionAbs,this.instance.helperProportions=r.helperProportions,this.instance.offset.click=r.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(o=!0,e.each(r.sortables,function(){return this.instance.positionAbs=r.positionAbs,this.instance.helperProportions=r.helperProportions,this.instance.offset.click=r.offset.click,this!=u&&this.instance._intersectsWith(this.instance.containerCache)&&e.ui.contains(u.instance.element[0],this.instance.element[0])&&(o=!1),o})),o?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return n.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=r.offset.click.top,this.instance.offset.click.left=r.offset.click.left,this.instance.offset.parent.left-=r.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=r.offset.parent.top-this.instance.offset.parent.top,r._trigger("toSortable",t),r.dropped=this.instance.element,r.currentItem=r.element,this.instance.fromOutside=r),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),r._trigger("fromSortable",t),r.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,n){var r=e("body"),i=e(this).data("draggable").options;r.css("cursor")&&(i._cursor=r.css("cursor")),r.css("cursor",i.cursor)},stop:function(t,n){var r=e(this).data("draggable").options;r._cursor&&e("body").css("cursor",r._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,n){var r=e(n.helper),i=e(this).data("draggable").options;r.css("opacity")&&(i._opacity=r.css("opacity")),r.css("opacity",i.opacity)},stop:function(t,n){var r=e(this).data("draggable").options;r._opacity&&e(n.helper).css("opacity",r._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(t,n){var r=e(this).data("draggable");r.scrollParent[0]!=document&&r.scrollParent[0].tagName!="HTML"&&(r.overflowOffset=r.scrollParent.offset())},drag:function(t,n){var r=e(this).data("draggable"),i=r.options,s=!1;if(r.scrollParent[0]!=document&&r.scrollParent[0].tagName!="HTML"){if(!i.axis||i.axis!="x")r.overflowOffset.top+r.scrollParent[0].offsetHeight-t.pageY<i.scrollSensitivity?r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop+i.scrollSpeed:t.pageY-r.overflowOffset.top<i.scrollSensitivity&&(r.scrollParent[0].scrollTop=s=r.scrollParent[0].scrollTop-i.scrollSpeed);if(!i.axis||i.axis!="y")r.overflowOffset.left+r.scrollParent[0].offsetWidth-t.pageX<i.scrollSensitivity?r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft+i.scrollSpeed:t.pageX-r.overflowOffset.left<i.scrollSensitivity&&(r.scrollParent[0].scrollLeft=s=r.scrollParent[0].scrollLeft-i.scrollSpeed)}else{if(!i.axis||i.axis!="x")t.pageY-e(document).scrollTop()<i.scrollSensitivity?s=e(document).scrollTop(e(document).scrollTop()-i.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<i.scrollSensitivity&&(s=e(document).scrollTop(e(document).scrollTop()+i.scrollSpeed));if(!i.axis||i.axis!="y")t.pageX-e(document).scrollLeft()<i.scrollSensitivity?s=e(document).scrollLeft(e(document).scrollLeft()-i.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<i.scrollSensitivity&&(s=e(document).scrollLeft(e(document).scrollLeft()+i.scrollSpeed))}s!==!1&&e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(r,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,n){var r=e(this).data("draggable"),i=r.options;r.snapElements=[],e(i.snap.constructor!=String?i.snap.items||":data(draggable)":i.snap).each(function(){var t=e(this),n=t.offset();this!=r.element[0]&&r.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:n.top,left:n.left})})},drag:function(t,n){var r=e(this).data("draggable"),i=r.options,s=i.snapTolerance,o=n.offset.left,u=o+r.helperProportions.width,a=n.offset.top,f=a+r.helperProportions.height;for(var l=r.snapElements.length-1;l>=0;l--){var c=r.snapElements[l].left,h=c+r.snapElements[l].width,p=r.snapElements[l].top,d=p+r.snapElements[l].height;if(!(c-s<o&&o<h+s&&p-s<a&&a<d+s||c-s<o&&o<h+s&&p-s<f&&f<d+s||c-s<u&&u<h+s&&p-s<a&&a<d+s||c-s<u&&u<h+s&&p-s<f&&f<d+s)){r.snapElements[l].snapping&&r.options.snap.release&&r.options.snap.release.call(r.element,t,e.extend(r._uiHash(),{snapItem:r.snapElements[l].item})),r.snapElements[l].snapping=!1;continue}if(i.snapMode!="inner"){var v=Math.abs(p-f)<=s,m=Math.abs(d-a)<=s,g=Math.abs(c-u)<=s,y=Math.abs(h-o)<=s;v&&(n.position.top=r._convertPositionTo("relative",{top:p-r.helperProportions.height,left:0}).top-r.margins.top),m&&(n.position.top=r._convertPositionTo("relative",{top:d,left:0}).top-r.margins.top),g&&(n.position.left=r._convertPositionTo("relative",{top:0,left:c-r.helperProportions.width}).left-r.margins.left),y&&(n.position.left=r._convertPositionTo("relative",{top:0,left:h}).left-r.margins.left)}var b=v||m||g||y;if(i.snapMode!="outer"){var v=Math.abs(p-a)<=s,m=Math.abs(d-f)<=s,g=Math.abs(c-o)<=s,y=Math.abs(h-u)<=s;v&&(n.position.top=r._convertPositionTo("relative",{top:p,left:0}).top-r.margins.top),m&&(n.position.top=r._convertPositionTo("relative",{top:d-r.helperProportions.height,left:0}).top-r.margins.top),g&&(n.position.left=r._convertPositionTo("relative",{top:0,left:c}).left-r.margins.left),y&&(n.position.left=r._convertPositionTo("relative",{top:0,left:h-r.helperProportions.width}).left-r.margins.left)}!r.snapElements[l].snapping&&(v||m||g||y||b)&&r.options.snap.snap&&r.options.snap.snap.call(r.element,t,e.extend(r._uiHash(),{snapItem:r.snapElements[l].item})),r.snapElements[l].snapping=v||m||g||y||b}}}),e.ui.plugin.add("draggable","stack",{start:function(t,n){var r=e(this).data("draggable").options,i=e.makeArray(e(r.stack)).sort(function(t,n){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(n).css("zIndex"),10)||0)});if(!i.length)return;var s=parseInt(i[0].style.zIndex)||0;e(i).each(function(e){this.style.zIndex=s+e}),this[0].style.zIndex=s+i.length}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,n){var r=e(n.helper),i=e(this).data("draggable").options;r.css("zIndex")&&(i._zIndex=r.css("zIndex")),r.css("zIndex",i.zIndex)},stop:function(t,n){var r=e(this).data("draggable").options;r._zIndex&&e(n.helper).css("zIndex",r._zIndex)}})})(jQuery);(function(e,t){e.widget("ui.droppable",{version:"1.9.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var t=this.options,n=t.accept;this.isover=0,this.isout=1,this.accept=e.isFunction(n)?n:function(e){return e.is(n)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},e.ui.ddmanager.droppables[t.scope]=e.ui.ddmanager.droppables[t.scope]||[],e.ui.ddmanager.droppables[t.scope].push(this),t.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];for(var n=0;n<t.length;n++)t[n]==this&&t.splice(n,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,n){t=="accept"&&(this.accept=e.isFunction(n)?n:function(e){return e.is(n)}),e.Widget.prototype._setOption.apply(this,arguments)},_activate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),n&&this._trigger("activate",t,this.ui(n))},_deactivate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),n&&this._trigger("deactivate",t,this.ui(n))},_over:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]==this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(n)))},_out:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]==this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(n)))},_drop:function(t,n){var r=n||e.ui.ddmanager.current;if(!r||(r.currentItem||r.element)[0]==this.element[0])return!1;var i=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var t=e.data(this,"droppable");if(t.options.greedy&&!t.options.disabled&&t.options.scope==r.options.scope&&t.accept.call(t.element[0],r.currentItem||r.element)&&e.ui.intersect(r,e.extend(t,{offset:t.element.offset()}),t.options.tolerance))return i=!0,!1}),i?!1:this.accept.call(this.element[0],r.currentItem||r.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(r)),this.element):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(t,n,r){if(!n.offset)return!1;var i=(t.positionAbs||t.position.absolute).left,s=i+t.helperProportions.width,o=(t.positionAbs||t.position.absolute).top,u=o+t.helperProportions.height,a=n.offset.left,f=a+n.proportions.width,l=n.offset.top,c=l+n.proportions.height;switch(r){case"fit":return a<=i&&s<=f&&l<=o&&u<=c;case"intersect":return a<i+t.helperProportions.width/2&&s-t.helperProportions.width/2<f&&l<o+t.helperProportions.height/2&&u-t.helperProportions.height/2<c;case"pointer":var h=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,p=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,d=e.ui.isOver(p,h,l,a,n.proportions.height,n.proportions.width);return d;case"touch":return(o>=l&&o<=c||u>=l&&u<=c||o<l&&u>c)&&(i>=a&&i<=f||s>=a&&s<=f||i<a&&s>f);default:return!1}},e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,n){var r=e.ui.ddmanager.droppables[t.options.scope]||[],i=n?n.type:null,s=(t.currentItem||t.element).find(":data(droppable)").andSelf();e:for(var o=0;o<r.length;o++){if(r[o].options.disabled||t&&!r[o].accept.call(r[o].element[0],t.currentItem||t.element))continue;for(var u=0;u<s.length;u++)if(s[u]==r[o].element[0]){r[o].proportions.height=0;continue e}r[o].visible=r[o].element.css("display")!="none";if(!r[o].visible)continue;i=="mousedown"&&r[o]._activate.call(r[o],n),r[o].offset=r[o].element.offset(),r[o].proportions={width:r[o].element[0].offsetWidth,height:r[o].element[0].offsetHeight}}},drop:function(t,n){var r=!1;return e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance)&&(r=this._drop.call(this,n)||r),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,n))}),r},dragStart:function(t,n){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)})},drag:function(t,n){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,n),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var r=e.ui.intersect(t,this,this.options.tolerance),i=!r&&this.isover==1?"isout":r&&this.isover==0?"isover":null;if(!i)return;var s;if(this.options.greedy){var o=this.options.scope,u=this.element.parents(":data(droppable)").filter(function(){return e.data(this,"droppable").options.scope===o});u.length&&(s=e.data(u[0],"droppable"),s.greedyChild=i=="isover"?1:0)}s&&i=="isover"&&(s.isover=0,s.isout=1,s._out.call(s,n)),this[i]=1,this[i=="isout"?"isover":"isout"]=0,this[i=="isover"?"_over":"_out"].call(this,n),s&&i=="isout"&&(s.isout=0,s.isover=1,s._over.call(s,n))})},dragStop:function(t,n){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)}}})(jQuery);(function(e,t){e.widget("ui.resizable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var t=this,n=this.options;this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!n.aspectRatio,aspectRatio:n.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:n.helper||n.ghost||n.animate?n.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=n.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var r=this.handles.split(",");this.handles={};for(var i=0;i<r.length;i++){var s=e.trim(r[i]),o="ui-resizable-"+s,u=e('<div class="ui-resizable-handle '+o+'"></div>');u.css({zIndex:n.zIndex}),"se"==s&&u.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(u)}}this._renderAxis=function(t){t=t||this.element;for(var n in this.handles){this.handles[n].constructor==String&&(this.handles[n]=e(this.handles[n],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var r=e(this.handles[n],this.element),i=0;i=/sw|ne|nw|se|n|s/.test(n)?r.outerHeight():r.outerWidth();var s=["padding",/ne|nw|n/.test(n)?"Top":/se|sw|s/.test(n)?"Bottom":/^e$/.test(n)?"Right":"Left"].join("");t.css(s,i),this._proportionallyResize()}if(!e(this.handles[n]).length)continue}},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!t.resizing){if(this.className)var e=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);t.axis=e&&e[1]?e[1]:"se"}}),n.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){if(n.disabled)return;e(this).removeClass("ui-resizable-autohide"),t._handles.show()}).mouseleave(function(){if(n.disabled)return;t.resizing||(e(this).addClass("ui-resizable-autohide"),t._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){t(this.element);var n=this.element;this.originalElement.css({position:n.css("position"),width:n.outerWidth(),height:n.outerHeight(),top:n.css("top"),left:n.css("left")}).insertAfter(n),n.remove()}return this.originalElement.css("resize",this.originalResizeStyle),t(this.originalElement),this},_mouseCapture:function(t){var n=!1;for(var r in this.handles)e(this.handles[r])[0]==t.target&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var r=this.options,i=this.element.position(),s=this.element;this.resizing=!0,this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()},(s.is(".ui-draggable")||/absolute/.test(s.css("position")))&&s.css({position:"absolute",top:i.top,left:i.left}),this._renderProxy();var o=n(this.helper.css("left")),u=n(this.helper.css("top"));r.containment&&(o+=e(r.containment).scrollLeft()||0,u+=e(r.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:o,top:u},this.size=this._helper?{width:s.outerWidth(),height:s.outerHeight()}:{width:s.width(),height:s.height()},this.originalSize=this._helper?{width:s.outerWidth(),height:s.outerHeight()}:{width:s.width(),height:s.height()},this.originalPosition={left:o,top:u},this.sizeDiff={width:s.outerWidth()-s.width(),height:s.outerHeight()-s.height()},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio=typeof r.aspectRatio=="number"?r.aspectRatio:this.originalSize.width/this.originalSize.height||1;var a=e(".ui-resizable-"+this.axis).css("cursor");return e("body").css("cursor",a=="auto"?this.axis+"-resize":a),s.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(e){var t=this.helper,n=this.options,r={},i=this,s=this.originalMousePosition,o=this.axis,u=e.pageX-s.left||0,a=e.pageY-s.top||0,f=this._change[o];if(!f)return!1;var l=f.apply(this,[e,u,a]);this._updateVirtualBoundaries(e.shiftKey);if(this._aspectRatio||e.shiftKey)l=this._updateRatio(l,e);return l=this._respectSize(l,e),this._propagate("resize",e),t.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",e,this.ui()),!1},_mouseStop:function(t){this.resizing=!1;var n=this.options,r=this;if(this._helper){var i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),o=s&&e.ui.hasScroll(i[0],"left")?0:r.sizeDiff.height,u=s?0:r.sizeDiff.width,a={width:r.helper.width()-u,height:r.helper.height()-o},f=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,l=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;n.animate||this.element.css(e.extend(a,{top:l,left:f})),r.helper.height(r.size.height),r.helper.width(r.size.width),this._helper&&!n.animate&&this._proportionallyResize()}return e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t=this.options,n,i,s,o,u;u={minWidth:r(t.minWidth)?t.minWidth:0,maxWidth:r(t.maxWidth)?t.maxWidth:Infinity,minHeight:r(t.minHeight)?t.minHeight:0,maxHeight:r(t.maxHeight)?t.maxHeight:Infinity};if(this._aspectRatio||e)n=u.minHeight*this.aspectRatio,s=u.minWidth/this.aspectRatio,i=u.maxHeight*this.aspectRatio,o=u.maxWidth/this.aspectRatio,n>u.minWidth&&(u.minWidth=n),s>u.minHeight&&(u.minHeight=s),i<u.maxWidth&&(u.maxWidth=i),o<u.maxHeight&&(u.maxHeight=o);this._vBoundaries=u},_updateCache:function(e){var t=this.options;this.offset=this.helper.offset(),r(e.left)&&(this.position.left=e.left),r(e.top)&&(this.position.top=e.top),r(e.height)&&(this.size.height=e.height),r(e.width)&&(this.size.width=e.width)},_updateRatio:function(e,t){var n=this.options,i=this.position,s=this.size,o=this.axis;return r(e.height)?e.width=e.height*this.aspectRatio:r(e.width)&&(e.height=e.width/this.aspectRatio),o=="sw"&&(e.left=i.left+(s.width-e.width),e.top=null),o=="nw"&&(e.top=i.top+(s.height-e.height),e.left=i.left+(s.width-e.width)),e},_respectSize:function(e,t){var n=this.helper,i=this._vBoundaries,s=this._aspectRatio||t.shiftKey,o=this.axis,u=r(e.width)&&i.maxWidth&&i.maxWidth<e.width,a=r(e.height)&&i.maxHeight&&i.maxHeight<e.height,f=r(e.width)&&i.minWidth&&i.minWidth>e.width,l=r(e.height)&&i.minHeight&&i.minHeight>e.height;f&&(e.width=i.minWidth),l&&(e.height=i.minHeight),u&&(e.width=i.maxWidth),a&&(e.height=i.maxHeight);var c=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,p=/sw|nw|w/.test(o),d=/nw|ne|n/.test(o);f&&p&&(e.left=c-i.minWidth),u&&p&&(e.left=c-i.maxWidth),l&&d&&(e.top=h-i.minHeight),a&&d&&(e.top=h-i.maxHeight);var v=!e.width&&!e.height;return v&&!e.left&&e.top?e.top=null:v&&!e.top&&e.left&&(e.left=null),e},_proportionallyResize:function(){var t=this.options;if(!this._proportionallyResizeElements.length)return;var n=this.helper||this.element;for(var r=0;r<this._proportionallyResizeElements.length;r++){var i=this._proportionallyResizeElements[r];if(!this.borderDif){var s=[i.css("borderTopWidth"),i.css("borderRightWidth"),i.css("borderBottomWidth"),i.css("borderLeftWidth")],o=[i.css("paddingTop"),i.css("paddingRight"),i.css("paddingBottom"),i.css("paddingLeft")];this.borderDif=e.map(s,function(e,t){var n=parseInt(e,10)||0,r=parseInt(o[t],10)||0;return n+r})}i.css({height:n.height()-this.borderDif[0]-this.borderDif[2]||0,width:n.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var t=this.element,n=this.options;this.elementOffset=t.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var r=e.ui.ie6?1:0,i=e.ui.ie6?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+i,height:this.element.outerHeight()+i,position:"absolute",left:this.elementOffset.left-r+"px",top:this.elementOffset.top-r+"px",zIndex:++n.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(e,t,n){return{width:this.originalSize.width+t}},w:function(e,t,n){var r=this.options,i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,n){var r=this.options,i=this.originalSize,s=this.originalPosition;return{top:s.top+n,height:i.height-n}},s:function(e,t,n){return{height:this.originalSize.height+n}},se:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},sw:function(t,n,r){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,n,r]))},ne:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,n,r]))},nw:function(t,n,r){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,n,r]))}},_propagate:function(t,n){e.ui.plugin.call(this,t,[n,this.ui()]),t!="resize"&&this._trigger(t,n,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","alsoResize",{start:function(t,n){var r=e(this).data("resizable"),i=r.options,s=function(t){e(t).each(function(){var t=e(this);t.data("resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};typeof i.alsoResize=="object"&&!i.alsoResize.parentNode?i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)}):s(i.alsoResize)},resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.originalSize,o=r.originalPosition,u={height:r.size.height-s.height||0,width:r.size.width-s.width||0,top:r.position.top-o.top||0,left:r.position.left-o.left||0},a=function(t,r){e(t).each(function(){var t=e(this),i=e(this).data("resizable-alsoresize"),s={},o=r&&r.length?r:t.parents(n.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var n=(i[t]||0)+(u[t]||0);n&&n>=0&&(s[t]=n||null)}),t.css(s)})};typeof i.alsoResize=="object"&&!i.alsoResize.nodeType?e.each(i.alsoResize,function(e,t){a(e,t)}):a(i.alsoResize)},stop:function(t,n){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","animate",{stop:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r._proportionallyResizeElements,o=s.length&&/textarea/i.test(s[0].nodeName),u=o&&e.ui.hasScroll(s[0],"left")?0:r.sizeDiff.height,a=o?0:r.sizeDiff.width,f={width:r.size.width-a,height:r.size.height-u},l=parseInt(r.element.css("left"),10)+(r.position.left-r.originalPosition.left)||null,c=parseInt(r.element.css("top"),10)+(r.position.top-r.originalPosition.top)||null;r.element.animate(e.extend(f,c&&l?{top:c,left:l}:{}),{duration:i.animateDuration,easing:i.animateEasing,step:function(){var n={width:parseInt(r.element.css("width"),10),height:parseInt(r.element.css("height"),10),top:parseInt(r.element.css("top"),10),left:parseInt(r.element.css("left"),10)};s&&s.length&&e(s[0]).css({width:n.width,height:n.height}),r._updateCache(n),r._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(t,r){var i=e(this).data("resizable"),s=i.options,o=i.element,u=s.containment,a=u instanceof e?u.get(0):/parent/.test(u)?o.parent().get(0):u;if(!a)return;i.containerElement=e(a);if(/document/.test(u)||u==document)i.containerOffset={left:0,top:0},i.containerPosition={left:0,top:0},i.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight};else{var f=e(a),l=[];e(["Top","Right","Left","Bottom"]).each(function(e,t){l[e]=n(f.css("padding"+t))}),i.containerOffset=f.offset(),i.containerPosition=f.position(),i.containerSize={height:f.innerHeight()-l[3],width:f.innerWidth()-l[1]};var c=i.containerOffset,h=i.containerSize.height,p=i.containerSize.width,d=e.ui.hasScroll(a,"left")?a.scrollWidth:p,v=e.ui.hasScroll(a)?a.scrollHeight:h;i.parentData={element:a,left:c.left,top:c.top,width:d,height:v}}},resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.containerSize,o=r.containerOffset,u=r.size,a=r.position,f=r._aspectRatio||t.shiftKey,l={top:0,left:0},c=r.containerElement;c[0]!=document&&/static/.test(c.css("position"))&&(l=o),a.left<(r._helper?o.left:0)&&(r.size.width=r.size.width+(r._helper?r.position.left-o.left:r.position.left-l.left),f&&(r.size.height=r.size.width/r.aspectRatio),r.position.left=i.helper?o.left:0),a.top<(r._helper?o.top:0)&&(r.size.height=r.size.height+(r._helper?r.position.top-o.top:r.position.top),f&&(r.size.width=r.size.height*r.aspectRatio),r.position.top=r._helper?o.top:0),r.offset.left=r.parentData.left+r.position.left,r.offset.top=r.parentData.top+r.position.top;var h=Math.abs((r._helper?r.offset.left-l.left:r.offset.left-l.left)+r.sizeDiff.width),p=Math.abs((r._helper?r.offset.top-l.top:r.offset.top-o.top)+r.sizeDiff.height),d=r.containerElement.get(0)==r.element.parent().get(0),v=/relative|absolute/.test(r.containerElement.css("position"));d&&v&&(h-=r.parentData.left),h+r.size.width>=r.parentData.width&&(r.size.width=r.parentData.width-h,f&&(r.size.height=r.size.width/r.aspectRatio)),p+r.size.height>=r.parentData.height&&(r.size.height=r.parentData.height-p,f&&(r.size.width=r.size.height*r.aspectRatio))},stop:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.position,o=r.containerOffset,u=r.containerPosition,a=r.containerElement,f=e(r.helper),l=f.offset(),c=f.outerWidth()-r.sizeDiff.width,h=f.outerHeight()-r.sizeDiff.height;r._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:l.left-u.left-o.left,width:c,height:h}),r._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:l.left-u.left-o.left,width:c,height:h})}}),e.ui.plugin.add("resizable","ghost",{start:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.size;r.ghost=r.originalElement.clone(),r.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof i.ghost=="string"?i.ghost:""),r.ghost.appendTo(r.helper)},resize:function(t,n){var r=e(this).data("resizable"),i=r.options;r.ghost&&r.ghost.css({position:"relative",height:r.size.height,width:r.size.width})},stop:function(t,n){var r=e(this).data("resizable"),i=r.options;r.ghost&&r.helper&&r.helper.get(0).removeChild(r.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(t,n){var r=e(this).data("resizable"),i=r.options,s=r.size,o=r.originalSize,u=r.originalPosition,a=r.axis,f=i._aspectRatio||t.shiftKey;i.grid=typeof i.grid=="number"?[i.grid,i.grid]:i.grid;var l=Math.round((s.width-o.width)/(i.grid[0]||1))*(i.grid[0]||1),c=Math.round((s.height-o.height)/(i.grid[1]||1))*(i.grid[1]||1);/^(se|s|e)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c):/^(ne)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c,r.position.top=u.top-c):/^(sw)$/.test(a)?(r.size.width=o.width+l,r.size.height=o.height+c,r.position.left=u.left-l):(r.size.width=o.width+l,r.size.height=o.height+c,r.position.top=u.top-c,r.position.left=u.left-l)}});var n=function(e){return parseInt(e,10)||0},r=function(e){return!isNaN(parseInt(e,10))}})(jQuery);(function(e,t){e.widget("ui.sortable",e.ui.mouse,{version:"1.9.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?e.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_setOption:function(t,n){t==="disabled"?(this.options[t]=n,this.widget().toggleClass("ui-sortable-disabled",!!n)):e.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(t,n){var r=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(t);var i=null,s=e(t.target).parents().each(function(){if(e.data(this,r.widgetName+"-item")==r)return i=e(this),!1});e.data(t.target,r.widgetName+"-item")==r&&(i=e(t.target));if(!i)return!1;if(this.options.handle&&!n){var o=!1;e(this.options.handle,i).find("*").andSelf().each(function(){this==t.target&&(o=!0)});if(!o)return!1}return this.currentItem=i,this._removeCurrentsFromItems(),!0},_mouseStart:function(t,n,r){var i=this.options;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),i.containment&&this._setContainment(),i.cursor&&(e("body").css("cursor")&&(this._storedCursor=e("body").css("cursor")),e("body").css("cursor",i.cursor)),i.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",i.opacity)),i.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",i.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!r)for(var s=this.containers.length-1;s>=0;s--)this.containers[s]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var n=this.options,r=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<n.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+n.scrollSpeed:t.pageY-this.overflowOffset.top<n.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-n.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<n.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+n.scrollSpeed:t.pageX-this.overflowOffset.left<n.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-n.scrollSpeed)):(t.pageY-e(document).scrollTop()<n.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<n.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+n.scrollSpeed)),t.pageX-e(document).scrollLeft()<n.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<n.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+n.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var i=this.items.length-1;i>=0;i--){var s=this.items[i],o=s.item[0],u=this._intersectsWithPointer(s);if(!u)continue;if(s.instance!==this.currentContainer)continue;if(o!=this.currentItem[0]&&this.placeholder[u==1?"next":"prev"]()[0]!=o&&!e.contains(this.placeholder[0],o)&&(this.options.type=="semi-dynamic"?!e.contains(this.element[0],o):!0)){this.direction=u==1?"down":"up";if(this.options.tolerance!="pointer"&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,n){if(!t)return;e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t);if(this.options.revert){var r=this,i=this.placeholder.offset();this.reverting=!0,e(this.helper).animate({left:i.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:i.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){r._clear(t)})}else this._clear(t,n);return!1},cancel:function(){if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},e(n).each(function(){var n=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[-=_](.+)/);n&&r.push((t.key||n[1]+"[]")+"="+(t.key&&t.expression?n[1]:n[2]))}),!r.length&&t.key&&r.push(t.key+"="),r.join("&")},toArray:function(t){var n=this._getItemsAsjQuery(t&&t.connected),r=[];return t=t||{},n.each(function(){r.push(e(t.item||this).attr(t.attribute||"id")||"")}),r},_intersectsWith:function(e){var t=this.positionAbs.left,n=t+this.helperProportions.width,r=this.positionAbs.top,i=r+this.helperProportions.height,s=e.left,o=s+e.width,u=e.top,a=u+e.height,f=this.offset.click.top,l=this.offset.click.left,c=r+f>u&&r+f<a&&t+l>s&&t+l<o;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?c:s<t+this.helperProportions.width/2&&n-this.helperProportions.width/2<o&&u<r+this.helperProportions.height/2&&i-this.helperProportions.height/2<a},_intersectsWithPointer:function(t){var n=this.options.axis==="x"||e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),r=this.options.axis==="y"||e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),i=n&&r,s=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return i?this.floating?o&&o=="right"||s=="down"?2:1:s&&(s=="down"?2:1):!1},_intersectsWithSides:function(t){var n=e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),r=e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),i=this._getDragVerticalDirection(),s=this._getDragHorizontalDirection();return this.floating&&s?s=="right"&&r||s=="left"&&!r:i&&(i=="down"&&n||i=="up"&&!n)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return e!=0&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return e!=0&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor==String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){var n=[],r=[],i=this._connectWith();if(i&&t)for(var s=i.length-1;s>=0;s--){var o=e(i[s]);for(var u=o.length-1;u>=0;u--){var a=e.data(o[u],this.widgetName);a&&a!=this&&!a.options.disabled&&r.push([e.isFunction(a.options.items)?a.options.items.call(a.element):e(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a])}}r.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var s=r.length-1;s>=0;s--)r[s][0].each(function(){n.push(this)});return e(n)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var n=0;n<t.length;n++)if(t[n]==e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var n=this.items,r=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],i=this._connectWith();if(i&&this.ready)for(var s=i.length-1;s>=0;s--){var o=e(i[s]);for(var u=o.length-1;u>=0;u--){var a=e.data(o[u],this.widgetName);a&&a!=this&&!a.options.disabled&&(r.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a))}}for(var s=r.length-1;s>=0;s--){var f=r[s][1],l=r[s][0];for(var u=0,c=l.length;u<c;u++){var h=e(l[u]);h.data(this.widgetName+"-item",f),n.push({item:h,instance:f,width:0,height:0,left:0,top:0})}}},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var n=this.items.length-1;n>=0;n--){var r=this.items[n];if(r.instance!=this.currentContainer&&this.currentContainer&&r.item[0]!=this.currentItem[0])continue;var i=this.options.toleranceElement?e(this.options.toleranceElement,r.item):r.item;t||(r.width=i.outerWidth(),r.height=i.outerHeight());var s=i.offset();r.left=s.left,r.top=s.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var n=this.containers.length-1;n>=0;n--){var s=this.containers[n].element.offset();this.containers[n].containerCache.left=s.left,this.containers[n].containerCache.top=s.top,this.containers[n].containerCache.width=this.containers[n].element.outerWidth(),this.containers[n].containerCache.height=this.containers[n].element.outerHeight()}return this},_createPlaceholder:function(t){t=t||this;var n=t.options;if(!n.placeholder||n.placeholder.constructor==String){var r=n.placeholder;n.placeholder={element:function(){var n=e(document.createElement(t.currentItem[0].nodeName)).addClass(r||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return r||(n.style.visibility="hidden"),n},update:function(e,i){if(r&&!n.forcePlaceholderSize)return;i.height()||i.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),i.width()||i.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10))}}}t.placeholder=e(n.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),n.placeholder.update(t,t.placeholder)},_contactContainers:function(t){var n=null,r=null;for(var i=this.containers.length-1;i>=0;i--){if(e.contains(this.currentItem[0],this.containers[i].element[0]))continue;if(this._intersectsWith(this.containers[i].containerCache)){if(n&&e.contains(this.containers[i].element[0],n.element[0]))continue;n=this.containers[i],r=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0)}if(!n)return;if(this.containers.length===1)this.containers[r]._trigger("over",t,this._uiHash(this)),this.containers[r].containerCache.over=1;else{var s=1e4,o=null,u=this.containers[r].floating?"left":"top",a=this.containers[r].floating?"width":"height",f=this.positionAbs[u]+this.offset.click[u];for(var l=this.items.length-1;l>=0;l--){if(!e.contains(this.containers[r].element[0],this.items[l].item[0]))continue;if(this.items[l].item[0]==this.currentItem[0])continue;var c=this.items[l].item.offset()[u],h=!1;Math.abs(c-f)>Math.abs(c+this.items[l][a]-f)&&(h=!0,c+=this.items[l][a]),Math.abs(c-f)<s&&(s=Math.abs(c-f),o=this.items[l],this.direction=h?"up":"down")}if(!o&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[r],o?this._rearrange(t,o,null,!0):this._rearrange(t,null,this.containers[r].element,!0),this._trigger("change",t,this._uiHash()),this.containers[r]._trigger("change",t,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[r]._trigger("over",t,this._uiHash(this)),this.containers[r].containerCache.over=1}},_createHelper:function(t){var n=this.options,r=e.isFunction(n.helper)?e(n.helper.apply(this.element[0],[t,this.currentItem])):n.helper=="clone"?this.currentItem.clone():this.currentItem;return r.parents("body").length||e(n.appendTo!="parent"?n.appendTo:this.currentItem[0].parentNode)[0].appendChild(r[0]),r[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(r[0].style.width==""||n.forceHelperSize)&&r.width(this.currentItem.width()),(r[0].style.height==""||n.forceHelperSize)&&r.height(this.currentItem.height()),r},_adjustOffsetFromHelper:function(t){typeof t=="string"&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&e.ui.ie)t={top:0,left:0};return{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t=this.options;t.containment=="parent"&&(t.containment=this.helper[0].parentNode);if(t.containment=="document"||t.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e(t.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(e(t.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(t.containment)){var n=e(t.containment)[0],r=e(t.containment).offset(),i=e(n).css("overflow")!="hidden";this.containment=[r.left+(parseInt(e(n).css("borderLeftWidth"),10)||0)+(parseInt(e(n).css("paddingLeft"),10)||0)-this.margins.left,r.top+(parseInt(e(n).css("borderTopWidth"),10)||0)+(parseInt(e(n).css("paddingTop"),10)||0)-this.margins.top,r.left+(i?Math.max(n.scrollWidth,n.offsetWidth):n.offsetWidth)-(parseInt(e(n).css("borderLeftWidth"),10)||0)-(parseInt(e(n).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,r.top+(i?Math.max(n.scrollHeight,n.offsetHeight):n.offsetHeight)-(parseInt(e(n).css("borderTopWidth"),10)||0)-(parseInt(e(n).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(t,n){n||(n=this.position);var r=t=="absolute"?1:-1,i=this.options,s=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:n.top+this.offset.relative.top*r+this.offset.parent.top*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():o?0:s.scrollTop())*r,left:n.left+this.offset.relative.left*r+this.offset.parent.left*r-(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*r}},_generatePosition:function(t){var n=this.options,r=this.cssPosition!="absolute"||this.scrollParent[0]!=document&&!!e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,i=/(html|body)/i.test(r[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var s=t.pageX,o=t.pageY;if(this.originalPosition){this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(s=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(s=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top));if(n.grid){var u=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1];o=this.containment?u-this.offset.click.top<this.containment[1]||u-this.offset.click.top>this.containment[3]?u-this.offset.click.top<this.containment[1]?u+n.grid[1]:u-n.grid[1]:u:u;var a=this.originalPageX+Math.round((s-this.originalPageX)/n.grid[0])*n.grid[0];s=this.containment?a-this.offset.click.left<this.containment[0]||a-this.offset.click.left>this.containment[2]?a-this.offset.click.left<this.containment[0]?a+n.grid[0]:a-n.grid[0]:a:a}}return{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():i?0:r.scrollTop()),left:s-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:r.scrollLeft())}},_rearrange:function(e,t,n,r){n?n[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var i=this.counter;this._delay(function(){i==this.counter&&this.refreshPositions(!r)})},_clear:function(t,n){this.reverting=!1;var r=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var i in this._storedCSS)if(this._storedCSS[i]=="auto"||this._storedCSS[i]=="static")this._storedCSS[i]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!n&&r.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!n&&r.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(n||(r.push(function(e){this._trigger("remove",e,this._uiHash())}),r.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),r.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer))));for(var i=this.containers.length-1;i>=0;i--)n||r.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(r.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);this._storedCursor&&e("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!n){this._trigger("beforeStop",t,this._uiHash());for(var i=0;i<r.length;i++)r[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}n||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!n){for(var i=0;i<r.length;i++)r[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var n=t||this;return{helper:n.helper,placeholder:n.placeholder||e([]),position:n.position,originalPosition:n.originalPosition,offset:n.positionAbs,item:n.currentItem,sender:t?t.element:null}}})})(jQuery);(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function bindHover(e){var t="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(t,"mouseout",function(){$(this).removeClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).removeClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).removeClass("ui-datepicker-next-hover")}).delegate(t,"mouseover",function(){$.datepicker._isDisabledDatepicker(instActive.inline?e.parent()[0]:instActive.input[0])||($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),this.className.indexOf("ui-datepicker-prev")!=-1&&$(this).addClass("ui-datepicker-prev-hover"),this.className.indexOf("ui-datepicker-next")!=-1&&$(this).addClass("ui-datepicker-next-hover"))})}function extendRemove(e,t){$.extend(e,t);for(var n in t)if(t[n]==null||t[n]==undefined)e[n]=t[n];return e}$.extend($.ui,{datepicker:{version:"1.9.2"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return extendRemove(this._defaults,e||{}),this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(e,t){var n=e[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:t,dpDiv:t?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(e,t){var n=$(e);t.append=$([]),t.trigger=$([]);if(n.hasClass(this.markerClassName))return;this._attachments(n,t),n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),this._autoSize(t),$.data(e,PROP_NAME,t),t.settings.disabled&&this._disableDatepicker(e)},_attachments:function(e,t){var n=this._get(t,"appendText"),r=this._get(t,"isRTL");t.append&&t.append.remove(),n&&(t.append=$('<span class="'+this._appendClass+'">'+n+"</span>"),e[r?"before":"after"](t.append)),e.unbind("focus",this._showDatepicker),t.trigger&&t.trigger.remove();var i=this._get(t,"showOn");(i=="focus"||i=="both")&&e.focus(this._showDatepicker);if(i=="button"||i=="both"){var s=this._get(t,"buttonText"),o=this._get(t,"buttonImage");t.trigger=$(this._get(t,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:o,alt:s,title:s}):$('<button type="button"></button>').addClass(this._triggerClass).html(o==""?s:$("<img/>").attr({src:o,alt:s,title:s}))),e[r?"before":"after"](t.trigger),t.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==e[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=e[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(e[0])):$.datepicker._showDatepicker(e[0]),!1})}},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t=new Date(2009,11,20),n=this._get(e,"dateFormat");if(n.match(/[DM]/)){var r=function(e){var t=0,n=0;for(var r=0;r<e.length;r++)e[r].length>t&&(t=e[r].length,n=r);return n};t.setMonth(r(this._get(e,n.match(/MM/)?"monthNames":"monthNamesShort"))),t.setDate(r(this._get(e,n.match(/DD/)?"dayNames":"dayNamesShort"))+20-t.getDay())}e.input.attr("size",this._formatDate(e,t).length)}},_inlineDatepicker:function(e,t){var n=$(e);if(n.hasClass(this.markerClassName))return;n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker",function(e,n,r){t.settings[n]=r}).bind("getData.datepicker",function(e,n){return this._get(t,n)}),$.data(e,PROP_NAME,t),this._setDate(t,this._getDefaultDate(t),!0),this._updateDatepicker(t),this._updateAlternate(t),t.settings.disabled&&this._disableDatepicker(e),t.dpDiv.css("display","block")},_dialogDatepicker:function(e,t,n,r,i){var s=this._dialogInst;if(!s){this.uuid+=1;var o="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+o+'" style="position: absolute; top: -100px; width: 0px;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),s=this._dialogInst=this._newInst(this._dialogInput,!1),s.settings={},$.data(this._dialogInput[0],PROP_NAME,s)}extendRemove(s.settings,r||{}),t=t&&t.constructor==Date?this._formatDate(s,t):t,this._dialogInput.val(t),this._pos=i?i.length?i:[i.pageX,i.pageY]:null;if(!this._pos){var u=document.documentElement.clientWidth,a=document.documentElement.clientHeight,f=document.documentElement.scrollLeft||document.body.scrollLeft,l=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[u/2-100+f,a/2-150+l]}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),s.settings.onSelect=n,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,s),this},_destroyDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();$.removeData(e,PROP_NAME),r=="input"?(n.append.remove(),n.trigger.remove(),t.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(r=="div"||r=="span")&&t.removeClass(this.markerClassName).empty()},_enableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().removeClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t})},_disableDatepicker:function(e){var t=$(e),n=$.data(e,PROP_NAME);if(!t.hasClass(this.markerClassName))return;var r=e.nodeName.toLowerCase();if(r=="input")e.disabled=!0,n.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(r=="div"||r=="span"){var i=t.children("."+this._inlineClass);i.children().addClass("ui-state-disabled"),i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)}this._disabledInputs=$.map(this._disabledInputs,function(t){return t==e?null:t}),this._disabledInputs[this._disabledInputs.length]=e},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]==e)return!0;return!1},_getInst:function(e){try{return $.data(e,PROP_NAME)}catch(t){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,t,n){var r=this._getInst(e);if(arguments.length==2&&typeof t=="string")return t=="defaults"?$.extend({},$.datepicker._defaults):r?t=="all"?$.extend({},r.settings):this._get(r,t):null;var i=t||{};typeof t=="string"&&(i={},i[t]=n);if(r){this._curInst==r&&this._hideDatepicker();var s=this._getDateDatepicker(e,!0),o=this._getMinMaxDate(r,"min"),u=this._getMinMaxDate(r,"max");extendRemove(r.settings,i),o!==null&&i.dateFormat!==undefined&&i.minDate===undefined&&(r.settings.minDate=this._formatDate(r,o)),u!==null&&i.dateFormat!==undefined&&i.maxDate===undefined&&(r.settings.maxDate=this._formatDate(r,u)),this._attachments($(e),r),this._autoSize(r),this._setDate(r,s),this._updateAlternate(r),this._updateDatepicker(r)}},_changeDatepicker:function(e,t,n){this._optionDatepicker(e,t,n)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var n=this._getInst(e);n&&(this._setDate(n,t),this._updateDatepicker(n),this._updateAlternate(n))},_getDateDatepicker:function(e,t){var n=this._getInst(e);return n&&!n.inline&&this._setDateFromField(n,t),n?this._getDate(n):null},_doKeyDown:function(e){var t=$.datepicker._getInst(e.target),n=!0,r=t.dpDiv.is(".ui-datepicker-rtl");t._keyEvent=!0;if($.datepicker._datepickerShowing)switch(e.keyCode){case 9:$.datepicker._hideDatepicker(),n=!1;break;case 13:var i=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",t.dpDiv);i[0]&&$.datepicker._selectDay(e.target,t.selectedMonth,t.selectedYear,i[0]);var s=$.datepicker._get(t,"onSelect");if(s){var o=$.datepicker._formatDate(t);s.apply(t.input?t.input[0]:null,[o,t])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&$.datepicker._clearDate(e.target),n=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&$.datepicker._gotoToday(e.target),n=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?1:-1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?-$.datepicker._get(t,"stepBigMonths"):-$.datepicker._get(t,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,-7,"D"),n=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,r?-1:1,"D"),n=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&$.datepicker._adjustDate(e.target,e.ctrlKey?+$.datepicker._get(t,"stepBigMonths"):+$.datepicker._get(t,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&$.datepicker._adjustDate(e.target,7,"D"),n=e.ctrlKey||e.metaKey;break;default:n=!1}else e.keyCode==36&&e.ctrlKey?$.datepicker._showDatepicker(this):n=!1;n&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var t=$.datepicker._getInst(e.target);if($.datepicker._get(t,"constrainInput")){var n=$.datepicker._possibleChars($.datepicker._get(t,"dateFormat")),r=String.fromCharCode(e.charCode==undefined?e.keyCode:e.charCode);return e.ctrlKey||e.metaKey||r<" "||!n||n.indexOf(r)>-1}},_doKeyUp:function(e){var t=$.datepicker._getInst(e.target);if(t.input.val()!=t.lastVal)try{var n=$.datepicker.parseDate($.datepicker._get(t,"dateFormat"),t.input?t.input.val():null,$.datepicker._getFormatConfig(t));n&&($.datepicker._setDateFromField(t),$.datepicker._updateAlternate(t),$.datepicker._updateDatepicker(t))}catch(r){$.datepicker.log(r)}return!0},_showDatepicker:function(e){e=e.target||e,e.nodeName.toLowerCase()!="input"&&(e=$("input",e.parentNode)[0]);if($.datepicker._isDisabledDatepicker(e)||$.datepicker._lastInput==e)return;var t=$.datepicker._getInst(e);$.datepicker._curInst&&$.datepicker._curInst!=t&&($.datepicker._curInst.dpDiv.stop(!0,!0),t&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var n=$.datepicker._get(t,"beforeShow"),r=n?n.apply(e,[e,t]):{};if(r===!1)return;extendRemove(t.settings,r),t.lastVal=null,$.datepicker._lastInput=e,$.datepicker._setDateFromField(t),$.datepicker._inDialog&&(e.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(e),$.datepicker._pos[1]+=e.offsetHeight);var i=!1;$(e).parents().each(function(){return i|=$(this).css("position")=="fixed",!i});var s={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,t.dpDiv.empty(),t.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(t),s=$.datepicker._checkOffset(t,s,i),t.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":i?"fixed":"absolute",display:"none",left:s.left+"px",top:s.top+"px"});if(!t.inline){var o=$.datepicker._get(t,"showAnim"),u=$.datepicker._get(t,"duration"),a=function(){var e=t.dpDiv.find("iframe.ui-datepicker-cover");if(!!e.length){var n=$.datepicker._getBorders(t.dpDiv);e.css({left:-n[0],top:-n[1],width:t.dpDiv.outerWidth(),height:t.dpDiv.outerHeight()})}};t.dpDiv.zIndex($(e).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&($.effects.effect[o]||$.effects[o])?t.dpDiv.show(o,$.datepicker._get(t,"showOptions"),u,a):t.dpDiv[o||"show"](o?u:null,a),(!o||!u)&&a(),t.input.is(":visible")&&!t.input.is(":disabled")&&t.input.focus(),$.datepicker._curInst=t}},_updateDatepicker:function(e){this.maxRows=4;var t=$.datepicker._getBorders(e.dpDiv);instActive=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var n=e.dpDiv.find("iframe.ui-datepicker-cover");!n.length||n.css({left:-t[0],top:-t[1],width:e.dpDiv.outerWidth(),height:e.dpDiv.outerHeight()}),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var r=this._getNumberOfMonths(e),i=r[1],s=17;e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),i>1&&e.dpDiv.addClass("ui-datepicker-multi-"+i).css("width",s*i+"em"),e.dpDiv[(r[0]!=1||r[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e==$.datepicker._curInst&&$.datepicker._datepickerShowing&&e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&e.input[0]!=document.activeElement&&e.input.focus();if(e.yearshtml){var o=e.yearshtml;setTimeout(function(){o===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),o=e.yearshtml=null},0)}},_getBorders:function(e){var t=function(e){return{thin:1,medium:2,thick:3}[e]||e};return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkOffset:function(e,t,n){var r=e.dpDiv.outerWidth(),i=e.dpDiv.outerHeight(),s=e.input?e.input.outerWidth():0,o=e.input?e.input.outerHeight():0,u=document.documentElement.clientWidth+(n?0:$(document).scrollLeft()),a=document.documentElement.clientHeight+(n?0:$(document).scrollTop());return t.left-=this._get(e,"isRTL")?r-s:0,t.left-=n&&t.left==e.input.offset().left?$(document).scrollLeft():0,t.top-=n&&t.top==e.input.offset().top+o?$(document).scrollTop():0,t.left-=Math.min(t.left,t.left+r>u&&u>r?Math.abs(t.left+r-u):0),t.top-=Math.min(t.top,t.top+i>a&&a>i?Math.abs(i+o):0),t},_findPos:function(e){var t=this._getInst(e),n=this._get(t,"isRTL");while(e&&(e.type=="hidden"||e.nodeType!=1||$.expr.filters.hidden(e)))e=e[n?"previousSibling":"nextSibling"];var r=$(e).offset();return[r.left,r.top]},_hideDatepicker:function(e){var t=this._curInst;if(!t||e&&t!=$.data(e,PROP_NAME))return;if(this._datepickerShowing){var n=this._get(t,"showAnim"),r=this._get(t,"duration"),i=function(){$.datepicker._tidyDialog(t)};$.effects&&($.effects.effect[n]||$.effects[n])?t.dpDiv.hide(n,$.datepicker._get(t,"showOptions"),r,i):t.dpDiv[n=="slideDown"?"slideUp":n=="fadeIn"?"fadeOut":"hide"](n?r:null,i),n||i(),this._datepickerShowing=!1;var s=this._get(t,"onClose");s&&s.apply(t.input?t.input[0]:null,[t.input?t.input.val():"",t]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(!$.datepicker._curInst)return;var t=$(e.target),n=$.datepicker._getInst(t[0]);(t[0].id!=$.datepicker._mainDivId&&t.parents("#"+$.datepicker._mainDivId).length==0&&!t.hasClass($.datepicker.markerClassName)&&!t.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||t.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=n)&&$.datepicker._hideDatepicker()},_adjustDate:function(e,t,n){var r=$(e),i=this._getInst(r[0]);if(this._isDisabledDatepicker(r[0]))return;this._adjustInstDate(i,t+(n=="M"?this._get(i,"showCurrentAtPos"):0),n),this._updateDatepicker(i)},_gotoToday:function(e){var t=$(e),n=this._getInst(t[0]);if(this._get(n,"gotoCurrent")&&n.currentDay)n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear;else{var r=new Date;n.selectedDay=r.getDate(),n.drawMonth=n.selectedMonth=r.getMonth(),n.drawYear=n.selectedYear=r.getFullYear()}this._notifyChange(n),this._adjustDate(t)},_selectMonthYear:function(e,t,n){var r=$(e),i=this._getInst(r[0]);i["selected"+(n=="M"?"Month":"Year")]=i["draw"+(n=="M"?"Month":"Year")]=parseInt(t.options[t.selectedIndex].value,10),this._notifyChange(i),this._adjustDate(r)},_selectDay:function(e,t,n,r){var i=$(e);if($(r).hasClass(this._unselectableClass)||this._isDisabledDatepicker(i[0]))return;var s=this._getInst(i[0]);s.selectedDay=s.currentDay=$("a",r).html(),s.selectedMonth=s.currentMonth=t,s.selectedYear=s.currentYear=n,this._selectDate(e,this._formatDate(s,s.currentDay,s.currentMonth,s.currentYear))},_clearDate:function(e){var t=$(e),n=this._getInst(t[0]);this._selectDate(t,"")},_selectDate:function(e,t){var n=$(e),r=this._getInst(n[0]);t=t!=null?t:this._formatDate(r),r.input&&r.input.val(t),this._updateAlternate(r);var i=this._get(r,"onSelect");i?i.apply(r.input?r.input[0]:null,[t,r]):r.input&&r.input.trigger("change"),r.inline?this._updateDatepicker(r):(this._hideDatepicker(),this._lastInput=r.input[0],typeof r.input[0]!="object"&&r.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var t=this._get(e,"altField");if(t){var n=this._get(e,"altFormat")||this._get(e,"dateFormat"),r=this._getDate(e),i=this.formatDate(n,r,this._getFormatConfig(e));$(t).each(function(){$(this).val(i)})}},noWeekends:function(e){var t=e.getDay();return[t>0&&t<6,""]},iso8601Week:function(e){var t=new Date(e.getTime());t.setDate(t.getDate()+4-(t.getDay()||7));var n=t.getTime();return t.setMonth(0),t.setDate(1),Math.floor(Math.round((n-t)/864e5)/7)+1},parseDate:function(e,t,n){if(e==null||t==null)throw"Invalid arguments";t=typeof t=="object"?t.toString():t+"";if(t=="")return null;var r=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff;r=typeof r!="string"?r:(new Date).getFullYear()%100+parseInt(r,10);var i=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,s=(n?n.dayNames:null)||this._defaults.dayNames,o=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,u=(n?n.monthNames:null)||this._defaults.monthNames,a=-1,f=-1,l=-1,c=-1,h=!1,p=function(t){var n=y+1<e.length&&e.charAt(y+1)==t;return n&&y++,n},d=function(e){var n=p(e),r=e=="@"?14:e=="!"?20:e=="y"&&n?4:e=="o"?3:2,i=new RegExp("^\\d{1,"+r+"}"),s=t.substring(g).match(i);if(!s)throw"Missing number at position "+g;return g+=s[0].length,parseInt(s[0],10)},v=function(e,n,r){var i=$.map(p(e)?r:n,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)}),s=-1;$.each(i,function(e,n){var r=n[1];if(t.substr(g,r.length).toLowerCase()==r.toLowerCase())return s=n[0],g+=r.length,!1});if(s!=-1)return s+1;throw"Unknown name at position "+g},m=function(){if(t.charAt(g)!=e.charAt(y))throw"Unexpected literal at position "+g;g++},g=0;for(var y=0;y<e.length;y++)if(h)e.charAt(y)=="'"&&!p("'")?h=!1:m();else switch(e.charAt(y)){case"d":l=d("d");break;case"D":v("D",i,s);break;case"o":c=d("o");break;case"m":f=d("m");break;case"M":f=v("M",o,u);break;case"y":a=d("y");break;case"@":var b=new Date(d("@"));a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"!":var b=new Date((d("!")-this._ticksTo1970)/1e4);a=b.getFullYear(),f=b.getMonth()+1,l=b.getDate();break;case"'":p("'")?m():h=!0;break;default:m()}if(g<t.length){var w=t.substr(g);if(!/^\s+/.test(w))throw"Extra/unparsed characters found in date: "+w}a==-1?a=(new Date).getFullYear():a<100&&(a+=(new Date).getFullYear()-(new Date).getFullYear()%100+(a<=r?0:-100));if(c>-1){f=1,l=c;do{var E=this._getDaysInMonth(a,f-1);if(l<=E)break;f++,l-=E}while(!0)}var b=this._daylightSavingAdjust(new Date(a,f-1,l));if(b.getFullYear()!=a||b.getMonth()+1!=f||b.getDate()!=l)throw"Invalid date";return b},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(e,t,n){if(!t)return"";var r=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,i=(n?n.dayNames:null)||this._defaults.dayNames,s=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,o=(n?n.monthNames:null)||this._defaults.monthNames,u=function(t){var n=h+1<e.length&&e.charAt(h+1)==t;return n&&h++,n},a=function(e,t,n){var r=""+t;if(u(e))while(r.length<n)r="0"+r;return r},f=function(e,t,n,r){return u(e)?r[t]:n[t]},l="",c=!1;if(t)for(var h=0;h<e.length;h++)if(c)e.charAt(h)=="'"&&!u("'")?c=!1:l+=e.charAt(h);else switch(e.charAt(h)){case"d":l+=a("d",t.getDate(),2);break;case"D":l+=f("D",t.getDay(),r,i);break;case"o":l+=a("o",Math.round(((new Date(t.getFullYear(),t.getMonth(),t.getDate())).getTime()-(new Date(t.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":l+=a("m",t.getMonth()+1,2);break;case"M":l+=f("M",t.getMonth(),s,o);break;case"y":l+=u("y")?t.getFullYear():(t.getYear()%100<10?"0":"")+t.getYear()%100;break;case"@":l+=t.getTime();break;case"!":l+=t.getTime()*1e4+this._ticksTo1970;break;case"'":u("'")?l+="'":c=!0;break;default:l+=e.charAt(h)}return l},_possibleChars:function(e){var t="",n=!1,r=function(t){var n=i+1<e.length&&e.charAt(i+1)==t;return n&&i++,n};for(var i=0;i<e.length;i++)if(n)e.charAt(i)=="'"&&!r("'")?n=!1:t+=e.charAt(i);else switch(e.charAt(i)){case"d":case"m":case"y":case"@":t+="0123456789";break;case"D":case"M":return null;case"'":r("'")?t+="'":n=!0;break;default:t+=e.charAt(i)}return t},_get:function(e,t){return e.settings[t]!==undefined?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()==e.lastVal)return;var n=this._get(e,"dateFormat"),r=e.lastVal=e.input?e.input.val():null,i,s;i=s=this._getDefaultDate(e);var o=this._getFormatConfig(e);try{i=this.parseDate(n,r,o)||s}catch(u){this.log(u),r=t?"":r}e.selectedDay=i.getDate(),e.drawMonth=e.selectedMonth=i.getMonth(),e.drawYear=e.selectedYear=i.getFullYear(),e.currentDay=r?i.getDate():0,e.currentMonth=r?i.getMonth():0,e.currentYear=r?i.getFullYear():0,this._adjustInstDate(e)},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(e,t,n){var r=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},i=function(t){try{return $.datepicker.parseDate($.datepicker._get(e,"dateFormat"),t,$.datepicker._getFormatConfig(e))}catch(n){}var r=(t.toLowerCase().match(/^c/)?$.datepicker._getDate(e):null)||new Date,i=r.getFullYear(),s=r.getMonth(),o=r.getDate(),u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,a=u.exec(t);while(a){switch(a[2]||"d"){case"d":case"D":o+=parseInt(a[1],10);break;case"w":case"W":o+=parseInt(a[1],10)*7;break;case"m":case"M":s+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s));break;case"y":case"Y":i+=parseInt(a[1],10),o=Math.min(o,$.datepicker._getDaysInMonth(i,s))}a=u.exec(t)}return new Date(i,s,o)},s=t==null||t===""?n:typeof t=="string"?i(t):typeof t=="number"?isNaN(t)?n:r(t):new Date(t.getTime());return s=s&&s.toString()=="Invalid Date"?n:s,s&&(s.setHours(0),s.setMinutes(0),s.setSeconds(0),s.setMilliseconds(0)),this._daylightSavingAdjust(s)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,n){var r=!t,i=e.selectedMonth,s=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),(i!=e.selectedMonth||s!=e.selectedYear)&&!n&&this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(r?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&e.input.val()==""?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(e){var t=this._get(e,"stepMonths"),n="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,-t,"M")},next:function(){window["DP_jQuery_"+dpuuid].datepicker._adjustDate(n,+t,"M")},hide:function(){window["DP_jQuery_"+dpuuid].datepicker._hideDatepicker()},today:function(){window["DP_jQuery_"+dpuuid].datepicker._gotoToday(n)},selectDay:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectDay(n,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"M"),!1},selectYear:function(){return window["DP_jQuery_"+dpuuid].datepicker._selectMonthYear(n,this,"Y"),!1}};$(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t=new Date;t=this._daylightSavingAdjust(new Date(t.getFullYear(),t.getMonth(),t.getDate()));var n=this._get(e,"isRTL"),r=this._get(e,"showButtonPanel"),i=this._get(e,"hideIfNoPrevNext"),s=this._get(e,"navigationAsDateFormat"),o=this._getNumberOfMonths(e),u=this._get(e,"showCurrentAtPos"),a=this._get(e,"stepMonths"),f=o[0]!=1||o[1]!=1,l=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),c=this._getMinMaxDate(e,"min"),h=this._getMinMaxDate(e,"max"),p=e.drawMonth-u,d=e.drawYear;p<0&&(p+=12,d--);if(h){var v=this._daylightSavingAdjust(new Date(h.getFullYear(),h.getMonth()-o[0]*o[1]+1,h.getDate()));v=c&&v<c?c:v;while(this._daylightSavingAdjust(new Date(d,p,1))>v)p--,p<0&&(p=11,d--)}e.drawMonth=p,e.drawYear=d;var m=this._get(e,"prevText");m=s?this.formatDate(m,this._daylightSavingAdjust(new Date(d,p-a,1)),this._getFormatConfig(e)):m;var g=this._canAdjustMonth(e,-1,d,p)?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>":i?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+m+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"e":"w")+'">'+m+"</span></a>",y=this._get(e,"nextText");y=s?this.formatDate(y,this._daylightSavingAdjust(new Date(d,p+a,1)),this._getFormatConfig(e)):y;var b=this._canAdjustMonth(e,1,d,p)?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>":i?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+y+'"><span class="ui-icon ui-icon-circle-triangle-'+(n?"w":"e")+'">'+y+"</span></a>",w=this._get(e,"currentText"),E=this._get(e,"gotoCurrent")&&e.currentDay?l:t;w=s?this.formatDate(w,E,this._getFormatConfig(e)):w;var S=e.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+this._get(e,"closeText")+"</button>",x=r?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(n?S:"")+(this._isInRange(e,E)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">'+w+"</button>":"")+(n?"":S)+"</div>":"",T=parseInt(this._get(e,"firstDay"),10);T=isNaN(T)?0:T;var N=this._get(e,"showWeek"),C=this._get(e,"dayNames"),k=this._get(e,"dayNamesShort"),L=this._get(e,"dayNamesMin"),A=this._get(e,"monthNames"),O=this._get(e,"monthNamesShort"),M=this._get(e,"beforeShowDay"),_=this._get(e,"showOtherMonths"),D=this._get(e,"selectOtherMonths"),P=this._get(e,"calculateWeek")||this.iso8601Week,H=this._getDefaultDate(e),B="";for(var j=0;j<o[0];j++){var F="";this.maxRows=4;for(var I=0;I<o[1];I++){var q=this._daylightSavingAdjust(new Date(d,p,e.selectedDay)),R=" ui-corner-all",U="";if(f){U+='<div class="ui-datepicker-group';if(o[1]>1)switch(I){case 0:U+=" ui-datepicker-group-first",R=" ui-corner-"+(n?"right":"left");break;case o[1]-1:U+=" ui-datepicker-group-last",R=" ui-corner-"+(n?"left":"right");break;default:U+=" ui-datepicker-group-middle",R=""}U+='">'}U+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+R+'">'+(/all|left/.test(R)&&j==0?n?b:g:"")+(/all|right/.test(R)&&j==0?n?g:b:"")+this._generateMonthYearHeader(e,p,d,c,h,j>0||I>0,A,O)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var z=N?'<th class="ui-datepicker-week-col">'+this._get(e,"weekHeader")+"</th>":"";for(var W=0;W<7;W++){var X=(W+T)%7;z+="<th"+((W+T+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+C[X]+'">'+L[X]+"</span></th>"}U+=z+"</tr></thead><tbody>";var V=this._getDaysInMonth(d,p);d==e.selectedYear&&p==e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,V));var J=(this._getFirstDayOfMonth(d,p)-T+7)%7,K=Math.ceil((J+V)/7),Q=f?this.maxRows>K?this.maxRows:K:K;this.maxRows=Q;var G=this._daylightSavingAdjust(new Date(d,p,1-J));for(var Y=0;Y<Q;Y++){U+="<tr>";var Z=N?'<td class="ui-datepicker-week-col">'+this._get(e,"calculateWeek")(G)+"</td>":"";for(var W=0;W<7;W++){var et=M?M.apply(e.input?e.input[0]:null,[G]):[!0,""],tt=G.getMonth()!=p,nt=tt&&!D||!et[0]||c&&G<c||h&&G>h;Z+='<td class="'+((W+T+6)%7>=5?" ui-datepicker-week-end":"")+(tt?" ui-datepicker-other-month":"")+(G.getTime()==q.getTime()&&p==e.selectedMonth&&e._keyEvent||H.getTime()==G.getTime()&&H.getTime()==q.getTime()?" "+this._dayOverClass:"")+(nt?" "+this._unselectableClass+" ui-state-disabled":"")+(tt&&!_?"":" "+et[1]+(G.getTime()==l.getTime()?" "+this._currentClass:"")+(G.getTime()==t.getTime()?" ui-datepicker-today":""))+'"'+((!tt||_)&&et[2]?' title="'+et[2]+'"':"")+(nt?"":' data-handler="selectDay" data-event="click" data-month="'+G.getMonth()+'" data-year="'+G.getFullYear()+'"')+">"+(tt&&!_?"&#xa0;":nt?'<span class="ui-state-default">'+G.getDate()+"</span>":'<a class="ui-state-default'+(G.getTime()==t.getTime()?" ui-state-highlight":"")+(G.getTime()==l.getTime()?" ui-state-active":"")+(tt?" ui-priority-secondary":"")+'" href="#">'+G.getDate()+"</a>")+"</td>",G.setDate(G.getDate()+1),G=this._daylightSavingAdjust(G)}U+=Z+"</tr>"}p++,p>11&&(p=0,d++),U+="</tbody></table>"+(f?"</div>"+(o[0]>0&&I==o[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),F+=U}B+=F}return B+=x+($.ui.ie6&&!e.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),e._keyEvent=!1,B},_generateMonthYearHeader:function(e,t,n,r,i,s,o,u){var a=this._get(e,"changeMonth"),f=this._get(e,"changeYear"),l=this._get(e,"showMonthAfterYear"),c='<div class="ui-datepicker-title">',h="";if(s||!a)h+='<span class="ui-datepicker-month">'+o[t]+"</span>";else{var p=r&&r.getFullYear()==n,d=i&&i.getFullYear()==n;h+='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for(var v=0;v<12;v++)(!p||v>=r.getMonth())&&(!d||v<=i.getMonth())&&(h+='<option value="'+v+'"'+(v==t?' selected="selected"':"")+">"+u[v]+"</option>");h+="</select>"}l||(c+=h+(s||!a||!f?"&#xa0;":""));if(!e.yearshtml){e.yearshtml="";if(s||!f)c+='<span class="ui-datepicker-year">'+n+"</span>";else{var m=this._get(e,"yearRange").split(":"),g=(new Date).getFullYear(),y=function(e){var t=e.match(/c[+-].*/)?n+parseInt(e.substring(1),10):e.match(/[+-].*/)?g+parseInt(e,10):parseInt(e,10);return isNaN(t)?g:t},b=y(m[0]),w=Math.max(b,y(m[1]||""));b=r?Math.max(b,r.getFullYear()):b,w=i?Math.min(w,i.getFullYear()):w,e.yearshtml+='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';for(;b<=w;b++)e.yearshtml+='<option value="'+b+'"'+(b==n?' selected="selected"':"")+">"+b+"</option>";e.yearshtml+="</select>",c+=e.yearshtml,e.yearshtml=null}}return c+=this._get(e,"yearSuffix"),l&&(c+=(s||!a||!f?"&#xa0;":"")+h),c+="</div>",c},_adjustInstDate:function(e,t,n){var r=e.drawYear+(n=="Y"?t:0),i=e.drawMonth+(n=="M"?t:0),s=Math.min(e.selectedDay,this._getDaysInMonth(r,i))+(n=="D"?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(r,i,s)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),(n=="M"||n=="Y")&&this._notifyChange(e)},_restrictMinMax:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max"),i=n&&t<n?n:t;return i=r&&i>r?r:i,i},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return t==null?[1,1]:typeof t=="number"?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return(new Date(e,t,1)).getDay()},_canAdjustMonth:function(e,t,n,r){var i=this._getNumberOfMonths(e),s=this._daylightSavingAdjust(new Date(n,r+(t<0?t:i[0]*i[1]),1));return t<0&&s.setDate(this._getDaysInMonth(s.getFullYear(),s.getMonth())),this._isInRange(e,s)},_isInRange:function(e,t){var n=this._getMinMaxDate(e,"min"),r=this._getMinMaxDate(e,"max");return(!n||t.getTime()>=n.getTime())&&(!r||t.getTime()<=r.getTime())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t=typeof t!="string"?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,n,r){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var i=t?typeof t=="object"?t:this._daylightSavingAdjust(new Date(r,n,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),i,this._getFormatConfig(e))}}),$.fn.datepicker=function(e){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv),$.datepicker.initialized=!0);var t=Array.prototype.slice.call(arguments,1);return typeof e!="string"||e!="isDisabled"&&e!="getDate"&&e!="widget"?e=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t)):this.each(function(){typeof e=="string"?$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this].concat(t)):$.datepicker._attachDatepicker(this,e)}):$.datepicker["_"+e+"Datepicker"].apply($.datepicker,[this[0]].concat(t))},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.9.2",window["DP_jQuery_"+dpuuid]=$})(jQuery);
/*! verge 1.6.3 | viewport utils by @ryanve | @link verge.airve.com | @license MIT */
(function(g,d,f){"undefined"!=typeof module&&module.exports?module.exports=f():g[d]=f()})(this,"verge",function(){function g(e,c,b){var a={};e&&!e.nodeType&&(e=e[0]);if(e&&1===e.nodeType)return c="number"==typeof c&&!b&&c||0,e=e.getBoundingClientRect(),a.width=(a.right=e.right+c)-(a.left=e.left-c),a.height=(a.bottom=e.bottom+c)-(a.top=e.top-c),a}var d=window,f=document.documentElement,l=d.Modernizr,h=d.matchMedia||d.msMatchMedia,m=h?function(a){return!!h.call(d,a).matches}:function(){return!1},a=
function(a,c,b){return f[b]<d[c]&&m("(min-"+a+":"+d[c]+"px)")?function(){return d[c]}:function(){return f[b]}},j=a("width","innerWidth","clientWidth"),k=a("height","innerHeight","clientHeight"),a={};a.mq=!h&&l&&l.mq||m;a.matchMedia=h?function(){return h.apply(d,arguments)}:function(){return{}};a.viewportW=j;a.viewportH=k;a.scrollX=function(){return d.pageXOffset||f.scrollLeft};a.scrollY=function(){return d.pageYOffset||f.scrollTop};a.rectangle=g;a.inX=function(a,c){var b=g(a,c);return!!b&&0<=b.right&&
b.left<=j()};a.inY=function(a,c){var b=g(a,c);return!!b&&0<=b.bottom&&b.top<=k()};a.inViewport=function(a,c){var b=g(a,c);return!!b&&0<=b.bottom&&0<=b.right&&b.top<=k()&&b.left<=j()};return a});
jQuery.extend(verge);

/**			WUI.js

* Avoid 'console' errors in browsers that lack a console by defining a variable named console.
* For example, when using console.log() on a browser that does not have a console, execution of code
* will continue because the console variable is defined. 
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


/** Make sure the WUI is defined */
var Wui = Wui || {};

(function($) {
	/** AJAX error reporting and caching */
	$.ajaxSetup({ 
		cache:	false,
		error:	function(response){
						console.log(response);
						try{		var err = $.parseJSON( response.responseText ); }
						catch(e){	var err = {fatalError:'Aw Snap! There was a problem talking to the server.'}; }
						if(err != null)
							Wui.errRpt(err.fatalError);
					}
	});
	
	
	Wui.isNumeric = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	
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
	
	
	Wui.randNum = function(lower,upper) {
	    upper = upper - lower + 1 ;
	    return ( lower + Math.floor(Math.random() * upper) );
	}
	
	
	Wui.maxZ = function(){
	    return Math.max.apply(null, 
	            $.map($('body > *'), function(e,n) {
	                if ($(e).css('position') != 'static')
	                  return parseInt($(e).css('z-index')) || 1;
	            })
	        );
	};
	
	
	/** The basic WUI object */
	Wui.o = function(args){ $.extend(this,args); };
	Wui.o.prototype = {
		addToDOM:	function(obj, tgt, act){
						// Take the target and action from the passed object first if defined, then default to passed arguments, 
						// then to a default of $('body') and 'append'
						var target 	= (obj.appendTo !== undefined) ? obj.appendTo :
										(obj.prependTo !== undefined) ? obj.prependTo :
											(tgt !== undefined && tgt !== null) ? tgt : 
												(obj.parent !== undefined && obj.parent.elAlias !== undefined) ? obj.parent.elAlias :
													(obj.parent !== undefined && obj.parent.el !== undefined) ? obj.parent.el : $('body'),
							action 	= (obj.appendTo !== undefined) ? 'append' : (obj.prependTo !== undefined) ? 'prepend' : (act !== undefined && target[act]) ? act : 'append';
						
						// Try appending with WUI modifiers, else just append in good ol' jQuery fashion
						try{target[action](obj.el)}
						catch(e){
							try{target[action](obj)}
							catch(e){}
						}
						
						// Add styles
						this.cssByParam(obj);
						
						return true;
					},
		callRender:	function(){
			        	var me = this;
			        	
			        	// Add styles if they didn't get added
						me.cssByParam(me);
			        	
						if(me.onRender)  me.onRender();
			        	for(var i in me.items) if(me.items[i].callRender) me.items[i].callRender();
						if(me.afterRender)  me.afterRender();
			        },
		cssByParam: function(m) { 
                        var m = m || this;
                        
                        if(m.el && m.el.addClass){
                        	if(m.attr)	m.el.attr(m.attr);
                        	
                        	// calculate dimensions
                        	if(Wui.isNumeric(m.height))	m.el.css({height: m.height});
                        	if(Wui.isNumeric(m.width))	m.el.css({width: m.width});
                        	if(m.width && m.width.indexOf && m.width.indexOf('%') != -1)
								m.el.css({width: Math.floor((parseFloat(m.width) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).width())});
							if(m.height && m.height.indexOf && m.height.indexOf('%') != -1){
								m.el.css({height: Math.floor((parseFloat(m.height) / 100) * ($(m.el.parent())[0] == $('body')[0] ? $(window) : m.el.parent()).height())});
							}
                        	return m.el.addClass(m.cls);
                        }else{
                        	return m;
                        }
                    },
		hide:		function(speed, callback){ var args = ['fadeOut']; for(var i in arguments) args.push(arguments[i]); return this.showHide.apply(this,args);},
		place:      function(after){
                        var me = this;
						
						//adds the objects items if any
						if(me.items === undefined) me.items = [];
						for(var i in me.items){
							me.items[i].parent = me;
							if(me.items[i].place)	me.items[i].place();
							else					me.addToDOM(me.items[i]);
						}
						
                        //adds the object to the DOM and starts the recursive callRender to render properties on the children
                        me.addToDOM(me);
                        
                        // perform operations on the object after its placed on the DOM but before onRender
                        if(after && typeof after == 'function')	after(me);
                        
                        // run through a parent object and all of its children to run onRender
						if(me.parent === undefined) me.callRender();
						
                        return me;
                    },
		push:       function(){
                        var me = this;
						
						if(me.items === undefined) me.items = [];
						for(var i in arguments){
							arguments[i].parent = me;
							if(arguments[i].place)	arguments[i].place();
							else					me.addToDOM(arguments[i]);
						}		
						
						return Array.prototype.push.apply(me.items,arguments);
                    },
		remove:     function(){
                        this.el.remove();
                        delete this;
                    },
        show:		function(speed, callback){ var args = ['fadeIn']; for(var i in arguments) args.push(arguments[i]); return this.showHide.apply(this,args);},
		showHide:	function(fn,speed,callback){
				    	 var speed = (typeof speed == 'number') ? speed : 250;
				    	 if(typeof arguments[1] == 'function') callback = arguments[0];
				    	 return (this.elAlias || this.el)[fn](speed, callback);
			        },
		splice:     function(idx, howMany){
            			var me = this,
                        	el = me.elAlias || me.el;
							idx = parseInt(idx);
                        
						if(me.items === undefined) me.items = [];
						
                        //remove specified elements
                        for(var i = idx; i < (idx + howMany); i++)
                            if(me.items[i]) me.items[i].el.remove();
                        
                        //standard splice functionality on array and calcs
                        var retVal      = Array.prototype.splice.apply(me.items, arguments),
                            numAdded    = arguments.length - 2;
							
                        //append any additional el's in proper order
                        if(me.items.length == numAdded){                      //items ended up replacing the array
                            for(var i = 0; i < me.items.length; i++)          { me.addToDOM(me.items[i],el); me.items[i].parent = me; }
                        }else if(me.items[(idx + numAdded)] == undefined){    //meaning the new items were inserted at the end of the array
                            for(var i = idx; i < me.items.length; i++)        { me.addToDOM(me.items[i],me.items[i-1].el,'after'); me.items[i].parent = me; }
                        }else if (numAdded != 0){                             //items at the beginning/middle of the array
                            for(var i = (idx + numAdded); i > 0; i--)         { me.addToDOM(me.items[i-1],me.items[i].el,'before'); me.items[i-1].parent = me; }
                        }
                        
                        return retVal;
                    }
	};
	
	Wui.viewport = function(args){
		var me = this,
			params = $.extend({
				el:	$('body'),
				offset:	null,
				vPadding:	0,
				vObjects:	[],	
				calcVPadding: function(){ for(var i in me.vObjects) me.vPadding += (parseInt(me.vObjects[i]) || 0); },
				matchWindow:	null,
				contentHeight:	null,
				height:	null,
				forceMatchWin: false,
				resize:	function(){
							me.beforeResize();

							me.contentHeight = me.el.children('div:first').outerHeight(true);
							me.matchWindow = Math.round($.viewportH() - me.offset.top - me.vPadding);
							me.height = (me.matchWindow < me.contentHeight || me.forceMatchWin) ? me.matchWindow : me.contentHeight;
							me.el.height(me.height);
							me.afterResize();
						},
				beforeResize:	function(){},
				afterResize:	function(){},
				onInit:	function(){},
				DOMNodeAdded: function(){ me.resize(); },
				init: function(){
						//calculate initial values of items on page
						me.offset = me.el.offset();
						me.calcVPadding();

						//initial resizing of viewport
						me.resize();

						//tie viewport to the window
						$(window).resize(me.resize);

						//give focus to the viewport
						me.el.focus();

						//resize viewport when DOM elements are added
						me.el.bind('DOMNodeInserted', me.DOMNodeAdded);

						//allow for further extension
						me.onInit();
						
						
						/* THIS IS PROBABLY BETTER BUT IT SCREWS UP EXT :-(
						if(me.el === null) throw('WUI Viewport requires an \'el\' element to be specified.');
						
						//calculate initial values of items on page
						me.offset = me.el.offset();
						me.calcVPadding();
						
						//initial resizing of viewport
						me.resize();
						
						//tie viewport to the window
						$(window).resize(function(){me.resize();});
						
						// resize viewport when DOM elements are added
						// me.el.bind('DOMNodeInserted', me.DOMNodeAdded); DEPRECATED
						
						// add mutation observer for when things get added to the viewport
						me.el.addClass('wui-viewport').focus();
						document.addEventListener("animationstart", me.DOMNodeAdded, false); // standard + firefox
						document.addEventListener("MSAnimationStart", me.DOMNodeAdded, false); // IE
						document.addEventListener("webkitAnimationStart", me.DOMNodeAdded, false); // Chrome + Safari
						*/
					}
			},args);
			$.extend(me,params);
			me.init();
	}
	Wui.viewport.prototype = new Wui.o();


	Wui.tplt = function(args){ $.extend(this,args); }
	Wui.tplt.prototype = {
		// tplt:	null, * required
		// data:	null, * required
		make:	function(){
					var me = this;
					if(me.data !== null && me.data !== undefined && me.tplt !== null){
					    var tplCopy = me.tplt;
	                    return $(tplCopy.replace(/\{(\w*)\}/g,function(m,key){return (me.data[key] !== undefined) ? me.data[key] : "";}));
					}
					throw new Error('Template engine missing data and/or template.');
				}
	};
	
	
	Wui.dataList = function(args){
		$.extend(this,{
			el:$('<div>'),
			remoteUrl:	null,
			remoteParams:null,
			selected:	null
		},args);
		this.init();
	};
	Wui.dataList.prototype = $.extend(new Wui.o(), new Wui.tplt(), {
		getData:	function(page){
						var me = this;
						
						if(!me.waiting){
							me.waiting = true;
							
							$.ajax(me.remoteUrl, {
								data:       me.remoteParams,
								dataType:	'json',
								success:	function(response){
												me.waiting = false;
												me.data = me.processData(response).payload;
												me.el.trigger($.Event('loadData'), [me, response]);
												me.make();
											}
							});
						}
					},
		init:		function(){},
		make:		function(){
						var me = this,
							holdingData = me.data || [];

						$.each(holdingData,function(idx,rec){
							me.data = rec;
							var a = {el:Wui.tplt.prototype.make.call(me), rec:rec};
							me.el.append(
								a.el.click(function(){
									if(me.selected === a){
										a.el.removeClass('wui-selected');
										me.selected = null;
										me.el.trigger($.Event('deselect'),[me, a.el, a.rec]);
									}else{
										me.el.find('.wui-selected').removeClass('wui-selected');
										a.el.addClass('wui-selected');
										me.selected = a;
										me.el.trigger($.Event('select'), [me, a.el, a.rec]);
									}
								})
							);
						});
						me.data = holdingData;
						me.el.trigger($.Event('refresh'),[me,me.data]);
					},
		onRender:	function(){
						if(this.remoteUrl === null)	this.make();
						else						this.getData();
					},
		processData:function(r){ return r; },
		refresh:	function(){
						this.el.children().remove();
						this.onRender();
					}
	});
	
	
	Wui.button = function(args){
	    $.extend(this, {
	    	el:			$('<div>').attr({unselectable:'on'}),
			disabled:	false,
			toolTip:    null,
			text:       'Button'
	    }, args, {
			cls:		'wui-btn ' + (args.cls || '')
		});
		this.init();
	};
	Wui.button.prototype = $.extend(new Wui.o(),{
		click:      function(){},
		init:       function(){ 
	                    var me = this;
						if(me.disabled)	me.el.addClass('disabled').attr('disabled',true);
	                    
	                    me.el.click(function(e){
	                    	if(!me.disabled) me.click(arguments);
	                    	return false;
	                    })
	                    .html(me.text)
	                    .attr({title:me.toolTip});
	                },
		setDisabled:function(bool){
				        this.disabled = bool;
				        this.el.toggleClass('disabled',this.disabled);
				        
				        if(this.disabled == true)	this.el.attr('disabled',true);
				        else						this.el.removeAttr('disabled');
			        },
		setText:    function(txt){ return this.el.html(txt); },
	});
	
	
	Wui.pane = function(args){ 
		$.extend(this,{
			bbar:       [],
			border:		true,
			borderStyle:{borderWidth:6},
			tbar:       [],
			title:		null
		},args); 
		this.init();
	}
	Wui.pane.prototype = $.extend(new Wui.o(),{
        init:		function(wuiPane){
						var me = wuiPane || this;
						me.el		 = $('<div>').addClass('wui-pane').append(
										   $('<div>').addClass('wui-pane-wrap').append(
											   me.container = $('<div>').addClass('wui-pane-content')
										   )
									   );
						me.sureEl	 = me.el;
						me.header    = new Wui.o({el:$('<div>'), cls:'wui-pane-header', items:me.tbar, appendTo:me.el});
	                    me.footer    = new Wui.o({el:$('<div>'), cls:'wui-pane-footer', items:me.bbar, appendTo:me.el});
	                    me.elAlias	 = me.container;
	                    
	                    // Set  border if applicable
	                    if(me.border) me.el.css(me.borderStyle);
	                    
	                    // Add header and footer to the pane if theres something to put in them
	                    if(me.bbar.length != 0) me.placeFooter();
	                    if(me.tbar.length != 0 || me.title !== null){
	                        me.placeHeader();
	                        
	                        // Set the title on the pane
		                    if(me.title !== null){
			                    me.header.el.append($("<h1>"));
								me.setTitle(me.title);
		                    }
	                    }
					},
		placeFooter:function(){
						this.sureEl.css({borderBottom:'none'});
						this.sureEl.children('.wui-pane-wrap').css({paddingBottom:'40px'});
						this.footer.place();
					},
		placeHeader:function(){
						this.sureEl.css({borderTop:'none'});
						this.sureEl.children('.wui-pane-wrap').css({paddingTop:'40px'});
						this.header.place();
					},
		setTitle:   function(t){ this.header.el.children('h1:first').text(t); }
	});
	
	Wui.window = function(args){ 
		$.extend(this,{
			bbar:       [],
			border:		false,
			height:		400,
			isModal:	false,
			onWinClose:	function(){},
			onWinOpen:	function(){},
			tbar:       [], 
			title:		'Window',
			width:		600
		},args);  
		this.init(); 
	}
	Wui.window.prototype = $.extend(new Wui.pane(),{
		close:		function(){ 
						var me = this;
						if(me.onWinClose(me) !== false){
							me.windowEl.trigger($.Event('close'),[me]);
							me.remove();
						}
					},
		init:       function(){
            	        var me = this;
	    				me.appendTo = $('body');
	    				
            	        // Make it a modal window & add everything to the DOM
            	        if(me.isModal){
            	        	me.modalEl = $('<div>').addClass('wui-overlay');
            	        	$('body').append(me.appendTo = me.modalEl.css('z-index',Wui.maxZ() + 1));
            	        }
            	        
            	        // Add close buttons where appropriate
            	        me.tbar.push(new Wui.button({click:function(){me.close()}, text:'X'}));
            	        if(me.bbar.length == 0) me.bbar = [new Wui.button({click:function(){me.close()}, text:'Close'})];
            	        
            	        // Calls the parent init function
            	        Wui.pane.prototype.init(me);
            	        
            	        // Add window specific properties
            	        me.windowEl = me.el
            	        .draggable({handle: me.header.el, start:bringToFront})
            	        .addClass('wui-window')
            	        .resizable({
                            minWidth:	me.width,
                            minHeight:	me.height,
                            resize:		function(){ me.container.trigger($.Event('resize'),[me.container.width(), me.container.height()]); }
                        })
                        .css('z-index',Wui.maxZ() + 1)
                        .click(bringToFront);
                        
                        me.place();
                        
                        // Resize the window and center
                        me.resize();
                        
                        // Make the overlay the el so that when the window is closed it gets taken with it
                        if(me.isModal)	me.el = me.modalEl;
                        
                        this.onWinOpen(me);
						me.windowEl.trigger($.Event('open'),[me]);
                        
                        function bringToFront(){
                            if(parseInt((me.el.css('z-index')) || 1) < Wui.maxZ()){
                                me.el.css('z-index',Wui.maxZ() + 1);
                            }
                        }
                    },
        resize:		function(resizeWidth, resizeHeight){
				        var me = this,
							totalHeight = me.container[0].scrollHeight + (me.header.el.outerHeight() * 2);
						
						//size the window to according to arguments, or fit its contents as long as its snaller than the height of the window
						if(arguments.length != 0) me.windowEl.height(me.height = resizeHeight).width(me.width = resizeWidth);
				        else					  me.windowEl.height(((totalHeight >= $.viewportH()) ? ($.viewportH() - 10) : totalHeight));
				        
						// Center window
						me.windowEl.css({
							top:		Math.floor(($.viewportH() / 2) - (me.windowEl.height() / 2)) + 'px',
							left:		(!me.isModal) ? Math.floor(($.viewportW() / 2) - (me.windowEl.width() / 2)) + 'px' : '',
							position:	(!me.isModal) ? 'absolute' : ''
						});
						
						me.container.trigger($.Event('resize'),[me.container.width(), me.container.height()]);
			        }
	});
	
	
	Wui.errRpt = function(errMsg, msgTitle, buttons, callback){
		var newErr = new Wui.window({
			isModal:    true,
		    title:		msgTitle || 'Error', 
			items:    	[new Wui.o({el:$('<p>').addClass('err').html(errMsg) })], 
			width:		350, 
			height:		200,
			bbar:		buttons || [],
			onWinClose:	callback || function(){}
		});
		return false;
	}
	
	
	Wui.Msg = function(msg, msgTitle, callback, content){
	    var cntnt   = (content !== undefined) ? [new Wui.o({el: $('<p>').html(msg) }), content] : [new Wui.o({el: $('<p>').html(msg) })],
	        msg  = new Wui.window({
				title:      msgTitle || 'Message', 
				isModal:    true,
				items:      cntnt, 
				width:      350, 
				height:     200,
				onWinClose: callback || function(){}
			});
			return true;
	}
	
	
	Wui.confirm = function(msg, msgTitle, callback, content){
	    var itms   = (content !== undefined) ? [new Wui.o({el: $('<p>').html(msg) }), content] : [new Wui.o({el: $('<p>').html(msg) })],
	        Msg  = new Wui.window({
				title:      msgTitle || 'Confirm',
				bbar:		[
								new Wui.button({text:'No', click:function(){ Msg.doAnswer(false); }}),
								new Wui.button({text:'Yes', click:function(){ Msg.doAnswer(true); }})
							],
				isModal:    true,
				items:      itms, 
				width:      350, 
				height:     200,
				doAnswer:	function(ans){
								if(callback && typeof callback == 'function')	callback(ans);
								Msg.answerRun = true;
								Msg.close();
							},
				onWinClose: function(){ return ((Msg.answerRun !== true) ? false : Msg.answerRun); }
			});
	    return true;
	}
	
	
	Wui.HelpWindow = function(msgTitle, src, width, height, callback){
	    var cntnt = [new Wui.o({el: $('<iframe>').attr({src:src}).css({height:'100%',width:'100%', border:'none'})})],
			newErr  = new Wui.window({
				title:      msgTitle || 'Message', 
				items:      cntnt, 
				width:      width || 600, 
				height:     height || 400,
				onWinClose: callback || function(){}
			});
	    return true;
	}
}(jQuery));

/**			FORMS.js 08/27/2013 **/
(function($) {
	Wui.form = function(args){
	    $.extend(this,{
			afterCreate:function(){},
			disabled:	false,
			errCls:		'wui-form-err',
			labelPos:	'top'
		}, args);
		$.extend(this, {
	    	cls: 		'wui-form labels-' + this.labelPos + ((this.cls !== undefined) ? ' ' + this.cls : ''),
			dataValid:  null,
			el:			$('<div>'),
			errs:       []
	    });
	};
	Wui.form.prototype = $.extend(new Wui.o(),{
		clearData:  function(){ this.setData(); },
		dispErrs:   function(){
	                    var msg = '';
	                    for(var e in this.errs) msg += this.errs[e] + '<br/>';
	                    Wui.errRpt(msg,'Form Errors')
	                },
		forItems:	function(f){
						for(var i = this.items.length - 1; i >= 0; i--)
							if(this.items[i].val && typeof this.items[i].val == 'function')
								f(this.items[i],i);
						return true;
			    	},
		getData:    function(){
	                    if(this.validate())	{ return this.getRawData(); }
	                    else				{ this.dispErrs(); return false; }
	                },
	    getField:   function(fieldname){
	                    var retval = null;
	                    this.forItems(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
	                    return retval;
	                },
		getRawData: function(){
	                    var ret = {};
	                    this.forItems(function(itm){ ret[itm.name] = itm.val(); });
	                    return ret;
	                },
		normFrmItem:function(itm){
						var me = this;
						if(itm.ftype && !(itm instanceof Wui.frmField)){
							var ft = itm.ftype.split('.');
							if(window[ft[0]] && window[ft[0]][ft[1]])	return new window[ft[0]][ft[1]]( $.extend(itm,{disabled:me.disabled}) );
							else										throw('Object type ' +itm.ftype+ ' is not defined.');
						}else if(itm instanceof Wui.frmField){
							return $.extend(itm,{disabled:me.disabled});
						}else{
							return itm;
						}
					},
		place:      function(){
						var me = this;
						if(me.items === undefined) me.items = [];
						$.each(me.items, function(i,itm){ me.items[i] = me.normFrmItem(itm); });
						Wui.o.prototype.place.call(this);
		                this.afterCreate();
                    },
		push:		function(){
						for(var i in arguments) arguments[i] = this.normFrmItem(arguments[i]);
						Wui.o.prototype.push.apply(this,arguments);
					},
		remFrmItm:	function(fieldname){
	                    var me = this;
						this.forItems(function(itm,idx){ if(itm.name == fieldname) Wui.o.prototype.splice.call(me,idx,1); });
	                    return true;
					},
		setData:    function(d){
	                    this.forItems(function(itm){ itm.val((d) ? d[itm.name] : null); });
	                },
		setDisabled:function(val){
						return this.forItems(function(itm){ itm.setDisabled(val); });
					},
		setField:   function(fieldname, d){
		                this.forItems(function(itm){ if(itm.name == fieldname) itm.val(d); });
	            	},
		throwErr:   function(m){this.errs.push(m); return false;},
		validate:   function(){
		                var me = this;
						me.errs = [];
		                me.forItems(function(itm){ 
		                	if(itm.el && itm.el.toggleClass) { itm.el.toggleClass(me.errCls,!itm.validate()); }
		                });
		                return (me.errs.length == 0);
	            	}
	});
	
	
	/* WUI FormField */
	Wui.frmField = function(args){
		$.extend(this,{
			disabled:	false,
			invalidMsg: null,
			label:      null,
			labelCls:	null,
			required:   false,
			validRegEx:	null,
			validTest:  null
		},args);
	};
	Wui.frmField.prototype = $.extend(new Wui.o(),{
		init:  		function(){
                        this.el = $('<div>').addClass('wui-fe');
        				if(this.label !== null && this.label.length > 0){
                        	this.lbl = new Wui.label({text:this.label,cls:this.labelCls});
                        	this.el.prepend(this.lbl.el);
                        }
						return this.el;
                    },
		onRender:	function(){ if(this.disabled) this.setDisabled(this.disabled); },
        setDisabled:function(val){
						this.disabled = val;
						if(this.el !== null && this.el.addClass){
							if(val)		this.el.addClass('wui-disabled').find('input,textarea,iframe').attr('disabled','disabled');
							else		this.el.removeClass('wui-disabled').find('.wui-disabled,*[disabled=disabled]').removeAttr('disabled');
							return true;
						}else{
							return false;
						}
					},
        validate:   function(){
                        var me = this,
                        	errMsg = (me.invalidMsg !== null) ? me.invalidMsg : 
                        				(me.label != null ) ? 'A value for \'' +me.label+ '\' is required.' :
                        					(me.attr !== undefined && me.attr.name !== undefined) ? 'A value for \'' +me.attr.name+ '\' is required.' :
                        						"A required field has an improper value.";
                        
                        // If a custom test is defined 
                        if(me.validTest !== null && typeof me.validTest == 'function')
                        	if(me.validTest() == false)
                        		return me.parent.throwErr(errMsg);
                        						
                        // If a regular expression is defined for a test, this will be tested first
        				if(me.validRegEx !== null)
        					if(!me.validRegEx.test($.trim(me.val())))
        						return me.parent.throwErr(errMsg);
                        					
                        // If no regular expression test exists, test whether a value is required and throw an error if blank
                        if(me.required && $.trim(me.val()).length == 0) return me.parent.throwErr(errMsg);
                        
                        // Default return value is true
                        return true;
                    }
	});
	
	
	/* WUI Label */
	Wui.label = function(args){ 
		$.extend(this,{ text:'' },args); 
		this.init(); 
	};
	Wui.label.prototype = $.extend(new Wui.o(),{
		init:       function(){ this.el = $('<label>').html(this.text); }
    });
	
	
	/* WUI Note */
	Wui.note = function(args){ 
		$.extend(this,{
			el:		null
		},args,{
			cls:		'wui-note ' + (args.cls || '')
		});
		this.init(); 
	};
	Wui.note.prototype = $.extend(new Wui.o(),{
		init:       function(){ this.el = $('<p>').html(this.label); }
    });
	
	
	/* WUI Hidden */
	Wui.hidden = function(args){ $.extend(this,{el:null, value:null,},args); this.init(); };
	Wui.hidden.prototype = $.extend(new Wui.frmField(),{
		init:       function(){},  
        val:        function(setVal) {
                        if (setVal === undefined)   return this.value;
                        else                        this.value = setVal;
                    }
    });
	
	
	/* WUI Text */
	Wui.text = function(args){
		$.extend(this,{
			blankCls:   'empty',
			blankText:  ''
		},args,{
			field:$('<input>').attr({type:'text'})
		}); 
		this.init();
	};
	Wui.text.prototype = $.extend(new Wui.frmField(),{
		init:		function(){
            			Wui.frmField.prototype.init.call(this);
                        this.el.append(Wui.text.prototype.setListenrs.call(this,this));
                    },
        setBlankText:function(val){
                        var me = this;
        				me.blankText = val;
                        me.el.val(me.blankText);
                        me.el.addClass(me.blankCls);
                    },
		setListenrs:function(t){
                        var me = this;
        				t.field.val(me.blankText).addClass(me.blankCls)
                        .focusin(function() { if(me.field.val() == me.blankText) me.field.val(''); me.field.removeClass(me.blankCls); })
                        .blur(function()    { if(!(Wui.text.prototype.val.call(me) != null && Wui.text.prototype.val.call(me).length != 0)) me.val(); })
                        .keydown(function() { if(me.field.val() == me.blankText) me.field.val(''); me.field.removeClass(me.blankCls); });
						
						if(this.setListenrs !== Wui.text.prototype.setListenrs) this.setListenrs(this);
						
                        return t.field;
                    },
        val:		function(setVal) {
                        var me = this,
                        v = me.field.val();
                            
                        if(v === me.blankText || v == '' || v === null){
                            me.field.val(me.blankText);
                            me.field.addClass(me.blankCls);
                        }
                        if (setVal === undefined){
                            return ((v == me.blankText) ? '' : v);
                        }else{
                            if(setVal == ''){
                                me.field.val(me.blankText);
                            }else{
                                me.field.removeClass(me.blankCls).val(setVal);
                            }
                        }
                    }
    });

	
	/* WUI Text Area */
	Wui.textarea = function(args){
	    $.extend(this, args, {
			field:$('<textarea>')
		});
	    this.init();
	};
	Wui.textarea.prototype = $.extend(new Wui.text(),{
		init:   	function(){
	                    Wui.text.prototype.init.call(this);
	                    this.el.append(this.field).css({height:'auto'});
	                    this.field.height(this.height);
	                }
	});
	
	
	/* WUI WYSIWYG */
	Wui.wysiwyg = function(args){
	    $.extend(this,{
			showHTML:	false
		},args,{
			blankText:null,
			field:$('<textarea>')
		});
	    this.init();
	};
	Wui.wysiwyg.prototype = $.extend(new Wui.textarea(),{
		onRender:	function(){
                    	var tb = [['bold','italic','underline','strikethrough'], 
                    	          ['link','unlink','unorderedlist','orderedlist'],
                                  ['justifyleft','justifycenter','justifyright']];
                    	if(this.showHTML) tb.push(['html']);
			
						this.field.htmlarea({
                            css: 		'body { color:#333; font:90%  Arial, Verdana, Helvetica, sans-serif !important; overflow:hidden; }' +
                                 		'a {color:#09c; text-decoration:none;} a:hover {color:#0c9; text-decoration:underline;}',
                            toolbar:	tb,
                            loaded:		function(){}
                        });
						
                        var iframe = this.field.parent('.wui-html').height(this.height).find('iframe');
                        this.field.attr({tabindex:'-1'});
                        this.field.parent('.wui-html').resizable({
                            animateEasing: 'linear',
                            minWidth:   this.field.outerWidth(),
                            maxWidth:	this.field.outerWidth(),
                            minHeight:  this.field.parent('.wui-html').find('.tools').outerHeight() * 3,
                            start:      function(evnt, ui){ this.iFrameOrigHeight = iframe.height(); },
                            resize:     function(evnt, ui){ iframe.height(ui.size.height - (ui.originalSize.height - this.iFrameOrigHeight)); },
                            handles:	'se'
                        });
						Wui.frmField.prototype.onRender.call(this);
                    },
        val:    	function(setVal){
                        if(setVal === undefined)    {return this.field.val();}
                        else                        {this.field.val(((setVal !== null) ? setVal : '')); this.field.keyup();}
                    }
	});
	
	
	/* WUI Radio */
	Wui.radio = function(args){ 
		$.extend(this,{
			buttonStyle:false,
			name:       'wui-radio',
			options:    [],
			onChange:   function(){},
			tplt:		'<li><input type="radio" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
		},args,{
			el:$('<div>')
		});
		this.init();
	};
	Wui.radio.prototype = $.extend(new Wui.frmField(),{
		init:       function(){
        				Wui.frmField.prototype.init.call(this);
        				this.el.addClass('wui-radio');
						
        				var me = this,
							tplEngine = new Wui.tplt({ tplt:this.tplt }),
							ul = $('<ul>');
							
						//make radio group look like buttons
						if(me.buttonStyle) ul.addClass('button');
						
						me.el.append(ul);
						$.each(me.options,function(i,itm){
							itm.name = me.name;
					        itm.id = me.name + '-' + i;
					        ul.append(
					        	tplEngine.make(tplEngine.data = itm)
					        	.children('label').attr({unselectable:'on'}).end()
					        	.children('input')
					        	.change(function(){ me.itmChange($(this)); })
					        	.focus(function(){ul.addClass('has-focus');})
					        	.blur(function(){ul.removeClass('has-focus');})
					        	.end()
					        );
						});
                    },
		itmChange:	function(elem){
			        	this.value = elem.val();
					    this.onChange(this);
			        },
		onRender:	function(){
				        var me = this;
        				me.el.find('input').each(function(){
					        $(this).css({ margin:'0 5px 0' + ((me.buttonStyle ? -1 : 0) * (5 + $(this).outerWidth())) + 'px' });
				        });
						Wui.frmField.prototype.onRender.call(this);
			        },
        val:        function(setVal){
                        if(setVal === undefined){
                            return this.value;
                        }else{
                            this.value = setVal;
                            this.el.find("input[value='" + setVal + "']").attr('checked',true);
                        }
                        
                        this.onChange(this);
                    }
	});


	/* WUI Checkbox */
	Wui.checkbox = function(args){ 
		$.extend(this,{
			name:   'wui-checkbox',
			tplt:	'<li><input type="checkbox" id="{id}" value="{val}" name="{name}" /><label for="{id}">{title}</label></li>'
		},args);
	this.init(); };
	Wui.checkbox.prototype = $.extend(new Wui.radio(),{
        calcVal:	function(){
						var me = this;
        				me.value = [];
        				me.el.find('input:checked').each(function(){
			        		me.value.push($(this).attr('value'));
			        	});
						return ((me.value.length > 0) ? (me.value.length > 1) ? me.value : me.value[0] : 0);
					},
		init:       function(){
                        if(this.options.length == 0) this.options.push({val:1,title:''});
        				
                        Wui.radio.prototype.init.call(this);
        				this.el.removeClass('wui-radio').addClass('wui-checkbox');
						
        				//steal label if button style
        				if(this.options.length == 1){
        					this.el.find('li label').text(this.el.children('label').text());
        					this.el.children('label').text('');
        				}
                    },
        itmChange:	function(elem){
			        	this.onChange(this.calcVal());
			        },
        val:        function(setVal){
                        var me = this;
        	
        				if(setVal === undefined){
                            return this.calcVal();
                        }else{
                            if(me.options.length == 1 && (typeof setVal == 'number' || typeof setVal == 'string')){
								me.el.find('input').attr('checked',!!setVal).siblings('li').toggleClass('checked',!!setVal);
							}else{
								// clear out all checkboxes
								me.el.find('input').attr('checked',false);
								me.el.find('label').removeClass('checked');
								
								// set the ones passed in
								$.each(setVal, function(i,v){
									me.el.find('input[value=' +v+ ']').attr('checked',true).siblings('li').addClass('checked');
								});
							}
                        	me.onChange(me.calcVal());
                        }
                    },
		validTest:	function(){ if(this.required && this.val() == 0) return false;	return true; }
	});


	/* WUI Combo */
	Wui.combo = function(args){ 
		$.extend(this, {
			autoLoad:   false,
			data:       [],
			dataChanged:function(newData){},
			dd:			null,
			ddCls:		'',
			doSearch:   function(){},
			emptyText:  '(empty)',
			field:$('<input>').attr({type:'text'}),
			inputTarget:null,
			keepInline:	false,
			minKeys:    2,
			onBlur:     function(){},
			onError:    function(){},
			selectItm:  null,
			titleItem:  null,
			value:      null,
			valueItem:  null,
			remoteParams:{},
			remoteUrl:  null,
			remoteWait: false,
			unsearched: null,
			valChange:  function(){}
		},args,{
			cls:(args.cls) ? args.cls + ' wui-combo' : 'wui-combo',
		}); 
		
		// Create template when one hasn't been defined
		if(	this.hasOwnProperty('valueItem') && this.hasOwnProperty('titleItem') && !this.hasOwnProperty('template') && this.valueItem.length &&
			 this.valueItem.length > 0 && this.titleItem.length && this.titleItem.length > 0) this.template = '<li>{' +this.titleItem+ '}</li>';

		this.init(); 
	};
	Wui.combo.prototype = $.extend(new Wui.text(),{
		enterKey:   function(){
                        if(this.selectItm !== null)   this.selectItm.click();
                    },
		keyDown:    function(){
                        if(!this.dd.is(':visible')){
                            this.selectCurr();
                            this.showDD();
                        }else{
                            var si = (this.selectItm === null) ? 0 : this.selectItm.index();
                            var idx = (si == this.data.length - 1) ? 0 : si + 1;
                            this.rsltHover(this.dd.children(':eq(' + idx + ')'));
                        }
                    },
        keyUp:      function(){
                        if(this.selectItm !== null){
                            var idx = this.selectItm.index() - 1;
                            
                            if(idx < 0){
                                this.field.focus();
                                this.dd.children().removeClass('selected');
                                this.selectItm = null;
                            }else{
                                this.rsltHover(this.dd.children(':eq(' + idx + ')'));
                            } 
                        }
                    },
		hideDD:     function(){this.dd.hide();},
		init:       function(){
                        var me = this,
							ddAddCls = (me.keepInline) ? 'wui-inline-dd' : '';
                        
						//setup template engine
                        me.tplEngine = new Wui.tplt({tplt:me.template});
                        
                        //put field inside a wrapper and add drop down switch if part of a form
                        if(me.dd === null){
                            Wui.text.prototype.init.call(me);
							me.wrapper = $('<div>').addClass('dd-wrapper');
                        	me.ddSwitch = new Wui.button({
		                        click:		function(){
					                            if(!me.dd.is(':visible')){
					                                me.field.focus();
					                                me.selectCurr();
					                                me.showDD();
					                            }else{
					                                me.hideDD();
					                            }
					                        },
		                        text:		'',
		                        attr:		{tabindex:-1},
		                        appendTo:	me.wrapper,
		                        cls: 		'field-btn dd-switch'
		                    });
                            
							me.wrapper.append(
	                        	me.dd = $('<ul>').addClass('wui-combo-dd ' + ddAddCls + ' ' + me.ddCls),
	                        	me.field.addClass('has-dd')
	                        ).appendTo(me.el);
                            me.ddSwitch.place();
                        }else{
							Wui.text.prototype.setListenrs.call(me,me);
						}
						
                        if(me.autoLoad)   me.loadData();
                        else              me.renderData();
                    },
		loadData:   function(ajaxSuccess){
                        var me = this;
                        $.ajax(me.remoteUrl, {
                            data:       me.remoteParams,
                            dataType:	'json',
                            success:    function(d){ 
                                            if(ajaxSuccess !== undefined && typeof ajaxSuccess == 'function')   ajaxSuccess.call(this,d);
                                            else                                                                me.setData(d.payload);
                                        },
                            error:      function(e){
                                            me.dd.html(this.emptyText);
                                            me.remoteWait = false;
                                            me.onError(e);
                                        }
                        });
                    },
		renderData: function(){
                        var me = this,
                        	holder = $('<ul>');
                        me.dd.html('');
                        if(this.data.length > 0){ 
                            for(var i = 0; i < this.data.length; i++){
	                            me.tplEngine.data = this.data[i];
                                holder.append(me.tplEngine.make()
		                            .mouseenter(function(evnt){ me.rsltHover(evnt); })
		                            .mousedown(function(e){me.field.isBlurring = false;})
		                            .click(function(){ me.rsltClick(); }));
                            }
                            me.dd.append(holder.children().unwrap());
                        }else{ 
                            me.dd.html(this.emptyText);
                        }
                        
                        return true;
                    }, 
        rsltClick:  function(){
                        this.hideDD();
                        this.val(this.data[this.selectItm.index()]);
                    },
		rsltHover:  function(itmTarget){
                        if(itmTarget.addClass === undefined) {var itmTarget = $(itmTarget.currentTarget);}
                        this.dd.children().removeClass('selected');
                        this.selectItm = itmTarget;
                        this.selectItm.addClass('selected');
                    },
		searchData: function(srchVal){
                        var me = this;
                        if(me.remoteUrl !== null && srchVal.length > me.minKeys){
                            if(me.remoteWait == false){
                                me.remoteWait = true;
                                $.extend(me.remoteParams,{srch: srchVal});
                                me.loadData(
                                    function(d){ 
                                        if(d.payload)   me.setData(d.payload);  //assumes that incoming json data will be in a 'payload' array
                                        me.remoteWait = false;
                                        if(me.unsearched !== null){
                                            var a = me.unsearched;
                                            me.unsearched = null;
                                            me.searchData(a);
                                        }
                                    }
                                );
                            }else{
                                me.unsearched = srchVal;
                            }
                        }else{
                            me.showDD();
                            me.rsltHover(me.dd.children(':contains(' +srchVal+ '):first'));
                        }
                    },
        selectCurr: function(i){
                        if(i === undefined && this.value !== null){
                            for(var d in this.data){
                                if(this.data[d][this.valueItem] === (this.value[this.valueItem] || this.value))   { i = d; break; }
                            }
                        }
                        this.rsltHover(this.dd.children(':eq(' +i+ ')'));
                    },
		setData:    function(newData){
                        this.data = newData;
                        this.renderData();
                        this.dataChanged(newData);
                    },
		setListenrs:function(t){
                        t.field.focus(function(e){
                            t.field.isBlurring = undefined;
                        })
                        .blur(function(e){
                            if(t.field.isBlurring !== false){
                                t.hideDD();
                                t.onBlur();
                            }
                         })
                        .click(function(){
                            t.showDD();
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
                            if(currVal.length == 0) t.value = null;
                            
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
                                    t.selectItm.siblings(':lt(' +t.selectItm.index()+ ')').each(function(){ beforeHeight+= $(this).outerHeight(); });
                                    t.selectItm.parent().animate({scrollTop:beforeHeight}, 100);
                                }
                            }
                        });
                        return t.field;
                    },
		showDD:     function(){
						if(!this.keepInline){
							var fld		= this.field,
								ofst	= fld.offset(),
								ddWid	= parseInt(this.dd.css('width')),
								width	= (ddWid && ddWid > fld.outerWidth()) ? ddWid : fld.outerWidth() - 1;
							
							this.dd.appendTo('body').css({
								left:	ofst.left + ((ofst.left + width < $.viewportW()) ? 0 : fld.outerWidth() - width),
								top:	ofst.top + fld.outerHeight(),
								width:	width,
								display:'block',
								zIndex:	Wui.maxZ()
							});
						}else{
							this.dd.css({ zIndex:Wui.maxZ() }).show();
						}
					},
        val:        function(setVal){        
        				var me = this;
						if(setVal === undefined){
                            return (me.value === null || typeof me.value != 'object') ? me.value : me.value[me.valueItem];
                        }else{
                            if(setVal === null){
                                me.value = {};
                                me.data = [];
                                me.renderData();
								Wui.text.prototype.val.call(me,'');
                            }else if(typeof setVal == 'object'){
                                me.value = setVal;
                                
                                //add the piece of data to the dd data if it does not exist there
                                var addData = true;
                                for(var d in me.data) if(me.data[d] == setVal) addData = false;
                                if(addData){
                                    me.data.push(me.value);
                                    me.renderData();
                                }
                                var selectVal = me.value[me.valueItem];
                            }else{
                                me.value = setVal;
                                var selectVal = me.value;
                            }
                            
                            //select the item out of the data set
                            for(var d in me.data){
                                if(me.data[d][me.valueItem] === selectVal){
                                    me.selectCurr(d);
									Wui.text.prototype.val.call(me,me.data[d][me.titleItem]);
                                    break;
                                }
                            }
                            
                            me.valChange();
                            return setVal;
                        }
                    }
	});


	
	/* WUI Link */
	Wui.link = function(args){ 
		$.extend(this,{
			invalidMsg: 'The value for \'' + ((this.label) ? this.label : (this.args && this.args.name) ? this.args.name : 'a link field') + '\' is not a properly formatted link.',
			target:     '_self',
			title:      null,
			uri:        null
		},args);
		this.init();
	};
	Wui.link.prototype = $.extend(new Wui.frmField(),{
		buildOutput:function(){
                         if(this.outputFld === undefined)	this.elAlias.append(this.outputFld = $('<div>').attr({tabindex:-1}).addClass('feedback'));
        	
        				if(this.testLink()){
                            this.outputFld.html('Preview: ');
                            this.outputFld.append($('<span/>').append($("<a>").attr({href:this.uri, target:'_blank'}).text(this.title)));
                            if(this.target == '_blank')    this.outputFld.append($('<span>').addClass('uri-new-win'));    
                        }else{
                            this.outputFld.html('Your link is improperly formatted.');
                        }
                            
                    },
		init:       function(){
                        var me = this;
                        
                        me.items = [
                        	me.urlField = new Wui.text({cls:'wui-link-third wui-link-focus', blankText:'URL', linkData:'uri'}),
                        	me.titleField = new Wui.text({cls:'wui-link-third', blankText:'Display Text', linkData:'title'}),
                        	me.targetField = new Wui.combo({
	                            cls:'wui-link-third no-margin', valueItem: 'target', titleItem:'name', template: '<li>{name}</li>', blankText:'Target', keepInline:true,
	                            data:[{target:'_self', name:'Opens In Same Window'}, {target:'_blank', name:'Opens In New Window/Tab'}], linkData:'target'
	                        })
                        ];
                        
                        Wui.frmField.prototype.init.call(me);
                        
                        me.el.append(me.elAlias = $('<div>').addClass('wui-hyperlink'));
                        
                        //additional listeners and initial value for target
                        me.setLisners(me.urlField,me.titleField,me.targetField);
                        me.targetField.val(me.target);
                       
                        me.urlField.field.keyup(function(e){
                            //sets the title the same as the url - for laziness' sake
                        	if(me.titleField.field.val() == me.titleField.blankText)
                        		me.title = null;
                            if(me.title === null)
                            	me.titleField.val($(this).val());
                        })
                        .blur(function(){me.title = me.titleField.val()});
                    },
		setLisners: function(){
                        var me = this,
                        	flds = arguments;
                        	
                        $.each(flds,function(idx,itm){
	                        (itm.field.field || itm.field).on('blur click keyup keydown mousedown', null, itm, function(e){
                                var wuiObjVal = (e.data.field.val) ? e.data.field.val() : e.data.val();
                            	if(wuiObjVal !== null && wuiObjVal != {})
                                me[e.data.linkData] = wuiObjVal;
                                me.buildOutput();
                            })
                            .on('focus',null, itm, function(e){
                                for(var i in flds)
                                    flds[i].el.removeClass('wui-link-focus');
                                e.data.el.addClass('wui-link-focus');
                            });
                        });
                    },       
            
        testLink:   function isUrl() {
                        var fullPath = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                        var relativePath = /(\/|\/([\w#!:.?+=&%@!\-\/]))/
                        return (fullPath.test(this.uri) || relativePath.test(this.uri));
                    },   
        val:        function(setVal){
                        if(setVal === undefined){
                            return {uri:this.uri, target:this.target, title:this.title};
                        }else{
                            $.extend(this,setVal);
                            this.urlField.val(this.uri);
                            this.titleField.val(this.title);
                            this.targetField.val(this.target);
                            this.buildOutput();
                        }
                    },
		validTest:	function(){ if(this.required && !this.testLink()) return false; return true; }
	});
    
    
    /* WUI DateTime */
	Wui.datetime = function(args){ 
		$.extend(this,{
			valChange:	function(val){}
		},args,{
			field:		$('<input>').attr({type:'text'})
		});
		this.init();
	};
	Wui.datetime.prototype = $.extend(new Wui.text(),{
		second:         1e3,
        minute:         6e4,
        hour:           36e5,
        day:            864e5,
        days:           ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],
        shortDays:      ["sun","mon","tue","wed","thu","fri","sat"],
        months:         ["january","february","march","april","may","june","july","august","september","october","november","december"],
        shortMonths:    ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
        sarcasmArray:   ["Not quite.","Huh?","Nope","Arg..","Sorry","What?","Bleck.","Nuh-uh.","Keep Trying.","No Entiendo."],
        minDate:        null,
		prevText:       null,
        value:          null,
		
        displayDate:    function(overrideText){
                            var me = this;
        					//fire the valChange event when the data changes from typing or calendar selection
                            me.valChange(me.value);
                            
                            // process current date value
                            if(overrideText != undefined){ me.displayDiv.html(overrideText); return; }
                            if(me.value == "" || me.value === null) { return; }
                            
                            //validation for min-date
                            var formattedDate = me.formatDateTime(me.value);
                            if(!(me.minDate != null && me.value < me.minDate)){
                                me.displayDiv.html(formattedDate.date + ' ' + formattedDate.time);
                            }else{
                                me.displayDiv.html('Less than minimum required date of ' + 
                                                    (me.minDate.getMonth() + 1) + '-' + me.minDate.getDate() + '-' + me.minDate.getFullYear());
                            }
                            
                            return  (me.value.getMonth() + 1) + '/' + me.value.getDate() + '/' + me.value.getFullYear() + ' ' + formattedDate.time;
                        },
         formatDateTime:function(dateObj){
					        if(dateObj instanceof Date){
						        var hours = dateObj.getHours(),
	                                minutes = dateObj.getMinutes(),
	                                formattedTime = ((hours < 13) ? (hours > 9) ? hours : '0' + hours : (hours - 12)) + ':' + 
	                                ((minutes > 9) ? minutes : '0' + minutes) + ' ' + 
	                                ((hours < 12) ? 'AM' : 'PM'),
	                                formattedDt = (this.days[dateObj.getDay()].substr(0,3)) + ' ' + 
	                                            (dateObj.getMonth() + 1) + '-' + dateObj.getDate() + '-' + 
	                                            dateObj.getFullYear();
								return {date:formattedDt, time:formattedTime};
					        }else{
						        return {date:'Invalid', time:'Invalid'};
					        }
					        
				        },
		 getM:          function(num){
                            var magnitude = 0;
                            while((num = num / 10) >= 1)    magnitude++
                            return magnitude;
                        },
		init:           function(){
                            var me = this;
        					Wui.text.prototype.init.call(me);
                            me.el.append(
                                $('<div>').addClass('wui-date').append(
                                    me.setListenrs(me),
                                    me.displayDiv = $("<div>").addClass('feedback').attr({tabindex:-1})
                                )
                            );
                                
                            //add jQuery datepicker (calendar) to the field
                            me.field.datepicker({
                                autoSize:       true,
                                buttonText:     '',
                                showOn:         'button',
                                minDate:        me.minDate,
                                constrainInput: false,
                                beforeShow:     function(txtElem, pickerObj){
                                                    if(me.validDate(me.value))  me.field.datepicker('setDate',me.value);
                                                    else                        me.val('');
                                                },
                                onSelect:       function(dateString, pickerObj){
                                                    if(me.value !== null){
                                                        me.value.setDate(pickerObj.selectedDay);
                                                        me.value.setMonth(pickerObj.selectedMonth);
                                                        me.value.setYear(pickerObj.selectedYear);
                                                    }else{
                                                        me.value = me.field.datepicker('getDate');
                                                    }
                                                    me.val(me.displayDate());
                                                }
                            });
                            me.el.find('.ui-datepicker-trigger').attr({tabindex:-1});
                        },
		num2Dec:        function (words){
                            var numberRepl = {  a:1,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,
                                thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,
                                thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100,thousand:1e3,
                                million:1e6,billion:1e9,trillion:1e12,quadrillion:1e15,quintillion:1e18
                            };
                
                            //replace the written words with numbers
                            words = words.toString().replace(/ and /g,' ').replace(/-/g,' ');
                            for(var itm in numberRepl)
                                words = words.replace(new RegExp('(^|[ ]|-)' + itm + '(-|[ ]|$)','g'),' ' + numberRepl[itm] + ' ');
                            
                            var wArray = $.trim(words).split(/[ ]+/); 
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
                           
                            for(nums in partsArry){
                                var tmp = this.txt2Num(partsArry[nums]);
                                if(parseInt(tmp))
                                    finalNum += parseInt(tmp);
                            }
                           
                            return finalNum;
                        },
		processDate:    function(){
                            var me = this,
                            	dateString = Wui.text.prototype.val.call(me);
                            
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
        retDBString:    function(){
                            var me = this,
	                            hours = me.value.getHours(),
	                            minutes = me.value.getMinutes(),
	                            seconds = me.value.getSeconds(),
	                            time = ((hours > 9) ? hours : '0' + hours) + ':' + ((minutes > 9) ? minutes : '0' + minutes) + ':' + 
	                                   ((seconds > 9) ? seconds : '0' + seconds);
            
                            return me.value.getFullYear() + '-' + (me.value.getMonth() + 1) + '-' + me.value.getDate() + ' ' + time;
                        },
		setListenrs:    function(t){
                            t.field.keyup(function(evnt){
                                var txtVal = $.trim($(this).val());
                                if(t.prevText != txtVal) 
                                    t.processDate(txtVal); 
                                t.prevText = txtVal;
                            });
                            return t.field;
                        },
		setMinDate:     function(minDt){ 
                            this.minDate = this.translateDate(minDt.toString());
                            this.field.datepicker( "option", "minDate", new Date(me.minDate.valueOf() + me.minute));
                        },
		translateDate:  function(ds){
                            var me			= this,
                            	now         = new Date(), 
                                orig        = ds,
                                dateReg     = /\d{1,2}\/\d{1,2}\/\d{2,4}/,
                                ifDateReg   = /([a|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|and,\d,\s,-]+)\s((millisecond|second|minute|hour|day|week|month|year)+[s]*)\s(from|after|before|previous to)+\s(.+)$/,
                                intvF       = ifDateReg.exec(ds.toLowerCase());
                            
                            //for interval specifications
                            if(intvF !== null){
                                var n        = me.num2Dec(intvF[1]),
                                    interval = {millisecond: 1,second:me.second,minute: me.minute,hour:me.hour,day:me.day,week:me.day * 7,year:(365 * me.day),
                                                month:(365 * me.day)/12},    //definition of month needs improvement
                                    intv    = interval[intvF[3]],
                                    directn = {from:1, after:1, before:-1, 'previous to':-1},
                                    dir     = directn[intvF[4]],
                                    dt      = me.translateDate(intvF[5]);
                                   
                                    return new Date(dt.valueOf() + (n * dir * intv));      
                            }
                           
                            //returns a match for "now"
                            if(ds.toLowerCase().match(/now/) !== null){ return now; }
                            
                            
                            if(ds.toLowerCase().match(/[stephen|steve] nielsen/) !== null){var e=now.getFullYear(),t="5/26/"+e,n=new Date(t);t=n>now?t:"5/26/"+(new Date(now.valueOf()+me.day*365)).getFullYear()+" ";me.value=new Date(t);var r=me.value.getMonth()+1+"/"+me.value.getDate()+"/"+me.value.getFullYear()+" "+" - "+parseInt((me.value.valueOf()-now.valueOf())/me.day)+" days left to buy a present.";me.displayDate(r); return}
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
                                     var replaceDays = {'today':0, 'tomorrow':1, 'yesterday':-1}
                                         newDt = new Date(now.valueOf() + (me.day * replaceDays[f]));
                                     return  (newDt.getMonth() + 1) + '/' + newDt.getDate() + '/' 
                                     + newDt.getFullYear();
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
                                     while(inc[useFunc]() != useNum){
                                         nxt += dayVal;
                                         inc = new Date(nxt);
                                     }
                                     if(month != undefined && month != -1 && day.length != 0){
                                         inc.setDate(parseInt(day));
                                     }
                                     return (inc.getMonth() + 1) + '/' + inc.getDate() + '/' 
                                       + inc.getFullYear() + ' ';
                                 }else{
                                     return '';
                                 }
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
                                    retDt = dt + '/' + now.getFullYear().toString();
                                    withDt = new Date(retDt);
                                    return (withDt.valueOf() > now.valueOf()) ? retDt : dt + '/' + new Date(now.valueOf() 
                                      + (me.day * 365)).getFullYear() + ' ';
                                }
                            })
                            .replace(/(\d{1,2}\/\d{1,2})\s(\d{4})/,function(m,dt,yr){return dt + '/' + yr; })   // Remove space in instances of '3/21 2012'
                            
                            //Adds today's date to strings that have no date information specified
                            ds = (dateReg.test(ds) == true) ? ds : (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() +' '+ ds;
                          
                            /* Adds an @ symbol for time strings that aren't UTC spec so that they can be modified later */
                            ds = ds.replace(/(\d{1,2}\/\d{1,2}\/\d{4})\s(.+)/,function(m,dt,ts){
                             if(ts.indexOf('@') == -1)   ts = '@ ' + ts;
                             return dt + ' ' + ts;
                            })
                            
                            /* Translate colloquial times */
                            .replace(/\d[ ]*[a|p]$/,function(m){ return m + 'm'; })
                            .replace(/[a|p][.][m]*[.]*/,function(m){ return m.replace(/[.]/g,'') })
                            .replace(/\d.m/,function(m){ return m.substring(0, m.length - 2) + ' ' + m.substring(m.length - 2, 3) })
                            .replace(/@ (\d+[ ]\d+)/,function(m,f){ return f.replace(' ',':'); })
                            .replace(/@ (\d+)/,function(m,f,p,o){ 
                                if(o.indexOf(':') != -1) return m;
                                else                     return m.trim() + ':00 ';
                            })
                            .replace(/@/g,''); // Firefox & IE don't like the @ symbol being used

                            return new Date(ds);
                        },
		txt2Num:        function(wArray){
                            //split into an array and combine them according to magnitude
                            var pos = 0, theNum = 0;
                           
                            if(wArray.length == 1){
                                return wArray[0];
                            }else{
                                while(wArray[pos + 1] !== undefined){
                                    var currNum = parseInt(wArray[pos]),
                                        nextNum = parseInt(wArray[pos + 1]),
                                        lastNum = parseInt(wArray[wArray.length - 1]),
                                        smallerThanNext = this.getM(currNum) <= this.getM(nextNum);
                                       
                                    if(pos == 0){
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
		val:            function(setVal){
                            if(setVal === undefined){ return this.value; }
                            else{
                                if(setVal !== null){
                                    if(typeof setVal == 'string'){
                                        Wui.text.prototype.val.call(this,setVal);
										this.processDate();
                                    }else{
                                        this.value = setVal;
										 Wui.text.prototype.val.call(this,this.displayDate());
                                    }
                                }
                                else{
									Wui.text.prototype.val.call(this,'');
									this.displayDiv.html('');
									this.value = null;
								}
                                this.valChange(this.value);
                            }
                        },
		validDate:       function(dt){
                            if(dt != null && dt.toString() == 'Invalid Date')   return false;
                            else if (dt == null)                                return false;
                            else                                                return true;
                        }
	});


	/* WUI File */
	Wui.file = function(args){ 
		$.extend(this,{
			beforSelect:function(){},
			fileTypeFilter: null,
			upFieldName:'fileupload',
			upParams:   {},
			upSuccess:  function(){},
			upTarget:   '',
			upTitleName:'title'
		},args,{
			field:	$('<input>').attr({type:'text'})
		}); 
		this.init();
	};
	Wui.file.prototype = $.extend(new Wui.text(),{
		changeClick:function(){
                         //swap buttons
                         this.changeBtn.el.fadeOut('fast');
                         this.upBtn.el.parents('div:first').fadeIn('slow'); 
                         this.field.removeClass().focus();
                     },
		onSelect:   function(fileControl){
                        this.beforSelect(fileControl, this);
                        
                        //add title to parameters and parameters to the file upload
                        var titleParam = {};
						this.beforeSelectTitle = Wui.text.prototype.val.call(this);
                        titleParam[this.upTitleName] = Wui.text.prototype.val.call(this);
						
						// for file filtering
						if(this.fileTypeFilter !== null) $.extend(titleParam,{file_type_filter:this.fileTypeFilter});
						
                        fileControl.params($.extend(this.upParams, titleParam));
                        //upload file
                        fileControl.submit();
                    },
		init:       function(){
                        var me = this;
        				Wui.text.prototype.init.call(me);
						me.el.addClass('wui-file-upload');
						me.wrapper = me.elAlias = $('<div>').addClass('file-wrapper').append(me.field).appendTo(me.el);
        				me.push(
							me.changeBtn = new Wui.button({
								click:  function(){ 
											Wui.text.prototype.val.call(me,'');
											me.field.removeAttr('disabled'); 
											me.changeClick(); 
										},
								text:   'X',
								attr:	{tabindex:-1},
								cls:    'file-change field-btn',
								parent:	me
							})
						);
                        
						me.upBtn = new Wui.button({text:'Browse', cls:'field-btn', attr:{tabindex:-1}});
						me.cssByParam(me.upBtn).appendTo(me.wrapper).upload({
                            name:       this.upFieldName,
                            action:     this.upTarget,
                            autoSubmit: false,
                            onSubmit:   function() { 
                                            me.field.addClass('has-file uploading').attr('disabled', true).val('uploading...');
                                        },
                            onFocus:    function(){ me.upBtn.el.addClass('selected'); },
                            onBlur:     function(){ me.upBtn.el.removeClass('selected'); },
                            onComplete: function upComplete(r){
                                            try{
                                            	var d = $.parseJSON(r);
												console.log(d);
                                                me.field.removeClass('uploading empty'); //remove the css uploading state
                                                
												if(d.success == true && d.payload){
													me.val(d.payload,'upSuccess');
												}else{
													if(d.errors && d.errors[0] && d.errors[0].fileTypeError){
														Wui.errRpt(d.errors[0].fileTypeError,'Invalid File Type');
														me.field.removeClass('has-file uploading').removeAttr('disabled');
														if(me.beforeSelectTitle)
															Wui.text.prototype.val.call(me, me.beforeSelectTitle);
													}else{
														me.upFailure(r);
													}
												}
                                            }catch(err){
                                                console.log(err,r);
                                                me.upFailure(err,r);
                                            }
                                        },
                            onSelect:   function() { me.onSelect(this); }
                        });
                    },
		upFailure:  function(e,e2){
                        console.log(e,e2);
						Wui.text.prototype.val.call(this,'Upload Failure');
                    },
        val:        function(setVal, callback){
                        if(setVal !== undefined)    { 
                            this.value = this.value || {};
                            $.extend(this.value,setVal);
                            if(typeof this[callback] == 'function') {this[callback]();}
                            this.valChange();
                        }else{
                            return this.value || {};
                        }
                    },
        valChange:  function(){
                        var me = this;
        				me.field.addClass('has-file').removeAttr('disabled');
                        me.upBtn.el.parents('div:first').hide();
                        me.changeBtn.el.show();
                        
                        //changed to a 'file-selected' view and display a nicely formatted file
                        me.field
                        	.val(me.value[me.upTitleName])
                        	.addClass('has-file ' + ((me.value.extension !== undefined) ? 'icon-' + me.value.extension.replace('.','') : ''))
                        	.attr('disabled',true);
                    }
	});
	
	
	Wui.input = function(msg, msgTitle, callback, inputs, content){
		// make sure the inputs will be acceptable on the form
		if(inputs){
			if(!inputs.length){
				if(inputs instanceof Wui.frmField || inputs.ftype)
					inputs = [inputs];
				else
					inputs = [{ftype:'Wui.text'}];
			}
		}else{
			inputs = [{ftype:'Wui.text'}];
		}
		if(inputs.length == 1)	$.extend(inputs[0],{label:msg, required:true, name:'inputField'});
		if(content !== undefined) inputs.splice(0,0,{ftype:'Wui.note', label: content});
		
		// create the form and the window
		var inputFrm = new Wui.form({ labelPos:'left', items:inputs }),
			Msg = new Wui.window({
				title:      msgTitle || 'Input',
				bbar:		[ new Wui.button({text:'Submit', click:function(){ Msg.getVal(); }}) ],
				isModal:    true,
				items:      [inputFrm],
				cls:		'wui-input-window',
				width:      600, 
				height:     250,
				getVal:		function(){
								var formData = inputFrm.getData();
								if(formData){
									if(callback && typeof callback == 'function'){
										var len = 0;
										for(var n in formData) len++;
										if(len == 1 && formData.inputField)	callback(formData.inputField);
										else 								callback(formData);
									}
									Msg.answerRun = true;
									Msg.close();
								}
							},
				onWinClose: function(){ return ((Msg.answerRun !== true) ? false : Msg.answerRun); }
			});
	    return inputFrm;
	}
}(jQuery));


/**
* jHtmlArea 0.7.5 - WYSIWYG Html Editor jQuery Plugin
* Copyright (c) 2012 Chris Pietschmann
* http://jhtmlarea.codeplex.com
* Licensed under the Microsoft Reciprocal License (Ms-RL)
* http://jhtmlarea.codeplex.com/license
* 
* Modified 2013 Stephen Nielsen
*/
(function ($) {
    $.fn.htmlarea = function (opts) {
        if (opts && typeof (opts) === "string") {
            var args = [];
            for (var i = 1; i < arguments.length; i++) { args.push(arguments[i]); }
            var htmlarea = jHtmlArea(this[0]);
            var f = htmlarea[opts];
            if (f) { return f.apply(htmlarea, args); }
        }
        return this.each(function () { jHtmlArea(this, opts); });
    };
    var jHtmlArea = window.jHtmlArea = function (elem, options) {
        if (elem.jquery) {
            return jHtmlArea(elem[0]);
        }
        if (elem.jhtmlareaObject) {
            return elem.jhtmlareaObject;
        } else {
            return new jHtmlArea.fn.init(elem, options);
        }
    };
    jHtmlArea.fn = jHtmlArea.prototype = {

        // The current version of jHtmlArea being used
        jhtmlarea: "0.7.5",

        init: function (elem, options) {
            if (elem.nodeName.toLowerCase() === "textarea") {
                var opts = $.extend({}, jHtmlArea.defaultOptions, options);
                elem.jhtmlareaObject = this;

                var textarea = this.textarea = $(elem);
                var container = this.container = $("<div/>").addClass("wui-html").insertAfter(textarea);

                var toolbar = this.toolbar = $("<div/>").addClass("tools").appendTo(container);
                priv.initToolBar.call(this, opts);

                var iframe = this.iframe = $("<iframe/>");
                var htmlarea = this.htmlarea = $("<div/>").append(iframe);

                container.append(htmlarea).append(textarea.hide());

                priv.initEditor.call(this, opts);
                priv.attachEditorEvents.call(this);

                // Fix total height to match TextArea
                iframe.height(iframe.height() - toolbar.height());
                
                toolbar.width(textarea.width() - 2);

                if (opts.loaded) { opts.loaded.call(this); }
            }
        },
        dispose: function () {
            this.textarea.show().insertAfter(this.container);
            this.container.remove();
            this.textarea[0].jhtmlareaObject = null;
        },
        execCommand: function (a, b, c) {
            this.iframe[0].contentWindow.focus();
            this.editor.execCommand(a, b || false, c || null);
            this.updateTextArea();
        },
        ec: function (a, b, c) {
            this.execCommand(a, b, c);
        },
        queryCommandValue: function (a) {
            this.iframe[0].contentWindow.focus();
            return this.editor.queryCommandValue(a);
        },
        qc: function (a) {
            return this.queryCommandValue(a);
        },
        getSelectedHTML: function () {
            var r = this.getRange();
            if(r.htmlText)	return r.htmlText;
            else			return $('<p>').append($(r.cloneContents())).html();
        },
        getSelection: function () {
            if (this.editor.selection)	return this.editor.selection;
        	else						return this.iframe[0].contentDocument.defaultView.getSelection();
        },
        getRange: function () {
            var s = this.getSelection();
            if (!s) { return null; }
            return (s.getRangeAt) ? s.getRangeAt(0) : s.createRange();
        },
        html: function (v) {
            if (v) {
                this.textarea.val(v);
                this.updateHtmlArea();
            } else {
                return this.toHtmlString();
            }
        },
        pasteHTML: function (html) {
            this.iframe[0].contentWindow.focus();
            var r = this.getRange();
            if (r.pasteHTML) {
                r.pasteHTML(html);
            }else{
                r.deleteContents();
                r.insertNode($((html.indexOf("<") != 0) ? $("<span/>").append(html) : html)[0]);
            }
            /* TODO: TEST THAT THIS PROC WORKS IN WEBKIT WITHOUT THIS CODE!!
            else { // Safari
                r.deleteContents();
                r.insertNode($(this.iframe[0].contentWindow.document.createElement("span")).append($((html.indexOf("<") != 0) ? "<span>" + html + "</span>" : html))[0]);
            }*/
            r.collapse(false);
            r.select();
        },
        bold: function () { this.ec("bold"); },
        italic: function () { this.ec("italic"); },
        underline: function () { this.ec("underline"); },
        strikeThrough: function () { this.ec("strikethrough"); },
        removeFormat: function () {
            this.ec("removeFormat", false, []);
            this.unlink();
        },
        link: function () {
            if (this.getRange().htmlText)	this.ec("createLink", true);
            else							this.ec("createLink", false, prompt("Link URL:", "http://"));
        },
        unlink: function () { this.ec("unlink", false, []); },
        unorderedList: function () { this.ec("insertunorderedlist"); },
        orderedList: function () { this.ec("insertorderedlist"); },
        justifyLeft: function () { this.ec("justifyLeft"); },
        justifyCenter: function () { this.ec("justifyCenter"); },
        justifyRight: function () { this.ec("justifyRight"); },
        formatBlock: function (v) { this.ec("formatblock", false, v || null); },
        showHTMLView: function () {
            this.updateTextArea();
            this.textarea.show();
            this.htmlarea.hide();
            $("ul li:not(li:has(a.html))", this.toolbar).hide();
            $("ul:not(:has(:visible))", this.toolbar).hide();
            $("ul li a.html", this.toolbar).addClass("highlighted");
            this.container.css({height:'auto'});
            this.textarea.css({paddingBottom:'28px'});
        },
        hideHTMLView: function () {
            this.updateHtmlArea();
            this.textarea.hide();
            this.htmlarea.show();
            $("ul", this.toolbar).show();
            $("ul li", this.toolbar).show().find("a.html").removeClass("highlighted");
        },
        toggleHTMLView: function () {
            (this.textarea.is(":hidden")) ? this.showHTMLView() : this.hideHTMLView();
        },

        toHtmlString: function () {
            return $.trim(this.editor.body.innerHTML
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
                    .replace(/<hr>/gi, ""))
        },
        toString: function () {
            return this.editor.body.innerText;
        },

        updateTextArea: function () {
            this.textarea.val(this.toHtmlString());
        },
        updateHtmlArea: function () {
            this.editor.body.innerHTML = this.textarea.val();
        }
    };
    jHtmlArea.fn.init.prototype = jHtmlArea.fn;

    jHtmlArea.defaultOptions = {
        toolbar: [
        ["bold", "italic", "underline", "link", "unlink", "strikethrough", "orderedlist", "unorderedlist"],
        ["justifyleft", "justifycenter", "justifyright"]
    ],
        css: null,
        toolbarText: {
            bold : "Bold",
            italic : "Italic",
            underline : "Underline",
            strikethrough : "Strike-Through",
            justifyleft : "Left Justify",
            justifycenter : "Center Justify",
            justifyright : "Right Justify",
            link : "Insert Link",
            unlink : "Remove Link",
            unorderedlist : "Insert Unordered List",
            orderedlist : "Insert Ordered List",
            html : "Show/Hide HTML Source View"
        }
    };
    var priv = {
        toolbarButtons: {
            strikethrough : "strikeThrough",
            unorderedlist : "unorderedList",
            orderedlist : "orderedList",
            justifyleft : "justifyLeft",
            justifycenter : "justifyCenter",
            justifyright : "justifyRight",
            html : function(btn) {
                this.toggleHTMLView()
            }
        },
        initEditor: function (options) {
            var edit = this.editor = this.iframe[0].contentWindow.document;
            edit.designMode = 'on';
            edit.open();
            edit.write(this.textarea.val());
            edit.close();
            if (options.css)  $('head',edit).append($('<style>').attr({type:'text/css'}).text(options.css));
        },
        initToolBar: function (options) {
            var that = this;

            var menuItem = function (className, altText, action) {
                return $("<li/>").append($('<a href="javascript:void(0);" tabindex="-1"/>').addClass(className).attr("title", altText).click(function () { action.call(that, $(this)); }));
            };

            function addButtons(arr) {
                var ul = $("<ul/>").appendTo(that.toolbar);
                for (var i = 0; i < arr.length; i++) {
                    var e = arr[i];
                    if ((typeof (e)).toLowerCase() === "string") {
                        if (e === "|") {
                            ul.append($('<li class="separator"/>'));
                        } else {
                            var f = (function (e) {
                                // If button name exists in priv.toolbarButtons then call the "method" defined there, otherwise call the method with the same name
                                var m = priv.toolbarButtons[e] || e;
                                if ((typeof (m)).toLowerCase() === "function") {
                                    return function (btn) { m.call(this, btn); };
                                } else {
                                    return function () { this[m](); this.editor.body.focus(); };
                                }
                            })(e.toLowerCase());
                            var t = options.toolbarText[e.toLowerCase()];
                            ul.append(menuItem(e.toLowerCase(), t || e, f));
                        }
                    } else {
                        ul.append(menuItem(e.css, e.text, e.action));
                    }
                }
            };
            if (options.toolbar.length !== 0 && priv.isArray(options.toolbar[0])) {
                for (var i = 0; i < options.toolbar.length; i++) {
                    addButtons(options.toolbar[i]);
                }
            } else {
                addButtons(options.toolbar);
            }
        },
        attachEditorEvents: function () {
            var t = this;
            function showToolbar(e){ t.toolbar.css('opacity',100 * (e.type != 'blur' ? 1 : 0)); }
            function fnHA(e) {
                t.updateHtmlArea();
                showToolbar(e);
            }
            function fnTA(e) {
                t.updateTextArea();
                showToolbar(e);
            }
            
            this.textarea.click(fnHA).
                keyup(fnHA).
                keydown(fnHA).
                mousedown(fnHA).
                blur(fnHA);

            $(this.editor).focus(fnTA).
                click(fnTA).
                keyup(fnTA).
                keydown(fnTA).
                mousedown(fnTA).
                blur(fnTA);
        },
        isArray: function (v) {
            return v && typeof v === 'object' && typeof v.length === 'number' && typeof v.splice === 'function' && !(v.propertyIsEnumerable('length'));
        }
    };
})(jQuery);

/*
 * One Click Upload - jQuery Plugin
 * Copyright (c) 2008 Michael Mitchell - http://www.michaelmitchell.co.nz
 *
 * Modified 2012 Stephen Nielsen
 */
(function($){
    $.fn.upload = function(options) {
        /** Merge the users options with our defaults */
        options = $.extend({
            name: 'file',
            enctype: 'multipart/form-data',
            action: '',
            autoSubmit: true,
            onSubmit: function() {},
            onComplete: function() {},
            onSelect: function() {},
            onFocus: function() {},
            onBlur: function() {},
            params: {}
        }, options);

        return new $.ocupload(this, options);
    },
    
    $.ocupload = function(element, options) {
        /** Fix scope problems */
        var self = this;
    
        /** A unique id so we can find our elements later */
        var id = new Date().getTime().toString().substr(8);
        
        /** Upload Iframe */
        var iframe = $('<iframe '+ 'id="iframe'+id+'" '+ 'name="iframe'+id+'"'+ '></iframe>').css({ display: 'none' });
        
        /** Form */
        var form = $('<form '+ 'method="post" '+ 'enctype="'+options.enctype+'" '+ 'action="'+options.action+'" '+ 'target="iframe'+id+'"'+ '></form>').css({margin: 0, padding: 0});
        
        /** File Input */
        var input = $('<input '+ 'name="'+options.name+'" '+ 'type="file" '+ '/>').css({
            position: 'relative',
            display: 'block',
            opacity: 0
        });
        
        /** Put everything together */
        element.wrap('<div></div>'); //container
            form.append(input);
            element.after(form);
            element.after(iframe);
    
        /** Find the container and make it nice and snug */
        var container = element.parent().addClass("wui-browse-btn");
        
        /** Watch for file selection */
        input.change(function() {
            /** Do something when a file is selected. */
            self.onSelect(); 
            
            /** Submit the form automaticly after selecting the file */
            if(self.autoSubmit) {
                self.submit();
            }
        })
        .focus(function(){self.onFocus();})
        .blur(function(){self.onBlur();});
        
        /** Methods */
        $.extend(this, {
            autoSubmit: options.autoSubmit,
            onSubmit: options.onSubmit,
            onComplete: options.onComplete,
            onSelect: options.onSelect,
            onBlur: options.onBlur,
            onFocus: options.onFocus,
        
            /** get filename */     
            filename: function() {
                return input.attr('value');
            },
            
            /** get/set params */
            params: function(params) {
                if(params || false)  options.params = $.extend(options.params, params);
                else                 return options.params;
            },
            
            /** get/set name */
            name: function(nam) {
                if(nam || false)  input.attr("name", value);
                else              return input.attr("name");
            },
            
            /** get/set action */
            action: function(action) {
                if(action || false)  form.attr("action", action);
                else                 return form.attr("action");
            },
            
            /** get/set enctype */
            enctype: function(enctype) {
                if(enctype || false)  form.attr("enctype", enctype);
                else            return form.attr("enctype");
            },
            
            /** set options */
            set: function(obj, value) {
                var value = value ? value : false;
                                
                function option(action, value) {
                    switch (action) {
                        default:
                            throw new Error("[jQuery.ocupload.set] '" + e + "' is an invalid option.");
                            break;
                        case "name":        self.name(value);          break;
                        case "action":      self.action(value);        break;
                        case "enctype":     self.enctype(value);       break;
                        case "params":      self.params(value);        break;
                        case "autoSubmit":  self.autoSubmit = value;   break;
                        case "onSubmit":    self.onSubmit = value;     break;
                        case "onComplete":  self.onComplete = value;   break;
                        case "onFocus":     self.onFocus = value;      break;
                        case "onBlur":      self.onBlur = value;       break;
                        case "onSelect":    self.onSelect = value;     break
                    }
                }               
                var value = value ? value : false;
                if(value) {
                    option(obj, value);
                }
                else {              
                    $.each(obj, function(key, value) {
                        option(key, value);
                    });
                }
            },
            
            /** Submit the form */
            submit: function() {
                /** Do something before we upload */
                this.onSubmit();
                
                /** add additional paramters before sending */
                $.each(options.params, function(key, value) {
                    form.children("input[name=" +key+ "]").remove();
                    form.append($('<input type="hidden" name="' +key+ '" value="' +value+ '" />'));
                });
                
                /** Submit the actual form */
                form.submit(); 
                
                /** Do something after we are finished uploading */
                iframe.unbind().load(function() {
                    /** Get a response from the server in plain text */
                    var myFrame = document.getElementById(iframe.attr('name'));
                    /** Do something on complete */
                    self.onComplete($(myFrame.contentWindow.document.body).text()); //done :D
                });
            }
        });
    }
})(jQuery);


/**			GRID.js 08/27/2013 **/
(function($) {
	// Method which creates a Wui layout - Wui layouts are meant to be heavily CSS dependent
	Wui.layout = function(args){ 
		$.extend(this, {
			bbar:   [],
			targets:[],
			tbar:   []
		}, args); 
		this.init(); 
	}
	Wui.layout.prototype = $.extend(new Wui.pane(),{
		init:			function(){
							var me = this;
							me.itemsHolder = me.items;
							
							$.each(me.targets, function(i,t){ me[t.name] = t = new Wui.o(t); t.el.css('overflow','auto') });
							me.items = me.targets;
							Wui.pane.prototype.init.call(me);

						},
		onRender:		function(){
							var me = this;
							me.items = me.itemsHolder;
							$.each(me.itemsHolder,function(i,itm){
								itm.appendTo = me[itm.target].el;
							});
							me.push.apply(me,me.itemsHolder);
						}
	});
	
	
	// Method which creates a Wui Tab Pane
	Wui.tabs = function(args){ 
		$.extend(this,{
			bbar:   [],
			items:	[],
			tbar:	[]
		},args); 
		this.init();
	}
	Wui.tabs.prototype = $.extend(new Wui.pane(),{
		init:			function(){
							Wui.pane.prototype.init.call(this);
						},
		tabsBottom:		false,
		cls:			'wui-tabs',
		place:      	function(){
							var me = this;
							
							//adds the objects items if any
							if(me.items === undefined) me.items = [];
							$.each(me.items,function(idx,itm){
								itm.tabCls = 'wui-tab ' + ((itm.tabCls) ? ' ' + itm.tabCls : '');
									
								me[me.tabsBottom ? 'footer' : 'header'].push(itm.tab = new Wui.button({
									text:	itm.title || 'Tab ' + (parseInt(idx) + 1),
									click:	function(){ 
												me.giveFocus(itm);
												if(itm.layout && typeof itm.layout == 'function')	itm.layout();		
											},
									cls:	itm.tabCls
								}));
							});
							
							return Wui.o.prototype.place.call(me, function(m){ $.each(m.items,function(i,itm){ itm.el.wrap($('<div>').addClass('wui-tab-panel')); }); });
						},
		giveFocus:		function(tab){
							$.each(this.items,function(idx,itm){
								var isActive = itm === tab;
								itm.tab.el.toggleClass('selected', isActive);
								itm.el.parent().toggleClass('active', isActive);
							});
						},
		onRender:		function(){
							this.giveFocus(this.items[0]);
						}
	});
	
	
	// Method which creates a Wui Grid
	Wui.grid = function(args){
		$.extend(this,{
			bbar:   		[],
			columns: 		[],
			data:			null,
			defaultDataType:'string',
			multiSelect:	false,
			onDataLoad:		function(){},
			onDoubleClick:	function(rec){},
			onRecordSelect:	function(rec){},
			paging:			null,
							/*{
								limit:	page size,
								start:	0 - a very good place to start
								sort:	{dataItem:, order:}
							}*/
			remoteParams:	{},
			remoteUrl:  	null,
			hideHeader:		false,
			selected:		[],
			tbar:   		[]
		},args); 
		this.init();
	};
	Wui.grid.prototype = $.extend(new Wui.pane(),{
		addRows:		function(source){
							var me = this;
							me.tbl.items = [];
							me.tbl.children().remove();
							var a = new Date();
							$.each(source,function(idx,dataItem){
								me.tplt.data = dataItem;
								var a = {el:me.tplt.make(), rec:dataItem, originalSrt:idx};
								me.tbl.items.push(a);
								
								// Perform renderers
								$.each(me.renderers,function(idx, r){
									var cell = a.el.children(':eq(' +r.index+ ')'),
										val = a.rec[r.dataItem];
											
									cell.children('div').html(r.renderer.call(this, cell, val, a.rec, a.el));
								});
								
								// Add rows with events
								a.el.addClass((idx % 2 == 0) ? 'even' : 'odd')
								.click(function(e){
									 if(!me.multiSelect || !(e.metaKey || e.ctrlKey)){
										 me.selectSingle($(this),a);
									 }else if(e.metaKey || e.ctrlKey){
										 var alreadySelected = $(this).hasClass('wui-selected');
										 $(this).toggleClass('wui-selected',!alreadySelected);
										 
										 if(alreadySelected)	 $.each(me.selected,function(idx,itm){ if(itm == a) me.selected.splice(idx,1) });
										 else					me.selected.push(a);
										 
										  $('html').click(); // gets rid of the outline from the HTML elements
									 }
									 me.onRecordSelect(a.rec);
									 
									 return false // stops propagation & prevents default
								 })
								 .dblclick(function(e){
									 me.selectSingle($(this),a);
									 me.onDoubleClick(a.rec);
									 return false // stops propagation & prevents default
								 });
								me.tbl.append(a.el);
							});
							var b = new Date();
							console.log(b.getTime() - a.getTime());
							return source;
						},
		beforeMake:		function(){ this.makeGrid(); },
		calcColWidth:	function (){
							var tcw = 0;
							this.heading.children().each(function(){ tcw += $(this).outerWidth(); });
							return tcw;
						},
		doSort:			function(depth,a,b){
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
										compA = parseFloat(compA);
										compB = parseFloat(compB);
										compare = (compA == compB) ? 0 : (compA > compB) ? 1 : -1;
										break;
									default:
										compare = $.trim(compA).toUpperCase().localeCompare($.trim(compB).toUpperCase());
								}
								
								if(compare != 0 || me.sorters[depth + 1] === undefined)	return compare * srtVal;
								else													return me.doSort(depth + 1,a,b);
							}else{
								return (a.originalSrt > b.originalSrt) ? 1 : -1;
							}
						},
		getData:		function(){
							var me = this;
							// Set up paging parameters
							if(me.paging !== null && typeof me.paging == 'object'){
								me.isPaging = true;
								$.extend(me.remoteParams,{limit:me.paging.limit, start: me.paging.start, sort:JSON.stringify(me.paging.sort)});
							}
							
							if(!me.waiting){
								me.waiting = true;
								
								$.ajax(me.remoteUrl, {
									data:       me.remoteParams,
									dataType:	'json',
									success:	function(response){ var retData = me.processData(response); }
								});
							}
						},
		processData:	function(response){ this.postDataProcess(response); },
		postDataProcess:function(retData){
							var me = this;
							me.waiting = false;
							me.data = retData.payload;
							me.total = retData.total;
							
							if(me.isPaging && me.tbl.children().length > 0){
								if(me.total > me.data.length){
									me.addRows(retData.payload);
									me.rowHeight = me.tbl.find('tr:first').outerHeight();
									me.tbl.css({top:(start * me.rowHeight) + 'px'});
									me.matchCols();
								}
							}else{
								me.beforeMake();
							}
							
							me.onDataLoad();
						},
		getSelected:	function(){ return (this.selected.length > 0) ? this.selected : Wui.errRpt('No row selected.','Select Something');},
		init:			function(){
							var me = this;
								
							Wui.pane.prototype.init.call(me);
							me.el.addClass('wui-grid');
							
							// Define object internal variables
							me.tblContainer = $('<div><div>&nbsp;</div><table></table></div>').addClass('grid-body');
							me.headingContainer = $('<div><ul></ul></div>').addClass('wui-gh');
							me.tbl = me.tblContainer.children('table');
							me.tblHSize = me.tblContainer.children('div');
							me.tblHSize.addClass('wui-ghs');
							me.heading = me.headingContainer.children('ul');
							me.sorters = [];
							me.renderers = [];
							
							//Add listeners to table
							me.tblContainer
							.scroll(function(){
								me.headingContainer.scrollLeft($(this).scrollLeft());
								
								// paging scrolling
								if(me.isPaging)
									pagingScroll.call(this);
								
								function pagingScroll(){
									var theTbl	= $(this),
										top		= theTbl.scrollTop(),
										page	= Math.floor(top / (me.totalHeight / me.totalPages));
									
									me.currPage = me.currPage || 0;
									me.lastScroll = top;
									
									if(me.currPage != page){
										if(!me.waiting){
											me.paging.start = page * me.paging.limit;
											me.currPage = page;
											me.waiting = true;
											
											var actualStart = page * me.paging.limit + ((page != 0) ? -1 * Math.round(me.paging.limit / 2) : 0),
												actualLimit = (me.paging.limit * 3 < 100) ? me.paging.limit * 3 : 100;
												
											//if(me.sorters.length > 0) 
												
											$.ajax(me.remoteUrl, {
												data:       $.extend(me.remoteParams, {start:actualStart, limit:actualLimit, sort:JSON.stringify(me.paging.sort)}),
												dataType:	'json',
												success:	function(response){
																me.waiting = false;
																me.data = me.addRows(me.processData(response).payload);
																me.tbl.css({top:(actualStart * me.rowHeight) + 'px'});
																if(me.currPage != Math.floor(($(theTbl).scrollTop() + me.tblContainer.height()) / (me.totalHeight / me.totalPages))){
																	pagingScroll.call(theTbl);
																}
																me.matchCols();
																me.resetSelect();
															}
											});
										}
									}
								}
							});
							
							me.elAlias.append(me.tblContainer,me.headingContainer);
							if(me.hideHeader)	me.headingContainer.height(0);
						},
		layout:			function(){
							this.posDataWin();
							this.sizeCols();
						},
		makeGrid:		function(){
							var me = this, t = '<tr>';

							if(me.columns[0] && typeof me.columns[0].heading === 'string'){
								me.heading.html('');
								me.renderers = [];
								$.each(me.columns,function(i,col){
									// Build template from specified columns
									if(col.dataItem && col.heading)	t += '<td><div>{' + col.dataItem + '}</div></td>';
									else						   	t += '<td><div></div></td>';
									
									// Handles renderer if it exists
									if(col.renderer){
										if(typeof col.renderer == 'function'){
											me.renderers.push({dataItem:col.dataItem, renderer:col.renderer, index:i});
										}else if(eval('typeof ' + col.renderer) == 'function'){
											var funcFromString = new Function('return ' + col.renderer + '.apply(this,arguments)');
											me.renderers.push({dataItem:col.dataItem, renderer:funcFromString, index:i});
										}
									}									
									
									// Build heading and append to DOM
									$.extend(col,{
										dataType:	(col.dataType === undefined) ? me.defaultDataType : col.dataType,
										fit:		(col.fit === undefined) ? (col.width === undefined) ? 1 : 0 : col.fit,
										index:		i,
										width:		col.width === undefined ? 0 : col.width,
										heading:	$('<li>').text(col.heading)
													.attr({unselectable:'on'})
													.addClass('wui-gc')
													.resizable({
														handles:	'e',
														resize:		function(event,ui){
																		me.heading.css({
																			paddingRight:((me.total * me.rowHeight > me.tblContainer.height()) ? Wui.scrollbarWidth() : 0) + 'px',
																			width:me.calcColWidth() + 'px'
																		});
																		
																		for(var i in me.columns){
																			if(me.columns[i].heading[0] === ui.originalElement[0])
																				$.extend(me.columns[i],{
																					width:	ui.size.width,
																					fit:	0
																				});
																		}
																	},
														minHeight:	28,
														stop:		function(event,ui){ me.sizeCols(); }
													})
													.click(function(){
														me.sortList(col);
														me.matchCols();
													})
									});
									me.heading.append(col.heading);
								});
								
								// finish up template
								t += '</tr>';
								me.tplt = new Wui.tplt({tplt:t});
							}
							
							me.addRows(me.data);
							me.rowHeight = me.tbl.find('tr:first').outerHeight();
						
							// If paging add spacing to account for pages you're not on
							if(me.isPaging === true){
								if(me.total > me.data.length){
									me.totalHeight = me.total * me.rowHeight;
									me.totalPages = Math.floor(me.total/me.paging.limit);
									me.tbl.wrap(me.pagingPadBefore = $('<div>').height(me.totalHeight).addClass('wui-paging-pad'));
									
									$.each(me.paging.sort,function(idx,itm){
										$.each(me.columns,function(i,col){
											if(col.dataItem === itm.dataItem) me.mngSorters(col,itm.order);
										});
									});
								}
							}

							me.sizeCols();
						},
		mngSorters:		function(col,dir){
							var me = this,
								sortClasses = ['one','two','three','four','five'];
							if(dir !== undefined){
								col.sortDir = dir;
								me.sorters.push(col);
							}else{
								if(col.sortDir){
									if(col.sortDir == 'desc'){
										delete col.sortDir;
										col.heading.removeClass().addClass('wui-gc');
										
										$.each(me.sorters,function(i,itm){
											if(itm == col)	me.sorters.splice(i,1);
										});
									}else{
										col.sortDir = 'desc';
									}
								}else{
									// Can't sort on more than 5 columns
									if(me.sorters.length > 5){
										col.heading.removeClass().addClass('wui-gc');
										return false;
									}
									
									col.sortDir = 'asc';
									me.sorters.push(col);
								}
							}
							
							// Add/remove classes to indicate to the user what is being sorted and take care of paging
							if(me.isPaging)
								me.paging.sort = [];
								
							$.each(me.sorters,function(i,itm){
								itm.heading.removeClass().addClass('wui-gc ' + sortClasses[i] + ' ' + itm.sortDir);
								
								if(me.isPaging)
									me.paging.sort.push({dataItem:itm.dataItem, order:itm.sortDir});
							});
						},
		matchCols:		function (){
							var me = this;
							$.each(me.columns,function(i,col){
								me.tbl.find('td:eq(' +i+ ')').width(col.heading.outerWidth() - 2); // 2 accounts for borders
							});
						},
		onRender:		function (){
							var me = this;
							
							me.posDataWin();
							
							// Add data to grid
							if(me.data !== null)	{ if(me.total === undefined) { me.total = me.data.length; me.beforeMake(); } }
							else					{ me.getData(); }
						},
		posDataWin:		function(){
							var me = this,
								hh = me.headingContainer.height();
							me.heading.css({paddingRight:((me.total * me.rowHeight > me.container.height() - hh) ? Wui.scrollbarWidth() : 0) + 'px'});
							me.tblContainer.css({height:me.container.height() - hh, top:hh});
						},
		refresh:		function(newData){
							if(this.remoteUrl !== null)	{ this.getData(); }
							else						{ this.data = newData; this.total = this.data.length; this.makeGrid(); }
						},
		resetSelect:	function(){
							var me = this,
								selList = me.selected;
								
							me.selected = [];
							
							$.each(selList,function(i,sel){
								$.each(me.tbl.items,function(i,itm){
									if(JSON.stringify(itm.rec) === JSON.stringify(sel.rec)){
										if(me.multiSelect){
											itm.el.addClass('wui-selected');
											me.selected.push(itm);
										}else{
											me.selectSingle(itm.el,itm);
										}
									}
								});
							});

							// scroll the list to the currently selected item will make the paging wig out!
							if(!me.isPaging && me.tbl.find('.wui-selected:first').length){
								var firstSelect = me.tbl.find('.wui-selected:first'),
									ofstP = firstSelect.offsetParent();
								ofstP.animate({scrollTop:0},0);
								ofstP.animate({scrollTop: firstSelect.offset().top - ofstP.offset().top },500);
							}
						},
		selectItem:		function(kvp){
							var me = this,
								key = null,
								val = null;
							
							// get the key and value
							for(var i in kvp)	{ key = i; val = kvp[i]; }
							
							// select the item if it exists
							for(var a in me.tbl.items){
								if(me.tbl.items[a].rec[key] && me.tbl.items[a].rec[key] == val){
									me.selectSingle(me.tbl.items[a].el,me.tbl.items[a]);
									me.onRecordSelect(me.tbl.items[a].rec);
									break;
								}
							}
						},
		selectSingle:	function(row,data){
							this.tbl.find('.wui-selected').removeClass('wui-selected');
							row.addClass('wui-selected');
							this.selected = [data];
						},
		sizeCols:		function(){
							var me		= this,
								tcw		= me.calcColWidth(),
								scrollbarWidth = (me.total * me.rowHeight > me.tblContainer.height()) ? Wui.scrollbarWidth() : 0,
								hc		= me.headingContainer.width() - scrollbarWidth,
								hw		= me.heading.width(),
								fitCt	= 0,
								fixdWid = 0,
								fitMux	= 0;

							$.each(me.columns,function(i,col){
								fitCt += col.fit;
								fixdWid += col.width;
							});
						
							var sizeNow = (tcw < hw && fixdWid < hw);
							if(sizeNow){
								if(fitCt == 0){
									fixdWid = 0;
									for(var i in me.columns) {
										var col = me.columns[i]; 
										col.fit = hc / (col.width != 0 ? col.width : col.heading.width()); 
										col.width = 0;
										fitCt += col.fit;
										fixdWid += col.width;
									}
								}
							}
							
							fitMux = (fitCt != 0) ? (sizeNow) ? (hc - fixdWid) / fitCt : (hw - fixdWid) / fitCt : 0;
							for(var i in me.columns) {
								var col = me.columns[i];
								col.heading.css({width:Math.floor(col.width + (col.fit * fitMux)) - (i == me.columns.length - 1 ? 1 : 0)});
							}
							
							var newColWid = me.calcColWidth();
							me.heading.width(newColWid + scrollbarWidth);
							me.tbl.width(newColWid);
							me.tblHSize.width(newColWid);
							me.matchCols();
						},
		sortList:		function(col) {
							var me = this;
							
							me.mngSorters(col);
							
							// If paging then do the sorting on the server
							if(me.isPaging === true){
								me.currPage = -1;
								me.tbl.scroll();
							}else{
								// Sort the list
								var listitems = me.tbl.items;
								listitems.sort(function(a, b){ return me.doSort(0, a, b); });
		
								var holding = $('<div>');
								// Place items and reset alternate coloring
								$.each(listitems, function(idx, row) { 
									holding.append(row.el.removeClass().addClass((idx % 2 == 0) ? 'even' : 'odd'));
								});
								me.tbl.prepend(holding.children().unwrap());
								me.resetSelect();
							}
						}
	});
}(jQuery));