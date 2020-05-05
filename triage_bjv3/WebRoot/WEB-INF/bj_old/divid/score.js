//一些变量
var edts_score = "";
var mews_score = "";

var edts_ids = "";
var mews_ids = "";
var edts_ids_qitastatus = false;
var edts_ids_qita = "";

function initPf(){

	//ETDS评分
	$("#age,#huxi,#tiwen,#maibo,#shuzhangya,#shousuoya,#spo2").bind("input propertychange", function(){  
		if(document.getElementById("edts_x")){
			getTotalScore();  
			showEdts(false);
		}
	});

	
	
	$("#pf_b li").bind("click",function(){
		if($(this).attr("id")=="e-b-8-4"){
			return;
		}
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
	//选择B级其他时显示输入框
	$("#e-b-8-3").bind("click",function(){
		if($("#e-b-8-3").attr("class")=="active"){
			$("#e-b-8-4").css('display','block');
			$("#e-b-8-4").find("input").val("");
		}else{
			$("#e-b-8-4").css('display','none');
		}
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
	var xueya = (2*parseFloat(szy)+parseFloat(ssy))/3;
	//alert(xueya);
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

	
}

//取消刚才的操作
function reSetpf(symptom_type){
	if(symptom_type=="EDTS"){
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
	if(symptom_type=="MEWS"){
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
}

//选择完edts后显示到页面
function showEdts(isload){
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
	
	$("#edtsgrade").val(grade);
	
	var EDTS_Score = $(".totalScore").text();
	//赋值
	edts_score = EDTS_Score;
	edts_ids ="";
	
	if($("#e-b-8-3").attr("class")=="active"){
		$("#e-b-8-4").removeClass("active");
		edts_ids_qita=$("#e-b-8-4").find("input").val();
		edts_ids_qitastatus = true;
	}
	
	$("#quickpf").find('li[class="active"]').each(function(){
		edts_ids += $(this).attr("id")+",";
	});
	if(edts_ids !=""){
		edts_ids = edts_ids.substring(0,edts_ids.length-1);
	}
	//组织结束
	var str = '';
	str+='<p class="allocatTitle">';
	str+='<span>EDTS评分></span>';
	str+='</p>';
	str+='<p class="allocatNum" id ="EDTSNum">'+EDTS_Score+'</p>';
	str+='<p class="allocatUnit">分</p>';
	$("#edts").removeClass("setItem").css({"line-height":"initial"}).removeClass("st-mark-c").addClass("st-mark-h");
	$("#edts").html(str);
	//评分依据增加内容
	$("#edtspf").html('');
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"edts_x\" onclick=\"clearEDTS()\">×</button>";
	str1+= "EDTS评分:"+EDTS_Score+"分";
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
	$("#pf_b li").removeClass('active');
	$("#pf_c li").removeClass('active');
	$(".Score_B").text("0");
	$(".Score_C").text("15");
	getTotalScore;
	
	$("#edtsgrade").val("");
	if($("#jzann .changeName").text().trim() == "非急诊"){
		$("#edts").attr("class","st-mark st-mark-h setItem version-hide");
	}else{
		$("#edts").attr("class","st-mark st-mark-c setItem version-hide");
	}
	$("#edts").css({"line-height":""})
	$("#edts").html("<div class='st-icon'><span class='setIcon iconT'></span>EDTS评分</div>");
	$("#edtspf").html('');
	
	edts_score = "";
	edts_ids = "";
	
	//是唯一评级 清空 自动评级 否则 按其他评级结果显示
	if(checkalone("edtsgrade")){
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
	return Score;
}

//判断是否是唯一的评分，唯一就可以从高等级向低等级
function checkalone(id){
	var str ="";
	var res = true;
	$("input[name='group']").each(function(i){
		   var id2 = $(this).attr("id");
		   if(id2!=id){
			   str +=  $(this).val();
		   }
	});
	
	if(str.length>0){
		res = false;
	}
	//alert(str);
	return res;
}


//显示评级等级
function showAutoGrade(grade){
//	alert(grade);
	var name = $("#"+grade).html();
	$("#autograde").val(grade);
	$("#atuogradearea").html("");
	var str = '';
	str += '<div class="st-grade btn-'+grade+'-selected" style="height:64px;">';
	str += '<p class="allocatNum" style="line-height: 64px;">'+name+'</p>';
	str += '<p class="allocatUnit">级</p>';
	str += '</div></div>';
	if(grade!=''){
		$("#atuogradearea").html(str);
	}else{
		$("#atuogradearea").html('<div class="st-grade btn--selected" style="height:64px;"><p class="allocatNum" style="line-height: 64px;"></p></div>');
	}
	
			
	if($("#finalgrade").val()==""){
		$("#grade").html("");
		var html = '<div class="st-grade  btn-'+grade+'-selected">';
		html+= '<div><p class="allocatNum">'+name+'</p>';
		html+= '<p class="allocatUnit">级</p>';
		html+= '</div></div>';
		showRct(grade);
		if(grade !=''){
			$("#grade").html(html);
		}
		
	}
}

//获取 最大等级 1001，1002，1003，1004
function getHigestGrade(){
	var str = [];
	$("input[name='group']").each(function(i){
		if($(this).val()!=''){
			str.push($(this).val());
		}
	});
	return min(str);
}

//获取数组最小
function min(arr){
    var num = arr[0];
    for(var i=0;i<arr.length;i++){
        if(num > arr[i]){
            num = arr[i];
        }
    }
    return num;
}
