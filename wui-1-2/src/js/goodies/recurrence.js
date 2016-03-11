/*! Wui 1.2.1
 * Copyright (c) 2014 Stephen Rolfe Nielsen - Utah State University Research Foundation 
 *
 * @license MIT
 * https://static.usurf.usu.edu/resources/wui-1.2.1/license.html
 */
/************************* DATE RANGE OBJECT ****************************/
Wui.DateRange = function(args){
    var me = this,
        params = $.extend({
            value:      {start_date: null, end_date: null},
            cls:        'date-fields',
            init:       function(){
                            var stCls = 'start_dt' + Wui.id(), endCls = 'end_dt' + Wui.id(); 

                            me.endDate = new Wui.Datetime({
                                blankText:  'End Date or # of Occurrences',
                                dateOnly:   true,
                                cls:       endCls,
                                dispFormat: 'END DATE: ddd MM-dd-yyyy'
                            });
                            me.items =  [
                                me.startDate = new Wui.Datetime({
                                    blankText:  'Start Date',
                                    dateOnly:   true,
                                     cls:       stCls,
                                    dispFormat: 'START DATE: ddd MM-dd-yyyy'
                                }),
                                me.endDate
                            ];
                            Wui.FormField.prototype.init.call(this);

                            // Add Listeners for valchange and stop propagation
                            me.el.on('valchange', '.'+endCls, function(evnt,f,newVal,oldVal){
                                if(newVal !== oldVal){
                                    me.value.end_date = newVal;
                                    me.setChanged();
                                }

                                evnt.stopPropagation();
                            });
                            me.el.on('valchange', '.'+stCls, function(evnt,f,newVal,oldVal){
                                if(newVal !== oldVal){
                                    me.endDate.minDate = me.value.start_date = newVal;
                                    me.setChanged();
                                }

                                evnt.stopPropagation();
                            });
                        },
            setVal:     function(sv){
                            me.value = $.extend({}, sv);
                            me.startDate.val(me.value.start_date);
                            me.endDate.val(me.value.end_date);
                        },
            getVal:     function(){ return me.value; },
            validate:   function(){
                            var retVal = true;
                            
                            if((me.required || me.value.end_date !== null) && me.value.start_date === null)
                                retVal = me.parent.throwError('The start date for \'' +me.label+ '\' cannot be blank.');
                            
                            if(me.value.end_date !== null && me.value.start_date.valueOf() >= me.value.end_date.valueOf())
                                retVal = me.parent.throwError('The end date for \'' +me.label+ '\' is before the start date.');
                            
                            return retVal;
                        }
        },args);
    $.extend(me,new Wui.FormField(params));  
    me.init();
};
Wui.DateRange.prototype = new Wui.FormField();


/************************************* RECURRENCE OBJECT ****************************************/
Wui.Recurrence = function(args){ 
    $.extend(this,args,{ 
        /** HTML field */
        field:          $('<input>').attr({type:'text'}),

        /* The maximum number of dates to show in the preview box */
        maxPreviews:    4,

        /** A place holder for the function defining date addition for the current recurrence */
        recurrenceFn:   function(){},

        /** A flag for whether or not the recurrence specified is an acceptable value. */
        valIsOK:        false
    });
    this.init();
};

