<template>
    <Menubar :model="items" >


    <template #end>
        <div class="flex items-center gap-2">
            <Button icon="pi pi-inbox" severity="warn" @click="toggle" :badge="todoStore.getTodos.length.toString()"  badgeSeverity="contrast"/>
        </div>
    </template>

    </Menubar>
    <Popover ref="op">
        <div class="flex flex-col gap-4">
            <Button class="w-100" label="Add" severity="success" variant="outlined" @click="addTodo" />
            <TodoList :list="todoStore.getTodos" @todo_select_emit="todoSelect($event)"
                @process_done_emit="todoDone($event)"
            />
        </div>
    </Popover>
    <Dialog v-model:visible="to_do_save_visible_dialog" modal>
        <TodoForm :model="modelStore.getTodoModel" :users="todoStore.getUsers" :status="todo_new_button_status"
            @process_update_emit="todoUpdate($event)"
            @process_save_emit="todoSave($event)"
            @process_deleted_emit="todoDelete($event)"
        />
    </Dialog>
</template>
<script setup lang="ts">
import { useTodoStore } from '~/store/todo';
import { useModelStore } from '~/store/model';
    const props = defineProps({
        items:{
            type: Array,
            required: true
        }
    });
    const { items } = props;
    const op = ref();
    const toggle = (event:any) =>{
        op.value.toggle(event);
    };
    const userCookie = useCookie('goz_mekmar_auth_user');
    const todoStore = useTodoStore();
    const modelStore = useModelStore();
    const toast = useToast();
    const { data:todo } = await useFetch(`/api/todo/list/${userCookie.value}`,{method:'GET'});
    todoStore.setTodos(todo?.value?.list);
    const { data:users } = await useFetch('/api/shared/users',{method:'GET'});
    todoStore.setUsers(users?.value?.list);
    let to_do_save_visible_dialog = ref(false);
    let todo_new_button_status = ref(false);

    const addTodo = ()=>{
        const todoModel = {
                ID:0,
                Yapilacak:'',
                Yapildi:0,
                GorevVerenID:'',
                GorevVerenAdi:'',
                GirisTarihi:'',
                YapildiTarihi:'',
                YapilacakOncelik:'',
                Acil:false,
                Sira:0,
                OrtakGorev:'',
                Goruldu:0
        };
        
        to_do_save_visible_dialog.value = true;
        modelStore.setTodoModel(todoModel);
        todo_new_button_status.value = true;
    };
    const todoSelect = (event:any)=>{
        to_do_save_visible_dialog.value = true;

        modelStore.setTodoModel(event);
        todo_new_button_status.value = false;

    };
    const todoUpdate = async (event:any)=>{
        const { data:todo } = await useFetch('/api/todo/process/update',{
            method:'PUT',
            body:event
        });
        if(todo.value.status){
            const { data:todoList } = await useFetch(`/api/todo/list/${userCookie.value}`,{ method:'GET' });
            todoStore.setTodos(todoList?.value?.list);
            toast.add({severity:'success',detail:todo.value.message,life:3000});
            to_do_save_visible_dialog.value = false;


        }else{
            toast.add({severity:'error',detail:todo.value.message,life:3000});
        };
    };
    const todoSave = async (event:any)=>{
        const { data:todo } = await useFetch('/api/todo/process/save',{
            method:'POST',
            body:event
        });
        if(todo?.value?.status){
            const { data:todoList } = await useFetch(`/api/todo/list/${userCookie.value}`,{ method:'GET' });
            todoStore.setTodos(todoList?.value?.list);
            toast.add({severity:'success',detail:todo?.value?.message,life:3000});
            to_do_save_visible_dialog.value = false;
            const date = new Date();
            const mailData = {
                to:'bilgiislem@mekmar.com',
                subject:'Yeni Görev Eklendi.',
                content:`
                                                
                            <div style='width:500px;height:auto;margin:0px auto;text-align:center;'>
                                                            <img width='120' height='120' src='https://cdn.mekmarimage.com/logo/gemini-goz.mekmar.com.png' />
                            <h1>goz.mekmar.com</h1>
                            
                            </div>
                            <div style='width:500px;height:auto;margin:0px auto;'>


                            <div><span style='font-weight:bold'>
                                                            <div><span style='font-weight:bold'>Tarih:</span> ${ date.getDate() } - ${ date.getMonth() } - ${ date.getFullYear() } / ${ date.getHours() } : ${date.getMinutes()} : ${date.getSeconds()} </div>
                                <div><span style='font-weight:bold'>Yapılacak:</span> ${ event.Yapilacak } </div>
                                <div><span style='font-weight:bold'>Ekleyen:</span> ${ event.GorevVerenAdi } </div>
                            </div>


        
    
                `
            };
            await useFetch('/api/send-mail',{method:'POST',body:mailData})
            



        }else{
            toast.add({severity:'error',detail:todo.value.message,life:3000});
        };

    };
    const todoDelete = async (event:any)=>{
        const {data:todo} = await useFetch(`/api/todo/process/deleted/${event}`,{
            method:'DELETE'
        });
        if(todo?.value?.status){
            const { data:todoList } = await useFetch(`/api/todo/list/${userCookie.value}`,{ method:'GET' });
            todoStore.setTodos(todoList?.value?.list);
            toast.add({severity:'success',detail:todo?.value?.message,life:3000});
            to_do_save_visible_dialog.value = false;
        }else{
            toast.add({severity:'error',detail:todo?.value?.message,life:3000});
        }
    };
    const todoDone = async (event:any)=>{
        const {data:todo} = await useFetch(`/api/todo/process/done`,{method:'PUT',body:event});
        if(todo?.value?.status){
            const { data:todoList } = await useFetch(`/api/todo/list/${userCookie.value}`,{ method:'GET' });
            todoStore.setTodos(todoList?.value?.list);
            toast.add({severity:'success',detail:todo?.value?.message,life:3000});
            to_do_save_visible_dialog.value = false;
        }else{
            toast.add({severity:'error',detail:todo?.value?.message,life:3000});
        }
    };


</script>