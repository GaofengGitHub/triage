//页面加载时初始化
$(document).ready(function() {
	initPf();
});

//一些预先加载的样式
var btn_1 = "";
var btn_2 = "";
var btn_3 = "";
var btn_4 = "";
var btn_5 = "";


//一些评级所需要变量
//是否 为 加载
var isload = false;
//初始状态
var gradebtn1 = '';
var gradebtn2 = '';
//等级保存
var autograde = "";
var finalgrade = "";

//分级 id

var handleid = "";

var nurseid = "";
var nursename = "";


//参与评级 的体征参数
var hx = "";
var tw = "";
var mb = "";
var szy = "";
var ssy = "";
var spo2 = "";

//各评分表的等级 
var quickgrade = "";
var edtsgrade = "";
var mewsgrade = "";
var signgrade = "";
var gcsgrade = "";
var paingrade = "";

//快速分级变量
var level_1_id = "";
var level_1_name = "";
var level_2_id = "";
var level_2_name = "";
var level_3_id = "";
var level_3_name = "";


//以下字段用于保存或者重置评分表的选项
//edts的选择项
var edts_ids = "";
var edts_ids_qitastatus = false;
var edts_ids_qita = "";
//mews的选择项
var mews_ids = "";

//gcs的 选项
var gcs_ids = "";



//初始化 所有 评级 表
function initPf(){
	
	laydate.render({
		  elem: '#dividtime', //指定元素
		  type: 'datetime'
	});
	//
	$('#changereason').comboSelect();

	//加载默认等级样式
	setgradecss();
	//加载 各评分 表 
	initQucik();
	initEdts();
	initMews();
	initGCS();
	initPain();
	$('#quickpfb').show();
	$('#401').addClass("active");
	//加载 评分表默认显示 顺序 等设置
	//2018-11-28 update by yling  ==> 北京并未从后台控制选择，所以先默认全部显示
	//showPjfs();
	//加载当前时间
	$("#dividtime").val(getFormatDate());
	//loadPatientGradeDetail('510372726754508802');
	//addloadPatientGrade();
}

//新增
function addloadPatientGrade(){
	nurseid = '#userId()';
	nursename = '#userName()';
	$("#pj_nursename").html(nursename);
}

//加载 患者 单次评级详情 传入 评级 id  hid
function loadPatientGradeDetail(hid){
	handleid = hid;
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientGradeDetail",
        data:{
        	handleid:handleid
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		//console.log(result);
        		if(result.status==200){
        			//评级详情
        			var detail = result.rows;
        			//指明现在是加载详情
        			isload = true;
        			
        			//加载本次评级 护士信息
        			nurseid = detail.dividenurseid;
        			nurseName = detail.dividenurse;
        			
        			$("#pj_nursename").html(nurseName);
        			
        			//变量赋值
        			mews_ids = detail.mews_ids;
        			edts_ids = detail.edts_ids;
        			edts_ids_qitastatus = detail.edts_ids_qitastatus;
        			edts_ids_qita = detail.edts_ids_qita;
        			//具体体征赋值
        			hx = detail.hx;
        			tw = detail.tw;
        			mb = detail.mb;
        			szy = detail.szy;
        			ssy = detail.ssy;
        			spo2 = detail.spo2;
        			
        			//等级赋值
        			edtsgrade = detail.edts_grade;
        			mewsgrade = detail.mews_grade;
        			gcsgrade = detail.gcs_grade;
        			paingrade = detail.pain_grade;
        			//加载 各评分表 详情
        			loadQuick(detail.qg);
        			if(edtsgrade!=""){
        				loadEdts();
        			}
        			if(mewsgrade!=""){
        				loadMews();
        			}
        			
        			
        	    	//加载手动修改原因
        	    	$('#changereason').find("option[value='"+detail.changereason+"']").attr("selected",true);
        	    	$("#reasondetail").val(detail.reasondetail);
        	    	//加载评级时间
        	    	$("#dividtime").val(detail.dividtime);
        	    	
        	    	//加载完毕后
        			//获取所有评分表里等级最高的
        	    	grade = getHigestGrade();
        	    	//展示自动评级
        	    	showAutoGrade(grade);
        	    	//展示手动评级
        	    	$("#g2[value =\""+detail.finalgrade+"\"]").trigger("click");
        	    	//恢复点击自动算评级
        	    	isload = false;
        	    	//显示分级页面
        	    	$("#fenzhenpjb").modal();
        		}
        	}
        },
        error: function(){
        	alert("加载评级信息出错");
        }
    });
}


