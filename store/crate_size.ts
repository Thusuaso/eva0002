import { defineStore } from "pinia";

export const useCrateSizeStore = defineStore('crate',{
    state : () =>{
        return{
            list:[],
            modal:{
                ID:0,
                Crate_Width:'',
                Crate_Height:'',
                Crate_Thickness:'',
                Stone_Size:'',
                SupplierId:0,
                Supplier:'',
                Piece:0
            },
            suppliers:[]
        }
    },
    actions:{
        setCrateSizeList(payload:any){
            this.list = payload;
        },
        setCrateSizeModal(payload:any){

            this.modal = payload;
        },
        setCrateSizeSupplier(payload:any){
            this.suppliers = payload;
        },

    },
    getters:{
        getCrateSizeList(state){
            return state.list;
        },
        getCrateSizeModal(state){
            return state.modal;
        },
        getCrateSizeSupplier(state){
            return state.suppliers;
        }
    }
})