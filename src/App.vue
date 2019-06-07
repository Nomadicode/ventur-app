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
export default {
  name: 'App',
  created () {
    this.getLocation()

    window.setInterval(this.getLocation, 15000)
  },
  methods: {
    getLocation () {
      if (navigator.geolocation) {
        var self = this
        navigator.geolocation.getCurrentPosition(function (location) {
          self.$store.commit('UserModule/SET_LOCATION', location.coords)
        })
      }
    }
  }
}
</script>
