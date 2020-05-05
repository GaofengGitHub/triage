package com.chenwei.jfinal.directive;

import java.io.Writer;
import java.util.List;


import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;
import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.stat.Scope;

public class Version extends Directive{

	public void exec(Env env,Scope scope,Writer writer) {
		 Cache bbsCache = Redis.use();
		 String version = (String)bbsCache.get("version");
		 String version_path = "";
		 List<Record> list = Db.find("select * from stt_version_detail where version_grade=?",version);
		 for(Record  r : list){
			 version_path += r.getStr("version_path")+",";
		 }
		 if(version_path.length()>1){
			 version_path = version_path.substring(0,version_path.length()-1);
		 }
		 write(writer,version_path);
		return;
	}
}
