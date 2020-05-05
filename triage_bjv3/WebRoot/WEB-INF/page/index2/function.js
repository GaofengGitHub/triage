


//警告弹窗
function showToastr(flag){
	$.ajax({
        type: "post",
        url: "#path()/index/queryWarningInfo",
        data:{
        },
        dataType: "json",
        sync:false,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
        			var map = result.rows;
        			var content = "";
        			content += '<ol  class="list-unstyled">';
        			g1 = map["1001"];
        			var g1_html = "";
           	     	var g1_val = 0;
       	     		for(var i in g1){
       	 				var name = g1[i]["fullname"];
   	         			content += '<li class="warning-li"> 姓名：';
   	         			content += name;
   	         			content += ',';
   	         			content+='<button type="button" class="btn btn-1   btn-1-selected btn-xs ">'+g1[i]["gradename"]+'</button>';
   	         			content += '，请尽快安排就诊！</li>';
   	         		//3个换一行 第一个不用结尾
	           	 		if((g1_val%3==0)&&(g1_val!=0)){
	           	 			g1_html+='</li>';
	           	 		}
	           	 		if(g1_val%3==0){
	           	 			g1_html+='<li>';
	           	 		}
	           	 		g1_html += name;
	           	 		
	           	 		g1_val += 1;
	           	 		if(!(g1_val%3==0)){
           	 				g1_html+='、';
           	 			}
       	     		}
       	     	//去除最后一个逗号
       	     		if(!(g1_val%3==0)){
       	     			g1_html = g1_html.substring(0,g1_html.length-1);
       	     		}
       	     		g1_html += "</li>";
       	     		$("#g1_list").html(g1_html);
       	     		g2 = map["1002"];
       	     		var g2_html = "";
       	     		var g2_val = 0;
       	     		for(var i in g2){
   	 				var name = g2[i]["fullname"];
	         			content += '<li class="warning-li"> 姓名：';
	         			content += name;
	         			content += ',';
	         			content+='<button type="button" class="btn btn-2   btn-2-selected btn-xs ">'+g2[i]["gradename"]+'</button>';
	         			content += '，请尽快安排就诊！</li>';
	         			
	         			//3个换一行 第一个不用结尾
	           	 		if((g2_val%3==0)&&(g2_val!=0)){
	           	 			g2_html+='</li>';
	           	 		}
	           	 		if(g2_val%3==0){
	           	 			g2_html+='<li>';
	           	 		}
	           	 		g2_html += name;
	           	 		
	           	 		g2_val += 1;
	           	 		if(!(g2_val%3==0)){
           	 				g2_html+='、';
           	 			}
       	     		}
       	     		//去除最后一个逗号
       	     		if(!(g2_val%3==0)){
       	     			g2_html = g2_html.substring(0,g2_html.length-1);
       	     		}
       	     		g2_html += "</li>";
   	     			$("#g2_list").html(g2_html);
   	     		
   	     			g3 = map["1003"];
   	     		
   	     			var g345_html = "";
   	     			var g345_val = 0;
   	     		
   	     			for(var i in g3){
   	     				var name = g3[i]["fullname"];
   	     				content += '<li class="warning-li"> 姓名：';
   	     				content += name;
   	     				content += ',';
   	     				content+='<button type="button" class="btn btn-3   btn-3-selected btn-xs ">'+g3[i]["gradename"]+'</button>';
   	     				content += '，请尽快安排就诊！</li>';
         			
   	     				//3个换一行 第一个不用结尾
   	     				if((g345_val%3==0)&&(g2_val!=0)){
   	     					g345_html+='</li>';
   	     				}
   	     				if(g345_val%3==0){
   	     					g345_html+='<li>';
   	     				}
           	 			g345_html += name;
           	 		
           	 			g345_val += 1;
           	 			if(!(g345_val%3==0)){
           	 				g345_html+='、';
           	 			}
         			
   	     			}
   	     			g4 = map["1004"];
   	     			for(var i in g4){
   	     				var name = g4[i]["fullname"];
	         			content += '<li class="warning-li"> 姓名：';
	         			content += name;
	         			content += ',';
	         			content+='<button type="button" class="btn btn-4   btn-4-selected btn-xs ">'+g4[i]["gradename"]+'</button>';
	         			content += '，请尽快安排就诊！</li>';
	         			//3个换一行 第一个不用结尾
	           	 		if((g345_val%3==0)&&(g2_val!=0)){
	           	 			g345_html+='</li>';
	           	 		}
	           	 		if(g345_val%3==0){
	           	 			g345_html+='<li>';
	           	 		}
	           	 			g345_html += name;
	           	 		
	           	 		g345_val += 1;
	           	 		if(!(g345_val%3==0)){
	           	 			g345_html+='、';
	       	 			}
   	     			}
   	     			g5 = map["1005"];
   	     			for(var i in g5){
   	     				var name = g5[i]["fullname"];
   	     				content += '<li class="warning-li"> 姓名：';
   	     				content += name;
   	     				content += ',';
   	     				content+='<button type="button" class="btn btn-5   btn-5-selected btn-xs ">'+g5[i]["gradename"]+'</button>';
   	     				content += '，请尽快安排就诊！</li>';
   	     				//3个换一行 第一个不用结尾
           	 		if((g345_val%3==0)&&(g2_val!=0)){
           	 			g345_html+='</li>';
           	 		}
           	 		if(g345_val%3==0){
           	 			g345_html+='<li>';
           	 		}
           	 			g345_html += name;
           	 		
           	 		g345_val += 1;
           	 		if(!(g345_val%3==0)){
           	 			g345_html+='、';
       	 			}
	     		}
	     		
	     		//去除最后一个逗号
   	     		if(!(g345_val%3==0)){
   	     			g345_html = g345_html.substring(0,g345_html.length-1);
   	     		}
   	     			g345_html += "</li>";
   	     		$("#g345_list").html(g345_html);
       	     		
       	     		content += '</ol>';	
       	     		if(flag){
       	     			toastr.error(content,'<font style="color:red;size:16px">报警</font>');
       	     		}
				} else {
				}
        	}
		},
		error : function() {
		}
	});
	
}

