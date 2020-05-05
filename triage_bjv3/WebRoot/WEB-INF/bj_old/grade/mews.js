/*
 * 急诊预检分级分诊指标评估表 （mews）
 */

function initMews(){
	//第一个评分表mews_a的事件
	$("input[type='checkbox']").bind("click",function(){ 
	
		if($(this).is(':checked')){
			var mews_score_A = $(".mews_score_A").text();
			$(".mews_score_A").text(parseInt(mews_score_A) + parseInt(5));
		}else{
			var mews_score_A = $(".mews_score_A").text();
			$(".mews_score_A").text(parseInt(mews_score_A) - parseInt(5));
		}
		//getMewsScore();
		//普通点击评级
		if(!isload){
			showMews();
		}
	});
	
	//mews_a_a的逻辑
	$("#mews_a_a input[type='radio']").bind("click",function(){ 
		var radio = $(this);
	
		//判断当前同行是不是有选中的 因为check 属性 变化在 click之前 所以 依旧利用 active 样式来 判断
		//如果 有取中 就 
		var group_name = radio.attr('name');
		var id = radio.attr('id');
		var n = 0 ;
		$("input[name='"+group_name+"']").each(function(){
			if($(this).is('.active')){
				$(this).removeClass('active');
				if($(this).attr('id')==id){
					n = 1;
				}else{
					n = 2;
				}
			}
		 });
		switch(n)
		{
			case 1:
				var mews_score_A = $(".mews_score_A").text();
				$(".mews_score_A").text(parseInt(mews_score_A) - parseInt(5));
				radio.prop('checked', false); 
				//form.render();
				break;
			case 2:
				radio.addClass('active');
				break;
			default:
				var mews_score_A = $(".mews_score_A").text();
				$(".mews_score_A").text(parseInt(mews_score_A) + parseInt(5));
				radio.addClass('active');
		}
		//getMewsScore();
		//普通点击评级
		if(!isload){
			showMews();
		}
	});
	
	
	//mews_c的逻辑
	$("#mews_c input[type='radio']").bind("click",function(){ 
		var radio = $(this);
		
		var sel_score = 0;
		sel_score =  Math.abs(5-getcol(radio));
		//判断当前同行是不是有选中的 因为check 属性 变化在 click之前 所以 依旧利用 active 样式来 判断
		//如果 有取中 就 
		var group_name = radio.attr('name');
		var id = radio.attr('id');
		var n = 0 ;
		$("input[name='"+group_name+"']").each(function(){
			if($(this).is('.active')){
				$(this).removeClass('active');
				if($(this).attr('id')==id){
					n = 1;
				}else{
					n = 2;
					old_score =  Math.abs(5-getcol($(this)));
				}
			}
		 });
		switch(n)
		{
			case 1:
				var mews_score_C_old = $(".mews_score_C").text();
				var mews_score_C_new = parseInt(mews_score_C_old) - parseInt(sel_score);
				$(".mews_score_C").text(mews_score_C_new);
				radio.prop('checked', false); 
				//form.render();
				break;
			case 2:
				sel_score = sel_score - old_score;
				var mews_score_C_old = $(".mews_score_C").text();
				var mews_score_C_new= parseInt(mews_score_C_old) + parseInt(sel_score);
				$(".mews_score_C").text(mews_score_C_new);
				radio.addClass('active');
				break;
			default:
				var mews_score_C_old = $(".mews_score_C").text();
				var mews_score_C_new = parseInt(mews_score_C_old) + parseInt(sel_score);
				$(".mews_score_C").text(mews_score_C_new);
				radio.addClass('active');
		}
		//getMewsScore();
		//普通点击评级
		if(!isload){
			showMews();
		}
	});
	
	//mews_b的逻辑
	$("#mews_b input[type='radio']").bind("click",function(){ 
		var radio = $(this);
		
		var sel_score = 0;
		var new_col = getcol(radio);
		if(new_col == 2){
			sel_score = 1 ;
		}
		if(new_col == 3){
			sel_score = 3 ;
		}
		if(new_col == 4){
			sel_score = 5 ;
		}
		if(new_col == 5){
			sel_score = 6 ;
		}
		//判断当前同行是不是有选中的 因为check 属性 变化在 click之前 所以 依旧利用 active 样式来 判断
		//如果 有取中 就 
		var group_name = radio.attr('name');
		var id = radio.attr('id');
		var n = 0 ;
		$("input[name='"+group_name+"']").each(function(){
			if($(this).is('.active')){
				$(this).removeClass('active');
				if($(this).attr('id')==id){
					n = 1;
				}else{
					n = 2;
					var old_col = getcol($(this));
					if(old_col == 2){
						old_score = 1 ;
					}
					if(old_col == 3){
						old_score = 3 ;
					}
					if(old_col == 4){
						old_score = 5 ;
					}
					if(old_col == 5){
						old_score = 6 ;
					}
				}
			}
		 });
		switch(n)
		{
			case 1:
				var mews_score_B_old = $(".mews_score_B").text();
				var mews_score_B_new = parseInt(mews_score_B_old) - parseInt(sel_score);
				$(".mews_score_B").text(mews_score_B_new);
				radio.prop('checked', false); 
				//form.render();
				break;
			case 2:
				sel_score = sel_score - old_score;
				var mews_score_B_old = $(".mews_score_B").text();
				var mews_score_B_new= parseInt(mews_score_B_old) + parseInt(sel_score);
				$(".mews_score_B").text(mews_score_B_new);
				radio.addClass('active');
				break;
			default:
				var mews_score_B_old = $(".mews_score_B").text();
				var mews_score_B_new = parseInt(mews_score_B_old) + parseInt(sel_score);
				$(".mews_score_B").text(mews_score_B_new);
				radio.addClass('active');
		}
		//getEdtsScore();
		if(!isload){
			showMews();
		}
	});
	
	
	
	initMewsC();
	
	
	
	
	/*
	
	
	$("#mews_a li").bind("click",function(){ 
		var sel_score = $(this).text();
		sel_score = sel_score.substring(sel_score.length-3,sel_score.length-2);
		//如果是结论 那行 只能单选 即 m-a-7-* 项 单选
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
		getMewsScore();
		//普通点击评级
		if(!isload){
			showMews();
		}
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
		getMewsScore();
		//普通点击评级
		if(!isload){
			showMews();
		}
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
		getMewsScore();
		//普通点击评级
		if(!isload){
			showMews();
		}
	});
	*/
}

