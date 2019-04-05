<template>
  <v-app dark>
    <router-view name="header"></router-view>

    <v-content>
      <v-container :fill-height="!$auth.isAuthenticated()" class="pad-top--none" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <router-view name="footer"></router-view>
    <about-modal v-if="$auth.isAuthenticated()"></about-modal>
    <feedback-modal v-if="$auth.isAuthenticated()"></feedback-modal>
  </v-app>
</template>

<script>
import MainHeader from '@/components/layouts/MainHeader'
import NavDrawer from '@/components/layouts/NavDrawer'

import AboutModal from '@/components/modals/AboutModal'
// import ActivityModal from '@/components/modals/ActivityModal'
import FeedbackModal from '@/components/modals/FeedbackModal'
// import FriendModal from '@/components/modals/FriendModal'
// import RandomModal from '@/components/modals/RandomModal'
// import ReportModal from '@/components/modals/ReportModal'

export default {
  name: 'App',
  components: {
    MainHeader,
    NavDrawer,

    AboutModal,
    FeedbackModal
  }
}
</script>

<style>
</style>
