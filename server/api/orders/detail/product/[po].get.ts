import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const po = await getRouterParam(event,'po');
    const productListSql = `
        select su.*,k.KategoriAdi,urun.UrunAdi,ol.En,ol.Boy,ol.Kenar,yk.YuzeyIslemAdi from SiparisUrunTB su
        inner join UrunKartTB uk on uk.ID = su.UrunKartID
        inner join KategoriTB k on k.ID = uk.KategoriID
        inner join UrunlerTB urun on urun.ID = uk.UrunID
        inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
        inner join OlculerTB ol on ol.ID = uk.OlcuID
        inner join UrunBirimTB birim on birim.ID = su.UrunBirimID
        where su.SiparisNo = '${po}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(productListSql,(err,product)=>{
            resolve({'list':product?.recordset});
        });
    });
});