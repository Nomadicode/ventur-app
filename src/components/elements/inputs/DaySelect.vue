<template>
  <div class="day-select">
    <input
      v-model="selected"
      v-for="day of daysOptions"
      :key="day.value + '-input'"
      type="checkbox"
      @change="onChange"
      :checked="day.checked"
      :value="day.value"
      :id="day.abbreviation" />

    <label
      v-for="day of daysOptions"
      :key="day.value + '-label'"
      :for="day.abbreviation">{{ day.abbreviation }}</label>
  </div>
</template>

<script>
import DAYS_ENUMS from '@/enums/daysEnum.js'

export default {
  name: 'DaySelect',
  props: ['value'],
  data () {
    return {
      daysOptions: DAYS_ENUMS,
      selected: []
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.selected)
    }
  },
  watch: {
    value () {
      this.selected = this.value
    }
  }
}
</script>
