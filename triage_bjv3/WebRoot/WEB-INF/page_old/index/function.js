//回车后查询
function keyclick(e){
	if (e.keyCode == 13) {
		$("#btn-chat").click();
    }
}
//var warnmap;

//警告弹窗
function showToastr(flag){
	$.ajax({
        type: "post",
        url: "#path()/index/queryWarningInfo",
        data:{
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		if(result.status==200){
        			var map = result.rows;
        			warnmap = result.rows;
        			var flag2 = false;
        			var content = "";
        			content += '<ol  class="list-unstyled">';
        			
        			g1 = map["1001"];	
    	     			var g12_html = "";
    	     			var g12_val = 0;
    	     		
    	     			for(var i in g1){
    	     			    flag2 = true;
    	     				var name = g1[i]["fullname"];
    	     				content += '<li class="warning-li"> 姓名：';
    	     				content += name;
    	     				content += ',';
    	     				content+='<button type="button" class="btn btn-1   btn-1-selected btn-xs ">'+g1[i]["gradename"]+'</button>';
    	     				content += '，请尽快安排就诊！</li>';
          			
    	     				//3个换一行 第一个不用结尾
    	     				if((g12_val%3==0)&&(g12_val!=0)){
    	     					g12_html+='</li>';
    	     				}
    	     				if(g12_val%3==0){
    	     					g12_html+='<li>';
    	     				}
            	 			g12_html += name;
            	 		
            	 			g12_val += 1;
            	 			if(!(g12_val%3==0)){
            	 				g12_html+='、';
            	 			}
          			
    	     			}
    	     			g2 = map["1002"];
    	     			for(var i in g2){
	    	     			flag2 = true;
	    	     			var name = g2[i]["fullname"];
	 	         			content += '<li class="warning-li"> 姓名：';
	 	         			content += name;
	 	         			content += ',';
	 	         			content+='<button type="button" class="btn btn-2   btn-2-selected btn-xs ">'+g2[i]["gradename"]+'</button>';
	 	         			content += '，请尽快安排就诊！</li>';
	 	         			//3个换一行 第一个不用结尾
	 	           	 		if((g12_val%3==0)&&(g12_val!=0)){
	 	           	 			g12_html+='</li>';
	 	           	 		}
	 	           	 		if(g12_val%3==0){
	 	           	 			g12_html+='<li>';
	 	           	 		}
	 	           	 			g12_html += name;
	 	           	 		
	 	           	 		g12_val += 1;
	 	           	 		if(!(g12_val%3==0)){
	 	           	 			g12_html+='、';
	 	       	 			}
    	     			}
    	     		//去除最后一个逗号
    	   	     		/*if(!(g12_val%2==0)){
    	   	     			g12_html = g12_html.substring(0,g12_html.length-1);
    	   	     		}*/
    	     			if(g12_html.substring(g12_html.length-1,g12_html.length)=="、")
        	     	    {
    	     				g12_html=g12_html.substring(0,g12_html.length-1);
        	     	    }
    	   	     		g12_html += "</li>";
    	   	     		$("#g12_list").html(g12_html);
    	       	     		
        	     		
 			
        	     	g3 = map["1003"];
     			    var g3_html = "";
        	     	var g3_val = 0;
    	     		for(var i in g3){
    	     			flag2 = true;
    	 				var name = g3[i]["fullname"];
 	         			content += '<li class="warning-li"> 姓名：';
 	         			content += name;
 	         			content += ',';
 	         			content+='<button type="button" class="btn btn-3   btn-3-selected btn-xs ">'+g3[i]["gradename"]+'</button>';
 	         			content += '，请尽快安排就诊！</li>';
 	         		//3个换一行 第一个不用结尾
            	 		if((g3_val%3==0)&&(g3_val!=0)){
            	 			g3_html+='</li>';
            	 		}
            	 		if(g3_val%3==0){
            	 			g3_html+='<li>';
            	 		}
            	 		g3_html += name;
            	 		
            	 		g3_val += 1;
            	 		if(!(g3_val%3==0)){
        	 				g3_html+='、';
        	 			}
    	     		}
    	     	//去除最后一个逗号   	     		
    	     		/*if(!(g3_val%2==0)){
    	     			g3_html = g3_html.substring(0,g3_html.length-1);
    	     		}*/    	     	
    	     		if(g3_html.substring(g3_html.length-1,g3_html.length)=="、")
    	     	    {
    	     			g3_html=g3_html.substring(0,g3_html.length-1);
    	     	    }
    	     		g3_html += "</li>";
    	     		$("#g3_list").html(g3_html);
    	     			
    	     			
	 	   	     	g4 = map["1004"];
	 				var g4_html = "";
	 	   	     	var g4_val = 0;
	 	     		for(var i in g4){
	 	     			flag2 = true;
	 	 				var name = g4[i]["fullname"];
	          			content += '<li class="warning-li"> 姓名：';
	          			content += name;
	          			content += ',';
	          			content+='<button type="button" class="btn btn-4   btn-4-selected btn-xs ">'+g4[i]["gradename"]+'</button>';
	          			content += '，请尽快安排就诊！</li>';
	          		//3个换一行 第一个不用结尾
	        	 		if((g4_val%3==0)&&(g4_val!=0)){
	        	 			g4_html+='</li>';
	        	 		}
	        	 		if(g4_val%3==0){
	        	 			g4_html+='<li>';
	        	 		}
	        	 		g4_html += name;
	        	 		
	        	 		g4_val += 1;
	        	 		if(!(g4_val%3==0)){
	    	 				g4_html+='、';
    	 			    }
 	     		    }
	 	     	    //去除最后一个逗号
	 	     		/*if(!(g4_val%3==0)){
	 	     			g4_html = g4_html.substring(0,g4_html.length-1);
	 	     		}*/
	 	     		if(g4_html.substring(g4_html.length-1,g4_html.length)=="、")
    	     	    {
	 	     			g4_html=g4_html.substring(0,g4_html.length-1);
    	     	    }
	 	     		g4_html += "</li>";
	 	     		$("#g4_list").html(g4_html);	
	 	     		
	 	     		content += '</ol>';	
		     		if(flag){
		     			if(flag2){
		     				toastr.error(content,'<font style="color:red;size:16px">报警</font>');
		     			}
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
                	searchText : $('#searchText').val()
                },
                allowCellSelect: false,
                check: {
                    enable: true
                },
                idField: 'id',
                rownumbers: true,
                toolbar: '#title',
                nowrap: true, //列内容多时自动折至第二行
                border: false,
                pagination:true,
                pageSize: 10,
                pageList: [10],
                fitColumns:true,
                singleSelect:true,
                height:375,
                columns: [[
                    /*{field:'rowno',title:'序号',width:38, align: 'center',width : '4%',}, */
                	{field:'id',title:'分诊号',width:38, align: 'center',width : '15%',}, 
					{field : 'cardnum',title : '身份证/医保卡/就诊卡号',align : 'center',width : '15%',sortable : false,},
					
					{field : 'fullname',title : '姓名',align : 'center',width : '10%',sortable : false,
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
					{field : 'gender',title : '性别',align : 'center',width : '5%',sortable : false},
					{field : 'bornday',title : '年龄',align : 'center',width : '5%',sortable : false,
						formatter : function(value, row, index) {
							//alert(row.age);
							return jsGetAge(row.age,row.bornday);
						}},
					{field : 'grade',title : '等级',align : 'center',width : '7%',sortable : false,
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
						{field : 'grade1',title : '操作',align : 'center',width : '14%',sortable : false,
							formatter : function(value, row, index) {
								
								var strhtml = '';
								strhtml+='<a href="#"  onclick="patientDivid(&quot;'+ row.id +'&quot;);"type="button" class="btn btn-info btn-xs">分诊</a>';
								strhtml+='<button type="button" class="btn btn-outline btn-default btn-xs">腕带</button>';
								strhtml+='<button type="button" class="btn btn-info btn-xs"  onclick="patientTeshu(&quot;'+ row.id +'&quot;,&quot;'+ row.cardnum +'&quot;,&quot;tb0&quot;);">特</button>';
								strhtml+='<button type="button" class="btn btn-info btn-xs"   onclick="patientQianfei(&quot;'+ row.id +'&quot;,&quot;'+ row.cardnum +'&quot;,&quot;tb0&quot;);">费</button>';
								strhtml+='<button type="button" class="btn btn-info btn-xs"   onclick="patientdel(&quot;'+ row.id +'&quot;,&quot;'+ row.cardnum +'&quot;,&quot;tb0&quot;);">删</button>';
								return strhtml;
							}},
					{field : 'registertime',title : '挂号时间',align : 'center',width : '27%',sortable : false,
						formatter : function(value, row, index) {
							if(row.registertime==""||row.registertime==null){
								return "";
							}else{
								return jsGetTime(row.registertime) + " " + row.registertime;
							}
							
							
						}},
					//{field : 'id',hidden:true}
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
                    	$(this).datagrid('appendRow', { id: '<div style="text-align:center;width:734px" class="message">待分诊、待接诊和已接诊患者中没有找到符合条件的记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'id', colspan: 8 });
                    	//$.messager.alert("提示","待分诊、接诊患者中没有找到符合条件的记录!");
                    	var wid = $(".message").parents(".datagrid-body").width();
                    	$(".message").parent().width(wid);
                    }
                    //如果通过调用reload方法重新加载数据有数据时显示出分页导航容器
                },
                height:null,
                width:'735px',
                columns: [[
                	{field:'id',title:'分诊号',width:38, align: 'center',width : '14%',}, 
                                               
					{field : 'cardnum',title : '身份证/医保卡/就诊卡号',align : 'center',width : '25%',sortable : true,},
					
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
					{field : 'gender',title : '性别',align : 'center',width : '7%',sortable : true},
					{field : 'bornday',title : '年龄',align : 'center',width : '5%',sortable : false,
						formatter : function(value, row, index) {
							return jsGetAge(row.age,row.bornday);
						}},
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
					{field : 'status',title : '患者状态',align : 'center',width : '10%',sortable : true},
					{field : 'dividdepartmentname',title : '分诊科室',align : 'center',width : '12%',sortable : true},
					
					//{field : 'id',hidden:true}
                ]]
            });
	$('#seach_div').find(".datagrid-view").addClass("seach_div_data");
	$('#seach_div').find(".datagrid-view").find(".datagrid-view2")
	.find(".datagrid-header").addClass("seach_div_header");
	//alert($('#seach_div').find(".datagrid-view").css("height")); 
}

function patientDivid(patientId){
	window.location.href="#path()/divid/index?id="+patientId+"&type=divid";
}

function patientTeshu(patientId,cardnum,tb){
	if(patientId!=""){
		$.ajax({
	        type: "post",
	        url: "#path()/index/saveSpecial",
	        data:{
	        	id:patientId,
	        	cardnum:cardnum,
	        	type:"特殊患者"
	        },
	        dataType: "json",
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			//$('#'+tb).datagrid('reload');
	        			$('#tb0').datagrid('reload');
	        			$('#tb1').datagrid('reload');
	        			$('#tb2').datagrid('reload');
	        			$('#tb3').datagrid('reload');
	        		}
	        	}
			},
			error : function() {
				$.messager.alert('提示','获取失败，请联系管理员');
			}
		});
	}
}

function patientQianfei(patientId,cardnum,tb){
	if(patientId!=""){
		$.ajax({
	        type: "post",
	        url: "#path()/index/saveSpecial",
	        data:{
	        	id:patientId,
	        	cardnum:cardnum,
	        	type:"欠费患者"
	        },
	        dataType: "json",
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			//$('#'+tb).datagrid('reload');
	        			$('#tb0').datagrid('reload');
	        			$('#tb1').datagrid('reload');
	        			$('#tb2').datagrid('reload');
	        			$('#tb3').datagrid('reload');
	        		}
	        	}
			},
			error : function() {
				$.messager.alert('提示','获取失败，请联系管理员');
			}
		});
	}
}


