<template>
  <div>
    <Toast />
    <SharedNavbar :items="items" v-if="tokenCookie"/>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>
<script setup lang="ts">
  const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        url:'/'
    },
    {
      label:'Orders',
      icon: 'pi pi-shopping-cart',
      items:[
        {
          label:'Production',
          url:'/orders/production'
        },
        {
          label:'Shipped',
          url:'/orders/shipped'
        },
        {
          label:'On Hold',
          url:'/orders/on-hold'
        }
      ]
    },
    {
      label:'Sales',
      icon: 'pi pi-chart-line',
      items:[
        {
          label:'Main To Do',
          url:'/sales/main-to-do'
        },
        {
          label:'To Do',
          url:'/sales/to-do'
        },
        {
          label:'Sales & Operations',
          url:'/sales/sales-and-operations'
        },
        {
          label:'Points to Consider',
          url:'/sales/points-to-consider'
        },
        {
          label:'Passwords',
          url:'/sales/passwords'
        },
        {
          label:'Important Links',
          url:'/sales/important-links'
        },

      ]
    },
    {
      label:'Selection',
      icon: 'pi pi-sort-alt',
      items:[
        {
          label:'Input',
          url:'/selection/input'
        },
        {
          label:'Crate Size',
          url:'/selection/crate-size'
        },
      ]
    },
    {
        label: 'Finance',
        icon: 'pi pi-home',
        url:'/finance'
    },
  ]);
  const tokenCookie = useCookie('goz_mekmar_auth_token');



</script>
