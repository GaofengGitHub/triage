var hh=95;
var fztj = "0";
var print_wd='';
//his流水号
var serialnum='';
var collist = '';
var grouplist ='';
$("#addPatient").addClass("leftNavActive").find("img").attr("src",$("#historyrecord").find(".iconNavImg").data("activeImg"));
$("#addPatient").siblings().removeClass("leftNavActive");
$("#home").find("img").attr("src",$("#home").find(".iconNavImg").data("activeImg"));
function load(){
//	//快速分级 查询
//		$("#seach_lv1,#seach_lv2,#seach_lv3").bind("input propertychange", function(){  
//			
//			var id = $(this).attr("id");
//			if(id=="seach_lv1"){
//				getSymptom(0,1);
//			}else if(id=="seach_lv2"){
//				getSymptom($("#level_1_id").val(),2);
//			}else if(id=="seach_lv3"){
//				getSymptom($("#level_2_id").val(),3);
//			}
//		});
		//下拉加载合集
		ulliclick();
		setBackColor();
	    $("#gradeMark_d").click(function() {
	    	$("#fastpjModal").modal("show");	

		});
	    
	//动态加载费别，来源，来院方式，意识状态，既往病史
    //方法执行后，点击效果有问题，暂不能使用
	
//	showtxmlist();
//	showtrslist();
//	showdescribelist();
//	showhistorylist();
		showcategorylist();

	 var sytime = synctime();
	$("#dividtime").val(sytime.substring(0, 16));
	$("#dividtimee").val(sytime.substring(0, 16));
	$("#cardnum").focus();
	
	//获取必填项信息
	collist = '#(collist)';
	collist = $.parseJSON(collist) ;
	
	grouplist = '#(grouplist  ??)';
	if(grouplist.length>0){
		grouplist = $.parseJSON(grouplist) ;
		
	}
	
	
	//分诊调级权限
	fztj = '#(fztj)';
	
	//非新增加载暂存数据
	var id = '#(id)';
	var type = '#(type)';
	var path ='#(path)';
	 if(type=="card"){
		 loadcardInfo(id);
	 }
	
	
    if(showPre&&type=="predivid"){
    	adaption1();
    	
    	if(id=="1"){
    		$("#pre_arrivetime").val("2019-03-19 20:28:40");
    		$("#pre_zhenduan").val("脑梗");
    		$("#pre_panduan").val("危急");
    		$("#pre_greenchannel").val("脑梗");
    		$("#pre_carNo").val("643534");
    		$("#pre_doctor").val("林梓洋");
    		$("#fullname").val("王淑芬");
    		$("#gender").val("女");
    		
    	}else if(id=="2"){
    		$("#pre_arrivetime").val("2019-03-19 20:32:26");
    		$("#pre_zhenduan").val("小产");
    		$("#pre_panduan").val("濒危");
    		$("#pre_greenchannel").val("孕产妇");
    		$("#pre_carNo").val("785198");
    		$("#pre_doctor").val("李国宝 华春梅");
    		$("#fullname").val("李丽娟");
    		$("#gender").val("女");
    	}else if(id=="3"){
    		$("#pre_arrivetime").val("2019-03-19 20:38:19");
    		$("#pre_zhenduan").val("动脉硬化");
    		$("#pre_panduan").val("急症");
    		$("#pre_greenchannel").val("心梗");
    		$("#pre_carNo").val("147890");
    		$("#pre_doctor").val("戴振宇");
    		$("#fullname").val("杨建国");
    		$("#gender").val("男");
    	}
    }else{
    	adaption();
    }
	
	
	
	//来源
	var source ='#(status)';
	//事件id
	var evevtsid ='#(evevtsid)';
	var name='#(name)';
	var num='#(num)';
	if(is_quick!='已关闭'){
		$('.gradeMark').show();
	}
	
	if(path !=''){
		$("#picDiv").html("");
		str = '<p class="allocatTitle">';
		str += '<span onclick="showSign();">家属签字></span>';
		str += '</p>';
		str += '<p class="namePic" onclick="show();">';
		str +=  '<img  src="#path()'+path+'" style="height: 50px;">';
		str += '</p>';
		$("#picDiv").html(str);
    	var str = "";
    	str += "<img src=\""+path+"\">";
    	$("#sgin").html(str);
    	$("#signUrl").val(path);
	}
	$("#source").val(source);
	$("#evevtsid").val(evevtsid);
	$("#ename").val(name);
	$("#enum").val(num);
	if(source=='events'){
		$("#backevents").show();
	}
	$("#returnUrl").val(type);
	
	if(type=="xgpj"){
		$("#dodraf").hide();
		
	}
	
		
	if(id!=""&&(type!="card")){
		queryPatientHandleScore(id);
		loadPatientBaseInfo(id);
//		loadPatientScore(id,$("#maxcixu").val());
		if(type=="xgpj" || type=="histroy"){
			loadPatientSignInfo(id,$("#maxcixu").val());
			loadPatientSymtpomByType(id,$("#maxcixu").val());
			loadPatientSymtpom(id,$("#maxcixu").val());
			loadPatientHandle(id,$("#maxcixu").val());
		}else{
			loadPatientSignInfo(id,"");
			loadPatientSymtpomByType(id,"");
			loadPatientSymtpom(id,"");
			loadPatientHandle(id,"");
		}
		var cixu = $("#cixu").val();
		var maxcixu = $("#maxcixu").val();
		if(cixu!=""){
			cixu = Number(cixu);
		}
		if(maxcixu!=""){
			maxcixu = Number(maxcixu);
		}
		if(cixu==maxcixu){
			$("#cixu").val(cixu+1);
		}
		
	}
//	cixu();
	//setTimeout(cixu,800);
	
	//获取样式
	//$().addClass("active");
	setgradebtncss3();

	showDepart();
	//时间
	laydate.render({elem: '#dividtime',type: 'datetime', format: 'yyyy-MM-dd HH:mm',max:(new Date()).getTime()});
	laydate.render({
		  elem: '#bornday' ,//指定元素
		  max:0,
		  done: function(value, date, endDate){
			    var age = jsGetAge('',value);
			    $("#age").val(age);
			}
	});
//	$('.mt1').datetimepicker({autoclose:true,pickerPosition:'top-right',endDate:new Date(),format: 'yyyy-mm-dd hh:ii' });
//		 alert(age);
//		 $("#age").val(age);
//		        });;
	
//	$('#bornday,#PATBirthDay').datepicker({ 
//		format:'yyyy-mm-dd',
//		autoclose:true,
//		endDate:new Date() 
//	  }).on('changeDate',function(ev){
//			var age = jsGetAge('',$("#"+ev.delegateTarget.id).val());
//			if(age==''){
//				age='0天';
//			}
//			if(ev.delegateTarget.id=='bornday'){
//				$("#age").val(age);
//			}
//			
//			var len = age.length;
//			var beg = len-1;
//			var danw = age.substring(beg,len);
//			var age = age.substring(0,len-1);
//			if((danw=='岁')&&(age>14)){
//				$(".Contact").hide();
//			}else{
//				$(".Contact").show();
//			}
//		});
//	
		
	
	//疼痛等级评分
	$(".num").bind("click",function(){
		var s = $(this).html();
		//需要加点击效果，单选效果
		$(this).addClass("active").parents("div").siblings().find(".num").removeClass("active");
		$("#Pain_Score").html(s);
	});
	//GCS评分
	$('input[type=radio][name=GCS_1],input[type=radio][name=GCS_2],input[type=radio][name=GCS_3]').change(function() {
			var GCS_1 = $("input[name='GCS_1']:checked").val();
			//$("#GCS_1").val(GCS_1);
			var GCS_2 = $("input[name='GCS_2']:checked").val();
			var GCS_3 = $("input[name='GCS_3']:checked").val();
			if(GCS_1==null) GCS_1 = $("#GCS_1").val();;
			if(GCS_2==null) GCS_2 = $("#GCS_2").val();;
			if(GCS_3==null) GCS_3 = $("#GCS_3").val();;
			$("#GCS_Score").html(parseInt(GCS_2)+parseInt(GCS_3)+parseInt(GCS_1));
            
    });
	
	//获取评分标准
//	finalautograde();
//	getSymptom("0","1");
//	setTimeout(showdcpi,1000);

	showdcpi();
	$("#handle0").click();
	
	if($("#handle1").text().trim() != "-"){
		$("#handle0 .label-left").css("background","#bb0707");
	}else{
		$("#handle0 .label-left").css("background","#000000");
	}
	if($("#handle5").text().trim() != "-"){
		$("#handle4 .label-right").css("background","#bb0707");
	}else{
		$("#handle4 .label-right").css("background","#000000");
	}
	setTimeout(function(){showSignGrade(false);},2000);
}

//显示对话框
function back(mes) {
    $('#mes').html(mes);//
    $('#delcfmModel').modal();  
}

function urlSubmit(){
	if($('#mes').html()=="保存成功!"){
		window.location.href="#path()/index/index";
	}else if($('#mes').html()=="患者已被接诊 ，确认是否暂存？"){
		//$("#showquxiaobutton").css("display","none");
		save("draf");
	}else if($('#mes').html()=="患者已被接诊 ，确认是否保存？"){
		//$("#showquxiaobutton").css("display","none");
		save("save");
	}else if($('#mes2').html()=="读卡信息存在更新，是否现在更新？"){
		//queryhisinfo();
	}else if($('#mes').html()=="当前录入信息，与就诊卡中不一致，是否更新就诊卡信息？"){
		//querylocalinfo();
		$("#nurseqianm").hide();
    	$("#lastnurseqianm").show();
	}else if($('#mes').html()=="当前证件已办理过就诊卡,注销旧卡请去办卡处，如需要使用旧卡请点击确认"){
		dayinconfirmbar();
		$("#PATCardNo").val($("#print_card").text());
		$("#cardnum").val($("#PATCardNo").val());
	}
	$('#delcfmModel').modal('hide');
}

//显示对话框
function back2(mes) { 
    $('#mes2').html(mes);//
    $('#delcfmModel2').modal(); 
    
    $('#delcfmModel2').on('hidden.bs.modal', function () {
    	$("#godyfzd").css("display","none");
    })
}
function back3(mes) { 
	if(mes =='请补全患者信息后打印!'){
		$('#tan_div').addClass('mes4-bg');
		$('#mes4').show();
//		 $('#mes4').html(mes);//
		 $('#mes3').hide();
	}else{
		$('#mes3').show();
		$('#tan_div').removeClass('mes4-bg');
		 $('#mes3').html(mes);//
		 $('#mes4').hide();
	}
   
    $('#delcfmModel3').modal(); 
    
}
function urlSubmit2(){
	if($('#mes2').html()=="保存成功!"){
		window.location.href="#path()/index/index?befrom="+'#(befrom ??)';
	}
}

//function getSymptom(pid,level){
//	$("#"+pid+"").addClass("activecc").siblings().removeClass("activecc");
//	var level_name = $("#"+pid).find("a").html();
//	var keywords = "";
//	if(level=="1"){
//		keywords = $("#seach_lv1").val();
//	}else if (level=="2"){
//		$("#level_1_id").val(pid);
//		keywords = $("#seach_lv2").val();
//	}else if (level=="3"){
//		$("#level_2_id").val(pid);
//		keywords = $("#seach_lv3").val();
//	}
//	$.ajax({
//        type: "post",
//        url: "#path()/divid/getSymptom",
//        data:{
//       	 pid:pid,
//       	 level:level,
//       	 keywords:keywords
//        },
//        dataType: "json",
//        async:true,
//        success: function(result){
//        	if(result!=null){
//        		//console.log(result);
//        		if(result.status==200){
//        			
//        			var str = "";
//       	 			var list = result.rows;
//       	 			if(level=="1"){
//       	 			}else if (level=="2"){
//       	 				$("#level_1_name").val(level_name);
//       	 			}else if (level=="3"){
//       	 				$("#level_2_name").val(level_name);
//       	 			}
//       	 			
//       	 			//计算下一等级是否只有一个
//       	 			var x = Array();
//       	 			var xx;
//       	 			
//       	 			for(var i in list){
//       	 				var name = list[i]["name"];
//       	 				var id = list[i]["id"];
//       	 				var grade = list[i]["grade"];
//       	 				if(level=="1"){
//       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,2);"><a>' +name+'</a></li>';
//       	 				}else if (level=="2"){
//       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,3);"><a>' +name+'</a></li>';
//       	 				}else if(level=="3"){
//       	 					str += '<li id="'+id+'"  class="btn-'+grade +'-selected"  onclick="showGrade(&quot;'+grade+'&quot,&quot;'+name+'&quot,&quot;'+id+'&quot,&quot;'+pid+'&quot);"><a style="color:#000 !important">' +name+'</a></li>';
//       	 					if(x.indexOf(grade)==-1){
//	 							x.push(grade);
//	 							xx = list[i];
//	 						}	
//       	 				}
//       	 			}
//       	 			if(level=="1"){
//       	 				str += '<li id="10000000001" class="addtype-input classify-class"><input id="zdy1" type="text" maxlength="20"  data-provide="typeahead" autocomplete="off" placeholder="自定义分类"></li>';
//       	 				$("#classify1 li").not(":first").remove(); 
//       	 				
//       	 				$("#classify1").append(str);
//       	 				$("#seach_lv2").val("");
//       	 				$("#seach_lv3").val("");
//       	 				$("#classify2 li").not(":first").remove();
//       	 				$("#classify3 li").not(":first").remove();
//       	 				
//       	 			}else if(level=="2"){
//       	 			    str += '<li id="10000000002" class="addtype-input classify-class"><input id="zdy2" type="text"  maxlength="20"   data-provide="typeahead"  autocomplete="off" placeholder="自定义主诉"></li>';
//       	 				$("#classify2 li").not(":first").remove(); 
//   	 					$("#classify2").append(str);
//   	 					$("#classify2").show();
//   	 					$("#seach_lv3").val("");
//   	 					$("#classify3 li").not(":first").remove(); 
//       	 			}else if(level=="3"){
//       	 				//如果第三级就一个 直接显示评级结果
//       	 				if(x.length==1){
//       	 					showGrade(x[0],xx.name,xx.id,pid);
//       	 					$("#classify3 li").not(":first").remove(); 
//       	 					return;
//       	 				}
//       	 			    str += '<li id="10000000003" class="ksfjgrade-box clearfix classify-class"><input id="zdy3" type="text" maxlength="20" placeholder="自定义评分依据">';
//		   	 			str += '<button type="button" name="ksfjgrade" grade="1001" class="btn btn-xs">一级</button>';
//		   				str += '<button type="button" name="ksfjgrade" grade="1002" class="btn btn-xs">二级</button>';
//		   			    str += '<button type="button" name="ksfjgrade" grade="1003" class="btn btn-xs">三级</button>';
//		   		        str += '<button type="button" name="ksfjgrade" grade="1004" class="btn btn-xs">四级</button>';
//       	 	            str += '<button type="button" onclick="zdyksfj();" class="btn btn-xs">></button></li>';
//       	 	            $("#classify3 li").not(":first").remove(); 
//	 					$("#classify3").append(str);
//       	 				$("#classify2").css("border-right","none");
//       	 				$("#classify3").show();
//       	 			}
//       	 		
//       	 		
//       	 	if(level=="1"){
//       	 		initZdy1();
//       	 		initZdy2();
//       	 		initZdy3();	
//	 		}else if(level=="2"){
//	 			initZdy2();
//	 			initZdy3();
//	 		}else{
//	 			initZdy3();
//	 		}
//       	 		
//       	 		
//       	 	//如果不显示演示功能  就 调用 隐藏 
//       	 	if(!showDemo){
//       	 		hideDemoMenu();
//       	 				
//       	 	}else{
//       	 		hideUnDemoMenu();
//       	 		initIcd();
//       	 	}
//        		}
//        	}
//        },
//        error: function(){
//        }
//    });
//}

//手动调级
var final_name='';
function activeGrade(grade,name){
	final_name=name;
	if($("#feijz").length>0){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-修改分级1,2,3,4"
			if(grade=="1001"){
				saveUserbehavior("A85");
			}else if(grade=="1002"){
				saveUserbehavior("A86");
			}else if(grade=="1003"){
				saveUserbehavior("A87");
			}else if(grade=="1004"){
				saveUserbehavior("A88");
			}
		}else{
			//用户行为监控记录"非急诊-修改分级1,2,3,4"
			if(grade=="1001"){
				saveUserbehavior("A123");
			}else if(grade=="1002"){
				saveUserbehavior("A124");
			}else if(grade=="1003"){
				saveUserbehavior("A125");
			}else if(grade=="1004"){
				saveUserbehavior("A126");
			}
		}
	}
	$("#finalgradearea").html("");
//	$("#finalgrade").val(grade);
//	$("#gradename").val(name);
	var str = '';
	str += '<div class="st-grade btn-'+grade+'-selected" style="height:64px;">';
	str += '<p class="allocatNum" style="line-height: 64px;">'+name+'</p>';
	str += '<p class="allocatUnit">级</p>';
	str += '</div></div>';
	$("#finalgradearea").html(str);
