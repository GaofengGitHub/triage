var tu_id ='#userId()';
var UseEmr_id='';
$(document).ready(function() {
	setgradebtncss2();// 危险报警提示弹窗样式
	//胸痛中心患者收入心内科/CCU比例
	queryxtzxpatientsr();
    //急性消化道出血患者24小时内完成急诊胃镜比例
	queryjxxhdcx();
	//监护床位危重病患比
	queryjhcwwzbhb();
	//急诊抢救室患者死亡率
    queryjzqjspatswl('2019-01-01', '2019-12-31');
    //脓毒症患者1小时内使用抗生素率
    queryndzpatientkss();
    //脓毒症患者1小时内留取血培养率
    queryndzpatientqxpy();
    //ROSC成功率
    queryrosc();
    //急诊患者抗生素使用率
    queryjzpatientkss();
    //急诊就诊费用
    queryjzfy();
	querydividgrade('2019-01-01', '2019-12-31');
	queryRstTime('2019-01-01', '2019-12-31');
	$(".zkgl-page02-btn").click(function(){
		$(".zkgl-page02").show();
		$(".zkgl-page01").hide();
		findUseEmr(tu_id);
	});
	$(".zkgl-page01-btn").click(function(){
		$(".zkgl-page01").show();
		$(".zkgl-page02").hide();
	});
	
});

function querydividgrade(time1, time2) {

	// 饼图模板
	
	// 饼图动态赋值
	var myChart = echarts.init(document.getElementById('linechart'));
	var app = {};
	option = null;
	    $.ajax({
	           type: "post",
	           url: '#path()/report/querydividgrade',
	           data : {starttime : time1,
						endtime : time2},
	           cache : false,    // 禁用缓存
	           dataType: "json",
	           success: function(result) {
						var num1='';
						var num2='';
						var num3='';
						var num4='';
						var colorlist=['#dcd177'];
						if(result.rows != null){
							$('#linechart').show();
							for ( var i = 0; i < result.rows.length; i++) {
						
								if (result.rows[i].gradename == 1) {
									gradename = "Ⅰ级";
									num1 =result.rows[i].gradenum;
								}
								if (result.rows[i].gradename == 2) {
									gradename = "Ⅱ级";
									num2 =result.rows[i].gradenum;
								}
								if (result.rows[i].gradename == 3) {
									gradename = "Ⅲ级";
									num3 =result.rows[i].gradenum;
								}
								if (result.rows[i].gradename == 4) {
									gradename = "Ⅳ级";
									num4 =result.rows[i].gradenum;
								}
								colorlist.push(result.rows[i].gradecolor);
							}
								
			option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{b}: {c}(人)<br\>" +
			        		   "占比：({d}%)"
			    },
			    color: colorlist,
			    
			    /*
				 * grid: { left: '1%',//生成的图片和左边的间距 right: '2%',//生成的图片和右边的间距’,
				 * bottom: '10%',//生成的图片和底部的间距 top: '25%',//生成的图片和顶部的间距
				 * containLabel: true//为ture才会生效以上的设置 },
				 */
			    
			    legend: {
			        orient: 'vertical',
			        x: 'left',
			        y: 'top',
			        data:['Ⅰ级','Ⅱ级','Ⅲ级','Ⅳ级','总数']
			    },
			    series: [
			        {
			            name:'',
			            type:'pie',
			            selectedMode: 'single',
			            radius: [0, '50%'],
			            center: ['50%', '65%'],
			            label: {
			                normal: {
			                    position: 'center',
			                    // formatter: '总数 \n {c}(人)',
			                    formatter: [
			                                '总数',
			                                '{c}(人)'
			                            ].join('\n'),
			                    color:'black'
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:num1+num2+num3+num4, name:'总数'},
			               
			            ]
			        },
			        {
			            name:' ',
			            type:'pie',
			            // radius: ['40%', '55%'],
			            radius : ['32%','68%'],
			            center: ['50%', '65%'],
			            label: {
			                normal: {
			                    formatter: '{per|{d}%}',
			                    backgroundColor: '#eee',
			                    borderColor: '#aaa',
			                    borderWidth: 1,
			                    borderRadius: 4,
			                    rich: {
			                        a: {
			                            color: '#999',
			                            lineHeight: 22,
			                            align: 'center'
			                        },
			                        hr: {
			                            borderColor: '#aaa',
			                            width: '100%',
			                            borderWidth: 0.5,
			                            height: 0
			                        },
			                        b: {
			                            fontSize: 16,
			                            lineHeight: 33
			                        },
			                        per: {
			                            color: '#eee',
			                            backgroundColor: '#334455',
			                            padding: [2, 4],
			                            borderRadius: 2
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:num1, name:'Ⅰ级'},
			                {value:num2, name:'Ⅱ级'},
			                {value:num3, name:'Ⅲ级'},
			                {value:num4, name:'Ⅳ级'}
			            ]
			        }
			    ]
			};
			// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
						}else{
							$('#linechart').hide();
						}
	           },
	           error: function(XMLHttpRequest, textStatus, errorThrown) {
	               alert("查询失败");
	           }
	       });
}

