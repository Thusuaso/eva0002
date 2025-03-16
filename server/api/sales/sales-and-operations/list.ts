import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const salesAndOperationSql = `
        select 
            s.SiparisNo,
            (select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
            (select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
            s.SiparisSahibi,
            s.Operasyon
        from 
        SiparislerTB s where s.SiparisDurumID=2 order by s.SiparisTarihi desc
    `;
    const salesAndOperationOneSql = `
        select count(s.SiparisSahibi) as Total,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as Name,
s.SiparisSahibi

from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where m.Marketing in ('Mekmar','Imperial Homes') and s.SiparisDurumID=2 group by s.SiparisSahibi order by count(s.SiparisSahibi) desc
    `
    const salesAndOperationTwoSql = `
        select count(s.Operasyon) as Total,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as Name,
s.Operasyon

from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where m.Marketing in ('Mekmar','Imperial Homes') and s.SiparisDurumID=2 group by s.Operasyon order by count(s.Operasyon) desc
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(salesAndOperationSql,async (err,sales)=>{
            await mssql.query(salesAndOperationOneSql,async(err,salesOne)=>{
                await mssql.query(salesAndOperationTwoSql,async(err,salesTwo)=>{
                    resolve({'listOne':sales?.recordset,'listTwo':salesOne?.recordset,'listThree':salesTwo?.recordset});
                });
            });
        });
    });
});