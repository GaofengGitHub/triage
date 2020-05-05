#sql("divid.signListSelect")
SELECT 
  t1.id ,
  t1.p_id ,
  t1.hx ,
  t1.tw ,
  t1.mb ,
  t1.sg ,
  t1.tz ,
  t1.szy ,
  t1.ssy ,
  t1.spo2 ,
  t1.pcn ,
  t1.crp ,
  t1.il6 ,
  t1.cea ,
  t1.afp ,
  t1.myo ,
  t1.ddimer ,
  t1.fer ,
  t1.ntprobnp ,
  t1.hsctnl ,
  t1.ckmb ,
  t1.ctnt ,
  t1.ca ,t1.consciousness,t1.anamnesis
#end

#sql("divid.symptomListSelect")
SELECT 
id,
pid,
name,
type,
grade,
level,
keywords
#end

#sql("divid.handleListSelect")
select 
id,
p_id,
dividtime,
receivetime,
autograde,
finalgrade,
changereason,
reasondetail,
dividenurse,
dividdepartment,
receivedepartment,
hljl,
zhusu,
cixu,
feijz,
savestatus,supplement
#end

#sql("divid.addhandleListdepart")
,(select td_name from stt_depart where td_id=dividdepartment and dividdepartment != '' ) as dividdepartmentname
#end


#sql("divid.insertzdysympton")
insert into trt_zdysympton( 
id,
level1,
level2,
level3,
grade,
m_id,
symptom_type,
count) 
values(?,?,?,?,?,?,?,?)
#end

#sql("divid.insertHandle")
insert into  trt_patient_handle( 
id,
p_id,
dividtime,
receivetime,
zhusu,
autograde,
finalgrade,
changereason,
reasondetail,
dividenurse,
dividenurseid,
dividdepartment,
receivedepartment,
hljl,cixu,feijz,savestatus,supplement) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
#end

#sql("divid.updatetHandle")
update trt_patient_handle set 
dividtime = ?,
zhusu=?,
autograde = ?,
finalgrade = ?,
changereason = ?,
reasondetail = ?,
dividenurse = ?,
dividenurseid = ?,
dividdepartment = ?,
hljl = ?,
cixu = ?,
feijz = ?,
savestatus = ?,supplement=?
where id =?
#end

#sql("divid.listhandelFromByPid")
 from trt_patient_handle 
 where p_id = ? and m_id='0' order by id desc
#end

#sql("divid.listhandelFromByPidAndCixu")
 from trt_patient_handle 
 where p_id = ? and cixu = ?  and m_id='0' order by cixu desc
#end

#sql("divid.listsymptomFromByPidAndLevel")
 from trt_symptom_bank 
 where m_id=0 and pid = ? and level = ?  and keywords like ? order by sort,grade
#end

#sql("divid.listsymptomFromById")
 from trt_symptom_bank 
 where m_id=0 and id = ?
#end

#sql("divid.deletePatientSymptom")
 delete from trt_patient_symptom 
 where patient_id = ? and symptom_type =? and m_id = "0" and cixu=?
#end

#sql("divid.insertPatientSymptom")
 insert into trt_patient_symptom (id,
patient_id,
symptom_id,
symptom_type,m_id,cixu,create_time
) values(?,?,?,?,"0",?,?)
#end

#sql("divid.selectPatientSymptom")
 select id,
patient_id,
symptom_id,
symptom_type,
symptom_id_value from trt_patient_symptom
where patient_id =? and m_id="0" and cixu = (SELECT max(cixu+0) from trt_patient_symptom where  patient_id=? and m_id="0")
#end

#sql("divid.selectPatientSymptomByPID")
 select id,
patient_id,
symptom_id,
symptom_type,
symptom_id_value from trt_patient_symptom
where patient_id =? and m_id="0"
#end

#sql("divid.selectPatientSymptomByCixu")
 select id,
patient_id,
symptom_id,
symptom_type,
symptom_id_value from trt_patient_symptom
where patient_id =? and m_id="0" and cixu = ?
#end

#sql("divid.selectSymptomByType")
and symptom_type = ? and cixu = (SELECT max(cixu+0) from trt_patient_symptom where  patient_id=?)
#end

#sql("divid.selectSymptomByTypeAndCixu")
and cixu = ? and m_id=0
#end

#sql("divid.insertPatientSigh")
insert into trt_patient_sign(
  id ,
  p_id ,
  hx ,
  tw ,
  mb ,
  sg ,
  tz ,
  szy ,
  ssy ,
  spo2 ,
  pcn ,
  crp ,
  il6 ,
  cea ,
  afp ,
  myo ,
  ddimer ,
  fer ,
  ntprobnp ,
  hsctnl ,
  ckmb ,
  ctnt ,
  ca,cixu,anamnesis,consciousness,m_id )
  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
