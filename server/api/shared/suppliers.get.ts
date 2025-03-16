import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const suppliersSql = `
select ID,FirmaAdi from TedarikciTB
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(suppliersSql,(err,suppliers)=>{
            resolve({list:suppliers?.recordset});
        });
    });
});