
function openEvents(){
	window.location.href="#path()/events/index";
}

function closeLoading() {  
    document.getElementById("loading").style.display="none";  
}

function add(){
	var num = $("#num").val();
	var re = /^[0-9]+$/ ; 
	if(!re.test(num)){
		$.messager.alert('提示','请输入正确的人数格式');
		return;
	}else{
		
		if(parseInt(num)>100){
			document.getElementById("loading").style.display="block"; 
		}
		$.ajax({
	        type: "post",
	        url: "#path()/events/getIds",
	        data:{
	        	num:num
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			var total = result.total;
	        			var rows =  result.rows;
	        			var str = new StringBuffer();
	        			for(var i=0;i<total;i++){
	        				var id = rows[i];
	        				
	        				//拼接行
	        				str.append('<tr class="border-no" id="'+id+'" >');
	        				str.append('<td>'+(i+1)+'</td>');
	        				str.append('<td>'+id+'</td>');
	        				str.append('<td><div class="form-list"><input class="form-control text-center input-text" type="text" maxlength="32" name="fullname" value="" placeholder="无名氏"></div></td>');
	        				str.append('<td>');
	        				str.append('<ul class="single-radio">');
	        				str.append('<li><input type="radio" name="sex'+i+'" value="男"><label class="radio-button"></label>男</li>');
	        				str.append('<li><input type="radio" name="sex'+i+'" value="女"><label class="radio-button"></label>女</li>');
							str.append('<li><input type="radio" name="sex'+i+'" value="未说明"><label class="radio-button"></label>不明</li>');
							str.append('</ul>');
						    str.append('</td>');
						    str.append('<td><div class="age">');
						    str.append('<div class="col-md-6 input-read"><input type="text" class="form-control text-center input-text"  name="age" placeholder="请输入"></div>');
						    str.append('<div class="col-md-6">');
						    str.append('<select name="danw" class="form-control input-text"><option value="岁">岁</option><option value="月">月</option><option value="天">天</option>');
						    str.append('</div></div></td>');
						    
	        				str.append('<td><ul class="single-radio">');
	        				str.append('<li><input type="radio" name="consciousness'+i+'"  value="清醒"><label class="radio-button"></label>清醒</li>');
	        				str.append('<li><input type="radio" name="consciousness'+i+'"  value="昏迷"><label class="radio-button"></label>昏迷</li>');
	        				str.append('<li><input type="radio" name="consciousness'+i+'"  value="谵妄"><label class="radio-button"></label>谵妄</li>');
	        				str.append('<li><input type="radio" name="consciousness'+i+'"  value="嗜睡"><label class="radio-button"></label>嗜睡</li>');
	        				str.append('<li><input type="radio" name="consciousness'+i+'"  value="昏睡"><label class="radio-button"></label>昏睡</li>');
	        				str.append('</ul></td>');
	        				
	        				str.append('<td><div class="form-list">');
	        				str.append('<div class="col-md-5"><input type="text" class="form-control text-center input-text" name="ssy"  placeholder="请输入"></div>');
	        				str.append('<div class="col-md-2">/</div>');
	        				str.append('<div class="col-md-5"><input type="text" class="form-control text-center input-text" name="szy" placeholder="请输入"></div>');
	        				str.append('</div></td>');
	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text"  name="maibo" placeholder="请输入"></div></td>');
	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text"  name="huxi" placeholder="请输入"></div></td>');
	        				str.append('<td><div class="form-list">');
	        				str.append('<input type="hidden"  value="0" name="autograde">');
	        				str.append('<input type="hidden"  value="0" name="finalgrade">');
	        				str.append('<input type="hidden"  value="0" name="changereason">');
	        				str.append('<input type="hidden"  value="0" name="edts_ids_qita">');
	        				str.append('<input type="hidden"  value="0" name="edts_ids_qitastatus">');
	        				str.append('<input type="hidden"  value="0" name="edts_ids">');
	        				str.append('<input type="hidden"  value="0" name="mews_ids">');
	        				str.append('<input type="hidden"  value="0" name="mews_score">');
	        				str.append('<input type="hidden"  value="0" name="edts_score">');
	        				str.append('<input type="hidden"  value="0" name="symtpomid">');
	        				str.append('<input type="hidden"  value="0" name="symtpomname">');
	        				str.append('<h3><span name="grade" class="label label-sinple lg" onclick="tiaozhuanfenji(&quot;'+id+'&quot;);">分级</span></h3></div></td>');
	        						
	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text" name="zhusu" placeholder="请输入"></div></td>');
	        				
	        				str.append('</tr>');
	        			}
	        			//console.log(result);
	        			$("#tbody").html("");
	        			$("#tbody").html(str.toString());
	        			//单项选择按钮
	        			$(".single-radio li input[type='radio']").each(function() {
	        				$(this).click(function() {
	        					if($(this).is(":checked")) {
	        						$(this).parent().siblings("li").find("label").removeClass("pitch");
	        						$(this).siblings("label").addClass("pitch");
	        					}
	        				})
	        			})
	        			
	        			var box_h =$(".table-outburst2").height();
	        			var table_h = $(".titbox").height();
	        			if(table_h > box_h){
	        				$(".table-outburst1").css("width","99.9%");
	        				$(".table-head").css("margin","0px 17px 0 15px");
	        			}else{
	        				$(".table-outburst1").css("width","100%");
	        				$(".table-head").css("margin","0 15px");
	        			}
	        		}
	        	}
			
	        	if(parseInt(num)>100){
	        		// 遮罩层消失  
	        		closeLoading(); 
	    		}
	        },
			error : function() {
				if(parseInt(num)>100){
					// 遮罩层消失  
					closeLoading(); 
				}
			}
		});
	}
}

