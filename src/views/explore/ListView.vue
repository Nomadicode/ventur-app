<template>
  <div
    class="fill-width">
    <time-toggle
      class="space-bottom--quarter fill-width horizontal-center"
      v-model="selectedTimeFrame"></time-toggle>

    <activity-list></activity-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActivityList from '@/components/activities/ActivityList'
import TimeToggle from '@/components/elements/inputs/TimeToggle'

export default {
  name: 'ListView',
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
    TimeToggle
  }
}
</script>
