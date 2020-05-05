function pageload(){
	$(document).keyup(function(event){
		if(event.keyCode ==13){
			var thisidname=$(event.target).attr('id');
			  if(thisidname=="cardnum"){
				  //截取'='前的字符串
				  var str_before = $("#cardnum").val().split('=')[0];
				  $("#cardnum").val(str_before);
				  //alert();
				  readCard();
			  }else{
				  toastr.clear();
				  toastr.warning("请选中卡号栏进行刷卡！")
			  }
		  }
	});
	
	//配置弹窗 3000 1000
	toastr.options = {
			  "preventDuplicates": true,
			  "preventOpenDuplicates": true,
			  "maxOpened":0,
			  "closeButton": true,
			  "debug": false,
			  "positionClass": "toast-center-center",
			  "onclick": null,
			  "showDuration": "300",
			  "hideDuration": "100",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut",
			  "newestOnTop": true
			};
	
	setgradebtncss3();
	//日期控件
	laydate.render({
		  elem: '#bornday' ,//指定元素
		  max:0,
		  done: function(value, date, endDate){
			    var age = jsGetAge('',value);
			    $("#age").val(age);
			}
	});
	laydate.render({
		  elem: '#dividtime', //指定元素
		  type: 'datetime'
	});
	//关于手动输入出生日期不会触发年龄的改变改动
	$("#bornday").blur(function(){
		var bornday = $("#bornday").val();
		re =/^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/;
		re2 =/^[1-2][0-9][0-9][0-9]-[0-9]-[0-3][0-9]/;
		re3 =/^[1-2][0-9][0-9][0-9]-[0-9]-[0-9]/;
		re4 =/^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-9]/;
		if(bornday.length>0){
			if (!re.test(bornday) && !re2.test(bornday) && !re3.test(bornday) && !re4.test(bornday)) {	
					toastr.warning('<ol  class="list-unstyled"><li>出生日期格式不正确</li></ol>');
					return;
			}else{
				var borndayArr=bornday.split("-");
			    var birthYear = borndayArr[0];
			    var birthMonth = borndayArr[1];
			    var birthDay = borndayArr[2];
			    
			    d = new Date();
			    var nowYear = d.getFullYear();
			    var nowMonth = d.getMonth() + 1;
			    var nowDay = d.getDate();
			    
			    var nowMonth2 = nowMonth;
			    if(nowMonth<9){
			    	nowMonth2="0"+nowMonth;
			    }
			    var nowDay2 = nowDay;
			    if(nowDay<9){
			    	nowDay2="0"+nowDay;
			    }
			    if(birthYear<1900){
			    	birthYear="1900";
			    	birthMonth="01";
			    	birthDay="01";
			    }
			    if(birthYear>nowYear){
			    	birthYear=nowYear;
			    	birthMonth=nowMonth2;
			    	birthDay=nowDay2;
			    }
			    if(birthYear==nowYear || birthYear==1900){
			    	if(birthMonth<1){
			    		birthMonth="01";
			    		birthDay="01";
			    	}else if(birthMonth>nowMonth){
			    		birthMonth=nowMonth2;
			    		birthDay=nowDay2;
			    	}
			    	if(birthMonth==nowMonth){
				    	if(birthDay>nowDay){
				    		birthDay=nowDay2;
				    	}
				    	if(birthDay<1){
				    		birthDay="01";
				    	}
			    	}
			    }
			    bornday = birthYear+"-"+birthMonth+"-"+birthDay;
			    $("#bornday").val(bornday);
				var age = jsGetAge("",bornday);
			    $("#age").val(age);
			}
		}
	});
	
	//增加监护仪连接信息查询
	//queryMachStatus();
	
 	$('#tiwen').on('click',easyPanel('tiwen'));
	$('#maibo').on('click',easyPanel('maibo'));
	$('#huxi').on('click',easyPanel('huxi'));
	$('#shuzhangya').on('click',easyPanel('shuzhangya'));
	$('#shousuoya').on('click',easyPanel('shousuoya'));
	$('#spo2').on('click',easyPanel('spo2'));
	

	//下面的评分隐藏
	//$('#last_score_div').hide();
	
	//非新增加载暂存数据
	var id = '#(id)';
	// 2018-08-10 增加返回的页面路径判断 
	var type = '#(type)';
	$("#returnUrl").val(type);
	if(id!=""){
		queryPatientHandleScore(id);
		loadPatientBaseInfo(id);
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
	
	//显示科室
	showDepart();
	
	//显示评级方式 
	//新增患者综合评级默认显灰
	showPjfs();
	//快速分级默认显示第一级
	getSymptom("0","1");
	
	//自动评级三种评级方式综合后显示
	finalautograde();
	
	$("button[name='lyfs']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	
	$("button[name='source']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	
	
	/*$("#note").bind("click",function(){ 
		$("#note").hide();
		$("#hljl").focus();
	});*/
	
	
	$("button[name='lstd']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	}); 
	$("button[name='others']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	}); 
	$("button[name='consciousness']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	}); 
	$("button[name='anamnesis']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	});
	//添加验证
	$("#fullname,#cardnum,#tel,#idcard,#sg,#tz,#huxi,#tiwen,#maibo,#shuzhangya,#shousuoya,#spo2,#hljl").bind('blur', function() {
		validate();
	});
	
	$('#modalGrade').on('hide.bs.modal', function () {
		if($("#lastfinalgrade").val()!=""){
			if($("#changereason option:selected").val()=="" && $("#reasondetail").val()==""){
				//如果手动评级原因未选择，弹出框未知原因强行消失，手动评级置空
				$("#finalgrade").val("");
				$("#finalgradename").val("");
				$("#lastfinalgrade").val("");
				$("#lastfinalgradename").val("");
				$("#lastupdgradereason").val("");
				$("#lastupdreasondetail").val("");
				$("#changereason option:first").prop("selected", 'selected');
				$("#reasondetail").val("")
				
				$("#finalgradearea").empty();
				$("#finalgradearea").append('<div class="st-grade" style="height:64px"></div>');
				
				$("#sdpj").empty();
				$("#twopartpj").css("display","none");
				$("#grade").css("display","block");
			}else{
				
				var lastfinalgrade = $("#lastfinalgrade").val();
				var lastfinalgradename = $("#lastfinalgradename").val();
				var lastupdgradereason = $("#lastupdgradereason").val();
				var lastupdreasondetail = $("#lastupdreasondetail").val();

				if(lastupdgradereason != "" && lastupdreasondetail !=""){
					$("#sdtjreason").text("手动调级原因："+lastupdgradereason+";"+lastupdreasondetail);
				}else if(lastupdreasondetail!=""){
					$("#sdtjreason").text("手动调级原因："+lastupdreasondetail);
				}else{
					$("#sdtjreason").text("手动调级原因："+lastupdgradereason);
				}
				
				$("#finalgrade").val($("#lastfinalgrade").val());
				$("#finalgradename").val($("#lastfinalgradename").val());
				var reason = lastupdgradereason;
				if(reason==""){
					$("#changereason option:first").prop("selected", 'selected');
				}else{
					$("#changereason").find("option[value="+reason+"]").prop("selected","selected");
				}
				$("#reasondetail").val(lastupdreasondetail);
				
				$("#finalgradearea").html("");
				var str = '';
				str += '<div class="st-grade btn-'+lastfinalgrade+'-selected" style="height:64px;">';
				str += '<p class="allocatNum" style="line-height: 64px;">'+lastfinalgradename+'</p>';
				str += '<p class="allocatUnit">级</p>';
				str += '</div></div>';
				$("#finalgradearea").html(str);
				
				$("#twopartpj").show().siblings(".title-top").hide();
				$("#grade").css("display","none");
			}
		}else{
		    //未确认情况下弹出框内容还原置空
			$("#finalgrade").val("");
			$("#finalgradename").val("");
			$("#finalgradearea").empty();
			$("#finalgradearea").append('<div class="st-grade" style="height:64px"></div>');
			$("#changereason option:first").prop("selected", 'selected');
			$("#reasondetail").val("");
		}
	});
	
	//弹出框消失就判断是否保存
	$('#fenzhenpjb').on('hide.bs.modal', function () {
		if($("#pjconfirmstatus").val()!="" && $("#pjconfirmstatus").val()=="ok"){
			var quickgrade_ids = $("#quickgrade_ids").val();
			var aao = "";
			if(quickgrade_ids!=""){
				var stta = new Array();
				stta = quickgrade_ids.split("qwe");
				for(var i=0;i<stta.length;i++){
					aao+=stta[i];
				}
			}
		    $("#symptom").append(aao);
		    var grade = "1005";
		    $(".xxx").each(function(){
				if($(this).attr("grade")<grade){
					grade=$(this).attr("grade");
				}
			});   
		    if(grade!="1005"){
		  	    $("#quick_grade").val(grade);		  	 
		  	}else{
		  	    $("#quick_grade").val("");
		  	}
		    finalautograde();
		    $("#quickgrade_ids").val("");
		    $("#symptomhide").val($("#symptom").html());
		}else{
		    //先还原		
			$("#mews_a li").removeClass('active');
			$("#mews_b li").removeClass('active');
			$(".mews_score_A").text("0");
			$(".mews_score_B").text("0");
			$("#mewsgrade").val("");
			$("#pf_b li").removeClass('active');
			$("#pf_c li").removeClass('active');
			$(".Score_B").text("0");
			$(".Score_C").text("15");
			$("#etdsgrade").val("");
			
			$("#quickgrade_ids").val("");
			$("#level").children().removeClass("active");
			$("#symptom").html($("#symptomhide").val());
			//再赋值原来的
			var edts_ids = $("#edts_ids").val();
			
			if(edts_ids!=""){
				var arr1 = edts_ids.split(",");
				
				for(j = 0,len=arr1.length; j < len; j++) {
					$("#"+arr1[j]).trigger("click");
				}
			}
			var mews_ids = $("#mews_ids").val();
			if(mews_ids!=""){
				var arr2 = mews_ids.split(",");
			
				for(j = 0,len=arr2.length; j < len; j++) {
					if(arr2[j]!="e-b-8-4"){  	 					
						$("#"+arr2[j]).trigger("click");
 	 				}
				}
			}
			
			if(document.getElementById("mews_x")){
				getMewsScore();
			}
			if(document.getElementById("edts_x")){
				getTotalScore();
			}
			
			finalautograde();
		}
		$("#pjconfirmstatus").val("");
	});
	
	showdcpi();
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
	$("#handle2").text(grade+"级");
	if(cixu!=""){
		cixu = Number(cixu);
	}
	if(maxcixu!=""){
		maxcixu = Number(maxcixu);
	}
	if(cixu==1){
		$("#handle1").text("-");
		$("#handle1").parent().css("background","#898989");
	}
	if(cixu>maxcixu){
		$("#handle5").parent().css("background","#898989");
		$("#handle5").text("-");
	}
	$("#handle3").text("第"+cixu+"次分级");
	if(cixu>1){
		$("#handle1").text(cixu-1);
		$("#handle1").parent().css("background","#d61946");
	}
	if(cixu<=maxcixu){
		$("#handle5").text(cixu+1);
		$("#handle5").parent().css("background","#d61946");
	}
}
//点击去除评分
function clearGrade(btn){
	var type_x = $(btn).attr("id");
	if(type_x=='mews_x'){
		$("#mews_a li").removeClass('active');
		$("#mews_b li").removeClass('active');
		$(".mews_score_A").text("0");
		$(".mews_score_B").text("0");
		$("#mewsgrade").val("");
	}
	if(type_x=='edts_x'){
		$("#pf_b li").removeClass('active');
		$("#pf_c li").removeClass('active');
		$(".Score_B").text("0");
		$(".Score_C").text("15");
		$("#etdsgrade").val("");
	}
	
	finalautograde();
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
    				if($("#returnUrl").val()=="xgpj" || $("#returnUrl").val()=="histroy"){
    					$("#showsffenji").css("display","block");
    				}
    			}
    		}
    	}
    },
    error: function(){
    }
});
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
        			//$(".gradingWay").html("");
        			$("#pjbmenu").html("");
            		var str ="" ;
           	 		for(var i in rows){
           	 			var name = rows[i]["right_name"];
           	 		    var tyid = rows[i]["ty_id"];
           	 			var right_type = rows[i]["right_type"];
           	 			//if(right_type==2){
           	 			/*<p>
        				<span>疼痛评分</span>
        			</p>*/
           	 				/*str += "<button class='btn btn-rate' onclick='active4(this)'>"
           	 				str+= name;
           	 				str+= "</button>";*/
           	 				if(right_type==1){
           	 					str += " <p class='active'>";
           	 				}else{
           	 				str += " <p>";
           	 				}
           	 			    str += "<span tyid="+tyid+" onclick='active4(this)' ";
           	 			    	
           	 			    if(right_type==1){
           	 			    	str += " class='active'";
           	 			    }
           	 			    str+= " >";
           	 				str+= name;
           	 				str+= "</span></p>";
           	 			//}
           	 			//显示主要评分方式
           	 			if(right_type==1){
           	 				$('#panel-header').text(name);
           	 				$("#defultpjfsname").val(name);
           	 				if(tyid=='401'){
           	 					//显示快速分级
           	 					$('#quickgrade').show();
           	 					$('#defultpjfs').val("quickgrade");
           	 				}else if(tyid=='408'){
           	 					//显示EDTS评级
           	 					$('#quickpf').show();
           	 					$('#last_score_div').show();
           	 					$('#defultpjfs').val("quickpf");
           	 					if($("#autograde").val()!=""){
           	 					   getTotalScore();
           	 					}
           	 				}else if(tyid=='406'){
           	 					//显示MEWS评级
           	 					$('#mewspf').show();
           	 					$('#defultpjfs').val("mewspf");
           	 				}else{
           	 					$('#default').show();
           	 					$('#defultpjfs').val("default");
           	 				}
           	 			    $("#headerpingjb").text(name);
           	 			}
           	 		}
            		$("#pjbmenu").html(str);
        		}
        	}
        },
        error: function(){
        }
    });
}

