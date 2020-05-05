package com.chenwei.index;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.chenwei.events.EventsController;
import com.chenwei.jfinal.IdWorker;
import com.chenwei.jfinal.ResultMessage;
import com.chenwei.util.ImportExcelUtil;
import com.chenwei.util.PatientRecord;
import com.chenwei.util.WaitTime;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.core.Controller;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;
import com.jfinal.upload.UploadFile;

public class IndexController extends Controller {

	private static Logger log = Logger.getLogger(IndexController.class);

	public void index() {
		
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/index/index", "首页", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
		
		Record re =  Db.findFirst("select stt_hospital.hp_id as hpid,stt_hospital.hp_name as hpname,stt_hospital.hp_code as hpcode,"
				+ "stt_hospital.hp_province as hpprovince,stt_hospital.hp_city as hpcity,stt_hospital.hp_address as hpaddress,"
				+ "stt_hospital.hp_logourl as hplogourl from stt_hospital");
		setSessionAttr("hpname", re.get("hpname"));
		setSessionAttr("hplogourl",re.get("hplogourl"));
		setAttr("befrom",getPara("befrom"));
		if(bbsCache.exists("fz_pc_guide_index_"+userid)){
			setAttr("guide", 0);
		}else{
			setAttr("guide", 1);
		}
		//更新说明
		Record record =  Db.findFirst("SELECT id,state,content,create_time from stt_version_show where m_id=0 and state=1");
		String content ="";
		String version ="";
		if(record != null){
			content =((String) record.get("content")).replaceAll("\n", "<br>");
			version = content.substring(content.indexOf("：")+1, content.indexOf("<br>"));
			//缓存放版本号+userid
			if(bbsCache.exists("fz_pc_update_show"+version+"_"+userid)){
				setAttr("update_show", 0);
			}else{
				setAttr("update_show", 1);
			}
		}else{
			setAttr("update_show", 0);
		}
		setAttr("content", content);
		setAttr("version", version);
		render("index.html");
//		render("tips.html");
	}
	