function showPatient() {
        $('#tb0').datagrid(
            {
                url: '#path()/index/queryPatient',
                queryParams: {
                	//searchText : $('#searchText').val()
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
                	{field:'rowno',title:'序号',width:38, align: 'center',width : '5%',}, 
                                               
					{field : 'cardnum',title : '身份证/医保卡/就诊卡号',align : 'center',width : '20%',sortable : false,},
					
					{field : 'fullname',title : '姓名',align : 'center',width : '10%',sortable : false},
					{field : 'gender',title : '性别',align : 'center',width : '5%',sortable : false},
					{field : 'bornday',title : '年龄',align : 'center',width : '5%',sortable : false,
						formatter : function(value, row, index) {
							//alert(row.age);
							return jsGetAge(row.age,row.bornday);
						}},
					{field : 'grade',title : '等级',align : 'center',width : '10%',sortable : false,
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
							    	strhtml+='<button type="button" class="btn btn-1   btn-1-selected btn-xs ">'+name+'</button>';
							        break;
							    case '2':
							    	strhtml+='<button type="button" class="btn btn-2   btn-2-selected btn-xs ">'+name+'</button>';
							        break;
							    case '3':
							    	strhtml+='<button type="button" class="btn btn-3  btn-3-selected  btn-xs ">'+name+'</button>';
							        break;
							    case '4':
							    	strhtml+='<button type="button" class="btn btn-4   btn-4-selected btn-xs ">'+name+'</button>';
							        break;
							    case '5':
							    	strhtml+='<button type="button" class="btn btn-5  btn-5-selected btn-xs ">'+name+'</button>';
							        break;
							    default:
							    	strhtml+='<button type="button" class="btn btn-primary btn-xs">未分级</button>';
							}
						                  	
							return strhtml;
						}},
						{field : 'grade1',title : '操作',align : 'center',width : '19%',sortable : false,
							formatter : function(value, row, index) {
								
								var strhtml = '';
								strhtml+='<a href="#"  onclick="patientDivid(&quot;'+ row.id +'&quot;);"type="button" class="btn btn-info btn-xs">分诊</a>';
								strhtml+='<button type="button" class="btn btn-outline btn-default btn-xs">腕带</button>';
								strhtml+='<button type="button" class="btn btn-outline btn-default btn-xs">报</button>';
								strhtml+='<button type="button" class="btn btn-outline btn-default btn-xs">退</button>';
							                  	
								return strhtml;
							}},
					{field : 'registertime',title : '挂号时间',align : 'center',width : '24%',sortable : false,
						formatter : function(value, row, index) {
							return jsGetTime(row.registertime) + " " + row.registertime;
						}},
					{field : 'id',hidden:true}
                ]]
            });
    }

