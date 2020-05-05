package com.chenwei.entrance;

import org.apache.log4j.Logger;

import com.github.ebnew.ki4so.core.key.KeyService;
import com.github.ebnew.ki4so.core.key.KeyServiceImpl;
import com.jfinal.core.Controller;

public class FetchKeyController extends Controller {
	private static Logger log = Logger.getLogger(FetchKeyController.class);
	public void index() {
		log.error("====================fetchKey"+getPara("appId"));
		KeyService keyService = new KeyServiceImpl();
		//renderJson(keyService.findKeyByAppId(getPara("appId")).toString());
		//renderJson("{'keyId':'2','appId':'1001','value':'a4323##@0D#@','keyPath':'E:/'}");
		renderJson(keyService.findKeyByAppId(getPara("appId")));
		return;
	}
}