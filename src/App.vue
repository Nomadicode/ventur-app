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

import updateProfile from '@/graphql/profile/mutations/updateProfile.gql'

export default {
  name: 'App',
  created () {
    var app = {
      initialize: function () {
        this.bindEvents()
      },

      bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false)
      },

      onDeviceReady: function () {
        console.log('Device is ready')
        universalLinks.subscribe('openEventDetailPage', app.eventDetailPageRequested)
      },

      eventDetailPageRequested: function (eventData) {
        console.log(eventData)
      }
    }

    app.initialize()

    this.updateLocation()

    window.setInterval(this.getLocation, 15000)

    if (!this.token) {
      this.logout()
    }
  },
  computed: {
    ...mapGetters('UserModule', ['token']),
    ...mapGetters('AppState', ['currentLocation', 'timezone'])
  },
  methods: {
    updateLocation () {
      if (navigator.geolocation) {
        var self = this
        navigator.geolocation.getCurrentPosition(function (location) {
          if (!self.currentLocation || (self.currentLocation.latitude !== location.coords.latitude && self.currentLocation.longitude !== location.coords.longitude)) {
            self.$store.commit('AppState/SET_LOCATION', location.coords)
            self.$apollo.mutate({
              mutation: updateProfile,
              variables: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                timezone: self.timezone
              }
            }).then(function (data) {})
          }
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
