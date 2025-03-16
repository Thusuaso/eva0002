<template>
    <Button class="w-100" severity="success" label="Add Order" @click="newOrder"/>
    <OrdersListProduction :list="shippedList" 
        @production_selected_emit="productionSelected($event)"
        header="Shipped List"
    />
    <Dialog v-model:visible="order_detail_form_dialog" :header="header" modal :style="{width:'95rem'}">
        <OrdersFormDetail :model="modelStore.getOrderDetailModel" 
            :status="status"
            :users="usersList"
            :suppliers="suppliersList"
            :shipments="shipmentsList"
            :payments="paymentsList"
            :invoices="invoicesList"
            :units="unitsList"
            :productList="productList"
            :customers="customerList"
            :country="countryList"
            @add_product_emit="addProductEmit($event)"
            @update_product_emit="updateProductEmit($event)"
            @delete_product_emit="deleteProductEmit($event)"
            @close_product_emit="closeProductDialog"
            :costList="ordersStore.getOrdersCostList"
            :supplierList="ordersStore.getOrdersSupplierList"
            :documentList = "ordersStore.getOrdersDocumentList"
            :checkList="ordersStore.getOrdersCheckList"
            @save_order_emit="saveOrderEmit($event)"
            @update_order_emit="updateOrderEmit($event)"
        />
    </Dialog>
</template>
<script setup lang="ts">
    import { useModelStore } from '~/store/model';
    import { useOrdersStore } from '~/store/orders';
    definePageMeta({
        middleware:['auth-control']
    });
    const { data:shipped } = await useFetch('/api/orders/list/shipped',{
        method:'GET'
    });
    const { data:users } = await useFetch('/api/shared/users',{method:'GET'});
    const { data:suppliers } = await useFetch('/api/shared/suppliers',{method:'GET'});
    const { data:shipments } = await useFetch('/api/shared/shipments',{method:'GET'});
    const { data:payments } = await useFetch('/api/shared/payments',{method:'GET'});
    const { data:invoices } = await useFetch('/api/shared/invoices',{method:'GET'});
    const { data:units } = await useFetch('/api/shared/units',{method:'GET'});
    const { data:customers } = await useFetch('/api/shared/customers',{method:'GET'});
    const { data:country} = await useFetch('/api/shared/country',{method:'GET'});
    let order_detail_form_dialog = ref(false);
    let header = ref('');
    let status = ref(false);
    const modelStore = useModelStore();
    const ordersStore = useOrdersStore();
    const toast = useToast();
    const shippedList = shipped?.value?.list?.length >0 ? shipped?.value?.list:[];
    const usersList = users?.value?.list?.length >0 ? users?.value?.list:[];
    const suppliersList = suppliers?.value?.list?.length >0 ? suppliers?.value?.list:[];
    const shipmentsList = shipments?.value?.list?.length >0 ? shipments?.value?.list:[];
    const paymentsList = payments?.value?.list?.length >0 ? payments?.value?.list:[];
    const invoicesList = invoices?.value?.list?.length >0 ? invoices?.value?.list:[];
    const unitsList = units?.value?.list.length>0 ? units?.value?.list:[];
    const customerList = customers?.value?.list?.length>0?customers?.value?.list:[];
    const countryList = country?.value?.list?.length>0?country?.value?.list:[];
    let productList = ref([]);
    const newOrder = ()=>{
        const model = {
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
        }
        const productModel = {
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
        };
        modelStore.setOrderDetailModel(model);
        modelStore.setOrderDetailProductModel(productModel);
        ordersStore.setOrdersCostList([]);
        ordersStore.setOrdersSupplierList([]);
        ordersStore.setOrdersDocumentList([]);
        ordersStore.setOrdersCheckList([]);
        order_detail_form_dialog.value = true;
        header.value = 'Add New Order';
        status.value = true;
        productList = ref([]);

    };
    const productionSelected = async (event:any)=>{
        ordersStore.setButtonCheckListLoading(true);
        const productModel = {
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
        };
        modelStore.setOrderDetailModel(event);
        modelStore.setOrderDetailProductModel(productModel);

        const { data:cost } = await useFetch(`/api/orders/detail/cost/${event.SiparisNo}`,{method:'GET'});
        const { data:supplier } = await useFetch(`/api/orders/detail/supplier/${event.SiparisNo}`,{method:'GET'});
        const { data:document } = await useFetch(`/api/orders/detail/document/${event.SiparisNo}`,{method:'GET'});
        const { data:check } = await useFetch(`/api/orders/detail/check/${event.SiparisNo}`,{method:'GET'});
        const { data:product } = await useFetch(`/api/orders/detail/product/${event.SiparisNo}`,{method:'GET'});
        ordersStore.setOrdersCostList(cost?.value?.list.length >0 ? cost?.value?.list:[]);
        ordersStore.setOrdersSupplierList(supplier?.value?.list.length >0 ? supplier?.value?.list:[]);
        ordersStore.setOrdersDocumentList(document?.value?.list.length >0 ? document?.value?.list:[]);
        ordersStore.setOrdersCheckList(check?.value?.list.length >0 ? check?.value?.list:[]);
        productList.value = product?.value.list.length >0 ? product?.value?.list:[];

        order_detail_form_dialog.value = true;
        header.value = 'Edit Order '+ event.SiparisNo;
        status.value = false;
        ordersStore.setButtonSaveCheckDisabled(false);
        ordersStore.setButtonCheckListLoading(false);

    };
    const addProductEmit = (event:Object)=>{

        productList.value.push(event);
        const productModel = {
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
        };
        modelStore.setOrderDetailProductModel(productModel);



    };
    const updateProductEmit = (event:Object)=>{
        const index = productList.value.findIndex(x=>x.ID === event.ID);
        if(index > -1 ){
            productList.value.splice(index,1,event);
        }

        const productModel = {
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
        };
        modelStore.setOrderDetailProductModel(productModel);


    };
    const deleteProductEmit = (id:any)=>{
        const index = productList.value.findIndex(x=>x.ID === id);
        if(index > -1 ){
            productList.value.splice(index,1);
        }

        const productModel = {
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
        };
        modelStore.setOrderDetailProductModel(productModel);
    };
    const closeProductDialog = ()=>{
        if(confirm('Are you sure you want to close')){
            order_detail_form_dialog.value = false;

        }
    };
    const saveOrderEmit = async (event:any)=>{
        ordersStore.setButtonCheckDisabled(true);
        const {data:order} = await useFetch('/api/orders/process/save',{method:'POST',body:event});
        if(order?.value?.status){
            // modelStore.getOrderDetailModel.ID = order?.value?.id;
            toast.add({severity:'success',detail:order?.value?.message,life:3000});
            ordersStore.setButtonCheckDisabled(false);

        }else{
            toast.add({severity:'error',detail:order?.value?.message,life:3000});
            ordersStore.setButtonCheckDisabled(false);
        }

    };
    const updateOrderEmit = async (event:any)=>{
        const {data:order} = await useFetch('/api/orders/process/update',{method:'PUT',body:event});

    };

</script>