import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const savedSql = `
        insert into Kasa_Detaylari_Yeni
(Crate_Width,
	Crate_Height,
	Crate_Thickness,
	Stone_Size,
	SupplierId,
	Supplier,
	Piece
) 
VALUES('${body.Crate_Width}','${body.Crate_Height}','${body.Crate_Thickness}','${body.Stone_Size}','${body.SupplierId}','${body.Supplier}','${body.Piece}')
    `;
    return new Promise(async(resolve,reject)=>{
        await mssql.query(savedSql,async (err,saved)=>{
            if(saved?.rowsAffected[0] === 1){
                resolve({
                    status:true,
                    message:'Crate size saved successfully'
                });
            }else{
                resolve({
                    status:false,
                    message:'Failed to save crate size'
                });
            }
        });
    });
});