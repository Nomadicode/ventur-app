<template>
  <v-layout row wrap class="restriction-box">
    <v-flex
      v-if="over18"
      xs6>
      <v-chip
        small
        disabled
        color="warning">Over 18</v-chip>
    </v-flex>
    <v-flex
      v-if="over21"
      xs6>
      <v-chip
        small
        disabled
        color="error">Over 21</v-chip>
    </v-flex>
    <v-flex
      v-if="kidFriendly"
      xs6>
      <v-chip
        small
        disabled
        color="green">Kid Friendly</v-chip>
    </v-flex>
    <v-flex
      v-if="handicapFriendly"
      xs6>
      <v-chip
        small
        disabled
        color="blue">Handicap Friendly</v-chip>
    </v-flex>
  </v-layout>
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