function getSymptom(pid,level){
	$.ajax({
        type: "post",
        url: "#path()/divid/getSymptom",
        data:{
       	 pid:pid,
       	 level:level
        },
        dataType: "json",
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
        			$("#level").html("");
        			var str = "";
       	 			var list = result.rows;
       	 			for(var i in list){
       	 				var name = list[i]["name"].trim();
       	 				var xxx = list[i]["id"];
       	 				var grade = list[i]["grade"];
       	 				str+="<li ksid=\""+xxx+"\" onclick='showSymptom(this,\""+xxx+"\",\"" + name + "\","+level+",\""+grade+"\")'>"+name+"</li>"
       	 			}
       	 			$("#level").html(str);
        		}
        	}
        },
        error: function(){
        }
    });
}



function active1(level){
	
	if(level==1){
		getSymptom("0","1");
		$("#lv"+level).addClass('active').siblings().removeClass('active');
	}
	if(level==2){
		pid = $("#level_1_id").val();
		if(pid==""){
			toastr.warning("请先选择分类");
			return; 
		}else{
			getSymptom(pid,"2");
			$("#lv"+level).addClass('active').siblings().removeClass('active');
		}
		
	}
	if(level==3){
		ppid = $("#level_1_id").val();
		pid = $("#level_2_id").val();
		if(ppid==""){
			toastr.warning("请先选择分类");
			return; 
		}else if(pid==""){
			toastr.warning("请先选择主诉");
			return; 
		}else{
			getSymptom(pid,"3");
			$("#lv"+level).addClass('active').siblings().removeClass('active');
		}
		
	}
	
}

