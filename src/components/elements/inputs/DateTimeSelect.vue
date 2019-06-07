<template>
  <v-layout row wrap>
    <v-flex xs6>
      <label class="pad-top--half pad-bottom--quarter field-label">{{ dateLabel }}</label>
      <!-- <datepicker
        :placeholder="dateLabel"
        input-class="el-input__inner"
        wrapper-class="el-input"
        calendar-button-icon="far fa-calendar-alt"
        v-model="date"
        :typeable="true"
        format="MM/dd/yyyy"
        ></datepicker> -->
      <!-- <v-menu
        ref="menu"
        v-model="datepicker"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            class="date-field"
            solo
            v-model="date"
            :placeholder="dateLabel"
            prepend-inner-icon="event"
            hide-details
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable @input="datepicker = false"></v-date-picker>
      </v-menu> -->

      <el-date-picker
        v-model="date"
        :placeholder="dateLabel"
        :pickerOptions="pickerOptions"
        size="small"
        type="date">
      </el-date-picker>
    </v-flex>
    <v-spacer />
    <v-flex xs5>
      <label class="pad-top--half pad-bottom--quarter field-label">{{ timeLabel }}</label>
      <v-menu
        ref="menu"
        v-model="showTimePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        lazy
        transition="scale-transition"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <el-input
            v-on="on"
            v-model="time"
            prefix-icon="el-icon-time"
            :placeholder="timeLabel"></el-input>
          <!-- <v-text-field
            v-model="time"
            label="Picker in menu"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field> -->
        </template>
        <v-time-picker
          v-if="showTimePicker"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
      <!-- <el-time-select
        v-model="time"
        :disabled="!date"
        :placeholder="timeLabel"
        :pickerOptions="{
          start: '00:00',
          end: '23:59',
          step: '00:15'
        }">
      </el-time-select> -->
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
import lang from '@/enums/lang.js'

import Datepicker from 'vuejs-datepicker'

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
      datepicker: false,
      date: null,
      time: null,
      pickerOptions: {
        disabledDate: this.disabledDate
      },
      lang: lang,
      showTimePicker: false
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

        this.$emit('input', datetime.format('YYYY-MM-DD h:mm a'))
      }
    }
  },
  watch: {
    value () {
      var newDate = moment(this.value)
      this.date = newDate.format('YYYY-MM-DD')
      this.time = newDate.format('h:mm a')
    },
    date () {
      this.onChange()
    },
    time () {
      this.onChange()
    }
  },
  components: {
    Datepicker
  }
}
</script>