//保存  患者本次评级 数据
function savePatientGrade(){
	var changereason = $("#changereason").val();
	var reasondetail = $("#reasondetail").val();
	if(autograde==""&&finalgrade==""){
		alert("请先评级后保存");
		return;
	}
	if(finalgrade!=""&&changereason==""){
		alert("手动评级必须要选择改动原因");
		return;
	}
	var  symtpomids = "";	
	//获取分级信息
	$("button[name='quickitem']").each(function(i) {
		symtpomids += $(this).attr("id")+",";
	});
	if(symtpomids !=""){
		symtpomids = symtpomids.substring(0,symtpomids.length-1);
	}
	var dividtime = $("#dividtime").val();
	
	var edts_score ="";
	if(edtsgrade!=""){
		edts_score = $(".totalScore").text();
	}
	var mews_score = "";
	if(mewsgrade!=""){
		mews_score = parseInt($(".mews_score_A").text())+parseInt($(".mews_score_B").text())+ parseInt($(".mews_score_C").text());
	}
	var pain_score = $("#Pain_Score").html();
	if(pain_score=="0"){
		pain_score = "";
	}
	var gcs_score = $("#GCS_Score").html();
	if(gcs_score=="0"){
		gcs_score = "";
	}
	$.ajax({
        type: "post",
        url: "#path()/divid/SavePatientGrade",
        data:{
        	handleid:handleid,
        	//页面隐藏域，推荐用 js 变量 待优化
        	p_id:$("#patientid").val(),
        	autograde:autograde,
        	finalgrade:finalgrade,
        	changereason:changereason,
        	reasondetail:reasondetail,
        	nurseid:nurseid,
        	nursename:nursename,
        	symtpomids:symtpomids,
        	edts_ids:edts_ids,
        	edts_ids_qitastatus:edts_ids_qitastatus,
        	edts_ids_qita:edts_ids_qita,
        	mews_ids:mews_ids,
        	edts_score:edts_score,
        	mews_score:mews_score,
        	pain_score:pain_score,
        	gcs_score:gcs_score,
        	edts_grade:edtsgrade,
        	mews_grade:mewsgrade,
        	pain_grade:paingrade,
        	gcs_grade:gcsgrade,
        	hx:hx,
        	tw:tw,
        	mb:mb,
        	szy:szy,
        	ssy:ssy,
        	spo2:spo2,
        	dividtime:dividtime
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		console.log(result);
        		if(result.status==200){
        			//保存成功后 评级 id 为空
        			handleid = "";
        			alert("保存成功！");
        			
        		}else{
        			alert("保存失败！");
        		}
        		$("#fenzhenpjb").modal('hide');
        		reSetpf('close');
        		showqjypgfenji($("#patientid").val());
        	}
        },
        error: function(){
        }
    });
}



//1.如果是修改 根据 handleid 再次 reload 下 分级详情 接口
//2.如果是新增 直接清空 之前所做的评级数据
//ps:重置 这里 由于 点击 保存 直接 提交了   
//不会暂存刚才的评级 数据 所以 点击 保存 和 重置  取消 
//三个按钮都会清空 刚才 的评级数据 然后 回到 患者 评级 列表 界面 
function reSetpf(type){
	reSetQuick();
	reSetEdts();
	reSetMews();
	resetGCS();
	resetPain();
	autograde = "";
	finalgrade = "";
	//等级显示为初始
	$(".groupClass1").html(gradebtn1);
	$(".groupClass2").html(gradebtn2);
	//手动修改原因置空
	$('#changereason').find("option[value='']").attr("selected",true);
	//如果 为 重置 
	if(type=="reSet"){
		if(handleid!=""){
			loadPatientGradeDetail(handleid);
		}
	}else if(type=="close"){
		//关闭 清空 handleid
		handleid = "";
	}
}

//切换评级表方法
function activePjfs(btn){		
	//评级方式按钮点击效果
	if($(btn).is('.active')){
		
	}else{
		$(btn).addClass('active').siblings().removeClass('active');
		var name = $(btn).find("span").text();
		var tyid = $(btn).attr("tyid");
		if(tyid=='401'){
			//显示快速分级
			$('#quickpfb').show().siblings().hide();
		}else if(tyid=='408'){
			//EDTS
			$('#edtspfb').show().siblings().hide();
			getEdtsScore();
		}else if(tyid=='406'){
			//MEWS
			$('#mewspfb').show().siblings().hide();
			getMewsScore();
		}else{
			$('#default').show().siblings().hide();
		}
	}
}

//切换评级表方法2 对bj系统
function activePjfsBj(btn){		
	//评级方式按钮点击效果
	if($(btn).is('.active')){
		
	}else{
		var id = $(btn).attr("id");
		$(btn).addClass('active').siblings().removeClass('active');
		//alert(id);
		if(id=='401'){
			//显示快速分级
			$('#quickpfb').show().siblings().hide();
		}else if(id=='402'){
			//显示疼痛
			$('#painpfb').show().siblings().hide();
		}else if(id=='404'){
			//gsc评分
			$('#gcspfb').show().siblings().hide();
			getEdtsScore();
		}else if(id=='408'){
			//EDTS
			$('#edtspfb').show().siblings().hide();
			getEdtsScore();
		}else if(id=='406'){
			//MEWS
			//alert(id);
			$('#mewspfb').show().siblings().hide();
			getMewsScore();
		}else{
			$('#default').show().siblings().hide();
		}
	}
}

