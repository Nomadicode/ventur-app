<template>
  <div class="activity-list">
    <activity
      v-for="activity of activities"
      :key="activity.title"
      :item="activity"
      @refresh="refresh"></activity>

    <div
      v-if="activities && activities.length === 0 && !$apollo.loading"
      class="empty">
        {{ emptyMessage }}
    </div>

    <loading-icon v-if="$apollo.loading"></loading-icon>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'

import Activity from '@/components/activities/Activity'
import LoadingIcon from '@/components/elements/LoadingIcon'

export default {
  name: 'ActivityList',
  props: {
    startDate: {
      type: String,
      default: null
    },
    endDate: {
      type: String,
      default: null
    },
    saved: {
      type: Boolean,
      default: false
    },
    emptyMessage: {
      type: String,
      default: 'No activities near you'
    }
  },
  apollo: {
    activities: {
      pollInterval: 10000,
      query: gql`query Activities($latitude: Float!, $longitude: Float!, $startDate: DateTime, $endDate: DateTime, $saved: Boolean){ 
        activities (latitude: $latitude, longitude: $longitude, startDate: $startDate, endDate: $endDate, saved: $saved) {
          pk
          id
          saved
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
      variables () {
        return {
          latitude: this.currentLocation.latitude,
          longitude: this.currentLocation.longitude,
          startDate: this.startDate,
          endDate: this.endDate,
          saved: this.saved
        }
      }
    }
  },
  mounted () {
    this.loading = true
  },
  data () {
    return {
      selected: [2],
      loading: false
    }
  },
  computed: {
    ...mapGetters('UserModule', ['currentLocation'])
  },
  methods: {
    refresh () {
      this.$apollo.queries.activities.refetch()
    }
  },
  watch: {
    startDate () {
      // this.$apollo.queries.activities.refetch(
      //   {
      //     latitude: this.currentLocation.latitude,
      //     longitude: this.currentLocation.longitude,
      //     startDate: this.startDate,
      //     endDate: this.endDate,
      //     saved: this.saved
      //   }
      // )
    },
    endDate () {
      // this.$apollo.queries.activities.refetch(
      //   {
      //     latitude: this.currentLocation.latitude,
      //     longitude: this.currentLocation.longitude,
      //     startDate: this.startDate,
      //     endDate: this.endDate,
      //     saved: this.saved
      //   }
      // )
    }
  },
  components: {
    Activity,
    LoadingIcon
  }
}
</script>
