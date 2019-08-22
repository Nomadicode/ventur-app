<template>
  <div>
    <div ref='infiniteScroll' class="event-list">
      <event-card
        v-for="activity of events"
        :key="activity.title"
        :item="activity"
        @refresh="refresh"></event-card>

      <el-button
        size="mini"
        v-if="hasMore && !$apollo.loading"
        class="fill-width"
        @click="fetchNext">Load More</el-button>

      <div
        v-if="events && events.length === 0 && !$apollo.loading"
        class="empty"
        :class="{'center--vertical': centered}">
          {{ emptyMessage }}
      </div>

      <loading-icon v-if="$apollo.loading || loading"></loading-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { calculateDistance } from '@/services/helpers'

import getEvents from '@/graphql/events/queries/getEvents.gql'

import EventCard from '@/components/events/EventCard'
import LoadingIcon from '@/components/elements/LoadingIcon'
import LocationAutocomplete from '@/components/elements/inputs/LocationAutocomplete'

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

        this.loading = false
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
      hasMore: false,
      events: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters('AppState', ['currentLocation'])
  },
  methods: {
    refresh () {
      if (this.$apollo.queries && this.$apollo.queries.activities) {
        this.cursor = null
        this.nextCursor = null
        this.$refs.infiniteScroll.scrollTop = 0
        this.loading = true
        this.$apollo.queries.activities.refetch()
      }
    },
    fetchNext () {
      this.cursor = this.nextCursor
    },
    toggleQuery () {
      this.$apollo.queries.activities.skip = !this.$apollo.queries.activities.skip
    }
  },
  components: {
    EventCard,
    LoadingIcon,
    LocationAutocomplete
  },
  watch: {
    filters: {
      handler (newValue, oldValue) {
        delete this.filters['savedOnly']
        this.refresh()
      },
      deep: true
    },
    currentLocation: {
      handler (newValue, oldValue) {
        if (newValue == null) {
          this.$apollo.queries.activities.skip = true
        }
        else if (oldValue == null && newValue != null) {
          this.$apollo.queries.activities.skip = false
        } else {
          if (calculateDistance(newValue.latitude, newValue.longitude, oldValue.latitude, oldValue.longitude) >= 1) {
            this.$apollo.queries.activities.skip = false
          } else {
            this.$apollo.queries.activities.skip = true
          }
        }
      },
      deep: true
    }
  }
}
</script>
