package com.chenwei.jfinal.directive;

import java.io.Writer;

import javax.servlet.http.HttpSession;

import com.github.ebnew.ki4so.core.model.EncryCredentialInfo;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;
import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.stat.Scope;

public class UserName extends Directive{

	public void exec(Env env,Scope scope,Writer writer) {
		 HttpSession session = (HttpSession) scope.get("session");
		 String userName =  ((EncryCredentialInfo)session.getAttribute("ki4so_client_user_info_session_key")).getUserId();
		 Cache bbsCache = Redis.use();
		 String info = (String)bbsCache.get(userName);
		 write(writer,info.split("\\|")[1]);
		return;
	}

}
