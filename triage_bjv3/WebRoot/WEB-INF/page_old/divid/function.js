
//页面等待跳转
function go(){
	 t =  $("#time").val();
	 t -= 1;
	 $("#time").val(t);
	 if(t==0){ 
		 if($("#returnUrl").val()=="histroy"){
			 window.location.href="#path()/historyrecord/index";
		 }else{
			 window.location.href="#path()/index/index";  
		 }
	 } 
	 setTimeout("go()",1000);
}

//暂存
function doDraf(){
	 /*手动验证表单，当是普通按钮时。*/  
   // $('#addPatientForm').data('bootstrapValidator').validate();  
   // if(!$('#addPatientForm').data('bootstrapValidator').isValid()){  
     //   return ;  
   // }
	var content = '<ol  class="list-unstyled">';
	var flag = false;
	//校验暂存是否输入信息
	var flag2 = false;
	
	var cardnum = $("#cardnum").val();
	var re = /^[a-zA-Z0-9]{1,19}$/;
	if(cardnum.length>0){
		if(!re.test(cardnum)){
			content +='<li>请输入正确的卡号信息（1-19位）!</li>';
			flag = true;
		}
		flag2 = true;
	}
	
	var fullname = $("#fullname").val();
	re =/^[a-zA-Z\u4e00-\u9fa5\ \·]+$/;
	if(!fullname.length>0){
		
	}else{
		if (!re.test(fullname)) {
			content +='<li>姓名请输入中文或者英文!</li>';
			flag = true;
		}
		flag2 = true;
	}
	
	var tel = $("#tel").val(); 
	//re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	re =/^((13[0-9]{1})|(14[5,7]{1})|(15[0-3,5-9]{1})|(17[0,3,5-8]{1})|(18[0-9]{1})|(166)|(198)|(199)|(147))+\d{8}$/;
	if(tel.length>0){
		if(!re.test(tel)){ 
			content +='<li>联系方式不是正确11位手机号!</li>';
			flag = true;
		} 
		flag2 = true;
	}
	
	var feijz = $("#feijz").val();
	
	if(feijz!="2"){
		//选择分诊去向后必须分级
		var deptment = $("#deptment").val();
		if(deptment!=""){
			var autograde = $("#autograde").val();
			var finalgrade = $("#finalgrade").val();
			if((autograde=="")&&(finalgrade=="")){
				content +='<li>请对患者进行分级!</li>';
				flag = true;
			}
			flag2 = true;
		}
		
		var  sg = $("#sg").val();
		var  tz = $("#tz").val();
		var  hx = $("#huxi").val();
		var  tw = $("#tiwen").val();
		var  mb= $("#maibo").val();
		var  szy = $("#shuzhangya").val();
		var  ssy = $("#shousuoya").val();
		var  spo2 = $("#spo2").val();
		re = /^[0-9]{1,3}$/ ;
		
		if(spo2.length>0){
			if(!re.test(spo2)){ 
				content +='<li>spo2需为三位整数内!</li>';
				flag = true;
			} 
			flag2 = true;
		}
		if(sg.length>0){
			if(!re.test(sg)){ 
				content +='<li>身高需为三位整数内!</li>';
				flag = true;
			} 
			flag2 = true;
		}
		if(hx.length>0){
			if(!re.test(hx)){ 
				content +='<li>呼吸需为三位整数内!</li>';
				flag = true;
			} 
			flag2 = true;
		}
		if(mb.length>0){
			if(!re.test(mb)){ 
				content +='<li>心率需为三位整数内!</li>';
				flag = true;
			} 
			flag2 = true;
		}
		
		if(szy.length>0){
			if(!re.test(szy)){ 
				content +='<li>舒张压为三位整数内!</li>';
				flag = true;
			} 
			flag2 = true;
		}
		if(ssy.length>0){
			if(!re.test(ssy)){ 
				content +='<li>收缩压需为三位整数内!</li>';
				flag = true;
			} 
			flag2 = true;
		}
		
		re = /^\d{1,3}(\.\d{0,1})?$/ ;
		if(tz.length>0){
			if(!re.test(tz)){ 
				content +='<li>体重为三位整数内最多一位小数!</li>';
				flag = true;
			} 
			flag2 = true;
		}
		re = /^\d{1,2}(\.\d{0,1})?$/ ;
		if(tw.length>0){
			if(!re.test(tw)){ 
				content +='<li>体温为两位整数内最多一位小数!</li>';
				flag = true;
			} 
			flag2 = true;
		}
		
		
	}	
	if(!flag2){
		content +='<li>您未输入任何信息!</li>';
		toastr.warning(content);
		return;
	}
	
	content += '</ol>';
	if(flag){
		toastr.clear();
		toastr.warning(content);
		return;
	}
	
	save("draf");
	
}
//保存
function doSave(){

	var content = '<ol  class="list-unstyled">';
	var flag = false;

	var cardnum = $("#cardnum").val();
	var re = /^[a-zA-Z0-9]{1,19}$/;
	
	if(!re.test(cardnum)){
		content +='<li>请输入正确的卡号信息（1-19位）!</li>';
		flag = true;
	}
	
	var fullname = $("#fullname").val();
	re =/^[a-zA-Z\u4e00-\u9fa5\ \·]+$/;
	if(!fullname.length>0){
		content +='<li>请输入姓名信息!</li>';
		flag = true;
	}else{
		if (!re.test(fullname)) {
			content +='<li>姓名请输入中文或者英文!</li>';
			flag = true;
		}
	}
	
	var bornday = $("#bornday").val();
	re =/^[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/;
	if(!bornday.length>0){
		content +='<li>请输入出生日期信息!</li>';
		flag = true;
	}else{
		if (!re.test(bornday)) {
			content +='<li>出生日期格式不正确</li>';
			flag = true;
		}
	}
	
	var category  = $("#category").val();
	if(category==""){
		content +='<li>请选择费别!</li>';	
		flag = true;
	}
	
	var tel = $("#tel").val(); 
	//re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	re =/^((13[0-9]{1})|(14[5,7]{1})|(15[0-3,5-9]{1})|(17[0,3,5-8]{1})|(18[0-9]{1})|(166)|(198)|(199)|(147))+\d{8}$/;
	var ttel = true;
	if(tel.length>0){
		if(!re.test(tel)){ 
			content +='<li>联系方式不是正确11位手机号!</li>';
			flag = true;
		} 
	}else{
		ttel = false;
	}
	
	//联系方式和身份证号必填其一，原家庭联系方式去除
	var idcard = $("#idcard").val();	
	re =/^([1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
	if(idcard!=""){
		if(!re.test(idcard)){
			content +='<li>身份证号格式不正确!</li>';
			flag = true;
		} 
	}else if(!ttel){
		content +='<li>联系方式和身份证号必填其中一个！</li>';
		flag = true;
	}
	
    var feijz = $("#feijz").val();
	
	if(feijz=="2"){
		var deptment = $("#deptment").val();
		if(deptment==""){
			content +='<li>请选择分诊科室!</li>';
			
			flag = true;
		}
		
		var dividtime  = $("#dividtime").val();
		if(dividtime==""){
			content +='<li>请填写分诊时间!</li>';
			flag = true;
		}
	}else{

		var autograde = $("#autograde").val();
		var finalgrade = $("#finalgrade").val();
		if((autograde=="")&&(finalgrade=="")){
			content +='<li>请先分级!</li>';
			flag = true;
		}
		
		var deptment = $("#deptment").val();
		if(deptment==""){
			content +='<li>请选择分诊科室!</li>';
			
			flag = true;
		}
		
		var source  = $("button[name='source'][class*=active]").val()
		var admission  = $("button[name='lyfs'][class*=active]").val();
		var consciousness  = $("button[name='consciousness'][class*=active]").val();
		var anamnesis  = $("button[name='anamnesis'][class*=active]").val();	
		var zhusu  = $("input[name='zhusu']").val();
		var dividtime  = $("#dividtime").val();
		if(source==null){
			content +='<li>请选择来源!</li>';
			flag = true;
		}
		
		if(admission==null){
			content +='<li>请选择来院方式!</li>';
			flag = true;
		}
		
		if(consciousness==null){
			content +='<li>请选择意识状态!</li>';
			flag = true;
		}
		
		if(anamnesis==null){
			content +='<li>请选择既往史!</li>';
			flag = true;
		}else{
			$("button[name='anamnesis'][class*=active]").each(function(){
				//既往史其他添加输入框，可自定义内容
				if($(this).val()=="其他"){
					if($("#jwsother").val()==""){
						content +='<li>既往史选中“其他”后,输入框内容不能为空!</li>';
						flag = true;
					}
				}
			}); 
		}
		
		if(zhusu==""){
			content +='<li>请选择主诉!</li>';
			flag = true;
		}
		
		if(dividtime==""){
			content +='<li>请填写分诊时间!</li>';
			flag = true;
		}
		
		var finalgrade = $("#finalgrade").val();
		if(finalgrade!=""){
			var changereason = $('#changereason option:selected').val();
			var reasondetail = $('#reasondetail').val();
			if(changereason==null || changereason==""){
				if(reasondetail==""){
					content +='<li>手动评级需要填写修改原因，请在手动评级功能里填写修改原因!</li>';
					flag = true;
				}else{
					re = /^[\u4E00-\u9FA5A-Za-z0-9_，,。.！!;；：:？?\s]{0,150}$/;
					if(reasondetail.length>0){
						if(!re.test(reasondetail)){ 
							content +='<li>修改原因不能超过150字符</li>';
							flag = true;
						} 
					}
				}
			}
		}
		
		var  sg = $("#sg").val();
		var  tz = $("#tz").val();
		var  hx = $("#huxi").val();
		var  tw = $("#tiwen").val();
		var  mb= $("#maibo").val();
		var  szy = $("#shuzhangya").val();
		var  ssy = $("#shousuoya").val();
		var  spo2 = $("#spo2").val();
		re = /^[0-9]{1,3}$/ ;
		
		if(szy.length>0){
			if(!re.test(szy)){
				content +='<li>舒张压为三位整数内!</li>';
				flag = true;
			} 
		}else{
			content +='<li>舒张压不能为空</li>';
			flag = true;
		}
		
		if(ssy.length>0){
			if(!re.test(ssy)){
				content +='<li>收缩压需为三位整数内!</li>';
				flag = true;
			} 
		}else{
			content +='<li>收缩压不能为空</li>';
			flag = true;
		}
		
		if(!spo2.length>0){
			content +='<li>spo2不能为空</li>';
			flag = true;
		}
		
		
		
		if(mb.length>0){
			if(!re.test(mb)){
				content +='<li>心率需为三位整数内!</li>';
				flag = true;
			}
		}else{
			content +='<li>心率不能为空</li>';
			flag = true;
		}
		
		if(hx.length>0){
			if(!re.test(hx)){
				content +='<li>呼吸需为三位整数内!</li>';
				flag = true;
			}
		}else{
			content +='<li>呼吸不能为空</li>';
			flag = true;
		}
		
		if(sg.length>0){
			if(!re.test(sg)){
				content +='<li>身高需为三位整数内!</li>';
				flag = true;
			} 
		}
		
		re = /^\d{1,2}(\.\d{0,1})?$/ ;
		if(tw.length>0){
			if(!re.test(tw)){
				content +='<li>体温为两位整数内最多一位小数!</li>';
				flag = true;
			} 
		}else{
			content +='<li>体温不能为空</li>';
			flag = true;
		}
		
		re = /^\d{1,3}(\.\d{0,1})?$/ ;
		if(tz.length>0){
			if(!re.test(tz)){
				content +='<li>体重为三位整数内最多一位小数!</li>';
				flag = true;
			} 
		}
	}
	content += '</ol>';
	if(flag){
		toastr.clear();
		toastr.warning(content);
		return false;
	}
	save("save");
	
}

//保存具体操作
function save(mes){
	
    var feijz = $("#feijz").val();
    
    var maxcixu = $("#maxcixu").val();

	//2018-07-14 新增his id 
	var hisid = $("#hisid").val();
	//基本信息
	var id = $("#id").val();
	var fullname = $("#fullname").val();
	var cardnum  = $("#cardnum").val();
	var bornday  = $("#bornday").val();
	var gender  = $("#gender").val();
	var tel  = $("#tel").val();
	var idcard  = $("#idcard").val();
	var age= $("#age").val();
	var category  = $("#category").val();
	var dividtime  = $("#dividtime").val();
	var xgpj = $("#returnUrl").val();
	var cixu="1";
	if(xgpj=="xgpj" && $("#cixu").val()!="0"){
		cixu = $("#cixu").val();
	}
	
	var handleid = $("#handleid").val();
	var deptment = $("#deptment").val();
	
	var hljl = $("#hljl").val();
	var nurse = $("#nurse").html();
	var nurseid = $("#userId").val();
	var status = $("#status").val();

	if((xgpj=="new" || xgpj=="divid") && mes=='draf'){
		status = "未分诊";
	}else{
		if(status!="已接诊"){
			status ="未接诊";
		}
	}
	
    if(feijz=="2"){
		
    	$.ajax({
            type: "post",
            url: "#path()/divid/save",
            data:{
            	xgpj:xgpj,
            	cixu:cixu,
            	feijz:feijz,
            	hisid:hisid,
            	id:id,
           	 	fullname:fullname,
           	 	cardnum:cardnum,
           	 	bornday:bornday,
           	 	gender:gender,
           	 	tel:tel,
           	    idcard:idcard,
           	 	category:category, 	 	
           	 	status:status, 	 	
           	    dividtime:dividtime,
           	 	age:age,
           		handleid:handleid,      		
           		hljl:hljl,
           		nurse:nurse,
           		nurseid:nurseid,
           		deptment:deptment,
           		savestatus:mes
            },
            dataType: "json",
            success: function(result){
           	 	//基础参数赋值
            	if(result!=null){           	
            		if(result.status==200){
            			if(mes=='draf'){
            				toastr.success("暂存成功!");
            				$("#id").val(result.rows.id);
            				$("#handleid").val(result.rows.handleid);          				
            				$("#status").val(result.rows.status);
            			}else{
            				toastr.success("保存成功!");
            				  //设定倒数秒数  
            				$("#time").val(3);
            				//跳转
            			    go();
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
	
		var memberstel  = $("#memberstel").val();
		var admission  = $("button[name='lyfs'][class*=active]").val();
		var greenchannel  = $("button[name='lstd'][class*=active]").val();
		var source  = $("button[name='source'][class*=active]").val()
		var zhusu  = $("input[name='zhusu']").val();
		
		var others  = "";
		var th = {};
		var other = $("button[name='others'][class*=active]");
		if(other.length>0 || $("#othersinput").val()!=""){
			th.sanwu="";
			th.aids="";
			if(other.length>0){
				for(var i = 0;i<other.length;i++){
					if($(other[i]).val()=="三无人员"){
						th.sanwu="三无人员";
					}
					if($(other[i]).val()=="AIDS"){
						th.aids="AIDS";
					}
				}
			}
			th.other=$("#othersinput").val();
			others=JSON.stringify(th);
		}
		var consciousness  = $("button[name='consciousness'][class*=active]").val();
		var anamnesis =""; 
		$("button[name='anamnesis'][class*=active]").each(function(){ 
			//既往史其他添加输入框，可自定义内容
			if($(this).val()=="其他"){
				anamnesis = anamnesis + $(this).val()+"|"+$("#jwsother").val() + ","; 
			}else{
			    anamnesis = anamnesis + $(this).val() + ",";
			}
		}); 
		if(anamnesis !=""){
			anamnesis = anamnesis.substring(0,anamnesis.length-1);
		}
		
		//体征信息
		var  sighid = $("#sighid").val();
		var  sg = $("#sg").val();
		var  tz = $("#tz").val();
		var  hx = $("#huxi").val();
		var  tw = $("#tiwen").val();
		var  mb = $("#maibo").val();
		var  szy = $("#shuzhangya").val();
		var  ssy = $("#shousuoya").val();
	  
		var  spo2 = $("#spo2").val();
		var  pcn = $("#pcn").val();
		var  il6 = $("#il6").val();
		var  crp = $("#crp").val();
		var  cea = $("#cea").val();
		var  afp = $("#afp").val();
		var  myo = $("#myo").val();
		var  ddimer = $("#ddimer").val();
		var  fer = $("#fer").val();
		var  ntprobnp = $("#ntprobnp").val();
		var  hsctnl = $("#hsctnl").val();
		var  ckmb = $("#ckmb").val();
		var  ctnt = $("#ctnt").val();
		var  ca = $("#ca").val();
			
		var autograde = $("#autograde").val();
		var finalgrade = $("#finalgrade").val();
	
		var changereason = $('#changereason option:selected').val();
		var reasondetail = $('#reasondetail').val();

		//快速分级信息
		var  symtpomid = "";	
		$(".xxx").each(function(){
			symtpomid += $(this).attr("id")+",";
		});
		if(symtpomid !=""){
			symtpomid = symtpomid.substring(0,symtpomid.length-1);
		}
		//EDTS评分 
		var edts_ids = "";
		//EDTS评分中B级其他选项是否选中，以及获取选中时输入框的内容
		var edts_ids_qitastatus = "";
		var edts_ids_qita = "";
		if($("#e-b-8-3").attr("class")=="active"){
			$("#e-b-8-4").removeClass("active");
			edts_ids_qita=$("#e-b-8-4").find("input").val();
			edts_ids_qitastatus="true";
		}
		
		$("#quickpf").find('li[class="active"]').each(function(){
			edts_ids += $(this).attr("id")+",";
		});
		if(edts_ids !=""){
			edts_ids = edts_ids.substring(0,edts_ids.length-1);
		}
		
		//MEWS评分 
		var mews_ids = "";
		
		$("#mewspf").find('li[class="active"]').each(function(){
			mews_ids += $(this).attr("id")+",";
		});
		if(mews_ids !=""){
			mews_ids = mews_ids.substring(0,mews_ids.length-1);
		}
		//MEWS总分
		var mews_score = $("#mews_score").html();
		//EDTS总分
		var edts_score = $("#last_score").html();
		
		$.ajax({
	        type: "post",
	        url: "#path()/divid/save",
	        data:{
	        	xgpj:xgpj,
	        	cixu:cixu,
	        	maxcixu:maxcixu,
	        	feijz:feijz,
	        	hisid:hisid,
	        	id:id,
	       	 	fullname:fullname,
	       	 	cardnum:cardnum,
	       	 	bornday:bornday,
	       	 	gender:gender,
	       	 	tel:tel,
	       	 	memberstel:memberstel,
	       	    idcard:idcard,
	       	 	category:category,
	       	 	admission:admission,
	       	 	greenchannel:greenchannel,
	       	 	others:others,
	       	 	consciousness:consciousness,
	       	 	anamnesis:anamnesis,
	       	 	status:status,
	       	 	source:source,
	       	    zhusu:zhusu,
	       	    dividtime:dividtime,
	       	 	age:age,
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
	       		symtpomid:symtpomid,
	       		edts_ids:edts_ids,
	       		edts_ids_qitastatus:edts_ids_qitastatus,
	       		edts_ids_qita:edts_ids_qita,
	       		mews_ids:mews_ids,
	       		mews_score:mews_score,
	       		edts_score:edts_score,
	       		savestatus:mes
	        },
	        dataType: "json",
	        success: function(result){
	       	 	//基础参数赋值
	        	if(result!=null){
	        		if(result.status==200){
	        			if(mes=='draf'){
	        				toastr.success("暂存成功!");
	        				$("#id").val(result.rows.id);
	        				$("#handleid").val(result.rows.handleid);
	        				$("#sighid").val(result.rows.sighid);
	        				$("#status").val(result.rows.status);
	        			}else{
	        				toastr.success("保存成功!");
	        				  //设定倒数秒数  
	        				$("#time").val(3);
	        				//跳转
	        			    go();
	        			}
	        		}
	        	}
	            //alert(mes);
	        	
	        },
	        error: function(){
	        	toastr.error("保存失败!");
	        }
	    });
	}
}

//输入验证
function validate(){
	var content = '<ol  class="list-unstyled">';
	var flag = false;
	
	var cardnum = $("#cardnum").val();
	var re = /^[a-zA-Z0-9]{1,19}$/;
	if(cardnum.length>0){
		if(!re.test(cardnum)){
			content +='<li>请输入正确的卡号信息（1-19位）!</li>';
			flag = true;
		}
	}
	
	var fullname = $("#fullname").val();
	re =/^[a-zA-Z\u4e00-\u9fa5\ \·]+$/;
	if(!fullname.length>0){
		
	}else{
		if (!re.test(fullname)) {
			content +='<li>姓名请输入中文或者英文!</li>';
			flag = true;
		}
	}
	
	
	var tel = $("#tel").val(); 
	//re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	re =/^((13[0-9]{1})|(14[5,7]{1})|(15[0-3,5-9]{1})|(17[0,3,5-8]{1})|(18[0-9]{1})|(166)|(198)|(199)|(147))+\d{8}$/;
	if(tel.length>0){
		if(!re.test(tel)){ 
			content +='<li>联系方式不是正确11位手机号!</li>';
			flag = true;
		} 
	}
	
	var idcard = $("#idcard").val(); 
	//re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	re =/^([1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
	if(idcard.length>0){
		if(!re.test(idcard)){ 
			content +='<li>身份证号格式不正确!</li>';
			flag = true;
		} 
	}
	
	var  sg = $("#sg").val();
	var  tz = $("#tz").val();
	var  hx = $("#huxi").val();
	var  tw = $("#tiwen").val();
	var  mb= $("#maibo").val();
	var  szy = $("#shuzhangya").val();
	var  ssy = $("#shousuoya").val();
	var  spo2 = $("#spo2").val();
	re = /^[0-9]{1,3}$/ ;
	
	if(spo2.length>0){
		if(!re.test(spo2)){ 
			content +='<li>spo2需为三位整数内!</li>';
			flag = true;
		} 
	}
	if(sg.length>0){
		if(!re.test(sg)){ 
			content +='<li>身高需为三位整数内!</li>';
			flag = true;
		} 
	}
	if(hx.length>0){
		if(!re.test(hx)){ 
			content +='<li>呼吸需为三位整数内!</li>';
			flag = true;
		} 
	}
	if(mb.length>0){
		if(!re.test(mb)){ 
			content +='<li>心率需为三位整数内!</li>';
			flag = true;
		} 
	}
	
	if(szy.length>0){
		if(!re.test(szy)){ 
			content +='<li>舒张压为三位整数内!</li>';
			flag = true;
		} 
	}
	if(ssy.length>0){
		if(!re.test(ssy)){ 
			content +='<li>收缩压需为三位整数内!</li>';
			flag = true;
		} 
	}
	
	re = /^\d{1,3}(\.\d{0,1})?$/ ;
	if(tz.length>0){
		if(!re.test(tz)){ 
			content +='<li>体重为三位整数内最多一位小数!</li>';
			flag = true;
		} 
	}
	re = /^\d{1,2}(\.\d{0,1})?$/ ;
	if(tw.length>0){
		if(!re.test(tw)){ 
			content +='<li>体温为两位整数内最多一位小数!</li>';
			flag = true;
		} 
	}
	var hljl = $("#hljl").val(); 
	re = /^[\u4E00-\u9FA5A-Za-z0-9_，,。.！!;；：:？?\s]{0,200}$/;
	if(hljl.length>0){
		if(!re.test(hljl)){ 
			content +='<li>修改原因不能超过200字符（中文，英文，数字），不能包含特殊字符</li>';
			flag = true;
		} 
	}
	toastr.clear();
	content += '</ol>';
	if(flag){
		
		toastr.warning(content);
		return;
	}
}