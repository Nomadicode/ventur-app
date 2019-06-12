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
          :min="min"
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
import moment from 'moment-timezone'
import lang from '@/enums/lang.js'

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
      default: () => { return moment().tz(moment.tz.guess()).subtract(1, 'days').toISOString() },
      type: String
    }
  },
  data () {
    return {
      showDatePicker: false,
      date: null,
      time: null,
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      lang: lang,
      showTimePicker: false
    }
  },
  computed: {
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
        var datetime = moment(this.date + ' ' + time).tz(moment.tz.guess())
        this.$emit('input', datetime.toISOString())
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
    }
  },
  components: {
    TimePicker
  }
}
</script>
