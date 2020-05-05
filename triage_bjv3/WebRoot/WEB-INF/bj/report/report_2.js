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
			
//			showDepart();
//			setgradebtncss2();
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
			$("#endtime").datepicker({setDate:new Date(),autoclose:true,format: 'yyyy-mm-dd'});
		    $("#starttime").datepicker({setDate:new Date(byyr),autoclose:true,format: 'yyyy-mm-dd'});
			$("#starttime").attr("placeholder", byyr);
			$("#endtime").attr("placeholder", zr);
			querydividgrade(byyr, zr);
			querydividstatus(byyr, zr);
			//	querydividstatus2(byyr,zr);
			querydividadmission(byyr, zr);
			querydividtime(byyr, zr);
			querydividtimee();
			//数字加跳动特效
			$('.counter').lemCounter({
				value_to_from_content: true,//从0 到 插件数字
				animate_duration: 0.5,//特效时间
				locale: "en-US"//美式数字
			});
		})

function querydividstatus(time1, time2) {
	$
			.ajax({
				type : "post",
				url : "#path()/report/querydividstatus2",
				data : {
					starttime : time1,
					endtime : time2
				},
				dataType : "json",
				async : false,
				success : function(result) {
					if (result.status == "200") {
						// 基于准备好的dom，初始化echarts实例
						var myChart = echarts.init(document
								.getElementById('linechart2'));
						// 指定图表的配置项和数据
						var option = {
							title : {
								text : '预检分诊状态分布',
								x : 'center'
							},
							tooltip : {
								trigger : 'item'
							},
							yAxis : {
								type : 'value'
							}
						};
						option.xAxis = [];
						var xAxis = {};
						xAxis.axisLabel = {};
						xAxis.axisLabel.interval = 0;
						xAxis.type = "category";
						xAxis.data = [];
						option.series = [];
						var serie = {};
						serie.type = 'bar';
						serie.data = [];
						serie.itemStyle = {
							normal : {
								color : function(params) {
									var colorList = [ '#C1232B', '#B5C334',
											'#FCCE10', '#E87C25', '#27727B',
											'#FE8463', '#9BCA63', '#FAD860',
											'#F3A43B', '#60C0DD', '#D7504B',
											'#C6E579', '#F4E001', '#F0805A',
											'#26C0C0' ];
									return colorList[params.dataIndex]
								},
								label : {
									show : true,
									position : 'top'
								}
							}
						}
						for ( var i = 0; i < result.rows.length; i++) {
							var status = result.rows[i].status;
							if (result.rows[i].status == "已分诊") {
								$("#yifenzhen").text(result.rows[i].statusnum);
							} else if (result.rows[i].status == "已接诊") {
								$("#yijiezhen").text(result.rows[i].statusnum);
							} else if (result.rows[i].status == "未分诊") {
								status = "待分诊";
								$("#yituihao").text(result.rows[i].statusnum);
							} else if (result.rows[i].status == "特殊人员") {
								$("#specialpetient").text(
										result.rows[i].statusnum);
							}
							xAxis.data.push(status);
							serie.data.push(result.rows[i].statusnum);
						}
						//假数据，lxj20190413
						serie.data = ['431','117','61','42'];
						option.xAxis.push(xAxis);
						option.series.push(serie);
						// 使用刚指定的配置项和数据显示图表。
						myChart.setOption(option);

					} else {
						console.log(result);
						tipbiandan('linechart2');
					}
				},
				error : function() {
				}
			});
}

