$(document).ready(		
		function() {
			//自定义弹窗
			$(".report-modal-btn").click(function(){
				$(".chart-part09-modal").toggle();
			});
			
			report_9_option_1();
			report_9_option_2();
			report_9_option_3();
			report_9_option_4();
			
			//querypatientbackchance();
			$('#nianl').on('ifChecked', function(){
				$("#option_1").parent().show();
        		report_9_option_1();
			});
			$('#nianl').on('ifUnchecked', function(){
				$("#option_1").parent().hide();        	
			});
			$('#yujfz').on('ifChecked', function(){
				$("#option_2").parent().show();
        		report_9_option_2();
			});
			$('#yujfz').on('ifUnchecked', function(){
				$("#option_2").parent().hide();        	
			});
			$('#huiz').on('ifChecked', function(){
				$("#option_3").parent().show();
        		report_9_option_3();
			});
			$('#huiz').on('ifUnchecked', function(){
				$("#option_3").parent().hide();        	
			});
			$('#qux').on('ifChecked', function(){
				$("#option_1").parent().show();
        		report_9_option_4();
			});
			$('#qux').on('ifUnchecked', function(){
				$("#option_4").parent().hide();        	
			});
			
//            $("#nianl").change(function(){
//            	if($(this).is(':checked')){
//            		$("#option_1").parents("div").eq(0).css("display","");
//            		report_9_option_1();
//            	}else{
//            		$("#option_1").parents("div").eq(0).css("display","none");
//            	}
//            })
//            $("#yujfz").change(function(){
//            	if($(this).is(':checked')){
//            		$("#option_2").parents("div").eq(0).css("display","");
//            		report_9_option_2();
//            	}else{
//            		$("#option_2").parents("div").eq(0).css("display","none");
//            	}
//            })
//            
//            $("#huiz").change(function(){
//            	if($(this).is(':checked')){
//            		$("#option_3").parents("div").eq(0).css("display","");
//            		report_9_option_3();
//            	}else{
//            		$("#option_3").parents("div").eq(0).css("display","none");
//            	}
//            })
//            
//            $("#qux").change(function(){
//            	if($(this).is(':checked')){
//            		$("#option_4").parents("div").eq(0).css("display","");
//            		report_9_option_4();
//            	}else{
//            		$("#option_4").parents("div").eq(0).css("display","none");
//            	}
//            })
			
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

// 72小时重返率
function querypatientbackchance() {
	$('#patientbacklist').bootstrapTable({
        url: '#path()/report/querypatientbackchance',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        //sortable: false,                     //是否启用排序
        //sortOrder: "asc",                   //排序方式
        onClickRow: function (row,$element) {         //单击行的操作
        	 $('.changeColor').removeClass('changeColor');
             $($element).addClass('changeColor');
        },
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	    var temp = {   
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	       };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        //pageNumber:1,                       //初始化加载第一页，默认第一页
        //pageSize: 10,                       //每页的记录行数（*）
        //pageList: [10, 20,50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        fixedColumns: true, 
        fixedNumber: 1, 						//固定列数
        columns: [
        {field : 'id',title:'编号',sortable: false,valign: 'middle',visible : false},
        {
            field: 'fullname',
            title: '姓名',
            width:"10%"
        },{
            field: 'age',
            title: '年龄',
            width:"10%"
        },
        {
            field: 'grade',
            title: '分诊等级',
            formatter:function(value,row,index){    
            	var strhtml = '';
				var grade = row.grade1;
				//判断分级
				if(!(grade==null||grade=="")){
					grade = grade.substring(grade.length-1,grade.length);
				}
				switch(grade)
				{
				    case '1':
				    	//alert(11);
				    	strhtml+='<button type="button" class="btn btn-1001   btn-1001-selected btn-xs ">'+grade+'级</button>';
				        break;
				    case '2':
				    	strhtml+='<button type="button" class="btn btn-1002   btn-1002-selected btn-xs ">'+grade+'级</button>';
				        break;
				    case '3':
				    	strhtml+='<button type="button" class="btn btn-1003  btn-1003-selected  btn-xs ">'+grade+'级</button>';
				        break;
				    case '4':
				    	strhtml+='<button type="button" class="btn btn-1004   btn-1004-selected btn-xs ">'+grade+'级</button>';
				        break;
				    default:
				    	strhtml+='<button type="button" class="btn btn-primary btn-xs">未分级</button>';
				}
				return strhtml;    
            }
        }, {
            field: 'diagnosis',
            title: '诊断',
            width:"10%",
        },{
            field: 'grade2',
            title: '抢救结束等级',
            formatter:function(value,row,index){    
            	var strhtml = '';
				var grade = row.grade2;
				//判断分级
				if(!(grade==null||grade=="")){
					grade = grade.substring(grade.length-1,grade.length);
				}
				switch(grade)
				{
				    case '1':
				    	//alert(11);
				    	strhtml+='<button type="button" class="btn btn-1001   btn-1001-selected btn-xs ">'+grade+'级</button>';
				        break;
				    case '2':
				    	strhtml+='<button type="button" class="btn btn-1002   btn-1002-selected btn-xs ">'+grade+'级</button>';
				        break;
				    case '3':
				    	strhtml+='<button type="button" class="btn btn-1003  btn-1003-selected  btn-xs ">'+grade+'级</button>';
				        break;
				    case '4':
				    	strhtml+='<button type="button" class="btn btn-1004   btn-1004-selected btn-xs ">'+grade+'级</button>';
				        break;
				    default:
				    	strhtml+='<button type="button" class="btn btn-primary btn-xs">未分级</button>';
				}
				return strhtml;    
            }
        }, {
            field: 'td_name',
            title: '科室',
            width:"10%"
        },
        {
            field: 'cz',
            title: '操作',
            width:"15%",
            formatter:function(value,row,index){    
            	var strhtml = '';
        		strhtml += '<span class="label label-warning m10" onclick="showreport_9_panel(&quot;'+row.fullname+'&quot;);">查看</span>';
        		return strhtml;
            }
        }]
    });
	$('#patientbacklist').bootstrapTable('refresh');
}

//report_9 急诊抢救情况分析
function report_9_option_1() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_1'));
	// 指定图表的配置项和数据
	option = {
		    //title : {
		    //    text: '年龄因素',
		    //},
		    tooltip : {
		        trigger: 'axis'
		    },
		    grid: {
                y: '30%',
                y2: '20%',
                width: "85%",
            },
		    legend: {
		        data:[
                    '离开抢救室患者数',
		            '72小时重返数'
		        ]
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
		            type : 'category',
		            data : [ '0-25岁', '26-45岁', '46-60岁', '60-80岁', '80+' ]
		        },
		        {
		            type : 'category',
		            axisLine: {show:false},
		            axisTick: {show:false},
		            axisLabel: {show:false},
		            splitArea: {show:false},
		            splitLine: {show:false},
		            data : [ '0-25岁', '26-45岁', '46-60岁', '60-80岁', '80+' ]
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel:{formatter:'{value}人'}
		        }
		    ],
		    series : [
		              {
		                  name:'离开抢救室患者数',
		                  type:'bar',
		                  stack: 'sum',
		                  barCategoryGap: '50%',
		                  itemStyle: {normal: {color:'rgba(252,206,16,0.5)', label:{show:true,textStyle:{color:'#E87C25'}}}},
		                  data:[84,294,397,683,658]
		              },
		              {
		                  name:'72小时重返数',
		                  type:'bar',
		                  stack: 'sum',
		                  itemStyle: {normal: {color:'rgba(181,195,52,1)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}}},
		                  data : [ 0,2,4,15,22 ]
		              }
		          ]
		};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
// report_9 急诊抢救情况分析
function report_9_option_2() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_2'));
	// 指定图表的配置项和数据
	option = {
		//title : {
		//	text : '会诊因素',
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
			name : '72小时重返数',
			type : 'bar',
			data : [ 32,10,1,0 ],
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
			}
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

function report_9_option_3() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_3'));
	// 指定图表的配置项和数据
	option = {
			//title : {
			//	text : '预检分诊因素',
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
				data : [ '会诊', '没会诊' ]
			} ],
			yAxis : [ {
				type : 'value',
			// max:70
			}, ],
			series : [ {
				name : '72小时重返数',
				type : 'bar',
				data : [ 35,8],
				itemStyle : {
					normal : {
						color : function(params) {
							var colorList = [ '#f5e90a',
									'#1c95eb' ];
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

function report_9_option_4() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('option_4'));
	// 指定图表的配置项和数据
	option = {
		//title : {
		//	text : '去向因素',
		//},
		tooltip : {
			trigger : 'axis'
		},
		grid: {
            y: '10%',
            y2: '25%',
            width: "85%"
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
			start : 5,
			end : 60
		},
		xAxis : [ {
			axisLabel : {
				interval : 0,
				rotate : 0
			},
			type : 'category',
			boundaryGap : true,
			data: ['急诊内科', '急诊外科', '急诊神经内科', '急诊妇科', '急诊产科', '急诊皮肤科', '急诊耳鼻喉科', '急诊眼科', '急诊口腔科', '急诊精神科']
		} ],
		yAxis : [ {
			type : 'value'
		} ],
		series : [ {
			name : '人数',
			type : 'bar',
			data : [ 19,10,8,0,3,1,1,1,0,0 ],
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
						formatter : '{b}\n{c}'
					}
				}
			},
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/*function showreport_9_panel(fullname){
	$("#name").text(fullname);
	$("#report_9_panel").modal('show');
}
*/
function showreport_9_panel(th){
	var fullname = $(th).parents("tr").eq(0).find("td").eq(0).text();
	var age = $(th).parents("tr").eq(0).find("td").eq(1).text();
	var grade1 = $(th).parents("tr").eq(0).find("td").eq(2).text();
	var zhenduan = $(th).parents("tr").eq(0).find("td").eq(3).text();
	var grade2 = $(th).parents("tr").eq(0).find("td").eq(4).text();
	var depart = $(th).parents("tr").eq(0).find("td").eq(5).text();
	$("#name").text(fullname);
	$("#age").text(age);
	$("#diagnosis").text(zhenduan);
	$("#report_9_panel").modal('show');
}