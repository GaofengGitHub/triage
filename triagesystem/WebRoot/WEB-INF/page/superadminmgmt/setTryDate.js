$(document).ready(function() {
	
    
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/queryVersionControl",
	     dataType: "json",
	     data:{
	    	 
	     },
	     success: function(result){
	    	 $("#v_name").html(result.rows.name);
	    	 var try_start_time = result.rows.try_start_time;
	    	 var try_end_time = result.rows.try_end_time;
	    	 if(try_start_time==null){
	    		 try_start_time=getToday();
	    	 }else{
	    		 try_start_time=try_start_time.substring(0, 10);
	    	 }
	    	 if(try_end_time==null){
	    		 try_end_time='请选择结束时间';
	    		 $("#look").hide();
	    	 }else{
	    		 try_end_time=try_end_time.substring(0, 10);
	    		 $("#looktime").html(try_start_time+'至'+try_end_time);
	    		 $("#update").hide();
	    	 }
//	    	 $("#starttime").datepicker('setDate',new Date(try_start_time)); 
//	    	 $("#endtime").datepicker('setDate',new Date(try_end_time)); 
	    	 $("#starttime").datepicker({
	    		 setDate:new Date(try_start_time),
	    		    language: 'zh-CN',// 设置语言
	    		    format:'yyyy-mm-dd',
	    		 	autoclose:true,
//	    			endDate:new Date() // 设置格式
	    	 });
	    	 $("#endtime").datepicker({
	    		 setDate:new Date(try_end_time),
	    		    language: 'zh-CN',// 设置语言
	    		    format:'yyyy-mm-dd',
	    		 	autoclose:true,
//	    			endDate:new Date() // 设置格式
	    	 });
	    	 $("#endtime").val(try_end_time);
	    	 $("#starttime").val(try_start_time);
	     },
	     error: function(){
	    	 return false;
	     }
	 });

});
function updatetrydate(){
	var try_start_time =  $("#starttime").val();
	var try_end_time =  $("#endtime").val();
	if(try_start_time==null || try_end_time ==null){
		toastr.error('请选择开始或结束时间！');
	}
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/updatetrydate",
	     dataType: "json",
	     data:{
	    	 try_end_time:try_end_time,
	    	 try_start_time:try_start_time
	     },
	     success: function(result){
	    	 toastr.success('操作成功！');
	    	 $("#update").hide();
	    	 $("#looktime").html(try_start_time+'至'+try_end_time);
	    	 $("#look").show();
	     },
	     error: function(){
	    	 return false;
	     }
	 });
}
function getToday(){
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
function showupdatetrydate(){
	$("#update").show();
	$("#look").hide();
}

