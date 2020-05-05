function initPain(){
	//
	$("#pain_a input").bind("click", function() {
		
		var s = $(this).val();
		if(s !=""){
			s = s.substring(0,s.length-1);
		}
		$(".Pain_Score").html(s);
		$("#pain_a input").removeClass("btn-info");
		$(this).addClass("btn-info");
		showPain();
	});
}

//选择完疼痛等级后，显示到页面
function showPain() {
	var painScore = $(".Pain_Score").html();
	var grade = "1004";
	if(painScore>8){
		grade = "1001";
	}else if(painScore>6&&painScore<=8){
		grade = "1002";
	}else if(painScore>=4&&painScore<=6){
		grade = "1003";
	}
	paingrade= grade;
	
	//评分依据增加内容
	$("#ttpf").html('');
	var str = "<div class=\"alert alert-dismissable symptom\">";
	str+= "<button type=\"button\" class=\" alert-close close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"pain_x\" onclick=\"clearPain()\">×</button>";
	str += "疼痛评分: <span id=\"pain_score\">"
			+ painScore + "分</span>";
	str += getGradeBtn(grade);
	str += "</div>";

	
	if(!isload){
	    //获取所有评分表里等级最高的
	    grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}
	$("#ttpf").html(str);
}

function clearPain() {
	resetPain();
	//获取所有评分表里等级最高的
	grade = getHigestGrade();
	//展示自动评级
	showAutoGrade(grade);
}

function resetPain(){
	$("#pain_a input").removeClass("btn-info");
	paingrade= "";
	$(".Pain_Score").html(0);
	$("#ttpf").html('');
}
