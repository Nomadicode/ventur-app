<template>
  <v-dialog
    light
    scrollable
    content-class="profile-menu-container"
    v-model="modal">
    <v-card class="profile-menu" light>
      <v-card-text>
        <v-list class="profile-menu-list">
          <v-list-tile @click="open('account')">
            <v-list-tile-title>My Account</v-list-tile-title>
          </v-list-tile>

          <v-divider />

          <v-list-tile @click="open('accessibility')">
            <v-list-tile-title>Accessibility &amp; Notifications</v-list-tile-title>
          </v-list-tile>

          <v-divider />

          <v-list-tile @click="open('security')">
            <v-list-tile-title>Security &amp; Password</v-list-tile-title>
          </v-list-tile>

          <v-divider />

          <!-- <v-list-tile @click="open('app')">
            <v-list-tile-title>App Settings</v-list-tile-title>
          </v-list-tile>

          <v-divider /> -->

          <v-list-tile @click="open('support')">
            <v-list-tile-title>Support</v-list-tile-title>
          </v-list-tile>

          <v-divider />

          <v-list-tile @click="open('about')">
            <v-list-tile-title>About Driftr</v-list-tile-title>
          </v-list-tile>

          <v-divider />

          <v-list-tile @click="logout">
            <v-list-tile-title class="warning-text">Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ProfileMenu',
  created () {
    var self = this
    window.EventBus.$on('profile:settings', () => {
      self.modal = true
    })
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {
    open (value) {
      this.$emit('open', value)
      this.modal = false
    },
    logout () {
      this.$store.commit('UserModule/LOGOUT_USER')
      this.$store.commit('AppState/RESET')
      this.$auth.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
