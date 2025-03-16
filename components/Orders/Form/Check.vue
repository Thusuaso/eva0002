<template>
    <div>
        <DataTable :value="list" tableStyle="min-width: 50rem">
            <Column field="Sira" header="#"></Column>
            <Column field="KasaNo" header="Crate"></Column>
            <Column field="TedarikciAdi" header="Supplier"></Column>
            <Column field="KategoriAdi" header="Category"></Column>
            <Column field="UrunAdi" header="Product">
                <template #footer>
                    {{ checkTotal.product }}
                </template>
            </Column>
            <Column field="YuzeyIslem" header="Surface"></Column>
            <Column field="En" header="w"></Column>
            <Column field="Boy" header="h"></Column>
            <Column field="Kenar" header="t"></Column>
            <Column field="BirimAdi" header="Unit"></Column>
            <Column field="KutuAdet" header="Box">
                <template #body="slotProps">
                    {{ $decimal(slotProps.data.KutuAdet) }}
                </template>
                <template #footer>
                    {{ $decimal(checkTotal.box) }}
                </template>
            </Column>
            <Column field="Adet" header="Piece">
                <template #body="slotProps">
                    {{ $decimal(slotProps.data.Adet) }}
                </template>
                <template #footer>
                    {{ $decimal(checkTotal.piece) }}
                </template>
            </Column>
            <Column field="Miktar" header="Amount">
                <template #body="slotProps">
                    {{ $decimal(slotProps.data.Miktar) }}
                </template>
                <template #footer>
                    {{ $decimal(checkTotal.amount) }}
                </template>
            </Column>
            <Column field="Ton" header="Ton">
                <template #body="slotProps">
                    {{ $decimal(slotProps.data.Ton) }}
                </template>
                <template #footer>
                    {{ $decimal(checkTotal.ton) }}
                </template>
            </Column>




        </DataTable>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        list:{
            type:Array,
            required:true
        }
    });
    const { list } = props;
    const { $decimal } = useNuxtApp();
    let checkTotal = {
        box:0,
        piece:0,
        amount:0,
        ton:0,
        product:0
    };
    checkTotal.product = list.length;
    list.forEach(x=>{
        checkTotal.box += x.KutuAdet;
        checkTotal.piece += x.Adet;
        checkTotal.amount += x.Miktar;
        checkTotal.ton += x.Ton;
    });
</script>