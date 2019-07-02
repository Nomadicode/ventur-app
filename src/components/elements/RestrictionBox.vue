<template>
  <div class="restriction-box">
    <v-chip
      v-if="isNsfw"
      small
      disabled
      color="warning">
      <v-icon size="14px">fas fa-ban</v-icon>
    </v-chip>
    <v-chip
      v-if="alcoholPresent"
      small
      disabled
      color="error">
      <v-icon size="14px">fas fa-glass-martini-alt</v-icon>
    </v-chip>
    <v-chip
      v-if="handicapFriendly"
      small
      disabled
      color="blue">
      <v-icon size="16px">fa fa-wheelchair</v-icon>
    </v-chip>
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
