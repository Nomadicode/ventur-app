<template>
  <v-card
    light
    class="event-card space-bottom--quarter"
    @click="openEvent">
    <v-card-title class="header">
      <v-container class="pad-none">
        <v-layout
          justify-start
          align-start
          row
          wrap>
          <v-flex xs3>
            <v-img
              :src="eventImage"
              :height="98"
              :width="'100%'"></v-img>
          </v-flex>
          <v-flex xs9 class="content">
            <h4 class="title">{{ item.name }}</h4>
            <date-scroller class="fix-bottom">
              <date-scroll-item :startDate="item.nextOccurrence.startDate" :endDate="item.nextOccurrence.endDate"></date-scroll-item>
            </date-scroller>

            <div class="location">
              <div>{{ item.distance }}</div>
              <div class="price">{{ price }}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <div v-if="loading" class="loading-overlay">
        <loading-icon></loading-icon>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import moment from 'moment'
import LoadingIcon from '@/components/elements/LoadingIcon'
import RestrictionBox from '@/components/elements/RestrictionBox'
import { DateScroller, DateScrollItem } from '@/components/elements/date-scroller'
import DefaultImage from '@/assets/images/default_activity.jpg'

export default {
  name: 'EventCard',
  props: ['item'],
  mounted () {
    var self = this
    window.EventBus.$on('loading:event', (eventId, value) => {
      if (self.item.pk === eventId) {
        self.loading = value
      }
    })
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {    
    eventImage () {
      return this.item && this.item.media ? this.item.media : DefaultImage
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
    openEvent () {
      window.EventBus.$emit('load:event', this.item.pk)
    }
  },
  components: {
    DateScroller,
    DateScrollItem,
    LoadingIcon,
    RestrictionBox
  }
}
</script>
