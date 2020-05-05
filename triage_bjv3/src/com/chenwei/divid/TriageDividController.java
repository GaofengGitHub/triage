package com.chenwei.divid;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpRequest;
import org.apache.log4j.Logger;
import org.codehaus.groovy.binding.FullBinding;

import sun.misc.BASE64Decoder;

import com.alibaba.fastjson.JSONObject;
import com.chenwei.jfinal.IdWorker;
import com.chenwei.jfinal.ResultMessage;
import com.chenwei.services.ICalculateServicePortTypeProxy;
import com.chenwei.util.PatientCommon;
import com.chenwei.util.PatientRecord;
import com.chenwei.util.WaitTime;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.google.common.util.concurrent.ExecutionError;
import com.jfinal.core.Controller;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;

public class TriageDividController extends Controller {

	private static Logger log = Logger.getLogger(TriageDividController.class);

	public void index() {
		
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/divid/index", "新增患者", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
		
		String name =getPara("name");
		if (name != null) {
			try {
				name = URLDecoder.decode(name , "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		
		setAttr("id", getPara("id"));
		setAttr("type", getPara("type"));
		setAttr("path", getPara("path"));
		setAttr("status", getPara("status"));
		setAttr("evevtsid", getPara("evevtsid"));
		setAttr("name", name);
		setAttr("num", getPara("num"));
		setAttr("befrom",getPara("befrom"));
		
		List<Record> list= Db.find("select fztj from stt_role where tr_id=?",roleid);
		String fztj = "0";
		if(list.size()>0){
			fztj = list.get(0).getStr("fztj");
		}
		setAttr("fztj",fztj);
		
		
		List<Record> collist= Db.find("select * from stt_pat_col");
		JSONArray jsons = JSONUtil.parseArray(collist);
		
		setAttr("collist",jsons);
		
		List<Record> grouplist= Db.find("select `group` from stt_pat_col group by `group` having `group` <>'' and `group` is not null ");
		List<Object> lists = new ArrayList<Object>();
		if(grouplist!=null){
			for(int j=0;j<grouplist.size();j++){
				List<Record> clist = Db.find("select * from stt_pat_col where `group`=? order by id",grouplist.get(j).getStr("group"));
				lists.add(clist);
			}
			JSONArray jsonss = JSONUtil.parseArray(lists);
			setAttr("grouplist", jsonss);
		}
		
		
		if(bbsCache.exists("fz_pc_guide_divid_"+userid)){
			setAttr("guide", 0);
		}else{
			setAttr("guide", 1);
		}
		render("divid.html");
	}
	
	public void grade() {
		render("../grade/showgrade.html");
	}
	/**
	 * 
	 * idInfo(身份证读取) void
	 * 
	 * @exception
	 * @since 1.0.0
	 */
	public void idCardRead() {
		String json = "";
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			json = HttpUtil.post(PropKit.get("monitorAddress")
					+ "/scanerRegister",map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 保存数据

		JSONObject p = JSONObject.parseObject(json);
		renderJson(ResultMessage.build(200, "查询成功",p));
	}
	
	
	/**
	 * 
	 * infoPrint(信息腕带打印) void
	 * 
	 * @exception
	 * @since 1.0.0
	 */
	public void infoPrint() {
		String id = getPara("id");
		Record r = Db.findFirst(" select * from  trt_patient where id = ? ",
				id);
		renderJson(ResultMessage.build(200, "查询成功",r));
	}
	public void queryPatientById() {
		//System.out.println("begin!!!!!!!!!");
		String id = getPara("id");
		Record l = Db.findFirst(
				Db.getSql("index.listSelectAddEvents")+
				Db.getSql("index.listFromById"),id);
	   	renderJson(ResultMessage.build(200, "查询成功",l));
	}
	public void queryPatientSignById() {
		
		String id = getPara("id");

		String cixu = getPara("cixu");
		
		Record l = null;
		if(StrUtil.isBlank(cixu)){
			 l = Db.findFirst(
					Db.getSql("divid.signListSelect")+
					Db.getSql("divid.listFromByPid"),id);
		}else{
			l = Db.findFirst(Db.getSql("divid.signListSelect")+
								Db.getSql("divid.listFromByPidAndCixu"),id,cixu);
		}
	
		
	   	renderJson(ResultMessage.build(200, "查询成功",l));
	}
	
	public void queryHisInfo(){
		
		ICalculateServicePortTypeProxy pro = new ICalculateServicePortTypeProxy();
		String result ="";
		String cardnum = getPara("cardnum");
		// String result = "<root><result><order_id></order_id><p_bar_code>3002405454</p_bar_code><patient_id>001154982600</patient_id><times></times><outpatient_no></outpatient_no><inpatient_no></inpatient_no><patient_name>杨建</patient_name><birthday>1987-08-01 00:00:00.0</birthday><sex>男</sex><race>汉族</race><patient_address>null</patient_address><home_tel></home_tel><ward_sn></ward_sn><ward_name></ward_name><bed_no></bed_no><exec_class></exec_class><patient_type>2</patient_type><refer_date></refer_date><refer_dept></refer_dept><refer_dept_name></refer_dept_name><refer_doctor></refer_doctor><refer_doctor_name></refer_doctor_name><exam_item></exam_item><exam_name></exam_name><exam_cost></exam_cost><charge_status>4</charge_status><bingsi></bingsi><zhenduan></zhenduan></result></root>";
		
		try { 
			result = pro.funInterFace(
			"<funderService functionName='jc_GetPatientInfo'><value>" + cardnum
		 	+
		  	"</value><value></value><value></value><value></value><value></value><value></value><value>jz</value></funderService>"
		); 
			cn.hutool.json.JSONObject json = JSONUtil.parseFromXml(result);
			cn.hutool.json.JSONObject json2 = JSONUtil.parseObj(json.get("root"));
			cn.hutool.json.JSONObject l = JSONUtil.parseObj(json2.get("result"));

			//挂号时间
			String gh_date = "";
			String hisid = l.get("patient_id").toString();
			if(StrUtil.isNotBlank(hisid)){
				String status = pro.funInterFace("<funderService functionName='jc_GetPatientStatus'><value>" + hisid + "</value><value>"+"1170000"+"</value></funderService>");
				cn.hutool.json.JSONObject json11 = JSONUtil.parseFromXml(status);
				cn.hutool.json.JSONObject json22 = JSONUtil.parseObj(json11.get("root"));
				cn.hutool.json.JSONObject json3 = JSONUtil.parseObj(json22.get("result"));
				gh_date = json3.get("gh_date").toString();
			}
			//添加
			l.append("gh_date", gh_date);
			renderJson(ResultMessage.build(200, "查询成功",l));
		} catch (Exception e) { // TODO Auto-generated catch block
			e.printStackTrace(); 
			renderJson(ResultMessage.build(400, "查询失败"));
		}
		/****/
  
	}
	
	//通过卡号cardnum查询患者信息
	public void queryPatientByCardNum() {
		//System.out.println("begin!!!!!!!!!");
		String cardnum = getPara("cardnum");
		String idcard  = getPara("idcard");
		String fullname = getPara("fullname");
		String bornday  = getPara("bornday");
		String gender   = getPara("gender");
		
		String project_name = PropKit.get("project_name");
			Record record = null  ;
			if(!StrUtil.isBlank(cardnum)){
				 record = Db.findFirst(
						Db.getSql("index.listSelect")+Db.getSql("index.listSelectPAADMVisitNumber")+
						Db.getSql("index.listFromByCardNum")+" ORDER BY t2.dividtime DESC LIMIT 1",cardnum);
			}
			if(record==null){
				record =  PatientCommon.queryPatientCommon(cardnum);
			}
			if(record==null){
				if(project_name.equals("wh")){
					//武汉
					//如果本地未能通过卡号获取，则查找his表中的患者信息
					Record l1 = Db.findFirst(Db.getSql("divid.queryHisPatientByCardNum"),cardnum);
					if(l1 == null){
						ICalculateServicePortTypeProxy pro = new ICalculateServicePortTypeProxy();
						String result ="";
						// String result = "<root><result><order_id></order_id><p_bar_code>3002405454</p_bar_code><patient_id>001154982600</patient_id><times></times><outpatient_no></outpatient_no><inpatient_no></inpatient_no><patient_name>杨建</patient_name><birthday>1987-08-01 00:00:00.0</birthday><sex>男</sex><race>汉族</race><patient_address>null</patient_address><home_tel></home_tel><ward_sn></ward_sn><ward_name></ward_name><bed_no></bed_no><exec_class></exec_class><patient_type>2</patient_type><refer_date></refer_date><refer_dept></refer_dept><refer_dept_name></refer_dept_name><refer_doctor></refer_doctor><refer_doctor_name></refer_doctor_name><exam_item></exam_item><exam_name></exam_name><exam_cost></exam_cost><charge_status>4</charge_status><bingsi></bingsi><zhenduan></zhenduan></result></root>";
						
						try { 
							result = pro.funInterFace(
							"<funderService functionName='jc_GetPatientInfo'><value>" + cardnum
						 	+
						  	"</value><value></value><value></value><value></value><value></value><value></value><value>jz</value></funderService>"
						); 
							cn.hutool.json.JSONObject json = JSONUtil.parseFromXml(result);
							cn.hutool.json.JSONObject json2 = JSONUtil.parseObj(json.get("root"));
							cn.hutool.json.JSONObject l = JSONUtil.parseObj(json2.get("result"));

							//挂号时间
							String gh_date = "";
							String hisid = l.get("patient_id").toString();
							if(StrUtil.isNotBlank(hisid)){
								String status = pro.funInterFace("<funderService functionName='jc_GetPatientStatus'><value>" + hisid + "</value><value>"+"1170000"+"</value></funderService>");
								cn.hutool.json.JSONObject json11 = JSONUtil.parseFromXml(status);
								cn.hutool.json.JSONObject json22 = JSONUtil.parseObj(json11.get("root"));
								cn.hutool.json.JSONObject json3 = JSONUtil.parseObj(json22.get("result"));
								gh_date = json3.get("gh_date").toString();
							}
							//添加
							l.append("gh_date", gh_date);
							renderJson(ResultMessage.build(200, "查询成功",l));
						} catch (Exception e) { // TODO Auto-generated catch block
							e.printStackTrace(); 
							renderJson(ResultMessage.build(400, "查询失败"));
						}
					}else{
						renderJson(ResultMessage.build(200, "查询成功",l1));
					}
				}else{
					Map<String, Object> paramMap = new HashMap<String, Object>();
					paramMap.put("cardnum", cardnum);
					paramMap.put("idcard", idcard);
					paramMap.put("fullname", fullname);
					paramMap.put("bornday", bornday);
					paramMap.put("gender", gender);
					String json =  HttpUtil.post(PropKit.get("EcsServerAddress")
							+ "/ecs/getPatFzInfo", paramMap);
					System.out.println(PropKit.get("EcsServerAddress")+ "/ecs/getPatFzInfo:"+json);
					renderJson(json);
				}
			}else{
				Record r =  PatientCommon.queryPatientCommon(cardnum);
				if(r!=null){
					record.setColumns(r);
				}
		   	    renderJson(ResultMessage.build(200, "查询成功",record));
			}
	}
	
	public void save() {
		ResultMessage resultMessage = new ResultMessage();
		System.out.println("----begin----save");
		//家属电话
		String parenttel = getPara("parenttel");
		//来院原因
		String reason = getPara("reason");
		//家庭住址
		String address = getPara("address");
		//第几次评级
		String cixu = getPara("cixu");

		//存储方式
		String savestatus = getPara("savestatus");
		
		//最大评级次数
		String maxcixu = getPara("maxcixu");
		
		//是否修改评级
		String xgpj = getPara("xgpj");
		
		//非急诊标志
	    String feijz = getPara("feijz");
		
		//his 系统id
		String hisid = getPara("hisid");
		//患者就诊号
		String PAADMVisitNumber = getPara("PAADMVisitNumber");
		//左上角基础信息
		String id = getPara("id");
		String fullname  = getPara("fullname");
		String anonymous = "";
		if(fullname.contains("无名氏")){
			anonymous = "1";
		}
		String cardnum = getPara("cardnum");
		String bornday = getPara("bornday");
		String gender = getPara("gender");
		String tel = getPara("tel");
		String memberstel = getPara("memberstel");
		String idcard = getPara("idcard");
		String category = getPara("category");
		String admission = getPara("admission");
		String greenchannel = getPara("greenchannel");
		String others = getPara("others");
		String consciousness = getPara("consciousness");
		String anamnesis = getPara("anamnesis");
		String status = getPara("status");
		String card_type = getPara("card_type");
		String age = getPara("age");
		String allergic_history = getPara("allergic_history");
		String  registertime = getPara("registertime");
		if(registertime.equals("")){
			registertime = null;
		}
		//来源
		String source = getPara("source");
		//主诉
		String zhusu = getPara("zhusu");
		//体征信息
		String sg = getPara("sg");
		String tz = getPara("tz");
		String hx = getPara("hx");
		String tw = getPara("tw");
		String mb = getPara("mb");
		String szy = getPara("szy");
		String ssy = getPara("ssy");
		String spo2 = getPara("spo2");
		String pcn = getPara("pcn");
		String il6 = getPara("il6");
		String crp = getPara("crp");
		String cea = getPara("cea");
		String afp = getPara("afp");
		String myo = getPara("myo");
		String ddimer = getPara("ddimer");
		String fer = getPara("fer");
		String ntprobnp = getPara("ntprobnp");
		String hsctnl = getPara("hsctnl");
		String ckmb = getPara("ckmb");
		String ctnt = getPara("ctnt");
		String ca = getPara("ca");
		String sighid = getPara("sighid");
		
		//分诊信息
		String handleid = getPara("handleid");
		String finalgrade = getPara("finalgrade");
		String autograde = getPara("autograde");
		String changereason = getPara("changereason");
		String reasondetail = getPara("reasondetail");
		String hljl = getPara("hljl");
		String dividenurse = getPara("nurse");
		String dividenurseid = getPara("nurseid");
		String dividdepartment = getPara("deptment");
		String departmentname = getPara("deptmentname");
		String d = getPara("dividtime");
		
		String GreenChFlag = getPara("GreenChFlag");
		String ThreeNoFlag = getPara("ThreeNoFlag");
		//快速分级症状id
		String symtpomid = getPara("symtpomid");
		//2019-4-17 于世明 自定义快速分级 内容和级别
		String symtpomzdyvalue = getPara("symtpomzdyvalue");
		String symtpomzdygrade = getPara("symtpomzdygrade");
		
		//ETDS 症状id
		String edts_ids = getPara("edts_ids");
		//增加 其他选项 的手动输入框
		String edts_ids_qitastatus = getPara("edts_ids_qitastatus");
		String edts_ids_qita = getPara("edts_ids_qita");
		//MEWS 症状id
		String mews_ids = getPara("mews_ids");
		
		//etds 总分
		String edts_score = getPara("edts_score");
		String mews_score = getPara("mews_score");
		String pain_score = getPara("pain_score");
		String gcs_score = getPara("gcs_score");
		String fast_score = getPara("fast_score");
		
		
		//体征评级
		String sign_grade = getPara("sign_grade");
		
		String signurl = getPara("signurl");
		String supplement = getPara("supplement");
		//事件id，原有事件
		String events_id = getPara("events_id");
		//事件名，新增事件
		String events_name = getPara("events_name");
		String old_events = getPara("old_events");
		//暂存演示数据
		String remark = getPara("remark");
		//入抢救室
		String go_rct = getPara("go_rct");
		int ybcixu = 1;
		int maxcx = 1;
		boolean aa = StrUtil.isBlank(maxcixu);
		boolean bb = !StrUtil.isBlank(maxcixu);
		String mewsgrade = getPara("mewsgrade");
		String GCS_xq = getPara("GCS_xq");
		if(!StrUtil.isBlank(maxcixu)){
			maxcx = Integer.parseInt(maxcixu);
		}
		if(!StrUtil.isBlank(cixu)){
			ybcixu = Integer.parseInt(cixu);
		}
		if(StrUtil.isBlank(events_id) && !StrUtil.isBlank(events_name)){
			events_id =IdWorker.nextId();
			Db.update( Db.getSql("events.insert"), events_id,events_name,d,null,1,dividenurseid);
		}
		if(!StrUtil.isBlank(events_id) ){
			Db.update("update trt_events set dividtime=? where (dividtime is null or dividtime>?  or num=1) and id=?", d,d,events_id);
			
		}
		try {
			if(StrUtil.isNotBlank(hisid)&&StrUtil.isNotBlank(PAADMVisitNumber)){
				Record h_record =Db.findFirst("select id from trt_patient where hisid = ? and PAADMVisitNumber=?", hisid,PAADMVisitNumber);
				if(h_record!=null){
					id = h_record.getStr("id");
				}
			}
 			if (StrUtil.isBlank(id)) {
 				if(fullname.equals("无名氏")){
 					id = this.getNonameSep();
 					fullname += id;
 				}else{
 					id = this.getSep();
 				}
				Db.update(Db.getSql("divid.insertPatient"), id, cardnum, fullname, gender, bornday, address, category,
						tel, memberstel,idcard, null, registertime, GreenChFlag, others, admission, consciousness,
						anamnesis, status,age,source,hisid,signurl,parenttel,reason,allergic_history,go_rct,anonymous,remark,card_type,ThreeNoFlag);
				//新增增加记录
				PatientRecord.insertPatientRecord(IdWorker.nextId(), id, cardnum, hisid, status, dividenurseid);
			} else {
				Db.update(Db.getSql("divid.updatePatient"), cardnum, fullname, gender, bornday, category, tel,
						memberstel,idcard, GreenChFlag, others, admission, consciousness, anamnesis, status, age,source,signurl,parenttel,reason,address,allergic_history,registertime,go_rct,remark,card_type,ThreeNoFlag,id);
				//初次分诊且修改状态增加记录
				if(xgpj.equals("divid")&&status.equals("未接诊")){
					PatientRecord.insertPatientRecord(IdWorker.nextId(), id, cardnum, hisid, status, dividenurseid);
				}
				
			}
 			//保存至患者信息公共表，liuxj20200106
 			PatientCommon.savePatientCommon(id, cardnum, fullname, gender, age, bornday, address, category, tel, idcard, signurl, parenttel, allergic_history, card_type, sg, tz);
 			//更新用户表事件id
 			Db.update(Db.getSql("divid.updatePatientEventid"),events_id,id);
 			//
 			
 			Db.update(Db.getSql("divid.updateEventNum"),old_events,old_events);
			if (StrUtil.isBlank(sighid)||ybcixu>maxcx) {
				sighid = IdWorker.nextId();
				Db.update(Db.getSql("divid.insertPatientSigh"), sighid, id, hx, tw, mb, sg, tz, szy, ssy, spo2, pcn,
						crp, il6, cea, afp, myo, ddimer, fer, ntprobnp, hsctnl, ckmb, ctnt, ca,cixu,anamnesis,consciousness,"0");
			} else {
				Db.update(Db.getSql("divid.updatePatientSigh"), hx, tw, mb, sg, tz, szy, ssy, spo2, pcn, crp, il6, cea,
						afp, myo, ddimer, fer, ntprobnp, hsctnl, ckmb, ctnt, ca, cixu,anamnesis,consciousness,sighid);
			}

			//更新 挂号流水号 2019-09-29
 			Db.update("UPDATE trt_patient set PAADMVisitNumber=? where id=?",PAADMVisitNumber,id);
 			
			//如果是未分诊，分诊时间为空
			//Date d = new Date();
			if(d!=null && d.equals("")){
				d = null;
			}
			/*
			if (StrUtil.equals(status, "未分诊")) {
				d = null;
			}
			*/
			Date da = new Date();
			if(status =="未接诊" || status =="未接诊"){
				da = null;
			}
			if (StrUtil.isBlank(handleid)||ybcixu>maxcx) {
				handleid = IdWorker.nextId();
				Db.update(Db.getSql("divid.insertHandle"), handleid, id, d, null,zhusu, autograde, finalgrade,
						changereason, reasondetail, dividenurse,dividenurseid, dividdepartment, "", hljl,cixu,feijz,savestatus,supplement);
			} else {
				Db.update(Db.getSql("divid.updatetHandle"), d,zhusu, autograde, finalgrade, changereason,
						reasondetail, dividenurse,dividenurseid, dividdepartment, hljl,cixu,feijz,savestatus,supplement,handleid);
			}

			//2019-4-17 于世明 添加自定义快速分级 功能修改 
			if (!StrUtil.isBlank(symtpomid) || !StrUtil.isBlank(symtpomzdyvalue)) {
				Db.update(Db.getSql("divid.deletePatientSymptom"), id,"QG",cixu);
				if(!StrUtil.isBlank(symtpomid)){
					String[] symtpomidArr = symtpomid.split(",");
					for (String sid : symtpomidArr) {
						String psid = IdWorker.nextId();
						//保存类型为 快速分级  QG
						Db.update(Db.getSql("divid.insertPatientSymptom"), psid, id, sid,"QG",cixu,new Date());
					}
				}
				if(!StrUtil.isBlank(symtpomzdyvalue) && !StrUtil.isBlank(symtpomzdygrade)){
					Db.update(Db.getSql("divid.deleteDysymptonBank"), id,"QG","0",cixu);
					String[] symtpomidArr2 = symtpomzdyvalue.split(";");
					String[] symtpomidArr3 = symtpomzdygrade.split(";");
					if(symtpomidArr2.length==symtpomidArr3.length){
						for (int i=0;i<symtpomidArr2.length;i++) {
							String svalue =  symtpomidArr2[i];
							String sgrade =  symtpomidArr3[i];
							String psid = IdWorker.nextId();
							String zdyid = IdWorker.nextId();
							//保存类型为 快速分级  QG
							Db.update("insert into trt_patient_symptom (id,patient_id,symptom_id,symptom_type,m_id,symptom_id_value,cixu,create_time)"
									+ " values(?,?,?,?,'0',?,?,?)", psid, id, "10000000003","QG",zdyid,cixu,new Date());
							//保存自定义快速分级 内容
							Db.update(Db.getSql("divid.insertDysymptonBank"), zdyid, id,dividenurseid,svalue,sgrade,new Date(),"0",cixu,"QG");
						}
					}
				}else{
					Db.update(Db.getSql("divid.deleteDysymptonBank"), id,"QG","0",cixu);
				}
			} else {
				Db.update(Db.getSql("divid.deletePatientSymptom"), id,"QG",cixu);
			}
			
			if (!StrUtil.isBlank(edts_ids)) {
				String[] edts_idArr = edts_ids.split(",");
				Db.update(Db.getSql("divid.deletePatientSymptom"), id,"EDTS",cixu);
				for (String sid : edts_idArr) {
					String psid = IdWorker.nextId();
					//保存类型为 EDTS
					Db.update(Db.getSql("divid.insertPatientSymptom"), psid, id, sid,"EDTS",cixu,new Date());
				}
				//添加手动输入其他选项的信息
				if(!StrUtil.isBlank(edts_ids_qitastatus) && edts_ids_qitastatus.equals("true")){
					String psid = IdWorker.nextId();
					Db.update("insert into trt_patient_symptom (id,patient_id,symptom_id,symptom_type,m_id,symptom_id_value,cixu) values(?,?,?,?,'0',?,?)", psid, id, "e-b-8-4","EDTS",edts_ids_qita,cixu);
				}
 
			} else {
				Db.update(Db.getSql("divid.deletePatientSymptom"), id,"EDTS",cixu);
			}
			if (!StrUtil.isBlank(GCS_xq)) {
				Db.update(Db.getSql("divid.deletePatientSymptom"), id,"GCS",cixu);
				Db.update(Db.getSql("divid.insertPatientSymptom"), IdWorker.nextId(), id, GCS_xq,"GCS",cixu,new Date());
			} else {
				Db.update(Db.getSql("divid.deletePatientSymptom"), id,"GCS",cixu);
			}
			if (!StrUtil.isBlank(mews_ids)) {
				String[] mews_idArr = mews_ids.split(",");
				Db.update(Db.getSql("divid.deletePatientSymptom"), id,"MEWS",cixu);
				for (String sid : mews_idArr) {
					String psid = IdWorker.nextId();
					//保存类型为 EDTS
					Db.update(Db.getSql("divid.insertPatientSymptom"), psid, id, sid,"MEWS",cixu,new Date());
				}
			} else {
				Db.update(Db.getSql("divid.deletePatientSymptom"), id,"MEWS",cixu);
			}
			//意识状态昏迷保存到trt_patient_score
			if(!StrUtil.isBlank(consciousness) && consciousness.equals("昏迷")){
				List<Record> consciousnessList = Db.find(Db.getSql("divid.selectlistScore"),id,"CONSCIOUSNESS",cixu);
				if(consciousnessList.size()>0){
					Db.update(Db.getSql("divid.updateScore"), consciousness, new Date(), cixu,id,"CONSCIOUSNESS",cixu);
				}else{
					Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), id, consciousness,"CONSCIOUSNESS",new Date(),"0",cixu,autograde,dividenurseid);
				}	
			}else {
				Db.update(Db.getSql("divid.deletePatientScore"),id,"CONSCIOUSNESS",cixu);
			}
			
			if (!(StrUtil.isBlank(edts_score)&&StrUtil.isEmpty(edts_score))) {
				List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),id,"EDTS",cixu);
				if(list.size()>0){
					Db.update(Db.getSql("divid.updateScore"), edts_score, new Date(), cixu,id,"EDTS",cixu);
				}else{
					Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), id, edts_score,"EDTS",new Date(),"0",cixu,autograde,dividenurseid);
				}
			}
			if (!(StrUtil.isBlank(mews_score)&&StrUtil.isEmpty(mews_score))) {
				List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),id,"MEWS",cixu);
				if(list.size()>0){
					Db.update(Db.getSql("divid.updateScore2"), mews_score, new Date(),cixu,mewsgrade, id,"MEWS",cixu);
				}else{
					Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), id, mews_score,"MEWS",new Date(),"0",cixu,autograde,dividenurseid);
				}
			}
			
			if (!(StrUtil.isBlank(pain_score)&&StrUtil.isEmpty(pain_score))) {
				List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),id,"PAIN",cixu);
				if(list.size()>0){
					Db.update(Db.getSql("divid.updateScore"), pain_score, new Date(),cixu, id,"PAIN",cixu);
				}else{
					Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), id, pain_score,"PAIN",new Date(),"0",cixu,autograde,dividenurseid);
				}
			}
			
			if (!(StrUtil.isBlank(gcs_score)&&StrUtil.isEmpty(gcs_score))) {
				List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),id,"GCS",cixu);
				if(list.size()>0){
					Db.update(Db.getSql("divid.updateScore"), gcs_score, new Date(),cixu, id,"GCS",cixu);
				}else{
					Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), id, gcs_score,"GCS",new Date(),"0",cixu,autograde,dividenurseid);
				}
			}
			
			if (!(StrUtil.isBlank(sign_grade)&&StrUtil.isEmpty(sign_grade))) {
				List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),id,"SIGN",cixu);
				if(list.size()>0){
					Db.update("update trt_patient_score set grade = ?,time =?,cixu=?where state='0' and p_id=? and type=?  and cixu =?", sign_grade, new Date(),cixu, id,"SIGN",cixu);
				}else{
					Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), id, "","SIGN",new Date(),"0",cixu,sign_grade,dividenurseid);
				}
			}
			if (!(StrUtil.isBlank(fast_score)&&StrUtil.isEmpty(fast_score))) {
				List<Record> list = Db.find(Db.getSql("divid.selectlistScore"),id,"FAST",cixu);
				if(list.size()>0){
					Db.update(Db.getSql("divid.updateScore"), fast_score, new Date(),cixu, id,"FAST",cixu);
				}else{
					Db.update(Db.getSql("divid.insertScore"), IdWorker.nextId(), id, fast_score,"FAST",new Date(),"0",cixu,autograde,dividenurseid);
				}
			}else {
				Db.update(Db.getSql("divid.deletePatientScore"),id,"FAST",cixu);
			}
