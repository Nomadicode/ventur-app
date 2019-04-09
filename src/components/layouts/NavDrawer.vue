<template>
  <v-navigation-drawer
    v-model="drawerState"
    app
    temporary
    right
    class="primary navigation-drawer"
    width="200">
    <div class='navigation-profile'>
      <v-img
        class="profile-image"
        :src="profilePicture"/>
    </div>

    <v-list
      dark
      class='navigation-list'>
      <li :class="{'active': isActive('explore')}" @click="navigateTo('/explore')">
        <v-icon class='nav-icon'>search</v-icon>
        <p>EXPLORE</p>
      </li>
      <li :class="{'active': isActive('friend')}" @click="navigateTo('/friends')">
        <v-icon class='nav-icon'>people_outline</v-icon>
        <p>FRIENDS</p>
      </li>
      <!-- <li :class="{'active': isActive('messages')}" @click="navigateTo('/messages')">
          <v-icon class='nav-icon'>chat</v-icon>
          <p>MESSAGES</p>
      </li> -->
      <li :class="{'active': isActive('profile')}" @click="navigateTo('/profile')">
        <v-icon class='nav-icon'>person_outline</v-icon>
        <p>PROFILE</p>
      </li>
    </v-list>

    <v-list
      dark
      class='navigation-bottom'>
        <li @click="$store.commit('AppState/OPEN_FEEDBACK_MODAL')">FEEDBACK / SUPPORT</li>
        <li @click="$store.commit('AppState/OPEN_ABOUT_MODAL')">ABOUT</li>
        <li @click="logout()">SIGN OUT</li>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import DefaultProfile from '@/assets/images/avatar.svg'

export default {
  name: 'NavDrawer',
  data () {
    return {
      drawerState: false
    }
  },
  computed: {
    ...mapGetters('AppState', ['drawer']),
    ...mapGetters('UserModule', ['data']),
    profilePicture () {
      return this.data.profilePicture ? this.data.profilePicture : DefaultProfile
    }
  },
  methods: {
    isActive (pageName) {
      if (this.$route.name.includes(pageName)) {
        return true
      } else {
        return false
      }
    },
    navigateTo (route) {
      this.$router.push(route)
      this.$store.commit('AppState/CLOSE_DRAWER')
    },
    logout () {
      this.$store.commit('UserModule/LOGOUT_USER')
      this.$auth.logout()
      this.$router.push({ name: 'login' })
    }
  },
  watch: {
    drawer () {
      this.drawerState = this.drawer
    },
    drawerState () {
      if (this.drawerState === false) {
        this.$store.commit('AppState/CLOSE_DRAWER')
      } else {
        this.$store.commit('AppState/OPEN_DRAWER')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
