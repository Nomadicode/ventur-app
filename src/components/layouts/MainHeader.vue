<template>
  <v-toolbar
    app
    color="transparent"
    class="menu-header"
    flat
    height="50">
    <img
      class="logo"
      alt="Driftr Logo"
      src="@/assets/images/logo.svg"
      :height="'40px'" />

    <div class="header-right">
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
    openSettingsMenu () {
      window.EventBus.$emit('profile:settings')
    }
  }
}
</script>
