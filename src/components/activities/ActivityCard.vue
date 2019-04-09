<template>
  <v-dialog
    fullscreen
    light
    v-model="modal">
    <v-card class="activity-card">
      <v-img
        :src="DefaultActivityImage"
        :height="175">
        <v-btn
          dark
          icon
          @click="close()">
          <v-icon>close</v-icon></v-btn>

        <el-button
          type="text"
          size="medium"
          class="position--top-right space-right--half warning-text"
          @click="toggleReportMenu()">
          report
          <!-- <v-icon class="accent-color">more_vert</v-icon> -->
        </el-button>
        <direction-button
          v-if="activity && activity.location"
          class="position--bottom-right"
          :latitude="activity.location.latitude"
          :longitude="activity.location.longitude"></direction-button>
      </v-img>

      <v-card-title class="header position--relative">
        <h4 class="title">{{ activity.name }}</h4>

        <div class="details">
          <div v-if="activity && activity.location" class="location">{{ activity.location.address }}</div>
          <v-layout>
            <div class="price">{{ price }}</div>
            <v-spacer />
            <div class="duration">{{ activityDuration }}</div>
          </v-layout>
        </div>
        <restriction-box
          :over18="activity.over18"
          :over21="activity.over21"
          :kidFriendly="activity.kidFriendly"
          :handicapFriendly="activity.handicapFriendly"></restriction-box>
      </v-card-title>

      <v-card-text class="body" v-html="activity.description">
      </v-card-text>

      <v-card-actions class="fix-bottom pad-bottom--half fill-width">
        <v-btn
          color="error"
          round
          outline
          fab
          @click="reject()"
          ><v-icon>close</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="muted"
          flat
          @click="fetchActivity()"
          ><v-icon>shuffle</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          round
          outline
          fab
          @click="accept()"
          ><v-icon>check</v-icon></v-btn>
      </v-card-actions>
    </v-card>

    <report-modal :activityId="parseInt(activity.id)" :open="showReportMenu" @close="toggleReportMenu()"></report-modal>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import DefaultActivityImage from '@/assets/images/default_activity.jpg'
import DirectionButton from '@/components/elements/buttons/DirectionButton'
import ReportModal from '@/components/modals/ReportModal'
import RestrictionBox from '@/components/elements/RestrictionBox'

export default {
  name: 'ActivityCard',
  apollo: {
    randomActivity: {
      query: gql`query {
        randomActivity {
          id
          name
          price
          duration
          description
          over18
          over21
          kidFriendly
          handicapFriendly
          location {
            address
            latitude
            longitude
          }
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.activity = data.randomActivity
        this.loading = false
      },
      error (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.modal = this.activityCard
  },
  data () {
    return {
      DefaultActivityImage: DefaultActivityImage,
      modal: false,
      showReportMenu: false,
      activity: {}
    }
  },
  computed: {
    ...mapGetters('AppState', ['activityCard']),
    activityDuration () {
      var duration = (this.activity.duration >= 60) ? this.activity.duration / 60 : this.activity.duration
      var interval = (this.activity.duration / 60 >= 1) ? 'h' : 'm'

      return duration + interval
    },
    price () {
      if (this.activity.price) {
        return '$' + parseFloat(Math.round(this.activity.price * 100) / 100).toFixed(2)
      } else {
        return 'FREE'
      }
    }
  },
  methods: {
    accept () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation AcceptActivity($activity: Int!){
          acceptActivity(activity: $activity) {
            success
            error
            activity {
              accepted
            }
          }
        }`,
        variables: {
          activity: parseInt(self.activity.id)
        }
      }).then((response) => {
        var data = response.data.acceptActivity
        if (data.success) {
          // Pass
        } else {
          this.flash('Error: ' + data.error, 'error', {
            timeout: 3000
          })
        }
      }).catch((error) => {
        // Show error
        this.flash('Error: ' + error, 'error', {
          timeout: 3000
        })
      })
    },
    close () {
      this.activity = {}
      this.$store.commit('AppState/CLOSE_ACTIVITY_CARD')
    },
    fetchActivity () {
      this.$apollo.queries.randomActivity.refetch()
    },
    reject () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation RejectActivity($activity: Int!){
          rejectActivity(activity: $activity) {
            success
            error
            activity {
              rejected
            }
          }
        }`,
        variables: {
          activity: parseInt(self.activity.id)
        }
      }).then((response) => {
        var data = response.data.rejectActivity
        if (data.success) {
          // Pass
          self.refresh()
        } else {
          this.flash('Error: ' + data.error, 'error', {
            timeout: 3000
          })
        }
      }).catch((error) => {
        // Show error
        this.flash('Error: ' + error, 'error', {
          timeout: 3000
        })
      })
    },
    toggleReportMenu () {
      this.showReportMenu = !this.showReportMenu
    }
  },
  watch: {
    activityCard () {
      this.modal = this.activityCard
    },
    modal () {
      if (this.modal === false) {
        this.$store.commit('AppState/CLOSE_ACTIVITY_CARD')
      } else {
        this.fetchActivity()
        this.$store.commit('AppState/OPEN_ACTIVITY_CARD')
      }
    }
  },
  components: {
    DirectionButton,
    ReportModal,
    RestrictionBox
  }
}
</script>
