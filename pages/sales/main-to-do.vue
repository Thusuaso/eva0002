<template>
    <div>
        <SalesMainTodoList :list="todoList"
            @todo_selected_emit="todoSelected($event)"
        />
        <Dialog v-model:visible="todo_visible_dialog" modal header="Update To Do">
            <TodoForm :model="modelStore.getTodoModel" :users="todoStore.getUsers" :status="todo_new_button_status"
            @process_update_emit="todoUpdate($event)"
            @process_deleted_emit="todoDelete($event)"
        />

        </Dialog>

    </div>
</template>
<script setup lang="ts">
    import { useModelStore } from '~/store/model';
    import { useTodoStore } from '~/store/todo';

    const modelStore = useModelStore();
    const todoStore = useTodoStore();
    const toast = useToast();
    const { data:todo } = await useFetch(`/api/sales/main-todo/gizem`,{method:'GET'});
    let todoList = todo?.value?.list.length >0 ? todo?.value?.list:[];
    let todo_visible_dialog = ref(false);
    let todo_new_button_status = ref(false);
    const todoSelected = async (event:any)=>{
        todo_visible_dialog.value = true;
        todo_new_button_status.value = false;

        modelStore.setTodoModel(event);
        const { data:users } = await useFetch('/api/shared/users',{method:'GET'});
        todoStore.setUsers(users?.value?.list);
    };
    const todoUpdate = async (event:any)=>{
        const { data:update } = await useFetch('/api/todo/process/update',{
            method:'PUT',
            body:event
        });
        if(update?.value?.status){
            const { data:todo } = await useFetch(`/api/sales/main-todo/gizem`,{method:'GET'});
            todoList.value = todo?.value?.list.length >0 ? todo?.value?.list:[];
            toast.add({severity:'success',detail:update?.value?.message,life:3000});
            todo_visible_dialog.value = false;

        }else{
            toast.add({severity:'error',detail:update?.value?.message,life:3000});
        };
    };
    const todoDelete = async (event:any)=>{
        const {data:deleted} = await useFetch(`/api/todo/process/deleted/${event}`,{
            method:'DELETE'
        });
        if(deleted?.value?.status){
            const { data:todo } = await useFetch(`/api/sales/main-todo/gizem`,{method:'GET'});
            todoList.value = todo?.value?.list.length >0 ? todo?.value?.list:[];
            toast.add({severity:'success',detail:deleted?.value?.message,life:3000});
            todo_visible_dialog.value = false;
        }else{
            toast.add({severity:'error',detail:deleted?.value?.message,life:3000});
        }
    };


</script>