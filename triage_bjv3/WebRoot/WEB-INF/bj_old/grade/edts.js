/*
 * edts
 */

function initEdts(){
/*
	//ETDS评分
	$("#age,#huxi,#tiwen,#maibo,#shuzhangya,#shousuoya,#spo2").bind("input propertychange", function(){  
		if(document.getElementById("edts_x")){
			initEdtsD();
			getEdtsScore(); 
			if(!isload){
				showEdts();
			}
		}
	});
*/
	//年龄选中
	$("#pf_a input[type='radio']").bind("click",function(){ 
		var radio = $(this);
		var group_name = radio.attr('name');
		var id = radio.attr('id');
		var sel_score = 0;//计算了选中的分值
		if(id == "e-a-1-2"){
			sel_score = 2 ;
		}
		if(id == "e-a-1-3"){
			sel_score = 3 ;
		}
		if(id == "e-a-1-4"){
			sel_score = 5 ;
		}
		var old_score = 0;
		//判断当前同行是不是有选中的 因为check 属性 变化在 click之前 所以 依旧利用 active 样式来 判断
		//如果 有取中 就 
		
		var n = 0 ;
		$("input[name='"+group_name+"']").each(function(){
			if($(this).is('.active')){
				$(this).removeClass('active');
				if($(this).attr('id')==id){
					n = 1;
				}else{
					n = 2;
					if($(this).attr('id') == "e-a-1-2"){
						old_score = 2 ;
					}
					if($(this).attr('id') == "e-a-1-3"){
						old_score = 3 ;
					}
					if($(this).attr('id') == "e-a-1-4"){
						old_score = 5 ;
					}
				}
			}
		 });
		switch(n)
		{
			case 1:
				var totalScore = $(".totalScore").text();
				var Score_A_Old = $(".Score_A").text();
				Score_A_New = parseInt(Score_A_Old) - parseInt(sel_score);
				$(".Score_A").text(Score_A_New);
				$(".totalScore").text(parseInt(totalScore)-Score_A_Old + Score_A_New);
				radio.prop('checked', false); 
				break;
			case 2:
				sel_score = sel_score - old_score;
				var totalScore = $(".totalScore").text();
				var Score_A_Old = $(".Score_A").text();
				Score_A_New= parseInt(Score_A_Old)+parseInt(sel_score);
				$(".Score_A").text(Score_A_New);
				$(".totalScore").text(parseInt(totalScore) - Score_A_Old + Score_A_New);
				radio.addClass('active');
				break;
			default:
				var totalScore = $(".totalScore").text();
				var Score_A_Old = $(".Score_A").text();
				Score_A_New = parseInt(Score_A_Old) + parseInt(sel_score);
				$(".Score_A").text(Score_A_New);
				$(".totalScore").text(parseInt(totalScore) - Score_A_Old + Score_A_New);
				radio.addClass('active');
		}
		getEdtsScore();
		if(!isload){
			showEdts();
		}
	});
	
	$("#pf_b td").bind("click",function(){
		$(this).find("input").trigger("click");
	});

			
	
	$("#pf_b input[type='checkbox']").bind("click",function(){
		//与li有区别 这里是 由选中 和不选中
		if($(this).is(':checked')){
			var totalScore = $(".totalScore").text();
			$(".totalScore").text(parseInt(totalScore)+parseInt(5));
			var Score_B = $(".Score_B").text();
			$(".Score_B").text(parseInt(Score_B)+parseInt(5));
		}else{
			var totalScore = $(".totalScore").text();
			$(".totalScore").text(parseInt(totalScore)-parseInt(5));
			var Score_B = $(".Score_B").text();
			$(".Score_B").text(parseInt(Score_B)-parseInt(5));
		}
		getEdtsScore();
		if(!isload){
			showEdts();
		}
	});
	
	//选择B级其他时显示输入框
	$("#e-b-8-3").bind("click",function(){
		if($(this).is(':checked')){
			$("#e-b-8-4").css('display','block');
		}else{
			$("#e-b-8-4").val('');
			$("#e-b-8-4").css('display','none');
		}
	});
	
	//烦的1B的逻辑
	$("#pf_c input[type='radio']").bind("click",function(){ 
		var radio = $(this);
		var sel_score = getcol(radio);
		sel_score = 8-sel_score;//计算了选中的分值
		var old_score = 0;
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
					old_score = 8 - getcol($(this));
				}
			}
		 });
		switch(n)
		{
			case 1:
				var totalScore = $(".totalScore").text();
				var Score_C_Old = $(".Score_C").text();
				Score_C_New = parseInt(Score_C_Old) + parseInt(sel_score);
				$(".Score_C").text(Score_C_New);
				$(".totalScore").text(parseInt(totalScore)-Score_C_Old + Score_C_New);
				radio.prop('checked', false); 
				//form.render();
				break;
			case 2:
				sel_score = sel_score - old_score;
				var totalScore = $(".totalScore").text();
				var Score_C_Old = $(".Score_C").text();
				Score_C_New= parseInt(Score_C_Old)-parseInt(sel_score);
				$(".Score_C").text(Score_C_New);
				$(".totalScore").text(parseInt(totalScore)-Score_C_Old + Score_C_New);
				radio.addClass('active');
				break;
			default:
				var totalScore = $(".totalScore").text();
				var Score_C_Old = $(".Score_C").text();
				Score_C_New = parseInt(Score_C_Old) - parseInt(sel_score);
				$(".Score_C").text(Score_C_New);
				$(".totalScore").text(parseInt(totalScore)-Score_C_Old + Score_C_New);
				radio.addClass('active');
		}
		getEdtsScore();
		if(!isload){
			showEdts();
		}
	});
	
	
	//体征选中
	$("#pf_d input[type='radio']").bind("click",function(){ 
		var radio = $(this);
		var sel_score = getcol(radio);
		sel_score = Math.abs(6-sel_score);//计算了选中的分值
		var old_score = 0;
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
					old_score = Math.abs(6 - getcol($(this)));
				}
			}
		 });
		switch(n)
		{
			case 1:
				var totalScore = $(".totalScore").text();
				var Score_D_Old = $(".Score_D").text();
				Score_D_New = parseInt(Score_D_Old) - parseInt(sel_score);
				$(".Score_D").text(Score_D_New);
				$(".totalScore").text(parseInt(totalScore)-Score_D_Old + Score_D_New);
				radio.prop('checked', false); 
				break;
			case 2:
				sel_score = sel_score - old_score;
				var totalScore = $(".totalScore").text();
				var Score_D_Old = $(".Score_D").text();
				Score_D_New= parseInt(Score_D_Old)+parseInt(sel_score);
				$(".Score_D").text(Score_D_New);
				$(".totalScore").text(parseInt(totalScore)-Score_D_Old + Score_D_New);
				radio.addClass('active');
				break;
			default:
				var totalScore = $(".totalScore").text();
				var Score_D_Old = $(".Score_D").text();
				Score_D_New = parseInt(Score_D_Old) + parseInt(sel_score);
				$(".Score_D").text(Score_D_New);
				$(".totalScore").text(parseInt(totalScore)-Score_D_Old + Score_D_New);
				radio.addClass('active');
		}
		getEdtsScore();
		if(!isload){
			showEdts();
		}
	});
	
	//第一次加载要 计算 传递过来的 数值
	//getScore_A();
	initEdtsD();
	//getEdtsScore();

}

