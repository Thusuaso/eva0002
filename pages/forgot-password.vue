<template>
    <component :is="component" @back_control_emit="backControl($event)" @back_control_mail="backControlMail($event)"
        :mail="mail"
    ></component>

</template>
<script setup lang="ts">
    import Control from '~/components/Auth/Control';
    import Reset from '~/components/Auth/Reset';
    import Code from '~/components/Auth/Code';
    let component = ref(Control);
    let mail = ref('');
    const backControl = (event:any)=>{
        if(event == 1){
            component.value = Code;
        }else if (event == 2){
            component.value = Reset;
        }
        
    };
    const backControlMail = (event:any)=>{
        mail.value = event;
    };
</script>