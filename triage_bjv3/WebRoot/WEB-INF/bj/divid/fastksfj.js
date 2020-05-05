function initFastksfj(){

	//快速分级 查询
	$("#seach_lv1,#seach_lv2,#seach_lv3").bind("input propertychange", function(){  
		
		var id = $(this).attr("id");
		if(id=="seach_lv1"){
			getSymptom(0,1);
		}else if(id=="seach_lv2"){
			getSymptom($("#level_1_id").val(),2);
		}else if(id=="seach_lv3"){
			getSymptom($("#level_2_id").val(),3);
		}
	});
	getSymptom("0","1");
	getSymptom("16363778358","2");
	getSymptom("10048984335","3");
}
function getSymptom(pid,level){

	$("#"+pid+"").addClass("activecc").siblings().removeClass("activecc");
	var level_name = $("#"+pid).find("a").html();
	var keywords = "";
	if(level=="1"){
		keywords = $("#seach_lv1").val();
	}else if (level=="2"){
		$("#level_1_id").val(pid);
		keywords = $("#seach_lv2").val();
	}else if (level=="3"){
		$("#level_2_id").val(pid);
		keywords = $("#seach_lv3").val();
	}
	$.ajax({
        type: "post",
        url: "#path()/divid/getSymptom",
        data:{
       	 pid:pid,
       	 level:level,
       	 keywords:keywords
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		//console.log(result);
        		if(result.status==200){
        			
        			var str = "";
       	 			var list = result.rows;
       	 			if(level=="1"){
       	 			}else if (level=="2"){
       	 				$("#level_1_name").val(level_name);
       	 			}else if (level=="3"){
       	 				$("#level_2_name").val(level_name);
       	 			}
       	 			
       	 			//计算下一等级是否只有一个
       	 			var x = Array();
       	 			var xx;
       	 			
       	 			for(var i in list){
       	 				var name = list[i]["name"];
       	 				var id = list[i]["id"];
       	 				var grade = list[i]["grade"];
       	 				if(level=="1"){
       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,2);"><a>' +name+'</a></li>';
       	 				}else if (level=="2"){
       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,3);"><a>' +name+'</a></li>';
       	 				}else if(level=="3"){
       	 					str += '<li id="'+id+'"  class="btn-'+grade +'-selected"  onclick="showGrade(&quot;'+grade+'&quot,&quot;'+name+'&quot,&quot;'+id+'&quot,&quot;'+pid+'&quot);"><a style="">' +name+'</a></li>';
       	 					if(x.indexOf(grade)==-1){
	 							x.push(grade);
	 							xx = list[i];
	 						}	
       	 				}
       	 			}
       	 			if(level=="1"){
       	 				str += '<li id="10000000001" class="addtype-input classify-class"><input id="zdy1" type="text" maxlength="20"  data-provide="typeahead" autocomplete="off" placeholder="自定义分类"></li>';
       	 				$("#classify1 li").not(":first").remove(); 
       	 				
       	 				$("#classify1").append(str);
       	 				$("#seach_lv2").val("");
       	 				$("#seach_lv3").val("");
       	 				$("#classify2 li").not(":first").remove();
       	 				$("#classify3 li").not(":first").remove();
       	 				
       	 			}else if(level=="2"){
       	 			    str += '<li id="10000000002" class="addtype-input classify-class"><input id="zdy2" type="text"  maxlength="20"   data-provide="typeahead"  autocomplete="off" placeholder="自定义主诉"></li>';
       	 				$("#classify2 li").not(":first").remove(); 
   	 					$("#classify2").append(str);
   	 					$("#classify2").show();
   	 					$("#seach_lv3").val("");
   	 					$("#classify3 li").not(":first").remove(); 
       	 			}else if(level=="3"){
       	 				//如果第三级就一个 直接显示评级结果
       	 				if(x.length==1){
       	 					showGrade(x[0],xx.name,xx.id,pid);
       	 					$("#classify3 li").not(":first").remove(); 
       	 					return;
       	 				}
       	 			    str += '<li id="10000000003" class="ksfjgrade-box clearfix classify-class addtype-input"><input id="zdy3" type="text" maxlength="20" placeholder="自定义评分依据">';
		   	 			str += '<button type="button" name="ksfjgrade" grade="1001" class="btn btn-vin">1级</button>';
		   				str += '<button type="button" name="ksfjgrade" grade="1002" class="btn btn-vin">2级</button>';
		   			    str += '<button type="button" name="ksfjgrade" grade="1003" class="btn btn-vin">3级</button>';
		   		        str += '<button type="button" name="ksfjgrade" grade="1004" class="btn btn-vin">4级</button></li>';
//       	 	            str += '<button type="button" onclick="zdyksfj();" class="btn btn-xs">></button></li>';
       	 	            $("#classify3 li").not(":first").remove(); 
	 					$("#classify3").append(str);
       	 				$("#classify2").css("border-right","none");
       	 				$("#classify3").show();
       	 			}
       	 		
       	 		
       	 	if(level=="1"){
       	 		initZdy1();
       	 		initZdy2();
       	 		initZdy3();	
	 		}else if(level=="2"){
	 			initZdy2();
	 			initZdy3();
	 		}else{
	 			initZdy3();
	 		}
       	 		
       	 		
       	 	//如果不显示演示功能  就 调用 隐藏 
       	 	if(!showDemo){
       	 		hideDemoMenu();
       	 				
       	 	}else{
       	 		hideUnDemoMenu();
       	 		initIcd();
       	 	}
        		}
        	}
        },
        error: function(){
        }
    });

}

