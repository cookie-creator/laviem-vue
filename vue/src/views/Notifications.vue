<template>
  <page-component>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Notifications</h1>
      </div>
    </template>

    <div v-if="notifications.loading" class="flex justify-center">Loading...</div>

    <div class="">
      <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-8">

        <div v-for="notification in notifications.data" :key="notification.title"
             class="relative rounded-md border-1 border-black shadow-md py-3 px-3">
          <dt>
            <div v-if="notification.type == 0" class="absolute flex items-center justify-center h-8 w-8 rounded-md bg-indigo-200 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div v-if="notification.type == 1" class="absolute flex items-center justify-center h-8 w-8 rounded-md bg-green-200 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div v-if="notification.type == 2" class="absolute flex items-center justify-center h-8 w-8 rounded-md bg-yellow-200 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div v-if="notification.type == 3" class="absolute flex items-center justify-center h-8 w-8 rounded-md bg-red-200 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <p class="ml-10 text-md leading-6 font-medium text-gray-900">{{ notification.title }}</p>
          </dt>
          <dd class="mt-1 ml-10 text-sm text-gray-500">
            {{notification.updated_at}}
            {{ notification.message }}
          </dd>
        </div>
      </dl>
    </div>

  </page-component>
</template>

<script setup>

import PageComponent from '../components/PageComponent.vue';
import { computed, ref } from "vue";
import store from "../store";

const notifications = computed(() => store.state.notifications);

store.dispatch("getNotifications");


import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/vue/outline'


</script>

<style scoped>
</style>
