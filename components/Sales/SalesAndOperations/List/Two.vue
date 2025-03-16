<template>
    <div>
        <DataTable :value="list" class="p-datatable-sm" 
        
        >
            <template #header>
                {{header}}
            </template>
            <Column field="Name" header="Seller"></Column>
            <Column field="Total" header="Total"></Column>
        </DataTable>


    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        list:{
            type:Array,
            required:true
        },
        header:{
            type:String,
            required:true
        }
    });
    const { list } = props;
</script>