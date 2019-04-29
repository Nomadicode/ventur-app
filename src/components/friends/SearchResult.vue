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
          <v-flex xs7>
            <!-- <p class="suggest-reason">attended 6 similar activities</p> -->
          </v-flex>
          <v-flex xs4>
            <el-button
              type="primary"
              size="mini"
              @click="addFriend">Add Friend</el-button>
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
  props: ['result'],
  data () {
    return {
      avatarImage: AvatarImage
    }
  },
  methods: {
    addFriend () {
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
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
