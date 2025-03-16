<template>
<DataTable :value="useCardsList().getCardList" paginator :rows="15"
    class="p-datatable-sm"
    v-model:filters="filters"
    filterDisplay="row"
    v-model:selection="selectedCard"
    selectionMode="single"
    @row-click="cardSelected($event)"
>
    <Column field="ID" header="ID" :showFilterOperator="false" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }" >
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
        </template>
    </Column>
    <Column field="KategoriAdi" header="Category" :showFilterOperator="false" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
        </template>
    </Column>
    <Column field="UrunAdi" header="Product" :showFilterOperator="false" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
        </template>
    </Column>
    <Column field="YuzeyIslemAdi" header="Surface" :showFilterOperator="false" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
        </template>
    </Column>
    <Column field="En" header="Width" :showFilterOperator="false" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
        </template>
    </Column>
    <Column field="Boy" header="Height" :showFilterOperator="false" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
        </template>
    </Column>
    <Column field="Kenar" header="Thickness" :showFilterOperator="false" :showFilterMenu="false" :showClearButton="false">
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
        </template>
    </Column>

</DataTable>

</template>
<script setup lang="ts">
    import { FilterMatchMode } from '@primevue/core/api';
    import {useCardsList} from '~/store/cards';
    const emits = defineEmits(['card_selected_emit']);
    const filters = ref({
        ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH }


    });
    const selectedCard = ref(null);
    const cardSelected = (event:any) =>{
        emits('card_selected_emit',event.data);
    };
</script>