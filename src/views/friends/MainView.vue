<template>
  <div class="main-container">
    <router-view></router-view>
    <v-speed-dial
      v-model="fab"
      absolute
      right
      bottom
      :direction="'top'"
      :transition="'slide-y-reverse-transition'"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          small
          fab
        >
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>people_outline</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>group_work</v-icon>
      </v-btn>
    </v-speed-dial>
    <!-- <v-btn
      color="primary"
      class="primary-action"
      absolute
      small
      right
      fab
      @click="$store.commit('AppState/OPEN_ADD_FRIEND_MODAL')">
      <v-icon>add</v-icon>
    </v-btn> -->
    <friend-footer></friend-footer>
    <friend-modal></friend-modal>
  </div>
</template>

<script>
import FriendModal from '@/components/modals/FriendModal'
import FriendFooter from '@/components/layouts/footers/FriendFooter'

export default {
  name: 'FriendMainView',
  data () {
    return {
      fab: false
    }
  },
  components: {
    FriendFooter,
    FriendModal
  }
}
</script>
