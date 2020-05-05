
var q  = "";//保存是否启动快速分级
var fgf='\n------------------------------------------------------------';//分隔符
$(document).ready(function() {
	
	var gradeset = '#(gradeset ??)';
	if(gradeset!="" && gradeset=="5"){
		$("#lookfive").prop("checked",true);
		$("#aafive").css("display", "");
	}else{
		$("#lookfour").prop("checked",true);
		$("#aafive").css("display", "none");
	}
	
	$('#lookfour').change(function() {
		if ($(this).is(":checked")) {
			$("#aafive").css("display", "none");
		} else {
			$("#aafive").css("display", "");
		}
		pjbsetconfirm();//改动就 及时保存
	});
	$('#lookfive').change(function() {
		if ($(this).is(":checked")) {
			$("#aafive").css("display", "");
		} else {
			$("#aafive").css("display", "none");
		}
		pjbsetconfirm();//改动就 及时保存
	});
	
	$('.grade-color-set').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'light',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('background-color','#'+hex);
		},
		onHide:function(){
			pjbsetconfirm();//改动就 及时保存
		}
	}).keyup(function(){

		$(this).colpickSetColor(this.value);

	});
	

$("#gradename1,#gradename2,#gradename3,#gradename4,#gradename5").bind("input propertychange", function(){  
		pjbsetconfirm();//改动就 及时保存
	});
	

