$(document).ready(function() {
	queryVersionInfoList();
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/queryVersionControl",
	     dataType: "json",
	     data:{
	    	 
	     },
	     success: function(result){
	    	 if(result.rows.name==null || result.rows.name==''){
	    		 $("#look").hide();
	    		 $("#update").show();
	    	 }else{
	    		 $("#v_name").html(result.rows.name);
		    	 var id = result.rows.version_id;
		    	 $("input[name='info'][value="+id+"]").click();
		    	 $("#look").show();
		    	 $("#update").hide();
	    	 }
	    	
	     },
	     error: function(){
	    	 return false;
	     }
	 });

});
function queryVersionInfoList(){
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/queryVersionInfoList",
	     dataType: "json",
	     data:{
	     },
	     success: function(result){
	    	 var infoList = result.rows;
	    	 for(var j=0;j<infoList.length;j++){
	    		   $("#info_list").append("<div><label><input type='radio' name='info' value='"+infoList[j].id+"'><span>"+infoList[j].name)+"</span></label></div>";
			   }
	     },
	     error: function(){
	    	 return false;
	     }
	 });
}

function updateinfo(){
	var versionId =  $("input[name='info']:checked").val();
	var name =$("input[name='info']:checked").siblings().html();
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/updateVersionId",
	     dataType: "json",
	     data:{
	    	 versionId:versionId
	     },
	     success: function(result){
	    	 toastr.success('操作成功');
	    	 $("#look").show();
	    	 $("#update").hide();
	    	 $("#v_name").html(name);
	     },
	     error: function(){
	    	 return false;
	     }
	 });
}
function showupdateinfo(){
	$("#look").hide();
	 $("#update").show();
}



