#namespace(divid)
	#sql("patientGrade")
        select case
                 when t1.sumscore > 9 then
                  1
                 when t1.sumscore > 4 then
                  2
                 when t1.sumscore > 1 then
                  3
                 when t1.sumscore = 0 then
                  4
                  else  0
               end as grade,
               case
                 when t1.sumscore > 9 then
                  '抢救室'
                 when t1.sumscore > 4 then
                  '急诊观察室'
                 when t1.sumscore > 1 then
                  '急诊内科'
                 when t1.sumscore = 0 then
                  '急诊外科'
                  else '急诊外科'
               end as direct
          from (select sum(case basisgrade
                             when 1 then
                              9
                             when 2 then
                              5
                             when 3 then
                              2
                             when 4 then
                              1
                           end) as sumscore
                  from trt_handle_basis
                 where patientid = ?) t1
	#end
#end