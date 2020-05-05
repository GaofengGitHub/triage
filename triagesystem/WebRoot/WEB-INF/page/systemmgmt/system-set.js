$(document).ready(function() {
	var gradeset = '#(gradeset ??)';
	if(gradeset!="" && gradeset=="5"){
		$("#lookfive").prop("checked",true);
		$("#aafive").css("display", "");
	}else{
		$("#lookfour").prop("checked",true);
		$("#aafive").css("display", "none");
	}
	var pjblist = $.parseJSON('#(pjblist ??)');
	for(var i=0;i<pjblist.length;i++){
		if(pjblist[i].righttype==1){
			$("#mainfenji").val(pjblist[i].tyid);
	    	$("#mainfenji").text(pjblist[i].tyname);
        }
	}
	for(var j=0;j<pjblist.length;j++){
		if(pjblist[j].righttype!=1){
			$("#showotherfenji").append("<span style='margin-right: 10px;' id='"+pjblist[j].tyid+"'>"+pjblist[j].tyname+"</span>");
		}
	}

});    

	$('.grade-color-set').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'light',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('background-color','#'+hex);
		}
	}).keyup(function(){

		$(this).colpickSetColor(this.value);

	});;

	

	$('#lookfour').change(function() {
		if ($(this).is(":checked")) {
			$("#aafive").css("display", "none");
		} else {
			$("#aafive").css("display", "");
		}
	});
	$('#lookfive').change(function() {
		if ($(this).is(":checked")) {
			$("#aafive").css("display", "");
		} else {
			$("#aafive").css("display", "none");
		}
	});
	$('#otherfenji').click(function() {
						$.ajax({
						type : "post",
						url : "#path()/yjfzpjb/queryPJB",
						data : {},
						dataType : "json",
						success : function(result) {
							if(result.status=="200"){
								$("#showedts2").empty();
								$("#showedts").empty();
								var a = 0;
								for (var i = 0; i < 4; i++) {
									$("#showedts2").append( "<tr id=tr"+i+" style='height: 50px;'>");
									for (var j = 0; j < 5; j++) {
										if(a<result.rows.length){
											if(result.rows[a].pjbid!=$("#mainfenji").val()){
												if($("#"+result.rows[a].pjbid).text()!=""){
													$("#tr"+i).append("<td>"+result.rows[a].name+"</td><td><input type='checkbox' name='otherfenjichoose' checked value="+
														    result.rows[a].pjbid+" style='vertical-align:middle;margin-bottom:7px;width:16px;height:16px;margin-right:10px;'></td>");
												}else{
													$("#tr"+i).append("<td>"+result.rows[a].name+"</td><td><input type='checkbox' name='otherfenjichoose' value="+
														    result.rows[a].pjbid+" style='vertical-align:middle;margin-bottom:7px;width:16px;height:16px;margin-right:10px;'></td>");
												}
											}
											a++;
										}
									}
									$("#showedts2").append("</tr>");
								}
							}else{
								toastr.warning(result.message);
							}
						},
						error : function() {
						}
					});
	});
	
	$('#qwer').click(function() {
		$.ajax({
		type : "post",
		url : "#path()/yjfzpjb/queryPJB",
		data : {},
		dataType : "json",
		success : function(result) {
			if(result.status=="200"){
				$("#showedts").empty();
				$("#showedts2").empty();
				var a = 0;
				for (var i = 0; i < 4; i++) {
					$("#showedts").append( "<tr id=tr"+i+" style='height: 50px;'>");
					for (var j = 0; j < 5; j++) {
						if(a<result.rows.length){
							if(result.rows[a].pjbid!=$("#mainfenji").val()){
								$("#tr"+i).append("<td>"+result.rows[a].name+"</td><td><input type='radio' name='mainfenjichoose' value="+
							    result.rows[a].pjbid+" style='vertical-align:middle;margin-bottom:7px;width:16px;height:16px;margin-right:10px;'></td>");
								a++;
							}else{
								$("#tr"+i).append("<td>"+result.rows[a].name+"</td><td><input type='radio' name='mainfenjichoose' value="+
							    result.rows[a].pjbid+" checked style='vertical-align:middle;margin-bottom:7px;width:16px;height:16px;margin-right:10px;'></td>");
								a++;
							}
						}
					}
					$("#showedts").append("</tr>");
				}
			}else{
				toastr.warning(result.message);
			}
		},
		error : function() {
		}
	});
    });
	
    function mainfenjiconfirm(){
    	var mainfenjiid = $("input[name='mainfenjichoose']:checked").val();
    	var mainfenjiname = $("input[name='mainfenjichoose']:checked").parent().prev().text();
    	$("#mainfenji").val(mainfenjiid);
    	$("#mainfenji").text(mainfenjiname);
    	$("#showedts").empty();
    }
    
    function otherfenjiconfirm(){
    	$("#showotherfenji").empty();
    	$("input[name='otherfenjichoose']:checked").each(function(){
    		$("#showotherfenji").append("<span style='margin-right: 10px;' id='"+$(this).val()+"'>"+$(this).parent().prev().text()+"</span>");
    	});
    	$("#showedts2").empty();
    }
    
    function pjbsetconfirm(){
    	var confirm=true;
    	var grade = $("input[name='setgrade']:checked").val();
    	var arr = new Array();
    	var paixu1 = $("#paixu1").attr("name");
    	var gradename1 = $("#gradename1").val();
    	if(feiknum("排序1名称","illegal6",gradename1,$("#paixu1").parents(".clearfix").next())){return;};
    	arr.push(gradename1);
    	var gradecolor1 = $("#gradecolor1").css("background-color");
    	if(gradecolor1!="" && gradecolor1.indexOf("#")<0){
    		gradecolor1=colorRGB2Hex(gradecolor1);
    	}
    	var gradeovertime1 = $("#gradeovertime1").val();
    	if(feiknum("排序1待接诊超时预警","number4",gradeovertime1,$("#paixu1").parents(".clearfix").next())){return;};
    	var paixu2 = $("#paixu2").attr("name");
    	var gradename2 = $("#gradename2").val();
    	if(feiknum("排序2名称","illegal6",gradename2,$("#paixu2").parents(".clearfix").next())){return;};
    	var index = $.inArray(gradename2,arr);
        if(index >= 0){
    	   $(".tips").text("");
    	   $("#paixu2").parents(".clearfix").next().text("排序2名称与其他排序名称重复，请重新修改排序2排序名称");
    	   $("#paixu2").parents(".clearfix").next().css("color","red");
		   return;
        }
    	arr.push(gradename2);
    	var gradecolor2 = $("#gradecolor2").css("background-color");
    	if(gradecolor2!="" && gradecolor2.indexOf("#")<0){
    		gradecolor2=colorRGB2Hex(gradecolor2);
    	}
    	var gradeovertime2 = $("#gradeovertime2").val();
    	if(feiknum("排序2待接诊超时预警","number4",gradeovertime2,$("#paixu2").parents(".clearfix").next())){return;};
    	var paixu3 = $("#paixu3").attr("name");
    	var gradename3 = $("#gradename3").val();
    	if(feiknum("排序3名称","illegal6",gradename3,$("#paixu3").parents(".clearfix").next())){return;};
    	var index = $.inArray(gradename3,arr);
        if(index >= 0){
    	   $(".tips").text("");
    	   $("#paixu3").parents(".clearfix").next().text("排序3名称与其他排序名称重复，请重新修改排序3排序名称");
    	   $("#paixu3").parents(".clearfix").next().css("color","red");
		   return;
        }
    	arr.push(gradename3);
    	var gradecolor3 = $("#gradecolor3").css("background-color");
    	if(gradecolor3!="" && gradecolor3.indexOf("#")<0){
    		gradecolor3=colorRGB2Hex(gradecolor3);
    	}
    	var gradeovertime3 = $("#gradeovertime3").val();
    	if(feiknum("排序3待接诊超时预警","number4",gradeovertime3,$("#paixu3").parents(".clearfix").next())){return;};
    	var paixu4 = $("#paixu4").attr("name");
    	var gradename4 = $("#gradename4").val();
    	if(feiknum("排序4名称","illegal6",gradename4,$("#paixu4").parents(".clearfix").next())){return;};
    	var index = $.inArray(gradename4,arr);
        if(index >= 0){
    	   $(".tips").text("");
    	   $("#paixu4").parents(".clearfix").next().text("排序4名称与其他排序名称重复，请重新修改排序4排序名称");
    	   $("#paixu4").parents(".clearfix").next().css("color","red");
		   return;
        }
    	arr.push(gradename4);
    	var gradecolor4 = $("#gradecolor4").css("background-color");
    	if(gradecolor4!="" && gradecolor4.indexOf("#")<0){
    		gradecolor4=colorRGB2Hex(gradecolor4);
    	}
    	var gradeovertime4 = $("#gradeovertime4").val();
    	if(feiknum("排序4待接诊超时预警","number4",gradeovertime4,$("#paixu4").parents(".clearfix").next())){return;};
    	var paixu5 = $("#paixu5").attr("name");
    	var gradename5="";
    	var gradecolor5="";
    	var gradeovertime5="";
    	if(grade!="4"){
    	 gradename5 = $("#gradename5").val();
    	 if(feiknum("排序5名称","illegal6",gradename5,$("#paixu5").parents(".clearfix").next())){return;};
    	 var index = $.inArray(gradename5,arr);
         if(index >= 0){
     	   $(".tips").text("");
     	   $("#paixu5").parents(".clearfix").next().text("排序5名称与其他排序名称重复，请重新修改排序5排序名称");
     	   $("#paixu5").parents(".clearfix").next().css("color","red");
 		   return;
         }
    	 gradecolor5 = $("#gradecolor5").css("background-color");
    	 if(gradecolor5!="" && gradecolor5.indexOf("#")<0){
    		 gradecolor5=colorRGB2Hex(gradecolor5);
     	 }
    	 gradeovertime5 = $("#gradeovertime5").val();
    	 if(feiknum("排序5待接诊超时预警","number4",gradeovertime5,$("#paixu5").parents(".clearfix").next())){return;};
    	}
    	var mainfenjiid = $("#mainfenji").val();
    	if(feiknum("主要分级方式","notEmpty",mainfenjiid,$("#mainfenji").next())){return;};
    	var warnpatients = $("#warnpatients").val();
    	//if(feiknum("待分诊人数预警点","notEmpty",warnpatients,$("#warnpatients").next())){return;};
    	var lala = $("#showotherfenji").children("span");
    	var otherfenjilist = [];
    	for(var i=0;i<lala.length;i++){
    		var row = lala[i];
    		otherfenji = {};
    		otherfenji.id=$(row).attr("id");
    		otherfenjilist.push(otherfenji);
    	}
		if(lala.length==0){
			$(".tips").text("");
			$("#otherfenjierror").text("其他分级方式不能为空");
			$("#otherfenjierror").css("color","red");
			return;
		}
		$(".tips").text("");
    	var otherfenjilist2 = JSON.stringify(otherfenjilist);
	    	$.ajax({
				type : "post",
				url : "#path()/systemmgmt/pjbsetconfirm",
				data : {
					grade:grade,
					paixu1:paixu1,
					gradename1:gradename1,
					gradecolor1:gradecolor1,
					gradeovertime1:gradeovertime1,
					paixu2:paixu2,
					gradename2:gradename2,
					gradecolor2:gradecolor2,
					gradeovertime2:gradeovertime2,
					paixu3:paixu3,
					gradename3:gradename3,
					gradecolor3:gradecolor3,
					gradeovertime3:gradeovertime3,
					paixu4:paixu4,
					gradename4:gradename4,
					gradecolor4:gradecolor4,
					gradeovertime4:gradeovertime4,
					paixu5:paixu5,
					gradename5:gradename5,
					gradecolor5:gradecolor5,
					gradeovertime5:gradeovertime5,
					mainfenjiid:mainfenjiid,
					warnpatients:warnpatients,
					otherfenjilist:otherfenjilist2
				},
				dataType : "json",
				success : function(result) {
					if(result.status=="200"){
						load('yjfzSetPre');
					}else{
						toastr.warning(result.message);
					}
				},
				error : function() {
				}
			});
    }
    
    //转换颜色块rgb为16进制展示
    function colorRGB2Hex(color) {
	    var rgb = color.split(',');
	    var r = parseInt(rgb[0].split('(')[1]);
	    var g = parseInt(rgb[1]);
	    var b = parseInt(rgb[2].split(')')[0]);
	 
	    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	    return hex;
	}
    
    

    