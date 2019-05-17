<template>
  <v-dialog
    light
    v-model="modal"
  >
    <v-card>
      <v-card-text
        class="manage-list-item pad-half regular-text horizontal-center"
        @click="addToGroup">
        add to group
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text
        class="manage-list-item pad-half warning-background white-text horizontal-center"
        @click="removeFriend">
        remove friend
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ManageFriendModal',
  props: {
    handle: {
      default: null,
      type: String
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {
    addToGroup () {

    },
    removeFriend () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation RemoveFriend ($handle: String!) {
          removeFriend (handle: $handle) {
            success
            error
          }
        }`,
        variables: {
          handle: this.handle
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  watch: {
    show () {
      this.modal = this.show
    },
    modal () {
      if (!this.modal) {
        this.$emit('close')
      }
    }
  }
}
</script>
