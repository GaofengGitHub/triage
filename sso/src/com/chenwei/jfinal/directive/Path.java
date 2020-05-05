package com.chenwei.jfinal.directive;

import java.io.Writer;

import com.jfinal.core.JFinal;
import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.stat.Scope;

public class Path extends Directive{

	public void exec(Env env,Scope scope,Writer writer) {
		write(writer,JFinal.me().getContextPath());
	}

}
