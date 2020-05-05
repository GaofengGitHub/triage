
function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-22px"
    },
    500,
    function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    });	
}
$(document).ready(function() {
    setInterval('AutoScroll(".roll")', 3000);

    $('.amendTips').hide();
    $('.touch').hover(function(){
      $('.amendTips').toggle();
    });


    $('.directionBox').hide();
    $('.setGone').click(function(){
      $('.directionBox').toggle();
    });

    var timer = null;
    $('.classifyBox').hide();
    
  //快速分级球效果
    $('.gradeMark').mouseover(function(){
    	$(this).addClass("active");
    	$('.quick-grade01').hide();
    	$('.quick-grade02').show();
    });
    $('.gradeMark').mouseout(function(){
    	if($('.classifyBox').is(':visible') == true) { 
    		$('.gradeMark').addClass("active");
        	$('.quick-grade01').hide();
        	$('.quick-grade02').show();
    	}else{
    		$('.gradeMark').removeClass("active");
        	$('.quick-grade01').show();
        	$('.quick-grade02').hide();
    	}
    	
    });
    //快速分级改为点击出现,在新增页面才显示
    $('.gradeMark').click(function() {
    	//快速分级 用户行为监控
    	if($("#feijz").length>0){
    		if($("#feijz").val()==1){
        		saveUserbehaviorByOpName("快速分级","新增患者");
    		}else{
    			saveUserbehaviorByOpName("快速分级","非急诊");
    		}
    	}
    	$('.classifyBox').toggle();
    	$(this).addClass("active");
    	$('.quick-grade01').hide();
    	$('.quick-grade02').show();
    	if(!showDemo){
    		hideDemoMenu();	
    		
    	}else{
    		hideUnDemoMenu();
    		$(".quickgrade-demo02").toggle();
    		$(".quickgrade-demo02>div.pull-right").hide();
    		$(".quickgrade-demo02>div.pull-right ul li").removeClass("active");;
    	}
    	 
//	    if($("#addPatient").hasClass("active")){
//	    	$('.classifyBox').show();
//	    	$(".gradeMark").addClass("active");
//	    	$('.quick-grade01').hide();
//	    	$('.quick-grade02').show();
//	    }
//	    if($("#events").hasClass("active")){
//	    	$('.classifyBox').show();
//	    	$(".gradeMark").addClass("active");
//	    	$('.quick-grade01').hide();
//	    	$('.quick-grade02').show();
//	    }
	   
	    //2019-4-19 yushim 移除自定义以前输入过的内容
	    getSymptom("0","1");
	    
	});
    $("body").click(function(){
    	if($(".classifyBox").length>0 && $(".classifyBox").is(':visible')){
    		if(!$(event.target).hasClass("label-sinple")){
    			$(".classifyBox").hide();
    		}
    		
    	}                
    });
    $(".classifyBox,.gradeMark").click(function(){
        return false;
    })
	    
//      $('.gradeMark').mouseover(function(){
//            clearTimeout(timer);
//          $('.classifyBox').show();
//      });
//    $('.gradeMark').mouseout(function(){
//        timer = setTimeout(function(){
//            $('.classifyBox').hide();
//        },500);
//      });
    
//      $('.classifyBox').mouseover(function(){
//        clearTimeout(timer);
//      });
//      $('.classifyBox').mouseout(function(){
//        timer = setTimeout(function(){
//            $('.classifyBox').hide();
//            $(".gradeMark").removeClass("active");
//	    	$('.quick-grade01').show();
//	    	$('.quick-grade02').hide();
//        },500);
//      });

      $('.jqddad').dad({
    	    draggable: 'header'
    	});
     
});
