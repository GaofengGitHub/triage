function pageload(){
	
	//配置弹窗 3000 1000
	toastr.options = {
			  "preventDuplicates": true,
			  "preventOpenDuplicates": true,
			  "maxOpened":0,
			  "closeButton": true,
			  "debug": false,
			  "positionClass": "toast-center-center",
			  "onclick": null,
			  "showDuration": "300",
			  "hideDuration": "100",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut",
			  "newestOnTop": true
			};
	
	
	//日期控件
	laydate.render({
		  elem: '#bornday' ,//指定元素
		  max:0,
		  done: function(value, date, endDate){
			    var age = jsGetAge('',value);
			    $("#age").val(age);
			}
	});
	
 	$('#tiwen').on('click',easyPanel('tiwen'));
	$('#maibo').on('click',easyPanel('maibo'));
	$('#huxi').on('click',easyPanel('huxi'));
	$('#tz').on('click',easyPanel('tz'));
	$('#shuzhangya').on('click',easyPanel('shuzhangya'));
	$('#shousuoya').on('click',easyPanel('shousuoya'));
	$('#spo2').on('click',easyPanel('spo2'));
	//显示科室
	showDepart();
	

	//下面的评分隐藏
	//$('#last_score_div').hide();
	
	//非新增加载暂存数据
	var id = '#(id)';
	if(id!=""){
		loadPatientBaseInfo(id);
		loadPatientSignInfo(id);
		loadPatientHandle(id);
		loadPatientSymtpom(id);
		loadPatientSymtpomByType(id);
	}
	//显示评级方式 
	showPjfs();
	//快速分级默认显示第一级
	getSymptom("0","1");
	
	$("button[name='lyfs']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	
	$("button[name='source']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	
	
	$("#note").bind("click",function(){ 
		$("#note").hide();
		$("#hljl").focus();
	});
	
	
	$("button[name='lstd']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	}); 
	$("button[name='others']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	}); 
	$("button[name='consciousness']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active');
		}
	}); 
	$("button[name='anamnesis']").bind("click",function(){ 
		if($(this).is('.active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	});
	//添加验证
	$("#fullname,#cardnum,#tel,#memberstel,#sg,#tz,#huxi,#tiwen,#maibo,#shuzhangya,#shousuoya,#spo2").bind('blur', function() {
		validate();
	});
	$("#fullname,#cardnum,#sg,#tz,#huxi,#tiwen,#maibo,#shuzhangya,#shousuoya,#spo2").bind('input propertychange', function() {
		validate();
	});
	
}

//点击去除评分
function clearGrade(btn){
	var type_x = $(btn).attr("id");
	
	if(type_x=='mews_x'){
		$("#mews_a li").removeClass('active');
		$("#mews_b li").removeClass('active');
		$(".mews_score_A").text("0");
		$(".mews_score_B").text("0");
		$("#mewsgrade").val("");
	}
	if(type_x=='edts_x'){
		$("#pf_b li").removeClass('active');
		$("#pf_c li").removeClass('active');
		$(".Score_B").text("0");
		$(".Score_C").text("15");
		$("#mewsgrade").val("");
	}
}


//获取 评级方式按钮 确认 默认显示 主要评级方式
function showPjfs(){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPjfs",
        data:{
        },
        dataType: "json",
        success: function(result){
        	if(result!=null){
        		//console.log(result);
        		if(result.status==200){
        			var rows = result.rows;
        			$(".gradingWay").html("");
            		var str ="" ;
           	 		for(var i in rows){
           	 			var name = rows[i]["right_name"];
           	 			var right_type = rows[i]["right_type"];
           	 			if(right_type==2){
           	 				str += "<button class='btn btn-rate' onclick='active4(this)'>"
           	 				str+= name;
           	 				str+= "</button>";
           	 			}
           	 			//显示主要评分方式
           	 			if(right_type==1){
           	 				$('#panel-header').text(name);
           	 				$("#defultpjfsname").val(name);
           	 				if(name=='快速分级'){
           	 					//显示快速分级
           	 					$('#quickgrade').show();
           	 					$('#defultpjfs').val("quickgrade");
           	 				}else if(name=='EDTS评分'){
           	 					$('#quickpf').show();
           	 					$('#last_score_div').show();
           	 					$('#defultpjfs').val("quickpf");
           	 					getTotalScore();
           	 				}else if(name=='MEWS评分'){
           	 					$('#mewspf').show();
           	 					$('#defultpjfs').val("mewspf");
           	 				}else{
           	 					$('#default').show();
           	 					$('#defultpjfs').val("default");
           	 				}
           	 			}
           	 		}
            		$(".gradingWay").html(str);
        		}
        	}
        },
        error: function(){
        }
    });
}

function getSymptom(pid,level){
	$.ajax({
        type: "post",
        url: "#path()/divid/getSymptom",
        data:{
       	 pid:pid,
       	 level:level
        },
        dataType: "json",
        success: function(result){
        	if(result!=null){
        		//console.log(result);
        		if(result.status==200){
        			$("#level").html("");
        			var str = "";
       	 			var list = result.rows;
       	 			for(var i in list){
       	 				var name = list[i]["name"].trim();
       	 				var xxx = list[i]["id"];
       	 				var grade = list[i]["grade"];
       	 				str+="<li onclick='showSymptom(\""+xxx+"\",\"" + name + "\","+level+",\""+grade+"\")'>"+name+"</li>"
       	 			}
       	 			$("#level").html(str);
        		}
        	}
        },
        error: function(){
        }
    });
}



function active1(level){
	
	if(level==1){
		getSymptom("0","1");
		$("#lv"+level).addClass('active').siblings().removeClass('active');
	}
	if(level==2){
		pid = $("#level_1_id").val();
		if(pid==""){
			toastr.warning("请先选择分类");
			return; 
		}else{
			getSymptom(pid,"2");
			$("#lv"+level).addClass('active').siblings().removeClass('active');
		}
		
	}
	if(level==3){
		ppid = $("#level_1_id").val();
		pid = $("#level_2_id").val();
		if(ppid==""){
			toastr.warning("请先选择分类");
			return; 
		}else if(pid==""){
			toastr.warning("请先选择主诉");
			return; 
		}else{
			getSymptom(pid,"3");
			$("#lv"+level).addClass('active').siblings().removeClass('active');
		}
		
	}
	
}
function active2(grade){
	var value = $(grade).attr("value");
	
	var g = value.substring(value.length-1,value.length);
	var id = $(grade).attr("id");
	//模拟失去焦点，为了解决 button 自带的 焦点样式
	$(grade).blur();
	if(id=="g1"){
	}else if(id=="g2"){
		//组装样式名称
		var css = 'btn-'+g+'-selected';
		if($(grade).is('.'+css)){
			$(grade).removeClass(css);
			$("#finalgrade").val('');
			return;
		}
		for(var i=1;i<6;i++){
			if(g!=i){
				$("#g2[value =\""+"100"+i+"\"]").removeClass('btn-'+i+'-selected');
			}else{
				$("#g2[value =\""+value+"\"]").addClass(css);
			}
		}
		$("#finalgrade").val(value);
	}
}

function active3(dept){
	$("#depart_line span").removeClass('text-info');
	$(dept).addClass('text-info');
	var t_id = $(dept).attr("id");
	$("#deptment").val(t_id);
	
}

function active4(btn){
	
	//评级方式按钮点击效果
	if($(btn).is('.active')){
		$(btn).removeClass('active');
		//显示默认评级
		var defult = $('#defultpjfs').val();
		//alert(defult);
		$("#"+defult).show().siblings().hide();
		$('#panel-header').text($("#defultpjfsname").val());
	}else{
		$(btn).addClass('active').siblings().removeClass('active');
		var name = $(btn).text();
		$('#panel-header').text(name);
		if(name=='快速分级'){
			//显示快速分级
			$('#quickgrade').show().siblings().hide();
		}else if(name=='EDTS评分'){
			$('#quickpf').show().siblings().hide();
			$('#last_score_div').show();
			getTotalScore();
		}else if(name=='MEWS评分'){
			$('#mewspf').show().siblings().hide();
		}else{
			$('#default').show().siblings().hide();
		}
	}
}

//选择快速分级 后显示等级
function showSymptom(pid,name,level,grade){
	
	if(level!=""&&level!=3){
		getSymptom(pid,level+1);
	}
	if(level==1){
		
		$("#level_1_id").val(pid);
		$("#level_1_name").val(name);
		active1(2);
	}
	if(level==2){
		
		$("#level_2_id").val(pid);
		$("#level_2_name").val(name);
		active1(3);
	}
	if(level==3){
		$("#level_3_id").val(pid);
		$("#level_3_name").val(name);
		
		var str = "<div class=\"alert alert-dismissable\">";
			str+= "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+pid+"\">×</button>"
			str+= $("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name;
		    str+= "</div>";
		    var html = $("#symptom").html();
		    html = html +str;
		    $("#symptom").html(html);
		    var old = $("#autograde").val();
		    if(old==""||old>grade){
		    	$("#autograde").val(grade);
		    	 var g = grade.substring(grade.length-1,grade.length);
				    var grade_css = 'btn-'+g+'-selected';
				    for(var i=1;i<6;i++){
						if(g!=i){
							$("#g1[value =\""+"100"+i+"\"]").removeClass("btn-"+i).addClass("btn-5");
						}else{
							$("#g1[value =\""+"100"+i+"\"]").removeClass("btn-5");
					    	$("#g1[value =\""+"100"+i+"\"]").addClass("btn-"+i);
					    	$("#g1[value =\""+"100"+i+"\"]").addClass(grade_css);
						}
					}
		    }
	}
}

function loadPatientBaseInfo(id){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientById",
        data:{
       	 id:id
        },
        dataType: "json",
        success: function(result){
        	if((result!=null)&&(result.status==200)){
       	 	//基础参数赋值
        		var rows = result.rows;
        		
        		$("#id").val(id);
        		$("#fullname").val(rows.fullname);
        		$("#cardnum").val(rows.cardnum);
        		$("#bornday").val(rows.bornday);
        	
        		$("input[name='gender'][value="+rows.gender+"]").attr("checked",true);
        	
        		$("#age").val(rows.age);
        		$("#tel").val(rows.tel);
        		$("#memberstel").val(rows.memberstel);
        	
        		$("#category").val(rows.category);
        		$("button[name='source'][value="+rows.source+"]").addClass("active");
        		$("button[name='lyfs'][value="+rows.admission+"]").addClass("active");
        		$("button[name='lstd'][value="+rows.greenchannel+"]").addClass("active");
        		$("button[name='others'][value="+rows.others+"]").addClass("active");
        		$("button[name='consciousness'][value="+rows.consciousness+"]").addClass("active");
        		var a = rows.anamnesis;
        		if(a!=null&&a!=""){
        			var strs= new Array(); //定义一数组 
        			strs=a.split(","); //字符分割 
        			for (var i=0;i<strs.length ;i++ ) 
        			{ 
        				$("button[name='anamnesis'][value='"+strs[i]+"']").addClass("active");
        			} 
        		}
        	}
        },
        error: function(){
        }
    });
}


function loadPatientSignInfo(id){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSignById",
        data:{
       	 id:id
        },
        dataType: "json",
        success: function(result){
        	if((result.rows!=null)&&(result.status==200)){
            	var rows = result.rows;
        		$("#sighid").val(rows.id);
        		$("#sg").val(rows.sg);
        		$("#tz").val(rows.tz);
        		$("#huxi").val(rows.hx);
        		$("#tiwen").val(rows.tw);
        		$("#maibo").val(rows.mb);
        		$("#shuzhangya").val(rows.szy);
        		$("#shousuoya").val(rows.ssy);
        		$("#spo2").val(rows.spo2);
        		$("#pcn").val(rows.pcn);
        		$("#il6").val(rows.il6);
        		$("#crp").val(rows.crp);
        		$("#cea").val(rows.cea);
        		$("#afp").val(rows.afp);
        		$("#myo").val(rows.myo);
        		$("#ddimer").val(rows.ddimer);
        		$("#fer").val(rows.fer);
        		$("#ntprobnp").val(rows.ntprobnp);
        		$("#hsctnl").val(rows.hsctnl);
        		$("#ckmb").val(rows.ckmb);
        		$("#hsctnl").val(rows.hsctnl);
        		$("#ctnt").val(rows.ctnt);
        		$("#ca").val(rows.ca);
            
        	}
       	 
       	
        },
        error: function(){
        }
    });
}


function loadPatientHandle(id){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientHandleId",
        data:{
       	 id:id
        },
        dataType: "json",
        sync:false,
        success: function(result){
       	 	//基础参数赋值
        
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
        		
        		
        		$("#handleid").val(rows.id);
        		$("#autograde").val(rows.autograde);
        		$("#finalgrade").val(rows.finalgrade);
        		$("#deptment").val(rows.dividdepartment);
        		$('#changereason').combobox("setValue", rows.changereason);
        		document.getElementById('note').style.display='none';
        		$("#hljl").val(rows.hljl);
        		
        		
        		//$("#a").trigger("click");
        		if((rows.autograde!=null)&&(rows.autograde!="")){
        			var auto = rows.autograde.substring(rows.autograde.length-1,rows.autograde.length);
        			for(var i=1;i<6;i++){
        				if(auto!=i){
        					$("#g1[value =\""+"100"+i+"\"]").removeClass("btn-"+i).addClass("unused-btn");
        				}else{
        					$("#g1[value =\""+"100"+i+"\"]").addClass("btn-"+i+"-selected");
        				}
        			}
        		}
        		if((rows.finalgrade!=null)&&(rows.finalgrade!="")){
        			var fian = rows.finalgrade.substring(rows.finalgrade.length-1,rows.finalgrade.length);        			
        			$("#g2[value =\""+rows.finalgrade+"\"]").addClass("btn-"+fian+"-selected");
        		}
        	
        		if(rows.dividdepartment!=""){
        			$("span[id =\""+rows.dividdepartment+"\"]").addClass('text-info');
        		}
        	}
        },
        error: function(){
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
            	
            	$("#depart").html("");
            	var str ="";
            	
       	 		for(var i in rows){
       	 			var td_id = rows[i]["td_id"];
       	 			var name = rows[i]["td_name"];
       	 			//6个换一行 第一个不用结尾
       	 			if((i%6==0)&&(i!=0)){
       	 				str+='</li>';
       	 			}
       	 			if(i%6==0){
       	 				str+='<li id="depart_line">';
       	 			}
       	 			str +='<span onclick="active3(this)" id="';
       	 			str += td_id;
       	 			str += '">';
       	 			str +='<i class="fa fa-gittip"></i>';
       	 			str += name;
       	 			str +='</span>';
       	 		}
       	 	str+='</li>';
       	 	$("#depart").html(str);
            
        	}
        },
        error: function () {
        	alert("获取失败，请联系管理员");
        }
    });
}

