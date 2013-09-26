(function($,window) {
	/****************** WUI Docs & Test Suite *****************/
	Wui.getJsObjectFromString = function(s){
		var i = 1,
			braceCount = 1;	// The beginning of the passed in string ought to start with a bracket, this assumption is vital to the working of the method
		
		for( ; i < s.length; i++){
			if(s[i] === '{') 		braceCount++;
			if(s[i] === '}')  		braceCount--;
			if(braceCount === 0)	break;
		}
		
		return s.substr(0, i + 1);
	};
	
	
	Wui.findObjsInFile = function(filetext, obj){
		var obj = obj.replace('.','\\.'), objCode = '', objIntro = '';
		filetext.replace(new RegExp("\\/\\*\\*((?:[^\\*]|(?:\\*+(?:[^\\*/])))*)\\*+\\/[\\s]*" +obj+ "|" + obj + '\.prototype', "g"),function(match,comment,matchStart){
			var firstBracket = filetext.indexOf('{', matchStart + match.length);
			if($.trim(comment).length > 0)
				objIntro = comment;
			objCode += Wui.getJsObjectFromString(filetext.substr(firstBracket,filetext.length - firstBracket)) + '\n\n';			
			return match;
		});
		return {code:objCode, intro:objIntro};
	};
	
	
	Wui.getObjDoc = function(fileUrl, findObj, target){
		$.ajax(fileUrl,{
			dataType:	'script',
			success:	function(r){
							var txt 		= Wui.findObjsInFile(r, findObj),
								doc			= {
												doc:	txt.intro,
												configs:[],
												methods:[]
											  };
								
							// Get methods
							txt.code.replace(/(\/\*\*((?:[^\*]|(?:\*+(?:[^\*/])))*)\*+\/[\s]*([^\:]+)\:[\s]*function)/g,function(m,all,comment,itemName,charIndex){
								doc.methods.push({item:itemName, doc:comment});
								return '';
							});
							
							// Get configs - the similar regex will not match the functions because they were removed in the last step
							txt.code.replace(/\/\*\*((?:[^\*]|(?:\*+(?:[^\*/])))*)\*+\/[\s]*([^\:]+)\:[\s]([^\,^\s]+)/g,function(m,comment,itemName,defaultVal){
								if(defaultVal.match(/\bfunction\b/) === null)
									doc.configs.push({item:itemName, doc:comment});
							});
							(target || $('body')).append(Wui.transformJavaDoc(doc.doc,findObj));
						}
		});
		return true;
	};
	
	Wui.transformJavaDoc = function(m,obj){
		var keyInfo = [],
			engine  = new Wui.Template({template:'<div class="wui-doc-info-row"><div>{title}</div><div>{val}</div></div>'}),
			key = new $('<div class="wui-doc"><h3>' + obj + '</h3></div>');
		
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
			 .replace(/\@private/,function(mch){ key.children('h3').append('<span class="wui-doc-private">private</span>'); return ''; })
			 .replace(/\@awesome/,function(mch){ key.children('h3').append('<span class="wui-doc-awesome">awesome</span>'); return ''; });
		
		$(keyInfo).each(function(o){
			engine.data = keyInfo[o];
			key.append(engine.make());
		});
		
		return key.append($('<p>').html(m.replace(/\*/g,'')));
	}
	
	Wui.HTMLifyCode = function(c){
		var e = document.createElement('i'),
			r = '<pre>' + c.replace(/</g,'&lt;').replace(/>/g,'&gt;')+ '</pre>';
		// replace tabs with 4 spaces where the browser doesn't support tab size
		if(e.style.tabSize !== '' && e.style.MozTabSize !== '' && e.style.oTabSize !== '')	r.replace(/\t/g,'    ');
		return r;
	};
	
	Wui.docCode = function(){
		var wuiCode = $('.wui-doc-code');
			if(wuiCode.length > 0){
				var	docCode = '';
				
				// encode html tags that would mess up the code area
				wuiCode.each(function(){
					docCode += ($(this).prop('tagName').toLowerCase() == 'style') 
							? '\n<style type="text/css">\n' +$(this).text()+ '\n</style>\n'
							: '\n<script type="text/javascript">\n' +$(this).text()+ '\n</script>\n';
				});
				
				// create the <pre> object with associated button to show and hide it
				var	testsNCode = new Wui.O({
						el:		$('<div>').addClass('wui-doc-btn-dock')
					}),
					preObj = $(Wui.HTMLifyCode(docCode)),
					testObj = $('<div>').attr({id:'wui-unit-tests'}),
					srcBtn = new Wui.Button({
						preVisible:	false,
						text:		'Show Source',
						appendTo:	testsNCode.el,
						cls:		'wui-docs',
						click:		function(){
										if(this.preVisible){ preObj.fadeOut(1000); this.setText('Show Source'); }
										else{ preObj.fadeIn(1000); this.setText('Hide Source'); }
										this.preVisible = !this.preVisible;
									}
					}),
					// show/hide unit tests button
					testBtn = new Wui.Button({
						vis:	false,
						text:		'Show Unit Tests',
						appendTo:	testsNCode.el,
						cls:		'wui-docs',
						click:		function(){
										if(this.vis){ testObj.fadeOut(1000); this.setText('Show Unit Tests'); }
										else{ testObj.fadeIn(1000); this.setText('Hide Unit Tests'); }
										this.vis = !this.vis;
									}
					});
				
				// append everything on the body
				testBtn.place();
				srcBtn.place();
				testsNCode.addToDOM(testsNCode,$('h1'),'after');
				testsNCode.el.append(testObj.hide(), preObj.hide());
			}
	};
	
	Wui.assert = function(descrip,test,count,hideFn){
		try{
			var passed	= (typeof test == 'function') ? test() : test,
				fnString= (typeof test == 'function') ? test.toString() : '';
		}catch(e){
			// If the test expression itself has problems, return passed = false and the javascript error
			var passed	= false,
				fnString= (typeof test == 'function') ? e + '\n\n' + test.toString() : '';
		};

		var startTime	= new Date(),
			stringVal	= (fnString.length && hideFn !== true) ? Wui.HTMLifyCode(fnString) : '',
			endTime		= new Date(),
			testNum		= (count) ? count : '-',
			testData	= {string_val:stringVal, passed:passed, name:descrip, test_num:testNum, time:endTime - startTime},
			tplt		= new Wui.Template({
							template:'<tr>' +
										'<td>{test_num}</td>' +
										'<td>{name}{string_val}</td>' +
										'<td class="{((passed)?"pass":"fail")}">{passed}</td>' +
										'<td>{time}ms</td>' +
									'</tr>',
							data:	testData
						});
			
			if($('#wui-test-results tbody').length == 0){
			
			var docMode = $('#wui-unit-tests');
			(docMode.length > 0 ? docMode : $('body')).append($(
				'<table class="wui-test-results" id="wui-test-results">' +
					'<thead>' +
						'<tr>' +
							'<th class="wui-test-smaller">Test</th>' +
							'<th>Description</th>' +
							'<th class="wui-test-smaller">Success</th>' +
							'<th class="wui-test-smaller">Time</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody></tbody>' +
				'</table>'
			));	
		};
		
		$('#wui-test-results tbody').prepend(tplt.make());
		return testData;
	};
	
	
	Wui.ts = function(){
		var me = this;
		$.extend(me,{
			count:	0,
			paused: false,
			queue:	[],
			test:	function(desc,fn,supressFunction){
						me.queue.push(function(){ me.count++; Wui.assert(desc, fn, me.count, supressFunction); });
						me.runTest();
					},
			pause:	function(){ me.paused = true; },
			resume:	function(){
						me.paused = false;
						setTimeout(me.runTest,1);
					},
			runTest:function(){
						if (!me.paused && me.queue.length) {
							me.queue.shift()();
							if (!me.paused) me.resume();
						}
					}
		});
	};
	
	Wui.splay = function(o){
		var objData = [];

		for(i in o){
			var itm = {element:''};
			if(typeof o[i] == 'function')	{ itm.element = 'method ' + i + '<br />' + Wui.HTMLifyCode(o[i].toString()); }
			else							{ itm.element = i; }
			objData.push(itm);
		};
		
		var d = new Wui.DataList({
			data:		objData,
			el:			$('<table>\n'+
							'\t<thead>\n'+
								'\t\t<tr><th>Name</th></tr>\n'+
							'\t</thead>\n' +
							'\t<tbody>\n\t</tbody>\n' +
						'</table>\n').addClass('wui-test-results'),
						
			template:	'\n\t\t<tr>\n' +
							'\t\t\t<td>{element}</td>' +
						'\n\t\t</tr>\n',
			appendTo:	$('body'),
			init:		function(){
							this.elAlias = this.el.children('tbody');
						}
		});
		d.place();
	};
}(jQuery,this));