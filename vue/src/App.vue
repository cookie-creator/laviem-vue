<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import {mapState} from 'vuex'

export default {
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(['user'])
  }
}

</script>

<template>
  <router-view :key="$route.path"></router-view>
</template>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;*/
}
</style>
