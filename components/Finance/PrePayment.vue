<template>
    <div class="row mt-2 mb-2">
        <div class="col-sm">
            <FloatLabel variant="on">
                <DatePicker v-model="selectedDate" inputId="date" showIcon iconDisplay="input" />
                <label for="date">Date</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputText id="po" v-model="model.po" autocomplete="off" />
                <label for="po">Po</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputNumber v-model="model.price" inputId="price_input" mode="currency" currency="USD" locale="en-US" variant="filled" />
                <label for="price_input">Price</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputNumber v-model="model.currency" inputId="currency_input" mode="currency" currency="USD" locale="en-US" variant="filled" />
                <label for="currency_input">Currency</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputNumber v-model="model.cost" inputId="cost_input" mode="currency" currency="USD" locale="en-US" variant="filled" />
                <label for="cost_input">Cost</label>
            </FloatLabel>
        </div>

    </div>
    <div class="row mb-2">
        <div class="col-sm-12">
            <FloatLabel variant="on">
                <Textarea id="description" v-model="model.description" rows="5" style="resize: none;width:100%;" />
                <label for="description">Description</label>
            </FloatLabel>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <Button severity="success" label="Save" class="w-100" @click="save" :loading="save_button_loading_status"/>

        </div>
        <div class="col-sm-6">
            <Button severity="info" label="Cancel" class="w-100" @click="cancel" />
        </div>

    </div>
    <div class="row" v-if="prePaymentList.length >0">
        <div class="col-sm-12">
            <DataTable :value="prePaymentList" class="w-100" v-model:selected="selectedPrePayment" selectionMode="single"
                @row-click="prePaymentSelected($event)"
            >
                <Column field="FirmaAdi" header="Customer"></Column>
                <Column field="SiparisNo" header="Po"></Column>
                <Column field="Kalan" header="Total">
                    <template #body="slotProps">
                        {{ $usd(slotProps.data.Kalan) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script setup lang="ts">
    const cookie = useCookie('userId');
    const {$usd,$dtsa} = useNuxtApp();
    const selectedDate = ref();
    let save_button_loading_status = ref(false);
    let model = ref({
        date:'',
        po: '',
        price: 0,
        currency: 0,
        cost: 0,
        description: '',
        customer:0,
        paidkind:1,
        user:cookie.value
    });
    let prePaymentList = ref();
    const selectedPrePayment = ref();
    const { data:prepayment } = await useFetch('/api/finance/pre-payment/list');
    prePaymentList.value = prepayment?.value?.list;

    const save = async ()=>{
        save_button_loading_status.value = true;
        model.value.date = $dtsa(selectedDate.value);
        const { data:prepayment } = await useFetch('/api/finance/pre-payment/process/save',{method:'POST',body:model.value});
        if(prepayment?.value?.status){
            save_button_loading_status.value = false;

        }
    };
    const cancel = async () =>{

    };
    const prePaymentSelected = (event:any)=>{
        model.value.po = event.data.SiparisNo;
        model.value.price = event.data.Kalan;
        model.value.customer = event.data.MusteriID;
    };



</script>