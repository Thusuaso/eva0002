<template>
    <div>
        <div class="row m-auto text-center mt-2">
            <div class="col-sm-3">
                <table class="table w-100">
        <thead>
          <tr>
            <th scope="col">Producer</th>
            <th scope="col">Month (SQM)</th>
            <th scope="col">Month (PCS)</th>
            <th scope="col">Month (MT)</th>

            <th scope="col">Year (SQM)</th>
            <th scope="col">Year (PCS)</th>
            <th scope="col">Year (MT)</th>

            
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Mekmer</th>
            <td>{{ $decimal(tableList.list.mekmerMonthSqm ) }}</td>
            <td>{{ $decimal(tableList.list.mekmerMonthPcs ) }}</td>
            <td>{{ $decimal(tableList.list.mekmerMonthMt ) }}</td>

            <td>{{ $decimal(tableList.list.mekmerYearSqm)  }}</td>
            <td>{{ $decimal(tableList.list.mekmerYearPcs)  }}</td>
            <td>{{ $decimal(tableList.list.mekmerYearMt ) }}</td>


          </tr>
          <tr>
            <th>Mekmoz</th>
            <td>{{ $decimal(tableList.list.mekmozMonthSqm)  }}</td>
            <td>{{ $decimal(tableList.list.mekmozMonthPcs)  }}</td>
            <td>{{ $decimal(tableList.list.mekmozMonthMt)  }}</td>

            <td>{{ $decimal(tableList.list.mekmozYearSqm)  }}</td>
            <td>{{ $decimal(tableList.list.mekmozYearPcs)  }}</td>
            <td>{{ $decimal(tableList.list.mekmozYearMt ) }}</td>


          </tr>
          <tr>
            <th>External Crates</th>
            <td>{{ $decimal(tableList.list.disMonthSqm)  }}</td>
            <td>{{ $decimal(tableList.list.disMonthPcs)  }}</td>
            <td>{{ $decimal(tableList.list.disMonthMt)  }}</td>
            <td>{{ $decimal(tableList.list.disYearSqm) }}</td>
            <td>{{ $decimal(tableList.list.disYearPcs)  }}</td>
            <td>{{ $decimal(tableList.list.disYearMt)  }}</td>
          </tr>
          <tr>
            <th>Total</th>

            <td>
              <b>{{ $decimal(tableList.list.monthTotalSqm)  }}</b>
            </td>
            <td>
              <b>{{ $decimal(tableList.list.monthTotalPcs)  }}</b>
            </td>
            <td>
              <b>{{ $decimal(tableList.list.monthTotalMt)  }}</b>
            </td>
            <td>
              <b>{{ $decimal(tableList.list.yearTotalSqm)  }}</b>
            </td>
            <td>
              <b>{{ $decimal(tableList.list.yearTotalPcs)  }}</b>
            </td>
            <td>
              <b>{{ $decimal(tableList.list.yearTotalMt) }}</b>
            </td>

          </tr>
        </tbody>
      </table>

            </div>
            <div class="col-sm-3">
              <Button severity="success" label="New" @click="newForm"/>

            </div>
            <div class="col-sm-3">
              <Button severity="primary" label="Mekmer" class="mb-1 w-100" @click="mekmerListSelected" :loading="is_change_list"/>
              <Button severity="info" label="External Crates" class="mb-1 w-100" @click="externalListSelected" :loading="is_change_list"/>
              <Button severity="warn" label="Etx. Crates in Mekmer" class="mb-1 w-100" @click="externalListinMekmerSelected" :loading="is_change_list"/>
              <Button severity="danger" label="Not Found" class="mb-1 w-100" @click="notFoundListSelected" :loading="is_change_list"/>


            </div>
            <div class="col-sm-3">
              <Button severity="secondary" label="Selection Orders" @click="ordersSelection"/>

            </div>

        </div>
        <SelectionInputList @selected_selection_emit="selectionSelected($event)"/>

        <Dialog v-model:visible="selection_form_dialog" :header="selection_form_header" modal>
          <SelectionInputForm :status="selection_input_status" @close_dialog_form="closeDialogForm" @update_selection_list="updateSelectionList"/>

        </Dialog>



    </div>
