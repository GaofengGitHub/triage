$(document).ready(function() {
	setgradebtncss2();
	var id = '#(id  ??)';
	var cardnumreg = '#(reg  ??)';
	cardnumreg = JSON.parse(cardnumreg);
	var cardnumlength = 15;
	var cardbegin = ""
	if(!cardnumreg==""){
		cardnumlength = cardnumreg.length ;
		cardbegin = cardnumreg.reg.replace(/(.{4})/g,"$1 "); ;
		$("#cardnum").val(cardbegin);
	}
	
	$("#id").val(id);
	
	//if(id!=''){
		//loadCardInfo(id);
	//}
	//获取
	//queryCardnumReg
	
	//默认选中
	$("#cardnum").focus();
	
	//卡号四位加一空格
	$("#cardnum").bind("input propertychange",function(){
		var v = $(this).val();
		if(v.length>0){
			v = v.replace(/\s*/g,"");
			var begin_old = cardbegin.replace(/\s*/g,"");
			var begin_new = v.substring(0,begin_old.length);
			var reg = /^[0-9]*$/;
			if(!reg.test(v)||begin_new != begin_old) 
			{ 
				appendErrorText(this,"输入卡号不是符合医院卡号规则，请重新输入"+cardnumlength+"位卡号"); 
			} else{
				clearErrorText(this);
			}
			
			var str = v.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
			str = str.trim();
		    $(this).val(str);
		    
		  }
	});
	
	$("#cardnum").bind("blur",function(){
		
		var v = $(this).val().replace(/\s*/g,"");
		if(v.length!=0&&v.length==cardnumlength){
			  checkCardnum(this,v);
		  }else{
			  appendErrorText(this,"输入卡号不是符合医院卡号规则，请重新输入"+cardnumlength+"位卡号"); 
		  }
	});
	
	$("#fullname").bind("blur",function(){
		clearErrorText(this);
		var v = $(this).val().trim();
		if(v.length==0){
			appendErrorText(this,"姓名不能为空");
		}else{
			 re =/^[a-zA-Z\u4e00-\u9fa5\ \·\.]+$/;
			 if(!re.test(v)){ 
					appendErrorText(this,"姓名输入格式错误，请重新输入!");
			}
		}
		
	});
	
	$("#ralationname").bind("blur",function(){
		clearErrorText(this);
		var v = $(this).val().trim();
		if(v.length>0){
			re =/^[a-zA-Z\u4e00-\u9fa5\ \·\.]+$/;
			 if(!re.test(v)){ 
					appendErrorText(this,"姓名请输入中文或者英文!");
			}
		}
	});
	
	//性别点击
	$("#gender span").bind("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	
	//根据身份证号解析信息
	$("#idcard").bind("blur", function () {
		
		if($(this).val().length>0){
			clearErrorText(this);
		 }
		var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test($(this).val())) {
        	appendErrorText(this,"身份证号输入不正确，请重新输入!");
        } else {
        	 var idCardPaser = new IDCardPaser();
             var info = idCardPaser.getInfo($(this).val()) ;
        	//自动 年龄 出生日期 性别 填充
        	$("#gender span[value="+info.sex+"]").addClass("active").siblings().removeClass("active");
        	$("#bronday").val(info.birth);
        	$("#age").val(jsGetAge('',info.birth));
        }
    });
	
	$("#idcard,#tel").bind("mouseout", function () {
		var  tel= $("#tel").val();
		var  idcard= $("#idcard").val();
		if(tel.length>0||idcard.length>0){
			clearErrorText($("#idcard"));
			clearErrorText($("#tel"));
		  }
    });
	
	
	$("#bronday").bind("mouseout", function () {
		var v = $(this).val().trim();
		if(v.length>0){
			clearErrorText(this);
		  }
    });
	
	$("#tel,#ralationtel").bind("blur",function(){
		clearErrorText(this);
		var v = $(this).val().trim();
		if(v.length>0){
			re =/^((13[0-9]{1})|(14[5,7]{1})|(15[0-3,5-9]{1})|(17[0,3,5-8]{1})|(18[0-9]{1})|(166)|(198)|(199)|(147))+\d{8}$/;
			if(!re.test(v)){ 
				appendErrorText(this,"手机号输入错误，请重新输入。");
			}	
		  }
	});
	
	
	//国家选取
	  var input = $(this).find("#country");
	  var list = $(this).find(".nationality-suggest-list");
	  new nationality({ input: input, list: list });
	//民族
	  
	  var nations = ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族",
	         		"土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", 
	         		"达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", 
	         		"德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"];
	  var option = "";
	  option += '<option value="">请选择 </option>';
	  for(var i = 0; i <
	         nations.length; i++) {
	         option += '<option value="' + nations[i] + '">' + nations[i] + '</option>';
	   }
	   $(option).appendTo("#nation");
	  
	   //职业
	   var occupations = ["国家机关、党群组织、企业、事业单位负责人", "专业技术人员", "办事人员和有关人员","商业、服务业人员","农、林、牧、渔、水利业生产人员"
	                      ,"生产、运输设备操作人员及有关人员","军人","特殊职业的其他从业人员"];
	   
	   var option1 = "";
	   option1 += '<option value="">请选择 </option>';
	   for(var i = 0; i <
		  occupations.length; i++) {
		         option1 += '<option value="' + occupations[i] + '">' + occupations[i] + '</option>';
		}
	   $(option1).appendTo("#occupation");
	   
	  //省市区选择器
	  $("#distpicker").distpicker({
		   autoSelect: false,
		   
	  });
		$('#bronday').datepicker({ 
			format:'yyyy-mm-dd',
			autoclose:true,
			endDate:new Date() 
		  }).on('changeDate',function(ev){
				 var age = jsGetAge('',$("#bronday").val());
//				 alert(age);
				 $("#age").val(age);
				        });
	//	
	  //绑定取消操作
	$("#cancel").bind("click",function(){
		window.location.href="#path()/divid/index"; 
	});
	 //绑定保存操作
	$("#save").bind("click",function(){
		var flag = checkCardInfo();
		if(flag) saveCardInfo();
	});
	
	$("#listCard").bind("click",function(){
		window.location.href="#path()/card/list"; 
	});
	
});

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

