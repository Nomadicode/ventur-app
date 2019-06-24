<template>
  <div
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

    <loading-icon v-if="$apollo.loading"></loading-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import getEvents from '@/graphql/events/queries/getEvents.gql'

import EventCard from '@/components/events/EventCard'
import LoadingIcon from '@/components/elements/LoadingIcon'

export default {
  name: 'EventList',
  props: {
    filters: {
      type: Object,
      default: () => { return {} }
    },
    creator: {
      type: Boolean,
      default: false
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
      query: getEvents,
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
    var self = this
    window.EventBus.$on('events:refresh', () => {
      self.refresh()
    })

    window.onscroll = () => {
      console.log(window.scrollY)
    }
  },
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapGetters('AppState', ['currentLocation'])
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
    }
  },
  components: {
    EventCard,
    LoadingIcon
  }
}
</script>
