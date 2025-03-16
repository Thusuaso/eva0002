import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const yearListSql = `
        select YEAR(o.Tarih) as Year from OdemelerTB o
        group by YEAR(o.Tarih)
        order by YEAR(o.Tarih) desc
    `;
    const yearList = await mssql.query(yearListSql);
    const monthListSql = `
        select MONTH(o.Tarih) Month,YEAR(o.Tarih) as Year from OdemelerTB o
        where YEAR(o.Tarih) = '${yearList?.recordset[0].Year}'
        group by MONTH(o.Tarih),YEAR(o.Tarih)
        order by MONTH(o.Tarih) desc
    `;
    const monthList = await mssql.query(monthListSql);
    const collectionListSql = `
            select o.ID,o.Tarih,o.SiparisNo,o.Tutar,m.FirmaAdi from OdemelerTB o
            inner join MusterilerTB m on m.ID = o.MusteriID
            where YEAR(o.Tarih) = '${yearList?.recordset[0].Year}' and MONTH(o.Tarih) = '${monthList?.recordset[0].Month}'
            order by o.Tarih
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(collectionListSql,(err,collection)=>{
            resolve({'list':collection?.recordset,'years':yearList.recordset,'months':monthList.recordset});
        });
    });



});