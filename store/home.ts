import {defineStore} from 'pinia';

export const useHomeStore = defineStore('home',{
    state : ()=>{
        return{
            list:[],
        }
    },
    actions:{
        setHomeList(payload:any){
            this.list = payload;
        }
    },
    getters:{
        getHomeList(state){
            return state.list;
        },

    }
});