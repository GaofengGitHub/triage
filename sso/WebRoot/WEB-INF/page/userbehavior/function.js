$(document).ready(function () {
	load("allquery");
})

function skip(_this,num){
	
	$(_this).parents("li").addClass("active").siblings().removeClass("active");
	var arrow = '<i class="fa fa-caret-left point"></i>';
	$(_this).parent(".nav-list").append(arrow).parent("li").siblings().find(".point").remove();
	if(num == 3){
		$(_this).parent(".nav-list").siblings(".nav-detail").show().find("a").removeClass("active");
		$(".nav-detail a").click(function(){
			$(this).parents("li").removeClass("active");
			$(".point").remove();
			$(this).addClass("active").siblings().removeClass("active");
		})
	}
}

//综合查询
function showuserbehavior(){
	$('#showuserbehavior').bootstrapTable({
		url: '#path()/login/queryUserBehavior',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        //sortName:'dividtime',
        //sortOrder :'desc',
        async: false,
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	  var temp = {   
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	        sort: params.sort,      //排序列名  
                    sortOrder: params.order,
                    starttime : $("#starttime").val(),
		      		endtime : $("#endtime").val(),
		      		username : $("#username").val(),
		      		system : $("#stationlist").find("option:selected").attr("value"),
		      		pagename : $("#pagename").val(),
		      		operatename : $("#operatename").val()
        	       };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 13,                       //每页的记录行数（*）
        pageList: [13, 26,50],        //可供选择的每页的行数（*）
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
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [
			    {title: '序号',
			    	formatter: function (value, row, index) {  
				        return index+1;  
				    }  
				},
				{field : 'operatetime',title:'操作时间'},
				{field : 'operatename',title : '操作点'},
				{field : 'right_name',title : '工作站'},								
				{field : 'pagename',title : '所在页面'},
				{field : 'username',title : '操作用户'}
		],onLoadSuccess:function(data){
            $("#usealloperate").text(data.rows.length);
	     }
    });
	$('#showuserbehavior').bootstrapTable('refresh');
}

//查询下拉列表
function queryTypeBehavior(type){
	$.ajax({
		type : "post",
		url: "#path()/login/queryTypeBehavior",
	    dataType: "json",
	    async: false,
	    data:{
	    	type:type  	
	    },
		success : function(result) {
			if(result.status=="200"){
				var strhtml="";
				if(type=="pagename"){
					for(var i=0;i<result.rows.length;i++){
						strhtml+='<li><a id='+result.rows[i].id+' href="#">'+result.rows[i].pagename+'</a></li>';
					}
					$("#pagenamelist").html(strhtml);
					$("#pagenamelist").find("li").click(function(){
						var text= $(this).find("a").text();
						$("#pagenamelist").prev().html(text+'<span class="caret"></span>');
						$("#pagenamelist").parent().next().val(text);
					})
				}else if(type=="operatename"){
					for(var i=0;i<result.rows.length;i++){
						strhtml+='<li><a id='+result.rows[i].id+' href="#">'+result.rows[i].operatename+'</a></li>';
					}
					$("#operatenamelist").html(strhtml);
					$("#operatenamelist").find("li").click(function(){
						var text= $(this).find("a").text();
						$("#operatenamelist").prev().html(text+'<span class="caret"></span>');
						$("#operatenamelist").parent().next().val(text);
					})
				}else if(type=="user"){
					for(var i=0;i<result.rows.length;i++){
						strhtml+='<li><a id='+result.rows[i].tu_id+' href="#">'+result.rows[i].username+'</a></li>';
					}
					$("#userlist").html(strhtml);
					$("#userlist").find("li").click(function(){
						var text= $(this).find("a").text();
						$("#userlist").prev().html(text+'<span class="caret"></span>');
						$("#userlist").parent().next().val(text);
					})
				}else if(type=="station"){
					strhtml+='<option value="">全部</option>';
					for(var i=0;i<result.rows.length;i++){
						strhtml+='<option id='+result.rows[i].tr_id+' value='+result.rows[i].url+'>'+result.rows[i].right_name+'</option>';
					}
					$("#stationlist").html(strhtml);
				}
			}else{
				console.log(result);
			}
    	},
    	error : function() {
    	}
    });
}

