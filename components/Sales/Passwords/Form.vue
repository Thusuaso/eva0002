<template>
    <div class="row m-auto mt-3">
        <div class="col-sm-4">
            <FloatLabel variant="on">
                <InputText id="platform" v-model="model.Platform" autocomplete="off" />
                <label for="platform">Platform</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel variant="on">
                <InputText id="login_name" v-model="model.LoginName" autocomplete="off" />
                <label for="login_name">Login Name</label>
            </FloatLabel>
        </div>
        <div class="col-sm-4">
            <FloatLabel variant="on">
                <InputText id="login_password" v-model="model.LoginPassword" autocomplete="off" />
                <label for="login_password">Login Password</label>
            </FloatLabel>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div :class="status?'col-sm-12':'col-sm-6'">
            <Button :label="status?'Save':'Update'" class="w-100" :severity="status?'success':'warn'" @click="process"/>

        </div>
        <div v-if="!status" class="col-sm-6">
            <Button label="Delete" class="w-100" severity="danger" @click="deleted"/>
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
    const emits = defineEmits(['process_emit','deleted_process_emit']);
    const process = ()=>{
        emits('process_emit',model);
    };
    const deleted = ()=>{
        emits('deleted_process_emit',model);
    };
</script>