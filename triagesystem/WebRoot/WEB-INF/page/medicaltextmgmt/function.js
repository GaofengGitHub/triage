function pjbList() {
	var searchText = $('#searchText').val();
    $('#pjbList').datagrid({
            url: '#path()/yjfzpjb/queryYJFZPJB',
            queryParams : {
            	searchText : searchText
            },
            allowCellSelect: true,
            //idField: 'id',
            rownumbers: true,
            toolbar: '#row1,#row2',
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
                { field: 'pjbid', hidden: 'true' },
                {field : 'name',title : '名称',align : 'center',width : '21%',sortable : true},
				{field : 'address',title : '地址',align : 'center',width : '50%',sortable : true},
                {field : 'status',title : '状态',align : 'center',width : '30%',sortable : true,
					formatter : function(value, row, index) {
						if(row.status == '1'){
							return '<h4><span class="label label-default">使用</span></h4>';
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
                    $('#pjbList').datagrid('refreshRow', index);
            }
            
        });
}

function modInfo(){
    var rowData = $("#pjbList").datagrid("getSelections");
	if(rowData.length != 1){
        toastr.warning("请选中一行数据");
        return;
    }
    $('#twopanel').panel({
		href:'#path()/yjfzpjb/updateYJFZPJB?pjbid='+rowData[0].pjbid
	});   
}

function disablepjb(){
	var rowData = $("#pjbList").datagrid("getSelections");
	if(rowData.length != 1){
        toastr.warning("请选中一行数据");
        return;
    }
	var rowIndex=$('#pjbList').datagrid('getRowIndex',rowData[0]);
	 $.ajax({
	        type : "post",
	        url : "#path()/yjfzpjb/disablePJB",
	        dataType : "json",
	        async : false,
	        data : {
	        	pjbid : rowData[0].pjbid
	        },
	        success : function(result) {
	            //编辑完之后自动刷新行
	            $('#pjbList').datagrid( rowIndex,'refreshRow');
	        },
	        error : function() {
	        	toastr.warning("停用/启用失败");
	        }
	    });
}


