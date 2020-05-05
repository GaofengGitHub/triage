package com.chenwei.entrance;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.core.Controller;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class DepartController extends Controller {
	private static Logger log = Logger.getLogger(DepartController.class);
	@SuppressWarnings("unused")
	public void index() {

//		StringBuffer sb = new StringBuffer();
//		sb.append(" select concat(stt_depart.td_name,':',stt_role.role_name) as depart ");
//		sb.append(" FROM stt_role,stt_depart,stt_user,stt_userdepartrole ");
//		sb.append(" WHERE stt_user.tu_id = stt_userdepartrole.tu_id ");
//		sb.append(" AND stt_role.tr_id=stt_userdepartrole.tr_id ");
//		sb.append(" AND stt_depart.td_id=stt_userdepartrole.td_id");
//		sb.append(" AND stt_depart.status=1 AND stt_user.loginname = ? ");
//		
//		List<Record> departs = Db.find(sb.toString(),getPara("username"));
//		
//		renderJson(departs);
		//将选择的部门导入REDIS
		//登录成功后将值存入redis
		HttpSession session = getRequest().getSession();
		 String depart = getPara("depart");
		 String userName = getPara("userName");
		 String userFullName = getPara("userFullName");
		 String roleName = getPara("roleName");
		 String departId = getPara("departId");
		 String userId = getPara("userId");
		 String roleId = getPara("roleId");
		 Cache bbsCache = Redis.use();
		 bbsCache.set(userName, depart+"|" +userFullName + "|" +roleName + "|" + userId+ "|" + departId + "|" + roleId);
		 //bbsCache.expire(userName, 30);
		 renderJson();
		return;
	}
	
}