import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const insertProductSql = `
        insert into SiparisUrunTB 
(
	SiparisNo,
	TedarikciID,
	UrunKartID,
	UrunBirimID,
	Miktar,
	OzelMiktar,
	SatisFiyati,
	SatisToplam,
	UretimAciklama,
	MusteriAciklama,
	KullaniciID,
	AlisFiyati,
	SiraNo,
	Ton,
	Adet
)
VALUES('${body.SiparisNo}',
'${body.TedarikciID}',
'${body.UrunKartID}',
'${body.UrunBirimID}',
'${body.Miktar}',
'${body.OzelMiktar}',
'${body.SatisFiyati}',
'${body.SatisToplam}','${body.UretimAciklama}','${body.MusteriAciklama}','${body.KullaniciID}','${body.AlisFiyati}','${body.SiraNo}','${body.Ton}','${body.Adet}')
    `;
    const getProductId= `select top 1 ID from SiparisUrunTB order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertProductSql,async(err,insert)=>{
            if(insert?.rowsAffected[0] == 1){
                await mssql.query(getProductId,async(err,id)=>{
                    if(id?.recordset?.length >0){
                        resolve({'status':true,'id':id?.recordset[0].ID,'message':'Product added successfully'});
                    }else{
                        resolve({'status':false,'message':'Product could not be added'});
                    }
                });
            }
        })
    });
});