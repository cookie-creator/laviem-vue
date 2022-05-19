<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Bookmarks</h1>
        <router-link
          :to="{ name: 'BookmarkCreate'}"
          class="py-2 px-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add new Bookmark
        </router-link>
      </div>
    </template>

    <!--<button
      type="button"
      @click="openSlideOver"
      class="py-2 px-3 w-25 text-white  bg-emerald-500 hover:bg-emerald-600 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg> Open
    </button>-->

    <div class="grid grid-cols-4 gap-4">

      <div v-if="bookmarks.loading" class="flex justify-center">Loading...</div>
      <div class="p-4 rounded-sm shadow-lg border-1 border-indigo-800"
           v-for="bookmark in bookmarks.data"
           :key="bookmark.id"
           >

        <div class="mt-1 mb-2">
          <a target="_blank" v-bind:href="bookmark.url" class="flex justify-content items-center hover:text-indigo-700">
            {{bookmark.name}}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div class="mb-3 text-sm text-gray-600">
          {{bookmark.description}}
        </div>

        <div class="flex justify-between items-center mt-3">

          <router-link
            :to="{ name: 'BookmarkView', params: { id: bookmark.id }}"
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
            v-if="bookmark.id"
            type="button"
            @click="deleteBookmark(bookmark.id)"
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

    </div> <!-- Bookmark list end -->

    <div class="flex justify-center mt-5">
      <nav
        class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
        <a
          v-for="(link, i) of bookmarks.links"
          :key="i"
          :disabled="!link.url"
          href="#"
          @click="getForPage($event, link)"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
          :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === bookmarks.links.length - 1 ? 'rounded-r-md' : '',
            ]"
          v-html="link.label"
        >
        </a>
      </nav>
    </div>

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed inset-0 overflow-hidden" @close="open = false">
        <div class="absolute inset-0 overflow-hidden">
          <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <div class="pointer-events-auto relative w-screen max-w-md">
                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                      <span class="sr-only">Close panel</span>
                      <XIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <DialogTitle class="text-lg font-medium text-gray-900"> Panel title </DialogTitle>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="absolute inset-0 px-4 sm:px-6">
                      <div class="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                    </div>
                    <!-- /End replace -->
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

  </page-component>
</template>

<script setup>

import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import PageComponent from '../components/PageComponent.vue';
import { computed, ref } from "vue";
import store from "../store";

const bookmarks = computed(() => store.state.bookmarks);
const categories = computed(() => store.state.categories);

store.dispatch("getBookmarks");
store.dispatch("getCategories");

const open = ref(false)

function deleteBookmark(bookmark)
{
  if (confirm('Are you sure you want to delete this bookmark?'))
  {
    store.dispatch("deleteBookmark", bookmark.id).then(() => {
      store.dispatch("getBookmarks");
    });
  }
}

function getForPage(ev, link)
{
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  store.dispatch("getBookmarks", { url: link.url });
}

function openSlideOver() { open.value = true; }

</script>

<style scoped>
</style>
