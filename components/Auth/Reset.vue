<template>
      <div
        class="px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]"
        >
        <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]">
            <div class="text-4xl font-medium mb-12 text-primary-contrast">Password Reset</div>
            <InputText
                type="password"
                class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
                placeholder="Yeni Şifrenizi Giriniz..."
                v-model="model.newPassword"  
                @input="inputNewPassword($event)"              
            />
            <InputText
                type="password"
                class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
                placeholder="Yeni Şifrenizi Tekrar Giriniz..."
                v-model="model.repeatPassword"
                @input="inputRepeatNewPassword($event)"

            />
            <div v-show="repeat_password_disabled" style="color:red;">Şifrenizizi Tekrar Giriniz.</div>
            <div v-show="not_match_password_disabled" style="color:red;">Yeni Şifreler Uyuşmamakta.</div>
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
    const props = defineProps({
        mail:{
            type:String,
            required: true
        }
    });
    const { mail } = props;
    const toast = useToast();
    const router = useRouter();
    const model = ref({
        newPassword:'',
        repeatPassword:'',
        mail:mail
    });
    let repeat_password_disabled = ref(false);
    let not_match_password_disabled = ref(false);

    const reset = async ()=>{
        const { data:password } = await useFetch('/api/reset/password',{method:'POST',body:model.value});
        if(password?.value?.status){
            toast.add({ severity: 'success', summary: 'Reset Password', detail: password.value?.message, life: 3000 });
            router.push('/auth')
        }else{
            toast.add({ severity: 'error', summary: 'Reset Password', detail: password?.value?.message, life: 3000 });

        }
    };
    const inputRepeatNewPassword = async (event:any)=>{
        repeat_password_disabled.value = false;
        if(model.value.newPassword === model.value.repeatPassword){
            not_match_password_disabled.value = false;
        }else{
            not_match_password_disabled.value = true;
        }
    };
    const inputNewPassword = async (event:any)=>{
        repeat_password_disabled.value  = true;
    }
</script>