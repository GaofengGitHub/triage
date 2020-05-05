package com.chenwei.qualitymanage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import cn.hutool.core.util.StrUtil;

import com.chenwei.jfinal.IdWorker;
import com.chenwei.jfinal.ResultMessage;
import com.chenwei.util.PatientRecord;
import com.chenwei.util.WaitTime;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;


public class QualityManageController extends Controller {

	private static Logger log = Logger.getLogger(QualityManageController.class);

	public void index() {
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/qualitymanage/index", "质控管理", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
//		render("report_pie_old.html");
		render("report_pie.html");
	}
	//抢救室滞留时间
	public void queryRstTime() {
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		if(starttime.equals("") || endtime.equals("")){
			renderJson(ResultMessage.build(400, "统计时间上传异常！！"));
		}else{
			double time =0;
			List<Record> ls = Db.find("SELECT TIMESTAMPDIFF(MINUTE ,time1,time2) time from (SELECT MAX(r.opertime) time1 ,r.pid from trt_patient_record r where " +
					"r.cts='抢救已接诊'  and  r.opertime between '"+starttime+"' and '"+endtime+"' GROUP BY r.pid ) t1,(SELECT max(n.`current_time`) time2,n.p_id from " +
					"rst_nursing_record n where n.rescue_measure='离开抢救室' and  n.`current_time` between '"+starttime+"' and '"+endtime+"' GROUP BY n.p_id) t2 where " +
					"t1.pid=t2.p_id");
			for (Record record : ls) {
				time += record.getInt("time");
			}
			time = time/ls.size();
			String t = String.format("%.1f", time);
			renderJson(ResultMessage.build(200, "查询成功",ls.size(),t));
		}
		return;
	}
	//抢救室滞留时间
	public void queryRstDie() {
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		if (starttime.equals("") || endtime.equals("")) {
			renderJson(ResultMessage.build(400, "统计时间上传异常！！"));
		} else {
			List<Record> ls = Db
					.find("SELECT * from (SELECT  count(DISTINCT r.pid) die from trt_patient_record r where   r.cts='死亡'  and  "
							+ "r.opertime between '"
							+ starttime
							+ "' and '"
							+ endtime
							+ "') t1,(SELECT count(DISTINCT r.pid) allp from trt_patient_record r where   "
							+ "r.cts='抢救已接诊'  and  r.opertime between '"
							+ starttime + "' and '" + endtime + "' ) t2");
			renderJson(ResultMessage.build(200, "查询成功", ls.size(), ls));
		}
		return;
	}
	/**
	 * 保存使用电子病历（新增、修改，通过id区分）
	 * 
	 */
	public void saveUseEmr() {
		ResultMessage resultMessage = new ResultMessage();
		String id = getPara("id");
		String tu_id = getPara("tu_id");
		String writtener = getPara("writtener");
		String department  = getPara("department");// '部门',
		String is_use = getPara("is_use");//'是否使用，1使用，0未使用',
		String duties = getPara("duties");// '职务',
		String tel = getPara("tel");//'手机号码',
		if (StrUtil.isBlank(id)) {
			id = IdWorker.nextId();
			Db.update("INSERT INTO stt_use_emr(`id`, `tu_id`, `writtener`, `department`, `is_use`, `duties`, `tel`, `create_time`) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?, NOW())", id, tu_id, writtener, department, is_use, duties, tel);
			//新增增加记录
		} else {
			Db.update("UPDATE stt_use_emr set writtener=?,department=?,is_use=?,duties=?,tel=?,create_time =NOW() where id=?", writtener,department,is_use, duties, tel,id);
		}
		resultMessage = ResultMessage.build(200, "保存成功",id);
		renderJson(resultMessage);
		return;
	}
	/**
	 * 查询使用电子病历（登陆者填写情况及统计）
	 */
	public void findUseEmr() {
		ResultMessage resultMessage = new ResultMessage();
		List<Record> list = Db.find("SELECT count(1) count ,is_use from stt_use_emr group by is_use");
		String tu_id = getPara("tu_id");
		Record record = Db.findFirst("SELECT `id`, `tu_id`, `writtener`, `department`, `is_use`, `duties`, `tel` from  stt_use_emr where tu_id=?",tu_id);
//		list.add(record);
		Map<String,Object> map = new HashMap<String, Object>();
		for (Record r : list) {
			if(r.getStr("is_use").equals("0")){
				map.put("is_use0",r.get("count"));
			}else{
				map.put("is_use1",r.get("count"));
			}
		}
		Record tu = Db.findFirst("SELECT username,mobile from stt_user where tu_id=?",tu_id);
		map.put("record",record);
		map.put("tu",tu);
		resultMessage = ResultMessage.build(200, "保存成功",map);
		renderJson(resultMessage);
		return;
	}
	
}