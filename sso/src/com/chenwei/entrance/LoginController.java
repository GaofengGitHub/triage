package com.chenwei.entrance;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.chenwei.jfinal.ResultMessage;
import com.chenwei.sso.DatabaseAuthenticationHandler;
import com.chenwei.sso.handler.CompositeCredentialResolver;
import com.chenwei.sso.handler.EncryCredentialResolver;
import com.chenwei.sso.handler.UsernamePasswordCredentialResolver;
import com.github.ebnew.ki4so.core.app.AppServiceImpl;
import com.github.ebnew.ki4so.core.authentication.Authentication;
import com.github.ebnew.ki4so.core.authentication.AuthenticationManagerImpl;
import com.github.ebnew.ki4so.core.authentication.AuthenticationPostHandler;
import com.github.ebnew.ki4so.core.authentication.Credential;
import com.github.ebnew.ki4so.core.authentication.DefaultAuthenticationPostHandler;
import com.github.ebnew.ki4so.core.authentication.EncryCredentialManagerImpl;
import com.github.ebnew.ki4so.core.authentication.handlers.AuthenticationHandler;
import com.github.ebnew.ki4so.core.authentication.handlers.EncryCredentialAuthenticationHandler;
import com.github.ebnew.ki4so.core.authentication.resolvers.CredentialToPrincipalResolver;
import com.github.ebnew.ki4so.core.authentication.resolvers.EncryCredentialToPrincipalResolver;
import com.github.ebnew.ki4so.core.authentication.resolvers.UsernamePasswordCredentialToPrincipalResolver;
import com.github.ebnew.ki4so.core.authentication.status.DefaultUserLoggedStatusStore;
import com.github.ebnew.ki4so.core.key.KeyServiceImpl;
import com.github.ebnew.ki4so.core.message.MessageUtils;
import com.github.ebnew.ki4so.core.service.Ki4soServiceImpl;
import com.github.ebnew.ki4so.core.service.LoginResult;
import com.github.ebnew.ki4so.core.service.LogoutAppServiceImpl;
import com.github.ebnew.ki4so.web.utils.WebConstants;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class LoginController extends Controller {
	private static Logger log = Logger.getLogger(LoginController.class);
	public void index() {
		log.error("enter login action");
		
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		
		CompositeCredentialResolver credentialResolver = new CompositeCredentialResolver();
		credentialResolver.setEncryCredentialResolver(new EncryCredentialResolver());
		credentialResolver.setUsernamePasswordCredentialResolver( new UsernamePasswordCredentialResolver());
	
		AppServiceImpl appService = new AppServiceImpl();
		KeyServiceImpl keyService = new KeyServiceImpl();
		DefaultUserLoggedStatusStore userLoggedStatusStore = new DefaultUserLoggedStatusStore();
		LogoutAppServiceImpl logoutAppService = new LogoutAppServiceImpl();
		logoutAppService.setAppService(appService);
		logoutAppService.setUserLoggedStatusStore(userLoggedStatusStore);
		
		EncryCredentialManagerImpl encryCredentialManager = new EncryCredentialManagerImpl();
		encryCredentialManager.setKeyService(keyService);
		
		AuthenticationManagerImpl authenticationManager = new AuthenticationManagerImpl();
		List<AuthenticationHandler> list1 = new ArrayList<AuthenticationHandler>();
		list1.add(new DatabaseAuthenticationHandler());
		EncryCredentialAuthenticationHandler her = new EncryCredentialAuthenticationHandler();
		her.setEncryCredentialManager(encryCredentialManager);
		list1.add(her);
	
		List<CredentialToPrincipalResolver> list3 = new ArrayList<CredentialToPrincipalResolver>();
		list3.add(new UsernamePasswordCredentialToPrincipalResolver());
		EncryCredentialToPrincipalResolver resolver = new EncryCredentialToPrincipalResolver();
		resolver.setSupportSubClasses(false);
		list3.add(resolver);
		
		authenticationManager.setAuthenticationHandlers(list1);
		
		DefaultAuthenticationPostHandler handler = new DefaultAuthenticationPostHandler();
		handler.setAppService(appService);
		handler.setEncryCredentialManager(encryCredentialManager);
		handler.setKeyService(keyService);
		handler.setUserLoggedStatusStore(userLoggedStatusStore);
		
		authenticationManager.setAuthenticationPostHandler(handler);
		authenticationManager.setCredentialToPrincipalResolvers(list3);
		
		Ki4soServiceImpl ki4soService = new Ki4soServiceImpl();
		ki4soService.setAppService(appService);
		ki4soService.setAuthenticationManager(authenticationManager);
		ki4soService.setLogoutAppService(logoutAppService);
		ki4soService.setUserLoggedStatusStore(userLoggedStatusStore);
		
		Authentication authentication = null;
		
		
		//解析用户凭据。
		//同事取出session的URL值
		Credential credential = credentialResolver.resolveCredential(request);
		//没有提供任何认证凭据。
		if(credential==null){
			//设置serivce地址到session中。
			String service = request.getParameter(WebConstants.SERVICE_PARAM_NAME);
			log.error("the servcie is "+service);
			if(!StrUtil.isEmpty(service)){
				request.getSession().setAttribute(WebConstants.KI4SO_SERVICE_KEY_IN_SESSION, service);
			}
			log.error("no credential, return login page");
			//返回到登录页面，索取用户凭据。
			render("login.html");
			return;
		}
		//提供了用户凭据
		else{
			//调用核心结果进行凭据认证。
			LoginResult result = ki4soService.login(credential);
		
			//将验证结果转换为视图输出结果。
			if (result.isSuccess()) {
				//登录结果对象。
				authentication = result.getAuthentication();

				//清除session中的状态信息service值。
				request.getSession().removeAttribute(WebConstants.KI4SO_SERVICE_KEY_IN_SESSION);
				
				// 如果有加密凭据信息，则写入加密凭据值到cookie中。
				if (authentication != null && authentication.getAttributes() != null) {
					Map<String, Object> attributes = authentication.getAttributes();
					// ki4so服务端加密的凭据存在，则写入cookie中。
					if (attributes.get(AuthenticationPostHandler.KI4SO_SERVER_EC_KEY) != null) {
						response.addCookie(new Cookie(
								WebConstants.KI4SO_SERVER_ENCRYPTED_CREDENTIAL_COOKIE_KEY,
								attributes.get(AuthenticationPostHandler.KI4SO_SERVER_EC_KEY).toString()));
					}
					// ki4so客户端加密的凭据和参数service存在，则跳转到对应的页面中。
					if (attributes.get(AuthenticationPostHandler.KI4SO_CLIENT_EC_KEY) != null
							&& !ObjectUtil.isNull(attributes.get(WebConstants.SERVICE_PARAM_NAME))) {
						//传值和重定向
						String redirectUrl = attributes.get(WebConstants.SERVICE_PARAM_NAME).toString();
						String key = attributes.get(AuthenticationPostHandler.KI4SO_CLIENT_EC_KEY).toString();
						redirect(buildRedirectUrl(redirectUrl,key));
						return;
					}
				}
			} else {
				//删除以前不合法的凭据信息。
				//清除cookie值。
				Cookie[] cookies = request.getCookies();
				if(cookies!=null && cookies.length>0){
					for(Cookie cookie:cookies){
						if(WebConstants.KI4SO_SERVER_ENCRYPTED_CREDENTIAL_COOKIE_KEY.equals(cookie.getName())){
							//设置过期时间为立即。
							cookie.setMaxAge(0);
							response.addCookie(cookie);
						}
					}
				}
				renderText( result.getCode() + "|" + MessageUtils.getMessage(result.getMsgKey()));
			}
		}
		
		//查找用户的系统访问权限
		String userName = authentication.getPrincipal().getId();
		String userId = "";
		String userFullName = "";
		Record r1 = Db.findFirst("select * from stt_user a where a.loginname = ? ", userName);
		if(ObjectUtil.isNotNull(r1)){
			userId = r1.getStr("tu_id");
			userFullName = r1.getStr("username");
			//每次登陆修改登陆时间
			Db.update("update stt_user set login_time = now() where loginname = ?",userName);
		}
		
		StringBuffer sb2 = new StringBuffer();
		sb2.append(" SELECT stt_role.tr_id AS roleid,stt_role.role_name AS rolename,stt_depart.td_id AS departid,stt_depart.td_name AS departname ");
		sb2.append(" FROM stt_role,stt_depart,stt_user,stt_userdepartrole ");
		sb2.append(" WHERE stt_user.tu_id = stt_userdepartrole.tu_id  ");
		sb2.append(" 	AND stt_role.tr_id=stt_userdepartrole.tr_id  ");
		sb2.append(" 	AND stt_depart.td_id=stt_userdepartrole.td_id  ");
		sb2.append(" 	AND stt_depart.status=1 AND stt_user.status='1' AND stt_user.tu_id = ? ");
		//根据用户ID查角色
		List<Record> r2 = Db.find(sb2.toString(),userId);
		
		//根据角色查找角色权限并且获取该用户的权限列表
		StringBuffer sb3 = new StringBuffer();
		sb3.append(" SELECT stt_right.tr_id AS rightid,stt_right.right_name AS rightname,stt_right.url AS righturl,stt_role.description ");
		sb3.append(" FROM  ");
		sb3.append(" stt_right,stt_roleright,stt_role  ");
		sb3.append(" WHERE stt_right.tr_id = stt_roleright.tri_id AND ");
		sb3.append(" stt_role.tr_id = stt_roleright.tro_id AND stt_role.tr_id= ? and stt_right.parent_tr_id = 0 ");

		List<String[]> rightList = new ArrayList<String[]>();
		//System.out.println("--------存放前前---------"+userId);
		FileReader fileReader = new FileReader("apps.js");
		JSONArray array = JSON.parseArray(fileReader.readString());		
		Map<String,String> urlMap = new HashMap<String,String>();
		for (int i=0;i<array.size();i++){
			JSONObject obj=array.getJSONObject(i);
			urlMap.put(obj.getString("appName"), obj.getString("host"));
		}
		for(Record r22:r2){
			String rolename= r22.getStr("rolename");
			String departname= r22.getStr("departname");
			String departid = r22.getStr("departid");
			String roleId = r22.getStr("roleid");
			List<Record> rstation = Db.find("select ts_id as tsid from stt_stationdepart where td_id = ?",r22.getStr("departid"));
			
			List<Record> r33 = Db.find(sb3.toString(),r22.getStr("roleid"));
			for(Record r333:r33){
				String url = "";
				String modelname = "";
				if("预检分诊工作站".equals(r333.getStr("rightname"))){
					url = urlMap.get("triage");
					modelname = "triage";
				}else if("留观工作站".equals(r333.getStr("rightname"))){
					url = urlMap.get("triageobserve");
					modelname = "triageobserve";
				}else if("科室管理工作站".equals(r333.getStr("rightname"))){
					url = urlMap.get("depart");
					modelname = "depart";
				}else if("系统管理工作站".equals(r333.getStr("rightname"))){
					url = urlMap.get("triagesystem");
					modelname = "triagesystem";
				}else if("抢救工作站".equals(r333.getStr("rightname"))){
					url = urlMap.get("triagerescue");
					modelname = "triagerescue";
				}else if("医生工作站".equals(r333.getStr("rightname"))){
					url = urlMap.get("triagedoctor");
					modelname = "triagedoctor";
				}
				//System.out.println("--------存放前---------"+userId);
				if(("1".equals(r333.getStr("description")) || "3".equals(r333.getStr("description"))) && (departname==null || "".equals(departname))){
					String[] strs = {r333.getStr("rightname"),rolename,departname,url,userName,userFullName,userId,departid,roleId,modelname};
					rightList.add(strs);
				}else{ 
					for(Record rst:rstation){
						if((r333.get("rightid")+"").equals(rst.get("tsid")+"")){
							String[] strs = {r333.getStr("rightname"),rolename,departname,url,userName,userFullName,userId,departid,roleId,modelname};
							rightList.add(strs);
						}
					}
				}
			}
		}

		setAttr("rightList",rightList); 
		int size = rightList.size();
		setAttr("size",rightList.size()); 
		//render("choosemore.html");
//		if(size > 5){
//			render("choosemore.html");
//		}else 
		if(size == 1){
			//将选择的部门导入REDIS
			//登录成功后将值存入redis
			HttpSession session = getRequest().getSession();
			Cache bbsCache = Redis.use();
			bbsCache.set(rightList.get(0)[4], rightList.get(0)[2]+"|" +rightList.get(0)[5] + "|" +rightList.get(0)[1] + "|" + rightList.get(0)[6]+ "|" + rightList.get(0)[7]+ "|" + rightList.get(0)[8]);
			redirect(rightList.get(0)[3]);
		}else{
			render("choosemore.html");
		}
		return;
	}
	
	public String buildRedirectUrl(String service,String encryCredential) {
		StringBuffer sb = new StringBuffer(service);
		if (service.contains("?")) {
			sb.append("&");
		} else {
			sb.append("?");
		}
		sb.append(WebConstants.KI4SO_CLIENT_ENCRYPTED_CREDENTIAL_COOKIE_KEY)
		.append("=").append(encryCredential);
		return sb.toString();
	}
	
	/*---------2019-3-28--------------用户行为检测代码---开始-----------------------------------------*/
	
	public void userBehavior(){
		render("../userbehavior/main.html");
	}
	
	public void gotoallquery(){
		render("../userbehavior/userbehavior.html");
	}
	
	public void gotowaittime(){
		render("../userbehavior/waittime.html");
	}
	
	public void gotowaittimeinfo(){
		render("../userbehavior/waittimeinfo.html");
	}
	
	public void gotooperate(){
		render("../userbehavior/operate.html");
	}
	
	public void gotooperateinfo(){
		render("../userbehavior/operateinfo.html");
	}
	/**
	 * 综合查询
	 * queryUserBehavior 
	 * author:yusm
	 * @exception
	 * @since 1.0.0
	 */
	public void queryUserBehavior(){
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		String username = getPara("username");
		String system = getPara("system");
		String pagename = getPara("pagename");
		String operatename = getPara("operatename");
		
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		String sort = getPara("sort");
		String order = getPara("sortOrder");
		String orderByStr="";
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			orderByStr = " order by "+sort + " " + order;
		}
		Page<Record> behaviorlist = null;
		
		String userid = "";
		String ifsql = "";
		if(username!=null && !"".equals(username)){
			Record reuser = Db.findFirst("select tu_id,username,workID from stt_user where username like ?","%"+username+"%");
			if(reuser!=null){
				userid = reuser.getStr("tu_id");
			}
		}
		List<String> pra = new ArrayList<String>();
		if(!"".equals(userid)){
			ifsql += " userid = ?";
			pra.add(userid);
		}
		
		if(system!=null && !"".equals(system)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " system = ?";
			pra.add(system);
		}
		
		if(pagename!=null && !"".equals(pagename)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " pagename like ?";
			pra.add("%"+pagename+"%");
		}
		
		if(operatename!=null && !"".equals(operatename)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " operatename like ?";
			pra.add("%"+operatename+"%");
		}
		
		if(starttime!=null && !"".equals(starttime) && endtime!=null && !"".equals(endtime)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " DATE_FORMAT(t1.operatetime,'%Y-%m-%d') between ? and ?";
			pra.add(starttime);
			pra.add(endtime);
		}
		//List<Record> behaviorlist=null;
		if(!"".equals(ifsql)){
			Object[] para =	pra.toArray();
			behaviorlist = Db.paginate(page,rows,"select t1.id,t4.page,t4.pagename,t4.operatename,"
					+ "t1.userid,t1.roleid,t4.system,"
					+ "t1.status,t1.operatetime,t2.username,t3.right_name ","from trt_useroperatepoint t1 "
					+ "left join trt_operatepoint t4 on t1.op_id = t4.id "
					+ "left join stt_user t2 on t1.userid = t2.tu_id "
					+ "left join stt_right t3 on t4.system = t3.url and t3.parent_tr_id = '0' where "+ifsql+orderByStr,para);
		}else{
			behaviorlist = Db.paginate(page,rows,"select t1.id,t4.page,t4.pagename,t4.operatename,"
					+ "t1.userid,t1.roleid,t4.system,"
					+ "t1.status,t1.operatetime,t2.username,t3.right_name ","from trt_useroperatepoint t1 "
					+ "left join trt_operatepoint t4 on t1.op_id = t4.id "
					+ "left join stt_user t2 on t1.userid = t2.tu_id "
					+ "left join stt_right t3 on t4.system = t3.url and t3.parent_tr_id = '0'"+orderByStr);
		}
		
		renderJson(ResultMessage.build(200, "查询成功",behaviorlist.getTotalRow(),behaviorlist.getList()));
	}
	
	/**
	 * 操作量查询
	 * queryUserBehaviorNum 
	 * author:yusm
	 * @exception
	 * @since 1.0.0
	 */
	public void queryUserBehaviorNum(){
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		String system = getPara("system");
		String pagename = getPara("pagename");
		
		String userid = "";
		String ifsql = "";
		boolean abc = false;
		List<String> pra = new ArrayList<String>();
		if(!"".equals(userid)){
			ifsql += " userid = ?";
			pra.add(userid);
			abc = true;
		}
		
		if(system!=null && !"".equals(system)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " system = ?";
			pra.add(system);
			abc = true;
		}
		
		if(pagename!=null && !"".equals(pagename)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " pagename like ?";
			pra.add("%"+pagename+"%");
			abc = true;
		}
		
		if(starttime!=null && !"".equals(starttime) && endtime!=null && !"".equals(endtime)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " DATE_FORMAT(operatetime,'%Y-%m-%d') between ? and ?";
			pra.add(starttime);
			pra.add(endtime);
			abc = true;
		}
		ifsql += " GROUP BY t4.operatename";
		List<Record> behaviorlist=null;
		if(abc){
			Object[] para =	pra.toArray();
			behaviorlist = Db.find("select count(t1.id) as operatenum,t1.id,t4.page,t4.pagename,t4.operatename,"
					+ "t1.userid,t1.roleid,t4.system,"
					+ "t1.status,t1.operatetime from trt_useroperatepoint t1 "
					+ "left join trt_operatepoint t4 on t1.op_id = t4.id "
					+ "where "+ifsql,para);
		}else{
			behaviorlist = Db.find("select count(t1.id) as operatenum,t1.id,t4.page,t4.pagename,t4.operatename,"
					+ "t1.userid,t1.roleid,t4.system,"
					+ "t1.status,t1.operatetime from trt_useroperatepoint t1 "
					+ "left join trt_operatepoint t4 on t1.op_id = t4.id "
					+ "GROUP BY t4.operatename");
		}
		
		renderJson(ResultMessage.build(200, "查询成功",behaviorlist.size(),behaviorlist));
	}
	
	/**
	 * 页面停留时间查询
	 * queryWaitTime 
	 * author:yusm
	 * @exception
	 * @since 1.0.0
	 */
	public void queryWaitTime(){
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		String username = getPara("username");
		String pagename = getPara("pagename");
		String system = getPara("system");
		
		String userid = "";
		String ifsql = "";
		boolean abc = false;
		if(username!=null && !"".equals(username)){
			Record reuser = Db.findFirst("select tu_id,username,workID from stt_user where username like ?","%"+username+"%");
			if(reuser!=null){
				userid = reuser.getStr("tu_id");
			}
		}
		List<String> pra = new ArrayList<String>();
		if(!"".equals(userid)){
			ifsql += " userid = ?";
			pra.add(userid);
			abc = true;
		}
		
		if(system!=null && !"".equals(system)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " system = ?";
			pra.add(system);
			abc = true;
		}
		
		if(pagename!=null && !"".equals(pagename)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " pagename like ?";
			pra.add("%"+pagename+"%");
			abc = true;
		}
		
		if(starttime!=null && !"".equals(starttime) && endtime!=null && !"".equals(endtime)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " DATE_FORMAT(starttime,'%Y-%m-%d') >= ?";
			ifsql += " and DATE_FORMAT(endtime,'%Y-%m-%d') <= ?";
			pra.add(starttime);
			pra.add(endtime);
			abc = true;
		}
		ifsql += " GROUP BY pagename";
		List<Record> behaviorlist=null;
		if(abc){
			Object[] para =	pra.toArray();
			behaviorlist = Db.find("SELECT round(AVG(waittime),2) as avgwaittime,id, page, pagename, userid, roleid, starttime, endtime, waittime, status, system from trt_waittime where waittime is not NULL and "+ifsql,para);
		}else{
			behaviorlist = Db.find("SELECT round(AVG(waittime),2) as avgwaittime,id, page, pagename, userid, roleid, starttime, endtime, waittime, status, system from trt_waittime where waittime is not NULL GROUP BY pagename");
		}
		
		renderJson(ResultMessage.build(200, "查询成功",behaviorlist.size(),behaviorlist));
	}
	
	/**
	 * 页面停留时间详细查询
	 * queryWaitTimeInfo 
	 * author:yusm
	 * @exception
	 * @since 1.0.0
	 */
	public void queryWaitTimeInfo(){
		String starttime = getPara("starttime");
		String endtime = getPara("endtime");
		String system = getPara("system");
		String pagename = getPara("pagename");
		String username = getPara("username");
		
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		String sort = getPara("sort");
		String order = getPara("sortOrder");
		String orderByStr="";
		if(StringUtils.isNotBlank(sort) && StringUtils.isNotBlank(order)){
			orderByStr = " order by "+sort + " " + order;
		}
		Page<Record> behaviorlist = null;
		
		String userid = "";
		String ifsql = "";
		boolean abc = false;
		if(username!=null && !"".equals(username)){
			Record reuser = Db.findFirst("select tu_id,username,workID from stt_user where username like ?","%"+username+"%");
			if(reuser!=null){
				userid = reuser.getStr("tu_id");
				abc = true;
			}
		}
		List<String> pra = new ArrayList<String>();
		if(!"".equals(userid)){
			ifsql += " t1.userid = ?";
			pra.add(userid);
			abc = true;
		}
		
		if(system!=null && !"".equals(system)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " t1.system = ?";
			pra.add(system);
			abc = true;
		}
		
		if(pagename!=null && !"".equals(pagename)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " t1.pagename like ?";
			pra.add("%"+pagename+"%");
			abc = true;
		}
		
		if(starttime!=null && !"".equals(starttime) && endtime!=null && !"".equals(endtime)){
			if(!"".equals(ifsql)){
				ifsql += " and ";
			}
			ifsql += " DATE_FORMAT(t1.starttime,'%Y-%m-%d') >= ?";
			ifsql += " and DATE_FORMAT(t1.endtime,'%Y-%m-%d') <= ?";
			pra.add(starttime);
			pra.add(endtime);
			abc = true;
		}
		//List<Record> behaviorlist=null;
		if(abc){
			Object[] para =	pra.toArray();
			behaviorlist = Db.paginate(page, rows,"SELECT t1.id, t1.page, t1.pagename, t1.userid, t1.roleid, t1.starttime, t1.endtime, t1.waittime,"
					+ " t1.status, t1.system ,t2.username ","from trt_waittime t1 left join stt_user t2 on t1.userid = t2.tu_id where "+ifsql+orderByStr,para);
		}
		renderJson(ResultMessage.build(200, "查询成功",behaviorlist.getTotalRow(),behaviorlist.getList()));
	}
	
	/**
	 * 查询用户行为类型
	 * queryTypeBehavior 
	 * author:yusm
	 * @exception
	 * @since 1.0.0
	 */
	public void queryTypeBehavior(){
		String type = getPara("type");
		List<Record> behaviorlist=null;
		if(type.equals("pagename")){
			behaviorlist = Db.find("select t1.id,t4.page,t4.pagename,t4.operatename,"
					+ "t1.userid,t1.roleid,t4.system,"
					+ "t1.status,t1.operatetime from trt_useroperatepoint t1 "
					+ "left join trt_operatepoint t4 on t1.op_id = t4.id"
					+ " GROUP BY t4.pagename");
		}else if(type.equals("operatename")){
			behaviorlist = Db.find("select t1.id,t4.page,t4.pagename,t4.operatename,"
					+ "t1.userid,t1.roleid,t4.system,"
					+ "t1.status,t1.operatetime from trt_useroperatepoint t1 "
					+ "left join trt_operatepoint t4 on t1.op_id = t4.id"
					+ " GROUP BY t4.operatename");
		}else if(type.equals("user")){
			behaviorlist = Db.find("select tu_id,username,workID from stt_user");
		}else if(type.equals("station")){
			behaviorlist = Db.find("select tr_id,right_name,url from stt_right where parent_tr_id = '0'");
		}
		
		renderJson(ResultMessage.build(200, "查询成功",behaviorlist.size(),behaviorlist));
	}
	
	/**
	 * 零操作点
	 * zerooperate 
	 * author:yusm
	 * @exception
	 * @since 1.0.0
	 */
	public void zerooperate(){
		List<Record> behaviorlist=null;
		
		behaviorlist = Db.find("select t4.id,t1.id from trt_operatepoint t4 "
				+ "left join trt_useroperatepoint t1 on t1.op_id = t4.id "
				+ "where t1.id is not null GROUP BY t4.id");
		Record re = Db.findFirst("select count(t4.id) as allnum from trt_operatepoint t4");
		
		int a = re.getInt("allnum")-behaviorlist.size();
		
		renderJson(ResultMessage.build(200, "查询成功",a));
	}
	
	/**
	 * 无停留页面
	 * zerowaittime 
	 * author:yusm
	 * @exception
	 * @since 1.0.0
	 */
	public void zerowaittime(){
		//暂时先升级分诊功能时用
		List<Record> behaviorlist = Db.find("SELECT t1.page from trt_waittime t1 where system = 'triage' GROUP BY t1.page");
		List<Record> behaviorlist2 = Db.find("select t4.page from trt_operatepoint t4 where system = 'triage' GROUP BY t4.page");
		
		//最终的查询功能，因为留观已经有停留时间数据的影响所以暂不用
		/*List<Record> behaviorlist = Db.find("SELECT t1.page from trt_waittime t1 GROUP BY t1.page");
		List<Record> behaviorlist2 = Db.find("select t4.page from trt_operatepoint t4 GROUP BY t4.page");*/
		
		int a = behaviorlist2.size()-behaviorlist.size();
		
		renderJson(ResultMessage.build(200, "查询成功",a));
	}
	/*---------2019-3-28--------------用户行为检测代码---结束-----------------------------------------*/
	
	/**
	 * 查询诊室列表
	 */
	public void queryRoomList(){
		List<Record> relist = Db.find("SELECT id,name from stt_room where `status`=1");
		if(relist !=null){
			renderJson(ResultMessage.build(200, "查询成功",relist));
		}else{
			renderJson(ResultMessage.build(400, "查询失败，可能因为网络故障原因，请重新操作"));
		}
	}
	/**
	 * 诊室候诊列表
	 */
	public void queryRoomWaitList(){
		String room_id = getPara("room_id");
		List<Record> relist = Db.find("SELECT * from (SELECT t.*,y.grade_color from (SELECT t2.receivedepartment,t1.`status`,r.room_id room," +
				"t1.id,t1.fullname,IF(t2.finalgrade='',t2.autograde,t2.finalgrade) grade,t2.receivetime,d.td_name from trt_patient t1 left JOIN " +
				"trt_patient_handle t2 on t1.id = t2.p_id LEFT JOIN stt_depart d on t2.dividdepartment=d.td_id LEFT JOIN stt_room_depart r on " +
				"d.td_id=r.depart_id and t2.receivedepartment=r.room_id where (t2.cixu  is null  or t2.cixu=(select max(CAST(b.cixu AS UNSIGNED)) " +
				"from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id  where t1.id = a.id)) and r.room_id=? ) t,stt_yjfjset y " +
				"WHERE y.status= '1' and t.grade=y.ys_id and t.`status`='接诊中' ORDER BY t.receivetime desc LIMIT 1 ) t UNION SELECT * from " +
				"(SELECT t.*,y.grade_color from (SELECT t2.receivedepartment,t1.`status`,r.room_id room,t1.id,t1.fullname,IF(t2.finalgrade='',t2.autograde,t2.finalgrade) " +
				"grade,t2.dividtime,d.td_name from trt_patient t1 left JOIN trt_patient_handle t2 on t1.id = t2.p_id LEFT JOIN stt_depart d on t2.dividdepartment=d.td_id " +
				"LEFT JOIN stt_room_depart r on d.td_id=r.depart_id where (t2.cixu  is null  or t2.cixu=(select max(CAST(b.cixu AS UNSIGNED)) from trt_patient as a " +
				"LEFT JOIN trt_patient_handle as b on a.id=b.p_id  where t1.id = a.id)) and r.room_id=? ) t,stt_yjfjset y WHERE y.status= '1' " +
				"and t.grade=y.ys_id and t.`status`='未接诊' ORDER BY t.grade,t.dividtime LIMIT 9999) tt ",room_id,room_id);
		if(relist !=null){
			renderJson(ResultMessage.build(200, "查询成功",relist));
		}else{
			renderJson(ResultMessage.build(400, "查询失败，可能因为网络故障原因，请重新操作"));
		}
	}
	
	public void queryEncryptionCdkey(){
		String encryption_cd_key = getPara("encryption_cd_key");
		Record r = Db.findFirst("SELECT * from stt_version_control where encryption_cd_key=?",encryption_cd_key);
		if(r !=null){
			renderJson(ResultMessage.build(200, "查询成功",r));
		}else{
			renderJson(ResultMessage.build(400, "查询失败"));
		}
	}
}