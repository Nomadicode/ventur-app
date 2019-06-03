<template>
  <div>
    <v-flex class="horizontal-center" sm12 md12 lg12>
      <div class="center--absolute">
        <h1 class="">Welcome {{ shortName }}!</h1>
        <escape-button v-if="!loading" @click.native="showRecommendation = true"></escape-button>
        <loading-icon style="width: 40%;" v-if="loading"></loading-icon>
      </div>
    </v-flex>

    <activity-card
      v-model="showRecommendation"
      @close="showRecommendation = false"
      @loading="($evt) => { loading = $evt }"
      @no-result="showEmptyMessage"></activity-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActivityCard from '@/components/activities/ActivityCard'
import EscapeButton from '@/components/elements/buttons/EscapeButton'
import LoadingIcon from '@/components/elements/LoadingIcon'

export default {
  name: 'ShuffleView',
  data () {
    return {
      loading: false,
      showRecommendation: false
    }
  },
  computed: {
    ...mapGetters('UserModule', ['shortName'])
  },
  methods: {
    showEmptyMessage () {
      this.$message({
        type: 'error',
        message: 'No activities available.'
      })
    }
  },
  components: {
    ActivityCard,
    EscapeButton,
    LoadingIcon
  }
}
</script>