//用不到
/*function active2(grade){
	var value = $(grade).attr("value");
	
	var g = value.substring(value.length-1,value.length);
	var id = $(grade).attr("id");
	//模拟失去焦点，为了解决 button 自带的 焦点样式
	$(grade).blur();
	if(id=="g1"){
	}else if(id=="g2"){
		//组装样式名称
		var css = 'btn-'+g+'-selected';
		if($(grade).is('.'+css)){
			$(grade).removeClass(css);
			$("#finalgrade").val('');
			return;
		}
		for(var i=1;i<6;i++){
			if(g!=i){
				$("#g2[value =\""+"100"+i+"\"]").removeClass('btn-'+i+'-selected');
			}else{
				$("#g2[value =\""+value+"\"]").addClass(css);
			}
		}
		$("#finalgrade").val(value);
	}
}*/

function active3(dept){
	$("#qingquxiang").text($(dept).text());
	var t_id = $(dept).attr("id");
	$("#deptment").val(t_id);
	$("#setGone").modal('hide');
}

function active4(btn){
	
	$("#headerpingjb").text($(btn).text());
	//评级方式按钮点击效果
	if($(btn).parent().is('.active')){
		
	}else{
		$(btn).parent().addClass('active').siblings().removeClass('active');
		//$(btn).addClass('active').siblings().removeClass('active');
		var name = $(btn).text();
		$('#panel-header').text(name);
		var tyid = $(btn).attr("tyid");
		if(tyid=='401'){
			//显示快速分级
			$('#quickgrade').show().siblings().hide();
		}else if(tyid=='408'){
			//EDTS
			$('#quickpf').show().siblings().hide();
			//$('#last_score_div').show();
			getTotalScore();
		}else if(tyid=='406'){
			//MEWS
			$('#mewspf').show().siblings().hide();
		}else{
			$('#default').show().siblings().hide();
		}
	}
}

