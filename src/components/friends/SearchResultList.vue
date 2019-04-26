<template>
  <div class="result-list">
    <h6
      v-if="!query"
      class="pad-bottom--quarter">Suggested friends</h6>

    <search-result></search-result>
  </div>
</template>

<script>
import SearchResult from './SearchResult'

export default {
  name: 'FriendSearchResults',
  props: {
    query: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      results: []
    }
  },
  components: {
    SearchResult
  }
}
</script>
