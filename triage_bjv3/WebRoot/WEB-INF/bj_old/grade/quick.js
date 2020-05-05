/*
 * 快速分级
 */

//初始化 快速分级
function initQucik(){
	getSymptom("0","1");
}

//显示快速分级列表 按等级 初始  pid 为 0
function getSymptom(pid, level) {
	$.ajax({
		type : "post",
		url : "#path()/divid/getSymptom",
		data : {
			pid : pid,
			level : level
		},
		dataType : "json",
		success : function(result) {
			if (result != null) {
				if (result.status == 200) {
					
					var str = "";
					var list = result.rows;
					for ( var i in list) {
						var name = list[i]["name"].trim();
						var id = list[i]["id"];
						var grade = list[i]["grade"];
						var pid = list[i]["pid"];
						
						if(level=="3"){
							str += "<li class='btn-"+grade +"-selected' onclick='showQuickGrade(this,\""+grade+"\",\""+name+"\",\""+id+"\",\""+pid+"\",\""+level+"\")'><a style='color:#000 !important'>" + name + "</a></li>";
							
						}else{
							str += "<li onclick='showQuickGrade(this,\""+grade+"\",\""+name+"\",\""+id+"\",\""+pid+"\",\""+level+"\")'><a>" + name + "</a></li>";
						}
					}
					if(level=="1"){
						var html = "<li>快速分级></li>" + str;
						$("#qg1").html("");
						$("#qg1").html(html);
					}else if(level=="2"){
						var html = "<li>主诉></li>" + str;
						$("#qg2").html("");
						$("#qg2").html(html);
					}else if(level=="3"){
						var html = "<li>评分依据</li>" + str;
						$("#qg3").html("");
						$("#qg3").html(html);
					}
					
				}
			}
		},
		error : function() {
		}
	});
}



//选择快速分级后
function showQuickGrade(th,grade,name,id,pid,level){
	if(level==1){
		level_1_id = id;
		level_1_name= name;
		getSymptom(id, "2");
	}
	if(level==2){
		level_2_id = id;
		level_2_name= name;
		getSymptom(id, "3");
	}
	if(level==3){
		if($(th).attr("Class")!=null && $(th).attr("Class")=="activecc"){
			var html = $("#qgpf").html();
			if (html.trim().length != 0) {
				$(".xxx").each(function() {
					if ($(this).attr("id") == id) {
						$(this).parent().remove();
					}
				});
				html = $("#qgpf").html();
			}
		}else{
			level_3_id = id;
			level_3_name = name;
			var str = "<div class=\"alert alert-dismissable symptom\">";
			str += "<button type=\"button\" class=\" alert-close close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\"  name='quickitem' grade=\""
					+ grade
					+ "\" onclick=\"clearQuick(this)\" parentid=\""
					+ pid
					+ "\" id=\"" + id + "\">×</button>";
			str += level_1_name + " | " + level_2_name + " | " + level_3_name;
			str += getGradeBtn(grade);
			str += "</div>";
			var html = $("#qgpf").html();
			if (html.trim().length != 0) {
				$(".xxx").each(function() {
					if ($(this).attr("parentid") == pid) {
						$(this).parent().remove();
					}
				});
				html = $("#qgpf").html();
			}
			html = html + str;
			$("#qgpf").html(html);
		}
		// 先获取快速分级症状中等级最高的那个
		var str = [];
		$("button[name='quickitem']").each(function(i) {
			str.push($(this).attr("grade"));
		});
		grade = min(str);
		quickgrade = grade;
		// 再取所有评分表里等级最高的
		grade = getHigestGrade();
		// 展示自动评级
		showAutoGrade(grade);
		}
	// 最后  更新 选中状态
	if($(th).attr("Class")!=null && $(th).attr("Class")=="activecc"){
		$(th).removeClass("activecc");
	}else{
		$(th).toggleClass("activecc").siblings().removeClass("activecc");
	}
}

//删除 快速评级时候
function clearQuick(btn){
	var id = $(btn).attr("id");
	var str = [];
	$("button[name='quickitem']").each(function(i){
		if(id!=$(this).attr("id")){
			str.push($(this).attr("grade"));
		}
	});
	//先获取快速分级症状中等级最高的那个
	grade = min(str);
	quickgrade = grade;
	//再取所有评分表里等级最高的
	grade = getHigestGrade();
	//展示自动评级
	showAutoGrade(grade);
	
}
//清空快速评级 选项
function reSetQuick(){
	//症状栏清空
	$("#qgpf").html('');
	//清空 快速分级的变量
	level_1_id = "";
	level_1_name = "";
	level_2_id = "";
	level_2_name = "";
	level_3_id = "";
	level_3_name = "";
	quickgrade = "";
	//重新加载下 快速评级
	initQucik();
}

//加载快速分级 选项
function loadQuick(qg){
	var str = "";
	for(var i in qg){
		var name = qg[i]["name"];
		var id = qg[i]["id"];
		var grade = qg[i]["grade"];
		var parentid = qg[i]["parentid"];
		str += "<div class=\"alert alert-dismissable symptom\">";
		str += "<button type=\"button\" class=\"alert-close close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\"  name='quickitem' grade=\""
				+ grade
				+ "\" onclick=\"clearQuick(this)\" parentid=\""
				+ parentid
				+ "\" id=\"" + id + "\">×</button>";
		str += name;
		str += "</div>";
	}
	$("#qgpf").html(str);
	
	//算分
	// 获取快速分级症状中等级最高的那个
	var str = [];
	$("button[name='quickitem']").each(function(i) {
		str.push($(this).attr("grade"));
	});
	grade = min(str);
	quickgrade = grade;
}

 
