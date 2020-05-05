$(document).ready(function() {
	//数字加跳动特效
	$('.counter').lemCounter({
		value_to_from_content: true,//从0 到 插件数字
		animate_duration: 0.5,//特效时间
		locale: "en-US"//美式数字
	});
	report_1_option_1();
	querytable2();
	querytable3();
	querytable4();
	querytable5();
	querytable6();
})


function querytable1(){
	 var myChart = echarts.init(document.getElementById('table1'));
	 option = {
			    tooltip : {
			        trigger: 'item'
			    },
			    toolbox: {
			        show : true,
//			        feature : {
//			            mark : {show: true},
//			            dataView : {show: true, readOnly: false},
//			            magicType: {show: true, type: ['line', 'bar']},
//			            restore : {show: true},
//			            saveAsImage : {show: true}
//			        }
			    },
			    calculable : true,
			    legend: {
//			        data:['蒸发量','降水量','平均温度']
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name : '人数',
			            axisLabel : {
			                formatter: '{value} '
			            }
			        },
//			        {
//			            type : 'value',
//			            name : '温度',
//			            axisLabel : {
//			                formatter: '{value} °C'
//			            }
//			        }
			    ],
			    series : [

			       
			        {
			            name:'人数',
			            type:'bar',
			            data:[13237, 10520, 9586, 10880, 9974, 12224, 9786, 7897, 7653, 10234, 9842, 11021],
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
			                        formatter: '{b}\n{}'
			                    }
			                }
			            },
			        },
//			        {
//			            name:'平均温度',
//			            type:'line',
//			            yAxisIndex: 1,
//			            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
//			        }
			    ]
			};
	 myChart.setOption(option);
}
//report_1 急诊病人量
function report_1_option_1(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('table1'));
	// 指定图表的配置项和数据
	option = {
		    tooltip : {
		        //trigger: 'axis'
		    	trigger: 'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。只有设置了这个参数才会出现竖直的线条
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        //指示器类型。
                },
                formatter: function (params) {//提示框自定义
                    return formatterTip(params);
                }
		    },
		    toolbox: {
		        show : true,
//		        feature : {
//		            mark : {show: true},
//		            dataView : {show: true, readOnly: false},
//		            magicType: {show: true, type: ['line', 'bar']},
//		            restore : {show: true},
//		            saveAsImage : {show: true}
//		        }
		    },
		    calculable : true,
		    legend: {//这里定义了折线图上面那2排的颜色，显示的样子
            	data:['病人量柱状图','病人量折线图'],
                textStyle: {
                    color: "#92DCFB",
                }
            },
            color: [//定义了线条，柱状图的颜色，颜色值的顺序你要跟你上面的totalYearList存储的顺序要一直
                    "#E9B943",
                    "#205397"
                ],
		    xAxis : [
		        {
		            type : 'category',
		            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		        }
		    ],
		    yAxis : [
		        {
//		            type : 'value',
//		            name : '病人量',
//		            axisLabel : {
//		                formatter: '{value} 万'
//		            },
		        	show:false,
		            axisLine: {show:false},
		            axisTick: {show:false},
		            splitLine:{show:false},
		        }
		    ],
		    series : [

		        {
		            name:'病人量柱状图',
		            type:'bar',
		            data:[13237, 10520, 9586, 10880, 9974, 12224, 9786, 7897, 7653, 10234, 9842, 11021],
		            itemStyle: {
		            	 emphasis: {
	                            barBorderRadius: 30
	                        },
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#a52a2a','#2f4554','#61a0a8', '#a52a2a','#2f4554','#61a0a8' ,'#a52a2a','#2f4554','#61a0a8', '#a52a2a','#2f4554','#61a0a8'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    barBorderRadius:[10, 10, 0, 0],
//		                    label: {
//		                        show: true,
//		                        position: 'top',
//		                        formatter: '{b}\n{c}'
//		                    }
		                }
		            },
		          
		        },{
		            name:'病人量折线图',
		            type:'line',
		            data:[13237, 10520, 9586, 10880, 9974, 12224, 9786, 7897, 7653, 10234, 9842, 11021],
		            itemStyle : { normal: {label : {show: true}}}
		            },
		    ]
		};
		// 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
}