Wui.Recurrence.prototype = $.extend(new Wui.Text(),{
    blankText:      'Recurrence Description',
    
    /** Sets the value of the control to blank 
    @return The value object with blank values */
    clearValue:     function(){
                        return (this.value = {
                            startDate:      null,
                            endDate:        null,
                            unit:           null,
                            number:         null,
                            weekday:        null,
                            month:          null,
                            ordinal:        null,
                            monthDay:       null,
                            occurrences:    null
                        });
                    },

    /** String specifying the format that will be displayed to the user. */
    dispFormat:     'ddd MM-dd-yyyy',

    /** String for format of the date returned from the datepicker. */
    dtFormat:       'yyyy-MM-dd',

    /** Interprets the value stored in the control to a series of dates for the user to preview. */
    feedback:       function(){
                        var me = this, 
                            mv = me.value,
                            p = Wui.Datetime.prototype;

                        me.valIsOK = false;
                        me.dates.endDate.enable();

                        if(mv){
                            // Rules for creating series of dates
                            var startOK = p.validDate(mv.startDate),
                                unitFunc = (mv.unit) ? 'add' + mv.unit.charAt(0).toUpperCase() + mv.unit.slice(1) + 's' : '';


                            // For single occurrences
                            if(mv.occurrences == 1 && startOK){
                                me.dates.endDate.disable();
                                me.setRecurrenceFn(me.recur(function(dt){ return dt; }));

                            // Every [#] of weeks on [weekday]
                            }else if(mv.unit == 'week' && $.isNumeric(mv.weekday)){
                                me.setRecurrenceFn(me.recur(function(dt,n){
                                    var week = dt[unitFunc](mv.number * n),
                                        m = week.getMonth(),
                                        y = week.getFullYear(),
                                        d = week.getDate() + (mv.weekday - week.getDay());
                                    return new Date(y,m,d);
                                }));


                            // Day [month_day] of every [#] months
                            }else if(mv.unit == 'month' && $.isNumeric(mv.monthDay)){
                                me.setRecurrenceFn(me.recur(function(dt,n){
                                    var m = dt[unitFunc](mv.number * n);
                                    return new Date(m.getFullYear(),m.getMonth(),mv.monthDay);
                                }));


                            // Every [#] of months on [ordinal] [weekday]
                            // And Every [#] of years on [ordinal] [weekday] of [month]
                            }else if(
                                (mv.unit == 'month' || (mv.unit == 'year' && mv.month !== null)) && 
                                $.isNumeric(mv.ordinal) && 
                                $.isNumeric(mv.weekday)
                            ){
                                me.setRecurrenceFn(me.recur(function(dt,n){
                                    var addD = dt[unitFunc](mv.number * n),
                                        m = (mv.unit == 'year') ? mv.month : addD.getMonth(),
                                        y = addD.getFullYear(),
                                        d = new Date(y,m,1),
                                        ordCount = 0,
                                        lastWeekday;

                                    while(d.getMonth() == m && ordCount < mv.ordinal){
                                        if(d.getDay() == mv.weekday){
                                            ordCount = ordCount + 1;
                                            lastWeekday = new Date(d.getTime());
                                        }
                                            
                                        if(ordCount == mv.ordinal)  return d;
                                        else                        d.addDays(1);
                                    }

                                    return lastWeekday;
                                }));


                            // For Every [#] of years on [month] [month_day]
                            }else if(mv.unit == 'year' && $.isNumeric(mv.month) && $.isNumeric(mv.monthDay)){
                                me.setRecurrenceFn(me.recur(function(dt,n){
                                    var yearDay = dt[unitFunc](mv.number * n);
                                    return new Date(yearDay.getFullYear(),mv.month,mv.monthDay);
                                }));


                            // For a number of units from start date
                            }else if(startOK && mv.unit && mv.ordinal === null && mv.weekday === null){
                                me.setRecurrenceFn(me.recur(function(dt,n){
                                    return dt[unitFunc](mv.number * n);
                                }));


                            // Returns some snark and show the help button
                            }else{
                                me.rangeDiv.el.empty();
                                me.setRecurrenceFn(); // blanks out the recurrence function
                                
                                // Give sass only if the person has typed some part of a recurrence string
                                if(me.field.val().length > 0)
                                    me.rangeDiv.el.html(me.sarcasmArray[Wui.randNum(0,(me.sarcasmArray.length -1))]);
                                
                                me.helpBtn.place();
                            }
                        }
                    },

    /** 
    @private
    Extends FormField.getVal()
    */
    getVal:         function(){ 
                        var me = this, 
                            mv = me.value, 
                            retString = '',
                            v = Wui.Datetime.prototype.validDate;

                        retString += (v(mv.startDate) ? mv.startDate.toString(me.dtFormat) : '') + '|';
                        retString += (v(mv.endDate) ? mv.endDate.toString(me.dtFormat) : '') + '|';
                        retString += (mv.unit || '') + '|';
                        retString += (mv.number || '') + '|';
                        retString += (mv.weekday || '') + '|';
                        retString += (mv.month || '') + '|';
                        retString += (mv.ordinal || '') + '|';
                        retString += (mv.monthDay || '') + '|';
                        retString += (mv.occurrences || '');

                        return retString;
                    },
    
    /** Initializes the function. Sets up listeners for the calendars */
    init:           function(){
                        var me = this, datesName = me.name + Wui.id();

                        // Help Button listeners
                        me.helpBtnName = 'help-' + Wui.id();
                        $(document).on('wuibtnclick click','[name="' +me.helpBtnName+ '"]',me.showHelp);

                        // Control elements
                        me.items = [
                            me.dates = new Wui.DateRange({required:true}),
                            me.rangeDiv = new Wui.O({
                                name:   datesName,
                                el:     $("<div>").addClass('recur-feedback').attr({tabindex:-1}),
                                items:  [ me.helpBtn = new Wui.Button({ text:'Help', name:me.helpBtnName }) ]
                            })
                        ];

                        // Initialization
                        Wui.Text.prototype.init.call(me);
                        (me.elAlias || me.el).addClass('wui-recurrence');

                        me.dates.startDate.val('today');

                        // Change the end date field to handle the number of occurrences
                        $.extend(me.dates.endDate,{
                            translateDate:  function(ds){
                                                var self = this;

                                                ds.toLowerCase().replace(/([\d]+)(?:x|\stimes)+/,function(m,occ){
                                                    self.value = parseInt(occ);
                                                    ds = '';
                                                    return '';
                                                });

                                                if(ds.length)   return Wui.Datetime.prototype.translateDate.call(self,ds);
                                                else            return self.value;
                                            },
                            processDate:    function(dtString){
                                                var self = this,
                                                    dateString = dtString || self.field.val();
                                                
                                                if (dateString.length > 0) {
                                                    self.value = self.translateDate(dateString);
                                                    
                                                    //Returns a message to the user that the program doesn't understand them
                                                    if(!self.validDate(self.value)){
                                                        if($.isNumeric(self.value))
                                                            self.displayDate('Ends after ' + self.value + ' occurrences.');
                                                        else
                                                            self.displayDate(
                                                                self.sarcasmArray[Wui.randNum(0,(self.sarcasmArray.length -1))]
                                                            );
                                                    }else{
                                                        self.displayDate();
                                                    }

                                                    return self.value;
                                                }else{
                                                    self.value = null;
                                                    self.displayDate('');
                                                }
                                            }
                        });

                        // Highlight calendar dates that are recurring matches
                        $(document).on('calupdate.' + me.dates.name,function(evnt,obj,cal,calDt){
                            if(me.value){
                                var n = 0,
                                    mv = me.value,
                                    valid = Wui.Datetime.prototype.validDate,
                                    finalDay = new Date(calDt.getTime()).addDays(calDt.getDaysInMonth()),
                                    startDate = (mv && valid(mv.startDate)) ? mv.startDate : new Date(),
                                    dt = new Date(startDate.getTime());

                                // Incorporate end date
                                finalDay = (valid(mv.endDate) && mv.endDate < finalDay) ? mv.endDate : finalDay;

                                cal.find('.cal-recurrence').removeClass('cal-recurrence');
                                if(me.valIsOK){
                                    while(dt < finalDay && n > -1){
                                        dt = new Date(startDate.getTime());
                                        dt = me.recurrenceFn(dt,n);
                                        if(dt.getMonth() == calDt.getMonth() && dt.getFullYear() == calDt.getFullYear())
                                            cal.find('a:contains(' +dt.getDate()+ '):first').addClass('cal-recurrence');
                                        
                                        n++;
                                        if($.isNumeric(mv.occurrences) && n >= mv.occurrences)
                                            n = -1;
                                    }
                                }
                            }
                        });
                    },

    /** Translates user inputted text into distinct values in the control. */
    interpret:      function(){
                        // Clear the current value of the control completely
                        this.clearValue();

                        var me = this,
                            mv = me.value, 
                            p = Wui.Datetime.prototype,
                            days = $.extend(true,[],p.days),
                            months = $.extend(true,[],p.months),
                            sd = me.dates.startDate.val(),
                            ed = me.dates.endDate.val(),
                            s = me.field.val();

                        // Making the days and months arrays and their regular expressions for day/month name matching
                        days.push.apply(days,p.shortDays);
                        months.push.apply(months,p.shortMonths);
                        
                        var weekdays = new RegExp('(' + days.join('\\b|') +')'),
                            monthsWithout = new RegExp('(' + months.join('\\b|') +')'),
                            monthsWithDate = new RegExp('(' + months.join('\\b|') +') ([\\d]+)'),
                            numRegex = new RegExp('(one|two|three|four\\b|five|six|seven|eight|nine|ten|eleven|'+
                                                  'twelve|twenty|thirty|forty|fifty|sixty|sevety|eighty|ninety|'+
                                                  'hundred|thousand|million|billion|trillion|and|\\s|\\d|-)+','g');

                        // Set start and end dates (or end occurrences quantity) if available
                        if(p.validDate(sd))     mv.startDate = sd;
                        if(p.validDate(ed)){
                            mv.endDate = ed;
                        }else if($.isNumeric(ed)){
                            mv.occurrences = ed;
                        }
                            
                        // Pick out occurrences that happen once - nothing after this replace matters now.
                        s = s.toLowerCase().replace(/(once|one time|single)/,function(m){
                            mv.occurrences = 1;
                            if(ed !== null)
                                me.dates.endDate.val(mv.endDate = null);
                            s = '';
                            return '';
                        })
                        // All plain text numbers to numerals
                        .replace(numRegex,function(m,f){
                            if(m.length > 1)    return ' ' + (p.num2Dec(m)) + ' ';
                            else                return ' ';
                        })
                        // Get the week ordinal
                        .replace(/(first|second|third|fourth|last)/,function(m,f,s){
                            mv.ordinal = me.ordTranslate(m);
                            return m;
                        })
                        // Get a day of the month
                        .replace(/^day ([\d]+)|the ([\d]+)(?:th|st|nd|rd)/,function(m,day){
                            mv.monthDay = parseInt(day);
                            return ' ';
                        })
                        // Gets phrases like 'July 4'
                        .replace(monthsWithDate,function(m,month,day){
                            mv.monthDay = day;

                            var month_num = $.inArray(month,months);
                            mv.month = (month_num > (months.length/2)) ? month_num - (months.length/2) : month_num;
                            return month;
                        })
                        // Gets months
                        .replace(monthsWithout,function(m,month){
                            var month_num = $.inArray(month,months);
                            mv.month = (month_num > (months.length/2)) ? month_num - (months.length/2) : month_num;
                            return month;
                        })
                        // Gets the units
                        .replace(/(\bday|daily|week|month|year)/,function(m,f,s){
                            if(!$.isNumeric(mv.number))
                                mv.number = 1;
                            m = (m == 'daily') ? 'day' : m;
                            return (mv.unit = m);
                        })
                        // Gets a weekday
                        .replace(weekdays,function(m,wd){
                            var day_num = $.inArray(wd,days);
                            mv.weekday = (day_num > (days.length/2)) ? day_num - (days.length/2) : day_num;

                            if($.isNumeric(mv.weekday) && mv.unit === null)
                                $.extend(mv,{
                                    unit:   'week',
                                    number: 1
                                });

                            return m;
                        })
                        // Gets the number or the magnitude applied to the units
                        .replace(/[\d]+/,function(m){
                            mv.number = parseInt(m);
                            return m;
                        });
                    },

    /** The opposite of interpret(), this function turns the value in the control into human-readable text. */
    makeString:     function(){
                        var me = this, 
                            mv = me.value,
                            startOK = Wui.Datetime.prototype.validDate(mv.startDate);

                        if(mv.occurrences == 1 && startOK){
                            return 'Once';

                        }else if(mv.unit == 'week' && $.isNumeric(mv.weekday)){
                            return 'Every ' +mv.number+ ' weeks on ' + Date.CultureInfo.dayNames[mv.weekday];

                        }else if(mv.unit == 'month' && $.isNumeric(mv.monthDay)){
                            return 'Day ' +mv.monthDay+ ' of every ' +mv.number+ ' months.';

                        }else if(
                            (mv.unit == 'month' || mv.unit == 'year') && 
                            $.isNumeric(mv.ordinal) && 
                            $.isNumeric(mv.weekday)
                        ){
                            return  'Every ' +mv.number+ ' ' +mv.unit+ '(s) on the ' +
                                    me.ordTranslate(mv.ordinal) +' '+ Date.CultureInfo.dayNames[mv.weekday] + 
                                    ((mv.unit == 'year') ? ' in ' + Date.CultureInfo.monthNames[mv.month] : '');

                        }else if(mv.unit == 'year' && $.isNumeric(mv.month) && $.isNumeric(mv.monthDay)){
                            return 'Every ' +mv.number+ ' years on ' +Date.CultureInfo.monthNames[mv.month]+ ' ' + mv.monthDay;

                        }else if(startOK && mv.unit && mv.ordinal === null && mv.weekday === null){
                            return  'Every ' +mv.number+ ' ' +mv.unit+ '(s)';
                        }else{
                            return '';
                        }
                    },

    /** 
    @private
    @param  string/number    word  A word describing a week order: 'first','second','third','fourth','last', or a number

    Translates an ordinal string to a number, or a number to an ordinal string.
    */
    ordTranslate:   function(word){
                        var num = ['first','second','third','fourth','last'],
                            ordinal = {
                                first:      1,
                                second:     2,
                                third:      3,
                                fourth:     4,
                                last:       5
                            };
                        return $.isNumeric(word) ? num[(word - 1)] : ordinal[word];
                    },

    /** 
    @private
    @param  function    incFunc  A function that is passed a start date and a iterator value that returns a date

    Takes a recurrence function and loops over it according to maxPreviews and the end date of the recurrence
    */
    recur:          function(incFunc){
                        var me = this, 
                            mv = me.value,
                            p = Wui.Datetime.prototype;

                        if(mv && p.validDate(mv.startDate)){
                            var n = 0,
                                loopMax = me.maxPreviews,
                                rd = me.rangeDiv,
                                occ = $.isNumeric(mv.occurrences) ? mv.occurrences : me.maxPreviews,
                                startOK = p.validDate(mv.startDate),
                                endSet = p.validDate(mv.endDate);

                            rd.el.empty();

                            if(occ === 1 && startOK){
                                me.rangeDiv.append($('<div>').text('One time on:'));
                            }else if(mv.after_last){
                                loopMax--;
                                rd.append( $('<div>').text('After last occurrence:') );
                            }

                            while(n < occ && n < loopMax){
                                try{
                                    var dt = new Date(mv.startDate.getTime());
                                    dt = incFunc(dt,n);

                                    if(endSet && dt > mv.endDate){
                                        n = me.maxPreviews;
                                    }else{
                                        var showDt = (dt.getTime() > mv.startDate.getTime()) ? dt : mv.startDate;
                                        rd.append( $('<div>').text(showDt.toString(me.dispFormat)) );
                                        n++;
                                    }
                                }catch(e){
                                    n = loopMax;
                                }
                            }

                            if(endSet){
                                if(n >= loopMax)
                                    rd.append( $('<div>').text('until ' + mv.endDate.toString(me.dispFormat)));
                            }else if($.isNumeric(mv.occurrences)){
                                if(mv.occurrences > 1 && occ > loopMax)
                                    rd.append( $('<div>').text('...and ' +(mv.occurrences - loopMax)+ ' more times'));
                            }else{
                                rd.append( $('<div>').text('continues indefinitely'));
                            }
                        }

                        return incFunc;
                    },

    /** Array of feedback words or phrases to randomly display when a user's input is not understood by the control */
    sarcasmArray:   ['Not quite.','Huh?','Nope','Arg..','Sorry','What?','Bleck.','Nuh-uh.','Keep Trying.','No Entiendo.'],

    /** Adds listeners to the fields. */
    setListeners:   function(t){
                        t.dates.startDate.el.on('input valchange',process);
                        t.dates.endDate.el.on('input valchange',process);
                        return t.field.on('keyup',process);

                        function process(e){ 
                            t.interpret();
                            t.feedback();
                            e.stopPropagation();
                        }
                    },

    /** 
    @private
    @param  function    fn  A function to describe the date addition for a recurrence value 

    Sets the recurrenceFn value or sets it to a blank function. Also sets valIsOk for the object. */
    setRecurrenceFn:function(fn){
                        this.valIsOK = typeof fn == 'function';
                        if(this.valIsOK)    return (this.recurrenceFn = fn);
                        else                return (this.recurrenceFn = function(){});
                    },

    /** 
    @private
    @param  string    sv  A pipe-delimited value that is parsed and loaded as the controls value

    Extends FormField.setVal()
    */
    setVal:         function(sv){
                        sv = sv || "08-04-2014||0|year|10|2|10|2||";

                        if(typeof sv == 'string'){
                            var me = this, 
                                arr = sv.split('|'),
                                end = arr[9];

                            me.dates.startDate.val(arr[0]);
                            
                            // Handle the end date
                            if($.isNumeric(end) && end > 1){
                                me.dates.endDate.field.val(end + 'x');
                                me.dates.endDate.processDate();
                            }else{
                                me.dates.endDate.val(arr[1]);
                            }

                            $.extend(me.value,{
                                unit:           ((arr[2].length) ? arr[2] : null),
                                number:         ((arr[3].length) ? parseInt(arr[3]) : null),
                                weekday:        ((arr[4].length) ? parseInt(arr[4]) : null),
                                month:          ((arr[5].length) ? parseInt(arr[5]) : null),
                                ordinal:        ((arr[6].length) ? parseInt(arr[6]) : null),
                                monthDay:       ((arr[7].length) ? parseInt(arr[7]) : null),
                                occurrences:    ((arr[8].length) ? parseInt(arr[8]) : null)
                            });
                            me.field.val(me.makeString());
                            me.feedback();
                        }
                    },

    /** Shows a Wui.Window that explains recurrences that the control will understand */
    showHelp:       function(){
                        var win = new Wui.Window({
                            title:  'Recurrence Help',
                            isModal:false,
                            width:  400,
                            items:  [
                                        new Wui.O({
                                            el: $('<p>Possible values to enter into the recurrence field are:</p>').addClass("wui-msg")
                                        }),
                                        new Wui.O({
                                            el: '<ul class="recurrence_v"><li>Once</li>' +   
                                                '<li>Every [number] of [(day|week|month|year)](s)</li>' +
                                                '<li>Every [number] of weeks on [weekday]</li>' +             
                                                '<li>Every [number] of months on [ordinal] [weekday]</li>' +  
                                                '<li>Day [month_day] of every [number] months</li>' +          
                                                '<li>Every [number] of years on [month] [month_day]</li>' +
                                                '<li>Every [number] of years on [ordinal] [weekday] of [month]</li></ul>'
                                        }),
                                        new Wui.O({
                                            el: $('<p>Possible end date options are a date, or a number of occurrences '+
                                                'in the format \'6x\' or \'20 times\'.</p>').addClass("wui-msg")
                                        })
                                    ]
                        });
                    },

    /** Returns whether the value on the control is valid. */
    validTest:      function(){
                        return this.valIsOK || false;
                    }
});