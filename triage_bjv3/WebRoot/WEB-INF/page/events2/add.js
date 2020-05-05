


function add(){
	var num = $("#num").val();
	var re = /^[0-9]+$/ ; 
	if(!re.test(num)){
		$.messager.alert('提示','请输入正确的人数格式');
		return;
	}else{
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
	        				str.append('<td><input class="form-control formHalf" type="text" maxlength="32" style="width:100px" name="fullname"></td>');
	        				str.append('<td>');
	        				str.append('<ul class="single-radio">');
	        				str.append('<li><label id="single" class="radio-button"><input type="radio" name="sex" value="男">男</label></li>');
	        				str.append('<li><label id="single" class="radio-button"><input type="radio" name="sex" value="女">女</label>女</li>');
							str.append('<li><label id="single" class="radio-button"><input type="radio" name="sex" value="未说明">不明</label></li>');
							str.append('</ul>');
						    str.append('</td>');
						    str.append('<td><div class="age"');
						    str.append('<div class="col-md-6 input-read"><input type="text" class="form-control text-center input-text" value="" name="age"></div>');
						    str.append('<div class="col-md-6">');
						    str.append('<select name="danw"><option value="岁">岁</option><option value="月">月</option> <option value="天">天</option>');
						    str.append('</div></div></td>');
						    
	        				str.append('<td><ul class="single-radio">');
	        				str.append('<li><label id="single" class="radio-button"><input type="radio" name="consciousness"  value="清醒">清醒</label></li>');
	        				str.append('<li><label id="single" class="radio-button"><input type="radio" name="consciousness"  value="昏迷">昏迷</label></li>');
	        				str.append('<li><label id="single" class="radio-button"><input type="radio" name="consciousness"  value="谵妄">谵妄</label></li>');
	        				str.append('<li><label id="single" class="radio-button"><input type="radio" name="consciousness"  value="嗜睡">嗜睡</label></li>');
	        				str.append('<li><label id="single" class="radio-button"><input type="radio" name="consciousness"  value="昏睡">昏睡</label></li>');
	        				str.append('</ul></td>');
	        				
	        				str.append('<td><div class="form-list">');
	        				str.append('<div class="col-md-5"><input type="text" class="form-control text-center input-text" name="ssy" value=""></div>');
	        				str.append('<div class="col-md-2">/</div>');
	        				str.append('<div class="col-md-5"><input type="text" class="form-control text-center input-text" value="" name="szy"></div>');
	        				str.append('</div></td>')
	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text" value="" name="maibo"></div></td>');
	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text" value="" name="huxi"></div></td>');
	        				str.append('<td><div class="form-list">');
	        				str.append('<input type="hidden"  value="1002" name="autograde">');
	        				str.append('<input type="hidden"  value="1001" name="finalgrade">');
	        				str.append('<h3><span class="label label-1 lg" onclick="tiaozhuanfenji(&quot;'+id+'&quot;);">分级</span></h3></div></td>');
	        						
	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text" value="" name="zhusu"></div></td>');
	        				
	        				str.append('</tr>');
	        			}
	        			//console.log(str);
	        			$("#tbody").html("");
	        			$("#tbody").html(str.toString());
	        		}
	        	}
			},
			error : function() {
			}
		});
	}
}
	function save(){
		if(!$("#name").val().length>0){
	    	$.messager.alert('提示','事件名称不能为空');
	    	retrun;
	    }
		var trList = $("#tbody").children("tr");
		var str = "";
	    for (var i=0;i<trList.length;i++) {
	    	var tr = trList.eq(i);
	    	var id = tr.attr("id");
	    	var fullname = tr.find("input[name='fullname']").val();
	    	var sex = tr.find("input[name='sex']:checked").val();
	    	var age = tr.find("input[name='age']").val();
	    	var danw = tr.find("select[name='danw']").val();
	    	if(age.length>0){
	    		age = age+danw;	
	    	}
	    	var consciousness = tr.find("input[name='consciousness']:checked").val();
	    	var ssy = tr.find("input[name='ssy']").val();
	    	var szy = tr.find("input[name='szy']").val();
	    	var maibo = tr.find("input[name='maibo']").val();
	    	var huxi = tr.find("input[name='huxi']").val();
	    	var autograde = tr.find("input[name='autograde']").val();
	    	var finalgrade = tr.find("input[name='finalgrade']").val();
	    	var zhusu = tr.find("input[name='zhusu']").val();
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
	    	str+= zhusu+"$";
	    }
	    if(str.length>0){
	    	str = str.substring(0,str.length-1);
    	}
	    
	    //console.log(str);
	    $.ajax({
	        type: "post",
	        url: "#path()/events/save",
	        data:{
	        	nurseid:'#userId()',
	        	name:$("#name").val(),
	        	paitents:str,
	        	num:$("#num").val()
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			$.messager.alert('提示','保存成功');
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
	        		console.log(result);
	        		if(result.status==200){
	        			var rows = result.rows;
	        			//$(".gradingWay").html("");
	        			$("#leftMenu").html("");
	            		var str ="" ;
	           	 		for(var i in rows){
	           	 			var name = rows[i]["right_name"];
	           	 			var right_type = rows[i]["right_type"];
	           	 				if(right_type==1){
	           	 					str += " <li><i class='icon_trea'></i>";
	           	 				}else{
	           	 					str += " <li><i class='icon_trea'></i>";
	           	 				}
	           	 			    str += "<span onclick='active4(this)'>";
	           	 			    	
	           	 			   
	           	 				str+= name;
	           	 				str+= "</span></li>";
	           	 			//}
	           	 			//显示主要评分方式
	           	 			if(right_type==1){
	           	 				if(name=='快速分级'){
	           	 					//显示快速分级
	           	 					$('#quickgrade').show();
	           	 					//$('#defultpjfs').val("quickgrade");
	           	 				}else if(name=='EDTS评分'){
	           	 					$('#quickpf').show();
	           	 					//$('#last_score_div').show();
	           	 					//$('#defultpjfs').val("quickpf");
	           	 				}else if(name=='MEWS评分'){
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
	
	
	function active4(btn){
		
		//评级方式按钮点击效果
		if($(btn).parent().is('.active')){
			
		}else{
			$(btn).parent().addClass('active').siblings().removeClass('active');
			//$(btn).addClass('active').siblings().removeClass('active');
			var name = $(btn).text();
			if(name=='快速分级'){
				//显示快速分级
				$('#quickgrade').show().siblings().hide();
			}else if(name=='EDTS评分'){
				$('#quickpf').show().siblings().hide();
				//$('#last_score_div').show();
				getTotalScore();
			}else if(name=='MEWS评分'){
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
	
