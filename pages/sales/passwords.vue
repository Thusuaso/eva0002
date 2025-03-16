<template>
    <div>
        <Button label="New" severity="success" class="w-100" @click="newForm"/>
        <SalesPasswordsList @password_selected_emit="passwordSelected($event)"/>
    </div>
    <Dialog v-model:visible="password_dialog_form" :header="password_dialog_header" modal  >
        <SalesPasswordsForm :model="model" :status="status" @process_emit="process($event)" @deleted_process_emit="deleted($event)"/>
    </Dialog>
</template>
<script setup lang="ts">
    import { usePasswordsStore } from '~/store/passwords';
    const toast = useToast();
    const store = usePasswordsStore();
    const { data:passwords } = await useFetch('/api/sales/passwords/list',{method:'GET'});
    store.setList(passwords?.value?.list.length > 0 ? passwords?.value?.list:[]);
    let password_dialog_form = ref(false);
    let password_dialog_header = ref('');
    let status = ref(false);
    let model = ref({
        ID:0,
        Platform:'',
        LoginName:'',
        LoginPassword:''
    });
    const passwordSelected = (event:any)=>{
        status.value = false;
        model.value = event;
        password_dialog_form.value = true;
        password_dialog_header.value = event.Platform;
    };
    const newForm = ()=>{
        status.value = true;
        model.value = {
            ID:0,
            Platform:'',
            LoginName:'',
            LoginPassword:''
        };
        password_dialog_form.value = true;
        password_dialog_header.value = 'New';
    };
    const process = (event:any)=>{
        if(status.value){
            save(event);
        }else{
            update(event);
        }
    };
    const deleted = async (event:any)=>{
        const {data:passwords} = await useFetch(`/api/sales/passwords/delete/${event.ID}`,{method:'DELETE'});
        if(passwords?.value?.status){
            store.deleteList(event.ID);
            password_dialog_form.value = false;
            toast.add({severity:'success',detail:passwords?.value?.message,life:3000});

        }

    };
    const save = async (event:any)=>{
        const { data:passwords } = await useFetch('/api/sales/passwords/process/save',{
            method:'POST',
            body:event
        });
        if(passwords?.value?.status){
            password_dialog_form.value = false;
            store.addList({...event,ID:passwords?.value?.id});
            toast.add({severity:'success',detail:passwords?.value?.message,life:3000});
        }else{
            toast.add({severity:'error',detail:passwords?.value?.message,life:3000});
        }
    };
    const update = async (event:any)=>{
        const { data:passwords } = await useFetch('/api/sales/passwords/process/update',{
            method:'PUT',
            body:event
        });
        if(passwords?.value?.status){
            password_dialog_form.value = false;
            store.updateList({...event});
            toast.add({severity:'success',detail:passwords?.value?.message,life:3000});
        }else{
            toast.add({severity:'error',detail:passwords?.value?.message,life:3000});
        }
    };
    
</script>