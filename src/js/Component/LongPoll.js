(function($,Wui) {
    
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
                    window.setTimeout(function() { 
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

})(jQuery,window[_wuiVar]);
