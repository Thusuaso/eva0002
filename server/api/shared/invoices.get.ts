import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const invoicesSql = `
select ID,FaturaAdi from FaturaKesilmeTB



    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(invoicesSql,(err,invoices)=>{
            resolve({list:invoices?.recordset});
        });
    });
});