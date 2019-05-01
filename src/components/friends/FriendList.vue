<template>
  <div class="list">
    <div v-if="friendRequests.length !== 0" class="friend-list">
      <v-layout
        class="pad-top--quarter"
        row
        wrap>
        <v-flex
          xs11
          align-self-center>
          <h6>Friend Requests</h6>
        </v-flex>
        <v-flex xs1>
          <el-button
            class="white-text"
            type="text"
            size="mini"
            @click="showFriendRequests = !showFriendRequests"
            icon="el-icon-plus"></el-button>
        </v-flex>
      </v-layout>

      <div v-if="showFriendRequests">
        <friend-item v-for="friend of friendRequests" :key="friend.id" :friend="friend.fromUser" :isRequest="true" @refresh="refetch()"></friend-item>
      </div>
    </div>

    <v-divider
      v-if="friendRequests.length !== 0"
      class="pad-quarter" />

    <div
      class="friend-list">
      <h6 v-if="friends.length !== 0">Friends</h6>

      <friend-item v-for="friend of friends" :key="friend.id" :friend="friend"></friend-item>

      <div v-if="(!friends || friends.length === 0) && !loading" class="empty">
        <p>No friends found</p>
        <el-button
          class="extra-light-text add-btn"
          type="text"
          @click="$store.commit('AppState/OPEN_ADD_FRIEND_MODAL')">
          add a friend
        </el-button>
      </div>
    </div>
    <loading-icon v-if="loading"></loading-icon>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import FriendItem from './FriendItem'

export default {
  name: 'FriendList',
  apollo: {
    friendships: {
      pollInterval: 5000,
      query: gql`query friendships { 
        friendships {
          id
          name
          handle
          profilePicture
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.friends = data.friendships
        this.loading = false
      },
      error (err) {
        console.log(err)
      }
    },
    pendingFriendRequests: {
      pollInterval: 5000,
      query: gql`query pendingFriendRequests { 
        pendingFriendRequests {
          id
          fromUser {
            name
            handle
            profilePicture
          }
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.friendRequests = data.pendingFriendRequests
        this.loading = false
      },
      error (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      loading: false,
      showFriendRequests: true,
      friendRequests: [],
      friends: []
    }
  },
  methods: {
    refetch () {
      this.$apollo.queries.friendships.refetch()
      this.$apollo.queries.pendingFriendRequests.refetch()
    }
  },
  components: {
    FriendItem
  }
}
</script>
