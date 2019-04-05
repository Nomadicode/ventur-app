<template>
  <div class="main-container">
    <router-view></router-view>
    <profile-footer></profile-footer>
  </div>
</template>

<script>
import ProfileFooter from '@/components/layouts/footers/ProfileFooter'

export default {
  name: 'ProfileMainView',
  components: {
    ProfileFooter
  }
}
</script>
