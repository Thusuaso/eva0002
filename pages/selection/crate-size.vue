<template>
    <div class="container mt-2">
        <Button label="New Crate Size" severity="success" @click="newForm" class="w-100"/>
        <SelectionCrateSizeList @crate_size_selected="crateSizeSelected($event)"/>
    </div>
    <Dialog v-model:visible="crate_size_selected_form_dialog" :header="header" :modal="true">
        <SelectionCrateSizeForm :status="status" @crate_size_close_dialog="crateSizeCloseDialog"/>
    </Dialog>
</template>
<script setup lang="ts">
    import {useCrateSizeStore} from '~/store/crate_size';
    const store = useCrateSizeStore();
    let crate_size_selected_form_dialog = ref(false);
    let header = ref('New Crate Size');
    let status = ref(false);
    const {data:crateSizeList} = useFetch('/api/selection/crate-size/list');
    const {data:supplierList} = await useFetch('/api/selection/shared/supplier');

    store.setCrateSizeList(crateSizeList?.value?.list);
    store.setCrateSizeSupplier(supplierList?.value?.list);
    const newForm = ()=>{
        const modal = {
                ID:0,
                Crate_Width:'',
                Crate_Height:'',
                Crate_Thickness:'',
                Stone_Size:'',
                SupplierId:0,
                Supplier:'',
                Piece:0
            };
        store.setCrateSizeModal(modal);
        status.value = true;
        crate_size_selected_form_dialog.value = true;
        header.value = 'New Crate Size';
    };
    const crateSizeSelected = async (event:any)=>{    
        await store.setCrateSizeModal(event);
        header.value = event.Supplier + ' - ' + event.Crate_Width + 'x' + event.Crate_Height + 'x' + event.Crate_Thickness;
        status.value = false;
        crate_size_selected_form_dialog.value = true;
    };
    const crateSizeCloseDialog = ()=>{
        crate_size_selected_form_dialog.value = false;
    }
</script> 