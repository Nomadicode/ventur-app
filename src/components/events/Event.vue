<template>
  <v-dialog
    v-if="event"
    ref="event"
    content-class="event-container"
    :z-index=5
    full-width
    hide-overlay
    persistent
    lazy
    v-model="modal">
    <v-card class="event">
      <v-img
        :gradient="'rgba(0,0,0,0.4), rgba(0,0,0,0)'"
        :src="eventImage"
        :height="175"
        :width="'100%'">
        <v-layout fill-height column>
          <v-flex xs3>
            <v-layout row>
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
                        class="secondary-text">
                        <v-icon size="14px" class="pad-right--quarter">fa fa-share</v-icon>
                        share</v-list-tile-title>
                    </v-list-tile>
                    <v-divider />
                    <v-list-tile>
                      <v-list-tile-title
                        class="secondary-text">hide</v-list-tile-title>
                    </v-list-tile>
                    <v-divider />
                    <v-list-tile
                      class="remove-btn"
                      @click="toggleReportMenu">
                      <v-list-tile-title>report</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-spacer />
          <v-flex xs3 class="space-bottom--quarter">
            <v-layout
              align-center
              row>
              <v-flex xs4 class="space-left">
                <div class="white-text">{{ price }}</div>
              </v-flex>
              <v-spacer />
              <v-flex xs5 class="align-right">
                <direction-button
                  class="space-right--half"
                  v-if="event && event.location"
                  :latitude="event.location.latitude"
                  :longitude="event.location.longitude"></direction-button>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-img>

      <v-card-title class="header position--relative">
        <v-container class="pad-none">
          <v-layout
            justify-start
            align-start
            row
            wrap>
            <v-flex xs9 class="core-fields">
              <h4 class="title" v-if="event.name">{{ event.name }}</h4>
              <div v-if="event.location" class="location">{{ event.location.address }}</div>
            </v-flex>
            <v-flex xs3 class="date-field">
              <div class="date">{{ date }}</div>
              <div class="time">{{ time }}</div>
            </v-flex>
          </v-layout>
        </v-container>

        <v-layout class="space-top--quarter" row>
          <v-flex xs9>
            <restriction-box
              :isNsfw="event.isNsfw"
              :alcoholPresent="event.alcoholPresent"
              :handicapFriendly="event.handicapFriendly"></restriction-box>
          </v-flex>
          <v-flex xs4 class="align-right">
            <el-button
              :type="event.saved ? 'primary' : 'default'"
              plain
              class="save-btn"
              size="mini"
              @click="toggleSave">
              <v-icon
                v-if="!event.saved"
                size="16px"
                class="pad-right--quarter">far fa-heart</v-icon>
              <v-icon
                v-if="event.saved"
                size="16px"
                class="pad-right--quarter primary-color">fa fa-heart</v-icon>
              <span v-if="!event.saved">save</span>
              <span v-if="event.saved">unsave</span>
              </el-button>
          </v-flex>
        </v-layout>

      </v-card-title>

      <v-card-text class="body" v-html="event.description">
      </v-card-text>
    </v-card>

    <report-modal
      :activityId="event.pk"
      :open="showReportMenu"
      @refresh="fetchActivity"
      @close="toggleReportMenu"></report-modal>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

import getEvent from '@/graphql/events/queries/getEvent.gql'
import getRandomEvent from '@/graphql/events/queries/getRandomEvent.gql'
import saveEvent from '@/graphql/events/mutations/saveEvent.gql'
import unsaveEvent from '@/graphql/events/mutations/unsaveEvent.gql'

import DefaultActivityImage from '@/assets/images/default_activity.jpg'
import DirectionButton from '@/components/elements/buttons/DirectionButton'
import ReportModal from '@/components/modals/ReportModal'
import RestrictionBox from '@/components/elements/RestrictionBox'

