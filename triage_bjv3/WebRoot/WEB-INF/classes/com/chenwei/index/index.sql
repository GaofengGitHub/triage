#sql("index.listSelect")
SELECT 
 @rowno := @rowno + 1 as rowno,
t1.id,
t1.cardnum,
t1.fullname,
t1.gender,
t1.bornday,
t1.address,
t1.category,
t1.tel,
t1.memberstel,
t1.idcard,
t1.arrivetime,
t1.registertime,
t1.greenchannel,
t1.others,
t1.admission,
t1.consciousness,
t1.anamnesis,
t1.status,
t1.age,
t1.source,
t1.leavetime,
t1.hisid,
t1.signurl,
t1.eventid,
t1.parenttel,
t1.reason,
t1.allergic_history,
t1.go_rct,
t2.dividtime,
t2.receivetime,
t2.autograde,
t2.finalgrade,
t2.changereason,
t2.dividenurse,
t2.dividdepartment,
t2.receivedepartment,t2.cixu,t2.zhusu,t2.savestatus,t2.hljl
#end

#sql("index.addGrade_name")
,(select grade_name from stt_yjfjset where ys_id = t2.autograde) as autoname,
IFNULL( ( SELECT grade_name FROM stt_yjfjset WHERE ys_id = t2.finalgrade ), '' ) AS finalname
#end

#sql("index.addDepartment_name")
,(select td_name from stt_depart where td_id = t2.dividdepartment) as dividdepartmentname,
IFNULL( ( SELECT td_name FROM stt_depart WHERE td_id = t2.receivedepartment ), '' ) AS receivedepartmentname
#end

#sql("index.addSpecial")
,IFNULL(
	IFNULL(
	(
SELECT
	GROUP_CONCAT( da.addr ) 
FROM
	trt_special_patient p,
	stt_datadictionary da 
WHERE
	p.type = da.id 
	AND p.cardnum = t1.cardnum 
	AND da.`enable` = '1' 
	AND p.cardnum <> '' 
	),
	(
SELECT
	GROUP_CONCAT( da.addr ) 
FROM
	trt_special_patient p,
	stt_datadictionary da 
WHERE
	p.type = da.id 
	AND p.id = t1.id 
	AND da.`enable` = '1' 
	) 
	),
	'' 
	) addr,
	IFNULL(
	IFNULL(
	(
SELECT
	GROUP_CONCAT( da.id ) 
FROM
	trt_special_patient p,
	stt_datadictionary da 
WHERE
	p.type = da.id 
	AND p.cardnum = t1.cardnum 
	AND da.`enable` = '1' 
	AND p.cardnum <> '' 
	),
	(
SELECT
	GROUP_CONCAT( da.id ) 
FROM
	trt_special_patient p,
	stt_datadictionary da 
WHERE
	p.type = da.id 
	AND p.id = t1.id 
	AND da.`enable` = '1' 
	) 
	),
	'' 
	) teshu
#end

#sql("index.listDepartSelect")
SELECT 
 	t1.td_id,
	t1.td_name,
	t1.td_parent_id,
	t1.readyclinicalreceptionmax,
	t1.clinicalreceptionmax,
	t1.departbednum,
	t1.addbednum,
	t1.status
#end

#sql("index.addDepartCountColumn")
	,COUNT(t2.dividdepartment) as count
#end

#sql("index.listDepartFrom")
 from stt_depart t1 LEFT JOIN 
(SELECT t3.dividdepartment from trt_patient t4 LEFT JOIN trt_patient_handle t3 on t4.id = t3.p_id       
 where t4.status = "未接诊" and t3.cixu = (SELECT max(CAST(t5.cixu AS UNSIGNED)) from trt_patient_handle t5 where  t5.p_id=t3.p_id) group by t3.p_id) 
 t2 on t1.td_id = t2.dividdepartment 
GROUP BY t1.td_id HAVING t1.`status` = ? and t1.td_parent_id<>"0"
#end

#sql("index.listCount")
SELECT 
 count(*) as count
#end

#sql("index.listFromNoneText")
  from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id ,(SELECT @rowno:=0) t3
  where t1.status = "未分诊" order by t1.registertime
#end

