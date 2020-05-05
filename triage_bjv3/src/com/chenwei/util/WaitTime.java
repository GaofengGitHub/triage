package com.chenwei.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.chenwei.jfinal.IdWorker;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public  class WaitTime {
	
	/**
	 * 新增操作记录
	 * insertOperationRecord 
	 * void
	 * @exception
	 * @since 1.0.0
	 * id:主键id
	 * page:页面
	 * pagename:页面描述
	 * userid:登录者id
	 * role_id:登陆者角色
	 * starttime:开始时间
	 * endtime:结束时间
	 */
	public static String insertWaitTime(String id,String page,String pagename,String userid,String roleid) {
		String waitid = "";
		String system =  PropKit.get("TriagePath");
		
//		String system =  PropKit.use("conf.properties").get("TriagePath");
		if(id==null || "".equals(id)){
			//页面第一次计时开始
			waitid = IdWorker.nextId();
			Db.update(Db.getSql("index.insertWaitTime"),waitid,page,pagename,userid,roleid,new Date(),null,null,"",system);
		}else{
			Record re = Db.findFirst(Db.getSql("index.queryWaitTimeByWaitId"),id);
			if(re!=null){
				//用户刷新当前页面，页面停留时间不重新计时
				if(!re.getStr("page").equals(page)){
					String starttime = re.get("starttime")+"";
					Date date2 = new Date();
					String waittime = "";
					if(starttime!=null && !"".equals(starttime)){
			        	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			        	try {
							Date date1 = sdf.parse(starttime);
							long diff = date2.getTime() - date1.getTime();//这样得到的差值是毫秒级别  
					        /*long minutes = diff / (1000 * 60); 
					        waittime = minutes+"";*/
							long second = diff / (1000); 
					        waittime = second+"";
						} catch (ParseException e) {
							e.printStackTrace();
						}
			        }
					int a= Db.update(Db.getSql("index.updWaitTime"),date2,waittime,id);
					//重新开始下一个页面的计时
					if(a>0){
						waitid = IdWorker.nextId();
						Db.update(Db.getSql("index.insertWaitTime"),waitid,page,pagename,userid,roleid,new Date(),null,null,"",system);
					}
				}
			}
	    }
		return waitid;
	}
}
