package com.chenwei.sso;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import cn.hutool.core.util.StrUtil;

import com.github.ebnew.ki4so.client.handler.AppClientLogoutHandler;
import com.github.ebnew.ki4so.client.session.SessionStorage;
import com.github.ebnew.ki4so.common.utils.StringUtils;
import com.github.ebnew.ki4so.web.utils.WebConstants;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

public class TriageSSOLogoutInterceptor implements Interceptor {
	
	private static Logger log = Logger.getLogger(TriageSSOLogoutInterceptor.class);
	
	private static boolean init = false;
	
	/**
	 * 在客户端的session中的用户信息，避免频繁认证，提高性能。
	 */
	public static final String USER_STATE_IN_SESSION_KEY = "ki4so_client_user_info_session_key";
	
	/**
	 * 将ki4so服务器登出地址设置到request的属性中。
	 */
	public static final String KI4SO_SERVER_LOGOUT_URL = "ki4so_server_logout_url";
	
	
	private static final String SESSIONID_IS_NULL="send userId is null";
	
	private static final String SESSIONID_IS_NOT_CONTATINS ="send userId is not be included for Client ";
	
	/**
	 * 登录本应用处理器类，由此类进行构造一个对象。
	 */
	protected static String appClientLogoutHandlerClass = "com.github.ebnew.ki4so.app.custom.Ki4soAppClientLogoutHandlerImpl";

	/**
	 * 登录本应用的处理器。
	 */
	protected static AppClientLogoutHandler appClientLogoutHandler;
	
	
	
	private static void init(){
		if(init){
			return;
		}
		init = true;
		
		//构造登录本应用的处理器对象。
		if(!StrUtil.isEmpty(appClientLogoutHandlerClass)){
			try{
				appClientLogoutHandler = (AppClientLogoutHandler)Class.forName(appClientLogoutHandlerClass).newInstance();
			}catch (Exception e) {
			}
		}
	}
	
	public void intercept(Invocation ai) {
		Controller controller = ai.getController();
		
		HttpServletResponse servletResponse = (HttpServletResponse)controller.getResponse();
		HttpServletRequest servletRequest = (HttpServletRequest)controller.getRequest();

		String key = servletRequest.getRequestURI();
		if(!StrUtil.containsAnyIgnoreCase(key, "logout")){
			ai.invoke();
			return;
		}
		
		init();
		try{
			//获得userId参数值。
			String userId = servletRequest.getParameter(WebConstants.USER_ID_PARAM_NAME);
			if(StringUtils.isEmpty(userId)){
				log.error(SESSIONID_IS_NULL);
				sendError(servletResponse,SESSIONID_IS_NULL);
				return;
			}
			if(!SessionStorage.containsKey(userId)){
				log.error(SESSIONID_IS_NOT_CONTATINS);
				sendError(servletResponse,SESSIONID_IS_NOT_CONTATINS);
				return;
			}
			HttpSession session = SessionStorage.get(userId);
			//本地应用已经登录，则进行登出处理。
			if(session!=null && session.getAttribute(USER_STATE_IN_SESSION_KEY)!=null){
				if(session.getAttribute(USER_STATE_IN_SESSION_KEY)!=null){
					//清除session中的值。
					session.setAttribute(USER_STATE_IN_SESSION_KEY, null);
				}
				
				//若本定应用处理器不为空。
				if(appClientLogoutHandler!=null){
					//登出本应用。
					appClientLogoutHandler.logoutClient(servletRequest, servletResponse, userId);
				}
				
				//将session设置过期
				session.setMaxInactiveInterval(0);
				//移除session信息
				SessionStorage.remove(userId);
			}
			//响应登录结果。
			sendResponse(servletResponse);
		}catch (Exception e) {
			//响应登录结果。

			sendError(servletResponse);
			
		}
	}
	
	

	private void sendResponse(HttpServletResponse response){
		response.setContentType("text/javascript;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter outhtml;
		try {
			outhtml = response.getWriter();
			outhtml.print("{result:true}");
			outhtml.close();
		} catch (IOException e) {
			log.error("send sendResponse error", e);
		} 
	}

	private void sendError(HttpServletResponse response){
		try {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		} catch (IOException e) {
			log.error("send response error", e);
		} 
	}
	
	private void sendError(HttpServletResponse response,String msg){
		try {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,msg);
		} catch (IOException e) {
			log.error("send response error", e);
		} 
	}
	
}