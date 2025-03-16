import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const po = await getRouterParam(event,'po');
    const getDocumentListSql = `
        select
            *,
            
			(select k.KullaniciAdi from KullaniciTB k where k.ID=f.KullaniciID) as kullanici,
			(select nfk.FirmaID from NakliyeFaturaKayitTB nfk where nfk.ID = f.FaturaKayitID) as NakliyeFirmaID,
			(select (select firma.FirmaAdi from FirmalarTB firma where firma.ID = nfk.FirmaID) from NakliyeFaturaKayitTB nfk where nfk.ID = f.FaturaKayitID) as NakliyeFirmaAdi,
            			(select (select firma.FirmaAdi  from FirmalarTB firma  where firma.ID=k.FirmaID) as firma from KonteynerDigerFaturalarKayitTB k where k.ID = f.FaturaKayitID) as KonteynerFirmaAdi,
			(select (select firma.ID  from FirmalarTB firma  where firma.ID=k.FirmaID) as firma from KonteynerDigerFaturalarKayitTB k where k.ID = f.FaturaKayitID) as KonteynerFirmaID
            from
            SiparisFaturaKayitTB f
            where f.SiparisNo in
            (
                Select s.SiparisNo from SiparislerTB s,MusterilerTB m
                where m.ID=s.MusteriID and s.SiparisNo=f.SiparisNo
            
               
              
				and f.SiparisNo='${po}'
            )
            order by YuklemeEvrakID ASC
    
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getDocumentListSql,(err,documents)=>{
            documents.recordset.forEach(x => {
                if (x.YuklemeEvrakID == 1) {
                    x.Link = `https://file-service.mekmar.com/file/download/1/${x.SiparisNo}`;
                    x.Evrak = 'Purchase Order';
                };
                if (x.YuklemeEvrakID == 2) {
                    x.Link = `https://file-service.mekmar.com/file/download/2/${x.SiparisNo}`;
                    x.Evrak = 'Proforma Invoice';
                };
                if((x.YuklemeEvrakID == 3) && (x.Evrak_Kontrol != 1)){
                    x.Link = `https://file-service.mekmar.com/file/download/3/${x.SiparisNo}`;
                    x.Evrak = 'ISF - ' + x.EvrakAdi;
                };
                if((x.YuklemeEvrakID == 3) && (x.Evrak_Kontrol == 1)){
                    x.Link = `https://file-service.mekmar.com/file/download/3/${x.EvrakAdi}`;
                    x.Evrak = 'ISF - ' + x.EvrakAdi;
                };
                if (x.YuklemeEvrakID == 4) {
                    x.Link = `https://file-service.mekmar.com/file/download/4/${x.SiparisNo}`;
                    x.Evrak = 'Packing List (Çeki Listesi)';
                };
                if (x.YuklemeEvrakID == 5) {
                    x.Link = `https://file-service.mekmar.com/file/download/5/${x.SiparisNo}`;
                    x.Evrak = 'Shipping Instruction (Yükleme Notası)';
                };
                if (x.YuklemeEvrakID == 6) {
                    x.Link = `https://file-service.mekmar.com/file/download/6/${x.SiparisNo}`;
                    x.Evrak = 'Custom Invoice (Gümrük Faturası)';
                };
                if (x.YuklemeEvrakID == 7) {
                    x.Link = `https://file-service.mekmar.com/file/download/7/${x.SiparisNo}`;
                    x.Evrak = 'Custom Note (Gümrük Notası)';
                };
                if (x.YuklemeEvrakID == 8) {
                    x.Link = `https://file-service.mekmar.com/file/download/8/${x.SiparisNo}`;
                    x.Evrak = 'Port Documents (VGM vb)';
                };
                if (x.YuklemeEvrakID == 9) {
                    x.Link = `https://file-service.mekmar.com/file/download/9/${x.SiparisNo}`;
                    x.Evrak = 'Bill of Lading (Konşimento)';
                };
                if (x.YuklemeEvrakID == 10) {
                    x.Link = `https://file-service.mekmar.com/file/download/10/${x.SiparisNo}`;
                    x.Evrak = 'Fumigation Certificate (İlaçlama Belgesi)';
                };
                if (x.YuklemeEvrakID == 11) {
                    x.Link = `https://file-service.mekmar.com/file/download/11/${x.SiparisNo}`;
                    x.Evrak = 'ATR (Dolaşım Belgesi)';
                };
                if (x.YuklemeEvrakID == 12) {
                    x.Link = `https://file-service.mekmar.com/file/download/12/${x.SiparisNo}`;
                    x.Evrak = 'Export Declaration (Gümrük Çıkış Beyan. GÇB)';
                };
                if (x.YuklemeEvrakID == 14) {
                    x.Link = `https://file-service.mekmar.com/file/download/14/${x.SiparisNo}`;
                    x.Evrak = 'Packing Declarition';
                };
                if (x.YuklemeEvrakID == 15) {
                    x.Link = `https://file-service.mekmar.com/file/download/15/${x.SiparisNo}`;
                    x.Evrak = 'Letter of Credit Text (LC Metin)';
                };
                if (x.YuklemeEvrakID == 16) {
                    x.Link = `https://file-service.mekmar.com/file/download/16/${x.SiparisNo}`;
                    x.Evrak = 'Commercial Invoice (Ticari Fatura)';
                };
                if (x.YuklemeEvrakID == 17) {
                    x.Link = `https://file-service.mekmar.com/file/download/17/${x.SiparisNo}`;
                    x.Evrak = 'Packing List (Çeki Listesi)';
                };
                if (x.YuklemeEvrakID == 20) {
                    x.Link = `https://file-service.mekmar.com/file/download/20/${x.SiparisNo}`;
                    x.Evrak = 'Booking Confirmation (Rezervasyon)';
                };
                if (x.YuklemeEvrakID == 30) {
                    x.Link = `https://file-service.mekmar.com/file/tedarikci/download/30/${x.SiparisNo}/${x.EvrakAdi}`;
                    x.Evrak = 'Supplier Invoices (Tedarikçi Faturaları) - ' + x.EvrakAdi;
                };
                if (x.YuklemeEvrakID == 13) {
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.NakliyeFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = 'Transportation Invoices (Nakliye Faturaları) - ' + x.NakliyeFirmaAdi
                };
                if (x.YuklemeEvrakID == 40) {
                    x.Link = `https://file-service.mekmar.com/file/download/40/${x.SiparisNo}`;
                    x.Evrak = 'Labor Cost (Özel İşçilik Ft.)';
                };
                if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID == 7){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/3/${x.EvrakAdi}`;
                    x.Evrak = 'Customs - ' + x.KonteynerFirmaAdi;
                }
    
                if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID==9 ){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = 'Shipping Invoices (Denizcilik Faturaları) - ' + x.KonteynerFirmaAdi;
                };
                if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID==13 ){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = 'Freight - ' + x.KonteynerFirmaAdi;
                };
                if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID==13 ){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = 'Freight - ' + x.KonteynerFirmaAdi;
                };
                if(x.YuklemeEvrakID == 70 && x.SiparisFaturaTurID==7 ){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = 'Customs - '+ x.KonteynerFirmaAdi;
                };
                if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID==73 ){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = 'Fumigation - ' + x.KonteynerFirmaAdi;
                };
                if(x.YuklemeEvrakID == 71 ){
                    x.Link = `https://file-service.mekmar.com/file/download/71/${x.SiparisNo}`;
                    x.Evrak = 'Fumigation Note (İlaçlama Notası)';
                };
                if(x.YuklemeEvrakID == 72 ){
                    x.Link = `https://file-service.mekmar.com/file/download/72/${x.SiparisNo}`;
                    x.Evrak = 'Pictures of Loading';
                };
                if(x.YuklemeEvrakID == 73 ){
    
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = x.KonteynerFirmaAdi;
                };
                
                if(x.YuklemeEvrakID == 74 ){
                    x.Link = `https://file-service.mekmar.com/file/download/74/${x.SiparisNo}`;
                    x.Evrak = 'Certificate of Origin';
                };
                if(x.YuklemeEvrakID == 75 ){
                    x.Link = `https://file-service.mekmar.com/file/download/75/${x.SiparisNo}`;
                    x.Evrak = 'ATR';
                };
                if(x.YuklemeEvrakID == 76 ){
                    x.Link = `https://file-service.mekmar.com/file/download/76/${x.SiparisNo}`;
                    x.Evrak = 'Dispatch Note (İrsaliye)';
                };
                if(x.YuklemeEvrakID == 77 ){
                    x.Link = `https://file-service.mekmar.com/file/download/77/${x.SiparisNo}`;
                    x.Evrak = 'Other (Diğer)';
                };
    
                if(x.YuklemeEvrakID == 99 ){
                    x.Link = `https://file-service.mekmar.com/file/download/99/${x.SiparisNo}`;
                    x.Evrak = 'Draft';
                };
                if(x.SiparisFaturaTurID == 101 ){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = ' Booking - ' + x.KonteynerFirmaAdi ;
                };
                if(x.SiparisFaturaTurID == 102 ){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = 'Spanzet - ' + x.KonteynerFirmaAdi ;
                };
                if(x.SiparisFaturaTurID == 100 ){
                    x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                    x.Evrak = 'Lashing - ' + x.KonteynerFirmaAdi;
                };
            });
            const liste = documents.recordset.filter(x=>{
                return !(x.YuklemeEvrakID == 0 && x.SiparisFaturaTurID == 0)
            });
            resolve({ 'list': liste });
        });
    });
});