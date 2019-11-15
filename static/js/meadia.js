( function( $ ) {
    "use strict";

    $( document ).ready( function() {

        if($(window).width() < 700){
            $('.product.product-fuji .page-1 .page-img img').attr('src','/static/images/product/fuji/img-1-.png');
            $('.product.product-fuji .page-5 .page-img-270 img').attr('src','/static/images/product/fuji/img-5-m.png');
            var $medisanaPage2 = $('.product.product-medisana .page-2 .slider .slider-img ul li.product.product-medisana .page-2 .slider .slider-img ul li');
            $medisanaPage2.eq(0).attr('src','/static/images/product/medisana/page-2-1-m.png');
            $medisanaPage2.eq(1).attr('src','/static/images/product/medisana/page-2-2-m.png');
            $medisanaPage2.eq(2).attr('src','/static/images/product/medisana/page-2-3-m.png');
            $medisanaPage2.eq(3).attr('src','/static/images/product/medisana/page-2-4-m.png');
            $medisanaPage2.eq(4).attr('src','/static/images/product/medisana/page-2-5-m.png');
        }

    } );

} ) ( jQuery );