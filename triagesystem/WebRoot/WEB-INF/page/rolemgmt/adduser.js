$(document).ready(function() {
	$("#borndate").datepicker({
		    language: 'zh-CN',// 设置语言
		    format:'yyyy-mm-dd',
		 	autoclose:true,
	 });
});

function showworkdepart(workdepart){
	$.ajax({
	    type: "post",
	    url: "#path()/usermgmt/querydepartlist",
	    dataType: "json",
	    data:{
	    },
	    success: function(result){
	       if(result.status=="200"){
	    	   for(var i=0;i<result.rows.length;i++){
	    		   $(workdepart).append("<option value='"+result.rows[i].departid+"'>"+result.rows[i].departname+"</option>");
	    	   }
    	   }else{
    		   toastr.warning(result.message);
	   	   }
	    },
	    error: function(){
	   	 
	   	 return false;
	    }
	});
}
function showworkrole(workidentity){
	$.ajax({
	    type: "post",
	    url: "#path()/usermgmt/queryrolelist",
	    dataType: "json",
	    data:{
	    },
	    success: function(result){
	       if(result.status=="200"){
	    	   for(var i=0;i<result.rows.length;i++){
	    		   $(workidentity).append("<option value='"+result.rows[i].roleid+"'>"+result.rows[i].rolename+"</option>");
	    	   }
    	   }else{
    		   toastr.warning(result.message);
	   	   }
	    },
	    error: function(){
	   	 
	   	 return false;
	    }
	});
}

function addrolediv(){
var aa = $("#addbiaoshi").val();
aa++;
$("#addbiaoshi").val(aa);
$("#addiddepart").append("<div id='rolerow"+aa+"'><select class='form-control formTwenty' id='workidentity"+aa+"' style='width: 200px' required>" +
		"<option value=''>--请选择身份--</option></select><select class='form-control formTwenty' id='workdepart"+aa+"' required style='width: 200px;margin-left: 4px;'>" +
		"<option value=''>--请选择科室--</option></select><input type='button' class='btn' value='删除' onclick='removerolerow(this)'" +
		"style='margin-bottom: 3px;background-color: #47A0CA;color: #fff;margin-left: 4px;'><span class='tips'></span></div>");
showworkrole("#workidentity"+aa);
showworkdepart("#workdepart"+aa);
}

function removerolerow(aa){
$(aa).parent("div").remove();
}

function adduserconfirm(){
var loginname = $("#loginname").val();
if(feiknum("登录名","loginname",loginname,$("#loginname").next())){return;};
var workid = $("#workid").val();
if(feiknum("工号","numberEnglish20",workid,$("#workid").next())){return;};
var divpassword1 = $("#divpassword1").val();
if(divpassword1!=""){
	if(feiknum("登录密码","password",divpassword1,$("#divpassword1").next())){return;};	
}
var divpassword2 = $("#divpassword2").val();
if(divpassword2!=""){
	if(feiknum("密码确认","password",divpassword2,$("#divpassword2").next())){return;};
}
if(divpassword2!="" || divpassword1!="" ){
	if(divpassword1!=divpassword2){
		$(".tips").text("");
		$("#divpassword2").next().text("登陆密码和确认密码不一致！！");
		$("#divpassword2").next().css("color","red");
		return;
	}
}
var username = $("#username").val();
if(feiknum("姓名","limit6",username,$("#username").next())){return;};
var identity = $("#identity").val();
if(identity!=""){
	if(feiknum("身份证号码","idcard",identity,$("#identity").next())){return;};
}
var gender = $("input[name='gender']:checked").val();
var borndate = $("#borndate").val();
var mobile = $("#mobile").val();
if(feiknum("手机号码","mobile",mobile,$("#mobile").next())){return;};
var linkman = $("#linkman").val();
var rolelist = [];
var roledepart = {};
var ro = $("#workidentity1 option:selected").val();
var de = $("#workdepart1 option:selected").val();
if(ro==""){
	$(".tips").text("");
	$("#iddeparterror").text("请选择一个身份！！");
	$("#iddeparterror").css("color","red");
	return;
}else if(de==""){
	$(".tips").text("");
	$("#iddeparterror").text("请选择一个科室！！");
	$("#iddeparterror").css("color","red");
	return;
}
roledepart.role=ro;
roledepart.depart=de;
rolelist.push(roledepart);
var lala = $("#addiddepart").children("div");
for(var i=0;i<lala.length;i++){
	var row = lala[i];
	var role = $(row).find("option:selected")[0];
	var depart = $(row).find("option:selected")[1];
	roledepart = {};
	roledepart.role=$(role).val();
	roledepart.depart=$(depart).val();
	if($(role).val()!=""){
		if($(depart).val()==""){
			$(".tips").text("");
			$(depart).parent().next().next().text("请选择一个科室！！");
			$(depart).parent().next().next().css("color","red");
			return;
		}
	}else{
		$(".tips").text("");
		$(depart).parent().next().next().text("请选择一个身份！！");
		$(depart).parent().next().next().css("color","red");
		return;
	}
	rolelist.push(roledepart);
}
$(".tips").text("");
var rolelist2 = JSON.stringify(rolelist);
	$.ajax({
	    type: "post",
	    url: "#path()/usermgmt/adduserconfirm",
	    dataType: "json",
	    async:false,
	    data:{
	    	loginname:loginname,
	    	workid:workid,
	    	divpassword1:divpassword1,
	    	username:username,
	    	identity:identity,
	    	gender:gender,
	    	borndate:borndate,
	    	mobile:mobile,
	    	linkman:linkman,
	    	rolelist:rolelist2
	    },
	    success: function(result){
	       if(result.status=="200"){
              toastr.warning("新增成功");
              load('usermgmt');
	       }else{
	    	   toastr.warning("新增失败！"+result.message);
		    	 return false;
	   	   }
	    },
	    error: function(){
	    	toastr.warning("新增失败！");
	    	 return false;
	    }

	});
}