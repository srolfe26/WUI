// Toggle.js

var me = this,
                            wrapper =   $('<div>').addClass('wrap'),
                            toggler =   $('<div class="toggle-type">' + 
                                                   '<div class="toggler">' + 
                                                       '<div class="opt-1">upload</div>' + 
                                                       '<div class="toggle-btn">&nbsp;</div>' + 
                                                       '<div class="opt-2">search</div>' + 
                                                   '</div>' + 
                                            '</div>').click(function(){
                                                var toggler = $(this);
                                                
                                                toggler.toggleClass('toggle-alt');
                                            });

                        me.id = Wui.id();

                        Wui.FileBasic.prototype.init.apply(me,arguments);
                        
                        (me.elAlias || me.el).addClass('av-file-combo');

                        me.el.on('filechanged',function(evnt,me,filelist){
                            me.el[(filelist.length > 0) ? 'addClass' : 'removeClass']('av-has-file');
                        });


                        me.el.append(toggler);
                        me.append(wrapper);
                        me.elAlias = wrapper;
                    },