<template>
  <div>
    <el-input
      v-if="editName"
      class="header-edit"
      v-model="editedUser.name">
    </el-input>

    <v-layout
      v-if="!editName"
      row
      wrap>
      <v-flex xs11>
        <h3
          class="horizontal-center">{{ user.name }}</h3>
      </v-flex>
      <v-flex xs1>
        <el-button
          v-if="!editName"
          type="text"
          @click="toggleEditName()">
          <v-icon :size="16">edit</v-icon>
        </el-button>
      </v-flex>
    </v-layout>

    <v-layout
      v-if="editName"
      row
      wrap>
      <v-flex xs1>
        <el-button
          class="secondary-text"
          size="mini"
          type="text"
          plain
          @click="toggleEditName()">
          <v-icon
            :size="18">close</v-icon>
        </el-button>
      </v-flex>

      <v-spacer />

      <v-flex xs1>
        <el-button
          size="mini"
          type="text"
          @click="save('name')"
          plain>
          <v-icon
            :size="18">check</v-icon>
        </el-button>
      </v-flex>
    </v-layout>

    <v-img
      :src="editedUser.profilePicture"
      :maxHeight="100"
      class="horizontal-center image-uploader"
      :style="{
        'border-radius': '50%',
        'width': '100px'
      }"
      @click="openUploadModal">
    </v-img>
    <!-- <image-uploader
      class="horizontal-center"
      v-model="editedUser.profilePicture"
      round
      :size="100"></image-uploader> -->

    <v-tabs
      class="pad-top--half tab-header"
      v-model="active"
      centered
      grow
      :height="30">
      <v-tab :key="1">
        <v-icon :size="14">far fa-flag</v-icon>
      </v-tab>
      <v-tab :key="2">
        <v-icon :size="14">far fa-id-card</v-icon>
      </v-tab>

      <v-tab-item
        :key="1">
        <event-list
          class="space-top--half"
          :creator="user.id"
          :emptyMessage="'You haven\'t created any activities'"></event-list>
      </v-tab-item>
      <v-tab-item :key="2">
        <div class="pad-top--half">
          <label class="field-label bold block pad-top--half pad-bottom--quarter">Email</label>
          <el-input
            v-model="editedUser.email">
            <el-button
              v-if="editedUser.email !== user.email"
              slot="append"
              icon="el-icon-check"
              @click="save('email')"></el-button>
          </el-input>
        </div>

        <div class="space-top">
          <label class="field-label bold block pad-bottom--quarter">Handle</label>
          <el-input
            v-model="editedUser.handle">
            <template slot="prepend">@</template>
            <el-button
              v-if="editedUser.handle !== user.handle"
              slot="append"
              icon="el-icon-check"
              @click="save('handle')"></el-button>
          </el-input>
        </div>

        <div class="space-top">
          <label class="field-label bold block pad-bottom--quarter">Date of Birth</label>
          <el-input
            v-model="editedUser.dateOfBirth"
            v-inputmask
            data-inputmask="'mask': '99/99/9999', 'greedy': 'true'"
            placeholder="mm/dd/yyyy">
            <el-button
              v-if="editedUser.dateOfBirth && editedUser.dateOfBirth !== displayDate(user.dateOfBirth)"
              slot="append"
              icon="el-icon-check"
              @click="save('dateOfBirth')"></el-button>
          </el-input>
        </div>
      </v-tab-item>
    </v-tabs>

    <upload-modal :image="editedUser.profilePicture"></upload-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

import updateProfile from '@/graphql/profile/mutations/updateProfile.gql'

import EventList from '@/components/events/EventList'
import ImageUploader from '@/components/elements/inputs/ImageUploader'
import UploadModal from '@/components/modals/UploadModal'

export default {
  name: 'Account',
  mounted () {
    this.user = Object.assign({}, this.data)
  },
  data () {
    return {
      active: 0,
      editName: false,
      user: {},
      editedUser: {}
    }
  },
  computed: {
    ...mapGetters('UserModule', ['fullName', 'data'])
  },
  methods: {
    displayDate (date) {
      return moment(date).format('MM/DD/YYYY')
    },
    toggleEditName () {
      this.editName = !this.editName
    },
    openUploadModal () {
      window.EventBus.$emit('profile:upload')
    },
    save (field) {
      var fields = {}
      fields[field] = (field === 'dateOfBirth') ? moment(this.editedUser[field], 'MM/DD/YYYY').format('YYYY-MM-DD') : this.editedUser[field]

      var self = this
      this.$apollo.mutate({
        mutation: updateProfile,
        variables: fields
      }).then((data) => {
        self.$store.commit('UserModule/UPDATE_USER', data.data.updateProfile.user)
        self.editName = false
      }).catch((error) => {
        // Show error
        console.error(error)
      })
    }
  },
  watch: {
    user () {
      this.editedUser = Object.assign({}, this.user)
      this.editedUser['dateOfBirth'] = moment(this.user['dateOfBirth']).format('MM/DD/YYYY')
    },
    data () {
      this.user = Object.assign({}, this.data)
    }
    // 'editedUser.profilePicture' () {
    //   if (this.editedUser.profilePicture && this.editedUser.profilePicture.indexOf('http') === -1) {
    //     this.save('profilePicture')
    //   }
    // }
  },
  components: {
    EventList,
    ImageUploader,
    UploadModal
  }
}
</script>
