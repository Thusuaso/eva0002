import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const shipmentsSql = `
select * from SiparisTeslimTurTB where ID > 4

    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(shipmentsSql,(err,shipment)=>{
            resolve({list:shipment?.recordset});
        });
    });
});