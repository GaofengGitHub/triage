package com.chenwei.sso;

import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.executor.ResultExtractor;
import org.apache.log4j.Logger;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

import com.chenwei.jfinal.ResultMessage;
import com.chenwei.util.MyRequest;
import com.github.ebnew.ki4so.client.handler.AppClientLoginHandler;
import com.github.ebnew.ki4so.client.key.DefaultKeyServiceImpl;
import com.github.ebnew.ki4so.client.session.SessionStorage;
import com.github.ebnew.ki4so.common.utils.StringUtils;
import com.github.ebnew.ki4so.core.authentication.EncryCredential;
import com.github.ebnew.ki4so.core.authentication.EncryCredentialManagerImpl;
import com.github.ebnew.ki4so.core.key.KeyService;
import com.github.ebnew.ki4so.core.key.Ki4soKey;
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.github.ebnew.ki4so.web.utils.WebConstants;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class TriageSSOInterceptor implements Interceptor {
	
	private static Logger log = Logger.getLogger(TriageSSOInterceptor.class);
	
	private static boolean init = false;
	
	/**
	 * 在客户端的session中的用户 信息，避免频繁认证，提高性能。
	 */
	public static final String USER_STATE_IN_SESSION_KEY = "ki4so_client_user_info_session_key";
	
	/**
	 * 将ki4so服务器登出地址设置到request的属性中。
	 */
	public static final String KI4SO_SERVER_LOGOUT_URL = "ki4so_server_logout_url";
	
	/**
	 * 本应用对应的加密key.
	 */
	protected static Ki4soKey ki4soKey;
	
	/**
	 * 秘钥获取服务。
	 */
	protected static KeyService keyService;
	
	/**
	 * 凭据管理器。
	 */
	protected static EncryCredentialManagerImpl encryCredentialManager;
	
	/**
	 * 登录本应用的处理器。
	 */
	protected static AppClientLoginHandler appClientLoginHandler;
	
	/**
	 * 登录本应用处理器类，由此类进行构造一个对象。
	 */
	protected static String appClientLoginHandlerClass;
	protected static String ki4soClientAppId;
	protected static String ki4soServerHost;
	protected static String ki4soServerLoginUrl;
	protected static String ki4soServerLogoutUrl;
	protected static String ki4soServerFetchKeyUrl;
	
	
	
	private static void init(){
		if(init){
			return;
		}
		init = true;
//		ki4soServerHost = PropKit.get("ki4soServerHost");
		ki4soServerHost = PropKit.use("sso.properties").get("ki4soServerHost");
		ki4soClientAppId = PropKit.use("sso.properties").get("ki4soClientAppId");
		
		
		ki4soServerLoginUrl = ki4soServerHost + "login";
		ki4soServerLogoutUrl = ki4soServerHost + "logout";
		ki4soServerFetchKeyUrl = ki4soServerHost + "fetchKey";
		appClientLoginHandlerClass = PropKit.use("sso.properties").get("appClientLoginHandlerClass");
		//构造key服务等相关对象。
		//构造登录本应用的处理器对象。
		if(!StringUtils.isEmpty(appClientLoginHandlerClass)){
			try{
				appClientLoginHandler = (AppClientLoginHandler)Class.forName(appClientLoginHandlerClass).newInstance();
			}catch (Exception e) {
				e.printStackTrace();
			}
		}
		keyService = new DefaultKeyServiceImpl(ki4soServerFetchKeyUrl, ki4soClientAppId);
		encryCredentialManager = new EncryCredentialManagerImpl();
		encryCredentialManager.setKeyService(keyService);
		log.error("the ki4so sever is :"+ ki4soServerHost+", please check this service is ok.");
	}
	
	public void intercept(Invocation ai) {
		
		Controller controller = ai.getController();
		//获取方法名
		String MethodName = ai.getMethodName();
				//白名单
		
		
		init();
		HttpServletResponse servletResponse = (HttpServletResponse)controller.getResponse();
		HttpServletRequest servletRequest = (HttpServletRequest)controller.getRequest();
		
		HttpSession session = servletRequest.getSession();
		String uniqueid = "";
		if(StrUtil.equalsIgnoreCase("sendMessageToUser", MethodName)){
			log.error("receive message");
			
			if(servletRequest.getParameter("uniqueid")!=null){
				//app端 由于是加密了 需要替换为 自己的 request解密
				 servletRequest = new MyRequest(servletRequest);
				 log.error("app access");
				 controller.setHttpServletRequest(servletRequest);
			}
			ai.invoke();
			return;
	}
		
		
		//获取 手机唯一码 如果app端访问 检查 redis 缓存 忽略 cookies 验证
		if(servletRequest.getParameter("uniqueid")!=null){
			//app端 由于是加密了 需要替换为 自己的 request解密
			 servletRequest = new MyRequest(servletRequest);
			 uniqueid = servletRequest.getParameter("uniqueid").toString();
			 Cache bbsCache = Redis.use();
			 if(bbsCache.exists(uniqueid)){
				 log.error("app access");
				 //如果存在 替换 controller 的request
				 controller.setHttpServletRequest(servletRequest);
				 ai.invoke();
				 return;
			 }else{
				 try {
					 PrintWriter out = servletResponse.getWriter();
					 servletResponse.setContentType("application/json; charset=utf-8");  
					 JSONObject responseJSONObject = JSONUtil.parseObj(new ResultMessage(401,"user not login")); //将实体对象转换为JSON Object转换  
			         out.print(responseJSONObject.toString());
			         out.flush();
			         out.close();
					 return;
				} catch (Exception e) {
					// TODO: handle exception
				}
				
			 }
		}
		String key = servletRequest.getRequestURI();
		if(StrUtil.containsAnyIgnoreCase(key, "logout")){
			ai.invoke();
			return;
		}
		
		try{
			servletRequest.setAttribute(KI4SO_SERVER_LOGOUT_URL, ki4soServerLogoutUrl);
			//本地应用未登录。
			if(session.getAttribute(USER_STATE_IN_SESSION_KEY)==null){
				//查找参数中是否存在ki4so_client_ec值，若没有则重定向到登录页面。
				String ki4so_client_ec = getClientEC(servletRequest);
				if(StringUtils.isEmpty(ki4so_client_ec)){
					//跳转到Ki4so登录页面。
					servletResponse.sendRedirect(buildRedirectToKi4soServer(servletRequest));
					return;
				}
				//如果没有key，则重试获取一次。
				if(ki4soKey==null){
					try{
						ki4soKey = keyService.findKeyByAppId(ki4soClientAppId);
					}catch (Exception e) {
						
						log.error("fetch ki4so key info error", e);
					}
				}
				//解密凭据信息。
				EncryCredentialInfo encryCredentialInfo = encryCredentialManager.decrypt(new EncryCredential(ki4so_client_ec));
				if(encryCredentialInfo!=null){
					//检查凭据合法性。
					boolean valid = encryCredentialManager.checkEncryCredentialInfo(encryCredentialInfo);
					//如果合法，则继续其它处理。
					if(valid){
						//设置登录状态到session中。
						session.setAttribute(USER_STATE_IN_SESSION_KEY, encryCredentialInfo);
						//触发登录本应用的处理。
						if(appClientLoginHandler!=null){
							//登录本应用。
							appClientLoginHandler.loginClient(encryCredentialInfo, servletRequest, servletResponse);
						}
						
						//重新定位到原请求，去除EC参数。
						String url = servletRequest.getRequestURL().toString();
						if(!StringUtils.isEmpty(url)){
							//如果请求中存在EC参数，则去除这个参数，重定位。
							if(url.contains(WebConstants.KI4SO_CLIENT_ENCRYPTED_CREDENTIAL_COOKIE_KEY)){
								url = url.substring(0, url.indexOf(WebConstants.KI4SO_CLIENT_ENCRYPTED_CREDENTIAL_COOKIE_KEY));
								//去除末尾的问号。
								if(url.endsWith("?")){
									url = url.substring(0, url.length()-1);
								}
								
								//去除末尾的&符号。
								if(url.endsWith("&")){
									url = url.substring(0, url.length()-1);
								}
							}
						}
						//保存用户和session的关系
						SessionStorage.put(encryCredentialInfo.getUserId(),session);
						//重新定位请求，避免尾部出现长参数。
						servletResponse.sendRedirect(url);
						return;
					}
				}
				//否则凭据信息不合法，跳转到Ki4so登录页面。
				servletResponse.sendRedirect(buildRedirectToKi4soServer(servletRequest));
				return;
			}
			
			//若已经登录过，则直接返回，继续其它过滤器。
			ai.invoke();
			return;
		}
		//处理异常信息。
		catch (Exception e) {
			//否则凭据信息不合法，跳转到Ki4so登录页面。
			e.printStackTrace();
			ai.getController().redirect(buildRedirectToKi4soServer(servletRequest));
			return;
		}
	}
	

	/**
	 * 从客户端参数或者cookie中获取EC值。
	 * @param request http请求对象。
	 * @return EC值。
	 */
	protected static String getClientEC(HttpServletRequest request){
		String ec = null;
		if(request!=null){
			ec = request.getParameter(WebConstants.KI4SO_CLIENT_ENCRYPTED_CREDENTIAL_COOKIE_KEY);
		}
		return ec;
	}
	
	
	protected static String buildRedirectToKi4soServer(HttpServletRequest servletRequest){
		StringBuffer sb = new StringBuffer(ki4soServerLoginUrl);
		if(ki4soServerLoginUrl.contains("?")){
			sb.append("&");
		}
		else{
			sb.append("?");
		}
		sb.append("service=").append(servletRequest.getRequestURL().toString());
		return sb.toString();
	}

	
	
}