<template>
  <div class="friend-list">
    <h6
      v-if="!query"
      class="pad-bottom--quarter">Suggested friends</h6>

    <search-result v-for="result of results" :key="result.id" :result="result"></search-result>

    <div v-if="results.length === 0" class="empty">No users found matching your query</div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import SearchResult from './SearchResult'

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
      query: gql`query {
        friendSuggestions {
          id
          handle
          name
          profilePicture
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.results = data.friendSuggestions
        this.loading = false
      },
      error (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      results: []
    }
  },
  methods: {
    fetchResults () {
      var self = this
      if (this.query) {
        this.$apollo.query({
          query: gql`query searchUsers($query: String!){
              searchUsers(query: $query) {
                id
                name
                handle
                profilePicture
              }
          }`,
          variables: {
            query: self.query
          }
        }).then((response) => {
          self.results = response.data.searchUsers
        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.$apollo.queries.friendSuggestions.refetch()
      }
    }
  },
  components: {
    SearchResult
  },
  watch: {
    query () {
      this.fetchResults()
    }
  }
}
</script>