$("#gradeovertime1,#gradeovertime2,#gradeovertime3,#gradeovertime4,#gradeovertime5").bind("input propertychange", 

function(){  
		pjbsetconfirm();//改动就 及时保存
	});
	
	queryRole();
	var rolename = '#(rolename ??)';
	
	$("#showtiaoji").html(rolename);
	
	var pjblist = '#(pjblist ??)';
	if(pjblist.length>0){
		pjblist =$.parseJSON(pjblist);
	}
	
	var pjblist4 = '#(pjblist4 ??)';
	if(pjblist4.length>0){
		pjblist4 =$.parseJSON(pjblist4);
	}

	for(var j=0;j<pjblist.length;j++){
		$("#showfenji").append("<span style='margin-right: 10px;' id='"+pjblist[j].tyid+"'>"+pjblist[j].tyname+"</span>");
	}
	var print_use='';
	var receive = '';
	var quick='';
	/*for(var j=0;j<pjblist.length;j++){
		if(pjblist[j].righttype==2){
			$("#showotherfenji").append("<span style='margin-right: 10px;' id='"+pjblist[j].tyid+"'>"+pjblist[j].tyname+"</span>");
		}
		if(pjblist[j].righttype==5){
			print_use =pjblist[j].tyname;
			$("#print").append("<input id='switch5' name='status' type='checkbox' data-size='small' value='"+pjblist[j].tyid+"'>");
		}
		if(pjblist[j].righttype==6){
			receive =pjblist[j].tyname;
			$("#receive").append("<input id='switch6' name='status' type='checkbox' data-size='small' value='"+pjblist[j].tyid+"'>");
		}
		if(pjblist[j].righttype==7){
			receive =pjblist[j].tyname;
			$("#quick").append("<input id='switch7' name='status' type='checkbox' data-size='small' value='"+pjblist[j].tyid+"'>");
		}
	}*/
	for(var j=0;j<pjblist4.length;j++){
		
		if(pjblist4[j].tyid==420){
			print_use =pjblist4[j].tyname;
			$("#print").append("<input id='switch5' name='status' type='checkbox' data-size='small' value='"+pjblist4[j].tyid+"'>");
		}
		if(pjblist4[j].tyid==421){
			receive =pjblist4[j].tyname;
			$("#receive").append("<input id='switch6' name='status' type='checkbox' data-size='small' value='"+pjblist4[j].tyid+"'>");
		}
		if(pjblist4[j].tyid==422){
			quick =pjblist4[j].tyname;
			$("#quick").append("<input id='switch7' name='status' type='checkbox' data-size='small' value='"+pjblist4[j].tyid+"'>");
		}
	}
	$(function(){
 /* 初始化控件 */

		 $("#switch5").bootstrapSwitch({ 
			 onText : "使用中", // 设置ON文本  
			 offText : "已关闭", // 设置OFF文本  
			 onColor : "success",// 设置ON文本颜色     (info/success/warning/danger/primary)  
			 offColor : "danger", // 设置OFF文本颜色        (info/success/warning/danger/primary)  
			 size : "small", // 设置控件大小,从小到大  (mini/small/normal/large)  
			 handleWidth:"45",//设置控件宽度
		// 当开关状态改变时触发  
		onSwitchChange : function(event, state) { 
			var ProductId = event.target.defaultValue;
		if (state == true) {
		//上线
		updateProductStatus(ProductId,'使用中');
		} else {
		//下线
		updateProductStatus(ProductId,'已关闭');
		} 
} 
}); 
			$("#switch6").bootstrapSwitch({ 
				onText : "使用中",// 设置ON文本  
				offText : "已关闭", // 设置OFF文本 
				onColor : "success",// 设置ON文本颜色     (info/success/warning/danger/primary)  
				offColor : "danger", // 设置OFF文本颜色        (info/success/warning/danger/primary)  
				size : "small", // 设置控件大小,从小到大  (mini/small/normal/large)  
				handleWidth:"45",//设置控件宽度
				// 当开关状态改变时触发  
				onSwitchChange : function(event, state) { 
					var ProductId2 = event.target.defaultValue;
					if (state == true) {
						//上线
						updateProductStatus(ProductId2,'使用中');
					} else {
						//下线
						updateProductStatus(ProductId2,'已关闭');
					}
				}
			}); 
			$("#switch7").bootstrapSwitch({ 
				 onText : "使用中", // 设置ON文本  
				 offText : "已关闭", // 设置OFF文本  
				 onColor : "success",// 设置ON文本颜色     (info/success/warning/danger/primary)  
				 offColor : "danger",// 设置OFF文本颜色        (info/success/warning/danger/primary)  
				 size : "small", // 设置控件大小,从小到大  (mini/small/normal/large)  
				 handleWidth:"45",//设置控件宽度
				 // 当开关状态改变时触发  
				 onSwitchChange : function(event, state) { 
					 var ProductId3 = event.target.defaultValue;
				 if (state == true) {
				//上线
				updateProductStatus(ProductId3,'使用中');
				} else {
				//下线
				 updateProductStatus(ProductId3,'已关闭');
				}
				}
			 });
		});
	
	if(print_use=='使用中'){
		$("#switch5").click();
	}
	if(receive=='使用中'){
		$("#switch6").click();
	}	
	if(quick=='使用中'){
		$("#switch7").click();
	}
	q = quick;
});

function updateProductStatus(id,state){
	$.ajax({
	     type: "post",
	     url: "#path()/systemmgmt/updateProductStatus",
	     dataType: "json",
	     data:{
	    	 id:id,
	    	 state:state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ,
	     },
	     success: function(result){
//	    	 $(".tips").each(function(){
//	    		 $(this).empty();
//	    	 });
	    	 //如果是快速分级 保存下当前的状态 决定是否显示 快速分级的必填项
	    	 if(id=='422'){
	    		 q= state;
	    	 }
	    	 toastr.warning(result.message);
	    	 
	     },
	     error: function(){
	    	 return false;
	     }
	 }); 
}


