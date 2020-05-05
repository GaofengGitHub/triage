$(document).ready(function() {
	initIcd();
})
function addRoleAnd(){
		var strhtml="";
		strhtml+='<div class="role-list-item role-list-item-and clearfix">';
		strhtml+='<div class="role-line">且<i></i></div>';
		strhtml+='<select><option value="选择页面">选择页面</option><option value="分诊首页">分诊首页</option><option value="患者分诊页">患者分诊页</option><option value="抢救首页">抢救首页</option><option value="抢救护理记录页">抢救护理记录页</option><option value="抢救评级页">抢救评级页</option><option value="抢救措施流程页">抢救措施流程页</option><option value="留观首页">留观首页</option><option value="急诊电子病历页">急诊电子病历页</option><option value="留观患者综合信息页">留观患者综合信息页</option></select>';
		strhtml+='<select><option value="选择字段">选择字段</option><option value="患者性别">患者性别</option><option value="患者年龄">患者年龄</option><option value="患者缴费方式">患者缴费方式</option><option value="患者来院方式">患者来院方式</option><option value="绿色通道进入条件">绿色通道进入条件</option><option value="意识状态">意识状态</option><option value="既往史">既往史</option><option value="身高">身高</option><option value="体重">体重</option><option value="收缩压">收缩压</option><option value="舒张压">舒张压</option><option value="脉搏">脉搏</option><option value="体温">体温</option><option value="快速分级判断依据">快速分级判断依据</option><option value="疼痛评分">疼痛评分</option><option value="分诊去向">分诊去向</option></select>';
		strhtml+='<select><option value="=">=</option><option value="＞">＞</option><option value="≥">≥</option><option value="＜">＜</option><option value="≤">≤</option><option value="数值范围">数值范围</option></select>';
		strhtml+='<input type="text" placeholder="输入阈值" />';
		strhtml+='<button class="btn btn-outline btn-primary" onclick="addRoleOr02(this)">添加（或）</button>';
		strhtml+='</div>';
		$(".role-list-and-add").append(strhtml);		
}
function addRoleOr(){
		var strhtml="";
		strhtml+='<div class="role-list-item role-list-item-or clearfix">';
		strhtml+='<span>或</span>';
		strhtml+='<select><option value="选择页面">选择页面</option><option value="分诊首页">分诊首页</option><option value="患者分诊页">患者分诊页</option><option value="抢救首页">抢救首页</option><option value="抢救护理记录页">抢救护理记录页</option><option value="抢救评级页">抢救评级页</option><option value="抢救措施流程页">抢救措施流程页</option><option value="留观首页">留观首页</option><option value="急诊电子病历页">急诊电子病历页</option><option value="留观患者综合信息页">留观患者综合信息页</option></select>';
		strhtml+='<select><option value="选择字段">选择字段</option><option value="患者性别">患者性别</option><option value="患者年龄">患者年龄</option><option value="患者缴费方式">患者缴费方式</option><option value="患者来院方式">患者来院方式</option><option value="绿色通道进入条件">绿色通道进入条件</option><option value="意识状态">意识状态</option><option value="既往史">既往史</option><option value="身高">身高</option><option value="体重">体重</option><option value="收缩压">收缩压</option><option value="舒张压">舒张压</option><option value="脉搏">脉搏</option><option value="体温">体温</option><option value="快速分级判断依据">快速分级判断依据</option><option value="疼痛评分">疼痛评分</option><option value="分诊去向">分诊去向</option></select>';
		strhtml+='<select><option value="=">=</option><option value="＞">＞</option><option value="≥">≥</option><option value="＜">＜</option><option value="≤">≤</option><option value="数值范围">数值范围</option></select>';
		strhtml+='<input type="text" placeholder="输入阈值" />';
		strhtml+='<a href="javascript:void(0);" onclick="delRoleOr(this)" class="del-role-list-item">&times;</a>';
		strhtml+='</div>';
		$(".role-list-defaut").after(strhtml);		
}
function delRoleOr(e){
	$(e).parent(".role-list-item").remove();
}
function addRoleOr02(e){
	var strhtml="";
	strhtml+='<div class="role-list-item role-list-item-or clearfix">';
	strhtml+='<span>或</span>';
	strhtml+='<select><option value="选择页面">选择页面</option><option value="分诊首页">分诊首页</option><option value="患者分诊页">患者分诊页</option><option value="抢救首页">抢救首页</option><option value="抢救护理记录页">抢救护理记录页</option><option value="抢救评级页">抢救评级页</option><option value="抢救措施流程页">抢救措施流程页</option><option value="留观首页">留观首页</option><option value="急诊电子病历页">急诊电子病历页</option><option value="留观患者综合信息页">留观患者综合信息页</option></select>';
	strhtml+='<select><option value="选择字段">选择字段</option><option value="患者性别">患者性别</option><option value="患者年龄">患者年龄</option><option value="患者缴费方式">患者缴费方式</option><option value="患者来院方式">患者来院方式</option><option value="绿色通道进入条件">绿色通道进入条件</option><option value="意识状态">意识状态</option><option value="既往史">既往史</option><option value="身高">身高</option><option value="体重">体重</option><option value="收缩压">收缩压</option><option value="舒张压">舒张压</option><option value="脉搏">脉搏</option><option value="体温">体温</option><option value="快速分级判断依据">快速分级判断依据</option><option value="疼痛评分">疼痛评分</option><option value="分诊去向">分诊去向</option></select>';
	strhtml+='<select><option value="=">=</option><option value="＞">＞</option><option value="≥">≥</option><option value="＜">＜</option><option value="≤">≤</option><option value="数值范围">数值范围</option></select>';
	strhtml+='<input type="text" placeholder="输入阈值" />';
	strhtml+='<a href="javascript:void(0);" onclick="delRoleOr(this)" class="del-role-list-item">&times;</a>';
	strhtml+='</div>';
	$(e).parents(".role-list-item-and").after(strhtml);		
}
function addPage(){
	var strhtml="";
	strhtml+='<div class="intellDia-table03-list clearfix">';
	strhtml+='<select><option value="选择页面">选择页面</option><option value="分诊首页">分诊首页</option><option value="患者分诊页">患者分诊页</option><option value="抢救首页">抢救首页</option><option value="抢救护理记录页">抢救护理记录页</option><option value="抢救评级页">抢救评级页</option><option value="抢救措施流程页">抢救措施流程页</option><option value="留观首页">留观首页</option><option value="急诊电子病历页">急诊电子病历页</option><option value="留观患者综合信息页">留观患者综合信息页</option></select>';
	strhtml+='<select><option value="选择操作">选择操作</option><option value="进入/刷新页面">进入/刷新页面</option><option value="关闭页面">关闭页面</option><option value="新增">新增</option><option value="暂存">暂存</option><option value="保存">保存</option><option value="采集数据">采集数据</option><option value="诊断">诊断</option></select>';
	strhtml+='<a href="javascript:void(0);" onclick="delPage(this)" class="del-role-list-item">&times;</a>';
	strhtml+='</div>';
	$(".intellDia-table03-list-box").append(strhtml);		
}
function delPage(e){
	$(e).parents(".intellDia-table03-list").remove();
}

