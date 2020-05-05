$(document).ready(function() {
	//新手引导
	/*if('#userId()'=='10092'||'#userId()'=='10062'||'#userId()'=='10063'){
		newman();
	}*/
	//新人指引
    var guide = "#(guide ??)";
	if(guide==1){
		newman();
	}
	//是否打印分诊单
	sysDeploy('420');
	//是否接诊
	sysDeploy('421');
	//更新说明
	var update_show = "#(update_show ??)";
	if(update_show==1){
		var content = "#(content ??)";
		var version = "#(version ??)";
		var version_num =  content.substring(0,content.indexOf('<br>'));
		content = content.replace(version_num+'<br>', '');
		var publish_date= content.substring(0,content.indexOf('<br>'));
		content = content.replace(publish_date+'<br>', '');
				content = content.replace('功能更新：<br>',
						'<h1 class="update-title">功能更新：</h1>').replace(/【新增】/g,
						'<span class="update-title2">【新增】</span>').replace(/【优化】/g,
						'<span class="update-title2">【优化】</span>').replace(/【去除】/g,
						'<span class="update-title2">【去除】</span>').replace(/【修复】/g,
						'<span class="update-title2">【修复】</span>');
		
		$('#version_num').html(version_num);
		$('#publish_date').html(publish_date);
		$('#updateContent').html(content);
		$('#updatemModel').modal();
		FinishGuide("fz_pc_update_show"+version)
//		newman();
	}
});


//延迟
function sleep(n) { //n表示的毫秒数
   var start = new Date().getTime();
   while (true) if (new Date().getTime() - start > n) break;
}




//刷新页面
function reflashTable(){
	var opt = {
		silent:true,//静默刷新
	};
	$('#wait-patients').bootstrapTable('refresh',opt);
	$('#recived-patients').bootstrapTable('refresh',opt);
	$('#divid-patients').bootstrapTable('refresh',opt);
	$('#all-patients').bootstrapTable('refresh',opt);
	//上方统计数量
	getPaitentNums();
	//下方统计数量
	showDepart();
	//报警次数
	getWarnNums();
}

//加载院前演示数据
function initPre(){
		var _data3 = {
			rowno : 'a',
			status : '救护车',
			fullname : '王淑芬' ,
			age : '<button type="button" class="btn btn-success">脑</button>   &nbsp&nbsp     酒精中毒  &nbsp&nbsp    <font class="danger">危重</font>     &nbsp&nbsp   距离1公里   <img src="#path()/static/images/dot.png" height="25" width="18" onclick="showNewMap(1,this);" style="cursor:pointer;"/>  &nbsp   预计10分钟到达 ' ,
			gender :  '女',
			dd :  'a',
			registertime : 'a' ,
			cz :   '院前1',
			special : '0'
		};
		var _data2 = {
				rowno : 'b',
				status : '救护车',
				fullname : '李丽娟' ,
				age : '<button type="button" class="btn btn-success">孕</button>      &nbsp&nbsp   酒精中毒  &nbsp&nbsp    <font class="danger">濒危</font>      &nbsp&nbsp  距离1公里    <img src="#path()/static/images/dot.png" height="25" width="18" onclick="showNewMap(2,this);" style="cursor:pointer;"/>  &nbsp   预计10分钟到达' ,
				gender :  '女',
				dd :  'b',
				registertime : 'b' ,
				cz :  '院前1',
				special : '0'
			};
		var _data1 = {
				rowno : 'c',
				status : '救护车',
				fullname : '杨建国' ,
				age : '<button type="button" class="btn btn-success">心</button>       &nbsp&nbsp    酒精中毒      &nbsp&nbsp <font class="orange">急症</font>    &nbsp&nbsp    距离1公里   <img src="#path()/static/images/dot.png" height="25" width="18" onclick="showNewMap(3,this);" style="cursor:pointer;"/>  &nbsp    预计10分钟到达' ,
				gender :  '男',
				dd :  'c',
				registertime : 'c' ,
				cz :  '院前2',
				special : '0'
			};
		
		var _data4 = {
				rowno : 'd',
				status : '救护车',
				fullname : '杨建国' ,
				age : '心' ,
				gender :  '男',
				dd :  'c',
				registertime : 'c' ,
				cz :  '院前2',
				special : '0'
			};

		$("#wait-patients").bootstrapTable('prepend', _data1);//_data----->新增的数据
		$("#wait-patients").bootstrapTable('prepend', _data2);//_data----->新增的数据
		$("#wait-patients").bootstrapTable('prepend', _data3);//_data----->新增的数据
		$("#wait-patients").bootstrapTable('prepend', _data4);//_data----->新增的数据
		$('#wait-patients').bootstrapTable('mergeCells', {index: 1, field: 'age',colspan:3});
		$('#wait-patients').bootstrapTable('mergeCells', {index: 2, field: 'age', colspan: 3,rowspan:1});
		$('#wait-patients').bootstrapTable('mergeCells', {index: 3, field: 'age', colspan: 3,rowspan:1});		
		//$('#wait-patients tbody tr:first td').eq(5).attr('rowspan','1').attr('colspan','3');
		//$('#wait-patients tbody tr:first td').eq(6).css("display","none");
		$('#wait-patients tbody tr:first').css("display","none");	
		$('#wait-patients thead tr th').css("border-bottom","solid 1px #ffd98d");
}


//展示地图
function showMap(value,obj){	
	$(".mapBox").css({
		"left":document.body.scrollLeft + event.clientX-30,
		"top":document.body.scrollLeft + event.clientY-30
	}).show();
	$(".map").empty();
	var x;
	var y;
	var map;
    var content = "";
	switch(value)
	{
	case 1:
		map = 1;
		x = '121';
		y = '287';
		content = '距离 <em>1</em>公里<br>预计 <em>10</em>分钟到达';
		var coord ='<img src="#path()/static/images/pic1.png">';
			coord += '<span class="dot" style="top:'+x+'px;left:'+y+'px;"></span>';
		    coord += '<span class="introduce"><b class="out"><i class="in"></i></b>'+content+'</span>';
		$(".map").append(coord);		
	  break;
	case 2:
		map = 2;
		map = 1;
		x = '87';
		y = '17';
		content = '距离 <em>1</em>公里<br>预计 <em>10</em>分钟到达';
		var coord ='<img src="#path()/static/images/pic2.png">';
			coord += '<span class="dot" style="top:'+x+'px;left:'+y+'px;"></span>';
		    coord += '<span class="introduce"><b class="out"><i class="in"></i></b>'+content+'</span>';
		$(".map").append(coord);
	  break;
	case 3:
		map = 3;
		map = 1;
		x = '11';
		y = '180';
		content = '距离 <em>1</em>公里<br>预计 <em>10</em>分钟到达';
		var coord ='<img src="#path()/static/images/pic3.png">';
			coord += '<span class="dot" style="top:'+x+'px;left:'+y+'px;"></span>';
		    coord += '<span class="introduce"><b class="out"><i class="in"></i></b>'+content+'</span>';
		$(".map").append(coord);
		  break;
	default:
		map = 0;
	}
	$(".maptit").click(function(){
		$(".mapBox").hide();
	})
	$(".dot").hover(function(){
		var l = $(this).css("left").replace("px","");
		var t = $(this).css("top").replace("px","");
		var w = $(".introduce").width();
		var h = $(".introduce").height(); 
		var ll = l-w/2;
		var tt = t-h-10;
		$(".introduce").css({
			"left":ll,
			"top":tt
		})
		$(".introduce").show();
	},function(){
		$(".introduce").hide();
	})
	
}

//展示地图
function showNewMap(value,obj){
	
	$.ajax({
        type: "post",
        async: false,
        url: "#path()/index/getPreGpsInfo",
        data:{
        	patient_id:'14556897112'
        },
        dataType: "json",
        success: function(result){
        	console.log(result);
        	var info = result.rows;
        	// 百度地图API功能
        	var map = new BMap.Map("BMap", {enableMapClick:false,minZoom:13,maxZoom:15});//构造底图时，关闭底图可点功能
        	
        	var point1 = new BMap.Point(info.x,info.y);
        	var point2 = new BMap.Point(118.802794,31.949435); // 创建点坐标     晨伟 坐标         	
            map.centerAndZoom(point2,15);                 // 初始化地图,设置中心点坐标和地图级别。
            map.enableScrollWheelZoom();                 //启用滚轮放大缩小
            
            var marker1 = new BMap.Marker(point1);  // 创建标注
        	map.addOverlay(marker1);              // 将标注添加到地图中

        	var label1 = new BMap.Label("救护车",{offset:new BMap.Size(20,-10)});
        	marker1.setLabel(label1);
        	
        	var marker2 = new BMap.Marker(point2);  // 创建标注
        	map.addOverlay(marker2);              // 将标注添加到地图中

        	var label2 = new BMap.Label("晨伟医院",{offset:new BMap.Size(20,-10)});
        	marker2.setLabel(label2);
            
            var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
        	driving.search(point1, point2);
        	$('#MapModel').modal(); 
        },
        error: function(e){
       	 return false;
        }
    });
	
}


function rowStyle(row,index){
	if(showPre){
	    if (index > 0 && index <= 3) {
	    	return style={css:{'background':'#fff8ea',"border":"solid 1px #ffd98d","vertical-align":"middle"}};
	    }    
	}
    return {};
}