//重置 评分
function reset(){
	

	//去除目前评分
	
	$("#mews_a li").removeClass('active');
	$("#mews_b li").removeClass('active');
	$(".mews_score_A").text("0");
	$(".mews_score_B").text("0");
	$(".mews_score_C").text("0");
	$("li[name='mews_sel_yishi']").removeClass('active');
	$("li[name='mews_sel_tiwen']").removeClass('active');
	$("#mews_tiwen").text(0);
	$("#mews_yishi").text(0);
	
	$("li[name='edts_sel_tiwen']").removeClass('active');
	$("li[name='edts_sel_spo2']").removeClass('active');
	$("#score_tiwen").text(0);
	$("#score_spo2").text(0);
	$("#pf_b li").removeClass('active');
	$("#pf_c li").removeClass('active');
	$(".Score_B").text("0");
	$(".Score_C").text("15");
	$(".Score_D").text("0");
	$(".totalScore").text("0");
	setgradebtncss() ;
	$("#symptom").html("");
	 //快速分级默认显示第一级
	getSymptom("0","1");
	
	$('#changereason').combobox('setText','');

	$("select[id='sel_tiwen']").val("0");
	$("select[id='sel_spo2']").val("0");
	//$('#mname').combobox('setText', t.mname);
}
	function save(){
		if(!$("#name").val().length>0){
	    	$.messager.alert('提示','事件名称不能为空');
	    	return;
	    }
		var num = $("#num").val();
		var re = /^[0-9]+$/ ; 
		if(!re.test(num)){
			$.messager.alert('提示','请确认事件人数并生成清单');
			return;
		}
		//找到未分级的列
		
		var spans = $("span[name='grade']");
		for(var i=0;i<spans.length;i++){
			var span = spans.eq(i);
			if(span.hasClass('label-sinple')){
				$.messager.alert('提示','请分级后再保存');
				return;
			}
		}
		
		
		var trList = $("#tbody").children("tr");
		

		var size = trList.length;
		if(size!=num){
			$.messager.alert('提示','请确认事件人数并生成清单');
			return;
		}	
		var re = /^[0-9]{1,3}$/ ;
		var str = "";
		var symtpomids ="";
		var edts_idss ="";
		var mews_idss ="";
	    for (var i=0;i<trList.length;i++) {
	    	var tr = trList.eq(i);
	    	var id = tr.attr("id");
	    	var fullname = tr.find("input[name='fullname']").val();
	    	
	    	if(fullname==""){
	    		fullname = "无名氏";	
	    	}
	    	var sex = tr.find("input[name='sex"+i+"']:checked").val();
	    	if(typeof(sex)=="undefined"){
	    		sex="未说明";
	    	}
	    	var age = tr.find("input[name='age']").val();
	    	var danw = tr.find("select[name='danw']").val();
	    	if(age.length>0){
	    		age = age+danw;	
	    	}else{
	    		age = '0';
	    	}
	    	var consciousness = tr.find("input[name='consciousness"+i+"']:checked").val();
	    	if(consciousness==null || consciousness=="undefined"){
	    		consciousness="0";
	    	}
	    	
	    	var ssy = tr.find("input[name='ssy']").val();
	    	var szy = tr.find("input[name='szy']").val();
	    	var maibo = tr.find("input[name='maibo']").val();
	    	var huxi = tr.find("input[name='huxi']").val();
	    	
	    	
	    	if(ssy ==""){
	    		ssy = "0";	
	    	}
	    	if(szy ==""){
	    		szy = "0";	
	    	}
	    	if(maibo ==""){
	    		maibo = "0";	
	    	}
	    	if(huxi ==""){
	    		huxi = "0";	
	    	}
	    	
	    	if(!(re.test(ssy)&&re.test(szy)&&re.test(maibo)&&re.test(huxi))){ 
	    		$.messager.alert('提示','血压、脉搏、呼吸必须在三位整数内');
				return;
			}
	    	
			
			
	    	
	    	
	    	var autograde = tr.find("input[name='autograde']").val();
	    	var finalgrade = tr.find("input[name='finalgrade']").val();
	    	var changereason = "0"
	    	if(finalgrade !="0"){
	    		changereason = tr.find("input[name='changereason']").val();
	    	}
	    	var zhusu = tr.find("input[name='zhusu']").val();
	    	if(zhusu ==""){
	    		zhusu = "0";	
	    	}
	    	 
	    	   	
	    	var edts_ids_qita = tr.find("input[name='edts_ids_qita']").val();
	    	var edts_ids_qitastatus = tr.find("input[name='edts_ids_qitastatus']").val();
	    	
	    	var mews_score = tr.find("input[name='mews_score']").val();
	    	var edts_score = tr.find("input[name='edts_score']").val();
	    	
	    	var symtpomid = tr.find("input[name='symtpomid']").val();
	    	var edts_ids = tr.find("input[name='edts_ids']").val();
	    	var mews_ids = tr.find("input[name='mews_ids']").val();
	    	
	    	
	    	symtpomids += symtpomid +"#";
	    	edts_idss += edts_ids +"#";
	    	mews_idss += mews_ids +"#";
	    	
	    	
	    	str+= id+",";
	    	str+= fullname+",";
	    	str+= sex+",";
	    	str+= age+",";
	    	str+= consciousness+",";
	    	str+= ssy+",";
	    	str+= szy+",";	    	
	    	str+= maibo+",";
	    	str+= huxi+",";
	    	str+= autograde+",";
	    	str+= finalgrade+",";
	    	str+= zhusu+",";
	    	str+= changereason+",";
	    	str+= edts_ids_qita+",";
	    	str+= edts_ids_qitastatus+",";
	    	str+= mews_score+",";
	    	str+= edts_score+"#X#";
	    }
	    if(str.length>0){
	    	str = str.substring(0,str.length-3);
    	}
	    if(symtpomids.length>0){
	    	symtpomids = symtpomids.substring(0,symtpomids.length-1);
    	}
	    if(edts_idss.length>0){
	    	edts_idss = edts_idss.substring(0,edts_idss.length-1);
    	}
	    if(mews_idss.length>0){
	    	mews_idss = mews_idss.substring(0,mews_idss.length-1);
    	}
	    
	    //console.log(str);
	    $.ajax({
	        type: "post",
	        url: "#path()/events/save",
	        data:{
	        	nurseid:'#userId()',
	        	nursename:'#userName()',
	        	name:$("#name").val(),
	        	paitents:str,
	        	num:$("#num").val(),
	        	symtpomids:symtpomids,
	        	mews_idss:mews_idss,
	        	edts_idss:edts_idss
	        	
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			$.messager.alert('提示','保存成功',"alert",function(){
	        				openEvents();
	        		    });
	        		}else{
	        			$.messager.alert('提示','保存失败，请联系系统管理员');
	        		}
	        	}
			},
			error : function() {
			}
		});
		
	}
	
	function tiaozhuanfenji(id){
		$("#p_id").val(id);
		$('#fenzhenpjb').modal();
		
		//load();
	}
	
	function load(){
		var tr = $("#"+p_id);
		
		var autograde = tr.find("input[name='autograde']").val();
    	var finalgrade = tr.find("input[name='finalgrade']").val();

    	var changereason = tr.find("input[name='changereason']").val();
    	   	
    	var edts_ids_qita = tr.find("input[name='edts_ids_qita']").val();
    	var edts_ids_qitastatus = tr.find("input[name='edts_ids_qitastatus']").val();
    	

    	
    	var symtpomid = tr.find("input[name='symtpomid']").val();
    	var symtpomname = tr.find("input[name='symtpomname']").val();
    	
    	var edts_ids = tr.find("input[name='edts_ids']").val();
    	var mews_ids = tr.find("input[name='mews_ids']").val();
    	
    	
	}
	
	function saveGrade(){
		
		var p_id = $("#p_id").val();
		
		var tr = $("#"+p_id);
		var finalgrade = tr.find("input[name='finalgrade']").val();
    	if (finalgrade!="0"){
    		if($("#changereason").val()==""){
    			$.messager.alert('提示','手动分级修改原因不能为空');
    			return;
    		}	
    	}
    	
    	$('#seach_patient').modal('hide');
		
		var changereason= $('#changereason').combobox('getText');
		
		var  symtpomid = "";
		var  symtpomname = "";
		//分级信息
		$(".xxx").each(function(){
			symtpomid += $(this).attr("id")+",";
			symtpomname += $(this).prev().html()+",";

		});
		
		if(symtpomname !=""){
			symtpomname = symtpomname.substring(0,symtpomname.length-1);
		}
		
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
			
			var name = $(this).attr("name");
			if(name=="edts_sel_tiwen")
			{
				
			}else if(name=="edts_sel_spo2"){
				
			}else{
				edts_ids += $(this).attr("id")+",";	
			}
		});
		if(edts_ids !=""){
			edts_ids = edts_ids.substring(0,edts_ids.length-1);
		}
						
		//MEWS评分 
		var mews_ids = "";
		
		$("#mewspf").find('li[class="active"]').each(function(){
			var name = $(this).attr("name");
			if(name=="mews_sel_tiwen")
			{
				
			}else if(name=="mews_sel_yishi"){
				
			}else{
				mews_ids += $(this).attr("id")+",";
			}
			
		});
		if(mews_ids !=""){
			mews_ids = mews_ids.substring(0,mews_ids.length-1);
		}
		//MEWS总分
		var mews_score = $("#mews_score").html();
		//EDTS总分
		var edts_score = $("#last_score").html();


		if(changereason!=""){
			tr.find("input[name='changereason']").val(changereason);	
		}
		
		if(symtpomid!=""){
			tr.find("input[name='symtpomid']").val(symtpomid);	
		}
		
		if(symtpomname!=""){
			tr.find("input[name='symtpomname']").val(symtpomname);	
		}
		
		
		if(edts_ids!=""){
			tr.find("input[name='edts_ids']").val(edts_ids);
		}
		if(mews_ids!=""){
			tr.find("input[name='mews_ids']").val(mews_ids);	
		}
		if(edts_ids_qita!=""){
			tr.find("input[name='edts_ids_qita']").val(edts_ids_qita);
		}
		
		if(edts_ids_qitastatus!=""){
			tr.find("input[name='edts_ids_qitastatus']").val(edts_ids_qitastatus);
		}
		
		if(typeof(mews_score)!="undefined"){
			tr.find("input[name='mews_score']").val(mews_score);
		}
		if(typeof(edts_score)!="undefined"){
			tr.find("input[name='edts_score']").val(edts_score);
			
		}
		
		
		
		
		
		
		
		//改变 级数
		var autograde = tr.find("input[name='autograde']").val();
    	var finalgrade = tr.find("input[name='finalgrade']").val();
    	if (finalgrade!="0"){
    		var name = getgradenamebygradeid(finalgrade);
    		var g = finalgrade.substring(finalgrade.length-1,finalgrade.length);
		    var grade_css = 'btn-'+g+'-selected';
		    var strhtml = "";
			switch(g)
			{
			    case '1':
			    	//alert(11);
			    	strhtml+='<button type="button" class="btn btn-1  btn-1-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);" >'+name+'</button>';
			        break;
			    case '2':
			    	strhtml+='<button type="button" class="btn btn-2  btn-2-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);">'+name+'</button>';
			        break;
			    case '3':
			    	strhtml+='<button type="button" class="btn btn-3 btn-3-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);">'+name+'</button>';
			        break;
			    case '4':
			    	strhtml+='<button type="button" class="btn btn-4  btn-4-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);">'+name+'</button>';
			        break;
			    case '5':
			    	strhtml+='<button type="button" class="btn btn-5  btn-5-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);">'+name+'</button>';
			        break;
			}
			tr.find("span[name='grade']").removeClass('label-sinple').css("padding","0");
		    tr.find("span[name='grade']").html(strhtml);
    	}else if(finalgrade=="0"&&autograde!="0"){
    		var name = getgradenamebygradeid(autograde);
    		var g = autograde.substring(autograde.length-1,autograde.length);
		    var grade_css = 'btn-'+g+'-selected';
		    var strhtml = "";
			switch(g)
			{
			    case '1':
			    	//alert(11);
			    	strhtml+='<button type="button" class="btn btn-1  btn-1-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);" >'+name+'</button>';
			        break;
			    case '2':
			    	strhtml+='<button type="button" class="btn btn-2  btn-2-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);">'+name+'</button>';
			        break;
			    case '3':
			    	strhtml+='<button type="button" class="btn btn-3 btn-3-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);">'+name+'</button>';
			        break;
			    case '4':
			    	strhtml+='<button type="button" class="btn btn-4  btn-4-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);">'+name+'</button>';
			        break;
			    case '5':
			    	strhtml+='<button type="button" class="btn btn-5  btn-5-selected  " onclick="tiaozhuanfenji(&quot;'+p_id+'&quot;);">'+name+'</button>';
			        break;
			}
			tr.find("span[name='grade']").removeClass('label-sinple').css("padding","0");
		    tr.find("span[name='grade']").html(strhtml);
    	}
    	
    	 $('#fenzhenpjb').modal('hide');
    	 
    	 reset();
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
			$("#mewsgrade").val("");
		}
		
		if(document.getElementById("mews_x")){
			getMewsScore();
		}
		if(document.getElementById("edts_x")){
			getTotalScore();
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
	        		//console.log(result);
	        		if(result.status==200){
	        			var rows = result.rows;
	        			//$(".gradingWay").html("");
	        			$("#leftMenu").html("");
	            		var str ="" ;
	           	 		for(var i in rows){
	           	 			var name = rows[i]["right_name"];
	           	 		    var tyid = rows[i]["ty_id"];
	           	 			var right_type = rows[i]["right_type"];
	           	 				if(right_type==1){
	           	 					str += " <li tyid="+tyid+" onclick='active4(this)' class='active' title='"+name+"'><i class='icon_treat'></i>";
	           	 				}else{
	           	 					str += " <li tyid="+tyid+" onclick='active4(this)' title='"+name+"'><i class='icon_treat'></i>";
	           	 				}
	           	 			    str += "<span>";
	           	 			    	
	           	 			   
	           	 				str+= name;
	           	 				str+= "</span></li>";
	           	 			//}
	           	 			//显示主要评分方式
	           	 			if(right_type==1){
	           	 			    if(tyid=='401'){
	           	 					//显示快速分级
	           	 					$('#quickgrade').show();
	           	 					//$('#defultpjfs').val("quickgrade");
	           	 			    }else if(tyid=='408'){
	           	 			    	//显示EDTS
	           	 					$('#quickpf').show();
	           	 					//$('#last_score_div').show();
	           	 					//$('#defultpjfs').val("quickpf");
	           	 			    }else if(tyid=='406'){
	           	 					$('#mewspf').show();
	           	 					//$('#defultpjfs').val("mewspf");
	           	 				}else{
	           	 					$('#default').show();
	           	 					//$('#defultpjfs').val("default");
	           	 				}
	           	 			   // $("#headerpingjb").text(name);
	           	 			}
	           	 		}
	           	 		//alert(str);
	            		$("#leftMenu").html(str);	            		
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
	       	 				str+="<li onclick='showSymptom(this,\""+xxx+"\",\"" + name + "\","+level+",\""+grade+"\")'>"+name+"</li>"
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
				//toastr.warning("请先选择分类");
				return; 
			}else if(pid==""){
				//toastr.warning("请先选择主诉");
				return; 
			}else{
				getSymptom(pid,"3");
				$("#lv"+level).addClass('active').siblings().removeClass('active');
			}
			
		}
		
	}
	
	//选择快速分级 后显示等级
	//选择快速分级 后显示等级
	var describe = [];
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
			
			//让你点到挂也加不了重复元素，哈哈哈
			if(describe.indexOf(pid) == -1){
				addResult();
				describe.push(pid);
			}else{	
				if(!$(th).hasClass("active")){
					$("#symptom .alert").each(function(){
						var closeId = $(this).find("button[type='button']").attr("id");					
						if(closeId == pid){
							$(this).remove();
							describe.splice(describe.indexOf(pid),1);						
						}
					})
				}				
			}			
			
			function addResult(){
				var str = "<div class=\"alert alert-dismissable\">";
				str+= "<div class='result-level'>"+$("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name+"</div>";
				str+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+pid+"\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>"				
			    str+= "</div>";
			    var html = $("#symptom").html();
			    html = html +str;
			    $("#symptom").html(html);
			}
			
			    var p_id = $("#p_id").val();
				
				var tr = $("#"+p_id);
				var old = tr.find("input[name='autograde']").val();
				
			    if(old=="0"||old>grade){
			    	tr.find("input[name='autograde']").val(grade);
			    	//var name = getgradenamebygradeid(grade);
			    	
			    	 var g = grade.substring(grade.length-1,grade.length);
					 var grade_css = 'btn-'+g+'-selected';
					    for(var i=1;i<6;i++){
							if(g!=i){
								$("#g1[value =\""+"100"+i+"\"]").removeClass("btn-"+i).removeClass("btn-"+i+"-selected").addClass("unused-btn");
							}else{
								$("#g1[value =\""+"100"+i+"\"]").removeClass("unused-btn");
						    	$("#g1[value =\""+"100"+i+"\"]").addClass("btn-"+i);
						    	$("#g1[value =\""+"100"+i+"\"]").addClass(grade_css);
							}
						}
			    }
		}		
	}
	
	function active4(btn){		
		//评级方式按钮点击效果
		if($(btn).is('.active')){
			
		}else{
			$(btn).addClass('active').siblings().removeClass('active');
			//$(btn).addClass('active').siblings().removeClass('active');
			var name = $(btn).find("span").text();
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
		return gradename;
	}
	
	
	function active2(grade){
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
			var p_id = $("#p_id").val();
			
			var tr = $("#"+p_id);
			tr.find("input[name='finalgrade']").val(value);
		}
	}
	
	//动态设置评级等级样式
function setgradebtncss() {
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
	    	    		var gradebtn1 = '';
	    	    		var gradebtn2 = '';
	       	 			for(var i in list){
	       	 				var ys_id = list[i]["ys_id"].toString();
	       	 				var grade_color = list[i]["grade_color"];
	       	 				var grade = ys_id.substring(ys_id.length-1,ys_id.length);
	       	 				css += '.btn-';
	       	 				css += grade;
	       	 				css += '{padding: 6px 24px;background:#efefef;color:#fff';
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
	
	function StringBuffer() {
	    this.__strings__ = new Array();
	}
	StringBuffer.prototype.append = function (str) {
	    this.__strings__.push(str);
	    return this;    //方便链式操作
	}
	
	StringBuffer.prototype.toString = function () {
	    return this.__strings__.join("");
	}
	
