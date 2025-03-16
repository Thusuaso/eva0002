import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const onholdSql =  `
        select 

            s.ID as SiparisId,
        s.SiparisNo,
SiparisTarihi,        
s.OdemeTurID,
        ot.OdemeTur,
        s.OdemeTurID,
        s.TeslimTurID,
        stt.TeslimTur,
        s.MusteriID,
        m.FirmaAdi,
        s.Pesinat,
        s.NavlunFirma,
        s.NavlunMekmarNot,
        s.NavlunAlis,
        s.NavlunSatis,
        s.KayitTarihi,
        s.KullaniciID,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
        s.SiparisDurumID,
        sdt.Durum,
        s.UretimAciklama,
        s.SevkiyatAciklama,
        s.FinansAciklama,
        s.OdemeAciklama,
        s.TahminiYuklemeTarihi,
        s.YuklemeTarihi,
        s.FaturaNo,
        s.SiparisFaturaNo,
        s.Vade,
        s.Ulke,
        s.Komisyon,
        s.DetayAciklama_1,
        s.DetayMekmarNot_1,
        s.DetayTutar_1,
        s.DetayAlis_1,
        s.DetayAciklama_2,
        s.DetayMekmarNot_2,
        s.DetayTutar_2,
        s.DetayAlis_2,
        s.DetayAciklama_3,
        s.DetayMekmarNot_3,
        s.DetayTutar_3,
        s.DetayAlis_3,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
        s.EvrakGideri,
        s.Eta,
        s.UlkeId,
        ytu.UlkeAdi,
        fst.FaturaAdi,
        s.depo_yukleme,
        s.DetayTutar_4,
        s.DetayAciklama_4,
        s.sigorta_Tutar,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
        (select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
        (select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
        s.SiparisSahibi,
        s.Operasyon,
        s.Finansman,
        s.Iade,
        s.MalBedeli,
        s.sigorta_tutar_satis,
        s.KonteynerAyrinti,
        s.MayaControl,
        s.FaturaKesimTurID,
        s.KonteynerNo,
        s.SiparisKontrol,
        s.SiparisKontrolEden,


            su.ID as UrunId,
            su.SiparisNo as UrunSiparisNo,
            su.TedarikciID,
            t.FirmaAdi as UrunFirmaAdi,
            su.UrunKartID,
            k.KategoriAdi,
            urun.UrunAdi,
            yk.YuzeyIslemAdi,
            ol.En,
            ol.Boy,
            ol.Kenar,
            su.UrunBirimID,
            ub.BirimAdi,
            su.Miktar,
            su.OzelMiktar,
            su.KasaAdet,
            su.SatisFiyati,
            su.SatisToplam,
            su.UretimAciklama as UrunUretimAciklama,
            su.MusteriAciklama as UrunMusteriAciklama,
            su.AlisFiyati,
            su.SiraNo,
            su.Ton,
            su.Adet,
            ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
            dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
            dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
            dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf,
            (select top 1 uretim.Disarda from UretimTB uretim where uretim.SiparisAciklama = su.SiparisNo and uretim.UrunKartID = su.UrunKartID and uretim.Disarda = 1) as Out


        from SiparisUrunTB su
        inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
        inner join TedarikciTB t on t.ID = su.TedarikciID
        inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
        inner join UrunKartTB uk on uk.ID = su.UrunKartID
        inner join KategoriTB k on k.ID = uk.KategoriID
        inner join UrunlerTB urun on urun.ID = uk.UrunID
        inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
        inner join OlculerTB ol on ol.ID = uk.OlcuID
        inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
        inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
        inner join MusterilerTB m on m.ID = s.MusteriID
        inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
        inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
        inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

        where s.SiparisDurumID = 1 and m.Marketing= 'Mekmar'
        order by s.SiparisTarihi desc
    
    `;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(onholdSql,(err:any,onhold:any)=>{
            if(err){
                resolve({'error':true});
            }else{
                resolve({'error':false, 'list':onhold?.recordset});
            }
        });
    });
});
