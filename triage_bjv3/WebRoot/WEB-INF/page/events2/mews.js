function initMews(){
	$("#mews_a li").bind("click",function(){ 
		var sel_score = $(this).text();
		sel_score = sel_score.substring(sel_score.length-3,sel_score.length-2);
		if($(this).is('.active')){
			$(this).removeClass('active');
			var mews_score_A = $(".mews_score_A").text();
			$(".mews_score_A").text(parseInt(mews_score_A)-parseInt(5));
		}else{
			$(this).addClass('active');
			var mews_score_A = $(".mews_score_A").text();
			$(".mews_score_A").text(parseInt(mews_score_A)+parseInt(5));
		}
		getMewsScore();
	});
	
	$("#mews_b li").bind("click",function(){ 
		var sel_score = $(this).text();
		sel_score = sel_score.substring(sel_score.length-3,sel_score.length-2);
		if($(this).is('.active')){
			$(this).removeClass('active');
			var mews_score_B = $(".mews_score_B").text();
			$(".mews_score_B").text(parseInt(mews_score_B)-parseInt(sel_score));
		}else{
			$(this).addClass('active').siblings().removeClass('active');
			var mews_score_B = $(".mews_score_B").text();
			$(".mews_score_B").text(parseInt(mews_score_B)+parseInt(sel_score));
		}
		getMewsScore();
	});
	
	
	
}

//计算总分
function getMewsScore(){
	//如果没有MEWS评过分及页面不存在MEWS评分结果
	if(!$("#mews_score_div").length>0){
		var html = $("#symptom").html();
		var str = "<div class=\"alert alert-dismissable\" id=\"mews_score_div\">";
		str+= "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearGrade(this);\" id=\"mews_x\">×</button>";
		str+= "MEWS总积分 = <span id=\"mews_score\">0</span>";
	    str+= "</div>";
	    html = html +str;
	    $("#symptom").html(html);
	}

	//获取MEWS 积分
	var huxi = $("#huxi").val();
	var tiwen = $("#tiwen").val();
	var maibo = $("#maibo").val();
	var ssy = $("#shousuoya").val();
	
	var score_tiwen = getMewsTiwenScore(tiwen);
	var score_xueya = getMewsXueyaScore(ssy);
	var score_maibo = getMewsMaiboScore(maibo);
	var score_huxi = getMewsHuxiScore(huxi);
	
	
	$("#mews_tiwen").html(score_tiwen);
	$("#mews_xueya").html(score_xueya);
	$("#mews_maibo").html(score_maibo);
	$("#mews_huxi").html(score_huxi);
	
	var mews_score_C = score_tiwen + score_xueya + score_maibo + score_huxi;
	$(".mews_score_C").text(mews_score_C);
	
	var mews_score_A = $(".mews_score_A").text();
	var mews_score_B = $(".mews_score_B").text();
	
	
	$("#mews_score").text(parseInt(mews_score_A)+parseInt(mews_score_B)+ parseInt(mews_score_C));
}

//获取呼吸评分
function getMewsHuxiScore(huxi){
	//根据呼吸判断 得分 ≥30(3分);29-21(2分);20-15(1分);14-9(0分);＜9(2分)
	var huxi = parseInt(huxi);
	var Score= 0 ;
	if(huxi>= 30) Score = 3;
	if((huxi<=29)&&(huxi>= 21)) Score = 2;
	if((huxi<=20)&&(huxi>= 15)) Score = 1;
	if(huxi< 9) Score = 2;
	return Score
}

//获取体温评分
function getMewsTiwenScore(tiwen){
	//根据体温判断 得分≥38.5(2分);38.4-35.0(0分);＜35(2分)
	var tiwen = parseFloat(tiwen);
	var Score= 0 ;
	if((tiwen>= 38.5)||(tiwen<35)) Score = 2;
	return Score
}

//获取心率评分
function getMewsMaiboScore(maibo){
	//根据心率判断 得分 ≥130(3分);111-129(2分);101-110(1分);51-100(0分);41-50(1分);≤40(2分)
	var maibo = parseInt(maibo);
	var Score= 0 ;
	if(maibo>= 130) Score = 3;
	if((maibo< 129)&&(maibo>= 111)) Score = 2;
	if((maibo< 111)&&(maibo>= 101)) Score = 1;
	if((maibo< 51)&&(maibo>= 41)) Score = 1;
	if(maibo <= 40) Score = 2;
	return Score
}

//获取血压评分
function getMewsXueyaScore(xueya){
	//根据平均血压判断 得分 ≥200(2分);199-101(0分);100-81(1分);80-71(2分);≤70(3分)
	var xueya = parseFloat(xueya);
	var Score= 0 ;
	if(xueya>= 200) Score = 2;
	if((xueya< 200)&&(xueya>= 101)) Score = 0;
	if((xueya< 101)&&(xueya>= 81)) Score = 1;
	if((xueya< 81)&&(xueya>= 71)) Score = 2;
	if(xueya <= 70 ) Score = 3;
	return Score
}

//获取spo2评分
function getMewsSpo2Score(spo2){
	//根据spo2判断 得分 ＞89(0分);89-86(1分);＜75(4分)
	var spo2 = parseInt(spo2);
	var Score= 0 ;
	if(spo2<75) Score = 4;
	if((spo2< 90)&&(spo2>= 86)) Score = 1;
	return Score
}