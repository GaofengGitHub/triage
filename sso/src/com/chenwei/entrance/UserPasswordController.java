package com.chenwei.entrance;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.github.ebnew.ki4so.core.service.Ki4soServiceImpl;
import com.github.ebnew.ki4so.core.service.LoginResult;
import com.github.ebnew.ki4so.core.service.LogoutAppServiceImpl;
import com.github.ebnew.ki4so.web.utils.WebConstants;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class UserPasswordController extends Controller {
	private static Logger log = Logger.getLogger(UserPasswordController.class);

	public void index() {
		String user = getPara("user");
		String password = getPara("password");
		Record r = Db.findFirst(" select 1 from stt_user where loginname = ? and password = ? and status = 1 ",user,password);
		Map<String,String> map = new HashMap<String,String>();
		
		if(ObjectUtil.isNotNull(r)){
			map.put("login", "success");
		}else{
			map.put("login", "fail");
		}
		renderJson(map);
		return;
	}
	
	
}