#end

#sql("divid.updatePatientSigh")
update trt_patient_sign set
  hx = ?,
  tw = ?,
  mb = ?,
  sg = ?,
  tz = ?,
  szy = ?,
  ssy = ?,
  spo2 = ?,
  pcn = ?,
  crp = ?,
  il6 = ?,
  cea = ?,
  afp = ?,
  myo = ?,
  ddimer = ?,
  fer = ?,
  ntprobnp = ?,
  hsctnl = ?,
  ckmb = ?,
  ctnt = ?,
  ca = ?,
  cixu = ?,anamnesis=?,consciousness=?
  where id = ?
#end

#sql("divid.insertPatient")
insert into trt_patient(
id,
cardnum,
fullname,
gender,
bornday,
address,
category,
tel,
memberstel,
idcard,
arrivetime,
registertime,
greenchannel,
others,
admission,
consciousness,
anamnesis,
status,age,source,hisid,signurl,parenttel,reason,allergic_history,go_rct,anonymous,remark,card_type,three_no)
values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 
#end

#sql("divid.updatePatient")
update trt_patient set
cardnum= ?,
fullname= ?,
gender= ?,
bornday= ?,
category= ?,
tel= ?,
memberstel= ?,
idcard=?,
greenchannel= ?,
others= ?,
admission= ?,
consciousness= ?,
anamnesis= ?,
status = ?,
age =?,
source =?,
signurl =?,parenttel=?,reason=?,address=?,allergic_history=?,
registertime = ?,go_rct = ?,remark =?,card_type=?,three_no=?
where id=?
#end

#sql("divid.updatePatient2")
update trt_patient set
cardnum= ?,
fullname= ?,
gender= ?,
bornday= ?,
category= ?,
tel= ?,
memberstel= ?,
greenchannel= ?,
others= ?,
admission= ?,
consciousness= ?,
anamnesis= ?,
status = ?,
age =?,
source =?,
where id=?
#end

#sql("divid.listFromByPid")
 from trt_patient_sign t1
 where t1.p_id = ? and m_id=0 order by t1.cixu desc
#end

#sql("divid.listFromByPidAndCixu")
 from trt_patient_sign t1
 where t1.p_id = ? and t1.cixu=? and m_id=0 order by t1.cixu desc
#end

#sql("divid.listPjfs")
SELECT 
t1.ty_id,
t1.ty_name,
t1.sort
from stt_pjb t1
WHERE t1.system =? and t1.status = '1'
 ORDER BY t1.sort 
#end

#sql("divid.listGradeSet")
SELECT 
ys_id,
grade_set,
grade_name,
grade_color,
grade_overtime,
classify_main_id,
classify_minor_id,
warn_patients,
status
from stt_yjfjset 
WHERE status= '1'
#end

#sql("divid.byId")
and ys_id = ?
#end


#sql("divid.selectlistScore")
select
id,
p_id,
score,
type,
time,
state
from trt_patient_score where state="0" and p_id =? and type=? and cixu=?
#end

#sql("divid.insertScore")
insert into trt_patient_score(
id,
p_id,
score,
type,
time,
state,m_id,cixu,grade,nurse)
values(?,?,?,?,?,?,"0",?,?,?)
#end


#sql("divid.queryPatientHandleScore")
select 
id,
p_id,
autograde,
finalgrade,
cixu,
feijz,savestatus
from trt_patient_handle where p_id=? and m_id='0' order by cixu
#end


#sql("divid.updateScore")
update trt_patient_score set 
score = ?,
time =?,
cixu=?
where state="0" and p_id=? and type=?  and cixu =?
#end

#sql("divid.updateScore2")
update trt_patient_score set 
score = ?,
time =?,
cixu=?,grade =?
where state="0" and p_id=? and type=?  and cixu =?
#end

#sql("divid.receivePatient")
update trt_patient set 
status = "已接诊"
where id =?
#end

#sql("divid.receivePatientHandle")
update trt_patient_handle set 
receivetime = ?,
receivedepartment = dividdepartment
where p_id =?
#end

#sql("divid.addGrade_name")
,(select grade_name from stt_yjfjset where ys_id = autograde) as autoname,
(select grade_name from stt_yjfjset where ys_id = finalgrade) as finalname
#end

#sql("divid.insertPatientRecord")
insert into  trt_patient_record( 
id,
pid,
cardnum,
hisid,
cts,
operpersonid,
system) values(?,?,?,?,?,?,?)
#end

