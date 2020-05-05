
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
	var minutes;
	if(d.getMinutes()<10){
		minutes="0"+d.getMinutes();
	}else{
		minutes=d.getMinutes();
	}
	var time = d.getHours()+':'+minutes;
	$('.date').text(str);
	$('.time').text(time);
	setTimeout(showtime,60000);
}
function openAddPatient(){
	window.location.href="#path()/divid/index?type=new";
}
function openDividIndex(){
	window.location.href="#path()/index/index";
}
function openhistoryrecord(){
	window.location.href="#path()/historyrecord/index";
}
function openEvents(){
	window.location.href="#path()/events/index";
}

//动态设置评级等级样式
/*function setgradebtncss() {
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

}*/


function setgradebtncss2() {
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
    	    		var css = '.groupClass1 .btn,.groupClass2 .btn{margin-right:6px;}';
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

function qiantui(){
	$('#signoutModel').modal();
}

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

function call(){

  $.messager.confirm("操作提示", "是否报警？", function (data) {
      if (data) {
            $.ajax({
                 type: "post",
                 url: "#path()/index/insertWarnInfo",
                 data:{
                    sender:'#userName()',
                    dept:'#depart()'
                 },
                  dataType: "json",
                  async:false,
                  success: function(result){
                    if(result!=null){
                    	if(result.status==200){
                    		$.messager.alert('提示','成功报警！');
            			} else {
            				//默认颜色设置
            			}
                    }
            		},
            		error : function() {
            		}
            	});
            }
            else {
            }
        });	
}