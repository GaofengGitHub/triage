package com.chenwei.jfinal;
import java.io.File;

import com.chenwei.card.CardController;
import com.chenwei.divid.TriageDividController;
import com.chenwei.events.EventsController;
import com.chenwei.historyrecord.HistoryRecordController;
import com.chenwei.index.IndexController;
import com.chenwei.jfinal.directive.ContextPath;
import com.chenwei.jfinal.directive.Depart;
import com.chenwei.jfinal.directive.DepartId;
import com.chenwei.jfinal.directive.Path;
import com.chenwei.jfinal.directive.RoleId;
import com.chenwei.jfinal.directive.RoleName;
import com.chenwei.jfinal.directive.SSOPath;
import com.chenwei.jfinal.directive.UserId;
import com.chenwei.jfinal.directive.UserName;
import com.chenwei.jfinal.directive.Version;
import com.chenwei.jfinal.plugins.Quartz;
import com.chenwei.jfinal.plugins.QuartzPlugin;
import com.chenwei.qualitymanage.QualityManageController;
import com.chenwei.report.ReportController;
import com.chenwei.signout.SignOutController;
import com.chenwei.sso.TriageAuthInterceptor;
import com.chenwei.sso.TriageSSOInterceptor;
import com.chenwei.sso.TriageSSOLogoutInterceptor;
import com.chenwei.websocket.TriageWebsocketController;
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
import com.jfinal.template.Engine;

public class MainConfig extends JFinalConfig{

	/**
	 * 配置基础文件
	 */
	public void configConstant(Constants me) {
		// 加载少量必要配置，随后可用PropKit.get(...)获取值
		
		//获取根目录 2种路径都考虑到
		String path = PathKit.getWebRootPath();
		path = path.substring(0,path .lastIndexOf("\\")+1);
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
		
		//设置开发模式
		me.setDevMode(true);
		
		
	}

	/**
	 * 配置路由
	 */
	public void configRoute(Routes me) {
		//me.add("/test", TestController.class);
		me.add("/", MainController.class, "/WEB-INF/page/");
		me.add("/index", IndexController.class, "/WEB-INF/"+PropKit.get("version")+"/index");
		me.add("/divid", TriageDividController.class, "/WEB-INF/"+PropKit.get("version")+"/divid");
		me.add("/card", CardController.class, "/WEB-INF/"+PropKit.get("version")+"/card");
		me.add("/report", ReportController.class, "/WEB-INF/"+PropKit.get("version")+"/report");
		me.add("/historyrecord", HistoryRecordController.class, "/WEB-INF/"+PropKit.get("version")+"/historyrecord");
		me.add("/qualitymanage", QualityManageController.class, "/WEB-INF/"+PropKit.get("version")+"/qualitymanage");
		me.add("/signout", SignOutController.class, "/WEB-INF/"+PropKit.get("version")+"/signout");	
		me.add("/events", EventsController.class, "/WEB-INF/"+PropKit.get("version")+"/events");
		me.add("/mes", TriageWebsocketController.class);
	}
	
	public static DruidPlugin createDruidPlugin() {
		//System.out.println(PropKit.get("user_main"));
		return new DruidPlugin(PropKit.get("jdbcUrl_main"),
				PropKit.get("user_main"), PropKit.get("password_main").trim(),
				PropKit.get("driverClass"));
	}
	
	public static DruidPlugin createDruidPlugin2() {
		DruidPlugin druidPlugin = new DruidPlugin(PropKit.get("jdbcUrl_main"),
				PropKit.get("user_main"), PropKit.get("password_main").trim(),
				PropKit.get("driverClass"));
		druidPlugin.setInitialSize(5);  
        druidPlugin.setMinIdle(5);  
        druidPlugin.setMaxActive(20);  
        druidPlugin.setMaxWait(20000);  
        druidPlugin.setTimeBetweenEvictionRunsMillis(20000);  
        return druidPlugin;
		
	}

	@Override
	public void configEngine(Engine me) {
		me.addDirective("path", new Path());
		me.addDirective("userName", new UserName());
		me.addDirective("depart", new Depart());
		me.addDirective("sso", new SSOPath());
		me.addDirective("roleName", new RoleName());
		me.addDirective("userId", new UserId());
		me.addDirective("departId", new DepartId());
		me.addDirective("roleId", new RoleId());
		me.addDirective("version", new Version());
		me.addSharedFunction("/WEB-INF/page/layout.html");
		me.addSharedFunction("/WEB-INF/bj/layout.html");
		
	}
	/**
	 * 配置插件
	 */
	@Override
	public void configPlugin(Plugins me) {
		// TODO Auto-generated method stub
		// 配置C3p0数据库连接池插件
		DruidPlugin druidPlugin = createDruidPlugin();
		
		druidPlugin.setValidationQuery("select 1");
		druidPlugin.setTestWhileIdle(true);
		druidPlugin.setTimeBetweenEvictionRunsMillis(28000);
		me.add(druidPlugin);
		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin("main", druidPlugin);
		arp.setBaseSqlTemplatePath(PathKit.getRootClassPath());
		
		arp.addSqlTemplate("com/chenwei/index/index.sql");
		arp.addSqlTemplate("com/chenwei/divid/divid.sql");
		arp.addSqlTemplate("com/chenwei/events/events.sql");
		arp.addSqlTemplate("com/chenwei/card/card.sql");
		me.add(arp);
		
		  // 用于缓存news模块的redis服务
//	    RedisPlugin sessionRedis = new RedisPlugin("session", PropKit.get("redisServer"),"密码");
		RedisPlugin sessionRedis = new RedisPlugin("session", PropKit.get("redisServer"));
	    me.add(sessionRedis);
	    
	    
	    Quartz q = new Quartz();
        q.setJobsFile("jobs.properties");
        QuartzPlugin quartzPlugin = new  QuartzPlugin(q);
        me.add(quartzPlugin);
	}

	@Override
	public void configInterceptor(Interceptors me) {
		me.add(new TriageSSOInterceptor());
		me.add(new TriageSSOLogoutInterceptor());
		me.add(new TriageAuthInterceptor());
		me.add(new SessionInViewInterceptor());
	}

	@Override
	public void configHandler(Handlers me) {		
	}
	

}
