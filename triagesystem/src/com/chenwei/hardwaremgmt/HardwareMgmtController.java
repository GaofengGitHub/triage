package com.chenwei.hardwaremgmt;

import org.apache.log4j.Logger;

import com.jfinal.core.Controller;

public class HardwareMgmtController extends Controller {
	private static Logger log = Logger.getLogger(HardwareMgmtController.class);

	public void index() {
		setAttr("biaoti","hardwaremgmt");
		render("main.html");
	}
	
}
