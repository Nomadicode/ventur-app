<template>
  <v-toolbar
    app
    color="transparent"
    class="menu-header"
    flat
    height="50">
    <div class="header-left">
      <v-icon
        v-if="$route.name === 'events'"
        color="white"
        class="menu-icon"
        @click="openLocationModal">location_on</v-icon>
    </div>

    <img
      class="logo"
      alt="Driftr Logo"
      src="@/assets/images/logo.svg"
      :width="'75px'" />

    <div class="header-right">
      <v-icon
        v-if="$route.name === 'events'"
        color="white"
        class="menu-icon"
        @click="refreshEvents">refresh</v-icon>
      <v-icon
        v-if="$route.name === 'profile'"
        color="white"
        class="menu-icon"
        @click="openSettingsMenu">settings</v-icon>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: 'MainHeader',
  methods: {
    openLocationModal () {
      window.EventBus.$emit('app:location-set')
    },
    openSettingsMenu () {
      window.EventBus.$emit('profile:settings')
    },
    refreshEvents () {
      window.EventBus.$emit('events:refresh')
    }
  }
}
</script>
