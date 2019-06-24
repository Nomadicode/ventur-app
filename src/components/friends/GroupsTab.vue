<template>
  <group-list :filter="filter"></group-list>
</template>

<script>
import GroupList from '@/components/friends/groups/GroupList'

export default {
  name: 'GroupsTab',
  props: ['filter'],
  components: {
    GroupList
  }
}
</script>