//选择快速分级 后显示等级
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
			html+= "qwe<div class=\"alert alert-dismissable\">";
			html+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" ";
			html+= "onclick='delkuaisugrade(this);' aria-hidden=\"true\" parentid=\""+parentid+"\" grade=\""+grade+"\" id=\""+pid+"\">×</button>"
			html+= $("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name;
			html+= "</div>";
		}else{
			html+= "<div class=\"alert alert-dismissable\">";
			html+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" ";
			html+= "onclick='delkuaisugrade(this);' aria-hidden=\"true\" parentid=\""+parentid+"\" grade=\""+grade+"\" id=\""+pid+"\">×</button>"
			html+= $("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name;
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
        		$("#fullname").val(rows.fullname);
        		$("#cardnum").val(rows.cardnum);
        		$("#bornday").val(rows.bornday);
        		$("#gender").val(rows.gender);
        		$("#age").val(rows.age);
        		$("#tel").val(rows.tel);
        		$("#idcard").val(rows.idcard);
        		$("#hisid").val(rows.hisid);
        		$("#status").val(rows.status);
        		//$("#category").val(rows.category);
        		$("#category").find("option[value='"+rows.category+"']").attr("selected",true);
        		$("button[name='source'][value='"+rows.source+"']").addClass("active");
        		$("button[name='lyfs'][value='"+rows.admission+"']").addClass("active");
        		$("button[name='lstd'][value='"+rows.greenchannel+"']").addClass("active");
        		if(rows.others!=null && rows.others!=""){
        			var th = JSON.parse(rows.others);
        			$("button[name='others'][value='"+th.sanwu+"']").addClass("active");
        			$("button[name='others'][value='"+th.aids+"']").addClass("active");
        			$("#othersinput").val(th.other);
        		}
        		$("button[name='consciousness'][value='"+rows.consciousness+"']").addClass("active");
        		var a = rows.anamnesis;
        		if(a!=null&&a!=""){
        			var strs= new Array(); //定义一数组 
        			strs=a.split(","); //字符分割 
        			for (var i=0;i<strs.length ;i++ ) 
        			{ 
        				if(strs[i].indexOf("|")>0){
        					$("button[name='anamnesis'][value='其他']").addClass("active");
        					$("#jwsother").val(strs[i].split("|")[1]);
        				}else{
        					$("button[name='anamnesis'][value='"+strs[i]+"']").addClass("active");
        				}
        			} 
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
        		$("#sighid").val(rows.id);
        		$("#sg").val(rows.sg);
        		$("#tz").val(rows.tz);
        		$("#huxi").val(rows.hx);
        		$("#tiwen").val(rows.tw);
        		$("#maibo").val(rows.mb);
        		$("#shuzhangya").val(rows.szy);
        		$("#shousuoya").val(rows.ssy);
        		$("#spo2").val(rows.spo2);
        		$("#pcn").val(rows.pcn);
        		$("#il6").val(rows.il6);
        		$("#crp").val(rows.crp);
        		$("#cea").val(rows.cea);
        		$("#afp").val(rows.afp);
        		$("#myo").val(rows.myo);
        		$("#ddimer").val(rows.ddimer);
        		$("#fer").val(rows.fer);
        		$("#ntprobnp").val(rows.ntprobnp);
        		$("#hsctnl").val(rows.hsctnl);
        		$("#ckmb").val(rows.ckmb);
        		$("#hsctnl").val(rows.hsctnl);
        		$("#ctnt").val(rows.ctnt);
        		$("#ca").val(rows.ca);
            
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
            	$("#cixu").val(rows.cixu);
            	$("#feijz").val(rows.feijz);
            	$("#savestatus").val(rows.savestatus);
            	$("#handleid").val(rows.id);
            	$("#deptment").val(rows.dividdepartment);
            	if(rows.feijz!=null && rows.feijz!="" && rows.feijz==2){
            		$('#feijzann').trigger("click");
            		
            		$("#autograde").val("");
	        		$("#finalgrade").val("");
	        		$("#changereason option:first").prop("selected", 'selected');
	        		$("#reasondetail").val("");
	        		$("#lastfinalgrade").val("");
	        		$("#lastfinalgradename").val("");
	        		$("#lastupdgradereason").val("");
	        		$("#lastupdreasondetail").val("");
	        		
	        		$("#atuogradearea").empty();
	        		$("#atuogradearea").append('<div class="st-grade" style="height:64px"></div>');
	        		$("#finalgradearea").empty();
	        		$("#finalgradearea").append('<div class="st-grade" style="height:64px"></div>');
	        		$("#grade").html("");
	        		$("#zdpj").html("");
	        		$("#sdpj").html("");
					$("#twopartpj").css("display","none");
					$("#grade").css("display","block");
            	}else{
            		$('#jzann').trigger("click");
            	}
	        		$("#autograde").val(rows.autograde);
	        		$("#finalgrade").val(rows.finalgrade);
	        		$('#changereason').find("option[value='"+rows.changereason+"']").attr("selected",true);
	        		$("#reasondetail").val(rows.reasondetail);
	        		if(rows.changereason != null && rows.changereason != "" && rows.reasondetail != null && rows.reasondetail != ""){
						$("#sdtjreason").text("手动调级原因："+rows.changereason+";"+rows.reasondetail);
					}else if(rows.reasondetail != null && rows.reasondetail != ""){
						$("#sdtjreason").text("手动调级原因："+rows.reasondetail);
					}else{
						$("#sdtjreason").text("手动调级原因："+rows.changereason);
					}
	        		
	        		$("#lastfinalgrade").val(rows.finalgrade);
	        		$("#lastupdgradereason").val(rows.changereason);
	        		$("#lastupdreasondetail").val(rows.reasondetail);
	        		
	        		if(rows.dividenurse!=null){
	        			$("#lastnurseqianm").css("display","block");
	        			$("#nurseqianm").css("display","none");
	        			$("#lastnurse").text(rows.dividenurse);
	        		}else{
	        			$("#nurseqianm").css("display","block");
	        		}
	        		
	        		$("#hljl").val(rows.hljl); 
	        		$('#zhusu').combobox('setValue',rows.zhusu);
	        		$("input[name='zhusu']").val(rows.zhusu); 
	        		$("#dividtime").val(rows.dividtime); 
	        		if(rows.dividdepartmentname!=null && rows.dividdepartmentname!=""){
	        			$("#qingquxiang").text(rows.dividdepartmentname);
	        		}
	        		
	        		if((rows.finalgrade!=null)&&(rows.finalgrade!="")){
	        			var name = getgradenamebygradeid(rows.finalgrade);
	    		    	var str = '';
	    		    	str += '<div class="st-grade btn-'+rows.finalgrade+'-selected" style="height:64px;">';
	    		    	str += '<p class="allocatNum" style="line-height: 64px;">'+name+'</p>';
	    		    	str += '<p class="allocatUnit">级</p>';
	    		    	str += '</div></div>';
	    		    	$("#finalgradearea").html(str);
	    		    	$("#finalgradename").val(name);
	    		    	$("#lastfinalgradename").val(name);
	    		    	if((rows.autograde!=null)&&(rows.autograde!="")){
		    		    	var name2 = getgradenamebygradeid(rows.autograde);
		    		    	var str2 = '';
		    		    	str2 += '<div class="st-grade btn-'+rows.autograde+'-selected" style="height:64px;">';
		    		    	str2 += '<p class="allocatNum" style="line-height: 64px;">'+name2+'</p>';
		    		    	str2 += '<p class="allocatUnit">级</p>';
		    		    	str2 += '</div></div>';
		    		    	$("#atuogradearea").html(str2);
		    		    	
		    		    	$("#zdpj").html("");
		    		    	var html = '<p class="text-center">综合评级:</p>';
		    		    	html+= '<div class="st-grade  btn-'+rows.autograde+'-selected">';
				    		html+= '<div><p class="allocatNum">'+name2+'</p>';
				    		html+= '<p class="allocatUnit">级</p>';
				    		html+= '</div></div>';
		    				$("#zdpj").html(html);
	    		    	}

	    		    	$("#sdpj").html("");
	    		    	var html = '<p class="text-center">手动评级:</p><div class="st-grade  btn-'+rows.finalgrade+'-selected">';
	    		    	html+= '<div><p class="allocatNum">'+name+'</p>';
	    		    	html+= '<p class="allocatUnit">级</p>';
	    		    	html+= '</div></div>';
	    		    	$("#sdpj").html(html);
			    		
			    		$("#twopartpj").css("display","block");
	    				$("#grade").css("display","none");
	    				
	    				/*$("#grade").html("");
			    		var html = '<div class="st-grade  btn-'+rows.finalgrade+'-selected">';
			    		html+= '<div><p class="allocatNum">'+name+'</p>';
			    		html+= '<p class="allocatUnit">级</p>';
			    		html+= '</div></div>';
			    		$("#grade").html(html);*/
	        		}else{
	        			if((rows.autograde!=null)&&(rows.autograde!="")){
	        				var name = getgradenamebygradeid(rows.autograde);
	        		    	var str = '';
	        		    	str += '<div class="st-grade btn-'+rows.autograde+'-selected" style="height:64px;">';
	        		    	str += '<p class="allocatNum" style="line-height: 64px;">'+name+'</p>';
	        		    	str += '<p class="allocatUnit">级</p>';
	        		    	str += '</div></div>';
	        		    	$("#atuogradearea").html(str);
	        		    	
	    		    		$("#grade").html("");
	    		    		var html = '<div class="st-grade  btn-'+rows.autograde+'-selected">';
	    		    		html+= '<div><p class="allocatNum">'+name+'</p>';
	    		    		html+= '<p class="allocatUnit">级</p>';
	    		    		html+= '</div></div>';
	    		    		$("#grade").html(html);
	    		    		
	    		    		$("#twopartpj").css("display","none");
		    				$("#grade").css("display","block");
		    				
		    				$("#zdpj").html("");
		    		    	var html = '<p class="text-center">综合评级:</p>';
		    		    	html+= '<div class="st-grade  btn-'+rows.autograde+'-selected">';
				    		html+= '<div><p class="allocatNum">'+name+'</p>';
				    		html+= '<p class="allocatUnit">级</p>';
				    		html+= '</div></div>';
		    				$("#zdpj").html(html);
	        		    	
	        			}
	        		}
        			if(rows.dividdepartment!=""){
        				$("span[id =\""+rows.dividdepartment+"\"]").addClass('text-info');
        			}
            	}
        	
        },
        error: function(){
        }
    });
}

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
            	var str ="<li><a style='color:#fff'>分诊去向</a></li>";
       	 		for(var i in rows){
       	 			var td_id = rows[i]["td_id"];
       	 			var name = rows[i]["td_name"];      	 		    
       	 			str +='<li style="cursor:pointer;" onclick="active3(this)" id="';
       	 			str += td_id;
       	 			str += '"><span>';
       	 			/*str +='<i class="fa fa-gittip"></i>';*/
       	 			str += name;
       	 			str +='</span></li>';
       	 		}
       	 	//str+='</li>';
       	 	$("#depart").html(str);
            
        	}
        },
        error: function () {
        	alert("获取失败，请联系管理员");
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
        async:false,
        success: function(result){
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
        		var str = $("#symptom").html();
        		var grade2 = '1005';
       	 		for(var i in rows){
       	 			var name = rows[i]["name"];
       	 		    var grade = rows[i]["grade"];
       	 			var id = rows[i]["id"];
       	 		    var parentid = rows[i]["parentid"];
       	 		    if(grade!=null && grade !=""){
       	 		    	if(grade<grade2){
       	 		    	  grade2=grade;
       	 		    	}
       	 		    }
       	 			str += "<div class=\"alert alert-dismissable\">";
       				str+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" ";
       				str+= "onclick='delkuaisugrade(this);' aria-hidden=\"true\" parentid=\""+parentid+"\" grade=\""+grade+"\" id=\""+id+"\">×</button>"
       				str+= name;
       			    str+= "</div>";    	 		
       	 		}
       	 		if(grade2!="1005"){
       	 		    $("#quick_grade").val(grade2);
       	 		}      	 		
       	 		$("#symptom").html(str);
       	 	    $("#symptomhide").val(str);
        	}else{
        		$("#quick_grade").val("");
        	}
        },
        error: function(){
        }
    });
}

