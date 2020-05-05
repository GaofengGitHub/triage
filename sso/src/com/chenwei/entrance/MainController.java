package com.chenwei.entrance;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.hutool.core.util.ObjectUtil;

import com.chenwei.jfinal.ResultMessage;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class MainController extends Controller {

	public void index(){
		redirect("/login");
	}
	
	public void applogin() {
		String userName = getPara("username");
		String password = getPara("password");
		String uniqueid = getPara("uniqueid");
		Record r = Db
				.findFirst(
						"select count(1) as count from stt_device where status = '1' and uniqueid = ? ",
						uniqueid);
		if (r.getInt("count")==0) {
			renderJson(new ResultMessage(400, "未经许可的移动终端"));
			return;
		}
		
		r = Db
				.findFirst(
						" select 1 from stt_user where loginname = ? and password = ? and status = 1 ",
						userName, password);

		if (ObjectUtil.isNotNull(r)) {

			String userId = "";
			String userFullName = "";
			Record r1 = Db
					.findFirst(
							"select * from stt_user a where a.loginname = ? ",
							userName);
			if (ObjectUtil.isNotNull(r1)) {
				userId = r1.getStr("tu_id");
				userFullName = r1.getStr("username");
				// 每次登陆修改登陆时间
				Db.update(
						"update stt_user set login_time = now() where loginname = ?",
						userName);
			}

			StringBuffer sb2 = new StringBuffer();
			sb2.append(" SELECT stt_role.tr_id AS roleid,stt_role.role_name AS rolename,stt_depart.td_id AS departid,stt_depart.td_name AS departname ");
			sb2.append(" FROM stt_role,stt_depart,stt_user,stt_userdepartrole ");
			sb2.append(" WHERE stt_user.tu_id = stt_userdepartrole.tu_id  ");
			sb2.append(" 	AND stt_role.tr_id=stt_userdepartrole.tr_id  ");
			sb2.append(" 	AND stt_depart.td_id=stt_userdepartrole.td_id  ");
			sb2.append(" 	AND stt_depart.status=1 AND stt_user.tu_id = ? ");
			// 根据用户ID查角色
			List<Record> r2 = Db.find(sb2.toString(), userId);

			// 根据角色查找角色权限并且获取该用户的权限列表
			StringBuffer sb3 = new StringBuffer();
			sb3.append(" SELECT stt_right.tr_id AS rightid,stt_right.right_name AS rightname,stt_right.url AS righturl ");
			sb3.append(" FROM  ");
			sb3.append(" stt_right,stt_roleright,stt_role  ");
			sb3.append(" WHERE stt_right.tr_id = stt_roleright.tri_id AND ");
			sb3.append(" stt_role.tr_id = stt_roleright.tro_id AND stt_role.tr_id= ? and stt_right.parent_tr_id = 0 ");

			List<Map<String, String>> rightList = new ArrayList<Map<String, String>>();
			// System.out.println("--------存放前前---------"+userId);
			for (Record r22 : r2) {
				String rolename = r22.getStr("rolename");
				String departname = r22.getStr("departname");
				String departid = r22.getStr("departid");

				List<Record> r33 = Db
						.find(sb3.toString(), r22.getStr("roleid"));
				for (Record r333 : r33) {

					Map<String, String> urlMap = new HashMap<String, String>();
					List<Record> rstation = Db
							.find("select ts_id as tsid from stt_stationdepart where td_id = ?",
									departid);
				

				if ("抢救工作站".equals(r333.getStr("rightname")) || "留观工作站".equals(r333.getStr("rightname"))) {
						String modelname = "";
						if("留观工作站".equals(r333.getStr("rightname"))){
							modelname = "triageobserve";
						}else if("抢救工作站".equals(r333.getStr("rightname"))){
							modelname = "triagerescue";
						}
						// System.out.println("--------存放前---------"+userId);
						if (("1".equals(r333.getStr("description")) || "3"
								.equals(r333.getStr("description")))
								&& (departname == null || "".equals(departname))) {
							Map<String, String> map = new HashMap<String, String>();
							map.put("rolename", rolename);
							map.put("departname", departname);
							map.put("userFullName", userFullName);
							map.put("userName", userName);
							map.put("userid", userId);
							map.put("departid", departid);
							map.put("modelname", modelname);
							rightList.add(map);
						} else {
							for (Record rst : rstation) {
								if ((r333.get("rightid") + "").equals(rst
										.get("tsid") + "")) {
									Map<String, String> map = new HashMap<String, String>();
									map.put("rolename", rolename);
									map.put("departname", departname);
									map.put("userFullName", userFullName);
									map.put("userName", userName);
									map.put("userid", userId);
									map.put("departid", departid);
									map.put("modelname", modelname);
									rightList.add(map);
								}
							}
						}
					}
				}
			}
			// System.out.println("--------存放---------"+userId);
			Cache appCache = Redis.use();
			appCache.set(uniqueid, userName);
			renderJson(new ResultMessage(200, "登录成功", rightList.size(),
					rightList));
			return;
		} else {
			renderJson(new ResultMessage(400, "帐号名或密码错误"));
			return;
		}

	}

	/*
	 * app端登出功能 applogout()
	 */
	public void applogout() {
		try {
			String uniqueid = getPara("uniqueid");
			Cache appCache = Redis.use();
			appCache.del(uniqueid);
			if (appCache.exists(uniqueid)) {
				renderJson(new ResultMessage(400, "操作失败"));
			} else {
				renderJson(new ResultMessage(200, "成功登出"));
			}

		} catch (Exception e) {
			e.printStackTrace();
			renderJson(new ResultMessage(400, "操作失败"));
			return;
		}

	}

	/*
	 * app 获取 部门信息功能 appdep()
	 */
	public void appdep() {
		try {
			String uniqueid = getPara("uniqueid");
			String modelnamee = getPara("modelnamee");
			Cache appCache = Redis.use();
			if (appCache.exists(uniqueid)) {
				String userName = appCache.get(uniqueid);
				String userId = "";
				String userFullName = "";
				Record r1 = Db.findFirst(
						"select * from stt_user a where a.loginname = ? ",
						userName);

				userId = r1.getStr("tu_id");
				userFullName = r1.getStr("username");

				StringBuffer sb2 = new StringBuffer();
				sb2.append(" SELECT stt_role.tr_id AS roleid,stt_role.role_name AS rolename,stt_depart.td_id AS departid,stt_depart.td_name AS departname ");
				sb2.append(" FROM stt_role,stt_depart,stt_user,stt_userdepartrole ");
				sb2.append(" WHERE stt_user.tu_id = stt_userdepartrole.tu_id  ");
				sb2.append(" 	AND stt_role.tr_id=stt_userdepartrole.tr_id  ");
				sb2.append(" 	AND stt_depart.td_id=stt_userdepartrole.td_id  ");
				sb2.append(" 	AND stt_depart.status=1 AND stt_user.tu_id = ? ");
				// 根据用户ID查角色
				List<Record> r2 = Db.find(sb2.toString(), userId);

				// 根据角色查找角色权限并且获取该用户的权限列表
				StringBuffer sb3 = new StringBuffer();
				sb3.append(" SELECT stt_right.tr_id AS rightid,stt_right.right_name AS rightname,stt_right.url AS righturl ");
				sb3.append(" FROM  ");
				sb3.append(" stt_right,stt_roleright,stt_role  ");
				sb3.append(" WHERE stt_right.tr_id = stt_roleright.tri_id AND ");
				sb3.append(" stt_role.tr_id = stt_roleright.tro_id AND stt_role.tr_id= ? and stt_right.parent_tr_id = 0 ");

				List<Map<String, String>> rightList = new ArrayList<Map<String, String>>();
				// System.out.println("--------存放前前---------"+userId);
				for (Record r22 : r2) {
					String rolename = r22.getStr("rolename");
					String departname = r22.getStr("departname");
					String departid = r22.getStr("departid");

					List<Record> r33 = Db.find(sb3.toString(),
							r22.getStr("roleid"));
					for (Record r333 : r33) {
						Map<String, String> urlMap = new HashMap<String, String>();
						List<Record> rstation = Db
								.find("select ts_id as tsid from stt_stationdepart where td_id = ?",
										departid);
						

						if ("抢救工作站".equals(r333.getStr("rightname")) || "留观工作站".equals(r333.getStr("rightname"))) {
							String modelname = "";
							if("留观工作站".equals(r333.getStr("rightname"))){
								modelname = "triageobserve";
							}else if("抢救工作站".equals(r333.getStr("rightname"))){
								modelname = "triagerescue";
							}
							// System.out.println("--------存放前---------"+userId);
							if (("1".equals(r333.getStr("description")) || "3"
									.equals(r333.getStr("description")))
									&& (departname == null || "".equals(departname))) {
								Map<String, String> map = new HashMap<String, String>();
								map.put("rolename", rolename);
								map.put("departname", departname);
								map.put("userFullName", userFullName);
								map.put("userName", userName);
								map.put("userid", userId);
								map.put("departid", departid);
								map.put("modelname", modelname);
								rightList.add(map);
							} else {
								for (Record rst : rstation) {
									if ((r333.get("rightid") + "").equals(rst
											.get("tsid") + "")) {
										Map<String, String> map = new HashMap<String, String>();
										map.put("rolename", rolename);
										map.put("departname", departname);
										map.put("userFullName", userFullName);
										map.put("userName", userName);
										map.put("userid", userId);
										map.put("departid", departid);
										map.put("modelname", modelname);
										if(modelname.equals(modelnamee)){
											rightList.add(map);
										}
										
									}
								}
							}
						}
					}
				}
				renderJson(new ResultMessage(200, "获取成功", rightList.size(),
						rightList));
			} else {
				renderJson(new ResultMessage(400, "未查到登录信息"));
			}

		} catch (Exception e) {
			e.printStackTrace();
			renderJson(new ResultMessage(400, "操作失败"));
			return;
		}
	}

	/*
	 * app端 修改用户密码 appchangePw()
	 */
	public void appchangePw() {
		try {
			String username = getPara("username");
			String password = getPara("password");
			String uniqueid = getPara("uniqueid");

			int i = Db.update(
					" update stt_user set  password = ? where loginname = ?",
					password, username);
			if (i > 0) {
				Cache appCache = Redis.use();
				if (appCache.exists(uniqueid)) {
					appCache.del(uniqueid);
					if (!appCache.exists(uniqueid)) {
						renderJson(new ResultMessage(200, "修改成功"));
						return;
					}
				}
			}
			renderJson(new ResultMessage(400, "修改失败"));
		} catch (Exception e) {
			e.printStackTrace();
			renderJson(new ResultMessage(400, "修改失败"));
			return;
		}
	}
	
}