function querydividadmission(time1, time2) {
	$
			.ajax({
				type : "post",
				url : "#path()/report/querydividadmission",
				data : {
					starttime : time1,
					endtime : time2
				},
				dataType : "json",
				//async: false,
				success : function(result) {

					if (result.status == "200") {
						var myChart = echarts.init(document
								.getElementById('linechart3'));
						// 指定图表的配置项和数据
						var option = {
							title : {
								text : '预检分诊来院方式分布',
								x : 'center'
							},
							tooltip : {
								trigger : 'item'
							},
							yAxis : [ {
								type : 'value'
							} ]
						};
						option.xAxis = [];
						option.series = [];
						var xAxis = {};
						xAxis.axisLabel = {};
						xAxis.axisLabel.interval = 0;
						xAxis.axisLabel.rotate = 40;
						xAxis.type = "category";
						xAxis.data = [];
						var serie = {};
						serie.type = 'bar';
						serie.data = [];
						serie.itemStyle = {
							normal : {
								color : function(params) {
									// build a color map as your need.
									var colorList = [ '#C1232B', '#B5C334',
											'#FCCE10', '#E87C25', '#27727B',
											'#FE8463', '#9BCA63', '#FAD860',
											'#F3A43B', '#60C0DD', '#D7504B',
											'#C6E579', '#F4E001', '#F0805A',
											'#26C0C0' ];
									return colorList[params.dataIndex]
								},
								label : {
									show : true,
									position : 'top'
								}
							}
						}
						for ( var i = 0; i < result.rows.length; i++) {
							xAxis.data.push(result.rows[i].admission);
							serie.data.push(result.rows[i].admissionnum);
						}
						//假数据，lxj20190413
						serie.data = ['16','325','19','44'];
						option.xAxis.push(xAxis);
						option.series.push(serie);
						// 使用刚指定的配置项和数据显示图表。
						myChart.setOption(option);

					} else {
						console.log(result);
						tipbiandan('linechart3');
					}
				},
				error : function() {
				}
			});
}
function querydividtime(time1, time2) {
	$
			.ajax({
				type : "post",
				url : "#path()/report/querydividtime",
				data : {
					starttime : time1,
					endtime : time2
				},
				dataType : "json",
				//async: false,
				success : function(result) {

					if (result.status == "200") {
						var myChart = echarts.init(document
								.getElementById('linechart4'));
						// 指定图表的配置项和数据
						option = {
							title : {
								text : '预检分诊时间分布',
								x : 'center'
							},
							tooltip : {
								trigger : 'item'
							},
							xAxis : [ {
								axisLabel : {
									interval : 0,
									rotate : 0
								},
								type : 'category',
								data : [ "00:00", "2:00", "4:00", "6:00",
										"8:00", "10:00", "12:00", "14:00",
										"16:00", "18:00", "20:00", "22:00" ]
							} ],
							yAxis : [ {
								type : 'value',
							} ],
//							grid : {
//								left : '0%',
//								right : '0',
////								top:'200px',
//								bottom : '1%',
//								containLabel : true
//							},
							series : [ {
								//name: 'ECharts例子个数统计',
								type : 'bar',
								itemStyle : {
									normal : {
										color : function(params) {
											// build a color map as your need.
											var colorList = [ '#C1232B',
													'#B5C334', '#FCCE10',
													'#E87C25', '#27727B',
													'#FE8463', '#9BCA63',
													'#FAD860', '#F3A43B',
													'#60C0DD', '#D7504B',
													'#C6E579', '#F4E001',
													'#F0805A', '#26C0C0' ];
											return colorList[params.dataIndex]
										},
										label : {
											show : true,
											position : 'top',
										//formatter: '{b}\n{c}'
										}
									}
								},
//								data : [ result.rows[0].count24,
//										result.rows[0].count2,
//										result.rows[0].count4,
//										result.rows[0].count6,
//										result.rows[0].count8,
//										result.rows[0].count10,
//										result.rows[0].count12,
//										result.rows[0].count14,
//										result.rows[0].count16,
//										result.rows[0].count18,
//										result.rows[0].count20,
//										result.rows[0].count22 ],
								//假数据，lxj20190413
								data : [ '0',
											'0',
											'0',
											'2',
											'101',
											'129',
											'34',
											'122',
											'55',
											'1',
											'0',
											'0'],
								markPoint : {
									tooltip : {
										trigger : 'item',
										backgroundColor : 'rgba(0,0,0,0)',
										formatter : function(params) {
											
										}
									},

								}
							} ]
						};
						// 使用刚指定的配置项和数据显示图表。
						myChart.setOption(option);
					} else {
						console.log(result);
						tipbiandan('linechart4');
					}
				},
				error : function() {
				}
			});
}