function loadPatientSymtpomByType(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSymtpomByType",
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
            	$("#mews_a li").removeClass('active');
        		$("#mews_b li").removeClass('active');
        		$(".mews_score_A").text("0");
        		$(".mews_score_B").text("0");
        		$("#pf_b li").removeClass('active');
        		$("#pf_c li").removeClass('active');
        		$(".Score_B").text("0");
        		$(".Score_C").text("15");
        		$("#mewsgrade").val("");
        		$("#etdsgrade").val("");
       	 		for(var i in rows){
       	 			var symptom_id = rows[i]["symptom_id"];
       	 			var symptom_type = rows[i]["symptom_type"];
       	 			if(symptom_type=="EDTS"){
       	 				//模拟点击 触发算分
       	 				if(symptom_id=="e-b-8-4"){
       	 					
       	 				  $("#e-b-8-4").find("input").val(rows[i]["symptom_id_value"]);
       	 				}else{
       	 				  $("#"+symptom_id).trigger("click");
       	 				}
       	 				
       	 			}
       	 			if(symptom_type=="MEWS"){
       	 				//模拟点击 触发算分
       	 				$("#"+symptom_id).trigger("click");
       	 			}
       	 		}
        	}else{
        		$("#mews_a li").removeClass('active');
        		$("#mews_b li").removeClass('active');
        		$(".mews_score_A").text("0");
        		$(".mews_score_B").text("0");
        		$("#pf_b li").removeClass('active');
        		$("#pf_c li").removeClass('active');
        		$(".Score_B").text("0");
        		$(".Score_C").text("15");
        		$("#mewsgrade").val("");
        		$("#etdsgrade").val("");
        	}
        },
        error: function(){
        }
    });
}

