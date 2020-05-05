$(document).ready(function() {
	
    
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/queryVersionControl",
	     dataType: "json",
	     data:{
	    	 
	     },
	     success: function(result){
	    	 $("#v_name").html(result.rows.name);
	    	 
	     },
	     error: function(){
	    	 return false;
	     }
	 });

});
function updatecdkey(){
	var cd_key = $("#cd_key").val();
	if(cd_key ==''){
		toastr.error('您输入的激活码错误');
	}else{
		toastr.success('版本升级为分诊PLUS版本，恭喜您获得产品使用权限，期待您的宝贵意见');
	}
	
}


