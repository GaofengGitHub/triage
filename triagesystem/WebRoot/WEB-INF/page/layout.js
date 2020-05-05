$(document).ready(function() {
	if('#userName()'=='超级管理员'){
		$('#superadminmgmt').show();
	} 
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
			  "timeOut": "2500",
			  "extendedTimeOut": "1000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut",
			  "newestOnTop": true
	};

});

function showtime(){
	var d = new Date();
	var str = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
	var minutes;
	if(d.getMinutes()<10){
		minutes="0"+d.getMinutes();
	}else{
		minutes=d.getMinutes();
	}
	var time = d.getHours()+':'+minutes;
	$('.date').text(str);
	$('.time').text(time);
	setTimeout(showtime,60000);
}

/*根据出生日期算出年龄*/
function jsGetAge(age,strBirthday){
	if((age!='')&&(age!=null)){
		return age;
	}
	if(strBirthday == ''||strBirthday==null){
		return '';
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

