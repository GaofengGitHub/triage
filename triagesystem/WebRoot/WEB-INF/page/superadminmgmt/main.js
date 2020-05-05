var version_id ='';
$(document).ready(function() {
	queryVersionInfoList();
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/queryVersionControl",
	     dataType: "json",
	     data:{
	    	 
	     },
	     success: function(result){
	    	 var cd_key = result.rows.cd_key;
	    	 version_id = result.rows.version_id;
	    	 if(cd_key==null||cd_key==''){
	    		 cd_key='';
	    		 $("#look").hide();
	    	 }else{
	    		 $("#look").show();
	    		 $("#v_name").html(result.rows.name);
	    		 $("#hp_name").html(result.rows.hp_name);
	    		 $("#look_con").html('<div>'+'验证码为：'+'<span>'+cd_key+'</span></div>'+'<div></div>');
	    		 $("#update").hide();
	    		 var id = result.rows.version_id;
		    	 $("input[name='info'][value="+id+"]").click();
	    	 }
	    	 var try_start_time = result.rows.try_start_time;
	    	 var try_end_time = result.rows.try_end_time;
	    	 if(try_start_time==null){
	    		 try_start_time=getToday();
	    	 }else{
	    		 try_start_time=try_start_time.substring(0, 10);
	    	 }
	    	 if(try_end_time==null){
	    		 try_end_time='请选择结束时间';
//	    		 $("#look").hide();
	    	 }else{
	    		 try_end_time=try_end_time.substring(0, 10);
	    		 $("#looktime").html(try_start_time+'至'+try_end_time);
	    		 $("#update").hide();
	    	 }
//	    	 $("#starttime").datepicker('setDate',new Date(try_start_time)); 
//	    	 $("#endtime").datepicker('setDate',new Date(try_end_time)); 
	    	 $("#starttime").datepicker({
//	    		 setDate:new Date(try_start_time),
	    		    language: 'zh-CN',// 设置语言
	    		    format:'yyyy-mm-dd',
	    		 	autoclose:true,
//	    			endDate:new Date() // 设置格式
	    	 });
//	    	 alert(try_end_time);
	    	 $("#endtime").datepicker({
//	    		 setDate:new Date(try_end_time),
	    		    language: 'zh-CN',// 设置语言
	    		    format:'yyyy-mm-dd',
	    		 	autoclose:true,
//	    			endDate:new Date() // 设置格式
	    	 });
	    	 $("#endtime").datepicker('setDate',new Date(try_start_time)); 
	    	 $("#starttime").datepicker('setDate',new Date(try_end_time)); 
	    	 $("#endtime").val(try_end_time);
	    	 $("#starttime").val(try_start_time);
	    	 $("#cd_key").val(cd_key);
	    	 
	     },
	     error: function(){
	    	 return false;
	     }
	 });

});
function updatecdkey(){
	var cdkey =  $("#cd_key").val();
	var versionid =  $("input[name='info']:checked").val();
	var name =$("input[name='info']:checked").siblings().html();
	var try_start_time =  $("#starttime").val();
	var try_end_time =  $("#endtime").val();
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/updatecdkey",
	     dataType: "json",
	     data:{
	    	 cdkey:cdkey,
	    	 old_version_id:version_id,
	    	 version_id:versionid,
	    	 try_end_time:try_end_time,
	    	 try_start_time:try_start_time
	     },
	     success: function(result){
	    	 toastr.success('操作成功!');
	    	 $("#look").show();
	    	 $("#update").hide();
	    	 $("#look_con").html('<div>'+'验证码为：'+'<span>'+cdkey+'</span></div>');
	    	 $("#v_name").html(name);
	    	 $("#looktime").html(try_start_time+'至'+try_end_time);
	     },
	     error: function(){
	    	 return false;
	     }
	 });
}
function showupdatecdkey(){
	$("#look").hide();
	 $("#update").show();
}

function queryVersionInfoList(){
	$.ajax({
	     type: "post",
	     url: "#path()/superadminmgmt/queryVersionInfoList",
	     dataType: "json",
	     async: false,
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

