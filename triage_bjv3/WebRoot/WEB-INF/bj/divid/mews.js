function initMews(){
	$("#mews_a li").bind("click",function(){ 
		var sel_score = $(this).text();
		sel_score = sel_score.substring(sel_score.length-3,sel_score.length-2);
		//如果是结论 那行 只能单选
		var id = $(this).attr("id");
		var isRadio = false;
		id = id.substring(0,id.length-1);
		if(id=="m-a-7-"){
			isRadio = true;
		}
		if($(this).is('.active')){
			$(this).removeClass('active');
			var mews_score_A = $(".mews_score_A").text();
			$(".mews_score_A").text(parseInt(mews_score_A)-parseInt(5));
		}else{
			
			
			var old = $("li[id^='m-a-7-'][class*='active']"); 
			if(isRadio){
				$(this).siblings().removeClass('active');
				if(old.length==0){
					var mews_score_A = $(".mews_score_A").text();
					$(".mews_score_A").text(parseInt(mews_score_A)+parseInt(5));
				}
			}else{
				var mews_score_A = $(".mews_score_A").text();
				$(".mews_score_A").text(parseInt(mews_score_A)+parseInt(5));
			}
			$(this).addClass('active');
		}
//		getMewsScore();
	});
	
	
	$("#mews_c li").bind("click",function(){ 
		var sel_score = $(this).text();
		sel_score = sel_score.substring(sel_score.length-3,sel_score.length-2);
		if($(this).is('.active')){
			$(this).removeClass('active');
			var mews_yishi_score = $("#mews_yishi_score").text();
			 $("#mews_yishi_score").text(parseInt(mews_yishi_score)-parseInt(sel_score));
		}else{
			var old_score = $(this).siblings('.active').text();
			if((old_score!=null)||(old_score!="")){
				old_score = old_score.substring(old_score.length-3,old_score.length-2);
				sel_score = sel_score - old_score;
			}
			$(this).addClass('active').siblings().removeClass('active');
			var mews_yishi_score = $("#mews_yishi_score").text();
			mews_yishi_score_New= parseInt(mews_yishi_score)+parseInt(sel_score);
			$("#mews_yishi_score").text(mews_yishi_score_New);
		}
//		getMewsScore();
	});
	
	
	
	$("#mews_b li").bind("click",function(){ 
		var sel_score = $(this).text();
		sel_score = sel_score.substring(sel_score.length-3,sel_score.length-2);
		if($(this).is('.active')){
			$(this).removeClass('active');
			var mews_score_B = $(".mews_score_B").text();
			//alert(sel_score);
			$(".mews_score_B").text(parseInt(mews_score_B)-parseInt(sel_score));
		}else{
			var old_score = $(this).siblings('.active').text();
			if((old_score!=null)||(old_score!="")){
				old_score = old_score.substring(old_score.length-3,old_score.length-2);
				sel_score = sel_score - old_score;
			}
			$(this).addClass('active').siblings().removeClass('active');
			var mews_score_B = $(".mews_score_B").text();
			mews_score_B_New= parseInt(mews_score_B)+parseInt(sel_score);
			$(".mews_score_B").text(mews_score_B_New);
		}
		
	});
	
	getMewsScore();
	
}

//计算总分
function getMewsScore(){

	//获取MEWS 积分
	var huxi = $("#huxi").val();
	var tiwen = $("#tiwen").val();
	var maibo = $("#maibo").val();
	var ssy = $("#shousuoya").val();
	
	var spo2 = $("#spo2").val();
	var pain_Score = $("#Pain_Score").text();
	if(pain_Score=="0"){
		pain_Score ="";
	}
	
	$("#mews_maibo").html(maibo);
	$("#mews_ssy").html(ssy);
	$("#mews_huxi").html(huxi);
	$("#mews_tiwen").html(tiwen);
	$("#mews_spo2").html(spo2);
	$("#mews_pain_score").html(pain_Score);
	
	
	
	var score_tiwen = getMewsTiwenScore(tiwen);
	var score_xueya = getMewsXueyaScore(ssy);
	var score_maibo = getMewsMaiboScore(maibo);
	var score_huxi = getMewsHuxiScore(huxi);
	var score_yishi = parseInt($("#mews_yishi_score").text());
	
	$("#mews_tiwen_score").html(score_tiwen);
	$("#mews_xueya_score").html(score_xueya);
	$("#mews_maibo_score").html(score_maibo);
	$("#mews_huxi_score").html(score_huxi);
	var mews_score_C = score_tiwen + score_xueya + score_maibo + score_huxi + score_yishi;
//	alert(mews_score_C);
	$(".mews_score_C").text(mews_score_C);

}


