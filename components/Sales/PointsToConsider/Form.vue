<template>
    <div class="mt-3">
        <FloatLabel variant="on">
            <Textarea id="consider" v-model="model.Hata" rows="5" cols="30" style="resize: none" />
            <label for="consider">Consider</label>
        </FloatLabel>
        <div class="row m-auto text-center">
            <div :class="status?'col-sm-12':'col-sm-6'">
                <Button :label="status?'Save':'Update'" class="w-100" :severity="status?'success':'warn'" @click="process"/>

            </div>
            <div v-if="!status" class="col-sm-6">
                <Button label="Delete" class="w-100" severity="danger" @click="deleted"/>
            </div>

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
    const emits = defineEmits(['process_emit','deleted_emit'])
    const process = ()=>{
        emits('process_emit',model);
    };
    const deleted = ()=>{
        emits('deleted_emit',model.ID);
    };
</script>