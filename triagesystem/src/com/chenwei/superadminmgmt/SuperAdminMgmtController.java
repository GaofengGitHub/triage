package com.chenwei.superadminmgmt;

import java.util.List;

import org.apache.log4j.Logger;
import org.eclipse.jetty.util.security.Credential.MD5;

import com.chenwei.jfinal.ResultMessage;
import com.chenwei.tool.HMAC;
import com.chenwei.tool.MD5Util;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class SuperAdminMgmtController extends Controller {
	private static Logger log = Logger.getLogger(SuperAdminMgmtController.class);

	public void index() {
		setAttr("biaoti","superadminmgmt");
		render("main.html");
	}
	public void setVersion() {
		setAttr("biaoti","superadminmgmt");
		render("setVersion.html");
	}
	
	public void setTryDate() {
		render("setTryDate.html");
	}
	
	// 查询 版本控制
	public void queryVersionControl() {
		ResultMessage result = new ResultMessage();
		Record l =  Db.findFirst("SELECT c.id,c.cd_key,c.version_id,c.try_start_time,c.try_end_time,i.`name` from stt_ve_c c LEFT JOIN stt_version_info i on c.version_id=i.id");
		Record hp =  Db.findFirst("SELECT hp_name,hp_code from stt_hospital");
		System.out.println(hp.getStr("hp_name")+l.getStr("cd_key")+hp.getStr("hp_code")+l.getStr("version_id"));
//		String encryption_cd_key = MD5Util.MD5(hp.getStr("hp_name")+l.getStr("cd_key")+hp.getStr("hp_code")+l.getStr("version_id"));
//		l.set("encryption_cd_key", encryption_cd_key);
		l.set("hp_name", hp.getStr("hp_name"));
		result.setStatus(200);
		result.setRows(l);
		renderJson(result);
		return;
	}
	
	public void updatecdkey() {
		ResultMessage result = new ResultMessage();
		String cdkey = getPara("cdkey");
		String old_version_id = getPara("old_version_id");
		String version_id = getPara("version_id");
		String try_start_time = getPara("try_start_time");
		String try_end_time = getPara("try_end_time");
		Record l =  Db.findFirst("SELECT hp_name,hp_code from stt_hospital");
//		String encryption_cd_key = MD5Util.MD5(l.getStr("hp_name")+cdkey+l.getStr("hp_code")+version_id);
		if(old_version_id.equals(version_id)){
			Db.update("UPDATE stt_ve_c set cd_key=?,version_id=?,try_start_time=?,try_end_time=?", cdkey,version_id,try_start_time,try_end_time);
		}else{
			Db.update("UPDATE stt_ve_c set cd_key=?,version_id=?,try_start_time=?,try_end_time=?,status=?", cdkey,version_id,try_start_time,try_end_time,"0");
		}
		
		result.setStatus(200);
//		result.setRows(encryption_cd_key);
		renderJson(result);
	}
	
	
	public void queryVersionInfoList() {
		ResultMessage result = new ResultMessage();
		List<Record > l = Db.find("select * from stt_version_info");
		result.setStatus(200);
		result.setRows(l);
		renderJson(result);
		return;
	}
	public void updateVersionId() {
		ResultMessage result = new ResultMessage();
		String versionId = getPara("versionId");
		Db.update("UPDATE stt_ve_c set version_id=?", versionId);
		result.setStatus(200);
		renderJson(result);
	}
	
	public void updatetrydate() {
		ResultMessage result = new ResultMessage();
		String try_start_time = getPara("try_start_time");
		String try_end_time = getPara("try_end_time");
		Db.update("UPDATE stt_ve_c set try_start_time=?,try_end_time=?", try_start_time,try_end_time);
		result.setStatus(200);
		renderJson(result);
	}
	
}
