#sql("events.list")
select 
id,
name,
dividtime,
recivetime,
num,
nurseid,(select username from stt_user where tu_id=trt_events.nurseid) as nursename
#end

#sql("events.fromlist")
from trt_events where   name like ? 
#end

#sql("events.listBegin")
 and (dividtime > ?  or dividtime is null)
#end

#sql("events.listEnd")
 and (dividtime < ? or dividtime is null)
#end

#sql("events.orderBy")
  order by IF(ISNULL(dividtime),0,1),dividtime desc
#end

#sql("events.insert")
insert into  trt_events
(id,
name,
dividtime,
recivetime,
num,
nurseid)  values(?,?,?,?,?,?)
#end

#sql("events.insertPatient")
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
status,age,source,hisid,eventid)
values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 
#end

#sql("events.addDays")

,case RIGHT(t1.age,1) when '岁'  then  LEFT(t1.age,CHAR_LENGTH(t1.age)-1)*365  when '月'  then  LEFT(t1.age,CHAR_LENGTH(t1.age)-1)*30  else  LEFT(t1.age,CHAR_LENGTH(t1.age)-1)+0 end as days
#end

#sql("events.listFromNoDel")
 from trt_patient t1 LEFT JOIN trt_patient_handle t2 on t1.id = t2.p_id,(SELECT @rowno:=0) t3   ,trt_patient_sign t4     
 where  t1.eventid=? and t4.p_id=t1.id and t4.cixu=t2.cixu and t1.status <> "已退回" and t2.cixu=(select max(b.cixu+0) from trt_patient as a LEFT JOIN trt_patient_handle as b on a.id=b.p_id 
where t1.id = a.id)

#end

#sql("events.updateRecivetime") 
 update trt_events set  recivetime =? where id =?
#end

#sql("events.signListSelect")
 ,  t4.p_id ,
  t4.hx ,
  t4.tw ,
  t4.mb ,
  t4.sg ,
  t4.tz ,
  t4.szy ,
  t4.ssy ,
  t4.spo2 ,
  t4.pcn ,
  t4.crp ,
  t4.il6 ,
  t4.cea ,
  t4.afp ,
  t4.myo ,
  t4.ddimer ,
  t4.fer ,
  t4.ntprobnp ,
  t4.hsctnl ,
  t4.ckmb ,
  t4.ctnt ,
  t4.ca 
#end

#sql("events.selectWeekevents")
SELECT id,name,dividtime,num FROM trt_events where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= dividtime order by dividtime desc
#end