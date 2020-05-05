$(function(){
	
	
	
    $('#p23').find(':input').labelauty({class:'labelauty','same_width':true,icon: false});
    $('#p22').find(':input').labelauty({class:'labelauty','same_width':true,icon: false});
     			
    $('#p32').find(':input').labelauty({class:'labelauty','same_width':true,icon: false});
    $('#manualPanel').find(':input').labelauty({class:'labelauty','same_width':true,icon: false});
 	$('#tiwen').on('click',easyPanel('tiwen'));
	$('#maibo').on('click',easyPanel('maibo'));
	$('#huxi').on('click',easyPanel('huxi'));
	$('#tizhong').on('click',easyPanel('tizhong'));
	$('#shuzhangya').on('click',easyPanel('shuzhangya'));
	$('#shousuoya').on('click',easyPanel('shousuoya'));
	$('#xueyang').on('click',easyPanel('xueyang'));
	$('#pain').on('click',easyPanel('pain'));
	$('#poc').on('click',easyPanel('poc'));
	$('#etco2').on('click',easyPanel('etco2'));
	
	$('#idPanel').on('mouseup',function(e) {
		$('#idPanel').mLoading('hide');
	 });

	$('#idPanel').on('change','input',function(e) {
		paramUpdate($('#patientId').val(),$(this).attr('id'),$(this).val());
	 });
	$('#idPanel').on('change','select',function(e) {
		paramUpdate($('#patientId').val(),$(this).attr('id'),$(this).val());
	 });
	$('#idPanel').on('change','textarea',function(e) {
		paramUpdate($('#patientId').val(),$(this).attr('id'),$(this).val());
	 });
	
	$('#vitalMonitor').on('change','input',function(e) {
		monitorUpdate($('#patientId').val(),$(this).attr('id'),$(this).val());
	 });
	$('#vitalMonitor').on('change','select',function(e) {
		monitorUpdate($('#patientId').val(),$(this).attr('id'),$(this).val());
	 });
	

	$('#manualPanel').on('change','select',function(e) {
		manualDividUpdate($('#patientId').val(),$(this).attr('id'),$(this).val());
	 });
	$('#manualPanel').on('change','textarea',function(e) {
		manualDividUpdate($('#patientId').val(),$(this).attr('id'),$(this).val());
	 });
	
	$('#manualPanel').on('click','input[type=radio]',function(e) {
		manualDividUpdate($('#patientId').val(),$(this).attr('name'),$("input[name='manualGrade']:checked").val());
	});
	
	var patientIdLoad = '#(patientId)';
	if(patientIdLoad == ''){
		$('#idScan').on('click',function(e) {
			$('#idPanel').mLoading({
			    text:"请放置身份证扫描。。。"
			});
			//调用身份证接口
			 $.ajax({
		         type: "post",
		         url: "#path()/divid/idCardRead",
		         timeout:14000, 
		         data:{
		        	 jzNum:'#(jzNum)'
		         },
		         dataType: "json",
		         success: function(result){
		        	 //填入信息
		        	 $("#fullname").val(result.fullname);
		        	 $("#idnum").val(result.idNum);
		        	 $("#address").val(result.address);
		        	 $("#gender").val(result.gender);
		        	 $("#patientId").val(result.id);
		        	 
		        	 laydate.render({
		        		 elem:'#borndate',
		        		 value:moment(result.borndate, "YYYYMMDD").format('YYYY-MM-DD')
		        	 }); 
		        	 laydate.render({
		        		 elem:'#reachtime',
		        		 value:new Date(),
		        		 type: 'time',
		        		 format: '今天H时m分'
		        	}); 
		        	 
		        	 if(result.fullname != undefined){
		        		 $('#idPanel').mLoading('hide');
		        	 }
		        	 
		        	 //将其他字段置空
		        	 $("#source").val();
		        	 $("#category").val();
		         },
		         error: function(){
		        	 $('#idPanel').mLoading({
		 			    text:"扫描超时,请重新放置身份证。。。"
		 			});
		        	 window.setTimeout("$('#idPanel').mLoading('hide')",1000);
		         }
		     });
		 });
		
		$('#idPanel').on('mouseup',function(e) {
			$('#idPanel').mLoading('hide');
		});
		
		laydate.render({
		   elem: '#reachtime',
		   value:new Date(),
		   type: 'time',
		   format: '今天H时m分',
		   done: function(value, date){
			   if($('#patientId').val() == ''){
				   $('#reachtime').val('');
			   }else{
				   paramUpdate($('#patientId').val(),'reachtime',moment([date.year,date.month-1,date.date,date.hours,date.minutes,date.seconds]).format('YYYY-MM-DD HH:mm:ss'));
			   }
		  }
		});
		 laydate.render({
		   elem: '#borndate', 
		   value: '1965-01-01',
		   done: function(value, date){
			   $('#ageStr').html(jsGetAge(value)+'岁');
			   paramUpdate($('#patientId').val(),'borndate',value);
			}
		 });
	}else{
		 laydate.render({
			   elem: '#borndate', //指定元素
			   done: function(value, date){
				   $('#ageStr').html(jsGetAge(value)+'岁');
				   paramUpdate($('#patientId').val(),'borndate',value);
				}
		 });
		 laydate.render({
		   elem: '#reachtime',//指定元素
		   type: 'datetime',
		   format: 'MM月dd日 HH时mm分',
		   done: function(value, date){
			   paramUpdate($('#patientId').val(),'reachtime',moment([date.year,date.month-1,date.date,date.hours,date.minutes,date.seconds]).format('YYYY-MM-DD HH:mm:ss'));
		   }
		 });
		 //删除读取身份证按钮
		 $('#allScan').remove();
		$('#ageStr').html(jsGetAge($('#borndate').val())+'岁');
		loadPatientBasis(patientIdLoad);
	}
	
	$('#infoPrint').on('click',function(e) {
		//打印腕带
		 $.ajax({
	         type: "post",
	         url: "#path()/divid/infoPrint",
	         data:{
	        	 jzNum:'#(jzNum)'
	         },
	         dataType: "json",
	         success: function(result){
	        	
	         },
	         error: function(){
	         }
	     });
	 });
	
	 //加载大分类
	 $.ajax({
         type: "post",
         url: "#path()/symptom/sort4Page",
         data:{
         },
         dataType: "json",
         success: function(result){
        	for(var i = 0; i<result.length; i++){
        		 var sortObj = result[i];
        		 $("#p21").children("ul").append("<li><input "+sortObj.checked+" type='radio' name='sort1' data-labelauty='"+sortObj.name+"' value='"+sortObj.id+"'></li>");
        	}
        	 $('#p21').find(':input').labelauty({class:'labelauty','same_width':true,icon: false});
        	 
        	 //加载常用症状小类
        	 sort2Load('101');
        	 itemLoad('102');
        	 
        	 $('#p21').on("click","input", function(){
        		 if($(this).is(':checked')) {
        			 if($(this).val() == '101'){
        				 sort2Load('101');
        	        	 itemLoad('102');
        			 }else{
        				 sort2Load($(this).val());
        			 }
        		 } 
        	 });
         },
         error: function(){
         }
     });
	
	 $('#dividConfirm').on('click',function(e) {
		 if(dividConfirm()){
			 window.location.href='#path()/divid/dividReport?id='+$('#patientId').val();
		 }else{
			 return false;
		 }
	 });
	 
	 var queryStr = '';
	 $('#fastQuery').keyup(function(){
		 var nowStr = $(this).val();
		 if(nowStr != queryStr){
			 queryStr = nowStr;
			 itemLoadParams(queryStr);
		 }
	});
	 
	$('#allForm').on("change","input,select,textarea", function(){
		if(!Validator.validateOne(this)){
			return false;
		}
	});

});
