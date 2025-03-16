import mssql from '~/mssql/api';
export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateSql = `update ImportantLinksTB SET Description='${body.Description}',Link='${body.Link}',SaveDate='${body.SaveDate}',UpdatedUserID='${body.UpdatedUserID}'
where ID='${body.ID}'`;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateSql,(err,update)=>{
            if(update?.rowsAffected[0] === 1){
                resolve({message: 'Update successfully.', status: true});
            }else{
                resolve({message: 'Update failed.', status: false});
            }
        });
    });
});