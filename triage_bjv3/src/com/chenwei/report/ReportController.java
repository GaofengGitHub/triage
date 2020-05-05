package com.chenwei.report;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.chenwei.jfinal.ResultMessage;
import com.chenwei.util.WaitTime;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class ReportController extends Controller {

	private static Logger log = Logger.getLogger(ReportController.class);

	public void index() {
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/report/index", "统计报表", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
		
		render("report_bar.html");
	}
	
	public void index2() {
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/report/index", "统计报表", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
		
		render("report_menu.html");
	}
	
	//系统分类统计
	public void report_0() {
		render("report_0.html");
	}
	
	
	//急诊科季度/年基本情况
	public void report_1() {
		render("report_1.html");
	}
	//预检分诊应用情况
	public void report_2() {
		render("report_2.html");
	}
	//快速分级应用情况
	public void report_3() {
		render("report_3.html");
	}
	//患者来源分析
	public void report_4() {
		render("report_4.html");
	}
	//患者结构分析
	public void report_5() {
		render("report_5.html");
	}
	//分诊去向统计
	public void report_6() {
		render("report_6.html");
	}
	//急诊科室接诊情况
	public void report_7() {
		render("report_7.html");
	}
	//急诊抢救情况分析
	public void report_8() {
		render("report_8.html");
	}
	//72小时重返原因分析
	public void report_9() {
		render("report_9.html");
	}
	//急诊病种分析
	public void report_10() {
		render("report_10.html");
	}
	//病种诊疗情况分析
	public void report_11() {
		render("report_11.html");
	}
	//压疮情况统计
	public void report_12() {
		render("report_12.html");
	}
	//急诊科资源分析
	public void report_13() {
		render("report_13.html");
	}
	//急诊科工作量统计
	public void report_14() {
		render("report_14.html");
	}
	//护士个人分诊量
	public void report_15() {
		render("report_15.html");
	}
	//突发事件统计
	public void report_16() {
		render("report_16.html");
	}
	
	public void querydividgrade() {
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		if(starttime.equals("") || endtime.equals("")){
			renderJson(ResultMessage.build(400, "统计时间上传异常！！"));
		}else{
			List<Record> ls = Db.find("select count(DISTINCT(gradenum)) as gradenum,grade,gradename,gradecolor from (select cixu , " +
					"p_id  as gradenum,if(trt_patient_handle.finalgrade ='' or trt_patient_handle.finalgrade is null ,trt_patient_handle.autograde," +
					"trt_patient_handle.finalgrade) as grade,stt_yjfjset.grade_name as gradename,stt_yjfjset.grade_color as gradecolor from (SELECT h.* from " +
					"trt_patient_handle h,(SELECT max(cixu+0) cixu,p_id from trt_patient_handle   where DATE_FORMAT(trt_patient_handle.dividtime,'%Y-%m-%d')" +
					" between '"+starttime+"' and '"+endtime+"' GROUP BY p_id) h1 where h.cixu=h1.cixu and h.p_id=h1.p_id) trt_patient_handle LEFT JOIN stt_yjfjset" +
					" on stt_yjfjset.ys_id=if(trt_patient_handle.finalgrade ='' or trt_patient_handle.finalgrade is null,trt_patient_handle.autograde," +
					"trt_patient_handle.finalgrade) where trt_patient_handle.autograde is not Null  and trt_patient_handle.savestatus<>'draf' and trt_patient_handle.m_id=0 and " +
					"DATE_FORMAT(trt_patient_handle.dividtime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"'  ) t where t.gradename is not null GROUP BY grade");
			//非急诊
			Record fjz=Db.findFirst("SELECT COUNT(h.p_id) as gradenum,'1005' grade,'5' as gradename,'rgb(169,169,169)' gradecolor from trt_patient t,trt_patient_handle h  " +
					"where t.id=h.p_id and  DATE_FORMAT(h.dividtime,'%Y-%m-%d')between '"+starttime+"' and '"+endtime+"' and h.feijz=2");
			if( fjz!=null && !(fjz.get("gradenum")+"").equals("0")){
				ls.add(fjz);
			}
			if(ls.size()>0){
				renderJson(ResultMessage.build(200, "查询成功",ls.size(),ls));
			}else{
				renderJson(ResultMessage.build(400, "数据库状态异常！！"));
			}
		}
		return;
	}
	
	//已废弃
	public void querydividstatus() {
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		if(starttime.equals("") || endtime.equals("")){
			renderJson(ResultMessage.build(400, "统计时间上传异常！！"));
		}else{
			
			//待分诊
//			List<Record> ls= Db.find("SELECT count(1) as statusnum,r.cts as status from trt_patient_record r where    " +
//					"DATE_FORMAT(r.opertime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"' and r.cts<>'已退回' group by r.cts order by r.cts desc");
			List<Record> ls=Db.find("SELECT COUNT(DISTINCT(h.p_id)) as statusnum,'待分诊' as status from trt_patient t,trt_patient_handle h  " +
			"where t.id=h.p_id and t.status='未分诊' and  DATE_FORMAT(t.registertime,'%Y-%m-%d') " +
			"between '"+starttime+"' and '"+endtime+"' and h.savestatus<>'draf' and h.m_id=0");
			//已分诊
			Record dfz = Db.findFirst("SELECT COUNT(DISTINCT(h.p_id)) as statusnum,'已分诊' as status from trt_patient t,trt_patient_handle h  " +
					"where t.id=h.p_id  and  DATE_FORMAT(h.dividtime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"' and h.savestatus<>'draf' and h.m_id=0");
//			//已接诊
			Record jz = Db.findFirst("SELECT COUNT(DISTINCT(h.p_id)) as statusnum,'已接诊' as status from trt_patient t,trt_patient_handle h  " +
					"where t.id=h.p_id and t.status not in ('已退回','未接诊','未分诊') and  DATE_FORMAT(h.receivetime,'%Y-%m-%d') " +
					"between '"+starttime+"' and '"+endtime+"' ");
			
			//已退号his,liuxj20190725
			Record th = Db.findFirst("SELECT count(1) statusnum,'已退号'  as status from his_outpatientencounter_cancel c where c.UpdateDate between '"+starttime+"' and '"+endtime+"'");
//			List<Record> ls = Db.find("select COUNT(*) as statusnum,status from trt_patient where "
//					+ "DATE_FORMAT(trt_patient.registertime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"' group "
//					+ "by status ORDER BY status");
			
			Record ts = Db.findFirst("SELECT COUNT(DISTINCT(h.p_id)) as specialnum from trt_patient_handle h,trt_special_patient s " +
					"where h.p_id=s.id  and DATE_FORMAT(h.dividtime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"'");
			if( dfz!=null && !(dfz.get("statusnum")+"").equals("0")){
				ls.add(dfz);
			}
			if( jz!=null && !(jz.get("statusnum")+"").equals("0")){
				ls.add(jz);
			}
			if( th!=null && !(th.get("statusnum")+"").equals("0")){
				ls.add(th);
			}
			
			if( ts!=null && !(ts.get("specialnum")+"").equals("0")){
				Record re2 = new Record();
				re2.set("statusnum", ts.get("specialnum"));
				re2.set("status", "特殊人员");
				ls.add(re2);
				
			}
			if (ls.size()>0) {
				renderJson(ResultMessage.build(200, "查询成功",ls.size(),ls));
			}
			else{
				renderJson(ResultMessage.build(400, "查询失败"));
			}
		}
		return;
	}
	
	public void querydividadmission() {
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		if(starttime.equals("") || endtime.equals("")){
			renderJson(ResultMessage.build(400, "统计时间上传异常！！"));
		}else{
			List<Record> ls = Db.find("select COUNT(DISTINCT(p.id)) as admissionnum,if(p.admission is null,'未登记',p.admission) as admission " +
					"from trt_patient p ,trt_patient_handle h  where p.id=h.p_id and p.`status` <>'未分诊' and DATE_FORMAT(h.dividtime,'%Y-%m-%d') between '"+starttime+"' " +
					"and 'starttime' and h.m_id=0 and p.admission is not null and p.admission <> '' group by admission ORDER BY admission");
//			Record re = Db.findFirst("select COUNT(*) as othersnum from trt_patient where others is null and "
//					+ "DATE_FORMAT(trt_patient.registertime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"'");
//			if(re!=null && !(re.get("othersnum")+"").equals("0")){
//				Record re2 = new Record();
//				re2.set("admissionnum", re.get("othersnum"));
//				re2.set("admission", "三无人员");
//				ls.add(re2);
//			}
			if(ls.size()>0 ){
				renderJson(ResultMessage.build(200, "查询成功",ls.size(),ls));
			}else{
				renderJson(ResultMessage.build(400, "查询失败"));
			}
		}
		return;
	}
	
	public void querydividtime() {
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		if(starttime.equals("") || endtime.equals("")){
			renderJson(ResultMessage.build(400, "统计时间上传异常！！"));
		}else{
			List<Record> ls = Db.find("SELECT count(HOUR(dividtime) BETWEEN 0 AND 1 or null ) as count2,count(HOUR(dividtime) BETWEEN 2 AND 3 or null ) as count4,"
					+" count(HOUR(dividtime) BETWEEN 4 AND 5 or null ) as count6,count(HOUR(dividtime) BETWEEN 6 AND 7 or null ) as count8,"
					+" count(HOUR(dividtime) BETWEEN 8 AND 9 or null ) as count10,count(HOUR(dividtime) BETWEEN 10 AND 11 or null ) as count12,"
					+" count(HOUR(dividtime) BETWEEN 12 AND 13 or null ) as count14,count(HOUR(dividtime) BETWEEN 14 AND 15 or null ) as count16,"
					+" count(HOUR(dividtime) BETWEEN 16 AND 17 or null ) as count18,count(HOUR(dividtime) BETWEEN 18 AND 19 or null ) as count20,"
					+" count(HOUR(dividtime) BETWEEN 20 AND 21 or null ) as count22,count(HOUR(dividtime) BETWEEN 22 AND 23 or null ) as count24 FROM trt_patient_handle "
					+" where DATE_FORMAT(trt_patient_handle.dividtime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"'  and trt_patient_handle.savestatus<>'draf' and trt_patient_handle.m_id=0 ORDER BY Hour(dividtime)");
			boolean count2 = (ls.get(0).get("count2")+"").equals("0");
			boolean count4 = (ls.get(0).get("count4")+"").equals("0");
			boolean count6 = (ls.get(0).get("count6")+"").equals("0");
			boolean count8 = (ls.get(0).get("count8")+"").equals("0");
			boolean count10 = (ls.get(0).get("count10")+"").equals("0");
			boolean count12 = (ls.get(0).get("count12")+"").equals("0");
			boolean count14 = (ls.get(0).get("count14")+"").equals("0");
			boolean count16 = (ls.get(0).get("count16")+"").equals("0");
			boolean count18 = (ls.get(0).get("count18")+"").equals("0");
			boolean count20 = (ls.get(0).get("count20")+"").equals("0");
			boolean count22 = (ls.get(0).get("count22")+"").equals("0");
			boolean count24 = (ls.get(0).get("count24")+"").equals("0");
			if(ls.size()>0 && !count2 || !count4 || !count6 || !count8 || !count10 || !count12 || !count14 || !count16 || !count18 || !count20 || !count22 || !count24){
				renderJson(ResultMessage.build(200, "查询成功",ls.size(),ls));
			}else{
				renderJson(ResultMessage.build(400, "查询失败"));
			}
		}
	}
	
	public void querydividstatus2() {
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		if(starttime.equals("") || endtime.equals("")){
			renderJson(ResultMessage.build(400, "统计时间上传异常！！"));
		}else{
//			List<Record> dfz = Db.find("SELECT COUNT(h.p_id) as statusnum,'已分诊' as status from trt_patient t,trt_patient_handle h  where t.id=h.p_id  " +
//					"and  DATE_FORMAT(h.dividtime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"' and h.savestatus<>'draf' and h.m_id=0");
			List<Record> dfz = Db.find("SELECT COUNT(DISTINCT(h.p_id)) as statusnum,'已分诊' as status from trt_patient t,trt_patient_handle h  " +
					"where t.id=h.p_id  and  DATE_FORMAT(h.dividtime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"' and h.savestatus<>'draf' and h.m_id=0");
			
			//已分诊
			//待分诊
//			List<Record> ls= Db.find("SELECT count(1) as statusnum,r.cts as status from trt_patient_record r where    " +
//					"DATE_FORMAT(r.opertime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"' and r.cts<>'已退回' and r.cts<>'未接诊' and r.cts<>'离开抢救室' and r.system=0 group by r.cts order by r.cts desc");
//			List<Record> ls=Db.find("SELECT COUNT(DISTINCT(h.p_id)) as statusnum,'待分诊' as status from trt_patient t,trt_patient_handle h  " +
//			"where t.id=h.p_id and t.status='未分诊' and  DATE_FORMAT(t.registertime,'%Y-%m-%d') " +
//			"between '"+starttime+"' and '"+endtime+"' and h.savestatus<>'draf'");
			//已接诊
			Record jz = Db.findFirst("SELECT COUNT(DISTINCT(h.p_id)) as statusnum,'已接诊' as status from trt_patient t,trt_patient_handle h  " +
					"where t.id=h.p_id and t.status not in ('已退回','未接诊','未分诊') and  DATE_FORMAT(h.receivetime,'%Y-%m-%d') " +
					"between '"+starttime+"' and '"+endtime+"' and h.savestatus<>'draf' and h.m_id=0");
			
			//已退回
			//已退号his,liuxj20190725
			Record th = Db.findFirst("SELECT count(1) statusnum,'已退号'  as status from his_outpatientencounter_cancel c where c.UpdateDate between '"+starttime+"' and '"+endtime+"'");
//			Record th = Db.findFirst("SELECT COUNT(*) as statusnum,p.`status` from trt_patient p where p.`status`='已退回' and  " +
//					"DATE_FORMAT(p.registertime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"'");
//			List<Record> ls = Db.find("select COUNT(*) as statusnum,status from trt_patient where "
//					+ "DATE_FORMAT(trt_patient.registertime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"' group "
//					+ "by status ORDER BY status");
			
			Record ts = Db.findFirst("SELECT COUNT(DISTINCT(h.p_id)) as specialnum from trt_patient_handle h,trt_special_patient s " +
					"where h.p_id=s.id and s.type in('特殊患者','欠费患者') and h.m_id=0 and DATE_FORMAT(h.dividtime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"'");
			if( jz!=null ){
				dfz.add(jz);
			}
//			if( jz!=null && !(jz.get("statusnum")+"").equals("0")){
//				ls.add(jz);
//			}
			if( th!=null && !(th.get("statusnum")+"").equals("0")){
				dfz.add(th);
			}
			
			if( ts!=null && !(ts.get("specialnum")+"").equals("0")){
				Record re2 = new Record();
				re2.set("statusnum", ts.get("specialnum"));
				re2.set("status", "特殊人员");
				dfz.add(re2);
				
			}
			if (dfz.size()>0) {
				renderJson(ResultMessage.build(200, "查询成功",dfz.size(),dfz));
			}
			else{
				renderJson(ResultMessage.build(400, "查询失败"));
			}
		}
		return;
	}
	
	//查询72小时重返率
	public void querypatientbackchance() {
		
		String sql = "select a1.*,a3.diagnosis,a2.arrivetime,a2.leavetime,(select td_name from stt_depart where td_id = a3.dividdepartment) as td_name,";
		sql += " (CASE when (a3.finalgrade is not null and a3.finalgrade != '') then a3.finalgrade else a3.autograde end) as grade1,";
		sql += " (CASE when (a4.finalgrade is not null and a4.finalgrade != '') then a4.finalgrade else a4.autograde end) as grade2";
		sql += " from (select u1.patient_id,u2.fullname,u2.cardnum,u2.age,u2.bornday,u3.system from ";
		sql += " (select * from (select COUNT(distinct(t1.patient_id)) as num,t2.cardnum from stt_departbed_history t1  ";
		sql += " LEFT JOIN trt_patient t2 on t2.id = t1.patient_id ";
		sql += " LEFT JOIN stt_ward t3 on t3.id = t1.depart_id and t3.system = '抢救' where t3.id is not null and t2.cardnum is not null GROUP BY t2.cardnum) A where A.num > 1) A ";
		sql += " LEFT JOIN trt_patient u2 on A.cardnum = u2.cardnum  ";
		sql += " LEFT JOIN stt_departbed_history u1 on u1.patient_id = u2.id ";
		sql += " LEFT JOIN stt_ward u3 on u3.id = u1.depart_id ";
		sql += " where u1.patient_id is not null and u3.system = '抢救' ";
		sql += " GROUP BY u1.patient_id ORDER BY u2.cardnum) a1 ";
		sql += " LEFT JOIN stt_departbed_history a2 on a1.patient_id = a2.patient_id and a2.arrivetime = (select MAX(q1.arrivetime) from stt_departbed_history q1 where a1.patient_id = q1.patient_id) ";
		sql += " left join trt_patient_handle a3 on a1.patient_id = a3.p_id and a3.m_id='0' and a3.cixu = (SELECT max(f1.cixu+0) from trt_patient_handle f1 where f1.p_id=a1.patient_id and f1.m_id='0') ";
		sql += " left join trt_patient_handle a4 on a1.patient_id = a4.p_id and a4.m_id='1' and a4.cixu = (SELECT max(f2.cixu+0) from trt_patient_handle f2 where f2.p_id=a1.patient_id and f2.m_id='1') ";
		sql += " ORDER BY a2.arrivetime";
		//查询所有 一个卡号情况下 有两个以上的patient在stt_departbed_history出现的数据
		List<Record> relist = Db.find(sql);
		List<Record> relist2 = new ArrayList<Record>();
		List<String> cardnum = new ArrayList<String>();
		Map<String,Record> cardnumlist = new HashMap<String,Record>();
		//根据卡号分组 然后计算比较72
		for(int i=1;i<relist.size();i++){
			if(!cardnum.contains(relist.get(i).getStr("cardnum"))){
				cardnum.add(relist.get(i).getStr("cardnum"));
				cardnumlist.put(relist.get(i).getStr("cardnum"), relist.get(i));
			}else{
				Record card = cardnumlist.get(relist.get(i).getStr("cardnum"));
				Date arrivetime = new Date();
				Date leavetime = new Date();
				if(card.get("leavetime")!=null && relist.get(i).get("arrivetime")!=null){
					leavetime = card.get("leavetime");
					arrivetime = relist.get(i).get("arrivetime");
					long hour = (arrivetime.getTime()-leavetime.getTime())/(60*60*1000);
					if(hour<72){
						relist2.add(relist.get(i));
					}
				}
			}
		}
		
		renderJson(ResultMessage.build(200, "查询成功",relist2.size(),relist2));
		return;
	}
}