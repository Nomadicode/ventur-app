<template>
  <v-layout
    class="position--relative"
    light
    column>
    <edit-field 
      v-model="user.name"
      containerCls="horizontal-center"
      fieldCls="field-header inline-block"
      editCls="space-left--quarter inline-block"
      :showLabel="false"></edit-field>
    <!-- <h1 class="space-top--half pad-half horizontal-center">Profile Info</h1> -->

    <div class="flex horizontal-center">
      <v-img 
        :src="user.profile_picture"
        class="inline profile-picture">
        <el-upload
          class="field-input avatar-uploader"
          :on-change="parsePicture"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <span class="profile-edit-btn avatar-uploader-icon">edit</span>
        </el-upload>
      </v-img>

      <!-- <edit-field
        :containerCls="'space-left--half inline'"
        :fieldCls="'field-header inline-block'"
        :editCls="'inline-block'"
        v-model="user.name" 
        :showLabel="false"></edit-field> -->
    </div>
    
    <edit-field 
      label="Email" 
      v-model="user.email"></edit-field>
    
    <edit-field 
      label="Handle" 
      v-model="user.handle"></edit-field>

    <edit-field 
      label="Date of Birth" 
      type="date"
      v-model="user.date_of_birth"></edit-field>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'
import moment from 'moment'
import EditField from '@/components/elements/inputs/EditField'

export default {
  name: 'BaseView',
  mounted () {
    this.user = Object.assign({}, this.data)
  },
  data () {
    return {
      editName: false,
      editEmail: false,
      editHandle: false,
      editDateOfBirth: false,
      edit: false,
      user: {},
      imageUrl: ''
    }
  },
  computed: {
    ...mapGetters('UserModule', ['fullName', 'data'])
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isLt2M;
    },
    parsePicture (file, fileList) {
      var self = this
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onloadend = function(readerEvt) {
        var binaryString = readerEvt.target.result
        self.user.profile_picture = binaryString
      }
    },
    save () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation ($name: String, $email: String, $dateOfBirth: Date, $profilePicture: String){
          updateProfile(name: $name, email: $email, dateOfBirth: $dateOfBirth, profilePicture: $profilePicture) {
            success
            error
            user {
              id
              name
              email
              profilePicture
              dateOfBirth
            }
          }
        }`,
        variables: {
          name: this.user.name,
          email: this.user.email,
          dateOfBirth: moment(this.user.date_of_birth).format('YYYY-MM-DD'),
          profilePicture: (this.user.profile_picture.includes('http')) ? null : this.user.profile_picture
        }
      }).then((data) => {
        self.toggleEditMode()
      }).catch((error) => {
        // Show error
      })
    }
  },
  components: {
    EditField
  }
}
</script>

<style lang="scss" scoped>
  .buttons-box {
    text-align: right;
    width: 100%;
  }
  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;

    .profile-edit-btn {
      display: block;
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 25px;
      background: rgba(0,0,0,0.4);
    }
  }
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      padding: 20px;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    color: #d9d9d9;
    text-align: center;
  }
  .field {
    color: #FFFFFF;

    .field-label {
      font-size: 16px;
      font-weight: 600;
      color: rgba(250,250,250,1);
    }
    .field-input {
      margin: 5px 0 20px;
    }
    .field-data {
      font-size: 20px;
      font-weight: 300;
    }
  }
</style>
