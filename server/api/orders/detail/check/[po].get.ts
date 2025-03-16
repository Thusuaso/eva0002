import mssql from '~/mssql/api';
function __getCategoryMass(category:any) {
    if(category == 'Travertine'){
        return (2.38);
    } else if (category == 'Marble') {
        return (2.76);
    } else if (category == 'Limestone'){
        return (2.58);
    }


};
function __amount(amount:any,unit:any,w:any,h:any,t:any){
    if(unit == 'Sqm'){

        return amount;
    } 
    else if (unit == 'Pcs'){

        if(w == 'Free' || w == 'FREE' || w == 'Ant' || w == 'VAR' || w == 'Various' || w == 'SLAB' || w == 'Slab' || h == 'Free' || h == 'FREE' || w == 'MINI' || w == 'Mini'){
            return 0;
        }else{
            return (amount * parseFloat(w.toString().replace(',','.')) * parseFloat(h.toString().replace(',','.'))) / 10000
        }
    } else if (unit == 'Mt'){

        if(w == 'Free' || w == 'FREE' || w=='Slab' || w == 'SLAB' || w == 'VAR' || w == 'Var' || w == 'Various'){
            return 0;
        }else{
            return (amount * parseFloat(w.toString().replace(',','.'))) / 100
        }
    }
}
export default defineEventHandler(async(event)=>{
    const po = await getRouterParam(event,'po');
    const checkListSql = `
         select    
t.FirmaAdi as TedarikciAdi,    
dbo.Get_KategoriAdi(u.UrunKartID) as KategoriAdi,    
u.KasaNo,    
dbo.Get_KenarIslem(u.UrunKartID) as YuzeyIslem,    
dbo.Get_UrunAdi(u.UrunKartID) as UrunAdi,    
dbo.Get_Olcu_Kenar(u.UrunKartID) as Kenar,    
dbo.Get_Olcu_En(u.UrunKartID) as En,    
dbo.Get_Olcu_Boy(u.UrunKartID) as Boy,    
u.Adet,    
u.Miktar,    
b.BirimAdi,    
u.KutuAdet,    
u.ID  ,  
u.UrunKartID  
from    
UretimTB u,UrunBirimTB b,TedarikciTB t    
where u.SiparisAciklama='${po}'   
and b.ID = u.UrunBirimID    
and t.ID = u.TedarikciID
and u.TedarikciID in (select surun.TedarikciID from SiparisUrunTB surun where surun.SiparisNo = u.SiparisAciklama)

order by u.UrunKartID,KasaNo asc
    `;

    return new Promise(async(resolve,reject)=>{
        await mssql.query(checkListSql,async (err,check)=>{
            let queue = 1;
            await check?.recordset.forEach(x => {
                x.Sira = queue;
                queue++;
                x.Ton = __getCategoryMass(x.KategoriAdi.split(' ')[0]) * 10 * __amount(x.Miktar,x.BirimAdi,x.En,x.Boy,x.Kenar) * parseFloat(x.Kenar.replace(',','.')).toFixed(4);
            });
            resolve({'list':check?.recordset});
        });
    });
});