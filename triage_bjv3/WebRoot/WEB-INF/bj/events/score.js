function initPf() {
	 var sytime = synctime();
	$("#dividtime").val(sytime.substring(0, 16));
	$('#dividtime').datetimepicker({autoclose:true,pickerPosition:'top-right',endDate:new Date(),format: 'yyyy-mm-dd hh:ii' });
	$("#pf_b li").bind("click", function() {
		if ($(this).attr("id") == "e-b-8-4") {
			return;
		}
		if ($(this).is('.active')) {
			$(this).removeClass('active');
			var totalScore = $(".totalScore").text();
			$(".totalScore").text(parseInt(totalScore) - parseInt(5));
			var Score_B = $(".Score_B").text();
			$(".Score_B").text(parseInt(Score_B) - parseInt(5));
		} else {
			$(this).addClass('active');
			var totalScore = $(".totalScore").text();
			$(".totalScore").text(parseInt(totalScore) + parseInt(5));
			var Score_B = $(".Score_B").text();
			$(".Score_B").text(parseInt(Score_B) + parseInt(5));
		}
		getTotalScore();
	});
	// 选择B级其他时显示输入框
	$("#e-b-8-3").bind("click", function() {
		if ($("#e-b-8-3").attr("class") == "active") {
			$("#e-b-8-4").css('display', 'block');
			$("#e-b-8-4").find("input").val("");
		} else {
			$("#e-b-8-4").css('display', 'none');
		}
	});

	$("#pf_c li")
			.bind(
					"click",
					function() {
						var sel_score = $(this).text();
						sel_score = sel_score.substring(sel_score.length - 3,
								sel_score.length - 2);
						if ($(this).is('.active')) {
							$(this).removeClass('active');
							var totalScore = $(".totalScore").text();
							var Score_C_Old = $(".Score_C").text();
							Score_C_New = parseInt(Score_C_Old)
									+ parseInt(sel_score);
							$(".Score_C").text(Score_C_New);
							$(".totalScore").text(
									parseInt(totalScore) - Score_C_Old
											+ Score_C_New);
						} else {
							var old_score = $(this).siblings('.active').text();
							if ((old_score != null) || (old_score != "")) {
								old_score = old_score.substring(
										old_score.length - 3,
										old_score.length - 2);
								sel_score = sel_score - old_score;
							}
							$(this).addClass('active').siblings().removeClass(
									'active');
							var totalScore = $(".totalScore").text();
							var Score_C_Old = $(".Score_C").text();
							Score_C_New = parseInt(Score_C_Old)
									- parseInt(sel_score);
							$(".Score_C").text(Score_C_New);
							$(".totalScore").text(
									parseInt(totalScore) - Score_C_Old
											+ Score_C_New);
						}
						getTotalScore();
					});

	
	$("#pf_d li").bind("click",function(){ 
		var sel_score = $(this).text();
		
		sel_score = sel_score.substring(sel_score.length-3,sel_score.length-2);
		var td = $(this).parent().parent().next();
		var edts_sign_score =  td.text();
		if($(this).is('.active')){
			$(this).removeClass('active');
			td.html(parseInt(edts_sign_score)-parseInt(sel_score));
		}else{
			var old_score = $(this).siblings('.active').text();
			
			if((old_score!=null)||(old_score!="")){
				old_score = old_score.substring(old_score.length-3,old_score.length-2);
				sel_score = sel_score - old_score;
			}
			$(this).addClass('active').siblings().removeClass('active');
			var edts_sign_score_New = parseInt(edts_sign_score)+parseInt(sel_score);
			
			td.html(edts_sign_score_New);
		}
		getTotalScore();
	});

}

