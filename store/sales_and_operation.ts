import { defineStore } from 'pinia';

export const useSalesAndOperationStore = defineStore('sales-and-operations',{
    state : () =>{
        return{
            list:[]
        }
    },
    actions:{
        setSalesAndOperation(payload:any){
            this.list = payload;
        }
    },
    getters:{
        getSalesAndOperationList(state){
            return state.list;
        }
    }
});