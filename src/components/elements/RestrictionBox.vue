<template>
  <div class="restriction-box">
    <v-chip
      v-if="over18"
      small
      disabled
      color="warning">18+</v-chip>
    <v-chip
      v-if="over21"
      small
      disabled
      color="error">21+</v-chip>
    <v-chip
      v-if="kidFriendly"
      small
      disabled
      color="green">Kid</v-chip>
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
    over18: {
      type: Boolean,
      default: false
    },
    over21: {
      type: Boolean,
      default: false
    },
    kidFriendly: {
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