function tongji(){
	var year=$('#YSelect option:selected').text();
	var start =year+'-01-01';
	var end =year+'-12-31'
	queryRstTime(start, end);
	querydividgrade(start, end);
	queryjzqjspatswl(start, end);
	
}
//抢救室滞留时间
function queryRstTime(time1, time2){
	$.ajax({
        type: "post",
        url: "#path()/qualitymanage/queryRstTime",
        data:{
        	starttime:time1,
        	endtime:time2
        },
        dataType: "json",
        //async:false,
        success: function(result){
        	if(!isNaN(result.rows)){ 
        		$('#div_rct_time').html('<span><font class="counter" >'+result.rows+'</font>min</span>');
        	}else{
        		$('#div_rct_time').html('无数据');
        	}
		},
		error : function() {
		}
	});
	
}
function queryxtzxpatientsr(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('report_11_pie1'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
		        		   "占比：({d}%)"
		    },
		    color: ['#dcd177','#334352','#709fa7'],
		    
		    /*
		    grid: {
		    	left: '1%',//生成的图片和左边的间距
		    	right: '2%',//生成的图片和右边的间距’,
		    	bottom: '10%',//生成的图片和底部的间距
		    	top: '25%',//生成的图片和顶部的间距
		    	containLabel: true//为ture才会生效以上的设置
		    },*/
		    
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        y: 'top',
		        data:['胸痛中心患者总数','收入心内科/CCU患者','其他患者']
		    },
		    series: [
		        {
		            name:'',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '50%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    //formatter: '总数  \n {c}(人)',
		                    formatter: [
		                                '总数',
		                                '{c}(人)'
		                            ].join('\n'),
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:257, name:'胸痛中心患者总数'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            //radius: ['40%', '55%'],
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:115, name:'收入心内科/CCU患者'},
		                {value:142, name:'其他患者'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}


function queryjxxhdcx(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('report_12_pie1'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
     		               "占比：({d}%)"
		    },
		    color: ['#dcd177','#334352','#709fa7'],
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['消化道出血患者总数','24小时内完成急诊胃镜检查的消化道出血患者','其他患者']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '50%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    formatter: '总数 \n {c}(人)',
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:131, name:'消化道出血患者总数'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:38, name:'24小时内完成急诊胃镜检查的消化道出血患者'},
		                {value:93, name:'其他患者'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}

function queryjhcwwzbhb(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('report_13_pie1'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
     		               "占比：({d}%)"
		    },
		    color: ['#dcd177','#334352','#709fa7'],
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['抢救室固定床位数','EICU固定床位','其他床位']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '50%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    formatter: '总数 \n {c}(床)',
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:1386, name:'抢救室固定床位数'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:85, name:'EICU固定床位'},
		                {value:1301, name:'其他床位'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}



function queryjzqjspatswl(time1,time2){
	// 基于准备好的dom，初始化echarts实例
	var allnum=0;
	var die=0;
	var other=0;
	$.ajax({
        type: "post",
        url: "#path()/qualitymanage/queryRstDie",
        data:{
        	starttime:time1,
        	endtime:time2
        },
        dataType: "json",
        async:false,
        success: function(result){
        	allnum = result.rows[0].allp;
        	die = result.rows[0].die;
        	other=allnum-die
		},
		error : function() {
		}
	});
	var myChart = echarts.init(document.getElementById('report_14_pie3'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
     		               "占比：({d}%)"
		    },
		    color: ['#dcd177','#334352','#709fa7'],
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['同期急诊抢救室抢救患者总数','急诊抢救室死亡患者','其他患者']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '49%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    formatter: '总数 \n {c}(人)',
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:allnum, name:'同期急诊抢救室抢救患者总数'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:die, name:'急诊抢救室死亡患者'},
		                {value:other, name:'其他患者'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	if(allnum == 0){
		$('#report_14_pie3').hide();
	}else{
		$('#report_14_pie3').show();
	}
	 myChart.setOption(option);
}

//脓毒症患者1小时内使用抗生素率
function queryndzpatientkss(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('pie_chart1'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
     		               "占比：({d}%)"
		    },
		    width : '800',
		    heigth: '600',
		    color: ['#dcd177','#334352','#709fa7'],
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['脓毒症患者总数','脓毒症患者1小时内使用抗生素患者','其他患者']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '50%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    formatter: '总数 \n {c}(人)',
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:326, name:'脓毒症患者总数'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:115, name:'脓毒症患者1小时内使用抗生素患者'},
		                {value:211, name:'其他患者'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}

function queryndzpatientqxpy(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('pie_chart2'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
     		               "占比：({d}%)"
		    },
		    color: ['#dcd177','#334352','#709fa7'],
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['脓毒症患者总数','脓毒症患者1小时内留取血培养患者','其他患者']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '50%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    formatter: '总数 \n {c}(人)',
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:460, name:'脓毒症患者总数'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:119, name:'脓毒症患者1小时内留取血培养患者'},
		                {value:341, name:'其他患者'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}

function queryrosc(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('pie_chart3'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
     		               "占比：({d}%)"
		    },
		    color: ['#dcd177','#334352','#709fa7'],
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['同期急诊呼吸心脏骤停行心肺复苏术总例次数','ROSC成功总例次数','ROSC失败总例次数']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '50%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    formatter: '总数 \n {c}(次)',
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:435, name:'同期急诊呼吸心脏骤停行心肺复苏术总例次数'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:115, name:'ROSC成功总例次数'},
		                {value:210, name:'ROSC失败总例次数'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}

function queryjzpatientkss(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('pie_chart4'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
     		               "占比：({d}%)"
		    },
		    color: ['#dcd177','#334352','#709fa7'],
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['急诊患者总例次数','急诊使用抗生素治疗患者总例次数','其他患者']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '50%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    formatter: '总数 \n {c}(次)',
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:325, name:'急诊患者总例次数'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:115, name:'急诊使用抗生素治疗患者总例次数'},
		                {value:210, name:'其他患者'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}


function queryjzfy(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('pie_chart5'));
	// 指定图表的配置项和数据
	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}: {c}(人)<br\>" +
     		               "占比：({d}%)"
		    },
		    color: ['#dcd177','#334352','#709fa7','#b9a39b','#b34038'],
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['就诊总花费','挂号费/医事服务费','药费','诊疗费','检查检验费用']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            selectedMode: 'single',
		            radius: [0, '50%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    position: 'center',
		                    formatter: '总数 \n {c}(元)',
		                    color:'black'
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:1907, name:'就诊总花费'},
		               
		            ]
		        },
		        {
		            name:' ',
		            type:'pie',
		            radius : ['32%','68%'],
		            center: ['50%', '65%'],
		            label: {
		                normal: {
		                    formatter: '{per|{d}%}',
		                    backgroundColor: '#eee',
		                    borderColor: '#aaa',
		                    borderWidth: 1,
		                    borderRadius: 4,
		                    rich: {
		                        a: {
		                            color: '#999',
		                            lineHeight: 22,
		                            align: 'center'
		                        },
		                        hr: {
		                            borderColor: '#aaa',
		                            width: '100%',
		                            borderWidth: 0.5,
		                            height: 0
		                        },
		                        b: {
		                            fontSize: 16,
		                            lineHeight: 33
		                        },
		                        per: {
		                            color: '#eee',
		                            backgroundColor: '#334455',
		                            padding: [2, 4],
		                            borderRadius: 2
		                        }
		                    }
		                }
		            },
		            data:[
		                {value:215, name:'挂号费/医事服务费'},
		                {value:980, name:'药费'},
		                {value:402, name:'诊疗费'},
		                {value:310, name:'检查检验费用'}
		            ]
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
	 myChart.setOption(option);
}
function saveUseEmr(th){
//	id, tu_id, writtener, department, is_use, duties, tel
	var is_use= $("input[name='is_use']:checked").val();
	var writtener = $('#writtener').val();
	if(writtener==''){
		toastr.warning("请输入填写人!");
		return;
	}
	var tel = $('#tel').val();
	if(tel==''){
		toastr.warning("请输入手机号码!");
		return;
	}
	if($(th).html()=='提交'){
		$('#show_num').show();
		$('#show_radio').hide();
		$(th).html('修改');
	}else{
		$(th).html('提交');
		$(".only_read").removeAttr("readonly");
		$('#show_num').hide();
		$('#show_radio').show();
		return;
	}
	
	
	$.ajax({
        type: "post",
        url: "#path()/qualitymanage/saveUseEmr",
        data:{
        	id:UseEmr_id,
        	tu_id:tu_id,
        	writtener:writtener,
        	department:$('#department').val(),
        	is_use:is_use,
        	duties:$('#duties').val(),
        	tel:tel
        },
        dataType: "json",
        async:false,
        success: function(result){
//        	if(!isNaN(result.rows)){ 
//        		$('#div_rct_time').html('<span><font class="counter" >'+result.rows+'</font>min</span>');
//        	}else{
//        		$('#div_rct_time').html('无数据');
//        	}
        	
//        	UseEmr_id=result.rows;
//        	$(".only_read").attr("readOnly","true");
        	findUseEmr(tu_id);
        	
        	
		},
		error : function() {
		}
	});
}
function findUseEmr(id){
	$.ajax({
        type: "post",
        url: "#path()/qualitymanage/findUseEmr",
        data:{
        	tu_id:id
        },
        dataType: "json",
        async:false,
        success: function(result){
//        	if(!isNaN(result.rows)){ 
//        		$('#div_rct_time').html('<span><font class="counter" >'+result.rows+'</font>min</span>');
//        	}else{
//        		$('#div_rct_time').html('无数据');
//        	}
        	if(result.rows.record != null){
        		var record = result.rows.record;
        		UseEmr_id =record.id;
        		$('#save').html('修改');
        		$(".only_read").attr("readOnly","true");
        		$('#writtener').val(record.writtener);
        		$('#department').val(record.department);
        		$('#duties').val(record.duties);
        		$('#tel').val(record.tel);
        		$('#show_num').show();
        		$('#show_radio').hide();
        		if(record.is_use=='0'){
        			$('#zdgbtn').click();
        		}
        	}else{
        		$('#writtener').val(result.rows.tu.username);
        		$('#tel').val(result.rows.tu.mobile);
        	}
        	$('#is_use1').html('是:'+result.rows.is_use1+'例');
    		$('#is_use0').html('否:'+result.rows.is_use0+'例');
        	
        	
        	
		},
		error : function() {
		}
	});
	
}
