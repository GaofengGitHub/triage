package com.chenwei.jfinal;

import org.apache.log4j.Logger;


import com.jfinal.core.Controller;

public class MainController extends Controller {

	private static Logger log = Logger.getLogger(MainController.class);

	public void index() {
		redirect("/index");
	}
	
}