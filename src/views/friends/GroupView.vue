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
      placeholder="Search groups"></v-text-field>

      <group-list></group-list>
  </v-layout>
</template>

<script>
import GroupList from '@/components/friends/GroupList'

export default {
  name: 'GroupListView',
  components: {
    GroupList
  }
}
</script>
