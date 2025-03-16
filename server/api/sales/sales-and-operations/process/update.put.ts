import mssql from '~/mssql/api';
export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const salesAndOperationsUpdatedSql = `update SiparislerTB set SiparisSahibi='${body.SiparisSahibi}',Operasyon='${body.Operasyon}' where SiparisNo='${body.SiparisNo}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(salesAndOperationsUpdatedSql,async(err,updated)=>{
            if(updated?.rowsAffected[0] === 1){
                resolve({'status':true,'message':'Update successfully'});
            }else{
                resolve({'status':false,'message':'Update failed'});
            }
        });
    });
});