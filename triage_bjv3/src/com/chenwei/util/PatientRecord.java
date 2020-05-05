package com.chenwei.util;


import com.jfinal.plugin.activerecord.Db;

public  class PatientRecord {
	public static  void insertPatientRecord(String id,String  pid,String  cardnum,String  hisid,String  cts,String  operpersonid) {
		Db.update(Db.getSql("divid.insertPatientRecord"), id, pid, cardnum, hisid, cts, operpersonid,"0");
	}
}
