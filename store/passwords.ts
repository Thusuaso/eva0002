import {defineStore} from 'pinia';

export const usePasswordsStore = defineStore('passwords',{
    state : ()=>{
        return {
            list:[]
        }
    },
    actions:{
        setList(payload:any){
            this.list = payload;
        },
        addList(payload:any){
            this.list.unshift(payload);
        },
        updateList(payload:any){
            const index = this.list.findIndex(x=>x.ID === payload.ID);
            if(index > -1){
                this.list[index] = payload;
            }
        },
        deleteList(id:any){
            const index = this.list.findIndex(x=>x.ID == id);
            if(index > -1){
                this.list.splice(index, 1);
            }
        }
    },
    getters:{
        getList(state){
            return state.list;
        }
    }

});