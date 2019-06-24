<template>
  <v-dialog
    light
    v-model="modal"
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
            <p>Change group name</p>
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
          v-model="newName"
          placeholder="New name">
        </el-input>
      </v-card-text>

      <v-card-actions>
        <el-button
          class="primary-background fill-width"
          :disabled="newName == null && groupId == null"
          type="primary"
          @click="saveChanges()">Change Group Name</el-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import updateGroup from '@/graphql/groups/mutations/updateGroup.gql'

export default {
  name: 'GroupEditModal',
  props: {
    groupId: {
      default: null,
      type: Number
    },
    groupName: {
      default: '',
      type: String
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  created () {
    this.newName = this.groupName
  },
  data () {
    return {
      modal: false,
      newName: ''
    }
  },
  methods: {
    saveChanges () {
      var self = this
      this.$apollo.mutate({
        mutation: updateGroup,
        variables: {
          pk: this.groupId,
          name: this.newName
        }
      }).then((response) => {
        self.$emit('refresh')
        self.close()
      })
    },
    close () {
      this.modal = false
      this.$emit('close')
    }
  },
  watch: {
    show () {
      this.modal = this.show
    },
    modal () {
      if (!this.modal) {
        this.close()
      }
    },
    groupName () {
      this.newName = this.groupName
    }
  }
}
</script>