function tongji() {
	$(".tipbiaodan").remove();
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	if (starttime == "" && endtime == "") {
		return;
	} else if (starttime == "") {
		var date = new Date();
		var seperator1 = "-";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			if (strDate > 1) {
				strDate = strDate - 1;
			}
			strDate = "0" + strDate;
		}
		starttime = date.getFullYear() + seperator1 + month + seperator1 + "01";
	} else if (endtime == "") {
		var date = new Date();
		var seperator1 = "-";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			if (strDate > 1) {
				strDate = strDate - 1;
			}
			strDate = "0" + strDate;
		}
		endtime = date.getFullYear() + seperator1 + month + seperator1
				+ strDate;
	}
	querydividgrade(starttime, endtime);
	querydividstatus(starttime, endtime);
	querydividstatus2(starttime, endtime);
	querydividadmission(starttime, endtime);
	querydividtime(starttime, endtime);
}

function tipbiandan(id) {
	$("#" + id)
			.append(
					"<div class='tipbiaodan' style='color:#C3C7D5;text-align: center;font-size: 20px;'>无满足条件纪录</div");
}

//获取部门等待人数
function showDepart() {
	$
			.ajax({
				type : "post",
				url : "#path()/index/queryDepartAndWaitPatientNums",
				dataType : "json",
				data : {},
				success : function(result) {
					if ((result != null) && (result.status == 200)) {
						var rows = result.rows;

						$("#depart").html("");
						var str = "";
						var department = $("#department").html();
						for ( var i in rows) {
							var id = rows[i]["td_id"];
							var name = rows[i]["td_name"];
							var count = rows[i]["count"];
							var max = rows[i]["readyclinicalreceptionmax"];
							//4个换一行 第一个不用结尾
							if ((i % 4 == 0) && (i != 0)) {
								str += '</li>';
							}
							if (i % 4 == 0) {
								str += '<li>';
							}
							str += '<div class="deskItem';
							if (count >= max) {
								str += ' text-danger';
							}
							str += '">';
							str += '<span><img src="#path()/static/bj/images/iconHeart.png">';
							str += name;
							str += '</span>';
							str += count + '人';
							str += '</div>';

							department += '<li>';
							department += '<a onclick="setDept(&quot;' + id
									+ '&quot;,&quot;' + name + '&quot;)">'
									+ name + '</a>';
							department += '</li>';

						}
						str += '</li>';
						//console.log(department);
						$("#depart").html(str);
						$("#department").html(department);
					}
				},
				error : function() {
					//$.messager.alert('提示','获取失败，请联系管理员');
				}
			});
}


function querydividgrade(time1, time2) {
	$.ajax({
		type : "post",
		url : "#path()/report/querydividgrade",
		data : {
			starttime : time1,
			endtime : time2
		},
		dataType : "json",
		//async: false,
		success : function(result) {
			
			if (result.status == "200") {
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts
						.init(document.getElementById('linechart'));
				// 指定图表的配置项和数据
				var option = {
					title : {
						text : '预检分诊级别分布',
						x : 'center'
					},
					tooltip : {
						trigger : 'item'
					},
					yAxis : {
						type : 'value'
					}
				};
				option.xAxis = [];
				var xAxis = {};
				xAxis.axisLabel = {};
				xAxis.axisLabel.interval = 0;
				xAxis.type = "category";
				xAxis.data = [];
				option.series = [];
				var serie = {};
				serie.type = 'bar';
				serie.data = [];
				var colorList = [];
				var gradename = "";
				var num = 0;

				for ( var i = 0; i < result.rows.length; i++) {
					if (i < 4) {
						num += parseInt(result.rows[i].gradenum);
					}

					if (result.rows[i].gradename == 1) {
						gradename = "一级";
					}
					if (result.rows[i].gradename == 2) {
						gradename = "二级";
					}
					if (result.rows[i].gradename == 3) {
						gradename = "三级";
					}
					if (result.rows[i].gradename == 4) {
						gradename = "四级";
					}
					if (result.rows[i].gradename == 5) {
						gradename = "非急诊";
					}

					xAxis.data.push(gradename);
					serie.data.push(result.rows[i].gradenum);
					colorList.push(result.rows[i].gradecolor);
				}
				//假数据，lxj20190413
				serie.data = ['274','23','9','5','18'];
				
				//		        $("#yifenzhen").text(num);
				serie.itemStyle = {
					normal : {
						color : function(params) {
							// build a color map as your need.
							return colorList[params.dataIndex]
						},
						label : {
							show : true,
							position : 'top'
						}
					}
				}
				option.xAxis.push(xAxis);
				option.series.push(serie);
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			} else {
				console.log(result);
				tipbiandan('linechart');
			}
		},
		error : function() {
		}
	});
}

