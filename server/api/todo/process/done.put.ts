import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const doneTodoSql = `update Yapilacaklar SET Yapildi=1,YapildiTarihi='${body.date}' where ID='${body.id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(doneTodoSql,(err,done)=>{
            if(done?.rowsAffected[0] == 1){
                resolve({message: 'Task marked as done successfully.', status:true});
            }else{
                resolve({message: 'Failed to mark task as done.', status:false});
            }
        });
    });
});