<template>
  <div class="restriction-box">
    <v-icon
      v-if="isNsfw"
      color="error"
      size="20px">fas fa-ban</v-icon>
    <v-icon
      v-if="alcoholPresent"
      color="warning"
      size="20px">fas fa-glass-martini-alt</v-icon>
    <v-icon
      v-if="handicapFriendly"
      color="blue"
      size="20px">fa fa-wheelchair</v-icon>
  </div>
</template>

<script>
export default {
  name: 'RestrictionBox',
  props: {
    isNsfw: {
      type: Boolean,
      default: false
    },
    alcoholPresent: {
      type: Boolean,
      default: false
    },
    handicapFriendly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
