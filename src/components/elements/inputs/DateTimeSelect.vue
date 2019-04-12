<template>
  <v-layout row wrap>
    <v-flex xs6>
      <label class="pad-top--half pad-bottom--quarter field-label">{{ dateLabel }}</label>
      <el-date-picker
        v-model="date"
        :placeholder="dateLabel"
        :pickerOptions="pickerOptions"
        type="date">
      </el-date-picker>
    </v-flex>
    <v-spacer />
    <v-flex xs5>
      <label class="pad-top--half pad-bottom--quarter field-label">{{ timeLabel }}</label>
      <el-time-select
        v-model="time"
        :disabled="!date"
        :placeholder="timeLabel"
        :pickerOptions="{
          start: '00:00',
          end: '23:59',
          step: '00:15'
        }">
      </el-time-select>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'

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
      default: null
    }
  },
  data () {
    return {
      date: null,
      time: null,
      pickerOptions: {
        disabledDate: this.disabledDate
      }
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
        var datetime = moment(this.date)

        if (this.time) {
          var timeArr = this.time.split(':')
          datetime = datetime.hour(timeArr[0])
          datetime = datetime.minute(timeArr[1])
        }

        this.$emit('input', datetime.format('YYYY-MM-DD HH:mm'))
      }
    }
  },
  watch: {
    value () {
      var newDate = moment(this.value)
      this.date = newDate.format('YYYY-MM-DD')
      this.time = newDate.format('HH:mm')
    },
    date () {
      this.onChange()
    },
    time () {
      this.onChange()
    }
  }
}
</script>
