
var fztj = "0";
$(document).ready(function() {
	$("#events").addClass("leftNavActive").find("img").attr("src",$("#events").find(".iconNavImg").data("activeImg"));
	$("#events").siblings().removeClass("leftNavActive");
	$("#home").find("img").attr("src",$("#home").find(".iconNavImg").data("activeImg"));
	//分诊调级权限
	fztj = '#(fztj)';
	$("#events").addClass("active");
	$("#events").siblings().removeClass("active");
	setgradebtncss2();
	setgradebtncss3();
	getSymptom1("0","1");
	setTable();
	//是否快速分级
	sysDeploy('422');
//	laydate.render({
//		  elem: '#dividtime', //指定元素
//		  type: 'datetime',
//		  value: new Date()
//	});

	toastr.options = {
	  "preventDuplicates": true,
	  "preventOpenDuplicates": true,
	  "maxOpened":0,
	  "closeButton": true,
	  "debug": false,
	  "positionClass": "toast-bottom-right",
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut",
	  "newestOnTop": true
	};
	
});



function setTable(){
	$(".titbox tbody tr td").each(function(){
		var w = $(this).outerWidth();
		var index = $(this).index();
		$(".table-outburst1 thead tr th").eq(index).outerWidth(w);
	});	
}

function openEvents(){
	window.location.href="#path()/events/index";
}

function closeLoading() {  
    document.getElementById("loading").style.display="none";  
}

function add8(){
	var num = $("#num").val();
	$("#rownum").val(num);
	var re = /^[0-9]+$/ ; 
	if(!re.test(num)){
//		toastr.warning("保存失败!");
		$.messager.alert('提示','请输入正确的人数格式');
		return;
	}else{
		
		if(parseInt(num)>100){
			document.getElementById("loading").style.display="block"; 
		}
		$.ajax({
	        type: "post",
	        url: "#path()/events/getIds",
	        data:{
	        	num:num
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			var total = result.total;
	        			var rows =  result.rows;
	        			var str = new StringBuffer();
	        			for(var i=0;i<total;i++){
	        				var id = rows[i];
	        				var tempstr = '\t\t\t    <div class="panel panel-info" id="'+id+'">\n' +
								'        <div class="panel-heading clearfix">\n' +
								'            <div class="panel-title-tf">\n' +
								'                <span>序号：<span class="td_center" name="xuhao">'+(i+1)+'</span></span>\n' +
								'                <span>患者编号：'+id +'</span>\n' +
								'                <button name="grade" type="button" class="btn btn-primary" id="fj'+id+'"   Userbehavior="A162" onclick="show(&quot;'+id+'&quot;);">分级</button>\n' +
								'            </div>\n' +
								'            <div class="pull-right">\n' +
								'                <button type="button" class="close" aria-label="Close" Userbehavior="A64" onclick="deleteshow(this,'+(id)+')">\n' +
								'                    <span aria-hidden="true" >\n' +
								'                        <img src="#path()/static/vendor/newpage/images/tfsj//delect_select.png" />\n' +
								'                    </span>\n' +
								'                </button>\n' +
								'            </div>\n' +
								'        </div>\n' +
								'        <div class="panel-body mypanel">\n' +
								'            <div class="row clearfix">\n' +
								'                <div class="mypanel-6 col-md-7">\n' +
								'                    <div class="col-md-3 col-sm-3 p0">\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">就诊卡号</label>\n' +
								'                            <div class="col-sm-8">\n' +
								'                                <input type="text" class="form-control" name="cardnum" placeholder="请输入">\n' +
								'                            </div>\n' +
								'                        </div>\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">出生日期</label>\n' +
								'                            <div class="col-sm-8">\n' +
								'                                <input type="text" class="form-control" name="age" placeholder="八位数字">\n' +
								'                            </div>\n' +
								'                        </div>\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">来院方式</label>\n' +
								'                            <select class="form-control" name="source">\n' +
								'                                <option value="自行来院">自行来院</option>\n' +
								'                                <option value="120">120</option>\n' +
								'                                <option value="110">110</option>\n' +
								'                                <option value="鄂州">鄂州</option>\n' +
								'                                <option value="院内">院内</option>\n' +
								'                                <option value="东院">东院</option>\n' +
								'                                <option value="固始">固始</option>\n' +
								'                                <option value="汉川">汉川</option>\n' +
								'                                <option value="钟祥">钟祥</option>\n' +
								'                            </select>\n' +
								'                        </div>\n' +
								'                    </div>\n' +
								'                    <div class="col-md-3 col-sm-3 p0">\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>\n' +
								'                            <div class="col-sm-8">\n' +
								'                                <input type="text" class="form-control" name="fullname" value="无名氏'+id+'">\n' +
								'                            </div>\n' +
								'                        </div>\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">费用</label>\n' +
								'                            <select class="form-control" name="category">\n' +
								'                                <option value="1">城镇职工基本医疗保险</option>\n' +
								'                                <option value="2">城镇居民基本医疗保险</option>\n' +
								'                                <option value="3">新型农村合作医疗</option>\n' +
								'                                <option value="4">贫困救助</option>\n' +
								'                                <option value="5">商业医疗保险</option>\n' +
								'                                <option value="6 ">全公费 </option>\n' +
								'                                <option selected value="7">全自费</option>\n' +
								'                            </select>\n' +
								'                        </div>\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">意识状态</label>\n' +
								'                            <select class="form-control" name="consciousness">\n' +
								'                                <option  value="清醒">清醒 </option>\n' +
								'                                <option  value="昏迷">昏迷 </option>\n' +
								'                                <option  value="谵妄">谵妄 </option>\n' +
								'                                <option  value="嗜睡">嗜睡 </option>\n' +
								'                                <option  value="昏睡">昏睡 </option>\n' +
								'                            </select>\n' +
								'                        </div>\n' +
								'                    </div>\n' +
								'                    <div class="col-md-6 col-sm-6 p0">\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">性别</label>\n' +
								'                            <div class="col-sm-10 p0 selectGender">\n' +
									'								<a class="gender-man"></a>\n' +
									'								<a class="gender-woman"></a>\n' +
									'								<input type="text" style="display:none" name="gender" placeholder="" value="">\n' +
								'                            </div>\n' +
								'                        </div>\n' +
								'                        <div class="oneline">\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">来源</label>\n' +
								'                            <select class="form-control">\n' +
								'                                <option value="步行">步行</option>\n' +
								'                                <option value="扶走">扶走</option>\n' +
								'                                <option value="轮椅">轮椅</option>\n' +
								'                                <option value="平车">平车</option>\n' +
								'                            </select>\n' +
								'                        </div>\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">分诊去向</label>\n' +
								'                            <select class="form-control">\n' +
								'                                <option value="2">急诊外科</option>\n' +
								'                                <option value="3">急诊神经内科</option>\n' +
								'                                <option value="4">急诊妇科</option>\n' +
								'                                <option value="5">急诊产科</option>\n' +
								'                                <option value="6">急诊皮肤科</option>\n' +
								'                                <option value="7">急诊耳鼻喉科</option>\n' +
								'                                <option value="8">急诊眼科</option>\n' +
								'                                <option value="9">急诊口腔科</option>\n' +
								'                                <option value="10">急诊精神科</option>\n' +
								'                                <option value="39">急诊内科</option>\n' +
								'                            </select>\n' +
								'                        </div>\n' +
								'                        </div>\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-2 control-label">既往病史</label>\n' +
								'                            <select class="form-control">\n' +
								'                                <option value="COPD">COPD</option>\n' +
								'                                <option value="冠心病">冠心病</option>\n' +
								'                                <option value="高血压">高血压</option>\n' +
								'                                <option value="哮喘">哮喘</option>\n' +
								'                                <option value="其他">其他</option>\n' +
								'                            </select>\n' +
								'                        </div>\n' +
								'                    </div>\n' +
								'                </div>\n' +
								'                <div class="mypanel-3 col-md-3">\n' +
								'                    <div class="col-md-6 p0">\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-3 control-label">无创血压<br/> (mmHg)</label>\n' +
								'                            <div class="form-list">\n' +
								'                                <div class="col-md-5 p0"><input type="text" class="form-control text-center input-text"\n' +
								'                                        name="ssy" placeholder="请输入" maxlength="3"  value=""></div>\n' +
								'                                <div class="col-md-2 p0">/</div>\n' +
								'                                <div class="col-md-5 p0"><input type="text" class="form-control text-center input-text"\n' +
								'                                        name="szy" placeholder="请输入" maxlength="3" value=""></div>\n' +
								'                            </div>\n' +
								'                        </div>\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-3 control-label">心率<br/> (次/分)</label>\n' +
								'                            <div class="col-sm-8">\n' +
								'                                <input type="text" class="form-control" name="maibo">\n' +
								'                            </div>\n' +
								'                        </div>\n' +
								'                    </div>\n' +
								'                    <div class="col-md-6 p0">\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-3 control-label">呼吸频率<br/> (次/分)</label>\n' +
								'                            <div class="col-sm-8">\n' +
								'                                <input type="text" class="form-control"  name="huxi">\n' +
								'                            </div>\n' +
								'                        </div>\n' +
								'                        <div class="form-group">\n' +
								'                            <label for="inputEmail3" class="col-sm-3 control-label">体温<br/> (℃)</label>\n' +
								'                            <div class="col-sm-8">\n' +
								'                                <input type="text" class="form-control" name="tiwen">\n' +
								'                            </div>\n' +
								'                        </div>\n' +
								'\n' +
								'                    </div>\n' +
								'                </div>\n' +
								'                <div class="mypanel-1 col-md-2">\n' +
								'                    <textarea class="form-control" rows="2" placeholder="填写备注" name="zhusu"></textarea>\n' +
								'                </div>\n' +
								'            </div>\n' +
								'        </div>\n' +
								'    </div>'
	        				
	        				//拼接行
	        				// str.append('<tr class="border-no" id="'+id+'" >');
	        				// str.append('<td  ><span class="td_center" name="xuhao">'+(i+1)+'</span></td>');
	        				// str.append('<td><input type="text" class="form-control text-center input-text" name="cardnum" value=""></td>');
	        				// str.append('<td><div class="form-list"><input ondblclick="clear_val($(this))" style="width: 115px;" class="form-control text-center input-text" type="text" maxlength="32" name="fullname" value="无名氏'+id+'" placeholder=""></div></td>');
	        				// str.append('<td>');
	        				// str.append('<select class="form-control " name="gender">');
	        				// str.append('<option value="未说明">未说明</option>');
	        				// str.append('<option value="男">男</option>');
							// str.append('<option value="女">女</option>');
							// str.append('</select>');
						    // str.append('</td>');
						    // str.append('<td><div class="age">');
						    // str.append('<div class="col-md-13 input-read"><input type="text" class="form-control text-center input-text"  name="age" placeholder="八位数字" value=""></div>');
						    // str.append('</div></td>');
						    // str.append('<td>');
	        				// str.append('<select class="form-control " name="category">');
	        				// str.append('<option value="1">城镇职工基本医疗保险</option>');
	        				// str.append('<option value="2">城镇居民基本医疗保险</option>');
							// str.append('<option value="3">新型农村合作医疗</option>');
							// str.append('<option value="4">贫困救助</option>');
	        				// str.append('<option value="5">商业医疗保险</option>');
							// str.append('<option value="6 ">全公费 </option>');
							// str.append('<option selected value="7">全自费</option>');
							// str.append('</select>');
						    // str.append('</td>');
						    // str.append('<td class="new-colstd">');
	        				// str.append('来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源<select class="form-control " name="source">');
	        				// str.append('<option value="">选择</option>');
	        				// str.append('<option value="自行来院">自行来院</option>');
	        				// str.append('<option value="120">120</option>');
							// str.append('<option value="110">110</option>');
							// str.append('<option value="鄂州">鄂州</option>');
	        				// str.append('<option value="院内">院内</option>');
							// str.append('<option value="东院">东院</option>');
							// str.append('<option value="固始">固始</option>');
							// str.append('<option value="汉川">汉川</option>');
							// str.append('<option value="钟祥">钟祥</option>');
							// str.append('</select><br />');
							// str.append('来院方式<select class="form-control " name="lyfs">');
	        				// str.append('<option value="">选择</option>');
	        				// str.append('<option value="步行">步行</option>');
	        				// str.append('<option value="扶走">扶走</option>');
							// str.append('<option value="轮椅">轮椅</option>');
							// str.append('<option value="平车">平车</option>');
							// str.append('</select><br />');
							// str.append('意识状态<select class="form-control " name="consciousness">');
	        				// str.append('<option value="">选择</option>');
	        				// str.append('<option value="清醒">清醒</option>');
	        				// str.append('<option value="昏迷">昏迷</option>');
							// str.append('<option value="谵妄">谵妄</option>');
							// str.append('<option value="嗜睡">嗜睡</option>');
							// str.append('<option value="昏睡">昏睡</option>');
							// str.append('</select><br />');
							// str.append('既往病史<input type="text" class="form-control label-history text-center" name="history" readonly value="请选择" id="history_'+(i+1)+'" onclick="history(this)">');
	        				// str.append('<input type="hidden"  name="hide"   >');
	        				// str.append('<div class="historyList" id="'+(i+1)+'">');
	        				// str.append('<p style="padding-left:2%;border-bottom:solid 1px #ccc;"><button type="button" class="btn" data-id="1">无</button></p>');
	        				// str.append('<p class="text-center"><button type="button" class="btn" data-id="2">糖尿病</button>');
							// str.append('<button type="button" class="btn" data-id="3">COPD</button>');
							// str.append('<button type="button" class="btn" data-id="4">冠心病</button>');
							// str.append('<button type="button" class="btn" data-id="5">高血压</button>');
							// str.append('<button type="button" class="btn" data-id="6">哮喘</button>');
							// str.append('<button type="button" class="btn" data-id="7">其他</button></p>');
							// str.append('<p class="other-txt"><input type="text" class="form-control formOther form-text" name="other" id="other_'+(i+1)+'" value=""></p>');
							// str.append('</div>');
						    // str.append('</td>');
						    // str.append('</td>');
						    //
							//
	        				//
	        				// str.append('<td><div class="form-list">');
	        				// str.append('<div class="col-md-5 p0"><input type="text" class="form-control text-center input-text" name="ssy"  placeholder="请输入" maxlength="3" value=""></div>');
	        				// str.append('<div class="col-md-2 p0">/</div>');
	        				// str.append('<div class="col-md-5 p0"><input type="text" class="form-control text-center input-text" name="szy" placeholder="请输入" maxlength="3" value=""></div>');
	        				// str.append('</div></td>');
	        				// str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text"  name="maibo" placeholder="请输入" maxlength="3" value=""></div></td>');
	        				// str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text"  name="huxi" placeholder="请输入" maxlength="3" value=""></div></td>');
	        				// str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text"  name="tiwen" placeholder="请输入" maxlength="4" value=""></div></td>');
	        				// str.append('<td><div class="form-list">');
	        				// str.append('<input type="hidden"  value="0" name="autograde">');
	        				// str.append('<input type="hidden"  value="0" name="finalgrade">');
	        				// str.append('<input type="hidden"  value="0" name="edtsgrade">');
	        				// str.append('<input type="hidden"  value="0" name="mewsgrade">');
	        				// str.append('<input type="hidden"  value="0" name="quickgrade">');
	        				// str.append('<input type="hidden"  value="0" name="dividtime">');
	        				// str.append('<input type="hidden"  value="0" name="dividtime">');
	        				// str.append('<input type="hidden"  value="0" name="changereason">');
	        				// str.append('<input type="hidden"  value="0" name="reasondetail">');
	        				// str.append('<input type="hidden"  value="0" name="edts_ids_qita">');
	        				// str.append('<input type="hidden"  value="0" name="edts_ids_qitastatus">');
	        				// str.append('<input type="hidden"  value="0" name="edts_ids">');
	        				// str.append('<input type="hidden"  value="0" name="mews_ids">');
	        				// str.append('<input type="hidden"  value="0" name="mews_score">');
	        				// str.append('<input type="hidden"  value="0" name="edts_score">');
	        				// str.append('<input type="hidden"  value="0" name="symtpomid">');
	        				// str.append('<input type="hidden"  value="0" name="gcs">');
	        				// str.append('<input type="hidden"  value="0" name="pain">');
	        				// str.append('<input type="hidden"  value="0" name="symtpomname">');
	        				// str.append('<div  name="symtpomcon" style="display: none"></div>');
	        				// str.append('<div  name="ttpfcon" style="display: none"></div>');
	        				// str.append('<div  name="gcspfcon" style="display: none"></div>');
	        				// str.append('<span name="grade" id="fj'+id+'" class="label label-sinple lg" Userbehavior="A162" onclick="show(&quot;'+id+'&quot;);">分级</span></div></td>');
	        				// str.append('<td>');
	        				// str.append('<select class="form-control " name="chooseDepart">');
	        				// str.append('<option value="">选择</option>');
	        				// str.append('<option value="2">急诊外科</option>');
	        				// str.append('<option value="3">急诊神经内科</option>');
							// str.append('<option value="4">急诊妇科</option>');
							// str.append('<option value="5">急诊产科</option>');
							// str.append('<option value="6">急诊皮肤科</option>');
							// str.append('<option value="7">急诊耳鼻喉科</option>');
	        				// str.append('<option value="8">急诊眼科</option>');
							// str.append('<option value="9">急诊口腔科</option>');
							// str.append('<option value="10">急诊精神科</option>');
							// str.append('<option value="39">急诊内科</option>');
							// str.append('</select>');
						    // str.append('</td>');
	        				// str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text" name="zhusu" placeholder="请输入" value=""></div></td>');
	        				// str.append('<td Userbehavior="A64" onclick="deleteshow(this,'+(id)+')" ><i class="fa fa-trash-o delete" data-toggle="modal" ></td>');
	        				// str.append('</tr>');
							str.append(tempstr)
	        			}
	        			//console.log(result);
	        			$("#tbody").html("");
	        			$("#tbody").html(str.toString());
	        			$(".addList").show();
	        			$("#save").show();
	        			$("#num").hide();
	        			$("#numdiv").html(num).css("width","100%");
	        			$("#btn-chat").hide();
	        			$("#btn-add").show();
	        			$("#addbtn").show();
//	        			$("#addadd2").setProperty("width","120px");
	        			//单项选择按钮
	        			/*$(".single-radio li input[type='radio']").each(function() {
	        				$(this).click(function() {
	        					if($(this).is(":checked")) {
	        						$(this).parent().siblings("li").find("label").removeClass("pitch");
	        						$(this).siblings("label").addClass("pitch");
	        					}
	        				})
	        			})
	        			
	        			var hei1 = $(".titbox").height();
	        			var hei2 = $(".table-outburst2").height();       			
	        			if(hei1>hei2){
	        				$(".breadcrumb,.table-head,.table-outburst1").css("width","99%");
	        			}
	        			$(".titbox tbody tr td").each(function(){
	        				var dd = $(this).index();
	        				if(dd != 1){
		        				if($(this).find(".form-control").length >0){
		        					$(this).css({
		        						"line-height":"initial",
		        					    "padding-top":"12px"	        					
		        					});
		        				}
	        				}else{
	        					$(this).css({
	        						"line-height":"initial"	        					    	        					
	        					});
	        				}
	        			})

	        			$(".titbox select").bind("change",function(){
	        				var obj = $(this).find("option:selected");
	        				var option = obj.text().trim();	   	        				
	        				if(option != "全自费" && option != "未说明" && option != "选择"){
	        					$(this).addClass("selected").attr("title",option);	        					
	        				}else{
	        					$(this).removeClass("selected").removeAttr("title");
	        				}	        				        				
	        			})*/
	        			//性别选择
	        			$(".selectGender>a").click(function(){
	        				$(this).addClass("active").siblings().removeClass("active")
	        				if($(this).hasClass("gender-man")){
	        					$(this).siblings("input").val("男")
	        				}else{
	        					$(this).siblings("input").val("女")
	        				}
	        			})
	        			setTable();	    		
	        			historyShow();	        			
	        		}
	        	}
			
	        	if(parseInt(num)>100){
	        		// 遮罩层消失  
	        		closeLoading(); 
	    		}
	        },
			error : function() {
				if(parseInt(num)>100){
					// 遮罩层消失  
					closeLoading(); 
				}
			}
		});
	}
}

