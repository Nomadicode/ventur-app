<template>
  <v-layout row wrap>
    <v-flex xs6>
      <label class="pad-top--half pad-bottom--quarter field-label">{{ dateLabel }}</label>
      <v-dialog
        ref="datePicker"
        v-model="showDatePicker"
        :return-value.sync="date"
        full-width
        lazy
        reactive
        persistent
      >
        <template v-slot:activator="{ on }">
          <el-input
            size="small"
            prefix-icon="el-icon-date"
            :value="displayDate"
            :placeholder="dateLabel"
            v-on="on"
            @focus="showDatePicker = true" />
        </template>
        <v-date-picker
          v-model="date"
          scrollable
          width="272"
          :min="minDate"
          @change="$refs.datePicker.save(date)">
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-spacer />
    <v-flex xs5>
      <label class="pad-top--half pad-bottom--quarter field-label">{{ timeLabel }}</label>
      <v-dialog
        ref="timePicker"
        v-model="showTimePicker"
        full-width
        reactive
        persistent
      >
        <template v-slot:activator="{ on }">
          <el-input
            size="small"
            prefix-icon="el-icon-time"
            :value="displayTime"
            :placeholder="timeLabel"
            v-on="on"
            :disabled="!date"
            @focus="showTimePicker = true" />
        </template>
        <time-picker
          v-model="time"
          scrollable
          width="272"
          @close="showTimePicker = false">
        </time-picker>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'

import TimePicker from './TimePicker'

export default {
  name: 'DateTimeSelect',
  props: {
    value: {
      default: null
    },
    dateLabel: {
      default: 'Date',
      type: String
    },
    timeLabel: {
      default: 'Time',
      type: String
    },
    min: {
      type: String
    }
  },
  mounted () {
    if (this.min) {
      this.minDate = moment(this.min).tz(this.timezone).subtract(1, 'days').format()
    } else {
      this.minDate = moment().tz(this.timezone).subtract(1, 'days').format()
    }
  },
  data () {
    return {
      showDatePicker: false,
      date: null,
      time: null,
      minDate: null,
      showTimePicker: false
    }
  },
  computed: {
    ...mapGetters('AppState', ['timezone']),
    displayDate () {
      return (this.date) ? moment(this.date).format('YYYY-MM-DD') : ''
    },
    displayTime () {
      return (this.time) ? moment(this.time, 'h:mm A').format('h:mm A') : ''
    }
  },
  methods: {
    disabledDate (time) {
      if (!this.min) {
        return time.getTime() < Date.now()
      } else {
        return time.getTime() < moment(this.min)
      }
    },
    onChange () {
      if (this.date) {
        var time = (this.time) ? this.time : ''
        var datetime = moment(this.date + ' ' + time).tz(this.timezone)
        this.$emit('input', datetime.format())
      }
    }
  },
  watch: {
    value () {
      var newDate = moment(this.value)
      this.date = newDate.format('YYYY-MM-DD')
      this.time = newDate.format('h:mm A')
    },
    date () {
      this.onChange()
    },
    time () {
      this.onChange()
    },
    min () {
      if (this.min) {
        this.minDate = moment(this.min).tz(this.timezone).subtract(1, 'days').format()
      } else {
        this.minDate = moment().tz(this.timezone).subtract(1, 'days').format()
      }
    }
  },
  components: {
    TimePicker
  }
}
</script>