function loadWaitPatientTable(){
	$('#wait-patients').bootstrapTable({
        url: '#path()/index/seachPatient2',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        onClickRow: function (row,$element) {         //单击行的操作
        	 $('.changeColor').removeClass('changeColor');
             $($element).addClass('changeColor');
             seachHis(row.cardnum,row.id);
        },
        onLoadSuccess: function(data){ 
        	if(showPre){
        		initPre();
        	}
        	versionShow();
        },
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	    var temp = {   
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	        cardnum: $("#cardnumText").val(),
        	        fullname: $("#fullnameText").val(),
        	        status:'未分诊'
        	       };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20,50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        fixedColumns: true, 
        fixedNumber: 1, 						//固定列数
        rowStyle: rowStyle,
        columns: [{
        	field: '',
            title: '序号',
            width:"5%",
            formatter:function(value,row,index){    
            	var strhtml = index+1;
            	if(showPre){
            		switch(value)
            		{
            		case 'a':
            		  strhtml = 1;
            		  break;
            		case 'b':
            		  strhtml = 2;
            		  break;
            		case 'c':
            		  strhtml = 3;
              		  break;
            		case 'd':
              		  strhtml = 0;
                		  break;
            		default:
            			strhtml = parseInt(strhtml)+3;
            		}
            		
            	}
				return strhtml;    
            }
        }, {
            field: 'status',
            title: '患者状态',
            width:"7%",
            formatter:function(value,row,index){    
            	var strhtml = '';
            	
            	strhtml += '<span class="status1">待分诊</span>';
            	if(showPre&&value=="救护车"){
            		return '<span class="status2">救护车</span>'
            	}
				return strhtml;    
            }
        },
//        {
//            field: 'id',
//            title: '分诊号'
//        },
//        {
//            field: 'grade',
//            title: '分诊级别',
//            formatter:function(value,row,index){    
//            	var strhtml = '';
//				var auto = row.autograde;
//				var autoname = row.autoname;
//				var finalname = row.finalname;
//				var final = row.finalgrade;
//				var grade = "";
//				var name ="";
//				if(final==null||final==""){
//					grade = auto;
//					name = autoname;
//				}else{
//					grade = final;
//					name = finalname;
//				}
//				//判断分级
//				if(!(grade==null||grade=="")){
//					grade = grade.substring(grade.length-1,grade.length);
//				}
//				switch(grade)
//				{
//				    case '1':
//				    	//alert(11);
//				    	strhtml+='<button type="button" class="btn btn-1001   btn-1001-selected btn-xs ">'+name+'</button>';
//				        break;
//				    case '2':
//				    	strhtml+='<button type="button" class="btn btn-1002   btn-1002-selected btn-xs ">'+name+'</button>';
//				        break;
//				    case '3':
//				    	strhtml+='<button type="button" class="btn btn-1003  btn-1003-selected  btn-xs ">'+name+'</button>';
//				        break;
//				    case '4':
//				    	strhtml+='<button type="button" class="btn btn-1004   btn-1004-selected btn-xs ">'+name+'</button>';
//				        break;
//				    case '5':
//				    	strhtml+='<button type="button" class="btn btn-1005  btn-1005-selected btn-xs ">'+name+'</button>';
//				        break;
//				    default:
//				    	strhtml+='<button type="button" class="btn btn-primary btn-xs">未分级</button>';
//				}
//			                  	
//				return strhtml;    
//            }
//        },
        {
            field: 'dividtime',
            title: '暂存时间',
            width:"14%",
            formatter:function(value,row,index){
            	if(row.dividtime != null){
            		return value.substring(0,16); 
            	}
            }
        },
        {
            field: 'cardnum',
            title: '卡号',
            width:"10%",
        },
        {
            field: 'fullname',
            title: '姓名',
            width:"12%",
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(row.teshu ==null ||row.teshu ==''){
            		strhtml += ''+ row.fullname+'';
            	}else{
            		strhtml += '<span class="red"><i class="fa fa-star" title="'+row.addr+'"></i></span>'+ row.fullname;
            		specialadd();
            	}
            	if(row.fullname=='无名氏'){
            		strhtml +='     <span class="table-idlable">'+row.id+'</span>';
            	}
				return strhtml;    
            }
        }, {
            field: 'gender',
            title: '性别',
            width:"5%",
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(value=='1'){
            		strhtml='男';
            	}else if(value=='2'){
            		strhtml='女';
            	}else if(value=='9'){
            		strhtml='未说明';
            	}else{
            		strhtml=value;
            	}
				return strhtml;    
            }
        }, {
            field: 'age',
            title: '年龄',
            width:"5%",
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(value==''||value==null){
            		strhtml = jsGetAge('', row.bornday);
            		if(strhtml==''){
            			strhtml='0天';
            		}
            	}else{
            		strhtml = value;
            	}
				return strhtml;    
            }
        }, {
            field: 'dd',
            width:"14%",
            title: '等待时间', formatter:function(value,row,index){  
            	if(showPre&&row.status=='救护车'){
            		return value; 
            	}
				return timeFn(row.registertime);    
            }
        }, 
        {
            field: 'PAADMOPTime',
            width:"14%",
            title: '挂号日期',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	strhtml += row.PAADMOPTime;
            	if( strhtml ==  'null'){
            		strhtml="";
            	}
				return strhtml.substring(0, 16); 
            	 
            }
        }, 
        {
            field: 'cz',
            title: '操作',
            width:"15%",
            formatter:function(value,row,index){    
            	var strhtml = '';
            	
            	if(showPre&&value=="院前1"){
            		strhtml += '<span style="color:black;" ><i class="fa fa-star""></i></span>';
            		strhtml += '<span class="label label-warning m10" onclick="openPreDivid(&quot;'+index +'&quot;)">查看</span>';
            		strhtml += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
            		return strhtml;
            	}else if(showPre&&value=="院前2"){
            		strhtml += '<span class="red" ><i class="fa fa-star"></i></span>';
            		strhtml += '<span class="label label-warning m10" onclick="openPreDivid(&quot;'+index +'&quot;)">查看</span>';
            		strhtml += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
            		return strhtml;
            	}
            	
            	
            	
            	/*if(row.special==0){
            		strhtml += '<span style="color:black;" ><i class="fa fa-star" onclick="saveSpecial(&quot;是否标记为特殊人员&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.cardnum +'&quot;);"></i></span>';
            	}else{
            		strhtml += '<span class="red" ><i class="fa fa-star" onclick="saveSpecial(&quot;是否取消标记为特殊人员&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.cardnum +'&quot;);"></i></span>';
            	}*/
            	
            	var badtype="";
            	badtype+=row.id+"||";
				badtype+=row.cardnum+"||";
				badtype+=row.teshu
                if(row.teshu ==null ||row.teshu ==''){
                	strhtml += '<span style="color:black;" class="hover-parent version-hide" e_name="index_wait_patients_table_specail"><i class="fa fa-star" Userbehavior="A4" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
            	}else{
            		strhtml += '<span class="red hover-parent version-hide" e_name="index_wait_patients_table_specail"><i class="fa fa-star" Userbehavior="A4" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
            	}
				
				
				if(row.cixu>1){
                	strhtml += '<span class="hover-parent version-hide" e_name="index_wait_patients_table_edit"><span class="setIcon iconWrite" Userbehavior="A16" onclick="openDivid2(&quot;'+row.id +'&quot;)"></span><b class="hover-content">查看/修改</b></span>';
            	}else{
                	strhtml += '<span class="hover-parent version-hide" e_name="index_wait_patients_table_edit"><span class="setIcon iconWrite" Userbehavior="A16" onclick="openDivid(&quot;'+row.id +'&quot;)"></span><b class="hover-content">查看/修改</b></span>';
            	}
            	
            	strhtml += '<span class="hover-parent version-hide" e_name="index_wait_patients_table_del"><span class="setIcon iconDel" Userbehavior="A6" onclick="backPatient(&quot;是否确认删除患者本次就诊信息，将患者从系统中删除？&quot;,&quot;'+row.id +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;,&quot;'+row.eventid +'&quot;);"></span><b class="hover-content">删除</b></span>';
				return strhtml;    
            }
        }, ]
    });
	$('#wait-patients').bootstrapTable('refresh');
	fitMethod();

}
document.onkeydown = function(e){
    if(e.keyCode == 13){
    	initTable();
		   $("#wait1").removeClass("active");
		   $("#about1").removeClass("active");
		   $("#profile1").removeClass("active");
		   
		   $("#all").addClass("active");
		   
		   $("#home").removeClass("tab-pane active");
		   $("#home").addClass("tab-pane clearfix");
		   $("#about").removeClass("tab-pane active");
		   $("#about").addClass("tab-pane clearfix");
		   $("#profile").removeClass("tab-pane active");
		   $("#profile").addClass("tab-pane clearfix");
		   $("#contact").removeClass("tab-pane clearfix");
		   $("#contact").addClass("tab-pane active");
    }
}
function loadDividPatientTable(){
	$('#divid-patients').bootstrapTable({
        url: '#path()/index/seachPatient2',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        onClickRow: function (row,$element) {         //单击行的操作
            $($element).addClass('changeColor').siblings().removeClass('changeColor');
            seachHis(row.cardnum,row.id);
       },
		onDblClickRow : function(row) {
			aa(row);
		},
		onLoadSuccess: function(data){ 
        	versionShow();
        },
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	    var temp = {   
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	        cardnum: $("#cardnumText").val(),
        	        fullname: $("#fullnameText").val(),
        	        //修复错误的查询条件，liuxj20181010
        	        status:'未接诊'
        	       };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20,50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        fixedColumns: true, 
        fixedNumber: 1, 						//固定列数
        columns: [{
        	field: 'rowno',
        	width:42,
            title: '序号'
        },
        {
            field: 'status',
            title: '患者状态',
            width:85,
            formatter:function(value,row,index){    
            	var strhtml = '';
            	strhtml += '已分诊';
				return strhtml;    
            }
        },
        {
            field: 'grade',
            title: '分诊级别',
            width:103,
            formatter:function(value,row,index){    
            	var strhtml = '';
				var auto = row.autograde;
				var autoname = row.autoname;
				var finalname = row.finalname;
				var final = row.finalgrade;
				var grade = "";
				var name ="";
				var cixu = row.cixu;
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
				
				if(row.finalgrade !=''){
		    		strhtml+='<span class="table-change-label">'+'改'+'</span>'+ '<span class="btn-xs"  onmouseover="on(&quot;'+row.id +'&quot;,$(this))" onmouseout="out(&quot;'+row.id +'&quot;,$(this))">';
		    	}else{
		    		strhtml+='<span >'+'&nbsp;&nbsp;&nbsp;'+'</span>';
		    	}
				switch(grade)
				{
				    case '1':
				    	//alert(11);
				    	strhtml+='<button type="button" class="btn btn-1001   btn-1001-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '2':
				    	strhtml+='<button type="button" class="btn btn-1002   btn-1002-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '3':
				    	strhtml+='<button type="button" class="btn btn-1003  btn-1003-selected  btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '4':
				    	strhtml+='<button type="button" class="btn btn-1004   btn-1004-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '5':
				    	strhtml+='<button type="button" class="btn btn-1005  btn-1005-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    default:
				    	strhtml+='<button type="button" class="btn btn-primary btn-xs">未分级</button>';
				}
				strhtml+= '</span>';              	
				return strhtml;    
            }
        },
        {
            field: 'cardnum',
            width:138,
            title: '卡号'
        },
        {
            field: 'fullname',
            title: '姓名',
            width:187,
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(row.teshu ==null ||row.teshu ==''){
            		strhtml += ''+ row.fullname+'';
            	}else{
            		strhtml += '<span class="red"><i class="fa fa-star" title="'+row.addr+'"></i></span>'+ row.fullname;
            		specialadd();
            	}
            	if(row.fullname=='无名氏'){
            		strhtml +='     <span class="table-idlable">'+row.id+'</span>';
            	}
				return strhtml;    
            }
        },  {
            field: 'age',
            width:60,
            title: '年龄'
        },{
            field: 'gender',
            width:60,
            title: '性别',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(value=='1'){
            		strhtml='男';
            	}else if(value=='2'){
            		strhtml='女';
            	}else if(value=='9'){
            		strhtml='未说明';
            	}else{
            		strhtml=value;
            	}
				return strhtml;    
            }
            	
        }, {
            field: 'admission',
            width:86,
            title: '来院方式'
        },  {
            field: 'dividdepartmentname',
            width:120,
            title: '分诊去向'
        }, 
        {
            field: '',
            width:103,
            title: '待接诊时间', formatter:function(value,row,index){    
				return jsGetTime2(row.dividtime).substring(0,5);    
            }
        }, 
        {
            field: 'dividtime',
            width:87,
            title: '分诊时间',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	strhtml += row.dividtime;
				return strhtml.substring(11, 16); 
            	 
            }
        },
        {
            field: 'PAADMOPTime',
            width:130,
            title: '挂号日期',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	strhtml += row.PAADMOPTime;
            	if( strhtml ==  'null'){
            		strhtml="";
            	}
				return strhtml.substring(0, 16); 
            	 
            }
        },
        {
            field: '',
            title: '操作',
            width:148,
            formatter:function(value,row,index){    
            	var strhtml = '';
            	var auto = row.autograde;
				var final = row.finalgrade;
				var grade = "";
				if(final==null||final==""){
					grade = auto;
				}else{
					grade = final;
				}
				//判断分级
				if(!(grade==null||grade=="")){
					grade = grade.substring(grade.length-1,grade.length);
				}
            	/*if(row.special==0){
            		strhtml += '<span style="color:black;" ><i class="fa fa-star" onclick="saveSpecial(&quot;是否标记为特殊人员&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.cardnum +'&quot;);"></i></span>';
            	}else{
            		strhtml += '<span class="red" ><i class="fa fa-star" onclick="saveSpecial(&quot;是否取消标记为特殊人员&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.cardnum +'&quot;);"></i></span>';
            	}*/
				var badtype="";
            	badtype+=row.id+"||";
				badtype+=row.cardnum+"||";
				badtype+=row.teshu
                if(row.teshu ==null ||row.teshu ==''){
                	strhtml += '<span style="color:black;" class="hover-parent version-hide" e_name="index_divid_patients_table_specail"><i class="fa fa-star" Userbehavior="A7" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
            	}else{
            		strhtml += '<span class="red hover-parent version-hide" e_name="index_divid_patients_table_specail"><i class="fa fa-star" Userbehavior="A7" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
            	}
            	
            	strhtml += '<span class="hover-parent version-hide" e_name="index_divid_patients_table_ralationsign"><span class="setIcon iconDis" Userbehavior="A8" onclick="showsign(&quot;'+row.signurl +'&quot;)"></span><b class="hover-content">家属签字</b></span>';
            	
            	strhtml += '<span class="hover-parent version-hide" e_name="index_divid_patients_table_edit"><span class="setIcon iconWrite" Userbehavior="A9" onclick="openDivid2(&quot;'+row.id +'&quot;)"></span><b class="hover-content">查看/修改</b></span>';
            	if(is_print!='已关闭'){
                	strhtml += '<span class="hover-parent version-hide" e_name="index_divid_patients_table_print"><span class="list-print-icon" onclick="dayindividshow(&quot;'+row.id +'&quot;);"></span><b class="hover-content">打印分诊单</b></span>';
            	}
            	//strhtml += '<span class="setIcon iconDel" onclick="backPatient2(&quot;是否确认删除患者分诊信息，将患者退回‘待分诊’状态？&quot;,&quot;'+row.id +'&quot;,&quot;'+row.status +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;);"></span>';
            	if(is_receive!='已关闭'){
                	strhtml += '<span class="hover-parent version-hide" e_name="index_divid_patients_table_receive"><span class="setIcon iconTriage" Userbehavior="A10" onclick="receive(&quot;标记已接诊&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.dividtime +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;,&quot;'+row.savestatus +'&quot;);" id="receive" value=""></span><b class="hover-content">接诊</b></span>';

            	}
//            	if((grade =='3' || grade=='4') && row.go_rct !='1'){
//                	strhtml += '<span class="setIcon iconTriage" Userbehavior="A10" onclick="receive(&quot;标记已接诊&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.dividtime +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;,&quot;'+row.savestatus +'&quot;);" id="receive" value=""></span>';
//            	}else{
//                	strhtml += '<span class="setIcon " Userbehavior="A10"  id="receive" value=""></span>';
//
//            	}

				return strhtml;    
            }
        }, ]
    });
	$('#divid-patients').bootstrapTable('refresh');
	fitMethod();
}
function loadRecivedPatientTable(){
	$('#recived-patients').bootstrapTable({
        url: '#path()/index/seachPatient2',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        onClickRow: function (row,$element) {         //单击行的操作
       	 $('.changeColor').removeClass('changeColor');
            $($element).addClass('changeColor');
            seachHis(row.cardnum,row.id);
       },
       onLoadSuccess: function(data){ 
       	versionShow();
       },
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	    var temp = {   
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	        cardnum: $("#cardnumText").val(),
        	        fullname: $("#fullnameText").val(),
        	        status:'已接诊'
        	       };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20,50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        fixedColumns: true, 
        fixedNumber: 1, 						//固定列数
        columns: [{
        	field: 'rowno',
        	width:54,
            title: '序号'
        }, {
            field: 'status',
            width:95,
            title: '患者状态'
        },
        {
            field: 'grade',
            title: '分诊级别',
            width:99,
            formatter:function(value,row,index){    
            	var strhtml = '';
				var auto = row.autograde;
				var autoname = row.autoname;
				var finalname = row.finalname;
				var final = row.finalgrade;
				var cixu = row.cixu;
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
				if(row.finalgrade !=''){
		    		strhtml+='<span class="table-change-label version-hide" e_name="index_divid_patients_table_grade">'+'改'+'</span>'+ '<span class="btn-xs"  onmouseover="on(&quot;'+row.id +'&quot;,$(this))" onmouseout="out(&quot;'+row.id +'&quot;)">';
		    	}else{
		    		strhtml+='<span >'+'&nbsp;&nbsp;&nbsp;'+'</span>';
		    	}
				switch(grade)
				{
				    case '1':
				    	//alert(11);
				    	strhtml+='<button type="button" class="btn btn-1001   btn-1001-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '2':
				    	strhtml+='<button type="button" class="btn btn-1002   btn-1002-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '3':
				    	strhtml+='<button type="button" class="btn btn-1003  btn-1003-selected  btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '4':
				    	strhtml+='<button type="button" class="btn btn-1004   btn-1004-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '5':
				    	strhtml+='<button type="button" class="btn btn-1005  btn-1005-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    default:
				    	strhtml+='<button type="button" class="btn btn-primary btn-xs">未分级</button>';
				}
				strhtml+= '</span>';               	
				return strhtml;    
            }
        },
        {
            field: 'cardnum',
            width:147,
            title: '卡号'
        },
        {
            field: 'fullname',
            title: '姓名',
            width:199,
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(row.teshu ==null ||row.teshu ==''){
            		strhtml += ''+ row.fullname+'';
            	}else{
            		strhtml += '<span class="red"><i class="fa fa-star" title="'+row.addr+'"></i></span>'+ row.fullname;
            		specialadd();
            	}
            	if(row.fullname=='无名氏'){
            		strhtml +='     <span class="table-idlable">'+row.id+'</span>';
            	}
				return strhtml;    
            }
        },  {
            field: 'age',
            width:70,
            title: '年龄'
        },{
            field: 'gender',
            width:60,
            title: '性别',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(value=='1'){
            		strhtml='男';
            	}else if(value=='2'){
            		strhtml='女';
            	}else if(value=='9'){
            		strhtml='未说明';
            	}else{
            		strhtml=value;
            	}
				return strhtml;    
            }
        }, {
            field: 'admission',
            width:99,
            title: '来院方式'
        },  {
            field: 'dividdepartmentname',
            width:138,
            title: '分诊去向'
        }, 
         
        {
            field: 'receivetime',
            width:100,
            title: '接诊时间',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	strhtml += row.receivetime;
				return strhtml.substring(11, 16); 
            	 
            }
        },
        {
            field: 'PAADMOPTime',
            width:130,
            title: '挂号日期',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	strhtml += row.PAADMOPTime;
            	if( strhtml ==  'null'){
            		strhtml="";
            	}
				return strhtml.substring(0, 16); 
            	 
            }
        }, 
        {
            field: '',
            title: '操作',
            width:127,
            formatter:function(value,row,index){   
            	var strhtml = '';
            	/*if(row.special==0){
            		strhtml += '<span style="color:black;" ><i class="fa fa-star" onclick="saveSpecial(&quot;是否标记为特殊人员&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.cardnum +'&quot;);"></i></span>';
            	}else{
            		strhtml += '<span class="red"><i class="fa fa-star" onclick="saveSpecial(&quot;是否取消标记为特殊人员&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.cardnum +'&quot;);"></i></span>';
            	}*/
            	var badtype="";
            	badtype+=row.id+"||";
				badtype+=row.cardnum+"||";
				badtype+=row.teshu
                if(row.teshu ==null ||row.teshu ==''){
                	strhtml += '<span style="color:black;" class="hover-parent" e_name="index_receive_patients_table_specail"><i class="fa fa-star" Userbehavior="A11" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
            	}else{
            		strhtml += '<span class="red hover-parent version-hide" e_name="index_receive_patients_table_specail"><i class="fa fa-star" Userbehavior="A11" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
            	}
            	
            	strhtml += '<span class="hover-parent version-hide" e_name="index_receive_patients_table_ralationsign"><span class="setIcon iconDis" Userbehavior="A12" onclick="showsign(&quot;'+row.signurl +'&quot;)"></span><b class="hover-content">家属签字</b></span>';
            	strhtml += '<span class="hover-parent version-hide" e_name="index_receive_patients_table_edit"><span class="setIcon iconWrite" Userbehavior="A13" onclick="openDivid2(&quot;'+row.id +'&quot;)"></span><b class="hover-content">查看/修改</b></span>';
            	//strhtml += '<span class="setIcon iconDel" onclick="backPatient2(&quot;是否确认删除患者本次就诊信息，将患者从系统中删除？&quot;,&quot;'+row.id +'&quot;,&quot;'+row.status +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;);"></span>';
				return strhtml;    
            }
        }, ]
    });
	$('#recived-patients').bootstrapTable('refresh');
	fitMethod();
}

