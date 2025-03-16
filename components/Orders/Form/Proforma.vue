<template>
    <div class="row m-auto text-center">
        <div class="col-sm-4">
            <FloatLabel class="w-full md:w-56 mb-3" variant="on">
                <Select v-model="selectedShipment" inputId="shipments" :options="shipments" optionLabel="TeslimTur" class="w-100" 
                @change="shipmentSelected($event)"
                />
                <label for="shipments">Kind of Shipped</label>
            </FloatLabel>
            <FloatLabel class="w-full md:w-56 mb-3" variant="on">
                <Select v-model="selectedPaid" inputId="paid" :options="payments" optionLabel="OdemeTur" class="w-100" 
                @change="paidSelected($event)"
                />
                <label for="paid">Kind of Paid</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full mb-3">
                <DatePicker v-model="selectedMaturityDate" inputId="maturity" showIcon iconDisplay="input" @date-select="maturityDateSelect($event)" class="w-100"/>
                <label for="maturity">Maturity</label>
            </FloatLabel>
            <FloatLabel class="w-full mb-3" variant="on">
                <AutoComplete class="w-100" v-model="selectedCountry" inputId="countries" :suggestions="filteredCountries" optionLabel="UlkeAdi"  @complete="searchCountries($event)" 
                    @item-select="countrySelected($event)"
                />
                <label for="countries">Countries</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full mb-3">
                <InputText id="payments_detail" v-model="model.OdemeAciklama" autocomplete="off" class="w-100"/>
                <label for="payments_detail">Payment Detail</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full mb-3">
                <InputText id="container_detail" v-model="model.KonteynerAyrinti" autocomplete="off" class="w-100"/>
                <label for="container_detail">Container Detail</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full mb-3">
                <InputText id="document_cost" v-model="model.EvrakGideri" autocomplete="off" class="w-100"/>
                <label for="document_cost">Document Cost</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full mb-3">
                <InputText id="commision" v-model="model.Komisyon" autocomplete="off" class="w-100"/>
                <label for="commision">Commision</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full mb-3">
                <InputText id="refund" v-model="model.Iade" autocomplete="off" class="w-100"/>
                <label for="refund">Refund</label>
            </FloatLabel>
            <FloatLabel class="w-full md:w-56 mb-3" variant="on">
                <Select v-model="selectedInvoice" inputId="invoices" :options="invoices" optionLabel="FaturaAdi" class="w-100" 
                @change="invoiceSelected($event)"
                />
                <label for="invoices">Kind of Invoice</label>
            </FloatLabel>
            <Checkbox v-model="model.depo_yukleme" binary /> Atlanta SM
            <Checkbox v-model="model.MayaControl" binary /> Maya Payment




        </div>
        <div class="col-sm-8">
            <FloatLabel variant="on" class="w-full mb-3">
                <Textarea id="ayo_exp" v-model="model.UretimAciklama" rows="6" cols="30" style="resize: none;width:100%;" />
                <label for="ayo_exp">Ayo Exp.</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full mb-3">
                <Textarea id="shipped_exp" v-model="model.SevkiyatAciklama" rows="6" cols="30" style="resize: none;width:100%;" />
                <label for="shipped_exp">Shipped Exp.</label>
            </FloatLabel>
            <FloatLabel variant="on" class="w-full mb-3">
                <Textarea id="finance_exp" v-model="model.FinansAciklama" rows="7" cols="30" style="resize: none;width:100%;" />
                <label for="finance_exp">Finance Exp.</label>
            </FloatLabel>
            <Button type="button" severity="info" label="Upload Proforma"  />
        </div>
    </div>
    <div class="row m-auto text-center">
        <div class="col-sm-6">
            <Card>
                <template #title>Selling</template>
                <template #content>
                    <div class="row m-auto text-center mb-3">
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputNumber v-model="model.NavlunSatis" inputId="freight" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" />
                                <label for="freight">Freight</label>
                            </FloatLabel>

                        </div>
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputText id="description" v-model="model.NavlunFirma" autocomplete="off" />
                                <label for="description">Freight Desc.</label>
                            </FloatLabel>
                        </div>

                    </div>
                    <div class="row m-auto text-center mb-3">
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputNumber v-model="model.DetayTutar_1" inputId="detail_1" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" />
                                <label for="detail_1">Detail 1</label>
                            </FloatLabel>

                        </div>
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputText id="detail_1_desc" v-model="model.DetayAciklama_1" autocomplete="off" />
                                <label for="detail_1_desc">Detail 1 Desc.</label>
                            </FloatLabel>
                        </div>

                    </div>
                    <div class="row m-auto text-center mb-3">
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputNumber v-model="model.DetayTutar_2" inputId="detail_2" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" />
                                <label for="detail_2">Detail 2</label>
                            </FloatLabel>

                        </div>
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputText id="detail_2_desc" v-model="model.DetayAciklama_2" autocomplete="off" />
                                <label for="detail_2_desc">Detail 2 Desc.</label>
                            </FloatLabel>
                        </div>

                    </div>
                    <FloatLabel variant="on">
                        <InputNumber v-model="model.sigorta_tutar_satis" inputId="insurance" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" />
                        <label for="insurance">Insurance</label>
                    </FloatLabel>

                </template>
            </Card>
        </div>
        <div class="col-sm-6">
            <Card>
                <template #title>Buying</template>
                <template #content>
                    <div class="row m-auto text-center mb-3">
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputNumber v-model="model.NavlunAlis" inputId="freight" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" />
                                <label for="freight">Freight</label>
                            </FloatLabel>

                        </div>
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputText id="description" v-model="model.NavlunMekmarNot" autocomplete="off" />
                                <label for="description">Freight Desc.</label>
                            </FloatLabel>
                        </div>

                    </div>
                    <div class="row m-auto text-center mb-3">
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputNumber v-model="model.DetayAlis_1" inputId="detail_1" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" />
                                <label for="detail_1">Detail 1</label>
                            </FloatLabel>

                        </div>
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputText id="detail_1_desc" v-model="model.DetayMekmarNot_1" autocomplete="off" />
                                <label for="detail_1_desc">Detail 1 Desc.</label>
                            </FloatLabel>
                        </div>

                    </div>
                    <div class="row m-auto text-center mb-3">
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputNumber v-model="model.DetayAlis_2" inputId="detail_2" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" />
                                <label for="detail_2">Detail 2</label>
                            </FloatLabel>

                        </div>
                        <div class="col-sm-6">
                            <FloatLabel variant="on">
                                <InputText id="detail_2_desc" v-model="model.DetayMekmarNot_2" autocomplete="off" />
                                <label for="detail_2_desc">Detail 2 Desc.</label>
                            </FloatLabel>
                        </div>

                    </div>
                    <FloatLabel variant="on">
                        <InputNumber v-model="model.sigorta_Tutar" inputId="insurance" mode="currency" currency="USD" locale="en-US" variant="filled" class="w-100" />
                        <label for="insurance">Insurance</label>
                    </FloatLabel>

                </template>
            </Card>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useOrdersStore } from '~/store/orders';

    const props = defineProps({
        model:{
            type:Object,
            required:true
        },
        shipments:{
            type:Array,
            required:true
        },
        payments:{
            type:Array,
            required:true
        },
        invoices:{
            type:Array,
            required:true
        },
        country:{
            type:Array,
            required:true
        },

    });
    const { model,shipments,payments,invoices,country } = props;
    const { $dtsa }  = useNuxtApp();
    const ordersStore = useOrdersStore();
    
    let selectedShipment = ref(null);
    const shipmentSelected = (event:any)=>{
        model.TeslimTurID = event.value.ID;
        model.TeslimTur = event.value.TeslimTur;
    };
    let selectedPaid = ref(null);

    const paidSelected = (event:any)=>{
        model.OdemeTurID = event.value.ID;
        model.OdemeTur = event.value.OdemeTur;
        if(event.value.ID == 1 || event.value.ID == 2){
            model.SiparisDurumID = 1;
        }else{
            model.SiparisDurumID = 2;
        }
    };
    let selectedMaturityDate = ref(null);
    const maturityDateSelect = (event:any)=>{
        model.Vade = event;
    };

    let selectedCountry = ref(null);
    let filteredCountries = ref([]);
    const searchCountries = (event:any)=>{
        let result;
        if(event.query.length == 0){
            result = country;
        }else{
            result = country.filter(x=>{
                return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredCountries.value = result;
    };

    const countrySelected = (event:any)=>{
        model.UlkeId = event.value.Id;

        model.Ulke = event.value.UlkeAdi;
        model.UlkeAdi = event.value.UlkeAdi;
    };

    let selectedInvoice = ref(null);
    const invoiceSelected = (event:any)=>{
        model.FaturaKesimTurID = event.value.ID;
        model.FaturaAdi = event.value.FaturaAdi;
    };
    if(!ordersStore.getButtonSaveCheckDisabled){
        selectedShipment.value = shipments.find(x=>x.ID === model.TeslimTurID);
        selectedPaid.value = payments.find(x=>x.ID === model.OdemeTurID);
        selectedCountry.value = country.find(x=>x.Id === model.UlkeId);
        selectedInvoice.value = invoices.find(x=>x.ID === model.FaturaKesimTurID);
        selectedMaturityDate.value = $dtsa(model.Vade);
    }
</script>