//	
//	$("#grade").html("");
//	var html = '<div class="st-grade  btn-'+grade+'-selected">';
//	html+= '<div><p class="allocattxt">改</p><p class="allocatNum">'+name+'</p>';
//	html+= '<p class="allocatUnit">级</p>';
//	html+= '</div></div>';
//	$("#grade").html(html);
}

//选择完等级后，显示等级
function showGrade(grade,level_name,id,pid){
	
	$("#"+id+"").addClass("activecc").siblings().removeClass("activecc");
	
	var str1 = "<div class=\"alert alert-dismissable symptom\" >";
	str1+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\"  name='quickitem' grade=\""+grade+"\" onclick=\"clearQuick(this)\" parentid=\""+pid+"\" id=\""+id+"\">×</button>";
	str1+= "<span>"+$("#level_1_name").val()+" | "+$("#level_2_name").val()+" | "+ level_name+' '+grade.substring(3,4)+"级</span>";
    str1+= "</div>";
    var html1 = $("#symptom").html();
	if (html1.trim().length == 0) {
		html1 = html1 + str1;
		$("#symptom").html(html1);
	} else {
		$(".xxx").each(function() {
			if ($(this).attr("parentid") == pid) {
				$(this).parent().remove();
			}
		});
		html1 = $("#symptom").html();
		html1 = html1 + str1;
		$("#symptom").html(html1);
	}
	
	//先获取快速分级症状中等级最高的那个
	var str = [];
	$("button[name='quickitem']").each(function(i){
		str.push($(this).attr("grade"));
	});
	grade = min(str);
   
	$("#quickgrade").val(grade);
	
	//再取所有评分表里等级最高的
    grade = getHigestGrade();
    //展示自动评级
    showAutoGrade(grade);
}

// 选择完疼痛等级后，显示到页面
function showPain(){
	var painScore = $("#Pain_Score").html();
	var str = '';
	/*str+='<p class="allocatTitle">';
	str+='<span>疼痛评分></span>';
	str+='</p>';
	str+='<p class="allocatNum" id ="painNum">'+painScore+'</p>';
	str+='<p class="allocatUnit">分</p>';*/
	str += '<div class="flex">' +
	'<span class="pftitle">疼痛评分</span>' +
	'<span id ="painNum">'+painScore+'分</span>' +
	'</div>';
	$("#pain").removeClass("setItem").css({"line-height":"initial"}).removeClass("st-mark-c").addClass("st-mark-t");
	$("#pain").html(str);
	//评分依据增加内容
	$("#ttpf").html('');
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+"疼痛评分:"+painScore+"分"+"\" onclick=\"clearPain()\">×</button>";
	str1+= "疼痛评分:"+painScore+"分";
    str1+= "</div>";
    var html1 = $("#ttpf").html();
    html1 = html1 +str1;
    $("#ttpf").html(html1);
}

//选择完GCS评分后，显示到页面;
function showGCS(){
	var GCS_Score = $("#GCS_Score").html();
	var str = '';
	/*str+='<p class="allocatTitle">';
	str+='<span>GCS评分></span>';
	str+='</p>';
	str+='<p class="allocatNum" id ="GCSNum">'+GCS_Score+'</p>';
	str+='<p class="allocatUnit">分</p>';*/
	str += '<div class="flex">' +
	'<span class="pftitle">GCS评分</span>' +
	'<span id ="GCSNum">'+GCS_Score+'分</span>' +
	'</div>';
	$("#GCS").removeClass("setItem").css({"line-height":"initial"}).removeClass("st-mark-c").addClass("st-mark-d");
	$("#GCS").html(str);
	//评分依据增加内容
	$("#gscpf").html('');
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+"GCS评分:"+GCS_Score+"分"+"\" onclick=\"clearGCS()\">×</button>";
	str1+= "GCS评分:"+GCS_Score+"分";
    str1+= "</div>";
    var html1 = $("#gscpf").html();
    html1 = html1 +str1;
    $("#gscpf").html(html1);
}

//选择完页面，显示到页面;
function setDept(id,name){
	$('.directionBox').toggle();
	$("#td_id").val(id);
	$("#td_name").val(name);
	var str = '';
	str+='<p class="allocatTitle">';
	str+='<span>分诊去向></span>';
	str+='</p>';
	str+='<p class="icu">'+name+'</p>';
	$("#chooseDepart").removeClass("setItem").css({"line-height":"initial"});
	$("#chooseDepart").html("");
	$("#chooseDepart").html(str);
}

////获取部门等待人数
//function showDepart(){
//	$.ajax({
//        type: "post",
//        url: "#path()/index/queryDepartAndWaitPatientNums",
//        dataType: "json",
//        data : {
//        },
//        success: function (result) {
//        	if((result!=null)&&(result.status==200)){
//            	var rows = result.rows;
//            	
//            	$("#depart").html("");
//            	var str ="";
//            	var department = $("#department").html();
//       	 		for(var i in rows){
//       	 			var id = rows[i]["td_id"];
//       	 			var name = rows[i]["td_name"];
//       	 			var count = rows[i]["count"];
//       	 			var max = rows[i]["readyclinicalreceptionmax"];
//       	 			//4个换一行 第一个不用结尾
//       	 			if((i%4==0)&&(i!=0)){
//       	 				str+='</li>';
//       	 			}
//       	 			if(i%4==0){
//       	 				str+='<li>';
//       	 			}
//       	 			str +='<div class="deskItem';
//       	 			if(count>=max){
//       	 				str +=' text-danger';
//       	 			}
//       	 			str +='">';
//       	 			str +='<span><img src="#path()/static/bj/images/iconHeart.png">';
//       	 			str += name;
//       	 			str +='</span>';
//       	 			str += count+'人';
//       	 			str +='</div>';
//       	 			department += '<li>';
//       	 			department += '<a Userbehaviorbyname=分诊去向-'+name+' onclick="setDept(&quot;'+id+'&quot;,&quot;'+name+'&quot;)">'+ name +'</a>';
//       	 			department += '</li>';
//       	 		
//       	 		}
//       	 		str+='</li>';
//       	 		//console.log(department);
//       	 		$("#depart").html(str);
//       	 		$("#department").html(department);
//        	}
//        },
//        error: function () {
//        	//$.messager.alert('提示','获取失败，请联系管理员');
//        }
//    });
//}
function showDepart(){
	$.ajax({
		type: "post",
		url: "#path()/index/queryDepartAndWaitPatientNums",
		dataType: "json",
		data : {
		},
		success: function (result) {
			if((result!=null)&&(result.status==200)){
				var rows = result.rows;

				$("#depart").html("");
				var str ='<div class="sroll">';
				var department = $("#department").html();
				for(var i in rows){
					var id = rows[i]["td_id"];
					var name = rows[i]["td_name"];
					var count = rows[i]["count"];
					var max = rows[i]["readyclinicalreceptionmax"];
					str +=	'<div class="textNavItem">'+
						'<span class="navText">'+name+'/人</span>'+
						'<span class="navNum">'+count+'</span>'+
						'</div>';
					department += '<li>';
					department += '<a Userbehaviorbyname=分诊去向-'+name+' onclick="setDept(&quot;'+id+'&quot;,&quot;'+name+'&quot;)">'+ name +'</a>';
					department += '</li>';

				}
				str+='</li></div>';
				$("#depart").html(str);
				$("#department").html(department);
				srollRun();
			}
		},
		error: function () {
			//$.messager.alert('提示','获取失败，请联系管理员');
		}
	});
}


//动态设置评级等级样式
function setgradebtncss3() {
	$.ajax({
        type: "post",
        url: "#path()/divid/queryGradeset",
        data:{
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
        			var list = result.rows;
        			var style = document.createElement('style');
    	    		style.type = 'text/css';
    	    		var css = '';
    	    		var gradebtn1 = '';
       	 			for(var i in list){
       	 				var ys_id = list[i]["ys_id"].toString();
       	 				var grade_color = list[i]["grade_color"];
       	 				var grade = ys_id;
       	 				css += '.btn-';
       	 				css += grade;
       	 				css += '{background:none;color:';
       	 				css += grade_color;
       	 				css += ';border:1px solid ';
       	 				css += grade_color;
       	 				css += ';}';
    	    			css += '.btn-';
    	    			css += grade;
    	    			css += ':hover,.btn-';
    	    			css += grade;
    	    			css += '-selected{background:';
    	    			css += grade_color;
    	    			css += ' !important ;color:#fff !important;}';
    	    			css += '.btn-';
    	    			css += grade;
    	    			css += '-selected a {color:#fff !important;}';
       	 			}
       	 			
       	 			for(var i in list){
   	 					var ys_id = list[i]["ys_id"].toString();
   	 					var grade_name = list[i]["grade_name"].toString();
   	 					var grade = ys_id.substring(ys_id.length-1,ys_id.length);
   
						if (grade == '1') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1001-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p class="allocatNum" id="1001">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';   
						}
						if (grade == '2') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1002-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p class="allocatNum" id="1002">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';  
						}
						if (grade == '3') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1003-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p class="allocatNum" id="1003">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';  
						}
						if (grade == '4') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1004-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p class="allocatNum" id="1004">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';  
						}
						if (grade == '5') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1005-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p class="allocatNum" id="1005">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';  
						}

					}
					style.innerHTML = css;
					document.getElementsByTagName('HEAD').item(0).appendChild(style);
					//console.log(style);
					$("#gradearea").html(gradebtn1);
					//console.log($(".groupClass2").html());
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


function loadcardInfo(id){
	$.ajax({
        type: "post",
        url: "#path()/card/queryCardInfoById",
        data:{
       	 id:id
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if((result!=null)&&(result.status==200)){
       	 	//基础参数赋值
        		var rows = result.rows;
        		$("#fullname").val(rows.fullname);
        		$("#cardnum").val(rows.cardnum);
        		$("#bornday").val(rows.bronday);
        		$("#gender").val(rows.gender);
        		$("#age").val(jsGetAge('',rows.bronday));
        		$("#tel").val(rows.tel);
        		$("#memberstel").val(rows.ralationname);
        		$("#parenttel").val(rows.ralationtel);
        		$("#address").val(rows.aprovince+rows.acity+rows.acountry+rows.addressdesc);
        		$("#idcard").val(rows.idcard);
        	}
        		
        },
        error: function(){
        }
    });
}


