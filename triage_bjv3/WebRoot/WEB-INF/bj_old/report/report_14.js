$(document).ready(function() {	
	
	$("tbody tr").find("td:eq(2)").addClass("counter");
	
	//数字加跳动特效
	$('.counter').lemCounter({
		value_to_from_content: true,//从0 到 插件数字
		animate_duration: 1,//特效时间
		locale: "en-US"//美式数字
	});
	var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    //昨天
//    if (strDate > 0) {
//    	if(strDate<11){
//    		if(strDate>1){
//        		strDate = strDate-1;
//        	}
//            strDate = "0" + strDate;
//    	}else{
//    		strDate = strDate-1;
//    	}
//    }
    //一月跨年问题
    if(month=="01"){
    	var byyr = (date.getFullYear()-1) + seperator1 + "12" + seperator1 + strDate;
    }else{
    	//一个月前
    	if(month<"10"){
    		//解决个位数月份少0的问题，变成01。liuxj20190216
    		var byyr = date.getFullYear() + seperator1 +'0'+ (month-1) + seperator1 + strDate;
    		
    	}else{
    		var byyr = date.getFullYear() + seperator1 + (month-1) + seperator1 + strDate;
    	}
    	
    }
    var zr = date.getFullYear() + seperator1 + month + seperator1 + strDate;
//    zr="2018-12-03";
    /*var laystarttime = laydate.render({
		   elem: '#starttime', //指定元素
		   min: '1901-01-01',
		   max: zr,
		   value: byyr,
		   btns: ['clear','confirm'],
		   done: function(value, date){
			   layendtime.config.min ={
	                     year:date.year,   
	                     month:date.month-1, //关键  
	                     date: date.date,   
	                     hours: 0,   
	                     minutes: 0,   
	                     seconds : 0  
	            };
		   }
	});
 
    var layendtime = laydate.render({
		   elem: '#endtime', //指定元素
		   min: '1901-01-01',
		   max: zr,
		   value: zr,
		   done: function(value, date){
			   if(value==""){
					var date2 = new Date();
					var month = date2.getMonth();
				    var strDate = date2.getDate();
				    if (month >= 1 && month <= 9) {
				        month = "0" + month;
				    }
				    if (strDate >= 0 && strDate <= 9) {
				    	if(strDate>1){
				    		strDate = strDate-1;
				    	}
				        strDate = "0" + strDate;
				    }
					laystarttime.config.max ={
	                     year: date2.getFullYear(),   
	                     month:month, //关键  
	                     date: strDate,   
	                     hours: 0,   
	                     minutes: 0,   
	                     seconds : 0  
	                };
			   }else{
				   laystarttime.config.max ={
		                     year:date.year,   
		                     month:date.month-1, //关键  
		                     date: date.date,   
		                     hours: 0,   
		                     minutes: 0,   
		                     seconds : 0  
		           };
			   }
		   }
	 });*/
    $("#endtime").datepicker({setDate:new Date(),autoclose:true,format: 'yyyy-mm-dd'});
    $("#starttime").datepicker({setDate:new Date(byyr),autoclose:true,format: 'yyyy-mm-dd'});
	$("#starttime").attr("placeholder", byyr);
	$("#endtime").attr("placeholder", zr);
});
