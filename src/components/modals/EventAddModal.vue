<template>
  <v-dialog
    fullscreen
    light
    scrollable
    v-model="modal">
    <v-card class="event-modal modal">
      <v-card-title
        class="primary-background accent-color modal-header"
        primary-title>
        Add Event
        <v-spacer />
        <v-icon
          class="close"
          @click="close()">close</v-icon>
      </v-card-title>

      <v-card-text class="body small-text">
        <v-layout column>
          <image-uploader v-model="event.media"></image-uploader>

          <div class="pad-sides pad-top--half pad-bottom--quad">
          <!-- #region Core Data -->
            <label class="pad-bottom--quarter field-label">Event Name</label>
            <el-input
              v-model="event.name"
              placeholder="House party"></el-input>

            <label class="pad-top--half pad-bottom--quarter field-label">Location <a class="aside" @click.prevent="$refs.locationInput.geolocate()">use current location</a></label>
            <vue-google-autocomplete
              id="map"
              ref="location"
              classname="el-input__inner"
              placeholder="Enter location"
              v-on:placechanged="getAddressData"
              :geolocationOptions="{
                enableHighAccuracy: true
              }"
              :types="locationType"
              enable-geolocation>
            </vue-google-autocomplete>

            <label class="pad-top--half pad-bottom--quarter field-label">Provide a little more detail <span class="aside">optional</span></label>
            <el-input
              v-model="event.description"
              type="textarea"
              class="large-text"
              placeholder="Join us for a party at a house. There will be food, games, and fun."></el-input>

            <label class="pad-top--half pad-bottom--quarter field-label">How would you categorize your event?</label>
            <el-select
              v-model="event.categories"
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
            <span v-if="!setSchedule" class="section-subheader">event will be marked as always available.</span>

            <el-switch
              active-text="Set schedule"
              v-model="setSchedule"></el-switch>

            <v-container
              v-if="setSchedule"
              class="pad-none pad-top--quarter"
              fluid
              grid-list-sm>
              <date-time-select
                v-model="event.startDatetime"
                dateLabel="Start Date"
                timeLabel="Start Time"></date-time-select>

              <date-time-select
                v-model="event.endDatetime"
                :min="event.startDatetime"
                dateLabel="End Date"
                timeLabel="End Time"></date-time-select>

              <v-layout
                row
                wrap>
                <v-flex xs6>
                  <label class="pad-top--half pad-bottom--quarter field-label">Frequency</label>
                  <el-select
                    class="fill-width"
                    default-first-option
                    v-model="event.frequency"
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
                  <day-select v-model="event.days"></day-select>
                </v-flex>
              </v-layout>
            </v-container>
          <!-- #endregion -->

          <!-- #region Accessibility -->
            <h6 class="section-header"><span>Accessibility</span></h6>
            <label class="pad-bottom--quarter field-label">Restrict to group(s) <span class="aside">optional</span></label>
            <el-select
              v-model="event.groups"
              class="fill-width space-bottom--half"
              multiple
              filterable
              default-first-option
              placeholder="select group(s)">
              <el-option
                v-for="item in friendGroups"
                :key="item.pk"
                :label="item.name"
                :value="item.pk">
              </el-option>
            </el-select>

            <v-container class="pad-none pad-top--half" fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex xs5>
                  <label class="pad-bottom--quarter field-label">Price <span class="aside">optional</span></label>
                  <el-input
                    v-model.number="event.price"
                    type="number"
                  ></el-input>
                </v-flex>
                <v-spacer />
                <v-flex xs6>
                  <label class="pad-bottom--quarter field-label">Duration <span class="aside">optional</span></label>
                  <el-select
                    v-model="event.duration"
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

            <v-container class="pad-top--half pad-bottom--quarter pad-sides--none" fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex xs7>
                  <el-switch
                    v-model="event.kidFriendly"
                    active-text="Kid Friendly">
                  </el-switch>
                </v-flex>
                <v-spacer />
                <v-flex xs5>
                  <el-switch
                    v-model="event.over18"
                    active-text="Over 18">
                  </el-switch>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs7>
                  <el-switch
                    v-model="event.handicapFriendly"
                    active-text="Handicap Friendly">
                  </el-switch>
                </v-flex>
                <v-spacer />
                <v-flex xs5>
                  <el-switch
                    v-model="event.over21"
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
            @click="save()">Create Event</el-button>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'

