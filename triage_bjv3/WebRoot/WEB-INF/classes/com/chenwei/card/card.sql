#sql("card.insertCard")
insert into  trt_patient_card( 
id,
cardnum,
fullname,
gender,
bronday,
idcard,
nation,
country,
tel,
ralationname,
ralationtel,
aprovince,
acity,
acountry,
acountryside,
avillage,
addressdesc,
occupation,
workplace,
remark,
updatetime,
updateuserid,
updateusername
) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
#end


#sql("card.updateCard")
update  trt_patient_card set
cardnum = ?,
fullname = ?,
gender = ?,
bronday= ?,
idcard = ?,
nation = ?,
country = ?,
tel = ?,
ralationname = ?,
ralationtel = ?,
aprovince = ?,
acity = ?,
acountry = ?,
acountryside = ?,
avillage = ?,
addressdesc = ?,
occupation = ?,
workplace = ?,
remark = ?,
updatetime = ?,
updateuserid = ?,
updateusername = ?
where id =?
#end



#sql("card.list")
select 
id,
cardnum,
fullname,
gender,
bronday,
idcard,
nation,
country,
tel,
ralationname,
ralationtel,
aprovince,
acity,
acountry,
acountryside,
avillage,
addressdesc,
occupation,
workplace,
remark,
updatetime,
updateuserid,
updateusername
#end

#sql("card.fromlist")
from trt_patient_card where   cardnum like ?  and fullname like ?
#end

#sql("card.listBegin")
 and updatetime > ? 
#end

#sql("card.listEnd")
 and updatetime < ? 
#end

#sql("card.orderBy")
  order by updatetime desc
#end