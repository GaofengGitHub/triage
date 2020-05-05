
function departlist() {
	var searchText = $('#searchText').val();
    $('#departList').datagrid({
            url: '#path()/systemmgmt/queryDepart',
            queryParams : {
               searchText : searchText
            },
            allowCellSelect: true,
            check: {
                enable: true
            },
            //idField: 'id',
            rownumbers: true,
            toolbar: '#row1,#row2',
            nowrap: true, //列内容多时自动折至第二行
            border: false,
            pagination:true,
            pageSize : 10, //页大小
            pageList : [ 5, 10, 15, 20 ],
            fitColumns:true,
            singleSelect: true,//选择多行
            columns: [[
				{field : 'departid',title : '科室编码',align : 'center',width : '25%',sortable : true},
				{field : 'departname',title : '科室名称',align : 'center',width : '25%',sortable : true},
				{field : 'readyclinicalreceptionmax',title : '待接诊数上限',align : 'center',width : '25%',sortable : true},
				//{field : 'clinicalreceptionmax',title : '接诊上限',align : 'center',width : '15%',sortable : true},
				//{field : 'departbednum',title : '科室床位',align : 'center',width : '15%',sortable : true},
				//{field : 'addbednum',title : '科室加床',align : 'center',width : '15%',sortable : true},
				{field : 'status',title : '状态',align : 'center',width : '25%',sortable : true,
					formatter : function(value, row, index) {
						if(row.status == '1'){
							return '<h4><span class="label label-default">使用中</span></h4>';
						}else{
							return '<span>停用</span>';
						}
					}
				}
            ]],
            onAfterEdit : function(index, row) {
                //endEdit该方法触发此事件
                    //updateNodeEditOrNew(row);
                    //刷新树结构
                    //row.editing = false;
                    $('#departList').datagrid('refreshRow', index);
            }
            
        });
}

function modInfo(){
    var rowData = $("#departList").datagrid("getSelections");
	if(rowData.length != 1){
        toastr.warning("请选中一行数据");
        return;
    }
   /* $('#departList').datagrid('clearSelections'); 
    var rowIndex=$('#departList').datagrid('getRowIndex',rowData[0]);*/
    
    $('#twopanel').panel({
		href:'#path()/systemmgmt/updateDepart?departid='+rowData[0].departid
	});   
}

function disabledepart(){
	var rowData = $("#departList").datagrid("getSelections");
	if(rowData.length != 1){
        toastr.warning("请选中一行数据");
        return;
    }
	 var truthBeTold = window.confirm("确定要停用/启用此科室？");
	 if (truthBeTold) {
	 
		var rowIndex=$('#departList').datagrid('getRowIndex',rowData[0]);
		 $.ajax({
		        type : "post",
		        url : "#path()/systemmgmt/disableDepart",
		        dataType : "json",
		        async : false,
		        data : {
		        	departid : rowData[0].departid
		        },
		        success : function(result) {
		            //编辑完之后自动刷新行
		            $('#departList').datagrid( rowIndex,'refreshRow');
		        },
		        error : function() {
		        	toastr.warning("停用/启用失败");
		        }
		    });
	 }
}

/*批量导入*/
/*#load:为按钮,点击后生成一个隐藏的input file标签*/

function uploadFile() {
    var myform = new FormData();
    myform.append('file',$('#load_xls')[0].files[0]);
    $.ajax({
        //url: "admin.php?r=org/orguser/addusers",
        type: "POST",
        //data: myform,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
        },
        error:function(data){
            console.log(data)
        }
    });
}