//从his 获取 用户数据
function readCard(){
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
                    
                    if(year==year2 && month==month2 && strDate==strDate2){
                    	if(hours<hours2+4){
                    		queryPatientHandleScore(id);
                    		loadPatientBaseInfo(id);
                    		$("#symptom").html("");
                			$("#symptomhide").val("");
                    		if($("#returnUrl").val()=="xgpj" || $("#returnUrl").val()=="histroy"){
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
                    	}else if(hours==hours2+4 && minutes>minutes2){
                    		queryPatientHandleScore(id);
                    		loadPatientBaseInfo(id);
                    		$("#symptom").html("");
                			$("#symptomhide").val("");
                    		if($("#returnUrl").val()=="xgpj" || $("#returnUrl").val()=="histroy"){
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
                    	}else if(hours==hours2+4 && minutes==minutes2 && seconds>seconds2){
                    		queryPatientHandleScore(id);
                    		loadPatientBaseInfo(id);
                    		$("#symptom").html("");
                			$("#symptomhide").val("");
                    		if($("#returnUrl").val()=="xgpj" || $("#returnUrl").val()=="histroy"){
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
                    	}else{
                    		var birthday = info.bornday.substring(0,10);
                    		$("#fullname").val(info.fullname);
                    		$("#bornday").val(birthday);
                    		$("#gender").val(info.gender);
                    		$("#age").val(jsGetAge('',birthday));
                    		$("#tel").val(info.tel);
                    		$("#hisid").val(info.hisid);
                    	}
                    }else{
                    	var birthday = info.bornday.substring(0,10);
                		$("#fullname").val(info.fullname);
                		$("#bornday").val(birthday);
                		$("#gender").val(info.gender);
                		$("#age").val(jsGetAge('',birthday));
                		$("#tel").val(info.tel);
                		$("#hisid").val(info.hisid);
                    }
        		}else{
        			var birthday = info.bornday.substring(0,10);
            		$("#fullname").val(info.fullname);
            		$("#bornday").val(birthday);
            		$("#gender").val(info.gender);
            		$("#age").val(jsGetAge('',birthday));
            		$("#tel").val(info.tel);
            		$("#hisid").val(info.hisid);
        		}
                
        	}else{
        		queryhisinfo();
        	}
        },
        error: function(){
        	toastr.clear();
			toastr.warning("读卡失败");
        }
    });
	
	//getTotalScore();
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
       		$("#idcard").val(info.social_no);
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

