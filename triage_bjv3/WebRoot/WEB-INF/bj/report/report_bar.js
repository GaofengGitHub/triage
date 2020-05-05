$(document).ready(function() {
    $("#report").addClass("leftNavActive").find("img").attr("src",$("#report").find(".iconNavImg").data("activeImg"));
    $("#report").siblings().removeClass("leftNavActive");
    $("#home").find("img").attr("src",$("#home").find(".iconNavImg").data("activeImg"));
	showDepart();
	setgradebtncss2();
	
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    //昨天
    if (strDate > 0) {
    	if(strDate<11){
    		if(strDate>1){
//        		strDate = strDate-1;
        	}
            strDate = "0" + strDate;
    	}else{
//    		strDate = strDate-1;
    	}
    }
    //一月跨年问题
    if(month=="01"){
    	var byyr = (date.getFullYear()-1) + seperator1 + "12" + seperator1 + strDate;
    }else{
    	//一个月前
    	if(month<="10"){
    		var byyr = date.getFullYear() + seperator1 +'0'+ (month-1) + seperator1 + strDate;
    		
    	}else{
    		var byyr = date.getFullYear() + seperator1 + (month-1) + seperator1 + strDate;
    	}
    }
   
    var zr = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    laydate.render({elem: '#starttime', format: 'yyyy-MM-dd',value: byyr,max: zr});
    laydate.render({elem: '#endtime', format: 'yyyy-MM-dd', value: zr,max: zr});

    querydividgrade(byyr,zr);
	querydividstatus(byyr,zr);
	querydividstatus2(byyr,zr);
	querydividadmission(byyr,zr);
	querydividtime(byyr,zr);
})

