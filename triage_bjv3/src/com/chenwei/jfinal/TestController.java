package com.chenwei.jfinal;

import com.jfinal.core.Controller;

public class TestController  extends Controller{
	
	public void index() {
		renderText("Hello JFinal World.");
	}
}
