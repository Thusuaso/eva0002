import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const paymentsSql = `
select ID,OdemeTur from OdemeTurTB


    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(paymentsSql,(err,payments)=>{
            resolve({list:payments?.recordset});
        });
    });
});