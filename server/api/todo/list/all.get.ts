import mssql from '~/mssql/api';

export default defineEventHandler(async ()=>{
    const getTodoSql = `select * from Yapilacaklar`;
    await mssql.query(getTodoSql,async(err,todo)=>{
        
    });

});