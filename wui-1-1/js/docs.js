(function($,window) {
	/****************** WUI Docs & Test Suite *****************/
	Wui.docCode = function(){
		var wuiCode = $('.wui-doc-code');
			if(wuiCode.length > 0){
				var e = document.createElement('i'),
					docCode = '';
				
				// encode html tags that would mess up the code area
				wuiCode.each(function(){
					var code = ($(this).prop('tagName').toLowerCase() == 'style') 
							? '\n<style type="text/css">\n' +$(this).text()+ '\n</style>\n'
							: '\n<script type="text/javascript">\n' +$(this).text()+ '\n</script>\n';
							
					docCode += code.replace(/</g,'&lt;').replace(/>/g,'&gt;');
				});
				
				// replace tabs with 4 spaces where the browser doesn't support tab size
				if(e.style.tabSize !== '' && e.style.MozTabSize !== '' && e.style.oTabSize !== '')	docCode.replace(/\t/g,'    ');
				
				// create the <pre> object with associated button to show and hide it
				var	preObj = $('<pre>' +docCode+ '</pre>'),
					docBtn = new Wui.Button({
						preVisible:	false,
						text:		'Show Source',
						appendTo:	$('body'),
						cls:		'wui-docs',
						click:		function(){
										if(this.preVisible){ preObj.fadeOut(1000); this.setText('Show Source'); }
										else{ preObj.fadeIn(1000); this.setText('Hide Source'); }
										this.preVisible = !this.preVisible;
									}
					});
				
				// append everything on the body
				docBtn.place();
				$('body').append(preObj.hide());
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
			stringVal	= (fnString.length && hideFn !== true) ? '<pre>' + fnString.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\t/g,'    ')+ '</pre>' : '',
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
						
			if($('.wui-test-results tbody').length == 0){
			$('body').append($(
				'<table class="wui-test-results">' +
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
		
		$('.wui-test-results tbody').prepend(tplt.make());
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
}(jQuery,this));