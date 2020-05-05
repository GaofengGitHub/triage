function initGCS(){

	//gcs_a的逻辑
	$("#gcs_a input[type='radio']").bind("click",function(){ 
		var radio = $(this);
		var sel_score = getrow(radio) - 1;
		//判断当前同行是不是有选中的 因为check 属性 变化在 click之前 所以 依旧利用 active 样式来 判断
		//如果 有取中 就 
		var old_score = 0;
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
					old_score =  getrow($(this))-1;
				}
			}
		 });
		switch(n)
		{
			case 1:
				var GCS_Score_old = $(".GCS_Score").text();
				var GCS_Score_new = parseInt(GCS_Score_old) - parseInt(sel_score);
				$(".GCS_Score").text(GCS_Score_new);
				radio.prop('checked', false); 
				//form.render();
				break;
			case 2:
				sel_score = sel_score - old_score;
				
				var GCS_Score_old = $(".GCS_Score").text();
				
				var GCS_Score_new= parseInt(GCS_Score_old) + parseInt(sel_score);
				$(".GCS_Score").text(GCS_Score_new);
				radio.addClass('active');
				break;
			default:
				var GCS_Score_old = $(".GCS_Score").text();
				var GCS_Score_new = parseInt(GCS_Score_old) + parseInt(sel_score);
				$(".GCS_Score").text(GCS_Score_new);
				radio.addClass('active');
		}
	
		//普通点击评级
		if(!isload){
			showGCS();
		}
	});
}

function showGCS() {
	
	gcs_ids  = "";
	
	$("#gcs_a").find('input[type="radio"]:checked').each(function(){
		gcs_ids += $(this).attr("id")+",";
	});
	
	if(gcs_ids !=""){
		gcs_ids = gcs_ids.substring(0,gcs_ids.length-1);
	}else{
		// 自动 清空 gsc评分
		clearGCS();
		return;
	}
	
	
	var gcsScore = $(".GCS_Score").text();

	gcsScore = parseInt(gcsScore);
	//13-15：轻 ;      9-12：中;   3-8：重;     8分或以下为昏迷
	var grade = "1004";
	if(gcsScore<=8){
		grade = "1001";
	}else if(gcsScore>=9&&gcsScore<=12){
		grade = "1002";
	}else if(gcsScore>=13&&gcsScore<=15){
		grade = "1003";
	}
	gcsgrade = grade;
	
	$("#gcspf").html('');

	var str = "<div class=\"alert alert-dismissable symptom\">";
	str+= "<button type=\"button\" class=\" alert-close close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"gcs_x\" onclick=\"clearGCS()\">×</button>";
	str += "GCS评分: "
		+ gcsScore + "分";
	str += getGradeBtn(grade);
	str += "</div>";
	if(!isload){
	    //获取所有评分表里等级最高的
	    grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}
	$("#gcspf").html(str);
}


//点击删除 gcs 评分
function clearGCS(){
	resetGCS();
	//获取所有评分表里等级最高的
	var grade = getHigestGrade();
	 //展示自动评级
	showAutoGrade(grade);
}


function resetGCS(){
	$("#gcs_a input").removeClass('active');
	$("#gcs_a input").prop('checked', false);
	$("#gcspf").html('');
	gcsgrade = "";
	gcs_ids = "";
}