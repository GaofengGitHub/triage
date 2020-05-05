$(document).ready(function() {
	$(document).ready(
			function() {	
				//圆形进度条
				 var percent = parseInt($('.mask :first-child').text());
			        var baseColor = $('.circle-bar').css('background-color');

			        if( percent<=50 ){
			            $('.circle-bar-right').css('transform','rotate('+(percent*3.6)+'deg)');
			        }else {
			            $('.circle-bar-right').css({
			                'transform':'rotate(0deg)',
			                'background-color':baseColor
			            });
			            $('.circle-bar-left').css('transform','rotate('+((percent-50)*3.6)+'deg)');
			        }
				
//				showDepart();
//				setgradebtncss2();
				var date = new Date();
				var seperator1 = "-";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				//昨天
				if (strDate > 0) {
					if (strDate < 11) {
						if (strDate > 1) {
							strDate = strDate - 1;
						}
						strDate = "0" + strDate;
					} else {
						strDate = strDate - 1;
					}
				}
				//一月跨年问题
				if (month == "01") {
					var byyr = (date.getFullYear() - 1) + seperator1 + "12"
							+ seperator1 + strDate;
				} else {
					//一个月前
					if (month < "10") {
						//解决个位数月份少0的问题，变成01。liuxj20190216
						var byyr = date.getFullYear() + seperator1 + '0'
								+ (month - 1) + seperator1 + strDate;

					} else {
						var byyr = date.getFullYear() + seperator1 + (month - 1)
								+ seperator1 + strDate;
					}
				}

				var zr = date.getFullYear() + seperator1 + month + seperator1
						+ strDate;
				//    zr="2018-12-03";
				/*var laystarttime = laydate.render({
					elem : '#starttime', //指定元素
					min : '1901-01-01',
					max : zr,
					value : byyr,
					btns : [ 'clear', 'confirm' ],
					done : function(value, date) {
						layendtime.config.min = {
							year : date.year,
							month : date.month - 1, //关键  
							date : date.date,
							hours : 0,
							minutes : 0,
							seconds : 0
						};
					}
				});

				var layendtime = laydate.render({
					elem : '#endtime', //指定元素
					min : '1901-01-01',
					max : zr,
					value : zr,
					done : function(value, date) {
						if (value == "") {
							var date2 = new Date();
							var month = date2.getMonth();
							var strDate = date2.getDate();
							if (month >= 1 && month <= 9) {
								month = "0" + month;
							}
							if (strDate >= 0 && strDate <= 9) {
								if (strDate > 1) {
									strDate = strDate - 1;
								}
								strDate = "0" + strDate;
							}
							laystarttime.config.max = {
								year : date2.getFullYear(),
								month : month, //关键  
								date : strDate,
								hours : 0,
								minutes : 0,
								seconds : 0
							};
						} else {
							laystarttime.config.max = {
								year : date.year,
								month : date.month - 1, //关键  
								date : date.date,
								hours : 0,
								minutes : 0,
								seconds : 0
							};
						}
					}
				});*/

				$("#starttime").attr("placeholder", byyr);
				$("#endtime").attr("placeholder", zr);
				$("#endtime").datepicker({setDate:new Date(),autoclose:true,format: 'yyyy-mm-dd'});
			    $("#starttime").datepicker({setDate:new Date(byyr),autoclose:true,format: 'yyyy-mm-dd'});
				
			})
	querytable1();
	querytable2();
	querytable3();
	querytable4();
})


