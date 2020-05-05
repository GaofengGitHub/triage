$(document).ready(function() {
	$("#qualitymanage").addClass("active");
	$("#qualitymanage").siblings().removeClass("active");
	showDepart();
	
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
        		strDate = strDate-1;
        	}
            strDate = "0" + strDate;
    	}else{
    		strDate = strDate-1;
    	}
    }
    var byyr = date.getFullYear() + seperator1 + month + seperator1 + "01";
    var zr = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    
    /*var laystarttime = laydate.render({
		   elem: '#starttime', //指定元素
		   min: '1901-01-01',
		   max: zr,
		   value: byyr,
		   btns: ['clear','confirm'],
		   done: function(value, date){
			    layendtime.config.min ={  
	                     year:date.year,   
	                     month:date.month-1, //关键  
	                     date: date.date,   
	                     hours: 0,   
	                     minutes: 0,   
	                     seconds : 0  
	             };
		   }
	});
    
    var layendtime = laydate.render({
		   elem: '#endtime', //指定元素
		   min: '1901-01-01',
		   max: zr,
		   value: zr,
		   done: function(value, date){
			   if(value==""){
					var date2 = new Date();
					var month = date2.getMonth();
				    var strDate = date2.getDate();
				    if (month >= 1 && month <= 9) {
				        month = "0" + month;
				    }
				    if (strDate >= 0 && strDate <= 9) {
				    	if(strDate>1){
				    		strDate = strDate-1;
				    	}
				        strDate = "0" + strDate;
				    }
					laystarttime.config.max ={
	                     year: date2.getFullYear(),   
	                     month:month, //关键  
	                     date: strDate,   
	                     hours: 0,   
	                     minutes: 0,   
	                     seconds : 0  
	                };
			   }else{
				   laystarttime.config.max ={
		                     year:date.year,   
		                     month:date.month-1, //关键  
		                     date: date.date,   
		                     hours: 0,   
		                     minutes: 0,   
		                     seconds : 0  
		           };
			    }
		   }
	 }); */   
    $("#endtime").datepicker({setDate:new Date(),autoclose:true,format: 'yyyy-mm-dd'});
    $("#starttime").datepicker({setDate:new Date(byyr),autoclose:true,format: 'yyyy-mm-dd'});
	$("#starttime").attr("placeholder", byyr);
	$("#endtime").attr("placeholder", zr);
    
	var data1 = {
		labels: ["医师", "患者"],
		datasets: [{
                       label: "人数",
                       data: [22, 360],
                       backgroundColor: [
                                         'rgba(0,161,153)',
                                         'rgba(25,103,178)'
                                       ],
                       borderColor: ['rgba(255,99,132,1)'],
                       borderWidth: 1
                       
                   }]
    };
	var ctx = document.getElementById("barchart").getContext('2d');
	myChart1 = new Chart(ctx, {
	    type: 'bar',
	    data: data1,
	    options: {
	    	legend: {
	    	      display: false,
	    	    }
	    }
	});
		
	var data2 = {
			labels: ["初级职称", "中级职称","高级职称"],
			datasets: [{
	                       label: "My First dataset",
	                       data: [12, 16 , 24],
	                       backgroundColor: [
	                                         'rgba(31,169,216)',
	                                         'rgba(237,125,49)',
	                                         'rgba(25,103,178)'
	                                       ]
	                   }]
	};
	var ctx = document.getElementById("piechart").getContext('2d');
	myChart2 = new Chart(ctx, {
	    type: 'pie',
	    data: data2,
	    options: {
	    }
	});   

	var data3 = {
			labels: ["护士", "患者"],
			datasets: [{
				           label: "人数",
	                       data: [36, 366],
	                       backgroundColor: [
											'rgba(0,161,153)',
											'rgba(25,103,178)'
	                                       ],
	                       borderColor: ['rgba(255,99,132,1)'],
	                       borderWidth: 1
	                       
	                   }]
	};
	var ctx = document.getElementById("barchart2").getContext('2d');
	myChart3 = new Chart(ctx, {
	    type: 'bar',
	    data: data3,
	    options: {
	    	legend: {
	    	      display: false,
	    	    }
	    }
	});
	
	var data4 = {
			labels: ["初级职称", "中级职称","高级职称"],
			datasets: [{
	                       //label: "My First dataset",
	                       data: [14,20, 16],
	                       backgroundColor: [
											'rgba(31,169,216)',
											'rgba(237,125,49)',
											'rgba(25,103,178)'
	                                       ]
	                   }]
	};
	var ctx = document.getElementById("piechart2").getContext('2d');
	myChart4 = new Chart(ctx, {
	    type: 'pie',
	    data: data4,
	    options: {
	    }
	}); 
	
	var data5 = {
			labels: ["监护床位","患者"],
			datasets: [{
	                       //label: "My First dataset",
	                       data: [20, 16],
	                       backgroundColor: [
											'rgba(0,161,153)',
											'rgba(25,103,178)'
	                                       ]
	                   }]
	};
	var ctx = document.getElementById("piechart3").getContext('2d');
	myChart5 = new Chart(ctx, {
	    type: 'pie',
	    data: data5,
	    options: {
	    }
	}); 
	
	var data6 = {
			labels: ["一级","二级","三级","四级"],
			datasets: [{
	                       //label: "My First dataset",
	                       data: [1120, 1116,830,400],
	                       backgroundColor: [
											'rgba(231,0,18)',
											'rgba(228,118,5)',
											'rgba(250,196,0)',
											'rgba(19,186,54)'
	                                       ]
	                   }]
	};
	var ctx = document.getElementById("piechart4").getContext('2d');
	myChart6 = new Chart(ctx, {
	    type: 'pie',
	    data: data6,
	    options: {
	    }
	});
	
	var ctx = document.getElementById("linechart").getContext('2d');
    var myChart7 = new Chart(ctx, {
			type: 'line', // line 表示是 曲线图，当然也可以设置其他的图表类型 如柱形图 : bar  或者其他
	        data: {
	            labels : [0.6,1.4,2.2,2.9,3.5,4.1], //按时间段 可以按星期，按月，按年
	            datasets : [
	                {
	                    label: "抢救室治疗时间",  //当前数据的说明
	                    fill: false,  //是否要显示数据部分阴影面积块  false:不显示
	                    borderColor: "rgba(39,97,161)",//数据曲线颜色
	                    pointBackgroundColor: "rgba(19,186,54)", //数据点的颜色
	                    data: [2,2,2,4,4,4],  //填充的数据
	                }
	            ]
	        },
	        options:{
	        	scales: {
	                yAxes: [{
	                    ticks: {
	                        beginAtZero:true
	                    }
	                }]
	            }
	        }
	});
    
    var ctx = document.getElementById("piechart5").getContext('2d');
    var myChart8 = new Chart(ctx, {
			type: 'pie', // line 表示是 曲线图，当然也可以设置其他的图表类型 如柱形图 : bar  或者其他
	        data: {
	            labels : ["死亡患者","其他患者"], //按时间段 可以按星期，按月，按年
	            datasets : [
	                {
	                    //label: "",  //当前数据的说明
	                    backgroundColor: ["rgba(231,0,18)","rgba(0,161,153)"],//数据曲线颜色
	                    data: [10,1800],  //填充的数据
	                }
	            ]
	        }
	});
    
    var ctx = document.getElementById("piechart6").getContext('2d');
    var myChart9 = new Chart(ctx, {
			type: 'pie', // line 表示是 曲线图，当然也可以设置其他的图表类型 如柱形图 : bar  或者其他
	        data: {
	            labels : ["死亡患者","其他患者"], //按时间段 可以按星期，按月，按年
	            datasets : [
	                {
	                    //label: "",  //当前数据的说明
	                    backgroundColor: ["rgba(231,0,18)","rgba(0,161,153)"],//数据曲线颜色
	                    data: [0,1400],  //填充的数据
	                }
	            ]
	        }
	});
    
    var ctx = document.getElementById("piechart7").getContext('2d');
    var myChart10 = new Chart(ctx, {
			type: 'pie', // line 表示是 曲线图，当然也可以设置其他的图表类型 如柱形图 : bar  或者其他
	        data: {
	            labels : ["ROSC成功患者","其他患者"], //按时间段 可以按星期，按月，按年
	            datasets : [
	                {
	                    //label: "",  //当前数据的说明
	                    backgroundColor: ["rgba(39,97,161)","rgba(0,161,153)"],//数据曲线颜色
	                    data: [1000,800],  //填充的数据
	                }
	            ]
	        }
	});
    
    var ctx = document.getElementById("piechart8").getContext('2d');
    var myChart11 = new Chart(ctx, {
			type: 'pie', // line 表示是 曲线图，当然也可以设置其他的图表类型 如柱形图 : bar  或者其他
	        data: {
	        	labels : ["使用抗生素患者","同期就诊患者总例数"], //按时间段 可以按星期，按月，按年
	            datasets : [
	                {
	                    //label: "",  //当前数据的说明
	                    backgroundColor: ["rgba(39,97,161)","rgba(237,125,49)"],//数据曲线颜色
	                    data: [800,1000],  //填充的数据
	                }
	            ]
	        }
	});
    
    var ctx = document.getElementById("piechart9").getContext('2d');
    var myChart12 = new Chart(ctx, {
			type: 'pie', // line 表示是 曲线图，当然也可以设置其他的图表类型 如柱形图 : bar  或者其他
	        data: {
	            labels : ["挂号费","诊疗费","药费","检验检查费"], //按时间段 可以按星期，按月，按年
	            datasets : [
	                {
	                    //label: "",  //当前数据的说明
	                    backgroundColor: ["rgba(39,97,161)","rgba(132,132,132)","rgba(255,192,0)","rgba(91,156,214)"],//数据曲线颜色
	                    data: [400,800,600,900],  //填充的数据
	                }
	            ]
	        }
	});
});

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
            	var str ="";
            	var department = $("#department").html();
       	 		for(var i in rows){
       	 			var id = rows[i]["td_id"];
       	 			var name = rows[i]["td_name"];
       	 			var count = rows[i]["count"];
       	 			var max = rows[i]["readyclinicalreceptionmax"];
       	 			//4个换一行 第一个不用结尾
       	 			if((i%4==0)&&(i!=0)){
       	 				str+='</li>';
       	 			}
       	 			if(i%4==0){
       	 				str+='<li>';
       	 			}
       	 			str +='<div class="deskItem';
       	 			if(count>=max){
       	 				str +=' text-danger';
       	 			}
       	 			str +='">';
       	 			str +='<span><img src="#path()/static/bj/images/iconHeart.png">';
       	 			str += name;
       	 			str +='</span>';
       	 			str += count+'人';
       	 			str +='</div>';
       	 			
       	 			department += '<li>';
       	 			department += '<a onclick="setDept(&quot;'+id+'&quot;,&quot;'+name+'&quot;)">'+ name +'</a>';
       	 			department += '</li>';
       	 		
       	 		}
       	 		str+='</li>';
       	 		//console.log(department);
       	 		$("#depart").html(str);
       	 		$("#department").html(department);
        	}
        },
        error: function () {
        	//$.messager.alert('提示','获取失败，请联系管理员');
        }
    });
}
