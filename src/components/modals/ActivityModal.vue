<template>
  <v-dialog
    fullscreen
    light
    v-model="modal">
    <v-card class="modal">
      <v-card-title
        class="primary-background accent-color modal-header"
        primary-title>
        Add Activity
        <v-icon
          class="close"
          @click="close()">close</v-icon>
      </v-card-title>

      <v-stepper v-model="activeStep">
        <v-stepper-header>
          <v-stepper-step :complete="activeStep > 1" step="1"></v-stepper-step>

          <v-stepper-step :complete="activeStep > 2" step="2"></v-stepper-step>

          <v-stepper-step step="3"></v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <label class="pad-bottom--quarter field-label">Give your activity a name</label>
            <el-input 
              placeholder="House party" 
              v-model="activity.name"></el-input>

            <label class="pad-top pad-bottom--quarter field-label">Provide a little more detail <span class="aside">optional</span></label>
            <el-input
              type="textarea"
              class="large-text"
              placeholder="Join us for a party at a house. There will be food, games, and fun." 
              v-model="activity.description"></el-input>

            <label class="pad-top pad-bottom--quarter field-label">How would you categorize your activity?</label>
            <el-select
              class="fill-width"
              v-model="activity.categories"
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

            <div class="pad-top flex-inline">
              <div class="inline">
                <label class="pad-bottom--quarter field-label">Price <span class="aside">optional</span></label>
                <el-input 
                  type="number"
                  v-model="activity.price"
                ></el-input>
              </div>
              <div class="inline">
                <label class="pad-bottom--quarter field-label">Duration <span class="aside">optional</span></label>
                <el-select
                  class="fill-width"
                  v-model="activity.duration"
                  default-first-option
                  placeholder="15 minutes">
                  <el-option
                    v-for="item in durationOptions"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="fix-bottom button-box">
              <el-button 
                class="primary-background"
                type="primary"
                :disabled="!step1Valid"
                @click="next()">Next</el-button>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <label class="pad-bottom--half field-label">Where is this activity?</label>
            <vue-google-autocomplete
              id="map"
              classname="el-input__inner"
              placeholder="Enter location"
              v-on:placechanged="getAddressData"
              enable-geolocation></vue-google-autocomplete>

            <el-button 
              v-if="locationAvailable"
              icon="el-icon-location"
              @click="getLocation()">Use Current Location</el-button>

            <label class="pad-bottom--half pad-top field-label">What restrictions should be placed?</label>
            <div class="restriction-switches">
              <el-switch 
                v-model="activity.kidFriendly"
                active-text="Kid Friendly">
              </el-switch>
              <el-switch 
                class="float-right"
                v-model="activity.over18"
                active-text="Over 18">
              </el-switch>
              <p></p>
              <el-switch 
                v-model="activity.handicapFriendly"
                active-text="Handicap Friendly">
              </el-switch>
              <el-switch 
                class="float-right"
                v-model="activity.over21"
                active-text="Over 21">
              </el-switch>
            </div>

            <!-- <label class="pad-top pad-bottom--quarter field-label">Restrict to groups:</label>
            <friend-group-select v-model="activity.restrictedToGroups"></friend-group-select>   -->

            <div class="fix-bottom button-box">
              <el-button
                type="text"
                class="secondary-text"
                @click="previous()">back</el-button>
              
              <el-button 
                class="primary-background"
                type="primary"
                :disabled="!step2Valid"
                @click="next()">Next</el-button>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <el-switch
              active-text="Set schedule"
              v-model="setSchedule"></el-switch>
            <v-card
              v-if="!setSchedule"
              class="message"
              flat
              color="grey lighten-2">
              <v-card-title class="title">ALERT</v-card-title>
              <v-card-text>Activity will be marked as always available.</v-card-text>
            </v-card>

            <div v-if="setSchedule">
              <v-layout row class="pad-top">
                <v-flex sm4 class="space-right">
                  <label class="field-label">Start date</label>
                  <el-date-picker
                    type="date"
                    placeholder="Pick start date">
                  </el-date-picker>
                </v-flex>

                <v-flex sm4>
                  <label class="field-label">Start time</label>
                  <el-time-select
                    placeholder="Start time"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }">
                  </el-time-select>
                </v-flex>
              </v-layout>

              <v-layout row class="pad-top--half">
                <v-flex sm4 class="space-right">
                  <label class="field-label">End date</label>
                  <el-date-picker
                    type="date"
                    placeholder="Pick end date">
                  </el-date-picker>
                </v-flex>

                <v-flex sm4>                  
                  <label class="field-label">End time</label>
                  <el-time-select
                    placeholder="End time"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }">
                  </el-time-select>
                </v-flex>
              </v-layout>

              <v-layout class="pad-top--half" column>
                <label class="field-label">Frequency</label>
                <el-select
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
              </v-layout>

              <v-layout class="pad-top--half" column>
                <label class="field-label">Days</label>
                <el-checkbox-group
                  v-model="activity.days">
                  <el-checkbox 
                    v-for="day in daysOptions" 
                    class="days-checkbox"
                    :label="day.value" 
                    :key="day.value"
                    >{{ day.abbreviation }}</el-checkbox>
                </el-checkbox-group>
              </v-layout>
            </div>

            <div class="fix-bottom button-box">
              <el-button
                type="text"
                class="secondary-text"
                @click="previous()">back</el-button>
              
              <el-button 
                class="primary-background"
                type="primary"
                @click="save()">Create Activity</el-button>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
