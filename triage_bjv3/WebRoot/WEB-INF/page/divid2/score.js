function initPf(){

	//ETDS评分
	$("#age,#huxi,#tiwen,#maibo,#shuzhangya,#shousuoya,#spo2").bind("input propertychange", function(){  
		if(document.getElementById("edts_x")){
			getTotalScore();  
		}
	});

	
	
	$("#pf_b li").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
			var totalScore = $(".totalScore").text();
			$(".totalScore").text(parseInt(totalScore)-parseInt(5));
			var Score_B = $(".Score_B").text();
			$(".Score_B").text(parseInt(Score_B)-parseInt(5));
		}else{
			$(this).addClass('active');
			var totalScore = $(".totalScore").text();
			$(".totalScore").text(parseInt(totalScore)+parseInt(5));
			var Score_B = $(".Score_B").text();
			$(".Score_B").text(parseInt(Score_B)+parseInt(5));
		}
		getTotalScore();
	});
	
	$("#pf_c li").bind("click",function(){ 
		var sel_score = $(this).text();
		sel_score = sel_score.substring(sel_score.length-3,sel_score.length-2);
		if($(this).is('.active')){
			$(this).removeClass('active');
			var totalScore = $(".totalScore").text();
			var Score_C_Old = $(".Score_C").text();
			Score_C_New = parseInt(Score_C_Old) + parseInt(sel_score);
			$(".Score_C").text(Score_C_New);
			$(".totalScore").text(parseInt(totalScore)-Score_C_Old + Score_C_New);
		}else{
			var old_score = $(this).siblings('.active').text();
			if((old_score!=null)||(old_score!="")){
				old_score = old_score.substring(old_score.length-3,old_score.length-2);
				sel_score = sel_score - old_score;
			}
			$(this).addClass('active').siblings().removeClass('active');
			var totalScore = $(".totalScore").text();
			var Score_C_Old = $(".Score_C").text();
			Score_C_New= parseInt(Score_C_Old)-parseInt(sel_score);
			$(".Score_C").text(Score_C_New);
			$(".totalScore").text(parseInt(totalScore)-Score_C_Old + Score_C_New);
		}
		getTotalScore();
	});
	
	
}





//计算总分
function getTotalScore(){
	
	//如果没有etds评过分及页面不存在etds评分结果
	if(!$("#last_score_div").length>0){
		var html = $("#symptom").html();
		var str = "<div class=\"alert alert-dismissable\" id=\"last_score_div\">";
		str+= "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearGrade(this);\" id=\"edts_x\">×</button>";
		str+= "急性病理生理状态总积分  = <span id=\"last_score\">0</span>";
	    str+= "</div>";
	    html = html +str;
	    $("#symptom").html(html);
	}
	
	
	var Score_C = $(".Score_C").text();
	var Score_B = $(".Score_B").text();
	//获取A积分
	var age = 0 ;
	if(!$("#bornday").val()==""){
		
		var strBirthdayArr=$("#bornday").val().split("-");
		var birthYear = strBirthdayArr[0];
    
		d = new Date();
		var nowYear = d.getFullYear();
		var ageDiff = nowYear - birthYear ; //年之差
		age =parseInt(ageDiff);
	}
	var Score_A = getScore_A(age);
	$(".Score_A").text(Score_A);
	
	//获取D积分
	var huxi = $("#huxi").val();
	var tiwen = $("#tiwen").val();
	var maibo = $("#maibo").val();
	var szy = $("#shuzhangya").val();
	var ssy = $("#shousuoya").val();
	//计算平均血压
	var xueya = (parseFloat(szy)+parseFloat(ssy))/2;
	var spo2 = $("#spo2").val();
	
	var score_tiwen = getTiwenScore(tiwen);
	var score_xueya = getXueyaScore(xueya);
	var score_maibo = getMaiboScore(maibo);
	var score_huxi = getHuxiScore(huxi);
	var score_spo2 = getSpo2Score(spo2);
	
	$("#score_tiwen").html(score_tiwen);
	$("#score_xueya").html(score_xueya);
	$("#score_maibo").html(score_maibo);
	$("#score_huxi").html(score_huxi);
	$("#score_spo2").html(score_spo2);
	
	
	var Score_D = score_tiwen + score_xueya + score_maibo + score_huxi + score_spo2;
	$(".Score_D").text(Score_D);
	$(".totalScore").text(parseInt(Score_A)+parseInt(Score_C)+ parseInt(Score_D)+parseInt(Score_B));
	$("#last_score").text($(".totalScore").text());
	var grade;
	if($(".totalScore").text()>=28){
		grade = "1001";
	}else if(($(".totalScore").text()>=19)&&$(".totalScore").text()<28){
		grade = "1002";
	}else if($(".totalScore").text()>=13&&$(".totalScore").text()<19){
		grade = "1003";
	}else{
		grade = "1004";
	}
	var old = $("#autograde").val();
    if(old==""||old>grade||!document.getElementById("mews_x")){
    	$("#autograde").val(grade);
    	 var g = grade.substring(grade.length-1,grade.length);
		    var grade_css = 'btn-'+g+'-selected';
		    for(var i=1;i<6;i++){
				if(g!=i){
					$("#g1[value =\""+"100"+i+"\"]").removeClass("btn-"+i).removeClass("btn-"+i+"-selected").addClass("unused-btn");
				}else{
					$("#g1[value =\""+"100"+i+"\"]").removeClass("unused-btn");
			    	$("#g1[value =\""+"100"+i+"\"]").addClass("btn-"+i);
			    	$("#g1[value =\""+"100"+i+"\"]").addClass(grade_css);
				}
			}
    }
	
}

