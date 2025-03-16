<template>
    <div>
        <AuthForm :model="model" @auth_login_emit="login($event)"/>
    </div>
</template>
<script setup lang="ts">
    import { useAuthStore } from '~/store/auth';
    import { useTodoStore } from '~/store/todo';
    const toast = useToast();
    const tokenCookie = useCookie('goz_mekmar_auth_token');
    const userCookie = useCookie('goz_mekmar_auth_user');
    const mailCookie = useCookie('goz_mekmar_auth_mail');
    const userId = useCookie('goz_mekmar_auth_user_id');
    const router = useRouter();
    const store = useAuthStore();
    const model = ref({
        'username':'',
        'password':''
    });
    const todoStore = useTodoStore();
    const login = async(event:any)=>{
        const {data:auth} = await useFetch('/api/auth',{
            method:'POST',
            body:event
        });
        if(auth?.value?.status){
            toast.add({ severity: 'success', summary: 'Login', detail: auth?.value?.message, life: 3000 });
            tokenCookie.value = auth.value.token;
            userCookie.value = auth.value.user.KullaniciAdi;
            mailCookie.value = auth.value.user.MailAdres;
            userId.value = auth.value.user.ID;
            const {data:todo} = await useFetch(`/api/todo/list/${auth.value.user.KullaniciAdi}`,{method:'GET'});
            todoStore.setTodos(todo.value.list);
            store.setUser({...auth.value.user,'Token':auth.value.token});
            router.push('/');

        }else{
            toast.add({ severity: 'error', summary: 'Login', detail: auth?.value?.message, life: 3000 });
        }
    };

</script>