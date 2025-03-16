import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const insertSql = `insert into MaliyetHatalariTB(Hata) values('${body.Hata}')`;
    const getId = `select top 1 ID from MaliyetHatalariTB order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertSql,async (err,insert)=>{
            if(insert?.rowsAffected[0] == 1){
                await mssql.query(getId,(err,id)=>{
                    if(id?.recordset?.length > 0){
                        resolve({'status':true,'message':'Save successfully','id':id?.recordset[0].ID});
                    }else{
                        resolve({'status':false,'message':'Save failed'});
                    }
                });
            }else{
                resolve({'status':false,'message':'Save failed'});

            }
        });
    });

});