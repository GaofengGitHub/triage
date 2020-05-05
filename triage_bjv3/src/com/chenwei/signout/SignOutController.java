package com.chenwei.signout;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.chenwei.jfinal.ResultMessage;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

public class SignOutController extends Controller {

	private static Logger log = Logger.getLogger(SignOutController.class);

	public void index() {		
		render("signoutlist.html");
	}
	
	public void querypatientbydividenurse(){
		
		//String dividenurse = getPara("dividenurse");
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Record re=null;
		if(userName!=null && userName!=""){
			//查询最后一次退出时间
		    re = Db.findFirst("select stt_user.tu_id as userid,stt_user.username as username,stt_user.loginname as loginname,stt_user.workID as workid,"
				+"stt_user.last_login_time as lastlogintime from stt_user  where stt_user.loginname = ?",userName);
		}
		String dividenurse = "";
		String lastlogintime = "";
		if(re!=null){
			dividenurse = re.get("userid")+"";
			lastlogintime = re.get("lastlogintime")+"";
		}
		List<Record> ls = Db.find("select ((CASE when d.cardnum is null or d.cardnum = '' then 1 else 0 end)"+
		                        "+(CASE when d.fullname is null or d.fullname = '' then 1 else 0 end)"+
								"+(CASE when d.gender is null or d.gender = '' then 1 else 0 end)"+
		                        "+(CASE when d.age is null or d.age = '' then 1 else 0 end)"+
								"+(CASE when d.bornday is null or d.bornday = '' then 1 else 0 end)"+
								"+(CASE when d.category is null or d.category = '' then 1 else 0 end)"+
								"+(CASE when (d.tel is not null and d.tel != '') or (d.idcard is not null and d.idcard != '') then 0 else 1 end)"+
								"+(CASE when d.admission is null or d.admission = '' then 1 else 0 end)"+
								"+(CASE when d.consciousness is null or d.consciousness = '' then 1 else 0 end)"+
								"+(CASE when d.source is null or d.source = '' then 1 else 0 end)"+
								"+(CASE when d.anamnesis is null or d.anamnesis = '' then 1 else 0 end)"+
								"+(CASE when (e.autograde is not null and e.autograde != '') or (e.finalgrade is not null and e.finalgrade != '') then 0 else 1 end)"+
								"+(CASE when e.dividdepartment is null or e.dividdepartment = '' then 1 else 0 end)"+
								"+(CASE when e.dividtime is null or e.dividtime = '' then 1 else 0 end)"+
								//"+(CASE when e.zhusu is null or e.zhusu = '' then 1 else 0 end)"+
								//"+(CASE when f.hx is null or f.hx = '' then 1 else 0 end)"+
								"+(CASE when f.tw is null or f.tw = '' then 1 else 0 end)"+
								"+(CASE when f.mb is null or f.mb = '' then 1 else 0 end)"+
								"+(CASE when f.szy is null or f.szy = '' then 1 else 0 end)"+
								"+(CASE when f.ssy is null or f.ssy = '' then 1 else 0 end)"+
								"+(CASE when f.spo2 is null or f.spo2 = '' then 1 else 0 end)"+
								") as nullnum,d.id as pid "+
								"from trt_patient as d LEFT JOIN trt_patient_handle as e on d.id=e.p_id"+ 
                                " LEFT JOIN trt_patient_sign as f on f.p_id=d.id and f.cixu=e.cixu where e.cixu="+
                                 "(SELECT max(cixu+0) from trt_patient_handle t6 where t6.p_id=d.id) and e.feijz= '1' and e.dividenurseid=? "
                                 + "and d.registertime between '"+lastlogintime+"' and now() GROUP BY d.id",dividenurse);
		
		List<Record> ls2 = Db.find("select ((CASE when d.cardnum is null or d.cardnum = '' then 1 else 0 end)"+
                "+(CASE when d.fullname is null or d.fullname = '' then 1 else 0 end)"+
				"+(CASE when d.gender is null or d.gender = '' then 1 else 0 end)"+
                "+(CASE when d.age is null or d.age = '' then 1 else 0 end)"+
				"+(CASE when d.bornday is null or d.bornday = '' then 1 else 0 end)"+
				"+(CASE when d.category is null or d.category = '' then 1 else 0 end)"+
				"+(CASE when (d.tel is not null and d.tel != '') or (d.idcard is not null and d.idcard != '') then 0 else 1 end)"+		
				"+(CASE when e.dividdepartment is null or e.dividdepartment = '' then 1 else 0 end)"+
				"+(CASE when e.dividtime is null or e.dividtime = '' then 1 else 0 end)"+			
				") as nullnum,d.id as pid "+
				"from trt_patient as d LEFT JOIN trt_patient_handle as e on d.id=e.p_id "+ 
                "LEFT JOIN trt_patient_sign as f on f.p_id=d.id and f.cixu=e.cixu where e.cixu="+
                 "(SELECT max(cixu+0) from trt_patient_handle t6 where t6.p_id=d.id) and e.feijz= '2' and e.dividenurseid=? "
                 + "and d.registertime between '"+lastlogintime+"' and now() GROUP BY d.id",dividenurse);
		boolean bl = true;
		List<Record> ls3=new ArrayList<Record>();
		ls3.addAll(ls);
		ls3.addAll(ls2);
		if(ls.size()>0){
			for(int i=0;i<ls3.size();i++){
				if(!(ls3.get(i).get("nullnum")+"").equals("0")){
					bl=false;
				}
			}
		    renderJson(ResultMessage.build(200, "查询成功",bl));
		}else{
			renderJson(ResultMessage.build(400, "数据库状态异常！！"));
		}
		return;
	}
	