#sql("index.BetweenDividtime")
  from (SELECT   t1.id  from  trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id
  where t2.dividtime BETWEEN ? AND ? GROUP BY t1.id  ) t3
#end

#sql("index.BetweenReceivetime")
  from (SELECT   t1.id  from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id   
where t2.receivetime BETWEEN ? AND ? GROUP BY t1.id ) t3
#end

#sql("index.listFromNone")
  from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id ,(SELECT @rowno:=0) t3
#end

#sql("index.listFrom")
 from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id,(SELECT @rowno:=0) t3        
 where  t1.fullname like ?
 	or t1.cardnum like ?
 	or t1.gender like ?
 	or t1.tel like ? 
 order by t1.registertime
#end

#sql("index.listFromNoneNoDel")
  from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id LEFT JOIN his_outpatientencounter o on t1.PAADMVisitNumber=o.PAADMVisitNumber and t1.hisid=o.PATPatientID,(SELECT @rowno:=0) t3 where t1.status <> "已退回" 
  and 
  t2.cixu=(select max(CAST(b.cixu AS UNSIGNED)) from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id 
where t1.id = a.id and b.m_id=0) and t2.m_id=0
#end

#sql("index.listFromNoDel")
 from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id,(SELECT @rowno:=0) t3        
 where  (t1.fullname like ?
 	or t1.cardnum like ?
 	or t1.gender like ?
 	or t1.tel like ? ) and t1.status <> "已退回" and
 	t2.cixu=(select max(CAST(b.cixu AS UNSIGNED)) from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id 
where t1.id = a.id)
#end

#sql("index.getWarnNum")
   ,(SELECT  warn_patients from stt_yjfjset WHERE `status` = "1" LIMIT 0,1) as warn_num
#end



#sql("index.listDividFromByGrade")
   from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id,(SELECT @rowno:=0) t3        
 where t1.status = "未分诊"
#end

#sql("index.listFromByGrade")
 from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id,(SELECT @rowno:=0) t3        
 where t1.status = "未接诊"
 	and (t2.finalgrade = ? || t2.autograde = ?)
 order by 
#end

#sql("index.listFromById")
 from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id LEFT JOIN trt_events e on t1.eventid=e.id LEFT JOIN stt_depart dd on t2.dividdepartment=dd.td_id ,(SELECT @rowno:=0) t3        
 where t1.id = ?
#end

#sql("index.listFromByCardNum")
 from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id left join his_outpatientencounter o ON t1.hisid=o.PATPatientID,(SELECT @rowno:=0) t3        
 where t1.cardnum = ?
#end

#sql("index.queryPatientByGrade")
(SELECT (select "0") as warn,t1.id,
t1.cardnum,
t1.fullname,
t1.gender,
t1.bornday,
t1.address,
t1.category,
t1.tel,
t1.memberstel,
t1.idcard,
t1.arrivetime,
t1.registertime,
t1.greenchannel,
t1.others,
t1.admission,
t1.consciousness,
t1.anamnesis,
t1.status,
t1.age,
t1.source,t1.hisid,t1.eventid,
t2.dividtime,
t2.receivetime,
t2.autograde,
t2.finalgrade,
t2.changereason,
t2.dividenurse,
t2.dividdepartment,
t2.receivedepartment,
t2.cixu,t2.feijz,t2.savestatus,(select grade_name from stt_yjfjset where ys_id = t2.autograde) as gradename
,(select IFNULL(group_concat(d.name),'等待时间过长，请再次评估')   from trt_special_patient s LEFT JOIN stt_datadictionary d on s.type=d.id  where s.cardnum = t1.cardnum) as special
 ,(select group_concat(d.addr)   from trt_special_patient s LEFT JOIN stt_datadictionary d on s.type=d.id  where s.cardnum = t1.cardnum) as addr from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id  
	where t2.cixu=(select max(CAST(b.cixu AS UNSIGNED)) from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id 
where t1.id = a.id and b.savestatus <> 'draf') and t1.status = "未接诊"  and t2.autograde = ?  and t2.finalgrade="")
	
	UNION (SELECT (select "0") as warn,t3.id,
t3.cardnum,
t3.fullname,
t3.gender,
t3.bornday,
t3.address,
t3.category,
t3.tel,
t3.memberstel,
t3.idcard,
t3.arrivetime,
t3.registertime,
t3.greenchannel,
t3.others,
t3.admission,
t3.consciousness,
t3.anamnesis,
t3.status,
t3.age,
t3.source,t3.hisid,t3.eventid,
t4.dividtime,
t4.receivetime,
t4.autograde,
t4.finalgrade,
t4.changereason,
t4.dividenurse,
t4.dividdepartment,
t4.receivedepartment,
t4.cixu,t4.feijz,t4.savestatus,
(select grade_name from stt_yjfjset where ys_id = t4.finalgrade) as gradename 
 ,(select IFNULL(group_concat(d.name),'等待时间过长，请再次评估')   from trt_special_patient s LEFT JOIN stt_datadictionary d on s.type=d.id  where s.cardnum = t3.cardnum) as special
,(select group_concat(d.addr)   from trt_special_patient s LEFT JOIN stt_datadictionary d on s.type=d.id  where s.cardnum = t3.cardnum) as addr from trt_patient t3 LEFT JOIN trt_patient_handle t4 on t3.id = t4.p_id  
where t4.cixu=(select max(CAST(b.cixu AS UNSIGNED)) from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id 
where t3.id = a.id and b.savestatus <> 'draf') and t3.status = "未接诊" and t4.finalgrade=? )
order by
#end

