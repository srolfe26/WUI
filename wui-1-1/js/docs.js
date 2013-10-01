﻿(function($,window) {


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
		var obj = obj.replace('.','\\.'), objCode = '', objIntro = '', betweenBrace = '', success = false;
		
		filetext.replace(new RegExp("\\/\\*\\*((?:[^\\*]|(?:\\*+(?:[^\\*/])))*)\\*+\\/[\\s]*" +obj+ " \=|" + obj + '\.prototype \=', "g"),function(match,comment,matchStart){
			var endOfMatch = matchStart + match.length,
				firstBrace = filetext.indexOf('{', endOfMatch);
			
			// indicates that there was in fact a match
			success = true;
			// gets what's between the match and the opening of the object deifintion
			// allowing the code to catch extended objects
			betweenBrace = filetext.substr(matchStart + match.length,firstBrace - (matchStart + match.length)); 
			
			if($.trim(comment).length > 0)
				objIntro = comment;
			objCode += Wui.getJsObjectFromString(filetext.substr(firstBrace,filetext.length - firstBrace)) + '\n\n';			
			return match;
		});
		return {success:success, code:objCode, intro:objIntro, between:betweenBrace};
	};
	
	
	Wui.docObj = function(args){
		var me = this;
		$.extend(me, new Wui.O, {
			conglomerate: 		{},
			paused:				false,
			queue:				[],
			extendedObjs:		[],
			defaultURL:			'../js/wui.js',
			fileURL:			'../js/wui.js',				
			queueExtended:		function(obj){
									me.queue.push(function(){
										me.pause();
										me.extendedObjs.push( new Wui.docObj({fileURL:me.fileURL, parent:me, defaultURL:me.defaultURL ,obj:obj}) );
									});
									me.getCode();
								},
			pause:				function(){ me.paused = true; },
			resume:				function(){
									me.paused = false;
									setTimeout(me.getCode,1);
									if(me.queue.length === 0){
										me.processCode();
									}
								},
			pauseProcessedCode:	null,
			processCode:		function(code){
									var code = code || me.pauseProcessedCode,
										extConglomerates = [];
									
									// having extended objects them overlap one another just like they would be extended in code
									for(var i in me.extendedObjs){
										var docObj = me.extendedObjs[i];
										
										// for methods and configs
										for(var itemName in docObj.conglomerate)
											addToConglomerate(itemName,docObj.conglomerate[itemName].doc,docObj,docObj.conglomerate[itemName].type);
											
										// for events which will not override each other (though may fire in concert)
										for(var evt in docObj.events)
											me.events.push(docObj.events[evt]);
									}
									
									// THEN OVERRRIDE THE CONGLOMERATE WITH THE CODE FROM THE CURRENT METHOD
									// Get methods
									code.code.replace(/(\/\*\*((?:[^\*]|(?:\*+(?:[^\*/])))*)\*+\/[\s]*([^\:]+)\:[\s]*function)/g,function(m,all,comment,itemName,charIndex){
										addToConglomerate(itemName,comment,me,'method');
										return '';
									});
										
									// Get configs - the similar regex will not match the functions because they were removed in the last step
									code.code.replace(/\/\*\*((?:[^\*]|(?:\*+(?:[^\*/])))*)\*+\/[\s]*([^\:]+)\:[\s]([^\,^\s]+)/g,function(m,comment,itemName,defaultVal){
										if(defaultVal.match(/\bfunction\b/) === null)
											addToConglomerate(itemName,comment,me,'config');
									});
									
									// Pull out events
									code.intro = code.intro.replace(/\@event\s+([\w]+)\s+([^\n]+)/g,function(mch,evnt,desc){
										me.events.push({title:evnt, doc:desc, source:me.obj});
										return '';
									});
									
									function addToConglomerate(itemName,comment,docObj,type){
										me.conglomerate[itemName] = { doc:comment, source:docObj.obj, type:type };
									};
									
									// The parent (being the object that doesn't have a parent) will then convert its information
									if(!me.parent){
										// Get the documentation for this given object
										me.doc = code.intro;
										
										// Pull out methods and events ordered alphabetically
										var keys = Wui.getKeys(me.conglomerate);
										for(var i = 0; i < keys.length; i++){
											var c = me.conglomerate[keys[i]];
											me[c.type + 's'].push( {title:keys[i], doc:c.doc, source:c.source, type:c.type} );
										}

										// put it on the DOM
										me.toHTML();
									}
								},
			createNav:			function(element){
									if(me[element].length){
										var methodList = $('<ul>')
														.addClass('doc-nav-list')
														.click(function(){
															if($(this).hasClass('wui-doc-open'))	$(this).removeClass('wui-doc-open');
															else									$(this).addClass('wui-doc-open');
														}),
											listHeader = $('<li>' +element+ '</li>').addClass('doc-nav-header');
													
										methodList.append(listHeader);
										
										var btn = new Wui.Button({
											appendTo:	listHeader,
											text:		'Hide Extended',
											click:		function(){
															if(methodList.hasClass('wui-hide-inherited'))	{ this.setText('Hide Extended'); methodList.removeClass('wui-hide-inherited'); }
															else											{ this.setText('Show Extended'); methodList.addClass('wui-hide-inherited'); }
														}
										});
										btn.place();
										
										for(var i = 0; i < me[element].length; i++){
											var a = $('<li><a href="#' +me[element][i].type+ '_' +me[element][i].title+ '">' +me[element][i].title+ '</a></li>');
											if(me[element][i].source !== me.obj)	a.addClass('inherited');
											methodList.append(a);
										}
										
										me.el.append(methodList);
									}	
								},
			createDocList:		function(element){
									if(me[element].length){
										var list = new Wui.DataList({
											data:		me[element],
											appendTo:	me.el,
											el:			$('<table class="wui-doc-methods">\n'+
															'\t<thead>\n'+
																'\t\t<tr><th>' +element+ '</th></tr>\n'+
															'\t</thead>\n' +
															'\t<tbody>\n\t</tbody>\n' +
														'</table>\n').addClass('wui-test-results'),
														
											template:	'\n\t\t<tr>\n' +
															'\t\t\t<td><a id="{type}_{title}" class="doc-item-title">{title}</a><div class="doc-info">{(Wui.transformJavaDoc(doc).html())}</div></td>' +
														'\n\t\t</tr>\n',
											init:		function(){
															this.elAlias = this.el.children('tbody');
														}
										});
										list.place();
										list.el.on('select',function(e,obj,row){ row.addClass('show-doc'); });
										list.el.on('deselect',function(e,obj,row){ row.removeClass('show-doc'); });	
									}
								},
			toHTML:				function(){
									me.createNav('methods');
									me.createNav('configs');
									me.createNav('events');
									
									me.append($('<h1>').text(me.title));
									
									me.append(Wui.transformJavaDoc(me.doc));
									
									me.createDocList('methods');
									me.createDocList('configs');
									me.createDocList('events');
									
									me.place();
								},
			getCode:			function(){
									if (!me.paused && me.queue.length) {
										me.queue.shift()();
										if (!me.paused) me.resume();
									}
								},
			doc:				'',
			title:				null,
			obj:				'Wui.O',
			el:					$('<div>').addClass('wui-doc'),
			init:				function(){
									me.title = me.title || me.obj;
									
									$.ajax(me.fileURL,{
										dataType:	'script',
										cache:		true,
										success:	function(r){
														var code = Wui.findObjsInFile(r, me.obj);
														
														// Get extended objects
														var extended = code.between.match(/(Wui.(([^\(])+)\(\))/g);
														if(extended !== null){
															me.pauseProcessedCode = code;
															for(var i in extended)
																me.queueExtended(extended[i].replace(/[^\w\.]+/g,''));
														}else{
															me.processCode(code);
															if(me.parent)	me.parent.resume();
														}
													}
									});
								},
			methods:			[],
			configs:			[],
			events:				[]
		}, args);
		
		me.init();
	};

	
	Wui.transformJavaDoc = function(documentation){
		var m		= documentation.doc || documentation,
			keyInfo = [],
			engine  = new Wui.Template({template:'<p><span class="wui-doc-param">{title}</span><span class="wui-doc-param-val">{val}</span></p>'}),
			key	= $('<span>');
		
		//get parameters
		m = m.replace(/\@param\s+\{([\w]+)\}\s+([\[,\w\]\.]+)\s+([^\n]+)/g,function(mch,dt,varname,desc){
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
		
		var pre = $(Wui.HTMLifyCode(m.replace(/\*/g,'')));
		var p = $('<p>').addClass('wui-doc-evershow').html(
			pre.text().replace(/([\n\r]+?\s*)/g,function(m){ 
				var ret = ''; 
				for(var i = 0; i < m.length; i++) if(m[i] === '\n') ret += '<br />'; 
				return ret; 
			})
		);
		key.append(p);
		return key;
	}
	
	
	Wui.HTMLifyCode = function(c){
		var e = document.createElement('i'),
			r = '<pre>' + $.trim(c.replace(/</g,'&lt;').replace(/>/g,'&gt;')) + '</pre>';
			
		// replace tabs with 4 spaces where the browser doesn't support tab size
		if(e.style.tabSize !== '' && e.style.MozTabSize !== '' && e.style.oTabSize !== '')	r.replace(/\t/g,'    ');
		
		return r;
	};
	
	
	Wui.docCode = function(file,obj,title){
		//document object if defined
		var doc = new Wui.docObj({fileURL:file, obj:obj, title:title});
		
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
				var	preObj = $(Wui.HTMLifyCode(docCode)),
					testObj = $('<div>').attr({id:'wui-unit-tests'}),
					exampleObj = $('<div>').attr({id:'wui-doc-example'}),
					testsNCode = new Wui.O({
						el:		$('<div>').addClass('wui-doc-btn-dock'),
						appendTo:$('body'),
						items:	[
									new Wui.Button({
										vis:		false,
										text:		'Show Example',
										click:		function(){
														if(this.vis){ exampleObj.fadeOut(1000); this.setText('Show Example'); }
														else{ exampleObj.fadeIn(1000); this.setText('Hide Example'); }
														this.vis = !this.vis;
													}
									}),
									new Wui.Button({
										vis:		false,
										text:		'Show Example Source',
										click:		function(){
														if(this.vis){ preObj.fadeOut(1000); this.setText('Show Example Source'); }
														else{ preObj.fadeIn(1000); this.setText('Hide Example Source'); }
														this.vis = !this.vis;
													}
									}),
									Wui.testBtn = new Wui.Button({
										vis:		false,
										text:		'<span class="show-hide">Show Unit Tests</span>',
										click:		function(){
														if(this.vis){ testObj.fadeOut(1000); this.el.children('.show-hide').text('Show Unit Tests'); }
														else{ testObj.fadeIn(1000); this.el.children('.show-hide').text('Hide Unit Tests'); }
														this.vis = !this.vis;
													}
									})
								]
					});
				
				// append everything on the body
				testsNCode.place();
				testsNCode.el.append(exampleObj.hide(), preObj.hide(), testObj.hide());
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
		
		// Print overall test results
		if(Wui.testBtn){
			var successCt	= $('#wui-test-results .pass').length,
				failCt		= $('#wui-test-results .fail').length,
				resultsMsg	= ' (' + successCt + ' of ' + (successCt + failCt) + ' passed)';
				
			if(Wui.testBtn.el.children('.unit-results').length > 0)	Wui.testBtn.el.children('.unit-results').text(resultsMsg);
			else													Wui.testBtn.el.append('<span class="unit-results">' +resultsMsg+ '</span>');
		}else{
			// put code here to make a report on the body
		}
		
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