$(document).ready(function() {
	$("#historyrecord").addClass("leftNavActive").find("img").attr("src",$("#historyrecord").find(".iconNavImg").data("activeImg"));
	$("#historyrecord").siblings().removeClass("leftNavActive");
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
	// 高度兼容
	var  heightList = $(".containerbody").height() -  $(".historyrecord-top").outerHeight() -  $(".historyrecord-top-right").outerHeight();
	$(".historyrecord-table-box").height(heightList);
	//昨天
//    if (strDate > 0) {
//    	if(strDate<11){
//    		if(strDate>1){
//        		strDate = strDate-1;
//        	}
//            strDate = "0" + strDate;
//    	}else{
//    		strDate = strDate-1;
//    	}
//    }
	//一月跨年问题
	if(month=="01"){
		var byyr = (date.getFullYear()-1) + seperator1 + "12" + seperator1 + strDate;
	}else{
		//一个月前
		if(month<="10"){
			//解决个位数月份少0的问题，变成01。liuxj20190216
			var byyr = date.getFullYear() + seperator1 +'0'+ (month-1) + seperator1 + strDate;

		}else{
			var byyr = date.getFullYear() + seperator1 + (month-1) + seperator1 + strDate;
		}

	}
	var zr = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	laydate.render({elem: '#starttime', format: 'yyyy-MM-dd',value: byyr,max: zr});
    laydate.render({elem: '#endtime', format: 'yyyy-MM-dd', value: zr,max: zr});
//    zr="2018-12-03";
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
     });*/
//	$("#endtime").datepicker('setDate',new Date());
//	$("#starttime").datepicker('setDate',new Date(byyr));
//	$("#starttime").attr("placeholder",byyr);
//	$("#endtime").attr("placeholder",zr);
	querydividstatus(byyr,zr);
	querypatienthistory();
	querydividgrade(byyr,zr);


	$(window).resize(function() {
		var size = parseInt(($(window).height()-130)/40)-2;
		// $(".charBox").css("height",$(window).height()-180);
		$('#patientRecordList').bootstrapTable('refresh', {
			pageSize: size,                       //每页的记录行数（*）
			pageList: [size, 30,50],        //可供选择的每页的行数（*）
		});

	});
})
function querypatienthistory() {
	// var size = parseInt(($(window).height()-130)/40)-2;
	var size = 20;
	// $(".charBox").css("height",$(window).height()-180);
	if($(window).width()<=1366){
		$("#patientRecordList").attr('data-height','480');
	}
	$('#patientRecordList').bootstrapTable({
		url: '#path()/historyrecord/querypatienthistory',         //请求后台的URL（*）
		method: 'post',//请求方式（*）
		contentType:"application/x-www-form-urlencoded",
		//toolbar: '#toolbar',                //工具按钮用哪个容器
		striped: false,                      //是否显示行间隔色
		cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true,                   //是否显示分页（*）
		sortable: false,                     //是否启用排序
		sortName:'dividtime',
		sortOrder :'desc',
		async: false,
		queryParams: function (params) {
			//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
			var temp = {
				rows: params.limit,                         //页面大小
				page: (params.offset / params.limit) + 1,   //页码
				sort: params.sort,      //排序列名
				sortOrder: params.order,
				// starttime: $("#starttime").val(),
				starttime: "2018-03-13",
				endtime: $("#endtime").val(),
				content:$("#content").val()
			};
			return temp;
		},//传递参数（*）
		sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
		pageNumber:1,                       //初始化加载第一页，默认第一页
		pageSize: size,                       //每页的记录行数（*）
		pageList: [10,size, 30,50],        //可供选择的每页的行数（*）
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
		rowStyle: rowStyle,
		columns: [
			{ //field: 'Number',//可不加
				title: '序号',//标题  可不加
				formatter: function (value, row, index) {
					return index+1;
				}
			},
			{visible : false,field : 'pid',title:'编号'},
			{field : 'cardnum',title : '就诊卡号'},
			{field : 'gradename',title : '分诊级别' ,sortable :true, formatter:function(value,row,index){
					return "<span class='Level"+ value +"'>"+ value +"级</span>"
				}},
			{field : 'fullname',title : '个人信息',formatter:function(value,row,index){
					var strhtml = '<div class="Selfinfo">';
					strhtml += "<span>"+ row.fullname +"</span><span>" +  row.age  +"</span>";
					strhtml += row.gender == "男" ? "<div class='gender man'><img src='#path()/static/vendor/newpage/images/home/fzHome_man.png'/></div>" : "<div class='gender woman'><img src='#path()/static/vendor/newpage/images/home/fzHome_woman.png'/></div>";
					return strhtml+"</div>";
				}
			},
			{field : 'registertime',title : '挂号时间'},
			{field : 'jiange1',title : '间隔',formatter:function(value,row,index){
					return value+"分"
				}},
			{field : 'dividtime',title : '分诊时间',
				formatter:function(value,row,index){
					var strhtml = '';
					strhtml += row.dividtime;
					return strhtml.substring(0, 16);

				}},
			{field : 'dividdepartment',title : '分诊科室'},
			{field : 'jiange2',title : '间隔',formatter:function(value,row,index){
					return value+"分"
				}},
			{field : 'receivetime',title : '接诊时间',
				formatter:function(value,row,index){
					var strhtml = '';
					strhtml += row.receivetime;
					return strhtml.substring(0, 16);

				}},
			{field : 'receivedepartment',title : '接诊科室'},
			{
				field: '',
				title: '操作',
				Style:{
						css:{'padding':'0px'},
				},
				formatter:function(value,row,index){
					var strhtml = ''; //fzHome_do_deleteUnselected
					strhtml += "<a class='btn search' href='javascript:void(0);' Userbehavior='A55' onclick='findpatientrecord(&quot;"+row.pid+"&quot;);'><img src='#path()/static/vendor/newpage/images/home/home_search.png'/></a>";
					strhtml += "<a  class='btn delect' href='javascript:void(0);' Userbehavior='A56' onclick='delpatientrecord(&quot;"+row.pid+"&quot;);'><img src='#path()/static/vendor/newpage/images/home/home_do_delete.png'/></a>";
					return strhtml;
				}
			}]
	});
	$('#patientRecordList').bootstrapTable('refresh',{
		pageNumber:1
	});
}

