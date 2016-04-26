

$(document).ready(function(){
	
	//
	
	jQuery(document).ready(function($) {
		$(".scroll").click(function(event){	
			console.log($(this.hash).offset().top);
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
		});
	});
	

    //
	var topHeight=$(".header").height() + $(".nav_wrp").height() - 1;
    var productDetail=$(".nav_wrp");
	//alert(topHeight);
    $(window).scroll(function(){
       if ($(window).scrollTop()> topHeight){
          productDetail.addClass("nav_fixed");
         }else{
         productDetail.removeClass("nav_fixed");
          }
      });


	

  //go_back
  $("#go_back").click(function() {
       $("html, body").animate({ scrollTop: 0 }, 360);
	   $('.header_ul li').removeClass("hul_on");
  })
  $backToTopFun = function() {		
  var st = $(document).scrollTop(), winh = $(window).height();
      (st > 800)? $("#go_back").show(): $("#go_back").hide();
        if (!window.XMLHttpRequest) {
            $("#go_back").css("top", st + winh - 166);
        }
    };
  $(window).bind("scroll", $backToTopFun); 
  $backToTopFun(); 		
	
	//
	$(".nav li a").click(function(){
		$('.nav li a').removeClass("nav_on");
		$(this).addClass("nav_on");
			});	
	
    //
    $('.wrp1_nav a:first').attr('class','a_select');
    $('.wrp1_info_wrp .wrp1_info:first').show();
	
	$('.wrp1_nav a').eq(0).click(function(){
		$('.wrp1_nav a').eq(0).attr('class','a_select').siblings().attr('class','');
		$('.wrp1_info_wrp .wrp1_info').eq(0).show().siblings().hide();
		});

	$('.wrp1_nav a').eq(1).click(function(){
		$('.wrp1_nav a').eq(1).attr('class','a_select').siblings().attr('class','');
		$('.wrp1_info_wrp .wrp1_info').eq(1).show().siblings().hide();
		});
		
	$('.wrp1_nav a').eq(2).click(function(){
		$('.wrp1_nav a').eq(2).attr('class','a_select').siblings().attr('class','');
		$('.wrp1_info_wrp .wrp1_info').eq(2).show().siblings().hide();
		});
		
	$('.wrp1_nav a').eq(3).click(function(){
		$('.wrp1_nav a').eq(3).attr('class','a_select').siblings().attr('class','');
		$('.wrp1_info_wrp .wrp1_info').eq(3).show().siblings().hide();
		});				

				
    //
    $('.wrp2_nav a:first').attr('class','a_select2');
    $('.wrp2_content .wrp2_list:first').show();
	
	$('.wrp2_nav a').eq(0).click(function(){
		$('.wrp2_nav a').eq(0).attr('class','a_select2').siblings().attr('class','');
		$('.wrp2_content .wrp2_list').eq(0).show().siblings().hide();
		});

	$('.wrp2_nav a').eq(1).click(function(){
		$('.wrp2_nav a').eq(1).attr('class','a_select2').siblings().attr('class','');
		$('.wrp2_content .wrp2_list').eq(1).show().siblings().hide();
		});
		
	$('.wrp2_list li').hover(function(){
		$(this).find('.wrp2_layer').stop().fadeIn(500);
		},function(){ 
		$(this).find('.wrp2_layer').stop().fadeOut(500);
		});	
		
		
    //
    $('.wrp4_nav a:first').attr('class','a_select4');
    $('.wrp4_content:first').show();
	
	$('.wrp4_nav a').eq(0).click(function(){
		$('.wrp4_nav a').eq(0).attr('class','a_select4').siblings().attr('class','');
		$('.wrp4_content').eq(0).show();
		$('.wrp4_content').eq(1).hide();
		});

	$('.wrp4_nav a').eq(1).click(function(){
		$('.wrp4_nav a').eq(1).attr('class','a_select4').siblings().attr('class','');
		$('.wrp4_content').eq(1).show();
		$('.wrp4_content').eq(0).hide();
		});		
			
			
			
			
			
			
			
			
			
			
			
	
    //
    $('.wrp02_fy a:first').attr('class','a_select');
    $('.wrp02_info ul:first').show();
	
	$('.wrp02_fy a').eq(0).click(function(){
		$('.wrp02_fy a').eq(0).attr('class','a_select').siblings().attr('class','');
		$('.wrp02_info ul').eq(0).show().siblings('ul').hide();
		});
	
	$('.wrp02_fy a').eq(1).click(function(){
		$('.wrp02_fy a').eq(1).attr('class','a_select').siblings().attr('class','');
		$('.wrp02_info ul').eq(1).show().siblings('ul').hide();
		});

	$('.wrp02_fy a').eq(2).click(function(){
		$('.wrp02_fy a').eq(2).attr('class','a_select').siblings().attr('class','');
		$('.wrp02_info ul').eq(2).show().siblings('ul').hide();
		});
	
	$('.wrp02_fy a').eq(3).click(function(){
		$('.wrp02_fy a').eq(3).attr('class','a_select').siblings().attr('class','');
		$('.wrp02_info ul').eq(3).show().siblings('ul').hide();
		});
		
	$('.wrp02_fy a').eq(4).click(function(){
		$('.wrp02_fy a').eq(4).attr('class','a_select').siblings().attr('class','');
		$('.wrp02_info ul').eq(4).show().siblings('ul').hide();
		});		
		
		
		
		
		

	 //切换导航
	  $(window).scroll(function() {

		  var srcNum = $(document).scrollTop();
		  var w0  = $('#w0').height();
		  var w1  = $('.wrp_01').height() - 2;
		  var w2  = $('.wrp_02').height();
		  var w3  = $('.wrp_03').height();
		  var w4  = $('.wrp_04').height();
		  var w5  = $('.wrp_05').height();
		// alert(w0);
		//  alert(wp02Height);
		  if (srcNum< w0){
			  $('.nav_on').each(function(){
				  $(this).attr('class','');
			  });
			  $('#n0').attr('class','nav_on');
		  }
		  else if (srcNum> w0 &srcNum< w0 + w1 ){
			  $('.nav_on').each(function(){
				  $(this).attr('class','');
			  });
			  $('#n1').attr('class','nav_on');
		  }
		  else if (srcNum> w0 + w1 &srcNum< w0 + w1 + w2 ){
			  $('.nav_on').each(function(){
				  $(this).attr('class','');
			  });
			  $('#n2').attr('class','nav_on');
		  }
		  else if (srcNum> w0 + w1 + w2 &srcNum< w0 + w1 + w2 + w3 ){
			  $('.nav_on').each(function(){
				  $(this).attr('class','');
			  });
			  $('#n3').attr('class','nav_on');
		  }		  
		  else if (srcNum> w0 + w1 + w2 +w3 &srcNum< w0 + w1 + w2 + w3 + w4 ){
			  $('.nav_on').each(function(){
				  $(this).attr('class','');
			  });
			  $('#n4').attr('class','nav_on');
		  }	
		  
		  else if (srcNum> w0 + w1 + w2 +w3 + w4 &srcNum< w0 + w1 + w2 + w3 + w4 + w5 ){
			  $('.nav_on').each(function(){
				  $(this).attr('class','');
			  });
			  $('#n5').attr('class','nav_on');
		  }	  
		  								
		  else if (srcNum< banHeight){
			  $('.li_nav_on').each(function(){
				  $(this).attr('class','');
			  });
			  $('#li_nav_01').removeAttr('class','li_nav_on');
		  }					
	  });	 
	  
	  
	  //
	  
	  $('.wrp02_info ul li a').hover(function(){
		  $(this).find('.gal_bg').css("visibility","visible");
	       },function(){
		  $(this).find('.gal_bg').css("visibility","hidden");
           });
	 					
						
				
});
