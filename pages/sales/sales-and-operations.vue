<template>
    <div class="row m-auto">
        <div class="col-sm-6">
            <SalesSalesAndOperationsListOne  @selected_list_one_emit="listOneSelected($event)"/>
        </div>
        <div class="col-sm-6">
            <SalesSalesAndOperationsListTwo :list="listTwo" header="Seller Summary"/>
            <br/>
            <SalesSalesAndOperationsListTwo :list="listThree" header="Operations Summary"/>
        </div>

    </div>
    <Dialog v-model:visible="list_one_dialog" modal header="Change Seller and Operations">
        <SalesSalesAndOperationsForm :users="userList" :model="model"
            @sales_and_operations_updated_emit="updated($event)"
        />
    </Dialog>
</template>
<script setup lang="ts">
    import { useSalesAndOperationStore } from "~/store/sales_and_operation";
    const salesAndOperationStore = useSalesAndOperationStore();
    const { data:sales } = await useFetch('/api/sales/sales-and-operations/list',{method:'GET'});
    salesAndOperationStore.setSalesAndOperation(sales?.value?.listOne);


    const { data:users } = await useFetch('/api/shared/users',{method:'GET'});
    const toast = useToast();
    let listOne = sales?.value?.listOne;
    let listTwo = sales?.value?.listTwo;
    let listThree = sales?.value?.listThree;
    let userList = users?.value?.list;
    let list_one_dialog = ref(false);
    let model = ref({});
    const listOneSelected = async(event:any)=>{
        model.value = {...event};
        list_one_dialog.value = true;
    }; 
    const updated = async(event:any)=>{
        const {data:sales} = await useFetch('/api/sales/sales-and-operations/process/update',{ method:'PUT',body:event })
        if(sales.value?.status){
            list_one_dialog.value = false;
            toast.add({severity:'success',detail:sales.value.message,life:3000});
        }else{
            toast.add({severity:'error',detail:sales.value.message,life:3000});
        }
    };

</script>