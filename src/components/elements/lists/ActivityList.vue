<template>
  <div class="list">
    <div class="activity-list">
      <activity-item v-for="item of items" :key="item.id" :item="item"></activity-item>
    </div>
    <div v-if="items.length === 0 && !loading" class="empty-list">No activities to show</div>
    <div v-if="loading">
      <loading-icon></loading-icon>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import LoadingIcon from '@/components/elements/LoadingIcon'
import ActivityItem from './ActivityItem'
import ActivityCard from '@/components/elements/ActivityCard'

export default {
  name: 'ActivityList',
  mounted () {
    this.loading = true
  },
  apollo: {
    activities: {
      query: gql`query { 
        activities {
          id
          name
          description
          over18
          over21
          kidFriendly
          handicapFriendly
          price
          duration
          location {
            address
            latitude
            longitude
          }
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.items = data.activities
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
      items: []
    }
  },
  components: {
    LoadingIcon,
    ActivityItem,
    ActivityCard
  }
}
</script>

<style lang="scss" scoped>
.activity-list {
  list-style-type: none;
  padding-left: 0;
  overflow: auto;
  width: 100%;
  position: relative;
}
</style>
