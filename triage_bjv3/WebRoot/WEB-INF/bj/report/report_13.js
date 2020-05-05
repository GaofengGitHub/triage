$(document).ready(function() {	
	//数字加跳动特效
	$('.counter').lemCounter({
		value_to_from_content: true,//从0 到 插件数字
		animate_duration: 0.5,//特效时间
		locale: "en-US"//美式数字
	});
	
	//加载图表
	var itemData1=["患者","床位"];
	var valData1=[1,8];
	report15_iniPictorialBar("report_13_chart1","抢救室日平均固定床位/患者   1:8",itemData1,valData1);
	
	var itemData2=["患者","床位"];
	var valData2=[1,4];
	report15_iniPictorialBar("report_13_chart2","观察室日平均固定床位/患者   1:4",itemData2,valData2);
	
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
	
	

    
	
    
    // 基于准备好的dom，初始化echarts实例
    var report_13_chart3 = echarts.init(document.getElementById('report_13_chart3'));

    // 指定图表的配置项和数据
    var option_13_chart3 = {
    		title: {
    	        text: '医患比例',
    	        x:'left'
    	    },
    	    tooltip : {
    	        trigger: 'item',
    	        formatter: "{b} : {c} "
    	    },
    	    legend: {
    	        right: 'right',
    	        data: ['患者比例','医生比例'],
    	    	orient: 'vertical',
    	    	right: 10,
    	    	top: 20,
    	    	bottom: 20
    	    },
    	    series : [
    	        {
    	            type: 'pie',
    	            radius : '75%',
    	            data:[
    	                {	
    	                	value:31,
    	                	name:'患者比例',
    	                	itemStyle:{
    	                		normal:{
    	                			 color:'#00A199'
    	                		}
    	                	}
    	                },
    	                {
    	                	value:1, 
    	                	name:'医生比例',
    	                	itemStyle:{
    	                		normal:{
    	                			 color:'#ED7D31'
    	                		}
    	                	}
    	                }
    	            ],
    	            itemStyle: {
    	                emphasis: {
    	                    shadowBlur: 10,
    	                    shadowOffsetX: 0,
    	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
    	                }
    	            },
    	        	label :{
    	        		show:true,
    	        		formatter: "{b} :{c} "
    	        		}
    	        	}
    	    ]
    };

    // 使用刚指定的配置项和数据显示图表。
    report_13_chart3.setOption(option_13_chart3);
    
    
    // 基于准备好的dom，初始化echarts实例
    var report_13_chart4 = echarts.init(document.getElementById('report_13_chart4'));

    // 指定图表的配置项和数据
    var option_13_chart4 = {
    		title: {
    	        text: '护患比例',
    	        x:'left'
    	    },
    	    tooltip : {
    	        trigger: 'item',
    	        formatter: "{b} : {c} "
    	    },
    	    legend: {
    	        right: 'right',
    	        data: ['患者比例','护士比例'],
    	    	orient: 'vertical',
    	    	right: 10,
    	    	top: 20,
    	    	bottom: 20
    	    },
    	    series : [
    	        {
    	            type: 'pie',
    	            radius : '75%',
    	            data:[
    	                {	
    	                	value:12,
    	                	name:'患者比例',
    	                	itemStyle:{
    	                		normal:{
    	                			 color:'#00A199'
    	                		}
    	                	}
    	                },
    	                {
    	                	value:1, 
    	                	name:'护士比例',
    	                	itemStyle:{
    	                		normal:{
    	                			 color:'#ED7D31'
    	                		}
    	                	}
    	                }
    	            ],
    	            itemStyle: {
    	                emphasis: {
    	                    shadowBlur: 10,
    	                    shadowOffsetX: 0,
    	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
    	                }
    	            },
    	        	label :{
    	        		show:true,
    	        		formatter: "{b} :{c} "
    	        		}
    	        	}
    	    ]
    };

    // 使用刚指定的配置项和数据显示图表。
    report_13_chart4.setOption(option_13_chart4);
});


function report15_iniPictorialBar(id,title,itemData,valData){
	var spirit1 = 'image://../static/images/ren1.png';
	var spirit2 = 'image://../static/images/bed1.png';
	var itemFontsize=16;
	var gridLeft = 65;
	var gridRight = 50;
	var symbolSize = [11.5, 30];
	var symbolColor = ["black"];
	var fontColor='black';
	var max = 0;
	for(var i=0;i<valData.length;i++){
		if(valData[i]>max){
			max = valData[i];
		}
	}
//	max = max*1;
	var height = $("#"+id).height();
	var maxData = max;
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
    	     text: title,
    	      x:'center'
    	},
	    tooltip: {
	    	trigger: 'item',
	    	formatter: function (params) {
                return params.value ;
            }
	    },
	    xAxis: {
	    	show:false,
	        max: maxData,
	        splitLine: {show: false},
	        offset: 10,
	        axisLine: {
	            lineStyle: {
	                color: '#999'
	            }
	        },
	        axisLabel: {
	            margin: 10
	        }
	    },
	    yAxis: {
	        data: itemData,
	        inverse: true,
	        axisTick: {show: false},
	        axisLine: {show: false},
	        axisLabel: {
	            margin: 2,
	            textStyle: {
	                color: fontColor,
                    fontSize: itemFontsize,
                    fontFamily:'Microsoft YaHei',
                    fontWeight:600
	            }
	        }
	    },
	    grid: {
	        top: 'center',
	        height:'200px',
	        width:'80%',
	        left: gridLeft,
	        right: gridRight
	    },
	    series: [{
	    	name:'比例',
	        type: 'pictorialBar',
	        symbolRepeat: 'fixed',
	        symbolMargin: '10%',
	        symbolClip: true,
	        symbolSize: symbolSize,
	        symbolBoundingData: maxData,
	        color:symbolColor,
	        data: [{
	            value: valData[0],
	            // Built-in type, can be 'circle', 'rect', 'roundRect', 'square', 'diamond', 'triangle', 'pin', 'arrow'.
	            symbol: spirit1,
	        }, {
	            value: valData[1],
	            // Image link.
	            symbol: spirit2,
	        }],
	        z: 20
	    }, {
	    	name:'比例',
	        type: 'pictorialBar',
	        color:symbolColor,
	        itemStyle: {
	            normal: {
	                opacity: 0.2
	            }
	        },
	        label: {
	            normal: {
	                show: false,
	                formatter: function (params) {
	                    return params.value ;
	                },
	                position: 'right',
	                align:'right',
	                offset: [40, 0],
	                textStyle: {
	                    color: fontColor,
	                    fontSize: 15,
	                    fontFamily:'Microsoft YaHei'
	                }
	            }
	        },
	        animationDuration: 0,
	        symbolRepeat: 'fixed',
	        symbolMargin: '10%',
	        symbolSize: symbolSize,
	        symbolBoundingData: maxData,
	        data: [{
	            value: valData[0],
	            // Built-in type, can be 'circle', 'rect', 'roundRect', 'square', 'diamond', 'triangle', 'pin', 'arrow'.
	            symbol: spirit1,
	        }, {
	            value: valData[1],
	            // Image link.
	            symbol: spirit2,
	        }],
	        z: 5
	    }]
	};
	myChart.setOption(option);
}