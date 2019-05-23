<template>
  <div
    class="fill-width">
    <time-toggle
      class="space-bottom--quarter fill-width horizontal-center"
      v-model="selectedTimeFrame"
      :labels="['Upcoming', 'Past']"></time-toggle>

    <activity-list
      :startDate="startDate"
      :endDate="endDate"
      :saved="true"></activity-list>
  </div>
</template>

<script>
import moment from 'moment'
import ActivityList from '@/components/activities/ActivityList'
import TimeToggle from '@/components/elements/inputs/TimeToggle'

export default {
  name: 'SavedView',
  created () {
    this.startDate = this.getDateString(moment(this.currentDate))
  },
  data () {
    return {
      selectedTimeFrame: 'Upcoming',
      startDate: null,
      endDate: null
    }
  },
  computed: {
    currentDate () {
      return moment().format('YYYY-MM-DDTHH:mm:ss')
    }
  },
  methods: {
    getDateString (value) {
      return value.format('YYYY-MM-DDTHH:mm:ss')
    }
  },
  watch: {
    selectedTimeFrame () {
      if (this.selectedTimeFrame === 'Upcoming') {
        this.startDate = this.currentDate
        this.endDate = null
      } else {
        this.startDate = null
        this.endDate = this.currentDate
      }
    }
  },
  components: {
    ActivityList,
    TimeToggle
  }
}
</script>
