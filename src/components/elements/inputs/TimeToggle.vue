<template>
    <el-radio-group
        v-model="selected"
        size="mini">
        <el-radio-button label="Today"></el-radio-button>
        <el-radio-button label="This week"></el-radio-button>
        <el-radio-button label="This month"></el-radio-button>
    </el-radio-group>
</template>

<script>
export default {
  name: 'TimeToggle',
  props: {
    value: {
      default: 'Today',
      type: String
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
    value () {
      this.selected = this.value
    }
  }
}
</script>