#sql("index.queryFeiJZPatient")
(SELECT (select "0") as warn,t1.id,
t1.cardnum,
t1.fullname,
t1.gender,
t1.bornday,
t1.address,
t1.category,
t1.tel,
t1.memberstel,
t1.idcard,
t1.arrivetime,
t1.registertime,
t1.greenchannel,
t1.others,
t1.admission,
t1.consciousness,
t1.anamnesis,
t1.status,
t1.age,
t1.source,t1.hisid,
t2.dividtime,
t2.receivetime,
t2.autograde,
t2.finalgrade,
t2.changereason,
t2.dividenurse,
t2.dividdepartment,
t2.receivedepartment,
t2.cixu,t2.feijz,t2.savestatus,(select grade_name from stt_yjfjset where ys_id = t2.autograde) as gradename
,(select count(1) from trt_special_patient where cardnum = t1.cardnum and type="特殊患者") as special
,(select count(1) from trt_special_patient where cardnum = t1.cardnum and type="欠费患者") as qianfei
  from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id  
	where t2.cixu=(select max(CAST(b.cixu AS UNSIGNED)) from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id 
where t1.id = a.id) and t1.status = "未接诊"  and t2.feijz="2")
order by
#end

#sql("index.queryCixuGradeByPid")
select t1.id,t1.cixu,(CASE when (t1.finalgrade is not null and t1.finalgrade != '')
 then t1.finalgrade else t1.autograde end) as grade,t1.feijz,t1.savestatus from trt_patient_handle as t1
 where t1.p_id=?
#end


#sql("index.insertSpecial")
 insert into trt_special_patient(id,
cardtype,
cardnum,
name,
reason,
registertime,
type) values(?,?,?,?,?,?,?)
#end

#sql("index.listFromNoneNoDelNew")
  from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id LEFT JOIN his_outpatientencounter o on t1.PAADMVisitNumber=o.PAADMVisitNumber and t1.hisid=o.PATPatientID,(SELECT @rowno:=0) t3 where t1.status <> "已退回" 
  and 
   (t2.cixu  is null  or t2.cixu=(select max(CAST(b.cixu AS UNSIGNED)) from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id  where t1.id = a.id))
#end

#sql("index.listSelectDatadictionary")
SELECT 
t1.id,
t1.name,
t1.val,
t1.num,
t1.sort,
t1.descr,
t1.note
#end

#sql("index.listFromDatadictionary")
  from stt_datadictionary t1 where t1.sort=? order by t1.descr
#end

#sql("index.listSpecialCardNum")
  SELECT 
  DISTINCT s.cardnum,h.dividtime from trt_patient_handle h,trt_patient p ,trt_special_patient s where s.cardnum=p.cardnum and 
  p.id=h.p_id and (h.receivetime between ? and  ? or p.status in('未分诊','未接诊')) 
#end

