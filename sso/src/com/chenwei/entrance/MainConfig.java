package com.chenwei.entrance;

import com.chenwei.jfinal.ErrorRenderFactory;
import com.chenwei.jfinal.directive.Path;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.redis.RedisPlugin;
import com.jfinal.render.RenderManager;
import com.jfinal.template.Engine;
import com.jfinal.template.source.ClassPathSourceFactory;

public class MainConfig extends JFinalConfig {

	/**
	 * 配置常量
	 */
	public void configConstant(Constants me) {
		// 加载少量必要配置，随后可用PropKit.get(...)获取值
		PropKit.use("conf.properties");
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
		me.add("/login", LoginController.class, "/WEB-INF/page/login");
		me.add("/logout", LogoutController.class, "/WEB-INF/page/login");
		me.add("/fetchKey", FetchKeyController.class);
		me.add("/depart", DepartController.class);
		me.add("/userPassword", UserPasswordController.class);
		
		
	}

	public void configEngine(Engine me) {
		me.addDirective("path", new Path());
	}

	public static DruidPlugin createDruidPlugin() {
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

	
	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins me) {
		// 配置C3p0数据库连接池插件
		DruidPlugin druidPlugin = createDruidPlugin();
		me.add(druidPlugin);

		// 配置ActiveRecord插件
		ActiveRecordPlugin arp = new ActiveRecordPlugin("main", druidPlugin);
		
		arp.setBaseSqlTemplatePath(PathKit.getRootClassPath());
		arp.getEngine().setSourceFactory(new ClassPathSourceFactory());
		me.add(arp);
		
		  // 用于缓存news模块的redis服务
	    RedisPlugin sessionRedis = new RedisPlugin("session", PropKit.get("redisServer"));
	    me.add(sessionRedis);
	}

	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me) {
		me.add(new MainInterceptor());
	}

	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me) {
	}

}
