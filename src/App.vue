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
import moment from 'moment-timezone'

export default {
  name: 'App',
  created () {
    this.updateLocation()

    window.setInterval(this.getLocation, 15000)
  },
  methods: {
    updateLocation () {
      if (navigator.geolocation) {
        var self = this
        navigator.geolocation.getCurrentPosition(function (location) {
          self.$store.commit('AppState/SET_LOCATION', location.coords)
        })
      }

      this.$store.commit('AppState/SET_TIMEZONE', moment.tz.guess())
    }
  }
}
</script>
