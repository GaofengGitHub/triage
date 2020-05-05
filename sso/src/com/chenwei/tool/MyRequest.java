package com.chenwei.tool;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import cn.hutool.core.codec.Base64;


public class MyRequest extends HttpServletRequestWrapper {

	public MyRequest(HttpServletRequest request) {
		super(request);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getParameter(String name) {
		// TODO Auto-generated method stub
		//解密
		String value = Base64.decodeStr(super.getParameter(name));
		return value;
	}

	
}
