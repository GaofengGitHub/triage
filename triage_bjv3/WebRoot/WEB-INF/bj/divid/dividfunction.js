$(document).ready(function(){	
	var txtlog = document.getElementById("TextArea1");
	//性别点击
	/*$("#gender span").bind("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});*/
	$(".selectGender>a").click(function(){
		$(this).addClass("active").siblings().removeClass("active")
		if($(this).hasClass("gender-man")){
			$(this).siblings("input").val("男")
		}else{
			$(this).siblings("input").val("女")
		}
	})
	//语音弹窗
	$(".talk-btn").click(function(){
		$("#talk-content").toggle();
	});
//	$('.my-select').selectpicker();
	$('.my-select').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
		if(clickedIndex === 0){
			$('.my-select').selectpicker('val', "无");
		}
	});

	//加入临时卡
	 $("#switch").bootstrapSwitch({ 
		 onText : "临时卡", // 设置ON文本  
		 offText : "普通卡", // 设置OFF文本  
		 onColor : "success",// 设置ON文本颜色     (info/success/warning/danger/primary)  
		 offColor : "danger", // 设置OFF文本颜色        (info/success/warning/danger/primary)  
		 size : "small", // 设置控件大小,从小到大  (mini/small/normal/large)  
		 handleWidth:"45",//设置控件宽度
	// 当开关状态改变时触发  
	onSwitchChange : function(event, state) { 
		var ProductId = event.target.defaultValue;
			if (state == true) {
				//临时卡
				console.log('临时卡');
				$(".linshi").hide();
			} else {
			//普通卡
				console.log('普通卡');
				$(".linshi").show();
			} 
		} 
	 });
	$(".boxItemOne").click(function () {
		if($(this).hasClass("active")){
			$(this).removeClass("active").removeAttr("data-value");
		}else {
			$(this).addClass("active").attr("data-value","Y");
		}
	});
	// 2019-10-09 新增 默认监护人信息与 医疗卡号不显示
	$(".Contact").hide();
	
	$(".yibaokahao").hide();
	
	// 2019-09-29 新增  办卡根据身份证号解析信息 
	$("#PATIDCardNo").bind("blur", function () {
		
		var PATIDCardType = $("#PATIDCardType").val();//证件类型
		if(PATIDCardType!='01'){//身份证就验证
			return;
		 }
		
		var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test($(this).val())) {
        	//alert("身份证号输入不正确，请重新输入!");
        } else {
        	 var idCardPaser = new IDCardPaser();
             var info = idCardPaser.getInfo($(this).val()) ;
        	//自动 年龄 出生日期 性别 填充
            $("#PATSexCode").val(info.sex);
        	$("#PATBirthDay").val(info.birth);
        	
        	var age = jsGetAge('',info.birth);
        	if(age==''){
        		
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
        }
    });
	
	// 2019-09-29 新增  挂号 读卡
	$("#cardnum2").bind("blur", function () {
		$("#cardnum").val($("#cardnum2").val());
		readCard();
    });
	// 2019-10-09 新增  办卡 患者类型 去显示医保卡号
	$("#PATSocialStatus").bind("change", function () {
		var PATSocialStatus= $(this).val();
		if(PATSocialStatus=='02'||PATSocialStatus=='03'){
			$(".yibaokahao").show();
		}else{
			$(".yibaokahao").hide();
			$("#PATInsuCardNo").val("");
		}
		
    });
	
	$(document).keyup(function(event){
		if(event.keyCode ==13){
			var thisidname=$(event.target).attr('id');
			  if(thisidname=="cardnum"){
				  if($("#feijz").val()==1){
					//用户行为监控记录"急诊-刷就诊卡"
					saveUserbehavior("A82");
				  }else{
					//用户行为监控记录"非急诊-刷就诊卡"
					saveUserbehavior("A108");
				  }
				  
				  //截取'='前的字符串
				  var str_before = $("#cardnum").val().split('=')[0];
				  $("#cardnum").val(str_before);
				  //alert();
				  readCard();
			  }else{
				  var cont = '请选中卡号栏进行刷卡！';
				  var dom = $('#cardnum');
				  var direction = "up";
				  tooltip(dom,cont,direction);
			  }
		  }
	});
	//收缩压		
	$("#shousuoya").bind('keyup', function(event) {
	    //console.log(String.fromCharCode(event.keyCode)); 
		var ssy = $(this).val();
		var age= $("#age").val().replace(/[\u4e00-\u9fa5]/g,"");
		var gaoxueya = $("#gaoxueya").val();	
		limit($(this));
		clearInterval(time);
		/*var time = setTimeout(function(){
			if($("#shousuoya").next().hasClass("smtz-arrow02")){
				$("#shousuoya").next().remove();
				$("#shousuoya").removeClass("hasarrow");
			}
			if(ssy == ""){
				$("#shousuoya").removeClass("caution");
				$("#shousuoya").removeClass("danger");
				
			}else{
				if(age<65){
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
				}else{
					if($("#gaoxueya").prop("checked") == true){
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
						if(ssy >= 150){
							$("#shousuoya").addClass("caution");
						}else{
							$("#shousuoya").removeClass("caution");
						}
					}else{
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
					}
				}
			}
		},2000)*/
		if($("#shousuoya").next().hasClass("smtz-arrow02")){
			$("#shousuoya").next().remove();
			$("#shousuoya").removeClass("hasarrow");
		}
		if(ssy == ""){
			$("#shousuoya").removeClass("caution");
			$("#shousuoya").removeClass("danger");
			
		}else{
			if(age<65){
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
					$("#shousuoya").attr("style","color:#40b25d");
				}
			}else{
				if($("#gaoxueya").prop("checked") == true){
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
					if(ssy >= 150){
						$("#shousuoya").addClass("caution");
					}else{
						$("#shousuoya").removeClass("caution");
						$("#shousuoya").attr("style","color:#40b25d");
					}
				}else{
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
						$("#shousuoya").attr("style","color:#40b25d");
					}
				}
			}
		}
		$("#shuzhangya").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");	
		$("#shousuoya").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");	
	})	
	
	//舒张压
	$("#shuzhangya").bind('keyup', function(event) {
	    //console.log(String.fromCharCode(event.keyCode)); 
		var szy = $(this).val();
		limit($(this));
		clearInterval(time);
		/*var time = setTimeout(function(){
			if($("#shuzhangya").next().hasClass("smtz-arrow02")){
				$("#shuzhangya").next().remove();
				$("#shuzhangya").removeClass("hasarrow");
			}
			if(szy == ""){
				$("#shuzhangya").removeClass("caution");
				$("#shuzhangya").removeClass("danger hasarrow");	
				
			}else{
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
			}	
		},2000)*/
		if($("#shuzhangya").next().hasClass("smtz-arrow02")){
			$("#shuzhangya").next().remove();
			$("#shuzhangya").removeClass("hasarrow");
		}
		if(szy == ""){
			$("#shuzhangya").removeClass("caution");
			$("#shuzhangya").removeClass("danger hasarrow");	
			$("#shuzhangya").attr("style","color:#40b25d");
			
		}else{
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
				$("#shuzhangya").attr("style","color:#40b25d");
			}
		}
		$("#shousuoya").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
		$("#shuzhangya").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
	})
	
	//心率
	$("#maibo").bind('keyup', function(event) {				
		var  mb = $(this).val();
		limit($(this));
		clearInterval(time);
		/*var time = setTimeout(function(){
			if($("#maibo").next().hasClass("smtz-arrow")){
				$("#maibo").next().remove();
			}
			if(mb == ""){
				$("#maibo").removeClass("danger");
			}else{
				if(mb < 50){
					$("#maibo").addClass("danger");
					if(!$("#maibo").next().hasClass("smtz-green-arrow")){
						$("#maibo").after('<i class="smtz-arrow smtz-green-arrow"></i>');
					}
				}else if(mb > 150 ){
					$("#maibo").addClass("danger");
					if(!$("#maibo").next().hasClass("smtz-red-arrow")){
						$("#maibo").after('<i class="smtz-arrow smtz-red-arrow"></i>');
					}
				}else{
					$("#maibo").removeClass("danger");
				}
			}
		},2000)*/
		if($("#maibo").next().hasClass("smtz-arrow")){
			$("#maibo").next().remove();
		}
		if(mb == ""){
			$("#maibo").removeClass("danger");
		}else{
			if(mb < 50){
				$("#maibo").addClass("danger");
				if(!$("#maibo").next().hasClass("smtz-green-arrow")){
					$("#maibo").after('<i class="smtz-arrow smtz-green-arrow"></i>');
				}
			}else if(mb > 150 ){
				$("#maibo").addClass("danger");
				if(!$("#maibo").next().hasClass("smtz-red-arrow")){
					$("#maibo").after('<i class="smtz-arrow smtz-red-arrow"></i>');
				}
			}else{
				$("#maibo").removeClass("danger");
			}
		}
		$("#maibo").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
	});	
	
	//spo2
	$("#spo2").bind('keyup', function(event) {				
		var spo2 = $(this).val();
		limit($(this));
		clearInterval(time);
		/*var time = setTimeout(function(){
			if($("#spo2").next().hasClass("smtz-arrow")){
				$("#spo2").next().remove();
			}
			if(spo2 == ""){
				$("#spo2").removeClass("danger");
			}else{
				if(spo2 < 90){
					$("#spo2").addClass("danger");
					if(!$("#spo2").next().hasClass("smtz-green-arrow")){
						$("#spo2").after('<i class="smtz-arrow smtz-green-arrow"></i>');
					}
				}else{
					$("#spo2").removeClass("danger");
				}
			}
		},2000)*/
		if($("#spo2").next().hasClass("smtz-arrow")){
			$("#spo2").next().remove();
		}
		if(spo2 == ""){
			$("#spo2").removeClass("danger");
		}else{
			if(spo2 < 90){
				$("#spo2").addClass("danger");
				if(!$("#spo2").next().hasClass("smtz-green-arrow")){
					$("#spo2").after('<i class="smtz-arrow smtz-green-arrow"></i>');
				}
			}else{
				$("#spo2").removeClass("danger");
				$("#spo2").attr("style","color:#40b25d");
			}
		}
		$("#spo2").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
	});
	
	//呼吸频率
	$("#huxi").bind('keyup', function(event) {				
		var huxi = $(this).val();
		limit($(this));
		clearInterval(time);
		/*var time = setTimeout(function(){
			if($("#huxi").next().hasClass("smtz-arrow")){
				$("#huxi").next().remove();
			}
			if(huxi == ""){
				$("#huxi").removeClass("danger");
			}else{
				if(huxi < 8){
					$("#huxi").addClass("danger");
					if(!$("#huxi").next().hasClass("smtz-green-arrow")){
						$("#huxi").after('<i class="smtz-arrow smtz-green-arrow"></i>');
					}
				}if(huxi > 30 ){
					$("#huxi").addClass("danger");
					if(!$("#huxi").next().hasClass("smtz-red-arrow")){
						$("#huxi").after('<i class="smtz-arrow smtz-red-arrow"></i>');
					}
				}else{
					$("#huxi").removeClass("danger");
				}
			}
		},2000)*/
		if($("#huxi").next().hasClass("smtz-arrow")){
			$("#huxi").next().remove();
		}
		if(huxi == ""){
			$("#huxi").removeClass("danger");
		}else{
			if(huxi < 8){
				$("#huxi").addClass("danger");
				if(!$("#huxi").next().hasClass("smtz-green-arrow")){
					$("#huxi").after('<i class="smtz-arrow smtz-green-arrow"></i>');
				}
			}else if(huxi > 30 ){
				$("#huxi").addClass("danger");
				if(!$("#huxi").next().hasClass("smtz-red-arrow")){
					$("#huxi").after('<i class="smtz-arrow smtz-red-arrow"></i>');
				}
			}else{
				$("#huxi").removeClass("danger");
				$("#huxi").attr("style","color:#40b25d");
			}
		}
		$("#huxi").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
	});
	
	//体温
	$("#tiwen").bind('keyup', function(event) {				
		var tiwen = $(this).val();
		limit($(this));
		clearInterval(time);
		/*var time = setTimeout(function(){
			if($("#tiwen").next().hasClass("smtz-arrow")){
				$("#tiwen").next().remove();
			}
			if(tiwen == ""){
				$("#tiwen").removeClass("caution");
			}else{
				if(tiwen <36){
					$("#tiwen").addClass("caution");
					if(!$("#tiwen").next().hasClass("smtz-green-arrow")){
						$("#tiwen").after('<i class="smtz-arrow smtz-green-arrow"></i>');
					}
				}if(tiwen >= 38){
					$("#tiwen").addClass("caution");
					if(!$("#tiwen").next().hasClass("glyphicon-arrow-up")){
						$("#tiwen").after('<i class="smtz-arrow smtz-red-arrow"></i>');
					}
				}else{
					$("#tiwen").removeClass("caution");
				}
			}
		},2000)*/
		if($("#tiwen").next().hasClass("smtz-arrow")){
			$("#tiwen").next().remove();
		}
		if(tiwen == ""){
			$("#tiwen").removeClass("caution");
		}else{
			if(tiwen <36){
				$("#tiwen").addClass("danger caution");
				if(!$("#tiwen").next().hasClass("smtz-green-arrow")){
					$("#tiwen").after('<i class="smtz-arrow smtz-green-arrow"></i>');
				}
			}else if(tiwen >= 38){
				$("#tiwen").addClass("danger caution");
				if(!$("#tiwen").next().hasClass("glyphicon-arrow-up")){
					$("#tiwen").after('<i class="smtz-arrow smtz-red-arrow"></i>');
				}
			}else{
				$("#tiwen").removeClass("danger caution");
				$("#tiwen").attr("style","color:#40b25d");
			}
		}
		$("#tiwen").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
	});
	
	//etCO2 呼吸氧化碳
	$("#pcn").bind('keyup', function(event) {
		limit($(this));
		$("#pcn").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
		$("#pcn").attr("style","color:#40b25d");
	});
	
	//添加验证
	$("#tiwen,#spo2,#ssz,#maibo").bind("input propertychange",function(event){
		showSignGrade(false);
	});
	
	//筛选
	function limit(obj){
		var value = obj.val();
		var re = /^[0-9]+.?[0-9]*$/;
		if(value != ""){
			if(re.test(value) == true){					
				if(value.indexOf(".") == -1){
					obj.attr("maxlength","3");
				}else{
					obj.attr("maxlength","5");
					var place1 = value.indexOf(".");
					var place2 = value.substr(0,place1);
					var place3 = value.substr(place1+1,place1+3);
					value = place2+"."+place3;
					obj.val(value);
				}
			}else{
				obj.val("");
			}
		}
	}
	
	//点击展开
	$(".curtain").click(function(){
		if($(this).find(".fa-chevron-down").length >= 1){
			if($(this).prev().text()=="来院方式>"){
				//用户行为监控记录"非急诊-展开来院方式"
				saveUserbehavior("A111");
			}else if($(this).prev().text()=="病情描述>"){
				//用户行为监控记录"非急诊-展开来院方式"
				saveUserbehavior("A113");
			}else if($(this).prev().text()=="护理记录>"){
				//用户行为监控记录"非急诊-展开来院方式"
				saveUserbehavior("A115");
			}
			$(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
			$(this).siblings(".curtain-main").show();
		}else{
			if($(this).prev().text()=="来院方式>"){
				//用户行为监控记录"非急诊-收起来院方式"
				saveUserbehavior("A112");
			}else if($(this).prev().text()=="病情描述>"){
				//用户行为监控记录"非急诊-收起病情描述"
				saveUserbehavior("A114");
			}else if($(this).prev().text()=="护理记录>"){
				//用户行为监控记录"非急诊-收起护理记录"
				saveUserbehavior("A116");
			}
			$(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
			$(this).siblings(".curtain-main").hide();
		}
	});
	
	$(".curtain1").click(function(){
		if($(this).find(".fa-chevron-down").length >= 1){
			if($(this).prev().text()=="生命体征>"){
				//用户行为监控记录"非急诊-展开生命体征"
				saveUserbehavior("A117");
			}else if($(this).prev().text()=="评分依据>"){
				//用户行为监控记录"非急诊-展开评分依据"
				saveUserbehavior("A120");
			}
			$(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
			$(this).siblings(".curtain-main").show();
			$("#dividtime1").removeClass("panel-t");

			$(".livetz").removeAttr("style")
		}else{
			if($(this).prev().text()=="生命体征>"){
				//用户行为监控记录"非急诊-收起生命体征"
				saveUserbehavior("A118");
			}else if($(this).prev().text()=="评分依据>"){
				//用户行为监控记录"非急诊-收起评分依据"
				saveUserbehavior("A121");
			}
			$(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
			$(this).siblings(".curtain-main").hide();
			$("#dividtime1").addClass("panel-t");
			$(".livetz").css("background","none")
		}
		
	})
	
	//选中
	$(".checkDiv>div .checked-static").click(function(){
		$(this).parents(".col-md-2").addClass("active").siblings().removeClass("active");
		$(this).find("input").attr("checked",true);
	});
	$(".checkDiv>div .checked-static").click(function(){
		$(this).parents(".triage-other-box").addClass("active").siblings().removeClass("active");
	});
	//复选框单选按钮点击文字选中
	$(".checkDiv>div label").click(function(){
		$(this).next().find("input[type='radio']").click();
	});
	$(".checkDiv1 .col-li>label").click(function(){
		$(this).next().find("input[type='checkbox']").click();
	});
	$("#allergic .col-li>label").click(function(){
		$(this).next().find("input[type='checkbox']").click();
	});
	$(".check-other").click(function(){
		$(this).next().find("input[type='checkbox'],input[type='radio']").click();
	});
	
	$(".fast-tc-content>div.col-check").click(function(){
		if($(this).index() == 3){
			return
		}
		$(this).toggleClass("active");
//		alert($(this).hasClass('active'));
		if($(this).hasClass('active')){
			$(this).find("span").find("input").prop("checked",true);
		}else{
			$(this).find("span").find("input").prop("checked",false);
		}
//		alert($(this).children("span").children("input").prop("checked"));
	});
	
	if($("#hydb1").val() != ""){
		$("#hydb1").css("opacity","1");
	}else{
		$("#hydb1").css("opacity","0");
	}
	$(".checkDiv1 input[type='checkbox']").click(function(){
		$(this).parents(".col-li").toggleClass("active");
		disable($(this));	
	});
	$(".allergic-history-section input[type='checkbox']").click(function(){
		$(this).parents(".col-li").toggleClass("active");
		disablegms($(this));	
	})
	$(".checkDiv2 input[type='checkbox']").click(function(){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-突发事件"
			saveUserbehavior("A84");
		}else{
			//用户行为监控记录"非急诊-突发事件"
			saveUserbehavior("A110");
		}
		
		$(this).parents(".col-li").toggleClass("active");
		/*if($(this).parents(".col-li").find("input[type='checkbox']").prop("checked")){
			//勾选补录
//			$("#dividtime").datepicker("disable").attr("readonly","readonly");
			$("#dividtime").removeAttr("readonly");
//			$("#dividtime").datepicker('disable');
			$("#m1_time").show();
			$("#m2_time").hide();
		}else{
			$("#dividtime").attr("readonly","readonly");
			$("#m2_time").show();
			$("#dividtimee").val($("#dividtime").val());
			$("#m1_time").hide();
		}*/
	})
	$(".checkDiv2 label").click(function(){
		$(".checkDiv2 input[type='checkbox']").click();
	})
	$(".checkDiv3 input[type='checkbox']").click(function(){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-突发事件"
			saveUserbehavior("A83");
		}else{
			//用户行为监控记录"非急诊-突发事件"
			saveUserbehavior("A109");
		}
		
		$(this).parents(".col-li").toggleClass("active");
		if($(this).parents(".col-li").find("input[type='checkbox']").prop("checked")){
			$("#events1").show();
		}else{
			$("#events1").hide();
		}
	});	
	$(".checkDiv3 label").click(function(){
		$(".checkDiv3 input[type='checkbox']").click();
	});
	$(".checkDiv04 input[type='checkbox']").click(function(){
		$(this).parents(".col-li").toggleClass("active");
	})
	$(".checkDiv04 label").click(function(){
		$(this).prev().find("input[type='checkbox']").click();
	})
	
	$("#txm input[type='radio']").click(function(){
		$(this).parents(".col-li").toggleClass("active");
		disable2($(this));	
	});
	function disable($this){ 
		if($this.val() == "无" && $this.prop("checked") == true){
			$this.parents(".col-li").siblings().removeClass("active").find("input[type='checkbox']").prop("checked",false).attr("disabled","disabled");
			$this.parents(".col-li").siblings().find(".checked-static i").addClass("check-color");
			$("#hydb1").css("opacity","0");   
		}else{
			$this.parents(".col-li").siblings().find(".checked-static i").removeClass("check-color");
			$this.parents(".col-li").siblings().find("input[type='checkbox']").removeAttr("disabled");
			if($this.val() == "其他"){
    			if($this.prop("checked") == true){
    				$("#hydb1").css("opacity","1");
        		}else{
        			$("#hydb1").css("opacity","0");
        		}	
    		}
		}
	}
	function disable2($this){ 
	/*	if( $this.prop("checked") == true){
			$this.parents(".col-li").siblings().removeClass("active").find("input[type='checkbox']").prop("checked",false).attr("disabled","disabled");
			$this.parents(".col-li").siblings().find(".checked-static i").addClass("check-color");
			$("#hydb2").css("opacity","0");   
		}else{
			$this.parents(".col-li").siblings().find(".checked-static i").removeClass("check-color");
			$this.parents(".col-li").siblings().find("input[type='checkbox']").removeAttr("disabled");
			if($this.val() == "其他"){
    			if($this.prop("checked") == true){
    				$("#hydb2").css("opacity","1");
        		}else{
        			$("#hydb2").css("opacity","0");
        		}	
    		}
		}*/
		if($this.val() == "其他"){
			if($this.prop("checked") == true){
				$("#hydb2").css("opacity","1");
    		}else{
    			$("#hydb2").css("opacity","0");
    		}	
		}else{
			$("#hydb2").css("opacity","0");
			$("#hydb2").val('');
		}
	}
	function disablegms($this){ 
		if($this.val() == "无" && $this.prop("checked") == true){
			$this.parents(".col-li").siblings().removeClass("active").find("input[type='checkbox']").prop("checked",false).attr("disabled","disabled");
			$this.parents(".col-li").siblings().find(".checked-static i").addClass("check-color");
			$("#gmsother-input").css("opacity","0");   
		}else{
			$this.parents(".col-li").siblings().find(".checked-static i").removeClass("check-color");
			$this.parents(".col-li").siblings().find("input[type='checkbox']").removeAttr("disabled");
			if($this.val() == "其他"){
    			if($this.prop("checked") == true){
    				$("#gmsother-input").css("opacity","1");
        		}else{
        			$("#gmsother-input").css("opacity","0");
        		}	
    		}
		}
	}
	//GCS选中
	$(".review .radiobox").click(function(){
		$(this).find("input[type='radio']").attr("checked",true).parents(".radiobox").siblings().find("input[type='radio']").attr("checked",false);
		$(this).find("input[type='radio']").attr("value",$(this).find("input[type='radio']").val());
		$(this).addClass("active1").siblings().removeClass("active1");
		var index = $(this).index();
		$(this).parents(".review").find(".disease p").each(function(){
			var i =$(this).index();
			if(i == index){
				$(this).addClass("active1").siblings().removeClass("active1");
			}
		})
	})
	
	$(".review .disease p").click(function(){
		$(this).addClass("active1").siblings().removeClass("active1");
		var index = $(this).index();
		$(this).parents(".review").find(".disease2 .radiobox").each(function(){
			var i =$(this).index();
			if(i == index){
				$(this).find("input[type='radio']").attr("checked",true).parents(".radiobox").siblings().find("input[type='radio']").attr("checked",false);
				$(this).addClass("active1").siblings().removeClass("active1");
			}
		})
	})
	
	//点击空白处消失
	$(document).bind("click", function (e){
	    if ( $((e.target || e.srcElement)).closest(".directionBox,#chooseDepart").length == 0)
	    {
	           $(".directionBox").hide();
	    }
	});

	$('#delcfmModel').on('hide.bs.modal', function () {
		$("#showquxiaobutton").css("display","none");
		$("#showquxiaobutton").text("取消");
		$("#showquedingbutton").text("确定");
		//取消back “取消”的绑定onclick事件
		$("#showquxiaobutton").attr("onclick","");
    })
    initEvents();
	//意识状态“昏迷”时，直接1级。liuxj20190521
	$("#describe input[type='radio']").click(function(){
		if($(this).val()=='昏迷'){
			var grade ='1001';
			$("#humigrade").val(grade);
			showAutoGrade(grade);
			$("#hunmipf").html('<div class="alert alert-dismissable symptom">意识状态:昏迷 1级</div>');
		}else{
			clearHunmi();
			$("#hunmipf").html('');
		}
	})
	//生命体征双击变为'未测'
	$("#smtz .Inpt1,#smtz .Inpt2").bind('dblclick', function() {
		
//		th.hide().val('').removeClass('danger');
		$(this).hide().val('').removeClass('danger');
		$(this).next().show().html('未测');
		$(this).next().next('span').show().html('未测');
		$(this).next("i").hide();
		showSignGrade(false);
		
	});
	//生命体征'未测'双击还原
	$("#smtz .Inpt3,#smtz .Inpt4").bind('dblclick', function() {
		$(this).hide().html('');
		$(this).prev("input").show().prev("i").hide();
		$(this).prev("i").prev("input").show();
		showSignGrade(false);
	});
	
	//是否快速分级
	sysDeploy('422');
	
})