function loadPatientBaseInfo(id){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientById",
        data:{
       	 id:id
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if((result!=null)&&(result.status==200)){
       	 	//基础参数赋值
        		var rows = result.rows;
        		$("#id").val(id);
        		$("#evevtsid").val(rows.eventid);
        		var fullname =rows.fullname;
        		if(fullname=='无名氏'){
        			fullname=rows.fullname+rows.id
        		}
        		$("#fullname").val(fullname);
        		$("#cardnum").val(rows.cardnum);
        		$("#bornday").val(rows.bornday);
        		$("#gender").val(rows.gender);
        		$("#hisid").val(rows.hisid);
        		$("#card_type").val(rows.card_type);
        		$("#PAADMVisitNumber").val(rows.PAADMVisitNumber);
        		if(rows.age==null||rows.age==''){
        			var age = jsGetAge('',$("#bornday").val());
        			if(age==''){
        				age='0天';
        			}
        			 $("#age").val(age);
        		}else{
        			$("#age").val(rows.age);
        		}
        		
        		$("#tel").val(rows.tel);
        		$("#memberstel").val(rows.memberstel);
        		$("#parenttel").val(rows.parenttel);
        		$("#reason").val(rows.reason);
        		$("#address").val(rows.address);
        		$("#idcard").val(rows.idcard);
        		//挂号时间
        		$("#registertime").val(rows.registertime);
        		//分诊时间
        		if(rows.dividtime != null){
        			$("#dividtime").val(rows.dividtime.substring(0, 16));
        		}else{
        			$("#dividtime").val(synctime().substring(0, 16));
        		}
        		if(rows.go_rct=='1'){
        			$("#div_go_rct").addClass('active');
        		}
        		$("#status").val(rows.status);
        		var dividenurse =rows.dividenurse;
        		if(dividenurse!=null){
        			$("#dividenurse").html(rows.dividenurse);
        		}
        		$("#category").val(rows.category);
        		if(rows.category == null){
        			$("#category").val(7);
        		}
        		if(rows.source==""){
        			rows.source=null;
        		}
        		if(rows.admission==""){
        			rows.admission=null;
        		}
        		if(rows.consciousness==""){
        			rows.consciousness=null;
        		}
        		if(rows.source.indexOf("|")>0){
					$("input[name='source'][value='其他']").attr('checked',true);
					$("input[name='source'][value='其他']").parent().parent().attr("class","col-md-6 col-li active");
					$("#hydb2").val(rows.source.split("|")[1]);
					$("#hydb2").css("opacity","1");
				}else{
					$("input[name='source'][value="+rows.source+"]").attr("checked",true);
	        		$("input[name='source'][value="+rows.source+"]").parent().parent().attr("class","col-md-2 p0-r col-check active");
				}
        		if(rows.eventid != ''){
        			$("#events_check").click();
        			$("#events1").val(rows.name+'-'+rows.etime);
        			$('#events1').attr('value', rows.eventid);
        		}
        		$("input[name='lyfs'][value="+rows.admission+"]").attr("checked",true);
        		$("input[name='lyfs'][value="+rows.admission+"]").parent().parent().attr("class","col-md-2 active");
        		$("input[name='consciousness'][value="+rows.consciousness+"]").attr("checked",true);
        		
        		$("input[name='consciousness'][value="+rows.consciousness+"]").click().parent().parent().attr("class","col-md-2 active");
        		$("#dividtime1").show();
        		str = '';
        		if(result.rows.signurl!= null && result.rows.signurl!= ''){
        			$("#picDiv").html("");
        			str = '<p class="allocatTitle">';
        			str += '<span onclick="showSign();">家属签字></span>';
        			str += '</p>';
        			str += '<p class="namePic">';
        			str +=  '<a href="#path()'+result.rows.signurl+'" target="_blank"><img  src="#path()'+result.rows.signurl+'" style="height: 50px;"></a>';
        			str += '</p>';
					$("#picDiv").html(str);
					var str = "";
					str += "<img src=\"" + result.rows.path + "\">";
					$("#sgin").html(str);
					$("#signUrl").val(result.rows.signurl);
					$("#pfyj").show();
					$("#sign").hide();
        		}
        		
        		var a = rows.anamnesis;
        		if(a=='无'){
        			$("input[name='anamnesis'][type='checkbox'][value !='无']").attr("disabled","disabled");
        			$("input[name='anamnesis'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        			$("input[name='anamnesis1'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        		}
        		if(a!=null&&a!=""){
        			var strs= new Array(); //定义一数组 
        			strs=a.split(","); //字符分割 
        			for (var i=0;i<strs.length ;i++ ) 
        			{ 
        				if(strs[i].indexOf("|")>0){
        					$("input[name='anamnesis1'][value='其他']").attr('checked',true);
        					$("input[name='anamnesis1'][value='其他']").parent().parent().attr("class","col-md-6 col-li active");
        					$("#hydb1").val(strs[i].split("|")[1]);
        					$("#hydb1").css("opacity","1");
        				}else{
        					$("input[name='anamnesis'][value='"+strs[i]+"']").attr('checked',true);
        					$("input[name='anamnesis'][value='"+strs[i]+"']").parent().parent().attr("class","col-md-2 col-li active");
        				}
        				//$("input[name='anamnesis'][value='"+strs[i]+"']").attr('checked',true);
        			} 
        		}
        		
        		var h = rows.allergic_history;
        		if(h=='无'){
        			$("input[name='allergic_history'][type='checkbox'][value !='无']").attr("disabled","disabled");
        			$("input[name='allergic_history'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        			$("input[name='allergic_history'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        		}
        		if(h!=null&&h!=""){
        			var strs= new Array(); //定义一数组 
        			strs=h.split(","); //字符分割 
        			for (var i=0;i<strs.length ;i++ ) 
        			{ 
        				if(strs[i].indexOf("|")>0){
        					$("input[name='allergic_history1'][value='其他']").attr('checked',true);
        					$("input[name='allergic_history1'][value='其他']").parent().parent().attr("class","col-md-6 col-li active");
        					$("#gmsother-input").val(strs[i].split("|")[1]);
        					$("#gmsother-input").css("opacity","1");
        				}else{
        					$("input[name='allergic_history'][value='"+strs[i]+"']").attr('checked',true);
        					$("input[name='allergic_history'][value='"+strs[i]+"']").parent().parent().attr("class","col-md-2 col-li active");
        				}
        				//$("input[name='anamnesis'][value='"+strs[i]+"']").attr('checked',true);
        			} 
        		}
        		var remark = rows.remark;
        		if(remark.length>0){
        			$("#demopf").html('');
        			var str1 = "<div class=\"alert alert-dismissable symptom\">";
            		str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"demo_x\" >×</button>";
            		str1 += remark;
        			str1+= "</div>";
        			$("#demopf").html(str1);
        		}
        	}
        },
        error: function(){
        }
    });
}


function loadPatientSignInfo(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSignById",
        data:{
       	 id:id,
       	 cixu:cixu
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if((result.rows!=null)&&(result.status==200)){
            	var rows = result.rows;
            	$("#sg").val(rows.sg);
            	$("#tz").val(rows.tz);
        		$("#sighid").val(rows.id);
        		if(rows.hx =='未测'){
        			//模拟双击显示'未测'
        			$("#huxi").trigger('dblclick');
        		}else{
        			$("#no_huxi").hide();
        			$("#huxi").show();
        			$("#huxi").val(rows.hx);
        			//模拟点击颜色
        			$("#huxi").trigger('keyup');
        		}
        		if(rows.tw =='未测'){
        			$("#tiwen").trigger('dblclick');
        		}else{
        			$("#no_tiwen").hide();
        			$("#tiwen").show();
        			$("#tiwen").val(rows.tw);
        			$("#tiwen").trigger('keyup');
        		}
        		
        		if(rows.mb=='未测'){
        			$("#maibo").trigger('dblclick');
        		}else{
        			$("#no_maibo").hide();
        			$("#maibo").show();
        			$("#maibo").val(rows.mb);
        			$("#maibo").trigger('keyup');
        		}
        		if(rows.szy =='未测'){
        			$("#shuzhangya").trigger('dblclick');
        		}else{
        			$("#no_shuzhangya").hide();
        			$("#shuzhangya").show();
        			$("#shuzhangya").val(rows.szy);
        			$("#shuzhangya").trigger('keyup');
        		}
        		if(rows.ssy =='未测'){
        			$("#shousuoya").trigger('dblclick');
        		}else{
        			$("#no_shousuoya").hide();
        			$("#shousuoya").show();
        			$("#shousuoya").val(rows.ssy);
        			$("#shousuoya").trigger('keyup');
        		}
        		
        		if(rows.spo2 =='未测'){
        			$("#spo2").trigger('dblclick');
        		}else{
        			$("#no_spo2").hide();
        			$("#spo2").show();
        			$("#spo2").val(rows.spo2);
        			$("#spo2").trigger('keyup');
        		}
        		if(rows.pcn =='未测'){
        			$("#pcn").trigger('dblclick');
        		}else{
        			$("#no_pcn").hide();
        			$("#pcn").show();
        			$("#pcn").val(rows.pcn);
        		}
//        		alert(rows.consciousness);
        		if(rows.consciousness==""){
        			rows.consciousness=null;
        		}
        		$("input[name='consciousness'][value="+rows.consciousness+"]").attr("checked",true);
        		
        		$("input[name='consciousness'][value="+rows.consciousness+"]").click().parent().parent().attr("class","col-md-2 active");
                var a = rows.anamnesis;
                $("input[name='anamnesis']").each(function(){
//                	alert(11);
                	$(this).removeAttr("checked")
                	$(this).parent().parent().removeClass("active");
        		});
                $("input[name='anamnesis1'][value='其他']").removeAttr("checked")
				$("input[name='anamnesis1'][value='其他']").parent().parent().removeClass("active");
                $("#hydb1").val('');
				$("#hydb1").css("opacity","0");
        		if(a=='无'){
        			$("input[name='anamnesis'][type='checkbox'][value !='无']").attr("disabled","disabled");
        			$("input[name='anamnesis'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        			$("input[name='anamnesis1'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        		}
        		if(a!=null&&a!=""){
        			var strs= new Array(); // 定义一数组
        			strs=a.split(","); // 字符分割
        			for (var i=0;i<strs.length ;i++ ) 
        			{ 
        				if(strs[i].indexOf("|")>0){
        					$("input[name='anamnesis1'][value='其他']").attr('checked',true);
        					$("input[name='anamnesis1'][value='其他']").parent().parent().attr("class","col-md-6 col-li active");
        					$("#hydb1").val(strs[i].split("|")[1]);
        					$("#hydb1").css("opacity","1");
        				}else{
        					$("input[name='anamnesis'][value='"+strs[i]+"']").click();
        					$("input[name='anamnesis'][value='"+strs[i]+"']").parent().parent().attr("class","col-md-2 col-li active");
        				}
        				// $("input[name='anamnesis'][value='"+strs[i]+"']").attr('checked',true);
        			} 
        		}
        		
        		
        		
          		
          		
          		
          		
          		
          		
          		
          		//显示评级
        		showSignGrade(true);
        	}
       	 
       	
        },
        error: function(){
        }
    });
}


function loadPatientHandle(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientHandleId",
        data:{
       	 id:id,
       	 cixu:cixu
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
        
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
            	var handle5 = $("#handle5").html();
            	$("#cixu").val(rows.cixu);
//            	if(handle5=='-'){
//            		alert('cixu+1');
//            		$("#cixu").val(Num(rows.cixu)+1);
//            	}
        		$("#handleid").val(rows.id);
        		$("#autograde").val("");
        		$("#finalgrade").val("");
        		$("#autograde").val(rows.autograde);
        		$("#finalgrade").val(rows.finalgrade);
        		$("#td_id").val(rows.dividdepartment);
        		$("#dividtime").val(rows.dividtime.substring(0, 16));
        		$("#dividtimee").val(rows.dividtime.substring(0, 16));
        		$("#lastnurse").html(rows.dividenurse);
        		
        		//$('#changereason').val(rows.changereason);
        		
        		$('#changereason').find("option[value='"+rows.changereason+"']").attr("selected",true);
        		$("#reasondetail").val(rows.reasondetail);
        		$("#hljl").val(rows.hljl);
//        		屏蔽liuxj,20190516
        		/*if(rows.supplement==1){
        			$("#supplement").prop("checked",true).css("display","none").parents(".col-li").addClass("active");
        			$("#span_supplement").hide();
        			$("#bulu").css("color","#538bc4");
        			$("#dividtime").removeAttr("readonly");
        			$("#m1_time").show();
        			$("#m2_time").hide();
        			$(".checkDiv2 label").unbind("click");
        		}else{
        			$("#supplement").prop("checked",false).parents(".col-li").removeClass("active");;
//        			$(".checkDiv2 label").unbind("click");
        			$("#dividtime").attr("readonly","readonly").attr("display","none");
        			$("#span_supplement").show();
        			$("#bulu").css("color","black");
        		}*/
        		if(parseInt($("#maxcixu").val())<parseInt($("#cixu").val())){
        			console.log('dayu');
        			$("#dividtime").removeAttr("readonly");
        			$("#supplement").css("display","")
        			$("#m2_time").show();
        			$(".m1_time_new").hide();
        		}
        		if((rows.autograde!=null)&&(rows.autograde!="")){
        			$("#content").prop("class","st-grade btn-"+rows.autograde+"-selected");
        			$("#atuogradearea").html("");
        			var str = '';
        			str += '<div class="st-grade btn-'+rows.autograde+'-selected" style="height:64px;">';
        			str += '<p class="allocatNum" style="line-height: 64px;">'+rows.autoname+'</p>';
        			str += '<p class="allocatUnit">级</p>';
        			str += '</div>';
        			$("#atuogradearea").html(str);
        			$("#grade").html("");
        			var html = '<div class="st-grade  btn-'+rows.autograde+'-selected">';
        			html+= '<div><p class="allocatNum">'+rows.autoname+'</p>';
        			html+= '<p class="allocatUnit">级</p>';
        			html+= '</div></div>';
        			$("#grade").html(html);
        			showRct(rows.autograde,1);
        		}
        		if((rows.finalgrade!=null)&&(rows.finalgrade!="")){
        			$("#content").prop("class","st-grade btn-"+rows.finalgrade+"-selected");
        			$("#finalgradearea").html("");
        			var str = '';
        			str += '<div class="st-grade btn-'+rows.finalgrade+'-selected" style="height:64px;">';
        			str += '<p class="allocatNum" style="line-height: 64px;">'+rows.finalname+'</p>';
        			str += '<p class="allocatUnit">级</p>';
        			str += '</div></div>';
        			$("#finalgradearea").html(str);
        			
        			$("#grade").html("");
        			var html = '<div class="st-grade  btn-'+rows.finalgrade+'-selected">';
        			html+= '<div><p class="allocattxt">改</p><p class="allocatNum">'+rows.finalname+'</p>';
        			html+= '<p class="allocatUnit">级</p>';
        			html+= '</div></div>';
        			$("#grade").html(html);
        			showRct(rows.finalgrade,1);
        		}else{
        			var str = '';
        			str += '<div class="st-grade" style="height:64px"></div>';
        			$("#finalgradearea").html(str);
        		}
        		if(rows.dividdepartment!=""){
        			var str = '';
        			str+='<p class="allocatTitle">';
        			str+='<span>分诊去向></span>';
        			str+='</p>';
        			str+='<p class="icu">'+rows.dividdepartmentname+'</p>';
        			$("#chooseDepart").removeClass("setItem").css({"line-height":"initial"});
        			$("#chooseDepart").html("");
        			$("#chooseDepart").html(str);
        		}
        		if(rows.feijz ==2){
        			$("#feijz").val(2);
        			$("#txm,#trs,#describe,#history").parents(".areaWarn").removeClass("remindArea"); 
        			$("#maibo,#spo2,#shousuoya,#shuzhangya,#tiwen").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
        			$(".curtain,.curtain1").show();
        			$(".curtain-main").hide();
        			$("#dividtime1").addClass("panel-t");
        			$("#jzann .changeName").html('急诊');
        			$("#picDiv").removeClass("st-mark-q").addClass("st-mark-c");
        			if($("#mews").find(".st-icon").length >= 1){
        				$("#mews").removeClass("st-mark-i").addClass("st-mark-c");
        			}else{
        				$("#mews").removeClass("st-mark-c").addClass("st-mark-i");			
        			}
        			if($("#edts").find(".st-icon").length >= 1){
        				$("#edts").removeClass("st-mark-h").addClass("st-mark-c");
        			}else{
        				$("#edts").removeClass("st-mark-c").addClass("st-mark-h");			
        			}
        			if($("#pain").find(".st-icon").length >= 1){
        				$("#pain").removeClass("st-mark-t").addClass("st-mark-c");
        			}else{
        				$("#pain").removeClass("st-mark-c").addClass("st-mark-t");			
        			}
        			if($("#GCS").find(".st-icon").length >= 1){
        				$("#GCS").removeClass("st-mark-d").addClass("st-mark-c");
        			}else{
        				$("#GCS").removeClass("st-mark-c").addClass("st-mark-d");			
        			}
        			if($("#fast").find(".st-icon").length >= 1){
        				$("#fast").removeClass("st-mark-fast-bg").addClass("st-mark-c");
        			}else{
        				$("#fast").removeClass("st-mark-c").addClass("st-mark-fast-bg");			
        			}
        		}else{
        			$("#feijz").val(1);
        			$(".curtain,.curtain1").hide();
        			$(".curtain-main").show();
        			$("#dividtime1").removeClass("panel-t");
        			$("#jzann .changeName").html('非急诊');
        			$("#mews").removeClass("st-mark-c").addClass("st-mark-i");
        			$("#edts").removeClass("st-mark-c").addClass("st-mark-h");
        			$("#pain").removeClass("st-mark-c").addClass("st-mark-t");
        			$("#GCS").removeClass("st-mark-c").addClass("st-mark-d");
        			$("#picDiv").removeClass("st-mark-c").addClass("st-mark-q");
        			$("#fast").removeClass("st-mark-c").addClass("st-mark-fast-bg");
        		}
        	}
        },
        error: function(){
        }
    });
}
function loadPatientSymtpom(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSymtpom",
        data:{
       	 id:id,
       	 cixu:cixu
        },
        dataType: "json",
        success: function(result){
        	console.log(result);
        	if((result!=null)&&(result.status==200)){
        		$("#symptom").html('');
            	var rows = result.rows;
        		var str = $("#symptom").html();
        		var maxgrade="1005";
       	 		for(var i in rows){
       	 			var name = rows[i]["name"];
       	 			var id = rows[i]["id"];
       	 			var grade = rows[i]["grade"];
       	 			if(grade<maxgrade){
       	 				maxgrade=grade;
       	 			}
       	 		    str += "<div class=\"alert alert-dismissable  symptom\">";
       	 			var parentid = rows[i]["parentid"];
       	 			if(id=="10000000003" && parentid==""){
       	 			    str+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearQuick(this)\" name='quickitem' grade=\""+grade+"\"  parentid='' zdyid='10000000003'>×</button>";
       	 			}else{
	       				str+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearQuick(this)\" name='quickitem' grade=\""+grade+"\" parentid=\""+parentid+"\" id=\""+id+"\">×</button>"
       	 			}
	       	 		str+= "<span>"+name+" "+grade.substring(3,4)+"级</span>";
	   			    str+= "</div>";
       	 		}
       	 		$("#symptom").html(str);
       	 		$("#quickgrade").val(maxgrade);
        	}
        },
        error: function(){
        }
    });
}

function loadPatientScore(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientScore",
        data:{
       	 id:id,cixu:cixu
        },
        dataType: "json",
        success: function(result){
       	 	//基础参数赋值
        	//console.log(result);
        	clearGCS();
        	//clearPain();
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
       	 		for(var i in rows){
       	 			var type = rows[i]["type"];
       	 			var score = rows[i]["score"];
       	 			if(type=="PAIN"){
       	 				$("#Pain_Score").html(score);
       	 				var str = '';
       	 				str+='<p class="allocatTitle">';
       	 				str+='<span>疼痛评分></span>';
       	 				str+='</p>';
       	 				str+='<p class="allocatNum" id="Pain_Score1">'+score+'</p>';
       	 				str+='<p class="allocatUnit">分</p>';
       	 				$("#pain").removeClass("setItem").css({"line-height":"initial"}).removeClass("st-mark-c").addClass("st-mark-t");
       	 				$("#pain").html(str);
	       	 			// 评分依据增加内容
	       	 			$("#ttpf").html('');
	       	 			var str1 = "<div class=\"alert alert-dismissable symptom\">";
	       	 			str1+= "<button type=\"button\" class=\"close \" data- dismiss=\"alert\" aria-hidden=\"true\" id=\""+"疼痛评分:"+score+" 分"+"\" onclick=\"clearPain()\">×</button>";
	       	 			str1+= "疼痛评分:"+score+"分";
	       	 		    str1+= "</div>";
	       	 		    var html1 = $("#ttpf").html();
	       	 		    html1 = html1 +str1;
	       	 		    $("#ttpf").html(html1);
	       	 			}
       	 			 if(type=="GCS"){
       	 				$("#GCS_Score").html(score);
       	 				var str = '';
       	 				str+='<p class="allocatTitle">';
       	 				str+='<span>GCS评分></span>';
       	 				str+='</p>';
       	 				str+='<p class="allocatNum" id="GCS_Score2">'+score+'</p>';
       	 				str+='<p class="allocatUnit">分</p>';
       	 				$("#GCS").removeClass("setItem").css({"line-height":"initial"}).removeClass("st-mark-c").addClass("st-mark-d");
       	 				$("#GCS").html(str);
	       	 			//评分依据增加内容
	       	 			$("#gscpf").html('');
	       	 			var str1 = "<div class=\"alert alert-dismissable symptom\">";
	       	 			str1+= "<button type=\"button\" class=\"close \" data- dismiss=\"alert\" aria-hidden=\"true\" id=\""+"GCS评分:"+score+" 分"+"\" onclick=\"clearGCS()\">×</button>";
	       	 			str1+= "GCS评分:"+score+"分";
	       	 		    str1+= "</div>";
	       	 		    var html1 = $("#gscpf").html();
	       	 		    html1 = html1 +str1;
	       	 		    $("#gscpf").html(html1);
       	 			}
       	 			if(type=="FAST"){
       	 				
       	 				if(score.indexOf("F") != -1 ){
       	 					$(".fast-tc-content>div.col-check").find("input[value='F']").click().prop("checked",true);
       	 				}
	       	 			if(score.indexOf("A") != -1 ){
	   	 					$(".fast-tc-content>div.col-check").find("input[value='A']").click().prop("checked",true);
	   	 				}
		       	 		if(score.indexOf("S") != -1 ){
	   	 					$(".fast-tc-content>div.col-check").find("input[value='S']").click().prop("checked",true);
	   	 				}
		       	 		okFAST();
       	 			}
       	 		if(type=="EDTS"){
       	 			$("#EDTSNum").html(score);
       	 		}
       	 		}
        	}
        },
        error: function(){
        }
    });
}

function showPic(){
	$("#picDiv").html("");
	str = '<p class="allocatTitle">';
	str += '<span onclick="showSign();">家属签字></span>';
	str += '</p>';
	str += '<p class="namePic1">';
	str +=  '<img src="#path()/static/bj/images/psign.png" style="height: 50px;">';
	str += '</p>';
	$("#picDiv").html(str);
}

