// JavaScript Document

var data={//全局变量
	_vw:$(window).width(),
	_vh:$(window).height(),
    Tpage:0,
    isAni:false,
    _home:$('#page')
};

var init=function(){

};

$(document).ready(function(){

    new alan.scrollAnimate();

	init();
    var home_next = function(){
        if( data.isAni) return false;
        data.isAni = true;
        var items            = document.querySelectorAll('.row'),
            itemsCount       = items.length;
        if(data.Tpage==(itemsCount-1)){
            $('footer').addClass('active');
            data.Tpage = (-1);
            setTimeout(function () {
                data.isAni = false;
            },800);
        }else if(data.Tpage==(-1)){
            setTimeout(function () {
                data.isAni = false;
            },800);
        }
        else{
            _navigate( 'next' ,items,itemsCount);
        }
    };
    var home_prev =function(){
        if( data.isAni) return false;
        data.isAni = true;
        var items            = document.querySelectorAll('.row'),
            itemsCount       = items.length;

        if(data.Tpage>0){
            _navigate( 'prev' ,items,itemsCount);
        }else{
            setTimeout(function () {
                data.isAni = false;
            },800);
        }
        if(data.Tpage==(-1)){
            $('footer').removeClass('active');
            data.Tpage = (itemsCount-1);
            setTimeout(function () {
                data.isAni = false;
            },800);
        }
    };

	if(data._home.length>0){
        var _b = $('#page');
        if(window.innerWidth>800){
            stop();
            _b.mousewheel(function(event) {
               
                if(event.deltaY == -1){
                    home_next();
                }
                else if(event.deltaY == 1){
                    home_prev();
                }
            });
        }
	    homeFn.picmove();//引用首页函数1
	    homeFn.fn2();//引用首页函数2
        homeFn.dis();
        homeFn.fn3();
        homeFn.play();
    }
});

var homeFn = {
    picmove:function () {
        var box = $('.loop');
        var Tfn=function (opts) {
            this.parent = opts.parent;
            this.pic = opts.photo;
            this.isAnimating = false;
            this.current = 0;
            this.timer = null;
            this.loop = false;
            this.items = this.parent.querySelector( '.itemwrap' ).children;
            this.itemsCount = this.items.length;
            this.prev = this.parent.querySelector('.prev');
            this.next = this.parent.querySelector('.next');
        };
        Tfn.prototype={
            init:function () {
                var self = this;
                // this.next.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.navigate( 'next' ); } );
                // this.prev.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.navigate( 'prev' ); } );
                this.pic.on('click',function () {
                    self.navigate('num',$(this) );
                });
                self.goloop();
            },
            navigate:function (dir,el) {
                var self = this;
                clearTimeout(self.timer);
                if( self.isAnimating) return false;
                self.isAnimating = true;
                var cntAnims = 0;
                var currentItem = self.items[ self.current ];

                if( dir === 'next' ) {
                    self.current = self.current < self.itemsCount - 1 ? self.current + 1 : 0;
                }
                else if( dir === 'prev' ) {
                    self.current = self.current > 0 ? self.current - 1 : self.itemsCount - 1;
                }
                else if( dir === 'num' ) {
                    self.current = el.index();
                }
                var nextItem = self.items[ self.current ];
                _on(self.pic.eq(self.current));
                function a() {
                    classie.removeClass( currentItem, 'on' );
                    classie.removeClass( currentItem, dir === 'prev' ? 'navOutPrev' : 'navOutNext' );
                    ++cntAnims;
                    if( cntAnims === 2 ) {
                        setTimeout(function () {
                            self.isAnimating = false;
                        },200);
                    }
                }
                function b() {
                    classie.addClass( nextItem, 'on' );
                    classie.removeClass( nextItem, dir === 'prev' ? 'navInPrev' : 'navInNext' );
                    ++cntAnims;
                    if( cntAnims === 2 ) {
                        setTimeout(function () {
                            self.isAnimating = false;
                            self.goloop();
                        },200);
                    }
                }

                classie.addClass( currentItem, dir === 'prev' ? 'navOutPrev' : 'navOutNext' );
                classie.addClass( nextItem, dir === 'prev' ? 'navInPrev' : 'navInNext' );
                setTimeout(function () {
                    a();
                    b();
                },1500);
            },
            goloop:function () {
                var self = this;
                self.timer=setTimeout(function () {
                    self.loop = self.parent.getAttribute('data-loop') == 'true' ? true :false;
                    if(self.loop){
                        self.navigate( 'next' );
                    }else{
                        self.goloop();
                    }
                },3000);
            }
        };
        box.each(function () {
            var _this = $(this)[0];
            var pic = $(this).find('.pager').find('li');
            new Tfn({
                parent:_this,
                photo:pic
            }).init();
        });
    },
    fn2:function () {
        var c = document.getElementById('line');
        var dx = c.getContext('2d');

        var w = c.width = window.innerWidth;
        var h = c.height = window.innerHeight;

        var draw = function(a, b, t) {
            dx.lineWidth = 0.8;
            dx.fillStyle = 'rgba(165, 195, 210, 1)';
            dx.fillRect(0, 0, w, h);
            dx.clearRect(0, 0, w, h);
            for (var i = -60; i < 60; i += 1) {
                dx.strokeStyle = 'rgba(165, 195, 210, 0.3)';
                dx.beginPath();
                dx.moveTo(0, h / 2);
                for (var j = 0; j < w; j += 10) {
                    dx.lineTo(10 * Math.sin(i / 10) +
                        j + 0.008 * j * j,
                        Math.floor(h / 2 + j / 2 *
                            Math.sin(j / 50 - t / 50 - i / 118) +
                            (i * 0.9) * Math.sin(j / 25 - (i + t) / 65)));
                };
                dx.stroke();
            }
        };
        var t = 0;

        window.addEventListener('resize', function() {
            c.width = w = window.innerWidth;
            c.height = h = window.innerHeight;
            dx.fillStyle = 'hsla(277, 95%, 55%, 1)';
        }, false);

        var run = function() {
            window.requestAnimationFrame(run);
            t += 1;
            draw(33, 52 * Math.sin(t / 2400), t);
        };

        run();
    },
    dis:function () {
        var box = $('#r5'),
            _pic = box.find('.photo'),
            _btn = box.find('.pager').find('li'),
            _msg = box.find('.items').find('li');
        if(window.innerWidth<800){
            _pic = box.find('.photo_app');
        }
        _btn.on('click', function () {
            var _this = $(this),
                _n = _this.index();
            _on(_this);
            _on(_pic.eq(_n));
            _on(_msg.eq(_n));
        });
    },
    fn3:function () {
        var _box = $('#fn3'),
            _fn4 = $('#fn4'),
            _h = $('._href'),
            _go = _box.find('.g-down');
        _go.on('click',function () {
            var _this = $(this),
                _num = _this.attr('data-num'),
                _other = _this.parents('li').siblings().find('p'),
                _p = _this.next();
            _on(_this.parents('li'));
            _p.slideToggle();_other.slideUp();
            _fn4.find('img').eq(_num).addClass('on').siblings().removeClass('on');
        });
        _h.find('a').on('mouseenter',function () {
            var n = $(this).index();
            _on(_fn4.find('img').eq(n));
        });
    },
    play:function () {
        var _btn = $('.play');
        var _pop = $('#pop'),
            _close = $('._close'),
            _v = _pop.find('.media');
        _btn.on('click',function () {
            var _this = $(this),
                _src = _this.attr('data-src');
            _pop.addClass('on');
            _v.attr('src',_src);
            _v[0].load();
        });
        _close.on('click',function () {
            $(this).parents('#pop').removeClass('on');
            _v.attr('src','');
        });
    }

};

