#sql("role.listUserIds")
SELECT loginname from stt_user where tu_id in
(SELECT tu_id FROM stt_userdepartrole where tr_id IN 
(
  #for(x : roleids) 
     #(for.index == 0 ? "" : ",")  #para(x)
  #end
) 
  GROUP BY  tu_id)
#end