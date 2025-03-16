import {defineStore} from 'pinia';

export const useCardsList = defineStore('cards',{
    state : ()=>{
        return {
            list:[]
        }
    },
    actions:{
        setCardList(payload:any){
            this.list = payload;
        }
    },
    getters:{
        getCardList(state){
            return state.list;
        }
    }
})