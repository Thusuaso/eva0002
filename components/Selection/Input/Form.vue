<template>
    <div class="row m-auto mt-3">
        <div class="col-sm-4">
            <FloatLabel class="w-100 mb-3" variant="on">
                <Select v-model="selectedStatus" inputId="status" :options="statusList" optionLabel="status" class="w-100" @change="statusSelected($event)" />
                <label for="status">Status</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-100 mb-3">
                <AutoComplete v-model="selectedPo" inputId="po" :suggestions="filteredPoList" optionLabel="SiparisNo" @complete="completePo($event)" 
                    @item-select="poSelected($event)"
                    class="w-100"
                    :disabled="!stockStatus"
                />
                <label for="po">Po</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-3" variant="on">
                <Select v-model="selectedOrderProduct" inputId="products" :options="store.getSelectionPoProductList" optionLabel="Aciklama" class="w-full" 
                    @change="orderProductSelected($event)"
                    :disabled="!stockStatus"
                />
                <label for="products">Products</label>
            </FloatLabel>
            <FloatLabel class="w-100 mb-3" variant="on">
                <InputText id="explanation" v-model="explanation" autocomplete="off" disabled class="w-100"/>
                <label for="explanation">Exp.</label>
            </FloatLabel>
            <div class="row">
                <div class="col-sm-9">
                    <FloatLabel variant="on" class="w-100 md:w-56 mb-3">
                        <InputText id="card_id" class="w-100" v-model="card_id" autocomplete="off" disabled/>
                        <label for="card_id">Card Id</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-3">
                    <Button icon="pi pi-microsoft" aria-label="Save" class="w-100" @click="openCardClick" :disabled="stockStatus"/>
                </div>

            </div>
            <div class="row" style="margin-top:63px;">
                <div class="col-sm-6">
                    <FloatLabel variant="on" class="w-full md:w-56 mb-3">
                        <InputText id="crate_no" v-model="crateNo" autocomplete="off" disabled/>
                        <label for="crate_no">Crate No</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-6">
                    <FloatLabel variant="on">
                        <AutoComplete v-model="selectedQuarry" inputId="quarry" :suggestions="filteredQuarry" optionLabel="OcakAdi" @complete="searchQuarry($event)" 
                            @item-select="quarrySelected($event)"
                        />
                        <label for="quarry">Quarries</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <FloatLabel variant="on" class="w-full md:w-56 mb-3">
                        <InputText id="controlled_by" v-model="store.getInputModel.Duzenleyen" autocomplete="off" />
                        <label for="controlled_by">Controlled By</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-6">
                    <FloatLabel variant="on" class="w-full md:w-56 mb-3">
                        <InputText id="created_by" v-model="store.getInputModel.Kasalayan" autocomplete="off" />
                        <label for="created_by">Crated By</label>
                    </FloatLabel>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <FloatLabel variant="on" class="w-100 md:w-56 mb-3">
                <AutoComplete v-model="selectedSupplier" inputId="supplier" :suggestions="filteredSupplier" optionLabel="FirmaAdi" @complete="searchSupplier($event)" 
                    @item-select="supplierSelected($event)"
                    class="w-100"
                />
                <label for="supplier">Suppliers</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full md:w-56 mb-3">
                <DatePicker v-model="selectedDate" inputId="date" showIcon iconDisplay="input" @date-select="dateSelected($event)"/>
                <label for="date">Date</label>
            </FloatLabel>
            <div class="flex flex-wrap gap-6" style="margin-bottom: 30px;" >

            <div class="flex items-center gap-2" v-for="item in unitList">
                    <RadioButton v-model="selectedUnit" :inputId="item.unit" :name="item.unit" :value="item.id" />
                    <label :for="item.unit">{{ item.unit }}</label>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="store.getInputModel.KutuAdet" id="box_amount" inputId="locale-user" :minFractionDigits="2" fluid 
                            @input="boxAmountInput($event)"
                        />
                        <label for="box_amount">Box Amount</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="store.getInputModel.KutuIciAdet" id="pcs_in_box" inputId="locale-user" :minFractionDigits="2" fluid 
                            @input="pcsInBoxInput($event)"
                        />
                        <label for="pcs_in_box">Pcs in Box</label>
                    </FloatLabel>                </div>
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="store.getInputModel.Adet" id="total_pcs" inputId="locale-user" :minFractionDigits="2" fluid 
                            @input="totalPcsInput($event)"
                        />
                        <label for="total_pcs">Total Pcs</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="store.getInputModel.Miktar" id="amount" inputId="locale-user" :minFractionDigits="2" fluid />
                        <label for="amount">Amount</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="store.getInputModel.SqmMiktar" id="special_amount" inputId="locale-user" :minFractionDigits="2" fluid />
                        <label for="special_amount">SQM</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-4">
                    <FloatLabel variant="on">
                        <InputNumber v-model="store.getInputModel.KasaAdet" id="crate_amount" inputId="locale-user" :minFractionDigits="2" fluid />
                        <label for="crate_amount">Crate Amount</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-2">
                    <Checkbox v-model="store.getInputModel.Kutu" inputId="Box" :binary="true" />
                    <label for="box"> Box </label>
                </div>
                <div class="col-sm-3">
                    <Checkbox v-model="store.getInputModel.Bagli" inputId="bounded" :binary="true" />
                    <label for="bounded">Bounded</label>
                </div>
                <div class="col-sm-2">
                    <Checkbox v-model="store.getInputModel.Disarda" inputId="out" :binary="true" />
                    <label for="out"> Out </label>
                </div>
                <div class="col-sm-3">
                    <Checkbox v-model="store.getInputModel.Bulunamadi" inputId="not_found" :binary="true" />
                    <label for="not_found"> Not Found </label>
                </div>
                <div class="col-sm-2">
                    <Checkbox v-model="store.getInputModel.Fason" inputId="fason" :binary="true" />
                    <label for="fason"> Fason </label>
                </div>

            </div>
            <FloatLabel variant="on">
                <Textarea id="description" v-model="store.getInputModel.Aciklama" style="width:100%;height:102px;" />
                <label for="description">Description</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <div class="row mb-3">
                <div class="col-sm-6">
                    <FloatLabel variant="on" class="w-full md:w-56 mb-3">
                        <InputText id="category_name"  v-model="category_name" autocomplete="off" disabled/>
                        <label for="category_name">Category</label>
                    </FloatLabel>
                </div>
                <div class="col-sm-6">
                    <FloatLabel variant="on" class="w-full md:w-56 mb-3">
                        <InputText id="product_name"  v-model="product_name" autocomplete="off" disabled/>
                        <label for="product_name">Product</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-6">
                    <FloatLabel variant="on" class="w-full md:w-56 mb-3">
                        <InputText id="surface_name"  v-model="surface_name" autocomplete="off" disabled/>
                        <label for="surface_name">Surface</label>
                    </FloatLabel>
  
                </div>
                <div class="col-sm-6">
                    <FloatLabel variant="on" class="w-full md:w-56 mb-3">
                        <InputText id="size_name"  v-model="size_name" autocomplete="off" disabled/>
                        <label for="size_name">Size</label>
                    </FloatLabel>
                </div>
            </div>

        </div>

    </div>
    <div class="row">
        <div :class="status?'col-sm-12':'col-sm-6'">
            <Button :label="status ? 'Save':'Update'" :severity="status?'success':'warn'" class="w-100" @click="process" :loading="save_button_status"/>

        </div>
        <div class="col-sm-6" v-if="!status">
            <Button label="Delete" severity="danger" class="w-100" @click="deleted"/>

        </div>

    </div>
    <Dialog v-model:visible="card_dialog_form" header="Card List" modal>
        <CardList @card_selected_emit="cardSelected($event)"/>

    </Dialog>
