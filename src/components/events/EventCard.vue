<template>
  <v-card
    light
    class="event-card"
    @click="openEvent">
    <v-card-title class="header">
      <v-container class="pad-none">
        <v-layout
          justify-start
          align-start
          row
          wrap>
          <v-flex xs9>
            <h4 class="title">{{ item.name }}</h4>
            <div v-if="item && item.location" class="location">{{ item.location.address }}</div>
          </v-flex>
          <v-flex xs3 class="date-field">
            <div class="date">{{ date }}</div>
            <div class="time">{{ time }}</div>
          </v-flex>
        </v-layout>
      </v-container>

      <div class="price">{{ price }}</div>

      <restriction-box
          :over18="item.over18"
          :over21="item.over21"
          :kidFriendly="item.kidFriendly"
          :handicapFriendly="item.handicapFriendly"></restriction-box>

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
    price () {
      if (this.item.price) {
        return '$' + parseFloat(Math.round(this.item.price * 100) / 100).toFixed(2)
      } else {
        return 'FREE'
      }
    },
    date () {
      if (this.item.nextOccurrence) {
        return moment(this.item.nextOccurrence).format('MMM D')
      } else if (this.item.prevOccurrence) {
        return moment(this.item.prevOccurrence).format('MMM D')
      } else {
        return 'Anytime'
      }
    },
    time () {
      if (this.item.nextOccurrence) {
        return moment(this.item.nextOccurrence).format('h:mm a')
      } else if (this.item.prevOccurrence) {
        return moment(this.item.prevOccurrence).format('h:mm a')
      } else {
        return null
      }
    }
  },
  methods: {
    openEvent () {
      window.EventBus.$emit('load:event', this.item.pk)
    }
  },
  components: {
    LoadingIcon,
    RestrictionBox
  }
}
</script>
