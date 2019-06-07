<template>
  <div
    class="fill-width">
    <div class="position--fixed">
      <el-input
        class="search-field"
        placeholder="search events"
        size="mini"
        suffix-icon="el-icon-search"></el-input>

      <div class="horizontal-right">
        <el-switch
          v-if="!hideToggle"
          class="pad-right--half pad-top pad-bottom--half"
          active-text="only saved events"
          :width="30"
          v-model="showSaved"></el-switch>
      </div>
    </div>

    <event-list :saved="showSaved"></event-list>

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
import EventAddModal from '@/components/modals/EventAddModal'
import EventList from '@/components/events/EventList'

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
      hideToggle: false
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
    EventList
  }
}
</script>