//从his 获取 用户数据
/*function readCard(){
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-就诊卡"
		saveUserbehavior("A32");
	}else{
		//用户行为监控记录"非急诊-就诊卡"
		saveUserbehavior("A107");
	}
	
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientByCardNum",
        data:{
        	cardnum:$("#cardnum").val()
        },
        dataType: "json",
        success: function(result){
        	if((result!=null)&&(result.status==200)){
        		//填入信息
        		var info = result.rows;
        		var dividtime = info.dividtime;
        		var id = info.id;      	

        		if($("#fullname").val()=="" && $("#bornday").val()=="" && $("#gender").val()=="" && $("#tel").val()=="" && $("#idcard").val()==""){
           		    //填入信息
        			if(dividtime!=null && dividtime!=""){
    	        		var date = new Date();
                    	var dividtime2 = new Date(dividtime);
                        
                        if((date.getTime() - dividtime2.getTime())/(24*3600*1000)<=1){
                                queryPatientHandleScore(id);
                        		loadPatientBaseInfo(id);
                        		if($("#returnUrl").val()=="xgpj" || $("#returnUrl").val()=="histroy"){
                        			loadPatientSignInfo(id,$("#maxcixu").val());
                        			loadPatientSymtpom(id,$("#maxcixu").val());
                        			loadPatientSymtpomByType(id,$("#maxcixu").val());
                        			loadPatientHandle(id,$("#maxcixu").val());
                        			loadPatientScore(id,$("#maxcixu").val());
                        		}else{
                        			loadPatientSignInfo(id,"");
                        			loadPatientSymtpom(id,"");
                        			loadPatientSymtpomByType(id,"");
                        			loadPatientHandle(id,"");
                        			loadPatientScore(id,"1");
                        		}
                        }else{
                        	var birthday = info.bornday.substring(0,10);
                    		$("#fullname").val(info.fullname);
                    		$("#bornday").val(birthday);
                    		$("#gender").val(info.gender);
                    		$("#age").val(jsGetAge('',birthday));
                    		$("#tel").val(info.tel);
                    		$("#hisid").val(info.hisid);
                    		if(info.idcard!="" && info.idcard!=""){
                    			$("#idcard").val(info.idcard);
                    		}
                        }
            		}else{
            			var birthday = info.bornday.substring(0,10);
                		$("#fullname").val(info.fullname);
                		$("#bornday").val(birthday);
                		$("#gender").val(info.gender);
                		$("#age").val(jsGetAge('',birthday));
                		$("#tel").val(info.tel);
                		$("#hisid").val(info.hisid);
                		if(info.idcard!="" && info.idcard!=""){
                			$("#idcard").val(info.idcard);
                		}
            		}
        			queryhisinfo2();
           		}else{
           			//判断信息
           			var birthday = info.bornday.substring(0,10);
           			var boa = true;
    	       		if(info.fullname!=$("#fullname").val()){
    	       			boa=false;
    	       		}
    	       		if(birthday!=$("#bornday").val()){
    	       			boa=false;
    	       		}
    	       		if(info.gender!=$("#gender").val()){
    	       			boa=false;
    	       		}
	       			if(info.tel!=$("#tel").val()){
	           			boa=false;
	           		}
	   				if(info.idcard!=$("#idcard").val()){
	           			boa=false;
	           		}
    	       		if(!boa){
    	       			$("#showquxiaobutton").css("display","");
    	       			$("#showquxiaobutton").text("读取就诊卡");
    	       			$("#showquedingbutton").text("更新就诊卡");
    	       			//给back “取消”绑定onclick事件方法“querylocalinfo();”
    	       			$("#showquxiaobutton").attr("onclick","querylocalinfo();");
    	       			back("当前录入信息，与就诊卡中不一致，是否更新就诊卡信息？");
    	       		}
           		}
        	}else{
        		queryhisinfo2();
        	}
        },
        error: function(){
        	toastr.clear();
			toastr.warning("读卡失败");
        }
    });
	
	//getTotalScore();
}
*/

function readCard(type){
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-就诊卡"
		saveUserbehavior("A32");
	}else{
		//用户行为监控记录"非急诊-就诊卡"
		saveUserbehavior("A107");
	}
	if(project_name=='zy' && type=='1'){
		ReadMione();
	}
	if(project_name=='zy' && type=='2'){
		ReadIdCard();
	}
	if($("#cardnum").val()!="" || $("#idcard").val()!=""){
		$(".jiuzhenka").css("background-color","cornflowerblue");
		$.ajax({
	        type: "post",
	        url: "#path()/divid/queryPatientByCardNum",
	        data:{
	        	cardnum:$("#cardnum").val(),
	        	idcard :$("#idcard").val(),
	        	fullname : $("#fullname").val(),
	        	bornday  : $("#bornday").val(),
	            gender   : $("#gender").val()
	        },
	        dataType: "json",
	        success: function(result){
	        	console.log(result);
	        	//background-color: cornflowerblue
//	        	$(".jiuzhenka").css("background-color","cornflowerblue");
	        	if((result!=null)&&(result.status==200)){
	        		console.log(result.rows);
	        		//填入信息
	        		var info = result.rows;
	        		var dividtime = info.dividtime;
	        		var id = info.id;
//	        		if(dividtime!=null && dividtime!=""){
	       		     //if($("#fullname").val()=="" && $("#bornday").val()=="" && $("#gender").val()=="" && $("#tel").val()=="" && $("#idcard").val()==""){
	          		    //填入信息
	   	        		var date = new Date();
	                   	var dividtime2 = new Date(dividtime);
	                   	if((date.getTime() - dividtime2.getTime())/(24*3600*1000)<=1){
	                   		$("#showquxiaobutton").css("display","");
	       	       			$("#showquxiaobutton").text("再次就诊");
	       	       			$("#showquedingbutton").text("信息补录");
	       	       			//给back “取消”绑定onclick事件方法“querylocalinfo();”
	       	       			$("#showquxiaobutton").attr("onclick","querylocalinfo2();");
	       	       			$("#showquedingbutton").attr("onclick","querylocalinfo();");
	       	       			back("患者24小时内已有就诊记录。");
	                   	}else{
	                   		if(project_name =='zy'||($("#fullname").val()=="" && $("#bornday").val()==""&& $("#tel").val()=="" && $("#idcard").val()=="")){
	                   			var birthday = info.bornday.substring(0,10);
	                       		$("#fullname").val(info.fullname);
	                       		$("#bornday").val(birthday);
	                       		$("#gender").val(info.gender);
	                       		$("#age").val(jsGetAge('',birthday));
	                       		$("#tel").val(info.tel);
	                       		$("#hisid").val(info.hisid);
	                       		//$("#cardnum").val(info.cardnum);
	                       		if(info.idcard!="" && info.idcard!=""){
	                       			$("#idcard").val(info.idcard);
	                       		}
	                       		$("#tz").val(info.tz);
	                       		$("#sg").val(info.sg);
	                       		$("#parenttel").val(info.parenttel);
	                       		$("#address").val(info.address);
	                       		$("#memberstel").val(info.memberstel);
	                       		//$("#source").val(info.source);
	                       		$("input[name='source']").each(function(i){
	                       			$("input[name='source'][value="+info.source+"]").attr("checked",true);
	            	        		$("input[name='source'][value="+info.source+"]").parent().parent().attr("class","col-md-2 p0-r col-check active");
	                     	    });
	                       		/*$("input[name='lyfs']").each(function(i){
	                       			$("input[name='lyfs'][value="+info.admission+"]").attr("checked",true);
	            	        		$("input[name='lyfs'][value="+info.admission+"]").parent().parent().attr("class","col-md-2 p0-r col-check active");
	                     	    });*/
	                       		
	                       		$("#reason11").val(info.reason);
	                       		
//	                       		$("input[name='consciousness']").each(function(i){
//	                       			$("input[name='consciousness'][value="+info.consciousness+"]").attr("checked",true);
//	            	        		$("input[name='consciousness'][value="+info.consciousness+"]").parent().parent().attr("class","col-md-2 p0-r col-check active");
//	                     	    });
	                       		$("input[name='anamnesis']").each(function(i){
	                       			
	                       			if(info.anamnesis.indexOf($(this).attr('value')) != -1){
//	                       				alert($(this).attr('value'));
	                       				$(this).click();
//			        					$("input[name='anamnesis'][value='"+info.anamnesis+"']").parent().parent().attr("class","col-md-2 col-li active");
	                       			}
		                       		
	                     	    });
//	                       		alert(info.allergic_history);
	                       		
	                       		$("input[name='allergic_history']").each(function(i){
	                       			if(info.allergic_history.indexOf($(this).attr('value')) != -1){
//	                       				alert($(this).attr('value'));
	                       				$(this).click();
//			        					$("input[name='anamnesis'][value='"+info.anamnesis+"']").parent().parent().attr("class","col-md-2 col-li active");
	                       			}
		                       		/*$("input[name='allergic_history'][value='"+info.allergic_history+"']").attr('checked',true);
		        					$("input[name='allergic_history'][value='"+info.allergic_history+"']").parent().parent().attr("class","col-md-2 col-li active");*/
	                     	    });
	                       		$("#maibo").val(info.mb);
	                       		
	                       		if(info.mb < 50){
	                				$("#maibo").addClass("danger");
	                				if(!$("#maibo").next().hasClass("smtz-green-arrow")){
	                					$("#maibo").after('<i class="smtz-arrow smtz-green-arrow"></i>');
	                				}
	                			}else if(info.mb > 150 ){
	                				$("#maibo").addClass("danger");
	                				if(!$("#maibo").next().hasClass("smtz-red-arrow")){
	                					$("#maibo").after('<i class="smtz-arrow smtz-red-arrow"></i>');
	                				}
	                			}else{
	                				$("#maibo").removeClass("danger");
	                			}
	                       		
	                       		
	                       		$("#spo2").val(info.spo2);
	                       		
	                       		if(info.spo2 < 90){
	                				$("#spo2").addClass("danger");
	                				if(!$("#spo2").next().hasClass("smtz-green-arrow")){
	                					$("#spo2").after('<i class="smtz-arrow smtz-green-arrow"></i>');
	                				}
	                			}else{
	                				$("#spo2").removeClass("danger");
	                			}
	                       		
	                       		$("#huxi").val(info.hx);
	                       		if(info.hx < 8){
	                				$("#huxi").addClass("danger");
	                				if(!$("#huxi").next().hasClass("smtz-green-arrow")){
	                					$("#huxi").after('<i class="smtz-arrow smtz-green-arrow"></i>');
	                				}
	                			}else if(info.hx > 30 ){
	                				$("#huxi").addClass("danger");
	                				if(!$("#huxi").next().hasClass("smtz-red-arrow")){
	                					$("#huxi").after('<i class="smtz-arrow smtz-red-arrow"></i>');
	                				}
	                			}else{
	                				$("#huxi").removeClass("danger");
	                			}
	                       		$("#tiwen").val(info.tw);
	                       		if(info.tw <36){
	                				$("#tiwen").addClass("danger caution");
	                				if(!$("#tiwen").next().hasClass("smtz-green-arrow")){
	                					$("#tiwen").after('<i class="smtz-arrow smtz-green-arrow"></i>');
	                				}
	                			}else if(info.tw >= 38){
	                				$("#tiwen").addClass("danger caution");
	                				if(!$("#tiwen").next().hasClass("glyphicon-arrow-up")){
	                					$("#tiwen").after('<i class="smtz-arrow smtz-red-arrow"></i>');
	                				}
	                			}else{
	                				$("#tiwen").removeClass("danger caution");
	                			}
	                       		$("#pcn").val(info.pcn);
	                       		$("#shousuoya").val(info.ssy);
	                       		var ssy = info.ssy;
	                       		if(ssy < 90 ){
	        						$("#shousuoya").addClass("danger hasarrow");
	        						
	        						if(!$("#shousuoya").next().hasClass("smtz-green-arrow02")){
	        							$("#shousuoya").after('<i class="smtz-arrow02 smtz-green-arrow02"></i>');
	        						}
	        					}else if(ssy >=180){
	        						$("#shousuoya").addClass("danger hasarrow");
	        						
	        						if(!$("#shousuoya").next().hasClass("smtz-red-arrow02")){
	        							$("#shousuoya").after('<i class="smtz-arrow02 smtz-red-arrow02"></i>');
	        						}
	        					}else{
	        						$("#shousuoya").removeClass("danger hasarrow");
	        						
	        					}
	        					if(ssy >= 140){
	        						$("#shousuoya").addClass("caution");
	        					}else{
	        						$("#shousuoya").removeClass("caution");
	        					}
	                       		
	                       		$("#shuzhangya").val(info.szy);
	                       		var szy = info.szy;
	                       		if(szy < 60 ){
	                				$("#shuzhangya").addClass("danger hasarrow");
	                				
	                				if(!$("#shuzhangya").next().hasClass("smtz-green-arrow02")){
	                					$("#shuzhangya").after('<i class="smtz-arrow02 smtz-green-arrow02"></i>');
	                				}
	                			}else if(szy >=110){
	                				$("#shuzhangya").addClass("danger hasarrow");
	                				if(!$("#shuzhangya").next().hasClass("smtz-red-arrow02")){
	                					$("#shuzhangya").after('<i class="smtz-arrow02 smtz-red-arrow02"></i>');
	                				}
	                			}else{
	                				$("#shuzhangya").removeClass("danger hasarrow");
	                			}
	                			if(szy >= 90){
	                				$("#shuzhangya").addClass("caution");
	                			}else{
	                				$("#shuzhangya").removeClass("caution");
	                			}
	                       		
	                       		
	                   		}else{
	                   			//判断信息
	                      			var birthday = info.bornday.substring(0,10);
	                      			var boa = true;
	               	       		if(info.fullname!=$("#fullname").val()){
	               	       			boa=false;
	               	       		}
	               	       		if(birthday!=$("#bornday").val()){
	               	       			boa=false;
	               	       		}
	               	       		if(info.gender!=$("#gender").val()){
	               	       			boa=false;
	               	       		}
	           	       			if(info.tel!=$("#tel").val()){
	           	           			boa=false;
	           	           		}
	           	   				if(info.idcard!=$("#idcard").val()){
	           	           			boa=false;
	           	           		}
	               	       		if(!boa){
	               	       			$("#showquxiaobutton").css("display","");
	               	       			$("#showquxiaobutton").text("读取就诊卡");
	               	       			$("#showquedingbutton").text("更新就诊卡");
	               	       			//给back “取消”绑定onclick事件方法“querylocalinfo();”
	               	       			$("#showquxiaobutton").attr("onclick","querylocalinfo();");
	               	       			back("当前录入信息，与就诊卡中不一致，是否更新就诊卡信息？");
	               	       		}else{
	               	       			//判断是否是his推过来的数据，是的话增加id，进行更新操作
	               	       			findHisGH($("#cardnum").val());
	               	       		}
	                   		}
//	                   		queryhisinfo2();
	                     }
//	           		}else{
////	           			queryhisinfo2();
//	           		}
	        	}else{
	        		//读新his数据，liuxj2090731
//	        		queryHisPatientByCardNum();
	        		toastr.warning("无此就诊卡号，请重新输入。");
	        	}
	        },
	        error: function(){
	        	toastr.clear();
				toastr.warning("读卡失败");
	        }
	    });
	}else{
		$(".jiuzhenka").css("background-color","");
	}
	
	//getTotalScore();
}
function queryHisPatientByCardNum(){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryHisPatientByCardNum",
        data:{
        	cardnum:$("#cardnum").val()
        },
        dataType: "json",
        success: function(result){
        	if((result!=null)&&(result.status==200)){
        		//填入信息
        		var info = result.rows;
                if(info.bornday!=null && info.bornday.length>9){
                	var birthday = info.bornday.substring(0,10);
                	$("#bornday").val(birthday);
                } 
        		$("#fullname").val(info.fullname);
        		$("#gender").val(info.gender);
        		$("#age").val(jsGetAge('',birthday));
        		$("#tel").val(info.tel);
        		$("#hisid").val(info.hisid);
        		if(info.idcard!="" && info.idcard!=""){
        			$("#idcard").val(info.idcard);
        		}
        		$("#parenttel").val(info.parenttel);
        		$("#memberstel").val(info.memberstel);
        		$("#address").val(info.address);
        	}else{
        		queryhisinfo2();
        	}
        	       
        },
        error: function(){
        	toastr.clear();
			toastr.warning("读卡失败");
        }
    });
}
function querylocalinfo(){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientByCardNum",
        data:{
        	cardnum:$("#cardnum").val()
        },
        dataType: "json",
        success: function(result){
        	if((result!=null)&&(result.status==200)){
        		//填入信息
        		var info = result.rows;
        		var dividtime = info.dividtime;
        		var id = info.id;      	

        		if(dividtime!=null && dividtime!=""){
	        		var date = new Date();
	        	    var year = date.getFullYear();
	        	    var month = date.getMonth() + 1;
	        	    var strDate = date.getDate();
	                var hours = date.getHours(); //小时 
	                var minutes = date.getMinutes(); //分 
	                var seconds = date.getSeconds(); //秒 
	                
                	var dividtime2 = new Date(dividtime);
                	var year2 = dividtime2.getFullYear();
            	    var month2 = dividtime2.getMonth() + 1;
            	    var strDate2 = dividtime2.getDate();
                    var hours2 = dividtime2.getHours(); //小时 
                    var minutes2 = dividtime2.getMinutes(); //分 
                    var seconds2 = dividtime2.getSeconds(); //秒 
                    
                    if((date.getTime() - dividtime2.getTime())/(24*3600*1000)<=1){
	                    queryPatientHandleScore(id);
	            		loadPatientBaseInfo(id);
	            		if($("#returnUrl").val()=="xgpj" || $("#returnUrl").val()=="histroy"){
	            			loadPatientSignInfo(id,$("#maxcixu").val());
	            			loadPatientSymtpom(id,$("#maxcixu").val());
	            			loadPatientSymtpomByType(id,$("#maxcixu").val());
	            			loadPatientHandle(id,$("#maxcixu").val());
	            			loadPatientScore(id,$("#maxcixu").val());
	            		}else{
	            			loadPatientSignInfo(id,"");
	            			loadPatientSymtpom(id,"");
	            			loadPatientSymtpomByType(id,"");
	            			loadPatientHandle(id,"");
	            			loadPatientScore(id,"1");
	            		}
                    }else{
                    	var birthday = info.bornday.substring(0,10);
                		$("#fullname").val(info.fullname);
                		$("#bornday").val(birthday);
                		$("#gender").val(info.gender);
                		$("#age").val(jsGetAge('',birthday));
                		$("#tel").val(info.tel);
                		$("#hisid").val(info.hisid);
                		if(info.idcard!="" && info.idcard!=""){
                			$("#idcard").val(info.idcard);
                		}
                    }
        		}else{
        			var birthday = info.bornday.substring(0,10);
            		$("#fullname").val(info.fullname);
            		$("#bornday").val(birthday);
            		$("#gender").val(info.gender);
            		$("#age").val(jsGetAge('',birthday));
            		$("#tel").val(info.tel);
            		$("#hisid").val(info.hisid);
            		if(info.idcard!="" && info.idcard!=""){
            			$("#idcard").val(info.idcard);
            		}
        		}
                
        	}else{
        		queryhisinfo2();
        	}
        	       
        },
        error: function(){
        	toastr.clear();
			toastr.warning("读卡失败");
        }
    });
}

