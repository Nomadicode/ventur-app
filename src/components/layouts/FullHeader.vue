<template>
  <div>
    <main-header></main-header>
    <nav-drawer></nav-drawer>
  </div>
</template>

<script>
import MainHeader from '@/components/layouts/MainHeader'
import NavDrawer from '@/components/layouts/NavDrawer'

export default {
  name: 'FullHeader',
  components: {
    MainHeader,
    NavDrawer
  }
}
</script>
