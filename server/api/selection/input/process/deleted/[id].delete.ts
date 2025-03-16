import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event, 'id');
    const deleteSql = `delete UretimTB where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deleteSql,(err,deleted)=>{
            if(deleted?.rowsAffected[0] === 1){
                resolve({status:true,message:"Deleted successfully"});
            }else{
                resolve({status:true,message:"Failed to delete"});

            }
        });
    });
});