package com.chenwei.entrance;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

import com.chenwei.jfinal.ResultMessage;
import com.chenwei.tool.MyRequest;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;

public class MainInterceptor implements Interceptor {
	private static Logger log = Logger.getLogger(MainInterceptor.class);
	
	public void intercept(Invocation ai) {
		Controller controller = ai.getController();
	
		HttpServletResponse servletResponse = (HttpServletResponse)controller.getResponse();
		HttpServletRequest servletRequest = (HttpServletRequest)controller.getRequest();
		
		String uniqueid = "";
		//获取 手机唯一码 如果app端访问 检查 redis 缓存 忽略 cookies 验证
		if(servletRequest.getParameter("uniqueid")!=null){
			
			
		
			//app端 由于是加密了 需要替换为 自己的 request解密
			servletRequest = new MyRequest(servletRequest);
			//如果存在 替换 controller 的request
			controller.setHttpServletRequest(servletRequest);
			String MethodName = ai.getMethodName();
			//白名单
			
			if("applogin".equalsIgnoreCase(MethodName)){
				ai.invoke();
				return;
			}
			 uniqueid = servletRequest.getParameter("uniqueid").toString();
			 System.out.println("uniqueid=====1111===="+uniqueid+"============");
			 Cache bbsCache = Redis.use();
			 if(bbsCache.exists(uniqueid)){
				 log.error("app access");
				
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
		}else{
			 ai.invoke();
			 return;
		}
	}
}