function random(){
    var r = Math.round(Math.random() * 100);
    return (r * (r % 2 == 0 ? 1 : -1));
}
function randomDataArray() {
    var d = [];
    var len = 3;
    while (len--) {
        d.push([
            random(),
            random(),
            100,
        ]);
    }
    console.log(d);
    return d;
}
//全国地图
function querytable3(){
	// 基于准备好的dom，初始化echarts实例
	var mydata = [  
	                {name: '北京',value: '137' },{name: '天津',value: 137 },  
	                {name: '上海',value: 366 },{name: '重庆',value: 109 },  
	                {name: '河北',value:35 },{name: '河南',value: 136 },  
	                {name: '云南',value: 58 },{name: '辽宁',value: 33 },  
	                {name: '黑龙江',value: 88 },{name: '湖南',value: 571 },  
	                {name: '安徽',value: 571 },{name: '山东',value: 389 },  
	                {name: '新疆',value: 10 },{name: '江苏',value:630 },  
	                {name: '浙江',value: 285 },{name: '江西',value: 251 },  
	                {name: '湖北',value: 3008 },{name: '广西',value: 22 },  
	                {name: '甘肃',value: 148 },{name: '山西',value: 263 },  
	                {name: '内蒙古',value: 11 },{name: '陕西',value: 137 },  
	                {name: '吉林',value: 43 },{name: '福建',value: 137 },  
	                {name: '贵州',value: 137 },{name: '广东',value: 171 },  
	                {name: '青海',value: 63 },{name: '西藏',value: 34 },  
	                {name: '四川',value: 65 },{name: '宁夏',value: 45 },  
	                {name: '海南',value: 11 },{name: '台湾',value: 22 },  
	                {name: '香港',value: 22 },{name: '澳门',value: 11 }  
	            ];
	var option = {  
            backgroundColor: '#f6f6f6',  
//            title: {  
//                text: '全国地图大数据',  
//                subtext: '',  
//                x:'center'  
//            },  
            tooltip : {  
                trigger: 'item'  
            },  
            
            //左侧小导航图标
            visualMap: {  
                show : false,  
                x: 'left',  
                y: 'center',  
                splitList: [   
                    {start: 1000, end:10000},{start: 500, end: 1000},  
                    {start: 300, end: 500},{start: 100, end: 300},  
                    {start: 30, end: 100},{start: 0, end: 30},  
                ],  
                color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']  
            },  
            
            //配置属性
            series: [{  
                name: '人次数',  
                type: 'map',  
                mapType: 'china',   
                roam: true,  
                label: {  
                    normal: {  
                        show: true, formatter:'{c}'  //省份名称  
                    },  
                    emphasis: {  
                        show: false  
                    }  
                },  
                data:mydata  //数据
            }]  
        };
	var myChart = echarts.init(document.getElementById('chart3'));
	// 指定图表的配置项和数据
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}
//来院方式
function querytable4(){
	 var myChart = echarts.init(document.getElementById('chart4'));
	 option = {
			    tooltip : {
			        trigger: 'axis'
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
			            data : ['自行来院','120','110','鄂州','固始','汉川','钟祥','东院','其他']
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
			            name:'',
			            type:'bar',
			            data:[75, 84, 21, 65, 88, 93, 76, 105, 88],
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

//周边
function querytable1(){
	 var myChart = echarts.init(document.getElementById('chart1'));
	 option = {
			    tooltip : {
			        trigger: 'item',
			        formatter: "{c} "
			        
			    },
			    legend: {
			        data:[]
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            dataZoom : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    xAxis : [
			        {show : false,
			            type : 'value',
			            splitNumber: 4,
			            scale: true
			        }
			    ],
			    yAxis : [
			        {show : false,
			            type : 'value',
			            splitNumber: 4,
			            scale: true
			        }
			    ],
			    series : [
			        {
			            name:'紫阳之星',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[2, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '紫阳之星', value: '紫阳之星2', xAxis:2, yAxis: 33}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'城市花园',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '城市花园', value: '城市花园3', xAxis:35, yAxis: 80}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'复兴路小区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '复兴路小区', value: '复兴路小区1', xAxis:60, yAxis: 60}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'大歌笛湖小区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '大歌笛湖小区', value: '大歌笛湖小区5', xAxis:70, yAxis: 20}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'紫笛苑小区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '紫笛苑小区', value: '紫笛苑小区2', xAxis:26, yAxis: 0}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'解放路182小区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '解放路182小区', value: '解放路182小区2', xAxis:15, yAxis: 15}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'紫阳街解放路社区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '紫阳街解放路社区', value: '紫阳街解放路社区1', xAxis:3, yAxis: 8}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        }
			       
			    ]
			};
	 myChart.setOption(option);
}
//区
function querytable2(){
	 var myChart = echarts.init(document.getElementById('chart2'));
	 option = {
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} : {c} "
			        
			    },
			    legend: {
			        data:[]
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            dataZoom : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    xAxis : [
			        {show : false,
			            type : 'value',
			            splitNumber: 4,
			            scale: true
			        }
			    ],
			    yAxis : [
			        {show : false,
			            type : 'value',
			            splitNumber: 4,
			            scale: true
			        }
			    ],
			    series : [
			        {
			            name:'东西湖区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[2, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '东西湖区', value: '5', xAxis:20, yAxis: 43}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'黄陂区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '黄陂区', value: '5', xAxis:40, yAxis: 75}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'新洲区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '新洲区', value: '4', xAxis:65, yAxis: 55}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'洪山区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '洪山区', value: '6', xAxis:55, yAxis: 40}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'汉南区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '汉南区', value: '4', xAxis:26, yAxis: 0}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'蔡甸区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '蔡甸区', value: '4', xAxis:15, yAxis: 15}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'硚口区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '硚口区', value: '26', xAxis:30, yAxis: 30}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        ,
			        {
			            name:'江岸区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '江岸区', value: '8', xAxis:45, yAxis: 45}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'青山区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '青山区', value: '6', xAxis:60, yAxis: 30}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'武昌区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '武昌区', value: '21', xAxis:58, yAxis: 18}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'江汉区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '江汉区', value: '33', xAxis:35, yAxis: 35}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'汉阳区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '汉阳区', value: '25', xAxis:41, yAxis: 15}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			        {
			            name:'江夏区',
			            type:'scatter',
			            symbolSize: 0,
			            data: [[35, 2, 0],[72, 62, 0]],
			            itemStyle:{
			                normal:{
			                  label:{
			                    formatter:function(a,b,c){return '';}
			                  }
			                }
			            },
			            markPoint : {
						                data : [
						                    {name: '江夏区', value: '5', xAxis:42, yAxis: 0}
//									{type : 'min', name: '自定义名字'} 
						                ],
						                label: {
						                    normal: {
						                        formatter: '{c}'
						                    }
						                }
						            },
						            
			        },
			    ]
			};
	 myChart.setOption(option);
}