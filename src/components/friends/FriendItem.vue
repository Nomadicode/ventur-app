<template>
  <v-layout class="friend" row wrap>
    <v-flex
      class="base-light-background pad-quarter"
      xs3
      align-self-top>
      <v-img
        :src="avatarImage"
        aspect-ratio="1"
        height="50"
        contain
      />
    </v-flex>
    <v-flex xs8>
      <div class="pad-sides--half pad-top--quarter">
        <h6>{{ friend.name }}</h6>
        <v-layout
          class="pad-top--quarter"
          row
          wrap>
          <v-flex xs5>
            <!-- <p class="suggest-reason">6 shared activities</p> -->
          </v-flex>
          <v-flex xs4>
            <el-button
              class="warning-text"
              type="text"
              size="mini"
              @click="rejectFriend">Reject</el-button>
          </v-flex>
          <v-flex xs3>
            <el-button
              type="primary"
              size="mini"
              @click="acceptFriend">Accept</el-button>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import AvatarImage from '@/assets/images/avatar.svg'

export default {
  name: 'FriendItem',
  props: ['friend'],
  data () {
    return {
    }
  },
  computed: {
    avatarImage () {
      return this.friend.profilePicture ? this.friend.profilePicture : AvatarImage
    }
  },
  methods: {
    acceptFriend () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation AcceptFriendRequest ($handle: String!) {
          acceptFriendRequest (handle: $handle) {
            success
            error
          }
        }`,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    rejectFriend () {
      this.$apollo.mutate({
        mutation: gql`mutation RejectFriendRequest ($handle: String!) {
          rejectFriendRequest (handle: $handle) {
            success
            error
          }
        }`,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
