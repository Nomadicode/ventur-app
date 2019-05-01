<template>
  <div class="fill-width">
    <v-text-field
      solo-inverted
      flat
      fill-width
      fixed
      hide-details
      class="pad-ends--quarter rounded-input"
      append-icon="search"
      placeholder="Search friends"></v-text-field>

    <friend-list></friend-list>
  </div>
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
