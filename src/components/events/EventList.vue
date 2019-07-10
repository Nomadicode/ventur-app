<template>
  <div ref='infiniteScroll' class="event-list">
    <event-card
      v-for="activity of events"
      :key="activity.title"
      :item="activity"
      @refresh="refresh"></event-card>

    <el-button
      size="mini"
      v-if="hasMore && events && events.length > 10 && !$apollo.loading"
      class="fill-width">Load More</el-button>

    <div
      v-if="events && events.length === 0 && !$apollo.loading"
      class="empty"
      :class="{'center--vertical': centered}">
        {{ emptyMessage }}
    </div>

    <div
      v-if="error"
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
          page: this.page
        }
      },
      result ({ data, loading, networkStatus }) {
        var events = (data) ? data.activities : []
        if (this.page === 1) {
          this.events = events
        } else {
          this.events = this.events.concat(events)
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

      // var scrollHeight = elem.target.scrollHeight - elem.target.offsetHeight

      // if (scrollHeight === scrollPos) {
      // //  this.fetchNext()
      // }
    }
  },
  data () {
    return {
      page: 1,
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
        this.page = 1
        this.$refs.infiniteScroll.scrollTop = 0
        this.$apollo.queries.activities.refetch()
      }
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
    filters (newValue, oldValue) {
      this.refresh()
    },
    currentLocation (newValue, oldValue) {
      console.log(newValue, oldValue)
      if (newValue.latitude == null || newValue.longitude == null) {
        this.$apollo.queries.activities.skip = true
        this.error = true
      } else {
        this.$apollo.queries.activities.skip = false
        this.error = false
      }
    }
  }
}
</script>
