<template>
  <div>
    <label class="pad-bottom--quarter field-label">{{ label }} <span v-if="optional" class="aside">optional</span></label>
    <money
      class="el-input__inner el-input--small height--small"
      v-model="newValue"
      @change.native="onChange"
      v-bind="moneySettings"></money>
  </div>
</template>

<script>
import { Money } from 'v-money'

export default {
  name: 'PriceInput',
  props: {
    value: {
      default: 0.00,
      type: Number
    },
    label: {
      default: 'Price',
      type: String
    },
    optional: {
      default: false,
      type: Boolean
    }
  },
  created () {
    this.newValue = this.value
  },
  data () {
    return {
      moneySettings: {
        decimal: '.',
        thousands: ',',
        prefix: '$',
        precision: 2,
        masked: false
      },
      newValue: ''
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.newValue)
    }
  },
  watch: {
    value () {
      this.newValue = this.value
    }
  },
  components: {
    Money
  }
}
</script>