//report_1 急诊病人量  柱状图折线图混搭 以柱状图为准 功能: 控制提示框的样式
function formatterTip(params) {
    //移除重复的数据
    for (var i = 0; i < params.length; i++) {
        for (var j = params.length - 1; j > i; j--) {
            if (params[j].data == params[i].data) {
                params.splice(j, 1);
                break;
            }
        }
    }

    var tip = '';
    for (var i = 0; i < params.length; i++) {//这里是自己定义样式， params[i].marker 表示是否显示左边的那个小圆圈
        if (params[i].value != 0) {
            //tip = tip + params[i].marker + params[i].seriesName.substring(0, 4) + '年' + ':' + params[i].value + '<br/>';
        	tip = tip + params[i].seriesName.substring(0, 3) + ":"+params[i].value + "万" + '<br/>';
        }
    }

    return tip;
}
//医生患者比例
function querytable2(){
	var itemData=["医生","患者"];
	var valData=[1,16];
	iniPictorialBar("chart1",itemData,valData);
}
//护士患者比例
function querytable3(){
	var itemData=["护士","患者"];
	var valData=[1,8];
	iniPictorialBar2("chart2",itemData,valData);
}
function iniPictorialBar(id,itemData,valData){
	var spirit = 'image://../static/images/ren.png';
	var itemFontsize=16;
	var lableSize = 16;
	var gridLeft = 40;
	var gridRight = 50;
	var symbolSize = [13, 30];
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
//			title : {
//		        text: '急诊科医患比1:16',
//		        x: 'center'
		       
//		    },
	    tooltip: {
	    	show:false
	    },
	    xAxis: {
	        max: maxData,
	        splitLine: {show: false},
	        offset: 12,
	        axisLine: {
	        	show:false,
	            lineStyle: {
	                color: fontColor
	            }
	        },
	        axisTick: {show: false},
	        axisLabel: {show:false}
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
	        height:'100px',
	        width:'240px',
	        left: gridLeft,
	        right: gridRight
	    },
	    series: [{
	        type: 'pictorialBar',
	        symbol: spirit,
	        symbolRepeat: 'fixed',
	        symbolMargin: '10%',
	        symbolClip: true,
	        symbolSize: symbolSize,
	        symbolBoundingData: maxData,
	        color:symbolColor,
	        data: valData,
	        z: 20
	    }, {
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
	                formatter: '{c}',
	                position: 'right',
	                align:'right',
	                offset: [gridRight-30, 0],
	                textStyle: {
	                    color: fontColor,
//	                    fontSize: lableSize,
	                    fontFamily:'Microsoft YaHei'
	                }
	            }
	        },
	        animationDuration: 0,
	        symbolRepeat: 'fixed',
	        symbolMargin: '10%',
	        symbol: spirit,
	        symbolSize: symbolSize,
	        symbolBoundingData: maxData,
	        data: valData,
	        z: 5
	    }]
	};
	myChart.setOption(option);
}
function iniPictorialBar2(id,itemData,valData){
	var spirit = 'image://../static/images/ren.png';
	var itemFontsize=16;
	var lableSize = 16;
	var gridLeft = 40;
	var gridRight = 50;
	var symbolSize = [13, 30];
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
		//	title : {
		 //       text: '急诊科护患比1:8',
		       
		//    },
	    tooltip: {
	    	show:false
	    },
	    xAxis: {
	        max: maxData,
	        splitLine: {show: false},
	        offset: 12,
	        axisLine: {
	        	show:false,
	            lineStyle: {
	                color: fontColor
	            }
	        },
	        axisTick: {show: false},
	        axisLabel: {show:false}
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
	        height:'100px',
	        width:'120px',
	        left: gridLeft,
	        right: gridRight
	    },
	    series: [{
	        type: 'pictorialBar',
	        symbol: spirit,
	        symbolRepeat: 'fixed',
	        symbolMargin: '10%',
	        symbolClip: true,
	        symbolSize: symbolSize,
	        symbolBoundingData: maxData,
	        color:symbolColor,
	        data: valData,
	        z: 20
	    }, {
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
	                formatter: '{c}',
	                position: 'right',
	                align:'right',
	                offset: [gridRight-30, 0],
	                textStyle: {
	                    color: fontColor,
	                    fontSize: lableSize,
	                    fontFamily:'Microsoft YaHei'
	                }
	            }
	        },
	        animationDuration: 0,
	        symbolRepeat: 'fixed',
	        symbolMargin: '10%',
	        symbol: spirit,
	        symbolSize: symbolSize,
	        symbolBoundingData: maxData,
	        data: valData,
	        z: 5
	    }]
	};
	myChart.setOption(option);
}
//急诊各级患者比例
function querytable4(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart3'));
	// 指定图表的配置项和数据
	option = {
		    //title : {
		    //    text: '急诊各级患者比例',
		    //    x:'right'
		   // },
		    color:['#ff0000', '#fa8e23', '#f5e90a','#1c95eb' ],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{b} :  {d}%"
		    },
		    legend: {
		        orient : 'horizontal',
		        top:20,
		        x : 'left',
		        data:['一级','二级','三级','四级'],
//		        formatter: function(name) {
//                    var index = 0;
//                    var clientlabels = ['一级','二级','三级'];
//                    var clientcounts = ['41%','32%','18%','9%'];
////                    clientlabels.forEach(function(value,i){
////                        if(value == name){
////                            index = i;
////                        }
////                    });
////                    return name + "" + clientcounts[index];
//                }

		    },
		    toolbox: {
		        show : true,
//		        feature : {
//		            mark : {show: true},
//		            dataView : {show: true, readOnly: false},
//		            magicType : {
//		                show: true, 
//		                type: ['pie', 'funnel'],
//		                option: {
//		                    funnel: {
//		                        x: '25%',
//		                        width: '50%',
//		                        funnelAlign: 'left',
//		                        max: 1548
//		                    }
//		                }
//		            },
//		            restore : {show: true},
//		            saveAsImage : {show: true}
//		        }
		    },
		    calculable : true,
		    series : [
		        {
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '65%'],
		            data:[
		                {value:11, name:'一级'},
		                {value:18, name:'二级'},
		                {value:39, name:'三级'},
		                {value:32, name:'四级'}
		            ],
//		            formatter: function(name) {
//	                    var index = 0;
//	                    var clientlabels = ['一级','二级','三级'];
//	                    var clientcounts = ['41%','32%','18%','9%'];
//	                    clientlabels.forEach(function(value,i){
//	                        if(value == name){
//	                            index = i;
//	                        }
//	                    });
//	                    return name + "" + clientcounts[index];
//	                }
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}
//急诊抢救室患者死亡率
function querytable5(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart4'));
	// 指定图表的配置项和数据
	option = {
		   // title : {
		   //     text: '急诊抢救室患者死亡率',
		   //     x:'right'
		   // },
		    color:['#999','#a52a2a'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{b} :  {d}%"
		    },
		    legend: {
		        orient : 'vertical',
		        top: 20,
		        x : 'left',
		        data:['死亡患者','其他患者'],
//		        formatter: function(name) {
//                    var index = 0;
//                    var clientlabels = ['死亡患者','其他患者'];
//                    var clientcounts = ['1%','99%'];
//                    clientlabels.forEach(function(value,i){
//                        if(value == name){
//                            index = i;
//                        }
//                    });
//                    return name + "" + clientcounts[index];
//                }
		    },
		    toolbox: {
		        show : true,
//		        feature : {
//		            mark : {show: true},
//		            dataView : {show: true, readOnly: false},
//		            magicType : {
//		                show: true, 
//		                type: ['pie', 'funnel'],
//		                option: {
//		                    funnel: {
//		                        x: '25%',
//		                        width: '50%',
//		                        funnelAlign: 'left',
//		                        max: 1548
//		                    }
//		                }
//		            },
//		            restore : {show: true},
//		            saveAsImage : {show: true}
//		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:1, name:'死亡患者'},
		                {value:99, name:'其他患者'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}
//近5年急诊量变化
function querytable6(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('table2'));
	// 指定图表的配置项和数据
	option = {
		   
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['急诊量']
		    },
		    toolbox: {
		        show : false,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['2014','2015','2016','2017','2018']
		        }
		    ],
		    yAxis : [
		        {
		        	show:false,
		            type : 'value',
//		            axisLabel : {
//		                formatter: '{value} °C'
//		            }
		        }
		    ],
		    series : [
		       
		        {
		            name:'急诊量',
		            type:'line',
		            data:[105432, 126723, 152338, 113680, 148530],
		            itemStyle : { normal: {label : {show: true}}}
//		            markPoint : {
//		                data : [
//		                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
//		                ]
//		            },
//		            markLine : {
//		                data : [
//		                    {type : 'average', name : '平均值'}
//		                ]
//		            }
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}
