<template>
  <v-footer
    :height="56"
    app>
    <v-bottom-nav
      :active.sync="activeLink"
      :value="true"
      absolute
      class="main-footer"
    >
      <v-btn
        color="primary"
        flat
        value="events"
        @click="navigateTo('events')">
        <span>events</span>
        <v-icon>fas fa-flag</v-icon>
      </v-btn>
      <v-btn
        color="primary"
        flat
        value="friends"
        @click="navigateTo('friends')">
        <span>friends</span>
        <v-icon>fas fa-users</v-icon>
      </v-btn>

      <v-btn
        color="primary"
        flat
        @click="eventButtonClicked"
        :loading="loading">
        <img
          alt="Shuffle Button"
          class="escape-btn"
          src="@/assets/images/escape_btn.svg" />
      </v-btn>
      <v-btn></v-btn>
      <!-- <v-btn
        color="primary"
        flat
        value="messages"
        @click="navigateTo('messages')">
        <span>messages</span>
        <v-icon>fas fa-comments</v-icon>
      </v-btn> -->
      <v-btn
        color="primary"
        flat
        value="profile"
        @click="navigateTo('profile')">
        <span>profile</span>
        <v-icon>fas fa-user</v-icon>
      </v-btn>
    </v-bottom-nav>
</v-footer>
</template>

<script>
export default {
  name: 'MainFooter',
  mounted () {
    this.activeLink = this.$route.name
  },
  created () {
    var self = this
    window.EventBus.$on('loading:event-random', (value) => {
      self.loading = value
    })
  },
  data () {
    return {
      activeLink: '',
      loading: false
    }
  },
  methods: {
    navigateTo (name) {
      this.$router.push({ name: name })
    },
    eventButtonClicked () {
      window.EventBus.$emit('load:event-random')
    }
  }
}
</script>
