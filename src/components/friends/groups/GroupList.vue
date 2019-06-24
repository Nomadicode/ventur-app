<template>
  <div class="list">
    <div class="group-list">
      <group-item
        v-for="group of groups"
        :key="group.id"
        :item="group"
        @refresh="refetch"></group-item>

      <div v-if="(!groups || groups.length === 0) && !loading" class="empty">
        <p>No groups found</p>
        <el-button
          class="secondary-text add-btn"
          type="text"
          @click="openGroupAddModal">
          add a group
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
import getFriendGroups from '@/graphql/groups/queries/getFriendGroups.gql'

import GroupItem from './GroupItem'

export default {
  name: 'GroupList',
  props: ['filter'],
  apollo: {
    friendGroups: {
      pollInterval: 10000,
      query: getFriendGroups,
      variables () {
        return {
          'query': this.filter
        }
      },
      result ({ data, loading, networkStatus }) {
        this.groups = data.friendGroups
        this.loading = false
      }
    }
  },
  created () {
    var self = this
    window.EventBus.$on('group:created', () => {
      self.refetch()
    })

    window.EventBus.$on('group:friend-add', () => {
      self.refetch()
    })
  },
  data () {
    return {
      loading: false,
      groups: []
    }
  },
  methods: {
    openGroupAddModal () {
      window.EventBus.$emit('group:add')
    },
    refetch () {
      this.$apollo.queries.friendGroups.refetch()
    }
  },
  components: {
    GroupItem
  },
  watch: {
    filter () {
      this.refetch()
    }
  }
}
</script>
