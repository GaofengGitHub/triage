var showPre = false; //是否显示院前页面
var showDemo = false; //是否显示演示功能
var showClassify = true;//是否显示快速分级的自定义
var project_name ='wh';//项目名。zy or wh
var is_print='';//是否打印分诊单
var is_receive ='';//是否接诊
var is_quick ='';//是否快速分级

$(document).ready(function() {
	
	//快速分级演示demo
	$(".people-head-pic").click(function(){
		$(".people-pic").hide();
		$(".people-head-pic").addClass("people-head-active");
		$(".people-pic-select").show();
	});
	$(".people-pic-select li").click(function(){
		$(".people-pic,.quickgrade-demo02>div.pull-right").show();
		$(".people-pic-select").hide();
	});
	$(".quickgrade-demo02>div.pull-right ul li").click(function(){
		$(this).toggleClass("active");
	});
	
	
	
	$(document).on("mouseover", ".hover-parent", function() {
		$(this).find(".hover-content").show();
	});
	$(document).on("mouseleave", ".hover-parent", function() {
		$(this).find(".hover-content").hide();
	});

		
	
	//如果不显示演示功能  就 调用 隐藏 
	if(!showDemo){
		hideDemoMenu();
				
	}else{
		hideUnDemoMenu();
		initIcd();
	}
	//如果不显示快速分级自定义  就 调用 隐藏 
	if(!showClassify){
		hideClassify();
				
	}else{
		hideUnClassify();
	}
	
	initWs("#userId()");
	//不要注释啊，每隔10秒弹报警
	showToastr(true);
	 //setInterval(function(){
	//showToastr(true);
	// }, 13000);
	$(document).on('click', '[Userbehavior]', function() {
		var Userbehavior = $(this).attr("Userbehavior");
		saveUserbehavior(Userbehavior);
	})
	
	$(document).on('click', '[Userbehaviorbyname]', function() {
		if($("#feijz").length>0){
			if($("#feijz").val()==1){
				var Userbehaviorbyname = $(this).attr("Userbehaviorbyname");
				saveUserbehaviorByOpName(Userbehaviorbyname,"新增患者");
			}else{
				var Userbehaviorbyname = $(this).attr("Userbehaviorbyname");
				saveUserbehaviorByOpName(Userbehaviorbyname,"非急诊");
			}
		}
	})
	
	//快速分级自定义类别 写内容时
	$(document).on('focus', '#10000000001', function() {
		$("#10000000001").find("input[type='text']").css("border-color","");
		$("#classify1").find("li").removeClass("activecc");
		//var str = '<li>主诉></li>';
		var str = "";
		var str2 = "";
		$("#level_1_name").val("");
		$("#level_2_name").val("");
		
		if($("#classify2").find("#10000000002").length>0){
			$("#classify2").find("#10000000002").siblings("[id]").remove();
		}else{
			str += '<li id="10000000002" class="addtype-input"><input id="zdy2" type="text" maxlength="20" placeholder="自定义主诉"></li>';
			var html = $("#classify2").find("li").first().prop("outerHTML");
			$("#classify2").html(html+str);
			$("#classify2").show();
			$("#seach_lv2").val("");
			$("#seach_lv3").val("");
			initZdy2();
		}
		if($("#classify3").find("#10000000003").length>0){
			$("#classify3").find("#10000000003").siblings("[id]").remove();
		}else{
			str2 += '<li id="10000000003" class="ksfjgrade-box clearfix"><input  id="zdy3" type="text" maxlength="20" placeholder="自定义评分依据">';
 			str2 += '<button type="button" name="ksfjgrade" grade="1001" class="btn btn-xs">一级</button>';
			str2 += '<button type="button" name="ksfjgrade" grade="1002" class="btn btn-xs">二级</button>';
		    str2 += '<button type="button" name="ksfjgrade" grade="1003" class="btn btn-xs">三级</button>';
	        str2 += '<button type="button" name="ksfjgrade" grade="1004" class="btn btn-xs">四级</button>';
            str2 += '<button type="button" onclick="zdyksfj();" class="btn btn-xs">></button></li>';
			var html = $("#classify3").find("li").first().prop("outerHTML");
			$("#classify3").html(html+str2);
			$("#classify2").css("border-right","none");
			$("#classify3").show();
			$("#seach_lv3").val("");
			initZdy3();
		}
	})
    //快速分级自定义主诉 写内容时
	$(document).on('focus', '#10000000002', function() {
		$("#10000000002").find("input[type='text']").css("border-color","");
		$("#level_2_name").val("");
		$("#classify2").find("li").removeClass("activecc");
		//var str = '<li>评分依据></li>';
		var str = "";
		if($("#classify3").find("#10000000003").length>0){
			$("#classify3").find("#10000000003").siblings("[id]").remove();
		}else{
			/*//如果第三级就一个 就保存第二季
			if(x.length==1){
				showGrade(x[0],xx.name,xx.id,pid);
			}*/
			str += '<li id="10000000003" class="ksfjgrade-box clearfix"><input  id="zdy3" type="text" maxlength="20" placeholder="自定义评分依据">';
 			str += '<button type="button" name="ksfjgrade" grade="1001" class="btn btn-xs">一级</button>';
			str += '<button type="button" name="ksfjgrade" grade="1002" class="btn btn-xs">二级</button>';
		    str += '<button type="button" name="ksfjgrade" grade="1003" class="btn btn-xs">三级</button>';
	        str += '<button type="button" name="ksfjgrade" grade="1004" class="btn btn-xs">四级</button>';
            str += '<button type="button" onclick="zdyksfj();" class="btn btn-xs">></button></li>';
			var html = $("#classify3").find("li").first().prop("outerHTML");
			$("#classify3").html(html+str);
			$("#classify2").css("border-right","none");
			$("#classify3").show();
			$("#seach_lv3").val("");
			initZdy3();
		}
	})
   //快速分级自定义评分依据 写内容时
	$(document).on('focus', '#10000000003', function() {
		$("#10000000003").find("input[type='text']").css("border-color","");
	})
	//快速分级自定义评分依据级别 一级 二级 三级 四级 加样式
	$(document).on('focus', '[name="ksfjgrade"]', function() {
		$("#10000000003").find("[name='ksfjgrade']").css("border-color","");
		//btn-1001-selected
		$(this).addClass("btn-"+$(this).attr("grade")+"-selected");
		$(this).siblings().each(function(){
			$(this).removeClass("btn-"+$(this).attr("grade")+"-selected");
		})
	})
});

