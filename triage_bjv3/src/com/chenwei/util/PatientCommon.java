package com.chenwei.util;

import java.util.Date;


import cn.hutool.core.util.StrUtil;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class PatientCommon {
	public static void savePatientCommon(String id, String cardnum,
			String fullname, String gender, String age, String bornday,
			String address, String category, String tel, String idcard,
			String signurl, String parenttel, String allergic_history,
			String card_type, String sg, String tz) {
		//卡号为空时候==id
		if(StrUtil.isBlank(cardnum)){
			cardnum=id;
		}
		Db.update("delete from trt_patient_common  where cardnum = ?",cardnum);
		Db.update("delete from trt_patient_common  where cardnum = ?",id);
		Db.update(
				"INSERT INTO trt_patient_common(id, cardnum, fullname, gender, age, bornday, address, "
						+ "category, tel, idcard, signurl, parenttel, allergic_history, card_type, sg, tz,CREATE_time) VALUES "
						+ "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
				id, cardnum, fullname, gender, age, bornday, address,
				category, tel, idcard, signurl, parenttel,
				allergic_history, card_type, sg, tz, new Date());
//		Record r = Db.findFirst(
//				"SELECT count(1) count from trt_patient_common where cardnum=?", cardnum);
//		System.out.println(r.get("count"));
//		if (Integer.parseInt(r.get("count").toString())==0) {
//			
//			
//			// 无，新增
//			Db.update(
//					"INSERT INTO trt_patient_common(id, cardnum, fullname, gender, age, bornday, address, "
//							+ "category, tel, idcard, signurl, parenttel, allergic_history, card_type, sg, tz,CREATE_time) VALUES "
//							+ "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
//					id, cardnum, fullname, gender, age, bornday, address,
//					category, tel, idcard, signurl, parenttel,
//					allergic_history, card_type, sg, tz, new Date());
//		} else {
//			// 有，更新
//			
////			Db.update("delete trt_patient_common from where cardnum = ?",id);
//			Db.update("UPDATE trt_patient_common SET  cardnum = ?, fullname = ?, gender = ?, age = ?, bornday = ?, address = ?, category = ?, " +
//					"tel = ?, idcard = ?, signurl = ?, parenttel = ?, allergic_history = ?, card_type = ?, sg = ?, tz = ? WHERE cardnum = ? ",
//					cardnum, fullname, gender, age, bornday, address,category, tel, idcard, signurl, parenttel, allergic_history, card_type, sg, tz,cardnum);
//		}
	}
	public static Record queryPatientCommon(String cardnum){
		Record r = Db.findFirst("SELECT id, cardnum, fullname, gender, age, bornday, address, category, tel, idcard, signurl, parenttel, allergic_history, " +
				"card_type, sg, tz from trt_patient_common where cardnum=?", cardnum);
		return r;
	}
}
