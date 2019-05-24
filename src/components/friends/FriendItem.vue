<template>
  <v-flex
    xs12
    class="friend">
    <v-card
      light>
      <v-layout>
        <v-flex xs3>
          <v-img
            :src="avatarImage"
            width="70"
            height="70"
          ></v-img>
        </v-flex>
        <v-flex xs9>
          <v-card-text class="pad-left--quarter">
            <div class="name">{{ friend.name }}</div>
            <v-layout
              v-if="isRequest"
              class="pad-top--quarter"
              row
              wrap>
              <v-flex xs5>
                <p class="suggest-reason">{{ friend.suggestionReason }}</p>
              </v-flex>
              <v-flex xs4>
                <el-button
                  class="warning-text"
                  type="text"
                  size="mini"
                  @click="rejectFriend">Reject</el-button>
              </v-flex>
              <v-flex xs3>
                <el-button
                  type="primary"
                  size="mini"
                  @click="acceptFriend">Accept</el-button>
              </v-flex>
            </v-layout>

            <v-layout
              v-if="!isRequest"
              class="pad-top--quarter"
              row
              wrap>
              <v-flex xs9>
                <p class="suggest-reason">{{ friend.suggestionReason }}</p>
              </v-flex>
              <v-flex xs3>
                <v-menu light left offset-x>
                  <template v-slot:activator="{ on }">
                    <el-button
                      v-on="on"
                      size="mini"
                      icon="el-icon-more"></el-button>
                  </template>
                  <v-list class="more-menu">
                    <v-list-tile
                      @click="showGroupAddModal">
                      <v-list-tile-title>add to group</v-list-tile-title>
                    </v-list-tile>
                    <v-divider />
                    <v-list-tile
                      class="remove-btn"
                      @click="removeFriend">
                      <v-list-tile-title>remove friend</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
    <group-add-modal
      :friendId="friend.pk"
      :show="groupModalVisible"
      @close="closeGroupAddModal"></group-add-modal>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import AvatarImage from '@/assets/images/avatar.svg'

import GroupAddModal from './GroupAddModal'

export default {
  name: 'FriendItem',
  props: {
    friend: {
      type: Object
    },
    isRequest: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      groupModalVisible: false
    }
  },
  computed: {
    avatarImage () {
      return this.friend.profilePicture ? this.friend.profilePicture : AvatarImage
    }
  },
  methods: {
    acceptFriend () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation AcceptFriendRequest ($handle: String!) {
          acceptFriendRequest (handle: $handle) {
            success
            error
          }
        }`,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    },
    rejectFriend () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation RejectFriendRequest ($handle: String!) {
          rejectFriendRequest (handle: $handle) {
            success
            error
          }
        }`,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    },
    closeGroupAddModal () {
      this.groupModalVisible = false
    },
    showGroupAddModal () {
      this.groupModalVisible = true
    },
    removeFriend () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation RemoveFriend ($handle: String!) {
          removeFriend (handle: $handle) {
            success
            error
          }
        }`,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    }
    // refresh () {
    //   this.$emit('refresh')
    //   this.closeModal()
    // }
  },
  components: {
    GroupAddModal
  }
}
</script>
