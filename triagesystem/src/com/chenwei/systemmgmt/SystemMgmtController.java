package com.chenwei.systemmgmt;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;

import com.chenwei.jfinal.ResultMessage;
import com.chenwei.tool.IdWorker;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;

public class SystemMgmtController extends Controller{
	private static Logger log = Logger.getLogger(SystemMgmtController.class);

	public void index() {
		Record re =  Db.findFirst("select stt_hospital.hp_id as hpid,stt_hospital.hp_name as hpname,stt_hospital.hp_code as hpcode,"
				+ "stt_hospital.hp_province as hpprovince,stt_hospital.hp_city as hpcity,stt_hospital.hp_address as hpaddress,"
				+ "stt_hospital.hp_logourl as hplogourl from stt_hospital");
		setSessionAttr("hpname", re.get("hpname"));
		setSessionAttr("hplogourl",re.get("hplogourl"));
		setAttr("hpid",re.get("hpid"));
		setAttr("hpname",re.get("hpname"));
		setAttr("hpcode",re.get("hpcode"));
		setAttr("hpprovince",re.get("hpprovince"));
		setAttr("hpcity",re.get("hpcity"));
		setAttr("hpaddress",re.get("hpaddress"));
		setAttr("hplogourl",re.get("hplogourl"));
		setAttr("biaoti","systemmgmt");
		render("main.html");
	}
	
	public void index2() {
		Record re =  Db.findFirst("select stt_hospital.hp_id as hpid,stt_hospital.hp_name as hpname,stt_hospital.hp_code as hpcode,"
				+ "stt_hospital.hp_province as hpprovince,stt_hospital.hp_city as hpcity,stt_hospital.hp_address as hpaddress,"
				+ "stt_hospital.hp_logourl as hplogourl from stt_hospital");
		
		setAttr("hpid",re.get("hpid"));
		setAttr("hpname",re.get("hpname"));
		setAttr("hpcode",re.get("hpcode"));
		setAttr("hpprovince",re.get("hpprovince"));
		setAttr("hpcity",re.get("hpcity"));
		setAttr("hpaddress",re.get("hpaddress"));
		setAttr("hplogourl",re.get("hplogourl"));
		setAttr("biaoti","systemmgmt");
		render("index.html");
	}
	
    public void yjfzSetPre() {
		
		List<Record> ls=Db.find("select stt_yjfjset.ys_id as ysid,stt_yjfjset.grade_set as gradeset,stt_yjfjset.grade_name as gradename,stt_yjfjset.grade_color as gradecolor,"
				+ "stt_yjfjset.grade_overtime as gradeovertime,stt_yjfjset.warn_patients as warnpatients from stt_yjfjset");
			setAttr("gradeset", ls.get(0).get("gradeset"));
			setAttr("warnpatients", ls.get(0).get("warnpatients"));
			for(int i=0;i<ls.size();i++){
				setAttr("ysid"+(i+1), ls.get(i).get("ysid"));
				setAttr("gradename"+(i+1), ls.get(i).get("gradename"));
				setAttr("gradecolor"+(i+1), ls.get(i).get("gradecolor"));
				setAttr("gradeovertime"+(i+1), ls.get(i).get("gradeovertime"));
			}
			List<Record> ls2 = null;
			ls2=Db.find("select * from stt_pjb where system=? and status='1' order by sort","分诊");
			if(ls2.size()>0){
				
				JSONArray json = new JSONArray();
				for(int i=0;i<ls2.size();i++){
					JSONObject jo = new JSONObject();
					jo.put("tyid", ls2.get(i).get("ty_id"));
					jo.put("tyname", ls2.get(i).get("ty_name"));
					json.add(jo);
				}
				setAttr("pjblist",json);
			}
			
			List<Record> ls4 = null;
			ls4=Db.find("select stt_yjfzpjb.ty_id as tyid,stt_yjfzpjb.ty_name as tyname,stt_yjfzpjbright.right_type as righttype from stt_yjfzpjbright," +
					"stt_yjfzpjb where stt_yjfzpjb.ty_id=stt_yjfzpjbright.ty_id and stt_yjfzpjbright.status=1 and stt_yjfzpjb.status=1 ");
			if(ls4.size()>0){
				
				JSONArray json = new JSONArray();
				for(int i=0;i<ls4.size();i++){
					JSONObject jo = new JSONObject();
					jo.put("tyid", ls4.get(i).get("tyid"));
					jo.put("tyname", ls4.get(i).get("tyname"));
					jo.put("righttype", ls4.get(i).get("righttype"));
					json.add(jo);
				}
				setAttr("pjblist4",json);
			}
			List<Record> ls3=Db.find("select role_name from stt_role where fztj='1'");
			StringBuffer rolenames = new StringBuffer() ;
			for(int i=0;i<ls3.size();i++){
				rolenames.append(ls3.get(i).getStr("role_name"));
				rolenames.append(" ");
			}
			String rolename =  rolenames.toString();
			if(rolename.length()>0) rolename =rolename.substring(0, rolename.length()-1);
			setAttr("rolename",rolename);
		render("systemsetindex.html");
	}
	
	public void yjfzSet() {
		
		List<Record> ls=Db.find("select stt_yjfjset.ys_id as ysid,stt_yjfjset.grade_set as gradeset,stt_yjfjset.grade_name as gradename,stt_yjfjset.grade_color as gradecolor,"
				+ "stt_yjfjset.grade_overtime as gradeovertime,stt_yjfjset.warn_patients as warnpatients from stt_yjfjset");
		List<Record> ls2=Db.find("select stt_yjfzpjb.ty_id as tyid,stt_yjfzpjb.ty_name as tyname,stt_yjfzpjbright.right_type as righttype from stt_yjfzpjbright,"
				+ "stt_yjfzpjb where stt_yjfzpjb.ty_id=stt_yjfzpjbright.ty_id and stt_yjfzpjbright.status=1 and stt_yjfzpjb.status=1");
		if(ls.size()>0 && ls2.size()>0){
			setAttr("gradeset", ls.get(0).get("gradeset"));
			setAttr("warnpatients", ls.get(0).get("warnpatients"));
			for(int i=0;i<ls.size();i++){
				setAttr("ysid"+(i+1), ls.get(i).get("ysid"));
				setAttr("gradename"+(i+1), ls.get(i).get("gradename"));
				setAttr("gradecolor"+(i+1), ls.get(i).get("gradecolor"));
				setAttr("gradeovertime"+(i+1), ls.get(i).get("gradeovertime"));
			}
			JSONArray json = new JSONArray();
			for(int i=0;i<ls2.size();i++){
				JSONObject jo = new JSONObject();
				jo.put("tyid", ls2.get(i).get("tyid"));
				jo.put("tyname", ls2.get(i).get("tyname"));
				jo.put("righttype", ls2.get(i).get("righttype"));
				json.add(jo);
			}
			setAttr("pjblist",json);
		}
		render("system-set.html");
	}
	
	public void hpbasicInfo() {
		Record re =  Db.findFirst("select stt_hospital.hp_id as hpid,stt_hospital.hp_name as hpname,stt_hospital.hp_code as hpcode,"
				+ "stt_hospital.hp_province as hpprovince,stt_hospital.hp_city as hpcity,stt_hospital.hp_address as hpaddress,stt_hospital.piont_x,stt_hospital.piont_y,"
				+ "stt_hospital.hp_logourl as hplogourl from stt_hospital");
		
		setAttr("hpid",re.get("hpid"));
		setAttr("hpname",re.get("hpname"));
		setAttr("hpcode",re.get("hpcode"));
		setAttr("hpprovince",re.get("hpprovince"));
		setAttr("hpcity",re.get("hpcity"));
		setAttr("hpaddress",re.get("hpaddress"));
		setAttr("hplogourl",re.get("hplogourl"));
		setAttr("piont_x",re.get("piont_x"));
		setAttr("piont_y",re.get("piont_y"));
		render("system-revamp.html");
	}
	
