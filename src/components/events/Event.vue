<template>
  <v-dialog
    ref="event"
    content-class="event-container"
    :z-index=5
    full-width
    fullscreen
    scrollable
    hide-overlay
    persistent
    v-model="modal">
    <v-card class="event">
      <v-toolbar
        flat
        :fixed="true"
        :height="50"
        :elevation="0"
        class="header"
        :class="{
          'scrolled': scrolled
        }">
        <v-layout row>
          <v-flex xs2>
            <v-btn
              dark
              icon
              @click="close">
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
          <v-spacer />
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
                    class="secondary-text"
                    @click="shareActivity">
                    <v-icon size="14px" class="pad-right--quarter">fa fa-share</v-icon>
                    share</v-list-tile-title>
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
      </v-toolbar>
      <v-card-text ref="eventBody">
        <v-img
          :gradient="'rgba(0,0,0,0), rgba(0,0,0,0.4)'"
          :src="eventImage"
          :height="225"
          :width="'100%'">
          <v-speed-dial
            v-if="createdByUser"
            class="settings-btn"
            v-model="fab"
            direction="left"
            absolute
            bottom
            right>
            <template v-slot:activator>
              <v-btn
                v-model="fab"
                color="blue darken-2"
                dark
                small
                fab
              >
                <v-icon>settings</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
            </template>
            <v-btn
              fab
              dark
              small
              color="red"
              @click="deleteActivity">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-img>

        <div class="pad-sides--half">
          <v-layout
            class="header-segment"
            justify-start
            align-center
            row
            wrap>
            <v-flex xs9>
              <h4 class="title" v-if="event.name">{{ event.name }}</h4>
            </v-flex>
            <v-flex 
              class="align-right"
              xs3>
              <v-btn
                icon
                @click="toggleSave">
                <v-icon
                  v-if="!event.saved"
                  size="16px">far fa-heart</v-icon>
                <v-icon
                  v-if="event.saved"
                  size="16px"
                  class="primary-color">fa fa-heart</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>

          <v-layout class="header-segment" row>
            <v-flex xs6>
              <div v-if="event && event.location" class="location">
                <div class="name" v-if="event.location.name">{{ event.location.name }}</div>
                <div class="address" v-html="formatAddress(event.location.address)"></div>
              </div>
            </v-flex>
            <v-spacer />
            <v-flex xs5 class="align-right position--relative">
              <restriction-box
                :isNsfw="event.isNsfw"
                :alcoholPresent="event.alcoholPresent"
                :handicapFriendly="event.handicapFriendly"></restriction-box>
              
              <div class="age-range-display">{{ ageRange }}</div>
            </v-flex>
          </v-layout>

          <date-scroller class="space-top--half">
            <date-scroll-item
              v-for="(date, index) of event.upcomingDates"
              :key="'date-' + index"
              :alwaysAvailable="date.alwaysAvailable"
              :startDate="date.startDate"
              :endDate="date.endDate"></date-scroll-item>
          </date-scroller>

          <div class="body" v-html="event.description"></div>
        </div>

        <div class="footer-actions">
          <v-layout row>
            <v-flex>
              <div class="price-display">{{ price }}</div>
              <!-- <el-button
                v-if="false"
                plain
                type="danger"
                size="small">Buy Tickets</el-button> -->
            </v-flex>
            <v-spacer />
            <v-flex class="align-right">
              <direction-button
                v-if="event.location"
                :name="event.location.name"
                :address="event.location.address"
                :latitude="event.location.latitude"
                :longitude="event.location.longitude"></direction-button>
            </v-flex>
          </v-layout>
        </div>
      </v-card-text>
    </v-card>

    <report-modal
      :activityId="event.pk"
      :open="showReportMenu"
      @refresh="close"
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
import removeEvent from '@/graphql/events/mutations/removeEvent.gql'

import DefaultActivityImage from '@/assets/images/default_activity.jpg'
import DirectionButton from '@/components/elements/buttons/DirectionButton'
import { DateScroller, DateScrollItem } from '@/components/elements/date-scroller'
import EventEditModal from '@/components/modals/EventEditModal'
import ReportModal from '@/components/modals/ReportModal'
import RestrictionBox from '@/components/elements/RestrictionBox'

