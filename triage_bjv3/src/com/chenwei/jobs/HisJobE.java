package com.chenwei.jobs;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.asymmetric.RSA;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

import com.chenwei.divid.TriageDividController;
import com.chenwei.events.EventsController;
import com.chenwei.jfinal.IdWorker;
import com.chenwei.services.ICalculateServicePortTypeProxy;
import com.chenwei.util.Sqlserver2005;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sun.org.apache.regexp.internal.recompile;

public class HisJobE implements Job {
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar beforeTime = Calendar.getInstance();
		//时间放宽，防止服务器时间不同步及挂号时间不准确造成的数据丢失。liuxj20191224
		beforeTime.add(Calendar.MINUTE, -30);// 5分钟之前的时间
		Date beforeD = beforeTime.getTime();
		String time = sdf.format(beforeD);
//		System.out.println(time+"----JOBEEE执行了一次--------");
		
		Date d = new Date();
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd ");
		String dateNowStr = sdf1.format(d);
		dateNowStr+="00:00:00";
//		System.out.println("格式化后的日期：" + dateNowStr);
		//连接qlserver2005
		String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";  //加载JDBC驱动
		String dbURL = "jdbc:sqlserver://192.168.1.2:1433; DatabaseName=prhis"; // 连接服务器和数据库master
		String userName = "jzjz"; // 默认用户名
		String userPwd = "jzjz555"; // 密码
		//挂号视图名称
		String gh_view ="dbo.OutpatientEncounterStarted";
		//患者信息视图名称
		String hz_view ="dbo.PatientRegistry";
		Connection dbConn;
		Record t = Db.findFirst("SELECT count(1) c from trt_patient");
		PreparedStatement pst = null;
		try {
			Class.forName(driverName);
			dbConn = DriverManager.getConnection(dbURL, userName, userPwd);
			if(t.getStr("c").equals("0")){
				//第一次，患者表无数据
				pst = dbConn.prepareStatement("SELECT * from " +gh_view);
			}else{
				pst = dbConn.prepareStatement("SELECT * from " +gh_view +" where PAADMOPTime>=?");
				pst.setString(1, time);
			}
//		 	pst = dbConn.prepareStatement("SELECT * from test..bmk");
			
			ResultSet rs = pst.executeQuery();
			while (rs.next()) {
//				System.out.println(rs.getString(0));
//				System.out.println(rs.getString("FeeTypeCode")+"...费别："+Sqlserver2005.getIsoToGBK(rs.getString("FeeTypeDesc")));
//				System.out.println("挂号时间："+rs.getString("PAADMOPTime"));
				String cardnum = rs.getString("PATPatientID");
				if(!StrUtil.isBlank(cardnum)){
					cardnum=cardnum.trim();
					PreparedStatement pstt = null;
					pstt = dbConn.prepareStatement("SELECT   * from " + hz_view +" where PATPatientID =?");
					pstt.setString(1, cardnum);
					ResultSet r = pstt.executeQuery();
//					System.out.println(111);
					while (r.next()) {
//						System.out.println(222);
						String fullname = Sqlserver2005.getIsoToGBK(r.getString("PATName"));
						if(!StrUtil.isBlank(fullname)){
							fullname=fullname.trim();
						}
						String bornday = r.getString("PATDob").substring(0, 10);
						String gender = r.getString("PATSexCode");
						if(gender.equals("2")){
							gender="女";
						}else{
							gender="男";
						}
						String tel = r.getString("PATTelephone");
						if(!StrUtil.isBlank(tel)){
							tel=tel.trim();
						}
						String idcard = r.getString("PATIdentityNum");
						if(!StrUtil.isBlank(idcard)){
							idcard=idcard.trim();
						}
						String address = "";
						
//						Db.update(Db.getSql("divid.insertPatient"), id, cardnum, fullname, gender, bornday, address, category,
//								tel, memberstel,idcard, null, registertime, greenchannel, others, admission, consciousness,
//								anamnesis, status,age,source,hisid,signurl,parenttel,reason,allergic_history,go_rct,anonymous,remark,card_type);
						
						Record r1 = Db.findFirst("SELECT count(1) num FROM trt_patient where hisid=? and PAADMVisitNumber=?",rs.getString("PATPatientID").trim(),rs.getString("PAADMVisitNumber").trim());
						System.out.println(fullname+",hisid:"+rs.getString("PATPatientID").trim()+",挂号号为："+rs.getString("PAADMVisitNumber"));
						if(r1.get("num").toString().trim().equals("0")){
							String id = TriageDividController.getSep();
							Db.update(Db.getSql("divid.insertPatientPR"), id, cardnum, fullname, gender, bornday, address, "7",
									tel, "",idcard, null, rs.getString("PAADMOPTime"), "", "", "", "","", "未分诊","","",rs.getString("PATPatientID"),"","","","","","","","01",rs.getString("PAADMVisitNumber"));
							String handleid = IdWorker.nextId();
//							Db.update(Db.getSql("divid.insertHandle"), handleid, id, d, null,zhusu, autograde, finalgrade,
//									changereason, reasondetail, dividenurse,dividenurseid, dividdepartment, "", hljl,cixu,feijz,savestatus,supplement);
							//his的挂号科室名
							String dividdepartment=Sqlserver2005.getIsoToGBK(rs.getString("PAADMOPDeptDesc"));
							dividdepartment =(dividdepartment.contains("外科"))?"2":dividdepartment;
							dividdepartment =(dividdepartment.contains("骨科"))?"3":dividdepartment;
							dividdepartment =(dividdepartment.contains("妇科"))?"4":dividdepartment;
							dividdepartment =(dividdepartment.contains("泌尿外科"))?"5":dividdepartment;
							dividdepartment =(dividdepartment.contains("眼科"))?"6":dividdepartment;
							dividdepartment =(dividdepartment.contains("耳鼻喉科"))?"7":dividdepartment;
							dividdepartment =(dividdepartment.contains("内科"))?"8":dividdepartment;
							Db.update(Db.getSql("divid.insertHandle"), handleid, id, null, null,"", "", "",
									"", "", "","", dividdepartment, "", "",1,1,"save","");
						}
					}
				}
			}
			rs.close();
			pst.close();
			dbConn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		/*Record t = Db.findFirst("SELECT count(1) c from trt_patient1");
		List<Record> list = null;
		
		String gh_view ="his_outpatientencounter";
		
//		String gh_view ="OutpatientEncounterStarted";
		//患者信息视图名称
		String hz_view ="his_patientregistry";
//		String hz_view ="PatientRegistry";
		if(t.getStr("c").equals("0")){
			//第一次，患者表无数据
			list=Db.find("SELECT * from " +gh_view);
		}else{
			list=Db.find("SELECT * from " +gh_view +" where PAADMOPTime>=?",time);
		}
		for (Record rs : list) {
			 
			String cardnum = rs.getStr("PATPatientID");
			if(!StrUtil.isBlank(cardnum)){
				Record r = Db.findFirst("SELECT * from " + hz_view +" where PATPatientID =?", cardnum);
				String fullname = r.getStr("PATName");
				String bornday = r.getStr("PATDob");
				String gender = r.getStr("PATSexCode");
				String tel = r.getStr("PATTelephone");
				String idcard = r.getStr("PATIdentityNum");
				String address = r.getStr("PATIdentityNum");
				String id = TriageDividController.getSep();
				Db.update(Db.getSql("divid.insertPatient"), id, cardnum, fullname, gender, bornday, address, category,
						tel, memberstel,idcard, null, registertime, greenchannel, others, admission, consciousness,
						anamnesis, status,age,source,hisid,signurl,parenttel,reason,allergic_history,go_rct,anonymous,remark,card_type);
				Db.update(Db.getSql("divid.insertPatient"), id, cardnum, fullname, gender, bornday, address, "",
						tel, "",idcard, null, null, "", "", "", "","", "未分诊","","","","","","","","","","","01");
			}
			
		}*/
	   
	}

}
