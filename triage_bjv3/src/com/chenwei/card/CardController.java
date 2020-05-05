package com.chenwei.card;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
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

public class CardController extends Controller {

	private static Logger log = Logger.getLogger(CardController.class);

	public void add() {
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/card/index", "新增就诊卡", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
		
		Record re =  Db.findFirst("select stt_hospital.hp_id as hpid,stt_hospital.hp_name as hpname,stt_hospital.hp_code as hpcode,"
				+ "stt_hospital.hp_province as hpprovince,stt_hospital.hp_city as hpcity,stt_hospital.hp_address as hpaddress,"
				+ "stt_hospital.hp_logourl as hplogourl from stt_hospital");
		setSessionAttr("hpname", re.get("hpname"));
		setSessionAttr("hplogourl",re.get("hplogourl"));
		setAttr("befrom",getPara("befrom"));
		setAttr("id",getPara("id"));
		//卡号规则
		setAttr("reg",queryCardnumReg().toJson());
		render("addcard.html");
	}
	
	public void list() {
		
		//页面停留时间-- begin --
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Cache bbsCache = Redis.use();
		String inf = (String)bbsCache.get(userName);
		String userid = inf.split("\\|")[3];
		String roleid = inf.split("\\|")[5];
		String waitid = (String)session.getAttribute("waittimeid");
		String waittimeid = WaitTime.insertWaitTime(waitid, "triage/card/list", "就诊卡列表", userid, roleid);
		session.setAttribute("waittimeid", waittimeid);
		//页面停留时间-- end --
		
		Record re =  Db.findFirst("select stt_hospital.hp_id as hpid,stt_hospital.hp_name as hpname,stt_hospital.hp_code as hpcode,"
				+ "stt_hospital.hp_province as hpprovince,stt_hospital.hp_city as hpcity,stt_hospital.hp_address as hpaddress,"
				+ "stt_hospital.hp_logourl as hplogourl from stt_hospital");
		setSessionAttr("hpname", re.get("hpname"));
		setSessionAttr("hplogourl",re.get("hplogourl"));
		setAttr("befrom",getPara("befrom"));
		render("cardlist.html");
	}
	
	
//建卡列表信息	
	public void queryCardInfolist(){
		try {
			String cardnum = getPara("cardnum");
			String fullname = getPara("fullname");
			String begin = getPara("from");
			String end = getPara("to");
			
			if(StrUtil.isBlank(cardnum))
			{
				cardnum = "%%" ;
			}else{
				cardnum = "%"+cardnum+"%" ;
			}
			if(StrUtil.isBlank(fullname))
			{
				fullname = "%%" ;
			}else{
				fullname = "%"+fullname+"%" ;
			}
			

			int page = getParaToInt("page");
			int rows = getParaToInt("rows");
			Page<Record> l = null;
			
			if(StrUtil.isBlank(begin)&&StrUtil.isBlank(end))
			{
				l = Db.paginate(page, 
		   				rows, Db.getSql("card.list"),Db.getSql("card.fromlist")+Db.getSql("card.orderBy"),cardnum,fullname);
			}else if(!StrUtil.isBlank(begin)&&StrUtil.isBlank(end)){
				l = Db.paginate(page, 
			   				rows, Db.getSql("card.list"),Db.getSql("card.fromlist")+Db.getSql("card.listBegin")+Db.getSql("card.orderBy"),cardnum,fullname,begin+" 00:00:00");
			}else if(StrUtil.isBlank(begin)&&!StrUtil.isBlank(end)){
				l = Db.paginate(page, 
			   				rows, Db.getSql("card.list"),Db.getSql("card.fromlist")+Db.getSql("card.listEnd")+Db.getSql("card.orderBy"),cardnum,fullname,end+" 23:59:59");
			}else{
				l = Db.paginate(page, 
			   				rows, Db.getSql("card.list"),Db.getSql("card.fromlist")+Db.getSql("card.listBegin")+Db.getSql("card.listEnd")+Db.getSql("card.orderBy"),cardnum,fullname,begin+" 00:00:00",end+" 23:59:59");
			}
			if(l!=null){
				renderJson(ResultMessage.build(200, "查询成功",l.getTotalRow(),l.getList()));
			}else{
				renderJson(ResultMessage.build(400, "查询失败"));
			}
		}catch(Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	}
		
/*
 * 保存就诊卡信息
 */
	public void saveCardinfo() {
		ResultMessage resultMessage = new ResultMessage();
		String id = getPara("id");
		String cardnum = getPara("cardnum");//就诊卡号
		String idcard = getPara("idcard");// 身份证
		String fullname = getPara("fullname");
		String gender = getPara("gender");
		String bronday = getPara("bronday");
		String nation = getPara("nation");//民族
		String country = getPara("country");//国家
		String tel = getPara("tel");//电话
		String ralationname = getPara("ralationname");//紧急联系人姓名
		String ralationtel = getPara("ralationtel");//紧急联系人电话
		String aprovince = getPara("aprovince");//地址-省（自治区、直辖市）
		String acity = getPara("acity");//地址-市（地区）
		String acountry = getPara("acountry");//地址-县（区）
		String acountryside = getPara("acountryside");//地址-乡（镇、街道办事处）
		String avillage = getPara("avillage");//地址-村（街、路、弄等）
		String adderssdesc = getPara("adderssdesc");//详细地址描述
		String occupation = getPara("occupation");//职业
		String workplace = getPara("workplace");//工作单位地址
		String remark = getPara("remark");//备注
		String updatetime = DateUtil.now().substring(0, 16);//修改时间
		String updateuserid = getPara("updateuserid");//修改人id
		String updateusername = getPara("updateusername");//修改人姓名
		
		try {
			if(StrUtil.isEmpty(id)){
				id = IdWorker.nextId();
				Db.update(Db.getSql("card.insertCard"), id,
					cardnum,
					fullname,
					gender,
					bronday,
					idcard,
					nation,
					country,
					tel,
					ralationname,
					ralationtel,
					aprovince,
					acity,
					acountry,
					acountryside,
					avillage,
					adderssdesc,
					occupation,
					workplace,
					remark,
					updatetime,
					updateuserid,
					updateusername);
				resultMessage = ResultMessage.build(200, "添加就诊卡成功",id);
			}else{
				Db.update(Db.getSql("card.updateCard"), 
						cardnum,
						fullname,
						gender,
						bronday,
						idcard,
						nation,
						country,
						tel,
						ralationname,
						ralationtel,
						aprovince,
						acity,
						acountry,
						acountryside,
						avillage,
						adderssdesc,
						occupation,
						workplace,
						remark,
						updatetime,
						updateuserid,
						updateusername,id);
					resultMessage = ResultMessage.build(200, "修改就诊卡成功",id);
			}
		} catch (Exception e) {
			log.error("添加患者失败", e);
			resultMessage = ResultMessage.build(400, e.getMessage());
		}

		renderJson(resultMessage);
	}
	
	//建卡列表信息	
	public void checkCardnum() {
		try {
			String cardnum = getPara("cardnum");// 就诊卡号
			List<Record> list = Db.find(
					"select * from trt_patient_card where cardnum=? ", cardnum);
			renderJson(ResultMessage.build(200, "查询成功", list.size()));
		} catch (Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	}
		
	//建卡列表信息	
	public void queryCardInfoById() {
		try {
			String id = getPara("id");// 就诊卡号
			Record l = Db.findById("trt_patient_card", id);
			renderJson(ResultMessage.build(200, "查询成功", l));
		} catch (Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	}
	
	//卡号规则
	public Record  queryCardnumReg() {
		try {
			Record l = Db.findById("stt_cardnum_reg", "1");
			return l;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}