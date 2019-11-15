( function( $ ) {
    "use strict";

    $( document ).ready( function() {
        var $body = $('body');

        /* 点击集团公司跳转到对应 */
        var $navErOne = $('.nav .child-nav ul > li');
        $navErOne.on('click',function(){
            localStorage.setItem("introIndex", $(this).index());
            console.log(localStorage.getItem("introIndex"));
        });
        if($body.hasClass('intro')){
            $navErOne.on('click',function(){
                localStorage.setItem("introIndex", $(this).index());
                console.log(localStorage.getItem("introIndex"));

                var $introImg = $('.intro .Tpage .Tmid .goodsCon .Ttxt #component > .Tmsg .pageChange > li');
                var $introList = $('.intro .Tpage .Tmid .goodsCon .Ttxt #component .itemwrap > li');
                var index = localStorage.getItem("introIndex");
                $introImg.eq(index - 1).addClass('on').siblings().removeClass('on');
                //$introList.eq(index - 1).show().siblings().hide();
                $introList.eq(index - 1).addClass('current').siblings().removeClass('current');
                $introImg.on('click',function(){
                    var index = $(this).index();
                    $(this).addClass('on').siblings().removeClass('on');
                    // $introList.eq(index).show().siblings().hide();
                    $introList.eq(index).addClass('current').siblings().removeClass('current');
                });
            });

            var $introImg = $('.intro .Tpage .Tmid .goodsCon .Ttxt #component > .Tmsg .pageChange > li');
            var $introList = $('.intro .Tpage .Tmid .goodsCon .Ttxt #component .itemwrap > li');
            var index = localStorage.getItem("introIndex");
            $introImg.eq(index - 1).addClass('on').siblings().removeClass('on');
            $introList.eq(index - 1).addClass('current').siblings().removeClass('current');
            $introImg.on('click',function(){
                if(!$introImg.hasClass('noclick')){
                    var index = $(this).index();
                    $(this).addClass('on').siblings().removeClass('on');
                    $introList.removeClass('current');
                    $introList.eq(index).addClass('current');
                    console.log('没');
                    $introImg.addClass('noclick');
                    setTimeout(function(){
                        $introImg.removeClass('noclick');
                    },5000);
                } else {
                    console.log('有');
                }
            });

        }

        /* 投资者关系返回列表 */
        var $nexusLi = $('.nexus .subject .tab-top ul li');
        var $nexusBottomLi = $('.nexus .subject .tab-nei ul li');
        $nexusLi.eq(2).on('click',function(){
            localStorage.setItem("nexusIndex", "Three");
        });
        $nexusLi.eq(3).on('click',function(){
            localStorage.setItem("nexusIndex", "Four");
        });
        $nexusLi.eq(4).on('click',function(){
            localStorage.setItem("nexusIndex", "Five");
        });
        if(localStorage.getItem("nexusIndex") === 'Three'){
            $nexusLi.eq(2).addClass('cur').siblings().removeClass('cur');
            $nexusBottomLi.eq(0).show().siblings().hide();
        }
        if(localStorage.getItem("nexusIndex") === 'Four'){
            $nexusLi.eq(3).addClass('cur').siblings().removeClass('cur');
            $nexusBottomLi.eq(1).show().siblings().hide();
        }
        if(localStorage.getItem("nexusIndex") === 'Five'){
            $nexusLi.eq(4).addClass('cur').siblings().removeClass('cur');
            $nexusBottomLi.eq(2).show().siblings().hide();
        }

    } );

} ) ( jQuery );