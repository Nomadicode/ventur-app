<template>
  <div>
    <div v-if="friendRequests.length !== 0" class="friend-list">
      <h6>Friend Requests</h6>

      <friend-item v-for="friend of friendRequests" :key="friend.id" :friend="friend.fromUser" @refresh="refetch()"></friend-item>
    </div>

    <div class="friend-list">
      <h6>Friends</h6>

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