//获取年龄评分
function getScore_A(age){
	//根据年龄判断A积分 ≤44:0分;45-54:2分;55-64:3分;≥65:5分
	var Score_A = 0 ;
	if(age>= 65) Score_A = 5;
	if((age< 65)&&(age>= 55)) Score_A = 3;
	if((age< 55)&&(age>= 45)) Score_A = 2;
	return Score_A;
}

//获取呼吸评分
function getHuxiScore(huxi){
	//根据呼吸判断 得分 ≥50(4分);49-35(3分);34-25(1分);24-12(0分);11-10(1分);9-6(2分);≤5(4分)
	var huxi = parseInt(huxi);
	var Score= 0 ;
	if((huxi>= 50)||(huxi<=5)) Score = 4;
	if((huxi< 49)&&(huxi>= 35)) Score = 3;
	if((huxi< 35)&&(huxi>= 25)) Score = 2;
	if((huxi< 12)&&(huxi>= 10)) Score = 1;
	if((huxi< 10)&&(huxi>= 6)) Score = 2;
	return Score
}

//获取体温评分
function getTiwenScore(tiwen){
	//根据体温判断 得分≥41(4分);40.9-39(3分);38.9-38.5(1分);38.4-36(0分);35.9-34(1分);33.9-32(2分);31.9-30(3分);≤29.9(4分)
	var tiwen = parseFloat(tiwen);
	
	var Score= 0 ;
	if((tiwen>= 41)||(tiwen<=29.9)) Score = 4;
	if((tiwen< 41)&&(tiwen>= 39)) Score = 3;
	if((tiwen< 39)&&(tiwen>= 38.5)) Score = 1;
	if((tiwen< 36)&&(tiwen>= 34)) Score = 1;
	if((tiwen< 34)&&(tiwen>= 32)) Score = 2;
	if((tiwen< 32)&&(tiwen>= 30)) Score = 3;
	return Score
}

//获取心率评分
function getMaiboScore(maibo){
	//根据心率判断 得分 ≥180(4分);179-140(3分);139-110(2分);109-70(0分);69-55(2分);54-40(3分);≤39(4分)
	var maibo = parseInt(maibo);
	var Score= 0 ;
	if((maibo>= 180)||(maibo<=39)) Score = 4;
	if((maibo< 180)&&(maibo>= 140)) Score = 3;
	if((maibo< 140)&&(maibo>= 110)) Score = 2;
	if((maibo< 70)&&(maibo>= 55)) Score = 2;
	if((maibo< 55)&&(maibo>= 40)) Score = 3;
	return Score
}

//获取平均血压评分
function getXueyaScore(xueya){
	//根据平均血压判断 得分 ≥160(4分);159-130(3分);129-110(2分);109-70(0分);69-50(2分);≤49(4分)
	var xueya = parseFloat(xueya);
	var Score= 0 ;
	if((xueya>= 160)||(xueya<=49)) Score = 4;
	if((xueya< 160)&&(xueya>= 130)) Score = 3;
	if((xueya< 130)&&(xueya>= 110)) Score = 2;
	if((xueya< 70)&&(xueya>= 50)) Score = 2;
	return Score
}

//获取spo2评分
function getSpo2Score(spo2){
	//根据spo2判断 得分 ＞89(0分);89-86(1分);＜75(4分)
	var spo2 = parseInt(spo2);
	var Score= 0 ;
	if(spo2<75) Score = 4;
	if((spo2< 90)&&(spo2>= 86)) Score = 1;
	return Score
}
