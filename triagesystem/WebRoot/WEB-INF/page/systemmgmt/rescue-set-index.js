var index = 1;
var fgf='\n------------------------------------------------------------';//分隔符
$(document).ready(function() {
	showalldirection();
	queryRole();
	var rolename = '#(rolename ??)';
	
	$("#showtiaoji").html(rolename);
	var pjblist = $.parseJSON('#(pjblist ??)');

	for(var j=0;j<pjblist.length;j++){
		$("#showfenji").append("<span style='margin-right: 10px;' id='"+pjblist[j].tyid+"'>"+pjblist[j].tyname+"</span>");
	}
	
	
	
});

$('#pjb').click(function() {
	$.ajax({
	type : "post",
	url : "#path()/yjfzpjb/queryPjbList",
	data : {
		system:'抢救'
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

$('#setup').click(function() {
	$.ajax({
	type : "post",
	url : "#path()/systemmgmt/queryVersionList",
	data : {
		m_id:1
	},
	dataType : "json",
	success : function(result) {
		if(result.status=="200"){
			$("#versionNotes").val('');
			$("#updateNotes").val('');
			$("#flag").prop('checked','checked');
			var version ='';
			for (var i = 0; i < result.rows.length; i++) {
			    var state = result.rows[i].state;
			    var content = result.rows[i].content;
			    if(state =="0"){
			    	version = version +content+fgf;
			    }else{
			    	if(state =="1"){
			    		$("#flag").prop('checked','checked');
			    	}else{
			    		$("#flag").prop('checked','');
			    	}
			    	$("#updateNotes").val(content)
			    }
			}
			$("#versionNotes").val(version);
		}else{
			toastr.warning(result.message);
		}
	},
	error : function() {
	}
});
});


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
			system:'抢救',
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


function addRescueSetitem(){
		var i = $(".rescueSet-tc-table01 tbody tr").length+1;
		var strhtml="";
		strhtml+='<tr qxtype="other" name=namedre'+index+'><td>'+i+'、</td><td><input type="text" />';
		strhtml+='</td><td><input type="text" /><a href="javascript:void(0);" onclick="addRescueSetInput(this);"';
		strhtml+='class="add-rescueSet-input">+</a></td><td><label><input type="checkbox" />备注</label>';
		strhtml+='</td><td><label><input type="checkbox" />交接单</label></td><td><label><input type="checkbox" />选择病区</label>';
		strhtml+='</td><td><a href="javascript:void(0);" onclick="delRescueSetTr(this);" class="del-rescueSet-tr">-</a></td></tr>';
		$(".rescueSet-tc-table01 tbody").append(strhtml);
		index++;
}
function addRescueSetInput(th){
	var name = $(th).parents("tr").eq(0).attr("name");
	var strhtml="";
	strhtml+='<tr qxtype="other" name='+name+'><td></td><td></td><td><input type="text" />';
	strhtml+='<a href="javascript:void(0);" onclick="addRescueSetInput(this);" ';
	strhtml+='class="add-rescueSet-input">+</a></td><td><label><input type="checkbox" />备注</label></td>';
	strhtml+='<td><label><input type="checkbox" />交接单</label></td><td><label>';
	strhtml+='<input type="checkbox" />选择病区</label></td><td><a href="javascript:void(0);"';
	strhtml+='onclick="delRescueSetTr(this);" class="del-rescueSet-tr">-</a></td></tr>';
	$(th).parents("tr").after(strhtml);
}
function delRescueSetTr(e){
	if($(e).parents("tr").eq(0).find("td").eq(0).text()!=""){
		$(e).parents("tbody").eq(0).find("[name='"+$(e).parents("tr").eq(0).attr("name")+"']").remove();
	}else{
		$(e).parents("tr").eq(0).remove();
	}
}

function add(){
	var version = $("#versionNotes").val();
	$("#versionNotes").val(fgf+'\n'+version);
//	alert(version);
}

function addupdate(){
	var update = $("#updateNotes").val().replace(/\s*/g,"");
	console.log(update.length);
	if(update==''){
		$("#updateNotes").val('版本：\n发布日期：'+getNowFormatDate()+'\n功能更新：\n');
	}
}

function saveHelp(){
	var version = $("#versionNotes").val();
	var update = $("#updateNotes").val();
	var check =  $("#flag").prop('checked');
	$.ajax({
	     type: "post",
	     url: "#path()/systemmgmt/saveHelp",
	     dataType: "json",
	     data:{
	    	 version:version,
	    	 update:update ,
	    	 check:check,
	    	 m_id:1
	     },
	     success: function(result){
	    	 toastr.warning("保存成功");
	    	 
	     },
	     error: function(){
	    	 return false;
	     }
	 });
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

function showalldirection(){
	$.ajax({
		type : "post",
		url : "#path()/systemmgmt/queryAlldirectionconfig",
		data : {
			m_id:'1',
			typedescr:'去向'
		},
		dataType : "json",
		success : function(result) {
			if(result.status=="200"){
				$("#directionlist").empty();
				var str = "";
				var direction = result.rows;
				for (var i = 0; i < direction.length; i++) {
					if(direction[i].parentid=="0"){
						str+="<li id=qxid-"+direction[i].id+">"+direction[i].name;
						if(direction[i].bz!="0"){
							str += "<span>(备注)</span>";
						}
						if(direction[i].bq!="0"){
							str += "<span>(病区)</span>";
						}
						if(direction[i].jjd!="0"){
							str += "<span>(交接单)</span>";
						}
						str+="</li>"
					}
				}
				$("#directionlist").html(str);
				for (var i = 0; i < direction.length; i++) {
					var st = "";
					if(direction[i].parentid!="0"){
						if(direction[i].type=="redio"){
							st = "<span>【"+direction[i].descr+"】</span>";
							if(direction[i].bz!="0"){
								st += "<span>(备注)</span>";
							}
							if(direction[i].bq!="0"){
								st += "<span>(病区)</span>";
							}
							if(direction[i].jjd!="0"){
								st += "<span>(交接单)</span>";
							}
						}
					}
					$("#directionlist").find("#qxid-"+direction[i].parentid).append(st);
				}
			}else{
				toastr.warning(result.message);
			}
		},
		error : function() {
		}
	});
}

function showalldirectiontable(){
	$.ajax({
		type : "post",
		url : "#path()/systemmgmt/queryAlldirectionconfig",
		data : {
			m_id:'1',
			typedescr:'去向'
		},
		dataType : "json",
		async:false,
		success : function(result) {
			console.log(result);
			if(result.status=="200"){
				$("#rescueSet-tc01").find("tbody").empty();
				var str = "";
				var direction = result.rows;
				var he = 1;
				for (var i = 0; i < direction.length; i++) {
					if(direction[i].type=="dre"){
						if(direction[i].status=="1"){
							var strh = "";
							strh += "<tr id="+direction[i].id+" name="+direction[i].id+"><td>"+he+"、</td><td>"+direction[i].name+"</td><td>无</td>";
							var bz = "无";
							if(direction[i].bz!="0"){
								bz = "备注";
							}
							var bq = "无";
							if(direction[i].bq!="0"){
								bq = "病区";
							}
							var jjd = "无";
							if(direction[i].jjd!="0"){
								jjd = "交接单";
							}
							strh += "<td>"+bz+"</td><td>"+jjd+"</td><td>"+bq+"</td><td>&nbsp;</td></tr>";
							$("#rescueSet-tc01").find("tbody").append(strh);
						}else{
							var strh = "";
							strh += "<tr id="+direction[i].id+" qxtype='other' name="+direction[i].id+">";
							var bz = "";
							if(direction[i].bz!="0"){
								bz = "checked";
							}
							var bq = "";
							if(direction[i].bq!="0"){
								bq = "checked";
							}
							var jjd = "";
							if(direction[i].jjd!="0"){
								jjd = "checked";
							}
							strh += "<td>"+he+"、</td><td><input type='text' value="+direction[i].name+"></td><td><input type='text' value=''/>";
							strh += "<a href='javascript:void(0);' onclick='addRescueSetInput(this);' class='add-rescueSet-input'>+</a></td>";
							strh += "<td><label><input type='checkbox' "+bz+"/>备注</label></td>";
							strh += "<td><label><input type='checkbox' "+jjd+"/>交接单</label></td>";
							strh += "<td><label><input type='checkbox' "+bq+"/>选择病区</label></td>";
							strh += "<td><a href='javascript:void(0);' onclick='delRescueSetTr(this);' class='del-rescueSet-tr'>-</a></td></tr>";
							$("#rescueSet-tc01").find("tbody").append(strh);
						}
						he++;
					}
				}
				for (var i = 0; i < direction.length; i++) {
					if(direction[i].parentid!="0"){
					    if(direction[i].type=="redio"){
					    	if(direction[i].status=="1"){
								if($("#"+direction[i].parentid).find("td").eq(2).text().trim()=="无"){
									$("#"+direction[i].parentid).find("td").eq(2).text(direction[i].name);
									var bz = "无";
									if(direction[i].bz!="0"){
										bz = "备注";
									}
									var bq = "无";
									if(direction[i].bq!="0"){
										bq = "病区";
									}
									var jjd = "无";
									if(direction[i].jjd!="0"){
										jjd = "交接单";
									}
									$("#"+direction[i].parentid).find("td").eq(3).text(bz);
									$("#"+direction[i].parentid).find("td").eq(4).text(jjd);
									$("#"+direction[i].parentid).find("td").eq(5).text(bq);
								}else{
									var strh = "";
									strh += "<tr id="+direction[i].id+" name="+direction[i].parentid+"><td></td><td></td><td>"+direction[i].name+"</td>";
									var bz = "无";
									if(direction[i].bz!="0"){
										bz = "备注";
									}
									var bq = "无";
									if(direction[i].bq!="0"){
										bq = "病区";
									}
									var jjd = "无";
									if(direction[i].jjd!="0"){
										jjd = "交接单";
									}
									strh += "<td>"+bz+"</td><td>"+jjd+"</td><td>"+bq+"</td><td>&nbsp;</td></tr>";
									$("#"+direction[i].parentid).after(strh);
								}
							}else{
								if($("#"+direction[i].parentid).find("td").eq(2).find("input[type='text']").val()==""){
									$("#"+direction[i].parentid).find("td").eq(2).find("input[type='text']").val(direction[i].name);
									var bz = "";
									if(direction[i].bz!="0"){
										$("#"+direction[i].parentid).find("td").eq(3).find("input[type='checkbox']").prop("checked",true);
									}
									var jjd = "";
									if(direction[i].jjd!="0"){
										$("#"+direction[i].parentid).find("td").eq(4).find("input[type='checkbox']").prop("checked",true);
									}
									var bq = "";
									if(direction[i].bq!="0"){
										$("#"+direction[i].parentid).find("td").eq(5).find("input[type='checkbox']").prop("checked",true);
									}
								}else{
									var strh = "";
									strh += "<tr id="+direction[i].id+" qxtype='other' name="+direction[i].parentid+">";
									var bz = "";
									if(direction[i].bz!="0"){
										bz = "checked";
									}
									var jjd = "";
									if(direction[i].jjd!="0"){
										jjd = "checked";
									}
									var bq = "";
									if(direction[i].bq!="0"){
										bq = "checked";
									}
									strh += "<td></td><td></td><td><input type='text' value="+direction[i].name+">";
									strh += "<a href='javascript:void(0);' onclick='addRescueSetInput(this);' class='add-rescueSet-input'>+</a></td>";
									strh += "<td><label><input type='checkbox' "+bz+"/>备注</label></td>";
									strh += "<td><label><input type='checkbox' "+jjd+"/>交接单</label></td>";
									strh += "<td><label><input type='checkbox' "+bq+"/>选择病区</label></td>";
									strh += "<td><a href='javascript:void(0);' onclick='delRescueSetTr(this);' class='del-rescueSet-tr'>-</a></td></tr>";
									$("#"+direction[i].parentid).after(strh);
								}
							}
						}
					}
				}
			}else{
				toastr.warning(result.message);
			}
		},
		error : function() {
		}
	});
}

function confimqxconfig(){
	//获取所有非初始化的去向
	var qxianglist = $("#rescueSet-tc01").find("tbody").children("tr[qxtype='other']");
	var qxjsonlist="";
	if(qxianglist.length>0){
		var arr = [];
		for(var i=0;i<qxianglist.length;i++){
			var qxlist = $(qxianglist[i]).find("td");
			var ar = {};
			var id = "";
			var qx = "";
			var ejxx = "";
			var bz = "0";
			var jjd = "0";
			var bq = "0";
			if($(qxianglist[i]).attr("id")!=null && $(qxianglist[i]).attr("id")!=""){
				id = $(qxianglist[i]).attr("id");
			}
			if($(qxlist[1]).find("input").length>0){
				if($(qxlist[1]).find("input").val()!=""){
					qx = $(qxlist[1]).find("input").val();
				}else{
					alert("去向内容不能为空！");
					return;
				}
			}
			if($(qxlist[2]).find("input").val()!=""){
				ejxx = $(qxlist[2]).find("input").val();
			}else{
				if($(qxianglist[i]).siblings("[name='"+$(qxianglist[i]).attr("name")+"']").length>0){
					alert("二级选项内容不能为空！");
					return;
				}
			}
			if($(qxlist[3]).find("input[type='checkbox']:checked").length>0){
				bz = "1";
			}
			if($(qxlist[4]).find("input[type='checkbox']:checked").length>0){
				jjd = "1";
			}
			if($(qxlist[5]).find("input[type='checkbox']:checked").length>0){
				bq = "1";
			}
			ar.id = id;
			ar.name = $(qxianglist[i]).attr("name");
			ar.qx = qx;
			ar.ejxx = ejxx;
			ar.bz = bz;
			ar.jjd = jjd;
			ar.bq = bq;
			arr.push(ar);
		}
		if(arr.length>0){
			qxjsonlist = JSON.stringify(arr);
		}
	}
	$.ajax({
		type : "post",
		url : "#path()/systemmgmt/savedirectionconfig",
		dataType : "json",
		async: false,
		data : {
			//userid:userid,
			qxjsonlist:qxjsonlist,
			m_id:'1'
		},
		success : function(result) {
			if(result.status=="200"){
				$("#rescueSet-tc01").modal("hide");
				showalldirection();
			}else{
				toastr.error(result.message);
			}
		},
		error : function() {
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
		   		row.fztj = result.rows[k].qjtj;
		   		
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
			system:'抢救',
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
