package com.chenwei.rolemgmt;

import org.apache.log4j.Logger;

import com.jfinal.core.Controller;

public class ModuleLimitsMgmtController extends Controller {
	private static Logger log = Logger.getLogger(RoleMgmtController.class);

	public void index() {
		render("main.html");
	}
	
	public void departTree() {
		render("main.html");
	}
	
	public void linchangTree() {
		render("main.html");
	}
	
	public void systemTree() {
		render("main.html");
	}
}