function loadPatientSymtpom(id){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSymtpom",
        data:{
       	 id:id
        },
        dataType: "json",
        success: function(result){
        	//console.log(result);
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
        		
        		var str = $("#symptom").html();
       	 		for(var i in rows){
       	 			var name = rows[i]["name"];
       	 			var id = rows[i]["id"];
       	 			str += "<div class=\"alert alert-dismissable\">"
       				str+= "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+id+"\">×</button>"
       				str+= name;
       			    str+= "</div>";
       	 		
       	 		}
       	 		$("#symptom").html(str);
        	}
        },
        error: function(){
        }
    });
}

function loadPatientSymtpomByType(id){
	$.ajax({
        type: "post",
        url: "#path()/divid/queryPatientSymtpomByType",
        data:{
       	 id:id
        },
        dataType: "json",
        success: function(result){
       	 	//基础参数赋值
        	//console.log(result);
        	if((result!=null)&&(result.status==200)){
            	var rows = result.rows;
        		
       	 		for(var i in rows){
       	 			var symptom_id = rows[i]["symptom_id"];
       	 			var symptom_type = rows[i]["symptom_type"];
       	 			if(symptom_type=="EDTS"){
       	 				//模拟点击 触发算分
       	 				$("#"+symptom_id).trigger("click");
       	 			}
       	 			if(symptom_type=="MEWS"){
       	 				//模拟点击 触发算分
       	 				$("#"+symptom_id).trigger("click");
       	 			}
       	 		}
        	}
        },
        error: function(){
        }
    });
}


