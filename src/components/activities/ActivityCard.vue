<template>
  <v-dialog
    fullscreen
    light
    v-model="modal">
    <v-card class="activity-card">
      <v-img
        :gradient="'rgba(0,0,0,0.4), rgba(0,0,0,0)'"
        :src="activityImage"
        :height="175"
        :width="'100%'">
        <v-layout row fill-height>
          <v-flex xs2>
            <v-btn
              dark
              icon
              @click="close">
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex
            class="align-right"
            xs2>
            <v-menu
              light
              left
              offset-x
              z-index="205">
              <template v-slot:activator="{ on }">
                <v-btn
                  flat
                  icon
                  color="white"
                  v-on="on">
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>
              <v-list class="more-menu">
                <v-list-tile>
                  <v-list-tile-title
                    class="secondary-text">hide</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                  class="remove-btn"
                  @click="toggleReportMenu">
                  <v-list-tile-title>report</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>

        <direction-button
          v-if="activity && activity.location"
          class="position--bottom-right"
          :latitude="activity.location.latitude"
          :longitude="activity.location.longitude"></direction-button>
      </v-img>

      <v-card-title class="header position--relative">
        <v-container class="pad-none" fluid>
          <v-layout
            row
            wrap>
            <v-flex xs9>
              <h4 class="title">{{ activity.name }}</h4>
              <div v-if="activity && activity.location" class="location">{{ activity.location.address }}</div>
            </v-flex>
            <v-spacer />
            <v-flex xs2 class="date">
              <div class="detail">{{ price }}</div>
            </v-flex>
          </v-layout>

          <v-layout
            row>
            <v-flex xs6>
              <div class="detail">{{ date }}</div>
            </v-flex>
            <v-spacer />
            <v-flex xs1>
              <div class="detail">{{ duration }}</div>
            </v-flex>
          </v-layout>
          <restriction-box
            :over18="activity.over18"
            :over21="activity.over21"
            :kidFriendly="activity.kidFriendly"
            :handicapFriendly="activity.handicapFriendly"></restriction-box>
        </v-container>
      </v-card-title>

      <v-card-text class="body" v-html="activity.description">
      </v-card-text>

      <v-card-actions class="fix-bottom fill-width pad-bottom--three-quarters">
        <v-layout row fill-height>
          <v-flex
            class="activity-btn"
            xs2>
            <v-btn
              flat
              color="secondary"
              @click="toggleSave">
              <v-icon v-if="activity.saved">fas fa-heart</v-icon>
              <v-icon v-else>far fa-heart</v-icon>
            </v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex
            class="activity-btn align-right"
            xs2>
            <v-btn
              color="muted"
              flat
              @click="fetchActivity">
              <v-icon>shuffle</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

      </v-card-actions>
    </v-card>

    <report-modal
      :activityId="activity.pk"
      :open="showReportMenu"
      @refresh="fetchActivity"
      @close="toggleReportMenu"></report-modal>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import moment from 'moment'

import DefaultActivityImage from '@/assets/images/default_activity.jpg'
import DirectionButton from '@/components/elements/buttons/DirectionButton'
import ReportModal from '@/components/modals/ReportModal'
import RestrictionBox from '@/components/elements/RestrictionBox'

export default {
  name: 'ActivityCard',
  props: ['value'],
  created () {
    this.modal = this.value
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
    ...mapGetters('UserModule', ['currentLocation']),
    activityImage () {
      return this.activity.media ? this.activity.media : DefaultActivityImage
    },
    duration () {
      if (!this.activity.duration) {
        return null
      }
      var duration = (this.activity.duration >= 60) ? this.activity.duration / 60 : this.activity.duration
      var interval = (this.activity.duration / 60 >= 1) ? 'h' : 'm'

      if (duration > 3 && interval === 'h') {
        duration = '>3'
      }
      return duration + interval
    },
    price () {
      if (this.activity.price) {
        return '$' + parseFloat(Math.round(this.activity.price * 100) / 100).toFixed(2)
      } else {
        return 'FREE'
      }
    },
    date () {
      if (this.activity.nextOccurrence) {
        return moment(this.activity.nextOccurrence).format('MMM D @ h:mm a')
      } else if (this.activity.prevOccurrence) {
        return moment(this.activity.prevOccurrence).format('MMM D @ h:mm a')
      } else {
        return 'Anytime'
      }
    }
  },
  methods: {
    toggleSave () {
      if (this.activity.saved) {
        this.unsaveActivity()
      } else {
        this.saveActivity()
      }
    },
    saveActivity () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation SaveActivity ($activity: Int!) {
          saveActivity (activity: $activity) {
            success
            error
            activity {
              activity {
                pk
                id
                name
                media
                price
                duration
                description
                over18
                over21
                kidFriendly
                handicapFriendly
                nextOccurrence
                prevOccurrence
                saved
                location {
                  address
                  latitude
                  longitude
                }
              }
            }
          }
        }`,
        variables: {
          activity: self.activity.pk
        }
      }).then(function (response) {
        self.activity = response.data.saveActivity.activity.activity
      })
    },
    unsaveActivity () {
      this.$apollo.mutate({
        mutation: gql`mutation UnsaveActivity ($activity: Int!) {
          unsaveActivity (activity: $activity) {
            success
            error
          }
        }`,
        variables: {
          activity: this.activity.pk
        }
      }).then(function (response) {
        self.activity = response.data.saveActivity.activity.activity
      })
    },
    close () {
      this.activity = {}
      this.modal = false
      this.$emit('close')
    },
    fetchActivity () {
      var self = this
      console.log('test')
      return this.$apollo.query({
        query: gql`query randomActivity($latitude: Float, $longitude: Float){ 
          randomActivity (latitude: $latitude, longitude: $longitude) {
            pk
            id
            name
            media
            price
            duration
            description
            over18
            over21
            kidFriendly
            handicapFriendly
            nextOccurrence
            prevOccurrence
            saved
            location {
              address
              latitude
              longitude
            }
          }
        }`,
        variables: self.currentLocation
      }).then(function (response) {
        console.log('ok')
        self.activity = response.data.randomActivity
        return Promise.resolve(response)
      })
    },
    toggleReportMenu () {
      this.showReportMenu = !this.showReportMenu
    }
  },
  watch: {
    value () {
      if (this.value) {
        var self = this
        this.$emit('loading', true)
        this.fetchActivity().then(function (response) {
          if (response.data.randomActivity) {
            self.$emit('loading', false)
            self.modal = true
          } else {
            self.$emit('loading', false)
            self.$emit('no-result')
            self.close()
          }
        })
      } else {
        this.close()
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