//自适应
function adaption1(){
	var h = $(".content").outerHeight();
	var h1 = $(".footer-main").outerHeight();
	var h2 = h-h1-10;
	$(".rowbox,.direction-h").height(h2);	
	if($(window).width()>1366 && $(window).height()>=700){ 								
		var h3 = h2-40;
		var h4 = h3*0.3;
		var h5 = h4*0.15;
		var h6 = h4-h5;
		var h7 = (h6-4)/5;					
		$(".panel .panel-heading,.info-more-box>span").css({
			"height":h5+"px",
			"line-height":h5+"px"
		})	
		var h8 = h7*0.7;	
		$(".jqddad .panel").eq(0).find(".form-control").css({
			"height":h8+"px"
		})
		$(".jqddad .panel").eq(1).find(".form-control").css({
			"height":h8+"px"
		})
		$(".jqddad .panel").eq(3).find(".form-control").css({
			"height":h8+"px"
		})		
		var h9 = $(".jqddad .panel").eq(1).find(".form-group").height();
		var h10 = (h7-h9)/2;	
		$(".jqddad .panel").eq(0).find(".form-group").css("padding",h10+"px 0");
		$(".jqddad .panel").eq(0).find(".control-label").css("line-height",h8+"px");
		$(".jqddad .panel").eq(1).find(".form-group").css("padding",h10+"px 0");
		$(".jqddad .panel").eq(1).find(".control-label").css("line-height",h8+"px");
		$(".jqddad .panel").eq(1).find(".obj-label").height(h9);
		var h15 = h3*0.2;
		var h16 = h15-h5;
		var h11 = (h16-2)/3;
		var h12 = h11*0.4;
		$(".jqddad .panel").eq(2).find(".checked-static i,.checked-static,input[type='radio'],input[type='checkbox']").css({
			"width":h12+"px",
			"height":h12+"px"
		})

		$(".jqddad .panel").eq(2).find(".form-control").css({
			"height":h8+"px"
		})
		var h13 = 0 ;
		$(".jqddad .panel").eq(2).find(".form-group").each(function(){
			h13 += $(this).height();				
		})
		var h14 = (h16-h13-2)/7;
		$(".jqddad .panel").eq(2).find(".form-group").css("padding",h14+"px 0");
		var h17 = $(".jqddad .panel").eq(2).find(".form-group").eq(2).height();
		var h18 = h17-h14*2;
		$(".jqddad .panel").eq(2).find(".reason").css("line-height",h18+"px");
		$(".jqddad .panel").eq(3).find(".checked-static i,.checked-static,input[type='radio'],input[type='checkbox']").css({
			"width":h12+"px",
			"height":h12+"px"
		})
		
		$(".jqddad .panel").eq(3).find(".form-group").css("padding",h14+"px 0");
		var h19 = 0;
		for(var i = 0;i <= 3;i++){
			h19 += $(".jqddad .panel").eq(i).height();
		}
		var h20 = h3-h19-h5;
		var h21 = h20*0.8;
		$(".jqddad .panel").eq(4).find(".form-control").css({
			"height":h21+"px"
		})
		var h22 = $(".jqddad .panel").eq(4).find(".form-group").height();
		
		var h23 = (h20-h22)/2;
	
		$(".jqddad .panel").eq(4).find(".form-group").css("padding",h23+"px 0");

		var h24 = h6+h15-2;
		$("#smtz").height(h24);
		var h31 = h16-20; 
		$("#pfyj1 .gist").css("height",h31+"px");
		$("#smtz .form-control").css({
			"height":h9+"px"
		})
		$("#smtz .life-btn").css({
			"height":h9+"px"
		});		
		var h26 = 68*(h24/234);
		var h27 = 30*(h24/234);
		var h25 = $(".jqddad .panel").eq(3).height()
		$("#smtz .Inpt1").css("height",h26+"px");
		$("#smtz .Inpt3").css({height:h26+"px", lineHeight:h26+"px"});
		$("#smtz .Inpt2").css("height",h27+"px");
		$("#smtz .Inpt4").css({height:h27+"px", lineHeight:h27+"px"});
		$(".panel-time").css("height",h25+"px");
		var h28 = h25-30;
		$("#fzsj .gist,.butt1 .panel-body").css("height",h28+"px");
		var h29 = $(".give .panel").eq(0).outerHeight();
		var h30 = h2-10-h29;
		$(".give .rateItem").css("height",h30+"px");
		var h39 = $(".give .rateItem .st-mark").css("margin-bottom").replace("px","");
		var h32 = h30-30-parseFloat(h39)*7;
		var h37 = $("#print").outerHeight();
		var h38 = $("#jzann").outerHeight();
		var h33;
		if($("#showsffenji").css("display")=="block"){
			var h41 = $("#showsffenji").outerHeight();
			h33 = h32-h37-h38-h41;
		}else{
			h33 = h32-h37-h38;
		}
		var h34 = h33/7;
		$(".give .rateItem .st-mark").each(function(){
			if($(this).find(".st-icon").length >= 1){
				$(this).css({
					"height":h34+"px",
					"line-height":h34+"px"
				});
			}else{
				$(this).css({
					"height":h34+"px"
				});
			}	
		})

		var w1 =  $(".give .rateItem").width();
		var h35 = $(".give .rateItem .st-mark").css("margin-bottom").replace("px","");
		var h36= parseFloat(h35)*3+h34-5;
		
		
	}
//	//创造改版css
//	var style = document.createElement('style');
//	style.type = 'text/css';
////	var css = '.remind{background: #c63245;color:#fff;';
//	var css='';
//	css += 'padding:'+h10+'px!important;}';
//	css += '.assist{padding-top:'+h10+'px!important;}';
//	css += '.cover{display:none;'
//	css += 'position: absolute;'
//	css += 'left: -15px;bottom: 89px;'
//	css += 'width: '+w1+'px;height:'+h36+'px;';
//	css += 'background: rgba(198,50,69,0.5);';
//	css += 'border: dashed 5px #c63245;}'
//	style.innerHTML = css;
//	document.getElementsByTagName('HEAD').item(0).appendChild(style);
//	$(".ambulancen").show();
}

