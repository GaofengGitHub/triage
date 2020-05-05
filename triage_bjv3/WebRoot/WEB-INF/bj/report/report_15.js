$(document).ready(function() {	
	
	
	$(".chart-part15-table02 tbody tr").find("td:eq(1)").addClass("counter");
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
    report_15_chart1();
    report_15_chart2();
});


//report_15 分级接诊情况
function report_15_chart1() {
	// 基于准备好的dom，初始化echarts实例
	var myChart1 = echarts.init(document.getElementById('report_15_chart1'));
	// 指定图表的配置项和数据
	option1 = {
		grid: [
		         {bottom :5,top:25}
		       ],
		xAxis : [ {
			show : false,
			type : 'category',
			data : [ '一级', '二级', '三级', '四级' ]
		} ],
		yAxis : [ {
			show : false,
			type : 'value',
		// max:70
		}, ],
		series : [ {
			name : '患者数',
			type : 'bar',
			data : [ 79, 204, 343, 726 ],
			itemStyle : {
				normal : {
					color : function(params) {
						var colorList = [ '#ff0000', '#fa8e23', '#f5e90a',
								'#1c95eb' ];
						return colorList[params.dataIndex];
					},
					label : {
						show : true,
						position : 'top',
						formatter : '{b}\n{c}',
						color:'black'	
					}
				}
			}
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart1.setOption(option1);
}

//report_15 分级接诊情况
function report_15_chart2() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('report_15_chart2'));
	// 指定图表的配置项和数据
	option = {
		grid: [
			    {bottom :5,top:40}
		],
		xAxis : [ {
			show : false,
			type : 'category',
			data : [ '一级', '二级', '三级', '四级' ]
		} ],
		yAxis : [ {
			show : false,
			type : 'value',
		// max:70
		}, ],
		series : [ {
			name : '患者数',
			type : 'bar',
			data : [91,158,287,694],
			itemStyle : {
				normal : {
					color : function(params) {
						var colorList = [ '#ff0000', '#fa8e23', '#f5e90a',
								'#1c95eb' ];
						return colorList[params.dataIndex]
					},
					label : {
						show : true,
						position : 'top',
						formatter : '{b}\n{c}',
						color:'black'	
					}
				}
			}
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}