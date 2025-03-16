<template>
    <div class="container">
        <div class="row mt-2 mb-2">
            <div class="col-sm-4">
                <Button class="w-100" severity="success" label="Collection" @click="collection" :loading="finance_collection_button_loading_status"/>
            </div>
            <div class="col-sm-4">
                <Button class="w-100" severity="warn" label="Pre-Payment" @click="prePayment"/>
            </div>
            <div class="col-sm-4">
                <Button class="w-100" severity="secondary" label="Excel" @click="excel"/>
            </div>
        </div>
        
        <FinanceList/>
    </div>


        <Dialog v-model:visible="finance_collection_form_dialog" :header="finance_collection_form_header" modal>
            <FinanceCollection 
                @collection_selected_year_emit="collectionSelectedYear($event)"
                @collection_selected_month_emit="collectionSelectedMonth($event)"
            />
        </Dialog>
        <Dialog v-model:visible="finance_pre_payment_form_dialog" header="Pre Payment" modal>
            <FinancePrePayment/>
        </Dialog>

</template>

<script setup lang="ts">
    import { useFinanceStore } from '~/store/finance';
    const store = useFinanceStore();
    let finance_collection_form_dialog = ref(false);
    let finance_collection_form_header = ref('Mekmar Collection List');
    let finance_collection_button_loading_status = ref(false);
    let finance_pre_payment_form_dialog = ref(false);
    const collection = async ()=>{
        finance_collection_button_loading_status.value = true;
        const { data:collectionList } = await useFetch('/api/finance/collection/list');
        store.setCollectionYearList(collectionList?.value?.years);
        store.setCollectionMonthList(collectionList?.value?.months);
        store.setCollectionList(collectionList?.value?.list);
        finance_collection_form_dialog.value = true;
        finance_collection_button_loading_status.value = false;
    };
    const prePayment = ()=>{
        finance_pre_payment_form_dialog.value = true;
    };
    const excel = () =>{

    };
    const collectionSelectedYear = async (event:any)=>{
        const { data:months } = await useFetch(`/api/finance/collection/years/${event}`);
        store.setCollectionMonthList(months?.value?.list)
    };
    const collectionSelectedMonth = async (event:any)=>{
        let selectedMonthTotal = 0;
        const {data:collection} = await useFetch(`/api/finance/collection/months/${event.year}/${event.month}`);
        store.setCollectionList(collection?.value?.list);
        collection?.value?.list.forEach(x=>{
            selectedMonthTotal += +x.Tutar;
        });

    };
</script>