<template>
  <v-app light>
    <v-content>
      <div
        v-if="!locationAllowed"
        class="error">
        Ventür needs access to your location to function properly.
      </div>
      <v-container
        class="pad-none"
        fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <create-account-modal></create-account-modal>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'
import CordovaApp from '@/services/cordova-init'
import { calculateDistance } from '@/services/helpers'

import updateProfile from '@/graphql/profile/mutations/updateProfile.gql'
import updateUserDevice from '@/graphql/profile/mutations/updateUserDevice.gql'

import CreateAccountModal from '@/components/modals/CreateAccountModal'

export default {
  name: 'App',
  created () {
    var self = this
    const app = {
      initialize: function () {
        this.bindEvents()
      },

      bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false)
        document.addEventListener('pause', this.onPause, false)
      },

      onDeviceReady: function () {
        self.initializeLocation()
        window.setInterval(self.initializeLocation, 60000)

        var push = PushNotification.init({
          browser: { pushServiceURL: 'http://push.api.phonegap.com/v1/push' },
          android: { senderID: '1:22402933218:android:c9c1b273e0ef0f2e' },
          ios: { alert: 'true', badge: true, sound: 'true' }
        })

        push.on('registration', data => {
          var platform = device.platform
          var handle = data.registrationId

          // Add User Device API
          // self.$apollo.mutate({
          //   mutation: updateUserDevice,
          //   variables: {
          //     deviceId: handle,
          //     deviceType: platform
          //   }
          // }).then(function(data){})
        })
        
        push.on('notification', function (data) {
          alert('Push Received: ' + data.message)
        })

        push.on('error', function (error) {
          console.error(error)
        })
      },

      onPause: function () {
        
      },

      eventDetailPageRequested: function (eventData) {
      }
    }

    if (!!window.cordova && !!window._cordovaNative) {
      this.initializeLocation()
      window.setInterval(this.initializeLocation, 60000)
    } else {
      app.initialize()
    }

    if (!this.token) {
      this.logout()
    }
  },
  computed: {
    ...mapGetters('UserModule', ['token']),
    ...mapGetters('AppState', ['currentLocation', 'timezone', 'useDeviceLocation']),
    locationAllowed () {
      return (navigator.geolocation)
    }
  },
  methods: {
    initializeLocation () {
      if (navigator.geolocation && this.useDeviceLocation) {
        var self = this
        navigator.geolocation.getCurrentPosition(function (location) {
          if (!self.currentLocation || calculateDistance(location.coords.latitude, location.coords.longitude, self.currentLocation.latitude, self.currentLocation.longitude) > 1) {
            self.$store.commit('AppState/SET_LOCATION', location.coords)
            self.$store.commit('AppState/SET_TIMEZONE', moment.tz.guess())
            
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
  },
  components: {
    CreateAccountModal
  }
}
</script>