//计算总分
function getEdtsScore(){
	
	
	//获取D积分
	var Score_A = $(".Score_A").text();
	var Score_B = $(".Score_B").text();
	var Score_C = $(".Score_C").text();
	var Score_D = $(".Score_D").text();
	
	
	$(".totalScore").text(parseInt(Score_A)+parseInt(Score_C)+ parseInt(Score_D)+parseInt(Score_B));

}

//选择完edts后显示到页面
function showEdts(){
	var grade;
	var totalScore = parseInt($(".totalScore").text());


	if(totalScore>=28){
		grade = "1001";
	}else if((totalScore>=19)&&(totalScore<28)){
		grade = "1002";
	}else if((totalScore>=13)&&(totalScore<19)){
		grade = "1003";
	}else{
		grade = "1004";
	}
	
	edtsgrade  = grade;
	var EDTS_Score = totalScore;
	//赋值
	edts_score = EDTS_Score;
	edts_ids ="";
	
	if($("#e-b-8-3").is(":checked")){
		edts_ids_qita = $("#e-b-8-4").val();
		edts_ids_qitastatus = true;
	}
	
	$("#pf_a").find('input[type="radio"]:checked').each(function(){
		edts_ids += $(this).attr("id")+",";
	});
	$("#pf_b").find('input[type="checkbox"]:checked').each(function(){
		edts_ids += $(this).attr("id")+",";
	});
	$("#pf_c").find('input[type="radio"]:checked').each(function(){
		edts_ids += $(this).attr("id")+",";
	});
	$("#pf_d").find('input[type="radio"]:checked').each(function(){
		edts_ids += $(this).attr("id")+",";
	});
	
	if(edts_ids !=""){
		edts_ids = edts_ids.substring(0,edts_ids.length-1);
	}else{
		// 自动 清空 edts评分
		clearEDTS();
		return;
	}
	
	//组织结束
	//评分依据增加内容
	$("#edtspf").html('');
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\" alert-close close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"edts_x\" onclick=\"clearEDTS()\">×</button>";
	str1+= "EDTS评分:"+EDTS_Score+"分";
	str1 += getGradeBtn(grade);
    str1+= "</div>";
    $("#edtspf").html(str1);
    
    if(!isload){
    	//获取所有评分表里等级最高的
    	grade = getHigestGrade();
    	//展示自动评级
    	showAutoGrade(grade);
    }
}