function patientdel(patientId,cardnum,tb){
	$('#temessage').html("是否确认删除");//给会话中的隐藏属性URL赋值  
	$('#tep_id').val(patientId);
	$("#caozuo").val("shanchu");
    $('#teModel').modal(); 
}


function spec(e){
	
	var type = $(e).attr('id');
	if(type =="teshu"){
		type ="特殊患者";
	}else if(type =="qianfei"){
		type ="欠费患者";
	}
	$.ajax({
	        type: "post",
	        url: "#path()/index/saveSpecial",
	        data:{
	        	id:$("#upfj").val(),
	        	cardnum:$(e).val(),
	        	type:type
	        },
	        dataType: "json",
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			$('#tb0').datagrid('reload');
	        			$('#tb1').datagrid('reload');
	        			$('#tb2').datagrid('reload');
	        			$('#tb3').datagrid('reload');
	        		}
	        	}
			},
			error : function() {
				$.messager.alert('提示','获取失败，请联系管理员');
			}
		});
	
}


function openUrl(e){
	//alert($(e).val());
	
	window.location.href="#path()/divid/index?id="+$(e).val()+"&type=xgpj";
}

function receive(e){	
	var aa = "<p>分诊时间：<span id='show_dividtime'></span></p>" +
			"<p>接诊时间：<input class='form-control formHalf' type='text' id='jiezhen_time' style='width:176px;'></p>";
    $('#temessage').html(aa);//给会话中的隐藏属性URL赋值  
	$('#tep_id').val($(e).val());
	$("#show_dividtime").text($(e).attr("time"));
	laydate.render({
		  elem: '#jiezhen_time', //指定元素
		  type: 'datetime',
		  value:new Date()
	});
	$("#caozuo").val("jiezhen");
    $('#teModel').modal(); 
}

