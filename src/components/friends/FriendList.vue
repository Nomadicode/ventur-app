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
          <h6 class="section-heading">Friend Requests</h6>
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
      <h6 class="section-heading" v-if="friends && friends.length !== 0">Friends</h6>

      <v-layout
        row
        wrap>
        <friend
          v-for="friend of friends"
          :key="friend.id"
          :friend="friend"
          :isFriend="true"
          @refresh="refetch"></friend>

        <el-button
          size="mini"
          v-if="hasMore && !$apollo.loading"
          class="fill-width"
          @click="fetchNext">Load More</el-button>
      </v-layout>

      <div v-if="(!friends || friends.length === 0) && !$apollo.loading" class="empty">
        <p>No friends found</p>
        <el-button
          class="secondary-text add-btn"
          type="text"
          @click="openFriendAddModal">
          add a friend
        </el-button>
      </div>
    </div>
    <loading-icon v-if="$apollo.loading"></loading-icon>
  </div>
</template>

<script>
import getFriendships from '@/graphql/friends/queries/getFriendships.gql'
import getPendingRequests from '@/graphql/friends/queries/getPendingRequests.gql'

import Friend from './Friend'
import LoadingIcon from '@/components/elements/LoadingIcon'

export default {
  name: 'FriendList',
  props: ['filter'],
  apollo: {
    friendships: {
      pollInterval: 10000,
      query: getFriendships,
      result ({ data, loading, networkStatus }) {
        if (data) {
          this.hasMore = data.friendships.pageInfo.hasNextPage

          var friends = data.friendships.edges
          var newFriends = friends.map(x => x.node)

          if (this.cursor) {
            this.friends = this.friends.concat(newFriends)
          } else {
            this.friends = newFriends
          }
          if (friends.length > 0) {
            this.nextCursor = friends[friends.length - 1]['cursor']
          }
        }
      }
    },
    pendingFriendRequests: {
      pollInterval: 10000,
      query: getPendingRequests,
      result ({ data, loading, networkStatus }) {
        this.friendRequests = (data) ? data.pendingFriendRequests : []
        this.loading = false
      }
    }
  },
  data () {
    return {
      loading: true,
      showFriendRequests: true,
      cursor: null,
      nextCursor: null,
      hasMore: false,
      friendRequests: [],
      friends: []
    }
  },
  methods: {
    openFriendAddModal () {
      window.EventBus.$emit('friend:add')
    },
    refetch () {
      this.loading = true
      this.$apollo.queries.friendships.refetch()
      this.$apollo.queries.pendingFriendRequests.refetch()
    },
    fetchNext () {
      this.cursor = this.nextCursor
    }
  },
  components: {
    Friend,
    LoadingIcon
  }
}
</script>
