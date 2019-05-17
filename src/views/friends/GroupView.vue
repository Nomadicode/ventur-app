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
      placeholder="Search groups"></v-text-field>

    <group-list></group-list>
  </div>
</template>

<script>
import GroupList from '@/components/friends/groups/GroupList'

export default {
  name: 'GroupListView',
  components: {
    GroupList
  }
}
</script>
