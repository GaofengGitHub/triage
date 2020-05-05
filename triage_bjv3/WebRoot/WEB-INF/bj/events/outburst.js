$(document).ready(function() {
	$("#events").addClass("leftNavActive").find("img").attr("src",$("#events").find(".iconNavImg").data("activeImg"));
	$("#events").siblings().removeClass("leftNavActive");
	$("#home").find("img").attr("src",$("#home").find(".iconNavImg").data("activeImg"));
	//单选按钮点击文字选中
	$(".checkbox label").click(function(){
		$(this).parents().addClass("active").siblings().removeClass("active");
		$(this).find("input").attr("checked",true);
		var i = $(this).find("input").attr('val')
		queryEvents(i);
	});
	
	$("#events").addClass("active");
	$("#events").siblings().removeClass("active");
	queryEvents(0);
	setgradebtncss2();
	var evevtsid ='#(evevtsid)';
	var name='#(name)';
	var num='#(num)';
	var begin='';
	var end='';
	if(evevtsid !=''){
		show(evevtsid,name,num);	
	}
	
	laydate.render({
		elem : '#btn-input-begin', // 指定元素
		type : 'datetime'
	});
	laydate.render({
		elem : '#btn-input-end', // 指定元素
		type : 'datetime'
	});

	// 为搜索添加回车事件
	$(document).bind('keypress', function(event) {
		if (event.keyCode == "13") {
			queryEvents(0);
		}
	});	
/*	$("#time input[type='radio']").click(function(){
		//选中
		if($(this).is(':checked')){
			var time = $(this).attr('value');
			queryEvents(time);
		}
		
	});*/
});

function showDivid(id,cixu,savestatus) {
	var evevtsid = $('#evevtsid').val();
	var name = $('#name').html();
	var num = $('#num').html();
 	if(cixu=='1' && savestatus=='draf'){
		cixu='divid';
	}else{
		cixu='xgpj'
	}
 	name = encodeURI(name);
 	name = encodeURI(name);  //需要通过两次编码
	window.location.href = "#path()/divid/index?id=" + id + "&type="+cixu+"&status=events"+"&evevtsid="+evevtsid+"&name="+name+"&num="+num;
}

/* 根据出生日期算出年龄 */
function jsGetAge(age, strBirthday) {
	if ((age != '') && (age != null)) {
		return age;
	}

	if (strBirthday == '' || strBirthday == null) {
		return '0';
	}
	var strBirthdayArr = strBirthday.split("-");
	var birthYear = strBirthdayArr[0];
	var birthMonth = strBirthdayArr[1];
	var birthDay = strBirthdayArr[2];

	d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1;
	var nowDay = d.getDate();

	var ageDiff = nowYear - birthYear; // 年之差
	if (ageDiff > 2) {
		return ageDiff + "岁";
	} else {
		var monthiDiff = nowMonth - birthMonth;
		var dayDiff = nowDay - birthDay;// 日之差
		if ((ageDiff == 0) && (monthiDiff <= 2)) {

			if (monthiDiff == 0) {
				return dayDiff + "天";
			} else if (monthiDiff == 1) {
				return dayDiff + monthiDiff * 30 + "天";
			} else {
				if (dayDiff > 0) {
					return monthiDiff + "月";
				} else {
					return dayDiff + monthiDiff * 30 + "天";
				}
			}
		} else if ((ageDiff == 0) && (monthiDiff > 2)) {
			return monthiDiff + "月";
		} else if ((ageDiff == 2) && (monthiDiff > 0)) {
			return ageDiff + "岁";
		} else if ((ageDiff == 2) && (monthiDiff == 0) && (dayDiff > 0)) {
			return ageDiff + "岁";
		} else if (dayDiff < 0) {
			return (ageDiff * 12 + monthiDiff - 1) + "月";
		} else {
			return (ageDiff * 12 + monthiDiff) + "月";
		}
	}
}

function toAdd() {
	window.location.href = "#path()/events/add";
}

