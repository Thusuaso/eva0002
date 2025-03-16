import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertSql =  `
                insert into Accounts (Platform,LoginName,LoginPassword)
        VALUES('${body.Platform}','${body.LoginName}','${body.LoginPassword}')
    `;
    const getListSql = `select top 1 ID from Accounts order by ID desc`;
    return new Promise(async( resolve,reject)=>{
        await mssql.query(insertSql,async (err,insert)=>{
            if(insert?.rowsAffected[0] == 1){
                await mssql.query(getListSql,async(err,id)=>{
                    if(id?.recordset?.length >0){
                        resolve({'status':true,'id':id?.recordset[0]?.ID,'message':'Saved successfully'});
                    }else{
                        resolve({'status':false,'message':'Saved failed'});

                    }
                });
            }else{
                resolve({'status':false,'message':'Saved failed'});

            }
        });
    });
});