$(document).ready(
		function() {
			report_7_option_1();
			report_7_option_2();
			report_7_option_3();

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
			// 一月跨年问题
			if (month == "01") {
				var byyr = (date.getFullYear() - 1) + seperator1 + "12"
						+ seperator1 + strDate;
			} else {
				// 一个月前
				if (month < "10") {
					// 解决个位数月份少0的问题，变成01。liuxj20190216
					var byyr = date.getFullYear() + seperator1 + '0'
							+ (month - 1) + seperator1 + strDate;

				} else {
					var byyr = date.getFullYear() + seperator1 + (month - 1)
							+ seperator1 + strDate;
				}

			}
			var zr = date.getFullYear() + seperator1 + month + seperator1
					+ strDate;
			// zr="2018-12-03";
			/*var laystarttime = laydate.render({
				elem : '#starttime', // 指定元素
				min : '1901-01-01',
				max : zr,
				value : byyr,
				btns : [ 'clear', 'confirm' ],
				done : function(value, date) {
					layendtime.config.min = {
						year : date.year,
						month : date.month - 1, // 关键
						date : date.date,
						hours : 0,
						minutes : 0,
						seconds : 0
					};
				}
			});

			var layendtime = laydate.render({
				elem : '#endtime', // 指定元素
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
							month : month, // 关键
							date : strDate,
							hours : 0,
							minutes : 0,
							seconds : 0
						};
					} else {
						laystarttime.config.max = {
							year : date.year,
							month : date.month - 1, // 关键
							date : date.date,
							hours : 0,
							minutes : 0,
							seconds : 0
						};
					}
				}
			});*/
			$("#endtime").datepicker({setDate:new Date(),autoclose:true,format: 'yyyy-mm-dd'});
		    $("#starttime").datepicker({setDate:new Date(byyr),autoclose:true,format: 'yyyy-mm-dd'});
			$("#starttime").attr("placeholder", byyr);
			$("#endtime").attr("placeholder", zr);
		})
