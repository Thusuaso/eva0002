<template>
    <div class="row m-auto text-center mt-3">
        <div class="col-sm-6">
            <div class="row text-center mb-3">
                <div class="col-sm-9">
                    <FloatLabel variant="on">
                        <InputText id="card_id" v-model="model.getOrderDetailProductModel.UrunKartID" autocomplete="off" class="w-100" disabled/>
                        <label for="card_id">Card Id</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-3">
                    <Button icon="pi pi-credit-card" aria-label="@" @click="openCardList" :loading="loading_card_button" :disabled="new_button_disabled"/>

                </div>
            </div>
            <FloatLabel variant="on" class="mb-3">
                <InputText id="category" v-model="model.getOrderDetailProductModel.KategoriAdi" class="w-100" disabled/>
                <label for="category">Category</label>
            </FloatLabel>

            <FloatLabel variant="on" class="mb-3">
                <InputText id="product" v-model="model.getOrderDetailProductModel.UrunAdi" class="w-100" disabled/>
                <label for="product">Product</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <InputText id="surface" v-model="model.getOrderDetailProductModel.YuzeyIslemAdi" class="w-100" disabled/>
                <label for="surface">Surface</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <InputText id="size" v-model="model.getOrderDetailProductModel.EbatAdi" class="w-100" disabled/>
                <label for="size">Size</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <AutoComplete v-model="selectedSupplier" inputId="suppliers" optionLabel="FirmaAdi" :suggestions="filteredSuppliers" @complete="searchSuppliers($event)" @item-select="supplierSelected($event)" class="w-100" :disabled="supplier_selected_disabled"/>
                <label for="suppliers">Suppliers</label>
            </FloatLabel>
            <div class="row mb-3">
                <div class="col-sm-6">
                    <FloatLabel variant="on">
                        <InputNumber v-model="model.getOrderDetailProductModel.AlisFiyati" inputId="purchase_price" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" :disabled="new_button_disabled"/>
                        <label for="purchase_price">Purchase Price</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-6">
                    <FloatLabel variant="on">
                        <InputNumber v-model="model.getOrderDetailProductModel.SatisFiyati" inputId="sale_price" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" :disabled="new_button_disabled"/>
                        <label for="sale_price">Sale Price</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-4">
                    <FloatLabel class="w-full md:w-56" variant="on">
                        <Select v-model="selectedUnit" inputId="units" :options="units" optionLabel="BirimAdi" class="w-100" @change="unitSelected($event)" 
                            :disabled="model.getOrderDetailProductModel.UrunKartID == 0"
                        />
                        <label for="units">Unit</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="model.getOrderDetailProductModel.Miktar" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid class="w-100" :disabled="input_disabled_amounts"
                            @input="amountsInput($event)"
                        />
                        <label for="amount">Amount</label>
                    </FloatLabel>

                </div>
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="model.getOrderDetailProductModel.Adet" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid class="w-100" :disabled="input_disabled_amounts"/>
                        <label for="amount">Piece</label>
                    </FloatLabel>

                </div>

            </div>
            <div class="row mb-3">
                <div class="col-sm-4">
                    <FloatLabel class="w-full md:w-56" variant="on">
                        <InputNumber v-model="model.getOrderDetailProductModel.SiraNo" inputId="queue" fluid :disabled="input_disabled_amounts"/>
                        <label for="queue">#</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="model.getOrderDetailProductModel.OzelMiktar" inputId="m2" :minFractionDigits="2" :maxFractionDigits="5" fluid class="w-100" :disabled="input_disabled_amounts"/>
                        <label for="m2">M2</label>
                    </FloatLabel>

                </div>
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="model.getOrderDetailProductModel.Ton" inputId="ton" :minFractionDigits="2" :maxFractionDigits="5" fluid class="w-100" :disabled="input_disabled_amounts"/>
                        <label for="ton">Ton</label>
                    </FloatLabel>

                </div>


            </div>
            <Button type="button" severity="info" label="Labour Cost" class="w-100"/>



        </div>
        <div class="col-sm-6">
            <FloatLabel variant="on">
                <Textarea id="explanation_en" v-model="model.getOrderDetailProductModel.MusteriAciklama" rows="5"  style="width: 100%;;resize: none" 
                    :disabled="new_button_disabled"
                />
                <label for="explanation_en">Explanation (En)</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <Textarea id="explanation_tr" v-model="model.getOrderDetailProductModel.UretimAciklama" rows="5"  style="width: 100%;;resize: none" 
                    :disabled="new_button_disabled"
                />
                <label for="explanation_tr">Explanation (Tr)</label>
            </FloatLabel>
            <div class="row mt-3 m-auto text-center" v-show="!ordersStore.getButtonSaveCheckDisabled">
                <div class="col-sm-4" v-show="!disabled_update_product">
                    <Button type="button" class="w-100" label="New" severity="secondary" @click="newProduct"/>
                </div>
                <div class="col-sm-4" v-show="!disabled_update_product">
                    <Button type="button" class="w-100" label="Add" severity="success" @click="addProduct" :disabled="new_button_disabled"/>
                </div>
                <div class="col-sm-4" v-show="disabled_update_product">
                    <Button type="button" class="w-100" label="Update" severity="warn" @click="updateProduct"/>
                </div>
                <div class="col-sm-4" v-show="disabled_update_product">
                    <Button type="button" class="w-100" label="Delete" severity="danger" @click="deleteProduct"/>
                </div>
                <div class="col-sm-4">
                    <Button type="button" class="w-100" label="Cancel" @click="cancel" severity="info" />
                </div>
                
            </div>
        </div>


    </div>
    <div class="row m-auto text-center mt-3">
        <div class="col-sm-12">
            <DataTable :value="list" tableStyle="min-width: 50rem"
            v-model:selection="selectedProduct"
            selectionMode="single"
            @row-click="productSelected($event)"
            >
                <Column field="SiraNo" header="#"></Column>
                <Column  header="Supplier">
                    <template #body="slotProps">
                        {{ getSupplierName(slotProps.data.TedarikciID) }}
                    </template>
                </Column>
                <Column field="UrunAdi" header="Product"></Column>
                <Column field="YuzeyIslemAdi" header="Surface"></Column>
                <Column field="En" header="w"></Column>
                <Column field="Boy" header="h"></Column>
                <Column field="Kenar" header="e"></Column>
                <Column field="Miktar" header="Amount">
                    <template #body="slotProps">
                        {{ $decimal(slotProps.data.Miktar) }}
                    </template>
                </Column>
                <Column field="Adet" header="Piece">
                    <template #body="slotProps">
                        {{ $decimal(slotProps.data.Adet) }}
                    </template>
                </Column>
                <Column field="Ton" header="Ton">
                    <template #body="slotProps">
                        {{ $decimal(slotProps.data.Ton) }}
                    </template>
                </Column>
                <Column field="OzelMiktar" header="O.M">
                    <template #body="slotProps">
                        {{ $decimal(slotProps.data.OzelMiktar) }}
                    </template>
                </Column>
                <Column field="SatisFiyati" header="Price">
                    <template #body="slotProps">
                        {{ $usd(slotProps.data.SatisFiyati) }}
                    </template>
                </Column>
                <Column header="Total">
                    <template #body="slotProps">
                        {{ $usd(slotProps.data.SatisFiyati * slotProps.data.Miktar) }}
                    </template>
                </Column>




            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="card_visible_dialog" modal header="Card List" :style="{ width: '75rem' }">
        <CardList :list="cardList" @card_selected_emit="cardSelected($event)" />
    </Dialog>
