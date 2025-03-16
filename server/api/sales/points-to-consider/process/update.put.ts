import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateSql = `update MaliyetHatalariTB SET Hata = '${body.Hata}' WHERE ID = '${body.ID}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateSql,async(err,updated)=>{
            if(updated?.rowsAffected[0] == 1){
                resolve({'status':true,'message':'Update successfully'});
            }else{
                resolve({'status':false,'message':'Update failed'});

            }
        });
    });
});