//			if(StrUtil.equals(status, "已接诊")){
//				Db.update(Db.getSql("divid.receivePatientHandle"),new Date(),id);
//			}
			
			Map<String,String> m= new HashMap<String,String>();
			m.put("handleid",handleid );
			m.put("id",id );
			m.put("sighid",sighid);
			m.put("status",status);
			m.put("fullname",fullname);
			
//			//如果为1级或者2级抢救发送数据,暂时注销liuxj20190117
//			if (StrUtil.equals(savestatus, "save")) {
//				if (StrUtil.equals(finalgrade, "1001")
//						|| StrUtil.equals(finalgrade, "1002")) {
//					Map<String, Object> paramMap = new HashMap<String, Object>();
//					paramMap.put("method", "RF_UnreciveTable");
//					paramMap.put("user", "all");
//					HttpUtil.post(PropKit.get("rescueAddress")
//							+ "/mes/sendMessageToUser", paramMap);
//				} else if (StrUtil.isBlank(finalgrade)) {
//					if (StrUtil.equals(autograde, "1001")
//							|| StrUtil.equals(autograde, "1002")) {
//						Map<String, Object> paramMap = new HashMap<String, Object>();
//						paramMap.put("method", "RF_UnreciveTable");
//						paramMap.put("user", "all");
//						HttpUtil.post(PropKit.get("rescueAddress")
//								+ "/mes/sendMessageToUser", paramMap);
//					}
//				}
//			}
			//分诊分级回传his接口
			Map<String, Object>  paramMap = new HashMap<String, Object>();
			
			paramMap.put("PATPatientID", hisid);
			paramMap.put("PAADMVisitNumber", PAADMVisitNumber);
			String PAADMGrade = autograde;
			if(!finalgrade.equals("")){
				PAADMGrade = finalgrade;
			}
			m.put("grade",PAADMGrade);
			if(PAADMGrade.equals("1001")){
				PAADMGrade="一级";
				if(PropKit.get("project_name").equals("zy")){
					PAADMGrade="1";
				}
			}
			if(PAADMGrade.equals("1002")){
				PAADMGrade="二级";
				if(PropKit.get("project_name").equals("zy")){
					PAADMGrade="2";
				}
			}
			if(PAADMGrade.equals("1003")){
				PAADMGrade="三级";
				if(PropKit.get("project_name").equals("zy")){
					PAADMGrade="3";
				}
			}
			if(PAADMGrade.equals("1004")){
				PAADMGrade="四级";
				if(PropKit.get("project_name").equals("zy")){
					PAADMGrade="4";
				}
			}
			paramMap.put("PAADMGrade", PAADMGrade);
			paramMap.put("DividTime", d);
			//分诊护士代码暂时写死
			//dividenurseid
			Record r = Db.findFirst("SELECT his_user from stt_user where tu_id=?",dividenurseid);
			paramMap.put("TriageNurCode", r.get("his_user", ""));
			paramMap.put("Temperature", tw);
			paramMap.put("Pulse", mb);
			paramMap.put("Heartrate", mb);
			//收缩压
			paramMap.put("Systolic", ssy);
			//舒张压
			paramMap.put("Diastolic", szy);
			paramMap.put("Breathe", hx);
			paramMap.put("SPO2", spo2);
			//绿色通道标识、三无人员标识（是：Y，否：N），暂无
			paramMap.put("GreenChFlag", GreenChFlag);
			paramMap.put("ThreeNoFlag", ThreeNoFlag);
			//以下为遵义加的参数，liuxj20190917
			paramMap.put("ID", handleid);
			paramMap.put("patient_id", id);//患者 ID
			paramMap.put("CARDNUM", cardnum);//就诊卡号
			paramMap.put("fullname", fullname);//姓名
			paramMap.put("gender", gender);//性别
			paramMap.put("cixu", cixu);
			paramMap.put("age", age);
			paramMap.put("bornday", bornday);
			paramMap.put("address", address);
			paramMap.put("tel", tel);
			paramMap.put("parenttel", parenttel);
			paramMap.put("reason", reason);
			paramMap.put("idcard", idcard);
			paramMap.put("memberstel", memberstel);
			paramMap.put("category", category);
			paramMap.put("admission", admission);
			paramMap.put("consciousness", consciousness);
			paramMap.put("anamnesis", anamnesis);
			paramMap.put("status", status);
			paramMap.put("source", source);
			paramMap.put("registertime", d);
			paramMap.put("sg", sg);
			paramMap.put("tz", tz);
			paramMap.put("nurseid", dividenurseid);
			paramMap.put("departmentname", departmentname);
			paramMap.put("allergic_history", allergic_history);
			paramMap.put("pcn", pcn);
			//多线程执行请求his，遵义暂时注销
			MyExecutor  myExecutor = new MyExecutor();
			myExecutor.paramMap1=paramMap;
			myExecutor.fun();
			resultMessage = ResultMessage.build(200, "保存成功", m);
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error("保存失败");
			resultMessage = ResultMessage.build(400, e.getMessage());
		}
	   	renderJson(resultMessage);
	}
	
	public void getSymptom() {
		String level = getPara("level");
		String pid = getPara("pid");
		String keywords = getPara("keywords");
		keywords = keywords.toUpperCase();
		

		List<Record> list = null;
		if((!StrUtil.isBlank(level))&&(!StrUtil.isBlank(pid))) {
			
			list = Db.find(Db.getSql("divid.symptomListSelect")+Db.getSql("divid.listsymptomFromByPidAndLevel")
			, pid,level,"%"+keywords+"%");
			
		}
		if(list.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
		
	}
	
	
	
	/*
	 * getZdy()
	 * 获取 自定义 
	 */
	public void getZdy() {
		String keywords = getPara("keywords");
		String type = getPara("type");
		
		if(keywords.length()<1){
			renderJson(ResultMessage.build(200, "关键字长度太短"));
			return;
		}
		List<Record> list = null;
		if(StrUtil.equals(type, "1")){
			list = Db.find("select id,level1 as name from trt_zdysympton group by level1 having level1 like ?  order by count desc"
					, "%"+keywords+"%");
		}else if(StrUtil.equals(type, "2")){
			String level1 = getPara("level1");
			list = Db.find("select level1 as id,level2 as name from trt_zdysympton group by level2 having level2 like ? and level1 =? order by count desc"
					, "%"+keywords+"%",level1);
		}else if(StrUtil.equals(type, "3")){
			String level1 = getPara("level1");
			String level2 = getPara("level2");
			list = Db.find("select  id,level3 as name from trt_zdysympton  where level3 like ? and level1 =? and level2 =? order by count desc"
					, "%"+keywords+"%",level1,level2);
		}
		
		if(list.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
	}
	
	/*
	 * ZdyCountAdd()
	 * 增加 使用测试
	 */
	public void ZdyCountAdd() {
		String id = getPara("id");
		
	
		int i = Db.update("update trt_zdysympton set count = count+1 where id=?",id);
		
		if(i>0){
			renderJson(ResultMessage.build(200, "获取成功"));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
		
	}
	
	/*
	 * getNextZdyList()
	 * 选中自定义上一级后 获取下一级
	 */
	public void getNextZdyList() {
		
		
		String type = getPara("type");
		
		
		List<Record> list = null;
		if(StrUtil.equals(type, "1")){
			String level1 = getPara("level1");
			list = Db.find("select id,level2 as name,grade,level1 from trt_zdysympton  group by level2 having level1=? order by count desc"
					, level1);
		}else if(StrUtil.equals(type, "2")){
			String level1 = getPara("level1");
			String level2 = getPara("level2");
			list = Db.find("select id,level3 as name,grade,level1,level2 from trt_zdysympton  group by level3 having level1=? and level2=? order by count desc"
					, level1,level2);
		}
		
		if(list.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
		
	}
	
	
	/*
	 * getIcd()
	 * 获取 国际疾病分类（ICD） 11版数据
	 */
	public void getIcd() {
		String keywords = getPara("keywords");
		if(keywords.length()<2){
			renderJson(ResultMessage.build(200, "关键字长度太短"));
			return;
		}
		String colname = "";
		if(checkname(keywords)){
			colname = "name";
		}else{
			colname = "keywords";
			keywords = keywords.toUpperCase();
		}


		List<Record> list = null;
			
			list = Db.find("select id,code,name from stt_icd_11 where type='是' and "+colname+" like ? "
			, "%"+keywords+"%");
			
		if(list.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
		
	}
	
	/*
	 * getIcd()
	 * 判断字符串是否都是汉字
	 */
	public boolean checkname(String name)
    {
        int n = 0;
        for(int i = 0; i < name.length(); i++) {
            n = (int)name.charAt(i);
            if(!(19968 <= n && n <40869)) {
                return false;
            }
        }
        return true;
    }
	
	public void queryPatientHandleId() {
		String p_id = getPara("id");
		String cixu = getPara("cixu");
		Record l = null;
		if(StrUtil.isBlank(cixu)){
			 l = Db.findFirst(
					Db.getSql("divid.handleListSelect")+Db.getSql("divid.addhandleListdepart")
					+Db.getSql("divid.addGrade_name")
					+Db.getSql("divid.listhandelFromByPid"),p_id);
		}else{
			 l = Db.findFirst(
					Db.getSql("divid.handleListSelect")+Db.getSql("divid.addhandleListdepart")
					+Db.getSql("divid.addGrade_name")
					+Db.getSql("divid.listhandelFromByPidAndCixu"),p_id,cixu);
		}
		
		if(l!=null){
			renderJson(ResultMessage.build(200, "获取成功",l));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
	}
	
	//查询所有评级记录
	public void queryPatientHandleScore() {
		String p_id = getPara("pid");
		List<Record> list = Db.find(Db.getSql("divid.queryPatientHandleScore"),p_id);
			
		if(list!=null){
			renderJson(ResultMessage.build(200, "获取成功",list.size(),list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
	}
	
	//获取快速分级的 已选依据
	@SuppressWarnings("rawtypes")
	public void queryPatientSymtpom() {
		
		String p_id = getPara("id");
		String cixu = getPara("cixu");
		List<Record>  l = null;
		if(StrUtil.isBlank(cixu)){
			l = Db.find(
					Db.getSql("divid.selectPatientSymptomByPID")+Db.getSql("divid.selectSymptomByType"),p_id,"QG",p_id);
		}else{
			l = Db.find(
					Db.getSql("divid.selectPatientSymptomList")+Db.getSql("divid.selectSymptomByTypeAndCixu"),p_id,"QG",cixu);
		}
		
		List<Map> symtpoms = new ArrayList<Map>();
		for(int i=0;i<l.size();i++) {
			Record r = l.get(i);
			String symptom_id =  r.getStr("symptom_id");
			Map<String, String> m = new HashMap<String, String>();
			//2019-4-17 于世明 自定义快速分级 内容和级别
			if("10000000003".equals(symptom_id)){
				String zdyid = r.getStr("symptom_id_value");
				Record zdyre = Db.findFirst(Db.getSql("divid.selectDysymptonBankById"),zdyid);
				m.put("id", "10000000003");
				m.put("parentid", "");
				m.put("name", zdyre.getStr("content"));
				m.put("grade", zdyre.getStr("grade"));
				symtpoms.add(m);
			}else{
				Record level3 = Db.findFirst(
						Db.getSql("divid.symptomListSelect")+Db.getSql("divid.listsymptomFromById"),symptom_id);
				String level2_id = level3.getStr("pid");
				String  level3_name = level3.getStr("name");
				Record level2 = Db.findFirst(
						Db.getSql("divid.symptomListSelect")+Db.getSql("divid.listsymptomFromById"),level2_id);
				String level1_id = level2.getStr("pid");
				String  level2_name = level2.getStr("name");
				Record level1 = Db.findFirst(
						Db.getSql("divid.symptomListSelect")+Db.getSql("divid.listsymptomFromById"),level1_id);
				String  level1_name = level1.getStr("name");
				
				String name = level1_name + " | "+ level2_name + " | " +level3_name ;
				String grade = level3.getStr("grade");
				String parentid = level3.getStr("pid");
				m.put("id", symptom_id);
				m.put("parentid", parentid);
				m.put("name", name);
				m.put("grade", grade);
				symtpoms.add(m);
			}
		}
		if(l.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",symtpoms));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}  	
	}
	
	
	//获取患者评级详情
	public void queryPatientSymtpomByType() {
		String p_id = getPara("id");
		String cixu = getPara("cixu");
		List<Record> list = null;
		if(StrUtil.isBlank(cixu)){
			 list = Db.find(
						Db.getSql("divid.selectPatientSymptom"),p_id,p_id);
		}else{
			list = Db.find(
					Db.getSql("divid.selectPatientSymptomByCixu"),p_id,cixu);
		}
		
		
		if(list.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
	}
	
	//获取患者评级详情
		public void queryPatientScore() {
			String p_id = getPara("id");
			String cixu = getPara("cixu");
			List<Record> list = null;
			if(StrUtil.isNotBlank(cixu)){
			   list = Db.find("select id,p_id,score,type,time,state,grade "
					+ "from trt_patient_score where state='0' and p_id =?  and cixu=? ",p_id,cixu);
			}else{
				list = Db.find("select t1.id,t1.p_id,t1.score,t1.type,t1.time,t1.state,grade "
						+ "from trt_patient_score t1 where t1.state='0' and t1.p_id =? and "
						+ "t1.cixu = (SELECT max(t2.cixu+0) from trt_patient_score t2 where t2.p_id=t1.p_id and t2.state='0') ",p_id);
			}
			if(list.size()>0){
				renderJson(ResultMessage.build(200, "获取成功",list));
			}else{
				renderJson(ResultMessage.build(400, "获取失败"));
			}
	}
	
	//获取评级方式按钮
	public void queryPjfs() {
		String system = getPara("system");
		List<Record> list = Db.find(
				Db.getSql("divid.listPjfs"),system);
		
		if(list.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
	}
	
	//获取评级等级设置
	public void queryGradeset() {
		
		List<Record> list = Db.find(
				Db.getSql("divid.listGradeSet"));
		
		if(list.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
	}
    
    //评级表评分通过评级id获取评级name
    public void getGradeNameByGradeId() {		
		String gradeid = getPara("gradeid");
		Record re = Db.findFirst("select stt_yjfjset.grade_name as gradename,stt_yjfjset.grade_color as gradecolor from stt_yjfjset where stt_yjfjset.ys_id = ?",gradeid);
		if(re!=null){
			renderJson(ResultMessage.build(200, "获取成功",re));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
		return;
	}
    
    // 生成流水号
    public static String getSep() {
		// TODO Auto-generated method stub
    	String result = "" ;
    	Record r = null;
    	try{
    		r = Db.findFirst("select * from trt_patient_seq where id=1");
    		String s = r.getStr("seq");
    		int seq = Integer.parseInt(s);
    		String date = r.getStr("date");
    		String now = DateUtil.today();
    		if(StrUtil.equals(now, date)){
    			seq = seq + 1;
    			Db.update("update trt_patient_seq set seq = ? where id=1",seq);
    			result = DateUtil.format(new Date(), "yyMMdd");
    			result +=  StrUtil.fillBefore(Integer.toString(seq), '0', 4);
    		}else{
    			Db.update("update trt_patient_seq set seq = ?,date=? where id=1",1,now);
    			result = DateUtil.format(new Date(), "yyMMdd");
    			result +=  StrUtil.fillBefore(Integer.toString(1), '0', 4);
    		}
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	return result;
	}
    
    public static void main(String[] args) {
    }
    
    /**
	 * querySignTemp(获取监护仪信息) void
	 * 
	 * @exception
	 * @since 1.0.0
	 */
	public void querySignTemp() {
		Record r = Db.findFirst(" select * from  trt_sign_temp where id = '1' ");
		renderJson(ResultMessage.build(200, "查询成功",r));
	}
	
	
	/**
	 * 
	 * queryMachStatus(获取监护仪连接情况) void
	 * 
	 * @exception
	 * @since 1.0.0
	 */
	public void queryMachStatus() {
		Record r = Db.findFirst(" select * from  stt_mach_status where id = '1' ");
		
		String status = r.getStr("status");
		if(StrUtil.equalsIgnoreCase("未连接", status)){
			renderJson(ResultMessage.build(200, "查询成功","未连接"));
		}else{
			Date last = r.getDate("lasttime");
			long a = new Date().getTime();
			long b = last.getTime();
			int c = (int)((a - b) / 1000);
			//距离上次通讯超过60s
			if(c>60){
				Db.update("update stt_mach_status set status=? where id='1'","未连接");
				renderJson(ResultMessage.build(200, "查询成功","未连接"));
			}else{
				renderJson(ResultMessage.build(200, "查询成功","已连接"));
			}
		}
	}
	
	public void upload() {
		Map<String,String> map = new HashMap<String,String>();
		String dir = getRequest().getServletContext().getRealPath("/");
		String imageDataurl = getPara("imageDataurl");
		BASE64Decoder decoder = new BASE64Decoder();
		String path ="/static/bj/upload/"+System.currentTimeMillis()+".png";
		try {
			byte[] b = decoder.decodeBuffer(imageDataurl);// 转码得到图片数据

			ByteArrayInputStream bais = new ByteArrayInputStream(b);
			BufferedImage bi1 = ImageIO.read(bais);
			File w2 = new File(dir+path);
			ImageIO.write(bi1, "png", w2);
		} catch (IOException e) {
			e.printStackTrace();
		}
		map.put("path", path);
		renderJson(ResultMessage.build(200, "查询成功", map));
	}
	public void sign() {
		render("signname.html");
	}
	/**
	 * 修改入抢救室状态
	 */
	public void updateGoRct(){
    	String id = getPara("id");
		if((!StrUtil.isBlank(id))) {
			try{
				Db.update(Db.getSql("divid.updatePatienGoRct"),id);
				renderJson(ResultMessage.build(200, "查询成功"));
			}catch(Exception e){
				renderJson(new ResultMessage(400, e.getMessage()));
			}
		}else{
			renderJson(new ResultMessage(400, "请传入参数"));
		}
	}
	/**
	 * querySignTemp(获取监护仪信息) void
	 * 
	 * @exception
	 * @since 1.0.0
	 */
	public void queryStatus() {
		String pid = getPara("pid");
		
		Record r = Db.findFirst("SELECT status from trt_patient p where p.id=? ",pid);
		renderJson(ResultMessage.build(200, "查询成功",r));
	}
	/**
	 * HIS流水号
	 */
	public void queryHisSerialnum() {
		String pid = getPara("pid");
		Record r = Db.findFirst("SELECT IFNULL(h.PAADMVisitNumber,'') PAADMVisitNumber from trt_patient p,his_outpatientencounter h where p.hisid=h.PATPatientID and p.id=? order by PAADMOPTime desc ",pid);
		renderJson(ResultMessage.build(200, "查询成功",r));
	}
	
	//通过卡号cardnum查询患者信息(本地his)
	public void queryHisPatientByCardNum() {
		String cardnum = getPara("cardnum");
		Record l = Db.findFirst(Db.getSql("divid.queryHisPatientByCardNum"),cardnum);
		if(l==null){
			renderJson(ResultMessage.build(400, "查询失败"));
		}else{
	   	    renderJson(ResultMessage.build(200, "查询成功",l));
		}
	}
	
	//查询必填项以及分组
	public void queryRequiredCols(){
		String all = getPara("all");
			List<Record> collist= new ArrayList<Record>();
		if(StrUtil.isBlank(all)){
			collist= Db.find("SELECT * from stt_pat_col c where necessary=1 or (`group` <>'' and `group` is not null and necessary=1 )");
		}else {
			collist =Db.find("SELECT * from stt_pat_col order by necessary desc");
		}
		Map<String,Object> map = new HashMap<String, Object>();
		
		if(collist!=null){
			map.put("collist",collist);
		}else{
			map.put("collist", "");
		}
		
//		List<Record> grouplist= Db.find("SELECT * from stt_pat_col where `group` <>'' and `group` is not null order BY `group` ");
//		Map<String,Object> lists = new HashMap<String, Object>();
//		if(grouplist!=null){
////			for(int j=0;j<grouplist.size();j++){
////				List<Record> clist = Db.find("select * from stt_pat_col where `group`=? order by id",grouplist.get(j).getStr("group"));
////				lists.put("group"+j, clist);
////			}
//			map.put("grouplist", grouplist);
//		}else{
//			map.put("grouplist", "");
//		}
		renderJson(map);
	}

	// 生成无名氏流水号
    public static String getNonameSep() {
		// TODO Auto-generated method stub
    	String result = "" ;
    	Record r = null;
    	try{
    		r = Db.findFirst("select * from trt_patient_seq where id=2");
    		String s = r.getStr("seq");
    		int seq = Integer.parseInt(s);
    		String date = r.getStr("date");
    		String now = DateUtil.today();
    		if(StrUtil.equals(now, date)){
    			seq = seq + 1;
    			Db.update("update trt_patient_seq set seq = ? where id=2",seq);
    			result = DateUtil.format(new Date(), "yyyyMMdd");
    			if(seq<10){
    				result += "0"+ seq;
    			}else{
    				result +=  seq;
    			}
    		}else{
    			Db.update("update trt_patient_seq set seq = ?,date=? where id=2",1,now);
    			result = DateUtil.format(new Date(), "yyyyMMdd");
    			result +=  "01";
    		}
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	return result;
	}
    
    //生成无名氏 编码到 前台
    public void createNoName(){
    	renderJson(TriageDividController.getNonameSep());
    }
    
    
  //根据卡号查已推送过来的患者最新id
  	public void findHisGH() {
  		String cardnum = getPara("cardnum");
  		Record l = Db.findFirst(Db.getSql("divid.findHisGH"),cardnum);
  		if(l==null){
  			renderJson(ResultMessage.build(400, "查询失败"));
  		}else{
  	   	    renderJson(ResultMessage.build(200, "查询成功",l));
  		}
  	}
  	
  	//注册 卡号 接口
  	public void addHisCard(){
  		
  		String PATCardNo = getPara("PATCardNo");
  		String PATPatientName = getPara("PATPatientName");
  		String PATBirthDay = getPara("PATBirthDay");
  		String PATIDCardType = getPara("PATIDCardType");
  		String PATIDCardNo = getPara("PATIDCardNo");
  		String PATSexCode = getPara("PATSexCode");
  		String PATTelPhone = getPara("PATTelPhone");
  		String PATSocialStatus = getPara("PATSocialStatus");
  		
  		String ContactName = getPara("ContactName");
  		String ContactTelNo = getPara("ContactTelNo");
  		String ContactIDType = getPara("ContactIDType");
  		String ContactIDNo = getPara("ContactIDNo");
  		String PATInsuCardNo = getPara("PATInsuCardNo");
  		
  		
  		String nurseid = getPara("nurseid");
  		/*
  		if(PATIDCardNo.length()>0){
  			Map<String, Object> paramMap = new HashMap<String, Object>();
  			paramMap.put("Cardnum", PATCardNo);
  			paramMap.put("Idcard", PATIDCardNo);
  			String json =  HttpUtil.post(PropKit.get("EcsServerAddress")
  				+ "/ecs/getPatInfoByCardnum", paramMap);
  			System.out.println(PropKit.get("EcsServerAddress")+ "/ecs/getPatInfoByCardnum:"+json);
  			cn.hutool.json.JSONObject  js = JSONUtil.parseObj(json);
  			if((Integer)js.get("status")==400){
  				renderJson(ResultMessage.build(444, "此用户已注册过用户卡"));
  				return;
  			}
  		}
  		*/
  		Map<String, Object> Map = new HashMap<String, Object>();
  		Record r = Db.findFirst("SELECT his_user from stt_user where tu_id=?",nurseid);
  		Map.put("UpdateUserCode", r.get("his_user", ""));
  		Map.put("PATCardNo", PATCardNo);
  		Map.put("PATPatientName", PATPatientName);
  		Map.put("PATBirthDay", PATBirthDay);
  		Map.put("PATIDCardType", PATIDCardType);
  		Map.put("PATIDCardNo", PATIDCardNo);
  		Map.put("PATSexCode", PATSexCode);
  		Map.put("PATTelPhone", PATTelPhone);
  		Map.put("PATSocialStatus", PATSocialStatus);
  		
  		
  		Map.put("ContactName", ContactName);
  		Map.put("ContactTelNo", ContactTelNo);
  		Map.put("ContactIDType", ContactIDType);
  		Map.put("ContactIDNo", ContactIDNo);
  		Map.put("PATInsuCardNo", PATInsuCardNo);
  		
  		
  		Map.put("CreatTime", DateUtil.now());
  		String json2 =  HttpUtil.post(PropKit.get("EcsServerAddress")
  				+ "/ecs/CreateCard", Map);
  		System.out.println(PropKit.get("EcsServerAddress")+ "/ecs/CreateCard:"+json2);
  		renderJson(json2);
  	}
  	
  	
  	//患者挂号接口
  	public void registerPat(){
  		
  		
  		String PATPatientID = getPara("PATPatientID");
  		String PAADMEncounterTypeCode = getPara("PAADMEncounterTypeCode");
  		String PAADMOPTypeCode = getPara("PAADMOPTypeCode");
  		String nurseid = getPara("nurseid");
  		
  		
  		Map<String, Object> Map = new HashMap<String, Object>();
  		Record r = Db.findFirst("SELECT his_user from stt_user where tu_id=?",nurseid);
  		Map.put("UpdateUserCode", r.get("his_user", ""));
  		Map.put("PATPatientID", PATPatientID);
  		Map.put("PAADMEncounterTypeCode", PAADMEncounterTypeCode);
  		Map.put("PAADMOPTypeCode", PAADMOPTypeCode);

  		String json2 =  HttpUtil.post(PropKit.get("EcsServerAddress")
  				+ "/ecs/sendOutPatInfo", Map);
  		System.out.println(PropKit.get("EcsServerAddress")+ "/ecs/sendOutPatInfo:"+json2);
  		renderJson(json2);
  	}
  	
  	public void queryPatientGradeDetail() {
		String handleid = getPara("handleid");
		Record l = null;
		try {
			l = Db.findFirst(
					Db.getSql("divid.handleListSelect")
							+ Db.getSql("divid.addGrade_name")
							+ " from trt_patient_handle where id=?",
							handleid);
			if (l == null) {
				renderJson(ResultMessage.build(400, "获取失败"));
			}
			String cixu = l.getStr("cixu");
			String p_id = l.getStr("p_id");
			Map<String,Object> map = new HashMap<String,Object>();
			map = l.getColumns();
			//快速分级
			List<Map<String,String>> symtpoms = this.queryPatientSymtpom(p_id, cixu);
			map.put("qg", symtpoms);
			//其他分数
			String edts_score = "";
			String mews_score = "";
			String gcs_score = "";
			String pain_score = "";
			String gbs_score = "";
			String sign_score ="";
			//其他等级
			String edts_grade = "";
			String mews_grade = "";
			String pain_grade = "";
			String gcs_grade = "";
			String gbs_grade ="";
			String sign_grade = "";
			
			String  edts_color = "";
			String  mews_color = "";
			String  gcs_color = "";
			String  pain_color = "";
			String  gbs_color ="";
			
			String  sign_color = "";
			
			List<Record> score_list = this.queryPatientScore(p_id, cixu);
			for (int j = 0; j < score_list.size(); j++) {
				Record score_r = score_list.get(j);
				String type = score_r.getStr("type");
				if(StrUtil.equalsIgnoreCase("EDTS", type)){
					edts_score = score_r.getStr("score");
					edts_grade = score_r.getStr("grade");
					edts_color = score_r.getStr("grade_color");
				}else if(StrUtil.equalsIgnoreCase("MEWS", type)){
					mews_score = score_r.getStr("score");
					mews_grade = score_r.getStr("grade");
					mews_color = score_r.getStr("grade_color");
				}else if(StrUtil.equalsIgnoreCase("GCS", type)){
					gcs_score = score_r.getStr("score");
					gcs_grade = score_r.getStr("grade");
					gcs_color = score_r.getStr("grade_color");
				}else if(StrUtil.equalsIgnoreCase("PAIN", type)){
					pain_score = score_r.getStr("score");
					pain_grade = score_r.getStr("grade");
					pain_color = score_r.getStr("grade_color");
				}else if(StrUtil.equalsIgnoreCase("GBS", type)){
					gbs_score = score_r.getStr("score");
					gbs_grade = score_r.getStr("grade");
					gbs_color = score_r.getStr("grade_color");
				}else if(StrUtil.equalsIgnoreCase("SIGN", type)){
					sign_score = score_r.getStr("score");
					sign_grade = score_r.getStr("grade");
					sign_color = score_r.getStr("grade_color");
				}
			}
			map.put("edts", edts_score);
			map.put("mews", mews_score);
			map.put("pain", gcs_score);
			map.put("gcs", pain_score);
			map.put("gbs", gbs_score);
			map.put("sign", sign_score);
			
			map.put("edts_grade", edts_grade);
			map.put("mews_grade", mews_grade);
			map.put("pain_grade", pain_grade);
			map.put("gcs_grade", gcs_grade);
			map.put("gbs_grade", gbs_grade);
			map.put("sign_grade", sign_grade);
			
			map.put("edts_color", edts_color);
			map.put("mews_color", mews_color);
			map.put("pain_color", pain_color);
			map.put("gcs_color", gcs_color);
			map.put("gbs_color", gbs_color);
			map.put("sign_color", sign_color);
			
			List<Record> symptomIds = this.queryPatientSymtpomByType(p_id, cixu);
			String edts_ids = "";
			String mews_ids = "";
			
			String edts_ids_qitastatus = "false";
			String edts_ids_qita = "";
			for (int i = 0; i < symptomIds.size(); i++) {
				Record symptom = symptomIds.get(i);
				String type = symptom.getStr("symptom_type");
				if(StrUtil.equalsIgnoreCase("EDTS", type)){
					if(StrUtil.equalsIgnoreCase("e-b-8-4", symptom.getStr("symptom_id"))){
						edts_ids_qitastatus = "true";
						edts_ids_qita = symptom.getStr("symptom_id_value");
						continue;
					}
					edts_ids += symptom.getStr("symptom_id");
					edts_ids += ",";
				}else if(StrUtil.equalsIgnoreCase("MEWS", type)){
					mews_ids += symptom.getStr("symptom_id");
					mews_ids += ",";
				}
			}
			if(edts_ids.length()>0){
				edts_ids = edts_ids.substring(0, edts_ids.length()-1);
			}
			if(mews_ids.length()>0){
				mews_ids = mews_ids.substring(0, mews_ids.length()-1);
			}
			map.put("edts_ids", edts_ids);
			map.put("mews_ids", mews_ids);
			map.put("edts_ids_qitastatus", edts_ids_qitastatus);
			map.put("edts_ids_qita", edts_ids_qita);
			
			//获取体征
			// 参与评级 的各项 体征参数
			String hx = "";
			String tw = "";
			String mb = "";
			String szy = "";
			String ssy = "";
			String spo2 = "";
			String pcn = "";
			Record sign_r = this.queryPatientSignByPidAndCixuT(p_id, cixu);
			
			if(sign_r!=null){
				hx = sign_r.getStr("hx");
				tw = sign_r.getStr("tw");
				mb = sign_r.getStr("mb");
				szy = sign_r.getStr("szy");
				ssy = sign_r.getStr("ssy");
				spo2 = sign_r.getStr("spo2");
				pcn = sign_r.getStr("pcn");
			}
			map.put("hx", hx);
			map.put("tw", tw);
			map.put("mb", mb);
			map.put("szy", szy);
			map.put("ssy", ssy);
			map.put("spo2", spo2);
			map.put("pcn", pcn);
			//获取GBS评分
			String blood_urea_nitrogen= "";
			String systolic_pressure= "";
			String hemoglobin= "";
			String other= "";
			Record gbsScore = Db.findFirst(Db.getSql("divid.selectGbsScore"),p_id,cixu);
			
			if(gbsScore!=null){
				blood_urea_nitrogen = gbsScore.getStr("blood_urea_nitrogen");
				systolic_pressure = gbsScore.getStr("systolic_pressure");
				hemoglobin = gbsScore.getStr("hemoglobin");
				other = gbsScore.getStr("other");
			}
			map.put("blood_urea_nitrogen", blood_urea_nitrogen);
			map.put("systolic_pressure", systolic_pressure);
			map.put("hemoglobin", hemoglobin);
			map.put("others", other);
			renderJson(ResultMessage.build(200, "查询成功", map));
		} catch (Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, "查询失败"));
		}
	}
  	
  //获取快速分级的 已选依据
  	public List<Map<String,String>> queryPatientSymtpom(String p_id,String cixu) {
  		List<Record>  l = null;
  		if(StrUtil.isBlank(cixu)){
  			l = Db.find(
  					Db.getSql("divid.selectPatientSymptomList")+Db.getSql("divid.selectSymptomByType"),p_id,"QG",p_id);
  		}else{
  			l = Db.find(
  					Db.getSql("divid.selectPatientSymptomList")+Db.getSql("divid.selectSymptomByTypeAndCixu"),p_id,"QG",cixu);
  		}
  		
  		List<Map<String,String>> symtpoms = new ArrayList<Map<String,String>>();
  		for(int i=0;i<l.size();i++) {
  			Record r = l.get(i);
  			String symptom_id =  r.getStr("symptom_id");
  			Map<String, String> m = new HashMap<String, String>();
  			//2019-4-17 于世明 自定义快速分级 内容和级别
  			if("10000000003".equals(symptom_id)){
  				String zdyid = r.getStr("symptom_id_value");
  				Record zdyre = Db.findFirst(Db.getSql("divid.selectDysymptonBankById"),zdyid);
  				m.put("id", "10000000003");
  				m.put("parentid", "");
  				m.put("name", zdyre.getStr("content"));
  				m.put("grade", zdyre.getStr("grade"));
  				m.put("grade-color", zdyre.getStr("grade_color"));
  			}else{
  				Record level3 = Db.findFirst(
  						Db.getSql("divid.symptomListSelect")+Db.getSql("divid.listsymptomFromById"),symptom_id);
  				String  grade_color = level3.getStr("grade_color");
  				String level2_id = level3.getStr("pid");
  				String  level3_name = level3.getStr("name");
  				Record level2 = Db.findFirst(
  						Db.getSql("divid.symptomListSelect")+Db.getSql("divid.listsymptomFromById"),level2_id);
  				String level1_id = level2.getStr("pid");
  				String  level2_name = level2.getStr("name");
  				Record level1 = Db.findFirst(
  						Db.getSql("divid.symptomListSelect")+Db.getSql("divid.listsymptomFromById"),level1_id);
  				String  level1_name = level1.getStr("name");
  				
  				String name = level1_name + " | "+ level2_name + " | " +level3_name ;
  				String grade = level3.getStr("grade");
  				String parentid = level3.getStr("pid");
  				m.put("id", symptom_id);
  				m.put("parentid", parentid);
  				m.put("name", name);
  				m.put("grade", grade);
  				m.put("grade-color", grade_color);
  			}
  			symtpoms.add(m);
  		}
  		return  symtpoms;	
  	}
 // 获取患者评级详情 方法
 	public List<Record> queryPatientScore(String p_id, String cixu) {
 		List<Record> list = Db
 				.find("select id,p_id,score,type,time,state,grade,(select grade_color from  stt_yjfjset where ys_id=grade) as grade_color "
 						+ "from trt_patient_score where  p_id =? and cixu=? and m_id = '0'",
 						p_id, cixu);
 		return list;
 	}
 	//获取患者评级详情方法
 		public List<Record> queryPatientSymtpomByType(String p_id,String cixu) {
 			List<Record> list = new ArrayList<Record>();
 		
 			list = Db.find(
 					Db.getSql("divid.selectPatientSymptomByCixu"),p_id,cixu);
 			
 			return list;
 		}
 		public Record queryPatientSignByPidAndCixuT(String p_id,String cixu) {
 			Record l = null;
 			l = Db.findFirst(Db.getSql("divid.signListSelect")+
 									Db.getSql("divid.listFromByPidAndCixuT"),p_id,cixu);
 			return l;
 		}
 	
 		
 		//保存自定义
 		public void saveZDY() {
 			String one = getPara("one");
 	  		String two = getPara("two");
 	  		String three = getPara("three");
 	  		String grade = getPara("grade");
 	  		
 	  		Record r = Db.findFirst("select count(1) as num from trt_zdysympton where level1=? and level2=? and level3=?",one,two,three);
 	  		if(r.getInt("num")>0){
 	  			int i = Db.update("update trt_zdysympton set count = count+1 where level1=? and level2=? and level3=?",one,two,three);
 	  			
 	  			if(i>0){
 	 	  			renderJson(ResultMessage.build(200, "保存成功"));
 	 	  		}else{
 	 	  			renderJson(ResultMessage.build(400, "保存失败"));
 	 	  		}
 	  		}else{
 	  			int i = Db.update(Db.getSql("divid.insertzdysympton"),IdWorker.nextId(),one,two,three,grade,"0","QG",1);
 	 	  		if(i>0){
 	 	  			renderJson(ResultMessage.build(200, "保存成功"));
 	 	  		}else{
 	 	  			renderJson(ResultMessage.build(400, "保存失败"));
 	 	  		}
 	  		}
 	  		
 	  		
 			
 		}
}