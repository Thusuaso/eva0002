import mssql from '~/mssql/api';

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const updatedSql = `
       update Kasa_Detaylari_Yeni
SET
	Crate_Width='${body.Crate_Width}',
	Crate_Height='${body.Crate_Height}',
	Crate_Thickness='${body.Crate_Thickness}',
	Stone_Size='${body.Stone_Size}',
	SupplierId='${body.SupplierId}',
	Supplier='${body.Supplier}',
	Piece='${body.Piece}'
WHERE
	ID='${body.ID}'
    `;
    
    return new Promise(async(resolve,reject)=>{
        await mssql.query(updatedSql,(err,updated)=>{
            if(updated?.rowsAffected[0] === 1){
                resolve({
                    status:200,
                    message:'Crate size updated successfully',
                });
            }else{
                resolve({
                    status:200,
                    message:'Failed to update crate size'
                });
            }
        });
    });
});