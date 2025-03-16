import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const customersSql = `select * from MusterilerTB`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(customersSql,(err,customers)=>{
            resolve({list:customers?.recordset});
        });
    });
});