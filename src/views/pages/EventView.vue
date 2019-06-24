<template>
  <div
    class="fill-width">
    <div class="position--fixed">
      <event-filters v-model="filters"></event-filters>

      <v-layout v-if="!hideToggle" class="pad-sides--half pad-top--quarter">
        <v-flex xs5>
          <el-switch
            class="font--small"
            v-model="showMyEvents"
            active-text="limit to my events"></el-switch>
        </v-flex>
        <v-spacer />
        <v-flex xs4>
          <el-switch
            :width="50"
            class="font--small"
            v-model="showSaved"
            active-text="only saved events"></el-switch>
        </v-flex>
      </v-layout>
    </div>

    <event-list :saved="showSaved" :creator="showMyEvents" :filters="filters"></event-list>

    <v-btn
      color="primary"
      class="primary-action"
      bottom
      right
      small
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

export default {
  name: 'EventView',
  mounted () {
    window.onscroll = () => {
      if (window.scrollY >= 15) {
        this.hideToggle = true
      } else {
        this.hideToggle = false
      }
    }
  },
  data () {
    return {
      tab: 'all',
      showSaved: false,
      showMyEvents: false,
      hideToggle: false,
      filters: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(7, 'days').format('YYYY-MM-DD'),
        price: 50.00,
        duration: null,
        over18: false,
        over21: false,
        kidFriendly: false,
        handicapFriendly: false
      }
    }
  },
  methods: {
    setTab (value) {
      this.tab = value
    },
    openEventModal () {
      window.EventBus.$emit('event:add')
    }
  },
  components: {
    EventAddModal,
    EventList,
    EventFilters
  }
}
</script>
