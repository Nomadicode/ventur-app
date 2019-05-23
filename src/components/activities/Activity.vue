<template>
 <v-card
    light
    class="activity">
    <v-img
      class="small-image"
      :class="{'full-image': expanded}"
      :src="activityImage">

      <direction-button
        v-if="expanded && item && item.location"
        class="position--bottom-right"
        :latitude="item.location.latitude"
        :longitude="item.location.longitude"></direction-button>
    </v-img>

    <v-card-title class="header">
      <h4 class="title">{{ item.name }}</h4>
      <div class="details">
        <div v-if="item && item.location" class="location">{{ item.location.address }}</div>
        <v-layout>
          <div class="price">{{ price }}</div>
          <v-spacer />
          <div class="duration">{{ duration }}</div>
        </v-layout>
      </div>
      <restriction-box
        :over18="item.over18"
        :over21="item.over21"
        :kidFriendly="item.kidFriendly"
        :handicapFriendly="item.handicapFriendly"></restriction-box>
    </v-card-title>

    <div v-if="expanded">
      <v-card-text
        class="body"
        v-html="item.description"></v-card-text>

      <v-card-actions class="fill-width">
        <v-btn
          class="report-btn"
          color="error"
          flat
          small
          @click="toggleReportMenu()"
          >report</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          round
          flat
          @click="toggleSave()"
          >
            <v-icon v-if="item.saved">fas fa-heart</v-icon>
            <v-icon v-else>far fa-heart</v-icon>
          </v-btn>
      </v-card-actions>
    </div>
    <v-btn
      depressed
      class="expand-btn"
      @click="toggleFullView()">
      <v-icon v-if="!expanded">expand_more</v-icon>
      <v-icon v-if="expanded">expand_less</v-icon>
    </v-btn>

    <report-modal
      :activityId="parseInt(item.id)"
      :open="showReportMenu"
      @close="toggleReportMenu()"></report-modal>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'

import DefaultImage from '@/assets/images/default_activity.jpg'
import DirectionButton from '@/components/elements/buttons/DirectionButton'
import RestrictionBox from '@/components/elements/RestrictionBox'
import ReportModal from '@/components/modals/ReportModal'

export default {
  name: 'Activity',
  props: ['item'],
  data () {
    return {
      DefaultImage: DefaultImage,
      expanded: false,
      showReportMenu: false
    }
  },
  computed: {
    activityImage () {
      return this.item.media ? this.item.media : DefaultImage
    },
    duration () {
      if (!this.item.duration) {
        return null
      }
      var duration = (this.item.duration >= 60) ? this.item.duration / 60 : this.item.duration
      var interval = (this.item.duration / 60 >= 1) ? 'h' : 'm'

      if (duration > 3 && interval === 'h') {
        duration = '>3'
      }
      return duration + interval
    },
    price () {
      if (this.item.price) {
        return '$' + parseFloat(Math.round(this.item.price * 100) / 100).toFixed(2)
      } else {
        return 'FREE'
      }
    }
  },
  methods: {
    toggleSave () {
      if (this.item.saved) {
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
                name
              }
            }
          }
        }`,
        variables: {
          activity: this.item.pk
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    },
    unsaveActivity () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation UnsaveActivity ($activity: Int!) {
          unsaveActivity (activity: $activity) {
            success
            error
          }
        }`,
        variables: {
          activity: this.item.pk
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    },
    toggleFullView () {
      this.expanded = !this.expanded
    },
    toggleReportMenu () {
      this.showReportMenu = !this.showReportMenu
      this.showMenu = false
    }
  },
  components: {
    DirectionButton,
    ReportModal,
    RestrictionBox
  }
}
</script>
