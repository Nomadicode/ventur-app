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
            <label class="pad-bottom--quarter field-label">Activity Name</label>
            <el-input
              v-model="activity.name"
              placeholder="House party"></el-input>

            <label class="pad-top--half pad-bottom--quarter field-label">Location</label>
            <v-container class="pad-none" fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex xs9>
                  <vue-google-autocomplete
                    id="map"
                    classname="el-input__inner"
                    placeholder="Enter location"
                    v-on:placechanged="getAddressData"
                    suffix-icon="el-icon-location"
                    enable-geolocation></vue-google-autocomplete>
                </v-flex>
                <v-spacer />
                <v-flex xs2>
                  <el-button
                    v-if="locationAvailable"
                    icon="el-icon-location"
                    @click="getLocation()"></el-button>
                </v-flex>
              </v-layout>
            </v-container>

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

            <h6 class="section-header">
              <span>Schedule</span>
            </h6>
            <span v-if="!setSchedule" class="section-subheader">Activity will be marked as always available.</span>

            <el-switch
              active-text="Set schedule"
              v-model="setSchedule"></el-switch>

            <v-container v-if="setSchedule" class="pad-none pad-top--quarter" fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex xs6>
                  <label class="pad-top--half pad-bottom--quarter field-label">Start date</label>
                  <el-date-picker
                    type="date"
                    placeholder="Pick start date">
                  </el-date-picker>
                </v-flex>
                <v-spacer />
                <v-flex xs5>
                  <label class="pad-top--half pad-bottom--quarter field-label">Start time</label>
                  <el-time-select
                    placeholder="Start time"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }">
                  </el-time-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <label class="pad-top--half pad-bottom--quarter field-label">End date</label>
                  <el-date-picker
                    type="date"
                    placeholder="Pick end date">
                  </el-date-picker>
                </v-flex>
                <v-spacer />
                <v-flex xs5>
                  <label class="pad-top--half pad-bottom--quarter field-label">End time</label>
                  <el-time-select
                    placeholder="End time"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }">
                  </el-time-select>
                </v-flex>
              </v-layout>
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
        days: []
      }
    }
  },
  methods: {
    close () {
      this.$store.commit('AppState/CLOSE_ACTIVITY_MODAL')
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
      data.categories = data.categories.join(',')

      this.$apollo.mutate({
        mutation: gql`mutation ($name: String!, $description: String, $categories: String!, $duration: Int, $price: Float, $kidFriendly: Boolean,
                    $handicapFriendly: Boolean, $over18: Boolean, $over21: Boolean, $address: String, $latitude: Float, $longitude: Float,
                    $startDatetime: DateTime, $endDatetime: DateTime, $frequency: Int, $interval: Int, $days: String) {
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
    }
  },
  components: {
    DaySelect,
    ImageUploader,
    VueGoogleAutocomplete
  }
}
</script>
