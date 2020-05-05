package com.chenwei.rolemgmt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.chenwei.jfinal.ResultMessage;
import com.jfinal.core.Controller;
import com.jfinal.kit.Kv;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.SqlPara;
import com.jfinal.plugin.activerecord.sql.SqlKit;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class RightMgmtController extends Controller {
	
	private static Logger log = Logger.getLogger(RightMgmtController.class);
	
	public void queryAllRight() {
		ResultMessage result = new ResultMessage();
		List<Record> ls2 = null;
		ls2=Db.find("select stt_right.tr_id as rightid,stt_right.parent_tr_id as parentid,stt_right.right_name as name from stt_right order by stt_right.tr_id");
		if(ls2.size()>0){
			result.setStatus(200);
			result.setRows(ls2);
		}else{
			result.setStatus(400);
			result.setMessage("数据库查询异常");;
		}
		renderJson(result);
		return;
	}
	
	public void queryRightByCode() {
		ResultMessage result = new ResultMessage();
		String codelist = getPara("codelist");
		List<Record> ls2 = null;
		ls2=Db.find("select stt_right.tr_id as rightid,stt_right.parent_tr_id as parentid,stt_right.right_name as name from stt_right,stt_station,stt_stationright where stt_right.tr_id = stt_stationright.tr_id and"
				+ " stt_station.ts_id = stt_stationright.ts_id and stt_station.ts_id = ? order by stt_right.tr_id",codelist);
		if(ls2.size()>0){
			result.setStatus(200);
			result.setRows(ls2);
		}else{
			result.setStatus(400);
			result.setMessage("数据库查询异常");;
		}
		renderJson(result);
		return;
	}
	
	public void queryRightByRole() {
		ResultMessage result = new ResultMessage();
		String code = getPara("code");
		List<Record> ls1 = null;
		List<Record> ls2 = null;
		ls1=Db.find("select stt_right.tr_id as rightid,stt_right.parent_tr_id as parentid,stt_right.right_name as rightname,stt_right.description as description from stt_role,stt_right,stt_roleright"
				+ " where stt_right.tr_id = stt_roleright.tri_id and stt_roleright.tro_id = stt_role.tr_id and stt_right.tr_id not in ('3005','300501') and stt_role.tr_id = ? order by stt_right.tr_id",code);
		ls2=Db.find("select stt_right.tr_id as rightid,stt_right.parent_tr_id as parentid,stt_right.right_name as rightname,stt_right.description as description from stt_right where stt_right.tr_id not in ('3005','300501') order by stt_right.tr_id");
		
		Map mm =new HashMap();
		if(ls1!=null && ls2!=null && ls2.size()>0){
			result.setStatus(200);
			mm.put("roleright", ls1);
			mm.put("allright", ls2);
			result.setRows(mm);
		}else{
			result.setStatus(400);
			result.setMessage("数据库异常！！");
		}
		renderJson(result);
		return;
	}
	
	public void queryYJFZPJBRightByRole() {
		ResultMessage result = new ResultMessage();
		/*String code = getPara("code");
		List<Record> ls2 = null;
		if(code!=null && code.equals("10012")){
			ls2=Db.find("select stt_right.tr_id as rightid,stt_right.parent_tr_id as parentid,stt_right.right_name as rightname,stt_station.station_name as stationname from stt_role,stt_right,stt_station,stt_stationright,stt_roleright"
					+ " where stt_right.tr_id = stt_stationright.tr_id and stt_station.ts_id = stt_stationright.ts_id and"
					+ " stt_right.tr_id = stt_roleright.tri_id and stt_roleright.tro_id = stt_role.tr_id and stt_role.tr_id = ? group by stt_right.tr_id,stt_station.ts_id order by stt_right.tr_id",code);
		}else{
			ls2=Db.find("select stt_right.tr_id as rightid,stt_right.parent_tr_id as parentid,stt_right.right_name as rightname,stt_station.station_name as stationname from stt_role,stt_right,stt_station,stt_stationright,stt_roleright"
					+ " where stt_right.tr_id = stt_stationright.tr_id and stt_station.ts_id = stt_stationright.ts_id and"
					+ " stt_right.tr_id = stt_roleright.tri_id and stt_roleright.tro_id = stt_role.tr_id and stt_role.tr_id = ? group by stt_right.tr_id,stt_station.ts_id order by stt_right.tr_id",code);
		}
		if(ls2.size()>0){
			result.setStatus(200);
			result.setRows(ls2);
		}else{
			result.setStatus(400);
			result.setMessage("数据库查询异常");;
		}*/
		renderJson(result);
		return;
	}
	
	void addparent(Number rid,int roleid){
		Record updsql11=Db.findFirst("select parent_tr_id from stt_right where stt_right.tr_id = ?",rid);
		if(updsql11!=null){
			Record updsql=Db.findFirst("select trr_id from stt_roleright where stt_roleright.tri_id = ? and stt_roleright.tro_id = ?",rid,roleid);
			if(updsql==null){
				Db.update("insert into stt_roleright (trr_id,tri_id,tro_id) values (null,?,?)",rid,roleid);
			}
			addparent((Number)updsql11.get("parent_tr_id"),roleid);
		}
	}
	
	void addchild(Number rid,int roleid){
		List<Record> updsql11=Db.find("select tr_id from stt_right where stt_right.parent_tr_id = ?",rid);
		if(updsql11.size()>0){
			for(int i=0;i<updsql11.size();i++){
				Record updsql=Db.findFirst("select trr_id from stt_roleright where stt_roleright.tri_id = ? and stt_roleright.tro_id = ?",(Number)updsql11.get(i).get("tr_id"),roleid);
				if(updsql==null){
					Db.update("insert into stt_roleright (trr_id,tri_id,tro_id) values (null,?,?)",(Number)updsql11.get(i).get("tr_id"),roleid);
				}
				addchild((Number)updsql11.get(i).get("tr_id"),roleid);
			}
		}
	}
	
	void deleteparent(Number rid,int roleid){
		List<Record> updsql11=Db.find("select tr_id from stt_right where stt_right.parent_tr_id = ?",rid);
		if(updsql11.size()>0){
			for(int i=0;i<updsql11.size();i++){
				Db.update("delete from stt_roleright where stt_roleright.tri_id = ? and stt_roleright.tro_id = ?",(Number)updsql11.get(i).get("tr_id"),roleid);
				deleteparent((Number)updsql11.get(i).get("tr_id"),roleid);
			}
		}
	}
	
	public void updRightByRole() {
		ResultMessage result = new ResultMessage();
		String rid1 = getPara("rid");
		String roleid1 = getPara("roleid");
		String rcheck = getPara("rcheck");
		if(rid1!="" && roleid1!="" && rcheck!=""){
			int rid = Integer.parseInt(rid1);
			int roleid = Integer.parseInt(roleid1);
			Boolean rc = Boolean.getBoolean(rcheck);
			if(rcheck.equals("true")){
				Db.update("insert into stt_roleright (trr_id,tri_id,tro_id) values (null,?,?)",rid,roleid);
				addparent(rid,roleid);
				addchild(rid,roleid);
			}else{
				Db.update("delete from stt_roleright where stt_roleright.tri_id = ? and stt_roleright.tro_id = ?",rid,roleid);
				deleteparent(rid,roleid);
			}
			emptyRedisByRoleId(roleid);//清除 app角色缓存  使其重新登录
			
			result.setStatus(200);
		}else{
			result.setStatus(400);
			result.setMessage("上送数据异常");;
		}
		renderJson(result);
		return;
	}
	/*
	 * 清空 改变权限 角色 用户 的app 登录缓存信息 使其重新登录
	 */
	public void emptyRedisByRoleId(int roleid){
		List<Integer> roleids = new ArrayList<Integer>();
		roleids.add(roleid);
		roleids = getAllRoleIds(roleids,roleid);
		SqlPara sqlPara  = Db.getSqlPara("role.listUserIds",Kv.by("roleids", roleids));
		List<Record> userids = Db.find(sqlPara);
		List<Record> uniqueids = Db.find("select uniqueid from stt_device where status='1'");
		Cache rescueCache = Redis.use();
		for(int i=0;i<uniqueids.size();i++){
			String uniqueid = uniqueids.get(i).get("uniqueid").toString();
			for(int j=0;j<userids.size();j++){
				String loginname = userids.get(j).get("loginname").toString();
				if(rescueCache.exists(uniqueid)){
					String value = rescueCache.get(uniqueid);
					if(loginname.equals(value)){
						rescueCache.del(uniqueid);
					}
				}

			}
		}
		
	}
	
	//递归查询所有的子角色
	public List<Integer> getAllRoleIds(List<Integer> roleids,int roleid){
		List<Record> rolelist =Db.find("select tr_id from stt_role where stt_role.parent_tr_id = ?",roleid);
		if(rolelist.size()>0){
			for(int i=0;i<rolelist.size();i++){
				int c_roleid = rolelist.get(i).getInt("tr_id");
				roleids.add(c_roleid);
				roleids = getAllRoleIds(roleids,c_roleid);
			}
		}
		return roleids;
	}
}