//既往事
var hlist = [];
function history(d){	
	$(".historyList").hide();
	$(d).siblings(".historyList").show();	
	hlist = [];
}

function historyShow(){			
	var est = false;	
	$(".historyList .btn").unbind("click");
	$(".historyList .btn").click(function(){
		var index = $(this).parents(".historyList").attr("id");		
		var txt = $(this).text().trim();
		$(this).toggleClass("active");
		if(txt == "无" && $(this).hasClass("active")){
			$(this).parent().siblings().find(".btn").removeClass("active").attr("disabled","disabled");
			$(this).parents(".historyList").find(".other-txt").hide();
			hlist = [];
			hlist.push(txt);
			est = false;
		}else{
			$(".historyList .btn").each(function(){
				$(this).removeAttr("disabled");
			})	
			if(txt == "其他"){
				if($(this).hasClass("active")){
					$(this).parents(".historyList").find(".other-txt").show();
					$(this).parents(".historyList").find("p").eq(1).css("border-bottom","solid 1px #ccc");
					est = true;
				}else{
					$(this).parents(".historyList").find(".other-txt").hide();
					$(this).parents(".historyList").find("p").eq(1).css("border-bottom","0");
					$("#other_"+index).val("");
				}				
			}
		}
		if(txt != "其他"){	
			if($(this).hasClass("active")){	
					hlist.push(txt);
					hlist = unique(hlist);
					$(this).parents(".historyList").siblings("input[name='hide']").val(hlist);
			}else{
				var now = [];
				for(var i=0;i<hlist.length;i++){
					if(txt != hlist[i]){
						now.push(hlist[i]);
					}
				}				
				hlist = now;				
			}
		}

		if(hlist.length == 0){
			$("#history_"+index).val("请选择").removeClass("selected");
			$(".tips").remove();
		}else{
			$("#history_"+index).val(hlist).addClass("selected");
		}		
	})
	
	//清除其他输入框值
	var read = "";
	$("input[name='history']").unbind("click");
	$("input[name='history']").click(function(){
		hlist = [];		
		$(this).siblings(".historyList").find(".btn").each(function(){
			var txt = $(this).text().trim();											
			if($(this).hasClass("active")){	
				if(txt != "其他"){
					hlist.push(txt);
					hlist = unique(hlist);
				}else{
					var ttt = $(this).parent().siblings(".other-txt").find(".form-text").val();
					read = ttt;
				}				
			}			
		})
		if(est == false){
			$(this).siblings(".historyList").find(".form-text").val("");
		}
	})
	
	//点击空白处消失
//	$(document).unbind("click");
	$(document).bind("click", function (e){
	    if ( $((e.target || e.srcElement)).closest(".historyList,input[name='history']").length == 0)
	    {	    	
	    	if(est == true){
		    	$(".form-text").each(function(){
		    		if($(this).parents(".historyList").css("display") == "block"){		    			
		    			var value = $(this).val();
			    		if(value != ""){
			    			hlist.push("其他|"+value);
			    			hlist = unique(hlist);
			    			$(this).parents(".historyList").siblings("input[name='history']").addClass("selected");
			    			$(this).parents(".historyList").siblings("input[name='hide']").val(hlist);
			    			$(this).parents(".historyList").siblings("input[name='history']").val(hlist.join().replace("其他|",""));
			    		}else{
			    			var now = [];
							for(var i=0;i<hlist.length;i++){
								if(read != hlist[i]){
									now.push(hlist[i]);
								}
							}
							hlist = now;	
							if(hlist.length == 0){
								$(this).parents(".historyList").siblings("input[name='history']").val("请选择");
							}else{
								$(this).parents(".historyList").siblings("input[name='history']").val(hlist);
							}						
							$(this).parents(".historyList").siblings("input[name='hide']").val(hlist);
			    		}	    			
		    		}	    		
		    	})
	    	}
	    	$(".historyList").hide();  	           	           
	    }
	});
	
	$('input[name="history"]').hover(function(){
		var content = $(this).val();
		if(content != "请选择"){
			var frame = '<div class="tips"><div class="pt-out"></div><div class="pt-in"></div><div class="pt-cont">'+content+'</div></div>';
			$(this).after(frame);
		}	        				
	},function(){
		$(this).siblings(".tips").remove();
	})
}

//去除数组中重复字段
function unique(array){
	var n = [array[0]]; 	
	for(var i = 1; i < array.length; i++) {
		if (array.indexOf(array[i]) == i) n.push(array[i]);
	}
	return n;
}

