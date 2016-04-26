w().ready(function(){
    var list = w('.people li')
    for (var i = 0,len = list.length; i < len; i++) {
        list[i].onmouseenter = function (e) {
            w(this).w('em').removeClass('hide')
        }
        list[i].onmouseleave = function (e) {
            w(this).w('em').addClass('hide')
        }
    }
    var buttonList1 = w('.feature button')
    
	buttonList1[0].onclick = function (e) {
		w('.feature .active').removeClass('active')
		w(this).addClass('active')
		console.log(this);
		$('.jumuInfo').css('display','none');
		$('.yanchuInfo').css('display','block');
	}
    buttonList1[1].onclick = function (e) {
		w('.feature .active').removeClass('active')
		w(this).addClass('active')
		$('.yanchuInfo').css('display','none');
		$('.jumuInfo').css('display','block');
	}
    var buttonList2 = w('.make button')
    buttonList2[0].onclick = function (e) {
		w('.make .active').removeClass('active');
		w(this).addClass('active');
		$('#daoyanshanshu').css('display','block');
		$('#wumeifuzhuang').css('display','none');
		
	}
	buttonList2[1].onclick = function (e) {
		w('.make .active').removeClass('active');
		w(this).addClass('active');
		$('#daoyanshanshu').css('display','none');
		$('#wumeifuzhuang').css('display','block');
	}
	
	$(".nav li a").click(function(){
		$('.nav li a').removeClass("nav_on");
		$(this).addClass("nav_on");
	});	
	
})



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
var musicTextArray = ['1','2','3','4','5','6','7'];
