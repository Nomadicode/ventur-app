<template>
  <v-dialog
    fullscreen
    light
    v-model="modal">
    <v-card class="modal">
      <v-card-title
        class="primary-background accent-color modal-header"
        primary-title>
        Add Friend
        <v-icon
          class="close"
          @click="close()">close</v-icon>
      </v-card-title>

      <v-card-text>
        <v-layout column>
          <div class="qr-code pad-bottom">
            <qriously v-if="data && data.handle" :value="data.handle" :size="150"></qriously>
            <el-button class="space-top--half">Scan QR code</el-button>
          </div>
          <div class="handle space-top--quarter">
            <div class="my-handle" v-if="data && data.handle"><span class="bold">My Handle: </span>{{ data.handle }}</div>
            <el-autocomplete
              v-model="selectedHandle"
              :fetch-suggestions="fetchSuggestions"
              :trigger-on-focus="false"
              placeholder="Add by handle"
              @select="selectUser"></el-autocomplete>
            <el-button
              class="float-right"
              type="default"
              @click="addByHandle">Add</el-button>
          </div>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'

export default {
  name: 'FriendModal',
  apollo: {
    users: {
      query: gql`query userQuery($query: String) { 
        users(query: $query) {
          name
          handle
          profilePicture
        }
      }`,
      variables () {
        return {
          query: this.selectedHandle
        }
      },
      result ({ data, loading, networkStatus }) {
        this.users = data.users
      },
      error (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.modal = this.addFriendModal
  },
  data () {
    return {
      modal: false,
      selectedHandle: null,
      users: []
    }
  },
  computed: {
    ...mapGetters('AppState', ['addFriendModal']),
    ...mapGetters('UserModule', ['data'])
  },
  methods: {
    close () {
      this.$store.commit('AppState/CLOSE_ADD_FRIEND_MODAL')
    },
    fetchSuggestions (queryString, cb) {
      this.$apollo.queries.users.refetch()
      cb(this.users)
    },
    selectUser (item) {
      console.log(item)
    },
    addByHandle () {
      this.$apollo.mutate({
        mutation: gql`mutation ($handle: String!){
          addFriend(handle: $handle) {
            success
            error
          }
        }`,
        variables: {
          'handle': this.newHandle
        }
      }).then((data) => {
        // Show success
        self.close()
      }).catch((error) => {
        // Show error
        console.log(error)
      })
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
  }
}
</script>

<style lang="scss" scoped>
  .qr-code {
    width: 100%;
    margin: 20px auto;
    text-align: center;
    border-bottom: 1px solid #efefef;
  }
  .handle {
    .my-handle {
      margin-bottom: 10px;
      .bold {
        font-weight: 500;
      }
    }
  }
  .people-search {
    margin: 20px 0;
  }
</style>
