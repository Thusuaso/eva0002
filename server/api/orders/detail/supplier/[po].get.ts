import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const po = await getRouterParam(event,'po');
    const getSupplierListSql = `
        select 

            su.TedarikciID,
            (select t.FirmaAdi from TedarikciTB t where t.ID = su.TedarikciID) as FirmaAdi

        from SiparisUrunTB su where su.SiparisNo='${po}'
        group by su.TedarikciID
    `;
    return new Promise(async (resolve,reject) =>{
        await mssql.query(getSupplierListSql,(err,supplier)=>{
            resolve({'list':supplier?.recordset});
        });
    });

});