function queryhisinfo(){
	//调用身份证接口 
	 $.ajax({
       type: "post",
       url: "#path()/divid/queryHisInfo",
       timeout:14000, 
       data:{
       	cardnum:$("#cardnum").val()
       },
       dataType: "json",
       success: function(result){
       	if((result!=null)&&(result.status==200)){
       		//填入信息
       		
       		var info = result.rows;

       		var birthday = info.birthday.substring(0,10);
       		$("#fullname").val(info.patient_name);
       		$("#bornday").val(birthday);
       		$("#gender").val(info.sex);
       		$("#age").val(jsGetAge('',birthday));
       		
       		var len1= typeof(info.home_tel);
       		if( len1== "number"){
       			$("#tel").val(info.home_tel);
       		}
       		//家属联系方式换成身份证号
       		//2018-08-新增家属联系方式
       		/*var len2= typeof(info.relation_tel);
       		if(len2== "number"){
       			$("#memberstel").val(info.relation_tel);
       		}*/
       	    //身份证
       		
       		
       		if(typeof(info.social_no)=="string"){
       				$("#idcard").val(info.social_no);
       		}
       		//2019-01-27 新增挂号时间
       		
       		var gh_date = info.gh_date[0];
       		gh_date = gh_date.substring(0,19);
       		if(gh_date!="null"){
       			$("#registertime").val(gh_date);	
       		}
       		$("#hisid").val(info.patient_id);
       		
       		var date = new Date();
       	    var year = date.getFullYear();
       	    var month = date.getMonth() + 1;
       	    var strDate = date.getDate();
               var hours = date.getHours(); //小时 
               var minutes = date.getMinutes(); //分 
               var seconds = date.getSeconds(); //秒 
               if (month > 0 && month<10) {
               		month = "0" + month;
               }
               if (strDate > 0 && strDate<10) {
               	strDate = "0" + strDate;
               }
               if (hours > 0 && hours<10) {
               	hours = "0" + hours;
               }
               if (minutes > 0 && minutes<10) {
               	minutes = "0" + minutes;
               }
               if (seconds >= 0 && seconds<10) {
               	seconds = "0" + seconds;
               }
               var dividtime = year+"-"+month+"-"+strDate+" "+hours+":"+minutes+":"+seconds;
               $("#dividtime").val(dividtime);
       	}else{
       		toastr.clear();
   			toastr.warning("读卡失败")
       	}
       },
       error: function(){
       	toastr.clear();
			toastr.warning("读卡失败")
       }
   });
}

function queryhisinfo2(){
	//调用身份证接口 
	 $.ajax({
       type: "post",
       url: "#path()/divid/queryHisInfo",
       timeout:14000, 
       data:{
       	cardnum:$("#cardnum").val()
       },
       dataType: "json",
       success: function(result){
       	if((result!=null)&&(result.status==200)){
       		var info = result.rows;
       		
       		var birthday = info.birthday.substring(0,10);
       		if($("#fullname").val()=="" && $("#bornday").val()==""&& $("#tel").val()=="" && $("#idcard").val()==""){
       		    //填入信息
       			$("#fullname").val(info.patient_name);
           		$("#bornday").val(birthday);
           		$("#gender").val(info.sex);
           		$("#age").val(jsGetAge('',birthday));
           		
           		var len1= typeof(info.home_tel);
           		if( len1== "number"){
           			$("#tel").val(info.home_tel);
           		}
           		//家属联系方式换成身份证号
           		//2018-08-新增家属联系方式
           		/*var len2= typeof(info.relation_tel);
           		if(len2== "number"){
           			$("#memberstel").val(info.relation_tel);
           		}*/
           	    //身份证
           		if(typeof(info.social_no)=="string"){
           				$("#idcard").val(info.social_no);
           		}
           		//2019-01-27 新增挂号时间
           		
           		var gh_date = info.gh_date[0];
           		gh_date = gh_date.substring(0,19);
           		if(gh_date!="null"){
           			$("#registertime").val(gh_date);	
           		}
           		
           		//$("#idcard").val(info.idcard);
           		$("#hisid").val(info.patient_id);
           		
           		var date = new Date();
           	    var year = date.getFullYear();
           	    var month = date.getMonth() + 1;
           	    var strDate = date.getDate();
                   var hours = date.getHours(); //小时 
                   var minutes = date.getMinutes(); //分 
                   var seconds = date.getSeconds(); //秒 
                   if (month > 0 && month<10) {
                   		month = "0" + month;
                   }
                   if (strDate > 0 && strDate<10) {
                   	strDate = "0" + strDate;
                   }
                   if (hours > 0 && hours<10) {
                   	hours = "0" + hours;
                   }
                   if (minutes > 0 && minutes<10) {
                   	minutes = "0" + minutes;
                   }
                   if (seconds >= 0 && seconds<10) {
                   	seconds = "0" + seconds;
                   }
                   var dividtime = year+"-"+month+"-"+strDate+" "+hours+":"+minutes+":"+seconds;
                   $("#dividtime").val(dividtime);
       		}else{
       			//判断信息
       			var boa = true;
	       		if(info.patient_name!=$("#fullname").val()){
	       			boa=false;
	       		}
	       		if(birthday!=$("#bornday").val()){
	       			boa=false;
	       		}
	       		if(info.sex!=$("#gender").val()){
	       			boa=false;
	       		}
	       		var len1= typeof(info.home_tel);
	       		if( len1== "number"){
	       			if(info.home_tel!=$("#tel").val()){
	           			boa=false;
	           		}
	       		}
	       		if(typeof(info.social_no)=="string"){
	   				if(info.social_no!=$("#idcard").val()){
	           			boa=false;
	           		}
	   		    }
	       		if(!boa){
	       			$("#showquxiaobutton").css("display","");
	       			//给back “取消”绑定onclick事件方法“queryhisinfo();”
	       			$("#showquxiaobutton").attr("onclick","queryhisinfo();");
	       			back("读卡信息存在更新，是否现在更新？");
	       		}
       		}
       	}else{
       		toastr.clear();
   			toastr.warning("读卡失败")
       	}
       },
       error: function(){
       	toastr.clear();
//			toastr.warning("读卡失败")
       }
   });
}

$(function(){  
	$.ajax({
        type: "post",
        url: "#path()/index/queryWarningInfo",
        data:{
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
        			var map = result.rows;
        			g1 = map["a1001"];
        			g2 = map["a1002"];
        			g3 = map["a1003"];
        			g4 = map["a1004"];
        			var length =g1.length+g2.length+g3.length+g4.length;
        			if(length >0){
        				$("#warnNum").html("共有"+length+"条报警消息等待处理.....");
            			$("#warnNum2").html("共有"+length+"条报警消息等待处理.....");
        			}
        		}
        	}
		},
		error : function() {
		}
	});

});  

function clearGCS(){
	$("input[name='GCS_2']").attr("checked","checked");
	$(".reviewBox p").removeClass('active1');
	$(".reviewBox div").removeClass('active1');
	
//	$("input[name='GCS_2']").removeAttr("checked");
	$("input[name='GCS_1']").attr("checked","checked");
	$("input[name='GCS_1']").removeAttr("checked");
	$("input[name='GCS_3']").attr("checked","checked");
	$("input[name='GCS_3']").removeAttr("checked");
	var html ="<div class=\"st-icon\" id=\"beginGCS\"> <span class=\"setIcon iconP\"></span>GCS评分 </div>";
	if($("#jzann .changeName").text().trim() == "非急诊"){
		$("#GCS").attr("class","st-mark st-mark-d setItem");
	}else{
		$("#GCS").attr("class","st-mark st-mark-c setItem");
	}
	$("#GCS").css("line-height",$("#GCS").css("height"));
	$("#GCS").html(html);
	$("#GCS_Score").html(0);
	$("#GCS_Score2").html(0);
	$("#GCSNum").html(0);
	$("#gscpf").html('');
	$("#GCS_1").val('0');
	$("#GCS_2").val('0');
	$("#GCS_3").val('0');
}

function clearPain(){
	var html =" <div class=\"st-icon\"> <span class=\"setIcon iconT\"></span>疼痛评分 </div>";
	$("#pain").html(html);
	$("#Pain_Score").html(0);
	if($("#jzann .changeName").text().trim() == "非急诊"){
		$("#pain").attr("class","st-mark st-mark-t setItem");
	}else{
		$("#pain").attr("class","st-mark st-mark-c setItem");
	}
	$("#pain").css("line-height",$("#pain").css("height"));
//	$("#Pain_Score1").html(0);
//	$("#painNum").html(0);
	$("#ttpf").html('');
}
function showdcpi(){
	var cixu = $("#cixu").val();
	var maxcixu = $("#maxcixu").val();
	var autograde = $("#autograde").val();
	var finalgrade = $("#finalgrade").val();
	var grade="";
	if(finalgrade==""){
		grade=autograde;
	}else{
		grade=finalgrade;
	}
	if(!(grade==null||grade=="")){
		grade = grade.substring(grade.length-1,grade.length);
	}
	//$("#handle2").text(grade+"级");
	if(cixu!=""){
		cixu = Number(cixu);
	}
	if(maxcixu!=""){
		maxcixu = Number(maxcixu);
	}
	if(cixu==1){
		$("#handle1").text("-");
		$("#handle0").find(".label-left").css("background","#000000");
		$("#handle4").find(".label-right").css("background","#bb0707");
		$("#handle1").parent().css("background","#898989");
	}
	if(cixu>maxcixu){
		$("#handle5").parent().css("background","#898989");
		$("#handle5").text("-");
		$("#handle4").find(".label-right").css("background","#000000");
		$("#handle0").find(".label-left").css("background","#bb0707");
	}
	$("#handle3").text(""+numberConvertToUppercase(cixu)+"次评级");
	if(cixu>1){
		$("#handle1").text(cixu-1);
		$("#handle1").parent().css("background","#d61946");
	}
	if(cixu<=maxcixu){
		$("#handle5").text(cixu+1);
		$("#handle5").parent().css("background","#d61946");
	}
}
function gotofenjipage(d){
	var cixu2 = $("#cixu").val();
	var cixu = Number(cixu2);
	var maxcixu2 = $("#maxcixu").val();
	var maxcixu = Number(maxcixu2);
	var id = $("#id").val();
	if($(d).attr("id")=="handle0"){
		
		if($("#handle1").text()!="-" && cixu>1){
			loadPatientSignInfo(id,$("#handle1").text());
			loadPatientSymtpomByType(id,$("#handle1").text());
			loadPatientSymtpom(id,$("#handle1").text());
			loadPatientHandle(id,$("#handle1").text());
			loadPatientScore(id,$("#handle1").text());
			lastcixu(id,$("#handle1").text());
			nextcixu(id,$("#handle1").text());
			$("#cixu").val(cixu-1);
			$("#handle0").find(".label-left").css("background","#bb0707");
			$("#handle4").find(".label-right").css("background","#333");
		}else{
			return;
		}
	}else if($(d).attr("id")=="handle4"){
		if($("#handle5").text()!="-" && cixu < maxcixu){
			loadPatientSignInfo(id,$("#handle5").text());
			loadPatientSymtpomByType(id,$("#handle5").text());
			loadPatientSymtpom(id,$("#handle5").text());
			loadPatientHandle(id,$("#handle5").text());
			loadPatientScore(id,$("#handle5").text());
			lastcixu(id,$("#handle5").text());
			nextcixu(id,$("#handle5").text());
			$("#cixu").val(cixu+1);
			$("#handle4").find(".label-right").css("background","#bb0707");
			$("#handle0").find(".label-left").css("background","#bb0707");
		}else if($("#handle5").text()=="-"){
			return;
		}else if(cixu >= maxcixu){
			$("#againpj").modal("show");
//			alert(id);
//			alert(maxcixu);
//			alert(cixu);
//			loadPatientSignInfo(id,maxcixu);
//			loadPatientSymtpomByType(id,maxcixu);
//			loadPatientSymtpom(id,maxcixu);
//			loadPatientHandle(id,maxcixu);
//			loadPatientScore(id,maxcixu);
//			lastcixu(id,cixu+1);
//			nextcixu(id,maxcixu);
//			$("#cixu").val(cixu+1);
//			var goon = $("#againpj").show();
			
//			$(d).find(".label-left").css("background","#bb0707");
		}
	}
//	setTimeout(showdcpi,1000);
	showdcpi();
}



//获取历次评级数量
function queryPatientHandleScore(pid){
$.ajax({
    type: "post",
    url: "#path()/divid/queryPatientHandleScore",
    data:{
   	 pid:pid
    },
    dataType: "json",
    async:false,
    success: function(result){
    	if(result!=null){
    		if(result.status==200){
    			if(result.rows.length>0){ 
    				$("#maxcixu").val(result.rows.length);
    				//最后一次保存状态
    				var savestatus =result.rows[result.rows.length-1]["savestatus"];   				
    				if( $("#returnUrl").val()=="xgpj" || $("#returnUrl").val()=="histroy"|| savestatus=="save" && $("#returnUrl").val()=="divid" ){
    					$("#nurseqianm").css("display","none");
    					$("#lastnurseqianm").css("display","block");
    					$("#showsffenji").css("display","block");
    					$(".cover").addClass("cover2");
    					if($(window).width()>1366 && $(window).height()>=700){
	    					var h = $(".content").outerHeight();
	    					var h8 = $(".footer-main").outerHeight();
	    					var h9 = h-h8-10;
	    					var h10 = $(".give .panel").eq(0).outerHeight();
	    					var h11 = h9-10-h10;
	    					var h7 = $(".give .rateItem .st-mark").css("margin-bottom").replace("px","");
	    					var h1 = h11-30-parseFloat(h7)*8;
	    					var h4 = $("#print").outerHeight();
	    					var h5 = $("#jzann").outerHeight();
	    					var h6 = $(".right-grade").height();
	    					var h2 = h1-h4-h5-h6;
	    					var h3 = h2/6;
	    					hh = h3;  					
	    					$(".give .rateItem .st-mark").css({
	    						"height":h3+"px",
	    						"line-height":h3+"px"
	    					});  
    					}
    				}
    			}
    		}
    	}
    },
    error: function(){
    }
});
}
function show(){
	var path ='#(path)';
	$("#signimg").attr("src","#path()"+path);
	$("#pingji").show();
	setTimeout("$('#pingji').hide()",3000);
}

function showSymptom(th,pid,name,level,grade){
	if($(th).attr("Class")!=null && $(th).attr("Class")=="active"){
		$(th).removeClass("active");
	}else{
		$(th).toggleClass("active").siblings().removeClass("active");
	}
	if(level!=""&&level!=3){
		getSymptom(pid,level+1);
	}
	if(level==1){
		$("#level_1_id").val(pid);
		$("#level_1_name").val(name);
		active1(2);
	}
	if(level==2){
		
		$("#level_2_id").val(pid);
		$("#level_2_name").val(name);
		active1(3);
	}
	if(level==3){
		$("#level_3_id").val(pid);
		$("#level_3_name").val(name);
		
		var parentid= $("#level_2_id").val();
		
		$("#symptomhide").val($("#symptom").html());
		
		var html = $("#quickgrade_ids").val();
		
		if(html!=""){
			var sym= new Array(); //定义一数组 
			sym = html.split("qwe");
			
			for(var i=0;i<sym.length;i++){
				if(sym[i].indexOf(parentid)!=-1){
					sym.splice(i,1);
				}
			}
			html="";
			for(var i=0;i<sym.length;i++){
				if(i<sym.length-1){
					html+=sym[i]+"qwe";
				}else{
					html+=sym[i];
				}
				
			}		
			html+= "<div class=\"alert alert-dismissable\">";
			html+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" ";
			html+= "onclick='delkuaisugrade(this);' aria-hidden=\"true\" parentid=\""+parentid+"\" grade=\""+grade+"\" id=\""+pid+"\">×</button>"
			//html+= $("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name;
			html+= "<span>"+$("#level_1_name").val()+" | "+$("#level_2_name").val()+" | "+ name+"</span>";
			html+= "</div>";
		}else{
			html+= "<div class=\"alert alert-dismissable\">";
			html+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" ";
			html+= "onclick='delkuaisugrade(this);' aria-hidden=\"true\" parentid=\""+parentid+"\" grade=\""+grade+"\" id=\""+pid+"\">×</button>"
			//html+= $("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name;
			html+= "<span>"+$("#level_1_name").val()+" | "+$("#level_2_name").val()+" | "+ name+"</span>";
			html+= "</div>";
		}
		$(".xxx").each(function(){
			if($(this).attr("parentid")==parentid){
				$(this).parent().remove();
			}
		});
		
	    $("#quickgrade_ids").val(html);	       
	}
}

