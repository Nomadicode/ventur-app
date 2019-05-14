<template>
  <div class="profile-container">
    <el-input
      v-if="editName"
      class="header-edit"
      v-model="user.name">
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
        data-inputmask="'mask': '9999-99-99', 'greedy': 'false'"
        placeholder="yyyy-mm-dd">
        <el-button
          v-if="editedUser.dateOfBirth && editedUser.dateOfBirth !== user.dateOfBirth"
          slot="append"
          icon="el-icon-check"
          @click="save('dateOfBirth')"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'

import ImageUploader from '@/components/elements/inputs/ImageUploader'

export default {
  name: 'BaseView',
  mounted () {
    this.user = Object.assign({}, this.data)
  },
  data () {
    return {
      editName: false,
      user: {},
      editedUser: {},
      imageUrl: ''
    }
  },
  computed: {
    ...mapGetters('UserModule', ['fullName', 'data'])
  },
  methods: {
    toggleEditName () {
      this.editName = !this.editName
    },
    save (field) {
      var fields = {}
      fields[field] = this.editedUser[field]

      this.$apollo.mutate({
        mutation: gql`mutation UpdateProfile ($name: String, $email: String, $dateOfBirth: Date, $profilePicture: String){
          updateProfile(name: $name, email: $email, dateOfBirth: $dateOfBirth, profilePicture: $profilePicture) {
            success
            error
            user {
              id
              name
              email
              handle
              profilePicture
              dateOfBirth
            }
          }
        }`,
        variables: fields
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        // Show error
        console.error(error)
      })
    }
  },
  watch: {
    user () {
      this.editedUser = Object.assign({}, this.user)
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