-- 自定义快速分级 新增 删除 查询   begin
#sql("divid.deleteDysymptonBank")
delete from trt_zdysympton_bank 
 where p_id = ? and symptom_type = ? and m_id = ? and cixu=?
#end

#sql("divid.insertDysymptonBank")
insert into trt_zdysympton_bank 
(id,p_id,u_id,content,grade,create_time,m_id,cixu,symptom_type)
values(?,?,?,?,?,?,?,?,?)
#end

#sql("divid.selectDysymptonBankById")
select 
id,
p_id,
u_id,
content,
grade,
create_time,
m_id,
cixu,
symptom_type
from trt_zdysympton_bank where id=?
#end
-- 自定义快速分级 新增 删除 查询   end


#sql("divid.updatePatientEventid")
UPDATE trt_patient set eventid=? where id=?
#end

#sql("divid.updateEventNum")
UPDATE trt_events set num=(SELECT count(1) from trt_patient  p where p.eventid=?) where id=?
#end

#sql("divid.deletePatientScore")
	DELETE from trt_patient_score where p_id=? and type=?    and cixu=?
#end

#sql("divid.updatePatienGoRct")
UPDATE trt_patient set go_rct=1 where id=?
#end

#sql("divid.queryHisPatientByCardNum")
SELECT
	p.PATPatientID hisid,
	p.PATName fullname,
	p.PATDob bornday,
	p.PATSexDesc gender,
	p.PATTelephone tel,
	CONCAT(
	d.PATProvinceDesc,
	d.PATCityDesc,
	d.PATCountyDesc,
	d.PATCountryside,
	d.PATVillage,
	d.PATHouseNum,
	d.PATAddressDesc 
	) address,
	i.PATIdentityNum idcard,
	r.PATRelationName memberstel,
	r.PATRelationPhone parenttel,
	di.PADDiagDesc diagnosis 
FROM
	his_patientregistry p
	LEFT JOIN his_pataddress d ON p.PATPatientID = d.PATPatientID
	LEFT JOIN his_patidentity i ON p.PATPatientID = i.PATPatientID
	LEFT JOIN his_patrelation r ON p.PATPatientID = r.PATPatientID
	LEFT JOIN his_patientdiagnosis di ON p.PATPatientID = di.PATPatientID 
WHERE
	p.PATHealthCardID = ?
#end

#sql("divid.findHisGH")
	SELECT p.id,o.PATPatientID from trt_patient p LEFT JOIN his_outpatientencounter o on p.hisid=o.PATPatientID 
	and p.PAADMVisitNumber=o.PAADMVisitNumber where p.cardnum=? ORDER BY p.id desc LIMIT 1
#end

#sql("divid.listFromByPidAndCixuT")
 from trt_patient_sign t1
 where t1.p_id = ? and t1.cixu=? and t1.m_id = '0' order by t1.cixu desc
#end

#sql("divid.selectGbsScore")
select
id,
pid,
blood_urea_nitrogen,
hemoglobin,
systolic_pressure,
other,
total,
cixu
from rct_gbs_score_record where pid =?  and cixu =?
#end

#sql("divid.selectPatientSymptomList")
select id,
patient_id,
symptom_id,
symptom_type,
symptom_id_value from trt_patient_symptom
where patient_id =? and symptom_type = ?
#end

#sql("divid.insert_his_outpatientencounter")
INSERT INTO `his_outpatientencounter1` (
`ID`,
`PATPatientID`,
`PAADMVisitNumber`,
`PAADMEncounterTypeCode`,
`PAADMEncounterTypeDesc`,
`FeeTypeCode`,
`FeeTypeDesc`,
`PAADMOPDeptCode`,
`PAADMOPDeptDesc`,
`PAADMOPDocCode`,
`PAADMOPDocDesc`,
`PAADMOPTime`,
`UpdateUserCode`,
`UpdateUserDesc`,
`UpdateDate`,
`UpdateTime`,
`PAADMOPNo`,
`PAADMOPRoomCode`,
`PAADMOPTimeRange`,
`PAADMOPQueueNumberStatus`,
`PAADMOOPShortDeptDesc` 
)
VALUES
	(
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	?,
	? 
	)
#end

#sql("divid.insertPatientPR")
insert into trt_patient(
id,
cardnum,
fullname,
gender,
bornday,
address,
category,
tel,
memberstel,
idcard,
arrivetime,
registertime,
greenchannel,
others,
admission,
consciousness,
anamnesis,
status,age,source,hisid,signurl,parenttel,reason,allergic_history,go_rct,anonymous,remark,card_type,PAADMVisitNumber)
values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 
#end