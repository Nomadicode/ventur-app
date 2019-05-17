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
          class="extra-light-text add-btn"
          type="text"
          @click="$store.commit('AppState/OPEN_ADD_GROUP_MODAL')">
          add a group
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
import gql from 'graphql-tag'
import GroupItem from './GroupItem'

export default {
  name: 'GroupList',
  apollo: {
    friendGroups: {
      pollInterval: 10000,
      query: gql`query {
        friendGroups {
          pk
          id
          name
          friends {
            id
            name
            profilePicture
          }
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.groups = data.friendGroups
        this.loading = false
      },
      error (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      loading: false,
      groups: []
    }
  },
  methods: {
    addGroup () {
      var self = this
      this.$prompt('', 'Create a group', {
        confirmButtonText: 'Create Group',
        cancelButtonText: 'Cancel'
      }).then((value) => {
        self.createGroup(value)
      }).catch(() => {})
    },
    createGroup (value) {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation CreateFriendGroup($name: String!){
          createFriendGroup(name: $name) {
            success
            error
            group {
              pk
              id
              name
            }
          }
        }`,
        variables: {
          name: value.value
        }
      }).then((response) => {
        self.$apollo.queries.friendGroups.refetch()
      }).catch((error) => {
        console.log(error)
      })
    },
    refetch () {
      this.$apollo.queries.friendGroups.refetch()
    }
  },
  components: {
    GroupItem
  }
}
</script>
