import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const username = await getRouterParam(event,'username');
    const todoListSql = `
                select 

	y.ID,
	y.Yapilacak,
	y.Yapildi,
	y.GorevVerenID,
	y.GorevVerenAdi,
	y.GirisTarihi,
	y.YapildiTarihi,
	y.YapilacakOncelik,
	y.Acil,
	y.Sira,
	y.OrtakGorev

from Yapilacaklar y
where y.Yapildi=0 and y.OrtakGorev LIKE '%' + '${username}' +  '%' 
order by y.GirisTarihi desc
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(todoListSql,(err,todo)=>{
            resolve({'list':todo?.recordset});
        });
    });
});