//加载权限列表
function queryRole(){
	$.ajax({
	    type: "post",
	    url: "#path()/rolemgmt/queryRole",
	    dataType: "json",
	    data:{
	    },
	    success: function(result){
	   	 if(result.status=="200"){
	   		//var dataArry = [{id: 3, child: 1}, {id: 6, child: 3}, {id: 3, child: 2}, {id: 5, child: 4}, {id: 6, child: 5}];
	   		var row1 = [];
	   		var row2 = [];
	   		var row3 = [];
	   		for(var k=0;k<result.rows.length;k++){
   				var row = {};
		   		row.name = result.rows[k].rolename;
		   		row.code = result.rows[k].roleid;
		   		row.fztj = result.rows[k].fztj;
		   		
		   		var description = result.rows[k].description;
		   		if(result.rows[k].parentid=="1"){
		   			row.icon = "icon-th";
		   		}else{
		   			row.icon = "icon-minus-sign";
		   		}
		   		row.parentCode = result.rows[k].parentid;
		   		row.child = [];
		   		if(description=="1") row1.push(row);
		   		if(description=="2") row2.push(row);
		   		if(description=="3") row3.push(row);
	   		}
	   		
	   		function sortNumber(a, b) {
	   		     	return a - b ;
	   		}
	   		
	   		var flagArr1 = [];//记录数组中已经是别人儿子的元素的小标，因为只可能是一个元素的儿子，所有不用担心重复，除非数据本身有问题
	   		//双层遍历对比所有的元素，看看一个元素是否是别人的儿子
	   		for (var i = 0; i < row1.length; i++) {
		   		for (var j = i; j < row1.length; j++) {
			   		if (row1[i].code == row1[j].parentCode) {
				   		row1[i].child.push(row1[j]);
				   		flagArr1.push(j);
			   		}
		   		    if (row1[j].code == row1[i].parentCode) {
				   		row1[j].child.push(row1[i]);
				   		flagArr1.push(i);//记录下已经成为别人儿子的元素
		   		    }
		   		}
	   		};
	   		//将数组排序
	   		flagArr1=flagArr1.sort(sortNumber);
	   		//将这些已经变成别人儿子的元素从数组中删除，剩下的便是树
	   		for(var i=flagArr1.length-1;i>=0;i--){
	   			flagArr1[i];
		   		row1.splice(flagArr1[i],1);
	   		}
	   		
	   		var flagArr2 = [];//记录数组中已经是别人儿子的元素的小标，因为只可能是一个元素的儿子，所有不用担心重复，除非数据本身有问题
	   		//双层遍历对比所有的元素，看看一个元素是否是别人的儿子
	   		for (var i = 0; i < row2.length; i++) {
		   		for (var j = i; j < row2.length; j++) {
			   		if (row2[i].code == row2[j].parentCode) {
			   			row2[i].child.push(row2[j]);
				   		flagArr2.push(j);
			   		}
		   		    if (row2[j].code == row2[i].parentCode) {
		   		    	row2[j].child.push(row2[i]);
				   		flagArr2.push(i);//记录下已经成为别人儿子的元素
		   		    }
		   		}
	   		};
	   		//将数组排序
	   		flagArr2=flagArr2.sort(sortNumber);
	   		//将这些已经变成别人儿子的元素从数组中删除，剩下的便是树
	   		for(var i=flagArr2.length-1;i>=0;i--){
	   			flagArr2[i];
		   		row2.splice(flagArr2[i],1);
	   		}
	   		
	   		var flagArr3 = [];//记录数组中已经是别人儿子的元素的小标，因为只可能是一个元素的儿子，所有不用担心重复，除非数据本身有问题
	   		//双层遍历对比所有的元素，看看一个元素是否是别人的儿子
	   		for (var i = 0; i < row3.length; i++) {
		   		for (var j = i; j < row3.length; j++) {
			   		if (row3[i].code == row3[j].parentCode) {
			   			row3[i].child.push(row3[j]);
				   		flagArr3.push(j);
			   		}
		   		    if (row3[j].code == row3[i].parentCode) {
		   		    	row3[j].child.push(row3[i]);
				   		flagArr3.push(i);//记录下已经成为别人儿子的元素
		   		    }
		   		}
	   		};
	   		//将数组排序
	   		flagArr3=flagArr3.sort(sortNumber);
	   		//将这些已经变成别人儿子的元素从数组中删除，剩下的便是树
	   		for(var i=flagArr3.length-1;i>=0;i--){
	   			flagArr3[i];
		   		row3.splice(flagArr3[i],1);
	   		}
	   		departtree(row1,1);
	   		departtree(row2,2);
	   		departtree(row3,3);
	   	 }else{
	   		toastr.warning(result.message);
	   	 }
	    },
	    error: function(){
	   	 return false;
	    }
	});
}