// 计算总分
function getTotalScore() {
	// 如果没有etds评过分及页面不存在etds评分结果
	if (!$("#symptom").find("#last_score_div").length > 0) {
		var html = $("#symptom").html();
		var str = "<div class=\"alert alert-dismissable\" id=\"last_score_div\">";
		str += "<div class='result-level'>急性病理生理状态总积分  = <span id=\"last_score\">0</span></div>";
		str += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearGrade(this);\" id=\"edts_x\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>";
		str += "</div>";
		html = html + str;
		$("#symptom").html(html);
	}

	var Score_C = $(".Score_C").text();
	var Score_B = $(".Score_B").text();
	// 获取A积分

	var p_id = $("#p_id").val();

	var tr = $("#" + p_id);

	var age = tr.find("input[name='age']").val();
	var danw = tr.find("select[name='danw']").val();
	if (age.length > 0) {
		if (danw == "月") {
			age = 2;
		} else if (danw == "天") {
			age = 1;
		}
	} else {
		age = 0;
	}

	var Score_A = getScore_A(age);
	$(".Score_A").text(Score_A);

	// 获取D积分
	var ssy = tr.find("input[name='ssy']").val();
	var szy = tr.find("input[name='szy']").val();
	var maibo = tr.find("input[name='maibo']").val();
	var huxi = tr.find("input[name='huxi']").val();

	// 计算平均血压
	var xueya = (parseFloat(szy) + parseFloat(ssy)) / 2;

	// 突发公共卫生时间 体温和血氧 直接选择 分数
	// var spo2 = 90;//默认正常spo2
	// var tiwen = 37.2; //默认体温正常
	// var score_tiwen = getTiwenScore(tiwen);
	// var score_spo2 = getSpo2Score(spo2);
	var score_tiwen = $('#score_tiwen').text();
	score_tiwen = parseInt(score_tiwen);

	var score_spo2 = $('#score_spo2').text();
	score_spo2 = parseInt(score_spo2);
	
	var score_xueya = $('#score_xueya').text();
	score_xueya = parseInt(score_xueya);
	
	var score_maibo = $('#score_maibo').text();
	score_maibo = parseInt(score_maibo);
	
	var score_huxi = $('#score_huxi').text();
	score_huxi = parseInt(score_huxi);

//	var score_xueya = getXueyaScore(xueya);
//	var score_maibo = getMaiboScore(maibo);
//	var score_huxi = getHuxiScore(huxi);

	// $("#score_tiwen").html(score_tiwen);
	//$("#score_xueya").html(score_xueya);
	//$("#score_maibo").html(score_maibo);
	//$("#score_huxi").html(score_huxi);
	// $("#score_spo2").html(score_spo2);

	var Score_D = score_tiwen + score_xueya + score_maibo + score_huxi
			+ score_spo2;
	$(".Score_D").text(Score_D);
	$(".totalScore").text(
			parseInt(Score_A) + parseInt(Score_C) + parseInt(Score_D)
					+ parseInt(Score_B));
	$("#symptom").find("#last_score").text($(".totalScore").text());
	var grade;
	if ($(".totalScore").text() >= 28) {
		grade = "1001";
	} else if (($(".totalScore").text() >= 19) && $(".totalScore").text() < 28) {
		grade = "1002";
	} else if ($(".totalScore").text() >= 13 && $(".totalScore").text() < 19) {
		grade = "1003";
	} else {
		grade = "1004";
	}
	tr.find("input[name='edtsgrade']").val(grade);
	var at_grade = getHigestGrade();
	showAutoGrade(at_grade);


}

// 获取年龄评分
function getScore_A(age) {
	// 根据年龄判断A积分 ≤44:0分;45-54:2分;55-64:3分;≥65:5分
	var Score_A = 0;
	if (age >= 65)
		Score_A = 5;
	if ((age < 65) && (age >= 55))
		Score_A = 3;
	if ((age < 55) && (age >= 45))
		Score_A = 2;
	return Score_A;
}

// 获取呼吸评分
function getHuxiScore(huxi) {
	// 根据呼吸判断 得分 ≥50(4分);49-35(3分);34-25(1分);24-12(0分);11-10(1分);9-6(2分);≤5(4分)
	var huxi = parseInt(huxi);
	var Score = 0;
	if ((huxi >= 50) || (huxi <= 5))
		Score = 4;
	if ((huxi < 49) && (huxi >= 35))
		Score = 3;
	if ((huxi < 35) && (huxi >= 25))
		Score = 2;
	if ((huxi < 12) && (huxi >= 10))
		Score = 1;
	if ((huxi < 10) && (huxi >= 6))
		Score = 2;
	return Score
}

// 获取体温评分
function getTiwenScore(tiwen) {
	// 根据体温判断
	// 得分≥41(4分);40.9-39(3分);38.9-38.5(1分);38.4-36(0分);35.9-34(1分);33.9-32(2分);31.9-30(3分);≤29.9(4分)
	var tiwen = parseFloat(tiwen);

	var Score = 0;
	if ((tiwen >= 41) || (tiwen <= 29.9))
		Score = 4;
	if ((tiwen < 41) && (tiwen >= 39))
		Score = 3;
	if ((tiwen < 39) && (tiwen >= 38.5))
		Score = 1;
	if ((tiwen < 36) && (tiwen >= 34))
		Score = 1;
	if ((tiwen < 34) && (tiwen >= 32))
		Score = 2;
	if ((tiwen < 32) && (tiwen >= 30))
		Score = 3;
	return Score
}

// 获取心率评分
function getMaiboScore(maibo) {
	// 根据心率判断 得分
	// ≥180(4分);179-140(3分);139-110(2分);109-70(0分);69-55(2分);54-40(3分);≤39(4分)
	var maibo = parseInt(maibo);
	var Score = 0;
	if ((maibo >= 180) || (maibo <= 39))
		Score = 4;
	if ((maibo < 180) && (maibo >= 140))
		Score = 3;
	if ((maibo < 140) && (maibo >= 110))
		Score = 2;
	if ((maibo < 70) && (maibo >= 55))
		Score = 2;
	if ((maibo < 55) && (maibo >= 40))
		Score = 3;
	return Score
}

//获取平均血压评分
function getXueyaScore(xueya) {
	//根据平均血压判断 得分 ≥160(4分);159-130(3分);129-110(2分);109-70(0分);69-50(2分);≤49(4分)
	var xueya = parseFloat(xueya);
	var Score = 0;
	if ((xueya >= 160) || (xueya <= 49))
		Score = 4;
	if ((xueya < 160) && (xueya >= 130))
		Score = 3;
	if ((xueya < 130) && (xueya >= 110))
		Score = 2;
	if ((xueya < 70) && (xueya >= 50))
		Score = 2;
	return Score
}

//获取spo2评分
function getSpo2Score(spo2) {
	//根据spo2判断 得分 ＞89(0分);89-86(1分);＜75(4分)
	var spo2 = parseInt(spo2);
	var Score = 0;
	if (spo2 < 75)
		Score = 4;
	if ((spo2 < 90) && (spo2 >= 86))
		Score = 1;
	return Score
}