//重置 评分
function reset(){
	
	//去除目前评分
	$("#Pain_Score").html('');
	$("#GCS_Score").html('');
	$("#ttpf").html('');
	$("#gcspf1").html('');
	$("#mews_a li").removeClass('active');
	$("#mews_b li").removeClass('active');
	$("#classify1 li").removeClass('activecc');
	$("#classify2 li").removeClass('activecc');
	//$("#classify3 li").removeAttribute('color');
	$(".mews_score_A").text("0");
	$(".mews_score_B").text("0");
	$(".mews_score_C").text("0");
	$("#mews_c li").removeClass('active');
	$("#mews_tiwen_score").text(0);
	$("#mews_yishi_score").text(0);
	$("#mews_xueya_score").text(0);
	$("#mews_maibo_score").text(0);
	$("#mews_huxi_score").text(0);
	
	$("#score_tiwen").text(0);
	$("#score_xueya").text(0);
	$("#score_maibo").text(0);
	$("#score_huxi").text(0);
	$("#score_spo2").text(0);
	$("#pf_b li").removeClass('active');
	$("#pf_c li").removeClass('active');
	$("#pf_d li").removeClass('active');
	$(".Score_B").text("0");
	$(".Score_C").text("15");
	$(".Score_D").text("0");
	$(".totalScore").text("0");
	setgradebtncss() ;
	$("#symptom").html("");
	 //快速分级默认显示第一级
	getSymptom("0","1");
	
	//$('#changereason').combobox('setText','');
	//$('#changereason').find("option:selected").attr("selected", false);
//	$("#changereason option:first").prop("selected", 'selected');
	$('#reasondetail').val("");
	$("select[id='sel_tiwen']").val("0");
	$("select[id='sel_spo2']").val("0");
	//$('#mname').combobox('setText', t.mname);
}
	function save(){
		debugger
		if(!$("#name").val().length>0){
	    	$.messager.alert('提示','事件名称不能为空');
	    	return;
	    }
		var num = $("#numdiv").html();
		var re = /^[0-9]+$/ ;
		if(!(re.test(num-0))){
			$.messager.alert('提示','请确认事件人数并生成清单');
			return;
		}
		//找到未分级的列
		
		var spans = $("button[name='grade']");
		for(var i=0;i<spans.length;i++){
			var span = spans.eq(i);
			if(span.hasClass('label-sinple')){
				$.messager.alert('提示','请分级后再保存');
				return;
			}
		}
		
		var trList = $("#tbody").find(".panel ");
		

		var size = trList.length;
		if(size!=num){
			$.messager.alert('提示','请确认事件人数并生成清单');
			return;
		}	
		var re = /^[0-9]{1,3}$/ ;
		var rename=/^[a-zA-Z\u4e00-\u9fa5\ \·]+$/;
		var recard = /^[a-zA-Z0-9]{1,19}$/;
		var re1 = /^\d{0,2}\.{0,1}\d{0,1}$/;
    	var re2 = /^\d{0,2}$/;
    	var regage = /^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/;
		var str = "";
		var symtpomids ="";
		var edts_idss ="";
		var mews_idss ="";
		var flag = false;
	    for (var i=0;i<trList.length;i++) {
	    	var tr = trList.eq(i);
	    	
	    	var id = tr.attr("id");
	    	var tiwen = tr.find("input[name='tiwen']").val();
	    	var cardnum = tr.find("input[name='cardnum']").val();
	    	var fullname = tr.find("input[name='fullname']").val();
	    	var dividtime = tr.find("input[name='dividtime']").val();
	    	var age = tr.find("input[name='age']").val();
	    	if(fullname==""){
	    		fullname = "无名氏";	
	    		tr.find("input[name='fullname']").val(fullname);
	    	}
	    	var ssy = tr.find("input[name='ssy']").val();
	    	
	    	var szy = tr.find("input[name='szy']").val();
	    	
	    	var maibo = tr.find("input[name='maibo']").val();
	    	
	    	var huxi = tr.find("input[name='huxi']").val();
	    	if (cardnum.length > 0) {
				if (!recard.test(cardnum)) {
					$.messager.alert('提示', '请输入正确的卡号信息（1-19位）!');
					return;
				}
			}
			//无名氏去除验证，liuxj20191118
//	    	if (!rename.test(fullname)) {
//				$.messager.alert('提示', '姓名请输入中文或者英文!');
//				return;
//			}
	    	if (age.length > 0) {
				if (!regage.test(age)) {
					$.messager.alert('提示', '出生日期格式错误!');
					return;
				}
			}
	    	if (ssy.length > 0) {
				if (!re.test(ssy)) {
					$.messager.alert('提示', '无创血压必须是数字!');
					return;
				}
			}
			if (szy.length > 0) {
				if (!re.test(szy)) {
					$.messager.alert('提示', '无创血压必须是数字!');
					return;
				}
			}
			if (maibo.length > 0) {
				if (!re.test(maibo)) {
					$.messager.alert('提示', '心率必须是数字!');
					return;
				}
			}
			if (huxi.length > 0) {
				if (!re.test(huxi)) {
					$.messager.alert('提示', '呼吸频率必须是数字!');
					return;
				}
			}
			if (tiwen.indexOf(".") > 0) {
				if (!re1.test(tiwen)) {
					$.messager.alert('提示', '请输入正确的体温数值!');
					return;
				}
			} else if (!re2.test(tiwen)) {
				$.messager.alert('提示', '请输入正确的体温数值!');
				return;
			}
			var pattern = /(\d{4})(\d{2})(\d{2})/;
			var bornday ="";
			if(age !=''){
				bornday = age.replace(pattern, '$1-$2-$3');
			}
			age = jsGetAge('', bornday);
	    	var sex = tr.find("select[name='gender']").val();
	    	var category = tr.find("select[name='category']").val();
	    	var source = tr.find("select[name='source']").val();
	    	var lyfs = tr.find("select[name='lyfs']").val();
	    	var consciousness = tr.find("select[name='consciousness']").val();
	    	//既往病史取值
	    	var history =  tr.find("input[name='hide']").val();
	    	var chooseDepart = tr.find("select[name='chooseDepart']").val();
	    	if(source=="" || lyfs=="" ||consciousness=="" || chooseDepart==""||history ==""){
	    		flag = true;
	    	}
	    	if(ssy ==""){
	    		ssy = "0";	
	    	}
	    	if(szy ==""){
	    		szy = "0";	
	    	}
	    	if(maibo ==""){
	    		maibo = "0";	
	    	}
	    	if(huxi ==""){
	    		huxi = "0";	
	    	}
	    	if(tiwen ==""){
	    		tiwen = "0";	
	    	}
	    	
	    	if(!(re.test(ssy)&&re.test(szy)&&re.test(maibo)&&re.test(huxi))){ 
	    		$.messager.alert('提示','血压、脉搏、呼吸必须在三位整数内');
				return;
			}	    	    	  	
	    	
	    	var autograde = tr.find("input[name='autograde']").val();
	    	var finalgrade = tr.find("input[name='finalgrade']").val();
	    	var changereason = "0"
	    	var reasondetail = "0"
	    	if(finalgrade !="0"){
	    		changereason = tr.find("input[name='changereason']").val();
	    		reasondetail = tr.find("input[name='reasondetail']").val();
	    	}
	    	var zhusu = tr.find("input[name='zhusu']").val();
	    	if(zhusu ==""){
	    		zhusu = "0";	
	    	}
	    	
	    	var obj = tr.find("input[type='text']");
	    	
	    	for (var j=0;j<obj.length;j++) {
	    		if(obj.eq(j).attr("name") != "zhusu" && obj.eq(j).attr("name") != "history" && obj.eq(j).attr("name") != "other"){	    			
		    		if(obj.eq(j).val() == ""){		    			
		    			flag = true;
		    		} 
	    		}		    	
	    	}
	    	var edts_ids_qita = tr.find("input[name='edts_ids_qita']").val();
	    	var edts_ids_qitastatus = tr.find("input[name='edts_ids_qitastatus']").val();
	    	
	    	var mews_score = tr.find("input[name='mews_score']").val();
	    	var edts_score = tr.find("input[name='edts_score']").val();
	    	
	    	var symtpomid = tr.find("input[name='symtpomid']").val();
	    	var edts_ids = tr.find("input[name='edts_ids']").val();
	    	var mews_ids = tr.find("input[name='mews_ids']").val();
	    	var pain = tr.find("input[name='pain']").val();
	    	var gcs = tr.find("input[name='gcs']").val();
	    	symtpomids += symtpomid +"#";
	    	edts_idss += edts_ids +"#";
	    	mews_idss += mews_ids +"#";
	    	
	    	
	    	str+= id+";";
	    	str+= fullname+";";
	    	str+= sex+";";
	    	str+= bornday+";";
	    	str+= consciousness+";";
	    	str+= ssy+";";
	    	str+= szy+";";	    	
	    	str+= maibo+";";
	    	str+= huxi+";";
	    	str+= autograde+";";
	    	str+= finalgrade+";";
	    	str+= zhusu+";";
	    	str+= changereason+";";
	    	str+= edts_ids_qita+";";
	    	str+= edts_ids_qitastatus+";";
	    	str+= mews_score+";";
	    	str+= edts_score+";"
	    	str+= category+";"
	    	str+= source+";"
	    	str+= lyfs+";"
	    	str+= tiwen+";"
	    	str+= cardnum+";"
	    	str+= pain+";"
	    	str+= gcs+";"
	    	str+= chooseDepart+";"
	    	str+= reasondetail+";"
	    	str+= dividtime+";"
	    	str+= history+" ;"
	    	str+= age+" ;#X#";
	    }
	    if(str.length>0){
	    	str = str.substring(0,str.length-3);
    	}
	    if(symtpomids.length>0){
	    	symtpomids = symtpomids.substring(0,symtpomids.length-1);
    	}
	    if(edts_idss.length>0){
	    	edts_idss = edts_idss.substring(0,edts_idss.length-1);
    	}
	    if(mews_idss.length>0){
	    	mews_idss = mews_idss.substring(0,mews_idss.length-1);
    	}
	    
	    $.ajax({
	        type: "post",
	        url: "#path()/events/save",
	        data:{
	        	nurseid:'#userId()',
	        	nursename:'#userName()',
	        	name:$("#name").val(),
	        	paitents:str,
	        	num:$("#numdiv").html(),
	        	symtpomids:symtpomids,
	        	mews_idss:mews_idss,
	        	edts_idss:edts_idss
	        	
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			if(flag == true){
	        				var explain = "<img src='#path()/static/images/success.png' style='padding-bottom:10px'><p style='padding-bottom:10px'>保存成功</p><p>患者信息未填写完成，保存后将进入待分诊状态</p>";
	        				tiptools(explain);
	        			}else{
	        				var explain = "<img src='#path()/static/images/success.png' style='padding-bottom:10px'><p style='padding-bottom:10px'>保存成功</p>";
	        				tiptools(explain);
	        			}
	        		}else{
	        			$.messager.alert('提示','保存失败，请联系系统管理员');
	        		}
	        	}
			},
			error : function() {
			}
		});
		
	}
	function tiptools(tt){
		$.messager.show({
			title:'提示',
			msg:tt,
			showType: 'null',
            timeout: 0
        })		        			
		$(".messager-window,.window-header,.messager-body,.messager-button").css("width","auto");
		$(".window").addClass("messager-window msg-position").css({
			"left":"511px",
			"top":"290px",
			"bottom":"",
			"width":"400px",
			"z-index":"9009"
		})
		$(".window-header").remove();
		$(".messager-body").css("height","170px");
		var tt = '<div class="window-mask" style="display: block; z-index: 9008; position: fixed;"></div>';
		$("body").append(tt);
		clearTimeout(event);
		var event = setTimeout(function(){
			openEvents();
		},3000)
	}
	
	function show(id){
		//$("#classify2").hide();
		//$("#classify3").hide();
		var val=$("#fj"+id).html();		
		var ppid = $('#level_2_id').val();
		$("#p_id").val(id);
		//快速分级设置
		if(val=='分级' &&  is_quick !='已关闭'){
		    if($("#events").hasClass("active")){
		    	if(!showDemo){
		    		$('.classifyBox.undemo-class').show();
		    	}else{
		    		$('.classifyBox.demo-class').show();
		    	}
		    	$('.classifyBox').show();
		    	$("#10000000002,#10000000003").hide();
	    		$("#changereason option:first").prop("selected", 'selected');
//		    	$('.classifyBox').css("top","100px");
//		    	$('.classifyBox').css("left","auto");
//		    	$('.classifyBox').css("height","520px");
		    	//2019-4-19 yushim 移除自定义以前输入过的内容
		    	getSymptom("0","1");

		    }
		}else{			
			tiaozhuanfenji();
			//评级描述
			load(id);
			
//			addResult1(symtpomname,symtpomid,ppid);
		}
	}
	function tiaozhuanfenji(){
		//用户行为监控 完整评级
		saveUserbehavior("A164");
		
		var id = $("#p_id").val();
		var tr = $("#"+id);
		//lxj
		var symtpomid = tr.find("input[name='symtpomid']").val();
		var symtpomname = tr.find("input[name='symtpomname']").val();
		var symtpomcon = tr.find("div[name='symtpomcon']").html();
		var ttpfcon = tr.find("div[name='ttpfcon']").html();
		var gcspfcon = tr.find("div[name='gcspfcon']").html();
		//评级描述
		$("#symptom").html(symtpomcon);
		$("#ttpf").html(ttpfcon);
		$("#gcspf1").html(gcspfcon);
		
		if(tr.find("input[name='changereason']").val()!="0"){
			$('#changereason').find("option[value='"+tr.find("input[name='changereason']").val()+"']").attr("selected",true);
		}
		if(tr.find("input[name='reasondetail']").val()!="0"){
			$("#reasondetail").val(tr.find("input[name='reasondetail']").val());
		}
		if(symtpomcon !=''){
			var g = tr.find("input[name='autograde']").val();
			// var name = getgradenamebygradeid(grade);
			g = g.substring(g.length-1,g.length);
			var grade_css = 'btn-'+g+'-selected';
			
			for(var i=1;i<6;i++){
				if(g!=i){					
					$("#g1[value =\""+"100"+i+"\"]").removeClass("btn-"+i).removeClass("btn-"+i+"-selected").addClass("unused-btn");
				}else{
					$("#g1[value ='"+"100"+i+"']").removeClass("unused-btn");
			    	$("#g1[value ='"+"100"+i+"']").addClass("btn-"+i);
			    	$("#g1[value ='"+"100"+i+"']").addClass(grade_css);			    	
				}
			}
		}
		
		var defultpjfs= $('#defultpjfs').val();
		if(defultpjfs=='401'){
			//显示快速分级
			$('#quickgrade').show().siblings().hide();
			$('#'+defultpjfs).addClass("active").siblings().removeClass("active");
			
		}else if(defultpjfs=='408'){
			//EDTS
			$('#quickpf').show().siblings().hide();
			$('#'+defultpjfs).addClass("active").siblings().removeClass("active");
		}else if(defultpjfs=='406'){
			//MEWS
			$('#mewspf').show().siblings().hide();
			$('#'+defultpjfs).addClass("active").siblings().removeClass("active");
		}else if(defultpjfs=='404'){
				//MEWS
			$('#gcspf').show().siblings().hide();
			$('#'+defultpjfs).addClass("active").siblings().removeClass("active");	
					
		}else if(defultpjfs=='402'){
			
			$('#painpf').show().siblings().hide();	
			$('#'+defultpjfs).addClass("active").siblings().removeClass("active");
		}else{
			$('#default').show().siblings().hide();
			$('#'+defultpjfs).addClass("active").siblings().removeClass("active");
		}
		if(is_quick =='已关闭'){
			$('#401').hide();
		}
	
		$('#fenzhenpjb').modal();
		$('#dividtime').val(synctime().substring(0,16));
	}
	
	function load(p_id){
		var tr = $("#"+p_id);
		
		var autograde = tr.find("input[name='autograde']").val();
    	var finalgrade = tr.find("input[name='finalgrade']").val();

    	var changereason = tr.find("input[name='changereason']").val();
    	   	
    	var edts_ids_qita = tr.find("input[name='edts_ids_qita']").val();
    	var edts_ids_qitastatus = tr.find("input[name='edts_ids_qitastatus']").val();
    	

    	
    	var symtpomid = tr.find("input[name='symtpomid']").val();
    	var symtpomname = tr.find("input[name='symtpomname']").val();
    	
    	var edts_ids = tr.find("input[name='edts_ids']").val();
    	var mews_ids = tr.find("input[name='mews_ids']").val();
    	if (mews_ids.length > 0) {
			var symptom_ids = mews_ids.split(",");
			for (var j = 0, len = symptom_ids.length; j < len; j++) {
				var symptom_id = symptom_ids[j];
				// alert(symptom_id);
				$("#" + symptom_id).trigger("click");
			}
		}
    	if(edts_ids.length>0){
			var symptom_ids = edts_ids.split(",");
			for(var j = 0,len = symptom_ids.length; j < len; j++){
				var symptom_id = symptom_ids[j];
				$("#"+symptom_id).trigger("click");
			}
		}
		if(!edts_ids_qitastatus){
			$("#e-b-8-4").css('display','none');
			$("#e-b-8-4").find("input").val("");
		}else{
			$("#e-b-8-4").find("input").val(edts_ids_qita);
		}
	}
	
	function saveGrade(){
		var p_id = $("#p_id").val();
		var tr = $("#"+p_id);
		var time=$("#dividtime").val();
		var finalgrade = tr.find("input[name='finalgrade']").val();
    	if (finalgrade!="0"){
    		if($("#changereason").val()==""){
    			$.messager.alert('提示','手动分级修改原因不能为空');
    			return;
    		}	
    	}
    	var autograde = tr.find("input[name='autograde']").val();
    	if(autograde=='0' || autograde==''){
    		$.messager.alert('提示','请分级后再保存');
			return;
    	}
    	if(time==""){
			$.messager.alert('提示','评级时间不能为空');
			return;
		}
    	if($("#fenzhenpjb").css('display')=='block'){
			$("#dosava").modal();
		}
    	$('#seach_patient').modal('hide');
		
    	var changereason = $('#changereason option:selected').val();
    	var reasondetail = $("#reasondetail").val();
        var dividtime = $("#dividtime").val();
		var  symtpomid = "";
		var  symtpomname = "";
		//分级信息
		$(".xxx").each(function(){
			symtpomid += $(this).attr("id")+",";
			symtpomname += $(this).prev().html()+",";

		});
		if(symtpomname !=""){
			symtpomname = symtpomname.substring(0,symtpomname.length-1);
		}
		if(dividtime!=""){
			tr.find("input[name='dividtime']").val(dividtime);	
		}
		if(symtpomid !=""){
			symtpomid = symtpomid.substring(0,symtpomid.length-1);
		}
		//疼痛评分
		var Pain_Score = $("#Pain_Score").html();
		
		var GCS_Score = $("#GCS_Score").html();
		
		
		//EDTS评分 
		var edts_ids = "";
		//EDTS评分中B级其他选项是否选中，以及获取选中时输入框的内容
		var edts_ids_qitastatus = "";
		var edts_ids_qita = "";
		if($("#e-b-8-3").attr("class")=="active"){
			$("#e-b-8-4").removeClass("active");
			edts_ids_qita=$("#e-b-8-4").find("input").val();
			edts_ids_qitastatus="true";
		}
		
		
		$("#quickpf").find('li[class="active"]').each(function(){
			
			var name = $(this).attr("name");
			if(name=="edts_sel_tiwen")
			{
				
			}else if(name=="edts_sel_spo2"){
				
			}else{
				edts_ids += $(this).attr("id")+",";	
			}
		});
		if(edts_ids !=""){
			edts_ids = edts_ids.substring(0,edts_ids.length-1);
		}
						
		//MEWS评分 
		var mews_ids = "";
		
		$("#mewspf").find('li[class="active"]').each(function(){
			var name = $(this).attr("name");
			if(name=="mews_sel_tiwen")
			{
				
			}else if(name=="mews_sel_yishi"){
				
			}else{
				mews_ids += $(this).attr("id")+",";
			}
			
		});
		if(mews_ids !=""){
			mews_ids = mews_ids.substring(0,mews_ids.length-1);
		}
		//MEWS总分
		var mews_score = $("#mews_score").html();
		//EDTS总分
		var edts_score = $("#last_score").html();


		if(changereason!=""){
			tr.find("input[name='changereason']").val(changereason);	
		}
		if(reasondetail!=""){
			tr.find("input[name='reasondetail']").val(reasondetail);	
		}
		if(symtpomid!=""){
			tr.find("input[name='symtpomid']").val(symtpomid);	
		}
		if(symtpomname!=""){
			tr.find("input[name='symtpomname']").val();	
		}
		if(Pain_Score!=""){
			tr.find("input[name='pain']").val(Pain_Score);	
		}
		if(GCS_Score!=""){
			tr.find("input[name='gcs']").val(GCS_Score);	
		}
		if(edts_ids!=""){
			tr.find("input[name='edts_ids']").val(edts_ids);
		}
		if(mews_ids!=""){
			tr.find("input[name='mews_ids']").val(mews_ids);	
		}
		if(edts_ids_qita!=""){
			tr.find("input[name='edts_ids_qita']").val(edts_ids_qita);
		}
		
		if(edts_ids_qitastatus!=""){
			tr.find("input[name='edts_ids_qitastatus']").val(edts_ids_qitastatus);
		}
		
		if(typeof(mews_score)!="undefined"){
			tr.find("input[name='mews_score']").val(mews_score);
		}
		if(typeof(edts_score)!="undefined"){
			tr.find("input[name='edts_score']").val(edts_score);
			
		}
		//评级描述保存
		
		
		var symtpomcon = $("#symptom").html();
		//清空
		if(symtpomcon==''){
			tr.find("input[name='quickgrade']").val('0');
			tr.find("input[name='edtsgrade']").val('0');
			tr.find("input[name='mewsgrade']").val('0');
			tr.find("input[name='autograde']").val('0');
			tr.find("input[name='finalgrade']").val('0');
			tr.find("input[name='changereason']").val('0');
			tr.find("input[name='reasondetail']").val('0');
			tr.find("span[name='grade']").html('分级');
			tr.find("span[name='grade']").prop("class","label label-sinple lg");
			tr.find("span[name='grade']").css({"padding":""})
		}
		tr.find("input[name='symtpomname']").html();
		tr.find("input[name='symtpomname']").val();
		tr.find("div[name='symtpomcon']").html(symtpomcon);
		var ttpfcon = $("#ttpf").html();
		tr.find("div[name='ttpfcon']").html(ttpfcon);
		var gcspfcon = $("#gcspf1").html();
		tr.find("div[name='gcspfcon']").html(gcspfcon);
		//改变 级数
    	var finalgrade = tr.find("input[name='finalgrade']").val();
    	if (finalgrade!="0"){
    		var name = getgradenamebygradeid(finalgrade);
    		var g = finalgrade.substring(finalgrade.length-1,finalgrade.length);
		    var grade_css = 'btn-'+g+'-selected';
		    var strhtml = "";
			switch(g)
			{
			    case '1':
			    	//alert(11);
			    	strhtml+='<button type="button" class="btn btn-1  btn-1-selected  "  >'+name+'</button>';
			        break;
			    case '2':
			    	strhtml+='<button type="button" class="btn btn-2  btn-2-selected  " >'+name+'</button>';
			        break;
			    case '3':
			    	strhtml+='<button type="button" class="btn btn-3 btn-3-selected  " >'+name+'</button>';
			        break;
			    case '4':
			    	strhtml+='<button type="button" class="btn btn-4  btn-4-selected  " >'+name+'</button>';
			        break;
			    case '5':
			    	strhtml+='<button type="button" class="btn btn-5  btn-5-selected  " >'+name+'</button>';
			        break;
			}
			tr.find("span[name='grade']").removeClass('label-sinple').css("padding","0");
		    tr.find("span[name='grade']").html(strhtml);
    	}else if(finalgrade=="0"&&autograde!="0"){
    		var name = getgradenamebygradeid(autograde);
    		var g = autograde.substring(autograde.length-1,autograde.length);
		    var grade_css = 'btn-'+g+'-selected';
		    var strhtml = "";
			switch(g)
			{
			    case '1':
			    	//alert(11);
			    	strhtml+='<button type="button" class="btn btn-1  btn-1-selected  "  >'+name+'</button>';
			        break;
			    case '2':
			    	strhtml+='<button type="button" class="btn btn-2  btn-2-selected  " >'+name+'</button>';
			        break;
			    case '3':
			    	strhtml+='<button type="button" class="btn btn-3 btn-3-selected  " >'+name+'</button>';
			        break;
			    case '4':
			    	strhtml+='<button type="button" class="btn btn-4  btn-4-selected  " >'+name+'</button>';
			        break;
			    case '5':
			    	strhtml+='<button type="button" class="btn btn-5  btn-5-selected  " >'+name+'</button>';
			        break;
			}
			tr.find("span[name='grade']").removeClass('label-sinple').css("padding","0");
		    tr.find("span[name='grade']").html(strhtml);
    	}
    	 setTimeout("$('#dosava').modal('hide')",2000);
    	 if($("#fenzhenpjb").css('display')=='block'){
    		 setTimeout("$('#fenzhenpjb').modal('hide')",3000);
 		 }else{
 			$('#fenzhenpjb').modal('hide');
 		 }
    	 
    	 reset();
	}
	
	//点击去除评分
	function clearGrade(btn){
		var p_id = $("#p_id").val();
		var tr = $("#"+p_id);
		var type_x = $(btn).attr("id");
		if(type_x=='mews_x'){
			$("#mews_a li").removeClass('active');
			$("#mews_b li").removeClass('active');
			$(".mews_score_A").text("0");
			$(".mews_score_B").text("0");
			$("#mewsgrade").val("");
			$("#mews_score_div").remove();
			$("#mews_score_div").remove();
			tr.find("input[name='mewsgrade']").val('0');
		}
		if(type_x=='edts_x'){
			$("#pf_b li").removeClass('active');
			$("#pf_c li").removeClass('active');
			$(".Score_B").text("0");
			$(".Score_C").text("15");
			$("#mewsgrade").val("");
			$("#last_score_div").remove();
			$("#last_score_div").remove();
			tr.find("input[name='edtsgrade']").val('0');
		}
		
		if(document.getElementById("mews_x")){
			getMewsScore();
		}
		if(document.getElementById("edts_x")){
			getTotalScore();
		}
		//再取所有评分表里等级最高的
	    var grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}
	//获取 评级方式按钮 确认 默认显示 主要评级方式
	function showPjfs(){
		$.ajax({
	        type: "post",
	        url: "#path()/divid/queryPjfs",
	        data:{
	        	system:'分诊'
	        },
	        dataType: "json",
	        async:false,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			var rows = result.rows;
	        			//$(".gradingWay").html("");
	        			$("#leftMenu").html("");
	            		var str ="" ;
	           	 		for(var i in rows){
	           	 			var name = rows[i]["ty_name"];
	           	 		    var tyid = rows[i]["ty_id"];
	           	 				if(i==0){
	           	 					str += " <li id="+tyid+" tyid="+tyid+" onclick='active4(this)' class='active' title='"+name+"'><i class='icon_treat'></i>";
	           	 				}else{
	           	 					str += " <li id="+tyid+" tyid="+tyid+" onclick='active4(this)' title='"+name+"'><i class='icon_treat'></i>";
	           	 				}
	           	 			    str += "<span>";
	           	 			    	
	           	 			   
	           	 				str+= name;
	           	 				str+= "</span></li>";
	           	 			//}
	           	 			//显示主要评分方式
	           	 			if(i==0){
	           	 			$('#defultpjfs').val(tyid);
	           	 			    if(tyid=='401'){
	           	 					//显示快速分级
	           	 					$('#quickgrade').show();
	           	 			    }else if(tyid=='408'){
	           	 			    	//显示EDTS
	           	 					$('#quickpf').show();
	           	 					//$('#last_score_div').show();
	           	 					$('#defultpjfs').val(tyid);
	           	 			    }else if(tyid=='406'){
	           	 					$('#mewspf').show();
	           	 				}else{
	           	 					$('#default').show();
	           	 				}
	           	 			   // $("#headerpingjb").text(name);
	           	 			}
	           	 		}
	           	 		//str += " <li id='404' tyid='404' onclick='active4(this)' title='GCS评分'><i class='icon_treat'></i><span>GCS评分</span></li>";
	           	 		//str += " <li id='402' tyid='402' onclick='active4(this)' title='疼痛评分'><i class='icon_treat'></i><span>疼痛评分</span></li>";
	            		$("#leftMenu").html(str);	 
	            		
	        		}
	        	}
	        },
	        error: function(){
	        }
	    });
	}
	
	function getSymptom1(pid,level){
		var level_name = $("#"+pid).find("a").html();
		var keywords = "";
		$.ajax({
	        type: "post",
	        url: "#path()/divid/getSymptom",
	        data:{
	       	 pid:pid,
	       	 level:level,
	       	keywords:keywords
	        },
	        dataType: "json",
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			$("#level").html("");
	        			var str = "";
	       	 			var list = result.rows;
	       	 			for(var i in list){
	       	 				var name = list[i]["name"].trim();
	       	 				var xxx = list[i]["id"];
	       	 				var grade = list[i]["grade"];
	       	 				str+="<li onclick='showSymptom(this,\""+xxx+"\",\"" + name + "\","+level+",\""+grade+"\","+pid+")'>"+name+"</li>"
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
			
			getSymptom1("0","1");
			$("#lv"+level).addClass('active').siblings().removeClass('active');
		}
		if(level==2){
			pid = $("#level_1_id").val();
			if(pid==""){
				toastr.warning("请先选择分类");
				return; 
			}else{
				getSymptom1(pid,"2");
				$("#lv"+level).addClass('active').siblings().removeClass('active');
			}
			
		}
		if(level==3){
			ppid = $("#level_1_id").val();
			pid = $("#level_2_id").val();
			if(ppid==""){
				//toastr.warning("请先选择分类");
				return; 
			}else if(pid==""){
				//toastr.warning("请先选择主诉");
				return; 
			}else{
				getSymptom1(pid,"3");
				$("#lv"+level).addClass('active').siblings().removeClass('active');
			}
			
		}
		
	}
	
	//选择快速分级 后显示等级
	//选择快速分级 后显示等级
	var describe = [];
	function showSymptom1(th,pid,name,level,grade,ppid){
		//ppid=父级id
		if($(th).attr("Class")!=null && $(th).attr("Class")=="active"){
			$(th).removeClass("active");
		}else{
			$(th).toggleClass("active").siblings().removeClass("active");
		}
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
			addResult();
			describe.push(pid);
			//让你点到挂也加不了重复元素，哈哈哈
//			if(describe.indexOf(pid) == -1){
//				alert(111);
//				addResult();
//				describe.push(pid);
//			}else{	
//				alert(describe.indexOf(pid));
//				addResult();
//				if(!$(th).hasClass("active")){
//					$("#symptom .alert").each(function(){
//						alert(22);
//						var closeId = $(this).find("button[type='button']").attr("id");					
//						if(closeId == pid){
//							$(this).remove();
//							describe.splice(describe.indexOf(pid),1);						
//						}
//					})
//				}				
//			}
			var p_id = $("#p_id").val();
			var tr = $("#" + p_id);
		    tr.find("input[name='quickgrade']").val(grade);
			//tiaozhuanfenji();
			var str = "<div class=\"alert alert-dismissable\">";
			str+= "<div class='result-level'>"+$("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name+"</div>";
			str+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearGrade(this);\" id=\""+pid+"\" ppid=\""+ppid+"\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>"				
		    str+= "</div>";
			function addResult(){
				var str = "<div class=\"alert alert-dismissable\">";
				str+= "<div class='result-level'>"+$("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name+"</div>";
				str+= "<button type=\"button\" class=\"close xxx1\" name='quickitem1' grade=\""+grade+"\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearQuick(this);\" id=\""+pid+"\" ppid=\""+ppid+"\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>"				
			    str+= "</div>";
			    var html = $("#symptom").html();
			    html = html +str;
			    $("#symptom").html(html);
			}
			    var p_id = $("#p_id").val();
				var tr = $("#"+p_id);
				var symtpomcon = tr.find("div[name='symtpomcon']").html();
				tr.find("div[name='symtpomcon']").html(str);
			 
				
				var id = $(th).attr("id");
				var xxx = [];
				$("button[name='quickitem']").each(function(i){
					if(id!=$(this).attr("id")){
						xxx.push($(this).attr("grade"));
					}
				});
				
				
				//是唯一评级 清空 自动评级 否则 按其他评级结果显示
				if(xxx.length>0){
					//先获取快速分级症状中等级最高的那个
					grade = min(xxx);
					   
					tr.find("input[name='quickgrade']").val(grade);
					
					//再取所有评分表里等级最高的
				    grade = getHigestGrade();
				    //展示自动评级
				    showAutoGrade(grade);
					saveGrade();
			    }else{
			    	tr.find("input[name='quickgrade']").val(grade);
			    	//展示自动评级
				    showAutoGrade(grade);
					saveGrade();
			    }
		}
		//$("#qc").hide();
	}
	function showSymptom(th,pid,name,level,grade,ppid){
		//ppid=父级id
		if($(th).attr("Class")!=null && $(th).attr("Class")=="active"){
			$(th).removeClass("active");
		}else{
			$(th).toggleClass("active").siblings().removeClass("active");
		}
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
			var p_id = $("#p_id").val();
			var tr = $("#" + p_id);
		    tr.find("input[name='quickgrade']").val(grade);
			
			//让你点到挂也加不了重复元素，哈哈哈
			if(describe.indexOf(pid) == -1){
				$(".xxx1").each(function() {
					if ($(this).attr("ppid") == ppid) {
						$(this).parent().remove();
					}
				});
				addResult();
				describe.push(pid);
			}else{	
				if(!$(th).hasClass("active")){
					$("#symptom .alert").each(function(){
						var closeId = $(this).find("button[type='button']").attr("id");					
						if(closeId == pid){
							$(this).remove();
							describe.splice(describe.indexOf(pid),1);						
						}
					})
				}				
			}			
			
			function addResult(){
				var str = "<div class=\"alert alert-dismissable\">";
				str+= "<div class='result-level'>"+$("#level_1_name").val()+"||"+$("#level_2_name").val()+"||"+ name+"</div>";
				str+= "<button type=\"button\" class=\"close xxx1\" data-dismiss=\"alert\" grade=\""+grade+"\" onclick=\"clearQuick(this);\" aria-hidden=\"true\" id=\""+pid+"\" ppid=\""+ppid+"\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>"				
			    str+= "</div>";
			    var html = $("#symptom").html();
			    html = html +str;
			    $("#symptom").html(html);
			}
			
			    var p_id = $("#p_id").val();
				
				var tr = $("#"+p_id);
				var old = tr.find("input[name='autograde']").val();
				
			    if(old=="0"||old>grade){
			    	tr.find("input[name='autograde']").val(grade);
			    	//var name = getgradenamebygradeid(grade);
			    	
			    	 var g = grade.substring(grade.length-1,grade.length);
					 var grade_css = 'btn-'+g+'-selected';
					    for(var i=1;i<6;i++){
							if(g!=i){
								$("#g1[value =\""+"100"+i+"\"]").removeClass("btn-"+i).removeClass("btn-"+i+"-selected").addClass("unused-btn");
							}else{
								$("#g1[value =\""+"100"+i+"\"]").removeClass("unused-btn");
						    	$("#g1[value =\""+"100"+i+"\"]").addClass("btn-"+i);
						    	$("#g1[value =\""+"100"+i+"\"]").addClass(grade_css);
							}
						}
			    }
			    var str = [];
				$("button[class='close xxx1']").each(function(i){
					if(id!=$(this).attr("id")){
						str.push($(this).attr("grade"));
					}
				});
				grade = min(str);
				tr.find("input[name='quickgrade']").val(grade);
				grade = getHigestGrade();
			    //展示自动评级
			    showAutoGrade(grade);
			    
		}		
	}
	
	function active4(btn){		
		//评级方式按钮点击效果
		
		if($(btn).is('.active')){
			
		}else{
			$(btn).addClass('active').siblings().removeClass('active');
			//$(btn).addClass('active').siblings().removeClass('active');
			var name = $(btn).find("span").text();
			var tyid = $(btn).attr("tyid");
			if(tyid=='401'){
				//显示快速分级
				$('#quickgrade').show().siblings().hide();
			}else if(tyid=='408'){
				//EDTS
				$('#quickpf').show().siblings().hide();
				//$('#last_score_div').show();
				//getTotalScore();
			}else if(tyid=='406'){
				//MEWS
				$('#mewspf').show().siblings().hide();
				
			}else if(tyid=='404'){
					//MEWS
				$('#gcspf').show().siblings().hide();
					
						
			}else if(tyid=='402'){
				//MEWS
				
				$('#painpf').show().siblings().hide();	
			}else{
				$('#default').show().siblings().hide();
			}
		}
	}
	
	
	function getgradenamebygradeid(id){
		var gradename="";
		var gradecolor="";
		$.ajax({
	        type: "post",
	        url: "#path()/divid/getGradeNameByGradeId",
	        data:{
	       	 gradeid:id
	        },
	        async:false,
	        dataType: "json",
	        success: function(result){
	       	 //填入信息
	        	if(result!=null){
	        		if(result.status==200){
	        			gradename=result.rows.gradename;
	        			gradecolor=result.rows.gradecolor;
	        		}else{
	        		}
	        	}
	        },
	        error: function(){
	       	 
	        }
	    });
		//return gradename+"|"+gradecolor;
		return gradename;
	}
	
	
	function active2(grade){
		
		if(fztj=="0"){
			$.messager.alert('提示','未配置手动调级权限<br>注：可在系统管理站配置');
			return;
		}
		
		
		var value = $(grade).attr("value");
		
		var g = value.substr(value.length-1,value.length);
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
			var p_id = $("#p_id").val();
			
			var tr = $("#"+p_id);
			tr.find("input[name='finalgrade']").val(value);
		}
	}
	
	//动态设置评级等级样式
function setgradebtncss() {
		$.ajax({
	        type: "post",
	        url: "#path()/divid/queryGradeset",
	        data:{
	        },
	        dataType: "json",
	        async:false,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			var list = result.rows;
	        			var style = document.createElement('style');
	    	    		style.type = 'text/css';
	    	    		var css = '.groupClass1 .btn,.groupClass2 .btn{margin-right:6px;}';
	    	    		var gradebtn1 = '';
	    	    		var gradebtn2 = '';
	       	 			for(var i in list){
	       	 				var ys_id = list[i]["ys_id"].toString();
	       	 				var grade_color = list[i]["grade_color"];
	       	 				var grade = ys_id.substring(ys_id.length-1,ys_id.length);
	       	 				css += '.btn-';
	       	 				css += grade;
	       	 				css += '{padding: 6px 24px;background:#efefef;color:#000';
	       	 				//css += grade_color;
	       	 				css += ';border:none';
	       	 				//css += grade_color;
	       	 				css += ';}';
	    	    			css += '.btn-';
	    	    			css += grade;
	    	    			css += ':hover,.btn-';
	    	    			css += grade;
	    	    			css += '-selected{background:';
	    	    			css += grade_color;
	    	    			css += ';color:#fff;}';
	       	 			}
	       	 			
	       	 			for(var i in list){
	   	 					var ys_id = list[i]["ys_id"].toString();
	   	 					var grade_name = list[i]["grade_name"].toString();
	   	 					var grade = ys_id.substring(ys_id.length-1,ys_id.length);
	   
							if (grade == '1') {
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-1" value="'+ys_id+'">'+grade_name+'</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-1" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
							}
							if (grade == '2') {
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-2" value="'+ys_id+'">'+grade_name+'</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-2" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
							}
							if (grade == '3') {
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-3" value="'+ys_id+'">'+grade_name+'</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-3" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
							}
							if (grade == '4') {
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-4" value="'+ys_id+'">'+grade_name+'</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-4" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
							}
							if (grade == '5') {
								gradebtn1 += '<button type="button" id="g1" class="btn  btn-5" value="'+ys_id+'">'+grade_name+'</button>';
								gradebtn2 += '<button type="button" id="g2" class="btn  btn-5" value="'+ys_id+'" onclick="active2(this);">'+grade_name+'</button>';
							}

						}
						style.innerHTML = css;
						document.getElementsByTagName('HEAD').item(0).appendChild(style);
						//console.log(gradebtn2);
						$(".groupClass1").html(gradebtn1);
						$(".groupClass2").html(gradebtn2);
						//console.log($(".groupClass2").html());
					} else {
						//默认颜色设置
						setdefultcss();
					}
	        	}
			},
			error : function() {
				//默认颜色设置
				setdefultcss();
			}
		});

	}
	
	function StringBuffer() {
	    this.__strings__ = new Array();
	}
	StringBuffer.prototype.append = function (str) {
	    this.__strings__.push(str);
	    return this;    //方便链式操作
	}
	
	StringBuffer.prototype.toString = function () {
	    return this.__strings__.join("");
	}
	
	function getSymptom(pid,level){
		/*$("#"+pid+"").addClass("activecc").siblings().removeClass("activecc");
		var level_name = $("#"+pid).find("a").html();
		$.ajax({
	        type: "post",
	        url: "#path()/divid/getSymptom",
	        data:{
	       	 pid:pid,
	       	 level:level
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		//console.log(result);
	        		if(result.status==200){
	        			
	        			var str = "";
	       	 			var list = result.rows;
	       	 			if(level=="1"){
	       	 				str += '<a  onclick="tiaozhuanfenji();" style="cursor:pointer;color:#000;">完整评级>></a>';
	       	 				str += '<li style="margin-bottom:5px;color:#fff;text-align:center;">快速分级></li>';
	       	 			}else if (level=="2"){
	       	 				str += '<li>主诉></li>';
	       	 				$("#level_1_name").val(level_name);
	       	 			}else if (level=="3"){
	       	 				str += '<li>评分依据></li>';
	       	 				$("#level_2_id").val(pid);
	       	 				$("#level_2_name").val(level_name);
	       	 			}
	       	 			
	       	 			for(var i in list){
	       	 				var name = list[i]["name"].trim();
	       	 				var id = list[i]["id"];
	       	 				var grade = list[i]["grade"];
	       	 				if(level=="1"){
	       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,2);"><a>' +name+'</a></li>';
	       	 				}else if (level=="2"){
	       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,3);"><a>' +name+'</a></li>';
	       	 				}else if(level=="3"){
		       	 				str+="<li id="+id+" class='btn-"+grade +"-selected' onclick='showSymptom1(this,\""+id+"\",\"" + name + "\","+level+",\""+grade+"\","+pid+")'><a style='color:#000 !important'>" +name+"</a></li>"
	       	 				}
	       	 			}
	       	 			if(level=="1"){
	       	 				$("#classify1").html("");
	       	 				$("#classify1").html(str);
	       	 			}else if(level=="2"){
	       	 				$("#classify2").html("");
	   	 					$("#classify2").html(str);
	   	 					$("#classify2").css({
	   	 						"height":"500px",
	   	 						"padding":"35px 15px 15px 0"
	   	 					})   	 					
	   	 					$("#classify2").show();
	       	 			}else if(level=="3"){
	       	 				$("#classify3").html("");
	       	 				$("#classify3").html(str);
		       	 			$("#classify3").css({
	   	 						"height":"500px",
	   	 						"padding":"35px 15px 15px 0"
	   	 					})
	   	 					$("#classify2").css("border-right","none");
	       	 				$("#classify3").show();
	       	 			}
	        		}
	        	}
	        },
	        error: function(){
	        }
	    });
*/
		$("#"+pid+"").addClass("activecc").siblings().removeClass("activecc");
		var level_name = $("#"+pid).find("a").html();
		var keywords = "";
		if(level=="1"){
			keywords = $("#seach_lv1").val();
		}else if (level=="2"){
			$("#level_1_id").val(pid);
			keywords = $("#seach_lv2").val();
		}else if (level=="3"){
			$("#level_2_id").val(pid);
			keywords = $("#seach_lv3").val();
		}
		$.ajax({
	        type: "post",
	        url: "#path()/divid/getSymptom",
	        data:{
	       	 pid:pid,
	       	 level:level,
	       	 keywords:keywords
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		//console.log(result);
	        		if(result.status==200){
	        			$("#wzqj").show();       			
	        			var str = "";
//	        			var quick='<a  onclick="tiaozhuanfenji();" style="cursor:pointer;color:#000;">完整评级>></a>';
	       	 			var list = result.rows;
	       	 			if(level=="1"){
	       	 				
//	       	 				$("#classify1").html(quick+$("#classify1").html());
//	       	 				if($("#classify1").html().indexOf("完整评级") == -1){
//	       	 				str += quick;
//	       	 				}
	       	 				
	       	 			}else if (level=="2"){
	       	 				$("#level_1_name").val(level_name);
	       	 			}else if (level=="3"){
	       	 				$("#level_2_name").val(level_name);
	       	 			}
	       	 			//计算下一等级是否只有一个
	       	 			var x = Array();
	       	 			var xx;
	       	 		
	       	 			for(var i in list){
	       	 				var name = list[i]["name"].trim();
	       	 				var id = list[i]["id"];
	       	 				var grade = list[i]["grade"];
	       	 				
	       	 				if(level=="1"){
	       	 				
	       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,2);"><a>' +name+'</a></li>';
	       	 				}else if (level=="2"){
	       	 					str += '<li id="'+id+'" onclick="getSymptom(&quot;'+id+'&quot;,3);"><a>' +name+'</a></li>';
	       	 				}else if(level=="3"){
	       	 					str += '<li id="'+id+'"  class="btn-'+grade +'-selected"   onclick="showSymptom1(this,&quot;'+id+'&quot;,&quot;' + name + '&quot;,&quot;'+level+'&quot;,&quot;'+grade+'&quot;,&quot;'+pid+'&quot;)"><a style="color:#000 !important">' +name+'</a></li>';
	       	 																			
	       	 					if(x.indexOf(grade)==-1){
		 							x.push(grade);
		 							xx = list[i];
		 						}	
	       	 				}
	       	 			}
	       	 			if(level=="1"){
//	       	 				str += '<li id="10000000001" class="addtype-input"><input type="text" maxlength="20" placeholder="自定义分类"></li>';
	       	 				$("#classify1 li").not(":first").remove(); 
	       	 				
	       	 				$("#classify1").append(str);
	       	 				$("#seach_lv2").val("");
	       	 				$("#seach_lv3").val("");
	       	 			}else if(level=="2"){
//	       	 			    str += '<li id="10000000002" class="addtype-input"><input type="text" maxlength="20" placeholder="自定义主诉"></li>';
	       	 				$("#classify2 li").not(":first").remove(); 
	   	 					$("#classify2").append(str);
	   	 					$("#classify2").show();
	   	 					$("#seach_lv3").val("");
	       	 			}else if(level=="3"){
	       	 				//如果第三级就一个 直接显示评级结果
	       	 				if(x.length==1){
	       	 					showGrade(x[0],xx.name,xx.id,pid);
	       	 					return;
	       	 				}
	       	 			   /* str += '<li id="10000000003" class="ksfjgrade-box clearfix"><input type="text" maxlength="20" placeholder="自定义评分依据">';
			   	 			str += '<button type="button" name="ksfjgrade" grade="1001" class="btn btn-xs">一级</button>';
			   				str += '<button type="button" name="ksfjgrade" grade="1002" class="btn btn-xs">二级</button>';
			   			    str += '<button type="button" name="ksfjgrade" grade="1003" class="btn btn-xs">三级</button>';
			   		        str += '<button type="button" name="ksfjgrade" grade="1004" class="btn btn-xs">四级</button>';
	       	 	            str += '<button type="button" onclick="zdyksfj();" class="btn btn-xs">></button></li>';*/
	       	 	            $("#classify3 li").not(":first").remove(); 
		 					$("#classify3").append(str);
	       	 				$("#classify2").css("border-right","none");
	       	 				$("#classify3").show();
	       	 			}
	       	 		//快速分级 查询
	       	 		$("#seach_lv1,#seach_lv2,#seach_lv3").bind("input propertychange", function(){  
	       	 			var id = $(this).attr("id");
	       	 			if(id=="seach_lv1"){
	       	 				getSymptom(0,1);
	       	 			}else if(id=="seach_lv2"){
	       	 				getSymptom($("#level_1_id").val(),2);
	       	 			}else if(id=="seach_lv3"){
	       	 				getSymptom($("#level_2_id").val(),3);
	       	 			}
	       	 		});
	        		}
	        	}
	        },
	        error: function(){
	        }
	    });
	}
	//动态设置评级等级样式
	function setgradebtncss3() {
		$.ajax({
	        type: "post",
	        url: "#path()/divid/queryGradeset",
	        data:{
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			var list = result.rows;
	        			var style = document.createElement('style');
	    	    		style.type = 'text/css';
	    	    		var css = '';
	    	    		var gradebtn1 = '';
	       	 			for(var i in list){
	       	 				var ys_id = list[i]["ys_id"].toString();
	       	 				var grade_color = list[i]["grade_color"];
	       	 				var grade = ys_id;
	       	 				css += '.btn-';
	       	 				css += grade;
	       	 				css += '{background:none;color:';
	       	 				css += grade_color;
	       	 				css += ';border:1px solid ';
	       	 				css += grade_color;
	       	 				css += ';}';
	    	    			css += '.btn-';
	    	    			css += grade;
	    	    			css += ':hover,.btn-';
	    	    			css += grade;
	    	    			css += '-selected{background:';
	    	    			css += grade_color;
	    	    			css += ' !important ;color:#fff !important;}';
	    	    			css += '.btn-';
	    	    			css += grade;
	    	    			css += '-selected a {color:#fff !important;}';
	       	 			}
	       	 			
	       	 			for(var i in list){
	   	 					var ys_id = list[i]["ys_id"].toString();
	   	 					var grade_name = list[i]["grade_name"].toString();
	   	 					var grade = ys_id.substring(ys_id.length-1,ys_id.length);
	   
							if (grade == '1') {
								gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
								gradebtn1 += '<div class="st-grade btn-1001-selected">';
								gradebtn1 += '<div>';
								gradebtn1 += '<p class="allocatNum" id="1001">'+grade_name+'</p>';
								gradebtn1 += '<p class="allocatUnit">级</p>';
								gradebtn1 += '</div></div></div>';   
							}
							if (grade == '2') {
								gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
								gradebtn1 += '<div class="st-grade btn-1002-selected">';
								gradebtn1 += '<div>';
								gradebtn1 += '<p class="allocatNum" id="1002">'+grade_name+'</p>';
								gradebtn1 += '<p class="allocatUnit">级</p>';
								gradebtn1 += '</div></div></div>';  
							}
							if (grade == '3') {
								gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
								gradebtn1 += '<div class="st-grade btn-1003-selected">';
								gradebtn1 += '<div>';
								gradebtn1 += '<p class="allocatNum" id="1003">'+grade_name+'</p>';
								gradebtn1 += '<p class="allocatUnit">级</p>';
								gradebtn1 += '</div></div></div>';  
							}
							if (grade == '4') {
								gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
								gradebtn1 += '<div class="st-grade btn-1004-selected">';
								gradebtn1 += '<div>';
								gradebtn1 += '<p class="allocatNum" id="1004">'+grade_name+'</p>';
								gradebtn1 += '<p class="allocatUnit">级</p>';
								gradebtn1 += '</div></div></div>';  
							}
							if (grade == '5') {
								gradebtn1 += '<div class="col-md-3 areaWarn2"  onclick="activeGrade(&quot;'+ys_id+'&quot;,&quot;'+grade_name+'&quot;)">';
								gradebtn1 += '<div class="st-grade btn-1005-selected">';
								gradebtn1 += '<div>';
								gradebtn1 += '<p class="allocatNum" id="1005">'+grade_name+'</p>';
								gradebtn1 += '<p class="allocatUnit">级</p>';
								gradebtn1 += '</div></div></div>';  
							}

						}
						style.innerHTML = css;
						document.getElementsByTagName('HEAD').item(0).appendChild(style);
						//console.log(style);
						$("#gradearea").html(gradebtn1);
						//console.log($(".groupClass2").html());
					} else {
						//默认颜色设置
						setdefultcss();
					}
	        	}
			},
			error : function() {
				//默认颜色设置
				setdefultcss();
			}
		});
	}
	
	
	function backGrade() {
		var p_id = $("#p_id").val();
		$('#fenzhenpjb').modal('hide');
    	reset();
    	if($("#addPatient").hasClass("active")){
	    	$('.classifyBox').show();
	    	//2019-4-19 yushim 移除自定义以前输入过的内容
	    	getSymptom("0","1");
	    }
	    if($("#events").hasClass("active")){
	    	$('.classifyBox').show();
	    	//2019-4-19 yushim 移除自定义以前输入过的内容
	    	getSymptom("0","1");
	    }
	    $('#classify2').hide();
	    $('#classify3').hide();
		$("#p_id").val(p_id);
	}
	
	function addResult1(name,pid,ppid){
		var str = "<div class=\"alert alert-dismissable\">";
		str+= "<div class='result-level'>"+ name+"</div>";
		str+= "<button type=\"button\" class=\"close xxx1\" data-dismiss=\"alert\"  aria-hidden=\"true\" id=\""+pid+"\" ppid=\""+ppid+"\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>"				
	    str+= "</div>";
	    var html = $("#symptom").html();
	    html = html +str;
	    $("#symptom").html(html);
	}
	
	//删除 快速评级时候
	function clearQuick(btn){
		var id = $("#p_id").val();
		var tr = $("#" + id);
		var grade = $(btn).attr("grade");
		var old = tr.find("input[name='autograde']").val();
		if (old == "0" || old > grade || !document.getElementById("mews_x")) {
			tr.find("input[name='autograde']").val(grade);
			var name = getgradenamebygradeid(grade);
			var g = grade.substring(grade.length - 1, grade.length);
			var grade_css = 'btn-' + g + '-selected';
			for ( var i = 1; i < 6; i++) {
				if (g != i) {
					$("#g1[value =\"" + "100" + i + "\"]").removeClass(
							"btn-" + i + "-selected");
				} else {
					$("#g1[value =\"" + "100" + i + "\"]").addClass(grade_css);
				}
			}

		}
		$(btn).parent().remove();
		var str = [];
		$("button[class='close xxx1']").each(function(i){
			if(id!=$(this).attr("id")){
				str.push($(this).attr("grade"));
			}
		});
		grade = min(str);
		tr.find("input[name='quickgrade']").val(grade);
//		console.log(str)
//		$("#quickgrade").val("");
//		//是唯一评级 清空 自动评级 否则 按其他评级结果显示
//		
//		if(str.length>0){
//			//先获取快速分级症状中等级最高的那个
//			grade = min(str);
//			   
//			$("#quickgrade").val(grade);
//			
//			//再取所有评分表里等级最高的
//		    grade = getHigestGrade();
//		    //展示自动评级
//		    showAutoGrade(grade);
//		}else{
//			
//			$("#atuogradearea").html("");
//			$("#atuogradearea").html("<div class='st-grade' style='height:64px'></div>");
//			
//			if($("#finalgrade").val()==""){
//				$("#grade").html("");
//			}
//		}
//		
//		if(checkalone("quickgrade")){
//			if($("#finalgrade").val()==""){
//				$("#grade").html("");
//			}
//			$("#atuogradearea").html("");
//			$("#atuogradearea").html("<div class='st-grade' style='height:64px'></div>");
//		}else{
//			//获取所有评分表里等级最高的
//		    grade = getHigestGrade();
//		    //展示自动评级
//		    showAutoGrade(grade);
//		}
		//再取所有评分表里等级最高的
	    grade = getHigestGrade();
	    //展示自动评级
	    showAutoGrade(grade);
	}
	
	//获取 最大等级 1001，1002，1003，1004
	function getHigestGrade(){
		var p_id = $("#p_id").val();

		var tr = $("#" + p_id);
		var str = [];
		if(tr.find("input[name='quickgrade']").val().trim()!="0"){
			str.push(tr.find("input[name='quickgrade']").val().trim());
		}
		if(tr.find("input[name='edtsgrade']").val().trim()!="0"){
			str.push(tr.find("input[name='edtsgrade']").val().trim());
		}
		if(tr.find("input[name='mewsgrade']").val().trim()!="0"){
			str.push(tr.find("input[name='mewsgrade']").val().trim());
		}
		
		return min(str);
	}

	//获取数组最小  数组长度为0 返回空值
	function min(arr){
		if(arr.length==0){
			return '';
		}
	    var num = arr[0];
	    for(var i=0;i<arr.length;i++){
	        if(num > arr[i]){
	            num = arr[i];
	        }
	    }
	    return num;
	}
	
	
	function checkalone(id){
		var str ="";
		var res = true;
		$("input[name='group']").each(function(i){
			   var id2 = $(this).attr("id");
			   if(id2!=id){
				   str +=  $(this).val();
			   }
		});
		
		if(str.length>0){
			res = false;
		}
		//alert(str);
		return res;
	}
	
	//显示评级等级
	function showAutoGrade(grade){
		var p_id = $("#p_id").val();
		var tr = $("#" + p_id);
		tr.find("input[name='autograde']").val(grade);				
		var name = getgradenamebygradeid(grade);
		var g = grade.substring(grade.length - 1, grade.length);
		var grade_css = 'btn-' + g + '-selected';
		for ( var i = 1; i < 6; i++) {
			if (g != i) {
				$("#g1[value =\"" + "100" + i + "\"]").removeClass(
						"btn-" + i + "-selected");
			} else {
				$("#g1[value =\"" + "100" + i + "\"]").addClass(grade_css);
			}
		}
	}