//填充树
function departtree(data,id) {
	
	for (var i = 0; i < data.length; i++) {
		var fztj = data[i].fztj;
		if (data[i].icon == "icon-th") {
			
			var str = "";
			str += "<li data-name='"+ data[i].code + "'>";
			if(fztj=="1"){
				str += "<span name='clickcolor' class='fztj-active'>";
			}else{
				str += "<span name='clickcolor'>";
			}
			str += "<a href='javascript:void(0);' onclick='aa(this);' style='text-decoration:none'><i class='"
									+ data[i].icon + "'></i>" + data[i].name + "</a></span></li>";
			$("#rootUL"+id) .append(str);
		} else {
			var children = $("li[data-name='" + data[i].parentCode + "']")
					.children("ul");
			if (children.length == 0) {
				$("li[data-name='" + data[i].parentCode + "']").append(
						"<ul></ul>");
			}
			var str2 = "";
			str2 += "<li data-name='" + data[i].code + "'>" + "<span name='clickcolor'";
			if(fztj=="1"){
				str2 += " class='fztj-active'";
			}
			str2 += "><a href='javascript:void(0);' onclick='aa(this);' style='text-decoration:none'>"
							+ "<i class='" + data[i].icon + "'></i> "
							+ data[i].name + "</span></a>" + "</li>";
			$("li[data-name='" + data[i].parentCode + "'] > ul").append(str2);
		}
		for (var j = 0; j < data[i].child.length; j++) {
			
			var child = data[i].child[j];
			var  childfztj = child.fztj;
			var children = $("li[data-name='" + child.parentCode + "']")
					.children("ul");
			if (children.length == 0) {
				$("li[data-name='" + child.parentCode + "']").append(
						"<ul></ul>");
			}
			var str3 = "";
			str3 += "<li data-name='" + child.code + "'>" ;
			str3 += "<span name='clickcolor'" ;
			if(childfztj=="1"){
				str3 += " class='fztj-active'";
			}
			
			str3 += "><a href='javascript:void(0);' onclick='aa(this);' style='text-decoration:none'>"
				+ "<i class='" + child.icon + "'></i> "
				+ child.name + "</a></span>" + "</li>" ;
			$("li[data-name='" + child.parentCode + "'] > ul").append(str3);
			var child2 = data[i].child[j].child;
			departtree(child2,id);
		}
		departtree(data[i],id);
	}

}

function aa(th){
	if($(th).parent().hasClass("fztj-active")){
		$(th).parent().removeClass("fztj-active");
	}else{
		$(th).parent().addClass("fztj-active");
	}
	//var code = $(th).parent().parent("li").attr("data-name");
}

//修改调级权限
function tiaojiconfirm(){
	var roleids = "";
	var rolenames = "";
	$("span[class='fztj-active']").each(function(){
	    var roleid = $(this).parent().attr("data-name");
	    var rolename= $(this).find("a").text();
	    rolenames += rolename + " ";
	    roleids += roleid +",";
	  });
	if(roleids.length>0) {
		roleids = roleids.substring(0,roleids.length-1);
	}
	if(rolenames.length>0) {
		rolenames =rolenames.substring(0, rolenames.length-1);
	}
	$.ajax({
		type : "post",
		url : "#path()/systemmgmt/savefztjRoleids",
		data : {
			roleids:roleids,
			system:'分诊',
		},
		dataType : "json",
		success : function(result) {
			if(result.status=="200"){
				$("#showtiaoji").html(rolenames);
				toastr.warning("保存成功");
			}else{
				toastr.warning(result.message);
			}
		},
		error : function() {
		}
	});
}


