import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const id = await getRouterParam(event,'id');
    const proformaDeleteSql = `delete SiparisFaturaKayitTB where ID='${id}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(proformaDeleteSql,(err,deleted)=>{
            if(deleted?.rowsAffected[0] == 1){
                resolve({message: 'Proforma deleted successfully.',status:true});
            }else{
                resolve({message: 'Failed to delete proforma.', status:false});
            }
        });
    });
});