function adaption(){
	var h = $(".content").outerHeight();
	
	var h1 = $(".footer-main").outerHeight();
	var h2 = h-h1-10;
	
	$(".rowbox,.direction-h").height(h2);
	$(".ambulancen").remove();
	if($(window).width()>1366 && $(window).height()>=700){ 								
		var h3 = h2-30;
		var h4 = h3*0.3;
		var h5 = h4*0.15;
		var h6 = h4-h5;
		var h7 = (h6-4)/5;	
		$(".panel .panel-heading,.info-more-box>span").css({
			"height":h5-2+"px",
			"line-height":h5-2+"px"
		})	
		var h8 = h7*0.7;	
		$(".jqddad .panel").eq(0).find(".form-control").css({
			"height":h8+"px"
		})
		$(".jqddad .panel").eq(2).find(".form-control").css({
			"height":h8+"px"
		})				
		var h9 = $(".jqddad .panel").eq(0).find(".form-group").height();
		var h10 = (h7-h9)/2;	
		
		$(".jqddad .panel").eq(0).find(".form-group").css("padding",h10+"px 0");
		$(".jqddad .panel").eq(0).find(".control-label").css("line-height",h9+"px");
		$(".jqddad .panel").eq(0).find(".obj-label").height(h9);
		var h11 = (h6-2)/3;
		var h12 = h11*0.3;
		$(".jqddad .panel").eq(1).find(".checked-static i,.checked-static,input[type='radio'],input[type='checkbox']").css({
			"width":h12+"px",
			"height":h12+"px"
		})
		var h15 = h11*0.8;
		$(".jqddad .panel").eq(1).find(".form-control").css({
			"height":h15+"px"
		})
		var h13 = 0 ;
		$(".jqddad .panel").eq(1).find(".form-group").each(function(){
			h13 += $(this).height();				
		})
		var h14 = (h6-h13-2)/7;
		$(".jqddad .panel").eq(1).find(".form-group").css("padding",h14+"px 0");

		var h15 = h3*0.2;
		var h16 = h15-h5;
		var h17 = (h16-1)/2;
		var h18 = h17*0.3;
		$(".jqddad .panel").eq(2).find(".checked-static i,.checked-static,input[type='radio'],input[type='checkbox']").css({
			"width":h18+"px",
			"height":h18+"px"
		})
		var h19 = 0 ;
		$(".jqddad .panel").eq(2).find(".form-group").each(function(){
			h19 += $(this).height();				
		})
		var h20 = (h16-h19+20)/4;
		$(".jqddad .panel").eq(2).find(".form-group").css("padding",h20+"px 0");
		var h40 = 0;
		for(var i = 0;i <= 2;i++){
			h40 += $(".jqddad .panel").eq(i).height();
		}
		var h22 = h3-h40-h5;
		var h21 = h22*0.8;
		$(".jqddad .panel").eq(3).find(".form-control").css({
			"height":h21+"px"
		})
		 
		var h23 = (h22-h21)/2;
		$(".jqddad .panel").eq(3).find(".form-group").css("padding",h23+"px 0");
		
		var h24 = h6*2*0.7;
		var h25 = h6*2-h24;
		$("#smtz").height(h24);
		var h31 = h25-20; 
		$("#pfyj1 .gist").css("height",h31+"px");
		$("#smtz .form-control").css({
			"height":h8+"px"
		})
		$("#smtz .life-btn").css({
			"height":h9+"px"
		});		
		var h26 = 68*(h24/234);
		var h27 = 30*(h24/234);
		$("#smtz .Inpt1").css("height",h26+"px");
		$("#smtz .Inpt3").css({height:h26+"px", lineHeight:h26+"px"});
		$("#smtz .Inpt2").css("height",h27+"px");
		$("#smtz .Inpt4").css({height:h27+"px", lineHeight:h27+"px"});
		$(".panel-time").css("height",h15+20+"px");
		var h28 = h15-20;
		$("#fzsj .gist").css("height",h28+20+"px");
		$(".butt1 .panel-body").css("height","100px");
		var h29 = $(".give .panel").eq(0).outerHeight();
		var h30 = h2-10-h29;
		$(".give .rateItem").css("height",h30+"px");
		var h39 = $(".give .rateItem .st-mark").css("margin-bottom").replace("px","");
		var h32 = h30-35-parseFloat(h39)*7;
		var h37 = $("#print").outerHeight();
		var h38 = $("#jzann").outerHeight();
		var h33;
		if($("#showsffenji").css("display")=="block"){
			var h41 = $("#showsffenji").outerHeight();
			h33 = h32-h37-h38-h41;
		}else{
			h33 = h32-h37-h38;
			$(".cover").removeClass("cover2");
		}
		var h34 = h33/7;

		$(".give .rateItem .st-mark").each(function(){
			if($(this).find(".st-icon").length >= 1){
				$(this).css({
					"height":h34+"px",
					"line-height":h34+"px"
				});
			}else{
				$(this).css({
					"height":h34+"px"
				});
			}	
		})

		var w1 =  $(".give .rateItem").width();
		var h35 = $(".give .rateItem .st-mark").css("margin-bottom").replace("px","");
		var h36= parseFloat(h35)*3+h34-5;
		
	}
	czgbcss();
//	//创造改版css
//	var style = document.createElement('style');
//	style.type = 'text/css';
////	var css = '.remind{background: #c63245;color:#fff;';
//	var css='';
//	css += 'padding:'+h10+'px!important;}';
//	css += '.assist{padding-top:'+h10+'px!important;}';
//	css += '.cover{display:none;';
//	css += 'position: absolute;';
//	css += 'left: -15px;bottom: 89px;';
//	css += 'width: '+w1+'px;height:'+h36+'px;';
//	css += 'background: rgba(198,50,69,0.5);';
//	css += 'border: dashed 5px #c63245;}';
//	style.innerHTML = css;
//	document.getElementsByTagName('HEAD').item(0).appendChild(style);
}
//创造改版css合并
function czgbcss(){
	
//	var style = document.createElement('style');
//	style.type = 'text/css';
//	var css = '.remind{background: #c63245;color:#fff;';
//	var css='';
//	css += 'padding:'+h10+'px!important;}';
//	css += '.assist{padding-top:'+h10+'px!important;}';
//	css += '.cover{display:none;';
//	css += 'position: absolute;';
//	css += 'left: -15px;bottom: 89px;';
//	css += 'width: '+w1+'px;height:'+h36+'px;';
//	css += 'background: rgba(198,50,69,0.5);';
//	css += 'border: dashed 5px #c63245;';
//	css+='}';
//	style.innerHTML = css;
//	document.getElementsByTagName('HEAD').item(0).appendChild(style);
	
}
//页面等待跳转
function go(){
	 t =  $("#time").val();
	 t -= 1;
	 $("#time").val(t);
	 if(t==0){  
	    window.location.href="#path()/index/index";  
	 } 
	 setTimeout("go()",1000);
}

//暂存
function doDraf(){
	if($("#source").val()=="events"){
		//用户行为监控记录"突发公共卫生事件-详情-暂存"
		saveUserbehavior("A157");
	}else{
		if($("#feijz").val()==1){
			//用户行为监控记录"新增患者-暂存"
			saveUserbehavior("A42");
		}else{
			//用户行为监控记录"非急诊-暂存"
			saveUserbehavior("A150");
		}
	}
	
	//判断患者状态是否是“已接诊”，如果是则给出提示
	if($("#status").val()=="已接诊" && $("#id").val()!=""){
		$("#showquxiaobutton").css("display","");
		back("患者已被接诊 ，确认是否暂存？");
	}else{
		/*手动验证表单，当是普通按钮时。*/
		save("draf");
	}
}
//保存
function doSave(){
	//添加用户行为操作点
	var type = '#(type)';
	if(type=="xgpj"){
		//用户行为监控记录"历史记录-查看-保存"
		saveUserbehavior("A57");
	}else if($("#source").val()=="events"){
		//用户行为监控记录"突发公共卫生事件-详情-保存"
		saveUserbehavior("A158");
	}else{
		if($("#feijz").val()==1){
			//用户行为监控记录"新增患者-保存"
			saveUserbehavior("A43");
		}else{
			//用户行为监控记录"非急诊-保存"
			saveUserbehavior("A151");
		}
	}
	//判断患者状态是否是“已接诊”，如果是则给出提示
	//实时查询状态
//	alert($("#id").val());
//	return;
	if($("#id").val()!=''){
		$.ajax({
		    type: "post",
		    url: "#path()/divid/queryStatus",
		    data:{
		   	 pid:$("#id").val()
		    },
		    dataType: "json",
		    async:false,
		    success: function(result){
		    	if(result!=null){
		    		if(result.status==200){
		    				$("#status").val(result.rows.status);
		    		}
		    	}
		    },
		    error: function(){
		    }
		});
	}
	
	if(($("#status").val()!="未分诊" && $("#status").val()!="未接诊") && $("#id").val()!=""){
		$("#showquxiaobutton").css("display","");
		$("#showquedingbutton").attr("onclick","urlSubmit()");
		back("患者已被接诊 ，确认是否保存？");
	}else{
	    save("save");
	}
}

