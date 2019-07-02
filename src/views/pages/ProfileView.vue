<template>
  <div class="profile-container">
    <account v-if="active === 'account'"></account>
    <accessibility v-if="active === 'accessibility'"></accessibility>
    <security-settings v-if="active === 'security'"></security-settings>
    <app-settings v-if="active === 'app'"></app-settings>
    <support v-if="active === 'support'"></support>
    <about v-if="active === 'about'"></about>

    <profile-menu @open="loadPage"></profile-menu>
  </div>
</template>

<script>
import About from '@/components/profile/About.vue'
import Accessibility from '@/components/profile/Accessibility.vue'
import Account from '@/components/profile/Account.vue'
import AppSettings from '@/components/profile/AppSettings.vue'
import SecuritySettings from '@/components/profile/Security.vue'
import Support from '@/components/profile/Support.vue'

import ProfileMenu from '@/components/modals/ProfileMenu.vue'

export default {
  name: 'ProfileView',
  data () {
    return {
      active: 'account'
    }
  },
  methods: {
    loadPage (value) {
      this.active = value
    }
  },
  components: {
    About,
    Accessibility,
    Account,
    AppSettings,
    ProfileMenu,
    SecuritySettings,
    Support
  }
}
</script>