export default {
  name: 'Event',
  mounted () {
    this.$refs.event.stackMinZIndex = 3
  },
  created () {
    var self = this
    window.EventBus.$on('load:event-random', () => {
      self.fetchRandomActivity().then(function (response) {
        if (response.data.randomActivity) {
          window.EventBus.$emit('loading:event-random', false)
          if (!self.modal) {
            self.modal = true
          }
        } else {
          self.$message({
            type: 'error',
            message: 'No events found'
          })
          window.EventBus.$emit('loading:event-random', false)
        }
      })
    })

    window.EventBus.$on('load:event', (value) => {
      self.fetchActivity(value).then(function (response) {
        if (response.data.activity) {
          window.EventBus.$emit('loading:event', value, false)
          if (!self.modal) {
            self.modal = true
          }
        } else {
          self.$message({
            type: 'error',
            message: 'Unable to load event'
          })
          window.EventBus.$emit('loading:event', value, false)
        }
      })
    })
  },
  data () {
    return {
      DefaultActivityImage: DefaultActivityImage,
      modal: false,
      showReportMenu: false,
      event: {}
    }
  },
  computed: {
    ...mapGetters('AppState', ['currentLocation']),
    eventImage () {
      return this.event && this.event.media ? this.event.media : DefaultActivityImage
    },
    duration () {
      if (!this.event || !this.event.duration) {
        return null
      }
      var duration = (this.event.duration >= 60) ? this.event.duration / 60 : this.event.duration
      var interval = (this.event.duration / 60 >= 1) ? 'h' : 'm'

      if (duration > 3 && interval === 'h') {
        duration = '>3'
      }
      return duration + interval
    },
    price () {
      if (this.event && this.event.price) {
        return '$' + parseFloat(Math.round(this.event.price * 100) / 100).toFixed(2)
      } else {
        return 'FREE'
      }
    },
    date () {
      if (this.event && this.event.nextOccurrence) {
        return moment(this.event.nextOccurrence).format('MMM D')
      } else if (this.event && this.event.prevOccurrence) {
        return moment(this.event.prevOccurrence).format('MMM D')
      } else {
        return 'Anytime'
      }
    },
    time () {
      if (this.event && this.event.nextOccurrence) {
        return moment(this.event.nextOccurrence).format('h:mm a')
      } else if (this.event && this.event.prevOccurrence) {
        return moment(this.event.prevOccurrence).format('h:mm a')
      } else {
        return null
      }
    }
  },
  methods: {
    toggleSave () {
      if (this.event.saved) {
        this.unsaveActivity()
      } else {
        this.saveActivity()
      }
    },
    saveActivity () {
      var self = this
      this.$apollo.mutate({
        mutation: saveEvent,
        variables: {
          activity: self.event.pk
        }
      }).then(function (response) {
        self.event = response.data.saveActivity.activity.activity
      })
    },
    unsaveActivity () {
      var self = this
      this.$apollo.mutate({
        mutation: unsaveEvent,
        variables: {
          activity: this.event.pk
        }
      }).then(function (response) {
        self.event.saved = false
      })
    },
    close () {
      this.event = {}
      this.modal = false
      this.$emit('close')
    },
    fetchActivity (activityId) {
      var self = this
      window.EventBus.$emit('loading:event', activityId, true)
      return this.$apollo.query({
        query: getEvent,
        variables: {
          pk: activityId
        },
        fetchPolicy: 'no-cache'
      }).then(function (response) {
        self.event = response.data.activity
        return Promise.resolve(response)
      })
    },
    fetchRandomActivity () {
      var self = this
      window.EventBus.$emit('loading:event-random', true)
      return this.$apollo.query({
        query: getRandomEvent,
        variables: self.currentLocation,
        fetchPolicy: 'no-cache'
      }).then(function (response) {
        self.event = response.data.randomActivity
        return Promise.resolve(response)
      })
    },
    toggleReportMenu () {
      this.showReportMenu = !this.showReportMenu
    }
  },
  components: {
    DirectionButton,
    ReportModal,
    RestrictionBox
  }
}
</script>
