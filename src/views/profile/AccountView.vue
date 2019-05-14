<template>
  <div class="fill-width">
    <h1 class="horizontal-center">Account Settings</h1>
    <!-- <el-button size="large" plain>Change Password</el-button> -->
    <div class="space-top">
      <label class="field-label accent-color">Current Password</label>
      <el-input
        v-model="currentPassword"
        type="password"
        placeholder="current password"></el-input>

      <label class="field-label accent-color space-top--half">New Password</label>
      <el-input
        v-model="newPassword"
        type="password"
        placeholder="new password"></el-input>
    </div>
    <el-button
      class="full-width space-top"
      type="default"
      @click="changePassword()">Change Password</el-button>

    <el-button
      class="full-width space-left-none delete-button-bottom space-top"
      type="danger"
      @click="deleteAccount()">Delete Account</el-button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'AccountView',
  data () {
    return {
      currentPassword: '',
      newPassword: ''
    }
  },
  computed: {
    ...mapGetters('UserModule', ['token']),
    headers () {
      return {
        Authorization: 'JWT ' + this.token
      }
    }
  },
  methods: {
    changePassword () {
      if (this.currentPassword && this.newPassword) {
        var self = this
        var data = {
          'old_password': this.currentPassword,
          'new_password1': this.newPassword,
          'new_password2': this.newPassword
        }

        this.$http.post('/auth/password/change/', data, { headers: this.headers }).then(function (result) {
          self.currentPassword = ''
          self.newPassword = ''
          self.$message({
            message: 'Success: Password updated',
            type: 'success'
          })
        }).catch(error => {
          console.error(error)
          self.$message({
            message: 'Error: Unable to update password',
            type: 'error'
          })
        })
      }
    },
    deleteAccount () {
      this.$prompt('Enter your password to proceed. This cannot be undone.', 'Confirm Account Deletion', {
        confirmButtonText: 'DELETE ACCOUNT',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: 'Cancel'
      }).then(function () {
        this.$message({
          type: 'error',
          message: 'Unable to delete account, please contact support: <strong>support@driftr.app</strong>',
          dangerouslyUseHTMLString: true
        })
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
