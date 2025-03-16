import mssql from '~/mssql/api';

export default defineEventHandler( async () =>{
    const getCustomerSql = `select ID,FirmaAdi from MusterilerTB where Marketing in ('Mekmar','Imperial Homes')  and ID not in (6,34,314,153)`;
    const getCostSql=`select sum(s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3+s.sigorta_tutar_satis) as Masraf,s.MusteriID,m.FirmaAdi,s.Pesinat,s.SiparisDurumID from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID and m.Marketing in ('Mekmar','Imperial Homes')
group by s.MusteriID,m.FirmaAdi,s.Pesinat,s.SiparisDurumID
`;
    const getOrderSql=`
        select sum(SatisToplam) as Siparis,s.MusteriID,m.FirmaAdi,s.SiparisDurumID
        from 
        SiparisUrunTB su 
        inner join SiparislerTB s on s.SiparisNo=su.SiparisNo
        inner join MusterilerTB m on m.ID = s.MusteriID
        where m.Marketing in ('Mekmar','Imperial Homes')
        group by s.MusteriID,m.FirmaAdi,s.SiparisDurumID
    `;
    const getPaidSql=`
        select sum(o.Tutar) as Odemeler,s.MusteriID,s.SiparisDurumID from OdemelerTB o
        inner join SiparislerTB s on s.SiparisNo = o.SiparisNo
        inner join MusterilerTB m on m.ID = s.MusteriID and m.Marketing in ('Mekmar','Imperial Homes')
        group by s.MusteriID,s.SiparisDurumID
    `;


    return new Promise(async (resolve,reject)=>{
        const customer = await mssql.query(getCustomerSql);
        const cost = await mssql.query(getCostSql);
        const order = await mssql.query(getOrderSql);
        const paid = await mssql.query(getPaidSql);
        let data = [];
        customer.recordset.forEach(x=>{
            let totalOrder = 0;
            let totalProduction = 0;
            let totalShipped = 0;
            let totalPrepayment = 0;
            let totalPaidProduction = 0;
            let totalPaidShipped = 0;
            const filterCost = cost.recordset.filter(y=>y.MusteriID == x.ID);
            const filterOrder = order.recordset.filter(y=>y.MusteriID == x.ID);
            const filterPaid = paid.recordset.filter(y=>y.MusteriID == x.ID);
            filterCost.forEach(x=>{
                totalOrder += parseFloat(x.Masraf);
                if(x.SiparisDurumID === 1 || x.SiparisDurumID === 2){
                    totalProduction += parseFloat(x.Masraf);
                    totalPrepayment += parseFloat(x.Pesinat);
                }else if (x.SiparisDurumID ===3){
                    totalShipped += parseFloat(x.Masraf);
                };
            });
    
            filterOrder.forEach(x=>{
                totalOrder += parseFloat(x.Siparis);
                if(x.SiparisDurumID === 1 || x.SiparisDurumID === 2){
                    totalProduction += parseFloat(x.Siparis);
                }else if (x.SiparisDurumID === 3){
                    totalShipped+= parseFloat(x.Siparis);
                };
            });
    
            filterPaid.forEach(x=>{
                totalPaidProduction += parseFloat(x.Odemeler);
                if(x.SiparisDurumID === 3){
                    totalPaidShipped += parseFloat(x.Odemeler);
                }
            });
            
            data.push({'CustomerID':x.ID,'Customer':x.FirmaAdi,'TotalOrder':totalOrder,'TotalProduction':totalProduction,'TotalShipped':totalShipped,'TotalPrepayment':totalPrepayment,'TotalPaid':totalPaidProduction,'TotalBalanceShipped':(totalShipped - totalPaidProduction),'TotalBalanceProduction':(totalOrder - totalPaidProduction)})
            
        
        });
        resolve({'list':data});
    });


    




});