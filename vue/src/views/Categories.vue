<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Categories</h1>
        <router-link
          :to="{ name: 'CategoryCreate'}"
          class="py-2 px-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add new Category
        </router-link>
      </div>
    </template>

    <div class="grid grid-cols-4 gap-4">

      <div class="p-4 rounded-sm shadow-lg border-1 border-indigo-800"
           v-for="category in categories.data"
           :key="category.id"
      >

        <div class="mt-1 mb-2">
            {{category.name}}
        </div>

        <div class="flex justify-between items-center mt-3">

          <router-link
            :to="{ name: 'CategoryView', params: { id: category.id }}"
            class="
              flex
              py-2 px-4
              border border-transparent
              text-sm
              rounded
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </router-link>

          <button
            v-if="category.id"
            type="button"
            @click="deleteCategory(category.id)"
            class="
              h-8
              w-6
              items-center
              text-sm
              justify-center
              rounded-full
              text-red-600
              hover:text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

      </div>
    </div>

  </page-component>
</template>

<script setup>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import PageComponent from '../components/PageComponent.vue';
import { computed, ref } from "vue";
import store from "../store";

const categories = computed(() => store.state.categories);

store.dispatch("getCategories");

function deleteCategory(category) {
  if (confirm('Are you sure you want to delete this category?'))
  {
    store.dispatch("deleteCategory", category).then(() => {
      store.dispatch("getCategories");
    });
  }
}

</script>

<style scoped>
</style>
