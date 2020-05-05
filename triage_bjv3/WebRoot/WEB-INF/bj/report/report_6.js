$(document).ready(function() {
	report_6_option_1();
	report_6_option_2();
	report_6_option_3();
	
	$("#zdgbtn").click(function(){
		$("#showzdy").show();
	});
	$("#allbtn").click(function(){
		$("#showzdy").hide();
	})
	
	$('.counter').lemCounter({
	value_to_from_content: true,//从0 到 插件数字
	animate_duration: 0.5,//特效时间
	locale: "en-US"//美式数字
	});
	
	var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
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
	 }); */ 
    $("#endtime").datepicker({setDate:new Date(),autoclose:true,format: 'yyyy-mm-dd'});
    $("#starttime").datepicker({setDate:new Date(byyr),autoclose:true,format: 'yyyy-mm-dd'});
	$("#starttime").attr("placeholder", byyr);
	$("#endtime").attr("placeholder", zr);
})
//report_6 分诊去向统计
function report_6_option_1(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_1'));
	// 指定图表的配置项和数据
	option = {
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            restore : {show: true},
		            saveAsImage : {show: false}
		        }
		    },
		    series : [
		        {
		            name:'分诊去向与就诊科室符合率',
		            type:'gauge',
		            //splitNumber: 10,       // 分割段数，默认为5
	                axisLine: {            // 坐标轴线
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: [[0.2, '#b34038'],[0.8, '#6f9fa7'],[1, '#d1876f']], 
		                    width: 15
		                }
		            },
	                /*axisTick: {            // 坐标轴小标记
		                splitNumber: 20,   // 每份split细分多少段
		                length :1,        // 属性length控制线长
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: 'auto'
		                }
		            },*/
		            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    color: 'auto'
		                }
		            },
		            splitLine: {           // 分隔线
		                show: true,        // 默认显示，属性show控制显示与否
		                length :15,         // 属性length控制线长
		                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
		                    color: 'auto'
		                }
		            },
		            pointer : {
		                width : 5
		            },
	                title : {
		                show : true,
		                offsetCenter: [0, '-10%'],       // x, y，单位px
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    fontWeight: 'bolder'
		                }
		            },
	                detail : {
		                formatter:'{value}%',
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    color: 'auto',
		                    fontWeight: 'bolder',
		                    fontSize : 20
		                }
		            },
		            data:[{value: 99, name: '符合率'}]
		        }
		    ]
		};
		// 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
}

function report_6_option_2(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_2'));
	// 指定图表的配置项和数据
	option = {
		    //title : {
		     //   text: '各科室患者数量',
		    //},
		    tooltip : {
		        trigger: 'axis'
		    },
		    /*legend: {
		        data:['蒸发量']
		    },*/
		    grid: {
                y: '10%',
                y2: '25%',
                width: "85%",
            },
		    /*toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },*/
		    calculable : true,
		    xAxis : [
		        {
		        	axisLabel: {
	                    interval:0,
	                    rotate:0
	        	    },
		            type : 'category',
		            data: ['急诊内科', '急诊外科', '急诊神经内科', '急诊妇科', '急诊产科', '急诊皮肤科', '急诊耳鼻喉科', '急诊眼科', '急诊口腔科', '急诊精神科']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'患者数',
		            type:'bar',
		            data: [2547,1831,994,534,366,543,554,321,332,134],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
		                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
		                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{c}'
		                    }
		                }
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'}
		                ]
		            }
		        }
		    ]
		};
		// 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
}

function report_6_option_3(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_3'));
	// 指定图表的配置项和数据
	option = {
		    //title : {
		     //   text: '各科室患者占总患者的百分比',
		     //   x:'center'
		    //},
		    tooltip : {
		        trigger: 'item',
		        formatter: "{b} : {c}%"
		    },
		    /*toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true, 
		                type: ['pie', 'funnel']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },*/
		    calculable : true,
		    series : [
		        {
		            name:'面积模式',
		            type:'pie',
		            //radius : "90%",
		            center : ['50%', '50%'],
		            roseType : 'area',
		            x: '50%',               // for funnel
		            max: 40,                // for funnel
		            sort : 'ascending',     // for funnel
		            data:[
		                {value:31.2, name:'急诊内科'},
		                {value:22.5, name:'急诊外科'},
		                {value:12.2, name:'急诊神经内科'},
		                {value:6.55, name:'急诊妇科'},
		                {value:4.49, name:'急诊产科'},
		                {value:6.65, name:'急诊皮肤科'},
		                {value:6.80, name:'急诊耳鼻喉科'},
		                {value:3.93, name:'急诊眼科'},
		                {value:4.07, name:'急诊口腔科'},
		                {value:1.61, name:'急诊精神科'}
		            ]
		        }
		    ]
		};
		// 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
}

