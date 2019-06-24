<template>
  <v-dialog
    fullscreen
    content-class="friend-container"
    light
    scrollable
    v-model="modal">
    <v-card class="modal">
      <v-card-title
        class="primary-background accent-color modal-header"
        primary-title>
        Add Friend
        <v-spacer />
        <v-icon
          class="close"
          @click="close()">close</v-icon>
      </v-card-title>

      <v-card-text class="bg-accent-background pad-bottom--none">
        <v-layout column>
          <!-- <div class="qr-code pad-bottom">
            <qriously v-if="data && data.handle" :value="data.handle" :size="150"></qriously>
            <el-button class="space-top--half">Scan QR code</el-button>
          </div> -->
          <div class="handle-search">
            <div class="handle pad-bottom--half" v-if="data && data.handle">
              <p>@{{ data.handle }}</p>
              <label>My Handle</label>
            </div>
            <div class="search pad-top--half">
              <el-input
                v-model="searchQuery"
                placeholder="Search by handle, name, email"
                suffix-icon="el-icon-search"></el-input>
            </div>
          </div>

          <friend-search-results :query="searchQuery"></friend-search-results>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

import FriendSearchResults from '@/components/friends/SearchResultList.vue'

export default {
  name: 'FriendModal',
  mounted () {
    var self = this
    window.EventBus.$on('friend:add', () => {
      self.modal = true
    })
  },
  data () {
    return {
      modal: false,
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters('UserModule', ['data'])
  },
  methods: {
    close () {
      this.modal = false
    }
  },
  components: {
    FriendSearchResults
  }
}
</script>