import DURATIONS_ENUMS from '@/enums/durationEnum.js'
import REPEAT_ENUMS from '@/enums/repeatEnum.js'

import DateTimeSelect from '@/components/elements/inputs/DateTimeSelect'
import DaySelect from '@/components/elements/inputs/DaySelect'
import ImageUploader from '@/components/elements/inputs/ImageUploader'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: 'EventAddModal',
  apollo: {
    categories: {
      query: gql`query { 
        categories {
          pk
          name
        }
      }`
    },
    friendGroups: {
      query: gql`query {
        friendGroups {
          pk
          name
        }
      }`
    }
  },
  mounted () {
    var self = this
    window.EventBus.$on('event:add', () => {
      self.modal = true
    })
  },
  computed: {
    kidFriendly () {
      return this.event.kidFriendly
    },
    over18 () {
      return this.event.over18
    },
    over21 () {
      return this.event.over21
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
      locationType: 'address',
      event: {
        name: null,
        description: null,
        address: null,
        latitude: null,
        longitude: null,
        categories: '',
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
        days: null,
        groups: []
      }
    }
  },
  methods: {
    close () {
      this.$refs.location.clear()
      this.event = {
        name: null,
        description: null,
        address: null,
        latitude: null,
        longitude: null,
        categories: [],
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
        days: [],
        groups: []
      }
      this.modal = false
    },
    toggleSchedule () {
      this.event.startDatetime = null
      this.event.endDatetime = null
      this.event.frequency = null
      this.event.interval = null
      this.event.days = []
    },
    setCurrentLocation () {
      this.locationType = 'street_address'
      this.$refs.location.geolocate()
    },
    // setCurrentLocation () {
    //   if (navigator.geolocation) {
    //     var self = this
    //     navigator.geolocation.getCurrentPosition(function (location) {
    //       self.event.latitude = location.coords.latitude
    //       self.event.longitude = location.coords.longitude

    //       self.$refs.locationInput.updateCoordinates(LatLng(location.coords.latitude, location.coords.longitude))
    //     })
    //   }
    // },
    getAddressData ($evt, place, id) {
      this.locationType = 'address'
      this.event.latitude = $evt.latitude
      this.event.longitude = $evt.longitude
    },
    save () {
      var self = this
      var data = Object.assign({}, self.event)
      data.categories = data.categories ? data.categories.join(',') : null
      data.days = data.days ? data.days.join(',') : null

      data.price = data.price ? data.price : null

      this.$apollo.mutate({
        mutation: gql`mutation AddActivity($name: String!, $media: String, $description: String, $categories: String!, $duration: Int, $price: Float, $kidFriendly: Boolean,
                    $handicapFriendly: Boolean, $over18: Boolean, $over21: Boolean, $address: String, $latitude: Float, $longitude: Float,
                    $startDatetime: String, $endDatetime: String, $frequency: Int, $interval: Int, $days: String) {
          addActivity(name: $name, media: $media, description: $description, categories: $categories, duration: $duration, price: $price, kidFriendly: $kidFriendly,
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
    kidFriendly () {
      if (this.kidFriendly) {
        this.event.over18 = false
        this.event.over21 = false
      }
    },
    over18 () {
      if (this.over18) {
        this.event.kidFriendly = false
        this.event.over21 = false
      }
    },
    over21 () {
      if (this.over21) {
        this.event.kidFriendly = false
        this.event.over18 = false
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
