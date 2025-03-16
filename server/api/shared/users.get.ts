import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const usersSql = `
        select ID,KullaniciAdi,MailAdres from KullaniciTB
        where Aktif=1
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(usersSql,(err,users)=>{
            resolve({list:users?.recordset});
        });
    });
});