	public void querypatientlistbydividenurse(){
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		//String dividenurse = getPara("dividenurse");
		HttpSession session = getSession();
		String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		Record re=null;
		if(userName!=null && userName!=""){
		    re = Db.findFirst("select stt_user.tu_id as userid,stt_user.username as username,stt_user.loginname as loginname,stt_user.workID as workid,"
				+"stt_user.last_login_time as lastlogintime from stt_user  where stt_user.loginname = ?",userName);
		}
		String dividenurse = "";
		String lastlogintime = "";
		if(re!=null){
			dividenurse = re.get("userid")+"";
			lastlogintime = re.get("lastlogintime")+"";
		}
		String sort = getPara("sort");
		String order = getPara("sortOrder");
		String searchText = getPara("searchText");
		String orderByStr="" ;
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			orderByStr = " order by "+sort + " " + order;
		}
		Page<Record> ls = null;
		Page<Record> ls2 = null;
		ls = Db.paginate(page,rows,"select ((CASE when d.cardnum is null or d.cardnum = '' then 1 else 0 end)"+
		                        "+(CASE when d.fullname is null or d.fullname = '' then 1 else 0 end)"+
								"+(CASE when d.gender is null or d.gender = '' then 1 else 0 end)"+
		                        "+(CASE when d.age is null or d.age = '' then 1 else 0 end)"+
								"+(CASE when d.bornday is null or d.bornday = '' then 1 else 0 end)"+
								"+(CASE when d.category is null or d.category = '' then 1 else 0 end)"+
								"+(CASE when (d.tel is not null and d.tel != '') or (d.idcard is not null and d.idcard != '') then 0 else 1 end)"+
								"+(CASE when d.admission is null or d.admission = '' then 1 else 0 end)"+
								"+(CASE when d.consciousness is null or d.consciousness = '' then 1 else 0 end)"+
								"+(CASE when d.source is null or d.source = '' then 1 else 0 end)"+
								"+(CASE when d.anamnesis is null or d.anamnesis = '' then 1 else 0 end)"+
								"+(CASE when (e.autograde is not null and e.autograde != '') or (e.finalgrade is not null and e.finalgrade != '') then 0 else 1 end)"+
								"+(CASE when e.dividdepartment is null or e.dividdepartment = '' then 1 else 0 end)"+
								"+(CASE when e.dividtime is null or e.dividtime = '' then 1 else 0 end)"+
								//"+(CASE when e.zhusu is null or e.zhusu = '' then 1 else 0 end)"+
								//"+(CASE when f.hx is null or f.hx = '' then 1 else 0 end)"+
								"+(CASE when f.tw is null or f.tw = '' then 1 else 0 end)"+
								"+(CASE when f.mb is null or f.mb = '' then 1 else 0 end)"+
								"+(CASE when f.szy is null or f.szy = '' then 1 else 0 end)"+
								"+(CASE when f.ssy is null or f.ssy = '' then 1 else 0 end)"+
								"+(CASE when f.spo2 is null or f.spo2 = '' then 1 else 0 end)"+
								") as nullnum,d.id as pid,d.cardnum as cardnum,d.fullname as fullname,e.feijz as feijz,"
								+ "d.gender as gender,d.age as age,e.dividtime as dividtime,g.grade_name as gradename,g.grade_color as gradecolor ",
								"from trt_patient as d LEFT JOIN trt_patient_handle as e on d.id=e.p_id "+ 
                                "LEFT JOIN trt_patient_sign as f on f.p_id=d.id and f.cixu=e.cixu LEFT JOIN stt_yjfjset "
                                + "as g on g.ys_id=if(e.finalgrade ='' or e.finalgrade is null,e.autograde,e.finalgrade)"
                                + "where e.cixu=(SELECT max(cixu+0) from trt_patient_handle t6 where t6.p_id=d.id) " +
                                 "and e.feijz= '1' and e.dividenurseid='"+dividenurse+"' and d.registertime between '"+lastlogintime+"' "
                                 + "and now() and d.fullname like '%"+searchText+"%'"+" GROUP BY d.id"+orderByStr);								
		
