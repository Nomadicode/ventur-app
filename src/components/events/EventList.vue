<template>
  <div ref='infiniteScroll' class="event-list">
    <event-card
      v-for="activity of events"
      :key="activity.title"
      :item="activity"
      @refresh="refresh"></event-card>

    <el-button
      size="mini"
      v-if="hasMore && !error && !$apollo.loading"
      class="fill-width"
      @click="fetchNext">Load More</el-button>

    <div
      v-if="events && events.length === 0 && !$apollo.loading"
      class="empty"
      :class="{'center--vertical': centered}">
        {{ emptyMessage }}
    </div>

    <div
      v-if="!currentLocation || !currentLocation.latitude || !currentLocation.longitude"
      class="error">
      Driftr needs access to your location to function properly.
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
    centered: {
      type: Boolean,
      default: false
    },
    creator: {
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
      query: getEvents,
      variables () {
        return {
          createdBy: this.creator,
          latitude: this.currentLocation.latitude,
          longitude: this.currentLocation.longitude,
          filters: this.filters,
          saved: this.saved,
          first: this.pageSize,
          after: this.cursor
        }
      },
      result ({ data, loading, networkStatus }) {
        if (data) {
          this.hasMore = data.activities.pageInfo.hasNextPage

          var events = data.activities.edges
          var newEvents = events.map(x => x.node)

          if (this.cursor) {
            this.events = this.events.concat(newEvents)
          } else {
            this.events = newEvents
          }
          if (events.length > 0) {
            this.nextCursor = events[events.length - 1]['cursor']
          }
        }
      },
      skip: true
    }
  },
  mounted () {
    var self = this

    window.EventBus.$on('events:refresh', () => {
      self.refresh()
    })

    if (this.currentLocation) {
      this.toggleQuery()
    }

    this.$refs.infiniteScroll.onscroll = (elem) => {
      var scrollPos = elem.target.scrollTop
      self.$emit('on-scroll', scrollPos)
    }
  },
  data () {
    return {
      pageSize: 10,
      nextCursor: null,
      cursor: null,
      hasMore: true,
      error: true,
      events: []
    }
  },
  computed: {
    ...mapGetters('AppState', ['currentLocation'])
  },
  methods: {
    refresh () {
      if (this.$apollo.queries && this.$apollo.queries.activities) {
        this.events = []
        this.cursor = null
        this.nextCursor = null
        this.$refs.infiniteScroll.scrollTop = 0
        this.$apollo.queries.activities.refetch()
      }
    },
    fetchNext () {
      this.cursor = this.nextCursor
    },
    toggleQuery () {
      this.$apollo.queries.activities.skip = !this.$apollo.queries.activities.skip
      this.error = !this.error
    }
  },
  components: {
    EventCard,
    LoadingIcon
  },
  watch: {
    filters: {
      handler (newValue, oldValue) {
        this.refresh()
      },
      deep: true
    },
    currentLocation: {
      handler (newValue, oldValue) {
        if (newValue.latitude == null || 
            newValue.longitude == null || 
            ((newValue.latitude == oldValue.latitude) &&
            (newValue.longitude == oldValue.longitude))) {
          this.$apollo.queries.activities.skip = true
          this.error = true
        } else {
          this.$apollo.queries.activities.skip = false
          this.error = false
        }
      },
      deep: true
    }
  }
}
</script>
