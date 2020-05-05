$(document).ready(function() {
	queryEvents();
})

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
					{field : 'dividtime',title : '分诊时间',align : 'center',width : '10%',sortable : true,},
					
					{field : 'name',title : '事件',align : 'center',width : '6%',sortable : false,},
					{field : 'num',title : '人数',align : 'center',width : '4%',sortable : true},
					{field : 'nursename',title : '分诊护士',align : 'center',width : '4%',sortable : true},
					{field : 'recivetime',title : '全部接诊时间',align : 'center',width : '10%',sortable : true},
					{field : 'id',title : '操作',align : 'center',width : '6%',sortable : true,
						formatter : function(value, row, index) {
							str = '';
	
							str+= '<button type="button" class="btn btn-sm">查看</button>';
							return str;
						}}
                ]]
            });
}


function toAdd(){
	window.location.href="#path()/events/add";
}

