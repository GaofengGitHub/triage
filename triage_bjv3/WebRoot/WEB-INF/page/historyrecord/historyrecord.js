$(document).ready(function() {
	querypatienthistory();
})
//回车后查询
function keyclick(e){
	if (e.keyCode == 13) {
		$("#btn-chat").click();
    }
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

function querypatienthistory() {
	
	$('#tb0').datagrid(
            {
                url: '#path()/historyrecord/querypatienthistory2',
                queryParams: {
                	searchText : $('#searchText').val()
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
                fitColumns:true,
                singleSelect:true,
                sortName:'dividtime',
                sortOrder :'desc',
                pageSize: 20,
                pageList: [20,30,40,50],
                columns: [[
					{field : 'numno',title: '序号',align : 'center',width : '2%',  
						formatter: function (value, row, index) {  
						        return index+1;  
						    }  
					},
					{field : 'cardnum',title : '就诊卡号',align : 'center',width : '10%',sortable : true,},
					
					{field : 'fullname',title : '姓名',align : 'center',width : '6%',sortable : false,
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
					{field : 'gender',title : '性别',align : 'center',width : '4%',sortable : true},
					{field : 'bornday',title : '年龄',align : 'center',width : '4%',sortable : true,
						formatter : function(value, row, index) {
							//alert(row.age);
							return jsGetAge(row.age,row.bornday);
						}},
					{field : 'registertime',title : '挂号时间',align : 'center',width : '10%',sortable : true},
					{field : 'jiange1',title : '间隔',align : 'center',width : '6%',sortable : true,formatter:function(value,row,index){
			            	if(value==null){
			            		return "";
			            	}else{
			            		return value+"分"	
			            	}
						
							
			        }},
			        {field : 'gradename',title : '分级',align : 'center',width : '4%',sortable : true},
			        {field : 'dividtime',title : '分诊时间',align : 'center',width : '10%',sortable : true},
					{field : 'dividdepartment',title : '分诊科室',align : 'center',width : '7%',sortable : true},
					{field : 'jiange2',title : '间隔',align : 'center',width : '6%',sortable : true,formatter:function(value,row,index){
		            	if(value==null){
		            		return "";
		            	}else{
		            		return value+"分"	
		            	}
		            }},
					{field : 'receivetime',title : '接诊时间',align : 'center',width : '10%',sortable : true},
					{field : 'receivedepartment',title : '接诊科室',width : '7%',align : 'center',sortable : true},
			        {field : 'caozuo',
			            title: '操作',align : 'center',width : '8%',sortable : false,
			            formatter:function(value,row,index){    
			            	var strhtml = '';
			            	strhtml += "<a href='javascript:void(0);' onclick='findpatientrecord(&quot;"+row.pid+"&quot;);'><span class='label label-warning m10'>查看</span></a>";
			            	strhtml += "<a href='javascript:void(0);' onclick='delpatientrecord(&quot;"+row.pid+"&quot;);'><span class='label label-primary'>删除</span></a>";
							return strhtml;    
			            }
			        }
                ]]
            });
}

function back(mes) { 
    $('#promptmassage').html(mes);//
    $('#promptModel').modal();  
}

function delpatientrecord(pid){
	$("#historyid").val(pid);
	back("是否确认删除患者本次就诊信息，将患者从系统中删除？");    
}

function canceldelhistory(){
	$("#historyid").val("");
}

function confirmdelhistory(){
	var pid = $("#historyid").val();
	if(pid!=""){
		$.ajax({
			type : "post",
			url : "#path()/historyrecord/delpatientrecord",
			data : {
				patientid:pid
			},
			dataType : "json",
			async: false,
			success : function(result) {
				if(result.status=="200"){
					$('#tb0').datagrid('reload');
				}else{
					console.log(result.message);
				}
			},
			error : function() {
			}
		});
	}
}

function findpatientrecord(pid){
	window.location.href="#path()/divid/index?id="+pid+"&type=histroy";
}

