import {defineStore} from 'pinia';

export const useTodoStore = defineStore('todo',{
    state : ()=>{
        return {
            todo:[],
            users:[]
        }
    },
    actions:{
        setTodos(payload:any){
            this.todo = payload;
        },
        setUsers(payload:any){
            this.users = payload;
        }
    },
    getters:{
        getTodos(state){
            return state.todo;
        },
        getUsers(state){
            return state.users;
        }
    }

})