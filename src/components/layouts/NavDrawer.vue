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
        :src="data.profile_picture"/>
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

export default {
  name: 'NavDrawer',
  data () {
    return {
      drawerState: false
    }
  },
  computed: {
    ...mapGetters('AppState', ['drawer']),
    ...mapGetters('UserModule', ['data'])
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
.navigation-drawer {
  text-align: center;

  .navigation-profile {
    padding: 20px 0;
    margin-left: 50%;
    transform: translateX(-63%);

    .profile-image {
      border-radius: 50%;
      height: 125px;
      width: 125px;
      box-shadow: 0 0 3px #aeaeae;
    }
  }

  .navigation-list {
    text-align: left;

    li {
      padding: 10px 25px;
      font-size: 18px;

      .nav-icon {
        font-size: 25px;
        display: inline-block;
      }

      p {
        margin: 1px 16px;
        font-size: 18px;
        vertical-align: top;
        display: inline-block;
      }
    }

    .active {
      background: #009888;
    }
  }

  .navigation-bottom {
    position: absolute;
    bottom: 10px;
    width: 100%;

    li {
      font-size: 12px;
      padding: 5px;
    }
  }
}
</style>
