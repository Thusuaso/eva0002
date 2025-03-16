import mssql from '~/mssql/api';

export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const getMailControlSql = `select top 1 * from KullaniciTB where MailAdres='${body.mail}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(getMailControlSql,(err:any,control)=>{
            if(control?.recordset?.length >0){
                resolve({'id':control?.recordset[0].ID,'status':true,'message':'Şifre değiştirme ekranına aktarılıyorsunuz.'});
            }else{
                resolve({'status':false,'message':'Böyle bir mail bulunmamaktadır.'});
            }
        });
    });

});