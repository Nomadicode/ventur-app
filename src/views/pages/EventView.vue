<template>
  <div
    class="fill-width">
    <div class="position--fixed">
      <event-filters v-model="filters"></event-filters>
    </div>

    <event-list
      ref="events"
      class="space-top--1_5"
      @on-scroll="onScroll"
      :saved="filters.savedOnly"
      :filters="filters"
      centered></event-list>

    <v-btn
      color="primary"
      class="primary-action"
      bottom
      right
      fab
      fixed
      @click="openEventModal">
      <v-icon>add</v-icon>
    </v-btn>
    <event-add-modal></event-add-modal>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import EventAddModal from '@/components/modals/EventAddModal'
import EventList from '@/components/events/EventList'
import EventFilters from '@/components/events/Filters'
import { mapGetters } from 'vuex'

export default {
  name: 'EventView',
  mounted () {
    if (this.$route.params.id) {
      window.EventBus.$emit('load:event', this.$route.params.id)
    }
  },
  data () {
    return {
      tab: 'all',
      showMyEvents: false,
      hideToggle: false,
      filters: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(7, 'days').format('YYYY-MM-DD'),
        price: 150.00,
        duration: null,
        radius: 50
      }
    }
  },
  methods: {
    setTab (value) {
      this.tab = value
    },
    openEventModal () {
      if (this.$auth.isAuthenticated()) {
        window.EventBus.$emit('event:add')
      } else {
        window.EventBus.$emit('user:create-account')
      }
    },
    onScroll (scrollPos) {
      if (scrollPos >= 15) {
        this.hideToggle = true
      } else {
        this.hideToggle = false
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.params && to.params.id) {
        window.EventBus.$emit('load:event', to.params.id)
      }
    }
  },
  components: {
    EventAddModal,
    EventList,
    EventFilters
  }
}
</script>