</template>
<script setup lang="ts">
    import { useSelectionStore } from '~/store/selection';
    const toast = useToast();
    const emits = defineEmits(['close_dialog_form','update_selection_list'])
    const props = defineProps({
        status:{
            type: Boolean,
            required: true
        }
    });
    const { status } = props;
    const { $dtsa } = useNuxtApp();
    const store = useSelectionStore();
    let selectedStatus = ref();
    const statusList = ref([
        {'id':1,'status':'Stock'},
        {'id':2,'status':'Order'},

    ]);
    const unitList = ref([
        {'id':1,'unit':'Sqm'},
        {'id':2,'unit':'Pcs'},
        {'id':3,'unit':'Mt'},

    ]);
    const selectedUnit = ref(1);

    let selectedPo = ref();
    let category_name = ref();
    let product_name = ref();
    let surface_name = ref();
    let size_name = ref(); 
    let filteredPoList = ref([]);
    let card_dialog_form = ref(false);
    let crateNo = ref();
    let explanation = ref();
    let card_id = ref();
    let selectedCard = ref();
    let selectedOrderProduct = ref();
    let save_button_status = ref(false);


    const completePo = (event:any)=>{
        let res;
        if(event.query.length ===0 ){
            res = store.getSelectionPoList;
        }else{
            res = store.getSelectionPoList.filter(item=>{
                return item.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase())
            })
        }

        filteredPoList.value = res;
    };
    let stockStatus = ref(false);
    const poSelected = async (event:any)=>{
        const { data:products } = await useFetch('/api/selection/shared/product',{method:'POST',body:{'po':event.value.SiparisNo}});
        store.setSelectionPoProductList(products?.value?.list);
        store.getInputModel.Aciklama = event.value.SiparisNo;
        store.getInputModel.SiparisAciklama = event.value.SiparisNo;



    };
    let selectedSupplier = ref();

    const statusSelected = async (event:any)=>{
        store.getInputModel.UretimTurID = event.value.id;
        const {data:crate} = await useFetch('/api/selection/shared/crate_no');
        crateNo.value = crate?.value?.crateNo;
        if(event.value.id == 1){
            stockStatus.value = false;
            selectedSupplier.value = store.getSupplierList.find(x=>{
                return x.ID === 1
            });
            category_name.value = "";
            product_name.value =   "";
            surface_name.value = "";
            size_name.value = ""; 
            card_id.value= "";
            selectedPo = ref({});
            selectedOrderProduct = ref({});
            explanation.value = '';
            store.getInputModel.Aciklama = 'Stock';
            store.getInputModel.SiparisAciklama = 'Stock';

            
        }else{
            stockStatus.value = true;
        }
    };
    


    const orderProductSelected = async (event:any)=>{
        selectedCard.value = event.value;
        explanation.value = event.value.Aciklama;
        card_id.value = event.value.UrunKartId;
        category_name.value = event.value.KategoriAdi;
        product_name.value = event.value.UrunAdi;
        surface_name.value = event.value.YuzeyIslemAdi;
        size_name.value = event.value.En + 'x' + event.value.Boy + 'x' + event.value.Kenar;
        store.getInputModel.UrunKartID = event.value.UrunKartId;
        selectedSupplier.value = store.getSupplierList.find(x=>{
            return x.ID === event.value.TedarikciID
        });
        if(event.value.TedarikciID === 1 || event.value .TedarikciID === 123){
            const {data:crate} = await useFetch('/api/selection/shared/crate_no');
            crateNo.value = crate?.value?.crateNo;
        }else{
            const { data:outCrateNo } = await useFetch('/api/selection/shared/crate_no_out');
            crateNo.value = outCrateNo?.value?.crateNo;
        }


    };
    let selectedQuarry = ref({});
    let filteredSupplier = ref([]);
    const searchSupplier = (event:any) =>{
        let res;
        if(event.query.length ===0 ){
            res = store.getSupplierList;
        } else{
            res = store.getSupplierList.filter(item=>{
                return item.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase())
            })
        };
        filteredSupplier.value = res;
    };
    const selectedDate = new Date();
    let filteredQuarry = ref();
    const searchQuarry = (event:any)=>{
        let res;
        if(event.query.length ===0 ){
            res = store.getQuarryList;
        } else{
            res = store.getQuarryList.filter(item=>{
                return item.OcakAdi.toLowerCase().startsWith(event.query.toLowerCase())
            })
        };
        filteredQuarry.value = res;
    };
    const quarrySelected = (event:any) =>{
        store.getInputModel.UrunOcakID = event.value.ID;
    };
    const supplierSelected = (event:any)=>{
        store.getInputModel.TedarikciID = event.value.ID;
    };
    const dateSelected = (event:any)=>{
        store.getInputModel.Tarih = $dtsa(event);
    };
    const openCardClick = () =>{
        card_dialog_form.value = true;
    };
    const cardSelected = (event:any)=>{
        selectedCard.value = event;
        explanation.value = '';
        card_dialog_form.value = false;
        card_id.value = event.ID;
        category_name.value = event.KategoriAdi;
        product_name.value = event.UrunAdi;
        surface_name.value = event.YuzeyIslemAdi;
        size_name.value = event.En + 'x' + event.Boy + 'x' + event.Kenar;
        store.getInputModel.UrunKartID = event.ID;


    };
    const process = async ()=>{
        if(status){
            save();
        }else{
            update();
        }

    };
    const save = async()=>{
        save_button_status.value = true;
        store.getInputModel.KasaNo = crateNo.value;
        store.getInputModel.Tarih = $dtsa(selectedDate);
        store.getInputModel.TedarikciID = selectedSupplier.value.ID;
        store.getInputModel.UrunBirimID = selectedUnit.value;
        store.getInputModel.UrunOcakID = selectedQuarry.value.ID;
        store.getInputModel.UretimTurID = selectedStatus.value.id;
        store.getInputModel.UrunDurumID = 1;
        const { data:selection } = await useFetch('/api/selection/input/process/save',{method:'POST',body:store.getInputModel});
        if(selection?.value?.status){
            toast.add({ severity: 'success', summary: 'Selection', detail: selection?.value?.message, life: 3000 });
            emits('update_selection_list');
            const inputModel = {
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
            };
            store.setInputModel(inputModel);
            card_id.value = "";
            crateNo.value = "";
            selectedPo.value = "";
            explanation.value = "";
            selectedQuarry.value = "";
            selectedOrderProduct.value = "";
            selectedSupplier.value = "";
            category_name = ref('');
            product_name = ref('');
            surface_name = ref('');
            size_name = ref(''); 
            save_button_status.value = false;

        }else{
            toast.add({ severity: 'error', summary: 'Selection', detail: selection?.value?.message, life: 3000 });
        }
    };

    const update = async () =>{
        save_button_status.value = true;
        store.getInputModel.KasaNo = crateNo.value;
        store.getInputModel.Tarih = $dtsa(selectedDate);
        store.getInputModel.TedarikciID = selectedSupplier.value.ID;
        store.getInputModel.UrunBirimID = selectedUnit.value;
        store.getInputModel.UrunOcakID = selectedQuarry.value.ID;
        store.getInputModel.UretimTurID = selectedStatus.value.id;
        store.getInputModel.UrunDurumID = 1;
        const { data:selection } = await useFetch('/api/selection/input/process/update',{method:'PUT',body:store.getInputModel});
        if(selection?.value?.status){

            toast.add({ severity: 'success', summary: 'Selection', detail: selection?.value?.message, life: 3000 });
            emits('update_selection_list');

            save_button_status.value = false;
        }else{
            toast.add({ severity: 'error', summary: 'Selection', detail: selection?.value?.message, life: 3000 });
        }
    };

    const boxAmountInput = (event:any)=>{
        if(selectedCard.value.En.trim() == 'ANT'){
            console.log(event.value * 0.743)
            store.getInputModel.Miktar = event.value * 0.743;
        }
    };
    const pcsInBoxInput = (event:any)=>{
        store.getInputModel.Adet = event.value * store.getInputModel.KutuAdet;
    };
    const totalPcsInput = (event:any)=>{
        if(selectedUnit.value == 1){
            if(selectedCard.value.En === 'ANT' || selectedCard.value.En == 'VAR' || selectedCard.value.En == 'Slab' || selectedCard.value.En == 'Various'){
                store.getInputModel.Miktar = 0;
            }else{
                store.getInputModel.Miktar = (event.value * parseFloat(selectedCard.value.En.replace(',','.')) * parseFloat(selectedCard.value.Boy.replace(',','.'))) / 10000;
                store.getInputModel.SqmMiktar = store.getInputModel.Miktar;
            };
        } else if (selectedUnit.value == 2){
            store.getInputModel.Miktar = event.value;

            store.getInputModel.SqmMiktar = (event.value * (parseFloat(selectedCard.value.En.replace(',','.')) / 100) * (parseFloat(selectedCard.value.Boy.replace(',','.')))/ 100) 
        };

    };
    const deleted = async() =>{
        const {data:selection} = await useFetch(`/api/selection/input/process/deleted/${store.getInputModel.ID}`,{method:'DELETE'});
        if(selection?.value?.status){
            emits('close_dialog_form');
            toast.add({ severity:'success', summary: 'Selection', detail: selection?.value?.message, life: 3000 });
            emits('update_selection_list');

        }else{
            toast.add({ severity:'error', summary: 'Selection', detail: selection?.value?.message, life: 3000 });
        }
    };
    if(!status){

        selectedStatus.value = statusList.value.find(x=>{
            return x.id === store.getInputModel.UretimTurID
        });
        if(store.getInputModel.UretimTurID == 1){
            card_id.value = store.getInputModel.UrunKartID;
            crateNo.value = store.getInputModel.KasaNo;
            selectedQuarry.value = store.getQuarryList.find(x=>{
                return x.ID === store.getInputModel.UrunOcakID
            });
            selectedSupplier.value = store.getSupplierList.find(x=>{
                return x.ID === store.getInputModel.TedarikciID
            });
            store.getInputModel.KasaAdet = 1;
            category_name.value = store.getInputModel.KategoriAdi;
            product_name.value = store.getInputModel.UrunAdi;
            surface_name.value = store.getInputModel.YuzeyIslemAdi;
            size_name.value = store.getInputModel.En + 'x' + store.getInputModel.Boy + 'x' + store.getInputModel.Kenar;
        }else{
            selectedPo.value = store.getSelectionPoList.find(x=>{
                return x.SiparisNo === store.getInputModel.SiparisAciklama
            });
            selectedOrderProduct.value = store.getSelectionPoProductList.find(x=>{
                return x.UrunKartId === store.getInputModel.UrunKartID
            });
            card_id.value = store.getInputModel.UrunKartID;
            crateNo.value = store.getInputModel.KasaNo;
            selectedQuarry.value = store.getQuarryList.find(x=>{
                return x.ID === store.getInputModel.UrunOcakID
            });
            selectedSupplier.value = store.getSupplierList.find(x=>{
                return x.ID === store.getInputModel.TedarikciID
            });
            store.getInputModel.KasaAdet = 1;
            category_name.value = store.getInputModel.KategoriAdi;
            product_name.value = store.getInputModel.UrunAdi;
            surface_name.value = store.getInputModel.YuzeyIslemAdi;
            size_name.value = store.getInputModel.En + 'x' + store.getInputModel.Boy + 'x' + store.getInputModel.Kenar;
        }

    }
</script>