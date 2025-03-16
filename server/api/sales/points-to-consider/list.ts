import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const sql = `select mh.ID,mh.Hata from MaliyetHatalariTB mh`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(sql,async (err,consider)=>{
            resolve({'list':consider?.recordset});
        });
    });
});