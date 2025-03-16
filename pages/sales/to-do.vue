<template>
    <div>
        <SalesMainTodoList :list="toDoList" @todo_selected_emit="todoSelected($event)"/>
        <Dialog v-model:visible="todo_visible_dialog" modal header="Update To Do">
            <TodoForm :model="modelStore.getTodoModel" :users="todoStore.getUsers" :status="todo_new_button_status"
            @process_update_emit="todoUpdate($event)"
            @process_deleted_emit="todoDelete($event)"
        />

        </Dialog>
    </div>
</template>
<script setup lang="ts">
    let toDoList = ref();
    const { data:todo } = await useFetch('/api/todo/list/to-do',{method:'GET'});
    toDoList.value = todo?.value?.list;
</script>