function readCard(){
	$("#fullname").val("张小阳");
	$("#cardnum").val("321121198701023932");
	$("#bornday").val("1989-07-15");
	$("input[name='gender'][value='男'").attr("checked",true);
	$("#age").val(jsGetAge('',"1989-07-15"));
	$("#tel").val("");
	$("#memberstel").val("");
	
	//调用身份证接口 暂时 注销
	/*
	 $.ajax({
        type: "post",
        url: "#path()/divid/idCardRead",
        timeout:14000, 
        data:{
       	 id:'#(id)'
        },
        dataType: "json",
        success: function(result){
       	 //填入信息
       	 $("#fullname").val(result.fullname);
       	 $("#cardnum").val(result.idNum);
       	 $("#address").val(result.address);
       	 $("#gender").val(result.gender);
       	 $("#patientId").val(result.id);
       	 
       	
        },
        error: function(){
       	 
        }
    });
	*/
	getTotalScore();
}

function readMach(){
	$("#sg").val("172");
	$("#tz").val("70");
	$("#huxi").val("67");
	$("#tiwen").val("37.9");
	$("#maibo").val("90");
	$("#shuzhangya").val("120");
	$("#shousuoya").val("135");
	$("#spo2").val("13");
	$("#pcn").val("4");
	$("#il6").val("6");
	$("#crp").val("2");
	$("#cea").val("5");
	$("#afp").val("23");
	$("#myo").val("8");
	$("#ddimer").val("9");
	$("#fer").val("1");
	$("#ntprobnp").val("23");
	$("#hsctnl").val("231");
	$("#ckmb").val("21");
	$("#hsctnl").val("13");
	$("#ctnt").val("3");
	$("#ca").val("4");
	getTotalScore();
	getMewsScore();
}