function loadAllPatientTable(){
	$('#all-patients').bootstrapTable({
        url: '#path()/index/seachPatient2',         //请求后台的URL（*）
        method: 'post',//请求方式（*）
        contentType:"application/x-www-form-urlencoded",
        //toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: function (params) {
        	    //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        	    var temp = {   
        	        rows: params.limit,                         //页面大小
        	        page: (params.offset / params.limit) + 1,   //页码
        	        cardnum: $("#cardnumText").val(),
        	        fullname: $("#fullnameText").val(),
        	        status:'all'
        	       };
        	    return temp;
              },//传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20,50],        //可供选择的每页的行数（*）
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        //height: 200,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        fixedColumns: true, 
        fixedNumber: 1, 						//固定列数
        onClickRow: function (row,$element) {         //单击行的操作
       	 $('.changeColor').removeClass('changeColor');
            $($element).addClass('changeColor');
            seachHis(row.cardnum,row.id);
        },
        onLoadSuccess: function(data){ 
        	versionShow();
        },
        columns: [{
        	field: 'rowno',
        	width:45,
            title: '序号',
            formatter:function(value,row,index){    
            	var pageSize = $('#all-patients').bootstrapTable('getOptions').pageSize;     //通过table的#id 得到每页多少条
                var pageNumber = $('#all-patients').bootstrapTable('getOptions').pageNumber; //通过table的#id 得到当前第几页
                return pageSize * (pageNumber - 1) + index + 1;    // 返回每条的序号： 每页条数 *（当前页 - 1 ）+ 序号  
            }
        }, {
            field: 'status',
            width:70,
            title: '患者状态',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(row.status=='未分诊'){
            		strhtml +='<span  style=" background-color: #999; ">待分诊</span>';
            	}else if(row.status=='未接诊'){
            		strhtml +='已分诊';
            	}else if(row.status=='已接诊'){
            		strhtml +='已接诊';
            	}else{
            		strhtml +=row.status;
            	}
            	
				return strhtml;    
            }
        },
        {
            field: 'grade',
            title: '分诊级别',
            width:87,
            formatter:function(value,row,index){    
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
				if(row.finalgrade !=''){
		    		strhtml+='<span class="table-change-label">'+'改'+'</span>'+ '<span class="btn-xs"  onmouseover="on(&quot;'+row.id +'&quot;,$(this))" onmouseout="out(&quot;'+row.id +'&quot;,$(this))">';
		    	}else{
		    		strhtml+='<span >'+'&nbsp;&nbsp;&nbsp;'+'</span>';
		    	}
				switch(grade)
				{
				    case '1':
				    	//alert(11);
				    	strhtml+='<button type="button" class="btn btn-1001   btn-1001-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '2':
				    	strhtml+='<button type="button" class="btn btn-1002   btn-1002-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '3':
				    	strhtml+='<button type="button" class="btn btn-1003  btn-1003-selected  btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '4':
				    	strhtml+='<button type="button" class="btn btn-1004   btn-1004-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    case '5':
				    	strhtml+='<button type="button" class="btn btn-1005  btn-1005-selected btn-xs ">'+name+'级'+'</button>';
				        break;
				    default:
				    	strhtml+='<button type="button" class="btn btn-primary btn-xs">未分级</button>';
				}
			                  	
				return strhtml;    
            }
        },
        {
            field: 'cardnum',
            width:210,
            title: '卡号'
        }, 
        {
            field: 'fullname',
            title: '姓名',
            width:153,
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(row.teshu ==null ||row.teshu ==''){
            		strhtml += ''+ row.fullname+'';
            	}else{
            		strhtml += '<span class="red"><i class="fa fa-star" title="'+row.addr+'"></i></span>'+ row.fullname;
            	}
            	if(row.fullname=='无名氏'){
            		strhtml +='     <span class="table-idlable">'+row.id+'</span>';
            	}
				return strhtml;    
            }
        }, {
            field: 'age',
            width:100,
            title: '年龄'
        },{
            field: 'gender',
            width:60,
            title: '性别',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(value=='1'){
            		strhtml='男';
            	}else if(value=='2'){
            		strhtml='女';
            	}else if(value=='9'){
            		strhtml='未说明';
            	}else{
            		strhtml=value;
            	}
				return strhtml;    
            }
        }, {
            field: 'admission',
            width:87,
            title: '来院方式'
        },  {
            field: 'dividdepartmentname',
            width:123,
            title: '分诊去向'
        }
        , {
            field: 'dividtime',
            width:89,
            title: '时间',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	strhtml += row.registertime;
				return strhtml.substring(11, 19); 
            	 
            }
        },
        {
            field: 'PAADMOPTime',
            width:130,
            title: '挂号日期',
            formatter:function(value,row,index){    
            	var strhtml = '';
            	strhtml += row.PAADMOPTime;
            	if( strhtml ==  'null'){
            		strhtml="";
            	}
				return strhtml.substring(0, 16); 
            	 
            }
        }, 
        {
            field: '',
            title: '操作',
            width:140,
            formatter:function(value,row,index){    
            	var strhtml = '';
            	if(row.status !='未分诊'){
            		/*if(row.special==0){
                		strhtml += '<span style="color:black;" ><i class="fa fa-star" onclick="saveSpecial(&quot;是否标记为特殊人员&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.cardnum +'&quot;);"></i></span>';
                	}else{
                		strhtml += '<span class="red"><i class="fa fa-star" onclick="saveSpecial(&quot;是否取消标记为特殊人员&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.cardnum +'&quot;);"></i></span>';
                	}*/
            		var badtype="";
                	badtype+=row.id+"||";
    				badtype+=row.cardnum+"||";
    				badtype+=row.teshu
                    if(row.teshu ==null ||row.teshu ==''){
                    	strhtml += '<span style="color:black;" class="hover-parent version-hide" e_name="index_all_patients_table_specail"><i class="fa fa-star" Userbehavior="A14" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
                	}else{
                		strhtml += '<span class="red hover-parent version-hide" e_name="index_all_patients_table_specail"><i class="fa fa-star" Userbehavior="A14" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
                	}
            		
                	strhtml += '<span class="hover-parent version-hide" e_name="index_all_patients_table_ralationsign"><span class="setIcon iconDis" Userbehavior="A15" onclick="showsign(&quot;'+row.signurl +'&quot;)"></span><b class="hover-content">家属签字</b></span>';
                	strhtml += '<span class="hover-parent version-hide" e_name="index_all_patients_table_edit"><span class="setIcon iconWrite" Userbehavior="A16" onclick="openDivid2(&quot;'+row.id +'&quot;)"></span><b class="hover-content">查看/修改</b></span>';
//                	if(row.status =='已接诊'){
//                    	strhtml += '<span class="setIcon iconDel" onclick="backPatient2(&quot;是否确认删除患者本次就诊信息，将患者从系统中删除？&quot;,&quot;'+row.id +'&quot;,&quot;'+row.status +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;);"></span>';
//                	}else{
//                    	strhtml += '<span class="setIcon iconDel" onclick="backPatient2(&quot;是否确认删除患者分诊信息，将患者退回‘待分诊’状态？&quot;,&quot;'+row.id +'&quot;,&quot;'+row.status +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;);"></span>';
//                	}
                	if(row.status =='未接诊'){
                		if(is_print!='已关闭'){
                        	strhtml += '<span class="hover-parent version-hide" e_name="index_all_patients_table_print"><span class="list-print-icon" onclick="dayindividshow(&quot;'+row.id +'&quot;);"></span><b class="hover-content">打印分诊单</b></span>';
                    	}
                		if(is_receive!='已关闭'){
                        	strhtml += '<span class="hover-parent version-hide" e_name="index_all_patients_table_receive"><span class="setIcon iconTriage" Userbehavior="A10" onclick="receive(&quot;标记已接诊&quot;,&quot;'+ row.id +'&quot;,&quot;'+row.dividtime +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;,&quot;'+row.savestatus +'&quot;);" id="receive" value=""></span><b class="hover-content">接诊</b></span>';

                    	}
                	}
            	}else{
            		var badtype="";
                	badtype+=row.id+"||";
    				badtype+=row.cardnum+"||";
    				badtype+=row.teshu
                    if(row.teshu ==null ||row.teshu ==''){
                    	strhtml += '<span style="color:black;" class="hover-parent version-hide" e_name="index_all_patients_table_specail"><i class="fa fa-star" Userbehavior="A4" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
                	}else{
                		strhtml += '<span class="red hover-parent version-hide" e_name="index_all_patients_table_specail"><i class="fa fa-star" Userbehavior="A4" onclick="baote(&quot;'+badtype+'&quot;);"></i><b class="hover-content">报特殊</b></span>';
                	}
    				
    				
                	if(row.cixu>1){
                    	strhtml += '<span class="hover-parent version-hide" e_name="index_all_patients_table_edit"><span class="setIcon iconWrite" Userbehavior="A16" onclick="openDivid2(&quot;'+row.id +'&quot;)"></span><b class="hover-content">查看/修改</b></span>';
                	}else{
                    	strhtml += '<span class="hover-parent version-hide" e_name="index_all_patients_table_edit"><span class="setIcon iconWrite" Userbehavior="A16" onclick="openDivid(&quot;'+row.id +'&quot;)"></span><b class="hover-content">查看/修改</b></span>';
                	}
                	
                	strhtml += '<span class="hover-parent version-hide" e_name="index_all_patients_table_del"><span class="setIcon iconDel" Userbehavior="A6" onclick="backPatient(&quot;是否确认删除患者本次就诊信息，将患者从系统中删除？&quot;,&quot;'+row.id +'&quot;,&quot;'+row.hisid +'&quot;,&quot;'+row.cardnum +'&quot;,&quot;'+row.eventid +'&quot;);"></span><b class="hover-content">删除</b></span>';
//    				return strhtml;  
            	}
            	
				return strhtml;    
            }
        }, ]
    });
	$('#all-patients').bootstrapTable('refresh');
	fitMethod();
}

