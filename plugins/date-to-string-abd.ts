export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.provide('dtsa',(value:any)=>{
        if(value == null || value == NaN-NaN-NaN || value == 'NaN-NaN-NaN' || value == undefined || value == ""){
            return "";
        } else{
            let date = new Date(value);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            if (month.toString().length == 1) {
                month = '0' + month;
            };
            if (day.toString().length == 1) {
                day = '0' + day;
            }
    
            return year + "-" + month + "-" + day;
        }
    });
})