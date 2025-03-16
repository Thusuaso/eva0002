import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const year = await getRouterParam(event,'year');
    const month = await getRouterParam(event,'month');
    const collectionListSql = `
                    select o.ID,o.Tarih,o.SiparisNo,o.Tutar,m.FirmaAdi from OdemelerTB o
            inner join MusterilerTB m on m.ID = o.MusteriID
            where YEAR(o.Tarih) = '${year}' and MONTH(o.Tarih) = '${month}'
            order by o.Tarih
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(collectionListSql,(err,collection)=>{
            resolve({'list':collection?.recordset}); 
        });
    });
});