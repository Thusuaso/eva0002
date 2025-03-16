import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const id = getRouterParam(event,'id');
    const deleteSql = `delete Accounts where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deleteSql,(err,deleted)=>{
            if(deleted?.rowsAffected[0] == 1){
                resolve({message: 'Deleted successfully.', status:true});
            } else{
                resolve({message: 'Deleted failed.', status:false});
            }
        });
    });
});