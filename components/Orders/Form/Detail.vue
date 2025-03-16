<template>
    <div class="row m-auto text-center">
        <div class="col-sm-9">
            <Tabs value="0">
    <TabList>
        <Tab value="0">Order</Tab>
        <Tab value="1">Proforma</Tab>
        <Tab value="2">Cost</Tab>
        <Tab value="3">Supplier</Tab>
        <Tab value="4">Document</Tab>
        <Tab value="5">Check</Tab>

    </TabList>
    <TabPanels>
        <TabPanel value="0">
            <OrdersFormOrder  :suppliers="suppliers" :units="units" :list="productList"
                @add_product_emit="addProductEmit($event)"
                @update_product_emit="updateProductEmit($event)"
                @delete_product_emit="deleteProductEmit($event)"
            />
        </TabPanel>
        <TabPanel value="1">
            <OrdersFormProforma :model="model" :shipments="shipments" :payments="payments" :invoices="invoices" :country="country" />
        </TabPanel>
        <TabPanel value="2">
            <OrdersFormCost :list="costList"/>
        </TabPanel>
        <TabPanel value="3">
            <OrdersFormSupplier :model="model" :supplier="supplierList" :invoices="invoices"/>
        </TabPanel>
        <TabPanel value="4">
            <OrdersFormDocument :list="documentList"/>
        </TabPanel>
        <TabPanel value="5">
            <OrdersFormCheck :list="checkList"/>
        </TabPanel>
    </TabPanels>
    </Tabs>
        </div>
        <div class="col-sm-3">
            <Button type="button" :severity="ordersStore.getButtonSaveCheckDisabled?'success':'warn'" :label="ordersStore.getButtonSaveCheckDisabled?'Save':'Update'" class="w-100 mb-3" @click="process" :loading="ordersStore.getButtonCheckDisabled"/>
            <Button type="button" severity="danger" label="Exit" class="w-100 mb-3" @click="emits('close_product_emit')"/>
            <FloatLabel variant="on" class="mb-3">
                <InputText id="po" v-model="model.SiparisNo" autocomplete="off" class="w-100" :disabled="!ordersStore.getButtonSaveCheckDisabled"/>
                <label for="po">Order Po</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <DatePicker class="w-100" v-model="selectedOrderDate" inputId="order_date" showIcon iconDisplay="input" dateFormat="yy/mm/dd" @date-select="orderDateSelected($event)" :disabled="!ordersStore.getButtonSaveCheckDisabled"/>
                <label for="order_date">Order Date</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <DatePicker class="w-100" v-model="selectedEstimatedDate" inputId="estimated_date" showIcon iconDisplay="input" dateFormat="yy/mm/dd" @date-select="estimatedDateSelected($event)" :disabled="!ordersStore.getButtonSaveCheckDisabled"/>
                <label for="estimated_date">Estimated Date</label>
            </FloatLabel>
            
            <FloatLabel variant="on" class="mb-3">
                <AutoComplete class="w-100" v-model="selectedCustomer" inputId="customers" :suggestions="filteredCustomers" @complete="searchCustomers($event)" @item-select="customerSelected($event)" 
                    optionLabel="FirmaAdi" :disabled="!ordersStore.getButtonSaveCheckDisabled"
                />
                <label for="customers">Customers</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <AutoComplete class="w-100" v-model="selectedSeller" inputId="seller" :suggestions="filteredSeller" @complete="searchSeller($event)" @item-select="sellerSelected($event)" 
                    optionLabel="KullaniciAdi"
                />
                <label for="seller">Seller</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <AutoComplete class="w-100" v-model="selectedOperation" inputId="operation" :suggestions="filteredOperation" @complete="searchOperation($event)" @item-select="operationSelected($event)" 
                    optionLabel="KullaniciAdi"
                />
                <label for="operation">Operation</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <AutoComplete class="w-100" v-model="selectedFinance" inputId="finance" :suggestions="filteredFinance" @complete="searchFinance($event)" @item-select="financeSelected($event)" 
                    optionLabel="KullaniciAdi"
                />
                <label for="finance">Finance</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-3">
                <InputNumber v-model="model.Pesinat" inputId="advanced_payment" :minFractionDigits="2" :maxFractionDigits="5" fluid class="w-100" />
                <label for="advanced_payment">Advanced Payment</label>
            </FloatLabel>
            
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">
                            Total</th>
                        <td>{{ $usd(0) }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Freight Cost	</th>
                        <td>{{ $usd(0) }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total (Other)	</th>
                        <td>{{ $usd(0) }}</td>
                    </tr>
                    <tr>
                        <th scope="row">G.Total</th>
                        <td>{{ $usd(0) }}</td>
                    </tr>
                </tbody>
                </table>



        </div>
    </div>

</template>
<script setup lang="ts">
    import { useOrdersStore } from '~/store/orders';
    import { useModelStore } from '~/store/model';
    const props = defineProps({
        model:{
            type:Object,
            required:true
        },
        users:{
            type:Array,
            required:true
        },
        suppliers:{
            type:Array,
            required:true
        },
        shipments:{
            type:Array,
            required:true
        },
        payments:{
            type:Array,
            required:true
        },
        invoices:{
            type:Array,
            required:true
        },
        units:{
            type:Array,
            required:true
        },
        productList:{
            type:Array,
            required:true
        },
        customers:{
            type:Array,
            required:true
        },
        country:{
            type:Array,
            required:true
        },
        costList:{
            type:Array,
            required:true
        },
        supplierList:{
            type:Array,
            required:true
        },
        documentList:{
            type:Array,
            required:true
        },
        checkList:{
            type:Array,
            required:true
        }
    });
    const { model,users,suppliers,shipments,payments,invoices,units,customers,country,costList,documentList,checkList } = props;
    const emits = defineEmits([
        'add_product_emit',
        'update_product_emit',
        'delete_product_emit',
        'close_product_emit',
        'save_order_emit',
        'update_order_emit'
    ]);
    const { $usd, $dtsa } = useNuxtApp();
    const ordersStore = useOrdersStore();
    const modelStore = useModelStore();
    const addProductEmit = (event:any)=>{
        emits('add_product_emit',event);
    };
    const updateProductEmit = (event:any)=>{
        emits('update_product_emit',event);
    };
    const deleteProductEmit = (event:any)=>{
        emits('delete_product_emit',event);
    };
    let selectedOrderDate = ref(null);
    const orderDateSelected = (event:any)=>{
        model.SiparisTarihi = event;
    };
    let selectedEstimatedDate = ref(null);
    const estimatedDateSelected = (event:any)=>{
        model.TahminiYuklemeTarihi = event;
    };
    let selectedCustomer = ref(null);
    let filteredCustomers = ref([]);
    const searchCustomers = (event:any)=>{
        let result;
        if(event.query.length == 0){
            result = customers;
        }else{
            result = customers.filter(x=>{
                return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredCustomers.value = result;
    };
    const customerSelected = (event:any)=>{
        model.MusteriID = event.value.ID;
        model.FirmaAdi = event.value.FirmaAdi;
    };

    let selectedSeller = ref(null);
    let filteredSeller = ref([]);
    const searchSeller = (event:any)=>{
        let result;
        if(event.query.length === 0){
            result = users;
        }else{
            result = users.filter(x=>{
                return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredSeller.value = result;
    };
    const sellerSelected = (event:any)=>{
        model.SiparisSahibi = event.value.ID;
        model.SiparisSahibiAdi = event.value.KullaniciAdi;
        model.representativeMail = event.value.MailAdres;
    };

    let selectedOperation = ref(null);
    let filteredOperation = ref([]);
    const searchOperation = (event:any)=>{
        let result;
        if(event.query.lenght === 0){
            result = users;
        }else{
            result = users.filter(x=>{
                return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredOperation.value = result;
    };
    const operationSelected = (event:any)=>{
        model.Operasyon = event.value.ID;
        model.OperasyonAdi = event.value.KullaniciAdi;
        model.operationMail = event.value.MailAdres;
    };
    
    let selectedFinance = ref(null);
    let filteredFinance = ref([]);
    const searchFinance = (event:any)=>{
        let result;
        if(event.query.lenght === 0){
            result = users;
        }else{
            result = users.filter(x=>{
                return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredFinance.value = result;
    };
    const financeSelected = (event:any)=>{
        model.Finansman = event.value.ID;
        model.FinansmanAdi = event.value.KullaniciAdi;
    };
    if(!ordersStore.getButtonSaveCheckDisabled){
        selectedOrderDate.value = $dtsa(model.SiparisTarihi);
        selectedEstimatedDate.value = $dtsa(model.TahminiYuklemeTarihi);
        selectedCustomer.value = customers.find(x=>x.ID === model.MusteriID);
        selectedSeller.value = users.find(x=>x.ID === model.SiparisSahibi);
        selectedOperation.value = users.find(x=>x.ID === model.Operasyon);
        selectedFinance.value = users.find(x=>x.ID === model.Finansman);
    };
    const process = ()=>{
        if(ordersStore.getButtonSaveCheckDisabled){
            model.KayitTarihi = new Date();
            model.KullaniciID = useCookie('goz_mekmar_auth_user_id').value;
            save(model);
        }else{
            update(model);
        }
    };
    const save = (event:any)=>{
        emits('save_order_emit',event);
    };
    const update = (event:any)=>{
        emits('update_order_emit',event);
    };  
</script>