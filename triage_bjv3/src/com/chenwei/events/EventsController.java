package com.chenwei.events;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;

import com.chenwei.divid.TriageDividController;
import com.chenwei.jfinal.IdWorker;
import com.chenwei.jfinal.ResultMessage;
import com.chenwei.util.PatientCommon;
import com.chenwei.util.PatientRecord;
import com.chenwei.util.WaitTime;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;



public class EventsController extends Controller {

	private static Logger log = Logger.getLogger(EventsController.class);

	public void index() {
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/events/index", "突发公共卫生事件", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
		
		//中文乱码
		String name =getPara("name");
		if (name != null) {
			try {
				name = URLDecoder.decode(name , "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		setAttr("evevtsid", getPara("evevtsid"));
		
		setAttr("name", name);
		setAttr("num", getPara("num"));
		render("outburst.html");
	}
	
	
	public void add() {
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String roleid = inf.split("\\|")[5];
		List<Record> list= Db.find("select fztj from stt_role where tr_id=?",roleid);
		String fztj = "0";
		if(list.size()>0){
			fztj = list.get(0).getStr("fztj");
		}
		setAttr("fztj",fztj);
		render("outburst-new.html");
	}
	
    public void queryEvents() {
		String name = getPara("name");
		String begin = getPara("begin");
		String end = getPara("end");
		

		if(StrUtil.isBlank(name))
		{
			name= "%%" ;
		}else{
			name= "%"+name+"%" ;
		}
		

		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		Page<Record> l = null;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String nowtime = df.format(new Date());
		if(StrUtil.isBlank(begin)&&StrUtil.isBlank(end))
		{
			l = Db.paginate(page, 
	   				rows, Db.getSql("events.list"),Db.getSql("events.fromlist")+Db.getSql("events.orderBy"),name);
		}else if(!StrUtil.isBlank(begin)&&StrUtil.isBlank(end)){
			l = Db.paginate(page, 
		   				rows, Db.getSql("events.list"),Db.getSql("events.fromlist")+Db.getSql("events.listBegin")+Db.getSql("events.orderBy"),name,begin);
		}else if(StrUtil.isBlank(begin)&&!StrUtil.isBlank(end)){
			if(nowtime.equals(end)){
				int day =Integer.parseInt(end.substring(8, 10))+1;
				end=end.substring(0, 8)+day;
			}
			l = Db.paginate(page, 
		   				rows, Db.getSql("events.list"),Db.getSql("events.fromlist")+Db.getSql("events.listEnd")+Db.getSql("events.orderBy"),name,end);
		}else{
			if(begin.equals(end) || nowtime.equals(end)){
				int day =Integer.parseInt(end.substring(8, 10))+1;
				end=end.substring(0, 8)+day;
			}
			l = Db.paginate(page, 
		   				rows, Db.getSql("events.list"),Db.getSql("events.fromlist")+Db.getSql("events.listBegin")+Db.getSql("events.listEnd")+Db.getSql("events.orderBy"),name,begin,end);
		}
		if(l!=null){
			renderJson(ResultMessage.build(200, "查询成功",l.getTotalRow(),l.getList()));
		}else{
			renderJson(ResultMessage.build(400, "查询失败"));
		}
    }
    
    public void getIds(){
    	int num = getParaToInt("num");
   
    	List<String> ids = new ArrayList<String>(); 
    	
    	
    	Record r = null;
    	String result = "" ;
    	r = Db.findFirst("select * from trt_patient_seq where id=2");
		String s = r.getStr("seq");
		int seq = Integer.parseInt(s);
		String date = r.getStr("date");
		String now = DateUtil.today();
		if(StrUtil.equals(now, date)){
			Db.update("update trt_patient_seq set seq = ? where id=2",seq + num);
			result = DateUtil.format(new Date(), "yyyyMMdd");
//			if(seq<10){
//				result += "0"+ seq;
//			}else{
//				result +=  seq;
//			}
		}else{
			Db.update("update trt_patient_seq set seq = ?,date=? where id=2",num,now);
			result = DateUtil.format(new Date(), "yyyyMMdd");
			seq = 0;
//			result +=  "01";
		}
		
		for(int i=1;i<=num;i++){
			
			int int_id = i+seq;
			String str_id = result + StrUtil.fillBefore(Integer.toString(int_id), '0', 2);
			ids.add(str_id);
		}
		
    	renderJson(ResultMessage.build(200, "查询成功",ids.size(),ids));
    }
    
    public void save(){
    	
    	try{
    		int num = getParaToInt("num");
        	String name = getPara("name");
        	String id = getPara("id");
        	String pidd = getPara("pid");
        	String dividtime = DateUtil.now();
        	String nurseid = getPara("nurseid");
        	String symtpomidss = getPara("symtpomids");
        	String edts_idsss = getPara("edts_idss");
        	String mews_idsss = getPara("mews_idss");
        	String nursename = getPara("nursename");
        	String savestatus = "未接诊";
        	String status ="save";
        	String del=getPara("del");
        	//供APP删除事件及事件关联患者
        	if(!StrUtil.isBlank(del)){
        		if(del.equals("del")){
            		Db.update("delete from trt_events where id=?",id);
            		Db.update("delete from trt_patient where eventid=?",id);
            		renderJson(ResultMessage.build(200, "操作成功"));
            		return;
            	}
            	if(del.equals("delpatient")){
            		Db.update("delete from trt_patient where id=?",pidd);
            		renderJson(ResultMessage.build(200, "操作成功"));
            		return;
            	}
        	}
        	//事件生成时分诊时间为null,如果信息填写完整，更新分诊时间。无完整，则分诊时候根据事件id更新分诊时间
        	if(StrUtil.isBlank(id)){
        		id=IdWorker.nextId();
            	Db.update( Db.getSql("events.insert"), id,name,null,null,num,nurseid);
        	}else{
        		Db.update( "update trt_events set num =?,name=? where id=?", num,name,id);
        	}
        	String patientss = getPara("paitents");
        	if(!StrUtil.isBlank(patientss)){
        		String[] patients = patientss.split("#X#");
            	String[] symtpomids = symtpomidss.split("#");
            	String[] edts_idss = edts_idsss.split("#");
            	String[] mews_idss = mews_idsss.split("#");
            	
            	for(int i=0;i<patients.length;i++){
            		String patient = patients[i];
            		String[] info = patient.split(";");
            		String pid = "";
            		String fullname = info[1];
            		if(fullname.equals("无名氏")){
            			pid = TriageDividController.getNonameSep();
            			fullname += pid;
            		}else{
            			pid =info[0];
            		}
            		String gender = info[2];
            		String bornday = (info[3].equalsIgnoreCase("0"))? "":info[3];
            		String consciousness = (info[4].equalsIgnoreCase("0"))? "":info[4];
            		//System.out.println(info[9]);
            		//System.out.println(info[9].equalsIgnoreCase("0"));
            		String ssy = (info[5].equalsIgnoreCase("0"))? "":info[5];
            		String szy = (info[6].equalsIgnoreCase("0"))? "":info[6]; 	
            		String maibo = (info[7].equalsIgnoreCase("0"))? "":info[7];
            		String huxi = (info[8].equalsIgnoreCase("0"))?"":info[8];
            		String autograde = (info[9].equalsIgnoreCase("0"))?"":info[9];
            		
            		
            		String finalgrade = (info[10].equalsIgnoreCase("0"))?"":info[10];
            		String zhusu = (info[11].equalsIgnoreCase("0"))?"":info[11];
            		String changereason = (info[12].equalsIgnoreCase("0"))?"":info[12];
            		String edts_ids_qita = (info[13].equalsIgnoreCase("0"))?"":info[13];
            		String edts_ids_qitastatus = (info[14].equalsIgnoreCase("0"))?"":info[14];
            		String mews_score = (info[15].equalsIgnoreCase("0"))?"":info[15];
            		String edts_score = (info[16].equalsIgnoreCase("0"))?"":info[16];
            		String category = (info[17].equalsIgnoreCase("0"))?"":info[17];
            		String source = (info[18].equalsIgnoreCase("0"))?"":info[18];
            		String lyfs = (info[19].equalsIgnoreCase("0"))?"":info[19];
            		String tiwen = (info[20].equalsIgnoreCase("0"))?"":info[20];
            		String cardnum = (info[21].equalsIgnoreCase("0"))?"":info[21];
            		String pain = (info[22].equalsIgnoreCase("0"))?"":info[22];
            		String gcs = (info[23].equalsIgnoreCase("0"))?"":info[23];
            		String chooseDepart = (info[24].equalsIgnoreCase("0"))?"":info[24];
            		String reasondetail = (info[25].equalsIgnoreCase("0"))?"":info[25];
            		dividtime = (info[26].equalsIgnoreCase("0"))? dividtime:info[26];
            		String anamnesis = (info[27].equalsIgnoreCase("0"))? "":info[27];
            		String age = (info[28].equalsIgnoreCase("0"))? "":info[28];
            		String symtpomid = (symtpomids[i].equalsIgnoreCase("0"))?"":symtpomids[i];
            		String edts_ids = (edts_idss[i].equalsIgnoreCase("0"))?"":edts_idss[i];
            		String mews_ids = (mews_idss[i].equalsIgnoreCase("0"))?"":mews_idss[i];
            		 
            		String cixu = "1";
            		
//            		String reasondetail = "";
//            		if(!(StrUtil.equals(changereason, "病情减轻")||StrUtil.equals(changereason, "病情加重")||StrUtil.equals(changereason, "操作失误")||StrUtil.equals(changereason, "其他"))){
//            			reasondetail = changereason ;
//            			changereason = "";
//            		}
            		//内容未填满，状态=未分诊
    				if (bornday.equalsIgnoreCase("") || cardnum.equalsIgnoreCase("")
    						|| ssy.equalsIgnoreCase("") || szy.equalsIgnoreCase("")
    						|| maibo.equalsIgnoreCase("")
    						|| huxi.equalsIgnoreCase("")
    						|| tiwen.equalsIgnoreCase("")
    						|| autograde.equalsIgnoreCase("")
    						|| source.equalsIgnoreCase("")
    						|| lyfs.equalsIgnoreCase("")
    						|| consciousness.equalsIgnoreCase("")
    						|| chooseDepart.equalsIgnoreCase("")||anamnesis.equalsIgnoreCase("")) {
    					savestatus = "未分诊";
    					status = "draf";
    				}
            		Db.update(Db.getSql("events.insertPatient"), pid, cardnum, fullname, gender, bornday, "", category,
    						"", "","", null, null, "", "", lyfs, consciousness,
    						anamnesis, savestatus,age,source,"",id);
            		PatientCommon.savePatientCommon(pid, cardnum, fullname, gender, age, bornday, "", category, "", "", "", "", "", "", "", "");
            		String sighid = IdWorker.nextId();
    				Db.update(Db.getSql("divid.insertPatientSigh"), sighid, pid, huxi, tiwen, maibo, "", "", szy, ssy, null, null,
    						"", "", "", "", "", "", "", "", "", "", "", "","1",anamnesis,consciousness,0);
    				
    				String handleid = IdWorker.nextId();
    				Db.update(Db.getSql("divid.insertHandle"), handleid, pid, dividtime, null,"", autograde, finalgrade,
    						changereason, reasondetail, nursename,nurseid, chooseDepart, "", zhusu,"1","1",status,0);
    				if(savestatus.equals("未接诊")){
    					Db.update("update trt_events set dividtime=? where id=?", new Date(),id);
    				}
    				if (!StrUtil.isBlank(symtpomid)) {
    					String[] symtpomidArr = symtpomid.split(",");
    					Db.update(Db.getSql("divid.deletePatientSymptom"), pid,"QG",cixu);
    					for (String sid : symtpomidArr) {
    						String psid = IdWorker.nextId();
    						//保存类型为 快速分级  QG
    						Db.update(Db.getSql("divid.insertPatientSymptom"), psid, pid, sid,"QG",cixu,new Date());
    					}

    				} else {
    					Db.update(Db.getSql("divid.deletePatientSymptom"), pid,"QG",cixu);
    				}
    				
    				if (!StrUtil.isBlank(edts_ids)) {
    					String[] edts_idArr = edts_ids.split(",");
    					Db.update(Db.getSql("divid.deletePatientSymptom"), pid,"EDTS",cixu);
    					for (String sid : edts_idArr) {
    						String psid = IdWorker.nextId();
    						//保存类型为 EDTS
    						Db.update(Db.getSql("divid.insertPatientSymptom"), psid, pid, sid,"EDTS",cixu,new Date());
    					}
    					//添加手动输入其他选项的信息
    					if(!StrUtil.isBlank(edts_ids_qitastatus) && edts_ids_qitastatus.equals("true")){
    						String psid = IdWorker.nextId();
    						Db.update("insert into trt_patient_symptom (id,patient_id,symptom_id,symptom_type,m_id,symptom_id_value,cixu) values(?,?,?,?,'0',?,?)", psid, pid, "e-b-8-4","EDTS",edts_ids_qita,cixu);
    					}
    	 
    				} else {
    					Db.update(Db.getSql("divid.deletePatientSymptom"), pid,"EDTS",cixu);
    				}
    				
    				if (!StrUtil.isBlank(mews_ids)) {
    					String[] mews_idArr = mews_ids.split(",");
    					Db.update(Db.getSql("divid.deletePatientSymptom"), pid,"MEWS",cixu);
    					for (String sid : mews_idArr) {
    						String psid = IdWorker.nextId();
    						//保存类型为 EDTS
    						Db.update(Db.getSql("divid.insertPatientSymptom"), psid, pid, sid,"MEWS",cixu,new Date());
    					}
    				} else {
    					Db.update(Db.getSql("divid.deletePatientSymptom"), pid,"MEWS",cixu);
    				}
    				
    				if (!(StrUtil.isBlank(edts_score)&&StrUtil.isEmpty(edts_score))) {
    					List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),pid,"EDTS",cixu);
    					if(list.size()>0){
    						Db.update(Db.getSql("divid.updateScore"), edts_score, new Date(), cixu,pid,"EDTS");
    					}else{
    						Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), pid, edts_score,"EDTS",new Date(),"0",cixu,autograde,nurseid);
    					}
    				} 
    				
    				if (!(StrUtil.isBlank(mews_score)&&StrUtil.isEmpty(mews_score))) {
    					List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),pid,"MEWS",cixu);
    					if(list.size()>0){
    						Db.update(Db.getSql("divid.updateScore"), mews_score, new Date(),cixu, pid,"MEWS");
    					}else{
    						Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), pid, mews_score,"MEWS",new Date(),"0",cixu,autograde,nurseid);
    					}
    				}
    				if (!(StrUtil.isBlank(pain)&&StrUtil.isEmpty(pain))) {
    					List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),pid,"PAIN",cixu);
    					if(list.size()>0){
    						Db.update(Db.getSql("divid.updateScore"), pain, new Date(),cixu, pid,"PAIN");
    					}else{
    						Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), pid, pain,"PAIN",new Date(),"0",cixu,autograde,nurseid);
    					}
    				}
    				if (!(StrUtil.isBlank(gcs)&&StrUtil.isEmpty(gcs))) {
    					List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),pid,"GCS",cixu);
    					if(list.size()>0){
    						Db.update(Db.getSql("divid.updateScore"), gcs, new Date(),cixu, pid,"GCS");
    					}else{
    						Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), pid, gcs,"GCS",new Date(),"0",cixu,autograde,nurseid);
    					}
    				}
    				
    				PatientRecord.insertPatientRecord(IdWorker.nextId(), pid, cardnum, "", savestatus, nurseid);
            	}
        	}
        	
        	renderJson(ResultMessage.build(200, "保存成功",id));
        		
    	}catch(Exception e){
    		e.printStackTrace();
    		renderJson(ResultMessage.build(400, "保存失败"));
    	}
    	
    }
    
    public void seachPatient() {
		//System.out.println("begin!!!!!!!!!");
		String searchText = getPara("searchText");
		//System.out.println(searchText);
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		String sort = getPara("sort");
		String order = getPara("order");
		String orderByStr="";
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			sort = sort.replace("age", "days");
			orderByStr = " order by "+sort + " " + order;
		}

		Page<Record> l = null;
		
	   	l = Db.paginate(page, 
	   				rows, 
	   				Db.getSql("index.listSelect")+Db.getSql("events.signListSelect")+Db.getSql("index.addGrade_name")+Db.getSql("index.addSpecial")+Db.getSql("index.addDepartment_name")+Db.getSql("events.addDays"),
	   			    //条件添加排除了“已退回”患者
	   				Db.getSql("events.listFromNoDel")+orderByStr,
	   				searchText);
	   	
	   	renderJson(ResultMessage.build(200, "查询成功",l.getTotalRow(),l.getList()));
	}
    
    //更新接诊时间方法  逻辑：同一公共时间id 下接诊的
    public static boolean updateEventReciveTime(String id,String time) {
    	try{
    		Record l = Db.findFirst(
    				Db.getSql("index.listSelect")+
    				Db.getSql("index.listFromById"),id);
    		
    		if(l!=null){
    			String eventid= l.getStr("eventid");
    			if(!StrUtil.isBlank(eventid)){
    				Record l1 = Db.findFirst("select count(1) as num  from trt_patient where eventid=? and (`status`='未接诊' or `status`='未分诊')", eventid);
    				int num = l1.getInt("num");
    				if(!(num>0)){
    					Db.update(Db.getSql("events.updateRecivetime"),time,eventid);
    				}
    			}
    			return true;
    		}else{
    			return false;
    		}
    		}catch(Exception e){
    			return false;
    		}
		
	}
    
    /**
     * 获取一周前的事件
     */
    public void queryWeekEvents() {
    	List<Record> list = Db.find(Db.getSql("events.selectWeekevents"));
		if(list!=null){
			renderJson(ResultMessage.build(200, "查询成功",list.size(),list));
		}else{
			renderJson(ResultMessage.build(400, "查询失败"));
		}
    }
    

}