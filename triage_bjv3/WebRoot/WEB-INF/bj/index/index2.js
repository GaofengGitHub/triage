
//时间选择
function dataPick(){
	var date = new Date();
	var nowTime = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"+"  "+date.getHours()+":"+date.getMinutes();
	$("#dataPicker").datetimepicker({
		forceParse: 0,
		language: 'zh-CN',
		format: 'yyyy年mm月dd日 hh:ii',
		minView: "month",
		initalDate: new Date(),
		autoclose: true,
		todayBtn: true,
	})
	$("#dataPicker").val(nowTime);
}
dataPick();
//接诊弹窗
$(".tabcontain").on("click",".jiezhen",function(){
	$(".yijiezhenWindow").show();
})
//报特殊弹窗
var infoId = "";
var cardNum = "";
$(".tabcontain").on("click",".specialIcon",function(){
	$(".specialWindow").show();
	infoId = $(this).attr("id");
	cardNum = $(this).find("input").attr("id");
})
$(".typeItem").click(function(){
	$(this).addClass('addclass').siblings().removeClass('addclass');
})
//关闭弹窗
$(".specialClose").click(function(){
	$(this).parent().parent().hide();
	
})
function getPatientList(){
	$.ajax({
	    type: "POST",
	    url: '#path()/index/seachPatient2',
	    data: {
	    	rows: 10,   //页面大小
	        page: 1,   //页码
	        //修复错误的查询条件，liuxj20181010
	        status:'未接诊'
	        },
	    dataType: "json",
	    success: function (res) {
	        console.log("res", res);
	        let data = res.rows;
	        console.log("data",data);
	      	// $(".tabcontain").empty();
            forPatientInfo(data);
	    }
	})
}
getPatientList();
function forPatientInfo(rows) {
     if(rows==""){
         var html = `<div style="text-align:center;font-size:20px">暂无数据</div>`
         $('.tabcontain').append(html);
     }else{
    	 var grade = "";
    	 var name = "" ;
    	 var strhtml = '';
    	 var username = "";
    	 var special = "";
         for (var i = 0; i < rows.length; i++) {
        	 if(rows[i].finalgrade==null||rows[i].finalgrade==""){
				grade = rows[i].autograde;
				name = rows[i].autoname;
			}else{
				grade = rows[i].finalgrade;
				name = rows[i].finalname;
			}
        	//特殊 名字
         	if(rows[i].teshu ==null ||rows[i].teshu ==''){
         		special = "<span title='报特殊' class='specialIcon' id='"+rows[i].id+"'><input type='hidden' id='"+rows[i].cardnum+"'/><img alt='' src='#path()/static/vendor/newpage/images/home/fzHome_special_unwrite.png' /></span>";
         	}else{
         		special = "<span title='报特殊' class='specialIcon' id='"+rows[i].id+"'><input type='hidden' id='"+rows[i].cardnum+"'/><img alt='' src='#path()/static/vendor/newpage/images/home/fzHome_special_write.png' /></span>";
         	}
         	if(rows[i].fullname=='无名氏'){
         		username = rows[i].id;
         	}else{
         		username= rows[i].fullname;
         	}
        	//判断分级
			if(!(grade==null||grade=="")){
				grade = grade.substring(grade.length-1,grade.length);
			}
        	console.log("grade",grade,name);
        	if(rows[i].finalgrade !=''){
        		strhtml = "<span class='editTxt'>改</span>"
	    	}else{
	    		strhtml="<span class='editTxt1'>"+"&nbsp;&nbsp;&nbsp;"+"</span>";
	    	}
        	switch(grade)
			{
			 case '1':
			    	strhtml+='<span class="Level1 levelStyle">'+name+'级</span>';
			        break;
			    case '2':
			    	strhtml+='<span class="Level2 levelStyle">'+name+'级</span>';
			        break;
			    case '3':
			    	strhtml+='<span class="Level3 levelStyle">'+name+'级</span>';
			        break;
			    case '4':
			    	strhtml+='<span class="Level4 levelStyle">'+name+'级</span>';
			        break;
			    case '5':
			    	strhtml+='<span class="Level5 levelStyle">'+name+'级</span>';
			        break;
			    default:
			    	strhtml+='<span class="Level0 levelStyle">x</span>';
			}
			strhtml+= '</span>';             
			// 年龄
			var userAge = "" ;
			if(rows[i].age==''||rows[i].age==null){
        		if(rows[i].bornday == ''){
        			userAge='0天';
        		}
        	}else{
        		userAge = rows[i].age;
        	}
			//性别
			var userGender = '';
        	if(rows[i].gender = '男'){
        		userGender= '<img class="man" alt="" src="#path()/static/vendor/newpage/images/home/fzHome_man.png" />';
        	}else if(rows[i].gender = '女'){
        		userGender= '<img class="man" alt="" src="#path()/static/vendor/newpage/images/home/fzHome_woman.png" />';
        	}
			//患者状态
			var userStatus = "";
			if(rows[i].status == "未接诊"){
				userStatus = "<span class='fenzhen' style='background:red'>"+rows[i].status+"</span>";
			}else if(rows[i].status == "已接诊"){
				userStatus = "<span class='fenzhen' style='background:#418dd4'>"+rows[i].status+"</span>";
			}else if(rows[i].status == "待分诊"){
				userStatus = "<span class='fenzhen' style='background:#f57f66'>"+rows[i].status+"</span>";
			}else if(rows[i].status == "已分诊"){
				userStatus = "<span class='fenzhen' style='background:#6da66a'>"+rows[i].status+"</span>";
			}
			//待接诊时间
			var stateTime = rows[i].dividtime.substring(11,19);
			//挂号时间
			var guahaoTime = "";
			if(rows[i].PAADMOPTime == "" || rows[i].PAADMOPTime == null ){
				guahaoTime = "暂无挂号时间";
			}else{
				guahaoTime = rows[i].PAADMOPTime.substring(0, 16);
			}
			
             var html = `<li class="tableContent">
                 ${special}
                 <span class="aitem paddingStyle">${rows[i].rowno}</span>
                 <div class="bitem paddingStyle">
                     ${strhtml}
                 </div>
                 <div class="citem paddingStyle userInfo">
                     <span style='display:inline-block;width:50px;'>${username}</span>
                     <span style="padding: 0 5px;">${userAge}</span>
                     ${userGender}
                     ${userStatus}
                 </div>
                 <span class="ditem paddingStyle">${rows[i].admission}</span>
                 <span class="eitem paddingStyle">${rows[i].dividdepartmentname}</span>
                 <span class="fitem paddingStyle">${stateTime}</span>
                 <span class="gitem paddingStyle">${guahaoTime}</span>
                 <div class="hitem rightIcon">
                     <a class="jiezhen">
                         <img title="接诊" class="aicon" alt="" src="#path()/static/vendor/newpage/images/home/home_do_receive.png" />
                     </a>
                     <a>
                         <img title="打印分诊单" class="bicon" alt="" src="#path()/static/vendor/newpage/images/home/home_do_print.png" />
                     </a>
                     <a>
                         <img title="签字" class="cicon" alt="" src="#path()/static/vendor/newpage/images/home/home_do_sign.png" />
                     </a>
                     <a>
                         <img title="操作" class="dicon" alt="" src="#path()/static/vendor/newpage/images/home/home_do.png" />
                     </a>
                     <a>
                         <img title="删除" class="delIcon" alt="" src="#path()/static/vendor/newpage/images/home/home_do_delete.png" />
                     </a>

                 </div>
             </li>`;
             $('.tabcontain').append(html);
         }
     }
      
  }
//标记为特殊
$(".okBtn").click(function(){
	console.log("aaa",infoId,cardNum);
	let type = $(".addclass").html();
	$.ajax({
        type: "post",
        url: "#path()/index/saveSpecial",
        data:{
        	cardnum:cardNum,
        	id:infoId,
        	type:type
        },
        dataType: "json",
        async:true,
        success: function(res){
        	console.log(res);
        	$(".tabcontain").html("");
        	$(".specialWindow").hide();
        	getPatientList();
		},
		error : function() {
		}
	});

})
// 智能提醒区
$(".eremind").click(function(){
	
})
//标记已接诊弹窗
function teurlSubmit(){	
	
	
}
$(".picktimebtn").click(function(){
	console.log("222")
	$(".yijiezhenWindow").hide();
})

//打印分诊单
function dayindividshow(id){
	
}