//report_7 急诊科室接诊情况
function report_7_option_1() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_1'));
	// 指定图表的配置项和数据
	option = {
		//title : {
			//text : '接诊平均时间',
		//},
		tooltip : {
			trigger : 'axis'
		},
		grid: {
            y: '10%',
            y2: '25%',
            width: "85%",
        },
		/*toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},*/
		calculable : true,
		xAxis : [ {
			axisLabel : {
				interval : 0,
				rotate : 0
			},
			type : 'category',
			data : [ '一级', '二级', '三级', '四级' ]
		} ],
		yAxis : [ {
			type : 'value',
		// max:70
		}, ],
		series : [ {
			name : '患者数',
			type : 'bar',
			data : [ 0, 5, 22, 90 ],
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
						formatter : '{c}'
					}
				}
			},
			markLine : {
			symbol:"none",  //去掉警戒线最后面的箭头
			lineStyle: {
                normal: {
                    type: 'dashed'
                }
            },
			label:{
				normal: {
                    show: true, 
                    //position: 'middle',
                    //formatter: '标准线',
                  },
				//position:"start"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
			},
            data : [
                {
					silent:false,             //鼠标悬停事件  true没有，false有
					lineStyle:{               //警戒线的样式  ，虚实  颜色
                        //type:"solid",
						color:"#ff0000",
					},
					xAxis: -1,
					yAxis: 0
				},{
					silent:false,             //鼠标悬停事件  true没有，false有
					lineStyle:{               //警戒线的样式  ，虚实  颜色
                        //type:"solid",
						color:"#fa8e23",
					},
					yAxis: 10
				},{
					silent:false,             //鼠标悬停事件  true没有，false有
					lineStyle:{               //警戒线的样式  ，虚实  颜色
                        //type:"solid",
						color:"#f5e90a",
					},
					yAxis: 30
				},{
					silent:false,             //鼠标悬停事件  true没有，false有
					lineStyle:{               //警戒线的样式  ，虚实  颜色
                        //type:"solid",
						color:"#1c95eb",
					},
					yAxis: 60
				}
            ]
        }
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/*function report_7_option_2() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_2'));
	// 指定图表的配置项和数据
	option = {
			//title : {
			//	text : '科室候诊峰值',
			//},
			tooltip : {
				trigger : 'axis'
			},
			legend: {
		        data:[
                    '候诊人数',
		            '标准线'
		        ]
		    },
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'line', 'bar' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			dataZoom : {
				show : true,
				realtime : true,
				start : 5,
				end : 80
			},
			xAxis : [ {
				axisLabel: {
                    interval:0,
                    rotate:0
        	    },
				type : 'category',
				boundaryGap : true,
				data : [ '急诊内科', '急诊外科', '急诊神经内科', '急诊妇科', '急诊产科', '急诊皮肤科',
						'急诊耳鼻喉科', '急诊眼科', '急诊口腔科', '急诊精神科' ]
			},
	        {
	            type : 'category',
	            axisLine: {show:false},
	            axisTick: {show:false},
	            axisLabel: {show:false},
	            splitArea: {show:false},
	            splitLine: {show:false},
	            data : [ '急诊内科', '急诊外科', '急诊神经内科', '急诊妇科', '急诊产科', '急诊皮肤科',
							'急诊耳鼻喉科', '急诊眼科', '急诊口腔科', '急诊精神科' ]
	        } ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name:'标准线',
                type:'bar',
                data : [ 60,60,25,12,10,30,30,18,18,15 ],
				itemStyle : {
					normal : {
						color : function(params) {
							var colorList = [ '#C1232B', '#B5C334', '#FCCE10',
									'#E87C25', '#27727B', '#FE8463', '#9BCA63',
									'#FAD860', '#F3A43B', '#60C0DD', '#D7504B',
									'#C6E579', '#F4E001', '#F0805A', '#26C0C0' ];
							return colorList[params.dataIndex]
						},
						label : {
							show : true,
							position : 'top',
							formatter : '{c}'
						}
					}
				},
				stack: 'sum',
                barCategoryGap: '50%',
                itemStyle: {normal: {color:'rgba(252,206,16,0.5)', label:{show:true,textStyle:{color:'#E87C25'}}}},
			},
            {
            	name : '候诊人数',
				type : 'bar',
				//[ 60,60,25,12,10,30,30,18,18,15 ]
				data : [ 141-60,95-60,23,30-12,17-10,56-30,65-30,45-18,22-18,12 ],
                stack: 'sum',
                itemStyle: {
                	normal: {
	                	color:'rgba(181,195,52,1)',
		                label:{
		                	show:true,
		                	formatter:function(p){
		                		console.log(p);
		                		return p.value > 0 ? (p.value +'\n'):'';
		                	}
					    }
			        }
			    }
            } ]
		};
	myChart.setOption(option);
	var option =  {
            tooltip : {
                axisPointer : {
                    type : 'shadow'
                }
            },
            toolbox: {
                feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
                }
            },
            grid: {
                y: '10%',
                y2: '10%'
            },
             legend: {
                data:['候诊人数','标准线']
            },
            xAxis:{
                type: 'category',
                axisLabel:{
                interval: 0,    // {number}
                rotate: 40
                },
                data : [ '急诊内科', '急诊外科', '急诊神经内科', '急诊妇科', '急诊产科', '急诊皮肤科',
							'急诊耳鼻喉科', '急诊眼科', '急诊口腔科', '急诊精神科' ]
                },
                yAxis : [ {
    				type : 'value'
    			} ],
            series: [
                {
                    name:'候诊人数',
                    type:'bar',
                    stack:'xxx',
                    itemStyle: {
                        normal: {
                            color: '#548dd5'
                        }
                    },
                    data: [["急诊内科",141-60],["急诊外科",95-60]]
                  //data : [ 141-60,95-60,23,30-12,17-10,56-30,65-30,45-18,22-18,12 ],
                },
                {
                    name:'标准线',
                    type:'bar',
                    stack:'xxx',
                    itemStyle: {
                        normal: {
                            color: '#000'
                        }
                    },

                    data:  [["急诊内科",60],["急诊外科",60]]
                    //data : [ 60,60,25,12,10,30,30,18,18,15 ],
                },
                {
                    name:'合计',
                    type:'bar',
                    stack:'xxx',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#000'
                            },
                            formatter:''
                        }
                    },
                    data:  [["急诊内科",0],["急诊外科",0]]    //思路一：给series集合末尾多加一栏用于展示合计，但是值都是0；缺点：必须根据xAxis的data生成一组为空的数据，且tooltip不能加trigger: 'axis',这个条件，不然会展示合计：0
                }
            ]
}; 

	var series = option["series"];
    var fun = function (params) { 
            var data3 =0;
            for(var i=0,l=series.length;i<l;i++){ 
                data3 += series[i].data[params.dataIndex][1]
            } 
            return data3
        }
    //加载页面时候替换最后一个series的formatter
    series[series.length-1]["label"]["normal"]["formatter"] = fun 
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //legend点击事件，根据传过来的obj.selected得到状态是true的legend对应的series的下标，再去计算总和
    myChart.on("legendselectchanged", function(obj) {
            var b = obj.selected
              , d = [];
              //alert(JSON.stringify(b))
              for(var key in b){
                if(b[key]){
                    //alert(key)
                    for(var i=0,l=series.length;i<l;i++){  
                        var changename = series[i]["name"]; 
                        if(changename == key){ 
                            d.push(i);//得到状态是true的legend对应的series的下标
                        }
                    }
                }
             }   
            var fun1 = function (params) { 
                var data3 =0;
                for(var i=0,l=d.length;i<l;i++){
                    for(var j=0,h=series.length;j<h;j++){ 
                        if(d[i] == j){
                            data3 += series[j].data[params.dataIndex][1] //重新计算总和
                        }
                    }
                }
                return data3
            }
            series[series.length-1]["label"]["normal"]["formatter"] = fun1
            myChart.setOption(option);

      })

}*/

