<template>
  <friend-list :filter="filter"></friend-list>
</template>

<script>
import FriendList from '@/components/friends/FriendList'

export default {
  name: 'FriendsTab',
  props: ['filter'],
  components: {
    FriendList
  }
}
</script>