//获取上次来院的信息
function seachHis(cardnum,id){
	
	$.ajax({
        type: "post",
        url: "#path()/index/seachHis",
        data:{
        	cardnum:cardnum,
        	id:id
        },
        dataType: "json",
        async:true,
        success: function(result){
        	if(result!=null){
        		if(result.status==200&&result.rows!=null){
        			var row = result.rows;
        			$("#ryfs").val(row.admission);
        			
        			if(row.registertime!=null){
        				$("#sczy").val(row.registertime.replace(/-/g, "/"));
        			}
        			if(row.leavetime!=null){
        				$("#sccy").val(row.leavetime.replace(/-/g, "/"));
        			}
        			$("#departname1").val(row.dividdepartmentname);
        			$("#departname2").val(row.receivedepartmentname);
        		}else{
        			$("#ryfs").val('');
        			$("#sczy").val('');
        			$("#departname1").val('');
        			$("#departname2").val('');
        			$("#sccy").val('');
        		}
        	}
		},
		error : function() {
			delcfm("获取失败！请联系系统管理员");
		}
	});
}

function saveSpecial(mes,id,cardnum) { 
    $('#mes').html(mes);//给会话中的隐藏属性URL赋值  
    $('#id').val(id);
    $('#cardnum').val(cardnum);
    $('#delcfmModel').modal();  
}

