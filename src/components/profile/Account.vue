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

    <image-uploader
      class="horizontal-center"
      v-model="editedUser.profilePicture"
      round
      :size="125"></image-uploader>

    <div>
      <label class="block pad-top--half pad-bottom--quarter">Email</label>
      <el-input
        v-model="editedUser.email">
        <el-button
          v-if="editedUser.email !== user.email"
          slot="append"
          icon="el-icon-check"
          @click="save('email')"></el-button>
      </el-input>
    </div>

    <div>
      <label class="block pad-top--half pad-bottom--quarter">Handle</label>
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

    <div>
      <label class="block pad-top--half pad-bottom--quarter">Date of Birth</label>
      <el-input
        v-model="editedUser.dateOfBirth"
        v-inputmask
        data-inputmask="'mask': '99/99/9999', 'greedy': 'false'"
        placeholder="mm/dd/yyyy">
        <el-button
          v-if="editedUser.dateOfBirth && editedUser.dateOfBirth !== displayDate(user.dateOfBirth)"
          slot="append"
          icon="el-icon-check"
          @click="save('dateOfBirth')"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

import updateProfile from '@/graphql/profile/mutations/updateProfile.gql'

import ImageUploader from '@/components/elements/inputs/ImageUploader'

export default {
  name: 'Account',
  mounted () {
    this.user = Object.assign({}, this.data)
  },
  data () {
    return {
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
    },
    'editedUser.profilePicture' () {
      if (this.editedUser.profilePicture && this.editedUser.profilePicture.indexOf('http') === -1) {
        this.save('profilePicture')
      }
    }
  },
  components: {
    ImageUploader
  }
}
</script>
