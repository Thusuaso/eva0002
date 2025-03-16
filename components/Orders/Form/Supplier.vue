<template>
    <div>
        <div class="row m-auto text-center mb-3">
            <div class="col-sm-3">
                <FloatLabel class="w-full md:w-56" variant="on">
                    <Select v-model="selectedSupplier" inputId="suppliers" :options="supplier" optionLabel="FirmaAdi" class="w-full" 
                        @change="supplierSelected($event)"
                    />
                    <label for="suppliers">Suppliers</label>
                </FloatLabel>
            </div>
            <div class="col-sm-3">
                <FloatLabel class="w-full md:w-56" variant="on">
                    <Select v-model="selectedInvoice" inputId="invoices" :options="invoices" optionLabel="FaturaAdi" class="w-full" />
                    <label for="invoices">Kind of Invoice</label>
                </FloatLabel>
            </div>
            <div class="col-sm-3">
                <FloatLabel class="w-full md:w-56" variant="on">
                    <Select v-model="selectedDelivery" inputId="deliveries" :options="deliveries" optionLabel="Gonderim" class="w-full" />
                    <label for="deliveries">Kind of Delivery</label>
                </FloatLabel>
            </div>
            <div class="col-sm-3">
                <FloatLabel variant="on">
                    <DatePicker v-model="selectedDate" inputId="date" showIcon iconDisplay="input" dateFormat="yy/mm/dd"/>
                    <label for="date">Date</label>
                </FloatLabel>
            </div>
        </div>
        <div class="row m-auto text-center mb-3">
            <div class="col-sm-6">
                <FloatLabel variant="on">
                    <Textarea id="m4" v-model="m4" rows="5" cols="30" class="w-100"/>
                    <label for="m4">M4</label>
                </FloatLabel>
            </div>
            <div class="col-sm-6">
                <FloatLabel variant="on">
                    <Textarea id="m5" v-model="m5" rows="5" cols="30" class="w-100"/>
                    <label for="m5">M5</label>
                </FloatLabel>
            </div>
        </div>
        <div class="row m-auto text-center mb-3">
            <div class="col">                
                <DataTable :value="productList" tableStyle="min-width: 50rem">
                    <Column field="KategoriAdi" header="Category"></Column>
                    <Column field="UrunAdi" header="Product"></Column>
                    <Column field="YuzeyIslemAdi" header="Surface"></Column>
                    <Column field="En" header="W"></Column>
                    <Column field="Boy" header="B"></Column>
                    <Column field="Kenar" header="K"></Column>
                    <Column field="UrunBirimAdi" header="Unit"></Column>
                    <Column field="Miktar" header="Amount">
                        <template #body="slotProps">
                            {{ $decimal(slotProps.data.Miktar) }}
                        </template>
                        <template #footer>
                            {{ $decimal(productListTotal.amount) }}
                        </template>
                    </Column>
                    <Column field="AlisFiyati" header="Buying Price">
                        <template #body="slotProps">
                            {{ $usd(slotProps.data.AlisFiyati) }}
                        </template>
                    </Column>
                    <Column  header="Total">
                        <template #body="slotProps">
                            {{ $usd(slotProps.data.Miktar * slotProps.data.AlisFiyati) }}
                        </template>
                        <template #footer>
                            {{ $usd(productListTotal.total) }}
                        </template>
                    </Column>





                </DataTable>
            </div>
        </div>
        <div class="row m-auto text-center">
            <div class="col-sm-6">
                <Button class="w-100" type="button" severity="danger" label="Pdf" icon="pi pi-file-pdf" :loading="make_pdf_button_loading" @click="makePdf" />
            </div>
        </div>



    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        supplier:{
            type:Array,
            required:true
        },
        invoices:{
            type:Array,
            required:true
        },
        model:{
            type:Object,
            required:true
        }
    });
    const { supplier,invoices,model } = props;
    const {$usd,$decimal,$pdfMake,$dtsa } = useNuxtApp();
    const selectedSupplier = ref({});
    const selectedInvoice = ref({});
    const selectedDelivery = ref({});
    const deliveries = ref([{'ID':1,'Gonderim':'Fabrika'},{'ID':2,'Gonderim':'Liman'}]);
    const selectedDate = ref('');
    const m4 = ref('');
    const m5 = ref('');
    let productList = ref([]);
    let productListTotal = ref({
        amount:0,
        total:0
    })
    const supplierSelected = async (event:any)=>{
        productListTotal.value.amount = 0;
        productListTotal.value.total = 0;
        const { data:product } = await useFetch(`/api/orders/detail/supplier/product/${model.SiparisNo}/${event.value.TedarikciID}`,{method:'GET'});
        productList.value = product?.value?.list.length >0 ? product?.value?.list:[];
        if(product?.value?.list.length >0){
            product?.value?.list.forEach(x=>{
                productListTotal.value.amount += x.Miktar;
                productListTotal.value.total += (x.Miktar * x.AlisFiyati);
            });
        }

    };
    let make_pdf_button_loading = ref(false);
    const makePdf = async ()=>{
        let body = [
            [       {
                        text:"Ürün Adı",
                        fontSize:10,
                        alignment:"center",
                        fillColor:"#b0e0e6"
                    },
                    {
                        text:"Yüzey İşlemi",
                        fontSize:10,
                        alignment:"center",
                        fillColor:"#b0e0e6"
                    },
                    {
                        text:'Ebat',
                        fontSize:10,
                        alignment:"center",
                        fillColor:"#b0e0e6"
                    },
                    {
                        text:'Miktar',
                        fontSize:10,
                        alignment:"center",
                        fillColor:"#b0e0e6"
                    },
                    {
                        text:"Birim",
                        fontSize:10,
                        alignment:"center",
                        fillColor:"#b0e0e6"
                    },
                    {
                        text:"Birim Fiyat",
                        fontSize:10,
                        alignment:"center",
                        fillColor:"#b0e0e6"
                    },
                    {
                        text:'Toplam',
                        fontSize:10,
                        alignment:"center",
                        fillColor:"#b0e0e6"
                    }
            ]

        ];
        productList.value.forEach(x=>{
            body.push([{'text':x.UretimAciklama,'fontSize':8},{'text':x.YuzeyIslemAdi,'fontSize':8},{'text':(x.En + 'x' + x.Boy + 'x' + x.Kenar),'fontSize':8},{'text':$usd(x.Miktar),'fontSize':8},{'text':x.UrunBirimAdi,'fontSize':8},{'text':$usd(x.AlisFiyati),'fontSize':8},{'text':$usd(x.AlisFiyati * x.Miktar),'fontSize':8}])
        });
        
        make_pdf_button_loading.value = true;
        const img = await getBase64ImageFromURL(
            "https://cdn.mekmarimage.com/logo/Mekmar-Logo-b%C3%BCy%C3%BCk-yaz%C4%B1l%C4%B1-01.webp"
            );
        
            $pdfMake
      .createPdf({
        content: [
        {
            style: "tableExample",
            table: {
              body: [

                [
                    {
                        image: img as any,
                        width: 350,
                        height:90
                    },

                    {
                        text: `
                            MEKMAR DIŞ TICARET LTD.ŞTI.
                        Ataturk Bulvari 173 Sk. No:2
                        SARAYLAR V.D 617 023 9568
                        Tel: +90 (258 274 64 11)
                        `,
                        alignment: "left",
                        fontSize:11,
                    },

                ],
                [
                    {
                        text: "SİPARİŞ FORMU",
                        alignment: "center"
                    },
                    ""
                ]
              ],
            },

          }, 
          {
            text:'Kasa üzerine yazılacak: '+ model.SiparisNo ,
            fontSize:10,
            marginTop:10
          },
          {
            text:'Sipariş Tarihi: ' + $dtsa(model.SiparisTarihi),
            fontSize:10
          },
          {
            text:'Firma: ' + selectedSupplier.value.FirmaAdi,
            fontSize:10
          },
          {
            text:'Teslimat Yeri: ' + selectedDelivery.value.Gonderim,
            fontSize:10 
          },
          {
            text:'Teslimat Tarihi: ' + $dtsa(selectedDate.value),
            fontSize:10
          },
          {
            text:'Kime: ' + selectedInvoice.value.FaturaAdi,
            fontSize:10
          },
          {
            style: "tableExample",
            table: {
              body: body
            },
          },
          {
            text:'Denizli ' + selectedDelivery.value.Gonderim + ':' + $usd(productListTotal.value.total),
            fontSize:10,
            marginTop:10,
            marginBottom:50
          },
          {
            text:'SAYIN İLGİLİ ; Sipariş onaylayınız ve teslim tarihini bildiriniz . ',
            fontSize:10
          },
          {
            text:'Şartlar: ',
            fontSize:10
          },
          {
            text:'1.Malzeme aynen yukarıda gibi tüm detaylara uygun olarak hazırlanmalıdır. ',
            fontSize:10
          },
          {
            text:'2.Kasalar ısıl işlemli ve bağlı olacak . ',
            fontSize:10
          },
          {
            text:'3. ' + m4.value,
            fontSize:10,
            color:'red'
          },
          {
            text:'4. ' + m5.value,
            fontSize:10,
            color:'red'
          },
          {
            text:'5.Belirtilen şartlara uymayan malzemelerin tüm sorumluluğu üreticiye aittir',
            fontSize:10
          },
          {
            text:`
                "SAYGILARIMIZLA ; Sipariş durumu yukarıda belirtilen şahıs ya da firma adına düzenlenmiştir ve onun tarafından kullanıbilir . Herhangi bir sorunuz olması durumunda yukarıda verilen numaralardan bize ulaşabilirsiniz."
            `,
            style:"header",
            fontSize:10
          }
        ],

      })
      .download("ISF - " + selectedSupplier.value.FirmaAdi);


        make_pdf_button_loading.value = false;

    };
    const getBase64ImageFromURL = (url: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/jpeg");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  };



</script>