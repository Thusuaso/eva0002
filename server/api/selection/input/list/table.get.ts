import mssql from '~/mssql/api';
export default defineEventHandler(async()=>{
    const sql = 'select u.UrunBirimID,sum(u.Miktar) as Miktar,(select t.FirmaAdi from TedarikciTB t where t.ID = u.TedarikciID) as TedarikciAdi,u.TedarikciID from UretimTB u where  YEAR(u.Tarih) = YEAR(GETDATE()) and MONTH(u.Tarih) = MONTH(GETDATE()) group by u.TedarikciID,u.UrunBirimID';
    const sql2 = `
        select sum(u.Miktar) as Miktar,(select t.FirmaAdi from TedarikciTB t where 
        t.ID = u.TedarikciID) as TedarikciAdi,u.TedarikciID,u.UrunBirimID from UretimTB u where u.UrunBirimID = 1 and YEAR(u.Tarih) = YEAR(GETDATE()) 
        group by u.TedarikciID,u.UrunBirimID
    `;
    const sql3 = `
    select su.TedarikciID,YEAR(se.Tarih) as Year,MONTH(se.Tarih) as Month,se.Tarih,se.SiparisNo,su.Miktar,su.UrunBirimID,(select ub.BirimAdi from UrunBirimTB ub where ub.ID = su.UrunBirimID)as BirimAdi from SiparisEkstraGiderlerTB se 
    inner join SiparisUrunTB su on su.SiparisNo=se.SiparisNo
    where YEAR(se.Tarih) = YEAR(GETDATE()) and MONTH(se.Tarih) = MONTH(GETDATE())

    `;
    const sql4 = `
            select su.TedarikciID,YEAR(se.Tarih) as Year,MONTH(se.Tarih) as Month,se.Tarih,se.SiparisNo,su.Miktar,su.UrunBirimID,(select ub.BirimAdi from UrunBirimTB ub where ub.ID = su.UrunBirimID)as BirimAdi from SiparisEkstraGiderlerTB se 
    inner join SiparisUrunTB su on su.SiparisNo=se.SiparisNo
    where YEAR(se.Tarih) = YEAR(GETDATE()) 

        
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(sql,async(err,productMonth)=>{
            await mssql.query(sql2,async(err,productYear)=>{
                await mssql.query(sql3,async (err,productSelectionMonth)=>{
                    await mssql.query(sql4,async (err,productSelectionYear)=>{
                        let data = {
                            'mekmerMonthSqm':0,
                            'mekmerMonthPcs':0,
                            'mekmerMonthMt':0,
        
                            'mekmozMonthSqm':0,
                            'mekmozMonthPcs':0,
                            'mekmozMonthMt':0,
        
                            'disMonthSqm':0,
                            'disMonthPcs':0,
                            'disMonthMt':0,
        
                            'mekmerYearSqm':0,
                            'mekmerYearPcs':0,
                            'mekmerYearMt':0,
        
                            'mekmozYearSqm':0,
                            'mekmozYearPcs':0,
                            'mekmozYearMt':0,
        
                            'disYearSqm':0,
                            'disYearPcs':0,
                            'disYearMt':0,
        
                            'monthTotalSqm':0,
                            'monthTotalPcs':0,
                            'monthTotalMt':0,
        
                            'yearTotalSqm':0,
                            'yearTotalPcs':0,
                            'yearTotalMt':0,
        
                        };
                        await productMonth?.recordset.forEach(x =>{
                            if(x.UrunBirimID == 1){
                                data.monthTotalSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.monthTotalPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.monthTotalMt += x.Miktar;
                            }
                            if(x.TedarikciID == 1){
                                if(x.UrunBirimID == 1){
                                    data.mekmerMonthSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.mekmerMonthPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.mekmerMonthMt += x.Miktar;
                                }
                            }else if (x.TedarikciID == 123){
                                if(x.UrunBirimID == 1){
                                    data.mekmozMonthSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.mekmozMonthPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.mekmozMonthMt += x.Miktar;
                                }
                            } else {
                                if(x.UrunBirimID == 1){
                                    data.disMonthSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.disMonthPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.disMonthMt += x.Miktar;
                                }
                            }
                        });
            
                        await productYear?.recordset.forEach(x=>{
                            if(x.UrunBirimID == 1){
                                data.yearTotalSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.yearTotalPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.yearTotalMt += x.Miktar;
                            }
                            if(x.TedarikciID == 1){
                                if(x.UrunBirimID == 1){
                                    data.mekmerYearSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.mekmerYearPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.mekmerYearMt += x.Miktar;
                                }
                            }else if (x.TedarikciID == 123){
                                if(x.UrunBirimID == 1){
                                    data.mekmozYearSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.mekmozYearPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.mekmozYearMt += x.Miktar;
                                }
                            } else {
                                if(x.UrunBirimID == 1){
                                    data.disYearSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.disYearPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.disYearMt += x.Miktar;
                                }
                            }
                        });
                        await productSelectionMonth?.recordset.forEach(x=>{
                            if(x.UrunBirimID == 1){
                                data.monthTotalSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.monthTotalPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.monthTotalMt += x.Miktar;
                            };
                            if(x.TedarikciID == 1){
                                if(x.UrunBirimID == 1){
                                    data.mekmerMonthSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.mekmerMonthPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.mekmerMonthMt += x.Miktar;
                                }
                            }else if (x.TedarikciID == 123){
        
                                if(x.UrunBirimID == 1){
                                    data.mekmozMonthSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.mekmozMonthPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.mekmozMonthMt += x.Miktar;
                                }
                            }else{
                                if(x.UrunBirimID == 1){
                                    data.disMonthSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.disMonthPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.disMonthMt += x.Miktar;
                                }
                            }
                        });
                        await productSelectionYear?.recordset.forEach(x=>{
                            if(x.UrunBirimID == 1){
                                data.yearTotalSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.yearTotalPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.yearTotalMt += x.Miktar;
                            };
                            if(x.TedarikciID == 1){
                                if(x.UrunBirimID == 1){
                                    data.mekmerYearSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.mekmerYearPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.mekmerYearMt += x.Miktar;
                                }
                            }else if (x.TedarikciID == 123){
        
                                if(x.UrunBirimID == 1){
                                    data.mekmozYearSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.mekmozYearPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.mekmozYearMt += x.Miktar;
                                }
                            }else{
                                if(x.UrunBirimID == 1){
                                    data.disYearSqm += x.Miktar;
                                }else if (x.UrunBirimID == 2){
                                    data.disYearPcs += x.Miktar;
                                }else if (x.UrunBirimID == 3){
                                    data.disYearMt += x.Miktar;
                                }
                            }
                        });
        
        
        
                
                        resolve({'list':data});
                    });
                });
    
            });
            
        });
    });

});