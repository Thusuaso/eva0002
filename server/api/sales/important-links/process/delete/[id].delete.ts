import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event,'id');
    const deleteSql = `delete ImportantLinksTB where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(deleteSql,async(err,deleted)=>{
            if(deleted?.rowsAffected[0]===1){
                resolve({message: 'Deleted successfully.', status:true});
            }else{
                resolve({message: 'Deleted failed.', status:false});
            }
        });
    });
});