package com.chenwei.system;

import com.jfinal.core.Controller;

public class MainController extends Controller {

	public void index(){
		redirect("/systemmgmt");
	}
	public void error(){
		render("error.html");
	}
}