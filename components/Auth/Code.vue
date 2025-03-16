<template>
        <div
     class="px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]"
 >
     <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]">
         <div class="text-4xl font-medium mb-12 text-primary-contrast">Onay Kodu</div>
         <InputText
             type="text"
             class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
             placeholder="Onay Kodunu Giriniz..."
             v-model="model.code"
         />
         <button
             type="button"
             class="max-w-40 w-full rounded-full appearance-none border-0 p-4 outline-0 text-xl mb-6 font-medium bg-white/30 hover:bg-white/40 active:bg-white/20 text-primary-contrast/80 cursor-pointer transition-colors duration-150"
             @click="send"
             >
             Send
         </button>
     </div>
     </div>
</template>
<script setup lang="ts">

    const props = defineProps({
        mail:{
            type:String,
            required:true
        }
    });
    const { mail } = props;
    const toast = useToast();
    const emits = defineEmits(['back_control_emit']);
    const now = new Date().getTime();
    const time = now + 120000;
    const token = Math.random().toString(36).substr(2);
    const model = ref({
        code:'',
    })
    const { data:tokenControl } = await useFetch(`/api/reset/token`,{ method:'POST',body:{'token':token,'mail':mail} });


    const send = ()=>{
        if(model.value.code === token){
            toast.add({ severity: 'success', summary: 'Reset Password', detail: 'Token doğru yönlendiriliyorsunuz...', life: 3000 });
            setTimeout(()=>{
                emits('back_control_emit',2);
            },2000);
            
        }
    };
</script>