//读取监护仪参数
function readMach(){
	
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



function easyPanel(inputId) {
	var datas = [];
	if(inputId == 'tiwen'){
		 datas = [
				'36.0','36.1','36.2','36.3','36.4','36.5','36.6','36.7','36.8','36.9',
				'37.0','37.1','37.2','37.3','37.4','37.5','37.6','37.7','37.8','37.9',
				'38.0','38.1','38.2','38.3','38.4','38.5','38.6','38.7','38.8','38.9',
				'39.0','39.1','39.2','39.3','39.4','39.5','39.6','39.7','39.8','39.9'
			];
	}else if(inputId == 'maibo'){
		 datas = [
	            	'10','15','20','25','30','35','40','45','50','55',
	            	'60','61','62','63','64','65','66','67','68','69',
	            	'70','71','72','73','74','75','76','77','78','79',
	            	'80','81','82','83','84','85','86','87','88','89',
	            	'90','91','92','93','94','95','96','97','98','99',
	            	'100','101','102','103','104','105','106','107','108','109',
	            	'110','111','112','113','114','115','116','117','118','119',
	            	'120','125','130','135','140','145','150','155','160','165',
	            	'170','175','180','185','190','200','205','210','215','220',
	            	'230','240','250','260','270','280','290','300','310','320'];
	}else if(inputId == 'huxi'){
		 datas = [
					'1','2','3','4','5','6','7','8','9','10',
					'11','12','13','14','15','16','17','18','19','20',
					'21','22','23','24','25','26','27','28','29','30',
					'31','32','33','34','35','36','37','38','39','40',
					'41','42','43','44','45','46','47','48','49','50',
					'51','52','53','54','55','56','57','58','59','60'
				];
	}else if(inputId == 'shousuoya'){
		 datas = [
		          '80','81','82','83','84','85','86','87','88','89',
		          '90','91','92','93','94','95','96','97','98','99',
		          '100','101','102','103','104','105','106','107','108','109',
		          '110','111','112','113','114','115','116','117','118','119',
		          '120','121','122','123','124','125','126','127','128','129',
		          '130','131','132','133','134','135','136','137','138','139',
		          '140','141','142','143','144','145','146','147','148','149',
		          '150','155','160','165','170','175','180','185','190','195',
		          '200','205','210','215','220','225','230','235','240','245',
		          '250','255','260','265','270','275','280','285','290','295'
				];
	}else if(inputId == 'shuzhangya'){
		 datas = [
			'10','11','12','13','14','15','16','17','18','19',
			'20','21','22','23','24','25','26','27','28','29',
			'30','31','32','33','34','35','36','37','38','39',
			'40','41','42','43','44','45','46','47','48','49',
			'50','51','52','53','54','55','56','57','58','59',
			'60','61','62','63','64','65','66','67','68','69',
			'70','71','72','73','74','75','76','77','78','79',
			'80','81','82','83','84','85','86','87','88','89',
			'90','91','92','93','94','95','96','97','98','99',
			'100','101','102','103','104','105','106','107','108','109',
			'110','111','112','113','114','115','116','117','118','119'
				];
	}else if(inputId == 'spo2'){
		 datas = [
					'10','11','12','13','14','15','16','17','18','19',
					'20','21','22','23','24','25','26','27','28','29',
					'30','31','32','33','34','35','36','37','38','39',
					'40','41','42','43','44','45','46','47','48','49',
					'50','51','52','53','54','55','56','57','58','59',
					'60','61','62','63','64','65','66','67','68','69',
					'70','71','72','73','74','75','76','77','78','79',
					'80','81','82','83','84','85','86','87','88','89',
					'90','91','92','93','94','95','96','97','98','99'
		
		];
	}

	new Vcity.CitySelector({input:inputId},datas);
	
	//Vcity._m.on(document, 'click', function (event) {
	//	
	//});

};
/*根据出生日期算出年龄*/
function jsGetAge(age,strBirthday){
	if((age!='')&&(age!=null)){
		return age;
	}
	
	if(strBirthday == ''||strBirthday==null){
		return '0';
	}
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    
    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
   
    var ageDiff = nowYear - birthYear ; //年之差
    if(ageDiff > 2){
    	return ageDiff+"岁";
    }else{
    	var monthiDiff = nowMonth - birthMonth;
    	var dayDiff = nowDay - birthDay;//日之差
    	if((ageDiff==0)&&(monthiDiff<=2)){
    		
    		if(monthiDiff==0){
    			return dayDiff+ "天";
    		}else if(monthiDiff==1){
    			return dayDiff+monthiDiff*30 + "天";	
    		}else{
    			if(dayDiff>0){
    				return monthiDiff+"月";
    			}else{
    				return dayDiff+monthiDiff*30 + "天";	
    			}
    		}
    	}else if((ageDiff==0)&&(monthiDiff>2)){
    		return monthiDiff+"月";
    	}else if((ageDiff==2)&&(monthiDiff>0)){
    		return ageDiff+"岁";
    	}else if((ageDiff==2)&&(monthiDiff==0)&&(dayDiff>0)){
    		return ageDiff+"岁";
    	}else if(dayDiff<0){	
    		return (ageDiff*12+monthiDiff-1)+"月";
    	}else{
    		return (ageDiff*12+monthiDiff)+"月";
    	}
    }  
}

function getMin(a,b,c){
	return a<b?(a<c?a:c):(b<c?b:c);
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
							gradebtn1 += '<div  class="st-grade btn-1001-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p style="cursor:pointer;" class="allocatNum" id="1001">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';   
						}
						if (grade == '2') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1002-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p style="cursor:pointer;" class="allocatNum" id="1002">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';  
						}
						if (grade == '3') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1003-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p style="cursor:pointer;" class="allocatNum" id="1003">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';  
						}
						if (grade == '4') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1004-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p style="cursor:pointer;" class="allocatNum" id="1004">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';  
						}
						if (grade == '5') {
							gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
							gradebtn1 += '<div class="st-grade btn-1005-selected">';
							gradebtn1 += '<div>';
							gradebtn1 += '<p style="cursor:pointer;" class="allocatNum" id="1005">'+grade_name+'</p>';
							gradebtn1 += '<p class="allocatUnit">级</p>';
							gradebtn1 += '</div></div></div>';  
						}

					}
					style.innerHTML = css;
					document.getElementsByTagName('HEAD').item(0).appendChild(style);
					$("#gradearea").html(gradebtn1);
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

//手动调级
function activeGrade(grade,name){
	$("#finalgradearea").html("");
	$("#finalgrade").val(grade);
	var str = '';
	str += '<div class="st-grade btn-'+grade+'-selected" style="height:64px;">';
	str += '<p class="allocatNum" style="line-height: 64px;">'+name+'</p>';
	str += '<p class="allocatUnit">级</p>';
	str += '</div></div>';
	$("#finalgradearea").html(str);
	
	$("#finalgrade").val(grade);
	$("#finalgradename").val(name);
	
}

function tiaozhuanfenji(){
	$('#fenzhenpjb').modal();
	var name = $("#headerpingjb").text();
	if(name=='快速分级'){
			//显示快速分级
			
		}else if(name=='EDTS评分'){
			 getTotalScore();
			
		}else if(name=='MEWS评分'){
			getMewsScore();
		}else{
			
		}
	//EDTS评分 
	var edts_ids = "";
	
	$("#quickpf").find('li[class="active"]').each(function(){
		edts_ids += $(this).attr("id")+",";
	});
	if(edts_ids !=""){
		edts_ids = edts_ids.substring(0,edts_ids.length-1);
	}
	$("#edts_ids").val(edts_ids);
	
	//MEWS评分 
	var mews_ids = "";
	
	$("#mewspf").find('li[class="active"]').each(function(){
		mews_ids += $(this).attr("id")+",";
	});
	if(mews_ids !=""){
		mews_ids = mews_ids.substring(0,mews_ids.length-1);
	}
	$("#mews_ids").val(mews_ids);
}

