package com.chenwei.entrance;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import cn.hutool.core.util.StrUtil;

import com.chenwei.sso.DatabaseAuthenticationHandler;
import com.chenwei.sso.handler.CompositeCredentialResolver;
import com.chenwei.sso.handler.EncryCredentialResolver;
import com.chenwei.sso.handler.UsernamePasswordCredentialResolver;
import com.github.ebnew.ki4so.core.app.App;
import com.github.ebnew.ki4so.core.app.AppServiceImpl;
import com.github.ebnew.ki4so.core.authentication.Authentication;
import com.github.ebnew.ki4so.core.authentication.AuthenticationManagerImpl;
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
import com.github.ebnew.ki4so.core.service.Ki4soServiceImpl;
import com.github.ebnew.ki4so.core.service.LoginResult;
import com.github.ebnew.ki4so.core.service.LogoutAppServiceImpl;
import com.github.ebnew.ki4so.web.utils.WebConstants;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;

public class LogoutController extends Controller {
	private static Logger log = Logger.getLogger(LogoutController.class);
	
	public void index() {
		log.error("enter logout action");
				
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		
		//获取是否是临时退出标识  false为临时退出，null为正常退出
        String jiaoban = getPara("jiaoban");
		
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
		
		//获得service.
		String service = request.getParameter(WebConstants.SERVICE_PARAM_NAME);
		//解析用户凭据。
		Credential credential = credentialResolver.resolveCredential(request);
		
		//获取登陆名
		LoginResult result = ki4soService.login(credential);
		Authentication authentication = result.getAuthentication();
		String userName = authentication.getPrincipal().getId();
		
		//调用servie统一登出所有的应用。
		//登出其他应用
		Collection<App> apps = appService.findKi4soApps();
		
		for(App one:apps){
			if(one.isKi4soServer()){
				continue;
			}
			ki4soService.logout(credential, one.getHost());
		}
		
		//清除cookie值。
		Cookie[] cookies = request.getCookies();
		if(cookies!=null && cookies.length>0){
			for(Cookie cookie:cookies){
				if(WebConstants.KI4SO_SERVER_ENCRYPTED_CREDENTIAL_COOKIE_KEY.equals(cookie.getName())){
					//设置过期时间为立即。
					cookie.setMaxAge(0);
					response.addCookie(cookie);
					log.error("clear up the cookie "+WebConstants.KI4SO_SERVER_ENCRYPTED_CREDENTIAL_COOKIE_KEY);
				}
			}
		}
		
		if(!StrUtil.isEmpty(service)){
			//跳转到service对应的URL地址
			redirect(service);
			request.getSession().setAttribute("ki4so_client_user_info_session_key",null);
		}else{
			//正常退出时，修改last_login_time为当前退出时间
			if(jiaoban==null){
				Db.update("update stt_user set last_login_time = now() where loginname = ?",userName);
			}	
			//返回默认的登出成功页面。
			redirect("/login");
		}
		return;
	}
	
	
	
}