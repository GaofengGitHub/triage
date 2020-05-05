package com.chenwei.jobs;


import java.util.Date;
import java.util.List;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

import com.chenwei.events.EventsController;
import com.chenwei.services.ICalculateServicePortTypeProxy;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class HisJobB implements Job {

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		System.out.println("----JOBB执行了一次--------");
		String grade = "1002";
	    
	    ICalculateServicePortTypeProxy pro = new ICalculateServicePortTypeProxy();
	    
	    List<Record> l = Db.find(Db.getSql("index.queryPatientByGrade")+"arrivetime", grade,grade);
		if(l!=null) {
			for(Record r:l) {
				String hisid = r.getStr("hisid");
				String id = r.getStr("id");
				System.out.println("----HisId=" + hisid + "--------");
				if(!StrUtil.equals(hisid, "")&&hisid!=null){
					String result ="";
					//String result ="<root><result><order_id></order_id><p_bar_code>3002405454</p_bar_code><patient_id>001154982600</patient_id><times></times><outpatient_no></outpatient_no><inpatient_no></inpatient_no><patient_name>杨建</patient_name><birthday>1987-08-01 00:00:00.0</birthday><sex>男</sex><race>汉族</race><patient_address>null</patient_address><home_tel></home_tel><ward_sn></ward_sn><ward_name></ward_name><bed_no></bed_no><exec_class></exec_class><patient_type>2</patient_type><refer_date></refer_date><refer_dept></refer_dept><refer_dept_name></refer_dept_name><refer_doctor></refer_doctor><refer_doctor_name></refer_doctor_name><exam_item></exam_item><exam_name></exam_name><exam_cost></exam_cost><charge_status>4</charge_status><bingsi></bingsi><zhenduan></zhenduan><patient_status>已接诊</patient_status></result></root>";
					
					try {
						result = pro.funInterFace("<funderService functionName='jc_GetPatientStatus'><value>" + hisid + "</value><value>"+"1170000"+"</value></funderService>");
						System.out.println("result");
						JSONObject json = JSONUtil.parseFromXml(result);
						JSONObject json2 = JSONUtil.parseObj(json.get("root"));
						JSONObject json3 = JSONUtil.parseObj(json2.get("result"));
				    	String patient_status = json3.get("patient_status").toString();
				    	if(StrUtil.equals(patient_status, "1")){
				    		System.out.println("----已接診--------");
				    		String date = DateUtil.now();
				    		Db.update(Db.getSql("divid.receivePatient"),id);
							Db.update(Db.getSql("divid.receivePatientHandle"),date,id);
							
							EventsController.updateEventReciveTime(id,date);
				    	}
					
					
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					/** **/
					
				}
			}
		}
	    
	   
	}

}