function querydividgrade(time1,time2){
	$.ajax({
		type : "post",
		url : "#path()/report/querydividgrade",
		data : {
			starttime:time1,
			endtime:time2
		},
		dataType : "json",
		//async: false,
		success : function(result) {
			var aa = $("#linechart").parent()
			$("#linechart").remove();
			$(aa).append("<div id='linechart' style='width: 100%;height:220px;'></div>");
			if(result.status=="200"){			
				// 基于准备好的dom，初始化echarts实例
		    var myChart = echarts.init(document.getElementById('linechart'));
		    echartsBS(myChart)
		        // 指定图表的配置项和数据
		        var option = {
		        	tooltip: {
		    		    trigger: 'item'
		    		},

				    dataZoom: [
				        {
				            type: 'inside'
				        }
				    ],
		            yAxis: {
		                type : 'value'
		            }
		        }; 
		        option.xAxis=[];
		        var xAxis={};
		        xAxis.axisLabel={};
		        xAxis.axisLabel.interval=0;
		        xAxis.type="category";
		        xAxis.data=[];
		        option.series=[];
		        var serie={};
		        serie.type='bar';
		        serie.data=[];
		        var colorList = [
		        	['#C1232B','#EE9A00'],
		        	['#EE9A00','#DAA520	'],
		        	['#DAA520	','#FFFF00'],
		        	['#228B22','#00FF00'],
		        	['#8B8989','#EEE9E9']
		        ];
		        var gradename ="";
		        var num =0;
		        
		        for(var i=0;i<result.rows.length;i++){
		        	if(i<4){
		        		num += parseInt(result.rows[i].gradenum);
		        	}
		        	
		        	if(result.rows[i].gradename==1){
		        		gradename="一级";
		        	}
		        	if(result.rows[i].gradename==2){
		        		gradename="二级";
		        	}
		        	if(result.rows[i].gradename==3){
		        		gradename="三级";
		        	}
		        	if(result.rows[i].gradename==4){
		        		gradename="四级";
		        	}
		        	if(result.rows[i].gradename==5){
		        		gradename="非急诊";
		        	}
		        	
		        	xAxis.data.push(gradename);
		        	serie.data.push(result.rows[i].gradenum);
		        	colorList.push(result.rows[i].gradecolor);
				}
//		        $("#yifenzhen").text(num);
		        serie.itemStyle={
			            normal: {
			            	color: function(params) {
		                        // build a color map as your need.
//		                        return colorList[params.dataIndex]
			            		var index = params.dataIndex % colorList.length;
		                        // 如果是纵向的图标，则改为0, 0 , 0, 1   横向1000
		                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
		                          { offset: 0, color: colorList[index][0] },
		                          { offset: 1, color: colorList[index][1] }
		                        ]);
		                    },
		                    label: {
			                    show: true,
			                    position: 'top'
			                }
			            }
			        }
		        option.xAxis.push(xAxis);
		        option.series.push(serie);
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
			}else{
				console.log(result);
				tipbiandan('linechart');
			}
		},
		error : function() {
		}
	});
}
function querydividstatus(time1,time2){
	$.ajax({
		type : "post",
		url : "#path()/report/querydividstatus2",
		data : {
			starttime:time1,
			endtime:time2
		},
		dataType : "json",
		async: false,
		success : function(result) {
			var aa = $("#linechart2").parent()
			$("#linechart2").remove();
			$(aa).append("<div id='linechart2' style='width: 100%;height:220px;'></div>");
			$("#yifenzhen").text("0");
			$("#yijiezhen").text("0");
			$("#yituihao").text("0");
			$("#specialpetient").text("0");
			if(result.status=="200"){
				// 基于准备好的dom，初始化echarts实例
		        var myChart = echarts.init(document.getElementById('linechart2'));
		        echartsBS(myChart)
		        // 指定图表的配置项和数据
		        var option = {
	        		tooltip: {
		    		    trigger: 'item'
		    		},

					    dataZoom: [
					        {
					            type: 'inside'
					        }
					    ],
		            yAxis: {
		                type : 'value'
		            }
		        }; 
		        option.xAxis=[];
		        var xAxis={};
		        xAxis.axisLabel={};
		        xAxis.axisLabel.interval=0;
		        xAxis.type="category";
		        xAxis.data=[];
		        option.series=[];
		        var serie={};
		        serie.type='bar';
		        serie.data=[];
		        serie.itemStyle={
		            normal: {
		            	color: function(params) {
	                        var colorList = [
//	                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
//	                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
//	                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
	                        	['#C1232B','#EE9A00'],
	        		        	['#228B22','#00FF00']
	                        ];
//	                        return colorList[params.dataIndex]
	                        var index = params.dataIndex % colorList.length;
	                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
		                          { offset: 0, color: colorList[index][0] },
		                          { offset: 1, color: colorList[index][1] }
		                        ]);
	                    },
	                    label: {
		                    show: true,
		                    position: 'top'
		                }
		            }
		        }
		        
		        for(var i=0;i<result.rows.length;i++){
		        	var status=result.rows[i].status;
		        	if(result.rows[i].status=="已分诊"){
						$("#yifenzhen").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="已接诊"){
						status="已接诊";
//						alert(result.rows[i].statusnum);
						$("#yijiezhen").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="未分诊"){
						status="待分诊";
						$("#yituihao").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="特殊人员"){
						$("#specialpetient").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="未接诊"){
						status="已分诊";
					}else if(result.rows[i].status=="抢救已接诊"){
						status="已接诊";
					}
		        	xAxis.data.push(status);
		        	serie.data.push(result.rows[i].statusnum);
				}
		        option.xAxis.push(xAxis);
		        option.series.push(serie);
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
				
				
			}else{
				console.log(result);
				tipbiandan('linechart2');
			}
		},
		error : function() {
		}
	});
}