	public void keshiInfo() {
		render("system-index.html");
	}
	
	public void addDepart() {
		render("adddepart.html");
	}
	public void intelligentDiagnosis() {
		render("intelligentDiagnosis.html");
	}
	public void updateDepart() {
		
		String departid = getPara("departid");
		Record ls = Db.findFirst("select stt_depart.td_name as departname,stt_depart.readyclinicalreceptionmax as readyclinicalreceptionmax,stt_depart.clinicalreceptionmax as clinicalreceptionmax,"
				+ "stt_depart.departbednum as departbednum,stt_depart.addbednum as addbednum from stt_depart where stt_depart.td_id = ?",departid);
		
		if(ls!=null){
			List<Record> ls2 = Db.find("select stt_stationdepart.ts_id as stationid from stt_stationdepart where stt_stationdepart.td_id = ?",departid);
			JSONArray json = new JSONArray();
			if(ls2.size()>0){
				
				for(int i=0;i<ls2.size();i++){
					JSONObject jo = new JSONObject();
					jo.put("stationid", ls2.get(i).get("stationid"));
					json.add(jo);
				}
			}
			if(ls.get("departbednum")!=null && ls.get("departbednum")!="" && ls.get("addbednum")!=null && ls.get("addbednum")!=""){
				setAttr("addbednum",ls.get("addbednum"));
				setAttr("departbednum",ls.get("departbednum"));
			}
			setAttr("departname",ls.get("departname"));
			setAttr("departid",departid);
			setAttr("clinicalreceptionmax",ls.get("clinicalreceptionmax"));
			setAttr("readyclinicalreceptionmax",ls.get("readyclinicalreceptionmax"));
			setAttr("stationlist",json);
		}else{
			
		}
		render("updatedepart.html");
	}
	
	public void disableDepart() {
		ResultMessage result = new ResultMessage();
		String departid = getPara("departid");
		//String status = getPara("status");
		Record ls = null;
		ls=Db.findFirst("select stt_depart.status as status from stt_depart where stt_depart.td_id = ?",departid);
		if(ls!=null){
			if(ls.get("status").equals(1)){
				Record re1 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中'",departid);
				if(re1!= null && re1.getInt("count(id)")>0){
					result.setStatus(400);
					result.setMessage("该科室床位有被患者使用，不能停用该科室！！");
					renderJson(result);
					return;
				}
				Db.update("update stt_depart set stt_depart.status = ? where stt_depart.td_id = ?", "0",departid);
			}else{
				Db.update("update stt_depart set stt_depart.status = ? where stt_depart.td_id = ?", "1",departid);
			}
			result.setStatus(200);
		}else{
			result.setStatus(400);
			result.setMessage("数据库更新异常！！");
		}
		
		renderJson(result);
		
		return;
	}
	
	public void queryDepart() {
		ResultMessage result = new ResultMessage();
		String searchText = getPara("searchText");
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		String sort = getPara("sort");
		String order = getPara("order");
		String orderByStr="";
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			orderByStr = " order by "+sort + " " + order;
		}
		Page<Record> ls = null;
		if(searchText==null||"".equals(searchText)){
			ls=Db.paginate(page,rows, "select stt_depart.td_id as departid,stt_depart.td_name as departname,stt_depart.readyclinicalreceptionmax as readyclinicalreceptionmax,stt_depart.clinicalreceptionmax as clinicalreceptionmax,stt_depart.departbednum as departbednum,stt_depart.addbednum as addbednum,stt_depart.status as status "
					, "from stt_depart"+orderByStr);
	   	}else{
	   		ls = Db.paginate(page,rows, 
	   				"select stt_depart.td_id as departid,stt_depart.td_name as departname,stt_depart.readyclinicalreceptionmax as readyclinicalreceptionmax,stt_depart.clinicalreceptionmax as clinicalreceptionmax,stt_depart.departbednum as departbednum,stt_depart.addbednum as addbednum,stt_depart.status as status ",
	   				"from stt_depart where stt_depart.td_name like '%"+searchText+"%'"+orderByStr);
	   	}
		result.setStatus(200);
		result.setTotal(ls.getTotalRow());
		result.setRows(ls.getList());
		renderJson(result);
		
