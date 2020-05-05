package com.chenwei.jfinal;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

public class MainInterceptor implements Interceptor {
	public void intercept(Invocation ai) {
		Controller controller = ai.getController();
		String path = controller.getRequest().getServletPath();

		if("/".equals(path)){
			controller.redirect("/divid");
		}
	}
}