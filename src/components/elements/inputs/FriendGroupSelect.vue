<template>
  <el-select
    class="fill-width"
    v-model="selected"
    multiple
    placeholder="High school friends"
    clearable
    filterable
    @change="onChange"
  >
    <el-option
      v-for="item in groups"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'

import getGroups from '@/graphql/groups/queries/getGroups.gql'

export default {
  name: 'FriendGroupSelect',
  props: ['value'],
  apollo: {
    friendGroups: {
      query: getGroups,
      result({ data, loading, networkStatus }) {
        this.groups = data.friendGroups
      }
    }
  },
  data () {
    return {
      groups: [],
      selected: []
    }
  },
  computed: {
    ...mapGetters('UserModule', ['data'])
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