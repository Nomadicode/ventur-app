<template>
  <v-layout
    light
    column>
    <v-text-field
      solo-inverted
      flat
      fill-width
      fixed
      hideDetails
      class="pad-top--half rounded-input"
      append-icon="search"
      placeholder="Search friends"></v-text-field>

    <friend-list></friend-list>
  </v-layout>
</template>

<script>
import FriendList from '@/components/friends/FriendList'

export default {
  name: 'FriendListView',
  components: {
    FriendList
  }
}
</script>
