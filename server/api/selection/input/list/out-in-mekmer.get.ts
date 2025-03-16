import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const listSql = `
       select 

    u.ID,
    u.Tarih,
    u.KasaNo,
    u.UrunKartID,
    u.TedarikciID,
    u.UrunBirimID,
    u.UrunOcakID,
    u.Adet,
    u.KutuAdet,
    u.Miktar,
    u.OzelMiktar,
    u.Aciklama,
    u.UretimTurID,
    u.UretimTurAciklama,
    u.UrunDurumID,
    u.SiparisAciklama,
    u.Kutu,
    u.Duzenleyen,
    u.Kasalayan,
    u.KullaniciID,
    u.KutuIciAdet,
    u.SqmMiktar,
    u.Bagli,
    u.Bulunamadi,
    u.Fason,
    k.KategoriAdi,
    urun.UrunAdi,
    yk.YuzeyIslemAdi,
    ol.En,
    ol.Boy,
    ol.Kenar,
    ub.BirimAdi,
    t.FirmaAdi,
    uo.OcakAdi


from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunId
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID
inner join UretimTurTB ut on ut.ID = u.UretimTurID
where u.UrunDurumID=1 and LEN(u.KasaNo) = 6 and u.Bulunamadi != 1

`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(listSql,(err,list)=>{
            let total = {
				crate:0,
				amount:0,
				box_in_crate:0,
				pcs_in_box:0
			};
			total.crate = list?.recordset.length;
			list?.recordset.forEach(x=>{
                total.amount += x.Miktar;
                total.box_in_crate += x.KutuAdet;
                total.pcs_in_box += x.Adet;
			});
			
            resolve({'list':list?.recordset,'total':total});
        });
    });
});