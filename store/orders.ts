import { defineStore } from 'pinia';
export const useOrdersStore = defineStore('orders',{
    state : ()=>{
        return{
            costList:[],
            supplier:[],
            document:[],
            check:[],
            button_check_disabled:ref(false),
            button_check_list_loading:ref(false),
            orderId:0,
            button_save_check_disabled:ref(true),
            
        }
    },
    actions:{
        setOrdersCostList(payload:any){
            this.costList = payload;
        },
        setOrdersSupplierList(payload:any){
            this.supplier = payload;
        },
        setOrdersDocumentList(payload:any){
            this.document = payload;
        },
        setOrdersCheckList(payload:any){
            this.check = payload;
        },
        setButtonCheckDisabled(payload:any){
            this.button_check_disabled = payload;
        },
        setButtonCheckListLoading(payload:any){
            this.button_check_list_loading = payload;
        },
        setOrderId(payload:any){
            this.orderId = payload;
        },
        setButtonSaveCheckDisabled(payload:any){
            this.button_save_check_disabled = payload;
        }

    },
    getters:{
        getOrdersCostList(state){
            return state.costList;
        },
        getOrdersSupplierList(state){
            return state.supplier;
        },
        getOrdersDocumentList(state){
            return state.document;
        },
        getOrdersCheckList(state){
            return state.check;
        },
        getButtonCheckDisabled(state){
            return state.button_check_disabled;
        },
        getButtonCheckListLoading(state){
            return state.button_check_list_loading;
        },
        getOrderId(state){
            return state.orderId;
        },
        getButtonSaveCheckDisabled(state){
            return state.button_save_check_disabled;
        }

    }
});