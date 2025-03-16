import mssql from '~/mssql/api';

export default defineEventHandler(()=>{
    let sqlOrderMonth = "select (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) and MONTH(s.SiparisTarihi) = MONTH(GETDATE()) and m.Marketing='Mekmar' group by s.SiparisNo";
    let sqlOrderYear = "select (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) and MONTH(s.SiparisTarihi) <= MONTH(GETDATE()) - 1  and m.Marketing='Mekmar' group by s.SiparisNo";
    let sqlForwardingMonth = "select (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and MONTH(s.YuklemeTarihi) = MONTH(GETDATE()) and m.Marketing='Mekmar' and s.SiparisDurumID = 3 group by s.SiparisNo";
    let sqlForwardingYear = "select (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and MONTH(s.YuklemeTarihi) <= MONTH(GETDATE()) - 1  and m.Marketing='Mekmar' and s.SiparisDurumID = 3 group by s.SiparisNo";
    let sqlChartYearOne = "select MONTH(s.YuklemeTarihi) as Ay,s.SiparisNo,(select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and s.SiparisDurumID=3 and m.Marketing ='Mekmar' group by MONTH(s.YuklemeTarihi),s.SiparisNo order by MONTH(s.YuklemeTarihi)";
    let sqlChartYearTwo = "select MONTH(s.YuklemeTarihi) as Ay,s.SiparisNo,(select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) - 1 and s.SiparisDurumID=3 and m.Marketing ='Mekmar' group by MONTH(s.YuklemeTarihi),s.SiparisNo order by MONTH(s.YuklemeTarihi)";
    let sqlChartCustomerShipped = `
            select 

                m.Marketing,
                (select sum(su.SatisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo)
                + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as total


            from SiparislerTB s
            inner join MusterilerTB m on m.ID = s.MusteriID

            where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and s.SiparisDurumID=3

            group by m.Marketing, s.SiparisNo
    `;
    let sqlChartProduct = `
        select 

            sum(u.Miktar) as total,
            u.UrunBirimID as BirimId,
            (select ub.BirimAdi from UrunBirimTB ub where ub.ID = u.UrunBirimID) as BirimAdi,
			MONTH(u.Tarih) as month

        from UretimTB u

        where YEAR(u.Tarih) = YEAR(GETDATE()) and u.TedarikciID in (1,123)

        group by u.UrunBirimID,MONTH(u.Tarih)
        order by MONTH(u.Tarih)
    `;
    let sqlChartOffers = `
        select t.KullaniciId as UserId,count(t.Id) as Offer, MONTH(t.Tarih) as Month,
            (select k.KullaniciAdi from KullaniciTB k where k.ID = t.KullaniciId) as Username
        from YeniTeklifTB t

        where YEAR(t.Tarih) = YEAR(GETDATE())

        group by MONTH(t.Tarih),t.KullaniciId
        order by MONTH(t.Tarih)
    `;
    
    function _forSum(data:any){
        let sum = 0;
        if(data.length == 0){
            sum = 0;
        }else{
            data.forEach((x: { Total: number; })=>{
                sum += x.Total;
            });
        }
        return sum;
    }
    function _chartSum(data:any){
        let chart = [0,0,0,0,0,0,0,0,0,0,0,0];
        for(const item of data){
            if(item.Ay == 1){
                chart[0] += +item.Total;
            } else if(item.Ay == 2){
                chart[1] += +item.Total;
            }else if(item.Ay == 3){
                chart[2] += +item.Total;
            }else if(item.Ay == 4){
                chart[3] += +item.Total;
            }else if(item.Ay == 5){
                chart[4] += +item.Total;
            }else if(item.Ay == 6){
                chart[5] += +item.Total;
            }else if (item.Ay == 7){
                chart[6] += +item.Total;
            }else if (item.Ay == 8){
                chart[7] += +item.Total;
            }else if (item.Ay == 9){
                chart[8] += +item.Total;
            }else if (item.Ay == 10){
                chart[9] += +item.Total;
            }else if (item.Ay == 11){
                chart[10] += +item.Total;
            }else if (item.Ay == 12){
                chart[11] += +item.Total;
            }


        };
        return chart;
    };
    function _chartCustomerShippedSum(data:any){
        let chart = [0,0,0,0];
        data.forEach((x: { Marketing: string; total: string | number; })=>{
            if(x.Marketing == 'Mekmar'){
                chart[0] += +x.total;
            }else if(x.Marketing == 'İç Piyasa'){
                chart[1] += +x.total;
            }else if(x.Marketing == 'Imperial Homes'){
                chart[2] += +x.total;
            }else if(x.Marketing == 'Mekmer'){
                chart[3] += +x.total;
            }
        });
        return chart;
    };
    function _chartProductsSum(data:any){
        const chart_sqm = [0,0,0,0,0,0,0,0,0,0,0,0];
        const chart_piece = [0,0,0,0,0,0,0,0,0,0,0,0];
        const chart_mt = [0,0,0,0,0,0,0,0,0,0,0,0];
        data.forEach((x: { BirimId: number; month: number; total: number; })=>{
            if(x.BirimId == 1){
                chart_sqm[x.month - 1] += x.total;
            }else if (x.BirimId == 2){
                chart_piece[x.month - 1] += x.total;
            }else if (x.BirimId == 3){
                chart_mt[x.month - 1] += x.total;
            }
        });
        return {
            'sqm':chart_sqm,
            'piece':chart_piece,
            'mt':chart_mt
        }
    };
    function _chartOffersSum(data:any){
        const chart_h = [0,0,0,0,0,0,0,0,0,0,0,0];
        const chart_o = [0,0,0,0,0,0,0,0,0,0,0,0];
        data.forEach((x: { UserId: number; Month: number; Offer: number; })=>{
            if(x.UserId == 19){
                chart_o[x.Month - 1] += x.Offer;
            }else if (x.UserId == 44){
                chart_h[x.Month - 1] += x.Offer;
            };
        });
        return {
            'chart_h':chart_h,
            'chart_o':chart_o
        }
    }
    
    return new Promise(async(resolve,reject)=>{
        await mssql.query(sqlOrderMonth,async (err:any,orderMonth:any)=>{
            if(err){
                resolve({'status':true});
            }else{
                await mssql.query(sqlOrderYear,async(err:any,orderYear:any)=>{
                    if(err){
                        resolve({'status':true});
                    }else{
                        await mssql.query(sqlForwardingMonth,async(err:any,sqlForwardingMonth:any)=>{
                            if(err){
                                resolve({'status':true});
                            }else{
                                await mssql.query(sqlForwardingYear,async(err:any,sqlForwardingYear:any)=>{
                                    if(err){
                                        resolve({'status':true});
                                    }else{
                                        await mssql.query(sqlChartYearOne,async(err:any,chartYearOne)=>{
                                            if(err){
                                                resolve({'status':true});
                                            }else{
                                                await mssql.query(sqlChartYearTwo,async(err:any,chartYearTwo)=>{
                                                    if(err){
                                                        resolve({'status':true});
                                                    } else{

                                                        await mssql.query(sqlChartCustomerShipped,async(err:any,chartShippedCustomer)=>{
                                                            if(err){
                                                                resolve({'status':true});
                                                            }else{

                                                                await mssql.query(sqlChartProduct,async(err:any,chartProducts)=>{
                                                                    if(err){
                                                                        resolve({'status':true});
                                                                    }else{

                                                                        await mssql.query(sqlChartOffers,async(err:any,chartOffers)=>{
                                                                            if(err){
                                                                                resolve({'status':true});
                                                                            }else{
                                                                                let __monthOrder = _forSum(orderMonth.recordset);
                                                                        let __yearOrder = _forSum(orderYear.recordset);
                                                                        let __monthForwarding = _forSum(sqlForwardingMonth.recordset);
                                                                        let __yearForwarding = _forSum(sqlForwardingYear.recordset);
                                                                        let date = new Date();
                                                                        let year = date.getFullYear();
                                                                        let month = date.getMonth() + 1;
                                                                        let _productsChartData = _chartProductsSum(chartProducts?.recordset);
                                                                        let _offeresChartData = _chartOffersSum(chartOffers?.recordset);
                                                                        const data = {
                                                                            'orderMonth':__monthOrder,
                                                                            'orderYear':__yearOrder,
                                                                            'orderAverage': __yearOrder / month,
                                                                            'orderForecast': (__yearOrder / month) * 12,
                                                                            'forwardingMonth':__monthForwarding,
                                                                            'forwardingYear':__yearForwarding,
                                                                            'forwardingAverage': __yearForwarding / month,
                                                                            'forwardingForecast': (__yearForwarding / month) * 12,
                                                                            'month':month,
                                                                            'year':year,
                                                                            'chartShipped':{
                                                                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                                                                datasets: [
                                                                                    {
                                                                                        label: new Date().getFullYear(),
                                                                                        backgroundColor: '#599669',
                                                                                        borderColor: 'grey',
                                                                                        data: _chartSum(chartYearOne?.recordset)
                                                                                    },
                                                                                    {
                                                                                        label: new Date().getFullYear() - 1,
                                                                                        backgroundColor: '#32296e',
                                                                                        borderColor: 'grey',
                                                                                        data: _chartSum(chartYearTwo?.recordset)
                                                                                    }
                                                                                ]
                                                                            },
                                                                            'chartCustomerShipped':{
                                                                                labels: ['Mekmar', 'İç Piyasa', 'Imperial Homes', 'Mekmer'],
                                                                                datasets: [
                                                                                    {
                                                                                        data: _chartCustomerShippedSum(chartShippedCustomer?.recordset),
                                                                                        backgroundColor: ['#aba34f','#ab6e4f','#4fab9f','#ab4f86'],
                                                                                        hoverBackgroundColor: ['grey','grey','grey','grey']
                                                                                    }
                                                                                ]
                                                                            },
                                                                            'chartProducts':{
                                                                                labels: ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'],
                                                                                datasets: [
                                                                                    {
                                                                                        type: 'bar',
                                                                                        label: 'SQM',
                                                                                        backgroundColor: '#f2bf33',
                                                                                        data: _productsChartData.sqm
                                                                                    },
                                                                                    {
                                                                                        type: 'bar',
                                                                                        label: 'PIECE',
                                                                                        backgroundColor: '#33f2e2',
                                                                                        data: _productsChartData.piece
                                                                                    },
                                                                                    {
                                                                                        type: 'bar',
                                                                                        label: 'MT',
                                                                                        backgroundColor: '#5333f2',
                                                                                        data: _productsChartData.mt
                                                                                    }
                                                                                ]
                                                                            },
                                                                            'chartOffers':{
                                                                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                                                                datasets: [
                                                                                    {
                                                                                        label: 'Özlem',
                                                                                        backgroundColor: '#e86db3',
                                                                                        borderColor: 'grey',
                                                                                        data: _offeresChartData.chart_o
                                                                                    },
                                                                                    {
                                                                                        label: 'Hakan',
                                                                                        backgroundColor: '#6d94e8',
                                                                                        borderColor: 'grey',
                                                                                        data: _offeresChartData.chart_h
                                                                                    }
                                                                                ]
                                                                            }
        
        
                                                                        };
                                                                            resolve(data);
                                                                            }
                                                                        });







                                                                        
                                                                    }
                                                                });



    
                                                            
                                                                
                                                            }
                                                        });

                                                        
                                                    }
                                                });
                                            }
                                        })
                                    }
                                })
                            }
                        });
                    }
                })
            }

        });
    });


});