import { RRule } from 'rrule'
import DURATIONS_ENUMS from '@/enums/durationEnum.js'
import REPEAT_ENUMS from '@/enums/repeatEnum.js'
import DAYS_ENUMS from '@/enums/daysEnum.js'

import VueGoogleAutocomplete from 'vue-google-autocomplete'
import FriendGroupSelect from '@/components/elements/inputs/FriendGroupSelect'

export default {
  name: 'ActivityModal',
  apollo: {
    categories: {
      query: gql`query { 
        categories {
          pk
          name
        }
      }`,
      result({ data, loading, networkStatus }) {
        this.categories = data.categories
      },
      error(err) {

      }
    }
  },
  created () {
    this.modal = this.activityModal
  },
  data () {
    return {
      modal: false,
      activeStep: 1,
      durationOptions: DURATIONS_ENUMS,
      repeatOptions: REPEAT_ENUMS,
      daysOptions: DAYS_ENUMS,
      categories: [],
      activity: {
        name: null,
        description: null,
        categories: null,
        price: null,
        duration: null,
        address: null,
        latitude: null,
        longitude: null,
        kidFriendly: false,
        over18: false,
        handicapFriendly: false,
        over21: false,
        restrictedToGroups: [],
        startDatetime: null,
        endDatetime: null,
        frequency: null,
        interval: null,
        days: []
      },
      rrule: RRule,
      location: null,
      setSchedule: false,
      datetime: null
    }
  },
  computed: {
    ...mapGetters('AppState', ['activityModal']),
    step1Valid () {
      if (!this.activity.name) return false
      if (!this.activity.categories || this.activity.categories.length === 0) return false

      return true
    },
    step2Valid () {
      return this.locationSet
    },
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
      return (navigator.geolocation) ? true : false
    },
    locationSet () {
      return this.activity.latitude && this.activity.longitude
    }
  },
  methods: {
    close () {
      this.$store.commit('AppState/CLOSE_ACTIVITY_MODAL')
    },
    previous () {
      this.activeStep = parseInt(this.activeStep) - 1
    },
    next () {
      this.activeStep = parseInt(this.activeStep) + 1
    },
    getLocation () {
      if (navigator.geolocation) {
        var self = this
        navigator.geolocation.getCurrentPosition(function(location) {
          self.activity.latitude = location.coords.latitude
          self.activity.longitude = location.coords.longitude
        })
      }
    },
    getAddressData ($evt) {
      console.log(RRule)
      this.activity.latitude = $evt.latitude
      this.activity.longitude = $evt.longitude
    },
    save () {
      if (this.step1Valid && this.step2Valid) {
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
        })
      } else {
        // Show error
      }
    }
  },
  watch: {
    activityModal () {
      this.modal = this.activityModal
    },
    location () {
      this.activity.latitude = this.location.latlng.lat
      this.activity.longitude = this.location.latlng.lng
    },
    modal () {
      if (this.modal === false) {
        this.$store.commit('AppState/CLOSE_ACTIVITY_MODAL')
      } else {
        this.$store.commit('AppState/OPEN_ACTIVITY_MODAL')
      }
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
    VueGoogleAutocomplete,
    FriendGroupSelect
  }
}
</script>