function seachPatient(){
	
	var searchname = $('#searchText').val();
	var re = /[~#^$@%&!*()<>:;'"{}【】]/gi;
	if(re.test(searchname)){
		$.messager.alert('提示','不能包含特殊字符！');
		return;
	}
	
	$('#tb4').datagrid(
            {
                url: '#path()/index/seachPatient',
                queryParams: {
                	searchText : $('#searchText').val()
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
                    	$(this).datagrid('appendRow', { cardnum: '<div style="text-align:center;">待分诊、接诊患者中没有找到符合条件的记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'cardnum', colspan: 7 })
                    	//$.messager.alert("提示","待分诊、接诊患者中没有找到符合条件的记录!");
                    	
                    }
                    //如果通过调用reload方法重新加载数据有数据时显示出分页导航容器
                },
                height:null,
                width:'555px',
                columns: [[
                	{field:'rowno',title:'序号',width:38, align: 'center',width : '5%',}, 
                                               
					{field : 'cardnum',title : '身份证/医保卡/就诊卡号',align : 'center',width : '35%',sortable : true,},
					
					{field : 'fullname',title : '姓名',align : 'center',width : '14%',sortable : true},
					{field : 'gender',title : '性别',align : 'center',width : '5%',sortable : true},
					{field : 'bornday',title : '年龄',align : 'center',width : '5%',sortable : true,
						formatter : function(value, row, index) {
							return jsGetAge(row.age,row.bornday);
						}},
					{field : 'grade',title : '等级',align : 'center',width : '8%',sortable : true,
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
							//alert(grade)
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
					{field : 'status',title : '患者状态',align : 'center',width : '13%',sortable : true},
					{field : 'id',hidden:true}
                ]]
            });
	$('#seach_div').find(".datagrid-view").addClass("seach_div_data");
	$('#seach_div').find(".datagrid-view").find(".datagrid-view2")
	.find(".datagrid-header").addClass("seach_div_header");
	//alert($('#seach_div').find(".datagrid-view").css("height")); 
}

function patientDivid(patientId){
	window.location.href="#path()/divid/index?id="+patientId;
}

function openUrl(e){
	//alert($(e).val());
	patientDivid($(e).val());
}

function receive(e){
	$.ajax({
        type: "post",
        url: "#path()/index/receivePatient",
        data : {
        	id:$(e).val()
        },
        dataType: "json",
        success: function (result) {
        	if(result.status==200){
        		$.messager.alert('提示','接诊成功！');
        		showDifGradePatient('tb1','1001');
            	showDifGradePatient('tb2','1002');
            	showDifGradePatient('tb3','1003,1004,1005');
            	setGradeCount();
            	showDepart();
            	setDividAndReciveCount();
            	showToastr(false);
        	}else{
        		$.messager.alert('提示','接诊失败，请联系管理员');
        	}
        },
        error: function () {
        	$.messager.alert('提示','获取失败，请联系管理员');
        }
    });
}

function showDifGradePatient(table,grade) {
    $('#'+table).datagrid(
        {
            url: '#path()/index/queryPatientByGrade',
            queryParams: {
            	grade : grade
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
            pagination:false,
            fitColumns:true,
            singleSelect:true,
            columns: [[
                                           
				{field : 'fullname',title : '姓名',align : 'center',width : '20%',sortable : false},
				{field : 'gender',title : '性别',align : 'center',width : '10%',sortable : false},
				{field : 'bornday',title : '年龄',align : 'center',width : '10%',sortable : false,
					formatter : function(value, row, index) {
						return jsGetAge(row.age,row.bornday);
					}},
				{field : 'dividtime',title : '分诊时间',align : 'center',width : '44%',sortable : false,
						formatter : function(value, row, index) {
							var t= jsGetTime(row.dividtime);
							if(row.dividenurse!=null&&row.dividenurse!="null"){
								return  t+" "+row.dividenurse;
							}else{
								return  t;
							}
							
						}},
				{field : 'grade',title : '编辑',align : 'center',width : '10%',sortable : false,
						formatter : function(value, row, index) {
						 var strhtml ='';
						strhtml+='<i  id=i_'+ row.id +' class="fa fa-list-alt" name="btn_i" onclick="showButtonDiv(&quot;'+row.id+'&quot;)"></i>';
						/**formatter: function (value, row, index) {
                            var i = '<button type="button" class="btn btn-info btn-xs"  onclick="">修改分级<tton>';
                            var s = '<button type="button" class="btn btn-outline btn-default btn-xs"  onclick="">腕带<tton>';
                            var j = '<button type="button" class="btn btn-outline btn-default btn-xs">报</button>';
                            var k = '<button type="button" class="btn btn-outline btn-default btn-xs">退</button>';
                            var c = '<i class="fa fa-list-alt" onclick="showChoice()"></i>';
                            return i + s + j + k + c;
						**/
						return strhtml;
					}},
				
				{field : 'id',hidden:true}
            ]]
        });
}

//每个级别的人数
function setGradeCount(){
	$.ajax({
        type: "post",
        url: "#path()/index/queryPatientGradeNums",
        dataType: "json",
        success: function (result) {
        	var grade_3_4_5 = result.rows.grade_3 + result.rows.grade_4 + result.rows.grade_5;
        	var grade_3_4_5_name = result.rows.grade_3_name+"、" + result.rows.grade_4_name +"、" + result.rows.grade_5_name;
        	//如果多一个顿号 去除
        	if (grade_3_4_5_name.substring(grade_3_4_5_name.length -1, grade_3_4_5_name .length) == "、") {
        		grade_3_4_5_name = grade_3_4_5_name.substring(0, grade_3_4_5_name.length -1);
        	}
        	
        	$('#g1').html(result.rows.grade_1_name + "级（" + result.rows.grade_1+"人）");
        	$('#g2').html(result.rows.grade_2_name + "级（" + result.rows.grade_2+"人）");
        	$('#g345').html(grade_3_4_5_name+ "级（"+ grade_3_4_5+"人）");
        
        		
        },
        error: function () {
        	$.messager.alert('提示','获取失败，请联系管理员');
        }
    });
}

function setGradeAllCount(){
	$.ajax({
        type: "post",
        url: "#path()/index/queryPatientAllGradeNums",
        dataType: "json",
        data : {
        },
        success: function (result) {
        	if(result.status==200){
        		$('#grade_all').html('待分诊('+ result.rows.count +'人)'+'');
        	}
        },
        error: function () {
        	$.messager.alert('提示','获取失败，请联系管理员');
        }
    });
}

function setDividAndReciveCount(){
	$.ajax({
        type: "post",
        url: "#path()/index/queryTodayCounts",
        dataType: "json",
        data : {
        },
        success: function (result) {
        	if(result.status==200){
        		//console.log(result);
        		$("#divid_count").text(result.rows.divid_count);
        		$("#receive_count").text(result.rows.receive_count);
        	}
        },
        error: function () {
        	$.messager.alert('提示','获取失败，请联系管理员');
        }
    });
}

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
            	
            	$(".departmentType").html("");
            	var str ="";
            	
       	 		for(var i in rows){
       	 			
       	 			var name = rows[i]["td_name"];
       	 			var count = rows[i]["count"];
       	 			var max = rows[i]["readyclinicalreceptionmax"];
       	 			//4个换一行 第一个不用结尾
       	 			if((i%4==0)&&(i!=0)){
       	 				str+='</div>';
       	 			}
       	 			if(i%4==0){
       	 				str+='<div class="clearfix departmentGroup">';
       	 			}
       	 			str +='<div class="col-md-3';
       	 			if(count>=max){
       	 				str +=' text-danger'
       	 					//警告的标准待定 目前是 一半就警告 
       	 			}else if(count>=max/2){
       	 				str +=' text-warning';
       	 			}
       	 			str +='">';
       	 			str +='<span class="department">';
       	 			str +='<i class="fa fa-gittip"></i>';
       	 			str += name;
       	 			str +='</span><span>';
       	 			str += count+'人';
       	 			str +='</span>';
       	 			str +='</div>';
       	 		
       	 		}
       	 	str+='</div>';
       	 	$(".departmentType").html(str);
            
        	}
        },
        error: function () {
        	$.messager.alert('提示','获取失败，请联系管理员');
        }
    });
}
function showButtonDiv(id){
	$('#divshow').show();
	$("#upfj").val(id);
	$("#receive").val(id);
	var w = document.body.clientWidth;
	if((w-document.body.scrollLeft - event.clientX)<220)
	{
		$('#divshow').css("left", document.body.scrollLeft + event.clientX + 1-200);
	    $('#divshow').css("top", document.body.scrollLeft + event.clientY + 10);
	}else{
		$('#divshow').css("left", document.body.scrollLeft + event.clientX + 1);
		$('#divshow').css("top", document.body.scrollLeft + event.clientY + 10);
	}
    //$('#'+id).toggle();
    //阻止冒泡
    event.stopPropagation();
}

