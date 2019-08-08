<template>
  <div
    class="fill-width">
    <div class="position--fixed">
      <event-filters v-model="filters"></event-filters>

      <v-layout v-if="!hideToggle" class="pad-sides--half pad-top--quarter">
        <v-spacer />
        <v-flex class="horizontal-right" xs6>
          <el-switch
            :width="35"
            class="font--small"
            v-model="showSaved"
            active-text="only saved events"></el-switch>
        </v-flex>
      </v-layout>
    </div>

    <event-list
      ref="events"
      class="pad-top--double space-top--1_5"
      @on-scroll="onScroll"
      :saved="showSaved"
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
  created () {
    this.filters = Object.assign({}, this.savedFilters)
  },
  data () {
    return {
      tab: 'all',
      showSaved: false,
      showMyEvents: false,
      hideToggle: false,
      filters: {}
    }
  },
  computed: {
    ...mapGetters('AppState', ['savedFilters'])
  },
  methods: {
    setTab (value) {
      this.tab = value
    },
    openEventModal () {
      window.EventBus.$emit('event:add')
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
    },
    filters: {
      handler: function () {
        this.$store.commit('AppState/SET_FILTERS', this.filters)
      },
      deep: true
    }
  },
  components: {
    EventAddModal,
    EventList,
    EventFilters
  }
}
</script>
