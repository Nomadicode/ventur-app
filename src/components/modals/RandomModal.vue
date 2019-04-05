<template>
  <v-dialog
    fullscreen
    dark
    v-model="modal">
    <v-card class="modal">
      <v-card-title
        class="primary-background accent-color modal-header"
        primary-title>
        About
        <v-icon
          class="close"
          @click="close()">close</v-icon>
      </v-card-title>

      <v-card-text>
        <v-layout column>
          <v-flex>
            <v-btn
              light
              block>Terms of Service</v-btn>
          </v-flex>
          <v-flex class="pad-top--double">
            <v-btn
              light
              block>Privacy Policy</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "RandomModal",
  created () {
    this.modal = this.randomModal
  },
  data () {
    return {
      modal: false
    }
  },
  computed: {
    ...mapGetters('AppState', ['randomModal'])
  },
  methods: {
    close () {
      this.$store.commit('AppState/CLOSE_RANDOM_MODAL')
    }
  },
  watch: {
    randomModal () {
      this.modal = this.randomModal
    },
    modal () {
      if (this.modal === false) {
        this.$store.commit('AppState/CLOSE_RANDOM_MODAL')
      } else {
        this.$store.commit('AppState/OPEN_RANDOM_MODAL')
      }
    }
  }
}
</script>
