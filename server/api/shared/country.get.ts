import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const countrySql = `select * from YeniTeklif_UlkeTB`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(countrySql,(err,country)=>{
            resolve({list:country?.recordset});
        });
    });
});