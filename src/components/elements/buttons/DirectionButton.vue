<template>
  <a
    class="direction-btn el-button el-button--primary el-button--small"
    :href="geoLink"
    target="_blank">
    Directions
    <v-icon class="font-small">near_me</v-icon>
  </a>
</template>

<script>
export default {
  name: 'DirectionButton',
  props: ['name', 'address', 'latitude', 'longitude'],
  computed: {
    geoLink () {
      var platform = (typeof device !== 'undefined') ? device.platform : this.getDevice()

      var protocol = 'geo:0,0?q='
      if (platform === 'iOS') {
        protocol = 'http://maps.apple.com/?q='
      } 
      
      if (this.name) {
        return protocol + this.name
      } else if (this.address) {
        return protocol + this.address
      } else {
        return protocol + this.latitude + ',' + this.longitude
      }
    }
  },
  methods: {
    getDevice () {
      var platform = navigator.platform

      if (platform === 'iPhone' || platform === 'iPad' || platform === 'iPod') {
        return 'iOS'
      }
      return 'Android'
    }
  }
}
</script>
