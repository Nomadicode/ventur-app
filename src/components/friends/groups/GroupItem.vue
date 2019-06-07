<template>
  <v-card
    class="group-card"
    elevation="1"
    light>
    <v-card-title>
      <v-layout
        row
        wrap>
          <v-flex
            align-self-center
            xs10
            @click="expanded = !expanded">{{ item.name }} ({{ item.friends.length }})</v-flex>
          <v-spacer />
          <v-flex xs1>
            <v-menu light left offset-x>
              <template v-slot:activator="{ on }">
                <el-button
                  v-on="on"
                  plain
                  type="text"
                  size="mini">
                  <v-icon
                    size="18">more_vert</v-icon>
                </el-button>
              </template>
              <v-list class="more-menu">
                <v-list-tile>
                  <v-list-tile-title
                    @click="showMenu = !showMenu">rename group</v-list-tile-title>
                </v-list-tile>
                <v-divider />
                <v-list-tile
                  class="remove-btn"
                  @click="deleteGroup">
                  <v-list-tile-title>delete group</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
      </v-layout>
    </v-card-title>

    <v-card-text v-if="expanded">
      <v-list>
        <group-list-friend-item
          v-for="friend in item.friends"
          :key="friend.id"
          :item="friend"
          :groupName="item.name"
          :groupId="item.id"
          @refresh="refresh"></group-list-friend-item>
      </v-list>
    </v-card-text>

    <group-edit-modal
      :groupId="item.pk"
      :groupName="item.name"
      :show="showMenu"
      @refresh="refresh"
      @close="closeModal"></group-edit-modal>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import GroupListFriendItem from './FriendItem'
import GroupEditModal from '@/components/modals/groups/EditModal'

export default {
  name: 'GroupItem',
  props: ['item'],
  data () {
    return {
      expanded: false,
      showMenu: false,
      newName: ''
    }
  },
  methods: {
    closeModal () {
      this.showMenu = false
    },
    deleteGroup () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation RemoveFriendGroup ($pk: Int!) {
          removeFriendGroup (pk: $pk) {
            success
            error
          }
        }`,
        variables: {
          pk: this.item.pk
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    },
    refresh () {
      this.$emit('refresh')
      this.closeModal()
    }
  },
  components: {
    GroupListFriendItem,
    GroupEditModal
  }
}
</script>
