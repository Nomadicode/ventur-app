<template>
  <v-dialog
    fullscreen
    light
    scrollable
    v-model="modal">
    <v-card class="activity-modal modal">
      <v-card-title
        class="primary-background accent-color modal-header"
        primary-title>
        Add Activity
        <v-spacer />
        <v-icon
          class="close"
          @click="close()">close</v-icon>
      </v-card-title>

      <v-card-text class="body">
        <v-layout column>
          <image-uploader v-model="activity.media"></image-uploader>

          <div class="pad-sides pad-top--half pad-bottom--quad">
          <!-- #region Core Data -->
            <label class="pad-bottom--quarter field-label">Activity Name</label>
            <el-input
              v-model="activity.name"
              placeholder="House party"></el-input>

            <label class="pad-top--half pad-bottom--quarter field-label">Location</label>
            <vue-google-autocomplete
                    id="map"
                    classname="el-input__inner"
                    placeholder="Enter location"
                    v-on:placechanged="getAddressData"
                    suffix-icon="el-icon-location"
                    enable-geolocation></vue-google-autocomplete>

            <label class="pad-top--half pad-bottom--quarter field-label">Provide a little more detail <span class="aside">optional</span></label>
            <el-input
              v-model="activity.description"
              type="textarea"
              class="large-text"
              placeholder="Join us for a party at a house. There will be food, games, and fun."></el-input>

            <label class="pad-top--half pad-bottom--quarter field-label">How would you categorize your activity?</label>
            <el-select
              v-model="activity.categories"
              class="fill-width"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="party, dinner, movie">
              <el-option
                v-for="item in categories"
                :key="item.pk"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          <!-- #endregion -->

          <!-- #region Scheduling -->
            <h6 class="section-header">
              <span>Schedule</span>
            </h6>
            <span v-if="!setSchedule" class="section-subheader">Activity will be marked as always available.</span>

            <el-switch
              active-text="Set schedule"
              v-model="setSchedule"></el-switch>

            <v-container v-if="setSchedule" class="pad-none pad-top--quarter" fluid grid-list-sm>
              <date-time-select v-model="activity.startDatetime" dateLabel="Start Date" timeLabel="Start Time"></date-time-select>

              <date-time-select v-model="activity.endDatetime" :min="activity.startDatetime" dateLabel="End Date" timeLabel="End Time"></date-time-select>

              <v-layout row wrap>
                <v-flex xs6>
                  <label class="pad-top--half pad-bottom--quarter field-label">Frequency</label>
                  <el-select
                    class="fill-width"
                    default-first-option
                    v-model="activity.frequency"
                    placeholder="No Repeat">
                    <el-option
                      v-for="item in repeatOptions"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </v-flex>
                <v-spacer />
                <v-flex xs12>
                  <label class="pad-top--half pad-bottom--quarter field-label">Days</label>
                  <day-select v-model="activity.days"></day-select>
                </v-flex>
              </v-layout>
            </v-container>
          <!-- #endregion -->

          <!-- #region Accessibility -->
            <h6 class="section-header"><span>Accessibility</span></h6>
            <v-container class="pad-none pad-top--half" fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex xs5>
                  <label class="pad-bottom--quarter field-label">Price <span class="aside">optional</span></label>
                  <el-input
                    v-model="activity.price"
                    type="number"
                  ></el-input>
                </v-flex>
                <v-spacer />
                <v-flex xs6>
                  <label class="pad-bottom--quarter field-label">Duration <span class="aside">optional</span></label>
                  <el-select
                    v-model="activity.duration"
                    class="fill-width"
                    default-first-option
                    placeholder="15 minutes">
                    <el-option
                      v-for="item in durationOptions"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </v-flex>
              </v-layout>
            </v-container>

            <label class="pad-bottom--quarter pad-top field-label">What restrictions should be placed?</label>
            <v-container class="pad-none" fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex xs7>
                  <el-switch
                    v-model="activity.kidFriendly"
                    active-text="Kid Friendly">
                  </el-switch>
                </v-flex>
                <v-spacer />
                <v-flex xs5>
                  <el-switch
                    v-model="activity.over18"
                    active-text="Over 18">
                  </el-switch>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs7>
                  <el-switch
                    v-model="activity.handicapFriendly"
                    active-text="Handicap Friendly">
                  </el-switch>
                </v-flex>
                <v-spacer />
                <v-flex xs5>
                  <el-switch
                    v-model="activity.over21"
                    active-text="Over 21">
                  </el-switch>
                </v-flex>
              </v-layout>
            </v-container>
          <!-- #endregion -->
          </div>

          <el-button
            class="primary-background fix-bottom fill-width"
            type="primary"
            @click="save()">Create Activity</el-button>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'

