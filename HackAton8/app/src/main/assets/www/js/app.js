var app={
debug:true,
    //debugInBrowser:true,
    //debugInDiv:true,

    /* This code below, combined with the touch module of zepto helps in resolving issues
     with fastclick on android devices : some devices receive "tap" event before "click" and
     some don't. ensure only one event is fired in all cases.
     */
touchTimer:null,
touch:function(selector, touchHandler, allowDefault){
    var preventDefault = allowDefault ? false : true;
    var elem=$(selector)
    var touchup=function(){
        elem.removeClass('touched');
    };
    var touching=function(e){
        if (!$(this).hasClass('touched')){
            $(this).addClass('touched');
            clearTimeout(app.touchTimer);
            app.touchTimer = setTimeout(touchup,1000);
            touchHandler.apply([this, e ]);

        }
        if (preventDefault)
            return false;
    }
    elem.unbind('tap').on('tap',touching);
    elem.unbind('click').on('click',touching);
},

    /*
     initPage binds some common links like push and pop and send the page title to the native side
     */
initPage:function(title){

    app.touch('a.push',function(){
              if ( ! $(this).hasClass('disabled') ){
              cobalt.navigate('push',$(this).attr('data-href'),$(this).attr('data-classid'))
              }
              });
    app.touch('a.pop',function(){
              cobalt.navigate('pop');
              });
    app.touch('a.dismiss',function(){
              cobalt.navigate('dismiss');
              });
    app.touch('a.modal',function(){
              cobalt.navigate('modal',$(this).attr('data-href'));
              });

    if (title){
        cobalt.sendEvent('setTexts',{
                         title : title
                        });
    }

},
}