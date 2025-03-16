<template>
    <div>
        <DataTable :value="model.getPointsToConsider" class="p-datatable-sm"
            v-model:selection="selectedPointsToConsider"
            selectionMode="single"
            @row-click="pointsToConsiderSelected($event)"
        >
            <Column field="ID" header="ID"></Column>
            <Column field="Hata" header="Points of Consider"></Column>
        </DataTable>
    </div>
</template>
<script setup lang="ts">
    import { usePointsToConsider } from '~/store/points_to_consider';
    const model = usePointsToConsider();
    const selectedPointsToConsider = ref({});
    const emits = defineEmits(['points_to_consider_selected_emit']);
    
    const pointsToConsiderSelected = (event:any)=>{
        emits('points_to_consider_selected_emit',event.data);
    };
</script>