$(document).ready(function() {
	//初始化，默认加载第一个页面report_0
	reportload('report_0');
	//	左侧菜单点击样式
	$("#statisticalreport").addClass("active");
	$("#statisticalreport").siblings().removeClass("active");
	$(".report-left-menu ul li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
})

//替换reportpanel模块的内容(相当于跳转页面)
function reportload(data){
	var url="";
	if(data!=""){
		url='report/'+data;
	}
	if(url!=""){
		//局部替换模块（相当于跳转页面）
		$('#reportpanel').panel({
			href:'#path()/'+url
		});
	}
}


