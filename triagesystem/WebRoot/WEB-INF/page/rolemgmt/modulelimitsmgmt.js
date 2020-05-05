var roleid = "";
var setting = {
		callback: {
			onCheck: zTreeOnCheck
		},
		check : {
			enable : true
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		edit : {
			enable : false
		}
};


function bb(description){
	$.ajax({
	    type: "post",
	    url: "#path()/rolemgmt/queryRole",
	    dataType: "json",
	    data:{
	    	description:description  	
	    },
	    success: function(result){
	   	 if(result.status=="200"){
	   		//var dataArry = [{id: 3, child: 1}, {id: 6, child: 3}, {id: 3, child: 2}, {id: 5, child: 4}, {id: 6, child: 5}];
	   		var row1 = [];
	   		for(var k=0;k<result.rows.length;k++){
   				var row = {};
		   		row.name = result.rows[k].rolename;
		   		row.code = result.rows[k].roleid;
		   		if(result.rows[k].parentid=="1"){
		   			row.icon = "icon-th";
		   		}else{
		   			row.icon = "icon-minus-sign";
		   		}
		   		row.parentCode = result.rows[k].parentid;
		   		row.child = [];
		   		row1.push(row);
	   		}
	   		var len = row1.length;
	   		var flagArr = [];//记录数组中已经是别人儿子的元素的小标，因为只可能是一个元素的儿子，所有不用担心重复，除非数据本身有问题
	   		//双层遍历对比所有的元素，看看一个元素是否是别人的儿子
	   		for (var i = 0; i < len; i++) {
		   		for (var j = i; j < len; j++) {
			   		if (row1[i].code == row1[j].parentCode) {
				   		row1[i].child.push(row1[j]);
				   		flagArr.push(j);
			   		}
		   		    if (row1[j].code == row1[i].parentCode) {
				   		row1[j].child.push(row1[i]);
				   		flagArr.push(i);//记录下已经成为别人儿子的元素
		   		    }
		   		}
	   		};
	   		function sortNumber(a, b) {
	   		     return a - b
	   		}
	   		//将数组排序
	   		flagArr=flagArr.sort(sortNumber);
	   		//将这些已经变成别人儿子的元素从数组中删除，剩下的便是树
	   		for(var i=flagArr.length-1;i>=0;i--){
		   		flagArr[i];
		   		row1.splice(flagArr[i],1);
	   		}
	   		departtree(row1);
	   	 }else{
	   		toastr.warning(result.message);
	   	 }
	    },
	    error: function(){
	   	 return false;
	    }
	});
}

function departtree(data) {
	for (var i = 0; i < data.length; i++) {
		var data2 = data[i];
		if (data[i].icon == "icon-th") {
			$("#rootUL1") .append( "<li data-name='"
									+ data[i].code
									+ "'><span name='clickcolor'><a href='javascript:void(0);' onclick='aa(this);' style='text-decoration:none'><i class='"
									+ data[i].icon + "'></i>" + data[i].name
									+ "</a></span></li>");
		} else {
			var children = $("li[data-name='" + data[i].parentCode + "']")
					.children("ul");
			if (children.length == 0) {
				$("li[data-name='" + data[i].parentCode + "']").append(
						"<ul></ul>")
			}
			$("li[data-name='" + data[i].parentCode + "'] > ul").append(
					"<li data-name='" + data[i].code + "'>"
							+ "<span name='clickcolor'><a href='javascript:void(0);' onclick='aa(this);' style='text-decoration:none'>"
							+ "<i class='" + data[i].icon + "'></i> "
							+ data[i].name + "</span></a>" + "</li>")
		}
		for (var j = 0; j < data[i].child.length; j++) {
			var child = data[i].child[j];
			var children = $("li[data-name='" + child.parentCode + "']")
					.children("ul");
			if (children.length == 0) {
				$("li[data-name='" + child.parentCode + "']").append(
						"<ul></ul>")
			}
			$("li[data-name='" + child.parentCode + "'] > ul").append(
					"<li data-name='" + child.code + "'>"
							+ "<span name='clickcolor'><a href='javascript:void(0);' onclick='aa(this);' style='text-decoration:none'>"
							+ "<i class='" + child.icon + "'></i> "
							+ child.name + "</a></span>" + "</li>")
			var child2 = data[i].child[j].child;
			departtree(child2)
		}
		departtree(data[i]);
	}

}


function aa(th){
	$("[name='clickcolor']").css("background-color","");
	$(th).parent().css("background-color","#A8DCF4");
	$("#workstation").empty();
	var code = $(th).parent().parent("li").attr("data-name");
	roleid=code;
	$.ajax({
	    type: "post",
	    url: "#path()/rightmgmt/queryRightByRole",
	    dataType: "json",
	    data:{
	   	 code:code  	
	    }, 
	    success: function(result){
	       if(result.status=="200"){
	    	   var row1 = [];
	    	   var row2 = [];
	    	   var allright = result.rows.allright;
	    	   var roleright = result.rows.roleright;
	    	   for(var k=0;k<allright.length;k++){
	    		   var row = {};
	    		   var ww = {};
	    		   row.name = allright[k].rightname;
			   	   row.id = allright[k].rightid;
			   	   row.pId = allright[k].parentid;
			   	   row.open = true;
	    	       for(var i=0;i<roleright.length;i++){
	    			   if(allright[k].rightid==roleright[i].rightid){
	    		        	row.checked = true;
	    		        }
	    		   }
	    	       var ind = 1;
			   	   ind = $.inArray(allright[k].description,row1);
			   	   if(ind<0){
			   			ww.description = allright[k].description;
			   			ww.child = [];
			   			row2.push(ww);
			   			row1.push(allright[k].description);
			   	   }
				   for(var ss=0;ss<row2.length;ss++){
			   			if(allright[k].description==row2[ss].description){
			   				row2[ss].child.push(row);
			   			}
			   	   }
	    	   }
	    	   for(var k = 0 ; k < row2.length ; k++){
	    		   $("#workstation").append("<div class='col-md-3'><div class='circumscribe'><p>选择功能权限</p><ul id='righttreeDemo"+k+"' class='ztree'></ul></div></div>");
	    		   $.fn.zTree.init($("#righttreeDemo"+k), setting, row2[k].child);
	    	   }
	   	   }else{
	   		toastr.warning(result.message);
	   	   }
	    },
	    error: function(){
	   	 
	   	 return false;
	    }
	});
}

function treeload(th) {
	$(th).children().css("background-color","#6699FF");
	$(th).siblings().children().css("background-color","#D7D7D7");
	$('#rootUL1').empty();
	var t = $(th).attr("id");
	if(t=="json1"){
		bb("1");
	}else if(t=="json2"){
		bb("2");
	}else{
		bb("3");
	}
	//shenfenshu();
}

function zTreeOnCheck(event, treeId, treeNode) {
    $.ajax({
	    type: "post",
	    url: "#path()/rightmgmt/updRightByRole",
	    dataType: "json",
	    data:{
	    	rid:treeNode.id,
	    	roleid:roleid,
	    	rcheck:treeNode.checked
	    },
	    success: function(result){
	       if(result.status=="200"){
	    	   console.log(result);
    	   }else{
    		   toastr.warning(result.message);
	   	   }
	    },
	    error: function(){
	   	 return false;
	    }
	});
};
