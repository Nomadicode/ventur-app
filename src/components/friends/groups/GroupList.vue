<template>
  <div class="list">
    <div class="group-list">
      <group-item
        v-for="group of groups"
        :key="group.id"
        :item="group"
        @refresh="refetch"></group-item>

      <el-button
        size="mini"
        v-if="hasMore && !$apollo.loading"
        class="fill-width"
        @click="fetchNext">Load More</el-button>

      <div v-if="(!groups || groups.length === 0) && !$apollo.loading" class="empty">
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
import getFriendGroupsPaged from '@/graphql/groups/queries/getFriendGroups.gql'

import GroupItem from './GroupItem'

export default {
  name: 'GroupList',
  props: ['filter'],
  apollo: {
    friendGroupsPaged: {
      pollInterval: 10000,
      query: getFriendGroupsPaged,
      variables () {
        return {
          'query': this.filter,
          'first': 10,
          'after': this.cursor
        }
      },
      result ({ data, loading, networkStatus }) {
        if (data) {
          this.hasMore = data.friendGroupsPaged.pageInfo.hasNextPage

          var groups = data.friendGroupsPaged.edges
          var newGroups = groups.map(x => x.node)

          if (this.cursor) {
            this.groups = this.groups.concat(newGroups)
          } else {
            this.groups = newGroups
          }

          if (groups.length > 0) {
            this.nextCursor = groups[groups.length - 1]['cursor']
          }
        }
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
      cursor: null,
      nextCursor: null,
      hasMore: false,
      groups: []
    }
  },
  methods: {
    openGroupAddModal () {
      window.EventBus.$emit('group:add')
    },
    refetch () {
      if (this.$apollo.queries) {
        this.$apollo.queries.friendGroupsPaged.refetch()
      }
    },
    fetchNext () {
      this.cursor = this.nextCursor
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