function fitMethod(){
	$('.fixed-table-container').removeAttr("style");
	$('table').attr('data-height',0);
}
//设置历史记录背景颜色
function rowStyle(value,row, index){
	return style={css:{'background':''+value.grade_color}};
}
function querydividstatus(starttime,endtime){
	$.ajax({
		type : "post",
		url : "#path()/report/querydividstatus",
		data : {
			starttime:$("#starttime").val(),
			endtime:$("#endtime").val()
		},
		dataType : "json",
		async: false,
		success : function(result) {
			//$("#showstatus").empty();
			$("#yifenzhen").text("0");
			$("#yijiezhen").text("0");
			$("#yituihao").text("0");
			$("#specialpetient").text("0");
			if(result.status=="200"){
				for(var i=0;i<result.rows.length;i++){
					if(result.rows[i].status=="已分诊"){
						$("#yifenzhen").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="已接诊"){
						$("#yijiezhen").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="已退号"){
						$("#yituihao1").text(result.rows[i].statusnum);
					}else if(result.rows[i].status=="特殊人员"){
						$("#specialpetient").text(result.rows[i].statusnum);
					}
				}
			}else{
				console.log(result);
			}
		},
		error : function() {
		}
	});
}

function tongji(){
	$("#patientRecordList").bootstrapTable('refreshOptions',{pageNumber : 1});
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
	querydividstatus(starttime,endtime);
	querypatienthistory();
	querydividgrade(starttime,endtime);
}

function back(mes) {
	$('#promptmassage').html(mes);//
	$('#promptModel').modal();
}

function delpatientrecord(pid){
	$("#historyid").val(pid);
	back("是否确认删除患者分诊信息，将患者退回‘待分诊’状态？");
}

function canceldelhistory(){
	$("#historyid").val("");
}

function confirmdelhistory(){
	var pid = $("#historyid").val();
	var nurseid = '#userId()';
	if(pid!=""){
		$.ajax({
			type : "post",
			url : "#path()/historyrecord/delpatientrecord",
			data : {
				patientid:pid,nurseid:nurseid
			},
			dataType : "json",
			async: false,
			success : function(result) {
				if(result.status=="200"){
					$('#patientRecordList').bootstrapTable('refresh');
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
					querydividstatus(starttime,endtime);
				}else{
					console.log(result);
				}
			},
			error : function() {
			}
		});
	}
}

function findpatientrecord(pid){
	window.location.href="#path()/divid/index?id="+pid+"&type=xgpj";
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
			//$.messager.alert('提示','获取失败，请联系管理员');
		}
	});
}
/*$(function(){

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
//        				$("#warnNum").html("共有"+length+"条报警消息等待处理.....");
//            			$("#warnNum2").html("共有"+length+"条报警消息等待处理.....");
        			}
        		}
        	}
		},
		error : function() {
		}
	});

});*/
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

			if(result.status=="200"){
				// 基于准备好的dom，初始化echarts实例

				var num =0;

				for(var i=0;i<result.rows.length;i++){


					num += parseInt(result.rows[i].gradenum);

				}
				//$("#yifenzhen").text(num);

			}else{
				console.log(result);
				// tipbiandan('linechart');
			}
		},
		error : function() {
		}
	});
}