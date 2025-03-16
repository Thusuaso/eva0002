<template>
     <div class="bg-surface-50 dark:bg-surface-950 p-10">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
            <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">{{header}}</div>
            <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">
                <Chart type="doughnut" :data="chart" :options="setChartOptions" style="height:550px;width: 100%;" />
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
    const props = defineProps({
        chart:{
            type:Object,
            required:true
        },
        header:{
            type:String,
            required:true
        }
    });
    const {chart,header} = props;
    const setChartOptions = () => {


    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: 'blue'
                }
            }
        }
    };
};
</script>