$(document)
		.ready(
				function() {
					// GCS选中
					$(".review .radiobox")
							.click(
									function() {
										$(this).find("input[type='radio']")
												.attr("checked", true).parents(
														".radiobox").siblings()
												.find("input[type='radio']")
												.attr("checked", false);
										$(this)
												.find("input[type='radio']")
												.attr(
														"value",
														$(this)
																.find(
																		"input[type='radio']")
																.val());
										$(this).addClass("active1").siblings()
												.removeClass("active1");
										var index = $(this).index();
										$(this)
												.parents(".review")
												.find(".disease p")
												.each(
														function() {
															var i = $(this)
																	.index();
															if (i == index) {
																$(this)
																		.addClass(
																				"active1")
																		.siblings()
																		.removeClass(
																				"active1");
															}
														})
									})

					$(".review .disease p")
							.click(
									function() {
										$(this).addClass("active1").siblings()
												.removeClass("active1");
										var index = $(this).index();
										$(this)
												.parents(".review")
												.find(".disease2 .radiobox")
												.each(
														function() {
															var i = $(this)
																	.index();
															if (i == index) {
																$(this)
																		.find(
																				"input[type='radio']")
																		.attr(
																				"checked",
																				true)
																		.parents(
																				".radiobox")
																		.siblings()
																		.find(
																				"input[type='radio']")
																		.attr(
																				"checked",
																				false);
																$(this)
																		.addClass(
																				"active1")
																		.siblings()
																		.removeClass(
																				"active1");
															}
														})
									})

				})

function addGCS(GCS, val) {
	var GCS_1 = $("#GCS_1").val();
	var GCS_2 = $("#GCS_2").val();
	var GCS_3 = $("#GCS_3").val();
	if (GCS == 'GCS_1') {
		GCS_1 = val;
		$("#GCS_1").val(val);
	}
	if (GCS == 'GCS_2') {
		GCS_2 = val;
		$("#GCS_2").val(val);
	}
	if (GCS == 'GCS_3') {
		GCS_3 = val;
		$("#GCS_3").val(val);
	}
	$("#GCS_Score").html(parseInt(GCS_2) + parseInt(GCS_3) + parseInt(GCS_1));
	var gcsScore = $("#GCS_Score").html();
	$("#gcspf1").html('');

	var str = "<div class=\"alert alert-dismissable\" id=\"gcs_div\">";
	str += "<div class='result-level'>GCS评分: <span id=\"gcs_score\">"
			+ gcsScore + "分</span></div>";
	str += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"clearGCS();\" id=\"pain_x\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>";
	str += "</div>";

	//	var str1 = "<div class=\"alert alert-dismissable symptom\">";
	//	str1+= "<button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-hidden=\"true\" id=\""+"疼痛评分:"+painScore+"分"+"\" onclick=\"clearPain()\"><i class=\"glyphicon glyphicon-remove-circle\"></i></button>";
	//	str1+= "疼痛评分:"+painScore+"分";
	//    str1+= "</div>";
	var html1 = $("#gcspf1").html();
	html1 = html1 + str;
	$("#gcspf1").html(html1);
}
function clearGCS() {
	$("#GCS_Score").html(0);
	$("#gcspf1").html('');
}
