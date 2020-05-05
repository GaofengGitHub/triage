package com.chenwei.jobs;


import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

import com.chenwei.services.ICalculateServicePortTypeProxy;

public class TestJob implements Job {

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		System.out.println("----JOBA执行了一次--------");
	    
	    ICalculateServicePortTypeProxy pro = new ICalculateServicePortTypeProxy();
	    String result ="<root><result><order_id></order_id><p_bar_code>3002405454</p_bar_code><patient_id>001154982600</patient_id><times></times><outpatient_no></outpatient_no><inpatient_no></inpatient_no><patient_name>杨建</patient_name><birthday>1987-08-01 00:00:00.0</birthday><sex>男</sex><race>汉族</race><patient_address>null</patient_address><home_tel></home_tel><ward_sn></ward_sn><ward_name></ward_name><bed_no></bed_no><exec_class></exec_class><patient_type>2</patient_type><refer_date></refer_date><refer_dept></refer_dept><refer_dept_name></refer_dept_name><refer_doctor></refer_doctor><refer_doctor_name></refer_doctor_name><exam_item></exam_item><exam_name></exam_name><exam_cost></exam_cost><charge_status>4</charge_status><bingsi></bingsi><zhenduan></zhenduan></result></root>";
	    /**
		try {
			result = pro.funInterFace("<funderService functionName='jc_GetPatientInfo'><value>" + "123456" + "</value><value></value><value></value><value></value><value></value><value></value><value>mz</value></funderService>");
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    **/
	    JSONObject json = JSONUtil.parseFromXml(result);
	    JSONObject json2 = JSONUtil.parseObj(json.get("root"));
	    JSONObject json3 = JSONUtil.parseObj(json2.get("result"));
	    System.out.println(json3.get("p_bar_code").toString());
	
//	JsonData jsonData = new JsonData();
//	
//	String patientXml = "<root><result><order_id></order_id><p_bar_code>3002405454</p_bar_code><patient_id>001154982600</patient_id><times></times><outpatient_no></outpatient_no><inpatient_no></inpatient_no><patient_name>杨建</patient_name><birthday>1987-08-01 00:00:00.0</birthday><sex>男</sex><race>汉族</race><patient_address>null</patient_address><home_tel></home_tel><ward_sn></ward_sn><ward_name></ward_name><bed_no></bed_no><exec_class></exec_class><patient_type>2</patient_type><refer_date></refer_date><refer_dept></refer_dept><refer_dept_name></refer_dept_name><refer_doctor></refer_doctor><refer_doctor_name></refer_doctor_name><exam_item></exam_item><exam_name></exam_name><exam_cost></exam_cost><charge_status>4</charge_status><bingsi></bingsi><zhenduan></zhenduan></result></root>";
//	JSONObject json = parserXml(patientXml);
//	jsonData.setResult(json);
//    return jsonData;
	}

}