//跳转页面
function load(data) {
	var url="";
	if(data=="allquery"){
		url='gotoallquery';
	}else if(data=="waitpage"){
		url='gotowaittime';
	}else if(data=="operatepage"){
		url='gotooperate';
	}else if(data=="waitinfopage"){
		url='gotowaittimeinfo';
	}else if(data=="operateinfopage"){
		url='gotooperateinfo';
	}
	if(url!=""){
		//局部替换模块（相当于跳转页面）
		$('#firstpanel').panel({
			href:'#path()/login/'+url
		}).css("padding","0 15px");
	}
}

//页面停留时间
function querywaittime(){
	$.ajax({
		type : "post",
		url : "#path()/login/queryWaitTime",
		data : {
			starttime : $("#starttime").val(),
     		endtime : $("#endtime").val(),
			system:$("#stationlist").find("option:selected").attr("value")
		},
		dataType : "json",
		async: false,
		success : function(result) {
			var aa = $("#showwaittime").parent()
			$("#showwaittime").remove();
			$(aa).append("<div id='showwaittime' style='width: 100%;height:200px;'></div>");
			if(result.status=="200" && result.rows.length>0){
				// 基于准备好的dom，初始化echarts实例
		        var myChart = echarts.init(document.getElementById('showwaittime'));
		        // 指定图表的配置项和数据
		        var option = {
	        		tooltip: {
		    		    trigger: 'item'
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
					dataZoom : {
						show : true,
						realtime : true,
						start : 5,
						end : 60
					},
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
	                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
	                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
	                        ];
	                        var index = (params.dataIndex)%(colorList.length);
	                        return colorList[index];
	                    },
	                    label: {
		                    show: true,
		                    position: 'top'
		                }
		            }
		        }
		        
		        for(var i=0;i<result.rows.length;i++){
		        	xAxis.data.push(result.rows[i].pagename);
		        	serie.data.push(result.rows[i].avgwaittime);
				}
		        option.xAxis.push(xAxis);
		        option.series.push(serie);
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
		        
		        //给表格加点击效果
		        myChart.on('click', function (params) {
				    console.log(params.name);
				    sessionStorage.setItem('waitinfostarttime',$("#starttime").val());
				    sessionStorage.setItem('waitinfoendtime',$("#endtime").val());
				    sessionStorage.setItem('waitinfostation',$("#stationlist").find("option:selected").attr("value"));
				    sessionStorage.setItem('waitinfostationname',$("#stationlist").find("option:selected").text());
				    sessionStorage.setItem('waitinfopagename',params.name);
				    load("waitinfopage");
				});
			}else{
				$("#showwaittime").append("<div class='tipbiaodan' style='color:#C3C7D5;text-align: center;font-size: 20px;'>无满足条件纪录</div");
			}
		},
		error : function() {
		}
	});
}

//操作点
function queryUserBehaviorNum(){
	$.ajax({
		type : "post",
		url : "#path()/login/queryUserBehaviorNum",
		data : {
			starttime : $("#starttime").val(),
     		endtime : $("#endtime").val(),
			system:$("#stationlist").find("option:selected").attr("value"),
			pagename : $("#pagename").val()
		},
		dataType : "json",
		async: false,
		success : function(result) {
			var aa = $("#showoperate").parent()
			$("#showoperate").remove();
			$(aa).append("<div id='showoperate' style='width: 100%;height:200px;'></div>");
			if(result.status=="200" && result.rows.length>0){
				// 基于准备好的dom，初始化echarts实例
		        var myChart = echarts.init(document.getElementById('showoperate'));
		        // 指定图表的配置项和数据
		        var option = {
	        		tooltip: {
		    		    trigger: 'item'
		    		},toolbox : {
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
					dataZoom : {
						show : true,
						realtime : true,
						start : 10,
						end : 20
					},
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
	                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
	                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
	                        ];
	                        var index = (params.dataIndex)%(colorList.length);
	                        return colorList[index];
	                    },
	                    label: {
		                    show: true,
		                    position: 'top'
		                }
		            }
		        }
		        console.log(result.rows.length);
		        for(var i=0;i<result.rows.length;i++){
		        	xAxis.data.push(result.rows[i].operatename);
		        	serie.data.push(result.rows[i].operatenum);
				}
		        option.xAxis.push(xAxis);
		        option.series.push(serie);
		        // 使用刚指定的配置项和数据显示图表。
		        myChart.setOption(option);
		        //给表格加点击效果
		        myChart.on('click', function (params) {
				    console.log(params.name);
				    sessionStorage.setItem('operateinfostarttime',$("#starttime").val());
				    sessionStorage.setItem('operateinfoendtime',$("#endtime").val());
				    sessionStorage.setItem('operateinfostation',$("#stationlist").find("option:selected").attr("value"));
				    sessionStorage.setItem('operateinfostationname',$("#stationlist").find("option:selected").text());
				    sessionStorage.setItem('operateinfopagename',$("#pagename").val());
				    sessionStorage.setItem('operateinfooperatename',params.name);
				    load("operateinfopage");
				});
			}else{
				$("#showoperate").append("<div class='tipbiaodan' style='color:#C3C7D5;text-align: center;font-size: 20px;'>无满足条件纪录</div");
			}
		},
		error : function() {
		}
	});
}

