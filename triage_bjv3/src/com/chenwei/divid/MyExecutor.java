package com.chenwei.divid;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.h2.util.New;

import cn.hutool.http.HttpUtil;

import com.jfinal.kit.PropKit;

public class MyExecutor {
	Map<String, Object> paramMap1 = new HashMap<String, Object>();
	private ExecutorService executor = Executors.newCachedThreadPool() ;
	public void fun() throws Exception {
		executor.submit(new Runnable(){
			@Override
			public void run() {
				 String json = HttpUtil.post(PropKit.get("EcsServerAddress")
							+ "/ecs/sendPatGrade", paramMap1);
					System.out.println("EcsServer:"+json);
			}
		});		
	};
}
