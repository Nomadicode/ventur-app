<template>
  <v-layout
    align-center
    justify-center>
    <main-header></main-header>
    <router-view></router-view>
    <main-footer></main-footer>

    <event></event>
  </v-layout>
</template>

<script>
import Event from '@/components/events/Event.vue'
import MainHeader from '@/components/layouts/MainHeader.vue'
import MainFooter from '@/components/layouts/MainFooter.vue'

export default {
  name: 'MainView',
  components: {
    Event,
    MainHeader,
    MainFooter
  }
}
</script>
