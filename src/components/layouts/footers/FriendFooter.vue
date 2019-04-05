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
      value="friend-list"
      @click="navigateTo('friend-list')">
      <span>Friends</span>
      <v-icon>people_outline</v-icon>
    </v-btn>

    <v-btn
      flat
      color="primary"
      value="group-list"
      @click="navigateTo('friend-group-list')">
      <span>Groups</span>
      <v-icon>group_work</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'FriendFooter',
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
