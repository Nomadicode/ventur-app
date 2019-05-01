<template>
  <v-card
    light>
    <v-card-title>{{ item.name }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'GroupItem',
  props: ['item'],
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>