// 隐藏具有 demo-class 样式的 菜单
function  hideDemoMenu(){
	 $(".demo-class").each(function(){
		 $(this).hide();
	 });
	 $(".demo-noshow-class").each(function(){
		 $(this).hide();
	 });
}
function  hideUnDemoMenu(){
	
	 $(".demo-class").each(function(){
		 $(this).show();
	 });
	 $(".undemo-class").each(function(){
		 $(this).hide();
	 });
	 
}
//隐藏具有 classify-class 样式的 菜单（隐藏快速分级的自定义）
function  hideClassify(){
	 $(".classify-class").each(function(){
		 $(this).hide();
	 });
}
function  hideUnClassify(){
	
	 $(".classify-class").each(function(){
		 $(this).show();
	 });	 
}
function updselfpassword(){
        	var abc = false;
        	var userid = "#userId()";
        	var yuanpassword = $("#yuanpassword").val();
        	if(feiknum("原密码","password",yuanpassword,$("#yuanpassword").parents(".form-group").next())){return;};
        	$("#yuanpassword").parents(".form-group").next().text("");
        	var newpassword = $("#newpassword").val();
        	if(feiknum("新密码","password",newpassword,$("#newpassword").parents(".form-group").next())){return;};
        	$("#newpassword").parents(".form-group").next().text("");
        	var confirmpassword = $("#confirmpassword").val();
        	if(feiknum("确认新密码","password",confirmpassword,$("#confirmpassword").parents(".form-group").next())){return;};
        	if(yuanpassword==newpassword){
        		$("#newpassword").parents(".form-group").next().text("原密码与新密码相同！！");
        		$("#newpassword").parents(".form-group").next().css("color","red");
        		return;
        	}
        	if(newpassword!=confirmpassword){
        		$("#confirmpassword").parents(".form-group").next().text("新密码与确认新密码不相同");
        		$("#confirmpassword").parents(".form-group").next().css("color","red");
        		return;
        	}
        	$("#confirmpassword").parents(".form-group").next().text("");
        	$(".tips").text("");
        	$.ajax({
				type : "post",
				url : "#path()/index/upduserselfconfirm",
				dataType : "json",
				async : false,
				data : {
					userid:userid,
					yuanpassword:yuanpassword,
					newpassword:newpassword,
					confirmpassword:confirmpassword
				},
				success : function(result) {
					if(result.status=="200"){
						abc=true;
						alert("修改密码成功，请重新登录！！");
						window.location.href='#sso()logout';
					}else{
						alert("修改失败，"+result.message);
						console.log(result);
						return;
					}
				},
				 error: function(XMLHttpRequest, textStatus, errorThrown) {
                     alert(XMLHttpRequest.status);
                     alert(XMLHttpRequest.readyState);
                     alert(textStatus);
                 },
			});
        	if(abc){
        		$('#choseEDTS4').modal('hide')	;
        	}
		}

function showtime(){
	var d = new Date();
	var str = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
	var time = d.getHours()+':'+d.getMinutes();
	$('.date').text(str);
	$('.time').text(time);
}
function openAddPatient(){
	window.location.href="#path()/divid/index";
}
function openIngIndex(){
	window.location.href="#path()/index/ing";
}

function openDividIndex(){
	window.location.href="#path()/index/index";
}
function openEvents(){
	window.location.href="#path()/events/index";
}
function openGrade(){
	window.location.href="#path()/divid/grade";
}

