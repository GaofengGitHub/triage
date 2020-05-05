function userlist() {
	var searchText = $('#searchText').val();
    $('#uList').datagrid({
            url: '#path()/usermgmt/queryUser',
            queryParams : {
            	searchText : searchText
            },
            allowCellSelect: true,
            //idField: 'id',
            //rownumbers: true,
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
                {field: 'userid', hidden: 'true' },
                {field: 'roleid', hidden: 'true' },
                {field: 'departid', hidden: 'true' },
                {field: 'loginname', hidden: 'true' },
                {field : 'rowno',title : '序号',align : 'center',width : '4%'},
				{field : 'username',title : '姓名',align : 'center',width : '8%',sortable : true},
				{field : 'workid',title : '工号',align : 'center',width : '19%',sortable : true},
				{field : 'gender',title : '性别',align : 'center',width : '5%',sortable : true,
                    formatter : function(value, row, index) {
                        	var gender = row.gender;
                            if (value == 1) {
                            	gender = '男';
                            } else if (value == 2) {
                            	gender = '女';
                            }else if (value == 0) {
                            	gender = '未知';
                            }
                            return gender;
                        }
                },
				{field : 'age',title : '年龄',align : 'center',width : '5%',sortable : true,
                	formatter : function(value, row, index) {
                		return jsGetAge("",row.birthday);
				    }	
				},
				{field : 'rolename',title : '身份',align : 'center',width : '10%',sortable : true},
                {field :'department', title : '所在科室', align : 'center', width : '20%',sortable : true},
                {field : 'status',title : '状态',align : 'center',width : '8%',sortable : true,
					formatter : function(value, row, index) {
							if(row.status == '1'){
								return '<h4><span class="label label-default">使用</span></h4>';
							}else{
								return '<span>停用</span>';
							}
					}
				},
				 {field : 'aa',title : '操作',align : 'center',width : '8%',sortable : true,
					formatter : function(value, row, index) {
						var con='人员字典';
//						if(row.his_user !=''){
//							con ='所属科室:'+row.CTCP_DeptCode+'</br></br>姓名:'+row.CTCP_Name;
//						}
						return '<h4><span class="label label-default"  onclick="choseHisUser('+row.userid+')">'+con+'</span></h4>';
					}
				},
				 {field : 'bb',title : '绑定状态',align : 'center',width : '15%',sortable : true,
					formatter : function(value, row, index) {
						var con='未绑定';
						if(row.his_user !=''){
							con ='所属科室:'+row.CTCP_DeptCode+'</br>姓名:'+row.CTCP_Name;
						}
						return '<span >'+con+'</span>';
					}
				}
            ]],
            onAfterEdit : function(index, row) {
                //endEdit该方法触发此事件
                    //updateNodeEditOrNew(row);
                    //刷新树结构
                    //row.editing = false;
                    $('#uList').datagrid('refreshRow', index);
            }
            
        });
}

/*根据出生日期算出年龄*/
function jsGetAge(age,strBirthday){
	if((age!='')&&(age!=null)){
		return age;
	}
	
	if(strBirthday == ''||strBirthday==null){
		return '0';
	}
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    
    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
   
    var ageDiff = nowYear - birthYear ; //年之差
    if(ageDiff > 2){
    	return ageDiff+"岁";
    }else{
    	var monthiDiff = nowMonth - birthMonth;
    	var dayDiff = nowDay - birthDay;//日之差
    	if((ageDiff==0)&&(monthiDiff<=2)){
    		
    		if(monthiDiff==0){
    			return dayDiff+ "天";
    		}else if(monthiDiff==1){
    			return dayDiff+monthiDiff*30 + "天";	
    		}else{
    			if(dayDiff>0){
    				return monthiDiff+"月";
    			}else{
    				return dayDiff+monthiDiff*30 + "天";	
    			}
    		}
    	}else if((ageDiff==0)&&(monthiDiff>2)){
    		return monthiDiff+"月";
    	}else if((ageDiff==2)&&(monthiDiff>0)){
    		return ageDiff+"岁";
    	}else if((ageDiff==2)&&(monthiDiff==0)&&(dayDiff>0)){
    		return ageDiff+"岁";
    	}else if(dayDiff<0){	
    		return (ageDiff*12+monthiDiff-1)+"月";
    	}else{
    		return (ageDiff*12+monthiDiff)+"月";
    	}
    }  
}

