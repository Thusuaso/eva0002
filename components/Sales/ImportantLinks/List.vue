<template>
    <div>
        <DataTable :value="store.getList" 
            v-model:selection="selectedImportantLink"
            selectionMode="single"
            @row-click="importantLinkSelected($event)"
        >
            <Column field="Description" header="Desc."></Column>
            <Column header="Link">
                <template #body="slotProps">
                    <a :href="slotProps.data.Link" target="_blank">Link</a>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script setup lang="ts">
    import { useImportantLinksStore } from '~/store/important-links';
    const store = useImportantLinksStore();
    const emits = defineEmits(['important_links_selected_emit']);
    const selectedImportantLink = ref({});
    const importantLinkSelected = (event:any)=>{
        emits('important_links_selected_emit',event.data);
    };

</script>