//动态设置评级等级样式
function setgradebtncss() {
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
    	    		var css = '.groupClass1 .btn,.groupClass2 .btn{margin-right:6px;}';
    	    		var gradebtn1 = '<label>综合评级：</label>';
    	    		var gradebtn2 = '<label>手工调级：</label>';
       	 			for(var i in list){
       	 				var ys_id = list[i]["ys_id"].toString();
       	 				var grade_color = list[i]["grade_color"];
       	 				var grade = ys_id.substring(ys_id.length-1,ys_id.length);
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
    	    			css += ';color:#fff;}';
       	 			}
       	 			
       	 			for(var i in list){
   	 					var ys_id = list[i]["ys_id"].toString();
   	 					var grade_name = list[i]["grade_name"].toString();
   	 					var grade = ys_id.substring(ys_id.length-1,ys_id.length);
   
						if (grade == '1') {
							gradebtn1 += '<button type="button" id="g1" class="btn  btn-1" value="'+ys_id+'">'+grade_name+'</button>';
							gradebtn2 += '<button type="button" id="g2" class="btn  btn-1" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
						}
						if (grade == '2') {
							gradebtn1 += '<button type="button" id="g1" class="btn  btn-2" value="'+ys_id+'">'+grade_name+'</button>';
							gradebtn2 += '<button type="button" id="g2" class="btn  btn-2" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
						}
						if (grade == '3') {
							gradebtn1 += '<button type="button" id="g1" class="btn  btn-3" value="'+ys_id+'">'+grade_name+'</button>';
							gradebtn2 += '<button type="button" id="g2" class="btn  btn-3" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
						}
						if (grade == '4') {
							gradebtn1 += '<button type="button" id="g1" class="btn  btn-4" value="'+ys_id+'">'+grade_name+'</button>';
							gradebtn2 += '<button type="button" id="g2" class="btn  btn-4" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
						}
						if (grade == '5') {
							gradebtn1 += '<button type="button" id="g1" class="btn  btn-5" value="'+ys_id+'">'+grade_name+'</button>';
							gradebtn2 += '<button type="button" id="g2" class="btn  btn-5" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
						}

					}
					style.innerHTML = css;
					document.getElementsByTagName('HEAD').item(0).appendChild(style);
					//console.log(gradebtn2);
					$(".groupClass1").html(gradebtn1);
					$(".groupClass2").html(gradebtn2);
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


function setgradebtncss2() {
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
       	 			for(var i in list){
       	 				var ys_id = list[i]["ys_id"];
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
    	    			css += ';color:#fff;}';
       	 			}
       	 			
					style.innerHTML = css;
					document.getElementsByTagName('HEAD').item(0).appendChild(style);
					
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
	
	//默认 等级按钮设置
	function setdefultcss(){
		var style = document.createElement('style');
		style.type = 'text/css';
		var css = '';
		//button 1
		css += '.btn-1{background:none;color:#e10109;border:1px solid #e10109;}';
		css += '.btn-1:hover,.btn-1-selected{background:#e10109;color:#fff;}';
		//button 2
		css += '.btn-2{background:none;color:#ff6300;border:1px solid #ff6300;}';
		css += '.btn-2:hover,.btn-2-selected{background:#ff6300;color:#fff;}';
		//button 3
		css += '.btn-3{background:none;color:#04ff04;border:1px solid #04ff04;}';
		css += '.btn-3:hover,.btn-3-selected{background:#04ff04;color:#fff;}';
		//button 4
		css += '.btn-4{background:none;color:#326afd;border:1px solid #326afd;}';
		css += '.btn-4:hover,.btn-4-selected{background:#326afd;color:#fff;}';
		//button 5
		css += '.btn-5{background:none;color:#8b8b8b;border:1px solid #8b8b8b;}';
		css += '.btn-5:hover,.btn-5-selected{background:#8b8b8b;color:#fff;}';
		
		style.innerHTML = css;
		document.getElementsByTagName('HEAD').item(0).appendChild(style);
	}
}

function call() {	
	$.ajax({
		type : "post",
		url : "#path()/index/insertWarnInfo",
		data : {
			sender : '#userName()',
			dept : '#depart()'
		},
		dataType : "json",
		async : false,
		success : function(result) {
			if (result != null) {
				if (result.status == 200) {
					//alert("报警成功!");
					initTable();
				} else {
					alert("报警失败!");
					//默认颜色设置
				}
			}
		},
		error : function() {
		}
	});
}
function getWarnNums(){  
	
	$.ajax({
        type: "post",
        url: "#path()/index/queryWarnInfo",
        data:{
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
        			//$("#warnNum").html(result.total);
        			//$("#warnNum2").html(result.total);
        		}
        	}
		},
		error : function() {
		}
	});
}
//警告弹窗
function showToastr(flag){
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
        			var flag2 = false;
        			var info = $('#warninfo').html();
        			if(info=='危急报警提示'){
        				flag =false;
        			}
        			var content = "<table class='table-warning' ><thead><tr><th width='30%'>患者姓名</th><th width='15%'>等级</th><th>内容</th></tr></thead>";
        			content += '<tbody>';
        			
        			g1 = map["a1001"];	
    	     			for(var i in g1){
    	     			    flag2 = true;
    	     				var name = g1[i]["fullname"];
    	     				var cardnum = g1[i]["cardnum"];
    	     				var dividenurse = g1[i]["dividenurse"];
    	     				var gradename = g1[i]["gradename"];
    	     				var special = g1[i]["special"];
    	     				var qianfei = g1[i]["qianfei"];
    	     				content += '<tr onclick="goall(this);" cnum='+cardnum+'><td>';
    	     				if (special=="1"){
    	     					content+='<span class="red"><i class="fa fa-star"></i></span>';
							}
    	     				content +=  '' +name +'</td>';
    	     				content += '<td>';
    	     				content+='<button type="button" class="btn btn-1001   btn-1001-selected btn-xs ">'+gradename+'</button>';
    	     				content += '</td>';
    	     				content += '<td>';
    	     				content += '等待时间过长，请再次评估！';
    	     				content += '</td>';
    	     			}
    	     			g2 = map["a1002"];
    	     			for(var i in g2){
	    	     			flag2 = true;
	    	     			var name = g2[i]["fullname"];
    	     				var cardnum = g2[i]["cardnum"];
    	     				var gender = g2[i]["gender"];
    	     				var dividenurse = g2[i]["dividenurse"];
    	     				var gradename =g2[i]["gradename"];
    	     				var special = g2[i]["special"];
    	     				var qianfei = g2[i]["qianfei"];
    	     				content += '<tr onclick="goall(this);" cnum='+cardnum+'><td>';
    	     				if (special=="1"){
    	     					content+='<span class="red"><i class="fa fa-star"></i></span>';
							}
    	     				content +=  '' +name +'</td>';
    	     				content += '<td>';
    	     				content+='<button type="button" class="btn btn-1002   btn-1002-selected btn-xs ">'+gradename+'</button>';
    	     				content += '</td>';
    	     				content += '<td>';
    	     				content += '等待时间过长，请再次评估！';
    	     				content += '</td>';
    	     			}
        	     	g3 = map["a1003"];
    	     		for(var i in g3){
    	     			flag2 = true;
    	 				var name = g3[i]["fullname"];
	     				var cardnum = g3[i]["cardnum"];
	     				var gender = g3[i]["gender"];
	     				var dividenurse = g3[i]["dividenurse"];
	     				var gradename =g3[i]["gradename"];
	     				var special = g3[i]["special"];
	     				var qianfei = g3[i]["qianfei"];
	     				content += '<tr onclick="goall(this);" cnum='+cardnum+'><td>';
	     				if (special=="1"){
	     					content+='<span class="red"><i class="fa fa-star"></i></span>';
						}
	     				content +=  '' +name +'</td>';
	     				content += '<td>';
	     				content+='<button type="button" class="btn btn-1003   btn-1003-selected btn-xs ">'+gradename+'</button>';
	     				content += '</td>';
	     				content += '<td>';
	     				content += '等待时间过长，请再次评估！';
	     				content += '</td>';
    	     		}
    	     			
	 	   	     	g4 = map["a1004"];
	 	     		for(var i in g4){
	 	     			flag2 = true;
	 	 				var name = g4[i]["fullname"];
	     				var cardnum = g4[i]["cardnum"];
	     				var dividenurse = g4[i]["dividenurse"];
	     				var gradename =g4[i]["gradename"];
	     				var special = g4[i]["special"];
	     				var qianfei = g4[i]["qianfei"];
	     				content += '<tr onclick="goall(this);" cnum='+cardnum+'><td>';
	     				if (special=="1"){
	     					content+='<span class="red"><i class="fa fa-star"></i></span>';
						}
	     				content +=  '' +name +'</td>';
	     				content += '<td>';
	     				content+='<button type="button" class="btn btn-1004   btn-1004-selected btn-xs ">'+gradename+'</button>';
	     				content += '</td>';
	     				content += '<td>';
	     				content += '等待时间过长，请再次评估！';
	     				content += '</td>';
	        	 		
 	     		    }
	 	     		
	 	     		content += '</ol>';	
	 	     		var length =g1.length+g2.length+g3.length+g4.length;
		     		if(flag){
		     			if(flag2){
		     				toastr.error(content,'<font style="color:red;size:16px" id="warninfo">危急报警提示</font>');
		     				$("#warnNum").html("共有"+length+"条报警消息等待处理.....");
		        			$("#warnNum2").html("共有"+length+"条报警消息等待处理.....");
		     			}
		     		}
				} else {
				}
        	}
		},
		error : function() {
		}
	});
	
}

