import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const year = await getRouterParam(event,'year');
    const monthListSql = `
                select MONTH(o.Tarih) Month,YEAR(o.Tarih) as Year from OdemelerTB o
        where YEAR(o.Tarih) = '${year}'
        group by MONTH(o.Tarih),YEAR(o.Tarih)
        order by MONTH(o.Tarih) desc
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(monthListSql,(err,months)=>{
            resolve({'list':months?.recordset});
        });
    });

});