function backPatient(mes,p_id,hisid,cardnum,eventid) { 
    $('#mes').html(mes);//给会话中的隐藏属性URL赋值  
    $('#p_id').val(p_id);
    $('#delcfmModel').modal(); 
    $('#hisid').val(hisid);
	$('#cardnum').val(cardnum);
	$('#eventid').val(eventid);
}
function backPatient2(mes,p_id,status,hisid,cardnum) { 
	
    $('#mes').html(mes);//给会话中的隐藏属性URL赋值  
    $('#status').val(status);
    $('#p_id').val(p_id);
    $('#delcfmModel').modal();  
    $('#hisid').val(hisid);
	$('#cardnum').val(cardnum);
}
function delcfm(mes) {  
    $('#mes').html(mes);//给会话中的隐藏属性URL赋值  
    $('#cardnum').val("");
    $('#p_id').val("");
    $('#delcfmModel').modal();  
}  
function urlSubmit(){  
	var cardnum=$.trim($("#cardnum").val());
	var status=$.trim($("#status").val());
	var nurseid = $("#userId").val();
	var hisid = $("#hisid").val();
	var p_id=$.trim($("#p_id").val());
	var id=$.trim($("#id").val());
	var eventid = $("#eventid").val();
	$("#cardnum").val("");
	$("#id").val("");
	$("#p_id").val("");
	$("#eventid").val("");
	if(id!=""){
		$.ajax({
	        type: "post",
	        url: "#path()/index/saveSpecial",
	        data:{
	        	cardnum:cardnum,id:id,type:"特殊患者"
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	$("#special").html(0);
    			initTable();
			},
			error : function() {
			}
		});
		return ;
	}
	//动态退回
	if(status!=""){
		$.ajax({
	        type: "post",
	        url: "#path()/index/backPatient2",
	        data:{
	        	p_id:p_id,status:status,
	        	hisid:hisid,
	        	nurseid:nurseid,
	        	cardnum:cardnum
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	$("#special").html(0);
	        	initTable();
	        	$("#status").val('');
			},
			error : function() {
			}
		});
		return ;
	}
	//回退
	if(p_id!=""){
		$.ajax({
	        type: "post",
	        url: "#path()/index/backPatient",
	        data:{
	        	p_id:p_id,
	        	hisid:hisid,
	        	nurseid:nurseid,
	        	cardnum:cardnum,
	        	eventid:eventid
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	$("#special").html(0);
	        	initTable();
			},
			error : function() {
			}
		});
	}
	
} 




function getPaitentNums(){  
	if(cardnum!=""){
		$.ajax({
	        type: "post",
	        url: "#path()/index/getPaitentNums",
	        data:{
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			//console.log(result.rows);
	        			$("#back1").html(result.rows.cancel);
	        			$("#divid").html(result.rows.divid);
	        			$("#receive").html(result.rows.receive);
	        			$("#register1").html(result.rows.register);
	        			$("#special").html(result.rows.special);
	        			$("#wait").html(result.rows.wait);
	        		}
	        	}
			},
			error : function() {
			}
		});
	}
} 