//检查输入参数
function checkCardInfo(){
	var flag = true;
	var  cardnum = $("#cardnum").val().trim();
	
	if(cardnum.length==0){
		flag = false;
		appendErrorText($("#cardnum"),"卡号不能为空");
	}
	
	var  fullname= $("#fullname").val();
	if(fullname.length==0){
		flag = false;
		appendErrorText($("#fullname"),"姓名不能为空");
	}
	var  bronday= $("#bronday").val();
	if(bronday.length==0){
		flag = false;
		appendErrorText($("#bronday"),"出生日期不能为空");
	}else if(bronday.length>0){
		var res =/^(\d{4})-(\d{2})-(\d{2})$/;
		if(!res.test(bronday))
			appendErrorText($("#bronday"),"输入的出生日期格式不正确，请重新输入，例：2019-01-01");
		
	}
	var  tel= $("#tel").val();
	var  idcard= $("#idcard").val();
	if(tel.length==0&&idcard.length==0){
		flag = false;
		appendErrorText($("#tel"),"手机号、身份证号二者填一");
		appendErrorText($("#idcard"),"手机号、身份证号二者填一");
	}
	
	var  gender= $("#gender span[class='active']").attr("value");
	if(gender==null){
		flag = false;
		appendErrorText($("#gender").children(":first"),"请选择患者性别");
	}

	return flag;
}

//保存
function saveCardInfo(){
	var  cardnum = $("#cardnum").val().replace(/\s*/g,"");
	var  idcard= $("#idcard").val();
	var  fullname= $("#fullname").val();
	var  gender= $("#gender span[class='active']").attr("value");
	var  bronday= $("#bronday").val();
	var  tel= $("#tel").val();
	var  nation = $("#nation").val();
	var  country= $("#country").val();
	var  ralationname= $("#ralationname").val();
	var  ralationtel= $("#ralationtel").val();
	var  aprovince= $("#aprovince").find("option:selected").text();
	var  acity= $("#acity").find("option:selected").text();
	var  acountry= $("#acountry").find("option:selected").text();
	if(aprovince=="---- 选择省 ----"){
		aprovince = "";
	}
	if(acity=="---- 选择市 ----"){
		acity = "";
	}
	if(acountry=="---- 选择区 ----"){
		acountry = "";
	}
	var  adderssdesc= $("#adderssdesc").val();
	var  occupation= $("#occupation").val();
	var  workplace= $("#workplace").val();
	var  remark= $("#remark").val();
	var  updateuserid = '#userId()';
	var  updateusername = '#userName()';
	$.ajax({
        type: "post",
        url: "#path()/card/saveCardinfo",
        async:false, 
        data:{
        	id:$("#id").val(),
       	 	fullname:fullname,
       	 	cardnum:cardnum,
       	 	idcard:idcard,
       	 	bronday:bronday,
       	 	gender:gender,
       	 	tel:tel,
       	 	country:country,
       	 	nation:nation,
       	 	ralationname:ralationname,
       	 	ralationtel:ralationtel,
       	 	aprovince:aprovince,
       	 	acity:acity,
       	 	acountry:acountry,
       	 	adderssdesc:adderssdesc,
       	 	occupation:occupation,
       	 	workplace:workplace,
       	 	updateuserid:updateuserid,
       	 	updateusername:updateusername,
       	 	remark:remark
        },
        dataType: "json",
        success: function(result){
        	if(result.status==200){
        		if($("#id").val()==""){
        			
        			window.location.href="#path()/divid/index?type=card&&id="+result.rows;
        		}else{
        			window.location.href="#path()/card/list";
        		}
        		  
        	}
        	 	
        },
        error: function(){
        	toastr.error("保存失败!");
        }
    });
}


function checkCardnum(element,cardnum){
	$.ajax({
        type: "post",
        url: "#path()/card/checkCardnum",
        async:false, 
        data:{
       	 	cardnum:cardnum
        },
        dataType: "json",
        success: function(result){
        	if(result.status==200){
        		var rows = result.rows;
        		if(rows>0){
        			clearErrorText($(element));
        			appendErrorText($(element),"此就诊卡号已经注册，请更换新就诊卡");
        		}
        	}      	 	
        },
        error: function(){
        	toastr.error("查询失败!");
        }
    });
}


//
