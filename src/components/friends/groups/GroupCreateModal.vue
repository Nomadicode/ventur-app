<template>
  <v-dialog
    light
    v-model="addGroupModal"
    :content-class="'group-add-modal'"
  >
    <v-card light>
      <v-card-title>
        <v-layout
          light
          align-center
          justify-center
          row
          wrap>
          <v-flex xs8>
            <p>Create a new group</p>
          </v-flex>
          <v-spacer />
          <v-flex xs2>
            <v-btn
              flat
              icon
              @click="close">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <el-input
          class="fill-width"
          v-model="name"
          placeholder="Group name">
        </el-input>
      </v-card-text>

      <v-card-actions>
        <el-button
          class="primary-background fill-width"
          :disabled="name == null"
          type="primary"
          @click="saveChanges()">Create Group</el-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'

export default {
  name: 'GroupCreateModal',
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters('AppState', ['addGroupModal'])
  },
  methods: {
    saveChanges () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation CreateFriendGroup($name: String!){
            createFriendGroup(name: $name) {
                success
                error
                group {
                    id
                    name
                }
            }
        }`,
        variables: {
          name: this.name
        }
      }).then((response) => {
        self.$emit('refresh')
        self.name = ''
        self.close()
      }).catch((error) => {
        console.log(error)
      })
    },
    close () {
      this.name = ''
      this.$store.commit('AppState/CLOSE_ADD_GROUP_MODAL')
      this.$emit('refresh')
    }
  }
}
</script>
