<template>
    <div >
        <DataTable :value="store.getList" paginator :rows="15" class="w-100 p-datatable-sm"
            style="font-size:80%;"
            sortField="KasaNo"
            :sortOrder="-1"
            v-model:filters="filters"
            filterDisplay="row"
            @filter="filterTotal($event)"
            v-model:selection="selectedSelection"
            selectionMode="single"
            @row-click="selectionSelected($event)"
            :loading="store.getSelectionTableLoading"


        >
            <Column field="KasaNo" header="Crate No" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>
            <Column field="Tarih" header="Date" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #body="slotProps">
                    {{ $dtsa(slotProps.data.Tarih) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>
            <Column field="KategoriAdi" header="Category" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>
            <Column field="UrunAdi" header="Product" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }" >
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
                <template #footer>
                    {{ $decimal(store.getSelectionTotalList.crate) }}
                </template>
            </Column>
            <Column field="YuzeyIslemAdi" header="Surface" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false"> 
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>

            <Column field="En" header="Width" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>
            <Column field="Boy" header="Height" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>
            <Column field="Kenar" header="Thickness" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>
            <Column field="BirimAdi" header="Unit" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>
            <Column field="Adet" header="Pcs. in Box" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #body="slotProps">
                    {{ $decimal(slotProps.data.Adet) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
                <template #footer>
                    {{ $decimal(store.getSelectionTotalList.pcs_in_box) }}
                </template>
            </Column>
            <Column field="KutuAdet" header="Box Amount" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #body="slotProps">
                    {{ $decimal(slotProps.data.KutuAdet) }}
                </template>
                <template #footer>
                    {{ $decimal(store.getSelectionTotalList.box_in_crate) }}
                </template>
            </Column>
            <Column field="Miktar" header="Amount" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #body="slotProps">
                    {{ $decimal(slotProps.data.Miktar) }}
                </template>
                <template #footer>
                    {{ $decimal(store.getSelectionTotalList.amount) }}
                </template>
            </Column>
            <Column field="Kutu" header="Box" >

            </Column>
            <Column field="Bagli" header="Binded">

            </Column>
            <Column field="SiparisAciklama" header="Po" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>
            <Column field="Aciklama" header="Desc." :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="w-100"/>
                </template>
            </Column>

        </DataTable>

    </div>
</template>
<script setup lang="ts">
    import { useSelectionStore } from '~/store/selection';
    import { FilterMatchMode } from '@primevue/core/api';
    const emits = defineEmits(['selected_selection_emit'])
    const store = useSelectionStore();
    const { $dtsa,$decimal } = useNuxtApp();
    const filters = ref({
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        BirimAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisAciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },


    });
    const selectedSelection = ref({});
    const selectionSelected = (event:any)=>{
        emits('selected_selection_emit',event.data);
    };
    const filterTotal = async (event)=>{
        // let total = {
		// 		crate:0,
		// 		amount:0,
		// 		box_in_crate:0,
		// 		pcs_in_box:0
		// 	};
		// 	total.crate = event.filteredValue.length;
		// 	await event.filteredValue.forEach(x=>{
        //         total.amount += x.Miktar;
        //         total.box_in_crate += x.KutuAdet;
        //         total.pcs_in_box += x.Adet;
		// 	});
        // store.setSelectionTotalList(total);
    };
</script>