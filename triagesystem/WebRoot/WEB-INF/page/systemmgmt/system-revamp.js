$(document).ready(function() {
	var hpprovince = "#(hpprovince ??)";
	var hpcity = "#(hpcity ??)";
	var provincelist =  $("#province").find("option");
	for(var i=0;i<provincelist.length;i++){
		if($(provincelist[i]).val()==hpprovince){
			$(provincelist[i]).attr("selected", true);
			$("#province").trigger("change");
		}
	}
	var citylist =  $("#city").find("option");
	for(var j=0;j<citylist.length;j++){
		if($(citylist[j]).val()==hpcity){
			$(citylist[j]).attr("selected", true);
		}
	}
	$('#confirmupdhospital').click(function() {
		
		var formData = new FormData();
		
		var hospitalid = $("#hospitalid").val();
		
		formData.append("hospitalid", hospitalid);
		var piont_x = $("#piont-x").val();
		var piont_y = $("#piont-y").val();
		formData.append("piont_x", piont_x);
		formData.append("piont_y", piont_y);
		var hospitalname = $("#hospitalname").val();
//		if(feiknum("医院名称","limit18",hospitalname,$("#hospitalname").next())){return;};
		formData.append("hospitalname", hospitalname);
		var hospitalcode = $("#hospitalcode").val();
		if(feiknum("组织机构代码","numberEnglish",hospitalcode,$("#hospitalcode").next())){return;};
		formData.append("hospitalcode", hospitalcode);
		var province = $("#province option:selected").val();
		var city = $("#city option:selected").val();
		
		if(province=="请选择"){
			$("#hospitaladdress").next().text("请选择省份");
			$("#hospitaladdress").next().css("color","red");
			return;
		}
		formData.append("province", province);
		if(city=="请选择"){
			$("#hospitaladdress").next().text("请选择城市");
			$("#hospitaladdress").next().css("color","red");
			return;
		}
		formData.append("city", city);
		var hospitaladdress = $("#hospitaladdress").val();
		if(feiknum("医院地址","limit24",hospitaladdress,$("#hospitaladdress").next())){return;};
		formData.append("hospitaladdress", hospitaladdress);

	    /*if(document.getElementById("hospitallogourl").files[0]==null){
	    	$("#hospitallogourl").parent().next().text("请选择图片文件！");
	    	return;
	    }*/
	    formData.append("hospitallogourl", document.getElementById("hospitallogourl").files[0]);
	    $(".tips").text("");
	    $.ajax({
            url: "#path()/systemmgmt/updHospitalInfo",
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
                    toastr.warning(result.message);
                    //跳转首页
                    window.location.href='#path()/';
                }else{
                	toastr.warning(result.message);
                }
            },
            error: function () {
            	toastr.warning("上传失败！");
            }
        });
	})
})
function showword(){
	$("#word").show();
}