export default {
  name: 'Event',
  mounted () {
    var self = this
    this.$refs.event.stackMinZIndex = 3

    this.$refs.eventBody.onscroll = (elem) => {
      var scrollPos = elem.target.scrollTop

      if (scrollPos < 100) {
        self.scrolled = false
      } else {
        self.scrolled = true
      }
    }
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
      },
      function (error) {
        self.$message({
          type: 'error',
          message: 'Unable to find your location, please make sure location services are enabled'
        })
        window.EventBus.$emit('loading:event-random', false)
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
      },
      function (error) {
        self.$message({
          type: 'error',
          message: 'Unable to find your location, please make sure location services are enabled'
        })
        window.EventBus.$emit('loading:event', value, false)
      })
    })
  },
  data () {
    return {
      DefaultActivityImage: DefaultActivityImage,
      modal: false,
      fab: false,
      showReportMenu: false,
      event: {},
      scrolled: false
    }
  },
  computed: {
    ...mapGetters('UserModule', ['userId']),
    ...mapGetters('AppState', ['currentLocation']),
    eventImage () {
      return this.event && this.event.media ? this.event.media : DefaultActivityImage
    },
    createdByUser () {
      if (this.event && this.event.createdBy) {
        return this.event.createdBy.id === this.userId
      }
      return false
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
    ageRange () {
      if (this.event.minimumAge === 0 && this.event.maximumAge === 65) {
        return 'all ages'
      }

      if (this.event.minimumAge === this.event.maximumAge) {
        return this.event.minimumAge
      }

      var minDisplay = this.event.minimumAge
      var maxDisplay = this.event.maximumAge
      if (this.event.minimumAge === 0) {
        minDisplay = '<5'
      }

      if (this.event.maximumAge === 65) {
        maxDisplay = '65+'
      }

      return 'ages ' + minDisplay + ' - ' + maxDisplay
    }
  },
  methods: {
    formatAddress (address) {
      var addressHtml = '<div>'

      var addressComp = address.split(',')

      addressHtml += '<div>' + addressComp.splice(0, 1) + '</div>'
      addressHtml += '<div>' + addressComp.join(', ') + '</div>'

      return addressHtml
    },
    toggleSave () {
      if (this.event.saved) {
        this.unsaveActivity()
      } else {
        this.saveActivity()
      }
    },
    toggleAddress () {
      this.viewAddress = !this.viewAddress
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
    close (refresh = false) {
      this.event = {}
      this.modal = false
      if (refresh === true) {
        window.EventBus.$emit('events:refresh')
      }
      this.$emit('close')
    },
    deleteActivity () {
      var self = this
      this.$confirm('Are you sure you want to remove this activity? (this cannot be undone)')
        .then((response) => {
          self.$apollo.mutate({
            mutation: removeEvent,
            variables: {
              pk: self.event.id
            }
          }).then((response) => {
            self.close(true)
          })
        })
    },
    editActivity () {
      // window.EventBus.$emit('event:edit', this.event.id)
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
      if (self.currentLocation) {
        return this.$apollo.query({
          query: getRandomEvent,
          variables: self.currentLocation,
          fetchPolicy: 'no-cache'
        }).then(function (response) {
          self.event = response.data.randomActivity
          return Promise.resolve(response)
        },
        function (error) {
          self.$message({
            type: 'error',
            message: 'Unable to fetch an event'
          })
          window.EventBus.$emit('loading:event-random', false)
          return Promise.reject(new Error('Fetch Error'))
        })
      } else {
        return Promise.reject(new Error('LocationMissing'))
      }
    },
    shareActivity () {
      if (window.plugins && window.plugins.socialsharing) {
        var self = this
        var eventImg = this.event ? [this.event.media] : null
        var options = {
          'message': `Check out this event on Driftr: (${this.event.name})`,
          'subject': 'Check out this event on Driftr',
          'files': eventImg,
          'url': 'https://driftr.app/events/' + this.event.id
        }
        window.plugins.socialsharing.shareWithOptions(options, function (success) {
          self.$message({
            type: 'success',
            message: 'You have successfully shared this event!'
          })
        }, function (error) {
          self.$message({
            type: 'error',
            message: 'An error occurred while attempting to share this event.'
          })
        })
      }
    },
    toggleReportMenu () {
      this.showReportMenu = !this.showReportMenu
    }
  },
  components: {
    DateScrollItem,
    DateScroller,
    DirectionButton,
    EventEditModal,
    ReportModal,
    RestrictionBox
  }
}
</script>
