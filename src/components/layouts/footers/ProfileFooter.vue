<template>
  <v-bottom-nav
    light
    :active.sync="activeLink"
    :value="true"
    absolute
  >
    <v-btn
      color="primary"
      flat
      value="profile-base"
      @click="navigateTo('profile-base')">
      <span>Basic Info</span>
      <v-icon>person_outline</v-icon>
    </v-btn>

    <!-- <v-btn
      flat
      color="primary"
      value="profile-history"
      @click="navigateTo('profile-history')">
      <span>History</span>
      <v-icon>schedule</v-icon>
    </v-btn> -->

    <v-btn
      flat
      color="primary"
      value="profile-account"
      @click="navigateTo('profile-account')">
      <span>Account</span>
      <v-icon>lock_outline</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'ProfileFooter',
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
