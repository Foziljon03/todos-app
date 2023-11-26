<script setup>
import { ref, onMounted } from "vue";
import {
  fetchTodos,
  addNewTodo,
  deleteTodoById,
  updateTodo,
} from "./composable/index";

const newTodo = ref("");
const todos = ref([]);

onMounted(async () => {
  todos.value = await fetchTodos();
});

const addTodo = async () => {
  if (newTodo.value.trim()) {
    const addedTodo = await addNewTodo(newTodo.value);
    todos.value.push(addedTodo);
    newTodo.value = "";
  }
};

const deleteTodo = async (id) => {
  await deleteTodoById(id);
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const toggleEdit = (todo) => {
  todo.editing = !todo.editing;
  if (todo.editing) {
    todo.editTitle = todo.title;
  }
};

const saveUpdate = async (todo) => {
  todo.title = todo.editTitle;
  await updateTodo(todo);
  todo.editing = false;
};

const cancelUpdate = (todo) => {
  todo.editing = false;
};
</script>

<template>
  <div class="bg-gray-800 min-h-screen flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h1 class="text-2xl font-semibold mb-4">Todo App</h1>

      <!-- Todo Form -->
      <div class="flex items-center mb-4">
        <input
          v-model="newTodo"
          type="text"
          class="flex-grow p-2 border rounded mr-2"
          placeholder="Add a new todo..."
        />
        <button
          @click="addTodo"
          class="bg-gray-800 text-white py-2 px-4 rounded"
        >
          Add Todo
        </button>
      </div>

      <!-- Todo List -->
      <div class="mt-8">
        <ul>
          <li
            v-for="todo in todos"
            :key="todo.id"
            class="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded"
          >
            <div class="flex items-center">
              <input type="checkbox" v-model="todo.completed" class="mr-2" />
              <span
                :class="{
                  'line-through': todo.completed,
                  hidden: todo.editing,
                }"
                >{{ todo.title }}</span
              >
              <input
                v-if="todo.editing"
                v-model="todo.editTitle"
                @keyup.enter="saveUpdate(todo)"
                @blur="cancelUpdate(todo)"
                type="text"
                class="flex-grow p-2 border rounded ml-2"
              />
            </div>
            <div class="flex">
              <button
                @click="toggleEdit(todo)"
                class="text-gray-600 hover:text-gray-800 mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteTodo(todo.id)"
                class="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling here */
.line-through {
  text-decoration: line-through;
}

.hidden {
  display: none;
}
</style>
