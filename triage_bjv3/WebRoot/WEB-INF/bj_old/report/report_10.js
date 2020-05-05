$(document).ready(
		function() {
			report_10_option_1();
			
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
function report_10_option_1() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_1'));
	// 指定图表的配置项和数据
	option = {
			//title : {
			//	text : '急诊病种分析',
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
			dataZoom : {
				show : true,
				realtime : true,
				start : 0,
				end : 80
			},
			xAxis : [ {
				axisLabel: {
                    interval:0,
                    rotate:0
        	    },
				type : 'category',
				boundaryGap : true,
				data : [ '呼吸系统疾病', '心脏血管疾病', '肠胃系统疾病', '神经系统疾病', '骨骼系统疾病',
				         '泌尿系统疾病', '耳鼻喉系统疾病', '眼科疾病', '皮肤疾病', '妇科疾病'
				         , '产科疾病', '精神疾病', '物质误用', '其他' ]
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '人数',
				type : 'bar',
				data : [ 2966,2552,1576,123,251,141,154,122,121,55,43,21,18,13 ],
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