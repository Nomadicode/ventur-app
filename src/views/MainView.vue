<template>
  <v-layout
    align-center
    justify-center>
    <main-header></main-header>
    <router-view></router-view>
    <main-footer></main-footer>

    <event></event>
    <location-modal></location-modal>
  </v-layout>
</template>

<script>
import Event from '@/components/events/Event.vue'
import MainHeader from '@/components/layouts/MainHeader.vue'
import MainFooter from '@/components/layouts/MainFooter.vue'
import LocationModal from '@/components/modals/LocationModal'
import { mapGetters } from 'vuex';

export default {
  name: 'MainView',
  mounted () {
    if (!this.currentLocation || !navigator.geolocation) {
      window.EventBus.$emit('app:location-set')
    }
  },
  computed: {
    ...mapGetters('AppState', ['currentLocation'])
  },
  components: {
    Event,
    MainHeader,
    MainFooter,
    LocationModal
  }
}
</script>
