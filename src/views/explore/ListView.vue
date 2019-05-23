<template>
  <div
    class="fill-width">
    <time-toggle
      class="space-bottom--quarter fill-width horizontal-center"
      v-model="selectedTimeFrame"
      :labels="['Today', 'next 7 days', 'next 30 days']"></time-toggle>

    <activity-list
      :startDate="startDate"
      :endDate="endDate"></activity-list>
  </div>
</template>

<script>
import moment from 'moment'
import ActivityList from '@/components/activities/ActivityList'
import TimeToggle from '@/components/elements/inputs/TimeToggle'

export default {
  name: 'ListView',
  created () {
    this.startDate = this.getDateString(moment(this.currentDateMoment))
    this.endDate = this.getDateString(moment(this.currentDateMoment).endOf('day'))
  },
  data () {
    return {
      selectedTimeFrame: 'Today',
      startDate: null,
      endDate: null
    }
  },
  computed: {
    currentDateMoment () {
      return moment()
    }
  },
  methods: {
    getDateString (value) {
      return value.format('YYYY-MM-DDTHH:mm:ss')
    }
  },
  watch: {
    selectedTimeFrame () {
      if (this.selectedTimeFrame === 'next 7 days') {
        this.startDate = this.getDateString(moment(this.currentDateMoment))
        this.endDate = this.getDateString(moment(this.currentDateMoment).add(7, 'days').endOf('day'))
      } else if (this.selectedTimeFrame === 'next 30 days') {
        this.startDate = this.getDateString(moment(this.currentDateMoment))
        this.endDate = this.getDateString(moment(this.currentDateMoment).add(30, 'days').endOf('day'))
      } else {
        this.startDate = this.getDateString(moment(this.currentDateMoment))
        this.endDate = this.getDateString(moment(this.currentDateMoment))
      }
    }
  },
  components: {
    ActivityList,
    TimeToggle
  }
}
</script>
