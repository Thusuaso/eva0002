import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    function noneControl(value:any) {
        if (value == null || value == undefined) {
            return parseFloat(0).toFixed(4);
        } else{
            return parseFloat(value).toFixed(4);
        }
    };
    const prePaymentSqlList = ` select
            s.SiparisNo,
            m.FirmaAdi,
            s.MusteriID,
            Sum(s.Pesinat) as Pesinat,
            dbo.Finance_Paid_List_Po(s.SiparisNo) as Odenen,
            (select k.MailAdres from KullaniciTB k where s.SiparisSahibi = k.ID) as Mail,
			 m.Marketing,
             (sum(s.Pesinat)) - dbo.Finance_Paid_List_Po(s.SiparisNo) as Kalan

            from
            SiparislerTB s,MusterilerTB m
            where
            s.SiparisDurumID in (1,2)
            and s.Pesinat >0
            and m.ID = s.MusteriID
            group by s.SiparisNo,s.MusteriID,m.FirmaAdi,m.Marketing,s.siparisSahibi,s.SiparisTarihi
            order by s.SiparisTarihi desc`; 

    return new Promise(async(resolve,reject)=>{
        await mssql.query(prePaymentSqlList,(err,prePayment)=>{
            const list = [];
            prePayment?.recordset.forEach(x=>{
               if((x.Pesinat - noneControl(x.Odenen)) >0){
                   list.push(x);
                } 
            });
            resolve({'list':list});
        });
    });

});