//自定义快速分级确认键
function zdyksfj(){
	//初始化校验
	$("#10000000001").find("input[type='text']").css("border-color","");
	$("#10000000002").find("input[type='text']").css("border-color","");
	$("#10000000003").find("input[type='text']").css("border-color","");
	
	var one = "";
	var two = "";
	var three = "";
	var allcheck = false;
	
	toastr.clear();
	
	if($("#level_1_name").val()!=""){
		one = $("#level_1_name").val();
	}else if($("#10000000001").find("input[type='text']").val().trim()!=""){
		one = $("#10000000001").find("input[type='text']").val();
	}else{
		$("#10000000001").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入快速分级的自定义内容！")
		allcheck = true;
	}
	
	if($("#level_2_name").val()!=""){
		two = $("#level_2_name").val();
	}else if($("#10000000002").find("input[type='text']").val().trim()!=""){
		two = $("#10000000002").find("input[type='text']").val();
	}else{
		$("#10000000002").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入主诉的自定义内容！")
		allcheck = true;
	}
	
	var confirm = false;
	if($("#10000000003").find("input[type='text']").val().trim()==""){
		$("#10000000003").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入评分依据内容！");
		allcheck = true;
	}
	if($("#10000000003").find("[name='ksfjgrade'][class*=selected]").length==0){
		$("#10000000003").find("[name='ksfjgrade']").css("border-color","red");
		toastr.warning("请选择自定义级别！");
		allcheck = true;
	}
	if(allcheck){
		return;
	}
	var zdyksfjgrade=$("#10000000003").find("[name='ksfjgrade'][class*=selected]").attr("grade");
	
	var zdyksfjgradename = zdyksfjgrade.substring(3,4)+"级";
	
	three = $("#10000000003").find("input[type='text']").val();
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\"  name='quickitem' grade=\""+zdyksfjgrade+"\" onclick=\"clearQuick(this)\" parentid='' zdyid='10000000003'>×</button><span>";
	
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
}



