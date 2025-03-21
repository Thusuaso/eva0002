import { defineStore } from 'pinia';
export const useModelStore = defineStore('model',{
    state : ()=>{
        return{
            order_detail_model:ref({
                'SiparisId':0,
            'SiparisNo':'',
            'SiparisTarihi':'',
            'OdemeTurID':0,
            'OdemeTur':'',
            'TeslimTurID':0,
            'TeslimTur':'',
            'MusteriID':0,
            'FirmaAdi':'',
            'Pesinat':0,
            'NavlunFirma':'',
            'NavlunMekmarNot':'',
            'NavlunAlis':0,
            'NavlunSatis':0,
            'KayitTarihi':'',
            'KullaniciID':0,
            'KayitYapan':'',
            'SiparisDurumID':0,
            'Durum':'',
            'UretimAciklama':'',
            'SevkiyatAciklama':'',
            'FinansAciklama':'',
            'OdemeAciklama':'',
            'TahminiYuklemeTarihi':'',
            'YuklemeTarihi':'',
            'FaturaNo':0,
            'SiparisFaturaNo':0,
            'Vade':'',
            'Ulke':'',
            'Komisyon':0,
            'DetayAciklama_1':'',
            'DetayMekmarNot_1':'',
            'DetayTutar_1':0,
            'DetayAlis_1':0,
            'DetayAciklama_2':'',
            'DetayMekmarNot_2':'',
            'DetayTutar_2':0,
            'DetayAlis_2':0,
            'DetayAciklama_3':'',
            'DetayMekmarNot_3':'',
            'DetayTutar_3':0,
            'DetayAlis_3':0,
            'SiparisSahibiAdi':'',
            'EvrakGideri':0,
            'Eta':'',
            'UlkeId':0,
            'UlkeAdi':'',
            'FaturaAdi':'',
            'depo_yukleme':false,
            'DetayTutar_4':0,
            'DetayAciklama_4':'',
            'sigorta_Tutar':0,
            'OperasyonAdi':'',
            'FinansmanAdi':'',
            'operationMail':'',
            'representativeMail':'',
            'SiparisSahibi':0,
            'Operasyon':0,
            'Finansman':0,
            'Iade':0,
            'MalBedeli':0,
            'sigorta_tutar_satis':0,
            'KonteynerAyrinti':'',
            'MayaControl':false,
            'FaturaKesimTurID':0,
            'KonteynerNo':'',
            'SiparisKontrol':false,
            'SiparisKontrolEden':0
            }),
            order_detail_product_model:ref({
                ID:0,
                SiparisNo:'',
                TedarikciID:0,
                TedarikciAdi:'',
                UrunKartID:0,
                KategoriAdi:'',
                UrunAdi:'',
                YuzeyIslemAdi:'',
                EbatAdi:'',
                Miktar:0,
                OzelMiktar:0,
                KasaAdet:0,
                SatisFiyati:0,
                SatisToplam:0,
                UretimAciklama:'',
                MusteriAciklama:'',
                KullaniciID:0,
                AlisFiyati:0,
                SiraNo:0,
                Ton:0,
                Adet:0,
                UrunBirimID:0,
                UrunBirimAdi:'',
                En:'',
                Boy:'',
                Kenar:''
            }),
            todo_model:{
                ID:0,
                Yapilacak:'',
                Yapildi:0,
                GorevVerenID:'',
                GorevVerenAdi:'',
                GirisTarihi:'',
                YapildiTarihi:'',
                YapilacakOncelik:'',
                Acil:false,
                Sira:0,
                OrtakGorev:'',
                Goruldu:0
            }
        }
    },
    actions:{
        setOrderDetailModel(payload:any){
            this.order_detail_model = payload;
        },
        setOrderDetailProductModel(payload:any){
            this.order_detail_product_model = payload;
        },
        setOrderSaveId(payload:any){
            this.order_detail_model.SiparisId = payload;
        },
        setTodoModel(payload:any){
            this.todo_model = payload;
        }


    },
    getters:{
        getOrderDetailModel(state){
            return state.order_detail_model;
        },
        getOrderDetailProductModel(state){
            return state.order_detail_product_model;
        },
        getTodoModel(state){
            return state.todo_model;
        }
    }
})