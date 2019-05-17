<template>
  <v-layout
    align-center
    justify-center>
    <router-view></router-view>
    <v-speed-dial
      color="primary"
      class="primary-action"
      bottom
      right
      fab
      fixed
      v-model="fab"
      :direction="'top'"
      :transition="'slide-y-reverse-transition'"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
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
        color="blue"
        @click="$store.commit('AppState/OPEN_ADD_FRIEND_MODAL')"
      >
        <v-icon>people_outline</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="$store.commit('AppState/OPEN_ADD_GROUP_MODAL')"
      >
        <v-icon>group_work</v-icon>
      </v-btn>
    </v-speed-dial>
    <friend-modal></friend-modal>
    <group-create-modal></group-create-modal>
  </v-layout>
</template>

<script>
import FriendModal from '@/components/friends/FriendModal'
import GroupCreateModal from '@/components/friends/groups/GroupCreateModal'

export default {
  name: 'FriendMainView',
  data () {
    return {
      fab: false
    }
  },
  components: {
    FriendModal,
    GroupCreateModal
  }
}
</script>