</template>
<script setup lang="ts">
    import { useModelStore } from '~/store/model';
    import {useOrdersStore} from '~/store/orders';
    const props = defineProps({

        suppliers:{
            type:Array,
            required:true
        },
        units:{
            type:Array,
            required:true
        },
        list:{
            type:Array,
            required:true
        }
    });
    const { suppliers,units,list } = props;
    const emits = defineEmits(['add_product_emit','update_product_emit','delete_product_emit']);
    const { $usd,$decimal } = useNuxtApp();
    const toast = useToast();
    const ordersStore = useOrdersStore();
    let cardList = ref([]);
    let card_visible_dialog = ref(false);
    let loading_card_button = ref(false);
    let selectedSupplier = ref({});
    let filteredSuppliers = ref();
    let selectedUnit = ref();
    let input_disabled_amounts = ref(true);
    let disabled_update_product = ref(false);
    let new_button_disabled = ref(true);
    const model = useModelStore();
    let selectedProduct = ref({});
    let supplier_selected_disabled = ref(true);
    const openCardList = async ()=>{
        loading_card_button.value = true;
        const { data:card } = await useFetch('/api/operation/card/list',{method:'GET'});
        cardList.value = card?.value?.list;
        card_visible_dialog.value = true;
        loading_card_button.value = false;
    };
    const cardSelected = (card:any)=>{
        card_visible_dialog.value = false;
        model.getOrderDetailProductModel.UrunKartID = card.ID;
        model.getOrderDetailProductModel.KategoriAdi = card.KategoriAdi;
        model.getOrderDetailProductModel.UrunAdi = card.UrunAdi;
        model.getOrderDetailProductModel.YuzeyIslemAdi = card.YuzeyIslemAdi;
        model.getOrderDetailProductModel.EbatAdi = card.En + 'x' + card.Boy + 'x' + card.Kenar;
        model.getOrderDetailProductModel.MusteriAciklama = card.KategoriAdi + '-' + card.UrunAdi + '-' + card.YuzeyIslemAdi + '-' + model.getOrderDetailProductModel.EbatAdi;
        model.getOrderDetailProductModel.En = card.En;
        model.getOrderDetailProductModel.Boy = card.Boy;
        model.getOrderDetailProductModel.Kenar = card.Kenar;


    };
    const searchSuppliers = (event:any)=>{
        let res = [];
        if(event.query.length == 0){
            res = suppliers;
        }else{
            res = suppliers.filter(x=>{
                return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        filteredSuppliers.value = res;
    };
    const supplierSelected = (supplier:any)=>{
        model.getOrderDetailProductModel.TedarikciID = supplier.value.ID;
        model.getOrderDetailProductModel.TedarikciAdi = supplier.value.FirmaAdi;
    };
    const unitSelected = (event:any)=>{
        input_disabled_amounts.value = false;
        model.getOrderDetailProductModel.UrunBirimID = event.value.ID;
        model.getOrderDetailProductModel.UrunBirimAdi = event.value.BirimAdi;
    };
    const amountsInput = async (event:any)=>{
        if(model.getOrderDetailProductModel.UrunBirimID == 1){
            await __getAmountToPiece(model.getOrderDetailProductModel.En,model.getOrderDetailProductModel.Boy,event.value,model.getOrderDetailProductModel.Kenar,model.getOrderDetailProductModel.KategoriAdi);
        }else if (model.getOrderDetailProductModel.UrunBirimID == 2){
            await __getPieceToAmount(model.getOrderDetailProductModel.En,model.getOrderDetailProductModel.Boy,event.value,model.getOrderDetailProductModel.Kenar,model.getOrderDetailProductModel.KategoriAdi)
        }else if (model.getOrderDetailProductModel.UrunBirimID == 3){

        }
    };
    const __getAmountToPiece = (w:any,h:any,amount:any,e:any,category:String)=>{
        if(w != 'ANT' || w != 'Mini' || w != 'MINI' || w != 'VAR' || w != 'Various' || w != 'Var' || w != 'Slab' || w != 'Slabs' || w != 'SLAB' || h != 'VAR' || h != 'Free' || h != 'FREE' || w != '1 LT' || w != 'Other'){
            const width = parseFloat(w.replace(',','.'));
            const height = parseFloat(h.replace(',','.'));
            model.getOrderDetailProductModel.Adet = Math.round((amount / (width / 100)) / (height / 100));
            model.getOrderDetailProductModel.OzelMiktar = amount;
        };
        if(e != 'VAR' || e != 'Varios' || e!='Var'){
            model.getOrderDetailProductModel.Ton = (__getCoefficientTon(category) * 10 * amount * parseFloat(e.replace(',','.'))).toFixed(2);

        }
    };
    const __getPieceToAmount = (w:any,h:any,amount:any,e:any,category:any)=>{
        if(w != 'ANT' || w != 'Mini' || w != 'MINI' || w != 'VAR' || w != 'Various' || w != 'Var' || w != 'Slab' || w != 'Slabs' || w != 'SLAB' || h != 'VAR' || h != 'Free' || h != 'FREE' || w != '1 LT' || w != 'Other'){
            const width = parseFloat(w.replace(',','.'));
            const height = parseFloat(h.replace(',','.'));
            model.getOrderDetailProductModel.OzelMiktar = ((amount * (width / 100)) * (height / 100)).toFixed(2);
            model.getOrderDetailProductModel.Adet = amount;
        };
        if(e != 'VAR' || e != 'Varios' || e!='Var'){
            model.getOrderDetailProductModel.Ton = (__getCoefficientTon(category) * 10 * model.getOrderDetailProductModel.OzelMiktar * parseFloat(e.replace(',','.'))).toFixed(2);

        }
    };

    const __getCoefficientTon = (category:String) =>{
        const c = category.split(' ')[0];
        if(c == 'Travertine') {
            return 2.4;
        }else if (c == 'Marble'){
            return 2.8;
        }else if (c == 'Limestone'){
            return 2.6;
        }else {
            return 0;
        }
    };
    const newProduct = () => {
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
        model.setOrderDetailProductModel(productModel);
        selectedSupplier.value = {};
        selectedUnit.value = {};
        new_button_disabled.value = false;
        model.getOrderDetailProductModel.SiraNo = list.length + 1;
        supplier_selected_disabled.value = false;

    };
    const addProduct = async () => {
        model.getOrderDetailProductModel.SiparisNo = model.getOrderDetailModel.SiparisNo;
        model.getOrderDetailProductModel.SatisToplam = model.getOrderDetailProductModel.SatisFiyati * model.getOrderDetailProductModel.Miktar; 

        const { data:product } = await useFetch('/api/orders/product/save',{
            method:'POST',
            body:model.getOrderDetailProductModel
        });
        if(product?.value?.status){
            emits('add_product_emit',{...model.getOrderDetailProductModel,'ID':product.value.id});
            selectedSupplier.value = {};
            selectedUnit.value = {};
            new_button_disabled.value = true;
            input_disabled_amounts.value = true;
            supplier_selected_disabled.value = true;
            toast.add({severity:'success',detail:product.value.message,life:3000});
        }else{
            toast.add({severity:'error',detail:product.value.message,life:3000});
        }

    };
    const updateProduct = async ()=>{
        model.getOrderDetailProductModel.SiparisNo = model.getOrderDetailModel.SiparisNo;
        model.getOrderDetailProductModel.SatisToplam = model.getOrderDetailProductModel.SatisFiyati * model.getOrderDetailProductModel.Miktar; 

        const { data:product } = await useFetch('/api/orders/product/update',{
            method:'PUT',
            body:model.getOrderDetailProductModel
        });
        if(product?.value?.status){
            emits('update_product_emit',model.getOrderDetailProductModel);
            selectedSupplier.value = {};
            selectedUnit.value = {};
            new_button_disabled.value = true;
            input_disabled_amounts.value = true;
            supplier_selected_disabled.value = true;
            disabled_update_product.value = false;
            selectedProduct.value = {};

            toast.add({severity:'success',detail:product.value.message,life:3000});
        }else{
            toast.add({severity:'error',detail:product.value.message,life:3000});
        }

    };
    const deleteProduct = async ()=>{
        if(confirm('Are you sure you want to delete?')){
            const { data:product } = await useFetch(`/api/orders/product/delete/${model.getOrderDetailProductModel.ID}`,{
            method:'DELETE',
        });
        if(product.value.status){
            emits('delete_product_emit',model.getOrderDetailProductModel.ID);
            selectedSupplier.value = {};
            selectedUnit.value = {};
            new_button_disabled.value = true;
            input_disabled_amounts.value = true;
            supplier_selected_disabled.value = true;
            disabled_update_product.value = false;
            selectedProduct.value = {};
            toast.add({severity:'success',detail:product?.value?.message,life:3000});
        }else{
            toast.add({severity:'error',detail:product?.value?.message,life:3000});
        }
        }


    };
    const productSelected = (event:any)=>{
        event.data.EbatAdi = event.data.En + 'x' + event.data.Boy + 'x' + event.data.Kenar;
        model.setOrderDetailProductModel(event.data);
        disabled_update_product.value = true;
        selectedSupplier.value = suppliers.find(x=>x.ID ===event.data.TedarikciID);
        selectedUnit.value = units.find(x=>x.ID === event.data.UrunBirimID);
        supplier_selected_disabled.value  = false;
    };
    const cancel = ()=>{
        selectedSupplier.value = {};
        selectedUnit.value = {};
        new_button_disabled.value = true;
        input_disabled_amounts.value = true;
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
        model.setOrderDetailProductModel(productModel);
        selectedProduct.value = {};
        disabled_update_product.value = false;
    };
    const getSupplierName = (event:any)=>{
        return suppliers.find(x=>x.ID == event).FirmaAdi;
    }
</script>