$('#pjb').click(function() {
	$.ajax({
	type : "post",
	url : "#path()/yjfzpjb/queryPjbList",
	data : {
		system:'分诊'
	},
	dataType : "json",
	success : function(result) {
		if(result.status=="200"){
			$("#showpjb").empty();
			var str = "";
			for (var i = 0; i < result.rows.length; i++) {
				str +="<tr id=tr"+i+" style='height: 45px;'>";
				str +="<td><input type='checkbox' name='pjbchoose'  value=";
				str += result.rows[i].ty_id ;
				str +=" style='vertical-align:middle;margin-bottom:7px;width:16px;height:16px;margin-right:10px;'" ;
				if(result.rows[i].status=="1"){
					str += " checked ";
				}
				str +=	"></td>";
				str +="<td>"+result.rows[i].ty_name+"</td>";
				str +="<td><input type='text' name='sort' placehoder='排序' value="+result.rows[i].sort+"></td>";
				str +="</tr>";
			}
			$("#showpjb").append(str);
		}else{
			toastr.warning(result.message);
		}
	},
	error : function() {
	}
});
	
	
});



$('#col').click(function() {
	$.ajax({
	type : "post",
	url : "#path()/yjfzpjb/queryColList",
	data : {
	},
	dataType : "json",
	success : function(result) {
		if(result.status=="200"){
			$("#showcols").empty();
			var str = "";
			str +="<tr  style='height: 25px;'>";
			str +="<th>内容</th>";
			str +="<th>必填</th>";
			str +="<th>选填其一（注：输入相同数字即可成为一组）</th>";
			str +="</tr>";
			for (var i = 0; i < result.rows.length; i++) {
			    var name = result.rows[i].name;
			    var necessary = result.rows[i].necessary;
			    //如果是快速分级就判断下 是否启用 ，如果没启用 就不现实 并 不是必填项
			    if((name=='快速分级')&&(q=='已关闭')){
			    	str +="<tr id=tr"+i+" style='height: 25px;display:none'>";
			    	necessary = 0;
			    }else{
			    	str +="<tr id=tr"+i+" style='height: 25px;'>";
			    }
				
				str +="<td width='50%'>"+name+"</td>";
				str +="<td width='20%'><input type='checkbox' name='necessary'  value=";
				str += result.rows[i].id ;
				str +=" style='vertical-align:middle;margin-bottom:7px;width:16px;height:16px;margin-right:10px;'" ;
				if(necessary=="1"){
					str += " checked ";
				}
				str +=	"></td>";
				str +="<td width='30%'><input type='text' name='group' style='width:50px' placehoder='分组' value="+result.rows[i].group+"></td>";
				str +="</tr>";
			}
			$("#showcols").append(str);
		}else{
			toastr.warning(result.message);
		}
	},
	error : function() {
	}
});

});	



function colconfirm(){
	var collist = [];
	var flag= false;
	$("input[name='necessary']").each(function(){
		var group = $(this).parent().next().find("input").val();
		var reg = /^[0-9]+.?[0-9]*$/; 
		if(group.length>0){
			if(!reg.test(group)){
				flag = true;
			}	
		}
		var necessary = '0';
		if($(this).is(':checked')) {
			necessary = '1';
		}
		var col = {};
		col.id = $(this).val();
		col.group = group;
		col.necessary = necessary;
		collist.push(col);
	});
	if(flag){
		alert("分组请输入整数");
		return;
	}
	var collist2 = JSON.stringify(collist);
	$.ajax({
		type : "post",
		url : "#path()/yjfzpjb/setColList",
		data : {
			collist:collist2,
		},
		dataType : "json",
		success : function(result) {
			if(result.status=="200"){
				toastr.warning("设置成功");
			}else{
				toastr.warning(result.message);
			}
		},
		error : function() {
		}
	});	
}



function fenjiconfirm(){
	var fenjilist = [];
	$("#showotherfenji").empty();
	var flag= false;
	$("input[name='pjbchoose']:checked").each(function(){
		var sort = $(this).parent().next().next().find("input").val();
		var reg = /^[0-9]+.?[0-9]*$/; 
		if(!reg.test(sort)){
			flag = true;
		}
		var fenji = {};
		fenji.id = $(this).val();
		fenji.sort = sort;
		
		fenjilist.push(fenji);
	});
	if(flag){
		alert("排序请输入整数");
		return;
	}
	
	var fenjilist2 = JSON.stringify(fenjilist);
	$.ajax({
		type : "post",
		url : "#path()/yjfzpjb/setPjbList",
		data : {
			fenjilist:fenjilist2,
			system:'分诊',
		},
		dataType : "json",
		success : function(result) {
			if(result.status=="200"){
				$("#showfenji").html("");
				$("input[name='pjbchoose']:checked").each(function(){
					$("#showfenji").append("<span style='margin-right: 10px;' id='"+$(this).val()+"'>"+$(this).parent().next().text()+"</span>");
				});
			}else{
				toastr.warning(result.message);
			}
		},
		error : function() {
		}
	});	
}