//选择手动评级方法
function showFinalGrade(grade){
	var value = $(grade).attr("value");
	var g = value.substr(value.length-1,value.length);
	var id = $(grade).attr("id");
	//模拟失去焦点，为了解决 button 自带的 焦点样式
	$(grade).blur();
	if(id=="g1"){
	}else if(id=="g2"){
		//组装样式名称
		var css = 'btn-'+value+'-selected';
		if($(grade).is('.'+css)){
			$(grade).removeClass(css);
			finalgrade = "";
			return;
		}
		for(var i=1;i<6;i++){
			if(g!=i){
				$("#g2[value =\""+"100"+i+"\"]").removeClass('btn-'+"100"+i+'-selected');
			}else{
				$("#g2[value =\""+value+"\"]").addClass(css);
			}
		}
		finalgrade = value;
	}
}

//获取 评级方式按钮 确认 默认显示 主要评级方式
function showPjfs(){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPjfs",
        data:{
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
        			var rows = result.rows;
        			$("#leftMenu").html("");
            		var str ="" ;
           	 		for(var i in rows){
           	 			var name = rows[i]["right_name"];
           	 		    var tyid = rows[i]["ty_id"];
           	 			var right_type = rows[i]["right_type"];
           	 				if(right_type==1){
           	 					str += " <li tyid="+tyid+" onclick='activePjfs(this)' class='active' title='"+name+"'><i class='icon_treat'></i>";
           	 				}else{
           	 					str += " <li tyid="+tyid+" onclick='activePjfs(this)' title='"+name+"'><i class='icon_treat'></i>";
           	 				}
           	 			    str += "<span>";
           	 				str+= name;
           	 				str+= "</span></li>";
           	 			//显示主要评分方式
           	 			if(right_type==1){
           	 			    if(tyid=='401'){
           	 					//显示快速分级
           	 					$('#quickpfb').show();
           	 			    }else if(tyid=='408'){
           	 			    	//显示EDTS
           	 					$('#edtspfb').show();
           	 			    }else if(tyid=='406'){
           	 			    	//显示MEWS
           	 					$('#mewspfb').show();
           	 				}else{
           	 					//显示默认
           	 					$('#default').show();
           	 				}
           	 			}
           	 		}
            		$("#leftMenu").html(str);	            		
        		}
        	}
        },
        error: function(){
        }
    });
}

//获取 最大等级 1001，1002，1003，1004
function getHigestGrade(){
	var str = [];
	if(quickgrade.trim()!=""){
		str.push(quickgrade);
	}
	if(edtsgrade.trim()!=""){
		str.push(edtsgrade);
	}
	if(mewsgrade.trim()!=""){
		str.push(mewsgrade);
	}
	if(signgrade.trim()!=""){
		str.push(signgrade);
	}
	if(gcsgrade.trim()!=""){
		str.push(gcsgrade);
	}
	if(paingrade.trim()!=""){
		str.push(paingrade);
	}
	return min(str);
}

//获取数组最小  数组长度为0 返回空值
function min(arr){
	if(arr.length==0){
		return '';
	}
    var num = arr[0];
    for(var i=0;i<arr.length;i++){
        if(num > arr[i]){
            num = arr[i];
        }
    }
    return num;
}
//判断是否是唯一的评分，唯一就可以从高等级向低等级
function checkalone(id){
	var res = true;
	var str = [];
	if((quickgrade.trim()!="")&&(id!="quickgrade")){
		str.push(quickgrade);
	}
	if((edtsgrade.trim()!="")&&(id!="edtsgrade")){
		str.push(edtsgrade);
	}
	if((mewsgrade.trim()!="")&&id!="mewsgrade"){
		str.push(mewsgrade);
	}
	if((signgrade.trim()!="")&&(id!="signgrade")){
		str.push(signgrade);
	}
	
	
	if(str.length>0){
		res = false;
	}
	return res;
}

