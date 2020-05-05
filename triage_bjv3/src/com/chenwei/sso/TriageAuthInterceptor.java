package com.chenwei.sso;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;

import com.chenwei.jfinal.ResultMessage;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class TriageAuthInterceptor implements Interceptor {
	
	private static Logger log = Logger.getLogger(TriageAuthInterceptor.class);
	
	private static boolean init = false;
	
	public void intercept(Invocation ai) {
		Controller controller = ai.getController();
		
		String MethodName = ai.getMethodName();
		//白名单
		if(StrUtil.equalsIgnoreCase("sendMessageToUser", MethodName)){
			log.error("receive message");
			ai.invoke();
			return;
		}
		
		
		HttpServletResponse servletResponse = (HttpServletResponse)controller.getResponse();
		HttpServletRequest servletRequest = (HttpServletRequest)controller.getRequest();
		String uniqueid = "";
		//获取 手机唯一码
		if(servletRequest.getParameter("uniqueid")!=null){
			 uniqueid = servletRequest.getParameter("uniqueid").toString();
			 Cache bbsCache = Redis.use();
			 if(bbsCache.exists(uniqueid)){
				 ai.invoke();
				 return;
			 }
		}
		HttpSession session = servletRequest.getSession();
		Object authInit = session.getAttribute("authInit");
		//权限未加载，加载权限
		if(ObjectUtil.isNull(authInit) ){
			String userName = "";
		
			userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
			
			//查找用户的系统访问权限
			String userId = null;
			Record r1 = Db.findFirst("select * from stt_user a where a.loginname = ? ", userName);
			if(ObjectUtil.isNotNull(r1)){
				userId = r1.getStr("tu_id");
			}
			
			List<String> authList = new ArrayList<String>();

			StringBuffer sb2 = new StringBuffer();
			sb2.append(" SELECT stt_role.tr_id AS roleid,stt_role.role_name AS rolename,stt_depart.td_id AS departid,stt_depart.td_name AS departname ");
			sb2.append(" FROM stt_role,stt_depart,stt_user,stt_userdepartrole ");
			sb2.append(" WHERE stt_user.tu_id = stt_userdepartrole.tu_id  ");
			sb2.append(" 	AND stt_role.tr_id=stt_userdepartrole.tr_id  ");
			sb2.append(" 	AND stt_depart.td_id=stt_userdepartrole.td_id  ");
			sb2.append(" 	AND stt_depart.status=1 AND stt_user.tu_id = ? ");
			//根据用户ID查角色
			List<Record> r2 = Db.find(sb2.toString(),userId);
			
			//根据角色查找角色权限并且获取该用户的权限列表
			StringBuffer sb3 = new StringBuffer();
			sb3.append(" SELECT stt_right.tr_id AS rightid,stt_right.right_name AS rightname,stt_right.url AS righturl ");
			sb3.append(" FROM  ");
			sb3.append(" stt_right,stt_roleright,stt_role  ");
			sb3.append(" WHERE stt_right.tr_id = stt_roleright.tri_id AND ");
			sb3.append(" stt_role.tr_id = stt_roleright.tro_id AND stt_role.tr_id= ?");

			for(Record r22:r2){
				List<Record> r33 = Db.find(sb3.toString(),r22.getStr("roleid"));
				for(Record r333:r33){
					String rightUrl = r333.getStr("righturl");
					if(StrUtil.isNotBlank(rightUrl) && !authList.contains(rightUrl)){
						authList.add(rightUrl);
					}
					
				}
			}
			session.setAttribute("authInit", true);
			session.setAttribute("authInit", true);
			
			session.setAttribute("authList", authList);
		}
		//权限加载完成
		boolean accessDenied = true; 
		List<String> authList = (List<String>)session.getAttribute("authList");
		String uri = servletRequest.getRequestURI();
		//将URL分解
		//如果是一级页面，暂时放开
		String[] urls = uri.substring(1).split("/");
		if(urls.length == 1){
			accessDenied = false;
		}else{
			if(authList.contains(urls[0] + "." + urls[1])){
				accessDenied = false;
			}
		}
	
		if(accessDenied){
			ai.getController().renderJson(new ResultMessage(402, "无用户权限"));
			return;
		}
		
		ai.invoke();
	}
}