function querydividstatus2(time1, time2) {
	$.ajax({
		type : "post",
		url : "#path()/report/querydividstatus",
		data : {
			starttime : time1,
			endtime : time2
		},
		dataType : "json",
		async : false,
		success : function(result) {

			for ( var i = 0; i < result.rows.length; i++) {
				var status = result.rows[i].status;
				if (result.rows[i].status == "已分诊") {
					$("#yifenzhen").text(result.rows[i].statusnum);
				} else if (result.rows[i].status == "已接诊") {
					$("#yijiezhen").text(result.rows[i].statusnum);
				} else if (result.rows[i].status == "未分诊") {
					status = "待分诊";
					$("#yituihao").text(result.rows[i].statusnum);
				} else if (result.rows[i].status == "特殊人员") {
					$("#specialpetient").text(result.rows[i].statusnum);
				}
				//		        	xAxis.data.push(status);
				//		        	serie.data.push(result.rows[i].statusnum);
			}

		},
		error : function() {
		}
	});
}
//日分诊量曲线图
function querydividtimee() {
	
						var myChart = echarts.init(document
								.getElementById('linechart5'));
						// 指定图表的配置项和数据
						option = {
//							title : {
//								text : '预检分诊时间分布',
//								x : 'center'
//							},
							tooltip : {
								trigger : 'item'
							},
							xAxis : [ {
								axisLabel : {
									interval : 0,
									rotate : 70,
									textStyle: {    //文字样式
							            color: "black",
							            fontSize: 8,
							            fontFamily: 'Microsoft YaHei'
							            },
//									formatter:function(value)  
//		                               {  
//		                                   return value.split("").join("\n");  
//		                               }
//									 formatter:function(value,index)  
//		                                {  
//		                                    debugger  
//		                                    if (index % 2 != 0) {  
//		                                        return '\n\n' + value;  
//		                                    }  
//		                                    else {  
//		                                        return value;  
//		                                    }  
//		                                }
								},
								type : 'category',
//								data : [ "00:00", "2:00", "4:00", "6:00",
//										"8:00", "10:00", "12:00", "14:00",
//										"16:00", "18:00", "20:00", "22:00" ]
								data : [ "1", "2", "3", "4",
											"5", "6", "7", "8",
											"9", "10", "11", "12","13", "14", "15", "16",
											"17", "18", "19", "20",
											"21", "22", "23", "24" ,"25", "26", "27", "28",
											"29", "30"]
							} ],
							yAxis : [ {
								show:false,
								type : 'value',
							} ],
							grid : {
								x: 100,//控制x轴文字与底部的距离
						         y2: 200, //
								left : '-8%',
//								width:'420px',
								right : '1%',
								bottom : '5%',
								height:100,
								containLabel : true
							},
							series : [ {
								//name: 'ECharts例子个数统计',
								type : 'bar',
								barWidth : 8,
								itemStyle : {
//									normal : {
//										color : function(params) {
//											// build a color map as your need.
//											var colorList = [ '#C1232B',
//													'#B5C334', '#FCCE10',
//													'#E87C25', '#27727B',
//													'#FE8463', '#9BCA63',
//													'#FAD860', '#F3A43B',
//													'#60C0DD', '#D7504B',
//													'#C6E579', '#F4E001',
//													'#F0805A', '#26C0C0' ];
//											return colorList[params.dataIndex]
//										},
//										label : {
//											show : true,
//											position : 'top',
//										//formatter: '{b}\n{c}'
//										}
//									}
								},
								data : [ 274, 371, 336, 231, 335, 231, 189, 328, 278, 343, 245, 345,225, 156, 289,
								         254, 225, 226, 325, 224, 376, 324, 225, 315,265, 332, 237, 176, 265, 211 ],
								markPoint : {
									tooltip : {
										trigger : 'item',
										backgroundColor : 'rgba(0,0,0,0)',
										formatter : function(params) {
										}
									},

								}
							} ]
						};
						// 使用刚指定的配置项和数据显示图表。
						myChart.setOption(option);
					
}