//提示信息
var num = 0;
function tooltip(_this,content,direction){
	clearInterval(time);
	num++;
	var tool ='<div class="pt" id="'+num+'">'+'<div class="cont"><i class="'
//	+'glyphicon glyphicon-exclamation-sign icongly'
	+'"></i>'+content+'</div><b class="out"></b><b class="in"></b></div>';
	$("body").append(tool);	
	var width = _this.outerWidth();
	var height = _this.outerHeight();
	var offsetTop = _this.offset().top;
	var offsetleft = _this.offset().left;
	if(direction == "up"){		
		$(".pt").each(function(){			
			var id = $(this).attr("id");
			if(id == num){
				var width1 = $(this).outerWidth();
				var height1 = $(this).outerHeight();
				var top = offsetTop-height1-7;
				var left = offsetleft;
				$(this).addClass("pt-down").css({
					"top":top+"px",
					"left":left+"px"
				});
			}			
		});
	}	
	if(direction == "down"){			
		$(".pt").each(function(){
			var id = $(this).attr("id");
			if(id == num){
				var width1 = $(this).outerWidth();
				var height1 = $(this).outerHeight();
				var top = offsetTop+height+7;
				var left = offsetleft;
				$(this).addClass("pt-up").css({
					"top":top+"px",
					"left":left+"px"
				})
			}			
		})
	}
	if(direction == "right"){		
		$(".pt").each(function(){
			var id = $(this).attr("id");
			if(id == num){
				var width1 = $(this).outerWidth();
				var height1 = $(this).outerHeight();
				var top = offsetTop+(height/2-height1/2);
				var left = offsetleft+width+18;	
				var outTop = (height1-10)/2;
				$(this).addClass("pt-left").css({
					"top":top+"px",
					"left":left+"px"
				})
				$(this).find(".out,.in").css({
					"top":outTop+"px",
					"left":"-8px"
				})
			}			
		})
	}	
	var time = setTimeout(function() {
		$(".pt").remove();
		num=0;
	}, 5000);
}