//数字转中文
function numberConvertToUppercase(num) {
      num = Number(num);
      var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];
      var length = String(num).length;
      if (length == 1) {
        return upperCaseNumber[num];
      } else if (length == 2) {
        if (num == 10) {
          return upperCaseNumber[num];
        } else if (num > 10 && num < 20) {
          return '十' + upperCaseNumber[String(num).charAt(1)];
        } else {
          return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
        }
      }
  }

//交班签退弹框
function qiantui(){
	$('#signoutModel').modal();
}
//交班签退查询
function jiaobanqiantui() {
	var a = true;
	$.ajax({
        type: "post",
        url: "#path()/signout/querypatientbydividenurse",
        data:{
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
                     if(!result.rows){
                    	 a=false;
                     }
				} else {
					//默认颜色设置
				}
        	}
		},
		error : function() {
		}
	});
	if(a){
		window.location.href='#sso()logout';
	}else{
		$('#signoutModel2').modal();
	}
}
function showothers(){
	var ismore=$('#ismore').html();
	if(ismore=='更多功能'){
		//用户行为监控记录“更多功能”
		saveUserbehavior("A80");
		
		$('#input').show();
		$('#case').show();
		$('#qualitymanage').show();
		$('#nextwork').show();
		$('#ismore').html('隐藏更多功能');
	}else{
		//用户行为监控记录“隐藏更多功能”
		saveUserbehavior("A81");
		
		$('#input').hide();
		$('#case').hide();
		$('#qualitymanage').hide();
		$('#nextwork').hide();
		$('#ismore').html('更多功能');
	}
}

function goall(th){
	//记录 查看单个患者报警信息 的操作点
	saveUserbehavior("A3");
	
	sessionStorage.setItem('pnum',$(th).attr("cnum"));
	window.location.href="#path()/index/index";
}

function saveUserbehavior(Userbehavior){
	var userid = "#userId()";
	var roleid = "#roleId()";
	$.ajax({
        type: "post",
        url: "#path()/index/saveUserbehavior",
        data:{
        	Userbehavior:Userbehavior,
        	userid:userid,
        	roleid:roleid
        },
        dataType: "json",
        //async:false,
        success: function(result){
		},
		error : function() {
		}
	});
}

