import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertTodoSql = `
    insert into Yapilacaklar (
	Yapilacak,
	Yapildi,
	GorevVerenID,
	GorevVerenAdi,
	GirisTarihi,
	YapilacakOncelik,
	Acil,
	OrtakGorev,
	Goruldu
)
VALUES('${body.Yapilacak}','${body.Yapildi}','${body.GorevVerenID}','${body.GorevVerenAdi}','${body.GirisTarihi}','${body.YapilacakOncelik}','${body.Acil}','${body.OrtakGorev}','${body.Goruldu}')
    `;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(insertTodoSql,(err,insert)=>{
            if(insert?.rowsAffected[0] == 1){
                resolve({'status':true,'message':'Todo inserted successfully'});
            }else{
                resolve({'status':false,'message':'Failed to insert todo'});
            }
        });
    });


});