/*根据时间计算出距离现在差距*/
function jsGetTime(datetime){
	var dividtime = datetime;
	var retruntime = "";
	var myDate = new Date();
	var date = myDate.getDate();
	var hour = myDate.getHours(); //获取当前小时数(0-23)
	var minute = myDate.getMinutes();//获取小时
	var year= myDate.getFullYear(); 
	var month= myDate.getMonth()+1; 
	if(dividtime==''||dividtime==null){
		retruntime = "";
	}else{
		var cmonth = month - dividtime.substring(5,7);
		cdate = date - dividtime.substring(8,11) ;
		chour = hour -dividtime.substring(11,13) ;
		cminute = minute -dividtime.substring(14,16) ;
		if(cmonth>0){
			retruntime = retruntime + cmonth+ "月" ;
		}
		
		if(cdate>0){
			retruntime = retruntime + cdate+ "天" ;
		}else{
			if(chour>0){
				retruntime = retruntime + chour+ "小时" ;
			}
			if(cminute>0){
				retruntime = retruntime + cminute+ "分钟" ;
			}
		}
		if(retruntime!=''){
			retruntime+="前 ";
		}
		
	}

	return retruntime;
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
    	if((ageDiff==0)&&(monthiDiff<=2)){
    		var dayDiff = nowDay - birthDay;//日之差
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
    	}
    	else {
    		return (monthiDiff+12)+"月";
    	}
    	
    }  
}