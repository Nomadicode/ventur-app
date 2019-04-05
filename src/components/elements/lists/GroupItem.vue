<template>
  <v-expansion-panel-content class="space-bottom--half group-panel">
    <div class="pad-ends--half space-sides--half group-header" slot="header">{{ item.name }} ({{ item.friends.length }}) <el-icon>more</el-icon></div>
    <v-card>
      Test
    </v-card>
  </v-expansion-panel-content>
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

<style lang="scss" scoped>
  .v-expansion-panel__container--active {
    .group-header {
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
  }
  .group-panel {
    border-radius: 5px;
  }
</style>
