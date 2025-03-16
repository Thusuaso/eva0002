<template>

        <DataTable :value="list" v-model:filters="filters" filterDisplay="row"
            v-model:selection="selectedTodo"
            selectionMode="single"
            @row-click="todoSelected($event)"
        >
            <Column field="Sira" header="Queue"></Column>
            <Column field="OrtakGorev" header="Assign">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="Yapilacak" header="Assignment">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
        </DataTable>


</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
    const emits = defineEmits(['todo_selected_emit'])
    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const { list } = props;
    const filters = ref({
        OrtakGorev: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Yapilacak: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const selectedTodo = ref({});
    const todoSelected = (event:any)=>{
        emits('todo_selected_emit',event.data);
    };
</script>