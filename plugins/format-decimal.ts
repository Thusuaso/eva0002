export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.provide('decimal',(value:any)=>{
        if(value == null || value == undefined){
            return 0.0;
        }else{
            const val = (value / 1).toFixed(2).replace('.',',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    })
})