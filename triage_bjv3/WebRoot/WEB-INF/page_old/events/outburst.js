$(document).ready(function() {
	queryEvents();
	setgradebtncss2();
	/*laydate.render({
		  elem: '#btn-input-begin', //指定元素
		  type: 'datetime'
	});
	laydate.render({
		  elem: '#btn-input-end', //指定元素
		  type: 'datetime'
	});
*/	
	//为搜索添加回车事件
	$(document).bind('keypress', function(event) {
		if (event.keyCode == "13") {
			queryEvents();
		}
	});
});

function showDivid(id){
	window.location.href="#path()/divid/index?id="+id+"&type=divid";
}

function show(id){
	

$('#tb4').datagrid(
            {
                url: '#path()/events/seachPatient',
                queryParams: {
                	searchText : id
                },
                allowCellSelect: true,
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
                onLoadSuccess: function (data) {
                    if (data.total == 0) {
                    	$(this).datagrid('appendRow', { id: '<div style="text-align:center;width:734px" class="tfmessage">没有找到符合条件的记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'id', colspan: 9 });
                    	//$.messager.alert("提示","待分诊、接诊患者中没有找到符合条件的记录!");
                    	var wid = $(".tfmessage").parents(".datagrid-body").width();
                    	$(".tfmessage").parent().width((wid-8));
                    	$(".tfmessage").width((wid-8));                  	
                    }
                    //如果通过调用reload方法重新加载数据有数据时显示出分页导航容器
                },
                height:null,
                width:'845px',
                columns: [[
                	{field:'id',title:'分诊号',width:38, align: 'center',width : '14%',}, 
                                               
					{field : 'cardnum',title : '身份证/医保卡/就诊卡号',align : 'center',width : '21%',sortable : true,},
					
					{field : 'fullname',title : '姓名',align : 'center',width : '13%',sortable : true,
						formatter : function(value, row, index) {
							str = '';
							if (row.special=="1"){
								str+='<img class="" src="#path()/static/images/iconTips1.png">';
							}
							if (row.qianfei=="1"){
								str+='<img class="" src="#path()/static/images/iconTips2.png">';
							}
							str+= " " + row.fullname;
							return str;
						}},
					{field : 'gender',title : '性别',align : 'center',width : '6%',sortable : true},
					{field : 'age',title : '年龄',align : 'center',width : '5%',sortable : true},
					{field : 'grade',title : '等级',align : 'center',width : '8%',sortable : false,
						formatter : function(value, row, index) {
							
							var strhtml = '';
							var auto = row.autograde;
							var autoname = row.autoname;
							var finalname = row.finalname;
							var final = row.finalgrade;
							var grade = "";
							var name ="";
							if(final==null||final==""){
								grade = auto;
								name = autoname;
							}else{
								grade = final;
								name = finalname;
							}
							
							//判断分级
							if(!(grade==null||grade=="")){
								grade = grade.substring(grade.length-1,grade.length);
							}
							
							
							switch(grade)
							{
							    case '1':
							    	//alert(11);
							    	strhtml+='<button type="button" class="btn btn-1  btn-1-selected btn-xs ">'+name+'</button>';
							        break;
							    case '2':
							    	strhtml+='<button type="button" class="btn btn-2  btn-2-selected btn-xs ">'+name+'</button>';
							        break;
							    case '3':
							    	strhtml+='<button type="button" class="btn btn-3 btn-3-selected btn-xs ">'+name+'</button>';
							        break;
							    case '4':
							    	strhtml+='<button type="button" class="btn btn-4  btn-4-selected btn-xs ">'+name+'</button>';
							        break;
							    case '5':
							    	strhtml+='<button type="button" class="btn btn-5  btn-5-selected btn-xs ">'+name+'</button>';
							        break;
							    default:
							    	strhtml+='<button type="button" class="btn btn-primary btn-xs">未分级</button>';
							}
							
							return strhtml;
						}},
					{field : 'status',title : '患者状态',align : 'center',width : '9%',sortable : true},
					{field : 'dividdepartmentname',title : '分诊科室',align : 'center',width : '9%',sortable : true},
					{field : 'xx',title : '详情',align : 'center',width : '9%',sortable : false,
						formatter : function(value, row, index) {
							str = '';	
							str+= '<button type="button" class="btn btn-info btn-xs" onclick="showDivid(&quot;'+ row.id +'&quot)">详情</button>';
							return str;
						}}
					
					//{field : 'id',hidden:true}
                ]]
            });
	$('#seach_div').find(".datagrid-view").addClass("seach_div_data");
	$('#seach_div').find(".datagrid-view").find(".datagrid-view2")
	.find(".datagrid-header").addClass("seach_div_header");
	//alert($('#seach_div').find(".datagrid-view").css("height")); 

	$('#seach_patient').modal();
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

function queryEvents() {
	$('#tb0').datagrid(
            {
                url: '#path()/events/queryEvents',
                queryParams: {
                	name : $('#btn-input-name').val(),
                	begin : $('#btn-input-begin').val(),
                	end : $('#btn-input-end').val()
                },
                allowCellSelect: false,
                check: {
                    enable: true
                },
                //idField: 'id',
                rownumbers: false,
                toolbar: '#title',
                nowrap: true, //列内容多时自动折至第二行
                border: false,
                pagination:true,
                fit:'true',
                fitColumns:true,
                singleSelect:true,
                remoteSort:false,  
                sortName:'dividtime',
                sortOrder :'desc',
                pageSize: 10,
                pageList: [10,20,30,40],
                columns: [[
					{field : 'numno',title: '序号',align : 'center',width : '14%',  
						formatter: function (value, row, index) {  
						        return index+1;  
						    }  
					},
					{field : 'dividtime',title : '分诊时间',align : 'center',width : '16%',sortable : true,},
					
					{field : 'name',title : '事件',align : 'center',width : '14%',sortable : false,},
					{field : 'num',title : '人数',align : 'center',width : '14%',sortable : false},
					{field : 'nursename',title : '分诊护士',align : 'center',width : '14%',sortable : false},
					{field : 'recivetime',title : '全部接诊时间',align : 'center',width : '14%',sortable : false},
					{field : 'id',title : '操作',align : 'center',width : '14%',sortable : false,
						formatter : function(value, row, index) {
							str = '';
	
							str+= '<button type="button" class="btn btn-info btn-xs" onclick="show(&quot;'+ row.id +'&quot)">查看</button>';
							return str;
						}}
                ]]
            });
}


function toAdd(){
	window.location.href="#path()/events/add";
}

