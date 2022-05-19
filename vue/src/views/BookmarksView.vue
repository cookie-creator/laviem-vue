<template>
  <page-component>
    <template v-slot:header>

      <div class="flex justify-between items-center">
        <h1 class="text-3x1 font-bold text-gray-900">
          {{ route.params.id ? model.name : "Create a bookmark" }}
        </h1>

        <button
          v-if="route.params.id"
          type="button"
          @click="deleteBookmark()"
          class="py-2 px-3 text-white bg-red-600 hover:bg-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-[#0099ff] inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>

      </div>
    </template>
    <div v-if="bookmarkLoading" class="flex justify-center">Loading...</div>
    <form v-else @submit.prevent="saveBookmark" class="animate-fade-in-down">

      <div class="shadow sm:rounded-md sm:overflow-hidden">

        <div class="mt-5 md:mt-0 md:col-span-2">

            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium text-gray-700">Bookmark</label>
                  <input type="text" name="first-name" id="first-name"
                         v-model="model.name"
                         autocomplete="bookmark-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                  <select v-model="model.category_id"
                          id="category" name="category" autocomplete="category-name"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option v-for="category in categories.data" v-bind:value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <label for="company-website" class="block text-sm font-medium text-gray-700"> URL </label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> http:// </span>
                      <input type="text" name="company-website" id="company-website"
                             v-model="model.url"
                             class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                    </div>
                  </div>
                </div>

                <div>
                  <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>
                  <div class="mt-1">
                    <textarea id="description" name="description"
                              v-model="model.description"
                              rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com" />
                  </div>
                </div>

              </div>

              <div class="px-4 py-3 bg-gray-50 text-left sm:px-6 ">
                <button type="submit" class="inline-flex justify-center py-2 px-4 mr-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>

                <router-link
                  :to="{ name: 'Bookmarks'}"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </router-link>
              </div>

            </div>
        </div>
      </div>
    </form>
  </page-component>
</template>

<script setup>

import PageComponent from '../components/PageComponent.vue';
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../store";

const router = useRouter();
const route = useRoute();

const bookmarkLoading = computed(() => store.state.currentBookmark.loading);

let model = ref({
  name: "",
  url: "",
  category_id: null,
  description: "",
});

watch(
  () => store.state.currentBookmark.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

if (route.params.id) {
  store.dispatch("getBookmark", route.params.id);
}

store.dispatch("getCategories");

let selected_category = 0;

const categories = computed(() => store.state.categories);

if (route.params.id) {
  model.value = store.state.bookmarks.data.find(
    (s) => s.id === parseInt(route.params.id)
  );
  selected_category = model.value.category_id;
  console.log(selected_category)
}

function saveBookmark() {
  let action = "created";
  if (model.value.id) {
    action = "updated";
  }
  store.dispatch("saveBookmark", { ...model.value }).then(({ data }) => {
    store.commit("notify", {
      type: "success",
      message: "The bookmark was successfully " + action,
    });
    router.push({
      name: "BookmarkView",
      params: { id: data.data.id },
    });
  });
}

function deleteBookmark() {
  if (
    confirm(
      `Are you sure you want to delete this bookmark? Operation can't be undone!!`
    )
  ) {
    store.dispatch("deleteBookmark", model.value.id).then(() => {
      router.push({
        name: "Bookmarks",
      });
    });
  }
}

</script>

<style scoped>
</style>
