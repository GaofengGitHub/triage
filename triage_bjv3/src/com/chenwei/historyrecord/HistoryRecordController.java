package com.chenwei.historyrecord;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.chenwei.divid.TriageDividController;
import com.chenwei.jfinal.IdWorker;
import com.chenwei.jfinal.ResultMessage;
import com.chenwei.util.PatientRecord;
import com.chenwei.util.WaitTime;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;


public class HistoryRecordController extends Controller {

	private static Logger log = Logger.getLogger(HistoryRecordController.class);

	public void index() {
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/historyrecord/index", "历史记录", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
		render("historyrecord.html");
	}
	
    public void querypatienthistory() {
		
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		String content = getPara("content");
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		String sort = "receivetime";
		String order = getPara("sortOrder");
		String orderByStr="";
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			orderByStr = " order by "+sort + " " + order;
		}
		Page<Record> ls = null;
		if(starttime!=null && endtime!=null){
			if(starttime.equals("")){
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM");  
		        String formatStr =formatter.format(new Date());
		        starttime = formatStr+"-01";
			}
			if(endtime.equals("")){
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");  
		        String formatStr =formatter.format(new Date());
		        endtime = formatStr;
			}
	   		ls = Db.paginate(page,rows, 
	   				"select trt_patient_handle.cixu,trt_patient_handle.p_id as pid,trt_patient.cardnum as cardnum,trt_patient.fullname as fullname,"
	   				+ "trt_patient.gender as gender,trt_patient.age as age,trt_patient.registertime as registertime,"
	   	            + "stt_yjfjset.grade_name as gradename,stt_yjfjset.grade_color,trt_patient_handle.dividtime "
	   	            + "as dividtime,trt_patient_handle.receivetime as receivetime,u1.td_name as dividdepartment,"
	   	            + "IFNULL(u2.td_name,w.`name`) as receivedepartment,"
	   	            + "IFNULL(TIMESTAMPDIFF(MINUTE,trt_patient.registertime,trt_patient_handle.dividtime), '-') as jiange1,"
	   	            + "IFNULL(TIMESTAMPDIFF(MINUTE,trt_patient_handle.dividtime,trt_patient_handle.receivetime), '-') as jiange2"
	   				, "from trt_patient_handle LEFT JOIN trt_patient on trt_patient.id=trt_patient_handle.p_id "
	   				+ " LEFT JOIN stt_ward w on trt_patient_handle.receivedepartment =w.id LEFT JOIN stt_depart as u1 on u1.td_id=trt_patient_handle.dividdepartment LEFT JOIN "
	   				+ "stt_depart as u2 on u2.td_id=trt_patient_handle.receivedepartment "
	   				+ "LEFT JOIN stt_yjfjset on stt_yjfjset.ys_id=if(trt_patient_handle.finalgrade ='' "
	   				+ "or trt_patient_handle.finalgrade is null,trt_patient_handle.autograde,trt_patient_handle.finalgrade) "
	   				+ "where trt_patient.status not in ('未接诊','未分诊') and    trt_patient_handle.cixu=(select max(b.cixu+0) from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id  where trt_patient.id = a.id)" +
	   				" and DATE_FORMAT(trt_patient_handle.receivetime,'%Y-%m-%d') between '"+starttime+"' and '"+endtime+"'  and (trt_patient.fullname like '%"+content+"%' or trt_patient.cardnum like '%"+content+"%' or trt_patient.idcard like '%"+content+"%')"+orderByStr);
	   	}else{
	   		renderJson(ResultMessage.build(400, "上送数据异常！！"));
	   	}
		if(ls!=null){
			renderJson(ResultMessage.build(200, "查询成功",ls.getTotalRow(),ls.getList()));
		}else{
		    renderJson(ResultMessage.build(400, "没有符合条件数据"));
		}
		return;
	}
    
    public void querypatienthistory2() {
		
    	String searchText = getPara("searchText");
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		String sort = getPara("sort");
		String order = getPara("order");
		String orderByStr="";
		Page<Record> l = null;
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			orderByStr = " order by "+sort + " " + order;
		}
		Page<Record> ls = null;
		if(searchText==null||"".equals(searchText)){
	   		ls = Db.paginate(page,rows, 
	   				"select trt_patient_handle.p_id as pid,trt_patient.cardnum as cardnum,trt_patient.fullname as fullname,"
	   				+ "trt_patient.gender as gender,trt_patient.age as age,trt_patient.registertime as registertime,"
	   	            + "stt_yjfjset.grade_name as gradename,trt_patient_handle.dividtime "
	   	            + "as dividtime,trt_patient_handle.receivetime as receivetime,u1.td_name as dividdepartment,"
	   	            + "u2.td_name as receivedepartment,"
	   	            + "TIMESTAMPDIFF(MINUTE,trt_patient.registertime,trt_patient_handle.dividtime) as jiange1,"
	   	            + "TIMESTAMPDIFF(MINUTE,trt_patient_handle.dividtime,trt_patient_handle.receivetime) as jiange2"
	   				, "from trt_patient_handle LEFT JOIN trt_patient on trt_patient.id=trt_patient_handle.p_id "
	   				+ "LEFT JOIN stt_depart as u1 on u1.td_id=trt_patient_handle.dividdepartment LEFT JOIN "
	   				+ "stt_depart as u2 on u2.td_id=trt_patient_handle.receivedepartment "
	   				+ "LEFT JOIN stt_yjfjset on stt_yjfjset.ys_id=if(trt_patient_handle.finalgrade ='' "
	   				+ "or trt_patient_handle.finalgrade is null,trt_patient_handle.autograde,trt_patient_handle.finalgrade) "
	   				+ "where trt_patient.status='已接诊' and trt_patient_handle.cixu='1' group by trt_patient_handle.p_id "+orderByStr);
	   	}else{
	   		ls = Db.paginate(page,rows, 
	   				"select trt_patient_handle.p_id as pid,trt_patient.cardnum as cardnum,trt_patient.fullname as fullname,"
	   				+ "trt_patient.gender as gender,trt_patient.age as age,trt_patient.registertime as registertime,"
	   	            + "stt_yjfjset.grade_name as gradename,trt_patient_handle.dividtime "
	   	            + "as dividtime,trt_patient_handle.receivetime as receivetime,u1.td_name as dividdepartment,"
	   	            + "u2.td_name as receivedepartment,"
	   	            + "TIMESTAMPDIFF(MINUTE,trt_patient.registertime,trt_patient_handle.dividtime) as jiange1,"
	   	            + "TIMESTAMPDIFF(MINUTE,trt_patient_handle.dividtime,trt_patient_handle.receivetime) as jiange2"
	   				, "from trt_patient_handle LEFT JOIN trt_patient on trt_patient.id=trt_patient_handle.p_id "
	   				+ "LEFT JOIN stt_depart as u1 on u1.td_id=trt_patient_handle.dividdepartment LEFT JOIN "
	   				+ "stt_depart as u2 on u2.td_id=trt_patient_handle.receivedepartment "
	   				+ "LEFT JOIN stt_yjfjset on stt_yjfjset.ys_id=if(trt_patient_handle.finalgrade ='' "
	   				+ "or trt_patient_handle.finalgrade is null,trt_patient_handle.autograde,trt_patient_handle.finalgrade) "
	   				+ "where trt_patient.status='已接诊'  and trt_patient_handle.cixu='1' and "
	   				+ "(trt_patient.fullname like ? or trt_patient.cardnum like ? or trt_patient.gender like ? or trt_patient.tel like ?)  group by trt_patient_handle.p_id "+orderByStr,"%"+searchText+"%","%"+searchText+"%","%"+searchText+"%","%"+searchText+"%");
	   	}
		if(ls!=null){
			renderJson(ResultMessage.build(200, "查询成功",ls.getTotalRow(),ls.getList()));
		}else{
		    renderJson(ResultMessage.build(400, "没有符合条件数据"));
		}
		return;
	}
    
    public void delpatientrecord(){
    	String patientid = getPara("patientid");
    	String nurseid = getPara("nurseid");
    	if(patientid!=null && !patientid.equals("")){
    		Record c = Db.findFirst("select trt_patient.id,trt_patient.cardnum,trt_patient.hisid from  trt_patient where trt_patient.id=?",patientid);
    		if(c!=null){
    			TriageDividController d = new TriageDividController();
    	    	String id = d.getSep();
    			int a = Db.update("update trt_patient set status = '未分诊',trt_patient.id = '"+id+"' where trt_patient.id=?",patientid);
				PatientRecord.insertPatientRecord(IdWorker.nextId(), id, c.getStr("cardnum"), c.getStr("hisid"),"未分诊", nurseid);
    			if(a>0){
    				renderJson(ResultMessage.build(200, "删除成功"));
    			}else{
    				renderJson(ResultMessage.build(200, "已经删除本条数据"));
    			}
    		}else{
				renderJson(ResultMessage.build(400, "数据不存在"));
			}      	
    	}else{
			renderJson(ResultMessage.build(400, "上送数据错误"));
		}
    }
}