//不用了
/*function goback(){
	
	//先还原
		$("#mews_a li").removeClass('active');
		$("#mews_b li").removeClass('active');
		$(".mews_score_A").text("0");
		$(".mews_score_B").text("0");
		$("#mewsgrade").val("");
		$("#pf_b li").removeClass('active');
		$("#pf_c li").removeClass('active');
		$(".Score_B").text("0");
		$(".Score_C").text("15");
		$("#mewsgrade").val("");
	//再赋值原来的
	var edts_ids = $("#edts_ids").val();
	
	if(edts_ids!=""){
	var arr1 = edts_ids.split(",");
	
		for(j = 0,len=arr1.length; j < len; j++) {
			$("#"+arr1[j]).trigger("click");
		}
	}
	var mews_ids = $("#mews_ids").val();
	if(mews_ids!=""){
		var arr2 = mews_ids.split(",");
	
		for(j = 0,len=arr2.length; j < len; j++) {
			$("#"+arr2[j]).trigger("click");
		}
	}
	
	
	if(document.getElementById("mews_x")){
		getMewsScore();
	}
	if(document.getElementById("edts_x")){
		getTotalScore();
	}
	
	//如果 初始什么都没选 默认 空
	if((edts_ids=="")&&(mews_ids=="")){
		var  finalgrade = $("#finalgrade").val();
		
		if(finalgrade==""){
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
		
		$("#autograde").val("");
		var str = '';
		str += '<div class="st-grade" style="height:64px">';
		str += '</div>';
		$("#atuogradearea").html(str);
		
		$("#mews_x").trigger("click");
		$("#edts_x").trigger("click");
	}
}*/


function getgradenamebygradeid(id){
	var gradename="";
	var gradecolor="";
	$.ajax({
        type: "post",
        url: "#path()/divid/getGradeNameByGradeId",
        data:{
       	 gradeid:id
        },
        async:false,
        dataType: "json",
        success: function(result){
       	 //填入信息
        	if(result!=null){
        		if(result.status==200){
        			gradename=result.rows.gradename;
        			gradecolor=result.rows.gradecolor;
        		}else{
        		}
        	}
        },
        error: function(){
       	 
        }
    });
	//return gradename+"|"+gradecolor;
	return gradename
}

function confirmupdgradearea(){
	if($("#finalgrade").val()!=""){
		if($("#changereason option:selected").val()=="" && $("#reasondetail").val()==""){
				toastr.clear();
				toastr.warning('<ol  class="list-unstyled"><li>请选择修改原因或者手动填写修改原因！</li></ol>');
		}else{
			var reasondetail = $("#reasondetail").val(); 
			if(reasondetail!=""){			
				re = /^[\u4E00-\u9FA5A-Za-z0-9_，,。.！!;；：:？?\s]{0,150}$/;
				if(reasondetail.length>0){
					if(!re.test(reasondetail)){
						toastr.clear();
						toastr.warning('<ol  class="list-unstyled"><li>修改原因不能超过150字符（中文，英文，数字），不能包含特殊字符</li></ol>');
						return;
					} 
				}
			}		
			var grade = $("#finalgrade").val();
			var name = $("#finalgradename").val();
			
			$("#lastfinalgrade").val(grade);
			$("#lastfinalgradename").val(name);
			$("#lastupdgradereason").val($("#changereason option:selected").val());
			$("#lastupdreasondetail").val(reasondetail);
			
			$("#sdpj").html("");
			var html = '<p class="text-center">手动评级:</p><div class="st-grade  btn-'+grade+'-selected">';
			html+= '<div><p class="allocatNum">'+name+'</p>';
			html+= '<p class="allocatUnit">级</p>';
			html+= '</div></div>';
			$("#sdpj").html(html);
			
			$('#modalGrade').modal('hide');
		}
	}else{
		$('#modalGrade').modal('hide');
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
			$("#symptom").html("");
			$("#symptomhide").val("");
			loadPatientSignInfo(id,$("#handle1").text());
			loadPatientSymtpomByType(id,$("#handle1").text());
			loadPatientSymtpom(id,$("#handle1").text());
			loadPatientHandle(id,$("#handle1").text());
			$("#cixu").val(cixu-1);
		}else{
			return;
		}
	}else if($(d).attr("id")=="handle4"){
		if($("#handle5").text()!="-" && cixu < maxcixu){
			$("#symptom").html("");
			$("#symptomhide").val("");
			loadPatientSignInfo(id,$("#handle5").text());
			loadPatientSymtpomByType(id,$("#handle5").text());
			loadPatientSymtpom(id,$("#handle5").text());
			loadPatientHandle(id,$("#handle5").text());
			$("#cixu").val(cixu+1);
		}else if($("#handle5").text()=="-"){
			return;
		}else if(cixu >= maxcixu){
			$("#symptom").html("");
			$("#symptomhide").val("");
			loadPatientSignInfo(id,maxcixu);
			loadPatientSymtpomByType(id,maxcixu);
			loadPatientSymtpom(id,maxcixu);
			loadPatientHandle(id,maxcixu);
			$("#cixu").val(maxcixu+1);
		}
	}

	showdcpi();
}

//获取监护状态
function queryMachStatus(){
	 $.ajax({
	      type: "post",
	      url: "#path()/divid/queryMachStatus", 
	      data:{
	      	
	      },
	      dataType: "json",
	      success: function(result){
	      	if((result!=null)&&(result.status==200)){
	      		//填入信息
	      		var info = result.rows;
	      		//alert(info);
	      		$("#mach_status").html(info);
	      		
	      	}else{
	      		toastr.clear();
	  			toastr.warning("读取失败");
	      	}
	      },
	      error: function(){
	      	toastr.clear();
				toastr.warning("读取失败");
	      }
	 });
}

//评级确认标识
function pjconfirm(){
	$("#pjconfirmstatus").val("ok");
}

//删除快速分级后，重新计算分级
function delkuaisugrade(th){
	var kuid = $(th).attr("id");
	$("[ksid='"+kuid+"']").removeClass("active");
	var grade = "1005";
	$(".xxx").each(function(){
		if(kuid!=$(this).attr("id")){
			if($(this).attr("grade")<grade){
				grade=$(this).attr("grade");
			}
		}
	});
	if(grade!="1005"){
	  $("#quick_grade").val(grade);
	}else{
	  $("#quick_grade").val("");
	}
	finalautograde();
}