</template>
<script setup lang="ts">
import {useSelectionStore} from "~/store/selection";
import {useCardsList} from "~/store/cards";
    const store = useSelectionStore();
    const cardStore = useCardsList();
    const toast = useToast();
    const {$decimal} = useNuxtApp();
    store.setSelectionTableLoading(true);
    let tableList = ref();
    const { data:table } = await useFetch('/api/selection/input/list/table');
    const { data:mekmerListMain } = await useFetch('/api/selection/input/list/mekmer');
    const { data:poList } = await useFetch('/api/selection/shared/po');
    const {data:supplierList} = await useFetch('/api/selection/shared/supplier');
    const {data:quarryList} = await useFetch('/api/selection/shared/quarries');
    const { data:cardList } = await useFetch('/api/operation/card/list');
    tableList = table;

    store.setList(mekmerListMain?.value?.list?.length >0? mekmerListMain?.value?.list: []);
    store.setSelectionPoList(poList?.value?.list);
    store.setSelectionTotalList(mekmerListMain?.value?.total);
    store.setSupplierList(supplierList?.value?.list);
    store.setQuarryList(quarryList?.value?.list)
    store.setSelectionTableLoading(false);
    cardStore.setCardList(cardList?.value?.list);

    let is_change_list = ref(false);
    let selection_form_dialog = ref(false);
    let selection_form_header = ref("New Selection");
    let selection_input_status = ref(false);
    const newForm = ()=>{
      selection_input_status.value = true;
      selection_form_header.value = "New Selection";

      const inputModel = {
                ID:0,
                Tarih:'',
                KasaNo:'',
                UrunKartID:0,
                TedarikciID:0,
                UrunBirimID:0,
                UrunOcakID:0,
                Adet:0,
                KutuAdet:0,
                Miktar:0,
                OzelMiktar:0,
                Aciklama:'',
                UretimTurID:0,
                UrunDurumID:0,
                SiparisAciklama:'',
                Kutu:false,
                Duzenleyen:'Muhsin',
                Kasalayan:'Emre',
                Disarda:false,
                KutuIciAdet:0,
                Bagli:false,
                SqmMiktar:0,
                Bulunamadi:false,
                Fason:false,
                Total:0,
                KasaAdet:1
            };
      store.setInputModel(inputModel);
      selection_form_dialog.value = true;
    };
    const ordersSelection = ()=>{
      selection_input_status.value = false;
    };
    const mekmerListSelected = async ()=>{
      is_change_list.value = true;
      store.setSelectionTableLoading(true);
      const { data:mekmerList } = await useFetch('/api/selection/input/list/mekmer');
      store.setList(mekmerList?.value?.list?.length >0? mekmerList?.value?.list: []);
      store.setSelectionTotalList(mekmerList?.value?.total);

      is_change_list.value = false;
      store.setSelectionTableLoading(false);

    };  
    const externalListSelected = async ()=>{
      store.setSelectionTableLoading(true);

      is_change_list.value = true;

      const { data:outList } = await useFetch('/api/selection/input/list/out');
      store.setList(outList?.value?.list?.length >0? outList?.value?.list: []);
      store.setSelectionTotalList(outList?.value?.total);

      is_change_list.value = false;
      store.setSelectionTableLoading(false);


    };
    const externalListinMekmerSelected = async()=>{
      store.setSelectionTableLoading(true);

      is_change_list.value = true;

      const { data:outInMekmerList } = await useFetch('/api/selection/input/list/out-in-mekmer');
      store.setList(outInMekmerList?.value?.list?.length >0? outInMekmerList?.value?.list: []);
      store.setSelectionTotalList(outInMekmerList?.value?.total);

      is_change_list.value = false;
      store.setSelectionTableLoading(false);
    };
    const notFoundListSelected = async()=>{
      store.setSelectionTableLoading(true);

      is_change_list.value = true;

      const { data:notFoundList } = await useFetch('/api/selection/input/list/not-found');
      store.setList(notFoundList?.value?.list?.length >0? notFoundList?.value?.list: []);
      store.setSelectionTotalList(notFoundList?.value?.total);

      is_change_list.value = false;
      store.setSelectionTableLoading(false);
    };
    const selectionSelected = async(event:any)=>{
      const { data:products } = await useFetch('/api/selection/shared/product',{method:'POST',body:{'po':event.SiparisAciklama}});
      store.setSelectionPoProductList(products?.value?.list);
      await store.setInputModel(event);
      selection_form_header.value = event.KasaNo;
      selection_input_status.value = false;
      selection_form_dialog.value = true;
    };
    const closeDialogForm = ()=>{
      selection_form_dialog.value = false;
    };
    const updateSelectionList = async ()=>{
      const { data:tableUpdate } = await useFetch('/api/selection/input/list/table');
      tableList = tableUpdate;

      const { data:mekmerListMain } = await useFetch('/api/selection/input/list/mekmer');
      store.setList(mekmerListMain?.value?.list?.length >0? mekmerListMain?.value?.list: []);
      store.setSelectionTotalList(mekmerListMain?.value?.total);

    };

</script>