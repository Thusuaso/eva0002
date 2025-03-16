import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const username = await getRouterParam(event,'username');
    const getTodoSql = `
            select y.ID,y.Yapilacak,y.Yapildi,y.GirisTarihi,y.YapildiTarihi,y.YapilacakOncelik,y.Acil,y.Sira,y.OrtakGorev 
                from Yapilacaklar y 
            where y.Yapildi=0 and y.Goruldu=0 and y.GorevVerenAdi='${username}'
            
            order by y.Sira 
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getTodoSql,async(err,todo)=>{
            resolve({'list':todo?.recordset});
        });
    });

});