function getRowObj(obj) {
	var i = 0;
	while (obj.tagName.toLowerCase() != "tr") {
		obj = obj.parentNode;
		if (obj.tagName.toLowerCase() == "table")
			return null;
	}
	return obj;
} 

function add2(){
	var n=Number($("#addnum").val());
	var num = parseInt($("#numdiv").html());
	$("#num").val(num+n)
	$("#numdiv").html(num+n);
	//总共产生多少列
	var rownum = parseInt($("#rownum").val());
	$("#rownum").val(rownum+n);
		$.ajax({
	        type: "post",
	        url: "#path()/events/getIds",
	        data:{
	        	num:n
	        },
	        dataType: "json",
	        async:true,
	        success: function(result){
	        	if(result!=null){
	        		if(result.status==200){
	        			var total = result.total;
	        			var rows =  result.rows;
	        			var str = new StringBuffer();
	        			for(var i=0;i<total;i++){
							var id = rows[i];
							var tempstr = '\t\t\t    <div class="panel panel-info" id="'+id+'">\n' +
							'        <div class="panel-heading clearfix">\n' +
							'            <div class="panel-title-tf">\n' +
							'                <span>序号：'+(i+1)+'</span>\n' +
							'                <span>患者编号：'+id +'</span>\n' +
							'                <button type="button" class="btn btn-primary" id="fj'+id+'"   Userbehavior="A162" onclick="show(&quot;'+id+'&quot;);">分级</button>\n' +
							'            </div>\n' +
							'            <div class="pull-right">\n' +
							'                <button type="button" class="close" aria-label="Close" Userbehavior="A64" onclick="deleteshow(this,'+(id)+')">\n' +
							'                    <span aria-hidden="true" >\n' +
							'                        <img src="#path()/static/vendor/newpage/images/tfsj//delect_select.png" />\n' +
							'                    </span>\n' +
							'                </button>\n' +
							'            </div>\n' +
							'        </div>\n' +
							'        <div class="panel-body mypanel">\n' +
							'            <div class="row clearfix">\n' +
							'                <div class="mypanel-6 col-md-7">\n' +
							'                    <div class="col-md-3 col-sm-3 p0">\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">就诊卡号</label>\n' +
							'                            <div class="col-sm-8">\n' +
							'                                <input type="text" class="form-control" name="cardnum" placeholder="请输入">\n' +
							'                            </div>\n' +
							'                        </div>\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">出生日期</label>\n' +
							'                            <div class="col-sm-8">\n' +
							'                                <input type="text" class="form-control" name="age" placeholder="八位数字">\n' +
							'                            </div>\n' +
							'                        </div>\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">来院方式</label>\n' +
							'                            <select class="form-control" name="source">\n' +
							'                                <option value="自行来院">自行来院</option>\n' +
							'                                <option value="120">120</option>\n' +
							'                                <option value="110">110</option>\n' +
							'                                <option value="鄂州">鄂州</option>\n' +
							'                                <option value="院内">院内</option>\n' +
							'                                <option value="东院">东院</option>\n' +
							'                                <option value="固始">固始</option>\n' +
							'                                <option value="汉川">汉川</option>\n' +
							'                                <option value="钟祥">钟祥</option>\n' +
							'                            </select>\n' +
							'                        </div>\n' +
							'                    </div>\n' +
							'                    <div class="col-md-3 col-sm-3 p0">\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>\n' +
							'                            <div class="col-sm-8">\n' +
							'                                <input type="text" class="form-control" name="fullname" value="无名氏'+id+'">\n' +
							'                            </div>\n' +
							'                        </div>\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">费用</label>\n' +
							'                            <select class="form-control" name="category">\n' +
							'                                <option value="1">城镇职工基本医疗保险</option>\n' +
							'                                <option value="2">城镇居民基本医疗保险</option>\n' +
							'                                <option value="3">新型农村合作医疗</option>\n' +
							'                                <option value="4">贫困救助</option>\n' +
							'                                <option value="5">商业医疗保险</option>\n' +
							'                                <option value="6 ">全公费 </option>\n' +
							'                                <option selected value="7">全自费</option>\n' +
							'                            </select>\n' +
							'                        </div>\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">意识状态</label>\n' +
							'                            <select class="form-control" name="consciousness">\n' +
							'                                <option  value="清醒">清醒 </option>\n' +
							'                                <option  value="昏迷">昏迷 </option>\n' +
							'                                <option  value="谵妄">谵妄 </option>\n' +
							'                                <option  value="嗜睡">嗜睡 </option>\n' +
							'                                <option  value="昏睡">昏睡 </option>\n' +
							'                            </select>\n' +
							'                        </div>\n' +
							'                    </div>\n' +
							'                    <div class="col-md-6 col-sm-6 p0">\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">性别</label>\n' +
							'                            <div class="col-sm-10 p0 selectGender">\n' +
								'								<a class="gender-man"></a>\n' +
								'								<a class="gender-woman"></a>\n' +
								'								<input type="text" style="display:none" name="gender" placeholder="" value="">\n' +
							'                            </div>\n' +
							'                        </div>\n' +
							'                        <div class="oneline">\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">来源</label>\n' +
							'                            <select class="form-control">\n' +
							'                                <option value="步行">步行</option>\n' +
							'                                <option value="扶走">扶走</option>\n' +
							'                                <option value="轮椅">轮椅</option>\n' +
							'                                <option value="平车">平车</option>\n' +
							'                            </select>\n' +
							'                        </div>\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">分诊去向</label>\n' +
							'                            <select class="form-control">\n' +
							'                                <option value="2">急诊外科</option>\n' +
							'                                <option value="3">急诊神经内科</option>\n' +
							'                                <option value="4">急诊妇科</option>\n' +
							'                                <option value="5">急诊产科</option>\n' +
							'                                <option value="6">急诊皮肤科</option>\n' +
							'                                <option value="7">急诊耳鼻喉科</option>\n' +
							'                                <option value="8">急诊眼科</option>\n' +
							'                                <option value="9">急诊口腔科</option>\n' +
							'                                <option value="10">急诊精神科</option>\n' +
							'                                <option value="39">急诊内科</option>\n' +
							'                            </select>\n' +
							'                        </div>\n' +
							'                        </div>\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-2 control-label">既往病史</label>\n' +
							'                            <select class="form-control">\n' +
							'                                <option value="COPD">COPD</option>\n' +
							'                                <option value="冠心病">冠心病</option>\n' +
							'                                <option value="高血压">高血压</option>\n' +
							'                                <option value="哮喘">哮喘</option>\n' +
							'                                <option value="其他">其他</option>\n' +
							'                            </select>\n' +
							'                        </div>\n' +
							'                    </div>\n' +
							'                </div>\n' +
							'                <div class="mypanel-3 col-md-3">\n' +
							'                    <div class="col-md-6 p0">\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-3 control-label">无创血压</label>\n' +
							'                            <div class="form-list">\n' +
							'                                <div class="col-md-5 p0"><input type="text" class="form-control text-center input-text"\n' +
							'                                        name="ssy" placeholder="请输入" maxlength="3"  value=""></div>\n' +
							'                                <div class="col-md-2 p0">/</div>\n' +
							'                                <div class="col-md-5 p0"><input type="text" class="form-control text-center input-text"\n' +
							'                                        name="szy" placeholder="请输入" maxlength="3" value=""></div>\n' +
							'                            </div>\n' +
							'                        </div>\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-3 control-label">心率</label>\n' +
							'                            <div class="col-sm-8">\n' +
							'                                <input type="text" class="form-control" name="maibo">\n' +
							'                            </div>\n' +
							'                        </div>\n' +
							'                    </div>\n' +
							'                    <div class="col-md-6 p0">\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-3 control-label">呼吸频率</label>\n' +
							'                            <div class="col-sm-8">\n' +
							'                                <input type="text" class="form-control"  name="huxi">\n' +
							'                            </div>\n' +
							'                        </div>\n' +
							'                        <div class="form-group">\n' +
							'                            <label for="inputEmail3" class="col-sm-3 control-label">体温</label>\n' +
							'                            <div class="col-sm-8">\n' +
							'                                <input type="text" class="form-control" name="tiwen">\n' +
							'                            </div>\n' +
							'                        </div>\n' +
							'                    </div>\n' +
							'                </div>\n' +
							'                <div class="mypanel-1 col-md-2">\n' +
							'                    <textarea class="form-control" rows="2" placeholder="填写备注" name="zhusu"></textarea>\n' +
							'                </div>\n' +
							'            </div>\n' +
							'        </div>\n' +
							'    </div>'
						
	        				//拼接行
// 	        				str.append('<tr class="border-no" id="'+id+'" >');
// 	        				str.append('<td  ><span class="td_center" name="xuhao">'+(i+1+num)+'</span></td>');
// //	        				str.append('<td>'+(num+1)+'<br/><div onclick="removeRow(this);">-</div></td>');
// 	        				str.append('<td><input type="text" class="form-control text-center input-text" name="cardnum"  ></td>');
// 	        				str.append('<td><div class="form-list"><input class="form-control text-center input-text" type="text" maxlength="32" name="fullname" value="无名氏'+id+'" placeholder=""></div></td>');
// 	        				str.append('<td>');
// 	        				str.append('<select class="form-control " name="gender">');
// 	        				str.append('<option value="未说明">未说明</option>');
// 	        				str.append('<option value="男">男</option>');
// 							str.append('<option value="女">女</option>');
// 							str.append('</select>');
// 						    str.append('</td>');
// 						    str.append('<td><div class="age">');
// 						    str.append('<div class="col-md-13 input-read"><input type="text" class="form-control text-center input-text"  name="age" placeholder="八位数字" value=""></div>');
// 						    str.append('</div></td>');
// 						    str.append('<td>');
// 	        				str.append('<select class="form-control " name="category">');
// 	        				str.append('<option value="1">城镇职工基本医疗保险</option>');
// 	        				str.append('<option value="2">城镇居民基本医疗保险</option>');
// 							str.append('<option value="3">新型农村合作医疗</option>');
// 							str.append('<option value="4">贫困救助</option>');
// 	        				str.append('<option value="5">商业医疗保险</option>');
// 							str.append('<option value="6 ">全公费 </option>');
// 							str.append('<option selected value="7">全自费</option>');
// 							str.append('</select>');
// 						    str.append('</td>');
// 						    str.append('<td class="new-colstd">');
// 	        				str.append('来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源<select class="form-control " name="source">');
// 	        				str.append('<option value="">选择</option>');
// 	        				str.append('<option value="自行来院">自行来院</option>');
// 	        				str.append('<option value="120">120</option>');
// 							str.append('<option value="110">110</option>');
// 							str.append('<option value="鄂州">鄂州</option>');
// 	        				str.append('<option value="院内">院内</option>');
// 							str.append('<option value="东院">东院</option>');
// 							str.append('<option value="固始">固始</option>');
// 							str.append('<option value="汉川">汉川</option>');
// 							str.append('<option value="钟祥">钟祥</option>');
// 							str.append('</select><br />');
// 							str.append('来院方式<select class="form-control " name="lyfs">');
// 	        				str.append('<option value="">选择</option>');
// 	        				str.append('<option value="步行">步行</option>');
// 	        				str.append('<option value="扶走">扶走</option>');
// 							str.append('<option value="轮椅">轮椅</option>');
// 							str.append('<option value="平车">平车</option>');
// 							str.append('</select><br />');
// 							str.append('意识状态<select class="form-control " name="consciousness">');
// 	        				str.append('<option value="">选择</option>');
// 	        				str.append('<option value="清醒">清醒</option>');
// 	        				str.append('<option value="昏迷">昏迷</option>');
// 							str.append('<option value="谵妄">谵妄</option>');
// 							str.append('<option value="嗜睡">嗜睡</option>');
// 							str.append('<option value="昏睡">昏睡</option>');
// 							str.append('</select><br />');
// 							str.append('既往病史<input type="text" class="form-control label-history text-center" name="history" readonly value="请选择" id="history_'+(i+1)+'" onclick="history(this)">');
// 	        				str.append('<input type="hidden"  name="hide"   >');
// 	        				str.append('<div class="historyList" id="'+(i+1)+'">');
// 	        				str.append('<p style="padding-left:2%;border-bottom:solid 1px #ccc;"><button type="button" class="btn" data-id="1">无</button></p>');
// 	        				str.append('<p class="text-center"><button type="button" class="btn" data-id="2">糖尿病</button>');
// 							str.append('<button type="button" class="btn" data-id="3">COPD</button>');
// 							str.append('<button type="button" class="btn" data-id="4">冠心病</button>');
// 							str.append('<button type="button" class="btn" data-id="5">高血压</button>');
// 							str.append('<button type="button" class="btn" data-id="6">哮喘</button>');
// 							str.append('<button type="button" class="btn" data-id="7">其他</button></p>');
// 							str.append('<p class="other-txt"><input type="text" class="form-control formOther form-text" name="other" id="other_'+(i+1)+'" value=""></p>');
// 							str.append('</div>');
// 						    str.append('</td>');
// 						    str.append('</td>');
						    
				           
	        				
// 	        				str.append('<td><div class="form-list">');
// 	        				str.append('<div class="col-md-5 p0"><input type="text" class="form-control text-center input-text" name="ssy"  placeholder="请输入" maxlength="3" value=""></div>');
// 	        				str.append('<div class="col-md-2 p0">/</div>');
// 	        				str.append('<div class="col-md-5 p0"><input type="text" class="form-control text-center input-text" name="szy" placeholder="请输入" maxlength="3" value=""></div>');
// 	        				str.append('</div></td>');
// 	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text"  name="maibo" placeholder="请输入" maxlength="3" value=""></div></td>');
// 	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text"  name="huxi" placeholder="请输入" maxlength="3" value=""></div></td>');
// 	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text"  name="tiwen" placeholder="请输入" maxlength="4" value=""></div></td>');
// 	        				str.append('<td><div class="form-list">');
// 	        				str.append('<input type="hidden"  value="0" name="autograde">');
// 	        				str.append('<input type="hidden"  value="0" name="finalgrade">');
// 	        				str.append('<input type="hidden"  value="0" name="edtsgrade">');
// 	        				str.append('<input type="hidden"  value="0" name="mewsgrade">');
// 	        				str.append('<input type="hidden"  value="0" name="quickgrade">');
// 	        				str.append('<input type="hidden"  value="0" name="dividtime">');
// 	        				str.append('<input type="hidden"  value="0" name="dividtime">');
// 	        				str.append('<input type="hidden"  value="0" name="changereason">');
// 	        				str.append('<input type="hidden"  value="0" name="reasondetail">');
// 	        				str.append('<input type="hidden"  value="0" name="edts_ids_qita">');
// 	        				str.append('<input type="hidden"  value="0" name="edts_ids_qitastatus">');
// 	        				str.append('<input type="hidden"  value="0" name="edts_ids">');
// 	        				str.append('<input type="hidden"  value="0" name="mews_ids">');
// 	        				str.append('<input type="hidden"  value="0" name="mews_score">');
// 	        				str.append('<input type="hidden"  value="0" name="edts_score">');
// 	        				str.append('<input type="hidden"  value="0" name="symtpomid">');
// 	        				str.append('<input type="hidden"  value="0" name="gcs">');
// 	        				str.append('<input type="hidden"  value="0" name="pain">');
// 	        				str.append('<input type="hidden"  value="0" name="symtpomname">');
// 	        				str.append('<div  name="symtpomcon" style="display: none"></div>');
// 	        				str.append('<div  name="ttpfcon" style="display: none"></div>');
// 	        				str.append('<div  name="gcspfcon" style="display: none"></div>');
// 	        				str.append('<span name="grade" id="fj'+id+'" class="label label-sinple lg" Userbehavior="A162" onclick="show(&quot;'+id+'&quot;);">分级</span></div></td>');
// 	        				str.append('<td>');
// 	        				str.append('<select class="form-control " name="chooseDepart">');
// 	        				str.append('<option value="">选择</option>');
// 	        				str.append('<option value="2">急诊外科</option>');
// 	        				str.append('<option value="3">急诊神经内科</option>');
// 							str.append('<option value="4">急诊妇科</option>');
// 							str.append('<option value="5">急诊产科</option>');
// 							str.append('<option value="6">急诊皮肤科</option>');
// 							str.append('<option value="7">急诊耳鼻喉科</option>');
// 	        				str.append('<option value="8">急诊眼科</option>');
// 							str.append('<option value="9">急诊口腔科</option>');
// 							str.append('<option value="10">急诊精神科</option>');
// 							str.append('<option value="39">急诊内科</option>');
// 							str.append('</select>');
// 						    str.append('</td>');		
// 	        				str.append('<td><div class="form-list"><input type="text" class="form-control text-center input-text" name="zhusu" placeholder="请输入" value=""></div></td>');
// 	        				str.append('<td Userbehavior="A64" onclick="deleteshow(this,'+(id)+')" ><i class="fa fa-trash-o delete" data-toggle="modal" ></td>');
// 	        				str.append('</tr>');
							str.append(tempstr)
	        			}
	        			//console.log(result);
	        			$("#tbody").append(str.toString());
	        			$("#save").show();
	        			$("#btn-add").show();
	        			//单项选择按钮
	        			$(".single-radio li input[type='radio']").each(function() {
	        				$(this).click(function() {
	        					if($(this).is(":checked")) {
	        						$(this).parent().siblings("li").find("label").removeClass("pitch");
	        						$(this).siblings("label").addClass("pitch");
	        					}
	        				})
	        			})
	        			//性别选择
						$(".selectGender>a").click(function(){
							debugger
							$(this).addClass("active").siblings().removeClass("active")
							if($(this).hasClass("gender-man")){
								$(this).siblings("input").val("男")
							}else{
								$(this).siblings("input").val("女")
							}
						})
	        			var hei1 = $(".titbox").height();
	        			var hei2 = $(".table-outburst2").height();       			
	        			if(hei1>hei2){
	        				$(".breadcrumb,.table-head,.table-outburst1").css("width","99%");
	        			}
	        			$(".titbox tbody tr td").each(function(){
	        				var dd = $(this).index();
	        				if(dd != 1){
		        				if($(this).find(".form-control").length >0){
		        					$(this).css({
		        						"line-height":"initial",
		        					    "padding-top":"12px"	        					
		        					});
		        				}
	        				}else{
	        					$(this).css({
	        						"line-height":"initial"	        					    	        					
	        					});
	        				}
	        			})
	        			setTable();	    		
	        			$("#addnum").val('1');
	        			historyShow();
	        		}
	        	}
			
	        	if(parseInt(num)>100){
	        		// 遮罩层消失  
	        		closeLoading(); 
	    		}
	        },
			error : function() {
				if(parseInt(num)>100){
					// 遮罩层消失  
					closeLoading(); 
				}
			}
		});
}
var row ;
var delxuhaotemp;
function deleteshow(obj,delxuhao) {
	var num = $("#tbody tr").length;     //获取tr的长度
	row = obj;
	delxuhaotemp = delxuhao
	var trr = $("#"+delxuhao);
	delxuhao = trr.find("span[name='xuhao']").html();
	$("#delxuhao").html(delxuhao);
	$("#delete").modal();
}
function removerow() {
	$("#numdiv").html($("#numdiv").html() - 1);
	$("#num").val($("#numdiv").val() - 1);
	var tr = $("#"+delxuhaotemp)
	if (tr != null) {
		tr.remove();
	}
	var num = $("#tbody panel").length; // 获取tr的长度
	for ( var i = 0; i <= num; i++) { // 进行循环
		$("#tbody panel .td_center").eq(i).html(i + 1);
	}
}
function addListShow() {
	$("#nownum").html($("#numdiv").html());
	$("#addList").modal();
}
//减
function reduce() {
	var addnum =$("#addnum").val();
	if(addnum>0){
		$("#addnum").val(addnum-1);
	}
}
//加
function plus() {
	var addnum =Number($("#addnum").val());
	$("#addnum").val(addnum+1);
}

