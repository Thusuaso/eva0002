<template>
    <div>
        <div class="row mt-2">
            <div class="col-sm-6">
                <FloatLabel class="w-full md:w-56" variant="on">
                    <Select v-model="selectedYear" inputId="years" :options="store.getCollectionYearList" optionLabel="Year" class="w-100" @change="yearSelected($event)"/>
                    <label for="years">Years</label>
                </FloatLabel>
            </div>
            <div class="col-sm-6">
                <FloatLabel class="w-full md:w-56" variant="on">
                    <Select v-model="selectedMonth" inputId="months" :options="store.getCollectionMonthList" optionLabel="Month" class="w-100" @change="monthSelected($event)"/>
                    <label for="months">Months</label>
                </FloatLabel>
            </div>
        </div>

        <DataTable :value="store.getCollectionList" class="p-datatable-sm" filterDisplay="row" v-model:filters="filters"
        @filter="filterSelected($event)"
        >
            <Column field="Tarih" header="Date" footerStyle="font-weight:bold;" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #body="slotProps">
                    {{ $dtsa(slotProps.data.Tarih) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
                <template #footer>
                    TOTAL
                </template>
            </Column>
            <Column field="FirmaAdi" header="Customer" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="SiparisNo" header="Po" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="Tutar" header="Paid Amount" footerStyle="font-weight:bold;">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.Tutar) }}
                </template>
                <template #footer>
                    {{ $usd(store.getCollectionTotal) }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script setup lang="ts">
    import { useFinanceStore } from '~/store/finance';
    import { FilterMatchMode } from '@primevue/core/api';
    const store = useFinanceStore();
    const emits = defineEmits(['collection_selected_year_emit','collection_selected_month_emit']);
    const filters = ref({
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const { $dtsa,$usd } = useNuxtApp();

    let selectedYear = ref();
    selectedYear.value = store.getCollectionYearList[0];
    let selectedMonth = ref();
    selectedMonth.value = store.getCollectionMonthList[0];
    let total = 0;
    await store.getCollectionList.forEach(x=>{
        total += +x.Tutar;
    });
    store.setCollectionTotalList(total);
    const filterSelected = async (event:any)=>{
        let filteredTotal = 0;
        await event.filteredValue.forEach(x=>{
            filteredTotal += +x.Tutar;
        });
        store.setCollectionTotalList(filteredTotal);
    };
    const yearSelected = async (event:any)=>{
        emits('collection_selected_year_emit',event.value.Year);
    };
    const monthSelected = async (event:any)=>{
        const date = {
            'year':selectedYear.value.Year,
            'month':event.value.Month
        }
        emits('collection_selected_month_emit',date)
    };
</script>