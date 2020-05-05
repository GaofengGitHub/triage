package com.chenwei.jfinal.directive;

import java.io.Writer;

import com.jfinal.kit.PropKit;
import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.stat.Scope;

public class SSOPath extends Directive{

	public void exec(Env env,Scope scope,Writer writer) {
		String sso = PropKit.get("ki4soServerHost");
		write(writer,sso);
		return;
		
	}

}
