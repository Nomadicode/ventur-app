<template>
  <div>
    <v-flex class="horizontal-center" sm12 md12 lg12>
      <div class="center--absolute">
        <h1 class="">Welcome {{ shortName }}!</h1>
        <escape-button @click.native="$store.commit('AppState/OPEN_ACTIVITY_CARD')"></escape-button>
      </div>
    </v-flex>

    <activity-card></activity-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActivityCard from '@/components/activities/ActivityCard'
import EscapeButton from '@/components/elements/buttons/EscapeButton'

export default {
  name: 'ShuffleView',
  computed: {
    ...mapGetters('UserModule', ['shortName'])
  },
  components: {
    ActivityCard,
    EscapeButton
  }
}
</script>
