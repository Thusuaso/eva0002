import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateProductSql = `
        update SiparisUrunTB 
    SET
        TedarikciID='${body.TedarikciID}',
        UrunKartID='${body.UrunKartID}',
        UrunBirimID='${body.UrunBirimID}',
        Miktar='${body.Miktar}',
        OzelMiktar='${body.OzelMiktar}',
        SatisFiyati='${body.SatisFiyati}',
        SatisToplam='${body.SatisToplam}',
        UretimAciklama='${body.UretimAciklama}',
        MusteriAciklama='${body.MusteriAciklama}',
        KullaniciID='${body.KullaniciID}',
        AlisFiyati='${body.AlisFiyati}',
        Ton='${body.Ton}',
        Adet='${body.Adet}'

where ID= '${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateProductSql,(err,updated)=>{
            if(updated?.rowsAffected[0] == 1){
                resolve({message: 'Product updated successfully.', status:true});
            }else{
                resolve({message: 'Product update failed.', status:false});
            }
        });
    });
});