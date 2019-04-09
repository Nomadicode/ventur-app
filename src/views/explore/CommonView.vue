<template>
  <v-layout
    align-center
    justify-center>
    <router-view></router-view>
    <v-btn
      color="primary"
      class="primary-action"
      bottom
      right
      fab
      fixed
      @click="$store.commit('AppState/OPEN_ACTIVITY_MODAL')">
      <v-icon>add</v-icon>
    </v-btn>
    <activity-add-modal></activity-add-modal>
  </v-layout>
</template>

<script>
import ActivityAddModal from '@/components/activities/ActivityAddModal'

export default {
  name: 'ExploreCommonView',
  components: {
    ActivityAddModal
  }
}
</script>