//function getSymptom(pid,level){
//	alert('getSymptom');
//	$.ajax({
//        type: "post",
//        url: "#path()/divid/getSymptom",
//        data:{
//       	 pid:pid,
//       	 level:level
//        },
//        dataType: "json",
//        success: function(result){
//        	if(result!=null){
//        		if(result.status==200){
//        			$("#level").html("");
//        			alert(22);
//        			var str = "";
//       	 			var list = result.rows;
//       	 			for(var i in list){
//       	 				var name = list[i]["name"].trim();
//       	 				var xxx = list[i]["id"];
//       	 				var grade = list[i]["grade"];
//       	 				str+="<li ksid=\""+xxx+"\" onclick='showSymptom(this,\""+xxx+"\",\"" + name + "\","+level+",\""+grade+"\")'>"+name+"</li>"
//       	 			}
//       	 			alert(333);
//       	 			$("#level").html(str);
//        		}
//        	}
//        },
//        error: function(){
//        }
//    });
//}

//删除 快速评级时候
function clearQuick(btn){
	
	var str = [];
	console.log($(btn).parent().siblings().find("button[name='quickitem']").length);
	$(btn).parent().siblings().find("button[name='quickitem']").each(function(i){
		str.push($(this).attr("grade"));
	});
	$("#quickgrade").val("");
	//是唯一评级 清空 自动评级 否则 按其他评级结果显示
	if(str.length>0){
		//先获取快速分级症状中等级最高的那个
		grade = min(str);
		   
		$("#quickgrade").val(grade);
		
		//再取所有评分表里等级最高的
	    grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}else{
		showRct('');
		$("#atuogradearea").html("");
		$("#atuogradearea").html("<div class='st-grade' style='height:64px'></div>");
		
		if($("#finalgrade").val()==""){
			$("#grade").html("");
		}
		$("#autograde").val('');
	}
	
	/*if(checkalone("quickgrade")){
		if($("#finalgrade").val()==""){
			$("#grade").html("");
		}
		$("#atuogradearea").html("");
		$("#atuogradearea").html("<div class='st-grade' style='height:64px'></div>");
	}else{
		//获取所有评分表里等级最高的
	    grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}*/
	//2019-4-19 于世明 多于quickgrade一种时才进入
	if(!checkalone("quickgrade")){
		//获取所有评分表里等级最高的
	    grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}
	
}

//读取监护仪参数
function readMach(){
	
	if(!showDemo){
		return;
	}
	
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-导入生命体征"
		saveUserbehavior("A33");
	}else{
		//用户行为监控记录"非急诊-导入生命体征"
		saveUserbehavior("A119");
	}
	//var status = $("#mach_status").html();
	//if(status=="未连接"){
		//toastr.clear();
		//toastr.warning("监护仪未连接")
		//return;
	//}
	
	 $.ajax({
      type: "post",
      url: "#path()/divid/querySignTemp",
      data:{
      	
      },
      dataType: "json",
      success: function(result){
      	if((result!=null)&&(result.status==200)){
      		//填入信息
      		var info = result.rows;
      		$("#tiwen").val(info.tiwen);
      		$("#shuzhangya").val(info.szy);
      		$("#shousuoya").val(info.ssy);
      		$("#spo2").val(info.spo2);
      		$("#maibo").val(info.maibo);
      		
      		//模拟点击颜色
      		$("#tiwen").trigger('keyup');
      		$("#shuzhangya").trigger('keyup');
      		$("#shousuoya").trigger('keyup');
      		$("#spo2").trigger('keyup');
      		$("#maibo").trigger('keyup');
      		
      		if(info.huxi!="0"){
      			$("#huxi").val(info.huxi);
      			$("#huxi").trigger('keyup');
      		}
      		
      		showSignGrade(false);
      		
      	}else{
      		toastr.clear();
  			toastr.warning("读取失败")
      	}
      },
      error: function(){
      	toastr.clear();
			toastr.warning("读取失败")
      }
  });
	
}


//计算 体征 等级 并显示
function showSignGrade(isload){
		var grade_name ="4";
		var beiz = "级（普通）";
		if(($("#tiwen").val()=="")&&($("#shousuoya").val()=="")&&($("#spo2").val()=="")&&($("#maibo").val()=="")){
			//处理未测对评级影响，liuxj20190712
			$("#signgrade").val('');
			 $("#signpf").html('');
			 grade = getHigestGrade();
			 if(typeof(grade) == 'undefined'){
				 $("#grade").html("");
				 $("#atuogradearea").html("");
				 $("#atuogradearea").html("<div class='st-grade' style='height:64px'></div>");
				 showAutoGrade('');
			 }else{
				//展示自动评级
				 showAutoGrade(grade);
			 }
			return;
		}
		var tiwen = parseFloat($("#tiwen").val());
		
		var no_maibo =$("#tiwen").html()
		var ssy = parseInt($("#shousuoya").val());
		var spo2 = parseInt($("#spo2").val());
		var maibo = parseInt($("#maibo").val());
		//①心率>180次/分或<40次/分②收缩压<80mmHg③SpO2 <80%④体温>41℃
		if((maibo>180)||(maibo<40)||(ssy<80)||(spo2<80)||(tiwen>41.0)){
			grade_name = "1";
			beiz = "级(危急)";
		}
		//①心率150-180次/分或40-50次/分②收缩压>200mmHg③SpO2 80-90%
		else if(((maibo>150)&&(maibo<=180))||((maibo>=40)&&(maibo<=50))||(ssy>200)||((ssy>70)&&(ssy<80))||((spo2>=80)&&(spo2<90))){
			grade_name = "2";
			beiz = "级(危重)";
		}
		//①心率100-150次/分或50-55次/分②收缩压180-200mmHg或80-90mmHg③SpO2 90-94%
		else if(((maibo>100)&&(maibo<=150))||((maibo>50)&&(maibo<=55))||((ssy>=180)&&(ssy<=200))||((ssy>=80)&&(ssy<90))||((spo2>=90)&&(spo2<=94))){
			grade_name = "3";
			beiz = "级(紧急)";
		}
		//①心率55-100次/分②收缩压90-180mmHg③SpO2 >95%
		else if(((maibo>=55)&&(maibo<=100))||((ssy>=90)&&(ssy<180))||(spo2>=95)){
			grade_name = "4";
			beiz = "级(普通)";
		}
		var grade = "100"+grade_name;
		$("#signgrade").val(grade);
		//评分依据增加内容
		$("#signpf").html('');
		var str1 = "<div class=\"alert alert-dismissable symptom\">";
		str1+= "生命体征评级"+grade_name+beiz;
	    str1+= "</div>";
	    $("#signpf").html(str1);
	    if(!isload){
	    	//获取所有评分表里等级最高的
	    	grade = getHigestGrade();
	    	//展示自动评级
	    	showAutoGrade(grade);
	    }
}

//动态加载费别下拉框列表
function showcategorylist(){
	$.ajax({
	      type: "post",
	      url: "#path()/index/queryDataDictionary",
	      data:{
	      	sort:"1"
	      },
	      dataType: "json",
	      success: function(result){
	      	if((result!=null)&&(result.status==200)){
	      		var strhtml = "";
	      		for(var i=0;i<result.rows.length;i++){
	      			if(result.rows[i].val=="7"){
	      				strhtml += "<option value="+result.rows[i].val+" selected='selected'>"+result.rows[i].name+"</option>";
	      			}else{
	      				strhtml += "<option value="+result.rows[i].val+">"+result.rows[i].name+"</option>";
	      			}
	      		}
	      		$("#category").html(strhtml);
	      	}else{
	      		toastr.clear();
	  			toastr.warning("读取失败")
	      	}
	      },
	      error: function(){
	      	toastr.clear();
				toastr.warning("读取失败")
	      }
	  });
}

//动态加载来源内容列表
function showtxmlist(){
	$.ajax({
	      type: "post",
	      url: "#path()/index/queryDataDictionary",
	      data:{
	      	sort:"2"
	      },
	      dataType: "json",
	      success: function(result){
	      	if((result!=null)&&(result.status==200)){
	      		var strhtml = ""
	      		for(var i=0;i<result.rows.length;i++){
	      			if(i==0){
	      				strhtml += '<div class="col-md-2 p0-r col-check" style="width:13%">';
	      				strhtml += '<label>'+result.rows[i].name+'<span class="checked-static radio-static">';
	      				strhtml += '<input type="radio" name="source" value='+result.rows[i].name+'>';
	      				strhtml += '<i></i></span></label></div>';
	      			}else if(i==result.rows.length-1){
	      				strhtml += '<div class="col-md-2 p0-r col-check" style="width:8%">';
	      				strhtml += '<label>'+result.rows[i].name+'<span class="checked-static radio-static">';
	      				strhtml += '<input type="radio" name="source" value='+result.rows[i].name+'>';
	      				strhtml += '<i></i></span></label></div>';
	      			}else{
	      				strhtml += '<div class="col-md-2 p0-r col-check">';
	      				strhtml += '<label>'+result.rows[i].name+'<span class="checked-static radio-static">';
	      				strhtml += '<input type="radio" name="source" value='+result.rows[i].name+'>';
	      				strhtml += '<i></i></span></label></div>';
	      			}
	      		}
	      		$("#txm").html(strhtml);
	      	}else{
	      		toastr.clear();
	  			toastr.warning("读取失败")
	      	}
	      },
	      error: function(){
	      	toastr.clear();
				toastr.warning("读取失败")
	      }
	  });
}

//动态加载来院方式内容列表
function showtrslist(){
	$.ajax({
	      type: "post",
	      url: "#path()/index/queryDataDictionary",
	      data:{
	      	sort:"3"
	      },
	      dataType: "json",
	      success: function(result){
	      	if((result!=null)&&(result.status==200)){
	      		var strhtml = ""
	      		for(var i=0;i<result.rows.length;i++){
	      			strhtml += '<div class="col-md-2"><label>'+result.rows[i].name+'<span class="checked-static radio-static">';
	      			strhtml += '<input type="radio" name="lyfs" value='+result.rows[i].name+'>';
	      			strhtml += '<i></i></span></label></div>';
	      		}
	      		$("#trs").html(strhtml);
	      	}else{
	      		toastr.clear();
	  			toastr.warning("读取失败")
	      	}
	      },
	      error: function(){
	      	toastr.clear();
				toastr.warning("读取失败")
	      }
	  });
}

//动态加载意识状态内容列表
function showdescribelist(){
	$.ajax({
	      type: "post",
	      url: "#path()/index/queryDataDictionary",
	      data:{
	      	sort:"4"
	      },
	      dataType: "json",
	      success: function(result){
	      	if((result!=null)&&(result.status==200)){
	      		var strhtml = ""
	      		for(var i=0;i<result.rows.length;i++){
	      			strhtml += '<div class="col-md-2"><label>'+result.rows[i].name;
	      			strhtml += '<span class="checked-static radio-static">';
	      			strhtml += '<input type="radio" name="consciousness" value='+result.rows[i].name+'>';
	      			strhtml += '<i></i></span></label></div>';
	      		}
	      		$("#describe").html(strhtml);
	      	}else{
	      		toastr.clear();
	  			toastr.warning("读取失败")
	      	}
	      },
	      error: function(){
	      	toastr.clear();
				toastr.warning("读取失败")
	      }
	  });
}

//动态加载既往病史内容列表
function showhistorylist(){
	$.ajax({
	      type: "post",
	      url: "#path()/index/queryDataDictionary",
	      data:{
	      	sort:"5"
	      },
	      dataType: "json",
	      success: function(result){
	      	if((result!=null)&&(result.status==200)){
	      		var strhtml = ""
	      		for(var i=0;i<result.rows.length;i++){
	      			if(result.rows[i].name=="其他"){
		      			strhtml += '<div class="col-md-6 col-li"><div class="clearfix"><label class="check-other">'+result.rows[i].name+'</label>'; 
		      			strhtml += '<div class="checked-static other-static"><input type="checkbox" name="anamnesis1" value='+result.rows[i].name+'>';
		      			strhtml += '<i></i></div><input  type="text" id="hydb1" name="anamnesis" class="form-control other-control"></div></div>';
	      			}else{
	      				strhtml += '<div class="col-md-2 col-li"><label>'+result.rows[i].name+'<span class="checked-static">';
		      			strhtml += '<input type="checkbox" name="anamnesis" value='+result.rows[i].name+'>';
		      			strhtml += '<i></i></span></label></div>';
	      			}
	      		}
	      		$("#history").html(strhtml);
	      	}else{
	      		toastr.clear();
	  			toastr.warning("读取失败")
	      	}
	      },
	      error: function(){
	      	toastr.clear();
				toastr.warning("读取失败")
	      }
	  });
}

function finalautograde(){
	var etdsgrade = $("#etdsgrade").val();
	var mewsgrade = $("#mewsgrade").val();
	var quickgrade = $("#quick_grade").val();
    var grade = '1005';
    if(etdsgrade!="" && etdsgrade<grade){
    	grade=etdsgrade;
    }
    if(mewsgrade!="" && mewsgrade<grade){
    	grade=mewsgrade;
    }
    if(quickgrade!="" && quickgrade<grade){
    	grade=quickgrade;
    }
    if(grade!="1005"){
    	
    	$("#autograde").val(grade);
    	var name = getgradenamebygradeid(grade);
    	
    	var str = '';
    	str += '<div class="st-grade btn-'+grade+'-selected" style="height:64px;">';
    	str += '<p class="allocatNum" style="line-height: 64px;">'+name+'</p>';
    	str += '<p class="allocatUnit">级</p>';
    	str += '</div></div>';
    	$("#atuogradearea").html(str);

	    if($("#finalgrade").val()==""){	
			$("#grade").html("");
			var html = '<div class="st-grade  btn-'+grade+'-selected">';
			html+= '<div><p class="allocatNum">'+name+'</p>';
			html+= '<p class="allocatUnit">级</p>';
			html+= '</div></div>';
			$("#grade").html(html);
			$("#twopartpj").css("display","none");
			$("#grade").css("display","block");
		}else{
			$("#zdpj").html("");
	    	var html = '<p class="text-center">综合评级:</p>';
	    	html+= '<div class="st-grade  btn-'+grade+'-selected">';
			html+= '<div><p class="allocatNum">'+name+'</p>';
			html+= '<p class="allocatUnit">级</p>';
			html+= '</div></div>';
			$("#zdpj").html(html);
		}
	    
    }else{
    	
    	$("#autograde").val("");
    	
    	var str = '';
		str += '<div class="st-grade" style="height:64px">';
		str += '</div>';
		$("#atuogradearea").html(str);
    	
    	if($("#finalgrade").val()==""){
			$("#grade").html("");
			$("#zdpj").html("<p class='text-center'>综合评级:</p><div class='st-grade'></div>");
			$("#sdpj").html("");
			$("#twopartpj").css("display","none");
			$("#grade").css("display","block");
		}else{
			$("#grade").html("");
			$("#zdpj").html("<p class='text-center'>综合评级:</p><div class='st-grade'></div>");
			$("#twopartpj").css("display","block");
			$("#grade").css("display","none");
		}
    }
}
function cancel(){
	var id = $("#id").val();
	if(id ==''){
		var str = '';
		str += '<div class="st-grade" style="height:64px"></div>';
		$("#finalgradearea").html(str);
		$("#finalgrade").val('');
		$("#gradename").val('');
		$("#changereason").val('选择修改原因');
		$("#reasondetail").val('修改原因:');
	}else{
		loadPatientHandle(id,$("#maxcixu").val());
	}
	
}
//上次分级
function lastcixu(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientHandleId",
        data:{
       	 id:id,
       	 cixu:cixu-1
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
			if ((result != null) && (result.status == 200)) {
				var rows = result.rows;
				if ((rows.autograde != null) && (rows.autograde != "")) {
					$("#left").prop("class",
							"st-grade btn-" + rows.autograde + "-selected");

				}
				if ((rows.finalgrade != null) && (rows.finalgrade != "")) {
					$("#left").prop("class",
							"st-grade btn-" + rows.finalgrade + "-selected");

				}
			} else {
				$("#left").prop("class", "pull-left label-left");
			}
        },
        error: function(){
        }
    });
}
//下次分级
function nextcixu(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientHandleId",
        data:{
       	 id:id,
       	 cixu:parseInt(cixu)+1
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
        		if((rows.autograde!=null)&&(rows.autograde!="")){
        			$("#right").prop("class","st-grade btn-"+rows.autograde+"-selected");
        			
        		}
        		if((rows.finalgrade!=null)&&(rows.finalgrade!="")){
        			$("#right").prop("class","st-grade btn-"+rows.finalgrade+"-selected");
        			
        		}
        		
        		
        	}else{
        		$("#right").prop("class","pull-left label-right1");
        	}
        },
        error: function(){
        }
    });
}

