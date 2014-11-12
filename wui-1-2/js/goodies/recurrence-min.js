Wui.DateRange=function(e){var t=this,n=$.extend({value:{start_date:null,end_date:null},cls:"date-fields",init:function(){var e="start_dt"+Wui.id(),n="end_dt"+Wui.id();t.endDate=new Wui.Datetime({blankText:"End Date or # of Occurrences",dateOnly:true,cls:n,dispFormat:"END DATE: ddd MM-dd-yyyy"});t.items=[t.startDate=new Wui.Datetime({blankText:"Start Date",dateOnly:true,cls:e,dispFormat:"START DATE: ddd MM-dd-yyyy"}),t.endDate];Wui.FormField.prototype.init.call(this);t.el.on("valchange","."+n,function(e,n,r,i){if(r!=i){t.value.end_date=r;t.setChanged()}e.stopPropagation()});t.el.on("valchange","."+e,function(e,n,r,i){if(r!=i){t.endDate.minDate=t.value.start_date=r;t.setChanged()}e.stopPropagation()})},setVal:function(e){t.value=$.extend({},e);t.startDate.val(t.value.start_date);t.endDate.val(t.value.end_date)},getVal:function(){return t.value},validate:function(){var e=true;if((t.required||t.value.end_date!==null)&&t.value.start_date===null)e=t.parent.throwError("The start date for '"+t.label+"' cannot be blank.");if(t.value.end_date!==null&&t.value.start_date.valueOf()>=t.value.end_date.valueOf())e=t.parent.throwError("The end date for '"+t.label+"' is before the start date.");return e}},e);$.extend(t,new Wui.FormField(n));t.init()};Wui.DateRange.prototype=new Wui.FormField;Wui.Recurrence=function(e){$.extend(this,e,{field:$("<input>").attr({type:"text"}),maxPreviews:4,recurrenceFn:function(){},valIsOK:false});this.init()};Wui.Recurrence.prototype=$.extend(new Wui.Text,{blankText:"Recurrence Description",clearValue:function(){return this.value={startDate:null,endDate:null,unit:null,number:null,weekday:null,month:null,ordinal:null,monthDay:null,occurrences:null}},dispFormat:"ddd MM-dd-yyyy",dtFormat:"yyyy-MM-dd",feedback:function(){var e=this,t=e.value,n=Wui.Datetime.prototype;e.valIsOK=false;e.dates.endDate.enable();if(t){var r=n.validDate(t.startDate),i=t.unit?"add"+t.unit.charAt(0).toUpperCase()+t.unit.slice(1)+"s":"";if(t.occurrences==1&&r){e.dates.endDate.disable();e.setRecurrenceFn(e.recur(function(e){return e}))}else if(t.unit=="week"&&$.isNumeric(t.weekday)){e.setRecurrenceFn(e.recur(function(e,n){var r=e[i](t.number*n),s=r.getMonth(),o=r.getFullYear(),u=r.getDate()+(t.weekday-r.getDay());return new Date(o,s,u)}))}else if(t.unit=="month"&&$.isNumeric(t.monthDay)){e.setRecurrenceFn(e.recur(function(e,n){var r=e[i](t.number*n);return new Date(r.getFullYear(),r.getMonth(),t.monthDay)}))}else if((t.unit=="month"||t.unit=="year"&&t.month!==null)&&$.isNumeric(t.ordinal)&&$.isNumeric(t.weekday)){e.setRecurrenceFn(e.recur(function(e,n){var r=e[i](t.number*n),s=t.unit=="year"?t.month:r.getMonth(),o=r.getFullYear(),u=new Date(o,s,1),a=0,f;while(u.getMonth()==s&&a<t.ordinal){if(u.getDay()==t.weekday){a=a+1;f=new Date(u.getTime())}if(a==t.ordinal)return u;else u.addDays(1)}return f}))}else if(t.unit=="year"&&$.isNumeric(t.month)&&$.isNumeric(t.monthDay)){e.setRecurrenceFn(e.recur(function(e,n){var r=e[i](t.number*n);return new Date(r.getFullYear(),t.month,t.monthDay)}))}else if(r&&t.unit&&t.ordinal===null&&t.weekday===null){e.setRecurrenceFn(e.recur(function(e,n){return e[i](t.number*n)}))}else{e.rangeDiv.el.empty();e.setRecurrenceFn();if(e.field.val().length>0)e.rangeDiv.el.html(e.sarcasmArray[Wui.randNum(0,e.sarcasmArray.length-1)]);e.helpBtn.place()}}},getVal:function(){var e=this,t=e.value,n="",r=Wui.Datetime.prototype.validDate;n+=(r(t.startDate)?t.startDate.toString(e.dtFormat):"")+"|";n+=(r(t.endDate)?t.endDate.toString(e.dtFormat):"")+"|";n+=(t.unit||"")+"|";n+=(t.number||"")+"|";n+=(t.weekday||"")+"|";n+=(t.month||"")+"|";n+=(t.ordinal||"")+"|";n+=(t.monthDay||"")+"|";n+=t.occurrences||"";return n},init:function(){var e=this,t=e.name+Wui.id();e.helpBtnName="help-"+Wui.id();$(document).on("wuibtnclick click",'[name="'+e.helpBtnName+'"]',e.showHelp);e.items=[e.dates=new Wui.DateRange({required:true}),e.rangeDiv=new Wui.O({name:t,el:$("<div>").addClass("recur-feedback").attr({tabindex:-1}),items:[e.helpBtn=new Wui.Button({text:"Help",name:e.helpBtnName})]})];Wui.Text.prototype.init.call(e);(e.elAlias||e.el).addClass("wui-recurrence");e.dates.startDate.val("today");$.extend(e.dates.endDate,{translateDate:function(e){var t=this;e.toLowerCase().replace(/([\d]+)(?:x|\stimes)+/,function(n,r){t.value=parseInt(r);e="";return""});if(e.length)return Wui.Datetime.prototype.translateDate.call(t,e);else return t.value},processDate:function(e){var t=this,n=e||t.field.val();if(n.length>0){t.value=t.translateDate(n);if(!t.validDate(t.value)){if($.isNumeric(t.value))t.displayDate("Ends after "+t.value+" occurrences.");else t.displayDate(t.sarcasmArray[Wui.randNum(0,t.sarcasmArray.length-1)])}else{t.displayDate()}return t.value}else{t.value=null;t.displayDate("")}}});$(document).on("calupdate."+e.dates.name,function(t,n,r,i){if(e.value){var s=0,o=e.value,u=Wui.Datetime.prototype.validDate,a=(new Date(i.getTime())).addDays(i.getDaysInMonth()),f=o&&u(o.startDate)?o.startDate:new Date,l=new Date(f.getTime());a=u(o.endDate)&&o.endDate<a?o.endDate:a;r.find(".cal-recurrence").removeClass("cal-recurrence");if(e.valIsOK){while(l<a&&s>-1){l=new Date(f.getTime());l=e.recurrenceFn(l,s);if(l.getMonth()==i.getMonth()&&l.getFullYear()==i.getFullYear())r.find("a:contains("+l.getDate()+"):first").addClass("cal-recurrence");s++;if($.isNumeric(o.occurrences)&&s>=o.occurrences)s=-1}}}})},interpret:function(){this.clearValue();var e=this,t=e.value,n=Wui.Datetime.prototype,r=$.extend(true,[],n.days),i=$.extend(true,[],n.months),s=e.dates.startDate.val(),o=e.dates.endDate.val(),u=e.field.val();r.push.apply(r,n.shortDays);i.push.apply(i,n.shortMonths);var a=new RegExp("("+r.join("\\b|")+")"),f=new RegExp("("+i.join("\\b|")+")"),l=new RegExp("("+i.join("\\b|")+") ([\\d]+)"),c=new RegExp("(one|two|three|four\\b|five|six|seven|eight|nine|ten|eleven|"+"twelve|twenty|thirty|forty|fifty|sixty|sevety|eighty|ninety|"+"hundred|thousand|million|billion|trillion|and|\\s|\\d|-)+","g");if(n.validDate(s))t.startDate=s;if(n.validDate(o)){t.endDate=o}else if($.isNumeric(o)){t.occurrences=o}u=u.toLowerCase().replace(/(once|one time|single)/,function(n){t.occurrences=1;if(o!==null)e.dates.endDate.val(t.endDate=null);u="";return""}).replace(c,function(e,t){if(e.length>1)return" "+n.num2Dec(e)+" ";else return" "}).replace(/(first|second|third|fourth|last)/,function(n,r,i){t.ordinal=e.ordTranslate(n);return n}).replace(/^day ([\d]+)|the ([\d]+)(?:th|st|nd|rd)/,function(e,n){t.monthDay=parseInt(n);return" "}).replace(l,function(e,n,r){t.monthDay=r;var s=$.inArray(n,i);t.month=s>i.length/2?s-i.length/2:s;return n}).replace(f,function(e,n){var r=$.inArray(n,i);t.month=r>i.length/2?r-i.length/2:r;return n}).replace(/(\bday|daily|week|month|year)/,function(e,n,r){if(!$.isNumeric(t.number))t.number=1;e=e=="daily"?"day":e;return t.unit=e}).replace(a,function(e,n){var i=$.inArray(n,r);t.weekday=i>r.length/2?i-r.length/2:i;if($.isNumeric(t.weekday)&&t.unit===null)$.extend(t,{unit:"week",number:1});return e}).replace(/[\d]+/,function(e){t.number=parseInt(e);return e})},makeString:function(){var e=this,t=e.value,n=Wui.Datetime.prototype.validDate(t.startDate);if(t.occurrences==1&&n){return"Once"}else if(t.unit=="week"&&$.isNumeric(t.weekday)){return"Every "+t.number+" weeks on "+Date.CultureInfo.dayNames[t.weekday]}else if(t.unit=="month"&&$.isNumeric(t.monthDay)){return"Day "+t.monthDay+" of every "+t.number+" months."}else if((t.unit=="month"||t.unit=="year")&&$.isNumeric(t.ordinal)&&$.isNumeric(t.weekday)){return"Every "+t.number+" "+t.unit+"(s) on the "+e.ordTranslate(t.ordinal)+" "+Date.CultureInfo.dayNames[t.weekday]+(t.unit=="year"?" in "+Date.CultureInfo.monthNames[t.month]:"")}else if(t.unit=="year"&&$.isNumeric(t.month)&&$.isNumeric(t.monthDay)){return"Every "+t.number+" years on "+Date.CultureInfo.monthNames[t.month]+" "+t.monthDay}else if(n&&t.unit&&t.ordinal===null&&t.weekday===null){return"Every "+t.number+" "+t.unit+"(s)"}else{return""}},ordTranslate:function(e){var t=["first","second","third","fourth","last"],n={first:1,second:2,third:3,fourth:4,last:5};return $.isNumeric(e)?t[e-1]:n[e]},recur:function(e){var t=this,n=t.value,r=Wui.Datetime.prototype;if(n&&r.validDate(n.startDate)){var i=0,s=t.maxPreviews,o=t.rangeDiv,u=$.isNumeric(n.occurrences)?n.occurrences:t.maxPreviews,a=r.validDate(n.startDate),f=r.validDate(n.endDate);o.el.empty();if(u===1&&a){t.rangeDiv.append($("<div>").text("One time on:"))}else if(n.after_last){s--;o.append($("<div>").text("After last occurrence:"))}while(i<u&&i<s){try{var l=new Date(n.startDate.getTime());l=e(l,i);if(f&&l>n.endDate){i=t.maxPreviews}else{var c=l.getTime()>n.startDate.getTime()?l:n.startDate;o.append($("<div>").text(c.toString(t.dispFormat)));i++}}catch(h){i=s}}if(f){if(i>=s)o.append($("<div>").text("until "+n.endDate.toString(t.dispFormat)))}else if($.isNumeric(n.occurrences)){if(n.occurrences>1&&u>s)o.append($("<div>").text("...and "+(n.occurrences-s)+" more times"))}else{o.append($("<div>").text("continues indefinitely"))}}return e},sarcasmArray:["Not quite.","Huh?","Nope","Arg..","Sorry","What?","Bleck.","Nuh-uh.","Keep Trying.","No Entiendo."],setListeners:function(e){function t(t){e.interpret();e.feedback();t.stopPropagation()}e.dates.startDate.el.on("input valchange",t);e.dates.endDate.el.on("input valchange",t);return e.field.on("keyup",t)},setRecurrenceFn:function(e){this.valIsOK=typeof e=="function";if(this.valIsOK)return this.recurrenceFn=e;else return this.recurrenceFn=function(){}},setVal:function(e){e=e||"08-04-2014||0|year|10|2|10|2||";if(typeof e=="string"){var t=this,n=e.split("|"),r=n[9];t.dates.startDate.val(n[0]);if($.isNumeric(r)&&r>1){t.dates.endDate.field.val(r+"x");t.dates.endDate.processDate()}else{t.dates.endDate.val(n[1])}$.extend(t.value,{unit:n[2].length?n[2]:null,number:n[3].length?parseInt(n[3]):null,weekday:n[4].length?parseInt(n[4]):null,month:n[5].length?parseInt(n[5]):null,ordinal:n[6].length?parseInt(n[6]):null,monthDay:n[7].length?parseInt(n[7]):null,occurrences:n[8].length?parseInt(n[8]):null});t.field.val(t.makeString());t.feedback()}},showHelp:function(){var e=new Wui.Window({title:"Recurrence Help",isModal:false,width:400,items:[new Wui.O({el:$("<p>Possible values to enter into the recurrence field are:</p>").addClass("wui-msg")}),new Wui.O({el:'<ul class="recurrence_v"><li>Once</li>'+"<li>Every [number] of [(day|week|month|year)](s)</li>"+"<li>Every [number] of weeks on [weekday]</li>"+"<li>Every [number] of months on [ordinal] [weekday]</li>"+"<li>Day [month_day] of every [number] months</li>"+"<li>Every [number] of years on [month] [month_day]</li>"+"<li>Every [number] of years on [ordinal] [weekday] of [month]</li></ul>"}),new Wui.O({el:$("<p>Possible end date options are a date, or a number of occurrences "+"in the format '6x' or '20 times'.</p>").addClass("wui-msg")})]})},validTest:function(){return this.valIsOK||false}})