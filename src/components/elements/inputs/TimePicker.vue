<template>
  <v-card class="time-picker">
    <v-card-title class="header">{{ time }}</v-card-title>
    <v-card-text class="selector">
      <ul>
        <li
          v-for="index in hourArr"
          :key="index"
          :class="{'active': selectedHour == index}"
          @click="selectHour(index)">{{ index }}</li>
      </ul>
      <ul>
        <li
          v-for="index of timeArr"
          :key="index"
          :class="{'active': selectedMinute == index}"
          @click="selectMinute(index)">{{ index }}</li>
      </ul>
      <ul v-if="!use24Hour">
        <li
          v-for="index of segmentArr"
          :key="index"
          :class="{'active': selectedTimeSegment === index}"
          @click="selectTimeSegment(index)">{{ index }}</li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="$emit('close')">Cancel</v-btn>
      <v-btn flat color="primary" @click="save">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    value: {
      type: String
    },
    use24Hour: {
      default: false,
      type: Boolean
    }
  },
  mounted () {
    this.setTime(this.value)
  },
  computed: {
    timeArr () {
      var arr = []

      for (var i = 0; i < 60; i++) {
        arr.push((i < 10) ? '0' + i : i)
      }

      return arr
    },
    hourArr () {
      var arr = []
      var start = this.use24Hour ? 0 : 1
      var limit = this.use24Hour ? 23 : 12

      for (var i = start; i <= limit; i++) {
        arr.push(i)
      }

      return arr
    },
    segmentArr () {
      return ['AM', 'PM']
    }
  },
  data () {
    return {
      selectedHour: null,
      selectedMinute: null,
      selectedTimeSegment: 'AM',
      time: null
    }
  },
  methods: {
    selectMinute (value) {
      this.selectedMinute = value
      this.setTime()
    },
    selectHour (value) {
      this.selectedHour = value
      this.setTime()
    },
    selectTimeSegment (value) {
      this.selectedTimeSegment = value
      this.setTime()
    },
    setTime (value = null) {
      if (value) {
        var partInit = value.split(':')
        var partSmall = (partInit.length === 2) ? partInit[1].split(' ') : [null, 'AM']

        this.selectedHour = partInit[0]
        this.selectedMinute = partSmall[0]
        this.selectedTimeSegment = partSmall[1]
      }

      var hour = (this.selectedHour) ? this.selectedHour : '--'
      var minute = (this.selectedMinute) ? this.selectedMinute : '--'
      var timeAppend = (this.use24Hour) ? '' : ' ' + this.selectedTimeSegment
      this.time = hour + ':' + minute + timeAppend
    },
    save () {
      if (this.selectedHour && this.selectedMinute && this.selectedTimeSegment) {
        this.$emit('input', this.time)
        this.$emit('close')
      }
    }
  },
  watch: {
    value () {
      this.setTime(this.value)
    }
  }
}
</script>
