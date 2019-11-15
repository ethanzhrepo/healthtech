function config() {
	mainproductspeed = 800;
	ww = $(window).width();
	wh = $(window).height();
}
$(document).ready(function() {
	config();
	pholder();
	menusearch();
	banner();
	mainproduct();
	// otherproduct();
	sidebarclick();
	togglemenulist();
	hoveranimate();
	brandhonoreachdelay();
	videopop();
	moicon();
	if($('.product .right .forslide .item').size()>0){ splititem(); }
	if($('.mo').size()>0){mobanner();}
	$('.honors .item').click(function() {
		$('.honors .item').removeClass('active');
		$(this).toggleClass('active');
	});
	$('.honors .item').mouseleave(function() {
		$(this).removeClass('active');
	});
	if(ww<=480) {$('.pro .sidebar .mod').removeClass('active');}
	$('.movideo .right .text').niceScroll({
		cursorcolor:"#666",
		cursorwidth: '6',
		cursorborder:"none",
		cursoropacitymin: '0',
		cursoropacitymax: '0.5'
	});
});
function splititem() {
	size = $('.product .right .forslide .item').size();
	count = 0;
	html = '';
	temphtml = '';
	for(i=0;i<=size-1;i++){
		temphtml += $('.product .right .forslide a:eq('+i+')').prop('outerHTML');
		if((i+1)%4==0&&i>0){
			html += '<li>'+temphtml+'</li>';
			temphtml = '';
		}
	}
	if(size%4!=0){ html += '<li>'+temphtml+'</li>'; }
	$('.product .right .banner .slides').append(html);
	 $('.product .right .forslide').remove();
}
function mobanner() {
	if($(".mo .moslider").length != 0) {
		$('.mo .moslider').each(function() {
			if($(this).find('li').size()>1){
				$(this).flexslider({
					animation: "slide",
					slideDirection: "vertical",
					prevText: "", 
					nextText: "",
					slideshow: false
					// touch: false
				});
			}
		});
		// $('.mo .moslider').flexslider({
		// 	animation: "slide",
		// 	slideDirection: "vertical",
		// 	prevText: "", 
		// 	nextText: "",
		// 	slideshow: false
		// });
	}
}
function moicon() {
	$('.jiankangjiezuo .item .icons ul li').click(function() {
		temptext = $(this).find('.text').html();
		if(temptext!=undefined){
			$('.jiankangjiezuo .item .icons ul li .icon').removeClass('active');
			$(this).find('.icon').addClass('active');
			o = $(this).parent('ul').parent('.icons').parent('.pdcon').find('.info');
			o.html('<div class="animated fadeInUp">'+temptext+'</div>');
			$('.jiankangjiezuo .item').removeClass('active');
			o.parent('.pdcon').parent('.item').addClass('active');
			// console.log(o.parent('.pdcon').parent('.item'));
		}
	});
	$('.jiankangjiezuo .item').mouseenter(function() {
		text = $(this).find('.info').html();
	});
	$('.jiankangjiezuo .item').mouseleave(function() {
		$(this).find('.info').html(text);
		$('.jiankangjiezuo .item .icons ul li .icon').removeClass('active');
		$('.jiankangjiezuo .item').removeClass('active');
	});
}
function videopop() {
	$('.videos .video').each(function() {
		$(this).click(function() {
			url = $(this).find('.hover').attr('data-video');
			if(url.length>0){
				if(url.indexOf('.swf')>0){
					$('.videopop .cont').append('<iframe src="'+url+'" frameborder="0"></iframe>');
				}else{
					$('.videopop .cont').append('<video src="'+url+'" controls="controls" autoplay="autoplay"></video></div>');
				}
				$('.videopop').show();
				$('.videopop iframe, .videopop video').each(function() {
					if(ww>800){
						if(ww>1200){
							$(this).css({
								width : ww - 800,
								height: (ww-800)*9/16,
								marginTop: (wh-(ww-800)*9/16)/2
							});
						}else{
							$(this).css({
								width : ww - 400,
								height: (ww-400)*9/16,
								marginTop: (wh-(ww-400)*9/16)/2
							});
						}
					}else{
						$(this).css({
							width : ww - 50,
							height: (ww-50)*9/16,
							marginTop: (wh-(ww-200)*9/16)/2
						});
					}
				});
			}
		});
	});
	$('.videopop .close').click(function() {
		$('.videopop').hide();
		$('.videopop .cont').empty();
	});
}
function brandhonoreachdelay() {
	if($('.honors .rows .row .item').size()>0) {
		delay=-0.1;
		$('.honors .rows .row .item').each(function() {
			delay+=0.1;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.contacts .right .block').size()>0) {
		delay=-0.2;
		$('.contacts .right .block').each(function() {
			delay+=0.2;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.detials .about .block').size()>0) {
		delay=-0.2;
		$('.detials .about .block').each(function() {
			delay+=0.2;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.guige table tr').size()>0) {
		delay=-0.1;
		$('.guige table tr').each(function() {
			delay+=0.1;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.paperdl .item').size()>0) {
		delay=-0.1;
		$('.paperdl .item').each(function() {
			delay+=0.1;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.news .row').size()>0) {
		delay=-0.2;
		$('.news .row').each(function() {
			delay+=0.2;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.jobs .block').size()>0) {
		delay=-0.1;
		$('.jobs .block').each(function() {
			delay+=0.1;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.act .video').size()>0) {
		delay=-0.1;
		$('.act .video').each(function() {
			delay+=0.1;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.act .qikan .item').size()>0) {
		delay=-0.1;
		$('.act .qikan .item').each(function() {
			delay+=0.1;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.xiuwaihuizhong .items .item').size()>0) {
		delay=-0.1;
		$('.xiuwaihuizhong .items .item').each(function() {
			delay+=0.1;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.jiankangjiezuo .item').size()>0) {
		delay=-0.1;
		$('.jiankangjiezuo .item').each(function() {
			delay+=0.1;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.techguige .item').size()>0) {
		delay=-0.2;
		$('.techguige .item').each(function() {
			delay+=0.2;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.sizetable tr').size()>0) {
		delay=-0.2;
		$('.sizetable tr').each(function() {
			delay+=0.2;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.navs .item').size()>0) {
		delay=-0.2;
		$('.navs .item').each(function() {
			delay+=0.2;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
	if($('.product .item').size()>0) {
		delay=-0.2;
		$('.product .item').each(function() {
			delay+=0.2;
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
		});
	}
}
function togglemenulist() {
	$('.menubtn').click(function() {
		$('.menu .menulist').slideToggle();
	});
}
function sidebarclick() {
	$('.sidebar .mod').each(function() {
		$(this).click(function() {
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{
				$('.sidebar .mod').removeClass('active');
				$(this).addClass('active');
			}
		});
	});
}
function switchright(side) {
	if(side=='pre'){
		if(marginval-1>-1){
			marginval--;
		}
	}else{
		if(marginval+1<Math.ceil(otherpro/2)-1){
			marginval++;
		}
	}
	mar = 0 - marginval * 50;
	$('.product .right .items').animate({
		marginLeft: mar+'%'
	},400,"swing");
}
function otherproduct() {
	otherpro = $('.product .right .items .item').size();
	linewidth = Math.ceil(otherpro/2)/2*100;
	marginval = 0;
	$('.product .right .items').css({ width: linewidth+'%' });
	perwidth = 10000 / linewidth / 2;
	$('.product .right .items .item').css({ width: perwidth+'%' });
}
function switchmain(side) {
	if($(".product .left .main .items .item").size()>1) {
		if(side=='pre'){
			temp = $(".product .left .main .items a:last").prop('outerHTML');
			$(".product .left .main .items a:last").remove();
			html = $(".product .left .main .items").html();
			$(".product .left .main .items").html(temp+html).css({marginLeft: '-100%'});
			$(".product .left .main .items").animate({
				marginLeft: '0%'
			},mainproductspeed,"swing");
		}else{
			temp = $(".product .left .main .items a:first").prop('outerHTML');
			$(".product .left .main .items").animate({
				marginLeft: '-100%'
			},mainproductspeed,"swing",function() {
				$(".product .left .main .items").append(temp);
				$(".product .left .main .items a:first").remove();
				$(".product .left .main .items").css({marginLeft: '0%'});
			});
		}
	}
	
}
function mainproduct() {
	mainpro = $('.product .left .items .item').size();
	$('.product .left .items').css({ width: mainpro+'00%' });
	$('.product .left .items .item').css({ width: 100 / mainpro+'%' });
}
function banner() {
	if($(".slider").length != 0) {
		$('.slider').flexslider({
			animation: "slide",
			prevText: "", 
			nextText: ""
		});
	}
	if($(".notautoslider").length != 0) {
		$('.notautoslider').flexslider({
			animation: "slide",
			slideDirection: "vertical",
			prevText: "", 
			nextText: "",
			slideshow: false
		});
	}
}
function menusearch() {
	defaulttext = $('.menu .menulist .search .form input').attr('pholder');
	$('.menu .menulist .search .trigger').click(function() {
		$('.menu .menulist .search .input').show();
		$('.menu .menulist .search .searchtext').focus();
	});
	$('.menu .menulist .search .searchtext').blur(function() {
		// $('.menu .menulist .search .input').hide();
		if($(this).val()==""||$(this).val()==defaulttext){
			$('.menu .menulist .search .input').hide();
		}
	});
	$('.menu .menulist .search .input .btn').click(function() {
		$("#search").click();
	});
}

function pholder() {
	$('[pholder]').each(function() {
		$(this).val($(this).attr('pholder'));
		$(this).focus(function() {
			$(this).val() == $(this).attr('pholder') ? $(this).val('') : $(this).val($(this).val());
		});
		$(this).blur(function() {
			$(this).val() == '' ? $(this).val($(this).attr('pholder')) : $(this).val($(this).val());
		});
	});
}

function c(arr) {
	if(arr instanceof Array) {
		type = '数组';
		val = '值：\n';
		console.log('数值类型:'+type);
		for(i=0;i<arr.length;i++){
			val += arr[i]+'  \n';
		}
		console.log(val);
	}else{
		if(typeof(arr) == 'undefined') { 
			type = '错误';
			console.log('错误: undefined');
		}else{
			type = '值';
			console.log('数值类型:'+type+': '+arr);
		}
	}
}
function placeholder() {
	$('[placeholder]').each(function() {
		placeholder = $(this).attr('placeholder');
		$(this).focus(function() {
			$(this).attr('placeholder') == placeholder ? $(this).val('') : $(this).val($(this).val());
		});
		$(this).blur(function() {
			$(this).attr('placeholder') == '' ? $(this).val(placeholder) : $(this).val($(this).val());
		});
	});
}

function hoveranimate() {
	$('[hover]').each(function() {
		$(this).mouseenter(function() {
			animate = $(this).attr('hover');
			if($(this).attr("effect")){
				effectchild = $(this).attr("effect");
				$(this).find(effectchild).addClass(animate+" animated");
			}else{
				$(this).addClass(animate+" animated");
			}
		});
		$(this).mouseleave(function() {
			animate = $(this).attr('hover');
			if($(this).attr("effect")){
				effectchild = $(this).attr("effect");
				$(this).find(effectchild).removeClass(animate+" animated");
			}else{
				$(this).removeClass(animate+" animated");
			}
		});
	});
	$('[animate]').each(function() {
		animate = $(this).attr('animate');
		if($(this).attr('effect')){
			$(this).find($(this).attr('effect')).addClass(animate+' animated');
		}else{
			$(this).addClass(animate+' animated');
		}
	});
	$('[reach]').each(function() {
		if($(window).height()<$(this).offset().top){
			$(this).css({
				'visibility': 'visible'
			});
			animate = $(this).attr('reach');
			if($(this).attr("effect")){
				effectchild = $(this).attr("effect");
				$(this).find(effectchild).addClass(animate+" animated");
			}else{
				$(this).addClass(animate+" animated");
			}
		}
	});
	$(window).scroll(function() {
		topval = $(document).scrollTop();
		$('[reach]').each(function() {
			if(topval>$(this).offset().top-$(window).height()){
				$(this).css({
					'visibility': 'visible'
				});
				animate = $(this).attr('reach');
				if($(this).attr("effect")){
					effectchild = $(this).attr("effect");
					$(this).find(effectchild).addClass(animate+" animated");
				}else{
					$(this).addClass(animate+" animated");
				}
			}else{
				$(this).css({
					'visibility': 'hidden'
				});
				animate = $(this).attr('reach');
				if($(this).attr("effect")){
					effectchild = $(this).attr("effect");
					$(this).find(effectchild).removeClass(animate+" animated");
				}else{
					$(this).removeClass(animate+" animated");
				}
			}
		});
	});
}
