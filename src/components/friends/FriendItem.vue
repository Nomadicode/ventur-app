<template>
  <v-layout class="friend" row wrap>
    <v-flex
      class="base-light-background pad-quarter"
      xs3
      align-self-top>
      <v-img
        :src="avatarImage"
        aspect-ratio="1"
        height="50"
        contain
      />
    </v-flex>
    <v-flex xs8>
      <div class="pad-sides--half pad-top--quarter">
        <h6>{{ friend.name }}</h6>
        <v-layout
          v-if="isRequest"
          class="pad-top--quarter"
          row
          wrap>
          <v-flex xs5>
            <!-- <p class="suggest-reason">6 shared activities</p> -->
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
          <v-flex xs10>
            <!-- <p class="suggest-reason">6 shared activities</p> -->
          </v-flex>
          <v-flex xs2>
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
      </div>
    </v-flex>
    <group-add-modal
      :friendId="friend.pk"
      :show="groupModalVisible"
      @close="closeGroupAddModal"></group-add-modal>
  </v-layout>
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
