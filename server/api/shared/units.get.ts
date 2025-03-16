import mssql from '~/mssql/api';
export default defineEventHandler( async() =>{
    const getUnitListSql= `select * from UrunBirimTB`;
    return new Promise(async(resolve,reject)=>{
        
        await mssql.query(getUnitListSql, (err:any,unit:any)=>{
            resolve({'list':unit?.recordset});
        });
    });
})