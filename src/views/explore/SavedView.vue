<template>
  <v-layout column>
    <time-toggle v-model="selectedTimeFrame"></time-toggle>
    <activity-list></activity-list>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import ActivityList from '@/components/elements/lists/ActivityList'
import FilterGroup from '@/components/elements/FilterGroup'
import TimeToggle from '@/components/elements/inputs/TimeToggle'

export default {
  name: 'SavedView',
  data () {
    return {
      selectedTimeFrame: 'Today'
    }
  },
  computed: {
    ...mapGetters('UserModule', ['shortName'])
  },
  components: {
    ActivityList,
    FilterGroup,
    TimeToggle
  }
}
</script>
