<template>
    <div>
        
        <DataTable v-model:value="store.getFinanceList" 
                sortField="TotalBalanceShipped"
                :sortOrder="-1"
                scrollHeight="600px"
                class="p-datatable-sm"
                v-model:filters="filters"
                filterDisplay="row"
                @filter=filteredFinance($event)

                
        >
            <Column field="Customer" header="Customer" :footerStyle="'font-weight:bold'" :showClearButton="false" :showFilterMenu="false" :showFilterOperator="false">
                <template #footer>
                    TOTAL
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
                </template>
            </Column>
            <Column field="TotalOrder" header="Total Order" :footerStyle="'font-weight:bold'">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.TotalOrder) }}
                </template>
                <template #footer>
                    {{ $usd(store.getFinanceTotalList.order) }}
                </template>
            </Column>
            <Column field="TotalProduction" header="On Production" :footerStyle="'font-weight:bold'">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.TotalProduction) }}
                </template>
                <template #footer>
                    {{ $usd(store.getFinanceTotalList.production) }}
                </template>
            </Column>
            <Column field="TotalShipped" header="Shipped" :footerStyle="'font-weight:bold'">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.TotalShipped) }}
                </template>
                <template #footer>
                    {{ $usd(store.getFinanceTotalList.shipped) }}
                </template>
            </Column>
            <Column field="TotalPrepayment" header="Pre Payment" :footerStyle="'font-weight:bold'">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.TotalPrepayment) }}
                </template>
                <template #footer>
                    {{ $usd(store.getFinanceTotalList.prepayment) }}
                </template>
            </Column>
            <Column field="TotalPaid" header="Paid" :footerStyle="'font-weight:bold'">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.TotalPaid) }}
                </template>
                <template #footer>
                    {{ $usd(store.getFinanceTotalList.paid) }}
                </template>
            </Column>
            <Column field="TotalBalanceProduction" header="Balance (Including Production)" :footerStyle="'font-weight:bold'">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.TotalBalanceProduction) }}
                </template>
                <template #footer>
                    {{ $usd(store.getFinanceTotalList.balanceIncProduction) }}
                </template>
            </Column>
            <Column field="TotalBalanceShipped" header="Balance (Except Production)" :footerStyle="'font-weight:bold'">
                <template #body="slotProps">
                    {{ $usd(slotProps.data.TotalBalanceShipped) }}
                </template>
                <template #footer>
                    {{ $usd(store.getFinanceTotalList.balance) }}
                </template>
            </Column>

        </DataTable>

    </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { useFinanceStore } from '~/store/finance'; 
    const filters = ref({
        Customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

    });
    const store = useFinanceStore();
    const { $usd } = useNuxtApp();
    const { data:finance } = await useFetch('/api/finance/list');
    await store.setFinanceList(finance?.value?.list?.filter(x=>(x.TotalBalanceShipped > 10 || x.TotalBalanceShipped < -10)));
        let listTotal = {
                order:0,
                production:0,
                shipped:0,
                prepayment:0,
                paid:0,
                balanceIncProduction:0,
                balance:0
        };
        await finance?.value?.list?.filter(x=>(x.TotalBalanceShipped > 10 || x.TotalBalanceShipped < -10)).forEach(x=>{
            listTotal.order += +x.TotalOrder;
            listTotal.production += +x.TotalProduction;
            listTotal.shipped += +x.TotalShipped;
            listTotal.prepayment += +x.TotalPrepayment;
            listTotal.paid += +x.TotalPaid;
            listTotal.balanceIncProduction += +x.TotalBalanceProduction;
            listTotal.balance += +x.TotalBalanceShipped;
        });
        store.setFinanceTotalList(listTotal);

    const filteredFinance = (event:any)=>{
            let order = 0;
            let production = 0;
            let shipped = 0;
            let prepayment = 0;
            let paid = 0;
            let balanceIncProduction = 0;
            let balance = 0;
            event.filteredValue.forEach(x=>{
                order += +x.TotalOrder;
                production += +x.TotalProduction;
                shipped += +x.TotalShipped;
                prepayment += +x.TotalPrepayment;
                paid += +x.TotalPaid;
                balanceIncProduction += +x.TotalBalanceProduction;
                balance += +x.TotalBalanceShipped;
            });
            store.setFinanceTotalList({'order':order,'production':production,'shipped':shipped,'prepayment':prepayment,'paid':paid,'balanceIncProduction':balanceIncProduction,'balance':balance});
    };


</script>