function easyPanel(inputId) {
	var datas = [];
	if(inputId == 'tiwen'){
		 datas = [
				'36.0','36.1','36.2','36.3','36.4','36.5','36.6','36.7','36.8','36.9',
				'37.0','37.1','37.2','37.3','37.4','37.5','37.6','37.7','37.8','37.9',
				'38.0','38.1','38.2','38.3','38.4','38.5','38.6','38.7','38.8','38.9',
				'39.0','39.1','39.2','39.3','39.4','39.5','39.6','39.7','39.8','39.9'
			];
	}else if(inputId == 'maibo'){
		 datas = [
	            	'10','15','20','25','30','35','40','45','50','55',
	            	'60','61','62','63','64','65','66','67','68','69',
	            	'70','71','72','73','74','75','76','77','78','79',
	            	'80','81','82','83','84','85','86','87','88','89',
	            	'90','91','92','93','94','95','96','97','98','99',
	            	'100','101','102','103','104','105','106','107','108','109',
	            	'110','111','112','113','114','115','116','117','118','119',
	            	'120','125','130','135','140','145','150','155','160','165',
	            	'170','175','180','185','190','200','205','210','215','220',
	            	'230','240','250','260','270','280','290','300','310','320'];
	}else if(inputId == 'huxi'){
		 datas = [
					'1','2','3','4','5','6','7','8','9','10',
					'11','12','13','14','15','16','17','18','19','20',
					'21','22','23','24','25','26','27','28','29','30',
					'31','32','33','34','35','36','37','38','39','40',
					'41','42','43','44','45','46','47','48','49','50',
					'51','52','53','54','55','56','57','58','59','60'
				];
	}else if(inputId == 'tz'){
		 datas = [
					'1','2','3','4','5','6','7','8','9','10',
					'11','12','13','14','15','16','17','18','19','20',
					'21','22','23','24','25','26','27','28','29','30',
					'31','32','33','34','35','36','37','38','39','40',
					'41','42','43','44','45','46','47','48','49','50',
					'51','52','53','54','55','56','57','58','59','60',
					'61','62','63','64','65','66','67','68','69','70',
					'71','72','73','74','75','76','77','78','79','80',
					'81','82','83','84','85','86','87','88','89','90',
					'91','92','93','94','95','96','97','98','99','100',
					'110','120','130','140','150','160','170','180','190','200'
				];
	}else if(inputId == 'shousuoya'){
		 datas = [
		          '80','81','82','83','84','85','86','87','88','89',
		          '90','91','92','93','94','95','96','97','98','99',
		          '100','101','102','103','104','105','106','107','108','109',
		          '110','111','112','113','114','115','116','117','118','119',
		          '120','121','122','123','124','125','126','127','128','129',
		          '130','131','132','133','134','135','136','137','138','139',
		          '140','141','142','143','144','145','146','147','148','149',
		          '150','155','160','165','170','175','180','185','190','195',
		          '200','205','210','215','220','225','230','235','240','245',
		          '250','255','260','265','270','275','280','285','290','295'
				];
	}else if(inputId == 'shuzhangya'){
		 datas = [
			'10','11','12','13','14','15','16','17','18','19',
			'20','21','22','23','24','25','26','27','28','29',
			'30','31','32','33','34','35','36','37','38','39',
			'40','41','42','43','44','45','46','47','48','49',
			'50','51','52','53','54','55','56','57','58','59',
			'60','61','62','63','64','65','66','67','68','69',
			'70','71','72','73','74','75','76','77','78','79',
			'80','81','82','83','84','85','86','87','88','89',
			'90','91','92','93','94','95','96','97','98','99',
			'100','101','102','103','104','105','106','107','108','109',
			'110','111','112','113','114','115','116','117','118','119'
				];
	}else if(inputId == 'spo2'){
		 datas = [
					'10','11','12','13','14','15','16','17','18','19',
					'20','21','22','23','24','25','26','27','28','29',
					'30','31','32','33','34','35','36','37','38','39',
					'40','41','42','43','44','45','46','47','48','49',
					'50','51','52','53','54','55','56','57','58','59',
					'60','61','62','63','64','65','66','67','68','69',
					'70','71','72','73','74','75','76','77','78','79',
					'80','81','82','83','84','85','86','87','88','89',
					'90','91','92','93','94','95','96','97','98','99'
		
		];
	}

	new Vcity.CitySelector({input:inputId},datas);
	
	//Vcity._m.on(document, 'click', function (event) {
	//	
	//});

};
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

function getMin(a,b,c){
	return a<b?(a<c?a:c):(b<c?b:c);
}