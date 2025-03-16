import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updateTodoSql = `
                update Yapilacaklar 
        SET
            Yapilacak='${body.Yapilacak}',
            GorevVerenID='${body.GorevVerenID}',
            GorevVerenAdi='${body.GorevVerenAdi}',
            YapilacakOncelik='${body.YapilacakOncelik}',
            Acil='${body.Acil}',
            OrtakGorev='${body.OrtakGorev}'

        where
            ID = '${body.ID}'
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updateTodoSql,async(err,update)=>{
            if(update?.rowsAffected[0] == 1){
                resolve({message: 'Task updated successfully.', status:true});
            }else{
                resolve({message: 'Failed to update task.', status:false});
            }
        });
    });

});