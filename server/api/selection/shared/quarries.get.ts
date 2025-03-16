import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    return new Promise(async(resolve,reject)=>{
        const sql = `select * from UrunOcakTB`;
        await mssql.query(sql,async(err,quarries)=>{
            resolve({'list':quarries?.recordset});
        });
    });
})