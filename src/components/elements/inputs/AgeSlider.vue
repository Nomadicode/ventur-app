<template>
  <v-container class="pad-none" fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12>
        <label class="pad-bottom--quarter field-label">Age Range
          <span class="aside">
            <span v-if="!showAllAges && (range[0] != range[1])">{{ displayLabel(range[0]) }} - </span>
            <span v-if="!showAllAges">{{ displayLabel(range[1]) }}</span>
            <span v-if="showAllAges">all ages</span>
          </span>
        </label>
        <el-slider
          v-model="range"
          range
          :format-tooltip="displayMinMax"
          :min="min"
          :max="max"></el-slider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AgeSlider',
  props: {
    value: {
      default: () => { return [0, 65] },
      type: Array
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 65,
      type: Number
    }
  },
  mounted () {
    this.range = this.value.slice(0)
  },
  data () {
    return {
      range: [0, 65]
    }
  },
  computed: {
    showAllAges () {
      if (this.range[0] === 0 && this.range[1] === 65) return true

      return false
    }
  },
  methods: {
    displayLabel (value) {
      if (value === 0) return '<5'

      if (value === 65) return '65+'

      return value
    },
    displayMinMax (value) {
      if (value === 0) return '<5'
      if (value === 65) return '65+'

      return value
    }
  },
  watch: {
    range () {
      this.$emit('input', this.range)
    }
  }
}
</script>
