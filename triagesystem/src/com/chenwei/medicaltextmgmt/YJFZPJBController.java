package com.chenwei.medicaltextmgmt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;

import com.chenwei.jfinal.ResultMessage;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

public class YJFZPJBController extends Controller {
private static Logger log = Logger.getLogger(YJFZPJBController.class);
	
	public void queryYJFZPJB() {
		ResultMessage result = new ResultMessage();
		String searchText = getPara("searchText");
		String page = getPara("page");
		String rows = getPara("rows");
		String sort = getPara("sort");
		String order = getPara("order");
		String orderByStr="";
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			orderByStr = " order by "+sort + " " + order;
		}
		Page<Record> ls = null;
		if(searchText==null||"".equals(searchText)){
			ls=Db.paginate(Integer.parseInt(page), Integer.parseInt(rows), "select stt_yjfzpjb.ty_id as pjbid,stt_yjfzpjb.ty_name as name,stt_yjfzpjb.ty_address as address,stt_yjfzpjb.status as status", "from stt_yjfzpjb"+orderByStr);
		}else{
	   		ls = Db.paginate(Integer.parseInt(page), Integer.parseInt(rows), 
	   				"select stt_yjfzpjb.ty_id as pjbid,stt_yjfzpjb.ty_name as name,stt_yjfzpjb.ty_address as address,stt_yjfzpjb.status as status", "from stt_yjfzpjb where stt_yjfzpjb.ty_name like '%"+searchText+"%'"+orderByStr);
	   	}	
		result.setStatus(200);
		result.setRows(ls.getList());
		result.setTotal(ls.getTotalRow());
		renderJson(result);
		
