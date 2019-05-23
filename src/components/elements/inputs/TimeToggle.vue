<template>
    <el-radio-group
        v-model="selected"
        size="mini">
        <el-radio-button
          v-for="label of labels"
          :key="label"
          :label="label"></el-radio-button>
    </el-radio-group>
</template>

<script>
export default {
  name: 'TimeToggle',
  props: {
    value: {
      default: '',
      type: String
    },
    labels: {
      default: () => ([]),
      type: Array
    }
  },
  created () {
    this.selected = this.value
  },
  data () {
    return {
      selected: null
    }
  },
  watch: {
    selected () {
      this.$emit('input', this.selected)
    },
    value () {
      this.selected = this.value
    }
  }
}
</script>