function pjbsetconfirm(){
	var grade = $("input[name='setgrade']:checked").val();
	var arr = new Array();
	var paixu1 = $("#paixu1").attr("name");
	var gradename1 = $("#gradename1").val();
	if(feiknum("排序1名称","illegal6",gradename1,

$("#paixu1").parents(".clearfix").next())){return;};
	arr.push(gradename1);
	var gradecolor1 = $("#gradecolor1").css("background-color");
	if(gradecolor1!="" && gradecolor1.indexOf("#")<0){
		gradecolor1=colorRGB2Hex(gradecolor1);
	}
	var gradeovertime1 = $("#gradeovertime1").val();
	if(feiknum("排序1待接诊超时预警","number4",gradeovertime1,$("#paixu1").parents(".clearfix").next())){return;};
	var paixu2 = $("#paixu2").attr("name");
	var gradename2 = $("#gradename2").val();
	if(feiknum("排序2名称","illegal6",gradename2,

$("#paixu2").parents(".clearfix").next())){return;};
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
	if(feiknum("排序4名称","illegal6",gradename4,

$("#paixu4").parents(".clearfix").next())){return;};
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
	 if(feiknum("排序5名称","illegal6",gradename5,

$("#paixu5").parents(".clearfix").next())){return;};
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
			},
			dataType : "json",
			success : function(result) {
				if(result.status=="200"){
					toastr.warning("保存成功");
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
 
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + 

b).toString(16).slice(1);
    return hex;
}

$('#help').click(function() {
	$.ajax({
	type : "post",
	url : "#path()/systemmgmt/queryVersionList",
	data : {
		m_id:0
	},
	dataType : "json",
	success : function(result) {
		if(result.status=="200"){
			$("#version").val('');
			$("#update").val('');
			$("#state").prop('checked','checked');
			var version ='';
			for (var i = 0; i < result.rows.length; i++) {
			    var state = result.rows[i].state;
			    var content = result.rows[i].content;
			    if(state =="0"){
			    	version = version +content+fgf;
			    }else{
			    	if(state =="1"){
			    		$("#state").prop('checked','checked');
			    	}else{
			    		$("#state").prop('checked','');
			    	}
			    	$("#update").val(content)
			    }
			}
			$("#version").val(version);
//			$("#showcols").append(str);
		}else{
			toastr.warning(result.message);
		}
	},
	error : function() {
	}
});

});	
function saveHelp(){
	var version = $("#version").val();
	var update = $("#update").val();
	var check =  $("#state").prop('checked');
	var pre =  $("#pre").prop('checked');
	var m_id='0';
	if(pre==true){
		m_id='3';
	}
	$.ajax({
	     type: "post",
	     url: "#path()/systemmgmt/saveHelp",
	     dataType: "json",
	     data:{
	    	 version:version,
	    	 update:update ,
	    	 check:check,
	    	 m_id:m_id
	     },
	     success: function(result){
	    	 toastr.warning("保存成功");
	    	 
	     },
	     error: function(){
	    	 return false;
	     }
	 });
}

function add(){
	var version = $("#version").val();
	$("#version").val(fgf+'\n'+version);
//	alert(version);
}
function addupdate(){
	var update = $("#update").val().replace(/\s*/g,"");
	console.log(update.length);
	if(update==''){
		$("#update").val('版本：\n发布日期：'+getNowFormatDate()+'\n功能更新：\n');
	}
	
}
//当前日期yyyy-mm-dd
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}