function saveUserbehaviorByOpName(opname,page){
	var userid = "#userId()";
	var roleid = "#roleId()";
	$.ajax({
        type: "post",
        url: "#path()/index/saveUserbehaviorByOpName",
        data:{
        	opname:opname,
        	userid:userid,
        	roleid:roleid,
        	page:page
        },
        dataType: "json",
        //async:false,
        success: function(result){
		},
		error : function() {
		}
	});
}
//同步服务器时间 yyyy-MM-dd HH:mm:ss
function synctime(){
	var time = "";
	$.ajax({
        type: "post",
        url: "#path()/index/getnowtime",
        dataType: "json",
        async: false,
        data : {
        },
        success: function (result) {
        	if(result.status==200){
        		time=result.rows;
        	}else{
        		toastr.error('时间获取失败，请联系管理员');
        	}
        },
        error: function () {
        	toastr.error('时间获取失败，请联系管理员');
        	
        }
    });
	return time;
}

/*根据出生日期算出年龄*/
function jsGetAge(age,strBirthday){
	//手动输入修改年不满10位的问题，liuxj20190610
	if(strBirthday ==null){
		return'';
	}
	if(strBirthday.length<10){
		return'';
	}
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
    var monthiDiff = nowMonth - birthMonth;
    var dayDiff = nowDay - birthDay;//日之差
    if(ageDiff > 2){
    	if(monthiDiff<0){
    		ageDiff = ageDiff-1;
    	}
    	if(monthiDiff==0 && dayDiff<0){
    		ageDiff = ageDiff-1;
    	}
    	return ageDiff+"岁";
    }else{
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
function newman(){
	//新手引导
	introJs().setOptions({  
        'prevLabel': '上一步',  
        'nextLabel': '下一步',  
        'skipLabel': '关闭',  
        'doneLabel': '完成',
        'showBullets': false,//隐藏直接跳转按钮(避免onchangebug)  
    }).start().onexit(function() {//非常规退出  
    	FinishGuide("fz_pc_guide_index");  
    	$(".fz-step03-pic").hide();
    	$(".fz-step05-pic,.fz-step05-fast-pic").hide();
    	$(".fz-step08-pic").hide();
    	$(".fz-step09-pic").hide();
    	$(".skin-black .sidebar #addPatient a").css("color","#eee");
    	$(".introjs-skipbutton").removeClass("introjs-skipbutton-last");
    }).oncomplete(function() {//正常完成  
    	FinishGuide("fz_pc_guide_index");   
    	$(".fz-step03-pic").hide();
    	$(".fz-step05-pic,.fz-step05-fast-pic").hide();
    	$(".fz-step08-pic").hide();
    	$(".fz-step09-pic").hide();
    	$(".skin-black .sidebar #addPatient a").css("color","#eee");
    	$(".introjs-skipbutton").removeClass("introjs-skipbutton-last");
    }).onchange(function(obj) {//已完成当前一步  
    	$(".skin-black .sidebar #addPatient a").css("color","#eee");
        var curNum = parseInt($(obj).attr('data-step').match(/\d+/)[0]);//当前的下标  
        if (curNum == 3){
        	$(".fz-step03-pic").show();
        }else if (curNum == 5){
        	$(".fz-step05-pic,.fz-step05-fast-pic").show();
        }else if (curNum == 7){
        	$(".skin-black .sidebar #addPatient a").css("color","#333");
        }else if (curNum == 8){
        	$(".fz-step08-pic").show();
        	$(".fz-step09-pic").hide();
        	$(".introjs-skipbutton").removeClass("introjs-skipbutton-last");
        }else if (curNum == 9){
        	$(".fz-step08-pic").hide();
        	$(".fz-step09-pic").show();
        	$(".introjs-skipbutton").addClass("introjs-skipbutton-last");
        }else{
        	$(".fz-step03-pic").hide();
        	$(".fz-step05-pic,.fz-step05-fast-pic").hide();
        	$(".fz-step08-pic").hide();
        	$(".fz-step09-pic").hide();
        	$(".skin-black .sidebar #addPatient a").css("color","#eee");
        	$(".introjs-skipbutton").removeClass("introjs-skipbutton-last");
        	$('.tipStep'+ (curNum-1)).hide();//隐藏前一个  
            $('.tipStep'+ (curNum+1)).hide();//隐藏后一个  
            $(obj).show();//显示当前  	
        } 
    });	
}
function newman1(){
	//新手引导
	introJs().setOptions({  
        'prevLabel': '上一步',  
        'nextLabel': '下一步',  
        'skipLabel': '关闭',  
        'doneLabel': '完成',
        'showBullets': false,//隐藏直接跳转按钮(避免onchangebug)  
    }).start().onexit(function() {//非常规退出  
    	FinishGuide("fz_pc_guide_divid");  
    	$(".fz-step03-pic").hide();
    	$(".fz-step05-pic,.fz-step05-fast-pic").hide();
    	$(".fz-step08-pic").hide();
    	$(".fz-step09-pic").hide();
    	$(".introjs-skipbutton").removeClass("introjs-skipbutton-last");
    }).oncomplete(function() {//正常完成  
    	FinishGuide("fz_pc_guide_divid");   
    	$(".fz-step03-pic").hide();
    	$(".fz-step05-pic,.fz-step05-fast-pic").hide();
    	$(".fz-step08-pic").hide();
    	$(".fz-step09-pic").hide();
    	$(".introjs-skipbutton").removeClass("introjs-skipbutton-last");
    }).onchange(function(obj) {//已完成当前一步  
        var curNum = parseInt($(obj).attr('data-step').match(/\d+/)[0]);//当前的下标  
        if (curNum == 3){
        	$(".fz-step03-pic").show();
        }else if (curNum == 5){
        	$(".fz-step05-pic,.fz-step05-fast-pic").show();
        }else if (curNum == 8){
        	$(".fz-step08-pic").show();
        }else if (curNum == 9){
        	$(".fz-step08-pic").hide();
        	$(".fz-step09-pic").show();
        }else if (curNum == 10){
        	$(".introjs-skipbutton").removeClass("introjs-skipbutton-last");
        }else if (curNum == 11){
        	$(".introjs-skipbutton").addClass("introjs-skipbutton-last");
        }else{
        	$(".fz-step03-pic").hide();
        	$(".fz-step05-pic,.fz-step05-fast-pic").hide();
        	$(".fz-step08-pic").hide();
        	$(".fz-step09-pic").hide();
        	$(".introjs-skipbutton").removeClass("introjs-skipbutton-last");
        	$('.tipStep'+ (curNum-1)).hide();//隐藏前一个  
            $('.tipStep'+ (curNum+1)).hide();//隐藏后一个  
            $(obj).show();//显示当前  	
        } 
    });	
}
//记录完成新人指引
function FinishGuide(guide_name){
	$.ajax({
        type: "post",
        url: "#path()/index/finishGuide",
        dataType: "json",
        async: false,
        data : {
        	guide_name:guide_name
        },
        success: function (result) {
        	if(result.status==200){
        		console.log("完成指引");
        	}
        },
        error: function () {
        	console.log("指引报错");
        }
    });
}

//记录完成新人指引
function sysDeploy(id){
	$.ajax({
        type: "post",
        url: "#path()/index/sysDeploy",
        dataType: "json",
        async: false,
        data : {
        	id:id
        },
        success: function (result) {
        	if(result.status==200){
        		if(id=='420'){
        			is_print=result.rows.ty_name;
        		}
        		if(id=='421'){
        			is_receive=result.rows.ty_name;
        		}
        		if(id=='422'){
        			is_quick=result.rows.ty_name;
        		}
        		
        	}
        },
        error: function () {
        	console.log("报错");
        }
    });
}

function initIcd(){
	$("#reason11").typeahead({
		minLength: 0,//键入字数多少开始补全
        source: function (query, process) {
            $.ajax({
                url: '#path()/divid/getIcd',
                data: {
                	keywords: query
                },
                type: 'post',
                dataType: "json",
                success: function (result) {
                    var res = [];
                    var rows = result.rows;
                    if(rows ===null){
                    	return process(res);
                    }else{
                    	$.each(rows, function (i, item) {
                            var aItem = { id: item.id, name:item.code + " " +item.name ,value:item.name};//把后台传回来的数据处理成带name形式
                            res.push(aItem);
                        });
                    }
                    return process(res);
                }
            });
        },
        showHintOnFocus: "true",//将显示所有匹配项
        fitToElement: true,//选项框宽度与输入框一致
        items: 9999,//下拉选项中出现条目的最大数量。也可以设置为“all”
        autoSelect: false,//允许你决定是否自动选择第一个建议
        updater: function (item) {//item是对象,选中后默认返回displayText的值,对于需要的id和name没有,所以手动赋值吧
            $(".quickgrade-demo").show();
        	$(".quickgrade-demo>div.pull-right").show();
        	ShowIcdDetail(item.value);
        	
        	return item.value;//下拉框显示重写为name覆盖默认的displayText
        },
        delay: 500//在查找之间添加延迟
    });
	
}


function initZdy1(){
	$("#zdy1").typeahead({
		minLength: 0,//键入字数多少开始补全
        source: function (query, process) {
            $.ajax({
                url: '#path()/divid/getZdy',
                data: {
                	keywords: query,
                	type:"1"
                },
                type: 'post',
                dataType: "json",
                success: function (result) {
                    var res = [];
                    var rows = result.rows;
                    if(rows ===null){
                    	return process(res);
                    }else{
                    	$.each(rows, function (i, item) {
                            var aItem = { id: item.id, name:item.name ,value:item.name};//把后台传回来的数据处理成带name形式
                            res.push(aItem);
                        });
                    }
                    return process(res);
                }
            });
        },
        showHintOnFocus: "true",//将显示所有匹配项
        fitToElement: true,//选项框宽度与输入框一致
        items: 9999,//下拉选项中出现条目的最大数量。也可以设置为“all”
        autoSelect: false,//允许你决定是否自动选择第一个建议
        updater: function (item) {//item是对象,选中后默认返回displayText的值,对于需要的id和name没有,所以手动赋值吧
        	getNextZdyList(item.value,'','1');
        	
        	
        	return item.value;//下拉框显示重写为name覆盖默认的displayText
        },
        delay: 500//在查找之间添加延迟
    });
	
}

function initZdy2(){
	$("#zdy2").typeahead({
		minLength: 0,//键入字数多少开始补全
        source: function (query, process) {
            $.ajax({
                url: '#path()/divid/getZdy',
                data: {
                	keywords: query,
                	level1:$("#level_1_name").val(),
                	type:"2"
                },
                type: 'post',
                dataType: "json",
                success: function (result) {
                    var res = [];
                    var rows = result.rows;
                    if(rows ===null){
                    	return process(res);
                    }else{
                    	$.each(rows, function (i, item) {
                            var aItem = { id: item.id, name:item.name ,value:item.name};//把后台传回来的数据处理成带name形式
                            res.push(aItem);
                        });
                    }
                    return process(res);
                }
            });
        },
        showHintOnFocus: "true",//将显示所有匹配项
        fitToElement: true,//选项框宽度与输入框一致
        items: 9999,//下拉选项中出现条目的最大数量。也可以设置为“all”
        autoSelect: false,//允许你决定是否自动选择第一个建议
        updater: function (item) {//item是对象,选中后默认返回displayText的值,对于需要的id和name没有,所以手动赋值吧
        	getNextZdyList($("#level_1_name").val(),item.value,'2');
        	
        	
        	return item.value;//下拉框显示重写为name覆盖默认的displayText
        },
        delay: 500//在查找之间添加延迟
    });
	
}


function initZdy3(){
	$("#zdy3").typeahead({
		minLength: 0,//键入字数多少开始补全
        source: function (query, process) {
            $.ajax({
                url: '#path()/divid/getZdy',
                data: {
                	keywords: query,
                	level1:$("#level_1_name").val(),
                	level2:$("#level_2_name").val(),
                	type:"3"
                },
                type: 'post',
                dataType: "json",
                success: function (result) {
                    var res = [];
                    var rows = result.rows;
                    if(rows ===null){
                    	return process(res);
                    }else{
                    	$.each(rows, function (i, item) {
                            var aItem = { id: item.id, name:item.name ,value:item.name};//把后台传回来的数据处理成带name形式
                            res.push(aItem);
                        });
                    }
                    return process(res);
                }
            });
        },
        showHintOnFocus: "true",//将显示所有匹配项
        fitToElement: true,//选项框宽度与输入框一致
        items: 9999,//下拉选项中出现条目的最大数量。也可以设置为“all”
        autoSelect: false,//允许你决定是否自动选择第一个建议
        updater: function (item) {//item是对象,选中后默认返回displayText的值,对于需要的id和name没有,所以手动赋值吧
        	
        	return item.value;//下拉框显示重写为name覆盖默认的displayText
        },
        delay: 500//在查找之间添加延迟
    });
	
}

function getNextZdyList(level1,level2,type){
	$.ajax({
        url: '#path()/divid/getNextZdyList',
        data: {
        	level1: level1,
        	level2: level2,
        	type:type
        },
        type: 'post',
        dataType: "json",
        success: function (result) {
        	if(result!=null){
        		//console.log(result);
        		if(result.status==200){
        			var str = "";
       	 			var list = result.rows;
       	 			for(var i in list){
       	 				var name = list[i]["name"];
       	 				var id = list[i]["id"];
       	 				if(type=="1"){
       	 					str += '<li class="zdylevel2" onclick="getNextZdyList(&quot;'+level1+'&quot;,&quot;'+name+'&quot;,&quot;2&quot;);"><a>' +name+'</a></li>';
       	 					$("#level_1_name").val(level1);
       	 				}else if(type=="2"){
       	 					$("#level_2_name").val(level2);
       	 					$("#zdy2").val(level2);
       	 					str += '<li class="zdylevel3 btn-'+list[i]["grade"] +'-selected" onclick="zdylevel3select(&quot;'+id+'&quot;,&quot;'+name+'&quot;,&quot;'+list[i]["grade"]+'&quot;);"><a>' +name+'</a></li>';
       	 				}
       	 				
       	 			}
       	 			if(type=="1"){
       	 				$("#classify2").find(".zdylevel2").remove();
       	 				$("#classify2").append(str);
       	 			}else if(type=="2"){
       	 				$("#classify3").find(".zdylevel3").remove();
	 					$("#classify3").append(str);
	 					
       	 			}
        		}
        	}
        }
    });
}

//自定义第三级被选中
function zdylevel3select(id,name,grade){
	$("#10000000001").find("input[type='text']").css("border-color","");
	$("#10000000002").find("input[type='text']").css("border-color","");
	$("#10000000003").find("input[type='text']").css("border-color","");
	
	var one = $("#level_1_name").val();
	var two = $("#level_2_name").val();
	var three = name;
	
	var zdyksfjgradename = grade.substring(3,4)+"级";
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\"  name='quickitem' grade=\""+grade+"\" onclick=\"clearQuick(this)\" parentid='' zdyid='10000000003'>×</button><span>";
	
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
    
    //使用频率加1
    $.ajax({
        url: '#path()/divid/ZdyCountAdd',
        data: {
        	id: id
        },
        type: 'post',
        dataType: "json",
        success: function (result) {
        	
        		
        }
    });
}

function ShowIcdDetail(name){
	$.ajax({
        type: "post",
        url: "#path()/index/showIcdDetail",
        dataType: "json",
        async: false,
        data : {
        	code:name
        },
        success: function (result) {
        	if(result.status==200){
        		var rows = result.rows;
        		var str = "";
        		for(var i=0;i<rows.length;i++){
        			var grade = rows[i].grade;
        			var g_name = rows[i].name;
        			if(grade=="1001"){
        				str+='<li class="quickgrade-redbg" value="'+grade+'"><i></i>';
        			}else if(grade=="1002"){
        				str+='<li class="quickgrade-orangebg" value="'+grade+'"><i></i>';
        			}else if(grade=="1003"){
        				str+='<li class="quickgrade-yellowbg" value="'+grade+'"><i></i>';
        			}else{
        				str+='<li class="quickgrade-greenbg" value="'+grade+'"><i></i>';
        			}
        			str += g_name;
        			str += '</li>';	
        		}
        		if(str.length>0){
        			$("#icd10_detail").html('');
        			$("#icd10_detail").html(str);
        			 $(document).off("click",".quickgrade-demo>div.pull-right ul li").on("click",".quickgrade-demo>div.pull-right ul li",function(){
        			//$(".quickgrade-demo>div.pull-right ul li").click(function(){
        				$(this).toggleClass("active");
        			});
        		}
        	}
        },
        error: function () {
        	console.log("报错");
        }
    });
}

function Submitkspj(){
	$("#demopf").html('');
	var str = [];
	$(".quickgrade-demo>div.pull-right ul li,.quickgrade-demo02>div.pull-right ul li").each(function(){
	    if($(this).hasClass("active")){
	    	
	    	str.push($(this).attr("value"));
	    	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	    	str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"demo_x\" >×</button>";
	        if($("#icd").val().trim()>0){
	        	str1+= $("#icd").val()+"||"	;
	        }
	        str1 += $(this).text();
	    	str1+= "</div>";
	        $("#demopf").append(str1);
	        $(this).removeClass("active");
	    }
	  });
	
	if(str.length>0){
		var num = str[0];
	    for(var i=0;i<str.length;i++){
	        if(num > str[i]){
	            num = str[i];
	        }
	    }
	    showAutoGrade(num);
	}
	
	$("#icd").val("");
	$(".quickgrade-demo,.quickgrade-demo02").hide();
	$(".quickgrade-demo>div.pull-right,.quickgrade-demo02>div.pull-right").hide();
	$(".people-head-pic").removeClass("people-head-active");
}

//新疆
function SubmitDemoXj(){
	$("#demopf").html('');
	var str = [];
	var i = 0;
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\"demo_x\" >×</button>";
	var str2 = "";
	$(".quickgrade-demo>div.pull-right ul li,.quickgrade-demo02>div.pull-right ul li").each(function(){
	    if($(this).hasClass("active")){
	    	
	    	var grade = $(this).attr("value");
	    	if(grade=='1004'){
	    		i++;
	    	}
	    	str.push($(this).attr("value"));
	    	
	        str2+= $(this).text()+"||"	;
	    	
	        
	        $(this).removeClass("active");
	    }
	  });
	if(str2.length>0){
		str2 = str2.substring(0,str2.length-2);
		str1 += str2;
		str1+= "</div>";
		$("#demopf").html(str1);
	}
	
	if(str.length>0){
		var num2 = '1002';
		
		
		var num = str[0];
	    for(var i=0;i<str.length;i++){
	        if(num > str[i]){
	            num = str[i];
	        }
	    }
	    if(i>2){
	    	if(num2<num){
	    		num = num2;
	    	}
	    }
	    showAutoGrade(num);
	}
	
	$(".quickgrade-demo,.quickgrade-demo02").hide();
	$(".quickgrade-demo>div.pull-right,.quickgrade-demo02>div.pull-right").hide();
}
function showVersionModel(){
	$.ajax({
        type: "post",
        url: "#path()/index/versionList",
        dataType: "json",
        async: false,
        data : {
        	code:name
        },
        success: function (result) {
        	if(result.status==200){
        		var rows = result.rows;
        		var str = "";
        		var date="";
        		var strHtml ='';
        		for(var i=0;i<rows.length;i++){
        			var content = rows[i].content;
        			
        			if(content.indexOf('<br>')=='0'){
        				content =  content.replace('<br>','');
        			}
        			var version_num =  content.substring(0,content.indexOf('<br>'));
        			content = content.replace(version_num+'<br>', '');
        			var publish_date= content.substring(0,content.indexOf('<br>'));
        			date +='<option value="'+rows[i].id+'" >'+rows[i].create_time+'&nbsp;&nbsp;&nbsp;&nbsp;'+version_num+'</option>';
//        			alert(publish_date);
        			content =content.substring(content.indexOf('发布日期'));
        			content = content.replace(publish_date+'<br>', '');
        			content = content.replace('功能更新：<br>',
        							'<h1 class="update-title">功能更新：</h1>').replace(/【新增】/g,
        							'<span class="update-title2">【新增】</span>').replace(/【优化】/g,
        							'<span class="update-title2">【优化】</span>').replace(/【去除】/g,
        							'<span class="update-title2">【去除】</span>').replace(/【修复】/g,
        							'<span class="update-title2">【修复】</span>');
        			var style='';
        			if(i !=0){
        				style='style="display:none;"'
        			}
        			strHtml +='<div id="'+rows[i].id+'" '+style+'>'+content+' </div> ';
//        			var grade = rows[i].grade;
//        			var g_name = rows[i].name;
//        			if(grade=="1001"){
//        				str+='<li class="quickgrade-redbg" value="'+grade+'"><i></i>';
//        			}else if(grade=="1002"){
//        				str+='<li class="quickgrade-orangebg" value="'+grade+'"><i></i>';
//        			}else if(grade=="1003"){
//        				str+='<li class="quickgrade-yellowbg" value="'+grade+'"><i></i>';
//        			}else{
//        				str+='<li class="quickgrade-greenbg" value="'+grade+'"><i></i>';
//        			}
//        			str += g_name;
//        			str += '</li>';	
        		}
        		$("#versionContent").html(strHtml);
        		$("#version-select").html(date);
//        		if(str.length>0){
//        			$("#icd10_detail").html('');
//        			$("#icd10_detail").html(str);
//        			$(".quickgrade-demo>div.pull-right ul li").click(function(){
//        				$(this).toggleClass("active");
//        			});
//        		}
        	}
        },
        error: function () {
        	console.log("报错");
        }
    });
	$("#versionModel").modal();
}

function changeContent(){
	var id = $('#version-select  option:selected').val();  
	$("#"+id).show().siblings().hide();
}