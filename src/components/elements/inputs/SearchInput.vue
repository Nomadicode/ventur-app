<template>
  <el-input
    v-model="query"
    size="small"
    class="search-field"
    :placeholder="placeholder">
    <i
      slot="suffix"
      class="el-icon-search el-input__icon search-btn"
      @click="submit"></i>
  </el-input>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    value: {
      default: null,
      type: String
    },
    placeholder: {
      default: 'Search',
      type: String
    }
  },
  mounted () {
    this.query = this.value
  },
  data () {
    return {
      query: null
    }
  },
  methods: {
    submit () {
      this.$emit('input', this.query)
    }
  },
  watch: {
    value () {
      this.query = this.value
    }
  }
}
</script>