//选择完Mews后显示到页面
function showMews(isload){
	var grade = 4;
	var mews_score_A = $(".mews_score_A").text();
	var mews_score_B = $(".mews_score_B").text();
	var mews_score_C = $(".mews_score_C").text();
	$("#mews_a").find('li[class="active"]').each(function(){
		var name = $(this).attr("name");
		if(name=="rent1")
       	{
			if(grade > 1){
				grade = 1;
			}
       	}else if(name=="rent2")
  		{
       		if(grade > 2){
       			grade = 2;
       		}
  		}else if(name=="rent3")
  		{
       		if(grade > 3){
       			grade = 3;
       		}
  		}else if(name=="rent4")
  		{
       		grade = 4;
  		}
		
	});
	//计算 Ti
	mews_score_B = parseInt(mews_score_B);
	if(mews_score_B>=17) {
		if(grade > 1){
			grade = 1;
		}
    }else if(mews_score_B>=10 && mews_score_B<=16) {
    	if(grade > 2){
   			grade = 2;
   		}
    }else if(mews_score_B>=3 && mews_score_B<=9) {
    	if(grade > 3){
   			grade = 3;
   		}
    }else if(mews_score_B<3) {
    	if(grade >=4){
    		grade = 4;
    	}
    }
	
	mews_score_C = parseInt(mews_score_C);
	 //计算 mews
    if(mews_score_C>=9 ) {
    	if(grade > 1){
			grade = 1;
		}
    }else if((mews_score_C<9)&&(mews_score_C>=5)) {
    	if(grade > 2){
   			grade = 2;
   		}
    }else if((mews_score_C<5)&&(mews_score_C>0)) {
    	if(grade > 3){
   			grade = 3;
   		}
    }else{
    	if(grade >=4){
    		grade = 4;
    	}
    }
	grade = "100"+grade;
    $("#mewsgrade").val(grade);
	var MEWS_Score = parseInt(mews_score_A)+parseInt(mews_score_B)+ parseInt(mews_score_C);
	//赋值
	mews_score = MEWS_Score;
	mews_ids ="";
	$("#mews_a").find('li[class="active"]').each(function(){
		mews_ids += $(this).attr("id")+",";
	});
	$("#mews_b").find('li[class="active"]').each(function(){
		mews_ids += $(this).attr("id")+",";
	});
	$("#mews_c").find('li[class="active"]').each(function(){
		mews_ids += $(this).attr("id")+",";
	});
	if(mews_ids !=""){
		mews_ids = mews_ids.substring(0,mews_ids.length-1);
	}
	var str = '';
	str+='<p class="allocatTitle">';
	str+='<span>急诊预检分级分诊指标评估表</span>';
	str+='</p>';
	str+='<p class="allocatNum" id ="MEWSNum">'+MEWS_Score+'</p>';
	str+='<p class="allocatUnit">分</p>';
	$("#mews").removeClass("setItem").css({"line-height":"initial"}).removeClass("st-padding").removeClass("st-mark-c").addClass("st-mark-i");
	$("#mews").html(str);
	//评分依据增加内容
	$("#mewspf").html('');
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"mews_x\" onclick=\"clearMEWS()\">×</button>";
	str1+= "急诊预检分级分诊指标评估表评分:"+MEWS_Score+"分";
    str1+= "</div>";
    $("#mewspf").html(str1);
    
    if(!isload){
    	//获取所有评分表里等级最高的
    	grade = getHigestGrade();
    	//展示自动评级
    	showAutoGrade(grade);
    }
}



//清除MEWS评分
function clearMEWS(){
	$("#mews_a li").removeClass('active');
	$("#mews_b li").removeClass('active');
	$("#mews_c li").removeClass('active');
	$(".mews_score_A").text("0");
	$(".mews_score_B").text("0");
	$("#mewsgrade").val("");
	getMewsScore();
	
	$("#mewsgrade").val("");
	if($("#jzann .changeName").text().trim() == "非急诊"){
		$("#mews").attr("class","st-mark st-mark-i setItem");
	}else{
		$("#mews").attr("class","st-mark st-mark-c setItem");
	}
	$("#mews").css("line-height",$("#mews").css("height"));
	$("#mews").html("<div class='st-icon p-top-pg' style='cursor:pointer;line-height: 1.6;'><span class='setIcon iconT'></span>急诊预检分级分诊指标评估表</div>");
	$("#mewspf").html('');
	
	mews_score = "";
	mews_ids ="";
	
	//是唯一评级 清空 自动评级 否则 按其他评级结果显示
	if(checkalone("mewsgrade")){
		if($("#finalgrade").val()==""){
			$("#grade").html("");
		}
		showRct('');
		$("#atuogradearea").html("");
		$("#atuogradearea").html("<div class='st-grade' style='height:64px'></div>");
	}else{
		//获取所有评分表里等级最高的
	    grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}
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