//获取部门等待人数
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
            	
            	$("#depart").html("");
            	var str ="";
            	
       	 		for(var i in rows){
       	 			
       	 			var name = rows[i]["td_name"];
       	 			var count = rows[i]["count"];
       	 			var max = rows[i]["readyclinicalreceptionmax"];
       	 			//4个换一行 第一个不用结尾
       	 			if((i%4==0)&&(i!=0)){
       	 				str+='</li>';
       	 			}
       	 			if(i%4==0){
       	 				str+='<li>';
       	 			}
       	 			str +='<div class="deskItem';
       	 			if(count>=max){
       	 				str +=' text-danger';
       	 					//警告的标准待定 目前是 一半就警告 
       	 			}
       	 			str +='">';
       	 			str +='<span><img src="#path()/static/bj/images/iconHeart.png">';
       	 			str += name;
       	 			str +='</span>';
       	 			str += count+'人';
       	 			str +='</div>';
       	 		}
       	 	str+='</li>';
       	 	//console.log(str);
       	 	$("#depart").html(str);
            
        	}
        },
        error: function () {
        	//$.messager.alert('提示','获取失败，请联系管理员');
        }
    });
}

function fitMethod(){
	//先解除绑定，否则每次点击会触发四次click事件
	$(".chevron").unbind('click');
	
	//自适应
	var h = $(".content").outerHeight();
	var h1 = $(".footer-main").outerHeight();
	var h2 = $(".headTips").outerHeight();
	var h3 = h-h1-h2-20;   	
	$(".general").css("height",h3+"px");
	var h5 = $(".headTab").outerHeight();
	var h6 = h3-10-31-h5;	
	var h7 = h6-50;
	var h8 = h3-10-147-h5;
	var h9 = h8-50;	
	
	if($(".fa-chevron-up").length > 0){
		$('.tab-content').css("height",h6+"px");
		$('.fixed-table-body').height(h7);
		$('.fixed-table-container').css({'height':h7+'px','padding-bottom':'0'});
		$('table').attr('data-height',h7);
		$(".chevron").parent().siblings(".pancont").hide();
		$(".chevron").removeClass("fa-chevron-down").addClass("fa-chevron-up");
	}else{
		$('.tab-content').css("height",h8+"px");
		$('.fixed-table-body').height(h9);
		$('.fixed-table-container').css({'height':h9+'px','padding-bottom':'0'});
		$('table').attr('data-height',h9);
		$(".chevron").parent().siblings(".pancont").show();
		$(".chevron").removeClass("fa-chevron-up").addClass("fa-chevron-down");
	}
	
	var flag = false;
	$(".chevron").click(function(){
		if(flag == false){
			//用户行为监控记录"收起智能提醒区"
			saveUserbehavior("A19");
			
			$(this).parent().siblings(".pancont").show();
			$(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");		
			$('.tab-content').css('height',h8+"px");	
			$('.fixed-table-body').height(h9);
			$('.fixed-table-container').css({'height':h9+'px','padding-bottom':'0'});
			$('table').attr('data-height',h9);
			flag = true;		
		}else{
			//用户行为监控记录"收起智能提醒区"
			saveUserbehavior("A79");
			
			$(this).parent().siblings(".pancont").hide();
			$(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
			$('.tab-content').css("height",h6+"px");							
			$('.fixed-table-body').height(h7);
			$('.fixed-table-container').css({'height':h7+'px','padding-bottom':'0'});
			$('table').attr('data-height',h7);	
			flag = false;
		}
	}) ;   
}

function initTable(){	
	loadWaitPatientTable();
	loadDividPatientTable();
	loadRecivedPatientTable();
	loadAllPatientTable();
	//上方统计数量
	getPaitentNums();
	//下方统计数量
	showDepart();
	//报警次数
	getWarnNums();
//	aa();
//	bb();

}
function timeFn(d1) {//di作为一个变量传进来
	var retruntime = "";
	if(d1==''||d1==null){
		retruntime = "";
	}else{
		//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
	    var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
	    var dateEnd = new Date();//获取当前时间
	    var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
	    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
	    var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
	    var hours=Math.floor(leave1/(3600*1000))//计算出小时数
	    //计算相差分钟数
	    var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
	    var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
	    //计算相差秒数
	    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
	    var seconds=Math.round(leave3/1000)
	    if(dayDiff<1){
	    	if(minutes<10){
	    		minutes="0"+minutes;
	    	}
	    	if(seconds<10){
	    		seconds="0"+seconds;
	    	}
	    	retruntime =hours+":"+minutes+":"+seconds;
	    }else{
	    	retruntime = dayDiff+"天"+hours+"小时"+minutes+"分钟前";
	    }
	    
	}
    return retruntime;
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

function openDivid(id){
	var befrom =$("#menu_tab li[class='active']").attr("id");
	window.location.href="#path()/divid/index?id="+id+"&type=divid&befrom="+befrom;
}

function openPreDivid(id){
	var befrom =$("#menu_tab li[class='active']").attr("id");
	window.location.href="#path()/divid/index?id="+id+"&type=predivid&befrom="+befrom;
}

function openDivid2(id){
	var befrom =$("#menu_tab li[class='active']").attr("id");
	window.location.href="#path()/divid/index?id="+id+"&type=xgpj&befrom="+befrom;
}
function receive(mes,id,fenzhen_time,hisid,cardnum,savestatus){
//	$('#temessage').html('');
	if(savestatus=='save'){
		$("#special").html(0);
//		var aa = "<div class='clearfix'><p>分诊时间：<span id='show_dividtime'></span></p><div class='form-group'>接诊时间：";
//		aa +='<div class="input-group  date-picker input-daterange"  data-date="2018-12-12" data-date-format="yyyy-mm-dd">'	;	
//		aa += '<input  id="jiezhen_time" type="text"  name="" placeholder="选择时间" class="form-control "></div></div></div>';
		var aa='<div class="input-group input-large date-picker input-daterange" data-date="2018-12-12" data-date-format="yyyy-mm-dd" style="line-height:34px;">';
		aa +='<input type="text" class="form-control" name="from" id="starttime"></div>';
//	    $('#temessage').html(aa);//给会话中的隐藏属性URL赋值   
		$('#tep_id').val(id);
		$('#hisid').val(hisid);
		$('#cardnum').val(cardnum);
		$("#show_dividtime").text(fenzhen_time);
//		$('.mt1').datePicker({ 
//			
//		 });
		var sytime = synctime();
		$("#jiezhen_time").val(sytime.substring(0,16));
		$("#caozuo").val("jiezhen");
		$('#teModel').modal(); 
		$('#jiezhen_time').datetimepicker({ 
		    autoclose:true
		    });
		
	}else{
		var aa = "<p>该患者是暂存状态，请保存后接诊</p>" ;
		//var aa = "<p>该患者是暂存状态，请保存后接诊</p>" +
		$('#temessage1').html(aa);//给会话中的隐藏属性URL赋值   
		$('#teModel1').modal();  
	}
	
     
}

function teurlSubmit(){	
	var nurseid = $("#userId").val();
	var hisid = $("#hisid").val();
	var cardnum = $("#cardnum").val();
	 if($("#jiezhen_time").val() == ""){
	    $("#jiezhen_time").css("border","solid 1px rgb(255, 48, 29)");	
	    $("#jiezhen_time").bind("blur",function(){
	    	$(this).css("border","1px solid #ccc");
	    })
	    return;
	 }else{
		$("#jiezhen_time").css("border","1px solid #ccc;");
		$('#teModel').modal('hide')	    
	 }	 
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
		        	jiezhentime:$("#jiezhen_time").val(),
		        	hisid:hisid,
		        	nurseid:nurseid,
		        	cardnum:cardnum
		        },
		        dataType: "json",
		        success: function (result) {
		        	if(result.status==200){
		        		initTable();
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

/*根据时间计算出距离现在差距*/
function jsGetTime2(datetime){
	var s = "";
	if (datetime != null) {
		s = datetime.replace(/-/g, "/");
		var mss = new Date().getTime() - new Date(s).getTime();
		if(mss<0){
			return "--:--:--";
		}
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = days * 24
				+ parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		if (hours < 10) {
			hours = "0" + hours;
		}
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		var seconds = parseInt((mss % (1000 * 60)) / 1000);
		if(seconds < 10){
			seconds = "0" +seconds;
		}
		return hours + ":" + minutes + ":" + seconds;
	}
}
function openPic(id){
	$.ajax({
        type: "post",
        url: "#path()/index/openPic",
        data : {
        	
        },
        dataType: "json",
        success: function (result) {
        	
        },
    });
}


function on(id,_this){
	var width = _this.outerWidth();
	var height = _this.outerHeight();
	var offsetTop = _this.offset().top;
	var offsetleft = _this.offset().left;
	var width1 = $("#pingji").outerWidth();
	var height1 = $("#pingji").outerHeight();
	var top = offsetTop+(height/2-height1/2);
	var left = offsetleft+width;
	$.ajax({
	    type: "post",
	    url: "#path()/divid/queryPatientHandleId",
	    data:{
	   	 id:id
	    },
	    dataType: "json",
	    async:false,
	    success: function(result){
	    	if(result!=null){
	    		if(result.status==200){
	    				var time =result.rows.dividtime;
	    				var old=result.rows.autoname+'级';
	    				if(old=='null级'){
	    					old='-'
	    				}
	    				var new1=result.rows.finalname+'级';
	    				if(new1=='null级'){
	    					new1='-'
	    				}
	    				$("#old").html(old);
	    				$("#new").html(new1);
	    				$("#reson").html(result.rows.changereason);
	    				$("#doctor").html(result.rows.dividenurse);
	    				if(time != null){
	    					$("#time").html(time.substring(11,16));
		    				$("#date").html(time.substring(0,11));
	    				}
	    				
	    		}
	    	}
	    },
	    error: function(){
	    }
	});
	$("#pingji").show().css({
		"top":top+"px",
		"left":left+"px"
	});
};

function out(id,_this){
	$("#pingji").hide();
};

function seach2(){
	$("#cardnumText").val('');
	$("#fullnameText").val('');
	initTable();
	$("#wait1").removeClass("active");
	$("#about1").removeClass("active");
	$("#profile1").removeClass("active");
	$("#all").addClass("active");
	$("#home").removeClass("tab-pane active");
	$("#home").addClass("tab-pane clearfix");
	$("#about").removeClass("tab-pane active");
	$("#about").addClass("tab-pane clearfix");
	$("#profile").removeClass("tab-pane active");
	$("#profile").addClass("tab-pane clearfix");
	$("#contact").removeClass("tab-pane clearfix");
	$("#contact").addClass("tab-pane active");
	
}

function showsign(path){
//查看签名隐藏liuxj20181219
//	if(path !=''){
//		$("#signimg").attr("src","#path()"+path);
//		$("#img").show();
//		setTimeout("$('#img').hide()",3000);
//	}
}
function specialadd(){
//	var num = parseInt($("#special").html());
//	$("#special").html(num+1);
}

function hideteModel1(){
	$("#teModel1").modal('hide');
}

//导入excel
function importexcel(){
	var formData = new FormData();
    if(document.getElementById("importfile").files[0]!=null){
    	formData.append("importfile", document.getElementById("importfile").files[0]); 
    	$.ajax({
            url: "#path()/index/importExcel",
            type: "POST",
            data: formData,
            async:false,
            /**
            *必须false才会自动加上正确的Content-Type
            */
            contentType: false,
            /**
            * 必须false才会避开jQuery对 formdata 的默认处理
            * XMLHttpRequest会对 formdata 进行正确的处理
            */
            processData: false,
            success: function (result) {
                if (result.status == "200") {
                	toastr.warning("上传成功！");
                    //跳转首页
    				window.location.href='#path()/index/index'
                }else{
                	toastr.warning(result.message);
                }
            },
            error: function () {
                toastr.warning("上传失败！");
            }
        });
    }else{
    	toastr.warning("请选择要导入的文件！");
    }
}

//报特殊
function baote(data){
	
//	var Strhtml = "";
//	//var pid = $(da).attr("pid");
//	//var data = $(da).attr("pdata");
//	var da = (data+"").split("||");
//	if(da.length>3){
//		if(da[2]!="0"){
//			Strhtml += "<div class='badtype'><input type='checkbox' Userbehavior='A161' name='badtype' checked value='特殊患者'>特殊患者</div>";
//		}else{
//			Strhtml += "<div class='badtype'><input type='checkbox' Userbehavior='A161' name='badtype' value='特殊患者'>特殊患者</div>";
//		}
//        if(da[3]!="0"){
//        	Strhtml += "<div class='badtype'><input type='checkbox' Userbehavior='A169' name='badtype' checked value='欠费患者'>欠费患者</div>";
//		}else{
//			Strhtml += "<div class='badtype'><input type='checkbox' Userbehavior='A169' name='badtype' value='欠费患者'>欠费患者</div>";
//		}
//	}else{
//		Strhtml += "<div class='badtype'><input type='checkbox' Userbehavior='A161' name='badtype' value='特殊患者'>特殊患者</div>";
//		Strhtml += "<div class='badtype'><input type='checkbox' Userbehavior='A169' name='badtype' value='欠费患者'>欠费患者</div>";
//	}
//	back(Strhtml,"baoteshu",da[0],data);
	var da = (data+"").split("||");
	var Strhtml = Array();
//	var pid = $(da).attr("pid");
//	var teshu = $(da).attr("pdata")
	var teshu = da[2];
	$.ajax({
		type : "post",
		url : "#path()/index/querySpecialOptions",
		dataType : "json",
		async: false,
		success : function(result) {
			if(result.status=="200"){
				var html ="";
				$.each(result.rows, function (i, item) {
					 if(teshu !=""){
//						 teshu = JSON.parse(teshu);
//						 alert(JSON.parse(teshu));
						 if(teshu.indexOf(item.id) != -1 ){
							 html = "<div class='badtype checkbox checkbox-primary'><input type='checkbox' name='badtype' value='"+item.id+"' checked><label>"+item.name+"</label></div>";
							 //html = "<div class='badtype'><input type='checkbox' name='badtype' value='"+item.addr+"' checked>"+item.name+"</div>";
						 }else{
							 html = "<div class='badtype checkbox checkbox-primary'><input type='checkbox' name='badtype' value='"+item.id+"'><label>"+item.name+"</label></div>";
						 } 
					 }else{
						 html = "<div class='badtype checkbox checkbox-primary'><input type='checkbox' name='badtype' value='"+item.id+"'><label>"+item.name+"</label></div>";
					 }
					Strhtml.push(html);
                });
				back(Strhtml,"baoteshu",da[0],da[1]);
			}else{
				toastr.clear();
				toastr.warning(result.message);
			}
		},
		error : function() {
		}
	});
}

//共用的弹出框确认
function back(mes,th,id,data) {
	$("#methodname").val(th);
	$("#methoduseid").val(id);
	$("#methoddata").val(data);
    $('#promptmassage').html(mes);
    badtype();
    $('#promptModel').modal();
}

function badtype(){
    $('#promptmassage').find('.badtype').click(function(event){ 
    	if(event.target != $(this).find(":checkbox")[0]){
	    	var check = $(this).find('[name=badtype]').prop("checked");
	    	if(check == true){
	    		$(this).find('[name=badtype]').prop("checked",false);
	    	}else{
	    		$(this).find('[name=badtype]').prop("checked",true);
	    	}
    	}
    })
}

//共用的确认
function confirmassagetrue(){
	$("#confirmpromptModel").val("2");
	var methodname = $("#methodname").val();
	var methoduseid = $("#methoduseid").val();
	var nurseid = "#userId()";
    if(methodname=="baoteshu"){
    	
    	//用户行为监控-星标-确认
    	saveUserbehavior("A77");
    	
		var methoddata = $("#methoddata").val();
//		if(methoddata!=null && methoddata!=""){
			var cardnum = methoddata;	
			var badtypes = $('#promptmassage').find('[name=badtype]:checked');
			var show_toastr = "";
			var show_message = "";
			var badtype="-1";
			if(badtypes.length>0){
				badtype="";
			}
			for(var i=0;i<badtypes.length;i++){
				//记录 特殊是的操作记录 次数
				if($(badtypes[i]).attr("value")=="特殊患者"){
					saveUserbehavior("A17");
				}else if($(badtypes[i]).attr("value")=="特殊患者"){
					saveUserbehavior("A18");
				}
				badtype += $(badtypes[i]).attr("value")+",";
			}
			$.ajax({
			        type: "post",
			        url: "#path()/index/saveSpecial2",
			        data:{
			        	id:methoduseid,
			        	cardnum:cardnum,
			        	type:badtype
			        },
			        async:false,
			        dataType: "json",
			        success: function(result){
			        	if(result!=null){
			        		if(result.status==200){
								show_toastr = "success";
			        		}else{
								show_toastr = "error";
			        		}
			        		show_message = result.message;
			        	}
					},
					error : function() {
						//$.messager.alert('提示','获取失败，请联系管理员');
						show_toastr = "error";
						show_message ="获取失败，请联系管理员";
					}
			});
			toastr.clear();
			if(show_toastr=="success"){
				initTable();
				toastr.success(show_message);
			}else if(show_toastr=="error"){
				toastr.error(show_message);
			}
//		}
	}
	
	$("#confirmpromptModel").val("");
	$('#promptModel').modal('hide');
}

//共用提示弹框的 ×和取消 记录用户行为
function promptModelUserbehavior(th){
	var methodname = $("#methodname").val();
	if($(th).text()!=null && $(th).text()=="×"){
	    if(methodname=="baoteshu"){
	    	//用户行为监控-星标-关闭
	    	saveUserbehavior("A76");
		}
	}else if($(th).text()!=null && $(th).text()=="取消"){
        if(methodname=="baoteshu"){
        	//用户行为监控-星标-取消
        	saveUserbehavior("A78");
		}
	}
}

//加载打印患者信息打印单
function dayindividshow(id){
	if(is_print=='已关闭'){
		toastr.warning("打印功能未配置</br>注：可系统管理站中配置");
		return;
	}
	$("#dividfullname").html("");
	$("#dividgender").html("");
	$("#dividage").html("");
	$("#dividcategory").html("");
	$("#dividcardnum").html("");
	$("#dividHR").html("");
	$("#dividSPO2").html("");
	$("#dividR").html("");
	$("#dividBP").html("");
	$("#dividT").html("");
	$("#dividetCO2").html("");
	$("#dividgrade").html("");
	$("#dividpfyj1").html("");
	$("#dividdepart").html("");
	$("#dividnurse").html("");
	$("#bia").val("1");
	
	loadPatientBaseInfo(id)
	loadPatientSignInfo(id,"");
	loadPatientSymtpom(id,"");
	loadPatientHandle(id,"");
	loadPatientScore(id,"");
	
	dayinconfirm();
}

function loadPatientBaseInfo(id){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientById",
        data:{
       	 id:id
        },
        dataType: "json",
        async:false,
        success: function(result){
        	
        	if((result!=null)&&(result.status==200)){
       	 	    //基础参数赋值
        		var rows = result.rows;
        		$("#dividfullname").html(rows.fullname+'&nbsp;&nbsp;'+rows.cardnum);
        		$("#dividgender").html(rows.gender);
        		$("#dividage").html(rows.age);
        		//$("#dividcategory").html(rows.category);
        		//$("#dividcardnum").html(rows.cardnum);
				$("#imgcode1").JsBarcode(rows.cardnum, {
            				      displayValue: false
            				});
        	}
        },
        error: function(){
        }
    });
}

function loadPatientSignInfo(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSignById",
        data:{
       	 id:id,
       	 cixu:cixu
        },
        dataType: "json",
        async:false,
        success: function(result){
        	console.log(result)
        	if((result.rows!=null)&&(result.status==200)){
            	var rows = result.rows;
            	$("#dividHR").html(rows.mb);
            	$("#dividSPO2").html(rows.spo2);
            	$("#dividR").html(rows.hx);
            	$("#dividBP").html(rows.ssy+"/"+rows.szy);
            	$("#dividT").html(rows.tw);
            	$("#dividetCO2").html(rows.pcn);
            	
            	var grade_name ="4";
        		var beiz = "级（普通）";
        		var tiwen = parseFloat(rows.tw);
        		var ssy = parseInt(rows.ssy);
        		var spo2 = parseInt(rows.spo2);
        		var maibo = parseInt(rows.mb);
        		//①心率>180次/分或<40次/分②收缩压<80mmHg③SpO2 <80%④体温>41℃
        		if((maibo>180)||(maibo<40)||(ssy<80)||(spo2<80)||(tiwen>41.0)){
        			grade_name = "1";
        			beiz = "级(危急)";
        		}
        		//①心率150-180次/分或40-50次/分②收缩压>200mmHg③SpO2 80-90%
        		else if(((maibo>150)&&(maibo<=180))||((maibo>=40)&&(maibo<=50))||(ssy>200)||((ssy>70)&&(ssy<80))||((spo2>=80)&&(spo2<90))){
        			grade_name = "2";
        			beiz = "级(危重)";
        		}
        		//①心率100-150次/分或50-55次/分②收缩压180-200mmHg或80-90mmHg③SpO2 90-94%
        		else if(((maibo>100)&&(maibo<=150))||((maibo>50)&&(maibo<=55))||((ssy>=180)&&(ssy<=200))||((ssy>=80)&&(ssy<90))||((spo2>=90)&&(spo2<=94))){
        			grade_name = "3";
        			beiz = "级(紧急)";
        		}
        		//①心率55-100次/分②收缩压90-180mmHg③SpO2 >95%
        		else if(((maibo>=55)&&(maibo<=100))||((ssy>=90)&&(ssy<180))||(spo2>=95)){
        			grade_name = "4";
        			beiz = "级(普通)";
        		}
        		var grade = "100"+grade_name;
        		var str1= "生命体征评级"+grade_name+beiz;
        		
        		var strhtm = $("#dividpfyj1").html();
        		var bia = Number($("#bia").val());
        		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
        		strhtm+='</span><span class="pull-left">生命体征评级 ：';
        		strhtm+='<p>'+str1+'</span></p></span></li>';
       	 	    //$("#dividpfyj1").html(strhtm);
       	 	    //$("#bia").val(++bia);
        	}
        },
        error: function(){
        }
    });
}

function loadPatientSymtpom(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSymtpom",
        data:{
       	 id:id,
       	 cixu:cixu
        },
        dataType: "json",
        async:false,
        success: function(result){
        	
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
            	var strhtm = $("#dividpfyj1").html();
            	var bia = Number($("#bia").val());
            	strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
    			strhtm+='</span><span class="pull-left">快速分级 ：';
    			var names = "";
       	 		for(var i in rows){
       	 			var name = rows[i]["name"]+";";
       	 		    names+=name;
       	 		}
       	 	    strhtm+='<p>'+names+'</span></p></span></li>';
       	 	    //$("#dividpfyj1").html(strhtm);
       	 	    //$("#bia").val(++bia);
        	}
        },
        error: function(){
        }
    });
}

