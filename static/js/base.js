
/*根据屏幕适配font-size*/

/*;(function (doc, win) {
    var docEl     = doc.documentElement,
        resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
        recalc    = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';//屏幕大于750，font-size:100px;
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);*/


;(function($, window, document,undefined) {
     
    var Tfn = function($,doc) { 
        this.header            = $('header'),
        this.center            = $('#wrapper'), 
        this.footer            = $('footer'),
        this.windowWidth       = ('innerWidth' in window) ? window.innerWidth : document.documentElement.clientWidth,//屏幕宽度
        this.windowHeight      = ('innerHeight' in window) ? window.innerHeight : document.documentElement.clientHeight,//屏幕高度
        this.IEnum             = parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""));//如果是ie浏览器，ie的版本数
        this.isAnimating       = false,//判断动画是否进行中
        this.aniTime           = 600,  //动画时间
        this.support           = { animations : Modernizr.cssanimations },//是否支持1，animations
        this.animEndEventNames = {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            },
        this.animEndEventName = this.animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
        this.onEndAnimation    = function( el, callback ) {//动画所属元素，如果不支持animations回调函数。
            var self = this;
            var onEndCallbackFn = function( ev ) {
                if( self.support.animations ) {
                    if( ev.target != this ) return;
                    this.removeEventListener( self.animEndEventName, onEndCallbackFn );
                }
                if( callback && typeof callback === 'function' ) { callback.call(); }
            };
            if( self.support.animations ) {
                el.addEventListener( self.animEndEventName, onEndCallbackFn );
            }
            else {
                onEndCallbackFn();
            }
        },
        this.init();
        /*var transEndEventNames = {  
            'WebkitTransition' : 'webkitTransitionEnd',  
            'MozTransition'    : 'transitionend',  
            'OTransition'      : 'oTransitionEnd',  
            'msTransition'     : 'MSTransitionEnd',  
            'transition'       : 'transitionend'  
        },  
        this.transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ]; //transition结束事件*/
    }
     
    Tfn.prototype = {
        //初始化
        init  : function() { 

            if (!!window.ActiveXObject || "ActiveXObject" in window){$('body').addClass("ie");}
            if(this.IEnum<9){
                alert("您的浏览器版本过低，请下载IE9及以上版本");return false;
            }else if(this.IEnum==9){
                $('body').addClass("ie9");
            }else if(this.IEnum==10){
                $('body').addClass("ie10");
            }else if(this.IEnum==11){
                $('body').addClass("ie11");
            }
            this.contentInit();
            this.appNav();
            this.downMove();
            this.picMove();
            this.picCut();
            this.dialog();
            this.scrolly();
			$('.video-btn').on('click',function(){
				var _src = $('.video-bj').attr('data-url');
				$('#lunVideoTan').find('source').attr('src',_src);
				console.log(_src);
				$('#lunVideoTan')[0].load();
				$('#lunVideoTan')[0].play();
			});

        },
        //内容层min-height
        contentInit:function(){
            var self      = this,
                minHeight =self.windowHeight - (self.header.height() + self.footer.height());
            self.center.css('min-height',minHeight+'px');

            $('.picBox').each(function(index,e){
                var wid=$(this).width(),
                    hei=parseInt(wid*($(this).attr('data-hei')));
                $(this).css('height',hei+"px");
            });
        },

        //页面切换（针对setinterval）
        VisibilityChange:function ( gofn , backfn ) {
            var hiddenProperty = 'hidden' in document ? 'hidden' :
                'webkitHidden' in document ? 'webkitHidden' :
                    'mozHidden' in document ? 'mozHidden' :
                        null;
            var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
            var onVisibilityChange = function(){
                if (!document[hiddenProperty]) {
                    backfn.call();
                }else{
                    gofn.call();
                }
            };
            document.addEventListener(visibilityChangeEvent, onVisibilityChange);
        },

        //手机菜单动画
        appNav: function(){
            var self     = this,
                appNav   = $('.app-nav'),
                getApp   = appNav.find('.getAppNav'),
                appUl    = appNav.find('ul'),
                appLi    = appUl.find('li'),
                appUlWid = appUl.attr('data-width'),
                showAni  = appUl.attr('data-effect'),
                hideAni  = appUl.attr('data-hideAni');
            appUl.css('width',(this.windowWidth*appUlWid)+'px');
            getApp.on('click',function(e){
                if(self.isAnimating) return false;
                self.isAnimating = true;
                var isActive     = $(this).hasClass('menuActive');
                $(this).toggleClass('menuActive');
                if(isActive){
                    appLi.removeClass(showAni).addClass(hideAni);
                    setTimeout(function(){
                        appUl.hide();
                        self.isAnimating = false;
                    },self.aniTime);
                }else{
                    appLi.removeClass(hideAni).addClass(showAni);
                    appUl.show();
                    setTimeout(function(){
                        self.isAnimating = false;
                    },self.aniTime);
                }

            });
        },

        //下拉动画
        downMove:function(){
            var self     = this,
                downBox  = $('.layout-down'),
                ishave   = downBox.length<=0 ? true : false;
            if(ishave) return false;
            if(self.isAnimating) return false;
            var isOpen  = function(){
                    console.log("下拉");
                },//下拉时回调函数
                isClose = function(){
                    console.log("未下拉");
                };//未下拉时回调函数
            var isActive     = false;
            downBox.on('click',function(e){
                self.isAnimating = true;
                var isAni        = $(this).hasClass('father'),
                    txtBox       = $(this).find('.downTxt'),
                    Tdown        = $(this).parents('.layout-down'),
                    down         = $(this).find('ul'),
                    downLi       = down.find('li'),
                    showAni      = down.attr('data-effect')||'fadeInDown',
                    hideAni      = down.attr('data-hideAni')||'fadeOutDown';
                isActive     = $(this).attr('data-on')|| false;
                function downToggle(e){
                    isActive = isActive==='true'?true:false;
                    console.log(isActive);
                    if( isActive ) {
                        downLi.removeClass(showAni).addClass(hideAni);
                        self.onEndAnimation(downLi[0],function(){
                            down.hide();
                            self.isAnimating = false;
                        });
                        // callback on close
                        isClose( this );
                    }
                    else {
                        down.show();
                        downLi.removeClass(hideAni).addClass(showAni);

                        // callback on open
                        isOpen( this );   
                    }
                    isActive = !isActive;
                    e.parents('.layout-down').attr('data-on',isActive);
                }
                downToggle(down);
                downLi.on('click',function(){
                    var txt = $(this).html();
                    txtBox.html(txt);
                });
            });         
        },

        //图片切割
        picCut:function () {
            var self   = this,
                Tbox   = $( '.picCut' ),
                Tpic   = Tbox.find( 'img' ),
                src    = Tpic.attr('src'),
                rang   = Tbox.attr('data-hei'),
                boxMsg = {'width':Tbox.width(),'height':parseInt(Tbox.width()*rang)},
                rowNum = Tbox.attr( 'data-row' ),
                effect = Tbox.attr( 'data-effect' )||'',
                delay  = Tbox.attr( 'data-delay' )||0,
                colNum = Tbox.attr( 'data-col' );
            var mwid   = boxMsg.width/colNum,
                mhei   = boxMsg.height/rowNum;
            for(var i  = 0;i<rowNum;i++){
                for(var n = 0;n<colNum;n++){
                    str    = '<div class="cut animated '+effect+'" style="animation-delay:'+(delay*n*i)+'s;width: '+mwid+'px;height:'+mhei+'px;top:'+mhei*i+'px;left:'+mwid*n+'px;"><img style="width: '+boxMsg.width+'px;height:'+boxMsg.height+'px;top:-'+mhei*i+'px;left:-'+mwid*n+'px;"  src="'+src+'"></div>';
                    Tbox.append(str);
                }
            }

        },

        //transform滚动惯性视差（背景滚动视差）
        scrolly:function () {
            var defaults = {
                wrapper: '#scrolly',
                parent_move : true,//容器跟随惯性滚动
                targets : '.scrolly-el',
                bgParallax : false,//背景惯性滚动
                wrapperSpeed: 0.08,
                targetSpeed: 0.02,
                targetPercentage: 0.1
            };
            var requestAnimationFrame =
                window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
            var extend = function () {
                // Variables
                var extended = {};
                var deep = false;
                var i = 0;
                var length = arguments.length;
                // Merge the object into the extended object
                var merge = function (obj) {
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            extended[prop] = obj[prop];
                        }
                    }
                };
                // Loop through each object and conduct a merge
                for ( ; i < length; i++ ) {
                    var obj = arguments[i];
                    merge(obj);
                }

                return extended;

            };
            var scrolly = function(){
                this.Targets = [];
                this.TargetsLength = 0;
                this.wrapper = '';
                this.windowHeight = 0;
                this.wapperOffset = 0;
            };
            scrolly.prototype = {
                isAnimate: false,
                isResize : false,
                scrollId: "",
                resizeId: "",
                init : function(options){
                    this.settings = extend(defaults, options || {});
                    this.wrapper = document.querySelector(this.settings.wrapper);

                    if(this.wrapper==="undefined"){
                        return false;
                    }
                    this.targets = document.querySelectorAll(this.settings.targets);
                    document.body.style.height = this.wrapper.clientHeight + 'px';

                    this.windowHeight = window.clientHeight;
                    this.attachEvent();
                    this.apply(this.targets,this.wrapper);
                    this.animate();
                    this.resize();
                },
                apply : function(targets,wrapper){
                    if(this.settings.parent_move){
                        this.wrapperInit();
                    }
                    this.targetsLength = targets.length;
                    for (var i = 0; i < this.targetsLength; i++) {
                        var attr = {
                            offset : targets[i].getAttribute('data-offset'),
                            speedX : targets[i].getAttribute('data-speed-x'),
                            speedY : targets[i].getAttribute('data-speed-Y'),
                            percentage : targets[i].getAttribute('data-percentage'),
                            horizontal : targets[i].getAttribute('data-v')
                        };
                        this.targetsInit(targets[i],attr);
                    }
                },
                wrapperInit: function(){
                    this.wrapper.style.width = '100%';
                    this.wrapper.style.position = 'fixed';
                },
                targetsInit: function(elm,attr){

                    this.Targets.push({
                        elm : elm,
                        offset : attr.offset ? attr.offset : 0,
                        offsetTop : $(elm).offset().top,
                        hei : $(elm).height(),
                        horizontal : attr.horizontal ? attr.horizontal : 0,
                        top : 0,
                        left : 0,
                        speedX : attr.speedX ? attr.speedX : 1,
                        speedY : attr.speedY ? attr.speedY : 1,
                        percentage :attr.percentage ? attr.percentage : 0
                    });
                },
                scroll : function(){
                    var scrollTopTmp = document.documentElement.scrollTop || document.body.scrollTop;
                    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var offsetBottom = this.scrollTop + this.windowHeight;
                    if(this.settings.parent_move){
                        this.wrapperUpdate(this.scrollTop);
                    }
                    for (var i = 0; i < this.Targets.length; i++) {
                        this.targetsUpdate(this.Targets[i]);
                    }
                },
                animate : function(){
                    this.scroll();
                    this.scrollId = requestAnimationFrame(this.animate.bind(this));
                },
                wrapperUpdate : function(){

                    this.wapperOffset += (this.scrollTop - this.wapperOffset) * this.settings.wrapperSpeed;
                    this.wrapper.style.transform = 'translate3d(' + 0 + ',' +  Math.round(-this.wapperOffset* 100) / 100 + 'px ,' + 0 + ')';
                },
                targetsUpdate : function(target){
                    var wH = $(window).height();
                    target.offsetTop = $(target.elm).offset().top;
                    target.top += ((this.scrollTop - target.offsetTop + (wH-target.hei)/2) * Number(this.settings.targetSpeed) * Number(target.speedY) - target.top) * this.settings.targetPercentage;
                    target.left += ((this.scrollTop - target.offsetTop + (wH-target.hei)/2) * Number(this.settings.targetSpeed) * Number(target.speedX) - target.left) * this.settings.targetPercentage;
                    var targetOffsetTop = ( parseInt(target.percentage) - target.top - parseInt(target.offset) );
                    var offsetY = Math.round(targetOffsetTop * -100) / 100;
                    var offsetX = 0;
                    if(target.horizontal){
                        var targetOffsetLeft = ( parseInt(target.percentage) - target.left - parseInt(target.offset) );
                        offsetX = Math.round(targetOffsetLeft * -100) / 100;
                    }
                    if(this.settings.bgParallax){
                        if(target.horizontal){
                            $(target.elm).css({backgroundPosition:  offsetX +'px 50%'});
                        }else{
                            $(target.elm).css({backgroundPosition: '50% ' + offsetY + 'px'});
                        }
                    }else{
                        target.elm.style.transform = 'translate3d(' + offsetX + 'px ,' + offsetY + 'px ,' + 0 +')';
                    }
                },
                resize: function(){
                    var self = this;
                    self.windowHeight = (window.innerHeight || document.documentElement.clientHeight || 0);
                    if( parseInt(self.wrapper.clientHeight) != parseInt(document.body.style.height)){
                        document.body.style.height = self.wrapper.clientHeight + 'px';
                    }
                    self.resizeId = requestAnimationFrame(self.resize.bind(self));
                },
                attachEvent : function(){
                    var self = this;
                    window.addEventListener('resize',(function(){
                        if(!self.isResize){
                            cancelAnimationFrame(self.resizeId);
                            cancelAnimationFrame(self.scrollId);
                            self.isResize = true;
                            setTimeout((function(){
                                self.isResize = false;
                                self.resizeId = requestAnimationFrame(self.resize.bind(self));
                                self.scrollId = requestAnimationFrame(self.animate.bind(self));
                            }),200);
                        }
                    }));

                }
            };
            window.scrolly = new scrolly();
            return scrolly;
        },

        //单张图片切换动画(.Tpage,.moveNext,.movePrev);
        picMove:function(){
            var self = this,
                picBox = $('.component'),
                ishave = picBox.length<=0 ? true : false;
            if(ishave) return false;
            
            var animEndEventNames = {
                'WebkitAnimation' : 'webkitAnimationEnd',
                'OAnimation' : 'oAnimationEnd',
                'msAnimation' : 'MSAnimationEnd',
                'animation' : 'animationend'
            },
            // animation end event name
            animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
            component        = null,
            items            = null,
            current          = 0,//当前页数
            itemsCount       = null,
            navNext          = document.querySelectorAll( '.moveNext' ),
            navPrev          = document.querySelectorAll( '.movePrev' ),
            Tpage            = null,
            pageChange       = document.querySelectorAll( '.pageChange' ),//可选择页数
            TpageChange      = null,
            itemTxt          = null,//轮播文字
            loop             = null,
            loopTime         = 6000;//轮播间隔时间

            function reinit(_this,dir) {
                component  = _this.parents( '.component' )[0],//容器
                items      = component.querySelector( 'ul.itemwrap' ).children,//图片项
                itemsCount = items.length,
                Tpage      = $(component.querySelector( '.Tpage' )),
                current    = parseInt(Tpage.attr( 'data-num' )),
                TpageChange= component.querySelectorAll( '[data-change]' );
                itemTxt    = component.querySelectorAll( '[data-txt]');
                if(dir === 'num'){
                    var Tnum   = _this.attr('data-change');
                }
                navigate( dir , Tnum);

            }
            function goloop() {
                var _this = $('[data-loop]');
                if(_this.length>0){
                    loop=setInterval(function () {
                        for(var i =0;i<_this.length;i++){
                            reinit($(_this[i]),'next');
                        }
                    },loopTime);
                }
            }

            function navigate( dir , num) {

                if( self.isAnimating) return false;
                self.isAnimating = true;
                clearInterval(loop);
                var cntAnims = 0;
                var currentItem = items[ current ];
                var currentTxt  = $(itemTxt).eq(current);
                if( dir === 'next' ) {
                    current = current < itemsCount - 1 ? current + 1 : 0;
                }
                else if( dir === 'prev' ) {
                    current = current > 0 ? current - 1 : itemsCount - 1;
                }
                else if( dir === 'num'){
                    current = parseInt(num);
                }
                Tpage.html('0'+(current+1)).attr('data-num',current);
                $(TpageChange).eq(current).addClass('on').siblings().removeClass('on');
                var nextItem = items[ current ];
                var nextTxt  = $(itemTxt).eq(current);
                var onEndAnimationCurrentItem = function() {
                    this.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
                    classie.removeClass( this, 'current' );
                    currentTxt.removeClass('on txtHide');
                    classie.removeClass( this, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
                    ++cntAnims;
                    if( cntAnims === 2 ) {
                        self.isAnimating = false;
                        goloop();
                    }
                }

                var onEndAnimationNextItem = function() {
                    this.removeEventListener( animEndEventName, onEndAnimationNextItem );
                    classie.addClass( this, 'current' );
                    nextTxt.addClass('on').removeClass('txtShow');
                    classie.removeClass( this, dir === 'next' ? 'navInNext' : 'navInPrev' );
                    ++cntAnims;
                    if( cntAnims === 2 ) {
                        self.isAnimating = false;
                        goloop();
                    }
                }

                if( self.support.animations ) {
                    currentItem.addEventListener( animEndEventName, onEndAnimationCurrentItem );
                    nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
                    classie.addClass( currentItem, dir === 'next' ? 'navOutNext' : 'navOutPrev' );
                    classie.addClass( nextItem, dir === 'next' ? 'navInNext' : 'navInPrev' );
                    currentTxt.addClass('txtHide');
                    nextTxt.addClass('txtShow');
                }
                else {
                    console.log('不支持css3 animated');
                    $(currentItem).hide();
                    $(nextItem).fadeIn(200);
                    setTimeout(function(){
                        classie.removeClass( currentItem, 'current' );
                        classie.addClass( nextItem, 'current' );
                        self.isAnimating = false;
                    },200)
                }
            }

            (function(){
                for(var i=0;i<navNext.length;i++){
                    navNext[i].addEventListener( 'click', function( ev ) {
                        reinit($(this),'next');
                        ev.preventDefault();
                    } );
                }
                for(var n=0;n<navPrev.length;n++){
                    navPrev[n].addEventListener( 'click', function( ev ) {
                        reinit($(this),'prev');
                        ev.preventDefault();
                    } );
                }
                for(var j=0;j<pageChange.length;j++){
                    var list = pageChange[j].querySelectorAll( '[data-change]' );
                    for(var h=0;h<list.length;h++){
                        list[h].addEventListener( 'click', function( ev ) {
                            if(this.getAttribute('data-change')!=current){
                                reinit($(this),'num');
                            }
                            ev.preventDefault();
                        } );
                    }
                }
                var gofn=function () {
                    clearInterval(loop);
                };
                var backfn=function () {
                    goloop();
                }
                self.VisibilityChange(gofn,backfn);
                goloop();
            })();
        },

        //弹窗
        dialog:function(){
            var self          = this,
                have       = $('.dialog'),
                ishave        = have.length<=0 ? true : false;
            if(ishave) return false;
            var dialogBtn     = document.querySelectorAll( '[data-dialog]' ),
                Tdialog       = null,
                closeBtn      = null,
                mask          = null,
                isOpen        = false,
                onOpenDialog  = function(){
                    console.log("弹窗打开");
                    $('#bloc').addClass('dialogMove');
                },//弹窗打开时回调函数
                onCloseDialog = function(){
                    console.log("弹窗关闭");
                    $('#bloc').removeClass('dialogMove');
                };//弹窗关闭时回调函数
            function dialogToggle(e){
                if( isOpen ) {
                    classie.remove( e, 'dialog--open' );
                    classie.add( e, 'dialog--close' );
                    self.onEndAnimation(e.querySelector( '.dialog_content' ),function(){
                        classie.remove( e, 'dialog--close' );
                    });

                    // callback on close
                    onCloseDialog( this );
                }
                else {
                    classie.add( e, 'dialog--open' );
                    // callback on open
                    onOpenDialog( this );   
                }
                isOpen = !isOpen;
            }
            (function(){
                for(var i=0;i<dialogBtn.length;i++){
                    var e = dialogBtn[i];
                    dialogBtn[i].addEventListener('click', function(ev){
                        Tdialog  = document.getElementById( this.getAttribute( 'data-dialog' ) );
                        closeBtn = Tdialog.querySelector('[data-dialog-close]');
                        mask     = Tdialog.querySelector( '.dialog_mask' );
                        dialogToggle(Tdialog);
                        if(!closeBtn.getAttribute('data-fn')||closeBtn.getAttribute('data-fn')==null){
                            closeBtn.addEventListener('click',function(ev){
                                dialogToggle(Tdialog);
                                this.setAttribute('data-fn','true');
                            });
                        }
                        if(!mask.getAttribute('data-fn')||mask.getAttribute('data-fn')==null){
                            mask.addEventListener('click',function(ev){
                                dialogToggle(Tdialog);
                                this.setAttribute('data-fn','true');
                            });
                        }
                    });

                }
            })()
        }
        
    }
    
    $.fn.myPlugin = (function(doc) {
        new alan.scrollAnimate();
        var myFn = new Tfn($,doc);
    })(document);
})(jQuery, window, document);