//function getSymptom(pid,level){
//	/*$("#"+pid+"").addClass("activecc").siblings().removeClass("activecc");
//	var level_name = $("#"+pid).find("a").html();
//	$.ajax({
//        type: "post",
//        url: "#path()/divid/getSymptom",
//        data:{
//       	 pid:pid,
//       	 level:level
//        },
//        dataType: "json",
//        async:true,
//        success: function(result){
//        	if(result!=null){
//        		//console.log(result);
//        		if(result.status==200){
//        			
//        			var str = "";
//       	 			var list = result.rows;
//       	 			if(level=="1"){
//       	 				str += '<a  onclick="tiaozhuanfenji();" style="cursor:pointer;color:#000;">完整评级>></a>';
//       	 				str += '<li style="margin-bottom:5px;color:#fff;text-align:center;">快速分级></li>';
//       	 			}else if (level=="2"){
//       	 				str += '<li>主诉></li>';
//       	 				$("#level_1_name").val(level_name);
//       	 			}else if (level=="3"){
//       	 				str += '<li>评分依据></li>';
//       	 				$("#level_2_id").val(pid);
//       	 				$("#level_2_name").val(level_name);
//       	 			}
//       	 			
//       	 			for(var i in list){
//       	 				var name = list[i]["name"].trim();
//       	 				var id = list[i]["id"];
//       	 				var grade = list[i]["grade"];
//       	 				if(level=="1"){
//       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,2);"><a>' +name+'</a></li>';
//       	 				}else if (level=="2"){
//       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,3);"><a>' +name+'</a></li>';
//       	 				}else if(level=="3"){
//	       	 				str+="<li id="+id+" class='btn-"+grade +"-selected' onclick='showSymptom1(this,\""+id+"\",\"" + name + "\","+level+",\""+grade+"\","+pid+")'><a style='color:#000 !important'>" +name+"</a></li>"
//       	 				}
//       	 			}
//       	 			if(level=="1"){
//       	 				$("#classify1").html("");
//       	 				$("#classify1").html(str);
//       	 			}else if(level=="2"){
//       	 				$("#classify2").html("");
//   	 					$("#classify2").html(str);
//   	 					$("#classify2").css({
//   	 						"height":"500px",
//   	 						"padding":"35px 15px 15px 0"
//   	 					})   	 					
//   	 					$("#classify2").show();
//       	 			}else if(level=="3"){
//       	 				$("#classify3").html("");
//       	 				$("#classify3").html(str);
//	       	 			$("#classify3").css({
//   	 						"height":"500px",
//   	 						"padding":"35px 15px 15px 0"
//   	 					})
//   	 					$("#classify2").css("border-right","none");
//       	 				$("#classify3").show();
//       	 			}
//        		}
//        	}
//        },
//        error: function(){
//        }
//    });
//*/
//	$("#"+pid+"").addClass("activecc").siblings().removeClass("activecc");
//	var level_name = $("#"+pid).find("a").html();
//	var keywords = "";
//	if(level=="1"){
//		keywords = $("#seach_lv1").val();
//	}else if (level=="2"){
//		$("#level_1_id").val(pid);
//		keywords = $("#seach_lv2").val();
//	}else if (level=="3"){
//		$("#level_2_id").val(pid);
//		keywords = $("#seach_lv3").val();
//	}
//	$.ajax({
//        type: "post",
//        url: "#path()/divid/getSymptom",
//        data:{
//       	 pid:pid,
//       	 level:level,
//       	 keywords:keywords
//        },
//        dataType: "json",
//        async:true,
//        success: function(result){
//        	if(result!=null){
//        		//console.log(result);
//        		if(result.status==200){
//        			$("#wzqj").show();       			
//        			var str = "";
////        			var quick='<a  onclick="tiaozhuanfenji();" style="cursor:pointer;color:#000;">完整评级>></a>';
//       	 			var list = result.rows;
//       	 			if(level=="1"){
//       	 				
////       	 				$("#classify1").html(quick+$("#classify1").html());
////       	 				if($("#classify1").html().indexOf("完整评级") == -1){
////       	 				str += quick;
////       	 				}
//       	 				
//       	 			}else if (level=="2"){
//       	 				$("#level_1_name").val(level_name);
//       	 			}else if (level=="3"){
//       	 				$("#level_2_name").val(level_name);
//       	 			}
//       	 			//计算下一等级是否只有一个
//       	 			var x = Array();
//       	 			var xx;
//       	 		
//       	 			for(var i in list){
//       	 				var name = list[i]["name"].trim();
//       	 				var id = list[i]["id"];
//       	 				var grade = list[i]["grade"];
//       	 				
//       	 				if(level=="1"){
//       	 				
//       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,2);"><a>' +name+'</a></li>';
//       	 				}else if (level=="2"){
//       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,3);"><a>' +name+'</a></li>';
//       	 				}else if(level=="3"){
//       	 					str += '<li id="'+id+'"  class="btn-'+grade +'-selected"   onclick="showSymptom1(this,&quot;'+id+'&quot;,&quot;' + name + '&quot;,&quot;'+level+'&quot;,&quot;'+grade+'&quot;,&quot;'+pid+'&quot;)"><a style="color:#000 !important">' +name+'</a></li>';
//       	 																			
//       	 					if(x.indexOf(grade)==-1){
//	 							x.push(grade);
//	 							xx = list[i];
//	 						}	
//       	 				}
//       	 			}
//       	 			if(level=="1"){
////       	 				str += '<li id="10000000001" class="addtype-input"><input type="text" maxlength="20" placeholder="自定义分类"></li>';
//       	 				$("#classify1 li").not(":first").remove(); 
//       	 				
//       	 				$("#classify1").append(str);
//       	 				$("#seach_lv2").val("");
//       	 				$("#seach_lv3").val("");
//       	 			}else if(level=="2"){
////       	 			    str += '<li id="10000000002" class="addtype-input"><input type="text" maxlength="20" placeholder="自定义主诉"></li>';
//       	 				$("#classify2 li").not(":first").remove(); 
//   	 					$("#classify2").append(str);
//   	 					$("#classify2").show();
//   	 					$("#seach_lv3").val("");
//       	 			}else if(level=="3"){
//       	 				//如果第三级就一个 直接显示评级结果
//       	 				if(x.length==1){
//       	 					showGrade(x[0],xx.name,xx.id,pid);
//       	 					return;
//       	 				}
//       	 			   /* str += '<li id="10000000003" class="ksfjgrade-box clearfix"><input type="text" maxlength="20" placeholder="自定义评分依据">';
//		   	 			str += '<button type="button" name="ksfjgrade" grade="1001" class="btn btn-xs">一级</button>';
//		   				str += '<button type="button" name="ksfjgrade" grade="1002" class="btn btn-xs">二级</button>';
//		   			    str += '<button type="button" name="ksfjgrade" grade="1003" class="btn btn-xs">三级</button>';
//		   		        str += '<button type="button" name="ksfjgrade" grade="1004" class="btn btn-xs">四级</button>';
//       	 	            str += '<button type="button" onclick="zdyksfj();" class="btn btn-xs">></button></li>';*/
//       	 	            $("#classify3 li").not(":first").remove(); 
//	 					$("#classify3").append(str);
//       	 				$("#classify2").css("border-right","none");
//       	 				$("#classify3").show();
//       	 			}
//       	 		//快速分级 查询
//       	 		$("#seach_lv1,#seach_lv2,#seach_lv3").bind("input propertychange", function(){  
//       	 			var id = $(this).attr("id");
//       	 			if(id=="seach_lv1"){
//       	 				getSymptom(0,1);
//       	 			}else if(id=="seach_lv2"){
//       	 				getSymptom($("#level_1_id").val(),2);
//       	 			}else if(id=="seach_lv3"){
//       	 				getSymptom($("#level_2_id").val(),3);
//       	 			}
//       	 		});
//        		}
//        	}
//        },
//        error: function(){
//        }
//    });
//}