import DURATIONS_ENUMS from '@/enums/durationEnum.js'
import REPEAT_ENUMS from '@/enums/repeatEnum.js'

import DateTimeSelect from '@/components/elements/inputs/DateTimeSelect'
import DaySelect from '@/components/elements/inputs/DaySelect'
import ImageUploader from '@/components/elements/inputs/ImageUploader'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: 'ActivityAddModal',
  apollo: {
    categories: {
      query: gql`query { 
        categories {
          pk
          name
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.categories = data.categories
      },
      error (err) {
        console.error(err)
      }
    }
  },
  created () {
    this.modal = this.activityModal
  },
  computed: {
    ...mapGetters('AppState', ['activityModal']),
    kidFriendly () {
      return this.activity.kidFriendly
    },
    over18 () {
      return this.activity.over18
    },
    over21 () {
      return this.activity.over21
    },
    locationAvailable () {
      return (navigator.geolocation)
    }
  },
  data () {
    return {
      modal: false,
      setSchedule: false,
      categories: [],
      durationOptions: DURATIONS_ENUMS,
      repeatOptions: REPEAT_ENUMS,
      activity: {
        name: null,
        description: null,
        address: null,
        latitude: null,
        longitude: null,
        categories: null,
        media: null,
        price: null,
        duration: null,
        kidFriendly: false,
        handicapFriendly: false,
        over18: false,
        over21: false,
        startDatetime: null,
        endDatetime: null,
        frequency: null,
        interval: null,
        days: null
      }
    }
  },
  methods: {
    close () {
      this.activity = {
        name: null,
        description: null,
        address: null,
        latitude: null,
        longitude: null,
        categories: null,
        media: null,
        price: null,
        duration: null,
        kidFriendly: false,
        handicapFriendly: false,
        over18: false,
        over21: false,
        startDatetime: null,
        endDatetime: null,
        frequency: null,
        interval: null,
        days: []
      }
      this.$store.commit('AppState/CLOSE_ACTIVITY_MODAL')
    },
    toggleSchedule () {
      this.activity.startDatetime = null
      this.activity.endDatetime = null
      this.activity.frequency = null
      this.activity.interval = null
      this.activity.days = []
    },
    getLocation () {
      if (navigator.geolocation) {
        var self = this
        navigator.geolocation.getCurrentPosition(function (location) {
          self.activity.latitude = location.coords.latitude
          self.activity.longitude = location.coords.longitude
        })
      }
    },
    getAddressData ($evt) {
      this.activity.latitude = $evt.latitude
      this.activity.longitude = $evt.longitude
    },
    save () {
      var self = this
      var data = Object.assign({}, self.activity)
      data.categories = data.categories ? data.categories.join(',') : null
      data.days = data.days ? data.days.join(',') : null

      this.$apollo.mutate({
        mutation: gql`mutation ($name: String!, $description: String, $categories: String!, $duration: Int, $price: Float, $kidFriendly: Boolean,
                    $handicapFriendly: Boolean, $over18: Boolean, $over21: Boolean, $address: String, $latitude: Float, $longitude: Float,
                    $startDatetime: String, $endDatetime: String, $frequency: Int, $interval: Int, $days: String) {
          addActivity(name: $name, description: $description, categories: $categories, duration: $duration, price: $price, kidFriendly: $kidFriendly,
              handicapFriendly: $handicapFriendly, over18: $over18, over21: $over21, address: $address, latitude: $latitude, longitude: $longitude,
              startDatetime: $startDatetime, endDatetime: $endDatetime, frequency: $frequency, interval: $interval, days: $days) {
            success
            error
            activity {
              pk
              name
              created
            }
          }
        }`,
        variables: data
      }).then((data) => {
        // Show success
        self.close()
      }).catch((error) => {
        // Show error
        console.error(error)
      })
    }
  },
  watch: {
    activityModal () {
      this.modal = this.activityModal
    },
    kidFriendly () {
      if (this.kidFriendly) {
        this.activity.over18 = false
        this.activity.over21 = false
      }
    },
    over18 () {
      if (this.over18) {
        this.activity.kidFriendly = false
        this.activity.over21 = false
      }
    },
    over21 () {
      if (this.over21) {
        this.activity.kidFriendly = false
        this.activity.over18 = false
      }
    },
    setSchedule () {
      this.toggleSchedule()
    }
  },
  components: {
    DateTimeSelect,
    DaySelect,
    ImageUploader,
    VueGoogleAutocomplete
  }
}
</script>
