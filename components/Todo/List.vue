<template>
        <DataTable :value="list" tableStyle="min-width: 50rem"
                class="p-datatable-sm"
                sortField="Acil" :sortOrder="-1"
                :rowStyle="rowStyle"
                v-model:selection="selectedTodo"
                selectionMode="single"
                @row-click="todoSelect($event)"
            >
                <Column field="Yapilacak" header="Assignment"></Column>
                <Column field="GirisTarihi" header="Date">
                    <template #body="slotProps">
                        {{ $dtsa(slotProps.data.GirisTarihi) }}
                    </template>
                </Column>
                <Column header="#">
                    <template #body="slotProps">
                        <Button type="button" severity="info" label="Done" @click="done(slotProps.data.ID)"/>
                    </template>
                </Column>
            </DataTable>
</template>
<script setup lang="ts">
const emits = defineEmits(['todo_select_emit','process_done_emit'])
    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const rowStyle = (event:any)=>{
        if(event.Acil){
            return {'backgroundColor':'#000080','color':'#fff'}
        }
    };
    const selectedTodo = ref({});
    const {$dtsa} = useNuxtApp();
    const todoSelect = (event:any)=>{
        emits('todo_select_emit',event.data);
    };
    const done = async (id:any)=>{
        const data = {
            'id':id,
            'date':$dtsa(new Date())
        }
        emits('process_done_emit',data);
    };
</script>