function querydividadmission(time1,time2){
	$.ajax({
		type : "post",
		url : "#path()/report/querydividadmission",
		data : {
			starttime:time1,
			endtime:time2
		},
		dataType : "json",
		//async: false,
		success : function(result) {
			console.log(result);
			var aa = $("#linechart3").parent()
			$("#linechart3").remove();
			$(aa).append("<div id='linechart3' style='width: 100%;height:220px; '></div>");
			if(result.status=="200"){
				var myChart = echarts.init(document.getElementById('linechart3'));
				echartsBS(myChart)
		        // 指定图表的配置项和数据
		        var option = {
		        		
	        		tooltip: {
		    		    trigger: 'item'
		    		},

					    dataZoom: [
					        {
					            type: 'inside'
					        }
					    ],
	        		yAxis: [{
			                type : 'value'
			        }]
		        }; 
		        option.xAxis=[];
		        option.series=[];
		        var xAxis={};
		        xAxis.axisLabel={};
		        xAxis.axisLabel.interval=0;
		        xAxis.axisLabel.rotate=40;
		        xAxis.type="category";
		        xAxis.data=[];
		        var serie={};
		        serie.type='bar';
		        serie.data=[];
		        serie.itemStyle={
		            normal: {
		            	color: function(params) {
	                        // build a color map as your need.
	                        var colorList = [
	                        	['#C1232B','#EE9A00'],
	        		        	['#EE9A00','#DAA520	'],
	        		        	['#DAA520	','#FFFF00'],
	        		        	['#228B22','#00FF00'],
	        		        	['#8B8989','#EEE9E9']
	                        ];
//	                        return colorList[params.dataIndex]

	                        var index = params.dataIndex % colorList.length;
	                        // 如果是纵向的图标，则改为0, 0 , 0, 1   横向1000
	                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
	                          { offset: 0, color: colorList[index][0] },
	                          { offset: 1, color: colorList[index][1] }
	                        ]);
	                    },
		                label: {
		                    show: true,
		                    position: 'top'
		                }
		            }
		        }		        
		        for(var i=0;i<result.rows.length;i++){	
		        	xAxis.data.push(result.rows[i].admission);
		        	serie.data.push(result.rows[i].admissionnum);
				}
		        option.xAxis.push(xAxis);
		        option.series.push(serie);
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
				
			}else{
				console.log(result);
				tipbiandan('linechart3');
			}
		},
		error : function() {
		}
	});
}
function querydividtime(time1,time2){
	$.ajax({
		type : "post",
		url : "#path()/report/querydividtime",
		data : {
			starttime:time1,
			endtime:time2
		},
		dataType : "json",
		//async: false,
		success : function(result) {
			var aa = $("#linechart4").parent()
			$("#linechart4").remove();
			$(aa).append("<div id='linechart4' style='width: 100%;height:220px; top:'></div>");
			 if(result.status=="200"){
				 var myChart = echarts.init(document.getElementById('linechart4'));
				 echartsBS(myChart)
			        // 指定图表的配置项和数据
				 option = {

						    dataZoom: [
						        {
						            type: 'inside'
						        }
						    ],
						tooltip: {
				    		    trigger: 'item'
				    	},
					    xAxis: [
					        {
					        	axisLabel: {
                                    interval:0,
                                    rotate:0
					        	},
					            type: 'category',
					            data: ["00:00","2:00", "4:00", "6:00", "8:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"]
					        }
					    ],
					    yAxis: [
					        {
					            type: 'value',
					        }
					    ],
					    
					    series: [
					        {
					            type: 'bar',
					            itemStyle: {
					                normal: {
					                	color: new echarts.graphic.LinearGradient(
					                            0, 0, 0, 1,
					                            [
					                                {offset: 0, color: '#83bff6'},
					                                {offset: 0.5, color: '#188df0'},
					                                {offset: 1, color: '#188df0'}
					                            ]
					                        ),
					                    label: {
					                        show: true,
					                        position: 'top',
					                    }
					                }
					            },
					            data: [result.rows[0].count2,result.rows[0].count4,result.rows[0].count6,result.rows[0].count8,
			 				           result.rows[0].count10,result.rows[0].count12,result.rows[0].count14,result.rows[0].count16,
							           result.rows[0].count18,result.rows[0].count20,result.rows[0].count22,result.rows[0].count24],
					            markPoint: {
					                tooltip: {
					                    trigger: 'item',
					                    backgroundColor: 'rgba(0,0,0,0)',
					                    formatter: function(params){
					                    }
					                },
					                
					            }
					        }
					    ]
						};
			        myChart.setOption(option);
			}else{
				console.log(result);
				tipbiandan('linechart4');
			}
		},
		error : function() {
		}
	});
}

function tongji(){
	$(".tipbiaodan").remove();
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	if(starttime=="" && endtime==""){
		return;
	}else if(starttime==""){
		var date = new Date();
	    var seperator1 = "-";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	    	if(strDate>1){
	    		strDate = strDate-1;
	    	}
	        strDate = "0" + strDate;
	    }
	    starttime = date.getFullYear() + seperator1 + month + seperator1 + "01";
	}else if(endtime==""){
		var date = new Date();
	    var seperator1 = "-";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	    	if(strDate>1){
	    		strDate = strDate-1;
	    	}
	        strDate = "0" + strDate;
	    }
	    endtime = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	}
	querydividgrade(starttime,endtime);
	querydividstatus(starttime,endtime);
	querydividstatus2(starttime,endtime);
	querydividadmission(starttime,endtime);
	querydividtime(starttime,endtime);
}

