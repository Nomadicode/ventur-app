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
            type="text"
            size="mini"
            @click="showFriendRequests = !showFriendRequests"
            :icon="showFriendRequests ? 'el-icon-minus' : 'el-icon-plus'"></el-button>
        </v-flex>
      </v-layout>

      <v-layout
        v-if="showFriendRequests"
        row
        wrap>
        <friend
          v-for="friend of friendRequests"
          :key="friend.id"
          :friend="friend.fromUser"
          :pendingAcceptFromSelf="true"
          @refresh="refetch"></friend>
      </v-layout>
    </div>

    <v-divider
      v-if="friendRequests && friendRequests.length !== 0"
      class="pad-quarter" />

    <div
      class="friend-list">
      <h6 v-if="friends && friends.length !== 0">Friends</h6>

      <v-layout
        row
        wrap>
        <friend
          v-for="friend of friends"
          :key="friend.id"
          :friend="friend"
          :isFriend="true"
          @refresh="refetch"></friend>
      </v-layout>

      <div v-if="(!friends || friends.length === 0) && !loading" class="empty">
        <p>No friends found</p>
        <el-button
          class="secondary-text add-btn"
          type="text"
          @click="openFriendAddModal">
          add a friend
        </el-button>
      </div>
    </div>
    <loading-icon v-if="loading"></loading-icon>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Friend from './Friend'

export default {
  name: 'FriendList',
  apollo: {
    friendships: {
      pollInterval: 10000,
      query: gql`query friendships { 
        friendships {
          pk
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
      pollInterval: 10000,
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
    openFriendAddModal () {
      window.EventBus.$emit('friend:add')
    },
    refetch () {
      this.$apollo.queries.friendships.refetch()
      this.$apollo.queries.pendingFriendRequests.refetch()
    }
  },
  components: {
    Friend
  }
}
</script>
