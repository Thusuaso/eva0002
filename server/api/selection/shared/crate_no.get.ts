import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const crateSql = `select top 1 (KasaNo + 1) as CrateNo from UretimTB where LEN(KasaNo) = 5 and Disarda=0 order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(crateSql,(err,result)=>{
            resolve({'crateNo':result?.recordset[0].CrateNo});
        });
    });
});