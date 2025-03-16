export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.provide('usd',(price:any)=>{
        if(price == null || price == undefined){
            return '$0';
        }else{
            const val = (price / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    })
})