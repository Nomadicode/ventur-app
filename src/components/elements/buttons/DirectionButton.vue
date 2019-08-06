<template>
  <a
    class="direction-btn el-button space-right--half el-button--primary el-button--small"
    :href="geoLink"
    target="_blank">
    Directions
    <v-icon class="font-small">near_me</v-icon>
  </a>
</template>

<script>
export default {
  name: 'DirectionButton',
  props: ['address', 'latitude', 'longitude'],
  computed: {
    geoLink () {
      return 'geo:0,0?q=' + this.latitude + ',' + this.longitude
    }
  }
}
</script>

<style lang="scss" scoped>
  .font-small {
    font-size: inherit;
    color: #FFFFFF;
  }
</style>
