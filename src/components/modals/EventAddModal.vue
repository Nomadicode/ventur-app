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

      <v-card-text v-if="event" class="body small-text">
        <v-layout column>
          <v-flex xs12>
            <croppa
              ref="uploader"
              v-model="croppaImg"
              :accept="'image/*'"
              :file-size-limit="0"
              :autoSizing="true"
              :quality="2"
              :zoom-speed="3"
              :show-remove-button="false"
              placeholder="Choose an image">
              <el-button v-if="!imageSelected()" @click="changeImage" type="text" class='edit-btn'>Select Image</el-button>
              <el-button v-if="imageSelected()" @click="changeImage" type="text" class='edit-btn'>Change Image</el-button></croppa>
          </v-flex>
          <!-- <image-uploader style="height:125px" v-model="image"></image-uploader> -->

          <div class="pad-sides pad-top--half pad-bottom--quad">
          <!-- #region Core Data -->
            <label class="pad-bottom--quarter field-label">Event Name</label>
            <el-input
              size="small"
              v-model="event.name"
              placeholder="House party"></el-input>

            <label class="pad-top--half pad-bottom--quarter field-label">Location <a class="aside" @click.prevent="setCurrentLocation">use current location</a></label>
            <location-autocomplete
              id="map"
              ref="location"
              classname="el-input__inner el-input--small height--small"
              placeholder="Enter location"
              :types="['establishment', 'geocode']"
              v-on:placechanged="getAddressData"
              :geolocationOptions="{
                enableHighAccuracy: true,
                maximumAge: 0
              }"
              enable-geolocation>
            </location-autocomplete>

            <label class="pad-top--half pad-bottom--quarter field-label">Provide a little more detail <span class="aside">optional</span></label>
            <el-input
              size="small"
              v-model="event.description"
              type="textarea"
              class="large-text"
              placeholder="Join us for a party at a house. There will be food, games, and fun."></el-input>
          <!-- #endregion -->

          <!-- #region Scheduling -->
            <h6 class="section-header">
              <span>Schedule</span>
            </h6>
            <span v-if="!setSchedule" class="section-subheader warning-text">event will be marked as always available.</span>

            <el-switch
              active-text="Set schedule"
              v-model="setSchedule"></el-switch>

            <v-container
              v-if="setSchedule"
              class="pad-none pad-top--quarter"
              fluid
              grid-list-sm>
              <date-time-select
                showTime
                v-model="event.startDatetime"
                dateLabel="Start Date"
                timeLabel="Start Time"></date-time-select>

              <date-time-select
                showTime
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
                    size="small"
                    class="fill-width"
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
              </v-layout>

              <v-layout
                v-if="event.frequency != null && event.frequency > -1"
                row
                wrap>
                <v-flex xs12>
                  <date-time-select
                    v-model="event.repeatUntil"
                    :min="event.endDatetime"
                    dateLabel="Repeat until"></date-time-select>
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
              size="small"
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
                  <price-input
                    optional
                    v-model="event.price"></price-input>
                </v-flex>
                <v-spacer />
                <v-flex xs6>
                  <duration-select
                    optional
                    v-model="event.duration"></duration-select>
                </v-flex>
              </v-layout>
            </v-container>

            <age-slider class="space-top--half" v-model="selectedAges"></age-slider>

            <v-container class="pad-none" fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-switch
                    class="accessibility-switch"
                    hide-details
                    v-model="event.handicapFriendly"
                    append-icon="fas fa-wheelchair"
                    :label="'Handicap'"></v-switch>
                </v-flex>
                <v-spacer />
                <v-flex xs6>
                  <v-switch
                    class="accessibility-switch"
                    hide-details
                    v-model="event.alcoholPresent"
                    :disabled="event.maximumAge < 21 || age < 21"
                    append-icon="fas fa-glass-martini-alt"
                    :label="'Alcohol'"></v-switch>
                </v-flex>
              </v-layout>
            </v-container>
          <!-- #endregion -->
          </div>

          <el-button
            v-loading="loading"
            class="primary-background fix-bottom fill-width"
            type="primary"
            @click="save()">Create Event</el-button>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import uuidv4 from 'uuid'
