$(document).ready(function() {
	aa();
});
var setting = {
	view : {
		addHoverDom : addHoverDom,
		removeHoverDom : removeHoverDom,
		selectedMulti : false
	},
	check : {
		enable : false
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	edit : {
		enable : true
	},
	callback: {
		beforeRemove: zTreeBeforeRemove,
		beforeRename: zTreeBeforeRename,
		onRename: zTreeOnRename
	}
};

function aa(){
	$.ajax({
	    type: "post",
	    url: "#path()/rolemgmt/queryRole",
	    dataType: "json",
	    data:{
	    },
	    success: function(result){
	       if(result.status=="200"){
	    	   var row1 = [];
	    	   var row2 = [];
	    	   var row3 = [];
	    	   for(var k=0;k<result.rows.length;k++){
	   				var row = {};
	   				var ww = {};
			   		row.name = result.rows[k].rolename;
			   		row.id = result.rows[k].roleid;
			   		row.pId = result.rows[k].parentid;
			   		row.open = true;
			   		if(result.rows[k].description==1){
			   			row1.push(row);
		   			}
			   		if(result.rows[k].description==2){
			   			row2.push(row);
		   			}
			   		if(result.rows[k].description==3){
			   			row3.push(row);
		   			}
		   	   }
	    	   
	    	   $.fn.zTree.init($("#systemmgmttree"), setting, row3);
	    	   $.fn.zTree.init($("#linchuangtree"), setting, row2);
	    	   $.fn.zTree.init($("#departmentmgmttree"), setting, row1);
	    	   
    	   }else{
	   		 
	   	   }
	    },
	    error: function(){
	   	 
	   	 return false;
	    }
	});
}

function addHoverDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if($("span[name='"+treeId+"']").text()!=""){
		$("span[name='"+treeId+"']").text("请先输入角色名称，再进行下一步操作！！");
		return;
	}
	if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0){
		return;
	}
		
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
			+ "' title='add node' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_" + treeNode.tId);
	if (btn)
		btn.bind("click", function() {
			
			var lalatree = $(this).parents(".ztree").attr("id");
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			treeNode123 = zTree.addNodes(treeNode, {
				id : (treeNode.id+"1"),
				pId : treeNode.id,
				name : ""
			});
			zTree.editName(treeNode123[0]);
			return false;
		});
};

function removeHoverDom(treeId, treeNode) {
	$("#addBtn_" + treeNode.tId).unbind().remove();
};

function zTreeBeforeRemove(treeId, treeNode) {
	var aa = true;	
	$.ajax({
		    type: "post",
		    url: "#path()/rolemgmt/delRoleByID",
		    dataType: "json",
		    async: false,
		    data:{
		    	removeid:treeNode.id
		    },
		    success: function(result){
		       if(result.status=="200"){
		    	   aa = true;
	    	   }else{
	    		   toastr.warning(result.message);
	    		   aa = false;
		   	   }
		    },
		    error: function(){
		   	 aa = false;
		    }
		});
	return aa;
}

function zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
	isCancel = false;
	var zhengz = /^[^`~!@#$%^&*()_+<>?:"{}, .\/;'[\]·！#￥（——）：；“”‘、，|《。》？、【】[\]]{1,8}$/;
	if(!zhengz.test(newName)){
		isCancel = false;
		$(".tip").text("");
		$("span[name='"+treeId+"']").text("角色名称不能为空，不能为特殊字符，且至多输入8位");
		$("span[name='"+treeId+"']").css("color","red");
	}else{
		$.ajax({
		    type: "post",
		    url: "#path()/rolemgmt/findRoleByPID",
		    dataType: "json",
		    async: false,
		    data:{
		    	id:treeNode.id,
		    	pid:treeNode.pId,
		    	newname:newName
		    },
		    success: function(result){
		       if(result.status=="200"){
		    	 $(".tip").text("");
		    	 isCancel = true;
	    	   }else{
		   		 isCancel = false;
		   		 $(".tip").text("");
				 $("span[name='"+treeId+"']").text(result.message);
				 $("span[name='"+treeId+"']").css("color","red");
		   	   }
		    },
		    error: function(){
		   	 return false;
		    }
		});
	}
    return isCancel;
}

function zTreeOnRename(event, treeId, treeNode, isCancel) {
	isCancel = true;
	var description;
	if(treeId=="systemmgmttree"){
		description=3;
	}
	if(treeId=="linchuangtree"){
		description=2;
	}
	if(treeId=="departmentmgmttree"){
		description=1;
	}
	$.ajax({
	    type: "post",
	    url: "#path()/rolemgmt/addRoleByPID",
	    dataType: "json",
	    async: false,
	    data:{
	    	id:treeNode.id,
	    	pid:treeNode.pId,
	    	newname:treeNode.name,
	    	description:description
	    },
	    success: function(result){
	       if(result.status=="200"){
	    	   isCancel = false;
	    	   var treeObj = $.fn.zTree.getZTreeObj(treeId);
	    	   var nodes = treeObj.getNodesByParam("id",treeNode.id,null);
	    	   nodes[0].id=result.rows;
	    	   treeObj.updateNode(nodes);
    	   }else{
	   		 isCancel = true;
	   		 toastr.warning(result.message);
	   	   }
	    },
	    error: function(){
	   	 return false;
	    }
	});

    return isCancel;
}
