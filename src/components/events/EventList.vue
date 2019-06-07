<template>
  <scroller
    ref="scroller"
    class="event-list">
    <event-card
      v-for="activity of activities"
      :key="activity.title"
      :item="activity"
      @refresh="refresh"></event-card>

    <div
      v-if="activities && activities.length === 0 && !$apollo.loading"
      class="empty">
        {{ emptyMessage }}
    </div>

    <!-- <loading-icon v-if="$apollo.loading"></loading-icon> -->
  </scroller>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'

import EventCard from '@/components/events/EventCard'
import LoadingIcon from '@/components/elements/LoadingIcon'

export default {
  name: 'EventList',
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
          nextOccurrence
          prevOccurrence
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
          saved: this.saved,
          page: this.page
        }
      }
    }
  },
  mounted () {
    this.$refs.scroller.clientHeight = 'inherit'
  },
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapGetters('UserModule', ['currentLocation'])
  },
  methods: {
    refresh (done) {
      this.$apollo.queries.activities.refetch().then(function () {
        done()
      })
    },
    fetchNext (done) {
      console.log('test', this.page)
      done()
      // this.page++
      // done()
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
    EventCard,
    LoadingIcon
  }
}
</script>
