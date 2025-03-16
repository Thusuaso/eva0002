<template>
    <div class="mt-3">
        <FloatLabel variant="on">
            <Textarea id="assignment" v-model="model.Yapilacak" rows="5" cols="30" style="resize: none;width: 100%;" />
            <label for="assignment">Assignment</label>
        </FloatLabel>
        <div class="row  mt-3">
            <div class="col-sm-4">
                <FloatLabel variant="on" class="w-100">
                    <AutoComplete v-model="selectedAssign" inputId="assignee" :suggestions="filteredAssign" optionLabel="KullaniciAdi" @complete="searchAssign($event)" multiple 
                        class="w-100"
                    />
                    <label for="assignee">Assignee</label>
                </FloatLabel>
            </div>
            <div class="col-sm-4">
                <FloatLabel class="w-100" variant="on">
                    <Select v-model="selectedPriority" inputId="priorities" :options="priorities" optionLabel="priority" class="w-100" 
                        @change="prioritySelected($event)"
                    />
                    <label for="priorities">Priority</label>
                </FloatLabel>
            </div>
            <div class="col-sm-4">
                <div class="flex items-center gap-2 w-100" >
                    <Checkbox v-model="model.Acil" inputId="urgent" :binary="true" />
                    <label for="urgent"> Urgent </label>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div :class="status?'col-sm-12':'col-sm-6'">
                <Button type="button" :severity="status?'success':'warn'" :label="status?'Add':'Update'" @click="process" class="w-100"/>
            </div>
            <div class="col-sm-6" v-show="!status">
                <Button type="button" severity="danger" label="Delete" class="w-100" @click="deleted"/>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        model:{
            type:Object,
            required:true
        },
        users:{
            type:Array,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        }
    });
    const { model,users,status } = props;
    const { $scc,$dtsa } = useNuxtApp();
    const emits = defineEmits(['process_save_emit','process_update_emit']);
    const userIdCookie = useCookie('goz_mekmar_auth_user_id');
    const usernameCookie = useCookie('goz_mekmar_auth_user');
    const mailCookie = useCookie('goz_mekmar_auth_mail');

    const selectedAssign = ref([]);
    let filteredAssign = ref([]);
    const searchAssign = (event:any)=>{
        let result;
        if(event.query.length == 0){
            result = users;
        }else{
            result = users.filter(x=>{
                return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
            });
        };
        filteredAssign.value = result;
    };

    const selectedPriority = ref({});
    const priorities = ref([
        {'Id':1,'priority':'A'},
        {'Id':2,'priority':'B'},
        {'Id':3,'priority':'C'},

    ]);

    const process = ()=>{
        model.OrtakGorev = "";
        if (selectedAssign.value.length == 1) {
            model.OrtakGorev += selectedAssign.value[0].KullaniciAdi;
        } else if (selectedAssign.value.length == 2) {
            model.OrtakGorev +=
            selectedAssign.value[0].KullaniciAdi + "," + selectedAssign.value[1].KullaniciAdi;
        } else if (selectedAssign.value.length == 3) {
            model.OrtakGorev +=
            selectedAssign.value[0].KullaniciAdi +
            "," +
            selectedAssign.value[1].KullaniciAdi +
            "," +
            selectedAssign.value[2].KullaniciAdi;
        } else if (selectedAssign.value.length == 4) {
            model.OrtakGorev +=
            selectedAssign.value[0].KullaniciAdi +
            "," +
            selectedAssign.value[1].KullaniciAdi +
            "," +
            selectedAssign.value[2].KullaniciAdi +
            "," +
            selectedAssign.value[3].KullaniciAdi;
        }
        model.Yapilacak = $scc(model.Yapilacak);
        model.GorevVerenID = userIdCookie.value;
        model.GorevVerenAdi = usernameCookie.value;
 
        if(status){
            model.GirisTarihi = $dtsa(new Date());
            save(model);
        }else{
            update(model);
        };
    };
    const save = (model:any)=>{
        emits('process_save_emit',model);
    };
    const update = (model:any)=>{
        emits('process_update_emit',model);

    };
    const deleted = () =>{
        emits('process_deleted_emit',model.ID);
    };
    const prioritySelected = (event:any)=>{
        model.YapilacakOncelik = event.value.priority;
    }; 
    if(!status){
        selectedPriority.value = priorities.value.find(
        (x) => x.priority == model.YapilacakOncelik
      );
      const assign = model.OrtakGorev.split(",");
      assign.forEach((x: any) => {
        let user = users.find((y) => y.KullaniciAdi == x);
        selectedAssign.value.push(user);
      });
    };

</script>