//保存具体操作
function save(mes){	

	var flag =false;
	var flag2 = false;
	var feijz = $("#feijz").val();
    
    var maxcixu = $("#maxcixu").val();
    var cixu="1";
    var xgpj = $("#returnUrl").val();
	if(xgpj=="divid" || xgpj=="xgpj" && $("#cixu").val()!="0"){
		//liuxj多次评级暂不开放
		cixu = $("#cixu").val();
	}
	//2018-07-14 新增his id 
	var hisid = $("#hisid").val();
	var PAADMVisitNumber = $("#PAADMVisitNumber").val();
	//基本信息
	var source  = $("input[name='source']:checked").val();	
	var source_other = $("#hydb2").val();
	if(source_other!=""){
		source ='其他|'+source_other;
		flag2 = true;
	}
	var reason =$("#reason").val();
	var id = $("#id").val();		
	var fullname = $("#fullname").val();
		
	var cardnum  = $("#cardnum").val();
	
	var bornday  = $("#bornday").val();
	var gender  = $("#gender").val();
	var tel  = $("#tel").val();
	var memberstel  = $("#memberstel").val();
	var idcard  = $("#idcard").val();
	var card_type =$('#card_type option:selected') .val();
	var parenttel  = $("#parenttel").val();
	
	var age= $("#age").val();
	var category  = $("#category").val();
	var address = $("#address").val();
	var dividtime  = $("#dividtime").val();
	var dividtimedt =new Date(dividtime.replace("-","/"));
	if(dividtimedt>new Date()){
//		toastr.warning("分诊时间不能超过当前时间！");
		var cont = '分诊时间不能超过当前时间!';
		var dom = $("#dividtime");
		var direction = "up";
		tooltip(dom,cont,direction);
		flag =true;
	}
	var admission  =  $('input[name="lyfs"]:checked').val();
	var signurl = $("#signUrl").val();
	var consciousness  = $("input[name='consciousness']:checked").val();			
	
	var supplement = $('input[name="enter"]:checked').val();
	if(supplement=='补录'){
		supplement=1;
	}else{
		supplement='';
	}
	
	//增加三无人员 以及绿色通道
	var ThreeNoFlag = $('input[name="ThreeNoFlag"]:checked').val();
	if(ThreeNoFlag!='Y'){
		ThreeNoFlag='N';
	}
	var GreenChFlag = $('input[name="GreenChFlag"]:checked').val();
	if(GreenChFlag!='Y'){
		GreenChFlag='N';
	}
	
	var events_name;
	var events_id = $('input[name="events"]:checked').val();
	var old_events = $("#events1").attr('value');
	
	if(events_id=='突发事件'){
		events_id=$("#events1").attr('value');
		events_name=$("#events1").val();
	}else{
		events_id='';
		events_name='';
	}
	events_id =$("#evevtsid").val();
	var registertime = $("#registertime").val();
	var anamnesis =""; 
	$('input:checkbox[name=anamnesis]:checked').each(function(k){
	    if(k == 0){
	    	anamnesis = $(this).val();
	    }else{
	    	anamnesis += ','+$(this).val();
	    }
	    flag2 = true;
	});
	var other = $("#hydb1").val();
	if(other!=""){
		if(anamnesis==''){
			anamnesis+= '其他|'+other;
		}else{
			anamnesis += ',其他|'+other;
		}
		
		flag2 = true;
	}		
	var allergic_history =""; 
	$('input:checkbox[name=allergic_history]:checked').each(function(k){
	    if(k == 0){
	    	allergic_history = $(this).val();
	    }else{
	    	allergic_history += ','+$(this).val();
	    }
	    flag2 = true;
	});
	var other1 = $("#gmsother-input").val();
	if(other1!=""){
		if(allergic_history==''){
			allergic_history+= '其他|'+other1;
		}else{
			allergic_history += ',其他|'+other1;
		}
		
		flag2 = true;
	}
	//体征信息
	var  sighid = $("#sighid").val();
	var  sg = $("#sg").val();
	var  tz = $("#tz").val();
	var  hx = $("#huxi").val();
	var no_huxi = $("#no_huxi").html();
	if(no_huxi !=''){
		hx=no_huxi;
	}
	var  tw = $("#tiwen").val();
	var no_tiwen = $("#no_tiwen").html();
	if(no_tiwen !=''){
		tw = no_tiwen;
	}
	
	var  mb = $("#maibo").val();
	var no_maibo = $("#no_maibo").html();
	if(no_maibo !=''){
		mb = no_maibo;
	}
	var  szy = $("#shuzhangya").val();
	var no_shuzhangya = $("#no_shuzhangya").html();
	if(no_shuzhangya !=''){
		szy = no_shuzhangya;
	}
	var  ssy = $("#shousuoya").val();
    var no_shousuoya=$("#no_shousuoya").html();
    if(no_shousuoya !=''){
    	ssy = no_shousuoya;
    }
	var  spo2 = $("#spo2").val();
	var no_spo2 = $("#no_spo2").html();
	if(no_spo2 !=''){
		spo2 = no_spo2;
	}
	var  pcn = $("#pcn").val();
	var no_pcn = $("#no_pcn").html();
	if(no_pcn !=''){
		pcn = no_pcn;
	}
	var  il6 = "";
	var  crp = "";
	var  cea = "";
	var  afp = "";
	var  myo = "";
	var  ddimer = "";
	var  fer = "";
	var  ntprobnp = "";
	var  hsctnl = "";
	var  ckmb = "";
	var  ctnt = "";
	var  ca = "";
	
	
	
	var  symtpomid = "";
	//2019-4-18 于世明  新增自定义内容和自定义等级的保存
	var  symtpomzdyvalue = "";
	var  symtpomzdygrade = "";
	//分级信息
	$(".xxx").each(function(){
		if($(this).attr("zdyid")!=null && $(this).attr("zdyid")!=""){
			var xxxxx = $(this).next().text();
			symtpomzdyvalue += xxxxx.substring(0,xxxxx.length-3)+";";
			symtpomzdygrade += $(this).attr("grade")+";"
		}else{
			symtpomid += $(this).attr("id")+",";
		}
	});
	if(symtpomid !=""){
		symtpomid = symtpomid.substring(0,symtpomid.length-1);
	}
	if(symtpomzdyvalue !=""){
		symtpomzdyvalue = symtpomzdyvalue.substr(0,symtpomzdyvalue.length-1);
	}
	if(symtpomzdygrade !=""){
		symtpomzdygrade = symtpomzdygrade.substring(0,symtpomzdygrade.length-1);
	}
	var handleid = $("#handleid").val();
	var autograde = $("#autograde").val();
	var finalgrade = $("#finalgrade").val();
	var deptment = $("#td_id").val();
	var remark= $("#demopf").text().substring(1,$("#demopf").text().length);
	
	//var changereason= $("#changereason").val();
	var changereason = $('#changereason option:selected').val();
	var reasondetail = $("#reasondetail").val();
	//alert(changereason);
	var hljl = $("#hljl").val();
	var nurse = $("#nurse").html();
	var nurseid = $("#userId").val();
	
	var status = "未接诊";
	if(deptment==""){
		 status = "未分诊";
	}
	var status1 = $("#status").val();
	if(status1!="未接诊" && status1!="未分诊" && status1!=''){
		status =status1;
	}
	
	

	
	if(mes=='draf'){
		if(xgpj=="divid" ){
			//暂存待分诊
			cixu="1";
			status = "未分诊";
		}
		if(xgpj==''){
			status = "未分诊";
		}
		
		if(xgpj=="xgpj" && cixu>maxcixu){
			cixu=cixu-1;
		}
		var re = /^[a-zA-Z0-9]{1,19}$/;
		var re2 =/^[a-zA-Z\u4e00-\u9fa5\ \·\.]+$/;
		if(!cardnum.length>0 && !fullname.length>0){
//			warning('卡号不能为空！');
			$("#cardnum").parents(".rank").addClass("remind").siblings().addClass("assist");
			$("#cardnum").parents(".form-group").addClass("padd-t");	
			//background-color: antiquewhite;
			
			var cont = '【就诊卡号】不能为空，</br>请读取或输入就诊卡号。';
			var dom = $('#cardnum');
			var direction = "up";
			if(!flag){
				tooltip(dom,cont,direction);
			}
			flag =true;
		}else{
//			$("#cardnum").parents(".rank").removeClass("remind").siblings().removeClass("assist");
//			$("#cardnum").parents(".form-group").removeClass("padd-t");
			if(cardnum.length>0){
				if(!re.test(cardnum)){
					var cont = '【就诊卡号】输入不正确，请重新输入。';
					
					var dom = $('#cardnum');
					var direction = "up";
					if(!flag){
						tooltip(dom,cont,direction);
					}
					flag =true;
				}
			}
			
//			$("#fullname").parents(".rank").removeClass("remind").siblings().removeClass("assist");
//			$("#fullname").parents(".form-group").removeClass("padd-t");
			if(fullname.length>0){
				if (!re2.test(fullname)) {
					var cont = '【姓名】输入不正确，</br>姓名不能为数字，请重新输入。';
					var dom = $("#fullname");
					var direction = "up";
					if(!flag){
						tooltip(dom,cont,direction);
					}
					flag =true;
				}
			}
			
		}
		re =/^[a-zA-Z\u4e00-\u9fa5\ \·\.]+$/;
//		if(!fullname.length>0){
//			$("#fullname").parents(".rank").addClass("remind").siblings().addClass("assist");
//			$("#fullname").parents(".form-group").addClass("padd-t");
//			var cont = '【姓名】不能为空，请输入患者姓名。';
//			var dom = $('#fullname');
//			var direction = "up";
//			if(!flag){
//				tooltip(dom,cont,direction);
//			}
//			flag =true;
//		}else{
//			$("#fullname").parents(".rank").removeClass("remind").siblings().removeClass("assist");
//			$("#fullname").parents(".form-group").removeClass("padd-t");
//			if (!re.test(fullname)) {
//				var cont = '【姓名】输入不正确，姓名不能为数字，请重新输入。';
//				var dom = $("#fullname");
//				var direction = "up";
//				if(!flag){
//					tooltip(dom,cont,direction);
//				}
//				flag =true;
//			}
//		}
		re =/^((13[0-9]{1})|(14[5,7]{1})|(15[0-3,5-9]{1})|(17[0,3,5-8]{1})|(18[0-9]{1})|(166)|(198)|(199)|(147))+\d{8}$/;
	
		if(tel.length>0){
			if(!re.test(tel)){ 
				var cont = '联系方式不是正确11位手机号!';
				var dom = $("#tel");
				var direction = "down";
				tooltip(dom,cont,direction);
				flag = true;
			}
			flag2 = true;
		}
		if(idcard.length>0){
			flag2 = true;
		}
		if(gender.length>0 || category!="7" || bornday.length>0 || age.length>0 || tz.length>0 || idcard.length>0 || sg.length>0 || parenttel.length>0 || memberstel.length>0 || address.length>0){
			flag2 = true;
		}
		if(admission != undefined || source != undefined || reason != "" || consciousness != undefined || hljl != ""){
			flag2 = true;
		}
		if(mb != "" || spo2 != "" || szy != "" || ssy != "" || tw != "" || hx !="" || pcn !=""){
			flag2 = true;
		}
		var ttpf = $("#ttpf").text().trim();
		var gscpf = $("#gscpf").text().trim();
		var edtspf = $("#edtspf").text().trim();
		var mewspf = $("#mewspf").text().trim();
		var symptom = $("#symptom").text().trim();
		if(ttpf.length>0 || gscpf.length>0 || edtspf.length>0 || mewspf.length>0 || symptom.length>0){
			flag2 = true;
		}
		if(!$("#chooseDepart").find(".st-icon").length >= 1){
			flag2 = true;
		}
		if($("#grade").html().length != 0){
			flag2 = true;
		}
		$("#cardnum,#fullname,#tel,#idcard,#gender,#category,#bornday,#age").parents(".rank").removeClass("remind").siblings().removeClass("assist");
		$("#cardnum,#fullname,#tel,#idcard,#gender,#category,#bornday,#age").parents(".form-group").removeClass("padd-t");
		$("#txm,#trs,#describe,#history").parents(".areaWarn").removeClass("remindArea"); 
		$("#maibo,#spo2,#shousuoya,#shuzhangya,#tiwen").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");	
		$("#dividtime").parent().removeClass("remind").parents(".gist").removeClass("targgle");
		$("#chooseDepart").removeClass("stress").siblings(".cover").hide();
		//$(".gradeMark").removeClass("changepic").find("img").attr("src","/triage/static/bj/images/iconGrading.png");
		$(".gradeMark").removeClass("quick-error");
//		status ="未分诊";
		if(!flag2){
			toastr.clear();
			toastr.warning("您未输入任何信息!");
			return;
		}
	}else{
		if(xgpj=="divid" ){
			//保存待分诊
			cixu="1";
		}
		var typeName = $("#jzann .changeName").text().trim();
		var re ;
		var Pain_Score = $("#Pain_Score").html();
		if(Pain_Score=="0"){
			Pain_Score = "";
		}
		var GCS_Score = $("#GCS_Score").html();
		if(GCS_Score=="0"){
			GCS_Score = "";
		}
		var FAST_Score = $("#FASTNum").html();
		var go_rct = $("#div_go_rct").attr('class');
		if(go_rct =='col-md-2 col-li active' || go_rct =='col-md-2 col-li  active'){
			go_rct=1;
		}else{
			go_rct =0;
		}
		for(var i=0;i<collist.length;i++){
			var col = collist[i].columns.col;
			var necessary = collist[i].columns.necessary;
			if(col=='cardnum'){
				re = /^[a-zA-Z0-9]{1,19}$/;
				if(!cardnum.length>0 &&necessary=='1'){
					if(fullname!='无名氏'&& !state){
						$("#cardnum").parents(".rank").addClass("remind").siblings().addClass("assist");
						$("#cardnum").parents(".form-group").addClass("padd-t");	
						var cont = '【就诊卡号】不能为空，</br>请读取或输入就诊卡号。';
						var dom = $('#cardnum');
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#cardnum").parents(".rank").removeClass("remind").siblings().removeClass("assist");
						$("#cardnum").parents(".form-group").removeClass("padd-t");
					}
//					warning('卡号不能为空！');
				}else{
					$("#cardnum").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#cardnum").parents(".form-group").removeClass("padd-t");
					if(cardnum.length>0){
						if(!re.test(cardnum)){
							var cont = '【就诊卡号】输入不正确，请重新输入。';
							var dom = $('#cardnum');
							var direction = "up";
							if(!flag){
								tooltip(dom,cont,direction);
							}
							flag =true;
						}	
					}
				}
			}else if(col=='fullname'){
				re =/^[a-zA-Z\u4e00-\u9fa5\ \·\.]+$/;
				if(!fullname.length>0&&necessary=='1'){
					$("#fullname").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#fullname").parents(".form-group").addClass("padd-t");
					var cont = '【姓名】不能为空，请输入患者姓名。';
					var dom = $('#fullname');
					var direction = "up";
					if(!flag){
						tooltip(dom,cont,direction);
					}
					flag =true;
				}else{
					$("#fullname").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#fullname").parents(".form-group").removeClass("padd-t");
					if(fullname.length>0 && fullname.indexOf("无名氏") == -1){
						if (!re.test(fullname)) {
							var cont = '【姓名】输入不正确，</br>姓名不能为数字，请重新输入。';
							var dom = $("#fullname");
							var direction = "up";
							if(!flag){
								tooltip(dom,cont,direction);
							}
							flag =true;
						}	
					}
					
				}
			}else if(col=='bornday'){
				if(!bornday.length>0&&necessary=='1'){
					$("#bornday").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#bornday").parents(".form-group").addClass("padd-t");
					var cont = '【出生日期】不能为空，请选择患者出生日期。';
					var dom = $('#bornday');
					var direction = "up";
					if(!flag){
						tooltip(dom,cont,direction);
					}
					flag =true;
				}else{
					$("#bornday").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#bornday").parents(".form-group").removeClass("padd-t");
				}
				
				if(!age.length>0&&necessary=='1'){
					$("#age").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#age").parents(".form-group").addClass("padd-t");
					flag =true;
				}else{
					$("#age").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#age").parents(".form-group").removeClass("padd-t");
				}
				//01身份证才验证
			}else if(col=='idcard' &&  card_type=='01'){
				reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(!idcard.length>0&&necessary=='1'&&!state){
					$("#idcard").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#idcard").parents(".form-group").addClass("padd-t");
					var cont = '【身份证号】不能为空';
					var dom = $('#idcard');
					var direction = "up";
					if(!flag){
						tooltip(dom,cont,direction);
					}
					flag =true;
				}else{
					$("#idcard").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#idcard").parents(".form-group").removeClass("padd-t");
					if(idcard.length>0){
				        if (!reg.test(idcard)) {
				        	var cont = '【身份证号】输入格式不正确，请重新输入。';
							var dom = $("#idcard");
							var direction = "up";
							if(!flag){
								tooltip(dom,cont,direction);
							}
							flag = true;
				        }
					}
				}
			}else if(col=='tel'){
				re =/^((13[0-9]{1})|(14[5,7]{1})|(15[0-3,5-9]{1})|(17[0,3,5-8]{1})|(18[0-9]{1})|(166)|(198)|(199)|(147))+\d{8}$/;
				if(!tel.length>0 &&necessary=='1'){
					$("#tel").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#tel").parents(".form-group").addClass("padd-t");
					var cont = '【联系电话】不能为空，</br>需为11位手机号码，请输入手机号。';
					var dom = $('#tel');
					var direction = "up";
					if(!flag){
						tooltip(dom,cont,direction);
					}
					flag =true;
				}else{
					$("#tel").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#tel").parents(".form-group").removeClass("padd-t");
					//联系电话可以为固定电话，liuxj20191118
//					if(tel.length>0){
//						if(!re.test(tel)){ 
//							var cont = '【联系电话】输入格式不正确，</br>需为11位手机号码，请重新输入。';
//							var dom = $("#tel");
//							var direction = "up";
//							if(!flag){
//								tooltip(dom,cont,direction);
//							}
//								flag = true;
//							}	
//						
//						}
					}
					
			}else if(col=='category'){
				if(!category.length>0&&necessary=='1'){
					$("#category").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#category").parents(".form-group").addClass("padd-t");
					flag =true;
				}else{
					$("#category").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#category").parents(".form-group").removeClass("padd-t");
				}
			}else if(col=='sg'){
				if(!sg.length>0&&necessary=='1'){
					$("#sg").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#sg").parents(".form-group").addClass("padd-t");
					flag =true;
				}else{
					$("#sg").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#sg").parents(".form-group").removeClass("padd-t");
				}
			}else if(col=='tz'){
				if(!tz.length>0&&necessary=='1'){
					$("#tz").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#tz").parents(".form-group").addClass("padd-t");
					flag =true;
				}else{
					$("#tz").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#tz").parents(".form-group").removeClass("padd-t");
				}
			}else if(col=='parenttel'){
				if(!parenttel.length>0&&necessary=='1'){
					$("#parenttel").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#parenttel").parents(".form-group").addClass("padd-t");
					flag =true;
				}else{
					$("#parenttel").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#parenttel").parents(".form-group").removeClass("padd-t");
				}
			}else if(col=='memberstel'){
				if(!memberstel.length>0&&necessary=='1'){
					$("#memberstel").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#memberstel").parents(".form-group").addClass("padd-t");
					flag =true;
				}else{
					$("#memberstel").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#memberstel").parents(".form-group").removeClass("padd-t");
				} 
			}else if(col=='address'){
				if(!address.length>0&&necessary=='1'){
					$("#address").parents(".rank").addClass("remind").siblings().addClass("assist");
					$("#address").parents(".form-group").addClass("padd-t");
					flag =true;
				}else{
					$("#address").parents(".rank").removeClass("remind").siblings().removeClass("assist");
					$("#address").parents(".form-group").removeClass("padd-t");
				}
			}else if(col=='source'){
				if(typeName=='非急诊'){
					if(source == undefined&&necessary=='1'){
						$("#txm").parents(".areaWarn").addClass("remindArea");
						var cont = '【来源】不能为空，请选择患者来源。';
						var dom = $("#txm");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#txm").parents(".areaWarn").removeClass("remindArea"); 
					}
				}
			}else if(col=='admission'){
				if(typeName=='非急诊'){
					if(admission == undefined&&necessary=='1'){
						$("#trs").parents(".areaWarn").addClass("remindArea");
						var cont = '【来院方式】不能为空，请选择患者来院方式。';
						var dom = $("#trs");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#trs").parents(".areaWarn").removeClass("remindArea"); 
					}
				}
			}else if(col=='reason'){
				if(typeName=='非急诊'){
					if(!reason.length>0&&necessary=='1'){
						$("#rss").parents(".areaWarn").addClass("remindArea");
						flag =true;
					}else{
						$("#rss").parents(".areaWarn").removeClass("remindArea"); 
					}
				}
				
			}else if(col=='consciousness'){
				if(typeName=='非急诊'){
					if(consciousness == undefined&&necessary=='1'){
						$("#describe").parents(".areaWarn").addClass("remindArea");
						var cont = '【意识状态】不能为空，请选择患者入院意识状态。';
						var dom = $("#describe");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#describe").parents(".areaWarn").removeClass("remindArea"); 
					}
				}
			}else if(col=='anamnesis'){
				if(typeName=='非急诊'){
					if(anamnesis == ""&&necessary=='1'){
						$("#history").parents(".areaWarn").addClass("remindArea");
						var cont = '【既往病史】不能为空，请选择患者既往病史。';
						var dom = $("#history");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#history").parents(".areaWarn").removeClass("remindArea"); 
					}
				}
			}else if(col=='allergic_history'){
				if(typeName=='非急诊'){
					if(allergic_history == ""&&necessary=='1'){
						$("#allergic").parents(".areaWarn").addClass("remindArea");
						var cont = '【药物过敏史】不能为空，请选择患者药物过敏史。';
						var dom = $("#allergic");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#allergic").parents(".areaWarn").removeClass("remindArea"); 
					}
				}
			}else if(col=='hljl'){
				if(typeName=='非急诊'){
					if(hljl == ""&&necessary=='1'){
						$("#hljl").parents(".areaWarn").addClass("remindArea");
						flag =true;
					}else{
						$("#hljl").parents(".areaWarn").removeClass("remindArea"); 
					}
				}
			}else if(col=='mb'){
				if(typeName=='非急诊'){
					if(mb == ""&&necessary=='1'){
						$("#maibo").addClass("allocatSign").parent().addClass("sign").parent().addClass("remindlife");
						var cont = '【HR心率】生命体征参数输入不能为空，请输入，</br>如确认不输入可双击对应生命体征输入框确认缺失。';
						var dom = $("#maibo_p");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#maibo").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
					}
				}
			}else if(col=='hx'){
				if(typeName=='非急诊'){
					if(hx == ""&&necessary=='1'){
						$("#huxi").addClass("allocatSign").parent().addClass("sign").parent().addClass("remindlife");
						var cont = '【RR 呼吸频率】生命体征参数输入不能为空，请输入，</br>如确认不输入可双击对应生命体征输入框确认缺失。';
						var dom = $("#huxi_p");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#huxi").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
					}
				}
			}else if(col=='spo2'){
				if(typeName=='非急诊'){
					if(spo2 == ""&&necessary=='1'){
						$("#spo2").addClass("allocatSign").parent().addClass("sign").parent().addClass("remindlife");
						var cont = '【SpO2 血氧饱和度】生命体征参数输入不能为空，请输入，</br>如确认不输入可双击对应生命体征输入框确认缺失。';
						var dom = $("#spo2_p");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#spo2").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
					}
				}
			}else if(col=='xueya'){
				if(typeName=='非急诊'){
					if((szy == "" || ssy == "")&&necessary=='1'){
						$("#shousuoya").addClass("allocatSign").parent().addClass("sign").parent().addClass("remindlife");
						$("#shuzhangya").addClass("allocatSign").parent().addClass("sign").parent().addClass("remindlife");
						var cont = '【NIBP 无创血压】生命体征参数输入不能为空，请输入，</br>如确认不输入可双击对应生命体征输入框确认缺失。';
						var dom = $("#shousuoya_p");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#shousuoya").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
						$("#shuzhangya").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
					}
				}
			}else if(col=='tw'){
				if(typeName=='非急诊'){
					if(tw == ""&&necessary=='1'){
						$("#tiwen").addClass("allocatSign").parent().addClass("sign").parent().addClass("remindlife");
						var cont = '【TEMP 体温】生命体征参数输入不能为空，请输入，</br>如确认不输入可双击对应生命体征输入框确认缺失。';
						var dom = $("#tiwen_p");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#tiwen").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
					}
				}
			}else if(col=='pcn'){
				if(typeName=='非急诊'){
					if(pcn == ""&&necessary=='1'){
						$("#pcn").addClass("allocatSign").parent().addClass("sign").parent().addClass("remindlife");
						var cont = '【etCO2 呼末二氧化碳】生命体征参数输入不能为空，请输入，</br>如确认不输入可双击对应生命体征输入框确认缺失。';
						var dom = $("#pcn_p");
						var direction = "up";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#pcn").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
					}
				}
			}else if(col=='dividdepartment'){
				if(typeName=='非急诊'){
					if($("#chooseDepart").find(".st-icon").length >= 1&&necessary=='1'){
						$("#chooseDepart").addClass("stress").siblings(".cover").show();
						var cont = '【分诊去向】未选择，请选择患者分诊去向';
						var dom = $("#chooseDepart");
						var direction = "down";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#chooseDepart").removeClass("stress").siblings(".cover").hide();
					}	
				}
			}else if(col=='quick'){
				//快速分级不显示，不进行必填验证
				if(is_quick!='已关闭'&&necessary=='1'&&showDemo==false){
					if($("#grade").html().length == 0){
						//$(".gradeMark").addClass("changepic").find("img").attr("src","/triage/static/bj/images/iconGrading1.png");
						$(".gradeMark").addClass("quick-error");
						var cont = '【快速分级】不能为空，请选择快速分级内容';
//						var dom = $("#pain");
//						var direction = "up";
						var dom = $(".gradeMark");
						var direction = "down";
//						tooltip(dom,cont,direction);
//						$("#quick_d").show();
						if(!flag){
							$("#quick_d").show();
							setTimeout("$('#quick_d').hide()",5000);
						}
						flag =true;
					}else{
						 //$(".gradeMark").removeClass("changepic").find("img").attr("src","/triage/static/bj/images/iconGrading.png");
						 $(".gradeMark").removeClass("quick-error");
						 $("#quick_d").hide();
					}
					var symptom = $("#symptom").text().trim();
					if(!symptom.length>0){
						//$(".gradeMark").addClass("changepic").find("img").attr("src","/triage/static/bj/images/iconGrading1.png");
						$(".gradeMark").addClass("quick-error");
						if(!flag){
							$("#quick_d").show();
							setTimeout("$('#quick_d').hide()",5000);
						}
						flag =true;
					}else{
						 //$(".gradeMark").removeClass("changepic").find("img").attr("src","/triage/static/bj/images/iconGrading.png");
						 $(".gradeMark").removeClass("quick-error");
					}
				}
			}else if(col=='mews'){
				if(typeName=='非急诊'){
					if(mews_score.length==''&&necessary=='1'){
						$("#mews").addClass("quick-error");
						var cont = '【急诊预检分级分诊指标评估表】未选择，请选择急诊预检分级分诊指标评估表';
						var dom = $("#mews");
						var direction = "down";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						$("#mews").removeClass("quick-error");
					}	
				}
			}else if(col=='edts'){
				if(typeName=='非急诊'){
					if(!edts_score.length>0&&necessary=='1'){
						$("#edts").addClass("quick-error");
						var cont = '【edts评估表】未选择，请选择edts评估表';
						var dom = $("#edts");
						var direction = "down";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						 $("#edts").removeClass("quick-error");
					}	
				}
			}else if(col=='pain'){
				if(typeName=='非急诊'){
					if(!Pain_Score.length>0&&necessary=='1'){
						$("#pain").addClass("quick-error");
						var cont = '【疼痛评分表】未选择，请选择疼痛评分表';
						var dom = $("#pain");
						var direction = "down";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						 $("#pain").removeClass("quick-error");
					}	
				}
			}else if(col=='fast'){
				if(typeName=='非急诊'){
					if(FAST_Score== undefined&&necessary=='1'){
						$("#fast").addClass("quick-error");
						var cont = '【FAST评分表】未选择，请选择FAST评分表';
						var dom = $("#fast");
						var direction = "down";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						 $("#fast").removeClass("quick-error");
					}	
				}
			}else if(col=='GCS'){
				if(typeName=='非急诊'){
					if(!GCS_Score.length>0&&necessary=='1'){
						$("#GCS").addClass("quick-error");
						var cont = '【GCS评分表】未选择，请选择GCS评分表';
						var dom = $("#GCS");
						var direction = "down";
						if(!flag){
							tooltip(dom,cont,direction);
						}
						flag =true;
					}else{
						 $("#GCS").removeClass("quick-error");
					}	
				}
			}
			
		}
		
		
		
			
			
		if(!typeName=='非急诊'){	
			$("#txm,#trs,#describe,#history,#rss").parents(".areaWarn").removeClass("remindArea"); 
			$("#maibo,#spo2,#shousuoya,#shuzhangya,#tiwen，#pcn").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
		}	
		if(dividtime == ""){
			 $("#dividtime").parents(".rank").addClass("remind").siblings().addClass("assist");
				$("#dividtime").parents(".form-group").addClass("padd-t");
				var cont = '【分诊时间】不能为空';
				var dom = $('#dividtime');
				var direction = "up";
				if(!flag){
					tooltip(dom,cont,direction);
				}
				flag =true;
		}else{
			$("#dividtime").parent().removeClass("remind").parents(".gist").removeClass("targgle");
		}
		
		//多个选填其一
		if(grouplist.length>0){
			for(var i=0;i<grouplist.length;i++){
				var group= grouplist[i];
				var groupflag = true;
				var str = '';
				for(var j=0;j<group.length;j++){
					var col = group[j].columns.col;
					var name = group[j].columns.name;
					var data = eval(col);
					if((!data == undefined)&&data.length>0){
						groupflag = false;
					}
					str+= name +'、'; 
				}
				if(groupflag){
					str = str.substring(0, str.length-1);
					$.messager.alert('提示',str+"选填其一!");
					return;
				}
				
			}	
		}
				
	}
	
	//MEWS评分 

	//MEWS总分

	//console.log(edts_score);
	//alert(mesws_score);

	if(flag == false  ){
		$.ajax({
	        type: "post",
	        url: "#path()/divid/save",
	        async:false, 
	        data:{
	        	id:id,
	       	 	fullname:fullname,
	       	 	cardnum:cardnum,
	       	 	bornday:bornday,
	       	 	gender:gender,
	       	 	tel:tel,
	       	 	card_type:card_type,
	       	 	parenttel:parenttel,
	       	 	reason:reason,
	       	 	idcard:idcard,
	       	 	address:address,
	       	 	memberstel:memberstel,
	       	 	category:category,
	       	 	admission:admission,
	       	 	GreenChFlag:GreenChFlag,
	       	 	ThreeNoFlag:ThreeNoFlag,
	       	 	others:"",
	       	 	consciousness:consciousness,
	       	 	anamnesis:anamnesis,
	       	 	status:status,
	       	 	source:source,
	       	 	age:age,
	       	 	registertime:registertime,
	       	 	sg:sg,
	       	 	tz:tz,
	       	 	hx:hx,
	       	 	tw:tw,
	       		mb:mb,
	       		szy:szy,
	       		ssy:ssy,
	       		spo2:spo2,
	       		pcn:pcn,
	       		il6:il6,
	       		crp:crp,
	       		cea:cea,
	       		afp:afp,
	       		myo:myo,
	       		ddimer:ddimer,
	       		fer:fer,
	       		ntprobnp:ntprobnp,
	       		hsctnl:hsctnl,
	       		ckmb:ckmb,
	       		ctnt:ctnt,
	       		ca:ca,
	       		sighid:sighid,
	       		handleid:handleid,
	       		autograde:autograde,
	       		finalgrade:finalgrade,
	       		changereason:changereason,
	       		reasondetail:reasondetail,
	       		hljl:hljl,
	       		nurse:nurse,
	       		nurseid:nurseid,
	       		deptment:deptment,
	       		deptmentname:$("#td_name").val(),
	       		symtpomid:symtpomid,
	       		symtpomzdyvalue:symtpomzdyvalue,
	       		symtpomzdygrade:symtpomzdygrade,
	       		edts_ids:edts_ids,
	       		edts_ids_qitastatus:edts_ids_qitastatus,
	       		edts_ids_qita:edts_ids_qita,
	       		mews_ids:mews_ids,
	       		mews_score:mews_score,
	       		edts_score:edts_score,
	       		pain_score:Pain_Score,
	       		fast_score:FAST_Score,
	       		gcs_score:GCS_Score,
	       		sign_grade:$("#signgrade").val(),
	       		dividtime:dividtime,
	       		signurl:signurl,
	       		xgpj:xgpj,
	        	cixu:cixu,
	        	maxcixu:maxcixu,
	        	feijz:feijz,
	        	hisid:hisid,
	        	PAADMVisitNumber:PAADMVisitNumber,
	        	savestatus:mes,
	        	allergic_history:allergic_history,
	        	supplement:supplement,
	        	events_id:events_id,
				events_name:events_name,
				old_events:old_events,
				go_rct:go_rct,
				remark:remark,
				GCS_xq:GCS_xq
				
	        },
	        dataType: "json",
	        success: function(result){
	       	 	//基础参数赋值
	        	if(result!=null){
	        		//console.log(result);
	        		if(result.status==200){
	        			if(mes=='draf'){	        				
	        				if(flag2 == true){
	        					back2("暂存成功!");
		        				$("#id").val(result.rows.id);
		        				$("#handleid").val(result.rows.handleid);          				
		        				$("#status").val(result.rows.status);
	        				}else{
	        					toastr.clear();
	        					toastr.warning("您未输入任何信息!")
	        				}	        				
	        			}else{
	        				//是否打印分诊单
	        				sysDeploy('420');
	        				if(is_print!='已关闭'){
	        					$("#godyfzd").css("display","");
	        				}
	        				
	        				//防止重复点击
	        				flag =true;
	        				if(print_wd=='1'){
	        					$("#id").val(result.rows.id);
	        					$("#handleid").val(result.rows.handleid);  
	        					back3("保存成功!");
//	        					$('#modalPrintwd').modal('show');
	        					setTimeout("$('#delcfmModel3').modal('hide')",2000);
	        					setTimeout("$('#modalPrintwd').modal('show')",2500);
	        					$("#p_name").html($("#fullname").val());
	        					$("#p_age").html($("#gender").val()+'&nbsp;&nbsp;&nbsp;&nbsp;'+$("#age").val());
	        					$("#p_grade").html($("#grade").children("div").children("div").children(".allocatNum").html());
	        					$("#p_cardnum").html($("#cardnum").val());
	        					$("#code").html('');
	        					var colour =$("#grade").children("div").attr('class');
	        					$(".printwd-big-bg").addClass(colour);
	        					$(".printwd-small-bg").addClass(colour);
	        					//
	        					queryHisSerialnum();
	        					code(62,62,'卡号：'+$("#cardnum").val()+'\r\n急诊流水号:'+serialnum);
	        				}else{
	        					back2("保存成功!");
	        				}
	        				
	        			}
	        		}
	        	}
	            //alert(mes);
	        	
	        },
	        error: function(){
	        	toastr.error("保存失败!");
	        }
	    });
	}else{
		if(print_wd=='1'){
			back3("请补全患者信息后打印!");
			setTimeout("$('#delcfmModel3').modal('hide')",2000);
		}
	}
}

