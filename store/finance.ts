import {defineStore} from 'pinia';

export const useFinanceStore = defineStore('finance',{
    state : ()=>{
        return {
            list:[],
            listTotal:null,
            collection_year_list:[],
            collection_month_list:[],
            collection_list:[],
            collection_total:0
        }
    },
    actions:{
        setFinanceList(payload:any){
            this.list = payload;

        },
        setFinanceTotalList(payload:any){
            this.listTotal = payload;

        },
        setCollectionYearList(payload:any){
            this.collection_year_list = payload;
        },
        setCollectionMonthList(payload:any){
            this.collection_month_list = payload;
        },
        setCollectionList(payload:any){
            this.collection_list = payload;
        },
        setCollectionTotalList(payload:any){
            this.collection_total = payload;
        }
        
    },
    getters:{
        getFinanceList(state){
            return state.list;
        },
        getFinanceTotalList(state){
            return state.listTotal;
        },
        getCollectionYearList(state){
            return state.collection_year_list
        },
        getCollectionMonthList(state){
            return state.collection_month_list;
        },
        getCollectionList(state){
            return state.collection_list;
        },
        getCollectionTotal(state){
            return state.collection_total;
        }
    }
})