//计算总分
function getMewsScore(){


}


//选择完Mews后显示到页面
function showMews(){
	var grade = 4;
	var mews_score_A = $(".mews_score_A").text();
	var mews_score_B = $(".mews_score_B").text();
	var mews_score_C = $(".mews_score_C").text();
	//总分
	var MEWS_Score = parseInt(mews_score_A)+parseInt(mews_score_B)+ parseInt(mews_score_C);
	$("#mews_a").find('input[type="checkbox"]:checked').each(function(){
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
	//计算初级判断
	$("#mews_a_a").find('input[type="radio"]:checked').each(function(){
		var id = $(this).attr("id");
		if(id=="m-a-7-1")
       	{
			if(grade > 1){
				grade = 1;
			}
       	}else if(id=="m-a-7-2")
  		{
       		if(grade > 2){
       			grade = 2;
       		}
  		}else if(id=="m-a-7-3")
  		{
       		if(grade > 3){
       			grade = 3;
       		}
  		}else 
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
	mewsgrade = grade;
	
	//赋值
	mews_score = MEWS_Score;
	mews_ids ="";
	$("#mews_a").find('input[type="checkbox"]:checked').each(function(){
		mews_ids += $(this).attr("id")+",";
	});
	$("#mews_a_a").find('input[type="radio"]:checked').each(function(){
		mews_ids += $(this).attr("id")+",";
	});
	$("#mews_b").find('input[type="radio"]:checked').each(function(){
		mews_ids += $(this).attr("id")+",";
	});
	$("#mews_c").find('input[type="radio"]:checked').each(function(){
		mews_ids += $(this).attr("id")+",";
	});
	if(mews_ids !=""){
		mews_ids = mews_ids.substring(0,mews_ids.length-1);
	}else{
		clearMEWS();
		return;
	}
	//评分依据增加内容
	$("#mewspf").html('');
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1 += "<button type=\"button\" class=\"alert-close close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"mews_x\" onclick=\"clearMEWS()\">×</button>";
	str1 += "急诊预检分级分诊指标评估表评分:"+MEWS_Score+"分";
	str1 += getGradeBtn(grade);
    str1 += "</div>";
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
	reSetMews();
	//获取所有评分表里等级最高的
	grade = getHigestGrade();
	//展示自动评级
	showAutoGrade(grade);
}

//清空 mews 选中项
function reSetMews(){
	$("#mews_a input").removeClass('active');
	$("#mews_a input").prop('checked', false);
	$("#mews_a_a input").removeClass('active');
	$("#mews_a_a input").prop('checked', false);
	$("#mews_b input").removeClass('active');
	$("#mews_b input").prop('checked', false);
	$("#mews_c input").removeClass('active');
	$("#mews_c input").prop('checked', false);
	$(".mews_score_A").text("0");
	$(".mews_score_B").text("0");
	$(".mews_score_C").text("0");
	$("#mews_maibo").html("");
	$("#mews_ssy").html("");
	$("#mews_huxi").html("");
	$("#mews_tiwen").html("");
	$("#mews_spo2").html("");
	$("#mews_pain_score").html("");
	$("#mewspf").html('');
	
	mewsgrade = "";
	mews_score = "";
	mews_ids ="";
}

//重置状态 
function reSetMews1(){
	$("#mews_a li").removeClass('active');
	$("#mews_b li").removeClass('active');
	$("#mews_c li").removeClass('active');
	$(".mews_score_A").text("0");
	$(".mews_score_B").text("0");
	$("#mews_yishi_score").text("0");
	if (mews_ids.length > 0) {
		var symptom_ids = mews_ids.split(",");
		for (var j = 0, len = symptom_ids.length; j < len; j++) {
			var symptom_id = symptom_ids[j];
			// alert(symptom_id);
			$("#" + symptom_id).trigger("click");
		}
	}
}


function loadMews(){
	if (mews_ids.length > 0) {
		var symptom_ids = mews_ids.split(",");
		for (var j = 0, len = symptom_ids.length; j < len; j++) {
			var symptom_id = symptom_ids[j];
			$("#" + symptom_id).trigger("click");
		}
	}else{
		getMewsScore();
	}
	//执行一次 
	showMews();
}


function initMewsC() {

	// 获取D积分
	// 新增就读取最新的 修改 就读取 后台推送的
	/*
	 * if (handleid == '') { hx = $("#huxi").val(); tw = $("#tiwen").val(); mb =
	 * $("#maibo").val(); ssy = $("#shousuoya").val(); szy =
	 * $("#shuzhangya").val(); spo2 = $("#spo2").val(); }
	 */
	// 获取疼痛 积分
	var pain_Score = $("#Pain_Score").text();
	if (pain_Score == "0") {
		pain_Score = "";
	}
	$("#mews_maibo").html(mb);
	$("#mews_ssy").html(ssy);
	$("#mews_huxi").html(hx);
	$("#mews_tiwen").html(tw);
	$("#mews_spo2").html(spo2);
	var score_tiwen = 0;
	var score_xueya = 0;
	var score_maibo = 0;
	var score_huxi = 0;
	if (!typeof (tw) === "undefined") {
		score_tiwen = getMewsTiwenScore(tw);
	}
	if (!typeof (ssy) === "undefined") {
		score_xueya = getMewsXueyaScore(ssy);
	}
	if (!typeof (mb) === "undefined") {
		score_maibo = getMewsMaiboScore(mb);
	}
	if (!typeof (hx) === "undefined") {
		score_huxi = getMewsHuxiScore(hx);
	}
	mews_score_C = parseInt(score_tiwen) + parseInt(score_xueya)
			+ parseInt(score_maibo) + parseInt(score_huxi);

	$(".mews_score_C").text(mews_score_C);
}
//获取呼吸评分
function getMewsHuxiScore(huxi){
	//根据呼吸判断 得分 ≥30(3分);29-21(2分);20-15(1分);14-9(0分);＜9(2分)
	var huxi = parseInt(huxi);
	var Score= 0 ;
	var id = "m-c-3-4";
	if(huxi>= 30){
		id = "m-c-3-1";
		Score = 3;
	}
	if((huxi<=29)&&(huxi>= 21)){
		id = "m-c-3-2";
		Score = 2;
	}
	if((huxi<=20)&&(huxi>= 15)){
		id = "m-c-3-1";
		Score = 1;
	}
	if(huxi< 9) {
		id = "m-c-3-5";
		Score = 2;
	}
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

//获取体温评分
function getMewsTiwenScore(tiwen){
	//根据体温判断 得分≥38.5(2分);38.4-35.0(0分);＜35(2分)
	var tiwen = parseFloat(tiwen);
	var Score= 0 ;
	var id = "m-c-4-2";
	if(tiwen>= 38.5){
		id = "m-c-4-1";
		Score = 2;
	}
	if(tiwen<35){
		id = "m-c-4-3";
		Score = 2;
	}
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

//获取心率评分
function getMewsMaiboScore(maibo){
	//根据心率判断 得分 ≥130(3分);111-129(2分);101-110(1分);51-100(0分);41-50(1分);≤40(2分)
	var maibo = parseInt(maibo);
	var Score= 0 ;
	var id = "m-c-1-4";
	if(maibo>= 130) {
		id = "m-c-1-1";
		Score = 3;
	}
	if((maibo< 129)&&(maibo>= 111)) {
		id = "m-c-1-2";
		Score = 2;
	}
	if((maibo< 111)&&(maibo>= 101)) {
		id = "m-c-1-3";
		Score = 1;
	}
	if((maibo< 51)&&(maibo>= 41)) {
		id = "m-c-1-5";
		Score = 1;
	}
	if(maibo <= 40) {
		id = "m-c-1-6";
		Score = 2;
	}
	
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

//获取血压评分
function getMewsXueyaScore(xueya){
	//根据平均血压判断 得分 ≥200(2分);199-101(0分);100-81(1分);80-71(2分);≤70(3分)
	var xueya = parseFloat(xueya);
	var id = "m-c-2-2";
	var Score= 0 ;
	if(xueya>= 200) {
		id = "m-c-2-1";
		Score = 2;
	}
	if((xueya< 101)&&(xueya>= 81)) {
		id = "m-c-2-3";
		Score = 1;
	}
	if((xueya< 81)&&(xueya>= 71)) {
		id = "m-c-2-4";
		Score = 2;
	}
	if(xueya <= 70 ) {
		id = "m-c-2-5";
		Score = 3;
	}
	
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

