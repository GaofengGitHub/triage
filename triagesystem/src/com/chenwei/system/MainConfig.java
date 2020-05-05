package com.chenwei.system;

import java.io.File;

import com.chenwei.hardwaremgmt.HardwareMgmtController;
import com.chenwei.jfinal.directive.Depart;
import com.chenwei.jfinal.directive.DepartId;
import com.chenwei.jfinal.directive.Path;
import com.chenwei.jfinal.directive.RoleId;
import com.chenwei.jfinal.directive.RoleName;
import com.chenwei.jfinal.directive.SSOPath;
import com.chenwei.jfinal.directive.UserId;
import com.chenwei.jfinal.directive.UserName;
import com.chenwei.medicaltextmgmt.MedicalTextMgmtController;
import com.chenwei.medicaltextmgmt.YJFZPJBController;
import com.chenwei.rolemgmt.ModuleLimitsMgmtController;
import com.chenwei.rolemgmt.RightMgmtController;
import com.chenwei.rolemgmt.RoleMgmtController;
import com.chenwei.rolemgmt.UserMgmtController;
import com.chenwei.sso.AuthInterceptor;
import com.chenwei.sso.SSOInterceptor;
import com.chenwei.sso.SSOLogoutInterceptor;
import com.chenwei.superadminmgmt.SuperAdminMgmtController;
import com.chenwei.systemmgmt.SystemMgmtController;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.redis.RedisPlugin;
import com.jfinal.render.RenderManager;
import com.jfinal.template.Engine;

public class MainConfig extends JFinalConfig {

	/**
	 * 配置常量
	 */
	Routes routes;
	public void configConstant(Constants me) {
		// 加载少量必要配置，随后可用PropKit.get(...)获取值
		String path = PathKit.getWebRootPath();
		path = path.substring(0, path.lastIndexOf("\\") + 1);
		String path1 = path.replace("\\", "/");
		String path2 = path.replace("\\", "/");
		path1 += "sso/WEB-INF/classes/conf.properties";
		path2 += "ssoserver/WEB-INF/classes/conf.properties";

		File file = new File(path1);

		if (file.exists()) {
			PropKit.use(file);
		} else {
			PropKit.use(new File(path2));
		}
		
		me.setDevMode(true);
		// RequiresGuest，RequiresAuthentication，RequiresUser验证异常，返回HTTP401状态码
		me.setErrorView(401, "/WEB-INF/page/404.html");
		// RequiresRoles，RequiresPermissions授权异常,返回HTTP403状态码
		me.setErrorView(403, "/WEB-INF/page/404.html");
		// me.setError404View("/WEB-INF/page/404.html");
		RenderManager.me().setRenderFactory(new ErrorRenderFactory());
	}

	/**
	 * 配置路由
	 */
	public void configRoute(Routes me) {
		me.add("/", MainController.class, "/WEB-INF/page");
		me.add("/systemmgmt", SystemMgmtController.class, "/WEB-INF/page/systemmgmt");
		me.add("/rolemgmt", RoleMgmtController.class, "/WEB-INF/page/rolemgmt");
		me.add("/usermgmt", UserMgmtController.class, "/WEB-INF/page/rolemgmt");
		me.add("/rightmgmt", RightMgmtController.class, "/WEB-INF/page/rolemgmt");
		me.add("/modulelimitsmgmt", ModuleLimitsMgmtController.class, "/WEB-INF/page/rolemgmt");
		me.add("/hardwaremgmt", HardwareMgmtController.class, "/WEB-INF/page/hardwaremgmt");
		me.add("/medicaltextmgmt", MedicalTextMgmtController.class, "/WEB-INF/page/medicaltextmgmt");
		me.add("/yjfzpjb", YJFZPJBController.class, "/WEB-INF/page/medicaltextmgmt");
		me.add("/superadminmgmt", SuperAdminMgmtController.class, "/WEB-INF/page/superadminmgmt");
	}

	public void configEngine(Engine me) {
		me.addDirective("path", new Path());
		me.addDirective("userName", new UserName());
		me.addDirective("depart", new Depart());
		me.addDirective("sso", new SSOPath());
		me.addDirective("roleName", new RoleName());
		me.addDirective("userId", new UserId());
		me.addDirective("departId", new DepartId());
		me.addDirective("roleId", new RoleId());
		
		me.addSharedFunction("/WEB-INF/page/layout.html");
	}

	public static DruidPlugin createDruidPlugin() {
		return new DruidPlugin(PropKit.get("jdbcUrl_main"),
		PropKit.get("user_main"), PropKit.get("password_main").trim(),
		PropKit.get("driverClass"));
	}

	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins me) {
		// 配置C3p0数据库连接池插件
		DruidPlugin druidPlugin = createDruidPlugin();
		druidPlugin.setValidationQuery("select 1");
		druidPlugin.setTestWhileIdle(true);
		druidPlugin.setTimeBetweenEvictionRunsMillis(28000);
		me.add(druidPlugin);
		
		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin("main", druidPlugin);
		arp.setBaseSqlTemplatePath(PathKit.getRootClassPath());
		
		arp.addSqlTemplate("com/chenwei/rolemgmt/role.sql");
		me.add(arp);
		
		// 用于缓存news模块的redis服务
	    RedisPlugin sessionRedis = new RedisPlugin("session", PropKit.get("redisServer"));
	    me.add(sessionRedis);
	}

	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me) {
		me.add(new SSOInterceptor());
		me.add(new SSOLogoutInterceptor());
		me.add(new AuthInterceptor());
		me.add(new SessionInViewInterceptor());
	}
	
	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me) {
	}

}
