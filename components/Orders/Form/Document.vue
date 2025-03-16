<template>
    <div>
        <DataTable :value="list" tableStyle="min-width: 50rem">
            <Column field="YuklemeEvrakID" header="Y.ID"></Column>
            <Column field="SiparisFaturaTurID" header="S.ID"></Column>
            <Column field="Tarih" header="Date">
                <template #body="slotProps">
                    {{ $dtsa(slotProps.data.Tarih) }}
                </template>
            </Column>
            <Column field="Evrak" header="Document"></Column>
            <Column field="Link" header="Link">
                <template #body="slotProps">
                    <a :href="slotProps.data.Link">
                        <i class="pi pi-download"></i>
                    </a>
                </template>
            </Column>
            <Column field="kullanici" header="Document Rep"> </Column>
            <Column header="#">
                <template #body="slotProps">
                <Button
                    v-if="slotProps.data.Evrak == 'Proforma Invoice'"
                    label="Sil"
                    class="p-button-danger"
                    @click="proformaDelete(slotProps.data.ID)"
                ></Button>
                <Button
                    v-if="slotProps.data.YuklemeEvrakID == 3"
                    label="Sil"
                    class="p-button-danger"
                    @click="isfDelete(slotProps.data)"
                ></Button>
                </template>
            </Column>

        </DataTable>

    </div>
</template>
<script setup lang="ts">

    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const { list } = props;
    const { $dtsa } = useNuxtApp();
    const toast = useToast();

    const proformaDelete = async (event:any)=>{
        if(confirm('Are you sure you want to delete?')){
            const { data:deleted } = await useFetch(`/api/orders/detail/document/process/deleted/${event}`);
            if(deleted?.value?.status){
                toast.add({ severity: 'success', summary: 'Proforma Delete', detail: deleted?.value?.message, life: 3000 });
            }else{
                toast.add({ severity: 'error', summary: 'Proforma Delete', detail: deleted?.value?.message, life: 3000 });
            };
        };
    };
    const isfDelete = async (event:any)=>{
        
    };
</script>