import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    return new Promise(async(resolve,reject)=>{
        const sql = `select * from TedarikciTB`;
        await mssql.query(sql,async(err,suppliers)=>{
            resolve({'list':suppliers?.recordset});
        });
    });
})