function queryEvents(i) {
//	alert(GetPreMonthDay(synctime().substring(0,10),12));
	if($(window).width()<=1366){
		$("#tb0").attr('data-height','500');
	}
	end =synctime().substring(0,10);
	if(i==0){
		begin=$('#btn-input-begin').val();
		end=$('#btn-input-end').val();
	}else{
		begin =GetPreMonthDay(end,i);
		$('#btn-input-begin').val(begin);
		$('#btn-input-end').val(end);
	}
	if(i=='all'){
		begin='';
		end='';
		$('#btn-input-begin').val(begin);
		$('#btn-input-end').val(end);
	}
	$('#tb0')
			.bootstrapTable(
					{
						url : '#path()/events/queryEvents', // 请求后台的URL（*）
						method : 'post',// 请求方式（*）
						contentType : "application/x-www-form-urlencoded",
						// toolbar: '#toolbar', //工具按钮用哪个容器
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						pagination : true, // 是否显示分页（*）
						sortable : false, // 是否启用排序
						sortName : 'dividtime',
						sortOrder : 'desc',
						async : false,
						queryParams : function(params) {
							// 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
							var temp = {
								rows : params.limit, // 页面大小
								page : (params.offset / params.limit) + 1, // 页码
								name : $('#btn-input-name').val(),
								begin :begin,
								end : end
							};
							return temp;
						},// 传递参数（*）
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						pageList : [ 10, 20, 30 ], // 可供选择的每页的行数（*）
						search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
						strictSearch : true,
						showColumns : false, // 是否显示所有的列
						showRefresh : false, // 是否显示刷新按钮
						minimumCountColumns : 2, // 最少允许的列数
						clickToSelect : true, // 是否启用点击选中行
						// height: 200, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
						uniqueId : "id", // 每一行的唯一标识，一般为主键列
						showToggle : false, // 是否显示详细视图和列表视图的切换按钮
						cardView : false, // 是否显示详细视图
						detailView : false, // 是否显示父子表
						columns : [
								{ // field: 'Number',//可不加
									title : '序号',// 标题 可不加
									formatter : function(value, row, index) {
										return index + 1;
									}
								},
								// {visible : false,field : 'pid',title:'编号'},
								{
									field : 'dividtime',
									title : '首个患者分诊时间',
						            formatter:function(value,row,index){    
						            	var strhtml = '';
						            	if(row.dividtime==null){
						            		return '-';
						            	}else{
						            		strhtml += row.dividtime;
											return todayOrYesterday(strhtml);
						            	}
						            	
						            	 
						            }
								},
								{
									field : 'name',
									title : '事件'
								},
								{
									field : 'num',
									title : '人数'
								},
								{
									field : 'nursename',
									title : '分诊护士'
								},
								{
									field : 'recivetime',
									title : '全部接诊时间',
									formatter : function(value, row, index) {
										if(row.recivetime==null){
											return row.recivetime;
										}else{
											return row.recivetime.substring(0,16);
										}
									}
								},
								{
									field : 'id',
									title : '操作',
									formatter : function(value, row, index) {
										var strhtml = '';
										strhtml += '<button id='+row.id+' Userbehavior="A61" type="button" class="btn btn-info btn-look btn-tfsj" onclick="show(&quot;'
												+ row.id
												+ '&quot;,&quot;'
												+ row.name
												+ '&quot;,&quot;'
												+ row.num
												+ '&quot;)"><img src="#path()/static/vendor/newpage/images/home/home_search.png"/></button>';
										return strhtml;
									}
								} ]
					});
	$('#tb0').bootstrapTable('refresh',{
        pageNumber:1
    });	
}
function show(id, name, num) {
	$('#evevtsid').val(id);
	$('#page-wrapper').hide();
	$('#main1').hide();
	$('#main2').show();
	$('#name').html( name);
	$('#num').html(num );
	$('#tb5')
			.bootstrapTable(
					{
						url : '#path()/events/seachPatient',
						queryParams : function(params) {
							// 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
							var temp = {
								rows : params.limit, // 页面大小
								page : (params.offset / params.limit) + 1, // 页码
								searchText : id
							};
							return temp;
						},// 传递参数（*）
						method : 'post',// 请求方式（*）
						contentType : "application/x-www-form-urlencoded",
						// toolbar: '#toolbar', //工具按钮用哪个容器
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						pagination : true, // 是否显示分页（*）
						sortable : false, // 是否启用排序
						sortName : 'dividtime',
						sortOrder : 'desc',
						async : false,

						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						pageList : [ 10, 20, 30 ], // 可供选择的每页的行数（*）
						search : false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
						strictSearch : true,
						showColumns : false, // 是否显示所有的列
						showRefresh : false, // 是否显示刷新按钮
						minimumCountColumns : 2, // 最少允许的列数
						clickToSelect : true, // 是否启用点击选中行
						// height: 200, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
						uniqueId : "id", // 每一行的唯一标识，一般为主键列
						showToggle : false, // 是否显示详细视图和列表视图的切换按钮
						cardView : false, // 是否显示详细视图
						detailView : false, // 是否显示父子表
						columns : [ [
								{ // field: 'Number',//可不加
									title : '序号',// 标题 可不加
									formatter : function(value, row, index) {
										return index + 1;
									}
								},
								{
									field : 'grade',
									title : '分级',
									formatter : function(value, row, index) {

										var strhtml = '';
										var auto = row.autograde;
										var autoname = row.autoname;
										var finalname = row.finalname;
										var final = row.finalgrade;
										var grade = "";
										var name = "";
										if (final == null || final == "") {
											grade = auto;
											name = autoname;
										} else {
											grade = final;
											name = finalname;
										}

										// 判断分级
										if (!(grade == null || grade == "")) {
											grade = grade.substring(
													grade.length - 1,
													grade.length);
										}

										switch (grade) {
										case '1':
											// alert(11);
											strhtml += '<button type="button" class="btn btn-1001   btn-1001-selected btn-level">一级</button>';
											break;
										case '2':
											strhtml += '<button type="button" class="btn btn-1002   btn-1002-selected btn-level">二级</button>';
											break;
										case '3':
											strhtml += '<button type="button" class="btn btn-1003  btn-1003-selected btn-level">三级</button>';
											break;
										case '4':
											strhtml += '<button type="button" class="btn btn-1004   btn-1004-selected btn-level">四级</button>';
											break;
										case '5':
											strhtml += '<button type="button" class="btn btn-1005   btn-1005-selected btn-level">五级</button>';
											break;
										default:
											strhtml += '<button type="button" class="btn btn-primary btn-level">未分级</button>';
										}

										return strhtml;
									}
								},
								{
									field : 'id',
									title : '患者编号',
								},

								{
									field : 'cardnum',
									title : '就诊卡号',
								},

								{
									field : 'fullname',
									title : '姓名',
									formatter : function(value, row, index) {
										str = '';
										if (row.special == "1") {
											str += '<img class="" src="#path()/static/images/iconTips1.png">';
										}
										if (row.qianfei == "1") {
											str += '<img class="" src="#path()/static/images/iconTips2.png">';
										}
										str += " " + row.fullname;
										return str;
									}
								},
								{
									field : 'gender',
									title : '性别',
								},
								{
									field : 'age',
									title : '年龄'
								},
								{
									field : 'category',
									title : '费别',
									formatter : function(value, row, index) {

										var name = row.category;
										var strhtml = '';

										switch (name) {
										case '1':
											// alert(11);
											strhtml += '职工医疗保险';
											break;
										case '2':
											strhtml += '居民医疗保险';
											break;
										case '3':
											strhtml += '农村合作医疗';
											break;
										case '4':
											strhtml += '贫困救助';
											break;
										case '5':
											strhtml += '商业医疗保险';
											break;
										case '6':
											strhtml += '全公费';
											break;
										case '7':
											strhtml += '全自费';
											break;
										default:
											strhtml += '其他';
										}

										return strhtml;
									}
								},
								{
									field : 'ssy',
									title : '无创血压mmHg',
									formatter : function(value, row, index) {
										str = row.ssy + "/" + row.szy;
										return str;
									}
								},
								{
									field : 'mb',
									title : '心率次/分',
								},
								{
									field : 'hx',
									title : '呼吸频率次/分',
								},
								{
									field : 'tw',
									title : '体温℃',
								},
								{
									field : 'status',
									title : '患者状态',
									formatter : function(value, row, index) {
										var name = row.status;
										var strhtml = '';
										switch (name) {
										case '未分诊':
											// alert(11);
											strhtml += '待分诊';
											break;
										case '未接诊':
											strhtml += '已分诊';
											break;
										case '已接诊':
											strhtml += '已接诊';
											break;
										default:
											strhtml += '其他';
										}
										return strhtml;
									}
								},
								{
									field : 'dividdepartmentname',
									title : '分诊科室',
								},
								{
									field : 'hljl',
									title : '备注',
								},
								{
									field : 'xx',
									title : '详情',
									formatter : function(value, row, index) {
										str = '';
										str += '<button type="button" Userbehavior="A62" class="btn btn-info btn-look" onclick="showDivid(&quot;'
												+ row.id+ '&quot;,&quot;'
												+ row.cixu
												+ '&quot;,&quot;'
												+ row.savestatus
												+ '&quot;)">详情</button>';
										return str;
									}
								}

						// {field : 'id',hidden:true}
						] ]
					});
	// $('#seach_div').find(".datagrid-view").addClass("seach_div_data");
	// $('#seach_div').find(".datagrid-view").find(".datagrid-view2")
	// .find(".datagrid-header").addClass("seach_div_header");
	// alert($('#seach_div').find(".datagrid-view").css("height"));

	$('#seach_patient').modal();
}

function GetPreMonthDay(date, monthNum) {
    var dateArr = date.split('-');
    var year = dateArr[0]; //获取当前日期的年份
    var month = dateArr[1]; //获取当前日期的月份
    var day = dateArr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - monthNum;
    if (month2 <= 0) {
        var absM = Math.abs(month2);
        year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
        month2 = 12 - (absM % 12);
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}
