$(document).ready(function() {
	querypatientwwxbynurse();
})

function querypatientwwxbynurse(){
	$('#showbululist').bootstrapTable({
        url: '#path()/signout/querypatientlistbydividenurse',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortStable: "asc",                   //排序方式
        async: false,
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	  var temp = {   
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	        sort: params.sort,      //排序列名  
                    sortOrder: params.order,
                    searchText:$("#btn-input").val()
        	       };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20,50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [[
				{ //field: 'Number',//可不加  
				  title: '序号',//标题  可不加  
				  formatter: function (value, row, index) {  
				        return index+1;  
				    }  
				},
                {visible : false,field : 'pid',title:'编号',sortable: true},
                {field : 'cardnum',title : '身份证/医保卡/就诊卡号',sortable: true},
				{field : 'fullname',title : '姓名',sortable: true},
				{field : 'gender',title : '性别',sortable: true},
				{field : 'age',title : '年龄',sortable: true},
				
				{field : 'gradename',title : '分诊等级',sortable: true,
					formatter:function(value,row,index){    
	            	var strhtml = '';
					strhtml='<button type="button" class="btn btn-xs" style="background-color:'+row.gradecolor+'">'+value+'</button>';
					return strhtml;    
	                }
				},
				{
		            field: 'nullnum',
		            title: '完成状态',sortable: true,
		            formatter:function(value,row,index){    
		            	var strhtml="";
		            	if(value==0){
		            		strhtml='<a onclick="gotodivid(&quot;'+row.pid+'&quot;);"><span class="btn btn-1001 btn-1001-selected btn-xs">已完成</span></a>';
                        }else{		
						    strhtml='<a style="color:red" onclick="gotodivid(&quot;'+row.pid+'&quot;);" class="btn btn-xs">'+value+'项未完成</a>';
                        }      
						return strhtml;    
		            }
		        },
				{field : 'dividtime',title : '分诊时间',sortable: true}
				]]
    });
	$('#showbululist').bootstrapTable('refresh');
	
	/*$('#showbululist').datagrid(
            {
            	url: '#path()/signout/querypatientlistbydividenurse',         //请求后台的URL（*）
                queryParams: {
                	searchText:$("#btn-input").val()
                },
                allowCellSelect: false,
                check: {
                    enable: true
                },
                idField: 'id',
                rownumbers: false,
                toolbar: '#title',
                nowrap: true, //列内容多时自动折至第二行
                border: false,
                pagination:true,
                fitColumns:true,
                singleSelect:true,
                columns: [[
						{field: 'pid', hidden: 'true' },
						{field : 'cardnum',title : '身份证/医保卡/就诊卡号',align : 'center',sortable : false},
						{field : 'fullname',title : '姓名',align : 'center',sortable : false},
						{field : 'gender',title : '性别',align : 'center',sortable : false},
						{field : 'age',title : '年龄',align : 'center',sortable : false},
						
						{field : 'gradename',title : '分诊等级',align : 'center',sortable : false,
							formatter:function(value,row,index){    
							var strhtml = '';
							strhtml='<button type="button" class="btn btn-xs" style="background-color:'+row.gradecolor+'">'+value+'</button>';
							return strhtml;    
						    }
						},
						{
						    field: 'nullnum',
						    title: '完成状态',align : 'center',sortable : false,
						    formatter:function(value,row,index){    
						    	var strhtml="";
						    	if(value==0){
						    		strhtml='<span class="btn btn-1001   btn-1001-selected btn-xs ">已完成</span>';
						        }else{		
								    strhtml='<a style="color:red" onclick="gotodivid(&quot;'+row.pid+'&quot;);" class="btn btn-xs">'+value+'项未完成</a>';
						        }      
								return strhtml;    
						    }
						},
						{field : 'dividtime',title : '分诊时间',align : 'center',sortable : false}
                ]]
            });*/
	/*$('#showbululist').datagrid({
		    url: '#path()/signout/querypatientlistbydividenurse',         //请求后台的URL（*）
		    queryParams : {
		    	searchText:$("#btn-input").val()
		    },
		    allowCellSelect: true,
		    //idField: 'id',
		    rownumbers: true,
		    toolbar: '#title',
		    nowrap: true, //列内容多时自动折至第二行
		    border: false,
		    pagination:true,
		    pageSize : 10, //页大小
		    pageList : [ 5, 10, 15, 20 ],
		    fitColumns:true,
		    check: {
		        enable: true
		    },
		    singleSelect: true,//选择多行
		    columns: [[
		        {field: 'pid', hidden: 'true' },
		        {field : 'cardnum',title : '身份证/医保卡/就诊卡号',align : 'center',sortable : true},
				{field : 'fullname',title : '姓名',align : 'center',sortable : true},
				{field : 'gender',title : '性别',align : 'center',sortable : true},
				{field : 'age',title : '年龄',align : 'center',sortable : true},
				
				{field : 'gradename',title : '分诊等级',align : 'center',sortable : true,
					formatter:function(value,row,index){    
		        	var strhtml = '';
					strhtml='<button type="button" class="btn btn-xs" style="background-color:'+row.gradecolor+'">'+value+'</button>';
					return strhtml;    
		            }
				},
				{
		            field: 'nullnum',
		            title: '完成状态',align : 'center',sortable : true,
		            formatter:function(value,row,index){    
		            	var strhtml="";
		            	if(value==0){
		            		strhtml='<span class="btn btn-1001   btn-1001-selected btn-xs ">已完成</span>';
		                }else{		
						    strhtml='<a style="color:red" onclick="gotodivid(&quot;'+row.pid+'&quot;);" class="btn btn-xs">'+value+'项未完成</a>';
		                }      
						return strhtml;    
		            }
		        },
				{field : 'dividtime',title : '分诊时间',align : 'center',sortable : true}
				
		    ]]
	});*/
}

function gotodivid(pid){
	window.location.href="#path()/divid/index?id="+pid;
}

function finalloginout(){
	var a = true;
	$.ajax({
        type: "post",
        url: "#path()/signout/querypatientbydividenurse",
        data:{
        },
        dataType: "json",
        async:false,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
                     if(!result.rows){
                    	 a=false;
                     }
				} else {
					//默认颜色设置
				}
        	}
		},
		error : function() {
		}
	});
	if(a){
		window.location.href='#sso()logout';
	}else{
		$('#signoutModel3').modal();
	}
}

function finalqiantui(){
	window.location.href='#sso()logout';
}