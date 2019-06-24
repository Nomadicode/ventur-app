<template>
  <v-flex
    xs12
    class="friend">
    <v-card
      flat
      light>
      <v-layout>
        <v-flex xs3>
          <v-img
            :src="avatarImage"
            width="100%"
            height="70"
          ></v-img>
        </v-flex>
        <v-flex
          class="pad-quarter"
          xs9>
          <h6 class="name">{{ friend.name }}
            <span class="handle"> | @{{ friend.handle }}</span>
          </h6>
          <div class="actions">
            <v-menu
              v-if="isFriend"
              light
              left
              offset-x>
              <template v-slot:activator="{ on }">
                <el-button
                  v-on="on"
                  size="mini"
                  icon="el-icon-more"></el-button>
              </template>
              <v-list class="more-menu">
                <v-list-tile
                  @click="addToGroup">
                  <v-list-tile-title>add to group</v-list-tile-title>
                </v-list-tile>
                <v-divider />
                <v-list-tile
                  class="remove-btn"
                  @click="remove">
                  <v-list-tile-title>remove friend</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

            <div
              v-else-if="pendingAcceptFromSelf">
              <el-button
                class="warning-text"
                type="text"
                size="mini"
                @click="reject">Reject</el-button>

              <el-button
                type="primary"
                size="mini"
                @click="accept">Accept</el-button>
            </div>

            <el-button
              v-else-if="pendingAcceptFromRecipient"
              type="danger"
              size="mini"
              @click="cancel">Cancel request</el-button>

            <el-button
              v-else
              type="primary"
              size="mini"
              @click="add">Add Friend</el-button>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
    <group-add-modal
      :friendId="friend.pk"
      :show="groupModalVisible"
      @close="groupModalVisible = false"></group-add-modal>
  </v-flex>
</template>

<script>
import acceptRequest from '@/graphql/friends/mutations/acceptRequest.gql'
import cancelRequest from '@/graphql/friends/mutations/cancelRequest.gql'
import createRequest from '@/graphql/friends/mutations/createRequest.gql'
import rejectRequest from '@/graphql/friends/mutations/rejectRequest.gql'
import removeFriend from '@/graphql/friends/mutations/removeFriend.gql'

import AvatarImage from '@/assets/images/avatar.svg'

import GroupAddModal from '@/components/modals/groups/FriendAddModal'

export default {
  name: 'FriendItem',
  props: {
    friend: {
      type: Object
    },
    isFriend: {
      type: Boolean,
      default: false
    },
    pendingAcceptFromSelf: {
      type: Boolean,
      default: false
    },
    pendingAcceptFromRecipient: {
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
    accept () {
      var self = this
      this.$apollo.mutate({
        mutation: acceptRequest,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      })
    },
    add () {
      var self = this
      this.$apollo.mutate({
        mutation: createRequest,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      })
    },
    addToGroup () {
      this.groupModalVisible = true
    },
    cancel () {
      var self = this
      this.$apollo.mutate({
        mutation: cancelRequest,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      })
    },
    reject () {
      var self = this
      this.$apollo.mutate({
        mutation: rejectRequest,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      })
    },
    remove () {
      var self = this
      this.$apollo.mutate({
        mutation: removeFriend,
        variables: {
          handle: this.friend.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      })
    }
  },
  components: {
    GroupAddModal
  }
}
</script>
