$(document).ready(function() {
	//疼痛等级评分
	$(".num").bind("click", function() {
		var s = $(this).html();
		//需要加点击效果，单选效果
		$(this).addClass("active").parents("div").siblings().find(".num").removeClass("active");
		$("#Pain_Score").html(s);
		showPain();
	});
});

//选择完疼痛等级后，显示到页面
function showPain() {
	var painScore = $("#Pain_Score").html();

	//评分依据增加内容
	$("#ttpf").html('');

	var str = "<div class=\"alert alert-dismissable\" id=\"pain_div1\">";
	str += "<div class='result-level'>疼痛评分: <span id=\"pain_score1\">"+ painScore + "分</span></div>";
	str += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearPain();\" id=\"pain_x\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>";
	str += "</div>";

	//	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	//	str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+"疼痛评分:"+painScore+"分"+"\" onclick=\"clearPain()\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>";
	//	str1+= "疼痛评分:"+painScore+"分";
	//    str1+= "</div>";
	var html1 = $("#ttpf").html();
	html1 = html1 + str;
	$("#ttpf").html(html1);
}

function clearPain() {
	$("#Pain_Score").html(0);
	$("#ttpf").html('');
}