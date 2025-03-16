import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const insertSql = `insert into ImportantLinksTB(Description,Link,SaveDate,UpdatedUserID)
values('${body.Description}','${body.Link}','${body.SaveDate}','${body.UpdatedUserID}')`;
    const getIdSql = `select top 1 ID from ImportantLinksTB order by ID desc`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(insertSql,async(err,insert)=>{
            if(insert?.rowsAffected[0] === 1){
                await mssql.query(getIdSql,async(err,id)=>{
                    if(id?.recordset?.length > 0){
                        resolve({message: 'Save successfully.', status: true, id: id?.recordset[0].ID});
                    } else{
                        reject({message: 'Failed to get ID.', status: false});
                    }
                });
            }else{
                reject({message: 'Save failed.', status: false});
            }
        });
    });
});