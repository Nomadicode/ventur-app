<template>
  <v-dialog
    light
    content-class="upload-modal-container"
    v-model="modal">
    <v-card class="upload-modal" light>
      <v-card-text>
        <h5 class="space-bottom">Upload Profile Picture</h5>
        <croppa
          ref="uploader"
          v-model="croppaImg"
          :accept="'image/*'"
          :file-size-limit="0"
          :autoSizing="true"
          :quality="2"
          :zoom-speed="3"
          :initial-image="image"
          :imageBorderRadius="200"
          :prevent-white-space="true"
          :show-remove-button="false"
          placeholder="Choose an image">
          <el-button v-if="!imageSelected()" @click="changeImage" type="text" class='edit-btn'>Select Image</el-button>
          <el-button v-if="imageSelected()" @click="changeImage" type="text" class='edit-btn'>Change Image</el-button>
        </croppa>
      </v-card-text>
      <v-card-actions>
        <v-layout row>
          <v-flex xs5>
            <el-button
              class="fill-width"
              @click="close">Cancel</el-button>
          </v-flex>
          <v-spacer />
          <v-flex xs5>
            <el-button
              class="fill-width"
              type="primary"
              @click="save">
              <span v-if="loading">SAVING...</span>
              <span v-else>Save</span>
            </el-button>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import uuidv4 from 'uuid'
import CONSTANTS from '@/services/parameters'
import AWS_S3 from '@/services/aws.js'

import updateProfile from '@/graphql/profile/mutations/updateProfile.gql'

export default {
  name: 'UploadModal',
  props: ['image'],
  created () {
    var self = this
    window.EventBus.$on('profile:upload', () => {
      self.modal = true
    })
  },
  data () {
    return {
      modal: false,
      loading: false,
      croppaImg: {}
    }
  },
  methods: {
    imageSelected () {
      return this.$refs && this.$refs.uploader && this.$refs.uploader.hasImage()
    },
    changeImage () {
      this.$refs.uploader.chooseFile()
    },
    close () {
      this.croppaImg = {}
      this.modal = false
    },
    async save () {
      if (this.$refs.uploader.hasImage()) {
        var self = this
        self.loading = true
        this.croppaImg.generateBlob(blob => {
          var params = {
            Bucket: CONSTANTS.aws,
            Key: 'profile_pictures/' + uuidv4() + '.jpg',
            Body: blob
          }
          var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
          AWS_S3.upload(params, options, function (err, data) {
            self.$apollo.mutate({
              mutation: updateProfile,
              variables: {
                profilePicture: data.Location
              }
            }).then((data) => {
              self.$store.commit('UserModule/UPDATE_USER', data.data.updateProfile.user)
              self.loading = false
              self.modal = false
            }).catch((error) => {
              self.loading = false
              self.modal = false
            })
          })
        }, 'image/jpeg', 0.75)
      }
    }
  }
}
</script>
