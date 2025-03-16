import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    return new Promise(async(resolve,reject)=>{
        const sql = `
            select SiparisNo from SiparislerTB

            where SiparisDurumID=2
            order by ID desc
        `;
        await mssql.query(sql,(err,list)=>{
            resolve({'list':list?.recordset}); 
        });
    });
});