//function loadPatientSymtpom(id){
//	$.ajax({
//        type: "post",
//        url: "#path()/divid/queryPatientSymtpom",
//        data:{
//       	 id:id
//        },
//        dataType: "json",
//        success: function(result){
//        	//console.log(result);
//        	if((result!=null)&&(result.status==200)){
//            	var rows = result.rows;
//        		
//        		var str = $("#symptom").html();
//       	 		for(var i in rows){
//       	 			var name = rows[i]["name"];
//       	 			var id = rows[i]["id"];
//       	 			str += "<div class=\"alert alert-dismissable\">"
//       				str+= "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+id+"\">×</button>"
//       				str+= name;
//       			    str+= "</div>";
//       	 		
//       	 		}
//       	 		$("#symptom").html(str);
//        	}
//        },
//        error: function(){
//        }
//    });
//}
var gcs_ids='';
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
        	//console.log(result);
        	clearMEWS();
        	clearEDTS();
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
        		var edts_show = false;
            	var mews_show = false;
            	
       	 		for(var i in rows){
       	 			var symptom_id = rows[i]["symptom_id"];
       	 			var symptom_type = rows[i]["symptom_type"];
       	 			if(symptom_type=="PAIN"){
       	 				//模拟点击 触发算分
       	 				$("#"+symptom_id).trigger("click");
       	 			}
       	 			 
       	 			if(symptom_type=="EDTS"){
       	 				//模拟点击 触发算分
       	 				
       	 				if(symptom_id=="e-b-8-4"){
       	 					
       	 				  $("#e-b-8-4").find("input").val(rows[i]["symptom_id_value"]);
       	 				}else{
       	 				  $("#"+symptom_id).trigger("click");
       	 				}
       	 				edts_show = true;
       	 			}
       	 			if(symptom_type=="MEWS"){
       	 				//模拟点击 触发算分
       	 				$("#"+symptom_id).trigger("click");
       	 				mews_show = true;
       	 			}
	       	 		if(symptom_type=="GCS"){
	   	 				//模拟点击 触发算分
	       	 			gcs_ids = symptom_id;
//	   	 				mews_show = true;
	   	 			}
       	 		}
       	 		if(edts_show) showEdts(true);
       	 		if(mews_show) showMews(true);
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
function showSign(){
//家属签字隐藏
//	var xgpj = $("#returnUrl").val();
//	var id = $("#id").val();
//	$("#allpage").hide();
//	 $("#sign").show();
	$("#jsqz").show();
	//setTimeout("$('#jsqz').hide()",2000);
}
function change(){
	var content = $("#jzann .changeName").text().trim();
	if(content=='急诊'){
		$(".curtain,.curtain1").hide();
		$(".curtain-main").show();
		$("#dividtime1").removeClass("panel-t");
		$("#jzann .changeName").html('非急诊');
		$("#feijz").val(1);	
		$("#mews").removeClass("st-mark-c").addClass("st-mark-i");
		$("#edts").removeClass("st-mark-c").addClass("st-mark-h");
		$("#pain").removeClass("st-mark-c").addClass("st-mark-t");
		$("#GCS").removeClass("st-mark-c").addClass("st-mark-d");
		$("#picDiv").removeClass("st-mark-c").addClass("st-mark-q");
		$("#fast").removeClass("st-mark-c").addClass("st-mark-fast-bg");
		$(".livetz").removeAttr("style");

	}else{
		$("#feijz").val(2);	
		$("#txm,#trs,#describe,#history").parents(".areaWarn").removeClass("remindArea"); 
		$("#maibo,#spo2,#shousuoya,#shuzhangya,#tiwen").removeClass("allocatSign").parent().removeClass("sign").parent().removeClass("remindlife");
		$(".curtain,.curtain1").show();
		$(".curtain-main").hide();
		$("#dividtime1").addClass("panel-t");
		$("#jzann .changeName").html('急诊');
		$(".livetz").css("background","none");

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
	}
}

