( function( $ ) {
    "use strict";

    $( document ).ready( function() {

        if($(window).width() < 1100){
            /* 移动端删除banner视频 */
            $('.index .banner .slides li.slides-video .video-bj video').remove();


            /* 跳转百度地图 */
            $('.service-location .Tpage .Tmid .Trow.r1 .Tcon .left .adrItem .list').on('click',function() {
                var x = parseFloat($(this).find('.i-map').attr('data-x')).toFixed(6);
                var y = parseFloat($(this).find('.i-map').attr('data-y')).toFixed(6);
                var name = $(this).children('h5').text();

                $('#xzMap').show();
                $('.baidu').on('click',function(){
                    window.open('http://api.map.baidu.com/marker?location='+y+','+x+'&title='+name+'&content='+name+'&output=html');
                });
                $('.gaode').on('click',function(){
                    // window.open('https://ditu.amap.com/regeo?lng='+x+'&lat='+y+'&name='+name+'&src=uriapi');
                    window.open('http://uri.amap.com/marker?position='+x+','+y+'&name='+name+'');
                });
                $('.qx').on('click',function(){
                    $('#xzMap').hide();
                });

            });

            /* 移动端菜单 */
            var $dhHan = $('#dhHan');
            var $daoahngM = $('#daoahngM');
            $dhHan.on('click',function(e){
                if(!$(this).hasClass('on')){
                    $(this).addClass('on');
                    $daoahngM.addClass('on');
                } else {
                    $(this).removeClass('on');
                    $daoahngM.removeClass('on');
                }
            });
            /* 明星产品表格高度 */
            $('.page-table').css('height',$(window).height()*0.2);

            // 明星产品视频
            var $videoBtn = $('.video-bg');
            var $videoDom = $('#video');
            $videoBtn.on('click',function(){
                if($(this).hasClass('on')){
                    $videoDom.hide();
                } else {
                    $videoDom.hide();
                    $('this').addClass('on');
                }
            });


            $('.top50').css('width',$(window).width() - 40);

            var $ptLeftBtn = $('.research #YFQT .pt-tab .pt-center .pt-btn-left');
            var $ptRightBtn = $('.research #YFQT .pt-tab .pt-center .pt-btn-right');
            $('.research #YFQT .pt-tab .pt-left ul li').eq(0).addClass('cur').siblings().removeClass('cur');
            $ptRightBtn.on('click',function(){
                $('.research #YFQT .pt-tab .pt-left ul li').eq(0).addClass('cur').siblings().removeClass('cur');
            });
            $ptLeftBtn.on('click',function(){
                $('.research #YFQT .pt-tab .pt-left ul li').eq(0).addClass('cur').siblings().removeClass('cur');
            });

            var $hjLeftBtn = $('.research #HJQK .pt-tab .pt-center .pt-btn-left');
            var $hjRightBtn = $('.research #HJQK .pt-tab .pt-center .pt-btn-right');
            $('.research #HJQK .pt-tab .pt-left ul li').eq(0).addClass('cur').siblings().removeClass('cur');
            $hjRightBtn.on('click',function(){
                $('.research #HJQK .pt-tab .pt-left ul li').eq(0).addClass('cur').siblings().removeClass('cur');
            });
            $hjLeftBtn.on('click',function(){
                $('.research #HJQK .pt-tab .pt-left ul li').eq(0).addClass('cur').siblings().removeClass('cur');
            });
            /* 产品点击 */
            var $chanpinLeft = $('.product.product-index .product-i-box .chanpinM .chanpinM-left .left');
            var $chanpinRight = $('.product.product-index .product-i-box .chanpinM .chanpinM-right');
            var $chanpinRightList = $('.product.product-index .product-i-box .chanpinM .chanpinM-right .right');
            var $chanpinBtn = $('.product.product-index .product-i-box .chanpinM .chanpinM-right .right .right-btn');

            $chanpinLeft.on('click',function(){
                var index = $(this).index();
                $chanpinRight.addClass('on').scrollTop(0);
                $chanpinBtn.addClass('on');
                $chanpinRightList.eq(index).show().siblings().hide();
            });
            $chanpinBtn.on('click',function(){
                $chanpinRight.removeClass('on');
                $chanpinBtn.removeClass('on');
            });
            /* 导航btn */
            var $menuBtn = $('.menu-button');
            /* 导航展开 */
            var $sideEr = $('.sidr-er');
            var $sideErUl = $('.sidr-er-ul');
            $sideEr.on('click',function(){
                if($(this).hasClass('on')){
                    $(this).removeClass('on');
                    $(this).children('i').removeClass('icon-jiantoushang1');
                    $(this).next($sideErUl).fadeOut();
                } else {
                    $(this).addClass('on');
                    $(this).children('i').addClass('icon-jiantoushang1');
                    $(this).next($sideErUl).fadeIn();
                }
            });
            /*if($body.hasClass('new')){
                document.body.addEventListener('touchstart', function(){

                });
            }*/


            /* 如果是安卓执行 */
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
                /* 明星5 page-1高 */
                $('.product.product-fujimedic .page-1 .page-img img').css('transform','scale(1.3)');
                /* 明星3 page-1高 */
                $('.product.product-medisana .page-1 .width-1200 .page-1-right').css('width','69%');
                /* 明星3 page-4高 */
                $('.product.product-medisana .page-4 .width-1200 .page-img').css('background-size','220px');
                /* 明星1 page-5 */
                // var num = $('.product.product-yi .page-5 .width-1200 .page-text .page-table').height();
                $('.top50').css('transform','translateY(-50%)');
                $('.product.product-yi .page-6p').css('overflow','visible');
                setInterval(function(){
                    $('.product.product-yi .page-5 .width-1200 .page-text .page-table').css('height','150px');
                },500);
                /* 投资者关系-关系 */
                $('.nexus .subject .tab-top ul li:nth-child(3) span').css('width','80%');
            }


        }

        if($(window).width() < 1100 && $(window).width() >= 375){

            var $body = $('body');

            var $zpTable = $('.join-school .Tpage .Tmid .Tcon .list .Tmsg');
            $zpTable.css('width','100%');


            /* 集团品牌高度 */
            var $introTmsg = $('.intro .Tpage .Tmid .goodsCon .Ttxt #component > .Tmsg');
            var $introTtxt = $('.intro .Tpage .Tmid .goodsCon .Ttxt');
            $introTtxt.css('paddingTop',$introTmsg.height() + 10);

            /* 代理加盟 */
            /* 轮播高度 */
            var ZDFCLunH = $('.cooperation-agent .cooperation-agent-content #ZDFC .swiper-box .datu').height();
            $('.cooperation-agent .cooperation-agent-content #ZDFC .swiper-box .lunbo').css('top', 0);


            /* 精益制造图片高度 */
            var $researchImg1 = $('.research #YFQT .pt-tab .pt-right .pt-tu ul li');
            var $reseaechTuH1 = $('.research #YFQT .pt-tab .pt-right .pt-tu');
            //$reseaechTuH1.css('height', $researchImg1.eq(0).height());

            var $researchImg2 = $('.research #HJQK .pt-tab .pt-right .pt-tu ul li');
            var $reseaechTuH2 = $('.research #HJQK .pt-tab .pt-right .pt-tu');
            //$reseaechTuH2.css('height', $researchImg2.eq(0).height());


            /* 集团5大品牌left */
            $('.intro .Tpage .Tmid .goodsCon .Ttxt #component > .Tmsg > div').css({
                'width':'100%',
                'text-indent': '20px'
            });

        }

        /* 374 */
        if($(window).width() < 374 && $(window).width() > 0){


            if($('body').hasClass('product-yi')){
                console.log('执行');
                /* page7 table height */
                var $pageH = $('.product .page');
                var $page6H = $('.product.product-yi .page-5 .width-1200 .page-text');
                var $page6TitleH = $('.product.product-fujimedic .page-5 .width-1200 .page-text .page-title');
                var $page6PH = $('.product.product-yi .page-5 .width-1200 .page-text .page-p');
                var $page6GobuyH = $('.product.product-yi .page-5 .width-1200 .page-text .gobuy');

                $page6H.css('height',$pageH.height() - 50 + 'px');
                var $page6table = $('.product.product-yi .page-5 .page-text .page-table');
                $page6table.css('height',$pageH.height() - $page6TitleH.outerHeight(true) - $page6PH.outerHeight(true) - $page6GobuyH.outerHeight(true) - 100 + 'px');

            }

            if($('body').hasClass('research')){
                var $ptTuBox1 = $('.research #YFQT .pt-tab .pt-right .pt-tu');
                var $ptTuBox2 = $('.research #HJQK .pt-tab .pt-right .pt-tu');
                var $ptTuBoxLi = $('.research #YFQT .pt-tab .pt-right .pt-tu ul li');
                // $(window).on('load',function () {
                //     $ptTuBox1.css('height',$ptTuBoxLi.eq(0).height());
                //     $ptTuBox2.css('height',$ptTuBoxLi.eq(0).height());
                // });
            }
        }

    } );

} ) ( jQuery );