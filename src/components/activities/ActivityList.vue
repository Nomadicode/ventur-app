<template>
  <div class="list">
    <activity v-for="activity of activities" :key="activity.title" :item="activity"></activity>

    <div v-if="activities.length === 0 && !loading" class="empty">No activities near you</div>
    <loading-icon v-if="loading"></loading-icon>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Activity from '@/components/activities/Activity'
import LoadingIcon from '@/components/elements/LoadingIcon'

export default {
  name: 'ActivityList',
  props: {
    saved: {
      type: Boolean,
      default: false
    }
  },
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
          media
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
      selected: [2],
      activities: [],
      loading: false
    }
  },
  components: {
    Activity,
    LoadingIcon
  }
}
</script>
