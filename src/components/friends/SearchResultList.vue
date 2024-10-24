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

    <loading-icon v-if="$apollo.loading"></loading-icon>
    <div v-if="!$apollo.loading && results && results.length === 0" class="empty">No users found</div>
  </div>
</template>

<script>
import searchUsers from '@/graphql/core/queries/searchUsers.gql'

import getSentRequests from '@/graphql/friends/queries/getSentRequests.gql'
import getSuggestions from '@/graphql/friends/queries/getSuggestions.gql'

import Friend from './Friend'
import LoadingIcon from '@/components/elements/LoadingIcon'

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
    },
    searchUsers: {
      query: searchUsers,
      variables () {
        return {
          query: this.query
        }
      },
      result ({ data, loading, networkStatus }) {
        this.queryResults = data.searchUsers
      },
      skip: true
    }
  },
  data () {
    return {
      queryResults: [],
      sentActive: false,
      suggestions: [],
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
      if (this.query) {
        this.$apollo.queries.searchUsers.skip = false
      } else {
        this.$apollo.queries.searchUsers.skip = true
      }
    },
    refresh () {
      this.$apollo.queries.friendSuggestions.refetch()
      this.$apollo.queries.sentFriendRequests.refetch()
      this.$apollo.queries.searchUsers.refetch()
    }
  },
  components: {
    Friend,
    LoadingIcon
  },
  watch: {
    query () {
      this.fetchResults()
    }
  }
}
</script>
