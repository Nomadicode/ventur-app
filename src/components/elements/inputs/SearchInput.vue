<template>
  <el-input
    v-model="query"
    class="search-field"
    :placeholder="placeholder"
    size="mini">
    <el-button
      slot="append"
      class="search-btn"
      icon="el-icon-search"
      size="mini"
      @click="submit"></el-button>
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