import { mapGetters } from 'vuex'
import REPEAT_ENUMS from '@/enums/repeatEnum.js'

import { Event } from '@/models'
import CONSTANTS from '@/services/parameters'
import AWS_S3 from '@/services/aws.js'

import getGroups from '@/graphql/groups/queries/getGroups.gql'
import createEvent from '@/graphql/events/mutations/createEvent.gql'

import AgeSlider from '@/components/elements/inputs/AgeSlider'
import DateTimeSelect from '@/components/elements/inputs/DateTimeSelect'
import DaySelect from '@/components/elements/inputs/DaySelect'
import DurationSelect from '@/components/elements/inputs/DurationSelect'
import ImageUploader from '@/components/elements/inputs/ImageUploader'
import PriceInput from '@/components/elements/inputs/PriceInput'
import LocationAutocomplete from '@/components/elements/inputs/LocationAutocomplete'

export default {
  name: 'EventAddModal',
  apollo: {
    friendGroups: {
      query: getGroups
    }
  },
  mounted () {
    var self = this
    window.EventBus.$on('event:add', () => {
      self.modal = true
    })
  },
  created () {
    this.event = Object.assign({}, Event)
    
    if (this.age) {
      this.selectedAges[0] = this.age - 7
      this.selectedAges[1] = this.age + 7
    }
  },
  computed: {
    ...mapGetters('UserModule', ['age']),
    locationAvailable () {
      return (navigator.geolocation)
    }
  },
  data () {
    return {
      modal: false,
      setSchedule: false,
      loading: false,
      selectedAges: [0, 65],
      repeatOptions: REPEAT_ENUMS,
      locationType: 'address',
      croppaImg: {},
      event: null
    }
  },
  methods: {
    close () {
      window.EventBus.$emit('events:refresh')
      this.event = Object.assign({}, Event)
      this.setSchedule = false
      this.croppaImg.remove()
      this.$refs.location.clear()
      this.modal = false
    },
    toggleSchedule () {
      this.event.startDatetime = null
      this.event.endDatetime = null
      this.event.frequency = null
    },
    setCurrentLocation () {
      this.$refs.location.geolocate()
    },
    getAddressData ($evt, place, id) {
      this.event.locationName = (place.name) ? place.name : null
      this.event.address = place.formatted_address
      this.event.latitude = $evt.latitude
      this.event.longitude = $evt.longitude
    },
    imageSelected () {
      return this.$refs && this.$refs.uploader && this.$refs.uploader.hasImage()
    },
    changeImage () {
      this.$refs.uploader.chooseFile()
    },
    async saveEvent() {
      var data = Object.assign({}, this.event)
      data.price = data.price ? data.price : 0.00
      data.groups = data.groups ? data.groups.join(',') : ''

      try {
        var result = await this.$apollo.mutate({
          mutation: createEvent,
          variables: data
        })
      } catch (err) {
        this.loading = false
        this.$message({
          type: 'error',
          message: 'An error occurred trying to create your event, please try again.'
        })
        return
      }

      this.loading = false
      this.close()
    },
    async save () {
      this.loading = true
      var self = this

      if (this.$refs.uploader.hasImage()) {
        this.croppaImg.generateBlob(blob => {
          var params = {
            Bucket: CONSTANTS.aws,
            Key: 'activities/' + uuidv4() + '.jpg',
            Body: blob
          }
          var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
          AWS_S3.upload(params, options, function (err, data) {
            self.event.media = data.Location
            self.saveEvent()
          })
        }, 'image/jpeg', 0.75)
      } else {
        this.saveEvent()
      }
    }
  },
  watch: {
    selectedAges () {
      this.event.minimumAge = this.selectedAges[0]
      this.event.maximumAge = this.selectedAges[1]
    },
    setSchedule () {
      this.toggleSchedule()
    }
  },
  components: {
    AgeSlider,
    DateTimeSelect,
    DaySelect,
    DurationSelect,
    ImageUploader,
    PriceInput,
    LocationAutocomplete
  }
}
</script>