function teurlSubmit(){
	if($("#caozuo").val()!=""){
		if($("#tep_id").val()==""){
			$.messager.alert('提示','获取失败，请联系管理员');
			return;
		}else if($("#caozuo").val()=="jiezhen"){
			$.ajax({
		        type: "post",
		        url: "#path()/index/receivePatient",
		        data : {
		        	id:$("#tep_id").val(),
		        	jiezhentime:$("#jiezhen_time").val()
		        },
		        dataType: "json",
		        success: function (result) {
		        	if(result.status==200){
		        		$.messager.alert('提示','接诊成功！');
		        		showDifGradePatient('tb1','1001,1002');
		            	showDifGradePatient('tb2','1003');
		            	showDifGradePatient('tb3','1004');
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
		}else if($("#caozuo").val()=="shanchu"){
			$.ajax({
		        type: "post",
		        url: "#path()/index/backPatient",
		        data:{
		        	p_id:$("#tep_id").val()
		        },
		        dataType: "json",
		        async:true,
		        success: function(result){
		        	if(result!=null){
		        		if(result.status==200){
		        			showPatient();
		        		}
		        	}
				},
				error : function() {
				}
			});
		}
	}else{
		$.messager.alert('提示','接诊失败，请联系管理员');
	}
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
				{field : 'dcpflist',title : '等级',align : 'center',width : '20%',sortable : false,
					formatter : function(value, row, index) {
						var dcpflist= row.dcpflist;
						var str="";
						if(dcpflist.length>3){							
							var grade0="";
							var gradem="";
							var id0 = "";
							var id1 = "";
							var aa = true;
							var bb = true;
							for(var i = 0; i<dcpflist.length ; i++){
								if(dcpflist[i].savestatus!="draf" && aa){
									if(dcpflist[i].feijz=="2"){
										grade0="非";
									}else{
										grade0 = dcpflist[i].grade.substring(dcpflist[i].grade.length-1,dcpflist[i].grade.length);
									}
									id0 = dcpflist[i].id;
									aa=false;
								}
							}					
							for(var i = dcpflist.length-1; i>=0 ; i--){
								if(dcpflist[i].savestatus!="draf" && bb){
									if(dcpflist[i].feijz=="2"){
										gradem="非";
									}else{
										gradem = dcpflist[i].grade.substring(dcpflist[i].grade.length-1,dcpflist[i].grade.length);
									}
									id1 = dcpflist[i].id;
									bb=false;
								}
							}
							if(id0==id1){
								str = grade0;
							}else{
								str = grade0+"->…->"+gradem;
							}		
						}else{
							for(var i = 0; i<dcpflist.length ; i++){
								if(str!="" && dcpflist[i].savestatus!="draf"){
									str=str+"->"
								}
								if(dcpflist[i].savestatus!="draf"){
									if(dcpflist[i].feijz!=null && dcpflist[i].feijz=="1"){
										var grade="";
										if(!(dcpflist[i].grade==null||dcpflist[i].grade=="")){
											grade = dcpflist[i].grade.substring(dcpflist[i].grade.length-1,dcpflist[i].grade.length);
										}
										str=str+grade;
									}else{
										str=str+"非";
									}
								}
								
							}
						}
                        return str;					
					}},                   
				{field : 'fullname',title : '姓名',align : 'center',width : '16%',sortable : false,
					formatter : function(value, row, index) {
						str = '';
						if (row.special=="1"){
							str+='<img class="" src="#path()/static/images/iconTips1.png">';
						}
						if (row.qianfei=="1"){
							str+='<img class="" src="#path()/static/images/iconTips2.png">';
						}
						if(row.warn=="0"){
							str+= " " + row.fullname;
						}else{
							str+= "  <font style='color:red'>" + row.fullname + "</font>";
						}
						
						
						return str;
					}},
				{field : 'gender',title : '性别',align : 'center',width : '10%',sortable : false},
				{field : 'bornday',title : '年龄',align : 'center',width : '10%',sortable : false,
					formatter : function(value, row, index) {
						return jsGetAge(row.age,row.bornday);
					}},
				{field : 'dividtime',title : '分诊时间',align : 'center',width : '29%',sortable : false,
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
						strhtml+='<i  id=i_'+ row.id +' class="fa fa-list-alt" name="btn_i" onclick="showButtonDiv(&quot;'+row.id+'&quot;,&quot;'+row.cardnum+'&quot;,&quot;'+row.dividtime+'&quot;)"></i>';
						/**formatter: function (value, row, index) {
                            var i = '<button type="button" class="btn btn-info btn-xs"  onclick="">修改分级<button>';
                            var s = '<button type="button" class="btn btn-info btn-xs"  onclick="">腕带<button>';
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
        	var grade_1_2=result.rows.grade_1+result.rows.grade_2;
        	var grade_1_2_name = result.rows.grade_1_name+"、"+result.rows.grade_2_name;
        	var grade_3=result.rows.grade_3;
        	var grade_3_name = result.rows.grade_3_name;
        	var grade_4=result.rows.grade_4;
        	var grade_4_name = result.rows.grade_4_name;
        	
        	
        	$('#g1').html(grade_1_2_name + "级（" + grade_1_2+"人）");
        	$('#g2').html(grade_3_name + "级（" + grade_3+"人）");
        	$('#g345').html(grade_4_name+ "级（"+ grade_4+"人）");
        	
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
        		var num = result.rows.warn_num;
        		var count = result.rows.count;
        		if(count<num){
        			$('#grade_all').html('待分诊('+ count +'人)'+'');
        		}else{
        			$('#grade_all').html('待分诊(<font color="red">'+ count +'</font>人)'+'');
        		}
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
function showButtonDiv(id,cardnum,dividtime){
	$('#divshow').show();
	$("#upfj").val(id);
	$("#receive").val(id);
	$("#receive").attr("time",dividtime);
	$("#teshu").val(cardnum);
	$("#qianfei").val(cardnum);
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
	if(datetime==null||datetime==''){
		return "";
	}
	datetime = datetime.substring(0,19);    
	datetime = datetime.replace(/-/g,'/'); 
	var timestamp = new Date(datetime).getTime();
	var diff = '';
	 var time_diff = new Date().getTime() - timestamp; //时间差的毫秒数 
	  
	 //计算出相差天数 
	 var days = Math.floor(time_diff / (24 * 3600 * 1000));
	 if (days > 0) {
		 diff += days + '天';
	 }
	 //计算出小时数 
	 var leave1 = time_diff % ( 24 * 3600 * 1000); 
	 var hours = Math.floor(leave1 / (3600 * 1000));
	 if (hours > 0) {
		 diff += hours + '小时';
	 } else {
		 if (diff !== '') {
			 diff += hours + '小时';
		 	}
	 }
	 if(!days>=1){
	 //计算相差分钟数 
	 var leave2 =leave1 % (3600 * 1000);
	 var minutes = Math.floor(leave2 / (60 * 1000));
	 if (minutes > 0) {
		 diff += minutes + '分';
	 } else {
		 if (diff !== '') {
			 diff += minutes + '分';
		 }
	}
	 }
	if(diff!=''){
		diff+="前 ";
	}
	
	return diff;
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