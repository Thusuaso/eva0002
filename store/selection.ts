import {defineStore} from 'pinia';

export const useSelectionStore = defineStore('selection',{
    state: ()=>{
        return{
            list:[],
            selection_table_loading:ref(false),
            selection_total_table:{
                crate:0,
                pcs_in_box:0,
                box_in_crate:0,
                amount:0
            },
            selectionPoList:[],
            inputModel:{
                ID:0,
                Tarih:'',
                KasaNo:'',
                UrunKartID:0,
                TedarikciID:0,
                UrunBirimID:0,
                UrunOcakID:0,
                Adet:0,
                KutuAdet:0,
                Miktar:0,
                OzelMiktar:0,
                Aciklama:'',
                UretimTurID:0,
                UrunDurumID:0,
                SiparisAciklama:'',
                Kutu:false,
                Duzenleyen:'Muhsin',
                Kasalayan:'Emre',
                Disarda:false,
                KutuIciAdet:0,
                Bagli:false,
                SqmMiktar:0,
                Bulunamadi:false,
                Fason:false,
                Total:0,
                KasaAdet:1
            },
            supplierList:[],
            quarryList:[],
            selectionPoProductList:[]
        }
    },
    actions:{
        setList(payload:any){
            this.list = payload;
        },
        setSelectionTableLoading(payload:any){
            this.selection_table_loading = payload;
        },
        setSelectionTotalList(payload:any){
            this.selection_total_table = payload;


        },
        setSelectionPoList(payload:any){
            this.selectionPoList = payload;
        },
        setInputModel(payload:any){
            this.inputModel = payload;
        },
        setSupplierList(payload:any){
            this.supplierList = payload;
        },
        setQuarryList(payload:any){
            this.quarryList = payload;
        },
        setSelectionPoProductList(payload:any){
            this.selectionPoProductList = payload;
        }
    },
    getters:{
        getList(state){
            return state.list;
        },
        getSelectionTableLoading(state){
            return state.selection_table_loading;
        },
        getSelectionTotalList(state){
            return state.selection_total_table;
        },
        getSelectionPoList(state){
            return state.selectionPoList;
        },
        getInputModel(state){
            return state.inputModel;
        },
        getSupplierList(state){
            return state.supplierList;
        },
        getQuarryList(state){
            return state.quarryList;
        },
        getSelectionPoProductList(state){
            return state.selectionPoProductList;
        }
    }
    
});