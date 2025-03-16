import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const cookie = useCookie('goz_mekmar_auth_token');
    const userCookie = useCookie('goz_mekmar_auth_user');
    const mailCookie = useCookie('goz_mekmar_auth_mail');
    const authStore = useAuthStore();

    if(cookie.value == '' || cookie.value == null || cookie.value == undefined){
      return navigateTo('/auth');
    }else{

      const decoded = jwtDecode(cookie.value);
      const currentTime = Date.now() / 1000;
      if(decoded.exp < currentTime){
        cookie.value = null;
        userCookie.value = null;
        mailCookie.value = null;
        authStore.setResetUser();
        return navigateTo('/auth');

      }
    }
  })