		ls2 = Db.paginate(page,rows,"select ((CASE when d.cardnum is null or d.cardnum = '' then 1 else 0 end)"+
                "+(CASE when d.fullname is null or d.fullname = '' then 1 else 0 end)"+
				"+(CASE when d.gender is null or d.gender = '' then 1 else 0 end)"+
                "+(CASE when d.age is null or d.age = '' then 1 else 0 end)"+
				"+(CASE when d.bornday is null or d.bornday = '' then 1 else 0 end)"+
				"+(CASE when d.category is null or d.category = '' then 1 else 0 end)"+
				"+(CASE when (d.tel is not null and d.tel != '') or (d.idcard is not null and d.idcard != '') then 0 else 1 end)"+		
				"+(CASE when e.dividdepartment is null or e.dividdepartment = '' then 1 else 0 end)"+
				"+(CASE when e.dividtime is null or e.dividtime = '' then 1 else 0 end)"+			
				") as nullnum,d.id as pid,d.cardnum as cardnum,d.fullname as fullname,e.feijz as feijz,"
				+ "d.gender as gender,d.age as age,e.dividtime as dividtime ",
				"from trt_patient as d LEFT JOIN trt_patient_handle as e on d.id=e.p_id "+ 
                "LEFT JOIN trt_patient_sign as f on f.p_id=d.id and f.cixu=e.cixu where e.cixu="+
                 "(SELECT max(cixu+0) from trt_patient_handle t6 where t6.p_id=d.id) and e.feijz= '2' "
                 + "and e.dividenurseid='"+dividenurse+"' and d.registertime between '"+lastlogintime+"' "
                 + "and now() and d.fullname like '%"+searchText+"%'"+" GROUP BY d.id"+orderByStr);								
		
		if(ls!=null && ls2!=null){
			List<Record> ls3=new ArrayList<Record>();
			ls3.addAll(ls.getList());
			ls3.addAll(ls2.getList());
			renderJson(ResultMessage.build(200, "查询成功",ls.getTotalRow()+ls2.getTotalRow(),ls3));
		}else if(ls!=null){
			renderJson(ResultMessage.build(200, "查询成功",ls.getTotalRow(),ls.getList()));
		}else if(ls2!=null){
			renderJson(ResultMessage.build(200, "查询成功",ls2.getTotalRow(),ls2.getList()));
		}else{
			renderJson(ResultMessage.build(400, "没有符合条件数据"));
		}
	}
}