<template>
  <div class="friend-list search-list">
    <v-layout
      row
      wrap>
      <v-flex xs7>
        <el-button
          type="text"
          class="toggle-btn"
          :class="{'active': !sentActive}"
          v-if="!query"
          @click="sentActive = false">Suggested friends</el-button>
        <el-button
          type="text"
          class="toggle-btn"
          :class="{'active': !sentActive}"
          v-if="query"
          @click="sentActive = false">Search results</el-button>
      </v-flex>
      <v-divider />
      <v-flex
        class="align-right"
        xs5>
        <el-button
          class="toggle-btn"
          :class="{'active': sentActive}"
          type="text"
          @click="sentActive = true">Sent requests</el-button>
      </v-flex>
    </v-layout>

    <friend
      v-for="result of results"
      :key="result.id"
      :friend="result"
      :pendingAcceptFromRecipient="sentActive"
      @refresh="refresh"></friend>

    <div v-if="results && results.length === 0" class="empty">No users found</div>
  </div>
</template>

<script>
import searchUsers from '@/graphql/core/queries/searchUsers.gql'

import getSentRequests from '@/graphql/friends/queries/getSentRequests.gql'
import getSuggestions from '@/graphql/friends/queries/getSuggestions.gql'

import Friend from './Friend'

export default {
  name: 'FriendSearchResults',
  props: {
    query: {
      type: String,
      default: null
    }
  },
  apollo: {
    friendSuggestions: {
      query: getSuggestions
    },
    sentFriendRequests: {
      pollInterval: 10000,
      query: getSentRequests,
      result ({ data, loading, networkStatus }) {
        this.sentRequests = []
        if (data) {
          var request = data.sentFriendRequests
          for (var item of request) {
            this.sentRequests.push(item.toUser)
          }
        }
      }
    }
  },
  data () {
    return {
      queryResults: [],
      sentActive: false,
      sentRequests: []
    }
  },
  computed: {
    results () {
      if (this.query) {
        return this.queryResults
      }

      if (this.sentActive) {
        return this.sentRequests
      }

      return this.friendSuggestions
    }
  },
  methods: {
    fetchResults () {
      var self = this
      if (this.query) {
        this.$apollo.query({
          query: searchUsers,
          variables: {
            query: self.query
          }
        }).then((response) => {
          self.queryResults = response.data.searchUsers
        })
      } else {
        this.$apollo.queries.friendSuggestions.refetch()
      }
    },
    refresh () {
      this.$apollo.queries.friendSuggestions.refetch()
      this.$apollo.queries.sentFriendRequests.refetch()
    }
  },
  components: {
    Friend
  },
  watch: {
    query () {
      this.fetchResults()
    }
  }
}
</script>