function report_7_option_2() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_2'));
	// 指定图表的配置项和数据
	option = {
			//title : {
			//	text : '科室候诊峰值',
			//},
			tooltip : {
				trigger : 'axis'
			},
			grid: {
                y: '10%',
                y2: '25%',
                width: "85%",
            },
			/*toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'line', 'bar' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},*/
			calculable : true,
			/*dataZoom : {
				show : true,
				realtime : true,
				start : 5,
				end : 80
			},*/
			xAxis : [ {
				axisLabel: {
                    interval:0,
                    rotate:0
        	    },
				type : 'category',
				boundaryGap : true,
				data : [ '急诊内科', '急诊外科', '急诊神经内科', '急诊妇科', '急诊产科', '急诊皮肤科',
						'急诊耳鼻喉科', '急诊眼科', '急诊口腔科', '急诊精神科' ]
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '候诊人数',
				type : 'bar',
				data : [ 141,95,23,30,17,56,65,45,22,12 ],
				itemStyle : {
					normal : {
						color : function(params) {
							var colorList = [ '#C1232B', '#B5C334', '#FCCE10',
									'#E87C25', '#27727B', '#FE8463', '#9BCA63',
									'#FAD860', '#F3A43B', '#60C0DD', '#D7504B',
									'#C6E579', '#F4E001', '#F0805A', '#26C0C0' ];
							return colorList[params.dataIndex]
						},
						label : {
							show : true,
							position : 'top',
							formatter : '{c}'
						}
					}
				},
			} ]
		};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

function report_7_option_3() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_3'));
	// 指定图表的配置项和数据
	option = {
		//title : {
		//	text : '科室候诊峰值',
		//},
		tooltip : {
			trigger : 'axis'
		},
		legend: {
	        data:['分诊人数','接诊人数']
	    },
	    grid: {
            y: '20%',
            y2: '20%',
            width: "85%",
        },
		/*toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},*/
		calculable : true,
		/*dataZoom : {
			show : true,
			realtime : true,
			start : 5,
			end : 80
		},*/
		xAxis : [ {
			axisLabel: {
                interval:0,
                rotate:0
    	    },
			type : 'category',
			boundaryGap : true,
			data : [ '急诊内科', '急诊外科', '急诊神经内科', '急诊妇科', '急诊产科', '急诊皮肤科',
					'急诊耳鼻喉科', '急诊眼科', '急诊口腔科', '急诊精神科' ]
		} ],
		yAxis : [ {
			type : 'value'
		} ],
		series : [ {
			name : '分诊人数',
			type : 'bar',
			data : [ 2547,1831,994,534,366,543,554,321,332,134 ],
			itemStyle : {
				normal : {
					color : '#D7504B',
					label : {
						show : true,
						position : 'top',
						formatter : '{c}'
					}
				}
			},
		},{
			name : '接诊人数',
			type : 'bar',
			data : [ 2533,1820,1012,514,376,531,542,332,341,122 ],
			itemStyle : {
				normal : {
					color :'#B5C334',
					label : {
						show : true,
						position : 'top',
						formatter : '{c}'
					}
				}
			},
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