function showreset() {
	$("#clear").modal();
}
/* 根据出生日期算出年龄 */
function jsGetAge(age,strBirthday){
	//手动输入修改年不满10位的问题，liuxj20190610
	if(strBirthday.length<10){
		return'';
	}
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
    var monthiDiff = nowMonth - birthMonth;
    var dayDiff = nowDay - birthDay;//日之差
    if(ageDiff > 2){
    	if(monthiDiff<0){
    		ageDiff = ageDiff-1;
    	}
    	if(monthiDiff==0 && dayDiff<0){
    		ageDiff = ageDiff-1;
    	}
    	return ageDiff+"岁";
    }else{
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

function set_select_checked(selectId, checkValue){  
    var select = document.getElementById(selectId);  

    for (var i = 0; i < select.options.length; i++){  
        if (select.options[i].value == checkValue){  
            select.options[i].selected = true;  
            break;  
        }  
    }  
}
$(".dropdown-toggle").click(function(){
	var display =$(".dropdown-menu-right").css('display');
	if(display=='block'){
		$(".dropdown-menu-right").css("display","none");
	}else{
		$(".dropdown-menu-right").css("display","block");
	}
	});

//自定义快速分级确认键
function zdyksfj(){
	//初始化校验
	$("#10000000001").find("input[type='text']").css("border-color","");
	$("#10000000002").find("input[type='text']").css("border-color","");
	$("#10000000003").find("input[type='text']").css("border-color","");
	
	var one = "";
	var two = "";
	var three = "";
	var allcheck = false;
	
	toastr.clear();
	
	if($("#level_1_name").val()!=""){
		one = $("#level_1_name").val();
	}else if($("#10000000001").find("input[type='text']").val().trim()!=""){
		one = $("#10000000001").find("input[type='text']").val();
	}else{
		$("#10000000001").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入快速分级的自定义内容！")
		allcheck = true;
	}
	
	if($("#level_2_name").val()!=""){
		two = $("#level_2_name").val();
	}else if($("#10000000002").find("input[type='text']").val().trim()!=""){
		two = $("#10000000002").find("input[type='text']").val();
	}else{
		$("#10000000002").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入主诉的自定义内容！")
		allcheck = true;
	}
	
	var confirm = false;
	if($("#10000000003").find("input[type='text']").val().trim()==""){
		$("#10000000003").find("input[type='text']").css("border-color","red");
		toastr.warning("请输入评分依据内容！");
		allcheck = true;
	}
	if($("#10000000003").find("[name='ksfjgrade'][class*=selected]").length==0){
		$("#10000000003").find("[name='ksfjgrade']").css("border-color","red");
		toastr.warning("请选择自定义级别！");
		allcheck = true;
	}
	if(allcheck){
		return;
	}
	var zdyksfjgrade=$("#10000000003").find("[name='ksfjgrade'][class*=selected]").attr("grade");
	
	var zdyksfjgradename = zdyksfjgrade.substring(3,4)+"级";
	
	three = $("#10000000003").find("input[type='text']").val();
	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	str1+= "<button type=\"button\" class=\"close xxx\" data-dismiss=\"alert\" aria-hidden=\"true\"  name='quickitem' grade=\""+zdyksfjgrade+"\" onclick=\"clearQuick(this)\" parentid='' zdyid='10000000003'>×</button><span>";
	
	if(two!=""){
		two+=" | ";
	}
	if(one!=""){
		one+=" | ";
	}
	str1+= one + two + three+" "+zdyksfjgradename;
    str1+= "</span></div>";
    var html1 = $("#symptom").html();
	if (html1.trim().length == 0) {
		html1 = html1 + str1;
		$("#symptom").html(html1);
	} else {
		html1 = $("#symptom").html();
		html1 = html1 + str1;
		$("#symptom").html(html1);
	}
}
function clear_val(th){
	$(th).val('');
}