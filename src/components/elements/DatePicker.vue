<template>
  <div>
    <label class="field-label">{{ label }}</label>
    <v-menu
      v-model="show"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px">
      <v-text-field
        solo
        :light="light"
        :dark="dark"
        slot="activator"
        v-model="formattedDate"
        :label="label"
        append-icon="event"></v-text-field>
      <v-date-picker
        :light="light"
        :dark="dark"
        v-model="formattedDate" 
        @input="show = false"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DatePicker',
  props: ['value', 'label', 'light', 'dark'],
  created () {
    if (this.value) {
      this.date = moment(this.value)
    } else {
      this.date = moment()
    }
  },
  data () {
    return {
      show: false,
      date: null
    }
  },
  computed: {
    formattedDate: {
      get: function () {
        return this.date.format('YYYY-MM-DD')
      },
      set: function (newValue) {
        this.date = moment(newValue)
      }
    }
  },
  watch: {
    date () {
      this.$emit('input', this.date)
    }
  }
}
</script>
