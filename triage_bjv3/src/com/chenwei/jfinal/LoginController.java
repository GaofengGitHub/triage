package com.chenwei.jfinal;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;

import com.cniia.common.util.StrUtil;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class LoginController extends Controller {
	public void index() {
		String user = getPara("user");
		String password = getPara("password");
		if (user == null || "".equals(user) || password == null
				|| "".equals(password)) {
			render("login.html");
		} else {
			/**
			UsernamePasswordToken token = new UsernamePasswordToken(user,
					StrUtil.md5(password));
			Subject subject = SecurityUtils.getSubject();
			// 进行用用户名和密码验�?,如果验证不过会throw exception
			subject.login(token);
			*/

			Record r = Db.findFirst(
					"select * from t_user where username = ? and password = ?",
					user, StrUtil.md5(password));
			if (r != null) {
				setSessionAttr("user", r.getStr("username"));
				setSessionAttr("role", r.getStr("role"));
				// Map<String, Object> m = new HashMap<String, Object>();
				// m.put("state", true);
				// m.put("role", r.getStr("role"));
				renderJson(true);
			} else {
				// Map<String,Object> m = new HashMap<String,Object>();
				// m.put("state", false);
				// m.put("msg", "用户名或密码错误�?");
				renderJson(false);
			}
		}
	}

	public void logout() {
		removeSessionAttr("user");
		redirect("/login");
	}

}
