var bam = bam || {};
bam.forms = {};
bam.FormModel = Backbone.Model.extend({
	initialize: function(){
					this.on('change',this.valChange,this);
				},
	valChange: 	function(model,val,options){
					console.log(model);
				}
});


function formSummary(summary){
	
	summary[0].added.forEach(function(frm,idx,arr){
		var formName = frm.getAttribute('name') || $(frm).index();
		
		// Create a backbone model for each form
		bam.forms[formName] = new bam.FormModel();
		$(frm).find('input,select,textarea').each(function(i,itm){
			var itmName = itm.getAttribute('name') || $(itm).index();

			bam.forms[formName].set(itmName,$(itm).on('change input',function(){
				bam.forms[formName].set(itmName,$(this).val());
			}).val());
		});
	});
}

// Observe any forms that get loaded on the page
observerSummary = new MutationSummary({ 
	callback: 	formSummary, 
	queries: 	[{ element: 'form' }]
});