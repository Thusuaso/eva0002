import { resolve } from 'chart.js/helpers';
import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const savePrePaymentSql = `
        insert into OdemelerTB
        (Tarih,MusteriID,SiparisNo,FinansOdemeTurID,Tutar,Masraf,KullaniciID,Kur)
        VALUES(
        '${body.date}',
        '${body.customer}',
        '${body.po}',
        '${body.paidkind}',
        '${body.price}',
        '${body.cost}',
        '${body.user}',
        '${body.currency}'
    `;
    
    return new Promise(async (resolve,reject) =>{
        await mssql.query(savePrePaymentSql,(err,prepayment)=>{
            resolve({'status':true,'message':'Paid saved successfully'});
        });
    });
});