		return;
		
	}
	
	public void queryPJB() {
		ResultMessage result = new ResultMessage();
		List<Record> ls = null;
		ls=Db.find("select stt_yjfzpjb.ty_id as pjbid,stt_yjfzpjb.ty_name as name,stt_yjfzpjb.ty_address as address,stt_yjfzpjb.status as status from stt_yjfzpjb where stt_yjfzpjb.status=1 order by stt_yjfzpjb.ty_id desc");
		if(ls.size()>0){
			result.setStatus(200);
			result.setRows(ls);;
		}else{
			result.setStatus(400);
			result.setMessage("数据库查询异常");
		}
		
		renderJson(result);
		return;
	}
	
	//查询 必填项配置表
	public void queryColList() {
		ResultMessage result = new ResultMessage();
		List<Record> ls = null;
		ls=Db.find("select id,name,necessary,stt_pat_col.`group` from stt_pat_col   order by id");
		if(ls.size()>0){
			result.setStatus(200);
			result.setRows(ls);;
		}else{
			result.setStatus(400);
			result.setMessage("数据库查询异常");
		}
		
		renderJson(result);
		return;
	}
	
	
	
	
	public void queryObsPJB() {
		ResultMessage result = new ResultMessage();
		List<Record> ls = null;
		ls=Db.find("select stt_obspjb.ty_id as pjbid,stt_obspjb.ty_name as name,stt_obspjb.ty_address as address,stt_obspjb.status as status from stt_obspjb where stt_obspjb.status=1 order by stt_obspjb.ty_id desc");
		if(ls.size()>0){
			result.setStatus(200);
			result.setRows(ls);;
		}else{
			result.setStatus(400);
			result.setMessage("数据库查询异常");
		}
		
		renderJson(result);
		return;
	}
	
	/*
	 * 查询评级表设置
	 * system:哪个模块的评级表设置
	 */
	public void queryPjbList() {
		ResultMessage result = new ResultMessage();
		String system = getPara("system");
		try {
			List<Record> ls = null;
			ls=Db.find("select * from stt_pjb where system=? order by sort",system);
			result.setStatus(200);
			result.setRows(ls);
		} catch (Exception e) {
			// TODO: handle exception
			result.setStatus(400);
			result.setMessage("数据库查询异常");
		} finally{
			renderJson(result);
		}
	}
	
	/*
	 * 设置评级表
	 * system:哪个模块的评级表设置
	 */
	public void setPjbList() {
		ResultMessage result = new ResultMessage();
		String system = getPara("system");
		String fenjilist = getPara("fenjilist");
		try {
			JSONArray fenjilist1 = JSONUtil.parseArray(fenjilist);
			String asql3 = "update stt_pjb set status=0 where system=?";
			Db.update(asql3,system);
			String asql4 = "update stt_pjb set status=1,sort=?   where ty_id=?  and system=?";
			for(int i=0;i<fenjilist1.size();i++){
				String tyid = fenjilist1.getJSONObject(i).get("id").toString();
				String sort = fenjilist1.getJSONObject(i).get("sort").toString();
				Db.update(asql4,sort,tyid,system);
			}
			result.setStatus(200);
		} catch (Exception e) {
			// TODO: handle exception
			result.setStatus(400);
			result.setMessage("数据库查询异常");
		} finally{
			renderJson(result);
		}
		
	}
	
	
	
	
	/*
	 * 设置患者输入必填项
	 * 
	 */
	public void setColList() {
		ResultMessage result = new ResultMessage();
		String collist1 = getPara("collist");
		try {
			JSONArray collist = JSONUtil.parseArray(collist1);
			String sql = "update stt_pat_col set necessary=?,stt_pat_col.group=?   where id=?  ";
			for(int i=0;i<collist.size();i++){
				int id = Integer.parseInt(collist.getJSONObject(i).get("id").toString());
				String necessary = collist.getJSONObject(i).get("necessary").toString();
				String group = collist.getJSONObject(i).get("group").toString();
				Db.update(sql,necessary,group,id);
			}
			result.setStatus(200);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			result.setStatus(400);
			result.setMessage("数据库查询异常");
		} finally{
			renderJson(result);
		}
		
	}
	
	
	public void addYJFZPJB(){
		render("addyjfzpjb.html");
	}
	
    public void updateYJFZPJB() {
		
    	String pjbid = getPara("pjbid");
		Record ls = Db.findFirst("select stt_yjfzpjb.ty_id as pjbid,stt_yjfzpjb.ty_name as name,stt_yjfzpjb.ty_address as address,stt_yjfzpjb.status as status from stt_yjfzpjb where stt_yjfzpjb.ty_id=?",pjbid);
		if(ls!=null){
			setAttr("pjbid",pjbid);
			setAttr("name",ls.get("name"));
			setAttr("address",ls.get("address"));
		}
		
		render("updateyjfzpjb.html");
	}
	
	public void disablePJB() {
		ResultMessage result = new ResultMessage();
		String pjbid = getPara("pjbid");
		Record ls = null;
		Record ls2 = null;
		ls=Db.findFirst("select stt_yjfzpjb.status as status from stt_yjfzpjb where stt_yjfzpjb.ty_id = ?",pjbid);
		if(ls!=null){
			if(ls.get("status").equals("1")){
				Db.update("update stt_yjfzpjb set stt_yjfzpjb.status = ? where stt_yjfzpjb.ty_id = ?", "0",pjbid);
				Db.update("delete from stt_right where stt_right.tr_id = ?",pjbid);
				Db.update("delete from stt_right where stt_right.parent_tr_id = ?",pjbid);
				
				Db.update("delete from stt_yjfzpjbright where stt_yjfzpjbright.ty_id=?",pjbid);
			}else{
				Db.update("update stt_yjfzpjb set stt_yjfzpjb.status = ? where stt_yjfzpjb.ty_id = ?", "1",pjbid);
				ls2=Db.findFirst("select stt_yjfzpjb.ty_name as tyname,stt_yjfzpjb.ty_address as tyaddress from stt_yjfzpjb where stt_yjfzpjb.ty_id = ?",pjbid);
				Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description,url) values (?,'3003',?,2,?)",pjbid,ls2.get("tyname"),ls2.get("tyaddress"));
				Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description) values (?,?,?,2)",pjbid+"01",pjbid,"新增");
				Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description) values (?,?,?,2)",pjbid+"02",pjbid,"修改");
				Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description) values (?,?,?,2)",pjbid+"03",pjbid,"删除");
				Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description) values (?,?,?,2)",pjbid+"04",pjbid,"查询");
				
				Db.update("insert into stt_yjfzpjbright(tyr_id,ty_id,tr_id,right_type,status,sort) values (null,?,?,2,0,15)",pjbid,pjbid);
			}
			result.setStatus(200);
		}else{
			result.setStatus(400);
			result.setMessage("数据库查询异常");
		}
		
		renderJson(result);
		
		return;
	}
	
	public void addyjfzpjbconfirm() {
		ResultMessage result = new ResultMessage();
		String jfzpjbname = getPara("jfzpjbname");
		String jfzpjbaddress = getPara("jfzpjbaddress");
		Record ls = null;
		Record ls2 = null;
		ls=Db.findFirst("select stt_yjfzpjb.ty_id as tyid from stt_yjfzpjb where stt_yjfzpjb.ty_name = ?",jfzpjbname);
		if(ls==null){
			Db.update("insert into stt_yjfzpjb(ty_id,ty_name,ty_address,upd_time,status) values (null,?,?,now(),1)",jfzpjbname,jfzpjbaddress);
			ls2=Db.findFirst("select stt_yjfzpjb.ty_id as tyid from stt_yjfzpjb where stt_yjfzpjb.ty_name = ?",jfzpjbname);
			Number tyid = (Number)ls2.get("tyid");
			Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description,url) values (?,'3003',?,2,?)",tyid,jfzpjbname,jfzpjbaddress);
			Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description) values (?,?,?,2)",tyid+"01",tyid,"新增");
			Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description) values (?,?,?,2)",tyid+"02",tyid,"修改");
			Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description) values (?,?,?,2)",tyid+"03",tyid,"删除");
			Db.update("insert into stt_right(tr_id,parent_tr_id,right_name,description) values (?,?,?,2)",tyid+"04",tyid,"查询");
			
			Db.update("insert into stt_yjfzpjbright(tyr_id,ty_id,tr_id,right_type,status,sort) values (null,?,?,2,0,15)",tyid,tyid);
			
			result.setStatus(200);
		}else{
			result.setStatus(400);
			result.setMessage("新增失败，分级表名重复！！");
		}
		
		renderJson(result);
		
		return;
	}
	
	public void updyjfzpjbconfirm() {
		ResultMessage result = new ResultMessage();
		String jfzpjbid = getPara("jfzpjbid");
		String jfzpjbname = getPara("jfzpjbname");
		String jfzpjbaddress = getPara("jfzpjbaddress");
		Record ls = null;
		ls=Db.findFirst("select stt_yjfzpjb.ty_id as tyid from stt_yjfzpjb where stt_yjfzpjb.ty_name = ?",jfzpjbname);
		if(ls==null){
			Db.update("update stt_yjfzpjb set ty_name=?,ty_address=?,upd_time=now() where ty_id=?",jfzpjbname,jfzpjbaddress,jfzpjbid);
			Db.update("update stt_right set right_name=?,url=? where tr_id=?",jfzpjbname,jfzpjbaddress,jfzpjbid);
			result.setStatus(200);
		}else{
			if(jfzpjbid!=null && jfzpjbid.equals(ls.get("tyid")+"")){
				Db.update("update stt_yjfzpjb set ty_name=?,ty_address=?,upd_time=now() where ty_id=?",jfzpjbname,jfzpjbaddress,jfzpjbid);
				Db.update("update stt_right set right_name=?,url=? where tr_id=?",jfzpjbname,jfzpjbaddress,jfzpjbid);
				result.setStatus(200);
			}else{
				result.setStatus(400);
				result.setMessage("修改失败，分级表名重复！！");
			}
		}
		renderJson(result);
		return;
	}
	
	public void queryyjfjset(){
		ResultMessage result = new ResultMessage();
		List<Record> ls=Db.find("select stt_yjfjset.ys_id as ysid,stt_yjfjset.grade_set as gradeset,stt_yjfjset.grade_name as gradename,stt_yjfjset.grade_color as gradecolor,"
				+ "stt_yjfjset.grade_overtime as gradeovertime,stt_yjfjset.classify_main_id as classifymainid,stt_yjfjset.classify_minor_id as classifyminorid,"
				+ "stt_yjfjset.warn_patients as warnpatients from stt_yjfjset where stt_yjfjset.status = 1");
		if(ls.size()>0){
			/*for(int i=0;i<ls.size();i++){
				ls.get(i).get("ysid");
				
			}*/
			result.setStatus(200);
			result.setRows(ls);
		}else{
			result.setStatus(400);
			result.setMessage("数据库访问异常！！");
		}
	}
}
