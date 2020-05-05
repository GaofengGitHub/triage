$(document).ready(function() {
	
	setgradebtncss2();
	queryCardInfoList();
	
	$("#search").bind("click",function(){
		queryCardInfoList();
	});
	
	$("#all").bind("click",function(){
		$("#fullname").val("");
		$("#cardnum").val("");
		$("#from").val("");
		$("#to").val("");
		queryCardInfoList();
	});
	$("#addCard").bind("click",function(){
		window.location.href="#path()/card/add"; 
	});
	
});



function queryCardInfoList() {
	$('#tb0')
			.bootstrapTable(
					{
						url : '#path()/card/queryCardInfolist', // 请求后台的URL（*）
						method : 'post',// 请求方式（*）
						contentType : "application/x-www-form-urlencoded",
						// toolbar: '#toolbar', //工具按钮用哪个容器
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						pagination : true, // 是否显示分页（*）
						sortable : false, // 是否启用排序
						sortName : 'updatetime',
						sortOrder : 'desc',
						async : false,
						queryParams : function(params) {
							// 这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
							var temp = {
								rows : params.limit, // 页面大小
								page : (params.offset / params.limit) + 1, // 页码
								fullname : $("#fullname").val(),
								cardnum : $("#cardnum").val(),
								from : $("#from").val(),
								to : $("#to").val()
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
									width : '70',
									formatter : function(value, row, index) {
										return index + 1;
									}
								},
								// {visible : false,field : 'pid',title:'编号'},
								{
									field : 'updatetime',
									title : '办卡日期',
									width : '140',
									formatter : function(value, row, index) {
										if(row.updatetime.length>10)
										return row.updatetime.substring(0,10);
										return row.updatetime;
									}
								},
								{
									field : 'cardnum',
									title : '卡号',
									width : '200'
								},
								{
									field : 'idcard',
									title : '身份证号',
									width : '200'
								},
								{
									field : 'fullname',
									title : '姓名',
									width : '100',
									cellStyle:formatTableUnit,
			                        formatter:paramsMatter
								},
								{
									field : 'gender',
									title : '性别',
									width : '80'
								},
								{
									field : 'age',
									title : '年龄',
									width : '60',
									formatter : function(value, row, index) {
										var age = jsGetAge('',row.bronday);
										return age;
									}
								},
								{
									field : 'tel',
									title : '电话',
									width : '140'
								},
								{
									field : 'remark',
									title : '备注',
									/*width : '140',*/
									cellStyle:formatTableUnit,
			                        formatter:paramsMatter
								},
								{
									field : 'id',
									title : '操作',
									width : '80',
									formatter : function(value, row, index) {
										var strhtml = '';
										strhtml += '<button id="'+row.id+'" onclick="loadCardInfo(&quot;'+ row.id +'&quot;)" type="button" class="btn btn-info btn-look" data-toggle="modal" data-target="#cardlist-detail" >查看</button>';
										return strhtml;
									}
								} ]
					});
	$('#tb0').bootstrapTable('refresh');
}


function detailCardInfo(id){
	window.location.href="#path()/card/add?id="+id; 
}


function loadCardInfo(id){
	$.ajax({
        type: "post",
        url: "#path()/card/queryCardInfoById",
        data:{
       	 id:id
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if((result!=null)&&(result.status==200)){
       	 	//基础参数赋值
        		var info = result.rows;
        		
        		var cardnum = info.cardnum.replace(/(.{4})/g,'$1 ');//增加4位空格
        		$("#p_cardnum").html(cardnum);
        		$("#p_updateusername").html(info.updateusername);
        		$("#p_updatetime").html(info.updatetime);
        		$("#p_fullname").html(info.fullname);
        		$("#p_gender").html(info.gender);
        		$("#p_bronday").html(info.bronday);
        		$("#p_age").html(jsGetAge('',info.bronday));
        		$("#p_tel").html(info.tel);
        		$("#p_idcard").html(info.idcard);
        		$("#p_nation").html(info.nation);
        		$("#p_country").html(info.country);
        		$("#p_ralationname").html(info.ralationname);
        		$("#p_ralationtel").html(info.ralationtel);
        		$("#p_adderssdesc").html(info.aprovince+info.acity+info.acountry+info.addressdesc);
        		$("#p_occupation").html(info.occupation);
        		$("#p_workplace").html(info.workplace);
        		$("#p_remark").html(info.remark);
        	}
        		
        },
        error: function(){
        }
    });
}


function paramsMatter(value,row,index) {
    var span=document.createElement('span');
    span.setAttribute('title',value);
    span.innerHTML = value;
    return span.outerHTML;
}

function formatTableUnit(value, row, index) {
    return {
    css: {"white-space": 'nowrap',
    	"text-overflow": 'ellipsis',
    	"overflow": 'hidden'
    }
   };
}
