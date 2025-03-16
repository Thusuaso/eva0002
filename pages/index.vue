<template>
  <HomeList :month="homeList?.orderMonth" :year="homeList?.orderYear" :average="homeList?.orderAverage" :forecast="homeList?.orderForecast"
    monthHeader="Monthly Order (FOB)"
    yearHeader="Annual Order (FOB)"
    averageHeader="Monthly Average (FOB)"
    forecastHeader="Annual Forecast (FOB)"
  />

  <HomeList :month="homeList?.forwardingMonth" :year="homeList?.forwardingYear" :average="homeList?.forwardingAverage" :forecast="homeList?.forwardingForecast"
    monthHeader="Monthly Shipment (DDP)"
    yearHeader="Annual Shipment (DDP)"
    averageHeader="Shipment Average Monthly (DDP)"
    forecastHeader="Annual Shipment Forecast (DDP)"
  />
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-6">
      <HomeChartOne :chart="homeList?.chartShipped" header="Monthly Shipped Report"/>

    </div>
    <div class="col-span-6">
      <HomeChartTwo :chart="homeList?.chartCustomerShipped" header="Marketing Shipped Report"/>

    </div>

  </div>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-6">
      <HomeChartThree :chart="homeList?.chartProducts" header="Monthly Production Report"/>

    </div>
    <div class="col-span-6">
      <HomeChartOne :chart="homeList?.chartOffers" header="Monthly Offer Report"/>

    </div>

  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from '~/store/home';
definePageMeta({
  middleware: ["auth-control"]
  
});
const homeStore = useHomeStore();

const { data:home } = await useFetch('/api/home');
homeStore.setHomeList(home.value);
const homeList = homeStore.getHomeList;

</script>