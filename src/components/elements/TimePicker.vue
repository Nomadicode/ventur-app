<template>
  <div>
    <label class="field-label">{{ label }}</label>
    <v-combobox
      solo
      v-model="time"
      :items="times"
      append-icon="schedule"
      :label="label">
    </v-combobox>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TimePicker',
  props: ['value', 'label', 'increment'],
  created () {
    this.time = this.value
    this.steps = this.increment ? this.increment + 1 : 15
  },
  data () {
    return {
      show: false,
      time: null,
      steps: 0
    }
  },
  computed: {
    times () {
      var timeStops = []
      var startTime = moment().startOf('day')
      var endTime = moment().endOf('day')

      while (startTime <= endTime) {
        timeStops.push(new moment(startTime).format('h:mm a'))
        startTime.add('m', 15)
      }

      return timeStops
    }
  },
  watch: {
    time () {
      this.$emit('input', this.time)
    }
  }
}
</script>