	public void warn() {
		
		
		render("tips.html");
	}
	
	
	public void queryWarnInfo(){
		try {
			//查找
			List<Record> list = Db.find("select * from trt_warning where status='0' order by id");
			if(list.size()>0){
				renderJson(ResultMessage.build(200, "查询成功",list.size(),list.get(0)));
			}else{
				renderJson(ResultMessage.build(200, "查询成功",list.size(),null));
			}
		}catch(Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	}
	
	public void updateWarnInfo(){
		try {
			String id = getPara("id");
			Db.update("update trt_warning set status='1' where id=?",id);
			renderJson(ResultMessage.build(200, "操作成功"));
			
		}catch(Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	}
	
	public void insertWarnInfo(){
		try {
			String id = IdWorker.nextId();
			String sender = getPara("sender");
			String dept = getPara("dept");
			Db.update("insert into trt_warning values(?,?,?,?)",id,dept,sender,"0");
			renderJson(ResultMessage.build(200, "操作成功"));
			
		}catch(Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	}
	
	public void ing() {
		render("ing.html");
	}
	
	public void addPatient() {
		render("addpatient.html");
	}
	
	public void savePatient() {
		ResultMessage resultMessage = new ResultMessage();
		String cardnum = getPara("cardnum");
		String fullname = getPara("fullname");
		String gender = getPara("gender");
		String bronday = getPara("bronday");
		String address = getPara("address");
		String arrivetime = getPara("arrivetime");
		String insertSql = " insert into trt_patient(id,cardnum,fullname,gender,bornday,address,arrivetime,status) VALUES(?,?,?,?,?,?,?,?) ";
		String id = IdWorker.nextId();
		try {
			Db.update(insertSql, id, cardnum, fullname,
					gender, bronday,address,arrivetime,"未分诊");
			resultMessage = ResultMessage.build(200, "添加患者成功");
			
		} catch (Exception e) {
			log.error("添加患者失败", e);
			resultMessage = ResultMessage.build(400, e.getMessage());
		}

		renderJson(resultMessage);
	}
	
	public void queryPatient() {
		//System.out.println("begin!!!!!!!!!");
	
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
//		String sort = getPara("sort");
//		String order = getPara("order");
//		if(StrUtil.isNotBlank(sort) && StrUtil.isNotBlank(order)){
//			orderByStr = sort + " " + order;
//		}
		Page<Record> l = null;
	   	l = Db.paginate(page, 
	   				rows, 
	   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name"),
	   				Db.getSql("index.listFromNoneText"));
	  
	   	
	   	renderJson(ResultMessage.build(200, "查询成功",l.getTotalRow(),l.getList()));
	}
	
	public void seachPatient() {
		//System.out.println("begin!!!!!!!!!");
		String searchText = getPara("searchText");
		System.out.println(searchText);
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		String sort = getPara("sort");
		String order = getPara("order");
		String orderByStr="";
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			orderByStr = " order by "+sort + " " + order;
		}

		Page<Record> l = null;
	   	if(searchText==null||"".equals(searchText)){
	   		l = Db.paginate(page, 
	   				rows, 
	   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name"),
	   				//条件添加排除了“已退回”患者
	   				Db.getSql("index.listFromNoneNoDel")+orderByStr);
	   	}else{
	   		l = Db.paginate(page, 
	   				rows, 
	   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name"),
	   			    //条件添加排除了“已退回”患者
	   				Db.getSql("index.listFromNoDel")+orderByStr,
	   				"%"+searchText+"%",
	   				"%"+searchText+"%",
	   				"%"+searchText+"%",
	   				"%"+searchText+"%");
	   	}
	   	
	   	renderJson(ResultMessage.build(200, "查询成功",l.getTotalRow(),l.getList()));
	}
	//北京分诊用
	public void seachPatient2() {
		//System.out.println("begin!!!!!!!!!");
		String cardnum = getPara("cardnum");
//		String fullname = getPara("fullname");
		String status = getPara("status");
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String today = sdf.format(new Date());
		Page<Record> ls = null;
		String sql = "";
		String yesterday = DateUtil.yesterday().toString();
	   	if(StrUtil.isNotBlank(cardnum)){
	   		//修复查询用户重复数据问题，liuxj20181010
	   		if(StrUtil.equalsIgnoreCase(status, "已接诊")){
		   		sql = " and (t1.cardnum like ? or t1.fullname like ? or t1.idcard like ?) and t1.status not in ('已退回','未接诊','未分诊') ";
	   			sql += " and t2.receivetime between '"+yesterday + "' and  '" + today+"' and t2.m_id=0 ";
	   			ls = Db.paginate(page,rows,
		   				Db.getSql("index.listSelectHis")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")
		   				,Db.getSql("index.listFromNoneNoDel")+sql +" order by t2.receivetime"
		   				,"%"+cardnum+"%","%"+cardnum+"%","%"+cardnum+"%");
	   		}else if(StrUtil.equalsIgnoreCase(status, "未接诊")){
		   		sql = " and (t1.cardnum like ? or t1.fullname like ? or t1.idcard like ?) and t1.status =? ";
		   		ls = Db.paginate(page,rows,
		   				Db.getSql("index.listSelectHis")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")
		   				,Db.getSql("index.listFromNoneNoDel")+sql +" order by t2.dividtime"
		   				,"%"+cardnum+"%","%"+cardnum+"%","%"+cardnum+"%",status);
	   		}else if(StrUtil.equalsIgnoreCase(status, "all")){
	   			ls = Db.paginate(page,rows,
		   				Db.getSql("index.listSelectHis")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")
		   				,Db.getSql("index.listFromNoneNoDelNew")+ "  and (t1.cardnum like ? or t1.fullname like ? or t1.idcard like ?) and (t2.receivetime between '"+ yesterday + "' and  '" + today +"' and t2.m_id=0 or t1.status in('未分诊','未接诊')) order by t1.status desc,t1.id "
		   				,"%"+cardnum+"%","%"+cardnum+"%","%"+cardnum+"%");
	   		}else if(StrUtil.equalsIgnoreCase(status, "未分诊")){
	   			sql = "  and  (t1.cardnum like ? or t1.fullname like ? or t1.idcard like ?) and t1.status=?  ";
	   			ls = Db.paginate(page,rows,
		   				Db.getSql("index.listSelectHis")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")
		   				,Db.getSql("index.listFromNoneNoDelNew") + sql + "  order by rowno"
		   				,"%"+cardnum+"%","%"+cardnum+"%","%"+cardnum+"%",status);
	   		}
	   	}
	   /*	else if( StrUtil.isNotBlank(cardnum)&&StrUtil.isBlank(fullname)){
	   		
	   		
	   		if(StrUtil.equalsIgnoreCase(status, "已接诊")){
		   		sql = " and t1.cardnum like ? and t1.status not in ('已退回','未接诊','未分诊','抢救已接诊') ";
	   			sql += " and t2.receivetime between '"+yesterday + "' and  '" + today+"'  and t2.m_id=0";
	   			l = Db.find(
		   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")+
		   				Db.getSql("index.listFromNoneNoDel")+sql +" order by rowno"
		   				,"%"+cardnum+"%");
	   		}else if(StrUtil.equalsIgnoreCase(status, "未接诊")){
		   		sql = " and t1.cardnum like ?  and t1.status =? ";
		   		l = Db.find(
		   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")+
		   				Db.getSql("index.listFromNoneNoDel")+sql +" order by rowno"
		   				,"%"+cardnum+"%",status);
	   		}
	   		if(StrUtil.equalsIgnoreCase(status, "all")){
	   			l = Db.find( 
		   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")+
		   				Db.getSql("index.listFromNoneNoDelNew")+ "  and t1.cardnum like ? and (t2.receivetime between '"+ yesterday + "' and  '" + today +"' and t2.m_id=0 or t1.status in('未分诊','未接诊')) order by t1.status desc "
		   				,"%"+cardnum+"%");
	   		}else if(StrUtil.equalsIgnoreCase(status, "未分诊")){
	   			sql = "  and t1.cardnum like ? and t1.status=?  ";
	   			l = Db.find( 
		   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+
		   				Db.getSql("index.listFromNoneNoDelNew")+ 
		   				sql + "  order by rowno"
		   				,"%"+cardnum+"%",status);
	   		}
	   	}else if( StrUtil.isBlank(cardnum)&&StrUtil.isNotBlank(fullname)){
	   		
	   		if(StrUtil.equalsIgnoreCase(status, "已接诊")){
		   		sql = " and t1.fullname like ? and t1.status not in ('已退回','未接诊','未分诊','抢救已接诊') ";
	   			sql += " and t2.receivetime between '"+yesterday + "' and  '" + today+"' and t2.m_id=0 ";
	   			l = Db.find( 
	   					Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")+
	   					Db.getSql("index.listFromNoneNoDel")+sql+"  order by rowno"
	   					,"%"+fullname+"%");
	   		}else if(StrUtil.equalsIgnoreCase(status, "未接诊")){
		   		sql = " and t1.fullname like ?  and t1.status =? ";
		   		l = Db.find( 
	   					Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")+
	   					Db.getSql("index.listFromNoneNoDel")+sql+"  order by rowno"
	   					,"%"+fullname+"%",status);
	   		}
	   		if(StrUtil.equalsIgnoreCase(status, "all")){
	   			l = Db.find( 
		   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")+
		   				Db.getSql("index.listFromNoneNoDelNew")+ "  and t1.fullname like ? and  (t2.receivetime between '"+ yesterday + "' and  '" + today +"' and t2.m_id=0 or t1.status in('未分诊','未接诊')) order by t1.status desc "
		   				,"%"+fullname+"%");
	   		}else if(StrUtil.equalsIgnoreCase(status, "未分诊")){
	   			sql = "  and  t1.fullname like ? and t1.status=?  ";
	   			l = Db.find( 
		   				Db.getSql("index.listSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+
		   				Db.getSql("index.listFromNoneNoDelNew")+ 
		   				sql + "  order by rowno"
		   				,"%"+fullname+"%",status);
	   		}
	   	}*/
	   	else{
	   		if(StrUtil.equalsIgnoreCase(status, "已接诊")){
		   		sql = " and  t1.status not in ('已退回','未接诊','未分诊') ";
		   		sql += " and t2.receivetime between '"+yesterday + "' and  '" + today+"' and t2.m_id=0 ";
		   		ls = Db.paginate(page,rows,
		   				Db.getSql("index.listSelectHis")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")
		   				,Db.getSql("index.listFromNoneNoDel")+
		   				sql + "  order by t2.receivetime"
		   				);
	   		}else if(StrUtil.equalsIgnoreCase(status, "未接诊")){
		   		sql = "  and t1.status =? ";
		   		ls = Db.paginate(page,rows,
		   				Db.getSql("index.listSelectHis")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name"),
		   				Db.getSql("index.listFromNoneNoDel")+
		   				sql + "  order by t2.dividtime"
		   				,status);
	   		}
	   		if(StrUtil.equalsIgnoreCase(status, "all")){
	   			ls = Db.paginate(page,rows,
		   				Db.getSql("index.listSelectHis")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name"),
		   				Db.getSql("index.listFromNoneNoDelNew")+ " and (t2.receivetime between '"+ yesterday + "' and  '" + today +"' and t2.m_id=0 or t1.status in('未分诊','未接诊'))"+" order by t1.status desc,t1.id ");
	   		}else if(StrUtil.equalsIgnoreCase(status, "未分诊")){
	   			sql = "  and  t1.status=? ";
	   			ls = Db.paginate(page,rows,
		   				Db.getSql("index.listSelectHis")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial"),
		   				Db.getSql("index.listFromNoneNoDelNew")+ 
		   				 " and  t1.status='未分诊'  order by  IF(ISNULL(o.PAADMOPTime),1,0),o.PAADMOPTime,t2.dividtime"
		   				);
	   		}
	   	}
	   	
	   	renderJson(ResultMessage.build(200, "查询成功",ls.getTotalRow(),ls.getList()));
	}
	
	
	public void queryPatientByGrade() {
		//System.out.println("begin!!!!!!!!!");
		String grade = getPara("grade");
		String orderByStr = "arrivetime";
		List<Record> l = null;
		List<Record> all = new ArrayList<Record>();
		List<String> all2 = new ArrayList<String>();
		//查找
		Map<String,Object> m = new HashMap<String,Object>();
		List<Record> list1 = Db.find(Db.getSql("divid.listGradeSet"));
		Long nowtime = new Date().getTime();
		for(Record l1 :list1) {
			List<Record> all1 = new ArrayList<Record>();
			String g1 = l1.getStr("ys_id");
			
			//获取超时 时间 毫秒数
			Long overtime =  Long.parseLong(l1.getStr("grade_overtime"));
			overtime = overtime * 60000 ;
			Long deadline = nowtime - overtime ;
			//获取相应等级的信息
			List<Record> list2 = Db.find(Db.getSql("index.queryPatientByGrade") + orderByStr, g1,g1);
			if(list2.size()>0) {
				for(Record r:list2) {											
					if(r.getDate("dividtime")!=null){
						Date time = r.getDate("dividtime");
						Long dividtime = time.getTime();
						//判断是否超时
						if(deadline>dividtime){
							all2.add(r.getStr("id"));
						}
					}
				}
			}
		
		}
		if(StrUtil.isNotBlank(grade)) {
			
			String[] grades = grade.split(",");
			List<Record> l2 = null;
			List<Record> l3 = new ArrayList<Record>();
			if(grade.equals("1004")){
				l2 = Db.find(Db.getSql("index.queryFeiJZPatient")+orderByStr);
				l = Db.find(Db.getSql("index.queryPatientByGrade")+orderByStr, grade,grade);
				l3.addAll(l);
				l3.addAll(l2);
				if(l3.size()>0) {
					for(Record r:l3) {
						//查询患者多次评级等级
						List<Record> list3 = Db.find(Db.getSql("index.queryCixuGradeByPid"), r.get("id"));
						r.set("dcpflist", list3);
						if(all2.contains(r.getStr("id"))){
							r.set("warn", "1");
						}else{
							r.set("warn", "0");
						}					
						all.add(r);
					}
				}
			}else{
				for(String g :grades) {
					l = Db.find(Db.getSql("index.queryPatientByGrade")+orderByStr, g,g);
					if(l.size()>0) {
						for(Record r:l) {
							//查询患者多次评级等级
							List<Record> list3 = Db.find(Db.getSql("index.queryCixuGradeByPid"), r.get("id"));
							r.set("dcpflist", list3);
							if(all2.contains(r.getStr("id"))){
								r.set("warn", "1");
							}else{
								r.set("warn", "0");
							}					
							all.add(r);
						}
					}
				}
			}
		}
		
	   
	   	renderJson(ResultMessage.build(200, "查询成功",all.size(),all));
	}
	
	public void queryPatientGradeNums() {
		//System.out.println("begin!!!!!!!!!");
		
		String orderByStr = "arrivetime";
		Map<String,Object> map = new HashMap<String,Object>();
		for(int i= 1;i<=5;i++) {
			List<Record> l = Db.find(Db.getSql("index.queryPatientByGrade")+orderByStr, "100"+i,"100"+i);
			map.put("grade_"+i,l.size());
			String name= this.getGradeName("100"+i);
			map.put("grade_"+i+"_name",name);
		}
	   	
	   	renderJson(ResultMessage.build(200, "查询成功",map));
	}
	
	public void queryPatientAllGradeNums() {
		//System.out.println("begin!!!!!!!!!");
		
		
		Record l = Db.findFirst(Db.getSql("index.listCount")+Db.getSql("index.getWarnNum")+Db.getSql("index.listDividFromByGrade"));
		
	   	
	   	renderJson(ResultMessage.build(200, "查询成功",l));
	}
	
	//获取科室以及每个科室的 待接诊数量上限
	public void queryDepartAndWaitPatientNums() {
		try {
			//查找
		List<Record> list = Db.find(Db.getSql("index.listDepartSelect")+Db.getSql("index.addDepartCountColumn")
		+Db.getSql("index.listDepartFrom"),1);
		renderJson(ResultMessage.build(200, "查询成功",list));
		}catch(Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	   	
	}
	
	//获取今日分诊数量 ，今日接诊数量
	public void queryTodayCounts() {
		try {
			//查找
			Date date = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String d = sdf.format(date);
			
			Record l1 = Db.findFirst(Db.getSql("index.listCount")+Db.getSql("index.BetweenDividtime"),d+" 00:00:00",d+" 23:59:59");
			Record l2 = Db.findFirst(Db.getSql("index.listCount")+Db.getSql("index.BetweenReceivetime"),d+" 00:00:00",d+" 23:59:59");
			String divid_count= l1.getStr("count");
			String receive_count= l2.getStr("count");
			Map<String,String> m = new HashMap<String,String>();
			m.put("divid_count", divid_count);
			m.put("receive_count", receive_count);
			renderJson(ResultMessage.build(200, "查询成功",m));
		}catch(Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	   	
	}
	
	//获取弹窗警告内容
	public void queryWarningInfo() {
		try {
			//查找
			String orderByStr = "dividtime";
			Map<String,Object> m = new LinkedHashMap<String,Object>();
			List<Record> list1 = Db.find(Db.getSql("divid.listGradeSet"));
			Long nowtime = new Date().getTime();
			for(Record l :list1) {
				List<Record> all = new ArrayList<Record>();
				String g =l.getStr("ys_id");
				
				//获取超时 时间 毫秒数
				Long overtime =  Long.parseLong(l.getStr("grade_overtime"));
				overtime = overtime * 60000 ;
				Long deadline = nowtime - overtime ;
				//获取相应等级的信息
				List<Record> list2 = Db.find(Db.getSql("index.queryPatientByGrade") + orderByStr, g,g);
				if(list2!=null) {
					for(Record r:list2) {
						if(r.getDate("arrivetime")==null){
							r.set("arrivetime", "");
						}
						if(r.getDate("registertime")==null){
							r.set("registertime", "");
						}
						if(r.getDate("dividtime")!=null){
							Date time = r.getDate("dividtime");
							Long dividtime = time.getTime();
							//判断是否超时
							if(deadline>dividtime){
								r.set("jige", (new Date().getTime()-dividtime)/60000);
								all.add(r);
							}
						}
					}
				}
				m.put("a"+g, all);
			}
//			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			String today = sdf.format(new Date());
//			String yesterday = DateUtil.yesterday().toString();
//			List<Record> special = Db.find(Db.getSql("index.listSpecialCardNum"),yesterday,today);
//			
//			for (Record record : special) {
//				if(record.getDate("dividtime")!=null){
//					Date time = record.getDate("dividtime");
//					Long dividtime = time.getTime();
//					//判断是否超时
////					if(deadline>dividtime){
////						special.remove(record);
////					}
//				}
//			}
//			m.put("10010", special);
//			ResultMessage.build(200, "查询成功", "", m);
			renderJson(ResultMessage.build(200, "查询成功",m));
		}catch(Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	   	
	}

	//获取等级名称
	public String getGradeName(String id) {
		Record l = Db.findFirst(
			Db.getSql("divid.listGradeSet")+Db.getSql("divid.byId"),id);
		String name = "";
		if(l!=null){
			name = l.getStr("grade_name");
		}
		return name;
	}
	
	//修改用户密码
	public void upduserselfconfirm(){
		ResultMessage result = new ResultMessage();
		String userid = getPara("userid");
		String yuanpassword = getPara("yuanpassword");
		String newpassword = getPara("newpassword");
		String confirmpassword = getPara("confirmpassword");
		//String password = StrUtil.md5(newpassword);
		
		if(yuanpassword.equals(newpassword)){
			result.setStatus(404);
			result.setMessage("原密码不能与新密码相同！！");
			renderJson(result);
			return;
		}
		if(!newpassword.equals(confirmpassword)){
			result.setStatus(404);
			result.setMessage("新密码与确认密码必须相同！！");
			renderJson(result);
			return;
		}
		String asql1 = "select stt_user.username from stt_user where stt_user.tu_id=? and stt_user.password=?";
		String asql = "update stt_user set password=? where tu_id=?";
		if(userid!=""){
			Record re = Db.findFirst(asql1,userid,yuanpassword);
		    if(re!=null){
		    	int a = Db.update(asql,newpassword,userid);
		    	result.setStatus(200);
				result.setMessage("修改成功！！");
		    }else{
		    	result.setStatus(404);
				result.setMessage("原密码错误！！");
				renderJson(result);
				return;
		    }
		}else{
			result.setStatus(404);
			result.setMessage("数据异常，用户编号未识别！！");
			renderJson(result);
			return;
		}
		renderJson(result);
		return;
	}
	//更新接诊状态
	public void receivePatient(){
		String id = getPara("id");
		String jiezhentime = getPara("jiezhentime");
		String hisid = getPara("hisid");
		String nurseid = getPara("nurseid");
		String cardnum = getPara("cardnum");
		if(jiezhentime!=null && jiezhentime!=""){
			if((!StrUtil.isBlank(id))&&(!StrUtil.isBlank(id))) {
				try{
					Db.update(Db.getSql("divid.receivePatient"),id);
					Db.update(Db.getSql("divid.receivePatientHandle"),jiezhentime,id);
					
					
					EventsController.updateEventReciveTime(id,jiezhentime);
					PatientRecord.insertPatientRecord(IdWorker.nextId(), id, cardnum, hisid,"已接诊", nurseid);
					renderJson(new ResultMessage(200,"修改成功！"));
				}catch(Exception e){
					renderJson(new ResultMessage(400, e.getMessage()));
				}
				
			}
		}else{
			if((!StrUtil.isBlank(id))&&(!StrUtil.isBlank(id))) {
				try{
					Date date= new Date();
					Db.update(Db.getSql("divid.receivePatient"),id);
					Db.update(Db.getSql("divid.receivePatientHandle"),date,id);
					EventsController.updateEventReciveTime(id,DateUtil.now());
					PatientRecord.insertPatientRecord(IdWorker.nextId(), id, cardnum, hisid,"已接诊", nurseid);
					renderJson(new ResultMessage(200,"修改成功！"));
				}catch(Exception e){
					renderJson(new ResultMessage(400, e.getMessage()));
				}
				
			}
		}
	}
	
	
	
	//寻找历史记录 
	public void seachHis(){
		String cardnum = getPara("cardnum");
		String id = getPara("id");
		if((!StrUtil.isBlank(cardnum))) {
			try{
				Record l = Db.findFirst(
						Db.getSql("index.listSelect")+Db.getSql("index.addDepartment_name")
						+Db.getSql("index.listFromNone") + " where t1.cardnum = ? and t1.id<>? order by t1.registertime desc limit 0,1",cardnum,id);
				renderJson(new ResultMessage(200,"查询成功！",l));
			}catch(Exception e){
				renderJson(new ResultMessage(400, e.getMessage()));
			}
			
		}else{
			renderJson(new ResultMessage(400, "请传入参数"));
		}
	}
	
	public void saveSpecial(){
		String cardnum = getPara("cardnum");
		String id = getPara("id");
		String type = getPara("type");
		if((!StrUtil.isBlank(id))) {
			try{
				Record l = Db.findFirst(
						 "select count(1) as count from  trt_special_patient  where cardnum = ? and type=? ",cardnum,type);
				int count = l.getInt("count");
				if(count>0){
					Db.update("delete from trt_special_patient where cardnum=? and type=?", cardnum,type);
				}else{
					Db.update(Db.getSql("index.insertSpecial"), id,"", cardnum,"","",new Date(),type);
				}
				
				renderJson(new ResultMessage(200,"操作成功！"));
			}catch(Exception e){
				renderJson(new ResultMessage(400, e.getMessage()));
			}
			
		}else{
			renderJson(new ResultMessage(400, "请传入参数"));
		}
	}
	
	public void backPatient(){
		String p_id = getPara("p_id");
		String hisid = getPara("hisid");
		String nurseid = getPara("nurseid");
		String cardnum = getPara("cardnum");
		String eventid = getPara("eventid");
		if((!StrUtil.isBlank(p_id))) {
			try{
				Db.update("update trt_patient set status='已退回',registertime=NOW() where id =? ", p_id);
				PatientRecord.insertPatientRecord(IdWorker.nextId(), p_id, cardnum, hisid,"已退回", nurseid);
				if(!StrUtil.isBlank(eventid)){
					Db.update("update trt_events set  num =num-1 where id =? ", eventid);
				}
				renderJson(new ResultMessage(200,"操作成功！"));
			}catch(Exception e){
				renderJson(new ResultMessage(400, e.getMessage()));
			}
			
		}else{
			renderJson(new ResultMessage(400, "请传入参数"));
		}
	}
	//状态改为未分诊，北京用
	public void backPatient2(){
		String p_id = getPara("p_id");
		String hisid = getPara("hisid");
		String nurseid = getPara("nurseid");
		String cardnum = getPara("cardnum");
		if((!StrUtil.isBlank(p_id))) {
			try{
				Db.update("update trt_patient set status='未分诊',registertime=NOW() where id =? ", p_id);
				PatientRecord.insertPatientRecord(IdWorker.nextId(), p_id, cardnum, hisid,"未分诊", nurseid);
				renderJson(new ResultMessage(200,"操作成功！"));
			}catch(Exception e){
				renderJson(new ResultMessage(400, e.getMessage()));
			}
			
		}else{
			renderJson(new ResultMessage(400, "请传入参数"));
		}
	}
	public void getPaitentNums(){
		Map<String,String> map = new HashMap<String,String>();
		//修复开始时间非24小时制的问题，liuxj20181010
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 String now = sdf.format(new Date());
		 String begin = DateUtil.date().toString("yyyy-MM-dd")+" 00:00:00";
		 String today = DateUtil.date().toString("yyyy-MM-dd");
		 String yesterday = DateUtil.yesterday().toString();
		try{
				Record l1 = Db.findFirst("SELECT count(1) as num from trt_patient WHERE `status`='未分诊'");
				String wait = l1.getStr("num");
				map.put("wait", wait);
				//修复错误的查询条件，liuxj20181010
				Record l2 = Db.findFirst("SELECT  COUNT(distinct(t.id)) as num from trt_patient t,trt_patient_handle h  WHERE t.id=h.p_id and  t.`status`='未接诊' ");
				String divid = l2.getStr("num");
				map.put("divid", divid);
				
				Record l3 = Db.findFirst("SELECT  COUNT(distinct(t.id)) as num from trt_patient t,trt_patient_handle h  WHERE t.id=h.p_id and  t.`status` not in ('已退回','未接诊','未分诊') and h.receivetime BETWEEN '"+begin+"' and '"+ now +"'");
				String receive = l3.getStr("num");
				map.put("receive", receive);
				//修复错误的查询条件，liuxj20181010
				Record l4 = Db.findFirst("SELECT count(1) as num from trt_patient WHERE `status`='已退回' and registertime BETWEEN '"+begin+"' and '"+ now +"'");
				String back = l4.getStr("num");
				map.put("back", back);
				//未分诊、未接诊的特殊人员
//				Record l5 = Db.findFirst("SELECT count(DISTINCT t.id) as num from trt_special_patient p,trt_patient t  where t.cardnum=p.cardnum   and t.cardnum <> ''");
				Record l5 = Db.findFirst("SELECT count(DISTINCT p.id) num from trt_patient p,trt_special_patient s  where p.id=s.id and p.`status` in('未分诊','未接诊')");
				//已接诊的特殊人员
				Record ll = Db.findFirst("SELECT count(DISTINCT p.cardnum) num from trt_patient p LEFT JOIN trt_patient_handle t2 on p.id = t2.p_id ,trt_special_patient s where (p.id=s.id  )and p.`status`  not in ('已退回','未接诊','未分诊') and t2.receivetime between '"+yesterday+"' and  '"+now+"' ");

				map.put("special", String.valueOf((Integer.parseInt(l5.getStr("num"))+Integer.parseInt(ll.getStr("num")))));
				
//				Record l6 = Db.findFirst("SELECT count(1) as num from trt_patient WHERE  registertime BETWEEN '"+begin+"' and '"+ now +"'");
//				String register = l6.getStr("num");
//				map.put("register", register);
				//退号人数
				Record cancel = Db.findFirst("SELECT count(1) cancel from his_outpatientencounter_cancel c where c.UpdateDate=? ", today);
				//挂号人数
				Record register = Db.findFirst("SELECT count(1) register from his_outpatientencounter c where c.PAADMOPTime BETWEEN '"+begin+"' and '"+ now +"'");
				map.put("cancel", cancel.getStr("cancel"));
				map.put("register", register.getStr("register"));
				renderJson(new ResultMessage(200,"操作成功！",map));
		}catch(Exception e){
				renderJson(new ResultMessage(400, e.getMessage()));
		}
			
		
	}
	
	/**
	 * 根据类型查询字典列表
	 * queryDataDictionary 
	 * author:yusm
	 * @exception
	 * @since 1.0.0
	 */
	public void queryDataDictionary(){
		//1:费别,2:来源,3:来院方式,4:意识状态,5:既往病史
		String sort = getPara("sort");
		List<Record> lsls=Db.find(Db.getSql("index.listSelectDatadictionary")+Db.getSql("index.listFromDatadictionary"),sort);
		if(lsls.size()>0){
			renderJson(ResultMessage.build(200, "查询成功",lsls.size(),lsls));
		}else{
			renderJson(ResultMessage.build(400, "数据异常"));
		}
	}

	//导入excel表格
	public void importExcel(){
		//UploadFile picFile = getFile();
		//UploadFile picFile = getFile("importfile");
		UploadFile picFile = getFile("importfile","saveExcel",100*1024*1024,"utf-8");
		if(picFile!=null){
			String type = "";
			String fileName=picFile.getFileName();  
	        String mimeType=picFile.getContentType();//得到 上传文件的MIME类型:audio/mpeg  
	        if("application/vnd.ms-excel".equals(mimeType)){
	        	type=".xls";
	        }
	        if("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(mimeType)){
	        	type=".xlsx";
	        }
	        String file=picFile.getUploadPath()+"\\"+fileName;
	        InputStream is;
			List<List<String>> list=null;
			try {
				is = new FileInputStream(file);
				ImportExcelUtil ie = new ImportExcelUtil();
				list=ie.getBankListByExcel(is,type);
				renderJson(new ResultMessage(200,"操作成功！",list.size(),list));
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}finally {
				//index();
				//return;
			}
		}
	}
	
	/**
	 * 特殊患者、欠费患者
	 * saveSpecial2 
	 * void
	 * @exception
	 * @since 1.0.0
	 */
	public void saveSpecial2(){
		String cardnum = getPara("cardnum");
		String id = getPara("id");
		String type = getPara("type");
		if((!StrUtil.isBlank(id))) {
			if(!StrUtil.isBlank(cardnum)){
				Db.update("delete from trt_special_patient where cardnum=? ", cardnum);
			}else{
				Db.update("delete from trt_special_patient where id=? ", id);
			}
			if(type.equals("-1")){
				//未勾选，清除
			}else{
				type = type.substring(0,type.length()-1);
				List<String> list=Arrays.asList(type.split(","));
				for (int i = 0; i < list.size(); i++) {
					type = list.get(i);
					Db.update(Db.getSql("index.insertSpecial"), id,"", cardnum,"","",new Date(),type);
				}
			}
			renderJson(new ResultMessage(200,"操作成功！"));
		}else{
			renderJson(new ResultMessage(400, "请传入参数"));
		}
	}
	
	/**
	 * 保存用户行为监测数据
	 * saveUserbehavior 
	 * void
	 * @exception
	 * @since 1.0.0
	 */
	public void saveUserbehavior() {
		String Userbehavior = getPara("Userbehavior");
		String userid = getPara("userid");
		String roleid = getPara("roleid");
		
		String id = IdWorker.nextId();
		Date operatetime = new Date();
		int a = Db.update("insert into trt_useroperatepoint (id,op_id,userid,"
				+ "roleid,status,operatetime) values (?,?,?,?,?,?)",
				id,Userbehavior,userid,roleid,"",operatetime);
		if(a>0){
			renderJson(ResultMessage.build(200, "用户行为数据添加成功"));
		}else{
			renderJson(ResultMessage.build(400, "用户行为数据添加失败"));
		}
	}
	
	/**
	 * 分诊去向保存用户行为监测数据
	 * saveUserbehaviorByOpName 
	 * void
	 * @exception
	 * @since 1.0.0
	 */
	public void saveUserbehaviorByOpName() {
		String opname = getPara("opname");
		String userid = getPara("userid");
		String roleid = getPara("roleid");
		String page = getPara("page");
		Record re = Db.findFirst("select id from trt_operatepoint where operatename = ? and pagename = ? and system = 'triage'",opname,page);
		if(re!=null){
			String id = IdWorker.nextId();
			Date operatetime = new Date();
			int a = Db.update("insert into trt_useroperatepoint (id,op_id,userid,"
					+ "roleid,status,operatetime) values (?,?,?,?,?,?)",
					id,re.getStr("id"),userid,roleid,"",operatetime);
			if(a>0){
				renderJson(ResultMessage.build(200, "用户行为数据添加成功"));
			}else{
				renderJson(ResultMessage.build(400, "用户行为数据添加失败"));
			}
		}else{
			renderJson(ResultMessage.build(400, "用户行为数据添加失败"));
		}
	}
	
	/**
	 * 获取服务器当前时间
	 * getnowtime 
	 * void
	 * @exception
	 * @since 1.0.0
	 */
	public void getnowtime(){
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowtime = df.format(new Date());
        
		renderJson(new ResultMessage(200,"查询成功",nowtime));
	}
	/**
	 * 结束（新人指引、更新说明）
	 */
	public void finishGuide(){
		String guide_name = getPara("guide_name");
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
//		String userid = session.getAttribute("userid").toString();
//		Cache rescueCache = Redis.use();
		bbsCache.set(guide_name+"_"+userid,1);
		renderJson(ResultMessage.build(200, "查询成功"));
	}
	
	/**
	 * 查询报特殊选项
	 */
	public void querySpecialOptions(){
		List<Record> relist = Db.find(Db.getSql("index.querySpecialOptions"),"报特殊选项");
		if(relist !=null){
			renderJson(ResultMessage.build(200, "查询成功",relist));
		}else{
			renderJson(ResultMessage.build(400, "查询失败，可能因为网络故障原因，请重新操作"));
		}
		
	}
	
	/**
	 * 查询系统配置项
	 */
	public void sysDeploy(){
		String id = getPara("id");
		Record re = Db.findFirst(Db.getSql("index.sysDeploy"),id);
		if(re !=null){
			renderJson(ResultMessage.build(200, "查询成功",re));
		}else{
			renderJson(ResultMessage.build(400, "查询失败，可能因为网络故障原因，请重新操作"));
		}
		
	}
	
	
	/**
	 * 根据code 查询 icd 10 对应显示详情
	 */
	public void showIcdDetail(){
		String code = getPara("code");
		List<Record> list = Db.find("select * from stt_icd_10 where code=?",code);
		if(list !=null){
			renderJson(ResultMessage.build(200, "查询成功",list));
		}else{
			renderJson(ResultMessage.build(400, "查询失败，可能因为网络故障原因，请重新操作"));
		}
		
	}
	/**
	 * 版本说明
	 */
	public void versionList(){
		List<Record> list = Db.find("SELECT id,state,content,create_time from stt_version_show where m_id=0 and state=0");
		List<Record> li = new ArrayList();
		//String content =((String) record.get("content")).replaceAll("\n", "<br>");
		for (Record record : list) {
			record.set("content", record.get("content").toString().replaceAll("\n", "<br>"));
			System.out.println(record.get("content"));
			li.add(record);
		}
		renderJson(ResultMessage.build(200, "查询成功",li));
	}
	
	/**
	 * 查询诊室列表
	 */
	public void queryRoomList(){
		List<Record> relist = Db.find(Db.getSql("index.queryRoomList"));
		if(relist !=null){
			renderJson(ResultMessage.build(200, "查询成功",relist));
		}else{
			renderJson(ResultMessage.build(400, "查询失败，可能因为网络故障原因，请重新操作"));
		}
	}
	/**
	 * 诊室候诊列表
	 */
	public void queryRoomWaitList(){
		String room_id = getPara("room_id");
		List<Record> relist = Db.find(Db.getSql("index.queryRoomWaitList"),room_id);
		if(relist !=null){
			renderJson(ResultMessage.build(200, "查询成功",relist));
		}else{
			renderJson(ResultMessage.build(400, "查询失败，可能因为网络故障原因，请重新操作"));
		}
	}
	
	public void findstatus(){
		Record l =  Db.findFirst("SELECT count(1) status,TIMESTAMPDIFF(MONTH,c.try_start_time,c.try_end_time) m from stt_ve_c c where  c.try_end_time<NOW() and c.`status`=0 ");
		renderJson(ResultMessage.build(200, "查询成功",l));
		
	}
	
	public void findprojectname(){
//		String project_name = PropKit.use("conf.properties").get("version");
		String project_name = PropKit.get("project_name");
		renderJson(ResultMessage.build(200, "查询成功",project_name));
		
	}
	
	// 保存院前 急救 gps
	public void savePreGpsInfo() {
		String p_id = getPara("patient_id");
		String p_x = getPara("point-x");
		String p_y = getPara("point-y");
	

		try {

			Db.update("insert into pre_gps_info values(?,?,?,?,?)",
					IdWorker.nextId(), p_id, p_x, p_y, new Date());

			renderJson(new ResultMessage(200, "操作成功！"));
		} catch (Exception e) {
			renderJson(new ResultMessage(400, e.getMessage()));
		}

	}
	
	// 保存院前 急救 gps
	public void getPreGpsInfo() {
		String p_id = getPara("patient_id");

		try {

			Record r = Db.findFirst("select `point-x` x,`point-y` y,createtime,id from pre_gps_info where p_id=? order by createtime desc",
					 p_id);

			renderJson(new ResultMessage(200, "操作成功！",r));
		} catch (Exception e) {
			renderJson(new ResultMessage(400, e.getMessage()));
		}

	}
}