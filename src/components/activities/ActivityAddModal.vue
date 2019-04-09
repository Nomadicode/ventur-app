<template>
  <v-dialog
    fullscreen
    light
    v-model="modal">
    <v-card class="activity-modal modal">
      <v-card-title
        class="primary-background accent-color modal-header"
        primary-title>
        Add Activity
        <v-icon
          class="close"
          @click="close()">close</v-icon>
      </v-card-title>

      <v-card-text class="body">
        <v-layout column>
          <image-uploader></image-uploader>

          <div class="pad-sides pad-ends--half">
            <label class="pad-bottom--quarter field-label">Activity Name</label>
            <el-input
              placeholder="House party"></el-input>

            <label class="pad-bottom--half field-label">Location</label>
            <vue-google-autocomplete
              id="map"
              classname="el-input__inner"
              placeholder="Enter location"
              enable-geolocation></vue-google-autocomplete>

            <label class="pad-top pad-bottom--quarter field-label">Provide a little more detail <span class="aside">optional</span></label>
            <el-input
              type="textarea"
              class="large-text"
              placeholder="Join us for a party at a house. There will be food, games, and fun."></el-input>

            <label class="pad-top pad-bottom--quarter field-label">How would you categorize your activity?</label>
            <el-select
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
          </div>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'
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
    ...mapGetters('AppState', ['activityModal'])
  },
  data () {
    return {
      modal: false,
      categories: []
    }
  },
  methods: {
    close () {
      this.$store.commit('AppState/CLOSE_ACTIVITY_MODAL')
    }
  },
  watch: {
    activityModal () {
      this.modal = this.activityModal
    }
  },
  components: {
    ImageUploader,
    VueGoogleAutocomplete
  }
}
</script>
