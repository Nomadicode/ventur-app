<template>
  <div
    v-if="show"
    class="location-modal"
  >
    <div class="location-select">
      <v-icon
        v-if="locationSet"
        @click="close"
        class="accent-color close">close</v-icon>
      <label>Where would you like to see events?</label>
      <location-autocomplete
        id="init-map"
        ref="location"
        classname="el-input__inner el-input"
        placeholder="select city"
        v-model="location"
        types="(cities)"
        v-on:placechanged="getAddressData"
        :geolocationOptions="{
          enableHighAccuracy: true,
          maximumAge: 0
        }"
        enable-geolocation></location-autocomplete>

        <div
          v-if="locationAvailable"
          class="current"
          @click.prevent="setCurrentLocation">
          <v-icon class="accent-color" :size="18">location_on</v-icon> use my current location
        </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script>
import tzlookup from 'tz-lookup'
import LocationAutocomplete from '@/components/elements/inputs/LocationAutocomplete'

import updateProfile from '@/graphql/profile/mutations/updateProfile.gql'
import { mapGetters } from 'vuex';

export default {
  name: 'LocationModal',
  created () {
    var self = this
    window.EventBus.$on('app:location-set', () => {
      self.show = true
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (result) {
        self.locationAvailable = true
      }, function (error) {

      })
    }
  },
  data () {
    return {
      show: false,
      location: null,
      latitude: null,
      longitude: null,
      locationAvailable: false,
      useDeviceLocation: false
    }
  },
  computed: {
    ...mapGetters('AppState', ['currentLocation']),
    locationSet () {
      return (this.currentLocation) ? true : false
    }
  },
  methods: {
    close () {
      this.show = false
      this.useDeviceLocation = false
    },
    setCurrentLocation () {
      this.$refs.location.geolocate()
      this.useDeviceLocation = true
    },
    getAddressData ($evt, place, id) {
      var self = this
      var timezone = tzlookup($evt.latitude, $evt.longitude)
      self.$store.commit('AppState/SET_LOCATION', {latitude: $evt.latitude, longitude: $evt.longitude})
      self.$store.commit('AppState/SET_TIMEZONE', timezone)
      self.$store.commit('AppState/SET_DEVICE_LOCATION', self.useDeviceLocation)

      self.$apollo.mutate({
        mutation: updateProfile,
        variables: {
          latitude: $evt.latitude,
          longitude: $evt.longitude,
          timezone: timezone
        }
      }).then(function (data) {
        self.close()
      })
    }
  },
  components: {
    LocationAutocomplete
  }
}
</script>