//操作点详情
function showoperateinfo(){
	$('#showoperateinfo').bootstrapTable({
		url: '#path()/login/queryUserBehavior',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        //sortName:'dividtime',
        //sortOrder :'desc',
        async: false,
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	  var temp = {
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	        sort: params.sort,      //排序列名  
                    sortOrder: params.order,
                    starttime : $("#starttime").val(),
		      		endtime : $("#endtime").val(),
		      		system : $("#station").val(),
		      		pagename : $("#pagename").val(),
		      		operatename : $("#operatename").val(),
		      		username : $("#username").val()
        	    };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        //pageSize: 13,                       //每页的记录行数（*）
        //pageList: [13, 26,50],        //可供选择的每页的行数（*）
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
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [
			{title: '序号',
			   formatter: function (value, row, index) {  
			    return index+1;  
			   }  
			},
			{field : 'operatetime',title:'操作时间'},
			{field : 'username',title : '操作用户'}
		]
    });
	$('#showoperateinfo').bootstrapTable('refresh');
}

//停留页面详情
function showwaittimeinfo(){
	$('#showwaittimeinfo').bootstrapTable({
		url: '#path()/login/queryWaitTimeInfo',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        //sortName:'dividtime',
        //sortOrder :'desc',
        async: false,
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	  var temp = {
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	        sort: params.sort,      //排序列名  
                    sortOrder: params.order,
                    starttime : $("#starttime").val(),
		      		endtime : $("#endtime").val(),
		      		system : $("#station").val(),
		      		pagename : $("#pagename").val(),
		      		username : $("#username").val()
        	    };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 13,                       //每页的记录行数（*）
        pageList: [13, 26,50],        //可供选择的每页的行数（*）
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
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [
			{title: '序号',
			   formatter: function (value, row, index) {  
			    return index+1;  
			   }  
			},
			{field : 'starttime',title:'停留时间',
			   formatter: function (value, row, index) { 
			    return row.starttime+"至"+row.endtime;  
			   } 
			},
			{field : 'waittime',title:'时长'},
			{field : 'username',title : '操作用户'}
		]
    });
	$('#showwaittimeinfo').bootstrapTable('refresh');
}

function zerooperate(){
	$.ajax({
		type : "post",
		url : "#path()/login/zerooperate",
		data : {
		},
		dataType : "json",
		async: false,
		success : function(result) {
			if(result.rows=="0"){
				$("#zerooperate").text("无");
			}else{
				$("#zerooperate").text(result.rows);
			}
		},
		error : function() {
		}
	});
}

function zerowaittime(){
	$.ajax({
		type : "post",
		url : "#path()/login/zerowaittime",
		data : {
		},
		dataType : "json",
		async: false,
		success : function(result) {
			if(result.rows=="0"){
				$("#zerowaittime").text("无");
			}else{
				$("#zerowaittime").text(result.rows);
			}
		},
		error : function() {
		}
	});
}