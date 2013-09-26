Wui.Form = function(args){
    $.extend(this,{
		afterCreate:function(){},
		disabled:	false,
		errCls:		'wui-form-err',
		labelPos:	'top'
	}, args, {
    	dataValid:  null,
    	formChanged:false,
		el:			$('<div>'),
		errs:       []
    });
    
    this.init();
};
Wui.Form.prototype = $.extend(new Wui.O(),{
	clearData:  function(){ this.setData(); },
	dispErrs:   function(){
                    var msg = '';
                    for(var e in this.errs) msg += this.errs[e] + '<br/>';
                    Wui.errRpt(msg,'Form Errors')
                },
	each:		function(f){
					for(var i = this.items.length - 1; i >= 0; i--)
						if(!(itm instanceof Wui.Note))
							f(this.items[i],i);
					return true;
		    	},
	getData:    function(){
                    if(this.validate())	{ return this.getRawData(); }
                    else				{ this.dispErrs(); return false; }
                },
    getField:   function(fieldname){
                    var retval = null;
                    this.each(function(itm){ if(itm.name == fieldname) retval = itm.val(); });
                    return retval;
                },
    getFrmItm:	function(fieldname){
                    var retItm = undefined;
					this.each(function(itm,idx){ if(itm.name == fieldname) retItm = itm; });
                    return retItm;
				},
	getRawData: function(){
                    var ret = {};
                    this.each(function(itm){ ret[itm.name] = itm.val(); });
                    return ret;
                },
    init:		function(){
				    this.el.addClass('wui-form labels-' + this.labelPos);
			    },
	normFrmItem:function(itm){
					var me = this;
					if(itm.ftype && !(itm instanceof Wui.FormField)){
						var ft = itm.ftype.split('.');
						if(window[ft[0]] && window[ft[0]][ft[1]])	return new window[ft[0]][ft[1]]( $.extend(itm,((itm.disabled && itm.disabled === true) ? {disabled:me.disabled} : {})) );
						else										throw('Object type ' +itm.ftype+ ' is not defined.');
					}else if(itm instanceof Wui.FormField){
						return $.extend(itm,{disabled:me.disabled});
					}else{
						return itm;
					}
				},
	place:      function(){
					var me = this;
					if(me.items === undefined) me.items = [];
					$.each(me.items, function(i,itm){ me.items[i] = me.normFrmItem(itm); });
					Wui.O.prototype.place.call(this);
	                this.afterCreate();
                },
	push:		function(){
					for(var i in arguments) arguments[i] = this.normFrmItem(arguments[i]);
					Wui.O.prototype.push.apply(this,arguments);
				},
	remFrmItm:	function(fieldname){
                    var me = this;
					this.each(function(itm,idx){ if(itm.name == fieldname) Wui.O.prototype.splice.call(me,idx,1); });
                    return true;
				},
	setData:    function(d){
                    this.each(function(itm){ itm.val((d) ? d[itm.name] : null); });
                },
	disable:	function(val){ return this.each(function(itm){ itm.disable(); }); },
	enable:		function(val){ return this.each(function(itm){ itm.enable(); }); },
	setField:   function(fieldname, d){
	                this.each(function(itm){ if(itm.name == fieldname) itm.val(d); });
            	},
	throwErr:   function(m){this.errs.push(m); return false;},
	validate:   function(){
	                var me = this;
					me.errs = [];
	                me.each(function(itm){ 
	                	if(itm.el && itm.el.toggleClass) { itm.el.toggleClass(me.errCls,!itm.validate()); }
	                });
	                return (me.errs.length == 0);
            	}
});