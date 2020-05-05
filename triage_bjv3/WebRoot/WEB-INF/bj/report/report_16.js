$(document).ready(function() {	
	//右上角事件点击事件
	$(".chart-part16-notice-btn").click(function(){
        $(".chart-part16-notice").toggle();
    });
	
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
    report_16_chart1();
    report_16_chart2();
    report_16_chart3();
});


//report_15 分级接诊情况
function report_16_chart1() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('report_16_chart1'));
	var namedata =  [ '传染病','食物中毒','职业中毒','环境因素', '意外辐射','接种服药',
                            '医源性感染', '未知疾病','其他'];
	var valuedata = [ 3,5,1,1,0,1,0,0,0];
	var seriesData = [];
	for (var i = 0; i < namedata.length; i++) {
	        
	    seriesData.push({
	        name: namedata[i],
	        value: valuedata[i]
	        });
	    
	}
	// 指定图表的配置项和数据
	option = {
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
		        xAxis: {type: 'category',
		        	data:namedata,
		                                          show:false},
		        yAxis: {gridIndex: 0},
		        grid: {right: '30%'},
		        series: [
		            {
		            	name:'分类情况',
		            	type: 'bar', data : valuedata,
		            	itemStyle : {
		    				normal : {
		    					color : function(params) {
		    						var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
		    						return colorList[params.dataIndex];
		    					},
		    					label : {
		    						show : true,
		    						position : 'top',
		    						formatter : '{b}\n{c}'
		    					}
		    				}
		    			}
		            },
		            
		            {
		                type: 'pie',
		                id: 'pie',
		                radius: '50%',
		                center: ['85%', '50%'],
		                data :seriesData,
		            	name:"分类情况",
		            	label:{
		            		formatter : '{b}:{c}'
		            	}
		            }
		        ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

//report_15 分级接诊情况
function report_16_chart2() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('report_16_chart2'));
	// 指定图表的配置项和数据
	var namedata =  [ '特别重大','重大','较大','一般', '未分级','非突发事件'];
	var valuedata = [ 0,1,2,8,0,0];
	var seriesData = [];
	for (var i = 0; i < namedata.length; i++) {
		seriesData.push({
			name: namedata[i],
			value: valuedata[i]
      });
  
}
// 指定图表的配置项和数据
option = {
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
		        type: 'scroll',
		        orient: 'vertical',
		        right: 10,
		        top: 20,
		        bottom: 20,
		        data: namedata
		    },
	        series: [
	            {
	                type: 'pie',
	                id: 'pie',
	                radius: '70%',
	                center: ['50%', '50%'],
	                data :seriesData,
	            	name:"分类情况",
	            	label:{
		            	formatter : '{b}:{c}'
		            }
	            }
	        ]
};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

//report_16 分级接诊情况
function report_16_chart3() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('report_16_chart3'));
	// 指定图表的配置项和数据
	option = {
		grid:{
			bottom:'0%',top:'30%'
			},
		xAxis : [ {
			show :false,
			type : 'category',
			data : [ '一级', '二级', '三级', '四级' ]
		} ],
		yAxis : [ {
			show :false,
			type : 'value',
		// max:70
		}, ],
		series : [ {
			name : '患者数',
			type : 'bar',
			data : [ 89, 121, 93, 26 ],
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
	myChart.setOption(option);
}