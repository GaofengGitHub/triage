package com.chenwei.medicaltextmgmt;

import org.apache.log4j.Logger;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;

import com.chenwei.jfinal.ResultMessage;
import com.chenwei.tool.IdWorker;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

public class MedicalTextMgmtController extends Controller {
	private static Logger log = Logger.getLogger(MedicalTextMgmtController.class);

	public void index() {
		setAttr("biaoti","medicaltextmgmt");
		render("main.html");
	}
	public void yjfzpjbmgmt() {
		render("yjfzpjbmgmt-index.html");
	}
	
	public void editormain(){
		render("editor/index.html");
	}
	
	public void toeditor(){
		
		String id = getPara("id");
		if(StrUtil.isNotBlank(id)){
			Record l = Db.findById("stt_editor", id);
			setAttr("editor", l);
		}
		setAttr("id",id);
		
		render("editor/editor.html");
	}
	
	public void queryEditor() {
		ResultMessage result = new ResultMessage();
		int page = getParaToInt("page");
		int rows = getParaToInt("rows");
		
		Page<Record> ls = null;
		
	   	ls = Db.paginate(page,rows, 
	   				" select id,type,name ",
	   				" from stt_editor order by id ");
		result.setStatus(200);
		result.setTotal(ls.getTotalRow());
		result.setRows(ls.getList());
		renderJson(result);
		return;
	}
	
	
	public void saveEditor(){
		String id = getPara("id");
        String editor_type = getPara("editor_type");
        String editor_name = getPara("editor_name");
        String content = getPara("content");
        int i = 0;
		if(StrUtil.isBlank(id)){
			id = IdWorker.nextId();
			i = Db.update(" insert into stt_editor(type,name,content) values(?,?,?)",
					editor_type,editor_name,content);
		}else{
			i = Db.update(" update stt_editor set type = ?,name =?,content =? where id=?",
					editor_type,editor_name,content,id);
		}
		if(i>0){
			renderJson(new ResultMessage(200, "操作成功"));
		}else{
			renderJson(new ResultMessage(400, "操作失败"));
		}
	}
	
	public void deleteEditor(){
		String id = getPara("id");
		boolean i = Db.deleteById("stt_editor", id);
		if(i){
			renderJson(new ResultMessage(200, "操作成功"));
		}else{
			renderJson(new ResultMessage(400, "操作失败"));
		}
	}
}
