<template>
  <v-footer app>
    <v-bottom-nav
      light
      :active.sync="activeLink"
      :value="true"
      absolute
    >
      <v-btn
        color="primary"
        flat
        value="explore-random"
        @click="navigateTo('explore-random')">
        <span>Random</span>
        <v-icon>shuffle</v-icon>
      </v-btn>

      <v-btn
        flat
        color="primary"
        value="explore-list"
        @click="navigateTo('explore-list')">
        <span>List</span>
        <v-icon>list</v-icon>
      </v-btn>

      <v-btn
        flat
        light
        color="primary"
        value="explore-saved"
        @click="navigateTo('explore-saved')">
        <span>Saved</span>
        <v-icon>favorite_border</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-footer>
</template>

<script>
export default {
  name: 'ExploreFooter',
  mounted () {
    this.activeLink = this.$route.name
  },
  data () {
    return {
      activeLink: ''
    }
  },
  methods: {
    navigateTo (name) {
      this.$router.push({ name: name })
    }
  }
}
</script>

<style>

</style>
