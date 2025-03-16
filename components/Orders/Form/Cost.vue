<template>
    <div>
        <DataTable :value="list" tableStyle="min-width: 50rem">
            <Column field="Tur" header="Kind of Cost"></Column>
            <Column field="tut" header="Price">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.tut) }}
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
    const { $usd } = useNuxtApp();

</script>