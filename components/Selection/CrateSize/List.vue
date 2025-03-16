<template>
    <div class="">
        <DataTable :value="store.getCrateSizeList" v-model:filters="filters" filterDisplay="row"
            v-model:selection="selectedCrateSize"
            selectionMode="single"
            @row-click="crateSizeSelected($event)"
            scrollable scrollHeight="600px"
            class="p-datatable-sm"
        >
            <Column field="Supplier" header="Supplier" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  class="w-100"/>
        </template>
            </Column>
            <Column field="Crate_Width" header="Crate Width" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false" >
                <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  class="w-100"/>
        </template>
            </Column>
            <Column field="Crate_Height" header="Crate Lenght" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  class="w-100"/>
        </template>
            </Column>
            <Column field="Crate_Thickness" header="Crate Height" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  class="w-100"/>
        </template>
            </Column>
            <Column field="Stone_Size" header="Tile Size" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }" >
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  class="w-100"/>
        </template>
            </Column>
            <Column field="Piece" header="Piece" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  class="w-100"/>
        </template>
            </Column>

        </DataTable>
    </div>
</template>
<script setup lang="ts">
    import {useCrateSizeStore} from '~/store/crate_size';
    import { FilterMatchMode } from '@primevue/core/api';
    const emits = defineEmits(['crate_size_selected'])
    const store = useCrateSizeStore();
    const filters = ref({
        Supplier: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Width: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Height: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Crate_Thickness: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Stone_Size: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Piece: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

    });
    const selectedCrateSize = ref();
    const crateSizeSelected = (event:any) =>{
        emits('crate_size_selected',event.data);
    };
</script>