import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event,'id');
    const deleteSql = `
        delete MaliyetHatalariTB where ID='${id}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deleteSql,async(err,deleted)=>{
            if(deleted?.rowsAffected[0] == 1){
                resolve({'status':true,'message':'Delete successfully'});
            }else{
                resolve({'status':false,'message':'Delete failed'});
            }
        });
    });
});