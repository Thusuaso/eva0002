<template>
    <div>
        <DataTable :value="store.getList" resizableColumns columnResizeMode="fit" 
            v-model:selection="selectedPasswordList"
            selectionMode="single"
            @row-click="passwordListSelected($event)"
        >
            <Column field="Platform" header="Platform" ></Column>
            <Column field="LoginName" header="Username"></Column>
            <Column field="LoginPassword" header="Password">
                <template #body="slotProps">
                    <SalesPasswordsShow :password="slotProps.data.LoginPassword"/>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script setup lang="ts">
    import { usePasswordsStore } from '~/store/passwords';
    const store = usePasswordsStore();
    const selectedPasswordList = ref({});
    const emits = defineEmits(['password_selected_emit']);
    const passwordListSelected = (event:any)=>{
        emits('password_selected_emit',event.data);
    };
</script>