function initIcd(){
	$("#reason11").typeahead({
		minLength: 0,//键入字数多少开始补全
        source: function (query, process) {
            $.ajax({
                url: '#path()/systemmgmt/getIcd',
                data: {
                	keywords: query
                },
                type: 'post',
                dataType: "json",
                success: function (result) {
                    var res = [];
                    var rows = result.rows;
                    if(rows ===null){
                    	return process(res);
                    }else{
                    	$.each(rows, function (i, item) {
                            var aItem = { id: item.id, name:item.code + " " +item.name ,value:item.name};//把后台传回来的数据处理成带name形式
                            res.push(aItem);
                        });
                    }
                    return process(res);
                }
            });
        },
        showHintOnFocus: "true",//将显示所有匹配项
        fitToElement: true,//选项框宽度与输入框一致
        items: 9999,//下拉选项中出现条目的最大数量。也可以设置为“all”
        autoSelect: false,//允许你决定是否自动选择第一个建议
        updater: function (item) {//item是对象,选中后默认返回displayText的值,对于需要的id和name没有,所以手动赋值吧
//            $(".quickgrade-demo").show();
//        	$(".quickgrade-demo>div.pull-right").show();
//        	ShowIcdDetail(item.value);
        	
        	return item.value;//下拉框显示重写为name覆盖默认的displayText
        },
        delay: 500//在查找之间添加延迟
    });
}