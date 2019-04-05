<template>
  <div>
    <el-button
      size="mini"
      class="fill-width space-ends--quarter"
      @click="addGroup">Add Group</el-button>
    <div v-if="(!groups || groups.length === 0) && !loading" class="lighter-text empty-list">No groups found
      <el-button
        class="white-text add-btn"
        type="text"
        @click="addGroup">
        add a new group
      </el-button>
    </div>

    <v-expansion-panel
      expand
      popout
      light>
      <group-item v-for="group of groups" :key="group.id" :item="group"></group-item>
    </v-expansion-panel>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import GroupItem from './GroupItem'

export default {
  name: 'GroupList',
  apollo: {
    friendGroups: {
      query: gql`query {
        friendGroups {
          id
          name
          friends {
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
      this.$prompt('Give your group a name', 'Create a group', {
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
    }
  },
  components: {
    GroupItem
  }
}
</script>

<style lang="scss" scoped>
.group-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
