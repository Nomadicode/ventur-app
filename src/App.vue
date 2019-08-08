<template>
  <v-app
    :class="{'login-screen': !$auth.isAuthenticated()}"
    light>
    <v-content>
      <v-container
        :fill-height="!$auth.isAuthenticated()"
        :class="{'pad-none': $auth.isAuthenticated()}"
        fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'
import CordovaApp from '@/services/cordova-init'

import updateProfile from '@/graphql/profile/mutations/updateProfile.gql'

export default {
  name: 'App',
  created () {
    CordovaApp.initialize()

    this.initializeLocation()

    this.registerWatchLocation()

    // window.setInterval(this.updateLocation, 15000)

    if (!this.token) {
      this.logout()
    }
  },
  computed: {
    ...mapGetters('UserModule', ['token']),
    ...mapGetters('AppState', ['currentLocation', 'timezone'])
  },
  methods: {
    initializeLocation () {
      if (navigator.geolocation) {
        var self = this
        navigator.geolocation.getCurrentPosition(function (location) {
          if (!self.currentLocation || (self.currentLocation.latitude !== location.coords.latitude && self.currentLocation.longitude !== location.coords.longitude)) {
            self.$store.commit('AppState/SET_LOCATION', location.coords)
            if (self.token) {
              self.$apollo.mutate({
                mutation: updateProfile,
                variables: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  timezone: self.timezone
                }
              }).then(function (data) {})
            }
          }
        })
      }

      this.$store.commit('AppState/SET_TIMEZONE', moment.tz.guess())
    },
    registerWatchLocation () {
      if (navigator.geolocation) {
        var self = this
        navigator.geolocation.watchPosition(function (location) {
          if (!self.currentLocation || (self.currentLocation.latitude !== location.coords.latitude && self.currentLocation.longitude !== location.coords.longitude)) {
            self.$store.commit('AppState/SET_LOCATION', location.coords)
            if (self.token) {
              self.$apollo.mutate({
                mutation: updateProfile,
                variables: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  timezone: self.timezone
                }
              }).then(function (data) {})
            }
          }
        }, function (error) {
        }, {
          enableHighAccuracy: true
        })
      }

      this.$store.commit('AppState/SET_TIMEZONE', moment.tz.guess())
    },
    logout () {
      if (this.$auth.isAuthenticated()) { this.$auth.logout() }
    }
  },
  watch: {
    token () {
      if (!this.token) {
        this.logout()
      }
    }
  }
}
</script>
