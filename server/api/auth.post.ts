import mssql from '~/mssql/api';
import jwt from 'jsonwebtoken';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const authControlSql = `select top 1 * from KullaniciTB where KullaniciAdi='${body.username}' and YSifre='${body.password}'
`;  
    const JWT_SECRET = '123456790qwertyuıopasdfghjklzxcvbnm.,'; // Replace with your secret key

    return new Promise(async( resolve,reject)=>{    
        await mssql.query(authControlSql,(err:any,auth:any)=>{
            if(auth?.recordset?.length >0){
                const token = jwt.sign({id:auth?.recordset[0].ID,username:auth?.recordset[0].username}
                    ,JWT_SECRET,{ expiresIn: '1h' }

                )
                
                resolve({status:true,message:"Login Successful","user":auth?.recordset[0],"token":token});
                
            }else{
                resolve({status:false,message:"Login Failed"});
            }
        })
    });
});