------------------- 页面停留时间  sql--begin---------------------------------
#sql("index.insertWaitTime")
insert into trt_waittime (
id,
page,
pagename,
userid,
roleid,
starttime,
endtime,
waittime,
status,
`system`
) values (?,?,?,?,?,?,?,?,?,?)
#end

#sql("index.queryWaitTimeByWaitId")
SELECT
id,
page,
pagename,
userid,
roleid,
starttime,
endtime,
waittime,
status,
`system`
from trt_waittime where id = ?
#end

#sql("index.updWaitTime")
update trt_waittime set
endtime = ?,
waittime = ?
where id = ?
#end

#sql("index.listSelectAddEvents")
SELECT 
 @rowno := @rowno + 1 as rowno, dd.td_name,
t1.id,
t1.cardnum,
t1.fullname,
t1.gender,
t1.bornday,
t1.address,
t1.category,
t1.tel,
t1.memberstel,
t1.idcard,
t1.arrivetime,
t1.registertime,
t1.greenchannel,
t1.three_no,
t1.others,
t1.admission,
t1.consciousness,
t1.anamnesis,
t1.status,
t1.age,
t1.source,
t1.leavetime,
t1.hisid,
t1.signurl,
t1.eventid,
t1.parenttel,
t1.reason,
t1.allergic_history,
t1.go_rct,
t1.remark,
t1.PAADMVisitNumber,
t1.card_type,
t2.dividtime,
t2.receivetime,
t2.autograde,
t2.finalgrade,
t2.changereason,
t2.dividenurse,
t2.dividdepartment,
t2.receivedepartment,t2.cixu,t2.zhusu,t2.savestatus,t2.hljl,e.name,e.dividtime etime
#end


#sql("index.querySpecialOptions")
 SELECT
	id,
	 name,
	 addr
FROM
	stt_datadictionary
WHERE
	ENABLE = '1'
AND descr = ?
ORDER BY
	num+0
#end

#sql("index.sysDeploy")
SELECT ty_name from stt_yjfzpjb where ty_id=?
#end

#sql("index.listSelectHis")
SELECT 
 @rowno := @rowno + 1 as rowno,
t1.id, IFNULL( o.PAADMOPTime, '' ) PAADMOPTime,
t1.cardnum,
t1.fullname,
t1.gender,
t1.bornday,
t1.address,
t1.category,
t1.tel,
t1.memberstel,
t1.idcard,
t1.arrivetime,
t1.registertime,
t1.greenchannel,
t1.others,
t1.admission,
t1.consciousness,
t1.anamnesis,
t1.status,
t1.age,
IFNULL( t1.source, '' ) source,
IFNULL( t1.leavetime, '' ) leavetime,
t1.hisid,
t1.signurl,
t1.eventid,
t1.parenttel,
t1.reason,
t1.allergic_history,
t1.go_rct,
t2.dividtime,
t2.receivetime,
t2.autograde,
t2.finalgrade,
t2.changereason,
t2.dividenurse,
t2.dividdepartment,
t2.receivedepartment,t2.cixu,IFNULL( t2.zhusu, '' ) zhusu
,t2.savestatus,t2.hljl
#end

#sql("index.listSelectPAADMVisitNumber")
,o.PAADMVisitNumber
#end

#sql("index.queryRoomList")
SELECT id,name from stt_room where `status`=1
#end
#sql("index.queryRoomWaitList")
SELECT t.*,y.grade_color from (SELECT r.room_id room,t1.id,t1.fullname,IF(t2.finalgrade='',t2.autograde,t2.finalgrade) grade,t2.dividtime,d.td_name 
from trt_patient t1 left JOIN trt_patient_handle t2 on t1.id = t2.p_id LEFT JOIN stt_depart d on t2.dividdepartment=d.td_id LEFT JOIN 
stt_room_depart r on d.td_id=r.depart_id where (t2.cixu  is null  or t2.cixu=(select max(CAST(b.cixu AS UNSIGNED)) from trt_patient as a 
LEFT JOIN trt_patient_handle as b on a.id=b.p_id  where t1.id = a.id)) and r.room_id=? ) t,stt_yjfjset y
WHERE status= '1' and t.grade=y.ys_id ORDER BY t.grade,t.dividtime
#end

------------------- 页面停留时间  sql--end---------------------------------