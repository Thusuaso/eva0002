<template>
    <div>
        <DataTable :value="salesAndOperationStore.getSalesAndOperationList" 
            v-model:selection="selectedListOne"
            selectionMode="single"
            @row-click="listOneSelected($event)"
            class="p-datatable-sm"
            v-model:filters="filters"
            filterDisplay="row"
            

        >
            <Column field="SiparisNo" header="Po" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="SiparisSahibiAdi" header="Seller" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                </template>
            </Column>
            <Column field="OperasyonAdi" header="Operation" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                </template>
            </Column>
        </DataTable>

    </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { useSalesAndOperationStore } from '~/store/sales_and_operation';
    const salesAndOperationStore = useSalesAndOperationStore();
    const props = defineProps({

    });
    const emits = defineEmits(['selected_list_one_emit']);
    const selectedListOne = ref({});
    const listOneSelected = async (event:any)=>{
        emits('selected_list_one_emit',event.data);
    };

    const filters = ref({
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisSahibiAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        OperasyonAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
</script>