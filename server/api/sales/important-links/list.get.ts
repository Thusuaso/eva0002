import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const importantLinksSql = `select * from ImportantLinksTB`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(importantLinksSql,async(err,important)=>{
            resolve({'list':important?.recordset});
        });
    });
});