<template>
    <div
     class="px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]"
 >
     <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]">
         <div class="text-4xl font-medium mb-12 text-primary-contrast">Password Reset</div>
         <InputText
             type="text"
             class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
             placeholder="Mail Adresinizi Giriniz...."
             v-model="mail"
         />
         <button
             type="button"
             class="max-w-40 w-full rounded-full appearance-none border-0 p-4 outline-0 text-xl mb-6 font-medium bg-white/30 hover:bg-white/40 active:bg-white/20 text-primary-contrast/80 cursor-pointer transition-colors duration-150"
             @click="reset"
             >
             RESET
         </button>
     </div>
     </div>
</template>
<script setup lang="ts">
 const toast = useToast();
 const mail = ref('');
 const emits = defineEmits(['back_control_emit','back_control_mail']);
 const reset = async()=>{
     const {data:password } = await useFetch('/api/reset/mail',{
         method:'POST',
         body:{'mail':mail}
     });
     if(password.value.status){
         toast.add({ severity: 'success', summary: 'Reset Password', detail: password?.value?.message, life: 3000 });
         setTimeout(() => {
            emits('back_control_emit',1);
            emits('back_control_mail',mail.value);
         }, 2000);  
     }else{
         toast.add({ severity: 'error', summary: 'Reset Password', detail: password?.value?.message, life: 3000 });
     }
 };


</script>