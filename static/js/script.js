/* *************************************

	---------------------------
	MAIN SCRIPTS
	---------------------------

	TABLE OF CONTENTS
	---------------------------


	1. IndexBanner
	2. ProductBri
	3. ProductBriDian
	4. ProductCozzia
	5. ProductFuji
    6. ProductFujimedic
    7. Productyi
    8. ProductIndex

************************************* */

var theme = (function ( $, window, document ) {
    'use strict';

    var theme         = {},
        components    = { documentReady: [], pageLoaded: [] };

    /* 没有图片也能执行 */
    if ( $( 'img' ).length == 0 ) {
        $( 'body' ).prepend( '<img src="'+templateUrl+'/assets/images/blank.gif" alt="" style="display:none">' );
    }

    $( 'body' ).waitForImages( pageLoaded );
    $( document ).ready( documentReady );



    function documentReady( context ) {

        context = typeof context == typeof undefined ? $ : context;
        components.documentReady.forEach( function( component ) {
            component( context );
        });
    }

    function pageLoaded( context ){

        context = typeof context == "object" ? $ : context;
        components.pageLoaded.forEach( function( component ) {
            component( context );
        });
    }

    theme.setContext = function ( contextSelector ) {
        var context = $;
        if( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    theme.components         = components;
    theme.documentReady      = documentReady;
    theme.pageLoaded         = pageLoaded;

    return theme;
}( jQuery, window, document ) );

/*!
 *************************************
 * 1. IndexBanner
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var IndexBanner = function( $ ) {

        /* 新闻，换行 */
        var $newTitle = $('.new .banner .component .Tmsg > ul > li');

        $.each($newTitle,function (i,o) {
            $(o).html($(o).text().replace(/,/, "<br>"));
            $(o).html($(o).text().replace(/，/, "<br>"));
        });

        if($('body').hasClass('new_detail')){
            var $newTmid = $('.new_detail .Tpage .Tmid');
            $newTmid.children('*').removeAttr('style');
            $newTmid.children('*').children('*').removeAttr('style');
            $newTmid.children('*').children('*').children('*').removeAttr('style');
        }

        /* nav-width */
        var $navList = $('.nav .width-1200 .nav-list');
        var $navListUlLi = $('.nav .width-1200 .nav-list ul li');
        // $navList.css('width',$navListUlLi.width() * $navListUlLi.length + 'px');

        /* nav-er-width */
        var $childNavUl = $('.child-nav ul');
        $.each($childNavUl,function(i,o){
            $(o).css('width', $(o).outerWidth(true) + 10 + 'px');
        });

        /* 集团品牌高度 */
        var $introTmsg = $('.intro .Tpage .Tmid .goodsCon .Ttxt #component > .Tmsg');
        var $introTtxt = $('.intro .Tpage .Tmid .goodsCon .Ttxt');
        $introTtxt.css('paddingTop',$introTmsg.height()+70);

        /* 返回顶部 */
        var goTop = '<div id="goTop"><img src="static/images/goTop.png"></i></div>';
        $('body').append(goTop);
        var $goTopDom = $('#goTop');
		
	
        $(document).scroll(function(){
            if($(document).scrollTop() > 300){
                $goTopDom.show();
            }else{
                $goTopDom.hide();
            }
        });
        $goTopDom.click(function(){
            $('html, body').animate({scrollTop: 0}, 300);
        });


        if($('body').hasClass('index')){
            $('.flexslider').flexslider({
                animation: "fade",
                directionNav: false
            });
            var $controlNavA = $('.index .banner .flex-control-nav li a');
            $controlNavA.eq(0).html('A');
            $controlNavA.eq(1).html('R');
            $controlNavA.eq(2).html('E');
            $controlNavA.eq(3).html('S');

            var $page2Left = $('.index .index-page ul .page:nth-child(2) .page-2-btn .btn-left');
            var $page2Right = $('.index .index-page ul .page:nth-child(2) .page-2-btn .btn-right');

            $('.flexsliderMXCP').flexslider({
                animation: "slide",
                directionNav: true,
                customDirectionNav: $('.index .index-page ul .page:nth-child(2) .page-2-btn div')
            });

            /* 视频弹窗 */
            var $videoBtn = $('.index .banner .slides li .width-1200 .video-btn');
            var $videoTan  = $('.video-box');
            var $videoGb = $('.video-box .gb');
            var lunVideo = document.getElementById('lunVideo');
            var lunVideoTan = document.getElementById('lunVideoTan');
            if($(window).width() > 1200){
                lunVideo.play();
            } else {
                $('#lunVideo').remove();
            }

            if($(window).width() > 1100){
                $videoBtn.on('click',function(){
                    lunVideoTan.play();
                    $videoTan.show();
                });
                $videoGb.on('click',function(){
                    lunVideoTan.pause();
                    $videoTan.hide();
                });
            }

            if($(window).width() < 1100){
                $videoBtn.on('click',function(){
                    lunVideoTan.play();
                    $videoTan.addClass('on');
                });
                $videoGb.on('click',function(){
                    lunVideoTan.pause();
                    $videoTan.removeClass('on');
                });
            }
        }
    };

    theme.Pagination = {
        documentReady : IndexBanner
    };

    theme.components.documentReady.push( IndexBanner );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 2. ProductBri
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var ProductBri = function( $ ) {

        if($('body').hasClass('product')){
            /* 视频弹窗播放 */
            var $btnBoo = $('.btn-boo');
            var $btnBoo3 = $('.btn-boo3');
            var videoDom = document.getElementById('lunVideoTan');
            var videoDom1 = document.getElementById('lunVideoTan1');
            var videoDom2 = document.getElementById('lunVideoTan2');
            var videoDom3 = document.getElementById('lunVideoTan3');
            // console.log(videoDom);

            if($(window).width() > 1100){
                $btnBoo.on('click',function(){
                    $('.video-box').show();
                    videoDom.play();
                });
                $('.gb').on('click',function(){
                    $('.video-box').hide();
                    videoDom.pause();
                });

                $btnBoo3.on('click',function(){
                    if($(this).attr('data-index') === '0') {
                        $('.video-box1').show();
                        videoDom1.play();
                    }
                    if($(this).attr('data-index') === '1') {
                        $('.video-box2').show();
                        videoDom2.play();
                    }
                    if($(this).attr('data-index') === '2') {
                        $('.video-box3').show();
                        videoDom3.play();
                    }

                    $('.gb1').on('click',function(){
                        $('.video-box1').hide();
                        videoDom1.pause();
                    });
                    $('.gb2').on('click',function(){
                        $('.video-box2').hide();
                        videoDom2.pause();
                    });
                    $('.gb3').on('click',function(){
                        $('.video-box3').hide();
                        videoDom3.pause();
                    });
                });
            }

            if($(window).width() < 1100){
                $btnBoo.on('click',function(){
                    $('.video-box').addClass('on');
                    videoDom.play();
                });
                $('.gb').on('click',function(){
                    $('.video-box').removeClass('on');
                    videoDom.pause();
                });

                $btnBoo3.on('click',function(){
                    if($(this).attr('data-index') === '0') {
                        $('.video-box1').addClass('on');
                        videoDom1.play();
                    }
                    if($(this).attr('data-index') === '1') {
                        $('.video-box2').addClass('on');
                        videoDom2.play();
                    }
                    if($(this).attr('data-index') === '2') {
                        $('.video-box3').addClass('on');
                        videoDom3.play();
                    }

                    $('.gb1').on('click',function(){
                        $('.video-box1').removeClass('on');
                        videoDom1.pause();
                    });
                    $('.gb2').on('click',function(){
                        $('.video-box2').removeClass('on');
                        videoDom2.pause();
                    });
                    $('.gb3').on('click',function(){
                        $('.video-box3').removeClass('on');
                        videoDom3.pause();
                    });
                });
            }




            $('.product.product-fujimedic .page-4 .video-item .video-list').on('click',function(){
                // var src = $(this).attr('data-src');
                // $('#lunVideoTan').find('source').attr('src',src);
                // videoDom = document.getElementById('lunVideoTan');
                var index = $(this).index();
                console.log(index);
                $btnBoo3.attr('data-index',index);
            });

            var $pageH = $('.product .page');
            var $pageText = $('.product .page .width-1200 .page-text');

            $.each($pageText,function(i,o){
                var h = 0;
                $(o).children().each(function(i,o){
                    h += $(o).outerHeight(true);
                });
                $(this).css('height', h + 'px');
            });

            /* 判断图片高度 */
            var $pageImg = $('.product .page-img img');
            if($pageImg.height() > $pageH.height()){
                $pageImg.css('height',$pageH.height() - 100 + 'px');
            }

            /* page6 table height */
            var $page6H = $('.product.product-bri .page-6 .width-1200 .page-text');
            var $page6TitleH = $('.product.product-bri .page-6 .width-1200 .page-text .page-title');
            var $page6PH = $('.product.product-bri .page-6 .width-1200 .page-text .page-p');
            var $page6GobuyH = $('.product.product-bri .page-6 .width-1200 .page-text .gobuy');

            $page6H.css('height',$pageH.height() -200 + 'px');
            var $page6table = $('.product.product-bri .page-6 .page-text .page-table');
            $page6table.css('height',$pageH.height() - $page6TitleH.outerHeight(true) - $page6PH.outerHeight(true) - $page6GobuyH.outerHeight(true) - 200 + 'px');

            /* page6 btn tab */
            var $page6BtnLi = $('.product.product-bri .page-6 .page-btn ul li');
            var $page6Img = $('.product.product-bri .page-6 .page-img img');
            var $page6Table = $('.product.product-bri .page-6 .page-text .page-table table');
            $page6BtnLi.on('click',function(){
                $(this).addClass('on').siblings().removeClass('on');
                var index = $(this).index();
                $page6Img.eq(index).show().siblings().hide();
                $page6Table.eq(index).show().siblings().hide();
            });

            /* page3titleLinght */
            var $page3titleLinght = $('.product.product-bri .page-3 .page-3-yuan .page-title');
            $page3titleLinght.css('line-height',$pageH.height() + 'px');

            /* page1-tab */
            var $page1BtnLeft = $('.product.product-bri .page-1 .page-btn .btn-left');
            var $page1BtnRight = $('.product.product-bri .page-1 .page-btn .btn-right');
            var $page1BtnTextCur = $('.product.product-bri .page-1 .page-btn .btn-text span.cur');
            var $page1Img = $('.product.product-bri .page-1 .page-img img');
            var page1ImgNmu = 0;
            $page1BtnRight.on('click',function(){
                if(page1ImgNmu < $page1Img.length-1){
                    page1ImgNmu += 1;
                    $page1Img.eq(page1ImgNmu).show().siblings().hide();
                    $page1BtnTextCur.html('0'+ (page1ImgNmu+1));
                }
            });
            $page1BtnLeft.on('click',function(){
                if(page1ImgNmu > 0){
                    page1ImgNmu -= 1;
                    $page1Img.eq(page1ImgNmu).show().siblings().hide();
                    $page1BtnTextCur.html('0'+ (page1ImgNmu+1));
                }
            });


            /* 提示滑动 */
            // if($(window).width() > 1100){
            //     var $CPTS = $('.product #CPTS');
            //
            //     var $rightBox = $('.product.product-index .product-i-box .chanpin-tan .chanpin-tan-box .tan-chanpin .right .right-box');
            //     var $shuys = $('.product.product-index .product-i-box .chanpin-tan .chanpin-tan-box .tan-chanpin .right .right-box .flexslider, .product.product-index .product-i-box .chanpin-tan .chanpin-tan-box .tan-chanpin .right .right-box .swiper-container');
            //
            //     $rightBox.on('mousemove',function(e) {
            //         // var xx = e.pageX-$(this).offset().left;
            //         // var yy = e.pageY-$(this).offset().top;
            //
            //         var xx = e.pageX;
            //         var yy = e.pageY;
            //
            //         $CPTS.show();
            //         $CPTS.css({'top':yy,'left':xx});
            //         $shuys.css('cursor');
            //     })
            // }
        }
    };

    theme.Pagination = {
        documentReady : ProductBri
    };

    theme.components.documentReady.push( ProductBri );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 3. ProductBriDian
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var ProductBriDian = function( $ ) {

        if($('body').hasClass('product')){
            /*元素按圆形排列*/
            var $yuanDom = $('.product.product-bri .page-3 .page-3-yuan svg');
            var $yuanDian = $('.product.product-bri .page-3 .page-3-yuan .page-dian ul li');
            //中心点横坐标
            var dotLeft = $yuanDom.width()/2;
            //中心点纵坐标
            var dotTop = $yuanDom.height()/2;
            //起始角度
            var stard = 0;
            //半径
            var radius = -dotLeft;
            //每一个BOX对应的角度;
            var avd = 360/$yuanDian.length;
            //每一个BOX对应的弧度;
            var ahd = -avd*Math.PI/180;

            //设置圆的中心点的位置
            $yuanDian.each(function(index, element){
                $(this).css({"left":Math.sin((ahd*index))*radius+dotLeft,"top":Math.cos((ahd*index))*radius+dotTop});
            });

            /* hover */
            $yuanDian.on('mouseover',function(){
                $(this).addClass('on').siblings().removeClass('on');
            });

        }
    };

    theme.Pagination = {
        documentReady : ProductBriDian
    };

    theme.components.documentReady.push( ProductBriDian );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 4. ProductCozzia
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var ProductCozzia = function( $ ) {

        if($('body').hasClass('product-cozzia')){

            /* page3 tab */
            var $page3Slider = $('.product .page-3 .flexslider');
            var $page6Slider = $('.product .page-6 .flexslider');
            var $pageText3UlLi = $('.product.product-cozzia .page-3 .page-text ul li');
            var $pageText6UlLi = $('.product.product-cozzia .page-6 .page-text ul li');
            $page3Slider.flexslider({
                animation: "slide",
                directionNav: false,
                after: function(slider){
                    var index = slider.currentSlide;
                    $pageText3UlLi.eq(index).show().siblings().hide();
                }
            });
            $page6Slider.flexslider({
                animation: "slide",
                directionNav: false,
                after: function(slider){
                    var index = slider.currentSlide;
                    $pageText6UlLi.eq(index).show().siblings().hide();
                }
            });

            /* page-7 */
            var $tanDom = $('.product.product-cozzia .page-7 .page-img ul li');
            var $tanLeft = $('.product.product-cozzia .page-7 .page-img ul li .tan-left');
            var $tanRight = $('.product.product-cozzia .page-7 .page-img ul li .tan-right');
            var $tanClose = $('.product.product-cozzia .page-7 .page-img ul li .tan-right .close');
            $tanDom.on('mouseover',function(){
                $(this).children($tanRight).show();
            });
            $tanDom.on('mouseout',function(){
                $tanRight.hide();
            });
            $tanClose.on('touchend',function(){
                $tanRight.hide();
            });


            /* page9 table height */
            var $pageH = $('.product .page');
            var $page6H = $('.product .page-9 .width-1200 .page-text');
            var $page6TitleH = $('.product .page-9 .width-1200 .page-text .page-title');
            var $page6PH = $('.product .page-9 .width-1200 .page-text .page-p');
            var $page6GobuyH = $('.product .page-9 .width-1200 .page-text .gobuy');

            $page6H.css('height',$pageH.height() -200 + 'px');
            var $page6table = $('.product .page-9 .page-text .page-table');
            $page6table.css('height',$pageH.height() - $page6TitleH.outerHeight(true) - $page6PH.outerHeight(true) - $page6GobuyH.outerHeight(true) - 200 + 'px');

            /* page9 btn tab */
            var $page6BtnLi = $('.product .page-9 .page-btn ul li');
            var $page6Img = $('.product .page-9 .page-img ul li');
            var $page6Table = $('.product .page-9 .page-text .page-table table');
            $page6BtnLi.on('click',function(){
                $(this).addClass('on').siblings().removeClass('on');
                var index = $(this).index();
                $page6Img.eq(index).show().siblings().hide();
                $page6Table.eq(index).show().siblings().hide();
            });

        }
    };

    theme.Pagination = {
        documentReady : ProductCozzia
    };

    theme.components.documentReady.push( ProductCozzia );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 5. ProductFuji
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var ProductFuji = function( $ ) {

        if($('body').hasClass('product-fuji')){
            /* page7 table height */
            var $pageH = $('.product .page');
            var $page6H = $('.product.product-fuji .page-7 .width-1200 .page-text');
            var $page6TitleH = $('.product.product-fuji .page-7 .width-1200 .page-text .page-title');
            var $page6PH = $('.product.product-fuji .page-7 .width-1200 .page-text .page-p');
            var $page6GobuyH = $('.product.product-fuji .page-7 .width-1200 .page-text .gobuy');

            $page6H.css('height',$pageH.height() -200 + 'px');
            var $page6table = $('.product.product-fuji .page-7 .page-text .page-table');
            $page6table.css('height',$pageH.height() - $page6TitleH.outerHeight(true) - $page6PH.outerHeight(true) - $page6GobuyH.outerHeight(true) - 200 + 'px');

           /* $('.product .page .page-img-270 img').css('height', '270px');*/

        }
    };

    theme.Pagination = {
        documentReady : ProductFuji
    };

    theme.components.documentReady.push( ProductFuji );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 6. ProductFujimedic
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var ProductFujimedic = function( $ ) {

        if($(window).width() > 1100){
            if($('body').hasClass('product-fujimedic')){
                /* page7 table height */
                var $pageH = $('.product .page');
                var $page6H = $('.product.product-fujimedic .page-5 .width-1200 .page-text');
                var $page6TitleH = $('.product.product-fujimedic .page-5 .width-1200 .page-text .page-title');
                var $page6PH = $('.product.product-fujimedic .page-5 .width-1200 .page-text .page-p');
                var $page6GobuyH = $('.product.product-fujimedic .page-5 .width-1200 .page-text .gobuy');

                $page6H.css('height',$pageH.height() -200 + 'px');
                var $page6table = $('.product.product-fujimedic .page-5 .page-text .page-table');
                $page6table.css('height',$pageH.height() - $page6TitleH.outerHeight(true) - $page6PH.outerHeight(true) - $page6GobuyH.outerHeight(true) - 200 + 'px');

            }
        }
    };

    theme.Pagination = {
        documentReady : ProductFujimedic
    };

    theme.components.documentReady.push( ProductFujimedic );
    return theme;

}( theme, jQuery, window, document ) );


