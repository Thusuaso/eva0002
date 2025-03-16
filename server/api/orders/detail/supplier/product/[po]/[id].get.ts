import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event,'id');
    const po = await getRouterParam(event,'po');
    const getSupplierProductListSql = `
        select 

	su.ID,
	su.SiparisNo,
	su.TedarikciID,
	t.FirmaAdi as TedarikciAdi,
	su.UrunKartID,
	su.UrunBirimID,
	ub.BirimAdi as UrunBirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama,
	su.MusteriAciklama,
	su.AlisFiyati,
	su.Ton,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar

	


from SiparisUrunTB su 
	inner join TedarikciTB t on t.ID = su.TedarikciID
	inner join UrunKartTB uk on uk.ID = su.UrunKartID
	inner join KategoriTB k on k.ID = uk.KategoriID
	inner join UrunlerTB urun on urun.ID = uk.UrunID
	inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
	inner join OlculerTB ol on ol.ID = uk.OlcuID
	inner join UrunBirimTB ub on ub.ID = su.UrunBirimID

where su.TedarikciID='${id}' and SiparisNo='${po}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getSupplierProductListSql,(err,supplierProduct)=>{
            resolve({'list':supplierProduct?.recordset});
        });
    });
});