		return;
	}
	
	public void adddepartconfirm(){
		ResultMessage result = new ResultMessage();
		String departname = getPara("departname");
		String readyclinicalreceptionmax = getPara("readyclinicalreceptionmax");
		String clinicalreceptionmax = getPara("clinicalreceptionmax");
		String workstation = getPara("workstation");
		String departbednum = getPara("departbednum");
		String addbednum = getPara("addbednum");
		int bednum=0;
		int addnum=0;
		if(departbednum!=""){
			bednum=Integer.parseInt(departbednum);
		}else{
			departbednum=null;
		}
        if(addbednum!=""){
			addnum=Integer.parseInt(addbednum);
		}else{
			addbednum=null;
		} 
        if(readyclinicalreceptionmax!=null && readyclinicalreceptionmax.equals("")){
        	readyclinicalreceptionmax=null;
        }
        if(clinicalreceptionmax!=null && clinicalreceptionmax.equals("")){
        	clinicalreceptionmax=null;
        }
        
        String asq3 = "select stt_depart.td_name from stt_depart where stt_depart.td_name=?";
		Record re124 = Db.findFirst(asq3,departname);
        if(re124==null){
        	String asql1 = "insert into stt_depart(td_id,td_parent_id,td_name,readyclinicalreceptionmax,clinicalreceptionmax,departbednum,addbednum,status)"
    				+" values(null,1,?,?,?,?,?,1)";
    		int a = Db.update(asql1,departname,readyclinicalreceptionmax,clinicalreceptionmax,departbednum,addbednum);
    		String asql = "insert into stt_stationdepart(tsd_id,ts_id,td_id) values(null,?,?)";		
    		String[] workstation2 = workstation.split(",");
    		if(a>0){
    			Record re = Db.findFirst("select stt_depart.td_id as departid from stt_depart where stt_depart.td_name=?",departname);
    			int aa = re.getInt("departid");
    			/*if(bednum!=0){
    				for(int i=1;i<=bednum;i++){
    					String asql2 = "insert into stt_departbed(id,depart_id,bed_num,patient_id,arrivetime,status,addbedsign) values("+IdWorker.nextId()+",?,'抢救"+i+"床',null,null,'空闲','0')";
    					Db.update(asql2,aa);
    				}
    			}*/
    			for(int i=0;i<workstation2.length;i++){
    				int stationid = Integer.parseInt(workstation2[i]);
    				Db.update(asql,stationid,aa);
    			}
    			result.setStatus(200);
    		}else{
    			result.setStatus(400);
    			result.setMessage("数据库异常！！");;
    		}
        }else{
        	result.setStatus(400);
			result.setMessage("新增失败，科室名称已被占用！！");
        }
        renderJson(result);
		return;
	}
	
	public void upddepartconfirm(){
		ResultMessage result = new ResultMessage();
		String departid = getPara("departid");
		String departname = getPara("departname");
		String readyclinicalreceptionmax = getPara("readyclinicalreceptionmax");
		String clinicalreceptionmax = getPara("clinicalreceptionmax");
		String workstation = getPara("workstation");
		String departbednum = getPara("departbednum");
		String addbednum = getPara("addbednum");
		if(readyclinicalreceptionmax!=null && readyclinicalreceptionmax.equals("")){
			readyclinicalreceptionmax=null;
		}
		if(clinicalreceptionmax!=null && clinicalreceptionmax.equals("")){
			clinicalreceptionmax=null;
		}
		int bednum=0;
		int addnum=0;
		Record re3 = Db.findFirst("select stt_depart.departbednum as departbednum,stt_depart.addbednum as addbednum from stt_depart where stt_depart.td_id=?",departid);
		if(re3==null){
			result.setStatus(400);
			result.setMessage("修改数据异常，修改失败！！");
			renderJson(result);
			return;
		}
		
		String asq3 = "select stt_depart.td_id as departid from stt_depart where stt_depart.td_name=?";
		Record re124 = Db.findFirst(asq3,departname);
		if(re124!=null && !re124.get("departid").equals(departid)){
			if(!(departid!=null && departid.equals(re124.get("departid")+""))){
				result.setStatus(400);
				result.setMessage("修改失败，科室名称已被占用！！");
				renderJson(result);
				return;
			}
		}

		/*if(departbednum!=""){
			bednum=Integer.parseInt(departbednum);
		}else{
			departbednum=null;
			Record re1 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='0'",departid);
			if(re1!= null && re1.getInt("count(id)")>0){
				result.setStatus(400);
				result.setMessage("该科室床位有被使用，不能废弃科室床位！！");
				renderJson(result);
				return;
			}
		}*/
        /*if(addbednum!=""){
			addnum=Integer.parseInt(addbednum);
		}else{
			addbednum=null;
			Record re1 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='1'",departid);
			if(re1!= null && re1.getInt("count(id)")>0){
				result.setStatus(400);
				result.setMessage("该科室加床位有被使用，不能废弃科室加床！！");
				renderJson(result);
				return;
			}
		}*/
		/*if(re3!=null && re3.getInt("departbednum")!=null){
			if(bednum<re3.getInt("departbednum")){
				Record re4 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='0'",departid);
				if(bednum<re4.getInt("count(id)")){
					result.setStatus(400);
					result.setMessage("该科室的床位数必须大于已经使用的床位数！！");
					renderJson(result);
					return;
				}else{
					int b = re3.getInt("departbednum")-bednum;
					List<Record> ls = Db.find("select stt_departbed.id as id from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='空闲' "
							+ "and stt_departbed.addbedsign='0' order by stt_departbed.id desc limit "+b,departid);
					String debedsql = "delete from stt_departbed where stt_departbed.id=?";
					for(int i=0;i<ls.size();i++){
						Db.update(debedsql,ls.get(i).get("id"));
					}
				}
			}else if(bednum>re3.getInt("departbednum")){
				int b = bednum-re3.getInt("departbednum");
				Record re4 = Db.findFirst("select stt_departbed.bed_num as bednum from stt_departbed where stt_departbed.depart_id=? and stt_departbed.addbedsign='0' order by stt_departbed.id desc",departid);
				if(re4!=null){
					String aab = re4.get("bednum");
					//if(aab.length()>3){
						//String aac = aab.substring(2, aab.length()-1);
						String aac = aab.replaceAll("[^0-9]", "");
						int aad = Integer.parseInt(aac);
						for(int i=1;i<=b;i++){
							String asql2 = "insert into stt_departbed(id,depart_id,bed_num,status,addbedsign) values("+IdWorker.nextId()+",?,'抢救"+(aad+i)+"床','空闲','0')";
							Db.update(asql2,departid);
						}
					//}	
				}
			}
		}else{
			for(int i=1;i<=bednum;i++){
				String asql2 = "insert into stt_departbed(id,depart_id,bed_num,status,addbedsign) values("+IdWorker.nextId()+",?,'抢救"+i+"床','空闲','0')";
				Db.update(asql2,departid);
			}
		}
		if(re3!=null && re3.getInt("addbednum")!=null){
			if(addnum<re3.getInt("addbednum")){
				Record re4 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='1'",departid);
				if(addnum<re4.getInt("count(id)")){
					result.setStatus(400);
					result.setMessage("该科室的加床数必须大于已经使用的加床数！！");
					renderJson(result);
					return;
				}else{
					int b = re3.getInt("addbednum")-addnum;
					List<Record> ls = Db.find("select stt_departbed.id as id from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='空闲' and stt_departbed.addbedsign='1' order by stt_departbed.id desc limit "+b,departid);		
					String debedsql = "delete from stt_departbed where stt_departbed.id=?";
					for(int i=0;i<ls.size();i++){
						Db.update(debedsql,ls.get(i).get("id"));
					}
				}
			}
		}*/
		String asql1 = "update stt_depart set td_name=?,readyclinicalreceptionmax=?,clinicalreceptionmax=?,departbednum=?,addbednum=?"
				+" where td_id = ?";
		int a = Db.update(asql1,departname,readyclinicalreceptionmax,clinicalreceptionmax,departbednum,addbednum,departid);
		
		String asql2 = "delete from stt_stationdepart where td_id=?";
		Db.update(asql2,departid);
		String asql = "insert into stt_stationdepart(tsd_id,ts_id,td_id) values(null,?,?)";
		String[] workstation2 = workstation.split(",");
		if(a>0){
			for(int i=0;i<workstation2.length;i++){
				int stationid = Integer.parseInt(workstation2[i]);
				Db.update(asql,stationid,departid);
			}
			result.setStatus(200);
		}else{
			result.setStatus(400);
			result.setMessage("数据库异常！！");
		}
        renderJson(result);
		return;
	}
	
	public void pjbsetconfirm(){
		ResultMessage result = new ResultMessage();
		String grade = getPara("grade");
		String ysid1 = getPara("paixu1");
		String gradename1 = getPara("gradename1");
		String gradecolor1 = getPara("gradecolor1");
		String gradeovertime1 = getPara("gradeovertime1");
		String ysid2 = getPara("paixu2");
		String gradename2 = getPara("gradename2");
		String gradecolor2 = getPara("gradecolor2");
		String gradeovertime2 = getPara("gradeovertime2");
		String ysid3 = getPara("paixu3");
		String gradename3 = getPara("gradename3");
		String gradecolor3 = getPara("gradecolor3");
		String gradeovertime3 = getPara("gradeovertime3");
		String ysid4 = getPara("paixu4");
		String gradename4 = getPara("gradename4");
		String gradecolor4 = getPara("gradecolor4");
		String gradeovertime4 = getPara("gradeovertime4");
		String ysid5 = getPara("paixu5");
		String gradename5 = getPara("gradename5");
		String gradecolor5 = getPara("gradecolor5");
		String gradeovertime5 = getPara("gradeovertime5");
		//String mainfenjiid = getPara("mainfenjiid");
		//String warnpatients = getPara("warnpatients");
		//String otherfenjilist = getPara("otherfenjilist");
		//JSONArray otherfenjilist1 = JSONUtil.parseArray(otherfenjilist);
		//String asql1 = "update stt_yjfzpjbright set right_type=2,status=0";
		//int g = Db.update(asql1);
		//String asql3 = "update stt_yjfzpjbright set right_type=1,status=1 where ty_id=?";
		//int h = Db.update(asql3,mainfenjiid);
		//String asql4 = "update stt_yjfzpjbright set status=1 where ty_id=?";
		//String otherfenji = "";
		//for(int i=0;i<otherfenjilist1.size();i++){
			//int tyid = Integer.parseInt(otherfenjilist1.getJSONObject(i).get("id")+"");
			//if(i==0){
			//otherfenji=tyid+otherfenji;
			//}else{
				//otherfenji=otherfenji+","+tyid;
			//}
			//Db.update(asql4,tyid);
		//}
		String asql5 = "update stt_yjfjset set grade_set=?,warn_patients=?,classify_main_id=?,classify_minor_id=?";
		int f = Db.update(asql5,grade,0,0,0);
		String asql2 = "update stt_yjfjset set grade_name=?,grade_color=?,grade_overtime=?,status=1"
				+" where ys_id = ?";
		int a = Db.update(asql2,gradename1,gradecolor1,gradeovertime1,ysid1);
		int b = Db.update(asql2,gradename2,gradecolor2,gradeovertime2,ysid2);
		int c = Db.update(asql2,gradename3,gradecolor3,gradeovertime3,ysid3);
		int d = Db.update(asql2,gradename4,gradecolor4,gradeovertime4,ysid4);
		int e=0;
		if(!grade.equals("4")){
		    e = Db.update(asql2,gradename5,gradecolor5,gradeovertime5,ysid5);
		}else{
		    e = Db.update("update stt_yjfjset set status=0 where ys_id = ?",ysid5);
		}
		if(a>0 && b>0 && c>0 && d>0 && e>0&&f>0){
			result.setStatus(200);
		}else{
			result.setStatus(400);
			result.setMessage("数据库访问异常");
		}
		renderJson(result);
		return;
	}
	
    public void updHospitalInfo() {
    	//ResultMessage result = new ResultMessage();
    	String path="static/images".trim();  
        String base=this.getRequest().getContextPath().trim();//应用路径  
        //UploadFile picFile = getFile("hospitallogourl");
        UploadFile picFile = getFile();
        String hospitalid = getPara("hospitalid");
        String hospitalname = getPara("hospitalname");
        String hospitalcode = getPara("hospitalcode");
        String province = getPara("province");
        String city = getPara("city");
        String hospitaladdress = getPara("hospitaladdress");
        String piont_x = getPara("piont_x");
        String piont_y = getPara("piont_y");
        if(picFile==null){
        	String asql5 = "update stt_hospital set hp_name=?,hp_code=?,hp_address=?,hp_province=?,hp_city=?,piont_x=?,piont_y=? where hp_id=?";
        	int f = Db.update(asql5,hospitalname,hospitalcode,hospitaladdress,province,city,piont_x,piont_y,hospitalid);
        	
        	if(f>0){
        		renderJson(ResultMessage.build(200, "修改成功！"));
                return;
            }
        }else{
	        String fileName=picFile.getFileName();  
	        String mimeType=picFile.getContentType();//得到 上传文件的MIME类型:audio/mpeg  
	          
	        if(!"image/gif".equals(mimeType) && !"image/jpeg".equals(mimeType)   
	                &&!"image/x-png".equals(mimeType) &&!"image/png".equals(mimeType)){  
	            renderJson(ResultMessage.build(400, "上传文件类型错误！！"));
	            return;  
	        }  
	        String realpath = getSession().getServletContext().getRealPath(path);  
	        String filepath=base+"/"+path+"/"+fileName.trim();   
	        picFile.getFile().renameTo(new File(realpath+"/"+fileName));  
	        
	        String asql5 = "update stt_hospital set hp_name=?,hp_code=?,hp_address=?,hp_province=?,hp_city=?,hp_logourl=? where hp_id=?";
			int f = Db.update(asql5,hospitalname,hospitalcode,hospitaladdress,province,city,filepath,hospitalid);
	        
	        //最终代码还需要根据登录功能稍做调整
			
	        if(f>0){
	        	setAttr("path",filepath);  
	            setAttr("biaoti","systemmgmt");
	    		renderJson(ResultMessage.build(200, "修改成功！"));
                return;
	        }
        }
	}
    
	public void dataDictionary() {
		render("dataDictionaryList.html");
	}
	
	public void addDataDictionary() {
		render("dataDictionary.html");
	}
	
	
	public void queryDataDictionary() {
		ResultMessage result = new ResultMessage();
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		String desc = getPara("desc");
		Page<Record> ls = null;
		StringBuffer sb = new StringBuffer("from stt_datadictionary ");
		if(desc != null){
			sb.append(" where descr like '%"+desc+"%'");
		}
		sb.append("order by sort,descr,num");
	   	ls = Db.paginate(page,rows, 
	   				"select * ",
	   				 sb.toString());
		result.setStatus(200);
		result.setTotal(ls.getTotalRow());
		result.setRows(ls.getList());
		renderJson(result);
		
		return;
	}
	
	public void addDataDictionaryConfirm(){
		ResultMessage result = new ResultMessage();
		
		String name = getPara("name");
        String val = getPara("val");
        String sort = getPara("sort");
        String descr = getPara("descr");
        String note = getPara("note");
        String num = getPara("num");
        String addr= getPara("addr");
        String enable=getPara("enable");

    	String asql1 = "insert into stt_datadictionary (id,name,val,sort,descr,note,num,addr,enable)"
				+" values(?,?,?,?,?,?,?,?,?)";
		int a;
		try {
			a = Db.update(asql1,IdWorker.nextId(),name,val,sort,descr,note,num,addr,enable);
		} catch (Exception e) {
			a = 0;
		}
		
		if(a>0){
			result.setStatus(200);
			result.setMessage("保存成功");;
		}else{
			result.setStatus(400);
			result.setMessage("保存失败");;
		}
       
        renderJson(result);
		return;
	}
	
	public void updateDataDictionary() {
		
		String dataDictionaryId = getPara("dataDictionaryId");
		Record r = Db.findFirst(" select * from stt_datadictionary where id = ? ",dataDictionaryId);
		
		setAttr("dataDictionary",r);
		setAttr("enable",r.getStr("enable"));
		render("updateDataDictionary.html");
	}
	
	public void updateDataDictionaryConfirm(){
		ResultMessage result = new ResultMessage();
		
		String id = getPara("id");
		String name = getPara("name");
        String val = getPara("val");
        String sort = getPara("sort");
        String descr = getPara("descr");
        String note = getPara("note");
        String num = getPara("num");
        String addr= getPara("addr");
        String enable=getPara("enable");
    	String asql1 = " update stt_datadictionary set name = ?,val = ?,sort = ?,descr = ?,note = ?,num =?,addr=?,enable=? where id = ? ";
		int a;
		try {
			a = Db.update(asql1,name,val,sort,descr,note,num,addr,enable,id);
		} catch (Exception e) {
			a = 0;
		}
		
		if(a>0){
			result.setStatus(200);
			result.setMessage("更新成功!");;
		}else{
			result.setStatus(400);
			result.setMessage("更新失败!");;
		}
       
        renderJson(result);
		return;
	}
	
	
	public void deleteDataDictionary(){
		ResultMessage result = new ResultMessage();
		
		String dataDictionaryId = getPara("dataDictionaryId");
		
    	String asql1 = "delete from stt_datadictionary where id = ? ";
		int a = Db.update(asql1,dataDictionaryId);
		
		if(a>0){
			result.setStatus(200);
			result.setMessage("更新成功!");;
		}else{
			result.setStatus(400);
			result.setMessage("数据库异常!");;
		}
       
        renderJson(result);
		return;
	}
    /**  移动终端管理   begin  */
	
	public void deviceList() {
		render("deviceList.html");
	}
	
	public void editDevice() {
		String id = getPara("id");
		if(StrUtil.isNotBlank(id)){
			Record l = Db.findById("stt_device", id);
			setAttr("device", l);
		}
		setAttr("id",id);
		render("editDevice.html");
	}
	
	public void queryDevice() {
		ResultMessage result = new ResultMessage();
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		
		Page<Record> ls = null;
		
	   	ls = Db.paginate(page,rows, 
	   				"select id,uniqueid,device_type,owener, case status when '1' then '启用' else '禁用' end as `status`,creat_time ",
	   				"from stt_device order by creat_time ");
		result.setStatus(200);
		result.setTotal(ls.getTotalRow());
		result.setRows(ls.getList());
		renderJson(result);
		return;
	}
	
	public void saveDevice(){
		String id = getPara("id");
		String uniqueid = getPara("uniqueid");
        String device_type = getPara("device_type");
        String owener = getPara("owener");
        String status = getPara("status");
        int i = 0;
		if(StrUtil.isBlank(id)){
			id = IdWorker.nextId();
			i = Db.update(" insert into stt_device(id,uniqueid,device_type,owener, status,creat_time ) values(?,?,?,?,?,?)",
					id,uniqueid,device_type,owener,status,DateUtil.now());
		}else{
			i = Db.update(" update stt_device set uniqueid = ?,device_type =?,owener =?, status=? where id=?",
					uniqueid,device_type,owener,status,id);
		}
		if(i>0){
			renderJson(new ResultMessage(200, "操作成功"));
		}else{
			renderJson(new ResultMessage(400, "操作失败"));
		}
	}
	
	public void deleteDevice(){
		String id = getPara("id");
		boolean i = Db.deleteById("stt_device", id);
		if(i){
			renderJson(new ResultMessage(200, "操作成功"));
		}else{
			renderJson(new ResultMessage(400, "操作失败"));
		}
	}
	
	/**  移动终端管理   end  */
	
	
	 /**  病区管理  begin  */
	
		public void wardList() {
			render("wardList.html");
		}
		
		public void editWard() {
			String id = getPara("id");
			if(StrUtil.isNotBlank(id)){
				Record l = Db.findById("stt_ward", id);
				setAttr("ward", l);
			}
			setAttr("id",id);
			render("editWard.html");
		}
		
		public void queryWard() {
			ResultMessage result = new ResultMessage();
			int page = getParaToInt("page");
			int rows = getParaToInt("rows");
			
			Page<Record> ls = null;
			
		   	ls = Db.paginate(page,rows, 
		   				"select * ",
		   				"from stt_ward order by creat_time ");
			result.setStatus(200);
			result.setTotal(ls.getTotalRow());
			result.setRows(ls.getList());
			renderJson(result);
			return;
		}
		
	public void saveWard() {
		ResultMessage result = new ResultMessage();
		String id = getPara("id");
		String name = getPara("name");
		String system = getPara("system");
		int departbednum = getParaToInt("departbednum");
		int addbednum = getParaToInt("addbednum");
		int pingcnum = getParaToInt("pingcnum");
		String address = getPara("address");
       
		int i = 0;
		String bedname1 = "";
		String bedname2 = "";
		if(system!=null && "留观".equals(system)){
			bedname1 = "留观";
			bedname2 = "床";
		}
		try {
			if (StrUtil.isBlank(id)) {
				String asq3 = "select stt_ward.name from stt_ward where stt_ward.name=?";
				Record re124 = Db.findFirst(asq3,name);
		        if(re124==null){
		        	id = IdWorker.nextId();
					i = Db.update(
							" insert into stt_ward(id,name,system,departbednum,addbednum,pingcnum,address,creat_time) values(?,?,?,?,?,?,?,?)",
							id, name, system, departbednum, addbednum, pingcnum,address,
							DateUtil.now());
		    		if(i>0){
		    			if(departbednum!=0){
		    				for(int i2=1;i2<=departbednum;i2++){
		    					String asql2 = "insert into stt_departbed(id,depart_id,bed_num,status,addbedsign) values(?,?,?,?,?)";
		    					Db.update(asql2,IdWorker.nextId(),id,bedname1+i2+bedname2,"空闲","0");
		    				}
		    			}
		    			result.setStatus(200);
		    		}else{
		    			result.setStatus(400);
		    			result.setMessage("数据库异常！！");;
		    		}
		        }else{
		        	result.setStatus(400);
					result.setMessage("新增失败，病区名称已被占用！！");
		        }
		        
			} else {
				
				int bednum=0;
				int addnum=0;
				int pcnum = 0;
				Record re3 = Db.findFirst("select stt_ward.departbednum as departbednum,stt_ward.addbednum as addbednum,stt_ward.pingcnum as pingcnum from stt_ward where stt_ward.id=?",id);
				if(re3==null){
					result.setStatus(400);
					result.setMessage("修改数据异常，修改失败！！");
					renderJson(result);
					return;
				}
				
				String asq3 = "select stt_ward.id as id from stt_ward where stt_ward.name=?";
				Record re124 = Db.findFirst(asq3,name);
				if(re124!=null && !re124.get("id").equals(id)){
					if(!(id!=null && id.equals(re124.get("id")+""))){
						result.setStatus(400);
						result.setMessage("修改失败，病区名称已被占用！！");
						renderJson(result);
						return;
					}
				}

				if(departbednum!=0){
					bednum=departbednum;
				}else{
					Record re1 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='0'",id);
					if(re1!= null && re1.getInt("count(id)")>0){
						result.setStatus(400);
						result.setMessage("该床位有被使用，不能废弃此床位！！");
						renderJson(result);
						return;
					}
				}
		        if(addbednum!=0){
					addnum=addbednum;
				}else{
					Record re1 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='1'",id);
					if(re1!= null && re1.getInt("count(id)")>0){
						result.setStatus(400);
						result.setMessage("该加床位有被使用，不能废弃此加床！！");
						renderJson(result);
						return;
					}
				}
		       
		        if(pingcnum!=0){
					pcnum=pingcnum;
				}else{
					Record re1 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='2'",id);
					if(re1!= null && re1.getInt("count(id)")>0){
						result.setStatus(400);
						result.setMessage("该平车位有被使用，不能废弃此加床！！");
						renderJson(result);
						return;
					}
				}
		        
		        Record re11 = Db.findFirst("select count(id) as departbednum from stt_departbed where stt_departbed.depart_id=? and stt_departbed.addbedsign='0'",id);
		        Record re12 = Db.findFirst("select count(id) as addbednum from stt_departbed where stt_departbed.depart_id=? and stt_departbed.addbedsign='1'",id);
		        Record re13 = Db.findFirst("select count(id) as pingcnum from stt_departbed where stt_departbed.depart_id=? and stt_departbed.addbedsign='2'",id);
				int realdepartbednum = re11.getInt("departbednum");
				int realaddbednum = re12.getInt("addbednum");
				int realpingcnum = re13.getInt("pingcnum");
		        if(re3!=null && realdepartbednum!=0){
					if(bednum<realdepartbednum){
						Record re4 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='0'",id);
						if(bednum<re4.getInt("count(id)")){
							result.setStatus(400);
							result.setMessage("该床位数必须大于已经使用的床位数！！");
							renderJson(result);
							return;
						}else{
							int b = realdepartbednum-bednum;
							List<Record> ls = Db.find("select stt_departbed.id as id from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='空闲' "
									+ "and stt_departbed.addbedsign='0' order by stt_departbed.id desc limit "+b,id);
							String debedsql = "delete from stt_departbed where stt_departbed.id=?";
							for(int i2=0;i2<ls.size();i2++){
								Db.update(debedsql,ls.get(i2).get("id"));
							}
						}
					}else if(bednum>realdepartbednum){
						int b = bednum-realdepartbednum;
						Record re4 = Db.findFirst("select stt_departbed.bed_num as bednum from stt_departbed where stt_departbed.depart_id=? and stt_departbed.addbedsign='0' order by stt_departbed.id desc",id);
						if(re4!=null){
							String aab = re4.get("bednum");
							//if(aab.length()>3){
								//String aac = aab.substring(2, aab.length()-1);
								String aac = aab.replaceAll("[^0-9]", "");  
								int aad = Integer.parseInt(aac);
								for(int i2=1;i2<=b;i2++){
									String asql2 = "insert into stt_departbed(id,depart_id,bed_num,status,addbedsign) values(?,?,?,?,?)";
									Db.update(asql2,IdWorker.nextId(),id,bedname1+(aad+i2)+bedname2,"空闲","0");
								}
							//}	
						}
					}
				}else{
					for(int i2=1;i2<=bednum;i2++){
						String asql2 = "insert into stt_departbed(id,depart_id,bed_num,status,addbedsign) values(?,?,?,?,?)";
						Db.update(asql2,IdWorker.nextId(),id,bedname1+i2+bedname2,"空闲","0");
					}
				}

				
				if(re3!=null && realaddbednum!=0){
					if(addnum<realaddbednum){
						Record re4 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='1'",id);
						if(addnum<re4.getInt("count(id)")){
							result.setStatus(400);
							result.setMessage("该加床数必须大于已经使用的加床数！！");
							renderJson(result);
							return;
						}else{
							int b = realaddbednum-addnum;
							List<Record> ls = Db.find("select stt_departbed.id as id from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='空闲' and stt_departbed.addbedsign='1' order by stt_departbed.id desc limit "+b,id);		
							String debedsql = "delete from stt_departbed where stt_departbed.id=?";
							for(int i2=0;i2<ls.size();i2++){
								Db.update(debedsql,ls.get(i2).get("id"));
							}
						}
					}
				}
				if(re3!=null && realpingcnum!=0){
					if(pcnum<realpingcnum){
						Record re4 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中' and stt_departbed.addbedsign='2'",id);
						if(addnum<re4.getInt("count(id)")){
							result.setStatus(400);
							result.setMessage("该平车数必须大于已经使用的平车数！！");
							renderJson(result);
							return;
						}else{
							int b = realpingcnum-pcnum;
							List<Record> ls = Db.find("select stt_departbed.id as id from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='空闲' and stt_departbed.addbedsign='2' order by stt_departbed.id desc limit "+b,id);		
							String debedsql = "delete from stt_departbed where stt_departbed.id=?";
							for(int i2=0;i2<ls.size();i2++){
								Db.update(debedsql,ls.get(i2).get("id"));
							}
						}
					}
				}
				
				i = Db.update(
						" update stt_ward set name = ?,system =?,departbednum =?, addbednum=?,pingcnum=?,address=? where id=?",
						name, system, departbednum, addbednum, pingcnum,address, id);
			}
			if (i > 0) {
				renderJson(new ResultMessage(200, "操作成功"));
			} else {
				renderJson(new ResultMessage(400, "操作失败"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			renderJson(new ResultMessage(400, "操作失败"));
		}

	}
		
		public void deleteWard(){
			String id = getPara("id");
			
			Record re1 = Db.findFirst("select count(id) from stt_departbed where stt_departbed.depart_id=? and stt_departbed.status='使用中'",id);
			if(re1!= null && re1.getInt("count(id)")>0){
				renderJson(new ResultMessage(400, "该病区有床位被使用，请清除床位患者后操作"));
				return;
			}else{
				Db.update("delete from stt_departbed where stt_departbed.depart_id=?",id);
			}
			boolean i = Db.deleteById("stt_ward", id);
			if(i){
				renderJson(new ResultMessage(200, "操作成功"));
			}else{
				renderJson(new ResultMessage(400, "操作失败"));
			}
		}
		
		/**  病区管理   end  */
		
		/** 留观设置  begin */
	    public void obsSetPre() {
			
			List<Record> ls=Db.find("select stt_obsset.ys_id as ysid,stt_obsset.grade_set as gradeset,stt_obsset.grade_name as gradename,stt_obsset.grade_color as gradecolor,"
					+ "stt_obsset.grade_overtime as gradeovertime,stt_obsset.warn_patients as warnpatients from stt_obsset");
		
				setAttr("gradeset", ls.get(0).get("gradeset"));
				setAttr("warnpatients", ls.get(0).get("warnpatients"));
				for(int i=0;i<ls.size();i++){
					setAttr("ysid"+(i+1), ls.get(i).get("ysid"));
					setAttr("gradename"+(i+1), ls.get(i).get("gradename"));
					setAttr("gradecolor"+(i+1), ls.get(i).get("gradecolor"));
					setAttr("gradeovertime"+(i+1), ls.get(i).get("gradeovertime"));
				}
				List<Record> ls2 = null;
				ls2=Db.find("select * from stt_pjb where system=? and status='1' order by sort","留观");
				if(ls2.size()>0){
					
					JSONArray json = new JSONArray();
					for(int i=0;i<ls2.size();i++){
						JSONObject jo = new JSONObject();
						jo.put("tyid", ls2.get(i).get("ty_id"));
						jo.put("tyname", ls2.get(i).get("ty_name"));
						json.add(jo);
					}
					setAttr("pjblist",json);
				}
				List<Record> ls3=Db.find("select role_name from stt_role where lgtj='1'");
				StringBuffer rolenames = new StringBuffer() ;
				for(int i=0;i<ls3.size();i++){
					rolenames.append(ls3.get(i).getStr("role_name"));
					rolenames.append(" ");
				}
				String rolename =  rolenames.toString();
				if(rolename.length()>0) rolename =rolename.substring(0, rolename.length()-1);
				setAttr("rolename",rolename);
			render("obs-set-index.html");
		}
		
	    
		public void obsSet() {
			
			List<Record> ls=Db.find("select stt_obsset.ys_id as ysid,stt_obsset.grade_set as gradeset,stt_obsset.grade_name as gradename,stt_obsset.grade_color as gradecolor,"
					+ "stt_obsset.grade_overtime as gradeovertime,stt_obsset.warn_patients as warnpatients from stt_obsset");
			List<Record> ls2=Db.find("select stt_obspjb.ty_id as tyid,stt_obspjb.ty_name as tyname,stt_obspjbright.right_type as righttype from stt_obspjbright,"
					+ "stt_obspjb where stt_obspjb.ty_id=stt_obspjbright.ty_id and stt_obspjbright.status=1 and stt_obspjb.status=1");
			if(ls.size()>0 && ls2.size()>0){
				setAttr("gradeset", ls.get(0).get("gradeset"));
				setAttr("warnpatients", ls.get(0).get("warnpatients"));
				for(int i=0;i<ls.size();i++){
					setAttr("ysid"+(i+1), ls.get(i).get("ysid"));
					setAttr("gradename"+(i+1), ls.get(i).get("gradename"));
					setAttr("gradecolor"+(i+1), ls.get(i).get("gradecolor"));
					setAttr("gradeovertime"+(i+1), ls.get(i).get("gradeovertime"));
				}
				JSONArray json = new JSONArray();
				for(int i=0;i<ls2.size();i++){
					JSONObject jo = new JSONObject();
					jo.put("tyid", ls2.get(i).get("tyid"));
					jo.put("tyname", ls2.get(i).get("tyname"));
					jo.put("righttype", ls2.get(i).get("righttype"));
					json.add(jo);
				}
				setAttr("pjblist",json);
			}
			render("obs-set.html");
		}
		
		
		public void obssetconfirm(){
			ResultMessage result = new ResultMessage();
			String grade = getPara("grade");
			String ysid1 = getPara("paixu1");
			String gradename1 = getPara("gradename1");
			String gradecolor1 = getPara("gradecolor1");
			String gradeovertime1 = "10";
			String ysid2 = getPara("paixu2");
			String gradename2 = getPara("gradename2");
			String gradecolor2 = getPara("gradecolor2");
			String gradeovertime2 = "10";
			String ysid3 = getPara("paixu3");
			String gradename3 = getPara("gradename3");
			String gradecolor3 = getPara("gradecolor3");
			String gradeovertime3 = "10";
			String ysid4 = getPara("paixu4");
			String gradename4 = getPara("gradename4");
			String gradecolor4 = getPara("gradecolor4");
			String gradeovertime4 = "10";
			String ysid5 = getPara("paixu5");
			String gradename5 = getPara("gradename5");
			String gradecolor5 = getPara("gradecolor5");
			String gradeovertime5 = "10";
//			String mainfenjiid = getPara("mainfenjiid");
			String warnpatients = "0";
//			String otherfenjilist = getPara("otherfenjilist");
			/*
			JSONArray otherfenjilist1 = JSONUtil.parseArray(otherfenjilist);
			String asql1 = "update stt_obspjbright set right_type=2,status=0";
			int g = Db.update(asql1);
			String asql3 = "update stt_obspjbright set right_type=1,status=1 where ty_id=?";
			int h = Db.update(asql3,mainfenjiid);
			String asql4 = "update stt_obspjbright set status=1 where ty_id=?";
			String otherfenji = "";
			for(int i=0;i<otherfenjilist1.size();i++){
				int tyid = Integer.parseInt(otherfenjilist1.getJSONObject(i).get("id")+"");
				if(i==0){
				otherfenji=tyid+otherfenji;
				}else{
					otherfenji=otherfenji+","+tyid;
				}
				Db.update(asql4,tyid);
			}
			*/
			String asql5 = "update stt_obsset set grade_set=?,warn_patients=?,classify_main_id=?,classify_minor_id=?";
			int f = Db.update(asql5,grade,warnpatients,0,0);
			String asql2 = "update stt_obsset set grade_name=?,grade_color=?,grade_overtime=?,status=1"
					+" where ys_id = ?";
			int a = Db.update(asql2,gradename1,gradecolor1,gradeovertime1,ysid1);
			int b = Db.update(asql2,gradename2,gradecolor2,gradeovertime2,ysid2);
			int c = Db.update(asql2,gradename3,gradecolor3,gradeovertime3,ysid3);
			int d = Db.update(asql2,gradename4,gradecolor4,gradeovertime4,ysid4);
			int e=0;
			if(!grade.equals("4")){
			    e = Db.update(asql2,gradename5,gradecolor5,gradeovertime5,ysid5);
			}else{
			    e = Db.update("update stt_obsset set status=0 where ys_id = ?",ysid5);
			}
			if(a>0 && b>0 && c>0 && d>0 && e>0 && f>0 ){
				result.setStatus(200);
			}else{
				result.setStatus(400);
				result.setMessage("数据库访问异常");
			}
			renderJson(result);
			return;
		}
		
		/**  留观设置 end */
		
		/** 抢救设置  begin */
	    public void rescueSetPre() {
	    	
	    	List<Record> ls = null;
			ls=Db.find("select * from stt_pjb where system=? and status='1' order by sort","抢救");
			if(ls.size()>0){
				
				JSONArray json = new JSONArray();
				for(int i=0;i<ls.size();i++){
					JSONObject jo = new JSONObject();
					jo.put("tyid", ls.get(i).get("ty_id"));
					jo.put("tyname", ls.get(i).get("ty_name"));
					json.add(jo);
				}
				setAttr("pjblist",json);
			}
			List<Record> ls3=Db.find("select role_name from stt_role where qjtj='1'");
			StringBuffer rolenames = new StringBuffer() ;
			for(int i=0;i<ls3.size();i++){
				rolenames.append(ls3.get(i).getStr("role_name"));
				rolenames.append(" ");
			}
			String rolename =  rolenames.toString();
			if(rolename.length()>0) rolename =rolename.substring(0, rolename.length()-1);
			setAttr("rolename",rolename);
			render("rescue-set-index.html");
		}
	    
	    
	    public void rescueSetpjbMain(){
			ResultMessage result = new ResultMessage();
			
			String mainfenjiid = getPara("mainfenjiid");

			String asql2 = "update stt_respjbright set right_type=2";
			String asql3 = "update stt_respjbright set right_type=1,status=1 where ty_id=?";
			int a = Db.update(asql2);
			int b = Db.update(asql3,mainfenjiid);
			if(a>0 && b>0 ){
				result.setStatus(200);
			}else{
				result.setStatus(400);
				result.setMessage("数据库访问异常");
			}
			renderJson(result);
			return;
		}
	    
	    public void rescueSetpjbOther(){
			ResultMessage result = new ResultMessage();
			try {
				
			String otherfenjilist = getPara("otherfenjilist");
			JSONArray otherfenjilist1 = JSONUtil.parseArray(otherfenjilist);
			String asql3 = "update stt_respjbright set status=0 where right_type=2";
			Db.update(asql3);
			String asql4 = "update stt_respjbright set status=1 where ty_id=?";
			String otherfenji = "";
			for(int i=0;i<otherfenjilist1.size();i++){
				int tyid = Integer.parseInt(otherfenjilist1.getJSONObject(i).get("id")+"");
				if(i==0){
				otherfenji=tyid+otherfenji;
				}else{
					otherfenji=otherfenji+","+tyid;
				}
				Db.update(asql4,tyid);
			}
			
				result.setStatus(200);
			} catch (Exception e) {
				// TODO: handle exception
				result.setStatus(400);
				result.setMessage("数据库访问异常");
			}
			renderJson(result);
		}
	    
	    
	    
        public void queryAlldirectionconfig() {
        	String m_id = getPara("m_id");
        	String typedescr = getPara("typedescr");
        	/*List<Record> r = Db.find(" select id,parentid,name,type,typedescr,descr,m_id,sort,status"
        			+ " from trt_leavedirection_dictionary where m_id = ? and typedescr = ? order by id ",m_id,typedescr);*/
        	List<Record> r = Db.find(" select id,parentid,name,type,typedescr,descr,bz,jjd,bq,m_id,status"
        			+ " from trt_leavedirection_dictionary2 where m_id = ? and typedescr = ? order by id ",m_id,typedescr);
    		renderJson(ResultMessage.build(200, "查询成功",r.size(),r));
		}
        
        //为防产品以后改需求，trt_leavedirection_dictionary表保留
        /*public void savedirectionconfig() {
        	String qxjsonlist = getPara("qxjsonlist");
    		//Db.batchSave(tableName, recordList, batchSize)
        	Db.update("delete from trt_leavedirection_dictionary where status = '0'");
    		boolean abc = true;
            if(StrUtil.isNotBlank(qxjsonlist)){
    			if(JSONUtil.isJson(qxjsonlist)){
    				JSONArray qxjslist = JSONUtil.parseArray(qxjsonlist);
    			    for(int i = 0;i<qxjslist.size();i++){
    			    	String id = "";
    			    	String d_id = qxjslist.getJSONObject(i).get("id")+"";
    			    	if(StrUtil.isNotBlank(d_id)){
    			    		id = d_id;
    			    	}else{
    			    		IdWorker.nextId();
    			    	}
    			    	String name = qxjslist.getJSONObject(i).get("name")+"";
    			    	String qx = qxjslist.getJSONObject(i).get("qx")+"";
    			    	String ejxx = qxjslist.getJSONObject(i).get("ejxx")+"";
    			    	String bz = qxjslist.getJSONObject(i).get("bz")+"";
    			    	String jjd = qxjslist.getJSONObject(i).get("jjd")+"";
    			    	String bq = qxjslist.getJSONObject(i).get("bq")+"";
    			    	Record re = new Record();
    			    	re.set("id", id);
    			    	re.set("parentid", value);
    			    	re.set("name", value);
    			    	re.set("type", value);
    			    	re.set("typedescr", value);
    			    	re.set("descr", value);
    			    	re.set("sort", value);
    			    	re.set("status", value);
    			    }
    			}
            }
            if(abc){
    			renderJson(ResultMessage.build(200, "新增成功"));
    		}else{
    			renderJson(ResultMessage.build(200, "无药物数据需要新增！！"));
    		}
    		return;
		}*/
        //按目前产品需求做
        public void savedirectionconfig() {
        	String qxjsonlist = getPara("qxjsonlist");
        	String m_id = getPara("m_id");
        	Db.update("delete from trt_leavedirection_dictionary2 where status = '0' and m_id="+m_id);
    		boolean abc = true;
    		List<String> ls1 = new ArrayList<String>();
    		List<String> ls2 = new ArrayList<String>();
            if(StrUtil.isNotBlank(qxjsonlist)){
    			if(JSONUtil.isJson(qxjsonlist)){
    				JSONArray qxjslist = JSONUtil.parseArray(qxjsonlist);
    				List<Record> recordList = new ArrayList<Record>();
    			    for(int i = 0;i<qxjslist.size();i++){
    			    	String id = IdWorker.nextId();
    			    	String parentid = "";
    			    	String qx = qxjslist.getJSONObject(i).get("qx")+"";
    			    	String ejxx = qxjslist.getJSONObject(i).get("ejxx")+"";
    			    	String bz = qxjslist.getJSONObject(i).get("bz")+"";
    			    	String jjd = qxjslist.getJSONObject(i).get("jjd")+"";
    			    	String bq = qxjslist.getJSONObject(i).get("bq")+"";
    			    	
    			    	String name = qxjslist.getJSONObject(i).get("name")+"";
    			    	if(!ls1.contains(name)){
    			    		parentid = IdWorker.nextId();
    			    		ls1.add(name);
    			    		ls2.add(parentid);
    			    	}else{
    			    		int a = ls1.indexOf(name);
    			    		parentid = ls2.get(a);
    			    	}
    			    	
    			    	if(StrUtil.isNotBlank(qx)){
    			    		Record re = new Record();
    			    		re.set("id", parentid);
        			    	re.set("parentid", "0");
        			    	re.set("name", qx);
        			    	re.set("type", "dre");
        			    	re.set("typedescr", "去向");
        			    	re.set("descr", qx);
        			    	if(StrUtil.isBlank(ejxx)){
        			    		re.set("bz", bz);
            			    	re.set("jjd", jjd);
            			    	re.set("bq", bq);
        			    	}else{
        			    		Record re2 = new Record();
        			    		re2.set("id", id);
            			    	re2.set("parentid", parentid);
            			    	re2.set("name", ejxx);
            			    	re2.set("type", "redio");
            			    	re2.set("typedescr", "去向");
            			    	re2.set("descr", ejxx);
            			    	re2.set("bz", bz);
            			    	re2.set("jjd", jjd);
            			    	re2.set("bq", bq);
            			    	re2.set("m_id", m_id);
            			    	re2.set("status", "0");
            			    	recordList.add(re2);
        			    		
            			    	re.set("bz", "0");
            			    	re.set("jjd", "0");
            			    	re.set("bq", "0");
        			    	}
        			    	re.set("m_id", m_id);
        			    	re.set("status", "0");
        			    	recordList.add(re);
    			    	}else{
        			    	Record re = new Record();
    			    		re.set("id", id);
        			    	re.set("parentid", parentid);
        			    	re.set("name", ejxx);
        			    	re.set("type", "redio");
        			    	re.set("typedescr", "去向");
        			    	re.set("descr", ejxx);
        			    	re.set("bz", bz);
        			    	re.set("jjd", jjd);
        			    	re.set("bq", bq);
        			    	re.set("m_id", m_id);
        			    	re.set("status", "0");
        			    	recordList.add(re);
    			    	}
    			    }
    			    if(recordList.size()>0){
    			         Db.batchSave("trt_leavedirection_dictionary2", recordList, recordList.size());
    			    }
    			}
            }
            if(abc){
    			renderJson(ResultMessage.build(200, "新增成功"));
    		}else{
    			renderJson(ResultMessage.build(200, "无药物数据需要新增！！"));
    		}
    		return;
		}
        
	    /**  抢救设置 end */
	    public void queryallstation(){
	    	List<Record> r = Db.find(" select tr_id as id,right_name as name from stt_right where parent_tr_id = 0 order by tr_id ");
	    	renderJson(ResultMessage.build(200, "查询成功",r.size(),r));
	    	return;
	    }
	    
	    /** 就诊卡号规则设置 begin */
	    //查询就诊卡规则
		public void cardnumReg() {
			Record l = Db.findById("stt_cardnum_reg", "1");
			setAttr("cardnumreg", l);
			render("cardnumReg.html");
		}
		//保存就诊卡规则
		public void savecardnumReg() {
			String length = getPara("length");
			String reg = getPara("reg");
			try{
				Record record = new Record();
				record.set("id", "1");
				record.set("reg", reg);
				record.set("length", length);
				Db.update("stt_cardnum_reg", "id", record);
				renderJson(ResultMessage.build(200, "保存成功"));
			}catch(Exception e){
				e.printStackTrace();
				renderJson(ResultMessage.build(400, e.getMessage()));
			}
			;
		}
		/** 就诊卡号规则设置 end */
		
		
		//保存就诊卡规则
	public void updateProductStatus() {
		String id = getPara("id");
		String state = getPara("state");
		try {
			Record record = new Record();
			record.set("ty_id", id);
			record.set("ty_name", state);
			Db.update("stt_yjfzpjb", "ty_id", record);
			renderJson(ResultMessage.build(200, "保存成功"));
		} catch (Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	}
	
	//保存分诊调级权限
	public void savefztjRoleids() {
		String roleids = getPara("roleids");
		String system = getPara("system");
		try {
			
			String sql1 = "";
			String sql2 = "";
			if(system.equalsIgnoreCase("分诊")){
				sql1 = "update stt_role set fztj='0'";
				sql2 = "update stt_role set fztj='1' where tr_id=?";
			}else if(system.equalsIgnoreCase("抢救")){
				sql1 = "update stt_role set qjtj='0'";
				sql2 = "update stt_role set qjtj='1' where tr_id=?";
			}else if(system.equalsIgnoreCase("留观")){
				sql1 = "update stt_role set lgtj='0'";
				sql2 = "update stt_role set lgtj='1' where tr_id=?";
			}
			String[] ids = roleids.split(",");
			Db.update(sql1);
			for (String id : ids) {
				Db.update(sql2, id);
			}
			renderJson(ResultMessage.build(200, "保存成功"));
		} catch (Exception e) {
			e.printStackTrace();
			renderJson(ResultMessage.build(400, e.getMessage()));
		}
	}
	
	//保存帮助说明
	public void saveHelp() {
		String m_id = getPara("m_id");
		String version = getPara("version");
		List<Record> recordList = new ArrayList<Record>();
		String[] list = version.split("\n------------------------------------------------------------");
		if(StrUtil.isNotBlank(version)){
			for (int i = 0; i < list.length; i++) {
				String string = list[i];
				Record re = new Record();
	    		re.set("id", IdWorker.nextId());
		    	re.set("state", 0);
		    	re.set("m_id", m_id);
		    	re.set("content", string);
		    	re.set("create_time", string.substring(string.indexOf("发布日期")+5, string.indexOf("发布日期")+15));
		    	recordList.add(re);
			}
		}
		
		String update = getPara("update");
		String check = getPara("check");
		//1:更新说明(弹窗),2:更新说明(不弹窗)
		String updateState ="1";
		if(!check.equals("true")){
			updateState="2";
		}
		if(StrUtil.isNotBlank(update)){
			String updateDate = update.substring(update.indexOf("发布日期")+5, update.indexOf("发布日期")+15);
			Record record = new Record();
			record.set("id", IdWorker.nextId());
			record.set("state", updateState);
			record.set("content", update);
			record.set("create_time", updateDate);
			record.set("m_id", m_id);
			recordList.add(record);
		}
		Db.update("DELETE from stt_version_show where m_id=?",m_id);
		if(recordList.size()>0){
	         Db.batchSave("stt_version_show", recordList, recordList.size());
	    }
		renderJson(ResultMessage.build(200, "保存成功"));
	}
	
	// 查询 必填项配置表
	public void queryVersionList() {
		String m_id = getPara("m_id");
		ResultMessage result = new ResultMessage();
		List<Record> ls = null;
		ls = Db.find("SELECT id,state,content,create_time from stt_version_show where m_id=?",m_id);
		result.setStatus(200);
		result.setRows(ls);
		renderJson(result);
		return;
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
	
	public void superadmin() {
		render("super.html");
	}
}