function againpj(re){
	if(re==1){
		var cixu2 = $("#cixu").val();
		var cixu = Number(cixu2);
		var maxcixu2 = $("#maxcixu").val();
		var maxcixu = Number(maxcixu2);
		var id = $("#id").val();
//		$("#supplement").css("display","").parents(".col-li").addClass("active");
//		$("#dividtime").removeAttr("readonly");
		loadPatientSignInfo(id,maxcixu);
		loadPatientSymtpomByType(id,maxcixu);
		loadPatientSymtpom(id,maxcixu);
		loadPatientHandle(id,maxcixu);
		loadPatientScore(id,maxcixu);
		lastcixu(id,cixu+1);
		nextcixu(id,maxcixu);
		$("#cixu").val(cixu+1);
		$("#supplement").css("display","").prop("checked",false).parents(".col-li").removeClass("active");
		$(".checkDiv2 label").click(function(){
			$(".checkDiv2 input[type='checkbox']").click();
		})
		
//		$("#dividtime").attr("readonly","readonly");
//		alert('againpj');
		$("#span_supplement").show();
		$("#bulu").css("color","black");
		showdcpi();
		$("#read").modal("show");
		$("#dividtime").val(synctime().substring(0, 16));
//		$("#m1_time").hide();
		$("#dividtimee").val(synctime().substring(0, 16));
		$("#m2_time").show();
		$("#dividtimee").show();
	}
	$("#againpj").modal("hide");
	
}

function read(){
	$("#read").modal("hide");
}

//自定义快速分级确认键
function zdyksfj(){
	//初始化校验
	$("#10000000001").find("input[type='text']").css("border-color","");
	$("#10000000002").find("input[type='text']").css("border-color","");
	$("#10000000003").find("input[type='text']").css("border-color","");
	
	var one = "";
	var two = "";
	var three = "";
	var allcheck = false;
	
	toastr.clear();
	
	if($("#level_1_name").val()!=""){
		one = $("#level_1_name").val();
	}else if($("#10000000001").find("input[type='text']").val().trim()!=""){
		one = $("#10000000001").find("input[type='text']").val();
	}else{
		$("#10000000001").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入快速分级的自定义内容！")
		allcheck = true;
	}
	
	if($("#level_2_name").val()!=""){
		two = $("#level_2_name").val();
	}else if($("#10000000002").find("input[type='text']").val().trim()!=""){
		two = $("#10000000002").find("input[type='text']").val();
	}else{
		$("#10000000002").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入主诉的自定义内容！")
		allcheck = true;
	}
	
	var confirm = false;
	if($("#10000000003").find("input[type='text']").val().trim()==""){
		$("#10000000003").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入评分依据内容！");
		allcheck = true;
	}
	if($("#10000000003").find("[name='ksfjgrade'][class*=selected]").length==0){
		$("#10000000003").find("[name='ksfjgrade']").css("border-color","red");
		toastr.warning("请选择自定义级别！");
		allcheck = true;
	}
	if(allcheck){
		return;
	}
	three = $("#10000000003").find("input[type='text']").val();
	
	
	var zdyksfjgrade=$("#10000000003").find("[name='ksfjgrade'][class*=selected]").attr("grade");
	
	var zdyksfjgradename = zdyksfjgrade.substring(3,4)+"级";
	$.ajax({
        type: "post",
        url: "#path()/divid/saveZDY",
        async:false, 
        data:{
        	one:one,
       	 	two:two,
       	 	three:three,
       	 	grade:zdyksfjgrade
        },
        dataType: "json",
        success: function(result){
       	 	//基础参数赋值
        	
        },
        error: function(){
        	toastr.error("保存自定义失败!");
        }
    });
	
	
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\"  name='quickitem' grade=\""+zdyksfjgrade+"\" onclick=\"clearQuick(this)\" parentid='' zdyid='10000000003'>×</button><span>";
	
	if(two!=""){
		two+=" | ";
	}
	if(one!=""){
		one+=" | ";
	}
	str1+= one + two + three+" "+zdyksfjgradename;
    str1+= "</span></div>";
    var html1 = $("#symptom").html();
	if (html1.trim().length == 0) {
		html1 = html1 + str1;
		$("#symptom").html(html1);
	} else {
		html1 = $("#symptom").html();
		html1 = html1 + str1;
		$("#symptom").html(html1);
	}
	
	//先获取快速分级症状中等级最高的那个
	var str = [];
	$("button[name='quickitem']").each(function(i){
		str.push($(this).attr("grade"));
	});
	grade = min(str);
   
	$("#quickgrade").val(grade);
	
	//再取所有评分表里等级最高的
    grade = getHigestGrade();
    //展示自动评级
    showAutoGrade(grade);
    $(".classifyBox").hide();
}

//新增患者时（再次分诊）
function querylocalinfo2(){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientByCardNum",
        data:{
        	cardnum:$("#cardnum").val()
        },
        dataType: "json",
        success: function(result){
        	if((result!=null)&&(result.status==200)){
        		//填入信息
        		var info = result.rows;
                if(info.bornday!=null && info.bornday.length>9){
                	var birthday = info.bornday.substring(0,10);
                	$("#bornday").val(birthday);
                } 
        		$("#fullname").val(info.fullname);
        		$("#gender").val(info.gender);
        		$("#age").val(jsGetAge('',birthday));
        		$("#tel").val(info.tel);
        		$("#hisid").val(info.hisid);
        		if(info.idcard!="" && info.idcard!=""){
        			$("#idcard").val(info.idcard);
        		}
        		$("input[name='anamnesis']").each(function(i){
           			
           			if(info.anamnesis.indexOf($(this).attr('value')) != -1){
//           				alert($(this).attr('value'));
           				$(this).click();
//    					$("input[name='anamnesis'][value='"+info.anamnesis+"']").parent().parent().attr("class","col-md-2 col-li active");
           			}
               		
         	    });
$("input[name='allergic_history']").each(function(i){
           			if(info.allergic_history.indexOf($(this).attr('value')) != -1){
//           				alert($(this).attr('value'));
           				$(this).click();
//    					$("input[name='anamnesis'][value='"+info.anamnesis+"']").parent().parent().attr("class","col-md-2 col-li active");
           			}
               		/*$("input[name='allergic_history'][value='"+info.allergic_history+"']").attr('checked',true);
					$("input[name='allergic_history'][value='"+info.allergic_history+"']").parent().parent().attr("class","col-md-2 col-li active");*/
         	    });
        	}else{
        		queryhisinfo2();
        	}
        	       
        },
        error: function(){
        	toastr.clear();
			toastr.warning("读卡失败");
        }
    });
}

//新增患者时（再次分诊）
function loadPatientBaseInfo2(id){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientById",
        data:{
       	 id:id
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if((result!=null)&&(result.status==200)){
       	 	//基础参数赋值
        		var rows = result.rows;
        		//$("#id").val(id);
        		$("#fullname").val(rows.fullname);
        		$("#cardnum").val(rows.cardnum);
        		$("#bornday").val(rows.bornday);
        		$("#gender").val(rows.gender);
        		$("#age").val(rows.age);
        		$("#tel").val(rows.tel);
        		$("#memberstel").val(rows.memberstel);
        		$("#parenttel").val(rows.parenttel);
        		$("#reason").val(rows.reason);
        		$("#allergic_history").val(rows.allergic_history);
        		$("#address").val(rows.address);
        		$("#idcard").val(rows.idcard);
        		$("#hisid").val(1111);
        		//挂号时间
        		$("#registertime").val(rows.registertime);
        		//分诊时间
        		/*if(rows.dividtime != null){
        			$("#dividtime").val(rows.dividtime);
        		}else{
        			$("#dividtime").val(synctime());
        		}*/
        		
        		//$("#status").val(rows.status);
        		//$("#dividenurse").html(rows.dividenurse);
        		$("#category").val(rows.category);
        		if(rows.source==""){
        			rows.source=null;
        		}
        		if(rows.admission==""){
        			rows.admission=null;
        		}
        		if(rows.consciousness==""){
        			rows.consciousness=null;
        		}
        		if(rows.source.indexOf("|")>0){
					$("input[name='source'][value='其他']").attr('checked',true);
					$("input[name='source'][value='其他']").parent().parent().attr("class","col-md-6 col-li active");
					$("#hydb2").val(rows.source.split("|")[1]);
					$("#hydb2").css("opacity","1");
				}else{
					$("input[name='source'][value="+rows.source+"]").attr("checked",true);
	        		$("input[name='source'][value="+rows.source+"]").parent().parent().attr("class","col-md-2 p0-r col-check active");
				}
        		if(rows.eventid != ''){
        			$("#events_check").click();
        			$("#events1").val(rows.name+'-'+rows.etime);
        			$('#events1').attr('value', rows.eventid);
        		}
        		
        		
        		
        		$("input[name='lyfs'][value="+rows.admission+"]").attr("checked",true);
        		$("input[name='lyfs'][value="+rows.admission+"]").parent().parent().attr("class","col-md-2 active");
        		$("input[name='consciousness'][value="+rows.consciousness+"]").attr("checked",true);
        		
        		$("input[name='consciousness'][value="+rows.consciousness+"]").click().parent().parent().attr("class","col-md-2 active");
        		$("#dividtime1").show();
        		/*str = '';
        		if(result.rows.signurl!= null && result.rows.signurl!= ''){
        			$("#picDiv").html("");
        			str = '<p class="allocatTitle">';
        			str += '<span onclick="showSign();">家属签字></span>';
        			str += '</p>';
        			str += '<p class="namePic">';
        			str +=  '<a href="#path()'+result.rows.signurl+'" target="_blank"><img  src="#path()'+result.rows.signurl+'" style="height: 50px;"></a>';
        			str += '</p>';
					$("#picDiv").html(str);
					var str = "";
					str += "<img src=\"" + result.rows.path + "\">";
					$("#sgin").html(str);
					$("#signUrl").val(result.rows.signurl);
					$("#pfyj").show();
					$("#sign").hide();
        		}*/
        		
        		var a = rows.anamnesis;
        		if(a=='无'){
        			$("input[name='anamnesis'][type='checkbox'][value !='无']").attr("disabled","disabled");
        			$("input[name='anamnesis'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        			$("input[name='anamnesis1'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        		}
        		if(a!=null&&a!=""){
        			var strs= new Array(); //定义一数组 
        			strs=a.split(","); //字符分割 
        			for (var i=0;i<strs.length ;i++ ) 
        			{ 
        				if(strs[i].indexOf("|")>0){
        					$("input[name='anamnesis1'][value='其他']").attr('checked',true);
        					$("input[name='anamnesis1'][value='其他']").parent().parent().attr("class","col-md-6 col-li active");
        					$("#hydb1").val(strs[i].split("|")[1]);
        					$("#hydb1").css("opacity","1");
        				}else{
        					$("input[name='anamnesis'][value='"+strs[i]+"']").attr('checked',true);
        					$("input[name='anamnesis'][value='"+strs[i]+"']").parent().parent().attr("class","col-md-2 col-li active");
        				}
        				//$("input[name='anamnesis'][value='"+strs[i]+"']").attr('checked',true);
        			} 
        		}
        		
        		
        		var h = rows.allergic_history;
        		if(h=='无'){
        			$("input[name='allergic_history'][type='checkbox'][value !='无']").attr("disabled","disabled");
        			$("input[name='allergic_history'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        			$("input[name='allergic_history'][type='checkbox'][value !='无']").siblings().attr("class","check-color");
        		}
        		if(h!=null&&h!=""){
        			var strs= new Array(); //定义一数组 
        			strs=h.split(","); //字符分割 
        			for (var i=0;i<strs.length ;i++ ) 
        			{ 
        				if(strs[i].indexOf("|")>0){
        					$("input[name='allergic_history1'][value='其他']").attr('checked',true);
        					$("input[name='allergic_history1'][value='其他']").parent().parent().attr("class","col-md-6 col-li active");
        					$("#gmsother-input").val(strs[i].split("|")[1]);
        					$("#gmsother-input").css("opacity","1");
        				}else{
        					$("input[name='allergic_history'][value='"+strs[i]+"']").attr('checked',true);
        					$("input[name='allergic_history'][value='"+strs[i]+"']").parent().parent().attr("class","col-md-2 col-li active");
        				}
        				//$("input[name='anamnesis'][value='"+strs[i]+"']").attr('checked',true);
        			} 
        		}
        		
        		var remark = rows.remark;
        		if(remark.length>0){
        			$("#demopf").html('');
        			var str1 = "<div class=\"alert alert-dismissable symptom\">";
            		str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"demo_x\" >×</button>";
            		str1 += remark;
        			str1+= "</div>";
        			$("#demopf").html(str1);
        		}
        		
        	
        		
        	}
        },
        error: function(){
        }
    });
}

//新增患者时（再次分诊）  获取历次评级数量
function queryPatientHandleScore2(pid){
$.ajax({
    type: "post",
    url: "#path()/divid/queryPatientHandleScore",
    data:{
   	 pid:pid
    },
    dataType: "json",
    async:false,
    success: function(result){
    	if(result!=null){
    		if(result.status==200){
    			if(result.rows.length>0){ 
    				//$("#maxcixu").val(result.rows.length);
    				//最后一次保存状态
    				var savestatus =result.rows[result.rows.length-1]["savestatus"];   				
    				if( $("#returnUrl").val()=="xgpj" || $("#returnUrl").val()=="histroy"|| savestatus=="save" && $("#returnUrl").val()=="divid" ){
    					$("#nurseqianm").css("display","none");
    					$("#lastnurseqianm").css("display","block");
    					$("#showsffenji").css("display","block"); 
    					$(".cover").addClass("cover2");
    					if($(window).width()>1366 && $(window).height()>=700){
	    					var h = $(".content").outerHeight();
	    					var h8 = $(".footer-main").outerHeight();
	    					var h9 = h-h8-10;
	    					var h10 = $(".give .panel").eq(0).outerHeight();
	    					var h11 = h9-10-h10;
	    					var h7 = $(".give .rateItem .st-mark").css("margin-bottom").replace("px","");
	    					var h1 = h11-30-parseFloat(h7)*8;
	    					var h4 = $("#print").outerHeight();
	    					var h5 = $("#jzann").outerHeight();
	    					var h6 = $(".right-grade").height();
	    					var h2 = h1-h4-h5-h6;
	    					var h3 = h2/6;
	    					hh = h3;  					
	    					$(".give .rateItem .st-mark").css({
	    						"height":h3+"px",
	    						"line-height":h3+"px"
	    					});  
    					}
    				}
    			}
    		}
    	}
    },
    error: function(){
    }
});
}

function loadPatientSignInfo2(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSignById",
        data:{
       	 id:id,
       	 cixu:cixu
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if((result.rows!=null)&&(result.status==200)){
            	var rows = result.rows;
            	$("#sg").val(rows.sg);
            	$("#tz").val(rows.tz);
        		//$("#sighid").val(rows.id);
        		$("#huxi").val(rows.hx);
        		$("#tiwen").val(rows.tw);
        		$("#maibo").val(rows.mb);
        		$("#shuzhangya").val(rows.szy);
        		$("#shousuoya").val(rows.ssy);
        		$("#spo2").val(rows.spo2);
        		$("#pcn").val(rows.pcn);
        		
        		
        		//模拟点击颜色
          		$("#tiwen").trigger('keyup');
          		$("#shuzhangya").trigger('keyup');
          		$("#shousuoya").trigger('keyup');
          		$("#spo2").trigger('keyup');
          		$("#maibo").trigger('keyup');
          		$("#huxi").trigger('keyup');
          		
          		//显示评级
        		showSignGrade(true);
        	}
       	 
       	
        },
        error: function(){
        }
    });
}