function modInfo(){
    var rowData = $("#uList").datagrid("getSelections");
	if(rowData.length != 1){
        toastr.warning("请选中一行数据");
        return;
    }
    /*$('#uList').datagrid('clearSelections'); 
    var rowIndex=$('#uList').datagrid('getRowIndex',rowData[0]);
    */
    $('#twopanel').panel({
		href:'#path()/usermgmt/updateUser?userid='+rowData[0].userid
	});   
}

function disableuser(){
	var rowData = $("#uList").datagrid("getSelections");
	if(rowData.length != 1){
        toastr.warning("请选中一行数据");
        return;
    }
	var rowIndex=$('#uList').datagrid('getRowIndex',rowData[0]);
	 $.ajax({
	        type : "post",
	        url : "#path()/usermgmt/disableUser",
	        dataType : "json",
	        async : false,
	        data : {
	        	userid : rowData[0].userid
	        },
	        success : function(result) {
	            //编辑完之后自动刷新行
	            $('#uList').datagrid( rowIndex,'refreshRow');
	        },
	        error : function() {
	        	toastr.warning("停用/启用失败");
	        }
	    });
}

function makeewm(){
	var rowData = $("#uList").datagrid("getSelections");
	if(rowData.length != 1){
        toastr.warning("请选中一行数据");
        return;
    }
	$("#qrcode2").empty();
	var qrcode = new QRCode(document.getElementById("qrcode2"), {
		width : 170,
		height : 170
	});
	$.ajax({
        type : "post",
        url : "#path()/usermgmt/querypasswordloginname",
        dataType : "json",
        async : false,
        data : {
        	userid : rowData[0].userid
        },
        success : function(result) {
            if(result.status==200){
            	var qr = result.rows.loginname+"|"+result.rows.password;
            	if (!qr) {
            		toastr.warning("Input a text");
            		elText.focus();
            		return;
            	}
            	qrcode.makeCode(qr);
            	$("#qrcode2").append("<font id='qrname' style='font-size:20px;line-height:36px'>"+rowData[0].username+"" +
            	"</font><font style='margin-left:10px;font-size:20px;line-height:36px'>"+rowData[0].workid+"</font>");
            }
        },
        error : function() {
        	toastr.warning("二维码生成失败！");
        }
    });
	$("#qrcode").attr("data-toggle","modal");
	$("#qrcode").attr("data-target","#choseEDTS5");
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
var tu_id='';
var hisUserid='';
function choseHisUser(id){
	$("#choseHisUser").modal('show');
	tu_id=id;
	$("#name").val('');
	hisUserid='';
}
function initHisUse(){
	$("#name").typeahead({
		minLength: 0,//键入字数多少开始补全
        source: function (query, process) {
            $.ajax({
                url: '#path()/usermgmt/queryHisUse',
                data: {
                	keywords: query
                },
                type: 'post',
                dataType: "json",
                success: function (result) {
                    var res = [];
                    var rows = result.rows;
                    if(rows ===null){
                    	return process(res);
                    }else{
                    	$.each(rows, function (i, item) {
                            var aItem = { id: item.id, name:"工号:" +item.id + "、姓名:" +item.name ,value:item.name};//把后台传回来的数据处理成带name形式
                            res.push(aItem);
                        });
                    }
                    return process(res);
                }
            });
        },
        showHintOnFocus: "true",//将显示所有匹配项
        fitToElement: true,//选项框宽度与输入框一致
        items: 9999,//下拉选项中出现条目的最大数量。也可以设置为“all”
        autoSelect: false,//允许你决定是否自动选择第一个建议
        updater: function (item) {//item是对象,选中后默认返回displayText的值,对于需要的id和name没有,所以手动赋值吧
//            $(".quickgrade-demo").show();
//        	$(".quickgrade-demo>div.pull-right").show();
//        	ShowIcdDetail(item.value);
        	hisUserid=item.id;
        	return item.value;//下拉框显示重写为name覆盖默认的displayText
        },
        delay: 500//在查找之间添加延迟
    });
}
function saveHisUser(){
	$.ajax({
        type : "post",
        url : "#path()/usermgmt/saveHisUser",
        dataType : "json",
        async : false,
        data : {
        	hisUserid : hisUserid,
        	tu_id:tu_id
        },
        success : function(result) {
        	toastr.success("保存成功！");
        },
        error : function() {
//        	toastr.warning("二维码生成失败！");
        }
    });
}

