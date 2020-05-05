//首页显示时间
function showtime(){
	var d = new Date();
	var str = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
	var minutes;
	if(d.getMinutes()<10){
		minutes="0"+d.getMinutes();
	}else{
		minutes=d.getMinutes();
	}
	var time = d.getHours()+':'+minutes;
	$('.date').text(str);
	$('.time').text(time);
	setTimeout(showtime,60000);
}

showtime();

//更多编辑
$('.togBtn').hide();
$('.iconMore').click(function(){
	$(this).find($('.togBtn')).toggle();
	$(this).parent().siblings().find($('.togBtn')).hide();
});

//滚动
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
    setInterval('AutoScroll(".roll")', 3000)
});
//选项卡(快速分级)
$('.vice,.final').hide();
$('.gradingList li').click(function(){
	var thisNum = $(this).index();
	 var same = $(this).parent('ul').siblings('.tabContent').find('.tabMenu') ;
	same.hide().eq(thisNum).show();
	$(this).addClass('active').siblings().removeClass('active');
});
//选中状态
function addClass(div){
	div.click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
};
addClass($('.tabMenu li'));
addClass($('.judge .btn'));
//左侧菜单
//$('.threeLevel').hide();
$('.fractionation').click(function(){
	$(this).children('i').toggleClass('active');
	$(this).children('.threeLevel').slideToggle();
});
$('.fractionation li').click(function(e){
	$(this).css('color','#47a0ca').siblings().css('color','');
	e.stopPropagation();
});