function loadPatientHandle(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientHandleId",
        data:{
       	 id:id,
       	 cixu:cixu
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
        	
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
        		var grade = "";
            	var strgrade = "";
            	if(rows.finalgrade!=null && rows.finalgrade!=""){
            		grade = rows.finalgrade;
            	}else if(rows.autograde!=null && rows.autograde!=""){
            		grade = rows.autograde;
            	}
            	if(grade!="" && grade.length>3){
            		strgrade += "分级：<span>"+grade.substring(3,4)+"级</span>";
            	}
            	$("#dividgrade").html(strgrade);
            	$("#dividdepart").html(rows.dividdepartmentname);
            	$("#dividnurse").html(rows.dividenurse);
        	}
        },
        error: function(){
        }
    });
}

function loadPatientScore(id,cixu){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientScore",
        data:{
       	 id:id,cixu:cixu
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
        	
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
            	var bia = Number($("#bia").val());
            	var strhtm = $("#dividpfyj1").html();
       	 		for(var i in rows){
       	 			var type = rows[i]["type"];
       	 			var score = rows[i]["score"];
       	 			if(type=="EDTS"){
		       	 		strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		        		strhtm+='</span><span class="pull-left">EDTS评分 ：';
		        		strhtm+='<p>'+score+'分</span></p></span></li>';
	           	 	    bia++;
	       	 		}
       	 			if(type=="PAIN"){
	       	 		    strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
	        		    strhtm+='</span><span class="pull-left">疼痛评分 ：';
	        		    strhtm+='<p>'+score+'分</span></p></span></li>';
	           	 	    bia++;
       	 			}
	       	 		if(type=="MEWS"){
			       	 	strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		        		strhtm+='</span><span class="pull-left">急诊预检分级分诊指标评估表评分 ：';
		        		strhtm+='<p>'+score+'分</span></p></span></li>';
	           	 	    bia++;
	       	 		}
		       	 	if(type=="FAST"){
			       	    strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
		        		strhtm+='</span><span class="pull-left">FAST评分 ：';
		        		strhtm+='<p>'+score+'</span></p></span></li>';
	           	 	    bia++;
	       	 		}
		       	    if(type=="CONSCIOUSNESS"){
	        			strhtm+='<li class="clearfix"><span class="pull-left">'+bia;
	            		strhtm+='</span><span class="pull-left">意识昏迷 ：';
	            		strhtm+='<p>意识状态:昏迷 1级</span></p></span></li>';
	           	 	    bia++;
	       	 		}
       	 		}
       	 	    $("#dividpfyj1").html(strhtm);
        	}
        },
        error: function(){
        }
    });
}
var go_rct_id='';
function aa(row){
	if(row.go_rct=='1'){
		$.messager
				.alert(
						' ',
						'<font size=\"4\" color=\"#666666\"><strong>患者已分入抢救室！</strong></font>',
						'infoSunnyIcon', function() {
						});
		setTimeout(function() {
			$(".messager-body").window('close');
		}, 2000); 
	}else{
		var grade = "";
//		var auto = row.autograde;
//		var autoname = row.autoname;
//		var final = row.finalgrade;
		if(row.finalgrade==null||row.finalgrade==""){
			grade = row.autograde;
		}else{
			grade = row.finalgrade;
		}
		if(grade=='1003' || grade=='1004'){
			$('#go_rct1').modal(); 
			go_rct_id=row.id;
		}
	}
}
function okGoRct(){
	$.ajax({
        type: "post",
        url: "#path()/divid/updateGoRct",
        data:{
       	 id:go_rct_id
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
        	
        	if((result!=null)&&(result.status==200)){
        		$('#go_rct1').modal('hide'); 
        		$('#divid-patients').bootstrapTable('refresh');
        	}
        },
        error: function(){
        }
    });
	
}
/*function aa(){
	$.ajax({
        type: "post",
        url: "#path()/index/queryRoomList",
        data:{
       	 
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
        	
        	
        },
        error: function(){
        }
    });
	
}
function bb(){
	$.ajax({
        type: "post",
        url: "#path()/index/queryRoomWaitList",
        data:{
        	room_id:1001
        },
        dataType: "json",
        async:false,
        success: function(result){
       	 	//基础参数赋值
        	
        	
        },
        error: function(){
        }
    });
	
}*/