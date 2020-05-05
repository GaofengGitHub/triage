function addyjfzpjbconfirm(){
	var jfzpjbname = $('#jfzpjbname').val();
	if(feiknum("预检分诊评级表名称","limit18",jfzpjbname,$("#jfzpjbname").next())){return;};
	var jfzpjbaddress = $('#jfzpjbaddress').val();
	if(feiknum("地址","notEmpty",jfzpjbaddress,$("#jfzpjbaddress").next())){return;};
	$(".tips").text("");
	$.ajax({
	     type: "post",
	     url: "#path()/yjfzpjb/addyjfzpjbconfirm",
	     dataType: "json",
	     data:{
	    	 jfzpjbname:jfzpjbname,
	    	 jfzpjbaddress:jfzpjbaddress
	     },
	     success: function(result){
	    	 if(result.status=="200"){
	    		 load('yjfzpjbmgmt');
	    	 }else{
	    		toastr.warning(result.message);
	    	 }
	     },
	     error: function(){
	    	 return false;
	     }
	 }); 
}