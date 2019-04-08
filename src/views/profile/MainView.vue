<template>
  <div class="main-container">
    <router-view></router-view>
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
