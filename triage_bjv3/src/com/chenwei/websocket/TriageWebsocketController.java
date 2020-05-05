package com.chenwei.websocket;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;








import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import com.chenwei.jfinal.IdWorker;
import com.chenwei.jfinal.ResultMessage;
import com.chenwei.util.Jpush;
import com.jfinal.core.Controller;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpUtil;
import cn.jpush.api.JPushClient;

public class TriageWebsocketController extends Controller {

	private static Logger log = Logger.getLogger(TriageWebsocketController.class);
	

	//接收其他系统发送的信息，然后对本系统进行操作
	public void sendMessageToUser(){
		//要进行的方法
		String method = getPara("method");
		//发送给谁  all 就是 全部登录用户
		String user = getPara("user");
		
		if(StrUtil.equals("RF_UnreciveTable",method)){
			if(StrUtil.equals("all",user)){
				WebsocketPool.sendMessageToAll(method);
				//增加推送至APP,liuxj20181224
				String isJpush = PropKit.get("isJpush");
				if(isJpush.equals("0")){
					Jpush.pushToAndroid(method, "有新增抢救患者，请查看");
				}
			}
		}else if(StrUtil.equals("SH_CallMes",method)) {
			if(StrUtil.equals("all",user)){
				WebsocketPool.sendMessageToAll(method);
			}
		}
		
		renderJson(ResultMessage.build(200, "查询成功"));
	}
	
	
    
}