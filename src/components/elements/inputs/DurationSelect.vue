<template>
  <div>
    <label class="pad-bottom--quarter field-label">{{ label }} <span v-if="optional" class="aside">optional</span></label>
    <el-select
      size="small"
      v-model="newValue"
      default-first-option
      @change="onChange"
      placeholder="15 minutes">
      <el-option
        v-for="item in durationOptions"
        :key="item.value"
        :label="item.text"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import DURATIONS_ENUMS from '@/enums/durationEnum.js'

export default {
  name: 'DurationSelect',
  props: {
    value: {
      default: 60,
      type: Number
    },
    label: {
      default: 'Duration',
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
      newValue: '',
      durationOptions: DURATIONS_ENUMS
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.newValue)
    }
  }
}
</script>