//清除edts评分
function clearEDTS(){
	reSetEdts();
	
	//获取所有评分表里等级最高的
	grade = getHigestGrade();
	//展示自动评级
	showAutoGrade(grade);
}

//清空 edts 相关评级选项
function reSetEdts(){
	$("#pf_a input").removeClass('active');
	$("#pf_a input").prop('checked', false); 
	$("#pf_b input").removeClass('active');
	$("#pf_b input").prop('checked', false); 
	$("#pf_c input").removeClass('active');
	$("#pf_c input").prop('checked', false); 
	$("#pf_d input").removeClass('active');
	$("#pf_d input").prop('checked', false); 
	$(".Score_A").text("0");
	$(".Score_B").text("0");
	$(".Score_C").text("15");
	$(".Score_D").text("0");
	$(".totalScore").text("0");
	
	
	$("#e-b-8-4").css('display','none');
	$("#e-b-8-4").val("");
	
	//清除相关 
	edtsgrade = "";
	edts_score = "";
	edts_ids = "";
	edts_ids_qitastatus = false;
	edts_ids_qita = "";

	$("#edtspf").html('');
}

//恢复状态 另一种 重置
function reSetEdts1(){
	$("#pf_b li").removeClass('active');
	$("#pf_c li").removeClass('active');
	$(".Score_B").text("0");
	$(".Score_C").text("15");
	
	if(edts_ids.length>0){
		var symptom_ids = edts_ids.split(",");
		for(var j = 0,len = symptom_ids.length; j < len; j++){
			var symptom_id = symptom_ids[j];
			$("#"+symptom_id).trigger("click");
		}
	}
	if(!edts_ids_qitastatus){
		$("#e-b-8-4").css('display','none');
		$("#e-b-8-4").find("input").val("");
	}else{
		$("#e-b-8-4").find("input").val(edts_ids_qita);
	}
}


