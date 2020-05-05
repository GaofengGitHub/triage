$(document).ready(
		function() {
			//圆形进度条02
			 var percent02 = parseInt($('.mask02 :first-child').text());
		       var baseColor02 = $('.circle-bar02').css('background-color');

		       if( percent02<=50 ){
		           $('.circle-bar-right02').css('transform','rotate('+(percent02*3.6)+'deg)');
		       }else {
		           $('.circle-bar-right02').css({
		               'transform':'rotate(0deg)',
		               'background-color':baseColor02
		           });
		           $('.circle-bar-left02').css('transform','rotate('+((percent02-50)*3.6)+'deg)');
		       }
		       //圆形进度条03
		       var percent03 = parseInt($('.mask03 :first-child').text());
		       var baseColor03 = $('.circle-bar03').css('background-color');

		       if( percent03<=50 ){
		           $('.circle-bar-right03').css('transform','rotate('+(percent03*3.6)+'deg)');
		       }else {
		           $('.circle-bar-right03').css({
		               'transform':'rotate(0deg)',
		               'background-color':baseColor03
		           });
		           $('.circle-bar-left03').css('transform','rotate('+((percent03-50)*3.6)+'deg)');
		       }
			
			report_8_option_1();
			//report_8_option_2();
			report_8_option_3();

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

//report_8 急诊抢救情况分析
function report_8_option_1() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_1'));
	// 指定图表的配置项和数据
	option = {
		title : {
			text : '动态评估抢救患者等级变化分析',
		},
		tooltip : {
			trigger : 'axis'
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
			data : [ '等级下降','等级未变','等级上升' ]
		} ],
		yAxis : [ {
			type : 'value',
		// max:70
		}, ],
		series : [ {
			name : '患者数',
			type : 'bar',
			data : [ 2081,33,18 ],
			itemStyle : {
				normal : {
					color : function(params) {
						var colorList = [ '#ff0000', '#fa8e23', '#f5e90a' ];
						return colorList[params.dataIndex]
					},
					label : {
						show : true,
						position : 'top',
						formatter : '{c}'
					}
				}
			}
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/*function report_8_option_2() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_2'));
	// 指定图表的配置项和数据
	option = {
			title : {
				text : '科室候诊峰值',
			},
			tooltip : {
				trigger : 'axis'
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
				end : 35
			},
			xAxis : [ {
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
				data : [ 948, 1254, 787, 845, 547, 786, 756, 724, 703, 772 ],
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
}*/

function report_8_option_3() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_3'));
	// 指定图表的配置项和数据
	option = {
			//title : {
			//	text : '抢救病种分析',
			//},
			tooltip : {
				trigger : 'axis'
			},
			grid: {
                y: '10%',
                y2: '25%',
                width: "85%",
                	/*zlevel: 0,
    				z: 0,
    				x: 80,
    				y: 60,
    				x2: 80,
    				y2: 60,
    				width: <自适应>,
    				height: <自适应>,
    				backgroundColor: 'rgba(0,0,0,0)',
    				borderWidth: 1,
    				borderColor: '#ccc',*/
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
				data : [ '急性心肌梗死', '急性上消化道出血', '危重孕产妇', '急性呼衰', '急性左心衰', '急性脑卒中', '多发伤', '急性颅脑外伤', '急性创伤' ]
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '人数',
				type : 'bar',
				data : [ 35, 34, 24, 44, 45, 26, 45, 43, 55 ],
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
