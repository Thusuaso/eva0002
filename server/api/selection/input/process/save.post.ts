import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const crate_amount = body.KasaAdet;
    let crate_no = parseInt(body.KasaNo);


    return new Promise(async(resolve,reject)=>{
        let index = 0;
        for (let i = 0; i < crate_amount; i++) {
            const sql = `
            insert into UretimTB(
                            Tarih,
                            KasaNo,
                            UrunKartID,
                            TedarikciID,
                            UrunBirimID,
                            UrunOcakID,
                            Adet,
                            KutuAdet,
                            Miktar,
                            Aciklama,
                            UretimTurID,
                            UrunDurumID,
                            SiparisAciklama,
                            Kutu,
                            Duzenleyen,
                            Kasalayan,
                            Disarda,
                            KutuIciAdet,
                            SqmMiktar,
                            Bagli,
                            Bulunamadi,
                            Fason
                            )
                        Values('${body.Tarih}','${crate_no}',
                        '${body.UrunKartID}','${body.TedarikciID}',
                        '${body.UrunBirimID}','${body.UrunOcakID}',
                        '${body.Adet}','${body.KutuAdet}',
                        '${body.Miktar}','${body.Aciklama}',
                        '${body.UretimTurID}','${body.UrunDurumID}',
                        '${body.SiparisAciklama}','${body.Kutu}',
                        '${body.Duzenleyen}','${body.Kasalayan}',
                        '${body.Disarda}','${body.KutuIciAdet}',
                        '${body.SqmMiktar}','${body.Bagli}','${body.Bulunamadi}','${body.Fason}')
                        `;
            await mssql.query(sql);
            index++;
            crate_no+=1;
        };
        if(index === crate_amount){
            resolve({'status':true,'message':'Saved successfully.'});

        }else{
            resolve({'status':false,'message':'Saved failed.'});

        }
    });
});