import {defineStore} from 'pinia';

export const usePointsToConsider = defineStore('points-to-consider',{
    state:()=>{
        return{
            list:[]
        }
    },
    actions:{
        setPointsToConsider(payload:any){
            this.list = payload;
        },
        addConsider(payload:Object){
            this.list.push(payload);
        },
        updateConsider(payload:Object){
            const index = this.list.findIndex((item) => item.ID === payload.ID);
            if(index > -1){
                this.list[index] = {...payload};
            }
        },
        deleteConsider(payload:any){
            const index = this.list.findIndex((item) => item.ID === payload);
            if(index > -1){
                this.list.splice(index, 1);
            }
        }
    },
    getters:{
        getPointsToConsider(state){
            return state.list;
        }
    }
})
