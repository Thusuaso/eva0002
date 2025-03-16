<template>
    <div>
        <Button label="New Consider" severity="success" @click="newConsider" class="w-100"/>
        <SalesPointsToConsiderList
            @points_to_consider_selected_emit="pointsToConsiderSelected($event)"
        />
        <Dialog v-model:visible="points_to_consider_dialog_form" :header="header" modal>
            <SalesPointsToConsiderForm :model="model" :status="new_button_status"
            @process_emit="process($event)"
            @deleted_emit="deleted($event)"
            />
        </Dialog>
    </div>
</template>
<script setup lang="ts">
    import { usePointsToConsider } from '~/store/points_to_consider';
    const considerStore = usePointsToConsider();
    const { data:consider } = await useFetch('/api/sales/points-to-consider/list',{method:'GET'});
    considerStore.setPointsToConsider(consider?.value?.list.length >0 ? consider?.value?.list:[]);
    let points_to_consider_dialog_form = ref(false);
    let header = ref('Save');
    let model = ref({});
    let new_button_status = ref(false);
    const toast = useToast();
    const pointsToConsiderSelected = (event:any)=>{
        new_button_status.value=false;
        header.value = 'Update';
        model.value = {...event};
        points_to_consider_dialog_form.value = true;
    };
    const newConsider = ()=>{
        new_button_status.value=true;
        header.value = 'Save';
        model.value = { 'Hata':'' };
        points_to_consider_dialog_form.value = true;
    };
    const process = (event:any)=>{
        if(new_button_status.value){
            save(event);
        }else{
            update(event);
        }
    };
    const save = async (event:any)=>{
        const {data:consider} = await useFetch('/api/sales/points-to-consider/process/save',{
            method:'POST',
            body:event
        });
        if(consider?.value?.status){
            toast.add({severity:'success',detail:consider?.value?.message,life:3000});
            considerStore.addConsider({...event,'ID':consider?.value?.id});
            model.value = {'Hata':''};
            points_to_consider_dialog_form.value = false;


        }else{
            toast.add({severity:'error',detail:consider?.value?.message,life:3000});

        }
    };
    const update = async (event:any)=>{
        const {data:consider} = await useFetch('/api/sales/points-to-consider/process/update',{
            method:'PUT',
            body:event
        });
        if(consider?.value?.status){
            toast.add({severity:'success',detail:consider?.value?.message,life:3000});
            considerStore.updateConsider({...event});
            points_to_consider_dialog_form.value = false;


        }else{
            toast.add({severity:'error',detail:consider?.value?.message,life:3000});

        };
    };
    const deleted = async (event:any)=>{
        const {data:consider} = await useFetch(`/api/sales/points-to-consider/process/deleted/${event}`,{
            method:'DELETE',
        });
        if(consider?.value?.status){
            toast.add({severity:'success',detail:consider?.value?.message,life:3000});
            considerStore.deleteConsider(event);
            points_to_consider_dialog_form.value = false;
        }else{
            toast.add({severity:'error',detail:consider?.value?.message,life:3000});

        };
    };
</script>