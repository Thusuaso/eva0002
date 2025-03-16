export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.provide('scc',(value:any)=>{
        const data = value.split("'");
        let value2 = "";
  
        data.forEach((x) => {
            value2 += x + "''";
        });
        const value3 = value.substring(0, value2.length - 2);
        return value3;
    });
})