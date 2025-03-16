import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const getListSql = `select * from Accounts order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getListSql,(err,list)=>{
            resolve({'list':list?.recordset});
        });
    });
});