
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
	 /*手动验证表单，当是普通按钮时。*/  
   // $('#addPatientForm').data('bootstrapValidator').validate();  
   // if(!$('#addPatientForm').data('bootstrapValidator').isValid()){  
     //   return ;  
   // }
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
	re =/^[a-zA-Z\u4e00-\u9fa5]+$/;
	if(!fullname.length>0){
		
	}else{
		if (!re.test(fullname)) {
			content +='<li>姓名请输入中文或者英文!</li>';
			flag = true;
		}
	}
	
	
	var tel = $("#tel").val(); 
	re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(tel.length>0){
		if(!re.test(tel)){ 
			content +='<li>联系方式不是正确11位手机号!</li>';
			flag = true;
		} 
	}
	var memberstel = $("#memberstel").val(); 
	re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(memberstel.length>0){
		if(!re.test(memberstel)){ 
			content +='<li>家属联系方式不是正确11位手机号!</li>';
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
	re =/^[a-zA-Z\u4e00-\u9fa5]+$/;
	if(!fullname.length>0){
		content +='<li>请输入姓名信息!</li>';
		flag = true;
	}else{
		if (!re.test(fullname)) {
			content +='<li>姓名请输入中文或者英文!</li>';
			flag = true;
		}
	}
	
	
	var tel = $("#tel").val(); 
	re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(tel.length>0){
		if(!re.test(tel)){ 
			content +='<li>联系方式不是正确11位手机号!</li>';
			flag = true;
		} 
	}
	var memberstel = $("#memberstel").val(); 
	re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(memberstel.length>0){
		if(!re.test(memberstel)){ 
			content +='<li>家属联系方式不是正确11位手机号!</li>';
			flag = true;
		} 
	}
	
	
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
	
	
	var  sg = $("#sg").val();
	var  tz = $("#tz").val();
	var  hx = $("#huxi").val();
	var  tw = $("#tiwen").val();
	var  mb= $("#maibo").val();
	var  szy = $("#shuzhangya").val();
	var  ssy = $("#shousuoya").val();
	re = /^[0-9]{1,3}$/ ;
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
	//基本信息
	var id = $("#id").val();
	var fullname = $("#fullname").val();
	var cardnum  = $("#cardnum").val();
	var bornday  = $("#bornday").val();
	var gender  = $("#gender").val();
	var tel  = $("#tel").val();
	var memberstel  = $("#memberstel").val();
	var age= $("#age").val();
	var category  = $("#category").val();
	var admission  = $("button[name='lyfs'][class*=active]").val();
	var greenchannel  = $("button[name='lstd'][class*=active]").val();
	var source  = $("button[name='source'][class*=active]").val()
	
	var others  = $("button[name='others'][class*=active]").val();
	var consciousness  = $("button[name='consciousness'][class*=active]").val();
	var anamnesis =""; 
	$("button[name='anamnesis'][class*=active]").each(function(){ 
		anamnesis = anamnesis + $(this).val() + ","; 
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
	
	
	
	var  symtpomid = "";
	//分级信息
	$(".close").each(function(){
		symtpomid += $(this).attr("id")+",";
	});
	if(symtpomid !=""){
		symtpomid = symtpomid.substring(0,symtpomid.length-1);
	}
	//alert(symtpomid);
	var handleid = $("#handleid").val();
	var autograde = $("#autograde").val();
	var finalgrade = $("#finalgrade").val();
	var deptment = $("#deptment").val();
	
	
	var changereason= $('#changereason').combobox('getText');
	//alert(changereason);
	var hljl = $("#hljl").val();
	var nurse = $("#nurse").html();
	
	var status = "未接诊";
	if(deptment==""){
		 status = "未分诊";
	}
	
	//EDTS评分 
	var edts_ids = "";
	
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
	
	
	//console.log(edts_score);
	//alert(mesws_score);
	//return;
	
	$.ajax({
        type: "post",
        url: "#path()/divid/save",
        data:{
        	id:id,
       	 	fullname:fullname,
       	 	cardnum:cardnum,
       	 	bornday:bornday,
       	 	gender:gender,
       	 	tel:tel,
       	 	memberstel:memberstel,
       	 	category:category,
       	 	admission:admission,
       	 	greenchannel:greenchannel,
       	 	others:others,
       	 	consciousness:consciousness,
       	 	anamnesis:anamnesis,
       	 	status:status,
       	 	source:source,
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
       		hljl:hljl,
       		nurse:nurse,
       		deptment:deptment,
       		symtpomid:symtpomid,
       		edts_ids:edts_ids,
       		mews_ids:mews_ids,
       		mews_score:mews_score,
       		edts_score:edts_score
        },
        dataType: "json",
        success: function(result){
       	 	//基础参数赋值
        	if(result!=null){
        		//console.log(result);
        		if(result.status==200){
        			if(mes=='draf'){
        				toastr.success("暂存成功!");
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
	re =/^[a-zA-Z\u4e00-\u9fa5]+$/;
	if(!fullname.length>0){
		
	}else{
		if (!re.test(fullname)) {
			content +='<li>姓名请输入中文或者英文!</li>';
			flag = true;
		}
	}
	
	
	var tel = $("#tel").val(); 
	re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(tel.length>0){
		if(!re.test(tel)){ 
			content +='<li>联系方式不是正确11位手机号!</li>';
			flag = true;
		} 
	}
	var memberstel = $("#memberstel").val(); 
	re = /^1[3|4|5|8][0-9]\d{4,8}$/;
	if(memberstel.length>0){
		if(!re.test(memberstel)){ 
			content +='<li>家属联系方式不是正确11位手机号!</li>';
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
	toastr.clear();
	content += '</ol>';
	if(flag){
		
		toastr.warning(content);
		return;
	}
}