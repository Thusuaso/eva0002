<template>
    <CardList :list="cardList"/>
</template>
<script setup lang="ts">
    const { data:card } = await useFetch('/api/operation/card/list',{method:'GET'});
    const cardList = card?.value?.list;
</script>