function loadEdts(){
	if(edts_ids.length>0){
		var symptom_ids = edts_ids.split(",");
		for(var j = 0,len = symptom_ids.length; j < len; j++){
			var symptom_id = symptom_ids[j];
			$("#"+symptom_id).trigger("click");
		}
	
		if(!edts_ids_qitastatus){
			$("#e-b-8-4").css('display','none');
			$("#e-b-8-4").find("input").val("");
		}else{
			$("#e-b-8-4").find("input").val(edts_ids_qita);
		}
	}else{
		getEdtsScore();
	}
	//执行一次计算等级
	showEdts();
}

//获取年龄评分
function getScore_A(){
	
	//获取A积分
	var age = 0 ;
	//根据年龄判断A积分 ≤44:0分;45-54:2分;55-64:3分;≥65:5分
	if($("#bornday").lenth>0&&!$("#bornday").val()==""){
		
		var strBirthdayArr=$("#bornday").val().split("-");
		var birthYear = strBirthdayArr[0];
		d = new Date();
		var nowYear = d.getFullYear();
		var ageDiff = nowYear - birthYear ; //年之差
		age =parseInt(ageDiff);
	}
	var id = "e-a-1-1" ;
	var Score_A = 0 ;
	if(age>= 65) {
		id = "e-a-1-4" ;
		Score_A = 5;
	}
	if((age< 65)&&(age>= 55)) {
		id = "e-a-1-3" ;
		Score_A = 3;
	}
	if((age< 55)&&(age>= 45)) {
		id = "e-a-1-2" ;
		Score_A = 2;
	}

	$(".Score_A").text(Score_A);
	
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score_A;
}