function check1(){
	var reason=$("#changereason").val();
//	$("#okbtn").removeAttr("data-dismiss");
	if(reason.length == 0 ||reason=='选择修改原因'){
		$("#noreason").html('此处必选');
	}
	else{
		$("#noreason").html('');
		$("#okbtn").attr("data-dismiss","modal");
		$("#finalgrade").val('100'+final_name);
		$("#gradename").val(final_name);
		var name =	$("#finalgrade").val();
		var grade = $("#finalgrade").val();
		$("#grade").html("");
		showRct(grade);
		var html = '<div class="st-grade  btn-'+grade+'-selected">';
		html+= '<div><p class="allocattxt">改</p><p class="allocatNum">'+name.substring(3,4)+'</p>';
		html+= '<p class="allocatUnit">级</p>';
		html+= '</div></div>';
		$("#grade").html(html);
//		$("#finalgradearea").html("");
	}
}
function addGCS(GCS,val,that){
	$(that).addClass("active").siblings().removeClass("active");
	var GCS_1 = $("#GCS_1").val();
	var GCS_2 = $("#GCS_2").val();
	var GCS_3 = $("#GCS_3").val();
	if(GCS=='GCS_1'){
		GCS_1=val;
		$("#GCS_1").val(val);
	}
	if(GCS=='GCS_2'){
		GCS_2=val;
		$("#GCS_2").val(val);
	}
	if(GCS=='GCS_3'){
		GCS_3=val;
		$("#GCS_3").val(val);
	}
	$("#GCS_Score").html(parseInt(GCS_2)+parseInt(GCS_3)+parseInt(GCS_1));
}
function backevents(){
	//用户行为监控记录"突发公共卫生事件-详情-返回"
	saveUserbehavior("A156");
	
	var evevtsid = $("#evevtsid").val();
	
	var name= $("#ename").val();
	var num = $("#enum").val();
	name = encodeURI(name);
 	name = encodeURI(name);  //需要通过两次编码
	window.location.href="#path()/events/index?evevtsid="+evevtsid+"&name="+name+"&num="+num;
	
}
//初始化事件
function initEvents(){
	$("#events1").typeahead({
        source: function (query, process) {
            $.ajax({
                url: '#path()/events/queryWeekEvents',
                data: {
                    name: query
                },
                type: 'post',
                dataType: "json",
                success: function (result) {
                    var res = [];
                    
                    var rows = result.rows;
                    $.each(rows, function (i, item) {
                        var aItem = { id: item.id, name: item.name+'-'+item.dividtime };//把后台传回来的数据处理成带name形式
                        res.push(aItem);
                    });
                    return process(res);
                }
            
            });
        },
        minLength: 0,//键入字数多少开始补全
        showHintOnFocus: "true",//将显示所有匹配项
        fitToElement: true,//选项框宽度与输入框一致
        items: 'all',//下拉选项中出现条目的最大数量。也可以设置为“all”
        autoSelect: false,//允许你决定是否自动选择第一个建议
        updater: function (item) {//item是对象,选中后默认返回displayText的值,对于需要的id和name没有,所以手动赋值吧
        	$('#events1').attr('value', item.id);
            return item.name;//下拉框显示重写为name覆盖默认的displayText
        },
        delay: 500//在查找之间添加延迟
    });
}

//手动分级弹框 添加用户行为监控记录
function modalGrade(){
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-修改分级"
		saveUserbehavior("A41");
	}else{
		//用户行为监控记录"非急诊-修改分级"
		saveUserbehavior("A122");
	}
	
	if(fztj=="1"){
		$("#modalGrade").modal('show');
	}else{
		$.messager.alert('提示','未配置手动调级权限<br>注：可在系统管理站配置');
	}
}

//疼痛评分 添加用户行为监控记录
function modalScore(){
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-疼痛评分"
		saveUserbehavior("A35");
	}else{
		//用户行为监控记录"非急诊-疼痛评分"
		saveUserbehavior("A130");
	}
	$("#modalScore").modal('show');
//	$("#Pain_Score1").html();
	$(".num").each(function(){
		if($(this).html()==$("#Pain_Score1").html()){
			
			$(this).click();
		}
	});
	
}

//疼痛评分确认取消关闭 添加用户行为监控记录
function checkmodalScorestatus(th){
	if($(th).text()!=null && $(th).text()=="×"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-疼痛评分-关闭"
			saveUserbehavior("A94");
		}else{
			//用户行为监控记录"非急诊-疼痛评分-关闭"
			saveUserbehavior("A133");
		}
	}else if($(th).text()!=null && $(th).text()=="取消"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-疼痛评分-取消"
			saveUserbehavior("A93");
		}else{
			//用户行为监控记录"非急诊-疼痛评分-取消"
			saveUserbehavior("A132");
		}
	}else if($(th).text()!=null && $(th).text()=="确认"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-疼痛评分-确认"
			saveUserbehavior("A92");
		}else{
			//用户行为监控记录"非急诊-疼痛评分-确认"
			saveUserbehavior("A131");
		}
		showPain();
	}
}

//GCS评分 添加用户行为监控记录
function modalGCS(){
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-GCS评分"
		saveUserbehavior("A36");
	}else{
		//用户行为监控记录"非急诊-GCS评分"
		saveUserbehavior("A134");
	}
//	$("#modalGCS").modal('show');
	var gcs_idd = gcs_ids.split(',');
	$("#GCS_1_"+gcs_idd[0]).click();
	$("#GCS_2_"+gcs_idd[1]).click();
	$("#GCS_3_"+gcs_idd[2]).click();
	$("#modalGCS").modal('show');
}

//GCS评分确认取消关闭 添加用户行为监控记录
var GCS_xq='';
function checkmodalGCSstatus(th){
	if($(th).text()!=null && $(th).text()=="×"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-GCS评分-关闭"
			saveUserbehavior("A97");
		}else{
			//用户行为监控记录"非急诊-GCS评分-关闭"
			saveUserbehavior("A137");
		}
	}else if($(th).text()!=null && $(th).text()=="取消"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-GCS评分-取消"
			saveUserbehavior("A96");
		}else{
			//用户行为监控记录"非急诊-GCS评分-取消"
			saveUserbehavior("A136");
		}
	}else if($(th).text()!=null && $(th).text()=="确认"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-GCS评分-确认"
			saveUserbehavior("A95");
		}else{
			//用户行为监控记录"非急诊-GCS评分-确认"
			saveUserbehavior("A135");
		}
		var GCS_1 = $("#GCS_1").val();
		var GCS_2 = $("#GCS_2").val();
		var GCS_3 = $("#GCS_3").val();
		
		if(GCS_1=='0'){
			var cont = '请选择"睁眼反应"';
			var dom = $('#gcs_eye');
			var direction = "up";
			tooltip(dom,cont,direction);
			$("#gcs_eye").css('background','#c63245');
		}else{
			$("#gcs_eye").css('background','');
		}
		
		if(GCS_2=='0'){
			var cont = '请选择"言语反应"';
			var dom = $('#gcs_lau');
			var direction = "up";
			tooltip(dom,cont,direction);
			$("#gcs_lau").css('background','#c63245');
		}else{
			$("#gcs_lau").css('background','');
		}
		if(GCS_3=='0'){
			var cont = '请选择"非偏瘫侧运动反应"';
			var dom = $('#gcs_not');
			var direction = "up";
			tooltip(dom,cont,direction);
			$("#gcs_not").css('background','#c63245');
		}else{
			$("#gcs_not").css('background','');
		}
		if(GCS_1!='0' && GCS_2!='0' &&GCS_3!='0'){
			$("#can_gcs").click();
			GCS_xq = GCS_1+','+GCS_2+','+GCS_3;
			showGCS();
			 
		}
		
	}
}

//EDTS评分 添加用户行为监控记录
function modalEdts(){
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-EDTS评分"
		saveUserbehavior("A37");
	}else{
		//用户行为监控记录"非急诊-EDTS评分"
		saveUserbehavior("A138");
	}
	getTotalScore();
	$("#modalEdts").modal('show');
}

//EDTS评分 添加用户行为监控记录
function modalFastksfj(){
	
	$("#fastpjModal").modal('show');
//	console.log("222222")
	$("#qc").css("display","block")
}

//EDTS评分确认取消关闭 添加用户行为监控记录
function checkmodalEdtsstatus(th){
	if($(th).text()!=null && $(th).text()=="×"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-EDTS评分-关闭"
			saveUserbehavior("A100");
		}else{
			//用户行为监控记录"非急诊-EDTS评分-关闭"
			saveUserbehavior("A141");
		}
		reSetpf('EDTS');
	}else if($(th).text()!=null && $(th).text()=="取消"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-EDTS评分-取消"
			saveUserbehavior("A99");
		}else{
			//用户行为监控记录"非急诊-EDTS评分-取消"
			saveUserbehavior("A140");
		}
		reSetpf('EDTS')
	}else if($(th).text()!=null && $(th).text()=="确认"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-EDTS评分-确认"
			saveUserbehavior("A98");
		}else{
			//用户行为监控记录"非急诊-EDTS评分-确认"
			saveUserbehavior("A139");
		}
		showEdts(false);
	}
}

//急诊预检分级分诊指标评估表 添加用户行为监控记录
function modalMews(){
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-急诊预检分级分诊"
		saveUserbehavior("A38");
	}else{
		//用户行为监控记录"非急诊-急诊预检分级分诊"
		saveUserbehavior("A142");
	}
//	getMewsScore();
	$("#modalMews").modal('show');
}

//急诊预检分级分诊确认取消关闭 添加用户行为监控记录
function checkmodalMewsstatus(th){
	if($(th).text()!=null && $(th).text()=="×"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-急诊预检分级分诊-关闭"
			saveUserbehavior("A103");
		}else{
			//用户行为监控记录"非急诊-急诊预检分级分诊-关闭"
			saveUserbehavior("A145");
		}
		reSetpf('MEWS');
	}else if($(th).text()!=null && $(th).text()=="取消"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-急诊预检分级分诊-取消"
			saveUserbehavior("A102");
		}else{
			//用户行为监控记录"非急诊-急诊预检分级分诊-取消"
			saveUserbehavior("A144");
		}
		reSetpf('MEWS')
	}else if($(th).text()!=null && $(th).text()=="确认"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-急诊预检分级分诊-确认"
			saveUserbehavior("A101");
		}else{
			//用户行为监控记录"非急诊-急诊预检分级分诊-确认"
			saveUserbehavior("A143");
		}
		showMews(false);
		$("#mews").removeClass("quick-error");
	}
}

