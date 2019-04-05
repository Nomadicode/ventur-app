<template>
  <v-card
    light
    class="activity-list-item">
    <v-img
      class="list-image"
      :class="{'full-image': isOpen}"
      :src="DefaultImage">

      <direction-button
        v-if="isOpen && item && item.location"
        class="position--bottom-right"
        :latitude="item.location.latitude"
        :longitude="item.location.longitude"></direction-button>
    </v-img>

    <v-card-title class="pad-less">
      <h4 class="card-title">{{ item.name }}</h4>
      <div class="details">
        <div v-if="item && item.location" class="item-address">{{ item.location.address }}</div>
        <span class="item-price">{{ price }}</span>
        <span class="item-duration">{{ activityDuration }}</span>
      </div>
      <restriction-box
        class="space-left--neg-5"
        :over18="item.over18"
        :over21="item.over21"
        :kidFriendly="item.kidFriendly"
        :handicapFriendly="item.handicapFriendly"></restriction-box>
    </v-card-title>

    <div v-if="isOpen">
      <v-card-text
        class="item-body"
        v-html="item.description"></v-card-text>

      <v-card-actions class="fill-width">
        <v-btn
          color="error"
          round
          outline
          fab
          small
          @click="reject()"
          ><v-icon>close</v-icon></v-btn>
        <v-spacer></v-spacer>
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
          outline
          fab
          small
          @click="accept()"
          ><v-icon>check</v-icon></v-btn>
      </v-card-actions>
    </div>
    <v-btn
      depressed
      class="expand-btn"
      @click="toggleFullView()">
      <v-icon v-if="!isOpen">expand_more</v-icon>
      <v-icon v-if="isOpen">expand_less</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import DefaultImage from '@/assets/images/default_activity.jpg'
import DirectionButton from '@/components/elements/buttons/DirectionButton'
import RestrictionBox from '@/components/elements/RestrictionBox'

export default {
  name: 'ActivityItem',
  props: ['item'],
  data () {
    return {
      DefaultImage: DefaultImage,
      isOpen: false,
      showMenu: false,
      showReportMenu: false
    }
  },
  computed: {
    activityDuration () {
      var duration = (this.item.duration >= 60) ? this.item.duration / 60 : this.item.duration
      var interval = (this.item.duration / 60 >= 1) ? 'h' : 'm'

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
    saveActivity () {
      this.showMenu = false
    },
    rejectActivity () {
      this.showMenu = false
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    toggleFullView () {
      this.isOpen = !this.isOpen
    },
    toggleReportMenu () {
      this.showReportMenu = !this.showReportMenu
      this.showMenu = false
    }
  },
  components: {
    DirectionButton,
    RestrictionBox
  }
}
</script>

<style lang="scss" scoped>
  .activity-list-item {
    background: #ffffff;
    color: #4e4e4e;
    margin: 5px 0 10px 0;
    border-radius: 5px;
    box-shadow: 0 0 3px #999;
    position: relative;
    min-height: 100px;

    .pad-less {
      padding: 10px 15px;
    }

    .list-image {
      height: 10px;
    }

    .full-image {
      height: 12rem;

      .menu-btn {
        position: absolute;
        right: 0;
      }
    }

    h4 {
      font-size: 1.25rem;
      font-weight: 500;
      position: relative;
    }

    .details {
      clear: both;
      width: 100%;

      .item-address {
        font-size: 0.9rem;
        font-weight: 300;
        margin: 5px 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .item-price {
        font-size: 14px;
        color: rgba(0,0,0,0.6);
      }
      .item-duration {
        float: right;
        color: rgba(0,0,0,0.6);
      }
    }

    .item-body {
      min-height: 40px;
    }
  }
</style>