//获取呼吸评分
function getHuxiScore(huxi){
	//根据呼吸判断 得分 ≥50(4分);49-35(3分);34-25(1分);24-12(0分);11-10(1分);9-6(2分);≤5(4分)
	var huxi = parseInt(huxi);
	var Score= 0 ;
	var id ="e-d-4-4";
	if((huxi>= 50)) {
		id ="e-d-4-1";
		Score = 4;
	}
	if((huxi< 49)&&(huxi>= 35)) {
		id ="e-d-4-2";
		Score = 3;
	}
	if((huxi< 35)&&(huxi>= 25)) {
		id ="e-d-4-3";
		Score = 1;
	}
	if((huxi< 12)&&(huxi>= 10)) {
		id ="e-d-4-5";
		Score = 1;
	}
	if((huxi< 10)&&(huxi>= 6)){
		id ="e-d-4-6";
		Score = 2;
	}
	if(huxi<=5){
		id ="e-d-4-7";
		Score = 4;
	}
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

//获取体温评分
function getTiwenScore(tiwen){
	//根据体温判断 得分≥41(4分);40.9-39(3分);38.9-38.5(1分);38.4-36(0分);35.9-34(1分);33.9-32(2分);31.9-30(3分);≤29.9(4分)
	var tiwen = parseFloat(tiwen);
	var id = "e-d-1-4" ;
	var Score= 0 ;
	if((tiwen>= 41)) {
		id = "e-d-1-1";
		Score = 4;
	}
	if((tiwen< 41)&&(tiwen>= 39)) {
		id = "e-d-1-2";
		Score = 3;
	}
	if((tiwen< 39)&&(tiwen>= 38.5)) {
		id = "e-d-1-3";
		Score = 1;
	}
	if((tiwen< 36)&&(tiwen>= 34)){
		id = "e-d-1-5";
		Score = 1;
	}
	if((tiwen< 34)&&(tiwen>= 32)) {
		id = "e-d-1-6";
		Score = 2;
	}
	if((tiwen< 32)&&(tiwen>= 30)) {
		id = "e-d-1-7";
		Score = 3;
	}
	
	if(tiwen<=29.9) {
		id = "e-d-1-8";
		Score = 3;
	}
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

//获取心率评分
function getMaiboScore(maibo){
	//根据心率判断 得分 ≥180(4分);179-140(3分);139-110(2分);109-70(0分);69-55(2分);54-40(3分);≤39(4分)
	var maibo = parseInt(maibo);
	var Score= 0 ;
	var id = "e-d-3-4";
	if((maibo>= 180)) {
		id = "e-d-3-1";
		Score = 4;
	}
	if((maibo< 180)&&(maibo>= 140)){
		id = "e-d-3-2";
		Score = 3;
	}
	if((maibo< 140)&&(maibo>= 110)) {
		id = "e-d-3-3";
		Score = 2;
	}
	if((maibo< 70)&&(maibo>= 55)) {
		id = "e-d-3-5";
		Score = 2;
	}
	if((maibo< 55)&&(maibo>= 40)) {
		id = "e-d-3-6";
		Score = 3;
	}
	if((maibo<=39)){
		id = "e-d-3-7";
		Score = 4;
	}
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

//获取平均血压评分
function getXueyaScore(xueya){
	//根据平均血压判断 得分 ≥160(4分);159-130(3分);129-110(2分);109-70(0分);69-50(2分);≤49(4分)
	var xueya = parseFloat(xueya);
	var Score= 0 ;
	var id = "e-d-2-4";
	
	if((xueya>= 160)){
		id = "e-d-2-1";
		Score = 4;
	}
	if((xueya< 160)&&(xueya>= 130)) {
		id = "e-d-2-2";
		Score = 3;
	}
	if((xueya< 130)&&(xueya>= 110)) {
		id = "e-d-2-3";
		Score = 2;
	}
	if((xueya< 70)&&(xueya>= 50)) {
		id = "e-d-2-5";
		Score = 2;
	}
	if(xueya<=49){
		id = "e-d-2-6";
		Score = 4;
	}
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

//获取spo2评分
function getSpo2Score(spo2){
	//根据spo2判断 得分 ＞89(0分);89-86(1分);＜75(4分)
	var spo2 = parseInt(spo2);
	var Score= 0 ;
	
	var id ="e-d-5-1";
	if(spo2<75){
		id ="e-d-5-3";
		Score = 4;
	}
	if((spo2< 90)&&(spo2>= 86)) {
		id ="e-d-5-2";
		Score = 1;
	}
	
	$("#"+id).prop('checked', 'checked');
	$("#"+id).addClass("active");
	return Score;
}

function initEdtsD(){
	//新增就读取最新的 修改 就读取 后台推送的
	if (handleid == '') {
		hx = $("#huxi").val();
		tw = $("#tiwen").val();
		mb = $("#maibo").val();
		szy = $("#shuzhangya").val();
		ssy = $("#shousuoya").val();
		spo2 = $("#spo2").val();
	}
	
	
	//hx = 60;
	var score_tiwen = 0;
	var score_xueya = 0;
	var score_maibo = 0;
	var score_huxi = 0;
	var score_spo2 = 0;
	if (!typeof (tw) === "undefined") {
		score_tiwen = getTiwenScore(tw);
	}
	if (!typeof (ssy) === "undefined") {
		if(!typeof (szy) === "undefined"){
			//计算平均血压
			var xueya = (2*parseFloat(szy)+parseFloat(ssy))/3;
			score_xueya = getXueyaScore(xueya);
		}
	}
	if (!typeof (mb) === "undefined") {
		score_maibo = getMaiboScore(mb);
	}
	if (!typeof (hx) === "undefined") {
		score_huxi = getTiwenScore(hx);
	}
	
	if (!typeof (spo2) === "undefined") {
		score_spo2 = getSpo2Score(spo2);
	}
	
	
	var Score_D = score_tiwen + score_xueya + score_maibo + score_huxi + score_spo2;
	$(".Score_D").text(Score_D);
}




