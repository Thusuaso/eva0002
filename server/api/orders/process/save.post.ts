import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertOrderSql = `
        insert into SiparislerTB (
	SiparisNo,
	SiparisTarihi,
	OdemeTurID,
	TeslimTurID,
	MusteriID,
	Pesinat,
	NavlunFirma,
	NavlunMekmarNot,
	NavlunAlis,
	NavlunSatis,
	KayitTarihi,
	KullaniciID,
	SiparisDurumID,
	OdemeAciklama,
	TahminiYuklemeTarihi,
	Vade,
	Ulke,
	Komisyon,
	DetayAciklama_1,
	DetayMekmarNot_1,
	DetayTutar_1,
	DetayAlis_1,
	DetayAciklama_2,
	DetayMekmarNot_2,
	DetayTutar_2,
	DetayAlis_2,

	SiparisSahibi,
	EvrakGideri,
	KonteynerAyrinti,
	UlkeId,
	FaturaKesimTurID,
	depo_yukleme,
	sigorta_Tutar,
	Operasyon,
	Finansman,
	Iade,
	MalBedeli,
	sigorta_tutar_satis,
	SiparisKontrol,
	SiparisKontrolEden,
	UretimAciklama,
	SevkiyatAciklama,
	FinansAciklama
)
	VALUES('${body.SiparisNo}','${body.SiparisTarihi}','${body.OdemeTurID}','${body.TeslimTurID}','${body.MusteriID}','${body.Pesinat}','${body.NavlunFirma}','${body.NavlunMekmarNot}','${body.NavlunAlis}','${body.NavlunSatis}','${body.KayitTarihi}',
		'${body.KullaniciID}','${body.SiparisDurumID}','${body.OdemeAciklama}','${body.TahminiYuklemeTarihi}','${body.Vade}','${body.Ulke}','${body.Komisyon}','${body.DetayAciklama_1}','${body.DetayMekmarNot_1}','${body.DetayTutar_1}',
		'${body.DetayAlis_1}','${body.DetayAciklama_2}','${body.DetayMekmarNot_2}','${body.DetayTutar_2}','${body.DetayAlis_2}','${body.SiparisSahibi}',
		'${body.EvrakGideri}','${body.KonteynerAyrinti}','${body.UlkeId}','${body.FaturaKesimTurID}','${body.depo_yukleme}','${body.sigorta_Tutar}','${body.Operasyon}','${body.Finansman}','${body.Iade}','${body.MalBedeli}',
		'${body.sigorta_tutar_satis}','${body.SiparisKontrol}','${body.SiparisKontrolEden}','${body.UretimAciklama}','${body.SevkiyatAciklama}','${body.FinansAciklama}'
)
    `;
	const getOrderId = `select top 1 ID from SiparislerTB order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertOrderSql,async(err,insert)=>{
            if(insert?.rowsAffected[0] == 1){
				await mssql.query(getOrderId,(err,orderId)=>{
					if(orderId?.recordset?.length >0){
						resolve({'status':true,'message':'Order added successfully','id':orderId?.recordset[0].ID});
					}else{
						resolve({'status':false,'message':'Order could not be added'});
					}
				});
            }else{
                resolve({'status':false,'message':'Order could not be added'});
            }
        });
    });
});