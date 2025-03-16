import mssql from '~/mssql/api';

export default defineEventHandler(async()=>{
    const sql = `select ID,Crate_Width,Crate_Height,Crate_Thickness,Stone_Size,SupplierId,Supplier,Piece from Kasa_Detaylari_Yeni
`;

    return new Promise(async(resolve,reject)=>{
        await mssql.query(sql,async (err,result)=>{
            resolve({ 'list':result?.recordset });
        });
    });
 
});