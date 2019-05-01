<template>
  <v-dialog
    fullscreen
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

      <v-card-text class="bg-accent-background">
        <v-layout column>
          <!-- <div class="qr-code pad-bottom">
            <qriously v-if="data && data.handle" :value="data.handle" :size="150"></qriously>
            <el-button class="space-top--half">Scan QR code</el-button>
          </div> -->
          <div class="handle-search">
            <div class="handle pad-bottom--half" v-if="data && data.handle">
              <p>{{ data.handle }}</p>
              <label>My Handle</label>
            </div>
            <div class="search pad-top--half">
              <v-text-field
                solo
                fill-width
                fixed
                hideDetails
                v-model="searchQuery"
                class="rounded-input pad-bottom--half"
                append-icon="search"
                placeholder="Search by handle, name, email"></v-text-field>
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
  created () {
    this.modal = this.addFriendModal
  },
  data () {
    return {
      modal: false,
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters('AppState', ['addFriendModal']),
    ...mapGetters('UserModule', ['data'])
  },
  methods: {
    close () {
      this.$store.commit('AppState/CLOSE_ADD_FRIEND_MODAL')
    }
  },
  watch: {
    addFriendModal () {
      this.modal = this.addFriendModal
    },
    modal () {
      if (this.modal === false) {
        this.$store.commit('AppState/CLOSE_ADD_FRIEND_MODAL')
      } else {
        this.$store.commit('AppState/OPEN_ADD_FRIEND_MODAL')
      }
    }
  },
  components: {
    FriendSearchResults
  }
}
</script>
