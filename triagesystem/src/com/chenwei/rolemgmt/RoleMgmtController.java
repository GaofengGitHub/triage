package com.chenwei.rolemgmt;

import java.util.List;

import org.apache.log4j.Logger;

import com.chenwei.jfinal.ResultMessage;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class RoleMgmtController extends Controller {
	private static Logger log = Logger.getLogger(RoleMgmtController.class);

	public void index() {
		setAttr("biaoti","rolemgmt");
		render("main.html");
	}
	
	public void usermgmt() {
		render("rolemgmt-index.html");
	}
	
	public void professionidmgmt() {
		render("system-identity.html");
	}
	
	public void modulelimitsmgmt() {
		render("modulelimitsmgmt.html");
	}
	
	public void queryRole() {
		ResultMessage result = new ResultMessage();
		String description = getPara("description");
		List<Record> ls2 = null;
		if(description==null || description==""){
		ls2=Db.find("select stt_role.tr_id as roleid,stt_role.parent_tr_id as parentid,stt_role.role_name as rolename,stt_role.description as description,stt_role.fztj as fztj,stt_role.qjtj as qjtj,stt_role.lgtj as lgtj  from stt_role"
					+ " group by stt_role.tr_id order by stt_role.tr_id");
		}else{
			ls2=Db.find("select stt_role.tr_id as roleid,stt_role.parent_tr_id as parentid,stt_role.role_name as rolename,stt_role.description as description,stt_role.fztj as fztj ,stt_role.qjtj as qjtj,stt_role.lgtj as lgtj from stt_role"
					+ " where stt_role.description=? group by stt_role.description,stt_role.tr_id order by stt_role.tr_id",description);
		}
		result.setStatus(200);
		result.setRows(ls2);
		renderJson(result);
		return;
	}
	
	public void queryJuniorRoleByCode() {
		ResultMessage result = new ResultMessage();
		String codelist = getPara("codelist");
		List<Record> ls2 = null;
		ls2=Db.find("select stt_role.tr_id as roleid,stt_role.parent_tr_id as parentid,stt_role.role_name as name from stt_role where stt_role.description = ? order by stt_role.tr_id",codelist);
		result.setStatus(200);
		result.setRows(ls2);
		renderJson(result);
		return;
	}
	
	public void addRoleByPID() {
		ResultMessage result = new ResultMessage();
		String description = getPara("description");
		String pid = getPara("pid");
		String id = getPara("id");
		Record re = Db.findFirst("select max(tr_id) from stt_role where description = ?",description);
		int big = re.getInt("max(tr_id)");
		int stid = big+1;
		int pid2 = Integer.parseInt(pid);
		Record re1 = Db.findFirst("select parent_tr_id as parentid,level from stt_role where tr_id = ?",pid2);
		String newname = getPara("newname");
		if(newname.equals("")){
			result.setMessage("角色名称不能为空！！");;
			result.setStatus(400);
			renderJson(result);
			return;
		}
		Record re3 = Db.findFirst("select stt_role.role_name from stt_role where stt_role.tr_id = ?",id);
		Record re4 = Db.findFirst("select stt_role.role_name from stt_role where stt_role.role_name = ? && stt_role.tr_id = ? && stt_role.parent_tr_id=?",newname,id,pid2);
		//角色名称不能重复 2019.2.25经产品确认
		//Record re2 = Db.findFirst("select stt_role.role_name from stt_role where stt_role.role_name = ? && stt_role.parent_tr_id=?",newname,pid2);
		Record re2 = Db.findFirst("select stt_role.role_name from stt_role where stt_role.role_name = ?",newname);
		if(re4==null){
			if(re2!=null){
				result.setMessage("角色名称重复，操作失败！！");;
				result.setStatus(400);
				renderJson(result);
				return;
			}
			String level="";
			if(re1!=null){
				if(re1.getStr("level")!=null && !"".equals(re1.getStr("level"))){
					level = Integer.parseInt(re1.getStr("level"))+1+"";
				}
			}
			if(re3!=null){
				String roleSql = "update stt_role set role_name = ? where tr_id = ?";
				int a = Db.update(roleSql,newname,id);
				if(a>0){
					result.setStatus(200);
					result.setMessage("修改成功");
					result.setRows(id);
				}else{
					result.setMessage("数据异常,修改失败！！");
					result.setStatus(400);
				}
			}else{
				String roleSql = "insert into stt_role (tr_id,parent_tr_id,role_name,creat_time,description,level) values (?,?,?,now(),?,?)";
				int a = Db.update(roleSql,stid,pid2,newname,description,level);
				if(a>0){
					result.setStatus(200);
					result.setMessage("新增成功");
					result.setRows(stid);
				}else{
					result.setMessage("数据异常,新增失败！！");
					result.setStatus(400);
				}
			}
		}else{
			result.setStatus(200);
			result.setMessage("没有修改");
			result.setRows(id);
		}
		renderJson(result);
		return;
	}
	
	public void findRoleByPID() {
		ResultMessage result = new ResultMessage();
		String pid = getPara("pid");
		String id = getPara("id");
		int pid2 = Integer.parseInt(pid);
		String newname = getPara("newname");
		if(newname.equals("")){
			result.setMessage("角色名称不能为空！！");;
			result.setStatus(400);
			renderJson(result);
			return;
		}
		Record re3 = Db.findFirst("select stt_role.role_name from stt_role where stt_role.role_name = ? && stt_role.tr_id = ? && stt_role.parent_tr_id=?",newname,id,pid2);
		if(re3==null){
			//角色名称不能重复 2019.2.25经产品确认
			Record re2 = Db.findFirst("select role_name from stt_role where role_name = ?",newname);
			if(re2!=null){
				result.setMessage("角色名称重复，操作失败！！");;
				result.setStatus(400);
			}else{
				result.setMessage("可以新增角色");;
				result.setStatus(200);
			}
		}else{
			result.setMessage("没有改变");;
			result.setStatus(200);
		}
		renderJson(result);
		return;
	}
	
	public void delRoleByID() {
		ResultMessage result = new ResultMessage();
		
		String removeid = getPara("removeid");
		if(removeid.equals("")){
			result.setStatus(400);
			result.setMessage("数据异常，操作失败！！");
		}else{
			int removeid2 = Integer.parseInt(removeid);
			String roleSql = "delete from stt_role where tr_id = ?";
			List<Record> list = null;
			list = Db.find("select tu_id from stt_userdepartrole where tr_id = ?",removeid2);
			if(list!=null && list.size()>0){
				result.setStatus(400);
				result.setMessage("存在使用此角色用户，不能删除！！");
			}else{
				int a3 = Db.update(roleSql,removeid2);
				if(a3>0){
					result.setStatus(200);
				}else{
					result.setStatus(400);
					result.setMessage("数据异常，操作失败！！");
				}
			}
		}
		renderJson(result);
		return;
	}
	//升级版本
	public void updateVersion() {
		setAttr("biaoti","rolemgmt");
		render("updateVersion.html");
	}
}