//新增患者时（再次分诊）
function loadPatientHandle2(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientHandleId",
        data:{
       	 id:id,
       	 cixu:cixu
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
        
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
            	var handle5 = $("#handle5").html();
            	//$("#cixu").val(rows.cixu);
//            	if(handle5=='-'){
//            		alert('cixu+1');
//            		$("#cixu").val(Num(rows.cixu)+1);
//            	}
        		//$("#handleid").val(rows.id);
        		$("#autograde").val("");
        		$("#finalgrade").val("");
        		$("#autograde").val(rows.autograde);
        		$("#finalgrade").val(rows.finalgrade);
        		$("#td_id").val(rows.dividdepartment);
        		//$("#dividtime").val(rows.dividtime);
        		//$("#dividtimee").val(rows.dividtime);
        		$("#lastnurse").html(rows.dividenurse);
        		
        		//$('#changereason').val(rows.changereason);
        		
        		$('#changereason').find("option[value='"+rows.changereason+"']").attr("selected",true);
        		$("#reasondetail").val(rows.reasondetail);
        		//$("#hljl").val(rows.hljl);
//        		屏蔽liuxj,20190516
        		/*if(rows.supplement==1){
        			$("#supplement").prop("checked",true).css("display","none").parents(".col-li").addClass("active");
        			$("#span_supplement").hide();
        			$("#bulu").css("color","#538bc4");
        			$("#dividtime").removeAttr("readonly");
        			$("#m1_time").show();
        			$("#m2_time").hide();
        			$(".checkDiv2 label").unbind("click");
        		}else{
        			$("#supplement").prop("checked",false).parents(".col-li").removeClass("active");;
//        			$(".checkDiv2 label").unbind("click");
        			$("#dividtime").attr("readonly","readonly").attr("display","none");
        			$("#span_supplement").show();
        			$("#bulu").css("color","black");
        		}*/
        		/*if(parseInt($("#maxcixu").val())<parseInt($("#cixu").val())){
        			console.log('dayu');
        			$("#dividtime").removeAttr("readonly");
        			$("#supplement").css("display","")
        			$("#m2_time").show();
        			$("#m1_time").hide();
        		}*/
        		if((rows.autograde!=null)&&(rows.autograde!="")){
        			$("#content").prop("class","st-grade btn-"+rows.autograde+"-selected");
        			$("#atuogradearea").html("");
        			var str = '';
        			str += '<div class="st-grade btn-'+rows.autograde+'-selected" style="height:64px;">';
        			str += '<p class="allocatNum" style="line-height: 64px;">'+rows.autoname+'</p>';
        			str += '<p class="allocatUnit">级</p>';
        			str += '</div>';
        			$("#atuogradearea").html(str);
        			$("#grade").html("");
        			var html = '<div class="st-grade  btn-'+rows.autograde+'-selected">';
        			html+= '<div><p class="allocatNum">'+rows.autoname+'</p>';
        			html+= '<p class="allocatUnit">级</p>';
        			html+= '</div></div>';
        			$("#grade").html(html);
        		}
        		if((rows.finalgrade!=null)&&(rows.finalgrade!="")){
        			$("#content").prop("class","st-grade btn-"+rows.finalgrade+"-selected");
        			$("#finalgradearea").html("");
        			var str = '';
        			str += '<div class="st-grade btn-'+rows.finalgrade+'-selected" style="height:64px;">';
        			str += '<p class="allocatNum" style="line-height: 64px;">'+rows.finalname+'</p>';
        			str += '<p class="allocatUnit">级</p>';
        			str += '</div></div>';
        			$("#finalgradearea").html(str);
        			
        			$("#grade").html("");
        			var html = '<div class="st-grade  btn-'+rows.finalgrade+'-selected">';
        			html+= '<div><p class="allocattxt">改</p><p class="allocatNum">'+rows.finalname+'</p>';
        			html+= '<p class="allocatUnit">级</p>';
        			html+= '</div></div>';
        			$("#grade").html(html);
        		}else{
        			var str = '';
        			str += '<div class="st-grade" style="height:64px"></div>';
        			$("#finalgradearea").html(str);
        		}
        		if(rows.dividdepartment!=""){
        			var str = '';
        			str+='<p class="allocatTitle">';
        			str+='<span>分诊去向></span>';
        			str+='</p>';
        			str+='<p class="icu">'+rows.dividdepartmentname+'</p>';
        			$("#chooseDepart").removeClass("setItem").css({"line-height":"initial"});
        			$("#chooseDepart").html("");
        			$("#chooseDepart").html(str);
        		}
        		if(rows.feijz ==2){
        			$("#feijz").val(2);
        			$("#txm,#trs,#describe,#history").parents(".areaWarn").removeClass("remindArea"); 
        			$("#maibo,#spo2,#shousuoya,#shuzhangya,#tiwen").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
        			$(".curtain,.curtain1").show();
        			$(".curtain-main").hide();
        			$("#dividtime1").addClass("panel-t");
        			$("#jzann .changeName").html('急诊');
        			$("#picDiv").removeClass("st-mark-q").addClass("st-mark-c");
        			if($("#mews").find(".st-icon").length >= 1){
        				$("#mews").removeClass("st-mark-i").addClass("st-mark-c");
        			}else{
        				$("#mews").removeClass("st-mark-c").addClass("st-mark-i");			
        			}
        			if($("#edts").find(".st-icon").length >= 1){
        				$("#edts").removeClass("st-mark-h").addClass("st-mark-c");
        			}else{
        				$("#edts").removeClass("st-mark-c").addClass("st-mark-h");			
        			}
        			if($("#pain").find(".st-icon").length >= 1){
        				$("#pain").removeClass("st-mark-t").addClass("st-mark-c");
        			}else{
        				$("#pain").removeClass("st-mark-c").addClass("st-mark-t");			
        			}
        			if($("#GCS").find(".st-icon").length >= 1){
        				$("#GCS").removeClass("st-mark-d").addClass("st-mark-c");
        			}else{
        				$("#GCS").removeClass("st-mark-c").addClass("st-mark-d");			
        			} 
        			if($("#fast").find(".st-icon").length >= 1){
        				$("#fast").removeClass("st-mark-fast-bg").addClass("st-mark-c");
        			}else{
        				$("#fast").removeClass("st-mark-c").addClass("st-mark-fast-bg");			
        			} 
        		}else{
        			$("#feijz").val(1);
        			$(".curtain,.curtain1").hide();
        			$(".curtain-main").show();
        			$("#dividtime1").removeClass("panel-t");
        			$("#jzann .changeName").html('非急诊');
        			$("#mews").removeClass("st-mark-c").addClass("st-mark-i");
        			$("#edts").removeClass("st-mark-c").addClass("st-mark-h");
        			$("#pain").removeClass("st-mark-c").addClass("st-mark-t");
        			$("#GCS").removeClass("st-mark-c").addClass("st-mark-d");
        			$("#picDiv").removeClass("st-mark-c").addClass("st-mark-q");  
        			$("#fast").removeClass("st-mark-c").addClass("st-mark-fast-bg");
        		}
        	}
        },
        error: function(){
        }
    });
}

function addCardInfo(){
	window.location.href="#path()/card/add"; 
}

function listCardInfo(){
	window.location.href="#path()/card/list"; 
}

function findHisGH(cardnum){
	$.ajax({
        type: "post",
        url: "#path()/divid/findHisGH",
        data:{
         cardnum:cardnum
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if((result.rows!=null)&&(result.status==200)){
            	var rows = result.rows;
            	if(rows.PATPatientID != null){
            		$("#id").val(rows.id);
            	}
        	}
        },
        error: function(){
        }
    });
}

//显示办卡页面
function cardModal(){
	$("#PATCardNo").val($("#cardnum").val());
	$("#PATPatientName").val($("#fullname").val());
	$("#PATBirthDay").val($("#bornday").val());
	$("#PATIDCardNo").val($("#idcard").val());
	$("#PATSexCode").val($("#gender").val());
	$("#PATTelPhone").val($("#tel").val());
	$("#PATSocialStatus").val("01");
	
	var age = jsGetAge('',$("#bornday").val());
	if(age==''){
		$(".Contact").hide();
	}else{
		var len = age.length;
		var beg = len-1;
		var danw = age.substring(beg,len);
		var age = age.substring(0,len-1);
		if((danw=='岁')&&(age>14)){
			$(".Contact").hide();
		}else{
			$(".Contact").show();
		}
	}

	
	$("#cardModal").modal("show");
}

function registerModal(){
	$("#cardnum2").html($("#cardnum").val());
	$("#PAADMEncounterTypeCode").val("E");
	$("#registerModal").modal("show");
}

var state='';
function addHisCard(){
	
	state = $('#switch').bootstrapSwitch('state'); 
	var PATCardNo = $("#PATCardNo").val();
	var PATPatientName = $("#PATPatientName").val();
	var PATIDCardType = $("#PATIDCardType").val();
	var PATIDCardNo = $("#PATIDCardNo").val();
	var PATBirthDay = $("#PATBirthDay").val();
	var PATTelPhone = $("#PATTelPhone").val();
	
	var PATSexCode = $("#PATSexCode").val();
	var PATSocialStatus = $("#PATSocialStatus").val();
	
	var ContactName = $("#PATSocialStatus").val();//监护人姓名
	var ContactTelNo = $("#PATSocialStatus").val();//监护人电话
	var ContactIDType = $("#PATSocialStatus").val();//监护人证件类型
	var ContactIDNo = $("#PATSocialStatus").val();//监护人证件号

	var PATInsuCardNo = $("#PATInsuCardNo").val();//医保卡号
	
	
	var flag= false;
	if(PATCardNo.trim().length==""&&!state){
		appendErrorText($("#PATCardNo"),'请输入就诊卡号')
		flag = true;
	}else{
		clearErrorText($("#PATCardNo"));
	}
	
	if(PATPatientName.trim().length==""){
		appendErrorText($("#PATPatientName"),'请输入姓名')
		flag = true;
	}else{
		clearErrorText($("#PATPatientName"));
	}
	
	if(PATIDCardNo.trim().length=="" &&!state){
		appendErrorText($("#PATIDCardNo"),'请输入证件号码')
		flag = true;
	}else{
		clearErrorText($("#PATIDCardNo"));
	}
	
	if(PATBirthDay.trim().length==""){
		appendErrorText($("#PATBirthDay"),'请输入出生日期')
		flag = true;
	}else{
		clearErrorText($("#PATBirthDay"));
	}
	
	if(PATTelPhone.trim().length==""){
		appendErrorText($("#PATTelPhone"),'请输入手机号码')
		flag = true;
	}else{
		clearErrorText($("#PATTelPhone"));
	}
	
	
	var ContactName = $("#ContactName").val();//监护人姓名
	var ContactTelNo = $("#ContactTelNo").val();//监护人电话
	var ContactIDType = $("#ContactIDType").val();//监护人证件类型
	var ContactIDNo = $("#ContactIDNo").val();//监护人证件号
	
	if((PATSocialStatus=='02'||PATSocialStatus=='03')){
		if(ContactName.trim().length==""){
			appendErrorText($("#ContactName"),'请输入监护人姓名')
			flag = true;
		}else{
			clearErrorText($("#ContactName"));
		}
		if(ContactTelNo.trim().length==""){
			appendErrorText($("#ContactTelNo"),'请输入监护人电话')
			flag = true;
		}else{
			clearErrorText($("#ContactIDNo"));
		}
		
		if(ContactIDNo.trim().length==""){
			appendErrorText($("#ContactIDNo"),'请输入监护人证件号')
			flag = true;
		}else{
			clearErrorText($("#ContactIDNo"));
		}
	
	}
	
	if(flag){
		return;
	}
	//alert(ContactName+','+ContactTelNo+','+ContactIDType+','+ContactIDNo);
	
	$.ajax({
        type: "post",
        url: "#path()/divid/addHisCard",
        data:{
        	PATCardNo:PATCardNo,
        	PATPatientName:PATPatientName,
        	PATBirthDay:PATBirthDay,
        	PATIDCardType:PATIDCardType,
        	PATIDCardNo:PATIDCardNo,
        	PATSexCode:PATSexCode,
        	PATTelPhone:PATTelPhone,
        	PATSocialStatus:PATSocialStatus,
        	ContactName:ContactName,
        	ContactTelNo:ContactTelNo,
        	ContactIDType:ContactIDType,
        	ContactIDNo:ContactIDNo,
        	PATInsuCardNo:PATInsuCardNo,
        	nurseid:$("#userId").val()
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if(result.status==200){
            	var rows = result.rows;
            	if(rows != null){
            		
            		var res_PATCardNo = result.rows.PATCardNo;
					console.log(rows);
            		if(res_PATCardNo==PATCardNo&&res_PATCardNo!=''&&PATCardNo!=''){
            			$("#cardnum").val($("#PATCardNo").val());
            				$("#hisid").val(rows.PATPatientID);
							
                    		$("#fullname").val($("#PATPatientName").val());
                    		$("#bornday").val($("#PATBirthDay").val());
							var age = jsGetAge('',$("#bornday").val());
							$("#age").val(age);
                    		$("#idcard").val($("#PATIDCardNo").val());
                    		$("#gender").val($("#PATSexCode").val());
                    		$("#tel").val($("#PATTelPhone").val());
							alert("办卡成功！");
            		}else{
            			
            			if(state){
            				$("#print_id").text(rows.PATPatientID);
            				$("#print_name").text(rows.PATPatientName);
            				$("#print_card").text(res_PATCardNo);
            				
            				// 生成条形码
            				$("#imgcode").JsBarcode(res_PATCardNo, {
            				      displayValue: false
            				});
            				
            				dayinconfirmbar();
            				$("#PATCardNo").val(res_PATCardNo);
            				$("#cardnum").val($("#PATCardNo").val());
            				$("#hisid").val(rows.PATPatientID);
                    		$("#fullname").val($("#PATPatientName").val());
                    		$("#bornday").val($("#PATBirthDay").val());
                    		$("#idcard").val($("#PATIDCardNo").val());
                    		$("#gender").val($("#PATSexCode").val());
                    		$("#tel").val($("#PATTelPhone").val());
                			var age = jsGetAge('',$("#bornday").val());
                			if(age==''){
                				age='0天';
                			}
                			 $("#age").val(age);
                    		alert("办卡成功！");
            			}else{
            				
            				$("#print_id").text(rows.PATPatientID);
            				$("#print_name").text($("#PATPatientName").val());
            				$("#print_card").text(res_PATCardNo);
            				$("#imgcode").JsBarcode(res_PATCardNo, {
          				      displayValue: false
            				});
            				back("当前证件已办理过就诊卡,注销旧卡请去办卡处，如需要使用旧卡请点击确认");
            				$("#hisid").val(rows.PATPatientID);
                    		$("#fullname").val($("#PATPatientName").val());
                    		$("#bornday").val($("#PATBirthDay").val());
                    		$("#idcard").val($("#PATIDCardNo").val());
                    		$("#gender").val($("#PATSexCode").val());
                    		$("#tel").val($("#PATTelPhone").val());
                			var age = jsGetAge('',$("#bornday").val());
                			if(age==''){
                				age='0天';
                			}
                			 $("#age").val(age);
            			}
            			
            			
            		}
            		
            	}else{
            		alert("办卡失败");
            	}
        	}else {
        		alert(result.message);
        	}
        	$("#cardModal").modal("hide");	
        },
        error: function(){
        	alert("调用接口失败");
        	$("#cardModal").modal("hide");	
        }
    });
}


function registerPat(){
	if($("#hisid").val()==""){
		alert("请先读取就诊卡!");
		$("#registerModal").modal("hide");	
		return;
	}
	
	
	$.ajax({
        type: "post",
        url: "#path()/divid/registerPat",
        data:{
        	PAADMEncounterTypeCode:$("#PAADMEncounterTypeCode").val(),
        	PAADMOPTypeCode:$("#PAADMOPTypeCode").val(),
        	nurseid:$("#userId").val(),
        	PATPatientID:$("#hisid").val()
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if((result.rows!=null)&&(result.status==200)){
        		
        		
        		$("#PAADMVisitNumber").val(result.rows);
            	alert("挂号成功！");
        	}else{
        		alert(result.message);
        	}
        	$("#registerModal").modal("hide");	
        },
        error: function(){
        	alert("调用接口失败");
        	$("#registerModal").modal("hide");	
        }
    });
}

//清除提示信息
function clearErrorText(element){
	$(element).parent().parent().removeClass("has-error");
	$(element).parent().parent().find(".error-text").remove();
}


//增加提示信息
function appendErrorText(element,mes){
	clearErrorText(element);
	var html = "";
	html += '<div class="error-text">' ;
	html += mes;
	html += '</div>';
	$(element).parent().append(html);
	$(element).parent().parent().addClass("has-error");
	//$(element).focus();
}

function NoName(){
	$.ajax({
        type: "post",
        url: "#path()/divid/createNoName",
        data:{
        	
        },
        dataType: "json",
        async:false,
        success: function(result){
        	var noName = "无名氏"+result;
        	$("#PATPatientName").val(noName);
        },
        error: function(){
        	alert("生成无名氏编号失败");
        }
    });
}
function opencard(){
cardModal();
$("#cardnum").val('');
$("#fullname").val('');
$("#bornday").val('');
$("#age").val('');
$("#tel").val('');
$("#idcard").val('');
}
function getJWBS(){
	alert($("#cardnum").val());    
}
function ulliclick(){
	$(".addDropDown li").click(function() {
		var  ulliclickId='#'+$(this).parent().parent().attr('id')+' text';
		//获取各值，追加
		var oldtxt=$(ulliclickId).text().split(":")
		var  newText=oldtxt[0]+': '+$(this).text();
		$(ulliclickId).text(newText);
    })
}
//$("#cardnum").parent().parent().css("background-color","antiquewhite")
//控制背景
function setBackColor(){
	
}
