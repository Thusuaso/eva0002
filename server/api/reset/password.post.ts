import mssql from '~/mssql/api';
export default defineEventHandler( async (event)=>{
    const body = await readBody(event);
    const setNewPasswordSql = `update KullaniciTB SET YSifre='${body.newPassword}' where MailAdres='${body.mail}'`;
    
    return new Promise(async(resolve,reject)=>{
        await mssql.query(setNewPasswordSql,async (err,password)=>{
            if(password?.rowsAffected[0]==1){
                resolve({status:true,'message':'Şifre başarıyla güncellendi.'});
            }else{
                resolve({status:false,'message':'Şifre güncelleme başarısız, lütfen tekrar deneyiniz.'});
            };
        });
    });
});