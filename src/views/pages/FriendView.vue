<template>
  <div
    class="fill-width">
    <el-input
      class="search-field"
      placeholder="search friends"
      size="mini"
      suffix-icon="el-icon-search"></el-input>

    <div class="tab-group horizontal-center">
      <v-btn
        class="tab"
        :class="{'active': tab === 'friends'}"
        flat
        small
        @click="setTab('friends')">Friends</v-btn> |
      <v-btn
        class="tab"
        :class="{'active': tab === 'groups'}"
        flat
        small
        @click="setTab('groups')">Groups</v-btn>
    </div>

    <friends-tab v-if="tab === 'friends'"></friends-tab>
    <groups-tab v-if="tab === 'groups'"></groups-tab>

    <v-speed-dial
      color="primary"
      class="primary-action"
      bottom
      right
      fab
      fixed
      v-model="fab"
      :direction="'top'"
      :transition="'slide-y-reverse-transition'">
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          small
          fab
        >
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="blue"
        @click="openFriendAddModal">
        <v-icon>people_outline</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="openGroupAddModal">
        <v-icon>group_work</v-icon>
      </v-btn>
    </v-speed-dial>

    <friend-modal class="friends"></friend-modal>
    <group-create-modal></group-create-modal>
  </div>
</template>

<script>
import FriendList from '@/components/friends/FriendList'

import FriendsTab from '@/components/friends/FriendsTab'
import GroupsTab from '@/components/friends/GroupsTab'

import FriendModal from '@/components/modals/FriendAddModal'
import GroupCreateModal from '@/components/modals/groups/CreateModal'

export default {
  name: 'FriendView',
  data () {
    return {
      fab: false,
      tab: 'friends'
    }
  },
  methods: {
    setTab (value) {
      this.tab = value
    },
    openFriendAddModal () {
      window.EventBus.$emit('friend:add')
    },
    openGroupAddModal () {
      window.EventBus.$emit('group:add')
    }
  },
  components: {
    FriendsTab,
    GroupsTab,
    FriendList,
    FriendModal,
    GroupCreateModal
  }
}
</script>
