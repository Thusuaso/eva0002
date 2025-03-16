import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth',{
    state: ()=>{
        return{
            auth_id:0,
            auth_token:'',
            auth_username:'',
            auth_mail:'',
        }
    },
    actions:{
        setUser(payload:any){
            this.auth_id = payload.ID;
            this.auth_username = payload.KullaniciAdi;
            this.auth_mail = payload.MailAdres;
            this.auth_token = payload.Token;
        },
        setResetUser(){
            this.auth_id = 0;
            this.auth_username = '';
            this.auth_mail = '';
            this.auth_token = '';
        }


    },
    getters:{
        isAuthenticated(state){
            return state.auth_token ? true:false;
        },
        getUserId(state){
            return state.auth_id;
        },
        getUsername(state){
            return state.auth_username;
        },
        getMail(state){
            return state.auth_mail;
        }
    }
})