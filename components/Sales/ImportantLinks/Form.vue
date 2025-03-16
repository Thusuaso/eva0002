<template>
    
    <div class="row m-auto mt-3">
        <div class="col-sm-6">
            <FloatLabel variant="on">
                <Textarea id="description" v-model="model.Description" class="w-100" rows="6" style="resize: none" />
                <label for="description">Description</label>
            </FloatLabel>
        </div>
        <div class="col-sm-6">
            <FloatLabel variant="on">
                <InputText id="link" v-model="model.Link" autocomplete="off" class="w-100"/>
                <label for="link">Link</label>
            </FloatLabel>
        </div>
    </div>
    <div class="row m-auto mt-4">
        <div :class="status? 'col-sm-12':'col-sm-6'">
            <Button :severity="status?'success':'warn'" class="w-100" :label="status? 'Save':'Update'" @click="process"/>
        </div>
        <div v-if="!status" class="col-sm-6">
            <Button class="w-100" label="Delete" severity="danger" @click="deleted"/>


        </div>

    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        model:{
            type:Object,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        }
    });
    const { model,status } = props;
    const emits = defineEmits(['important_link_process_emit','important_link_deleted_emit'])
    const process = () => {
         emits('important_link_process_emit',model);
    };
    const deleted = async ()=>{
        emits('important_link_deleted_emit', model.ID);
    }

</script>