function _on(el) {
    el.addClass('on').siblings().removeClass('on');
}

function _navigate( dir ,items,itemsCount) {

    data.isAni = true;
    var cntAnims = 0;

    var currentItem = items[ data.Tpage ];

    if( dir === 'next' ) {
        data.Tpage = data.Tpage < itemsCount - 1 ? data.Tpage + 1 : 0;
    }
    else if( dir === 'prev' ) {
        data.Tpage = data.Tpage > 0 ? data.Tpage - 1 : itemsCount - 1;
    }
    else if( dir === 'num' ){
        data.Tpage = data.choosePage;
    }
    var nextItem = items[ data.Tpage ];
    if(data.Tpage==2){$('header').addClass('on')}else{$('header').removeClass('on')};
    function a() {
        classie.removeClass( currentItem, 'on' );
        classie.removeClass( currentItem, dir === 'prev' ? 'navOutPrev' : 'navOutNext' );
        ++cntAnims;
        if( cntAnims === 2 ) {
            setTimeout(function () {
                data.isAni = false;
            },100);
        }
    }
    function b() {
        classie.addClass( nextItem, 'on' );
        classie.removeClass( nextItem, dir === 'prev' ? 'navInPrev' : 'navInNext' );
        ++cntAnims;
        if( cntAnims === 2 ) {
            setTimeout(function () {
                data.isAni = false;
            },100);
        }
    }

    classie.addClass( currentItem, dir === 'prev' ? 'navOutPrev' : 'navOutNext' );
    classie.addClass( nextItem, dir === 'prev' ? 'navInPrev' : 'navInNext' );
    setTimeout(function () {
        a();
        b();
    },800);
}

var mo=function(e){e.preventDefault();};
function stop(){
    document.body.style.overflow='hidden';
    document.addEventListener("touchmove",mo,false);//禁止页面滑动
}
function move(){
    document.body.style.overflow='';//出现滚动条
    document.removeEventListener("touchmove",mo,false);
}










