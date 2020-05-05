package com.chenwei.rolemgmt;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.chenwei.jfinal.ResultMessage;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class UserMgmtController extends Controller {
	private static Logger log = Logger.getLogger(UserMgmtController.class);
	
	public void queryUser() {
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
		List<Record> ls2=null;
		if(searchText==null||"".equals(searchText)){
			ls2=Db.find("select @rowno := @rowno + 1 as rowno,c.CTCP_Name,c.CTCP_DeptCode,t1.his_user,t1.tu_id as userid,t1.username as username,t1.loginname as loginname,"
					+ "t1.workID as workid,t1.gender as gender,"
					+ "t1.IDCard as idcard,t4.td_name as department,t4.td_id as departid,t1.status as status,"
					+ "t3.role_name as rolename,t3.tr_id as roleid,t1.birthday as birthday from stt_user t1"
					+ " left join stt_userdepartrole t2 on t1.tu_id=t2.tu_id left join stt_role t3 on t3.tr_id=t2.tr_id"
					+ " left join stt_depart t4 on t2.td_id=t4.td_id LEFT JOIN his_ctcp c on t1.his_user=c.CTCP_Code,(SELECT @rowno:=0) t5 where t1.username<>'超级管理员' group by t1.tu_id,t4.td_id ORDER BY rowno"+orderByStr);
		}else{
			ls2=Db.find("select @rowno := @rowno + 1 as rowno,c.CTCP_Name,c.CTCP_DeptCode,t1.his_user,t1.tu_id as userid,t1.username as username,t1.loginname as loginname,"
					+ "t1.workID as workid,t1.gender as gender,"
					+ "t1.IDCard as idcard,t4.td_name as department,t4.td_id as departid,t1.status as status,"
					+ "t3.role_name as rolename,t3.tr_id as roleid,t1.birthday as birthday from stt_user t1"
					+ " left join stt_userdepartrole t2 on t1.tu_id=t2.tu_id left join stt_role t3 on t3.tr_id=t2.tr_id"
					+ " left join stt_depart t4 on t2.td_id=t4.td_id LEFT JOIN his_ctcp c on t1.his_user=c.CTCP_Code,(SELECT @rowno:=0) t5 where (t1.username "
	   				+ " like '%"+searchText+"%' or t1.workID like '%"+searchText+"%') and t1.username<>'超级管理员' group by t1.tu_id,t4.td_id ORDER BY rowno"+orderByStr);
	   	}
		
		if(ls2!=null && ls2.size()>0){
			int uid = 0;
			for(int i=0;i<ls2.size();i++){
				if(ls2.get(i).getInt("userid")!=uid){
					for (int j = i+1; j < ls2.size(); j++) {
					    if(ls2.get(i).get("userid").equals(ls2.get(j).get("userid"))){
					    	if(ls2.get(i).get("departid")!=ls2.get(j).get("departid")){
					    		String department;
					    		String depart1 = "";
					    		String depart2 = "";
					    		if(ls2.get(i).getStr("department")!=null){
					    			depart1 = ls2.get(i).getStr("department");
					    		}
					    		if(ls2.get(j).getStr("department")!=null){
					    		    depart2 = ls2.get(j).getStr("department");
					    		}
					    		if(depart1.equals("") || depart2.equals("")){
					    			 department=depart1+""+depart2;
					    		}else{
					    			department=depart1+","+depart2;
					    		}
					    		ls2.get(i).set("department", department);
					    	}
					    	if(!ls2.get(i).get("roleid").equals(ls2.get(j).get("roleid"))){
					    		String rolename = ls2.get(i).getStr("rolename")+","+ls2.get(j).getStr("rolename");
						    	ls2.get(i).set("rolename", rolename);
					    	}
					    	ls2.remove(j);
					    	j--;
					    }
					}
					uid=ls2.get(i).getInt("userid");
				}
			}
		}
		
		List<Record> ls3 = null;
		if(page*rows>ls2.size()){
		  ls3 = ls2.subList((page-1)*rows, ls2.size());
		}else{
		  ls3 = ls2.subList((page-1)*rows, page*rows);
		}
		result.setStatus(200);
		result.setTotal(ls2.size());
		result.setRows(ls3);
		renderJson(result);
		
		return;
	}
	
	public void addUser(){
		render("adduser.html");
	}
	
    public void updateUser() {
		
		String userid = getPara("userid");
		
		Record ls = Db.findFirst("select stt_user.username as username,stt_user.loginname as loginname,stt_user.workID as workid,stt_user.gender as gender,"
				+ "stt_user.birthday as birthday,stt_user.IdCard as idcard,stt_user.mobile as mobile,"
				+ "stt_user.linkman as linkman from stt_user  where stt_user.tu_id = ?",userid);
		
		if(ls!=null){
			List<Record> ls2 = Db.find("select stt_role.tr_id as roleid,"
					+ "stt_depart.td_id as departid from stt_user,stt_userdepartrole,stt_role,"
					+ "stt_depart where stt_userdepartrole.tr_id=stt_role.tr_id and stt_userdepartrole.td_id=stt_depart.td_id"
					+ " and stt_user.tu_id = stt_userdepartrole.tu_id and stt_user.tu_id = ?",userid);
			JSONArray json = new JSONArray();
			for(int i=0;i<ls2.size();i++){
				JSONObject jo = new JSONObject();
				jo.put("roleid", ls2.get(i).get("roleid"));
				jo.put("departid", ls2.get(i).get("departid"));
				json.add(jo);
			}
			setAttr("username",ls.get("username"));
			setAttr("workid",ls.get("workid"));
			setAttr("loginname",ls.get("loginname"));
			setAttr("gender",ls.get("gender"));
			setAttr("userid",userid);
			setAttr("idcard",ls.get("idcard"));
			setAttr("birthday",ls.get("birthday"));
			setAttr("linkman",ls.get("linkman"));
			setAttr("mobile",ls.get("mobile"));
			setAttr("roledepart",json);
		}
		render("updateuser.html");
	}
	
	public void disableUser() {
		ResultMessage result = new ResultMessage();
		
		String userid = getPara("userid");
		Record ls = null;
		ls=Db.findFirst("select stt_user.status as status from stt_user where stt_user.tu_id = ?",userid);
		if(ls!=null){
			if(ls.get("status").equals("1")){
				Db.update("update stt_user set stt_user.status = ? where stt_user.tu_id = ?", "0",userid);
			}else{
				Db.update("update stt_user set stt_user.status = ? where stt_user.tu_id = ?", "1",userid);
			}
			result.setStatus(200);
		}else{
			result.setStatus(400);
			result.setMessage("数据异常，操作失败！！");;
		}
		
		renderJson(result);
		
		return;
	}
	
	public void querystationlist() {
		ResultMessage result = new ResultMessage();
		
		List<Record> ls = null;
		ls=Db.find("select stt_station.ts_id as stationid,stt_station.station_name as stationname from stt_station");
		if(ls.size()>0){
			result.setStatus(200);
			result.setRows(ls);;
		}else{
			result.setStatus(400);
			result.setMessage("数据库异常！！");
		}
		renderJson(result);
		return;
	}
	
	public void querydepartlist() {
		ResultMessage result = new ResultMessage();
		List<Record> ls = null;
		ls=Db.find("select stt_depart.td_id as departid,stt_depart.td_name as departname from stt_depart where status != 0 and stt_depart.td_id != 0 group by stt_depart.td_id");
		if(ls.size()>0){
			result.setStatus(200);
			result.setRows(ls);;
		}else{
			result.setStatus(400);
			result.setMessage("数据库异常！！");
		}
		renderJson(result);
		return;
	}
	
	public void queryroledepartlist() {
		ResultMessage result = new ResultMessage();
		List<Record> ls = null;
		ls=Db.find("select stt_depart.td_id as departid,stt_depart.td_name as departname from stt_depart where stt_depart.td_id != 0 group by stt_depart.td_id");
		List<Record> ls2 = null;
		ls2=Db.find("select stt_role.tr_id as roleid,stt_role.role_name as rolename from stt_role group by stt_role.tr_id");
		if(ls.size()>0 && ls2.size()>0){
			Map map = new HashMap();
			map.put("rolelist", ls2);
			map.put("departlist", ls);
			result.setStatus(200);
			result.setRows(map);;
		}else{
			result.setStatus(400);
			result.setMessage("数据库异常！！");
		}
		renderJson(result);
		return;
	}
	
	public void queryrolelist() {
		ResultMessage result = new ResultMessage();
//		String departid = getPara("departid");
//		
//		int departid2 = Integer.parseInt(departid);
		List<Record> ls = null;
		ls=Db.find("select stt_role.tr_id as roleid,stt_role.role_name as rolename from stt_role group by stt_role.tr_id");
		if(ls.size()>0){
			result.setStatus(200);
			result.setRows(ls);
		}else{
			result.setStatus(400);
			result.setMessage("数据库异常！！");
		}
		renderJson(result);
		return;
	}
	
	public void adduserconfirm(){
		ResultMessage result = new ResultMessage();
		String loginname = getPara("loginname");
		String divpassword1 = getPara("divpassword1");
        if(divpassword1==""){
        	divpassword1="chenwei233";
		}
		//String password = StrUtil.md5(divpassword1);
		String username = getPara("username");
		String identity = getPara("identity");
		String gender = getPara("gender");
		String borndate = getPara("borndate");
		if(borndate!=null && borndate.equals("")){
			borndate=null;
		}
		String mobile = getPara("mobile");
		String linkman = getPara("linkman");
		String rolelist= getPara("rolelist");
		String asql1 = "insert into stt_userdepartrole(tudr_id,td_id,tr_id,tu_id)"
				+" values(null,?,?,?)";
		String workid = getPara("workid");
		String asql = "insert into stt_user(tu_id,loginname,password,username,"
				+ "workID,mobile,gender,creat_time,count,birthday,"
				+ "linkman,status,IdCard) values(null,?,?,?,?,?,?,now(),0,?,?,1,?)";
		String asq2 = "select stt_user.loginname from stt_user where stt_user.loginname=?";
		Record re123 = Db.findFirst(asq2,loginname);
		if(re123==null){
			String asq3 = "select stt_user.workID from stt_user where stt_user.workID=?";
			Record re124 = Db.findFirst(asq3,workid);
			if(re124==null){
				int a = Db.update(asql,loginname,divpassword1,username,workid,mobile,gender,borndate,linkman,identity);
				if(a>0){
					Record re = Db.findFirst("select stt_user.tu_id as tu_id from stt_user where workID = ?",workid);
					int tuid = Integer.parseInt(re.get("tu_id")+"");
					List<Map>  rolelist1= (List<Map>)JSONArray.parse(rolelist);
					for(int i=0;i<rolelist1.size();i++){
						int role = Integer.parseInt((String)rolelist1.get(i).get("role"));
						int depart = Integer.parseInt((String)rolelist1.get(i).get("depart"));
						int b = Db.update(asql1,depart,role,tuid);
						if(b<0){
							String asql2 = "delete from stt_user where tu_id = ?";
							int c = Db.update(asql2,tuid);
							return;
						}
					}
					result.setStatus(200);
				}else{
					result.setStatus(400);
					result.setMessage("数据库异常！！");
				}
			}else{
				result.setStatus(400);
				result.setMessage("工号已被占用！！");
			}
		}else{
			result.setStatus(400);
			result.setMessage("登录名已经存在！！");
		}
		
		renderJson(result);
		return;
	}
	
	public void upduserconfirm(){
		ResultMessage result = new ResultMessage();
		String userid = getPara("userid");
		String divpassword1 = getPara("divpassword1");
		//String password = StrUtil.md5(divpassword1);
		String username = getPara("username");
		String workid = getPara("workid");
		String identity = getPara("identity");
		String gender = getPara("gender");
		String borndate = getPara("borndate");
		if(borndate!=null && borndate.equals("")){
			borndate=null;
		}
		String mobile = getPara("mobile");
		String linkman = getPara("linkman");
		String rolelist= getPara("rolelist");
		if(borndate!=null && borndate.equals("")){
			borndate=null;
		}
		Record rr = Db.findFirst("select stt_user.tu_id id from stt_user where stt_user.tu_id=?",userid);
		if(rr==null){
			result.setStatus(400);
			result.setMessage("数据异常，操作失败！！");
			renderJson(result);
			return;
		}
		String asql1 = "insert into stt_userdepartrole(tudr_id,td_id,tr_id,tu_id)"
				+" values(null,?,?,?)";
		int a;
		String asq3 = "select stt_user.tu_id as userid from stt_user where stt_user.workID=?";
		Record re124 = Db.findFirst(asq3,workid);
		if(re124!=null && !re124.get("userid").equals(userid)){
			if(!(userid!=null && userid.equals(re124.get("userid")+""))){
				result.setStatus(400);
				result.setMessage("工号已被占用！！");
				renderJson(result);
				return;
			}
		}
		if(divpassword1==""){
			String asql = "update stt_user set username=?,workID=?,mobile=?,gender=?,birthday=?,linkman=?,IdCard=? where tu_id=?";
        	 a = Db.update(asql,username,workid,mobile,gender,borndate,linkman,identity,userid);
		}else{
			String asql = "update stt_user set password=?,username=?,workID=?,mobile=?,gender=?,birthday=?,linkman=?,IdCard=? where tu_id=?";
			a = Db.update(asql,divpassword1,username,workid,mobile,gender,borndate,linkman,identity,userid);
		}
		if(a>0){
			int tuid = Integer.parseInt(userid);
			String asql3 = "delete from stt_userdepartrole where stt_userdepartrole.tu_id=?";
			Db.update(asql3,tuid);
			List<Map>  rolelist1= (List<Map>)JSONArray.parse(rolelist);
			for(int i=0;i<rolelist1.size();i++){
				int role = Integer.parseInt((String)rolelist1.get(i).get("role"));
				int depart;
				if(rolelist1.get(i).get("depart").equals("")){
					Db.update(asql1,0,role,tuid);
				}else{
					depart = Integer.parseInt((String)rolelist1.get(i).get("depart"));
					Db.update(asql1,depart,role,tuid);
				}	
			}
			result.setStatus(200);
		}else{
			result.setStatus(400);
			result.setMessage("数据异常,操作失败！！");
		}
		renderJson(result);
		return;
	}
	
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
	
	public void querypasswordloginname(){
		ResultMessage result = new ResultMessage();
		String userid = getPara("userid");
		String asql1 = "select stt_user.loginname as loginname,stt_user.password as password from stt_user where stt_user.tu_id=?";
		Record re = Db.findFirst(asql1,userid);
		if(re!=null){
			result.setStatus(200);
			result.setRows(re);
		}else{
			result.setStatus(400);
			result.setMessage("此员工信息存在异常！！");;
		}
		renderJson(result);
		return;
	}
	
	public void queryHisUse(){
		String keywords = getPara("keywords");
		List<Record> list = null;
		list = Db
				.find("SELECT CTCP_Code id,BusinessFieldCode code,CTCP_Name name FROM `his_ctcp`   where CTCP_Desc like ? or CTCP_JobNumber like ? or CTCP_Name like ?  and CTCP_Status=1",
						"%" + keywords + "%", "%" + keywords + "%", "%"+ keywords + "%");
		if(list.size()>0){
			renderJson(ResultMessage.build(200, "获取成功",list));
		}else{
			renderJson(ResultMessage.build(400, "获取失败"));
		}
	}
	public void saveHisUser(){
		ResultMessage result = new ResultMessage();
		String hisUserid = getPara("hisUserid");
		String tu_id = getPara("tu_id");
		String asql1 = "UPDATE stt_user set his_user=? where tu_id=?";
		int re = Db.update(asql1,hisUserid,tu_id);
		result.setStatus(200);
		result.setRows(re);
//		if(re!=null){
//			result.setStatus(200);
//			result.setRows(re);
//		}else{
//			result.setStatus(400);
//			result.setMessage("此员工信息存在异常！！");;
//		}
		renderJson(result);
		return;
	}
	
}
