<template>
    <div>
        <div v-if="!status">
            <span>********</span><Button class="ml-3" @click="status= !status" icon="pi pi-key" severity="secondary"  style="width:20px;height:20px;" />
        </div>
        <div v-else>
            <span>{{ password }}</span><Button class="ml-3" @click="status= !status" icon="pi pi-key" severity="secondary"  style="width:20px;height:20px;" />
        </div>   
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({

        password:{
            type:String,
            required:true
        }
    });
    const { password } = props;
    let status = ref(false);
</script>