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
        @click="addGroup"
      >
        <v-icon>group_work</v-icon>
      </v-btn>
    </v-speed-dial>
    <friend-modal></friend-modal>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'

import FriendModal from '@/components/friends/FriendModal'
import FriendFooter from '@/components/layouts/footers/FriendFooter'

export default {
  name: 'FriendMainView',
  data () {
    return {
      fab: false
    }
  },
  methods: {
    addGroup () {
      var self = this
      this.$prompt('Give your group a name', 'Create a group', {
        confirmButtonText: 'Create Group',
        cancelButtonText: 'Cancel'
      }).then((value) => {
        self.createGroup(value)
      }).catch(() => {})
    },
    createGroup (value) {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation CreateFriendGroup($name: String!){
            createFriendGroup(name: $name) {
                success
                error
                group {
                    id
                    name
                }
            }
        }`,
        variables: {
          name: value.value
        }
      }).then((response) => {
        self.$apollo.queries.friendGroups.refetch()
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  components: {
    FriendFooter,
    FriendModal
  }
}
</script>
