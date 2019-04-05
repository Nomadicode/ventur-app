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
    <!-- <activity-modal></activity-modal> -->
    <!-- <explore-footer></explore-footer> -->
  </v-layout>
</template>

<script>
// import ActivityModal from '@/components/modals/ActivityModal'
import ExploreFooter from '@/components/layouts/footers/ExploreFooter'

export default {
  name: 'ExploreCommonView',
  components: {
    // ActivityModal,
    ExploreFooter
  }
}
</script>
