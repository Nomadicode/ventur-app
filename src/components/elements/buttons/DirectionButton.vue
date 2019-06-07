<template>
  <el-button
    :href="geoLink"
    type="primary">
    Directions
    <v-icon class="font-small">near_me</v-icon>
  </el-button>
</template>

<script>
export default {
  name: 'DirectionButton',
  props: ['latitude', 'longitude'],
  computed: {
    geoLink () {
      return 'geo:' + this.latitude + ',' + this.longitude
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
