<template>
    <div class="row mt-2">
        <div class="col-sm">
            <FloatLabel variant="on">
                <AutoComplete v-model="selectedSupplier" inputId="supplier" optionLabel="FirmaAdi" :suggestions="filteredSupplier" @complete="searchSupplier($event)"
                    @item-select="supplierSelected($event)"
                />
                <label for="supplier">Supplier</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputText id="crate_width" v-model="store.getCrateSizeModal.Crate_Width" autocomplete="off" />
                <label for="crate_width">Crate Width</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputText id="crate_length" v-model="store.getCrateSizeModal.Crate_Height" autocomplete="off" />
                <label for="crate_length">Crate Length</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputText id="crate_height" v-model="store.getCrateSizeModal.Crate_Thickness" autocomplete="off" />
                <label for="crate_height">Crate Height</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputText id="tile_size" v-model="store.getCrateSizeModal.Stone_Size" autocomplete="off" />
                <label for="tile_size">Tile Size</label>
            </FloatLabel>
        </div>
        <div class="col-sm">
            <FloatLabel variant="on">
                <InputText id="pieces" v-model="store.getCrateSizeModal.Piece" autocomplete="off" />
                <label for="pieces">Piece</label>
            </FloatLabel>
        </div>
    </div>
    <div class="row mt-2">
        <div :class="status? 'col-sm-12':'col-sm-6'">
            <Button :label="status?'Save':'Update'" :severity="status?'success':'warn'" class="w-100" @click="process" :loading="button_status_loading"/>
        </div>
        <div class="col-sm-6" v-if="!status">
            <Button label="Delete" severity="danger" class="w-100" @click="deleted" :loading="button_status_loading"/>

        </div>

    </div>
</template>
<script setup lang="ts">
    import { useCrateSizeStore } from '~/store/crate_size';
    const toast = useToast();
    const store = useCrateSizeStore();
    const props = defineProps({
        status:{
            type:Boolean,
            required:true
        }
    });
    const {status} = props;
    const emits = defineEmits(['crate_size_close_dialog'])
    let selectedSupplier = ref();
    let filteredSupplier = ref();
    let button_status_loading=ref(false);
    const searchSupplier = (event:any)=>{
        let result;
        if(event.query.length === 0){
            result = store.getCrateSizeSupplier;
        }else{
            result = store.getCrateSizeSupplier.filter((item)=>{
                return item.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredSupplier.value = result;
    };
    const supplierSelected = (event:any)=>{
        store.getCrateSizeModal.SupplierId = event.value.ID;
        store.getCrateSizeModal.Supplier = event.value.FirmaAdi;
    };
    const process = ()=>{
        if(status){
            save();
        }else{
            update();
        }
    };
    const save = async ()=>{
        button_status_loading.value = true;
        const {data:crateSize} = await useFetch('/api/selection/crate-size/process/save',{method: 'POST',body:store.getCrateSizeModal});
        if(crateSize?.value?.status){
        button_status_loading.value = false;
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
        selectedSupplier.value = null;
        getList();

            toast.add({ severity: 'success', summary: 'Crate Size', detail: crateSize?.value?.message, life: 3000 });
        } else{
        button_status_loading.value = false;

            toast.add({ severity: 'success', summary: 'Crate Size', detail: crateSize?.value?.message, life: 3000 });
        }
    };
    const update = async ()=>{
        button_status_loading.value = true;

        const {data:crateSize} = await useFetch('/api/selection/crate-size/process/update',{method: 'PUT',body:store.getCrateSizeModal});
        if(crateSize?.value?.status){
        button_status_loading.value = false;
        emits('crate_size_close_dialog');
        getList();

            toast.add({ severity: 'success', summary: 'Crate Size', detail: crateSize?.value?.message, life: 3000 });
        } else{
        button_status_loading.value = false;

            toast.add({ severity: 'success', summary: 'Crate Size', detail: crateSize?.value?.message, life: 3000 });
        }
    };
    const deleted = async ()=>{
        button_status_loading.value = true;

        const {data:crateSize} = await useFetch(`/api/selection/crate-size/process/deleted/${store.getCrateSizeModal.ID}`);
        if(crateSize?.value?.status){
        button_status_loading.value = false;
        emits('crate_size_close_dialog');
        getList();

            toast.add({ severity: 'success', summary: 'Crate Size', detail: crateSize?.value?.message, life: 3000 });
        } else{
        button_status_loading.value = false;

            toast.add({ severity: 'success', summary: 'Crate Size', detail: crateSize?.value?.message, life: 3000 });
        }
    };
    if(!status){
        selectedSupplier.value = store.getCrateSizeSupplier.find(x=>{
            return x.ID === store.getCrateSizeModal.SupplierId;
        })
    };
    const getList = async ()=>{
        const {data:crateSizeList} = await useFetch('/api/selection/crate-size/list');
        store.setCrateSizeList(crateSizeList?.value?.list);

    }

</script>