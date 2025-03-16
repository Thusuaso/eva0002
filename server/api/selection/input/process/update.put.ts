import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    

    const updateSql = `
        update UretimTB SET
	Tarih='${body.Tarih}',
	UrunKartID='${body.UrunKartID}',
	TedarikciID='${body.TedarikciID}',
	UrunBirimID='${body.UrunBirimID}',
	UrunOcakID='${body.UrunOcakID}',
	Adet='${body.Adet}',
	KutuAdet='${body.KutuAdet}',
	Miktar='${body.Miktar}',
	Aciklama='${body.Aciklama}',
	UretimTurID='${body.UretimTurID}',
	UrunDurumID='${body.UrunDurumID}',
	SiparisAciklama='${body.SiparisAciklama}',
	Kutu='${body.Kutu}',
	Duzenleyen='${body.Duzenleyen}',
	Kasalayan='${body.Kasalayan}',
	KutuIciAdet='${body.KutuIciAdet}',
	SqmMiktar='${body.SqmMiktar}',
	Bagli='${body.Bagli}',
	Bulunamadi='${body.Bulunamadi}',
	Fason='${body.Fason}'
where ID='${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        mssql.query(updateSql,(err,updated)=>{
            if(updated?.rowsAffected[0] == 1){
                resolve({'status':true,'message':'Update successfully'});
            }else{
                resolve({'status':false,'message':'Update failed'});
            };
        })
    });
});