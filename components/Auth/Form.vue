<template>
    <!-- <div
        class="px-6 py-20 md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]"
    >
        <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-[rgba(255,255,255,0.1)]">
            <div class="text-4xl font-medium mb-12 text-primary-contrast">Welcome</div>
            <InputText
                type="text"
                class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !block !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
                placeholder="Username"
                v-model="model.username"
            />
            <InputText
                type="password"
                class="!appearance-none placeholder:!text-primary-contrast/40 !border-0 !p-4 !w-full !outline-0 !text-xl !mb-6 !bg-white/10 !text-primary-contrast/70 !rounded-full"
                placeholder="Password"
                v-model="model.password"
            />
            <button
                type="button"
                class="max-w-40 w-full rounded-full appearance-none border-0 p-4 outline-0 text-xl mb-6 font-medium bg-white/30 hover:bg-white/40 active:bg-white/20 text-primary-contrast/80 cursor-pointer transition-colors duration-150"
                @click="login"
                >
                Sign In
            </button>
            <a class="cursor-pointer font-medium block text-center text-primary-contrast" @click="$router.push('/forgot-password')">Forgot Password?</a>
        </div>
    </div> -->

    <div class="w-25 flex flex-col px-8 py-8 gap-6 rounded-2xl m-auto" style="background-image: radial-gradient(circle at left top, var(--p-primary-700), var(--p-primary-600));">
            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
                <path
                    d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                    fill="var(--p-primary-700)"
                />
                <path
                    d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                    fill="var(--p-primary-200)"
                />
            </svg>
            <div class="inline-flex flex-col gap-2 m-auto">
                <label for="username" class="text-primary-50 font-semibold">Username</label>
                <InputText id="username" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" v-model="model.username"></InputText>
            </div>
            <div class="inline-flex flex-col gap-2 m-auto">
                <label for="password" class="text-primary-50 font-semibold">Password</label>
                <InputText id="password" class="!bg-white/20 !border-0 !p-4 !text-primary-50 w-80" type="password" v-model="model.password"></InputText>
            </div>
            <div class="flex items-center gap-4">
                <Button label="Forgot Password" @click="$router.push('/forgot-password')" text class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"></Button>
                <Button label="Sign-In" @click="login" text class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10"></Button>
            </div>
        </div>

</template>
<script setup lang="ts">
    const props = defineProps({
        model:{
            type:Object,
            required:true
        }
    });
    const { model } = props;
    const emits = defineEmits(['auth_login_emit'])
    const login = async ()=>{
        emits('auth_login_emit',model);

    }
</script>
