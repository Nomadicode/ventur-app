<template>
  <v-toolbar
    app
    color="transparent"
    flat
    class="menu-header"
    height="80">
    <img
      class="logo"
      alt="Driftr Logo"
      src="@/assets/images/logo.svg"
      :height="'50px'" />

    <v-icon
      color="white"
      class="menu-icon"
      @click.stop="$store.commit('AppState/TOGGLE_DRAWER')">menu</v-icon>
  </v-toolbar>
</template>

<script>
export default {
  name: 'MainHeader'
}
</script>