//显示自动评级等级  所有等级都无的情况 恢复到没有自动评级前
function showAutoGrade(grade){
	autograde = grade;
	//所有等级都无的情况 恢复到没有自动评级前
	if(grade==""){
		for (var i = 1; i < 6; i++) {
			$("#g1[value =\"" + "100" + i + "\"]").removeClass(
						"btn-"  + "100" +i + "-selected");
		}
	}else{
		var g = grade.substring(grade.length - 1, grade.length);
		var grade_css = 'btn-' + grade + '-selected';
		for (var i = 1; i < 6; i++) {
			if (g != i) {
				$("#g1[value =\"" + "100" + i + "\"]").removeClass(
						"btn-" + + "100" + i  + "-selected");
			} else {
				$("#g1[value =\"" + "100" + i + "\"]").addClass("btn-"  + "100" + i );
				$("#g1[value =\"" + "100" + i + "\"]").addClass(grade_css);
			}
		}
	}
}

//动态设置评级等级样式
function setgradecss() {
		$.ajax({
	        type: "post",
	        url: "#path()/divid/queryGradeset",
	        data:{
	        },
	        dataType: "json",
	        async:false,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			var list = result.rows;
	        			var style = document.createElement('style');
	    	    		style.type = 'text/css';
	    	    		var css = '.groupClass1 .btn,.groupClass2 .btn{margin-right:13px;}';
	       	 			for(var i in list){
	       	 				var ys_id = list[i]["ys_id"].toString();
	       	 				var grade_color = list[i]["grade_color"];
	       	 				var grade = ys_id;
	       	 				css += '.btn-';
	       	 				css += grade;
	       	 				css += '{padding: 6px 24px;background:#efefef;color:#000;width:90px;font-size:16px';
	       	 				//css += grade_color;
	       	 				css += ';border:none';
	       	 				//css += grade_color;
	       	 				css += ';}';
	    	    			css += '.btn-';
	    	    			css += grade;
	    	    			css += ':hover,.btn-';
	    	    			css += grade;
	    	    			css += '-selected{background:';
	    	    			css += grade_color;
	    	    			css += ' !important ;color:#fff;}';
	       	 			}
	       	 			
	       	 			for(var i in list){
	   	 					var ys_id = list[i]["ys_id"].toString();
	   	 					var grade_name = list[i]["grade_name"].toString();
	   	 					var grade = ys_id;
	   
							if (grade == '1001') {
								btn_1 = '<btn type="button" class="btn-sm  btn-1001-selected" style="margin-left:15px;">'+grade_name+'级</btn>';
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-1001" value="'+ys_id+'">'+grade_name+'级</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-1001" value="'+ys_id+'" onclick="showFinalGrade(this);">'+grade_name+'级</button>';
							}
							if (grade == '1002') {
								btn_2 = '<btn type="button" class="btn-sm  btn-1002-selected" style="margin-left:15px;">'+grade_name+'级</btn>';
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-1002" value="'+ys_id+'">'+grade_name+'级</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-1002" value="'+ys_id+'" onclick="showFinalGrade(this);">'+grade_name+'级</button>';
							}
							if (grade == '1003') {
								btn_3 = '<btn type="button" class="btn-sm  btn-1003-selected" style="margin-left:15px;">'+grade_name+'级</btn>';
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-1003" value="'+ys_id+'">'+grade_name+'级</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-1003" value="'+ys_id+'" onclick="showFinalGrade(this);">'+grade_name+'级</button>';
							}
							if (grade == '1004') {
								btn_4 = '<btn type="button" class="btn-sm  btn-1004-selected" style="margin-left:15px;">'+grade_name+'级</btn>';
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-1004" value="'+ys_id+'">'+grade_name+'级</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-1004" value="'+ys_id+'" onclick="showFinalGrade(this);">'+grade_name+'级</button>';
							}
							if (grade == '1005') {
								btn_5 = '<btn type="button" class="btn-sm  btn-1005-selected" style="margin-left:15px;">'+grade_name+'级</btn>';
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-1005" value="'+ys_id+'">'+grade_name+'级</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-1005" value="'+ys_id+'" onclick="showFinalGrade(this);">'+grade_name+'级</button>';
							}

						}
						style.innerHTML = css;
						document.getElementsByTagName('HEAD').item(0).appendChild(style);
						$(".groupClass1").html(gradebtn1);
						$(".groupClass2").html(gradebtn2);
					} else {
						//默认颜色设置
						setdefultcss();
					}
	        	}
			},
			error : function() {
				//默认颜色设置
				setdefultcss();
			}
		});

	}




//获取等级按钮
function getGradeBtn(grade){
	
	
	switch (grade) {
	case "1001":
		return btn_1;
		break;
	case "1002":
		return btn_2;
		break;
	case "1003":
		return btn_3;
		break;
	case "1004":
		return btn_4;
		break;
	case "1005":
		return btn_5;
		break;

	default:
		break;
	}
    return "";
}

function getFormatDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

//获取行号
function getrow(input){
	 var row = $(input).parent().parent().parent().prevAll().length + 1;//行号
	 return row;
}


//获取在在列,用算分
function getcol(input){
	 var col = $(input).parent().parent().index() + 1;
	 return col;
}
