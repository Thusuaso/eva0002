import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event,'id');
    const deletedTodoSql = `delete Yapilacaklar where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deletedTodoSql,(err,deleted)=>{
            if(deleted?.rowsAffected[0] == 1){
                resolve({message: 'Todo deleted successfully.', status:true});
            }else{
                resolve({message: 'Failed to delete todo.', status:false});
            }
        });
    });
});