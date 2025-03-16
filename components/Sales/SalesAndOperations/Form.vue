<template>
 <div class="row m-auto mt-3">
            <div class="col-sm-6">
                <FloatLabel class="w-full md:w-56" variant="on">
                    <Select v-model="selectedSeller" inputId="seller" :options="users" optionLabel="KullaniciAdi" class="w-100" 
                        @change="sellerSelected($event)"
                    />
                    <label for="seller">Seller</label>
                </FloatLabel>
            </div>
            <div class="col-sm-6">
                <FloatLabel class="w-full md:w-56" variant="on">
                    <Select v-model="selectedOperation" inputId="operation" :options="users" optionLabel="KullaniciAdi" class="w-100" 
                        @change="operationSelected($event)"
                    />
                    <label for="operation">Operation</label>
                </FloatLabel>
            </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col-sm-12">
            <Button type="button" severity="warn" @click="updated" label="Change" class="w-100"/>

        </div>

    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        users:{
            type: Array,
            required: true
        },
        model:{
            type:Object,
            required:true
        }
    });
    const { users,model } = props;
    const emits = defineEmits(['sales_and_operations_updated_emit'])
    let selectedSeller = ref({});
    let selectedOperation = ref({});
    selectedSeller.value = users.find(x=>x.ID == model.SiparisSahibi);
    selectedOperation.value = users.find(x=>x.ID == model.Operasyon);
    const sellerSelected = (event:any)=>{
        model.SiparisSahibi = event.value.ID;
    };
    const operationSelected = (event:any)=>{
        model.Operasyon = event.value.ID;
    };
    const updated = ()=>{
        emits('sales_and_operations_updated_emit',model)
    };



</script>