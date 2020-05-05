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
	$('.counter').lemCounter({
		value_to_from_content: true,//从0 到 插件数字
		animate_duration: 0.5,//特效时间
		locale: "en-US"//美式数字
	});
})



//年龄结构
function querytable1(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart1'));
	// 指定图表的配置项和数据
	option = {
//		    color:['red','green','brown','blue','#F4E001','#F0805A','#26C0C0'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{b} :  {d}%"
		    },
		    legend: {
		        orient : 'horizontal',
		        top:20,
		        x : 'left',
		        data:['0-14','15-44','45-59','60-74','75-89','90以上'],
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
		            center: ['50%', '60%'],
		            data:[
		                {value:80, name:'0-14'},
		                {value:918, name:'15-44'},
		                {value:1576, name:'45-59'},
		                {value:2031, name:'60-74'},
		                {value:3022, name:'75-89'},
		                {value:529, name:'90以上'}
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
//性别结构
function querytable2(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart2'));
	// 指定图表的配置项和数据
	option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:['女','男','未说明']
		    },
		    toolbox: {
		        show : false,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true, 
		                type: ['pie', 'funnel'],
		                option: {
		                    funnel: {
		                        x: '25%',
		                        width: '50%',
		                        funnelAlign: 'center',
		                        max: 1548
		                    }
		                }
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'访问来源',
		            type:'pie',
		            radius : ['50%', '70%'],
		            itemStyle : {
		                normal : {
		                    label : {
		                        show : false
		                    },
		                    labelLine : {
		                        show : false
		                    }
		                },
		                emphasis : {
		                    label : {
		                        show : true,
		                        position : 'center',
		                        textStyle : {
		                            fontSize : '30',
		                            fontWeight : 'bold'
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:3170, name:'女'},
		                {value:4965, name:'男'},
		                {value:21, name:'未说明'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}
//费别
function querytable3(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chart3'));
	// 指定图表的配置项和数据
	option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{b} : {c} ({d}%)"
		    },
		    legend: {
		    	orient : 'vertical',
		        x : 'left',
		        y : 'bottom',
		        data:['职工医疗保险','居民医疗保险','农村合作医疗','贫困救助','商业医疗保险','全公费','全自费','其他']
		    },
		    toolbox: {
		        show : false,
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
		    },
		    calculable : true,
		    series : [
		        
		        {
		            name:'面积模式',
		            type:'pie',
		            radius : [10, 90],
		            center : ['52%', 130],
		            roseType : 'radius',
		            x: '40%',               // for funnel
		            max: 40,                // for funnel
		            sort : 'ascending',     // for funnel
		            data:[
		                {value:2975, name:'职工医疗保险'},
		                {value:3623, name:'居民医疗保险'},
		                {value:943, name:'农村合作医疗'},
		                {value:21, name:'贫困救助'},
		                {value:293, name:'商业医疗保险'},
		                {value:231, name:'全公费'},
		                {value:47, name:'全自费'},
		                {value:23, name:'其他'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}