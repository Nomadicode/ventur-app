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
        <h6>{{ result.name }}</h6>
        <v-layout class="pad-top--quarter" row wrap>
          <v-flex
            :xs6="cancelable"
            :xs7="!cancelable">
            <!-- <p class="suggest-reason">attended 6 similar activities</p> -->
          </v-flex>
          <v-flex
            :xs5="cancelable"
            :xs4="!cancelable">
            <el-button
              v-if="!cancelable"
              type="primary"
              size="mini"
              @click="addFriend">Add Friend</el-button>
            <el-button
              v-if="cancelable"
              type="danger"
              size="mini"
              @click="cancelRequest">Cancel request</el-button>
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
  name: 'SearchResult',
  props: {
    result: {
      default: []
    },
    cancelable: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      avatarImage: AvatarImage
    }
  },
  methods: {
    addFriend () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation CreateFriendRequest ($handle: String!, $message: String) {
          createFriendRequest (handle: $handle, message: $message) {
            success
            error
            friendshipRequest {
              pk
              message
              created
              rejected
            }
          }
        }`,
        variables: {
          handle: this.result.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    },
    cancelRequest () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation CancelFriendRequest ($handle: String!) {
          cancelFriendRequest (handle: $handle) {
            success
            error
          }
        }`,
        variables: {
          handle: this.result.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
