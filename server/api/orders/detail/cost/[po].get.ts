import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const po = await getRouterParam(event,'po');
    const getCostSqlOne = `
                               select *from
                (
                SELECT  sf.siparisNo, sf.Tutar as tut,sf.SiparisFaturaTurID ,sf.Aciklama ,sf.FaturaKayitID  FROM SiparisFaturaKayitTB sf where sf.Tutar>0
              
                )
                SiparisFaturaKayitTB where   SiparisFaturaKayitTB.SiparisNo='${po}'
    `;
    const getCostSqlTwo = `
                                         select *,f.Tutar as tut ,(Select t.FirmaAdi from TedarikciTB t where t.ID=f.TedarikciID )  as firma
              from SiparisEkstraGiderlerTB f
               where f.SiparisNo='${po}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getCostSqlOne,async (err,costOne)=>{
            await mssql.query(getCostSqlTwo,async(err,costTwo)=>{
                let costData = [];
                if (costTwo.recordset.length > 0) {
                    await costTwo.recordset.forEach(x => {
                        costData.push({ ...x, 'Tur': 'İşçilik' });
                    })
                };
                if(costOne.recordset.length >0){
                    costOne.recordset.forEach(y=>{
                        if(y.SiparisFaturaTurID == 100){
                            costData.push({...y,'Tur':'Lashing'})
                        };
                        if(y.SiparisFaturaTurID == 101){
                            costData.push({...y,'Tur':'Booking'})
                        };
                        if(y.SiparisFaturaTurID == 102){
                            costData.push({...y,'Tur':'Spazlet'})
                        };
                        if(y.SiparisFaturaTurID == 73){
                            costData.push({...y,'Tur':'İlaçlama'})
                        };
                        if(y.SiparisFaturaTurID == 7){
                            costData.push({...y,'Tur':'Gümrük'})
                        };
                        if(y.SiparisFaturaTurID == 11){
                            costData.push({...y,'Tur':'Nakliye'})
                        };
                        if(y.SiparisFaturaTurID == 13){
                            costData.push({...y,'Tur':'Navlun'})
                        };
                        if(y.SiparisFaturaTurID == 9){
                            costData.push({...y,'Tur':'Liman'})
                        };
                    });
                };
                resolve({'list':costData});
            });
        });
    });

});