<template>
  <v-dialog
    light
    v-model="modal"
    :content-class="'group-add-modal'"
  >
    <v-card light>
      <v-card-title>
        <v-layout
          light
          align-center
          justify-center
          row
          wrap>
          <v-flex xs8>
            <p>Add friend to group</p>
          </v-flex>
          <v-spacer />
          <v-flex xs2>
            <v-btn
              flat
              icon
              @click="close">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <el-select
          class="fill-width"
          v-model="groupToAdd"
          placeholder="Select group">
          <el-option
            v-for="item in groups"
            :key="item.pk"
            :label="item.name"
            :value="item.pk">
          </el-option>
        </el-select>
      </v-card-text>

      <v-card-actions>
        <el-button
          class="primary-background fill-width"
          :disabled="groupToAdd == null && friendId == null"
          type="primary"
          @click="addToGroup()">Add to Group(s)</el-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import getGroups from '@/graphql/groups/queries/getGroups.gql'
import addFriendToGroup from '@/graphql/friends/mutations/addFriendToGroup.gql'

export default {
  name: 'GroupAddModal',
  props: {
    friendId: {
      default: null,
      type: String
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  apollo: {
    friendGroups: {
      query: getGroups,
      result ({ data, loading, networkStatus }) {
        this.groups = (data) ? data.friendGroups : []
        this.loading = false
      }
    }
  },
  data () {
    return {
      modal: false,
      groups: [],
      groupToAdd: null
    }
  },
  methods: {
    addToGroup () {
      var self = this
      this.$apollo.mutate({
        mutation: addFriendToGroup,
        variables: {
          groupId: this.groupToAdd,
          memberId: this.friendId
        }
      }).then((response) => {
        window.EventBus.$emit('group:friend-add')
        self.close()
      })
    },
    close () {
      this.modal = false
    }
  },
  watch: {
    show () {
      this.modal = this.show
    },
    modal () {
      if (!this.modal) {
        this.$emit('close')
      }
    }
  }
}
</script>
