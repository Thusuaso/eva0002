import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateSql = `update Accounts SET Platform='${body.Platform}',LoginName='${body.LoginName}',LoginPassword='${body.LoginPassword}' where ID='${body.ID}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateSql,async(err,update)=>{
            if(update?.rowsAffected[0] == 1){
                resolve({'status':true,'message':'Update successfully'});
            }else{
                resolve({'status':false,'message':'Update failed'});
            }
        });
    });
});