function tipbiandan(id){
	$("#"+id).append("<div class='tipbiaodan' style='color:#C3C7D5;text-align: center;font-size: 20px;'>无满足条件纪录</div");
}

//获取部门等待人数
function showDepart(){
	$.ajax({
		type: "post",
		url: "#path()/index/queryDepartAndWaitPatientNums",
		dataType: "json",
		data : {
		},
		success: function (result) {
			if((result!=null)&&(result.status==200)){
				var rows = result.rows;

				$("#depart").html("");
				var str ='<div class="sroll">';
				var department = $("#department").html();
				for(var i in rows){
					var id = rows[i]["td_id"];
					var name = rows[i]["td_name"];
					var count = rows[i]["count"];
					var max = rows[i]["readyclinicalreceptionmax"];
					str +=	'<div class="textNavItem">'+
						'<span class="navText">'+name+'/人</span>'+
						'<span class="navNum">'+count+'</span>'+
						'</div>';
					department += '<li>';
					department += '<a onclick="setDept(&quot;'+id+'&quot;,&quot;'+name+'&quot;)">'+ name +'</a>';
					department += '</li>';

				}
				str+='</li></div>';
				$("#depart").html(str);
				$("#department").html(department);
				srollRun();
			}
		},
		error: function () {

		}
	});
}
$(function(){  

	$.ajax({
        type: "post",
        url: "#path()/index/queryWarningInfo",
        data:{
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
        			var map = result.rows;
        			g1 = map["a1001"];
        			g2 = map["a1002"];
        			g3 = map["a1003"];
        			g4 = map["a1004"];
        			var length =g1.length+g2.length+g3.length+g4.length;
        			if(length >0){
        				$("#warnNum").html("共有"+length+"条报警消息等待处理.....");
            			$("#warnNum2").html("共有"+length+"条报警消息等待处理.....");
        			}
        		}
        	}
		},
		error : function() {
		}
	});

});

function querydividstatus2(time1,time2){
	$.ajax({
		type : "post",
		url : "#path()/report/querydividstatus",
		data : {
			starttime:time1,
			endtime:time2
		},
		dataType : "json",
		async: false,
		success : function(result) {
		        for(var i=0;i<result.rows.length;i++){
		        	var status=result.rows[i].status;
		        	if(result.rows[i].status=="已分诊"){
						$("#yifenzhen").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="已接诊"){
						$("#yijiezhen").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="已退号"){
//						status="待分诊";
						$("#yituihao1").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="特殊人员"){
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
function scrollTxt(){
    var controls={},
        values={},
        t1=200, /*播放动画的时间*/
        t2=2000, /*播放时间间隔*/
        si;
    controls.rollWrap=$("#roll-wrap");
    controls.rollWrapUl=controls.rollWrap.children();
    controls.rollWrapLIs=controls.rollWrapUl.children();
    values.liNums=controls.rollWrapLIs.length;
    values.liHeight=controls.rollWrapLIs.eq(0).height();
    values.ulHeight=controls.rollWrap.height();
    this.init=function(){
        autoPlay();
        pausePlay();
    }
    /*滚动*/
    function play(){
        controls.rollWrapUl.animate({"margin-top" : "-"+values.liHeight}, t1, function(){
            $(this).css("margin-top" , "0").children().eq(0).appendTo($(this));
        });
    }
    /*自动滚动*/
    function autoPlay(){
        /*如果所有li标签的高度和大于.roll-wrap的高度则滚动*/
        if(values.liHeight*values.liNums > values.ulHeight){
            si=setInterval(function(){
                play();
            },t2);
        }
    }
    /*鼠标经过ul时暂停滚动*/
    function pausePlay(){
        controls.rollWrapUl.on({
            "mouseenter":function(){
                clearInterval(si);
            },
            "mouseleave":function(){
                autoPlay();
            }
        });
    }
}
new scrollTxt().init();

function echartsBS(myChart){
	window.addEventListener("resize",function (){
	    myChart.resize();
	});
}
