<template>
    <div>
        <Button severity="success" label="New Link" class="w-100" @click="newForm"/>
        <SalesImportantLinksList @important_links_selected_emit="importantLinksSelected($event)"/>
        <Dialog v-model:visible="important_links_dialog_form" :header="important_links_dialog_header" modal>
            <SalesImportantLinksForm :model="model" :status="status" @important_link_process_emit="process($event)"
                @important_link_deleted_emit="deleted($event)"
            />
        </Dialog>
    </div>
</template>
<script setup lang="ts">
    import { useImportantLinksStore } from '~/store/important-links';
    const store = useImportantLinksStore();
    const toast = useToast();
    const { data:important } = await useFetch('/api/sales/important-links/list');
    store.setList(important?.value?.list.length > 0 ? important?.value?.list:[]);
    let important_links_dialog_form = ref(false);
    let important_links_dialog_header = ref('');
    let model = ref({
        ID:0,
        Description:'',
        Link:'',
        SaveDate:'',
        UpdatedUserID:0
    });
    let status = ref(false);
    const importantLinksSelected = (event:any)=>{
        status.value = false;
        important_links_dialog_form.value = true;
        important_links_dialog_header.value = 'Update Important Link';
        model.value = event;
    };
    const newForm = ()=>{
        status.value = true;
        important_links_dialog_form.value = true;
        important_links_dialog_header.value = 'Save Important Link';
        model.value = {
            ID:0,
            Description:'',
            Link:'',
            SaveDate:'',
            UpdatedUserID:0
        };
    };
    const process = (event:any)=>{
        if(status.value){
            save(event);
        }else{
            update(event);
        }
    };
    const save = async (event:any)=>{
        const {data:important} = await useFetch('/api/sales/important-links/process/save',{
            method: 'POST',
            body: event
        });
        if(important?.value?.status){
            important_links_dialog_form.value = false;
            toast.add({severity:'success',detail:important?.value?.message,life:3000});
            store.addList({...event,'ID':important?.value?.id});
        }else{
            toast.add({severity:'error',detail:important?.value?.message,life:3000});
        }
    };
    const update = async (event:any)=>{
        const {data:important} = await useFetch('/api/sales/important-links/process/update',{
            method: 'put',
            body: event
        });
        if(important?.value?.status){
            important_links_dialog_form.value = false;
            toast.add({severity:'success',detail:important?.value?.message,life:3000});
            store.updateList({...event});
        }else{
            toast.add({severity:'error',detail:important?.value?.message,life:3000});
        }
    };
    const deleted = async(event:any)=>{
        const {data:important} = await useFetch(`/api/sales/important-links/process/delete/${event}`,{
            method: 'DELETE'
        });
        if(important?.value?.status){
            important_links_dialog_form.value = false;
            toast.add({severity:'success',detail:important?.value?.message,life:3000});
            store.deleteList(event);
        }else{
            toast.add({severity:'error',detail:important?.value?.message,life:3000});
        }
    };

</script>