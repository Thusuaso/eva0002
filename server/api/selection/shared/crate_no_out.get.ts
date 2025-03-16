import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const outCrateNoSql = `select top 1 (KasaNo + 1) as CrateNo from UretimTB where LEN(KasaNo) = 6 order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(outCrateNoSql,(err:any,outCrateNo:any)=>{
            resolve({'crateNo':outCrateNo?.recordset[0].CrateNo});
        });
    });
});