//家属签字 添加用户行为监控记录
function modalEnlist(){
	if($("#feijz").val()==1){
		//用户行为监控记录"急诊-家属签字"
		saveUserbehavior("A39");
	}else{
		//用户行为监控记录"非急诊-家属签字"
		saveUserbehavior("A146");
	}
	//$("#modalEnlist").modal('show');
}

//家属签字确认取消关闭 添加用户行为监控记录
function checkmodalEnliststatus(th){
	if($(th).text()!=null && $(th).text()=="×"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-家属签字-关闭"
			saveUserbehavior("A106");
		}else{
			//用户行为监控记录"非急诊-家属签字-关闭"
			saveUserbehavior("A149");
		}
	}else if($(th).text()!=null && $(th).text()=="清除"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-家属签字-取消"
			saveUserbehavior("A105");
		}else{
			//用户行为监控记录"非急诊-家属签字-取消"
			saveUserbehavior("A148");
		}
	}else if($(th).text()!=null && $(th).text()=="确认"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-家属签字-确认"
			saveUserbehavior("A104");
		}else{
			//用户行为监控记录"非急诊-家属签字-确认"
			saveUserbehavior("A147");
		}
	}
	$('#jsqz').hide();
}

//手动分级弹框 添加用户行为监控记录
function checkmodalGradestatus(th){
	var final_grade = $("#finalgrade").val();
	if($(th).text()!=null && $(th).text()=="×"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-修改分级-关闭"
			saveUserbehavior("A94");
		}else{
			//用户行为监控记录"非急诊-修改分级-关闭"
			saveUserbehavior("A129");
		}
		if(final_grade==''){
			cancel();
		}
	}else if($(th).text()!=null && $(th).text()=="取消"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-修改分级-取消"
			saveUserbehavior("A90");
		}else{
			//用户行为监控记录"非急诊-修改分级-取消"
			saveUserbehavior("A128");
		}
		//取消就是关闭，啥也不做。liuxj20190912
		if(final_grade==''){
			//未保存是取消或X，清除数据
			cancel();
		}
//		cancel();
//		check1();
	}else if($(th).text()!=null && $(th).text()=="确认"){
		if($("#feijz").val()==1){
			//用户行为监控记录"急诊-修改分级-确认"
			saveUserbehavior("A89");
		}else{
			//用户行为监控记录"非急诊-修改分级-确认"
			saveUserbehavior("A127");
		}
		check1();
	}
}

//清除昏迷评分
function clearHunmi(){
	
	$("#describe").children("div").removeClass("active");
	$("#humigrade").val("");
	
	
	//是唯一评级 清空 自动评级 否则 按其他评级结果显示
	if(checkalone("humigrade")){
		if($("#finalgrade").val()==""){
			$("#grade").html("");
		}
		$("#atuogradearea").html("");
		$("#atuogradearea").html("<div class='st-grade' style='height:40px'></div>");
	}else{
		//获取所有评分表里等级最高的
	    grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}
}
//FAST评分确认
function okFAST(){
	var fast='';
	$("input[name='fast']:checked").each(function(){
		fast += $(this).val();
		
	})
	var str = '';
	if(fast!=''){
		// str+='<p class="allocatTitle">';
		// str+='<span>FAST></span>';
		// str+='</p>';
		// str+='<p class="allocatNum" id ="FASTNum">'+fast+'</p>';
		str += '<div class="flex">' +
			'<span class="pftitle">FAST</span>' +
			'<span class="allocatNum" id ="FASTNum">'+fast+'</span>' +
			'</div>';
		$("#fast").removeClass("setItem").css({"line-height":"initial"}).removeClass("st-mark-c").addClass("st-mark-fast-bg");
		$("#fast").html(str);
		//评分依据增加内容
		$("#fastpf").html('');
		var str1 = "<div class=\"alert alert-dismissable symptom\">";
		str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+"FAST:"+fast+"\" onclick=\"clearFAST()\">×</button>";
		str1+= "FAST:"+fast;
	    str1+= "</div>";
	    
	    $("#fastpf").html(str1);
	}else{
		
//		st-mark st-mark-fast setItem
//		st-mark st-mark-fast st-mark-t
//		class="st-mark st-mark-fast setItem" data-toggle="modal" data-target="#modalFAST" id ="fast" style="background: #1687d2"
//		<div class="st-mark st-mark-fast setItem" data-toggle="modal" data-target="#modalFAST" id="fast" style="background: rgb(22, 135, 210); height: 86.5714px; line-height: 86.5714px;">
//		div class="st-mark st-mark-fast setItem" data-toggle="modal" data-target="#modalFAST" id="fast" style="background: rgb(22, 135, 210); height: 93.3333px; line-height: initial;"><div class="st-icon" style="cursor:pointer;
		clearFAST();
		
	}
	
}
function clearFAST(){
	var str ='<div class="st-icon" style="cursor:pointer;">FAST</div>'
	$("#fast").html(str);
	$("#fast").removeClass("st-mark-fast-bg").addClass("setItem").css('background','#1687d2').html(str);
	$(".fast-tc-content>div.col-check").removeClass("active").children("span").children("input").prop("checked",false);
	$("#fastpf").html('');
	$("#fast").css("line-height",$("#GCS").css("height"));
}
//确认打印
/*function dayinconfirm(){
	//原生js打印功能
	var sytime = synctime();
	Print('#fz-print-content', {
        onStart: function () {
          console.log('onStart', sytime)
        },
        onEnd: function () {
          console.log('onEnd', sytime)
        }
    })
}*/

function dayindividshow(){
	$("#dividfullname").html($("#fullname").val());
	$("#dividgender").html($("#gender option:checked ").text());
	$("#dividage").html($("#age").val());
	$("#dividcategory").html($("#category option:checked ").text());
	$("#dividcardnum").html($("#cardnum").val());
	$("#dividHR").html($("#maibo").val());
	$("#dividSPO2").html($("#spo2").val());
	$("#dividR").html($("#huxi").val());
	$("#dividBP").html($("#shousuoya").val()+"/"+$("#shuzhangya").val());
	$("#dividT").html($("#tiwen").val());
	$("#dividetCO2").html($("#pcn").val());
	var grade = "";
	var strgrade = "";
	if($("#finalgrade").val()!=""){
		grade = $("#finalgrade").val();
	}else{
		grade = $("#autograde").val();
	}
	if(grade!="" && grade.length>3){
		strgrade += "分级：<span>"+grade.substring(3,4)+"级</span>";
	}
	$("#dividgrade").html(strgrade);
	var bia = 1;
	var strhtm = "";
	if($("#pfyj1").find("#hunmipf").text().trim()!=""){
		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		strhtm+='</span><span class="pull-left">意识昏迷 ：';
		strhtm+='<p>'+$("#hunmipf").text().replace("×","")+'</span></p></span></li>';
		
		bia++;
	}
	if($("#pfyj1").find("#signpf").text().trim()!=""){
		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		strhtm+='</span><span class="pull-left">生命体征评级 ：';
		strhtm+='<p>'+$("#signpf").text().replace("×","")+'</span></p></span></li>';
		
		bia++;
	}
	if($("#pfyj1").find("#symptom").text().trim()!=""){
		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		strhtm+='</span><span class="pull-left">快速分级 ：';
		strhtm+='<p>'+$("#symptom").text().replace("×","")+'</span></p></span></li>';
		
		bia++;
	}
	if($("#pfyj1").find("#ttpf").text().trim()!=""){
		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		strhtm+='</span><span class="pull-left">疼痛评分 ：';
		strhtm+='<p>'+$("#ttpf").text().replace("×","")+'</span></p></span></li>';
		
		bia++;
	}
	if($("#pfyj1").find("#gscpf").text().trim()!=""){
		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		strhtm+='</span><span class="pull-left">GCS评分 ：';
		strhtm+='<p>'+$("#gscpf").text().replace("×","")+'</span></p></span></li>';
		
		bia++;
	}
	if($("#pfyj1").find("#edtspf").text().trim()!=""){
		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		strhtm+='</span><span class="pull-left">EDTS评分 ：';
		strhtm+='<p>'+$("#edtspf").text().replace("×","")+'</span></p></span></li>';
		
		bia++;
	}
	if($("#pfyj1").find("#mewspf").text().trim()!=""){
		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		strhtm+='</span><span class="pull-left">急诊预检分级分诊指标评估表评分 ：';
		strhtm+='<p>'+$("#mewspf").text().replace("×","")+'</span></p></span></li>';
		
		bia++;
	}
	if($("#pfyj1").find("#fastpf").text().trim()!=""){
		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		strhtm+='</span><span class="pull-left">FAST评分 ：';
		strhtm+='<p>'+$("#fastpf").text().replace("×","")+'</span></p></span></li>';
		
		bia++;
	}
//	$("#dividpfyj1").html(strhtm);
	$("#dividdepart").html($("#chooseDepart").find(".icu").text());
	$("#dividnurse").html($("#dividenurse").text());
//	loadPatientBaseInfo($("#id").val())
	$("#imgcode1").JsBarcode($("#cardnum").val(), {
	      displayValue: false
	});
	dayinconfirm();
}
//显示隐藏入抢救室
function showRct(grade,handle){
	var finalgrade = $("#finalgrade").val();
	if(grade =='1003' || grade=='1004' || finalgrade =='1003' || finalgrade=='1004'){
		$("#div_go_rct").show();
	}else{
		$("#div_go_rct").hide();
		if(typeof(handle) == "undefined" ){
//			$("#div_go_rct").removeClass("active");
		}
	}
}

function clearFAST1(){
	var score= $("#FASTNum").html();
	clearFAST();
	if (score.indexOf("F") != -1) {
		$(".fast-tc-content>div.col-check").find("input[value='F']").click()
				.prop("checked", true);
	}
	if (score.indexOf("A") != -1) {
		$(".fast-tc-content>div.col-check").find("input[value='A']").click()
				.prop("checked", true);
	}
	if (score.indexOf("S") != -1) {
		$(".fast-tc-content>div.col-check").find("input[value='S']").click()
				.prop("checked", true);
	}
	okFAST();
	
}
//保存弹窗提示错误
function warning(con){
	$.messager
			.alert(
					' ',
					'<font size=\"4\" color=\"#666666\"><strong>'+con+'</strong></font>',
					'infoSunnyIcon', function() {
					});
	setTimeout(function() {
		$(".messager-body").window('close');
	}, 2000); 
}
function time(){
	var time =$("#dividtime").val();
	if(time=='1899-12-31 00:00'){
		$("#dividtime").val(synctime().substring(0, 16))
	}
}
function wc1(th){
	console.log(th)
	th.hide().val('').removeClass('danger');
	th.next().show().html('未测');
	th.next().next('span').show().html('未测');
	th.next("i").hide();
	showSignGrade(false);
}

function limitInput(o){
    //Number()方法能保留小数点后的值,你用parseInt(),如果输入10.1，会变成10
    var value = Number(o.value);
    
        //匹配1.0-10.0的数
        var reg = new RegExp(/^\d{1,2}(\.\d)?$/);
        if(reg.test(value)){
        return true;
        }else{
        	if(value>=10){
        		$("#tiwen").val((value+'').substring(0,4));
//        		alert((value+'').substring(0,4));
        	}else{
        		$("#tiwen").val((value+'').substring(0,3));
//        		alert((value+'').substring(0,3));
        	}
        	
//        alert("输入错误！");
        return false;    
        }
}
//生成二维码
function code(w,h,id){
	$("#code").qrcode({ 
	    render: "canvas", //table方式 
	    width: w, //宽度 
	    height:h, //高度 
	    text: toUtf8(id) //任意内容 
	}); 
	

}
function toUtf8(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    	c = str.charCodeAt(i);   
    	if ((c >= 0x0001) && (c <= 0x007F)) {   
        	out += str.charAt(i);   
    	} else if (c > 0x07FF) {   
        	out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
        	out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	} else {   
        	out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	}   
    }   
    return out;   
}
//打印腕带按钮保存
function showWD(){
	print_wd='1';
	doSave();
}
//保存按钮保存
function goDoSave(){
	print_wd='0';
	doSave();
}
function dayinconfirmwd(){
	
	//这里不能使用jq的选择器来获取，不然报错
    var img = document.getElementById("image"); // get image element
    var canvas  = document.getElementsByTagName("canvas")[1];  // get canvas element

    //var img = $("#image");
    //var canvas = $("canvas");
    img.src = canvas.toDataURL();                     // update image
    $("#code").hide();
    $("#printwd_head").jqprint({
        debug:false,
        importCSS:true,
        printContainer:true,
        operaSupport:false
    });
}

function queryHisSerialnum(){
	$.ajax({
	    type: "post",
	    url: "#path()/divid/queryHisSerialnum",
	    data:{
	   	 pid:$("#id").val()
	    },
	    dataType: "json",
	    async:false,
	    success: function(result){
	    	if(result!=null){
	    		if(result.status==200){
	    			if(result.rows != null){
	    				serialnum =result.rows.PAADMVisitNumber;
	    			}
	    		}
	    	}
	    },
	    error: function(){
	    }
	});
}
function dayinconfirmbar(){
    $("#printbar").jqprint({
        debug:false,
        importCSS:true,
        printContainer:true,
        operaSupport:false
    });
}
$(".GSCItem").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});