/*!
 *************************************
 * 7. Productyi
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var Productyi = function( $ ) {

        if($('body').hasClass('product-yi')){
            /* page7 table height */
            if($(window).width() > 1100){
                var $pageH = $('.product .page');
                var $page6H = $('.product.product-yi .page-5 .width-1200 .page-text');
                var $page6TitleH = $('.product.product-fujimedic .page-5 .width-1200 .page-text .page-title');
                var $page6PH = $('.product.product-yi .page-5 .width-1200 .page-text .page-p');
                var $page6GobuyH = $('.product.product-yi .page-5 .width-1200 .page-text .gobuy');

                $page6H.css('height',$pageH.height() -200 + 'px');
                var $page6table = $('.product.product-yi .page-5 .page-text .page-table');
                $page6table.css('height',$pageH.height() - $page6TitleH.outerHeight(true) - $page6PH.outerHeight(true) - $page6GobuyH.outerHeight(true) - 200 + 'px');

            }

            /* 22种程序 */
            /*var $page5Dom = $('.product.product-yi .page-5p .pic');
            var cx = ['大师精选','颈肩放松','关节呵护','脊椎释压','久坐族','低头族','驾车族','运动派','逛街族','御宅派','巴黎式','中式','泰式','深层按摩','活血循环','运动恢复','美臀塑形','平衡身心','元气复苏','清晨唤醒','午间小憩','夜晚助眠'];
            setInterval(function(){
                var cxDiv = '<div class="dot">'+ cx[rnd(0,cx.length)] +'</div>';
                $page5Dom.append(cxDiv);
            },500);
            var docW = $($(window)).width();
            var docH = $($(window)).height();
            setInterval(function(){
                if(!$('.product.product-yi .page-5p .pic .dot').is( ":animated" )){
                }
                $('.product.product-yi .page-5p .pic .dot').animate({'top':suiji()+getRandom(0,docH),'left':suiji()+(200+docW)},5000);
            },500);
            setTimeout(function(){
                setInterval(function(){
                    $('.product.product-yi .page-5p .pic .dot').eq(0).remove();
                },500);
            },5000);*/

        }
        function rnd(start, end){
            return Math.floor(Math.random() * (end - start) + start);
        }
        function getRandom(n,m){
            //省略特殊情形下的处理过程，比如n>m，或者n、m之一无法转化为有效数字；
            return Math.round(Math.random()*(m-n)+n);
        }
        function rndZS (){
            return Math.random() * 100;
        }
        function suiji() {
            var zf = '';
            Math.random() > 0.5 ? zf = '+' : zf = '-';
            return zf;
        }
    };

    theme.Pagination = {
        documentReady : Productyi
    };

    theme.components.documentReady.push( Productyi );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 7-1. Productyi
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var Productyi = function( $ ) {

        if($('body').hasClass('product-medisana')){
            var $pageH = $('.product .page');
            /* page-2 */
            var $page2text = $('.product.product-medisana .page-2 .page-text');
            var $page2list = $('.product.product-medisana .page-2 .slider .slider-list');
            var $page2img = $('.product.product-medisana .page-2 .slider .slider-img');
            /* 轮播img */
            var $page2imgUlLi = $('.product.product-medisana .page-2 .slider .slider-img ul li');
            $page2img.css('height',$pageH.height() - $page2text.height() - $page2list.height() - 80);
            $page2imgUlLi.css('height',$pageH.height() - $page2text.height() - $page2list.height() - 80);
            /* 轮播左 */
            var $page2left = $('.product.product-medisana .page-2 .slider .slider-btn .slider-btn-left');
            /* 轮播右 */
            var $page2right = $('.product.product-medisana .page-2 .slider .slider-btn .slider-btn-right');
            /* 轮播标题 */
            var $page2title = $('.product.product-medisana .page-2 .slider .slider-list ul li');
            var $page2textUlLi = $('.product.product-medisana .page-2 .page-text ul li');
            /* 轮播数字 */
            var $page2num = $('.product.product-medisana .page-2 .slider .slider-num ul li');
            var pageNum = 0;
            /* 左 */
            $page2left.on('click',function(){
                pageNum -= 1;
                if(pageNum < -5){
                    pageNum = 0;
                }
                $page2imgUlLi.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2textUlLi.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2title.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2num.eq(pageNum).addClass('cur').siblings().removeClass('cur');
            });
            /* 右 */
            $page2right.on('click',function(){
                pageNum += 1;
                if(pageNum > 5){
                    pageNum = 0;
                }
                $page2imgUlLi.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2textUlLi.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2title.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2num.eq(pageNum).addClass('cur').siblings().removeClass('cur');
            });
            $page2num.on('click',function(){
                var liindex = $(this).index();
                $page2imgUlLi.eq(liindex).fadeIn().siblings().fadeOut();
                $page2textUlLi.eq(liindex).fadeIn().siblings().fadeOut();
                $page2title.eq(liindex).fadeIn().siblings().fadeOut();
                $page2num.eq(liindex).addClass('cur').siblings().removeClass('cur');
                pageNum = liindex;
            });
            setInterval(function(){
                pageNum += 1;
                if(pageNum > 5){
                    pageNum = 0;
                }
                $page2imgUlLi.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2textUlLi.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2title.eq(pageNum).fadeIn().siblings().fadeOut();
                $page2num.eq(pageNum).addClass('cur').siblings().removeClass('cur');
            },3000);


            /* page4 table height */
            var $page6H = $('.product.product-medisana .page-4 .width-1200 .page-text');
            var $page6TitleH = $('.product.product-medisana .page-4 .width-1200 .page-text .page-title');
            var $page6PH = $('.product.product-medisana .page-4 .width-1200 .page-text .page-p');
            var $page6GobuyH = $('.product.product-medisana .page-4 .width-1200 .page-text .gobuy');

            $page6H.css('height',$pageH.height() -200 + 'px');
            var $page6table = $('.product.product-medisana .page-4 .page-text .page-table');
            $page6table.css('height',$pageH.height() - $page6TitleH.outerHeight(true) - $page6PH.outerHeight(true) - $page6GobuyH.outerHeight(true) - 200 + 'px');

            $('.product.product-medisana .page-4 .width-1200 .page-img img').css('height',$pageH.height()-200);
        }
    };

    theme.Pagination = {
        documentReady : Productyi
    };

    theme.components.documentReady.push( Productyi );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 8. ProductIndex
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var ProductIndex = function( $ ) {

        if($('body').hasClass('product-index')){
            /* 产品box */
            var $chanpinBox = $('.product.product-index .product-i-box .chanpin-box');
            /* 弹背景 */
            var $tan = $('.product.product-index .product-i-box .chanpin-tan');
            $tan.css({'height':$chanpinBox.height(),'top':$chanpinBox.offset().top - 62});
            setTimeout(function(){
                $tan.css({'height':$chanpinBox.height(),'top':$chanpinBox.offset().top - 62});
            },500);
            /* 产品List */
            var $chanpinList = $('.product.product-index .product-i-box .chanpin');
            /* 弹出产品 */
            var $tanList = $('.product.product-index .product-i-box .chanpin-tan .chanpin-tan-box .tan-chanpin');
            /* 鼠标hover */
            $chanpinList.on('mouseenter',function(){
                if(!$(this).hasClass('onee')){
                    var index = $(this).index();
                    $chanpinBox.addClass('on');
                    $tan.addClass('on');
                    $tanList.eq(index).addClass('on');
                }
            });
            $tanList.on('mouseleave',function(){
                if(!$chanpinList.hasClass('onee')){
                    $chanpinBox.removeClass('on');
                    $tan.removeClass('on');
                    $tanList.removeClass('on');
                }
            });

            /* 产品点击 */
            var $jianYou = $('.jian-you');
            $jianYou.on('click',function(){
                $tan.css({'height':$(document).height() - 62 - 41,'top':'0'});
                $(this).parent('.left').parent('.tan-chanpin').addClass('cur');
                $chanpinList.addClass('onee');
            });

            /* 设置商品展示宽度 */
            var $right = $('.product.product-index .product-i-box .chanpin-tan .chanpin-tan-box .tan-chanpin .right');

            var rightWidth = $(window).width() - 500;

            $right.css('width',rightWidth);

            /* flexslider */
            // $('.flexslider').flexslider({
            //     animation: "slide",
            //     animationLoop: false,
            //     itemWidth: 426,
            //     itemMargin: 60,
            //     slideshow: false,
            //     slideshowSpeed: 4000, //展示时间间隔ms
            //     animationSpeed: 300, //滚动时间ms
            //     touch: true //是否支持触屏滑动
            // });
            var $swiperContainer = $('.swiper-container');
            $swiperContainer.on('mousedown',function(){
                $(this).addClass('zhua');
            });
            $swiperContainer.on('mouseup',function(){
                $(this).removeClass('zhua');
            });
            $.each($swiperContainer,function(i,o){
                var parClass = $($(o).attr('class'));

                new Swiper($(o), {
                    // pagination: '.swiper-pagination',
                    // slidesPerView: 'auto',
                    // paginationClickable: true,
                    // spaceBetween: 20

                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    freeMode: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                });
            });

            /* 点击关闭弹窗 */
            var $jianZuo = $('.jian-zuo');
            $jianZuo.on('click',function(){
                $tanList.removeClass('on');
                $tanList.removeClass('cur');
                $chanpinList.removeClass('onee');

                $tan.removeClass('on');
                $chanpinBox.removeClass('on');

                $tan.css({'height':$chanpinBox.height(),'top':$chanpinBox.offset().top - 62});
            });

        }
    };

    theme.Pagination = {
        documentReady : ProductIndex
    };

    theme.components.documentReady.push( ProductIndex );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 9. CooperationAgent
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var CooperationAgent = function( $ ) {

        if($('body').hasClass('cooperation-agent')){
            new PCAS("user.province","user.city","福建","厦门");

            /* 1加盟申请 */var SQJMTop = $('#SQJM').offset().top + 100;
            /* 2创造机会 */var CZJHTop = $('#CZJH').offset().top + 100;
            /* 3品牌势能 */var PPSNTop = $('#PPSN').offset().top + 100;
            /* 4加盟优势 */var JMYSTop = $('#JMYS').offset().top - 150;
            /* 5加盟条件 */var JMTJTop = $('#JMTJ').offset().top - 150;
            /* 6加盟对象 */var JMDXTop = $('#JMDX').offset().top - 150;
            /* 7加盟流程 */var JMLCTop = $('#JMLC').offset().top - 150;
            /* 8终端风采 */var ZDFCTop = $('#ZDFC').offset().top - 150;
            /* 9加盟网点 */var JMWDTop = $('#JMWD').offset().top - 150;

            /* 侧边导航 */
            var $coopCe = $('.cooperation-agent .cooperation-agent-content .coop-ce');
            var coopCeH = $coopCe.offset().top;
            var $coopCeLi = $('.cooperation-agent .cooperation-agent-content .coop-ce ul li');
            var $coopCeLiListTop = $('.cooperation-agent .cooperation-agent-content .coop-ce ul li.list-top');
            var $coopCeLiGoTop = $('.cooperation-agent .cooperation-agent-content .coop-ce ul li.goTop');
            $coopCeLiGoTop.on('click',function(){
                $('html, body').animate({scrollTop: 0}, 300);
            });

            if($(window).width() < 1500){
                $coopCe.addClass('mix-w');
                $coopCe.on('mouseover',function (){
                    $(this).removeClass('mix-w');
                });
                $coopCe.on('mouseout',function (){
                    $(this).addClass('mix-w');
                });
            }
            $coopCeLi.eq(0).on('click',function(){
                $('html,body').animate({scrollTop: SQJMTop}, 'slow');
            });
            $coopCeLi.eq(1).on('click',function(){
                $('html,body').animate({scrollTop: CZJHTop}, 'slow');
            });
            $coopCeLi.eq(2).on('click',function(){
                $('html,body').animate({scrollTop: PPSNTop}, 'slow');
            });
            $coopCeLi.eq(3).on('click',function(){
                $('html,body').animate({scrollTop: JMYSTop}, 'slow');
            });
            $coopCeLi.eq(4).on('click',function(){
                $('html,body').animate({scrollTop: JMTJTop}, 'slow');
            });
            $coopCeLi.eq(5).on('click',function(){
                $('html,body').animate({scrollTop: JMDXTop}, 'slow');
            });
            $coopCeLi.eq(6).on('click',function(){
                $('html,body').animate({scrollTop: JMLCTop}, 'slow');
            });
            $coopCeLi.eq(7).on('click',function(){
                $('html,body').animate({scrollTop: ZDFCTop}, 'slow');
            });
            $coopCeLi.eq(8).on('click',function(){
                $('html,body').animate({scrollTop: JMWDTop}, 'slow');
            });
            $(window).scroll(function(event){
                neiTab();
            });
            var neiTab = function(){
                var domTop = $(document).scrollTop();
                var domHc = $(document).scrollTop() - coopCeH;
                if(domHc > 0){
                    $coopCe.addClass('on');
                } else {
                    $coopCe.removeClass('on');
                }
                /* 1 */
                if((domTop - SQJMTop + 100) > 0 && (domTop - SQJMTop + 100) < 100){
                    $coopCeLi.eq(0).addClass('cur').siblings().removeClass('cur');
                }
                /* 2 */
                if((domTop - CZJHTop + 100) > 0 && (domTop - CZJHTop + 100) < 100){
                    $coopCeLi.eq(1).addClass('cur').siblings().removeClass('cur');
                }
                /* 3 */
                if((domTop - PPSNTop + 100) > 0 && (domTop - PPSNTop + 100) < 100){
                    $coopCeLi.eq(2).addClass('cur').siblings().removeClass('cur');
                }
                /* 4 */
                if((domTop - JMYSTop + 100) > 0 && (domTop - JMYSTop + 100) < 100){
                    $coopCeLi.eq(3).addClass('cur').siblings().removeClass('cur');
                }
                /* 5 */
                if((domTop - JMTJTop + 100) > 0 && (domTop - JMTJTop + 100) < 100){
                    $coopCeLi.eq(4).addClass('cur').siblings().removeClass('cur');
                }
                /* 6 */
                if((domTop - JMDXTop + 100) > 0 && (domTop - JMDXTop + 100) < 100){
                    $coopCeLi.eq(5).addClass('cur').siblings().removeClass('cur');
                }
                /* 7 */
                if((domTop - JMLCTop + 100) > 0 && (domTop - JMLCTop + 100) < 100){
                    $coopCeLi.eq(6).addClass('cur').siblings().removeClass('cur');
                }
                /* 8 */
                if((domTop - ZDFCTop + 100) > 0 && (domTop - ZDFCTop + 100) < 100){
                    $coopCeLi.eq(7).addClass('cur').siblings().removeClass('cur');
                }
                /* 9 */
                if((domTop - JMWDTop + 100) > 0 && (domTop - JMWDTop + 100) < 100){
                    $coopCeLi.eq(8).addClass('cur').siblings().removeClass('cur');
                }
            };
            neiTab();

            /* 加盟申请 */
            var $sqjmP = $('.cooperation-agent .cooperation-agent-content #SQJM .form-box .form-div .form-top .top-input p');
            var $sqjmInput = $('.cooperation-agent .cooperation-agent-content #SQJM .form-box .form-div .form-top .top-input input');

            $sqjmInput.focus(function(){
                $(this).prev().addClass('on');
                $(this).addClass('on');
            });
            // $sqjmInput.blur(function(){
            //     if($(this).val !== ''){
            //         $(this).prev().removeClass('on');
            //         $(this).removeClass('on');
            //     }
            // });

            var $CZJHlist = $('.cooperation-agent .cooperation-agent-content #CZJH .abc-box .list');
            var $PPSNlist = $('.cooperation-agent .cooperation-agent-content #PPSN .box-three .list');

            $CZJHlist.on('mousemove', function(){
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $PPSNlist.on('mousemove', function(){
                $(this).addClass('cur').siblings().removeClass('cur');
            });

            /* 时间轴长度 */
            var $sjzPar = $('.cooperation-agent .cooperation-agent-content #PPSN .sjz-box .sjz');
            var $sjzDom = $('.cooperation-agent .cooperation-agent-content #PPSN .sjz-box .sjz ul');
            var sjzW = $sjzDom.children('li').length * 120 + 38;
            $sjzDom.css('width',sjzW);
            var $sjzLeft = $('.cooperation-agent .cooperation-agent-content #PPSN .sjz-box .sjz-left');
            var $sjzRight = $('.cooperation-agent .cooperation-agent-content #PPSN .sjz-box .sjz-right');
            var sjzNum = 0;
            var sjzXwNum = ($sjzDom.width() - $sjzPar.width())/$sjzDom.children('li').eq(0).width();
            Math.ceil(sjzXwNum);

            $sjzLeft.on('click',function(){
                if(sjzNum > 0){
                    sjzNum -= 1;
                    $sjzDom.animate({'marginLeft':'+=158'});
                }
            });
            $sjzRight.on('click',function(){
                if(sjzNum < sjzXwNum){
                    sjzNum += 1;
                    $sjzDom.animate({'marginLeft':'-=158'});
                }
            });

            /* 绑定鼠标左键按住事件 */
            /*$sjzPar.bind("mousedown",function(event){
                /!* 获取需要拖动节点的坐标 *!/
                var offset_x = $(this)[0].offsetLeft;//x坐标
                var offset_y = $(this)[0].offsetTop;//y坐标
                /!* 获取当前鼠标的坐标 *!/
                var mouse_x = event.pageX;
                var mouse_y = event.pageY;

                /!* 绑定拖动事件 *!/
                /!* 由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素 *!/
                $(document).bind("mousemove",function(ev){
                    /!* 计算鼠标移动了的位置 *!/
                    var _x = ev.pageX - mouse_x;
                    var _y = ev.pageY - mouse_y;

                    /!* 设置移动后的元素坐标 *!/
                    var now_x = (offset_x + _x ) + "px";
                    var now_y = (offset_y + _y ) + "px";
                    /!* 改变目标元素的位置 *!/
                    // $sjzPar.children('ul').css({
                    //     top:now_y,
                    //     left:now_x
                    // });
                    $sjzPar.children('ul').animate({
                        marginLeft: '+='+now_x
                    },0);
                });
            });*/
            /* 当鼠标左键松开，接触事件绑定 */
            /*$(document).bind("mouseup",function(){
                $(this).unbind("mousemove");
            });*/

            /* 加盟优势 */
            var $jiamTop = $('.cooperation-agent .cooperation-agent-content #JMYS .tab-top ul li');
            var $jiamBottom = $('.cooperation-agent .cooperation-agent-content #JMYS .tab-bottom ul li');

            $jiamTop.on('mouseover',function(){
                $(this).addClass('cur').siblings().removeClass('cur');
                var index = $(this).index();
                $jiamBottom.eq(index).show().siblings().hide();
            });

            /* 终端风采 */
            var $swiperUl = $('.cooperation-agent .cooperation-agent-content #ZDFC .swiper-box .lunbo ul');
            var swiperUlLiW = $swiperUl.children('li').eq(0).outerWidth(true);
            var $btnLeft = $('.cooperation-agent .cooperation-agent-content #ZDFC .swiper-box .lunbo .lb-btn-box .lb-btn.lb-btn-left');
            var $btnright = $('.cooperation-agent .cooperation-agent-content #ZDFC .swiper-box .lunbo .lb-btn-box .lb-btn.lb-btn-right');
            var lbNum = 0;
            var $dituImg = $('.cooperation-agent .cooperation-agent-content #ZDFC .swiper-box .ditu img');
            var $datuImg = $('.cooperation-agent .cooperation-agent-content #ZDFC .swiper-box .datu img');

            $swiperUl.css('width',$swiperUl.children('li').length * swiperUlLiW);

            $datuImg.attr('src',$swiperUl.children('li').eq(0).attr('data-src'));
            $dituImg.attr('src',$swiperUl.children('li').eq(1).attr('data-src'));

            $btnLeft.on('click', function(){
                if(lbNum > 0){
                    lbNum -= 1;
                    $swiperUl.animate({"marginLeft": '+='+swiperUlLiW});
                    $swiperUl.children('li').eq(lbNum).addClass('cur').siblings().removeClass('cur');
                    $datuImg.attr('src',$swiperUl.children('li').eq(lbNum).attr('data-src'));
                    $dituImg.attr('src',$swiperUl.children('li').eq(lbNum+1).attr('data-src'));
                }
            });
            $btnright.on('click', function(){
                if(lbNum < $swiperUl.children('li').length - 1){
                    lbNum += 1;
                    $swiperUl.animate({"marginLeft": '-='+swiperUlLiW});
                    $swiperUl.children('li').eq(lbNum).addClass('cur').siblings().removeClass('cur');
                    $datuImg.attr('src',$swiperUl.children('li').eq(lbNum).attr('data-src'));
                    $dituImg.attr('src',$swiperUl.children('li').eq(lbNum+1).attr('data-src'));
                }
            });
        }

    };

    theme.Pagination = {
        documentReady : CooperationAgent
    };

    theme.components.documentReady.push( CooperationAgent );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 10. research
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var research = function( $ ) {

        if($('body').hasClass('research')){
            /* 侧边导航 */
            var $coopCe = $('.research .coop-ce');
            var coopCeH = $coopCe.offset().top;
            var $coopCeLi = $('.research .coop-ce ul li');
            var $coopCeLiGoTop = $('.research .coop-ce ul li.goTop');
            $coopCeLiGoTop.on('click',function(){
                $('html, body').animate({scrollTop: 0}, 300);
                $coopCeLi.eq(0).addClass('cur').siblings().removeClass('cur');
            });

            if($(window).width() < 1500){
                $coopCe.addClass('mix-w');
                $coopCe.on('mouseover',function (){
                    $(this).removeClass('mix-w');
                });
                $coopCe.on('mouseout',function (){
                    $(this).addClass('mix-w');
                });
            }
            // /* 1研发中心 */     var YFZXTop = $('#YFZX').offset().top - 500;
            // /* 2研发团队 */     var YFTDTop = $('#YFTD').offset().top - 500;
            // /* 3研发投入 */     var YFTRTop = $('#YFTR').offset().top - 500;
            // /* 4研发平台 */     var YFQTTop = $('#YFQT').offset().top - 500;
            // /* 5产学研合作 */   var CXYHZTop = $('#CXYHZ').offset().top - 500;
            // /* 6专利申请与持有 */var ZLSAYCYTop = $('#ZLSAYCY').offset().top - 500;
            // /* 7技术认证 */     var JSRZTop = $('#JSRZ').offset().top - 1300;
            // /* 8标准制修订 */   var BZZXDTop = $('#BZZXD').offset().top - 1300;
            // /* 9获奖情况 */     var HJQKTop = $('#HJQK').offset().top - 1300;

            /* 1研发中心 */     var YFZXTop = $('#YFZX').offset().top;
            /* 2研发团队 */     var YFTDTop = $('#YFTD').offset().top;
            /* 3研发投入 */     var YFTRTop = $('#YFTR').offset().top;
            /* 4研发平台 */     var YFQTTop = $('#YFQT').offset().top;
            /* 5产学研合作 */   var CXYHZTop = $('#CXYHZ').offset().top;
            /* 6专利申请与持有 */var ZLSAYCYTop = $('#ZLSAYCY').offset().top - 1;
            /* 7技术认证 */     var JSRZTop = $('#JSRZ').offset().top - 1700;
            /* 8标准制修订 */   var BZZXDTop = $('#BZZXD').offset().top - 1700;
            /* 9获奖情况 */     var HJQKTop = $('#HJQK').offset().top - 1700;

            $coopCeLi.eq(0).on('click',function(){
                $('html,body').animate({scrollTop: YFZXTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $coopCeLi.eq(1).on('click',function(){
                $('html,body').animate({scrollTop: YFTDTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $coopCeLi.eq(2).on('click',function(){
                $('html,body').animate({scrollTop: YFTRTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $coopCeLi.eq(3).on('click',function(){
                $('html,body').animate({scrollTop: YFQTTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $coopCeLi.eq(4).on('click',function(){
                $('html,body').animate({scrollTop: CXYHZTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $coopCeLi.eq(5).on('click',function(){
                $('html,body').animate({scrollTop: ZLSAYCYTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $coopCeLi.eq(6).on('click',function(){
                $('html,body').animate({scrollTop: JSRZTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $coopCeLi.eq(7).on('click',function(){
                $('html,body').animate({scrollTop: BZZXDTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $coopCeLi.eq(8).on('click',function(){
                $('html,body').animate({scrollTop: HJQKTop}, 'slow');
                $(this).addClass('cur').siblings().removeClass('cur');
            });

            $(window).scroll(function(event){
                neiTab();
            });
            var neiTab = function(){
                var domTop = $(document).scrollTop();
                var domHc = $(document).scrollTop() - coopCeH + 500;
                if(domHc > 0){
                    $coopCe.addClass('on');
                } else {
                    $coopCe.removeClass('on');
                }
                /* 1 */
                if((domTop - YFZXTop + 100) > 0 && (domTop - YFZXTop + 100) < 100){
                    $coopCeLi.eq(0).addClass('cur').siblings().removeClass('cur');
                }
                /* 2 */
                if((domTop - YFTDTop + 100) > 0 && (domTop - YFTDTop + 100) < 100){
                    $coopCeLi.eq(1).addClass('cur').siblings().removeClass('cur');
                }
                /* 3 */
                if((domTop - YFTRTop + 100) > 0 && (domTop - YFTRTop + 100) < 100){
                    $coopCeLi.eq(2).addClass('cur').siblings().removeClass('cur');
                }
                /* 4 */
                if((domTop - YFQTTop + 100) > 0 && (domTop - YFQTTop + 100) < 100){
                    $coopCeLi.eq(3).addClass('cur').siblings().removeClass('cur');
                }
                /* 5 */
                if((domTop - CXYHZTop + 100) > 0 && (domTop - CXYHZTop + 100) < 100){
                    $coopCeLi.eq(4).addClass('cur').siblings().removeClass('cur');
                }
                /* 6 */
                if((domTop - ZLSAYCYTop + 100) > 0 && (domTop - ZLSAYCYTop + 100) < 100){
                    $coopCeLi.eq(5).addClass('cur').siblings().removeClass('cur');
                }
                /* 7 */
                if((domTop - JSRZTop + 100) > 0 && (domTop - JSRZTop + 100) < 100){
                    $coopCeLi.eq(6).addClass('cur').siblings().removeClass('cur');
                }
                /* 8 */
                if((domTop - BZZXDTop + 100) > 0 && (domTop - BZZXDTop + 100) < 100){
                    $coopCeLi.eq(7).addClass('cur').siblings().removeClass('cur');
                }
                /* 9 */
                if((domTop - HJQKTop + 100) > 0 && (domTop - HJQKTop + 100) < 100){
                    $coopCeLi.eq(8).addClass('cur').siblings().removeClass('cur');
                }
            };
            neiTab();

            /* 研发中心 */
            var $yfSjz = $('.research #YFZX .sjz .sjz-bjs');
            var domHc = $(document).scrollTop() - $yfSjz.offset().top + $(window).height();
            $(window).scroll(function(event){
                domHc = $(document).scrollTop() - $yfSjz.offset().top + $(window).height();
                if(domHc > 0){
                    $yfSjz.css({'height':domHc});
                }
            });

            var $lianLi = $('.research .research-content .research-lian .lian-ul ul li');
            $lianLi.on('mouseover', function (){
                $(this).addClass('cur').siblings().removeClass('cur');
            });
            $lianLi.on('mouseout', function (){
                $lianLi.removeClass('cur');
            });
            /* 专利申请与持有 */
            $('.cy-flexslider').flexslider({
                animation: "slide",
                animationLoop: false,
                itemWidth: 300,
                itemMargin: 34,
                minItems: 2,
                maxItems: 4
            });
            $('.research #ZLSAYCY .cy-flexslider .slides-btn .btn-left i').click(function(){
                $('.research #ZLSAYCY .cy-flexslider .flex-direction-nav .flex-prev').click();
            });
            $('.research #ZLSAYCY .cy-flexslider .slides-btn .btn-right i').click(function(){
                $('.research #ZLSAYCY .cy-flexslider .flex-direction-nav .flex-next').click();
            });
            /* 4研发平台 */
            var $ptLeftBtn = $('.research #YFQT .pt-tab .pt-center .pt-btn-left');
            var $ptRightBtn = $('.research #YFQT .pt-tab .pt-center .pt-btn-right');
            var $ptLeftDom = $('.research #YFQT .pt-tab .pt-left ul');
            var $ptLeftDomLi = $('.research #YFQT .pt-tab .pt-left ul li');
            var $ptRightDom = $('.research #YFQT .pt-tab .pt-right .pt-tu ul');
            var $ptRightDomLi = $('.research #YFQT .pt-tab .pt-right .pt-tu ul li');

            $(window).on('load',function () {
                setTimeout(function(){
                    if($(window).width() > 1200){
                        $ptRightDom.css('marginTop',-274 * 3);
                    } else {
                        $ptRightDom.css('marginTop',-214 * 3);
                    }
                },100);
            });

            $ptLeftDom.prepend($ptLeftDomLi.eq(-1).clone());
            $ptLeftDom.prepend($ptLeftDomLi.eq(-2).clone());
            $ptLeftDom.prepend($ptLeftDomLi.eq(-3).clone());

            $ptRightDom.prepend($ptRightDomLi.eq(-1).clone());
            $ptRightDom.prepend($ptRightDomLi.eq(-2).clone());
            $ptRightDom.prepend($ptRightDomLi.eq(-3).clone());

            $ptRightBtn.on('click',function(){
                $ptLeftDom.append($('.research #YFQT .pt-tab .pt-left ul li').eq(0));
                $ptRightDom.append($('.research #YFQT .pt-tab .pt-right .pt-tu ul li').eq(0));
                $('.research #YFQT .pt-tab .pt-left ul li').eq(3).addClass('cur').siblings().removeClass('cur');
            });

            $ptLeftBtn.on('click',function(){
                $ptLeftDom.prepend($('.research #YFQT .pt-tab .pt-left ul li').eq(-1));
                $ptRightDom.prepend($('.research #YFQT .pt-tab .pt-right .pt-tu ul li').eq(-1));
                $('.research #YFQT .pt-tab .pt-left ul li').eq(3).addClass('cur').siblings().removeClass('cur');
            });

            /* 6专利申请与持有 */
            //var $zlUlLi = $('.research #ZLSAYCY .cy-flexslider ul li');
            var $zlUlLi = $('.research #ZLSAYCY .cy-flexslider .slides li .cy-img');
            var $tanc = $('.research #ZLSAYCY .tanc');
            var $tancImg = $('.research #ZLSAYCY .tanc .tancBox .tanImg img');
            var $colse = $('.research #ZLSAYCY .tanc .tancBox .colse');

            $zlUlLi.on('click',function(){
                var src = $(this).attr('data-src');
                $tanc.show();
                $tancImg.attr('src',src);
                $('.research #ZLSAYCY .tanc .tancBox p').html($(this).next('').text());
            });
            $colse.on('click',function(){
                $tanc.hide();
            });

            /* 9获奖情况 */
            var $hjLeftBtn = $('.research #HJQK .pt-tab .pt-center .pt-btn-left');
            var $hjRightBtn = $('.research #HJQK .pt-tab .pt-center .pt-btn-right');
            var $hjLeftDom = $('.research #HJQK .pt-tab .pt-left ul');
            var $hjLeftDomLi = $('.research #HJQK .pt-tab .pt-left ul li');
            var $hjRightDom = $('.research #HJQK .pt-tab .pt-right .pt-tu ul');
            var $hjRightDomLi = $('.research #HJQK .pt-tab .pt-right .pt-tu ul li');

            $(window).on('load',function(){
                setTimeout(function(){
                    if($(window).width() > 1200){
                        $hjRightDom.css('marginTop', -274 * 3);
                    } else {
                        $hjRightDom.css('marginTop', -214 * 3);
                    }
                },100);
            });
            // $hjRightDomLi.css('height',$hjRightDomLi.height());

            $hjLeftDom.prepend($hjLeftDomLi.eq(-1).clone());
            $hjLeftDom.prepend($hjLeftDomLi.eq(-2).clone());
            $hjLeftDom.prepend($hjLeftDomLi.eq(-3).clone());

            $hjRightDom.prepend($hjRightDomLi.eq(-1).clone());
            $hjRightDom.prepend($hjRightDomLi.eq(-2).clone());
            $hjRightDom.prepend($hjRightDomLi.eq(-3).clone());

            $hjRightBtn.on('click',function(){
                $hjLeftDom.append($('.research #HJQK .pt-tab .pt-left ul li').eq(0));
                $hjRightDom.append($('.research #HJQK .pt-tab .pt-right .pt-tu ul li').eq(0));
                $('.research #HJQK .pt-tab .pt-left ul li').eq(3).addClass('cur').siblings().removeClass('cur');
            });

            $hjLeftBtn.on('click',function(){
                $hjLeftDom.prepend($('.research #HJQK .pt-tab .pt-left ul li').eq(-1));
                $hjRightDom.prepend($('.research #HJQK .pt-tab .pt-right .pt-tu ul li').eq(-1));
                $('.research #HJQK .pt-tab .pt-left ul li').eq(3).addClass('cur').siblings().removeClass('cur');
            });
        }

    };

    theme.Pagination = {
        documentReady : research
    };

    theme.components.documentReady.push( research );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 11. service
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var research = function( $ ) {

        if($('body').hasClass('service')){

            var $srTab = $('.service .service-tab .service-tab-box .service-tab-div');
            var $srTabUl = $('.service .service-tab-ul .service-ul > li');
            $srTab.on('mouseover',function(){
                $(this).addClass('cur').siblings().removeClass('cur');
                var index = $(this).index();
                $srTabUl.eq(index).show().siblings().hide();
            });

        }

        if($('body').hasClass('service-location')){
            new PCAS("user.province","user.city","福建","厦门");
        }

        if($('body').hasClass('jidi')){
            $('.counter').countUp({
                delay: 40,
                time: 1000
            });
            var swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',

                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows : true
                },
            });
        }

    };

    theme.Pagination = {
        documentReady : research
    };

    theme.components.documentReady.push( research );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 分页接口xinwen
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var fenyeNewAjax = function( $ ) {

        var $newsAddBtn = $('.new .Tpage .Tbtm .Tmore');
        var newsPageAjax = function (typeId, page) {

            $.get('/post/ajaxnews.html', {typeId: typeId, page: page}, function (data, textStatus) {
                var _data = eval('(' + data + ')');
                console.log(_data);
                var html = '';
                if (_data.code === -2) {
                    $newsAddBtn.html('无更多新闻');
                    return;
                }
                $.each(_data.data, function (i, item) {
                    html +=
                        '<li onclick="window.location.href=\'/news/d'+item.NewsId+'.html\'">'+
                        '<img src="'+item.Pic+'" width="200" height="130" alt="img">'+
                        '<div class="Tmsg">'+
                        '<h5>'+item.Title+'</h5>'+
                        '<p>'+item.Intro+'</p>'+
                        '</div>'+
                        '<div class="Tdate">'+
                        '<span><b>'+sjYue(item.PostDate)+'</b>'+sjNian(item.PostDate)+'</span>'+
                        '<i class="iconfont icon-jiantou1"></i>'+
                        '</div>'+
                        '</li>';
                });
                $('.new .Tpage .Tmid .part').append(html);
                $newsAddBtn.removeClass('disabled').attr('page', page);
            });
        };
        function sjYue(str) {
            var yueStr = str.split("");
            return yueStr[5] + yueStr[6] + yueStr[7] + yueStr[8] + yueStr[9];
        }
        function sjNian(str){
            var nianStr = str.split("");
            return nianStr[0]+nianStr[1]+nianStr[2]+nianStr[3];
        }

        $newsAddBtn.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            } else {
                $(this).addClass('disabled');
                var typeId = parseInt($newsAddBtn.attr('typeid'));
                var page = parseInt($newsAddBtn.attr('page')) + 1;
                newsPageAjax(typeId,page);
            }
        });

    };

    theme.Pagination = {
        documentReady : fenyeNewAjax
    };

    theme.components.documentReady.push( fenyeNewAjax );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 分页接口专题报告
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var fenyeZTAjax = function( $ ) {

        if($('body').hasClass('nexus')){
            var $nexusUl = $('.nexus .subject .tab-top ul');
            var $nexusUlLi = $('.nexus .subject .tab-top ul li');
            var $nexusQunImg = $('.nexus .subject .tab-qun img');
            var $bottomLi = $('.nexus .subject .tab-nei ul li');
            var $pageSpan = $('.nexus .subject .tab-nei ul .list .tiao .tiao-btn span')

            var ulW = $nexusUl.offset().left;
            var nexusQunImgLeft = $nexusQunImg.offset().left - ulW;
            var bianLeft = 0;

            $nexusUlLi.on('mouseenter', function () {
                var ulLiW = $(this).offset().left;
                var liLeft = ulLiW - ulW;
                /*if (!$nexusQunImg.is(":animated")) {
                    $nexusQunImg.animate({ 'left': liLeft + 49 });
                }*/
                $nexusQunImg.animate({ 'left': liLeft + 39 });
                bianLeft = liLeft + 39;
            });
            $nexusUlLi.on('mouseleave', function () {
                if (!$nexusQunImg.is(":animated")) {
                    $nexusQunImg.animate({ 'left': nexusQunImgLeft });
                }
                /* $nexusQunImg.animate({ 'left': nexusQunImgLeft });*/
            });
            $nexusUlLi.on('click', function () {
                var index = $(this).index() - 2;
                if (index >= 0) {
                    $bottomLi.eq(index).show().siblings().hide();
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $nexusQunImg.animate({ 'left': bianLeft });
                    nexusQunImgLeft = bianLeft;
                }
            });
            $nexusUlLi.eq(3).on('click',function(){
                $ztAddBtnLeft.attr('data-typeid','9');
                $ztAddBtnRight.attr('data-typeid','1');
                $pageSpan.html('1');
                ZTPageAjax(9,1);
            });
            $nexusUlLi.eq(4).on('click',function(){
                $ztAddBtnLeft.attr('data-typeid','10');
                $ztAddBtnRight.attr('data-typeid','2');
                $pageSpan.html('1');
                ZTPageAjax(10,1);
            });

            var $ztAddBtnLeft = $('.nexus .subject .tab-nei ul .list .tiao .tiao-btn button.btn-left');
            var $ztAddBtnRight = $('.nexus .subject .tab-nei ul .list .tiao .tiao-btn button.btn-right');
            var ZTPageAjax = function (typeId, page) {

                $.get('/post/ajaxnews.html', {typeId: typeId, page: page}, function (data, textStatus) {
                    var _data = eval('(' + data + ')');
                    // console.log(_data);
                    var html = '';
                    if (_data.code === -2 || _data.code === 0) {
                        return false;
                    }
                    $.each(_data.data, function (i, item) {
                        html +=
                            '<a class="list-kuai" href="relationShip/d'+item.NewsId+'.html">'+
                            '<div>'+item.Title+'</div>'+
                            '<p>更新时间'+sjKongge(item.PostDate)+'</p>'+
                            '</a>';
                    });
                    $('.nexus .subject .tab-nei ul .list .list-box').html(html);
                    $pageSpan.html(page);
                    $ztAddBtnLeft.removeClass('disabled').attr('data-page', page);
                    $ztAddBtnRight.removeClass('disabled').attr('data-page', page);
                    $('.nexus .subject .tab-nei ul .list .tiao .tiao-xuan select option').eq(page -1).attr('selected','selected');
                });
            };

            $ztAddBtnLeft.on('click', function () {
                if ($(this).hasClass('disabled')) {
                    return false;
                } else {
                    $(this).addClass('disabled');
                    var typeId = parseInt($ztAddBtnLeft.attr('data-typeId'));
                    var dpPgea = parseInt($ztAddBtnLeft.attr('data-page'));
                    if(dpPgea == 1){
                        return false;
                    } else {
                        var page = dpPgea - 1;
                    }
                    ZTPageAjax(typeId,page);
                }
            });
            $ztAddBtnRight.on('click', function () {
                if ($(this).hasClass('disabled')) {
                    return false;
                } else {
                    $(this).addClass('disabled');
                    var typeId = parseInt($ztAddBtnLeft.attr('data-typeId'));
                    var page = parseInt($ztAddBtnLeft.attr('data-page')) + 1;

                    ZTPageAjax(typeId,page);
                }
            });
            var $ztAddBtnBtn = $('.nexus .subject .tab-nei ul .list .tiao .tiao-text');
            $ztAddBtnBtn.on('click',function(){
                console.log($(this).val());
                var typeId = parseInt($ztAddBtnLeft.attr('data-typeId'));
                var page = $('.nexus .subject .tab-nei ul .list .tiao .tiao-xuan select').val();
                ZTPageAjax(typeId,page);
            });
        }

        function sjKongge(str){
            var newStr = str.split(' ');
            return newStr[0];
        }

    };

    theme.Pagination = {
        documentReady : fenyeZTAjax
    };

    theme.components.documentReady.push( fenyeZTAjax );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 社会招聘分页
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var fenyeJoinAjax = function( $ ) {

        var $joinAddBtn = $('.join-social .Tpage .Tmid .Tcon .Tbtm .Tmore');

        var joinPageAjax = function (page, searchKey,recruiter,workPlace) {

            $.get('/post/ajaxjobSocial.html', {page: page, searchKey:searchKey, recruiter:recruiter, workPlace: workPlace}, function (data, textStatus) {
                var _data = eval('(' + data + ')');

                var html = '';
                if (_data.code === -2) {
                    $joinAddBtn.html('无更多招聘');
                    return;
                }
                $.each(_data.data, function (i, item) {
                    html +=
                        '<div class="list myClick">'+
                        '<div class="col">'+item.JobName+'</div>'+
                        '<div class="col">'+item.Recruiter+'</div>'+
                        '<div class="col">'+item.WorkPlace+'</div>'+
                        '<div class="col">'+item.EndDate+'</div>'+
                        '</div>'+
                        '<div class="downBox">'+
                        '<div class="Tmsg">'+
                        '<div class="msgList">'+
                        '<h4>任职要求：</h4>'+
                        '<p>'+item.Specification+'</p>'+
                        '</div>'+
                        '<div class="msgList">'+
                        '<h4>岗位职责：</h4>'+
                        '<p>'+item.OtherSF+'</p>'+
                        '</div>'+
                        '<div class="listBtm">'+
                        '<a class="openPop" data-job="'+item.JobName+'" data-job-id="'+item.JobId+'" data-dialog="dialog_1">在线申请<i class="iconfont icon-arrow"></i></a>'+
                        '</div>'+
                        '</div>'+
                        '</div>';

                });
                $('.join-social .Tpage .Tmid .Tcon .msgBox').append(html);
                $joinAddBtn.removeClass('disabled').attr('data-page', page);
            });
        };

        $joinAddBtn.on('click', function () {
            if ($(this).hasClass('disabled')) {
                return false;
            } else {
                $(this).addClass('disabled');
                var page = parseInt($joinAddBtn.attr('data-page')) + 1;
                var searchkey = $joinAddBtn.attr('searchkey');
                var typeId = parseInt($joinAddBtn.attr('typeid'));
                joinPageAjax(page,searchkey);
            }
        });

    // 单位
        $('.danwei li').on('click',function(){
            $.get('/post/ajaxjobSocial.html', { recruiter:$(this).text() }, function (data, textStatus) {
                var _data = eval('(' + data + ')');

                var html = '';
                if (_data.code === -2) {
                    $joinAddBtn.html('无更多招聘');
                    return;
                }
                $.each(_data.data, function (i, item) {
                    html +=
                        '<div class="list myClick">'+
                        '<div class="col">'+item.JobName+'</div>'+
                        '<div class="col">'+item.Recruiter+'</div>'+
                        '<div class="col">'+item.WorkPlace+'</div>'+
                        '<div class="col">'+item.EndDate+'</div>'+
                        '</div>'+
                        '<div class="downBox">'+
                        '<div class="Tmsg">'+
                        '<div class="msgList">'+
                        '<h4>任职要求：</h4>'+
                        '<p>'+item.Specification+'</p>'+
                        '</div>'+
                        '<div class="msgList">'+
                        '<h4>岗位职责：</h4>'+
                        '<p>'+item.OtherSF+'</p>'+
                        '</div>'+
                        '<div class="listBtm">'+
                        '<a class="openPop" data-job="'+item.JobName+'" data-job-id="'+item.JobId+'" data-dialog="dialog_1">在线申请<i class="iconfont icon-arrow"></i></a>'+
                        '</div>'+
                        '</div>'+
                        '</div>';

                });

                $('.join-social .Tpage .Tmid .Tcon .msgBox .myClick').remove();
                $('.join-social .Tpage .Tmid .Tcon .msgBox .downBox').remove();
                $('.join-social .Tpage .Tmid .Tcon .msgBox').append(html);
            });

        });

    //  地点
        $('.didian li').on('click',function(){
            console.log($(this).text());
            $.get('/post/ajaxjobSocial.html', { workPlace:$(this).text() }, function (data, textStatus) {
                var _data = eval('(' + data + ')');

                console.log(_data);

                var html = '';
                if (_data.code === -2) {
                    $joinAddBtn.html('无更多招聘');
                    return;
                }
                $.each(_data.data, function (i, item) {
                    html +=
                        '<div class="list myClick">'+
                        '<div class="col">'+item.JobName+'</div>'+
                        '<div class="col">'+item.Recruiter+'</div>'+
                        '<div class="col">'+item.WorkPlace+'</div>'+
                        '<div class="col">'+item.EndDate+'</div>'+
                        '</div>'+
                        '<div class="downBox">'+
                        '<div class="Tmsg">'+
                        '<div class="msgList">'+
                        '<h4>任职要求：</h4>'+
                        '<p>'+item.Specification+'</p>'+
                        '</div>'+
                        '<div class="msgList">'+
                        '<h4>岗位职责：</h4>'+
                        '<p>'+item.OtherSF+'</p>'+
                        '</div>'+
                        '<div class="listBtm">'+
                        '<a class="openPop" data-job="'+item.JobName+'" data-job-id="'+item.JobId+'" data-dialog="dialog_1">在线申请<i class="iconfont icon-arrow"></i></a>'+
                        '</div>'+
                        '</div>'+
                        '</div>';

                });

                $('.join-social .Tpage .Tmid .Tcon .msgBox .myClick').remove();
                $('.join-social .Tpage .Tmid .Tcon .msgBox .downBox').remove();
                $('.join-social .Tpage .Tmid .Tcon .msgBox').append(html);
            });
        });


    };

    var $joinSheng = $('.join-social .Tpage .Tmid .Tcon .msgBox .downBox .Tmsg .listBtm > a');
    $joinSheng.on('click',function(){
        var dataJob = $(this).attr('data-job');
        var dataJobId = $(this).attr('data-job-id');
        $('#jobName').attr('value',dataJob);
        $('#jobId').attr('value',dataJobId);
    });

    theme.Pagination = {
        documentReady : fenyeJoinAjax
    };

    theme.components.documentReady.push( fenyeJoinAjax );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 相关资料下载
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var ziliaoDownload = function( $ ) {

        /*
        * 检查IE版本
        * */

        var is_IE = function (ver) {
            var b = document.createElement('b');
            b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
            return b.getElementsByTagName('i').length === 1
        };

        if (is_IE(5) || is_IE(6) || is_IE(7) || is_IE(8) || is_IE(9)) {
            console.log('IE');
        } else {
            console.log('NOIE');
        }


        var $qrcode = $('.service-app .qrcode');
        var $downBtn = $('.service-app .Tpage .Tmid .Trow.r1 .right .appItem > li > span > .aBtn');

        if($(window).width() > 1200){
            $downBtn.on('mouseover',function(){
                $qrcode.show();
                var qrSrc = $(this).attr('qrcode');
                var top = $(this).offset().top - $(document).scrollTop();
                var left = $(this).offset().left;
                $qrcode.children().attr('src',qrSrc);
                $qrcode.css({'top':top+40,'left':left});
            });
            $downBtn.on('mouseout',function(){
                $qrcode.hide();
            });
        }

    };


    theme.Pagination = {
        documentReady : ziliaoDownload
    };

    theme.components.documentReady.push( ziliaoDownload );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 集团详情内页
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var introNei = function( $ ) {

        var swiper = new Swiper('.list-2 .swiper-container', {
            slidesPerView: 'auto',
            // spaceBetween: 30,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

    };


    theme.Pagination = {
        documentReady : introNei
    };

    theme.components.documentReady.push( introNei );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 搜搜-新闻
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';

    var $souButton = $('.nav .width-1200 .nav-right .nav-righgt-a ul li.sou form button i');
    $souButton.on('click',function(){
        var str = $(this).parent().prev().val();
        localStorage.setItem("searchVal", str);
    });
    $(document).keydown(function(event){
        if(event.keyCode == 13){
            var str = $souButton.parent().prev().val();
            localStorage.setItem("searchVal", str);
        }
    });

    var searchNew = function( $ ) {

        var $newsAddBtn = $('.new .Tpage .Tbtm .Tmore');

        var $souNews = $('.search .search-box .search-lei ul li').eq(0);
        var $souChanpin = $('.search .search-box .search-lei ul li').eq(1);
        var $souBannerP = $('#search .banner p');
        $souBannerP.html(localStorage.getItem("searchVal") + '-搜搜结果');
        var newsPageAjax = function (key, page) {
            $.get('/post/ajaxsearchnews.html', {key: key, page: page}, function (data, textStatus) {
                var _data = eval('(' + data + ')');
                // console.log(_data);
                var html = '';
                if (_data.code === -2) {
                    $('.search .Tpage .Tmid .part').html('未搜索到新闻');
                    return;
                }
                $.each(_data.data, function (i, item) {
                    html +=
                        '<li onclick="window.location.href=\'/news/d'+item.NewsId+'.html\'">'+
                        '<img src="'+item.Pic+'" width="200" height="130" alt="img">'+
                        '<div class="Tmsg">'+
                        '<h5>'+item.Title+'</h5>'+
                        '<p>'+item.Intro+'</p>'+
                        '</div>'+
                        '<div class="Tdate">'+
                        '<span><b>'+sjYue(item.PostDate)+'</b>'+sjNian(item.PostDate)+'</span>'+
                        '<i class="iconfont icon-jiantou1"></i>'+
                        '</div>'+
                        '</li>';
                });
                $('.search .Tpage .Tmid .part').html(html);
                // $newsAddBtn.removeClass('disabled').attr('page', page);
            });
        };
        var chanpinPageAjax = function (key, page) {
            $.get('/post/ajaxsearchproduct.html', {key: key, page: page}, function (data, textStatus) {
                var _data = eval('(' + data + ')');
                // console.log(_data);
                var html = '';
                if (_data.code === -2) {
                    $('.search .Tpage .Tmid .part').html('未搜索到产品');
                    return;
                }
                $.each(_data.data, function (i, item) {
                    html +=
                        '<li onclick="window.location.href='+item.DetailUrl+'">'+
                        '<img src="'+item.ProductPic+'" width="200" height="130" alt="img">'+
                        '<div class="Tmsg">'+
                        '<h5>'+item.ProductName+'</h5>'+
                        '<p>'+item.ProductCharacter+'</p>'+
                        '</div>'+
                        '</li>';
                });
                $('.search .Tpage .Tmid .part').html(html);
                // $newsAddBtn.removeClass('disabled').attr('page', page);
            });
        };
        function sjYue(str){
            var yueStr = str.split("");
            return yueStr[6]+yueStr[7]+yueStr[8]+yueStr[9]+yueStr[10];
        }
        function sjNian(str){
            var nianStr = str.split("");
            return nianStr[0]+nianStr[1]+nianStr[2]+nianStr[3];
        }

        newsPageAjax(localStorage.getItem("searchVal"),1);
        $souNews.on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            newsPageAjax(localStorage.getItem("searchVal"),1);
        });

        $souChanpin.on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            chanpinPageAjax(localStorage.getItem("searchVal"),1);
        });

        // $newsAddBtn.on('click', function () {
        //     if ($(this).hasClass('disabled')) {
        //         return false;
        //     } else {
        //         $(this).addClass('disabled');
        //         var typeId = parseInt($newsAddBtn.attr('typeid'));
        //         var page = parseInt($newsAddBtn.attr('page')) + 1;
        //         newsPageAjax(typeId,page);
        //     }
        // });
    };

    theme.Pagination = {
        documentReady : searchNew
    };

    // theme.components.documentReady.push( searchNew );
    return theme;

}( theme, jQuery, window, document ) );

/*!
 *************************************
 * 判断是否为QQ浏览器
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    var isQQ = function( $ ) {
        /* 判断是否QQ浏览器打开 */
        function is_QQInnerBro() {
            if (navigator.userAgent.indexOf('MQQBrowser') !== -1) {

                var $videoBtn = $('.index .banner .slides li .width-1200 .video-btn');
                var $videoTan = $('.video-box');
                var lunVideoTan = document.getElementById('lunVideoTan');
                var $btnBoo = $('.btn-boo');
                var $btnBoo3 = $('.btn-boo3');
                var videoDom = document.getElementById('lunVideoTan');
                var videoDom1 = document.getElementById('lunVideoTan1');
                var videoDom2 = document.getElementById('lunVideoTan2');
                var videoDom3 = document.getElementById('lunVideoTan3');

                $videoBtn.on('click', function () {
                    alert('X5内核浏览器播放视频有bug，请使用其他浏览器');
                    lunVideoTan.unbind();
                    $videoTan.unbind();

                });

                $btnBoo.on('click', function () {
                    alert('X5内核浏览器播放视频有bug，请使用其他浏览器');
                    $('.video-box').unbind();
                    videoDom.unbind();
                });

                $btnBoo3.on('click', function () {
                    alert('X5内核浏览器播放视频有bug，请使用其他浏览器');
                    $('.video-box1').unbind();
                    videoDom1.unbind();
                    $('.video-box2').unbind();
                    videoDom2.unbind();
                    $('.video-box3').unbind();
                    videoDom3.unbind();
                });

                return true;
            } else {
                return false;

            }
        }

        is_QQInnerBro();
    }

    theme.Pagination = {
        documentReady : isQQ
    };

    theme.components.documentReady.push( isQQ );
    return theme;

}( theme, jQuery, window, document ) );
